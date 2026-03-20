"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

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
      { label: "고용보험법: 실업의 인정 및 취업 간주 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제62조: 부정수급 제재", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 수급 중 취업활동 안내", url: "https://www.ei.go.kr" },
      { label: "고용센터: 실업인정 신고 방법", url: "https://www.ei.go.kr" },
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
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-받으면서-알바"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 아르바이트</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받으면서 알바, 가능할까?<br />
        60시간 기준과 신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;실업급여 받는 중인데 카페 알바 제안이 왔어. 해도 되는 거야?&quot;
      </p>
      <p style={body}>
        해도 돼요, 조건만 맞으면요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 정해놓은 기준은 딱 두 가지예요: <strong>월 60시간 미만</strong>, 계약기간 <strong>3개월 미만</strong>.
        이 안에만 들어오면 실업급여를 유지하면서 알바할 수 있죠.
      </p>
      <p style={body}>
        그런데 진짜 문제는 &quot;해도 되느냐&quot;가 아니에요.
        &quot;신고했느냐&quot;가 핵심이에요.
        조건에 맞는 알바를 해놓고 신고를 안 하면, <a href="/w/실업급여-부정수급" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정수급</a>으로 전액 환수당하죠.
        지금부터 기준과 신고 방법을 정리해 드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 알바 가능 조건 */}
      <H2>60시간 기준, 정확히 어떤 조건인가요?</H2>
      <p style={body}>
        조건은 세 가지예요. 첫째, 한 달 동안 일하는 시간이 <strong>60시간을 넘지 않아야</strong> 해요. 주 15시간 미만이라고 생각하면 쉽죠. 둘째, 알바 계약기간이 <strong>3개월 미만</strong>이어야 하고요. 셋째, 알바한 날을 실업인정일에 <strong>빠짐없이 신고</strong>해야 해요.
      </p>
      <p style={body}>
        카페 주말 알바, 하루짜리 일용직, 배달앱처럼 짧게 뛰는 일은 대부분 이 범위 안에 들어와요. 반면 주 4일 이상 편의점에 출근하는 식이면 60시간을 넘기기 쉽죠. &quot;나는 적게 일하니까 괜찮겠지&quot; 하지 말고, 꼭 시간을 계산해 보세요.
      </p>
      <p style={body}>
        놓치기 쉬운 부분이 하나 남았어요. 세 조건 중 <strong>하나라도 초과하면 취업으로 간주</strong>돼요. 월 50시간이라도 계약기간이 3개월 이상이면 취업이에요. 거꾸로 계약기간이 1개월이라도 월 60시간을 넘기면 수급이 중단되죠. 모든 조건을 동시에 충족해야 안전해요.
      </p>

      <GreenBox>
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

      {/* 섹션 2: 60시간 기준 */}
      <H2>60시간을 넘기면 어떻게 되나요?</H2>
      <p style={body}>
        월 60시간은 주 15시간으로 환산한 수치예요. 주 5일 기준이면 하루 3시간 미만이죠. 이걸 넘기는 순간 고용보험 시스템에서 &quot;취업 상태&quot;로 잡히고, 실업급여 지급이 중단돼요. 한 시간 차이로 수백만 원이 왔다 갔다 하는 거예요.
      </p>
      <p style={body}>
        숫자로 비교하면 감이 바로 와요. 주 3일에 하루 4시간씩이면 월 48시간이라 기준 이내예요. 여기서 딱 하루만 더 나가면? 주 4일 × 4시간 = 월 64시간, 기준 초과죠. 하루 차이가 수급 여부를 갈라놓아요.
      </p>
      <p style={body}>
        배달앱, 대리운전, 플랫폼 노동 시간도 전부 합산이에요. A카페에서 주 8시간, B배달에서 주 8시간이면 합쳐서 주 16시간(초과)이 되죠. 여러 곳에서 조금씩 일하더라도, 전부 더해서 60시간 미만인지 반드시 체크하세요.
      </p>

      <BorderBox>
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

      {/* 섹션 3: 알바한 날의 급여 처리 */}
      <H2>알바한 날의 실업급여 지급 구조</H2>
      <p style={body}>
        &quot;알바하면 실업급여가 깎이나요?&quot; 이 질문이 가장 많아요. 깎이는 게 아니라, 알바한 날만큼 <strong>뒤로 밀리는</strong> 구조예요. 한 달 중 10일 알바했다면, 10일분 실업급여는 지급되지 않는 대신 수급 종료일이 10일 뒤로 늘어나요.
      </p>
      <p style={body}>
        그러니까 총 받는 금액 자체는 변하지 않아요. 소정급여일수가 210일이면, 알바를 하든 안 하든 210일분을 전부 받게 돼요. 달라지는 건 &quot;언제 다 받느냐&quot;뿐이에요. 알바한 만큼 완납 시점만 늦춰지는 거죠.
      </p>
      <p style={body}>
        한 가지 주의할 점이 남았어요. <a href="/w/퇴사후-실업급여-신청-기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 수급 가능 기간</a>(퇴직 후 12개월) 안에 소정급여일수를 소진해야 하거든요. 알바를 너무 많이 해서 수급이 계속 밀리면, 12개월이 지나 일부를 못 받는 상황이 생길 수 있죠. 적당한 선에서 관리하는 게 현명해요.
      </p>

      <GreenBox>
        알바 안 한 날 → 실업급여 정상 지급<br />
        알바한 날 → 지급 안 됨, 수급 종료일 뒤로 연장<br />
        총 수급액 → <strong>변하지 않음</strong> (지급 시기만 늦춰짐)
      </GreenBox>

      <Divider />

      {/* 섹션 4: 신고 방법 */}
      <H2>신고 방법과 신고 대상 정리</H2>
      <p style={body}>
        신고 타이밍은 <strong>실업인정일</strong>이에요. 2주에 한 번 고용센터에 출석하거나 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 실업인정을 받을 때, &quot;지난 2주간 근로 여부&quot;를 체크하는 란이 나와요. 거기에 알바한 날짜, 근로시간, 수입 금액을 정확히 기재하면 끝이에요.
      </p>
      <p style={body}>
        뭘 신고해야 하냐면, <strong>소득이 발생한 모든 활동</strong>이에요. 일용직이든, 배달앱이든, 대리운전이든, 과외든: 형태는 상관없죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은 &quot;취업 또는 자영업에 종사한 경우&quot;라고 넓게 규정하고 있어서, 현금으로 받았든 계좌로 받았든 다 포함돼요.
      </p>
      <p style={body}>
        의외로 빠뜨리기 쉬운 게 가족 가게 일이에요. &quot;가족이니까 괜찮겠지&quot; 싶지만, 보수를 받았거나 4대보험에 가입된 상태라면 고용센터 시스템에서 바로 확인이 되죠. 돈을 안 받고 순수하게 도운 봉사활동만 신고 대상에서 빠져요.
      </p>

      <SectionBadge>신고 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5: 미신고 시 처벌 */}
      <H2>미신고 시 부정수급 처벌, 이렇게 피하세요</H2>
      <p style={body}>
        알바하고 신고를 안 하면 <a href="/w/실업급여-환수" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정수급</a>이에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제62조</a>가 명확하게 정해놓은 규정이죠. 이미 받은 실업급여 전액을 반환해야 하고, 거기에 <strong>최대 5배 추가 징수</strong>까지 붙어요. 30만 원 알바비를 숨기다가 수백만 원을 토해내는 거예요.
      </p>
      <p style={body}>
        &quot;현금으로 받았으니 괜찮겠지&quot;라고 생각하는 분이 꽤 많아요. 그런데 사업주가 비용 처리를 위해 지급 내역을 국세청에 신고하면 바로 드러나죠. 4대보험 자료, 국세청 소득 자료, 사업장 신고 자료가 고용보험 시스템과 자동 연계되기 때문에, 하루 알바라도 기록이 남아요.
      </p>
      <p style={body}>
        부정수급이 확정되면 남은 실업급여도 전액 중단돼요. 알바 수입보다 잃는 금액이 훨씬 크죠. 신고만 제대로 하면 아무 문제 없는 일이니까, 실업인정일에 정직하게 적으세요. 혹시 이미 미신고 상태라면 자진신고를 통해 추가 징수를 감면받을 수 있죠.
      </p>

      <BorderBox>
        사업주 일용직 신고 → 고용보험 시스템 자동 대조<br />
        국세청 소득 자료 연계 → 미신고 소득 감지<br />
        제보 → 고용센터 조사<br />
        <strong>신고만 하면 부정수급이 아니에요.</strong>
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여를 받으면서 알바하는 분들이 고용센터에 실제로 가장 많이 물어보는 질문만 추렸어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용24(ei.go.kr)나 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
