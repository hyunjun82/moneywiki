"use client";

// Q1. 투자 목적으로 산 빌라(비거주)를 팔려는데 양도소득세가 얼마나 나올지, 비과세 받을 수 있는지 궁금한 상황
// Q2. 비과세 적용 불가 여부를 확인하고, 양도소득세 계산 구조와 절세 방법을 파악한다
// Q3. 1세대1주택 비과세 요건(2년 보유+거주), 조정대상지역 거주 의무, 다주택 중과세율, 장기보유특별공제, 양도세 세율
// Q4. GreenBox(비과세 불가 결론) + BorderBox(세율 구간) + Steps(신고 절차) + Checklist(절세 체크) + FAQ
// MAP-INTRO: 투자용으로 산 빌라라 한 번도 살지 않았는데, 팔 때 세금이 얼마나 나올지 걱정되죠
// MAP-TYPE: 절차
// MAP-H2: 미거주 빌라 비과세 가능한가 > 양도세는 얼마나 나오나 > 절세 방법 > 신고 절차 > FAQ
// MAP-COMP: GreenBox > BorderBox > Checklist > Steps > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "1세대 1주택인지 확인 / 다주택이면 중과세율 적용",
  "2년 이상 보유했는지 확인 / 미달 시 단기양도 중과",
  "장기보유특별공제 적용 여부 / 비거주 시 보유 기간만 적용",
  "조정대상지역 해제 여부 / 해제 후 취득 시 거주 의무 없음",
  "양도차익이 12억원 이하인지 / 초과분만 과세",
  "필요경비(취득세·중개수수료 등) 공제 누락 없이 반영",
];

const STEPS_DATA = [
  {
    title: "양도일이 속하는 달의 말일부터 2개월 이내 신고하세요",
    desc: "빌라를 팔고 잔금을 받은 날이 양도일이에요. 그 달의 말일부터 2개월 이내에 홈택스에서 양도소득세 예정신고를 해야 해요. 예를 들어 3월 15일에 팔았다면 5월 31일까지 신고해야 하죠.",
    tip: "기한 초과 시 무신고 가산세 20%",
  },
  {
    title: "홈택스에서 양도소득세 신고서를 작성하세요",
    desc: "홈택스 > 세금신고 > 양도소득세 > 예정신고로 들어가서 취득가액, 양도가액, 필요경비를 입력하면 세액이 자동 계산돼요. 매매계약서·등기부등본·취득세 영수증을 미리 준비해 두면 편해요.",
    tip: "필요경비: 취득세, 중개수수료, 법무사 비용 등",
  },
  {
    title: "산출세액을 납부하세요",
    desc: "신고가 완료되면 납부서가 생성돼요. 홈택스에서 바로 납부하거나 은행 이체로 낼 수 있어요. 세금이 1,000만원을 넘으면 2개월 이내 분할납부도 가능하고요.",
    tip: "1,000만원 초과 시 분할납부 가능",
  },
];

const FAQS = [
  { q: "투자용 빌라인데 비과세 받을 수 있나요?", a: "1세대 1주택이고 2년 이상 보유했어도, 조정대상지역에서 취득한 주택은 2년 거주 요건을 충족해야 비과세돼요. 한 번도 살지 않았다면 비과세는 불가능하고 양도소득세를 내야 해요." },
  { q: "비거주인데 장기보유특별공제는 받을 수 있나요?", a: "보유 기간에 대한 공제는 받을 수 있어요. 3년 이상 보유 시 연 2%씩 최대 30%까지 공제돼요. 다만 거주 기간 공제(연 8%, 최대 40%)는 거주하지 않았으니 적용이 안 돼요. 거주+보유 합산 최대 80% 공제인데, 비거주는 보유 공제 30%가 최대예요." },
  { q: "다주택자인데 빌라를 팔면 세율이 얼마인가요?", a: "2주택자는 기본세율에 20%p 중과, 3주택 이상은 30%p 중과돼요. 기본세율이 최대 45%이니까 중과 시 최대 75%까지 갈 수 있어요. 다만 2026년 현재 다주택 중과 유예 여부를 정부 발표에서 꼭 확인하세요." },
  { q: "조정대상지역이 해제된 곳은 거주 안 해도 되나요?", a: "조정대상지역 해제 후에 취득한 주택은 거주 요건이 없어요. 2년 보유만 하면 비과세가 가능하죠. 하지만 지정 기간 중에 취득한 주택은 해제됐더라도 거주 요건이 유지돼요." },
  { q: "양도차익이 적으면 세금도 적나요?", a: "네, 양도소득세는 양도차익(판 가격 - 산 가격 - 경비)에 대해 과세해요. 차익이 1,400만원 이하면 세율 6%, 차익이 클수록 세율이 올라가서 최대 45%예요. 필요경비를 꼼꼼히 반영하면 차익이 줄어들어요." },
  { q: "빌라 취득 후 1년 안에 팔면요?", a: "보유 기간 1년 미만이면 양도소득세율이 70%예요. 1년 이상~2년 미만은 60%이고요. 단기 매매 중과세율이 적용되니까, 최소 2년은 보유하는 게 세금 면에서 훨씬 유리해요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "소득세법 제89조 (비과세 양도소득)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "소득세법 제95조 (양도소득금액)", url: "https://www.law.go.kr/법령/소득세법" },
  ]},
  { category: "신고", items: [
    { label: "국세청 홈택스 - 양도소득세", url: "https://www.hometax.go.kr" },
  ]},
];

