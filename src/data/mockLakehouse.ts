import { Student, Professor, ResearchProject, Club, Opportunity, CampusEvent, LakehouseTableInfo, RoadmapStep } from '../types';

export const LAKEHOUSE_TABLES_METADATA: LakehouseTableInfo[] = [
  {
    table_name: 'campus_intelligence.gold.students',
    catalog: 'workspace',
    schema: 'gold',
    row_count: 1420,
    columns: [
      { name: 'student_id', type: 'STRING', description: 'Unique identifier for student (synthetic dataset)' },
      { name: 'name', type: 'STRING', description: 'Full name' },
      { name: 'branch', type: 'STRING', description: 'Academic department (CSE, ECE, AI&DS, Mech, BioTech)' },
      { name: 'year', type: 'INT', description: 'Academic year (1 to 4)' },
      { name: 'skills', type: 'ARRAY<STRING>', description: 'Verified technical & domain competencies' },
      { name: 'interests', type: 'ARRAY<STRING>', description: 'Core research & product interests' },
      { name: 'career_goal', type: 'STRING', description: 'Target career role' },
      { name: 'availability_hours_per_week', type: 'INT', description: 'Available hours for extracurricular work' }
    ]
  },
  {
    table_name: 'campus_intelligence.gold.professors',
    catalog: 'workspace',
    schema: 'gold',
    row_count: 184,
    columns: [
      { name: 'professor_id', type: 'STRING', description: 'Faculty ID' },
      { name: 'name', type: 'STRING', description: 'Faculty full name and honorific' },
      { name: 'department', type: 'STRING', description: 'Primary academic department' },
      { name: 'expertise', type: 'ARRAY<STRING>', description: 'Deep technical specialties' },
      { name: 'lab_name', type: 'STRING', description: 'Affiliated research laboratory' },
      { name: 'student_collab_status', type: 'STRING', description: 'Recruiting state for undergraduate research' }
    ]
  },
  {
    table_name: 'campus_intelligence.gold.research_projects',
    catalog: 'workspace',
    schema: 'gold',
    row_count: 68,
    columns: [
      { name: 'project_id', type: 'STRING', description: 'Project ID' },
      { name: 'title', type: 'STRING', description: 'Project title' },
      { name: 'domain', type: 'STRING', description: 'Research domain (Medical Vision, GenAI, Edge AI)' },
      { name: 'required_skills', type: 'ARRAY<STRING>', description: 'Prerequisite technical skills' },
      { name: 'open_positions', type: 'INT', description: 'Active open positions for research interns' }
    ]
  },
  {
    table_name: 'campus_intelligence.gold.opportunities',
    catalog: 'workspace',
    schema: 'gold',
    row_count: 312,
    columns: [
      { name: 'opportunity_id', type: 'STRING', description: 'Global opportunity identifier' },
      { name: 'title', type: 'STRING', description: 'Role or event title' },
      { name: 'organization', type: 'STRING', description: 'Hiring company, foundation, or organizer' },
      { name: 'type', type: 'STRING', description: 'Internship, Hackathon, Fellowship, Tech Talk' },
      { name: 'required_skills', type: 'ARRAY<STRING>', description: 'Required skills' },
      { name: 'deadline', type: 'DATE', description: 'Application deadline' },
      { name: 'location', type: 'STRING', description: 'City/Remote status' },
      { name: 'stipend_or_prize', type: 'STRING', description: 'Compensation or prize amount' }
    ]
  },
  {
    table_name: 'campus_intelligence.gold.clubs',
    catalog: 'workspace',
    schema: 'gold',
    row_count: 42,
    columns: [
      { name: 'club_id', type: 'STRING', description: 'Club identifier' },
      { name: 'name', type: 'STRING', description: 'Organization name' },
      { name: 'category', type: 'STRING', description: 'Technical, Cultural, Entrepreneurship' },
      { name: 'skills', type: 'ARRAY<STRING>', description: 'Core domains practiced' },
      { name: 'recruitment_status', type: 'STRING', description: 'Recruiting state' }
    ]
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    student_id: 'STU-2024-001',
    name: 'Aditi Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    branch: 'Computer Science & Engineering',
    year: 2,
    cgpa: 8.92,
    skills: ['Python', 'Java', 'PyTorch', 'TensorFlow', 'OpenCV', 'SQL', 'Git'],
    interests: ['AI/ML', 'Computer Vision', 'Healthcare Tech', 'Deep Learning'],
    career_goal: 'AI Research Scientist & ML Engineer',
    preferred_domains: ['AI/ML', 'Computer Vision', 'Biomedical AI', 'Generative AI'],
    experience_level: 'Intermediate',
    projects: ['Retinal Vessel Segmentation with U-Net', 'Campus Food Wastage Classifier', 'Java Microservices Store'],
    clubs: ['ACM Student Chapter', 'AI & Robotics Guild', 'Google Developer Student Clubs'],
    research_interests: ['Medical Image Analysis', 'Multimodal LLMs', 'Edge Vision'],
    availability_hours_per_week: 8,
    preferred_opportunity_type: 'All',
    location_preference: 'Bengaluru',
    bio: '2nd-year CSE undergraduate passionate about computer vision and applied deep learning in healthcare. Looking for research lab collaborations and summer ML internships in Bengaluru.',
    email: 'aditi.sharma@campus.edu',
    github: 'github.com/aditi-ml',
    linkedin: 'linkedin.com/in/aditi-sharma-ai'
  },
  {
    student_id: 'STU-2024-002',
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    branch: 'Electronics & Communication',
    year: 3,
    cgpa: 8.45,
    skills: ['C++', 'Embedded C', 'Python', 'IoT', 'ESP32', 'ROS (Robot OS)', 'Verilog', 'MQTT'],
    interests: ['Robotics', 'Autonomous Systems', 'Edge AI', 'Industrial IoT'],
    career_goal: 'Robotics Software & Embedded Systems Engineer',
    preferred_domains: ['Robotics', 'IoT', 'Hardware AI', 'Smart Campus'],
    experience_level: 'Advanced',
    projects: ['Autonomous Warehouse Rover', 'LoRa Smart Campus Irrigation Node', 'Real-time LiDAR SLAM'],
    clubs: ['Robotics Club', 'IEEE Student Branch', 'Hardware Maker Lab'],
    research_interests: ['Sensor Fusion', 'Embedded Vision', 'Drone Swarms'],
    availability_hours_per_week: 12,
    preferred_opportunity_type: 'Internship',
    location_preference: 'Bengaluru',
    bio: '3rd-year ECE builder exploring ROS2, sensor fusion, and TinyML hardware deployments.',
    email: 'rahul.verma@campus.edu',
    github: 'github.com/rahul-embedded',
    linkedin: 'linkedin.com/in/rahul-verma-robotics'
  },
  {
    student_id: 'STU-2024-003',
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    branch: 'Information Science / Data Science',
    year: 1,
    cgpa: 9.10,
    skills: ['Python', 'SQL', 'Pandas', 'Data Visualization', 'Tableau', 'Statistics'],
    interests: ['Data Science', 'Product Analytics', 'GenAI', 'Fintech'],
    career_goal: 'Data Scientist & Analytics Specialist',
    preferred_domains: ['Data Science', 'Business Intelligence', 'FinTech'],
    experience_level: 'Beginner',
    projects: ['Bengaluru Metro Commute Patterns Analysis', 'Campus Book Exchange Analytics'],
    clubs: ['Data Analytics Society', 'Women in Tech Campus Chapter'],
    research_interests: ['Predictive Modeling', 'Graph Analytics', 'AI Fairness'],
    availability_hours_per_week: 6,
    preferred_opportunity_type: 'Hackathon',
    location_preference: 'Bengaluru',
    bio: '1st-year enthusiast eager to participate in Databricks hackathons, build analytical pipelines, and collaborate with frontend developers.',
    email: 'priya.nair@campus.edu',
    github: 'github.com/priya-data',
    linkedin: 'linkedin.com/in/priya-nair-ds'
  },
  {
    student_id: 'STU-2024-004',
    name: 'Karthik Raja',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    branch: 'Computer Science & Engineering',
    year: 3,
    cgpa: 8.60,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Node.js', 'Figma', 'UI/UX'],
    interests: ['Frontend Engineering', 'Design Systems', 'Web3', 'Developer Tooling'],
    career_goal: 'Full-Stack & Product Engineer',
    preferred_domains: ['Web Development', 'SaaS', 'HCI'],
    experience_level: 'Advanced',
    projects: ['Campus Lost & Found PWA', 'Interactive Algorithm Visualizer', 'Hackathon Team Matcher v1'],
    clubs: ['Open Source Club', 'Design & UI Guild', 'ACM Student Chapter'],
    research_interests: ['Human-Computer Interaction', 'Accessible Web Interfaces'],
    availability_hours_per_week: 10,
    preferred_opportunity_type: 'Startup',
    location_preference: 'Remote',
    bio: 'Lead frontend developer looking for ML and domain peers to team up for national hackathons and startup accelerators.',
    email: 'karthik.raja@campus.edu',
    github: 'github.com/karthik-frontend',
    linkedin: 'linkedin.com/in/karthik-raja-dev'
  },
  {
    student_id: 'STU-2024-005',
    name: 'Dr. Ananya Mukherjee (BioTech / Health Domain)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    branch: 'Biotechnology & Healthcare Informatics',
    year: 4,
    cgpa: 9.35,
    skills: ['Biostatistics', 'Clinical Data Analysis', 'Genomics', 'Python', 'R', 'Healthcare Domain'],
    interests: ['Digital Health', 'AI in Oncology', 'Electronic Health Records (EHR)', 'Drug Discovery'],
    career_goal: 'Computational Biology & Health AI Specialist',
    preferred_domains: ['Healthcare Tech', 'Biomedical Informatics', 'AI/ML'],
    experience_level: 'Advanced',
    projects: ['COVID-19 Genomic Variant Tracker', 'Biomarker Discovery in Glioblastoma'],
    clubs: ['Biotech Research Circle', 'Healthcare Innovation Cell'],
    research_interests: ['Clinical Trial Optimization', 'AI-assisted Diagnostics'],
    availability_hours_per_week: 10,
    preferred_opportunity_type: 'Research',
    location_preference: 'Bengaluru',
    bio: 'Final-year BioTech researcher with clinical domain knowledge looking for ML/CS teammates for Healthcare AI hackathons and joint lab papers.',
    email: 'ananya.m@campus.edu',
    github: 'github.com/ananya-biotech',
    linkedin: 'linkedin.com/in/ananya-mukherjee-bio'
  }
];

