"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "한국 고용보험에 가입돼 있었어요 (또는 가입 이력이 있어요)" },
  { id: "c2", label: "해외 파견이에요 (현지 채용이 아님)" },
  { id: "c3", label: "퇴직 전 18개월 내 고용보험 180일 이상 가입돼 있어요" },
  { id: "c4", label: "귀국 후 12개월 이내에 신청할 수 있어요" },
];

const CHECKLIST = [
  "실업급여 수급 중 해외 출국 전, 실업인정일 일정 확인",
  "실업인정일에는 반드시 국내 체류 (해외 체류 시 불인정)",
  "해외 파견 퇴사 시 한국 고용보험 가입 여부 확인",
  "귀국 후 12개월 이내에 실업급여 신청",
  "해외취업 희망 시 K-Move, 월드잡플러스 별도 확인",
];

const FAQS = [
  {
    q: "실업급여 받으면서 짧은 해외여행 다녀와도 되나요?",
    a: "며칠 여행은 가능하죠. 단, 실업인정일에는 반드시 국내에 돌아와야 해요. 해외에서 온라인으로 실업인정 신청해도 체류 사실이 확인되면 불인정 처리돼요.",
  },
  {
    q: "해외 취업 준비 중인데 실업급여를 받을 수 있나요?",
    a: "안 돼요. 실업급여는 국내 재취업이 목표인 사람을 위한 제도예요. 해외 기업 지원, 해외 면접 같은 활동은 구직활동으로 인정되지 않죠.",
  },
  {
    q: "해외에서 원격근무하면 실업급여를 못 받나요?",
    a: "원격근무도 취업이에요. 장소가 어디든 근로소득이 발생하면 실업 상태가 아니니까 실업급여 수급 자격이 없죠.",
  },
  {
    q: "해외 파견 중 회사가 폐업하면 실업급여 신청이 가능한가요?",
    a: "한국 고용보험에 가입된 상태였다면 가능해요. 귀국 후 고용센터에 신청하면 되죠. 해외 현지 채용이었다면 한국 고용보험이 아니라서 대상이 아니에요.",
  },
  {
    q: "이민 준비 중인데 실업급여를 받을 수 있나요?",
    a: "어려워요. 실업급여는 국내 재취업 의사가 전제 조건이에요. 이민 목적이면 국내 재취업 의사가 없는 것으로 판단되니까 수급자격이 인정 안 될 가능성이 높죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 실업급여 수급자격 및 실업인정 요건", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 및 실업인정 안내", url: "https://www.ei.go.kr" },
      { label: "월드잡플러스 — 해외취업 지원사업 안내", url: "https://www.worldjob.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "외국인-실업급여",
    title: "외국인도 실업급여 받을 수 있을까?",
    description: "외국인 근로자의 고용보험 가입과 실업급여 수급 조건을 정리했어요.",
  },
  {
    slug: "실업급여-고용보험-미가입",
    title: "고용보험 미가입이면 실업급여를 못 받나요?",
    description: "사업주가 고용보험을 안 넣었을 때 대처 방법을 알려드려요.",
  },
  {
    slug: "실업급여-수급기간-몇개월-받나요",
    title: "실업급여 수급기간, 몇 개월 받나요?",
    description: "근속기간과 나이에 따라 달라지는 실업급여 수급일수를 정리했어요.",
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
          currentSlug="해외취업-실업급여"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 해외취업</p>

      {/* h1 (2줄) */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해외 근무 후 귀국했다면?<br />
        실업급여 자격 조건과 신청 방법
      </h1>

      {/* intro — 숫자 + 법령 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;해외에서 일하다 퇴직했는데 실업급여도 받을 수 있나요?&quot;<br />
        결론부터 말하면, <strong>한국 고용보험 가입 여부</strong>에 달렸어요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면
        실업급여는 <strong>국내 재취업</strong>을 목표로 하는 사람을 위한 제도예요.
        해외 파견(한국 본사 소속)이면 고용보험이 유지되니까 수급 가능성이 있지만,
        현지 채용이면 한국 고용보험 자체가 없어서 대상이 아니죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 해외취업과 실업급여의 관계 + GreenBox + SectionBadge + EligibilityChecker */}
      <H2>실업급여 자격 조건에 해외 근무가 포함되나요?</H2>
      <p style={body}>
        실업급여의 핵심 조건은 &quot;국내에서 재취업하려는 의사와 능력&quot;이에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 정한 이 조건에 해외 취업은 해당하지 않죠. 해외에서 일자리를 찾겠다는 건 국내 재취업 의사가 없다고 판단되기 때문이에요.
      </p>
      <p style={body}>
        해외 기업에 이력서를 보낸 것, 해외에서 면접을 본 것, 해외 취업 알선을 받은 것 — 이런 활동은 전부 구직활동으로 인정되지 않아요. 실업급여를 받으려면 <strong>국내 구직활동</strong>만 인정되니까요. 워크넷에 등록하고 국내 기업에 지원하는 방식이어야 해요.
      </p>
      <p style={body}>
        그렇다면 해외취업을 원하는 분은 어떤 지원을 받을 수 있을까요? 실업급여 대신 <strong>K-Move 스쿨</strong>, <strong>해외취업성공장려금</strong>(최대 400만 원) 같은 별도 지원사업이 있어요. <a href="https://www.worldjob.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>월드잡플러스</a>에서 세부 프로그램을 확인할 수 있죠.
      </p>

      <GreenBox title="해외취업과 실업급여 핵심 정리">
        해외 취업 목표 → 실업급여 수급자격 <strong>불인정</strong><br />
        해외 구직활동 → 구직활동으로 <strong>불인정</strong><br />
        해외취업 지원 → K-Move, 월드잡플러스 <strong>별도 사업</strong>
      </GreenBox>

      <SectionBadge>내 상황 확인해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="한국 고용보험 기반으로 실업급여를 신청할 수 있는 조건이에요. 귀국 후 고용센터에 문의하세요."
        partialMatchText="일부 조건이 충족되지 않았어요. 고용센터(1350)에 사전 상담을 받아보세요."
      />

      <Divider />

      {/* 섹션 2 — 해외 체류 중 실업인정 + BorderBox */}
      <H2>신청 방법에서 해외 체류 기간은 어떻게 처리되나요?</H2>
      <p style={body}>
        이미 실업급여를 수급하고 있는 상태에서 해외에 나가면, 그 기간 동안에는 <strong>실업인정이 안 돼요.</strong> 해외에 체류하면서 &quot;국내에서 구직활동했다&quot;고 주장할 수 없으니까요. 실업인정은 국내에서 실제로 구직활동을 했을 때만 인정되죠.
      </p>
      <p style={body}>
        특히 주의할 게 <strong>실업인정일</strong>이에요. 1~4주마다 돌아오는 실업인정일에는 반드시 국내에 체류해야 해요. 해외에서 온라인으로 실업인정 신청을 하더라도, 출입국 기록을 통해 해외 체류 사실이 확인되면 불인정 처리가 돼요.
      </p>
      <p style={body}>
        그렇다고 해외여행 자체가 금지되는 건 아니에요. 실업인정일 사이 기간에 짧게 다녀오는 건 가능하죠. 다만 그 여행 기간에는 실업인정이 안 되고, 실업인정일 전에 반드시 귀국해야 해요. 여행을 계획할 때 실업인정일 일정부터 확인하세요.
      </p>

      <BorderBox title="해외 체류와 실업인정">
        해외 체류 기간 → 실업인정 <strong>불가</strong><br />
        실업인정일 해외 체류 → <strong>불인정</strong> (출입국 기록 확인)<br />
        짧은 해외여행 → 가능, 단 실업인정일에는 <strong>국내 체류 필수</strong>
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 해외 파견 vs 현지 채용 + SectionBadge + Checklist */}
      <H2>해외 파견과 현지 채용의 자격 조건 차이</H2>
      <p style={body}>
        이건 <strong>한국 고용보험 가입 여부</strong>에 달렸어요. 한국 본사에서 해외 지사로 파견 나간 경우라면, 대부분 한국 고용보험에 계속 가입돼 있죠. 이 경우 퇴직 후 귀국해서 실업급여를 신청할 수 있어요. 가입기간 18개월 중 180일 이상 근무 조건만 충족하면 돼요.
      </p>
      <p style={body}>
        반면 <strong>해외 현지 채용</strong>은 상황이 달라요. 현지 법인에서 직접 채용한 거라면 한국 고용보험에 가입되지 않았을 가능성이 높죠. 한국 고용보험 가입 이력이 없으면 실업급여 수급자격이 없어요. 이전 한국 직장에서의 가입기간이 남아 있다면 그 기간을 활용할 수 있지만, 이직일로부터 18개월 이내여야 하니까 기간 제한에 걸릴 수 있어요.
      </p>
      <p style={body}>
        해외 파견 중 회사가 폐업한 경우도 마찬가지예요. 한국 고용보험에 가입된 상태였다면 비자발적 퇴직으로 처리되니까 실업급여 대상이 되죠. 귀국 후 가까운 고용센터에 방문하거나 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 신청하면 돼요.
      </p>

      <SectionBadge>해외 출국 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 수급기간과 귀국 타이밍 */}
      <H2>수급기간과 귀국 신청 방법의 타이밍</H2>
      <p style={body}>
        안 돼요. 실업급여 수급기간은 퇴직 후 <strong>12개월</strong>로 정해져 있고, 해외 체류를 이유로 연장되지 않아요. 해외에 6개월 머물렀다고 6개월 더 받을 수 있는 게 아니죠. 수급기간은 퇴직일 기준으로 1년이 되면 무조건 끝나요.
      </p>
      <p style={body}>
        그래서 수급기간(12개월) 안에 귀국하는 게 중요해요. 귀국 후 실업인정을 다시 받으면 남은 급여일수만큼 수급을 이어갈 수 있죠. 예를 들어 120일치 중 60일을 받은 상태에서 해외에 다녀왔다면, 수급기간 내에 돌아와서 나머지 60일치를 받을 수 있어요.
      </p>
      <p style={body}>
        반대로, 12개월이 지난 뒤에 귀국하면 남은 급여가 있어도 한 푼도 못 받아요. 이 점을 꼭 기억하세요. 해외 장기 체류 계획이 있다면, 실업급여 수급기간이 끝나는 날짜를 먼저 계산해보고 판단해야 해요.
      </p>

      <GreenBox title="수급기간 핵심">
        수급기간 = 퇴직일로부터 <strong>12개월</strong> (해외 체류로 연장 불가)<br />
        12개월 내 귀국 → 남은 급여일수 수급 가능<br />
        12개월 초과 → 남은 급여 <strong>전액 소멸</strong>
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 실전 행동 */}
      <H2>귀국 후 신청 방법을 미리 준비하세요</H2>
      <p style={body}>
        실업급여는 철저히 <strong>국내 재취업을 위한 제도</strong>예요. 해외 취업이 목표라면 처음부터 실업급여가 아닌 해외취업 지원사업을 알아보는 게 맞죠. K-Move 스쿨은 IT, 제조, 서비스 등 분야별 해외취업 교육을 제공하고, 해외취업성공장려금은 해외 취업에 성공하면 최대 400만 원까지 지원해요.
      </p>
      <p style={body}>
        이미 실업급여를 받고 있는데 해외에 나가야 한다면, 실업인정일 일정을 먼저 확인하세요. 실업인정일 전에 돌아올 수 있는 일정으로 계획을 짜야 해요. 장기 체류를 고려하고 있다면 남은 수급기간(퇴직일로부터 12개월)과 남은 급여일수를 꼼꼼히 따져봐야 하죠.
      </p>
      <p style={body}>
        해외 파견 근무를 하고 있다면, 지금 본인이 <strong>한국 고용보험에 가입돼 있는지</strong> 회사에 확인해두세요. 퇴직 후에야 &quot;고용보험에 안 들어있었네?&quot;라고 알게 되면 대응이 어렵잖아요. 미리 확인해두면 퇴직 후 바로 움직일 수 있어요.
      </p>

      <BorderBox title="해외 근무 후 실업급여 가능 여부">
        한국 본사 → 해외 파견 (고용보험 유지) → <strong>수급 가능</strong><br />
        해외 현지 채용 (고용보험 미가입) → <strong>수급 불가</strong><br />
        해외 파견 중 회사 폐업 → 귀국 후 <strong>수급 가능</strong>
      </BorderBox>

      <Divider />

      {/* FAQ (5개) */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        해외취업과 실업급여에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* References + Disclaimer */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 상황에 따라 수급 가능 여부가 다를 수 있으니, 고용센터(1350)에 사전 상담을 받아보세요." />
    </ArticleLayout>
  );
}
