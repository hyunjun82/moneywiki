"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 무보험 차량에 교통사고를 당했는데 가해자에게 보상을 받을 수 없어서 어떻게 해야 하는지 모르는 상황.
// Q2. 정부 보장사업에 청구해서 보상받을 수 있다는 걸 알고, 청구 절차를 진행할 수 있어야 해요.
// Q3. 정부 보장사업(자동차손해배상보장법), 보상 한도(사망 1.5억, 부상 3천만원, 후유장애 1.5억), 청구 절차(손해보험사 대리 접수), 무보험차상해 특약.
// Q4. GreenBox(보상 한도 요약) + Steps(청구 절차) + BorderBox(보상 기준표) + Checklist(필요 서류) + FAQ
// MAP-INTRO: 무보험 차량에 당했는데 가해자에게 보상받을 수 없어서 막막
// MAP-TYPE: 절차
// MAP-H2: 정부 보장사업이란 > 보상 한도 > 청구 절차 > 무보험차상해 특약 > FAQ
// MAP-COMP: GreenBox > BorderBox > Steps > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const CLAIM_STEPS = [
  { title: "사고 접수 및 신고", desc: "112에 교통사고 신고하고, 사고 현장 사진과 상대방 차량 번호를 확보하세요.", tip: "블랙박스 영상이 있으면 반드시 저장하세요" },
  { title: "병원 치료", desc: "사고 직후 바로 병원에 가세요. 치료비 영수증과 진단서를 꼭 보관해야 해요." },
  { title: "손해보험사에 보장사업 청구", desc: "아무 손해보험사 지점에 가서 정부 보장사업 보상 청구서를 작성하세요. 보험사가 정부 대신 접수해요." },
  { title: "서류 제출", desc: "교통사고 사실확인서, 진단서, 치료비 영수증, 사고 사진 등을 제출하세요." },
  { title: "보상금 수령", desc: "심사 후 보상금이 지급돼요. 보통 서류 제출 후 1~2개월 정도 걸려요." },
];

const FAQS = [
  { q: "무보험 차에 당하면 누가 보상해주나요?", a: "정부 보장사업이 대신 보상해줘요. 자동차손해배상보장법에 따라 국가가 운영하는 제도예요. 가해자에게 받을 수 없는 부분을 정부가 보전해줘요." },
  { q: "보상 한도가 얼마예요?", a: "사망 시 최대 1억 5천만원, 부상 시 3천만원(급수별), 후유장애 시 1억 5천만원이에요. 자동차보험 보상 기준과 동일해요." },
  { q: "내 보험에 무보험차상해 특약이 있으면요?", a: "본인 보험사에 먼저 청구하는 게 유리해요. 무보험차상해 특약은 정부 보장사업보다 한도가 높을 수 있어요." },
  { q: "뺑소니 사고도 보장되나요?", a: "네, 뺑소니(가해자 불명)도 정부 보장사업 대상이에요. 사고 현장에서 목격자 확보와 신고가 중요해요." },
  { q: "청구는 어디서 하나요?", a: "아무 손해보험사 지점에서 접수할 수 있어요. 삼성화재, 현대해상, DB손보 등 어디든 가능해요." },
  { q: "가해자가 나중에 잡히면요?", a: "정부가 가해자에게 구상권을 행사해요. 피해자는 이미 보상받았으니 추가 절차 없이 끝나요." },
];

const REFS = [
  { category: "법령·기관", items: [
    { label: "자동차손해배상 보장법", url: "https://www.law.go.kr/법령/자동차손해배상보장법" },
    { label: "국토교통부 자동차정책과", url: "https://www.molit.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 교통사고 · 보상</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        무보험 차에 당했는데 보상받을 수 있나요?<br />
        정부 보장사업 청구 방법과 한도
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        무보험 차량에 사고를 당하면 가해자에게 보상을 받기 어렵죠. 이럴 때 정부가 대신 보상해줘요.
        <a href="https://www.law.go.kr/법령/자동차손해배상보장법" style={{ color: "#1D9E75" }}>자동차손해배상 보장법</a>에 따른
        정부 보장사업으로 사망 시 최대 1억 5천만원, 부상 시 3천만원까지 받을 수 있어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>정부 보장사업이 뭔가요?</H2>
      <p style={body}>무보험 차량이나 뺑소니 사고로 보상받을 수 없는 피해자를 위해 국가가 운영하는 제도예요. 가해자 대신 정부가 보상하고, 나중에 가해자에게 구상권을 행사해요.</p>
      <GreenBox title="보상 한도">사망: 최대 1억 5천만원 | 부상: 급수별 최대 3천만원 | 후유장애: 최대 1억 5천만원 | 뺑소니도 대상 | 아무 손해보험사에서 청구 가능</GreenBox>
      <Divider />
      <H2>보상 기준이 어떻게 되나요?</H2>
      <p style={body}>자동차보험 대인배상I 기준과 동일해요. 치료비, 휴업손해, 위자료를 합산해서 보상해요. 부상 급수에 따라 한도가 달라져요.</p>
      <BorderBox title="보상 항목">치료비: 실비 전액 (한도 내) | 휴업손해: 입증된 소득 기준 | 위자료: 부상 급수별 정해진 금액 | 후유장애: 장해등급별 보상</BorderBox>
      <Divider />
      <H2>어떻게 청구하나요?</H2>
      <p style={body}>아무 손해보험사 지점에 가서 접수하면 돼요. 보험사가 정부 대신 접수하고 심사해요.</p>
      <Steps steps={CLAIM_STEPS} />
      <Divider />
      <H2>내 보험에 무보험차상해 특약이 있다면?</H2>
      <p style={body}>본인 자동차보험에 무보험차상해 특약이 있으면 본인 보험사에 먼저 청구하는 게 유리해요. 정부 보장사업보다 보상 한도가 높을 수 있고, 처리 속도도 빨라요. 특약이 없다면 정부 보장사업을 이용하세요.</p>
      <BorderBox title="무보험차상해 특약 vs 정부 보장사업">특약: 보상 한도 높음(가입 금액까지), 처리 빠름, 본인 보험료 할증 없음 | 보장사업: 법정 한도(사망 1.5억), 처리 1~2개월, 가해자 구상 가능</BorderBox>
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 자동차손해배상보장법 정보를 바탕으로 작성됐어요. 구체적인 보상 금액은 사고 상황에 따라 달라질 수 있어요." />
    </div>
  );
}
