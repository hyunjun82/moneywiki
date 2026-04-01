"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 아파트 하자보수 청구기간 타일 벽 균열 기준 info
// Q2: 타일공사의 하자담보책임기간은 2년이며, 입주자에게 인도한 날부터 기산해요
// Q3: 타일공사의 하자담보책임기간은 2년이며, 입주자에게 인도한 날부터 기산해요, 벽 균열은 0.3mm 이상이면 하자로 인정되고, 0.3mm 미만이어도 누수·철근배열·관통균열은 하자예요, 입주자, 입주자대표회의, 관리주체가 사업주체에게 하자보수를 청구할 수 있어요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "타일공사의 하자담보책임기간은 2년이며, 입주자에게 인도한 날부터 기산해요",
  "벽 균열은 0.3mm 이상이면 하자로 인정되고, 0.3mm 미만이어도 누수·철근배열·관통균열은 하자예요",
  "입주자, 입주자대표회의, 관리주체가 사업주체에게 하자보수를 청구할 수 있어요"
];

const FAQS = [
  { q: "아파트 하자보수 청구 누가 할 수 있나요?", a: "입주자 본인, 입주자대표회의, 관리주체(관리사무소), 관리단이 사업주체(시공사)에게 청구할 수 있어요." },
  { q: "하자보수 기간 지나면 절대 못 받나요?", a: "하자담보책임기간이 지나도 시공사의 과실이 명백하고 하자가 중대하면 민법상 손해배상 청구를 할 수 있어요." },
  { q: "타일 일부만 떨어져도 하자 인정되나요?", a: "네, 타일에 균열·파손·탈락·들뜸이 확인되면 시공하자로 봐요. 면적이나 개수와 무관해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "공동주택하자의조사,보수비용산정및하자판정기준", url: "https://www.law.go.kr/행정규칙/공동주택하자의조사,보수비용산정및하자판정기준" },
      { label: "찾기쉬운 생활법령정보 - 아파트 하자담보책임", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1222&ccfNo=3&cciNo=1&cnpClsNo=1" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파트 하자보수 청구기간 타일 벽 균열 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        새 아파트 화장실 타일이 떨어지고 벽에 금이 가는데, 언제까지 하자보수를 청구할 수 있는지 궁금하신가요?
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>타일공사의 하자담보책임기간은 2년이며, 입주자에게 인도</H2>
      <p style={body}>타일공사의 하자담보책임기간은 2년이며, 입주자에게 인도한 날부터 기산해요</p>
      <GreenBox title="핵심 정리">
        타일공사의 하자담보책임기간은 2년이며, 입주자에게 인도한 날부터 기산해요<br />
        벽 균열은 0.3mm 이상이면 하자로 인정되고, 0.3mm 미만이어도 누수·철근배열·관통균열은 하자예요<br />
        입주자, 입주자대표회의, 관리주체가 사업주체에게 하자보수를 청구할 수 있어요
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
