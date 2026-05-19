# 랜딩 페이지 스펙

## 개요

Sprout · Career Studio의 첫 진입점인 랜딩/로그인 페이지를 구현한다. 취업준비생이 앱을 처음 접했을 때 브랜드 메시지를 전달하고, Google 계정으로 시작하는 단일 CTA(현재는 `/dashboard` 링크)를 제공한다. 동시에 전체 앱에서 공유할 디자인 토큰(CSS 커스텀 변수)을 `src/app/globals.css`에 정의하여 일관된 다크 테마 시각 언어를 확립한다.

---

## 컴포넌트 계층

```
src/
├── app/
│   ├── globals.css          ← 디자인 토큰 + Tailwind 베이스
│   └── page.tsx             ← 랜딩 페이지 (서버 컴포넌트)
└── components/
    └── ui/
        ├── LogoGlyph.tsx    ← 인라인 SVG 로고
        └── index.ts         ← barrel export
```

---

## 컴포넌트 상세

### LogoGlyph

- **파일**: `src/components/ui/LogoGlyph.tsx`
- **'use client'**: 불필요 (순수 SVG 렌더링, 상태 없음)
- **Props**:
  ```typescript
  interface LogoGlyphProps {
    size?: number; // 기본값: 26
    className?: string;
  }
  ```
- **로컬 State**: 없음
- **역할**: 브랜드 로고 아이콘을 인라인 SVG로 렌더링하는 최소 컴포넌트. 외부 이미지·아이콘 라이브러리 의존 없음.
- **SVG 명세**:
  - `viewBox="0 0 26 26"` (size prop으로 width/height 제어)
  - 새싹/씨앗 모티프: 아래쪽 원형 바닥(`circle`) + 위로 뻗는 곡선 줄기(`path`) + 왼쪽으로 난 잎사귀(`path`)
  - 색상: `currentColor` 사용 (부모의 `text-*` 클래스로 제어)
  - `aria-hidden="true"` 처리 (장식 요소)

### LandingPage (page.tsx)

- **파일**: `src/app/page.tsx`
- **'use client'**: 불필요 (정적 마크업 + `<Link>` 사용, 이벤트 핸들러 없음)
- **Props**: 없음 (Next.js App Router 페이지 컴포넌트)
- **로컬 State**: 없음
- **역할**: 전체 화면 다크 배경 위에 중앙 정렬된 로그인 카드를 렌더링한다. Google 로그인 버튼은 현재 `<Link href="/dashboard">` 로 연결.
- **레이아웃 구조**:
  ```
  <main>                          ← 전체 화면, 중앙 정렬 flex
    <div>                         ← 배경 글로우 (절대 배치, pointer-events-none)
    <div>                         ← 로그인 카드 (max-w-sm, 패딩, 테두리, 그림자)
      <LogoGlyph size={26} />     ← 브랜드 아이콘
      <p>                         ← eyebrow: "Sprout · Career Studio"
      <h1>                        ← 메인 헤드라인 (2줄)
        "경험을 기록하면"
        <span>자기소개서가 자라요</span>   ← 그라디언트 텍스트
      <p>                         ← 서브 설명 문구
      <Link>                      ← Google 계정으로 계속하기 버튼
      <p>                         ← 약관 동의 안내
      <hr />                      ← 구분선
      <p>                         ← "경험 데이터는 비공개 · 전체 무료"
  ```

---

## CSS 토큰 정의

`src/app/globals.css` 의 `:root` 블록에 추가할 커스텀 변수 전체 목록.

Tailwind CSS 4.x는 `@theme` 블록으로 토큰을 등록하지 않으면 `var()` 참조만으로 사용 불가. 따라서 **모든 토큰은 `@layer base { :root { … } }` 안에 정의**하고, Tailwind 유틸리티 클래스와 함께 `style` prop 없이 인라인 `var()` 로만 참조한다.

> CONVENTIONS.md §6 "인라인 스타일 금지" 규칙에 따라 CSS 변수는 Tailwind 임의값(arbitrary value) 문법 `[var(--token)]` 으로 사용하거나, 해당 토큰을 래핑하는 전용 유틸리티를 `globals.css`에 정의한다.

