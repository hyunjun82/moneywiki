"use client";
// Q1. 상가 계약이 만료됐는데 보증금과 월세 반환/지급 의무가 어떻게 되는지 궁금한 상가 임차인/임대인
// Q2. 계약만료 시 보증금 반환 의무와 월세 정산 방법을 파악한다
// Q3. 보증금 반환 시기, 월세 일할 계산, 원상복구 의무, 권리금 회수 기회
// Q4. GreenBox(핵심 정리) + Steps(정산 절차) + BorderBox(원상복구) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
const STEPS = [
  { title: "계약 만료일을 확인하세요", desc: "상가임대차는 기본 계약기간이 끝나면 만료예요. 임차인이 계약갱신청구권을 행사하지 않았거나 이미 10년을 사용했다면 계약이 종료돼요." },
  { title: "보증금 반환과 월세 정산을 요청하세요", desc: "임대인은 임차인이 점포를 비우고 인도하면 보증금을 반환해야 해요. 월세는 만료일까지 일할 계산해서 정산해요." },
  { title: "원상복구 범위를 협의하세요", desc: "인테리어 원상복구 범위를 합의해야 해요. 통상적 마모는 임차인 책임이 아니에요. 특약이 있다면 특약 내용을 따르지만, 과도한 원상복구 요구는 거부할 수 있어요." },
  { title: "권리금 회수 기회를 확보하세요", desc: "상가임대차보호법에 따라 임차인은 새 세입자에게 권리금을 받을 수 있어요. 임대인은 정당한 사유 없이 새 세입자 주선을 방해하면 안 돼요.", tip: "권리금 보호: 계약 종료 6개월 전부터 종료 시까지" },
];
const FAQS = [
  { q: "보증금은 언제 돌려받나요?", a: "점포를 비우고 임대인에게 인도하면 그때 반환해야 해요. 별도 반환 기한이 없지만, 인도와 동시에 반환하는 게 원칙이에요." },
  { q: "월세가 남은 기간은 어떻게 되나요?", a: "계약 만료일까지 일할 계산해서 정산해요. 만료 전에 비우면 남은 기간 월세를 돌려받을 수 있어요." },
  { q: "원상복구를 반드시 해야 하나요?", a: "특약이 있으면 해야 하지만, 통상적 마모·손상은 임차인 책임이 아니에요. 영업을 위해 설치한 시설도 철거 의무 여부가 특약에 따라 달라요." },
  { q: "권리금을 못 받으면 어떻게 하나요?", a: "임대인이 정당한 사유 없이 새 세입자 주선을 방해하면 손해배상을 청구할 수 있어요. 상가임대차분쟁조정위원회에 조정을 신청할 수도 있어요." },
  { q: "보증금에서 원상복구 비용을 빼도 되나요?", a: "합의가 있으면 공제할 수 있어요. 하지만 임차인이 동의하지 않으면 임대인이 일방적으로 공제할 수 없어요. 분쟁 시 법원 판단을 받아야 해요." },
];
const SOURCES = [{ name: "상가건물 임대차보호법", href: "https://www.law.go.kr/법령/상가건물임대차보호법" }];
const RELATED = [
  { slug: "상가-보증금-감액청구-특약-효력", title: "상가 보증금 감액청구", description: "시세 하락 시 감액 청구 방법." },
  { slug: "계약갱신청구권-실거주", title: "계약갱신청구권", description: "임차인의 갱신 청구 권리." },
  { slug: "임대인-수리의무", title: "임대인 수리의무", description: "집 고장 시 누가 고치나." },
];
export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>상가임대차 · 계약만료 · 보증금 반환</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>상가 계약 만료, 보증금은 언제 돌려받나요?<br />반환 의무와 정산 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"상가 계약이 끝났는데, 보증금 반환이랑 원상복구 때문에 힘들어요."</p>
      <p style={body}>계약이 만료되면 임대인은 <strong>보증금을 반환</strong>해야 하고, 임차인은 <strong>점포를 인도</strong>해야 해요. 월세는 일할 계산, 원상복구 범위는 특약에 따라 달라요. 권리금 회수 기회도 보호받을 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>보증금 반환과 월세 정산</H2>
      <GreenBox title="계약만료 시 정산 핵심">{"보증금: 점포 인도 시 즉시 반환 원칙\n월세: 만료일까지 일할 계산 정산\n원상복구: 특약에 따라 (통상 마모 제외)\n권리금: 새 세입자에게 받을 기회 보호\n\n임대인이 보증금을 안 주면?\n→ 내용증명 → 지급명령 → 보증금반환소송"}</GreenBox>
      <CategoryButton label="상가임대차" count={6} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>정산 절차를 따라가 볼게요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>원상복구, 어디까지 해야 하나요?</H2>
      <BorderBox><strong>원상복구 의무 범위</strong>{"\n"}임차인 책임:{"\n"}· 특약에 명시된 복구 항목{"\n"}· 임차인이 설치한 시설물 (특약에 따라){"\n"}{"\n"}임차인 책임 아님:{"\n"}· 통상적 마모·손상 (연식에 따른 노후화){"\n"}· 건물 구조적 결함{"\n"}{"\n"}분쟁 예방: 입주 시 사진 촬영, 계약서에 복구 범위 명시</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 상가건물 임대차보호법 기준으로 작성했어요. 개별 사안에 따라 달라질 수 있으니 법률 상담을 권해요." />
    </ArticleLayout>
  );
}
