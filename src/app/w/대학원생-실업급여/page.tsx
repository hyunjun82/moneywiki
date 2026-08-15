"use client";
// Q1. RA·TA 계약이 끝났거나 연구과제가 종료된 대학원생이 실업급여를 받을 수 있는지 찾아보는 상황
// Q2. 고용보험 가입 이력 확인 → 수급 자격 판단 → 구직활동 기록 방법 → 고용24 신청
// Q3. 야간/전일제 차이 / 대학원 수업은 구직활동 불인정 / 피보험 180일 / 구직활동 횟수 1~2차 1회·3차 이후 2회
// Q4. EligibilityChecker(수급자격 체크) + GreenBox(야간vs전일제 비교) + Checklist(구직활동 준비) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "RA·TA·계약직 연구원 등으로 일하면서 고용보험에 가입돼 있었어요" },
  { id: "c2", label: "계약만료·연구과제 종료 등 비자발적으로 퇴직했어요" },
  { id: "c3", label: "퇴직 전 18개월 안에 고용보험 가입기간이 180일 이상이에요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능한 상태예요" },
];

const CHECKLIST = [
  "야간·주말 대학원 → 별도 입증 없이 수급 가능, 일반 수급자와 동일 처리",
  "전일제 대학원 → 입사지원·면접 기록으로 구직 의사 직접 입증 필요",
  "대학원 수업 자체는 구직활동 불인정 → 별도로 입사지원·면접 기록 남기기",
  "실업인정 구직활동 횟수: 1~2차 1회, 3차 이후 2회 이상 반드시 채우기",
  "취업 성공 시 실업급여 종료 → 남은 수급일수 절반 이상이면 조기재취업수당 신청",
];

