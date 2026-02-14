# Spoke 컴포넌트 템플릿 (SpokeBlocks.tsx 기준)

> ⚠️ 이 문서의 API가 유일한 정답입니다. 여기에 없는 prop은 사용 금지입니다.
> 최종 업데이트: 2026-02-09

---

## 1. TipBox

```typescript
// Props
{ title: string; children: ReactNode }
```

```tsx
// ✅ 올바른 사용
<TipBox title="꼭 알아두세요">
  <ul className="list-disc pl-5 space-y-1">
    <li>항목 1: 설명</li>
    <li>항목 2: 설명</li>
    <li>항목 3: 설명</li>
  </ul>
</TipBox>
```

```tsx
// ❌ 금지 패턴
<TipBox items={["항목1", "항목2"]} />        // items prop 없음
<TipBox title="제목" items={["항목"]} />      // items prop 없음
```

**규칙**: children은 반드시 JSX (ul/li, p 등). 문자열 배열 불가.

---

## 2. FormulaBox

```typescript
// Props
{ lines: { text: string; numbered?: boolean; comment?: boolean }[] }
```

```tsx
// ✅ 올바른 사용
<FormulaBox lines={[
  { text: '기본급여일액 = 퇴직 전 3개월 총임금 ÷ 총일수', numbered: true },
  { text: '구직급여일액 = 기본급여일액 × 60%', numbered: true },
  { text: '※ 상한: 66,000원, 하한: 최저임금 80%', comment: true },
]} />
```

**규칙**: `numbered: true`면 자동 번호 매기기. `comment: true`면 회색 주석 스타일.

---

## 3. SpokeTable

```typescript
// Props
{ id: string; title: string; subtitle: string; headers: string[]; rows: string[][]; highlightCol?: number }
```

```tsx
// ✅ 올바른 사용
<SpokeTable
  id="comparison-table"
  title="2주택 vs 3주택 중과세율"
  subtitle="2026년 기준"
  headers={['구분', '기본세율', '중과세율', '실효세율']}
  rows={[
    ['2주택', '6~45%', '+20%p', '26~65%'],
    ['3주택', '6~45%', '+30%p', '36~75%'],
  ]}
  highlightCol={2}
/>
```

**규칙**: `headers`와 `rows[n]`의 길이는 반드시 동일. `highlightCol`은 0부터 시작하는 인덱스.

---

## 4. RateCards

```typescript
// Props
{ cards: {
  value: string;
  label: string;
  lines: string[];
  highlight?: string;
  highlightColor?: 'orange' | 'navy';  // ⚠️ 이 2가지 + undefined만 허용
  active?: boolean;
}[] }
```

```tsx
// ✅ 올바른 사용
<RateCards cards={[
  {
    value: '22%',
    label: '양도소득세율',
    lines: ['양도소득세 20%', '지방소득세 2%'],
    highlight: '해외주식 공통',
    highlightColor: 'orange',
  },
  {
    value: '250만원',
    label: '기본공제',
    lines: ['인당 연간 한도', '해외주식 전체 합산'],
    active: true,
  },
]} />
```

```tsx
// ❌ 금지 패턴
highlightColor: 'neutral'    // ❌ neutral 없음
highlightColor: 'red'        // ❌ red 없음
highlightColor: 'blue'       // ❌ blue 없음
```

**규칙**: `highlightColor`는 `'orange'` | `'navy'` | 생략(undefined) 3가지만. **'neutral', 'emerald' 절대 금지**.

---

## 5. SpokeTimeline ⭐ (오류 최다)

```typescript
// Props
{ events: {
  month: string;     // 필수 — "① 기준", "2026.5", "STEP 1" 등
  title: string;     // 필수 — 이벤트 제목
  desc: string;      // 필수 — 설명
  status?: 'normal' | 'current' | 'warning';  // 선택
  tag?: string;      // 선택
}[] }
```

```tsx
// ✅ 올바른 사용
<SpokeTimeline events={[
  { month: '2026.1', title: '정책 발표', desc: '이재명 대통령 재연장 불가 발표', status: 'normal' },
  { month: '2026.5.9', title: '유예 종료', desc: '양도세 중과 유예 만료', status: 'warning', tag: 'D-Day' },
  { month: '2026.5.10~', title: '중과 시행', desc: '2주택 +20%p, 3주택 +30%p 적용', status: 'current' },
]} />
```

```tsx
// ❌ 금지 패턴 (에이전트 빈출 오류)
{ date: '2026.5',  sub: '설명', highlight: true }   // ❌ date→month, sub→desc, highlight→status
{ month: '2026.5', desc: '설명' }                    // ❌ title 누락
{ month: '2026.5', title: '제목' }                   // ❌ desc 누락
```

**규칙**: `month` + `title` + `desc` 3개 모두 필수. `status`는 3가지 문자열만 허용 (boolean 불가).

---

## 6. SpokeStepCards

```typescript
// Props
{ steps: { title: string; desc: string; tip?: string }[] }
```

```tsx
// ✅ 올바른 사용
<SpokeStepCards steps={[
  { title: '1단계: 서류 준비', desc: '신분증, 소득증빙, 주민등록등본', tip: '모바일 발급 가능' },
  { title: '2단계: 은행 방문', desc: '가까운 취급 은행 영업점 방문' },
  { title: '3단계: 신청서 작성', desc: '창구에서 신청서 작성 후 제출', tip: '대기시간 약 30분' },
]} />
```

