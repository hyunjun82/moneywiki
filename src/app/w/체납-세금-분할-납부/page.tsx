"use client";

// Q1. 세금을 체납한 사업자·개인이 한꺼번에 못 내서 분할납부를 알아보는 상황
// Q2. 분할납부 신청 조건을 확인하고, 홈택스에서 신청서를 제출해 분납을 승인받는다
// Q3. 신청 요건(1,000만원 초과), 분할 한도(2,000만원 이하: 초과분, 2,000만원 초과: 50%), 신청 기한(납부기한 3일 전), 가산세 면제 조건
// Q4. Steps(신청 절차) + GreenBox(분할 한도 요약) + BorderBox(가산세 규정) + FAQ
// MAP-INTRO: 세금이 한꺼번에 나왔는데 당장 다 낼 여력이 없죠
// MAP-TYPE: 절차
// MAP-H2: 분할납부 요건 > 얼마까지 나눠 낼 수 있나 > 신청 절차 > 가산세는 어떻게 되나 > FAQ
// MAP-COMP: GreenBox > BorderBox > Steps > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "납부기한 3일 전까지 신청서를 제출하세요",
    desc: "홈택스에 로그인한 후 '신청/제출 > 분할납부 신청'으로 들어가세요. 관할 세무서에 직접 방문해서 서면으로 제출해도 되고요. 세무서장이 기한 3일 전까지 제출이 어렵다고 인정하면 기한 당일까지도 받아줘요.",
    tip: "홈택스 경로: 신청/제출 > 일반세무서류 신청 > 분할납부",
  },
  {
    title: "분할 금액과 납부 일정을 기재하세요",
    desc: "신청서에 1차 납부 금액과 2차 납부 금액, 2차 납부 예정일을 적어야 해요. 2차 납부 기한은 원래 납부기한으로부터 2개월 이내로 정해야 하고요. 금액 배분은 법정 기준 이내에서 자유롭게 정할 수 있어요.",
    tip: "2차 납부일은 납부기한 + 2개월 이내",
  },
  {
    title: "승인 후 1차분을 먼저 납부하세요",
    desc: "세무서에서 분할납부를 승인하면 1차분은 원래 납부기한까지, 2차분은 신청서에 적은 날짜까지 내면 돼요. 승인 여부는 홈택스 '진행상황 조회'에서 확인할 수 있어요. 거절되는 경우는 거의 없어요.",
    tip: "승인 후 각 기한 내 납부하면 가산세 면제",
  },
];

const FAQS = [
  { q: "세금이 500만원인데 분할납부가 되나요?", a: "안 돼요. 분할납부는 납부할 세금이 1,000만원을 초과하는 경우에만 신청할 수 있어요. 1,000만원 이하라면 납부기한 연장(최대 9개월)을 신청하는 방법이 있어요." },
  { q: "분할납부하면 가산세가 안 붙나요?", a: "네, 승인된 분할납부 세액에 대해서는 납부기한이 지나지 않은 것으로 보기 때문에 가산세가 안 붙어요. 단, 2차 납부 기한까지도 못 내면 그때부터 납부지연 가산세(하루 0.022%)가 붙어요." },
  { q: "부가세도 분할납부가 되나요?", a: "네, 부가가치세·종합소득세·법인세 등 대부분의 국세가 분할납부 대상이에요. 단, 원천징수 세액은 분할납부 대상에서 제외되는 경우가 있으니 세무서에 확인해 보세요." },
  { q: "이미 체납된 세금도 분할납부가 되나요?", a: "체납 세금은 '분할납부'가 아니라 '분납 계획서'를 제출하는 방식으로 진행해요. 관할 세무서에 분납 계획서를 내면 세무서장이 승인 여부를 결정해요. 영세 개인사업자(연 매출 8,000만원 이하)는 우선 분납이 가능하고요." },
  { q: "지방세도 같은 방식으로 분할납부하나요?", a: "지방세(재산세·취득세 등)는 위택스에서 별도로 신청해야 해요. 재산세는 250만원 초과 시 분할납부가 가능하고, 납부기한 다음 달 말일까지 나눠 낼 수 있어요. 국세와 기준이 다르니 주의하세요." },
  { q: "신청이 거절되는 경우도 있나요?", a: "거의 없어요. 법정 요건(1,000만원 초과, 기한 내 신청)만 충족하면 세무서장이 승인해 줘요. 다만, 세무조사 중이거나 사기 혐의가 있는 경우에는 거절될 수 있어요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "국세징수법 제21조 (분할납부)", url: "https://www.law.go.kr/법령/국세징수법" },
    { label: "국세기본법 제45조의3 (기한연장)", url: "https://www.law.go.kr/법령/국세기본법" },
  ]},
  { category: "신청", items: [
    { label: "국세청 홈택스", url: "https://www.hometax.go.kr" },
  ]},
];

