"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "취업 사실을 숨기고 실업급여를 받은 적이 있어요" },
  { id: "c2", label: "구직활동 실적을 부풀리거나 허위로 제출했어요" },
  { id: "c3", label: "사업주와 이직 사유를 조작한 적이 있어요" },
  { id: "c4", label: "소득이 발생했는데 실업인정일에 신고하지 않았어요" },
];

const CHECKLIST = [
  "적발 전이라면 고용24 또는 고용센터(1350)에 자진신고",
  "자진신고 시 추가 징수(최대 5배)를 면제받을 수 있음",
  "부정수급 금액은 전액 반환해야 함 (자진신고와 무관)",
  "형사처벌 면제는 별개 — 양형 참작은 가능",
  "법률 전문가 상담 (금액이 크거나 고의성이 명백한 경우)",
];

const FAQS = [
  {
    q: "구직활동 실적을 조금 부풀린 건데 형사처벌까지 받나요?",
    a: "모든 부정수급이 형사처벌로 이어지진 않아요. 고의성, 규모, 횟수를 종합적으로 판단하죠. 소액이고 초범이면 반환 + 추가 징수로 끝나는 경우가 많아요.",
  },
  {
    q: "자진신고하면 형사처벌도 면제되나요?",
    a: "추가 징수는 면제되지만, 형사처벌 면제와는 별개예요. 다만 자진신고 사실이 양형에 참작될 수 있죠. 금액이 크다면 법률 전문가와 상담하는 게 좋아요.",
  },
  {
    q: "사업주가 이직확인서를 허위로 써준 경우 누가 처벌받나요?",
    a: "수급자와 사업주 모두 처벌 대상이에요. 사업주도 최대 5배 추가 징수의 연대 책임을 지고, 형사처벌도 받을 수 있죠.",
  },
  {
    q: "부정수급 금액이 소액이면 괜찮나요?",
    a: "금액이 작아도 부정수급은 부정수급이에요. 반환 의무는 금액과 관계없이 발생하죠. 다만 고발 여부나 추가 징수 배수는 금액에 따라 달라질 수 있어요.",
  },
  {
    q: "부정수급이 적발되면 남은 실업급여는 어떻게 되나요?",
    a: "전액 중단돼요. 이미 받은 금액 반환 + 추가 징수에 더해 남은 급여도 받을 수 없죠. 손해가 매우 크니까 신고를 빠뜨리지 않는 게 중요해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제62조 — 반환명령 및 추가 징수", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제116조 — 벌칙 (5년 이하 징역/5천만원 이하 벌금)", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 부정수급 자진신고", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 부정수급 신고센터", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-받으면서-알바",
    title: "실업급여 받으면서 알바 60시간 기준",
    description: "알바한 사실을 신고하면 부정수급이 아니에요. 월 60시간 미만 기준과 신고 방법을 정리했죠.",
  },
  {
    slug: "실업급여-환수",
    title: "실업급여 환수 기준과 절차",
    description: "부정수급 적발 시 반환 금액 계산법과 추가 징수 기준을 정리했어요.",
  },
  {
    slug: "실업급여-구직활동-횟수",
    title: "실업급여 구직활동 인정 횟수",
    description: "차수별 필요한 구직활동 횟수와 인정되는 활동 종류를 확인하세요.",
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
          currentSlug="실업급여-부정수급"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 부정수급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 부정수급, 적발되면?<br />
        최대 5배 환수 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;구직활동 실적을 조금 부풀렸을 뿐인데, 설마 처벌까지 받나요?&rdquo;
      </p>
      <p style={body}>
        받을 수 있죠.
        실업급여 부정수급은 단순 행정 처분으로 끝나지 않아요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제116조</a>에 따라
        <strong>5년 이하 징역 또는 5천만원 이하 벌금</strong>까지 선고될 수 있죠.
        받은 돈을 돌려내고, <a href="/w/실업급여-환수" style={{ color: "#1D9E75", textDecoration: "underline" }}>추가징수</a>를 맞고, 남은 급여까지 전액 중단되죠.
      </p>
      <p style={body}>
        &ldquo;나만 안 걸리겠지&rdquo;라는 생각이 가장 위험해요.
        어떤 행위가 부정수급이고, 적발되면 어떻게 되는지 구체적으로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 부정수급이란 */}
      <H2>환수 기준에 해당하는 행위는 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제62조</a>가 말하는 부정수급은
        &ldquo;거짓이나 부정한 방법으로 실업급여를 받은 경우&rdquo;예요.
        가장 흔한 유형은 <strong>취업 사실 미신고</strong>죠.
        <a href="/w/실업급여-받으면서-알바" style={{ color: "#1D9E75", textDecoration: "underline" }}>알바</a>를 하면서 실업인정일에 &ldquo;일하지 않았다&rdquo;고 체크하는 순간 부정수급이 성립돼요.
      </p>
      <p style={body}>
        두 번째로 많은 유형은 <strong>구직활동 허위 신고</strong>예요.
        실제로 지원하지 않은 채용공고를 입사지원 실적으로 올리거나, 면접을 보지 않았는데 면접 확인서를 위조하는 경우가 해당되죠.
        요즘은 고용보험 시스템이 채용플랫폼 데이터와 자동 대조하기 때문에 적발이 빨라졌어요.
      </p>
      <p style={body}>
        가장 무거운 유형은 <strong>사업주와 공모</strong>하는 거예요.
        이직 사유를 &ldquo;권고사직&rdquo;으로 허위 기재하거나, 재직 중인데 퇴직한 것처럼 이직확인서를 발급받는 경우죠.
        이때는 수급자뿐 아니라 사업주도 함께 처벌 대상이 돼요.
        추가징수 배율도 단독 부정수급보다 훨씬 높아요.
      </p>

      <SectionBadge>혹시 해당되는 상황이 있나요?</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="여러 항목에 해당되네요. 적발 전이라면 자진신고를 강력히 권해요. 추가 징수를 면제받을 수 있어요."
        partialMatchText="하나라도 해당되면 부정수급이에요. 자진신고하면 추가 징수를 면제받을 수 있으니 고용센터(1350)에 먼저 상담하세요."
      />

      <Divider />

      {/* 섹션 2 — 처벌 수위 */}
      <H2>최대 5배 환수, 실제 처벌은 얼마나 되나요?</H2>
      <p style={body}>
        처벌은 세 단계로 올라가요.
        첫째, <strong>전액 반환</strong>이에요.
        부정하게 받은 실업급여를 원금 그대로 돌려줘야 하죠.
        자진신고를 하더라도 이 반환 의무는 사라지지 않아요.
      </p>
      <p style={body}>
        둘째, <strong>추가징수</strong>예요.
        반환에 더해 부정수급 금액의 최대 2배(단독)부터 최대 5배(사업주 공모)를 추가로 내야 하죠.
        100만원을 부정수급했다면 반환 100만원에 추가징수 최대 200만원, 총 300만원이에요.
        사업주와 짜고 했다면 100만원 + 500만원으로 600만원까지 갈 수 있고요.
      </p>
      <p style={body}>
        셋째, <strong>형사처벌</strong>이에요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제116조</a>에 따라
        <strong>5년 이하 징역 또는 5천만원 이하 벌금</strong>에 처할 수 있죠.
        모든 건이 형사 고발로 이어지진 않지만, 고의성·규모·반복 여부를 종합적으로 따져서 결정해요.
      </p>

      <BorderBox title="처벌 수위 단계별 정리">
        반환 명령 — 부정수급액 전액 (자진신고와 무관하게 반환)<br />
        추가징수 — 최대 2배(단독) / 최대 5배(사업주 공모)<br />
        형사처벌 — 5년 이하 징역 또는 5천만원 이하 벌금<br />
        남은 급여 — <strong>전액 중단</strong> (잔여 수급일수 소멸)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 적발 경로 */}
      <H2>환수 기준 적용을 위한 적발 경로</H2>
      <p style={body}>
        적발은 생각보다 쉬워요.
        가장 흔한 경로는 <strong>자동 데이터 연계</strong>예요.
        4대보험 자료, 국세청 소득 자료, 사업장 신고 자료가 고용보험 시스템과 실시간으로 연동되죠.
        하루짜리 알바라도 사업주가 일용직 신고를 하면 기록이 남아요.
      </p>
      <p style={body}>
        &ldquo;현금으로 받았으니 괜찮겠지&rdquo; — 이 생각이 제일 흔한 착각이에요.
        사업주가 비용 처리를 위해 지급 내역을 세무서에 신고하면 결국 드러나죠.
        배달앱이나 플랫폼 노동도 마찬가지예요.
        앱 운영사가 소득 신고를 하기 때문에 기록이 고스란히 남아요.
      </p>
      <p style={body}>
        <strong>제보</strong>로 적발되는 경우도 적지 않아요.
        동료, 지인, 회사 측의 신고가 계기가 되죠.
        고용노동부가 부정수급 전용 신고 채널을 운영하고 있어서 접근이 쉽고요.
        신고가 접수되면 고용센터가 사실 조사를 진행한 뒤 처분을 내려요.
      </p>

      <Divider />

      {/* 섹션 4 — 자진신고 */}
      <H2>자진신고 시 환수 기준 감면 여부</H2>
      <p style={body}>
        적발되기 전에 자진신고하면 <strong>추가징수를 면제</strong>받을 수 있죠.
        반환 의무는 남지만, 최대 5배까지 붙는 추가징수가 사라지는 거예요.
        100만원 부정수급이라면 반환 100만원만 내면 끝이죠.
        자진신고 없이 적발됐으면 최대 300~600만원이 될 수 있으니 차이가 엄청나요.
      </p>
      <p style={body}>
        자진신고는{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 하거나, 고용센터(1350)에 전화해서 할 수 있죠.
        부정수급 사실을 솔직하게 밝히고 반환 의사를 표시하면 돼요.
        반환 금액이 크면 분할납부도 가능하죠.
      </p>
      <p style={body}>
        다만 형사처벌 면제와는 별개라는 점을 알아두세요.
        자진신고가 양형에 참작될 수는 있지만, 금액이 크거나 고의성이 명백하면 형사고발로 이어질 수 있고요.
        부정수급 금액이 큰 경우라면 법률 전문가와 먼저 상담하는 게 안전하죠.
      </p>

      <SectionBadge>자진신고 시 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 — 예방 */}
      <H2>5배 환수를 피하려면 이렇게 하세요</H2>
      <p style={body}>
        핵심은 딱 하나예요.
        <strong>소득이 생기면 그 즉시 신고하는 거</strong>예요.
        알바, 프리랜서, 배달, 과외 등 형태에 관계없이 돈을 벌었으면 실업인정일에 정직하게 보고하면 돼요.
        신고만 하면 월 60시간 미만 단시간 취업은 문제없이 수급을 유지할 수 있죠.
      </p>
      <p style={body}>
        구직활동도 마찬가지예요.
        실제로 지원한 공고만 실적으로 올리고, 면접을 안 봤으면 면접 실적을 쓰지 않으면 돼요.
        <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>워크넷에서 입사지원</a>하면 자동 기록이 되니까 증빙이 어렵지도 않아요.
        굳이 허위 실적을 만들 필요가 전혀 없는 구조예요.
      </p>
      <p style={body}>
        부정수급으로 얻는 금액보다 잃는 금액이 압도적으로 크죠.
        알바 수입 50만원을 숨겼다가 적발되면 반환 + 추가징수 + 남은 급여 전액 중단이에요.
        수백만원이 날아가요.
        신고 한 번이면 아무 문제 없는데, 그 작은 절차 하나를 빠뜨려서 이런 불이익을 받는 건 정말 아까운 일이에요.
      </p>

      <GreenBox title="부정수급을 피하는 원칙">
        소득 발생 → 실업인정일에 즉시 신고<br />
        구직활동 → 실제로 한 활동만 제출<br />
        이직 사유 → 사실 그대로 기재<br />
        <strong>정직하게 신고하면 부정수급이 될 일이 없어요.</strong>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 부정수급에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 구체적인 처벌 수위는 개별 사건에 따라 달라지니, 법률 전문가와 상담하세요." />
    </ArticleLayout>
  );
}
