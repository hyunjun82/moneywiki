# 머니위키 작업 규칙

---

## 신규 vs 리라이트 확인 (최우선!)

**키워드를 받으면 작업 시작 전 반드시 물어볼 것:**
```
"이 키워드는 신규 글인가요, 기존 글 리라이트인가요?"
```

- 기존 사이트에 이미 있는 키워드 → **무조건 리라이트** (기존 URL 유지, 내용만 업그레이드)
- 신규 = 새 URL 생성
- **확인 없이 신규 생성 절대 금지**
- 중복 확인: `content/wiki/` + `src/data/spoke/` + `src/data/hub/` 전체 검색

---

## 절대 금지

- 범용 서브에이전트(Explore, general-purpose 등) 사용 금지 (settings.json deny에서 차단됨)
- `.claude/agents/` 에이전트 팀은 허용
- 이 규칙 위반 시 즉시 중단

---

## 프로젝트 정보

| 항목 | 값 |
|------|-----|
| 경로 | `C:\Users\user\wiki-site` |
| GitHub | hyunjun82/moneywiki |
| 도메인 | jjyu.co.kr |
| 위키 URL | `https://jjyu.co.kr/w/[슬러그]` |

---

## 글 형식 2가지 — 반드시 구분!

### A. 위키 마크다운 글 (content/wiki/*.md)

- **용도**: 일반 위키 글, 계산기 페이지, 양식 페이지
- **파일 위치**: `content/wiki/[슬러그].md`
- **템플릿**: `.claude/references/moneywiki-template3358.md`
- **배포**: `git add content/wiki/[파일명].md && git commit && git push`

### B. TSX 스포크/허브 글 (src/data/spoke/*.tsx, src/data/hub/*.tsx)

- **용도**: 허브&스포크 구조의 심층 콘텐츠
- **파일 위치**: `src/data/spoke/[슬러그].tsx` 또는 `src/data/hub/[슬러그].tsx`
- **템플릿**: 아래 참조 파일 목록 참고
- **배포**: `git add src/data/spoke/[파일명].tsx && git commit && git push`
- **등록 필수**: `src/data/spoke/registry.ts` 또는 `src/data/hub/registry.ts`에 import + 등록

**어떤 형식인지 모르면 사용자에게 물어볼 것!**

---

## 위키 MD 글 작성 단계

### 1단계: 템플릿 읽기
```
Read(".claude/references/moneywiki-template3358.md")
```

### 2단계: 정보 확인 (WebFetch 우선!)
```
1. WebFetch 먼저 (정부/공식 URL 직접 접속)
   - korea.kr, nts.go.kr, fss.or.kr, moel.go.kr, easylaw.go.kr
   - law.go.kr, bokjiro.go.kr, hf.go.kr, nhuf.molit.go.kr
2. 못 찾으면 WebSearch (fallback)
3. 블로그/개인사이트/위키백과 절대 금지
```

### 3단계: 글 작성
- 구어체 (~이에요, ~해요)
- 20~80대 누구나 이해
- H2에 베이스 키워드 포함
- H2 4개 = keywords 4개 (질문형)

### 4단계: 배포
```bash
git add content/wiki/[파일명].md && git commit -m "feat: [제목]" && git push
```

---

## TSX 스포크/허브 작성 단계

### 1단계: 템플릿 읽기
```
스포크: Read(".claude/references/spoke-template.md") + Read(".claude/references/spoke-rules.md")
허브:   Read(".claude/references/hub-template.md") + Read(".claude/references/hub-rules.md")
체커:   Read(".claude/references/checker-patterns.md")
```

### 2단계: 정보 확인 (위키 MD와 동일)

### 3단계: 글 작성
- spoke-rules.md / hub-rules.md 규칙 준수
- 컴포넌트 API는 spoke-template.md가 유일한 정답

### 4단계: 등록 + 배포
```bash
# registry.ts에 import + 등록 추가 후
git add src/data/spoke/ && git commit -m "feat: [제목]" && git push
```

---

## Frontmatter 필수 (위키 MD 전용)

```yaml
---
title: "롱테일 키워드 제목 | 보조 키워드"  # 60자 이내, 구분자 | 사용
description: "100~150자. 구어체 2문장. 키워드 3개+ 자연 포함. 행동유도 마무리"
category: "카테고리"
keywords: ["키워드1", "키워드2", "키워드3", "키워드4"]  # 정확히 4개
author: "머니위키 에디터"
updateNote: "2026년 2월 기준"
lastUpdated: "2026-02-15"
datePublished: "2026-02-15"
summary:
  - "핵심 1 (구체 숫자 포함)"
  - "핵심 2"
  - "핵심 3"
sources:
  - name: "출처명"
    url: "https://딥링크-URL"  # 메인페이지 금지, 해당 콘텐츠 직접 URL
    date: "2026-02"
faq:  # 2개, H2 소제목과 안 겹침
  - question: "[베이스키워드] + 질문?"
    answer: "구어체 답변 2~3문장"
  - question: "[베이스키워드] + 질문?"
    answer: "구어체 답변 2~3문장"
ctaCard:  # 필수! 클릭 유도 버튼
  label: "10초 계산"           # 행동 + 시간 (조회/계산/신청/확인)
  mainText: "14일 넘기면 연 20% 이자"  # 구체 숫자 + 핵심 정보
  subText: "내 지연이자 얼마인지"       # 독자 행동 유도
  url: "/w/관련-계산기-또는-외부URL"
  external: false              # 외부 URL이면 true
relatedDocs:
  - title: "관련문서"
    url: "/w/슬러그"
---
```

