"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "IRP 계좌에 퇴직금이 입금됐어요" },
  { id: "c2", label: "만 55세 이상이에요" },
  { id: "c3", label: "IRP 가입 후 5년 이상 지났어요" },
  { id: "c4", label: "연금 형태로 10년 이상 나눠 받을 계획이에요" },
];

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "퇴직금 예상액",
    min: 500,
    max: 20000,
    step: 500,
    defaultValue: 5000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "tenure",
    label: "근속연수",
    min: 1,
    max: 40,
    step: 1,
    defaultValue: 10,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "일시금 퇴직소득세 추정 (5% 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.05),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 시 절세액 (30% 감면 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.05 * 0.3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: false,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "IRP 수령 신청서", required: true, where: "금융기관 앱 또는 창구" },
  { name: "공동인증서 또는 금융인증서", required: true, where: "앱 또는 은행 창구" },
  { name: "연금 수령 개시 신청서 (연금 선택 시)", required: false, where: "금융기관 앱 또는 창구" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "전 직장 인사팀" },
];

const STEPS = [
  {
    title: "IRP 계좌 입금 확인",
    desc: "퇴직 후 14일 이내에 IRP 계좌로 퇴직금이 들어와야 해요. 금융기관 앱에서 입금 내역을 확인하세요. 14일이 지나도 입금이 없으면 인사팀에 요청하고, 그래도 안 되면 고용노동부(☎ 1350)에 신고할 수 있어요.",
    tip: "퇴직 후 14일 초과 시 연 20% 지연이자 발생",
  },
  {
    title: "수령 방법 결정 (일시금 vs 연금)",
    desc: "일시금은 즉시 꺼낼 수 있지만 퇴직소득세를 전액 납부해요. 연금은 55세 이후 5년 이상 나눠 받으면 퇴직소득세가 30% 줄고, 10년 이상 받으면 40% 줄어요. 목돈이 급하게 필요한 경우가 아니라면 연금이 유리해요.",
    tip: "연금 수령: 5년 이상 30% 감면, 10년 이상 40% 감면",
  },
  {
    title: "수령 신청서 작성 및 제출",
    desc: "금융기관 앱 또는 창구에서 수령 방법을 선택하고 신청서를 제출해요. 연금 수령을 선택하면 개시 시점과 수령 기간을 함께 설정해야 해요. 앱으로 처리하면 보통 당일 또는 다음 영업일에 완료돼요.",
    tip: "연금 개시 시점은 만 55세 이후 원하는 날로 설정 가능",
    link: { label: "금융감독원 IRP 안내", href: "https://www.fss.or.kr" },
  },
  {
    title: "세금 원천징수 후 수령",
    desc: "일시금은 신청 즉시 퇴직소득세가 빠진 금액이 입금돼요. 연금은 매월(또는 분기별) 연금소득세 3.3~5.5%를 제한 금액이 들어와요. 세후 실수령액이 얼마인지 미리 계산해두면 재정 계획 세우기가 쉬워요.",
    tip: "연금소득세 3.3~5.5%는 퇴직소득세보다 훨씬 낮아요",
  },
];

const CHECKLIST = [
  "입금 확인: 퇴직 후 14일 이내 IRP 계좌 입금 여부 체크",
  "수령 방법 결정: 목돈 필요 여부 따라 일시금/연금 선택",
  "연금 조건 확인: 만 55세 이상 + IRP 가입 5년 이상",
  "세금 계산: 일시금(퇴직소득세 전액) vs 연금(30~40% 감면)",
  "금융기관 앱 접속: 신청서 작성 전 공동인증서 준비",
  "수수료 확인: 증권사 IRP는 운용 수수료 연 0.2% 수준",
];

