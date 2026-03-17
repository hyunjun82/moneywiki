"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "법적으로 혼인한 기간이 있어요 (혼인신고 기준)" },
  { id: "c2", label: "배우자가 혼인 기간 중 직장에 다녔어요" },
  { id: "c3", label: "이혼 절차(협의 또는 소송)를 진행 중이거나 확정됐어요" },
  { id: "c4", label: "이혼 확정일로부터 2년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "total", label: "배우자 퇴직금 예상 총액 (만원)", min: 100, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "total_years", label: "총 근속연수 (년)", min: 1, max: 40, step: 1, defaultValue: 15, format: (v: number) => `${v}년` },
  { id: "married_years", label: "혼인 기간 중 근무 연수 (년)", min: 1, max: 40, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "재산분할 대상 퇴직금",
    getValue: (v: Record<string, number>) => {
      const ratio = Math.min(v.married_years / v.total_years, 1);
      return Math.round(v.total * ratio);
    },
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "혼인 기간 비율",
    getValue: (v: Record<string, number>) => Math.min(Math.round((v.married_years / v.total_years) * 100), 100),
    format: (v: number) => `${v}%`,
  },
];

const DOCS = [
  { name: "혼인관계증명서 (상세)", required: true, where: "주민센터 또는 정부24" },
  { name: "가족관계증명서", required: true, where: "주민센터 또는 정부24" },
  { name: "배우자 재직증명서 또는 경력증명서", required: true, where: "배우자 직장" },
  { name: "배우자 근로소득원천징수영수증 (최근 3년)", required: true, where: "배우자 직장 또는 홈택스" },
  { name: "국민연금 가입내역 확인서 (배우자)", required: false, where: "국민연금공단 또는 정부24" },
  { name: "재산분할 협의서 또는 소장 (재판이혼 시)", required: false, where: "법원 또는 법률구조공단" },
];

const STEPS = [
  {
    title: "배우자 퇴직금 규모 파악",
    desc: "배우자의 근속기간과 평균임금을 기준으로 퇴직금 예상액을 산정해요. 재직 중이라면 이혼 시점까지 쌓인 잠정 퇴직금이 기준이에요.",
    tip: "배우자가 자료를 안 주면 법원에 금융정보 조회 신청을 할 수 있어요",
  },
  {
    title: "혼인 기간 중 근무 비율 계산",
    desc: "전체 근속기간 중 혼인 기간이 차지하는 비율을 계산해요. 총 퇴직금 × (혼인 중 근무연수 ÷ 전체 근속연수)가 재산분할 대상이에요.",
    tip: "혼인신고일 기준으로 계산해요. 사실혼 기간도 인정될 수 있어요",
  },
  {
    title: "협의 또는 소송 진행",
    desc: "협의이혼이라면 재산분할 비율을 합의로 정해요. 합의가 안 되면 이혼소송에서 기여도·혼인 기간 등을 법원이 종합 판단해요.",
    tip: "공정증서나 조정조서를 작성하면 나중에 강제집행이 훨씬 쉬워요",
    link: { label: "법률구조공단 무료 상담 신청", href: "https://www.klac.or.kr" },
  },
  {
    title: "퇴직금 수령 시점 조건 명시",
    desc: "배우자가 재직 중이라면 실제 퇴직 후 분할 비율만큼 지급받는 방식으로 처리해요. 협의서나 판결문에 이 조건을 명확히 써야 나중에 분쟁이 없어요.",
    tip: "판결 확정 후 이행하지 않으면 강제집행으로 퇴직금 계좌 압류 가능해요",
  },
];

const CHECKLIST = [
  "혼인관계증명서(상세) 발급: 혼인신고일·이혼일 모두 기재된 버전 필요",
  "배우자 근속기간 파악: 입사일·퇴사일 기준으로 전체 근속연수 확인",
  "혼인 기간 중 근무 연수 계산: 혼인신고일 이후 근무 기간만 산정",
  "재산분할 청구권 시효: 이혼 확정일로부터 2년 내 행사 필수",
  "재직 중 배우자: 판결문·협의서에 '퇴직 시 지급' 조건 명시",
  "법률 전문가 상담: 기여도 인정 비율은 개인 상황에 따라 달라요",
];

