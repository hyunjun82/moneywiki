"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "재취업한 직장에서 고용보험에 가입돼 있었어요" },
  { id: "c2", label: "재취업한 직장에서 비자발적으로 퇴직했어요 (권고사직, 계약만료 등)" },
  { id: "c3", label: "재취업한 직장에서 피보험기간 180일 이상을 새로 충족했어요" },
  { id: "c4", label: "퇴직일로부터 12개월 이내에 신청할 수 있어요" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "새 직장 월급 (세전)",
    min: 200, max: 600, step: 10, defaultValue: 300,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "months",
    label: "새 직장 근무기간",
    min: 6, max: 120, step: 6, defaultValue: 18,
    format: (v: number) => `${v}개월`,
  },
  {
    id: "age",
    label: "나이",
    min: 25, max: 65, step: 1, defaultValue: 35,
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
    label: "수급기간",
    getValue: (v: Record<string, number>) => {
      const y = v.months / 12;
      const over50 = v.age >= 50;
      if (y < 1) return 120;
      if (y < 3) return over50 ? 180 : 150;
      if (y < 5) return over50 ? 210 : 180;
      if (y < 10) return over50 ? 240 : 210;
      return over50 ? 270 : 240;
    },
    format: (v: number) => `${v}일`,
  },
  {
    label: "총 예상 수령액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round(v.salary * 10000 / 30 * 0.6)));
      const y = v.months / 12;
      const over50 = v.age >= 50;
      let days = 120;
      if (y >= 1 && y < 3) days = over50 ? 180 : 150;
      else if (y >= 3 && y < 5) days = over50 ? 210 : 180;
      else if (y >= 5 && y < 10) days = over50 ? 240 : 210;
      else if (y >= 10) days = over50 ? 270 : 240;
      return daily * days;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 이전 수급이력과 남은 수급일수 확인",
  "재취업한 회사에서 이직확인서 발급 요청 (퇴직 사유 확인)",
  "워크넷(work.go.kr) 구직등록 완료",
  "관할 고용센터 방문 — 신분증, 통장 사본 지참",
  "조기재취업수당 수령 여부 확인 (받았으면 남은 급여 소멸)",
];