---

## 7. SpokeCompareCards

```typescript
// Props
{ cards: {
  title: string;
  subtitle: string;
  items: string[];
  recommended?: boolean;
  recLabel?: string;
}[] }
```

```tsx
// ✅ 올바른 사용
<SpokeCompareCards cards={[
  {
    title: '청년미래적금',
    subtitle: '3년·최대 2,200만원',
    items: ['기여금 6~12%', '월 50만원 한도', '비과세 추진'],
    recommended: true,
    recLabel: '단기 목돈에 유리',
  },
  {
    title: '청년도약계좌',
    subtitle: '5년·최대 5,000만원',
    items: ['기여금 3~6%', '월 70만원 한도', '비과세 확정'],
  },
]} />
```

**규칙**: `recommended: true`일 때 `recLabel`로 추천 이유 표시. 카드 2~3개 권장.

---

## 8. SpokeRateBars

```typescript
// Props
{ bars: { label: string; rate: string; width: string }[] }
```

```tsx
// ✅ 올바른 사용
<SpokeRateBars bars={[
  { label: '1년 미만', rate: '2.3%', width: '30%' },
  { label: '1~2년', rate: '2.8%', width: '50%' },
  { label: '2년 이상', rate: '3.1%', width: '70%' },
  { label: '청년드림 2년+', rate: '4.5%', width: '100%' },
]} />
```

**규칙**: `width`는 CSS 퍼센트 문자열. 최대값 기준 `'100%'`로 비율 조정.

---

## 9. SpokeFlow

```typescript
// Props
{ steps: { icon: string; label: string; sub?: string }[] }
```

```tsx
// ✅ 올바른 사용
<SpokeFlow steps={[
  { icon: '📋', label: '서류 준비', sub: '신분증 + 소득증빙' },
  { icon: '🏦', label: '은행 방문', sub: '취급 은행 9곳' },
  { icon: '✍️', label: '신청서 작성' },
  { icon: '✅', label: '완료' },
]} />
```

```tsx
// ❌ 금지 패턴
{ icon: '📋', label: '서류 준비', desc: '설명' }   // ❌ desc→sub
```

**규칙**: 설명 필드는 `sub` (desc 아님). `icon`은 이모지 문자열.

---

## 10. SpokeWarnBox

```typescript
// Props
{ title: string; children: ReactNode }
```

```tsx
// ✅ 올바른 사용
<SpokeWarnBox title="주의사항">
  <p>5년 이내 해지 시 소득공제 추징금 6.6%가 부과됩니다.</p>
</SpokeWarnBox>
```

**규칙**: TipBox와 동일 구조. children은 JSX.

---

## 11. SpokeChecklist

```typescript
// Props
{ items: { text: string; done?: boolean; note?: string }[] }
```

```tsx
// ✅ 올바른 사용
<SpokeChecklist items={[
  { text: '신분증 (주민등록증 또는 운전면허증)', done: true },
  { text: '소득금액증명원 (홈택스 발급)', done: true, note: '최근 1년' },
  { text: '주민등록등본', done: false },
  { text: '청약통장 (또는 통장 사본)' },
]} />
```

**규칙**: `done: true`면 체크 표시, `false`면 미체크, 생략 시 미체크.

---

## 빠른 참조표

| # | 컴포넌트 | 필수 props | ⚠️ 주의 |
|---|---------|-----------|---------|
| 1 | TipBox | `title`, `children(JSX)` | items prop 없음 |
| 2 | FormulaBox | `lines[{text}]` | numbered/comment 선택 |
| 3 | SpokeTable | `id`, `title`, `subtitle`, `headers`, `rows` | highlightCol 0-indexed |
| 4 | RateCards | `cards[{value,label,lines}]` | highlightColor: orange/navy만 |
| 5 | SpokeTimeline | `events[{month,title,desc}]` | date❌ sub❌ highlight❌ |
| 6 | SpokeStepCards | `steps[{title,desc}]` | tip 선택 |
| 7 | SpokeCompareCards | `cards[{title,subtitle,items}]` | recommended+recLabel |
| 8 | SpokeRateBars | `bars[{label,rate,width}]` | width는 CSS % 문자열 |
| 9 | SpokeFlow | `steps[{icon,label}]` | desc❌ → sub✅ |
| 10 | SpokeWarnBox | `title`, `children(JSX)` | TipBox와 동일 구조 |
| 11 | SpokeChecklist | `items[{text}]` | done/note 선택 |

---

## 에이전트 빈출 오류 TOP 5

| 순위 | 오류 | 빈도 | 수정 |
|------|------|------|------|
| 1 | SpokeTimeline: `date` 사용 | 매우 높음 | → `month` |
| 2 | SpokeTimeline: `title` 누락 | 매우 높음 | → 필수 추가 |
| 3 | SpokeTimeline: `sub` 사용 | 높음 | → `desc` |
| 4 | SpokeTimeline: `highlight: true` | 높음 | → `status: 'warning'` |
| 5 | RateCards: `highlightColor: 'neutral'` | 중간 | → 제거 또는 orange/navy |
| 6 | TipBox: `items: []` 배열 사용 | 중간 | → children JSX |
| 7 | SpokeFlow: `desc` 사용 | 중간 | → `sub` |
