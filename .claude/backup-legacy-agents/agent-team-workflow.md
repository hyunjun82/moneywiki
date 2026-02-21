# 에이전트 팀 워크플로우

> 버전: 1.0 (2026-02-15)
> 허브 1 + 스포크 4 → 검증 → 스포크 5 추가 → 반복

---

## 팀 구성

| 역할 | 에이전트 | 모델 | 파일 |
|------|---------|------|------|
| 스포크 작성자 x5 | hyunjun-writer | Sonnet 4.5 | `.claude/agents/hyunjun-writer.md` |
| 허브 작성자 x1 | hyunjun-hub-writer | Sonnet 4.5 | `.claude/agents/hyunjun-hub-writer.md` |
| 품질 검증자 | hyunjun-quality | Sonnet 4.5 | `.claude/agents/hyunjun-quality.md` |
| 오차 검증자 | hyunjun-accuracy | Sonnet 4.5 | `.claude/agents/hyunjun-accuracy.md` |
| SEO 검증자 | hyunjun-seo | Sonnet 4.5 | `.claude/agents/hyunjun-seo.md` |
| 끝판왕 CCTV | hyunjun-cctv | Sonnet 4.5 | `.claude/agents/hyunjun-cctv.md` |

> writer는 spawn 시 이름에 번호를 붙여 구분: `hyunjun-writer-01`, `hyunjun-writer-02`, ...

---

## 배치 워크플로우 (1사이클 = 허브 1 + 스포크 ~10)

### Phase 1: 허브 + 첫 스포크 4개 (동시 작성)

```
리드:
  1. 키워드 목록에서 허브 1개 + 스포크 10개 선정
  2. 팀원 spawn:
     - hyunjun-hub-writer → 허브 1개 작성
     - hyunjun-writer-01 → 스포크 1
     - hyunjun-writer-02 → 스포크 2
     - hyunjun-writer-03 → 스포크 3
     - hyunjun-writer-04 → 스포크 4
  3. 5명 동시 작성 시작
```

### Phase 2: 1차 검증 (3명 검증자 동시)

```
허브 + 스포크 4개 작성 완료 후:
  1. hyunjun-quality → 5개 파일 문체/컴플라이언스/UX 검수
  2. hyunjun-accuracy → 5개 파일 숫자/출처 검증 (WebFetch)
  3. hyunjun-seo → 5개 파일 타이틀/PAA/스키마 검증
  → 3명 동시 실행 (각자 담당 관점)
  → FAIL 항목은 직접 Edit로 수정
```

### Phase 3: 추가 스포크 5개 (동시 작성)

```
1차 검증 통과 후:
  1. hyunjun-writer-01 → 스포크 5
  2. hyunjun-writer-02 → 스포크 6
  3. hyunjun-writer-03 → 스포크 7
  4. hyunjun-writer-04 → 스포크 8
  5. 새 writer spawn (또는 기존 재사용) → 스포크 9, 10
```

### Phase 4: 2차 검증

```
추가 5개 완료 후:
  → Phase 2와 동일 (3명 검증자 동시)
```

### Phase 5: CCTV 최종 검수 (분산 병렬!)

```
모든 검증 통과 후:
  1. 파일을 CCTV 인스턴스 수(3)로 균등 배분
     - 예: 10개 → CCTV-01(4개), CCTV-02(3개), CCTV-03(3개)
     - 예: 5개 → CCTV-01(2개), CCTV-02(2개), CCTV-03(1개)
     - 허브 파일은 스포크보다 검수 항목이 많으므로 별도 1개로 카운트
  2. 각 CCTV 인스턴스가 병렬 실행 (모두 Sonnet):
     - verify-spoke-quality.js 0 위반 확인
     - 빌드 테스트 (npx tsc --noEmit)
     - 고유성 검증 (형제 스포크 간 비교)
     - 문체/정확성/SEO 통합 최종 점검
  3. 각 인스턴스가 FAIL 발견 시 직접 Edit 수정
  → 3명 전부 PASS → Phase 6
  → FAIL 수정 불가 → 리드에게 보고

  ⚠ 1명에게 파일 5개 이상 주면 타임아웃 위험!
    → 반드시 2~3개씩 배분
```

### Phase 6: 등록 + 배포

```
CCTV PASS 후 (리드가 직접 실행):
  1. registry.ts에 import + 등록 (spoke + hub)
  2. git add + commit + push
  3. Vercel 빌드 확인
  4. 다음 사이클 시작
```

---

## 품질 관문 흐름도

```
Writer 작성
  ↓ (PostToolUse 훅: verify-spoke-quality.js 자동 실행)
  ↓ ERROR → Writer가 즉시 수정
  ↓
작성 완료
  ↓ (TaskCompleted 훅: task-complete-verify.js)
  ↓ ERROR → 완료 거부, 재작성
  ↓
검증자 3명 동시 검수
  ↓ quality: 문체/UX
  ↓ accuracy: 숫자/출처
  ↓ seo: 타이틀/PAA
  ↓ FAIL → 직접 Edit로 수정
  ↓
CCTV (Opus) 최종 검수
  ↓ 전체 관점 통합
  ↓ 고유성 검증
  ↓ 빌드 테스트
  ↓ FAIL → Writer에게 수정 요청
  ↓
리드: registry 등록 + commit + push
```

---

## 팀원 간 소통 규칙

| 상황 | 소통 방법 |
|------|----------|
| Writer가 형제 스포크 확인 | 직접 Glob/Read로 기존 파일 확인 |
| 검증자가 수정 필요 발견 | 직접 Edit로 수정 (간단) 또는 리드에게 보고 (복잡) |
| CCTV가 고유성 FAIL | 리드에게 보고 → 리드가 해당 Writer에게 수정 지시 |
| Writer끼리 겹치는 주제 | 리드가 사전에 키워드 할당으로 방지 |

---

## 리드 체크리스트 (매 사이클)

```
□ 키워드 중복 체크 (기존 spoke + hub 검색)
□ 허브-스포크 매핑 확인 (어떤 스포크가 어떤 허브에 속하는지)
□ Writer별 키워드 할당 (파일 충돌 방지)
□ 검증자 3명 → CCTV 순서 준수
□ registry.ts 등록 (리드만)
□ git commit + push (리드만)
□ 빌드 성공 확인
□ 다음 사이클 키워드 준비
```

---

## 에러 복구

| 상황 | 대응 |
|------|------|
| Writer가 멈춤/에러 | 리드가 셧다운 → 새 Writer spawn |
| 검증자가 수정 못 하는 에러 | 리드에게 보고 → 리드가 판단 |
| CCTV가 빌드 에러 발견 | CCTV가 직접 수정 시도 → 실패 시 리드 보고 |
| 전체 빌드 실패 | 리드가 에러 파악 → 해당 파일 수정/롤백 |
