export interface CoverLetterQuestion {
  id: string;
  question: string;
  answer: string;
  recommendedExperienceIds: string[];
  maxLength?: number;
}

export interface CoverLetter {
  id: string;
  jobPostingId: string;
  company: string;
  jobTitle: string;
  questions: CoverLetterQuestion[];
  createdAt: string; // ISO 8601
  updatedAt: string;
}
