import { CampusEvent, Club, Opportunity, Professor, ResearchProject, Student } from './types';

function parseMaybeJson<T>(value: any, fallback: T): T {
  if (value == null || value === '') return fallback;
  if (typeof value !== 'string') return value as T;
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

export function normalizeStudent(row: any): Student {
  return {
    ...row,
    year: Number(row.year),
    cgpa: Number(row.cgpa),
    skills: Array.isArray(row.skills) ? row.skills : [],
    interests: Array.isArray(row.interests) ? row.interests : [],
    preferred_domains: Array.isArray(row.preferred_domains) ? row.preferred_domains : [],
    projects: Array.isArray(row.projects) ? row.projects : [],
    clubs: Array.isArray(row.clubs) ? row.clubs : [],
    research_interests: Array.isArray(row.research_interests) ? row.research_interests : [],
    availability_hours_per_week: Number(row.availability_hours_per_week),
  };
}

export function normalizeProfessor(row: any): Professor {
  return {
    ...row,
    expertise: Array.isArray(row.expertise) ? row.expertise : [],
    research_interests: Array.isArray(row.research_interests) ? row.research_interests : [],
    publications: parseMaybeJson(row.publications, []),
    current_projects: Array.isArray(row.current_projects) ? row.current_projects : [],
    courses: Array.isArray(row.courses) ? row.courses : [],
    mentorship_areas: Array.isArray(row.mentorship_areas) ? row.mentorship_areas : [],
    open_positions_count: Number(row.open_positions_count || 0),
  };
}

export function normalizeResearchProject(row: any): ResearchProject {
  return {
    ...row,
    required_skills: Array.isArray(row.required_skills) ? row.required_skills : [],
    open_positions: Number(row.open_positions || 0),
    matched_score: row.matched_score == null ? undefined : Number(row.matched_score),
    match_reasons: parseMaybeJson(row.match_reasons, []),
  };
}

export function normalizeClub(row: any): Club {
  return {
    ...row,
    skills: Array.isArray(row.skills) ? row.skills : [],
    student_coordinators: parseMaybeJson(row.student_coordinators, []),
    member_count: Number(row.member_count || 0),
    upcoming_events: Array.isArray(row.upcoming_events) ? row.upcoming_events : [],
    projects_active: Array.isArray(row.projects_active) ? row.projects_active : [],
  };
}

export function normalizeOpportunity(row: any): Opportunity {
  return {
    ...row,
    required_skills: Array.isArray(row.required_skills) ? row.required_skills : [],
    days_left: Number(row.days_left || 0),
    match_score: row.match_score == null ? undefined : Number(row.match_score),
    match_reasons: row.match_reason ? String(row.match_reason).split(' • ').filter(Boolean) : parseMaybeJson(row.match_reasons, []),
    is_bookmarked: Boolean(row.is_bookmarked),
  };
}

export function normalizeEvent(row: any): CampusEvent {
  return {
    ...row,
    required_skills: Array.isArray(row.required_skills) ? row.required_skills : [],
    spots_available: Number(row.spots_available || 0),
    is_free: Boolean(row.is_free),
  };
}

export async function loadCampusData() {
  const response = await fetch('/api/lakehouse/data');
  if (!response.ok) throw new Error(await response.text());
  const payload = await response.json();
  const d = payload.data;
  return {
    students: (d.students || []).map(normalizeStudent),
    professors: (d.professors || []).map(normalizeProfessor),
    researchProjects: (d.research_projects || []).map(normalizeResearchProject),
    clubs: (d.clubs || []).map(normalizeClub),
    opportunities: (d.opportunities || []).map(normalizeOpportunity),
    events: (d.campus_events || []).map(normalizeEvent),
  };
}

export async function loadPersonalizedOpportunities(student: Student) {
  const response = await fetch('/api/opportunities/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student }),
  });
  if (!response.ok) throw new Error(await response.text());
  const payload = await response.json();
  return (payload.opportunities || []).map(normalizeOpportunity) as Opportunity[];
}
