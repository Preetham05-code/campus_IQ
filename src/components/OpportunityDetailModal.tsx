import React from 'react';
import { X, Sparkles, Building, MapPin, Clock, Bookmark, ArrowUpRight, CheckCircle2, AlertCircle, Users, ExternalLink, ShieldCheck } from 'lucide-react';
import { Opportunity, Student } from '../types';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  student: Student;
  onClose: () => void;
  onToggleBookmark: (id: string) => void;
  onOpenTeamBuilderWithOpp?: (opp: Opportunity) => void;
  onOpenGenie: (prompt: string) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  student,
  onClose,
  onToggleBookmark,
  onOpenTeamBuilderWithOpp,
  onOpenGenie,
}) => {
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080808]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-[#F27D26] text-[#F27D26] bg-[#FF3621]/10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>{opportunity.match_score || 95}% Match</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              {opportunity.priority_tier}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(opportunity.opportunity_id)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition border border-white/10"
              title={opportunity.is_bookmarked ? 'Saved' : 'Save'}
            >
              <Bookmark className={`w-4 h-4 ${opportunity.is_bookmarked ? 'fill-[#F27D26] text-[#F27D26]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#080808]">
          
          {/* Main Title & Organization */}
          <div className="space-y-2">
            <div className="text-xs font-black text-[#F27D26] uppercase tracking-widest flex items-center gap-1.5">
              <Building className="w-4 h-4 text-[#F27D26]" />
              <span>{opportunity.organization}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase">
              {opportunity.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                {opportunity.stipend_or_prize}
              </span>
              <span className="flex items-center gap-1 text-white/60">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                {opportunity.location} ({opportunity.remote_status})
              </span>
              <span className="flex items-center gap-1 text-[#F27D26]">
                <Clock className="w-3.5 h-3.5" />
                Deadline: {opportunity.deadline} ({opportunity.days_left} days left)
              </span>
            </div>
          </div>

          {/* "Why This Matches You" — Genie Reasoning Card */}
          <div className="bg-[#111] border-2 border-white/10 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#F27D26] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F27D26]" />
                <span>Genie Lakehouse Match Reasoning</span>
              </h3>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{student.name}</span>
            </div>

            <ul className="space-y-2 text-xs text-white/80 font-medium">
              {opportunity.match_reasons?.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26] flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="space-y-2 text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
            <h4 className="font-black text-white text-xs uppercase tracking-widest">Opportunity Overview</h4>
            <p>{opportunity.description}</p>
          </div>

          {/* Required Skills vs Student Match */}
          <div className="space-y-2">
            <h4 className="font-black text-white text-xs uppercase tracking-widest">Skill Alignment</h4>
            <div className="flex flex-wrap gap-2">
              {opportunity.required_skills.map((skill) => {
                const isStudentSkill = student.skills.includes(skill);
                return (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                      isStudentSkill
                        ? 'bg-white/10 text-white border border-[#F27D26]'
                        : 'bg-white/5 text-white/40 border border-white/10'
                    }`}
                  >
                    {isStudentSkill ? <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26]" /> : <span className="w-1.5 h-1.5 rounded-full bg-white/20" />}
                    <span>{skill}</span>
                    {isStudentSkill && <span className="text-[9px] text-[#F27D26]">(In Profile)</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-[#111] p-4 rounded-2xl border border-white/10 text-xs space-y-1.5 font-medium">
            <h4 className="font-black uppercase tracking-wider text-white text-[11px]">Eligibility &amp; Prerequisites:</h4>
            <p className="text-white/70">{opportunity.eligibility || 'Open to all enrolled students meeting the required skill criteria.'}</p>
            <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider pt-1">
              Target Depts: <strong className="text-white">{(opportunity.departments_targeted || ['Computer Science', 'AI & Data Science', 'ECE', 'All Engineering']).join(', ')}</strong> • Target Years: <strong className="text-white">{(opportunity.target_years || [1, 2, 3, 4]).map(y => `Yr ${y}`).join(', ')}</strong>
            </div>
          </div>

        </div>

        {/* Bottom Actions Bar */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#080808] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onOpenGenie(`How should I prepare my application and resume specifically for "${opportunity.title}" at ${opportunity.organization}?`)}
            className="text-xs font-black uppercase tracking-wider text-[#F27D26] hover:text-[#FF3621] flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#F27D26]" />
            <span>Generate Genie Application Strategy</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {opportunity.type === 'Hackathon' && onOpenTeamBuilderWithOpp && (
              <button
                onClick={() => {
                  onClose();
                  onOpenTeamBuilderWithOpp(opportunity);
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center gap-1.5 border border-white/10"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Build Team</span>
              </button>
            )}

            <a
              href={opportunity.application_link || (opportunity as any).apply_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black transition flex items-center justify-center gap-1.5 shadow-xl"
            >
              <span>Apply Directly</span>
              <ExternalLink className="w-3.5 h-3.5 text-black" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
