# 머니위키 (jjyu.co.kr)

## 프로젝트

- **사이트**: jjyu.co.kr — 경제·금융 정보 위키
- **스택**: Next.js 16 + Tailwind CSS + shadcn/ui
- **배포**: Cloudflare Pages (main 푸시 → 자동 빌드, 30~50분 소요)
- **콘텐츠 자산** (2026-05-15 기준):
  - MD 1,961개 (`content/wiki/`) — 기존 글, 점진 리라이트 대상
  - 직접 TSX 1,518개 (`src/app/w/{slug}/`) — 폐기 패턴, 점진 마이그레이션
  - 계산기 53개 — **절대 불가침** (`scripts/calc-protected-slugs.json`)
  - 신규 articles (`src/data/articles/`) — 새 시스템, 점진 추가

---

## ★★★ 글 시스템 (2026-05-15 전면 재설계)

### 콘텐츠 형식 — 오직 하나
- 모든 신규/리라이트 글은 `src/data/articles/<카테고리>.ts`에 ArticleData로 작성
- 타입: `src/data/articles/types.ts`
- 렌더러: `src/components/article/ArticleShell.tsx`
- 라우팅 우선순위: **articles → MD → 404** (`src/app/w/[slug]/page.tsx` 자동 분기)

### 데이터 구조 (검색자 질문 흐름)
```ts
ArticleData {
  slug, category, meta { title, description, ogImage? }
  searchIntent { userQuestion, directAnswer, why }   // 검색자 즉답
  resolution { steps[], alternatives? }              // 해결 흐름
  context? { legalBasis?, edgeCases?, glossary? }    // 보충 정보 (점진 공개)
  sources[], lastVerified                            // 신뢰성
  relatedQuestions?                                  // 자연스러운 거미줄 (1~5개)
}
```

빈칸을 못 채우면 글 자체가 성립하지 않는 구조. Q1-Q4 주석 같은 메타 검증 폐기.

