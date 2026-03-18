"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 300만원을 초과할 것 같아요" },
  { id: "c2", label: "IRP 계좌가 아직 없어요" },
  { id: "c3", label: "세액공제 혜택도 같이 받고 싶어요" },
  { id: "c4", label: "수수료가 낮은 금융기관을 고르고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 예상액", min: 500, max: 10000, step: 500, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "운용 기간", min: 1, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "증권사 IRP 수수료 (연 0.2% 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.002 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "은행 IRP 수수료 (연 0.5% 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.005 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (증권사보다 많음)`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "본인 명의 기존 계좌", required: true, where: "본인 은행 계좌" },
  { name: "재직증명서 (일부 금융기관 요구)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "퇴직금 규모 파악",
    desc: "300만원 초과 여부를 먼저 확인해요. 300만원 이하라면 일반 통장으로 받을 수 있지만, 초과하면 IRP 계좌가 법적으로 필수예요. 퇴직금 계산기로 예상 금액을 먼저 뽑아보는 게 빨라요.",
    tip: "300만원 초과 시 IRP 계좌 없으면 지급 자체가 안 돼요",
    link: { label: "퇴직금 계산기", href: "/w/퇴직금-계산-방법" },
  },
  {
    title: "IRP vs 연금저축 선택",
    desc: "퇴직금 수령 목적이라면 IRP가 필수예요. 연금저축펀드는 퇴직금을 직접 받는 계좌로 쓸 수 없고, 추가 납입과 세액공제만 가능해요. 두 계좌를 모두 쓰면 세액공제 한도(연 900만원)를 최대로 활용할 수 있어요.",
    tip: "퇴직금 수령: IRP만 가능 / 세액공제: IRP + 연금저축 합산",
  },
  {
    title: "은행 IRP vs 증권사 IRP 비교",
    desc: "수수료와 운용 상품이 다르고, 은행은 연 0.4~0.5%, 증권사는 연 0.2~0.3% 수준이에요. 증권사는 ETF 투자가 가능하고, 은행은 원리금 보장 상품(예·적금) 위주예요. 장기 운용 시 수수료 차이가 수백만원 이상 벌어질 수 있어요.",
    tip: "일부 증권사는 수수료 0% 상품도 운영 중이에요",
  },
  {
    title: "계좌 개설 및 계좌번호 통보",
    desc: "은행·증권사 앱에서 비대면으로 10분 내에 개설돼요. 개설 후 계좌번호를 인사팀에 문자 또는 메일로 알려주면 퇴직 후 14일 내에 이체돼요. 증거를 남기기 위해 문자·메일로 발송하는 게 좋아요.",
    tip: "계좌번호 통보는 문자·메일로 남겨야 나중에 증거가 돼요",
  },
];

const CHECKLIST = [
  "퇴직금 300만원 초과: IRP 계좌 필수, 미개설 시 지급 불가",
  "증권사 IRP: 수수료 낮고 ETF 투자 가능 — 장기 운용에 유리",
  "은행 IRP: 원리금 보장 상품 중심 — 안정형 운용에 적합",
  "연금저축펀드: 퇴직금 수령 불가, 추가 납입·세액공제용으로 활용",
  "세액공제 한도: IRP + 연금저축 합산 연 900만원 (납입액 기준)",
  "계좌번호 인사팀 통보: 퇴직 전에 미리 해두면 14일 지급 기한 놓치지 않아요",
];

const FAQS = [
  {
    q: "퇴직금을 일반 통장으로 받을 수 없나요?",
    a: "퇴직금이 300만원 이하라면 일반 계좌로 받을 수 있어요. 300만원을 초과하면 근로자퇴직급여보장법에 따라 IRP 계좌로만 수령이 가능해요. 이 기준은 세전 금액 기준이에요.",
  },
  {
    q: "IRP는 어느 금융기관이 좋나요?",
    a: "수수료가 낮고 ETF 투자를 원한다면 증권사(미래에셋·삼성·NH투자증권 등)가 유리해요. 연 수수료 0.2~0.3% 수준이에요. 안정적인 원리금 보장 상품을 원한다면 은행도 괜찮지만 수수료가 연 0.4~0.5%로 높아요.",
  },
  {
    q: "연금저축펀드와 IRP의 차이가 뭔가요?",
    a: "퇴직금 수령은 IRP만 가능해요. 연금저축펀드는 개인이 자유롭게 납입하는 계좌로, 퇴직금을 직접 받는 창구로 쓸 수 없어요. 둘 다 세액공제 대상이고, 합산 한도는 연 900만원이에요.",
  },
  {
    q: "IRP 계좌를 여러 곳에 만들 수 있나요?",
    a: "여러 금융기관에서 IRP를 개설할 수 있어요. 하지만 세액공제 한도는 IRP와 연금저축을 합산해 연 900만원이에요. 퇴직금 수령은 원하는 IRP 계좌 한 곳으로 지정하면 돼요.",
  },
  {
    q: "IRP에서 돈을 중도에 뺄 수 있나요?",
    a: "55세 미만에 해지하면 기타소득세 16.5%가 부과돼요. 주택 구입·요양·파산 등 법정 사유에 해당하면 중도 인출이 가능해요. 55세 이후 연금으로 수령하면 연금소득세(3.3~5.5%)로 낮아져요.",
  },
  {
    q: "DC형 퇴직연금을 운영 중인데 IRP가 따로 필요한가요?",
    a: "필요해요. DC형 퇴직연금은 재직 중 회사가 운영하는 계좌예요. 퇴직하면 DC형 잔액이 본인 IRP 계좌로 자동 이전되는 구조라 본인 IRP가 있어야 해요. 미리 개설해두는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: IRP 의무화 및 운용 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: 퇴직연금 비교공시 (수수료·수익률)", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-통장-만들기", title: "IRP 계좌 만드는 방법", description: "수수료 비교와 비대면 개설 절차를 안내해요." },
  { slug: "퇴직금-IRP-수령방법", title: "IRP로 퇴직금 받는 방법", description: "IRP 계좌 지정부터 입금 확인까지 단계별 안내." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "IRP 세액공제 절세 방법", description: "납입 한도와 세금 환급 방법을 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-통장-종류" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 통장 종류</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 통장, 어디서 만들어야 하나요?<br />
        은행 IRP·증권사 IRP·연금저축 선택 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 300만원을 넘으면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>가 법적으로 필수예요.
        은행 IRP, 증권사 IRP, 연금저축펀드는 수수료와 운용 방식이 달라서 어디서 만드느냐에 따라 장기적으로 수백만원 차이가 나요.
        내 상황에 맞는 통장 종류와 선택 기준을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 통장으로 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        퇴직금 수령 계좌는 세 가지예요. 퇴직금이 300만원 이하면 일반 계좌로 받을 수 있어요.
        300만원을 초과하면 <a href="/w/퇴직금-irp-의무" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 의무화</a> 규정에 따라 IRP 계좌만 허용돼요.
        연금저축펀드는 퇴직금을 직접 받는 계좌로 쓸 수 없고, 세액공제 목적으로만 활용해요.
      </p>
      <p style={body}>
        IRP는 은행, 증권사, 보험사에서 모두 개설할 수 있어요. 수수료와 운용 상품 구성이 달라서 비교하고 고르는 게 유리해요.
        DC형 퇴직연금에 가입된 직장인이라면 퇴직 시 DC형 잔액이 본인 IRP로 자동 이전되니까 미리 개설해두면 좋아요.
      </p>

      <GreenBox title="퇴직금 통장 종류 한눈에 보기">
        ① 일반 계좌: 퇴직금 300만원 이하인 경우만 수령 가능<br />
        ② IRP(개인형 퇴직연금): 300만원 초과 시 필수, 세액공제 혜택 병행<br />
        ③ 연금저축펀드: 퇴직금 수령 불가, 추가 납입·세액공제 전용
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌 개설이 필요해요. 아래 수수료 비교로 어느 금융기관이 유리한지 확인해보세요."
        partialMatchText="퇴직금 규모와 수령 방식에 따라 필요한 계좌가 달라요. 아래 내용을 읽어보세요."
      />

      <Divider />

      <H2>수수료 차이, 장기적으로 얼마나 벌어지나요?</H2>
      <p style={body}>
        IRP 수수료는 금융기관마다 달라요. 은행은 연 0.4~0.5%, 증권사는 연 0.2~0.3% 수준이에요.
        퇴직금을 20~30년 운용한다고 생각하면 수수료 차이가 수백만원 이상으로 벌어질 수 있어요.
        아래 계산기로 수수료 총액 차이를 직접 확인해보세요.
      </p>

      <SectionBadge>수수료 비교 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 수수료는 원금 기준 단순 계산이에요. 실제는 운용 잔액 기준으로 적용돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 계좌 개설에 필요한 서류</H2>
      <p style={body}>
        은행·증권사 앱에서 비대면으로 개설하면 신분증과 기존 계좌만 있으면 돼요.
        대부분 10분 이내에 끝나고, 일부 금융기관은 재직증명서를 요구하기도 해요.
        방문 개설이 필요한 경우는 드물지만 보험사 IRP는 방문을 권하는 곳도 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 통장 선택하고 수령하는 절차</H2>
      <p style={body}>
        퇴직 전에 IRP 계좌를 개설하고 계좌번호를 인사팀에 알려줘야 해요.
        퇴직 후 14일 내 이체가 법정 기한이라, 미리 준비하지 않으면 지급이 늦어질 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계좌 선택 전 꼭 확인할 것들</H2>
      <p style={body}>
        수수료 외에도 운용 상품 구성이 중요해요. ETF로 직접 투자하고 싶다면 증권사가 낫고, 원금 손실 없이 안정적으로 보관하고 싶다면 은행 예·적금 상품도 선택지예요.
        두 계좌를 함께 쓰면 세액공제 한도를 최대로 활용할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="은행 IRP vs 증권사 IRP 비교 (2026년 기준)">
        증권사: 연 0.2~0.3%, ETF·채권·리츠 투자 가능 (일부 수수료 0%)<br />
        은행: 연 0.4~0.5%, 예·적금·원리금 보장 상품 중심<br />
        보험사: 연 0.3~0.5%, 변액보험 연계 상품 운영<br />
        세액공제: IRP + 연금저축 합산 연 900만원 한도 동일
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 통장 종류와 IRP 선택에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. IRP 수수료와 상품 구성은 금융기관별로 변동될 수 있으니 가입 전 최신 조건을 직접 확인해봐요." />
    </ArticleLayout>
  );
}
