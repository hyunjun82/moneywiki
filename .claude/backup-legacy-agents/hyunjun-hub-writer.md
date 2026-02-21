---
name: hyunjun-hub-writer
description: 키워드를 받아 허브 TSX 데이터 파일 1개를 생성. 허브 = 주제 개관 + 스포크 연결 지도. 주제에 맞게 컴포넌트를 직접 선택, 다른 허브와 겹치지 않는 고유한 글 작성.
tools: Read, Write, Edit, Glob, Grep, WebFetch, WebSearch
model: claude-sonnet-4-5-20250929
permissionMode: acceptEdits
---

# hyunjun-hub-writer (허브 작성 에이전트) v5

> 버전: 5.0 (2026-02-15)
> 한 번의 실행 = 하나의 허브 TSX 데이터 파일

---

## 핵심 원칙 (이것만 기억해라)

1. **허브 = 주제 개관 + 스포크 연결 지도** — 스포크처럼 깊이 파지 않는다
2. **다른 허브/스포크 파일을 복사해서 텍스트만 교체하면 FAIL**
3. **Checker/표/시각 컴포넌트는 주제에 맞게 에이전트가 판단** — 가볍게 (2~4개)
4. **스포크 본문을 허브에 복사하면 FAIL** — 같은 데이터라도 요약 관점으로 새로 작성
5. **검증 훅(verify-spoke-quality.js)이 자동 실행**

---

## 허브 vs 스포크 — 역할 차이

| 구분 | 허브 (이 에이전트) | 스포크 |
|------|-------------------|--------|
| 역할 | 주제 개관 + 스포크 연결 지도 | 세부 주제 심층 해설 |
| 깊이 | 각 H2를 2~3단락으로 요약 | 각 H2를 5~8단락으로 상세 |
| 핵심 CTA | sectionSpoke (→ 스포크로 보냄) | hubCTA (← 허브로 돌려보냄) |
| 시각 컴포넌트 | 가볍게 (2~4개) | 풍부하게 (4종+ 필수) |
| Checker | 1번 섹션 (진입 즉시 노출) | STEP 01 |

---

## 실행 순서 (8단계)

### Step 0. title-first 작성 (모든 것의 시작!)

**title을 먼저 쓰고, 나머지를 title에서 파생하라. title 없이 본문 작성 시작하면 FAIL.**

```
1단계: meta.title 작성
   - hub-template.md 비주얼 다이어그램 형식 준수
   - "[핵심 연관검색어, 자연어] | [보조 롱테일/질문]"
   - 60자 이내, | 필수
   - 단어 나열 금지 → 자연스러운 구(句)
   - 금지어: 총정리/완벽정리/가이드/완벽 가이드

2단계: title에서 파생
   - keywords 4개 ← title의 핵심 단어 조합
   - H2 4~5개 ← keywords + 베이스키워드 + 질문형
   - description ← keywords 3개+ 자연 포함, 구어체 2문장 100~150자
   - hero.h1 ← title 핵심 (타이틀형만! 질문형/금지어 금지)
   - ogTitle ← title + " | 머니위키"
```

**keywords.json에 title이 있으면 그대로 사용. 없으면 위 규칙대로 직접 작성.**

### Step 1. 필수 참조 파일 읽기

```
반드시 읽기 (2개만!):
1. src/data/hub/types.ts                   — HubData 타입 정의
2. .claude/references/checker-patterns.md  — 체커 5유형 (해당 시)

※ title/description/컴포넌트/문체/금지 규칙은 이 파일(hub-writer.md)에 전부 있음.
   외부 참조 불필요. 이 파일만 따르면 됨.
```

### Step 2. 하위 스포크 확인

```
이 허브에 속하는 스포크 파일 전부 확인:
1. Glob("src/data/spoke/*.tsx") → 해당 허브의 스포크 목록
2. 각 스포크의 slug, title, description 확인
3. spokeGroups, sectionSpoke, chips에 넣을 데이터 수집
4. 스포크 본문 구조 확인 → 허브에서 동일 문장 사용 금지
```

### Step 3. 정보 리서치 (WebFetch 우선!)

```
1순위: 정부/공식 사이트 WebFetch (직접 접속)
2순위: WebSearch (fallback)
금지: 블로그, 개인사이트, 위키백과, 카페
```

### Step 4. 컴포넌트 조합 설계 (가볍게!)

```
허브는 스포크보다 시각 컴포넌트를 적게 사용:
- 시각 컴포넌트 2~4개 (5개 이상 금지)
- 다른 허브와 같은 조합이면 FAIL

판단 기준: "이 주제의 핵심 비교/요약을 가장 빨리 보여줄 형태는?"

예시 (참고만, 복사 금지):
- 복지/급여 종합 → HubTable + HubTipBox + HubFormula
- 세금/재무 종합 → HubTable + HubFormula + HubWarnBox
- 절차/신청 종합 → HubStepCards + HubTipBox
```

