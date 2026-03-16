"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "정년퇴직(회사 규정에 따른 퇴직)이에요" },
  { id: "c2", label: "65세 이전에 입사해서 계속 근무했어요" },
  { id: "c3", label: "퇴직 전 18개월 내 피보험기간 180일 이상이에요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동을 할 수 있어요" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "퇴직 전 월급 (세전)",
    min: 200, max: 600, step: 10, defaultValue: 350,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "years",
    label: "고용보험 가입기간",
    min: 1, max: 30, step: 1, defaultValue: 15,
    format: (v: number) => `${v}년`,
  },
  {
    id: "age",
    label: "퇴직 시 나이",
    min: 55, max: 70, step: 1, defaultValue: 60,
    format: (v: number) => `${v}세`,
  },
];

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round(v.salary * 10000 / 30 * 0.6);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간 (50세 이상 기준)",
    getValue: (v: Record<string, number>) => {
      const y = v.years;
      // 50세 이상 기준 (정년퇴직자는 대부분 50세 이상)
      if (y < 1) return 120;
      if (y < 3) return 180;
      if (y < 5) return 210;
      if (y < 10) return 240;
      return 270;
    },
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "총 예상 수령액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round(v.salary * 10000 / 30 * 0.6)));
      const y = v.years;
      let days = 120;
      if (y >= 1 && y < 3) days = 180;
      else if (y >= 3 && y < 5) days = 210;
      else if (y >= 5 && y < 10) days = 240;
      else if (y >= 10) days = 270;
      return daily * days;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "이직확인서에 퇴직 사유가 '정년퇴직'으로 기재됐는지 확인",
  "고용24(ei.go.kr)에서 고용보험 피보험자격 이력 조회",
  "워크넷(work.go.kr) 구직등록 완료",
  "관할 고용센터 방문 — 신분증, 통장 사본, 증명사진 1장 준비",
  "퇴직 후 12개월 이내에 반드시 신청 (늦으면 수급일수가 줄어들어요)",
];

