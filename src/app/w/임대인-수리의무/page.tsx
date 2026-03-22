"use client";
// Q1. 전세/월세에 사는데 집이 고장났을 때 집주인이 고쳐줘야 하는지 궁금한 임차인
// Q2. 임대인 수리의무 범위를 파악하고, 수리를 요구하거나 스스로 수리 후 비용을 청구한다
// Q3. 민법 제623조(수선의무), 대수선 vs 소수선, 임차인 부담 범위, 비용상환청구권
// Q4. GreenBox(핵심 구분) + BorderBox(대수선/소수선 비교) + Steps(대응 방법) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
const STEPS = [
  { title: "수리가 필요한 사항을 임대인에게 통지하세요", desc: "보일러 고장, 누수, 배관 문제 등 대수선에 해당하는 하자가 발생하면 임대인에게 서면(문자, 카톡 등)으로 알려야 해요. 통지 증거를 남겨두세요." },
  { title: "임대인이 수리하지 않으면 직접 수리 후 비용을 청구하세요", desc: "통지 후 합리적 기간 내에 수리하지 않으면 임차인이 직접 수리하고 비용을 청구(필요비상환청구)할 수 있어요. 영수증과 사진을 보관하세요.", tip: "비용을 차임(월세)에서 공제할 수도 있어요" },
  { title: "분쟁이 해결 안 되면 분쟁조정위원회에 신청하세요", desc: "주택임대차분쟁조정위원회에 조정을 신청할 수 있어요. 무료이고 2개월 이내에 결론이 나요." },
];
const FAQS = [
  { q: "보일러 고장은 집주인이 고쳐줘야 하나요?", a: "네, 보일러는 대수선에 해당해서 임대인 수리의무예요. 노후로 인한 교체도 임대인 부담이에요." },
  { q: "형광등, 수도꼭지 같은 건 누가 고치나요?", a: "소수선에 해당하는 소모품 교체(형광등, 수도꼭지 패킹 등)는 임차인 부담이에요. 일상적 사용으로 인한 경미한 수리는 임차인이 해야 해요." },
  { q: "곰팡이가 생겼는데 누구 책임인가요?", a: "건물 구조적 결함(단열 부족, 방수 불량)으로 인한 곰팡이는 임대인 책임이에요. 환기 부족 같은 임차인 관리 소홀이면 임차인 부담일 수 있어요." },
  { q: "특약으로 수리의무를 임차인에게 전가할 수 있나요?", a: "소수선은 특약으로 임차인에게 전가할 수 있어요. 하지만 대수선까지 임차인에게 전가하는 특약은 무효로 판단되는 경우가 많아요." },
  { q: "수리비를 월세에서 빼도 되나요?", a: "대수선 비용을 임차인이 지출한 경우 필요비상환청구권에 따라 월세에서 공제할 수 있어요. 다만 분쟁을 피하려면 먼저 임대인에게 서면으로 공제 의사를 밝히세요." },
];
const SOURCES = [
  { name: "민법 제623조", href: "https://www.law.go.kr/법령/민법" },
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
];
const RELATED = [
  { slug: "집주인-변경-임차인-권리", title: "집주인 변경 시 임차인 권리", description: "소유자가 바뀌면 어떻게 되나." },
  { slug: "전세-보증금-반환-청구-절차", title: "보증금 반환 청구 절차", description: "보증금을 안 돌려줄 때 대응법." },
  { slug: "계약갱신청구권-실거주", title: "계약갱신청구권", description: "2년 더 살 수 있는 권리." },
];
export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대인 의무 · 수리</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>집 고장났는데, 집주인이 고쳐줘야 하나요?<br />임대인 수리의무의 범위와 대응</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"보일러가 고장났는데 집주인이 직접 고치라고 해요."</p>
      <p style={body}><a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제623조</a>에 따라 임대인은 임대 목적물을 <strong>사용·수익에 적합한 상태로 유지</strong>할 의무가 있어요. 보일러, 누수, 배관 같은 대수선은 집주인이 고쳐야 해요. 형광등, 수도꼭지 패킹 같은 소수선은 세입자 몫이에요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>대수선 vs 소수선, 뭐가 다르죠?</H2>
      <GreenBox title="임대인 수리의무 범위">{"임대인 책임 (대수선):\n· 보일러 고장·교체\n· 배관 누수, 하수구 막힘\n· 지붕·외벽 방수\n· 창문·현관문 교체\n· 구조적 곰팡이\n\n임차인 책임 (소수선):\n· 형광등, 전구 교체\n· 수도꼭지 패킹 교체\n· 벽지 오염(사용 중 발생)\n· 배수구 막힘(일상 사용)"}</GreenBox>
      <CategoryButton label="부동산 정보" count={18} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>집주인이 안 고쳐주면 이렇게 하세요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>특약이 있으면 어떻게 되나요?</H2>
      <BorderBox><strong>수리의무 특약 효력</strong>{"\n"}· 소수선 임차인 부담 특약 → 유효{"\n"}· 대수선 임차인 부담 특약 → 무효 가능성 높음{"\n"}{"\n"}대법원 판례: 주요 설비의 수선은 임대인의{"\n"}본질적 의무로, 특약으로 면제하기 어려움{"\n"}{"\n"}계약서에 "모든 수리는 임차인 부담"이라 돼 있어도{"\n"}보일러·배관·누수 등 대수선은 임대인 책임</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 민법 기준으로 작성했어요. 개별 사안에 따라 판단이 달라질 수 있으니 분쟁 시 법률 상담을 권해요." />
    </ArticleLayout>
  );
}
