# 자기소개서 플로우 스펙

## 개요

채용공고에 연결된 경험 매칭 추천 화면, 문항별 자기소개서 에디터 화면, 저장된 자기소개서 목록 화면의 3개 페이지와 이를 구성하는 공통 UI 컴포넌트를 정의한다. 사용자는 경험 매칭 결과를 검토한 뒤 AI 챗봇의 도움을 받아 자기소개서를 작성하고, 완성된 문서를 목록에서 관리할 수 있다. 백엔드 연동 전에는 `lib/mock/` 데이터로 동작한다.

---

## 컴포넌트 계층

```
types/
  matching.ts                                ← 신규 도메인 타입

lib/mock/
  matching.mock.ts                           ← 신규 Mock 데이터

app/
  globals.css                                ← 유틸 클래스 추가
  jobs/[id]/matching/
    page.tsx                                 ← 경험 매칭 추천 페이지 (서버 컴포넌트)
  cover-letters/
    page.tsx                                 ← 저장된 자소서 목록 페이지 (서버 컴포넌트)
    [id]/edit/
      page.tsx                               ← 자소서 에디터 페이지 (서버 컴포넌트)

components/
  ui/
    AppSidebar/
      AppSidebar.tsx
      AppSidebar.test.tsx
      AppSidebar.stories.tsx
      index.ts
    PageTopBar/
      PageTopBar.tsx
      PageTopBar.test.tsx
      PageTopBar.stories.tsx
      index.ts
    ScoreRing/
      ScoreRing.tsx
      ScoreRing.test.tsx
      ScoreRing.stories.tsx
      index.ts
    Icon/
      Icon.tsx
      Icon.test.tsx
      Icon.stories.tsx
      index.ts
    index.ts                                 ← 기존 파일에 export 추가
  matching/
    MatchResultCard/
      MatchResultCard.tsx
      MatchResultCard.test.tsx
      MatchResultCard.stories.tsx
      index.ts
    index.ts                                 ← 신규
  cover-letter/
    CoverLetterCard/
      CoverLetterCard.tsx
      CoverLetterCard.test.tsx
      CoverLetterCard.stories.tsx
      index.ts
    AiChatbot/
      AiChatbot.tsx
      AiChatbot.test.tsx
      AiChatbot.stories.tsx
      index.ts
    index.ts                                 ← 신규
```

---

## 신규 타입 정의

### `types/matching.ts`

```typescript
// 채용공고의 문항 (JobPosting.questions[] 요소)
export interface JobQuestion {
  id: string;
  text: string; // 문항 텍스트
  limit: number; // 글자 수 제한
}

// 문항 1개에 대한 AI 매칭 결과
export interface QuestionMatch {
  qId: string; // JobQuestion.id 참조
  primary: string; // 우선 추천 Experience.id
  matched: string[]; // 추천 Experience.id 목록 (primary 포함)
  score: number; // 0–100 매칭 점수
  keywords: string[]; // 공통 키워드
  reason: string; // AI 추천 이유 한 줄 설명
}
```

### `types/job.ts` 확장

기존 `JobPosting` 인터페이스에 아래 필드를 추가한다.

```typescript
questions?: JobQuestion[];  // 자소서 문항 목록 (채용공고에서 추출)
```

---

## Mock 데이터 추가

### `lib/mock/job.mock.ts` 확장

기존 `MOCK_JOB_POSTINGS`의 첫 번째 항목(`job-1`)에 `questions` 필드를 추가한다.

```typescript
// 추가 예시
questions: [
  { id: 'q-1', text: '지원 동기를 작성해주세요.', limit: 500 },
  { id: 'q-2', text: '팀 프로젝트에서 갈등을 해결한 경험을 서술하세요.', limit: 700 },
  { id: 'q-3', text: '입사 후 이루고 싶은 목표를 작성해주세요.', limit: 400 },
],
```

### `lib/mock/matching.mock.ts` (신규)

```typescript
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
```

### `lib/mock/cover-letter.mock.ts` 확장

기존 `MOCK_COVER_LETTERS`에 3개 항목을 추가하여 총 4개로 확장한다.

```typescript
// 추가 항목 예시
{
  id: 'cl-2',
  jobPostingId: 'job-2',
  company: '토스',
  jobTitle: 'Product Designer',
  questions: [
    { id: 'q-4', question: '토스에 지원한 이유를 작성해주세요.', answer: '', recommendedExperienceIds: ['exp-2'], maxLength: 500 },
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
    { id: 'q-5', question: '문제 해결 경험을 서술하세요.', answer: '초안 작성 중...', recommendedExperienceIds: ['exp-1', 'exp-3'], maxLength: 600 },
  ],
  createdAt: '2025-04-28T15:00:00Z',
  updatedAt: '2025-05-20T10:30:00Z',
},
```

