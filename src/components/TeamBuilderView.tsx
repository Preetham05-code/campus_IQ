import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Users, UserPlus, CheckCircle2, Zap, ArrowRight, ShieldCheck, Trophy, Layers, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student, Opportunity } from '../types';

interface TeamBuilderViewProps {
  currentStudent: Student;
  allStudents: Student[];
  opportunities: Opportunity[];
  onOpenConnectModal: (person: { name: string; title: string; email: string; type: 'Professor' | 'Student'; context: string }) => void;
  onOpenGenie: (prompt?: string) => void;
  preselectedOpportunity?: Opportunity | null;
}

export const TeamBuilderView: React.FC<TeamBuilderViewProps> = ({
  currentStudent,
  allStudents,
  opportunities,
  onOpenConnectModal,
  onOpenGenie,
  preselectedOpportunity,
}) => {
  const [selectedHackathon, setSelectedHackathon] = useState<string>(
    preselectedOpportunity?.title || 'Bengaluru AI Health Innovators Hackathon 2025'
  );
  const [mySkillFocus, setMySkillFocus] = useState<string>('AI/ML & Python Backend');
  const [neededRole1, setNeededRole1] = useState<string>('Frontend & UI/UX Specialist');
  const [neededRole2, setNeededRole2] = useState<string>('Healthcare & Clinical Domain Expert');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [teamFormed, setTeamFormed] = useState(true);

  const hackathonOptions = opportunities.filter(o => o.type === 'Hackathon' || o.type === 'Competition');

  const handleRecalculateTeam = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setTeamFormed(true);
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  // Find complementary students
  const karthik = allStudents.find(s => s.student_id === 'STU-2024-004') || allStudents[1];
  const ananya = allStudents.find(s => s.student_id === 'STU-2024-005') || allStudents[2];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-[#F27D26] tracking-widest italic mb-1">
              Databricks Team Synergy Matrix
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
              SKILL COMPLEMENTARITY TEAM BUILDER
            </h1>
            <p className="text-xs sm:text-sm text-white/60 max-w-2xl font-medium">
              Don't enter hackathons alone. Databricks Genie analyzes verified skills across branches to assemble balanced, high-synergy teams.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Synergy Engine Online</span>
            </span>
          </div>
        </div>
      </div>

      {/* Team Configuration Setup Card */}
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
        <h2 className="text-xs font-black uppercase tracking-widest text-[#F27D26] flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#F27D26]" />
          <span>Configure Target &amp; Skill Gaps</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold">
          
          {/* Target Hackathon */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-white/50 font-black">Target Hackathon:</label>
            <select
              value={selectedHackathon}
              onChange={(e) => setSelectedHackathon(e.target.value)}
              className="w-full p-3 bg-[#080808] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-bold"
            >
              {hackathonOptions.map(h => (
                <option key={h.opportunity_id} value={h.title} className="bg-[#111] text-white">{h.title}</option>
              ))}
              <option value="Custom Project Idea" className="bg-[#111] text-white">Custom Project / Startup Accelerator</option>
            </select>
          </div>

          {/* Your Role */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-white/50 font-black">Your Strengths (You):</label>
            <input
              type="text"
              value={mySkillFocus}
              onChange={(e) => setMySkillFocus(e.target.value)}
              className="w-full p-3 bg-[#080808] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-bold"
            />
          </div>

          {/* Needed Roles */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-white/50 font-black">Complementary Gaps:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={neededRole1}
                onChange={(e) => setNeededRole1(e.target.value)}
                placeholder="Role 1"
                className="w-1/2 p-3 bg-[#080808] border border-white/10 rounded-2xl text-white text-xs focus:outline-none focus:border-[#F27D26] font-bold"
              />
              <input
                type="text"
                value={neededRole2}
                onChange={(e) => setNeededRole2(e.target.value)}
                placeholder="Role 2"
                className="w-1/2 p-3 bg-[#080808] border border-white/10 rounded-2xl text-white text-xs focus:outline-none focus:border-[#F27D26] font-bold"
              />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-[11px] text-white/40 uppercase tracking-wider font-bold">
            Lakehouse query: <strong className="text-white">workspace.gold.students</strong>
          </span>
          <button
            onClick={handleRecalculateTeam}
            disabled={isSynthesizing}
            className="px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black transition flex items-center gap-2 shadow"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSynthesizing ? 'animate-spin' : ''}`} />
            <span>{isSynthesizing ? 'Matching...' : 'Find Teammates'}</span>
          </button>
        </div>
      </div>

      {/* Suggested Team Synergy Display */}
      {teamFormed && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Synergy Score Banner */}
          <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF3621]/20 text-[#F27D26] border border-[#FF3621]/40">
                  Target: {selectedHackathon.split('—')[0]}
                </span>
                <span className="text-[10px] font-black uppercase text-emerald-400">
                  ✓ Full Skill Stack Complete
                </span>
              </div>
              <h2 className="text-xl font-black text-white mt-2 tracking-tight">
                Suggested Triad: AI/ML Lead + Frontend Specialist + Clinical Domain Expert
              </h2>
            </div>

            <div className="flex items-center gap-3 bg-[#080808] p-3 rounded-2xl border border-white/10 flex-shrink-0">
              <div className="text-right">
                <div className="text-[9px] text-white/40 uppercase font-black tracking-widest">Synergy Score</div>
                <div className="text-3xl font-black text-[#F27D26] tracking-tighter">96.8%</div>
              </div>
              <Trophy className="w-8 h-8 text-[#F27D26]" />
            </div>
          </div>

          {/* 3 Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* You (AI/ML Lead) */}
            <div className="bg-white/5 border-2 border-[#F27D26] rounded-3xl p-6 space-y-4 relative shadow-xl">
              <span className="absolute -top-3 left-4 px-3 py-1 rounded-full text-[10px] font-black bg-[#F27D26] text-black uppercase tracking-wider shadow">
                Role 1: You (Lead)
              </span>

              <div className="flex items-center gap-3.5 pt-1">
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#F27D26]"
                />
                <div>
                  <div className="text-base font-black text-white">{currentStudent.name}</div>
                  <div className="text-xs text-[#F27D26] font-bold uppercase tracking-wider">AI/ML &amp; Vision</div>
                  <div className="text-[10px] text-white/50 font-bold uppercase">Year {currentStudent.year} • {currentStudent.branch.split(' ')[0]}</div>
                </div>
              </div>

              <div className="text-xs text-white/80 bg-[#080808] p-3.5 rounded-2xl border border-white/10 space-y-1">
                <div className="font-black text-white/40 text-[10px] uppercase tracking-wider">Responsibilities:</div>
                <ul className="list-disc list-inside text-[11px] space-y-0.5 text-white/80 font-medium">
                  <li>PyTorch model architecture &amp; fine-tuning</li>
                  <li>Inference pipeline with OpenCV</li>
                  <li>FastAPI model serving backend</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {currentStudent.skills.slice(0, 4).map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg text-[10px] bg-[#F27D26]/20 text-[#F27D26] border border-[#F27D26]/40 font-bold uppercase">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Teammate 1: Karthik Raja (Frontend) */}
            <div className="bg-white/5 border border-white/10 hover:border-white/30 rounded-3xl p-6 space-y-4 relative shadow-xl flex flex-col justify-between">
              <span className="absolute -top-3 left-4 px-3 py-1 rounded-full text-[10px] font-black bg-white text-black uppercase tracking-wider shadow">
                Role 2: Frontend &amp; UI
              </span>

              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-3.5">
                  <img
                    src={karthik.avatar}
                    alt={karthik.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/20"
                  />
                  <div>
                    <div className="text-base font-black text-white">{karthik.name}</div>
                    <div className="text-xs text-white/80 font-bold uppercase tracking-wider">React &amp; UX</div>
                    <div className="text-[10px] text-white/50 font-bold uppercase">Year {karthik.year} • {karthik.branch.split(' ')[0]}</div>
                  </div>
                </div>

                <div className="text-xs text-white/80 bg-[#080808] p-3.5 rounded-2xl border border-white/10 space-y-1">
                  <div className="font-black text-[#F27D26] text-[10px] uppercase tracking-wider">Genie Reasoning:</div>
                  <ul className="list-disc list-inside text-[11px] space-y-0.5 text-white/80 font-medium">
                    <li>Top campus frontend developer (3 hackathon wins)</li>
                    <li>Transforms ML output into diagnostic UI</li>
                    <li>Available {karthik.availability_hours_per_week} hrs/wk</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {karthik.skills.slice(0, 4).map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-[10px] bg-white/5 text-white/80 border border-white/10 font-bold uppercase">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => onOpenConnectModal({
                    name: karthik.name,
                    title: `Frontend Lead (${karthik.branch})`,
                    email: karthik.email,
                    type: 'Student',
                    context: `Inviting to join our team for "${selectedHackathon}". You handle Frontend/UI while I handle AI/ML.`
                  })}
                  className="w-full py-2.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider bg-white hover:bg-white/90 text-black transition flex items-center justify-center gap-1.5 shadow"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Send Team Invite</span>
                </button>
              </div>
            </div>

            {/* Teammate 2: Dr. Ananya Mukherjee (BioTech Domain) */}
            <div className="bg-white/5 border border-white/10 hover:border-white/30 rounded-3xl p-6 space-y-4 relative shadow-xl flex flex-col justify-between">
              <span className="absolute -top-3 left-4 px-3 py-1 rounded-full text-[10px] font-black bg-[#FF3621] text-white uppercase tracking-wider shadow">
                Role 3: Healthcare Expert
              </span>

              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-3.5">
                  <img
                    src={ananya.avatar}
                    alt={ananya.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#FF3621]/40"
                  />
                  <div>
                    <div className="text-base font-black text-white">{ananya.name}</div>
                    <div className="text-xs text-[#FF3621] font-bold uppercase tracking-wider">Clinical BioTech</div>
                    <div className="text-[10px] text-white/50 font-bold uppercase">Year {ananya.year} • BioTechnology</div>
                  </div>
                </div>

                <div className="text-xs text-white/80 bg-[#080808] p-3.5 rounded-2xl border border-white/10 space-y-1">
                  <div className="font-black text-[#F27D26] text-[10px] uppercase tracking-wider">Genie Reasoning:</div>
                  <ul className="list-disc list-inside text-[11px] space-y-0.5 text-white/80 font-medium">
                    <li>Ground-truth clinical biomarker validation</li>
                    <li>Ensures compliance with medical benchmarks</li>
                    <li>Authored COVID genomics variant paper</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {ananya.skills.slice(0, 4).map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-[10px] bg-white/5 text-white/80 border border-white/10 font-bold uppercase">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => onOpenConnectModal({
                    name: ananya.name,
                    title: `BioTech Researcher (${ananya.branch})`,
                    email: ananya.email,
                    type: 'Student',
                    context: `Inviting to join our team for "${selectedHackathon}" as domain expert on diagnostic validation.`
                  })}
                  className="w-full py-2.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black transition flex items-center justify-center gap-1.5 shadow"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Send Team Invite</span>
                </button>
              </div>
            </div>

          </div>

          {/* Collaborative Hackathon Pitch Outline */}
          <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 space-y-3 shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#F27D26] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F27D26]" />
              <span>Genie Recommended Project Concept</span>
            </h3>
            <p className="text-xs text-white/80 leading-relaxed font-medium">
              <strong className="text-white font-black">"RetinaScan AI" — Rapid Primary Care Glaucoma &amp; Retinopathy Triage:</strong> A responsive web app connecting Dr. Radhika's Indian hospital fundus imaging dataset with low-latency deep learning. Aditi provides the vision model, Karthik provides the instant diagnostic UI for district clinics, and Ananya verifies the clinical validation metrics.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
