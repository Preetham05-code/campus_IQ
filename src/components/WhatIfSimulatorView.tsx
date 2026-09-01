import React, { useState } from 'react';
import { Sliders, Sparkles, RefreshCw, ArrowRight, Target, Clock, Compass, Layers, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Student, Opportunity, Professor, ResearchProject, RoadmapStep } from '../types';

interface WhatIfSimulatorViewProps {
  currentStudent: Student;
  opportunities: Opportunity[];
  professors: Professor[];
  researchProjects: ResearchProject[];
  onOpenGenie: (prompt?: string) => void;
  onApplySimulatedProfile?: (newGoal: string, newHours: number, newPref: 'Internship' | 'Research' | 'Hackathon' | 'Startup' | 'All') => void;
}

export const WhatIfSimulatorView: React.FC<WhatIfSimulatorViewProps> = ({
  currentStudent,
  opportunities,
  professors,
  researchProjects,
  onOpenGenie,
  onApplySimulatedProfile,
}) => {
  const [simulatedGoal, setSimulatedGoal] = useState<string>('AI Research Scientist & ML Engineer');
  const [simulatedHours, setSimulatedHours] = useState<number>(5);
  const [simulatedPref, setSimulatedPref] = useState<'Internship' | 'Research' | 'Hackathon' | 'Startup' | 'All'>('Research');
  const [simulatedDomain, setSimulatedDomain] = useState<string>('Medical Vision & Healthcare');

  const goals = [
    'AI Research Scientist & ML Engineer',
    'Full-Stack Software Development Engineer (SDE)',
    'Data Scientist & Business Intelligence Lead',
    'Robotics & Embedded Systems Engineer',
    'Tech Startup Founder & Product Lead'
  ];

  // Dynamic simulation outcomes based on goal
  const isResearchGoal = simulatedGoal.includes('Research');
  const isSdeGoal = simulatedGoal.includes('Software') || simulatedGoal.includes('Full-Stack');
  const isDataGoal = simulatedGoal.includes('Data Scientist');
  const isRoboticsGoal = simulatedGoal.includes('Robotics');

  // Dynamic simulated opportunities
  const simulatedOpportunities = isResearchGoal
    ? opportunities.filter(o => o.type.includes('Research') || o.organization.includes('Databricks') || o.organization.includes('Google'))
    : isSdeGoal
    ? opportunities.filter(o => o.type.includes('Internship') || o.title.includes('Software') || o.organization.includes('Flipkart'))
    : opportunities.slice(0, 4);

  // Dynamic simulated professors
  const simulatedProfessors = isResearchGoal
    ? professors.filter(p => p.department.includes('Computer Science') || p.expertise.includes('Computer Vision'))
    : isRoboticsGoal
    ? professors.filter(p => p.department.includes('Electronics') || p.department.includes('Mechanical'))
    : professors.slice(0, 2);

  // Simulated Priority Advice based on hours
  const priorityAdvice = simulatedHours <= 6
    ? {
        tier1: 'Focus strictly on 1 high-yield campus lab project (MVIL Lab 402, 4 hrs/wk) to build research credentials.',
        tier2: 'Defer 36-hour hackathons and large external commitments until vacation breaks.',
        tier3: 'Attend 1 asynchronous Databricks masterclass to gain cloud credits with zero commute.'
      }
    : {
        tier1: 'Dual focus: Campus Lab Research (8 hrs/wk) + Active Hackathon Competitions.',
        tier2: 'Apply to Databricks Summer 2026 & Flipkart GRiD 7.0 for early internship offers.',
        tier3: 'Collaborate with student peers to build open-source benchmark repositories.'
      };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-[#F27D26] tracking-widest italic mb-1">
              Databricks Scenario Intelligence
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
              "WHAT-IF?" CONSTRAINT SIMULATOR
            </h1>
            <p className="text-xs sm:text-sm text-white/60 max-w-2xl font-medium">
              Test dynamic campus scenarios: What if your career goal shifts? What if you only have 5 hours/week? Databricks Genie dynamically recalculates your entire campus graph.
            </p>
          </div>

          <button
            onClick={() => onOpenGenie(`What if my goal changes to ${simulatedGoal} and I only have ${simulatedHours} hours per week? What should I prioritize?`)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black shadow-xl transition flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Simulate with Genie AI</span>
          </button>
        </div>
      </div>

      {/* Interactive Constraint Sliders & Switches */}
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 space-y-6 shadow-xl">
        <h2 className="text-xs font-black uppercase tracking-widest text-[#F27D26]">
          Step 1: Adjust Your Constraints
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold">
          
          {/* Change Career Goal */}
          <div className="space-y-2">
            <label className="text-white/80 font-black uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#F27D26]" />
              <span>Target Career Goal:</span>
            </label>
            <select
              value={simulatedGoal}
              onChange={(e) => setSimulatedGoal(e.target.value)}
              className="w-full p-3 bg-[#080808] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] text-xs font-bold"
            >
              {goals.map(g => (
                <option key={g} value={g} className="bg-[#111] text-white">{g}</option>
              ))}
            </select>
            <div className="text-[11px] text-white/50 font-medium">
              Current profile: <strong className="text-white">{currentStudent.career_goal}</strong>
            </div>
          </div>

          {/* Change Availability Hours */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-white/80 font-black uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F27D26]" />
                <span>Bandwidth:</span>
              </label>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF3621]/20 text-[#F27D26] border border-[#FF3621]/40">
                {simulatedHours} Hours / Wk
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="25"
              step="1"
              value={simulatedHours}
              onChange={(e) => setSimulatedHours(Number(e.target.value))}
              className="w-full h-2 bg-[#080808] rounded-lg appearance-none cursor-pointer accent-[#F27D26]"
            />
            <div className="flex justify-between text-[9px] text-white/40 uppercase font-black tracking-wider">
              <span>3h (Exams)</span>
              <span>10h (Balanced)</span>
              <span>25h (Sprint)</span>
            </div>
          </div>

          {/* Change Preference Bias */}
          <div className="space-y-2">
            <label className="text-white/80 font-black uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#F27D26]" />
              <span>Opportunity Bias:</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Research', 'Internship', 'Hackathon', 'Startup'] as const).map(pref => (
                <button
                  key={pref}
                  onClick={() => setSimulatedPref(pref)}
                  className={`p-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                    simulatedPref === pref
                      ? 'bg-[#F27D26] text-black shadow-lg'
                      : 'bg-[#080808] text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10 text-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-white/40 mr-1">Demo Presets:</span>
          <button
            onClick={() => {
              setSimulatedGoal('AI Research Scientist & ML Engineer');
              setSimulatedHours(5);
              setSimulatedPref('Research');
            }}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-wider border border-white/10"
          >
            "Exam Crunch: 5h Research"
          </button>
          <button
            onClick={() => {
              setSimulatedGoal('Full-Stack Software Development Engineer (SDE)');
              setSimulatedHours(15);
              setSimulatedPref('Internship');
            }}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-wider border border-white/10"
          >
            "Switch to SDE Track"
          </button>
          <button
            onClick={() => {
              setSimulatedGoal('Robotics & Embedded Systems Engineer');
              setSimulatedHours(12);
              setSimulatedPref('Hackathon');
            }}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-wider border border-white/10"
          >
            "Hardware &amp; IoT Sprint"
          </button>
        </div>
      </div>

      {/* Recalculated Dynamic Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recalculated Priority Matrix */}
        <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#F27D26] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F27D26]" />
              <span>Priority Strategy ({simulatedHours} hrs/week)</span>
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-[#080808] p-4 rounded-2xl border border-red-500/30 space-y-1">
              <div className="font-black text-red-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <span>🔴 Highest Priority (Immediate Action):</span>
              </div>
              <p className="text-white/80 text-[11px] leading-relaxed font-medium">
                {priorityAdvice.tier1}
              </p>
            </div>

            <div className="bg-[#080808] p-4 rounded-2xl border border-[#F27D26]/30 space-y-1">
              <div className="font-black text-[#F27D26] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <span>🟡 Secondary Priority (Consider):</span>
              </div>
              <p className="text-white/80 text-[11px] leading-relaxed font-medium">
                {priorityAdvice.tier2}
              </p>
            </div>

            <div className="bg-[#080808] p-4 rounded-2xl border border-emerald-500/30 space-y-1">
              <div className="font-black text-emerald-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <span>🟢 Low Effort / Asynchronous:</span>
              </div>
              <p className="text-white/80 text-[11px] leading-relaxed font-medium">
                {priorityAdvice.tier3}
              </p>
            </div>
          </div>

          {/* Action button to update student profile */}
          {onApplySimulatedProfile && (
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => onApplySimulatedProfile(simulatedGoal, simulatedHours, simulatedPref)}
                className="w-full py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider bg-white hover:bg-white/90 text-black transition"
              >
                Apply These Settings to My Active Profile
              </button>
            </div>
          )}
        </div>

        {/* Dynamically Recalculated Recommendations */}
        <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-[#F27D26]" />
            <span>Targeted Matches for "{simulatedGoal}"</span>
          </h3>

          <div className="space-y-3">
            <div className="text-[10px] font-black uppercase tracking-wider text-white/40">
              Key Professors to Approach:
            </div>
            {simulatedProfessors.map((prof) => (
              <div key={prof.professor_id} className="bg-[#080808] p-3.5 rounded-2xl border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-black text-white">{prof.name}</div>
                  <div className="text-[10px] text-white/50">{prof.lab_name} • {prof.department}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-white">
                  {prof.open_positions_count} open spots
                </span>
              </div>
            ))}

            <div className="text-[10px] font-black uppercase tracking-wider text-white/40 pt-2">
              Top Ranked Opportunities:
            </div>
            {simulatedOpportunities.slice(0, 2).map((opp) => (
              <div key={opp.opportunity_id} className="bg-[#080808] p-3.5 rounded-2xl border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <div className="font-black text-white truncate">{opp.title}</div>
                  <div className="text-[10px] text-white/50">{opp.organization} • {opp.stipend_or_prize}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-[#F27D26] text-[#F27D26] flex-shrink-0">
                  {opp.match_score || 95}% Match
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
