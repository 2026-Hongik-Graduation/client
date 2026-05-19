# /feature — 기능 구현 오케스트레이터

Plan → Implement → Verify 3단계로 새 기능을 구현합니다.

## 사용법

```
/feature [기능명 또는 설명]
```

**예시:**

```
/feature 경험 입력 폼
/feature 채용공고 분석 결과 카드
/feature 자기소개서 문항 편집기
/feature
```

인자 없이 실행하면 현재 대화 컨텍스트에서 기능을 추론합니다.

---

## Phase 1 — Plan

`feature-planner` 에이전트를 실행하여 스펙 문서를 생성합니다.

```
입력: $ARGUMENTS (기능 설명)
출력: docs/specs/{feature}-spec.md
```

스펙 문서가 생성되면:

1. 생성된 스펙 내용을 사용자에게 보여줍니다.
2. **사용자 승인을 기다립니다.**
   - 수정 요청 → 스펙 파일을 수정하고 다시 보여줍니다.
   - 승인 → Phase 2로 진행합니다.
   - 취소 → 중단합니다.

---

## Phase 2 — Implement

`feature-implementer` 에이전트를 실행합니다.

```
입력: 승인된 스펙 파일 경로
출력: 컴포넌트 + 테스트 + Storybook 스토리 파일들
```

구현 완료 후 생성된 파일 목록을 사용자에게 보여줍니다.

---

## Phase 3 — Verify

`feature-verifier` 에이전트를 실행합니다.

```
입력: 구현된 파일 목록
출력: 검증 리포트
```

검증 결과에 따라:

- **CRITICAL/HIGH 이슈 있음** → `feature-implementer`로 수정 후 재검증 (최대 2회)
- **MEDIUM/LOW만 있음** → 사용자에게 알리고 완료 처리
- **모두 통과** → 완료

---

## 완료 출력

```
✅ /feature 완료: {기능명}

📄 스펙: docs/specs/{feature}-spec.md
📁 구현:
  - src/components/{domain}/{Component}.tsx
  - src/components/{domain}/{Component}.test.tsx
  - src/components/{domain}/{Component}.stories.tsx

🔍 검증: TypeScript ✅ | ESLint ✅ | 테스트 ⏭️ (Vitest 미설치)

다음 단계:
  /commit 으로 커밋하거나
  /issue 로 이슈를 연결하세요.
```

---

## 주의사항

- 테스트 파일은 Vitest 설치 전에도 코드를 작성해 둡니다. (`pnpm add -D vitest @testing-library/react` 후 실행 가능)
- Storybook 파일은 Storybook 설치 전에도 작성해 둡니다. (`pnpm dlx storybook@latest init` 후 확인 가능)
- 백엔드 없이 Mock 데이터로 동작하도록 구현합니다. API 연동은 추후 별도 작업으로 진행합니다.
