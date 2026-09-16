/**
 * 지시문 셋 — 출처 고르기(조문·URL 을 안 줬을 때만) · 작성 · 고치기.
 * 규칙은 검사기(verify-evidence · verify-rendered · tsc)가 실제로 보는 것만 적는다. 규칙이 바뀌면 검사기와 같이 바꾼다.
 */

const j = (v) => JSON.stringify(v, null, 1);

/** 증거 JSON → 지시문에 넣을 요약. 숫자 문장(facts) · 페이지 원문(raws) */
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
  return { facts: facts.join("\n"), raws: raws.join("\n\n") };
}

/** 조문·URL 을 사용자가 안 줬을 때 한 번 묻는다. 타이틀·소제목만 보고 고른다 */
export function pickSourcesPrompt({ title, headings, registry, candidates = [], givenLaws = [], givenUrls = [] }) {
  return `당신은 머니위키(jjyu.co.kr) 편집자입니다. 도구를 쓰지 마세요.
할 일: 아래 타이틀·소제목의 글을 쓰려면 어떤 법 조문과 어떤 공식 페이지를 근거로 열어야 하는지 고릅니다. 글은 쓰지 않습니다.
좋은 글은 근거가 두꺼운 데서 나옵니다 — 조문만으로는 "법은 정하지 않는다" 이상을 못 씁니다. 판례·해설·절차·서류가 적힌 페이지를 함께 고릅니다.

## 타이틀
${title}
## 소제목 (이 순서대로 대제목이 됩니다)
${headings.map((h, i) => `${i + 1}. ${h}`).join("\n")}
${givenLaws.length ? `\n## 이미 정해진 조문 (다시 고르지 않습니다)\n${givenLaws.map((l) => `- ${l.name} ${l.articles.join(", ")}`).join("\n")}\n` : ""}${givenUrls.length ? `\n## 이미 정해진 페이지 (여기에 더합니다)\n${givenUrls.map((u) => `- ${u}`).join("\n")}\n` : ""}
## 찾기쉬운 생활법령정보 검색 결과 — 실제로 있는 주소. 페이지는 되도록 여기서 고릅니다 (제목 | 주소)
${candidates.map((c) => `- ${c.title} | ${c.url}`).join("\n") || "(검색 결과 없음)"}

## 공식 출처 등록부 — 이 주제와 관련된 글이 근거로 쓴 적 있는 주소 (Playwright 로 열어 본문 추출에 성공한 것)
${registry.map((r) => `- ${r.org} | ${r.url} | 쓴 글: ${r.usedBy.slice(0, 4).join(", ")}`).join("\n") || "(비어 있음)"}

## 규칙
- laws: 소제목이 답하려면 꼭 인용해야 하는 조문만 3~8개. 법령 이름은 법제처 정식 명칭(고용보험법 / 고용보험법 시행령 / 민법 / 민사집행법 …). 시행령·시행규칙은 별도 항목. articles 는 숫자만("40"), '조의N' 은 "19의2".
- urls: 본문 근거로 쓸 공식 페이지 0~5개. **이 글의 주제를 실제로 다루는 화면만.** 우선순위: ① 검색 결과 중 소제목에 답하는 해설·절차 페이지 ② 그 주제의 대법원 판례 페이지(menuType=prec) 1~2개 ③ 등록부. **위 목록에 없는 주소는 적지 않습니다.** 주소를 기억이나 짐작으로 만들지 않습니다 (MENU_ID 옆 번호를 붙이는 식으로 만든 주소가 엉뚱한 화면을 열었습니다). 맞는 페이지가 목록에 없으면 urls 를 비웁니다. 기관 첫 화면은 금지. 조문 주소(law.go.kr)는 urls 에 넣지 않습니다 — laws 로 만듭니다.
- 확실하지 않은 조문 번호는 넣지 않습니다. 틀린 조문을 열면 글이 엉뚱한 조문을 인용하게 됩니다.

## 출력 — JSON 하나만. 설명·펜스 없이
{ "laws": [ { "name": "고용보험법", "articles": ["40", "41"] } ], "urls": [ { "url": "https://…", "org": "…" } ] }`;
}

const RULES = ({ verifiedAt, today }) => `숫자
- 본문의 모든 "숫자+단위"(원·만원·천원·억원·억·%·퍼센트·일·개월·년·주·회·세·시간·배)는 증거 안에 그 숫자가 글자 그대로 있어야 합니다 (콤마·공백만 무시). 없으면 그 숫자를 쓰지 않습니다. 기억으로 채우지 않습니다. "2026년" 같은 연도만 예외.
- 증거의 숫자로 계산한 파생값이나 사례용 가정값(예: "월급 300만원인 사람")을 쓰면 exampleValues 에 본문 표기 그대로 넣고, exampleNote 에 "값 = 식" 으로 적습니다. 식은 기계가 실제로 계산합니다. 예) "88,000원 = 11,000 × 8", "가정: 월급 300만원 (사례용 가정값)". 파생값은 적을수록 좋습니다.
인용
- quote.text 와 sourceQuote.excerpt 는 증거 원문의 연속된 문장을 그대로 옮깁니다 (요약·의역 금지). 원문에 없는 문장은 거부됩니다. quote.law 는 "국민건강보험법 제110조 제1항" 형식.
- 숫자(두 자리 이상)가 나오는 대제목 섹션마다 quote 를 하나 이상 둡니다 (섹션 또는 그 소제목에).
구조
- meta.title 은 주어진 타이틀 글자 그대로. mainSections 는 주어진 소제목 수와 같고, i번째 heading 은 i번째 소제목 글자 그대로. 바꾸면 기계가 되돌립니다.
- 대제목마다 subsections(h3) 1~2개 — 검색자가 실제로 묻는 문장 "~나요" 로. eyebrow 는 4~8자 주제 라벨(예: "지원 대상"). 대제목이 eyebrow 로 시작하면 거부됩니다.
- 모든 h2·h3 에 answer (한 줄 답, 결론부터, 40~120자). body 는 해설 2~5문장.
- primaryKeywords 2~3개: 사람이 실제로 치는 짧은 검색어(12자 이내). 2개 이상이 타이틀 안에 글자 그대로 있어야 합니다.
- 필드 이름은 types.ts 에 있는 것만 (없는 필드가 하나라도 있으면 tsc 가 거부). subsections 에는 sourceQuote·link·eyebrow 가 없습니다 (quote·cta·compareTable·widgets 만). widgets[].type 은 checklist·calc-cta·stat-box·case-example·def-box·decide·flow·stepbar·timeline 만. 표 셀 객체는 text·status·tag·tagTone·doc·links·hideOnMobile 만.
- summary 2~5개. 항목마다 행동 하나 또는 숫자 하나. keyFacts 7~9행. context 는 { "faqList": [4~6개] } 만 — 본문에서 이미 답한 것만 다시 묻습니다.
- resolution 은 반드시 { "steps": [] }. 단계 안내는 stepbar 위젯으로. numericClaims 는 쓰지 않습니다.
- sources 는 group(법령 / 행정규칙·안내 / 정부 도구 / 검증 방법)을 붙입니다. url 은 증거의 url 과 법제처 조문 주소만.
- verify: { "note": "무엇과 대조했는지 한 줄", "date": "${verifiedAt}" }. lastVerified: "${verifiedAt}". meta.publishedAt: "${today}". meta.author: { "name": "머니위키 편집팀" } (직함·검수자 표기 금지).
비주얼 (렌더 검사기가 봅니다)
- 대제목 섹션의 절반 이상에 비주얼(decide·compareTable·stepbar·flow·timeline·checklist·stat-box·case-example). 비주얼은 질문의 성격이 정합니다 — 얼마? 표·산식 / 나도 되나? decide·checklist / 어떻게? stepbar / 언제? timeline / 내 경우는? case-example. 주제에 없는 위젯을 채우지 않습니다.
- 섹션의 대표 비주얼은 우선순위(decide > compareTable > stepbar > flow > timeline > checklist > stat-box)로 하나 정해지고, 연속한 두 섹션의 대표 비주얼이 같으면 거부됩니다.
- compareTable: caption·footnote 필수. headers 가 4개 이상이면 "cards": true. 모든 행의 칸 수 = headers 수. decide: items 3~5개(q·sub·next) + okText. stepbar: 3~5단계(tab·title·body·prep·time·action). timeline: items 의 d·t·m.
버튼·링크
- 버튼(heroCta · cta · stepbar action) 의 url 은 허용 버튼 목록 안에서만, label 은 목록의 문구 그대로. 목록에 이 글의 일을 하는 화면이 없으면 버튼을 넣지 않습니다 — 없는 주소를 지어내면 거부됩니다. 버튼이 하나도 없어도 됩니다.
- heroCta(첫 화면 대형 버튼)는 그 화면이 이 글의 주제 자체를 처리할 때만. 같은 주소는 최대 2곳.
- 내부 링크 slug(relatedQuestions · link · alternatives · calc-cta · heroWidget.more) 는 허용 slug 목록 안에서만. relatedQuestions 3~4개.
정본에서 반드시 가져올 것 (정본 본문의 해당 자리를 보고 그대로 합니다)
- 서론과 각 한 줄 답은 숫자·판정으로 끝나는 결론. "법이 정하지 않는다"로 끝내지 말고, 그러면 실제로 어떻게 되는지(누가 판단하는지, 무엇을 준비하는지, 언제까지인지)까지 씁니다. 근거는 증거 안에서만.
- 서론과 한 줄 답의 첫 문장은 독자의 상황으로 시작합니다 ("별거한 지 2년이 지났다면…", "회사가 먼저 권했다면…"). "민법은 ~를 정한다"로 시작하는 문장은 첫 문장이 아니라 해설 자리에 둡니다.
- 증거에 항목 목록(사유 여섯 가지, 서류 목록, 인정·불인정 판례 목록, 요율표)이 있으면 그것을 비교표로 캐냅니다 — 행은 항목, 열은 "뜻 · 예 또는 판례 · 독자가 할 일". 정본의 "정당한 이직 사유와 준비 서류" 표가 그 예입니다. 목록을 문장 한 줄로 뭉개지 않습니다.
- 표에는 "준비 서류 (발급처)" 처럼 독자가 다음에 할 일이 담긴 열을 둡니다. 서류·화면 이름 옆에 cell.links 로 발급·신청 화면을 답니다 — 주소는 허용 버튼 목록이나 증거 출처 주소(위 「페이지 원문」의 url)만. 없으면 링크 없이 이름만.
- decide 의 각 항목 next 는 "미충족이면 무엇을 하면 되는지" 한 문장. okText 는 전부 충족일 때 다음 행동.
- cta 에는 note 를 붙입니다 ("고용24 → 이력내역서. 공동인증서 필요" 처럼 어디로 가서 무엇이 필요한지).
- keyFacts 의 value 는 숫자·판정을 **굵게** 하나씩. 사례(case-example)는 구체적 상황의 사람 → 결과 → 근거 한 줄.
- 판례가 증거에 있으면 "어떤 경우에 인정되나요" 같은 섹션에 사례 카드나 표 행으로 씁니다 (사건번호·결론은 증거 원문 그대로).
문장
- 독자는 법을 배우러 온 사람이 아니라 자기 문제를 풀러 온 사람입니다. heroHook·answer·body·keyFacts·summary 에 "제840조 제6호", "제842조" 같은 조·항·호 번호를 늘어놓지 않습니다. 본문은 독자의 상황과 답(되나요 → 됩니다/안 됩니다, 언제까지 → 날짜 계산법, 무엇을 → 행동)으로 쓰고, 조문 번호는 접힌 근거(quote.law)와 sources 에만 둡니다. 본문에 조문을 언급해야 하면 한 섹션에 한 번, "민법은 ~라고 정해요" 정도로 그칩니다.
- 어미는 해요체. 타이틀·eyebrow 는 명사형. 대시(—) 문자는 어디에도 쓰지 않습니다 — 구분은 중점(·)이나 쉼표, 범위는 물결(~). 백틱·코드 금지.
- 과장·확정 표현 금지: "축하", "무조건", "100%", "확정", "반드시 받을 수", "대상이에요", "당첨".
- heroHook(서론): 3~5문장. 첫 질문의 결론(숫자·판정)부터 사실로 쓰고, 마지막 문장도 사실로 끝냅니다. "확인해 보세요" 같은 권유로 맺지 않습니다. **강조** 1~2곳.
- **강조** 마크는 heroHook·body·keyFacts.value·meta.description·checklist items 에서만. answer·표 셀·quote 에는 쓰지 않습니다.
- meta.description: 결론 한 문장 + 굵은 숫자 하나(**…**). 숫자는 증거에 있는 것만.
- 다른 사이트 문장 복제 금지. 사례 인물은 나이·직업·상황이 구체적인 새 인물.
캡처
- 아래 캡처 PNG 를 Read 도구로 전부 열어 봅니다. 장마다 "무엇이 보이는지" 한국어 한 줄(60~200자)을 captures 에 적습니다: 어느 사이트의 어떤 화면인지, 실제로 보이는 표·금액·기한·조문 번호. 안 보이면(빈 상자·로그인 화면) 그 사실을 그대로. 화면에 없는 숫자를 지어내지 않습니다. 빠진 장이 있으면 거부됩니다.
형식
- 출력은 JSON 하나. 마크다운 펜스·설명 없이. 문자열은 한 줄(줄바꿈이 필요하면 \\n).
- 형태: { "article": { …ArticleData… }, "exampleValues": ["…"], "exampleNote": "…", "captures": { "<파일명>": "한 줄", … } }`;

function common({ title, headings, slug, category, ev, digest, pngs, links, ctas, quickComponents }) {
  return `## 이 글
