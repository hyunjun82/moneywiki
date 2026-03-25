# 머니위키 템플릿 시스템 설계안

## 조사 결과 요약

Claude 공식 문서, GitHub anthropics/skills 레포, 커뮤니티 자료를 전수 조사한 결과,
**하나의 템플릿으로 수십 개 카테고리에 일관된 품질의 글을 쓰게 만드는 방법**은
Claude의 Skills 시스템 + Progressive Disclosure + Few-Shot Examples 세 가지를 조합하는 것이에요.

---

## 핵심 원리 3가지

### 1. Process는 SKILL.md에, Context는 Reference 파일에 (공식 권장)

Anthropic 공식 베스트 프랙티스의 핵심:
> "process goes in skill.md, context goes in reference files."

**왜?** Claude의 작업 메모리(context window)에서 프로세스 지시와 배경 정보가 섞이면,
Claude가 "지금 뭘 해야 하는지" vs "참고 지식"을 구분하는 데서 오류가 생겨요.
상단 지시일수록 더 일관되게 따르기 때문에, SKILL.md는 절차만 넣고
카테고리별 지식은 별도 파일로 분리해야 해요.

### 2. Progressive Disclosure (점진적 노출)

Anthropic의 Context Engineering 가이드에서 강조하는 원칙:
> "Just-In-Time Context Loading — 필요할 때만 필요한 정보를 로드한다"

현재 문제: SKILL.md가 31,000자(약 600줄)로, 모든 정보가 한 번에 로드돼요.
카테고리별 정보까지 여기 넣으면 context rot(컨텍스트 품질 저하)이 발생해요.

해법: SKILL.md는 "어떤 파일을 언제 읽으라"는 네비게이션만 하고,
실제 카테고리별 지식은 reference/ 폴더에서 필요할 때만 로드해요.

### 3. Few-Shot Examples (실제 완성본이 1000마디 설명보다 강력)

Anthropic 공식 멀티샷 프롬프팅 가이드:
> "Examples are one of the most reliable ways to steer Claude's output format, tone, and structure."
> "3-5개 예시가 최적"

현재 양육비 글이 바로 이 역할을 해요. 하지만 1개만으로는 Claude가
"양육비 스타일"만 학습하고 다른 카테고리에 적용 못 할 수 있어요.
카테고리별로 1개씩, 총 3-5개의 골드 스탠다드 예시가 필요해요.

---

## 현재 구조의 문제점

```
article-writing/
├── SKILL.md          ← 600줄, 프로세스+규칙+컴포넌트가이드 전부 혼합
├── TEMPLATE.tsx      ← 코드 구조만 있음, "어떤 내용을 어떻게" 가이드 없음
├── component-guide.md
└── writing-rules.md
```

문제 1: SKILL.md가 너무 크고 모든 게 섞여 있음 → Claude가 핵심 절차를 놓침
문제 2: TEMPLATE.tsx는 코드 뼈대만 있고, 카테고리별 "이런 내용을 이렇게 채워라" 가이드가 없음
문제 3: 완성된 예시가 스킬 안에 없음 → Claude가 품질 기준을 추론해야 함
문제 4: 카테고리별 차별화 전략이 없음 → 세금 글이든 복지 글이든 같은 톤

---

## 제안 구조

```
article-writing/
├── SKILL.md                  ← 절차만 (200줄 이내)
├── TEMPLATE.tsx              ← 코드 뼈대 (현재 유지)
│
├── reference/                ← 카테고리 무관 공통 규칙
│   ├── writing-rules.md      ← 문체/금지단어/구어체 규칙
│   ├── component-guide.md    ← 16개 컴포넌트 매핑 테이블
│   ├── quality-checklist.md  ← 품질 체크리스트 (검증 스크립트용)
│   └── seo-rules.md          ← 타이틀/메타/캐노니컬 규칙
│
├── categories/               ← 카테고리별 도메인 지식
│   ├── 육아-복지.md           ← 아동수당/부모급여/어린이집 도메인
│   ├── 세금-연말정산.md       ← 소득세/연말정산/세액공제 도메인
│   ├── 부동산-주거.md         ← 전세/매매/임대차 도메인
│   ├── 고용-근로.md           ← 퇴직금/실업급여/최저임금 도메인
│   ├── 연금-보험.md           ← 국민연금/건강보험/개인연금 도메인
│   └── 대출-금융.md           ← 주담대/신용대출/금리 도메인
│
└── examples/                 ← 골드 스탠다드 완성본 (Few-Shot)
    ├── example-양육비.tsx     ← 법률/계산기 카테고리 예시
    ├── example-아동수당.tsx   ← 복지/신청절차 카테고리 예시
    └── example-연말정산.tsx   ← 세금/계산 카테고리 예시
```

