export interface JobPosting {
  id: string;
  company: string;
  jobTitle: string;
  requiredSkills: string[];
  preferredSkills: string[];
  competencies: string[];
  rawText?: string;
}
