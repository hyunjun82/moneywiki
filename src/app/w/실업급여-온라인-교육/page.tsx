"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용24(ei.go.kr) 회원가입을 완료했어요" },
  { id: "c2", label: "전 직장에서 이직확인서가 접수된 상태예요" },
  { id: "c3", label: "아직 수급자격 신청자 교육을 이수하지 않았어요" },
  { id: "c4", label: "고용센터 방문 또는 온라인 신청을 앞두고 있어요" },
];

const CHECKLIST = [
  "고용24(ei.go.kr) 회원가입 및 공동인증서/간편인증 로그인",
  "[개인서비스] → [실업급여] → [수급자격 신청자 온라인 교육] 메뉴 이동",
  "교육 영상 약 1시간 전부 시청 (중간에 끊어도 진도 저장)",
  "이수 완료 확인 후 바로 수급자격 인정 신청 단계로 이동",
  "퇴직일 다음 날부터 12개월 이내에 신청 완료",
];

const FAQS = [
  {
    q: "온라인 교육 도중에 컴퓨터를 꺼도 이어서 들을 수 있나요?",
    a: "돼요. 고용24에서 수강 진도를 저장해 주기 때문에 다시 로그인하면 이어서 볼 수 있죠. 한 번에 끝내지 않아도 괜찮아요.",
  },
  {
    q: "교육을 안 들으면 실업급여 신청이 아예 안 되나요?",
    a: "맞아요. 수급자격 신청자 교육 이수가 실업급여 신청의 전제 조건이에요. 교육을 이수하지 않으면 수급자격 인정 신청 자체가 진행되지 않죠.",
  },
  {
    q: "고용센터 집체 교육은 예약 없이 가도 되나요?",
    a: "센터마다 다르지만 대부분 예약이 필요해요. 가까운 고용센터에 전화(1350)해서 집체 교육 일정을 먼저 확인하는 게 안전하죠.",
  },
  {
    q: "교육 이수증을 따로 출력해야 하나요?",
    a: "아니에요. 온라인 교육을 완료하면 고용24 시스템에서 자동으로 이수 처리가 되죠. 별도로 출력하거나 제출할 서류는 없어요.",
  },
  {
    q: "퇴직 전에 미리 교육을 들어도 되나요?",
    a: "퇴직 전에는 수강이 불가해요. 이직확인서가 처리된 이후에 교육 수강이 가능하죠. 퇴직 후 가능한 빨리 진행하는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 수급자격 신청자 교육 근거", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 수급자격 신청자 온라인 교육", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-신청-준비물-목록",
    title: "실업급여 신청 준비물 목록",
    description: "실업급여 신청할 때 필요한 서류와 준비물을 정리했어요.",
  },
  {
    slug: "실업급여-고용센터",
    title: "실업급여 고용센터 방문 안내",
    description: "고용센터에서 실업급여 관련 어떤 업무를 처리할 수 있는지 알려드려요.",
  },
  {
    slug: "실업급여-구직활동-횟수",
    title: "실업급여 구직활동 인정 횟수",
    description: "실업인정을 받으려면 구직활동을 몇 회 해야 하는지 정리했어요.",
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
          currentSlug="실업급여-온라인-교육"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 온라인교육</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 온라인 교육, 안 들으면?<br />
        이수 기준과 수강 순서
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 신청하려는데 교육을 먼저 들어야 한다는 말에 당황스러울 수 있어요.
        맞아요. <strong>수급자격 신청자 교육</strong>을 이수해야 실업급여 신청이 가능하죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라
        실업급여 제도의 취지와 수급자 의무를 안내받는 교육이에요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 약 1시간이면 끝나요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 교육을 들어야 하는 이유 */}
      <H2>이수 기준은 어떻게 되나요?</H2>
      <SectionBadge>필수 이수 사항</SectionBadge>

      <p style={body}>
        실업급여는 단순히 돈을 주는 제도가 아니에요. 재취업을 돕는 제도이기 때문에, 수급자에게도 <strong>구직활동 의무</strong>가 생기죠. 이 교육은 그 의무가 무엇인지, 부정수급하면 어떤 처벌을 받는지 미리 알려주는 과정이에요.
      </p>
      <p style={body}>
        교육에서는 실업급여 수급 조건, 금액 산정 방식, 실업인정 일정 같은 핵심 정보를 다뤄요. 듣고 나면 신청 절차가 훨씬 수월해지죠. "실업인정일에 뭘 해야 하는지", "구직활동은 몇 회 해야 하는지" 같은 실전 정보를 미리 파악할 수 있어요.
      </p>
      <p style={body}>
        교육 이수는 선택이 아니라 <strong>필수</strong>예요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 수급자격 인정 신청 전에 교육을 이수하도록 정해놨기 때문이죠. 이수하지 않으면 신청 자체가 진행되지 않아요.
      </p>

      <GreenBox title="교육에서 다루는 핵심 내용">
        - 실업급여 수급 조건과 금액 산정 방식<br />
        - 실업인정 일정과 구직활동 의무<br />
        - 취업 시 신고 의무와 소득 신고<br />
        - 부정수급 적발 시 환수 및 추가징수 안내
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="온라인 교육을 수강할 준비가 됐어요. 고용24에 접속해서 바로 시작하세요."
        partialMatchText="일부 준비가 안 됐어요. 체크가 안 된 항목을 먼저 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 온라인 교육 수강 방법 */}
      <H2>수강 순서는 어떻게 진행되나요?</H2>

      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>(ei.go.kr)에 접속해서 로그인하면 돼요. 공동인증서(구 공인인증서)나 간편인증으로 본인 확인 후 로그인하죠. 아직 회원이 아니라면 회원가입부터 진행해야 해요.
      </p>
      <p style={body}>
        로그인 후 <strong>[개인서비스] → [실업급여] → [수급자격 신청자 온라인 교육]</strong> 메뉴로 이동하세요. 교육 영상이 나오고, 재생하면 수강이 시작돼요. 총 약 1시간 분량이고, 중간에 끊어서 들어도 진도가 저장되죠.
      </p>
      <p style={body}>
        영상을 끝까지 시청하면 <strong>이수 처리가 자동으로</strong> 돼요. 별도로 이수증을 출력하거나 제출할 필요 없이, 고용24 시스템에서 바로 확인 가능하죠. 이수 완료 후 곧바로 수급자격 인정 신청 단계로 넘어갈 수 있어요.
      </p>

      <BorderBox title="온라인 교육 수강 경로">
        고용24 로그인 → [개인서비스] → [실업급여]<br />
        → [수급자격 신청자 온라인 교육] → 영상 시청<br />
        → 이수 완료 (약 1시간) → 수급자격 인정 신청
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 온라인이 어려울 때 */}
      <H2>온라인 수강이 어려울 때 대면 이수 방법</H2>
      <SectionBadge>대면 교육 안내</SectionBadge>

      <p style={body}>
        컴퓨터나 인터넷 환경이 여의치 않다면 <strong>가까운 고용센터에서 집체 교육</strong>을 받을 수 있어요. 고용센터에 직접 가서 같은 내용의 교육을 대면으로 수강하는 방식이죠. 강사가 직접 설명해주고, 궁금한 점은 바로 질문할 수 있고요.
      </p>
      <p style={body}>
        집체 교육은 센터마다 일정이 다르기 때문에 <strong>사전 예약이 필요</strong>해요. 고용센터 대표번호(1350)에 전화해서 교육 일정과 예약 방법을 확인하세요. 평일 오전이나 오후에 진행하는 경우가 많고, 1~2시간 정도 소요되죠.
      </p>
      <p style={body}>
        디지털 기기 사용이 익숙하지 않은 분이라면 집체 교육이 오히려 나을 수 있어요. 교육 담당자에게 신청 절차나 서류 관련 질문도 직접 할 수 있으니까요. 다만 가까운 센터까지의 교통편은 미리 확인해두는 게 좋죠.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 교육 후 실업급여 신청 절차 */}
      <H2>이수 완료 후 실업급여 신청 순서</H2>

      <p style={body}>
        교육을 마치면 바로 <strong>수급자격 인정 신청</strong> 단계로 넘어가요. 고용24에서 온라인으로 신청하거나, 고용센터에 방문해서 신청할 수 있죠. 이직확인서가 처리된 상태여야 하니까, 전 직장에서 이직확인서를 제출했는지 먼저 확인하세요.
      </p>
      <p style={body}>
        수급자격이 인정되면 <strong>1차 실업인정일</strong>이 지정돼요. 이후 1~4주 간격으로 실업인정을 받으면서 구직급여가 지급되는 구조예요. 실업인정일에는 구직활동 내역을 제출해야 하고, 온라인으로도 가능하죠.
      </p>
      <p style={body}>
        핵심은 <strong>퇴직일 다음 날부터 12개월 이내</strong>에 신청을 완료해야 한다는 거예요. 12개월이 지나면 남은 수급일수가 있어도 받을 수 없죠. 퇴직 후 가능한 빨리 교육을 듣고 신청까지 마치는 게 중요해요.
      </p>

      <GreenBox title="교육 후 실업급여 지급까지 흐름">
        교육 이수 → 수급자격 인정 신청 → 고용센터 심사<br />
        → 수급자격 인정 → 1차 실업인정일 지정<br />
        → 구직활동 보고 → 실업급여 입금
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 실전 팁 */}
      <H2>수강을 빠르게 끝내는 방법</H2>

      <p style={body}>
        퇴직하면 미루지 말고 <strong>당일 또는 다음 날 바로 교육</strong>을 수강하세요. 교육 시간은 약 1시간이고, 집에서 편하게 들을 수 있으니 부담이 없어요. 하루만 투자하면 실업급여 신청의 첫 관문을 통과하는 셈이죠.
      </p>
      <p style={body}>
        교육을 들으면서 <strong>메모하는 습관</strong>도 도움이 돼요. 실업인정 방법, 구직활동 인정 횟수, 부정수급 기준 같은 내용은 나중에 실제로 필요한 정보예요. 교육 영상에서 한 번 듣고 지나가면 나중에 헷갈릴 수 있죠.
      </p>
      <p style={body}>
        마지막으로, 교육 이수 후 <strong>수급자격 인정 신청까지 한 번에 끝내는 게 가장 효율적</strong>이에요. 고용24에서 교육 이수 확인 → 수급자격 인정 신청 → 실업인정일 확인까지 연달아 처리할 수 있으니까요. 한 번 로그인해서 쭉 진행하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 온라인 교육에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 안내를 바탕으로 작성됐어요. 교육 방식이나 절차는 변경될 수 있으니, 최신 정보는 고용24(ei.go.kr) 또는 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
