# CampusIQ — Databricks + Genie integration

This version keeps the existing React/Tailwind frontend and replaces the fake Gemini/mock-Lakehouse backend with live Databricks calls.

## Your Databricks objects

The SQL you supplied uses:

- Catalog: `workspace`
- Gold schema: `workspace.gold`
- Tables: `students`, `professors`, `research_projects`, `clubs`, `opportunities`, `campus_events`
- Raw volume: `workspace.bronze.raw_files`

## 1. Create `.env.local`

Copy `.env.example` to `.env.local` and fill in:

```env
DATABRICKS_HOST=https://YOUR-WORKSPACE.cloud.databricks.com
DATABRICKS_TOKEN=YOUR_TOKEN
DATABRICKS_WAREHOUSE_ID=YOUR_SQL_WAREHOUSE_ID
DATABRICKS_GENIE_SPACE_ID=YOUR_GENIE_AGENT_ID
DATABRICKS_CATALOG=workspace
DATABRICKS_GOLD_SCHEMA=gold
APP_URL=http://localhost:3000
```

Never expose `DATABRICKS_TOKEN` in React code or commit `.env.local`.

## 2. Run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## 3. Test the connection first

Open:

```text
http://localhost:3000/api/health
```

You should see:

```json
{
  "sql_ready": true,
  "genie_ready": true,
  "databricks_catalog": "workspace",
  "gold_schema": "gold"
}
```

## 4. What is live now

### Existing frontend data

On startup, React calls:

```text
GET /api/lakehouse/data
```

The Express backend reads all six real Delta tables from `workspace.gold` and normalizes them for the existing UI.

### Personalised opportunity matching

Whenever the selected student changes, React calls:

```text
POST /api/opportunities/match
```

The backend builds a Databricks SQL query using the selected profile's skills, interests, preferred domains, opportunity type and location. Databricks calculates a live `match_score` and returns the opportunities sorted by that score.

Therefore the Dashboard's existing `opportunities.slice(0, 4)` now displays the best matches for the active profile.

### Genie chatbot

React calls:

```text
POST /api/genie/query
```

The backend sends the user's profile context plus the question to the configured Genie Agent.

For a new chat:

```text
POST /api/2.0/genie/spaces/{space_id}/start-conversation
```

For follow-up messages:

```text
POST /api/2.0/genie/spaces/{space_id}/conversations/{conversation_id}/messages
```

The backend polls the Genie message until `COMPLETED`, extracts the final text answer and generated SQL, then retrieves the query attachment result.

The frontend displays the answer, SQL, queried tables and Genie follow-up suggestions.

## 5. Existing UI that remains

No rebuild of the visual frontend was required. These existing views continue to receive the same TypeScript objects:

- Dashboard
- Explore
- People
- Research
- Team Builder
- What-If Simulator
- City Intelligence
- Genie Modal
- Lakehouse Inspector

`mockLakehouse.ts` remains only as a local startup fallback. The live data path is Databricks.

## 6. API flow

```text
React
  |
  +--> GET /api/lakehouse/data --------------------> Databricks SQL Warehouse
  |
  +--> POST /api/opportunities/match --------------> workspace.gold
  |                                                     |
  |                                                     +--> profile-aware ranking
  |
  +--> POST /api/genie/query -----------------------> Databricks Genie Agent
                                                        |
                                                        +--> generated SQL
                                                        +--> Lakehouse query
                                                        +--> answer
```

## 7. Important security rule

The Databricks token is server-side only. Never put it into `.tsx`, `VITE_*` variables, browser local storage, or client-side API calls.
