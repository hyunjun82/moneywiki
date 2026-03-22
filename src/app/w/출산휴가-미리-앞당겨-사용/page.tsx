"use client";

// Q1. 임신 중인 근로자가 유산 위험이나 건강 문제로 출산휴가를 출산 전에 미리 사용할 수 있는지 알아보는 상황
// Q2. 분할 사용 요건을 확인하고, 사업주에게 출산전후휴가 분할 사용 신청서를 제출한다
// Q3. 분할 사용 허용 사유(유산 경험, 40세 이상 등), 출산 후 최소 45일 보장, 미숙아 출산 시 100일, 다태아 120일
// Q4. EligibilityChecker(분할 사용 사유) + Steps(신청 절차) + GreenBox(핵심 요약) + BorderBox(기간 정리) + FAQ
// MAP-INTRO: 임신 중에 몸이 안 좋은데 출산휴가를 미리 당겨 쓸 수 있는지 궁금하죠
// MAP-TYPE: 자격확인
// MAP-H2: 미리 사용할 수 있는 사유 > 휴가 기간은 어떻게 되나 > 신청 방법 > 급여는 어떻게 받나 > FAQ
// MAP-COMP: EligibilityChecker > BorderBox > Steps > GreenBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "miscarriage", label: "유산·사산 경험이 있어요" },
  { id: "age", label: "만 40세 이상이에요" },
  { id: "subfertility", label: "유산 위험이 있다는 의사 진단서가 있어요" },
  { id: "ivf", label: "체외수정(시험관) 시술을 받았어요" },
  { id: "multipreg", label: "다태아(쌍둥이 이상)를 임신했어요" },
];

const STEPS_DATA = [
  {
    title: "의사 진단서를 받으세요",
    desc: "분할 사용을 신청하려면 유산 위험이 있다는 의사 진단서가 필요해요. 유산 경험이 있거나, 만 40세 이상이거나, 체외수정 시술을 받은 경우에 발급받을 수 있어요. 진단서에 '임신 유지를 위해 휴식이 필요하다'는 소견이 있으면 돼요.",
    tip: "산부인과 진단서 1부 준비",
  },
  {
    title: "사업주에게 분할 사용 신청서를 제출하세요",
    desc: "출산전후휴가 분할 사용 신청서에 휴가 시작일·종료일, 사유, 진단서를 첨부해서 인사팀에 제출하면 돼요. 회사 양식이 없으면 고용노동부 양식을 사용해도 되고요. 사업주는 법정 사유에 해당하면 거부할 수 없어요.",
    tip: "사업주 거부 시 고용노동부 진정 가능",
  },
  {
    title: "출산 후 45일 이상은 반드시 연속 사용하세요",
    desc: "출산 전에 휴가를 나눠 쓰더라도, 출산 후에는 최소 45일(다태아 60일)을 연속으로 사용해야 해요. 이 기간은 법정 의무라서 줄일 수 없어요. 출산 전에 쓴 기간 + 출산 후 기간 합산이 총 90일(다태아 120일, 미숙아 100일)이에요.",
    tip: "출산 후 45일 미만 사용 → 사업주 처벌 대상",
  },
];

const FAQS = [
  { q: "누구나 출산휴가를 미리 당겨 쓸 수 있나요?", a: "아니요, 법정 사유가 있어야 해요. 유산·사산 경험, 만 40세 이상, 유산 위험 진단, 체외수정 시술, 다태아 임신 등이 해당돼요. 사유 없이는 출산 전 최대 45일만 쓸 수 있고 나머지는 출산 후에 써야 해요." },
  { q: "출산 예정일보다 일찍 낳으면 어떻게 되나요?", a: "조기 출산(조산)하면 이미 쓴 출산 전 휴가 + 출산 후 휴가가 합산돼요. 출산 후 45일은 반드시 보장되고, 총 90일에서 출산 전에 쓴 일수를 뺀 나머지가 출산 후 휴가예요. 미숙아를 출산했다면 총 100일이 돼요." },
  { q: "분할은 몇 번까지 나눠 쓸 수 있나요?", a: "횟수 제한은 법에 명시돼 있지 않아요. 다만 출산 전에 나눠서 여러 번 사용하더라도, 출산 후 연속 45일(다태아 60일)은 반드시 보장해야 해요. 실무적으로는 출산 전 1~2회 분할이 일반적이에요." },
  { q: "미숙아를 낳으면 휴가가 늘어나나요?", a: "네, 미숙아(37주 미만 출생 또는 출생 체중 2,500g 미만으로 신생아중환자실 입원)를 출산하면 총 100일의 출산전후휴가를 받을 수 있어요. 일반 출산 90일보다 10일 더 길죠." },
  { q: "사업주가 분할 사용을 거부하면요?", a: "법정 사유에 해당하는데 거부하면 근로기준법 위반이에요. 2년 이하 징역 또는 2,000만원 이하 벌금에 처해질 수 있어요. 고용노동부(1350)에 상담하거나 진정을 넣으면 돼요." },
  { q: "출산휴가 급여는 어떻게 받나요?", a: "우선지원대상기업(중소기업)은 90일 전체를 고용보험에서 지급해요. 대규모 기업은 처음 60일은 사업주가, 나머지 30일은 고용보험에서 지급하고요. 분할 사용하더라도 급여 지급 방식은 동일해요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "근로기준법 제74조 (임산부 보호)", url: "https://www.law.go.kr/법령/근로기준법" },
    { label: "남녀고용평등법 제18조 (출산전후휴가 급여)", url: "https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" },
  ]},
  { category: "신청", items: [
    { label: "고용24 - 출산전후휴가급여 신청", url: "https://www.work24.go.kr" },
  ]},
];

