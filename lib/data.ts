/**
 * SINGLE SOURCE OF TRUTH — every fact on the site comes from Anuj's resume.
 * Edit here to update the whole portfolio. Nothing below is invented:
 * where the resume is silent, fields are left empty and shown as placeholders.
 */

export const profile = {
  name: "Anuj Kumar Singh",
  firstName: "Anuj",
  location: "Pune, Maharashtra",
  email: "anuj30056@gmail.com",
  phone: "+91-7321839524",
  phoneHref: "tel:+917321839524",
  resume: "/Anuj_Kumar_Singh_Resume.pdf",
  photo: "/photo.jpg",
  photo2: "/photo-2.jpg",
  summary:
    "Electronics and Telecommunication Engineering student (graduating 2028) with hands-on experience building embedded-system and PCB prototypes, developing web-based projects, and exploring intelligent matching systems.",
  socials: [
    { id: "youtube", label: "YouTube", handle: "@Editechz", href: "https://www.youtube.com/@Editechz" },
    { id: "instagram", label: "Instagram", handle: "@legitimate_men", href: "https://www.instagram.com/legitimate_men" },
  ],
  // Add when you have them — they render automatically if non-empty.
  linkedin: "",
  github: "",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export type CategoryId = "software" | "ai" | "embedded" | "hardware";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "software", label: "Software & Web" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "embedded", label: "Embedded Systems" },
  { id: "hardware", label: "Hardware & PCB" },
];

/** `bg`: when set, the screenshot is shown whole (contain) on this colour instead of being cropped to fill. */
export type ProjectImage = { src: string; alt: string; caption: string; bg?: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  kicker: string;
  category: CategoryId;
  status: string;
  /** how the images are presented: app window, board photo, or PCB pair */
  media: "browser" | "photo" | "pcb" | "none";
  images: ProjectImage[];
  facts: { label: string; value: string }[];
  specs?: { title: string; rows: [string, string][] };
  /** Working flow shown as a step strip on the case page. Only steps supported by the resume/screenshots. */
  flow?: { title: string; steps: { label: string; note: string }[] };
  summary: string;
  problem: string;
  contribution: string[];
  features: string[];
  stack: string[];
  outcome: string;
  links: { github?: string; demo?: string };
};