---

## CSS 유틸리티 추가 (`app/globals.css`)

기존 `:root` 변수 블록에 추가할 CSS 변수:

```css
--bg-canvas: oklch(10% 0.012 255); /* 최하단 캔버스 배경 */
--bg-elevated: oklch(20% 0.02 255); /* 떠 있는 패널/모달 배경 */
--danger: oklch(62% 0.22 25); /* 에러/삭제 강조 */
--r-sm: 0.5rem; /* 8px 소형 radius */
```

`@layer utilities`에 추가할 유틸 클래스:

```css
/* ── 레이아웃 ── */
.row {
  display: flex;
  align-items: center;
}
.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.col {
  display: flex;
  flex-direction: column;
}
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* ── 카드 ── */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 1.5rem;
}
.card-glow {
  box-shadow:
    var(--shadow-card),
    0 0 0 1px var(--green-300);
}

/* ── 배지/칩 ── */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 999px;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
}
.chip-sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.6875rem;
}
.chip-green {
  background: oklch(35% 0.12 155 / 0.25);
  color: var(--green-200);
}
.chip-mint {
  background: oklch(35% 0.1 170 / 0.2);
  color: oklch(78% 0.12 170);
}
.chip-outline {
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-3);
}
.chip-glow {
  background: oklch(35% 0.12 155 / 0.35);
  color: var(--green-200);
  box-shadow: 0 0 8px oklch(35% 0.12 155 / 0.4);
}

/* ── 버튼 ── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--radius-btn);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.15s;
  cursor: pointer;
}
.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
}
.btn-primary {
  background: var(--green-300);
  color: oklch(10% 0.01 155);
}
.btn-primary:hover {
  background: var(--green-400);
}
.btn-secondary {
  background: var(--bg-subtle);
  color: var(--text-2);
  border: 1px solid var(--border-default);
}
.btn-secondary:hover {
  background: var(--border-subtle);
}
.btn-ghost {
  background: transparent;
  color: var(--text-3);
}
.btn-ghost:hover {
  color: var(--text-2);
  background: var(--bg-subtle);
}

/* ── 타이포그래피 ── */
.eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--green-200);
}
.h-display {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-1);
}
.h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-1);
}
.body {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-2);
}
.caption {
  font-size: 0.8125rem;
  color: var(--text-3);
}
.grad-text {
  background: var(--grad-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── 배경 ── */
.bg-canvas {
  background: var(--bg-canvas);
}
.bg-elevated {
  background: var(--bg-elevated);
}

/* ── 에디터 문서 영역 ── */
.doc-paper {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: 2rem;
  min-height: 60vh;
}
.doc-question {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 1rem;
}
.doc-paragraph {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: var(--text-2);
  outline: none;
}
.doc-suggest {
  background: oklch(35% 0.12 155 / 0.12);
  border-left: 2px solid var(--green-300);
  padding: 0.75rem 1rem;
  border-radius: 0 var(--r-sm) var(--r-sm) 0;
  margin-top: 0.75rem;
}

/* ── AI 상태 ── */
.ai-thinking {
  display: flex;
  gap: 4px;
  align-items: center;
}
.ai-thinking span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green-200);
  animation: dot-bounce 1.2s ease-in-out infinite;
}
.ai-thinking span:nth-child(2) {
  animation-delay: 0.2s;
}
.ai-thinking span:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes dot-bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.dot-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green-300);
  animation: pulse-dot 1.5s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
```

---

## 공통 UI 컴포넌트 상세

### Icon

- **파일**: `components/ui/Icon/Icon.tsx`
- **'use client'**: 불필요 (순수 SVG 렌더링)
- **Props**:

  ```typescript
  export type IconName =
    | 'refresh'
    | 'arrow_right'
    | 'sparkles'
    | 'check'
    | 'eye'
    | 'download'
    | 'filter'
    | 'sort'
    | 'plus'
    | 'copy'
    | 'edit'
    | 'trash';

  interface IconProps {
    name: IconName;
    size?: number; // px 단위, 기본값: 20
    className?: string; // 색상 등 추가 클래스
    'aria-hidden'?: boolean; // 기본값: true
  }
  ```

- **로컬 State**: 없음
- **역할**: `IconName`에 따라 해당 SVG path를 인라인으로 렌더링하는 단순 컴포넌트. Lucide React 미설치이므로 `<svg>` + `<path>`를 직접 구현한다. `viewBox="0 0 24 24"` 기준, `stroke="currentColor"` 스타일 적용.
- **구현 방식**: `ICON_PATHS` 상수 맵(`Record<IconName, string>`)에 각 아이콘의 `d` 속성 값을 보관하고, 렌더링 시 해당 path만 삽입한다.