- slug: ${slug} (URL 입니다. 바꾸지 않습니다) · category: ${category}
- 타이틀: "${title}"
- 대제목(순서대로, 글자 그대로):
${headings.map((h, i) => `  ${i + 1}. "${h}"`).join("\n")}

## 증거 — Playwright 로 연 공식 페이지 원문 (수집일 ${ev.verifiedAt}). 본문 숫자와 인용은 여기서만 나옵니다
### 숫자가 든 문장 (출처 | 값 | 원문)
${digest.facts || "(없음)"}

### 페이지 원문 (출처별)
${digest.raws || "(없음)"}

### 캡처 PNG (Read 도구로 엽니다)
${pngs.map((p) => `- ${p}`).join("\n") || "(없음)"}

## 쓸 수 있는 것
- 허용 버튼 (label | url | 기관):
${ctas.map((c) => `  - ${c.button} | ${c.url} | ${c.org} (${c.label})`).join("\n") || "  (없음)"}
- 허용 내부 링크 slug: ${links.join(", ") || "(없음)"}
- heroWidget.component 로 쓸 수 있는 것: ${quickComponents.join(", ") || "(없음)"} — 계산이 핵심인 주제가 아니면 heroWidget 을 넣지 않습니다.`;
}

export function writePrompt(p) {
  const { ev, typesSrc, criteria, outline, example, today } = p;
  return `당신은 머니위키(jjyu.co.kr) 편집자입니다. 캡처를 여는 Read 말고는 도구를 쓰지 마세요. 필요한 자료는 전부 아래에 있습니다.
