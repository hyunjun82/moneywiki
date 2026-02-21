# Type D: 비교형 — "뭐가 다른가요?"

> 감지: title/H2에 "차이", "비교", "vs", "다른점", "어디가", "어떤 게"
> 예시: DSR DTI 차이, DB형 DC형 비교, 간이과세자 일반과세자 차이

---

## 서론 패턴: 혼란 공감형

```markdown
*"독자가 두 개념 사이에서 느끼는 혼란 (이탤릭)"*

핵심 차이 한 문장 ("A는 ~이고, B는 ~이에요.").
왜 이 차이가 중요한지 (1~2문장).

"둘의 차이를 한눈에 정리했어요."
```

---

## 시각요소 비중

- **비교 테이블 필수** (이 타입 핵심!)
- 테이블: 2~3개 (비교표 + 시나리오)
- **텍스트 먼저 → 테이블 뒤** (테이블만 덜렁 금지)
- 선택 분기 불릿 (맨 마지막)

---

## 비교 테이블 패턴

```markdown
### A와 B 핵심 차이

A는 ~만 보고, B는 ~까지 전부 봐요. 이게 가장 큰 차이예요.

| 항목 | A | B |
|------|---|---|
| 적용 범위 | 주택담보대출만 | 모든 대출 |
| 계산 방식 | 원리금 + 이자 | 원리금 전부 |
| 한도 영향 | 상대적 여유 | 더 까다로움 |
```

---

## 예시: 같은 사람, 다른 선택

H3 제목 = **상황+선택지** (순번 금지)

```markdown
### 연봉 5,000만 원 직장인이 A를 선택하면

(A 기준으로 계산한 결과...)

### 같은 조건에서 B를 선택하면

(B 기준으로 계산한 결과. A와의 차이 강조.)

### 어떤 상황에서 뭘 골라야 할까?

(서술형 정리. 선택 분기로 마무리.)
```

---

## 선택 분기 불릿 (마지막 H2에 배치)

```markdown
**나한테 맞는 건 뭘까요?**

- 주택담보대출만 있다면 -> DTI 기준으로 보면 돼요
- 신용대출·카드론까지 있다면 -> [DSR 계산](/w/DSR-계산-방법)을 먼저 해보세요
- 전세대출이 고민이라면 -> [전세대출 DSR](/w/전세대출-DSR-적용) 기준이 달라요
```

---

## Checker: "나에게 맞는 건?"

```yaml
checker:
  title: "나한테 맞는 건 DTI일까 DSR일까?"
  subtitle: "30초 판정"
  intro: "대출 상황과 목적만 알면 바로 알 수 있어요."
  groups:
    - key: "situation"
      label: "현재 대출 상황은 어떤가요?"
      options:
        - value: "mortgage-only"
          text: "주택담보대출만 있어요"
        - value: "multiple"
          text: "신용대출·카드론도 있어요"
        - value: "none"
          text: "대출 없음 (신규)"
    - key: "purpose"
      label: "어떤 대출을 받으려고 하나요?"
      options:
        - value: "mortgage"
          text: "주택담보대출"
        - value: "credit"
          text: "신용대출"
  results:
    - when: { situation: "mortgage-only", purpose: "mortgage" }
      pass: true
      headline: "DTI·DSR 둘 다 봐야 해요"
      detail: "주택담보대출은 DTI와 DSR 중 낮은 한도가 적용돼요. 기존 대출이 주담대뿐이라면 두 수치가 비슷할 거예요."
      badges: ["DTI+DSR 병행", "한도 비교 필요"]
      links:
        - icon: "calculator"
          title: "내 DTI 계산하기"
          desc: "소득 대비 주담대 부담률"
          href: "/w/DTI-계산-방법"
        - icon: "calculator"
          title: "내 DSR 계산하기"
          desc: "모든 대출 합산 부담률"
          href: "/w/DSR-계산-방법"
    - when: { situation: "multiple", purpose: "mortgage" }
      pass: true
      headline: "DSR이 더 중요해요"
      detail: "신용대출·카드론까지 있으면 DSR이 DTI보다 높게 나와요. DSR 40% 초과 시 추가 대출이 어려워요."
      badges: ["DSR 우선", "40% 기준"]
      links:
        - icon: "calculator"
          title: "내 DSR 계산하기"
          desc: "전체 대출 합산 부담률 확인"
          href: "/w/DSR-계산-방법"
    - when: { situation: "none", purpose: "credit" }
      pass: true
      headline: "DSR만 보면 돼요"
      detail: "신규 신용대출은 DSR 규제만 적용돼요. DTI는 주택담보대출에만 해당해요."
      badges: ["DSR만 적용"]
      links:
        - icon: "calculator"
          title: "신용대출 한도 확인"
          desc: "연소득 기준 DSR 한도"
          href: "/w/DSR-계산-방법"
  default:
    pass: false
    headline: "상황을 선택해 주세요"
    detail: "현재 대출 상황과 목적을 선택하면 어떤 기준이 적용되는지 바로 알려드려요."
    badges: []
    links: []
```

---

## ext-btn: 선택적

비교 자체는 정보 전달이므로, 관련 조회/계산 사이트가 있을 때만 배치.

---

## bridge-card: 선택한 쪽 상세 글 연결

```html
<a href="/w/DSR-계산-방법" class="bridge-card">
  <p class="bridge-headline">내 DSR이 몇 %인지 궁금하시죠?</p>
  <p class="bridge-body">
    모든 대출의 연간 원리금을 합산해서 소득 대비 비율을 봐요.
    <strong>40%를 넘으면</strong> 추가 대출이 어려워져요.
  </p>
  <span class="bridge-btn">내 DSR 직접 계산 -></span>
</a>
```

---

## 전체 구조 예시

```
서론 (혼란 공감)
[ctaCard]
[checker: 나에게 맞는 건?]

## H2-1: 핵심 차이 한눈에
  텍스트 설명 먼저
  비교 테이블

## H2-2: A 상세 설명
  ### H3 특징
  ### H3 적용 사례

## H2-3: B 상세 설명
  ### H3 특징
  ### H3 적용 사례
  [bridge-card → 선택한 쪽 상세]

## H2-4: 실제 선택 가이드
  같은 상황 A vs B 시나리오
  오해 Q&A blockquote
  선택 분기 불릿

[ext-btn (선택적)]
## 출처
```
