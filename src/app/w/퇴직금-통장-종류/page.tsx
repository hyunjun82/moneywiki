"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 예정이고 어떤 계좌로 받아야 하는지 모르겠어요" },
  { id: "c2", label: "현재 회사의 퇴직연금이 DB형인지 DC형인지 알고 있어요" },
  { id: "c3", label: "은행 IRP와 증권사 IRP의 차이가 궁금해요" },
  { id: "c4", label: "절세에 유리한 통장을 선택하고 싶어요" },
];

const CHECKLIST = [
  "현재 퇴직연금 제도 확인 — DB형인지 DC형인지 회사에 문의",
  "IRP 계좌 개설 여부 확인 — 이미 있는지, 없으면 개설 필요",
  "은행 vs 증권사 비교 — 수수료·상품·앱 편의성",
  "투자 성향 파악 — 안정형(은행) vs 적극형(증권사)",
  "절세 효과 계산 — IRP 연금 수령 시 세금 감면 규모",
];

const FAQS = [
  {
    q: "DB형·DC형 퇴직연금 계좌와 IRP는 다른 건가요?",
    a: "네, 다른 거예요. DB형·DC형은 재직 중 회사가 가입하는 퇴직연금이고, IRP는 퇴직 시 퇴직금을 받는 개인 계좌예요. 퇴직하면 DB형·DC형에서 IRP로 이전되는 구조죠.",
  },
  {
    q: "은행 IRP가 증권사 IRP보다 안전한가요?",
    a: "어디서 개설하든 IRP 자체의 안전성은 같아요. 차이는 운용 상품이에요. 은행은 원금 보장 예금이 주력이고, 증권사는 주식형 상품이 더 다양하죠.",
  },
  {
    q: "이미 DC형 계좌가 있으면 IRP를 따로 만들 필요 없나요?",
    a: "퇴직 시에는 IRP가 별도로 필요해요. DC형 적립금이 IRP로 이전되는 거니까요. 퇴직 전에 IRP를 개설해두면 이전이 수월하죠.",
  },
  {
    q: "통장 종류에 따라 퇴직금 금액이 달라지나요?",
    a: "퇴직금 원금 자체는 같아요. 달라지는 건 운용 수익과 세금이에요. IRP에서 잘 운용하면 수익이 붙고, 연금으로 수령하면 세금이 줄어들죠.",
  },
  {
    q: "통장을 나중에 바꿀 수 있나요?",
    a: "IRP 계좌 이전이 가능해요. 다른 금융기관으로 옮길 수 있고, 이전 시 세금 이연 혜택도 유지되죠. 수수료나 상품이 마음에 안 들면 언제든 이전하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — 퇴직연금 제도 및 IRP", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — 퇴직연금 통합 비교", url: "https://www.fss.or.kr" },
      { label: "고용노동부 — 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-통장",
    title: "퇴직금 통장",
    description: "어떤 계좌로 퇴직금을 받아야 하는지 안내해요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌",
    description: "IRP 계좌의 개념과 개설 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-세금-절세-방법-IRP-연말정산",
    title: "퇴직금 절세 IRP 활용",
    description: "IRP를 활용한 절세 방법을 안내해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-통장-종류" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 통장 종류 · 계좌 비교</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 통장 종류,<br />
        어떤 계좌를 선택해야 할까?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직연금 계좌가 DB, DC, IRP... 종류가 너무 많아서 헷갈려요.&rdquo;<br />
        간단히 정리하면 이래요. DB형과 DC형은 재직 중 회사가 운영하는 퇴직연금이고, IRP는 퇴직할 때 퇴직금을 받는 개인 계좌예요.
        각 계좌의 차이, 은행과 증권사 중 어디가 유리한지, 절세에 좋은 선택은 뭔지 비교해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금을 받을 수 있는 통장 종류는?</H2>
      <p style={body}>
        퇴직금 관련 계좌는 크게 세 가지예요. <strong>DB형(확정급여형)</strong>, <strong>DC형(확정기여형)</strong>, <strong>IRP(개인형 퇴직연금)</strong>이죠. DB형과 DC형은 재직 중에 회사가 가입하는 퇴직연금이고, IRP는 퇴직 시 퇴직금을 받는 개인 계좌예요.
      </p>
      <p style={body}>
        퇴직하면 DB형·DC형 적립금이 IRP로 이전돼요. 그래서 결국 퇴직금을 &ldquo;받는&rdquo; 통장은 <strong>IRP</strong>가 되는 거죠. IRP가 없으면 퇴직금을 받을 수 없으니, 퇴직 전에 반드시 개설해야 해요.
      </p>
      <p style={body}>
        IRP 내에서도 은행, 증권사, 보험사에 따라 운용 가능한 상품과 수수료가 다르니까, 어디서 개설하느냐가 사실상 &ldquo;통장 종류 선택&rdquo;이에요.
      </p>

      <GreenBox title="퇴직금 관련 계좌 3가지">
        <strong>DB형</strong>: 회사가 운용, 퇴직 시 확정된 금액 지급<br />
        <strong>DC형</strong>: 본인이 운용, 적립금+운용수익이 퇴직금<br />
        <strong>IRP</strong>: 퇴직 시 퇴직금을 받는 개인 계좌
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 개설이 필요해요. 은행과 증권사를 비교해서 본인에 맞는 곳을 선택하세요."
        partialMatchText="현재 퇴직연금 제도를 먼저 확인하고, IRP 개설 여부를 결정하세요."
      />

      <Divider />

      <H2>DB형·DC형·IRP 계좌가 다른 건가요?</H2>
      <p style={body}>
        <strong>DB형</strong>은 회사가 적립금을 운용하고, 퇴직 시 정해진 공식(평균임금 × 근속연수)으로 퇴직금을 지급해요. 운용 손실이 나도 회사 책임이라 근로자에게는 영향이 없죠.
      </p>
      <p style={body}>
        <strong>DC형</strong>은 회사가 매년 임금의 1/12 이상을 적립하고, 근로자 본인이 운용해요. 운용 수익이 좋으면 퇴직금이 늘지만, 손실이 나면 줄어들 수 있죠. 운용 리스크가 근로자에게 있는 구조예요.
      </p>
      <p style={body}>
        <strong>IRP</strong>는 퇴직할 때 DB형이든 DC형이든 적립금이 이전되는 계좌예요. 이후 일시금으로 인출하거나 연금으로 수령하죠. IRP도 본인이 운용할 수 있어서 DC형과 비슷한 면이 있어요.
      </p>

      <BorderBox title="핵심 차이 요약">
        <strong>DB형</strong>: 회사 운용, 확정 급여, 운용 위험 = 회사<br />
        <strong>DC형</strong>: 본인 운용, 적립금+수익, 운용 위험 = 본인<br />
        <strong>IRP</strong>: 퇴직 후 수령 계좌, 본인 운용
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>은행 IRP vs 증권사 IRP, 차이가 있나요?</H2>
      <p style={body}>
        <strong>운용 상품</strong>이 가장 큰 차이예요. 은행 IRP는 예금·적금 등 원금 보장 상품이 주력이고, 증권사 IRP는 ETF, 펀드 등 투자 상품이 수백 종류까지 있죠.
      </p>
      <p style={body}>
        <strong>수수료</strong>도 달라요. 최근에는 수수료 무료 IRP가 늘었지만, 금융기관마다 조건이 다르니 비교해야 해요. <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 퇴직연금 비교 서비스를 활용하면 한눈에 볼 수 있죠.
      </p>
      <p style={body}>
        앱 편의성도 고려해보세요. 잔액 확인, 운용 상품 변경, 인출 신청 등을 앱에서 얼마나 편하게 할 수 있는지가 장기적으로 큰 차이를 만들어요.
      </p>

      <Divider />

      <H2>어떤 통장이 절세에 유리한가요?</H2>
      <p style={body}>
        어떤 금융기관이든 IRP로 받으면 절세 효과는 동일해요. 연금으로 수령하면 퇴직소득세가 30~40% 줄어드는 건 IRP 자체의 혜택이니까요.
      </p>
      <p style={body}>
        차이가 나는 건 <strong>운용 수익에 대한 세금</strong>이에요. IRP 안에서 발생한 운용 수익은 인출 시까지 과세가 이연되죠. 연금으로 받으면 연금소득세(3.3~5.5%)만 부과되니, 일반 금융소득세(15.4%)보다 훨씬 낮아요.
      </p>
      <p style={body}>
        세액공제도 빼놓을 수 없어요. IRP에 추가 납입하면 연간 최대 900만 원까지 세액공제(16.5% 또는 13.2%)를 받을 수 있죠. 퇴직금 수령과 별개로 추가 납입 혜택을 활용하면 절세 효과가 극대화돼요.
      </p>

      <Divider />

      <H2>통장 종류 선택 시 주의할 점은?</H2>
      <p style={body}>
        &ldquo;수수료 무료&rdquo;만 보고 결정하지 마세요. 무료 기간이 1~3년이고 이후 수수료가 부과되는 경우가 있어요. 장기적으로 유지할 계좌이니까 이후 수수료까지 확인하세요.
      </p>
      <p style={body}>
        운용 상품이 본인 성향에 맞는지도 중요해요. 투자에 관심 없고 안전하게 보관만 하고 싶다면 은행 예금형 IRP가 편하죠. 적극적으로 운용하고 싶다면 증권사가 선택지가 넓어요.
      </p>
      <p style={body}>
        금융기관 변경(계좌 이전)이 가능하니까 너무 고민하지 마세요. 일단 개설하고 사용해보다가 마음에 안 들면 다른 곳으로 옮기면 돼요. 이전 시 세금 혜택은 유지되니 부담이 없죠.
      </p>

      <SectionBadge>통장 선택 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 통장 종류에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 금융 상품 조건은 변동될 수 있으니, 가입 금융기관에 직접 확인하세요." />
    </ArticleLayout>
  );
}
