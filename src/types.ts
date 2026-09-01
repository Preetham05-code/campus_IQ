export interface Student {
  student_id: string;
  name: string;
  avatar: string;
  branch: string;
  year: number; // 1, 2, 3, 4
  cgpa: number;
  skills: string[];
  interests: string[];
  career_goal: string;
  preferred_domains: string[];
  experience_level: 'Beginner' | 'Intermediate' | 'Advanced';
  projects: string[];
  clubs: string[];
  research_interests: string[];
  availability_hours_per_week: number;
  preferred_opportunity_type: 'Internship' | 'Research' | 'Hackathon' | 'Startup' | 'All';
  location_preference: 'On-Campus' | 'Bengaluru' | 'Remote' | 'Flexible';
  bio: string;
  email: string;
  github?: string;
  linkedin?: string;
}

export interface Professor {
  professor_id: string;
  name: string;
  title: string;
  avatar: string;
  department: string;
  expertise: string[];
  research_interests: string[];
  publications: { title: string; year: number; citations: number; link?: string }[];
  current_projects: string[];
  lab_name: string;
  courses: string[];
  mentorship_areas: string[];
  student_collab_status: 'Actively Recruiting' | 'Limited Openings' | 'Full';
  open_positions_count: number;
  contact_email: string;
  office_location: string;
  matching_reason?: string;
}

export interface ResearchProject {
  project_id: string;
  title: string;
  lab_name: string;
  professor_id: string;
  professor_name: string;
  department: string;
  domain: string;
  description: string;
  required_skills: string[];
  open_positions: number;
  stipend_or_credits: string;
  duration: string;
  status: 'Open' | 'Interviewing' | 'Closed';
  matched_score?: number;
  match_reasons?: string[];
}

export interface Club {
  club_id: string;
  name: string;
  category: 'Technical' | 'Cultural' | 'Entrepreneurship' | 'Research' | 'Developer Community' | 'Social Impact';
  tagline: string;
  description: string;
  skills: string[];
  student_coordinators: { name: string; year: number; contact: string }[];
  faculty_advisor: string;
  member_count: number;
  upcoming_events: string[];
  projects_active: string[];
  recruitment_status: 'Open' | 'Rolling' | 'Closed';
  meeting_schedule: string;
  icon_name?: string;
}

export interface Opportunity {
  opportunity_id: string;
  title: string;
  organization: string;
  logo?: string;
  type: 'Internship' | 'Summer Internship' | 'Hackathon' | 'Research Internship' | 'Tech Talk' | 'Fellowship' | 'Scholarship' | 'Open Source' | 'Competition';
  category: 'Campus' | 'Off-Campus' | 'Bengaluru City Event';
  domain: string;
  required_skills: string[];
  eligibility: string;
  deadline: string; // YYYY-MM-DD or readable
  days_left: number;
  location: string;
  remote_status: 'Remote' | 'On-Site' | 'Hybrid';
  stipend_or_prize: string;
  duration?: string;
  application_link: string;
  description: string;
  priority_tier: '🔴 Apply Now' | '🟡 Consider' | '🟢 Explore Later';
  match_score?: number;
  match_reasons?: string[];
  team_size?: string;
  spots_left?: number;
  is_bookmarked?: boolean;
}

export interface CampusEvent {
  event_id: string;
  title: string;
  category: 'Hackathon' | 'Workshop' | 'Tech Talk' | 'Career Fair' | 'Research Seminar' | 'Club Meetup';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  speaker?: string;
  required_skills: string[];
  registration_deadline: string;
  spots_available: number;
  is_free: boolean;
  registration_link: string;
  city_connection?: string; // e.g. "Bengaluru Tech Corridor"
}

export interface RoadmapStep {
  timeframe: 'This Month' | 'Next Month' | 'Next 3 Months' | 'Before Summer';
  title: string;
  description: string;
  action_items: { label: string; type: 'club' | 'workshop' | 'professor' | 'hackathon' | 'project' | 'internship'; target_id?: string; completed?: boolean }[];
  impact: string;
}

export interface TeamRecommendation {
  role: string;
  person_name: string;
  person_id: string;
  branch_year: string;
  skills: string[];
  complementary_reason: string;
  avatar: string;
}

export interface GenieResponse {
  answer: string;
  sql_generated?: string;
  tables_consulted?: string[];
  query_latency_ms?: number;
  reasoning_steps?: string[];
  matched_opportunities?: Opportunity[];
  matched_professors?: Professor[];
  matched_projects?: ResearchProject[];
  matched_students?: Student[];
  matched_clubs?: Club[];
  roadmap_recommendations?: RoadmapStep[];
  follow_up_suggestions?: string[];
  priority_summary?: {
    apply_now_count: number;
    consider_count: number;
    explore_later_count: number;
  };
}

export interface LakehouseSchema {
  catalog: string;
  schema: string;
  engine: string;
  tables: Record<string, {
    description: string;
    record_count: number;
    columns: { name: string; type: string; description: string }[];
  }>;
}

export interface LakehouseTableInfo {
  table_name: string;
  catalog: string;
  schema: string;
  row_count: number;
  columns: { name: string; type: string; description: string }[];
}
