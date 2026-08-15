"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     기부금으로 연말정산 공제를 받고 싶은데, 종류별 공제율과 한도가 헷갈리는 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     기부금 종류별 공제율을 파악하고, 고향사랑기부금 등 가장 유리한 기부를 선택한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     기부금 4종류(고향사랑/정치자금/법정/지정), 종류별 공제율과 한도, 고향사랑기부금 2천만원 한도 상향, 이월 규정, 영수증 준비
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     DocTable로 기부금 종류별 비교 + GreenBox로 고향사랑기부금 핵심 + Steps로 신청 절차 + Checklist로 영수증 준비

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DONATION_TABLE = {
  headers: ["기부금 종류", "공제율", "한도", "이월"],
  rows: [
    ["고향사랑기부금", "10만원까지 100%, 초과분 15%", "2,000만원", "불가"],
    ["정치자금", "10만원까지 100%, 초과 15~25%", "제한 없음", "불가"],
    ["법정기부금", "1천만원까지 15%, 초과분 30%", "소득의 100%", "10년"],
    ["지정기부금(일반)", "1천만원까지 15%, 초과분 30%", "소득의 30%", "10년"],
    ["지정기부금(종교)", "1천만원까지 15%, 초과분 30%", "소득의 10%", "10년"],
  ],
};

const APPLY_STEPS = [
  { title: "홈택스 간소화 서비스 확인", desc: "1월 15일부터 홈택스에서 기부금 내역을 조회해요. 고향사랑기부금, 정치자금, 법정기부금은 대부분 자동 반영돼요.", tip: "종교단체 기부금은 자동 조회 안 되는 경우가 많아요" },
  { title: "누락분 영수증 직접 수집", desc: "간소화에 안 나오는 종교단체 기부금은 교회·성당·사찰에서 영수증을 직접 받으세요." },
  { title: "기부금명세서 작성", desc: "기부금 종류별로 금액을 정리해서 회사에 제출해요. 간소화 PDF와 별도 영수증을 함께 내세요." },
  { title: "공제 한도 확인", desc: "종교단체는 소득의 10%, 일반 지정기부금은 30%가 한도예요. 초과분은 10년간 이월 가능해요." },
];

const RECEIPT_CHECKLIST = [
  "간소화서비스에서 기부금 내역 PDF 다운로드",
  "종교단체 기부금 영수증 별도 수령 (교회·성당·사찰)",
  "고향사랑e음 사이트에서 기부 내역 확인",
  "기부금 종류별 한도 초과 여부 계산",
  "이월 기부금이 있다면 전년도 분 합산 확인",
];

const FAQS = [
  { q: "고향사랑기부금이 가장 유리한 이유가 뭔가요?", a: "10만원 기부하면 10만원 전액 환급 + 3만원 답례품이에요. 실질적으로 13만원 혜택인데 부담은 0원이에요. 2025년 귀속부터 한도가 2,000만원으로 올랐어요." },
  { q: "종교단체 기부금은 왜 한도가 낮나요?", a: "소득의 10%로 제한돼요. 총급여 5,000만원이면 500만원까지만 공제돼요. 일반 지정기부금(30%)보다 한도가 낮아요." },
  { q: "공제 못 받은 기부금은 사라지나요?", a: "법정·지정기부금은 10년간 이월 가능해요. 올해 한도 초과분은 내년에 이어서 공제받을 수 있어요. 다만 고향사랑·정치자금은 이월이 안 돼요." },
  { q: "허위 영수증 내면 어떻게 되나요?", a: "과다공제 추징 + 가산세 40%가 붙어요. 국세청이 기부단체와 대조해서 적발하니까 실제 기부한 금액만 신청하세요." },
  { q: "맞벌이 부부는 누가 받는 게 유리해요?", a: "소득이 높은 쪽이 유리해요. 세율이 높을수록 같은 세액공제라도 체감 효과가 크거든요. 기부금 영수증은 기부자 명의대로 공제받아야 해요." },
  { q: "특별재난지역 기부 시 공제율이 높아지나요?", a: "네. 특별재난지역에 고향사랑기부금을 보내면 10만원 초과분 공제율이 15%가 아니라 30%로 올라요. 선포일로부터 3개월 이내 기부분에 한해요." },
];

