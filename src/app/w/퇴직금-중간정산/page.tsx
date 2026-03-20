"use client";

// ─── Q1-Q4 필수 사고 ─────────────────────────────────
// Q1. 주택 구입·의료비 등 목돈이 급하게 필요한데, 퇴직하지 않고 퇴직금을 미리 받을 수 있는지 모르는 상황
// Q2. 법정 사유 해당 여부를 확인하고, 서류를 갖춰 중간정산을 신청 완료한다
// Q3. 법정 사유 목록(주택/의료/파산 등), DB/DC형 구분, 사유별 증빙서류, 신청 절차 5단계, 세금 처리, 기산점 초기화 주의사항
// Q4. EligibilityChecker(자격 확인) + GreenBox(사유 목록) + Calculator(금액) + DocTable(서류) + Steps(절차) + Checklist(주의)
//
// MAP:
// Q1 → 서론: 퇴직하지 않아도 큰돈이 필요한 상황 공감
// Q2 → H2 순서: 조건 확인 → 금액 계산 → 서류 준비 → 신청 절차 → 주의사항 → FAQ
// Q3 → H2 6개 + FAQ 7개
// Q4 → EligibilityChecker, Calculator, DocTable, Steps, Checklist, GreenBox, BorderBox

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자이고, 주택을 새로 구입했거나 구입 예정이에요" },
  { id: "c2", label: "전세 계약을 체결했고 보증금이 월 임금의 3배를 초과해요" },
  { id: "c3", label: "본인 또는 부양가족이 6개월 이상 요양이 필요한 상황이에요" },
  { id: "c4", label: "DC형 퇴직연금 또는 퇴직금 제도(DB형 제외)를 적용받고 있죠" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "최근 3개월 월 평균임금", min: 150, max: 1000, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "workedYears", label: "중간정산 시점까지 근속", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
  { id: "remainYears", label: "중간정산 후 예상 추가 근속", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "지금 받을 수 있는 중간정산 금액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.workedYears),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 후 추가로 쌓이는 퇴직금 (퇴직 시)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.remainYears),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "중간정산 신청서", required: true, where: "회사 양식 또는 자유 양식" },
  { name: "주택 매매계약서 또는 분양계약서 (주택 구입 사유)", required: false, where: "계약 시 수령" },
  { name: "임대차계약서 + 주민등록등본 (전세 사유)", required: false, where: "계약 시 수령 / 정부24 발급" },
  { name: "진단서·소견서 + 치료 계획서 (요양 사유)", required: false, where: "담당 의사 발급" },
  { name: "가족관계증명서 (부양가족 요양 사유)", required: false, where: "정부24 온라인 발급" },
  { name: "파산선고 결정문 또는 개인회생 인가결정문 (파산 사유)", required: false, where: "법원 발급" },
  { name: "급여명세서 최근 3개월 + 재직증명서", required: true, where: "회사 인사팀 요청" },
];

const STEPS = [
  {
    title: "법정 사유 해당 여부 확인",
    desc: "퇴직금 중간정산은 아무 때나 할 수 없어요. 근로자퇴직급여 보장법 제8조와 시행령 제3조에서 정한 법정 사유가 있어야 해요. 대표 사유는 무주택자 주택 구입, 전세 보증금 부담, 본인·부양가족 6개월 이상 요양, 파산선고·개인회생, 천재지변이에요. 사유가 명확해야 회사가 거부할 수 없어요.",
    tip: "사유가 애매하면 고용노동부 고객상담센터(1350) 상담을 먼저 받아보세요",
  },
  {
    title: "사유별 증빙서류 준비",
    desc: "사유마다 필요한 서류가 달라요. 주택 구입이면 매매계약서, 전세면 임대차계약서와 주민등록등본, 요양이면 진단서가 필수예요. 서류가 불완전하면 회사가 처리를 미룰 수 있으니 한 번에 완비하는 게 유리해요. 가족관계증명서·주민등록등본은 정부24에서 온라인으로 바로 발급받을 수 있죠.",
    tip: "서류가 완비되면 회사는 정당한 이유 없이 거부할 수 없어요",
    link: { label: "정부24 서류 발급", href: "https://www.gov.kr" },
  },
  {
    title: "회사(또는 금융기관)에 신청서 제출",
    desc: "신청서와 증빙서류를 인사팀에 제출해요. DC형 퇴직연금이라면 회사뿐 아니라 퇴직연금 운용 금융기관에도 별도로 신청해야 하는 경우가 있죠. 처리 기간은 회사마다 다르지만 보통 2~4주 내외예요. 퇴직금 제도(DB형 아님)면 회사에서 직접 지급하죠.",
    tip: "DC형은 금융기관 처리 기간이 별도로 필요해요. 인사팀에 미리 물어보세요",
  },
  {
    title: "중간정산 금액 수령 및 세금 처리",
    desc: "중간정산 금액에도 퇴직소득세가 원천징수돼요. 세금은 근속기간이 길수록 세액공제가 커서 실수령액이 늘어요. IRP 계좌로 이전하면 퇴직소득세를 나중에 낼 수 있고(과세 이연), 연금으로 수령하면 세율이 더 낮아져요.",
    tip: "IRP 이전 여부는 수령 전에 결정해야 해요. 지급이 완료되면 변경할 수 없어요",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "중간정산 후 기산점 초기화 확인",
    desc: "중간정산 후엔 퇴직금 계산의 기산점이 중간정산 시점으로 리셋돼요. 이후 퇴직할 때 받는 퇴직금은 중간정산 이후 기간만 기준이 되죠. 임금이 오르는 직장이라면 중간정산 없이 퇴직 시까지 놔두는 게 최종 퇴직금이 더 클 수 있죠.",
    tip: "기산점 초기화는 번복이 안 돼요. 결정 전에 두 시나리오를 비교해봐요",
  },
];

const CHECKLIST = [
  "법정 사유 해당 여부: 시행령 제3조에 없는 사유면 신청 자체가 무효예요",
  "퇴직연금 유형 확인: DB형은 원칙적으로 중간정산 불가예요",
  "증빙서류 완비: 서류가 빠지면 회사가 처리를 미룰 수 있죠",
  "DC형이면 금융기관도 별도 신청이 필요해요",
  "세금 처리: 중간정산 금액에도 퇴직소득세가 원천징수돼요",
  "IRP 이전 여부: 수령 전에 결정해야 해요. 지급 후 변경 불가예요",
  "기산점 초기화: 중간정산 후엔 새로운 기산점부터 다시 계산돼요",
  "임금 상승 예상 시: 퇴직 시까지 놔두는 게 더 유리할 수 있죠",
];

const FAQS = [
  {
    q: "중간정산을 요청하면 회사가 거부할 수 있나요?",
    a: "법정 사유가 명확하고 증빙서류를 갖추면 회사는 정당한 이유 없이 거부할 수 없어요. 근로자퇴직급여 보장법 제8조에서 이를 보장하죠. 서류가 부족하거나 사유가 법정 범위 밖이면 회사가 반려할 수 있죠.",
  },
  {
    q: "DB형 퇴직연금도 중간정산이 되나요?",
    a: "DB형은 원칙적으로 중간정산이 안 돼요. 중간정산은 DC형 퇴직연금 또는 퇴직금 제도에서만 가능해요. 내 퇴직연금 유형이 DB형이라면 고용노동부에 예외 적용 여부를 상담해봐요.",
  },
  {
    q: "중간정산 후 퇴직금이 줄어드나요?",
    a: "기산점이 초기화되기 때문에 최종 퇴직금에서 중간정산 기간 분이 빠져요. 임금이 계속 오르는 직장이라면 퇴직 시 마지막 임금 기준으로 전체 기간 퇴직금을 받는 게 더 크죠. 반대로 임금이 줄어들 상황이라면 중간정산이 유리할 수 있죠.",
  },
  {
    q: "전세 보증금 때문에 중간정산을 신청하려면 어떤 조건이 필요한가요?",
    a: "무주택자가 주거 목적으로 전세 계약을 체결하고, 전세 보증금이 월 임금의 3배를 초과해야 해요. 임대차계약서와 주민등록등본을 제출하면 돼요.",
  },
  {
    q: "중간정산 금액에 세금이 얼마나 붙나요?",
    a: "퇴직소득세가 원천징수돼요. 세율은 근속기간과 금액에 따라 달라요. 근속기간이 길수록 환산급여 공제가 커져서 실제 세율이 낮아지는 구조예요. IRP로 이전하면 퇴직소득세를 나중에 낼 수 있죠(과세 이연).",
  },
  {
    q: "이미 중간정산을 받은 적이 있는데 또 받을 수 있나요?",
    a: "법정 사유가 다시 발생하면 가능해요. 이전에 주택 구입으로 한 번 받았더라도, 이번에 부양가족 요양이 새로 생기면 다시 신청할 수 있죠. 같은 사유로 중복 신청은 안 돼요.",
  },
  {
    q: "파산 신청을 했는데 중간정산을 받을 수 있나요?",
    a: "파산선고 또는 개인회생 인가결정이 났다면 법정 사유에 해당해요. 법원에서 발급한 결정문을 회사에 제출하면 신청할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제8조: 퇴직금의 중간정산", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여 보장법 시행령 제3조: 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 중간정산 안내", url: "https://www.moel.go.kr" },
      { label: "정부24: 온라인 서류 발급", url: "https://www.gov.kr" },
      { label: "국세청: 퇴직소득세 과세 기준", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산-조건", title: "퇴직금 중간정산 조건, 사유별 정리", description: "주택·의료·천재지변 등 허용 사유를 사유별로 정리했어요." },
  { slug: "퇴직금-중간정산-사유별-증빙서류", title: "중간정산 사유별 필요 서류 목록", description: "사유에 따라 서류가 달라져요. 미리 파악하고 준비하세요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금 얼마나 내나요", description: "중간정산 시 퇴직소득세 계산 방법과 절세 전략이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-중간정산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 법정 사유</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재직 중에 퇴직금을 미리 받고 싶다면?<br />
        법정 사유부터 신청 절차·세금까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직할 때 받는 게 원칙이에요. 그런데 주택 구입이나 의료비처럼 큰돈이 급하게 필요한 상황이 생기죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제8조</a>가
        정한 법정 사유에 해당하면 재직 중에 미리 받을 수 있죠.
        법정 사유·필요 서류·신청 절차·세금 처리까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 자격 조건 질문형 시작 */}
      <H2>중간정산, 내가 받을 수 있는 조건인가요?</H2>
      <p style={body}>
        모든 근로자가 퇴직금을 미리 받을 수 있는 건 아니에요. 법에서 정한 사유가 있어야 해요.
        대표적인 사유는 무주택자 주택 구입, 전세 보증금 부담, 본인·부양가족의 6개월 이상 요양, 파산선고·개인회생, 천재지변이에요.
        이 사유들을 근로자퇴직급여 보장법 시행령 제3조에서 구체적으로 규정하죠.
      </p>
      <p style={body}>
        제도 유형도 중요해요. DC형 퇴직연금 또는 퇴직금 제도를 적용받는 경우에만 중간정산이 가능해요.
        DB형 퇴직연금은 원칙적으로 중간정산이 안 돼요. 내 회사 제도 유형은 인사팀에 물어보거나 퇴직연금 가입 계약서를 보면 알 수 있죠.
      </p>

      <GreenBox>
        무주택자인 근로자의 주택 구입<br />
        전세 보증금이 월 임금의 3배를 초과하는 전세 계약 체결<br />
        본인 또는 부양가족의 6개월 이상 요양이 필요한 질병·부상<br />
        파산선고 또는 개인회생 인가결정<br />
        천재지변 또는 그 밖에 이에 준하는 재난
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청 조건을 갖추고 있죠. 아래 계산기로 예상 금액을 먼저 살펴봐요."
        partialMatchText="조건이 일부 달라요. 고용노동부 고객상담센터(1350)에 먼저 상담받아봐요."
      />

      <Divider />

      {/* H2-2: 금액 계산 숫자형 시작 */}
      <H2>중간정산 금액, 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        중간정산 금액은 지금까지 쌓인 퇴직금 전액이에요. 계산식은 월 평균임금 × 근속연수예요.
        평균임금은 최근 3개월치 임금을 기준으로 하고, 상여금과 연차수당도 포함되는 경우가 있죠.
      </p>
      <p style={body}>
        중간정산 후엔 기산점이 리셋되고 이후 근속분부터 다시 쌓여요. 임금이 꾸준히 오르는 직장이라면 중간정산이 불리하죠.
        퇴직 시 더 높아진 임금을 기준으로 전체 근속 기간 퇴직금을 받는 게 더 크기 때문이에요.
        아래 계산기로 두 시나리오를 비교해봐요.
      </p>

      <SectionBadge>중간정산 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 × 근속연수 기준 추정치예요. 상여금·연차수당 포함 시 실제 금액이 달라질 수 있죠. 중간정산 후 기산점이 리셋돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 서류 경고형 시작 */}
      <H2>사유별로 필요한 서류가 달라요</H2>
      <p style={body}>
        서류 준비가 가장 먼저 막히는 지점이에요. 사유에 따라 필요한 서류가 달라지기 때문에,
        미리 파악하지 않으면 신청 후 반려되거나 처리가 늦어질 수 있죠. 사유부터 먼저 확정해봐요.
      </p>
      <p style={body}>
        공통으로 급여명세서 최근 3개월분과 재직증명서가 필요해요.
        가족관계증명서·주민등록등본은 <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서 무료로 온라인 발급되고요.
        파산·회생 사유는 법원 인터넷 등기소에서 발급받으면 돼요.
      </p>

      <SectionBadge>사유별 제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        DC형은 회사뿐 아니라 퇴직연금 운용 금융기관에도 별도 신청이 필요해요.
        회사 인사팀과 함께 금융기관 담당자에게 처리 절차를 먼저 물어봐요.
        금융기관마다 서류 요구 사항이 조금씩 다르기도 해요.
      </BorderBox>

      <Divider />

      {/* H2-4: 절차 반전형 시작 */}
      <H2>중간정산 신청 절차 5단계</H2>
      <p style={body}>
        법정 사유가 명확하고 서류가 갖춰지면 회사는 거부할 수 없어요.
        단계별로 준비하면 처리가 빨라지고 반려될 가능성이 낮아져요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 주의사항 사례형 시작 */}
      <H2>신청 전 꼭 짚어야 할 것들</H2>
      <p style={body}>
        중간정산은 결정 후 되돌릴 수 없어요. 기산점 초기화, 세금, IRP 이전 여부는 신청 전에 이해하고 결정해야 해요.
        놓치기 쉬운 포인트를 체크리스트로 모았어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금은 퇴직 시 마지막 임금 기준으로 전체 근속 기간을 계산해요.<br />
        중간정산을 하면 기산점이 초기화돼서 이후 기간 분만 받을 수 있죠.<br />
        임금이 꾸준히 오른다면 퇴직 시까지 퇴직금을 그대로 두는 게 더 유리한 경우가 많아요.
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 신청할 때 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법 및 동법 시행령을 바탕으로 작성됐어요. 법정 사유나 절차는 변경될 수 있으니 최신 기준은 고용노동부(1350)에서 대조해봐요." />
    </ArticleLayout>
  );
}
