"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "신분증 원본(주민등록증·운전면허증·여권)을 준비했어요" },
  { id: "c2", label: "본인 명의 통장 사본(또는 계좌번호)을 준비했어요" },
  { id: "c3", label: "고용24에서 이직확인서 처리완료를 확인했어요" },
  { id: "c4", label: "고용24 온라인 교육(수급자격 사전 교육)을 이수했어요" },
];

const CHECKLIST = [
  "신분증 원본 (주민등록증, 운전면허증, 여권 중 하나)",
  "본인 명의 통장 사본 또는 계좌번호",
  "반명함판(3x4cm) 증명사진 1장",
  "워크넷 구직등록 완료 여부 확인",
  "고용24에서 이직확인서 처리 상태 확인",
  "고용24 온라인 교육 이수 완료",
];

const FAQS = [
  {
    q: "이직확인서를 제가 직접 준비해야 하나요?",
    a: "아니에요. 이직확인서는 회사가 퇴직 후 10일 이내에 고용센터로 제출하게 돼 있죠. 법적 의무라서 대부분의 회사가 기한 내에 제출해요.",
  },
  {
    q: "증명사진 없이 가면 신청이 안 되나요?",
    a: "수급자격증 발급에 사진이 필요해요. 반명함판(3x4cm) 1장을 미리 챙기는 게 좋죠. 고용센터 근처 사진관에서도 촬영이 가능하지만, 시간이 걸려요.",
  },
  {
    q: "고용센터에 꼭 직접 가야 하나요?",
    a: "첫 수급자격 신청은 관할 고용센터를 직접 방문해야 해요. 이후 실업인정은 고용24에서 온라인으로 할 수 있죠.",
  },
  {
    q: "일용직이었는데 추가로 필요한 서류가 있나요?",
    a: "일용근로내역서가 필요할 수 있는데, 고용센터에서 직접 조회가 가능해요. 건설일용직이면 퇴직공제부금 가입 확인서도 챙기세요.",
  },
  {
    q: "온라인 교육을 안 듣고 가면 어떻게 되나요?",
    a: "수급자격 신청이 안 돼요. 고용24에서 제공하는 수급자격 사전 교육(약 1시간)을 반드시 이수해야 하죠. 고용센터 방문 전에 미리 들어두세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 수급자격 신청 및 필요서류", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "워크넷 — 구직등록", url: "https://www.work.go.kr" },
      { label: "고용노동부 — 고용센터 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-고용센터",
    title: "실업급여 관할 고용센터 찾는 법",
    description: "내 주소지 기준 관할 고용센터 조회 방법을 정리했어요.",
  },
  {
    slug: "실업급여-온라인-교육",
    title: "실업급여 온라인 교육 수강 방법",
    description: "수급자격 신청 전 온라인 교육 이수 절차를 안내해요.",
  },
  {
    slug: "퇴사후-실업급여-신청-기간",
    title: "퇴사 후 실업급여 신청 기한",
    description: "퇴직 후 12개월 이내에 신청해야 하는 이유와 기한 계산법이에요.",
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
          currentSlug="실업급여-신청-준비물-목록"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 신청서류</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 신청, 뭘 챙겨야 할까?<br />
        필요 서류 체크리스트
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "실업급여 신청하러 가는데, 뭘 가져가야 하죠?"<br />
        핵심은 딱 세 가지예요. <strong>신분증, 통장 사본, 증명사진</strong>이죠.<br /><br />
        하나라도 빠뜨리면 고용센터를 다시 방문해야 해요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용보험법</a>에 따라
        이직확인서는 회사가 제출하고, 온라인 교육은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 미리 들어야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 필수 준비물 3가지 */}
      <H2>필수 서류는 몇 가지가 필요한가요?</H2>
      <p style={body}>
        첫 번째는 <strong>신분증 원본</strong>이에요. 주민등록증, 운전면허증, 여권 중 하나면 충분하죠. 사본은 안 되고 반드시 원본이어야 해요. 만료된 신분증도 인정이 안 되니 유효기간을 미리 확인하세요.
      </p>
      <p style={body}>
        두 번째는 <strong>본인 명의 통장 사본</strong>이에요. 실업급여가 이 계좌로 입금되기 때문에 타인 명의 통장은 사용할 수 없죠. 통장 첫 페이지를 복사해 가거나, 인터넷뱅킹 화면에서 계좌번호를 보여줘도 돼요.
      </p>
      <p style={body}>
        세 번째는 <strong>증명사진 1장</strong>이에요. 반명함판(3x4cm) 크기로, 수급자격증에 부착하는 용도죠. 최근 6개월 이내에 촬영한 사진이면 돼요. 고용센터 근처 사진관에서 당일 촬영도 가능하지만, 미리 준비하면 시간을 아낄 수 있어요.
      </p>

      <GreenBox title="필수 준비물 요약">
        1. 신분증 원본 (주민등록증·운전면허증·여권)<br />
        2. 본인 명의 통장 사본 (실업급여 입금 계좌)<br />
        3. 증명사진 1장 — 반명함판 3x4cm
      </GreenBox>

      <SectionBadge>출발 전 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="준비 완료! 고용센터에 방문해서 수급자격을 신청하세요."
        partialMatchText="아직 준비가 덜 됐어요. 빠진 항목을 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 이직확인서 */}
      <H2>이직확인서도 직접 챙겨야 하나요?</H2>
      <p style={body}>
        실업급여 신청에서 가장 헷갈리는 서류가 <strong>이직확인서</strong>예요. 결론부터 말하면, 본인이 준비하는 서류가 아니죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 회사가 퇴직 후 <strong>10일 이내</strong>에 고용센터로 제출해야 하는 법적 의무 서류예요.
      </p>
      <p style={body}>
        회사가 기한 내에 제출하지 않으면 과태료 처분을 받게 돼요. 그래서 대부분의 회사는 제때 제출하죠. 그래도 불안하면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 직접 확인할 수 있어요.
      </p>
      <p style={body}>
        확인 방법은 간단해요. 고용24 로그인 후 <strong>개인서비스 → 이직확인서 처리현황</strong>에서 "처리완료"로 나오면 회사가 제출을 마친 거예요. 아직 미처리 상태라면 회사 인사팀에 문의하거나, 고용센터(1350)에 신고할 수 있죠.
      </p>

      <BorderBox title="이직확인서 확인 경로">
        고용24(ei.go.kr) 로그인<br />
        → 개인서비스 → 이직확인서 처리현황<br />
        → "처리완료" 상태면 고용센터 방문 가능
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 미리 해두면 좋은 것 */}
      <H2>온라인으로 미리 준비할 서류 체크리스트</H2>
      <p style={body}>
        고용센터에 가기 전에 <strong>워크넷 구직등록</strong>을 미리 해두면 시간을 크게 줄일 수 있어요. <a href="https://www.work.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>워크넷(work.go.kr)</a>에서 희망 직종, 희망 급여, 경력 사항을 입력하면 구직등록이 완료되죠. 현장에서도 할 수 있지만, 대기 인원이 많으면 30분 이상 걸리기도 해요.
      </p>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24(ei.go.kr)</a>에서 <strong>수급자격 사전 교육</strong>도 반드시 이수해야 해요. 약 1시간 분량의 온라인 교육인데, 이걸 듣지 않으면 고용센터에서 수급자격 신청 자체가 안 되죠. 회원가입도 미리 해두면 이후 실업인정, 수급 내역 조회를 온라인으로 처리할 수 있어요.
      </p>
      <p style={body}>
        온라인 사전 준비만 잘 해도 고용센터 방문 시간이 절반 가까이 줄어들어요. 구직등록, 이직확인서 처리 여부, 온라인 교육 이수, 이 세 가지만 미리 확인하고 가세요.
      </p>

      <SectionBadge>출발 전 준비물 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 특수한 경우 추가 서류 */}
      <H2>고용 형태별 추가 필요 서류</H2>
      <p style={body}>
        <strong>일용직</strong>이었다면 일용근로내역서가 필요할 수 있어요. 다만 고용센터에서 직접 조회가 가능하니 별도로 준비하지 않아도 되죠. <strong>건설일용직</strong>이었다면 퇴직공제부금 가입 확인서를 함께 가져가면 처리가 빨라요.
      </p>
      <p style={body}>
        <strong>외국인 근로자</strong>의 경우 외국인등록증과 체류자격 관련 서류가 추가로 필요하죠. 체류 자격에 따라 수급 가능 여부가 달라지기 때문에, 방문 전에 고용센터(1350)로 미리 상담받는 게 좋아요.
      </p>
      <p style={body}>
        <strong>예술인이나 특수고용직</strong>은 고용보험 가입 확인서를 챙기세요. 2022년부터 예술인·특고도 고용보험 적용 대상이 됐지만, 가입 이력 확인이 필수죠. 고용24에서 본인의 피보험자격 이력을 조회할 수 있어요.
      </p>

      <BorderBox title="고용 형태별 추가 서류">
        일용직 → 일용근로내역서 (고용센터 조회 가능)<br />
        건설일용직 → 퇴직공제부금 가입 확인서<br />
        외국인 → 외국인등록증 + 체류자격 서류<br />
        예술인·특고 → 고용보험 가입 확인서
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 방문 시간 줄이는 팁 */}
      <H2>서류 체크리스트 완성 후 방문 시간 줄이기</H2>
      <p style={body}>
        고용센터는 <strong>월요일</strong>이 가장 붐벼요. 주말 사이에 퇴직한 사람들이 월요일에 몰려들기 때문이죠. 화요일부터 목요일 사이에 방문하면 상대적으로 한산해요. 금요일 오후도 비교적 여유로운 편이에요.
      </p>
      <p style={body}>
        시간대는 <strong>오전 9시 개장</strong>에 맞춰 가는 게 가장 빨라요. 오후에는 오전 방문자들이 밀려서 대기 시간이 길어지죠. 고용24 또는 고용센터 전화로 <strong>사전 예약</strong>을 하면 지정된 시간에 바로 상담을 받을 수 있어요.
      </p>
      <p style={body}>
        마지막으로, 앞에서 말한 워크넷 구직등록과 고용24 회원가입을 미리 해두면 현장 처리 시간이 크게 줄어들어요. 준비물을 빠짐없이 챙기고, 구직등록까지 마친 상태로 방문하면 1시간 안에 신청을 마칠 수 있죠.
      </p>

      <GreenBox title="방문 시간 줄이는 3가지">
        1. 화~목요일 오전 9시에 방문하세요<br />
        2. 고용24 또는 전화로 사전 예약하세요<br />
        3. 워크넷 구직등록 + 온라인 교육을 미리 완료하세요
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 신청 준비물에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 고용센터별로 안내가 다를 수 있으니, 방문 전 관할 고용센터(1350)에 확인하세요." />
    </ArticleLayout>
  );
}
