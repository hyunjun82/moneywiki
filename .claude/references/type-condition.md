# Type B: 조건/자격형 — "나도 해당되나요?"

> 감지: keywords에 "조건", "요건", "자격", "기준", "대상", "가능", "탈락", "해당"
> 예시: 실업급여 수급조건, 건강보험 피부양자 탈락, 한부모가족 자격, 생애최초 취득세 감면

---

## 서론 패턴: 공감형

```markdown
*"독자의 자격/해당 여부 고민 (이탤릭)"*

핵심 조건 요약 (2~3문장). "~라는 거 아시나요?" 또는 "~고민이시죠?"

이 글로 뭘 해결할 수 있는지 (1문장).
"조건부터 신청까지 알려드려요."
```

---

## 시각요소 비중

- **테이블: 1~2개** (조건 요약표)
- **불릿/체크리스트 강조** (조건 나열에 적합)
- **blockquote**: 핵심 조건 요약에 사용

---

## 조건 표현 패턴

### 조건 요약 테이블

```markdown
### 자격 요건 한눈에 보기

| 조건 | 기준 | 비고 |
|------|------|------|
| 소득 | 중위소득 46% 이하 | 1인가구 약 100만 원 |
| 재산 | 지역별 기본재산액 이하 | 서울 9,900만 원 |
| 근로능력 | 제한 없음 | 65세 이상 포함 |
```

### blockquote 핵심 조건

```markdown
> 쉽게 말하면, **피보험기간 180일 이상 + 비자발적 퇴사**가 핵심이에요.
```

### 선택 분기 불릿 (마지막 H2에 배치)

```markdown
**나한테 맞는 건 뭘까요?**

- 자발적 퇴사였다면 -> [자발적 퇴사 실업급여](/w/자발적-퇴사-실업급여)를 먼저 보세요
- 계약 만료라면 -> 비자발적 퇴사에 해당돼요 (이 글)
- 권고사직이라면 -> 바로 신청 가능해요
```

---

## 예시: 사례 중심

H3 제목 = **인물+상황** (순번 금지)

```markdown
### 3년 다니다 권고사직된 이 대리

피보험기간 1,095일. 비자발적 퇴사에 해당해서...

### 프리랜서에서 정규직 8개월 근무 후 퇴사한 김 씨

두 직장 피보험기간을 합산하면...

### 육아휴직 복귀 후 1년 만에 계약 종료된 박 씨

육아휴직 기간은 피보험기간에서 제외되지만...
```

---

## Checker: 자격 판정 (am-I-eligible)

```yaml
checker:
  title: "나도 실업급여 받을 수 있을까?"
  subtitle: "30초 확인"
  intro: "퇴사 사유와 근무기간만 알면 바로 판정돼요."
  groups:
    - key: "employment"
      label: "퇴사 사유가 무엇인가요?"
      options:
        - value: "involuntary"
          text: "권고사직·계약만료"
        - value: "voluntary"
          text: "자발적 퇴사"
        - value: "misconduct"
          text: "중대한 귀책사유"
    - key: "period"
      label: "피보험기간이 180일 이상인가요?"
      options:
        - value: "yes"
          text: "180일 이상"
        - value: "no"
          text: "180일 미만"
  results:
    - when: { employment: "involuntary", period: "yes" }
      pass: true
      headline: "실업급여 수급 가능해요"
      detail: "비자발적 퇴사에 피보험기간도 충족돼요. 고용센터에서 수급자격 인정 신청을 하면 돼요."
      badges: ["수급 가능", "신청 가능"]
      links:
        - icon: "document"
          title: "신청 절차 보기"
          desc: "고용24 온라인 신청 방법"
          href: "/w/실업급여-신청-방법"
        - icon: "calculator"
          title: "예상 수령액 계산"
          desc: "내 급여 기준 실업급여 금액"
          href: "/w/실업급여-계산"
    - when: { employment: "voluntary", period: "yes" }
      pass: false
      headline: "자발적 퇴사는 원칙적으로 안 돼요"
      detail: "다만 이사·질병·임금체불 등 정당한 사유가 있으면 예외로 인정될 수 있어요."
      badges: ["원칙 불가", "예외 확인"]
      links:
        - icon: "document"
          title: "자발적 퇴사 예외 사유"
          desc: "인정되는 12가지 사유 확인"
          href: "/w/자발적-퇴사-실업급여"
    - when: { employment: "involuntary", period: "no" }
      pass: false
      headline: "피보험기간이 부족해요"
      detail: "180일 이상 근무해야 해요. 이전 직장 피보험기간을 합산할 수 있으니 고용보험 가입이력을 확인해 보세요."
      badges: ["기간 부족"]
      links:
        - icon: "search"
          title: "피보험기간 조회"
          desc: "고용보험 가입이력 확인"
          href: "https://www.ei.go.kr"
  default:
    pass: false
    headline: "조건을 선택해 주세요"
    detail: "퇴사 사유와 근무기간을 선택하면 수급 가능 여부를 바로 알려드려요."
    badges: []
    links: []
```

---

## ext-btn: 선택적

조회/신청 가능한 정부 사이트가 있을 때만 배치.
정보 전달 위주 글에는 불필요.

---

## bridge-card: 신청 절차 연결

```html
<a href="/w/실업급여-신청-방법" class="bridge-card">
  <p class="bridge-headline">조건은 됐는데, 어디서 신청하는지 궁금하시죠?</p>
  <p class="bridge-body">
    고용24에서 온라인 신청이 가능해요.
    <strong>이직확인서</strong>가 처리되면 바로 진행할 수 있어요.
  </p>
  <span class="bridge-btn">실업급여 신청 절차 보기 -></span>
</a>
```

---

## 전체 구조 예시

```
서론 (공감형)
[ctaCard]
[checker: 자격 판정]

## H2-1: 핵심 조건 정리
  > blockquote 요약
  조건별 설명 (텍스트 위주)

## H2-2: 세부 기준
  ### H3 기준A
    조건 테이블
  ### H3 기준B
    불릿 리스트

## H2-3: 사례별 판단
  ### 인물A 사례
  ### 인물B 사례
  ### 인물C 사례 (다른 결과)

## H2-4: 예외/주의사항
  오해 Q&A blockquote
  선택 분기 불릿
  [bridge-card → 신청 절차]

[ext-btn (선택적)]
## 출처
```
