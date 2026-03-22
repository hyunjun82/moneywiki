"use client";

// Q1. 호텔 계절직이 끝나서 몇 달 무직인데, 실업급여를 받을 수 있는지 궁금한 상황
// Q2. 고용센터에 구직 신청해서 실업급여를 수급받는다
// Q3. 180일 가입 조건, 비자발적 퇴직 판단, 지급 기간·금액, 신청 절차·서류, 반복수급 주의
// Q4. EligibilityChecker로 자격 판단 + Steps로 신청 절차 + GreenBox로 금액 요약

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, EligibilityChecker, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "e1", label: "이직일 이전 18개월간 고용보험 가입 180일 이상" },
  { id: "e2", label: "계약 만료·경영상 해고 등 비자발적 퇴직" },
  { id: "e3", label: "근로 의사와 능력이 있고 구직 활동 가능" },
  { id: "e4", label: "고용센터에 구직 신청 후 재취업 활동 이행" },
];

const STEPS = [
  {
    title: "퇴직 서류부터 챙겨요",
    desc: "호텔에서 퇴직증명서, 고용보험 피보험자격 확인서를 받아요. 이직확인서는 회사가 고용센터에 직접 제출하지만, 10일 넘게 안 하면 고용센터에 신고하면 돼요.",
    tip: "이직확인서 미제출 시 고용센터(1350)에 신고 가능",
  },
  {
    title: "고용24에서 온라인 수급자격 신청",
    desc: "고용24(work24.go.kr)에 접속해서 수급자격 인정 신청을 해요. 신분증, 통장 사본, 증명사진 1장이 필요해요. 오프라인은 거주지 관할 고용센터에서 가능하고요.",
    tip: "퇴직 다음 날부터 12개월 이내에 신청해야 해요",
    link: { label: "고용24 바로가기", href: "https://www.work24.go.kr" },
  },
  {
    title: "워크넷 구직 등록 + 수급자격 교육 수강",
    desc: "워크넷에 구직 등록하고, 수급자격 인정 교육(온라인 가능)을 이수해요. 1~2시간짜리 영상 교육이에요.",
  },
  {
    title: "1차 실업 인정일에 고용센터 방문",
    desc: "실업 인정일(보통 2주 간격)에 맞춰 고용센터에 가요. 2026년부터 반복수급자는 매 회차 대면 출석이 필수예요. 구직 활동 증빙(면접 확인서, 입사지원 내역)을 지참해요.",
    tip: "2주마다 1회 실업 인정 → 빠지면 해당 기간 수급 중단",
  },
  {
    title: "실업급여 입금 확인",
    desc: "실업 인정 후 1~2일 내에 통장에 입금돼요. 첫 입금까지 약 2~3주 걸리고요.",
  },
];

const FAQS = [
  { q: "호텔 계절직 3개월만 일했는데 실업급여 받을 수 있나요?", a: "한 번 시즌으로는 180일 미달이에요. 여러 시즌의 고용보험 가입 기간을 합산할 수 있으니, 지난 18개월간 총 180일 이상인지 확인해보세요." },
  { q: "계약 갱신을 제안받았는데 거절하면 자발적 퇴직인가요?", a: "근로 조건이 이전보다 나빠진 갱신 제안은 거절해도 비자발적 퇴직으로 봐요. 같은 조건인데 본인이 거절하면 자발적이 될 수 있어요." },
  { q: "시즌 끝나고 다른 호텔에서 바로 일하면 실업급여가 끊기나요?", a: "새 직장에서 고용보험 가입되는 순간 수급이 중단돼요. 남은 일수는 소멸되고요." },
  { q: "2026년 실업급여 상한액은 얼마예요?", a: "1일 상한액 68,100원이에요. 월 최대 약 204만 3천원까지 받을 수 있고, 하한액은 1일 66,048원(최저임금의 80%)이에요." },
  { q: "고용보험 가입 여부는 어디서 확인하나요?", a: "고용보험 홈페이지(ei.go.kr) → 개인 서비스 → 피보험자격 이력 내역서에서 조회할 수 있어요." },
  { q: "퇴직 후 12개월이 지나면 아예 못 받나요?", a: "네. 수급 기한은 퇴직일 다음 날부터 12개월이에요. 지나면 남은 일수가 있어도 실업급여를 받을 수 없어요." },
];

const SOURCES = [
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용24", href: "https://www.work24.go.kr" },
  { name: "고용보험 모의계산", href: "https://eiac.ei.go.kr" },
];