---

### ScoreRing

- **파일**: `components/ui/ScoreRing/ScoreRing.tsx`
- **'use client'**: 불필요 (정적 SVG, 값은 prop으로 수신)
- **Props**:
  ```typescript
  interface ScoreRingProps {
    value: number; // 0–100 정수
    size?: number; // SVG 너비/높이 px, 기본값: 80
    strokeWidth?: number; // 기본값: 6
    className?: string;
  }
  ```
- **로컬 State**: 없음
- **역할**: `value`를 0–100 범위로 받아 SVG `<circle>`의 `strokeDashoffset`을 계산하여 원형 진행 바를 렌더링한다. 중앙에 점수 숫자를 `<text>`로 표시. 색상은 값 구간에 따라 다름: 80 이상 `--green-300`, 60–79 `--warn`, 60 미만 `--text-4`.
- **계산 공식**:
  - `radius = (size - strokeWidth) / 2`
  - `circumference = 2 * Math.PI * radius`
  - `dashoffset = circumference * (1 - value / 100)`

---

### AppSidebar

- **파일**: `components/ui/AppSidebar/AppSidebar.tsx`
- **'use client'**: 필요 (`usePathname`으로 현재 경로 감지)
- **Props**:
  ```typescript
  interface AppSidebarProps {
    className?: string;
  }
  ```
- **로컬 State**: 없음 (`usePathname` 훅 사용)
- **역할**: 앱 좌측 고정 네비게이션. 로고 + 4개 메뉴(대시보드, 경험, 채용공고, 자소서)를 세로 아이콘 링크로 나열한다. `usePathname()`으로 현재 경로를 감지하여 활성 메뉴를 강조 표시(`chip-green` 배경). `<nav>` + `<ul>` 의미론적 마크업 사용.
- **내부 상수**:
  ```typescript
  const NAV_ITEMS = [
    {href: '/dashboard', icon: 'home', label: '대시보드'},
    {href: '/experiences', icon: 'edit', label: '경험'},
    {href: '/jobs', icon: 'filter', label: '채용공고'},
    {href: '/cover-letters', icon: 'sparkles', label: '자소서'},
  ] as const;
  ```

---

### PageTopBar

- **파일**: `components/ui/PageTopBar/PageTopBar.tsx`
- **'use client'**: 불필요 (정적 마크업)
- **Props**:
  ```typescript
  interface PageTopBarProps {
    title: string;
    breadcrumb?: string[]; // ['채용공고', '카카오 프론트엔드', '경험 매칭']
    actions?: React.ReactNode; // 우측 버튼 슬롯
  }
  ```
- **로컬 State**: 없음
- **역할**: 페이지 상단 바. 좌측에 breadcrumb + 타이틀, 우측에 `actions` 슬롯을 렌더링한다. 에디터/목록/매칭 페이지에서 공통 사용.

---

## 컴포넌트 상세 — matching 도메인

### MatchResultCard

- **파일**: `components/matching/MatchResultCard/MatchResultCard.tsx`
- **'use client'**: 필요 (`useState`로 선택 경험 전환)
- **Props**:
  ```typescript
  interface MatchResultCardProps {
    question: JobQuestion;
    match: QuestionMatch;
    experiences: Experience[]; // matched ID에 해당하는 경험 객체 목록
    onSelectExperience?: (qId: string, expId: string) => void;
  }
  ```
- **로컬 State**:
  ```typescript
  const [selectedExpId, setSelectedExpId] = useState<string>(match.primary);
  ```
- **역할**: 문항 1개에 대한 AI 매칭 결과를 카드로 표시. 상단에 문항 텍스트와 ScoreRing, 중단에 AI 추천 이유와 키워드 칩, 하단에 Primary/Alt 경험 2열 레이아웃. "다른 경험으로" 버튼 클릭 시 `selectedExpId`를 alternates 중 다음 항목으로 순환한다. "이 조합으로 작성" 버튼은 `onSelectExperience` 콜백 호출.
- **레이아웃 구조**:
  ```
  <div class="card">
    <div class="row-between">        ← 문항 텍스트 + ScoreRing
    <div class="col gap-2">          ← AI 추천 이유
      <p class="caption">추천 이유</p>
      <p class="body">{match.reason}</p>
      <div>                          ← 키워드 칩 목록
        {keywords.map(k => <span class="chip chip-green chip-sm">)}
    <div class="grid-2">             ← Primary / Alt 경험 2열
      <ExperiencePreview isPrimary />
      <ExperiencePreview />
    <div class="row gap-2">          ← 액션 버튼
      <button class="btn btn-ghost btn-sm">다른 경험으로</button>
      <button class="btn btn-primary btn-sm">이 조합으로 작성</button>
  ```

