"use client";
// Q1: 관리비 이상하거나 관리업체가 부당하게 운영되는 것 같아 민원을 넣고 싶은 입주민
// Q2: 어떤 기관에 신고·민원을 넣는지 결정하고 실제로 접수
// Q3: 입주자대표회의/지자체/국토교통부 역할 구분, K-apt 조회, 과태료 기준
// Q4: Steps(신고 절차) + BorderBox(기관별 역할) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "K-apt에서 관리비 내역 직접 확인",
    desc: "국토교통부 공동주택관리정보시스템(K-apt)에서 우리 아파트 관리비를 조회해요. 항목별 금액, 전년 대비 변동, 유사 단지와 비교까지 가능해요. 이상한 항목이 있는지 먼저 직접 확인하는 게 첫 단계예요.",
    link: { label: "K-apt 바로가기", href: "https://www.k-apt.go.kr" },
  },
  {
    title: "입주자대표회의에 문의·시정 요청",
    desc: "관리비 이상 징후나 관리업체 문제를 발견하면 입주자대표회의에 먼저 문의해요. 공동주택관리법 제14조에 따라 입주자대표회의는 관리주체를 감독할 권한이 있어요. 서면으로 시정 요청을 남겨두면 나중에 증거가 돼요.",
    tip: "요청 내용을 문자나 이메일로 기록해두면 이후 분쟁 시 유리해요",
  },
  {
    title: "관할 구청·시청 주택과에 관리비 점검 신청",
    desc: "입주자대표회의로 해결이 안 되면 관할 지방자치단체에 신고해요. 공동주택관리법 제93조에 따라 지자체장은 K-apt 공개 관리비의 적정성을 확인하고 개선 권고를 내릴 수 있어요. 구청 주택과 또는 시청 주거복지과에 방문하거나 전화하면 돼요.",
    tip: "민원 접수 시 관리비 내역, K-apt 화면, 입주자대표회의 요청 기록을 함께 제출하면 빠르게 처리돼요",
  },
  {
    title: "국토교통부 국민신문고 온라인 민원",
    desc: "지자체 처리가 미흡하면 국토교통부에 국민신문고를 통해 민원을 넣을 수 있어요. 관리업체 선정 절차 위반, 관리비 공개 의무 미준수, 횡령 의심 등 중대 사안은 국토부 민원도 가능해요.",
    link: { label: "국민신문고 바로가기", href: "https://www.epeople.go.kr" },
  },
];

const DOCS = [
  { name: "관리비 내역서", required: true, where: "K-apt 또는 아파트 홈페이지에서 출력" },
  { name: "입주자대표회의 시정 요청 기록", required: false, where: "문자·이메일 캡처 또는 회의록" },
  { name: "신분증", required: true, where: "민원 접수 시 필요" },
  { name: "관련 증빙자료", required: false, where: "공사 내역, 업체 계약서 등" },
];

