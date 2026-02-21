# 머니위키 Base — 불변 구조 (Layer 1)

> 모든 글이 공유하는 뼈대. 이 파일 + type-{타입}.md + style-guide.md = 글 1개.

---

## Frontmatter 스키마

```yaml
---
title: "[메인 롱테일 키워드] | [연관 롱테일 키워드]"
description: "100~150자. 구어체 2문장."
category: "카테고리"
keywords: ["키워드1", "키워드2", "키워드3", "키워드4"]
author: "머니위키 에디터"
updateNote: "2026년 N월 기준"
lastUpdated: "2026-MM-DD"
datePublished: "2026-MM-DD"
summary:
  - "핵심 1 (구체 숫자)"
  - "핵심 2"
  - "핵심 3"
sources:
  - name: "출처명 - 구체적 문서명"
    url: "https://딥링크-URL"
    date: "2026-MM"
faq:
  - question: "[베이스키워드] 질문?"
    answer: "구어체 답변 2~3문장"
  - question: "[베이스키워드] 질문?"
    answer: "구어체 답변 2~3문장"
ctaCard:
  label: "행동 + 시간"
  mainText: "핵심 숫자 + 정보"
  subText: "독자 행동 유도"
  url: "/w/슬러그 또는 외부URL"
  external: false
relatedDocs:
  - title: "관련문서"
    url: "/w/슬러그"
checker:
  title: "체커 제목"
  subtitle: "30초 확인"
  intro: "안내 문장"
  groups:
    - key: "키"
      label: "질문?"
      options:
        - value: "값"
          text: "선택지"
  results:
    - when: { 키: "값" }
      pass: true/false
      headline: "결과 제목"
      detail: "설명"
      badges: ["뱃지"]
      links: [{ icon: "아이콘", title: "제목", desc: "설명", href: "URL" }]
  default:
    pass: false
    headline: "조건을 선택해 주세요"
    detail: "안내"
    badges: []
    links: []
---
```

---

## Title 규칙

```
형식: "[롱테일1] | [롱테일2]"  60자 이내
양쪽 다 키워드 (한쪽이 문장이면 FAIL)
자연어 (단어 나열 금지)
금지: 총정리, 완벽정리, 가이드, 구분자 — : -

GOOD: "퇴직연금 국채 투자 DC형 IRP 가산금리 | 세액공제 수익률 계산"
BAD:  "퇴직연금 국채 투자 방법과 수익률 계산"  ← | 없음
BAD:  "퇴직연금 국채 | 어떻게 투자하나요?"  ← 오른쪽 질문형
```

## Description 규칙

```
글자수: 100~150자
구조: 2문장 (호기심 + 해결)
키워드: 4개 중 3개+ 자연 포함
문체: ~요체
금지: "~알아봅니다", "~총정리", 키워드 나열, "확인하세요"
```

3패턴 순환 (같은 배치 내 중복 금지):
- A. 놀라움: "[사실]~아시나요? [키워드] 알려드려요"
- B. 문제해결: "[고민]이시죠? [키워드] 알려드려요"
- C. 숫자: "[숫자]~알고 계셨나요? [키워드] 정리해드려요"

---

## H2 구조

```
Keywords 4개 = H2 4개 (질문형, ~나요?)
모든 H2에 베이스 키워드 포함
섹션당 4문장 이상
```

### H2 아래 구조

```markdown
## [키워드] 질문형 H2?

핵심 답변 첫 문장 (구체적 사실/숫자).

본문 2~3문단 (각 4문장 이상).
각 문단 사이에 시각 요소(테이블, blockquote, 불릿) 배치.

[bridge-card 또는 다음 H2로 자연 전환]
```

## H3/H4 규칙

- **H3**: 소주제 분리 (TOC 노출)
- **H4**: 테이블/시뮬레이션 캡션 (H3 아래에서 테이블 단독 시)
- `<div class="table-title">` 금지 → 실제 H3/H4 마크다운 헤딩

---

## Checker (모든 글 필수)

- groups: 2~3개 질문, 각 3~5개 선택지
- results: 조건별 pass/fail + headline + detail + badges + links
- default: 미선택 안내
- 렌더링 위치: 서론과 H2 사이 (자동)

### Checker 완전체 예시