export const PROFESSORS: Professor[] = [
  {
    professor_id: 'PROF-AI-01',
    name: 'Dr. Radhika Venkataraman',
    title: 'Professor & Head of Center for Medical AI',
    avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    department: 'Computer Science & Engineering',
    expertise: ['Computer Vision', 'Medical Image Computing', 'Deep Learning', 'PyTorch', 'Multimodal Healthcare AI'],
    research_interests: ['Automated MRI/CT Scan Segmentation', 'Early Glaucoma Detection with Fundus Imaging', 'Federated Learning for Hospitals'],
    publications: [
      { title: 'DenseNet with Attention for Diabetic Retinopathy Grading in Indian Cohorts', year: 2025, citations: 142 },
      { title: 'Self-Supervised Pretraining for Ultra-low Dose CT Denoising', year: 2024, citations: 89 },
      { title: 'Explainable Vision Transformers for Chest X-Ray Triage', year: 2024, citations: 215 }
    ],
    current_projects: ['VisionX-Health: Open Indian Diagnostic Image Benchmark', 'AI Mammography Screening with St. Johns Hospital'],
    lab_name: 'Medical Vision & Intelligence Lab (MVIL - Lab 402)',
    courses: ['CS601: Advanced Computer Vision', 'CS412: Machine Learning for Healthcare'],
    mentorship_areas: ['Undergraduate Research Fellowships', 'CVPR/MICCAI Paper Mentorship', 'AI in Oncology Projects'],
    student_collab_status: 'Actively Recruiting',
    open_positions_count: 3,
    contact_email: 'radhika.v@campus.edu',
    office_location: 'Turing Block, 4th Floor, Room 418',
    matching_reason: 'Matches Python, Computer Vision, and Healthcare AI interests. Currently looking for 2nd/3rd year CSE students with PyTorch basics for open lab positions.'
  },
  {
    professor_id: 'PROF-AI-02',
    name: 'Dr. Arvind Swaminathan',
    title: 'Associate Professor, Databricks AI Chair',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Computer Science & Engineering',
    expertise: ['Large Language Models', 'Databricks Lakehouse', 'Distributed Data Systems', 'RAG Architectures', 'MLOps'],
    research_interests: ['Enterprise Knowledge Graphs on Lakehouse', 'Low-Latency Speculative Decoding', 'Domain-Specific Agent Workflows'],
    publications: [
      { title: 'Benchmarking Vector Search & Delta Lake for 100M+ Embedding Repositories', year: 2025, citations: 67 },
      { title: 'Semantic Reasoning with Databricks Genie and Synthetic Schemas', year: 2024, citations: 112 }
    ],
    current_projects: ['LakehouseGen: High-Throughput Autonomous Agents over Lakehouse', 'Campus Knowledge Graph with Unity Catalog'],
    lab_name: 'Data & Intelligence Systems Group (DISG - Lab 310)',
    courses: ['CS550: Big Data Systems & Lakehouse Architecture', 'CS430: Generative AI Engineering'],
    mentorship_areas: ['Databricks Hackathons', 'Open Source Agent Frameworks', 'Scale Engineering'],
    student_collab_status: 'Actively Recruiting',
    open_positions_count: 4,
    contact_email: 'arvind.swami@campus.edu',
    office_location: 'Shannon Block, 3rd Floor, Room 304',
    matching_reason: 'Direct match for students building Databricks, LLMs, and Lakehouse intelligence projects. Offers compute credits and research mentorship.'
  },
  {
    professor_id: 'PROF-ECE-03',
    name: 'Dr. Suresh Chandra',
    title: 'Professor & Director of IoT Innovations',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    department: 'Electronics & Communication',
    expertise: ['Embedded Systems', 'TinyML', 'Edge Computing', 'Robotics SLAM', 'C++', 'ESP32/Raspberry Pi'],
    research_interests: ['Sub-milliwatt Keyword Spotting', 'Drone Autonomy in GPS-denied Arenas', 'Smart Urban Sensors for Bengaluru BBMP'],
    publications: [
      { title: 'Quantized CNNs on Microcontrollers for Bengaluru Traffic Acoustic Classification', year: 2025, citations: 53 },
      { title: 'Distributed LoRa Mesh for Flash Flood Monitoring in Urban Catchments', year: 2024, citations: 98 }
    ],
    current_projects: ['Bengaluru Air & Traffic Edge-Mesh (B-ATEM)', 'AgriBot: Autonomous Weed Spotting Robot'],
    lab_name: 'Edge AI & Cyber-Physical Systems Lab (ECPS)',
    courses: ['EC402: Embedded Systems Design', 'EC514: TinyML & Edge Intelligence'],
    mentorship_areas: ['Hardware Startups', 'Smart City Hackathons', 'Embedded Vision'],
    student_collab_status: 'Limited Openings',
    open_positions_count: 2,
    contact_email: 'suresh.c@campus.edu',
    office_location: 'Faraday Block, 2nd Floor, Room 210',
    matching_reason: 'Ideal for ECE/CSE students working on IoT, hardware robotics, and Edge ML algorithms.'
  },
  {
    professor_id: 'PROF-MECH-04',
    name: 'Dr. Meera Nambiar',
    title: 'Associate Professor, Autonomous Robotics',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    department: 'Mechanical & Automation Engineering',
    expertise: ['Robotic Kinematics', 'ROS2', 'Reinforcement Learning', 'Trajectory Optimization', 'Computer Vision'],
    research_interests: ['Bipedal Locomotion on Rough Terrains', 'Manipulator Arm Vision Guidance for Surgical Tooling'],
    publications: [
      { title: 'Sim-to-Real Transfer for Quadruped Obstacle Negotiation using Domain Randomization', year: 2024, citations: 76 }
    ],
    current_projects: ['RoboDoc: Assistive Surgical Arm Teleoperation', 'Autonomous Campus Delivery Pod'],
    lab_name: 'Robotics & Dynamic Systems Center (RDSC)',
    courses: ['ME480: Robotics and Autonomous Navigation'],
    mentorship_areas: ['Robotics Competitions', 'Defense & Space Tech Projects'],
    student_collab_status: 'Actively Recruiting',
    open_positions_count: 3,
    contact_email: 'meera.nambiar@campus.edu',
    office_location: 'Tesla Hall, Room 102',
    matching_reason: 'Collaborating actively with Dr. Radhika on Surgical Robotics Vision and looking for Python/C++ vision developers.'
  }
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    project_id: 'RES-2025-01',
    title: 'VisionX-Health: Medical Image Biomarker Extraction using Self-Supervised Vision Transformers',
    lab_name: 'Medical Vision & Intelligence Lab (MVIL)',
    professor_id: 'PROF-AI-01',
    professor_name: 'Dr. Radhika Venkataraman',
    department: 'Computer Science & Engineering',
    domain: 'AI/ML & Healthcare',
    description: 'Developing high-precision deep learning architectures for early diabetic retinopathy and lung lesion detection from Indian hospital cohorts with PyTorch.',
    required_skills: ['Python', 'PyTorch', 'OpenCV', 'Computer Vision', 'Deep Learning'],
    open_positions: 2,
    stipend_or_credits: '₹15,000/month stipend + Academic Capstone Credit',
    duration: '6 Months (Part-time during semester / Full-time summer)',
    status: 'Open',
    matched_score: 95,
    match_reasons: ['Direct skill match with Python & PyTorch', 'Matches your Healthcare AI interest', 'Eligible for 2nd & 3rd year CSE']
  },
  {
    project_id: 'RES-2025-02',
    title: 'LakehouseAgent: Autonomous Enterprise RAG over Databricks Delta Lake',
    lab_name: 'Data & Intelligence Systems Group (DISG)',
    professor_id: 'PROF-AI-02',
    professor_name: 'Dr. Arvind Swaminathan',
    department: 'Computer Science & Engineering',
    domain: 'Generative AI & Data Systems',
    description: 'Building multi-step reasoning agents that parse natural language into Databricks SQL and synthesize real-time analytics for multi-million row datasets.',
    required_skills: ['Python', 'SQL', 'Databricks / Lakehouse', 'LLMs', 'FastAPI'],
    open_positions: 3,
    stipend_or_credits: '₹18,000/month stipend + Databricks Certification Voucher',
    duration: '4 Months',
    status: 'Open',
    matched_score: 92,
    match_reasons: ['Perfect fit for Databricks Genie exploration', 'High publication track record at SIGMOD/VLDB', 'Flexible remote hours']
  },
  {
    project_id: 'RES-2025-03',
    title: 'Bengaluru Urban Edge-Mesh: Real-time Audio AI for Emergency Vehicle Detection',
    lab_name: 'Edge AI & Cyber-Physical Systems Lab',
    professor_id: 'PROF-ECE-03',
    professor_name: 'Dr. Suresh Chandra',
    department: 'Electronics & Communication',
    domain: 'Edge AI & Smart Cities',
    description: 'Deploying low-power acoustic classifier models on ESP32 & Raspberry Pi nodes along Outer Ring Road to clear traffic signals for ambulances automatically.',
    required_skills: ['C++', 'Python', 'IoT', 'Embedded Systems', 'Audio ML'],
    open_positions: 2,
    stipend_or_credits: '₹12,000/month + Hardware Kit Access',
    duration: '6 Months',
    status: 'Open',
    matched_score: 84,
    match_reasons: ['Combines public city sensor data with on-device AI', 'Direct impact on Bengaluru urban transit']
  },
  {
    project_id: 'RES-2025-04',
    title: 'RoboDoc Assist: 6-DoF Teleoperated Surgical Arm Vision Guidance',
    lab_name: 'Robotics & Dynamic Systems Center',
    professor_id: 'PROF-MECH-04',
    professor_name: 'Dr. Meera Nambiar',
    department: 'Mechanical & Automation',
    domain: 'Robotics & Medical Vision',
    description: 'Real-time 3D depth point cloud processing and stereo visual servoing for tremor reduction in minimally invasive surgical interventions.',
    required_skills: ['ROS2', 'Python', 'C++', 'Computer Vision', 'PyTorch'],
    open_positions: 2,
    stipend_or_credits: '₹16,000/month stipend',
    duration: '5 Months',
    status: 'Open',
    matched_score: 89,
    match_reasons: ['Collaborative project with Dr. Radhika', 'Hardware-in-the-loop robotic simulator']
  }
];

