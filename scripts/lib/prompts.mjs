/**
 * 헤드리스 지시문 — 계획 · 캡처 읽기 · 작성 · 고치기.
 * 검사기(verify-evidence·verify-rendered·check-draft)의 규칙을 글자 그대로 담는다.
 * 규칙이 바뀌면 여기와 검사기를 함께 바꾼다.
 */

const j = (v) => JSON.stringify(v, null, 1);

/** 증거 JSON → 지시문에 넣을 요약. 숫자 문장(facts) · 페이지 원문(raws) · 캡처에서 읽은 것 */
export function evidenceDigest(ev, { maxFacts = 320, maxRawChars = 6000, maxRawTotal = 90000 } = {}) {
  const facts = [];
  const seen = new Set();
  for (const f of ev.facts || []) {
    if (!f?.quote || seen.has(f.quote)) continue;
    seen.add(f.quote);
    facts.push(`- [${f.org}] ${f.value} | ${f.quote}`);
    if (facts.length >= maxFacts) break;
  }
  let total = 0;
  const raws = [];
  for (const r of ev.raws || []) {
    const t = String(r.text || "").replace(/\s+/g, " ").trim().slice(0, maxRawChars);
    if (!t) continue;
    if (total + t.length > maxRawTotal) break;
    total += t.length;
    raws.push(`### ${r.org} | ${r.url}\n${t}`);
  }
  const captures = Object.entries(ev.capturesReviewed || {}).map(([f, l]) => `- ${f}: ${l}`);
  return { facts: facts.join("\n"), raws: raws.join("\n\n"), captures: captures.join("\n") };
}

