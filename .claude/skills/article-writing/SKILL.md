# 머니위키 글 작성 SKILL

## 개요
키워드 하나 → 필수 사고(Q1-Q4) → 타이틀 생성 → 소제목 분석 → 컴포넌트 자동 선택 → TSX 페이지 생성

---

## ★ 필수 사고 (Step 0 — 모든 글의 첫 단계)

글 작성 전에 아래 4개 질문에 답한다. 이 답이 타이틀·H2·컴포넌트를 결정한다.
답은 파일 상단 주석 블록으로 남긴다.

Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
Q2-1. 이 행동을 완료하려면 독자가 마지막으로 클릭해야 하는 곳은 어딘가? (내부 비교 페이지, 외부 신청 링크, 계산기 등)
Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
Q4. 이 정보를 가장 잘 전달하는 형태는? (16개 컴포넌트 중 선택)

Q1~Q4 + Q2-1 답은 각각 구체적인 한 문장으로 쓴다.
"궁금해서", "알고 싶어서" 같은 일반적 답 금지.

### Q2 답이 글의 형태를 결정한다
- Q2가 "비교해서 고른다" → 텍스트 짧게 + CompareTable 중심. 표 안에서 판단 가능하게
- Q2가 "권리/조건을 정확히 파악한다" → 텍스트 풀어서 + 조건 분기 빠짐없이. 법률/제도는 디테일이 핵심
- Q2가 "신청한다" → Steps 중심 + 마지막에 신청 링크/딥링크
- Q2가 "계산한다" → Calculator 중심 + 결과 해석 텍스트
- 글의 형태를 미리 정해놓고 끼워맞추지 않는다. Q2 답이 형태를 결정한다

### Q3 깊이 요구사항 (텍스트 밀도 = 노출 여부 결정)

Q3을 "조건, 금액, 절차" 수준에서 끝내면 글이 얇아진다. 각 H2 섹션마다 아래 3가지를 반드시 포함한다:

1. **예외/변수**: "상여금을 비정기적으로 받으면?", "IRP 계좌가 없으면?", "14일이 주말이면?"
2. **저항/장애물**: "인사팀이 서류를 안 주면?", "회사가 거부하면?", "소멸시효가 지났으면?"
3. **실제 상황**: "3개월치 급여명세서를 어디서 받나요?", "4대보험 내역으로 대체 가능한가요?"

이 3가지를 쓰면 자연스럽게 각 섹션 300자, 전체 2,000자를 채울 수 있다.
verify-tsx-article.js가 p태그 텍스트를 자동 계측 → 300자/2,000자 미달이면 FAIL로 통과 불가.

### Q→구조 연결 규칙
- Q2 답 → 타이틀 line2 + H2 순서 + 글 형태 결정
- Q2-1 답 → 마지막 섹션의 행동 완료 링크/도구 결정
- Q3 답 → H2 개수·깊이 + 각 섹션 예외/저항/실제상황 결정
- Q4 답 → 섹션별 컴포넌트 결정
- Q1 답 → 도입부 톤·문장 결정

---

## ★ 토스피드 원칙 (글쓰기 최상위 기준)

토스피드가 왜 잘 읽히는가? 다섯 가지다.

### 1. 독자 중심 — 20대~80대 누구나 이해
- 모든 문장을 쓸 때 "이 문장을 읽는 사람이 뭘 얻는가?" 기준으로 판단한다
- 글쓴이가 전달하고 싶은 것이 아니라, 독자가 알아야 하는 것을 쓴다
- 전문 용어 뒤 반드시 괄호로 설명: `평균임금(퇴직 전 3개월 급여 평균)`
- 한 문장 = 한 개념. 두 개 이상 개념 묶지 않음
- "법적으로", "행정적으로" 식 불필요한 수식 제거

### 2. 핵심만, 군더더기 없이
- 짧은 글 ≠ 좋은 글. **불필요한 문장 없는 글** = 좋은 글
- "이 글에서는 ~에 대해 알아볼게요" 같은 도입 filler 전면 금지
- 모든 문장이 "이 문장이 독자에게 필요한가?"를 통과해야 함
- 전환 문장도 정보를 담아야 함: "그런데요" → "14일이 지나면 이자가 붙어요"

### 3. 타이틀 + 소제목 = 검색자 의도 100%
- 타이틀 line1: 독자 상황/고민 (검색어 그 자체)
- 타이틀 line2: 이 글로 해결되는 것 (끝맺음 패턴)
- 소제목: 타이틀 line2 키워드를 섹션별로 펼침 (SKILL.md `## 0-1` 참조)
- 독자가 소제목만 훑어봐도 "다 있네" 느껴야 함