---

## 컴포넌트 상세 — cover-letter 도메인

### CoverLetterCard

- **파일**: `components/cover-letter/CoverLetterCard/CoverLetterCard.tsx`
- **'use client'**: 불필요 (정적 표시, 링크로 이동)
- **Props**:
  ```typescript
  interface CoverLetterCardProps {
    coverLetter: CoverLetter;
    onCopy?: (id: string) => void;
    onDelete?: (id: string) => void;
    onExport?: (id: string) => void;
  }
  ```
- **로컬 State**: 없음
- **역할**: 저장된 자소서 1건을 카드로 표시. 상단에 회사 이니셜 아이콘(배경색 결정 규칙: 회사명 첫 글자 charCode % 팔레트 길이), 회사명, 직무명. 중단에 완성/작성중 배지, 진행률 바(`questions`에서 `answer.length > 0`인 비율). 하단에 수정 날짜와 액션 버튼(복사, 내보내기, 편집, 삭제). 카드 본체 클릭 시 편집 페이지(`/cover-letters/{id}/edit`)로 이동.
- **진행률 계산**:
  ```typescript
  const progress =
    questions.length === 0
      ? 0
      : Math.round(
          (questions.filter((q) => q.answer.length > 0).length /
            questions.length) *
            100
        );
  ```
- **완성 기준**: `progress === 100`이면 "완성" 배지, 그 외 "작성중" 배지.

---

### AiChatbot

- **파일**: `components/cover-letter/AiChatbot/AiChatbot.tsx`
- **'use client'**: 불필요 (정적 UI, 인터랙션 없음)
- **Props**:

  ```typescript
  interface ChatMessage {
    role: 'ai' | 'user';
    content: string;
  }

  interface AiChatbotProps {
    messages?: ChatMessage[]; // 기본값: MOCK_CHAT_MESSAGES (정적)
    isThinking?: boolean; // AI 타이핑 애니메이션 표시 여부, 기본값: false
  }
  ```

- **로컬 State**: 없음 (정적 UI)
- **역할**: 에디터 우측 사이드 패널. AI 메시지와 사용자 메시지를 채팅 버블 형태로 나열. `isThinking=true`이면 `.ai-thinking` 애니메이션 바 표시. 하단에 입력창 UI(비활성 상태, 현 단계에서는 인터랙션 없음). 스펙 범위에서는 정적 UI만 구현.
- **내부 상수 (Mock 메시지)**:
  ```typescript
  const MOCK_CHAT_MESSAGES: ChatMessage[] = [
    {
      role: 'ai',
      content: '안녕하세요! 카카오 프론트엔드 자기소개서 작성을 도와드릴게요.',
    },
    {
      role: 'ai',
      content:
        '1번 문항에서 자소서 자동화 프로젝트 경험이 매칭됐어요. 이 경험을 중심으로 작성해볼까요?',
    },
    {role: 'user', content: '네, 좋아요. 초안 써줄 수 있어요?'},
    {role: 'ai', content: '물론이죠! 아래 초안을 참고해보세요.'},
  ];
  ```

---

## 페이지 상세

### 경험 매칭 추천 페이지

- **파일**: `app/jobs/[id]/matching/page.tsx`
- **'use client'**: 불필요 (서버 컴포넌트)
- **URL 파라미터**: `{ params: { id: string } }` — 채용공고 ID
- **역할**: 해당 채용공고의 문항 목록과 AI 매칭 결과를 페이지로 조합. STEP 진행 상황(3/5) 표시. 각 문항에 대한 MatchResultCard를 세로로 나열.
- **데이터 흐름**:
  ```typescript
  const jobPosting = getMockJobPostings().find((j) => j.id === params.id);
  const experiences = getMockExperiences();
  const matches = getMockQuestionMatches();
  ```
- **레이아웃 구조**:
  ```
  <div class="bg-canvas min-h-screen">
    <AppSidebar />
    <main class="col gap-6 p-8">
      <PageTopBar title="경험 매칭" breadcrumb={[company, jobTitle, '경험 매칭']}
                  actions={<Link href="/cover-letters/new">이 조합으로 작성</Link>} />
      <div>                          ← eyebrow + h-display 헤더
        <p class="eyebrow">STEP 3/5 · 경험 매칭</p>
        <h1 class="h-display">{N}개 문항 · {M}개 경험의 최적 조합</h1>
      <div class="col gap-4">        ← MatchResultCard 목록
        {matches.map(m => <MatchResultCard ... />)}
      <div class="row-between">      ← 하단 내비게이션
        <Link class="btn btn-ghost">← 이전</Link>
        <Link class="btn btn-primary">자소서 작성 시작 →</Link>
  ```

---

### 자기소개서 에디터 페이지