export const CLUBS: Club[] = [
  {
    club_id: 'CLUB-01',
    name: 'AI & Robotics Guild (AIRG)',
    category: 'Technical',
    tagline: 'Building applied autonomous agents, vision pipelines, and competitive AI models',
    description: 'Campus-wide center for machine learning hackathons, paper reading groups, GPU cluster workshops, and industry AI mentorship.',
    skills: ['Python', 'PyTorch', 'Computer Vision', 'NLP', 'TensorFlow', 'LLMs', 'ROS'],
    student_coordinators: [
      { name: 'Aditi Sharma', year: 2, contact: 'airg.lead@campus.edu' },
      { name: 'Sameer Khan', year: 3, contact: 'sameer.k@campus.edu' }
    ],
    faculty_advisor: 'Dr. Radhika Venkataraman',
    member_count: 340,
    upcoming_events: ['Bengaluru AI Builders Hackathon (Sept 12)', 'Medical CV Hands-on Bootcamp (Sept 20)'],
    projects_active: ['Autonomous Drone Nav', 'Indian Sign Language Translator', 'Campus Assistant LLM'],
    recruitment_status: 'Open',
    meeting_schedule: 'Every Wednesday 5:30 PM @ Tech Audi 2'
  },
  {
    club_id: 'CLUB-02',
    name: 'ACM Student Chapter',
    category: 'Developer Community',
    tagline: 'Fostering computing excellence, algorithmic problem solving & open science',
    description: 'Official chapter organizing ICPC training, tech symposiums, Databricks engineering bootcamps, and coding sprints.',
    skills: ['C++', 'Algorithms', 'Data Structures', 'System Design', 'Java', 'Python'],
    student_coordinators: [
      { name: 'Karthik Raja', year: 3, contact: 'acm.lead@campus.edu' }
    ],
    faculty_advisor: 'Dr. Arvind Swaminathan',
    member_count: 520,
    upcoming_events: ['Annual Inter-College Algothon (Sept 18)', 'Databricks Lakehouse Masterclass (Sept 25)'],
    projects_active: ['Online Judge Portal', 'Alumni Mentorship Engine'],
    recruitment_status: 'Open',
    meeting_schedule: 'Every Saturday 10:00 AM @ CS Lab 1'
  },
  {
    club_id: 'CLUB-03',
    name: 'E-Cell (Entrepreneurship Cell)',
    category: 'Entrepreneurship',
    tagline: 'From campus prototype to venture-backed startup in Bengaluru ecosystem',
    description: 'Connecting student founders with VC funds (Peak XV, Accel), pitch competitions, legal advisory, and incubator grants.',
    skills: ['Product Management', 'Pitching', 'Business Modeling', 'UI/UX', 'Growth Hacking'],
    student_coordinators: [
      { name: 'Tanvi Shah', year: 4, contact: 'ecell@campus.edu' }
    ],
    faculty_advisor: 'Prof. Mohan Das',
    member_count: 280,
    upcoming_events: ['Bengaluru Student Pitch Day (Oct 05)', 'Founder-in-Residence AMA (Sept 14)'],
    projects_active: ['Campus Startup Incubator 2025', 'Angel Investor Demo Day'],
    recruitment_status: 'Rolling',
    meeting_schedule: 'Bi-weekly Friday 6:00 PM @ Innovation Center'
  },
  {
    club_id: 'CLUB-04',
    name: 'Hardware & IoT Maker Lab',
    category: 'Technical',
    tagline: 'Soldering, PCB design, firmware hacking, and Edge AI deployment',
    description: '24/7 makerspace equipped with 3D printers, oscilloscopes, CNC routers, and high-end embedded boards.',
    skills: ['Embedded C', 'IoT', 'PCB Design', 'ESP32', 'Robotics', 'SolidWorks'],
    student_coordinators: [
      { name: 'Rahul Verma', year: 3, contact: 'makerlab@campus.edu' }
    ],
    faculty_advisor: 'Dr. Suresh Chandra',
    member_count: 210,
    upcoming_events: ['Hardware Hackathon (Sept 28)', 'LoRaWAN Smart Campus Sprint (Oct 10)'],
    projects_active: ['Smart Campus Water Metering', 'Autonomous Solar Rover'],
    recruitment_status: 'Open',
    meeting_schedule: 'Every Thursday 5:00 PM @ Faraday Makerspace'
  }
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    opportunity_id: 'OPP-EXT-01',
    title: 'Databricks AI & Data Science Summer Research Intern 2026',
    organization: 'Databricks India',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    type: 'Summer Internship',
    category: 'Off-Campus',
    domain: 'AI/ML & Data Engineering',
    required_skills: ['Python', 'SQL', 'Spark / Lakehouse', 'Machine Learning', 'Data Structures'],
    eligibility: '2nd & 3rd Year B.Tech / M.Tech (CSE, ECE, AI&DS, IS)',
    deadline: '2026-09-15',
    days_left: 17,
    location: 'Bengaluru (Bellandur Tech Corridor) / Hybrid',
    remote_status: 'Hybrid',
    stipend_or_prize: '₹1,25,000 / month + Relocation & Housing',
    duration: '2-3 Months (Summer 2026)',
    application_link: 'https://databricks.com/careers/university',
    description: 'Work directly with Databricks Lakehouse & Genie engineering teams on large-scale distributed AI, Unity Catalog governance, and agent optimization.',
    priority_tier: '🔴 Apply Now',
    match_score: 96,
    match_reasons: [
      'Top tier match with Python, SQL, and Data Systems knowledge',
      '2nd-year CSE student status is explicitly eligible',
      'Competitive stipend and Bengaluru location',
      'Closing in 17 days'
    ],
    is_bookmarked: true
  },
  {
    opportunity_id: 'OPP-EXT-02',
    title: 'Bengaluru AI Health Innovators Hackathon 2025',
    organization: 'IISc & NASSCOM Center of Excellence',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&auto=format&fit=crop&q=80',
    type: 'Hackathon',
    category: 'Bengaluru City Event',
    domain: 'Healthcare AI & Computer Vision',
    required_skills: ['Python', 'Computer Vision', 'PyTorch', 'UI / Demo prototype'],
    eligibility: 'All Engineering & Medical Undergraduates in Karnataka',
    deadline: '2026-09-12',
    days_left: 14,
    location: 'IISc Campus, Bengaluru + Hybrid Pre-Rounds',
    remote_status: 'Hybrid',
    stipend_or_prize: '₹5,00,000 Cash Prize Pool + ₹25L Grant Incubation',
    duration: '36-Hour Hackathon (Sept 20-22)',
    application_link: 'https://bengaluru-healthai.devpost.com',
    description: 'Build predictive AI diagnostic models, clinical workflow tools, or smart sensor devices to improve primary healthcare across Karnataka district clinics.',
    priority_tier: '🔴 Apply Now',
    match_score: 94,
    match_reasons: [
      'Exact overlap with your Computer Vision + Healthcare interest',
      'Dr. Radhika is a confirmed mentor judge',
      'Excellent opportunity to team up with frontend & biotech students',
      'Prize pool + pilot deployment in Karnataka hospitals'
    ],
    team_size: '2 - 4 Members',
    is_bookmarked: true
  },
  {
    opportunity_id: 'OPP-EXT-03',
    title: 'Google DeepMind Undergraduate Research Fellowship 2026',
    organization: 'Google Research India',
    type: 'Fellowship',
    category: 'Off-Campus',
    domain: 'Deep Learning & Foundation Models',
    required_skills: ['Python', 'Deep Learning', 'Linear Algebra', 'PyTorch / JAX', 'Research Publications'],
    eligibility: 'Pre-final & Final Year Undergrads with strong ML fundamentals',
    deadline: '2026-09-30',
    days_left: 32,
    location: 'Bengaluru (Old Airport Road) / Hybrid',
    remote_status: 'Hybrid',
    stipend_or_prize: '₹95,000 / month + Conference Travel Support',
    duration: '1 Year Research Apprenticeship',
    application_link: 'https://research.google/careers',
    description: 'Conduct foundational research on multimodal reasoning, speech translation, and ethical AI in partnership with senior research scientists.',
    priority_tier: '🟡 Consider',
    match_score: 88,
    match_reasons: [
      'High prestige research fellowship matching your long-term AI scientist goal',
      'Recommended after finishing a campus lab project with Dr. Radhika to strengthen publication portfolio'
    ]
  },
  {
    opportunity_id: 'OPP-EXT-04',
    title: 'Microsoft Imagine Cup 2026 — AI for Good Track',
    organization: 'Microsoft India',
    type: 'Competition',
    category: 'Off-Campus',
    domain: 'Applied AI & Cloud Solutions',
    required_skills: ['Python / TypeScript', 'Azure / Cloud', 'AI Models', 'Presentation'],
    eligibility: 'Full-time enrolled students (Team of 1-4)',
    deadline: '2026-10-15',
    days_left: 47,
    location: 'Online + Finals at Microsoft Reactor Bengaluru',
    remote_status: 'Remote',
    stipend_or_prize: '$100,000 USD Global Grand Prize + Mentorship with Satya Nadella',
    duration: '3 Stage Competition',
    application_link: 'https://imaginecup.microsoft.com',
    description: 'Build a working solution tackling education, healthcare, accessibility, or sustainability challenges with AI.',
    priority_tier: '🟡 Consider',
    match_score: 85,
    match_reasons: [
      'Great platform to showcase your Retinal Vessel Segmentation or Campus sustainability apps',
      'Beginner-friendly initial submission with milestone coaching'
    ],
    team_size: '3 - 4 Members'
  },
  {
    opportunity_id: 'OPP-EXT-05',
    title: 'Koramangala Tech Meetup: Scaling Agents on Distributed Datasets',
    organization: 'Bengaluru AI Builders Community',
    type: 'Tech Talk',
    category: 'Bengaluru City Event',
    domain: 'Generative AI & MLOps',
    required_skills: ['Basic ML Knowledge', 'Python'],
    eligibility: 'Open to all students and engineers (Free entry with RSVP)',
    deadline: '2026-09-08',
    days_left: 10,
    location: 'Koramangala 4th Block (Near Sony Signal), Bengaluru',
    remote_status: 'On-Site',
    stipend_or_prize: 'Networking + Swag + Free Dinner & Founder Demos',
    duration: 'Saturday 4:00 PM - 8:00 PM',
    application_link: 'https://lu.ma/blr-ai-meetup',
    description: 'Meet senior architects from Databricks, Flipkart, Swiggy, and stealth AI startups. Discussions on agentic workflows and Lakehouse optimizations.',
    priority_tier: '🔴 Apply Now',
    match_score: 91,
    match_reasons: [
      'Convenient transit from campus (30 mins via Purple Line Metro + Feeder Bus)',
      'Direct networking with hiring managers for 2026 internships',
      'Free event occurring this coming weekend'
    ]
  },
  {
    opportunity_id: 'OPP-EXT-06',
    title: 'Cisco Systems Networking & IoT Software Intern',
    organization: 'Cisco India',
    type: 'Internship',
    category: 'Off-Campus',
    domain: 'Cloud, Networking & IoT',
    required_skills: ['C++', 'Python', 'Networking Protocols', 'Linux'],
    eligibility: '2nd & 3rd Year B.Tech (CSE/ECE/IT)',
    deadline: '2026-10-01',
    days_left: 33,
    location: 'Cessna Business Park, Marathahalli, Bengaluru',
    remote_status: 'On-Site',
    stipend_or_prize: '₹85,000 / month',
    duration: '6 Months / Summer',
    application_link: 'https://jobs.cisco.com',
    description: 'Develop next-gen telemetry and edge monitoring software for industrial IoT and software-defined networks.',
    priority_tier: '🟢 Explore Later',
    match_score: 74,
    match_reasons: [
      'Strong fit for ECE/Networking students like Rahul Verma',
      'Solid corporate brand, though more networking-focused than pure ML'
    ]
  },
  {
    opportunity_id: 'OPP-EXT-07',
    title: 'Flipkart GRiD 7.0 — Robotics & Vision Track',
    organization: 'Flipkart Tech',
    type: 'Hackathon',
    category: 'Off-Campus',
    domain: 'Computer Vision & Automated Sorting',
    required_skills: ['Python', 'OpenCV', 'Deep Learning', 'ROS'],
    eligibility: 'Engineering Undergrads Batch 2026, 2027, 2028',
    deadline: '2026-09-22',
    days_left: 24,
    location: 'Online + Finals at Flipkart HQ, Bengaluru',
    remote_status: 'Hybrid',
    stipend_or_prize: '₹3,00,000 + Pre-Placement Interview (PPI) for SDE/ML Internships',
    duration: '4 Rounds',
    application_link: 'https://unstop.com/hackathons/flipkart-grid',
    description: 'Solve real supply chain visual inspection and package dimension estimation challenges with computer vision.',
    priority_tier: '🔴 Apply Now',
    match_score: 93,
    match_reasons: [
      'Direct PPI opportunity for 2nd & 3rd year CSE/ECE',
      'High match with your OpenCV & Deep Learning project background'
    ],
    team_size: '2 - 3 Members'
  },
  {
    opportunity_id: 'OPP-CAMP-08',
    title: 'Campus Medical AI Lab Undergraduate Research Assistantship',
    organization: 'Campus Medical Vision & Intelligence Lab (MVIL)',
    type: 'Research Internship',
    category: 'Campus',
    domain: 'Biomedical Computer Vision',
    required_skills: ['Python', 'PyTorch', 'Git', 'Machine Learning Basics'],
    eligibility: 'Campus 2nd & 3rd year students (Min 8.0 CGPA)',
    deadline: '2026-09-10',
    days_left: 12,
    location: 'Lab 402, Turing Block, Main Campus',
    remote_status: 'On-Site',
    stipend_or_prize: '₹15,000 / month + Lab Capstone Credit',
    duration: 'Ongoing semester (8-10 hrs/week)',
    application_link: 'mailto:radhika.v@campus.edu?subject=Application%20for%20MVIL%20Research%20Assistant',
    description: 'Collaborate with Dr. Radhika Venkataraman on St. Johns Hospital clinical dataset curation, multi-organ segmentation, and conference submissions.',
    priority_tier: '🔴 Apply Now',
    match_score: 98,
    match_reasons: [
      'Top 1% match for your profile (Python, PyTorch, Healthcare AI, 8 hrs/week availability)',
      'Immediate on-campus access without commuting',
      'Leads directly into Summer 2026 research publications'
    ],
    spots_left: 2,
    is_bookmarked: true
  }
];

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    event_id: 'EVT-01',
    title: 'Databricks Lakehouse & Genie Hands-on Masterclass',
    category: 'Workshop',
    date: '2026-09-04',
    time: '2:00 PM - 5:00 PM',
    venue: 'Sir MV Auditorium (Audi 1) + Live Stream',
    organizer: 'ACM Student Chapter & Databricks Student Ambassador',
    speaker: 'Anand Kulkarni (Senior Solutions Architect, Databricks)',
    required_skills: ['Basic SQL', 'Python Basics'],
    registration_deadline: '2026-09-03',
    spots_available: 45,
    is_free: true,
    registration_link: 'https://campus.edu/events/databricks-masterclass',
    city_connection: 'Official Databricks University Alliance'
  },
  {
    event_id: 'EVT-02',
    title: 'AI in Clinical Medicine: From Pixels to Patient Outcomes',
    category: 'Research Seminar',
    date: '2026-09-07',
    time: '4:00 PM - 6:00 PM',
    venue: 'Turing Block Seminar Hall',
    organizer: 'Medical Vision Lab & AI Robotics Guild',
    speaker: 'Dr. Radhika Venkataraman & Dr. B. S. Murthy (Narayana Health)',
    required_skills: ['Interest in AI / Biology'],
    registration_deadline: '2026-09-06',
    spots_available: 80,
    is_free: true,
    registration_link: 'https://campus.edu/events/clinical-ai-seminar',
    city_connection: 'In collaboration with Narayana Health City, Bommasandra'
  },
  {
    event_id: 'EVT-03',
    title: 'Bengaluru Tech Corridor Open Hackathon 2025',
    category: 'Hackathon',
    date: '2026-09-20',
    time: '9:00 AM (36 Hours)',
    venue: 'Innovation & Incubation Hub, Campus',
    organizer: 'E-Cell & Department of CSE',
    speaker: 'Judges from Peak XV Partners & Zerodha Tech',
    required_skills: ['Coding', 'Design', 'Product Thinking'],
    registration_deadline: '2026-09-14',
    spots_available: 120,
    is_free: true,
    registration_link: 'https://campus.edu/events/tech-corridor-hackathon',
    city_connection: 'Bengaluru Startup Hub Fast-Track Incubation'
  },
  {
    event_id: 'EVT-04',
    title: 'Hardware & Edge AI Maker Sprint: Deploying TinyML on ESP32',
    category: 'Workshop',
    date: '2026-09-11',
    time: '3:00 PM - 6:30 PM',
    venue: 'Faraday Makerspace (Lab 108)',
    organizer: 'Hardware & IoT Maker Lab',
    speaker: 'Dr. Suresh Chandra',
    required_skills: ['C / C++', 'Basic Electronics'],
    registration_deadline: '2026-09-09',
    spots_available: 22,
    is_free: true,
    registration_link: 'https://campus.edu/events/tinyml-sprint'
  }
];

