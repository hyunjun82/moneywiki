"use client";

// Q1: 다단계 판매원이나 보험설계사가 퇴직 후 실업급여를 받을 수 있는지 궁금한 상황
// Q2: 고용보험 가입 여부를 확인하고 실업급여 수급 가능성 판단
// Q3: 특수형태근로종사자 고용보험 적용(2021~), 보험설계사 노무제공자 분류, 이직확인서, 자발적 이직 시 수급 제한
// Q4: GreenBox(핵심 결론) + Steps(확인·신청 절차) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "고용보험 가입 여부 확인", desc: "고용보험 홈페이지(ei.go.kr)에서 피보험자 자격을 확인해요. 2021년 7월 이후 보험설계사는 특수형태근로종사자로 고용보험이 자동 적용돼요.", tip: "고용보험 조회: ei.go.kr → 개인서비스 → 피보험자격 이력" },
  { title: "비자발적 이직인지 확인", desc: "계약 해지 사유가 중요해요. 회사의 일방적 해지, 수당 미지급, 부당 대우 등은 비자발적 이직으로 인정돼요. 본인이 스스로 그만둔 경우는 원칙적으로 수급이 어려워요." },
  { title: "이직확인서 요청", desc: "소속 회사(보험사, 다단계 업체)에 이직확인서 발급을 요청해요. 회사가 거부하면 고용센터에 직접 신고할 수 있어요." },
  { title: "관할 고용센터에서 실업급여 신청", desc: "이직일 다음 날부터 12개월 이내에 고용센터를 방문해서 수급자격을 인정받고 실업급여를 신청해요.", tip: "고용24(work24.go.kr)에서 온라인 신청 후 방문" },
];

const CHECKLIST = [
  "고용보험 가입 기간 180일 이상인지 확인",
  "비자발적 이직 사유에 해당하는지 확인",
  "이직확인서 발급 요청 (회사 거부 시 고용센터 신고)",
  "이직일로부터 12개월 이내 신청 기한 준수",
  "구직활동 의사와 능력 보유 (취업 의지 필수)",
];

const FAQS = [
  { q: "보험설계사도 실업급여를 받을 수 있나요?", a: "2021년 7월부터 보험설계사는 특수형태근로종사자로 고용보험이 적용돼요. 고용보험 가입 기간 180일 이상이고 비자발적 이직이면 실업급여를 받을 수 있어요." },
  { q: "다단계 판매원도 해당되나요?", a: "다단계 판매원은 노무제공자에 해당할 수 있어요. 고용보험 적용 대상인지는 계약 형태에 따라 다르니 고용보험 피보험자격을 먼저 확인하세요." },
  { q: "자발적으로 그만뒀으면 실업급여를 못 받나요?", a: "원칙적으로 어렵지만, 수당 미지급, 부당 대우, 건강상 이유 등 정당한 이직 사유가 있으면 자발적 이직이라도 수급이 가능할 수 있어요." },
  { q: "고용보험료는 누가 내나요?", a: "사업주(보험사, 다단계 업체)와 노무제공자가 각각 절반씩 부담해요. 보험료는 보수의 약 1.6%예요." },
  { q: "실업급여 금액은 얼마나 되나요?", a: "이직 전 3개월 평균 보수의 60%예요. 상한액은 1일 66,000원, 하한액은 최저임금의 80%예요." },
];

const REFERENCES = [
  { category: "법령·안내", items: [
    { label: "고용보험법 (특수형태근로종사자)", url: "https://www.law.go.kr/법령/고용보험법" },
    { label: "고용24 실업급여 안내", url: "https://www.work24.go.kr" },
  ]},
];

const RELATED = [
  { slug: "실업급여-수급-조건", title: "실업급여 수급 조건", description: "실업급여 수급 요건 전체 정리예요." },
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "자발적 퇴사도 받을 수 있는 경우예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        다단계·보험설계사도 실업급여 받을 수 있을까?<br />
        특수형태근로자 고용보험 적용과 신청법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보험설계사나 다단계 판매원으로 일하다 그만뒀는데 실업급여를 받을 수 있는 건지 궁금하죠?
        2021년 7월부터 보험설계사 등 특수형태근로종사자도 고용보험이 적용돼요.
        고용보험 가입 기간 180일 이상이고 비자발적 이직이면 실업급여를 받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>특수형태근로자 고용보험 적용 범위</H2>
      <p style={body}>2021년 7월부터 보험설계사, 학습지교사, 골프장캐디, 배달원 등 특수형태근로종사자에게 고용보험이 확대 적용됐어요.</p>
      <GreenBox title="핵심">
        보험설계사 → 2021.7부터 고용보험 자동 적용<br />
        고용보험 180일 이상 + 비자발적 이직 → 실업급여 수급 가능<br />
        보험료: 사업주 + 본인 각각 절반 부담
      </GreenBox>

      <CategoryButton label="고용·실업급여 정보" count={5} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>실업급여 신청 절차</H2>
      <p style={body}>고용보험 가입 여부를 먼저 확인하고, 이직확인서를 받아서 고용센터에 신청하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />

      <H2>신청 전 체크리스트</H2>
      <SectionBadge>실업급여 신청 확인사항</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 고용보험법을 바탕으로 작성됐어요. 특수형태근로종사자 범위와 실업급여 금액은 변경될 수 있으니 고용24에서 확인해보세요." />
    </ArticleLayout>
  );
}
