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

  {
    id: 'cl-2',
    jobPostingId: 'job-2',
    company: '토스',
    jobTitle: 'Product Designer',
    questions: [
      {
        id: 'q-4',
        question: '토스에 지원한 이유를 작성해주세요.',
        answer: '',
        recommendedExperienceIds: ['exp-2'],
        maxLength: 500,
      },
    ],
    createdAt: '2025-05-12T11:00:00Z',
    updatedAt: '2025-05-19T09:00:00Z',
  },
  {
    id: 'cl-3',
    jobPostingId: 'job-1',
    company: '네이버',
    jobTitle: '서버 개발자',
    questions: [],
    createdAt: '2025-05-01T08:00:00Z',
    updatedAt: '2025-05-01T08:00:00Z',
  },
  {
    id: 'cl-4',
    jobPostingId: 'job-1',
    company: '라인',
    jobTitle: '프론트엔드 개발자',
    questions: [
      {
        id: 'q-5',
        question: '문제 해결 경험을 서술하세요.',
        answer: '초안 작성 중...',
        recommendedExperienceIds: ['exp-1', 'exp-3'],
        maxLength: 600,
      },
    ],
    createdAt: '2025-04-28T15:00:00Z',
    updatedAt: '2025-05-20T10:30:00Z',
  },
];

export const getMockCoverLetters = (): CoverLetter[] => MOCK_COVER_LETTERS;
