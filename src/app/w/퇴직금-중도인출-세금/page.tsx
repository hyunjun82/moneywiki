"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "IRP에 퇴직금이 들어와 있어요" },
  { id: "c2", label: "법정 사유(주택·요양 등)로 중도 인출하려고 해요" },
  { id: "c3", label: "55세 이전이에요" },
  { id: "c4", label: "사유별 증빙서류를 준비할 수 있어요" },
];

const CALC_SLIDERS = [
  { id: "balance", label: "IRP 잔액 (퇴직금)", min: 500, max: 10000, step: 500, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "55세 이전 임의 인출 세금 (기타소득세 16.5%)",
    getValue: (v: Record<string, number>) => Math.round(v.balance * 10000 * 0.165),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "법정 사유 인출 세금 (퇴직소득세만)",
    getValue: (v: Record<string, number>) => {
      const deduction =
        v.years <= 5 ? 300000 * v.years
        : v.years <= 10 ? 1500000 + 500000 * (v.years - 5)
        : 4000000 + 800000 * (v.years - 10);
      const taxBase = Math.max(0, v.balance * 10000 - deduction);
      return Math.round(taxBase * 0.06 * 0.5);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "사유 증빙서류 (주택계약서·진단서 등)", required: true, where: "사유에 따라 다름" },
  { name: "IRP 중도 인출 신청서", required: true, where: "IRP 금융기관 앱 또는 방문" },
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "무주택 확인서 (주택 구입 사유 시)", required: false, where: "정부24" },
];

const STEPS = [
  {
    title: "인출 유형 확인",
    desc: "IRP 중도 인출에는 두 가지 유형이 있어요. 법정 사유(주택구입·요양·천재지변 등)로 인출하면 퇴직소득세만 내요. 법정 사유 없이 임의 인출하면 기타소득세 16.5%가 추가돼요.",
    tip: "법정 사유 인출이 세금이 훨씬 적어요",
  },
  {
    title: "증빙서류 준비",
    desc: "법정 사유 인출이라면 해당 사유 증빙서류를 준비해요. 주택 구입이면 매매계약서, 요양이면 진단서·치료비 영수증이에요. 서류가 미비하면 법정 사유 인출이 거부돼요.",
    tip: "증빙서류는 사유 발생 후 빠르게 준비해야 해요",
  },
  {
    title: "IRP 금융기관에 인출 신청",
    desc: "IRP 금융기관 앱 또는 방문으로 중도 인출을 신청해요. 신청 시 인출 유형(법정/임의)을 선택해요. 세금은 자동으로 원천징수 후 지급돼요.",
    tip: "앱으로 신청하면 빠르게 처리돼요",
  },
  {
    title: "세금 확인 및 수령",
    desc: "퇴직소득세 또는 기타소득세가 원천징수된 후 인출돼요. 원천징수영수증을 발급받아 세금을 확인해요. 종합소득세 신고가 필요한 경우도 있어요.",
    tip: "수령 후 원천징수영수증을 꼭 받아두세요",
  },
];

const CHECKLIST = [
  "법정 사유 확인: 세금 차이가 커요",
  "임의 인출 시: 기타소득세 16.5% 추가",
  "법정 사유 인출 시: 퇴직소득세만",
  "증빙서류 준비: 사유에 맞는 서류",
  "원천징수영수증: 인출 후 반드시 수령",
];