const FAQS = [
  {
    q: "관리비가 너무 비싼 것 같아요. 어디에 신고하나요?",
    a: "먼저 K-apt에서 유사 단지와 비교해보세요. 확실히 이상하면 입주자대표회의에 서면으로 시정 요청하고, 해결이 안 되면 관할 구청 주택과에 관리비 점검을 신청하면 돼요.",
  },
  {
    q: "관리업체가 규정을 어기면 어떤 처벌을 받나요?",
    a: "공동주택관리법 위반으로 선정된 관리업체에는 500만 원 이하 과태료가 부과돼요. 관리비 공개 의무를 어겨도 과태료가 나와요. 횡령이나 사기 등 형사 사안은 경찰서에 고소·고발도 가능해요.",
  },
  {
    q: "입주자대표회의가 오히려 관리업체 편인 것 같아요.",
    a: "이 경우엔 입주자대표회의를 건너뛰고 바로 구청 주택과에 신고할 수 있어요. 입주민 10분의 1 이상이 서명하면 관리감사를 요청할 수도 있어요.",
  },
  {
    q: "지자체 점검 결과 '개선 권고'를 받았는데 관리업체가 무시해요.",
    a: "개선 권고를 무시하면 더 강한 행정처분 대상이 돼요. 최악의 경우 관리업체 계약 해지까지 가능해요. 무시 상황을 기록해서 지자체에 재신고하면 돼요.",
  },
  {
    q: "K-apt에 관리비가 공개 안 되어 있어요.",
    a: "의무관리대상 아파트(150세대 이상 등)는 매월 말일까지 K-apt에 관리비를 공개해야 해요. 미공개 자체가 법 위반이에요. 구청에 미공개 신고를 하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "공동주택관리법 제14조: 입주자대표회의 구성 및 운영", url: "https://www.law.go.kr/법령/공동주택관리법" },
      { label: "공동주택관리법 제93조: 감독", url: "https://www.law.go.kr/법령/공동주택관리법" },
      { label: "주택관리업자 및 사업자 선정지침", url: "https://www.law.go.kr/행정규칙/주택관리업자및사업자선정지침" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "K-apt 공동주택관리정보시스템", url: "https://www.k-apt.go.kr" },
      { label: "국민신문고 온라인 민원", url: "https://www.epeople.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "아파트-관리비-항목", title: "아파트 관리비 항목별 뜻과 계산법", description: "공용관리비·개별사용료 항목을 하나씩 뜯어봐요." },
  { slug: "입주자대표회의-구성", title: "입주자대표회의 구성 절차와 권한", description: "동대표 선출부터 회의 운영까지 핵심만 정리했어요." },
  { slug: "전세-계약-주의사항", title: "전세 계약 전 꼭 확인할 것들", description: "전세 계약 시 놓치면 손해 보는 체크리스트예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 아파트 관리 · 민원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파트 주택관리업자 감독 기관<br />
        관리비 이상하면 여기에 신고하세요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        관리비가 이상한 것 같은데 어디에 신고해야 할지 모르겠죠? 아파트 관리 감독은 <strong>입주자대표회의</strong>와 <strong>지방자치단체</strong>가 역할을 나눠서 해요.
        <a href="https://www.law.go.kr/법령/공동주택관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공동주택관리법</a>에 따라 지자체장이 관리비 적정성을 점검하고 개선 권고를 내릴 수 있어요.
        부적절한 관리업체 선정은 500만 원 이하 과태료 대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>감독 기관별 역할, 이렇게 달라요</H2>
      <p style={body}>
        아파트 관리 감독은 한 곳에서 하는 게 아니에요. 관리 방식(자치관리 vs 위탁관리)과 문제 유형에 따라 담당 기관이 달라져요.
        어디에 신고해야 할지 헷갈리면 아래 역할 구분을 먼저 보세요.
      </p>

      <BorderBox>
        <strong>입주자대표회의</strong>: 관리주체(관리사무소) 직접 감독 · 회계감사 · 시정 요청<br />
        <strong>지방자치단체(구청·시청)</strong>: K-apt 관리비 적정성 점검 · 개선 권고 · 과태료 부과<br />
        <strong>국토교통부</strong>: 관리업체 선정 절차 위반 등 중대 사안 민원 처리<br />
        <strong>경찰서</strong>: 횡령·사기 등 형사 사안
      </BorderBox>

      <p style={body}>
        의무관리대상 아파트(150세대 이상, 승강기 있는 300세대 미만 포함)는 매월 관리비를 K-apt에 공개해야 해요.
        이 공개 데이터를 바탕으로 지자체가 적정성을 확인하는 구조예요.
      </p>

      <GreenBox>
        K-apt에서 우리 아파트 관리비를 다른 단지와 비교해볼 수 있어요.<br />
        월별 항목별 금액 조회 가능, 신고 전 데이터를 먼저 비교해봐요.
      </GreenBox>

      <Divider />

      <H2>관리비 이상할 때 신고 절차 4단계</H2>
      <p style={body}>
        신고는 가까운 단계부터 순서대로 진행하는 게 효율적이에요. 입주자대표회의 → 지자체 → 국토교통부 순으로 올라가요.
        각 단계에서 기록을 남겨두면 다음 단계에서 훨씬 빠르게 처리돼요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>민원 접수 시 필요한 자료</H2>
      <p style={body}>
        민원이 빠르게 처리되려면 증빙 자료가 있어야 해요. K-apt 화면 캡처와 입주자대표회의 요청 기록이 가장 중요한 자료예요.
        횡령 의심 사안은 계약서나 영수증 사본도 챙기세요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        관리비 민원 관련해서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 공동주택관리법을 바탕으로 작성됐어요. 법령 개정 시 기준이 달라질 수 있으니 최신 내용은 법제처 또는 관할 구청에서 확인하세요." />
    </ArticleLayout>
  );
}
