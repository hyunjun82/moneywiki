"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현재 실업급여(구직급여)를 수급 중이에요" },
  { id: "c2", label: "국민내일배움카드를 발급받았어요 (또는 발급 예정)" },
  { id: "c3", label: "HRD-Net에서 훈련과정을 선정했어요" },
  { id: "c4", label: "고용센터에서 훈련 수강을 승인받았어요" },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 내일배움카드 발급 신청하기",
  "HRD-Net(hrd.go.kr)에서 원하는 훈련과정 검색 및 수강 신청",
  "훈련 시작 전 관할 고용센터에 훈련 수강 사실 반드시 알리기",
  "출석률 80% 이상 유지 (훈련장려금 + 실업급여 유지 조건)",
  "실업인정일에 훈련 출석 기록으로 구직활동 갈음 처리 확인",
];

const FAQS = [
  {
    q: "실업급여 받는 중에 아무 훈련이나 등록해도 되나요?",
    a: "아니에요. 고용노동부가 인정한 과정이어야 하죠. HRD-Net에 등록된 과정만 내일배움카드로 결제할 수 있고, 구직활동 면제도 이 과정에 한해 적용돼요.",
  },
  {
    q: "훈련 중에 실업급여가 줄어들거나 끊기나요?",
    a: "정상 출석하면 실업급여는 그대로 나와요. 오히려 출석률 80% 이상이면 훈련장려금(월 최대 11만6천원)까지 추가로 받을 수 있죠.",
  },
  {
    q: "실업급여 기간이 끝났는데 훈련이 안 끝났으면 어떻게 하죠?",
    a: "고용센터 소장이 지시한 직업훈련이라면 훈련연장급여를 받을 수 있어요. 훈련이 끝날 때까지 최대 2년간 실업급여가 연장되죠. 다만 본인이 임의로 선택한 과정은 대상이 아니에요.",
  },
  {
    q: "내일배움카드 한도를 다 쓰면 추가 지원이 되나요?",
    a: "기본 한도는 300~500만원이에요. 한도를 소진하면 추가 발급이 어렵지만, 국민취업지원제도 참여자 등 일부 대상은 한도 추가가 가능하죠. 고용센터에 확인해보세요.",
  },
  {
    q: "훈련을 중간에 포기하면 불이익이 있나요?",
    a: "네, 꽤 커요. 중도 포기하면 내일배움카드 사용에 불이익이 생기고, 이후 훈련과정 등록에도 제한이 걸려요. 수강료 자부담분을 환급받지 못할 수도 있으니, 시작했으면 끝까지 마무리하는 게 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 훈련연장급여 및 직업능력개발 지원", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령: 훈련연장급여 세부 요건", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 및 내일배움카드 안내", url: "https://www.ei.go.kr" },
      { label: "HRD-Net: 직업훈련 과정 검색", url: "https://www.hrd.go.kr" },
      { label: "고용노동부: 직업능력개발 정책 (상담 1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-직업능력개발수당",
    title: "직업능력개발수당 조건과 금액",
    description: "훈련비 외에 교통비·식비를 추가로 받을 수 있는 수당을 정리했어요.",
  },
  {
    slug: "실업급여-훈련연장급여",
    title: "훈련연장급여로 실업급여 기간 늘리기",
    description: "훈련이 안 끝났다면 최대 2년까지 급여 연장이 가능해요.",
  },
  {
    slug: "실업급여-온라인-교육",
    title: "실업급여 온라인 교육 이수 방법",
    description: "수급자격 신청 전 온라인 교육 이수 절차를 안내해요.",
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
          currentSlug="실업급여-직업훈련"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 직업훈련 · 내일배움카드</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받으면서 직업훈련?<br />
        내일배움카드 조건과 신청까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;실업급여 받는 동안 뭐라도 배우고 싶은데, 훈련비는 어떻게 해요?&quot;
      </p>
      <p style={body}>
        걱정 안 해도 돼요. <strong>실업급여와 직업훈련은 동시에 가능</strong>하죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는
        실업급여 수급자가 직업훈련을 받으면 훈련비를 별도 지원하고,
        훈련 기간에는 구직활동도 면제해줘요. 실업급여는 그대로 나오고요.
        내일배움카드 발급부터 훈련연장급여까지 단계별로 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 내일배움카드 */}
      <H2>내일배움카드로 훈련비를 얼마나 지원받을 수 있나요?</H2>
      <SectionBadge>훈련 자격 체크</SectionBadge>

      <p style={body}>
        <strong>내일배움카드</strong>는 고용노동부에서 발급하는 직업훈련비 지원 카드예요.
        카드 한 장으로 최대 300~500만원까지 훈련비를 지원받을 수 있죠.
        실업급여 수급자는 우선 발급 대상이라 신청하면 빠르게 발급돼요.
      </p>
      <p style={body}>
        지원 범위가 꽤 넓죠. IT(코딩, 웹개발, 데이터분석), 디자인, 회계, 요리, 뷰티, 물류, 기계 등 거의 모든 직업 분야를 다뤄요.
        국비 100% 지원 과정도 많고, 자부담이 붙더라도 대부분 10~20% 수준이에요.
      </p>
      <p style={body}>
        핵심이 하나 더 있죠. 내일배움카드로 훈련을 받으면 <strong>그 기간 동안 구직활동을 따로 안 해도 돼요</strong>.
        훈련 출석 자체가 구직활동으로 인정되니까, 입사지원이나 면접 없이도 실업인정이 되죠.
        실업급여를 유지하면서 실력까지 쌓을 수 있는 구조예요.
      </p>

      <GreenBox>
        지원 한도: 300~500만원 (5년간)<br />
        자부담: 과정에 따라 0~20%<br />
        훈련 분야: IT, 디자인, 회계, 요리, 기계 등<br />
        구직활동 면제: 훈련 출석 = 구직활동 인정
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="직업훈련 수강 준비가 완료됐어요. 출석률 80%만 유지하면 실업급여와 훈련장려금을 함께 받을 수 있어요."
        partialMatchText="일부 조건이 맞지 않아요. 내일배움카드 발급이나 고용센터 승인부터 진행하세요."
      />

      <Divider />

      {/* 섹션 2: 신청 방법과 절차 */}
      <H2>내일배움카드 신청 조건과 절차, 어떻게 되나요?</H2>

      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>(ei.go.kr)에서 온라인으로 신청할 수 있어요.
        실업급여 수급자격 인정을 받은 상태라면 별도 서류 없이 바로 신청이 가능하죠.
        카드 발급까지는 보통 1~2주 걸려요.
      </p>
      <p style={body}>
        카드를 받았으면 다음 단계는 훈련과정 선택이에요.
        <a href="https://www.hrd.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>HRD-Net</a>(hrd.go.kr)에서 지역별, 분야별로 훈련과정을 검색할 수 있죠.
        &quot;국비지원&quot;으로 필터를 걸면 자부담 없는 과정만 따로 볼 수 있어요.
      </p>
      <p style={body}>
        한 가지 꼭 기억할 게 있죠. 훈련을 시작하기 전에 <strong>관할 고용센터에 훈련 수강 사실을 알려야</strong> 해요.
        이걸 빠뜨리면 훈련 기간 중 구직활동 면제가 안 될 수 있어요.
        고용센터 방문이 어려우면 전화(1350)로도 가능하죠.
      </p>

      <BorderBox>
        고용24에서 내일배움카드 발급 신청 (1~2주)<br />
        HRD-Net에서 훈련과정 검색 및 수강 신청<br />
        관할 고용센터에 훈련 수강 사실 통보<br />
        훈련 시작, 출석률 80% 이상 유지
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 훈련연장급여 */}
      <H2>실업급여 수급 중 훈련연장급여 조건</H2>
      <SectionBadge>훈련연장급여 체크리스트</SectionBadge>

      <p style={body}>
        실업급여 수급 기간이 끝났는데 아직 훈련이 진행 중이라면 어떻게 해야 할까요?
        <strong><a href="/w/실업급여-훈련연장급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>훈련연장급여</a></strong>를 신청하면 돼요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 훈련이 끝날 때까지 최대 2년간 실업급여를 계속 받을 수 있죠.
      </p>
      <p style={body}>
        다만 조건이 하나 붙어요. <strong>고용센터 소장이 지시한 직업훈련</strong>이어야 한다는 거죠.
        본인이 임의로 선택한 과정은 훈련연장급여 대상이 아니에요.
        고용센터에서 &quot;이 훈련을 받으세요&quot;라고 지시한 과정에 한해서만 연장이 되죠.
      </p>
      <p style={body}>
        훈련연장급여 금액은 기존 실업급여와 동일해요.
        구직급여 일액의 100%가 그대로 지급되니까 금전적으로 불이익은 없죠.
        다만 훈련 출석률이 80% 미만이면 연장급여가 중단될 수 있으니 성실하게 참여해야 해요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 훈련 중 받을 수 있는 금액 */}
      <H2>내일배움카드 훈련 기간에 받을 수 있는 금액</H2>

      <p style={body}>
        직업훈련 기간에 받을 수 있는 지원금은 크게 세 가지예요.
        첫째 <strong>실업급여</strong>(또는 훈련연장급여)가 그대로 나오고, 둘째 <strong>내일배움카드</strong>로 훈련비 전액 또는 대부분이 지원되죠.
        셋째 출석률 80% 이상이면 <strong><a href="/w/실업급여-직업능력개발수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>훈련장려금</a></strong>(직업능력개발수당)으로 월 최대 11만6천원까지 추가 수령이 가능해요.
      </p>
      <p style={body}>
        세 가지 모두 중복 수령이 가능하죠.
        실업급여로 월 약 190만원(2026년 기준 하한액 기준)을 받으면서, 훈련비는 카드로 해결하고, 교통비와 식비는 훈련장려금으로 보전하는 구조예요.
        훈련을 받기로 했다면 세 가지를 빠짐없이 챙기는 게 중요하죠.
      </p>
      <p style={body}>
        훈련장려금을 받으려면 고용센터 &quot;지시 훈련&quot;이어야 해요.
        내일배움카드로 본인이 직접 선택한 훈련은 훈련장려금 대상이 아니에요.
        그래서 훈련과정을 정할 때 고용센터 담당자와 상의하는 게 유리하죠.
      </p>

      <GreenBox>
        실업급여: 퇴직 전 평균임금의 60% (변동 없음)<br />
        훈련비: 내일배움카드로 전액 또는 대부분 지원<br />
        훈련장려금: 출석률 80% 이상 시 월 최대 11만6천원
      </GreenBox>

      <Divider />

      {/* 섹션 5: 실전 전략 */}
      <H2>내일배움카드 신청부터 훈련까지 이렇게 활용하세요</H2>

      <p style={body}>
        실업급여를 받는 기간은 보통 120~270일이에요.
        이 시간을 어떻게 쓰느냐에 따라 재취업의 질이 완전히 달라지죠.
        가장 효율적인 방법은 <strong>3~6개월짜리 자격증 과정</strong>을 듣는 거예요.
        정보처리기사, 전산회계, 바리스타, 지게차 운전 등 취업에 바로 도움이 되는 자격증을 노려보세요.
      </p>
      <p style={body}>
        IT 분야를 노린다면 더 좋은 기회가 될 수 있죠.
        6개월짜리 국비지원 부트캠프가 많은데, 실업급여 수급자는 거의 0원에 수강할 수 있어요.
        웹개발, 데이터분석, 클라우드 엔지니어 등 채용 수요가 높은 분야라 훈련 후 취업 연계까지 되는 경우도 많죠.
      </p>
      <p style={body}>
        훈련과 구직을 병행하는 것도 방법이에요. 훈련 수강 자체가 구직활동으로 인정되지만, 훈련 후반부에는 실제 입사지원도 시작하는 게 좋죠.
        수료 직후 바로 취업하면 <a href="/w/실업급여-조기재취업수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>까지 챙길 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여와 직업훈련에 대해 실제로 많이 궁금해하는 내용을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 훈련연장급여 인정 여부와 내일배움카드 한도는 개인 상황에 따라 다르니, 고용센터(1350) 상담을 받아보세요." />
    </ArticleLayout>
  );
}
