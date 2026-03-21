"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 자영업을 하다가 폐업했거나 폐업을 앞두고 있는데, 자영업자도 실업급여를 받을 수 있는지, 조건이 뭔지 구체적으로 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인이 수급 대상인지 판단하고, 폐업신고 → 고용센터 방문 → 수급자격 신청까지 실행하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 가입 조건(50인 미만, 5년 이내), 수급 3대 조건(피보험기간 12개월+정당한 폐업사유+구직 의사), 기준보수 7등급과 금액, 수급 기간, 신청 절차 5단계.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → EligibilityChecker(수급 조건) + GreenBox(기준보수 등급표) + Steps(신청 절차) + DocTable(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "e1", label: "자영업자 고용보험에 가입돼 있어요 (폐업 전 24개월 중 12개월 이상 납부)" },
  { id: "e2", label: "매출 감소·적자·건강 악화 등 비자발적 사유로 폐업했어요" },
  { id: "e3", label: "다시 취업할 의사와 능력이 있고, 적극적으로 구직활동을 할 거예요" },
  { id: "e4", label: "보험료를 체납하지 않았어요 (체납 시 실업인정 전까지 완납하면 가능)" },
];

const CLOSURE_REASONS = [
  "6개월 연속 적자가 발생한 경우",
  "최근 3개월 월평균 매출이 전년 동기 대비 20% 이상 감소",
  "3분기 연속 월평균 매출액이 감소 추세",
  "질병·부상으로 사업 지속이 어려운 경우",
  "자연재해(화재·수해 등)로 사업장 피해를 입은 경우",
];

const APPLY_STEPS = [
  { title: "관할 세무서에 폐업신고", desc: "먼저 사업자등록을 폐업 처리해야 해요. 관할 세무서에 방문하거나 홈택스에서 온라인 폐업 신고를 하세요.", tip: "폐업사실증명원이 나와야 다음 단계로 갈 수 있어요" },
  { title: "고용센터 방문 — 수급자격 신청", desc: "관할 고용센터에 방문해서 구직급여 수급자격 인정을 신청해요. 폐업 사유를 소명하는 서류가 필요해요." },
  { title: "온라인 교육 이수", desc: "고용24에서 실업급여 수급자 온라인 교육을 이수해요. 교육을 마쳐야 실업인정 절차가 시작돼요." },
  { title: "2~4주마다 실업인정 받기", desc: "정해진 주기(보통 2~4주)마다 구직활동 보고를 해요. 고용24에서 온라인으로 할 수 있어요.", tip: "실업인정을 빠뜨리면 해당 기간 급여가 안 나와요" },
  { title: "구직급여 수령", desc: "실업인정 후 지정 계좌로 구직급여가 입금돼요. 피보험기간에 따라 120~210일간 받아요." },
];

const DOCS = [
  { name: "폐업사실증명원", required: true, where: "세무서 발급 또는 홈택스 출력" },
  { name: "사업자등록증 사본", required: true, where: "본인 보관분" },
  { name: "신분증", required: true, where: "주민등록증 또는 운전면허증" },
  { name: "통장 사본", required: true, where: "구직급여 수령 계좌" },
  { name: "매출 증빙 (부가세 신고서 등)", required: false, where: "폐업 사유 소명용 (매출 감소 증빙)" },
];

