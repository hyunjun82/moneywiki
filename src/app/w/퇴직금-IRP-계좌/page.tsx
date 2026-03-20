"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 300만원을 초과해요" },
  { id: "c2", label: "퇴직이 확정됐거나 이미 퇴직했어요" },
  { id: "c3", label: "만 55세 미만이에요" },
  { id: "c4", label: "IRP로 연간 납입해서 세액공제도 받고 싶어요" },
];

const CALC_SLIDERS = [
  {
    id: "deposit",
    label: "연간 IRP 납입액",
    min: 0,
    max: 900,
    step: 50,
    defaultValue: 300,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "income",
    label: "연 소득 구간",
    min: 1,
    max: 2,
    step: 1,
    defaultValue: 1,
    format: (v: number) => (v === 1 ? "5,500만원 이하" : "5,500만원 초과"),
  },
];

const CALC_RESULTS = [
  {
    label: "세액공제 환급액",
    getValue: (v: Record<string, number>) => {
      const rate = v.income === 1 ? 0.165 : 0.132;
      return Math.round(Math.min(v.deposit * 10000, 9000000) * rate);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "실질 납입 부담 (납입 − 환급)",
    getValue: (v: Record<string, number>) => {
      const rate = v.income === 1 ? 0.165 : 0.132;
      const deduction = Math.round(Math.min(v.deposit * 10000, 9000000) * rate);
      return Math.max(0, v.deposit * 10000 - deduction);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증 (카카오·PASS)", required: true, where: "앱 또는 금융인증서" },
  { name: "연결할 기존 은행 계좌번호", required: true, where: "본인 명의 계좌" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀 발급" },
];

const STEPS = [
  {
    title: "금융기관 수수료 비교",
    desc: "은행, 증권사, 보험사 중 수수료를 먼저 비교해요. 증권사(미래에셋·삼성증권·NH투자증권)는 연 0.2% 수준이고 은행은 연 0.4~0.5% 수준이에요. ETF 투자까지 원한다면 증권사가 유리해요. 퇴직금 수령만 목적이라면 수수료 0% 상품도 있어요.",
    tip: "수수료 0.3% 차이가 10년이면 수십만 원 차이예요",
  },
  {
    title: "앱으로 계좌 개설",
    desc: "선택한 금융사 앱을 설치하고 IRP 계좌 개설 메뉴를 찾아요. 신분증 촬영 → 본인인증 → 계좌 연결 순서로 10분 안에 끝나요. 공동인증서나 카카오·PASS 간편인증으로 처리 가능해요. 일부 은행은 비대면 한도 제한으로 영업점 방문이 필요하기도 해요.",
    tip: "비대면 개설이 안 되면 영업점 방문 시 신분증 한 장만 챙기면 돼요",
  },
  {
    title: "운용 방식 선택",
    desc: "계좌가 만들어지면 어떻게 운용할지 설정해야 해요. 원리금보장형(정기예금·ELB)은 원금이 보장되고, 실적배당형(ETF·펀드)은 수익률이 달라져요. 운용 지시를 따로 안 하면 기본 원리금보장형으로 배정돼요. 나중에 언제든지 바꿀 수 있어요.",
    tip: "20~40대라면 ETF 분산 투자가 장기적으로 유리해요",
  },
  {
    title: "계좌번호 인사팀에 전달",
    desc: "퇴직이 확정되면 IRP 계좌번호(금융사명 + 계좌번호 + 예금주)를 인사팀에 알려줘요. 회사는 퇴직일로부터 14일 이내에 IRP 계좌로 퇴직금을 이체해야 해요. 구두 전달보다 메일이나 문자로 남겨두면 나중에 증거로 쓸 수 있어요.",
    tip: "14일 이후에도 안 들어오면 지연이자(연 20%) 청구 가능해요",
    link: { label: "퇴직금 지연이자 청구 방법", href: "/w/퇴직금-지연이자" },
  },
];

const CHECKLIST = [
  "수수료 비교: 증권사 0.2% vs 은행 0.4~0.5% — 장기 차이 크게 남",
  "앱 개설 10분이면 가능 — 신분증 + 간편인증 준비",
  "운용 지시 미설정 시 자동으로 원리금보장형 배정됨",
  "계좌번호는 인사팀에 메일 또는 문자로 남기기",
  "세액공제 한도: IRP + 연금저축 합산 연 900만원",
  "퇴직금 이체분은 납입 한도(연 1,800만원)에 포함 안 됨",
  "55세 이후 연금 수령 시 연금소득세(3.3~5.5%)로 절세 가능",
];

const FAQS = [
  {
    q: "IRP 계좌는 어느 금융사가 좋나요?",
    a: "수수료가 낮은 증권사를 권해요. 미래에셋·삼성증권·NH투자증권이 연 0.2% 수준으로 낮아요. 은행은 0.4~0.5%로 차이가 있어요. 퇴직금 수령만 목적이라면 수수료 0% 상품도 있어요. ETF 투자까지 원한다면 증권사가 유리해요.",
  },
  {
    q: "IRP 계좌를 여러 개 만들 수 있나요?",
    a: "만들 수는 있어요. 하지만 세액공제 한도는 IRP + 연금저축 합산 연 900만원으로 고정이에요. 여러 계좌에 나눠 납입해도 한도 합산이기 때문에 하나로 관리하는 게 편해요.",
  },
  {
    q: "IRP 세액공제를 받으면 나중에 세금이 더 나오나요?",
    a: "연금 수령 시 연금소득세(3.3~5.5%)가 붙어요. 하지만 지금 돌려받는 세액공제(16.5% 또는 13.2%)가 훨씬 크기 때문에 대부분 유리해요. 일시 인출 시에는 기타소득세 16.5%가 부과돼요.",
  },
  {
    q: "회사가 IRP로 이체를 안 해주면 어떻게 하나요?",
    a: "300만원 초과 퇴직금을 IRP 외 계좌로 주거나 현금으로 주는 건 위법이에요. 고용노동부(1350)에 신고하거나 노동청에 진정을 넣을 수 있어요.",
  },
  {
    q: "IRP 납입 한도가 얼마예요?",
    a: "연 1,800만원까지 납입 가능해요. 세액공제는 최대 900만원(IRP + 연금저축 합산)까지 적용돼요. 퇴직금 이체분은 이 한도와 별개로 들어와요.",
  },
  {
    q: "퇴직 전에 IRP 계좌를 만들어야 하나요?",
    a: "퇴직 전에 미리 만들어두는 게 좋아요. 계좌가 없으면 회사가 퇴직금을 이체할 수 없어서 지급이 늦어질 수 있어요. 퇴직 결정 나면 그날 바로 앱으로 개설하는 걸 권해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: IRP 계좌 의무화", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제59조의3: IRP 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: 퇴직연금 IRP 가입 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 방법", description: "계좌 개설 후 퇴직금 이체까지 4단계." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 절세 효과와 계산법." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "일시금·연금 비교부터 절차까지." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-IRP-계좌" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP계좌 · 개설방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP 계좌 어디서 만들어야 할지 모르겠죠?<br />
        은행·증권사 비교부터 개설 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 300만원을 넘으면 IRP(개인형퇴직연금) 계좌로만 받을 수 있어요.
        계좌가 없으면 회사가 이체 자체를 못 해서 지급이 늦어지는 상황이 생겨요.
        은행, 증권사, 보험사 중 어디서 만드느냐에 따라 수수료와 운용 상품이 달라지고,{" "}
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          퇴직금 수령
        </a>{" "}
        후 연금으로 받으면 세금도 아낄 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 계좌, 내가 꼭 만들어야 하나요?</H2>
      <p style={body}>
        퇴직금이 300만원을 초과하면 IRP 계좌 수령이 법적 의무예요.{" "}
        <a href="/w/퇴직금-irp-의무" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          근로자퇴직급여보장법 제9조
        </a>에 따라 회사는 반드시 IRP 계좌로 퇴직금을 이체해야 해요.
        300만원 이하인 경우에만 일반 통장으로 받을 수 있어요.
      </p>
      <p style={body}>
        IRP는 퇴직금 수령 통로 역할만 하는 게 아니에요.
        본인이 추가 납입하면 연말정산에서 세액공제도 받을 수 있어요.
        소득 5,500만원 이하라면 납입액의 16.5%, 초과라면 13.2%를 돌려받아요.
        연 300만원 납입 시 최대 49만원 환급이에요.
      </p>

      <GreenBox>
        IRP + 연금저축 합산 연 900만원까지 세액공제 적용<br />
        소득 5,500만원 이하: 16.5% → 최대 148.5만원 환급<br />
        소득 5,500만원 초과: 13.2% → 최대 118.8만원 환급<br />
        퇴직금 이체분은 납입 한도(연 1,800만원)와 별개
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌 개설이 필요해요. 아래 계산기로 세액공제 혜택부터 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 금융감독원(1332) 상담을 권해요."
      />

      <Divider />

      <H2>납입액으로 세액공제 얼마나 받나요?</H2>
      <p style={body}>
        납입액과 소득 구간을 선택하면 예상 환급액을 바로 볼 수 있어요.
        퇴직금 이체분은 납입 한도와 별개로 들어오기 때문에 세액공제 계산에 포함되지 않아요.
        추가 납입분만 계산기에 입력하면 돼요.
      </p>

      <SectionBadge>IRP 세액공제 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ IRP + 연금저축 합산 최대 900만원 세액공제. 소득 5,500만원 이하 16.5%, 초과 13.2% 기준."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>계좌 개설에 필요한 서류</H2>
      <p style={body}>
        앱으로 개설하면 신분증과 간편인증만 있으면 돼요.
        기존 은행 계좌번호가 있으면 자금 이체 연결도 바로 할 수 있어요.
        일부 금융사는 재직증명서를 추가로 요구하기도 하니 미리 문의해두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 계좌 개설 4단계</H2>
      <p style={body}>
        금융사 비교만 먼저 해두면 개설 자체는 10분이면 끝나요.
        퇴직 전에 미리 만들어두고 계좌번호를 인사팀에 전달하는 게 핵심이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>개설 전 꼭 챙겨야 할 것들</H2>
      <p style={body}>
        수수료 차이는 금액이 클수록 장기적으로 영향이 커요.
        세액공제 한도도 놓치면 매년 수십만 원 손해이니 납입 계획을 미리 세워두면 좋아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        계좌가 없으면 회사가 퇴직금을 이체할 수 없어서 14일 지급기한을 넘기는 상황이 생겨요.<br />
        앱으로 10분이면 개설되고, 개설 후 계좌번호를 인사팀에 메일로 남겨두면 끝이에요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 계좌 개설할 때 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
