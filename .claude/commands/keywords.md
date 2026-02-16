# /keywords — 허브 & 스포크 키워드 생성기

## 사용법
```
/keywords [시드키워드]
/keywords [시드키워드] --count 10
```

---

## 타이틀 황금 규칙 (★★★ 최우선!)

```
2026 기초생활수급자 1인가구 생계급여 조건 | 소득인정액 계산 방법
[─────── 롱테일 키워드 1 ───────]   [── 연관 롱테일 키워드 2 ──]
```

1. **롱테일 | 연관 롱테일** — 양쪽 다 키워드, 한쪽만 문장이면 FAIL
2. **매끄러운 자연어** — 단어 나열 금지, 검색창에 치는 구(句)
3. **포털 실제 검색어** — 구글/네이버/다음 PAA·연관검색어에서 추출만

형식: `|` 파이프, 60자 이내. 금지: `—`, `-`, `:`, 총정리/완벽정리/가이드

```
BAD: 양도세 중과 유예 연혁 종료일 | 2026년 5월 이후 달라지는 점은?  ← 질문형
BAD: 양도세 잔금일 기준 계약일 차이 | 양도 시기 판단이 세율을 결정해요  ← 설명문
```

---

## 실행 순서

### Step 0: 사용자에게 개수 확인
"스포크 몇 개 만들까요? (기본 10개)" — 확인 없이 생성 금지.

### Step 1: 기존 글 중복 체크 (필수!)

**slug 리스트 로드:**
```bash
node .claude/scripts/collect-existing-slugs.js
```

**중복 판단 기준:**
```
1. 완전 일치: slug가 동일 → 리라이트 대상
2. 토큰 유사도 60%+: 같은 주제 → 통합 또는 차별화
3. 핵심 키워드 겹침: 시드키워드가 기존 title에 포함 → 확인
```

### Step 2: 실제 검색 데이터 수집 (상상 키워드 절대 금지!)

**수집 순서 (WebFetch 우선!):**

```
1순위: WebFetch로 정부/공식 사이트 직접 접속
   - easylaw.go.kr (생활법률) → H2/H3 추출
   - nts.go.kr (국세청) → 세금 FAQ/가이드
   - moel.go.kr (고용노동부) → 노동/실업급여
   - bokjiro.go.kr (복지로) → 복지/지원금
   - law.go.kr (법제처) → 법령
   - hf.go.kr (주택금융공사) → 주택/대출

2순위: 구글 PAA — https://www.google.com/search?q=[시드키워드]&hl=ko
3순위: 네이버/다음 연관검색어
4순위: WebSearch (fallback)
```

### Step 2-1: 중복 제거

```
1. 완전 동일 → 하나만 (구글 PAA 우선)
2. 의미적 동의어 → 검색량 많은 쪽 채택
   가입 ≈ 신청, 조건 ≈ 자격 ≈ 요건 ≈ 대상
   방법 ≈ 절차 ≈ 하는법, 금액 ≈ 비용 ≈ 얼마
   계산 ≈ 산정 ≈ 산출, 기간 ≈ 기한 ≈ 언제
3. 포함 관계 → 더 구체적인 쪽 채택
```

### Step 3: 키워드 필터링

기존 글(Step 1)과 수집 결과(Step 2)를 대조:

```
A. 완전 겹침 → 제외 또는 리라이트
B. 부분 겹침 → 차별화 포인트 명시
C. 완전 신규 → 채택
```

최종 필터링:
- 동의어 제거
- 4개 검색 의도로 분류 (정보/행동/비교/절차)
- 최소 3단어, 권장 4~5단어 롱테일
- 정보형 2개 이하 + 행동형 2개 이상

### Step 4: 2x2 vs 1x4 판단
```
2x2: 동사 2개가 완전히 다른 행위 (신고 ≠ 납부)
1x4: 동사가 동의어 → 하나의 동사 + 4개 다른 질문
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
title: "[메인 롱테일 키워드] | [연관 롱테일 키워드]"
slug: [슬러그]
keywords: [6~8개]
H2: 의도 카테고리 기반 (what/how much/when/risk/how)
description: 100~150자 구어체 2문장
category: [카테고리]
상태: 신규 | 리라이트(기존URL) | 차별화(유사글)
```

