"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 권고사직 통보를 받았어요" },
  { id: "c2", label: "이직확인서에 퇴직 사유가 '권고사직'으로 기재됐어요" },
  { id: "c3", label: "퇴직 전 18개월 중 고용보험 가입기간이 180일 이상이에요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능해요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 40, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

function getDays(age: number, years: number): number {
  if (age >= 50) {
    if (years < 1) return 120;
    if (years < 3) return 180;
    if (years < 5) return 210;
    if (years < 10) return 240;
    return 270;
  }
  if (years < 1) return 120;
  if (years < 3) return 150;
  if (years < 5) return 180;
  if (years < 10) return 210;
  return 240;
}

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.salary * 10000 * 0.6) / 30);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round((v.salary * 10000 * 0.6) / 30)));
      return daily * getDays(v.age, v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "이직확인서에 '권고사직'으로 기재되었는지 고용24에서 확인",
  "워크넷(www.work.go.kr)에서 구직등록 완료",
  "고용센터 방문 시 신분증, 통장 사본, 증명사진 1장 준비",
  "수급자격 인정 후 대기기간 7일 경과 확인",
  "실업인정일마다 구직활동 내역 신고",
];

const FAQS = [
  {
    q: "위로금 받아도 실업급여를 받을 수 있나요?",
    a: "받을 수 있죠. 퇴직위로금과 실업급여는 완전히 별개예요. 회사에서 위로금을 줬다고 해서 실업급여가 깎이거나 제한되지 않아요.",
  },
  {
    q: "이직확인서에 '자발적 퇴사'로 적혀 있으면 어떻게 하나요?",
    a: "고용센터에 이의신청을 하세요. 권고사직을 증명할 수 있는 문자, 이메일, 녹음 등의 증거를 제출하면 사실관계 확인 후 정정될 수 있죠.",
  },
  {
    q: "권고사직인데 사직서에 '일신상의 사유'로 적었으면요?",
    a: "불리할 수 있죠. 하지만 다른 증거(문자, 이메일, 면담 녹음 등)로 권고사직이었음을 입증하면 정당한 비자발적 퇴사로 인정받을 수 있고요.",
  },
  {
    q: "퇴직금과 실업급여 둘 다 받을 수 있나요?",
    a: "둘 다 받을 수 있죠. 퇴직금은 회사에서 지급하는 거고, 실업급여는 고용보험에서 나오는 거예요. 전혀 다른 제도이기 때문에 중복 수급이 아니에요.",
  },
  {
    q: "권고사직을 거부하면 어떻게 되나요?",
    a: "거부할 수 있어요. 권고사직은 말 그대로 '권유'니까요. 거부하면 회사는 정리해고나 통상해고를 해야 하는데, 정당한 사유 없이 해고하면 부당해고로 구제신청이 가능하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 실업급여 수급자격 및 이직 사유", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 및 이직확인서 조회", url: "https://www.ei.go.kr" },
      { label: "워크넷 — 구직등록", url: "https://www.work.go.kr" },
      { label: "고용노동부 — 고용센터 찾기", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "사업주-퇴직권유-실업급여",
    title: "사업주 퇴직권유와 실업급여",
    description: "사업주가 퇴직을 권유한 경우 실업급여 수급자격과 대응 방법을 정리했어요.",
  },
  {
    slug: "정리해고-실업급여",
    title: "정리해고 시 실업급여 신청",
    description: "경영상 이유로 해고됐다면 비자발적 퇴사로 실업급여 대상이에요.",
  },
  {
    slug: "희망퇴직-실업급여",
    title: "희망퇴직 후 실업급여 받는 방법",
    description: "희망퇴직도 비자발적 퇴사로 인정돼서 실업급여를 받을 수 있죠.",
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
          currentSlug="권고사직-실업급여-신청-방법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 권고사직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        권고사직 실업급여, 어떻게 신청해?<br />
        절차와 필요 서류
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;권고사직 당했는데 실업급여는 어떻게 받죠?&rdquo;<br />
        권고사직은 <strong>비자발적 퇴사</strong>예요. 회사가 퇴직을 권유해서 나간 거니까요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는
        비자발적 이직에 해당하는 권고사직을 실업급여 수급 대상으로 인정하고 있죠.
        2026년 기준 1일 상한액 <strong>68,100원</strong>, 수급기간은 최대 <strong>270일</strong>이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 권고사직과 실업급여 */}
      <H2>권고사직이면 바로 실업급여 받을 수 있나요?</H2>
      <p style={body}>
        결론부터 말하면 받을 수 있죠. 권고사직은 회사가 먼저 퇴직을 권유하고, 근로자가 이에 동의해서 퇴직하는 거예요. 본인 의사가 아니라 회사 사정에 의한 퇴직이기 때문에 <strong>비자발적 이직</strong>으로 분류돼요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 비자발적 이직자에게 실업급여 수급자격을 부여하고 있죠.
      </p>
      <p style={body}>
        그런데 한 가지 조건이 중요해요. 회사가 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 제출하는 <strong>이직확인서</strong>에 퇴직 사유가 &lsquo;권고사직&rsquo; 또는 &lsquo;회사 권유에 의한 퇴직&rsquo;으로 기재되어야 하죠. 이 서류가 실업급여 심사의 기본 자료가 돼요. 회사가 퇴직 후 10일 이내에 제출해야 하는 의무가 있고요.
      </p>
      <p style={body}>
        이직확인서에 &lsquo;자발적 퇴사&rsquo;나 &lsquo;개인 사유&rsquo;로 기재되면 문제가 생겨요. 이런 경우 고용센터에서 비자발적 퇴사로 인정하지 않을 수 있죠. 그래서 퇴사 전에 이직확인서 기재 내용을 회사와 미리 확인해두는 게 좋아요.
      </p>

      <GreenBox title="권고사직 실업급여 핵심 조건">
        고용보험 가입기간 180일 이상 (퇴직 전 18개월 기준)<br />
        이직확인서에 &lsquo;권고사직&rsquo;으로 기재<br />
        근로 의사와 능력이 있지만 취업하지 못한 상태<br />
        적극적인 구직활동을 하고 있을 것
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 권고사직 실업급여 수급 자격을 갖췄어요. 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2 — 금액과 기간 + 계산기 */}
      <H2>얼마나, 얼마 동안 받나요? 직접 계산해보세요</H2>
      <p style={body}>
        실업급여 금액은 퇴직 전 평균임금의 <strong>60%</strong>예요. 2026년 기준 <strong>1일 상한액은 68,100원</strong>이고, <strong>1일 하한액은 66,048원</strong>이에요. 월로 환산하면 최대 약 <strong>204만 원</strong> 정도 되죠. 상한액과 하한액의 차이가 크지 않아서, 대부분의 근로자는 비슷한 금액을 받게 돼요.
      </p>
      <p style={body}>
        수급 기간은 <strong>나이와 고용보험 가입기간</strong>에 따라 달라요. 50세 미만이면서 가입기간이 1년 미만이면 120일, 10년 이상이면 240일까지 받을 수 있죠. 50세 이상이거나 장애인이면 같은 가입기간이어도 수급일수가 더 길고요. 가입기간 10년 이상이면 최대 270일까지 받을 수 있어요.
      </p>
      <p style={body}>
        중요한 건 퇴직 후 <strong>12개월 이내에 신청</strong>해야 한다는 점이에요. 12개월이 지나면 수급자격 자체가 사라지죠. 수급 기간이 남아 있어도 12개월 시점에서 끊기는 거예요. 그러니 퇴직하면 최대한 빨리 신청하는 게 유리하죠.
      </p>

      <SectionBadge>내 월급과 가입기간으로 계산해보세요</SectionBadge>
      <Calculator
        title="권고사직 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <BorderBox title="실업급여 금액 요약 (2026년 기준)">
        퇴직 전 평균임금의 60%<br />
        1일 상한: 68,100원 / 1일 하한: 66,048원<br />
        월 최대: 약 204만 원<br />
        수급 기간: 120일~270일 (나이·가입기간에 따라 다름)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 절차 6단계 */}
      <H2>신청은 이 순서대로 하세요, 6단계</H2>
      <p style={body}>
        <strong>1단계는 이직확인서 처리 확인</strong>이에요. 회사가 퇴직 후 10일 이내에 이직확인서를 고용센터에 제출해야 해요. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 로그인해서 개인서비스 → 이직확인서 처리현황에서 볼 수 있죠. 여기서 이직사유가 &lsquo;권고사직&rsquo;으로 나오는지 꼭 체크해야 해요.
      </p>
      <p style={body}>
        <strong>2단계는 워크넷 구직등록</strong>이에요. <a href="https://www.work.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>워크넷</a>에서 희망 직종, 희망 급여, 경력 사항을 입력하면 돼요. 미리 해두면 고용센터 방문 시간이 줄어들죠. <strong>3단계는 고용센터 방문</strong>이에요. 관할 고용센터에 가서 수급자격을 신청하세요. 준비물은 신분증, 통장 사본, 증명사진 1장이고요.
      </p>
      <p style={body}>
        <strong>4단계는 수급자격 인정</strong>이에요. 고용센터 담당자가 이직확인서를 바탕으로 수급자격을 심사하죠. 권고사직이면 대부분 문제없이 인정돼요. <strong>5단계는 대기기간 7일</strong>이에요. 수급자격 인정 후 7일 동안은 실업급여가 나오지 않죠. <strong>6단계는 실업인정 및 수령</strong>이에요. 실업인정일에 구직활동 내역을 신고하면 실업급여가 통장에 입금돼요. 1~4주마다 반복해야 하고요.
      </p>

      <SectionBadge>퇴사 전 증거 확보 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 이직확인서 문제 대처법 */}
      <H2>이직확인서에 '권고사직'이 아니라고 적혀 있다면?</H2>
      <p style={body}>
        실무에서 가장 많이 생기는 문제가 바로 이거예요. 분명 권고사직인데 회사가 이직확인서에 &lsquo;자발적 퇴사&rsquo;로 기재하는 경우가 꽤 있죠. 회사 입장에서는 권고사직으로 기재하면 고용보험료 부담이 늘어날 수 있기 때문이에요.
      </p>
      <p style={body}>
        이런 경우 <strong>고용센터에 이의신청</strong>을 하세요. 담당자가 회사에 확인 전화를 하고, 사실관계를 조사해요. 여기서 중요한 게 <strong>증빙자료</strong>예요. 회사가 퇴직을 권유한 문자 메시지, 이메일, 면담 녹음 등이 있으면 훨씬 유리하죠. 대화 당사자인 본인이 녹음한 건 합법이에요.
      </p>
      <p style={body}>
        사실관계가 확인되면 이직사유가 <strong>정정</strong>돼요. 정정까지 보통 2~4주 정도 걸리는데, 그 사이에 수급자격 심사가 보류될 수 있죠. 그래서 퇴사 전에 미리 증거를 확보해두는 게 중요해요. 권고사직 확인서를 회사에 요청하거나, 면담 내용을 녹음해두면 나중에 큰 도움이 돼요.
      </p>

      <Divider />

      {/* 섹션 5 — 권고사직 vs 해고 */}
      <H2>권고사직이랑 해고, 뭐가 다른가요?</H2>
      <p style={body}>
        권고사직은 회사가 퇴직을 <strong>권유</strong>하고 근로자가 <strong>동의</strong>해서 퇴직하는 거예요. 해고는 회사가 <strong>일방적으로</strong> 근로관계를 끊는 거죠. 실업급여 측면에서 보면, 권고사직과 정당한 해고 모두 비자발적 퇴사로 실업급여 대상이에요. 다만 본인의 중대한 귀책사유(횡령, 무단결근 등)로 해고된 경우에는 실업급여가 제한될 수 있고요.
      </p>
      <p style={body}>
        실전에서 가장 중요한 건 <strong>사직서 작성</strong>이에요. 권고사직에 동의하면서 사직서를 쓸 때, &lsquo;일신상의 사유&rsquo;로 적으면 자발적 퇴사로 보일 수 있죠. 반드시 &lsquo;회사 권고에 의한 퇴직&rsquo;으로 적거나, 사직서 대신 <strong>권고사직 동의서</strong>를 받으세요. 이 한 줄 차이가 실업급여 수급 여부를 바꿀 수 있어요.
      </p>
      <p style={body}>
        마지막으로 기억할 게 하나 더 있죠. 권고사직을 <strong>거부</strong>할 수도 있다는 거예요. 거부하면 회사는 정리해고나 통상해고를 해야 하는데, 정당한 사유 없이 해고하면 <strong>부당해고</strong>예요. 고용노동부에 구제신청을 할 수 있죠. 권고사직에 동의할지 거부할지는 본인의 상황을 고려해서 결정하세요.
      </p>

      <BorderBox title="권고사직 vs 해고">
        <strong>권고사직</strong>: 회사 권유 + 본인 동의 → 실업급여 가능<br />
        <strong>정당한 해고</strong>: 회사 일방 통보 → 실업급여 가능<br />
        <strong>징계해고(귀책사유)</strong>: 본인 잘못 → 실업급여 제한 가능<br />
        <strong>부당해고</strong>: 정당한 사유 없는 해고 → 구제신청 가능
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        권고사직과 실업급여에 대해 실제로 많이 궁금해하는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사안의 수급자격 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
