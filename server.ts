import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '1mb' }));

const DATABRICKS_HOST = process.env.DATABRICKS_HOST?.replace(/\/$/, '');
const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN;
const DATABRICKS_WAREHOUSE_ID = process.env.DATABRICKS_WAREHOUSE_ID;
const DATABRICKS_GENIE_SPACE_ID = process.env.DATABRICKS_GENIE_SPACE_ID;

const CATALOG = process.env.DATABRICKS_CATALOG || 'workspace';
const GOLD_SCHEMA = process.env.DATABRICKS_GOLD_SCHEMA || 'gold';

const GOLD_TABLES = [
  'students',
  'professors',
  'research_projects',
  'clubs',
  'opportunities',
  'campus_events'
] as const;

type JsonRecord = Record<string, any>;

function requireSqlConfig() {
  if (!DATABRICKS_HOST || !DATABRICKS_TOKEN || !DATABRICKS_WAREHOUSE_ID) {
    throw new Error(
      'Missing Databricks SQL configuration. Set DATABRICKS_HOST, DATABRICKS_TOKEN and DATABRICKS_WAREHOUSE_ID.'
    );
  }
}

function requireGenieConfig() {
  if (!DATABRICKS_HOST || !DATABRICKS_TOKEN || !DATABRICKS_GENIE_SPACE_ID) {
    throw new Error(
      'Missing Databricks Genie configuration. Set DATABRICKS_HOST, DATABRICKS_TOKEN and DATABRICKS_GENIE_SPACE_ID.'
    );
  }
}

