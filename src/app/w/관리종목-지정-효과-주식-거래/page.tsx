"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 내가 가진 주식이 관리종목으로 지정됐거나 될 수 있어서, 거래 제한과 상장폐지 위험이 궁금한 상황이에요.
// Q2. 관리종목 지정 효과를 이해하고 보유 주식을 팔지 유지할지 판단하는 행동.
// Q3. 거래 제한 내용, 상장폐지 절차, 지정 사유별 해제 조건, 투자자 유의사항.
// Q4. GreenBox(핵심 효과) + Steps(상장폐지 절차) + Checklist(투자자 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const DELIST_STEPS = [
  { title: "관리종목 지정", desc: "사업보고서 미제출, 자본잠식, 매출 미달 등 사유 발생 시 지정돼요." },
  { title: "개선 기간 부여", desc: "사유에 따라 1~2년의 개선 기간이 주어져요." },
  { title: "상장적격성 심사", desc: "기간 내 개선되지 않으면 상장적격성 실질심사에 들어가요." },
  { title: "상장폐지 결정", desc: "심사 불합격 시 상장폐지가 확정돼요. 정리매매 기간 7일이 주어져요." },
];

const CHECK_ITEMS = [
  "관리종목 지정 사유가 일시적인지 구조적인지 확인",
  "회사가 개선 계획을 발표했는지 공시 확인",
  "신용거래·미수거래가 금지되니 현금 매수만 가능",
  "정리매매 기간(7일) 안에만 매도 가능 — 이후 거래 불가",
  "상장폐지 확정되면 주식 가치가 사실상 0이 될 수 있음",
];

const FAQS = [
  { q: "관리종목 주식은 사고팔 수 있나요?", a: "매매는 가능해요. 단, 신용거래·미수거래가 금지되고 현금 매수만 돼요. 가격 변동폭도 제한될 수 있어요." },
  { q: "관리종목이 해제되면 주가가 오르나요?", a: "해제 공시가 나오면 단기적으로 반등하는 경우가 많아요. 하지만 해제 자체가 기업 펀더멘털을 보장하진 않으니 신중해야 해요." },
  { q: "상장폐지되면 내 주식은 어떻게 되나요?", a: "정리매매 기간(7일)에 팔 수 있어요. 이 기간이 지나면 장외거래만 가능하고, 사실상 매매가 매우 어려워져요." },
  { q: "관리종목 지정 사유는 어디서 확인하나요?", a: "한국거래소 KIND(kind.krx.co.kr)에서 해당 종목을 검색하면 지정 사유와 개선 기한이 공시돼 있어요." },
  { q: "관리종목에서 바로 상장폐지되는 경우도 있나요?", a: "네. 횡령·배임, 감사의견 거절, 허위공시 등 중대 사유는 관리종목 없이 바로 상장적격성 심사로 넘어갈 수 있어요." },
  { q: "ETF나 펀드가 관리종목 주식을 보유하면 어떻게 되나요?", a: "기관투자자는 관리종목 편입이 제한돼요. ETF에서 해당 종목이 빠지면서 추가 매도 압력이 생길 수 있어요." },
];

const REFERENCES = [
  { category: "법령 및 규정", items: [
    { label: "자본시장법(법제처)", url: "https://www.law.go.kr/법령/자본시장과금융투자업에관한법률" },
    { label: "한국거래소 KIND", url: "https://kind.krx.co.kr" },
  ]},
];

const RELATED = [
  { slug: "금융사기-예방", title: "금융사기 예방 방법", description: "투자 사기 포함, 금융사기 수법과 대처법을 정리했어요." },
  { slug: "보장성보험-저축성보험-차이", title: "보장성보험 vs 저축성보험", description: "투자와 보험의 차이, 어떤 게 나에게 맞는지 알아보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 주식</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        관리종목 지정되면 주식 거래는 어떻게 되나요?<br />
        거래 제한과 상장폐지 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보유 중인 주식이 관리종목으로 지정됐다는 공시를 보셨죠? 당장 거래가 안 되는 건 아니지만, 신용매수가 막히고 상장폐지 위험이 생겨요.
        지정 사유에 따라 해제 가능성이 다르니, 지금 상황을 정확히 파악하는 게 먼저예요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>관리종목 지정, 당장 뭐가 달라지나요?</H2>
      <p style={body}>
        관리종목으로 지정되면 해당 종목에 여러 거래 제한이 걸려요.
        <a href="https://kind.krx.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 한국거래소 KIND</a>에서 지정 사유를 확인할 수 있어요.
      </p>

      <GreenBox title="관리종목 거래 제한">
        · 신용거래·미수거래 금지 (현금 매수만 가능)<br />
        · 일부 기관투자자 매수 금지<br />
        · 주가 급락 위험 증가 (투자심리 악화)<br />
        · ETF·펀드에서 편출 가능성
      </GreenBox>

      <p style={body}>
        매매 자체가 막히는 건 아니에요. 현금으로는 사고팔 수 있어요. 다만 투자 심리가 급격히 나빠져서 주가 하락 폭이 클 수 있어요.
      </p>

      <Divider />

      <H2>상장폐지까지 어떤 단계를 거치나요?</H2>
      <p style={body}>
        관리종목 지정이 곧 상장폐지는 아니에요. 개선 기간이 주어지고, 그 안에 해결하면 해제돼요. 못 하면 심사를 거쳐 폐지가 결정돼요.
      </p>

      <Steps steps={DELIST_STEPS} />

      <p style={body}>
        정리매매 기간은 딱 7일이에요. 이 기간에 팔지 못하면 장외거래만 가능하고, 사실상 현금화가 매우 어려워져요.
      </p>

      <Divider />

      <H2>관리종목 주식 보유 중이라면 이것부터 확인하세요</H2>
      <p style={body}>
        무조건 팔아야 하는 건 아니에요. 지정 사유가 일시적이라면 해제 후 반등할 수도 있거든요. 아래 항목을 기준으로 판단해보세요.
      </p>

      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 자본시장법과 한국거래소 상장규정을 기준으로 작성됐어요. 개별 종목의 관리종목 지정 사유와 해제 조건은 KIND 공시를 확인하세요." />
    </ArticleLayout>
  );
}