const RELATED = [
  { slug: "실업급여-신청-절차", title: "실업급여 신청 절차", description: "온라인·오프라인 신청 방법과 필요 서류." },
  { slug: "비자발적-퇴직-기준", title: "비자발적 퇴직 기준", description: "어떤 퇴직이 실업급여 대상인지 판단 기준." },
  { slug: "실업급여-모의계산", title: "실업급여 모의계산", description: "나이·근속에 따른 예상 수급액 확인." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 실업급여 · 단기근로자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        호텔 계절직도 실업급여 받을 수 있을까?<br />
        자격 조건부터 신청 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        여름·겨울 시즌만 일하고 계약이 끝나면 수입이 뚝 끊기죠.
      </p>
      <p style={body}>
        계절직도 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>상 실업급여 대상이에요.
        계약 만료는 비자발적 퇴직에 해당하고, 180일 가입 조건만 채우면 1일 최대 68,100원씩 120~270일간 받을 수 있어요.
        2026년 기준 달라진 점까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 실업급여 대상인지 체크해봐요</H2>
      <p style={body}>
        계절직이라서 안 될 거라고 생각하는 분이 많은데, 핵심은 고용보험 가입 일수와 퇴직 사유예요. 4가지 조건을 모두 충족하면 돼요.
      </p>

      <EligibilityChecker items={ELIGIBILITY} allMatchText="실업급여 수급 요건을 충족해요" partialMatchText="충족하지 못한 조건을 확인해보세요" />

      <p style={body}>
        호텔 계절직은 보통 3~4개월씩 일해요. 한 시즌만으로는 180일이 안 되지만, 여름+겨울 두 시즌이면 6개월 넘게 채울 수 있죠.
        여러 호텔에서 일한 기간도 합산돼요. <a href="/w/실업급여-모의계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험 모의계산</a>에서 가입 일수를 미리 확인해보세요.
      </p>

      <BorderBox>
        <strong>계약 만료 = 비자발적 퇴직이에요</strong><br />
        시즌이 끝나서 회사가 계약을 종료하면, 본인이 그만둔 게 아니라 회사 결정이에요. 갱신 약속 후 회사가 거부한 경우도 비자발적 퇴직으로 봐요.
        단, 계약 기간 중 본인이 먼저 사직하면 자발적 퇴직이라 대상이 안 돼요.
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={8} href="/category/실업급여" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>실업급여 얼마나, 얼마 동안 받나요?</H2>
      <p style={body}>
        지급액은 퇴직 전 평균임금의 60%예요. 2026년 기준 1일 상한액은 68,100원, 하한액은 66,048원이에요.
      </p>

      <GreenBox>
        지급액: 퇴직 전 3개월 평균임금의 60%{"\n"}
        1일 상한: 68,100원 (월 최대 약 204만원){"\n"}
        1일 하한: 66,048원 (최저임금 × 80%){"\n"}
        지급 기간: 나이·가입 기간에 따라 120~270일
      </GreenBox>

      <p style={body}>
        예를 들어 월급 250만원이었다면 평균임금의 60%는 약 150만원이에요.
        50세 미만이고 가입 기간 1년 이상~3년 미만이면 150일간 받을 수 있죠.
      </p>

      <Divider />

      <H2>신청은 이 순서대로 하면 돼요</H2>
      <p style={body}>
        퇴직 다음 날부터 신청 가능하고, 12개월 이내에 꼭 해야 해요. 빠를수록 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>계절직이 자주 놓치는 함정 3가지</H2>
      <p style={body}>
        호텔 계절직 특성상 실수하기 쉬운 부분이 있어요.
      </p>

      <GreenBox>
        퇴직 후 12개월 넘기면 신청 불가 — 비수기에 쉬다가 놓치는 경우가 많아요{"\n"}
        고용센터 실업 인정일 빠지면 수급 중단 — 2주마다 한 번씩 반드시 방문{"\n"}
        2026년 반복수급자 관리 강화 — 전 회차 대면 출석 의무화
      </GreenBox>

      <p style={body}>
        특히 2026년부터 반복수급자는 실업 인정 전 회차에 대면 출석해야 해요.
        계절마다 수급하는 패턴이면 구직 활동을 더 적극적으로 증명해야 해요.
      </p>

      <Divider />

      <H2>신청할 때 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>실제 계절직 분들이 많이 궁금해하는 것만 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성했어요. 수급 요건·금액은 법 개정에 따라 변경될 수 있으니 고용센터(1350)에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
