"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 등기부 주민등록 주소 다를 때 대항력 info
// Q2: 등기부 주소와 주민등록 주소가 다르면 대항력 발생 안 됨, 정확한 주소 일치 필수
// Q3: 등기부 주소와 주민등록 주소가 다르면 대항력 발생 안 됨, 정확한 주소 일치 필수, 현관문 호수와 등기부 호수가 다르면 즉시 등기부 확인하고 주민등록 정정 필요, 대항력은 실제 주택 인도+주민등록으로 발생, 다음 날 0시부터 효력
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "등기부 주소와 주민등록 주소가 다르면 대항력 발생 안 됨, 정확한 주소 일치 필수",
  "현관문 호수와 등기부 호수가 다르면 즉시 등기부 확인하고 주민등록 정정 필요",
  "대항력은 실제 주택 인도+주민등록으로 발생, 다음 날 0시부터 효력"
];

const FAQS = [
  { q: "현관문 호수랑 등기부 호수가 다른데 어떻게 해요?", a: "등기부등본을 먼저 확인하세요. 등기부가 정확한 기준이에요. 주민등록은 등기부 주소에 맞춰서 해야 대항력이 생겨요." },
  { q: "잘못된 호수로 전입신고했는데 대항력 있나요?", a: "아니요, 없어요. 대항력은 정확한 주소로 주민등록했을 때만 인정돼요. 즉시 주민센터에서 정정하세요." },
  { q: "가족만 주민등록 남기고 저만 전출하면요?", a: "가족 중 누군가라도 주민등록이 유지되면 대항력은 계속 유지돼요. 임차인과 배우자, 자녀 모두 인정되거든요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "찾기쉬운 생활법령정보", url: "https://easylaw.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        등기부 주민등록 주소 다를 때 대항력
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        현관문 호수랑 등기부 호수가 다른데 전세 대항력 인정되는지 걱정되시죠
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>등기부 주소와 주민등록 주소가 다르면 대항력 발생 안 </H2>
      <p style={body}>등기부 주소와 주민등록 주소가 다르면 대항력 발생 안 됨, 정확한 주소 일치 필수</p>
      <GreenBox title="핵심 정리">
        등기부 주소와 주민등록 주소가 다르면 대항력 발생 안 됨, 정확한 주소 일치 필수<br />
        현관문 호수와 등기부 호수가 다르면 즉시 등기부 확인하고 주민등록 정정 필요<br />
        대항력은 실제 주택 인도+주민등록으로 발생, 다음 날 0시부터 효력
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
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