### 스포크
```
title: "[메인 롱테일 키워드] | [연관 롱테일 키워드]"
slug: [슬러그]
keyword 1: [4~5단어] → [의도] → ## [질문형 H2]
keyword 2: [4~5단어] → [의도] → ## [질문형 H2]
keyword 3: [4~5단어] → [의도] → ## [질문형 H2]
keyword 4: [4~5단어] → [의도] → ## [질문형 H2]
description: 100~150자 구어체 2문장
category: [카테고리]
상태: 신규 | 리라이트(기존URL) | 차별화(유사글)
검색 출처: [PAA/네이버/다음/easylaw 등]
visuals:
  S1: [시각A] + [시각B]
  S2: [시각C] + [시각D]
  S3: [시각E] + [시각F]
  S4: [시각G] + [시각H]
종류: 8종 / 연속: 없음
```

---

## Description

- 100~150자, 구어체 2문장, 페이지 내용을 요약한 자연스러운 문장
- 패턴 A(놀라움)/B(문제해결)/C(숫자) 순환 — 같은 허브 내 중복 금지
- 좋은 예: "2026년 기초생활수급자 선정 기준이 바뀐 거 아시나요? 소득인정액 계산법부터 급여별 조건까지 알려드려요."
- writer는 키워드 단계 description을 그대로 사용, 임의 변경 금지

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

## Step 7: 에이전트 팀용 JSON 저장 (필수!)

사용자 확인 후 `.claude/data/keywords/[시드키워드].json`에 저장.

```json
{
  "seed": "퇴직금",
  "createdAt": "2026-02-15",
  "status": "ready",
  "hubs": [
    {
      "title": "퇴직금 계산 방법 지급 기한 | 퇴직소득세 지연이자 청구",
      "slug": "퇴직금-계산-방법-세금-지연이자",
      "keywords": ["퇴직금 계산", "퇴직금 세금", "퇴직금 지급기한", "퇴직금 지연이자"],
      "description": "퇴직금을 14일 안에 못 받으면 연 20% 이자가 붙어요. 계산 방법부터 세금, 지연이자 청구까지 알려드려요.",
      "category": "노동/근로",
      "상태": "신규"
    }
  ],
  "spokes": [
    {
      "title": "퇴직금 계산 방법 | 통상임금 평균임금 차이",
      "slug": "퇴직금-계산-방법-통상임금-평균임금",
      "keywords": ["퇴직금 계산 방법", "퇴직금 통상임금 기준", "퇴직금 평균임금 차이", "퇴직금 계산기 사용법"],
      "h2": [
        "퇴직금 계산 방법은 어떻게 되나요?",
        "퇴직금 통상임금 기준은 무엇인가요?",
        "퇴직금 평균임금 차이는 뭐가 다른가요?",
        "퇴직금 계산기 사용법은 어떻게 되나요?"
      ],
      "description": "퇴직금 계산할 때 통상임금과 평균임금 중 뭘 기준으로 하는지 아시나요? 계산 방법부터 계산기 사용법까지 알려드려요.",
      "descriptionPattern": "A",
      "category": "노동/근로",
      "hubSlug": "퇴직금-계산-방법-세금-지연이자",
      "상태": "신규",
      "검색출처": ["구글 PAA", "easylaw.go.kr"],
      "visuals": {
        "S1": "CompareCards+RateBars",
        "S2": "Table+TipBox",
        "S3": "FormulaBox+Flow",
        "S4": "Checklist+RateCards"
      },
      "introType": "A"
    }
  ]
}
```

---

## 금지 (훅이 자동 차단)
- 동의어 키워드 (가입≈신청, 조건≈자격)
- 2단어 키워드 ("퇴직금 계산")
- 금지어 (총정리, 완벽정리, 가이드, 확인, 비교표)
- H2에 베이스 키워드 누락
- 비주얼 배치 연속 중복
- 상상 키워드 (WebFetch/WebSearch 결과 없이 생성)
- 사용자 개수 확인 없이 생성
- 검색 출처 미기재
