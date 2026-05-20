import type {JobPosting} from '@/types/job';

export const MOCK_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-1',
    company: '카카오',
    jobTitle: '프론트엔드 개발자',
    requiredSkills: ['React', 'TypeScript', 'Next.js'],
    preferredSkills: ['GraphQL', 'Storybook'],
    competencies: ['문제 해결', '협업', '자기주도성'],

    questions: [
      {id: 'q-1', text: '지원 동기를 작성해주세요.', limit: 500},
      {
        id: 'q-2',
        text: '팀 프로젝트에서 갈등을 해결한 경험을 서술하세요.',
        limit: 700,
      },
      {
        id: 'q-3',
        text: '입사 후 이루고 싶은 목표를 작성해주세요.',
        limit: 400,
      },
    ],
  },
  {
    id: 'job-2',
    company: '토스',
    jobTitle: 'Product Designer',
    requiredSkills: ['Figma', 'Prototyping'],
    preferredSkills: ['Motion Design', 'UX Writing'],
    competencies: ['사용자 공감', '세심함', '빠른 실행'],
  },
];

export const getMockJobPostings = (): JobPosting[] => MOCK_JOB_POSTINGS;
