"use client";
// Q1. 배우자의 외도로 이혼을 결심했는데, 유책배우자에게 위자료를 청구할 수 있는지 궁금한 상황
// Q2. 외도 증거 확보 방법과 위자료 청구 절차를 파악한다
// Q3. 민법 제840조(이혼 사유), 위자료 산정 기준, 증거 확보, 상간자 책임
// Q4. GreenBox(핵심 정리) + Steps(절차) + BorderBox(위자료 기준) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
const STEPS = [
  { title: "외도 증거를 확보하세요", desc: "문자, 카톡, SNS, 사진, 동영상, 목격자 증언, 카드 사용 내역 등이 증거가 돼요. 불법 도청이나 침입으로 수집한 증거는 증거 능력이 인정되지 않을 수 있으니 주의하세요." },
  { title: "위자료 청구 소송을 제기하세요", desc: "이혼 소송과 함께 위자료 청구를 할 수 있어요. 배우자에게만 청구하거나, 상간자(제3자)에게도 함께 청구할 수 있어요.", tip: "위자료 청구 시효: 외도 사실을 안 날부터 3년" },
  { title: "재산분할도 함께 청구하세요", desc: "위자료와 재산분할은 별개예요. 이혼 소송에서 위자료 + 재산분할을 동시에 청구하는 게 일반적이에요." },
];
const FAQS = [
  { q: "외도한 배우자에게 위자료를 얼마나 받을 수 있나요?", a: "판례상 위자료는 보통 1,000만~5,000만원 수준이에요. 혼인 기간, 자녀 유무, 외도 기간, 경제력 등을 종합 고려해서 법원이 결정해요." },
  { q: "상간자(외도 상대)에게도 청구할 수 있나요?", a: "네, 상간자에게 위자료를 별도로 청구할 수 있어요. 상간자가 기혼 사실을 알면서 관계를 가졌다면 불법행위 책임이 있어요." },
  { q: "증거 없이도 청구할 수 있나요?", a: "증거가 있어야 해요. 의심만으로는 인정이 안 돼요. 정황 증거(잦은 외박, 카드 내역 등)도 여러 개 모으면 종합적으로 판단될 수 있어요." },
  { q: "외도한 쪽이 이혼을 청구할 수 있나요?", a: "유책배우자의 이혼 청구는 원칙적으로 인정되지 않아요. 다만 혼인이 이미 파탄 상태이고, 장기간 별거 중이면 예외적으로 허용되는 판례도 있어요." },
  { q: "협의이혼으로 위자료를 받을 수 있나요?", a: "협의이혼에서도 위자료 합의가 가능해요. 합의서에 위자료 금액과 지급 방법을 명시하세요. 합의가 안 되면 이혼 후 3년 이내에 소송으로 청구할 수 있어요." },
];
const SOURCES = [{ name: "민법 제840조", href: "https://www.law.go.kr/법령/민법" }, { name: "대한법률구조공단", href: "https://www.klac.or.kr" }];
const RELATED = [
  { slug: "이혼-재산분할-협의-불가-대응", title: "재산분할 협의 불가 시 대응", description: "법원 조정·심판 절차." },
  { slug: "이혼-무료-법률상담-소송구조", title: "이혼 무료 법률상담", description: "법률구조공단 무료 상담." },
  { slug: "이혼-포기-외도-배우자-청구", title: "외도 배우자의 이혼 청구", description: "유책배우자 이혼 청구 가능 여부." },
];
export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>이혼 · 외도 · 위자료</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>외도한 배우자에게 위자료 받을 수 있나요?<br />증거 확보와 청구 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"배우자가 바람을 피웠어요. 위자료 받을 수 있을까요?"</p>
      <p style={body}><a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제840조</a>에서 배우자의 부정행위를 이혼 사유로 규정하고 있어요. 외도한 배우자에게 <strong>위자료</strong>를 청구할 수 있고, 외도 상대(상간자)에게도 별도로 청구할 수 있어요. 증거 확보가 핵심이에요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>외도 이혼, 핵심 정리</H2>
      <GreenBox title="외도 이혼 위자료 핵심">{"이혼 사유: 민법 제840조 제1호 (배우자의 부정행위)\n위자료 범위: 보통 1,000만~5,000만원 (판례)\n\n청구 대상:\n· 외도한 배우자\n· 상간자(외도 상대) — 기혼 사실 인지 시\n\n청구 시효:\n· 외도 사실을 안 날부터 3년\n\n증거 유형:\n문자·카톡, SNS, 사진·동영상,\n카드 내역, 목격자 증언"}</GreenBox>
      <CategoryButton label="이혼·가족법" count={8} href="/category/이혼" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>위자료는 어떻게 정해지나요?</H2>
      <BorderBox><strong>위자료 산정 고려 요소</strong>{"\n"}· 혼인 기간 (길수록 ↑){"\n"}· 외도 기간과 횟수{"\n"}· 미성년 자녀 유무{"\n"}· 배우자의 경제력{"\n"}· 반성 여부{"\n"}· 피해 배우자의 정신적 고통 정도{"\n"}{"\n"}일반적 범위: 1,000만~5,000만원{"\n"}상간자 위자료: 500만~3,000만원</BorderBox>
      <Divider />
      <H2>이렇게 진행하세요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 민법 기준으로 작성했어요. 위자료 금액은 사안에 따라 달라지니 법률 상담을 권해요. 무료 상담: 대한법률구조공단(132)." />
    </ArticleLayout>
  );
}
