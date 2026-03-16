"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 DB형(확정급여형) 퇴직연금에 가입해 있어요" },
  { id: "c2", label: "퇴직금은 퇴직 전 3개월 평균임금 × 근속연수로 계산돼요" },
  { id: "c3", label: "IRP 계좌를 개설했거나 예외 대상인지 확인했어요" },
  { id: "c4", label: "퇴직연금 운용사(은행·증권사)가 어디인지 알고 있어요" },
];

const CHECKLIST = [
  "IRP 계좌 개설 — 퇴직 전에 미리 준비",
  "퇴직연금 운용사 확인 — 회사 인사팀에 문의",
  "퇴직금 예상 금액 확인 — 퇴직 전 3개월 평균임금 × 근속연수",
  "퇴직소득원천징수영수증 수령 — 세금 내역 확인",
  "IRP 입금 확인 후 운용 방법 결정 — 해지 or 유지",
];

const FAQS = [
  {
    q: "DB형 퇴직연금 수령은 어떻게 되나요?",
    a: "회사가 퇴직연금 운용사에 지급 지시를 하면, 운용사가 근로자의 IRP 계좌로 입금해요. 본인이 직접 운용사에 청구하는 게 아니죠.",
  },
  {
    q: "DB형 퇴직금 계산은 회사가 하나요?",
    a: "네, DB형은 회사가 퇴직금을 산정해요. 퇴직 전 3개월 평균임금에 근속연수를 곱한 금액이죠. 운용 손익은 회사가 부담하니까 근로자에게는 영향이 없어요.",
  },
  {
    q: "DB형에서 DC형으로 바꿀 수 있나요?",
    a: "회사와 근로자가 합의하면 전환이 가능해요. 다만 전환 시점까지의 퇴직금은 DB형으로 정산하고, 이후부터 DC형이 적용되죠.",
  },
  {
    q: "DB형 퇴직금이 예상보다 적을 수 있나요?",
    a: "평균임금 산정에서 상여금이나 수당이 빠지면 금액이 줄어들 수 있어요. 퇴직소득원천징수영수증을 받아서 직접 확인해보세요.",
  },
  {
    q: "DB형 운용사가 파산하면 퇴직금이 사라지나요?",
    a: "아니에요. 퇴직연금 적립금은 운용사 자산과 분리 보관되니까, 운용사가 파산해도 퇴직금은 보호돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — DB형 퇴직연금 제도", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직연금 제도 비교", url: "https://www.moel.go.kr" },
      { label: "금융감독원 — 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-제도-종류",
    title: "퇴직금 제도 종류 DB형·DC형·IRP 비교",
    description: "DB형과 DC형의 차이, IRP와의 관계를 정리했어요.",
  },
  {
    slug: "dc형-퇴직금-수령방법",
    title: "DC형 퇴직금 수령 방법",
    description: "DC형은 적립금 확인부터 수령까지 절차가 달라요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌 개설 안내",
    description: "IRP 계좌가 왜 필요한지, 어디서 만드는지 알려드려요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="db형-퇴직금-수령방법" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DB형 · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DB형 퇴직금 수령 방법,<br />
        어떻게 받나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;우리 회사가 DB형이라는데, 퇴직금은 어떻게 받나요?&rdquo;
        DB형(확정급여형)은 회사가 퇴직금을 산정하고, 퇴직연금 운용사를 통해 IRP로 입금하는 구조예요.
        근로자가 직접 계산하거나 운용할 필요가 없다는 게 장점이죠. 수령 절차, 세금, 주의할 점을 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DB형 퇴직연금 수령 방법은?</H2>
      <p style={body}>
        DB형은 퇴직 시 회사가 퇴직금을 산정한 뒤, <strong>퇴직연금 운용사</strong>(은행·증권사)에 지급 지시를 내려요. 운용사가 근로자의 <strong>IRP 계좌</strong>로 퇴직금을 입금하는 구조죠.
      </p>
      <p style={body}>
        근로자가 해야 할 일은 IRP 계좌를 미리 개설해두고, 계좌 정보를 회사에 전달하는 것뿐이에요. 퇴직금 산정은 퇴직 전 3개월 평균임금에 근속연수를 곱한 금액이고, 이건 회사 인사팀에서 처리하죠.
      </p>
      <p style={body}>
        IRP에 입금된 뒤에는 바로 해지해서 일시금으로 꺼내거나, 그대로 유지하면서 운용할 수 있어요. 55세 이상이거나 300만 원 이하면 처음부터 일반 계좌로 받을 수 있죠.
      </p>

      <GreenBox title="DB형 수령 흐름">
        퇴직 → 회사가 금액 산정 → 운용사에 지급 지시 → IRP에 입금 → 해지 또는 유지
      </GreenBox>

      <Divider />

      <H2>DB형 수령 시 세금이 어떻게 되나요?</H2>
      <p style={body}>
        IRP로 입금되는 시점에는 세금이 바로 빠지지 않아요. 퇴직소득세가 <strong>유예</strong>되는 거죠. 나중에 IRP를 해지하거나 연금으로 수령할 때 세금이 정산돼요.
      </p>
      <p style={body}>
        일시금으로 꺼내면 퇴직소득세 전액이 부과되고, 연금으로 나눠 받으면 60~70%만 부담해요. 근속연수가 길수록 세금 공제가 커지니까, 장기 근속자일수록 세금 부담이 적어지죠.
      </p>
      <p style={body}>
        55세 이상 등 예외로 일반 계좌에 직접 수령하는 경우에는 회사가 퇴직소득세를 원천징수한 뒤 나머지를 송금해요. 퇴직소득원천징수영수증으로 세금 내역을 확인하세요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>DB형에서 IRP로 이전하는 방법은?</H2>
      <p style={body}>
        별도로 &ldquo;이전&rdquo; 신청을 할 필요는 없어요. 회사가 퇴직연금 운용사에 지급 지시를 내리면 운용사가 IRP 계좌로 자동 입금하는 구조거든요. 근로자가 할 일은 IRP 계좌 정보를 회사에 알려주는 것뿐이죠.
      </p>
      <p style={body}>
        기존에 사용하던 IRP가 있다면 그 계좌로 받으면 되고, 없다면 퇴직 전에 새로 개설하세요. 은행·증권사·보험사 어디서든 모바일로 10분이면 만들 수 있어요.
      </p>
      <p style={body}>
        DC형이나 다른 퇴직연금 적립금을 하나의 IRP로 합칠 수도 있어요. 통합 관리가 편하지만, 운용사별 수수료와 상품이 다르니 비교해보고 결정하세요. <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 퇴직연금 비교 공시에서 확인할 수 있죠.
      </p>

      <Divider />

      <H2>DB형 수령 전 확인해야 할 것들은?</H2>
      <p style={body}>
        가장 먼저 <strong>퇴직금 예상 금액</strong>을 직접 계산해보세요. 퇴직 전 3개월 평균임금 × 근속연수가 기본 공식이에요. 상여금, 연차수당, 식대 등이 평균임금에 포함됐는지 확인하는 게 중요하죠.
      </p>
      <p style={body}>
        <strong>퇴직연금 운용사</strong>가 어디인지도 알아두세요. 회사 인사팀에 물어보면 되고, 운용사에 직접 전화해서 적립금 현황을 확인할 수 있어요. DB형은 운용 손익이 회사 몫이라 근로자에게 영향은 없지만, 절차를 이해해두면 수령이 수월하죠.
      </p>
      <p style={body}>
        퇴직소득원천징수영수증은 반드시 보관하세요. 세금 계산이 맞는지, 평균임금 산정이 정확한지 확인하려면 이 서류가 필요해요. 이상이 있으면 바로 회사에 정정을 요청하세요.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>DB형 수령 시 주의할 점은?</H2>
      <p style={body}>
        DB형은 <strong>운용 리스크를 회사가 부담</strong>해요. 적립금 운용에서 손실이 나더라도 근로자의 퇴직금에는 영향이 없죠. 이게 DC형과 가장 큰 차이예요.
      </p>
      <p style={body}>
        다만 회사가 퇴직연금 적립금을 제대로 쌓지 않으면 문제가 생길 수 있어요. 적립 비율이 법정 기준(현재 100%)에 미달하면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 신고할 수 있죠.
      </p>
      <p style={body}>
        회사가 폐업한 경우에도 퇴직연금 적립금은 운용사에 별도 보관돼 있으니까 수령이 가능해요. 운용사에 직접 연락해서 인출 절차를 밟으면 되죠. 적립금이 부족한 경우에는 체당금 제도를 활용할 수 있어요.
      </p>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="DB형 수령 준비가 잘 되어 있네요. IRP 계좌 정보를 회사에 전달하면 돼요."
        partialMatchText="확인이 필요한 항목이 있어요. 회사 인사팀에 문의해보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DB형 퇴직금 수령에 관해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
