# 머니위키 (jjyu.co.kr)

## 프로젝트

- **사이트**: jjyu.co.kr — 경제·금융 정보 위키
- **스택**: Next.js 16 + Tailwind CSS + shadcn/ui
- **배포**: Vercel (main 푸시 → 자동 배포)
- **콘텐츠**: MD 1,961개 (`content/wiki/`) + TSX 신규 글 (`src/app/w/{slug}/`)

---

## 파일 구조

```
src/app/w/{slug}/
├── page.tsx      ← "use client" 인터랙티브 글
└── layout.tsx    ← metadata (title, og, canonical) + force-static
```

- MD 글: `content/wiki/{slug}.md` → `src/app/w/[slug]/page.tsx`에서 렌더링
- TSX 글: `src/app/w/{slug}/page.tsx` 직접 작성 (MD보다 우선)
- 양식: `src/app/forms/[slug]/page.tsx`
- 계산기: `src/components/calculators/`

---

## 컴포넌트

```
src/components/article-ui/
├── index.ts          # re-export
├── styles.ts         # body 스타일 상수, 컬러 시스템
├── H2.tsx            # 소제목 (에메랄드 좌측바)
├── SectionBadge.tsx  # 섹션 라벨
├── GreenBox.tsx      # 강조 박스
├── BorderBox.tsx     # 정보 박스
├── Divider.tsx       # 구분선
├── Calculator.tsx    # 슬라이더 계산기 (getValue 외부 주입)
├── EligibilityChecker.tsx
├── Steps.tsx
├── DocTable.tsx
├── Checklist.tsx
├── FAQ.tsx
├── References.tsx
└── Disclaimer.tsx
```

모든 컴포넌트: 인라인 스타일, 에메랄드(#1D9E75) 단일 톤

---

## 빌드

```bash
npm run build    # 유일한 검증 수단. Turbopack 불안정 → 빌드로 확인
```

---

## ★★★ 글 품질 절대 원칙 (토스피드 기준 — 매 글 무조건 적용)

> 글 작성/수정 시 아래 원칙을 먼저 읽고 시작. 어기면 재작성.

### 타이틀
- 공식: line1 = `[독자 고민/상황]` (질문형), line2 = `[이 글로 해결되는 것]` (끝맺음 패턴)
- 롱테일 키워드는 자연스러운 길이 우선 — 글자수 제한보다 검색 의도 반영이 우선
- 파이프(|) 금지, 총정리/완벽정리/A to Z/한눈에 금지
- 끝맺음 패턴: ~까지 / ~계산법 / ~방법 / ~기준 / ~조건 (같은 카테고리 3회 이상 반복 금지)
- 구어체: "~할까?", "~됐다면?" 허용 / "~정리했어요", "~알아봤어요", "~해드릴게요" 금지
- **타이틀 line2 키워드가 H2 소제목에 최소 3개 반영 — 타이틀과 H2 불일치 금지**

### 소제목(H2) — 5+1 구조 필수
```
H2-1: 핵심 개념/자격   → EligibilityChecker
H2-2: 금액/계산        → Calculator
H2-3: 서류/증빙        → DocTable
H2-4: 절차/방법        → Steps
H2-5: 준비/주의사항    → Checklist + GreenBox
H2-6: 자주 묻는 것들  → FAQ (고정, 5개 이상)
```
- H2에 번호(1. 2.) 금지 / H2에 대시(ㅡ, —) 금지
- 질문형 H2 2개, 서술형 2개, 행동형 1개 — 같은 톤 3연속 금지

### 필수 컴포넌트 (빠지면 글 작성 불가)
EligibilityChecker + Calculator + Steps + DocTable + Checklist + FAQ
- **EligibilityChecker 항목**: 진짜 조건(~했어요, ~해요) — "궁금해요" 식 관심 항목 절대 금지
- **Steps**: 반드시 Steps 컴포넌트 사용 — 텍스트에 "1단계:", "2단계:" 직접 서술 금지
- **각 H2에 컴포넌트 1개**: 텍스트 2~3문단 → SectionBadge → 컴포넌트 → 마무리 1~2문단

### 구어체 (절대 규칙)
- ~해요, ~이에요, ~예요, ~하죠, ~거든요
- 합니다/입니다/됩니다/있습니다 **절대 금지**

### 금지 단어 (AI 냄새)
또한 / 결론적으로 / 다양한 / 매우 중요 / 확인하세요 / 총정리 / 있거든요 / 있어요 / 알아보겠습니다 / 살펴보겠습니다 / 정리해드릴게요 / — (em dash)

### 핵심 3원칙
1. **문제해결 100%** — 이 글 하나로 독자 질문 100% 해결. 다른 글 볼 필요 없는 수준
2. **핵심만, 군더더기 없이** — 짧게가 아니라 불필요한 말 없이. 모든 문장이 독자에게 필요해야 함
3. **소제목마다 시각화** — 텍스트+컴포넌트 세트. 텍스트만 있는 섹션 금지

---

## 핵심 원칙

0. **🚫 계산기·모의계산 절대 불가침** — `schemaType: calculator` MD 페이지, `src/components/calculators/` 계산기 컴포넌트는 리라이트 시 **절대 건드리지 않음**. TSX로 덮어쓰기 금지. 계산기 slug 목록: 실업급여-계산기, 퇴직금-계산기, 연말정산-계산기 등
1. **내부링크 거미줄** — 본문에서 다른 주제 언급 시 내부 글 링크 우선 (나무위키 스타일). 외부 법령 링크는 보조
2. **숫자에는 출처** — 출처 없는 숫자 생성 금지, 공식 기관 URL 필수
3. **계산기 불가침** — Calculator, EligibilityChecker 등 인터랙티브 컴포넌트와 데이터 상수(CALC_SLIDERS, CALC_RESULTS, getDays 등)는 글 수정 시 절대 건드리지 않음

---

## 세부 규칙

**글 작성/수정 시 반드시 `.claude/skills/article-writing/SKILL.md`를 읽고 따른다.**

- 타이틀 생성 → SKILL.md `## 0. 타이틀 생성 규칙`
- 컴포넌트 매핑 → SKILL.md `## 2. 컴포넌트 매핑 테이블`
- 글쓰기/문체 → SKILL.md `## 6. 글쓰기 규칙`
- 작성 절차 → SKILL.md `## 7. 글 작성 절차`

---

## 정보 정확성

| 항목 | 값 |
|------|---|
| 세액공제 (5,500만 이하) | 16.5% |
| 세액공제 (5,500만 초과) | 13.2% |
| 퇴직금 지연이자 | 연 20% |
| 퇴직금 지급기한 | 14일 |
| 청구권 소멸시효 | 3년 |

---

## 환경

- Windows 11
- `.next` 캐시 프로세스 잠금 주의
