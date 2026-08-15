"use client";
// Q1. 기초연금이 갑자기 안 들어와서 당황한 상황
// Q2. 정지 사유를 파악하고 해당 사유에 맞는 해제 절차를 밟는다
// Q2-1. 주민센터 방문 또는 전화(129)로 해제 신청
// Q3. 정지 사유 5가지(해외체류·거주지미신고·소득변동·금융조사거부·사망), 사유별 해제 방법, 해제 후 소급 여부
// Q4. GreenBox(정지 사유 요약) + Steps(해제 절차) + BorderBox(사유별 해제 방법) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const RESOLVE_STEPS = [
  {
    title: "정지 사유 확인",
    desc: "주민센터에 전화(129)하거나 방문해서 정지 사유를 확인해요. 복지로에서도 수급 상태를 조회할 수 있어요. 보통 정지 전에 안내문이 발송되지만, 주소 변경 등으로 못 받는 경우가 있죠.",
    tip: "복지로 로그인 → '나의 복지' → '수급이력' 에서 확인 가능",
  },
  {
    title: "해제 조건 충족",
    desc: "해외 체류로 정지됐으면 귀국 후 거주 사실 확인, 거주지 미신고면 전입신고, 소득 변동이면 변동 신고를 해요. 각 사유에 맞는 조건을 충족하면 돼요.",
    tip: "해외 체류는 귀국만 하면 되고, 거주지는 전입신고만 하면 돼요",
  },
  {
    title: "주민센터에 해제 신청",
    desc: "사유 해소 후 주민센터를 방문해서 지급 재개를 신청해요. 신분증만 가져가면 되고, 별도 서류가 필요한 경우 담당자가 안내해줘요.",
    tip: "해제 후 정지 기간 중 못 받은 금액은 소급 지급되지 않는 경우가 많아요",
  },
];

