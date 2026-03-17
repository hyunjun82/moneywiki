"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직을 앞두고 퇴직금 수령 계좌가 필요해요" },
  { id: "c2", label: "퇴직금이 300만원을 초과할 것 같아요" },
  { id: "c3", label: "회사 퇴직연금이 DB형인지 DC형인지 확인했어요" },
  { id: "c4", label: "IRP 계좌가 아직 없어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금 (300만원 초과 → IRP 필수)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 세액공제 최대 (연 300만 납입 기준)",
    getValue: () => 495000,
    format: () => "약 49.5만원/년 (소득 5,500만 이하 기준)",
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "기존 금융계좌", required: true, where: "본인 은행 계좌" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "퇴직금 계좌 종류 파악",
    desc: "퇴직금을 받을 수 있는 계좌는 크게 두 가지예요. 일반 은행 계좌(300만원 이하만 가능)와 IRP 계좌(300만원 초과 필수)예요. 퇴직금이 300만원을 넘으면 IRP 계좌가 반드시 필요해요.",
    tip: "퇴직금 300만원 초과 시 IRP 계좌만 가능해요",
  },
  {
    title: "IRP 계좌 개설",
    desc: "은행·증권사·보험사에서 개설할 수 있어요. 수수료가 낮은 증권사(연 0.2~0.3%)를 추천해요. 앱으로 10분 이내 개설 가능해요.",
    tip: "수수료 0% 상품도 있으니 비교해보세요",
  },
  {
    title: "DC형·DB형 퇴직연금 계좌 확인",
    desc: "회사가 DC형이라면 퇴직연금 계좌에 이미 적립이 되고 있어요. 퇴직 시 자동으로 IRP로 이전돼요. DB형은 회사가 금융기관에 적립하고 퇴직 시 IRP로 이전돼요.",
    tip: "인사팀에 퇴직연금 유형을 미리 확인해두세요",
  },
  {
    title: "계좌번호 인사팀에 통보",
    desc: "IRP 계좌번호를 인사팀에 문자·메일로 알려줘요. 회사는 퇴직 후 14일 이내에 이체해야 해요. 추가 납입 시 세액공제(최대 16.5%)도 받을 수 있어요.",
    tip: "문자나 메일로 남겨야 나중에 증거가 돼요",
  },
];

const CHECKLIST = [
  "300만원 초과: IRP 계좌 필수",
  "300만원 이하: 일반 계좌 수령 가능",
  "증권사 IRP: 수수료 낮고 ETF 투자 가능",
  "DC형/DB형: 퇴직 시 자동 IRP 이전",
  "세액공제: 추가 납입 시 최대 16.5%",
];

