"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "월 근로시간이 60시간(주 15시간) 미만이에요" },
  { id: "c2", label: "계약기간이 3개월 미만이거나 일용직이에요" },
  { id: "c3", label: "알바한 사실을 실업인정일에 신고할 거예요" },
];

const CHECKLIST = [
  "알바 시작 전 월 근로시간 60시간 미만인지 확인",
  "계약기간 3개월 미만 또는 일용직인지 확인",
  "알바한 날짜·시간·수입 금액을 매일 기록",
  "실업인정일에 고용24 또는 고용센터 방문하여 근로내역 신고",
  "배달앱·플랫폼 노동도 소득이면 반드시 신고",
];

const FAQS = [
  {
    q: "알바하면 실업급여가 줄어드나요?",
    a: "줄어드는 게 아니에요. 알바한 날은 실업급여가 지급되지 않고 뒤로 밀리는 구조예요. 총 받는 금액은 변하지 않죠. 지급이 연기될 뿐이에요.",
  },
  {
    q: "배달앱이나 대리운전도 신고해야 하나요?",
    a: "네, 전부 신고 대상이에요. 소득이 발생하면 형태와 관계없이 실업인정일에 신고해야 하죠. 앱으로 일한 시간도 월 60시간에 합산돼요.",
  },
  {
    q: "가족 가게에서 무급으로 도왔는데 신고해야 하나요?",
    a: "보수를 안 받았으면 신고 대상이 아니에요. 다만 4대보험에 가입되어 있거나 급여가 지급된 기록이 있으면 신고해야 하죠.",
  },
  {
    q: "알바 미신고로 적발되면 어떻게 되나요?",
    a: "부정수급으로 처리돼요. 이미 받은 실업급여 전액 반환 + 최대 5배 추가 징수를 당할 수 있죠. 남은 급여도 전액 중단돼요.",
  },
  {
    q: "주 15시간을 살짝 넘겼는데 어떡하죠?",
    a: "60시간 이상이면 취업으로 간주돼서 수급이 중단돼요. 다만 남은 소정급여일수가 남아있으면 알바 종료 후 다시 신청할 수 있죠. 고용센터(1350)에 상담해보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 실업의 인정 및 취업 간주 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제62조 — 부정수급 제재", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 수급 중 취업활동 안내", url: "https://www.ei.go.kr" },
      { label: "고용센터 — 실업인정 신고 방법", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-부정수급",
    title: "실업급여 부정수급 처벌과 환수 기준",
    description: "미신고 수급 시 최대 5배 추가 징수돼요. 자진신고하면 감면받을 수 있죠.",
  },
  {
    slug: "단시간-근로자-실업급여",
    title: "단시간 근로자 실업급여 수급 조건",
    description: "주 15시간 미만이라도 3개월 이상 일했으면 실업급여를 받을 수 있어요.",
  },
  {
    slug: "실업급여-수급기간-몇개월-받나요",
    title: "실업급여 수급기간 몇 개월 받나요",
    description: "나이와 피보험기간에 따라 120~270일까지 달라져요. 내 수급기간을 확인하세요.",
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
          currentSlug="실업급여-받으면서-알바"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 아르바이트</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 중 알바하면 끊길까?<br />
        60시간 기준과 신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "실업급여 받는 중인데 카페 알바 제안이 왔어. 해도 되는 거야?"<br />
        조건만 맞으면 가능해요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 <strong>월 60시간 미만</strong>이고 계약기간 3개월 미만이면
        실업급여를 유지하면서 알바할 수 있죠. 핵심은 "해도 되느냐"가 아니라 <strong>"신고했느냐"</strong>예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 알바 가능 조건 */}
      <H2>실업급여 받으면서 알바, 언제 가능한가요?</H2>
      <p style={body}>
        세 가지 조건을 모두 충족해야 해요. 첫째, 월 근로시간이 <strong>60시간 미만</strong>(주 15시간 미만)이어야 해요. 둘째, 계약기간이 <strong>3개월 미만</strong>이어야 하죠. 셋째, 알바한 사실을 실업인정일에 <strong>반드시 신고</strong>해야 해요.
      </p>
      <p style={body}>
        쉽게 말하면, 단기간 소규모 알바는 괜찮지만 정기적인 근무는 안 되는 거예요. 카페 주말 알바, 일용직 노동, 배달앱 같은 단시간 일은 대부분 가능하죠. 다만 주 4일 이상 출근하는 편의점 알바처럼 시간이 길면 60시간을 넘길 수 있어요.
      </p>
      <p style={body}>
        여기서 놓치기 쉬운 포인트가 하나 있어요. 세 조건 중 <strong>하나라도 초과하면 취업으로 간주</strong>돼요. 월 50시간이어도 계약기간이 3개월 이상이면 취업이에요. 반대로 계약기간이 1개월이어도 월 60시간 이상이면 수급이 중단되죠.
      </p>

      <GreenBox title="알바 가능 3가지 조건">
        월 근로시간 60시간 미만 (주 15시간 미만)<br />
        계약기간 3개월 미만 또는 일용직<br />
        알바한 날 실업인정일에 신고 필수
      </GreenBox>

      <SectionBadge>내 알바, 가능한지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="3가지 다 해당돼요. 실업급여를 받으면서 알바할 수 있어요. 알바한 날은 반드시 신고하세요."
        partialMatchText="일부만 해당돼요. 조건을 초과하면 취업으로 간주될 수 있으니 고용센터(1350)에 먼저 상담하세요."
      />

      <Divider />

      {/* 섹션 2 — 60시간 기준 */}
      <H2>월 60시간 기준이 정확히 뭔가요?</H2>
      <p style={body}>
        월 60시간 미만은 <strong>주 15시간 미만</strong>으로 환산한 거예요. 주 5일 근무 기준으로 하루 3시간 미만이에요. 이 기준을 넘으면 "취업 상태"로 보고 실업급여 지급이 중단되죠.
      </p>
      <p style={body}>
        구체적인 숫자로 보면 차이가 확 느껴져요. 주 3일 × 4시간 = 주 12시간(월 48시간)이면 기준 이내예요. 주 4일 × 4시간 = 주 16시간(월 64시간)이면 기준 초과예요. 딱 하루 차이로 결과가 완전히 달라지죠.
      </p>
      <p style={body}>
        배달앱, 대리운전, 플랫폼 노동도 근로시간에 포함돼요. 앱으로 일한 시간도 합산해서 월 60시간을 넘지 않도록 관리해야 해요. 여러 알바를 동시에 하면 전부 합산이에요. A카페 주 8시간 + B배달 주 8시간 = 주 16시간(초과)이 되는 거죠.
      </p>

      <BorderBox title="시간 기준 한눈에 보기">
        주 3일 × 4시간 = 월 48시간 → <strong>가능</strong><br />
        주 4일 × 4시간 = 월 64시간 → <strong>초과 (수급 중단)</strong><br />
        주 2일 × 6시간 = 월 48시간 → <strong>가능</strong><br />
        주 3일 × 5시간 = 월 60시간 → <strong>초과 (60시간 "미만"이어야 함)</strong>
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 알바한 날의 급여 처리 */}
      <H2>알바한 날은 실업급여가 어떻게 되나요?</H2>
      <p style={body}>
        알바한 날은 실업급여가 지급되지 않고, 그만큼 <strong>뒤로 밀려요</strong>. 줄어드는 게 아니에요. 예를 들어 한 달 30일 중 10일 알바했다면, 10일분의 실업급여는 지급되지 않고 수급 종료일이 10일 뒤로 연장되는 구조예요.
      </p>
      <p style={body}>
        이게 중요한 이유가 있죠. 알바를 한다고 총 받는 실업급여 금액이 줄어들지 않아요. 단지 받는 시기가 늦춰질 뿐이에요. 소정급여일수 210일이면, 알바한 날과 관계없이 210일분의 실업급여를 전부 받게 돼요.
      </p>
      <p style={body}>
        다만 수급 기간에는 한도가 있어요. 대기기간 포함 수급 가능 기간이 정해져 있기 때문에, 알바를 너무 많이 해서 수급 기간이 크게 밀리면 일부를 못 받을 수도 있죠. 적당한 선에서 관리하는 게 좋아요.
      </p>

      <GreenBox title="알바 + 실업급여 구조 요약">
        알바 안 한 날 → 실업급여 정상 지급<br />
        알바한 날 → 지급 안 됨, 수급 종료일 뒤로 연장<br />
        총 수급액 → <strong>변하지 않음</strong> (지급 시기만 늦춰짐)
      </GreenBox>

      <Divider />

      {/* 섹션 4 — 신고 방법 */}
      <H2>알바 신고는 어떻게 하나요?</H2>
      <p style={body}>
        <strong>실업인정일</strong>에 해요. 2주에 한 번 고용센터에 출석하거나 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 실업인정을 받을 때, "지난 2주간 근로 여부"를 체크하는 항목이 있어요. 여기에 알바한 날짜, 근로시간, 수입 금액을 정확히 적으면 돼요.
      </p>
      <p style={body}>
        신고 대상은 <strong>소득이 발생하는 모든 활동</strong>이에요. 일용직, 아르바이트, 프리랜서, 배달앱, 대리운전, 과외 등 형태와 관계없이 돈을 벌었으면 신고해야 하죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는 이를 "취업 또는 자영업에 종사한 경우"로 규정하고 있어요.
      </p>
      <p style={body}>
        한 가지 더 알아둘 게 있죠. 가족 일을 도운 것도 보수를 받았으면 신고해야 해요. "가족이니까 괜찮겠지" 싶지만, 4대보험 신고가 되어 있으면 고용센터에서 확인이 돼요. 무보수 봉사활동은 신고 대상이 아니에요.
      </p>

      <SectionBadge>신고 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 — 미신고 시 처벌 */}
      <H2>신고 안 하면 어떻게 되나요?</H2>
      <p style={body}>
        <strong>부정수급으로 처벌받아요.</strong> 알바하고 신고하지 않으면 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제62조</a>에 따라 이미 받은 실업급여를 반환해야 하고, 추가로 <strong>최대 5배까지 추가 징수</strong>를 당할 수 있어요.
      </p>
      <p style={body}>
        부정수급 적발은 생각보다 쉽게 돼요. 4대보험 자료, 국세청 소득 자료, 사업장 신고 자료가 자동으로 연계되기 때문이에요. 하루 알바를 했어도 사업주가 일용직 신고를 하면 기록이 남죠. "현금으로 받았으니 괜찮겠지"라고 생각하는 경우가 많은데, 사업주가 비용 처리를 위해 지급 내역을 신고하면 결국 드러나요.
      </p>
      <p style={body}>
        부정수급이 확정되면 남은 실업급여도 전액 중단돼요. 알바 수입보다 잃는 실업급여가 훨씬 커요. 신고만 하면 아무 문제 없으니, 반드시 실업인정일에 정직하게 신고하세요. 이미 미신고 상태라면 자진신고하면 추가 징수를 감면받을 수 있죠.
      </p>

      <BorderBox title="부정수급 적발 경로">
        사업주 일용직 신고 → 고용보험 시스템 자동 대조<br />
        국세청 소득 자료 연계 → 미신고 소득 감지<br />
        제보 → 고용센터 조사<br />
        <strong>신고만 하면 부정수급이 아니에요.</strong>
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 수급 중 알바에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용24(ei.go.kr)나 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
