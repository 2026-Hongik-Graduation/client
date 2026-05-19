<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# 자기소개서 도우미 — 프로젝트 컨텍스트

## 앱 개요

취업 준비생이 경험을 구조화하고, 채용공고를 분석하여, 자기소개서를 AI와 함께 작성하는 웹앱.

**핵심 플로우:**

1. **경험 등록** — 프로젝트·인턴·활동 등을 STAR 형식으로 입력
2. **채용공고 분석** — 공고 텍스트 입력 → 직무 키워드·역량 추출
3. **경험 매칭** — 문항별로 적합한 경험을 AI가 추천
4. **자소서 편집** — AI 초안 생성 → 사용자 편집 → 저장

## 기술 스택

| 항목         | 버전   | 비고                             |
| ------------ | ------ | -------------------------------- |
| Next.js      | 16.2.6 | App Router (⚠️ 위 주의사항 필독) |
| React        | 19.2.4 |                                  |
| TypeScript   | 5.x    | strict 모드                      |
| Tailwind CSS | 4.x    |                                  |
| pnpm         | 10.x   | 패키지 매니저                    |
| Prettier     | 3.x    | prettier-plugin-tailwindcss 포함 |
| Husky        | 9.x    | pre-commit: lint-staged          |

## 디렉토리 구조 (목표)

```
src/
├── app/                          ← Next.js App Router 페이지
│   ├── experiences/
│   │   ├── page.tsx              ← 경험 목록
│   │   ├── new/page.tsx          ← 경험 입력 폼
│   │   └── [id]/edit/page.tsx    ← 경험 수정
│   ├── jobs/
│   │   └── new/page.tsx          ← 채용공고 입력
│   ├── cover-letters/
│   │   ├── page.tsx              ← 저장된 자소서 목록
│   │   ├── new/page.tsx          ← 자소서 작성 시작
│   │   └── [id]/page.tsx         ← 자소서 편집기
│   ├── layout.tsx
│   └── page.tsx                  ← 랜딩/대시보드
├── components/
│   ├── experience/               ← 경험 관련 컴포넌트
│   ├── job/                      ← 채용공고 관련 컴포넌트
│   ├── cover-letter/             ← 자소서 관련 컴포넌트
│   └── ui/                       ← 공통 UI (Button, Card 등)
├── types/
│   ├── experience.ts
│   ├── job.ts
│   └── cover-letter.ts
├── lib/
│   ├── mock/                     ← Mock 데이터 (백엔드 연동 전)
│   └── utils.ts
└── hooks/                        ← 공통 커스텀 훅
```

## 핵심 데이터 타입

```typescript
// src/types/experience.ts
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

// src/types/job.ts
export interface JobPosting {
  id: string;
  company: string;
  jobTitle: string;
  requiredSkills: string[];
  preferredSkills: string[];
  competencies: string[];
  rawText?: string;
}

// src/types/cover-letter.ts
export interface CoverLetter {
  id: string;
  jobPostingId: string;
  company: string;
  jobTitle: string;
  questions: CoverLetterQuestion[];
  createdAt: string; // ISO 8601
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

## 백엔드 연동 방침

- **현재**: `src/lib/mock/` 폴더에 Mock 데이터·Mock 함수로 동작
- **추후**: `src/lib/api/`에 API 클라이언트 추가 후 Mock을 실제 호출로 교체
- 컴포넌트는 Mock/실제 API를 구분하지 않는다 (인터페이스 동일하게 유지)

## 개발 워크플로우

| 커맨드                 | 역할                             |
| ---------------------- | -------------------------------- |
| `/feature [기능명]`    | Plan → Implement → Verify 자동화 |
| `/issue [타입] [제목]` | GitHub 이슈 생성 + 브랜치 생성   |
| `/commit`              | 변경사항 분석 → 기능별 커밋 분리 |
| `/pr`                  | Pull Request 메시지 자동 생성    |

## 스크립트

```bash
pnpm dev          # 개발 서버
pnpm build        # 프로덕션 빌드
pnpm type-check   # TypeScript 타입 검사
pnpm lint         # ESLint
pnpm lint:fix     # ESLint 자동 수정
pnpm format       # Prettier 전체 포맷
pnpm format:check # Prettier 검사 (CI용)
```