const SOURCES = [
  { name: "국세청 기부금 세액공제 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=239040" },
  { name: "소득세법 제59조의4 (특별세액공제)", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "고향사랑e음 공식", href: "https://ilovegohyang.go.kr" },
];

const RELATED = [
  { slug: "연말정산-세액공제", title: "연말정산 세액공제 항목 정리", description: "의료비, 교육비, 연금저축 등 세액공제 총정리." },
  { slug: "연말정산-간소화서비스-이용방법", title: "연말정산 간소화서비스 이용방법", description: "홈택스에서 공제 자료 조회하는 절차." },
  { slug: "연말정산-환급-조회", title: "연말정산 환급금 조회", description: "환급금이 언제, 얼마나 들어오는지 확인." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 기부금 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 기부금 세액공제, 얼마 돌려받나?<br />
        종류별 공제율과 한도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기부는 했는데 공제율이 15%인지 100%인지, 한도가 얼마인지 헷갈리죠.
      </p>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=239040" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 기부금 세액공제 안내</a>에 따르면 기부금은 종류에 따라 공제율이 15~100%까지 달라요. 특히 <strong>고향사랑기부금 10만원은 전액 환급 + 답례품 3만원</strong>이라 안 하면 손해예요. 2025년 귀속부터 한도도 2,000만원으로 확대됐어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기부금 종류별 공제율, 한눈에 비교</H2>
      <p style={body}>
        기부금은 크게 4가지로 나뉘어요. 종류에 따라 공제율과 한도가 완전히 달라서 꼭 구분해야 해요.
      </p>

      <SectionBadge>기부금 종류별 공제율·한도 (2025년 귀속)</SectionBadge>
      <DocTable headers={DONATION_TABLE.headers} rows={DONATION_TABLE.rows} />

      <p style={body}>
        법정기부금과 지정기부금은 1천만원을 기준으로 공제율이 갈려요. 1천만원까지 15%, 초과분은 30%예요. 2천만원 법정기부금을 냈다면 1천만원 x 15% + 1천만원 x 30% = 450만원 세액공제인 셈이에요.
      </p>

      <CategoryButton label="연말정산 정보" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>고향사랑기부금, 왜 안 하면 손해일까?</H2>
      <p style={body}>
        고향사랑기부금은 연말정산에서 가장 확실한 절세 수단이에요. 10만원 기부하면 돌아오는 혜택이 13만원이거든요.
      </p>

      <GreenBox>
        10만원 기부 → 10만원 전액 세액공제 (100%){"\n"}
        + 답례품 3만원 (지역 특산품·상품권 선택){"\n"}
        = 실질 혜택 13만원, 본인 부담 0원
      </GreenBox>

      <p style={body}>
        <a href="https://ilovegohyang.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고향사랑e음</a> 사이트에서 주민등록 거주지가 아닌 다른 지자체에 기부하면 돼요. 서울에 살면 부산이나 제주에 기부하는 식이에요.
      </p>

      <BorderBox>
        <strong>2025년 귀속 변경사항</strong><br />
        기부 한도가 500만원에서 2,000만원으로 확대됐어요. 10만원 초과분은 15% 공제, 특별재난지역 기부 시 초과분 30% 공제율이 적용돼요.
      </BorderBox>

      <Divider />

      <H2>기부금 세액공제, 어떻게 신청하나요?</H2>
      <p style={body}>
        대부분은 간소화서비스에서 자동 조회돼요. 다만 종교단체 기부금은 직접 영수증을 챙겨야 하는 경우가 많아요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>영수증 준비, 빠뜨린 건 없나요?</H2>
      <p style={body}>
        기부금 영수증이 없으면 공제를 못 받아요. 아래 체크리스트로 확인해보세요.
      </p>

      <Checklist items={RECEIPT_CHECKLIST} />

      <p style={body}>
        종교단체 영수증은 연말에 한꺼번에 받으려면 늦을 수 있어요. 11월 중에 미리 요청하는 게 안전해요.
      </p>

      <Divider />

      <H2>기부금 세액공제, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 소득세법과 국세청 안내를 바탕으로 작성했어요. 기부금 공제율과 한도는 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인해보세요." />
    </ArticleLayout>
  );
}