const FAQS = [
  {
    q: "배우자가 아직 퇴직하지 않았는데도 퇴직금을 재산분할 받을 수 있나요?",
    a: "받을 수 있어요. 재직 중이더라도 이혼 시점까지 쌓인 잠정 퇴직금은 재산분할 대상이에요. 판결문이나 협의서에 '퇴직 시 지급' 조건을 명시하면 실제 퇴직 후 받을 수 있어요.",
  },
  {
    q: "혼인 전부터 다니던 회사면 퇴직금을 다 나눠야 하나요?",
    a: "아니에요. 혼인 기간 중 근무한 부분만 재산분할 대상이에요. 혼인 전 근무 기간에 해당하는 퇴직금은 분할에서 제외돼요. 총 퇴직금 × (혼인 중 근무연수 ÷ 전체 근속연수)로 계산해요.",
  },
  {
    q: "퇴직연금(DB·DC형)이나 IRP도 재산분할 대상인가요?",
    a: "맞아요. DB형, DC형, IRP 계좌 잔액 모두 혼인 기간 적립분은 재산분할 대상이에요. 혼인 전 기간이나 이혼 후 적립분은 제외돼요.",
  },
  {
    q: "재산분할 청구는 언제까지 해야 하나요?",
    a: "이혼 확정일로부터 2년 이내예요. 이 기간이 지나면 청구권이 소멸해요. 협의이혼이든 재판이혼이든 이혼 확정일 기준이에요.",
  },
  {
    q: "배우자가 퇴직금 정보를 알려주지 않으면 어떻게 하나요?",
    a: "재판이혼 절차에서 법원에 금융정보 조회를 신청할 수 있어요. 법원이 배우자 직장에 자료 제출을 명령할 수 있어요. 법률구조공단(132)에서 무료 지원도 받을 수 있어요.",
  },
  {
    q: "분할 비율이 무조건 50%인가요?",
    a: "꼭 그렇지는 않아요. 혼인 기간, 각자의 기여도, 가사노동, 자녀 양육 등을 종합해서 법원이 결정해요. 실무상 50%에 가깝게 결정되는 경우가 많지만 개인 사정에 따라 달라져요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 판례",
    items: [
      { label: "민법 제839조의2: 재산분할청구권", url: "https://www.law.go.kr/법령/민법" },
      { label: "근로자퇴직급여 보장법: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "대법원 2014므1378: 미지급 퇴직금 재산분할 판례", url: "https://glaw.scourt.go.kr" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "법원: 이혼 재산분할 절차 안내", url: "https://www.scourt.go.kr" },
      { label: "법률구조공단: 무료 법률 상담", url: "https://www.klac.or.kr" },
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 정리", description: "일시금·연금·IRP 이전 절차까지." },
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산 기준", description: "3개월 임금으로 평균임금 산정하는 법." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "근속연수·평균임금으로 퇴직금 계산하기." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="이혼-퇴직금-재산분할-대상" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 재산분할 · 이혼</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼할 때 배우자 퇴직금, 내 몫이 있나요?<br />
        재산분할 대상 여부와 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼할 때 배우자의 퇴직금도 재산분할 대상이에요.
        혼인 기간 중 형성된 퇴직금은 부부 공동 재산으로 보기 때문이에요.
        배우자가 아직 재직 중이더라도 이혼 시점까지 쌓인 잠정 퇴직금을 기준으로 청구할 수 있어요.
        혼인 전 근무분은 제외되고, 혼인 기간 비율로만 산정해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 재산분할, 청구할 수 있는 조건은?</H2>
      <p style={body}>
        결혼 후 근무한 기간에 쌓인 퇴직금은 부부 공동 재산으로 봐요.
        혼인 전부터 다니던 직장이라면 혼인 전 기간은 빠지고, 혼인 기간 부분만 분할 대상이에요.
        이미 퇴직해서 받은 퇴직금은 물론, 아직 재직 중인 미지급 퇴직금도 청구 가능해요.
      </p>
      <p style={body}>
        퇴직연금(DB·DC형)과 IRP 잔액도 동일하게 분할 대상이에요.
        재산분할 청구권은 이혼 확정일로부터 2년이 지나면 소멸해요.
        이혼이 확정되면 바로 청구 절차를 시작하는 게 좋아요.
      </p>

      <GreenBox title="재산분할 대상 퇴직금 범위">
        분할 대상: 혼인신고일 이후 ~ 이혼 시점까지 근무 기간 해당 퇴직금<br />
        분할 제외: 혼인 전 적립분, 이혼 후 새로 쌓이는 부분<br />
        재산분할 청구권 소멸시효: 이혼 확정일로부터 2년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 재산분할 청구 조건을 갖추고 있어요. 아래 계산기로 대상 금액을 확인해보세요."
        partialMatchText="일부 조건이 다를 수 있어요. 법률구조공단(132)에서 무료 상담을 받아보세요."
      />

      <Divider />

      <H2>재산분할 대상 퇴직금, 얼마나 되나요?</H2>
      <p style={body}>
        계산식은 이렇게 돼요. 총 퇴직금 예상액 × (혼인 중 근무연수 ÷ 전체 근속연수)가 재산분할 대상이에요.
        예를 들어 퇴직금이 3,000만원이고 총 근속 15년 중 혼인 기간이 10년이라면 2,000만원이 분할 대상이에요.
        이 금액을 기여도에 따라 다시 나눠요.
      </p>

      <SectionBadge>재산분할 대상 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 혼인 기간 비율로 산정한 분할 대상 금액이에요. 실제 분할 비율은 법원이 기여도를 고려해 결정해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>재산분할 청구에 필요한 서류</H2>
      <p style={body}>
        협의이혼이든 재판이혼이든 배우자의 근무 기간과 퇴직금 규모를 증명할 서류가 필요해요.
        혼인관계증명서는 꼭 '상세' 버전으로 발급받아야 해요. 혼인신고일과 이혼일이 모두 기재돼야 혼인 기간을 정확히 계산할 수 있어요.
      </p>
      <p style={body}>
        배우자가 협조하지 않는다면 법원을 통해 자료 제출 명령을 신청할 수 있어요.
        국민연금 가입내역으로 배우자의 근속 기간을 간접적으로 확인하는 방법도 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 재산분할 청구 절차 4단계</H2>
      <p style={body}>
        협의로 합의되면 가장 빠르고, 합의가 안 되면 이혼소송에서 법원이 결정해요.
        배우자가 재직 중이라면 실제 퇴직 후 지급받는 방식으로 처리하고, 이 조건을 협의서나 판결문에 반드시 명시해야 해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 꼭 확인할 것들</H2>
      <p style={body}>
        재산분할 청구권 시효는 2년이에요. 이혼 후 2년이 지나면 청구할 수 없어요.
        배우자가 재직 중이라면 판결문에 '퇴직 시 지급' 조건을 반드시 명시해야 나중에 문제가 없어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="사실혼도 재산분할 청구 가능해요">
        법적 혼인뿐 아니라 사실혼 관계도 재산분할 대상이에요.
        동거 기간, 생활비 공유, 자녀 등 사실혼을 입증할 자료를 함께 준비해야 해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        이혼 시 퇴직금 재산분할에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법 제839조의2 및 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 개인 상황에 따라 결과가 달라질 수 있으니 법률구조공단(132) 또는 가정법원 상담을 권해요." />
    </ArticleLayout>
  );
}
