# /keywords — 허브 & 스포크 키워드 생성기

## 사용법
```
/keywords [시드키워드]
/keywords [시드키워드] --count 10
```

---

## 실행 순서 (상향식 — 절대 규칙)

### Step 0: 사용자에게 개수 확인
"스포크 몇 개 만들까요? (기본 10개)" — 확인 없이 생성 금지.

### Step 1: 기존 글 중복 체크
```bash
grep -r "[시드키워드]" src/data/spoke/ src/data/hub/ content/wiki/
```
기존 글 있으면 → "⚠️ 수정" 표시. 없으면 → "✅ 신규".

### Step 2: 실제 검색 데이터 수집 (필수!)
```
WebSearch로 수집 (상상 키워드 절대 금지):
1. 구글 PAA (People Also Ask) — 최우선
2. 네이버 연관검색어
3. 생활법률 easylaw.go.kr H2/H3
4. 정부 사이트 FAQ (korea.kr, nts.go.kr 등)
```

### Step 3: 키워드 필터링
- 동의어 제거 (가입≈신청, 조건≈자격≈요건≈대상)
- 4개 다른 의도로 분류
- 최소 3단어, 권장 4~5단어 롱테일
- 정보형 2개 이하 + 행동형 2개 이상

### Step 4: 2x2 vs 1x4 판단
```
2x2: 동사 2개가 완전히 다른 행위일 때
  ✅ 신고 ≠ 납부, 신청 ≠ 만기
1x4: 동사가 동의어일 때
  → 하나의 동사 + 4개 다른 질문
```

### Step 5: 허브 분리 판단
```
스포크 ≤ 15: 허브 1개
스포크 16~20: 허브 1개 (최대)
스포크 21~30: 허브 2~3개
스포크 31+: 허브 3개+
```

### Step 6: 출력 (아래 형식 엄수)

---

## 출력 형식

### 허브
```
title: "[핵심 연관검색어 3개] — [추가 연관검색어 3개]"
slug: [슬러그]
keywords: [6~8개]
H2: 의도 카테고리 기반 (what/how much/when/risk/how)
description: (아래 규칙 참조)
category: [카테고리]
상태: ✅ 신규 | ⚠️ 수정
```

### 스포크
```
title: "[메인 롱테일] — [추가 롱테일 자연 배치]"
slug: [슬러그]
keyword 1: [4~5단어] → [의도] → ## [질문형 H2]
keyword 2: [4~5단어] → [의도] → ## [질문형 H2]
keyword 3: [4~5단어] → [의도] → ## [질문형 H2]
keyword 4: [4~5단어] → [의도] → ## [질문형 H2]
description: (아래 규칙 참조)
category: [카테고리]
상태: ✅ 신규 | ⚠️ 수정
visuals:
  S1: [시각A] + [시각B]
  S2: [시각C] + [시각D]
  S3: [시각E] + [시각F]
  S4: [시각G] + [시각H]
종류: 8종 / 연속: 없음
```

---

## Description 규칙

```
글자수: 100~150자 (구글 meta description 최대 155자)
키워드: 4개 중 최소 3개 자연 포함
구조: 2문장 (호기심 유발 + 해결 제시)
문체: ~요체 (이에요/해요/드려요)
```

### 패턴 (3가지 순환 — 같은 허브 내 중복 금지)

**패턴 A: 놀라움형**
```
"[구체적 사실]~라는 거 아시나요?
[키워드 3~4개 자연 배치]를 알려드려요"
```
예: "주택담보대출도 채무조정으로 경매를 유예할 수 있다는 거 아시나요?
원리금 감면 비율과 상환기간 연장 조건, 신청 방법을 알려드려요"

**패턴 B: 문제해결형**
```
"[독자 고민/상황] 고민이시죠?
[키워드 3~4개 자연 배치] 방법을 알려드려요"
```
예: "연체가 시작됐는데 어디서부터 해결해야 할지 고민이시죠?
신속채무조정 신청 조건부터 추심 중단, 이자 감면까지 알려드려요"

**패턴 C: 숫자형**
```
"[구체적 숫자/수치]~라는 사실, 알고 계셨나요?
[키워드 3~4개 자연 배치]를 정리해드려요"
```
예: "채무조정 신청비가 단 5만원이라는 사실, 알고 계셨나요?
개인워크아웃 신청 자격부터 채무감면 비율, 상환 조건을 정리해드려요"

### 패턴 배분
```
스포크 1~3: 패턴 A (놀라움)
스포크 4~6: 패턴 B (문제해결)
스포크 7~8: 패턴 C (숫자)
9개 이상: 순환 반복
```

### 금지
```
❌ "~에 대해 알아보겠습니다" (호기심 없음)
❌ "~총정리" "~완벽 가이드" (금지어)
❌ 키워드 나열 ("조건 방법 서류 비용 기간 정리")
❌ ~습니다/~합니다 (→ ~이에요/~해요/~드려요)
```

### 스포크 writer 지시
```
키워드 단계에서 생성된 description을 그대로 사용.
writer가 임의로 변경 금지.
frontmatter의 description 필드에 그대로 복사.
```

---

## 비주얼 배치 프리셋 (8개 스포크용)

에이전트는 아래 프리셋을 순서대로 사용. 임의 배치 금지.

| 스포크 | S1 | S2 | S3 | S4 |
|--------|----|----|----|----|
| 1 | CompareCards+RateBars | Table+TipBox | FormulaBox+Flow | Checklist+RateCards |
| 2 | Table+FormulaBox | RateBars+Checklist | CompareCards+TipBox | Timeline+Flow |
| 3 | FormulaBox+RateBars | WarnBox+CompareCards | Table+Flow | Checklist+Timeline |
| 4 | FormulaBox+Table | RateBars+CompareCards | StepCards+TipBox | Flow+Checklist |
| 5 | WarnBox+Table | CompareCards+FormulaBox | RateBars+Checklist | Timeline+RateCards |
| 6 | Timeline+CompareCards | FormulaBox+RateBars | Table+WarnBox | Checklist+TipBox |
| 7 | Table+RateBars | CompareCards+FormulaBox | Flow+Checklist | RateCards+Timeline |
| 8 | FormulaBox+StepCards | Table+RateBars | CompareCards+Checklist | Flow+TipBox |

- 스포크 9개 이상: 1번부터 다시 순환
- 허브 2개면: 허브A는 1~8, 허브B는 프리셋 역순(8~1)
- 같은 허브 내 완전히 동일한 조합 금지

---

## 금지 (훅이 자동 차단)
- ❌ 동의어 키워드 (가입≈신청, 조건≈자격)
- ❌ 2단어 키워드 ("퇴직금 계산")
- ❌ 금지어 (총정리, 완벽정리, 가이드, 확인, 비교표)
- ❌ H2에 베이스 키워드 누락
- ❌ 비주얼 배치 연속 중복
- ❌ 상상 키워드 (WebSearch 미사용)
- ❌ 사용자 개수 확인 없이 생성
