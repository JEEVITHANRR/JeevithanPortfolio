export interface Profile {
  name: string;
  shortName: string;
  title: string;
  subtitle: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  photo: string;
  socials: { github: string; linkedin: string; twitter?: string };
  stats: { label: string; value: string; suffix?: string }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  link: string;
  github: string;
  year: string;
  category: string;
  metrics: { label: string; value: string }[];
  highlight: boolean;
  color: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; icon: string }[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
}

export interface AnalyticsStat {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
  analyticsStats: AnalyticsStat[];
  techIcons: string[];
}
