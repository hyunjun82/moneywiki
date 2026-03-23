"use client";
// Q1. 경매로 집이 넘어갔는데 임대차계약이 어떻게 되는지 궁금한 임차인
// Q2. 경매 시 임대차계약의 존속 여부와 해지 가능 여부를 파악한다
// Q3. 대항력 있으면 계약 승계, 대항력 없으면 인수인에게 대항 불가, 해지권 행사 조건
// Q4. GreenBox(핵심 결론) + BorderBox(대항력 유무별 비교) + Steps(대응) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
const STEPS = [
  { title: "대항력이 있는지 확인하세요", desc: "전입신고 + 점유가 근저당 설정일보다 앞서면 대항력이 있어요. 대항력이 있으면 매수인에게 보증금을 청구할 수 있어요." },
  { title: "배당요구를 하세요", desc: "경매 배당절차에서 배당요구 종기일까지 권리신고를 해야 해요. 대항력이 있어도 배당요구를 안 하면 배당에서 빠질 수 있어요." },
  { title: "매수인과 계약 조건을 협의하세요", desc: "대항력이 있는 임차인이면 매수인이 임대차계약을 승계해요. 잔여 기간, 보증금 반환 시기 등을 매수인과 확인하세요." },
  { title: "대항력이 없다면 임차권등기명령을 검토하세요", desc: "대항력이 없어 경매에서 보호받지 못하면 잔여 보증금에 대해 전 임대인에게 청구할 수 있어요." },
];
const FAQS = [
  { q: "경매로 집이 넘어가면 나는 나가야 하나요?", a: "대항력이 있으면 매수인에게 보증금을 돌려받을 때까지 안 나가도 돼요. 대항력이 없으면 매수인의 인도명령에 따라 나가야 할 수 있어요." },
  { q: "대항력이 있으면 새 집주인이 계약을 이어받나요?", a: "네, 매수인이 임대인 지위를 승계해요. 잔여 기간과 보증금 반환 의무도 함께 넘어가요." },
  { q: "해지권이란 뭔가요?", a: "임차인이 경매로 대항력을 잃게 되는 경우, 임대차계약을 해지하고 보증금 반환을 청구할 권리예요. 배당에서 못 받은 금액은 전 임대인에게 청구할 수 있어요." },
  { q: "배당요구를 안 하면 어떻게 되나요?", a: "대항력이 있어도 배당요구를 안 하면 배당에서 빠져요. 이 경우 매수인에게 보증금 전액을 청구해야 하는데, 매수인이 거부하면 소송이 필요해요." },
  { q: "소액임차인이면 경매에서 먼저 받나요?", a: "소액임차인 최우선변제 요건을 갖추면 다른 채권자보다 먼저 일정 금액을 배당받아요. 배당요구 종기까지 권리신고해야 해요." },
];
const SOURCES = [
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
];
const RELATED = [
  { slug: "소액임차인-최우선변제권", title: "소액임차인 최우선변제", description: "경매에서 먼저 받을 수 있는 제도." },
  { slug: "경매-대금-납부-기한-소유권-취득", title: "경매 대금납부와 소유권 취득", description: "매각대금 납부 절차." },
  { slug: "전입신고-지연-대항력-상실", title: "전입신고 지연 대항력 상실", description: "전입신고가 늦으면 생기는 문제." },
];
export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>경매로 집이 넘어갔는데, 임대차계약은?<br />임차인의 해지권과 대응 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"집주인이 빚을 못 갚아서 경매에 넘어갔대요. 나는 어떻게 되나요?"</p>
      <p style={body}>핵심은 <strong>대항력</strong>이에요. 대항력이 있으면 새 주인에게 보증금을 청구할 수 있고, 없으면 배당에서 받거나 전 집주인에게 별도 청구해야 해요. <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법</a>에 따라 보호 범위가 달라요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>대항력 유무에 따라 결과가 달라요</H2>
      <GreenBox title="경매 시 임차인 상황 정리">{"대항력 있는 경우 (전입신고가 근저당보다 빠름):\n· 매수인이 임대차 승계\n· 보증금 반환 의무도 승계\n· 배당요구 가능\n\n대항력 없는 경우 (전입신고가 근저당보다 늦음):\n· 경매로 임대차 소멸\n· 배당에서 잔여 금액 받기\n· 소액임차인 최우선변제 가능\n· 미수령분은 전 임대인에게 청구"}</GreenBox>
      <CategoryButton label="부동산 정보" count={18} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>대항력 유무별 비교</H2>
      <BorderBox><strong>경매 시 대항력 유무 비교</strong>{"\n"}· 대항력 있음 → 매수인에게 보증금 청구 가능{"\n"}  → 잔여 계약기간 동안 거주 가능{"\n"}  → 배당요구로 경매 배당금에서 수령 가능{"\n"}{"\n"}· 대항력 없음 → 경매로 임대차 소멸{"\n"}  → 매수인 인도명령 시 퇴거{"\n"}  → 소액임차인이면 최우선변제{"\n"}  → 나머지는 전 임대인에게 별도 청구</BorderBox>
      <Divider />
      <H2>이렇게 대응하세요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 주택임대차보호법 기준으로 작성했어요. 개별 사안에 따라 결과가 달라질 수 있으니 법률 상담을 권해요." />
    </ArticleLayout>
  );
}