```css
/* src/app/globals.css */

@import 'tailwindcss';

@layer base {
  :root {
    /* ── 텍스트 계층 ── */
    --text-1: oklch(97% 0.005 240); /* 최고 밝기, 헤드라인 */
    --text-2: oklch(82% 0.01 240); /* 본문 */
    --text-3: oklch(62% 0.012 240); /* 보조 설명 */
    --text-4: oklch(45% 0.01 240); /* 비활성, 힌트 */

    /* ── 배경 ── */
    --bg-base: oklch(12% 0.015 255); /* 전체 배경 */
    --bg-card: oklch(16% 0.018 255); /* 카드 배경 */
    --bg-subtle: oklch(19% 0.016 255); /* 호버, 입력 배경 */

    /* ── 테두리 ── */
    --border-subtle: oklch(28% 0.02 255); /* 구분선 */
    --border-default: oklch(35% 0.022 255); /* 카드 테두리, 인풋 */

    /* ── 그린 팔레트 (브랜드 컬러) ── */
    --green-100: oklch(92% 0.08 155); /* 배경 틴트 */
    --green-200: oklch(78% 0.14 155); /* 아이콘, 배지 */
    --green-300: oklch(68% 0.18 155); /* 기본 강조 */
    --green-400: oklch(58% 0.21 155); /* 호버, 활성 */

    /* ── 그라디언트 ── */
    --grad-text: linear-gradient(
      105deg,
      var(--green-200) 0%,
      var(--green-100) 55%,
      oklch(88% 0.07 180) 100%
    );
    --grad-glow: radial-gradient(
      ellipse 60% 40% at 50% 0%,
      oklch(35% 0.1 155 / 0.25) 0%,
      transparent 70%
    );
    --grad-ai: linear-gradient(
      135deg,
      oklch(60% 0.18 280) 0%,
      var(--green-300) 50%,
      oklch(72% 0.15 170) 100%
    );

    /* ── 상태 색상 ── */
    --warn: oklch(75% 0.18 60); /* 주의/경고 (앰버 계열) */

    /* ── 공통 유틸 ── */
    --radius-card: 1rem; /* 16px */
    --radius-btn: 0.625rem; /* 10px */
    --shadow-card:
      0 4px 32px oklch(0% 0 0 / 0.35), 0 1px 4px oklch(0% 0 0 / 0.2);
  }
}
```

---

## Tailwind 클래스 매핑

원본 디자인 커스텀 클래스를 Tailwind CSS 4.x 유틸리티로 대체하는 매핑표.

