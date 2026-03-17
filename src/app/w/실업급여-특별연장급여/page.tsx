"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "실업급여 수급기간이 만료됐거나 곧 만료돼요" },
  { id: "c2", label: "특별연장급여 지정 여부를 고용24에서 확인했어요" },
  { id: "c3", label: "재취업 의사가 있고 구직활동을 하고 있어요" },
  { id: "c4", label: "고용센터에서 실업인정을 받고 있어요" },
];

const CALC_SLIDERS = [
  { id: "dailyPay", label: "1일 구직급여액", min: 66048, max: 68100, step: 100, defaultValue: 66048, format: (v: number) => `${v.toLocaleString()}원` },
  { id: "extDays", label: "연장 일수", min: 1, max: 60, step: 1, defaultValue: 60, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "1일 연장급여액 (70%)",
    getValue: (v: Record<string, number>) => Math.round(v.dailyPay * 0.7),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "추가 수급 총액",
    getValue: (v: Record<string, number>) => Math.round(v.dailyPay * 0.7) * v.extDays,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr) 공지사항에서 특별연장급여 시행 여부 확인",
  "고용센터 안내 문자 또는 1350 전화로 시행 여부 재확인",
  "실업인정일에 맞춰 구직활동 증빙 준비",
  "연장 기간 중 취업하면 즉시 중단되니 취업일 관리",
  "개별연장급여, 훈련연장급여 등 다른 연장제도 병행 확인",
];