---

## SKILL.md 리팩토링 설계

### 원칙: "500줄 이내, 절차만, 참조는 링크로"

```markdown
---
name: article-writing
description: "머니위키 TSX 글 작성. 키워드 → Q1-Q4 사고 → 구조 설계 →
템플릿 기반 작성. 글 작성/수정/리라이트 시 자동 또는 수동 호출."
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, WebFetch, WebSearch
---

# 머니위키 글 작성

## Step 1: 템플릿과 규칙 로드
1. TEMPLATE.tsx 읽기 → 코드 구조 파악
2. reference/writing-rules.md 읽기 → 문체 규칙 확인

## Step 2: 카테고리 식별 & 도메인 로드
키워드 분석 → 해당 카테고리 파일 읽기
- 육아/복지 키워드 → categories/육아-복지.md
- 세금/연말정산 → categories/세금-연말정산.md
- (이하 생략)

## Step 3: 유사 예시 로드
해당 카테고리와 가장 유사한 examples/ 파일 읽기
→ 톤, 깊이, 컴포넌트 사용법을 예시에서 학습

## Step 4: Q1-Q4 필수 사고
(현재 Q1-Q4 그대로)

## Step 5: 구조 설계 (PHASE 1)
타이틀 → H2 → 컴포넌트 매핑
→ reference/component-guide.md 참조

## Step 6: 글 작성 (PHASE 2)
TEMPLATE.tsx 복사 → 주제에 맞게 채우기
→ categories/{카테고리}.md의 출처/법령/수치 활용

## Step 7: 검증
reference/quality-checklist.md 기준으로 자가 검증
```

---

## 카테고리 파일 설계 (핵심 혁신)

### 역할: "이 카테고리 글을 쓸 때 Claude가 반드시 알아야 하는 것"

각 카테고리 파일에 포함할 내용:

```markdown
# 육아·복지 카테고리 도메인 가이드

## 핵심 법령 & 출처
- 아동수당법: https://www.law.go.kr/법령/아동수당법
- 영유아보육법: https://www.law.go.kr/법령/영유아보육법
- 아이돌봄지원법: ...
- 복지로: https://www.bokjiro.go.kr

## 2026년 기준 핵심 수치
- 아동수당: 만 8세 미만, 월 10만원
- 부모급여: 0세 월 100만원, 1세 월 50만원
- 첫만남이용권: 200만원 바우처
- 영아수당: 폐지 → 부모급여로 통합

## 이 카테고리 글의 특징
- 독자: 임신~초등 자녀 부모 (30대 중심)
- 핵심 니즈: "내가 받을 수 있는지", "얼마인지", "어떻게 신청하는지"
- 필수 컴포넌트: EligibilityChecker(대상 확인) + Steps(신청 절차)
- 자주 쓰이는 내부링크: 부모급여, 자녀장려금, 육아휴직급여

## 카테고리 특화 Q1-Q4 힌트
- Q1 전형 패턴: "아이가 태어났는데 뭘 받을 수 있지?"
- Q2 전형 패턴: "나도 대상인지 확인하고 신청까지 완료"
- Q3 필수 정보: 대상 조건, 금액, 신청 방법, 구비서류, 중복수급 여부
- Q4 추천 컴포넌트: GreenBox(핵심요약) → EligibilityChecker → Steps → DocTable → FAQ
```

### 왜 이게 핵심인가?

현재 시스템에서 Claude가 "아동수당" 글을 쓸 때:
1. SKILL.md에서 "Q1-Q4 하라"만 보고
2. 웹서치로 정보를 찾거나 기존 지식에 의존
3. 어떤 컴포넌트를 쓸지 매번 새로 판단
4. 결과: 카테고리마다 품질 편차가 큼

카테고리 파일이 있으면:
1. "육아-복지.md"를 읽고 → 법령/수치/출처가 이미 준비됨
2. "이 카테고리는 EligibilityChecker + Steps가 필수"를 알고 시작
3. Q1-Q4 힌트로 검색자 의도를 더 정확히 파악
4. 결과: 어떤 주제든 일관된 깊이와 구조

---

## 예시 파일 설계 (Few-Shot의 핵심)

### 역할: "이 수준으로 써라"를 코드로 보여주기

Anthropic 공식 가이드: "3-5개 예시가 최적, 다양한 카테고리를 커버해야 함"

