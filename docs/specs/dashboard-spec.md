# 대시보드 페이지 스펙

## 개요

Google 로그인 후 진입하는 메인 허브 페이지(`app/dashboard/page.tsx`)를 구현한다. 사용자는 이 화면에서 등록한 경험 수·채용공고 수·작성 중인 자소서 수를 한눈에 파악하고, 최근 경험 3건을 미리 보며, 핵심 플로우(경험 추가 / 채용공고 분석 / 자소서 작성)로 즉시 진입할 수 있다. 백엔드 연동 전에는 `src/lib/mock/`의 Mock 데이터로 동작한다.

---

## 컴포넌트 계층

```
src/
├── app/
│   └── dashboard/
│       └── page.tsx                        ← 대시보드 페이지 (서버 컴포넌트)
├── components/
│   ├── dashboard/
│   │   ├── DashboardHeader.tsx             ← 헤더/네비게이션
│   │   ├── WelcomeBanner.tsx               ← 환영 문구 + CTA
│   │   ├── StatCard.tsx                    ← 단일 통계 카드
│   │   ├── StatCardGrid.tsx                ← 통계 카드 3종 묶음 (컨테이너)
│   │   ├── RecentExperienceCard.tsx        ← 단일 경험 미리보기 카드
│   │   ├── RecentExperienceList.tsx        ← 최근 경험 목록 섹션 (컨테이너)
│   │   ├── QuickActions.tsx                ← 빠른 실행 버튼 묶음
│   │   └── index.ts                        ← barrel export
│   └── ui/
│       ├── LogoGlyph.tsx                   ← 기존 로고 컴포넌트 (재사용)
│       └── index.ts                        ← 기존 barrel export
├── types/
│   ├── experience.ts                       ← 기존 타입 (재사용)
│   ├── job.ts                              ← 기존 타입 (재사용)
│   └── cover-letter.ts                     ← 기존 타입 (재사용)
└── lib/
    └── mock/
        ├── experience.mock.ts              ← 경험 Mock 데이터
        ├── job.mock.ts                     ← 채용공고 Mock 데이터
        └── cover-letter.mock.ts            ← 자소서 Mock 데이터
```

---

## 컴포넌트 상세

### DashboardHeader

- **파일**: `src/components/dashboard/DashboardHeader.tsx`
- **'use client'**: 불필요 (정적 마크업 + `<Link>` 사용)
- **Props**:
  ```typescript
  interface DashboardHeaderProps {
    activeNav?: 'experiences' | 'jobs' | 'cover-letters';
  }
  ```
- **로컬 State**: 없음
- **역할**: 앱 로고(LogoGlyph + 앱명)와 네비게이션 링크(경험, 채용공고, 자소서)를 담은 최상단 고정 헤더. 현재 활성 경로를 `activeNav` prop으로 강조 표시한다.
- **레이아웃 구조**:
  ```
  <header>
    <nav>
      <div> ← 로고 영역 (LogoGlyph + "Sprout · Career Studio")
      <ul>  ← 네비게이션 링크 목록
        <li><Link href="/experiences">경험</Link>
        <li><Link href="/jobs">채용공고</Link>
        <li><Link href="/cover-letters">자소서</Link>
  ```

---

### WelcomeBanner

- **파일**: `src/components/dashboard/WelcomeBanner.tsx`
- **'use client'**: 불필요 (정적 마크업)
- **Props**:
  ```typescript
  interface WelcomeBannerProps {
    userName?: string; // 미인증 상태 대비 옵셔널. 기본값: "취준생"
  }
  ```
- **로컬 State**: 없음
- **역할**: 사용자 환영 헤드라인과 AI 자소서 작성 시작 CTA 버튼을 담은 배너 섹션. `--grad-ai` 그라디언트를 활용한 AI 느낌의 배경 처리로 시선을 끈다.
- **레이아웃 구조**:
  ```
  <section>                           ← grad-ai 배경 오버레이 포함
    <div>                             ← 텍스트 영역
      <p>                             ← eyebrow: "안녕하세요, {userName}님"
      <h1>                            ← "오늘도 자소서를 완성해볼까요?"
      <p>                             ← 보조 설명
    <Link href="/cover-letters/new">  ← "AI 자소서 작성 시작" CTA 버튼
  ```