### 4. 소제목마다 시각화 세트
- 구조: 텍스트 2~3문단 → `SectionBadge` → 컴포넌트 1개 → 마무리 1~2문단
- 텍스트만 있는 섹션 금지. 시각화 없으면 GreenBox라도 넣음
- EligibilityChecker / Calculator / Steps / DocTable / Checklist / FAQ 중 매칭 컴포넌트 우선

### 5. 방문자 문제해결 100%
- 독자가 이 글 하나 읽고 행동할 수 있어야 함
- "자세한 건 전문가에게" 같은 회피 금지
- 조건 분기가 있으면 전부 커버: A면 이렇게, B면 저렇게
- 글 끝에 "지금 당장 할 수 있는 것" 1가지 명확히

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

### ★ 최상위 원칙: 타이틀이 묻는 질문에 H2-1이 바로 답한다

독자는 타이틀을 보고 클릭해서 들어옴. 첫 섹션(H2-1)에서 바로 답을 줘야 함.
같은 "퇴직연금" 주제도 타이틀이 다르면 H2 구조가 완전히 달라져야 함.

**H2 = 타이틀 line2 키워드를 섹션별로 펼치되, 검색 의도에 맞는 순서로 배치**

### 검색 의도 분류 (타이틀 → H2 순서 결정)

타이틀 line1의 질문 유형에 따라 H2-1(첫 섹션)과 컴포넌트 배치가 달라짐.
`node scripts/suggest-structure.js "타이틀"` 실행하면 자동 제안을 받을 수 있음.

| 의도 | 타이틀 신호 | H2-1 (결론 먼저) | 이후 흐름 |
|------|-----------|-----------------|----------|
| **얼마형** | ~얼마, ~세금, ~금액, ~수령액 | Calculator (답 먼저) | 구조설명(GreenBox) → Steps → Checklist |
| **가능형** | ~할 수 있나, ~되나요, ~가능 | GreenBox(결론) + EligibilityChecker | Calculator → Steps |
| **방법형** | ~방법, ~어떻게, ~절차, ~신청 | Steps (절차 먼저) | DocTable → Calculator → Checklist |
| **비교형** | ~vs, ~차이, ~어떤 게, ~뭐가 나은 | CompareTable 또는 DiagnoseCard | Calculator → Steps |
| **개념형** | ~란, ~이란, ~이 뭔가요, ~무엇 | GreenBox(정의) + BorderBox(구조) | EligibilityChecker → Calculator |

### 컴포넌트 배치·선택 → `## 3` 참조

**주의**: 위 의도 분류 테이블은 H2-1 컴포넌트의 **출발점**일 뿐이다. Q1-Q4 답에 따라 H2 순서와 컴포넌트가 달라져야 한다. 테이블을 그대로 복사하지 않는다.

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

### ★ 컴포넌트 선택 규칙 (검색 의도 기반)

**원칙: 타이틀의 검색 의도에 맞는 컴포넌트만 선택. 주제에 안 맞는 컴포넌트 억지 삽입 금지.**

| 컴포넌트 | 언제 사용 | 언제 빼야 함 |
|----------|---------|------------|
| Calculator | 금액/세금/수령액 계산이 핵심일 때 | 숫자 계산이 불필요한 개념형 글 |
| EligibilityChecker | 법정 자격 조건이 있을 때 | 누구나 해당하는 주제 (퇴직소득세 계산 등) |
| Steps | 절차/방법이 있을 때 | 절차가 없는 개념 설명형 글 |
| DocTable | 서류/준비물이 있을 때 | 서류가 불필요한 주제 |
| Checklist | 점검 항목이 있을 때 | 점검할 게 없는 주제 |
| FAQ | **모든 글에 필수** (5~7개) | 절대 생략 금지 |

**필수 조건:**
- 컴포넌트 최소 3종 + FAQ
- 텍스트만 있는 섹션 금지 → GreenBox 또는 BorderBox라도 넣기
- H2-1 컴포넌트 = 타이틀 질문에 대한 직접적 답

### 글 작성 완료 전 체크
- [ ] H2-1이 타이틀 질문에 바로 답하는 컴포넌트를 포함하는가?
- [ ] 검색 의도에 맞는 컴포넌트 3종 이상 들어갔나?
- [ ] 주제에 안 맞는 컴포넌트를 억지로 넣지 않았나?
- [ ] FAQ 5개 이상 있나?
- [ ] EligibilityChecker를 "관심 확인"용으로 쓰지 않았나?

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

## 6-1. 텍스트 작성 엔진 (매 소제목 구간 필수)

### ★ 최상위 원칙: 매 문장이 다음 문장을 끌어당긴다

독자가 "다음 문장을 안 읽으면 손해"라고 느끼게 만든다.
섹션이 끝나면 독자가 자연스럽게 다음 섹션으로 넘어간다.
이게 체류시간이고, 체류시간이 RPM이다.

