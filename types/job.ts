import type {JobQuestion} from '@/types/matching';

export type {JobQuestion};

export interface JobPosting {
  id: string;
  company: string;
  jobTitle: string;
  requiredSkills: string[];
  preferredSkills: string[];
  competencies: string[];
  rawText?: string;
  questions?: JobQuestion[]; // 자소서 문항 목록 (채용공고에서 추출)
}
