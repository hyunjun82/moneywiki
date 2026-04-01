"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

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
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="이혼-퇴직금-재산분할-대상" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 재산분할 · 이혼</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼할 때 배우자 퇴직금, 내 몫이 있나요?<br />
        재산분할 대상 여부와 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "배우자 퇴직금도 내가 받을 수 있나요?"
      </p>
      <p style={body}>
        받을 수 있어요. <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제839조의2</a>가 보장하는 권리예요.
        혼인 기간 동안 쌓인 퇴직금은 누가 벌었든 부부 공동 재산이거든요.
        배우자가 아직 재직 중이어도 상관없어요. 이혼 시점까지 누적된 금액을 기준으로 청구하죠.
        혼인 전에 일한 기간은 빠지고, 오직 함께 산 기간만 따져요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 질문형 시작 */}
      <H2>퇴직금 재산분할, 청구할 수 있는 조건은?</H2>
      <p style={body}>
        배우자가 번 돈인데 내가 왜 받을 수 있냐고요? 한쪽이 직장에 다닐 수 있었던 건 다른 쪽의 가사·양육 기여 덕분이에요.
        법원도 이걸 인정하죠. 혼인 중 쌓인 퇴직금은 누구 명의든 공동 재산이에요.
      </p>
      <p style={body}>
        이미 받은 퇴직금이든, 재직 중인 미지급분이든 전부 해당돼요.
        퇴직연금(DB·DC형)이나 IRP 잔액도 마찬가지죠.
        시효만 주의하면 돼요. 이혼 확정 후 2년이 지나면 청구 자체가 막혀요.
      </p>

      <GreenBox>
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
      <p style={body}>
        조건이 맞는다면, 다음은 금액이 관건이죠.
      </p>

      <Divider />

      {/* H2-2: 사례형 시작 */}
      <H2>재산분할 대상 퇴직금, 얼마나 되나요?</H2>
      <p style={body}>
        총 근속 15년, 혼인 기간 10년, 퇴직금 3,000만원인 경우를 볼게요. 분할 대상은 2,000만원이에요.
        공식은 간단하죠. 총 퇴직금 × (혼인 중 근무연수 ÷ 전체 근속연수).
        이 금액에서 법원이 기여도를 반영해 최종 비율을 정해요. 실무에서는 50%에 가깝게 나오는 경우가 많지만, 가사·양육 기여도에 따라 달라지죠.
      </p>

      <SectionBadge>재산분할 대상 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 혼인 기간 비율로 산정한 분할 대상 금액이에요. 실제 분할 비율은 법원이 기여도를 고려해 결정해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <p style={body}>
        금액을 파악했으면 서류부터 챙겨야 해요.
      </p>

      <Divider />

      {/* H2-3: 경고형 시작 */}
      <H2>재산분할 청구에 필요한 서류</H2>
      <p style={body}>
        혼인관계증명서를 '일반'으로 발급받으면 혼인 기간 계산이 안 돼요. 반드시 '상세' 버전이어야 하죠.
        혼인신고일과 이혼일이 모두 찍혀야 비율을 정확히 산정할 수 있거든요.
      </p>
      <p style={body}>
        배우자가 근무 정보를 안 줄 수도 있죠. 법원에 자료 제출 명령을 신청하면 돼요.
        국민연금 가입내역으로 근속 기간을 간접 확인하는 방법도 있고요.
        서류가 모이면 절차를 밟을 차례예요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 반전형 시작 */}
      <H2>퇴직금 재산분할 청구 절차 4단계</H2>
      <p style={body}>
        절차 자체는 어렵지 않은데, 한 가지를 빠뜨리면 큰 문제가 돼요.
        배우자가 아직 재직 중이라면 판결문에 "퇴직 시 지급" 조건을 반드시 명시해야 하거든요.
        이게 없으면 배우자가 퇴직해도 돈을 받을 법적 근거가 사라지죠.
      </p>

      <Steps steps={STEPS} />
      <p style={body}>
        절차를 밟기 전에 빠뜨리면 안 되는 항목이 몇 가지 남았어요.
      </p>

      <Divider />

      {/* H2-5: 숫자형 시작 */}
      <H2>청구 전 꼭 확인할 것들</H2>
      <p style={body}>
        2년. 이혼 확정일로부터 이 기간이 지나면 청구권 자체가 소멸해요.
        가장 많이 놓치는 게 바로 이 시효죠. 이혼 과정에서 지치다 보면 재산분할을 미루게 되거든요.
        이혼 확정 직후에 아래 항목부터 바로 점검해봐요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        법적 혼인뿐 아니라 사실혼 관계도 재산분할 대상이에요.
        동거 기간, 생활비 공유, 자녀 등 사실혼을 입증할 자료를 함께 준비해야 해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 재산분할 청구 전에 꼭 짚어봐야 할 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법 제839조의2 및 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 개인 상황에 따라 결과가 달라질 수 있으니 법률구조공단(132) 또는 가정법원 상담을 권해요." />
    </ArticleLayout>
  );
}