- **파일**: `app/cover-letters/[id]/edit/page.tsx`
- **'use client'**: 불필요 (서버 컴포넌트, 편집 인터랙션은 추후 분리)
- **URL 파라미터**: `{ params: { id: string } }` — 자소서 ID
- **역할**: 문항별 자소서 에디터와 AI 챗봇 사이드패널을 2열 레이아웃으로 구성. 현 스펙에서 편집 기능은 정적 UI로 구현(실제 텍스트 편집은 추후 `'use client'` 클라이언트 컴포넌트로 분리).
- **데이터 흐름**:
  ```typescript
  const coverLetter = getMockCoverLetters().find((cl) => cl.id === params.id);
  const [activeQuestion] = coverLetter.questions; // 첫 번째 문항 기본 표시
  ```
- **레이아웃 구조**:
  ```
  <div class="bg-canvas min-h-screen">
    <AppSidebar />
    <div class="col flex-1">
      <PageTopBar
        title={`${company} · ${jobTitle}`}
        actions={<자동저장 상태 + 미리보기 + 내보내기 + 완성하기 버튼>}
      />
      <div class="grid grid-cols-[1fr_320px] gap-4 p-6">
        <div class="col gap-4">    ← 에디터 영역
          ← 문항 탭 스위처
          <div class="doc-paper">
            <p class="doc-question">{activeQuestion.question}</p>
            <p class="doc-paragraph">{activeQuestion.answer || '여기에 내용을 작성하세요...'}</p>
            <div class="doc-suggest">  ← AI 제안 블록
              <p class="caption">AI 제안</p>
              <p class="body">{aiSuggestion}</p>
              <div class="row gap-2">
                <button class="btn btn-primary btn-sm">적용</button>
                <button class="btn btn-ghost btn-sm">무시</button>
            <div class="row-between caption">  ← 하단 지표 바
              <span>{charCount} / {maxLength}자</span>
              <span>매칭률 {score}%</span>
        <AiChatbot />              ← 우측 사이드 패널
  ```
- **문항 탭 상태**:
  ```typescript
  type QuestionStatus = '작성중' | '초안' | '미작성';
  // answer.length > 0 → '초안', answer.length >= maxLength * 0.8 → '작성중', 그 외 → '미작성'
  ```

---

### 저장된 자기소개서 목록 페이지

- **파일**: `app/cover-letters/page.tsx`
- **'use client'**: 불필요 (서버 컴포넌트)
- **역할**: 저장된 모든 자소서를 2열 카드 그리드로 표시. 정렬/필터 버튼(현 단계 UI만), 신규 작성 버튼.
- **데이터 흐름**:
  ```typescript
  const coverLetters = getMockCoverLetters();
  ```
- **레이아웃 구조**:
  ```
  <div class="bg-canvas min-h-screen">
    <AppSidebar />
    <main class="col gap-6 p-8">
      <PageTopBar
        title={`${coverLetters.length}개의 자기소개서를 관리 중이에요`}
        actions={<정렬 + 필터 + 새 자소서 작성 버튼>}
      />
      <div class="grid-2">
        {coverLetters.map(cl => <CoverLetterCard key={cl.id} coverLetter={cl} />)}
      ← 빈 상태: coverLetters.length === 0이면 EmptyState UI
  ```
- **빈 상태 UI**: "아직 작성한 자기소개서가 없어요" + "/cover-letters/new" 링크 버튼

---

## 테스트 케이스 (Vitest + React Testing Library)

### Icon.test.tsx

| #   | 테스트명                             | Given                        | When   | Then                      |
| --- | ------------------------------------ | ---------------------------- | ------ | ------------------------- |
| 1   | 지정한 name의 SVG를 렌더링한다       | `name="sparkles"`            | 마운트 | `<svg>` 요소가 DOM에 존재 |
| 2   | 기본 size 20이 적용된다              | `name="check"`               | 마운트 | `width="20" height="20"`  |
| 3   | 커스텀 size가 적용된다               | `name="check" size={32}`     | 마운트 | `width="32" height="32"`  |
| 4   | className prop이 SVG 요소에 전달된다 | `className="text-green-300"` | 마운트 | SVG에 해당 클래스 포함    |

### ScoreRing.test.tsx

| #   | 테스트명                  | Given                   | When   | Then                           |
| --- | ------------------------- | ----------------------- | ------ | ------------------------------ |
| 5   | 점수 숫자가 렌더링된다    | `value={91}`            | 마운트 | "91" 텍스트가 보임             |
| 6   | 0점도 올바르게 렌더링된다 | `value={0}`             | 마운트 | "0" 텍스트가 보임              |
| 7   | 기본 size 80이 적용된다   | `value={50}`            | 마운트 | SVG `width="80" height="80"`   |
| 8   | 커스텀 size가 적용된다    | `value={50} size={120}` | 마운트 | SVG `width="120" height="120"` |

