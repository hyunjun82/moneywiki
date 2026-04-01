"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 연말정산 체크카드 info
// Q2: 체크카드는 30% 공제율로 신용카드 15%보다 2배 유리해요.
// Q3: 체크카드는 30% 공제율로 신용카드 15%보다 2배 유리해요., 총급여 25% 초과 사용액부터 공제받아요., 연간 한도는 300만원까지예요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "체크카드는 30% 공제율로 신용카드 15%보다 2배 유리해요.",
  "총급여 25% 초과 사용액부터 공제받아요.",
  "연간 한도는 300만원까지예요."
];

const FAQS = [
  { q: "체크카드가 신용카드보다 유리한가요?", a: "네, 체크카드는 30% 공제율로 신용카드 15%보다 2배 높아요." },
  { q: "체크카드만 써도 되나요?", a: "총급여 25%는 신용카드로 채우고, 이후부터 체크카드 쓰는 게 유리해요." },
  { q: "체크카드 한도가 있나요?", a: "네, 연간 300만원까지 소득공제받을 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
      { label: "조세특례제한법", url: "https://www.law.go.kr/법령/조세특례제한법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 체크카드
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        체크카드는 신용카드보다 공제율이 2배 높아요. 신용카드 15%보다 체크카드는 30% 소득공제받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>체크카드는 30% 공제율로 신용카드 15%보다 2배 유</H2>
      <p style={body}>체크카드는 30% 공제율로 신용카드 15%보다 2배 유리해요.</p>
      <GreenBox title="핵심 정리">
        체크카드는 30% 공제율로 신용카드 15%보다 2배 유리해요.<br />
        총급여 25% 초과 사용액부터 공제받아요.<br />
        연간 한도는 300만원까지예요.
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
      <Disclaimer text="이 글은 2025년 귀속 체크카드 공제 정보 반영 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
