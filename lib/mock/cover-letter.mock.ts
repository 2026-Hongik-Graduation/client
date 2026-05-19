import type {CoverLetter} from '@/types/cover-letter';

export const MOCK_COVER_LETTERS: CoverLetter[] = [
  {
    id: 'cl-1',
    jobPostingId: 'job-1',
    company: '카카오',
    jobTitle: '프론트엔드 개발자',
    questions: [
      {
        id: 'q-1',
        question: '지원 동기를 작성해주세요.',
        answer: '',
        recommendedExperienceIds: ['exp-1'],
        maxLength: 500,
      },
    ],
    createdAt: '2025-05-10T09:00:00Z',
    updatedAt: '2025-05-18T14:30:00Z',
  },
];

export const getMockCoverLetters = (): CoverLetter[] => MOCK_COVER_LETTERS;
