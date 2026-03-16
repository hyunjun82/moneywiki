"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "address", label: "주민등록상 거주지 주소를 알고 있다" },
  { id: "confirm", label: "이직확인서가 발급 완료됐다 (또는 직접 지참 가능)" },
  { id: "education", label: "수급자격 신청자 온라인 교육을 이수했다" },
  { id: "docs", label: "신분증과 통장 사본을 준비했다" },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 수급자격 신청자 온라인 교육 이수",
  "고용24에서 구직등록 완료",
  "신분증 (주민등록증 또는 운전면허증)",
  "통장 사본 (실업급여 수령 계좌)",
  "이직확인서 (회사가 제출하지 않았으면 직접 지참)",
];

const FAQS = [
  {
    q: "아무 고용센터나 가면 실업급여 신청이 되나요?",
    a: "안 돼요. 주민등록상 주소지 기준으로 관할 고용센터가 정해져 있죠. 다른 센터에 가면 접수 자체가 안 되고 관할 센터로 다시 가라고 안내받게 돼요.",
  },
  {
    q: "고용센터 방문 예약 안 하면 어떻게 되나요?",
    a: "예약 없이 방문해도 상담은 받을 수 있죠. 다만 대기 시간이 1~2시간 이상 걸릴 수 있어요. 고용24에서 미리 예약하면 훨씬 빠르게 처리돼요.",
  },
  {
    q: "온라인 교육을 안 받고 고용센터에 가면요?",
    a: "수급자격 인정이 안 돼요. 온라인 교육 이수가 방문 전 필수 조건이라서, 교육부터 먼저 완료하고 가야 하죠. 약 1시간이면 끝나요.",
  },
  {
    q: "고용센터에서 당일에 실업급여가 나오나요?",
    a: "당일 지급은 아니에요. 수급자격 인정을 받은 뒤 실업인정일에 구직활동을 보고하면 그때 실업급여가 입금되죠. 첫 입금까지 보통 2~3주 걸려요.",
  },
  {
    q: "이사해서 주소가 바뀌면 관할 고용센터도 바뀌나요?",
    a: "네, 주민등록상 주소지 기준이라 이사하면 관할이 바뀌어요. 실업급여 수급 중에 이사하면 새 관할 센터로 변경 신청을 해야 하죠. 고용24에서 온라인으로 처리할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 실업급여 수급자격 요건", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 고용센터 찾기 및 방문 예약", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 고용센터 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-관할-고용센터",
    title: "실업급여 관할 고용센터 확인 방법",
    description: "주소지 기준으로 내 관할 고용센터를 정확히 찾는 방법이에요.",
  },
  {
    slug: "실업급여-신청-준비물-목록",
    title: "실업급여 신청 준비물 목록",
    description: "고용센터 방문 전 꼭 챙겨야 할 서류와 준비물 체크리스트예요.",
  },
  {
    slug: "실업급여-온라인-교육",
    title: "실업급여 온라인 교육 이수 방법",
    description: "수급자격 신청자 온라인 교육을 빠르게 끝내는 방법이에요.",
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
          currentSlug="실업급여-고용센터"
        />
      }
    >
      {/* ── 브레드크럼 + h1 + intro ── */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 고용센터</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 신청, 고용센터 어디로?<br />
        위치 조회와 방문 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여를 받으려면 고용센터에 직접 가야 하죠.<br />
        그런데 아무 고용센터나 가면 안 돼요. <strong>내 주소지 관할 고용센터</strong>에 가야 하죠.<br /><br />
        다른 곳에 가면 &ldquo;여기선 안 돼요, 관할 센터로 가세요&rdquo; 하고 돌려보내요.
        헛걸음하지 않게 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 미리 확인하고 가세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1 — 방문 전 체크 + 고용센터란 ── */}
      <H2>고용센터 위치 조회는 어떻게 하나요?</H2>
      <p style={body}>
        고용센터에 무작정 가면 헛걸음할 수 있어요. 관할 센터가 어디인지, 온라인 교육은 이수했는지, 서류는 챙겼는지를 미리 확인해야 하죠. 아래 네 가지를 체크하고 가면 당일에 수급자격 인정까지 끝낼 수 있어요.
      </p>
      <p style={body}>
        고용센터는 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 산하 기관이에요. 전국에 약 130개가 운영되고 있죠. 실업급여 신청, 취업 알선, 직업훈련 안내 등 고용 관련 업무를 한곳에서 처리해요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 수급자격 인정 신청을 하면, 담당자가 이직 사유를 확인하고 자격 여부를 심사해요. 보통 30분에서 1시간 정도 걸리죠.
      </p>

      <SectionBadge>방문 전 준비 상태를 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="준비가 완료됐어요. 관할 고용센터에 방문하면 바로 수급자격 인정을 받을 수 있어요."
        partialMatchText="아직 준비가 부족해요. 미완료 항목을 먼저 처리하고 방문하세요."
      />

      <GreenBox title="고용24에서 관할 센터 찾는 순서">
        1. 고용24(ei.go.kr) 접속<br />
        2. 메뉴에서 &lsquo;고용센터 찾기&rsquo; 클릭<br />
        3. 주소 또는 지역명 입력<br />
        4. 관할 고용센터 확인 (전화번호, 주소, 약도 표시)
      </GreenBox>

      <Divider />

      {/* ── 섹션 2 — 방문 준비물 + BorderBox ── */}
      <H2>방문 전에 뭘 준비해야 하나요?</H2>
      <p style={body}>
        고용센터에 무작정 가면 안 돼요. <strong>온라인 교육</strong>을 먼저 이수해야 수급자격 인정 신청이 가능하죠. 고용24에서 &lsquo;수급자격 신청자 온라인 교육&rsquo;을 검색하면 바로 수강할 수 있어요. 약 1시간이면 끝나요.
      </p>
      <p style={body}>
        교육을 안 받고 가면 그날 수급자격 인정을 못 받아요. 집에서 교육부터 듣고 오라는 안내를 받게 되죠. 왕복 교통비에 시간까지 이중으로 낭비되니까 꼭 미리 해두세요.
      </p>
      <p style={body}>
        교육 이수 외에 <strong>구직등록</strong>도 고용24에서 미리 해두면 좋아요. 고용센터 방문 시 절차가 훨씬 빨라지죠. 구직등록은 5분이면 충분해요.
      </p>

      <BorderBox title="방문 전 필수 준비물">
        신분증 (주민등록증 또는 운전면허증)<br />
        통장 사본 (실업급여 수령 계좌)<br />
        이직확인서 (회사 미제출 시 직접 지참)<br />
        온라인 교육 이수 완료 (고용24)<br />
        구직등록 완료 (고용24)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3 — 영업시간과 예약 + 체크리스트 ── */}
      <H2>고용센터 방문 시간과 예약 방법</H2>
      <p style={body}>
        고용센터 영업시간은 <strong>평일 오전 9시부터 오후 6시</strong>예요. 주말과 공휴일은 쉬죠. 점심시간(12시~1시)에는 상담이 어려울 수 있으니 피하는 게 좋아요.
      </p>
      <p style={body}>
        오전 일찍 가면 대기 시간이 짧아요. 오후에는 사람이 몰리기 때문에 1~2시간 기다릴 수도 있죠. 시간 여유가 되면 오전 9시~10시 사이에 방문하는 게 가장 효율적이에요.
      </p>
      <p style={body}>
        고용24에서 <strong>방문 예약</strong>도 할 수 있어요. 원하는 날짜와 시간대를 선택하면 되죠. 예약하면 대기 없이 바로 상담을 받을 수 있으니, 가능하면 예약하고 가세요. 고용센터 대표번호 <strong>1350</strong>에 전화해서 관할 센터를 물어볼 수도 있어요.
      </p>

      <SectionBadge>방문 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4 — 고용센터에서 하는 일 ── */}
      <H2>방문 후 진행되는 절차</H2>
      <p style={body}>
        고용센터에 도착하면 먼저 번호표를 뽑고 대기해요. 순서가 되면 담당자가 <strong>이직 사유를 확인</strong>하고 수급자격이 되는지 심사하죠. 신분증과 서류를 제출하면 이직확인서 내용과 대조해서 검토해요.
      </p>
      <p style={body}>
        수급자격이 인정되면 앞으로의 <strong>실업인정 일정</strong>을 안내받아요. 실업인정일에 구직활동을 보고해야 실업급여가 입금되는 구조이죠. 첫 입금까지는 보통 2~3주 정도 걸려요.
      </p>
      <p style={body}>
        심사 결과 수급자격이 불인정될 수도 있어요. 이 경우 <strong>60일 이내에 이의신청</strong>이 가능하죠. 추가 증빙자료를 첨부해서 재심사를 요청할 수 있어요. 궁금한 점은 현장에서 담당자에게 바로 질문하는 게 가장 정확해요.
      </p>

      <GreenBox title="방문 시간 꿀팁">
        오전 9시~10시 방문 → 대기 시간 최소<br />
        고용24에서 사전 예약 → 대기 없이 바로 상담<br />
        점심시간(12~1시) → 상담 불가, 피할 것
      </GreenBox>

      <Divider />

      {/* ── 섹션 5 — 수급자격 인정 후 ── */}
      <H2>수급자격 인정 후 바로 해야 할 일</H2>
      <p style={body}>
        수급자격이 인정되면 7일간의 대기기간이 시작돼요. 이 기간에는 실업급여가 지급되지 않죠. 대기기간이 끝나면 첫 번째 실업인정일이 잡히고, 그날 구직활동을 보고하면 실업급여가 입금돼요.
      </p>
      <p style={body}>
        실업인정은 보통 1~4주 간격으로 진행돼요. 온라인(고용24)으로도 할 수 있고, 고용센터에 직접 방문해서 할 수도 있죠. 매번 지정된 날짜에 구직활동 내용을 보고해야 해요. 빠뜨리면 그 기간의 실업급여가 나오지 않으니 일정을 잘 챙기세요.
      </p>
      <p style={body}>
        구직활동으로 인정되는 건 입사 지원, 면접, 직업훈련, 고용센터 상담 등이에요. 단순히 구인 사이트를 둘러본 것만으로는 인정이 안 되죠. 실업인정 기준이 궁금하면 고용센터 담당자에게 첫 방문 때 자세히 물어보는 게 좋아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        고용센터 방문과 관련해서 실제로 많이 궁금해하는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 안내를 바탕으로 작성됐어요. 고용센터 운영시간이나 예약 방식은 지역별로 다를 수 있으니, 방문 전 고용24(ei.go.kr) 또는 1350에서 확인하세요." />
    </ArticleLayout>
  );
}
