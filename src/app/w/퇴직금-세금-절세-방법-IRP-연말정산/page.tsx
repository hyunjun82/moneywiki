"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "IRP 계좌를 이미 갖고 있어요" },
  { id: "c2", label: "퇴직금이 IRP에 이체됐어요" },
  { id: "c3", label: "만 55세 이후에 연금 수령을 시작할 수 있어요" },
  { id: "c4", label: "IRP에 추가로 납입한 금액이 있어요" },
];

const CALC_SLIDERS = [
  { id: "tax", label: "예상 퇴직소득세", min: 50, max: 1000, step: 10, defaultValue: 200, format: (v: number) => `${v.toLocaleString()}만원` },
];

const CALC_RESULTS = [
  {
    label: "일시금 수령 시 납부 세금",
    getValue: (v: Record<string, number>) => v.tax * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "연금 수령 (10년+) 절세 금액",
    getValue: (v: Record<string, number>) => Math.round(v.tax * 10000 * 0.4),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 시 실제 납부 세금",
    getValue: (v: Record<string, number>) => Math.round(v.tax * 10000 * 0.6),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직소득원천징수영수증", required: true, where: "회사 인사팀 (퇴직 시 발급)" },
  { name: "IRP 계좌 개설 서류", required: true, where: "IRP 개설 금융기관" },
  { name: "연금 수령 신청서", required: true, where: "IRP 운용 금융기관" },
  { name: "연금계좌 납입 확인서 (연말정산용)", required: false, where: "금융기관 앱 발급" },
];

const STEPS = [
  {
    title: "퇴직 전 IRP 계좌 개설",
    desc: "퇴직 전에 IRP 계좌를 미리 만들고 인사팀에 계좌번호를 알려줘요. 계좌 없이 퇴직하면 회사가 일시금으로 처리하고 세금이 원천징수돼요. 은행·증권사 앱에서 10분이면 개설 가능해요.",
    tip: "퇴직 전 IRP 개설이 절세의 첫 번째 단계예요",
  },
  {
    title: "IRP로 퇴직금 이체 (과세이연)",
    desc: "퇴직금이 IRP로 이체되면 퇴직소득세가 즉시 원천징수되지 않아요. 나중에 인출할 때까지 세금이 유예되는 '과세이연' 상태가 돼요. 그 사이 운용수익도 세금 없이 복리로 불어요.",
    tip: "IRP 이체 = 퇴직소득세 납부 시점을 뒤로 미루기",
  },
  {
    title: "55세 이후 연금 수령 신청",
    desc: "만 55세가 넘으면 IRP에서 연금 수령을 신청할 수 있어요. 10년 이상 나눠 받으면 퇴직소득세의 40%를 감면받아요. 10년 미만이면 30% 감면이에요. 금융기관 앱에서 수령 기간을 설정하면 돼요.",
    tip: "10년 이상 수령 시 감면율 40%로 증가해요",
  },
  {
    title: "추가 납입으로 연말정산 세액공제",
    desc: "퇴직금과 별개로 IRP에 추가 납입(연 최대 1,800만원)을 하면 연 900만원까지 세액공제를 받아요. 총급여 5,500만원 이하면 16.5%, 초과면 13.2% 공제율이에요. 연말정산 시 납입 확인서를 제출하면 돼요.",
    tip: "IRP 추가 납입 → 연 최대 148만 5,000원 세액공제",
  },
];

const CHECKLIST = [
  "IRP 계좌: 퇴직 전 개설 필수",
  "과세이연: IRP 이체로 납세 시점 연기",
  "연금 수령: 55세 이후 10년+ → 40% 감면",
  "추가 납입: 연 900만원 한도 세액공제 (16.5% 또는 13.2%)",
  "운용 상품: 위험성향에 맞게 예금·펀드·ETF 선택",
  "연말정산: 납입 확인서 제출로 세액공제 반영",
];

const FAQS = [
  {
    q: "IRP에 넣기만 해도 세금이 줄어드나요?",
    a: "이체 시점에 세금을 안 내는 거예요. 나중에 55세 이후 연금으로 받을 때 30~40% 감면 혜택이 생겨요. 55세 전에 인출하면 세금 전액 + 기타소득세(16.5%)가 붙어요.",
  },
  {
    q: "IRP 세액공제 한도가 얼마예요?",
    a: "IRP 추가 납입액 기준 연 900만원까지예요. 총급여 5,500만원 이하면 16.5%, 초과면 13.2% 공제율이에요. 900만원 납입 시 최대 148만 5,000원 환급돼요.",
  },
  {
    q: "연금으로 받으면 세금이 전혀 없나요?",
    a: "퇴직소득세 30~40% 감면이지, 면제는 아니에요. 나머지 60~70%는 납부해요. 운용수익에 대해서는 연금소득세(3.3~5.5%)가 별도로 붙어요.",
  },
  {
    q: "퇴직금을 IRP에 넣은 후 바로 빼면요?",
    a: "퇴직소득세가 전액 부과되고, 운용 기간 중 발생한 수익에는 기타소득세(16.5%)까지 붙어요. 절세 효과가 완전히 사라지죠.",
  },
  {
    q: "연말정산에서 퇴직금 세금을 환급받을 수 있나요?",
    a: "퇴직소득은 분류과세라서 근로소득 연말정산과 별개예요. 단, IRP에 추가 납입한 금액은 연말정산 세액공제 대상이에요. 납입 확인서를 회사 연말정산 담당자에게 제출하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제59조의3: 연금계좌 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여보장법: IRP 제도", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: IRP 세액공제 안내", url: "https://www.nts.go.kr" },
      { label: "금융감독원: IRP 가입·운용 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금-몇프로", title: "퇴직금 세금 몇 퍼센트나 나가나요?", description: "퇴직소득세 계산 공식을 설명해요." },
  { slug: "퇴직금-세금-환급", title: "퇴직금 세금 환급 방법", description: "과다 납부 시 환급받는 절차예요." },
  { slug: "퇴직금-irp-의무", title: "퇴직금 IRP 의무화 기준", description: "어떤 경우에 IRP로만 받아야 하나요?" },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-세금-절세-방법-IRP-연말정산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 절세 · IRP · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금 줄이는 방법<br />
        IRP 절세와 연말정산 세액공제 활용법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금에서 세금을 줄이는 방법이 있어요. IRP로 이체하고 55세 이후 10년 이상 연금으로 받으면
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의3</a>에
        따라 퇴직소득세의 40%를 감면받아요. IRP 추가 납입으로 연말정산 세액공제까지 받으면 이중 절세가 가능하죠.
        퇴직 전부터 준비해야 효과를 최대로 볼 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP로 퇴직금 세금을 어떻게 줄이나요?</H2>
      <p style={body}>
        가장 확실한 방법은 퇴직금을 IRP에 이체하고 연금으로 수령하는 거예요. IRP로 이체하면 퇴직소득세가 즉시 원천징수되지 않아요.
        나중에 55세 이후 연금으로 받을 때 비로소 세금이 부과되는데, 이때 30~40%를 감면받아요.
      </p>
      <p style={body}>
        두 번째는 IRP에 추가 납입을 해서 세액공제를 받는 방법이에요. 퇴직금과 별개로 본인이 추가로 넣는 금액에 대해
        연 900만원까지 세액공제가 적용돼요. 총급여 5,500만원 이하면 16.5%, 초과면 13.2%예요.
      </p>

      <GreenBox title="IRP 절세 방법 요약">
        IRP 이체 후 연금 수령 (55세+, 10년+) → 퇴직소득세 40% 감면<br />
        IRP 추가 납입 → 연 최대 148만 5,000원 세액공제<br />
        근속연수 1년 추가 → 근속연수공제 증가로 과세 기준 하락
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 절세 전략을 최대로 활용할 수 있는 상황이에요. 아래 절세 금액을 계산해보세요."
        partialMatchText="아직 준비 중인 항목이 있어요. IRP 계좌 개설부터 시작하세요."
      />

      <Divider />

      <H2>연금 수령 시 절세 금액 얼마나 될까요?</H2>
      <p style={body}>
        예상 퇴직소득세를 입력하면 일시금 수령과 연금 수령(10년 이상) 시 세금 차이를 바로 볼 수 있어요.
        퇴직소득세가 200만원이라면 연금 수령 시 80만원을 아끼는 거예요.
      </p>
      <p style={body}>
        예상 퇴직소득세는 퇴직소득원천징수영수증에서 확인할 수 있어요. 아직 퇴직 전이라면
        <a href="/w/퇴직금-세금-몇프로" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 세금 계산기</a>에서
        추정해볼 수 있어요.
      </p>

      <SectionBadge>IRP 절세 효과 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 55세 이후 10년 이상 연금 수령 기준 40% 감면이에요. 10년 미만은 30% 감면이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 절세에 필요한 서류</H2>
      <p style={body}>
        IRP 절세를 위해 퇴직 시 반드시 받아야 할 서류가 있어요. 퇴직소득원천징수영수증은
        이후 연금 수령 절차와 경정청구(환급 신청)에도 필요한 핵심 서류예요.
      </p>
      <p style={body}>
        연말정산에서 IRP 추가 납입 세액공제를 받으려면 금융기관에서 연금계좌 납입 확인서를 발급받아야 해요.
        금융기관 앱에서 발급되니 연말정산 시즌 전에 미리 준비해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 절세 실행 4단계</H2>
      <p style={body}>
        퇴직 전부터 준비해야 절세 효과를 최대로 볼 수 있어요. 퇴직 후에 IRP를 개설하면
        이미 원천징수가 끝난 뒤라서 절세 기회를 놓쳐요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 절세 체크리스트</H2>
      <p style={body}>
        퇴직 전 빠뜨리면 안 되는 항목들이에요. IRP 계좌 미개설이 가장 흔한 실수예요.
        퇴직금이 300만원을 초과하면 IRP로만 받아야 해서, 계좌 없이 퇴직하면 절차가 복잡해져요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="55세 전 인출 시 주의하세요">
        55세 이전 인출 → 퇴직소득세 전액 + 기타소득세(16.5%) 부과<br />
        절세 효과 완전 소멸 — 급하게 쓸 돈이라면 IRP 이체를 다시 생각해보세요.<br />
        긴급 자금이 필요할 수 있다면 일부는 일시금으로 수령도 가능해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 절세와 연말정산 활용에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
