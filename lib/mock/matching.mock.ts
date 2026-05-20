import type {QuestionMatch} from '@/types/matching';

export const MOCK_QUESTION_MATCHES: QuestionMatch[] = [
  {
    qId: 'q-1',
    primary: 'exp-1',
    matched: ['exp-1', 'exp-2'],
    score: 91,
    keywords: ['AI', '자동화', 'Next.js'],
    reason: '자소서 자동화 프로젝트 경험이 지원 동기와 직결됩니다.',
  },
  {
    qId: 'q-2',
    primary: 'exp-3',
    matched: ['exp-3', 'exp-2'],
    score: 78,
    keywords: ['협업', '갈등 해결', '커뮤니케이션'],
    reason: '동아리 운영진 경험에서 팀 조율 역량이 잘 드러납니다.',
  },
  {
    qId: 'q-3',
    primary: 'exp-1',
    matched: ['exp-1'],
    score: 84,
    keywords: ['프론트엔드', '리더십', '기술 성장'],
    reason: '프론트엔드 리드 경험이 목표와 자연스럽게 연결됩니다.',
  },
];

export const getMockQuestionMatches = (): QuestionMatch[] =>
  MOCK_QUESTION_MATCHES;