export const projects: Project[] = [
  {
    slug: "career-compass",
    title: "Career Compass",
    tagline: "Skill-gap analysis and a month-by-month career roadmap.",
    kicker: "Career guidance platform",
    category: "software",
    status: "Web project",
    media: "browser",
    images: [
      { src: "/projects/career-compass.jpg", alt: "Career selection screen with six career paths", caption: "Pick a dream career, then analyse" },
      { src: "/projects/career-compass-2.jpg", alt: "Analysis result showing current level, required level and skill-gap percentage", caption: "Current vs required level and skill-gap %" },
      { src: "/projects/career-compass-3.jpg", alt: "Month-by-month learning roadmap", caption: "A month-by-month learning roadmap" },
    ],
    facts: [
      { label: "Type", value: "Web app" },
      { label: "Status", value: "Web project" },
      { label: "Core", value: "Next.js · Firebase" },
    ],
    specs: {
      title: "Inside the app (from the screenshots)",
      rows: [
        ["Career paths", "AI Engineer · Data Scientist · Web Developer · Software Developer · App Developer · Cyber Security Engineer"],
        ["Analysis", "Current vs required level, skill-gap %, required skills"],
        ["Roadmap", "Month-wise learning plan"],
        ["App sections", "Dashboard · Profile · Analyzer · Tasks · Resume · AI Mentor · Admin"],
      ],
    },
    flow: {
      title: "How the app works (from the screenshots)",
      steps: [
        { label: "Pick a career", note: "Choose one of six career paths" },
        { label: "Analyse", note: "Current vs required level, skill-gap %" },
        { label: "Roadmap", note: "Month-by-month learning plan" },
        { label: "Track", note: "Tasks and progress stored in Firestore" },
      ],
    },
    summary:
      "A web-based career guidance project for exploring career paths, assessing skill gaps and tracking personalised learning progress.",
    problem: "Learners rarely know how far they are from a target role, or what to learn next.",
    contribution: [
      "Developed the web project with Next.js 16 and React.",
      "Worked with user authentication and structured profile data (Firebase Authentication).",
      "Implemented Firestore-backed task and progress tracking (Cloud Firestore).",
    ],
    features: ["Career-path exploration", "Skill-gap assessment", "Personalised learning progress", "Task & progress tracking"],
    stack: ["Next.js 16", "React", "Firebase Authentication", "Cloud Firestore"],
    outcome: "A full-stack project covering authentication, structured user data and persistent progress tracking.",
    links: {},
  },
  {
    slug: "biometric-door-locking-system",
    title: "Biometric Door Locking System",
    tagline: "Fingerprint-verified access control on Arduino.",
    kicker: "Physical prototype",
    category: "embedded",
    status: "Hardware prototype",
    media: "photo",
    images: [
      { src: "/projects/biometric-door-locking-system.jpg", alt: "Biometric door lock prototype: fingerprint sensor, Arduino Uno, relay module and solenoid lock on a wooden board", caption: "The working prototype" },
    ],
    facts: [
      { label: "Type", value: "Embedded hardware" },
      { label: "Status", value: "Prototype" },
      { label: "Core", value: "Arduino Uno" },
    ],
    specs: {
      title: "Signal chain",
      rows: [
        ["Fingerprint sensor", "Verifies the user"],
        ["Arduino Uno", "Ties verification to actuation"],
        ["Relay", "Switches the lock"],
        ["Solenoid lock", "Door-lock actuator"],
        ["16×2 LCD", "Status display"],
        ["Buzzer", "Audible feedback"],
      ],
    },
    flow: {
      title: "Working flow",
      steps: [
        { label: "Scan", note: "Finger placed on the fingerprint sensor" },
        { label: "Verify", note: "Sensor verifies the user" },
        { label: "Actuate", note: "Arduino Uno drives the relay and solenoid lock" },
        { label: "Feedback", note: "16×2 LCD status and buzzer" },
      ],
    },
    summary:
      "A fingerprint-based access-control prototype: a verified fingerprint drives a relay-switched solenoid lock, with LCD and buzzer feedback.",
    problem: "Replace a physical key with an identity check wired directly into lock actuation.",
    contribution: [
      "Built the physical prototype around an Arduino Uno, fingerprint sensor, relay-driven solenoid lock, 16×2 LCD and buzzer.",
      "Integrated fingerprint verification with lock actuation and user feedback.",
    ],
    features: ["Fingerprint verification", "Relay-driven solenoid lock", "16×2 LCD status", "Buzzer feedback"],
    stack: ["Arduino Uno", "Fingerprint Sensor", "Relay", "Solenoid Lock", "16×2 LCD", "Buzzer"],
    outcome: "A physical access-control prototype that ties sensor interfacing to embedded control and clear user feedback.",
    links: {},
  },
  {
    slug: "metal-detector-pcb",
    title: "Metal Detector PCB",
    tagline: "A metal-detection circuit, from KiCad layout to tested board.",
    kicker: "Hardware / PCB prototype",
    category: "hardware",
    status: "Hardware prototype",
    media: "pcb",
    images: [
      { src: "/projects/metal-detector-pcb.jpg", alt: "KiCad 3D view of the metal detector PCB", caption: "KiCad 3D board view" },
      { src: "/projects/metal-detector-pcb-2.jpg", alt: "KiCad PCB layout of the metal detector with component values", caption: "PCB layout with component values" },
    ],
    facts: [
      { label: "Type", value: "Analog circuit · PCB" },
      { label: "Status", value: "Prototype" },
      { label: "Tool", value: "KiCad" },
    ],
    specs: {
      title: "Components (from the KiCad layout)",
      rows: [
        ["R1", "3.3 kΩ"],
        ["R2", "2.2 kΩ"],
        ["R3", "68 Ω"],
        ["C1", "10 µF"],
        ["C2", "100 pF"],
        ["C3", "10 pF"],
        ["Q1", "BC548 transistor"],
        ["BT1", "6 V supply"],
        ["L1", "Coil, labelled “25–40 round”"],
      ],
    },
    flow: {
      title: "From layout to tested board",
      steps: [
        { label: "Layout", note: "Circuit and PCB laid out in KiCad" },
        { label: "Assemble", note: "Component placement on the board" },
        { label: "Check", note: "Footprint and polarity checks" },
        { label: "Test", note: "Circuit testing and troubleshooting" },
      ],
    },
    summary: "Hands-on assembly and testing of a metal-detection circuit and its physical PCB prototype.",
    problem: "Take a sensing circuit from layout to a physical board that must be assembled, checked and debugged.",
    contribution: [
      "Assembled and tested a metal-detection circuit and its physical PCB prototype.",
      "Practised component placement, polarity and footprint checks, circuit testing and troubleshooting.",
    ],
    features: ["Electronic sensing circuit", "Footprint & polarity checks", "Circuit testing", "Hardware troubleshooting"],
    stack: ["Electronic Sensing Circuit", "PCB Design", "KiCad"],
    outcome: "Practical experience in PCB assembly, testing and hardware troubleshooting.",
    links: {},
  },
  {
    slug: "smart-allocation-engine",
    title: "AI-Based Smart Allocation Engine",
    tagline: "Transparent, capacity-aware internship matching.",
    kicker: "PM Internship Scheme matching prototype",
    category: "ai",
    status: "Prototype",
    media: "browser",
    images: [
      { src: "/projects/smart-allocation-engine.jpg", alt: "InternMatch landing page with search bar and call-to-action buttons", caption: "InternMatch landing page", bg: "#f4f6fb" },
      { src: "/projects/smart-allocation-engine-2.jpg", alt: "InternMatch internship listings with search, tags and apply buttons", caption: "Internship search & listings", bg: "#ffffff" },
    ],
    facts: [
      { label: "Type", value: "Matching engine" },
      { label: "Status", value: "Prototype" },
      { label: "Core", value: "Python · React" },
    ],
    specs: {
      title: "Matching inputs",
      rows: [
        ["Candidate", "Skills · qualifications · location preference"],
        ["Opportunity", "Role fit · internship capacity"],
        ["Approach", "Transparent weighted scoring"],
        ["Constraints", "Capacity limits · fair placement"],
        ["Interface", "InternMatch: landing page, internship search and listings"],
      ],
    },
    flow: {
      title: "Matching approach",
      steps: [
        { label: "Candidate", note: "Skills, qualifications, location preference" },
        { label: "Score", note: "Transparent weighted scoring against role fit" },
        { label: "Constrain", note: "Internship capacity and fair placement" },
        { label: "Allocate", note: "Candidates matched to opportunities" },
      ],
    },
    summary:
      "A prototype that matches internship candidates with opportunities using skills, qualifications, location preferences and role fit.",
    problem: "Match candidates to internships fairly, while respecting constraints such as capacity.",
    contribution: [
      "Developed the matching prototype with Python and React.",
      "Explored transparent weighted scoring between candidates and internships.",
      "Explored allocation constraints: internship capacity and fair-placement considerations.",
    ],
    features: ["Candidate–internship scoring", "Transparent weighted scoring", "Capacity-aware allocation", "Fair-placement considerations"],
    stack: ["Python", "React", "Candidate–Internship Scoring"],
    outcome: "An exploratory prototype of a transparent, constraint-aware matching approach. A prototype, not a deployed system.",
    links: {},
  },
];

