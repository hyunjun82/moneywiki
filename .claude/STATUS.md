# 머니위키 에이전트 팀 현황

> 업데이트: 2026-02-15
> 에이전트 팀 v1 세팅 완료

---

## 에이전트 파일 (.claude/agents/) — 6개

| 파일 | 역할 | 모델 | 비고 |
|------|------|------|------|
| `hyunjun-writer.md` | 스포크 TSX 작성 | Sonnet 4.5 | spawn 시 01~20 번호 부여 |
| `hyunjun-hub-writer.md` | 허브 TSX 작성 | Sonnet 4.5 | 허브 1개 전담 |
| `hyunjun-quality.md` | 문체/컴플라이언스/UX 검수 | Sonnet 4.5 | FAIL → 직접 Edit |
| `hyunjun-accuracy.md` | 숫자/출처/연도 검증 | Sonnet 4.5 | WebFetch로 공식사이트 대조 |
| `hyunjun-seo.md` | 타이틀/PAA/스키마 검증 | Sonnet 4.5 | description 황금공식 검증 |
| `hyunjun-cctv.md` | 끝판왕 통합 검증 | **Opus** | 전 관점 통합 + 빌드 테스트 |

---

## 훅 파일 (.claude/hooks/) — 4개

| 파일 | 트리거 | 역할 |
|------|--------|------|
| `verify-spoke-quality.js` | PostToolUse(Write) + CLI | 핵심 검증 엔진. stdin JSON 지원. ERROR → exit 2 |
| `task-complete-verify.js` | TaskCompleted | 태스크 완료 시 최근 파일 검증. ERROR → 완료 거부 |
| `teammate-idle-check.js` | TeammateIdle | idle 전환 시 미완 검증. ERROR → idle 거부 |
| `validate-keywords.js` | /keywords 명령어 | 키워드 중복/동의어/금지어 검증 |

---

## 참조 파일 (.claude/references/) — 핵심

| 파일 | 용도 |
|------|------|
| `spoke-template.md` | 스포크 구조 규칙 + 컴포넌트 선택 가이드 (v4) |
| `spoke-rules.md` | 스포크 문체/도입부/전환/고유성 규칙 |
| `hub-template.md` | 허브 구조 규칙 + 컴포넌트 선택 가이드 (v4) |
| `hub-rules.md` | 허브 작성 10개 규칙 |
| `writing-rules.md` | SEO 메타 + description 황금공식 + 스키마 |
| `checker-patterns.md` | 체커 5유형 (A~E) + RSC-Safe 패턴 |
| `moneywiki-template3358.md` | 위키 MD 글 템플릿 (서론/본문/시각요소/출처) |
| `agent-team-workflow.md` | 에이전트 팀 배치 워크플로우 (NEW) |
| `team-lead-prompt.md` | 팀 리드 프롬프트 템플릿 (NEW) |

---

## 슬래시 명령어 (.claude/commands/)

| 명령어 | 파일 | 역할 |
|--------|------|------|
| `/keywords [시드]` | `keywords.md` | 키워드 생성 → JSON 저장 → 에이전트 팀 연결 |

---

## settings.json 현재 상태

```json
{
  "permissions": {
    "allow": ["Write(/src/data/spoke/**)", "Write(/src/data/hub/**)", ...]
  },
  "hooks": {
    "TaskCompleted": [task-complete-verify.js],
    "TeammateIdle": [teammate-idle-check.js]
  },
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## 워크플로우 흐름

```
/keywords [시드키워드]
  ↓ JSON 저장 (.claude/data/keywords/[시드].json)
  ↓
"에이전트 팀 시작해줘"
  ↓
팀 리드가 JSON 읽기
  ↓
Phase 1: 허브 + 스포크 4개 동시 작성
  ↓ (PostToolUse 훅: verify-spoke-quality.js 자동 실행)
  ↓
Phase 2: 검증자 3명 동시 검수 (quality → accuracy → seo)
  ↓
Phase 3: CCTV (Opus) 최종 검수
  ↓
Phase 4: 리드가 registry 등록 + commit + push
  ↓
Phase 5: 남은 스포크 → Phase 1부터 반복
```

---

## 골든 예시

| 파일 | 용도 |
|------|------|
| `src/data/spoke/기초생활수급자-1인가구-생계급여-조건-소득인정액.tsx` | 스포크 정답 파일 (검증 훅 0 위반) |
| `src/data/hub/기초생활수급자-조건-총정리.tsx` | 허브 정답 파일 (검증 훅 0 위반) |

---

## 현재 콘텐츠 규모

- 스포크: `src/data/spoke/registry.ts` 등록 127개
- 허브: `src/data/hub/registry.ts` 등록 17개
- 위키 MD: `content/wiki/` 다수

---

## 삭제된 파일 (이번 세션)

- `.claude/agents/cluster-validator.md` — 구버전
- `.claude/agents/cluster-architect.md` — 구버전
- `.claude/agents/cluster-dispatcher.md` — 구버전
- `.claude/agents/quality.md` — 구버전
- `.claude/agents/deployer.md` — 구버전
- `.claude/hooks/post-write-verify.js` — 미사용
- `.claude/hooks/batch-verify.js` — 미사용
