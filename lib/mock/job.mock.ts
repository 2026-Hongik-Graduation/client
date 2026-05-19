import type {JobPosting} from '@/types/job';

export const MOCK_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-1',
    company: '카카오',
    jobTitle: '프론트엔드 개발자',
    requiredSkills: ['React', 'TypeScript', 'Next.js'],
    preferredSkills: ['GraphQL', 'Storybook'],
    competencies: ['문제 해결', '협업', '자기주도성'],
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
