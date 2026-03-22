"use client";
// Q1. 출퇴근 중 교통사고가 났는데 산재 처리가 되는지 궁금한 근로자
// Q2. 출퇴근 재해 산재 인정 요건을 확인하고 산재 신청 여부를 결정한다
// Q3. 2018년 출퇴근 재해 보장 시행, 인정 요건(합리적 경로·방법), 불인정 사유, 신청 절차
// Q4. GreenBox(핵심 결론) + Steps(신청 절차) + BorderBox(인정/불인정 사례) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
const STEPS = [
  { title: "사고 현장을 증거로 남기세요", desc: "사고 현장 사진, 목격자 연락처, 경찰 신고 접수번호, 블랙박스 영상 등을 확보하세요. 이 자료가 산재 인정에 핵심이에요." },
  { title: "병원에서 치료받으면서 산재로 접수하세요", desc: "산재지정병원이면 산재 접수가 바로 돼요. 일반 병원이면 건강보험으로 먼저 치료받고, 산재 승인 후 전환할 수 있어요." },
  { title: "근로복지공단에 산재 신청을 하세요", desc: "사업주를 통해 신청하거나, 사업주가 거부하면 근로자가 직접 신청할 수 있어요. 근로복지공단 홈페이지나 지사에서 접수해요.", link: { label: "근로복지공단", href: "https://www.comwel.or.kr" } },
  { title: "심사 결과를 확인하세요", desc: "신청 후 보통 14일 이내에 결과가 나와요. 불승인되면 심사청구(90일 이내)나 재심사청구(90일 이내)를 할 수 있어요." },
];
const FAQS = [
  { q: "출퇴근 사고가 산재로 인정되나요?", a: "2018년 1월 1일부터 출퇴근 재해도 산재로 인정돼요. 합리적인 경로와 방법으로 출퇴근하다 발생한 사고면 산재예요." },
  { q: "퇴근 후 마트에 들렀다가 사고 나면요?", a: "일상 필수 행위(마트, 병원, 어린이집 등)를 위해 경로를 벗어난 경우에도 인정돼요. 다만 경로를 벗어난 동안의 사고는 인정 안 되고, 원래 경로로 돌아온 후 사고가 나면 인정돼요." },
  { q: "자전거·오토바이 출퇴근도 되나요?", a: "네, 자전거, 오토바이, 도보, 대중교통, 자가용 모두 해당돼요. 이동 수단 제한은 없어요." },
  { q: "음주운전 중 사고는요?", a: "음주운전, 무면허운전, 신호 위반 등 근로자의 중대한 과실이 있으면 산재로 인정되지 않아요." },
  { q: "사업주가 산재 신청을 거부하면요?", a: "근로자가 직접 근로복지공단에 신청할 수 있어요. 사업주 동의 없이도 신청 가능해요." },
];
const SOURCES = [
  { name: "산업재해보상보험법", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단", href: "https://www.comwel.or.kr" },
];
const RELATED = [
  { slug: "배달기사-보험-가입-종류", title: "배달기사 보험 종류", description: "배달기사 필수 보험 3가지." },
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "실업급여 받을 수 있는 조건." },
  { slug: "간이대지급금-지급액-상한액", title: "대지급금 제도", description: "회사 도산 시 임금 지급 제도." },
];
export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>산재 · 출퇴근 재해 · 산재보상</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>출퇴근 중 사고, 산재 처리 되나요?<br />인정 요건과 신청 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"출근하다 교통사고가 났는데, 이것도 산재인가요?"</p>
      <p style={body}>2018년 1월부터 출퇴근 재해도 <strong>산재로 인정</strong>돼요. <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법 제37조</a>에 따라 합리적인 경로와 방법으로 출퇴근하다 발생한 사고면 산재보상을 받을 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>어떤 경우에 산재로 인정되나요?</H2>
      <GreenBox title="출퇴근 재해 인정 기준">{"인정 요건:\n· 합리적인 경로와 방법으로 출퇴근\n· 이동 수단 제한 없음 (도보, 자전거, 자가용, 대중교통)\n· 일상 필수 행위 경유도 인정 (마트, 병원, 어린이집 등)\n\n불인정 사유:\n· 음주운전, 무면허운전\n· 신호 위반 등 중대 과실\n· 경로 이탈 중 사고 (원래 경로 복귀 후는 인정)"}</GreenBox>
      <CategoryButton label="산재보상 정보" count={5} href="/category/산재" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>인정되는 경우 vs 안 되는 경우</H2>
      <BorderBox><strong>출퇴근 재해 사례 비교</strong>{"\n"}인정 O:{"\n"}· 평소 출퇴근 경로에서 교통사고{"\n"}· 퇴근 후 마트 들렀다가 귀가 경로에서 사고{"\n"}· 자전거로 출근 중 넘어짐{"\n"}{"\n"}인정 X:{"\n"}· 음주 후 운전하다 사고{"\n"}· 퇴근 후 술집에서 음주 후 귀가 중 사고{"\n"}· 무면허운전 중 사고</BorderBox>
      <Divider />
      <H2>산재 신청은 이렇게 하세요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 산업재해보상보험법 기준으로 작성했어요. 개별 사안에 따라 인정 여부가 달라질 수 있으니 근로복지공단(1588-0075)에 확인하세요." />
    </ArticleLayout>
  );
}
