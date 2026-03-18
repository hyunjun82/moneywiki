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

## ★★★ 글 품질 절대 원칙

> 글 작성/수정 시 반드시 SKILL.md를 읽고 따른다. 어기면 재작성.

### ★ 글 작성 전 필수 사고 (매 글 첫 단계, 생략 금지)

아래 4개 질문에 먼저 답하고, 그 답을 기반으로 글을 쓴다.
이 답은 글 파일 상단 주석으로 남긴다.

Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
Q4. 이 정보를 가장 잘 전달하는 형태는? (16개 컴포넌트 중 선택)

- Q2의 답 → 타이틀 line2 + H2 순서 결정
- Q3의 답 → H2 개수·깊이 결정
- Q4의 답 → 섹션별 컴포넌트 결정
- suggest-structure.js는 Q1-Q4 이후 보조 참고용

### 절대 규칙 (위반 시 재작성)
- **구어체 필수**: ~해요/~이에요/~하죠 — 합니다/입니다 **절대 금지**
- **금지 단어**: 또한/결론적으로/다양한/매우 중요/확인하세요/총정리/있거든요/있어요/알아보겠습니다/살펴보겠습니다/정리해드릴게요/— (em dash)
- **타이틀 line2 키워드 → H2 소제목에 최소 3개 반영**
- 상세: SKILL.md `## 0` 타이틀 / `## 0-1` 소제목 / `## 6` 문체

---

## 핵심 원칙

0. **계산기·모의계산 절대 불가침** — `schemaType: calculator` MD 페이지, `src/components/calculators/` 계산기 컴포넌트, 인터랙티브 데이터 상수(CALC_SLIDERS, CALC_RESULTS, getDays 등)는 리라이트 시 **절대 건드리지 않음**. TSX로 덮어쓰기 금지
1. **내부링크 거미줄** — 본문에서 다른 주제 언급 시 내부 글 링크 우선 (나무위키 스타일). 외부 법령 링크는 보조
2. **숫자에는 출처** — 출처 없는 숫자 생성 금지, 공식 기관 URL 필수

---

## 세부 규칙

**글 작성/수정 시 반드시 `.claude/skills/article-writing/SKILL.md`를 읽고 따른다.**

- 타이틀 생성 → SKILL.md `## 0. 타이틀 생성 규칙`
- 컴포넌트 매핑 → SKILL.md `## 2. 컴포넌트 매핑 테이블`
- 글쓰기/문체 → SKILL.md `## 6. 글쓰기 규칙`
- 작성 절차 → SKILL.md `## 7. 글 작성 절차`

---

## 대량 작업: Agent Teams 워크플로우

키워드/타이틀 목록을 받으면 아래 구조로 병렬 작업.

### 글쓰기 Agent (최대 5개 병렬)
- 각 Agent는 담당 slug 목록을 받아서 글 작성
- **같은 파일 동시 수정 금지** — Agent마다 slug 분리
- 작성 규칙: SKILL.md `## 7` 절차 (Q1-Q4 필수 사고 → 타이틀 → H2 → 컴포넌트 → 소스 → 작성)
- 계산 로직(calcRetirementTax 등) 절대 불변

### 검증: 파일 1개 쓸 때마다 즉시 (Post-hook)
- `Write|Edit` 발생 → `verify-tsx-article.js` 자동 실행 (이미 설정됨)
- 검증 항목: 구어체/금지단어/타이틀-H2 일치/시각화 적합성/계산 로직 불변
- **FAIL 나면 그 자리에서 바로 수정** → 다음 파일로 넘어가지 않음
- 다 쓰고 한꺼번에 잡는 게 아니라, 1개씩 쓰고 1개씩 잡는 구조

### 실행 순서
```
1. 키워드 목록 수령
2. 각 키워드별 Q1-Q4 필수 사고 (suggest-structure.js는 보조 참고)
3. slug별 Agent 배분 (5개 이내, 파일 충돌 방지)
4. 각 Agent: 1개 작성 → 훅 검증 → PASS면 다음 / FAIL이면 즉시 수정
5. 전체 완료 후 npm run build 최종 확인
```

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