export function planPrompt({ slug, topic, category, categories, keywords, registry, related, today, rewrite, oldTitle, retryNote }) {
  return `당신은 머니위키(jjyu.co.kr) 편집자입니다. 도구를 쓰지 마세요. 필요한 자료는 전부 아래에 있습니다.
할 일: 검색자 질문을 군집으로 묶어 글 한 편의 설계도(JSON)를 만듭니다. 글은 아직 쓰지 않습니다.
${retryNote ? `\n※ 이전 답이 거부된 이유 — 이번엔 반드시 고칩니다:\n${retryNote}\n` : ""}
## 글
- slug: ${slug} (URL 입니다. 바꾸지 않습니다)
- 주제: ${topic}
- 카테고리: ${category ? `${category} (지정됨)` : `${categories.join(" / ")} 중 하나를 고릅니다`}
- 오늘: ${today}
${rewrite ? `- 리라이트입니다. 기존 글이 검색에 노출 중이라, 순위를 만든 검색어를 타이틀에 유지합니다.${oldTitle ? ` 기존 제목: "${oldTitle}"` : ""}` : "- 새 글입니다 (URL 은 기존 주소를 그대로 씁니다)."}

## 검색어 자료 (네이버 자동완성 · 연관검색어 · 지식iN 질문. 많이 물은 순)
${j(keywords)}

## 이 사이트에 이미 있는 글 (관련 글 링크는 이 안에서만 고릅니다)
${related.join(", ") || "(없음)"}

## 공식 출처 등록부 — 지금까지 Playwright 로 열어 본문 추출에 성공한 주소. 근거 페이지는 여기서 고릅니다
${registry.map((r) => `- ${r.org} | ${r.url} | 쓴 글 ${r.usedBy.length}편 | ${r.preview}`).join("\n") || "(비어 있음)"}

## 규칙
1. 군집 2~4개. 군집 하나 = 대제목(h2) 하나 = 검색자가 정말 알고 싶은 것 하나. 군집마다 세부 질문(h3) 1~3개, 전체 h3 는 6~9개. h2·h3 는 검색자가 실제로 묻는 문장 그대로 "~나요" 로 끝냅니다.
2. 타이틀은 명사형이고 군집을 그대로 나열합니다. 기계가 타이틀에서 항목 수를 세어 대제목 수와 비교합니다. 세는 법:
   - 쉼표(,)로 나눈 조각마다 1개. 조각 안의 '와 / 과 / · / 및' 마다 +1.
   - '…부터 …까지' (또는 '…부터 … 총정리/정리') 조각은 2개 + 그 조각의 '부터' 앞에 있는 연결어 수.
   - 예) "실업급여 신청 방법과 준비물, 이직확인서부터 첫 실업인정까지" = (1+1) + 2 = 4개 → 대제목 4개.
   - 예) "주민세 종류·금액·납부기간 총정리 (2026)" = 3개 → 대제목 3개.
   - 그래서 타이틀 안의 낱말에 '과·와·및·중점(·)' 글자가 들어가면 안 됩니다 (효과·결과·과태료·기간과·와중 같은 낱말 금지). 연도는 끝에 " (${today.slice(0, 4)})" 로만.
   - 항목 수가 군집 수와 다르면 설계도가 거부됩니다. 출력 전에 직접 세어 봅니다.
3. primaryKeywords 2~3개: 검색량이 큰 메인 검색어. 그중 2개 이상이 타이틀에 글자 그대로 들어가야 합니다.
4. eyebrow: 대제목마다 4~8자 주제 라벨(예: "지원 대상", "보험료 비교"). 대제목 문장의 앞부분을 잘라 쓰면 거부됩니다.
5. laws: 글이 인용할 조문만. articles 는 숫자만 (예: 40, 41). "제40조" 처럼 쓰지 않습니다. '조의N' 조문은 "19의2" 로 적습니다 (예: 국민연금법 실업크레딧 = "19의2"). 법령 이름은 법제처 정식 명칭(고용보험법 / 고용보험법 시행령 / 국민건강보험법 / 국민연금법 …). 시행령·시행규칙은 별도 항목.
6. urls: 본문 근거로 쓸 공식 페이지 2~5개. 등록부에서 고릅니다. 등록부에 꼭 필요한 것이 없으면 .go.kr/.or.kr 주소를 새로 적고 "new": true 를 붙입니다 (Playwright 가 실제로 열어 봅니다. 안 열리면 버려집니다). 기관 홈(예: https://www.nps.or.kr/) 은 금지. 그 내용이 실제로 적힌 화면이어야 합니다.
7. ctas: 독자가 누를 버튼 2~4개. 신청·조회·계산·발급을 실제로 하는 화면. label 은 행동형("임의계속가입 신청하기"). "보기" 로 끝나는 열람형 금지. 어느 대제목 아래에 둘지 forSection 에 h2 문장을 적고, 첫 화면 대형 버튼 하나에 "hero": true. 주소는 Playwright 가 실제로 열어 신청·조회 요소가 있는지 봅니다 — 안내·개편·점검 페이지나 열리지 않는 주소는 버려집니다. 확실하지 않은 깊은 주소보다, 등록부에 있는 주소나 그 기관의 민원·신청 메뉴 첫 화면이 낫습니다. 실손24(insu24.or.kr)처럼 첫 화면이 곧 그 일을 하는 화면이면 도메인만 있는 주소도 됩니다.
8. relatedSlugs 3~4개: 위 '이미 있는 글' 목록 안에서만.
9. misconceptions 2~3개: 검색자가 자주 틀리는 것. 본문이 직접 다룰 수 있게 한 문장씩.
10. visual: 군집마다 대표 비주얼 하나 — decide(나도 되나?) / compareTable(뭐가 다르지? 얼마?) / stepbar(어떻게 하나?) / flow(산식) / timeline(언제?) / checklist(조건) / case-example(내 경우는?) / none. 연속한 두 군집에 같은 visual 을 두지 않습니다. 주제에 없는 위젯을 채우지 않습니다.

## 출력 — JSON 하나만. 설명·마크다운 펜스 없이
{
  "slug": "${slug}",
  "category": "${category || "..."}",
  "topic": "${topic}",
  "title": "…",
  "primaryKeywords": ["…", "…"],
  "clusters": [
    { "eyebrow": "…", "h2": "…나요", "h3": ["…나요", "…나요"], "visual": "decide", "why": "지식iN 질문 n건 …" }
  ],
  "laws": [ { "name": "고용보험법", "articles": [40, 41] } ],
  "urls": [ { "url": "https://…", "org": "…", "why": "…", "new": false } ],
  "ctas": [ { "label": "…하기", "url": "https://…", "org": "…", "forSection": "h2 문장", "hero": true } ],
  "relatedSlugs": ["…"],
  "misconceptions": ["…"]
}`;
}

