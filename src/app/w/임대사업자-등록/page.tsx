"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 주택을 임대하려는데 임대사업자 등록을 해야 하는지, 어디에 어떻게 하는지 궁금한 상황.
// Q2. 세무서와 지자체 이중 등록 절차를 이해하고 등록 여부를 판단할 수 있어야 해요.
// Q3. 세무서(사업자등록) + 지자체(임대사업자 등록) 이중 등록, 의무임대기간(10년), 임대료 인상 제한(5%), 세제 혜택.
// Q4. GreenBox(핵심 요약) + Steps(등록 절차) + BorderBox(혜택 vs 의무) + Checklist(확인사항) + FAQ
// MAP-INTRO: 주택 임대하려는데 임대사업자 등록을 해야 하는지 어디서 하는지 궁금
// MAP-TYPE: 절차
// MAP-H2: 임대사업자 등록이란 > 등록 절차 > 혜택과 의무 > 등록 전 확인사항 > FAQ
// MAP-COMP: GreenBox > Steps > BorderBox > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const REG_STEPS = [
  { title: "세무서에 사업자등록", desc: "관할 세무서에 주택임대업 사업자등록을 하세요. 홈택스(hometax.go.kr)에서 온라인으로도 가능해요." },
  { title: "지자체에 임대사업자 등록", desc: "관할 시·군·구청에 민간임대주택 임대사업자 등록을 하세요. 렌트홈(renthome.go.kr)에서 온라인 신청 가능해요.", tip: "세무서와 지자체 양쪽 다 해야 해요" },
  { title: "의무사항 확인", desc: "의무임대기간(10년), 임대료 인상 제한(연 5%), 임대차 계약 신고 등 의무를 확인하세요." },
  { title: "임대차 계약 신고", desc: "임차인과 계약 후 30일 이내에 관할 시·군·구청에 임대차 계약을 신고해야 해요." },
];

const CHECK_ITEMS = [
  "임대할 주택이 본인 소유인지 확인했어요",
  "의무임대기간(10년) 유지 가능한지 판단했어요",
  "임대료 인상 제한(연 5%)을 감수할 수 있어요",
  "세무서 + 지자체 이중 등록이 필요하다는 걸 알고 있어요",
  "세제 혜택과 의무사항을 비교해봤어요",
];

const FAQS = [
  { q: "임대사업자 등록하면 세금 혜택이 뭐가 있나요?", a: "취득세 감면, 재산세 감면, 종합부동산세 합산 배제, 임대소득세 감면 등이 있어요. 의무를 다 지켜야 혜택을 유지할 수 있어요." },
  { q: "의무임대기간 10년 못 채우면요?", a: "받았던 세금 감면을 전부 토해내야 해요. 가산세까지 붙어서 오히려 손해가 될 수 있어요." },
  { q: "세무서와 지자체 모두 등록해야 하나요?", a: "네, 둘 다 해야 해요. 세무서 사업자등록은 세금 신고용이고, 지자체 등록은 임대사업자로서의 의무·혜택용이에요." },
  { q: "1주택만 임대해도 등록 가능한가요?", a: "네, 1주택도 등록 가능해요. 다만 세제 혜택이 2주택 이상일 때 더 크니까 등록 실익을 따져보세요." },
  { q: "임대료를 5% 넘게 올리면요?", a: "임대사업자 등록이 말소될 수 있어요. 말소되면 감면받은 세금을 전부 추징당해요." },
];

const REFS = [
  { category: "법령·기관", items: [
    { label: "민간임대주택에 관한 특별법", url: "https://www.law.go.kr/법령/민간임대주택에관한특별법" },
    { label: "렌트홈(임대등록시스템)", url: "https://www.renthome.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 임대 · 사업자등록</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임대사업자 등록, 어디서 어떻게 하나요?<br />
        세무서·지자체 이중 등록과 세제 혜택
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주택을 임대하려면 세무서와 지자체 양쪽에 등록해야 해요.
        <a href="https://www.law.go.kr/법령/민간임대주택에관한특별법" style={{ color: "#1D9E75" }}>민간임대주택법</a>에 따라
        세제 혜택을 받을 수 있지만, 의무임대기간(10년)과 임대료 인상 제한(연 5%)을 지켜야 해요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>임대사업자 등록이란 뭔가요?</H2>
      <p style={body}>주택을 임대하면서 세금 혜택을 받기 위해 세무서(사업자등록)와 지자체(임대사업자 등록)에 이중으로 등록하는 거예요. 등록하면 취득세·재산세·종부세 감면을 받을 수 있지만 10년간 의무를 지켜야 해요.</p>
      <GreenBox title="핵심 요약">등록: 세무서 + 지자체 이중 등록 | 혜택: 취득세·재산세·종부세 감면 | 의무: 10년 의무임대, 임대료 연 5% 인상 제한 | 위반 시: 감면 세금 전액 추징 + 가산세</GreenBox>
      <Divider />
      <H2>등록 절차가 어떻게 되나요?</H2>
      <p style={body}>세무서와 지자체 양쪽에 모두 등록해야 해요. 순서대로 진행하세요.</p>
      <Steps steps={REG_STEPS} />
      <Divider />
      <H2>혜택과 의무를 비교하면요?</H2>
      <p style={body}>세금 혜택이 크지만 10년간 의무가 따라요. 의무를 못 지키면 혜택보다 손해가 커질 수 있어요.</p>
      <BorderBox title="혜택 vs 의무">혜택: 취득세 감면(최대 50%), 재산세 감면(최대 75%), 종부세 합산 배제, 임대소득세 감면 | 의무: 10년 의무임대, 임대료 연 5% 인상 제한, 임대차 계약 신고, 임차인 퇴거 제한</BorderBox>
      <Divider />
      <H2>등록 전에 확인할 것들</H2>
      <p style={body}>10년 의무를 지킬 수 있는지 신중히 판단하세요.</p>
      <Checklist items={CHECK_ITEMS} />
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 민간임대주택법 정보를 바탕으로 작성됐어요. 세제 혜택은 매년 변경될 수 있으니 세무사에 확인하세요." />
    </div>
  );
}