---

### StatCard

- **파일**: `src/components/dashboard/StatCard.tsx`
- **'use client'**: 불필요
- **Props**:
  ```typescript
  interface StatCardProps {
    label: string; // 카드 제목 (예: "등록된 경험")
    count: number; // 표시할 수치
    unit?: string; // 단위 (기본값: "개")
    linkHref: string; // 카드 클릭 시 이동할 경로
    linkLabel: string; // 링크 접근성 레이블 (예: "경험 목록 보기")
  }
  ```
- **로컬 State**: 없음
- **역할**: 단일 도메인의 집계 수치를 카드 형태로 표시. 카드 전체가 `<Link>`로 감싸져 해당 목록 페이지로 이동한다.

---

### StatCardGrid

- **파일**: `src/components/dashboard/StatCardGrid.tsx`
- **'use client'**: 불필요
- **Props**:

  ```typescript
  interface DashboardStats {
    experienceCount: number;
    jobCount: number;
    coverLetterCount: number;
  }

  interface StatCardGridProps {
    stats: DashboardStats;
  }
  ```

- **로컬 State**: 없음
- **역할**: 3개의 StatCard를 3열 그리드로 배치하는 컨테이너. 각 카드의 `linkHref`와 `label`은 이 컴포넌트에서 고정 상수로 관리한다.

---

### RecentExperienceCard

- **파일**: `src/components/dashboard/RecentExperienceCard.tsx`
- **'use client'**: 불필요
- **Props**:
  ```typescript
  interface RecentExperienceCardProps {
    experience: Experience; // src/types/experience.ts의 Experience 타입
  }
  ```
- **로컬 State**: 없음
- **역할**: 경험 1건의 핵심 정보(제목, 역할, 유형 배지, 기간)를 compact 카드로 표시. 카드 클릭 시 해당 경험 편집 페이지(`/experiences/{id}/edit`)로 이동한다.
- **표시 필드**: `title`, `role`, `experienceType`(배지), `startDate`~`endDate`

---

### RecentExperienceList

- **파일**: `src/components/dashboard/RecentExperienceList.tsx`
- **'use client'**: 불필요
- **Props**:
  ```typescript
  interface RecentExperienceListProps {
    experiences: Experience[]; // 최대 3건 전달 (페이지에서 슬라이싱)
  }
  ```
- **로컬 State**: 없음
- **역할**: "최근 경험" 섹션 헤더(타이틀 + "모두 보기" 링크)와 RecentExperienceCard 목록을 담는 컨테이너. `experiences`가 빈 배열이면 빈 상태(empty state) UI를 렌더링한다.
- **레이아웃 구조**:
  ```
  <section>
    <div>                             ← 섹션 헤더 행
      <h2>최근 경험</h2>
      <Link href="/experiences">모두 보기</Link>
    <ul>                              ← 카드 목록 (또는 빈 상태 메시지)
      <li><RecentExperienceCard /> × N
  ```

---

### QuickActions

- **파일**: `src/components/dashboard/QuickActions.tsx`
- **'use client'**: 불필요
- **Props**:

  ```typescript
  interface QuickAction {
    label: string; // 버튼 텍스트
    description: string; // 버튼 아래 보조 설명
    href: string; // 이동할 경로
    iconPath: string; // 인라인 SVG path d 속성값
  }

  interface QuickActionsProps {
    actions?: QuickAction[]; // 기본값: DEFAULT_QUICK_ACTIONS 상수
  }
  ```

- **로컬 State**: 없음
- **역할**: "빠른 실행" 섹션. 경험 추가 / 채용공고 분석 / 자소서 작성 버튼 3개를 카드형 링크로 나열한다. 각 버튼에는 아이콘, 라벨, 짧은 설명이 포함된다.
- **기본 액션 상수**:
  ```typescript
  const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
    {
      label: '경험 추가',
      description: 'STAR 형식으로 경험을 기록하세요',
      href: '/experiences/new',
      iconPath: '...', // + 아이콘
    },
    {
      label: '채용공고 분석',
      description: '공고 텍스트에서 키워드를 추출합니다',
      href: '/jobs/new',
      iconPath: '...', // 돋보기 아이콘
    },
    {
      label: '자소서 작성',
      description: 'AI가 경험을 매칭해 초안을 생성합니다',
      href: '/cover-letters/new',
      iconPath: '...', // 문서 + 스파클 아이콘
    },
  ];
  ```