### description 규칙 (중요!)

```
글자수: 100~150자 (구글 meta description 최대 155자)
키워드: 4개 중 최소 3개 자연 포함
구조: 2문장 (호기심 유발 + 해결 제시)
문체: ~요체 (이에요/해요/드려요)
금지: "~알아봅니다", "~총정리", 키워드 나열
```

**나쁜 예 (절대 금지):**
```
"기초생활수급자, 생계급여, 1인가구, 계산기, 2026년"
→ 키워드만 나열. 문장이 아님. 클릭 안 됨.

"기초생활수급자에 대해 알아봅니다"
→ 호기심 없음. 내용 예측 불가. CTR 최악.

"기초생활수급자 조건 소득인정액 계산 1인가구 생계급여 의료급여 주거급여 교육급여 총정리"
→ 키워드 과적. 스팸으로 인식됨.
```

**좋은 예:**
```
"2026년 기초생활수급자 선정 기준이 바뀐 거 아시나요? 1인가구 소득인정액 계산법부터 급여별 조건까지 알려드려요."
→ 구체 사실 + 호기심 + 자연스러운 키워드 배치. 131자.

"퇴직금을 14일 안에 못 받으면 연 20% 이자가 붙어요. 지연이자 계산 방법과 청구 절차를 정리했어요."
→ 숫자 충격 + 해결 약속. 116자.
```

3가지 패턴 순환 (같은 허브 내 중복 금지):
- **A. 놀라움형**: "[사실]~라는 거 아시나요? [키워드 배치] 알려드려요"
- **B. 문제해결형**: "[고민] 고민이시죠? [키워드 배치] 방법을 알려드려요"
- **C. 숫자형**: "[숫자]~라는 사실, 알고 계셨나요? [키워드 배치] 정리해드려요"

### ctaCard 규칙 (필수!)

모든 위키 MD 글에 ctaCard 필수. 서론 바로 뒤에 자동 렌더링됨.

```yaml
# 내부 계산기 연결
ctaCard:
  label: "10초 계산"
  mainText: "핵심 숫자 + 정보"
  subText: "행동 유도"
  url: "/w/계산기-슬러그"

# 외부 정부 사이트 연결 (딥링크!)
ctaCard:
  label: "30초 조회"
  mainText: "핵심 정보"
  subText: "정부 사이트 바로가기"
  url: "https://딥링크-직접-페이지-URL"  # 메인페이지 금지!
  external: true
```

### ext-btn 규칙 (본문 마지막 H2 뒤, 출처 앞)

```html
<!-- 정부/공식 (검정) -->
<a href="딥링크URL" target="_blank" rel="noopener noreferrer" class="ext-btn ext-btn-black">
  <span class="ext-btn-badge">기관명 공식</span>
  <span class="ext-btn-text">서비스명</span>
  <span class="ext-btn-cta">바로가기 →</span>
</a>

<!-- 신청/조회 (파랑) -->
<a href="딥링크URL" target="_blank" rel="noopener noreferrer" class="ext-btn ext-btn-blue">
  <span class="ext-btn-badge">무료 조회</span>
  <span class="ext-btn-text">서비스명</span>
  <span class="ext-btn-cta">조회하기 →</span>
</a>
```

---

## 5원칙 (위반 시 재작성)

1. **텍스트가 주인공** - 테이블 2개 이하
2. **구어체 필수** - ~이에요, ~해요 (~습니다/됩니다 절대 금지)
3. **독자 중심** - 20~80세 누구나 이해 가능
4. **섹션당 4문장 이상** - 단락이 짧으면 AI 티 남
5. **FAQ는 frontmatter/data만** - 본문에 FAQ 섹션 금지

---

## H2 규칙 (PAA 노출)

```
Keywords 4개 = H2 4개 (질문형)
모든 H2에 베이스 키워드 포함!

BAD:  "면책까지 하면 추가 비용 있나요?"
GOOD: "개인파산 면책까지 하면 추가 비용 있나요?"
```

---

## 링크 규칙

| 타입 | 형식 | 새창 |
|------|------|------|
| 내부링크 | `[키워드](/w/슬러그)` | X |
| 계산기 | `[계산기](/calculators/슬러그)` | X |
| 외부링크 | `[기관명](https://딥링크URL)` | O (target="_blank") |