const FAQS = [
  {
    q: "정년퇴직하면 실업급여를 무조건 받을 수 있나요?",
    a: "65세 이전에 입사해서 계속 근무한 분만 해당돼요. 65세 이후에 새로 입사한 경우에는 고용보험 가입 자체가 안 되기 때문에 실업급여 대상이 아니에요.",
  },
  {
    q: "정년퇴직 후 촉탁직으로 재계약하면 실업급여는 어떻게 되나요?",
    a: "촉탁직으로 일하는 동안에는 실업 상태가 아니라 신청이 안 돼요. 촉탁 계약이 끝난 뒤에 신청하면 되죠. 촉탁 기간도 피보험기간에 포함돼요.",
  },
  {
    q: "국민연금이랑 실업급여를 동시에 받을 수 있나요?",
    a: "받을 수 있어요. 실업급여와 국민연금은 완전히 별개 제도예요. 퇴직금도 마찬가지로 실업급여와 중복 수령이 가능하죠.",
  },
  {
    q: "재취업할 생각이 없는데 실업급여를 받을 수 있나요?",
    a: "재취업 의사가 없으면 수급 대상이 아니에요. 실업인정일마다 구직활동을 보고해야 하고, '쉬려고요'라고 하면 자격이 유지되지 않죠.",
  },
  {
    q: "정년 60세인데 65세까지 고용보험이 유지되나요?",
    a: "60세에 정년퇴직하면 그때까지의 피보험기간으로 실업급여를 신청해요. 65세 기준은 '입사 시 나이'가 65세 미만인지를 보는 거지, 퇴직 시 나이가 65세 미만이어야 한다는 뜻이 아니에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제10조 — 65세 이후 입사자 적용 제외", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조 — 구직급여 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령 별표1 — 나이별·피보험기간별 수급일수", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 정년퇴직 실업급여 상담", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-나이제한",
    title: "실업급여 나이제한 65세 기준 정리",
    description: "나이에 따라 수급기간이 달라지고, 65세 이후 입사자는 제외되는 구조를 설명해요.",
  },
  {
    slug: "실업급여-65세",
    title: "65세 이상 실업급여 받을 수 있는 경우",
    description: "65세 넘어도 입사 시점에 따라 실업급여를 받을 수 있는 조건을 안내해요.",
  },
  {
    slug: "명예퇴직-실업급여",
    title: "명예퇴직하면 실업급여 받는 방법",
    description: "명예퇴직도 비자발적 퇴사로 인정돼요. 수급 조건과 절차를 정리했죠.",
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
          currentSlug="정년퇴직후-실업급여-받는-방법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 정년퇴직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        정년퇴직 후 실업급여 받을 수 있을까?<br />
        65세 기준과 수급기간
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;정년퇴직이면 실업급여 대상이 아닌 거 아닌가요?&rdquo;<br />
        아니에요. 정년퇴직은 본인 의지가 아니라 회사 규정에 따른 퇴직이라서 <strong>비자발적 퇴사</strong>에 해당하죠.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라
        <strong>65세 이전에 입사</strong>해서 고용보험에 가입한 상태라면 수급 자격이 있죠.
        50세 이상은 수급기간이 길어서, 10년 이상 근무했다면 최대 <strong>270일(약 9개월)</strong>,
        월 최대 약 <strong>204만원</strong>까지 받을 수 있죠. 65세 기준이 정확히 뭔지, 수급기간은 어떻게 정해지는지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 65세 기준 */}
      <H2>65세 기준이 수급기간에 어떤 영향을 주나요?</H2>
      <p style={body}>
        실업급여를 받으려면 고용보험에 가입돼 있어야 해요. 그런데 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제10조</a>에서 <strong>65세 이후에 새로 취업한 사람</strong>은 고용보험 가입 대상에서 제외하고 있죠. 가입 자체가 안 되니 실업급여도 나올 수 없는 구조예요.
      </p>
      <p style={body}>
        반대로, <strong>65세 이전에 입사해서 계속 근무</strong>한 분은 퇴직 시점이 65세를 넘더라도 고용보험이 유지돼요. 60세에 입사해서 68세까지 다녔다면 피보험자 자격이 그대로 살아 있죠. 정년퇴직하면 실업급여를 받을 수 있는 거예요.
      </p>
      <p style={body}>
        많이 헷갈리는 부분인데, 핵심은 <strong>&ldquo;퇴직 시 나이&rdquo;가 아니라 &ldquo;입사 시 나이&rdquo;</strong>예요. 퇴직할 때 70세라도 입사할 때 65세 미만이었으면 문제없죠. 수급기간도 이 기준으로 결정되니까, 입사 시점을 먼저 살펴보세요.
      </p>

      <GreenBox title="65세 기준 핵심 정리">
        64세에 입사 → 68세에 정년퇴직 → <strong>실업급여 가능</strong><br />
        66세에 입사 → 70세에 퇴직 → <strong>실업급여 불가</strong><br />
        판단 기준: <strong>입사 시점에 65세 미만</strong>이면 수급 자격 유지
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 실업급여 수급 자격이 있어요. 퇴직 후 빠르게 고용센터에 신청하세요."
        partialMatchText="일부 조건이 안 맞아요. 해당 항목을 고용센터(1350)에서 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 수급기간 + 계산기 */}
      <H2>65세 이전 입사자의 수급기간은 얼마인가요?</H2>
      <p style={body}>
        수급기간은 <strong>나이</strong>와 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험기간</a>(고용보험 가입 기간) 두 가지로 정해져요. 50세 이상이면 같은 피보험기간이라도 수급일수가 더 길어지죠. 정년퇴직자는 대부분 50세 이상이라 유리한 기준이 적용돼요.
      </p>
      <p style={body}>
        피보험기간 1년 미만이면 나이와 관계없이 120일이에요. 1년~3년이면 50세 이상 기준으로 <strong>180일</strong>, 3년~5년이면 <strong>210일</strong>, 5년~10년이면 <strong>240일</strong>, 10년 이상이면 최대 <strong>270일</strong>까지 받을 수 있죠.
      </p>

      <BorderBox title="50세 이상 피보험기간별 수급일수">
        1년 미만 → 120일<br />
        1년~3년 → 180일<br />
        3년~5년 → 210일<br />
        5년~10년 → 240일<br />
        10년 이상 → <strong>270일 (약 9개월)</strong>
      </BorderBox>

      <p style={body}>
        정년퇴직자는 근속기간이 긴 경우가 대부분이에요. 같은 회사에서 20년, 30년 일했다면 피보험기간 10년을 가뿐히 넘기니까 <strong>270일(약 9개월)</strong> 수급이 가능하죠. 금액은 퇴직 전 평균임금의 <strong>60%</strong>이고, 2026년 기준 1일 상한액 68,100원·하한액 66,048원이 적용돼요.
      </p>

      <SectionBadge>월급과 근무기간을 넣어 예상 수급액을 계산해보세요</SectionBadge>
      <Calculator
        title="정년퇴직 실업급여 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 50세 이상 기준으로 계산돼요. 2026년 하한액 66,048원, 상한액 68,100원 적용. 실제 금액은 퇴직 전 3개월 평균임금 기준으로 고용센터에서 확정해요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 절차 */}
      <H2>수급기간 내 신청 절차와 준비 서류</H2>
      <p style={body}>
        첫 단계는 <strong>이직확인서 확인</strong>이에요. 회사가 퇴직 후 10일 이내에 고용센터에 이직확인서를 제출해야 하죠. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 접속하면 처리 여부를 바로 확인할 수 있죠. 이직 사유가 &ldquo;정년퇴직&rdquo; 또는 &ldquo;정년&rdquo;으로 기재돼 있는지 꼭 살펴보세요.
      </p>
      <p style={body}>
        다음은 <strong>워크넷 구직등록</strong>이에요. 워크넷(work.go.kr)에서 구직등록을 해야 하죠. 실업급여는 재취업 의사가 있는 사람에게 주는 급여라서 구직활동 의지를 보여줘야 해요. 온라인으로 5분이면 끝나니까 부담은 없어요.
      </p>
      <p style={body}>
        마지막으로 관할 <strong>고용센터에 직접 방문</strong>해서 수급자격을 신청해요. 신분증, 통장 사본, 증명사진 1장을 준비하세요. 수급자격이 인정되면 7일의 대기기간을 거치고, 이후 1~4주 간격으로 실업인정을 받을 때마다 급여가 입금되죠. 온라인 또는 방문, 둘 다 가능해요.
      </p>

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 촉탁직/재취업 */}
      <H2>촉탁직 재계약 시 수급기간 계산 기준</H2>
      <p style={body}>
        정년퇴직 후 <strong>촉탁직으로 재계약</strong>하는 분이 많아요. 촉탁직으로 근무하는 동안은 실업 상태가 아니라 실업급여를 신청할 수 없어요. 촉탁 계약이 종료된 뒤에 신청하면 되죠. 촉탁 기간도 피보험기간에 포함되니까 수급일수가 오히려 늘어나는 효과가 있고요.
      </p>
      <p style={body}>
        새 직장에 정식 취업한 경우에는 <strong>실업급여가 중단</strong>돼요. 다만 수급기간의 절반 이상 남기고 재취업했다면 <a href="/w/실업급여-취업촉진수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>을 받을 수 있죠. 남은 수급일수의 절반을 일시금으로 주는 제도예요. 빨리 재취업할수록 유리한 구조이기도 하고요.
      </p>
      <p style={body}>
        <strong>비상근 고문</strong>으로 재계약한 경우는 또 달라요. 고문은 근로자가 아니라 고용보험 가입 대상이 아니에요. 그래서 정년퇴직 시점에 실업급여를 바로 신청할 수 있고, 정년퇴직까지의 피보험기간을 기준으로 수급일수가 산정되죠.
      </p>

      <BorderBox title="재취업 유형별 실업급여">
        촉탁직 재계약 → 촉탁 종료 후 신청 (피보험기간 합산)<br />
        새 직장 취업 → 실업급여 중단 (조기재취업수당 가능)<br />
        비상근 고문 → 정년퇴직 시점에 바로 신청 가능
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 주의사항 */}
      <H2>65세 기준 수급기간, 핵심만 챙기세요</H2>
      <p style={body}>
        가장 중요한 건 <strong>신청 기한 12개월</strong>이에요. 퇴직일로부터 12개월 안에 실업급여를 전부 받아야 하죠. 수급일수가 270일이더라도 퇴직 후 6개월 뒤에 신청하면 남은 6개월 안에 소화해야 해요. 늦게 시작할수록 실제 받을 수 있는 금액이 줄어드니까 서두르세요.
      </p>
      <p style={body}>
        수급기간 동안 <strong><a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동</a>도 필수</strong>예요. 1~4주 간격으로 실업인정일에 고용센터에 출석하거나 온라인으로 보고해야 하죠. &ldquo;이제 은퇴할 거라 일할 생각이 없다&rdquo;고 하면 수급자격이 유지되지 않아요. 재취업 의사와 능력이 있어야 한다는 게 법이 정한 조건이에요.
      </p>
      <p style={body}>
        하나 더 — <strong>국민연금, 퇴직금, 실업급여는 모두 동시에 수령 가능해요.</strong> 서로 다른 제도이기 때문에 중복 수령에 아무런 제한이 없죠. 정년퇴직하면 퇴직금 + 국민연금 + 실업급여, 세 가지를 함께 챙기는 게 맞아요.
      </p>

      <GreenBox title="놓치기 쉬운 3가지">
        퇴직 후 12개월 이내에 신청 — 늦으면 수급일수 손해<br />
        실업인정일마다 구직활동 보고 — 안 하면 해당 기간 미지급<br />
        국민연금·퇴직금과 중복 수령 가능 — 별도 제도라 제한 없음
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        정년퇴직과 실업급여에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 수급 여부는 고용센터 심사에 따라 달라질 수 있으니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