const FAQS = [
  {
    q: "특별연장급여를 개인이 직접 신청할 수 있나요?",
    a: "아니에요. 특별연장급여는 정부가 결정하면 자동으로 적용돼요. 고용노동부 장관이 고시하면 수급자 전체에게 일괄 적용되는 방식이죠.",
  },
  {
    q: "기존 구직급여가 끝난 뒤에도 받을 수 있나요?",
    a: "수급기간이 끝나는 시점에 특별연장급여가 시행 중이면 자동으로 60일이 연장돼요. 이미 수급이 끝나고 한참 지난 뒤에는 해당이 안 되죠.",
  },
  {
    q: "특별연장급여 기간에도 구직활동을 해야 하나요?",
    a: "네, 해야 해요. 연장된 60일 동안에도 실업인정을 받아야 하고, 구직활동 증빙도 필요하죠. 취업하면 바로 중단돼요.",
  },
  {
    q: "개별연장급여와 동시에 받을 수 있나요?",
    a: "연장급여는 중복 적용이 안 돼요. 특별연장급여, 개별연장급여, 훈련연장급여 중 하나만 적용되죠. 다만 순차적으로 받을 수 있는 경우도 있어요.",
  },
  {
    q: "코로나 때처럼 다시 시행될 가능성이 있나요?",
    a: "경기 침체가 심각해지면 시행 가능성이 있어요. 2020년 코로나 당시 실제로 시행됐고, 수만 명이 혜택을 받았죠. 실업률이 급등하면 고용노동부가 다시 고시할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제53조: 특별연장급여 근거 규정", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 연장급여 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 고용정책 보도자료", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-훈련연장급여",
    title: "실업급여 훈련연장급여 조건과 신청",
    description: "직업훈련을 받으면 실업급여를 최대 2년까지 연장받을 수 있어요.",
  },
  {
    slug: "실업급여-수급기간-몇개월-받나요",
    title: "실업급여 수급기간 몇 개월 받나요",
    description: "나이와 근속기간에 따라 120일에서 270일까지 달라져요.",
  },
  {
    slug: "실업급여-최대금액",
    title: "실업급여 최대금액 1일 상한액 기준",
    description: "평균임금이 아무리 높아도 상한액이 정해져 있어요. 2026년 기준 최대 금액을 정리했어요.",
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
          currentSlug="실업급여-특별연장급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 &middot; 고용보험 &middot; 연장급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        수급 끝났는데 아직 미취업?<br />
        특별연장급여 조건과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;실업급여 끝나가는데 취업은 안 되고, 경기까지 안 좋아요.&quot;
      </p>
      <p style={body}>
        이런 상황에서 정부가 <strong>실업급여를 60일 더</strong> 지급해주는 제도가 특별연장급여예요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제53조</a>에 근거하고 있고,
        코로나 사태 때 실제로 시행된 적이 있죠.
        개인이 따로 신청하는 방식이 아니라, 정부가 발표하면 수급자 전체에게 자동 적용돼요.
      </p>
      <p style={body}>
        평상시에는 쓸 일이 없는 제도이지만, 언제 다시 시행될지 모르니까 조건과 금액을 미리 알아두면 좋아요.
        지금부터 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 특별연장급여란 */}
      <H2>특별연장급여, 어떤 조건에서 시행되나요?</H2>
      <p style={body}>
        경제 위기 때 정부가 실업급여 수급기간을 <strong>일괄 연장</strong>해주는 제도예요.
        개인의 사정이 아니라, 나라 전체 고용 시장이 흔들릴 때 가동되죠.
        실업률이 급등하거나 대량 해고가 쏟아지면 고용노동부 장관이 고시를 통해 시행을 결정해요. <a href="/w/실업급여-수급기간-몇개월-받나요" style={{ color: "#1D9E75", textDecoration: "underline" }}>기본 수급기간</a>이 끝난 뒤에 적용되는 제도이죠.
      </p>
      <p style={body}>
        이 제도의 핵심은 <strong>개인이 신청할 필요가 없다</strong>는 점이에요.
        정부가 &ldquo;시행한다&rdquo;고 발표하면, 그 시점에 구직급여를 받고 있는 수급자 전체에게 자동으로 적용되죠.
        별도 서류를 내거나 고용센터를 방문하지 않아도 돼요.
      </p>
      <p style={body}>
        연장 기간은 <strong>최대 60일</strong>이에요.
        원래 수급기간이 끝나는 날부터 60일간 추가로 급여가 나오는 구조죠.
        다만 연장 기간에도 실업인정과 구직활동 의무는 그대로 유지돼요.
        중간에 취업하면 그 시점에서 바로 중단되고요.
      </p>

      <GreenBox title="특별연장급여 핵심 요약">
        대상: 구직급여 수급자 전체 (자동 적용, 별도 신청 불필요)<br />
        기간: 최대 60일<br />
        금액: 기존 구직급여의 70% (2026년 기준 하루 최대 47,670원)<br />
        조건: 연장 기간 중에도 실업인정 + 구직활동 유지 필수
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 특별연장급여가 시행 중이라면 자동으로 60일 연장 수급 대상이에요."
        partialMatchText="일부만 해당돼요. 특별연장급여 시행 여부를 고용24나 고용센터(1350)에서 먼저 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 금액 계산 */}
      <H2>특별연장급여 금액은 얼마나 되나요?</H2>
      <p style={body}>
        금액은 <strong>기존 구직급여 일액의 70%</strong>예요.
        원래 하루 66,048원을 받던 사람이라면, 연장 기간에는 약 46,234원을 받게 되죠.
        2026년 기준 구직급여 상한액(68,100원)의 70%인 <strong>47,670원이 하루 최대</strong>이에요.
      </p>

      <SectionBadge>내 연장급여액을 계산해보세요</SectionBadge>
      <Calculator
        title="특별연장급여 예상 수급액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 구직급여 상한액 68,100원, 하한액 66,048원. 특별연장급여는 구직급여의 70%가 적용돼요."
      />

      <p style={body}>
        60일을 전부 채우면 최대 약 <strong>286만 원</strong>을 추가로 수급할 수 있죠.
        이건 상한액 기준이고, 하한액이 적용되는 사람이라면 60일 기준 약 278만 원이죠.
        본인의 1일 수급액에 따라 금액이 달라지니까, 아래 계산기로 직접 조회해보세요.
      </p>
      <p style={body}>
        하나 주의할 게 있죠.
        특별연장급여 기간에 취업하면 <strong>그날부터 급여가 중단</strong>돼요.
        60일을 다 채우지 않았더라도 취업 시점에서 끝나는 거죠.
        반대로 60일이 지났는데도 취업을 못 했다면 더 이상 연장은 없어요.
        그때는 개별연장급여나 <a href="/w/실업급여-훈련연장급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>훈련연장급여</a>를 별도로 알아봐야 하죠.
      </p>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 시행 조건과 확인 방법 */}
      <H2>특별연장급여 시행 시기와 신청 절차</H2>
      <p style={body}>
        평상시에는 시행 자체가 안 돼요.
        <strong>고용노동부 장관이 고시</strong>를 내려야 비로소 시작되죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 정한 기준은 &ldquo;실업 상황이 심각하다&rdquo;고 판단될 때예요.
        실업률이 급등하거나, 특정 산업에서 대량 실업이 터지거나, 경제 위기로 고용 시장 전체가 흔들리는 상황이 여기에 해당하죠.
      </p>
      <p style={body}>
        대표적인 사례가 2020년 코로나 사태였어요.
        당시 고용노동부가 고시를 내렸고, 수만 명이 60일 추가 수급 혜택을 받았죠.
        그 전에는 1998년 IMF 외환위기, 2009년 글로벌 금융위기 때 시행된 적이 있고요.
        나라 경제가 크게 흔들릴 때만 가동되는 비상 제도라고 보면 돼요.
      </p>
      <p style={body}>
        2026년 3월 현재는 어떨까요?
        <strong>지금은 시행되고 있지 않아요.</strong>
        경기 불안 뉴스가 많지만, 아직 고용노동부가 고시를 내리진 않았죠.
        시행이 결정되면 고용노동부 보도자료,{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 공지, 언론 보도를 통해 발표돼요.
      </p>

      <SectionBadge>시행 확인 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 다른 연장급여와 비교 */}
      <H2>개별연장급여, 훈련연장급여와의 조건 비교</H2>
      <p style={body}>
        연장급여는 총 3가지예요: 특별연장급여, 개별연장급여, 훈련연장급여.
        이름이 비슷해서 자주 헷갈리는데, 결정적인 차이는 <strong>&ldquo;누가 시작하느냐&rdquo;</strong>예요.
        특별연장급여는 정부가 결정하고, 나머지 둘은 개인이 조건을 갖추거나 직접 신청해야 하죠.
      </p>
      <p style={body}>
        <strong>개별연장급여</strong>는 개인의 경제적 형편이 어려울 때 쓰는 거예요.
        재산 기준과 소득 기준을 충족해야 하고, 고용센터에서 심사를 거치죠.
        특별연장급여와 달리 본인이 직접 신청해야 해요.
        연장 기간은 동일하게 60일이에요.
      </p>
      <p style={body}>
        <strong>훈련연장급여</strong>는 직업훈련을 받는 동안 실업급여를 계속 지급하는 제도예요.
        고용센터가 지정한 훈련 과정에 참여해야 하고, 훈련 기간 동안 구직급여의 100%를 받을 수 있죠.
        최대 2년까지 가능하니까 연장 기간이 압도적으로 길어요.
      </p>

      <BorderBox title="연장급여 3종 한눈에 비교">
        <strong>특별연장급여</strong>: 정부가 결정, 자동 적용 / 60일 / 구직급여의 70%<br />
        <strong>개별연장급여</strong>: 본인이 신청, 심사 필요 / 60일 / 구직급여의 70%<br />
        <strong>훈련연장급여</strong>: 훈련 참여 시 적용 / 훈련 기간(최대 2년) / 구직급여의 100%
      </BorderBox>

      <Divider />

      {/* 섹션 5: 실전 정리 */}
      <H2>수급자라면 이것만 챙기세요</H2>
      <p style={body}>
        특별연장급여는 개인이 직접 할 수 있는 게 많지 않아요.
        정부가 시행을 결정해야 시작되는 제도니까요.
        그래도 수급자라면 반드시 알아둬야 할 포인트가 세 가지 있죠.
      </p>
      <p style={body}>
        첫째, <strong>실업인정을 빠지면 안 돼요</strong>.
        특별연장급여가 시행 중이라도 실업인정을 받지 않으면 급여가 나오지 않아요.
        구직활동 증빙도 꾸준히 해야 하죠.
        둘째, <strong>고용24 공지를 수시로 살펴보세요</strong>.
        시행이 결정되면 가장 먼저 공지가 올라가요.
        고용센터에서 문자를 보내주긴 하지만, 직접 확인하는 게 확실하죠.
      </p>
      <p style={body}>
        셋째, 지금처럼 시행되지 않는 시기라면 <strong>개별연장급여</strong>를 살펴보세요.
        재산과 소득 기준을 충족하면 개인적으로 60일 연장을 신청할 수 있죠.
        직업훈련을 생각하고 있다면 훈련연장급여도 선택지가 되죠.
        연장급여 3종 중에서 본인 상황에 맞는 걸 찾는 게 핵심이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        특별연장급여에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 특별연장급여 시행 여부는 경기 상황에 따라 달라지니, 고용24(ei.go.kr) 또는 고용센터(1350)에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