async function databricksRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!DATABRICKS_HOST || !DATABRICKS_TOKEN) {
    throw new Error('Databricks host/token are not configured.');
  }

  const response = await fetch(`${DATABRICKS_HOST}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${DATABRICKS_TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const body = await response.text();
  let parsed: any = {};
  try {
    parsed = body ? JSON.parse(body) : {};
  } catch {
    parsed = { raw: body };
  }

  if (!response.ok) {
    const message = parsed?.message || parsed?.error?.message || body || `HTTP ${response.status}`;
    throw new Error(`Databricks API ${response.status}: ${message}`);
  }

  return parsed as T;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function tableName(table: string) {
  if (!GOLD_TABLES.includes(table as any)) throw new Error(`Invalid table: ${table}`);
  return `${CATALOG}.${GOLD_SCHEMA}.${table}`;
}

function normalizeStatementRows(statement: any): JsonRecord[] {
  const columns = statement?.manifest?.schema?.columns?.map((c: any) => c.name) || [];
  const rows = statement?.result?.data_array || [];
  return rows.map((row: any[]) => Object.fromEntries(columns.map((column: string, i: number) => [column, row[i]])));
}

function normalizeStatement(statement: any) {
  return {
    ...statement,
    data: normalizeStatementRows(statement),
    columns: statement?.manifest?.schema?.columns?.map((c: any) => c.name) || [],
    rows_count: statement?.result?.row_count ?? statement?.manifest?.total_row_count ?? 0
  };
}

async function executeDatabricksSql(sql: string) {
  requireSqlConfig();

  const started = Date.now();
  let response = await databricksRequest<any>('/api/2.0/sql/statements', {
    method: 'POST',
    body: JSON.stringify({
      warehouse_id: DATABRICKS_WAREHOUSE_ID,
      statement: sql,
      wait_timeout: '10s',
      disposition: 'INLINE',
      format: 'JSON_ARRAY'
    })
  });

  const statementId = response.statement_id;
  if (!statementId) throw new Error('Databricks did not return a statement_id.');

  const terminal = new Set(['SUCCEEDED', 'FAILED', 'CANCELED', 'CANCELLED']);
  for (let attempt = 0; attempt < 60; attempt++) {
    const state = response?.status?.state;
    if (terminal.has(state)) break;
    await sleep(500);
    response = await databricksRequest<any>(`/api/2.0/sql/statements/${statementId}`);
  }

  if (response?.status?.state !== 'SUCCEEDED') {
    throw new Error(response?.status?.error?.message || `SQL statement ended with ${response?.status?.state || 'unknown status'}`);
  }

  return {
    statement_id: statementId,
    duration_ms: Date.now() - started,
    ...normalizeStatement(response)
  };
}

function escapeSqlString(value: string) {
  return String(value ?? '').replace(/'/g, "''");
}

function sqlArray(values: string[] = []) {
  const safe = values.filter(Boolean).map(v => `'${escapeSqlString(v)}'`);
  return safe.length ? `array(${safe.join(', ')})` : 'CAST(array() AS ARRAY<STRING>)';
}

function safeInt(value: any, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : fallback;
}

function buildProfileMatchSql(student: JsonRecord) {
  const skills = sqlArray(Array.isArray(student.skills) ? student.skills : []);
  const domains = sqlArray(Array.isArray(student.preferred_domains) ? student.preferred_domains : []);
  const interests = sqlArray(Array.isArray(student.interests) ? student.interests : []);
  const goal = escapeSqlString(student.career_goal || '');
  const prefType = escapeSqlString(student.preferred_opportunity_type || 'All');
  const location = escapeSqlString(student.location_preference || 'Flexible');
  const studentId = escapeSqlString(student.student_id || 'CUSTOM');
  const availability = safeInt(student.availability_hours_per_week, 10);

  return `
WITH profile AS (
  SELECT
    '${studentId}' AS student_id,
    ${skills} AS skills,
    ${domains} AS preferred_domains,
    ${interests} AS interests,
    '${goal}' AS career_goal,
    '${prefType}' AS preferred_opportunity_type,
    '${location}' AS location_preference,
    ${availability} AS availability_hours_per_week
)
SELECT
  o.opportunity_id,
  o.title,
  o.organization,
  o.logo,
  o.type,
  o.category,
  o.domain,
  o.required_skills,
  o.eligibility,
  CAST(o.deadline AS STRING) AS deadline,
  o.days_left,
  o.location,
  o.remote_status,
  o.stipend_or_prize,
  o.duration,
  o.application_link,
  o.description,
  o.priority_tier,
  o.is_bookmarked,
  CAST((
    LEAST(50, size(array_intersect(p.skills, o.required_skills)) * 15)
    + CASE WHEN array_contains(p.preferred_domains, o.domain) THEN 20 ELSE 0 END
    + CASE WHEN array_contains(p.interests, o.domain) THEN 10 ELSE 0 END
    + CASE WHEN p.preferred_opportunity_type = 'All' OR p.preferred_opportunity_type = o.type THEN 10 ELSE 0 END
    + CASE
        WHEN p.location_preference = 'Flexible' THEN 5
        WHEN p.location_preference = o.remote_status THEN 5
        WHEN p.location_preference = 'Bengaluru' AND (lower(o.location) LIKE '%bengaluru%' OR lower(o.location) LIKE '%bangalore%') THEN 5
        WHEN p.location_preference = 'On-Campus' AND o.category = 'Campus' THEN 5
        ELSE 0
      END
    + CASE WHEN o.days_left <= 20 THEN 5 ELSE 0 END
  ) AS DOUBLE) AS match_score,
  array_join(filter(array(
  CASE WHEN size(array_intersect(p.skills, o.required_skills)) > 0
    THEN concat(
      'Skill overlap: ',
      array_join(array_intersect(p.skills, o.required_skills), ', ')
    )
  END,

  CASE WHEN array_contains(p.preferred_domains, o.domain)
    THEN concat('Preferred domain: ', o.domain)
  END,

  CASE WHEN p.preferred_opportunity_type = 'All'
        OR p.preferred_opportunity_type = o.type
    THEN concat(
      'Preferred opportunity type: ',
      o.type
    )
  END,

  CASE WHEN o.days_left <= 20
    THEN concat(
      'Deadline urgency: ',
      CAST(o.days_left AS STRING),
      ' days left'
    )
  END

), x -> x IS NOT NULL), ' • ') AS match_reason
FROM ${tableName('opportunities')} o
CROSS JOIN profile p
WHERE o.deadline >= CURRENT_DATE()
ORDER BY match_score DESC, o.days_left ASC
LIMIT 20`;
}

// Health
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    databricks_catalog: CATALOG,
    gold_schema: GOLD_SCHEMA,
    sql_ready: Boolean(DATABRICKS_HOST && DATABRICKS_TOKEN && DATABRICKS_WAREHOUSE_ID),
    genie_ready: Boolean(DATABRICKS_HOST && DATABRICKS_TOKEN && DATABRICKS_GENIE_SPACE_ID),
    tables: GOLD_TABLES
  });
});

// Real Unity Catalog schema metadata.
app.get('/api/lakehouse/schema', async (_req, res) => {
  try {
    requireSqlConfig();
    const sql = `
      SELECT table_name, column_name, data_type, ordinal_position
      FROM ${CATALOG}.information_schema.columns
      WHERE table_schema = '${escapeSqlString(GOLD_SCHEMA)}'
        AND table_name IN (${GOLD_TABLES.map(t => `'${t}'`).join(', ')})
      ORDER BY table_name, ordinal_position
    `;
    const result = await executeDatabricksSql(sql);
    const tables: Record<string, any> = {};

    for (const table of GOLD_TABLES) {
      const cols = result.data.filter((r: any) => r.table_name === table);
      tables[table] = {
        description: `Live Delta table ${tableName(table)}`,
        record_count: 0,
        columns: cols.map((c: any) => ({ name: c.column_name, type: c.data_type, description: '' }))
      };
    }

    res.json({ catalog: CATALOG, schema: GOLD_SCHEMA, engine: 'Databricks SQL Warehouse', tables });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Direct SQL endpoint used by the Lakehouse Inspector.
app.post('/api/lakehouse/execute-sql', async (req, res) => {
  const sql = String(req.body?.sql || '').trim();
  if (!sql) return res.status(400).json({ success: false, error: 'SQL query is required.' });

  try {
    const normalized = sql.toLowerCase();
    if (!normalized.startsWith('select') && !normalized.startsWith('with')) {
      return res.status(400).json({
        success: false,
        error: 'Only SELECT/WITH queries are allowed on this endpoint.'
      });
    }

    const result = await executeDatabricksSql(sql);
    res.json({
      success: true,
      sql,
      execution_engine: 'Databricks SQL Warehouse',
      statement_id: result.statement_id,
      duration_ms: result.duration_ms,
      scanned_bytes: result?.result?.stats?.bytes_scanned ?? null,
      rows_count: result.rows_count,
      columns: result.columns,
      data: result.data
    });
  } catch (error: any) {
    console.error('[Databricks SQL]', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Load the six real Gold tables for the existing React views.
app.get('/api/lakehouse/data', async (_req, res) => {
  try {
    requireSqlConfig();
    const data: Record<string, any[]> = {};
    for (const table of GOLD_TABLES) {
      const result = await executeDatabricksSql(`SELECT * FROM ${tableName(table)}`);
      data[table] = result.data;
    }
    res.json({ catalog: CATALOG, schema: GOLD_SCHEMA, source: 'databricks', data });
  } catch (error: any) {
    console.error('[Lakehouse data]', error);
    res.status(500).json({ error: error.message });
  }
});

// Personalized opportunities: matching is computed against the selected profile in Databricks SQL.
app.post('/api/opportunities/match', async (req, res) => {
  const student = req.body?.student;
  if (!student || typeof student !== 'object') {
    return res.status(400).json({ error: 'student profile is required.' });
  }

  try {
    const sql = buildProfileMatchSql(student);
    const result = await executeDatabricksSql(sql);
    res.json({
      source: 'databricks',
      student_id: student.student_id,
      sql_generated: sql,
      duration_ms: result.duration_ms,
      opportunities: result.data
    });
  } catch (error: any) {
    console.error('[Opportunity matching]', error);
    res.status(500).json({ error: error.message });
  }
});

function extractGenieAnswer(message: any) {
  const attachments = Array.isArray(message?.attachments) ? message.attachments : [];
  const answer = attachments.find((a: any) => a?.text?.purpose === 'TEXT_ATTACHMENT_PURPOSE_ANSWER');
  const fallback = attachments.find((a: any) => a?.text?.content);
  return answer?.text?.content || fallback?.text?.content || message?.content || 'Genie completed the request without a text answer.';
}

function extractGenieQueryAttachment(message: any) {
  const attachments = Array.isArray(message?.attachments) ? message.attachments : [];
  return attachments.find((a: any) => a?.query?.query);
}

async function startGenieConversation(content: string) {
  requireGenieConfig();
  return databricksRequest<any>(`/api/2.0/genie/spaces/${DATABRICKS_GENIE_SPACE_ID}/start-conversation`, {
    method: 'POST',
    body: JSON.stringify({ content })
  });
}

async function createGenieMessage(conversationId: string, content: string) {
  requireGenieConfig();
  return databricksRequest<any>(`/api/2.0/genie/spaces/${DATABRICKS_GENIE_SPACE_ID}/conversations/${conversationId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content })
  });
}