```yaml
checker:
  title: "내 퇴직금 지연이자 받을 수 있을까?"
  subtitle: "30초 확인"
  intro: "퇴사일과 지급일만 알면 바로 판정돼요."
  groups:
    - key: "delay"
      label: "퇴직금을 14일 안에 받았나요?"
      options:
        - value: "on-time"
          text: "14일 이내에 받았어요"
        - value: "delayed"
          text: "14일이 넘었는데 아직 못 받았어요"
        - value: "partial"
          text: "일부만 받았어요"
    - key: "period"
      label: "퇴사한 지 얼마나 됐나요?"
      options:
        - value: "under-1y"
          text: "1년 이내"
        - value: "1y-3y"
          text: "1~3년"
        - value: "over-3y"
          text: "3년 초과"
  results:
    - when: { delay: "delayed", period: "under-1y" }
      pass: true
      headline: "지연이자 청구 가능해요"
      detail: "14일 초과분에 대해 연 20% 지연이자를 받을 수 있어요. 퇴직금과 별도로 청구하면 돼요."
      badges: ["연 20% 이자", "청구 가능"]
      links:
        - icon: "calculator"
          title: "지연이자 계산하기"
          desc: "내 지연일수로 금액 확인"
          href: "/w/퇴직금-지연이자-계산"
        - icon: "document"
          title: "청구서 양식"
          desc: "고용노동부 공식 서식"
          href: "https://www.moel.go.kr"
    - when: { delay: "delayed", period: "over-3y" }
      pass: false
      headline: "소멸시효가 지났을 수 있어요"
      detail: "퇴직금 청구권은 3년이에요. 다만 일부 예외가 있으니 노동청 상담을 받아보세요."
      badges: ["시효 주의"]
      links:
        - icon: "phone"
          title: "고용노동부 상담"
          desc: "1350 전화 상담"
          href: "https://www.moel.go.kr"
    - when: { delay: "on-time" }
      pass: true
      headline: "정상 지급됐어요"
      detail: "14일 이내에 받았으면 지연이자 대상이 아니에요."
      badges: ["정상 지급"]
      links: []
  default:
    pass: false
    headline: "조건을 선택해 주세요"
    detail: "위 질문에 답하면 지연이자 청구 가능 여부를 바로 알려드려요."
    badges: []
    links: []
```

---

## ctaCard 상세 (필수!)

모든 글에 ctaCard 필수. 서론 바로 뒤에 자동 렌더링.

### 내부 연결 (계산기/관련 글)

```yaml
ctaCard:
  label: "10초 계산"
  mainText: "14일 넘기면 연 20% 이자"
  subText: "내 지연이자 얼마인지"
  url: "/w/퇴직금-지연이자-계산"
  external: false
```

### 외부 연결 (정부 사이트 딥링크)

```yaml
ctaCard:
  label: "30초 조회"
  mainText: "고용보험 가입 이력 확인"
  subText: "내 피보험기간 바로 조회"
  url: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePbPersonBnefMain.do"
  external: true
```

**규칙**:
- `label`: 행동 + 시간 (10초 계산, 30초 조회, 1분 신청)
- `mainText`: 구체 숫자 + 핵심 정보 (독자 시선 잡기)
- `subText`: 독자 행동 유도 (클릭 이유)
- `url`: 반드시 딥링크 (메인페이지 금지!)
- `external`: 외부 URL이면 `true`, 내부이면 `false`

---

## 출처 규칙

- 본문 인라인 + 하단 `## 출처` 이중 표기
- 딥링크만 (메인페이지 금지)
- frontmatter sources와 동일

## 내부링크

- 글당 2~5개, 실존 슬러그만
- 같은 슬러그 반복 금지 (첫 등장만)
- 억지로 채우기 금지

## FAQ

- frontmatter 2개, H2 소제목과 안 겹침
- 본문에 FAQ 섹션 절대 금지

---

## bridge-card (섹션 간 연결)

글 1개에 1~2개. 전체 `<a>` 태그가 클릭 영역 (full-area clickable).

```html
<a href="/w/관련-슬러그" class="bridge-card">
  <p class="bridge-headline">독자가 궁금해할 자연스러운 질문?</p>
  <p class="bridge-body">
    핵심 사실 1~2문장.
    <strong>볼드로 핵심 강조</strong>.
    부연 설명 1문장.
  </p>
  <span class="bridge-btn">도착 페이지 주제 + 행동 동사 -></span>
</a>
```

### 작성 규칙

- `bridge-headline`: 독자 궁금증 (기계적 질문 반복 금지)
- `bridge-body`: 숫자/사실로 힌트 (2~3문장)
- `bridge-btn`: 도착 페이지 주제 + 동사 ("내 급여 기준 실질 수익률 대조 ->")
- **금지 btn**: "자세히 보기 ->", "전체 가이드 ->", "바로가기 ->", "확인하세요 ->"

---

## 절대 금지

| 금지 | 이유 |
|------|------|
| "예시 1, 2, 3" 순번 H3 | AI 티 |
| ~습니다/~합니다 | 관공서체 |
| "확인하세요" | 명령형 CTA |
| "총정리", "완벽정리" | 스팸 |
| title 콜론(:) 긴대시(--) | 구분자 위반 |
| description 키워드 나열 | CTR 최악 |
| mark 5개+ | 과다 강조 |
| 섹션 2문장 이하 | 짧은 단락 |
| 본문 FAQ 섹션 | frontmatter만 |
| `<div class="table-title">` | H3/H4 사용 |

---

## 5원칙

- [ ] 텍스트가 주인공 (시각요소는 보조)
- [ ] 구어체 필수 (~이에요, ~해요)
- [ ] 독자 중심 (20~80세 이해)
- [ ] 섹션당 4문장 이상
- [ ] FAQ는 frontmatter만
