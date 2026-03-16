"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "2022년 4월 이후 퇴직하는 근로자예요" },
  { id: "c2", label: "퇴직금이 300만 원을 초과해요" },
  { id: "c3", label: "만 55세 미만이에요" },
  { id: "c4", label: "아직 IRP 계좌를 개설하지 않았어요" },
];

const CHECKLIST = [
  "IRP 개설 금융사 비교 — 수수료, 운용 상품 확인",
  "모바일 앱으로 개설 — 은행·증권사·보험사 모두 가능",
  "개설 후 계좌 정보를 회사에 전달",
  "퇴직금 입금 후 운용 방법 결정 — 해지 or 유지",
  "추가 납입 여부 결정 — 세액공제 혜택 활용",
];

const FAQS = [
  {
    q: "IRP 계좌가 뭔가요?",
    a: "개인형퇴직연금(Individual Retirement Pension) 계좌예요. 퇴직금을 받거나 추가 납입해서 노후 자금을 운용하는 전용 계좌죠.",
  },
  {
    q: "퇴직금을 받으려면 IRP가 필수인가요?",
    a: "2022년 4월부터 원칙적으로 필수예요. 다만 55세 이상이거나 퇴직금이 300만 원 이하면 일반 계좌로 받을 수 있죠.",
  },
  {
    q: "IRP 계좌는 어디서 만드나요?",
    a: "은행, 증권사, 보험사 어디서든 개설할 수 있어요. 모바일 앱으로 10분이면 만들 수 있죠.",
  },
  {
    q: "IRP 계좌 수수료는 얼마인가요?",
    a: "대부분의 금융사에서 온라인 개설 시 수수료를 면제해줘요. 영업점 방문 시에도 수수료 무료인 곳이 많죠. 운용 보수는 상품마다 다르니 비교해보세요.",
  },
  {
    q: "IRP 없이 퇴직금을 받는 방법이 있나요?",
    a: "55세 이상, 퇴직금 300만 원 이하, 사망 등 예외 사유에 해당하면 일반 계좌로 받을 수 있어요. 그 외에는 IRP가 필요하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — IRP 의무 가입", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — IRP 비교공시", url: "https://www.fss.or.kr" },
      { label: "고용노동부 — 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-irp-의무",
    title: "퇴직금 IRP 의무 가입 대상",
    description: "IRP 의무 가입이 누구에게 적용되는지 정리했어요.",
  },
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 방법",
    description: "IRP에 들어온 퇴직금을 꺼내는 절차를 안내해요.",
  },
  {
    slug: "퇴직금-irp-의무-예외",
    title: "퇴직금 IRP 의무 예외 조건",
    description: "IRP 없이 받을 수 있는 예외 조건을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-IRP-계좌" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 계좌개설</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 계좌,<br />
        꼭 만들어야 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금 받으려면 IRP 계좌가 필요하다는데, 진짜 꼭 만들어야 하나요?&rdquo;
        2022년 4월부터 퇴직금은 원칙적으로 IRP 계좌로 입금돼요. 예외가 있긴 하지만, 대부분의 근로자에게는 필수죠.
        IRP가 뭔지, 어디서 만드는지, 수수료는 얼마인지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 계좌가 뭔가요?</H2>
      <p style={body}>
        IRP는 <strong>개인형퇴직연금</strong>(Individual Retirement Pension)의 약자예요. 퇴직금을 받는 전용 계좌이면서, 추가 납입으로 노후 자금을 운용할 수 있는 계좌이기도 하죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a> 개정으로 2022년 4월부터 퇴직금은 IRP로 지급하는 게 원칙이 됐어요. 퇴직금을 IRP에 넣으면 세금이 유예되고, 연금으로 나눠 받을 때 세금이 줄어드는 혜택이 있죠.
      </p>
      <p style={body}>
        IRP는 퇴직금 수령 외에도 연간 최대 900만 원까지 추가 납입할 수 있어요. 이 금액에 대해 세액공제(13.2~16.5%)를 받을 수 있으니, 연말정산 절세 수단으로도 활용되죠.
      </p>

      <GreenBox title="IRP 계좌의 두 가지 기능">
        1. 퇴직금 수령 계좌 → 퇴직소득세 유예, 연금 수령 시 절세<br />
        2. 추가 납입 계좌 → 연간 900만 원 한도, 세액공제 혜택
      </GreenBox>

      <Divider />

      <H2>퇴직금을 받으려면 IRP가 필수인가요?</H2>
      <p style={body}>
        원칙적으로 <strong>필수</strong>예요. 2022년 4월 이후 퇴직하는 근로자는 퇴직금을 IRP로 받도록 법이 정하고 있죠. 회사가 직접 근로자의 일반 계좌로 송금하는 건 원칙적으로 안 돼요.
      </p>
      <p style={body}>
        다만 <strong>예외</strong>가 있어요. 만 55세 이상인 경우, 퇴직금이 300만 원 이하인 경우, 근로자가 사망한 경우 등에는 IRP 없이 일반 계좌로 받을 수 있죠. <a href="/w/퇴직금-irp-의무-예외" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 의무 예외</a>에 해당하는지 먼저 확인해보세요.
      </p>
      <p style={body}>
        예외에 해당하지 않는다면 퇴직 전에 IRP를 만들어두세요. 퇴직 후에 급하게 개설하면 퇴직금 지급이 며칠 늦어질 수 있으니까요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 계좌는 어디서 만드나요?</H2>
      <p style={body}>
        <strong>은행, 증권사, 보험사</strong> 어디서든 개설할 수 있어요. 국민은행, 하나은행 같은 시중 은행은 물론이고, 미래에셋증권, 삼성생명 같은 곳에서도 만들 수 있죠.
      </p>
      <p style={body}>
        모바일 앱으로 개설하면 10분이면 끝나요. 앱에서 &ldquo;IRP 개설&rdquo; 메뉴를 찾아 본인 인증을 하고 약관에 동의하면 바로 계좌가 만들어지죠.
      </p>
      <p style={body}>
        금융사마다 운용 가능한 상품과 수수료가 달라요. <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 퇴직연금 비교공시에서 수수료율과 운용 수익률을 비교해보고 선택하세요.
      </p>

      <Divider />

      <H2>IRP 계좌 수수료는 얼마인가요?</H2>
      <p style={body}>
        대부분의 금융사에서 <strong>온라인 개설 시 수수료를 면제</strong>해줘요. 연간 운용 보수도 0%인 곳이 많아졌죠. 과거에는 연 0.2~0.5%의 운용 보수를 받았지만, 경쟁이 치열해지면서 무료로 전환한 곳이 대부분이에요.
      </p>
      <p style={body}>
        다만 IRP 내에서 가입하는 <strong>개별 상품</strong>(펀드, ETF 등)에는 별도 보수가 붙어요. 인덱스 펀드나 ETF는 보수가 낮고, 액티브 펀드는 상대적으로 높죠. 원금보장형(정기예금)은 보수가 없어요.
      </p>
      <p style={body}>
        수수료가 0원이라고 해서 무조건 좋은 건 아니에요. 운용 가능한 상품 라인업, 앱 편의성, 고객센터 응대 등도 같이 비교해보세요.
      </p>

      <Divider />

      <H2>IRP 없이 퇴직금을 받는 방법이 있나요?</H2>
      <p style={body}>
        예외 조건에 해당하면 일반 계좌로 바로 받을 수 있어요. <strong>만 55세 이상</strong>, <strong>퇴직금 300만 원 이하</strong>, 근로자 사망, 담보대출 상계 등이 예외 사유죠.
      </p>
      <p style={body}>
        예외에 해당하면 회사에 일반 계좌 정보를 알려주세요. 회사가 퇴직소득세를 원천징수한 뒤 나머지 금액을 직접 송금해요. IRP를 개설할 필요가 없죠.
      </p>
      <p style={body}>
        예외에 해당하는지 확실하지 않다면 회사 인사팀이나 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 문의하세요. 잘못 판단하면 퇴직금 지급이 지연될 수 있으니까요.
      </p>

      <SectionBadge>IRP 개설 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 개설이 필요한 상황이에요. 퇴직 전에 미리 만들어두세요."
        partialMatchText="예외에 해당할 수 있어요. 해당 조건을 확인한 뒤 IRP 개설 여부를 결정하세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 IRP 계좌에 관해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 금융감독원(fss.or.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
