import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Building, ArrowUpRight, CheckCircle2, UserCheck, BookOpen, AlertCircle, Bookmark, Compass, Filter, ChevronRight, Zap, Target, Award, Users, ArrowRight } from 'lucide-react';
import { Student, Opportunity, Professor, ResearchProject, CampusEvent, RoadmapStep } from '../types';

interface DashboardViewProps {
  student: Student;
  opportunities: Opportunity[];
  professors: Professor[];
  researchProjects: ResearchProject[];
  events: CampusEvent[];
  roadmap: RoadmapStep[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onSelectProfessor: (prof: Professor) => void;
  onOpenGenie: (prompt?: string) => void;
  onNavigateToTab: (tab: string) => void;
  onToggleBookmark: (oppId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  opportunities,
  professors,
  researchProjects,
  events,
  roadmap,
  onSelectOpportunity,
  onSelectProfessor,
  onOpenGenie,
  onNavigateToTab,
  onToggleBookmark,
}) => {
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const toggleActionItem = (key: string) => {
    setCompletedActions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Top high match opportunities
  const highMatchOpportunities = opportunities.slice(0, 4);
  const urgentDeadlines = opportunities.filter(o => o.days_left <= 20).slice(0, 3);
  const topProfessors = professors.slice(0, 3);
  const topProjects = researchProjects.slice(0, 3);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner: Student Identity Intelligence in Bold Typography */}
      <div className="relative overflow-hidden rounded-3xl bg-[#111] border-2 border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF3621]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#F27D26]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Student Profile Overview */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl object-cover ring-4 ring-[#F27D26] shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#F27D26] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                Yr {student.year}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#F27D26]">
                Target Career Path: {student.career_goal}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
                  {student.name}
                </h1>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-white border border-white/15">
                  {student.branch.split(' ')[0]}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  CGPA {student.cgpa.toFixed(2)}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed font-medium">
                {student.bio}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mr-1">Skills:</span>
                {student.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/90 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics & Genie Trigger */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10 gap-3 flex-shrink-0">
            <div className="text-left lg:text-right">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Bandwidth</div>
              <div className="text-base font-black text-[#F27D26] tracking-tight">
                {student.availability_hours_per_week} HRS / WEEK
              </div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">
                {student.location_preference}
              </div>
            </div>

            <button
              onClick={() => onOpenGenie("What opportunities are best for my current profile right now?")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#FF3621] to-[#F27D26] hover:opacity-95 text-black shadow-lg shadow-[#FF3621]/20 transition transform active:scale-95 flex-shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Genie</span>
            </button>
          </div>

        </div>

        {/* Intelligence Highlights Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Verified Matches</div>
            <div className="text-2xl font-black text-white mt-1 tracking-tighter">7 MATCHES</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-[#F27D26] mt-0.5">On &amp; Off Campus</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Urgent Tier</div>
            <div className="text-2xl font-black text-[#FF3621] mt-1 tracking-tighter">3 CLOSING</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-white/40 mt-0.5">&lt; 20 Days Left</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Lab Openings</div>
            <div className="text-2xl font-black text-white mt-1 tracking-tighter">4 LABS</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-white/40 mt-0.5">MVIL &amp; Lakehouse</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Team Synergy</div>
            <div className="text-2xl font-black text-emerald-400 mt-1 tracking-tighter">96.8% FIT</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-white/40 mt-0.5">Complementary</div>
          </div>
        </div>

      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Recommended Opportunities & What Should I Do Next Roadmap */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: High-Match Recommended Opportunities */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-[#F27D26] tracking-widest italic">Lakehouse Engine</p>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  Opportunity Matches
                </h2>
              </div>
              <button
                onClick={() => onNavigateToTab('explore')}
                className="text-xs font-black uppercase tracking-wider text-[#F27D26] hover:underline flex items-center gap-1"
              >
                <span>View All ({opportunities.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {highMatchOpportunities.map((opp, idx) => {
                const isTopMatch = idx === 0;
                return (
                  <div
                    key={opp.opportunity_id}
                    className={`rounded-3xl p-6 flex flex-col justify-between transition duration-200 shadow-lg ${
                      isTopMatch
                        ? 'bg-white text-black'
                        : 'bg-white/5 border border-white/10 text-white hover:border-[#F27D26]/60'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider ${
                            isTopMatch
                              ? 'bg-black text-white'
                              : 'border border-[#F27D26] text-[#F27D26]'
                          }`}
                        >
                          {opp.match_score}% Match
                        </span>
                        <span className={`text-3xl font-black italic ${isTopMatch ? 'opacity-20 text-black' : 'opacity-20 text-white'}`}>
                          #0{idx + 1}
                        </span>
                      </div>

                      <p className={`text-xs font-bold uppercase tracking-wider ${isTopMatch ? 'text-black/60' : 'text-white/50'}`}>
                        {opp.organization} • {opp.type}
                      </p>

                      <h3
                        onClick={() => onSelectOpportunity(opp)}
                        className={`text-2xl font-black leading-tight my-2 tracking-tighter cursor-pointer hover:opacity-80 transition line-clamp-2 ${
                          isTopMatch ? 'text-black' : 'text-white'
                        }`}
                      >
                        {opp.title}
                      </h3>

                      <div className={`flex flex-wrap items-center gap-2 text-xs font-bold my-3 ${isTopMatch ? 'text-black/80' : 'text-white/70'}`}>
                        <span className={isTopMatch ? 'text-emerald-700' : 'text-emerald-400'}>
                          {opp.stipend_or_prize}
                        </span>
                        <span>•</span>
                        <span className={isTopMatch ? 'text-[#FF3621]' : 'text-[#F27D26]'}>
                          Deadline: {opp.deadline}
                        </span>
                      </div>
                    </div>

                    <div className={`border-t pt-4 mt-2 ${isTopMatch ? 'border-black/10' : 'border-white/10'}`}>
                      <div className="flex items-center justify-between">
                        <p className={`text-[10px] font-black uppercase tracking-wider ${isTopMatch ? 'text-black/60' : 'text-white/40'}`}>
                          Genie Insight:
                        </p>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onToggleBookmark(opp.opportunity_id)}
                            className={`p-1.5 rounded-xl transition ${
                              isTopMatch ? 'bg-black/5 hover:bg-black/10 text-black' : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                            title={opp.is_bookmarked ? 'Saved' : 'Save'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${opp.is_bookmarked ? (isTopMatch ? 'fill-black text-black' : 'fill-[#F27D26] text-[#F27D26]') : ''}`} />
                          </button>
                          <button
                            onClick={() => onSelectOpportunity(opp)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                              isTopMatch
                                ? 'bg-black text-white hover:bg-zinc-800'
                                : 'bg-[#F27D26] text-black hover:bg-[#FF3621]'
                            }`}
                          >
                            Explore
                          </button>
                        </div>
                      </div>
                      <p className={`text-xs leading-snug mt-2 line-clamp-2 ${isTopMatch ? 'text-black/80' : 'text-white/80'}`}>
                        {opp.match_reasons?.[0] || opp.description}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Section: "What Should I Do Next?" Interactive Roadmap */}
          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase text-[#F27D26] mb-1 tracking-tighter italic">Genie Roadmap</p>
                <h2 className="text-4xl sm:text-5xl font-black leading-[0.9] tracking-tighter text-white">
                  YOUR<br />NEXT MOVE.
                </h2>
              </div>
              <button
                onClick={() => onOpenGenie("Generate an updated career roadmap for my current year and skill goals")}
                className="self-start sm:self-auto px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>Re-synthesize</span>
              </button>
            </div>

            {/* Timeline Steps with Bold Typography styling */}
            <div className="space-y-6 pt-2">
              {roadmap.map((step, sIdx) => (
                <div key={step.timeframe} className="border-l-4 border-[#F27D26] pl-5 py-1 space-y-2">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-[#F27D26]">
                      {step.timeframe}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      {step.impact}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-white tracking-tight">
                    {step.title}
                  </h4>

                  <p className="text-xs text-white/60 font-medium">
                    {step.description}
                  </p>

                  {/* Action checklist */}
                  <div className="pt-2 space-y-2">
                    {step.action_items.map((item, aIdx) => {
                      const itemKey = `${step.timeframe}-${aIdx}`;
                      const isDone = completedActions[itemKey];
                      return (
                        <div
                          key={aIdx}
                          onClick={() => toggleActionItem(itemKey)}
                          className={`flex items-center gap-3 p-2.5 rounded-2xl text-xs cursor-pointer transition ${
                            isDone
                              ? 'bg-emerald-950/30 text-white/40 line-through'
                              : 'bg-[#111] text-white hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isDone ? 'text-emerald-400' : 'text-white/30'}`} />
                          <span className="flex-1 font-bold">{item.label}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/10 text-white/60 uppercase font-black tracking-wider">
                            {item.type}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column: People You Should Meet, Research Labs & Urgent Deadlines */}
        <aside className="space-y-6 flex flex-col">
          
          {/* What If Teaser Card in Bold Orange */}
          <div
            onClick={() => onNavigateToTab('whatif')}
            className="bg-[#F27D26] text-black p-6 rounded-3xl relative overflow-hidden cursor-pointer hover:opacity-95 transition shadow-xl"
          >
            <p className="text-[10px] font-black uppercase mb-1 tracking-widest italic">What If? Simulator</p>
            <h3 className="text-3xl font-black leading-tight tracking-tight mb-3">
              SWITCH CAREER<br />TRAJECTORY?
            </h3>
            <p className="text-xs font-bold leading-tight text-black/80 mb-4">
              Simulate shifting from {student.career_goal} to AI Research or Robotics with 1-click.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black text-white text-xs font-black uppercase tracking-wider">
              <span>Run Simulation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-20 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            </div>
          </div>

          {/* People You Should Meet (Faculty + Peers) */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">
                Top Connections
              </h4>
              <button
                onClick={() => onNavigateToTab('people')}
                className="text-[10px] font-black uppercase tracking-widest text-[#F27D26] hover:underline"
              >
                Network
              </button>
            </div>

            <div className="space-y-3">
              {topProfessors.map((prof) => (
                <div
                  key={prof.professor_id}
                  onClick={() => onSelectProfessor(prof)}
                  className="flex items-center gap-3.5 bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl cursor-pointer transition border border-white/5"
                >
                  <img
                    src={prof.avatar}
                    alt={prof.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#F27D26]"
                  />
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="text-xs font-black text-white truncate uppercase tracking-tight">
                      {prof.name}
                    </div>
                    <div className="text-[10px] text-white/50 truncate font-bold">
                      {prof.department} • {prof.open_positions_count} open spots
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Opportunities Card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">
                Active Labs
              </h4>
              <button
                onClick={() => onNavigateToTab('research')}
                className="text-[10px] font-black uppercase tracking-widest text-[#F27D26] hover:underline"
              >
                Labs
              </button>
            </div>

            <div className="space-y-3">
              {topProjects.map((proj) => (
                <div
                  key={proj.project_id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2 hover:border-[#F27D26]/40 transition"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-black uppercase tracking-wider text-[#F27D26]">
                      {proj.domain}
                    </span>
                    <span className="text-white/40 font-bold">{proj.stipend_or_credits}</span>
                  </div>

                  <h4 className="text-xs font-black text-white tracking-tight line-clamp-1">
                    {proj.title}
                  </h4>

                  <div className="text-[10px] text-white/50 font-medium">
                    Lead: <span className="text-white font-bold">{proj.professor_name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Deadlines Widget */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">
                Closing Soon
              </h4>
              <span className="text-[10px] font-black text-[#FF3621] uppercase">
                &lt; 20 Days
              </span>
            </div>

            <div className="space-y-2.5">
              {urgentDeadlines.map((opp) => (
                <div
                  key={opp.opportunity_id}
                  onClick={() => onSelectOpportunity(opp)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 p-3.5 rounded-2xl cursor-pointer transition space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-white truncate pr-2 tracking-tight">{opp.title}</span>
                    <span className="text-[#FF3621] whitespace-nowrap">{opp.days_left}d</span>
                  </div>
                  <div className="text-[10px] text-white/40 font-bold flex items-center justify-between uppercase">
                    <span>{opp.organization}</span>
                    <span>{opp.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Databricks Intelligence Layer Progress ribbon */}
          <div className="mt-auto border-t border-white/10 pt-6">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1.5 leading-none">Intelligence Layer</p>
            <p className="text-xs font-black">Powered by <span className="text-[#F27D26]">Databricks Lakehouse</span></p>
            <div className="flex gap-1.5 mt-3">
              <div className="h-1.5 flex-1 bg-[#F27D26] rounded-full"></div>
              <div className="h-1.5 flex-1 bg-[#FF3621] rounded-full"></div>
              <div className="h-1.5 flex-1 bg-white/20 rounded-full"></div>
              <div className="h-1.5 flex-1 bg-white/20 rounded-full"></div>
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
};

