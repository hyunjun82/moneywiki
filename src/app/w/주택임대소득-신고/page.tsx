"use client";

// Q1: 주택임대소득 신고 방법 분리과세 종합과세 선택 기준 info
// Q2: 임대소득 2,000만원 이하면 분리과세(14%) vs 종합과세(6~45%) 선택 가능
// Q3: 임대소득 2,000만원 이하면 분리과세(14%) vs 종합과세(6~45%) 선택 가능, 등록임대주택 필요경비 60%+공제 400만원, 미등록 50%+공제 200만원 차이, 홈택스 예상세액 비교 서비스로 유리한 과세 방식 확인 후 5월 신고
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "임대소득 2,000만원 이하면 분리과세(14%) vs ", desc: "임대소득 2,000만원 이하면 분리과세(14%) vs 종합과세(6~45%) 선택 가능" },
  { title: "등록임대주택 필요경비 60%+공제 400만원, 미등록 ", desc: "등록임대주택 필요경비 60%+공제 400만원, 미등록 50%+공제 200만원 차이" },
  { title: "홈택스 예상세액 비교 서비스로 유리한 과세 방식 확인 ", desc: "홈택스 예상세액 비교 서비스로 유리한 과세 방식 확인 후 5월 신고" },
];
const CHECKLIST = [
  "임대소득 2,000만원 이하면 분리과세(14%) vs 종합과세(6~45%) 선택 가능",
  "등록임대주택 필요경비 60%+공제 400만원, 미등록 50%+공제 200만원 차이",
  "홈택스 예상세액 비교 서비스로 유리한 과세 방식 확인 후 5월 신고"
];

const FAQS = [
  { q: "주택임대소득 신고 안 하면 어떻게 되나요?", a: "무신고 가산세 20%와 납부지연 가산세가 붙어요. 국세청이 임대차계약 정보를 다 갖고 있어서 적발 확률 높아요." },
  { q: "분리과세와 종합과세 중 뭐가 유리한가요?", a: "다른 소득이 적으면 종합과세(6% 세율), 다른 소득이 많으면 분리과세(14% 세율)가 유리해요. 홈택스에서 비교해 보세요." },
  { q: "주택임대소득 신고 기간은 언제인가요?", a: "매년 5월 1일부터 31일까지 종합소득세 확정신고 기간에 해요. 전년도 1~12월 임대소득을 신고하는 거예요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 주택임대소득 신고", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2252&cntntsId=7683" },
      { label: "국세청 분리과세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2247&cntntsId=7679" },
      { label: "홈택스", url: "https://www.hometax.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택임대소득 신고 방법 분리과세 종합과세 선택 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주택임대소득 2,000만원 이하면 분리과세 14% 선택 가능해요. 홈택스에서 예상세액 비교하고 유리한 쪽으로 신고하면 돼요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>임대소득 2,000만원 이하면 분리과세(14%) vs </H2>
      <p style={body}>임대소득 2,000만원 이하면 분리과세(14%) vs 종합과세(6~45%) 선택 가능</p>
      <GreenBox title="핵심 정리">
        임대소득 2,000만원 이하면 분리과세(14%) vs 종합과세(6~45%) 선택 가능<br />
        등록임대주택 필요경비 60%+공제 400만원, 미등록 50%+공제 200만원 차이<br />
        홈택스 예상세액 비교 서비스로 유리한 과세 방식 확인 후 5월 신고
      </GreenBox>

      <CategoryButton label="세금 · 절세 정보" count={5} href="/category/세금" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>등록임대주택 필요경비 60%+공제 400만원,</H2>
      <p style={body}>등록임대주택 필요경비 60%+공제 400만원, 미등록 50%+공제 200만원 차이</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
