import React, { useState } from 'react';
import { Compass, Search, Filter, Sparkles, MapPin, Clock, Building, ArrowUpRight, Bookmark, Tag, Users, Calendar, Award, ExternalLink, SlidersHorizontal, Check } from 'lucide-react';
import { Opportunity, Club, CampusEvent, Student } from '../types';

interface ExploreViewProps {
  student: Student;
  opportunities: Opportunity[];
  clubs: Club[];
  events: CampusEvent[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onSelectClub: (club: Club) => void;
  onToggleBookmark: (oppId: string) => void;
  onOpenGenie: (prompt?: string) => void;
  onOpenTeamBuilderWithOpp?: (opp: Opportunity) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  student,
  opportunities,
  clubs,
  events,
  onSelectOpportunity,
  onSelectClub,
  onToggleBookmark,
  onOpenGenie,
  onOpenTeamBuilderWithOpp,
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'beyond-campus' | 'campus'>('beyond-campus');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedRemote, setSelectedRemote] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  // Opportunity Types for Beyond Campus
  const oppTypes = ['All', 'Internship', 'Summer Internship', 'Hackathon', 'Research Internship', 'Tech Talk', 'Fellowship', 'Competition'];
  const domains = ['All', 'AI/ML', 'Healthcare AI', 'Computer Vision', 'Data Systems', 'IoT & Embedded', 'Web & Full-Stack', 'Cloud'];

  // Filter Beyond Campus Opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    if (activeMainTab !== 'beyond-campus') return true;

    if (bookmarkedOnly && !opp.is_bookmarked) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = (opp.title + ' ' + opp.organization + ' ' + opp.domain + ' ' + (opp.required_skills || []).join(' ')).toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    if (selectedType !== 'All' && opp.type !== selectedType) return false;

    if (selectedPriority !== 'All' && !(opp.priority_tier || '').includes(selectedPriority)) return false;

    if (selectedRemote !== 'All' && opp.remote_status !== selectedRemote) return false;

    if (selectedDomain !== 'All') {
      const hasDomain = (opp.domain || '').toLowerCase().includes(selectedDomain.toLowerCase());
      if (!hasDomain) return false;
    }

