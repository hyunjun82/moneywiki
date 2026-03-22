"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 실업급여를 받고 있는데 직업훈련을 받으면 수당을 더 받을 수 있다고 들어서 확인하려는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 고용센터에서 훈련을 지정받고, 훈련 이수 후 수당을 청구하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 수당 종류(교통비·식비), 지급 금액, 고용센터 지시 훈련만 해당, 청구 절차.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Steps(신청 절차) + GreenBox(핵심 금액) + EligibilityChecker(자격 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd, Steps, EligibilityChecker,
  ArticleLayout,
} from "@/components/article-ui";

const ELIGIBILITY_ITEMS = [
  { id: "unemp", label: "구직급여(실업급여)를 받고 있어요" },
  { id: "order", label: "고용센터 소장의 지시로 훈련을 받고 있어요" },
  { id: "attend", label: "훈련에 성실하게 출석하고 있어요" },
];

const STEPS = [
  { title: "고용센터 방문·상담", desc: "실업급여 수급 중 고용센터에서 직업훈련을 안내받아요. 직업능력개발 훈련 대상으로 지정돼야 해요." },
  { title: "훈련 과정 수강", desc: "고용센터가 지정한 훈련 과정을 수강해요. 출석률과 훈련 성실도가 중요해요." },
  { title: "수당 청구서 제출", desc: "훈련 이수 후 고용센터에 직업능력개발 수당 청구서를 제출해요. 교통비·식비 명목으로 지급돼요.", tip: "훈련 출석 확인서를 함께 제출하면 처리가 빨라요." },
  { title: "수당 지급", desc: "심사 후 구직급여와 별도로 수당이 입금돼요." },
];

const FAQS = [
  {
    q: "직업능력개발 수당, 구직급여랑 따로 받는 건가요?",
    a: "네, 완전히 별도예요. 구직급여는 그대로 받으면서 훈련 수당을 추가로 받는 거예요.",
  },
  {
    q: "내가 직접 찾은 학원도 수당 대상이 되나요?",
    a: "안 돼요. 반드시 고용센터 소장의 지시에 따라 받는 훈련이어야 해요. 개인이 임의로 등록한 학원은 해당 안 돼요.",
  },
  {
    q: "훈련 중간에 취업하면 수당은 어떻게 되나요?",
    a: "취업하면 구직급여와 직업능력개발 수당 모두 중단돼요. 대신 조기재취업 수당을 받을 수 있어요.",
  },
  {
    q: "직업능력개발 수당 얼마나 받나요?",
    a: "훈련일수에 따라 교통비와 식비 명목으로 지급돼요. 구체적 금액은 훈련 유형과 거리에 따라 달라지니 고용센터에서 확인하세요.",
  },
  {
    q: "온라인 훈련도 수당 대상인가요?",
    a: "고용센터가 지정한 온라인 훈련이라면 대상이 될 수 있어요. 다만 출석 인정 방식이 달라질 수 있으니 사전에 확인하세요.",
  },
  {
    q: "훈련에 결석하면 수당이 깎이나요?",
    a: "네, 출석일수 기준으로 지급돼요. 무단 결석이 잦으면 수당뿐 아니라 구직급여까지 영향받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령·정부 자료",
    items: [
      { label: "고용보험법 제65조 (직업능력개발 수당)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 (고용보험 포털)", url: "https://www.ei.go.kr" },
      { label: "워크넷 직업훈련 검색", url: "https://www.work24.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 직업훈련</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        직업능력개발 수당, 실업급여에 더 받는 돈?<br />
        신청 방법과 지급 금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 받으면서 직업훈련까지 받으면 수당을 추가로 받을 수 있어요.
        고용센터에서 지정한 훈련을 받아야 하고, 교통비와 식비 명목으로 나와요.
        자격 조건부터 신청 절차까지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>직업능력개발 수당이 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제65조</a>에
        따라, 구직급여를 받는 사람이 고용센터 소장의 지시로 직업훈련을 받으면 추가 수당을 지급해요.
        구직급여와 별개로 교통비, 식비 명목으로 나오는 돈이에요.
      </p>

      <GreenBox>
        <strong>핵심 포인트 3가지</strong><br />
        · 구직급여(실업급여) 수급 중에만 받을 수 있어요<br />
        · 고용센터가 지정한 훈련만 해당 (개인 학원 X)<br />
        · 교통비·식비 명목으로 구직급여와 별도 지급
      </GreenBox>

      <Divider />

      <H2>수당을 받을 수 있는 조건은?</H2>
      <p style={body}>
        아무 훈련이나 받는다고 되는 게 아니에요.
        고용센터에서 직접 훈련을 지정해줘야 하고, 성실하게 출석해야 해요.
        아래 조건을 모두 충족하는지 확인해보세요.
      </p>

      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="직업능력개발 수당을 받을 수 있어요. 훈련 이수 후 고용센터에 청구하세요."
        partialMatchText="일부 조건이 안 맞아요. 고용센터(1350)에 본인 상황을 상담해보세요."
      />

      <Divider />

      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        별도로 신청하는 게 아니라, 고용센터에서 훈련을 지정받고 이수한 뒤 청구하는 구조예요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서도 관련 정보를 확인할 수 있어요.
      </p>

      <SectionBadge>신청 절차 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <BorderBox title="함께 알아두면 좋은 것">
        훈련 중 취업하면 <a href="/w/조기재취업-수당-신청-조건-및-금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업 수당</a>을 받을 수 있어요.
        <a href="/w/실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a> 수급 기간이 끝나면 직업능력개발 수당도 함께 종료돼요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 구체적 금액과 훈련 과정은 관할 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
