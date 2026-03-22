"use client";

// Q1. 퇴직연금 금융사 수익률이 낮아서 다른 곳으로 옮기고 싶은데, 방법과 주의사항을 모르는 상황이에요.
// Q2. IRP 금융사를 변경하거나 DC형 금융사 이전 가능 여부를 확인하고, 실물이전 제도를 활용해 옮기는 행동.
// Q3. IRP 자유 변경, DC형 제한적, DB형 불가, 실물이전 제도(2024.10~), 이전 절차(새 금융사 방문 1회), 소요기간 1~2주, 세금 없음.
// Q4. GreenBox(유형별 변경 가능 여부) + Steps(IRP 이전 절차) + Checklist(변경 시 주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, Checklist,
  ArticleLayout,
} from "@/components/article-ui";

const IRP_STEPS = [
  { title: "새 금융사에서 IRP 계좌 개설", desc: "옮기고 싶은 금융사(은행·증권사)에서 IRP 계좌를 먼저 개설해요.", tip: "수수료·상품 라인업·앱 편의성을 비교하고 선택하세요." },
  { title: "타사 IRP 이전 신청", desc: "새 금융사 앱 또는 영업점에서 '타사 IRP 이전' 메뉴로 신청해요. 기존 금융사 방문은 불필요해요." },
  { title: "실물이전 여부 선택", desc: "2024년 10월부터 실물이전이 가능해요. 기존 상품(ETF·펀드·예금)을 매도 안 하고 그대로 옮길 수 있어요.", tip: "양쪽 금융사가 모두 취급하는 상품만 실물이전 가능해요. 비대상 상품은 현금화 후 이전돼요." },
  { title: "적립금 이체 (1~2주)", desc: "상품 매도(또는 실물이전) 후 새 계좌로 이체돼요. 이 기간에는 수익이 없으니 참고하세요." },
  { title: "새 금융사에서 상품 재선택", desc: "현금으로 이전된 금액은 빨리 상품을 골라 운용을 시작하세요. 방치하면 수익 기회를 놓쳐요." },
];

const CAUTIONS = [
  "운용 중인 상품이 손실 상태면 매도 시 손실이 확정돼요 — 시장 상황을 보고 시점 선택",
  "이전 기간(1~2주) 중에는 현금 상태라 수익이 없어요",
  "일부 펀드는 환매 수수료가 있을 수 있어요 — 가입 후 90일 이내 등 조건 확인",
  "실물이전은 양쪽 금융사가 모두 취급하는 상품만 가능",
  "이전은 해지가 아니라서 세금이 없어요 — 과세 이연 유지",
  "DC형은 회사가 지정한 금융사 내에서만 변경 가능 — 인사팀에 먼저 확인",
];

const FAQS = [
  { q: "IRP 금융사를 자유롭게 바꿀 수 있나요?", a: "네, IRP는 본인이 원하면 언제든 금융사를 변경할 수 있어요. 새 금융사 한 곳만 방문하면 돼요." },
  { q: "DC형도 금융사를 바꿀 수 있나요?", a: "회사가 여러 금융사와 계약했고 변경 규정이 있을 때만 가능해요. 인사팀에 확인하세요." },
  { q: "실물이전이 뭔가요?", a: "기존 운용 상품(ETF·펀드·예금 등)을 매도하지 않고 그대로 새 금융사로 옮기는 제도예요. 2024년 10월부터 시행됐어요." },
  { q: "이전하면 세금을 내나요?", a: "아니요, 이전은 해지가 아니라서 세금이 없어요. 과세 이연이 그대로 유지돼요." },
  { q: "여러 IRP를 하나로 합칠 수 있나요?", a: "네, 여러 금융사에 있는 IRP를 하나로 통합할 수 있어요. 이전 신청하면 돼요." },
  { q: "은행과 증권사 중 어디가 나은가요?", a: "안정 추구면 은행(예금·GIC 중심), 수익 추구면 증권사(ETF·펀드 다양)가 맞아요. 금융감독원 통합연금포털에서 수익률을 비교하세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로자퇴직급여보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
      { label: "고용노동부 — 퇴직연금 실물이전 안내", url: "https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=17141" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · IRP · 금융사 변경</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 금융사 바꾸고 싶다면?<br />
        IRP 이전 절차와 실물이전 제도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직연금 수익률이 바닥이라 금융사를 바꾸고 싶죠?
        IRP는 자유롭게 변경할 수 있고, 2024년 10월부터는 상품을 팔지 않고 그대로 옮기는 실물이전도 가능해졌어요.
        새 금융사 한 곳만 방문하면 이전이 끝나요.
      </p>

      <Divider />

      <H2>유형별로 변경 가능한가요?</H2>
      <p style={body}>
        퇴직연금 유형에 따라 변경 가능 범위가 달라요.
      </p>

      <GreenBox>
        유형별 금융사 변경 가능 여부예요.<br />
        · <strong>IRP</strong>: 자유롭게 변경 가능 — 본인이 원하면 언제든<br />
        · <strong>DC형</strong>: 제한적 — 회사가 여러 금융사와 계약한 경우만 가능<br />
        · <strong>DB형</strong>: 변경 불가 — 회사가 관리하므로 개인이 바꿀 수 없어요
      </GreenBox>

      <Divider />

      <H2>IRP 이전, 어떻게 하나요?</H2>
      <p style={body}>
        IRP 금융사 변경은 새 금융사 한 곳만 가면 돼요.
        기존 금융사에 따로 연락하거나 방문할 필요 없어요.
      </p>

      <SectionBadge>IRP 이전 5단계</SectionBadge>
      <Steps steps={IRP_STEPS} />

      <p style={body}>
        <a href="https://100lifeplan.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원 통합연금포털</a>에서
        금융사별 수익률·수수료를 비교한 뒤 결정하세요.
      </p>

      <Divider />

      <H2>변경할 때 주의할 점이 있나요?</H2>
      <p style={body}>
        이전 자체에 세금은 없지만, 몇 가지 주의할 점이 있어요.
      </p>

      <SectionBadge>변경 시 주의사항</SectionBadge>
      <Checklist items={CAUTIONS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법·금융감독원 자료를 바탕으로 작성했어요. 실물이전 대상 상품과 수수료는 금융사마다 다를 수 있으니 해당 금융사에 직접 문의하세요." />
    </ArticleLayout>
  );
}