### 섹션 텍스트 공식 (SWBST 변형)

매 소제목 구간은 이 순서를 밟는다. 빠짐없이.

```
1문장: [상황] 독자가 지금 처한 상황 또는 궁금증을 짚는다
2문장: [결론] 이 소제목의 답을 바로 준다 (짧게)
3~5문장: [근거] 왜 그런지, 조건이 뭔지, 구조가 어떤지
[컴포넌트]
1~2문장: [행동] "지금 바로 ~해보세요" 또는 다음 섹션으로의 궁금증 열기
```

### 나쁜 예 vs 좋은 예

나쁜 예 (지금 글의 패턴):
```
퇴직연금(DB·DC형)과 IRP 잔액도 동일하게 분할 대상이에요.
재산분할 청구권은 이혼 확정일로부터 2년이 지나면 소멸해요.
이혼이 확정되면 바로 청구 절차를 시작하는 게 좋아요.
```
→ 세 문장 전부 "~이에요/~해요" 평서문. 읽다가 이탈.

좋은 예:
```
퇴직연금이나 IRP에 쌓인 돈도 나눌 수 있냐고요? 네, 전부 분할 대상이에요.
다만 시효가 있어요. 이혼 확정 후 2년. 이 기간이 지나면 청구 자체가 불가능해져요.
그래서 이혼이 확정되는 즉시 움직여야 해요.
```
→ 질문으로 시작, 짧은 답, 경고, 행동 유도. 읽으면 다음이 궁금해짐.

### 섹션 시작 다변화 규칙

같은 글 안에서 섹션 시작 패턴을 전부 다르게 한다.
아래 5가지 중 글당 최소 3가지를 사용:

| 패턴 | 예시 |
|------|------|
| 질문형 | "상대방이 안 준다고요?" |
| 경고형 | "2년이 지나면 끝이에요." |
| 사례형 | "총 근속 15년, 혼인 기간 10년이라면..." |
| 반전형 | "받을 수 있긴 한데, 생각보다 적어요." |
| 숫자형 | "67%. 혼인 기간 비율이 그만큼이에요." |

금지: 5개 섹션이 전부 "~은/는 ~이에요"로 시작하는 것

### 단락 연결 규칙

접속사 시작 금지: 또, 또한, 다만, 그럼에도, 아울러, 이어서, 한편, 그러나, 살펴보면
대신: 다음 단락 첫 문장 = 새로운 사실 또는 독자 질문

나쁜 예: "또한 세금도 고려해야 해요."
좋은 예: "세금은 근속연수가 길수록 적게 나와요."

나쁜 예: "다만 주의할 점이 있어요."
좋은 예: "2년이 지나면 청구 자체가 막혀요."

### 섹션 마지막 문장 = 다음 섹션 궁금증 열기

매 섹션의 마지막 1~2문장이 다음 섹션으로 자연스럽게 끌어당겨야 한다.

나쁜 예: "이 점을 꼭 기억해 두세요." (닫힘 → 이탈)
좋은 예: "내가 받을 수 있다는 건 알겠는데, 그래서 금액이 얼마냐가 문제죠." (열림 → 스크롤)

규칙:
- "~기억하세요", "~확인하세요"로 끝내지 않음 (닫힌 마무리)
- 다음 섹션의 핵심 질문을 살짝 던져서 끝냄 (열린 마무리)
- 마지막 섹션(FAQ 직전)만 닫힌 마무리 허용
- **전환 문장은 독립된 단락이 아니다** — 해당 섹션 마지막 문단의 끝 문장이다. 컴포넌트 뒤 보충 문단(2~3문장) 안에 자연스럽게 포함시킨다

### 어미 변주 규칙

3문장 연속 같은 어미 금지. 아래 풀에서 섞어 쓴다:

| 어미 | 용도 |
|------|------|
| ~이에요, ~예요 | 사실 전달 (기본) |
| ~이죠, ~죠 | 독자도 아는 사실 확인 |
| ~거든요 | 이유 설명 |
| ~있고요 | 나열 후 연결 |
| ~돼요 | 가능/결과 |
| ~이고, ~하고 | 문장 내 나열 |
| ~봐요 | 권유 |
| ~아/어요 | 상태 설명 |

금지 어미: ~있어요 (본문 전체), ~합니다/~입니다 (절대 금지)

### 문장 리듬 규칙

3문장 연속 같은 길이 금지.
패턴: 긴(설명 20자+) → 짧(핵심 15자 이내) → 중간(보충)
짧은 문장 = 핵심 메시지에만 사용.

나쁜 예:
```
퇴직금은 근속연수와 평균임금으로 계산해요.
퇴직 전 3개월 급여를 기준으로 산정해요.
근속연수가 길수록 퇴직금이 많아져요.
```
→ 세 문장 전부 비슷한 길이. 단조로움.

