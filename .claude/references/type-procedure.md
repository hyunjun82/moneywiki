# Type C: 절차/신청형 — "어떻게 하나요?"

> 감지: keywords에 "방법", "절차", "신청", "순서", "하는법", "발급", "등록"
> 예시: 실업급여 구직활동 증빙 방법, 차상위계층 확인서 발급, 장애인 복지카드 신청

---

## 서론 패턴: 막막함 공감형

```markdown
*"독자가 절차 앞에서 느끼는 막막함 (이탤릭)"*

어디서부터 시작해야 하는지 알려주는 핵심 (2~3문장).
"~하려면 이 순서대로 하면 돼요."

"필요한 서류부터 신청 절차까지 정리했어요."
```

---

## 시각요소 비중

- **단계별 볼드 번호** (이 타입 핵심!)
- **서류/준비물 테이블 필수** (1개)
- 테이블: 1~2개 (서류 목록, 비용)
- **오해/Q&A blockquote** (자주 헷갈리는 절차)

---

## 단계별 설명 패턴

```markdown
**1단계: 이직확인서 처리 대기**

퇴사하면 회사가 10일 이내에 이직확인서를 고용보험에 신고해야 해요.
확인은 고용24에서 직접 조회할 수 있어요.

**2단계: 워크넷 구직등록**

워크넷(work.go.kr)에 접속해서 구직등록을 해요.
이력서를 등록하고 희망 직종을 선택하면 돼요.

**3단계: 수급자격 교육 이수**

고용24에서 온라인으로 수급자격 교육을 들어요.
약 1시간 정도 걸리고, 100% 수강해야 해요.
```

---

## 서류/준비물 테이블 (필수)

```markdown
### 신청 시 필요한 서류

| 서류 | 설명 | 발급처 |
|------|------|--------|
| 신분증 | 주민등록증 또는 운전면허증 | 본인 소지 |
| 이직확인서 | 회사가 신고 (본인 제출 불필요) | 회사 → 고용보험 |
| 통장 사본 | 실업급여 입금용 | 본인 소지 |
| 수급자격 교육 수료증 | 온라인 교육 후 자동 발급 | 고용24 |
```

---

## 예시: 타임라인형

H3 제목 = **시점+행동** (순번 금지)

```markdown
### 퇴사 당일: 회사에서 받아야 할 것

퇴직증명서와 이직확인서 신고 여부를 확인해요...

### 퇴사 후 1주일: 워크넷 + 교육

가장 먼저 워크넷 구직등록을 하고...

### 퇴사 후 2주: 첫 출석 + 수급자격 인정

고용센터에 가서 수급자격 인정 신청을 해요...
```

---

## 오해/Q&A blockquote

```markdown
### 많이 헷갈리시는 부분

> **"퇴사하면 바로 실업급여 나오나요?"**
> 아니에요. 이직확인서 처리 + 구직등록 + 교육 이수 후 첫 실업인정일에 시작돼요.
>
> **"회사가 이직확인서 안 내주면요?"**
> 고용센터에 신고하면 직권으로 조사해요. 14일 지나도 안 내면 과태료 대상이에요.
```

---

## Checker: 준비물 체크

```yaml
checker:
  title: "신청 준비가 다 됐는지 점검해 볼까요?"
  subtitle: "30초 확인"
  intro: "준비물 2가지만 확인하면 돼요."
  groups:
    - key: "document"
      label: "이직확인서가 처리됐나요?"
      options:
        - value: "yes"
          text: "고용24에서 확인됨"
        - value: "no"
          text: "아직 안 됨"
        - value: "unknown"
          text: "모르겠어요"
    - key: "registration"
      label: "워크넷 구직등록을 했나요?"
      options:
        - value: "done"
          text: "등록 완료"
        - value: "not-yet"
          text: "아직"
  results:
    - when: { document: "yes", registration: "done" }
      pass: true
      headline: "바로 신청할 수 있어요"
      detail: "이직확인서 처리 완료 + 구직등록까지 됐으니 고용센터 방문이나 고용24 온라인 신청이 가능해요."
      badges: ["신청 가능", "준비 완료"]
      links:
        - icon: "link"
          title: "고용24 온라인 신청"
          desc: "실업급여 인터넷 신청"
          href: "https://www.ei.go.kr"
    - when: { document: "no", registration: "not-yet" }
      pass: false
      headline: "아직 2가지가 남았어요"
      detail: "이직확인서 처리를 기다리면서 워크넷 구직등록을 먼저 해두세요. 동시에 진행할 수 있어요."
      badges: ["이직확인서 대기", "구직등록 필요"]
      links:
        - icon: "link"
          title: "워크넷 구직등록"
          desc: "이력서 등록 + 희망직종 선택"
          href: "https://www.work.go.kr"
        - icon: "link"
          title: "이직확인서 조회"
          desc: "고용24에서 처리 여부 확인"
          href: "https://www.ei.go.kr"
    - when: { document: "unknown" }
      pass: false
      headline: "이직확인서부터 확인해 보세요"
      detail: "고용24에 접속해서 '이직확인서 처리여부 조회'를 하면 됩니다. 회사가 퇴사 후 10일 이내에 신고해야 해요."
      badges: ["확인 필요"]
      links:
        - icon: "link"
          title: "이직확인서 조회 방법"
          desc: "고용24 조회 경로 안내"
          href: "https://www.ei.go.kr"
  default:
    pass: false
    headline: "준비 상태를 선택해 주세요"
    detail: "이직확인서와 구직등록 상태를 선택하면 다음 단계를 안내해 드려요."
    badges: []
    links: []
```

---

## ext-btn: 필수

신청/등록 사이트가 반드시 있는 타입. 딥링크로 연결.

```html
<a href="딥링크" target="_blank" rel="noopener noreferrer" class="ext-btn ext-btn-blue">
  <span class="ext-btn-badge">바로 신청</span>
  <span class="ext-btn-text">서비스명</span>
  <span class="ext-btn-cta">신청하기 -></span>
</a>
```

---

## bridge-card: 선행 조건 확인 연결

```html
<a href="/w/실업급여-수급-조건" class="bridge-card">
  <p class="bridge-headline">신청 전에 내가 자격이 되는지 먼저 확인해야 해요</p>
  <p class="bridge-body">
    피보험기간 180일 이상, 비자발적 퇴사 등 <strong>기본 조건</strong>이 있어요.
    조건이 안 되면 신청해도 반려돼요.
  </p>
  <span class="bridge-btn">수급 자격 조건 확인 -></span>
</a>
```

---

## 전체 구조 예시

```
서론 (막막함 공감)
[ctaCard]
[checker: 준비물 체크]

## H2-1: 전체 절차 개요
  단계별 요약 (볼드 번호 3~5단계)

## H2-2: 단계별 상세
  ### H3 1단계 상세
  ### H3 2단계 상세
    서류 테이블

## H2-3: 시점별 타임라인
  ### 퇴사 당일
  ### 퇴사 후 1주
  ### 퇴사 후 2주
  [bridge-card → 선행 조건]

## H2-4: 자주 헷갈리는 점
  오해 Q&A blockquote
  주의사항 불릿

[ext-btn 필수]
## 출처
```