### AppSidebar.test.tsx

| #   | 테스트명                                 | Given                 | When     | Then                                                    |
| --- | ---------------------------------------- | --------------------- | -------- | ------------------------------------------------------- |
| 9   | 네비게이션 항목 4개가 렌더링된다         | 기본 렌더링           | 마운트   | `role="navigation"` 내 링크 4개                         |
| 10  | 현재 경로의 링크가 aria-current를 갖는다 | pathname="/dashboard" | 마운트   | `/dashboard` 링크에 `aria-current="page"`               |
| 11  | 각 링크가 올바른 href를 갖는다           | 기본 렌더링           | DOM 조회 | `/dashboard`, `/experiences`, `/jobs`, `/cover-letters` |

### PageTopBar.test.tsx

| #   | 테스트명                                | Given                                 | When   | Then                                |
| --- | --------------------------------------- | ------------------------------------- | ------ | ----------------------------------- |
| 12  | title이 렌더링된다                      | `title="경험 매칭"`                   | 마운트 | "경험 매칭" 텍스트가 보임           |
| 13  | breadcrumb 항목들이 순서대로 렌더링된다 | `breadcrumb={['카카오', '매칭']}`     | 마운트 | "카카오", "매칭" 텍스트가 모두 보임 |
| 14  | actions 슬롯이 렌더링된다               | `actions={<button>내보내기</button>}` | 마운트 | "내보내기" 버튼이 보임              |
| 15  | breadcrumb 없이도 title만 표시된다      | `title="자소서 목록"` breadcrumb 없음 | 마운트 | "자소서 목록" 보임, 오류 없음       |

### MatchResultCard.test.tsx

| #   | 테스트명                                                 | Given                                     | When      | Then                                      |
| --- | -------------------------------------------------------- | ----------------------------------------- | --------- | ----------------------------------------- |
| 16  | 문항 텍스트가 렌더링된다                                 | `question.text="지원 동기..."`            | 마운트    | 해당 텍스트가 보임                        |
| 17  | ScoreRing에 score가 전달된다                             | `match.score=91`                          | 마운트    | "91" 숫자가 보임                          |
| 18  | AI 추천 이유가 렌더링된다                                | `match.reason="프로젝트 경험이..."`       | 마운트    | 해당 텍스트가 보임                        |
| 19  | 키워드 칩이 렌더링된다                                   | `match.keywords=["AI", "Next.js"]`        | 마운트    | "AI", "Next.js" 텍스트가 보임             |
| 20  | "다른 경험으로" 클릭 시 selectedExpId가 변경된다         | primary="exp-1" matched=["exp-1","exp-2"] | 버튼 클릭 | 화면에 exp-2 경험 제목이 표시됨           |
| 21  | "이 조합으로 작성" 클릭 시 onSelectExperience가 호출된다 | `onSelectExperience` 모킹                 | 버튼 클릭 | 콜백이 (qId, selectedExpId) 인자로 호출됨 |

### CoverLetterCard.test.tsx

| #   | 테스트명                                   | Given                          | When           | Then                                   |
| --- | ------------------------------------------ | ------------------------------ | -------------- | -------------------------------------- |
| 22  | 회사명과 직무명이 렌더링된다               | `coverLetter.company="카카오"` | 마운트         | "카카오" 텍스트 보임                   |
| 23  | 진행률이 계산되어 표시된다                 | 문항 2개 중 1개 answer 있음    | 마운트         | "50%" 또는 진행률 UI 표시              |
| 24  | 100% 완성 시 "완성" 배지가 표시된다        | 모든 문항 answer 있음          | 마운트         | "완성" 텍스트가 보임                   |
| 25  | 미완성 시 "작성중" 배지가 표시된다         | answer가 하나도 없음           | 마운트         | "작성중" 텍스트가 보임                 |
| 26  | 카드 본체가 편집 페이지 링크를 갖는다      | `coverLetter.id="cl-1"`        | DOM 조회       | 링크 href가 `/cover-letters/cl-1/edit` |
| 27  | onDelete 콜백이 삭제 버튼 클릭 시 호출된다 | `onDelete` 모킹                | 삭제 버튼 클릭 | 콜백이 `"cl-1"`을 인자로 호출됨        |
| 28  | onCopy 콜백이 복사 버튼 클릭 시 호출된다   | `onCopy` 모킹                  | 복사 버튼 클릭 | 콜백이 `"cl-1"`을 인자로 호출됨        |

### AiChatbot.test.tsx

