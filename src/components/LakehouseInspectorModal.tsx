import React, { useState, useEffect } from 'react';
import { X, Database, Table, Play, Code, CheckCircle2, RefreshCw, Terminal, Layers, Sparkles } from 'lucide-react';
import { LakehouseSchema } from '../types';

interface LakehouseInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LakehouseInspectorModal: React.FC<LakehouseInspectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [schemaData, setSchemaData] = useState<LakehouseSchema | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>('opportunities');
  const [customSql, setCustomSql] = useState<string>(
    "SELECT opportunity_id, title, organization, type, priority_tier, stipend_or_prize, match_score FROM workspace.gold.opportunities WHERE days_left <= 30 ORDER BY match_score DESC"
  );
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [queryLatency, setQueryLatency] = useState<number | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'schema' | 'query'>('schema');

  useEffect(() => {
    if (isOpen && !schemaData) {
      fetch('/api/lakehouse/schema')
        .then(res => res.json())
        .then(data => setSchemaData(data))
        .catch(console.error);
    }
  }, [isOpen, schemaData]);

  if (!isOpen) return null;

  const handleExecuteSql = async () => {
    setIsExecuting(true);
    try {
      const res = await fetch('/api/lakehouse/execute-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: customSql })
      });
      const data = await res.json();
      setQueryResults(data.rows || []);
      setQueryLatency(data.latency_ms || 18);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExecuting(false);
    }
  };

  const sampleQueries = [
    {
      label: '🔴 High Priority Opportunities (Closing Soon)',
      sql: "SELECT opportunity_id, title, organization, priority_tier, days_left, match_score FROM workspace.gold.opportunities WHERE priority_tier = '🔴 Apply Now' ORDER BY days_left ASC"
    },
    {
      label: '🔬 Professors with Active Lab Vacancies',
      sql: "SELECT professor_id, name, lab_name, department, open_positions_count, student_collab_status FROM workspace.gold.professors WHERE open_positions_count > 0"
    },
    {
      label: '👥 Students with Verified Python + PyTorch Skills',
      sql: "SELECT student_id, name, branch, year, cgpa, availability_hours_per_week FROM workspace.gold.students WHERE array_contains(skills, 'PyTorch')"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080808]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F27D26] flex items-center justify-center shadow-lg">
              <Database className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-white uppercase tracking-tight">Databricks Unity Catalog Inspector</span>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FF3621]/10 text-[#F27D26] border border-[#F27D26]">
                  Live Delta Lake
                </span>
              </div>
              <p className="text-[11px] text-white/50 font-medium">
                Catalog: <strong className="text-white">workspace</strong> • Schema: <strong className="text-white">gold</strong> • Engine: <strong className="text-[#F27D26]">Photon High Concurrency</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('schema')}
                className={`px-3.5 py-1.5 rounded-xl transition ${activeTab === 'schema' ? 'bg-[#F27D26] text-black' : 'text-white/60 hover:text-white'}`}
              >
                Table Catalog
              </button>
              <button
                onClick={() => {
                  setActiveTab('query');
                  if (!queryResults) handleExecuteSql();
                }}
                className={`px-3.5 py-1.5 rounded-xl transition ${activeTab === 'query' ? 'bg-[#F27D26] text-black' : 'text-white/60 hover:text-white'}`}
              >
                SQL Workspace
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-[#080808]">
          
          {activeTab === 'schema' ? (
            <>
              {/* Left sidebar: Tables list */}
              <div className="w-full md:w-64 border-r border-white/10 bg-[#080808] p-4 space-y-2 overflow-y-auto">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#F27D26] mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#F27D26]" />
                  <span>Delta Lake Tables</span>
                </div>

                {schemaData && Object.entries(schemaData.tables).map(([tblName, tblInfo]) => {
                  const info = tblInfo as { description: string; record_count: number; columns: any[] };
                  return (
                    <button
                      key={tblName}
                      onClick={() => setSelectedTable(tblName)}
                      className={`w-full text-left p-3 rounded-2xl text-xs transition flex items-center justify-between font-black uppercase tracking-wider ${
                        selectedTable === tblName
                          ? 'bg-[#F27D26] text-black shadow-lg'
                          : 'text-white/60 hover:bg-white/5 border border-white/5 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Table className={`w-3.5 h-3.5 flex-shrink-0 ${selectedTable === tblName ? 'text-black' : 'text-white/40'}`} />
                        <span className="truncate">{tblName}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${selectedTable === tblName ? 'bg-black/20 text-black' : 'bg-white/10 text-white/60'}`}>
                        {info.record_count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right table detail */}
              <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[#080808]">
                {schemaData && schemaData.tables[selectedTable] && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
                          <span>workspace.gold.{selectedTable}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-white/10 text-white/80 border border-white/10">
                            Delta Parquet
                          </span>
                        </h3>
                        <p className="text-xs text-white/60 mt-1 font-medium">
                          {schemaData.tables[selectedTable].description}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setCustomSql(`SELECT * FROM workspace.gold.${selectedTable} LIMIT 10`);
                          setActiveTab('query');
                          handleExecuteSql();
                        }}
                        className="px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black transition flex items-center gap-1.5 shadow-lg"
                      >
                        <Play className="w-3.5 h-3.5 text-black" />
                        <span>Query Table</span>
                      </button>
                    </div>

                    {/* Columns Table */}
                    <div className="border-2 border-white/10 rounded-2xl overflow-hidden shadow-xl bg-[#111]">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#080808] text-white/50 uppercase text-[10px] font-black tracking-widest border-b border-white/10">
                          <tr>
                            <th className="py-3 px-4">Column Name</th>
                            <th className="py-3 px-4">Data Type</th>
                            <th className="py-3 px-4">Description / Semantic Meaning</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 bg-[#111]">
                          {schemaData.tables[selectedTable].columns.map((col, cIdx) => (
                            <tr key={cIdx} className="hover:bg-white/5">
                              <td className="py-3 px-4 font-mono text-[#F27D26] font-bold">{col.name}</td>
                              <td className="py-3 px-4 font-mono text-white/60 font-medium">{col.type}</td>
                              <td className="py-3 px-4 text-white/80 font-medium">{col.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Interactive SQL Workspace */
            <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col bg-[#080808]">
              
              {/* Presets */}
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Sample Lakehouse Queries:</div>
                <div className="flex flex-wrap gap-2">
                  {sampleQueries.map((sq, sqIdx) => (
                    <button
                      key={sqIdx}
                      onClick={() => {
                        setCustomSql(sq.sql);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition"
                    >
                      {sq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SQL Editor Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="font-mono text-[#F27D26] font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Code className="w-4 h-4" />
                    <span>Databricks SQL Editor</span>
                  </span>
                  {queryLatency !== null && (
                    <span className="text-emerald-400 font-mono text-xs font-bold">
                      Query executed in {queryLatency}ms
                    </span>
                  )}
                </div>
                <textarea
                  value={customSql}
                  onChange={(e) => setCustomSql(e.target.value)}
                  rows={4}
                  className="w-full bg-[#111] border-2 border-white/10 rounded-2xl p-3.5 font-mono text-xs text-[#F27D26] focus:outline-none focus:border-[#F27D26] shadow-inner font-bold"
                />
                <button
                  onClick={handleExecuteSql}
                  disabled={isExecuting}
                  className="px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black transition flex items-center gap-2 shadow-xl"
                >
                  <Play className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
                  <span>{isExecuting ? 'Executing with Photon...' : 'Run SQL Query'}</span>
                </button>
              </div>

              {/* Query Results View */}
              <div className="flex-1 border-2 border-white/10 rounded-2xl overflow-auto bg-[#111] max-h-72 shadow-xl">
                {queryResults && queryResults.length > 0 ? (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#080808] text-white/50 uppercase text-[10px] font-black tracking-widest border-b border-white/10 sticky top-0">
                      <tr>
                        {Object.keys(queryResults[0]).map((key) => (
                          <th key={key} className="py-2.5 px-3 whitespace-nowrap">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {queryResults.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white/5">
                          {Object.values(row).map((val: any, vIdx) => (
                            <td key={vIdx} className="py-2.5 px-3 text-white/80 font-mono text-[11px] whitespace-nowrap font-medium">
                              {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-xs font-bold text-white/40 uppercase tracking-wider">
                    No query results yet. Click "Run SQL Query" to inspect Delta Lake rows.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