### 디자인 시스템
- 위치: `src/components/article/`
- 토큰: `tokens.ts` (에메랄드 #1D9E75 유지, 모바일 우선 720px)
- 컴포넌트: DirectAnswer, ResolutionFlow, EdgeCases, SourceFooter, RelatedQuestions, ArticleShell
- 원칙: 즉답 우선 · 점진 공개 · 모바일 우선

### 글 작성 — 서브에이전트 파이프라인 (.claude/agents/)
```
사용자 키워드
   ↓
orchestrator (Opus) — 신규/리라이트 판정 + URL 보존 + 통합맵 확인 + 허브-스포크 분해
   ↓
researcher (Sonnet) — 검색의도 추론 + Playwright로 공식 사이트 원문 추출·스크린샷·증거 JSON
   ↓
orchestrator — 증거를 scripts/evidence/<slug>.json + 스크린샷 폴더로 저장
   ↓
writer (Sonnet) — src/data/articles/<카테고리>.ts에만 작성 (타이틀 공식 + CTA 필수)
   ↓
qa (Sonnet) — 17개 기준 PASS/FAIL (증거 JSON 대조 포함, 수정 권한 없음)
   ↓ FAIL → writer 재호출 (최대 2회)
   ↓ PASS → 같은 slug의 TSX 폴더 삭제 (그림자 제거) → 완료
```

각 에이전트 명세: `.claude/agents/moneywiki-*.md`

---

## ★ 절대 규칙

### ★★★ Playwright 1:1 대조 의무 (글 작성 시) — 2026-08-12 Claude in Chrome에서 전환
글 작성/리라이트할 때 **Playwright로 정부 공식 사이트를 직접 열어** 사실을 1:1 대조한다.
WebSearch/WebFetch 기반 사실 수집 금지. 학습 데이터에만 의존 금지.

**의무 대조 사이트** (researcher 에이전트가 자동 호출):
- 법령 → 법제처 (law.go.kr)
- 세금 → 국세청 (nts.go.kr) / 홈택스 (hometax.go.kr)
- 근로 → 고용노동부 (moel.go.kr) / 고용보험 (ei.go.kr)
- 연금 → 국민연금공단 (nps.or.kr)
- 부동산 → 국토교통부 (molit.go.kr) / 한국부동산원 (reb.or.kr)
- 복지 → 복지로 (bokjiro.go.kr) / 정부24 (gov.kr)
- 금융 → 금융감독원 (fss.or.kr) / 금융위원회 (fsc.go.kr)

**대조 절차**:
1. `mcp__playwright__browser_navigate` → 해당 정부 사이트 열기
2. `mcp__playwright__browser_evaluate` → 법령 조문/시행일/세율 원문 텍스트 추출 (innerText)
3. `mcp__playwright__browser_take_screenshot` → 수치·조문이 보이는 화면 캡처 (증거)
4. ArticleData의 `context.legalBasis[i].excerpt`에 **원문 그대로 복사** (의역/요약 금지)
5. 시행일·금액·이율은 페이지에서 직접 확인 (절대 추정 금지)
6. 증거 JSON(`scripts/evidence/<slug>.json`)에 facts 기록 → qa가 글의 모든 수치를 기계 대조

**금지**:
- 사실 확인 없이 글 작성
- 학습 데이터 기반 추정으로 숫자/날짜 작성
- 정부 사이트 안 가고 "약 ~" "보통 ~" 같은 모호한 표현

**글당 소요 시간**: 5~15분 (자료 수집 3분 + 작성 3분 + QA 2분 + 재작성 5분)

---

### 계산기 54개 — 절대 불가침 (slug 기준!)
`scripts/calc-protected-slugs.json`에 등재된 slug는 어떤 경우에도 수정하지 않는다. 새 시스템에서도 보호.
**⚠️ 계산기는 TSX만이 아니다 (2026-08-12 확인)**: 54개 중 36개는 `content/wiki/<slug>.md`
(frontmatter `schemaType: calculator`)로 존재. 보호는 파일 위치가 아니라 slug 기준 —
해당 slug의 MD 파일도 절대 수정/삭제 금지.

### URL 보존
리라이트 시 기존 slug 그대로. 새 slug 절대 생성 금지.

### 신규/리라이트 확인
키워드 받으면 반드시 신규/리라이트 확인 후 작업. 무작정 신규 URL 생성 금지.

### 콘텐츠 형식 단일화
- 신규 글 ≠ `src/app/w/<slug>/page.tsx`
- 신규 글 = `src/data/articles/<카테고리>.ts` 의 ArticleData
- 계산기는 예외 (54개만)

### 타이틀 공식 — 2026-08-12 확정
`메인키워드 + 행동 세부키워드(신청방법/언제/사용처/조회) + 후킹("~부터 ~까지", "~은?")`
- 파이프(|)·의문문 허용, 50자 이내
- **종결어미 금지**: "~나요/~해요/~합니다/~된다" 사용 불가. 명사형 종결 또는 "~까?/~은?"만
- 예: "민생회복지원금 신청방법과 사용처 조회 | 언제부터 언제까지?"

### 허브-스포크 + 행동 CTA
- 큰 키워드는 허브(대표글) + 스포크(신청방법/언제/사용처/조회/대상)로 분해, relatedQuestions로 상호 연결
- 신청/조회형 글은 `resolution.steps[].action`(공식 사이트 버튼) 필수 — "복지로에서 신청하기"
- 광고를 버튼처럼 배치하는 것은 AdSense 정책 위반 — CTA는 .go.kr/.or.kr 링크만

### TSX 그림자 (리라이트 필수 절차)
Next.js는 정적 라우트가 [slug]를 이긴다. articles에 글을 써도 같은 slug의
`src/app/w/<slug>/`가 있으면 새 글이 안 보인다 → **리라이트 완료 시 해당 TSX 폴더 삭제**
(계산기 slug 제외). 슬러그 충돌 현황: `scripts/conflict-map.json`

### 유사 슬러그 통합
리라이트 전 `scripts/consolidation-map.json` 확인 — 클러스터 소속이면 대표(canonical) slug에
작성하고 absorbed는 301 후보로 보고. (301 적용은 사용자 승인 후)

### AdSense 정책 안전
- "축하해요", "대상이에요!" 등 과장/오해 유발 문구 금지
- 수익 보장, 확정적 표현 금지

### ★ 작성자/검수자 표기 거짓 금지 (AdSense + 법령 안전)
- 실제 공인노무사/세무사/변호사가 검수하지 않았다면 **"검수" 표기 절대 금지**
- AI 작성 글은 **"AI 작성 · 공식 출처 인용"** 으로 솔직하게 표기
- 저자 bio에 "변호사·노무사의 법률 자문을 대신할 수 없다" 명시
- 면책 조항(disclaimer)에 "정확한 권리 행사는 전문가 상담 필수" 명시
- 실제 검수자 확보 전까지 "검수자" "감수자" 표기 일체 금지

---

## 파일 구조

```
src/
├── app/w/[slug]/page.tsx         # 라우터 (articles 우선 → MD fallback)
├── components/article/           # ★ 새 디자인 시스템
│   ├── tokens.ts
│   ├── ArticleShell.tsx          # 최상위 렌더러
│   ├── DirectAnswer.tsx
│   ├── ResolutionFlow.tsx
│   ├── EdgeCases.tsx
│   ├── SourceFooter.tsx
│   ├── RelatedQuestions.tsx
│   └── index.ts
├── components/article-ui/        # 구 시스템, 점진 폐기 예정
├── data/articles/                # ★ 새 콘텐츠
│   ├── types.ts                  # ArticleData 등 타입
│   └── <카테고리>.ts             # 카테고리별 글
└── lib/articles.ts               # getArticle, getAllArticleSlugs

.claude/agents/                   # ★ 서브에이전트 파이프라인
├── moneywiki-orchestrator.md
├── moneywiki-researcher.md
├── moneywiki-writer.md
└── moneywiki-qa.md

scripts/
├── calc-protected-slugs.json     # 계산기 53개 (불가침)
├── rewrite-queue.json            # 리라이트 대기열
├── rewrite-progress.json         # 진행률
└── verify-calculations.py        # 계산기 오차 검증 (유지)

content/wiki/                     # 기존 MD 1,961개 (점진 리라이트)
```

---

## 폐기된 시스템 (2026-05-15)

- **검증 훅 4개**: `pre-guard-calculator.js`, `pre-check-q1q4-map.js`, `verify-tsx-article.js`, `verify-reader-perspective.js` → QA 에이전트로 이동
- **검증 스크립트 4개**: `verify-search-intent.js`, `verify-quality.js`, `verify_all.py`, `suggest-structure.js`
- **스킬**: `.claude/skills/article-writing/` 전체 (SKILL.md, TEMPLATE.tsx, writing-rules.md)
- **TEMPLATE.tsx 자체 정의 패턴**: 글마다 H2/GreenBox/FAQ 자체 정의 폐기 → article 컴포넌트 일관 사용
- **Q1-Q4 주석 강제**: 데이터 구조 자체가 검색 의도를 강제하므로 불필요
- **카테고리 guide.ts**: `src/data/실업급여-guide.ts` 등 → articles로 통합 예정

---

## 빌드

```bash
npm run build    # 30~50분 소요. 50개 배치 단위로 1회씩.
```

- 절대 1글 작성 후 빌드하지 않음 (시간 폭증)
- 카테고리 1개 완료 또는 50개 모이면 빌드
- 빌드 실패 시 즉시 stop → 원인 분석 후 재시도

---

## 환경

- Windows 11
- PowerShell 기본 / Bash 사용 가능
- 빌드 시 `.next` 캐시 프로세스 잠금 주의

---

## 작업 흐름 (사용자 → 에이전트)

```
사용자: "퇴직금 1년 미만 키워드 리라이트"
   ↓
Claude(메인): Agent(moneywiki-orchestrator) 호출
   ↓
orchestrator 내부에서 researcher → writer → qa 순서 실행
   ↓
Claude(메인): 결과 보고 (PASS/FAIL, 작성된 파일 경로)
   ↓
50개 모이면 npm run build → 통과 시 commit & push
```
