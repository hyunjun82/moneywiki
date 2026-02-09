# /wiki-orchestra - 머니위키 완전 자동화

## 사용법 (이것만 기억하세요)

```
/wiki-orchestra [주제]
```

**예시:**
```
/wiki-orchestra 국가장학금
```

→ 끝. 나머지는 전부 자동.

---

## ⚡ 자동 수치 검증 시스템 (검토 에이전트)

**moneywiki-reviewer 에이전트**가 작성된 글을 검토하고 자동 수정합니다.

```
┌─────────────────────────────────────────────────────────┐
│  [Step 2] moneywiki-writer: 글 작성 + 저장              │
│           ↓                                              │
│  [Step 2.5] moneywiki-reviewer: 검토 에이전트 실행      │
│           ↓                                              │
│  1️⃣ verify-wiki-quality.js 실행 (구조 검증)             │
│  2️⃣ Critical Facts 대조 (등록된 수치)                   │
│  3️⃣ WebSearch로 최신 수치 확인 (미등록 수치도!)         │
│  4️⃣ 오류 발견 → Edit로 직접 수정                        │
│  5️⃣ 재검증 통과 확인                                    │
│           ↓                                              │
│  ✅ PASS → 다음 단계 / ❌ FAIL → 수정 반복               │
└─────────────────────────────────────────────────────────┘
```

**검토 에이전트 장점 (vs Hook):**
| 항목 | Hook | 검토 에이전트 |
|------|------|--------------|
| 작동 확실성 | 서브에이전트 버그 | ✅ 확실히 작동 |
| 검증 깊이 | 스크립트 1회 | 스크립트 + WebSearch + AI |
| 수정 능력 | 차단만 | ✅ 직접 Edit 수정 |
| 미등록 수치 | ❌ 못 잡음 | ✅ WebSearch로 확인 |

**예시:**
```
writer: "청년도약계좌 금리 6%" 작성
→ critical-facts.json에 없음
→ Hook: 통과 (모름)
→ reviewer: WebSearch "청년도약계좌 금리 2026" → 4.5% 확인 → Edit 수정 ✅
```

---

## 자동 실행 순서 (v3 - 병렬 에이전트!)

```
[0] 🔍 PAA 수집 (Playwright)
    Read: paa-collector.md
    → 구글 검색 → 관련 질문 V 클릭 20회
    → 40~100개 실제 사용자 질문 수집
    → 기존 wiki 중복 체크
    → Hub/Spoke 분류

[1] 키워드 추출기 실행
    Read: keywords.md (commands/)
    → PAA 기반 Hub/Spoke 구조 결정
    → 롱테일 타이틀 + 키워드 4개 + H2 4개 생성
    → 콜론(:) 금지, 32자 이내!

[2] 🚀 작가 병렬 실행 (moneywiki-writer x N)
    Read: moneywiki-template3358.md

    ⚡ 5개 이하: 순차 실행
    ⚡ 6개 이상: 2~3개씩 병렬 실행!

    ```
    # 병렬 실행 예시 (6개 글)
    Task(moneywiki-writer): "글1 작성" ─┐
    Task(moneywiki-writer): "글2 작성" ─┤ 동시 실행
    Task(moneywiki-writer): "글3 작성" ─┘
    → 완료 대기 →
    Task(moneywiki-writer): "글4 작성" ─┐
    Task(moneywiki-writer): "글5 작성" ─┤ 동시 실행
    Task(moneywiki-writer): "글6 작성" ─┘
    ```

    각 writer가 하는 일:
    → WebFetch (정부/공식 출처 우선!) → WebSearch (fallback)
    → 글 작성 + ctaCard + ext-btn
    → Write로 파일 저장

[2.5] 🔍 검토 에이전트 병렬 실행

    ⚡ 작성된 글도 2~3개씩 병렬 검토!

    ```
    Task(moneywiki-reviewer): "글1 검토" ─┐
    Task(moneywiki-reviewer): "글2 검토" ─┤ 동시 실행
    Task(moneywiki-reviewer): "글3 검토" ─┘
    ```

    검토 에이전트가 하는 일:
    0. keywords.md 읽기 (콜론 금지, 타이틀 규칙)
    1. verify-wiki-quality.js 실행 (구조 검증)
    2. Critical Facts 대조 (등록된 수치)
    3. 🚨 WebFetch 우선 → WebSearch fallback
    4. 오류 발견 → Edit로 직접 수정
    5. 재검증 통과 확인

    ✅ 모든 파일 PASS → Step 3 진행
    ❌ FAIL → 검토 에이전트가 자동 수정 후 재검증

[3] 16-Point 검증자 실행
    Read: CLAUDE.md (16-Point)
    → 스타일/구조 검증
    → 어색한 문장 자동 수정
    → PASS될 때까지 반복

[4] 배포자 실행
    → git add + commit + push
    → 완료 보고
```

