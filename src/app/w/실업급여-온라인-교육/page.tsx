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
      { label: "고용보험법: 수급자격 신청자 교육 근거", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 수급자격 신청자 온라인 교육", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 실업급여 안내", url: "https://www.moel.go.kr" },
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
        &quot;교육을 왜 들어야 하는 거예요? 그냥 신청하면 안 되나요?&quot;
      </p>
      <p style={body}>
        안 돼요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라
        <strong> 수급자격 신청자 교육</strong>을 먼저 이수해야 실업급여 신청이 가능해요.
        실업급여 제도의 취지, 구직활동 의무, 부정수급 주의사항을 안내받는 과정이죠.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용24</a>에서 온라인으로 약 1시간이면 끝나니까, 퇴직하면 바로 들으세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 교육을 들어야 하는 이유 */}
      <H2>이수 기준은 어떻게 되나요?</H2>
      <SectionBadge>필수 이수 사항</SectionBadge>

      <p style={body}>
        실업급여는 &quot;돈 주는 제도&quot;가 아니에요. 재취업을 돕는 제도이기 때문에 수급자에게도 <strong>구직활동 의무</strong>가 생기죠. 이 교육은 그 의무가 정확히 뭔지, 어기면 어떤 처벌을 받는지 미리 알려주는 과정이에요.
      </p>
      <p style={body}>
        교육에서 다루는 건 실업급여 수급 조건, 금액 산정 방식, 실업인정 일정 같은 핵심 정보예요. &quot;실업인정일에 뭘 해야 하는지&quot;, &quot;구직활동은 몇 회 해야 하는지&quot; 같은 실전적인 내용을 미리 파악할 수 있어서, 듣고 나면 절차가 훨씬 수월해지죠.
      </p>
      <p style={body}>
        이 교육은 선택이 아니라 <strong>법적 필수</strong>예요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 수급자격 인정 신청 전에 이수하도록 정해놨으니까요. 안 들으면 고용센터에서 접수 자체를 안 받아줘요.
      </p>

      <GreenBox>
        실업급여 수급 조건과 금액 산정 방식<br />
        실업인정 일정과 구직활동 횟수 의무<br />
        취업 시 신고 의무와 소득 신고 기준<br />
        부정수급 적발 시 환수 + 추가징수(최대 5배) 안내
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="온라인 교육을 수강할 준비가 됐어요. 고용24에 접속해서 바로 시작하세요."
        partialMatchText="일부 준비가 안 됐어요. 체크가 안 된 항목을 먼저 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 온라인 교육 수강 방법 */}
      <H2>수강 순서는 어떻게 진행되나요?</H2>

      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>(ei.go.kr)에 접속해서 로그인하는 게 첫 단계예요. 공동인증서(구 공인인증서)나 간편인증으로 본인 확인을 하죠. 회원이 아니라면 가입부터 해야 하는데, 5분이면 끝나요.
      </p>
      <p style={body}>
        로그인 후 <strong>[개인서비스] → [실업급여] → [수급자격 신청자 온라인 교육]</strong> 메뉴로 이동하세요. 영상을 재생하면 수강이 시작돼요. 총 약 1시간 분량이고, 중간에 끊어도 진도가 저장되니까 한 번에 못 듣더라도 괜찮아요.
      </p>
      <p style={body}>
        영상을 끝까지 보면 <strong>이수 처리가 자동으로</strong> 돼요. 이수증을 출력하거나 따로 제출할 게 없죠. 고용24 시스템에서 바로 확인 가능하고, 이수 완료 직후 수급자격 인정 신청 단계로 넘어갈 수 있죠.
      </p>

      <BorderBox>
        고용24 로그인 → [개인서비스] → [실업급여]<br />
        → [수급자격 신청자 온라인 교육] → 영상 시청 (약 1시간)<br />
        → 이수 자동 처리 → 바로 수급자격 인정 신청 가능
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 온라인이 어려울 때 */}
      <H2>온라인 수강이 어려울 때 대면 이수 방법</H2>
      <SectionBadge>대면 교육 안내</SectionBadge>

      <p style={body}>
        컴퓨터나 인터넷 환경이 어려운 분도 걱정하지 마세요. <strong>가까운 고용센터에서 집체 교육</strong>을 받으면 되죠. 같은 내용의 교육을 대면으로 수강하는 방식이고, 강사가 직접 설명해주니까 궁금한 건 바로 물어볼 수 있고요.
      </p>
      <p style={body}>
        센터마다 교육 일정이 다르기 때문에 <strong>사전 예약이 필수</strong>예요. 고용센터 대표번호(1350)에 전화해서 일정과 예약 방법을 알아보세요. 대부분 평일 오전이나 오후에 진행되고, 1~2시간 정도 걸리죠.
      </p>
      <p style={body}>
        디지털 기기가 익숙하지 않은 분이라면 집체 교육이 오히려 편하죠. 교육 끝나고 담당자에게 신청 절차나 서류 관련 질문을 바로 할 수 있으니까요. 센터까지 교통편만 미리 확인해두면 돼요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 교육 후 실업급여 신청 절차 */}
      <H2>이수 완료 후 실업급여 신청 순서</H2>

      <p style={body}>
        교육을 마쳤으면 바로 <strong>수급자격 인정 신청</strong>으로 넘어가세요. 고용24에서 온라인으로 신청하거나, 고용센터에 직접 방문해서 처리하면 돼요. 다만 이직확인서가 처리된 상태여야 하니까, 전 직장에서 제출했는지 먼저 조회해보세요.
      </p>
      <p style={body}>
        수급자격이 인정되면 <strong>1차 실업인정일</strong>이 잡혀요. 이후 1~4주 간격으로 실업인정을 받으면서 구직급여가 입금되는 구조이죠. 실업인정일에 <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동 내역</a>을 제출해야 하고, 2회차부터는 온라인으로도 처리 가능해요.
      </p>
      <p style={body}>
        핵심은 <a href="/w/퇴사후-실업급여-신청-기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직일 다음 날부터 12개월 이내</a>에 신청을 마쳐야 한다는 거예요. 12개월이 지나면 수급일수가 남아 있어도 받을 수 없죠. 교육을 미루면 그만큼 돈을 못 받는 기간이 길어지는 거니까, 퇴직 직후에 바로 시작하는 게 가장 유리해요.
      </p>

      <GreenBox>
        교육 이수 → 수급자격 인정 신청 → 고용센터 심사<br />
        → 수급자격 인정 + 7일 대기기간 → 1차 실업인정일 지정<br />
        → 구직활동 보고 → 실업급여 입금 (신청~첫 입금 약 2~3주)
      </GreenBox>

      <Divider />

      {/* 섹션 5: 실전 팁 */}
      <H2>수강을 빠르게 끝내는 방법</H2>

      <p style={body}>
        퇴직하면 <strong>당일 또는 다음 날 바로 교육</strong>을 수강하세요. 1시간이면 끝나고, 집에서 편하게 들을 수 있으니 부담이 없어요. 하루만 투자하면 실업급여 신청의 첫 관문을 넘기는 셈이죠.
      </p>
      <p style={body}>
        들으면서 <strong>메모해두면 나중에 도움이 돼요</strong>. <a href="/w/실업인정일-변경" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업인정</a> 방법, 구직활동 인정 횟수, <a href="/w/실업급여-부정수급" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정수급</a> 기준 같은 내용은 수급 기간 내내 필요한 정보이죠. 영상에서 한 번 듣고 흘려보내면 나중에 헷갈리는 경우가 많아요.
      </p>
      <p style={body}>
        가장 효율적인 건 교육 이수 후 <strong>수급자격 인정 신청까지 한 번에 끝내는 거</strong>예요. 고용24에서 교육 이수 확인 → 수급자격 인정 신청 → 실업인정일 확인까지 연달아 처리할 수 있으니까, 한 번 로그인해서 쭉 밀어붙이세요.
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
