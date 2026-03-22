"use client";

// Q1. 채무자가 돈을 안 갚아서 재산을 압류하고 경매로 받으려는데 절차를 모르는 상황.
// Q2. 재산 압류 → 경매 신청 → 배당까지의 전체 절차를 파악하고 법원에 신청할 수 있어야 해요.
// Q3. 집행권원(판결문 등) 확보 → 강제집행 신청 → 부동산 경매 또는 채권 압류·추심 → 배당. 소멸시효 10년.
// Q4. Steps(전체 절차) + GreenBox(핵심 요약) + DocTable(필요 서류) + BorderBox(압류 대상별 방법) + FAQ
// MAP-INTRO: 채무자가 돈을 안 갚아서 재산을 압류하고 경매로 받고 싶은데 어떻게 하는지 모름
// MAP-TYPE: 절차
// MAP-H2: 전체 절차 흐름 > 집행권원 확보 > 압류 대상별 방법 > 필요 서류 > FAQ
// MAP-COMP: GreenBox > Steps > BorderBox > DocTable > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, DocTable, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const MAIN_STEPS = [
  { title: "집행권원 확보", desc: "판결문, 화해조서, 공정증서 등 법원에서 인정한 채권 증거를 확보하세요. 소송이 필요하면 먼저 민사소송을 진행해야 해요." },
  { title: "집행문 부여 신청", desc: "판결을 받은 법원에 집행문 부여를 신청하세요. 판결문에 '집행할 수 있다'는 부기를 받는 절차예요." },
  { title: "강제집행 신청", desc: "채무자의 재산(부동산, 예금, 급여 등)을 대상으로 법원에 강제집행을 신청하세요.", tip: "채무자 재산이 뭐가 있는지 모르면 재산조회를 먼저 하세요" },
  { title: "압류 결정", desc: "법원이 압류 결정을 내리면 채무자는 해당 재산을 처분할 수 없어요." },
  { title: "경매 또는 추심", desc: "부동산이면 경매로 매각, 예금이면 추심(인출)으로 채권을 회수해요." },
  { title: "배당 수령", desc: "경매 대금에서 채권자 순위에 따라 배당받아요. 선순위 채권자가 먼저 받아요." },
];

const DOCS = [
  { name: "판결문 정본 + 집행문", required: true, where: "법원 발급" },
  { name: "송달증명서", required: true, where: "법원 발급" },
  { name: "강제집행 신청서", required: true, where: "법원 양식" },
  { name: "채무자 재산 관련 자료", required: true, where: "등기부등본, 금융거래정보 등" },
  { name: "인지대 및 송달료", required: true, where: "법원 납부" },
];

const FAQS = [
  { q: "판결문 없이 바로 압류할 수 있나요?", a: "원칙적으로 안 돼요. 집행권원(판결문, 공정증서 등)이 있어야 강제집행이 가능해요. 공정증서에 집행인낙 약정이 있으면 소송 없이 바로 가능해요." },
  { q: "채무자 재산이 뭔지 모르면요?", a: "법원에 재산명시·재산조회 신청을 하면 채무자의 부동산, 예금, 차량 등을 조회할 수 있어요. 채무자가 거짓 신고하면 형사처벌돼요." },
  { q: "예금 압류는 어떻게 하나요?", a: "법원에 채권압류 및 추심명령을 신청하세요. 법원이 은행에 압류 결정을 통지하면 채무자가 인출할 수 없고, 채권자가 추심할 수 있어요." },
  { q: "경매 신청 비용이 얼마예요?", a: "부동산 경매 신청 시 인지대 + 송달료 + 경매예납금(감정비 등)이 필요해요. 보통 100~200만원 정도예요. 나중에 경매 대금에서 돌려받아요." },
  { q: "소멸시효가 있나요?", a: "판결에 의한 채권은 10년이에요. 10년 안에 강제집행을 하지 않으면 시효가 만료돼요. 시효 중단 사유(가압류, 재소 등)를 활용하세요." },
];

const REFS = [
  { category: "법령·기관", items: [
    { label: "민사집행법", url: "https://www.law.go.kr/법령/민사집행법" },
    { label: "대한민국법원 전자민원센터", url: "https://help.scourt.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 채권회수 · 경매</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        돈 안 갚는 채무자, 재산 압류하려면?<br />
        경매 신청 절차와 필요 서류
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        빌려준 돈을 안 갚아서 재산을 압류하고 경매로 받으려고요?
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75" }}>민사집행법</a>에 따라
        판결문(집행권원)을 받고, 법원에 강제집행을 신청해야 해요. 전체 절차를 정리했어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>전체 절차가 어떻게 되나요?</H2>
      <p style={body}>집행권원 확보 → 강제집행 신청 → 압류 → 경매(또는 추심) → 배당 순서예요. 판결문이 없으면 먼저 소송을 해야 해요.</p>
      <GreenBox title="핵심 요약">판결문(집행권원) → 집행문 부여 → 강제집행 신청 → 압류 → 경매/추심 → 배당. 소멸시효 10년. 재산 모르면 재산조회 먼저.</GreenBox>
      <Divider />
      <H2>판결문부터 배당까지</H2>
      <p style={body}>전체 절차를 단계별로 보면 이래요.</p>
      <Steps steps={MAIN_STEPS} />
      <Divider />
      <H2>재산 종류별로 어떻게 달라지나요?</H2>
      <p style={body}>압류할 재산이 부동산인지, 예금인지, 급여인지에 따라 신청 방법이 달라요.</p>
      <BorderBox title="압류 대상별 방법">부동산: 경매 신청 → 법원 매각 → 배당 (3~12개월) | 예금: 채권압류 및 추심명령 → 은행에서 직접 회수 (1~2개월) | 급여: 급여 채권 압류 → 회사에서 일부 공제 후 지급 | 차량: 유체동산 압류 → 경매</BorderBox>
      <Divider />
      <H2>어떤 서류가 필요한가요?</H2>
      <p style={body}>법원에 강제집행을 신청할 때 아래 서류가 필요해요.</p>
      <DocTable docs={DOCS} />
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 민사집행법 정보를 바탕으로 작성됐어요. 구체적인 법률 절차는 변호사에 상담하세요." />
    </div>
  );
}
