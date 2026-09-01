/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { DemoFlowBar } from './components/DemoFlowBar';
import { DashboardView } from './components/DashboardView';
import { ExploreView } from './components/ExploreView';
import { PeopleView } from './components/PeopleView';
import { ResearchView } from './components/ResearchView';
import { TeamBuilderView } from './components/TeamBuilderView';
import { WhatIfSimulatorView } from './components/WhatIfSimulatorView';
import { CityIntelligenceView } from './components/CityIntelligenceView';
import { GenieModal } from './components/GenieModal';
import { LakehouseInspectorModal } from './components/LakehouseInspectorModal';
import { OpportunityDetailModal } from './components/OpportunityDetailModal';
import { CustomProfileModal } from './components/CustomProfileModal';
import { ConnectModal } from './components/ConnectModal';

import {
  INITIAL_STUDENTS,
  INITIAL_OPPORTUNITIES,
  INITIAL_PROFESSORS,
  INITIAL_RESEARCH_PROJECTS,
  INITIAL_CLUBS,
  INITIAL_EVENTS,
  INITIAL_ROADMAP,
} from './data/mockLakehouse';
import { Student, Opportunity, Professor, Club, CampusEvent, ResearchProject } from './types';
import { loadCampusData, loadPersonalizedOpportunities } from './api';

