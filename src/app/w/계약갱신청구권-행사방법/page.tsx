"use client";

// Q1: 전세·월세 계약 만료 앞두고 계약갱신청구권을 쓸 수 있는지, 어떻게 행사하는지 궁금한 세입자
// Q2: 계약갱신청구권 행사 요건을 확인하고 집주인에게 갱신 요구
// Q3: 1회 행사 가능(2+2년), 행사 시기(만료 6~2개월 전), 거절 사유 8가지, 5% 상한, 서면 통지
// Q4: Steps(행사 절차) + GreenBox(핵심 요건) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "행사 가능 여부 확인", desc: "최초 계약 또는 갱신 계약 체결 후 1회만 사용 가능해요. 이미 한 번 갱신청구권을 행사했다면 두 번째는 안 돼요.", tip: "2020년 7월 31일 이후 계약부터 적용돼요" },
  { title: "만료 6~2개월 전에 통지", desc: "계약 만료일 6개월 전부터 2개월 전 사이에 집주인에게 갱신을 요구해요. 이 기간을 놓치면 행사할 수 없어요." },
  { title: "서면(내용증명)으로 통지", desc: "구두로 해도 법적으로 유효하지만, 분쟁 대비를 위해 내용증명 우편으로 보내는 게 안전해요.", tip: "우체국에서 내용증명 발송 (3,000원 내외)" },
  { title: "집주인 답변 확인", desc: "집주인이 정당한 거절 사유 없이 거부하면 갱신된 것으로 간주돼요. 거절 사유가 있으면 법적 유효성을 따져야 해요." },
];

const CHECKLIST = [
  "첫 번째 갱신청구권 행사인지 확인 (1회만 가능)",
  "계약 만료 6~2개월 전 기간인지 확인",
  "임대료 체납 없는지 확인 (2기분 이상 체납 시 거절 가능)",
  "내용증명으로 갱신 요구 발송",
  "임대료 인상은 5% 이내인지 확인",
  "집주인의 거절 사유가 8가지 법정 사유에 해당하는지 확인",
];

const FAQS = [
  { q: "계약갱신청구권은 몇 번 쓸 수 있나요?", a: "1회만 쓸 수 있어요. 최초 2년 + 갱신 2년 = 최대 4년 거주가 가능해요." },
  { q: "집주인이 거절할 수 있는 사유가 뭔가요?", a: "8가지 법정 사유가 있어요. 2기분 이상 임대료 체납, 집주인 본인 실거주, 재건축·리모델링 등이에요. 사유 없이 거부하면 갱신된 것으로 봐요." },
  { q: "갱신 때 임대료를 얼마나 올릴 수 있나요?", a: "직전 임대료의 5% 이내에서만 올릴 수 있어요. 5%를 초과하는 인상은 무효예요." },
  { q: "묵시적 갱신과 계약갱신청구권은 다른 건가요?", a: "네, 달라요. 묵시적 갱신은 아무도 이의를 제기하지 않아 자동 갱신되는 거고, 갱신청구권은 세입자가 적극적으로 요구하는 거예요. 묵시적 갱신으로는 갱신청구권을 소진하지 않아요." },
  { q: "갱신 후 중도해지할 수 있나요?", a: "갱신청구권으로 갱신한 뒤에도 세입자는 언제든 중도해지할 수 있어요. 해지 통보 후 3개월이 지나면 효력이 발생해요." },
  { q: "내용증명 없이 구두로 통지해도 되나요?", a: "법적으로는 가능하지만, 나중에 분쟁이 생기면 증거가 없어요. 내용증명으로 보내는 게 안전해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "주택임대차보호법 제6조의3 (계약갱신청구권)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
];

const RELATED = [
  { slug: "계약갱신청구권-재계약-거절-사유", title: "갱신청구권 거절 사유", description: "집주인이 갱신을 거절할 수 있는 8가지 사유예요." },
  { slug: "계약갱신청구권-중도해지", title: "갱신 후 중도해지", description: "갱신청구권 행사 후 중도해지하는 방법이에요." },
  { slug: "묵시적갱신-중도해지-2년전-불가", title: "묵시적 갱신과 중도해지", description: "묵시적 갱신 시 해지 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약갱신청구권, 언제 어떻게 행사하나?<br />
        요건·시기·거절 사유와 5% 상한
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 만기가 다가오는데 2년 더 살고 싶다면 계약갱신청구권을 행사할 수 있어요.
        주택임대차보호법에 따라 세입자는 1회 갱신을 요구할 수 있고, 집주인은 법정 사유 없이 거절할 수 없어요.
        임대료 인상도 5% 이내로 제한돼요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>행사 요건 핵심 정리</H2>
      <p style={body}>갱신청구권을 쓰려면 시기와 조건을 정확히 맞춰야 해요.</p>
      <GreenBox title="갱신청구권 3대 요건">
        1회만 행사 가능 (최초 2년 + 갱신 2년 = 최대 4년)<br />
        만료 6~2개월 전에 통지 (기간 밖이면 행사 불가)<br />
        임대료 체납 2기분 미만 (체납 있으면 거절 가능)
      </GreenBox>

      <CategoryButton label="부동산·임대차 정보" count={8} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>갱신 요구 절차</H2>
      <p style={body}>내용증명으로 보내면 증거가 확실해요.</p>
      <Steps steps={STEPS} />
      <Divider />

      <H2>행사 전 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>하나라도 놓치면 행사가 무효가 될 수 있어요.</p>
      <SectionBadge>갱신청구권 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 주택임대차보호법을 바탕으로 작성됐어요. 갱신 거절 사유와 5% 상한 적용은 구체적 사안에 따라 다를 수 있어요." />
    </ArticleLayout>
  );
}
