# Type A: 계산형 — "얼마나 되나요?"

> 감지: keywords에 "계산", "얼마", "금액", "상한액", "하한액", "세율", "공제", "수령액"
> 예시: 실업급여 기초일액 계산, 건강보험 보험료 계산, 프리랜서 3.3% 환급

---

## 서론 패턴: 숫자 충격형

```markdown
*"독자의 구체적 계산 고민 (이탤릭)"*

핵심 숫자 제시 (2~3문장). "~라는 사실, 알고 계셨나요?" 식 충격.

왜 이 계산이 중요한지 (1문장).
"계산 방법부터 실제 금액까지 정리했어요."
```

---

## 시각요소 비중

- **테이블: 3~4개 OK** (계산 데이터 필요)
- 모든 테이블 위에 H3 또는 H4 캡션 필수
- 텍스트 → 테이블 순서 (테이블만 덜렁 금지)

---

## 시뮬레이션 (이 타입 핵심!)

**3인 페르소나** — 각각 다른 소득/상황으로 결과 차이 보여주기.

H3 제목 = **인물+상황 중심** (순번 금지)

```markdown
### 직장인 박 대리(35세), 월급 280만 원 기준

총급여 3,360만 원. 퇴직 전 3개월 평균임금은...

#### 실업급여 일 지급액 계산

| 항목 | 금액 |
|------|------|
| ... | ... |

세후 월 수령액은 약 163만 원이에요.


### 경력 15년 김 과장(48세), 연봉 6,000만 원

(서술형 — 테이블 없이 핵심 숫자 볼드)


### 단기 계약직 이 씨(27세), 7개월 근무

#### 단기 근무자 실업급여 산정 요약

| 항목 | 내용 |
|------|------|
| ... | ... |
```

**포맷 풀** (3개 중 2개+ 다르게):
1. H4 캡션 + 테이블 + 해석 문단
2. 서술형 (테이블 없이 볼드 숫자)
3. 비교표 (두 선택지 수치 비교)

---

## Checker: 입력 → 계산 결과

```yaml
checker:
  title: "내 실업급여 얼마나 받을 수 있을까?"
  subtitle: "30초 계산"
  intro: "월급과 근무기간만 알면 바로 계산돼요."
  groups:
    - key: "income"
      label: "월 평균임금이 얼마인가요?"
      options:
        - value: "under200"
          text: "200만 원 미만"
        - value: "200-300"
          text: "200~300만 원"
        - value: "over300"
          text: "300만 원 이상"
    - key: "workYears"
      label: "총 근무기간은 얼마나 되나요?"
      options:
        - value: "under1"
          text: "1년 미만"
        - value: "1-3"
          text: "1~3년"
        - value: "3-10"
          text: "3~10년"
        - value: "over10"
          text: "10년 이상"
  results:
    - when: { income: "under200", workYears: "under1" }
      pass: true
      headline: "하한액이 적용돼요"
      detail: "평균임금의 60%가 하한액보다 낮아서 2026년 기준 일 68,100원이 적용돼요."
      badges: ["하한액 적용", "일 68,100원"]
      links:
        - icon: "calculator"
          title: "정확한 금액 계산하기"
          desc: "고용보험 모의계산기"
          href: "https://www.ei.go.kr"
    - when: { income: "over300", workYears: "over10" }
      pass: true
      headline: "상한액 근처예요"
      detail: "평균임금이 높으면 상한액(일 68,100원)이 적용될 수 있어요. 수급기간은 최대 270일이에요."
      badges: ["상한액 주의", "최대 270일"]
      links:
        - icon: "calculator"
          title: "수급기간 확인하기"
          desc: "나이·근무기간별 수급일수"
          href: "#수급기간-테이블"
  default:
    pass: false
    headline: "조건을 선택해 주세요"
    detail: "월급과 근무기간을 선택하면 예상 수령액을 바로 알려드려요."
    badges: []
    links: []
```

---

## ext-btn: 필수

정부 계산기/조회 사이트로 연결. 행동 키워드가 있으니 반드시 배치.

```html
<a href="딥링크" target="_blank" rel="noopener noreferrer" class="ext-btn ext-btn-blue">
  <span class="ext-btn-badge">무료 계산</span>
  <span class="ext-btn-text">서비스명</span>
  <span class="ext-btn-cta">계산하기 -></span>
</a>
```

---

## bridge-card: 관련 계산기 연결

```html
<a href="/w/관련-계산기" class="bridge-card">
  <p class="bridge-headline">내 상황에서 실제 금액이 궁금하시죠?</p>
  <p class="bridge-body">
    숫자 힌트 1~2문장.
    <strong>핵심 변수</strong>에 따라 결과가 달라져요.
  </p>
  <span class="bridge-btn">내 금액 직접 계산 -></span>
</a>
```

---

## mark 태그: 핵심 금액/비율

```markdown
실업급여 1일 지급액은 <mark>**퇴직 전 평균임금의 60%**</mark>예요.
2026년 상한액은 <mark><strong>일 68,100원</strong></mark>이에요.
```

---

## 전체 구조 예시

```
서론 (숫자 충격)
[ctaCard]
[checker: 입력값 → 결과]

## H2-1: 기본 계산 공식
  핵심 공식 설명 + 변수 해설

## H2-2: 변수별 상세
  ### H3 소주제
    테이블
  ### H3 소주제
    테이블

## H2-3: 시뮬레이션 (3인 페르소나)
  ### 인물A — 테이블 시뮬
  ### 인물B — 서술형
  ### 인물C — 비교표
  [bridge-card]

## H2-4: 예외/주의사항
  blockquote 핵심
  오해 Q&A

[ext-btn]
## 출처
```
