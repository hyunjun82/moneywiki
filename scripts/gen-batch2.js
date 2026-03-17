// Batch generate remaining page.tsx files
const fs = require("fs");
const path = require("path");
const BASE = "C:/Users/user/wiki-site/src/app/w";

function mkPage(slug, tags, h1Lines, introText, checks, secs, clItems, faqItems, refGroups, relItems) {
  const ci = checks.map(c => `  { id: "${c.id}", label: "${c.label}" },`).join("\n");
  const cl = clItems.map(c => `  ${JSON.stringify(c)},`).join("\n");
  const fq = faqItems.map(f => `  {\n    q: ${JSON.stringify(f.q)},\n    a: ${JSON.stringify(f.a)},\n  },`).join("\n");
  const rf = refGroups.map(g => `  {\n    category: ${JSON.stringify(g.cat)},\n    items: [\n${g.items.map(i=>`      { label: ${JSON.stringify(i.l)}, url: ${JSON.stringify(i.u)} },`).join("\n")}\n    ],\n  },`).join("\n");
  const rl = relItems.map(r => `  {\n    slug: ${JSON.stringify(r.s)},\n    title: ${JSON.stringify(r.t)},\n    description: ${JSON.stringify(r.d)},\n  },`).join("\n");

  let secHtml = "";
  secs.forEach((sec, i) => {
    secHtml += `\n      <H2>${sec.h2}</H2>\n`;
    sec.ps.forEach(p => { secHtml += `      <p style={body}>${p}</p>\n`; });
    if (sec.green) secHtml += `      <GreenBox title="${sec.green.t}">${sec.green.c}</GreenBox>\n`;
    if (sec.border) secHtml += `      <BorderBox title="${sec.border.t}">${sec.border.c}</BorderBox>\n`;
    if (i === 0) {
      secHtml += `\n      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>\n      <EligibilityChecker items={CHECK_ITEMS} allMatchText="조건을 갖춘 상황이에요." partialMatchText="일부만 해당돼요. 고용노동부(1350)에 상담해보세요." />\n      <Divider />\n`;
    } else if (i === 1) {
      secHtml += `\n      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />\n      <RelatedArticles items={RELATED} />\n      <ArticleAd position="mid" />\n      <Divider />\n`;
    } else {
      secHtml += `      <Divider />\n`;
    }
  });

  return `"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [\n${ci}\n];
const CHECKLIST = [\n${cl}\n];
const FAQS = [\n${fq}\n];
const REFERENCES = [\n${rf}\n];
const RELATED = [\n${rl}\n];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="${slug}" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>${tags}</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>${h1Lines}</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>${introText}</p>
      <Divider /><ArticleAd position="intro" />
${secHtml}
      <SectionBadge>준비 서류</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 나오는 질문만 골랐어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 관련 법령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
`;
}

