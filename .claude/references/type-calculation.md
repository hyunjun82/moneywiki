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

- **테이블: 최소 2개** (공식 설명 + 시뮬레이션 최소 1인분)
- **formula 박스**: 핵심 공식 1~2개
- **dbox**: 변수 설명 목록
- **mark**: 상한/하한 금액, 핵심 비율 최소 3곳
- 모든 테이블 위에 H3 또는 H4 캡션 필수
- 텍스트 → 테이블 순서 (테이블만 덜렁 금지)

---

## formula 박스: 핵심 공식

```html
<div class="formula">
  <div class="main">1일 지급액 = 퇴직 전 3개월 평균임금 × 60%</div>
  <div class="sub">2026년 상한액: 일 68,100원 / 하한액: 일 63,104원<br>소정급여일수: 피보험기간·나이별 120~270일</div>
</div>
```

---

## dbox: 변수 설명 목록

```html
<div class="dbox">
  <div class="dbox-h">실업급여 계산에 필요한 3가지 변수</div>
  <div class="dbox-item">
    <div class="dbox-idx">1</div>
    <div class="dbox-text">
      <h4>퇴직 전 3개월 평균임금</h4>
      <p>세전 급여 기준. 퇴직 직전 3개월 총 임금 ÷ 총 일수로 계산해요</p>
    </div>
  </div>
  <div class="dbox-item">
    <div class="dbox-idx">2</div>
    <div class="dbox-text">
      <h4>피보험기간 (고용보험 가입기간)</h4>
      <p>이직일 이전 18개월 중 고용보험에 가입된 기간이에요</p>
    </div>
  </div>
  <div class="dbox-item">
    <div class="dbox-idx">3</div>
    <div class="dbox-text">
      <h4>이직 당시 나이</h4>
      <p>수급기간(소정급여일수)에 영향을 줘요. 50세 이상 + 장기 근무일수록 유리해요</p>
    </div>
  </div>
</div>
```

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

시뮬레이션 H3 뒤 → `.br-pas` 배치:

```html
<a href="/w/실업급여-계산기" class="br-pas">
  <p class="br-pas-q">내 금액이 예시와 달라서 직접 계산하고 싶으신가요?</p>
  <p class="br-pas-a">월급과 근무기간만 입력하면 <strong>30초</strong>에 정확한 금액이 나와요.</p>
  <span class="br-pas-btn">실업급여 계산기 →</span>
</a>
```

---

## Checker: 입력 → 계산 결과

**체커 links.href 우선순위 (중요!)**
1. `/w/위키슬러그` — 관련 위키 글 (최우선)
2. `/calculators/슬러그` — 내부 계산기
3. 정부 딥링크 — 진짜 직접 조회 불가한 경우만
- **TSX hub/spoke URL 절대 금지**

**checker 문구 Anti-AI 규칙**
- `subtitle`: "30초 계산" "바로 확인" — OK / "결과에서 해당 글 확인하세요" 금지
- `detail`: ~해요체 강제. "~합니다" "~확인하세요" 절대 금지
- `links[].desc`: 클릭하면 뭘 볼 수 있는지 구체적으로

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
      detail: "평균임금의 60%가 하한액보다 낮아서 2026년 기준 일 63,104원이 적용돼요."
      badges: ["하한액 적용", "일 63,104원"]
      links:
        - icon: "calculator"
          title: "하한액 적용자 실수령액 계산"
          desc: "1년 미만 근무자 실제 수령 금액"
          href: "/w/실업급여-하한액"        # ← /w/ 위키 슬러그 필수
        - icon: "document"
          title: "실업급여 신청 방법"
          desc: "고용24 온라인 신청 절차"
          href: "/w/실업급여-신청-방법"
    - when: { income: "over300", workYears: "over10" }
      pass: true
      headline: "상한액 근처예요"
      detail: "평균임금이 높으면 상한액(일 68,100원)이 적용될 수 있어요. 수급기간은 최대 270일이에요."
      badges: ["상한액 주의", "최대 270일"]
      links:
        - icon: "calculator"
          title: "수급기간 확인하기"
          desc: "나이·근무기간별 소정급여일수"
          href: "/w/실업급여-수급기간"
  default:
    pass: false
    headline: "조건을 선택해 주세요"
    detail: "월급과 근무기간을 선택하면 예상 수령액을 바로 알려드려요."
    badges: []
    links: []
```

---

## mark 태그: 핵심 금액/비율 (최소 3곳)

```markdown
실업급여 1일 지급액은 <mark>**퇴직 전 평균임금의 60%**</mark>예요.
2026년 상한액은 <mark><strong>일 68,100원</strong></mark>이에요.
하한액은 <mark><strong>일 63,104원</strong></mark>이에요.
```

---

## ext-btn: 필수

정부 계산기/조회 사이트로 연결. 행동 키워드가 있으니 반드시 배치.

```html
<a href="딥링크" target="_blank" rel="noopener noreferrer" class="ext-btn ext-btn-blue">
  <span class="ext-btn-badge">무료 계산</span>
  <span class="ext-btn-text">서비스명</span>
  <span class="ext-btn-cta">계산하기 →</span>
