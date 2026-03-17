"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직을 앞두고 있거나 이미 퇴직했어요" },
  { id: "c2", label: "퇴직금이 300만원을 초과해요" },
  { id: "c3", label: "현재 만 55세 미만이에요" },
  { id: "c4", label: "IRP 계좌가 아직 없어요" },
];

const CALC_SLIDERS = [
  { id: "deposit", label: "연간 IRP 납입액", min: 0, max: 900, step: 50, defaultValue: 300, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "income", label: "연 소득 구간", min: 1, max: 3, step: 1, defaultValue: 1, format: (v: number) => v === 1 ? "5,500만원 이하" : v === 2 ? "5,500만~1억" : "1억 초과" },
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
    label: "실질 납입 부담 (납입-공제)",
    getValue: (v: Record<string, number>) => {
      const rate = v.income === 1 ? 0.165 : 0.132;
      const deduction = Math.round(Math.min(v.deposit * 10000, 9000000) * rate);
      return Math.max(0, v.deposit * 10000 - deduction);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "기존 금융계좌 (이체용)", required: true, where: "은행 계좌" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "재직증명서 (선택)", required: false, where: "회사 인사팀 (일부 금융사 요구)" },
];

const STEPS = [
  {
    title: "금융기관 비교 선택",
    desc: "은행, 증권사, 보험사 중에서 선택해요. 수수료(연 0.2~0.5%)와 운용 상품을 비교해서 고르세요. 증권사 IRP는 ETF 투자가 가능하고 수수료가 낮은 편이에요. 퇴직금 수령만 목적이라면 수수료 0% 상품도 있어요.",
    tip: "수수료 차이가 장기적으로 수십만 원 차이가 나요",
  },
  {
    title: "앱 또는 방문으로 개설",
    desc: "대부분 금융사 앱으로 10분 안에 개설 가능해요. 신분증과 공동인증서(또는 간편인증)만 있으면 돼요. 방문 개설도 가능하지만 앱이 훨씬 편해요.",
    tip: "일부 은행은 비대면 한도 제한으로 방문이 필요할 수 있어요",
  },
  {
    title: "운용 지시 설정",
    desc: "개설 후 퇴직금이 들어오면 어떻게 운용할지 선택해야 해요. 원리금보장형(예금), 실적배당형(ETF·펀드) 중 선택할 수 있어요. 운용 지시 안 하면 기본 원리금보장형으로 배정돼요.",
    tip: "장기 운용이라면 ETF 분산 투자가 유리해요",
  },
  {
    title: "계좌번호 회사 인사팀에 통보",
    desc: "퇴직이 확정되면 IRP 계좌번호(은행명, 계좌번호, 예금주명)를 인사팀에 문자·메일로 알려줘요. 회사는 14일 이내에 이 계좌로 퇴직금을 이체해야 해요.",
    tip: "구두 통보보다 메일이나 문자로 남기는 게 증거로 좋아요",
  },
];

const CHECKLIST = [
  "금융기관 수수료 비교: 증권사 0.2% vs 은행 0.5%",
  "앱으로 10분 이내 개설 가능",
  "운용 지시: 원리금보장 vs ETF 선택",
  "계좌번호 인사팀에 문자·메일로 통보",
  "세액공제 한도: 연 900만원 (IRP+연금저축 합산)",
];