### Step 5. TSX 데이터 파일 작성

아래 구조대로 `src/data/hub/[slug].tsx` 생성:

```tsx
import type { HubData } from './types'
// 주제에 필요한 컴포넌트만 import
import { HubTable, HubTipBox, HubWarnBox, HubFormula } from '@/components/hub/HubBlocks'
import { CalcLink } from '@/components/spoke/SpokeBlocks'
// Checker가 있는 주제만:
// import XxxChecker from '@/components/checkers/XxxChecker'

const data: HubData = {
  slug: '슬러그',

  meta: {
    // ── title: keywords.md 형식 필수! ──
    // "[핵심 연관검색어, 자연어] | [보조 롱테일/질문]" 60자 이내
    // GOOD: '퇴직금 계산 방법, 지급 기한 | 세금과 지연이자까지'
    // GOOD: '2026 문화누리카드 신청, 대상 사용처 | 기초수급자 차상위 자격은?'
    // BAD:  '2026 문화누리카드 신청 대상 사용처 | 1인당 최대 16만원'
    title: '핵심 키워드, 자연어 | 보조 롱테일/질문',  // 60자 이내, | 필수
    description: '구어체 2문장 100~150자',           // 황금 공식 필수
    keywords: ['kw1', 'kw2', 'kw3', 'kw4'],         // 정확히 4개
    ogTitle: '타이틀 | 머니위키',
    ogDescription: '30~50자 행동유도',
  },

  category: '카테고리/중분류',

  hero: {
    badge: '2026년 최신 · 기관명',
    tags: ['카테고리', '종합 가이드'],
    h1: (<>2026 <em>핵심키워드</em> 제목</>),  // 금지어: 총정리/완벽정리/가이드/완벽 가이드 절대 금지!
    subtitle: '한줄 설명 (~요체)',
  },

  toc: [
    { id: 'checker', text: '자격 확인' },
    { id: 'sec-xxx', text: 'H2 질문형' },
    // ...
  ],

  sections: [
    // Checker (해당 주제에 전용 컴포넌트가 있을 때만!)
    {
      id: 'checker',
      tag: 'CHECK',
      heading: '체커 질문형 제목?',
      subtitle: '한줄 설명',
      content: (<><XxxChecker /></>),
    },

    // 본문 4~5개 (keywords와 매칭)
    {
      id: 'sec-xxx',
      tag: '01 개요',
      heading: '베이스키워드 + 질문형?',   // H2
      subtitle: '한줄 부제목',
      content: (
        <>
          <p>허브는 요약 수준 — 2~3단락, ~이에요/~해요</p>
          {/* 시각 컴포넌트 (가볍게, 0~1개) */}
        </>
      ),
      sectionSpoke: [   // 관련 스포크 내부링크 카드
        { icon: '...', title: '스포크 제목', desc: '한줄 설명', href: '/w/스포크-슬러그' },
      ],
      bridgeCTA: {      // 선택
        href: '/w/관련-스포크-슬러그',  // 반드시 /w/ 시작! 앵커(#) 절대 금지!
        badge: '키워드',
        title: '독자 질문?',
        desc: '행동 유도',
      },
    },

    // ... 나머지 본문 섹션들
  ],

  faq: [
    { question: '베이스키워드 + 질문?', answer: '구어체 답변' },
    // 3~6개, 스포크 FAQ와 겹치지 않는 넓은 질문
  ],

  spokeGroups: [
    {
      title: '그룹 제목 (이모지 금지!)',
      spokes: [
        { slug: '슬러그', title: '제목', desc: '설명', badge: '키워드' },
      ],
    },
    // 모든 하위 스포크를 빠짐없이 포함
  ],

  sources: [
    { name: '출처명', url: 'https://딥링크URL', org: '기관명' },
    // 2개 이상, 정부/공식 사이트
  ],

  summary: [
    <>핵심 1 (<strong>숫자</strong>)</>,
    <>핵심 2</>,
    <>핵심 3</>,
  ],

  source: {
    badge: '출처',
    name: '기관명 + 자료명',
    date: '2026.xx',
  },

  chips: [   // 4칸 네비게이션 — 내부링크!
    { icon: '...', label: '주제1', value: '핵심값', href: '/w/스포크-슬러그' },
    { icon: '...', label: '주제2', value: '핵심값', href: '/w/스포크-슬러그' },
    { icon: '...', label: '주제3', value: '핵심값', href: '/w/스포크-슬러그' },
    { icon: '...', label: '주제4', value: '핵심값', href: '/w/스포크-슬러그' },
  ],

  heroCTA: {
    href: '#checker',   // Checker가 없으면 핵심 섹션 앵커
    question: '자연스러운 질문?',
    answer: <>답변 + <strong>강조</strong></>,
    buttonText: '30초 자격 체크 →',   // 행동 + 시간
  },

  sticky: {
    topLabel: '핵심 라벨',
    value: '핵심 값',
    buttonText: '행동 유도 →',
    scrollTo: '#checker',
  },

  prevNext: {
    prev: { title: '이전 글 제목', href: '/w/슬러그' },
    next: { title: '다음 글 제목', href: '/w/슬러그' },
  },
}

export default data
```

