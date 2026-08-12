# 머니위키 (jjyu.co.kr)

- **스택**: Next.js 16 + Tailwind + shadcn/ui · Cloudflare Pages (main 푸시 → 자동 빌드 ~15분)
- **정본 템플릿**: `docs/moneywiki-article-template.html` ← 모든 글은 이 실물이 기준. 규칙과 템플릿이 다르면 템플릿이 이긴다.

---

## 글 생산 3단계 (키워드 → 완성)

### 1. 타이틀 — 공식
`메인키워드 + 세부(행동)키워드 나열 + 후킹`
- 세부키워드: 신청방법 / 언제 / 사용처 / 조회 / 조건 / 서류
- 후킹: "~부터 ~까지", "~은?", "~될까?", "어디까지 되는지"
- 예: "민생회복지원금 언제 신청 가능한지부터 방법 및 사용처 조회까지"
- 예: "한의원 실비 청구되나요? 침 추나 한약 어디까지 되는지"
- 참고 캡처: `C:\Users\user\gov-jjyu\reference\titles\` (INDEX.md에 실제 목록)

### 2. 본문 — 행동이 최상단 (Clarity 실측: 상단 버튼 50~57% 클릭, 중간 0~1)
```
heroHook  서론이 타이틀이 나열한 항목을 그대로 폅니다. 결론부터.
          "되고 안 되고를 가르는 기준은 하나입니다. ~ 먼저 확인하셔야겠죠."
heroAct   대형 CTA 버튼 1개 ("지원 자격 조회하기 →") — 공식 사이트(.go.kr/.or.kr)로
핵심콕콕   keyFacts 카드 (대상/금액/기준/신청처 표)
qa 1~8    소제목 = 검색자 질문형 ("추나 실비 적용되나요? 횟수 제한은?")
          각 섹션 첫 문장 = 결론. 비주얼(체크리스트/통계/표/스텝) 먼저, 해설 뒤.
          qa1은 행동(신청 방법) — hero 버튼이 받는다
FAQ       아코디언 · 3줄 요약 · 스포크 사이드바(허브-스포크 연결)
```
- **톤: 합니다체** ("지원됩니다", "확인하세요") — 템플릿 그대로. 해요체 강제 규칙은 폐기 (2026-08-12)
- "총정리"는 타이틀에 허용 (참고 캡처들이 실제로 사용)
- 광고: 상단 배너는 CTA와 분리(점선 테두리 유지), 광고에 초록색 금지, 버튼처럼 보이는 배치 금지

### 3. 사실 검증 — 스크립트 자동화 (에이전트·웹검색 없음)

```bash
# ① 증거 수집: Playwright가 공식 사이트를 열어 원문 추출 + 조문별 스크린샷
npm run evidence <slug> -- --law 지방세법:75,78,79 --url https://www.wetax.go.kr
#    → scripts/evidence/<slug>.json + scripts/evidence/<slug>/*.png

# ② 글 작성: 위 증거 JSON의 quote/value 안에서만 숫자를 쓴다 (src/data/articles/<카테고리>.ts)

# ③ 대조: 본문의 모든 수치를 증거와 기계 대조. 근거 없으면 exit 1
npm run verify:evidence

npm run build   # prebuild에 ③이 걸려 있어 증거 없는 글은 빌드가 실패한다
```

- 수집기 `scripts/collect-evidence.mjs` — chromium 직접 구동. WebSearch/WebFetch 코드 경로 자체가 없음
- 대조기 `scripts/verify-evidence.mjs` — 수치 매칭 + 스크린샷 실존 확인. 예시 계산값은 증거 JSON의 `exampleValues`에 선언해야 통과
- **서브에이전트 파이프라인(moneywiki-orchestrator/researcher/writer/qa)은 2026-08-12 폐기·삭제.** 구 시스템과의 충돌 방지

---

## 불가침 규칙

1. **계산기 54개** (`scripts/calc-protected-slugs.json`) — slug 기준 보호. **36개는 content/wiki MD로 존재** — MD도 수정/삭제 금지
2. **URL 보존** — 리라이트는 기존 slug 그대로. 새 slug 생성 금지
3. **TSX 그림자** — articles에 글을 써도 같은 slug의 `src/app/w/<slug>/`가 있으면 안 보인다 → 리라이트 완료 시 해당 TSX 폴더 삭제 (계산기 제외). 현황: `scripts/conflict-map.json`
4. **유사 슬러그 통합** — 작업 전 `scripts/consolidation-map.json` 확인. 클러스터 소속이면 대표 slug에 작성. 301 적용은 사용자 승인 후
5. **AdSense 안전** — 과장("축하해요", "확정 지급") 금지 · 광고를 CTA처럼 위장 금지 · 거짓 검수자 표기 금지
6. **신규/리라이트 확인** — 키워드 받으면 기존 글 존재 여부부터 확인

---

## 콘텐츠 위치

- 신규/리라이트 글 = `src/data/articles/<카테고리>.ts` (ArticleData, 타입: `types.ts`)
- 렌더러 = `src/components/article/ArticleShell.tsx` (템플릿 HTML을 이식할 대상)
- 라우팅 = articles → MD → 404 (`src/app/w/[slug]/page.tsx`)
- 자산: MD 1,961 (그중 1,319는 TSX에 가려진 사문서) · TSX 1,518 (폐기 패턴) · articles 시작 단계

## 빌드

- `npm run build` ~15분. **글 1개마다 빌드 금지** — 50개 배치 또는 카테고리 단위
- 푸시 전 5분 쿨다운 훅 있음. 빌드 실패 시 즉시 stop → 원인 분석
