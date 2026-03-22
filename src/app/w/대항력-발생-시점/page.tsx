"use client";

// Q1. 전세 계약 후 대항력이 언제 생기는지, 보증금을 지킬 수 있는 시점이 궁금한 상황이에요.
// Q2. 전입신고와 점유 시점을 맞춰서 대항력을 확보하는 행동.
// Q3. 전입신고 다음 날 0시 발생, 점유+전입 동시 필요, 확정일자와의 차이, 전세사기 예방.
// Q4. GreenBox(핵심 시점) + Steps(대항력 확보 절차) + BorderBox(확정일자 차이) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const SECURE_STEPS = [
  { title: "임대차 계약 체결", desc: "전세 계약서를 작성해요." },
  { title: "이사 (점유 개시)", desc: "실제로 짐을 옮기고 거주를 시작해요.", tip: "점유가 없으면 대항력이 안 생겨요" },
  { title: "전입신고", desc: "주민센터 또는 정부24에서 전입신고해요.", tip: "이사 당일에 하는 게 가장 안전" },
  { title: "확정일자 받기", desc: "주민센터에서 계약서에 확정일자 도장을 받아요.", tip: "대항력과 별개로 우선변제권 확보" },
];

const FAQS = [
  { q: "대항력은 정확히 언제 생기나요?", a: "전입신고 다음 날 0시에 생겨요. 오늘 전입신고하면 내일 0시부터 대항력이 있는 거예요." },
  { q: "이사만 하고 전입신고를 안 하면요?", a: "대항력이 안 생겨요. 점유(거주)와 전입신고 두 가지가 동시에 갖춰져야 해요." },
  { q: "대항력과 확정일자는 뭐가 다른가요?", a: "대항력은 새 집주인에게 '나 여기 살고 있어요'라고 주장할 수 있는 힘이에요. 확정일자는 경매 시 보증금을 우선 돌려받을 수 있는 순위를 정하는 거예요." },
  { q: "잔금 날과 전입신고 날이 다르면 위험한가요?", a: "위험할 수 있어요. 잔금 당일에 바로 이사하고 전입신고하는 게 가장 안전해요. 간격이 벌어지면 그 사이에 근저당이 설정될 수 있거든요." },
  { q: "전세사기 예방과 대항력은 어떤 관계인가요?", a: "대항력이 있어야 집이 경매로 넘어가도 보증금을 지킬 수 있어요. 확정일자까지 받으면 우선변제권도 생겨서 더 안전해요." },
  { q: "법인 임대인이면 대항력에 영향이 있나요?", a: "임대인이 법인이든 개인이든 대항력 요건은 같아요. 점유 + 전입신고면 돼요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "주택임대차보호법(법제처)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
];

const RELATED = [
  { slug: "원룸-전세계약-주의사항", title: "원룸 전세계약 주의사항", description: "전세 계약 전 확인해야 할 체크리스트예요." },
  { slug: "전세-보증금-보호-대항력-확정일자", title: "전세 보증금 보호 방법", description: "대항력과 확정일자로 보증금을 지키는 방법이에요." },
  { slug: "전세-아파트-관리비-반환-이사", title: "전세 아파트 관리비 반환", description: "이사할 때 관리비 정산 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대항력은 정확히 언제 생기나요?<br />
        전입신고 시점과 보증금 보호
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약하고 이사했는데, 내 보증금이 안전한 건지 불안하죠? 대항력은 이사(점유)하고 전입신고한 다음 날 0시에 생겨요.
        이 두 가지를 같은 날에 끝내야 빈틈이 없어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />

      <H2>대항력, 전입신고 다음 날 0시에 생겨요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제3조</a>에 따르면
        임차인이 주택을 인도받고(이사) 전입신고를 마치면, 그 다음 날 0시부터 대항력이 발생해요.
      </p>
      <GreenBox title="대항력 발생 조건">
        · 점유(실제 거주) + 전입신고 = 다음 날 0시 대항력 발생<br />
        · 둘 중 하나라도 없으면 대항력 없음<br />
        · 잔금일 당일에 이사 + 전입신고가 가장 안전
      </GreenBox>

      <Divider />
      <H2>대항력 확보, 이 순서로 하세요</H2>
      <Steps steps={SECURE_STEPS} />
      <p style={body}>
        잔금 당일에 이사와 전입신고를 동시에 끝내는 게 핵심이에요. 하루라도 간격이 벌어지면 그 사이에 근저당이 잡힐 위험이 생겨요.
      </p>

      <Divider />
      <H2>확정일자는 따로 받아야 하나요?</H2>
      <p style={body}>
        대항력만으로는 경매 시 보증금 순위가 보장되지 않아요. 확정일자를 받으면 우선변제권이 생겨서 경매 배당에서 순위를 인정받아요.
      </p>
      <BorderBox>
        <strong>대항력 vs 확정일자</strong><br /><br />
        · 대항력: 새 집주인에게 "나 여기 살아요" 주장 가능<br />
        · 확정일자: 경매 시 보증금 우선 돌려받을 순위 확보<br />
        · <strong>둘 다 갖춰야 보증금이 가장 안전해요</strong>
      </BorderBox>

      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 주택임대차보호법을 기준으로 작성됐어요. 구체적 사안은 법률구조공단(132)에서 상담받으세요." />
    </ArticleLayout>
  );
}