const FAQS = [
  {
    q: "퇴직금을 일반 통장으로 받을 수 없나요?",
    a: "300만원 이하라면 일반 계좌로 받을 수 있어요. 300만원 초과 시 IRP 계좌가 필수예요.",
  },
  {
    q: "IRP 계좌는 어디서 만드는 게 좋나요?",
    a: "수수료가 낮은 증권사(미래에셋·삼성·NH투자증권 등)를 추천해요. 연 수수료 0.2~0.3% 수준이에요. 은행은 0.5%까지 올라가요.",
  },
  {
    q: "DC형 퇴직연금과 IRP의 차이는 뭔가요?",
    a: "DC형은 회사가 운영하는 퇴직연금 계좌예요. 퇴직하면 DC형 잔액이 자동으로 본인 IRP로 이전돼요. IRP는 퇴직금 수령 + 추가 납입 + 세액공제가 모두 가능한 개인 계좌예요.",
  },
  {
    q: "퇴직금 통장을 여러 개 만들 수 있나요?",
    a: "IRP는 여러 금융기관에서 만들 수 있어요. 하지만 세액공제 한도는 IRP+연금저축 합산 연 900만원이에요.",
  },
  {
    q: "IRP 계좌에 있는 돈을 언제든 뺄 수 있나요?",
    a: "55세 미만이면 인출 시 기타소득세 16.5%가 부과돼요. 55세 이후 연금으로 수령하면 세금이 줄어요. 법정 사유(주택구입·요양 등)에 해당하면 중도 인출도 가능해요.",
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
      { label: "금융감독원: 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-통장-만들기", title: "IRP 계좌 만드는 방법", description: "수수료 비교와 개설 절차를 안내해요." },
  { slug: "퇴직금-통장", title: "퇴직금 통장 선택 방법", description: "IRP와 일반 통장의 세금 차이를 비교해요." },
  { slug: "퇴직금-지급-절차", title: "퇴직금 지급 절차", description: "IRP 계좌 준비부터 입금 확인까지 단계별 안내." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-통장-종류" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 통장 · 계좌종류</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 받는 통장, 어떤 종류가 있나요?<br />
        일반계좌·IRP·DC형 차이와 수령 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 어느 통장으로 받는지에 따라 세금과 혜택이 달라져요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에 따라 퇴직금 300만원 초과 시 IRP가 필수예요.
        어떤 계좌를 선택해야 유리한지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 퇴직금은 어떤 계좌로 받아야 하나요?</H2>
      <p style={body}>
        퇴직금 수령 계좌는 크게 세 가지예요. 일반 은행 계좌, IRP 계좌, DC형 퇴직연금 계좌예요.
        퇴직금 300만원을 넘으면 IRP가 필수고, 회사에 DC형 퇴직연금이 있으면 퇴직 시 자동으로 IRP로 이전돼요.
      </p>
      <p style={body}>
        IRP로 받으면 세금이 이연되고, 연금으로 수령하면 30~40%가 줄어요.
        추가로 납입하면 세액공제(최대 16.5%)도 받을 수 있어요.
        DB형이든 DC형이든 결국 IRP 계좌가 필요해요.
      </p>

      <GreenBox title="퇴직금 수령 계좌 3가지">
        ① 일반 은행 계좌: 퇴직금 300만원 이하인 경우만 가능<br />
        ② IRP(개인형 퇴직연금): 300만원 초과 시 필수, 세액공제 혜택도 있음<br />
        ③ DC형 퇴직연금 계좌: 회사가 운영, 퇴직 시 IRP로 자동 이전
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌 개설이 필요해요. 아래 계산기로 예상 퇴직금을 먼저 확인하세요."
        partialMatchText="IRP 의무 여부를 먼저 확인하세요. 예외에 해당하면 일반 통장도 가능해요."
      />

      <Divider />

      <H2>퇴직금 예상액으로 계좌 종류 먼저 파악해요</H2>
      <p style={body}>
        월 평균급여와 근속 기간을 입력하면 예상 퇴직금이 나와요.
        300만원이 넘으면 IRP 계좌가 필수라는 걸 바로 알 수 있어요.
        IRP에 추가로 납입하면 세액공제도 같이 받을 수 있어요.
      </p>

      <SectionBadge>퇴직금 예상액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금 = 월 평균급여 × 근속연수 (법정 산식 기준). 정확한 계산은 퇴직금 계산기 페이지에서."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 계좌 개설에 필요한 서류</H2>
      <p style={body}>
        IRP 계좌 개설은 생각보다 간단해요.
        은행 앱이나 증권사 앱에서 10분 내로 끝나는 경우가 많아요.
        신분증과 기존 금융계좌만 있으면 대부분 비대면 개설이 가능해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 통장 준비 절차 4단계</H2>
      <p style={body}>
        퇴직 전에 미리 준비해야 14일 내 이체 기한을 놓치지 않아요.
        DC형 퇴직연금인 경우에도 IRP 계좌번호를 미리 알려주지 않으면 지급이 지연될 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 계좌 준비 체크리스트</H2>
      <p style={body}>
        수수료 차이가 장기적으로 크게 벌어져요.
        퇴직금 5,000만원을 20년 운용하면 연 0.3%와 0.5% 차이가 수백만원이 되기도 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 수수료 비교 (2026년 기준)">
        증권사: 연 0.2~0.3% (미래에셋·삼성·NH투자증권 등)<br />
        은행: 연 0.4~0.5%<br />
        일부 증권사: 수수료 0% 상품 운영 중<br />
        운용 상품: 증권사는 ETF, 은행은 예·적금 중심
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 통장 종류에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 금융 상품 조건은 변동될 수 있으니 가입 금융기관에서 확인하세요." />
    </ArticleLayout>
  );
}