| #   | 테스트명                                              | Given                                      | When   | Then                                               |
| --- | ----------------------------------------------------- | ------------------------------------------ | ------ | -------------------------------------------------- |
| 29  | 기본 Mock 메시지들이 렌더링된다                       | messages 없이 기본값                       | 마운트 | MOCK_CHAT_MESSAGES의 첫 번째 content 텍스트가 보임 |
| 30  | 커스텀 messages가 렌더링된다                          | `messages=[{role:'ai', content:'테스트'}]` | 마운트 | "테스트" 텍스트가 보임                             |
| 31  | isThinking=true이면 AI 타이핑 인디케이터가 렌더링된다 | `isThinking=true`                          | 마운트 | `.ai-thinking` 클래스 요소가 DOM에 존재            |

테스트 수: **31개**

---

## Storybook 스토리 (CSF3)

### Icon.stories.tsx

| 스토리명   | args 핵심값                                 | 설명                    |
| ---------- | ------------------------------------------- | ----------------------- |
| Default    | `name="sparkles"`                           | 기본 스파클 아이콘      |
| AllIcons   | 각 IconName을 그리드로 렌더링               | 전체 아이콘 팔레트 확인 |
| CustomSize | `name="check" size={32}`                    | 큰 사이즈               |
| WithColor  | `name="refresh" className="text-green-300"` | 색상 커스터마이징       |

### ScoreRing.stories.tsx

| 스토리명 | args 핵심값             | 설명                 |
| -------- | ----------------------- | -------------------- |
| High     | `value={91}`            | 80 이상, 그린 색상   |
| Mid      | `value={72}`            | 60–79, 앰버 색상     |
| Low      | `value={45}`            | 60 미만, 비활성 색상 |
| Zero     | `value={0}`             | 0점                  |
| Large    | `value={88} size={120}` | 큰 사이즈            |

### AppSidebar.stories.tsx

| 스토리명           | args 핵심값                         | 설명                     |
| ------------------ | ----------------------------------- | ------------------------ |
| Default            | 기본 (pathname mocking 없음)        | 활성 항목 없는 기본 상태 |
| ActiveDashboard    | `pathname="/dashboard"` mocking     | 대시보드 활성            |
| ActiveCoverLetters | `pathname="/cover-letters"` mocking | 자소서 활성              |

### PageTopBar.stories.tsx

| 스토리명       | args 핵심값                                     | 설명                    |
| -------------- | ----------------------------------------------- | ----------------------- |
| TitleOnly      | `title="자기소개서 목록"`                       | 타이틀만                |
| WithBreadcrumb | `breadcrumb={['카카오', '프론트엔드', '매칭']}` | breadcrumb 포함         |
| WithActions    | `actions={<button>내보내기</button>}`           | 우측 버튼 슬롯          |
| FullEditor     | title + breadcrumb + 여러 actions 버튼          | 에디터 페이지 전체 상태 |

### MatchResultCard.stories.tsx

| 스토리명         | args 핵심값                               | 설명                |
| ---------------- | ----------------------------------------- | ------------------- |
| HighScore        | `match.score=91`                          | 91점 매칭           |
| MidScore         | `match.score=72`                          | 72점 매칭           |
| SingleExperience | `match.matched=['exp-1']`                 | 대안 경험 없는 경우 |
| MultipleAlts     | `match.matched=['exp-1','exp-2','exp-3']` | 대안 경험 여러 개   |

### CoverLetterCard.stories.tsx

| 스토리명    | args 핵심값           | 설명                    |
| ----------- | --------------------- | ----------------------- |
| Complete    | 모든 문항 answer 있음 | 완성 상태, 100% 진행률  |
| InProgress  | 일부 문항 answer 있음 | 작성중 상태, 50% 진행률 |
| NotStarted  | 모든 문항 answer 없음 | 미작성 상태, 0% 진행률  |
| NoQuestions | `questions=[]`        | 문항 없는 자소서        |

### AiChatbot.stories.tsx

| 스토리명  | args 핵심값       | 설명                  |
| --------- | ----------------- | --------------------- |
| Default   | messages 기본값   | Mock 메시지 표시      |
| Thinking  | `isThinking=true` | AI 타이핑 애니메이션  |
| EmptyChat | `messages=[]`     | 메시지 없는 초기 상태 |
| UserHeavy | user 메시지 다수  | 대화가 많은 상태      |

---

## 구현 순서

