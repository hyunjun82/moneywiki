"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

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
      { label: "고용보험법 제51조: 훈련연장급여 지급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령 제73조: 훈련연장급여 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 연장급여 안내", url: "https://www.ei.go.kr" },
      { label: "직업훈련포털 HRD-Net: 훈련과정 검색", url: "https://www.hrd.go.kr" },
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
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
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
        &quot;실업급여 끝나가는데, 취업은 아직 안 됐어요.&quot;
      </p>
      <p style={body}>
        이런 상황이라면 직업훈련에 참여해서 수급기간을 늘리는 방법이 있죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제51조</a>에 따라,
        고용센터가 지정한 직업훈련을 받으면 훈련 기간 동안 <strong>최대 2년</strong>까지 실업급여가 연장되죠.
        1일 수급액이 기존 그대로 적용되니까, 6개월 훈련이면 약 <strong>1,189만 원</strong>을 추가로 받을 수 있죠.
      </p>
      <p style={body}>
        기술도 배우면서 생활비도 나오는 구조라, 직업 전환을 고민하는 분에게 가장 실질적인 제도예요.
        조건이 뭔지, 얼마나 받을 수 있는지 지금부터 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 훈련연장급여란 */}
      <H2>훈련연장급여로 기간이 얼마나 늘어나나요?</H2>
      <SectionBadge>제도 이해</SectionBadge>

      <p style={body}>
        실업급여 수급자가 직업훈련에 참여하면, 훈련이 끝날 때까지 수급기간을 늘려주는 제도예요.
        일반 실업급여는 최대 270일(약 9개월)로 끝나지만, 훈련연장급여를 적용받으면 그 기한을 넘겨서 계속 받을 수 있죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제51조</a>가 근거 법령이에요.
      </p>
      <p style={body}>
        연장 가능한 최대 기간은 <strong>2년</strong>이에요.
        2년짜리 훈련 과정을 수강하면 기존 수급기간이 끝나도 2년 동안 실업급여가 계속 나오는 거죠.
        금액도 기존에 받던 1일 수급액이 그대로 적용되니까, 수입이 줄어들 걱정은 없어요.
      </p>
      <p style={body}>
        여기에 <strong><a href="/w/실업급여-직업능력개발수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>직업능력개발수당</a></strong>까지 별도로 나와요.
        교통비와 식비 명목으로 훈련 참여일마다 일정 금액이 추가 지급되죠.
        실업급여 + 개발수당을 합치면 훈련 기간 동안 생활비 부담이 한결 가벼워져요.
      </p>

      <GreenBox>
        대상: 실업급여 수급 중 + 고용센터 지정 직업훈련 참여자<br />
        기간: 훈련 종료 시까지 (최대 2년)<br />
        금액: 기존 1일 수급액 100% 동일 (+ 직업능력개발수당 별도 지급)<br />
        조건: 출석률 80% 이상 유지, 실업인정일 보고 필수
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="훈련연장급여 요건을 모두 충족해요. 고용센터에 연장급여 신청을 진행하세요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 확인한 뒤 고용센터에 상담 요청하세요."
      />

      <Divider />

      {/* 섹션 2: 연장급여 금액 계산 */}
      <H2>훈련연장급여 금액은 얼마나 받을 수 있나요?</H2>

      <p style={body}>
        계산은 단순해요.
        기존에 받던 <strong>1일 수급액 x 훈련일수</strong>가 전부죠.
        2026년 기준 1일 수급액은 하한액 <strong>66,048원</strong>~상한액 <strong>68,100원</strong> 사이예요.
      </p>
      <p style={body}>
        예를 들어 6개월(180일) 훈련을 받는다고 해볼게요.
        1일 수급액이 66,048원이면 연장급여 총액은 약 1,189만 원이에요.
        12개월이면 약 2,378만 원, 24개월 최대로 받으면 약 4,756만 원까지 올라가죠.
        기존 수급기간에 받은 금액까지 합치면 상당한 액수예요.
      </p>
      <p style={body}>
        여기에 직업능력개발수당이 추가로 붙어요.
        훈련 참여일에 따라 월 최대 11만 6천 원(2026년 기준)이 나오니까, 연장급여와 별도로 생활비에 보탬이 되죠.{" "}
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

      {/* 섹션 3: 신청 조건과 절차 */}
      <H2>훈련연장급여 신청 조건과 절차</H2>
      <SectionBadge>신청 절차</SectionBadge>

      <p style={body}>
        첫 단계는 <strong>고용센터 상담</strong>이에요.
        수급기간이 끝나기 전에 담당 상담사에게 &quot;직업훈련 받으면서 연장급여를 받고 싶다&quot;고 말하면 되죠.
        상담사가 경력, 희망 직종, 재취업 계획을 검토한 뒤 적합한 훈련 과정을 안내해줘요.
        타이밍이 중요하니까, 수급기간 만료 1~2개월 전에 움직이는 게 좋아요.
      </p>
      <p style={body}>
        아무 훈련이나 되는 건 아니에요.
        고용센터가 <strong>지정하거나 인정한 과정</strong>만 대상이죠.{" "}
        <a href="https://www.hrd.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>HRD-Net</a>에서 국비지원 훈련 과정을 검색할 수 있고, 내일배움카드로 수강하는 과정이 대표적이에요.
        개인적으로 등록한 사설 학원이나 대학 과정은 인정이 안 되니까 반드시 사전에 고용센터에서 확인받으세요.
      </p>
      <p style={body}>
        훈련이 시작되면 <strong>출석률 80% 이상</strong>을 유지해야 해요.
        고용센터에서 매월 출석률을 확인하는데, 80% 미만이면 그 달부터 연장급여가 끊기죠.
        질병이나 가족 돌봄 같은 불가피한 사유는 증빙자료를 내서 소명할 수 있고요.
        실업인정일에도 훈련 참여 사실을 빠짐없이 보고해야 하고요.
      </p>

      <BorderBox>
        고용센터 상담 (수급기간 만료 1~2개월 전) &rarr; HRD-Net에서 훈련 과정 선택 &rarr;<br />
        내일배움카드 발급 &rarr; 훈련 등록 및 수강 시작 &rarr;<br />
        출석률 80% 이상 유지 + 실업인정일 보고 &rarr; 훈련 종료 시 연장급여 종료
      </BorderBox>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 주의사항 */}
      <H2>훈련연장급여 기간 중 주의할 점</H2>

      <p style={body}>
        가장 흔한 실수는 훈련을 중간에 포기하는 거예요.
        훈련을 그만두면 연장급여도 즉시 중단되죠.
        다른 훈련으로 바꾸고 싶다면 반드시 고용센터와 사전 상담을 거쳐 승인을 받아야 해요.
        무단으로 과정을 바꾸면 부정수급으로 처리될 수 있으니 조심하세요.
      </p>
      <p style={body}>
        훈련 도중에 취업하면 연장급여는 당연히 끝나요.
        이때 남은 수급기간이 절반 이상이면 <strong><a href="/w/실업급여-조기재취업수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a></strong>을 신청할 수 있죠.
        취업 사실은 고용센터에 즉시 신고해야 해요.
        신고 없이 연장급여를 계속 타면 부정수급이에요.
      </p>
      <p style={body}>
        연장급여 기간 중에도 구직활동 의무는 유지돼요.
        훈련 참여 자체가 구직활동으로 인정되긴 하지만, 고용센터에서 추가 활동을 요구하는 경우도 있죠.
        훈련이 끝나면 바로 취업활동 계획서를 제출해야 일반 실업급여 수급(잔여분이 남아 있는 경우)으로 자연스럽게 이어져요.
      </p>

      <GreenBox>
        출석률 80% 미달: 미달한 달부터 급여 중단<br />
        실업인정일 보고 누락: 훈련 참여 사실을 안 알리면 중단 사유<br />
        훈련 중도 포기: 그만두는 즉시 연장급여 종료 (과정 변경은 사전 승인 필수)
      </GreenBox>

      <Divider />

      {/* 섹션 5: 다른 연장급여와 비교 */}
      <H2>개별연장·특별연장급여와 이렇게 비교하세요</H2>

      <p style={body}>
        연장급여는 세 종류예요: <strong>훈련연장급여</strong>, <strong>개별연장급여</strong>, <strong>특별연장급여</strong>.
        이름이 비슷해서 헷갈리기 쉬운데, 지급 요건과 기간이 전부 달라요.
        본인 상황에 맞는 걸 골라야 하니까 차이를 정확히 알아두는 게 중요하죠.
      </p>
      <p style={body}>
        개별연장급여는 취업이 특히 어려운 사람에게 수급기간을 60일 추가해주는 제도예요.
        연령, 장애 여부, 부양가족 유무 등을 종합 검토해서 고용센터장이 인정하죠.
        특별연장급여는 대량 실업 같은 고용 위기 때 정부가 한시적으로 운영하는 건데, 평상시에는 시행되지 않아요.
      </p>
      <p style={body}>
        훈련연장급여의 가장 큰 강점은 <strong>기간이 압도적으로 길다</strong>는 거예요.
        개별연장 60일, 특별연장 60일인데 훈련연장은 최대 2년이니까 비교가 안 되죠.
        직업 전환이 필요하거나 새로운 기술을 배우려는 사람에게는 훈련연장급여가 가장 실질적인 선택지예요.
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
