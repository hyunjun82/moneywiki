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

- **steps HTML**: 단계별 흐름 시각화 (이 타입 핵심!)
- **서류/준비물 테이블 필수** (1개)
- 테이블: 1~2개 (서류 목록, 비용)
- **dbox**: 서류 목록 대안 또는 병용
- **info.warn**: 자주 헷갈리는 주의사항
- **blockquote**: 오해 Q&A (자주 헷갈리는 절차)

---

## steps: 단계별 시각 흐름 (핵심!)

**기존 볼드 텍스트 `**N단계:**` 대신 steps HTML 사용**

```html
<div class="steps">
  <div class="step">
    <div class="step-n">1</div>
    <div class="step-c">
      <h4>이직확인서 처리 대기</h4>
      <p>퇴사 후 회사가 10일 이내에 고용보험에 신고해요. 고용24에서 처리 여부를 조회할 수 있어요.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-n">2</div>
    <div class="step-c">
      <h4>워크넷 구직등록</h4>
      <p>work.go.kr에 접속해서 이력서를 등록하고 희망 직종을 선택해요.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-n">3</div>
    <div class="step-c">
      <h4>수급자격 교육 이수</h4>
      <p>고용24에서 온라인 교육을 들어요. 약 1시간, 100% 수강해야 해요.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-n">4</div>
    <div class="step-c">
      <h4>수급자격 인정 신청</h4>
      <p>고용센터 방문 또는 고용24 온라인으로 신청서를 제출해요.</p>
    </div>
  </div>
</div>
```

**steps 규칙:**
- 단계 수: 최소 3단계, 최대 6단계
- `h4`: 행동 동사로 시작 (예: "이직확인서 처리 대기", "워크넷 구직등록")
- `p`: 각 단계 1~2문장 설명

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

## dbox: 서류 목록 대안

테이블 대신 또는 병용 (서류가 3개 이상일 때 dbox가 더 명확)

```html
<div class="dbox">
  <div class="dbox-h">신청 전 준비물 3가지</div>
  <div class="dbox-item">
    <div class="dbox-idx">1</div>
    <div class="dbox-text">
      <h4>신분증</h4>
      <p>주민등록증 또는 운전면허증. 외국인은 외국인등록증</p>
    </div>
  </div>
  <div class="dbox-item">
    <div class="dbox-idx">2</div>
    <div class="dbox-text">
      <h4>통장 사본</h4>
      <p>수급자 본인 명의. 급여 입금 전용 계좌</p>
    </div>
  </div>
  <div class="dbox-item">
    <div class="dbox-idx">3</div>
    <div class="dbox-text">
      <h4>이직확인서</h4>
      <p>회사가 고용보험에 신고하면 자동으로 연동돼요. 별도 제출 불필요</p>
    </div>
  </div>
</div>
```

---

## info.warn: 흔한 실수/주의사항

```html
<div class="info warn">
  <span class="ic">⚠️</span>
  <div><strong>퇴사 후 12개월 내에 신청해야 해요.</strong> 기간이 지나면 남은 수급기간이 있어도 받을 수 없어요.</div>
</div>
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

## br-pas: 선행 조건 확인 연결

절차 글 서론 또는 H2-1 직전에 배치 (자격 조건 먼저 확인 유도):

```html
<a href="/w/실업급여-수급-조건" class="br-pas">
  <p class="br-pas-q">신청 전에 내가 자격이 되는지 먼저 확인해야 해요</p>
  <p class="br-pas-a">피보험기간 <strong>180일 이상</strong>, 비자발적 퇴사 등 기본 조건이 있어요. 조건이 안 되면 신청해도 반려돼요.</p>
  <span class="br-pas-btn">수급 자격 조건 확인 →</span>
</a>
```

---

## Checker: 준비물 체크

**체커 links.href 우선순위 (중요!)**
1. `/w/위키슬러그` — 관련 위키 글 (최우선)
2. `/calculators/슬러그` — 내부 계산기
3. 정부 딥링크 — 진짜 직접 조회 불가한 경우만
- **TSX hub/spoke URL 절대 금지**

**checker 문구 Anti-AI 규칙**
- `subtitle`: "30초 확인" "준비 확인" — OK / "결과에서 해당 글 확인하세요" 금지
- `detail`: ~해요체 강제. "~합니다" "~확인하세요" 절대 금지

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
          title: "고용24 온라인 신청 방법"
          desc: "단계별 신청 화면 안내"
          href: "/w/고용24-실업급여"       # ← /w/ 위키 슬러그 필수
        - icon: "calculator"
          title: "예상 수령액 미리 계산"
          desc: "내 월급 기준 실업급여 금액"
          href: "/w/실업급여-계산"
    - when: { document: "no", registration: "not-yet" }
      pass: false
      headline: "아직 2가지가 남았어요"
      detail: "이직확인서 처리를 기다리면서 워크넷 구직등록을 먼저 해두세요. 동시에 진행할 수 있어요."
      badges: ["이직확인서 대기", "구직등록 필요"]
      links:
        - icon: "link"
          title: "워크넷 구직등록 방법"
          desc: "이력서 등록 + 희망직종 선택 순서"
          href: "/w/실업급여-워크넷"
        - icon: "link"
          title: "이직확인서 조회 방법"
          desc: "고용24 처리 여부 확인 경로"
          href: "/w/실업급여-이직확인서"
    - when: { document: "unknown" }
      pass: false
      headline: "이직확인서부터 확인해 보세요"
      detail: "고용24에서 '이직확인서 처리여부 조회'를 하면 돼요. 퇴사 후 10일 이내에 회사가 신고해야 해요."
      badges: ["확인 필요"]
      links:
        - icon: "link"
          title: "이직확인서 조회 방법"
          desc: "고용24에서 확인하는 경로"
          href: "/w/실업급여-이직확인서"
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
  <span class="ext-btn-cta">신청하기 →</span>
</a>
```