export function capturesPrompt({ files }) {
  return `아래 PNG 파일들을 Read 도구로 하나씩 열어 보세요. 다른 도구는 쓰지 마세요.
각 장에 대해 "무엇이 보이는지" 를 한국어 한 줄(60~200자)로 적습니다: 어느 사이트의 어떤 화면인지, 화면에 실제로 보이는 표·금액·기한·요율·조문 번호를 구체적으로.
안 보이면(빈 상자·로그인 화면·본문이 스크롤 아래) 그 사실을 그대로 적습니다. 화면에 없는 숫자를 지어내지 않습니다.

파일:
${files.map((f) => `- ${f}`).join("\n")}

출력은 JSON 하나만 (설명 없이): { "<파일명(경로 없이)>": "한 줄", … }`;
}

const CORE_RULES = ({ verifiedAt, today }) => `숫자
- 본문의 모든 "숫자+단위"(원·만원·천원·억원·억·%·퍼센트·일·개월·년·주·회·세·시간·배)는 증거 안에 그 숫자가 글자 그대로 있어야 합니다 (콤마·공백만 무시). 없으면 그 숫자를 쓰지 않습니다. 기억으로 채우지 않습니다. "2026년" 같은 연도만 예외.
- 증거의 숫자로 계산한 파생값이나 사례용 가정값(예: "월급 300만원인 사람")을 쓰면 exampleValues 배열에 본문 표기 그대로 넣고, exampleNote 에 "값 = 식" 으로 적습니다. 식은 기계가 실제로 계산합니다. 예) "88,000원 = 11,000 × 8", "가정: 월급 300만원 (사례용 가정값)". 파생값은 적을수록 좋습니다.
인용
- quote.text 와 sourceQuote.excerpt 는 증거 원문의 연속된 문장을 그대로 옮깁니다 (요약·의역 금지). 원문에 없는 문장은 거부됩니다. quote.law 는 "국민건강보험법 제110조 제1항" 형식.
- 숫자(두 자리 이상)가 나오는 대제목 섹션마다 quote 를 하나 이상 둡니다 (섹션 또는 그 소제목에).
구조
- mainSections 수 = 설계도 clusters 수. heading 은 설계도 h2, subsections 의 heading 은 설계도 h3, eyebrow 는 설계도대로. meta.title 은 설계도 title 그대로. primaryKeywords 도 설계도대로.
- 필드 이름은 types.ts 에 있는 것만 (없는 필드가 하나라도 있으면 tsc 가 거부). 자주 틀리는 것: subsections 에는 sourceQuote·link·eyebrow 가 없다 (quote·cta·compareTable·widgets 만). widgets[].type 은 checklist·calc-cta·stat-box·case-example·def-box·decide·flow·stepbar·timeline 만. 표 셀 객체는 text·status·tag·tagTone·doc·links·hideOnMobile 만.
- 모든 h2·h3 에 answer (한 줄 답, 결론부터, 40~120자). body 는 해설 2~5문장.
- summary 항목 수 = mainSections 수. 항목마다 행동 하나 또는 숫자 하나.
- keyFacts 7~9행. context.faqList 4~6개 — 본문에서 이미 답한 것만 다시 묻습니다 (새 주장 금지).
- resolution 은 반드시 { "steps": [] } (빈 배열). 단계 안내는 mainSections 의 stepbar 위젯으로 씁니다 — resolution.steps 를 채우면 옛 블록이 그려져 화면 검사에서 거부됩니다.
- numericClaims 는 쓰지 않습니다 (빼세요). 숫자 대조는 증거 JSON 으로 기계가 직접 하므로 필요 없고, 수십 줄이 늘어 답이 잘립니다.
- context 는 { "faqList": [...] } 만 (legalBasis·edgeCases·glossary 는 옛 블록 — 쓰지 않습니다). 근거 조문은 섹션의 quote 로.
- sources 는 group(법령 / 행정규칙·안내 / 정부 도구 / 검증 방법)을 붙입니다. url 은 증거의 url 과 법제처 조문 주소만.
- verify: { "note": "무엇과 대조했는지 한 줄", "date": "${verifiedAt}" }. lastVerified: "${verifiedAt}". meta.publishedAt: "${today}". meta.author: { "name": "머니위키 편집팀" } (직함·검수자 표기 금지).
비주얼 (렌더 검사기가 봅니다)
- 대제목 섹션의 절반 이상에 비주얼(decide·compareTable·stepbar·flow·timeline·checklist·stat-box·case-example)이 있어야 합니다. 비주얼 먼저, 해설 뒤.
- 섹션의 '대표 비주얼'은 우선순위(decide > compareTable > stepbar > flow > timeline > checklist > stat-box)로 하나 정해지고, 연속한 두 섹션의 대표 비주얼이 같으면 거부됩니다. 설계도 clusters[].visual 을 따릅니다.
- compareTable: caption(무슨 표인지)·footnote(기준·단위·출처) 필수. headers 가 4개 이상이면 "cards": true. 모든 행의 칸 수 = headers 수.
- decide: items 3~5개 (q·sub·next), okText 필수. stepbar: 3~5단계, 단계마다 prep·time·action(허용 CTA). timeline: items 의 d·t·m.
- eyebrow 는 4~8자. 대제목이 eyebrow 로 시작하면 거부됩니다.
버튼·링크
- CTA(heroCta · cta · stepbar action) 의 url 은 허용 CTA 목록 안에서만. label 은 행동형("…신청하기", "…조회하기"). "보기" 로 끝나는 열람형 금지. 기관 홈 금지.
- 같은 주소는 최대 2곳(첫 화면 heroCta + 그 일을 다루는 섹션 1곳). 허용 CTA 가 부족하면 stepbar 단계의 action 을 비워 둡니다 — 관련 없는 화면으로 보내는 버튼보다 버튼이 없는 편이 낫습니다.
- 내부 링크 slug(relatedQuestions · link · alternatives · edgeCases · calc-cta) 는 허용 slug 목록 안에서만. relatedQuestions 3~4개.
문장
- 어미는 해요체. 타이틀·eyebrow 는 명사형. 대시(—) 문자는 본문·표·sources.note·quote.law 를 포함해 어디에도 쓰지 않습니다 — 구분은 중점(·)이나 쉼표, 범위는 물결(~). 백틱·코드 금지.
- 과장·확정 표현 금지: "축하", "무조건", "100%", "확정", "반드시 받을 수", "대상이에요". 광고 자리를 버튼처럼 만들지 않습니다.
- 다른 사이트 문장 복제 금지. 사례 인물은 나이·직업·상황이 구체적인 새 인물.
- meta.description: 결론 한 문장 + 굵은 숫자 하나(**…**). 숫자는 증거에 있는 것만.
- heroHook: 3~5문장. 타이틀이 약속한 항목을 결론부터 펼치고 마지막 문장은 행동 유도. **강조** 1~2곳.
- **강조** 마크는 heroHook·body·keyFacts.value·meta.description·checklist items 에서만 그려집니다. heroStats(label·value·note)·answer·표 셀·quote 에는 쓰지 않습니다 (글자 그대로 찍힘).
- 설계도의 misconceptions 를 본문에서 직접 다룹니다.
형식
- 출력은 JSON 하나. 마크다운 펜스·설명 없이. 문자열은 한 줄(줄바꿈이 필요하면 \\n).
- 형태: { "article": { …ArticleData… }, "exampleValues": ["…"], "exampleNote": "…" }`;

