import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, Database, Code, Terminal, Clock, CheckCircle2, ChevronRight, CornerDownRight, Copy, Check } from 'lucide-react';
import { GenieResponse, Student } from '../types';

interface GenieModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  currentStudent: Student;
  onSelectOpportunityById?: (id: string) => void;
}

export const GenieModal: React.FC<GenieModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  currentStudent,
  onSelectOpportunityById,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; data?: GenieResponse; timestamp: string }>>([
    {
      role: 'assistant',
      text: `Hello ${currentStudent.name}! I am your Databricks Genie Campus Intelligence agent. I have active SQL connections to your campus Lakehouse Delta tables (Students, Professors, Labs, Clubs, and Opportunities). How can I assist you with your academic & career journey today?`,
      timestamp: 'Just now'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSqlIndex, setCopiedSqlIndex] = useState<number | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      setPrompt(initialPrompt);
      executeGenieQuery(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    setConversationId(null);
    setMessages([{
      role: 'assistant',
      text: `Hello ${currentStudent.name}! I am your Databricks Genie Campus Intelligence agent. I can use your profile plus the live workspace.gold Lakehouse tables to find personalised opportunities, research, people and next steps.`,
      timestamp: 'Just now'
    }]);
  }, [currentStudent.student_id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const executeGenieQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages = [
      ...messages,
      { role: 'user' as const, text: queryText, timestamp: userMessageTime }
    ];
    setMessages(newMessages);
    setPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/genie/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryText,
          student: currentStudent,
          student_id: currentStudent.student_id,
          conversation_id: conversationId
        })
      });

      const data: GenieResponse & { genie_conversation_id?: string } = await res.json();
      if (!res.ok) throw new Error((data as any).error || 'Genie request failed');
      if (data.genie_conversation_id) setConversationId(data.genie_conversation_id);
      const assistantTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: data.answer,
          data: data,
          timestamp: assistantTime
        }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: 'I ran into an issue querying the Databricks Lakehouse SQL endpoint. Please verify your query syntax or try again.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySql = (sql: string, index: number) => {
    navigator.clipboard.writeText(sql);
    setCopiedSqlIndex(index);
    setTimeout(() => setCopiedSqlIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080808]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F27D26] flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-white uppercase tracking-tight">DATABRICKS GENIE AI TERMINAL</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FF3621]/20 text-[#F27D26] border border-[#FF3621]/40">
                  Track B Engine
                </span>
              </div>
              <p className="text-[11px] text-white/50 font-medium">
                Unity Catalog: <strong className="text-white">workspace.gold.*</strong> • Databricks Genie
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#080808]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#F27D26]" />
                </div>
              )}

              <div className={`max-w-2xl space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Message Bubble */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#F27D26] text-black font-bold rounded-br-none shadow-lg'
                      : 'bg-[#111] border border-white/10 text-white rounded-bl-none shadow'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Rich Lakehouse Reasoning Payload (if returned by Genie) */}
                {msg.data && (
                  <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4 text-xs font-bold shadow-xl">
                    
                    {/* Generated Databricks SQL Code Block */}
                    {msg.data.sql_generated && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-white/60">
                          <span className="flex items-center gap-1.5 font-black uppercase tracking-wider text-[#F27D26]">
                            <Database className="w-3.5 h-3.5 text-[#F27D26]" />
                            <span>Generated Databricks SQL (Photon)</span>
                          </span>
                          <button
                            onClick={() => handleCopySql(msg.data!.sql_generated, idx)}
                            className="flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-white/60 hover:text-white transition"
                          >
                            {copiedSqlIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedSqlIndex === idx ? 'Copied' : 'Copy SQL'}</span>
                          </button>
                        </div>
                        <div className="bg-[#080808] p-3.5 rounded-xl border border-white/10 font-mono text-[11px] text-[#F27D26] overflow-x-auto">
                          {msg.data.sql_generated}
                        </div>
                        <div className="text-[10px] text-white/40 font-medium flex items-center justify-between">
                          <span>Tables queried: {(msg.data.tables_consulted || (msg.data as any).tables_queried || ['workspace.gold.opportunities', 'workspace.gold.professors']).join(', ')}</span>
                          <span>Latency: {msg.data.query_latency_ms || (msg.data as any).duration_ms || 42}ms</span>
                        </div>
                      </div>
                    )}

                    {/* Step-by-Step Lakehouse Reasoning Breakdown */}
                    {((msg.data.reasoning_steps && msg.data.reasoning_steps.length > 0) || ((msg.data as any).reasoning_chain && (msg.data as any).reasoning_chain.length > 0)) && (
                      <div className="space-y-2 pt-3 border-t border-white/10">
                        <div className="font-black uppercase tracking-wider text-white/60 text-[10px]">Genie Inference Steps:</div>
                        <div className="space-y-1.5">
                          {(msg.data.reasoning_steps || (msg.data as any).reasoning_chain || []).map((step: string, sIdx: number) => (
                            <div key={sIdx} className="flex items-start gap-2 text-[11px] text-white/90 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Follow-up Prompt Chips */}
                    {msg.data.follow_up_suggestions && msg.data.follow_up_suggestions.length > 0 && (
                      <div className="space-y-2 pt-3 border-t border-white/10">
                        <div className="text-[10px] font-black uppercase tracking-wider text-white/40">Suggested Follow-ups:</div>
                        <div className="flex flex-wrap gap-2">
                          {msg.data.follow_up_suggestions.map((suggestion, sugIdx) => (
                            <button
                              key={sugIdx}
                              onClick={() => executeGenieQuery(suggestion)}
                              className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/5 hover:bg-[#F27D26] text-white hover:text-black border border-white/10 transition flex items-center gap-1.5"
                            >
                              <CornerDownRight className="w-3 h-3 text-[#F27D26]" />
                              <span>{suggestion}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                <div className="text-[10px] text-white/40 px-1 font-bold">{msg.timestamp}</div>
              </div>

              {msg.role === 'user' && (
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  className="w-8 h-8 rounded-xl object-cover border border-[#F27D26] flex-shrink-0 mt-0.5"
                />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-[#F27D26]" />
              </div>
              <div className="bg-[#111] border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-[#F27D26] font-black uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#F27D26] animate-ping" />
                <span>Translating natural language to SQL &amp; reasoning across Lakehouse...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#080808]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeGenieQuery(prompt);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Genie (e.g., 'Who is the best professor for Medical AI?', 'Find hackathon teammates')..."
              className="flex-1 px-4 py-3 bg-[#111] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#F27D26] font-bold"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="px-5 py-3 rounded-2xl bg-[#F27D26] hover:bg-[#FF3621] disabled:opacity-50 text-black text-xs font-black uppercase tracking-wider transition flex items-center gap-2 shadow-xl flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">Send Query</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
