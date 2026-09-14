export interface IntroData {
  name: string;
  tagline: string;
  description: string;
  resumeFile?: string;
}

export interface EducationItem {
  id: string;
  type: string;
  board: string;
  instituteName: string;
  instituteLocation: string;
  duration: string;
  grade: string;
  institutePhoto?: string;
  marksheetPhoto?: string;
}

export interface SkillItem {
  name: string;
  description: string;
  type: "technical" | "communication" | "logical";
  proficiency: number;
}

export interface AchievementItem {
  id: string;
  eventName: string;
  eventLocation: string;
  organisedBy: string;
  dateTime: string;
  durationEnd?: string;
  rank: string;
  domain: string;
  photo?: string;
}

export interface ExtracurricularEvent {
  formType: 1;
  id: string;
  eventName: string;
  description: string;
  dateTime: string;
  role: string;
  photo?: string;
}

export interface ExtracurricularPosition {
  formType: 2;
  id: string;
  positionTitle: string;
  description: string;
  duration: string;
  logo?: string;
}

export type ExtracurricularItem = ExtracurricularEvent | ExtracurricularPosition;

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  githubLink: string;
  people: string[]; // list of github profile URLs
  domains: string[];
  docsLink?: string;
  photo?: string;
}

export interface ContactItem {
  platform: string;
  profileLink: string;
  name?: string;
  logo?: string; // Optional logo path, otherwise default text or generic icon
}

export interface Settings {
  backgroundImages: {
    home?: string;
    education?: string;
    skills?: string;
    achievements?: string;
    extracurriculars?: string;
    projects?: string;
    contacts?: string;
  };
}
