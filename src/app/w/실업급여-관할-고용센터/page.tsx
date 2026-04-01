"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "주민등록상 거주지 주소를 확인했어요" },
  { id: "c2", label: "고용24(ei.go.kr) 회원가입을 완료했어요" },
  { id: "c3", label: "이직확인서가 고용24에 접수됐는지 확인했어요" },
  { id: "c4", label: "수급자격 신청자 온라인 교육을 이수했어요" },
];

const CHECKLIST = [
  "주민등록등본으로 현재 거주지 주소 정확히 확인하기",
  "고용24(ei.go.kr) 접속해서 고용센터 찾기 메뉴로 관할 센터 조회하기",
  "관할 고용센터 전화번호로 방문 전 필요 서류 사전 확인하기",
  "방문 당일 신분증, 통장 사본, 증명사진 1장 챙기기",
  "워크넷(work.go.kr)에 구직등록 미리 해두기",
];

const FAQS = [
  {
    q: "거주지랑 직장 소재지가 다르면 어디 고용센터에 가야 하나요?",
    a: "거주지 기준이에요. 주민등록상 주소지를 관할하는 고용센터에서 신청해야 하죠. 서울에서 일하다 퇴직했어도 인천에 살고 있으면 인천 관할 고용센터에 가야 해요.",
  },
  {
    q: "이사해서 주소가 바뀌면 고용센터도 바뀌나요?",
    a: "바뀌죠. 전입신고 후 새 주소지 관할 고용센터로 변경돼요. 수급 중이라면 기존 센터에 전출 사실을 알리고, 새 관할 센터로 이관 신청하세요. 안 하면 실업인정에 불이익이 생길 수 있어요.",
  },
  {
    q: "고용센터 방문 없이 온라인으로만 신청할 수 있나요?",
    a: "수급자격 신청은 고용24에서 온라인으로도 가능해요. 실업인정도 2회차부터 온라인으로 처리할 수 있죠. 다만 서류 보완이나 이의신청은 방문이 필요한 경우가 있어요.",
  },
  {
    q: "고용센터 방문할 때 뭘 가져가야 하나요?",
    a: "신분증, 통장 사본, 증명사진 1장이 기본이에요. 이직확인서는 회사가 고용24로 제출하니까 따로 가져갈 필요 없죠. 근로계약서나 급여명세서가 있으면 챙겨가면 좋아요.",
  },
  {
    q: "관할 고용센터가 너무 멀면 다른 센터에서 신청할 수 있나요?",
    a: "원칙적으로는 관할 센터에서 해야 해요. 거리가 너무 멀거나 교통편이 불편하면 1350에 사정을 설명하고 다른 센터 배정을 요청할 수 있죠. 온라인 신청을 활용하는 것도 방법이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 실업급여 수급자격 및 신청 절차", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 고용센터 찾기 및 실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 전국 고용센터 안내", url: "https://www.moel.go.kr/local/localList.do" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-고용센터",
    title: "실업급여 고용센터 방문 신청 절차",
    description: "고용센터에 직접 방문해서 실업급여를 신청하는 전체 절차를 정리했어요.",
  },
  {
    slug: "실업급여-신청-준비물-목록",
    title: "실업급여 신청 준비물 목록",
    description: "수급자격 신청 전 미리 챙겨야 할 서류와 준비물이에요.",
  },
  {
    slug: "실업급여-첫-입금일",
    title: "실업급여 첫 입금일 언제?",
    description: "신청 후 첫 실업급여가 통장에 들어오는 시점을 정리했어요.",
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
          currentSlug="실업급여-관할-고용센터"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 &middot; 고용보험 &middot; 고용센터</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        관할 고용센터, 어디로 가야 할까?<br />
        거주지 기준 조회법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;회사가 서울이었으니까 서울 고용센터에 가면 되겠지?&quot;
      </p>
      <p style={body}>
        아니에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라
        <strong> 주민등록상 거주지</strong>를 관할하는 고용센터에서만 신청이 가능해요.
        직장 소재지는 상관없죠. 서울에서 일하다 퇴직했어도 집이 인천이면 인천 관할 센터에 가야 해요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용24</a>에서 1분이면 내 관할을 찾을 수 있으니, 출발 전에 꼭 조회하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 관할 고용센터란 */}
      <H2>거주지 기준으로 관할이 정해지나요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        기준은 딱 하나, <strong>주민등록상 주소지</strong>예요. 실제로 사는 곳이 아니라 등본에 찍힌 주소를 따지죠. 원룸에서 혼자 살고 있어도 주민등록이 부모님 집으로 돼 있으면 부모님 집 관할 센터에 가야 해요. 번거로우면 주민등록 이전을 먼저 하는 게 낫죠.
      </p>
      <p style={body}>
        왜 이렇게 나눠놨을까요? 실업급여를 받는 동안에는 1~4주마다 <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업인정</a>을 받아야 해요. 한 사람의 서류를 한 센터에서 일관되게 처리해야 업무가 꼬이지 않죠. 수급자격 심사부터 실업인정까지 같은 담당자가 이어서 보는 구조라, 엉뚱한 센터에 가면 처음부터 다시 확인하는 비효율이 생겨요.
      </p>
      <p style={body}>
        수급 중에 이사하면 관할도 바뀌어요. 전입신고 후 기존 센터에 알리고, 새 관할 센터로 <strong>이관 신청</strong>을 해야 하죠. 이관 없이 이전 센터에 계속 다니면 실업인정이 꼬일 수 있으니, 이사하면 바로 처리하세요.
      </p>

      <GreenBox>
        주민등록상 주소지만 따져요: 실거주지나 직장 소재지는 무관<br />
        등본에 찍힌 주소가 기준이니, 주소 불일치 시 전입신고 먼저<br />
        수급 중 이사 → 전입신고 후 이관 신청 필수
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="고용센터 방문 준비가 다 됐어요. 관할 센터 확인 후 예약하고 방문하세요."
        partialMatchText="아직 준비가 덜 됐어요. 체크 안 된 항목부터 처리하세요."
      />

      <Divider />

      {/* 섹션 2: 관할 고용센터 조회 방법 */}
      <H2>내 관할 고용센터는 어떻게 조회하나요?</H2>

      <p style={body}>
        가장 빠른 건 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24(ei.go.kr)</a>예요. 로그인 없이도 바로 조회할 수 있죠. 메인 화면에서 &quot;고용센터 찾기&quot;를 누르고 주소를 입력하면 관할 센터 이름, 전화번호, 주소가 한 번에 뜨고, 지도로 위치까지 보여줘서 방문 경로를 미리 짤 수 있죠.
      </p>
      <p style={body}>
        인터넷이 불편하면 <strong>1350</strong>에 전화하세요. ARS에서 &quot;실업급여&quot;를 선택하면 상담원이 거주지에 맞는 센터를 바로 안내해줘요. 상담 시간은 평일 오전 9시부터 오후 6시까지이고, 점심시간(12~1시)에는 대기가 길어질 수 있으니 그 시간은 피하는 게 나아요.
      </p>
      <p style={body}>
        <a href="https://www.moel.go.kr/local/localList.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 홈페이지</a>에서도 전국 센터 목록을 시/군/구 단위로 조회할 수 있죠. 센터별 운영 시간, 전화번호, 교통편 정보까지 한눈에 나오죠. 고용24가 익숙하지 않은 분이라면 이쪽이 더 편할 거예요.
      </p>

      <BorderBox>
        고용24(ei.go.kr) → 고용센터 찾기 → 주소 입력 (가장 빠름)<br />
        전화 1350 → ARS &quot;실업급여&quot; 선택 → 상담원 안내<br />
        고용노동부 홈페이지 → 기관안내 → 전국 고용센터 목록
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 방문 준비와 체크리스트 */}
      <H2>고용센터 방문 전 거주지 기준 준비사항</H2>
      <SectionBadge>신청 전 체크리스트</SectionBadge>

      <p style={body}>
        관할 센터를 찾았다고 바로 달려가면 안 돼요. 먼저 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 이직확인서가 접수됐는지 조회하세요. 회사가 이직확인서를 제출하지 않으면 수급자격 신청 자체가 막히죠. 퇴직 후 10일이 지나도 안 냈으면 고용센터에 신고하면 직권으로 처리해줘요.
      </p>
      <p style={body}>
        이직확인서가 확인됐으면 <a href="/w/실업급여-온라인-교육" style={{ color: "#1D9E75", textDecoration: "underline" }}>수급자격 신청자 온라인 교육</a>을 들어야 해요. 고용24에서 약 1시간짜리 동영상을 이수하는 건데, 이걸 빠뜨리면 센터에 가서도 접수가 안 되죠. 수료증은 따로 출력할 필요 없이 시스템에 자동 반영돼요.
      </p>
      <p style={body}>
        방문 당일에는 <strong>신분증, 통장 사본, 증명사진 1장</strong>을 챙기세요. 워크넷(work.go.kr)에 구직등록도 미리 해두면 현장 대기 시간이 확 줄어들어요. 센터는 오전 9시에 열고 오후 6시에 닫는데, 오전 일찍 가거나 1350으로 사전 예약을 잡으면 기다리는 시간을 크게 아낄 수 있죠.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 방문 vs 온라인 */}
      <H2>방문 조회와 온라인 조회법의 차이</H2>

      <p style={body}>
        핵심 차이는 <strong>관할 제한</strong>이에요. 방문 신청은 반드시 거주지 관할 센터에 가야 하지만, 온라인은 고용24에서 어디서든 처리할 수 있죠. 집이든 카페든 장소 제약이 없어요. 수급자격 신청, 실업인정, 취업특강 수강까지 대부분 온라인으로 가능하고요.
      </p>
      <p style={body}>
        그러면 방문은 언제 필요할까요? 서류 보완이나 이의신청처럼 복잡한 업무는 직접 가는 편이 나아요. 고용센터에서는 실업급여 외에 직업상담, 취업알선, 내일배움카드 발급도 되니까, 방문할 일이 생기면 다른 업무도 같이 챙기세요.
      </p>
      <p style={body}>
        실업인정은 2회차부터 온라인으로 처리돼요. 1~4주마다 센터에 직접 갈 필요가 없다는 게 시간 절약 면에서 크죠. 고용24 앱에서 알림 설정을 해두면 실업인정일을 놓칠 걱정도 없어요.
      </p>

      <BorderBox>
        방문 → 관할 고용센터만 가능, 대기 시간 발생<br />
        온라인 → 장소 제한 없음, 고용24에서 바로 처리<br />
        실업인정 → 2회차부터 온라인 가능<br />
        서류 보완·이의신청 → 방문이 유리한 경우도 있음
      </BorderBox>

      <Divider />

      {/* 섹션 5: 흔한 실수 */}
      <H2>관할 조회 후 바로 해야 할 일</H2>

      <p style={body}>
        관할을 확인했으면 다음 행동이 빨라야 해요. 가장 먼저 할 일은 고용24에서 <strong>이직확인서 처리 여부</strong>를 확인하는 거예요. 회사가 아직 안 냈으면 인사팀에 연락하거나, 10일 지나도 미제출이면 고용센터에 신고하세요.
      </p>
      <p style={body}>
        이직확인서가 처리됐으면 <strong>수급자격 신청자 온라인 교육</strong>을 바로 들으세요. 약 1시간이면 끝나는데, 이걸 안 듣고 센터에 가면 접수가 안 돼요. 하루를 통째로 날리는 셈이죠. 교육은 집에서 편하게 들을 수 있으니 센터 가기 전에 꼭 이수하세요.
      </p>
      <p style={body}>
        가장 치명적인 실수는 <a href="/w/퇴사후-실업급여-신청-기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직 후 12개월 기한</a>을 넘기는 거예요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 퇴직일 다음 날부터 12개월 안에 수급자격 인정을 신청해야 해요. 이 기한이 지나면 조건을 다 갖춰도 받을 수 없죠. 퇴직하면 미루지 말고 바로 움직이세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        관할 고용센터에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용노동부 안내를 바탕으로 작성됐어요. 관할 고용센터는 주소에 따라 다르니, 고용24(ei.go.kr)에서 직접 확인하거나 1350에 문의하세요." />
    </ArticleLayout>
  );
}
