"use client";
// Q1. 무보험으로 교통사고를 냈는데 형사처벌이 어떻게 되는지 알고 싶은 상황.
// Q2. 무보험 운전 처벌 기준과 인명피해 시 가중처벌을 파악하고 대응 방향을 잡을 수 있어야 해요.
// Q3. 무보험 운전 자체 처벌(1년 이하 징역/1천만원 벌금), 인명피해 시 교특법(5년 이하 금고), 합의·보험 미가입 영향.
// Q4. GreenBox(처벌 요약) + BorderBox(상황별 처벌 기준) + Steps(대응 절차) + Checklist(확인사항) + FAQ
// MAP-INTRO: 무보험으로 사고 냈는데 형사처벌이 어떻게 될지 걱정
// MAP-TYPE: 텍스트
// MAP-H2: 무보험 운전 처벌 > 인명피해 시 가중처벌 > 대응 절차 > 벌금 납부 > FAQ
// MAP-COMP: GreenBox > BorderBox > Steps > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const RESPONSE_STEPS = [
  { title: "사고 현장 조치", desc: "부상자 구호, 경찰 신고(112), 현장 보존을 하세요. 도주하면 뺑소니로 가중처벌돼요." },
  { title: "변호사 상담", desc: "형사처벌이 예상되니 교통사고 전문 변호사 상담을 받으세요. 법률구조공단 무료 상담도 가능해요." },
  { title: "피해자와 합의", desc: "합의 여부가 처벌 수위에 큰 영향을 줘요. 치료비 + 위자료를 협의하세요.", tip: "합의서에 '처벌불원' 문구가 있어야 감경 효과가 커요" },
  { title: "보험 즉시 가입", desc: "사고 후라도 의무보험(책임보험)에 즉시 가입하세요. 재범 방지 의지를 보여줄 수 있어요." },
];

const FAQS = [
  { q: "무보험으로 사고 안 내도 처벌받나요?", a: "네, 무보험 운전 자체가 위법이에요. 사고 없이 단속에 걸려도 1년 이하 징역 또는 1천만원 이하 벌금이에요." },
  { q: "무보험 사고에서 피해자와 합의하면 처벌이 줄어드나요?", a: "네, 합의하면 처벌이 크게 감경돼요. 특히 '처벌불원' 합의서가 있으면 기소유예나 벌금으로 끝날 가능성이 높아요." },
  { q: "무보험 상태에서 사망 사고 내면요?", a: "교통사고처리특례법상 5년 이하 금고 또는 2천만원 이하 벌금이에요. 종합보험 미가입이라 특례 적용이 안 돼서 형사처벌이 불가피해요." },
  { q: "책임보험만 가입하면 되나요?", a: "책임보험(의무보험)은 최소한의 의무예요. 대인 무한, 대물 2천만원까지만 돼요. 종합보험에 가입해야 교특법 특례를 받을 수 있어요." },
  { q: "벌금은 얼마 정도 나오나요?", a: "무보험 단순 운전은 보통 100~300만원, 인명피해 시 500~2천만원 정도예요. 전과 여부, 피해 정도, 합의 여부에 따라 달라요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "자동차손해배상 보장법", url: "https://www.law.go.kr/법령/자동차손해배상보장법" },
    { label: "교통사고처리특례법", url: "https://www.law.go.kr/법령/교통사고처리특례법" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 교통사고 · 형사처벌</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        무보험 교통사고, 처벌이 어떻게 되나요?<br />
        징역·벌금 기준과 대응 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        무보험으로 사고를 냈거나 무보험 상태로 운전하다 걸리면 형사처벌을 받아요.
        <a href="https://www.law.go.kr/법령/자동차손해배상보장법" style={{ color: "#1D9E75" }}>자동차손해배상 보장법</a>에 따라
        사고 없이도 1년 이하 징역 또는 1천만원 이하 벌금이에요. 인명피해가 있으면 더 무거워요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>무보험 운전 자체가 처벌 대상이에요</H2>
      <p style={body}>사고를 내지 않았어도 무보험 상태로 운전한 것 자체가 위법이에요. 의무보험(책임보험) 미가입 차량을 운행하면 1년 이하 징역 또는 1천만원 이하 벌금이에요.</p>
      <GreenBox title="무보험 운전 처벌">사고 없어도: 1년 이하 징역 또는 1천만원 이하 벌금 | 과태료도 별도: 의무보험 미가입 과태료 최대 100만원 | 운전면허와 무관: 면허가 있어도 보험 없으면 처벌</GreenBox>
      <Divider />
      <H2>인명피해가 있으면 어떻게 되나요?</H2>
      <p style={body}>무보험 상태에서 사람을 다치게 하면 <a href="https://www.law.go.kr/법령/교통사고처리특례법" style={{ color: "#1D9E75" }}>교통사고처리특례법</a>의 특례가 적용 안 돼요. 종합보험 가입자는 합의 없이도 공소권 없음(불기소)이 될 수 있지만, 무보험은 무조건 형사처벌이에요.</p>
      <BorderBox title="인명피해 시 처벌 기준">부상 사고: 5년 이하 금고 또는 2천만원 이하 벌금 | 사망 사고: 5년 이하 금고 (교특법 특례 불적용) | 음주·뺑소니 겹치면: 가중처벌 (특정범죄가중처벌법 적용)</BorderBox>
      <Divider />
      <H2>사고 후 어떻게 대응해야 하나요?</H2>
      <p style={body}>현장 조치를 먼저 하고, 변호사 상담과 피해자 합의를 진행하세요. 합의 여부가 처벌 수위에 큰 영향을 줘요.</p>
      <Steps steps={RESPONSE_STEPS} />
      <Divider />
      <H2>벌금은 얼마 정도 나오나요?</H2>
      <p style={body}>무보험 단순 운전은 보통 100~300만원 벌금이에요. 인명피해 시에는 500~2천만원까지 올라갈 수 있어요. 합의 여부, 전과 기록, 피해 정도에 따라 달라요.</p>
      <BorderBox title="벌금 수준 (참고)">단순 무보험 운전: 100~300만원 | 경미 부상 + 합의: 200~500만원 | 중상해 + 미합의: 500~2천만원 | 사망 + 미합의: 실형 가능</BorderBox>
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 법령 정보를 바탕으로 작성됐어요. 구체적인 형사처벌은 사안에 따라 달라지니 변호사 상담을 받으세요." />
    </div>
  );
}