const RELATED = [
  { title: "양도소득세 계산 세율 비과세", slug: "양도소득세-계산-세율-비과세", description: "" },
  { title: "1세대 1주택 비과세 요건", slug: "1세대-1주택-양도소득세-비과세-요건", description: "" },
  { title: "취득세 계산 세율 납부", slug: "취득세-계산-세율-납부", description: "" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산·세금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        투자용 빌라, 안 살았는데 세금은?{"\n"}
        <span style={{ fontSize: 19, fontWeight: 500, color: "#374151" }}>미거주 양도소득세 계산과 절세법</span>
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        투자용으로 산 빌라라 한 번도 살지 않았는데, 팔 때 세금이 얼마나 나올지 걱정되죠.
        결론부터 말하면, 거주하지 않은 주택은 1세대 1주택 비과세를 받기 어려워요.
        양도소득세를 내야 하는데, 세율·장기보유특별공제·다주택 중과 여부에 따라 금액이 크게 달라져요.
      </p>
      <Divider />

      <H2>미거주 빌라, 비과세 가능한가요?</H2>
      <p style={body}>
        1세대 1주택 비과세를 받으려면 2년 이상 보유가 기본이에요.
        여기에 조정대상지역에서 취득한 주택은 2년 거주 요건까지 충족해야 하고요.
        투자용으로 사서 한 번도 살지 않았다면, 조정대상지역 취득 주택은 비과세가 불가능해요.
      </p>
      <GreenBox title="미거주 빌라 비과세 결론">
        조정대상지역 취득 + 미거주 → 비과세 불가.
        비조정대상지역 취득 + 2년 보유 → 비과세 가능 (거주 불요).
        다주택자 → 비과세 자체가 불가 (1세대 1주택 아니므로).
        <a href="/w/1세대-1주택-양도소득세-비과세-요건" style={{ color: "#085041", textDecoration: "underline" }}>비과세 요건 상세 확인하기</a>
      </GreenBox>
      <p style={body}>
        비조정대상지역에서 취득한 주택이라면 거주하지 않아도 2년 보유만으로 비과세가 가능해요.
        조정대상지역 해제 시점과 취득 시점의 관계를 꼭 확인하세요.
      </p>
      <Divider />

      <ArticleAd position="mid" />

      <H2>양도세는 얼마나 나오나요?</H2>
      <p style={body}>
        양도소득세는 양도차익(매도가 - 취득가 - 필요경비)에 대해 누진세율로 과세해요.
        <a href="/w/양도소득세-계산-세율-비과세" style={{ color: "#1D9E75", textDecoration: "underline" }}>기본 세율</a>은 6~45%이고, 보유 기간이 짧거나 다주택이면 중과돼요.
      </p>
      <SectionBadge>양도소득세 세율</SectionBadge>
      <BorderBox title="2026년 양도소득세 기본세율">
        <p style={{ ...body, marginBottom: 6 }}>1,400만원 이하: 6%</p>
        <p style={{ ...body, marginBottom: 6 }}>1,400만~5,000만원: 15%</p>
        <p style={{ ...body, marginBottom: 6 }}>5,000만~8,800만원: 24%</p>
        <p style={{ ...body, marginBottom: 6 }}>8,800만~1.5억원: 35%</p>
        <p style={{ ...body, marginBottom: 6 }}>1.5억~3억원: 38%</p>
        <p style={{ ...body, marginBottom: 6 }}>3억~5억원: 40%</p>
        <p style={{ ...body, marginBottom: 6 }}>5억~10억원: 42%</p>
        <p style={{ ...body, marginBottom: 6 }}>10억원 초과: 45%</p>
      </BorderBox>
      <p style={body}>
        여기에 1년 미만 보유는 70%, 1~2년 보유는 60%의 단기 중과세율이 적용돼요.
        다주택자는 기본세율에 20~30%p가 추가되고요.
      </p>
      <Divider />

      <H2>절세할 수 있는 방법은?</H2>
      <p style={body}>
        비과세가 안 되더라도 세금을 줄일 수 있는 방법은 있어요.
        장기보유특별공제, 필요경비 공제, 매도 시기 조절이 핵심이에요.
        아래 항목을 하나씩 확인해 보세요.
      </p>
      <SectionBadge>절세 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        장기보유특별공제는 비거주 시에도 보유 기간 공제(연 2%, 최대 30%)는 받을 수 있어요.
        10년 이상 보유하면 양도차익의 30%를 공제받을 수 있으니 꽤 큰 금액이에요.
      </p>
      <Divider />

      <H2>신고는 어떻게 하나요?</H2>
      <p style={body}>
        빌라를 팔고 나면 양도소득세 예정신고를 해야 해요.
        기한은 양도일이 속하는 달의 말일부터 2개월 이내예요.
        홈택스에서 온라인으로 신고하거나 세무사에게 맡길 수 있어요.
      </p>
      <SectionBadge>신고 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 다주택 중과 유예·조정대상지역 변동 등은 수시로 바뀌니 국세청이나 세무사에게 확인하세요." />

      <CategoryButton label="부동산·세금" href="/categories/realestate" />
      <RelatedArticles items={RELATED} />
    </div>
  );
}
