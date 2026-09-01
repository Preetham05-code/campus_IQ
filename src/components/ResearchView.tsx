import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, GraduationCap, Building, Award, CheckCircle2, ArrowUpRight, DollarSign, Clock, Users, Mail } from 'lucide-react';
import { ResearchProject, Student, Professor } from '../types';

interface ResearchViewProps {
  student: Student;
  researchProjects: ResearchProject[];
  professors: Professor[];
  onOpenGenie: (prompt?: string) => void;
  onOpenConnectModal: (person: { name: string; title: string; email: string; type: 'Professor' | 'Student'; context: string }) => void;
}

export const ResearchView: React.FC<ResearchViewProps> = ({
  student,
  researchProjects,
  professors,
  onOpenGenie,
  onOpenConnectModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = ['All', 'AI/ML & Healthcare', 'Generative AI & Data Systems', 'Edge AI & Smart Cities', 'Robotics & Medical Vision'];

  const filteredProjects = researchProjects.filter((p) => {
    if (selectedDomain !== 'All' && p.domain !== selectedDomain) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const text = (p.title + ' ' + (p.lab_name || '') + ' ' + (p.professor_name || '') + ' ' + (p.required_skills || []).join(' ') + ' ' + (p.description || '')).toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#111] border-2 border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div>
          <p className="text-[10px] font-black uppercase text-[#F27D26] tracking-widest italic mb-1">
            Databricks Academic Lakehouse Labs
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
            UNDERGRAD RESEARCH DISCOVERY
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl font-medium">
            Explore faculty-sponsored lab vacancies, funded assistantships, and capstone research initiatives.
          </p>
        </div>

        {/* 1-Click "Find Research For Me" Genie Action */}
        <button
          onClick={() => onOpenGenie("Find research projects related to computer vision and AI that match my Python & PyTorch background")}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black shadow-xl transition transform active:scale-95 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Match Research with Genie</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-5 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research projects by skill (PyTorch, ROS2, LLM), lab, or professor name..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#080808] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#F27D26] font-bold"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-4 py-2.5 bg-[#080808] border border-white/10 rounded-2xl text-xs font-bold uppercase text-white focus:outline-none focus:border-[#F27D26]"
            >
              {domains.map(d => (
                <option key={d} value={d} className="bg-[#111] text-white">{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredProjects.map((proj) => {
          const prof = professors.find(p => p.professor_id === proj.professor_id);
          return (
            <div
              key={proj.project_id}
              className="bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-[#F27D26]/50 rounded-3xl p-6 space-y-4 transition shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-[#FF3621]/20 text-[#F27D26] border border-[#FF3621]/40 uppercase tracking-wider">
                    {proj.domain}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {proj.open_positions} open spots
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-[#F27D26] text-[#F27D26]">
                      {proj.matched_score || 92}% Match
                    </span>
                  </div>
                </div>

                {/* Project Title */}
                <div>
                  <h3 className="text-xl font-black text-white leading-tight tracking-tight">
                    {proj.title}
                  </h3>
                  <div className="text-xs font-bold text-[#F27D26] mt-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4 text-[#F27D26]" />
                    <span>Faculty Lead: <strong className="text-white">{proj.professor_name}</strong></span>
                  </div>
                  <div className="text-[11px] text-white/50 font-medium">
                    Lab: <span className="text-white/80">{proj.lab_name}</span> ({proj.department})
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-white/70 leading-relaxed font-medium">
                  {proj.description}
                </p>

                {/* Compensation & Duration Banner */}
                <div className="grid grid-cols-2 gap-3 text-xs py-3 px-4 bg-[#080808] rounded-2xl border border-white/10 font-bold">
                  <div>
                    <div className="text-[9px] text-white/40 uppercase font-black tracking-wider">Compensation</div>
                    <div className="text-sm font-black text-emerald-400 truncate mt-0.5">{proj.stipend_or_credits}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-white/40 uppercase font-black tracking-wider">Commitment</div>
                    <div className="text-sm font-black text-[#F27D26] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#F27D26]" />
                      <span>{proj.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-1.5">Required Skills:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.required_skills.map((skill) => {
                      const isMatch = student.skills.includes(skill);
                      return (
                        <span
                          key={skill}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            isMatch
                              ? 'bg-[#F27D26]/20 text-[#F27D26] border border-[#F27D26]/40 font-black'
                              : 'bg-white/5 text-white/50 border border-white/10'
                          }`}
                        >
                          {isMatch ? `✓ ${skill}` : skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Genie Match Reasoning */}
                {proj.match_reasons && Array.isArray(proj.match_reasons) && proj.match_reasons.length > 0 && (
                  <div className="bg-[#111] p-3 rounded-2xl border border-white/10 text-[11px] space-y-1">
                    <span className="text-[#F27D26] font-black uppercase text-[10px] tracking-wider block">Why recommended:</span>
                    <span className="text-white/80 font-medium">{proj.match_reasons.join(' • ')}</span>
                  </div>
                )}

              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-2">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Status: {proj.status}</span>
                <button
                  onClick={() => onOpenConnectModal({
                    name: proj.professor_name,
                    title: `Lead for ${proj.lab_name}`,
                    email: prof?.contact_email || 'research@campus.edu',
                    type: 'Professor',
                    context: `Applying for undergraduate research vacancy on "${proj.title}" in ${proj.lab_name}.`
                  })}
                  className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black transition flex items-center gap-1.5 shadow"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Apply for Position</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
