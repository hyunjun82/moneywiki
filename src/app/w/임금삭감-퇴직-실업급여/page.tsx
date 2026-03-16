"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "임금삭감 전후 급여명세서를 보유하고 있어요" },
  { id: "c2", label: "삭감 비율이 종전 임금 대비 15% 이상이에요" },
  { id: "c3", label: "이직확인서 퇴직 사유가 '임금삭감'으로 기재됐어요" },
  { id: "c4", label: "고용보험 피보험기간이 180일 이상이에요" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "삭감 전 월급 (세전)",
    min: 150,
    max: 800,
    step: 10,
    defaultValue: 300,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "months",
    label: "고용보험 가입기간",
    min: 6,
    max: 240,
    step: 6,
    defaultValue: 36,
    format: (v: number) => `${v}개월`,
  },
  {
    id: "age",
    label: "나이",
    min: 20,
    max: 65,
    step: 1,
    defaultValue: 35,
    format: (v: number) => `${v}세`,
  },
];

function getDays(months: number, age: number): number {
  const years = months / 12;
  if (age < 50) {
    if (years < 1) return 120;
    if (years < 3) return 150;
    if (years < 5) return 180;
    if (years < 10) return 210;
    return 240;
  }
  if (years < 1) return 120;
  if (years < 3) return 180;
  if (years < 5) return 210;
  if (years < 10) return 240;
  return 270;
}

const CALC_RESULTS = [
  {
    label: "1일 수급액 (퇴직 전 평균임금 60%)",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.salary * 10000) / 30 * 0.6);
      return Math.min(Math.max(daily, 66048), 68100);
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급일수",
    getValue: (v: Record<string, number>) => getDays(v.months, v.age),
    format: (v: number) => `${v}일`,
  },
  {
    label: "예상 총 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.salary * 10000) / 30 * 0.6);
      const capped = Math.min(Math.max(daily, 66048), 68100);
      return capped * getDays(v.months, v.age);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "삭감 전 3개월치 급여명세서 확보 (15% 이상 차이 증명용)",
  "변경 전 근로계약서와 변경 후 계약서 비교 준비",
  "임금삭감 통보서 또는 사내 공지문 캡처 보관",
  "통장 입금 내역으로 실제 수령액 변동 확인",
  "고용센터(1350) 사전 상담으로 사유 인정 가능성 확인",
];