- 내부링크는 관련 있는 글만 자연스럽게 (억지로 개수 채우기 금지)
- 외부링크는 반드시 **딥링크** (메인페이지 금지, 해당 콘텐츠 직접 URL)
- 출처는 본문 인라인 + 하단 출처 섹션 이중 표기

---

## 정보 정확성

| 항목 | 값 |
|------|-----|
| 세액공제 (5,500만원 이하) | **16.5%** |
| 세액공제 (5,500만원 초과) | **13.2%** |
| 퇴직금 지연이자 | **연 20%** |
| 퇴직금 지급기한 | **14일** |
| 청구권 소멸시효 | **3년** |

- 모든 금액: 원 단위까지 정확 (오차 0원)
- 연도: 2026년 기준만 (이전 연도 혼입 금지)
- 출처 없는 숫자 생성 절대 금지

---

## 금지 사항

- 이모지 사용 금지
- `## 1. 제목` (숫자 헤딩 금지)
- 본문에 FAQ 섹션 금지
- description "~알아봅니다" 금지
- 단일 키워드 제목 금지
- 15%, 12% 세율 (구버전 수치 금지)
- title에 "총정리", "완벽정리", "가이드" 금지
- title 구분자 — (긴대시), : (콜론) 금지 → | (파이프) 사용

---

## 최종 체크리스트

### 위키 MD 글
- [ ] Keywords 4개 = H2 4개 (질문형)?
- [ ] 모든 H2에 베이스 키워드?
- [ ] 각 섹션 4문장 이상?
- [ ] description 100~150자, 구어체 2문장?
- [ ] ctaCard 있음?
- [ ] 출처 섹션 있음 (딥링크)?
- [ ] FAQ 2개 (H2와 안 겹침)?
- [ ] ext-btn 있음 (본문 마지막)?
- [ ] 내부링크 실존 슬러그 확인?

### TSX 스포크
- [ ] title-first: title 먼저 쓰고 나머지 파생?
- [ ] title: "[롱테일, 자연어] | [보조 롱테일/질문]" 60자 이내?
- [ ] 컴포넌트 4종류+ 사용?
- [ ] 같은 컴포넌트 연속 금지?
- [ ] SpokeTable 2개 이하?
- [ ] SpokeLinks 최소 2개 섹션에 배치?
- [ ] quickAnswer 있음?
- [ ] bridgeCTA 있음?
- [ ] 체커 컴포넌트 있음 (해당 시)?
- [ ] 내부링크 전부 실존 슬러그?
- [ ] registry.ts 등록?

### 배포
- [ ] git push 완료?
- [ ] Vercel 빌드 성공?

---

## 참조 파일 목록

### 위키 MD 전용
| 파일 | 용도 |
|------|------|
| `.claude/references/moneywiki-template3358.md` | 위키 MD 템플릿 (서론/본문/시각요소/출처/ctaCard/ext-btn) |

### TSX 스포크/허브 전용
| 파일 | 용도 |
|------|------|
| `.claude/references/spoke-template.md` | 스포크 컴포넌트 API (11개 컴포넌트 props, 금지 패턴) |
| `.claude/references/spoke-rules.md` | 스포크 작성 규칙 (도입부, 문체, 전환, bridgeCTA, FAQ) |
| `.claude/references/hub-template.md` | 허브 템플릿 (spokeGrid, sections 구조) |
| `.claude/references/hub-rules.md` | 허브 작성 규칙 (10개 규칙 + 체크리스트) |
| `.claude/references/checker-patterns.md` | 체커 5가지 유형 (A~E) + RSC-Safe 패턴 |

### 공통
| 파일 | 용도 |
|------|------|
| `.claude/references/writing-rules.md` | SEO 메타 + 스키마 규칙 (title/description/JSON-LD) |
| `.claude/commands/keywords.md` | `/keywords` 슬래시 명령어 (키워드 생성 + 중복 체크 + 비주얼 프리셋) |

---

## 백업 보호 (절대 삭제 금지!)

`.claude/backup-legacy-agents/` 폴더는 **사용자 명시적 요청 없이 절대 삭제/수정 금지**.

---

## 배치 작성 (10개 단위)

```
1. /keywords [시드키워드] → 키워드 10개 생성
2. 각 키워드별 글 작성 (위키 MD 또는 TSX 스포크)
3. 훅이 자동 검증 (통과해야 저장됨)
4. 10개 완료 후 중간 빌드 체크
5. 다음 10개
```

**규칙 위반 징후**:
- 테이블 3개 이상 → 텍스트로 풀어쓰기
- ~습니다 → ~이에요로 교체
- 섹션 2문장 → 4문장 이상으로 보충
- description이 키워드 나열 → 2문장 구어체로 재작성