---

## 🔄 에이전트 역할 분담

**Hooks 대신 검토 에이전트 사용** (더 강력하고 확실함!)

```
wiki-orchestra
   ↓
[Step 2] Task(moneywiki-writer) → 글 작성 + 저장
   ↓
[Step 2.5] Task(moneywiki-reviewer) → 검토 + WebSearch + 자동 수정
   ↓
[Step 3] 16-Point 검증
   ↓
[Step 4] 배포
```

**왜 검토 에이전트인가?**
- Hooks는 서브에이전트에서 버그 있음 (2024-02 확인)
- 검토 에이전트는 확실히 작동
- WebSearch로 미등록 수치도 확인 가능
- Edit로 직접 수정 가능 (차단만 하는 Hook보다 우수)

---

## 파일 구조

| 파일 | 역할 |
|------|------|
| `.claude/agents/moneywiki-writer.md` | 글 작성 에이전트 |
| `.claude/agents/moneywiki-reviewer.md` | **검토 에이전트 (NEW!)** |
| `.claude/scripts/verify-wiki-quality.js` | 구조 검증 스크립트 |
| `.claude/scripts/verify-wiki-facts.js` | 수치 검증 스크립트 |
| `.claude/scripts/collect-google-paa.js` | PAA 중복체크/분류 유틸 |
| `.claude/references/critical-facts.yaml` | 오류 패턴 DB |
| `.claude/settings.local.json` | Hooks 설정 (메인 에이전트용) |

---

## 에이전트가 읽는 파일

| 에이전트 | 읽는 파일 | 왜? |
|---------|----------|-----|
| **🔍 PAA 수집기** | `scripts/collect-google-paa.js` | Playwright PAA 수집 + 중복체크 |
| **키워드 추출기** | `commands/keywords.md` | 타이틀→키워드→H2 규칙 + 동의어 사전 |
| **작가** | `references/moneywiki-template3358.md` | 글 구조 + 서론 + ctaCard + ext-btn + 시각 요소 |
| **작가** | `agents/moneywiki-writer.md` | 워크플로우 (6단계) |
| **🔍 검토자** | `commands/keywords.md` | 타이틀 규칙 + 동의어 사전 |
| **🔍 검토자** | `references/moneywiki-template3358.md` | 템플릿 준수 확인 |
| **🔍 검토자** | `scripts/verify-wiki-quality.js` | 구조 검증 스크립트 |
| **🔍 검토자** | `references/critical-facts.yaml` | 등록된 오류 패턴 |
| **🔍 검토자** | WebFetch (우선!) → WebSearch (fallback) | 수치 확인 |
| **16-Point 검증자** | `CLAUDE.md` + `rules/wiki-rules.md` | 스타일/구조/출처 |

---

## 16-Point 자동 검증

### PASS 필수 (하나라도 FAIL → 자동 수정)

**Frontmatter:**
1. keywords 4개
2. summary 3줄
3. FAQ 2개
4. FAQ-H2 중복 없음
5. 출처 1개 이상
6. description 구어체 (~해요)

