"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "notice", label: "부당해고 통보를 서면·구두로 받았다" },
  { id: "within3m", label: "해고일로부터 3개월이 지나지 않았다" },
  { id: "insured180", label: "고용보험 피보험기간이 180일 이상이다" },
  { id: "remedy", label: "노동위원회에 구제신청을 할 의사가 있다" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "월 평균 급여 (세전)",
    min: 150,
    max: 600,
    step: 10,
    defaultValue: 300,
    format: (v: number) => `${v}만 원`,
  },
  {
    id: "period",
    label: "고용보험 가입 기간",
    min: 1,
    max: 20,
    step: 1,
    defaultValue: 3,
    format: (v: number) => `${v}년`,
  },
  {
    id: "age",
    label: "만 나이",
    min: 20,
    max: 65,
    step: 1,
    defaultValue: 35,
    format: (v: number) => `${v}세`,
  },
];

function getDays(period: number, age: number): number {
  if (age < 30) {
    if (period < 1) return 120;
    if (period < 3) return 150;
    if (period < 5) return 180;
    if (period < 10) return 210;
    return 240;
  }
  if (age < 50) {
    if (period < 1) return 120;
    if (period < 3) return 150;
    if (period < 5) return 180;
    if (period < 10) return 240;
    return 270;
  }
  // 50세 이상
  if (period < 1) return 120;
  if (period < 3) return 180;
  if (period < 5) return 210;
  if (period < 10) return 240;
  return 270;
}

