"use client";

// Q1. 영유아 자녀를 둔 부모가 보육료·유아학비 결제를 위해 하나카드 아이행복카드(국민행복카드)를 발급받으려는 상황
// Q2. 아이행복카드(국민행복카드) 발급 조건을 확인하고, 하나카드 앱이나 지점에서 신청을 완료한다
// Q3. 발급 대상(만0~5세 자녀), 바우처 종류(보육료·유아학비·임신바우처 등), 하나카드 혜택, 발급·갱신 방법, 타 카드사 비교
// Q4. Steps(발급 절차) + GreenBox(바우처 혜택 요약) + BorderBox(지원 금액) + Checklist(발급 전 확인) + FAQ
// MAP-INTRO: 아이 어린이집 보내려면 아이행복카드가 필요하다는데, 어떻게 만드는지 모르겠죠
// MAP-TYPE: 절차
// MAP-H2: 아이행복카드가 뭔가 > 어떤 바우처를 받을 수 있나 > 하나카드로 어떻게 발급하나 > 갱신은 어떻게 하나 > FAQ
// MAP-COMP: GreenBox > BorderBox > Steps > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "복지로에서 바우처 자격을 먼저 신청하세요",
    desc: "아이행복카드를 만들기 전에 복지로(bokjiro.go.kr) 또는 주민센터에서 보육료·유아학비 지원 신청을 해야 해요. 자격이 확인되면 바우처가 배정되고, 그다음에 카드를 발급받는 순서예요.",
    tip: "주민센터 방문 시 아동 건강보험증 지참",
  },
  {
    title: "하나카드 앱 또는 지점에서 신청하세요",
    desc: "하나카드 앱에서 '국민행복카드'를 검색하면 신청 화면이 나와요. 온라인으로 본인인증 후 바로 신청할 수 있고, 카드는 등기우편으로 7~10일 안에 도착해요. 지점 방문 시 신분증만 있으면 돼요.",
    tip: "체크카드·신용카드 중 선택 가능",
  },
  {
    title: "카드 수령 후 어린이집·유치원에 등록하세요",
    desc: "카드가 도착하면 어린이집이나 유치원에 카드 번호를 알려주면 돼요. 보육료·학비가 매월 자동으로 바우처에서 결제되고, 부모 부담금만 별도로 납부하면 돼요.",
    tip: "카드 뒷면 바우처 번호 또는 카드 번호 제출",
  },
];

const CHECKLIST_ITEMS = [
  "복지로에서 보육료·유아학비 지원 자격 신청 완료",
  "자녀 나이 만 0~5세(취학 전) 확인",
  "건강보험 자격 확인 (직장가입자 또는 지역가입자)",
  "기존 아이행복카드 있는지 확인 / 있으면 국민행복카드로 갱신",
  "하나카드 외 타 카드사(국민·신한·롯데 등) 혜택 비교",
];

const FAQS = [
  { q: "아이행복카드랑 국민행복카드는 같은 건가요?", a: "2021년부터 아이행복카드가 국민행복카드로 통합됐어요. 기존 아이행복카드도 유효기간까지는 쓸 수 있지만, 신규 발급은 국민행복카드로만 돼요. 기능은 동일하고 보육료·유아학비·임신바우처 등을 한 장으로 관리할 수 있어요." },
  { q: "하나카드 말고 다른 카드사도 되나요?", a: "네, 국민·신한·롯데·우리·농협·BC카드 등에서도 발급돼요. 카드사마다 바우처 외 일반 결제 혜택(할인·포인트)이 다르니까 비교해서 선택하세요. 바우처 지원 금액 자체는 카드사와 무관하게 동일해요." },
  { q: "체크카드랑 신용카드 중 뭐가 나은가요?", a: "바우처 결제만 할 거라면 체크카드로 충분해요. 신용카드를 선택하면 일반 결제에서 할인·포인트 혜택을 추가로 받을 수 있지만, 연회비가 있을 수 있어요. 하나카드 국민행복카드는 연회비 없는 체크형이 기본이에요." },
  { q: "카드를 분실하면 어떻게 하나요?", a: "하나카드 고객센터(1800-1111)에 분실 신고 후 재발급 신청하면 돼요. 앱에서도 분실 신고와 재발급이 가능하고요. 재발급까지 보통 7~10일 걸리는데, 그동안 바우처 결제는 어린이집에 사정을 말하면 나중에 정산할 수 있어요." },
  { q: "임신 바우처도 이 카드로 받나요?", a: "네, 국민행복카드 한 장으로 임신·출산 진료비 바우처(100만원), 첫만남 이용권(200만원), 보육료·유아학비 전부 받을 수 있어요. 임신 확인 후 복지로에서 바우처를 신청하면 카드에 금액이 충전돼요." },
  { q: "유효기간이 지나면 갱신해야 하나요?", a: "네, 카드 유효기간(보통 5년)이 지나면 갱신 발급을 받아야 해요. 하나카드 앱에서 갱신 신청을 하거나, 고객센터에 전화하면 돼요. 바우처 잔액은 갱신 카드로 자동 이전되니까 걱정 안 해도 돼요." },
];