할 일: 주어진 타이틀·대제목과 증거만으로 글 한 편을 ArticleData JSON 으로 씁니다. 사람이 다시 손보지 않고 기계 검사를 통과해야 합니다.

## 1. 품질 기준 (정본 템플릿 머리말 — 전부 지킵니다)
${criteria}

## 2. 정본 템플릿 본문 (docs/moneywiki-article-template.html 의 <article> 을 뼈대만 남긴 것. <!-- --> 는 저자 주석)
이 글이 기준입니다 — 서론이 어떻게 결론부터 말하는지, 한 줄 답 뒤에 해설이 어떻게 붙는지, 표에 캡션·각주가 어떻게 달리는지, 근거가 어떻게 접혀 있는지, 사례·정리·FAQ 의 밀도. 주제(실업급여)와 블록 배치(계산 위젯·타임라인)는 베끼지 않습니다 — 비주얼은 이 글의 질문이 정합니다.
${outline}

## 3. 데이터 타입 (types.ts 원문 — 필드의 뜻과 필수 여부는 이 주석이 정합니다)
${typesSrc}

## 4. ArticleData JSON 으로 쓴 통과 글 한 편 (형태 참고용. 내용·블록은 베끼지 않습니다)
${JSON.stringify(example)}

${common(p)}