const FAQS = [
  {
    q: "해외여행 갔다 왔는데 기초연금이 끊겼어요",
    a: "60일 이상 해외에 체류하면 지급이 정지돼요. 귀국 후 주민센터에 방문해서 거주 사실을 확인하면 다음 달부터 지급이 재개되죠. 체류 기간은 출입국 기록으로 자동 확인돼요.",
  },
  {
    q: "정지 기간 동안 못 받은 돈은 돌려받을 수 있나요?",
    a: "정지 사유에 따라 달라요. 해외 체류로 정지된 경우 체류 기간의 연금은 소급 지급이 안 돼요. 단, 행정 착오로 잘못 정지된 경우에는 소급 지급을 받을 수 있으니 이의신청을 하세요.",
  },
  {
    q: "소득이 늘어서 정지됐는데 다시 줄면 재개되나요?",
    a: "네, 소득인정액이 다시 선정기준액(단독 247만원, 부부 395.2만원) 이하로 내려가면 재신청해서 다시 받을 수 있어요. 자동으로 재개되지는 않으니 직접 신청해야 해요.",
  },
  {
    q: "거주지를 옮겼는데 신고를 안 했어요",
    a: "전입신고를 하지 않으면 거주 사실 확인이 안 돼서 지급이 정지될 수 있어요. 새 주소지 주민센터에서 전입신고를 하면 해결돼요.",
  },
  {
    q: "금융정보 동의를 거부하면 정지되나요?",
    a: "네, 기초연금 수급을 위해 정기적으로 금융정보 제공 동의 갱신이 필요한데, 이를 거부하면 소득·재산 확인이 안 돼서 지급이 정지될 수 있어요. 동의서에 서명하면 바로 해제돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 제도 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 수급 관리", url: "https://www.bokjiro.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제10조 (지급 정지)", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 제12조 (해외 체류)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-지급일-입금기준", title: "기초연금 지급일은 매월 언제?", description: "매달 입금되는 날짜와 기준이에요." },
  { slug: "기초연금-이의신청-심사청구-절차", title: "기초연금 이의신청 절차", description: "정지나 탈락에 불복할 때 절차예요." },
  { slug: "기초연금-해외체류-정지규정-예외", title: "해외 체류 시 정지 규정", description: "해외에 얼마나 있으면 정지되는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-지급정지-사유-해제방법" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>지급정지</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        기초연금이 갑자기 끊겼다면?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        지급정지 사유와 해제 방법
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 25일에 꼬박꼬박 들어오던 기초연금이 갑자기 안 들어오면 당황스럽죠.
        지급이 정지되는 데는 몇 가지 이유가 있고, 사유별로 해제 방법이 달라요.
        대부분 주민센터에 연락하면 빠르게 해결할 수 있으니 침착하게 확인해보세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>지급 정지 사유 5가지</H2>
      <p style={body}>
        기초연금이 정지되는 대표적인 사유는 다섯 가지예요.
        본인도 모르는 사이에 해당될 수 있으니 하나씩 확인해보세요.
      </p>
      <GreenBox>
        <strong>기초연금 지급정지 주요 사유</strong><br />
        <br />
        1. 해외 체류 60일 초과 — 출국일 기준으로 자동 확인<br />
        2. 거주지 변경 후 전입신고 미이행 — 거주 사실 확인 불가<br />
        3. 소득·재산 변동 — 선정기준액(단독 247만원) 초과<br />
        4. 금융정보 제공 동의 미갱신 — 정기 재조사 시 확인 불가<br />
        5. 수급자 사망 — 사망일이 속하는 달까지 지급<br />
      </GreenBox>
      <p style={body}>
        가장 흔한 사유는 해외 체류와 거주지 미신고예요.
        여행을 다녀왔거나 이사한 적이 있다면 이 부분을 먼저 확인해보세요.
      </p>

      <H2>사유별 해제 방법</H2>
      <p style={body}>
        각 사유마다 해제 방법이 조금씩 달라요.
        아래에서 본인 상황에 맞는 방법을 찾아보세요.
      </p>
      <BorderBox>
        <strong>정지 사유별 해제 방법</strong><br />
        <br />
        <strong>해외 체류 60일 초과</strong><br />
        → 귀국 후 주민센터 방문 → 거주 사실 확인 → 다음 달부터 재지급<br />
        <br />
        <strong>거주지 미신고</strong><br />
        → 새 주소지 주민센터에서 전입신고 → 자동 해제<br />
        <br />
        <strong>소득·재산 변동</strong><br />
        → 소득이 다시 줄었다면 주민센터에서 재신청 → 재심사<br />
        <br />
        <strong>금융정보 동의 미갱신</strong><br />
        → 주민센터 방문 → 동의서 재서명 → 즉시 해제<br />
        <br />
        <strong>수급자 사망</strong><br />
        → 유족이 미지급분 청구 가능 (5년 이내)
      </BorderBox>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>해제 절차 3단계</H2>
      <p style={body}>
        어떤 사유든 해제 절차는 크게 세 단계로 진행돼요.
      </p>
      <Steps steps={RESOLVE_STEPS} />

      <H2>정지 전에 미리 예방하는 법</H2>
      <p style={body}>
        이사하면 14일 이내에 전입신고를 하세요. 전입신고가 늦어지면 거주 사실 확인이 안 돼서 정지될 수 있어요.
        해외 여행을 계획하고 있다면 60일을 넘기지 않도록 일정을 조절하는 게 좋아요.
      </p>
      <p style={body}>
        매년 시·군·구청에서 정기 재조사를 하는데, 이때 <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득인정액</Link>이 기준을 초과하면 수급 자격이 상실돼요.
        소득이나 재산에 큰 변동이 생기면 미리 주민센터에 신고해두면 갑작스러운 정지를 피할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        지급정지 관련 궁금한 점이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 기준으로 작성됐어요. 지급정지 사유와 해제 절차는 개인 상황에 따라 다를 수 있으니 주민센터(129)에서 정확하게 확인하세요." />
    </ArticleLayout>
  );
}
