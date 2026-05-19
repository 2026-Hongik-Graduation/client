# Issue 생성 커맨드

현재 컨텍스트를 분석하여 GitHub 이슈를 생성하고, 컨벤션에 맞는 브랜치를 만들어 작업 준비 상태로 만드는 명령어입니다.

## 사용법

```
/issue [타입] [제목 또는 설명]
```

**예시:**
```
/issue feat 사용자 로그인 구현
/issue fix 메인 페이지 레이아웃 깨짐
/issue
```

인자 없이 실행하면 현재 대화 컨텍스트에서 작업 내용을 자동으로 추론합니다.

---

## 동작 과정 (3단계)

### Phase 1 - 분석 및 계획 수립

1. **타입 결정**: 인자로 타입이 주어지면 사용하고, 없으면 컨텍스트에서 추론합니다.
2. **이슈 내용 초안 작성**: 타입에 맞는 템플릿을 채웁니다.
3. **브랜치명 결정**: 이슈 생성 후 받을 번호를 예측하여 컨벤션에 맞는 브랜치명을 제안합니다.
4. **계획표 출력 후 승인 대기**: 이슈 내용과 브랜치명을 보여주고 사용자 확인을 받습니다.

### Phase 2 - 이슈 생성

5. **gh issue create 실행**: 승인된 내용으로 이슈를 생성합니다.
6. **이슈 번호 추출**: 생성된 이슈 URL에서 번호를 파싱합니다.

### Phase 3 - 브랜치 생성 및 체크아웃

7. **브랜치 생성**: `{type}/{이슈번호}-{kebab-case-설명}` 형식으로 브랜치를 만듭니다.
8. **develop 기준 브랜치 생성**: `git checkout -b` 실행 시 `develop`을 base로 합니다.
9. **결과 출력**: 이슈 URL과 브랜치명을 출력합니다.

---

## 이슈 타입 분류

| 타입 | PR 제목 prefix | 설명 | 사용 템플릿 |
|------|---------------|------|------------|
| `feat` | `[FEAT]` | 새로운 기능 구현 | feature_request |
| `fix` | `[FIX]` | 버그 수정 | bug_report |
| `refactor` | `[REFACTOR]` | 코드 리팩토링 | feature_request |
| `design` | `[DESIGN]` | UI/UX 수정 | feature_request |
| `docs` | `[DOCS]` | 문서 작업 | feature_request |
| `test` | `[TEST]` | 테스트 코드 작업 | feature_request |
| `chore` | `[CHORE]` | 설정/빌드 작업 | feature_request |
| `ci` | `[CI]` | CI/CD 작업 | feature_request |
| `perf` | `[PERF]` | 성능 개선 | feature_request |

---

## 이슈 템플릿

### Feature Request 템플릿 (feat / refactor / design / docs / test / chore / ci / perf)

```
### 🛠️ 만들고자 한 기능 설명

{작업 목적과 내용을 2-3문장으로 서술}

### ✅ TODO LIST

- [ ] {세부 작업 1}
- [ ] {세부 작업 2}
- [ ] {세부 작업 3}

### ⏰ 예상 작업 기간

{컨텍스트 기반 예상 기간, 모르면 "-" 로 표기}

### 📝 참고 링크(선택)

### 🗣️ ETC(선택)

### 📸 피그마 스크린샷
```

### Bug Report 템플릿 (fix)

```
## 어떤 버그인가요?

{버그를 간결하게 설명}

## 어떤 상황에서 발생한 버그인가요?

- **Given**: {사전 조건}
- **When**: {어떤 행동을 했을 때}
- **Then**: {어떤 문제가 발생했는지}

## 예상 결과

{정상적으로 동작했어야 할 결과}

## 참고자료

{관련 스크린샷, 에러 로그 등 — 없으면 생략}
```

---

## 브랜치 네이밍 컨벤션

```
{type}/{이슈번호}-{kebab-case-설명}
```

**규칙:**
- `type`: 이슈 타입과 동일 (feat, fix, refactor, design, docs, test, chore, ci, perf)
- `이슈번호`: 생성된 GitHub 이슈 번호
- `설명`: 이슈 제목을 영어 소문자 kebab-case로 변환 (한국어는 의미를 영어로 번역)
- 최대 50자를 넘지 않도록 축약

**예시:**
```
feat/5-user-login
fix/7-main-layout-broken
refactor/12-auth-hook-cleanup
design/9-button-component-redesign
```

---

## 계획표 출력 형식

```
## 이슈 생성 계획

**타입**: feat
**제목**: [FEAT] 사용자 로그인 구현
**라벨**: ✨ Feature
**Assignee**: @{현재 git user}

### 이슈 본문 미리보기
---
### 🛠️ 만들고자 한 기능 설명
JWT 기반 사용자 로그인/로그아웃 기능을 구현합니다.
...
---

**생성될 브랜치**: `feat/{번호}-user-login`
**Base 브랜치**: `develop`

계속 진행할까요?
```

---

## 실행 단계

1. `$ARGUMENTS`에서 타입과 설명을 파싱합니다. 없으면 현재 대화 컨텍스트에서 추론합니다.
2. 타입에 맞는 템플릿을 선택하고 컨텍스트 기반으로 내용을 채웁니다.
3. `git config user.name`으로 현재 작성자를 확인합니다.
4. 계획표를 출력하고 사용자 승인을 받습니다. 수정 요청 시 내용을 조정합니다.
5. 승인 후 `gh issue create`로 이슈를 생성합니다:
   ```bash
   gh issue create \
     --title "[TYPE] 제목" \
     --body "..." \
     --label "라벨명" \
     --assignee "@me"
   ```
6. 출력된 이슈 URL에서 번호를 추출합니다.
7. `git checkout -b {type}/{번호}-{description} origin/develop`으로 브랜치를 생성하고 체크아웃합니다.
8. 결과를 출력합니다:
   ```
   이슈 생성 완료: #{번호} — {제목}
      URL: https://github.com/.../issues/{번호}
   브랜치 생성 완료: {type}/{번호}-{description}
      이제 작업을 시작할 수 있습니다.
   ```

---

## 주의사항

- assignee는 항상 `@me` (현재 인증된 gh CLI 사용자)로 지정합니다.
- 브랜치 설명은 한국어 제목을 **영어**로 의미 번역하여 kebab-case로 만듭니다.
- `gh` CLI가 인증되어 있지 않으면 `gh auth login`을 먼저 실행하도록 안내합니다.
- 이미 같은 이름의 브랜치가 있으면 사용자에게 알리고 다른 이름을 제안합니다.
