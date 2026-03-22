"use client";

// Q1. "돈 준다"는 말에 체크카드를 빌려줬거나 빌려줄까 고민 중인 사람. 처벌이 어느 정도인지 궁금한 상황.
// Q2. 체크카드 대여가 불법임을 확인하고, 이미 빌려줬다면 즉시 신고·카드 정지하는 행동.
// Q3. 전자금융거래법 처벌 기준(5년 이하 징역/3천만원 벌금), 금융거래 제한, 사기방조죄 가중, 신고처.
// Q4. GreenBox(처벌 기준) + BorderBox(실제 사례) + Steps(이미 빌려줬을 때 대응) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "속아서 빌려줬는데도 처벌받나요?",
    a: "네, 처벌 대상이에요. 통장이나 카드를 빌려주는 것 자체가 불법이라는 걸 모를 리 없다고 보기 때문이에요.",
  },
  {
    q: "초범이면 실형을 안 받을 수 있나요?",
    a: "보장할 수 없어요. 보이스피싱 범죄가 심각해지면서 초범도 실형을 선고하는 경우가 늘고 있어요.",
  },
  {
    q: "체크카드 대여하면 금융거래가 얼마나 막히나요?",
    a: "모든 비대면 거래(인터넷뱅킹, 모바일뱅킹, ATM 이체)가 차단돼요. 카드 발급·대출도 안 되고, 보통 3~5년간 제한이 유지돼요.",
  },
  {
    q: "통장만 빌려줬는데 카드까지 같이 줬으면 형량이 더 높아지나요?",
    a: "OTP, 보안카드, 인터넷뱅킹 정보까지 넘기면 사기방조죄가 추가돼서 형량이 크게 올라가요.",
  },
  {
    q: "가족한테 빌려줘도 불법인가요?",
    a: "네, 가족이라도 자기 명의 금융수단을 빌려주면 전자금융거래법 위반이에요. 예외가 없어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "전자금융거래법", url: "https://www.law.go.kr/법령/전자금융거래법" },
      { label: "찾기쉬운 생활법령정보 대포통장 처벌", url: "https://www.easylaw.go.kr" },
      { label: "금융감독원 불법금융 신고", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "보이스피싱-피해-신고", title: "보이스피싱 피해 신고 방법", description: "보이스피싱 당했을 때 신고처와 대응 절차를 정리했어요." },
  { slug: "금융사기-예방", title: "금융사기 예방 체크리스트", description: "흔한 금융사기 수법과 예방법을 모았어요." },
  { slug: "금융분쟁조정", title: "금융분쟁조정 신청", description: "금융회사와 분쟁이 생겼을 때 금감원 조정 신청법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 법률 · 처벌</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        체크카드 빌려주면 어떻게 되나요?<br />
        처벌 기준·금융제한·대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "카드 1장당 300만원 드려요" 이런 말에 솔깃했던 적 있나요?
        체크카드를 빌려주는 건 <a href="https://www.law.go.kr/법령/전자금융거래법" style={{ color: "#1D9E75", textDecoration: "underline" }}>전자금융거래법</a> 위반이에요.
        단순히 빌려준 것뿐인데 징역까지 갈 수 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>왜 체크카드 대여가 불법인가요?</H2>
      <p style={body}>
        <a href="/w/보이스피싱-피해-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>보이스피싱</a>이나 금융사기 범죄에 쓰이기 때문이에요.
        범죄자들은 자기 명의로 계좌를 만들면 추적당하니까 남의 통장과 카드를 써요.
        그래서 "대포통장", "대포카드"라고 불러요.
      </p>
      <p style={body}>
        "300만원 준다"는 제안 자체가 이미 비정상이에요.
        정상적인 거래에서 남의 카드를 쓸 이유가 없으니까요.
        "몰랐다"고 해도 법적으로는 인식 가능성이 있다고 보고 처벌해요.
      </p>

      <Divider />

      <H2>처벌 기준과 형량</H2>

      <GreenBox>
        <strong>전자금융거래법 제49조 제4항</strong><br />
        · 접근매체(카드·통장) 양도·대여: <strong>5년 이하 징역 또는 3천만원 이하 벌금</strong><br />
        · OTP·보안카드·인터넷뱅킹까지 넘기면: 사기방조죄 추가 (형량 대폭 상승)<br />
        · 초범도 실형 선고 사례 다수
      </GreenBox>

      <SectionBadge>실제 판례 사례</SectionBadge>
      <BorderBox>
        <strong>A씨</strong> — 체크카드 3장을 "300만원 준다"는 말에 빌려줌<br />
        → 보이스피싱에 사용됨 → 초범이지만 징역 1년 선고<br /><br />
        <strong>B씨</strong> — 체크카드 + OTP + 인터넷뱅킹 정보까지 넘김<br />
        → 사기방조죄 추가 → 징역 2년 선고
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>금융거래 제한, 어디까지 막히나요?</H2>
      <p style={body}>
        형사처벌만으로 끝이 아니에요. 금융감독원에서 "전자금융거래 질서 위반자"로 등록하면
        금융생활이 거의 마비돼요.
      </p>

      <BorderBox>
        <strong>제한되는 것들</strong><br /><br />
        · 인터넷뱅킹, 모바일뱅킹, ATM 이체 전부 차단<br />
        · 신용카드·체크카드 신규 발급 불가 (기존 카드도 정지 가능)<br />
        · 대출 불가<br />
        · 취업 시 금융거래 제한 기록으로 불이익 가능<br />
        · 보통 <strong>3~5년</strong> 유지
      </BorderBox>

      <Divider />

      <H2>이미 빌려줬다면, 지금 바로 이렇게 하세요</H2>

      <Steps steps={[
        { title: "금융감독원(1332) 또는 경찰청(112)에 즉시 신고" },
        { title: "은행에 카드 정지 신청 (추가 악용 차단)" },
        { title: "카카오톡 대화, 전화 기록, 만난 장소 등 증거 확보" },
        { title: "변호사 상담으로 유리한 대응 전략 수립" },
      ]} />

      <p style={body}>
        신속하게 대응할수록 피해를 줄일 수 있어요.
        자진 신고하면 양형에 유리한 점도 있으니, 숨기지 말고 바로 움직이세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 전자금융거래법과 법원 판례를 바탕으로 작성했어요. 개별 사건의 형량은 범행 경위·피해 규모·범죄 가담 정도에 따라 달라지니, 구체적인 상황은 변호사 상담을 받아봐요." />
    </ArticleLayout>
  );
}
