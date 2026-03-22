"use client";

// Q1. 전월세 계약을 했는데 신고를 안 해서 과태료가 걱정되는 상황
// Q2. 과태료 금액을 확인하고, 자진신고로 감경받거나 기한 내 신고를 마친다
// Q3. 신고 대상 기준(보증금 6천만원 초과/월세 30만원 초과), 과태료 금액, 감경 방법, 신고 방법
// Q4. DocTable(과태료 기준표) + Steps(신고 절차) + GreenBox(감경 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const PENALTY_TABLE = {
  headers: ["위반 횟수", "지연 1개월 이내", "지연 3개월 이내", "지연 3개월 초과"],
  rows: [
    ["1차", "4만원", "10만원", "30만원"],
    ["2차", "7만원", "20만원", "50만원"],
    ["3차 이상", "10만원", "30만원", "100만원"],
  ],
};

const STEPS_DATA = [
  { title: "신고 대상 확인", desc: "보증금 6천만원 초과 또는 월세 30만원 초과 계약이면 신고 대상이에요. 둘 중 하나만 해당해도 신고해야 해요." },
  { title: "계약일로부터 30일 이내 신고", desc: "주민센터 방문 또는 부동산거래관리시스템(rtms.molit.go.kr)에서 온라인 신고해요. 임대인·임차인 공동 신고가 원칙이에요." },
  { title: "확정일자 자동 부여", desc: "전월세 신고를 하면 확정일자가 자동으로 부여돼요. 별도로 주민센터에 갈 필요가 없어요." },
];

const FAQS = [
  { q: "자진신고하면 과태료가 줄어드나요?", a: "네. 적발 전에 자진신고하면 과태료가 50% 감경돼요. 1차 위반 3개월 이내 자진신고면 10만원이 5만원으로 줄어요." },
  { q: "임대인만 신고해도 되나요?", a: "원칙은 임대인·임차인 공동 신고예요. 하지만 한 쪽이 단독으로 해도 수리(접수)되는 경우가 많아요. 상대방이 협조하지 않으면 단독 신고 후 자치구에 문의하세요." },
  { q: "갱신 계약도 신고해야 하나요?", a: "보증금이나 월세가 변경되면 신고해야 해요. 금액 변동 없이 자동 갱신된 경우에는 신고 의무가 없어요." },
  { q: "과태료를 안 내면 어떻게 되나요?", a: "납부 기한 내에 안 내면 가산금이 붙고, 체납 시 강제징수(급여·예금 압류)가 될 수 있어요." },
  { q: "신고 대상이 아닌 계약은 뭔가요?", a: "보증금 6천만원 이하이면서 월세 30만원 이하인 계약은 신고 대상이 아니에요. 비주거용(상가·사무실)도 주택 전월세 신고 대상이 아니에요." },
];

const SOURCES = [
  { name: "부동산 거래신고 등에 관한 법률", href: "https://www.law.go.kr/법령/부동산거래신고등에관한법률" },
  { name: "국토교통부 부동산거래신고제", href: "https://www.molit.go.kr" },
];

const RELATED = [
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "매매·전월세 거래신고 절차." },
  { slug: "임대차-계약기간-중-집주인-변경-퇴거", title: "계약 중 집주인 변경 시 대응", description: "집주인이 바뀌었을 때 임차인 권리." },
  { slug: "우선변제권-요건", title: "우선변제권 요건", description: "보증금을 우선 돌려받을 수 있는 조건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 신고</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전월세신고 안 하면 과태료 얼마?<br />
        금액 기준과 감경 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>전월세 계약하고 신고를 깜빡했는데, 과태료가 나올까 걱정되죠.</p>
      <p style={body}>보증금 6천만원 초과 또는 월세 30만원 초과 계약은 <a href="https://www.law.go.kr/법령/부동산거래신고등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산 거래신고법</a>에 따라 30일 이내에 신고해야 해요. 안 하면 4만~100만원 과태료가 부과돼요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>과태료 금액은 이렇게 돼요</H2>
      <p style={body}>위반 횟수와 지연 기간에 따라 달라져요.</p>
      <SectionBadge>전월세 미신고 과태료</SectionBadge>
      <DocTable headers={PENALTY_TABLE.headers} rows={PENALTY_TABLE.rows} />
      <p style={body}>자진신고하면 50% 감경되니, 늦었더라도 바로 신고하는 게 유리해요.</p>

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>과태료 줄이는 방법</H2>
      <p style={body}>이미 기한이 지났어도 방법이 있어요.</p>
      <GreenBox title="과태료 감경 방법">
        적발 전 자진신고 → 50% 감경{"\n"}
        경제적 어려움 소명 → 추가 감경 가능{"\n"}
        과태료 부과 후 60일 이내 이의신청 가능
      </GreenBox>
      <Divider />

      <H2>전월세 신고 방법</H2>
      <p style={body}>아직 신고 전이라면 지금 바로 하세요.</p>
      <SectionBadge>신고 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>전월세 신고와 과태료에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 부동산 거래신고법을 바탕으로 작성했어요. 과태료 기준은 자치구별로 다를 수 있으니, 관할 주민센터에서 확인하세요." />
    </ArticleLayout>
  );
}
