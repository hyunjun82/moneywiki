"use client";

// Q1. 퇴직연금에 가입돼 있다고 하는데 얼마나 쌓였는지 모르는 상황이에요. 어디서 확인하나요?
// Q2. 금융기관 앱이나 통합연금포털에서 적립금을 조회하고, 미납·운용 상태를 점검할 수 있어요.
// Q3. 조회 경로 3가지(금융기관 앱·통합연금포털·내연금), DB vs DC 차이, 적립금 적은 원인과 대응.
// Q4. GreenBox(조회 경로 요약) + Steps(조회 절차) + BorderBox(DB vs DC 차이) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "어느 금융기관에 가입했는지 모르면요?",
    a: "통합연금포털에서 조회하면 가입된 금융회사명과 적립금을 한 번에 볼 수 있어요. 공동인증서로 로그인하세요.",
  },
  {
    q: "DB형도 직접 조회할 수 있나요?",
    a: "DB형은 회사가 일괄 관리해서 개인 조회가 어려워요. 가입 사실은 통합연금포털에서 확인되지만, 세부 금액은 인사팀에 물어보세요.",
  },
  {
    q: "적립금이 생각보다 적은 이유는 뭔가요?",
    a: "회사 미납, 운용지시 미설정(대기자금 묶임), 투자 수익률 마이너스 중 하나일 수 있어요. 금융기관 앱에서 납입 내역과 운용 상태를 확인하세요.",
  },
  {
    q: "IRP 잔액도 조회 가능한가요?",
    a: "네. 금융기관 앱과 통합연금포털 모두에서 IRP 잔액을 조회할 수 있어요.",
  },
  {
    q: "이직하면서 퇴직연금이 사라진 것 같아요.",
    a: "이전 회사 퇴직연금이 IRP로 이전됐을 수 있어요. 통합연금포털에서 전체 연금을 조회해보세요. 미청구 퇴직연금이 발견될 수도 있어요.",
  },
  {
    q: "얼마나 자주 확인하면 좋을까요?",
    a: "1년에 한 번 정도 확인하세요. 회사 납입 누락, 운용지시 미설정, 수익률 점검을 함께 하면 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
      { label: "국민연금공단 내연금", url: "https://www.nps.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 수령 일시금 vs 연금", description: "수령 방식에 따라 세금이 달라져요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제", description: "연금저축 세액공제 한도도 확인하세요." },
];

const STEPS_APP = [
  { title: "가입 금융기관 확인", desc: "인사팀에 '퇴직연금 어디로 가입돼 있나요?'라고 물어보세요." },
  { title: "해당 금융기관 앱 설치", desc: "은행이면 은행 앱, 증권사면 증권사 앱을 설치하고 로그인해요." },
  { title: "'연금' 메뉴에서 조회", desc: "앱 내 '연금' 또는 '퇴직연금' 메뉴에서 적립금, 수익률, 납입 내역을 확인해요." },
];

const STEPS_PORTAL = [
  { title: "통합연금포털 접속", desc: "100lifeplan.fss.or.kr에 접속해요." },
  { title: "인증 로그인", desc: "공동인증서 또는 금융인증서로 로그인해요. 최초 이용 시 3영업일 후 조회 가능해요." },
  { title: "'내 연금 조회' 클릭", desc: "퇴직연금(DB·DC·IRP) + 국민연금 + 개인연금 모두 한 번에 표시돼요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 연금 · 조회</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 적립금 조회,<br />
        금융기관 앱과 통합연금포털 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 퇴직연금에 가입돼 있다고 하는데 얼마나 쌓였는지 모르겠죠?
        금융기관 앱이나 통합연금포털에서 몇 분이면 확인할 수 있어요.
        어디에 가입됐는지도 모르면 통합연금포털에서 한 번에 찾을 수 있고요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>어디서 조회하면 되나요?</H2>

      <GreenBox>
        퇴직연금 조회 경로 3가지<br />
        · <strong>금융기관 앱</strong>: 가입 금융기관을 알면 가장 빠르고 자세해요<br />
        · <strong>통합연금포털</strong>: 모든 연금을 한 번에 조회 (금융기관 모를 때)<br />
        · <strong>국민연금공단 내연금</strong>: 국민연금 + 퇴직연금 + 개인연금 통합 조회
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>금융기관 앱에서 조회하기</H2>
      <p style={body}>
        가입 금융기관을 알고 있다면 앱에서 바로 확인하는 게 가장 빨라요.
        적립금 잔액, 운용 상품, 수익률, 납입 내역까지 볼 수 있어요.
      </p>

      <Steps steps={STEPS_APP} />

      <Divider />

      <H2>통합연금포털에서 한 번에 조회하기</H2>
      <p style={body}>
        어느 금융기관에 가입했는지 모르거나 이직을 여러 번 했다면
        <a href="https://100lifeplan.fss.or.kr/retire/retireInfo.do" style={{ color: "#1D9E75", textDecoration: "underline" }}> 통합연금포털</a>이 편해요.
      </p>

      <Steps steps={STEPS_PORTAL} />

      <Divider />

      <H2>DB형과 DC형, 조회 방식이 달라요</H2>

      <BorderBox title="DB형 vs DC형 조회 차이">
        <strong>DC형(확정기여형)</strong>: 내 이름으로 된 계좌가 있어서 앱에서 직접 조회 가능<br /><br />
        <strong>DB형(확정급여형)</strong>: 회사가 일괄 관리, 개인 계좌 없음. 통합연금포털에서 가입 사실은 확인되지만 세부 금액은 인사팀에 문의<br /><br />
        어떤 유형인지 모르면 인사팀에 "DB형이에요, DC형이에요?" 물어보세요.
      </BorderBox>

      <Divider />

      <H2>적립금이 적다면, 이걸 점검하세요</H2>

      <Checklist items={[
        "회사 납입 내역 확인 (DC형은 연봉의 1/12 이상 납입 의무)",
        "운용지시 설정 여부 (미설정 시 대기자금으로 묶여 이자 거의 없음)",
        "투자 수익률 확인 (마이너스면 상품 변경 검토)",
        "이전 직장 퇴직연금 IRP 이전 여부",
      ]} />

      <p style={body}>
        회사가 납입을 안 했다면 인사팀에 문의하세요.
        퇴직연금 납입은 회사의 법적 의무예요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 재무 자문이 아니며, 퇴직연금 운용은 개인 상황에 맞게 판단하세요. 자세한 상담은 가입 금융기관이나 금융감독원(1332)에 문의하세요." />
    </ArticleLayout>
  );
}