const FAQS = [
  {
    q: "실업급여 받다가 3개월 만에 재취업했는데 또 퇴직했어요. 남은 급여를 받을 수 있나요?",
    a: "수급기간(첫 퇴직일로부터 1년) 안이고 비자발적 퇴직이면 남은 실업급여를 이어 받을 수 있어요. 고용센터에 수급자격 재신청을 하면 되죠.",
  },
  {
    q: "조기재취업수당을 받았는데 재취업한 회사에서 또 퇴직했어요.",
    a: "조기재취업수당을 받으면 남은 실업급여는 소멸돼요. 새로운 수급자격을 만들어야 하는데, 재취업한 회사에서 12개월 이상 근무하고 비자발적으로 퇴직해야 가능하죠.",
  },
  {
    q: "재취업한 회사에서 1년 넘게 다녔어요. 이전 남은 급여를 받나요, 새로 받나요?",
    a: "12개월 이상 근무하면 새로운 수급자격이 생겨요. 이전 남은 급여가 아니라 새 기준으로 금액과 기간이 계산되죠. 보통 새로운 수급자격이 더 유리해요.",
  },
  {
    q: "재취업한 회사에서 자발적으로 퇴사하면 실업급여를 받을 수 있나요?",
    a: "원칙적으로 안 돼요. 남은 급여도 새 자격도 모두 불가하죠. 단, 임금체불(2개월 이상 미지급), 직장 내 괴롭힘, 출퇴근 왕복 3시간 초과 같은 정당한 사유가 있으면 비자발적으로 인정받을 수 있어요.",
  },
  {
    q: "이전 직장과 새 직장의 피보험기간을 합산할 수 있나요?",
    a: "이전 직장에서 실업급여를 받지 않았다면 합산 가능해요. 실업급여를 이미 수급한 기간은 소진된 것으로 보기 때문에 합산 대상에서 빠지죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제40조 — 구직급여 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제48조 — 수급기간 및 재수급 규정", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 별표2 — 정당한 이직 사유", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-재신청",
    title: "실업급여 재신청 절차와 필요 서류",
    description: "실업급여를 다시 받으려면 어떤 절차를 밟아야 하는지 상세히 정리했어요.",
  },
  {
    slug: "실업급여-조기재취업수당",
    title: "조기재취업수당 조건과 금액 계산",
    description: "남은 수급일수의 절반을 일시금으로 받는 조기재취업수당 조건을 안내해요.",
  },
  {
    slug: "실업급여-피보험기간",
    title: "피보험기간 180일 기준과 합산 방법",
    description: "여러 직장의 피보험기간을 합산하는 방법과 180일 충족 기준을 설명해요.",
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
          currentSlug="재취업후-재퇴직-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 재취업후퇴직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재취업 후 또 퇴직했다면?<br />
        실업급여 재수급 조건과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;실업급여 받다가 취업했는데, 3개월 만에 또 나왔어요. 남은 거 이어서 받을 수 있나요?&quot;<br /><br />
        상황에 따라 가능해요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제48조</a>에 따르면
        수급기간(첫 퇴직일로부터 12개월) 안에 재취업했다가 다시 비자발적으로 퇴직하면, 남은 실업급여를 이어서 받을 수 있죠.
        재취업 기간이 12개월 이상이면 아예 <strong>새로운 수급자격</strong>이 생기기도 하죠.
        어디에 해당하느냐에 따라 금액과 기간이 달라지니까, 본인 상황을 정확히 따져봐야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 수급기간 내 남은 급여 */}
      <H2>재수급 조건을 충족하는 경우는 어떤 건가요?</H2>
      <p style={body}>
        실업급여 수급기간은 <strong>첫 퇴직일로부터 12개월</strong>이에요.
        이 12개월 안에 재취업했다가 다시 비자발적으로 퇴직하면, 아직 다 받지 못한 <strong>남은 실업급여</strong>를 이어서 받을 수 있죠.
        &quot;수급기간 12개월&quot;이 첫 퇴직 시점부터 시작된다는 게 핵심이에요.
      </p>
      <p style={body}>
        예를 하나 들어볼게요. 2026년 1월에 퇴직해서 120일분 수급자격을 받았어요.
        60일분을 받다가 3월에 재취업했죠. 남은 60일분은 사라진 게 아니에요.
        6월에 다시 비자발적으로 퇴직했다면? 수급기간(2026년 12월까지)이 안 끝났으니까 <strong>남은 60일분을 그대로 이어 받을 수 있죠</strong>.
      </p>
      <p style={body}>
        조건이 하나 더 붙어요. 재취업한 회사에서도 <strong>비자발적으로 퇴직</strong>해야 하죠.
        권고사직, 계약만료, 정당한 이직 사유가 인정돼요.
        본인이 그냥 &quot;안 맞아서&quot; 나온 자발적 퇴사라면 남은 급여를 받을 수 없고, 조기재취업수당을 이미 받은 경우도 마찬가지예요.
      </p>

      <GreenBox title="남은 급여를 이어 받으려면 이 3가지가 다 맞아야 해요">
        1. 수급기간(첫 퇴직일로부터 12개월) 안이어야 함<br />
        2. 재취업한 회사에서 비자발적으로 퇴직해야 함<br />
        3. 조기재취업수당을 받지 않았어야 함
      </GreenBox>

      <SectionBadge>새로운 수급자격이 생기는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 새로운 수급자격으로 실업급여를 받을 수 있어요."
        partialMatchText="일부 조건이 안 맞아요. 남은 급여 수급 가능 여부를 고용센터(1350)에 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 상황별 정리 + 계산기 */}
      <H2>계산법은 남은 급여와 새 자격 중 어디에 해당되나요?</H2>
      <p style={body}>
        재취업 후 재퇴직은 크게 네 가지 상황으로 나뉘어요.
        <strong>재취업 기간(12개월 기준)</strong>과 <strong>퇴직 사유(자발/비자발)</strong>를 조합해서 판단하죠.
        어디에 해당되느냐에 따라 남은 급여를 받을지, 새 수급자격을 받을지, 아무것도 못 받을지가 갈려요.
      </p>

      <BorderBox title="4가지 상황별 수급 가능 여부">
        12개월 미만 + 비자발적 퇴직 → <strong>남은 급여 수급 가능</strong> (수급기간 내 한정)<br />
        12개월 미만 + 자발적 퇴직 → <strong>불가</strong> (남은 급여도, 새 자격도 안 됨)<br />
        12개월 이상 + 비자발적 퇴직 → <strong>새로운 수급자격 발생</strong><br />
        12개월 이상 + 자발적 퇴직 → <strong>불가</strong> (정당한 사유 없으면)
      </BorderBox>

      <p style={body}>
        재취업한 회사에서 <strong>12개월 이상</strong> 근무하고 비자발적으로 퇴직하면 <strong>새로운 수급자격</strong>이 만들어져요.
        이전 남은 급여가 아니라 새 직장 기준으로 금액과 기간이 다시 계산되죠.
        새 직장 월급이 이전보다 높았다면 수급액도 올라갈 수 있어서, 보통은 새 수급자격이 더 유리해요.
      </p>
      <p style={body}>
        &quot;내가 먼저 나왔으니 자발적 퇴사 아닌가?&quot; 하고 걱정되는 분도 있을 거예요.
        임금체불(30% 이상 또는 2개월 이상), 직장 내 괴롭힘, 출퇴근 왕복 3시간 초과 같은 &quot;정당한 이직 사유&quot;가 있으면 비자발적 퇴직으로 인정돼요.
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙 별표2</a>에 전체 사유 목록이 나와 있으니 참고하세요.
      </p>

      <SectionBadge>새 수급자격 기준으로 예상 수급액을 계산해보세요</SectionBadge>
      <Calculator
        title="재수급 예상 금액 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 새로운 수급자격(12개월 이상 근무 + 비자발적 퇴직) 기준이에요. 남은 급여를 이어 받는 경우에는 이전 금액·일수가 그대로 적용돼요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 조기재취업수당 받은 경우 */}
      <H2>조기재취업수당 수령 후 재수급 조건</H2>
      <p style={body}>
        조기재취업수당은 남은 실업급여의 절반을 일시금으로 미리 받는 제도예요.
        문제는 이걸 받으면 <strong>남은 실업급여가 완전히 소멸</strong>된다는 거죠.
        &quot;절반을 미리 받았으니 나머지도 사라진다&quot;고 이해하면 돼요.
      </p>
      <p style={body}>
        조기재취업수당을 받은 뒤에 다시 퇴직했다면, 이전 남은 급여를 이어 받는 건 불가능해요.
        처음부터 <strong>새로운 수급자격</strong>을 만들어야 하죠.
        재취업한 회사에서 12개월 이상 근무하고, 비자발적으로 퇴직해야 새 자격이 생겨요.
        12개월을 못 채웠다면 안타깝지만 실업급여를 받을 방법이 없어요.
      </p>
      <p style={body}>
        이 때문에 조기재취업수당을 받을지 말지는 <strong>재취업의 안정성</strong>을 따져서 결정해야 해요.
        이직이 잦은 업종이라면 수당을 안 받고 남은 급여를 남겨두는 게 오히려 안전하죠.
        반대로 오래 다닐 수 있는 직장이라면 수당을 받는 게 이득이고요.
      </p>

      <SectionBadge>조기재취업수당 받은 후 정리</SectionBadge>
      <GreenBox title="조기재취업수당 후 재퇴직하면?">
        남은 실업급여 → <strong>소멸</strong> (이미 절반 수령 완료)<br />
        새 수급자격 → 12개월 이상 근무 + 비자발적 퇴직 시 <strong>가능</strong><br />
        12개월 미달 → <strong>수급 불가</strong>
      </GreenBox>

      <Divider />

      {/* 섹션 4 — 수급기간 만료 후 */}
      <H2>수급기간 만료 후 재수급 계산법</H2>
      <p style={body}>
        수급기간은 <strong>첫 퇴직일로부터 12개월</strong>이에요. 이 기한이 지나면 남은 급여가 있어도 사라져요.
        2025년 1월에 퇴직해서 재취업했다가, 2026년 3월에 다시 퇴직했다면?
        이미 12개월이 지났으니 이전 남은 급여를 받을 수 없죠.
      </p>
      <p style={body}>
        그렇다고 아예 방법이 없는 건 아니에요.
        재취업한 회사에서 피보험기간 180일 이상을 새로 채우고 비자발적으로 퇴직하면 <strong>새로운 수급자격</strong>이 생기거든요.
        이전 직장 피보험기간은 이미 실업급여로 소진했기 때문에 합산 대상이 아니에요.
        새 직장에서 쌓은 기간만으로 조건을 충족해야 하죠.
      </p>
      <p style={body}>
        그래서 수급기간이 얼마나 남았는지 항상 머릿속에 넣어둬야 해요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 상태와 남은 기간을 조회할 수 있죠.
        재취업 중이더라도 수급기간 만료일을 알아두면, 혹시 다시 퇴직하게 됐을 때 훨씬 빠르게 움직일 수 있죠.
      </p>

      <Divider />

      {/* 섹션 5 — 재수급 신청 방법 */}
      <H2>재수급 신청서를 제출하세요</H2>
      <p style={body}>
        <strong>남은 급여를 이어 받는 경우</strong>는 절차가 간단해요.
        고용센터에 방문해서 수급자격 재신청을 하면, 이전 수급자격과 연결돼요.
        새로 구직등록을 하고, 재취업한 회사의 이직확인서를 제출한 뒤 실업인정을 받으면 이전과 동일한 금액으로 남은 일수만큼 지급되죠.
      </p>
      <p style={body}>
        <strong>새로운 수급자격</strong>이라면 처음 받을 때와 동일한 절차를 밟아야 해요.
        워크넷 구직등록 → 수급자격 신청 → 실업인정 순서죠.
        새로운 기준으로 금액과 기간이 산정되고, 2026년 기준 퇴직 전 평균임금의 60%를 받아요. 1일 최대 68,100원이에요.
      </p>
      <p style={body}>
        어떤 경우든 재취업한 회사에서 <strong>이직확인서</strong>를 받아야 하는 건 마찬가지예요.
        이직 사유가 &quot;비자발적&quot;으로 정확히 기재됐는지 꼭 따져봐야 해요.
        회사가 발급을 거부하면 고용센터(1350)에 신고할 수 있죠 — 퇴직 후 10일 이내 발급이 법적 의무니까요.
      </p>

      <SectionBadge>재수급 신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        재취업 후 재퇴직과 실업급여 재수급에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 상황에 따라 수급 가능 여부가 달라지니, 정확한 판단은 고용센터(1350)에 상담하세요." />
    </ArticleLayout>
  );
}