const RELATED = [
  { title: "2026년 출산휴가 급여", slug: "2026년-출산휴가급여", description: "" },
  { title: "출산휴가와 연차휴가 산정", slug: "출산휴가-연차휴가-산정", description: "" },
  { title: "단시간근로자 연차휴가", slug: "단시간근로자-유급휴일-연차휴가", description: "" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>출산·육아</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        출산휴가, 출산 전에 미리 쓸 수 있을까?{"\n"}
        <span style={{ fontSize: 19, fontWeight: 500, color: "#374151" }}>분할 사용 조건과 신청 방법</span>
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임신 중에 몸이 안 좋은데 출산휴가를 미리 당겨 쓸 수 있는지 궁금하죠.
        원칙적으로 출산전후휴가 90일 중 출산 후 45일은 반드시 남겨야 하지만, 법정 사유가 있으면 출산 전에 나눠서 쓸 수 있어요.
        유산 경험이 있거나, 만 40세 이상이거나, 유산 위험 진단을 받았다면 해당돼요.
      </p>
      <Divider />

      <H2>어떤 경우에 미리 사용할 수 있나요?</H2>
      <p style={body}>
        근로기준법 제74조에 따라, 아래 사유 중 하나라도 해당하면 출산휴가를 출산 전에 분할해서 사용할 수 있어요.
        사업주는 법정 사유에 해당하면 거부할 수 없어요.
        진단서 하나만 있으면 신청이 가능하죠.
      </p>
      <SectionBadge>분할 사용 사유</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="출산휴가 분할 사용 대상이에요."
        partialMatchText="하나라도 해당하면 분할 사용을 신청할 수 있어요."
      />
      <p style={body}>
        사유 없이는 출산 전 최대 45일까지만 쓸 수 있고, 나머지 45일은 출산 후에 연속으로 써야 해요.
        분할 사용 사유가 있으면 출산 전 어느 때든 나눠서 쓸 수 있어요.
      </p>
      <Divider />

      <ArticleAd position="mid" />

      <H2>휴가 기간은 어떻게 되나요?</H2>
      <p style={body}>
        출산전후휴가 총 기간은 출산 유형에 따라 달라져요.
        일반 출산 90일, 미숙아 출산 100일, 다태아 출산 120일이에요.
        어떤 경우든 출산 후 최소 45일(다태아 60일)은 반드시 연속으로 사용해야 하고요.
      </p>
      <SectionBadge>기간 정리</SectionBadge>
      <BorderBox title="출산 유형별 휴가 기간">
        <p style={{ ...body, marginBottom: 6 }}><strong>일반 출산</strong>: 총 90일 (출산 후 45일 이상 연속)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>미숙아 출산</strong>: 총 100일 (출산 후 45일 이상 연속)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>다태아 출산</strong>: 총 120일 (출산 후 60일 이상 연속)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>유산·사산</strong>: 임신 기간에 따라 5~90일</p>
      </BorderBox>
      <p style={body}>
        예를 들어 출산 전에 20일을 미리 썼다면, 출산 후에는 70일을 연속으로 사용해요.
        출산 후 45일 미만이 되면 안 되니까, 출산 전에 쓸 수 있는 최대 일수는 45일(90일 - 45일)이에요.
      </p>
      <Divider />

      <H2>어떻게 신청하나요?</H2>
      <p style={body}>
        신청은 사업주에게 서면으로 하면 돼요.
        <a href="/w/2026년-출산휴가급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>출산전후휴가 급여</a>는 별도로 고용24에서 신청해야 하고요.
        분할 사용이든 일반 사용이든 급여 지급 방식은 동일해요.
      </p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <Divider />

      <H2>급여는 어떻게 받나요?</H2>
      <p style={body}>
        출산전후휴가 급여는 고용보험에서 나와요.
        우선지원대상기업(중소기업)은 90일 전체를 고용보험에서 지급하고, 대규모 기업은 60일은 사업주 부담, 30일은 고용보험에서 지급해요.
        2026년 기준 상한액은 월 210만원이에요.
      </p>
      <GreenBox title="핵심 요약">
        유산 경험·만 40세 이상·유산 위험 진단·체외수정·다태아 임신 → 출산 전 분할 사용 가능.
        출산 후 최소 45일(다태아 60일) 연속 사용 의무.
        사업주 거부 불가, 거부 시 2년 이하 징역/2,000만원 이하 벌금.
      </GreenBox>
      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성했어요. 개별 사안은 고용노동부(1350) 또는 노무사에게 상담하세요." />

      <CategoryButton label="출산·육아" href="/categories/maternity" />
      <RelatedArticles items={RELATED} />
    </div>
  );
}