**본문:**
7. H2 개수 = keywords 개수
8. 모든 H2에 베이스 키워드 포함
9. 섹션당 4문장 이상
10. 내부링크 3개 이상
11. ## 출처 섹션 존재

**스타일:**
12. 구어체 (~이에요, ~해요)
13. 이모지 없음
14. 숫자 헤딩 없음 (## 1. 제목 금지)

**금지:**
15. 본문 FAQ 섹션 없음
16. 테이블 2개 이하

---

## 실행 예시

**입력:**
```
/wiki-orchestra 국가장학금
```

**출력 (자동 진행):**
```
[0/5] 🔍 PAA 수집 중... (Playwright)
      → 구글 검색: "국가장학금"
      → V 클릭 20회 → 42개 질문 수집
      → 기존 wiki 중복 체크: 5개 제외
      → 최종: 37개 고유 질문

[1/5] 키워드 추출 중...
      → Hub: 국가장학금 1차 2차 차이: 신청시기 언제가 유리할까
      → Spoke 5개: 성적기준, 2차신청, 소득구간, 탈락사유, 신입생

[2/5] 글 작성 중... (5개)
      → 국가장학금-1차-2차-차이.md ✓ (Hooks 통과)
      → 국가장학금-성적기준.md ✓ (Hooks 통과)
      → 국가장학금-2차-신청.md ✓ (Hooks 통과)
      → 국가장학금-소득구간-지원금액.md ✓ (Hooks 통과)
      → 국가장학금-탈락-사유.md ✓ (Hooks 통과)

[3/5] 검증 중...
      → 16-Point 체크: 5/5 PASS
      → 어색한 문장: 0건

[4/5] 배포 중...
      → git push 완료
      → commit: feat: 국가장학금 5개 글 추가

✅ 완료! 총 5개 글 발행됨 (실제 PAA 기반 롱테일 타이틀)
```

---

## 에러 시 자동 처리

| 에러 | 자동 처리 |
|------|----------|
| **수치 오류 (Hooks)** | Write 차단 → 오류 메시지 → 수정 후 재시도 |
| 검증 FAIL | 자동 수정 후 재검증 |
| 어색한 문장 | 자동 교정 |
| 내부링크 부족 | 자동 추가 |
| git conflict | pull --rebase 후 재시도 |

**재시도 3회 실패 시에만 사용자에게 보고**

---

## 수치 패턴 추가 방법

`.claude/references/critical-facts.json` 편집:

```json
{
  "wrongPatterns": [
    {
      "pattern": "정규식 패턴",
      "wrong": "틀린 표현",
      "correct": "정답",
      "severity": "critical"
    }
  ]
}
```

---

## 🔍 PAA 수집 시스템 (NEW!)

### 개요
- 구글 "관련 질문" V 버튼을 20회 클릭
- 4개 → 40~100개로 질문 확장
- 실제 사용자 검색 의도 기반 롱테일 키워드

### 수동 실행 (필요 시)
```
"5세대 실손보험 스포크 확장해줘"
"국민연금 PAA 수집해줘"
```

### PAA → 롱테일 타이틀 변환
| PAA 원본 | 롱테일 타이틀 |
|----------|--------------|
| "5세대 실손보험 보장은 어떻게 되나요?" | "5세대 실손보험 보장: 어떻게 되나요" |
| "국가장학금 성적 기준이 뭐예요?" | "국가장학금 성적 기준: 뭐예요" |

### 중복 체크
- 기존 wiki 파일의 title, keywords와 비교
- 80% 이상 유사 → 중복 제외
- `collect-google-paa.js`의 `checkDuplicates()` 함수 사용

### 문제 해결
| 증상 | 해결 |
|------|------|
| PAA 4개만 수집됨 | V 버튼 클릭 안 됨 → 셀렉터 확인 |
| 구글 캡차 발생 | 딜레이 600ms → 1000ms로 증가 |
| 관련 없는 질문 포함 | 베이스 키워드 필터링 강화 |

---

*마지막 업데이트: 2026-02-06*
*파일 참조 현행화 + 동의어 감지 + ctaCard 수정*
