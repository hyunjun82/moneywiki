"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직을 앞두고 있고 퇴직금이 300만원을 초과할 예정이에요" },
  { id: "c2", label: "IRP 계좌가 아직 없어요" },
  { id: "c3", label: "인사팀에 IRP 계좌번호를 아직 전달하지 않았어요" },
  { id: "c4", label: "세액공제 혜택도 활용하고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "deposit", label: "연간 IRP 추가 납입액", min: 0, max: 900, step: 50, defaultValue: 300, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "income", label: "연 소득 구간", min: 1, max: 2, step: 1, defaultValue: 1, format: (v: number) => v === 1 ? "5,500만원 이하" : "5,500만원 초과" },
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
  { name: "신분증 (주민등록증·운전면허증)", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "기존 금융계좌 (이체용)", required: true, where: "본인 은행 계좌" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀 발급" },
];

const STEPS = [
  {
    title: "금융기관 선택",
    desc: "IRP 계좌는 은행, 증권사, 보험사에서 만들 수 있어요. 수수료가 낮은 증권사(미래에셋·삼성증권·NH투자증권 등)를 먼저 비교해보세요. 퇴직금 수령만 목적이라면 수수료 0% 상품도 있어요.",
    tip: "증권사 IRP는 ETF 투자도 가능해서 유리해요",
  },
  {
    title: "앱으로 10분 이내 개설",
    desc: "해당 금융사 앱을 설치하고 IRP 계좌 개설 메뉴로 들어가요. 신분증 촬영과 간편인증만으로 10분 이내에 개설 완료가 돼요. 일부 은행은 비대면 한도 제한이 있어 방문이 필요할 수 있어요.",
    tip: "앱 개설이 방문보다 훨씬 빠르고 간편해요",
  },
  {
    title: "계좌번호 인사팀에 통보",
    desc: "IRP 계좌 개설 후 계좌번호(은행명, 계좌번호, 예금주명)를 인사팀에 문자나 메일로 알려줘요. 회사는 퇴직 후 14일 이내에 이 계좌로 퇴직금을 이체해야 해요.",
    tip: "구두 통보보다 메일이나 문자로 남기는 게 증거로 좋아요",
  },
  {
    title: "운용 지시 및 세액공제 활용",
    desc: "퇴직금이 들어오면 어떻게 운용할지 선택해요. 원리금보장형(예금)과 실적배당형(ETF) 중 선택할 수 있어요. 추가 납입하면 연 900만원 한도로 세액공제(최대 16.5%)를 받을 수 있어요.",
    tip: "운용 지시 안 하면 기본 원리금보장형으로 배정돼요",
  },
];

const CHECKLIST = [
  "금융기관 비교: 증권사 수수료 0.2~0.3% vs 은행 0.5%",
  "앱으로 10분 이내 개설 가능",
  "계좌번호 인사팀에 문자·메일 통보",
  "세액공제: 연 900만원 한도, 최대 16.5%",
  "운용 지시: 원리금보장형 vs ETF",
];

const FAQS = [
  {
    q: "퇴직금 통장이 따로 필요한가요?",
    a: "퇴직금 300만원 초과 시 IRP 계좌로만 수령해야 해요. IRP가 사실상 퇴직금 전용 통장이에요. 일반 은행 계좌로는 받을 수 없어요.",
  },
  {
    q: "IRP 계좌는 어디서 만드는 게 좋나요?",
    a: "수수료가 낮은 증권사를 권해요. 미래에셋·삼성증권·NH투자증권 등이 연 0.2~0.3% 수준이에요. 은행은 0.5%까지 올라가요. 퇴직금 수령만 목적이면 수수료 0% 상품도 있어요.",
  },
  {
    q: "IRP 계좌를 여러 개 만들 수 있나요?",
    a: "만들 수 있어요. 하지만 세액공제 한도는 IRP+연금저축 합산 연 900만원이에요. 하나만 만들어도 충분해요.",
  },
  {
    q: "IRP 계좌를 만들었는데 퇴직금이 안 들어왔어요",
    a: "회사가 퇴직 후 14일 이내에 이체해야 해요. 14일이 지났는데 입금이 안 됐으면 인사팀에 문의하고, 그래도 안 되면 고용노동부에 진정을 낼 수 있어요.",
  },
  {
    q: "IRP 계좌에 추가로 돈을 넣으면 세금 혜택이 있나요?",
    a: "있어요. IRP+연금저축 합산 연 900만원까지 납입 시 소득 5,500만원 이하라면 16.5%, 초과라면 13.2% 세액공제를 받아요. 퇴직금 수령분은 이 한도에 포함되지 않아요.",
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
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-통장", title: "퇴직금 통장 종류와 선택 방법", description: "IRP와 일반 통장의 세금 차이를 비교해요." },
  { slug: "퇴직금-지급-절차", title: "퇴직금 지급 절차", description: "IRP 계좌 준비부터 입금 확인까지 단계별 안내." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "14일 초과 시 지연이자 청구 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-통장-만들기" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 계좌개설</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 통장, 어디서 어떻게 만드나요?<br />
        IRP 계좌 개설부터 세액공제 혜택까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 300만원을 넘으면 일반 통장으로는 받을 수 없어요.
        <a href="/w/퇴직금-통장" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP(개인형퇴직연금) 계좌</a>가 사실상 퇴직금 전용 통장이에요.
        어디서 만드느냐에 따라 수수료가 달라지고, 추가 납입 시 연 최대 148.5만원 세액공제 혜택도 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 계좌가 꼭 필요한 상황인지 확인해보세요</H2>
      <p style={body}>
        퇴직금 300만원 초과 시 법적으로 IRP 계좌로만 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에서 이를 의무화하고 있어요.
        IRP 계좌가 없으면 회사가 이체할 방법이 없어서 지급이 지연될 수 있어요.
      </p>
      <p style={body}>
        IRP는 퇴직금 수령 용도 외에도 본인이 직접 납입하면 연말정산에서 세금을 돌려받을 수 있어요.
        연 소득 5,500만원 이하라면 납입액의 16.5%, 초과라면 13.2%를 환급받아요.
        연 900만원 꽉 채우면 최대 148.5만원이 돌아와요.
      </p>

      <GreenBox title="IRP 계좌 핵심 정리">
        퇴직금 300만원 초과 → IRP 계좌 필수 수령<br />
        연 900만원(IRP+연금저축 합산) 납입 시 세액공제<br />
        소득 5,500만원 이하: 16.5% → 최대 148.5만원 환급<br />
        소득 5,500만원 초과: 13.2% → 최대 118.8만원 환급
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌 개설이 필요해요. 아래 계산기로 세액공제 혜택도 미리 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 금융감독원(1332) 상담을 권해요."
      />

      <Divider />

      <H2>IRP 납입 시 세액공제 혜택 계산해보세요</H2>
      <p style={body}>
        추가로 납입하면 납입액 기준으로 세금을 돌려받아요.
        슬라이더로 납입액과 소득 구간을 조정하면 예상 환급액을 바로 볼 수 있어요.
        퇴직금으로 들어온 금액은 이 한도와 별개예요.
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
        신분증 하나로 대부분 가능해요. 앱으로 개설하면 신분증 촬영과 간편인증만 있으면 돼요.
        재직증명서는 일부 금융사에서만 요구하니, 미리 해당 앱에서 확인해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 계좌 개설 4단계</H2>
      <p style={body}>
        앱으로 10분이면 끝나요. 수수료 비교만 먼저 해두면 개설 자체는 어렵지 않아요.
        개설 후 계좌번호를 인사팀에 바로 알려줘야 회사가 퇴직금을 이체할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 개설 체크리스트</H2>
      <p style={body}>
        수수료와 세액공제 한도를 꼭 챙기세요.
        인사팀 통보는 구두보다 문자나 메일로 남겨야 나중에 분쟁이 생겨도 증거가 돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="퇴직 전에 IRP 미리 만들어두세요">
        IRP 계좌가 있어야 14일 이내에 퇴직금을 받을 수 있어요.<br />
        퇴직 후에 만들면 그사이 지급이 밀릴 수 있고, 14일 초과 시 연 20% 지연이자가 발생해요.<br />
        10분이면 만들 수 있으니 퇴직이 확정되면 바로 개설하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 계좌 개설과 퇴직금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