---

## 전체 구조 예시

```
서론 (막막함 공감)
[ctaCard]
[checker: 준비물 체크]
<br-pas → 선행 조건 확인>

## H2-1: 전체 절차 개요
  <steps: 단계별 시각 흐름>

## H2-2: 단계별 상세
  ### H3 1단계 상세
    <dbox or 서류 테이블>
  ### H3 2단계 상세

## H2-3: 시점별 타임라인
  ### 퇴사 당일
  ### 퇴사 후 1주
  ### 퇴사 후 2주

## H2-4: 자주 헷갈리는 점
  오해 Q&A blockquote
  <info.warn 주의사항>

[ext-btn 필수]
## 출처
```

---

## TSX 블로그 컴포넌트 (Blog TSX 전용)

MD 파일은 위 HTML class 패턴 사용. **Blog TSX 파일은 아래 JSX 컴포넌트 사용.**

### Steps — 단계별 절차 시각화

```tsx
import { Steps } from "@/components/wiki/BlogShared";

<Steps items={[
  {
    title: "이직확인서 처리 대기",
    desc: "퇴사 후 회사가 10일 이내에 고용보험에 신고해요. 고용24에서 처리 여부를 조회할 수 있어요."
  },
  {
    title: "워크넷 구직등록",
    desc: "work.go.kr에 접속해서 이력서를 등록하고 희망 직종을 선택해요."
  },
  {
    title: "수급자격 교육 이수",
    desc: "고용24에서 온라인 교육을 들어요. 약 1시간, 100% 수강해야 해요."
  },
  {
    title: "수급자격 인정 신청",
    desc: "고용센터 방문 또는 고용24 온라인으로 신청서를 제출해요."
  }
]} />
```

- `items`: 단계 배열 (최소 3개, 최대 6개)
- `title`: 행동 동사로 시작 (예: "이직확인서 처리 대기")
- `desc`: 각 단계 1~2문장 설명 (선택)
- 번호 원형 자동 생성 (1, 2, 3...)

### Info — 주의사항 박스

```tsx
import { Info } from "@/components/wiki/BlogShared";

<Info type="warn">
  퇴사 후 <strong>12개월 내</strong>에 신청해야 해요. 기간이 지나면 남은 수급기간이 있어도 받을 수 없어요.
</Info>

<Info type="tip">
  온라인 신청이 방문보다 빠르고 편해요. 고용24(work24.go.kr) 앱에서도 신청 가능해요.
</Info>
```

### 절차 섹션 구조 예시

```tsx
<Sec n="STEP 1" title="전체 신청 절차 한눈에" />
<P>처음 신청할 때 가장 헷갈리는 게 순서예요. ...</P>
<Steps items={[
  { title: "이직확인서 처리 확인", desc: "..." },
  { title: "워크넷 구직등록", desc: "..." },
  { title: "수급자격 교육 이수", desc: "..." },
  { title: "수급자격 인정 신청", desc: "..." }
]} />

<Sec n="STEP 2" title="단계별 상세 방법" />
<H3>1단계: 이직확인서 처리 확인</H3>
<P>...</P>
<Info type="warn">퇴사 후 10일이 지나도 처리 안 됐으면 고용센터에 직접 요청할 수 있어요.</Info>
```

**필수**: Steps 최소 1개 (3~4단계), Info(warn) 최소 1개

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
  Steps, FeatureList,
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
  sourceBar={{ badge: "출처", name: "출처명", date: "2026.02" }}
  stickyLabel="핵심 라벨"
  stickyValue="CTA 값"
  stickyBtn="CTA 버튼"
  disclaimer="이 글은 OO를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
  sidebar={<>
    <SidebarCTA items={[
      { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기", hot: true },
      { icon: "🏛️", title: "2026 정부지원금", sub: "30개+ 지원금", href: "/w/정부지원금" },
      { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
    ]} />
    <SidebarDocs items={[
      { title: "관련문서", cat: "카테고리·태그", href: "/w/슬러그" },
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
  title="다른 OO 신청도 비교해 보세요"
  items={[
    { icon: "📝", title: "관련 신청 글 1", desc: "한 줄 설명", href: "/w/슬러그1" },
    { icon: "📋", title: "관련 신청 글 2", desc: "한 줄 설명", href: "/w/슬러그2" },
    { icon: "🔍", title: "관련 신청 글 3", desc: "한 줄 설명", href: "/w/슬러그3" },
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

STEP 01: 체커 (CheckerShell + CheckerQ × 3~5 — 준비물 체크)
  ↓ Divider
SECTION 02: 키워드1 H2 — 전체 절차 개요
  Steps (3~6단계) + 서류 Table
  ↓ Divider
SECTION 03: 키워드2 H2 — 단계별 상세
  H3 × 3~4 + Info(warn) + InlineLink
  ↓ RelatedMid (본문 중간)
  ↓ Divider
SECTION 04: 키워드3 H2 — 시점별/상황별
  FeatureList or 사례 + BridgeCard
  ↓ Divider
SECTION 05: 키워드4 H2 — 주의사항/FAQ류
  Info(warn) + 오해 Q&A + BridgeCard + ExtBtn
  ↓ Divider
FAQ: FAQAccordion (2개)

<RelatedArticles items={[5개]} />
<PrevNext prev={{title,href}} next={{title,href}} />
```
