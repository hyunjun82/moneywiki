"use client";

// Q1: 해고 서면 통보 의무: 효력 및 통보 방식별 차이 info
// Q2: 해고 시 사용자는 서면으로 해고 사유와 시기를 명시해 통지해야 법적 효력 발생
// Q3: 해고 시 사용자는 서면으로 해고 사유와 시기를 명시해 통지해야 법적 효력 발생, 구두 해고나 카톡 통보는 법적 효력 없으며, 증거로만 활용 가능, 서면 미통지 시 부당해고 구제신청 가능, 해고일로부터 3개월 내 노동위원회 신청
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "해고 시 사용자는 서면으로 해고 사유와 시기를 명시해 통지해야 법적 효력 발생",
  "구두 해고나 카톡 통보는 법적 효력 없으며, 증거로만 활용 가능",
  "서면 미통지 시 부당해고 구제신청 가능, 해고일로부터 3개월 내 노동위원회 신청"
];

const FAQS = [
  { q: "해고 서면 통보는 왜 필수인가요?", a: "근로기준법 제27조에서 서면 통지를 의무화하고 있어요. 서면 없이 해고하면 절차상 부당해고로 무효가 될 수 있어요." },
  { q: "카톡으로 해고 통보받았는데 유효한가요?", a: "아니요, 무효예요. 카톡은 증거로 활용할 수 있지만 정식 해고 통지는 아니에요. 반드시 서명이나 날인이 있는 종이 문서를 받아야 해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "근로기준법", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부", url: "https://www.moel.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해고 서면 통보 의무<br />
        효력 및 통보 방식별 차이
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해고 서면 안 받았다면 그 해고는 무효라는 거 아시나요? 근로기준법 제27조에서 서면 통지 의무를 정하고 구두·카톡 통보는 효력이 없어요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>해고 시 사용자는 서면으로 해고 사유와 시기를 명시해 </H2>
      <p style={body}>해고 시 사용자는 서면으로 해고 사유와 시기를 명시해 통지해야 법적 효력 발생</p>
      <GreenBox title="핵심 정리">
        해고 시 사용자는 서면으로 해고 사유와 시기를 명시해 통지해야 법적 효력 발생<br />
        구두 해고나 카톡 통보는 법적 효력 없으며, 증거로만 활용 가능<br />
        서면 미통지 시 부당해고 구제신청 가능, 해고일로부터 3개월 내 노동위원회 신청
      </GreenBox>

      <CategoryButton label="근로 · 노동 정보" count={5} href="/category/근로/노동" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
