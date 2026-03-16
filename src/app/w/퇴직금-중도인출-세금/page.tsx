"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-중도인출-세금";

const CHECK_ITEMS = [
  { id: "c1", label: "IRP에 있는 퇴직금을 55세 이전에 인출하고 싶어요" },
  { id: "c2", label: "법정 사유(주택·요양 등)로 중도 인출하려고 해요" },
  { id: "c3", label: "세금이 얼마나 나오는지 알고 싶어요" },
  { id: "c4", label: "중도 인출 시 절세 방법이 있는지 궁금해요" },
];

const CALC_SLIDERS = [
  {
    id: "balance",
    label: "IRP 잔액 (퇴직금)",
    min: 500, max: 10000, step: 500, defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1, max: 20, step: 1, defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
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
        v.years <= 5
          ? 300000 * v.years
          : v.years <= 10
          ? 1500000 + 500000 * (v.years - 5)
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
  "법정 사유 확인 — 세금 차이가 커요",
  "임의 인출 시 — 기타소득세 16.5% 추가",
  "법정 사유 인출 시 — 퇴직소득세만",
  "증빙서류 준비 — 사유에 맞는 서류",
  "원천징수영수증 — 인출 후 반드시 수령",
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
      { label: "근로자퇴직급여보장법 제7조 — IRP 중도 인출 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 — 기타소득세 과세 기준", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — IRP 중도 인출 안내", url: "https://www.fss.or.kr" },
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
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug={currentSlug}
        />
      }
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · IRP중도인출 · 세금</p>
        <h1 style={body.h1}>
          IRP에서 퇴직금을 중간에 빼면 세금이 얼마나 나오나요?
          <br />
          <span style={body.h1sub}>법정 사유 인출과 임의 인출의 세금 차이</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        IRP에 넣어둔 퇴직금, 급하게 써야 할 때 어떻게 되는지 아세요? 사유 없이 그냥 꺼내면 기타소득세 16.5%가 한꺼번에 붙어요. 퇴직금 3,000만원이라면 세금만 495만원이에요.
      </p>
      <p style={body.prose}>
        그런데 같은 인출이라도 이유에 따라 세금이 완전히 달라져요. 주택 구입, 요양, 천재지변처럼 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={body.link} target="_blank" rel="noopener noreferrer">근로자퇴직급여보장법</a>이 정한 사유로 빼면 퇴직소득세만 내요. 기타소득세 16.5%는 면제예요.
      </p>
      <p style={body.prose}>
        어떤 사유가 법정 사유에 해당하는지, 서류는 뭘 챙겨야 하는지, 세금이 얼마나 다른지 아래에서 하나씩 풀어드릴게요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      {/* 섹션 1: 인출 유형과 세금 차이 */}
      <H2>인출 유형에 따라 세금이 얼마나 다른가요</H2>

      <p style={body.prose}>
        IRP 중도 인출에는 크게 두 가지 유형이 있어요. 하나는 <strong>법정 사유 인출</strong>, 다른 하나는 <strong>임의 인출</strong>이에요. 세금 차이가 너무 커서, 어느 유형에 해당하는지부터 꼭 확인해야 해요.
      </p>

      <GreenBox title="법정 사유 인출 vs 임의 인출 세금 비교">
        · 법정 사유 인출: 퇴직소득세만 — 기타소득세 16.5% 면제<br />
        · 임의 인출: 퇴직소득세 + 기타소득세 16.5% 추가<br />
        · 퇴직금 3,000만원 기준 차이: 최대 495만원 이상
      </GreenBox>

      <p style={body.prose}>
        법정 사유에 해당하는 건 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={body.link} target="_blank" rel="noopener noreferrer">근로자퇴직급여보장법 시행령 제7조</a>에 명시되어 있어요. 무주택자의 주택 구입, 본인·배우자·부양가족의 6개월 이상 요양, 천재지변, 파산·회생 절차 개시가 해당돼요.
      </p>

      <BorderBox>
        <strong>법정 사유 인출 요건 (근로자퇴직급여보장법 시행령 제7조)</strong><br />
        · 무주택자의 본인 명의 주택 구입<br />
        · 본인·배우자·부양가족 6개월 이상 요양<br />
        · 천재지변, 파산·회생 절차 개시<br />
        · 가입자 또는 배우자의 의료비 납부 (연간 임금 12.5% 초과 시)
      </BorderBox>

      <p style={body.prose}>
        법정 사유에 해당하지 않으면 임의 인출로 분류돼요. 이 경우 퇴직소득세 위에 기타소득세 16.5%가 추가로 붙어요. 사유 하나 차이로 세금이 수백만원 달라지는 거예요. 인출 전에 반드시 본인 사유가 법정 사유에 포함되는지 IRP 금융기관에 문의해보세요.
      </p>

      <Divider />

      {/* 섹션 2: 세금 비교 계산기 */}
      <H2>법정 사유 인출과 임의 인출 세금 계산기</H2>

      <p style={body.prose}>
        IRP 잔액과 근속 기간을 입력하면 두 유형의 세금 차이를 바로 비교할 수 있어요. 법정 사유 인출은 근속연수 공제가 적용된 퇴직소득세만 계산되고, 임의 인출은 기타소득세 16.5%가 전액에 부과돼요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 사유 인출 세금은 근속연수공제 후 퇴직소득세 추정값이에요. 정확한 세액은 국세청 홈택스에서 확인하세요."
      />

      <p style={body.prose}>
        근속 기간이 길수록 법정 사유 인출 세금이 낮아지는 걸 볼 수 있어요. 퇴직소득세는 근속연수공제를 먼저 적용하고 남은 금액에 세율을 매기기 때문이에요. 반면 기타소득세는 잔액 전체에 16.5%를 그대로 부과해요. 이 차이가 근속 기간에 따라 더 벌어져요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>중도 인출 전에 챙겨야 할 서류</H2>

      <p style={body.prose}>
        법정 사유로 인출하려면 해당 사유를 증명하는 서류가 필요해요. 서류 없이 신청하면 법정 사유 인출로 인정받지 못하고 임의 인출로 처리될 수 있어요. 세금 차이가 크기 때문에 서류 준비를 가장 먼저 챙겨야 해요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        주택 구입 사유라면 매매계약서와 무주택 확인서가 핵심이에요. 무주택 확인서는 <a href="https://www.gov.kr" style={body.link} target="_blank" rel="noopener noreferrer">정부24</a>에서 발급해요. 요양 사유라면 의사 진단서와 6개월 이상 요양 필요성을 입증하는 서류가 있어야 해요.
      </p>

      <p style={body.prose}>
        IRP 금융기관마다 요구 서류가 조금씩 달라요. 신청 전 금융기관 고객센터나 앱에서 서류 목록을 먼저 확인하면 헛걸음을 줄일 수 있어요. 서류가 준비됐으면 앱으로도 신청할 수 있어서 방문하지 않아도 돼요.
      </p>

      <Divider />

      {/* 섹션 4: 절차 */}
      <H2>중도 인출 신청하는 절차</H2>

      <p style={body.prose}>
        서류가 준비됐다면 신청 자체는 간단해요. IRP 금융기관 앱에서 중도 인출 메뉴를 찾아 유형을 선택하고 서류를 첨부하면 돼요. 법정 사유 인출인지 임의 인출인지 유형 선택이 제일 중요해요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        세금은 금융기관이 자동으로 원천징수하고 나머지를 지급해요. 수령 후에는 원천징수영수증을 꼭 발급받으세요. 나중에 세금 신고나 환급 청구 시 필요하고, 임의 인출이라면 종합소득세 신고가 필요한 경우도 있어요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>중도 인출 전 최종 확인 체크리스트</H2>

      <p style={body.prose}>
        서류도 챙기고, 유형도 선택했는데 놓친 게 없는지 한 번 더 봐야 해요. 아래 목록 하나씩 체크하면 인출 후 세금 문제나 서류 미비로 낭패 보는 일을 막을 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox title="인출 전 마지막 확인">
        · 법정 사유 해당 여부 — 서류로 증명 가능한가요?<br />
        · 기타소득세 16.5% — 이걸 낼 여력이 없다면 법정 사유 인출이 필수예요<br />
        · 55세까지 기다릴 수 있다면 — 연금 수령으로 30% 추가 절세 가능해요
      </GreenBox>

      <p style={body.prose}>
        중도 인출은 일단 하고 나면 돌이킬 수 없어요. IRP 잔액이 줄면 나중에 <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={body.link}>연금 수령 때 받을 금액</a>도 줄어들어요. 정말 급한 상황이 아니라면 인출 대신 IRP 담보 대출을 먼저 알아보는 것도 방법이에요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중도 인출을 고려하고 있군요. 법정 사유에 해당하는지 먼저 확인하고, 필요한 만큼만 인출하세요."
        partialMatchText="아직 정보가 부족해요. IRP 가입 금융기관이나 금융감독원(1332)에 상담을 받아보세요."
      />

      <Divider />

      {/* 섹션 6: FAQ */}
      <H2>자주 묻는 것들</H2>

      <p style={body.prose}>
        퇴직금 중도인출 세금에 대해 자주 나오는 질문이에요. 내 상황과 맞는 항목을 찾아보세요.
      </p>

      <FAQ items={FAQS} />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 금융감독원(1332) 또는 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