const FAQS = [
  {
    q: "전일제 대학원 다니면 실업급여 못 받나요?",
    a: "꼭 그렇지 않아요. 구직 의사와 능력을 입증하면 받을 수 있죠. 입사지원 기록이나 면접 참여로 적극적인 구직활동을 보여주면 돼요. 다만 고용센터마다 판단이 달라질 수 있으니 신청 전 1350으로 상담 먼저 받는 게 좋아요.",
  },
  {
    q: "대학원 수업이 구직활동으로 인정되나요?",
    a: "안 돼요. 수업은 학업이지 구직활동이 아니죠. 실업인정 받으려면 입사지원, 면접, 취업특강 참석 등 별도 활동이 따로 필요해요.",
  },
  {
    q: "야간대학원 다니면서 구직활동은 어떻게 하나요?",
    a: "낮 시간에 입사지원하고 면접 보면 돼요. 야간·주말 대학원은 평일 낮에 근무할 수 있으니 재취업 의사를 따로 증명할 필요도 없죠.",
  },
  {
    q: "대학원 휴학하면 실업급여에 유리한가요?",
    a: "네, 오히려 수월해요. 휴학 상태면 전일제든 야간이든 상관없이 구직 의사를 인정받기 쉽죠. 학업에 시간을 쓰고 있지 않다는 게 분명하니까요.",
  },
  {
    q: "RA로 일하다 계약이 끝났어요. 실업급여 대상인가요?",
    a: "RA 계약이 고용보험에 가입된 상태였다면 대상이에요. 계약만료는 비자발적 퇴사이니까요. 고용24에서 가입 이력을 먼저 조회해보세요.",
  },
  {
    q: "피보험기간 180일은 어떻게 계산하나요?",
    a: "퇴직 전 18개월 안에 실제로 고용보험에 가입된 날 수예요. 여러 직장을 다녔다면 합산해서 계산해요. RA·TA로 일한 날과 다른 아르바이트·계약직 기간을 합쳐서 180일을 넘기면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 실업급여 수급자격 (재취업 의사와 능력)", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청·피보험 이력 조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 실업급여 상담 (1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-구직활동-횟수",
    title: "실업급여 구직활동 횟수와 인정 방법",
    description: "실업인정 때 필요한 횟수와 인정 활동을 정리했어요.",
  },
  {
    slug: "실업급여-온라인-교육",
    title: "실업급여 온라인 교육 이수 방법",
    description: "수급자격 신청 전 온라인 교육부터 이수해야 해요.",
  },
  {
    slug: "실업급여-직업훈련",
    title: "실업급여 받으면서 직업훈련 받는 방법",
    description: "고용센터 지정 직업훈련은 구직활동으로 인정돼요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="대학원생-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 대학원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대학원생 실업급여 받는 방법<br />
        RA·TA 수급 조건과 구직활동 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        RA 계약이 끝났는데 대학원 재학 중이라 실업급여를 못 받는다고 생각하셨죠?
        받을 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>의
        핵심 조건은 <strong>재취업 의사와 능력</strong>이에요.
        야간·주말 대학원이면 거의 문제없고, 전일제라도 구직활동을 입증하면 돼요.
        단, 대학원 수업 자체는 구직활동으로 인정되지 않아서 별도 기록을 남겨야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>RA·TA 계약 종료가 수급 조건이 되나요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        실업급여를 받으려면 고용보험 가입 이력이 있어야 해요.
        대학원에서 <strong>RA(연구조교), TA(교육조교), 계약직 연구원</strong> 등으로 일했다면
        고용보험에 가입됐을 가능성이 높죠.
        근로계약을 맺고 급여를 받았다면 가입 대상이에요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        지금 바로 가입 이력을 조회할 수 있어요.
      </p>
      <p style={body}>
        수급 자격의 핵심은 세 가지예요.
        퇴직 전 18개월 안에 피보험기간이 <strong>180일 이상</strong>이어야 하고,
        계약만료·연구과제 종료처럼 <strong>비자발적 퇴직</strong>이어야 하며,
        <strong>재취업 의사와 능력</strong>이 있어야 하죠.
        대학원에 다닌다는 사실만으로 취업 의사가 없다고 보지는 않아요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>① 고용보험 가입 이력 (RA·TA·계약직 등으로 근로)</p>
        <p style={{ margin: "0 0 4px" }}>② 비자발적 퇴직 (계약만료, 연구과제 종료 등)</p>
        <p style={{ margin: 0 }}>③ 피보험기간 180일 이상 + 재취업 의사</p>
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 조건을 충족할 가능성이 높아요. 고용센터에 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      <H2>야간 대학원과 전일제, 어떻게 다른가요?</H2>

      <p style={body}>
        <strong>야간·주말 대학원</strong>을 다니면 평일 낮에 근무할 수 있죠.
        고용센터도 이 점을 인정해요.
        낮에 일할 수 있는 상태이니 재취업 의사와 능력을 별도로 입증하지 않아도 되고,
        일반 수급자와 동일하게 처리돼요.
      </p>
      <p style={body}>
        <strong>전일제 대학원</strong>은 상황이 달라요.
        평일 낮 수업이 있어서 고용센터가 &quot;낮에 일할 수 있는 건지&quot; 확인하죠.
        입증 방법은 간단해요. 워크넷·채용사이트에서 <strong>실제로 입사지원한 기록</strong>을 남기거나
        면접에 참여한 기록을 보여주면 돼요.
      </p>
      <p style={body}>
        대학원 시간표를 고용센터에 가져가서 취업 가능한 시간대를 직접 보여주는 것도 방법이에요.
        &quot;오전에 수업이 없어서 근무 가능하다&quot;거나 &quot;재택근무 일자리를 찾고 있다&quot;고
        설명하면 되죠.{" "}
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>{" "}
        1350으로 사전 상담을 받으면 내 상황에 맞는 구체적인 안내를 받을 수 있어요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>야간·주말 대학원 → 별도 입증 없이 일반 수급자와 동일</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>전일제 대학원 → 입사지원·면접 기록으로 구직 의사 입증</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>휴학 상태 → 전일제든 야간이든 구직 의사 인정 가장 쉬움</p>
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>대학원 수업은 구직활동이 아니에요</H2>
      <SectionBadge>구직활동 체크리스트</SectionBadge>

      <p style={body}>
        많이 헷갈리는 부분이에요.
        대학원 수업을 듣는 건 <strong>구직활동으로 인정되지 않아요</strong>.
        학업이지 취업 준비가 아니니까요.
        실업인정을 받으려면 수업과 별도로 구직활동을 따로 해야 해요.
      </p>
      <p style={body}>
        인정되는 구직활동은 입사지원, 면접, 취업특강 참석, 고용센터 지정 직업훈련 등이에요.{" "}
        <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동 횟수</a>도
        반드시 채워야 하죠.
        1~2차 실업인정은 <strong>1회</strong>, 3차부터는 <strong>2회 이상</strong>이에요.
        온라인 입사지원으로도 인정되니까 10분이면 채울 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>수급액과 수급기간은 얼마나 되나요?</H2>

      <p style={body}>
        대학원생이라고 금액이 다르지 않아요.
        퇴직 전 평균임금의 <strong>60%</strong>를 받고,
        2026년 기준{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라
        1일 상한액은 <strong>68,100원</strong>, 하한액은 <strong>66,048원</strong>이에요.
        월 최대 약 204만 원이죠.
      </p>
      <p style={body}>
        수급기간은 나이와 피보험기간에 따라 120~270일이에요.
        대학원생처럼 비교적 젊고 피보험기간이 짧으면 보통 120일이에요.
        RA 급여가 낮았더라도 하한액이 보장되니 걱정 안 해도 돼요.
        정확한 금액은{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 모의계산기에서 확인해보세요.
      </p>
      <p style={body}>
        취업에 성공하면 실업급여는 즉시 종료돼요.
        단, 수급일수 절반 이상을 남기고 취업하면{" "}
        <a href="/w/실업급여-취업촉진수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>으로
        남은 수급일수의 절반을 일시금으로 받을 수 있죠.
        취업했다고 신고를 미루면 부정수급이 되니 바로 신고해야 해요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>1일 상한액 68,100원 / 하한액 66,048원 (2026년 기준)</p>
        <p style={{ margin: "0 0 4px" }}>평균임금의 60% · 수급기간 120~270일</p>
        <p style={{ margin: 0 }}>조기취업 시 조기재취업수당 신청 가능 (남은 수급일수 절반 일시금)</p>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 전일제 대학원의 수급자격 인정 여부는 고용센터 심사에 따라 다를 수 있으니, 신청 전 1350 상담을 먼저 받아보세요." />
    </ArticleLayout>
  );
}