---

### DashboardPage (page.tsx)

- **파일**: `src/app/dashboard/page.tsx`
- **'use client'**: 불필요 (서버 컴포넌트 - 데이터 패칭 및 정적 조합)
- **Props**: 없음 (Next.js App Router 페이지 컴포넌트)
- **로컬 State**: 없음
- **역할**: Mock 함수를 호출해 통계·경험 목록 데이터를 수집하고, 각 섹션 컴포넌트에 props로 전달하는 오케스트레이터. 레이아웃 구조와 섹션 간격을 담당한다.
- **레이아웃 구조**:
  ```
  <div>                           ← 배경색 (--bg-base) 전체 래퍼
    <DashboardHeader />
    <main>
      <WelcomeBanner />
      <StatCardGrid stats={...} />
      <RecentExperienceList experiences={...} />
      <QuickActions />
    </main>
  ```
- **데이터 흐름**:

  ```typescript
  // 서버 컴포넌트에서 Mock 함수 직접 호출
  const experiences = getMockExperiences(); // 전체 목록
  const jobs = getMockJobPostings();
  const coverLetters = getMockCoverLetters();

  const stats = {
    experienceCount: experiences.length,
    jobCount: jobs.length,
    coverLetterCount: coverLetters.length,
  };

  const recentExperiences = experiences.slice(0, 3); // 최근 3건
  ```

---

## Mock 데이터 타입

백엔드 연동 전 사용할 Mock 데이터 및 함수:

```typescript
// src/types/experience.ts — 기존 타입 재사용 (추가 불필요)
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
  problem: string;
  action: string;
  result: string;
  skills: string[];
  competencies: string[];
  startDate?: string;
  endDate?: string;
}

// src/types/job.ts — 기존 타입 재사용 (추가 불필요)
export interface JobPosting {
  id: string;
  company: string;
  jobTitle: string;
  requiredSkills: string[];
  preferredSkills: string[];
  competencies: string[];
  rawText?: string;
}

// src/types/cover-letter.ts — 기존 타입 재사용 (추가 불필요)
export interface CoverLetter {
  id: string;
  jobPostingId: string;
  company: string;
  jobTitle: string;
  questions: CoverLetterQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface CoverLetterQuestion {
  id: string;
  question: string;
  answer: string;
  recommendedExperienceIds: string[];
  maxLength?: number;
}
```

```typescript
// src/lib/mock/experience.mock.ts
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
```

```typescript
// src/lib/mock/job.mock.ts
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
```

```typescript
// src/lib/mock/cover-letter.mock.ts
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
```

---

## 테스트 케이스 (Vitest + React Testing Library)

### DashboardHeader.test.tsx

| #   | 테스트명                                | Given                          | When            | Then                                                      |
| --- | --------------------------------------- | ------------------------------ | --------------- | --------------------------------------------------------- |
| 1   | 로고 텍스트가 렌더링된다                | activeNav 없이 렌더링          | 컴포넌트 마운트 | "Sprout · Career Studio" 텍스트가 화면에 보임             |
| 2   | 네비게이션 링크 3개가 모두 렌더링된다   | 기본 렌더링                    | 컴포넌트 마운트 | role="navigation" 안에 링크가 3개 존재함                  |
| 3   | activeNav 값에 해당하는 링크가 강조된다 | `activeNav="experiences"` 전달 | 컴포넌트 마운트 | "경험" 링크에 활성 스타일 클래스 또는 `aria-current` 적용 |
| 4   | 각 링크가 올바른 href로 연결된다        | 기본 렌더링                    | 링크 요소 조회  | 경험:/experiences, 채용공고:/jobs, 자소서:/cover-letters  |

### WelcomeBanner.test.tsx

