# 컴포넌트 가이드

## 항상 포함 (3개 — 모든 글)

| 블록 | 컴포넌트 | 형태 | 필수 요소 |
|------|---------|------|----------|
| 상황분기 | UrgentBanner | 버튼 선택형 | 유형 2~4개, 선택 시 맞춤 행동 가이드 |
| FAQ | FAQ | 아코디언형 | 5~8개, 긴급 태그 2~3개 |
| 허브+CTA | HubLinks + CTA + Sidebar | 카드+버튼형 | 관련글 3~5개, 행동 버튼 2개, 사이드바 15~20개 |

## 조건부 포함 (Q4·Q5 분석으로 선택)

| 블록 | 컴포넌트 | 넣는 조건 | 안 넣는 예시 |
|------|---------|----------|------------|
| 계산기 | Calculator (슬라이더형) | 금액·세율·이자·기간 등 **계산할 숫자**가 있을 때 | 부결 사유, 서류 안내, 절차 설명 |
| 자격체커 | EligibilityChecker (체크박스형) | 자격 조건이 **명시적 체크항목**으로 있을 때 | 이미 자격이 전제된 주제 |
| 절차 | ProcessSteps (스테퍼형) | **순서가 있는 행동**(신청·접수·처리)이 있을 때 | 개념 설명, 비교형 글 |
| 체크리스트 | Checklist (체크리스트형) | 서류·준비물 등 **체크항목 5개 이상**일 때 | 서류 1~2개뿐인 주제 |

## 추가 컴포넌트 (주제에 따라 선택)

| 컴포넌트 | 트리거 | 용도 |
|---------|--------|------|
| CompareTable | vs, 차이, 비교 | 두 상품/제도 비교 |
| Timeline | 기간, 일정, 기한 | 시간순 일정 |
| IncomeBracket | 소득기준, 중위소득 | 소득분위별 기준 |
| TaxRateTable | 세율, 과세표준 | 세율 구간표 |
| DateCalc | 며칠, 기산일, 만료 | 날짜 계산기 |
| FlowChart | 경우에 따라, 조건 분기 | 의사결정 흐름도 |
| PenaltyTable | 가산세, 과태료 | 제재/벌금 정리 |
| RegionTable | 지역별, 시도별 | 지역별 차이 |
| DiagnoseCard | 내게 맞는, 추천 | 유형별 진단 |
| SupportAmountCard | 지원금액, 수령액 | 지원금 결과 표시 |
| PaymentMethods | 수령 방법, 지급 방식 | 방법별 비교 카드 |
| DocTable | 서류, 준비물 | 필수/선택 서류 테이블 |

## 컴포넌트 TypeScript 패턴

모든 컴포넌트는 파일 안에서 자체 정의한다. import하지 않는다.

```tsx
// 체크박스형 (EligibilityChecker, Checklist)
const [checked, setChecked] = useState<Record<string, boolean>>({});
const toggle = (id: string) => setChecked((p: Record<string, boolean>) => ({ ...p, [id]: !p[id] }));

// 아코디언형 (FAQ)
const [open, setOpen] = useState<number | null>(null);

// 슬라이더형 (Calculator)
const [value, setValue] = useState<number>(초기값);
// onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(+e.target.value)}

// 선택형 (UrgentBanner)
const [type, setType] = useState<string | null>(null);

// 배열 체크 (Checklist)
const [done, setDone] = useState<boolean[]>(new Array(ITEMS.length).fill(false));
const toggleItem = (i: number) => setDone((p: boolean[]) => p.map((v: boolean, idx: number) => (idx === i ? !v : v)));

// map 콜백
items.map((item: typeof ITEMS[number], i: number) => ...)
```

## 검색 의도별 H2-1 컴포넌트

| 의도 | 타이틀 신호 | H2-1에 넣을 컴포넌트 |
|------|-----------|-------------------|
| 얼마형 | ~얼마, ~금액 | Calculator (답 먼저) |
| 가능형 | ~할 수 있나, ~되나요 | GreenBox(결론) + EligibilityChecker |
| 방법형 | ~방법, ~어떻게 | ProcessSteps (절차 먼저) |
| 비교형 | ~vs, ~차이 | CompareTable 또는 DiagnoseCard |
