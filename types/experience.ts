export type ExperienceType =
  | 'PROJECT'
  | 'INTERNSHIP'
  | 'ACTIVITY'
  | 'AWARD'
  | 'OTHER';

export interface Experience {
  id: string;
  experienceType: ExperienceType;
  title: string;
  role: string;
  problem: string; // S: Situation
  action: string; // A: Action
  result: string; // R: Result
  skills: string[];
  competencies: string[];
  startDate?: string; // 'YYYY-MM'
  endDate?: string;
}

export const EXPERIENCE_TYPE_LABEL: Record<ExperienceType, string> = {
  PROJECT: '프로젝트',
  INTERNSHIP: '인턴',
  ACTIVITY: '대외활동',
  AWARD: '수상',
  OTHER: '기타',
};