export type Experience = {
  org: string;
  role: string;
  period: string;
  duration?: string;
  summary: string;
  bullets: string[];
  tags: string[];
  tagsLabel: string;
  /** Real work samples (reels / videos). Leave empty until you have links; a gallery appears automatically. */
  samples?: { title: string; href: string; thumb?: string; note?: string }[];
};

export const experience: Experience[] = [
  {
    org: "Motion Learning App",
    role: "Content Creator & Video Editor Intern",
    period: "2026",
    duration: "2 months",
    summary: "Short-form educational content for JEE/NEET aspirants.",
    bullets: [
      "Created and edited JEE/NEET-focused short-form educational content, including PYQ reels, study tips and app-feature explainers.",
      "Contributed to scripting, vertical-video storytelling, AI-assisted visuals, editing, captions and brand-aligned calls to action.",
    ],
    tags: ["PYQ reels", "Study tips", "App-feature explainers", "Scripting", "Captions", "AI-assisted visuals"],
    tagsLabel: "Deliverables",
  },
  {
    org: "YouTube / Instagram",
    role: "Independent Video Editor & Content Creator",
    period: "2021 – Present",
    summary: "Self-run channels, from planning to publishing.",
    bullets: [
      "Planned, edited and published short- and long-form content.",
      "Built an audience of 4,800+ YouTube subscribers and 10,200+ Instagram followers.",
      "Achieved 69.1K+ views on a YouTube video and 1.2M+ views on an Instagram Reel.",
    ],
    tags: ["CapCut", "VN", "DaVinci Resolve", "Canva", "AI-assisted video production"],
    tagsLabel: "Creative toolkit",
  },
];

