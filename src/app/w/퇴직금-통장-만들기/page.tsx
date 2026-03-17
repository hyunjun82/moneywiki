"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직이 확정됐거나 퇴직 후 IRP 계좌가 아직 없어요" },
  { id: "c2", label: "퇴직금이 300만원을 초과할 것 같아요" },
  { id: "c3", label: "인사팀에 IRP 계좌번호를 아직 전달하지 않았어요" },
  { id: "c4", label: "세액공제 혜택도 함께 챙기고 싶어요" },
];

const CALC_SLIDERS = [
  {
    id: "deposit",
    label: "연간 IRP 추가 납입액",
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
    label: "세액공제 환급 예상액",
    getValue: (v: Record<string, number>) => {
      const rate = v.income === 1 ? 0.165 : 0.132;
      return Math.round(Math.min(v.deposit * 10000, 9000000) * rate);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "실질 납입 부담 (납입액 - 공제액)",
    getValue: (v: Record<string, number>) => {
      const rate = v.income === 1 ? 0.165 : 0.132;
      const deduction = Math.round(Math.min(v.deposit * 10000, 9000000) * rate);
      return Math.max(0, v.deposit * 10000 - deduction);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참 또는 앱 촬영" },
  { name: "공동인증서 또는 간편인증(카카오·PASS 등)", required: true, where: "금융인증서·앱 인증" },
  { name: "본인 명의 출금 계좌 (이체 확인용)", required: true, where: "기존 은행 계좌" },
  { name: "재직증명서 (일부 금융사만 요구)", required: false, where: "회사 인사팀 발급" },
];

const STEPS = [
  {
    title: "금융기관 비교 후 선택",
    desc: "IRP 계좌는 은행·증권사·보험사 어디서든 만들 수 있어요. 퇴직금 수령 목적이라면 수수료가 낮은 곳이 유리해요. 증권사(미래에셋·삼성증권·NH투자증권 등)는 연 0.2~0.3% 수준이고, 은행은 0.4~0.5%까지 올라가요. 퇴직금만 넣고 빠르게 인출할 계획이라면 수수료 0% 조건을 제공하는 상품도 있어요.",
    tip: "ETF·펀드 투자까지 생각하면 증권사 IRP가 유리해요",
  },
  {
    title: "금융사 앱 설치 후 IRP 계좌 개설",
    desc: "선택한 금융사 앱을 설치하고 'IRP 개설' 또는 '퇴직연금 개설' 메뉴로 들어가요. 신분증 촬영 → 간편인증(카카오·PASS) → 출금계좌 등록 순으로 진행하면 10분 이내에 계좌번호가 발급돼요. 은행 일부 상품은 비대면 가입 한도 제한이 있어 영업점 방문이 필요할 수 있어요.",
    tip: "앱 개설이 영업점 방문보다 훨씬 빠르고 수수료도 낮은 경우가 많아요",
  },
  {
    title: "계좌번호 인사팀에 통보",
    desc: "IRP 계좌번호(은행명·계좌번호·예금주명)를 인사팀에 문자 또는 이메일로 전달해요. 회사는 퇴직일로부터 14일 이내에 이 계좌로 퇴직금을 이체해야 해요. 구두로만 알려주면 나중에 분쟁이 생길 수 있어서 문자·메일로 남기는 게 좋아요.",
    tip: "퇴직 확정 전에 미리 만들어두면 지급 지연을 막을 수 있어요",
  },
  {
    title: "운용 지시 및 추가 납입 세액공제 활용",
    desc: "퇴직금이 입금되면 원리금보장형(정기예금 수준)과 실적배당형(ETF·펀드) 중 운용 방식을 선택해요. 지시를 하지 않으면 기본 원리금보장형으로 배정돼요. 추가로 납입하면 IRP+연금저축 합산 연 900만원까지 세액공제(소득 5,500만원 이하 16.5%, 초과 13.2%)를 받을 수 있어요.",
    tip: "퇴직금으로 들어온 금액은 세액공제 한도에 포함되지 않아요",
  },
];

const CHECKLIST = [
  "수수료 비교: 증권사 0.2~0.3% vs 은행 0.4~0.5% (수령 목적이면 0% 조건 확인)",
  "앱으로 신분증 촬영 + 간편인증만으로 10분 이내 개설 가능",
  "계좌번호 인사팀에 문자·이메일로 통보 (증거 남기기)",
  "퇴직 전에 미리 만들기: 퇴직 후 만들면 14일 지급 기한이 밀릴 수 있어요",
  "세액공제: IRP+연금저축 합산 연 900만원 한도, 최대 16.5%",
  "운용 지시: 지시 없으면 기본 원리금보장형 자동 배정",
];

const FAQS = [
  {
    q: "퇴직금 300만원 이하면 IRP 없어도 되나요?",
    a: "네, 맞아요. 퇴직금이 300만원 이하라면 일반 은행 계좌로도 받을 수 있어요. 300만원 초과부터는 근로자퇴직급여보장법에 따라 IRP 계좌로만 수령해야 해요.",
  },
  {
    q: "IRP는 어느 금융사에서 만드는 게 유리한가요?",
    a: "수수료가 낮은 증권사를 권해요. 미래에셋·삼성증권·NH투자증권 등은 연 0.2~0.3% 수준이에요. 퇴직금 수령만 목적이라면 일부 증권사·은행에서 수수료 0% 조건을 제공하기도 해요. 수수료가 낮을수록 장기적으로 받는 금액이 많아져요.",
  },
  {
    q: "앱으로 개설할 때 어떤 서류가 필요한가요?",
    a: "신분증(주민등록증 또는 운전면허증)과 간편인증(카카오·PASS 등)만 있으면 돼요. 앱에서 신분증을 촬영하고 본인 인증을 완료하면 10분 이내로 계좌번호가 나와요. 재직증명서는 일부 금융사에서만 요구해요.",
  },
  {
    q: "IRP 계좌를 여러 개 만들 수 있나요?",
    a: "만들 수 있어요. 여러 금융사에서 각각 개설하는 것도 가능해요. 다만 세액공제 한도는 IRP와 연금저축 계좌를 모두 합산해서 연 900만원이에요. 여러 개를 만든다고 한도가 늘어나지는 않아요.",
  },
  {
    q: "IRP 계좌를 만들었는데 퇴직금이 안 들어왔어요",
    a: "퇴직일로부터 14일 이내가 법정 지급 기한이에요. 14일이 지났는데도 입금이 없으면 인사팀에 문의하고, 그래도 해결이 안 되면 고용노동부에 진정을 낼 수 있어요. 지급 기한 초과 시 연 20% 지연이자도 청구할 수 있어요.",
  },
  {
    q: "IRP에 추가 납입하면 세금이 얼마나 환급되나요?",
    a: "연 소득 5,500만원 이하라면 납입액의 16.5%, 초과라면 13.2%를 환급받아요. IRP와 연금저축 합산 연 900만원 한도에요. 900만원을 꽉 채우면 최대 148.5만원(소득 5,500만원 이하 기준)이 돌아와요. 퇴직금으로 들어온 금액은 이 한도에 포함되지 않아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: IRP 계좌 의무 수령", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제59조의3: 연금계좌 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 가입 및 운용 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-통장", title: "퇴직금 통장 종류와 선택 방법", description: "IRP·연금저축·일반 통장의 세금 차이를 비교해요." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "14일 초과 시 지연이자 청구 방법이에요." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "IRP로 퇴직금 세금 절세하는 방법", description: "일시금 수령 vs IRP 이전 세금 차이를 비교해요." },
];

// ─── 페이지 ──────────────────────────────────────────

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
        퇴직금이 300만원을 넘으면 일반 통장으로는 받을 수 없어요.{" "}
        <a href="/w/퇴직금-통장" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          IRP(개인형퇴직연금) 계좌
        </a>
        가 사실상 퇴직금 전용 통장이에요. 앱으로 10분이면 만들 수 있고, 어느 금융사를 고르느냐에 따라 수수료가 달라져요.
        추가 납입 시 연 최대 148.5만원 세액공제 혜택까지 챙길 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 IRP 계좌를 만들어야 하는 상황인지 봐요</H2>
      <p style={body}>
        퇴직금 300만원 초과 시 법적으로 IRP 계좌로만 수령해야 해요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          근로자퇴직급여보장법
        </a>
        에서 의무화하고 있어서, IRP 계좌번호를 인사팀에 전달하지 않으면 회사가 이체할 방법이 없어요.
        퇴직 후에 부랴부랴 만들면 14일 지급 기한이 밀릴 수 있어요.
      </p>
      <p style={body}>
        IRP는 퇴직금 수령 용도 외에도 직접 납입하면 연말정산에서 세금을 돌려받을 수 있어요.
        소득 5,500만원 이하라면 납입액의 16.5%를, 초과라면 13.2%를 환급받아요.
        IRP와 연금저축 합산 연 900만원 꽉 채우면 최대 148.5만원이 돌아와요.
      </p>

      <GreenBox title="IRP 계좌 핵심 정리">
        퇴직금 300만원 초과 → IRP 계좌 필수 수령 (근로자퇴직급여보장법)<br />
        연 900만원(IRP+연금저축 합산) 납입 시 세액공제 적용<br />
        소득 5,500만원 이하: 납입액의 16.5% → 최대 148.5만원 환급<br />
        소득 5,500만원 초과: 납입액의 13.2% → 최대 118.8만원 환급
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌 개설이 필요한 상황이에요. 아래 계산기로 세액공제 혜택도 미리 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 금융감독원(1332) 상담을 권해요."
      />

      <Divider />

      <H2>IRP 추가 납입 시 세액공제 얼마나 돌아오나요?</H2>
      <p style={body}>
        퇴직금으로 들어온 금액과는 별개로, 추가 납입하면 납입액 기준으로 세금을 돌려받아요.
        슬라이더로 납입액과 소득 구간을 조정하면 예상 환급액을 바로 확인할 수 있어요.
        퇴직금 수령분은 이 한도에 포함되지 않아요.
      </p>
      <p style={body}>
        소득 5,500만원 이하 기준으로 300만원을 납입하면 약 49만원, 900만원을 꽉 채우면 148.5만원이 돌아와요.
        연금저축 계좌가 있다면 합산해서 900만원 한도를 채우는 게 유리해요.
      </p>

      <SectionBadge>IRP 세액공제 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ IRP+연금저축 합산 최대 900만원 한도. 소득 5,500만원 이하 16.5%, 초과 13.2% 기준. 퇴직금 수령분은 한도 제외."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>앱 개설에 필요한 서류</H2>
      <p style={body}>
        신분증 하나로 대부분 해결돼요. 앱으로 개설하면 신분증 촬영과 간편인증(카카오·PASS)만 있으면 계좌번호가 발급돼요.
        재직증명서는 일부 금융사에서만 요구하니, 해당 앱에서 미리 확인해두는 게 좋아요.
      </p>
      <p style={body}>
        은행 일부 상품은 비대면 가입 한도 제한이 있어서 영업점 방문이 필요할 수 있어요.
        방문 시에는 신분증 원본을 지참하고 'IRP 계좌 개설'을 요청하면 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 계좌 만드는 순서</H2>
      <p style={body}>
        앱으로 10분이면 끝나요. 금융기관 수수료 비교만 먼저 해두면 개설 자체는 어렵지 않아요.
        개설 후 계좌번호를 인사팀에 바로 알려줘야 회사가 퇴직금을 이체할 수 있어요.
      </p>
      <p style={body}>
        퇴직 확정 전에 미리 만들어두는 게 가장 좋아요. 퇴직 후 만들면 14일 지급 기한이 밀릴 수 있고,
        기한 초과 시 연 20% 지연이자가 발생해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>개설 전 꼭 챙겨야 할 것들</H2>
      <p style={body}>
        수수료와 세액공제 한도를 미리 파악해두면 개설 후 후회가 없어요.
        인사팀 통보는 구두보다 문자나 메일로 남겨야 나중에 분쟁이 생겨도 증거가 돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="퇴직 전에 IRP 미리 만들어두세요">
        IRP 계좌가 있어야 14일 이내에 퇴직금을 받을 수 있어요.<br />
        퇴직 후에 만들면 그사이 지급이 밀릴 수 있고, 14일 초과 시{" "}
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          연 20% 지연이자
        </a>
        가 발생해요.<br />
        10분이면 만들 수 있으니 퇴직이 확정되면 바로 개설하는 게 좋아요.
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
