"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 예정이거나 퇴직금 수령 방식을 고민 중이에요" },
  { id: "c2", label: "일시금 수령을 계획하고 있어요" },
  { id: "c3", label: "연금 의무화가 나에게 영향을 주는지 궁금해요" },
  { id: "c4", label: "IRP 계좌 개설을 아직 안 했어요" },
];

const CHECKLIST = [
  "현재 퇴직연금 제도 확인 — DB형인지 DC형인지 파악",
  "IRP 계좌 확인 — 개설 여부 및 운용 상태 점검",
  "의무화 시행 시점 확인 — 정부 발표 모니터링",
  "예외 대상 확인 — 55세 이상·소액 퇴직금 등",
  "수령 방식 비교 — 일시금 vs 연금 세금 차이 계산",
];

const FAQS = [
  {
    q: "연금 의무화가 확정됐나요?",
    a: "2026년 3월 기준, 퇴직금 전액 연금 의무화는 아직 확정되지 않았어요. 정부가 논의 중이고, 구체적인 시행 시점은 법 개정 후에 결정되죠.",
  },
  {
    q: "의무화되면 일시금을 아예 못 받나요?",
    a: "완전 의무화가 되더라도 예외 규정이 있을 가능성이 높아요. 주택 구입, 질병 치료 등 급하게 목돈이 필요한 경우에는 일시금 수령이 허용될 수 있죠.",
  },
  {
    q: "이미 퇴직한 사람도 영향을 받나요?",
    a: "보통 법 시행일 이후 퇴직하는 사람부터 적용돼요. 이미 퇴직해서 일시금을 받은 사람에게는 소급 적용하지 않는 게 일반적이죠.",
  },
  {
    q: "연금 의무화에 대비해서 뭘 준비하면 되나요?",
    a: "IRP 계좌를 미리 만들어두세요. 어떤 방식으로든 퇴직금이 IRP를 거치게 되니까요. 운용 상품과 수수료를 비교해서 유리한 금융기관을 선택하는 게 좋아요.",
  },
  {
    q: "소액 퇴직금도 연금으로 받아야 하나요?",
    a: "현재 IRP 의무 이체 예외 기준이 있어요(300만 원 이하 등). 연금 의무화가 시행되더라도 소액에 대해서는 예외가 유지될 가능성이 높죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — 퇴직연금 수령 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직연금 제도 개편 논의", url: "https://www.moel.go.kr" },
      { label: "금융감독원 — 퇴직연금 가이드", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-연금-전환",
    title: "퇴직금 연금 전환",
    description: "연금으로 전환하는 방법과 세금 혜택을 정리했어요.",
  },
  {
    slug: "퇴직금-irp-지급-의무화",
    title: "IRP 지급 의무화",
    description: "퇴직금 IRP 의무 이체 제도를 안내해요.",
  },
  {
    slug: "퇴직금-일시금-수령-방법",
    title: "퇴직금 일시금 수령",
    description: "일시금으로 받는 방법과 세금을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-연금-의무화-언제부터"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 연금 의무화 · 제도 변경</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 연금 의무화,<br />
        언제부터 어떻게 바뀌나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금을 나중에는 무조건 연금으로만 받아야 한다는데, 사실인가요?&rdquo;<br />
        아직 확정된 건 아니에요. 정부가 퇴직금의 연금화 비율을 높이는 방안을 논의 중이지만, 전면 의무화 시행 시점은 정해지지 않았죠.
        현재 제도가 어떻게 되어 있고, 의무화되면 무엇이 바뀌는지, 지금 준비할 건 뭔지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 연금 의무화가 언제부터인가요?</H2>
      <p style={body}>
        2026년 3월 현재, 퇴직금 전액 연금 의무화는 <strong>확정되지 않았어요</strong>. 정부가 &ldquo;퇴직연금의 연금 수령 비율을 높이겠다&rdquo;는 방향을 제시했지만, 구체적인 법안이 국회를 통과한 건 아니죠.
      </p>
      <p style={body}>
        현재까지의 변화를 보면, 2022년부터 퇴직금을 <strong>IRP 계좌로 의무 이체</strong>하도록 바뀌었어요. 이건 &ldquo;연금 의무화&rdquo;와는 다른데, IRP에 넣기는 하되 일시금으로 바로 인출할 수 있거든요. 실질적 연금 전환 의무는 아직 없는 셈이죠.
      </p>
      <p style={body}>
        다만 장기적으로 연금 수령을 유도하는 정책이 강화되는 추세예요. 연금으로 받으면 세금 혜택을 주고, 일시금으로 받으면 혜택을 줄이는 방식이 점점 확대되고 있죠.
      </p>

      <GreenBox title="현재 상황 정리 (2026년 3월 기준)">
        <strong>IRP 이체 의무</strong>: 시행 중 (2022년~)<br />
        <strong>연금 수령 의무</strong>: 미확정 (논의 중)<br />
        <strong>절세 유도</strong>: 연금 수령 시 퇴직소득세 30~40% 감면
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="아직 의무화가 확정되지 않았지만, IRP 계좌 준비는 미리 해두는 게 좋아요."
        partialMatchText="퇴직 예정이라면 IRP 개설과 수령 방식 비교를 먼저 진행하세요."
      />

      <Divider />

      <H2>의무화되면 일시금 수령이 안 되나요?</H2>
      <p style={body}>
        완전 의무화가 시행된다 해도 <strong>예외 규정</strong>이 있을 가능성이 높아요. 무주택자의 주택 구입, 6개월 이상 요양, 파산 등 긴급한 상황에서는 일시금 인출을 허용하는 게 국제적 추세이기도 하죠.
      </p>
      <p style={body}>
        참고로 호주, 싱가포르 같은 나라에서는 퇴직연금의 연금 수령을 의무화하면서도 주택 구입이나 의료비 사유에 한해 조기 인출을 허용하고 있어요. 한국에서도 비슷한 방향이 될 거라는 관측이 많죠.
      </p>
      <p style={body}>
        현재로서는 걱정보다 <strong>준비</strong>가 중요해요. IRP 계좌를 만들어두고, 일시금과 연금의 세금 차이를 미리 계산해놓으면 어떤 제도 변경에도 대응할 수 있죠.
      </p>

      <BorderBox title="일시금이 꼭 필요하다면">
        연금 의무화 시행 전에 퇴직하면 현행 제도가 적용돼요.<br />
        시행 후에도 법정 사유(주택·질병 등)에 해당하면 일시금 인출이 가능할 전망이에요.<br />
        급하지 않다면 연금 수령이 세금 면에서 유리하니 비교해보세요.
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>현재 일시금 수령 중인 사람은 어떻게 되나요?</H2>
      <p style={body}>
        이미 퇴직해서 일시금을 받은 사람에게 소급 적용하진 않아요. 법이 바뀌더라도 시행일 이후 퇴직하는 사람부터 적용되는 게 원칙이죠.
      </p>
      <p style={body}>
        현재 IRP에 퇴직금이 들어와 있고 아직 인출하지 않은 상태라면, 의무화 시행 전에 일시금으로 뺄 수 있어요. 다만 세금 차이를 따져보고 결정하세요. 연금으로 받으면 세금이 30~40% 줄어드니까요.
      </p>
      <p style={body}>
        퇴직 예정이라면 제도 변경 시점을 주시하면서 IRP 계좌를 미리 준비해두세요. 어떤 방식으로든 퇴직금은 IRP를 거치게 되니까, 수수료가 낮고 운용 상품이 다양한 금융기관을 비교하는 게 좋아요.
      </p>

      <Divider />

      <H2>의무화에 대비해 준비할 것들은?</H2>
      <p style={body}>
        첫째, <strong>IRP 계좌를 개설</strong>하세요. 이미 퇴직금 수령 시 IRP 이체가 의무이니까, 아직 없다면 지금 만들어두는 게 좋아요. 은행, 증권사, 보험사에서 개설 가능하고 수수료와 운용 상품을 비교해서 선택하세요.
      </p>
      <p style={body}>
        둘째, <strong>일시금 vs 연금 세금 차이</strong>를 미리 계산해보세요. 홈택스 모의계산이나 금융기관 상담을 통해 내 퇴직금 규모에서 세금 차이가 얼마나 나는지 파악해두면 의사결정이 수월하죠.
      </p>
      <p style={body}>
        셋째, <strong>정부 발표를 주시</strong>하세요. 고용노동부와 기획재정부에서 퇴직연금 개편 관련 발표를 할 때마다 시행 시점과 예외 규정이 구체화돼요. <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 홈페이지에서 관련 보도자료를 확인할 수 있죠.
      </p>

      <SectionBadge>대비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>연금 의무화 예외 대상이 있나요?</H2>
      <p style={body}>
        현재 IRP 이체 의무에도 예외가 있으니, 연금 의무화가 시행되더라도 예외 규정이 있을 거예요. <strong>55세 이상</strong>으로 퇴직하는 사람, <strong>퇴직금이 소액</strong>(300만 원 이하 등)인 경우가 대표적인 예외 후보죠.
      </p>
      <p style={body}>
        해외 사례를 보면 일정 연령 이상이면 일시금 수령을 허용하는 경우가 많아요. 은퇴 후 바로 생활비로 써야 하는 상황을 감안한 거죠. 한국에서도 비슷한 기준이 적용될 가능성이 높아요.
      </p>
      <p style={body}>
        예외 대상인지 아닌지는 법 확정 후에나 정확히 알 수 있어요. 지금은 &ldquo;IRP를 준비해두고, 일시금과 연금의 장단점을 모두 파악해두는 것&rdquo;이 가장 현실적인 대비 방법이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 연금 의무화에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 정보를 바탕으로 작성됐어요. 연금 의무화는 미확정 상태이며, 최신 동향은 고용노동부(moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