export const stats = [
  { value: 4800, decimals: 0, suffix: "+", label: "YouTube subscribers" },
  { value: 10200, decimals: 0, suffix: "+", label: "Instagram followers" },
  { value: 69.1, decimals: 1, suffix: "K+", label: "Views on a YouTube video" },
  { value: 1.2, decimals: 1, suffix: "M+", label: "Views on an Instagram Reel" },
];

export type SkillGroup = {
  id: string;
  title: string;
  icon: "code" | "globe" | "brain" | "cpu" | "wrench" | "film";
  accent: "electric" | "teal" | "coral" | "sun" | "lav";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { id: "prog", title: "Programming", icon: "code", accent: "electric", items: ["C", "C++", "Python", "JavaScript", "SQL"] },
  {
    id: "web",
    title: "Web & Databases",
    icon: "globe",
    accent: "teal",
    items: ["HTML", "CSS", "React", "Next.js", "Firebase Authentication", "Cloud Firestore"],
  },
  {
    id: "cs",
    title: "CS & ML Foundations",
    icon: "brain",
    accent: "lav",
    items: ["Data Structures & Algorithms", "DBMS", "Computer Networks", "Machine Learning fundamentals"],
  },
  {
    id: "etc",
    title: "Embedded & E&TC",
    icon: "cpu",
    accent: "coral",
    items: [
      "8051 microcontroller",
      "PIC microcontroller",
      "Sensor interfacing",
      "Digital electronics",
      "Communication systems",
      "I2C",
      "SPI",
      "IoT fundamentals",
    ],
  },
  {
    id: "hw",
    title: "Hardware & Tools",
    icon: "wrench",
    accent: "sun",
    items: ["Arduino Uno", "Relay control", "PCB design", "KiCad", "MATLAB"],
  },
  {
    id: "creative",
    title: "Creative Tools",
    icon: "film",
    accent: "electric",
    items: ["CapCut", "VN", "DaVinci Resolve", "Canva", "AI-assisted video production"],
  },
];

export const education = {
  degree: "B.E. in Electronics and Telecommunication Engineering",
  college: "D.Y. Patil College of Engineering, Akurdi, Pune",
  period: "Expected 2028",
  knowledge: ["Data Structures & Algorithms", "DBMS", "Computer Networks", "Machine Learning fundamentals"],
  etc: ["Digital electronics", "Communication systems", "8051 & PIC microcontrollers", "I2C · SPI · IoT fundamentals"],
};

/** The resume lists no certifications. Add entries here and a section appears automatically. */
export const certifications: { title: string; issuer: string; year?: string; href?: string }[] = [];

export const marqueeItems = [
  "Arduino Uno",
  "Next.js",
  "KiCad",
  "Python",
  "React",
  "DaVinci Resolve",
  "C++",
  "Firebase",
  "PCB Design",
  "I2C · SPI",
  "MATLAB",
  "Cloud Firestore",
  "8051 · PIC",
  "CapCut",
  "SQL",
  "IoT",
];

export const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? id;