    return true;
  });

  // Filter Campus Clubs & Events
  const filteredClubs = clubs.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (c.name + ' ' + c.category + ' ' + (c.skills || []).join(' ') + ' ' + (c.description || '')).toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner in Bold Typography */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#111] border-2 border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div>
          <p className="text-[10px] font-black uppercase text-[#F27D26] tracking-widest italic mb-1">
            Databricks Unified Discovery Engine
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
            OPPORTUNITY DISCOVERY
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl font-medium">
            Bridging campus research labs with off-campus tech ecosystems, Bengaluru hackathons, and corporate internships.
          </p>
        </div>

        {/* Subtab Toggle: Beyond Campus vs Campus */}
        <div className="flex p-1.5 bg-[#080808] rounded-2xl border border-white/10 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveMainTab('beyond-campus')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              activeMainTab === 'beyond-campus'
                ? 'bg-white text-black shadow-md'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Beyond Campus ({opportunities.length})</span>
          </button>
          <button
            onClick={() => setActiveMainTab('campus')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              activeMainTab === 'campus'
                ? 'bg-[#F27D26] text-black shadow-md'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Campus Clubs ({clubs.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-5 space-y-4 shadow-xl">
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, skill (e.g. Python, Vision, PyTorch), domain..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#080808] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#F27D26] font-bold"
            />
          </div>

          {/* Quick Priority Filter Matrix */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mr-1 flex-shrink-0">Tier:</span>
            {['All', 'Apply Now', 'Consider', 'Explore Later'].map((p) => {
              const isActive = selectedPriority === p;
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPriority(p)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition ${
                    isActive
                      ? 'bg-white text-black shadow'
                      : 'bg-white/5 text-white/50 hover:text-white border border-white/10'
                  }`}
                >
                  {p === 'Apply Now' ? '🔴 Apply Now' : p === 'Consider' ? '🟡 Consider' : p === 'Explore Later' ? '🟢 Explore' : 'All'}
                </button>
              );
            })}
          </div>

          {/* Saved Bookmarks Toggle */}
          <button
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border transition ${
              bookmarkedOnly
                ? 'bg-[#F27D26] text-black border-[#F27D26]'
                : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarkedOnly ? 'fill-black text-black' : ''}`} />
            <span>Saved ({opportunities.filter(o => o.is_bookmarked).length})</span>
          </button>
        </div>

        {/* Deep Category / Domain / Work Mode Pills */}
        {activeMainTab === 'beyond-campus' && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mr-1">Type:</span>
            {oppTypes.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                  selectedType === t
                    ? 'bg-[#F27D26] text-black'
                    : 'bg-white/5 text-white/50 hover:text-white border border-white/10'
                }`}
              >
                {t}
              </button>
            ))}

            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2 mr-1">Location:</span>
            {['All', 'Remote', 'On-Site', 'Hybrid'].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRemote(r)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                  selectedRemote === r
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/50 hover:text-white border border-white/10'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Main Content Area */}
      {activeMainTab === 'beyond-campus' ? (
        
        /* Beyond Campus Opportunity Cards Grid */
        <div className="space-y-6">
          
          <div className="flex items-center justify-between text-xs text-white/50 font-bold uppercase tracking-wider">
            <span>Showing <strong className="text-white">{filteredOpportunities.length}</strong> opportunities</span>
            <button
              onClick={() => onOpenGenie("Recommend the top 3 highest-ROI off-campus internships for me")}
              className="text-[#F27D26] hover:underline flex items-center gap-1.5 font-black"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prioritize Top 3 with Genie</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredOpportunities.map((opp, idx) => (
              <div
                key={opp.opportunity_id}
                className="bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-[#F27D26]/60 rounded-3xl p-6 transition duration-200 flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-3.5">
                  
                  {/* Top metadata tags */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-white/10 text-white uppercase tracking-wider">
                        {opp.type}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-[#FF3621]/20 text-[#F27D26] border border-[#FF3621]/40 uppercase tracking-wider">
                        {opp.category}
                      </span>
                      <span className="text-[10px] font-black uppercase text-[#FF3621]">
                        {opp.priority_tier}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="px-3 py-1 rounded-full border border-[#F27D26] text-[#F27D26] text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#F27D26]" />
                        <span>{opp.match_score || 90}%</span>
                      </div>
                      <button
                        onClick={() => onToggleBookmark(opp.opportunity_id)}
                        className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                        title={opp.is_bookmarked ? 'Saved' : 'Save'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${opp.is_bookmarked ? 'fill-[#F27D26] text-[#F27D26]' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3
                      onClick={() => onSelectOpportunity(opp)}
                      className="text-xl font-black text-white hover:text-[#F27D26] cursor-pointer transition line-clamp-1 tracking-tight"
                    >
                      {opp.title}
                    </h3>
                    <div className="text-xs font-bold text-white/50 mt-0.5 uppercase tracking-wider">
                      {opp.organization}
                    </div>
                  </div>

                  {/* Compensation & Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs py-3 px-4 bg-[#080808] rounded-2xl border border-white/10 font-bold">
                    <div>
                      <div className="text-[9px] text-white/40 uppercase font-black tracking-wider">Compensation</div>
                      <div className="text-sm font-black text-emerald-400 truncate mt-0.5">{opp.stipend_or_prize}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-white/40 uppercase font-black tracking-wider">Deadline</div>
                      <div className="text-sm font-black text-[#F27D26] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{opp.deadline} ({opp.days_left}d)</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-medium">
                    {opp.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {opp.required_skills.map((skill) => {
                      const isStudentSkill = student.skills.includes(skill);
                      return (
                        <span
                          key={skill}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            isStudentSkill
                              ? 'bg-[#F27D26]/20 text-[#F27D26] border border-[#F27D26]/40'
                              : 'bg-white/5 text-white/50 border border-white/10'
                          }`}
                        >
                          {isStudentSkill ? `✓ ${skill}` : skill}
                        </span>
                      );
                    })}
                  </div>

                  {/* Reasoning Preview */}
                  {opp.match_reasons && opp.match_reasons.length > 0 && (
                    <div className="text-[11px] text-white/80 bg-[#111] p-3 rounded-2xl border border-white/10 font-medium">
                      <span className="text-[#F27D26] font-black uppercase text-[10px] tracking-wider block mb-1">Genie Match Reason:</span>
                      {opp.match_reasons[0]}
                    </div>
                  )}

                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
                    <span>{opp.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {opp.type === 'Hackathon' && onOpenTeamBuilderWithOpp && (
                      <button
                        onClick={() => onOpenTeamBuilderWithOpp(opp)}
                        className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Find Teammates</span>
                      </button>
                    )}
                    <button
                      onClick={() => onSelectOpportunity(opp)}
                      className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black transition flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      ) : (
        
        /* Campus Clubs & Student Communities Tab */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredClubs.map((club) => (
              <div
                key={club.club_id}
                className="bg-white/5 border border-white/10 hover:border-[#F27D26]/50 rounded-3xl p-6 space-y-4 transition shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-[#FF3621]/20 text-[#F27D26] border border-[#FF3621]/40 uppercase tracking-wider">
                      {club.category}
                    </span>
                    <h3 className="text-xl font-black text-white mt-2 tracking-tight">
                      {club.name}
                    </h3>
                    <p className="text-xs text-[#F27D26] font-bold mt-0.5">
                      {club.tagline}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    club.recruitment_status === 'Open' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-white/10 text-white/50'
                  }`}>
                    {club.recruitment_status}
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed font-medium">
                  {club.description}
                </p>

                <div className="space-y-1.5 text-xs font-bold text-white/50 uppercase tracking-wider">
                  <div>
                    Advisor: <strong className="text-white">{club.faculty_advisor}</strong> • {club.member_count} members
                  </div>
                  <div>
                    Schedule: <span className="text-white/80">{club.meeting_schedule}</span>
                  </div>
                </div>

                {/* Skills Trained */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {club.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/80 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Active Projects */}
                {club.projects_active && club.projects_active.length > 0 && (
                  <div className="bg-[#080808] p-3 rounded-2xl border border-white/10 text-[11px] space-y-1">
                    <div className="font-black text-white/40 uppercase text-[10px] tracking-wider">Active Club Projects:</div>
                    <div className="text-white font-bold">
                      {club.projects_active.join(' • ')}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                  <span className="text-white/40 font-bold uppercase tracking-wider text-[10px]">Next: {club.upcoming_events[0] || 'Weekly sprint'}</span>
                  <button
                    onClick={() => onOpenGenie(`How can I join ${club.name} and contribute to their active projects?`)}
                    className="text-xs font-black uppercase tracking-wider text-[#F27D26] hover:underline flex items-center gap-1"
                  >
                    <span>Connect &amp; Join</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      )}

    </div>
  );
};
