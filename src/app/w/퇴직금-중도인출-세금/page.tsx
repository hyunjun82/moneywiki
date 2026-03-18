"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "DC형 퇴직연금에 퇴직금이 적립돼 있어요" },
  { id: "c2", label: "무주택자로 주택을 구입하거나 전세보증금 마련이 필요해요" },
  { id: "c3", label: "본인·배우자·부양가족이 6개월 이상 요양 중이거나 파산·개인회생 결정을 받았어요" },
  { id: "c4", label: "55세 미만이에요" },
];

const CALC_SLIDERS = [
  { id: "balance", label: "DC형 퇴직연금 잔액", min: 500, max: 10000, step: 500, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 연수", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
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
    highlight: true,
  },
  {
    label: "법정 사유 없이 IRP 해지 시 세금 (기타소득세 16.5%)",
    getValue: (v: Record<string, number>) => Math.round(v.balance * 10000 * 0.165),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "DC형 중도인출 신청서", required: true, where: "DC형 퇴직연금 운용 금융기관 앱 또는 방문" },
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "주택 매매계약서 또는 임대차계약서", required: false, where: "해당 계약서 사본 (주택 사유 시)" },
  { name: "무주택 확인서 (주민등록 초본)", required: false, where: "정부24 무료 발급 (주택 사유 시)" },
  { name: "진단서 + 요양비 영수증", required: false, where: "병원 발급 (요양 사유 시)" },
  { name: "파산 선고 결정문 또는 개인회생 개시 결정문", required: false, where: "법원 발행 (파산·회생 사유 시)" },
];

const STEPS = [
  {
    title: "인출 유형 확인 (법정 사유 vs 임의 인출)",
    desc: "DC형 퇴직연금 중도인출에는 두 가지 유형이 있어요. 법정 사유(주택구입·요양·파산·천재지변)가 있으면 퇴직소득세만 납부해요. 법정 사유 없이 임의로 IRP를 해지하면 퇴직소득세에 기타소득세 16.5%가 추가돼요. 퇴직금 3,000만원이라면 세금 차이가 495만원이에요.",
    tip: "사유 해당 여부가 불분명하면 금융감독원(1332)에 먼저 확인해봐요",
  },
  {
    title: "사유별 증빙서류 준비",
    desc: "법정 사유 인출이라면 사유에 맞는 서류를 준비해요. 주택 구입이라면 매매계약서 + 무주택 확인서, 요양이라면 진단서 + 요양비 영수증, 파산·회생이라면 법원 결정문 사본이에요. 서류 없이 신청하면 임의 인출로 처리돼요.",
    tip: "금융기관마다 요구 서류가 조금씩 다를 수 있어요. 신청 전 고객센터에 확인해봐요",
  },
  {
    title: "DC형 금융기관에 중도인출 신청",
    desc: "DC형 퇴직연금을 운용하는 금융기관 앱 또는 지점에서 중도인출을 신청해요. 신청 시 인출 유형(법정 사유/임의)을 선택하고 서류를 첨부해요. 세금은 금융기관이 자동 원천징수 후 나머지를 지급해요.",
    tip: "앱으로 신청하면 빠르게 처리돼요. 보통 2~5일 내 입금돼요",
  },
  {
    title: "원천징수영수증 수령 및 보관",
    desc: "인출 후 금융기관에서 원천징수영수증을 발급받아 보관하세요. 나중에 종합소득세 신고나 환급 청구 시 필요해요. 55세 이후 연금으로 수령하면 퇴직소득세의 30%를 추가 절감할 수 있어요.",
    tip: "원천징수영수증을 받지 않으면 나중에 세금 환급 청구에서 불이익이 생겨요",
  },
];

const CHECKLIST = [
  "법정 사유 해당 여부: 근로자퇴직급여보장법 시행령 제7조 확인",
  "DC형 vs IRP 구분: DC형은 법정 사유 시 중도인출, IRP 해지는 기타소득세 16.5% 추가",
  "증빙서류: 사유에 맞는 서류 준비 (서류 없으면 임의 인출로 처리됨)",
  "세금 차이 확인: 법정 사유 인출은 퇴직소득세만, 임의 인출은 16.5% 추가",
  "원천징수영수증: 인출 후 반드시 발급받아 보관",
  "55세까지 기다릴 수 있으면: 연금 수령으로 퇴직소득세 30% 추가 절감 가능",
];

