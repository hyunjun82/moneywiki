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
        "회사에서 월급을 깎겠다고 하네요. 받아들일 수 없어서 퇴사하려는데, 실업급여 받을 수 있을까?"<br />
        받을 수 있죠. <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙 별표2</a>에서는
        종전 임금 대비 <strong>15% 이상 삭감</strong>되면 비자발적 퇴사로 인정해요.
        기본급뿐 아니라 수당, 상여금, 식대까지 포함한 총 임금 기준이에요.
        2026년 기준 1일 상한액 68,100원, 하한액 66,048원이 적용되죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 15% 삭감 기준 ── */}
      <H2>삭감 기준이 되는 15%는 어떻게 계산하나요?</H2>
      <p style={body}>
        고용보험법에서 임금삭감을 정당한 이직 사유로 보는 기준은 명확하죠. <strong>종전 임금 대비 15% 이상</strong> 줄어들면 해당돼요. 여기서 '종전 임금'은 삭감 전 최근 3개월 평균 급여를 뜻해요. 기본급만이 아니라 야근수당, 직무수당, 식대, 상여금 등을 모두 합친 총액이죠.
      </p>
      <p style={body}>
        예를 들어볼게요. 월급이 300만원이었는데 255만원 이하로 깎이면 15% 삭감이에요. 기본급은 그대로인데 야근수당 50만원이 사라졌다면? 300만원에서 250만원이 되니까 16.7% 삭감이죠. 이 경우에도 정당한 사유로 인정돼요.
      </p>
      <p style={body}>
        그런데 한 가지 더 알아둘 게 있죠. 본인 임금이 깎인 게 아니더라도 <strong>동종업계 같은 직급의 평균 임금보다 현저히 낮아진 경우</strong>에도 정당한 사유가 돼요. 같은 업종, 같은 경력인데 내 급여만 터무니없이 낮다면 이직 사유로 충분하다는 뜻이에요.
      </p>

      <GreenBox title="임금삭감 인정 기준 요약">
        종전 임금 대비 15% 이상 삭감 &rarr; 정당한 이직 사유<br />
        동종업계 평균 임금보다 현저히 낮은 경우 &rarr; 정당한 이직 사유<br />
        총 임금 = 기본급 + 수당 + 상여금 전부 포함
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
        가장 흔한 건 <strong>기본급 삭감</strong>이에요. 회사가 경영난을 이유로 기본급 자체를 줄이는 경우죠. 월 300만원에서 250만원으로 깎이면 16.7% 삭감이니까 바로 정당한 사유에 해당돼요. 근로계약서 변경이 동반되기 때문에 증빙도 비교적 쉬운 편이에요.
      </p>
      <p style={body}>
        <strong>수당 폐지</strong>도 놓치면 안 돼요. 야근수당, 직무수당, 식대 같은 고정 수당이 갑자기 사라지면 총 임금이 줄어들죠. 기본급은 동결인데 수당이 없어져서 총 임금이 15% 넘게 줄었다면 정당한 사유예요. 수당을 "복지포인트"로 전환하면서 금액이 줄어든 경우도 마찬가지죠.
      </p>
      <p style={body}>
        <strong>성과급 삭감</strong>은 조금 까다로워요. 매년 고정적으로 지급되던 성과급을 대폭 줄이거나 없앤 경우에는 인정될 수 있죠. 그런데 원래부터 실적에 따라 변동되는 성과급이라면 "삭감"이라고 보기 어려워요. 핵심은 <strong>고정적으로 받던 금액이 줄었는지</strong>예요.
      </p>
      <p style={body}>
        <strong>연봉협상 결렬</strong>도 자주 묻는 경우죠. 결론부터 말하면, 연봉을 올려주지 않아서 퇴직하는 건 정당한 사유가 아니에요. 반면 "연봉을 삭감하겠다"는 제안을 거부하고 퇴직하는 건 정당한 사유가 될 수 있죠. <strong>실제로 임금이 깎였느냐 아니냐</strong>가 갈림길이에요.
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
        임금삭감으로 실업급여를 신청하면 고용센터에서 "정말 15% 이상 줄었는지" 확인해요. 말로만 주장하면 인정이 안 되죠. 서류로 증명해야 해요. 퇴직 후에는 회사 시스템에 접근이 안 되니까, 재직 중에 미리 모아두는 게 핵심이에요.
      </p>
      <p style={body}>
        첫 번째로 <strong>급여명세서</strong>가 필요하죠. 삭감 전 3개월치와 삭감 후 명세서를 비교하면 정확한 감소율이 나와요. 회사에서 급여명세서를 안 준다면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 신고할 수 있죠. 급여명세서 교부는 사업주의 법적 의무니까요.
      </p>
      <p style={body}>
        두 번째는 <strong>근로계약서</strong>예요. 변경 전 계약서와 변경 후 계약서를 나란히 놓으면 임금 변동이 한눈에 보이죠. 계약서가 없다면 통장 입금 내역이 보조 증빙이 돼요. 실제 입금된 금액으로 삭감 사실을 증명할 수 있으니까요.
      </p>
      <p style={body}>
        세 번째는 <strong>임금삭감 통보서</strong>나 사내 공지문이에요. 회사가 "경영난으로 임금을 조정한다"는 공문을 보냈다면 강력한 증거가 되죠. 이메일이나 사내 메신저로 통보받았다면 캡처해두세요.
      </p>

      <SectionBadge>퇴직 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4: 이런 경우는 안 돼요 ── */}
      <H2>삭감 기준에 미달하면 실업급여가 안 나와요</H2>
      <p style={body}>
        <strong>15% 미만 삭감은 인정이 안 돼요.</strong> 10% 깎인 건 불쾌하겠지만 법적으로 정당한 이직 사유가 아니에요. 300만원에서 270만원으로 줄었다면 10% 삭감이라 부족하죠. 정확히 15% 이상이어야 해요.
      </p>
      <p style={body}>
        <strong>삭감에 서면 동의한 경우도 주의해야 하죠.</strong> 회사가 "임금 조정 동의서"에 서명을 요구하는 경우가 있어요. 여기에 동의하고 나서 "역시 안 되겠다"며 퇴직하면, 자발적으로 수용한 조건에서 다시 이직한 것으로 볼 수 있죠. 동의하지 않은 상태에서 퇴직하는 편이 유리해요.
      </p>
      <p style={body}>
        <strong>단순 연봉 동결은 삭감이 아니에요.</strong> 작년 연봉 3,600만원, 올해도 3,600만원이면 동결이지 삭감이 아니죠. "물가가 올랐으니 실질적으로 삭감"이라는 논리는 고용보험법에서 인정하지 않아요. 명목 임금 기준으로 실제 금액이 줄어야 해요.
      </p>
      <p style={body}>
        마지막으로, <strong>퇴직 시점도 중요하죠.</strong> 임금이 삭감된 직후에 퇴직해야 인과관계가 명확해요. 삭감된 지 1년이 지나서 퇴직하면 "삭감 때문에 그만둔 것"이라는 주장이 약해질 수 있어요.
      </p>

      <Divider />

      {/* ── 섹션 5: 실업급여 금액과 신청 절차 ── */}
      <H2>실업급여 계산법과 신청 절차를 따라가세요</H2>
      <p style={body}>
        2026년 기준으로 <strong>1일 최대 68,100원</strong>, <strong>1일 최소 66,048원</strong>이에요. 한 달로 따지면 최대 약 <strong>204만원</strong> 정도 나오죠. 퇴직 전 평균임금의 60%를 받는 구조인데, 상한액과 하한액 사이에서 결정돼요.
      </p>
      <p style={body}>
        수급 기간은 고용보험 가입 기간과 나이에 따라 달라요. 1년 이상 ~ 3년 미만 가입했고 50세 미만이면 150일(약 5개월)을 받을 수 있죠. 10년 이상 가입했다면 최대 270일(약 9개월)까지 늘어나요.
      </p>
      <p style={body}>
        신청은 퇴직 후 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 하거나, 관할 고용센터에 직접 방문하면 돼요. 퇴직 후 <strong>12개월 이내</strong>에 신청해야 하니까 너무 미루지 마세요. 이직확인서가 발급되면 바로 신청하는 게 좋죠.
      </p>

      <GreenBox title="고용센터 사전 상담 추천">
        퇴직 전에 고용센터(1350)에 전화해서<br />
        "임금이 삭감됐는데 정당한 사유에 해당하는지" 먼저 확인하세요.<br />
        어떤 증빙이 필요한지도 안내받을 수 있고, 사전 상담은 무료예요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임금삭감과 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