const FAQS = [
  {
    q: "IRP 계좌로 퇴직금이 들어오면 바로 꺼낼 수 있나요?",
    a: "꺼낼 수는 있어요. 다만 55세 이전에 일시금으로 꺼내면 기타소득세 16.5%가 원금 전체에 붙어요. 55세 이후에 연금으로 수령하면 퇴직소득세가 30~40% 줄어들기 때문에, 급하게 필요한 돈이 아니라면 55세까지 기다리는 게 훨씬 유리해요.",
  },
  {
    q: "연금 수령 조건인 '5년 이상'은 IRP 가입 기간을 말하나요?",
    a: "맞아요. IRP 계좌를 처음 개설한 날부터 5년이 지나야 연금 수령이 가능해요. 퇴직 직전에 IRP를 만든 경우라면 가입일 기준으로 5년이 지난 뒤 연금을 신청해야 해요.",
  },
  {
    q: "퇴직금 300만원 미만이면 IRP 말고 일반 계좌로 받을 수 있나요?",
    a: "가능해요. 퇴직급여가 300만원 미만이거나 법정 퇴직금(퇴직연금 미가입 사업장)이라면 일반 계좌로 받을 수 있어요. 다만 IRP로 받으면 과세가 이연돼서 나중에 연금 수령 시 세금이 줄어드는 혜택이 있어요.",
  },
  {
    q: "연금 수령 중에 일부를 일시금으로 꺼낼 수 있나요?",
    a: "원칙적으로 어려워요. 연금 개시 이후에는 설정된 수령 계획대로 받는 게 기본이에요. 부득이한 사유(무주택자 주택 구입, 6개월 이상 요양 등)가 있으면 일부 중도 인출이 가능하지만, 그 부분에는 기타소득세가 붙어요.",
  },
  {
    q: "IRP 계좌를 여러 개 갖고 있으면 합산해서 연금을 받을 수 있나요?",
    a: "각 계좌별로 별도 관리돼요. 한 계좌에서 연금 개시를 신청하면 그 계좌의 잔액 기준으로 수령 계획이 잡혀요. 여러 계좌를 한 곳으로 합칠 수 있는 IRP 이전 서비스를 이용하면 관리가 편해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: IRP 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제22조: 퇴직소득세 계산", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 퇴직연금 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직급여 제도", url: "https://www.moel.go.kr" },
      { label: "금융감독원 금융상품한눈에: IRP 수수료 비교", url: "https://finlife.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "IRP 퇴직금 수령 방법", description: "계좌 개설부터 이체 확인까지 4단계." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "수수료 비교부터 개설 절차까지." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 연금 수령 시 절세 효과 계산." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="irp-계좌-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 연금수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP 계좌에 퇴직금이 들어왔는데 어떻게 받나요?<br />
        일시금 vs 연금 선택부터 신청 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 들어왔는데
        이걸 어떻게 꺼내야 하는지 막막하죠. 그냥 꺼내면 세금을 다 내야 하고, 연금으로 받으면 절세가 되는데 조건이 뭔지도 헷갈리고요.
        일시금과 연금 중 어떤 걸 선택하느냐에 따라 세금 차이가 수백만 원까지 날 수 있어요.
        수령 방법 선택부터 신청 절차까지 순서대로 짚어드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연금 수령 조건, 내가 해당되나요?</H2>
      <p style={body}>
        IRP 퇴직금을 연금으로 받으려면 두 가지 조건을 동시에 갖춰야 해요.
        만 55세 이상이어야 하고, IRP 계좌에 가입한 지 5년 이상 지나야 해요.
        이 두 조건을 모두 충족해야 <a href="/w/퇴직금-소득세" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a> 30~40% 감면 혜택을 받을 수 있어요.
      </p>
      <p style={body}>
        55세 이전에 꺼내면 감면 혜택 없이 세금을 전액 내야 해요.
        55세가 됐어도 IRP 가입 5년이 안 됐다면 연금 개시를 미뤄야 해요.
        IRP를 퇴직 직전에 만든 경우라면 가입일 기준으로 5년이 지난 뒤 신청하세요.
      </p>

      <GreenBox>
        만 55세 이상 + IRP 가입 5년 이상 → 연금 수령 가능<br />
        수령 기간 5년 이상 → 퇴직소득세 30% 감면<br />
        수령 기간 10년 이상 → 퇴직소득세 40% 감면
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="연금 수령 조건을 모두 갖추고 있어요. 연금을 선택하면 퇴직소득세를 40%까지 아낄 수 있어요."
        partialMatchText="일부 조건이 충족되지 않아요. 55세 이전이거나 가입 5년 미만이라면 지금 당장 연금 수령은 어려워요."
      />

      <Divider />

      <H2>일시금 vs 연금, 세금이 얼마나 차이 나나요?</H2>
      <p style={body}>
        일시금으로 꺼내면 <a href="/w/퇴직금-소득세" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>를 그 자리에서 전액 납부해요.
        연금으로 나눠 받으면 퇴직소득세가 30~40% 줄어들고, 매년 받는 연금 금액에는 낮은 세율(3.3~5.5%)이 적용돼요.
        퇴직금이 클수록 절세 효과도 커지죠.
      </p>
      <p style={body}>
        퇴직소득세는 근속연수와 총급여에 따라 달라지기 때문에 아래 계산기는 단순 추정값이에요.
        정확한 세액은 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 세금 계산</a> 글에서 확인하세요.
      </p>

      <SectionBadge>일시금 vs 연금 세금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직소득세 5% 단순 추정. 실제 세액은 근속연수·총급여에 따라 달라져요. 연금 수령 시 30% 감면 기준."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수령 신청에 필요한 서류가 뭔가요?</H2>
      <p style={body}>
        금융기관 앱으로 신청하면 신분증과 공동인증서만 있으면 대부분 처리돼요.
        연금 수령을 선택하면 연금 개시 신청서를 추가로 작성해야 해요.
        창구 방문 시에는 수령 신청서를 직접 작성하는 경우도 있어요.
      </p>
      <p style={body}>
        재직증명서는 일부 금융사에서 요구하기도 해요.
        앱으로 신청하기 전에 미리 공동인증서를 갱신해두면 도중에 막히는 일이 없어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 수령 신청, 4단계로 끝내요</H2>
      <p style={body}>
        입금 확인부터 실제 수령까지 빠르면 당일, 늦어도 3영업일 안에 처리돼요.
        연금을 선택한다면 개시 시점과 수령 기간을 미리 결정해두세요.
      </p>
      <p style={body}>
        IRP를 처음 만든 직후라면 금융사 앱 접속과 공동인증서 설정에 시간이 걸릴 수 있어요.
        창구 방문이 더 편하다면 신분증만 들고 가도 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 놓치기 쉬운 것들</H2>
      <p style={body}>
        IRP 수령은 한 번 방법을 선택하면 바꾸기 어려운 경우가 많아요.
        특히 일시금을 선택했다가 나중에 연금으로 바꾸는 건 불가능해요.
        아래 체크리스트를 결정 전에 한 번 훑어보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        1단계: 인사팀에 IRP 계좌번호 재확인 요청<br />
        2단계: 고용노동부 퇴직급여 지급 지연 신고 (☎ 1350)<br />
        3단계: 신고 시 지연이자 연 20% 청구 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 계좌로 퇴직금을 수령할 때 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(☎ 1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