export const INITIAL_ROADMAP: RoadmapStep[] = [
  {
    timeframe: 'This Month',
    title: 'Secure Campus Lab Vacancy & Databricks Masterclass',
    description: 'Establish high-yield faculty research rapport and gain certified data Lakehouse skills before midterms.',
    impact: 'High (Immediate Academic Credentials)',
    action_items: [
      { label: 'Submit undergraduate research inquiry email to Dr. Radhika Venkataraman (MVIL Lab 402)', type: 'professor' },
      { label: 'RSVP and attend Databricks Lakehouse & Genie Hands-on Masterclass on Sept 4th', type: 'workshop' },
      { label: 'Form 3-person team for Flipkart GRiD 7.0 Robotics & Vision track', type: 'hackathon' }
    ]
  },
  {
    timeframe: 'Next Month',
    title: 'Execute Hackathon Prototype & Submit Databricks Intern Application',
    description: 'Build a working multimodal diagnostic MVP and apply early for summer corporate roles.',
    impact: 'Critical (PPI / Internship Funnel)',
    action_items: [
      { label: 'Apply to Databricks AI & Data Science Summer Research Intern 2026 before Sept 15 deadline', type: 'internship' },
      { label: 'Compete in Bengaluru Tech Corridor Hackathon with Karthik (Frontend) and Ananya (BioTech)', type: 'hackathon' },
      { label: 'Present preliminary U-Net medical segmentation results at AI & Robotics Guild weekly demo', type: 'club' }
    ]
  },
  {
    timeframe: 'Next 3 Months',
    title: 'Benchmark Dataset Publication & Open Source Contribution',
    description: 'Co-author a pre-print paper with MVIL and contribute PyTorch dataset loaders to public repos.',
    impact: 'High (Distinction for MS/PhD or Tier-1 R&D roles)',
    action_items: [
      { label: 'Complete validation trials on St. Johns Hospital fundus imaging cohort', type: 'project' },
      { label: 'Publish open-source benchmark dataset on GitHub / Hugging Face with documentation', type: 'project' },
      { label: 'Deliver guest tech talk at ACM Student Chapter on Low-Latency Vision Models', type: 'club' }
    ]
  },
  {
    timeframe: 'Before Summer',
    title: 'Lock Summer 2026 Internship & Transition to Junior Researcher',
    description: 'Finalize summer placement and prepare transition plan for senior year capstone.',
    impact: 'Peak Career Trajectory',
    action_items: [
      { label: 'Interview rounds with Databricks & Google DeepMind campus recruiters', type: 'internship' },
      { label: 'Submit co-authored paper to MICCAI / CVPR Workshop', type: 'project' }
    ]
  }
];

