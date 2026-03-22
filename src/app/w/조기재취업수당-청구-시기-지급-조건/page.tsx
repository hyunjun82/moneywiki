"use client";

// Q1. 실업급여 받다가 취업했는데 조기재취업수당을 받을 수 있는지, 언제 청구하는지 궁금한 재취업자
// Q2. 조기재취업수당 지급 요건과 청구 시기를 확인해서 제때 청구한다
// Q3. 12개월 근속 후 청구, 잔여일수 50% 계산, 지급 제외 조건(월 574만원), 청구 기한 1년
// Q4. GreenBox(핵심 정리) + EligibilityChecker(자격 확인) + Steps(청구 절차) + BorderBox(금액 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "remain", label: "실업급여 잔여일수가 소정급여일수의 1/2 이상 남아 있었어요" },
  { id: "stable", label: "재취업한 직장에서 12개월 이상 계속 근무했어요" },
  { id: "salary", label: "재취업 후 월 급여가 574만원 미만이에요" },
  { id: "not_same", label: "이전 직장과 같은 사업주가 아니에요" },
  { id: "not_self", label: "자영업이면 1년 이상 사업을 유지했어요" },
];

const STEPS = [
  {
    title: "재취업한 날부터 12개월이 지났는지 확인하세요",
    desc: "조기재취업수당은 재취업일로부터 12개월이 지나야 청구할 수 있어요. 12개월 전에는 신청이 안 돼요. 12개월간 계속 근무해야 하니 중간에 퇴사하면 자격이 없어요.",
    tip: "12개월 = 재취업일 다음날부터 계산",
  },
  {
    title: "고용24에서 온라인 청구하세요",
    desc: "고용24(ei.go.kr)에 로그인해서 '조기재취업수당 청구'를 신청하면 돼요. 재직증명서가 필요하니 미리 발급받아두세요. 오프라인은 관할 고용센터에서도 가능해요.",
    link: { label: "고용24 바로가기", href: "https://www.ei.go.kr" },
  },
  {
    title: "심사 후 입금을 확인하세요",
    desc: "청구 후 14일 이내에 심사가 완료돼요. 심사가 통과되면 신청 시 입력한 계좌로 입금돼요. 고용24에서 처리 상태를 확인할 수 있어요.",
  },
];

const FAQS = [
  {
    q: "조기재취업수당은 얼마 받나요?",
    a: "미지급 잔여일수의 50%를 구직급여일액에 곱한 금액이에요. 예를 들어 잔여일수 100일, 일액 66,000원이면 100 x 50% x 66,000원 = 330만원이에요.",
  },
  {
    q: "재취업 후 12개월 전에 퇴사하면 못 받나요?",
    a: "네, 못 받아요. 12개월간 계속 근무해야 청구 자격이 생겨요. 중간에 퇴사하면 조기재취업수당을 받을 수 없어요.",
  },
  {
    q: "월 574만원 이상이면 정말 못 받나요?",
    a: "2026년 기준으로 재취업 후 월 보수가 574만원 이상이면 지급 대상에서 제외돼요. 이 기준은 매년 바뀔 수 있어요.",
  },
  {
    q: "자영업을 시작해도 받을 수 있나요?",
    a: "받을 수 있어요. 다만 사업자등록 후 1년 이상 사업을 영위해야 해요. 1년 전에 폐업하면 자격이 없어요.",
  },
  {
    q: "청구 기한이 있나요?",
    a: "재취업한 날부터 12개월 후에 청구할 수 있고, 그 후 1년 이내에 청구해야 해요. 기한을 넘기면 받을 수 없으니 잊지 마세요.",
  },
  {
    q: "이전 회사에 재입사해도 받을 수 있나요?",
    a: "같은 사업주에게 재고용된 경우에는 받을 수 없어요. 다른 회사에 취업해야 해요. 계열사라도 사업주가 다르면 괜찮아요.",
  },
];

const SOURCES = [
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용24", href: "https://www.ei.go.kr" },
  { name: "정부24", href: "https://www.gov.kr" },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격 조건", description: "실업급여를 받으려면 갖춰야 할 요건." },
  { slug: "실업급여-금액", title: "실업급여 금액과 기간", description: "받을 수 있는 금액과 기간 계산법." },
  { slug: "실업급여-자발적-퇴사-정당한-사유", title: "자발적 퇴사 정당한 사유", description: "자발적으로 퇴사해도 받을 수 있는 경우." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 조기재취업수당 · 잔여일수</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받다가 취업하면 남은 돈은?<br />
        조기재취업수당 조건과 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "실업급여를 반도 못 받고 취업했는데, 나머지는 그냥 날리는 건가요?"
      </p>
      <p style={body}>
        아니요. <strong>조기재취업수당</strong>으로 못 받은 실업급여의 절반을 한 번에 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조</a>에 근거한 제도예요.
        다만 재취업 후 <strong>12개월간 근무</strong>해야 청구할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>조기재취업수당, 나도 받을 수 있나요?</H2>
      <p style={body}>
        아래 요건을 모두 충족하면 받을 수 있어요.
        가장 중요한 건 12개월 계속 근무와 잔여일수 1/2 이상이에요.
      </p>

      <SectionBadge>자격 체크</SectionBadge>
      <EligibilityChecker items={ELIGIBILITY} />

      <GreenBox title="조기재취업수당 핵심">
        {"지급액 = 미지급 잔여일수 x 50% x 구직급여일액\n\n예시)\n소정급여일수 180일, 60일째 재취업\n잔여일수 120일 (180-60)\n120일의 1/2 이상 = 90일 이상 → 조건 충족\n\n120 x 50% x 66,000원 = 396만원\n\n재취업 후 12개월 근속 후 청구 가능\n청구 기한: 12개월 이후 1년 이내"}
      </GreenBox>

      <CategoryButton label="실업급여 정보" count={15} href="/category/실업급여" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>금액은 어떻게 계산하나요?</H2>
      <p style={body}>
        실업급여를 받다 남은 일수(잔여일수)의 50%를 한 번에 목돈으로 받는 거예요.
      </p>

      <BorderBox>
        <strong>조기재취업수당 계산 예시</strong>{"\n"}
        {"\n"}
        사례 1) 소정급여일수 180일, 50일째 재취업{"\n"}
        · 잔여일수: 130일{"\n"}
        · 130 x 50% x 66,000원 = 429만원{"\n"}
        {"\n"}
        사례 2) 소정급여일수 120일, 40일째 재취업{"\n"}
        · 잔여일수: 80일{"\n"}
        · 80 x 50% x 66,000원 = 264만원{"\n"}
        {"\n"}
        ※ 구직급여일액은 실업급여 수급 시 확인한 본인의 일액 기준
      </BorderBox>

      <Divider />

      <H2>청구는 이렇게 하세요</H2>
      <p style={body}>
        재취업 후 바로 신청하는 게 아니에요.
        12개월이 지나야 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 고용보험법 기준으로 작성했어요. 월 보수 기준, 구직급여일액 등은 매년 바뀔 수 있으니 최신 내용은 고용24 또는 고용센터에서 확인해 주세요." />
    </ArticleLayout>
  );
}