</a>
```

---

## 전체 구조 예시

```
서론 (숫자 충격)
[ctaCard]
[checker: 입력값 → 결과]

## H2-1: 기본 계산 공식
  <formula 박스>
  <dbox: 변수 설명>

## H2-2: 변수별 상세
  ### H3 소주제
    테이블
  ### H3 소주제
    테이블

## H2-3: 시뮬레이션 (3인 페르소나)
  ### 인물A — 테이블 시뮬
  ### 인물B — 서술형
  ### 인물C — 비교표
  <br-pas → 계산기>

## H2-4: 예외/주의사항
  <info.warn 핵심 주의>
  오해 Q&A

[ext-btn]
## 출처
```

---

## TSX 블로그 컴포넌트 (Blog TSX 전용)

MD 파일은 위 HTML class 패턴 사용. **Blog TSX 파일은 아래 JSX 컴포넌트 사용.**

### FormulaCard — 공식 박스

```tsx
import { FormulaCard } from "@/components/wiki/BlogShared";

<FormulaCard
  formula="1일 지급액 = 퇴직 전 3개월 평균임금 × 60%"
  notes={[
    "2026년 상한액: 일 68,100원",
    "2026년 하한액: 일 63,104원",
    "소정급여일수: 피보험기간·나이별 120~270일"
  ]}
/>
```

- `formula`: HTML 문자열 허용 (`<br>`, `<strong>` 등)
- `notes`: 보조 설명 배열 (선택)

### CaseBox — 계산 예시 (3인 페르소나 각각 적용)

```tsx
import { CaseBox } from "@/components/wiki/BlogShared";

<CaseBox
  badge="예시 1"
  label="직장인 박 대리(35세), 월급 280만 원"
  conditions={["피보험기간: 3년 2개월", "나이: 35세"]}
  steps={[
    { label: "평균임금 × 60%", value: "1,680,000 × 60% = 1,008,000원" },
    { label: "일 지급액", value: "33,600원" },
    { label: "소정급여일수", value: "150일" }
  ]}
  total="총 수령 예상: 약 504만 원"
  result="수급 가능 (상한액 이하)"
  pass={true}
/>
```

- `badge`: "예시 1" / "예시 2" / "예시 3" 등 레이블
- `conditions`: 인물 조건 목록 (선택)
- `steps`: 계산 단계별 항목 (선택)
- `total`: 최종 합계 표시 (선택)
- `result`: 결과 판정 문구 (필수)
- `pass`: `true` = 녹색, `false` = 빨간색

### 시뮬레이션 섹션 구조 예시

```tsx
<H3>직장인 박 대리(35세), 월급 280만 원</H3>
<P>평균임금 기준 월 168만 원 수령 예상이에요. ...</P>
<CaseBox badge="예시 1" label="박 대리 계산 결과" ... pass={true} />

<H3>경력 15년 김 과장(48세), 연봉 6,000만 원</H3>
<P>상한액 적용으로 실수령 감소 케이스예요. ...</P>
<CaseBox badge="예시 2" label="김 과장 계산 결과" ... pass={true} />

<H3>단기 계약직 이 씨(27세), 7개월 근무</H3>
<P>피보험기간 미달 가능성이 있어요. ...</P>
<CaseBox badge="예시 3" label="이 씨 계산 결과" ... pass={false} />
```

**필수**: CaseBox 3개 (3인 페르소나), FormulaCard 최소 1개

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
  FormulaCard, CaseBox,
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
  stickyLabel="핵심 숫자 라벨"
  stickyValue="금액"
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
  title="다른 OO 계산도 비교해 보세요"
  items={[
    { icon: "🧮", title: "관련 계산 글 1", desc: "한 줄 설명", href: "/w/슬러그1" },
    { icon: "📊", title: "관련 계산 글 2", desc: "한 줄 설명", href: "/w/슬러그2" },
    { icon: "💡", title: "관련 계산 글 3", desc: "한 줄 설명", href: "/w/슬러그3" },
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
  ↓ Divider
SECTION 02: 키워드1 H2 — 기본 공식
  FormulaCard + dbox(FeatureList) + Table
  ↓ Divider
SECTION 03: 키워드2 H2 — 변수별 상세
  Table 2개 + Info(warn)
  ↓ RelatedMid (본문 중간)
  ↓ Divider
SECTION 04: 키워드3 H2 — 시뮬레이션
  CaseBox × 3 (3인 페르소나) + BridgeCard
  ↓ Divider
SECTION 05: 키워드4 H2 — 실수령/예외
  Table + BridgeCard + ExtBtn
  ↓ Divider
FAQ: FAQAccordion (2개)

<RelatedArticles items={[5개]} />
<PrevNext prev={{title,href}} next={{title,href}} />
```