export function writePrompt({ plan, ev, digest, typesSrc, criteria, example, linkCandidates, ctas, quickComponents, today }) {
  return `당신은 머니위키(jjyu.co.kr) 편집자입니다. 도구를 쓰지 마세요. 필요한 자료는 전부 아래에 있습니다.
할 일: 설계도와 증거만으로 글 한 편을 ArticleData JSON 으로 씁니다. 사람이 다시 손보지 않고 기계 검사를 통과해야 합니다.

## 1. 품질 기준 (정본 템플릿 머리말 — 전부 지킵니다)
${criteria}

## 2. 데이터 타입 (types.ts 원문 — 필드의 뜻과 필수 여부는 이 주석이 정합니다)
${typesSrc}

## 3. 통과한 글 한 편 (구조·어조·밀도의 기준. 블록 배치는 베끼지 않습니다 — 비주얼은 이 주제의 질문이 정합니다)
${JSON.stringify(example)}

## 4. 이 글의 설계도 (타이틀·대제목·소제목·eyebrow·primaryKeywords 는 이대로)
${j(plan)}

## 5. 증거 — Playwright 로 연 공식 페이지 원문 (수집일 ${ev.verifiedAt}). 본문 숫자와 인용은 여기서만 나옵니다
### 5-1. 숫자가 든 문장 (출처 | 값 | 원문)
${digest.facts || "(없음)"}

### 5-2. 페이지 원문 (출처별)
${digest.raws || "(없음)"}

### 5-3. 캡처(이미지)에서 눈으로 읽은 것
${digest.captures || "(없음)"}

## 6. 쓸 수 있는 것
- 허용 CTA (버튼은 이 안에서만. 목록이 비어 있으면 heroCta·cta·stepbar action 을 아예 넣지 않습니다 — 다른 주소를 지어내면 거부됩니다):
${ctas.map((c) => `  - ${c.label} | ${c.url} | ${c.org}${c.forSection ? ` | 둘 곳: ${c.forSection}` : ""}${c.hero ? " | hero" : ""}`).join("\n") || "  (없음 — 이 글에는 버튼을 넣지 않습니다)"}
- 허용 내부 링크 slug: ${linkCandidates.join(", ") || "(없음)"}
- heroWidget.component 로 쓸 수 있는 것: ${quickComponents.join(", ") || "(없음)"} — 계산이 핵심인 주제가 아니면 heroWidget 을 넣지 않습니다.

## 7. 기계 검사 규칙 (하나라도 어기면 글이 거부됩니다)
${CORE_RULES({ verifiedAt: ev.verifiedAt, today })}`;
}