const FAQS = [
  {
    q: "임금이 얼마나 깎여야 실업급여를 받을 수 있나요?",
    a: "종전 임금 대비 15% 이상 삭감되면 정당한 이직 사유로 인정돼요. 예를 들어 월 300만원이었는데 255만원 이하로 깎이면 해당되죠. 기본급뿐 아니라 수당, 상여금까지 포함한 총 임금 기준이에요.",
  },
  {
    q: "연봉협상이 결렬되면 바로 실업급여 대상인가요?",
    a: "결렬 자체만으로는 안 돼요. 연봉이 실제로 삭감됐거나 삭감 예정이어야 하죠. '인상을 안 해줘서 퇴직'은 정당한 사유가 아니에요. 기존 금액보다 실제로 줄어야 인정받을 수 있어요.",
  },
  {
    q: "수당이 없어진 것도 임금삭감에 포함되나요?",
    a: "포함돼요. 기본급뿐 아니라 야근수당, 직무수당, 식대 등을 합한 총 임금이 15% 이상 줄면 인정받을 수 있죠. 수당을 복지포인트로 전환하면서 금액이 줄어든 경우도 마찬가지예요.",
  },
  {
    q: "임금삭감에 동의한 뒤 퇴사해도 괜찮나요?",
    a: "주의가 필요하죠. 삭감에 서면 동의했다면 나중에 정당한 사유로 인정받기 어려워요. 동의하지 않은 상태에서 퇴직하는 게 유리해요. 서명 전에 고용센터에 먼저 상담받아보세요.",
  },
  {
    q: "삭감된 지 한참 뒤에 퇴직해도 인정되나요?",
    a: "삭감 직후에 퇴직해야 인과관계가 명확해요. 삭감된 지 1년이 지나서 퇴직하면 '삭감 때문에 그만둔 것'이라는 주장이 약해질 수 있죠. 퇴직 시점이 삭감 시점과 가까울수록 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 시행규칙 별표2 — 정당한 이직 사유 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
      { label: "고용보험법 제58조 — 수급자격의 제한", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 이직 사유 상담", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "근로조건-변경-실업급여",
    title: "근로조건 변경으로 퇴직하면 실업급여 받는 방법",
    description: "근무 시간, 장소, 업무 내용이 크게 바뀌면 정당한 사유가 돼요.",
  },
  {
    slug: "실업급여-임금체불",
    title: "임금체불 퇴직 시 실업급여 수급 조건",
    description: "월급을 못 받아서 퇴사했다면 비자발적 퇴사로 인정돼요.",
  },
  {
    slug: "자발적-퇴사-실업급여",
    title: "자발적 퇴사해도 실업급여 받는 7가지 사유",
    description: "내가 먼저 퇴사해도 정당한 사유가 있으면 수급 가능하죠.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="임금삭감-퇴직-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 &middot; 고용보험 &middot; 임금삭감</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임금 깎여서 퇴사하면 실업급여?<br />
        삭감 기준과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;갑자기 월급이 깎인다는데, 이러면 그냥 나가야 하는 건가요?&quot;<br />
        나가도 괜찮아요. <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙 별표2</a>가
        종전 임금 대비 <strong>15% 이상 삭감</strong>을 비자발적 퇴사로 인정하니까요.
        기본급만이 아니라 수당, 상여금, 식대까지 합친 총 임금 기준이에요.
        2026년 1일 상한액 68,100원, 하한액 66,048원이 적용되죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 15% 삭감 기준 ── */}
      <H2>삭감 기준이 되는 15%는 어떻게 계산하나요?</H2>
      <p style={body}>
        기준이 되는 &quot;종전 임금&quot;은 삭감 직전 최근 3개월 평균 급여를 말해요. 기본급에 야근수당, 직무수당, 식대, 상여금을 전부 더한 총액이죠. 이 총액에서 <strong>15% 넘게 줄어들면</strong> 고용보험법이 정한 정당한 이직 사유에 해당돼요.
      </p>
      <p style={body}>
        숫자로 보면 간단하죠. 월 300만원 받던 사람이 255만원 이하로 깎이면 15% 삭감이에요. 기본급은 그대로인데 야근수당 50만원이 사라졌다고요? 총액이 300만원에서 250만원으로 줄었으니 16.7% 삭감 — 이것도 인정 대상이에요.
      </p>
      <p style={body}>
        내 임금이 직접 깎이지 않은 경우도 해당될 수 있죠. <strong>동종업계 같은 직급 평균보다 현저히 낮아진 경우</strong>에도 <a href="/w/실업급여-정당한-퇴사-사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>정당한 사유</a>가 되죠. 같은 업종, 같은 경력인데 내 급여만 터무니없이 낮다면 이직 사유로 충분해요.
      </p>

      <GreenBox title="15% 삭감 기준 핵심">
        종전 임금(3개월 평균) 대비 15% 이상 삭감 &rarr; 정당한 이직 사유<br />
        동종업계 평균보다 현저히 낮은 경우 &rarr; 정당한 이직 사유<br />
        총 임금 = 기본급 + 수당 + 상여금 + 식대 전부 합산
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 확인해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 가능성이 높아요. 증빙서류를 준비해서 고용센터에 상담해보세요."
        partialMatchText="일부 항목이 충족되지 않았어요. 고용센터(1350)에서 사전 상담을 받아보세요."
      />

      <Divider />

      {/* ── 섹션 2: 기본급·수당·성과급 구분 + 계산기 ── */}
      <H2>기본급, 수당, 성과급 삭감 기준이 다른가요?</H2>
      <p style={body}>
        <strong>기본급 삭감</strong>이 가장 명확한 케이스예요. 경영난을 이유로 기본급 자체가 줄면 근로계약서 변경이 따라오죠. 계약서 두 개를 비교하면 삭감 사실이 바로 드러나니까 증빙이 쉬운 편이에요.
      </p>
      <p style={body}>
        놓치기 쉬운 게 <strong>수당 폐지</strong>예요. 야근수당, 직무수당, 식대 같은 고정 수당이 갑자기 사라지면 기본급이 그대로여도 총 임금은 확 줄어들죠. 복지포인트로 전환하면서 실수령액이 줄어든 경우도 마찬가지고요. 총 임금이 15% 넘게 줄었다면 바로 정당한 사유에 해당돼요.
      </p>
      <p style={body}>
        <strong>성과급</strong>은 성격에 따라 달라요. 매년 고정적으로 지급되던 성과급을 대폭 줄이거나 없앤 경우에는 인정될 수 있죠. 반면 원래부터 실적에 따라 오르내리는 변동 성과급이라면 &quot;삭감&quot;이라 보기 어려워요. <strong>고정적으로 받아오던 금액이 줄었는지</strong>가 판단 기준이에요.
      </p>
      <p style={body}>
        <strong>연봉협상 결렬</strong>은 흔히 헷갈리는 부분이죠. 올려주지 않아서 퇴직하는 건 정당한 사유가 아니에요. 하지만 &quot;연봉을 삭감하겠다&quot;는 통보를 거부하고 퇴직하는 건 다른 이야기예요. 핵심은 <strong>명목 금액이 실제로 줄었느냐</strong>에 달려 있죠.
      </p>

      <BorderBox title="인정 vs 불인정 사례">
        기본급 300만원 &rarr; 250만원 삭감 &rarr; <strong>인정</strong><br />
        야근수당 50만원 폐지 &rarr; <strong>인정</strong> (총 임금 15% 이상 감소 시)<br />
        고정 성과급 100% &rarr; 50% 축소 &rarr; <strong>인정 가능</strong><br />
        변동 성과급 감소 &rarr; <strong>불인정</strong> (원래 변동이니까)<br />
        연봉 동결(삭감 아님) &rarr; <strong>불인정</strong>
      </BorderBox>

      <Calculator
        title="임금삭감 퇴직 시 실업급여 예상 수급액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 수급액은 퇴직 전 평균임금에 따라 달라질 수 있어요."
      />

      {/* ── 중간 관련 글 + 광고 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3: 증빙서류 ── */}
      <H2>삭감 사실을 증명할 증빙서류 준비법</H2>
      <p style={body}>
        고용센터에서 &quot;정말 15% 이상 줄었는지&quot; 서류로 확인해요. 말로 주장하는 것만으로는 부족하죠. 퇴직하면 회사 시스템 접근이 막히니까, 재직 중에 모아두는 게 핵심이에요.
      </p>
      <p style={body}>
        가장 중요한 건 <strong>급여명세서</strong>예요. 삭감 전 3개월치와 삭감 후 명세서를 나란히 놓으면 감소율이 바로 나오죠. 회사에서 급여명세서를 안 준다고요? <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 신고하면 돼요. 교부는 사업주의 법적 의무니까요.
      </p>
      <p style={body}>
        <strong>근로계약서</strong>도 빠뜨리면 안 돼요. 변경 전과 후 계약서를 비교하면 임금 변동이 한눈에 드러나죠. 계약서가 없다면 통장 입금 내역이 보조 증빙 역할을 해요. 실제 입금 금액 자체가 삭감 사실을 증명하는 셈이에요.
      </p>
      <p style={body}>
        <strong>회사 통보서</strong>나 사내 공지문도 강력한 증거가 되죠. &quot;경영난으로 임금을 조정한다&quot;는 공문이 이메일이나 메신저로 왔다면 캡처해서 보관하세요. 삭감 의도를 회사 스스로 밝힌 셈이라 반박이 어려워요.
      </p>

      <SectionBadge>퇴직 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4: 이런 경우는 안 돼요 ── */}
      <H2>삭감 기준에 미달하면 실업급여가 안 나와요</H2>
      <p style={body}>
        <strong>15% 미만 삭감은 인정 대상이 아니에요.</strong> 300만원에서 270만원으로 줄었다면 10% 삭감이라 부족하죠. 불쾌할 수 있지만, 법이 정한 기준선은 정확히 15%예요. 한 푼이라도 15%에 못 미치면 정당한 이직 사유가 성립하지 않아요.
      </p>
      <p style={body}>
        <strong>서면 동의서에 서명한 뒤 퇴직하면 불리해져요.</strong> 회사가 &quot;임금 조정 동의서&quot;를 내미는 경우가 많죠. 여기에 사인한 다음 &quot;역시 안 되겠다&quot;며 퇴직하면, 자발적으로 조건을 수용한 걸로 보일 수 있죠. 동의 전에 고용센터(1350)에 먼저 상담받는 편이 안전하죠.
      </p>
      <p style={body}>
        <strong>연봉 동결은 삭감이 아니에요.</strong> 작년 3,600만원, 올해도 3,600만원이면 동결이지 삭감이 아니죠. &quot;물가가 올랐으니 실질적으로 깎인 셈&quot;이라는 주장은 고용보험법에서 받아들이지 않아요. 명목 금액이 실제로 줄어야 돼요.
      </p>
      <p style={body}>
        <strong>퇴직 시점</strong>도 빠뜨리면 안 되는 포인트예요. 삭감 직후에 퇴직해야 인과관계가 뚜렷하죠. 깎인 지 1년이나 지나서 퇴직하면 &quot;삭감 때문에 나왔다&quot;는 주장이 약해질 수 있으니까요.</p>

      <Divider />

      {/* ── 섹션 5: 실업급여 금액과 신청 절차 ── */}
      <H2>실업급여 계산법과 신청 절차를 따라가세요</H2>
      <p style={body}>
        2026년 기준 <strong>1일 상한액 68,100원</strong>, <strong>하한액 66,048원</strong>이에요. 한 달로 환산하면 최대 약 204만원 수준이죠. 퇴직 전 평균임금의 60%를 계산한 뒤, 상한액과 하한액 사이에서 확정되는 구조예요.
      </p>
      <p style={body}>
        수급일수는 고용보험 가입 기간과 나이로 결정돼요. 50세 미만이고 1년~3년 미만 가입이라면 150일(약 5개월)을 받죠. 10년 넘게 가입했으면 최대 270일(약 9개월)까지 가능해요. 위 계산기에 나이와 가입 기간을 넣으면 예상 총액이 바로 나오니 꼭 조회해보세요.
      </p>
      <p style={body}>
        신청은 퇴직 후 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 온라인 또는 관할 <a href="/w/실업급여-고용센터" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용센터</a> 방문으로 진행하면 돼요. 퇴직일 다음 날부터 <strong>12개월 이내</strong>에 신청해야 하니 미루지 마세요. 이직확인서가 나오는 즉시 움직이는 게 가장 좋죠.
      </p>

      <GreenBox title="퇴직 전 사전 상담을 추천해요">
        고용센터(1350)에 전화해서 &quot;임금삭감인데 정당한 사유에 해당하는지&quot; 먼저 물어보세요.<br />
        어떤 증빙을 갖춰야 하는지까지 안내받을 수 있고, 상담은 무료예요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임금삭감 퇴직과 실업급여에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