export const INITIAL_OPPORTUNITIES = OPPORTUNITIES;
export const INITIAL_PROFESSORS = PROFESSORS;
export const INITIAL_RESEARCH_PROJECTS = RESEARCH_PROJECTS;
export const INITIAL_CLUBS = CLUBS;
export const INITIAL_EVENTS = CAMPUS_EVENTS;

export const DEMO_BENCHMARK_PROMPTS = [
  {
    id: 'demo-step-1',
    title: 'Step 1: Discover AI + Healthcare Opportunities',
    prompt: "I'm interested in AI and healthcare. What opportunities, research projects, and professors should I explore on and off campus?",
    badge: 'Core Match Engine'
  },
  {
    id: 'demo-step-2',
    title: 'Step 2: Who Should I Connect With?',
    prompt: 'Who on campus should I connect with for Medical Computer Vision? Suggest professors and complementary student teammates.',
    badge: 'People Intelligence'
  },
  {
    id: 'demo-step-3',
    title: 'Step 3: Off-Campus Ecosystem & Bengaluru Tech Events',
    prompt: 'Find off-campus internships and Bengaluru tech hackathons for a 2nd year student with Python and ML skills.',
    badge: 'Off-Campus & City Data'
  },
  {
    id: 'demo-step-4',
    title: 'Step 4: Priority Engine (Only 5 Hours/Week)',
    prompt: 'I only have 5 hours per week because of mid-terms. Which 3 opportunities should I strictly prioritize right now?',
    badge: 'Priority Reasoning'
  },
  {
    id: 'demo-step-5',
    title: 'Step 5: "What If?" Career Goal Shift',
    prompt: 'What if my goal changes from Software Engineer to AI Researcher? Recalculate my roadmap, professors, and lab milestones.',
    badge: 'What-If Simulator'
  },
  {
    id: 'demo-step-6',
    title: 'Step 6: Team Builder for Hackathon',
    prompt: 'I want to build an AI Healthcare diagnosis app for the IISc Hackathon. I know Python and ML but need a Frontend specialist and a Domain Expert. Find my dream team!',
    badge: 'Skill Synergy'
  }
];
