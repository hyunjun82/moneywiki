"use client";
// Q1. 현금영수증이 연말정산에서 얼마나 공제되는지, 신용카드와 차이가 궁금한 상황
// Q2. 현금영수증 공제율을 확인하고, 총급여 25% 초과 사용 전략을 세운다
// Q3. 공제율 30%(신용카드 15%의 2배), 총급여 25% 기준, 공제 한도, 현금영수증 발급법
// Q4. GreenBox(공제율 비교) + DocTable(카드 종류별 비교) + Steps(발급 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_TABLE = {
  headers: ["결제 수단", "공제율", "비고"],
  rows: [
    ["신용카드", "15%", "기본 공제율"],
    ["체크카드", "30%", "현금영수증과 동일"],
    ["현금영수증", "30%", "체크카드와 동일"],
    ["전통시장", "40%", "추가 한도 100만원"],
    ["대중교통", "80%", "2026년 한시 적용"],
    ["도서·공연·영화", "30%", "총급여 7천만원 이하"],
  ],
};

const STEPS_DATA = [
  { title: "현금영수증 발급 수단 등록", desc: "홈택스에서 휴대폰번호를 현금영수증 발급 수단으로 등록해요. 한 번만 하면 돼요." },
  { title: "결제 시 번호 알려주기", desc: "현금 결제 후 등록한 휴대폰번호를 알려주면 자동 발급돼요. 5만원 이상 현금 결제는 가맹점이 의무 발급해야 해요." },
  { title: "연말정산 간소화에서 확인", desc: "홈택스 간소화 서비스에서 현금영수증 사용 내역이 자동 집계돼요. 1월에 확인하세요." },
];

const FAQS = [
  { q: "현금영수증이 신용카드보다 공제율이 높나요?", a: "네. 현금영수증은 30%로 신용카드(15%)의 2배예요. 총급여 25%를 넘긴 후에는 현금영수증이나 체크카드로 결제하는 게 유리해요." },
  { q: "총급여 25% 기준이 뭔가요?", a: "신용카드 등 소득공제는 총급여의 25%를 초과한 사용액부터 적용돼요. 25% 이하 사용분은 공제가 안 돼요. 총급여 5천만원이면 1,250만원 초과분부터 공제돼요." },
  { q: "공제 한도는 얼마인가요?", a: "총급여 7천만원 이하는 연 300만원, 7천만~1.2억은 250만원, 1.2억 초과는 200만원이에요. 전통시장·대중교통·도서공연은 추가 한도가 있어요." },
  { q: "현금영수증을 안 받으면 어떻게 되나요?", a: "국세청에 미발급 신고를 할 수 있어요. 미발급 가맹점에는 가산세가 부과되고, 신고자에게 건당 20% 포상금(한도 50만원)이 지급돼요." },
  { q: "소득공제와 세액공제 차이가 뭔가요?", a: "소득공제는 과세 대상 소득을 줄여주고, 세액공제는 계산된 세금에서 직접 빼줘요. 현금영수증은 소득공제예요." },
];

const SOURCES = [
  { name: "조세특례제한법 제126조의2", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-전통시장-공제", title: "연말정산 전통시장 공제", description: "전통시장 40% 공제율과 추가 한도." },
  { slug: "연말정산-특별공제", title: "연말정산 특별공제", description: "보험료·의료비 등 5가지 항목." },
  { slug: "연말정산-안경구입비-공제", title: "연말정산 안경구입비 공제", description: "안경 의료비 공제 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 소득공제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        현금영수증, 연말정산에서 얼마나 돌려받나?<br />
        공제율 30%와 활용 전략
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>현금영수증을 받으면 연말정산에서 돌려받는 게 있다는 건 아는데, 정확히 얼마나 되는지 모르겠죠.</p>
      <p style={body}>현금영수증은 <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법</a>에 따라 30% 소득공제율이 적용돼요. 신용카드(15%)의 2배예요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>결제 수단별 공제율 비교</H2>
      <p style={body}>같은 금액을 써도 결제 수단에 따라 공제율이 크게 달라요.</p>
      <SectionBadge>결제 수단별 공제율</SectionBadge>
      <DocTable headers={COMPARE_TABLE.headers} rows={COMPARE_TABLE.rows} />
      <p style={body}>총급여의 25%까지는 신용카드로 결제해서 포인트를 챙기고, 25%를 넘긴 후부터는 현금영수증이나 체크카드로 바꾸는 게 가장 유리한 전략이에요.</p>

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>25% 넘긴 후 전략이 중요해요</H2>
      <p style={body}>공제 구조를 알면 돈을 더 돌려받을 수 있어요.</p>
      <GreenBox title="소득공제 전략">
        총급여 25%까지: 신용카드 사용 (포인트 적립){"\n"}
        25% 초과분: 현금영수증·체크카드 집중 (30% 공제){"\n"}
        전통시장·대중교통: 추가 한도 활용{"\n"}
        공제 한도: 연 200~300만원 (총급여에 따라)
      </GreenBox>
      <Divider />

      <H2>현금영수증 발급받는 법</H2>
      <p style={body}>한 번 설정해두면 자동으로 발급돼요.</p>
      <SectionBadge>현금영수증 발급 방법</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>현금영수증 공제에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 조세특례제한법을 바탕으로 작성했어요. 공제율과 한도는 세법 개정에 따라 달라질 수 있으니, 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
