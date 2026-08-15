"use client";
// Q1: 원천징수 의무가 있는지, 어떤 소득에 원천징수를 해야 하는지 모르는 사업자/경리 담당자
// Q2: 원천징수 대상 소득과 의무자를 확인하고 기한 내 신고·납부
// Q3: 원천징수 대상 8가지 소득, 의무자(소득 지급자), 신고 기한(다음 달 10일), 가산세
// Q4: DocTable(대상 소득) + Steps(신고 절차) + GreenBox(핵심) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const INCOME_DOCS = [
  { name: "근로소득", required: true, where: "간이세액표에 따라 원천징수" },
  { name: "사업소득 (프리랜서 등)", required: true, where: "3.3% (소득세 3% + 지방세 0.3%)" },
  { name: "이자소득", required: true, where: "15.4% (소득세 14% + 지방세 1.4%)" },
  { name: "배당소득", required: true, where: "15.4% (소득세 14% + 지방세 1.4%)" },
  { name: "기타소득", required: true, where: "22% (소득금액 기준, 필요경비 60% 차감 후)" },
  { name: "퇴직소득", required: true, where: "퇴직소득세 계산표에 따라" },
  { name: "연금소득", required: true, where: "연금소득 간이세액표에 따라" },
  { name: "일용근로소득", required: true, where: "6% (15만원 초과분)" },
];

const STEPS = [
  { title: "원천징수 대상 소득 확인", desc: "소득을 지급할 때 해당 소득이 원천징수 대상인지 확인해요. 위 8가지 소득이 대상이에요." },
  { title: "세율에 따라 세금 공제 후 지급", desc: "소득을 지급할 때 해당 세율만큼 세금을 떼고 나머지를 지급해요. 프리랜서면 3.3%를 떼고 지급하는 거예요." },
  { title: "다음 달 10일까지 신고·납부", desc: "원천징수한 세금을 다음 달 10일까지 홈택스에서 신고하고 납부해요. 반기납부 승인을 받으면 6개월에 한 번 신고할 수 있어요.", tip: "홈택스(hometax.go.kr) → 신고/납부 → 원천세" },
  { title: "지급명세서 제출", desc: "다음 해 2월 말(근로소득) 또는 3월 10일(사업·기타소득)까지 지급명세서를 제출해요." },
];

const FAQS = [
  { q: "원천징수 의무자가 누구예요?", a: "소득을 지급하는 사람(법인·개인사업자)이 원천징수 의무자예요. 직원 급여를 주는 회사, 프리랜서에게 용역비를 주는 사업자가 해당돼요." },
  { q: "프리랜서에게 지급할 때 3.3% 떼는 게 원천징수인가요?", a: "네, 맞아요. 사업소득(프리랜서)에 대해 3.3%(소득세 3% + 지방세 0.3%)를 원천징수하는 거예요." },
  { q: "원천징수를 안 하면 어떻게 되나요?", a: "불납부가산세(1일 0.022%)와 불성실가산세(10%)가 부과돼요. 소득을 지급할 때 떼지 않았어도 원천징수 의무자가 세금을 내야 해요." },
  { q: "반기납부는 어떻게 신청하나요?", a: "상시 근로자 20인 이하 사업장이면 반기납부를 신청할 수 있어요. 홈택스에서 신청하면 1월·7월에 한 번씩 신고하면 돼요." },
  { q: "개인이 개인에게 지급해도 원천징수하나요?", a: "개인사업자가 프리랜서에게 지급하면 원천징수 의무가 있어요. 사업자가 아닌 개인 간 거래는 원천징수 의무가 없어요." },
];

const REFERENCES = [
  { category: "법령·안내", items: [
    { label: "소득세법 제127조 (원천징수의무)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세청 원천징수 안내", url: "https://www.nts.go.kr" },
  ]},
  { category: "신고", items: [{ label: "홈택스 원천세 신고", url: "https://www.hometax.go.kr" }] },
];

const RELATED = [
  { slug: "비거주자-원천징수-세율", title: "비거주자 원천징수 세율", description: "외국인에게 지급할 때 적용하는 세율이에요." },
  { slug: "연말정산-기타소득", title: "연말정산 기타소득", description: "기타소득 원천징수와 분리과세 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천징수</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        원천징수 대상 소득과 의무자는 누구일까?<br />
        소득유형별 세율과 신고 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원 급여를 줄 때, 프리랜서에게 용역비를 줄 때 세금을 떼야 하는 건 알겠는데 정확히 얼마를 떼야 하는지 헷갈리죠?
        원천징수 대상 소득은 8가지이고, 소득 유형마다 세율이 달라요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>원천징수 대상 소득과 세율</H2>
      <p style={body}>소득을 지급하는 사람이 세금을 떼서 국가에 대신 납부하는 게 원천징수예요. 아래 8가지 소득이 대상이에요.</p>
      <SectionBadge>소득유형별 원천징수 세율</SectionBadge>
      <DocTable docs={INCOME_DOCS} />

      <GreenBox title="원천징수 의무자">
        소득을 지급하는 자가 원천징수 의무자예요. 법인, 개인사업자, 비영리법인 모두 해당돼요.
        의무자가 세금을 떼지 않아도 납부 의무는 의무자에게 있어요.
      </GreenBox>

      <CategoryButton label="세금·원천징수 정보" count={4} href="/category/세금" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>원천징수 신고·납부 절차</H2>
      <p style={body}>소득을 지급하고 다음 달 10일까지 신고·납부하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 소득세법을 바탕으로 작성됐어요. 세율과 신고 기한은 변경될 수 있으니 홈택스에서 최신 정보를 확인해보세요." />
    </ArticleLayout>
  );
}