const FAQS = [
  {
    q: "DC형 중도인출과 IRP 해지의 세금 차이가 뭔가요?",
    a: "DC형은 법정 사유가 있으면 계좌를 유지하면서 일부만 인출할 수 있고 퇴직소득세만 내요. IRP는 법정 사유 없이 해지하면 퇴직소득세에 기타소득세 16.5%가 추가돼요. 퇴직금 3,000만원 기준으로 세금 차이가 495만원이에요.",
  },
  {
    q: "주택 구입을 위해 DC형을 중도인출하면 기타소득세가 면제되나요?",
    a: "맞아요. 무주택자의 주택 구입은 법정 사유에 해당해서 기타소득세 16.5%가 붙지 않아요. 퇴직소득세만 납부하면 돼요. 근속연수 공제도 적용돼요.",
  },
  {
    q: "55세 이후에 인출하면 세금이 어떻게 달라지나요?",
    a: "55세 이후 연금으로 수령하면 퇴직소득세의 30%를 절감해요. 일시금으로 인출하면 퇴직소득세 전액을 내요. 55세까지 기다릴 수 있다면 연금 수령이 가장 세금을 적게 낼 수 있어요.",
  },
  {
    q: "기타소득세 16.5%는 어떤 경우에 붙나요?",
    a: "법정 사유 없이 IRP를 해지하거나 DC형에서 법정 사유 없이 인출할 때 붙어요. 정확히는 이연퇴직소득 과세이연 취소에 해당해서 기타소득세가 부과돼요. 법정 사유가 있으면 면제예요.",
  },
  {
    q: "중도인출 후 DC형 계좌에 다시 납입할 수 있나요?",
    a: "DC형은 회사가 납입하는 구조라서 개인이 임의로 추가 납입할 수 없어요. IRP를 별도로 개설하면 개인 납입이 가능하고 세액공제도 받을 수 있어요. 중도인출로 받은 돈을 IRP에 넣는 방식으로 절세할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령 제7조: DC형 중도인출 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
      { label: "소득세법: 기타소득세 과세 기준", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: DC형 퇴직연금 중도인출 안내", url: "https://www.fss.or.kr" },
      { label: "국세청: 퇴직소득세 계산 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산-세금", title: "퇴직금 중간정산 세금", description: "중간정산 시 퇴직소득세 계산법." },
  { slug: "퇴직금-IRP-이체-세금", title: "퇴직금 IRP 이체 세금", description: "IRP 이체 시 과세 이연 방법." },
  { slug: "퇴직금-세금", title: "퇴직금 세금 전체 정리", description: "퇴직금 수령 방식별 세금 비교." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중도인출-세금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DC형 · 중도인출 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DC형 퇴직연금 중도인출, 세금이 얼마나 나오나요?<br />
        법정 사유 인출과 임의 인출의 세금 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DC형 퇴직연금을 55세 전에 인출할 때, 사유가 없으면 기타소득세 16.5%가 추가로 붙어요.
        퇴직금 3,000만원이라면 세금만 495만원이에요.
        주택 구입, 요양 같은 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 시행령 제7조</a>의 법정 사유가 있으면 퇴직소득세만 내요.
        같은 금액을 인출해도 세금이 수백만원 달라질 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>법정 사유 인출과 임의 인출, 세금 차이가 얼마나 나요?</H2>
      <p style={body}>
        DC형 중도인출은 크게 두 가지로 나뉘어요.
        법정 사유 인출은 퇴직소득세만 내고, 임의 인출(법정 사유 없이 IRP 해지)은 퇴직소득세에 기타소득세 16.5%가 추가돼요.
        퇴직소득세는 근속연수 공제가 적용돼서 실제 세율이 꽤 낮아요.
      </p>
      <p style={body}>
        법정 사유는 무주택자 주택 구입·임차, 6개월 이상 요양, 파산·개인회생, 천재지변이에요.
        이 중 하나에 해당하고 증빙서류를 갖추면 기타소득세 16.5%를 내지 않아요.
      </p>

      <GreenBox title="법정 사유 인출 vs 임의 인출 세금 비교">
        법정 사유 인출: 퇴직소득세만 (근속연수 공제 후)<br />
        임의 인출 (IRP 해지): 퇴직소득세 + 기타소득세 16.5% 추가<br />
        퇴직금 3,000만원 기준 차이: 최대 495만원 이상
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="법정 사유 인출 조건에 해당해요. 아래 계산기로 세금 차이를 확인해보세요."
        partialMatchText="IRP 금융기관 또는 금융감독원(1332)에 인출 유형을 확인해봐요."
      />

      <Divider />

      <H2>법정 사유 인출과 임의 인출 세금 계산기</H2>
      <p style={body}>
        DC형 잔액과 근속 연수를 입력하면 두 유형의 세금을 바로 비교할 수 있어요.
        법정 사유 인출은 근속연수 공제가 적용된 퇴직소득세만 계산되고, 임의 인출은 기타소득세 16.5%가 전액에 부과돼요.
      </p>

      <SectionBadge>중도인출 세금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직소득세는 근속연수공제 후 추정값이에요. 정확한 세액은 국세청 홈택스(hometax.go.kr)에서 확인해봐요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>중도인출 신청에 필요한 서류</H2>
      <p style={body}>
        법정 사유 인출을 신청하려면 해당 사유를 증명하는 서류가 꼭 필요해요.
        서류 없이 신청하면 금융기관이 임의 인출로 처리할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        금융기관마다 요구 서류가 조금씩 다를 수 있어요.
        신청 전에 DC형을 운용하는 금융기관 고객센터나 앱에서 먼저 확인해봐요.
      </p>

      <Divider />

      <H2>DC형 중도인출 신청 절차</H2>
      <p style={body}>
        서류가 준비됐다면 신청 자체는 간단해요.
        인출 유형 선택이 핵심이에요. 법정 사유 인출인지 임의 인출인지 선택을 잘못하면 세금이 크게 달라져요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>중도인출 전 최종 확인 체크리스트</H2>
      <p style={body}>
        인출 후에는 세금을 돌려받기 어렵고, 다시 납입해도 이전 세금 혜택이 복원되지 않아요.
        아래 목록으로 한 번 더 확인하고 신청하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="55세까지 기다릴 수 있다면">
        55세 이후 연금으로 수령하면 퇴직소득세의 30%를 추가 절감할 수 있어요.<br />
        일시금으로 인출하면 퇴직소득세 전액을 내야 해요.<br />
        급하지 않은 상황이라면 연금 수령이 세금 측면에서 가장 유리해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DC형 퇴직연금 중도인출 세금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 시행령과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332) 또는 국세청(126)에서 확인해봐요." />
    </ArticleLayout>
  );
}
