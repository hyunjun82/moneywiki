# 컴포넌트 매핑 가이드

## BASIC — 모든 주제 공통 (6개)

| # | 컴포넌트 | 트리거 키워드 | 형태 | 용도 |
|---|---------|------------|------|------|
| 1 | Calculator | 얼마, 계산, 금액, 수령액 | 슬라이더형 | 퇴직금, 실업급여, 양육비, 건보료, 종합소득세, 연금, 이자, 대출 원리금 |
| 2 | EligibilityChecker | 자격, 대상, 조건, 해당되는지 | 체크박스형 | 청년도약계좌, 실업급여, 기초생활수급, 육아휴직, 양육비, 지원금 전체 |
| 3 | Steps | 절차, 방법, 순서, 어떻게 | 스테퍼형 | 모든 신청, 청구, 소송, 등기, 대출 절차 |
| 4 | DocTable | 서류, 준비물, 목록 | 테이블형 | 모든 신청 서류, 제출 서류, 준비물 목록 |
| 5 | Checklist | 준비, 챙겨야, 미리 | 체크리스트형 | 사전 준비 항목, 신청 전 확인사항 |
| 6 | FAQ | 자주 묻는, Q&A, 궁금한 | 아코디언형 | 모든 주제 공통. 5~7개 항목 |

## EXTENDED — 주제별 특화 (10개)

| # | 컴포넌트 | 트리거 키워드 | 형태 | 용도 |
|---|---------|------------|------|------|
| 7 | CompareTable | vs, 차이, 비교, 어떤게 나은 | 비교표형 | 협의이혼 vs 재판이혼, 전세 vs 월세, ISA vs 연금저축 |
| 8 | Timeline | 기간, 언제까지, 기한, 일정 | 타임라인형 | 종합소득세 신고기간, 청약 일정, 이혼 숙려기간 |
| 9 | IncomeBracket | 소득기준, 중위소득, 분위, 이하 | 소득분위형 | 기초생활수급, 청년주거급여, 복지지원금 |
| 10 | TaxRateTable | 세율, 구간, 과세표준, 누진 | 세율표형 | 종합소득세, 양도소득세, 상속세, 증여세 세율 구간 |
| 11 | DateCalc | 며칠, 몇 개월, 기산일, 만료 | 날짜계산형 | 퇴직금 근속년수, 실업급여 대기기간, 소멸시효 계산 |
| 12 | FlowChart | 경우에 따라, 해당하면, 조건 분기 | 흐름도형 | 이혼 유형 판단, 실업급여 수급 자격, 건보 피부양자 자격 분기 |
| 13 | PenaltyTable | 가산세, 과태료, 벌금, 미신고 | 가산세·과태료형 | 종합소득세 미신고, 건보 미납, 양육비 미지급 제재 |
| 14 | RegionTable | 지역별, 시도별, 지자체 | 지역별 차이형 | 지역별 청년지원금, 지자체 출산장려금 |
| 15 | DiagnoseCard | 내게 맞는, 추천, 유리한, 어떤 게 좋아 | 진단·추천형 | 내게 맞는 보험 유형, 적금 vs ETF vs 연금저축 |
| 16 | SupportAmountCard | 얼마 받아요, 지원금액, 수령액 | 지원금 결과형 | 정부지원금, 청년수당, 에너지바우처, 주거급여 금액 |

## 컴포넌트 선택 규칙

### 원칙
1. 소제목 텍스트 분석 → 트리거 키워드 매칭 → 컴포넌트 자동 선택
2. 매칭 안 되면 → `GreenBox`(강조) 또는 `BorderBox`(정보) 텍스트 처리
3. 한 소제목에 컴포넌트 1개만. 중복 금지.
4. 글 전체에서 같은 컴포넌트 2번 사용 금지

### 검색 의도별 선택

| 컴포넌트 | 언제 사용 | 언제 빼야 함 |
|----------|---------|------------|
| Calculator | 금액/세금/수령액 계산이 핵심일 때 | 숫자 계산이 불필요한 개념형 글 |
| EligibilityChecker | 법정 자격 조건이 있을 때 | 누구나 해당하는 주제 |
| Steps | 절차/방법이 있을 때 | 절차가 없는 개념 설명형 글 |
| DocTable | 서류/준비물이 있을 때 | 서류가 불필요한 주제 |
| Checklist | 점검 항목이 있을 때 | 점검할 게 없는 주제 |
| FAQ | **모든 글에 필수** (5~7개) | 절대 생략 금지 |

### 필수 조건
- 컴포넌트 최소 3종 + FAQ
- 텍스트만 있는 섹션 금지 → GreenBox 또는 BorderBox라도 넣기
- H2-1 컴포넌트 = 타이틀 질문에 대한 직접적 답

### 주제별 컴포넌트 조합 예시
```
퇴직금       → EligibilityChecker + Calculator + Steps + DocTable + Checklist
실업급여     → EligibilityChecker + Calculator + DateCalc + Steps
양도소득세   → TaxRateTable + Calculator + Timeline + PenaltyTable
청년지원금   → IncomeBracket + SupportAmountCard + RegionTable + Steps
전세대출     → EligibilityChecker + CompareTable + Steps + DocTable
연말정산     → Calculator + TaxRateTable + Checklist + Timeline
기초생활수급 → IncomeBracket + EligibilityChecker + SupportAmountCard + Steps
```

## 컴포넌트 Props 인터페이스

### BASIC

```typescript
// Calculator — getValue로 외부 주입, 컴포넌트 내부 로직 없음
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

// DateCalc — 글마다 고유 로직이므로 글 내부에 직접 작성

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
