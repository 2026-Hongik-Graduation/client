# 프로젝트 컨벤션

이 파일은 코드를 작성할 때 반드시 따라야 하는 프로젝트 전용 규칙입니다.
전역 규칙(`~/.claude/rules/`)과 충돌하면 이 파일이 우선합니다.

---

## 1. 컴포넌트 규칙

### 파일 구조

```
src/components/{domain}/
├── {ComponentName}.tsx         ← 컴포넌트 (기본 export)
├── {ComponentName}.test.tsx    ← 테스트 (같은 폴더)
├── {ComponentName}.stories.tsx ← Storybook 스토리 (같은 폴더)
└── index.ts                    ← barrel export
```

### 컴포넌트 파일 템플릿

```typescript
// 1. 'use client'는 인터랙션이 있을 때만 (useState, useEffect, 이벤트 핸들러)
'use client';

// 2. Props 인터페이스는 파일 상단에
interface ExperienceCardProps {
  experience: Experience;
  onEdit?: (id: string) => void;
}

// 3. 단일 named export, 화살표 함수
export const ExperienceCard = ({ experience, onEdit }: ExperienceCardProps) => {
  return (
    // 4. Tailwind CSS만 사용. 인라인 스타일 금지.
    <div className='rounded-lg border border-gray-200 p-4'>
      ...
    </div>
  );
}
```

### 'use client' 판단 기준

| 사용                                | 미사용               |
| ----------------------------------- | -------------------- |
| `useState`, `useEffect`             | 정적 UI              |
| 이벤트 핸들러 (`onClick` 등)        | 데이터만 표시        |
| `useRouter`, `useSearchParams`      | 서버에서 데이터 패칭 |
| 브라우저 API (`window`, `document`) |                      |

서버 컴포넌트가 기본. 필요한 최소 범위에만 적용.

---

## 2. 네이밍 규칙

| 대상            | 형식                      | 예시                       |
| --------------- | ------------------------- | -------------------------- |
| 컴포넌트 파일   | `PascalCase.tsx`          | `ExperienceCard.tsx`       |
| 페이지 파일     | Next.js 규칙 (`page.tsx`) | `app/experiences/page.tsx` |
| 훅 파일         | `camelCase.ts`            | `useExperiences.ts`        |
| 타입 파일       | `camelCase.ts`            | `experience.ts`            |
| Mock 파일       | `{도메인}.mock.ts`        | `experience.mock.ts`       |
| 유틸 파일       | `camelCase.ts`            | `formatDate.ts`            |
| 컴포넌트 함수   | `PascalCase`              | `ExperienceCard`           |
| 훅 함수         | `use` + PascalCase        | `useExperiences`           |
| 타입/인터페이스 | `PascalCase`              | `Experience`, `JobPosting` |
| 상수            | `UPPER_SNAKE_CASE`        | `MAX_QUESTION_LENGTH`      |
| boolean 변수    | `is/has/can` 접두사       | `isLoading`, `hasError`    |

---

## 3. 타입 정의 규칙

- 모든 도메인 타입은 `src/types/` 에 정의한다.
- 컴포넌트 내부에서만 쓰이는 Props 타입은 해당 컴포넌트 파일에 둔다.
- `any` 사용 금지. 불가피하면 `unknown` + 타입 가드 사용.

```typescript
// src/types/experience.ts — 도메인 타입 (API 스키마 기준)
export interface Experience { ... }

// 컴포넌트 내부 — UI 전용 타입 (export 불필요)
interface ExperienceCardProps {
  experience: Experience;
  variant?: 'compact' | 'full';
}
```

---

## 4. Mock 데이터 패턴

백엔드 연동 전 모든 데이터는 Mock으로 처리한다.

```
src/lib/mock/
├── experience.mock.ts
├── job.mock.ts
└── cover-letter.mock.ts
```

### Mock 파일 구조

```typescript
// src/lib/mock/experience.mock.ts
import type {Experience} from '@/types/experience';

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    experienceType: 'PROJECT',
    title: '졸업 프로젝트',
    // ...
  },
];
```

컴포넌트는 Mock인지 실제인지 모른다. 함수 시그니처를 동일하게 유지한다.

---

## 5. Import 경로 규칙

`tsconfig.json`의 `@/` alias를 사용한다. 상대경로는 같은 폴더 내에만 허용.

```typescript
// 올바른 예
import {Experience} from '@/types/experience';
import ExperienceCard from '@/components/experience/ExperienceCard';
import {getExperiences} from '@/lib/mock/experience.mock';

// 금지 (상대경로가 폴더를 벗어남)
import {Experience} from '../../types/experience';
```

---

## 6. 스타일링 규칙

- **Tailwind CSS만 사용**. CSS 파일, CSS Modules, 인라인 스타일 금지.
- 클래스 순서는 prettier-plugin-tailwindcss가 자동 정렬.
- 조건부 클래스는 배열 join 방식 사용 (추후 `clsx` + `tailwind-merge` 도입 예정).

```typescript
// 조건부 클래스
const buttonClass = [
  'rounded-md px-4 py-2 font-medium transition-colors',
  isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600',
].join(' ');
```

---

## 7. 테스트 패턴 (Vitest + React Testing Library)

> Vitest 미설치. 설치 명령: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom`
> 파일은 미리 작성해 두고, 설치 후 실행한다.

```typescript
// ExperienceCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExperienceCard from './ExperienceCard';
import { MOCK_EXPERIENCES } from '@/lib/mock/experience.mock';

describe('ExperienceCard', () => {
  it('경험 제목을 표시한다', () => {
    // Arrange
    const experience = MOCK_EXPERIENCES[0];

    // Act
    render(<ExperienceCard experience={experience} />);

    // Assert
    expect(screen.getByText(experience.title)).toBeInTheDocument();
  });
});
```

- `data-testid` 대신 접근성 역할(role), 텍스트, 레이블로 쿼리한다.
- 각 테스트는 독립적으로 실행 가능해야 한다.
- AAA 패턴(Arrange - Act - Assert)을 준수한다.

---

## 8. Storybook 패턴 (CSF3)

> Storybook 미설치. 설치 명령: `pnpm dlx storybook@latest init`
> 파일은 미리 작성해 두고, 설치 후 확인한다.

```typescript
// ExperienceCard.stories.tsx
import type {Meta, StoryObj} from '@storybook/react';
import ExperienceCard from './ExperienceCard';
import {MOCK_EXPERIENCES} from '@/lib/mock/experience.mock';

const meta: Meta<typeof ExperienceCard> = {
  title: 'Experience/ExperienceCard',
  component: ExperienceCard,
  parameters: {layout: 'centered'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExperienceCard>;

export const Default: Story = {
  args: {experience: MOCK_EXPERIENCES[0]},
};
```

- 스토리 파일은 컴포넌트와 같은 폴더에 둔다.
- 모든 Props 상태를 스토리로 커버한다 (기본, 로딩, 에러, 빈 상태).

---

## 9. Barrel Export 규칙

각 도메인 폴더에 `index.ts`를 두어 단일 진입점으로 사용한다.

```typescript
// src/components/experience/index.ts
export {default as ExperienceCard} from './ExperienceCard';
export {default as ExperienceForm} from './ExperienceForm';
export {default as ExperienceList} from './ExperienceList';

// 사용 측
import {ExperienceCard, ExperienceList} from '@/components/experience';
```
