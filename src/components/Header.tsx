import React, { useState } from 'react';
import { Sparkles, Database, Search, Users, Compass, BrainCircuit, Sliders, MapPin, Layers, GraduationCap, ChevronDown, Check, Plus } from 'lucide-react';
import { Student } from '../types';
import { INITIAL_STUDENTS } from '../data/mockLakehouse';

interface HeaderProps {
  currentStudent: Student;
  onSelectStudent: (student: Student) => void;
  onOpenCustomProfile: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenGenie: (initialPrompt?: string) => void;
  onOpenLakehouseInspector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStudent,
  onSelectStudent,
  onOpenCustomProfile,
  activeTab,
  setActiveTab,
  onOpenGenie,
  onOpenLakehouseInspector,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenGenie(searchQuery);
      setSearchQuery('');
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'explore', label: 'Opportunities', icon: Compass },
    { id: 'people', label: 'Network', icon: Users },
    { id: 'research', label: 'Research', icon: GraduationCap },
    { id: 'teambuilder', label: 'Team Synergy', icon: BrainCircuit },
    { id: 'whatif', label: 'Simulators', icon: Sliders },
    { id: 'city', label: 'City Intel', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/10">
      {/* Top tier brand and Genie quick prompt bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Hackathon Tag */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#FF3621] to-[#F27D26] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF3621]/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tighter text-white">
                  CAMPUS.IQ
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-[#FF3621]/20 text-[#F27D26] border border-[#FF3621]/40">
                  Genie Track B
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 hidden md:block">
                Lakehouse Intelligence
              </p>
            </div>
          </div>

          {/* Center: Databricks Genie Omnibar with bold high-contrast styling */}
          <div className="flex-1 max-w-xl mx-2">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="relative flex items-center bg-[#111] border-2 border-white/10 group-hover:border-[#F27D26]/60 focus-within:border-[#F27D26] rounded-2xl px-3.5 py-2 transition duration-200 shadow-inner">
                <Sparkles className="w-4 h-4 text-[#F27D26] mr-2.5 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Ask Genie: "Which research matches my CV skills?"'
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-white placeholder-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-2 flex items-center gap-1 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl bg-[#F27D26] hover:bg-[#FF3621] text-black shadow transition flex-shrink-0"
                >
                  <span>Genie</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right actions: Lakehouse Schema & Active Student Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Databricks Lakehouse Inspector Button */}
            <button
              onClick={onOpenLakehouseInspector}
              title="Inspect Databricks Delta Lake Tables & Schema"
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#F27D26]/50 transition"
            >
              <Database className="w-3.5 h-3.5 text-[#F27D26]" />
              <span className="hidden lg:inline">Lakehouse</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F27D26] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F27D26]"></span>
              </span>
            </button>

            {/* Student Profile Switcher */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition text-left"
              >
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#F27D26]"
                />
                <div className="hidden md:block text-right">
                  <div className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">
                    Student Status
                  </div>
                  <div className="text-xs font-black text-white leading-none tracking-tight">
                    {currentStudent.name} • Yr {currentStudent.year}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-white/50 ml-0.5" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-[#111] border-2 border-white/15 rounded-3xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-white/10 text-[10px] font-black text-white/50 uppercase tracking-widest flex justify-between items-center">
                    <span>Demo Profiles</span>
                    <span className="text-[10px] text-[#F27D26] font-black">Databricks Lakehouse</span>
                  </div>

                  <div className="max-h-64 overflow-y-auto py-1 space-y-1">
                    {INITIAL_STUDENTS.map((student) => {
                      const isSelected = student.student_id === currentStudent.student_id;
                      return (
                        <button
                          key={student.student_id}
                          onClick={() => {
                            onSelectStudent(student);
                            setProfileDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left text-xs transition ${
                            isSelected ? 'bg-white text-black font-black' : 'hover:bg-white/10 text-white font-bold'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-black/20"
                            />
                            <div>
                              <div className="text-xs leading-tight">{student.name}</div>
                              <div className={`text-[10px] ${isSelected ? 'text-black/60' : 'text-white/40'}`}>
                                {student.branch.split(' ')[0]} (Yr {student.year})
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-black flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2 border-t border-white/10 mt-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenCustomProfile();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-[#F27D26] hover:text-black text-white transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Custom Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Navigation Sub-Bar with uppercase bold tracking-widest */}
      <div className="border-t border-white/10 bg-[#080808]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar text-xs font-black uppercase tracking-widest">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition ${
                    isActive
                      ? 'bg-white text-black font-black shadow'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-white/40'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