| #   | 테스트명                                 | Given                    | When            | Then                                   |
| --- | ---------------------------------------- | ------------------------ | --------------- | -------------------------------------- |
| 5   | 기본 userName 없이 대체 문구를 표시한다  | userName 없이 렌더링     | 컴포넌트 마운트 | "취준생" 텍스트가 화면에 보임          |
| 6   | userName prop이 반영된다                 | `userName="김민아"` 전달 | 컴포넌트 마운트 | "김민아" 텍스트가 화면에 보임          |
| 7   | CTA 링크가 /cover-letters/new로 연결된다 | 기본 렌더링              | 링크 요소 조회  | CTA 링크의 href가 `/cover-letters/new` |

### StatCard.test.tsx

| #   | 테스트명                                    | Given                                   | When            | Then                                     |
| --- | ------------------------------------------- | --------------------------------------- | --------------- | ---------------------------------------- |
| 8   | label과 count가 렌더링된다                  | `label="등록된 경험"`, `count={3}` 전달 | 컴포넌트 마운트 | "등록된 경험"과 "3" 텍스트가 화면에 보임 |
| 9   | 기본 unit "개"가 표시된다                   | unit prop 없이 렌더링                   | 컴포넌트 마운트 | "개" 텍스트가 화면에 보임                |
| 10  | 커스텀 unit이 반영된다                      | `unit="건"` 전달                        | 컴포넌트 마운트 | "건" 텍스트가 화면에 보임                |
| 11  | 카드 전체가 linkHref로 연결된 링크를 갖는다 | `linkHref="/experiences"` 전달          | 링크 요소 조회  | 접근 가능한 링크의 href가 `/experiences` |

### StatCardGrid.test.tsx

| #   | 테스트명                   | Given                                                       | When            | Then                                  |
| --- | -------------------------- | ----------------------------------------------------------- | --------------- | ------------------------------------- |
| 12  | 통계 3개가 모두 렌더링된다 | `stats={experienceCount:3, jobCount:2, coverLetterCount:1}` | 컴포넌트 마운트 | "3", "2", "1" 수치가 각각 화면에 보임 |

### RecentExperienceCard.test.tsx

| #   | 테스트명                              | Given                    | When            | Then                                          |
| --- | ------------------------------------- | ------------------------ | --------------- | --------------------------------------------- |
| 13  | 경험 제목이 렌더링된다                | MOCK_EXPERIENCES[0] 전달 | 컴포넌트 마운트 | "자기소개서 자동화 서비스 개발" 텍스트가 보임 |
| 14  | 경험 역할이 렌더링된다                | MOCK_EXPERIENCES[0] 전달 | 컴포넌트 마운트 | "프론트엔드 리드" 텍스트가 보임               |
| 15  | 경험 유형 배지가 렌더링된다           | MOCK_EXPERIENCES[0] 전달 | 컴포넌트 마운트 | "PROJECT" 또는 한국어 변환값 텍스트가 보임    |
| 16  | 카드가 올바른 편집 경로 링크를 갖는다 | MOCK_EXPERIENCES[0] 전달 | 링크 요소 조회  | 링크 href가 `/experiences/exp-1/edit`         |

### RecentExperienceList.test.tsx

| #   | 테스트명                                   | Given                   | When            | Then                                           |
| --- | ------------------------------------------ | ----------------------- | --------------- | ---------------------------------------------- |
| 17  | 전달된 경험 수만큼 카드가 렌더링된다       | experiences에 2건 전달  | 컴포넌트 마운트 | RecentExperienceCard가 2개 렌더링됨            |
| 18  | 빈 배열이면 빈 상태 메시지가 표시된다      | `experiences={[]}` 전달 | 컴포넌트 마운트 | "아직 등록된 경험이 없습니다" 류의 문구가 보임 |
| 19  | "모두 보기" 링크가 /experiences로 연결된다 | 기본 렌더링             | 링크 요소 조회  | "모두 보기" 링크의 href가 `/experiences`       |
| 20  | 섹션 제목이 렌더링된다                     | 기본 렌더링             | 컴포넌트 마운트 | "최근 경험" 텍스트가 heading role로 보임       |

### QuickActions.test.tsx

