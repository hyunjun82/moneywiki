# 머니위키 글 작성 SKILL

## 개요
키워드 하나 → 타이틀 생성 → 소제목 분석 → 컴포넌트 자동 선택 → TSX 페이지 생성

---

## 0. 타이틀 생성 규칙

### 기본 공식
[핵심 상황/키워드], [독자 질문]?
[해결 범위] + [끝맺음 패턴]

### 좋은 예시
"퇴직금, 10년 근무하면 얼마 받을까? 계산법부터 세금까지"
"실업급여 받을 수 있을까? 자격 조건과 금액 계산법"
"전세 계약 전에 확인해야 할 것들, 사기 예방 체크리스트"
"기초생활수급자 조건, 2026년 소득 기준과 신청 방법"
"연차수당 못 받았다면? 청구 방법과 소멸시효"
"양도소득세 비과세, 1가구 1주택 조건과 계산법"

### 끝맺음 패턴 (반드시 다양하게)
- ~까지       예) 계산부터 신청까지
- ~계산법     예) 금액 계산법, 세금 계산법
- ~체크리스트 예) 사기 예방 체크리스트
- ~방법       예) 청구 방법, 신청 방법
- ~기준       예) 소득 기준, 자격 기준
- ~조건       예) 수급 조건, 신청 조건

같은 카테고리 글끼리 동일 끝맺음 패턴 3회 이상 금지.

### 톤
- 정보형·실용형 (위키 스타일)
- 블로그형 금지: "~정리했어요", "~알아봤어요" (필자 중심)
- 구어체 유지: "~할까?", "~됐다면?" 허용

### 금지
- "총정리", "완벽정리", "A to Z", "한눈에"
- "알아보겠습니다", "살펴보겠습니다"
- 파이프형 (|) 타이틀
- 40자 초과

### 체크 (생성 전 확인)
- 독자 상황 또는 핵심 키워드가 앞에 있는가?
- 끝맺음 패턴이 같은 카테고리 다른 글과 겹치지 않는가?
- 구어체인가?
- 40자 이내인가?

---

## 0-1. 소제목(H2) 설정 규칙

### 핵심 원칙
**H2 = 타이틀 line2 키워드를 섹션별로 펼치는 것**

```
타이틀: "이혼 후 양육비, 얼마나 받을 수 있을까?"
        "법원 기준표 계산부터 청구 절차까지"
         ↓           ↓         ↓
H2-1: 양육비, 누가 얼마나 내야 하나?     ← 기준표/개념
H2-2: 나는 양육비를 청구할 수 있을까?    ← 자격 체크
H2-3: 양육비 청구에 필요한 서류          ← 청구 준비
H2-4: 양육비 청구 절차 4단계            ← 절차
H2-5: 청구 전 준비 체크리스트            ← 행동 유도
H2-6: 자주 묻는 것들                    ← 고정
```

### 5+1 구조

| 순서 | 역할 | 톤 | 컴포넌트 연동 |
|------|------|-----|------------|
| H2-1 | 핵심 개념/자격 기준 | 질문형 | EligibilityChecker |
| H2-2 | 금액/계산 or 케이스 비교 | 질문형 | Calculator |
| H2-3 | 서류/증빙 | 서술형 | DocTable, Checklist |
| H2-4 | 절차/방법 | 서술형 + 단계수 | Steps |
| H2-5 | 준비/주의사항 | 행동형 | Checklist, GreenBox |
| H2-6 | 자주 묻는 것들 | 고정 | FAQ |

### 톤 배분
- 질문형 2개 + 서술형 2개 + 행동형 1개
- 같은 톤 3연속 금지
- 타이틀 line2 키워드가 H2에 최소 3개 반영

