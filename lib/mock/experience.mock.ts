import type {Experience} from '@/types/experience';

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    experienceType: 'PROJECT',
    title: '자기소개서 자동화 서비스 개발',
    role: '프론트엔드 리드',
    problem: '팀원들이 자소서 항목별로 경험을 찾는 데 30분 이상 소요됨',
    action: 'Next.js + AI API를 활용한 경험 매칭 알고리즘 설계 및 구현',
    result: '자소서 초안 작성 시간 70% 단축, 사용자 만족도 4.8/5.0',
    skills: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    competencies: ['문제 해결', '협업', '기술 리더십'],
    startDate: '2025-03',
    endDate: '2025-06',
  },
  {
    id: 'exp-2',
    experienceType: 'INTERNSHIP',
    title: '스타트업 UX 리서치 인턴',
    role: 'UX 리서처',
    problem: '신규 피처의 사용성 검증 프로세스 부재',
    action: '사용자 인터뷰 15건 수행 및 어피니티 다이어그램 작성',
    result: '인터뷰 인사이트 기반 UI 개선으로 전환율 22% 향상',
    skills: ['Figma', '사용자 인터뷰', '데이터 분석'],
    competencies: ['사용자 중심 사고', '커뮤니케이션'],
    startDate: '2024-07',
    endDate: '2024-08',
  },
  {
    id: 'exp-3',
    experienceType: 'ACTIVITY',
    title: '교내 창업 동아리 운영진',
    role: '기술 파트장',
    problem: '동아리 내 프로젝트 진행 시 기술 멘토링 체계 부재',
    action: '월간 기술 세미나 기획 및 코드 리뷰 문화 정착',
    result: '동아리원 10명이 첫 포트폴리오 완성, 대외 해커톤 2위 수상',
    skills: ['React', 'Node.js', '멘토링'],
    competencies: ['리더십', '교육', '팀 빌딩'],
    startDate: '2024-03',
    endDate: '2025-02',
  },
];

export const getMockExperiences = (): Experience[] => MOCK_EXPERIENCES;
