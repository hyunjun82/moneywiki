"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "50인 미만 사업장의 사업주(자영업자)예요" },
  { id: "c2", label: "고용보험에 1년(12개월) 이상 가입하고 보험료를 납부했어요" },
  { id: "c3", label: "매출 급감, 적자 지속 등 비자발적 사유로 폐업했어요" },
  { id: "c4", label: "재취업 또는 재창업 의사가 있어요" },
];

const CALC_SLIDERS = [
  {
    id: "grade",
    label: "기준보수 등급 (1~7등급)",
    min: 1, max: 7, step: 1, defaultValue: 4,
    format: (v: number) => {
      const t: Record<number, number> = { 1: 182, 2: 208, 3: 234, 4: 260, 5: 286, 6: 312, 7: 338 };
      return `${v}등급 (${t[v]}만원)`;
    },
  },
  {
    id: "years",
    label: "고용보험 가입기간",
    min: 1, max: 15, step: 1, defaultValue: 3,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => {
      const t: Record<number, number> = { 1: 182, 2: 208, 3: 234, 4: 260, 5: 286, 6: 312, 7: 338 };
      const daily = Math.round((t[v.grade] || 260) * 10000 / 30 * 0.6);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => {
      const y = v.years;
      if (y < 3) return 120;
      if (y < 5) return 150;
      if (y < 10) return 180;
      return 210;
    },
    format: (v: number) => `${v}일`,
  },
  {
    label: "총 예상 수령액",
    getValue: (v: Record<string, number>) => {
      const t: Record<number, number> = { 1: 182, 2: 208, 3: 234, 4: 260, 5: 286, 6: 312, 7: 338 };
      const daily = Math.max(66048, Math.min(68100, Math.round((t[v.grade] || 260) * 10000 / 30 * 0.6)));
      const y = v.years;
      let days = 120;
      if (y >= 3 && y < 5) days = 150;
      else if (y >= 5 && y < 10) days = 180;
      else if (y >= 10) days = 210;
      return daily * days;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 자영업자 고용보험 가입 이력 확인",
  "세무서에서 폐업사실증명원 발급",
  "매출 감소 증빙자료 확보 (부가세 신고서, 매출 장부 등)",
  "워크넷(work.go.kr) 구직등록 또는 재창업 계획서 준비",
  "관할 고용센터에 구직급여 신청서 제출 (폐업일로부터 12개월 이내)",
];

const FAQS = [
  {
    q: "자발적으로 가게를 접었는데 비자발적 폐업으로 인정받을 수 있나요?",
    a: "매출이 직전 동기 대비 30% 이상 줄었거나 6개월 이상 적자가 계속됐으면 비자발적 폐업으로 인정돼요. 부가세 신고서나 손익계산서로 증빙하면 되죠. 단순히 '힘들어서 접었다'는 인정이 어려워요.",
  },
  {
    q: "고용보험 가입한 지 6개월밖에 안 되는데 실업급여를 받을 수 있나요?",
    a: "안 돼요. 자영업자는 최소 1년(12개월) 이상 보험료를 납부해야 수급 자격이 생겨요. 일반 근로자(180일)보다 기준이 높죠.",
  },
  {
    q: "기준보수 등급은 어떻게 골라야 유리한가요?",
    a: "가입할 때 1~7등급 중 선택하고, 매년 변경할 수 있어요. 등급이 높으면 보험료도 높지만 수급액도 올라가죠. 다만 현재 1~6등급은 전부 하한액(66,048원)에 걸리기 때문에 7등급이 아니면 수급액 차이가 거의 없어요.",
  },
  {
    q: "폐업 후 다시 창업해도 실업급여를 계속 받을 수 있나요?",
    a: "재창업하면 구직급여는 중단돼요. 대신 남은 수급일수가 절반 이상 남아 있으면 조기재취업수당을 받을 수 있죠. 남은 일수 x 1일 수급액 x 50%를 한꺼번에 지급해요.",
  },
  {
    q: "부부가 공동으로 사업했는데 둘 다 실업급여를 받을 수 있나요?",
    a: "사업자등록 명의자 1명만 수급 대상이에요. 배우자가 별도 사업체에서 고용보험에 가입해 있었다면 각각 신청 가능하지만, 같은 사업체 공동대표면 1명만 받을 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제69조의2~69조의11: 자영업자 고용보험 가입 및 수급", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령 제104조의6: 기준보수 등급표", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 자영업자 고용보험 안내", url: "https://www.ei.go.kr" },
      { label: "근로복지공단: 고용·산재보험 토탈서비스", url: "https://total.comwel.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-폐업",
    title: "폐업 후 실업급여 신청 절차와 조건",
    description: "폐업 사유별 실업급여 수급 요건과 고용센터 신청 순서를 정리했어요.",
  },
  {
    slug: "폐업-실업급여",
    title: "폐업 실업급여 금액과 수급기간",
    description: "폐업 후 받을 수 있는 실업급여 금액 계산법과 기간을 안내해요.",
  },
  {
    slug: "실업급여-창업",
    title: "실업급여 수급 중 창업하면 어떻게 되나요?",
    description: "실업급여 받다가 재창업했을 때 수급 중단 조건과 조기재취업수당을 설명해요.",
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
          currentSlug="자영업자-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 자영업자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자영업자 폐업하면 실업급여?<br />
        가입 조건과 수급기간
      </h1>

      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        &quot;5년 넘게 운영하던 가게를 접었는데, 실업급여 대상이 아니라고요?&quot;
      </p>
      <p style={body}>
        사전에 고용보험에 가입했다면 받을 수 있죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제69조의2</a>에 따라
        50인 미만 사업장 사업주는 고용보험에 <strong>임의가입</strong>할 수 있고,
        1년 이상 보험료를 납부한 뒤 비자발적으로 폐업하면 구직급여가 나오죠.
        기준보수 등급(1~7등급)에 따라 1일 66,048~68,100원, 최대 210일까지 받을 수 있죠.
      </p>
      <p style={body}>
        문제는 이 제도를 폐업하고 나서야 알게 되는 분이 너무 많다는 거예요.
        &quot;사업주는 실업급여 대상이 아닌 줄 알았다&quot;는 말을 정말 자주 듣죠.
        지금 가게를 운영 중이라면 가입 조건부터, 이미 폐업했다면 신청 기한부터 살펴보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 가입 자격과 절차 */}
      <H2>가입 조건은 누가 어떻게 충족하나요?</H2>
      <p style={body}>
        50인 미만 사업장을 운영하는 사업주라면 가입할 수 있죠.
        법인 대표든 개인사업자든 상관없고, 직원이 0명인 1인 사업자도 해당되죠.
        핵심 조건은 <strong>근로자 50인 미만</strong>이라는 사업 규모 하나예요.
        업종 제한도 없어서, 카페든 온라인 쇼핑몰이든 다 가입할 수 있죠.
      </p>
      <p style={body}>
        일반 직장인은 회사가 자동으로{" "}
        <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험</a>에 넣어주지만, 자영업자는 <strong>본인이 직접 신청</strong>해야 해요.{" "}
        <a href="https://total.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단 토탈서비스</a>에서
        온라인으로 가입하거나, 관할 근로복지공단에 방문하면 되죠.
        사업자등록증 사본만 있으면 돼요.
        5분이면 끝나는 절차인데, 이걸 안 해서 나중에 한 푼도 못 받는 분이 정말 많아요.
      </p>
      <p style={body}>
        가입할 때 <strong>기준보수 등급</strong>을 선택해야 해요.
        1등급(182만 원)부터 7등급(338만 원)까지 7단계가 있고, 등급이 높을수록 보험료도 올라가는 대신 나중에 수급액도 커지죠.
        보험료율은 기준보수의 <strong>2.25%</strong>예요.
        1등급이면 월 40,950원, 7등급이면 월 76,050원을 내게 돼요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>가입 대상: 50인 미만 사업장 사업주 (1인 사업자 포함)</p>
        <p style={{ margin: "0 0 4px" }}>가입 방법: 본인 직접 신청: 근로복지공단 토탈서비스(online) 또는 방문</p>
        <p style={{ margin: "0 0 4px" }}>보험료: 기준보수 x 2.25% (월 40,950~76,050원)</p>
        <p style={{ margin: 0 }}>수급 조건: <strong>1년 이상 가입 + 비자발적 폐업 + 재취업 의사</strong></p>
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 구직급여 수급 자격이 있어요. 관할 고용센터에 신청하세요."
        partialMatchText="일부 조건이 안 맞아요. 해당 항목을 고용센터(1350)에서 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 수급액 계산 */}
      <H2>가입 등급에 따라 수급액이 달라지나요?</H2>
      <p style={body}>
        자영업자 구직급여는 <strong>기준보수 / 30일 x 60%</strong>로 계산해요.
        일반 근로자가 퇴직 전 평균임금을 기준으로 하는 것과 달리, 가입할 때 선택한 기준보수 등급이 곧 계산의 출발점이 되는 거예요.
        같은 매출을 올리더라도 등급 선택에 따라 수급액이 완전히 달라지죠.
        그래서 가입할 때 등급 선택이 꽤 중요해요.
      </p>
      <p style={body}>
        그런데 실제로는 등급 간 수급액 차이가 크지 않아요.
        2026년 하한액이 1일 <strong>66,048원</strong>인데, 1~6등급은 계산 결과가 전부 하한액 이하로 떨어지죠.
        4등급(260만 원)으로 계산하면 1일 52,000원인데, 하한액 보장 때문에 실제로는 66,048원을 받게 돼요.
        보험료를 적게 내도 받는 금액은 비슷한 구조예요.
      </p>
      <p style={body}>
        <strong>7등급(338만 원)일 때만</strong> 1일 67,600원으로 하한액을 넘겨요.
        보험료를 가장 많이 내는 사람만 하한액보다 조금 더 받는 셈이죠.
        상한액은 68,100원이니까, 자영업자가 받을 수 있는 1일 수급액은 66,048~68,100원 범위 안에 있는 셈이죠.
        등급 고민이 된다면, 보험료 부담과 수급액 차이를 아래에서 비교해보세요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>1등급(182만 원): 월 보험료 40,950원 → 1일 수급액 66,048원(하한)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>4등급(260만 원): 월 보험료 58,500원 → 1일 수급액 66,048원(하한)</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>7등급(338만 원): 월 보험료 76,050원 → 1일 수급액 67,600원</p>
      </BorderBox>

      <SectionBadge>등급과 가입기간을 바꿔가며 계산해보세요</SectionBadge>
      <Calculator
        title="자영업자 구직급여 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 하한액 66,048원, 상한액 68,100원 적용. 실제 수급액은 고용센터 심사 결과에 따라 달라질 수 있어요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 비자발적 폐업 기준 */}
      <H2>비자발적 폐업 조건과 인정 기준</H2>
      <p style={body}>
        자영업자 구직급여에서 가장 까다로운 관문이 바로 폐업 사유예요.
        &quot;내가 문을 닫았는데 비자발적이라니?&quot; 싶겠지만, 폐업 원인이 외부 요인이면 비자발적으로 인정해요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a>에
        구체적 사유가 나열되어 있죠.
        여기에 해당하느냐 아니냐가 수급 여부를 결정하는 핵심이에요.
      </p>
      <p style={body}>
        대표적인 인정 사유는 네 가지예요.
        첫째, <strong>최근 3개월 매출이 전년 동기 대비 30% 이상 감소</strong>한 경우.
        둘째, <strong>6개월 이상 연속 적자</strong>가 이어진 경우.
        셋째, 자연재해나 화재 등 재해로 영업이 불가능해진 경우.
        넷째, 건물 철거나 임대차 종료 등으로 <strong>영업장을 잃은 경우</strong>예요.
      </p>
      <p style={body}>
        반면에 &quot;다른 사업을 하고 싶어서&quot;, &quot;경쟁이 심해서 그냥 접었어&quot; 같은 건 자발적 폐업이에요.
        경쟁 심화로 매출이 줄었다 해도, 숫자로 증명할 수 없으면 인정이 어렵죠.
        <strong>부가세 신고서, 손익계산서 같은 증빙</strong>을 폐업 전에 반드시 확보해두세요.
        증빙 없이 말로만 &quot;매출이 줄었다&quot;고 해서는 통하지 않아요.
      </p>

      <SectionBadge>폐업 전 준비할 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 수급기간과 금액 정리 */}
      <H2>가입기간별 수급기간과 신청 기한</H2>
      <p style={body}>
        수급기간은 고용보험 가입기간에 따라 4단계로 나뉘어요.
        1년 이상~3년 미만이면 <strong>120일</strong>, 3년 이상~5년 미만이면 <strong>150일</strong>이죠.
        5년 이상~10년 미만은 <strong>180일</strong>, 10년 이상이면 <strong>210일</strong>이에요.
        일반 근로자는 나이에 따라 기간이 늘어나지만, 자영업자는 나이와 무관하게 가입기간만 기준이 된다는 점이 다르죠.
      </p>
      <p style={body}>
        신청 기한은{" "}
        <a href="/w/퇴사후-실업급여-신청-기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>폐업일 다음 날부터 12개월 이내</a>예요.
        이 기간을 넘기면 수급 자격 자체가 사라지죠.
        폐업 직후에는 정리할 일이 산더미처럼 쌓이겠지만, 고용센터 방문만큼은 최대한 빨리 하는 게 유리해요.
        12개월이 지나면 그동안 낸 보험료를 돌려받을 수도 없어요.
      </p>
      <p style={body}>
        보험료를 체납한 기간이 있으면 그만큼 피보험기간에서 빠져요.
        3년 가입했는데 6개월 체납이 있으면 실질 가입기간은 2년 6개월이 되는 거죠.
        자동이체를 걸어두면 체납 걱정 없이 기간을 채울 수 있죠.
        지금 가게를 운영 중이라면 자동이체부터 설정해두세요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>가입 방식: 자영업자 임의가입 / 근로자 의무가입</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>최소 가입기간: 자영업자 1년 / 근로자 180일</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>산정 기준: 자영업자 기준보수 / 근로자 평균임금</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>수급기간: 자영업자 가입기간만 / 근로자 나이 + 가입기간</p>
      </BorderBox>

      <Divider />

      {/* 섹션 5: 재창업 시 주의사항 */}
      <H2>수급기간 확인하고 재창업 전략 세우세요</H2>
      <p style={body}>
        구직급여 수급 중에 재창업하면 구직급여는 <strong>중단</strong>돼요.
        사업자등록을 다시 내는 순간 &quot;실업 상태&quot;가 아니게 되니까요.
        하지만 남은 수급일수가 절반 이상 남아 있으면{" "}
        <a href="/w/실업급여-취업촉진수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>을 받을 수 있죠.
        이걸 모르고 급여만 쭉 받다가 재창업하면 수당을 놓치는 거예요.
      </p>
      <p style={body}>
        조기재취업수당은 남은 수급일수 x 1일 수급액 x 50%를 한꺼번에 지급하는 제도예요.
        예를 들어 150일분 수급자격에서 30일만 쓰고 재창업하면, 남은 120일 x 66,048원 x 50% = 약 396만 원을 일시금으로 받게 되죠.
        고용센터에 사업계획서를 제출하면 돼요.
      </p>
      <p style={body}>
        주의할 점이 하나 더 있죠.
        재창업 후 다시 고용보험에 가입하면, <strong>이전 가입 이력은 초기화</strong>돼요.
        처음부터 1년 이상 보험료를 다시 납부해야 다음 수급 자격이 생기죠.
        이전에 10년을 납부했더라도 재가입하면 0부터 시작이에요. 이 점을 꼭 기억해두세요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>수급일수 절반 이상 남음 → 조기재취업수당 (일시금) 신청 가능</p>
        <p style={{ margin: "0 0 4px" }}>수급일수 절반 미만 → 남은 급여 소멸, 수당 없음</p>
        <p style={{ margin: 0 }}>재가입 시 가입기간 → 0부터 다시 시작</p>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        자영업자 고용보험과 구직급여에 대해 실제로 자주 나오는 질문만 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 및 동법 시행령을 바탕으로 작성됐어요. 자영업자 고용보험 제도는 수시로 개정될 수 있으니, 최신 기준은 고용24(ei.go.kr)나 근로복지공단(1588-0075)에서 확인하세요." />
    </ArticleLayout>
  );
}