async function getGenieMessage(conversationId: string, messageId: string) {
  requireGenieConfig();
  return databricksRequest<any>(`/api/2.0/genie/spaces/${DATABRICKS_GENIE_SPACE_ID}/conversations/${conversationId}/messages/${messageId}`);
}

async function getGenieQueryResult(conversationId: string, messageId: string, attachmentId: string) {
  requireGenieConfig();
  return databricksRequest<any>(
    `/api/2.0/genie/spaces/${DATABRICKS_GENIE_SPACE_ID}/conversations/${conversationId}/messages/${messageId}/attachments/${attachmentId}/query-result`
  );
}

function normalizeGenieResult(queryResult: any) {
  const statement = queryResult?.statement_response || queryResult;
  const columns = statement?.manifest?.schema?.columns?.map((c: any) => c.name) || [];
  const rows = statement?.result?.data_array || [];
  return rows.map((row: any[]) => Object.fromEntries(columns.map((column: string, i: number) => [column, row[i]])));
}

async function askGenie(content: string, conversationId?: string) {
  const startedAt = Date.now();
  let conversation: any;
  let message: any;

  if (conversationId) {
    conversation = { id: conversationId };
    message = await createGenieMessage(conversationId, content);
  } else {
    const started = await startGenieConversation(content);
    conversation = started?.conversation || { id: started?.conversation_id };
    message = started?.message || started?.conversation?.message;
  }

  const conversationIdFinal = conversation?.id || conversation?.conversation_id;
  let messageId = message?.message_id || message?.id;
  if (!conversationIdFinal || !messageId) {
    throw new Error('Genie did not return a conversation ID and message ID.');
  }

  let current = message;
  const terminalStates = new Set(['COMPLETED', 'FAILED', 'CANCELLED', 'CANCELED', 'QUERY_RESULT_EXPIRED']);

  for (let attempt = 0; attempt < 90; attempt++) {
    if (terminalStates.has(current?.status)) break;
    await sleep(750);
    current = await getGenieMessage(conversationIdFinal, messageId);
  }

  if (current?.status === 'QUERY_RESULT_EXPIRED') {
    throw new Error('Genie query result expired. Please ask the question again.');
  }
  if (current?.status !== 'COMPLETED') {
    throw new Error(current?.error?.message || `Genie ended with status ${current?.status || 'unknown'}.`);
  }

  const attachment = extractGenieQueryAttachment(current);
  let queryResult: any = null;
  if (attachment) {
    const attachmentId = attachment.attachment_id || attachment.id;
    if (attachmentId) {
      queryResult = await getGenieQueryResult(conversationIdFinal, messageId, attachmentId);
    }
  }

  const thoughts = (current?.attachments || [])
    .flatMap((a: any) => a?.query?.thoughts || a?.thoughts || [])
    .map((t: any) => t?.content || t?.text)
    .filter(Boolean);

  const followUps = current?.suggested_questions?.questions || [];

  return {
    conversation_id: conversationIdFinal,
    message_id: messageId,
    message: current,
    answer: extractGenieAnswer(current),
    sql_generated: attachment?.query?.query,
    tables_consulted: [],
    reasoning_steps: thoughts,
    follow_up_suggestions: followUps,
    query_result: queryResult,
    query_rows: queryResult ? normalizeGenieResult(queryResult) : [],
    duration_ms: Date.now() - startedAt
  };
}

