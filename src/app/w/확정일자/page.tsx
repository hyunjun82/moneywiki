"use client";

// Q1: 전세·월세 계약 후 확정일자를 받아야 한다고 들었는데 어디서 어떻게 받는지 모르는 세입자
// Q2: 주민센터 또는 전월세신고를 통해 확정일자 받기
// Q3: 확정일자 의미(우선변제권), 전입신고와 차이, 비용 600원, 전월세신고 시 무료, 갱신 시 재발급 여부
// Q4: GreenBox(핵심 정의) + Steps(받는 절차) + BorderBox(전입신고 vs 확정일자) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "전입신고 먼저 완료", desc: "이사한 날부터 14일 이내에 주민센터에서 전입신고를 해요. 전입신고가 되어야 대항력이 생기고, 확정일자를 받으면 우선변제권까지 추가돼요.", tip: "정부24 앱에서 온라인 전입신고도 가능해요" },
  { title: "확정일자 받기 (3가지 방법)", desc: "방법 1: 주민센터에서 계약서 원본 제출 → 600원. 방법 2: 전월세신고하면 무료 자동 부여. 방법 3: 대법원 인터넷등기소에서 온라인 신청 600원." },
  { title: "확정일자 도장 확인", desc: "계약서에 날짜 도장이 찍혔는지 확인해요. 전월세신고로 받았으면 확정일자 부여증명서를 발급받아 보관하세요." },
];

const FAQS = [
  { q: "확정일자와 전입신고 차이가 뭔가요?", a: "전입신고는 대항력(새 집주인에게도 임대차를 주장할 권리), 확정일자는 우선변제권(경매 시 보증금을 먼저 받는 권리)이에요. 둘 다 해야 보증금을 완전히 지킬 수 있어요." },
  { q: "확정일자 없으면 어떻게 되나요?", a: "집이 경매에 넘어가면 다른 채권자보다 후순위가 돼서 보증금을 못 받을 수 있어요. 보증금을 지키려면 확정일자가 반드시 필요해요." },
  { q: "계약 갱신할 때 확정일자를 다시 받아야 하나요?", a: "묵시적 갱신이면 기존 확정일자가 유지돼요. 새 계약서를 작성했으면 새 계약서에 확정일자를 다시 받아야 해요." },
  { q: "전월세신고하면 확정일자가 자동으로 되나요?", a: "네, 전월세신고를 하면 확정일자가 무료로 자동 부여돼요. 별도로 주민센터에 가지 않아도 돼요." },
  { q: "확정일자 받는 데 비용이 얼마예요?", a: "주민센터나 인터넷등기소에서 받으면 600원이에요. 전월세신고를 하면 무료예요." },
  { q: "이사하고 한참 지났는데 지금이라도 받을 수 있나요?", a: "네, 언제든 받을 수 있어요. 다만 확정일자를 받은 날부터 우선변제권이 생기니까 빨리 받을수록 좋아요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
  { category: "서비스", items: [
    { label: "대법원 인터넷등기소 (온라인 확정일자)", url: "https://www.iros.go.kr" },
    { label: "정부24 전월세신고", url: "https://www.gov.kr" },
  ]},
];

const RELATED = [
  { slug: "오피스텔-임대차", title: "오피스텔 임대차", description: "오피스텔도 확정일자를 받으면 보호받아요." },
  { slug: "임대차계약서-작성법", title: "임대차계약서 작성법", description: "계약서 작성 시 주의할 점이에요." },
  { slug: "전세계약-특약사항", title: "전세계약 특약사항", description: "계약서에 꼭 넣어야 할 특약이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        확정일자, 왜 받아야 하고 어디서 받나?<br />
        우선변제권 효력과 발급 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약을 했는데 확정일자를 꼭 받아야 하냐고요? 네, 받아야 해요.
        확정일자는 경매 때 보증금을 먼저 받을 수 있는 권리(우선변제권)를 만들어 주는 거예요.
        비용은 600원이고, 전월세신고를 하면 무료로 자동 부여돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>확정일자가 뭐고, 왜 필요할까?</H2>
      <p style={body}>
        확정일자는 공적 기관이 계약서에 날짜 도장을 찍어주는 거예요.
        전입신고만 하면 대항력(임대차를 주장할 권리)만 생기는데, 확정일자까지 받으면 우선변제권(보증금을 먼저 받을 권리)이 추가돼요.
      </p>

      <GreenBox title="보증금 보호 3종 세트">
        전입신고 → 대항력 발생 (다음 날 0시부터)<br />
        확정일자 → 우선변제권 발생<br />
        실제 거주 → 두 권리 유지 조건<br />
        세 가지를 모두 갖춰야 보증금이 안전해요
      </GreenBox>

      <BorderBox>
        <strong>전입신고 vs 확정일자</strong><br />
        전입신고 = 새 집주인이 와도 "나 여기 살아요" 할 수 있는 권리 (대항력)<br />
        확정일자 = 경매 때 다른 채권자보다 보증금 먼저 받는 권리 (우선변제권)<br />
        둘 다 해야 완벽하게 보호받아요
      </BorderBox>

      <CategoryButton label="부동산·임대차 정보" count={8} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>확정일자 받는 절차</H2>
      <p style={body}>
        전입신고를 먼저 하고 확정일자를 받는 게 순서예요. 전월세신고를 하면 한 번에 끝낼 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 주택임대차보호법을 바탕으로 작성됐어요. 소액임차인 보호 기준과 우선변제 순위는 변경될 수 있으니 등기부등본을 꼭 확인해보세요." />
    </ArticleLayout>
  );
}