1. `types/matching.ts` — 신규 타입 정의
2. `types/job.ts` — `JobPosting`에 `questions?: JobQuestion[]` 추가
3. `app/globals.css` — CSS 변수 및 유틸 클래스 추가
4. `lib/mock/matching.mock.ts` — 신규 Mock 데이터 및 getter
5. `lib/mock/job.mock.ts` — `questions` 필드 추가
6. `lib/mock/cover-letter.mock.ts` — 4개 항목으로 확장
7. `components/ui/Icon/Icon.tsx` — SVG 인라인 아이콘 컴포넌트
8. `components/ui/Icon/Icon.test.tsx` — 테스트 (4개)
9. `components/ui/Icon/Icon.stories.tsx` — 스토리 (4개)
10. `components/ui/Icon/index.ts` — barrel export
11. `components/ui/ScoreRing/ScoreRing.tsx` — SVG 원형 점수 컴포넌트
12. `components/ui/ScoreRing/ScoreRing.test.tsx` — 테스트 (4개)
13. `components/ui/ScoreRing/ScoreRing.stories.tsx` — 스토리 (5개)
14. `components/ui/ScoreRing/index.ts` — barrel export
15. `components/ui/PageTopBar/PageTopBar.tsx` — 페이지 상단 바
16. `components/ui/PageTopBar/PageTopBar.test.tsx` — 테스트 (4개)
17. `components/ui/PageTopBar/PageTopBar.stories.tsx` — 스토리 (4개)
18. `components/ui/PageTopBar/index.ts` — barrel export
19. `components/ui/AppSidebar/AppSidebar.tsx` — 사이드바 ('use client')
20. `components/ui/AppSidebar/AppSidebar.test.tsx` — 테스트 (3개)
21. `components/ui/AppSidebar/AppSidebar.stories.tsx` — 스토리 (3개)
22. `components/ui/AppSidebar/index.ts` — barrel export
23. `components/ui/index.ts` — Icon, ScoreRing, PageTopBar, AppSidebar export 추가
24. `components/matching/MatchResultCard/MatchResultCard.tsx` — 매칭 카드 ('use client')
25. `components/matching/MatchResultCard/MatchResultCard.test.tsx` — 테스트 (6개)
26. `components/matching/MatchResultCard/MatchResultCard.stories.tsx` — 스토리 (4개)
27. `components/matching/MatchResultCard/index.ts` — barrel export
28. `components/matching/index.ts` — 신규 barrel export
29. `components/cover-letter/CoverLetterCard/CoverLetterCard.tsx` — 자소서 카드
30. `components/cover-letter/CoverLetterCard/CoverLetterCard.test.tsx` — 테스트 (7개)
31. `components/cover-letter/CoverLetterCard/CoverLetterCard.stories.tsx` — 스토리 (4개)
32. `components/cover-letter/CoverLetterCard/index.ts` — barrel export
33. `components/cover-letter/AiChatbot/AiChatbot.tsx` — 정적 챗봇 패널
34. `components/cover-letter/AiChatbot/AiChatbot.test.tsx` — 테스트 (3개)
35. `components/cover-letter/AiChatbot/AiChatbot.stories.tsx` — 스토리 (4개)
36. `components/cover-letter/AiChatbot/index.ts` — barrel export
37. `components/cover-letter/index.ts` — 신규 barrel export
38. `app/jobs/[id]/matching/page.tsx` — 경험 매칭 추천 페이지
39. `app/cover-letters/page.tsx` — 자소서 목록 페이지
40. `app/cover-letters/[id]/edit/page.tsx` — 자소서 에디터 페이지

---

## 완료 기준

- [ ] 모든 Props가 TypeScript strict 모드로 정의됨 (`any` 사용 금지)
- [ ] `JobPosting`에 `questions?: JobQuestion[]` 필드 추가됨
- [ ] `types/matching.ts`에 `JobQuestion`, `QuestionMatch` 타입이 정의됨
- [ ] `app/globals.css`에 `.card`, `.btn`, `.chip`, `.doc-*`, `.ai-thinking` 유틸 클래스 추가됨
- [ ] 3개 페이지 모두 서버 컴포넌트 유지 (`'use client'` 없음)
- [ ] `AppSidebar`, `MatchResultCard`만 `'use client'` 사용
- [ ] Lucide React 미설치 — 모든 아이콘은 SVG 인라인으로 구현
- [ ] `AiChatbot`은 정적 UI만 구현 (인터랙션 없음)
- [ ] `CoverLetterCard`의 진행률이 `questions` 배열에서 동적으로 계산됨
- [ ] `ScoreRing`의 점수 색상이 구간(80+/60-79/60미만)에 따라 분기됨
- [ ] Mock 데이터가 4개의 `CoverLetter`와 3개의 `QuestionMatch`를 포함함
- [ ] 테스트 케이스 31개가 사용자 시나리오를 커버함
- [ ] Storybook에서 모든 상태(기본·완성·미작성·빈 상태·AI 타이핑)를 확인 가능함
- [ ] `@/` alias를 사용하고 폴더 외 상대경로 없음
- [ ] `pnpm type-check` 통과
- [ ] `pnpm lint` 통과