| #   | 테스트명                            | Given                     | When            | Then                                                      |
| --- | ----------------------------------- | ------------------------- | --------------- | --------------------------------------------------------- |
| 21  | 기본 액션 3개가 렌더링된다          | actions prop 없이 렌더링  | 컴포넌트 마운트 | "경험 추가", "채용공고 분석", "자소서 작성" 보임          |
| 22  | 각 액션 링크가 올바른 href를 갖는다 | 기본 렌더링               | 링크 요소 조회  | 각 링크가 /experiences/new, /jobs/new, /cover-letters/new |
| 23  | 커스텀 actions prop이 반영된다      | 1개짜리 actions 배열 전달 | 컴포넌트 마운트 | 전달한 label 텍스트만 화면에 보임                         |

테스트 수: **23개**

---

## Storybook 스토리 (CSF3)

### DashboardHeader.stories.tsx

| 스토리명           | args 핵심값                 | 설명                   |
| ------------------ | --------------------------- | ---------------------- |
| Default            | `activeNav` 없음            | 활성 탭 없는 기본 상태 |
| ActiveExperiences  | `activeNav="experiences"`   | 경험 탭 활성           |
| ActiveJobs         | `activeNav="jobs"`          | 채용공고 탭 활성       |
| ActiveCoverLetters | `activeNav="cover-letters"` | 자소서 탭 활성         |

### WelcomeBanner.stories.tsx

| 스토리명     | args 핵심값         | 설명                           |
| ------------ | ------------------- | ------------------------------ |
| Default      | `userName` 없음     | 기본 대체 문구 ("취준생") 표시 |
| WithUserName | `userName="김민아"` | 이름이 있을 때                 |

### StatCard.stories.tsx

| 스토리명   | args 핵심값                                                                                 | 설명        |
| ---------- | ------------------------------------------------------------------------------------------- | ----------- |
| Default    | `label="등록된 경험"`, `count={3}`, `linkHref="/experiences"`, `linkLabel="경험 목록 보기"` | 기본 상태   |
| ZeroCount  | `count={0}`                                                                                 | 0건일 때    |
| CustomUnit | `count={2}`, `unit="건"`                                                                    | 커스텀 단위 |

### StatCardGrid.stories.tsx

| 스토리명 | args 핵심값                                                 | 설명                    |
| -------- | ----------------------------------------------------------- | ----------------------- |
| Default  | `stats={experienceCount:3, jobCount:2, coverLetterCount:1}` | 기본 데이터             |
| AllZero  | `stats={experienceCount:0, jobCount:0, coverLetterCount:0}` | 모두 0 (신규 가입 상태) |

### RecentExperienceCard.stories.tsx

| 스토리명   | args 핵심값                      | 설명                            |
| ---------- | -------------------------------- | ------------------------------- |
| Project    | `experience=MOCK_EXPERIENCES[0]` | PROJECT 타입 경험               |
| Internship | `experience=MOCK_EXPERIENCES[1]` | INTERNSHIP 타입 경험            |
| Activity   | `experience=MOCK_EXPERIENCES[2]` | ACTIVITY 타입 경험              |
| NoEndDate  | `experience={...endDate 없음}`   | 진행 중인 경험 (endDate 미표시) |

### RecentExperienceList.stories.tsx

| 스토리명        | args 핵심값                               | 설명       |
| --------------- | ----------------------------------------- | ---------- |
| WithExperiences | `experiences=MOCK_EXPERIENCES.slice(0,3)` | 경험 3건   |
| Empty           | `experiences={[]}`                        | 빈 상태 UI |
| SingleItem      | `experiences=MOCK_EXPERIENCES.slice(0,1)` | 경험 1건   |

### QuickActions.stories.tsx

| 스토리명      | args 핵심값               | 설명                    |
| ------------- | ------------------------- | ----------------------- |
| Default       | `actions` 없음 (기본 3개) | 기본 빠른 실행 버튼 3종 |
| CustomActions | 커스텀 1개 액션 배열      | 커스텀 액션 구성 확인   |

---

## 구현 순서

