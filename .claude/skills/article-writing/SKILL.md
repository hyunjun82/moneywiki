---
name: article-writing
description: "머니위키 글 작성. 키워드를 받으면 키워드 리서치 → Q1-Q5 사고 → 키워드 의도 기반 블록 선택 → TSX 페이지 생성. 글 작성, 수정, 리라이트 시 사용. 트리거: 글 써줘, 키워드, 신규, 리라이트, 위키, 페이지, article"
argument-hint: "[신규|리라이트] [메인 키워드]"
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(node scripts/*), WebFetch, WebSearch
---

# 머니위키 글 작성

## 핵심 원칙

모든 글은 TEMPLATE.tsx(양육비 글)와 동일한 품질을 만든다.
품질 = 사용자 중심 문제해결 + 인터랙티브 참여 + 검색 노출 키워드.
TEMPLATE.tsx는 "복사 대상"이 아니라 "품질 기준선"이다.
**블록은 키워드 의도에 따라 선택한다.** 계산할 숫자가 없는 글에 Calculator를 넣지 않는다. Q4·Q5 분석이 블록을 결정한다.

---

## Step 0. 키워드 리서치

글 작성 전에 반드시 실행한다. 이 단계를 건너뛰면 "햇살론유스" 같은 단일 브랜드 키워드만 남아서 노출이 안 된다.

1. WebSearch로 메인 키워드 + 연관 검색어 조사
2. 사용자가 실제로 검색창에 치는 질문형 키워드 5~10개 수집
3. 경쟁 상위 글 3개의 H1/H2 구조 확인
4. 수집한 키워드 클러스터에서:
   - H1에 들어갈 검색 의도 키워드 선정
   - H2에 배분할 롱테일 키워드 선정
   - URL slug에 반영할 키워드 선정

**H1 공식**: [사용자 상황/질문]? + [이 글로 해결되는 것]
- 좋은 예: "대학생·취준생도 연 2%대 대출 가능할까? 햇살론유스 자격부터 신청까지"
- 나쁜 예: "햇살론유스"

**H2 공식**: 사용자가 실제로 궁금해하는 질문 형태
- 좋은 예: "나도 받을 수 있을까?", "한도 1,200만원, 얼마나 빌려야 할까?"
- 나쁜 예: "대상자 및 조건", "한도와 금리"

---

## Step 1. Q1-Q5 사고

키워드 리서치 결과를 바탕으로 5개 질문에 답한다. 답은 파일 상단 주석으로 남긴다.

```
Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가? (세분화: 유형별 2~4가지)
Q2. 이 사람이 글을 읽고 나서 할 수 있어야 하는 행동은?
Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
Q4. 이 주제에 "계산할 숫자"가 있는가? (금액, 세율, 이자, 기간 등 → 있으면 Calculator)
Q5. 이 정보를 가장 잘 전달하는 블록 조합은? (블록 선택표 참조)
```

Q1 답 → 상황분기배너 설계, 도입부 톤 결정
Q2 답 → H2 순서, CTA 설계
Q3 답 → H2 개수·깊이
Q4 답 → Calculator 포함 여부 결정 (숫자 없으면 Calculator 넣지 않음)
Q5 답 → 섹션별 블록·컴포넌트 배치

---

## Step 2. 블록 설계 (키워드 의도 기반 선택)

블록은 **Q4·Q5 분석 결과에 따라 선택**한다. 전부 넣는 게 아니다.

### 항상 포함 (3개 — 모든 글)
| 블록 | 컴포넌트 | 이유 |
|------|---------|------|
| 상황분기 | UrgentBanner | Q1에서 사용자 유형이 무조건 나옴 |
| FAQ | FAQ | 어떤 주제든 궁금한 점은 있음 |
| 허브+CTA | HubLinks+CTA+Sidebar | 내부 순환 + 행동 유도 = 사이트 핵심 |

### 조건부 포함 (Q4·Q5에서 판단)
| 블록 | 컴포넌트 | **넣는 조건** | **안 넣는 예시** |
|------|---------|-------------|--------------|
| 계산기 | Calculator | 금액·세율·이자·기간 등 **계산할 숫자**가 있을 때 | 부결 사유, 서류 안내, 절차 설명 |
| 자격체커 | EligibilityChecker | 자격 조건이 **명시적 체크항목**으로 있을 때 | 이미 자격이 전제된 주제(예: 기존 가입자 해지) |
| 절차스텝 | ProcessSteps | 신청·접수·처리 등 **순서가 있는 행동**이 있을 때 | 개념 설명, 비교형 글 |
| 체크리스트 | Checklist | 서류·준비물 등 **체크할 항목 5개 이상**일 때 | 서류가 1~2개뿐인 주제 |

### 추가 컴포넌트 (주제 키워드에 따라)
component-guide.md의 "추가 컴포넌트" 표 참조. 키워드에 "비교, vs" → CompareTable, "기간, 일정" → Timeline 등.

### 블록별 설계 기준

**UrgentBanner**: Q1 사용자 유형 2~4가지 버튼 → 선택 시 맞춤 행동 가이드.
**Calculator**: 슬라이더 2~4개, 결과 카드 2~3개. 실제 공식/데이터 기반. **Q4에서 "계산할 숫자 없음"이면 이 블록 생략.**
**EligibilityChecker**: 체크박스 3~5개. 모두 충족 시 행동 안내, 미충족 시 대안.
**ProcessSteps**: 3~5단계, 각 단계에 링크·전화번호·팁.
**Checklist**: 5~7항목, 진행률 바.
**FAQ**: 아코디언형 5~8개. 긴급 태그 2~3개. 손석희 스타일 질문("상대방이 '나 백수야' 하면요?" ○ / "양육비란?" ×).
**HubLinks+CTA**: 관련 글 3~5개 카드 + 행동 버튼 2개 + Sidebar 15~20개 링크.

---

## Step 3. TSX 작성 규칙

### 파일 구조
```
src/app/w/{slug}/
├── page.tsx    ← "use client" + 모든 컴포넌트 자체 정의
└── layout.tsx  ← metadata export
```

### 기술 규칙
1. `"use client"` 최상단 필수
2. 유일한 외부 import: `import { useState } from "react"` — 이것 외 아무것도 import하지 않음
3. article-ui에서 import 금지 (빌드 에러 원인)
4. 모든 컴포넌트를 파일 안에서 자체 정의 (H2, Bdg, GreenBox, BorderBox, Divider 등)
5. **TypeScript strict 모드** — 모든 함수 파라미터에 타입 필수:
   ```tsx
   function H2({ children }: { children: React.ReactNode }) { ... }
   function GreenBox({ title, children }: { title: string; children: React.ReactNode }) { ... }
   const toggle = (id: string) => setChecked((p: Record<string, boolean>) => ({ ...p, [id]: !p[id] }));
   ```
6. `useState` 타입 명시: `useState<number | null>(null)`, `useState<Record<string, boolean>>({})`
7. `body` 스타일에 `as const` 추가: `const body = { ... } as const;`

### 디자인 토큰
```tsx
const G = "#1D9E75";   // 메인 그린
const GL = "#E1F5EE";  // 그린 배경
const GD = "#085041";  // 그린 다크 텍스트
```
남색(#1E3A5F) 사용 금지. globals.css의 테이블 스타일과 충돌하기 때문이다.

### layout.tsx
```tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "글 제목 | 머니위키",
  description: "metaDescription 155자 이내",
  alternates: { canonical: "https://www.jjyu.co.kr/w/{slug}" },
  openGraph: { title: "글 제목 | 머니위키", description: "metaDescription", url: "https://www.jjyu.co.kr/w/{slug}", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
```

---

## Step 4. 검증 체크리스트

글 완성 후 아래 항목을 전부 확인한다. 하나라도 실패하면 수정 후 다시 확인.

```
필수 품질 (모든 글):
- [ ] H1에 사용자 검색 의도 키워드가 들어갔는가? (단일 브랜드 키워드만 있으면 실패)
- [ ] H2가 사전식("대상자 및 조건")이 아니라 질문형("나도 받을 수 있을까?")인가?
- [ ] 도입부가 감정→행동 전환 구조인가? (위키 사전식이면 실패)
- [ ] 상황분기배너(UrgentBanner)가 있는가?
- [ ] FAQ 5개 이상 있는가? (긴급 태그 포함)
- [ ] 허브링크 + CTA + 사이드바(15개+)가 있는가?

조건부 품질 (Q4·Q5에서 "넣기로 한 블록"만 체크):
- [ ] Calculator: Q4에서 "계산할 숫자 있음"이면 → 슬라이더+결과 카드 확인
- [ ] EligibilityChecker: "자격 조건 있음"이면 → 체크박스+결과 안내 확인
- [ ] ProcessSteps: "순서 있는 절차"면 → 단계+링크 확인
- [ ] Checklist: "체크할 항목 5개+"면 → 진행률 바 확인
- [ ] (Q5에서 선택한 추가 컴포넌트 확인)

빌드 검증:
- [ ] "use client" 최상단 확인
- [ ] article-ui import 없음 확인
- [ ] 모든 함수 파라미터에 TypeScript 타입 있음 확인
- [ ] useState에 타입 명시 확인
- [ ] body에 as const 확인
- [ ] layout.tsx의 canonical이 alternates: { canonical: ... } 형태 확인
```

---

## 참고 자료

글 작성 시 아래 파일을 필요에 따라 읽는다:

- **[TEMPLATE.tsx](TEMPLATE.tsx)**: 양육비 글 완성본. 각 블록이 어떻게 구현됐는지 품질 기준선으로 참고. 복사가 아니라 설계 참고.
- **[references/writing-rules.md](references/writing-rules.md)**: 문체, 어미, 접속사 규칙
- **[references/component-guide.md](references/component-guide.md)**: 블록 선택 조건표 + 16개 컴포넌트 매핑 + TypeScript 패턴
- **[references/keyword-research.md](references/keyword-research.md)**: 키워드 리서치 상세 절차, 의도 분류표