## 규칙 (하나라도 어기면 글이 거부됩니다)
${RULES({ verifiedAt: ev.verifiedAt, today })}`;
}

export function fixPrompt(p) {
  const { draft, failures, ev, today } = p;
  return `아래 글(JSON)이 기계 검사에서 떨어졌습니다. 실패 목록을 전부 고쳐서 같은 형태의 JSON 전체를 다시 출력하세요. 캡처를 여는 Read 말고는 도구를 쓰지 마세요.

## 실패 목록 (검사기 출력 그대로)
${failures}

## 고치는 법
- "증거 없는 수치": 그 숫자를 증거에서 찾아 글자 그대로 쓰거나, 없으면 그 숫자가 든 문장을 통째로 지웁니다. 계산값·가정값이면 exampleValues 에 넣고 exampleNote 에 "값 = 식" 을 적습니다.
- "원문에 없는 인용": quote.text 를 「페이지 원문」·「숫자가 든 문장」에 있는 문장으로 바꿉니다. 복사해서 붙여넣고 앞뒤만 자릅니다 — 줄임표·요약·의역·띄어쓰기 손질을 하면 또 떨어집니다.
- "숫자가 있는데 근거 조문(quote)이 없음": 그 섹션에 원문에서 그대로 복사한 quote 를 넣습니다. 뒷받침하는 문장이 증거에 없으면 그 숫자가 든 문장을 뺍니다.
- "같은 비주얼 연속": 한 섹션의 대표 비주얼 종류를 바꿉니다. "한 줄 답(.ans) 없음": 그 제목에 answer 를 넣습니다. "라벨이 소제목을 자른 형태": eyebrow 를 다른 말로.
- CTA 문제: 허용 목록의 다른 주소로 바꾸거나 그 버튼을 뺍니다. 내부 링크 문제: 허용 slug 로 바꾸거나 뺍니다.
- tsc 오류: 필드 이름·형태를 types.ts 대로.
- 캡처 설명 없음: 그 PNG 를 Read 로 열어 captures 에 한 줄을 적습니다.
- 검사기를 통과시키기 위한 문장 조작(숫자만 지우고 주장은 남기기)은 금지. 근거 없는 주장은 통째로 뺍니다. 타이틀·대제목은 바꾸지 않습니다. 나머지는 바꾸지 않습니다.

${common(p)}

## 규칙
${RULES({ verifiedAt: ev.verifiedAt, today })}

## 현재 글
${JSON.stringify(draft)}

## 출력
{ "article": { … }, "exampleValues": [ … ], "exampleNote": "…", "captures": { … } } 하나만. 설명 없이.`;
}
