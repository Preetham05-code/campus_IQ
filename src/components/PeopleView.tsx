import React, { useState } from 'react';
import { Users, Search, GraduationCap, Sparkles, Mail, Building, BookOpen, ExternalLink, ArrowUpRight, MessageSquare, Check, UserPlus } from 'lucide-react';
import { Professor, Student } from '../types';

interface PeopleViewProps {
  currentStudent: Student;
  allStudents: Student[];
  professors: Professor[];
  onSelectProfessor: (prof: Professor) => void;
  onOpenGenie: (prompt?: string) => void;
  onOpenConnectModal: (person: { name: string; title: string; email: string; type: 'Professor' | 'Student'; context: string }) => void;
}

export const PeopleView: React.FC<PeopleViewProps> = ({
  currentStudent,
  allStudents,
  professors,
  onSelectProfessor,
  onOpenGenie,
  onOpenConnectModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'professors' | 'students'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'Computer Science & Engineering', 'Electronics & Communication', 'Information Science / Data Science', 'Biotechnology', 'Mechanical & Automation'];

  const otherStudents = allStudents.filter(s => s.student_id !== currentStudent.student_id);

  // Filter professors
  const filteredProfessors = professors.filter((p) => {
    if (activeCategory === 'students') return false;
    if (selectedDept !== 'All' && p.department !== selectedDept) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const text = (p.name + ' ' + (p.department || '') + ' ' + (p.expertise || []).join(' ') + ' ' + (p.research_interests || []).join(' ') + ' ' + (p.lab_name || '')).toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });

  // Filter students
  const filteredStudents = otherStudents.filter((s) => {
    if (activeCategory === 'professors') return false;
    if (selectedDept !== 'All' && !s.branch.includes(selectedDept.split(' ')[0])) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const text = (s.name + ' ' + (s.branch || '') + ' ' + (s.skills || []).join(' ') + ' ' + (s.interests || []).join(' ') + ' ' + (s.career_goal || '')).toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#111] border-2 border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div>
          <p className="text-[10px] font-black uppercase text-[#F27D26] tracking-widest italic mb-1">
            Databricks Semantic Graph Network
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
            FACULTY &amp; PEER INTELLIGENCE
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl font-medium">
            Connect with professors directing active campus research labs and peers with complementary skills for hackathons.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex p-1.5 bg-[#080808] rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
              activeCategory === 'all' ? 'bg-white text-black shadow' : 'text-white/50 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('professors')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
              activeCategory === 'professors' ? 'bg-[#F27D26] text-black shadow' : 'text-white/50 hover:text-white'
            }`}
          >
            Faculty ({professors.length})
          </button>
          <button
            onClick={() => setActiveCategory('students')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
              activeCategory === 'students' ? 'bg-[#FF3621] text-white shadow' : 'text-white/50 hover:text-white'
            }`}
          >
            Peers ({otherStudents.length})
          </button>
        </div>
      </div>

      {/* Filters & Omnibar Search */}
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-5 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty or students by skill (e.g. ROS, PyTorch, React, BioTech), lab, or domain..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#080808] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#F27D26] font-bold"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-2.5 bg-[#080808] border border-white/10 rounded-2xl text-xs font-bold uppercase text-white focus:outline-none focus:border-[#F27D26]"
            >
              {departments.map(d => (
                <option key={d} value={d} className="bg-[#111] text-white">{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Faculty Section */}
      {(activeCategory === 'all' || activeCategory === 'professors') && filteredProfessors.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight">
              <GraduationCap className="w-5 h-5 text-[#F27D26]" />
              <span>Research Faculty &amp; Lab Directors</span>
            </h2>
            <button
              onClick={() => onOpenGenie("Which professors on campus are working in Computer Vision & Medical AI?")}
              className="text-xs font-black uppercase tracking-wider text-[#F27D26] hover:underline flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Match Faculty with Genie</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredProfessors.map((prof) => (
              <div
                key={prof.professor_id}
                className="bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-[#F27D26]/50 rounded-3xl p-6 space-y-4 transition shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  
                  {/* Top Profile */}
                  <div className="flex items-start gap-4">
                    <img
                      src={prof.avatar}
                      alt={prof.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10 flex-shrink-0"
                    />
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-black text-white truncate tracking-tight">
                          {prof.name}
                        </h3>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          prof.student_collab_status === 'Actively Recruiting'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-white/10 text-white/50'
                        }`}>
                          {prof.student_collab_status}
                        </span>
                      </div>
                      <div className="text-xs text-[#F27D26] font-bold uppercase tracking-wider">
                        {prof.title}
                      </div>
                      <div className="text-[11px] text-white/50 font-medium">
                        {prof.department} • <span className="text-white/80">{prof.office_location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {prof.expertise.map((exp) => (
                      <span key={exp} className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/80 border border-white/10">
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* Why this matches you: Genie Reasoning */}
                  <div className="bg-[#080808] p-3.5 rounded-2xl border border-white/10 text-xs space-y-1">
                    <div className="font-black text-[#F27D26] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
                      <span>Why they match your profile:</span>
                    </div>
                    <p className="text-white/80 text-[11px] leading-relaxed font-medium">
                      {prof.matching_reason || 'Strong research alignment with your verified skill profile and current academic year.'}
                    </p>
                  </div>

                  {/* Lab & Current Projects */}
                  <div className="text-xs space-y-1 font-bold">
                    <div className="text-[11px] text-white/50 uppercase tracking-wider font-bold">
                      Lab: <strong className="text-white">{prof.lab_name}</strong> ({prof.open_positions_count} open undergrad roles)
                    </div>
                    {prof.current_projects && prof.current_projects.length > 0 && (
                      <div className="text-[11px] text-white/70 font-medium">
                        Projects: <span className="text-white font-bold">{prof.current_projects.join(' • ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Top Publication */}
                  {prof.publications && prof.publications.length > 0 && (
                    <div className="text-[11px] text-white/60 italic bg-[#111] p-3 rounded-xl border border-white/10">
                      Top Paper: "{prof.publications[0].title}" ({prof.publications[0].year}, {prof.publications[0].citations} citations)
                    </div>
                  )}

                </div>

                {/* Actions: How to Approach & Email */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-2">
                  <span className="text-[11px] text-white/40 truncate font-mono">{prof.contact_email}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProfessor(prof)}
                      className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition"
                    >
                      Lab Details
                    </button>
                    <button
                      onClick={() => onOpenConnectModal({
                        name: prof.name,
                        title: prof.title,
                        email: prof.contact_email,
                        type: 'Professor',
                        context: `Applying for undergraduate research in ${prof.lab_name} for projects in ${(prof.expertise || []).slice(0, 2).join(', ') || 'AI & Engineering'}.`
                      })}
                      className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black transition flex items-center gap-1.5 shadow"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Outreach Email</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Student Peers Section */}
      {(activeCategory === 'all' || activeCategory === 'students') && filteredStudents.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight">
              <Users className="w-5 h-5 text-[#FF3621]" />
              <span>Student Peers &amp; Collaborators</span>
            </h2>
            <button
              onClick={() => onOpenGenie("Find students with frontend or IoT skills to team up for hackathons")}
              className="text-xs font-black uppercase tracking-wider text-[#F27D26] hover:underline flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Find Hackathon Teammates</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStudents.map((peer) => (
              <div
                key={peer.student_id}
                className="bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-[#F27D26]/50 rounded-3xl p-6 space-y-4 transition shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  
                  {/* Avatar & Header */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/10"
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="text-base font-black text-white truncate tracking-tight">{peer.name}</div>
                      <div className="text-xs text-[#F27D26] font-bold uppercase tracking-wider truncate">
                        Year {peer.year} • {peer.branch}
                      </div>
                      <div className="text-[10px] text-white/50 truncate font-bold uppercase">
                        Goal: {peer.career_goal}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-medium">
                    {peer.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {peer.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/80 border border-white/10">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Complementary Value */}
                  <div className="bg-[#080808] p-3 rounded-2xl border border-white/10 text-[11px]">
                    <span className="text-emerald-400 font-black uppercase text-[10px] tracking-wider block mb-0.5">Team Synergy:</span>
                    <span className="text-white/80 font-medium">
                      Brings complementary strength in {(peer.skills || []).slice(0, 2).join(' & ') || 'Core Engineering'}. Available {peer.availability_hours_per_week || 10} hrs/week.
                    </span>
                  </div>

                </div>

                {/* Connect Action */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[10px] text-white/40 font-mono">{peer.email}</span>
                  <button
                    onClick={() => onOpenConnectModal({
                      name: peer.name,
                      title: `Year ${peer.year} Student (${peer.branch})`,
                      email: peer.email,
                      type: 'Student',
                      context: `Inviting ${peer.name} to team up for upcoming hackathons or research collaborations.`
                    })}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black transition flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Invite</span>
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