const RELATED = [
  { title: "2월 세금 신고 납부 일정", slug: "2월-세금-신고-납부-일정", description: "" },
  { title: "부가세 환급 신청", slug: "부가세-환급-신청", description: "" },
  { title: "원천징수 신고 방법", slug: "원천징수-신고-방법", description: "" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금·납부</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        체납 세금, 나눠서 낼 수 있을까?{"\n"}
        <span style={{ fontSize: 19, fontWeight: 500, color: "#374151" }}>분할납부 조건과 신청 방법</span>
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        세금이 한꺼번에 나왔는데 당장 다 낼 여력이 없죠.
        이럴 때 분할납부 제도를 이용하면 세금을 두 번에 나눠서 낼 수 있어요.
        납부할 세금이 1,000만원을 초과하면 신청할 수 있고, 승인되면 가산세 걱정 없이 2개월 여유를 얻을 수 있어요.
      </p>
      <Divider />

      <H2>분할납부, 누가 신청할 수 있나요?</H2>
      <p style={body}>
        분할납부는 납부할 세금이 1,000만원을 초과하는 경우에 신청할 수 있어요.
        종합소득세, 법인세, 부가가치세 등 대부분의 국세가 대상이에요.
        개인사업자든 법인이든 상관없이, 금액 조건만 맞으면 누구나 신청할 수 있죠.
      </p>
      <GreenBox title="분할납부 핵심 조건">
        납부세액 1,000만원 초과 시 신청 가능.
        2,000만원 이하 → 1,000만원 초과분만 분할.
        2,000만원 초과 → 세액의 50% 이내 분할.
        2차 납부 기한: 원래 납부기한으로부터 2개월 이내.
      </GreenBox>
      <p style={body}>
        예를 들어 납부세액이 1,500만원이면 500만원만 분할할 수 있고, 3,000만원이면 최대 1,500만원까지 나눠 낼 수 있어요.
        1차분은 원래 기한에, 2차분은 2개월 이내에 납부하면 돼요.
      </p>
      <Divider />

      <ArticleAd position="mid" />

      <H2>얼마까지 나눠 낼 수 있나요?</H2>
      <p style={body}>
        분할 한도는 납부세액 규모에 따라 달라져요.
        여기서 헷갈리는 부분이 "1,000만원 초과분"과 "세액의 50%"인데요.
        간단하게 정리하면 이래요.
      </p>
      <SectionBadge>분할 한도</SectionBadge>
      <BorderBox title="납부세액별 분할 가능 금액">
        <p style={{ ...body, marginBottom: 6 }}><strong>1,000만원 이하</strong>: 분할납부 불가</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>1,000만원 초과~2,000만원 이하</strong>: 1,000만원 초과 금액만 분할 (예: 1,800만원 → 800만원 분할)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>2,000만원 초과</strong>: 세액의 50% 이내 분할 (예: 4,000만원 → 2,000만원 분할)</p>
      </BorderBox>
      <p style={body}>
        납부기한 연장과는 별개 제도예요.
        분할납부가 안 되는 금액이라면 <a href="/w/부가세-환급-신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>납부기한 연장</a>(최대 9개월)을 신청하는 방법도 있으니 세무서에 문의해 보세요.
      </p>
      <Divider />

      <H2>홈택스에서 어떻게 신청하나요?</H2>
      <p style={body}>
        신청은 홈택스 온라인으로 할 수도 있고, 관할 세무서에 직접 방문해도 돼요.
        핵심은 납부기한 3일 전까지 신청서를 내야 한다는 거예요.
        기한을 놓치면 분할납부 자체가 불가능해지니까 미리미리 준비하세요.
      </p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <p style={body}>
        신청서 양식은 홈택스에서 자동으로 생성돼요.
        별도 첨부 서류는 필요 없고, 신청서만 제출하면 돼요.
      </p>
      <Divider />

      <H2>가산세는 어떻게 되나요?</H2>
      <p style={body}>
        분할납부가 승인되면 2차 납부 기한까지는 가산세가 안 붙어요.
        이게 분할납부의 가장 큰 장점이에요.
        단, 2차 기한까지도 못 내면 그때부터 납부지연 가산세가 붙기 시작해요.
      </p>
      <BorderBox title="가산세 규정">
        <p style={{ ...body, marginBottom: 6 }}>분할납부 승인 → 2차 기한까지 가산세 면제</p>
        <p style={{ ...body, marginBottom: 6 }}>2차 기한 초과 → 납부지연 가산세 하루 0.022% (연 약 8%)</p>
        <p style={{ ...body, marginBottom: 6 }}>무신고·과소신고 가산세와는 별개 (신고는 기한 내 해야 함)</p>
      </BorderBox>
      <p style={body}>
        체납 상태에서 자진 분납을 하는 경우에는 세무서와 협의해서 분납 계획서를 제출해야 해요.
        영세 개인사업자(연 매출 8,000만원 이하)는 분납 승인이 더 잘 나오는 편이에요.
      </p>
      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 국세징수법·국세기본법을 바탕으로 작성했어요. 개별 사안은 관할 세무서나 세무사에게 확인하세요." />

      <CategoryButton label="세금·납부" href="/categories/tax" />
      <RelatedArticles items={RELATED} />
    </div>
  );
}