const CALC_RESULTS = [
  {
    label: "1일 수급액 (추정)",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round(((v.salary * 10000) / 30) * 0.6);
      return Math.min(Math.max(daily, 66048), 68100);
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급 일수",
    getValue: (v: Record<string, number>) => getDays(v.period, v.age),
    format: (v: number) => `${v}일`,
  },
  {
    label: "총 예상 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.min(Math.max(Math.round(((v.salary * 10000) / 30) * 0.6), 66048), 68100);
      return daily * getDays(v.period, v.age);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만 원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "해고일로부터 3개월 이내에 노동위원회 구제신청",
  "이직확인서 발급 여부 확인 (회사에 요청)",
  "워크넷 구직등록 후 실업급여 수급자격 신청",
  "구제신청 중에도 구직활동 실업인정 필수",
  "복직 또는 금전보상 결과에 따라 정산",
];

const FAQS = [
  {
    q: "부당해고 구제신청 중인데 실업급여 받을 수 있나요?",
    a: "받을 수 있죠. 해고 효력이 유지되는 동안은 법적으로 실업 상태이기 때문이에요. 구제신청과 실업급여는 별개 절차라서 동시에 진행하면 돼요.",
  },
  {
    q: "복직되면 받은 실업급여를 돌려줘야 하나요?",
    a: "반환해야 할 수 있죠. 부당해고 판정이 나면 해고 자체가 처음부터 무효가 돼요. 법적으로 계속 재직 중이었던 거라 실업급여를 돌려줘야 하고, 대신 밀린 임금을 받게 돼요.",
  },
  {
    q: "금전보상을 받으면 실업급여는 어떻게 되나요?",
    a: "반환 안 해도 돼요. 금전보상은 복직 대신 보상금을 받는 거라 해고가 유지되죠. 실업 상태가 맞으니까 실업급여도 그대로 유지돼요.",
  },
  {
    q: "구제신청이 기각되면 실업급여도 끊기나요?",
    a: "기각 사유에 따라 달라요. 해고가 정당하지만 중대한 귀책사유가 아니면 실업급여 수급은 유지되죠. 중대한 귀책사유로 해고된 거라면 수급자격이 제한될 수 있고요.",
  },
  {
    q: "구제신청 기한이 지나면 어떡하죠?",
    a: "노동위원회 구제신청은 해고일로부터 3개월이 기한이에요. 이 기한을 넘기면 구제신청은 불가하지만, 실업급여 신청은 퇴직 후 12개월 이내라 별도로 진행할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 실업급여 수급자격 및 제한 사유", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "근로기준법 제28조 — 부당해고 구제신청 절차", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "중앙노동위원회 — 부당해고 구제신청 안내", url: "https://www.nlrc.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-이의신청",
    title: "실업급여 이의신청 절차",
    description: "실업급여가 불인정됐다면 60일 이내 이의신청으로 재심사를 받을 수 있죠.",
  },
  {
    slug: "정리해고-실업급여",
    title: "정리해고되면 실업급여 받는 법",
    description: "경영상 이유로 정리해고됐다면 비자발적 퇴사로 실업급여를 받을 수 있죠.",
  },
  {
    slug: "실업급여-재심사청구",
    title: "실업급여 재심사청구 방법",
    description: "이의신청이 기각됐다면 재심사청구로 한 번 더 다툴 수 있어요.",
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
          currentSlug="부당해고-구제신청-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 부당해고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부당해고 구제 중에도 실업급여?<br />
        복직·보상별 수급 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "부당해고 구제신청 넣었는데, 실업급여도 신청해도 되나요?"<br />
        네, 동시에 진행하면 돼요. 두 절차는 <strong>완전히 별개</strong>니까요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>상
        구제신청 중이라도 해고 효력은 유지되고, 그 기간 동안은 법적으로 실업 상태예요.
        결과가 나온 뒤에 정산하면 되죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 부당해고 구제신청이란 */}
      <H2>구제신청 중에도 수급 기준을 충족하나요?</H2>
      <p style={body}>
        회사가 정당한 이유 없이 해고했다고 판단되면, <a href="https://www.nlrc.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동위원회</a>에 구제신청을 할 수 있죠.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 근로기준법 제28조</a>에서 보장하는 권리예요.
        해고가 부당하다고 판정되면 <strong>복직</strong> 또는 <strong>금전보상</strong>을 받게 되죠.
      </p>
      <p style={body}>
        신청 기한이 정해져 있죠. 해고일로부터 <strong>3개월 이내</strong>에 지방노동위원회에 신청해야 해요.
        이 기한을 하루라도 넘기면 신청 자체가 불가능하고요.
        지방노동위원회 결과에 불복하면 중앙노동위원회에 재심을 청구할 수도 있죠.
      </p>
      <p style={body}>
        여기서 핵심은, 구제신청을 넣었다고 해서 해고가 바로 취소되는 건 아니라는 점이에요.
        판정이 나올 때까지 해고 효력은 그대로 유지되죠.
        그래서 그 기간 동안 실업급여를 받을 수 있는 거예요.
      </p>

      <GreenBox title="내가 신청 대상인지 체크해 보세요">
        아래 4가지를 모두 충족하면 구제신청과 실업급여를 동시에 진행할 수 있어요.
      </GreenBox>

      <SectionBadge>수급 자격 자가 진단</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="구제신청과 실업급여를 동시에 진행할 수 있어요!"
        partialMatchText="충족되지 않은 항목을 다시 확인해 보세요."
      />

      <Divider />

      {/* 섹션 2 — 구제신청 중 실업급여 + 계산기 */}
      <H2>수급 금액과 기간은 얼마나 되나요?</H2>
      <p style={body}>
        구제신청을 넣었더라도 실업급여 신청 절차는 일반 해고와 똑같아요.
        워크넷 구직등록 → 수급자격 신청 → 실업인정 → 수령 순서로 진행하면 되죠.
        고용센터에 "부당해고 구제신청 중"이라는 사실을 알려주면 돼요.
      </p>
      <p style={body}>
        중요한 건, 구제신청을 했다고 구직활동을 안 해도 되는 게 아니라는 점이에요.
        실업급여를 받으려면 <strong>실업인정일마다 구직활동을 증명</strong>해야 하죠.
        "복직될 것 같아서 구직활동을 안 했다"는 사유는 인정이 안 돼요.
      </p>
      <p style={body}>
        실업급여 금액은 퇴직 전 평균임금의 <strong>60%</strong>예요.
        2026년 기준 1일 상한액이 <strong>68,100원</strong>, 하한액이 <strong>66,048원</strong>이죠.
        월로 환산하면 최대 약 204만 원 정도 받을 수 있어요.
        아래 계산기에서 본인 예상 금액을 확인해 보세요.
      </p>

      <Calculator
        title="부당해고 시 실업급여 예상 수급액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="2026년 기준 추정치예요. 실제 금액은 고용센터 심사 후 확정돼요."
      />

      <BorderBox title="구제신청 절차 요약">
        해고 발생 → 3개월 내 지방노동위원회 신청<br />
        → 심사·판정 (약 60일 소요)<br />
        → 불복 시 중앙노동위원회 재심 (10일 내 신청)<br />
        → 재심에도 불복 시 행정소송
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 결과별 실업급여 처리 */}
      <H2>복직·보상·기각별 수급 처리 방식</H2>
      <p style={body}>
        구제신청 결과는 크게 세 가지예요. <strong>복직</strong>, <strong>금전보상</strong>, <strong>기각</strong>이죠.
        각각 실업급여 처리 방식이 완전히 다르니 미리 알아두는 게 좋아요.
      </p>
      <p style={body}>
        <strong>복직 판정</strong>이 나오면 해고가 처음부터 무효가 돼요.
        법적으로 계속 재직 중이었던 거라, 받았던 실업급여를 <strong>반환</strong>해야 할 수 있죠.
        대신 해고 기간 동안의 <strong>밀린 임금</strong>을 회사에서 받게 돼요.
        밀린 임금에서 실업급여 반환금을 차감하는 식으로 정산하면 되죠.
      </p>
      <p style={body}>
        <strong>금전보상</strong>을 선택하면 상황이 달라요. 복직 대신 보상금을 받는 거라 해고 자체는 유지되죠.
        실업 상태가 맞으니까 받은 실업급여를 반환할 필요가 없어요.
        회사와 관계가 틀어져서 복직이 어려운 경우에 금전보상을 선택하는 분이 많죠.
      </p>
      <p style={body}>
        <strong>기각</strong>되면 해고가 정당하다는 뜻이에요. 여기서 중대한 귀책사유(횡령, 무단결근 등)로 해고된 거라면 실업급여 수급자격 자체가 제한되죠.
        중대한 귀책사유가 아닌 통상 해고라면 실업급여는 그대로 유지돼요.
      </p>

      <BorderBox title="결과별 실업급여 정리">
        복직 판정 → 실업급여 반환 + 밀린 임금 수령<br />
        금전보상 → 실업급여 유지 (반환 불필요)<br />
        기각 (귀책사유 X) → 실업급여 유지<br />
        기각 (중대 귀책사유) → 수급자격 제한, 부정수급 처리 가능
      </BorderBox>

      <Divider />

      {/* 섹션 4 — 주의할 점 */}
      <H2>복직 전 수급 중 주의할 점</H2>
      <p style={body}>
        가장 많이 실수하는 게 <strong>구직활동 미이행</strong>이에요.
        구제신청을 넣었으니 복직될 거라 생각하고 구직활동을 안 하는 분이 많죠.
        실업급여는 구직활동을 해야 받을 수 있는 제도라서, 구제신청 여부와 무관하게 실업인정을 받아야 해요.
      </p>
      <p style={body}>
        구제신청 중에 <strong>다른 회사에 취업</strong>하면 실업급여가 끊겨요.
        복직 판정이 나왔는데 이미 다른 곳에서 일하고 있으면 상황이 복잡해지죠.
        취업한 사실을 숨기고 실업급여를 계속 받으면 <strong>부정수급</strong>으로 처리돼요.
        부정수급은 받은 금액의 최대 5배를 추징당할 수 있죠.
      </p>
      <p style={body}>
        <strong>구제신청 기한(3개월)</strong>과 <strong>실업급여 신청 기한(12개월)</strong>이 다르다는 점도 기억하세요.
        구제신청은 해고 직후 바로 넣는 게 좋고, 실업급여도 미루지 말고 빨리 신청해야 수급일수를 최대한 확보할 수 있죠.
        두 절차 모두 해고 직후 동시에 시작하는 게 가장 유리해요.
      </p>

      <SectionBadge>동시 진행 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 — 실전 행동 */}
      <H2>구제신청과 수급 신청을 동시에 시작하세요</H2>
      <p style={body}>
        부당해고를 당했다면 가장 먼저 할 일은 <strong>증거 확보</strong>예요.
        해고통보서, 문자 메시지, 이메일, 녹음 파일 등 해고 사실을 증명할 수 있는 자료를 모아두세요.
        구제신청에서도, 실업급여 심사에서도 증빙이 핵심이에요.
      </p>
      <p style={body}>
        증거를 확보했으면 <strong>두 곳에 동시 신청</strong>하세요.
        노동위원회에는 부당해고 구제신청, <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서는 실업급여 신청이에요.
        노동위원회 상담전화는 <strong>02-6906-5500</strong>, 고용센터는 <strong>1350</strong>이죠.
        어디부터 해야 할지 모르겠으면 전화 상담부터 받아보세요.
      </p>
      <p style={body}>
        결과가 어떻게 나오든 손해 보는 구조는 아니에요.
        복직되면 밀린 임금을 받고, 금전보상이면 보상금에 실업급여까지 받게 되죠.
        기각되더라도 중대한 귀책사유가 아니면 실업급여는 유지되고요.
        기다리지 말고 두 절차를 바로 시작하는 게 최선이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        부당해고 구제신청과 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 근로기준법을 바탕으로 작성됐어요. 개별 사안의 판정 결과는 노동위원회 심사에 따라 다르니, 사전 상담을 받아보세요." />
    </ArticleLayout>
  );
}