| 원본 클래스     | 역할               | Tailwind 유틸리티 변환                                                                                                                                                         |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.screen`       | 전체 화면 래퍼     | `min-h-screen w-full relative overflow-hidden`                                                                                                                                 |
| `.app-bg`       | 글로우 배경        | `absolute inset-0 pointer-events-none` + `style` 대신 `bg-[var(--grad-glow)]` (arbitrary value)                                                                                |
| `.login-screen` | 중앙 정렬 컨테이너 | `relative z-10 flex min-h-screen items-center justify-center px-4 py-16`                                                                                                       |
| `.login-card`   | 카드 컨테이너      | `w-full max-w-sm flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-card)] p-8 shadow-[var(--shadow-card)]`                   |
| `.login-glyph`  | 로고 아이콘 래퍼   | `flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-subtle)] text-[var(--green-300)]`                                                                          |
| `.eyebrow`      | 앱 이름 소제목     | `text-xs font-semibold uppercase tracking-widest text-[var(--text-4)]`                                                                                                         |
| `h1`            | 헤드라인           | `text-2xl font-bold leading-snug text-[var(--text-1)]`                                                                                                                         |
| `.grad-text`    | 그라디언트 텍스트  | `bg-[var(--grad-text)] bg-clip-text text-transparent`                                                                                                                          |
| `p` (설명)      | 서브 설명          | `text-sm leading-relaxed text-[var(--text-3)]`                                                                                                                                 |
| `.google-btn`   | Google 로그인 버튼 | `flex w-full items-center justify-center gap-3 rounded-[var(--radius-btn)] bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition-opacity hover:opacity-90` |
| 약관 문구       | 캡션               | `text-center text-xs text-[var(--text-4)]`                                                                                                                                     |
| `.divider`      | 구분선             | `border-t border-[var(--border-subtle)]`                                                                                                                                       |
| 무료 문구       | 배지형 캡션        | `text-center text-xs text-[var(--text-4)]`                                                                                                                                     |

> **주의:** `bg-[var(--grad-glow)]`처럼 `background` 단축 속성에 그라디언트를 arbitrary value로 쓸 때, Tailwind 4.x는 `bg-[image:var(--grad-glow)]` 형태가 필요할 수 있다. 구현 시 빌드 결과를 확인하고 필요하면 `globals.css`에 직접 `.app-bg { background: var(--grad-glow); }` 유틸리티를 추가한다.

---

## Mock 데이터 타입

랜딩 페이지는 데이터 모델을 사용하지 않는다. 정적 마크업만으로 구성된다.

---

## 테스트 케이스 (Vitest + React Testing Library)

파일: `src/components/ui/LogoGlyph.test.tsx`

| #   | 테스트명                        | Given                             | When            | Then                            |
| --- | ------------------------------- | --------------------------------- | --------------- | ------------------------------- |
| 1   | 기본 size로 SVG를 렌더링한다    | size prop 없이 렌더링             | 컴포넌트 마운트 | `<svg>`의 width/height가 26임   |
| 2   | size prop이 반영된다            | `size={40}` 전달                  | 컴포넌트 마운트 | `<svg>`의 width/height가 40임   |
| 3   | className prop이 svg에 적용된다 | `className="text-green-400"` 전달 | 컴포넌트 마운트 | svg 요소에 해당 클래스가 존재함 |
| 4   | aria-hidden이 설정된다          | 기본 렌더링                       | 컴포넌트 마운트 | svg의 `aria-hidden="true"`      |

파일: `src/app/page.test.tsx`

| #   | 테스트명                                   | Given       | When            | Then                                                           |
| --- | ------------------------------------------ | ----------- | --------------- | -------------------------------------------------------------- |
| 5   | 헤드라인 텍스트가 렌더링된다               | 기본 렌더링 | 컴포넌트 마운트 | "경험을 기록하면" 텍스트가 화면에 보임                         |
| 6   | 그라디언트 텍스트 스팬이 렌더링된다        | 기본 렌더링 | 컴포넌트 마운트 | "자기소개서가 자라요" 텍스트가 화면에 보임                     |
| 7   | Google 로그인 링크가 /dashboard로 연결된다 | 기본 렌더링 | 링크 요소 조회  | `getByRole('link', { name: /google/i })`의 href가 `/dashboard` |
| 8   | 앱 이름 eyebrow가 표시된다                 | 기본 렌더링 | 컴포넌트 마운트 | "Sprout · Career Studio" 텍스트가 화면에 보임                  |
| 9   | 무료 이용 안내 문구가 표시된다             | 기본 렌더링 | 컴포넌트 마운트 | "전체 무료" 텍스트가 화면에 보임                               |

테스트 수: **9개**

---

## Storybook 스토리 (CSF3)

파일: `src/components/ui/LogoGlyph.stories.tsx`

| 스토리명 | args 핵심값                             | 설명                              |
| -------- | --------------------------------------- | --------------------------------- |
| Default  | `size={26}`                             | 기본 크기 (랜딩 페이지 사용 크기) |
| Large    | `size={48}`                             | 확대 표시 (시각 확인용)           |
| Colored  | `size={26}, className="text-green-400"` | 그린 브랜드 컬러 적용             |

파일: `src/app/page.stories.tsx` (또는 `src/components/ui/LandingPage.stories.tsx`)

> Next.js App Router의 `page.tsx`를 Storybook에서 직접 렌더링하려면 `@storybook/nextjs` 어댑터가 필요하다. 초기에는 페이지 내부 마크업을 `LandingCard` 컴포넌트로 분리하여 스토리를 작성하는 방식을 권장한다.

| 스토리명       | args 핵심값                                       | 설명                            |
| -------------- | ------------------------------------------------- | ------------------------------- |
| Default        | 없음 (정적)                                       | 기본 다크 배경 + 카드           |
| MobileViewport | `parameters.viewport.defaultViewport: 'iphone14'` | 모바일 너비에서의 카드 레이아웃 |

---

## 구현 순서

1. `src/app/globals.css` — 기존 파일에 디자인 토큰 CSS 변수 블록 추가 (`@layer base { :root { … } }`)
2. `src/components/ui/LogoGlyph.tsx` — 인라인 SVG 로고 컴포넌트 구현
3. `src/components/ui/LogoGlyph.test.tsx` — LogoGlyph 테스트 작성 (4개)
4. `src/components/ui/LogoGlyph.stories.tsx` — Storybook 스토리 작성 (3개)
5. `src/components/ui/index.ts` — barrel export 추가
6. `src/app/page.tsx` — 랜딩 페이지 구현 (서버 컴포넌트, `<Link>` 사용)
7. `src/app/page.test.tsx` — 랜딩 페이지 테스트 작성 (5개)

---

## 완료 기준

- [ ] 모든 Props가 TypeScript로 정의됨
- [ ] CSS 토큰 변수 전체가 `globals.css`에 정의됨
- [ ] `page.tsx`가 서버 컴포넌트로 유지됨 (`'use client'` 없음)
- [ ] Google 버튼이 `<Link href="/dashboard">` 로 동작함
- [ ] 외부 이미지·아이콘 라이브러리 의존 없음 (LogoGlyph 인라인 SVG)
- [ ] Tailwind CSS 임의값(arbitrary value) 문법으로 CSS 토큰 사용
- [ ] 인라인 스타일(`style` prop) 사용 없음
- [ ] 테스트 케이스 9개가 사용자 시나리오를 커버함
- [ ] Storybook에서 LogoGlyph의 3가지 상태 확인 가능
- [ ] `pnpm type-check` 통과
- [ ] `pnpm lint` 통과