### 금지
- H2에 숫자 번호 금지 (## 1. 제목 X)
- H2에 "총정리", "완벽정리" 금지
- H2에 대시(ㅡ, —) 금지

---

## 1. 파일 구조

```
src/app/w/{slug}/
├── page.tsx      ← "use client" 인터랙티브 글
└── layout.tsx    ← metadata export (title, og, canonical)
```

### page.tsx 구조
```tsx
"use client";
import { useState } from "react";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body } from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
// 필요한 컴포넌트만 import

// ─── 이 글의 데이터 ───
const FAQS = [...];
const REFERENCES = [...];
// 컴포넌트별 데이터 상수

// ─── 이 글 전용 계산기 (있는 경우만) ───
function Calculator() { ... }

// ─── 페이지 ───
export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem",
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>카테고리</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>제목</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>서론</p>
      <Divider />
      {/* 섹션들 — 각 섹션에 컴포넌트 1개씩 */}
      <H2>소제목 1</H2>
      <p style={body}>본문...</p>
      <GreenBox title="요약">...</GreenBox>
      <SectionBadge>라벨</SectionBadge>
      {/* 매칭된 컴포넌트 */}
      <Divider />
      {/* 반복 */}
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 ..." />
    </div>
  );
}
```

### layout.tsx 구조
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글 제목 | 머니위키",
  description: "metaDescription 155자 이내",
  alternates: { canonical: "https://www.jjyu.co.kr/w/{slug}" },
  openGraph: {
    title: "글 제목 | 머니위키",
    description: "metaDescription",
    url: "https://www.jjyu.co.kr/w/{slug}",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

---

## 2. 컴포넌트 매핑 테이블

### BASIC — 모든 주제 공통 (6개)

| # | 컴포넌트 | 트리거 키워드 | 형태 | 용도 |
|---|---------|------------|------|------|
| 1 | Calculator | 얼마, 계산, 금액, 수령액 | 슬라이더형 | 퇴직금, 실업급여, 양육비, 건보료, 종합소득세, 연금, 이자, 대출 원리금 |
| 2 | EligibilityChecker | 자격, 대상, 조건, 해당되는지 | 체크박스형 | 청년도약계좌, 실업급여, 기초생활수급, 육아휴직, 양육비, 지원금 전체 |
| 3 | Steps | 절차, 방법, 순서, 어떻게 | 스테퍼형 | 모든 신청, 청구, 소송, 등기, 대출 절차 |
| 4 | DocTable | 서류, 준비물, 목록 | 테이블형 | 모든 신청 서류, 제출 서류, 준비물 목록 |
| 5 | Checklist | 준비, 챙겨야, 미리 | 체크리스트형 | 사전 준비 항목, 신청 전 확인사항 |
| 6 | FAQ | 자주 묻는, Q&A, 궁금한 | 아코디언형 | 모든 주제 공통. 5~7개 항목 |

### EXTENDED — 주제별 특화 (10개)

| # | 컴포넌트 | 트리거 키워드 | 형태 | 용도 |
|---|---------|------------|------|------|
| 7 | CompareTable | vs, 차이, 비교, 어떤게 나은 | 비교표형 | 협의이혼 vs 재판이혼, 1세대실손 vs 4세대, 전세 vs 월세, ISA vs 연금저축 |
| 8 | Timeline | 기간, 언제까지, 기한, 일정 | 타임라인형 | 종합소득세 신고기간, 건보료 정산일정, 청약 일정, 이혼 숙려기간 |
| 9 | IncomeBracket | 소득기준, 중위소득, 분위, 이하 | 소득분위형 | 기초생활수급, 청년주거급여, 복지지원금, 건보료 기준 전체 |
| 10 | TaxRateTable | 세율, 구간, 과세표준, 누진 | 세율표형 | 종합소득세, 양도소득세, 상속세, 증여세, 취득세 세율 구간 전체 |
| 11 | DateCalc | 며칠, 몇 개월, 기산일, 만료 | 날짜계산형 | 퇴직금 근속년수, 실업급여 대기기간, 청약 거주기간, 소멸시효 계산 |
| 12 | FlowChart | 경우에 따라, 해당하면, 조건 분기 | 흐름도형 | 이혼 유형 판단, 실업급여 수급 자격, 건보 피부양자 자격 분기 |
| 13 | PenaltyTable | 가산세, 과태료, 벌금, 미신고 | 가산세·과태료형 | 종합소득세 미신고, 건보 미납, 양육비 미지급 제재 전체 |
| 14 | RegionTable | 지역별, 시도별, 지자체 | 지역별 차이형 | 지역별 청년지원금, 지자체 출산장려금, 지역별 취득세 감면 |
| 15 | DiagnoseCard | 내게 맞는, 추천, 유리한, 어떤 게 좋아 | 진단·추천형 | 내게 맞는 보험 유형, 적금 vs ETF vs 연금저축, 재판 vs 협의이혼 |
| 16 | SupportAmountCard | 얼마 받아요, 지원금액, 수령액 | 지원금 결과형 | 정부지원금, 청년수당, 에너지바우처, 주거급여 금액 표시 |

---

## 3. 컴포넌트 선택 규칙

### Claude Code 지시 원칙
1. 소제목 텍스트 분석 → 트리거 키워드 매칭 → 컴포넌트 자동 선택
2. 매칭 안 되면 → `GreenBox`(강조) 또는 `BorderBox`(정보) 텍스트 처리
3. **한 소제목에 컴포넌트 1개만. 중복 금지.**
4. 글 전체에서 같은 컴포넌트 2번 사용 가능 (예: Calculator 2개는 안 됨, 하지만 Steps + Checklist는 됨)

### ★ 필수 컴포넌트 배치 규칙 (절대 생략 금지)

**모든 글에 최소 4종 인터랙티브 컴포넌트 필수:**

| H2 키워드 | 필수 컴포넌트 | 생략 시 |
|----------|------------|--------|
| "얼마" "계산" "금액" "수령액" | **Calculator** (슬라이더형) | 글 작성 불가 |
| "자격" "조건" "대상" "해당" | **EligibilityChecker** (체크박스형) | 글 작성 불가 |
| "절차" "방법" "순서" "단계" | **Steps** (스테퍼형) | 글 작성 불가 |
| "서류" "준비물" "목록" | **DocTable** (테이블형) | 글 작성 불가 |
| "준비" "챙겨야" "미리" | **Checklist** (체크리스트형) | 글 작성 불가 |
| "자주 묻는" "Q&A" | **FAQ** (아코디언형, 5~7개) | 글 작성 불가 |

**키워드 매칭 안 되는 섹션 → GreenBox 또는 BorderBox**
**모든 글 = EligibilityChecker(필수) + FAQ(필수) + H2별 매칭 컴포넌트 2종 이상**

### 글 작성 완료 전 체크 (빠뜨리면 재작성)
- [ ] H2에 "얼마/계산/금액" 키워드 → Calculator 넣었나?
- [ ] H2에 "절차/방법/단계" 키워드 → Steps 넣었나?
- [ ] H2에 "서류/준비물" 키워드 → DocTable 넣었나?
- [ ] H2에 "준비/챙겨" 키워드 → Checklist 넣었나?
- [ ] EligibilityChecker 있나?
- [ ] FAQ 5개 이상 있나?
- [ ] 최소 4종 인터랙티브 컴포넌트가 들어갔나?

### 주제별 컴포넌트 조합 예시

```
퇴직금       → EligibilityChecker + Calculator + Steps + DocTable + Checklist
실업급여     → EligibilityChecker + Calculator + DateCalc + Steps
양도소득세   → TaxRateTable + Calculator + Timeline + PenaltyTable
청년지원금   → IncomeBracket + SupportAmountCard + RegionTable + Steps
이혼 양육비  → EligibilityChecker + Calculator + Steps + DocTable + Checklist
전세대출     → EligibilityChecker + CompareTable + Steps + DocTable
연말정산     → Calculator + TaxRateTable + Checklist + Timeline
기초생활수급 → IncomeBracket + EligibilityChecker + SupportAmountCard + Steps
```

---

## 4. 컴포넌트 Props 인터페이스

### BASIC

```typescript
// Calculator — src/components/article-ui/Calculator.tsx
// 계산 로직은 getValue로 외부 주입 — 컴포넌트 내부 로직 없음
interface SliderConfig { id: string; label: string; min: number; max: number; step: number; defaultValue: number; format: (v: number) => string; }
interface ResultConfig { label: string; getValue: (inputs: Record<string, number>) => number; format: (v: number) => string; highlight?: boolean; }
props: { title?: string; sliders: SliderConfig[]; results: ResultConfig[]; note?: string; }

// EligibilityChecker
interface CheckItem { id: string; label: string; }
props: { items: CheckItem[]; allMatchText?: string; partialMatchText?: string; }

// Steps
interface StepItem { title: string; desc: string; tip?: string; }
props: { steps: StepItem[]; }

// DocTable
interface DocItem { name: string; required: boolean; where: string; }
props: { docs: DocItem[]; }

// Checklist
props: { items: string[]; }

// FAQ
interface FAQItem { q: string; a: string; }
props: { items: FAQItem[]; }

// References
interface RefItem { label: string; url: string; }
interface RefGroup { category: string; items: RefItem[]; }
props: { groups: RefGroup[]; }

// Disclaimer
props: { text: string; }
```

### EXTENDED

```typescript
// CompareTable
interface CompareRow { label: string; optionA: string; optionB: string; }
props: { titleA: string; titleB: string; rows: CompareRow[]; }

// Timeline
interface TimelineItem { date: string; label: string; desc?: string; active?: boolean; }
props: { items: TimelineItem[]; }

// IncomeBracket
interface BracketRow { bracket: string; income: string; benefit: string; }
props: { title: string; rows: BracketRow[]; note?: string; }

// TaxRateTable
interface TaxRow { bracket: string; rate: string; deduction: string; }
props: { title: string; rows: TaxRow[]; note?: string; }

// DateCalc — 글마다 고유 로직이므로 글 내부에 직접 작성.

// FlowChart
interface FlowNode { question: string; yes: string | number; no: string | number; }
interface FlowResult { id: number; text: string; color?: "green" | "red" | "gray"; }
props: { nodes: FlowNode[]; results: FlowResult[]; }

// PenaltyTable
interface PenaltyRow { violation: string; penalty: string; note?: string; }
props: { title: string; rows: PenaltyRow[]; }

// RegionTable
interface RegionRow { region: string; amount: string; condition?: string; }
props: { title: string; rows: RegionRow[]; note?: string; }

// DiagnoseCard
interface DiagnoseOption { label: string; desc: string; pros: string[]; cons: string[]; best: string; }
props: { question: string; options: DiagnoseOption[]; }

// SupportAmountCard
interface SupportTier { tier: string; amount: string; condition: string; }
props: { title: string; tiers: SupportTier[]; note?: string; }
```

---

## 5. 스타일 규칙

### 컬러 시스템
- 메인 그린: `#1D9E75`
- 메인 그린 배경: `#E1F5EE`
- 메인 그린 텍스트: `#0F6E56` (뱃지), `#085041` (박스 텍스트)
- 보더 그린: `#9FE1CB`
- 본문: `#374151` (body), `#111` (제목)
- 서브텍스트: `#6b7280`, `#9ca3af`
- 보더: `#e5e7eb`, `#f3f4f6`
- 배경: `#f9fafb`

### 본문 스타일
```typescript
const body: React.CSSProperties = {
  fontSize: 14, color: "#374151", lineHeight: 2.05, marginBottom: "0.95rem"
};
```

### 인라인 스타일 사용 (Tailwind 아님)
- 모든 컴포넌트는 `style={{}}` 인라인 스타일
- 이유: "use client" 페이지에서 CSS 의존성 최소화, 독립적 렌더링

---

## 6. 글쓰기 규칙

### ★ 문제해결 100% (최우선 원칙)
- 독자가 타이틀을 보고 클릭해서 들어왔을 때, **이 글 하나로 문제가 100% 해결**돼야 함
- "다른 글을 또 찾아봐야 하네" → 실패. 이탈 → 순위 하락
- 구체적 숫자, 실전 예시, 조건 분기, 행동 단계까지 빠짐없이
- 타이틀이 약속한 내용을 본문이 전부 이행해야 노출됨

### ★ 내부링크 거미줄 (나무위키 스타일)
- 본문에서 다른 주제를 언급할 때 **내부 글 링크 우선** (외부 법령 링크는 보조)
- 글당 2~4개 내부링크 자연스럽게 삽입 (첫 언급만 링크)
- 예: "임금체불" → `<a href="/w/임금체불-실업급여">임금체불</a>`
- 89개 실업급여 글끼리 거미줄처럼 연결

### 구어체 필수
- "~해요", "~이에요", "~예요", "~거든요", "~하죠"
- "~합니다", "~입니다" **절대 금지**
- metaDescription만 문어체 허용

### 서론 (h1 아래)
- 독자의 고민을 먼저 짚음 (질문형 또는 공감형)
- 핵심 답변 2~3줄
- "모르면 손해", "그냥 넘어가면 그 돈 전부 포기" 같은 동기 부여

### 텍스트 분량 규칙
- 소제목 하나당:
  - **컴포넌트 앞**: 2~3문단 (맥락 설명, 왜 이게 중요한지)
  - **컴포넌트 뒤**: 1~2문단 (보충 설명, 실전 팁, 주의사항)
  - 문단당 2~4문장
  - **1~2줄짜리 섹션 절대 금지**
- 전문 용어 → 괄호 설명
- 3문장 연속 같은 어미 금지
- 3문장 연속 같은 단어로 시작 금지

### 텍스트 톤 규칙
- **독자한테 직접 말 걸기**:
  - "많은 분들이 이렇게 생각해요"
  - "근데 사실은 이래요"
  - "이게 중요한 이유가 있어요"
- **섹션 시작 = 독자 질문/상황으로**:
  - "상대방이 안 준다고요?"
  - "소득이 없다고 하면 어쩔 수 없는 거 아닌가요?"
- **컴포넌트 뒤 마무리 = 행동 유도로**:
  - "이 숫자 꼭 기억해두세요"
  - "지금 바로 체크해보세요"
  - "이것부터 챙겨두면 훨씬 빨라져요"

### FAQ
- 5~7개 (기존 3개에서 확장)
- 손석희 스타일: 핵심을 찌르는 구체적 질문
- 좋은 예: "상대방이 '나 백수야, 돈 없어' 하면요?"
- 나쁜 예: "양육비란 무엇인가요?"

### 출처
- 법령, 판례, 공식 자료로 분류
- 모든 URL은 실제 존재하는 공식 사이트
- 글 하단 면책 고지 필수

### 금지 단어
- "또한", "결론적으로", "다양한", "매우 중요" (AI 냄새)
- "~에 대해 알아보겠습니다", "~자세히 살펴보겠습니다" (filler)
- "확인하세요" (intro, ogDescription 전체)
- "총정리" (title 어디서도)
- "있거든요", "있어요" (본문 전체 사용 금지 — "~있죠", "~있고요", "~이에요" 등으로 대체)

---

## 7. 글 작성 절차

### Step 0: 계산기/양식 페이지 체크 (리라이트 전 필수!)
1. `content/wiki/{slug}.md`의 `schemaType` 확인
2. `schemaType: calculator` 또는 `schemaType: form` → **리라이트 금지, 절대 덮어쓰지 않음**
3. `src/components/calculators/` 에 해당 계산기 컴포넌트가 있는지 확인
4. 계산기 페이지는 기존 MD가 렌더링하는 그대로 유지

### Step 1: 키워드 분석
1. 키워드를 받으면 **신규/리라이트** 먼저 확인
2. 검색 의도 파악: "이 키워드를 검색한 사람이 진짜 알고 싶은 게 뭔가?"
3. 소제목 5~6개 설계

### Step 2: 컴포넌트 매핑
1. 각 소제목 → 트리거 키워드 매칭 → 컴포넌트 선택
2. 매칭 안 되면 GreenBox 또는 BorderBox
3. 한 소제목에 1개만, 중복 금지 확인

### Step 3: 소스 확보
1. 공식 출처에서 데이터 확보 (WebFetch 우선, WebSearch fallback)
2. 소스에 없는 정보로 팩트 채우기 **절대 금지**
3. 법령: law.go.kr / 세금: nts.go.kr / 복지: bokjiro.go.kr 등

### Step 4: 글 작성
1. page.tsx + layout.tsx 생성
2. 데이터 상수 → 컴포넌트 import → 페이지 조합
3. 구어체, 기승전결, 논리적 흐름 준수

### Step 5: 검증
1. `npm run build` — 빌드 성공 확인
2. 구어체 위반 없는지 확인
3. 금지 단어 없는지 확인
4. 모든 URL 실제 존재 확인

---

## 8. 레퍼런스 템플릿

완성 글 기준: `src/app/w/양육비-청구/page.tsx`

**글 작성 전 이 파일 반드시 읽을 것.**
구조·톤·데이터 패턴 전부 이 파일 기준.

---

## 9. 조립 패턴

### 서론
"[독자 고민]?" → 핵심 답변 1줄 → 동기부여 1줄 (모르면 손해) → 이 글로 해결된다 1줄

### 섹션 (매 섹션 반복)
텍스트 2~3문단 → SectionBadge → 컴포넌트 1개 → 마무리 1~2문단 (행동유도)

### GreenBox
개념 설명 직후 배치. 제목은 "이것만 기억해요"

### 데이터
파일 상단 const 전체 선언 → JSX에서 props로 주입
계산 로직은 getValue 외부 주입, 컴포넌트 내부 로직 없음