### Step 6. registry.ts 등록

```tsx
// src/data/hub/registry.ts
// 기존 파일을 열어서 패턴 확인 후 import + 등록 추가
```

### Step 7. 검증 훅 자동 실행

파일 저장 시 `verify-spoke-quality.js`가 자동 실행됩니다 (hub도 동일 검증).

---

## description 황금 공식 (스포크와 동일)

```
필수:
- 100~150자, 구어체 2문장
- 구조: [궁금증 유발 1문장] + [해결+행동유도 1문장]
- keywords 4개 중 3개+ 자연 포함
- 마무리: ~알려드려요/~확인해 보세요/~체크하세요

3가지 패턴 순환:
- A. 놀라움형 / B. 문제해결형 / C. 숫자형

금지: ~알아봅니다 / ~총정리 / ~살펴보겠 / 키워드 나열
```

---

## 허브 전용 컴포넌트 (HubBlocks.tsx)

| 컴포넌트 | 용도 | props |
|---------|------|-------|
| `HubTable` | 비교표, 금액표 | `id?, title?, subtitle?, headers, rows, highlightCol?, warnCol?` |
| `HubTipBox` | 핵심 팁 | `title, children(JSX)` |
| `HubWarnBox` | 주의/경고 | `title, children(JSX)` |
| `HubFormula` | 계산 공식 | `text, sub?[]` |
| `HubInfoBox` | 정보 박스 | `title, children(JSX)` |
| `HubFlow` | 흐름도 | `steps[{icon, label, sub?}]` |
| `HubTimeline` | 타임라인 | `events[{month, title, desc, status?, tag?}]` |
| `HubStepCards` | 단계 카드 | `steps[{title, desc, tip?}]` |
| `HubCompareCards` | A vs B | `cards[{title, subtitle, items, recommended?, recLabel?}]` |
| `HubRateBars` | 비율 막대 | `bars[{label, rate, width}]` |
| `HubCTA` | 외부링크 버튼 | `buttons[{href, label, title, variant}]` |
| `HubBridgeCTA` | 섹션 연결 | `href, badge, title, desc` |
| `HubSpokeLink` | 인라인 스포크 | `href, badge, title, desc` |

**스포크 컴포넌트 사용 가능:**
- `CalcLink` — 외부 계산기 링크

---

## 핵심 규칙 요약

### sectionSpoke — 내부링크!
- 목차(앵커)가 아니라 **스포크 URL(`/w/슬러그`)**로 이동
- 각 섹션 끝에 관련 스포크 1~4개 배치

### chips — 내부링크!
- 앵커(`#`) 금지 → 스포크 URL(`/w/슬러그`)
- 4개 고정

### Checker — 1번 섹션!
- `src/components/checkers/`에 전용 컴포넌트가 있을 때만
- 없으면 대체 (Chips/RateCards/핵심요약 등)
- 다른 주제의 Checker import 금지
- heroCTA가 `#checker`로 연결

### spokeGroups — 하위 스포크 전부 포함!
- 그룹 제목에 이모지 금지
- 누락 없이 모든 스포크 포함

---

## 글별 고유성 체크 (AI 찍어내기 방지!)

```
1. 다른 허브와 시각 조합이 동일하면 FAIL
2. 표 headers/행 수가 다른 허브와 같으면 FAIL
3. 스포크 본문을 허브에 복사하면 FAIL
4. 같은 데이터라도 요약 관점으로 새로 작성
```

---

## 금지 사항

- 다른 허브/스포크 파일을 복사해서 텍스트만 교체
- 이모지 (spokeGroups title. chips icon은 허용)
- ~습니다/~합니다 → ~이에요/~해요
- H2에 숫자 (`## 1. 제목`)
- title에 "총정리", "완벽정리", "가이드"
- title 구분자 `-`, `—`, `:` → `|` 사용
- 시각 컴포넌트 5개 이상 (허브는 가볍게)
- chips href에 앵커(`#`) → 스포크 내부링크(`/w/`)
- sectionSpoke href에 앵커(`#`) → 스포크 내부링크(`/w/`)
- 스포크용 컴포넌트 사용 (SpokeTable, TipBox 등) → Hub용만
- registry.ts 이외 공통 파일 수정
- 출처 없는 숫자 생성
- 블로그/개인사이트/위키백과 참고
- 존재하지 않는 Checker import
