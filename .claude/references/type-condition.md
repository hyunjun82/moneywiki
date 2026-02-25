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

- **테이블 필수 1개** (조건 요약표 — 없으면 조건 판단 불가)
- **chips**: 급여/자격 상태를 4칸 그리드로 시각화
- **blockquote**: 핵심 조건 1줄 요약 (1개 이상)
- **info.tip / info.warn**: 주의/팁 강조
- **mark**: 핵심 조건 기준 수치(날짜/금액) 최소 2곳

---

## chips: 급여별 자격 상태 시각화

조건 비교가 여러 항목일 때 (예: 4가지 급여, 4가지 자격 구분)

```html
<div class="chips">
  <div class="chip">
    <span class="ic">✅</span>
    <span class="t">생계급여</span>
    <span class="v">해당</span>
  </div>
  <div class="chip">
    <span class="ic">⚠️</span>
    <span class="t">의료급여</span>
    <span class="v">조건부</span>
  </div>
  <div class="chip">
    <span class="ic">✅</span>
    <span class="t">주거급여</span>
    <span class="v">해당</span>
  </div>
  <div class="chip">
    <span class="ic">❌</span>
    <span class="t">교육급여</span>
    <span class="v">해당없음</span>
  </div>
</div>
```

---

## 조건 표현 패턴

### 조건 요약 테이블 (필수)

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

### info.tip — 예외/혜택 안내

```html
<div class="info tip">
  <span class="ic">💡</span>
  <div>서울에 전세 <strong>8,000만원</strong>으로 거주 중이라면? 기본재산액 9,900만원 공제 후 환산액은 <strong>0원</strong>이에요.</div>
</div>
```

### info.warn — 주의사항

```html
<div class="info warn">
  <span class="ic">⚠️</span>
  <div><strong>의료급여 예외:</strong> 부양의무자 연소득 <strong>1.3억 초과</strong> 또는 재산 <strong>12억 초과</strong> 시 의료급여가 제외될 수 있어요.</div>
</div>
```

### 선택 분기 불릿 (마지막 H2에 배치)

```markdown
**나한테 맞는 건 뭘까요?**

- 자발적 퇴사였다면 → [자발적 퇴사 실업급여](/w/자발적-퇴사-실업급여)를 먼저 보세요
- 계약 만료라면 → 비자발적 퇴사에 해당돼요 (이 글)
- 권고사직이라면 → 바로 신청 가능해요
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

## br-pas: 조건 확인 후 다음 단계 연결

조건 H2 섹션 사이 또는 마지막 H2 뒤에 배치:

```html
<a href="/w/실업급여-신청-방법" class="br-pas">
  <p class="br-pas-q">조건은 됐는데, 신청은 어디서 어떻게 하면 될까요?</p>
  <p class="br-pas-a">고용24에서 온라인으로 신청할 수 있어요. <strong>이직확인서</strong>가 처리되면 바로 진행할 수 있어요.</p>
  <span class="br-pas-btn">실업급여 신청 절차 보기 →</span>
</a>
```

---

## Checker: 자격 판정 (am-I-eligible)

**체커 links.href 우선순위 (중요!)**
1. `/w/위키슬러그` — 관련 위키 글 (최우선)
2. `/calculators/슬러그` — 내부 계산기
3. 정부 딥링크 — 진짜 직접 조회 불가한 경우만
- **TSX hub/spoke URL 절대 금지**

**checker 문구 Anti-AI 규칙**
- `subtitle`: "30초 확인" "바로 판정" — OK / "결과에서 해당 글 확인하세요" 금지
- `detail`: ~해요체 강제. "~합니다" "~확인하세요" 절대 금지
- `links[].desc`: 클릭하면 뭘 볼 수 있는지 구체적으로

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
          title: "실업급여 신청 방법"
          desc: "고용24 온라인 신청 절차 안내"
          href: "/w/실업급여-신청-방법"    # ← /w/ 위키 슬러그 필수
        - icon: "calculator"
          title: "예상 수령액 계산"
          desc: "내 월급 기준 실업급여 금액"
          href: "/w/실업급여-계산"
    - when: { employment: "voluntary", period: "yes" }
      pass: false
      headline: "자발적 퇴사는 원칙적으로 안 돼요"
      detail: "다만 이사·질병·임금체불 등 정당한 사유가 있으면 예외로 인정될 수 있어요."
      badges: ["원칙 불가", "예외 확인"]
      links:
        - icon: "document"
          title: "자발적 퇴사 예외 사유 확인"
          desc: "인정되는 12가지 사유 목록"
          href: "/w/자발적-퇴사-실업급여"
    - when: { employment: "involuntary", period: "no" }
      pass: false
      headline: "피보험기간이 부족해요"
      detail: "180일 이상 근무해야 해요. 이전 직장 피보험기간을 합산할 수 있어요."
      badges: ["기간 부족"]
      links:
        - icon: "search"
          title: "피보험기간 합산 방법"
          desc: "이전 직장 포함 총 피보험기간 계산법"
          href: "/w/실업급여-피보험기간"
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

## 전체 구조 예시

```
서론 (공감형)
[ctaCard]
[checker: 자격 판정]

## H2-1: 핵심 조건 정리
  > blockquote 요약
  <chips: 급여별 자격 상태>
  조건별 설명 (텍스트 위주)

## H2-2: 세부 기준
  ### H3 기준A
    조건 테이블 (필수)
    <info.tip 예외 혜택>
  ### H3 기준B
    불릿 리스트
    <info.warn 주의사항>

