"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 연말정산 장애인 공제 info
// Q2: 장애인 부양가족 1인당 200만원 추가 소득공제, 세금 약 48만원 돌려받아요.
// Q3: 장애인 부양가족 1인당 200만원 추가 소득공제, 세금 약 48만원 돌려받아요., 기본공제 150만원까지 합치면 350만원 공제, 최대 84만원 환급이에요., 암·치매·중풍 환자도 장애인증명서 있으면 공제돼요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "장애인 부양가족 1인당 200만원 추가 소득공제, 세금 약 48만원 돌려받아요.",
  "기본공제 150만원까지 합치면 350만원 공제, 최대 84만원 환급이에요.",
  "암·치매·중풍 환자도 장애인증명서 있으면 공제돼요."
];

const FAQS = [
  { q: "장애인 공제 대상에 나이 제한이 있나요?", a: "아니요, 장애인인 경우 나이 제한 없이 기본공제 및 추가공제를 받을 수 있어요." },
  { q: "암환자도 장애인 공제를 받을 수 있나요?", a: "네, 암, 치매, 중풍 등 항시 치료를 요하는 중증환자는 장애인증명서로 공제받을 수 있어요." },
  { q: "장애인등록증이 없으면 공제 못 받나요?", a: "아니요, 의료기관의 장애인증명서로도 가능해요. 세법상 장애인은 범위가 넓어요." },
  { q: "경로우대 공제랑 중복 적용 되나요?", a: "네. 75세 장애인 어머니면 기본공제 150만원 + 경로우대 100만원 + 장애인 200만원 = 450만원 공제돼요." },
  { q: "의료비 한도도 달라지나요?", a: "네. 일반 부양가족 의료비는 700만원 한도인데, 장애인 의료비는 한도 없이 전액 공제돼요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 연말정산 인적공제", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
      { label: "소득세법 제51조", url: "https://www.law.go.kr/법령/소득세법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 장애인 공제
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        장애인 부양가족 1명당 최대 84만원 돌려받아요. 암·치매 환자도 장애인증명서 있으면 공제돼요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>장애인 부양가족 1인당 200만원 추가 소득공제, 세금</H2>
      <p style={body}>장애인 부양가족 1인당 200만원 추가 소득공제, 세금 약 48만원 돌려받아요.</p>
      <GreenBox title="핵심 정리">
        장애인 부양가족 1인당 200만원 추가 소득공제, 세금 약 48만원 돌려받아요.<br />
        기본공제 150만원까지 합치면 350만원 공제, 최대 84만원 환급이에요.<br />
        암·치매·중풍 환자도 장애인증명서 있으면 공제돼요.
      </GreenBox>

      <CategoryButton label="세금 · 연말정산 정보" count={5} href="/category/연말정산" />
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
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