| 예시 파일 | 카테고리 | 특징 | Claude가 배우는 것 |
|-----------|---------|------|-------------------|
| example-양육비.tsx | 법률/계산기 | Calculator + EligibilityChecker | 계산 로직이 있는 글의 깊이 |
| example-아동수당.tsx | 복지/신청 | Steps + GreenBox + FAQ | 신청 절차 글의 구조 |
| example-연말정산.tsx | 세금/계산 | 큰 숫자 테이블 + Calculator | 복잡한 수치 설명 방식 |

SKILL.md에서 참조 방식:
```markdown
## Step 3: 유사 예시 로드
카테고리에 맞는 예시 파일을 읽어라:
- 법률/소송/계산 관련 → examples/example-양육비.tsx
- 복지/수당/신청 관련 → examples/example-아동수당.tsx
- 세금/공제/환급 관련 → examples/example-연말정산.tsx

예시에서 확인할 것:
1. H2 하나당 몇 문단을 썼는지 (최소 3-4문단)
2. 데이터 상수(STEPS, FAQS 등)의 깊이
3. 구어체 톤과 전환 문장 스타일
4. 컴포넌트 배치 순서
```

---

## 검증 피드백 루프 설계

### Anthropic 권장: "Validator → Fix → Repeat"

```
글 작성 → verify-tsx-article.js 자동 실행 → FAIL이면 즉시 수정 → PASS까지 반복
```

현재 PostToolUse 훅이 이미 있지만, quality-checklist.md를 추가해서
Claude가 스스로 자가 검증할 수 있는 체크리스트를 줘요:

```markdown
# quality-checklist.md

## 자가 검증 체크리스트 (글 완성 후 반드시 확인)

### 구조 검증
- [ ] Q1-Q4 주석이 파일 상단에 있는가?
- [ ] H2가 3개 이상인가?
- [ ] 각 H2 아래 본문이 3문단 이상인가?
- [ ] 인터랙티브 컴포넌트가 1개 이상인가?

### 문체 검증
- [ ] ~해요/~이에요 구어체인가?
- [ ] 금지단어 없는가? (또한/결론적으로/다양한/매우 중요/확인하세요)
- [ ] "이 글에서는 ~알아볼게요" 같은 filler 없는가?

### 데이터 검증
- [ ] 모든 숫자에 출처가 있는가?
- [ ] 법령 링크가 law.go.kr인가?
- [ ] 2026년 기준 최신 수치인가?

### 코드 검증
- [ ] import는 ArticleLayout, Sidebar, ArticleAd 3개뿐인가?
- [ ] H2, GreenBox 등은 파일 내 자체 정의인가?
- [ ] layout.tsx에 metadata와 force-static이 있는가?
```

---

## 실행 로드맵

### Phase 1: 파일 구조 리팩토링 (즉시)
1. reference/ 폴더 생성 → writing-rules.md, component-guide.md 이동
2. quality-checklist.md 작성
3. SKILL.md를 200줄 이내로 축소 (절차만 남기기)

### Phase 2: 카테고리 파일 생성 (1-2일)
1. 6개 카테고리 파일 작성 (법령/수치/출처/Q1-Q4 힌트)
2. 각 카테고리별 웹서치로 2026년 최신 정보 확인
3. 카테고리 파일 내 내부링크 맵 추가

### Phase 3: 골드 스탠다드 예시 수집 (2-3일)
1. 양육비 글 → examples/example-양육비.tsx로 저장
2. 아동수당 리라이트 후 → examples/example-아동수당.tsx로 저장
3. 연말정산 글 작성 후 → examples/example-연말정산.tsx로 저장

### Phase 4: 통합 테스트 (3-5일)
1. 새 세션에서 "아동수당 글 써줘" → 시스템이 자동으로 작동하는지 확인
2. 다른 카테고리 "전세보증금" 글 → 카테고리 파일 자동 로드 확인
3. 품질 비교: 리팩토링 전 vs 후

---

## 조사에 사용한 출처

### Anthropic 공식 문서
- [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Multishot prompting guide](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/multishot-prompting)
- [Claude Code Skills docs](https://code.claude.com/docs/en/skills)
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

### GitHub & 커뮤니티
- [anthropics/skills repository](https://github.com/anthropics/skills)
- [Claude Skills deep dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/)
- [Skills architecture: SKILL.md separation](https://www.mindstudio.ai/blog/claude-code-skills-architecture-skill-md-reference-files)
- [Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [claudecode-writer (multi-format content)](https://github.com/WomenDefiningAI/claudecode-writer)