## H2-3: 사례별 판단
  ### 인물A 사례
  ### 인물B 사례
  ### 인물C 사례 (다른 결과)

## H2-4: 예외/주의사항
  오해 Q&A blockquote
  선택 분기 불릿
  <br-pas → 신청 절차>

[ext-btn (선택적)]
## 출처
```

---

## TSX 블로그 컴포넌트 (Blog TSX 전용)

MD 파일은 위 HTML class 패턴 사용. Blog TSX 파일은 아래 JSX 컴포넌트 사용.

| MD 클래스 | TSX 컴포넌트 |
|-----------|------------|
| `class="chips"` | `<Tag v="a">` / `<Tag v="b">` |
| `class="info tip"` | `<Info type="tip">` |
| `class="info warn"` | `<Info type="warn">` (필수 1개+) |
| `class="br-pas"` | `<BridgeCard>` |
```tsx
<Tag v="a">수급 가능</Tag>
<Tag v="b">조건부</Tag>

<Info type="warn">{"<strong>예외:</strong> 부양의무자 소득 1.3억 초과 시 의료급여 제외될 수 있어요."}</Info>

<BridgeCard
  q="조건은 됐는데, 신청은 어디서 어떻게 하면 될까요?"
  body="고용24에서 온라인으로 신청할 수 있어요."
  btnText="실업급여 신청 절차 보기"
  href="/w/실업급여-신청-방법"
/>
```

---

## 골든 스탠다드 필수 패턴 (v2 — 모든 타입 공통)

### Import 블록

```tsx
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  FormulaCard, CaseBox, ChipsGrid,
} from "@/components/wiki/BlogShared";
```

### BlogLayout (2컬럼 + sidebar 필수)

```tsx
<BlogLayout
  breadcrumb={["홈", "카테고리", "서브", "현재 글"]}
  tags={["2026년 최신", "카테고리", "태그"]}
  date={meta.lastUpdated}
  title={meta.title}
  description={<>인트로 텍스트 — 핵심 숫자 <strong>볼드</strong></>}
  sourceBar={{ badge: "출처", name: "보건복지부 고시 제20XX-XXX호", date: "2026.02 시행" }}
  stickyLabel="매달 최대"
  stickyValue="금액"
  stickyBtn="나도 받을 수 있을까? ↑"
  disclaimer="이 글은 OO부 고시를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 판정은 OO에서 진행하세요."
  sidebar={<>
    <SidebarCTA items={[
      { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기", hot: true },
      { icon: "🏛️", title: "2026 정부지원금", sub: "30개+ 지원금", href: "/w/정부지원금" },
      { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
    ]} />
    <SidebarDocs items={[
      { title: "관련문서 제목", cat: "카테고리·태그", href: "/w/슬러그" },
      // 5개 권장
    ]} />
    <SidebarCalc items={[
      { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
      { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
      { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
      { title: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
      { title: "대출이자 계산기", href: "/w/대출이자-계산기" },
    ]} />
  </>}
>
```

### RelatedMid (SECTION 03-04 사이 필수)

```tsx
<RelatedMid
  title="다른 OO 글도 비교해 보세요"
  items={[
    { icon: "🏥", title: "관련 글 제목 1", desc: "한 줄 설명", href: "/w/슬러그1" },
    { icon: "🏠", title: "관련 글 제목 2", desc: "한 줄 설명", href: "/w/슬러그2" },
    { icon: "🛡️", title: "관련 글 제목 3", desc: "한 줄 설명", href: "/w/슬러그3" },
  ]}
  hubHref="/w/허브-슬러그"
  hubLabel="OO 전체 보기"
/>
```

### 본문 6섹션 구조 (고정)

```
<TOC items={[6개 — sub에 베이스 키워드 포함]} />
<Summary3 items={[3줄 — 숫자 포함]} />
sourceBar

STEP 01: 체커 (CheckerShell + CheckerQ × 3~5)
  서론 P 2개 + 체커 카드
  ↓ Divider
SECTION 02: 키워드1 H2 (질문형, 베이스 키워드 포함)
  P + TableTitle + Table + InlineLink
  ↓ Divider
SECTION 03: 키워드2 H2
  P + Table + Info(warn) + InlineLink
  ↓ RelatedMid (본문 중간 카드)
  ↓ Divider
SECTION 04: 키워드3 H2
  P + H3 + CaseBox or 예시 + BridgeCard
  ↓ Divider
SECTION 05: 키워드4 H2
  P + Table(실수령액) + BridgeCard
  ↓ Divider
FAQ: FAQAccordion (2개)

<RelatedArticles items={[5개]} />
<PrevNext prev={{title,href}} next={{title,href}} />
```

### TOC sub에 베이스 키워드 필수

```tsx
<TOC items={[
  { t: "체커 제목", sub: null },
  { t: "[베이스] 키워드1 질문?", sub: "[베이스] H3-1 · [베이스] H3-2" },
  { t: "[베이스] 키워드2 질문?", sub: "[베이스] H3-3 · [베이스] H3-4 · [베이스] H3-5" },
  { t: "[베이스] 키워드3 질문?", sub: "[베이스] H3-6 · [베이스] H3-7" },
  { t: "[베이스] 키워드4 질문?", sub: "[베이스] H3-8" },
  { t: "자주 묻는 질문", sub: null },
]} />
```