// Real Databricks Genie Agent endpoint.
app.post('/api/genie/query', async (req, res) => {
  const { prompt, student, student_id, conversation_id, whatIfConfig } = req.body || {};

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'prompt is required.' });
  }

  try {
    // The profile is passed as context, while Genie remains the source of truth for Lakehouse data.
    const profile = student || (student_id ? { student_id } : null);
    const context = profile ? `
CampusIQ profile context for this request:
Student ID: ${profile.student_id || 'unknown'}
Name: ${profile.name || 'unknown'}
Branch: ${profile.branch || 'unknown'}
Year: ${profile.year ?? 'unknown'}
CGPA: ${profile.cgpa ?? 'unknown'}
Skills: ${(profile.skills || []).join(', ')}
Interests: ${(profile.interests || []).join(', ')}
Career goal: ${whatIfConfig?.careerGoal || profile.career_goal || 'unknown'}
Preferred domains: ${(profile.preferred_domains || []).join(', ')}
Availability: ${whatIfConfig?.hoursPerWeek ?? profile.availability_hours_per_week ?? 'unknown'} hours/week
Preferred opportunity type: ${whatIfConfig?.opportunityType || profile.preferred_opportunity_type || 'All'}
Location preference: ${profile.location_preference || 'Flexible'}
` : '';

    const enrichedPrompt = `${context}\nUser question:\n${prompt}\n\nUse the configured CampusIQ Genie Agent and the real ${CATALOG}.${GOLD_SCHEMA} tables. Ground recommendations in the Lakehouse data. When the question is personalized, use the profile context above as the user's current profile. Return a concise, actionable answer.`;
    const result = await askGenie(enrichedPrompt, conversation_id);

    const queryAttachment = extractGenieQueryAttachment(result.message);
    const tables = queryAttachment?.query?.query
      ? Array.from(new Set((queryAttachment.query.query.match(/(?:FROM|JOIN)\s+([\w.]+)/gi) || []).map((x: string) => x.replace(/^(FROM|JOIN)\s+/i, ''))))
      : [];

    res.json({
      answer: result.answer,
      sql_generated: result.sql_generated,
      tables_consulted: tables,
      tables_queried: tables,
      reasoning_steps: result.reasoning_steps,
      reasoning_chain: result.reasoning_steps,
      query_latency_ms: result.duration_ms,
      duration_ms: result.duration_ms,
      follow_up_suggestions: result.follow_up_suggestions,
      genie_conversation_id: result.conversation_id,
      genie_message_id: result.message_id,
      genie_status: result.message?.status,
      query_result: result.query_result,
      query_rows: result.query_rows,
      source: 'databricks-genie'
    });
  } catch (error: any) {
    console.error('[Databricks Genie]', error);
    res.status(500).json({ error: error.message, source: 'databricks-genie' });
  }
});

async function createVite() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);
  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      let template = path.resolve(process.cwd(), 'index.html');
      let html = await (await import('fs/promises')).readFile(template, 'utf-8');
      html = await vite.transformIndexHtml(url, html);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log(`CampusIQ running at http://localhost:${PORT}`);
    console.log(`Databricks catalog: ${CATALOG}.${GOLD_SCHEMA}`);
    console.log(`SQL configured: ${Boolean(DATABRICKS_HOST && DATABRICKS_TOKEN && DATABRICKS_WAREHOUSE_ID)}`);
    console.log(`Genie configured: ${Boolean(DATABRICKS_HOST && DATABRICKS_TOKEN && DATABRICKS_GENIE_SPACE_ID)}`);
  });
}

createVite();