const data = [
// 91 일용직-퇴직금-지급기준
{slug:"일용직-퇴직금-지급기준",tags:"퇴직금 · 일용직 · 지급기준",h1:"일용직 퇴직금 지급 기준,<br />어떻게 판단하나요?",
intro:`일용직 퇴직금 지급 기준은 &ldquo;계속 근로&rdquo; 여부로 판단해요. 매일 출근하지 않더라도 같은 사업주 아래에서 반복적으로 일했다면 1년 이상 계속 근로로 인정될 수 있죠. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 정한 기준과 판단 방법, 사업주 거부 시 대응법까지 정리해드릴게요.`,
checks:[{id:"c1",label:"같은 사업주 아래에서 1년 넘게 일했어요"},{id:"c2",label:"주 평균 15시간 이상 근무했어요"},{id:"c3",label:"일당 지급 기록이나 출근 증빙이 남아 있어요"},{id:"c4",label:"퇴직일로부터 3년 이내예요"}],
secs:[
{h2:"일용직 퇴직금 지급 기준이 뭔가요?",ps:[`기준은 다른 근로자와 같아요. 같은 사업장에서 <strong>1년 이상 계속 근로</strong>하고, 주 평균 <strong>15시간 이상</strong> 일했으면 퇴직금 지급 의무가 생기죠. 일용직이라는 이유로 기준이 달라지는 건 없어요.`,`&ldquo;계속 근로&rdquo; 판단이 일용직에서 가장 중요한 쟁점이에요. 매일 출근하지 않아도, 같은 사업주가 반복적으로 불러서 일했다면 고용관계가 지속된 것으로 볼 수 있죠.`,`일용근로자라는 명칭 때문에 매일 새로운 계약이라고 오해하기 쉬운데, 실질적으로 같은 곳에서 반복 근무했다면 형식과 관계없이 계속 근로로 인정받을 수 있어요.`],green:{t:"지급 기준 요약",c:`1. 같은 사업주 아래 <strong>1년 이상</strong> 반복 근로<br />2. 주 평균 <strong>15시간 이상</strong><br />3. &ldquo;계속 근로&rdquo;는 고용의 실질로 판단`}},
{h2:"간헐적으로 일해도 퇴직금이 생기나요?",ps:[`생길 수 있어요. 매일 출근하지 않더라도 &ldquo;필요할 때 불러서 일하는&rdquo; 패턴이 1년 이상 반복됐다면 계속 근로로 인정될 가능성이 높죠.`,`판단 기준으로는 사업주의 지시를 받았는지, 출퇴근 시간이 정해져 있었는지, 다른 곳에서 일할 자유가 있었는지 등을 종합적으로 봐요.`,`증빙이 핵심이에요. 사업주가 보낸 출근 요청 문자, 일당 이체 기록, 현장 출입 기록 등을 최대한 모아두세요.`],border:{t:"인력사무소를 통해 일했다면",c:`인력사무소에서 파견한 경우, 실제 지시·감독한 쪽이 사업주로 인정될 수 있어요.<br />누가 일을 지시하고 급여를 줬는지가 퇴직금 청구 대상을 결정하죠.`}},
{h2:"계속 근로 여부는 어떻게 판단하나요?",ps:[`고용노동부와 법원은 &ldquo;근로 제공의 계속성&rdquo;을 기준으로 봐요. 구체적으로는 사업주가 반복적으로 출근을 요청했는지, 정해진 장소·시간에 일했는지, 사업주의 지시·감독을 받았는지를 종합 판단하죠.`,`공백 기간이 있어도 &ldquo;고용관계가 유지됐다&rdquo;고 볼 수 있어요. 비가 와서 일주일 못 나갔거나 물량이 없어서 보름간 쉬었더라도 다시 복귀할 것이 예정돼 있었다면 계속 근로에 해당하죠.`,`반대로 사업주와의 관계가 완전히 끊어진 후 우연히 다시 일하게 된 거라면 별도 근로관계로 봐요.`]},
{h2:"사업주가 거부하면 어떻게 대응하나요?",ps:[`사업주가 퇴직금 지급을 거부하면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 진정</a>을 넣으세요. 온라인(민원마당)이나 관할 고용노동지청 방문으로 접수할 수 있어요.`,`근로감독관이 사업주를 조사해서 시정 명령을 내려요. 이행하지 않으면 형사 처벌까지 갈 수 있죠.`,`소멸시효는 <strong>퇴직일로부터 3년</strong>이에요. 현장을 옮기면서 이전 퇴직금을 놓치는 경우가 많으니 주의하세요.`]},
],
cl:["일당 지급 기록 — 평균임금 산정용","출근 기록(사진, 카톡, 출입카드) — 계속 근로 증빙","근로계약서 — 근무 조건 확인","사업주 연락처·사업자등록번호 — 신고 시 필수","4대보험 가입 이력 — 근로 기간 증빙"],
faqs:[{q:"일용직인데 근로계약서가 없어요.",a:"근로계약서가 없어도 일당 지급 기록, 출근 사진, 카톡 대화 등으로 근로 사실을 증명할 수 있어요."},{q:"사업주가 '일용직은 해당 안 된다'고 해요.",a:"법적 근거가 없는 주장이에요. 1년 이상 주 15시간 이상 근무했다면 일용직도 퇴직금 대상이죠."},{q:"여러 현장에서 같은 회사 소속으로 일했는데 합산 되나요?",a:"같은 사업주(회사) 소속이면 현장이 달라도 기간이 합산돼요."},{q:"일용직 퇴직금은 대략 얼마나 되나요?",a:"퇴직 전 3개월 평균임금 x 근속연수로 계산해요. 일당 15만 원, 3년 근무 시 약 500만 원 전후죠."},{q:"사업주가 폐업했는데 퇴직금을 받을 수 있나요?",a:"체당금 제도를 통해 받을 수 있어요. 고용노동부에 체당금 신청을 하면 되죠."}],
refs:[{cat:"법령",items:[{l:"근로자퇴직급여 보장법",u:"https://www.law.go.kr/법령/근로자퇴직급여보장법"},{l:"근로기준법 — 근로자 정의",u:"https://www.law.go.kr/법령/근로기준법"}]},{cat:"공식 자료",items:[{l:"고용노동부 — 일용직 근로자 권익",u:"https://www.moel.go.kr"},{l:"고용노동부 민원마당",u:"https://minwon.moel.go.kr"}]}],
rel:[{s:"일용직-퇴직금",t:"일용직 퇴직금 받을 수 있는 조건",d:"일용직도 1년 이상 근무했다면 퇴직금을 받을 수 있어요."},{s:"퇴직금-일용직",t:"퇴직금 일용직 적용 기준",d:"일용직 근로자에게 퇴직금이 적용되는 경우를 정리했어요."},{s:"건설근로자-퇴직금",t:"건설 근로자 퇴직금 받는 방법",d:"건설근로자공제회 제도와 수령법을 안내해요."}],
},
// 92 퇴직금-일용직
{slug:"퇴직금-일용직",tags:"퇴직금 · 일용직 · 적용기준",h1:"퇴직금 일용직 적용 기준,<br />어떤 경우에 받을 수 있나요?",
intro:`일용직 근로자에게 퇴직금이 적용되는 기준이 궁금하죠? 핵심은 &ldquo;고용관계의 실질&rdquo;이에요. 매일 계약을 새로 맺는 형식이라도, 실제로 같은 사업주 밑에서 반복적으로 일했다면 퇴직금을 받을 수 있죠. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 정한 적용 기준과 사업주의 편법에 대응하는 방법을 정리해드릴게요.`,
checks:[{id:"c1",label:"같은 사업주 아래에서 1년 넘게 반복 근무했어요"},{id:"c2",label:"주 평균 15시간 이상 일했어요"},{id:"c3",label:"사업주의 지시·감독을 받으며 일했어요"},{id:"c4",label:"퇴직일로부터 3년 이내예요"}],
secs:[
{h2:"일용직 근로자에게 퇴직금이 적용되나요?",ps:[`적용돼요. 근로자퇴직급여 보장법은 고용 형태를 구분하지 않아요. 일용직이라는 명칭은 급여 지급 방식일 뿐, 퇴직금 적용 여부를 결정하는 요소가 아니죠.`,`적용 여부를 결정하는 건 &ldquo;1년 이상 계속 근로&rdquo;와 &ldquo;주 15시간 이상&rdquo; 두 가지예요. 이 조건을 충족하면 일용직이어도 사업주에게 퇴직금 지급 의무가 생기죠.`,`대법원은 일관되게 &ldquo;계약의 형식이 아닌 근로의 실질로 판단해야 한다&rdquo;고 판시하고 있어요. 매일 새 계약서를 썼더라도 같은 곳에서 같은 일을 했다면 하나의 근로관계로 봐요.`],green:{t:"적용 기준 요약",c:`1. <strong>1년 이상</strong> 같은 사업주 밑에서 반복 근로<br />2. 주 평균 <strong>15시간 이상</strong><br />3. 계약 형식이 아닌 <strong>근로의 실질</strong>로 판단`}},
{h2:"어떤 경우 퇴직금 지급 의무가 생기나요?",ps:[`같은 사업주가 반복적으로 불러서 일하게 한 경우가 대표적이에요. &ldquo;내일도 나오세요&rdquo;라는 지시가 계속됐다면 계속 근로로 인정받을 가능성이 높죠.`,`출퇴근 시간이 정해져 있었거나, 사업주가 업무 내용을 지시했거나, 다른 곳에서 일할 자유가 제한됐다면 종속적 근로관계로 볼 수 있어요. 이런 요소들이 많을수록 퇴직금 적용이 유리해지죠.`,`반대로, 본인이 원할 때만 나가고 사업주의 지시를 받지 않는 완전한 자유계약 관계라면 퇴직금 적용이 어려워요. 이 경우는 근로자가 아닌 독립사업자로 볼 수 있죠.`],border:{t:"편법 주의",c:`일부 사업주가 퇴직금을 피하려고 11개월 30일에 &ldquo;계약 종료&rdquo;를 통보하는 경우가 있어요.<br />이건 탈법 행위로, 고용노동부에 진정하면 부당해고로 판단될 수 있죠.`}},
{h2:"일용직 퇴직금 계산 방법은?",ps:[`계산법은 정규직과 동일해요. 퇴직 전 3개월간 받은 총 급여를 총 달력 일수로 나눈 것이 일 평균임금이고, 여기에 30을 곱하면 월 평균임금이 나오죠. 월 평균임금 x 근속연수가 퇴직금이에요.`,`평균임금이 통상임금보다 낮으면 통상임금으로 계산할 수 있어요. 일용직은 비수기에 일을 못 해서 평균임금이 떨어지는 경우가 많으니, 두 금액을 비교해보는 게 유리하죠.`,`근무 일수 기록을 정확히 남겨두는 게 핵심이에요. 일당 지급 기록, 출근 사진, 카카오톡 대화 등이 증빙이 되죠.`]},
{h2:"퇴직금 청구 방법과 소멸시효는?",ps:[`사업주에게 서면(내용증명)으로 퇴직금 지급을 요청하고, 안 되면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 진정</a>을 넣으세요.`,`접수 후 근로감독관이 사업주를 조사하고 시정 명령을 내려요. 이행하지 않으면 형사 처벌(3년 이하 징역/3,000만 원 이하 벌금)까지 갈 수 있죠.`,`소멸시효는 <strong>퇴직일로부터 3년</strong>이에요. 기한을 넘기면 아무리 정당한 퇴직금이어도 법적으로 청구할 수 없으니, 빠르게 대응하세요.`]},
],
cl:["일당 지급 기록(이체 내역, 수기 장부)","출근 기록(사진, 카톡, 출입카드)","근로계약서(있다면)","사업주 연락처·사업자등록번호","건설근로자공제회 가입 내역(건설직)"],
faqs:[{q:"일용직이라 근로계약서를 안 썼어요.",a:"계약서가 없어도 일당 지급 기록, 카톡 대화 등으로 근로 사실을 증명하면 퇴직금 청구가 가능해요."},{q:"여러 현장에서 일했는데 사업주가 같으면 합산되나요?",a:"같은 사업주 소속이면 현장이 달라도 기간이 합산돼요."},{q:"사업주가 도급계약이라고 주장하면?",a:"도급이라 해도 실제로 지시·감독을 받으며 일했다면 근로자로 인정받을 수 있어요. 실질이 형식보다 우선하죠."},{q:"일용직 퇴직금에 세금이 붙나요?",a:"붙어요. 퇴직소득세가 부과되지만, 근속연수가 길수록 세금이 줄어드는 구조예요."},{q:"사업주가 폐업한 경우 퇴직금을 받을 수 있나요?",a:"체당금 제도를 통해 정부에서 먼저 지급받을 수 있어요. 고용노동부에 신청하면 되죠."}],
refs:[{cat:"법령",items:[{l:"근로자퇴직급여 보장법",u:"https://www.law.go.kr/법령/근로자퇴직급여보장법"},{l:"근로기준법",u:"https://www.law.go.kr/법령/근로기준법"}]},{cat:"공식 자료",items:[{l:"고용노동부 — 퇴직금 제도",u:"https://www.moel.go.kr"},{l:"건설근로자공제회",u:"https://www.cwma.or.kr"}]}],
rel:[{s:"일용직-퇴직금",t:"일용직 퇴직금 받을 수 있는 조건",d:"일용직도 1년 이상 근무했다면 퇴직금을 받을 수 있어요."},{s:"일용직-퇴직금-지급기준",t:"일용직 퇴직금 지급 기준",d:"계속 근로 여부 판단 기준을 정리했어요."},{s:"건설근로자-퇴직금",t:"건설 근로자 퇴직금",d:"건설근로자공제회 제도를 안내해요."}],
},
];

for (const d of data) {
  const dir = path.join(BASE, d.slug);
  fs.mkdirSync(dir, { recursive: true });
  const content = mkPage(d.slug, d.tags, d.h1, d.intro, d.checks, d.secs, d.cl, d.faqs, d.refs, d.rel);
  fs.writeFileSync(path.join(dir, "page.tsx"), content, "utf8");
  console.log("OK", d.slug);
}
console.log("Done batch 2!");