좋은 예:
```
퇴직금은 근속연수와 퇴직 전 3개월 평균임금을 곱해서 계산해요.
공식은 간단해요.
근속연수 × 1일 평균임금 × 30일. 여기서 평균임금이 어떤 급여를 포함하느냐에 따라 금액이 크게 달라지죠.
```
→ 긴 → 짧 → 긴. 리듬이 있음.

### 빈 문장 패턴 금지 (AI 냄새 제거)

아래 패턴은 정보가 없는 빈 문장이다. 전부 삭제하거나 정보를 채워 넣는다:

- "이 글에서는 ~에 대해 알아볼게요" → 삭제
- "이렇게 하면 도움이 돼요" → 구체적 행동으로 대체
- "이 점을 꼭 기억해 두세요" → 기억할 '내용'을 문장에 포함
- "정확한 금액은 개인마다 달라요" → 어떤 변수가 금액을 바꾸는지 명시
- "전문가와 상담하세요" → 어디서, 무료인지, 번호까지

### 검증 체크리스트 (글 완성 후)

- [ ] 각 섹션이 다른 패턴(질문/경고/사례/반전/숫자)으로 시작하는가?
- [ ] 접속사(또, 다만, 그럼에도 등)로 시작하는 단락이 없는가?
- [ ] 3문장 연속 같은 어미가 없는가?
- [ ] 3문장 연속 같은 길이가 없는가?
- [ ] 빈 문장 패턴("~알아볼게요", "~기억하세요")이 없는가?
- [ ] 각 섹션 마지막이 다음 섹션 궁금증을 여는가? (마지막 섹션 제외)
- [ ] 컴포넌트 뒤에 행동 유도 1~2문장이 있는가?

---

## 7. 글 작성 절차

### Step 0: 필수 사고 (Q1-Q4) — 생략 금지
1. 키워드를 받으면 **신규/리라이트** 먼저 확인
2. Q1~Q4에 답한다 (상단 `## ★ 필수 사고` 참조)
3. 답을 파일 상단 주석 블록으로 기록
4. 이 답이 이후 모든 Step의 기준이 됨

### Step 0-1: 계산기/양식 페이지 체크 (리라이트 전 필수!)
1. `content/wiki/{slug}.md`의 `schemaType` 확인
2. `schemaType: calculator` 또는 `schemaType: form` → **리라이트 금지, 절대 덮어쓰지 않음**
3. `src/components/calculators/` 에 해당 계산기 컴포넌트가 있는지 확인
4. 계산기 페이지는 기존 MD가 렌더링하는 그대로 유지

### Step 1: 타이틀 생성 (Q2 기반)
1. Q2 답(독자가 할 행동) → 타이틀 line2 결정
2. `node scripts/suggest-structure.js "타이틀"` 실행 → 보조 참고
3. 의도 분류는 Q1-Q4 답과 교차 검증

### Step 2: H2 구조 설계 (Q2→Q3 기반)
1. Q2 답 → H2 순서 결정 (행동에 필요한 정보 순서대로)
2. Q3 답 → H2 개수·깊이 결정 (알아야 할 정보 = 섹션 수)
3. 소제목 4~6개 설계 — **H2-1이 타이틀 질문에 바로 답하는 구조**

### Step 3: 컴포넌트 매핑 (Q4 기반)
1. Q4 답 → 섹션별 컴포넌트 결정
2. 주제에 안 맞는 컴포넌트 억지 삽입 금지
3. 매칭 안 되면 GreenBox 또는 BorderBox
4. 한 소제목에 1개만, 중복 금지 확인

### Step 4: 소스 확보
1. 공식 출처에서 데이터 확보 (WebFetch 우선, WebSearch fallback)
2. 소스에 없는 정보로 팩트 채우기 **절대 금지**
3. 법령: law.go.kr / 세금: nts.go.kr / 복지: bokjiro.go.kr 등

### Step 5: 글 작성
1. page.tsx + layout.tsx 생성
2. 데이터 상수 → 컴포넌트 import → 페이지 조합
3. 구어체, 기승전결, 논리적 흐름 준수

### Step 6: 검증
1. `npm run build` — 빌드 성공 확인
2. 구어체 위반 없는지 확인
3. 금지 단어 없는지 확인
4. 모든 URL 실제 존재 확인

---

## 8. 레퍼런스

골격: 서론 → H2 섹션들 → FAQ → 출처 → 면책.
코드 구조 참고: `src/app/w/퇴직금-소득세/page.tsx` (page.tsx + layout.tsx 파일 구조 확인용).
**구조와 컴포넌트는 Q1-Q4 답을 기반으로 매번 새로 설계한다. 레퍼런스 파일의 H2 순서를 복사하지 않는다.**

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