const FAQS = [
  {
    q: "IRP 계좌는 어느 금융사에서 만드는 게 좋나요?",
    a: "수수료가 낮은 증권사(미래에셋, 삼성증권, NH투자증권 등)를 권해요. 은행보다 수수료가 낮고 ETF 투자도 가능해요. 퇴직금만 수령 목적이라면 수수료 0% 상품도 있어요.",
  },
  {
    q: "IRP 계좌를 여러 개 만들 수 있나요?",
    a: "만들 수 있어요. 하지만 세액공제 한도는 IRP+연금저축 합산 연 900만원이에요. 하나만 만들어도 충분해요.",
  },
  {
    q: "IRP 세액공제를 받으면 나중에 세금이 더 나오나요?",
    a: "연금 수령 시 연금소득세(3.3~5.5%)가 부과돼요. 그래도 지금 돌려받는 세액공제가 더 크기 때문에 대부분 유리해요.",
  },
  {
    q: "회사가 IRP로 이체를 거부하면?",
    a: "고용노동부(1350)에 신고하면 돼요. 300만원 초과 퇴직금을 IRP 이외 계좌로 지급하거나 현금으로 주는 건 위법이에요.",
  },
  {
    q: "IRP 납입 한도가 얼마나 되나요?",
    a: "연 1,800만원까지 납입 가능해요. 세액공제는 최대 900만원(IRP+연금저축 합산)까지 받을 수 있어요. 퇴직금 수령분은 이 한도에 포함되지 않아요.",
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
      { label: "금융감독원: IRP 가입 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 절차", description: "계좌 개설 후 이체까지 4단계." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 정리", description: "일시금·연금 비교부터 절차까지." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 절세 효과를 계산해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-IRP-계좌" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP계좌 · 개설방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 계좌, 어디서 만들어야 하나요?<br />
        은행·증권사 비교부터 개설 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP(개인형퇴직연금) 계좌는 퇴직금 300만원 초과 시 반드시 필요한 계좌예요.
        은행, 증권사, 보험사 중 어디서 만드느냐에 따라 수수료와 운용 가능한 상품이 달라져요.
        연 최대 148.5만원 세액공제 혜택도 있어서,{" "}
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 수령</a>{" "}
        전에 미리 만들어두면 좋아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 계좌, 언제 만들어야 하나요?</H2>
      <p style={body}>
        퇴직 전에 미리 만들어두는 게 가장 좋아요. IRP 계좌가 없으면 회사가 300만원 초과 퇴직금을 이체할 수 없어서 지급이 지연돼요.
        퇴직이 확정되면 IRP 계좌번호를 인사팀에 바로 알려줘야 해요.
      </p>
      <p style={body}>
        IRP는 퇴직금 수령 외에도 본인이 추가로 납입하면 세액공제 혜택이 생겨요.
        연 소득 5,500만원 이하라면 납입액의 16.5%를 연말정산에서 돌려받아요.
        연 300만원 납입 시 약 49만원 환급이에요.
      </p>

      <GreenBox title="IRP 세액공제 한도">
        IRP + 연금저축 합산 연 900만원까지 세액공제<br />
        소득 5,500만원 이하: 16.5% → 최대 148.5만원 환급<br />
        소득 5,500만원 초과: 13.2% → 최대 118.8만원 환급
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌 개설이 필요해요. 아래 세액공제 계산기로 혜택을 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 금융감독원(1332) 상담을 권해요."
      />

      <Divider />

      <H2>연간 납입액 기준 세액공제 계산</H2>
      <p style={body}>
        IRP에 납입하면 연말정산 때 세금을 돌려받을 수 있어요.
        납입액과 소득 구간을 선택하면 예상 환급액을 바로 확인할 수 있어요.
        퇴직금 이체분은 납입 한도와 별개로 계산돼요.
      </p>

      <SectionBadge>IRP 세액공제 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ IRP+연금저축 합산 최대 900만원 세액공제. 소득 5,500만원 이하 16.5%, 초과 13.2% 기준."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 개설에 필요한 서류</H2>
      <p style={body}>
        신분증 하나로도 대부분 가능해요. 앱으로 개설하면 공동인증서나 간편인증만 있으면 돼요.
        일부 금융사는 재직증명서를 요구하기도 하니 미리 확인하세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 계좌 개설 4단계</H2>
      <p style={body}>
        앱으로 10분이면 끝나요. 수수료 비교만 먼저 해두면 개설 자체는 어렵지 않아요.
        퇴직 전에 미리 만들어두고 계좌번호만 인사팀에 전달하면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 개설 체크리스트</H2>
      <p style={body}>
        수수료와 세액공제 한도를 꼭 챙기세요. 놓치면 매년 수십만 원 손해예요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="퇴직금 수령 전에 IRP 꼭 만들어두세요">
        퇴직 후 계좌가 없으면 회사가 이체를 못 해서 지급이 지연돼요.<br />
        10분이면 만들 수 있으니 퇴직 확정되면 바로 개설하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 계좌 개설에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
