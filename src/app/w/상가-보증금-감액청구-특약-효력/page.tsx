"use client";

// Q1. 상가 시세가 떨어졌는데 임대차계약서에 감액청구 금지 특약이 있어 걱정하는 상가 임차인
// Q2. 감액청구 금지 특약의 법적 효력을 확인하고, 보증금 감액을 청구할 수 있는지 판단한다
// Q3. 상가임대차보호법 제11조(차임등 감액청구), 감액청구 금지 특약 무효 여부, 감액 사유
// Q4. GreenBox(핵심 결론) + BorderBox(특약 효력 비교) + Steps(감액 청구 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "감액 사유를 확인하세요", desc: "경제 사정 변동, 상가 주변 시세 하락 등이 감액 사유가 돼요. 단순히 장사가 안 된다는 이유만으로는 부족하고, 객관적 시세 하락이 필요해요." },
  { title: "임대인에게 서면으로 감액을 요청하세요", desc: "내용증명으로 보증금 또는 차임 감액을 정식 요청하세요. 감액 사유, 요청 금액, 근거 자료를 첨부하면 돼요." },
  { title: "협의가 안 되면 조정을 신청하세요", desc: "상가건물 임대차분쟁조정위원회에 조정을 신청할 수 있어요. 법원 소송보다 빠르고 비용이 적어요." },
  { title: "조정 불성립 시 법원에 소송을 제기하세요", desc: "조정도 안 되면 법원에 차임감액청구 소송을 낼 수 있어요. 감정평가, 시세자료 등 객관적 증거가 중요해요." },
];

const FAQS = [
  { q: "감액청구 금지 특약은 유효한가요?", a: "원칙적으로 무효예요. 상가임대차보호법 제15조에서 이 법에 위반되는 약정으로 임차인에게 불리한 것은 효력이 없다고 규정하고 있어요. 감액청구권은 강행규정이라 특약으로 배제할 수 없어요." },
  { q: "감액은 얼마까지 요구할 수 있나요?", a: "법에 정해진 감액 비율은 없어요. 시세 하락률, 주변 상가 임대료 등을 종합해서 법원이 판단해요. 보통 시세 하락분에 비례한 수준이에요." },
  { q: "증액 제한 5%와 관계가 있나요?", a: "증액 제한(5%)은 임대인의 일방적 증액을 막는 거예요. 감액청구는 임차인의 권리라서 별개 사안이에요. 감액에는 5% 제한이 적용되지 않아요." },
  { q: "보증금만 감액하는 것도 되나요?", a: "네, 보증금만 감액 청구하거나 월 차임만 감액 청구하는 것도 가능해요. 둘 다 감액 청구할 수도 있어요." },
  { q: "언제 감액을 청구할 수 있나요?", a: "임대차 기간 중 언제든 가능해요. 다만 경제 사정 변동이라는 사유가 있어야 해요. 계약 직후 바로 청구하기는 어렵고, 시간이 경과해서 시세가 바뀐 경우에 인정돼요." },
];

const SOURCES = [
  { name: "상가건물 임대차보호법", href: "https://www.law.go.kr/법령/상가건물임대차보호법" },
  { name: "대법원 판례", href: "https://glaw.scourt.go.kr" },
];

const RELATED = [
  { slug: "상가임대차-계약만료-보증금-월세-의무", title: "상가 계약만료 보증금 반환", description: "상가 계약 만료 시 보증금 처리." },
  { slug: "계약갱신청구권-실거주", title: "계약갱신청구권", description: "임차인의 계약갱신 청구 권리." },
  { slug: "소액임차인", title: "소액임차인 보호", description: "소액임차인 최우선변제 제도." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>상가임대차 · 보증금 감액 · 특약 효력</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        감액청구 금지 특약, 정말 유효한가요?<br />
        상가 보증금 감액 청구 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"시세가 떨어졌는데 계약서에 감액 불가라고 돼 있어요."</p>
      <p style={body}>
        감액청구 금지 특약은 <strong>무효</strong>예요.
        <a href="https://www.law.go.kr/법령/상가건물임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>상가건물 임대차보호법 제11조</a>의 감액청구권은 강행규정이라 특약으로 배제할 수 없어요.
        시세가 하락했다면 감액을 청구할 수 있어요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>감액청구 금지 특약, 왜 무효인가요?</H2>
      <GreenBox title="핵심 결론">
        {"상가임대차보호법 제11조: 차임 또는 보증금의 감액 청구권\n상가임대차보호법 제15조: 이 법에 위반되는 약정으로 임차인에게 불리한 것은 무효\n\n→ 감액청구 금지 특약 = 임차인에게 불리 = 무효\n\n감액 사유:\n· 경제 사정의 현저한 변동\n· 상가 주변 시세 하락\n· 재난·재해로 인한 영업 환경 악화"}
      </GreenBox>
      <CategoryButton label="상가임대차" count={6} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>특약이 유효한 경우 vs 무효인 경우</H2>
      <BorderBox>
        <strong>특약 효력 비교</strong>{"\n"}
        {"\n"}
        무효인 특약 (임차인에게 불리):{"\n"}
        · "감액청구를 할 수 없다"{"\n"}
        · "보증금 반환 시 이자를 지급하지 않는다"{"\n"}
        · "계약갱신청구권을 포기한다"{"\n"}
        {"\n"}
        유효한 특약 (임차인에게 유리):{"\n"}
        · "임대인은 5% 초과 증액을 하지 않는다"{"\n"}
        · "보증금 반환 시 이자를 추가 지급한다"
      </BorderBox>
      <Divider />

      <H2>감액을 청구하려면 이렇게 하세요</H2>
      <Steps steps={STEPS} />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 상가건물 임대차보호법 기준으로 작성했어요. 구체적인 사안은 법률 상담을 권해요." />
    </ArticleLayout>
  );
}