const FAQS = [
  { q: "고용보험에 가입 안 했는데 지금이라도 가입할 수 있나요?", a: "사업자등록일로부터 5년 이내라면 가입할 수 있어요. 5년이 지났으면 신규 가입이 안 되니, 가입 가능 기간을 꼭 확인하세요. 고용24 또는 근로복지공단에서 신청해요." },
  { q: "보험료는 얼마예요?", a: "기준보수 7등급 중 선택한 등급의 2.25%예요. 1등급(182만원)이면 월 약 40,950원, 7등급(338만원)이면 월 약 76,050원이에요." },
  { q: "단순히 사업이 싫어서 접어도 받을 수 있나요?", a: "안 돼요. 자발적 폐업은 수급 대상이 아니에요. 매출 감소, 적자, 건강 악화 같은 비자발적 사유가 있어야 해요." },
  { q: "조기재취업수당도 받을 수 있나요?", a: "아니요. 자영업자 실업급여 수급자는 조기재취업수당과 연장급여가 적용되지 않아요. 구직급여, 직업능력개발수당, 광역구직활동비, 이주비는 받을 수 있어요." },
  { q: "폐업 전에 보험료를 밀렸으면 어떡하나요?", a: "실업인정 전까지 체납액과 연체금을 모두 납부하면 구직급여를 받을 수 있어요. 완납하지 않으면 수급이 불가능해요." },
  { q: "1일 실업급여 상한액이 얼마예요?", a: "2026년 기준 1일 상한액 68,100원, 하한액 66,048원이에요. 기준보수의 60%를 적용하되, 상한·하한 범위 내에서 지급돼요." },
  { q: "만 65세 이상이면 가입이 안 되나요?", a: "맞아요. 만 65세 이상은 자영업자 고용보험에 신규 가입할 수 없어요. 이미 가입 중인 경우에는 계속 유지할 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "고용보험법(자영업자 고용보험)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 자영업자 실업급여 안내", url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000347" },
      { label: "찾기쉬운 생활법령정보(자영업자 실업급여)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=722&ccfNo=4&cciNo=1&cnpClsNo=1" },
      { label: "정부24 자영업자 실업급여 안내", url: "https://www.gov.kr/portal/service/serviceInfo/149200000011" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-신청-방법", title: "실업급여 신청 방법", description: "일반 근로자 실업급여 신청 절차를 정리했어요." },
  { slug: "실업급여-수급-조건", title: "실업급여 수급 조건", description: "근로자 실업급여 자격 조건을 확인해보세요." },
  { slug: "실업급여-취업지원금", title: "취업촉진수당 4가지 종류", description: "실업급여 외에 추가로 받을 수 있는 지원금이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 자영업자 고용보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자영업자도 실업급여 받을 수 있을까?<br />
        수급 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가게를 접었는데 당장 다음 달 생활비가 걱정되죠. 자영업자는 실업급여를 못 받는다고 생각하는 분이 많은데, 고용보험에 가입돼 있었다면 받을 수 있어요.
        문제는 조건이에요. 아무 이유로 폐업하면 안 되고, 가입 기간도 채워야 하죠. 하나씩 짚어드릴게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>수급 조건 4가지, 전부 충족해야 해요</H2>
      <p style={body}>
        자영업자 실업급여는 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 근거해요.
        일반 근로자 실업급여와 구조는 비슷한데, 폐업 사유 조건이 추가되는 게 다른 점이에요.
      </p>

      <SectionBadge>수급 자격 체크</SectionBadge>
      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="4가지 모두 충족하면 자영업자 실업급여를 받을 수 있어요!"
        partialMatchText="충족하지 못한 조건이 있으면 고용센터(☎ 1350)에 문의해보세요."
      />

      <p style={body}>
        가장 많이 걸리는 게 &ldquo;피보험기간 12개월&rdquo;이에요. 고용보험에 가입하고 12개월 치 보험료를 실제로 납부해야 하는 거죠.
        보험료를 체납하면 그 기간이 빠지니까, 매달 꼬박꼬박 내는 게 중요해요.
      </p>

      <Divider />

      <H2>정당한 폐업 사유, 이런 경우에 인정돼요</H2>
      <p style={body}>
        &ldquo;장사가 안 되니까&rdquo;만으로는 부족해요. 구체적인 수치로 증명해야 해요.
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=722&ccfNo=4&cciNo=1&cnpClsNo=1" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에 따르면, 아래 사유 중 하나에 해당하면 돼요.
      </p>

      <SectionBadge>인정되는 폐업 사유</SectionBadge>
      <Checklist items={CLOSURE_REASONS} />

      <BorderBox>
        <strong>인정 안 되는 경우</strong><br />
        단순히 사업이 싫어서 접는 경우, 더 좋은 취업 기회가 생겨서 폐업하는 경우, 자발적으로 사업을 정리하는 경우는 수급 대상이 아니에요.
      </BorderBox>

      <p style={body}>
        매출 감소는 부가세 신고서로 증빙해요. 건강 악화는 진단서가 필요하고요. 서류를 미리 준비해두는 게 고용센터 방문 시 수월해요.
      </p>

      <Divider />

      <H2>금액은 얼마나 받나요?</H2>
      <p style={body}>
        자영업자 실업급여 금액은 가입할 때 선택한 기준보수 등급에 따라 달라져요.
        기준보수의 60%가 1일 구직급여예요. 다만 상한액(68,100원)과 하한액(66,048원) 범위 안에서 지급돼요.
      </p>

      <GreenBox title="2026년 기준보수 등급과 구직급여">
        <strong>보험료율</strong>: 기준보수의 2.25%<br />
        <strong>구직급여</strong>: 기준보수의 60% (1일 상한 68,100원 / 하한 66,048원)<br /><br />
        1등급(182만원) → 월 보험료 약 40,950원<br />
        4등급(260만원) → 월 보험료 약 58,500원<br />
        7등급(338만원) → 월 보험료 약 76,050원<br /><br />
        ※ 높은 등급일수록 보험료는 많지만, 실업급여도 많아요<br />
        ※ 소상공인은 보험료의 50~80%를 환급받을 수 있어요 (소상공인시장진흥공단)
      </GreenBox>

      <p style={body}>
        수급 기간은 피보험기간에 따라 달라요. 1~3년이면 120일(4개월), 3~5년이면 150일(5개월), 5~10년이면 180일(6개월), 10년 이상이면 210일(7개월)이에요.
        일반 근로자보다 수급 기간이 짧고 연령 가산도 없다는 점이 달라요.
      </p>

      <Divider />

      <H2>신청은 이 순서대로 하세요</H2>
      <p style={body}>
        폐업 후 가장 먼저 할 일은 세무서 폐업신고예요. 그다음 고용센터를 방문해서 수급자격을 신청하면 돼요.
      </p>

      <SectionBadge>자영업자 실업급여 신청 5단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>준비할 서류 목록이에요</H2>
      <p style={body}>
        고용센터 방문 전에 서류를 미리 챙겨가면 한 번에 처리할 수 있어요.
        매출 감소 사유로 신청하는 경우에는 부가세 신고서를 추가로 준비하세요.
      </p>

      <SectionBadge>제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        폐업사실증명원은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 바로 출력할 수 있어요. 세무서 방문 없이도 온라인으로 발급 가능하죠.
        서류가 준비됐다면 관할 고용센터에 방문해서 수급자격 인정을 신청하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 관련 고시를 바탕으로 작성됐어요. 기준보수 등급·보험료율·수급 기간은 매년 변동될 수 있으니 고용24(ei.go.kr) 또는 고용센터(☎ 1350)에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
