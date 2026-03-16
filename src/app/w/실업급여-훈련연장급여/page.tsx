"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 계산 로직 ──────────────────────────────────────────

function getExtendedTotal(daily: number, months: number): number {
  return daily * 30 * months;
}

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현재 실업급여를 수급 중이에요" },
  { id: "c2", label: "고용센터가 지정하거나 인정한 직업훈련 과정을 수강 중이에요" },
  { id: "c3", label: "훈련 출석률이 80% 이상이에요" },
  { id: "c4", label: "고용센터 담당자의 연장급여 승인을 받았어요" },
];

const CALC_SLIDERS = [
  { id: "daily", label: "1일 수급액", min: 66048, max: 68100, step: 100, defaultValue: 66048, format: (v: number) => `${v.toLocaleString()}원` },
  { id: "months", label: "훈련기간", min: 1, max: 24, step: 1, defaultValue: 6, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "월 수령액 (30일 기준)",
    getValue: (v: Record<string, number>) => v.daily * 30,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "훈련연장급여 총 예상액",
    getValue: (v: Record<string, number>) => getExtendedTotal(v.daily, v.months),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "실업급여 수급기간이 끝나기 전에 고용센터에 훈련연장급여 상담 요청",
  "직업훈련 과정이 고용센터 지정·인정 과정인지 확인",
  "훈련 출석률 80% 이상 유지 (미달 시 연장급여 중단)",
  "매 실업인정일에 훈련 참여 사실 보고",
  "훈련 종료 후 취업활동 계획서를 고용센터에 제출",
];

const FAQS = [
  {
    q: "훈련연장급여는 기존 실업급여와 별도로 받는 건가요?",
    a: "기존 수급기간이 끝난 뒤에도 훈련 기간만큼 실업급여를 연장해서 받는 거예요. 금액은 기존과 동일한 1일 수급액이 적용되죠. 추가로 직업능력개발수당도 별도 지급될 수 있어요.",
  },
  {
    q: "아무 훈련이나 들으면 연장급여를 받을 수 있나요?",
    a: "고용센터가 지정하거나 인정한 훈련 과정만 해당돼요. 내일배움카드로 수강하는 국비지원 훈련이 대표적이죠. 본인이 개인적으로 등록한 사설 학원 과정은 인정받기 어려워요.",
  },
  {
    q: "훈련 출석률이 80% 미만이면 어떻게 되나요?",
    a: "출석률이 80%에 미치지 못하면 연장급여가 중단돼요. 한 달 단위로 출석률을 확인하는데, 미달 월부터 급여가 끊기죠. 질병 등 불가피한 사유가 있으면 증빙을 제출해서 소명할 수 있어요.",
  },
  {
    q: "훈련연장급여 최대 기간이 2년이면 실업급여를 2년 넘게 받을 수도 있나요?",
    a: "이론적으로는 그래요. 기존 수급기간(최대 270일, 약 9개월)에 훈련연장급여(최대 2년)가 추가되니까 총 2년 9개월까지 가능하죠. 다만 훈련 기간이 끝나면 연장급여도 끝나요.",
  },
  {
    q: "훈련연장급여 받는 중에 취업하면 어떻게 되나요?",
    a: "취업하면 연장급여는 지급 중단돼요. 남은 수급기간의 절반 이상이 남아 있으면 조기재취업수당을 신청할 수 있죠. 취업 사실을 고용센터에 즉시 신고해야 부정수급 문제가 생기지 않아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제51조 — 훈련연장급여 지급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령 제73조 — 훈련연장급여 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 연장급여 안내", url: "https://www.ei.go.kr" },
      { label: "직업훈련포털 HRD-Net — 훈련과정 검색", url: "https://www.hrd.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-직업훈련",
    title: "실업급여 받으면서 직업훈련 받는 방법",
    description: "수급 중 직업훈련 참여 조건과 훈련수당 안내예요.",
  },
  {
    slug: "실업급여-직업능력개발수당",
    title: "직업능력개발수당 지급 조건과 금액",
    description: "직업훈련 참여 시 추가로 받을 수 있는 수당이에요.",
  },
  {
    slug: "실업급여-특별연장급여",
    title: "특별연장급여 지급 조건과 기간",
    description: "고용 위기 시 정부가 지급하는 연장급여 제도예요.",
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
          currentSlug="실업급여-훈련연장급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 직업훈련</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        훈련 중이면 수급기간 늘어난다고?<br />
        훈련연장급여 기간과 금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 수급기간이 끝나가는데 아직 취업이 안 됐다면, 직업훈련에 참여해서 수급기간을 늘릴 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제51조</a>에 따라
        고용센터가 지정한 직업훈련을 받으면 훈련 기간 동안 <strong>최대 2년</strong>까지 실업급여가 연장되죠.
        1일 수급액은 기존과 동일하게 적용되니까, 6개월 훈련이면 약 <strong>1,189만 원</strong>(66,048원 x 180일)을 추가로 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 훈련연장급여란 */}
      <H2>훈련연장급여로 기간이 얼마나 늘어나나요?</H2>
      <SectionBadge>제도 이해</SectionBadge>

      <p style={body}>
        훈련연장급여는 실업급여 수급 중인 사람이 직업훈련에 참여할 때 수급기간을 연장해주는 제도예요.
        일반 실업급여는 최대 270일(약 9개월)까지만 나오지만, 직업훈련을 받으면 그 <strong>훈련이 끝날 때까지</strong> 실업급여가 계속 나오죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제51조</a>가 근거 법령이에요.
      </p>
      <p style={body}>
        연장 가능한 최대 기간은 <strong>2년</strong>이에요.
        2년짜리 훈련 과정을 수강하면 기존 수급기간이 끝나도 2년 동안 계속 실업급여를 받을 수 있다는 뜻이죠.
        금액은 기존에 받던 1일 수급액이 그대로 적용되니까 수입이 줄어들 걱정은 없어요.
      </p>
      <p style={body}>
        훈련연장급여와 별도로 <strong>직업능력개발수당</strong>도 받을 수 있어요.
        교통비·식비 명목으로 지급되는 건데, 훈련 참여일마다 일정 금액이 추가로 나오죠.
        실업급여에 개발수당까지 합치면 훈련 기간 동안 생활비 부담이 한결 줄어들어요.
      </p>

      <GreenBox title="훈련연장급여 핵심 정리">
        대상 — 실업급여 수급 중인 사람 중 직업훈련 참여자<br />
        기간 — 훈련 종료 시까지 (최대 2년)<br />
        금액 — 기존 1일 수급액과 동일 (+ 직업능력개발수당 별도)
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="훈련연장급여 요건을 모두 충족해요. 고용센터에 연장급여 신청을 진행하세요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 확인한 뒤 고용센터에 상담 요청하세요."
      />

      <Divider />

      {/* 섹션 2 — 연장급여 금액 계산 */}
      <H2>훈련연장급여 금액은 얼마나 받을 수 있나요?</H2>

      <p style={body}>
        연장급여 금액은 간단하게 계산돼요.
        기존에 받던 <strong>1일 수급액 x 훈련일수</strong>가 전부죠.
        2026년 기준 1일 수급액 범위는 하한액 <strong>66,048원</strong>~상한액 <strong>68,100원</strong>이에요.
      </p>
      <p style={body}>
        6개월(180일)짜리 훈련을 받는다고 해볼게요.
        1일 수급액이 66,048원이면 연장급여 총액은 약 1,189만 원이에요.
        12개월이면 약 2,378만 원, 24개월이면 약 4,756만 원까지 올라가죠.
        기존 수급기간에 받은 금액과 합치면 상당한 금액이에요.
      </p>
      <p style={body}>
        여기에 직업능력개발수당이 추가로 붙어요.
        훈련 참여일에 따라 월 최대 11만 6천 원(2026년 기준)이 지급되니까, 연장급여와 별도로 생활비 보탬이 되죠.{" "}
        <a href="https://www.hrd.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>HRD-Net</a>에서 훈련 과정을 검색할 때 기간과 내용을 꼼꼼히 비교해보세요.
      </p>

      <Calculator
        title="훈련연장급여 예상 수급액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="실제 수급액은 훈련 기간과 출석률에 따라 달라질 수 있어요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 조건과 절차 */}
      <H2>훈련연장급여 신청 조건과 절차</H2>
      <SectionBadge>신청 절차</SectionBadge>

      <p style={body}>
        첫 단계는 <strong>고용센터 상담</strong>이에요.
        실업급여 수급기간이 끝나기 전에 담당 상담사에게 "직업훈련을 받으면서 연장급여를 받고 싶다"고 말하면 되죠.
        상담사가 본인의 경력, 희망 직종, 재취업 계획을 검토한 뒤 적합한 훈련 과정을 안내해줘요.
      </p>
      <p style={body}>
        훈련 과정은 아무거나 되는 게 아니에요.
        고용센터가 <strong>지정하거나 인정한 과정</strong>이어야 하죠.{" "}
        <a href="https://www.hrd.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>HRD-Net</a>에서 국비지원 훈련 과정을 검색할 수 있고, 내일배움카드로 수강하는 과정이 대표적이에요.
        개인적으로 등록한 사설 학원이나 대학 과정은 인정받기 어려우니까 반드시 사전에 확인하세요.
      </p>
      <p style={body}>
        훈련이 시작된 뒤에는 <strong>출석률 80% 이상</strong>을 유지해야 해요.
        고용센터가 매월 출석률을 확인하는데, 80%에 미치지 못하면 그 달부터 연장급여가 중단되죠.
        질병이나 가족 돌봄 같은 불가피한 사유가 있으면 증빙자료를 제출해서 소명할 수 있어요.
        실업인정일에도 훈련 참여 사실을 빠짐없이 보고해야 하고요.
      </p>

      <BorderBox title="훈련연장급여 신청 순서">
        고용센터 상담 → 훈련 과정 선택 (HRD-Net 검색) → 내일배움카드 발급 →<br />
        훈련 등록 및 수강 시작 → 출석률 80% 이상 유지 →<br />
        매 실업인정일에 훈련 참여 보고 → 훈련 종료 시 연장급여 종료
      </BorderBox>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 주의사항 */}
      <H2>훈련연장급여 기간 중 주의할 점</H2>

      <p style={body}>
        가장 흔한 실수는 훈련 과정을 중도에 포기하는 거예요.
        훈련을 그만두면 연장급여도 즉시 중단되죠.
        수강 중에 다른 훈련으로 바꾸고 싶으면 반드시 고용센터와 사전 상담을 하고 승인을 받아야 해요.
        무단으로 과정을 변경하면 부정수급으로 처리될 수 있어요.
      </p>
      <p style={body}>
        훈련 기간 중에 취업하면 연장급여는 당연히 중단돼요.
        이때 남은 수급기간이 절반 이상 남아 있으면 <strong>조기재취업수당</strong>을 신청할 수 있죠.
        취업 사실은 고용센터에 즉시 신고해야 해요. 신고 없이 연장급여를 계속 받으면 부정수급이에요.
      </p>
      <p style={body}>
        연장급여 기간 중에도 구직활동 의무는 계속돼요.
        훈련에 참여하는 것 자체가 구직활동으로 인정되지만, 고용센터에서 추가 구직활동을 요구할 수도 있죠.
        훈련 종료 후에는 바로 취업활동 계획서를 제출해야 일반 실업급여 수급(잔여분이 있는 경우)으로 자연스럽게 이어져요.
      </p>

      <GreenBox title="연장급여 유지 3대 조건">
        출석률 80% 이상 — 미달 월부터 급여 중단<br />
        실업인정일 보고 — 훈련 참여 사실 빠짐없이 보고<br />
        훈련 완수 — 중도 포기 시 즉시 중단 (과정 변경은 사전 승인 필요)
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 다른 연장급여와 비교 */}
      <H2>개별연장·특별연장급여와 이렇게 비교하세요</H2>

      <p style={body}>
        실업급여 연장급여에는 세 종류가 있어요.
        <strong>훈련연장급여</strong>, <strong>개별연장급여</strong>, <strong>특별연장급여</strong>죠.
        이름은 비슷한데 지급 요건과 기간이 전부 달라요.
      </p>
      <p style={body}>
        개별연장급여는 취업이 특히 어려운 사람에게 수급기간을 60일 추가해주는 거예요.
        연령, 장애 여부, 부양가족 유무 등을 종합적으로 검토해서 고용센터장이 인정하죠.
        특별연장급여는 대량 실업 등 고용 위기 상황에서 정부가 한시적으로 운영하는 제도라서 평상시에는 없어요.
      </p>
      <p style={body}>
        훈련연장급여의 가장 큰 장점은 <strong>연장 기간이 압도적으로 길다</strong>는 거예요.
        개별연장은 60일, 특별연장은 60일인데 훈련연장은 최대 2년이니까 비교가 안 되죠.
        직업 전환이 필요하거나 새로운 기술을 배우고 싶은 사람에게는 훈련연장급여가 가장 실질적인 혜택이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        훈련연장급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 훈련연장급여 승인 여부는 고용센터 심사에 따라 다르니, 수급기간이 끝나기 전에 관할 고용센터(1350)에 상담을 받아보세요." />
    </ArticleLayout>
  );
}
