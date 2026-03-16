"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "곧 퇴직 예정이고 퇴직금을 받을 통장이 필요해요" },
  { id: "c2", label: "IRP 계좌를 아직 개설하지 않았어요" },
  { id: "c3", label: "어떤 통장이 세금 면에서 유리한지 궁금해요" },
  { id: "c4", label: "일시금으로 바로 쓸지 연금으로 받을지 고민 중이에요" },
];

const CHECKLIST = [
  "IRP 계좌 개설 — 퇴직 전 미리 개설 (은행·증권사·보험사)",
  "수수료 비교 — 금융기관별 IRP 수수료 차이 확인",
  "운용 상품 확인 — 예금, 펀드, ETF 등 가능 상품 비교",
  "예외 대상 확인 — 55세 이상, 300만 원 이하 등 IRP 면제 여부",
  "수령 방식 결정 — 일시금 인출 vs 연금 수령 비교",
];

const FAQS = [
  {
    q: "일반 예금 통장으로 퇴직금을 받을 수 있나요?",
    a: "원칙적으로 IRP 계좌로 받아야 해요. 다만 55세 이상 퇴직자, 퇴직금 300만 원 이하, 기타 법정 예외에 해당하면 일반 통장으로 받을 수 있죠.",
  },
  {
    q: "IRP에 넣으면 바로 꺼낼 수 없나요?",
    a: "꺼낼 수 있어요. IRP에 입금된 후 일시금 인출을 신청하면 되죠. 다만 퇴직소득세가 원천징수되고, 연금으로 수령할 때의 세금 감면 혜택은 사라져요.",
  },
  {
    q: "퇴직금 전용 통장이 따로 있나요?",
    a: "별도의 '퇴직금 전용 통장'은 없어요. IRP가 사실상 퇴직금 수령 전용 계좌 역할을 하죠. IRP 외에 퇴직금만을 위한 특별한 통장은 존재하지 않아요.",
  },
  {
    q: "IRP 계좌가 여러 개여도 되나요?",
    a: "네, 여러 금융기관에 IRP를 개설할 수 있어요. 다만 퇴직금은 한 곳의 IRP로만 받게 되니, 가장 유리한 계좌를 선택해서 회사에 알려주세요.",
  },
  {
    q: "통장 선택에 따라 세금이 달라지나요?",
    a: "IRP로 받으면 세금 이연·감면 혜택이 있고, 일반 통장으로 받으면 바로 퇴직소득세가 부과돼요. 같은 퇴직금이라도 수령 통장에 따라 세금 차이가 생기죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — IRP 이체 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — IRP 계좌 비교", url: "https://www.fss.or.kr" },
      { label: "고용노동부 — 퇴직급여 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-통장-만들기",
    title: "퇴직금 통장 만들기",
    description: "IRP 계좌 개설 방법과 은행별 혜택을 안내해요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌",
    description: "IRP가 뭔지, 꼭 만들어야 하는지 안내해요.",
  },
  {
    slug: "퇴직금-수령방법",
    title: "퇴직금 수령 방법",
    description: "일시금과 연금 수령의 장단점을 비교해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-통장" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 통장 · IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 통장,<br />
        어떤 계좌로 받아야 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금을 내 월급 통장으로 받으면 안 되나요?&rdquo;<br />
        원칙적으로 안 돼요. 2022년부터 퇴직금은 <strong>IRP(개인형 퇴직연금) 계좌</strong>로 받는 게 의무예요.
        일반 통장 수령이 가능한 예외, IRP와 일반 통장의 세금 차이, 어떤 통장을 선택해야 하는지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금을 받을 수 있는 통장 종류는?</H2>
      <p style={body}>
        크게 두 가지예요. <strong>IRP 계좌</strong>와 <strong>일반 예금 통장</strong>이죠. 원칙은 IRP이고, 일반 통장은 예외적으로만 가능해요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에서 IRP 이체를 의무로 정하고 있거든요.
      </p>
      <p style={body}>
        IRP는 은행, 증권사, 보험사에서 개설할 수 있어요. 어디서 만들든 퇴직금 수령 기능은 동일하고, 차이가 나는 건 수수료와 운용 가능 상품이에요. 개설 전에 비교하는 게 유리하죠.
      </p>
      <p style={body}>
        IRP 외에 &ldquo;퇴직금 전용 통장&rdquo; 같은 건 없어요. IRP 자체가 퇴직금을 받기 위한 계좌라고 보면 돼요. 일반 적금이나 예금 통장과는 성격이 다르죠.
      </p>

      <GreenBox title="퇴직금 수령 가능 통장">
        <strong>원칙</strong>: IRP(개인형 퇴직연금) 계좌<br />
        <strong>예외</strong>: 일반 예금 통장 (55세 이상, 300만 원 이하 등)
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌를 미리 개설해두세요. 퇴직 전에 준비하면 수령이 지연되지 않아요."
        partialMatchText="IRP 의무 여부를 먼저 확인하세요. 예외에 해당하면 일반 통장도 가능해요."
      />

      <Divider />

      <H2>IRP 통장과 일반 통장, 뭐가 다른가요?</H2>
      <p style={body}>
        가장 큰 차이는 <strong>세금</strong>이에요. IRP로 받으면 퇴직소득세가 이연(뒤로 미뤄짐)되고, 연금으로 수령하면 세금이 30~40% 줄어들죠. 일반 통장으로 받으면 바로 퇴직소득세 전액이 부과돼요.
      </p>
      <p style={body}>
        IRP는 <strong>운용</strong>이 가능해요. 입금된 퇴직금을 예금, 펀드, ETF 등에 투자해서 수익을 낼 수 있죠. 일반 통장은 그냥 보통예금이니까 이자가 거의 없어요.
      </p>
      <p style={body}>
        다만 IRP에서 돈을 꺼내려면 <strong>인출 절차</strong>가 필요해요. 일반 통장처럼 ATM에서 바로 인출할 수 없고, 금융기관에 인출 신청을 해야 하죠. 1~3영업일이면 처리되지만 자유도는 일반 통장보다 낮아요.
      </p>

      <BorderBox title="한눈에 비교">
        <strong>IRP</strong>: 세금 이연/감면, 운용 가능, 인출 절차 필요<br />
        <strong>일반 통장</strong>: 세금 즉시 부과, 운용 불가, 자유 인출
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 전용 통장이 따로 있나요?</H2>
      <p style={body}>
        따로 없어요. &ldquo;퇴직금 전용 통장&rdquo;이라는 이름의 상품은 존재하지 않죠. IRP가 사실상 퇴직금 수령 전용 계좌 역할을 하는 거예요.
      </p>
      <p style={body}>
        간혹 &ldquo;퇴직 적금&rdquo;이나 &ldquo;퇴직 플랜&rdquo;이라는 이름의 금융 상품이 있는데, 이건 개인이 자발적으로 가입하는 저축 상품이에요. 회사가 지급하는 퇴직금을 받는 계좌와는 다르죠.
      </p>
      <p style={body}>
        퇴직 전에 IRP를 개설해두면 별도의 통장을 고민할 필요가 없어요. <a href="/w/퇴직금-통장-만들기" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 통장 만들기</a>에서 개설 방법을 자세히 안내하고 있으니 참고하세요.
      </p>

      <Divider />

      <H2>통장 선택 시 세금 차이가 있나요?</H2>
      <p style={body}>
        IRP로 받으면 퇴직소득세를 <strong>나중에</strong> 내고, 연금으로 수령하면 <strong>30~40% 적게</strong> 내요. 일반 통장으로 받으면 퇴직소득세를 <strong>바로 전액</strong> 내죠. 같은 퇴직금이라도 통장에 따라 실수령액이 달라요.
      </p>
      <p style={body}>
        예를 들어 퇴직소득세가 200만 원이면, IRP에서 연금으로 받으면 약 120~140만 원만 내면 돼요. 일반 통장이면 200만 원 전액이 빠지죠. 60~80만 원 차이가 나는 셈이에요.
      </p>
      <p style={body}>
        퇴직금이 클수록 세금 차이도 커져요. 수천만 원 단위의 퇴직금이라면 IRP 활용 여부에 따라 수십~수백만 원의 절세가 가능하죠. 당장 목돈이 필요하지 않다면 IRP가 압도적으로 유리해요.
      </p>

      <Divider />

      <H2>퇴직금 통장 개설 방법은?</H2>
      <p style={body}>
        IRP 계좌는 은행, 증권사, 보험사에서 개설할 수 있어요. 온라인(앱)으로도 가능하고, 지점 방문으로도 되죠. 신분증만 있으면 10~20분이면 개설 완료예요.
      </p>
      <p style={body}>
        개설할 때 수수료와 운용 상품을 비교하세요. 은행 IRP는 원금 보장 상품(예금)이 다양하고, 증권사 IRP는 ETF·펀드 선택지가 넓어요. 본인 투자 성향에 맞는 곳을 고르면 되죠.
      </p>
      <p style={body}>
        퇴직 전에 미리 개설하고 계좌 번호를 회사 인사팀에 알려주세요. 퇴사 후에 급하게 개설하면 퇴직금 입금이 늦어질 수 있어요. 여유 있게 준비하는 게 좋죠.
      </p>

      <SectionBadge>통장 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 통장에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 금융 상품 조건은 변동될 수 있으니, 가입 금융기관에 확인하세요." />
    </ArticleLayout>
  );
}
