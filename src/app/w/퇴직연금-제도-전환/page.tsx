"use client";

// Q1. 회사에서 퇴직연금 DB→DC 전환을 추진하는데 동의해야 하는지, 장단점이 뭔지 모르는 상황이에요.
// Q2. DB와 DC 차이를 이해하고, 본인 상황에 맞게 전환 동의 여부를 결정하는 행동.
// Q3. DB/DC 차이, 전환 절차(노사합의→개별동의→적립금 이전), 기존 퇴직금 처리, 강제 전환 불법, DC→DB 재전환 불가.
// Q4. GreenBox(핵심 차이) + Steps(전환 절차) + Checklist(결정 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, Checklist,
  ArticleLayout,
} from "@/components/article-ui";

const STEPS = [
  { title: "회사가 제도 변경 결정", desc: "노사 합의 또는 취업규칙 변경으로 DC형 도입을 추진해요. 근로자 과반수 동의가 필요해요." },
  { title: "설명회 개최", desc: "회사가 근로자에게 전환 내용·장단점을 설명하는 설명회를 열어야 해요." },
  { title: "근로자 개별 서면 동의", desc: "전환을 원하는 근로자만 서면으로 동의해요. 거부해도 불이익은 없어요.", tip: "강제 동의 요구는 불법이에요. 거부 시 기존 DB형 유지 가능해요." },
  { title: "기존 퇴직금 DC 계좌 이전", desc: "동의한 근로자의 기존 적립금(퇴직금)이 DC 계좌로 일괄 이전돼요." },
  { title: "DC형 운용 시작", desc: "이후부터 회사가 매달 적립하고, 근로자가 직접 투자 상품을 선택해 운용해요." },
];

const CHECK_ITEMS = [
  "투자 성향 — 직접 운용할 자신이 있는지, 원금 손실을 감당할 수 있는지",
  "남은 근속 기간 — 퇴직이 가까우면 안정적인 DB가 유리할 수 있어요",
  "연봉 상승 전망 — 앞으로 연봉이 많이 오를 예정이면 DB가 유리해요",
  "회사 재정 상태 — 회사가 불안정하면 DC가 더 안전할 수 있어요 (별도 계좌 보관)",
  "DC→DB 재전환 불가 — 한번 DC로 바꾸면 원칙적으로 돌아갈 수 없어요",
];

const FAQS = [
  { q: "DB에서 DC로 전환을 거부할 수 있나요?", a: "네, 거부할 수 있어요. 근로자 동의 없이 강제 전환은 불법이에요. 거부해도 불이익 없고, 기존 DB형에 그대로 남아요." },
  { q: "전환하면 기존 퇴직금은 어떻게 되나요?", a: "전환 시점까지 쌓인 퇴직금이 DC 계좌로 일괄 이전돼요. 예를 들어 10년 근무해서 3,000만원이면 그대로 DC에 들어가요." },
  { q: "DC로 전환 후 다시 DB로 돌아갈 수 있나요?", a: "원칙적으로 불가능해요. DC→DB 재전환은 법적으로 허용되지 않아요. 그래서 신중하게 결정해야 해요." },
  { q: "DC형에서 손실이 나면 퇴직금이 줄어드나요?", a: "네, 운용 손실은 본인 책임이에요. 원리금보장 상품에만 넣으면 원금은 지켜지지만 수익률이 낮아요." },
  { q: "이직하면 퇴직연금은 어떻게 되나요?", a: "IRP로 이전하거나 새 회사 퇴직연금으로 옮길 수 있어요. 퇴직 시 반드시 IRP를 거쳐야 해요." },
  { q: "2026년 기금형 퇴직연금이 도입되면 달라지나요?", a: "기금형 퇴직연금은 여러 기업이 공동으로 운용하는 방식이에요. 도입되면 선택지가 늘어나지만 기존 DB/DC 전환 절차 자체는 동일해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로자퇴직급여보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "고용노동부 퇴직연금 안내", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · DB · DC</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 DB에서 DC 전환,<br />
        동의해야 할까? 절차와 장단점
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 "퇴직연금 DB를 DC로 바꾸겠습니다" 통보받으셨죠?
        동의서 내밀었는데 서명해야 하는 건지, 거부해도 되는 건지 헷갈리실 거예요.
        근로자 동의 없이는 전환할 수 없고, 거부해도 불이익은 없어요.
      </p>

      <Divider />

      <H2>DB형과 DC형, 핵심 차이가 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에서
        규정하는 두 가지 퇴직연금 유형이에요. 운용 주체와 위험 부담이 정반대예요.
      </p>

      <GreenBox>
        DB(확정급여형) vs DC(확정기여형) 핵심 차이예요.<br />
        · <strong>DB형</strong>: 퇴직금이 미리 정해져 있어요. 회사가 운용하고, 퇴직 시 '평균임금 x 근속연수'를 받아요.<br />
        · <strong>DC형</strong>: 회사가 매년 연봉의 1/12을 적립해요. 근로자가 직접 운용하고, 수익도 손실도 본인 몫이에요.<br />
        · DB는 안정, DC는 자율 — 연봉 상승이 클수록 DB가 유리하고, 투자 실력이 있으면 DC가 유리해요.
      </GreenBox>

      <p style={body}>
        앞으로 연봉이 많이 오를 예정이라면 DB가 유리해요.
        퇴직금이 마지막 3개월 평균임금으로 계산되니까요.
        반대로 연봉 인상 폭이 작고 투자에 자신 있다면 DC로 전환해서 직접 운용하는 게 나을 수 있어요.
      </p>

      <Divider />

      <H2>전환 절차, 어떻게 진행되나요?</H2>
      <p style={body}>
        DB에서 DC로 전환하는 건 회사 단독으로 못 해요. 반드시 근로자 동의가 필요하고, 5단계를 거쳐요.
      </p>

      <SectionBadge>DB→DC 전환 5단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>전환 전에 꼭 따져봐야 할 것들</H2>
      <p style={body}>
        한번 DC로 바꾸면 원칙적으로 DB로 재전환이 안 돼요.
        아래 항목을 하나씩 체크하고 결정하세요.
      </p>

      <SectionBadge>전환 전 자가 진단</SectionBadge>
      <Checklist items={CHECK_ITEMS} />

      <p style={body}>
        급하게 결정하지 마세요.
        <a href="https://100lifeplan.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원 통합연금포털</a>에서
        금융사별 수익률을 비교한 뒤 결정해도 늦지 않아요.
        <a href="/w/퇴직연금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직연금 기초</a> 글도 참고하면 도움이 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법·고용노동부 자료를 바탕으로 작성했어요. 퇴직연금 제도는 법령 개정 시 달라질 수 있으니 고용노동부(1350)에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
