# Feature Specs

`/feature` 커맨드가 생성하는 기능 스펙 문서들이 이 디렉토리에 저장됩니다.

## 워크플로우

```
/feature 경험 입력 폼
    │
    ▼
Phase 1: feature-planner 에이전트
    → experience-form-spec.md 생성
    → 사용자 승인 대기
    │
    ▼ (승인)
Phase 2: feature-implementer 에이전트
    → src/components/experience/ExperienceForm.tsx
    → src/components/experience/ExperienceForm.test.tsx
    → src/components/experience/ExperienceForm.stories.tsx
    │
    ▼
Phase 3: feature-verifier 에이전트
    → TypeScript / ESLint / 테스트 검증
    → 검증 리포트 반환
```

## 스펙 파일 네이밍

```
{feature-kebab-case}-spec.md

예시:
  experience-form-spec.md
  job-posting-card-spec.md
  cover-letter-editor-spec.md
  saved-documents-list-spec.md
```

## 추후 설치 예정 도구

| 도구      | 설치 명령                                                             | 용도            |
| --------- | --------------------------------------------------------------------- | --------------- |
| Vitest    | `pnpm add -D vitest @testing-library/react @testing-library/jest-dom` | 테스트 실행     |
| Storybook | `pnpm dlx storybook@latest init`                                      | 컴포넌트 문서화 |

테스트·스토리 파일은 도구 설치 전에도 미리 작성해 둡니다.