const FAQS = [
  {
    q: "55세 이전에 IRP 퇴직금을 인출하면 세금이 얼마인가요?",
    a: "임의 인출 시 퇴직소득세 + 기타소득세 16.5%가 부과돼요. 법정 사유 인출 시에는 퇴직소득세만 내요. 법정 사유 인출이 세금이 훨씬 적어요.",
  },
  {
    q: "주택 구입을 위해 IRP를 인출하면 세금이 줄어드나요?",
    a: "법정 사유 인출이라 기타소득세 16.5%가 면제돼요. 퇴직소득세만 납부하면 돼요. 근속연수 공제도 적용돼요.",
  },
  {
    q: "55세 이후에 인출하면 세금이 어떻게 되나요?",
    a: "55세 이후 연금으로 수령하면 퇴직소득세의 30%를 절감해요. 일시금으로 인출하면 퇴직소득세 전액을 내요.",
  },
  {
    q: "기타소득세 16.5%는 언제 붙나요?",
    a: "법정 사유 없이 55세 이전에 임의로 인출할 때 붙어요. 법정 사유가 있으면 면제돼요.",
  },
  {
    q: "IRP 중도 인출 후 다시 넣을 수 있나요?",
    a: "IRP에 다시 납입할 수 있어요. 납입 시 세액공제 혜택도 적용돼요. 단, 이미 인출한 퇴직금을 다시 넣어도 이전 세금 혜택이 복원되진 않아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제7조: IRP 중도 인출 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법: 기타소득세 과세 기준", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 중도 인출 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "irp-퇴직금-인출", title: "IRP 퇴직금 인출 방법", description: "55세 기준 세율 분기와 인출 절차." },
  { slug: "퇴직금-일시금-세금", title: "퇴직금 일시금 세금", description: "일시금 수령 시 퇴직소득세 계산." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "퇴직금 절세 방법", description: "IRP 연금 수령으로 세금 줄이는 법." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중도인출-세금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP중도인출 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP에서 퇴직금을 중간에 빼면 세금이 얼마나 나오나요?<br />
        법정 사유 인출과 임의 인출의 세금 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP에 넣어둔 퇴직금, 급하게 써야 할 때 사유 없이 꺼내면 기타소득세 16.5%가 한꺼번에 붙어요.
        퇴직금 3,000만원이라면 세금만 495만원이에요. 같은 인출이라도 이유에 따라 세금이 완전히 달라져요.
        주택 구입, 요양처럼 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 정한 사유로 빼면 퇴직소득세만 내요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>인출 유형에 따라 세금이 얼마나 다른가요?</H2>
      <p style={body}>
        IRP 중도 인출에는 크게 두 가지 유형이 있어요. 하나는 법정 사유 인출, 다른 하나는 임의 인출이에요.
        세금 차이가 너무 커서, 어느 유형에 해당하는지부터 꼭 확인해야 해요.
      </p>
      <p style={body}>
        법정 사유에 해당하는 건 근로자퇴직급여보장법 시행령 제7조에 명시되어 있어요.
        무주택자의 주택 구입, 본인·배우자·부양가족의 6개월 이상 요양, 천재지변, 파산·회생이 해당돼요.
      </p>

      <GreenBox title="법정 사유 인출 vs 임의 인출 세금 비교">
        · 법정 사유 인출: 퇴직소득세만 (기타소득세 16.5% 면제)<br />
        · 임의 인출: 퇴직소득세 + 기타소득세 16.5% 추가<br />
        · 퇴직금 3,000만원 기준 차이: 최대 495만원 이상
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="법정 사유 인출 조건에 해당해요. 아래 계산기로 세금 차이를 확인해보세요."
        partialMatchText="IRP 가입 금융기관이나 금융감독원(1332)에 상담을 받아보세요."
      />

      <Divider />

      <H2>법정 사유 인출과 임의 인출 세금 계산기</H2>
      <p style={body}>
        IRP 잔액과 근속 기간을 입력하면 두 유형의 세금 차이를 바로 비교할 수 있어요.
        법정 사유 인출은 근속연수 공제가 적용된 퇴직소득세만 계산되고, 임의 인출은 기타소득세 16.5%가 전액에 부과돼요.
      </p>

      <SectionBadge>중도 인출 세금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 사유 인출 세금은 근속연수공제 후 퇴직소득세 추정값이에요. 정확한 세액은 국세청 홈택스에서 확인하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>중도 인출 전에 챙겨야 할 서류</H2>
      <p style={body}>
        법정 사유로 인출하려면 해당 사유를 증명하는 서류가 필요해요.
        서류 없이 신청하면 법정 사유 인출로 인정받지 못하고 임의 인출로 처리될 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        주택 구입 사유라면 매매계약서와 무주택 확인서가 핵심이에요.
        IRP 금융기관마다 요구 서류가 조금씩 다르니 신청 전 금융기관 고객센터나 앱에서 먼저 확인하세요.
      </p>

      <Divider />

      <H2>중도 인출 신청하는 절차</H2>
      <p style={body}>
        서류가 준비됐다면 신청 자체는 간단해요. IRP 금융기관 앱에서 중도 인출 메뉴를 찾아 유형을 선택하고 서류를 첨부하면 돼요.
        법정 사유 인출인지 임의 인출인지 유형 선택이 제일 중요해요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        세금은 금융기관이 자동으로 원천징수하고 나머지를 지급해요.
        수령 후에는 원천징수영수증을 꼭 발급받으세요. 나중에 세금 신고나 환급 청구 시 필요해요.
      </p>

      <Divider />

      <H2>중도 인출 전 최종 확인 체크리스트</H2>
      <p style={body}>
        서류도 챙기고, 유형도 선택했는데 놓친 게 없는지 한 번 더 봐야 해요.
        아래 목록 하나씩 체크하면 인출 후 세금 문제로 낭패 보는 일을 막을 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="인출 전 마지막 확인">
        · 법정 사유 해당 여부: 서류로 증명 가능한가요?<br />
        · 기타소득세 16.5%: 이걸 낼 여력이 없다면 법정 사유 인출이 필수예요<br />
        · 55세까지 기다릴 수 있다면: 연금 수령으로 30% 추가 절세 가능해요
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 중도인출 세금에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 금융감독원(1332) 또는 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
