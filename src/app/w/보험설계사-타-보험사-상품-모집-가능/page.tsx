"use client";

// Q1. 생명보험 설계사인데 손해보험 상품도 팔 수 있는지, 타 보험사 상품을 모집할 수 있는지 궁금한 상황.
// Q2. 보험업법상 교차모집 규정을 이해하고 타사 상품 판매 가능 여부를 판단할 수 있어야 해요.
// Q3. 보험업법 교차모집(생보↔손보 가능하나 제한적), 전속설계사 vs GA(법인보험대리점), 겸업 시 등록 요건.
// Q4. GreenBox(결론 요약) + BorderBox(전속 vs GA 비교) + Steps(교차모집 등록 절차) + Checklist(확인사항) + FAQ
// MAP-INTRO: 생명보험 설계사인데 손해보험 상품도 팔 수 있는지 궁금
// MAP-TYPE: 자격확인
// MAP-H2: 타사 상품 모집 가능한가요 > 전속 vs GA 차이 > 교차모집 요건 > 확인할 점 > FAQ
// MAP-COMP: GreenBox > BorderBox > Steps > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const CROSS_STEPS = [
  { title: "소속 보험사에 교차모집 의사 전달", desc: "전속 설계사라면 소속 보험사에 타 보험종목 교차모집을 하겠다고 알려야 해요." },
  { title: "교차모집 위탁 계약 체결", desc: "교차모집 대상 보험사와 위탁 계약을 체결해요. 소속사 동의가 필요해요." },
  { title: "교차모집 교육 이수", desc: "해당 보험 종목에 대한 교육을 이수해야 해요. 생보 설계사가 손보를 팔려면 손보 교육이 필요해요." },
  { title: "금융감독원 등록", desc: "교차모집 설계사로 금융감독원에 등록 완료하면 판매를 시작할 수 있어요." },
];

const CHECK_ITEMS = [
  "전속 설계사인지 GA 소속인지 확인했어요",
  "소속사에서 교차모집을 허용하는지 확인했어요",
  "타 보험종목 교육 이수 요건을 확인했어요",
  "교차모집 가능한 상품 범위를 확인했어요",
];

const FAQS = [
  { q: "생보 설계사가 손보 상품도 팔 수 있나요?", a: "교차모집 제도를 통해 가능해요. 다만 소속 보험사 동의, 교육 이수, 금감원 등록이 필요해요. 아무 상품이나 되는 건 아니에요." },
  { q: "전속 설계사가 다른 보험사 상품을 팔 수 있나요?", a: "원칙적으로 안 돼요. 전속 설계사는 소속사 상품만 판매할 수 있어요. 교차모집은 예외적으로 다른 종목(생보↔손보)을 1개사까지 허용하는 거예요." },
  { q: "GA(법인보험대리점) 소속이면 여러 회사 상품을 팔 수 있나요?", a: "네, GA는 복수 보험사 상품을 판매할 수 있어요. GA에 소속되면 다양한 보험사 상품을 비교해서 판매 가능해요." },
  { q: "교차모집 시 수수료는 어떻게 되나요?", a: "교차모집 상품의 수수료는 해당 보험사 기준으로 지급돼요. 소속사 수수료와 별개로 받을 수 있어요." },
  { q: "교차모집 등록 없이 타사 상품 권유하면요?", a: "무등록 모집으로 보험업법 위반이에요. 과태료나 등록 취소 등 제재를 받을 수 있어요." },
];

const REFS = [
  { category: "법령·기관", items: [
    { label: "보험업법", url: "https://www.law.go.kr/법령/보험업법" },
    { label: "금융감독원", url: "https://www.fss.or.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험 · 설계사</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보험설계사가 타 보험사 상품을 팔 수 있나요?<br />
        교차모집 조건과 전속 vs GA 차이
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        생명보험 설계사인데 고객이 손해보험도 물어봐요. 타 보험사 상품을 팔 수 있을까요?
        <a href="https://www.law.go.kr/법령/보험업법" style={{ color: "#1D9E75" }}>보험업법</a>에서 교차모집 제도를 두고 있어요.
        전속 설계사와 GA 소속에 따라 범위가 달라요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>타사 상품 모집이 가능한가요?</H2>
      <p style={body}>전속 설계사는 원칙적으로 소속사 상품만 판매해요. 다만 교차모집 제도를 통해 다른 종목(생보↔손보) 1개사까지 예외적으로 판매할 수 있어요. GA 소속이면 복수 보험사 상품을 자유롭게 판매할 수 있어요.</p>
      <GreenBox title="핵심 정리">전속 설계사: 소속사 상품만 + 교차모집 1개사(다른 종목) 가능 | GA 소속: 복수 보험사 상품 판매 가능 | 교차모집: 소속사 동의 + 교육 이수 + 금감원 등록 필요</GreenBox>
      <Divider />
      <H2>전속 설계사와 GA의 차이가 뭔가요?</H2>
      <p style={body}>전속 설계사는 하나의 보험사에 소속돼서 그 회사 상품만 파는 거예요. GA(법인보험대리점)는 여러 보험사와 계약해서 다양한 상품을 비교 판매해요.</p>
      <BorderBox title="전속 vs GA 비교">전속 설계사: 1개사 상품만, 안정적 수수료, 교차모집 제한적 | GA 소속: 복수 보험사 상품, 상품 비교 판매 가능, 수수료 구조 다양</BorderBox>
      <Divider />
      <H2>교차모집하려면 어떤 절차가 필요한가요?</H2>
      <p style={body}>전속 설계사가 교차모집을 하려면 소속사 동의부터 금감원 등록까지 절차가 있어요.</p>
      <Steps steps={CROSS_STEPS} />
      <Divider />
      <H2>교차모집 전에 확인할 것들</H2>
      <p style={body}>무등록으로 타사 상품을 권유하면 보험업법 위반이에요. 아래 항목을 먼저 확인하세요.</p>
      <Checklist items={CHECK_ITEMS} />
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 보험업법 정보를 바탕으로 작성됐어요. 소속 보험사에 따라 교차모집 규정이 다를 수 있으니 직접 확인하세요." />
    </div>
  );
}