1. `src/types/experience.ts` — 기존 타입 파일 확인 (신규 추가 없음, 재사용)
2. `src/types/job.ts` — 기존 타입 파일 확인 (신규 추가 없음, 재사용)
3. `src/types/cover-letter.ts` — 기존 타입 파일 확인 (`CoverLetterQuestion` 인터페이스 포함 여부 확인 후 필요 시 추가)
4. `src/lib/mock/experience.mock.ts` — 경험 Mock 데이터 및 `getMockExperiences` 함수 작성
5. `src/lib/mock/job.mock.ts` — 채용공고 Mock 데이터 및 `getMockJobPostings` 함수 작성
6. `src/lib/mock/cover-letter.mock.ts` — 자소서 Mock 데이터 및 `getMockCoverLetters` 함수 작성
7. `src/components/dashboard/DashboardHeader.tsx` — 헤더/네비게이션 컴포넌트
8. `src/components/dashboard/DashboardHeader.test.tsx` — 헤더 테스트 (4개)
9. `src/components/dashboard/DashboardHeader.stories.tsx` — 헤더 스토리 (4개)
10. `src/components/dashboard/WelcomeBanner.tsx` — 환영 배너 컴포넌트
11. `src/components/dashboard/WelcomeBanner.test.tsx` — 배너 테스트 (3개)
12. `src/components/dashboard/WelcomeBanner.stories.tsx` — 배너 스토리 (2개)
13. `src/components/dashboard/StatCard.tsx` — 단일 통계 카드
14. `src/components/dashboard/StatCard.test.tsx` — StatCard 테스트 (4개)
15. `src/components/dashboard/StatCard.stories.tsx` — StatCard 스토리 (3개)
16. `src/components/dashboard/StatCardGrid.tsx` — 통계 카드 그리드 컨테이너
17. `src/components/dashboard/StatCardGrid.test.tsx` — StatCardGrid 테스트 (1개)
18. `src/components/dashboard/StatCardGrid.stories.tsx` — StatCardGrid 스토리 (2개)
19. `src/components/dashboard/RecentExperienceCard.tsx` — 경험 미리보기 카드
20. `src/components/dashboard/RecentExperienceCard.test.tsx` — 카드 테스트 (4개)
21. `src/components/dashboard/RecentExperienceCard.stories.tsx` — 카드 스토리 (4개)
22. `src/components/dashboard/RecentExperienceList.tsx` — 최근 경험 목록 섹션
23. `src/components/dashboard/RecentExperienceList.test.tsx` — 목록 테스트 (4개)
24. `src/components/dashboard/RecentExperienceList.stories.tsx` — 목록 스토리 (3개)
25. `src/components/dashboard/QuickActions.tsx` — 빠른 실행 버튼 묶음
26. `src/components/dashboard/QuickActions.test.tsx` — 빠른 실행 테스트 (3개)
27. `src/components/dashboard/QuickActions.stories.tsx` — 빠른 실행 스토리 (2개)
28. `src/components/dashboard/index.ts` — barrel export 추가
29. `src/app/dashboard/page.tsx` — 대시보드 페이지 (서버 컴포넌트, 데이터 조합)

---

## 완료 기준

- [ ] 모든 Props가 TypeScript로 정의됨 (`any` 사용 금지)
- [ ] `app/dashboard/page.tsx`가 서버 컴포넌트로 유지됨 (`'use client'` 없음)
- [ ] 인터랙션 없는 컴포넌트 전원 서버 컴포넌트 (`'use client'` 없음)
- [ ] Tailwind CSS arbitrary value(`[var(--token)]`)로 디자인 토큰 참조
- [ ] 인라인 스타일(`style` prop) 사용 없음
- [ ] 각 도메인 Mock 파일에 데이터 배열과 getter 함수가 함께 정의됨
- [ ] 컴포넌트가 Mock/실제 API를 구분하지 않음 (인터페이스 동일)
- [ ] 테스트 케이스 23개가 사용자 시나리오를 커버함
- [ ] 빈 상태(empty state) UI가 RecentExperienceList에 구현됨
- [ ] Storybook에서 모든 상태(기본·빈·에러·로딩)를 확인 가능함
- [ ] `src/components/dashboard/index.ts`로 barrel export가 구성됨
- [ ] `pnpm type-check` 통과
- [ ] `pnpm lint` 통과