export default function App() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [currentStudent, setCurrentStudent] = useState<Student>(INITIAL_STUDENTS[0]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [professors, setProfessors] = useState<Professor[]>(INITIAL_PROFESSORS);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>(INITIAL_RESEARCH_PROJECTS);
  const [clubs, setClubs] = useState<Club[]>(INITIAL_CLUBS);
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [roadmap, setRoadmap] = useState(INITIAL_ROADMAP);

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Modals state
  const [isGenieOpen, setIsGenieOpen] = useState(false);
  const [geniePrompt, setGeniePrompt] = useState<string | undefined>(undefined);

  const [isLakehouseInspectorOpen, setIsLakehouseInspectorOpen] = useState(false);
  const [isCustomProfileOpen, setIsCustomProfileOpen] = useState(false);

  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [selectedProfessorForDetail, setSelectedProfessorForDetail] = useState<Professor | null>(null);
  const [teamBuilderPreselectedOpp, setTeamBuilderPreselectedOpp] = useState<Opportunity | null>(null);

  const [connectModalData, setConnectModalData] = useState<{
    name: string;
    title: string;
    email: string;
    type: 'Professor' | 'Student';
    context: string;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  // Load the six real Unity Catalog Gold tables into the existing frontend state.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await loadCampusData();
        if (cancelled || data.students.length === 0) return;
        setStudents(data.students);
        setCurrentStudent(data.students[0]);
        setProfessors(data.professors);
        setResearchProjects(data.researchProjects);
        setClubs(data.clubs);
        setEvents(data.events);
        setOpportunities(data.opportunities);
        setDataError(null);
      } catch (error: any) {
        console.error('Could not load Databricks Gold data:', error);
        if (!cancelled) setDataError('Live Databricks data is unavailable; showing local fallback data.');
      } finally {
        if (!cancelled) setIsDataLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Re-score the opportunity cards in Databricks whenever the active profile changes.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const matches = await loadPersonalizedOpportunities(currentStudent);
        if (!cancelled && matches.length > 0) {
          setOpportunities(prev => {
            const bookmarkMap = new Map(prev.map(o => [o.opportunity_id, Boolean(o.is_bookmarked)]));
            return matches.map(o => ({ ...o, is_bookmarked: bookmarkMap.get(o.opportunity_id) ?? o.is_bookmarked }));
          });
        }
      } catch (error) {
        console.warn('Personalized Databricks matching unavailable:', error);
      }
    })();
    return () => { cancelled = true; };
  }, [currentStudent]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle bookmark on opportunity
  const handleToggleBookmark = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.opportunity_id === oppId) {
          const nextVal = !opp.is_bookmarked;
          showToast(nextVal ? `Saved "${opp.title}" to your bookmarks` : `Removed from bookmarks`);
          return { ...opp, is_bookmarked: nextVal };
        }
        return opp;
      })
    );
  };

  // Handle student profile switch
  const handleSelectStudent = (student: Student) => {
    setCurrentStudent(student);
    showToast(`Switched profile to ${student.name} (Yr ${student.year}, ${student.branch.split(' ')[0]})`);
  };

  // Handle saving custom student profile
  const handleSaveCustomProfile = (newStudent: Student) => {
    setCurrentStudent(newStudent);
    setStudents((prev) => {
      const idx = prev.findIndex((s) => s.student_id === newStudent.student_id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newStudent;
        return copy;
      }
      return [newStudent, ...prev];
    });
    showToast(`Profile updated! Lakehouse matching re-scored for ${newStudent.name}`);
  };

  // Open Genie modal with prompt
  const handleOpenGenie = (prompt?: string) => {
    setGeniePrompt(prompt);
    setIsGenieOpen(true);
  };

  // Run demo prompt from judges demo flow bar
  const handleRunDemoPrompt = (prompt: string, stepId?: string) => {
    handleOpenGenie(prompt);
  };

  // Apply simulated What-If changes to student profile
  const handleApplySimulatedProfile = (
    newGoal: string,
    newHours: number,
    newPref: 'Internship' | 'Research' | 'Hackathon' | 'Startup' | 'All'
  ) => {
    const updated: Student = {
      ...currentStudent,
      career_goal: newGoal,
      availability_hours_per_week: newHours,
    };
    setCurrentStudent(updated);
    setActiveTab('dashboard');
    showToast(`Applied What-If constraints: Goal = ${newGoal}, ${newHours} hrs/week`);
  };

  // Handle Team Builder open from opportunity
  const handleOpenTeamBuilderWithOpp = (opp: Opportunity) => {
    setTeamBuilderPreselectedOpp(opp);
    setActiveTab('teambuilder');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#F27D26] selection:text-black flex flex-col antialiased">
      
      {/* Top Main Navigation Header */}
      <Header
        currentStudent={currentStudent}
        onSelectStudent={handleSelectStudent}
        onOpenCustomProfile={() => setIsCustomProfileOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGenie={handleOpenGenie}
        onOpenLakehouseInspector={() => setIsLakehouseInspectorOpen(true)}
      />

      {/* Judges Demo Flow Benchmark Bar */}
      <DemoFlowBar
        onRunDemoPrompt={handleRunDemoPrompt}
        onOpenTeamBuilderTab={() => setActiveTab('teambuilder')}
        onOpenWhatIfTab={() => setActiveTab('whatif')}
      />

      {dataError && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
          <div className="rounded-xl border border-[#F27D26]/30 bg-[#F27D26]/10 px-4 py-2 text-[11px] font-bold text-[#F27D26]">
            {dataError}
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {isDataLoading && (
          <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold text-white/60">
            Connecting CampusIQ to Databricks Unity Catalog…
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            student={currentStudent}
            opportunities={opportunities}
            professors={professors}
            researchProjects={researchProjects}
            events={events}
            roadmap={roadmap}
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
            onSelectProfessor={(prof) => {
              setConnectModalData({
                name: prof.name,
                title: prof.title,
                email: prof.contact_email,
                type: 'Professor',
                context: `Inquiring about undergraduate research openings in ${prof.lab_name}.`
              });
            }}
            onOpenGenie={handleOpenGenie}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreView
            student={currentStudent}
            opportunities={opportunities}
            clubs={clubs}
            events={events}
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
            onSelectClub={(club) => {
              handleOpenGenie(`Tell me about joining ${club.name} and how to get involved in their active projects.`);
            }}
            onToggleBookmark={handleToggleBookmark}
            onOpenGenie={handleOpenGenie}
            onOpenTeamBuilderWithOpp={handleOpenTeamBuilderWithOpp}
          />
        )}

        {activeTab === 'people' && (
          <PeopleView
            currentStudent={currentStudent}
            allStudents={students}
            professors={professors}
            onSelectProfessor={(prof) => {
              setConnectModalData({
                name: prof.name,
                title: prof.title,
                email: prof.contact_email,
                type: 'Professor',
                context: `Applying for undergraduate research assistant position in ${prof.lab_name}.`
              });
            }}
            onOpenGenie={handleOpenGenie}
            onOpenConnectModal={(person) => setConnectModalData(person)}
          />
        )}

        {activeTab === 'research' && (
          <ResearchView
            student={currentStudent}
            researchProjects={researchProjects}
            professors={professors}
            onOpenGenie={handleOpenGenie}
            onOpenConnectModal={(person) => setConnectModalData(person)}
          />
        )}

        {activeTab === 'teambuilder' && (
          <TeamBuilderView
            currentStudent={currentStudent}
            allStudents={students}
            opportunities={opportunities}
            onOpenConnectModal={(person) => setConnectModalData(person)}
            onOpenGenie={handleOpenGenie}
            preselectedOpportunity={teamBuilderPreselectedOpp}
          />
        )}

        {activeTab === 'whatif' && (
          <WhatIfSimulatorView
            currentStudent={currentStudent}
            opportunities={opportunities}
            professors={professors}
            researchProjects={researchProjects}
            onOpenGenie={handleOpenGenie}
            onApplySimulatedProfile={handleApplySimulatedProfile}
          />
        )}

        {activeTab === 'city' && (
          <CityIntelligenceView
            events={events}
            opportunities={opportunities}
            onOpenGenie={handleOpenGenie}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#080808] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex items-center gap-2.5 font-bold">
            <div className="w-5 h-5 bg-gradient-to-tr from-[#FF3621] to-[#F27D26] rounded-md"></div>
            <span className="text-white font-black tracking-tighter text-sm">CAMPUS.IQ</span>
            <span className="text-white/20">•</span>
            <span className="uppercase text-[10px] tracking-wider text-white/50">Databricks Track B: Creative Campus Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <span>Databricks Genie AI</span>
            <span>•</span>
            <span>Unity Catalog Delta Lake</span>
            <span>•</span>
            <span className="text-[#F27D26]">Photon Sub-second SQL</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <GenieModal
        isOpen={isGenieOpen}
        onClose={() => {
          setIsGenieOpen(false);
          setGeniePrompt(undefined);
        }}
        initialPrompt={geniePrompt}
        currentStudent={currentStudent}
      />

      <LakehouseInspectorModal
        isOpen={isLakehouseInspectorOpen}
        onClose={() => setIsLakehouseInspectorOpen(false)}
      />

      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        student={currentStudent}
        onClose={() => setSelectedOpportunity(null)}
        onToggleBookmark={handleToggleBookmark}
        onOpenTeamBuilderWithOpp={handleOpenTeamBuilderWithOpp}
        onOpenGenie={handleOpenGenie}
      />

      <CustomProfileModal
        isOpen={isCustomProfileOpen}
        onClose={() => setIsCustomProfileOpen(false)}
        currentStudent={currentStudent}
        onSaveProfile={handleSaveCustomProfile}
      />

      <ConnectModal
        isOpen={!!connectModalData}
        onClose={() => setConnectModalData(null)}
        person={connectModalData}
        currentStudent={currentStudent}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111] border-2 border-[#F27D26] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 duration-200 flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
