"use client";

// Q1. 사업주가 퇴직급여 제도(퇴직금/DB/DC)를 처음 설정하거나 기존 제도를 변경하려는 상황
// Q2. DB형·DC형·퇴직금 제도의 차이를 파악하고, 근로자대표 동의를 받아 제도를 설정한다
// Q3. 3가지 유형 차이(DB: 급여확정, DC: 기여금확정, 퇴직금: 직접지급), 설정 절차(근로자대표 동의→금융기관 계약→신고), 2026년 기금형 퇴직연금 신규 도입
// Q4. CompareTable(DB vs DC 비교) + Steps(설정 절차) + GreenBox(기금형 퇴직연금) + BorderBox(의무 요약) + FAQ
// MAP-INTRO: 직원을 채용했는데 퇴직급여 제도를 어떻게 설정해야 하는지 막막하죠
// MAP-TYPE: 비교형
// MAP-H2: DB형 DC형 뭐가 다른가 > 설정 절차 > 2026년 기금형 퇴직연금 > 주의사항 > FAQ
// MAP-COMP: CompareTable > Steps > GreenBox > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "급여 결정", optionA: "퇴직 시 평균임금 x 근속연수", optionB: "적립금 + 운용수익" },
  { label: "운용 주체", optionA: "사업주(금융기관에 위탁)", optionB: "근로자 본인이 직접 운용" },
  { label: "투자 위험", optionA: "사업주가 부담", optionB: "근로자가 부담" },
  { label: "사업주 부담금", optionA: "매년 최소적립금 이상", optionB: "연간 임금총액의 1/12 이상" },
  { label: "중도인출", optionA: "불가", optionB: "법정 사유 시 가능" },
  { label: "유리한 경우", optionA: "임금 상승률이 높은 직장", optionB: "투자 수익률이 높은 경우" },
];

const STEPS_DATA = [
  {
    title: "퇴직급여 제도 유형을 선택하세요",
    desc: "퇴직금 제도, DB형, DC형 중 하나 이상을 선택해야 해요. 복수 제도(DB+DC 혼합)도 가능하고요. 상시 근로자 10인 미만 사업장은 개인형 IRP(기업형)로 대체할 수도 있어요.",
    tip: "30인 미만 사업장은 2026년부터 '푸른씨앗' 제도 지원 가능",
  },
  {
    title: "근로자대표의 동의를 받으세요",
    desc: "퇴직연금(DB·DC) 도입 시 근로자 과반수로 조직된 노동조합 또는 근로자 과반수의 동의가 필요해요. 퇴직연금규약을 작성하고 근로자대표 서명을 받아야 하죠. 퇴직금 제도만 운영하는 경우에는 취업규칙에 명시하면 돼요.",
    tip: "규약 변경도 근로자대표 동의 필요",
  },
  {
    title: "금융기관과 운용관리·자산관리 계약을 체결하세요",
    desc: "은행·증권사·보험사 등 퇴직연금사업자와 운용관리 계약, 자산관리 계약을 각각 체결해요. 같은 금융기관에서 둘 다 맡길 수도 있고요. 수수료(운용보수)를 비교해서 선택하는 게 중요해요.",
    tip: "수수료는 금융기관마다 다르니 3곳 이상 비교",
  },
  {
    title: "고용노동부에 신고하세요",
    desc: "퇴직연금 규약을 관할 지방고용노동관서에 신고해야 해요. 근로자대표 동의서, 규약 사본, 금융기관 계약서를 첨부해서 제출하면 돼요. 온라인(고용24)으로도 신고할 수 있어요.",
    tip: "설정 후 14일 이내 신고 의무",
  },
];

const FAQS = [
  { q: "퇴직금 제도만 운영해도 되나요?", a: "네, 가능해요. 퇴직급여보장법상 퇴직금 제도, DB형, DC형 중 하나 이상을 설정하면 돼요. 퇴직금 제도만 운영하면 퇴직 시 평균임금 x 근속연수로 직접 지급하는 방식이에요. 다만 근로자가 퇴직연금 도입을 요구하면 협의해야 하죠." },
  { q: "DB형에서 DC형으로 변경할 수 있나요?", a: "네, 근로자대표의 동의를 받으면 변경할 수 있어요. 다만 기존 DB형에서 쌓인 적립금을 DC형으로 이전하는 과정에서 불이익이 없는지 확인해야 해요. 변경 후에는 근로자가 직접 운용을 해야 하니까 투자 교육도 필요하고요." },
  { q: "2026년 기금형 퇴직연금이 뭔가요?", a: "기존 DB·DC는 금융기관이 운용하지만, 기금형은 전문 수탁기관이 별도 기금을 만들어 운용하는 방식이에요. 수익률이 더 높을 수 있고, 중소기업(30인 미만)은 '푸른씨앗' 제도로 3년간 적립금의 10%를 정부가 지원해 줘요." },
  { q: "직원이 1명이어도 퇴직급여를 설정해야 하나요?", a: "네, 상시 근로자 1인 이상 사업장이면 퇴직급여 제도를 설정해야 해요. 1년 이상 근무하고 주 15시간 이상 일하는 근로자에게 퇴직급여를 지급해야 하죠." },
  { q: "수수료가 가장 저렴한 방법은요?", a: "DC형 기준으로 인터넷전문은행이나 증권사 IRP가 수수료가 낮은 편이에요. DB형은 사업장 규모에 따라 수수료가 달라지고요. 금융감독원 통합연금포털에서 금융기관별 수수료를 비교할 수 있어요." },
  { q: "퇴직연금을 안 넣으면 어떻게 되나요?", a: "DC형은 매년 임금총액의 1/12 이상을 반드시 적립해야 해요. 미적립 시 지연이자(연 20%)가 붙고, 근로자가 고용노동부에 진정을 넣을 수 있어요. DB형은 매년 최소적립금 이상을 적립해야 하고요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "근로자퇴직급여보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  ]},
  { category: "참고", items: [
    { label: "고용노동부 - 퇴직연금", url: "https://www.moel.go.kr/retirementpay.do" },
    { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
  ]},
];