const REFS = [
  { category: "신청", items: [
    { label: "복지로 - 보육료 지원", url: "https://www.bokjiro.go.kr" },
    { label: "아이사랑 - 국민행복카드 안내", url: "https://www.childcare.go.kr" },
    { label: "하나카드 - 국민행복카드", url: "https://www.hanacard.co.kr" },
  ]},
];

const RELATED = [
  { title: "긴급복지 생계지원금 신청", slug: "긴급복지-생계지원금-신청-방법", description: "" },
  { title: "미환급금 조회 방법", slug: "미환급금-조회-정부24-환급금-찾기", description: "" },
  { title: "예금자보호제도", slug: "예금자보호제도", description: "" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지·바우처</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        하나카드 아이행복카드, 어떻게 만드나?{"\n"}
        <span style={{ fontSize: 19, fontWeight: 500, color: "#374151" }}>발급부터 바우처 혜택까지</span>
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이 어린이집 보내려면 아이행복카드(국민행복카드)가 필요하다는데, 어떻게 만드는지 모르겠죠.
        복지로에서 보육료 지원 신청 → 하나카드 앱에서 카드 발급 순서로 진행하면 돼요.
        보육료, 유아학비, 임신바우처까지 한 장으로 관리할 수 있어요.
      </p>
      <Divider />

      <H2>아이행복카드가 뭔가요?</H2>
      <p style={body}>
        아이행복카드는 정부가 지원하는 보육료·유아학비를 결제하기 위한 전용 바우처 카드예요.
        2021년부터 국민행복카드로 통합됐고, 기존 기능은 그대로 유지돼요.
        만 0세부터 만 5세(취학 전) 자녀를 둔 부모가 발급받을 수 있어요.
      </p>
      <GreenBox title="국민행복카드 바우처 종류">
        보육료(어린이집): 만 0~2세 전액, 만 3~5세 누리과정 지원.
        유아학비(유치원): 만 3~5세 월 28만원.
        임신·출산 진료비: 100만원(다태아 140만원).
        첫만남 이용권: 200만원(출생 시 1회).
        아이돌봄 서비스 바우처.
      </GreenBox>
      <p style={body}>
        카드 한 장으로 여러 바우처를 관리할 수 있어서 편리해요.
        바우처별로 사용처가 정해져 있고, 잔액은 앱에서 확인할 수 있어요.
      </p>
      <Divider />

      <ArticleAd position="mid" />

      <H2>어떤 바우처를 받을 수 있나요?</H2>
      <p style={body}>
        자녀 나이와 상황에 따라 받을 수 있는 바우처가 달라져요.
        보육료·유아학비는 소득과 무관하게 전 계층에 지원되고, 임신바우처는 임신 확인만 하면 받을 수 있어요.
      </p>
      <SectionBadge>지원 금액</SectionBadge>
      <BorderBox title="주요 바우처별 지원 금액 (2026년 기준)">
        <p style={{ ...body, marginBottom: 6 }}><strong>만 0세 보육료</strong>: 월 54만 6,000원</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>만 1세 보육료</strong>: 월 48만 1,000원</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>만 2세 보육료</strong>: 월 39만 8,000원</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>만 3~5세 누리과정</strong>: 월 28만원</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>임신·출산 진료비</strong>: 100만원 (다태아 140만원)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>첫만남 이용권</strong>: 200만원 (출생 시 1회)</p>
      </BorderBox>
      <p style={body}>
        보육료 금액은 매년 조금씩 인상돼요. 정확한 금액은 복지로에서 확인하세요.
        어린이집 종류(국공립·민간·가정)에 따라 부모 부담금이 달라질 수 있어요.
      </p>
      <Divider />

      <H2>하나카드로 어떻게 발급하나요?</H2>
      <p style={body}>
        발급은 복지로 자격 신청 → 카드 발급 순서로 진행돼요.
        복지로에서 보육료 지원 자격이 확인돼야 카드 발급이 가능해요.
        하나카드 앱에서 간편하게 신청할 수 있어요.
      </p>
      <SectionBadge>발급 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <p style={body}>
        카드 종류는 체크카드와 신용카드 중 선택할 수 있어요.
        바우처 결제만 할 거라면 체크카드로 충분하고, 일반 결제 혜택까지 원하면 신용카드를 골라도 돼요.
      </p>
      <Divider />

      <H2>발급 전 꼭 확인하세요</H2>
      <p style={body}>
        카드 발급 전에 아래 항목을 미리 확인해 두면 신청이 빨라져요.
        특히 복지로 자격 신청을 먼저 해야 한다는 점을 놓치는 경우가 많아요.
      </p>
      <SectionBadge>확인 사항</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />
      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 보건복지부·하나카드 자료를 바탕으로 작성했어요. 바우처 금액·혜택은 변동될 수 있으니 복지로와 카드사에서 확인하세요." />

      <CategoryButton label="복지·바우처" href="/categories/welfare" />
      <RelatedArticles items={RELATED} />
    </div>
  );
}
