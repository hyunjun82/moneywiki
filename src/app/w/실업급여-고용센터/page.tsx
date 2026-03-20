"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

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
      { label: "고용보험법: 실업급여 수급자격 요건", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 고용센터 찾기 및 방문 예약", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 고용센터 안내", url: "https://www.moel.go.kr" },
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
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
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
        &quot;고용센터가 어디 있죠? 아무 데나 가면 되나요?&quot;
      </p>
      <p style={body}>
        안 돼요. <strong>내 주소지 관할 고용센터</strong>에 가야 하죠.
        잘못 가면 &quot;여기선 안 됩니다&quot; 한 마디에 그냥 돌아와야 해요.
        전국에 약 130개 센터가 있고, <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 1분이면 내 관할을 찾을 수 있죠.
        헛걸음 한 번이면 반나절이 날아가니까, 출발 전에 꼭 조회하고 가세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 방문 전 체크 + 고용센터란 ── */}
      <H2>고용센터 위치 조회는 어떻게 하나요?</H2>
      <p style={body}>
        고용센터는 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 산하 기관이에요. 실업급여 신청 말고도 취업 알선, 직업훈련 안내 같은 고용 관련 업무를 한 곳에서 다 처리하죠. 전국에 약 130개가 운영되고 있으니, 어디에 살든 비교적 가까운 곳에서 이용할 수 있죠.
      </p>
      <p style={body}>
        관할 센터가 어디인지부터 찾아야 하는데, <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 메인 화면에서 &quot;고용센터 찾기&quot;에 주소를 넣으면 바로 나와요. 전화번호, 주소, 약도까지 한 번에 뜨죠. 인터넷이 불편하면 고용노동부 대표번호 <strong>1350</strong>에 전화해도 상담원이 안내해줘요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 수급자격 인정 신청을 하면, 담당자가 이직 사유를 확인하고 자격 여부를 심사해요. 보통 30분에서 1시간 정도 걸리죠. 아래 네 가지를 미리 체크하고 가면 당일에 수급자격 인정까지 끝낼 수 있죠.
      </p>

      <SectionBadge>방문 전 준비 상태를 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="준비가 완료됐어요. 관할 고용센터에 방문하면 바로 수급자격 인정을 받을 수 있어요."
        partialMatchText="아직 준비가 부족해요. 미완료 항목을 먼저 처리하고 방문하세요."
      />

      <GreenBox>
        고용24(ei.go.kr) 접속 → 메뉴에서 &lsquo;고용센터 찾기&rsquo; 클릭<br />
        주소 또는 지역명 입력 → 관할 고용센터 이름·전화번호·약도 확인<br />
        방문 예약도 같은 사이트에서 바로 가능
      </GreenBox>

      <Divider />

      {/* ── 섹션 2: 방문 준비물 + BorderBox ── */}
      <H2>방문 전에 뭘 준비해야 하나요?</H2>
      <p style={body}>
        제일 많이 하는 실수가 뭔지 아세요? <a href="/w/실업급여-온라인-교육" style={{ color: "#1D9E75", textDecoration: "underline" }}>온라인 교육</a>을 안 듣고 가는 거예요. <strong>수급자격 신청자 온라인 교육</strong>을 이수하지 않으면 고용센터에서 접수 자체를 안 받아줘요. &quot;집에서 교육부터 듣고 오세요&quot; 한 마디에 그대로 돌아와야 하죠.
      </p>
      <p style={body}>
        고용24에서 &lsquo;수급자격 신청자 온라인 교육&rsquo;을 검색하면 바로 수강 가능해요. 약 1시간이면 끝나고, 중간에 끊어도 진도가 저장되니 부담 없이 시작하세요. 이거 한 번 안 해서 반나절 날리는 분들이 진짜 많아요.
      </p>
      <p style={body}>
        온라인 교육 말고 <strong>구직등록</strong>도 미리 해두면 현장 대기 시간이 확 줄어들어요. 워크넷(work.go.kr)이나 고용24에서 5분이면 되는 일이죠. <a href="/w/실업급여-신청-준비물-목록" style={{ color: "#1D9E75", textDecoration: "underline" }}>신분증, 통장 사본</a>까지 챙기면 준비 끝이에요.
      </p>

      <BorderBox>
        신분증 원본 (주민등록증·운전면허증·여권 중 하나)<br />
        본인 명의 통장 사본 (실업급여 수령 계좌)<br />
        이직확인서 (회사가 미제출 시 직접 지참)<br />
        수급자격 신청자 온라인 교육 이수 완료<br />
        워크넷 또는 고용24에서 구직등록 완료
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3: 영업시간과 예약 + 체크리스트 ── */}
      <H2>고용센터 방문 시간과 예약 방법</H2>
      <p style={body}>
        고용센터 문 여는 시간은 <strong>평일 오전 9시</strong>, 닫는 시간은 <strong>오후 6시</strong>예요. 주말과 공휴일은 쉬죠. 점심시간(12시~1시)에는 상담이 거의 이뤄지지 않으니 이 시간대는 피하세요.
      </p>
      <p style={body}>
        오전 9시~10시 사이가 골든타임이에요. 오후에는 오전 방문자들이 밀려서 1~2시간 대기가 기본이죠. 월요일은 주말 사이 퇴직자들이 몰리니까 화~목요일이 한산한 편이에요.
      </p>
      <p style={body}>
        고용24에서 <strong>방문 예약</strong>을 잡으면 대기 없이 바로 상담을 받을 수 있죠. 원하는 날짜와 시간대를 선택하면 끝이죠. 예약 없이 가면 번호표 뽑고 기다려야 하니까, 가능하면 예약하고 가는 게 시간 절약에 훨씬 유리해요.
      </p>

      <SectionBadge>방문 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4: 고용센터에서 하는 일 ── */}
      <H2>방문 후 진행되는 절차</H2>
      <p style={body}>
        도착하면 번호표를 뽑고 대기해요. 순서가 되면 담당자가 <strong>이직 사유를 확인</strong>하고 수급자격이 되는지 심사하죠. 이직확인서와 제출한 서류를 대조하면서 퇴직 경위를 물어보는데, 솔직하게 답하면 돼요.
      </p>
      <p style={body}>
        수급자격이 인정되면 그 자리에서 <strong>실업인정 일정</strong>을 안내받게 돼요. 지정된 날짜에 구직활동을 보고해야 실업급여가 통장에 입금되는 구조이죠. 첫 입금까지 보통 2~3주 걸리니까 마음의 준비를 하세요.
      </p>
      <p style={body}>
        혹시 불인정 결정이 나오더라도 당황하지 마세요. <strong>60일 이내에 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청</a></strong>을 넣을 수 있으니까요. 추가 증빙 자료를 첨부해서 재심사를 요청하면 되죠. 현장에서 담당자에게 &quot;어떤 자료가 더 필요한지&quot; 바로 물어보는 게 가장 정확해요.
      </p>

      <GreenBox>
        번호표 뽑기 → 대기 → 담당자 면담(이직 사유 확인)<br />
        수급자격 인정 → 실업인정 일정 안내 → 첫 입금까지 2~3주<br />
        불인정 시 → 60일 이내 이의신청 가능
      </GreenBox>

      <Divider />

      {/* ── 섹션 5: 수급자격 인정 후 ── */}
      <H2>수급자격 인정 후 바로 해야 할 일</H2>
      <p style={body}>
        수급자격이 인정된 뒤 바로 돈이 들어오는 건 아니에요. <strong>7일간의 대기기간</strong>이 먼저 적용되죠. 이 기간은 어차피 기다려야 하니까, 그동안 구직활동 계획을 세워두면 시간 낭비가 줄어요.
      </p>
      <p style={body}>
        대기기간이 끝나면 첫 번째 실업인정일이 잡혀요. 이후 1~4주 간격으로 실업인정을 받으면서 구직급여가 통장에 입금되는 구조이죠. 고용24에서 온라인으로도 처리 가능하고, 고용센터에 직접 가서 해도 돼요. 실업인정일을 한 번이라도 빠뜨리면 그 기간 급여가 빠지니까 일정 관리가 핵심이에요.
      </p>
      <p style={body}>
        구직활동으로 인정되는 건 입사 지원, 면접, 직업훈련, 고용센터 상담 등이에요. 구인 사이트를 그냥 둘러본 것만으로는 인정이 안 되죠. 첫 방문 때 담당자에게 &quot;어떤 활동이 인정되는지&quot; 구체적으로 물어보면 나중에 헷갈리는 일이 없어요.
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