const RELATED = [
  { title: "퇴직연금 DB형 DC형 비교", slug: "퇴직연금-DB형-DC형-차이-수령액-운용-비교", description: "" },
  { title: "DC형 퇴직연금 수령", slug: "dc형-퇴직금-수령방법", description: "" },
  { title: "퇴직연금 수수료", slug: "퇴직연금-수수료", description: "" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직·연금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직급여 제도, 어떻게 설정하나?{"\n"}
        <span style={{ fontSize: 19, fontWeight: 500, color: "#374151" }}>DB·DC 비교부터 신고 절차까지</span>
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원을 채용했는데 퇴직급여 제도를 어떻게 설정해야 하는지 막막하죠.
        퇴직금 제도, DB형(확정급여), DC형(확정기여) 중 하나 이상을 선택해야 하고, 근로자대표 동의와 금융기관 계약이 필요해요.
        2026년부터는 기금형 퇴직연금이라는 새로운 선택지도 생겼어요.
      </p>
      <Divider />

      <H2>DB형이랑 DC형, 뭐가 다른가요?</H2>
      <p style={body}>
        가장 큰 차이는 누가 투자 위험을 지느냐예요.
        <a href="/w/퇴직연금-DB형-DC형-차이-수령액-운용-비교" style={{ color: "#1D9E75", textDecoration: "underline" }}>DB형은 사업주가, DC형은 근로자가 위험을 부담</a>해요.
        DB형은 퇴직 시 받을 금액이 정해져 있고, DC형은 운용 결과에 따라 달라지죠.
      </p>
      <SectionBadge>DB vs DC 비교</SectionBadge>
      <CompareTable titleA="DB형 (확정급여)" titleB="DC형 (확정기여)" rows={COMPARE_ROWS} />
      <p style={body}>
        임금 상승률이 높은 대기업은 DB형이 유리한 경우가 많고, 이직이 잦거나 직접 투자를 잘하는 근로자는 DC형이 나을 수 있어요.
        사업주 입장에서는 DC형이 관리가 간단하죠.
      </p>
      <Divider />

      <ArticleAd position="mid" />

      <H2>설정 절차는 어떻게 되나요?</H2>
      <p style={body}>
        퇴직연금 설정은 제도 선택 → 근로자대표 동의 → 금융기관 계약 → 고용노동부 신고 순서로 진행돼요.
        퇴직금 제도만 운영하면 별도 신고 없이 취업규칙에 명시하면 되고요.
      </p>
      <SectionBadge>설정 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <p style={body}>
        설정 후에도 매년 운용현황을 근로자에게 교육해야 하고, DC형은 분기 1회 이상 운용방법 변경 기회를 줘야 해요.
      </p>
      <Divider />

      <H2>2026년 기금형 퇴직연금이 뭔가요?</H2>
      <p style={body}>
        2026년부터 기존 DB·DC 외에 기금형 퇴직연금이 새로 도입돼요.
        전문 수탁기관이 별도 기금을 만들어 운용하는 방식이라, 개별 금융기관에 맡기는 것보다 수익률이 높을 수 있어요.
      </p>
      <GreenBox title="기금형 퇴직연금 핵심">
        전문 수탁기관이 기금을 운용하는 제3의 퇴직연금 유형.
        중소기업(30인 미만)은 '푸른씨앗' 제도로 3년간 적립금의 10%를 정부 지원.
        기존 DB·DC와 병행 또는 전환 가능.
      </GreenBox>
      <p style={body}>
        특히 30인 미만 중소기업은 정부 지원을 받을 수 있으니, 신규 설정을 고려하고 있다면 기금형도 함께 검토해 보세요.
      </p>
      <Divider />

      <H2>설정할 때 주의할 점</H2>
      <p style={body}>
        퇴직급여 제도를 한 번 설정하면 변경할 때도 근로자대표 동의가 필요해요.
        처음부터 신중하게 선택해야 하죠.
        특히 아래 사항은 반드시 확인하세요.
      </p>
      <BorderBox title="필수 확인 사항">
        <p style={{ ...body, marginBottom: 6 }}>상시 근로자 1인 이상이면 퇴직급여 설정 의무</p>
        <p style={{ ...body, marginBottom: 6 }}>DC형 적립 미이행 시 지연이자 연 20%</p>
        <p style={{ ...body, marginBottom: 6 }}>제도 변경·폐지 시 근로자대표 동의 필수</p>
        <p style={{ ...body, marginBottom: 6 }}>운용관리·자산관리 수수료 비교 후 계약</p>
        <p style={{ ...body, marginBottom: 6 }}>DC형 근로자 투자 교육 연 1회 이상 의무</p>
      </BorderBox>
      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성했어요. 구체적인 설정·변경은 노무사나 금융기관에 상담하세요." />

      <CategoryButton label="퇴직·연금" href="/categories/retirement" />
      <RelatedArticles items={RELATED} />
    </div>
  );
}
