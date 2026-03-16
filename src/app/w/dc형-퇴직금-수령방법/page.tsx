"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 DC형(확정기여형) 퇴직연금에 가입해 있어요" },
  { id: "c2", label: "매년 연봉의 1/12 이상이 DC형 계좌에 적립돼요" },
  { id: "c3", label: "적립금 운용은 본인이 직접 하고 있어요" },
  { id: "c4", label: "퇴직 시 적립금 + 운용수익(또는 손실)이 퇴직금이에요" },
];

const CHECKLIST = [
  "DC형 운용사 확인 — 은행·증권사 어디인지 확인",
  "적립금 및 운용 현황 확인 — 운용사 앱이나 홈페이지에서 조회",
  "IRP 계좌 개설 — 퇴직 전에 미리 준비",
  "운용 중인 상품 정리 — 해지 시 환매 타이밍 확인",
  "퇴직소득원천징수영수증 수령 — 세금 내역 확인",
];

const FAQS = [
  {
    q: "DC형 퇴직금은 어떻게 받나요?",
    a: "퇴직하면 DC형 계좌에 적립된 금액(원금 + 운용수익)이 IRP로 이전돼요. 별도로 회사가 금액을 산정하는 게 아니라 적립금 그 자체가 퇴직금이죠.",
  },
  {
    q: "운용 손실이 나면 퇴직금이 줄어드나요?",
    a: "네, DC형은 운용 리스크를 근로자가 부담해요. 원금보장형 상품에 넣어두면 손실은 없지만 수익도 적죠. 투자형 상품은 손실 가능성이 있어요.",
  },
  {
    q: "적립금을 어떻게 확인하나요?",
    a: "DC형 운용사(은행·증권사) 앱이나 홈페이지에 로그인하면 적립금과 운용 현황을 확인할 수 있어요. 퇴직연금 관련 메뉴를 찾으면 되죠.",
  },
  {
    q: "DC형에서 DB형으로 바꿀 수 있나요?",
    a: "회사와 합의하면 전환이 가능하지만 드문 경우예요. DC형 적립금은 그대로 유지되고, 이후 적립분부터 DB형이 적용되죠.",
  },
  {
    q: "퇴직 전에 DC형 적립금을 꺼낼 수 있나요?",
    a: "원칙적으로 퇴직 전에는 인출할 수 없어요. 주택 구입, 6개월 이상 요양 등 법정 사유가 있을 때만 중도인출이 가능하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — DC형 퇴직연금 제도", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
      { label: "고용노동부 — 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-DC형-계산법",
    title: "DC형 퇴직금 계산법",
    description: "DC형 적립금과 운용수익 계산 방법을 정리했어요.",
  },
  {
    slug: "db형-퇴직금-수령방법",
    title: "DB형 퇴직금 수령 방법",
    description: "DB형은 회사가 금액을 산정하는 방식이라 절차가 달라요.",
  },
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 방법",
    description: "IRP에 들어온 퇴직금을 꺼내는 구체적인 절차를 안내해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="dc형-퇴직금-수령방법" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DC형 · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DC형 퇴직금 수령 방법,<br />
        적립금 확인부터 수령까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;DC형 퇴직연금인데, 퇴직하면 적립금을 어떻게 받나요?&rdquo;
        DC형(확정기여형)은 회사가 매년 적립한 금액을 근로자가 직접 운용하는 구조예요. 퇴직 시 적립금 + 운용수익이 곧 퇴직금이 되죠.
        적립금 확인 방법, 수령 절차, 세금 처리, 손실 시 대처법까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DC형 퇴직연금 수령 방법은?</H2>
      <p style={body}>
        DC형은 퇴직하면 <strong>적립금 전체(원금 + 운용수익)</strong>가 IRP 계좌로 이전돼요. DB형처럼 회사가 퇴직금을 별도로 산정하는 게 아니라, 이미 적립된 금액이 곧 퇴직금이죠.
      </p>
      <p style={body}>
        퇴직 시 운용 중인 상품이 환매(매도)된 뒤 현금화돼요. 펀드나 ETF에 투자하고 있었다면 환매 시점의 평가액이 적용되니까, 시장 상황에 따라 금액이 달라질 수 있죠.
      </p>
      <p style={body}>
        IRP에 입금된 뒤에는 바로 해지해서 일시금으로 꺼내거나, 유지하면서 연금으로 나눠 받을 수 있어요. 해지하면 2~3영업일 내에 일반 계좌로 입금되죠.
      </p>

      <GreenBox title="DC형 수령 흐름">
        퇴직 → 운용 상품 환매 → 적립금이 IRP로 이전 → 해지 또는 유지
      </GreenBox>

      <Divider />

      <H2>적립금은 어떻게 확인하나요?</H2>
      <p style={body}>
        DC형 운용사(은행·증권사) 앱이나 홈페이지에 로그인하면 현재 적립금과 운용 현황을 실시간으로 확인할 수 있어요. &ldquo;퇴직연금&rdquo; 메뉴에서 적립금 잔액, 운용 상품별 수익률을 볼 수 있죠.
      </p>
      <p style={body}>
        운용사를 모르겠다면 회사 인사팀에 물어보세요. 급여명세서에 DC형 납입 내역이 표시되는 경우도 있고, 국세청 홈택스에서 퇴직연금 납입 내역을 조회할 수 있어요.
      </p>
      <p style={body}>
        퇴직 전에 적립금을 미리 확인하면 수령 금액을 예측할 수 있어요. 운용 상품을 원금보장형으로 바꿔두면 퇴직 시점의 시장 변동에 영향을 덜 받죠.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>DC형 수령 시 세금은 어떻게 되나요?</H2>
      <p style={body}>
        DB형과 마찬가지로 IRP에 입금될 때는 세금이 유예돼요. 나중에 일시금으로 꺼내면 퇴직소득세 전액이 부과되고, 연금으로 받으면 60~70%만 부담하죠.
      </p>
      <p style={body}>
        DC형의 퇴직소득세 계산은 적립금 총액을 기준으로 해요. 근속연수가 길수록 공제가 커지는 구조는 DB형과 같죠. 다만 DC형은 운용수익 부분에도 퇴직소득세가 적용돼요.
      </p>
      <p style={body}>
        운용 손실이 나서 적립금이 줄었다면 세금도 그만큼 줄어들어요. 하지만 손실 자체가 퇴직금 감소를 뜻하니까, 퇴직 시점이 가까워지면 안정적인 상품으로 옮기는 게 일반적이죠.
      </p>

      <Divider />

      <H2>DC형에서 손실이 났다면 수령액이 줄어드나요?</H2>
      <p style={body}>
        네, DC형은 <strong>운용 리스크를 근로자가 부담</strong>하는 구조예요. 원금보장형 상품에 넣어뒀다면 원금은 보존되지만, 투자형 상품(펀드, ETF 등)은 시장 하락 시 손실이 발생할 수 있죠.
      </p>
      <p style={body}>
        손실이 걱정된다면 퇴직 6개월~1년 전부터 원금보장형(정기예금, 이율보증형 보험 등)으로 운용 상품을 변경하세요. 수익은 적지만 퇴직금이 줄어드는 위험을 피할 수 있어요.
      </p>
      <p style={body}>
        반대로 운용을 잘해서 수익이 난 경우에는 퇴직금이 늘어나요. <a href="/w/퇴직금-DC형-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}>DC형 계산법</a>에서 구체적인 계산 방법을 확인할 수 있죠.
      </p>

      <BorderBox title="DB형과의 핵심 차이">
        DB형: 운용 리스크 → 회사 부담, 퇴직금 = 평균임금 × 근속연수<br />
        DC형: 운용 리스크 → 근로자 부담, 퇴직금 = 적립금 + 운용수익(손실)
      </BorderBox>

      <Divider />

      <H2>DC형 수령 절차에서 주의할 점은?</H2>
      <p style={body}>
        퇴직 직전에 운용 상품을 확인하세요. 펀드나 ETF에 투자 중이라면 환매까지 시간이 걸릴 수 있어요. 해외 펀드는 환매에 영업일 기준 3~5일이 소요되기도 하죠.
      </p>
      <p style={body}>
        회사가 DC형 적립을 제대로 했는지도 점검하세요. 매년 연봉의 1/12 이상을 적립해야 하는데, 미적립분이 있으면 회사에 청구할 수 있어요. 운용사 앱에서 매년 납입 내역을 확인하면 되죠.
      </p>
      <p style={body}>
        IRP 이전 후에는 다시 운용 상품을 선택할 수 있어요. 바로 해지하지 않고 유지한다면, 연금 수령 전까지 원하는 상품으로 운용할 수 있죠. <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 비교 공시에서 운용사별 수익률을 참고하세요.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="DC형 수령 구조를 잘 파악하고 계시네요. 적립금을 확인한 뒤 IRP 이전을 진행하세요."
        partialMatchText="확인이 필요한 항목이 있어요. 운용사나 회사 인사팀에 문의해보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DC형 퇴직금 수령에 관해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
