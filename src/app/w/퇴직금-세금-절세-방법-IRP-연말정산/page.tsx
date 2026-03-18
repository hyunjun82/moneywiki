"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "IRP 계좌를 퇴직 전에 미리 개설했어요" },
  { id: "c2", label: "퇴직금을 일시금이 아닌 IRP로 이체받았어요" },
  { id: "c3", label: "만 55세 이후에 연금 수령을 시작할 수 있어요" },
  { id: "c4", label: "연금 수령 기간을 10년 이상으로 설정했어요" },
];

const CALC_SLIDERS = [
  {
    id: "tax",
    label: "예상 퇴직소득세",
    min: 50,
    max: 2000,
    step: 10,
    defaultValue: 300,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
];

const CALC_RESULTS = [
  {
    label: "일시금 수령 시 납부 세금",
    getValue: (v: Record<string, number>) => v.tax * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "연금 10년 이상 수령 시 절세액 (40% 감면)",
    getValue: (v: Record<string, number>) => Math.round(v.tax * 10000 * 0.4),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 후 실제 납부 세금",
    getValue: (v: Record<string, number>) => Math.round(v.tax * 10000 * 0.6),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직소득원천징수영수증", required: true, where: "퇴직 시 회사 인사팀 발급" },
  { name: "IRP 계좌 개설 확인서", required: true, where: "IRP 개설 금융기관 (은행·증권사 앱)" },
  { name: "연금 수령 신청서", required: true, where: "IRP 운용 금융기관 앱 또는 방문" },
  { name: "연금계좌 납입 확인서 (연말정산용)", required: false, where: "금융기관 앱에서 직접 발급" },
];

const STEPS = [
  {
    title: "퇴직 전 IRP 계좌 개설",
    desc: "퇴직 전에 IRP 계좌를 먼저 만들고, 인사팀에 계좌번호를 알려줘야 해요. 퇴직 후 IRP를 열면 이미 원천징수가 끝난 뒤라서 절세 기회를 놓쳐요. 은행·증권사 앱에서 10분이면 개설할 수 있어요.",
    tip: "퇴직금이 300만원을 넘으면 IRP로만 받아야 하는 의무도 있어요",
  },
  {
    title: "IRP로 퇴직금 이체 — 과세이연 시작",
    desc: "퇴직금이 IRP에 입금되면 퇴직소득세가 즉시 원천징수되지 않아요. 세금 납부 시점이 연금 수령 때로 미뤄지는 '과세이연' 상태가 돼요. 그 사이 운용수익도 세금 없이 불어나요.",
    tip: "IRP 이체 = 지금 낼 세금을 나중으로 미루기 + 연금 수령 시 감면 혜택까지",
  },
  {
    title: "만 55세 이후 연금 수령 신청",
    desc: "만 55세가 넘으면 IRP에서 연금 수령을 신청할 수 있어요. 10년 이상 나눠 받으면 퇴직소득세의 40%를 감면받고, 10년 미만이면 30%예요. 금융기관 앱에서 수령 기간과 금액을 직접 설정하면 돼요.",
    tip: "10년 이상 수령으로 설정하면 감면율이 30% → 40%로 올라가요",
  },
  {
    title: "IRP 추가 납입으로 연말정산 세액공제",
    desc: "퇴직금과 별도로 내 돈을 IRP에 추가 납입(연 최대 1,800만원)하면 연 900만원까지 세액공제를 받아요. 총급여 5,500만원 이하면 16.5%, 초과면 13.2%가 공제율이에요. 900만원 납입 시 최대 148만 5,000원이 돌아와요.",
    tip: "납입 확인서를 연말정산 때 회사에 제출하거나 홈택스에 직접 반영하면 돼요",
  },
];

const CHECKLIST = [
  "IRP 계좌: 퇴직 전 개설 완료 — 퇴직 후 개설은 절세 효과 없음",
  "과세이연: 퇴직금 IRP 이체로 납세 시점 연기",
  "연금 수령 조건: 만 55세 이후 + 10년 이상 설정 → 40% 감면",
  "추가 납입: 연 900만원 한도 세액공제 (16.5% 또는 13.2%)",
  "55세 전 인출 금지: 퇴직소득세 전액 + 기타소득세 16.5% 부과",
  "연말정산: 납입 확인서 금융기관 앱에서 발급 후 제출",
];

const FAQS = [
  {
    q: "IRP에 넣기만 해도 세금이 줄어드나요?",
    a: "이체 즉시 세금이 줄지는 않아요. 대신 지금 낼 세금이 나중으로 미뤄지고(과세이연), 55세 이후 연금으로 받을 때 30~40%가 감면돼요. 55세 전에 빼면 세금 전액에 기타소득세(16.5%)까지 붙으니 주의해야 해요.",
  },
  {
    q: "IRP 세액공제 한도가 얼마예요?",
    a: "IRP 추가 납입액 기준으로 연 900만원(연금저축 포함 합산)까지예요. 총급여 5,500만원 이하면 16.5%, 초과면 13.2% 공제율이에요. 900만원을 꽉 채워 넣으면 최대 148만 5,000원이 환급돼요.",
  },
  {
    q: "연금으로 받으면 세금이 아예 없나요?",
    a: "면제가 아니라 감면이에요. 퇴직소득세를 10년 이상 수령 시 40% 덜 내고, 나머지 60%는 납부해요. 운용수익에 대해서는 연금소득세(3.3~5.5%)가 별도로 부과돼요.",
  },
  {
    q: "IRP에 넣은 퇴직금을 바로 인출하면 어떻게 되나요?",
    a: "퇴직소득세가 전액 부과되고, 운용 중 발생한 수익에는 기타소득세(16.5%)까지 붙어요. 절세 효과가 사라지는 건 물론이고, 이자 수익까지 세금이 붙어서 오히려 손해예요.",
  },
  {
    q: "연말정산에서 퇴직금 세금을 환급받을 수 있나요?",
    a: "퇴직소득은 근로소득과 별개 과세(분류과세)라서 근로소득 연말정산과는 직접 관계가 없어요. 단, IRP에 추가 납입한 금액은 연말정산 세액공제 대상이에요. 납입 확인서를 회사 연말정산 담당자에게 제출하면 돼요.",
  },
  {
    q: "퇴직금 말고 연금저축도 IRP 세액공제에 같이 포함되나요?",
    a: "맞아요. 연금저축 납입액과 IRP 추가 납입액을 합쳐서 연 900만원까지 세액공제를 받아요. 연금저축만 있다면 최대 600만원까지예요. IRP를 추가하면 한도가 900만원으로 늘어나요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제59조의3: 연금계좌 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여보장법: IRP 과세이연 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: IRP·연금저축 세액공제 안내", url: "https://www.nts.go.kr" },
      { label: "금융감독원: IRP 가입·운용 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금-몇프로", title: "퇴직금 세금 몇 퍼센트 나오나요?", description: "퇴직소득세 계산 공식과 구간별 세율을 설명해요." },
  { slug: "퇴직금-세금-환급", title: "퇴직금 세금 환급 방법", description: "과다 납부 시 경정청구로 돌려받는 절차예요." },
  { slug: "퇴직금-irp-의무", title: "퇴직금 IRP 의무화 기준", description: "어떤 경우에 IRP로만 받아야 하는지 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-세금-절세-방법-IRP-연말정산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 절세 · IRP · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금 줄일 수 있는 방법 있나요?<br />
        IRP 과세이연부터 연말정산 세액공제까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금에서 세금을 줄이는 가장 확실한 방법은 IRP 계좌예요.
        IRP로 이체하면 지금 낼 퇴직소득세가 나중으로 미뤄지고,
        55세 이후 10년 이상 연금으로 받으면{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          소득세법 제59조의3
        </a>
        에 따라 최대 40%가 감면돼요.
        거기에 IRP 추가 납입으로 연말정산 세액공제까지 받으면 이중 절세가 돼요.
        퇴직 전부터 준비해야 효과가 나오니 순서대로 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 핵심 개념/자격 → EligibilityChecker */}
      <H2>IRP 절세 전략, 내 상황에 맞나요?</H2>
      <p style={body}>
        IRP 절세는 '퇴직 전 계좌 개설 → 이체 → 55세 이후 연금 수령'이라는 3단계 흐름이에요.
        이 중 하나라도 빠지면 절세 효과가 크게 줄어요.
        특히 퇴직 후 IRP를 개설하면 이미 원천징수가 끝난 뒤라서 과세이연 자체가 불가능해요.
      </p>
      <p style={body}>
        추가 납입 세액공제는 이와 별도로, 퇴직 여부와 관계없이 근로 중에 꾸준히 납입하는 방식이에요.
        연 900만원 한도(연금저축 합산) 안에서 소득 구간에 따라 13.2~16.5%를 돌려받아요.
      </p>

      <GreenBox title="IRP 절세 방법 3가지">
        ① 과세이연: IRP 이체 → 퇴직소득세 납부 시점을 연금 수령 때로 연기<br />
        ② 감면 수령: 55세 이후 10년+ 연금 수령 → 퇴직소득세 40% 감면<br />
        ③ 세액공제: IRP 추가 납입 연 900만원 한도 → 연말정산 최대 148만 5,000원 환급
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 절세 전략을 최대로 활용할 수 있는 상황이에요. 아래 계산기로 절세 금액을 확인해보세요."
        partialMatchText="아직 준비 안 된 항목이 있어요. IRP 계좌 개설과 수령 기간 설정이 가장 먼저예요."
      />

      <Divider />

      {/* H2-2: 금액/계산 → Calculator */}
      <H2>연금으로 받으면 세금이 얼마나 줄어요?</H2>
      <p style={body}>
        예상 퇴직소득세를 입력하면 일시금 수령과 10년 이상 연금 수령 시 세금 차이를 바로 볼 수 있어요.
        퇴직소득세 300만원이라면 10년 이상 연금 수령 시 120만원을 아낄 수 있어요.
      </p>
      <p style={body}>
        예상 퇴직소득세는 퇴직소득원천징수영수증에서 확인할 수 있어요.
        아직 퇴직 전이라면{" "}
        <a href="/w/퇴직금-세금-몇프로" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          퇴직금 세금 계산 방법
        </a>
        을 먼저 보세요.
      </p>

      <SectionBadge>IRP 절세 효과 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 55세 이후 10년 이상 연금 수령 기준 40% 감면이에요. 10년 미만은 30% 감면이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 서류/증빙 → DocTable */}
      <H2>IRP 절세에 필요한 서류</H2>
      <p style={body}>
        IRP 절세를 위해 퇴직 시 반드시 챙겨야 할 서류가 있어요.
        퇴직소득원천징수영수증은 나중에 연금 수령 신청이나 세금 경정청구(환급 신청) 때도 필요해요.
      </p>
      <p style={body}>
        연말정산에서 IRP 추가 납입 세액공제를 받으려면 연금계좌 납입 확인서가 필요해요.
        금융기관 앱에서 바로 발급되니 연말정산 시즌 전에 미리 챙겨두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 절차/방법 → Steps */}
      <H2>퇴직금 절세 실행 순서</H2>
      <p style={body}>
        퇴직 전부터 준비해야 절세 효과가 나와요.
        퇴직 후에 IRP를 열면 이미 원천징수가 끝난 뒤라서 과세이연이 불가능해요.
        4단계 순서를 지키면 퇴직소득세를 최대 40%까지 줄일 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 준비/주의사항 → Checklist + GreenBox */}
      <H2>절세 놓치지 않으려면 이것만 챙기세요</H2>
      <p style={body}>
        IRP 계좌 미개설이 가장 흔한 실수예요.
        퇴직금이 300만원을 넘으면 IRP로만 받아야 하는 의무도 있어서,
        계좌 없이 퇴직하면 절차가 복잡해지고 절세 기회까지 날아가요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="55세 전 인출하면 오히려 손해예요">
        55세 이전 인출 → 퇴직소득세 전액 + 기타소득세(16.5%) 부과<br />
        운용 중 발생한 수익에도 세금이 붙어서 절세 효과가 완전히 사라져요.<br />
        급하게 쓸 돈이 있다면 일부는 처음부터 일시금으로 수령하는 방법도 있어요.
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 절세와 연말정산 세액공제에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법 및 근로자퇴직급여보장법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인해봐요." />
    </ArticleLayout>
  );
}
