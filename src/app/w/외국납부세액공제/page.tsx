"use client";
// Q1: 해외 소득에 대해 외국에서 세금을 냈는데 국내에서도 세금을 내야 하는지 궁금한 사업자·직장인
// Q2: 외국납부세액공제를 적용해서 이중과세 방지
// Q3: 공제 방식(세액공제 vs 필요경비), 한도(국외소득 비율), 신청 방법, 증빙 서류
// Q4: GreenBox(핵심) + Steps(신청 절차) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "외국 납부세액 증빙 확보", desc: "외국 정부에서 발급한 납세증명서를 받아요. 영문 또는 해당 국가 언어 원본과 번역본이 필요해요." },
  { title: "공제 방식 선택", desc: "세액공제(산출세액에서 차감)와 필요경비 산입(소득에서 차감) 중 유리한 방식을 선택해요. 대부분 세액공제가 유리해요." },
  { title: "종합소득세 신고 시 적용", desc: "5월 종합소득세 신고서에 외국납부세액공제 항목을 작성해요. 홈택스에서 신고 가능해요." },
];

const CHECKLIST = [
  "해외에서 발생한 소득에 대해 외국에 납부한 세금을 국내 세금에서 공제해주는 제도예요",
  "세액공제와 필요경비 산입 중 유리한 방식을 선택할 수 있어요",
  "공제 한도는 산출세액 x (국외소득 / 총소득)으로 계산해요",
];

const FAQS = [
  { q: "외국납부세액공제란 뭔가요?", a: "해외에서 발생한 소득에 외국 세금을 냈을 때, 그 세금을 국내 소득세에서 빼주는 거예요. 같은 소득에 두 나라에서 세금을 내는 이중과세를 방지하는 제도예요." },
  { q: "공제 한도가 있나요?", a: "네, 한도가 있어요. 산출세액 x (국외원천소득 / 종합소득금액)으로 계산해요. 외국에서 낸 세금이 한도를 넘으면 5년간 이월공제할 수 있어요." },
  { q: "세액공제와 필요경비 중 뭐가 유리한가요?", a: "대부분 세액공제가 유리해요. 세액공제는 산출세액에서 직접 빼주고, 필요경비는 소득에서 빼서 간접적으로 세금을 줄이는 거라 효과가 작아요." },
  { q: "직장인도 적용받을 수 있나요?", a: "해외 근무 소득이 있는 직장인도 적용받을 수 있어요. 회사에서 연말정산 시 처리하거나, 5월에 종합소득세 신고를 통해 공제받을 수 있어요." },
  { q: "어떤 서류가 필요한가요?", a: "외국 정부가 발급한 납세증명서가 필수예요. 조세조약이 있는 국가면 거주자증명서도 함께 제출하면 좋아요." },
];

const REFERENCES = [
  { category: "출처", items: [
    { label: "소득세법 제57조 (외국납부세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세청 외국납부세액공제 안내", url: "https://www.nts.go.kr" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        외국납부세액공제, 해외 세금 이중으로 안 내려면?<br />
        공제 방식과 한도 계산법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해외에서 발생한 소득에 외국 세금을 냈는데 한국에서도 세금을 내야 하나 걱정되죠? 외국납부세액공제를 적용하면 이중과세를 피할 수 있어요.
      </p>
      <Divider /><ArticleAd position="intro" />
      <H2>외국납부세액공제 핵심</H2>
      <p style={body}>같은 소득에 두 나라에서 세금을 내지 않도록 외국에 낸 세금을 국내 세금에서 빼주는 제도예요.</p>
      <GreenBox title="핵심 정리">
        세액공제 방식: 산출세액에서 외국 납부세액 직접 차감<br />
        필요경비 방식: 소득에서 외국 납부세액을 경비로 차감<br />
        한도: 산출세액 x (국외소득 / 총소득)<br />
        초과분은 5년간 이월공제 가능
      </GreenBox>
      <CategoryButton label="세금 · 절세 정보" count={5} href="/category/세금" />
      <RelatedArticles items={[]} />
      <Divider />
      <H2>신청 절차</H2>
      <p style={body}>종합소득세 신고 시 적용하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기준 소득세법을 바탕으로 작성됐어요. 조세조약 내용은 국가별로 다르니 국세청에서 확인해보세요." />
    </ArticleLayout>
  );
}