export function fixPrompt({ draft, failures, plan, ev, digest, linkCandidates, ctas, quickComponents, today }) {
  return `아래 글(JSON)이 기계 검사에서 떨어졌습니다. 실패 목록을 전부 고쳐서 같은 형태의 JSON 전체를 다시 출력하세요. 도구를 쓰지 마세요.

## 실패 목록 (검사기 출력 그대로)
${failures}

## 고치는 법
- "증거 없는 수치": 그 숫자를 아래 증거에서 찾아 글자 그대로 쓰거나(콤마·공백만 다를 수 있음), 없으면 그 숫자가 든 문장을 통째로 지웁니다. 계산값·가정값이면 exampleValues 에 넣고 exampleNote 에 "값 = 식" 을 적습니다.
- "원문에 없는 인용": quote.text 를 증거 원문의 연속된 문장으로 바꿉니다.
- "같은 비주얼 연속": 한 섹션의 대표 비주얼 종류를 바꿉니다 (우선순위 decide > compareTable > stepbar > flow > timeline > checklist > stat-box).
- "한 줄 답(.ans) 없음": 그 제목에 answer 를 넣습니다. "라벨이 소제목을 자른 형태": eyebrow 를 다른 말로.
- CTA 문제: url 을 허용 목록의 다른 주소로 바꾸거나 그 버튼을 뺍니다. 내부 링크 문제: 허용 slug 로 바꾸거나 뺍니다.
- tsc 타입 오류: 필드 이름·형태를 types.ts 대로 (예: widgets[].type 은 checklist·calc-cta·stat-box·case-example·def-box·decide·flow·stepbar·timeline 만).
- 검사기를 통과시키기 위한 문장 조작(숫자만 지우고 주장은 남기기)은 금지. 근거 없는 주장은 통째로 뺍니다.
- 나머지 부분은 바꾸지 않습니다.

## 설계도
${j(plan)}

## 증거 (숫자·인용 대조용)
### 숫자가 든 문장
${digest.facts || "(없음)"}
### 페이지 원문
${digest.raws || "(없음)"}
### 캡처에서 읽은 것
${digest.captures || "(없음)"}

## 허용 CTA
${ctas.map((c) => `- ${c.label} | ${c.url} | ${c.org}`).join("\n") || "(없음)"}
## 허용 내부 링크 slug
${linkCandidates.join(", ") || "(없음)"}
## heroWidget.component 허용
${quickComponents.join(", ") || "(없음)"}

## 규칙 (요약)
${CORE_RULES({ verifiedAt: ev.verifiedAt, today })}

## 현재 글
${JSON.stringify(draft)}

## 출력
{ "article": { … }, "exampleValues": [ … ], "exampleNote": "…" } 하나만. 설명 없이.`;
}
