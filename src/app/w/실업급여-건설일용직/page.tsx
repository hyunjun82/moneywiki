"use client";
// Q1. 건설현장 일용직으로 일했는데 실업급여를 받을 수 있는지 궁금한 상황
// Q2. 건설일용직 실업급여 수급 요건과 신청 방법을 확인한다
// Q3. 피보험기간 180일(18개월 중), 수급자격 인정 신청, 일용근로내역확인서, 하한액 적용
// Q4. GreenBox(핵심 요건) + Steps(신청 절차) + EligibilityChecker + FAQ
import { H2, GreenBox, BorderBox, Divider, body, EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
const ELIGIBILITY = [
  { id: "days", label: "이직일 전 18개월 중 피보험단위기간이 180일 이상이에요" },
  { id: "involuntary", label: "비자발적으로 일을 그만뒀어요 (공사 종료, 계약 만료 등)" },
  { id: "willing", label: "재취업 의사가 있고 구직활동을 할 수 있어요" },
  { id: "recent", label: "최종 이직일 이전 1개월간 근로일수가 10일 미만이에요" },
];
const STEPS = [
  { title: "고용보험 가입 이력을 확인하세요", desc: "고용24(ei.go.kr)에서 일용근로 피보험자격 이력을 조회하면 며칠 가입됐는지 확인할 수 있어요. 건설현장 원청이 고용보험을 신고했는지 확인해야 해요." },
  { title: "워크넷에서 구직등록을 하세요", desc: "고용24 또는 워크넷에서 구직등록을 먼저 해야 해요. 구직등록 없이는 수급자격 신청이 안 돼요." },
  { title: "고용센터에서 수급자격 인정을 받으세요", desc: "관할 고용센터에 방문해서 수급자격 인정 신청을 해요. 일용근로내역확인서가 필요하니 미리 준비하세요.", link: { label: "고용24", href: "https://www.ei.go.kr" } },
  { title: "실업인정을 받으면서 구직급여를 수령하세요", desc: "1~4주 간격으로 실업인정을 받아야 해요. 구직활동 실적을 증빙하면 구직급여가 입금돼요." },
];
const FAQS = [
  { q: "건설일용직도 고용보험에 가입되나요?", a: "네, 원칙적으로 가입돼요. 원청(건설사)이 일용근로자 고용보험을 신고해야 해요. 미신고된 경우 근로복지공단에 확인 요청할 수 있어요." },
  { q: "180일은 어떻게 계산하나요?", a: "실제 근무일 기준이에요. 이직일 전 18개월 동안 여러 현장에서 일한 날을 합산해서 180일 이상이면 돼요." },
  { q: "공사가 끝나서 나온 건 비자발적 이직인가요?", a: "네, 공사 종료나 공사 중단으로 일이 없어진 건 비자발적 이직이에요. 별도 증빙 없이도 인정돼요." },
  { q: "실업급여 금액은 어떻게 되나요?", a: "이직 전 평균임금의 60%예요. 2026년 기준 하한액은 1일 66,048원이에요. 일용직은 평균임금이 낮을 수 있어서 하한액을 적용받는 경우가 많아요." },
  { q: "여러 현장에서 일한 건 합산되나요?", a: "네, 고용보험에 가입된 모든 현장의 근무일수가 합산돼요. 여러 건설사에서 일해도 피보험기간이 이어져요." },
];
const SOURCES = [{ name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" }, { name: "고용24", href: "https://www.ei.go.kr" }];
const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "실업급여 받을 수 있는 조건." },
  { slug: "실업급여-금액", title: "실업급여 금액과 기간", description: "받을 수 있는 금액 계산." },
  { slug: "4시간-미만-단시간-실업급여", title: "단시간 근로자 실업급여", description: "주 15시간 기준." },
];
export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 건설일용직 · 일용근로자</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>건설일용직도 실업급여 받을 수 있나요?<br />수급 요건과 신청 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"공사가 끝나서 일이 없는데, 실업급여를 받을 수 있을까요?"</p>
      <p style={body}>건설일용직도 고용보험에 가입돼 있으면 실업급여를 받을 수 있어요. 이직일 전 <strong>18개월 중 180일 이상</strong> 근무했으면 수급자격이 생겨요. 공사 종료로 일이 없어진 건 비자발적 이직이에요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>내가 실업급여를 받을 수 있나요?</H2>
      <EligibilityChecker items={ELIGIBILITY} />
      <GreenBox title="건설일용직 실업급여 핵심">{"수급 요건:\n· 이직일 전 18개월 중 180일 이상 근무\n· 비자발적 이직 (공사 종료 등)\n· 최종 이직일 전 1개월간 근로일 10일 미만\n\n금액: 이직 전 평균임금의 60%\n하한액: 1일 66,048원 (2026년)\n기간: 120~270일 (나이·가입기간)\n\n여러 현장 근무일수 합산 가능"}</GreenBox>
      <CategoryButton label="실업급여 정보" count={15} href="/category/실업급여" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>신청은 이렇게 해요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>고용보험 가입 안 됐으면?</H2>
      <BorderBox><strong>고용보험 미가입 시 대응</strong>{"\n"}· 근로복지공단에 고용보험 가입 확인 요청{"\n"}· 원청이 미신고한 경우 → 공단에서 직권 가입 처리{"\n"}· 일용근로내역이 없으면 실업급여 신청 불가{"\n"}{"\n"}증빙: 근로계약서, 출력 기록, 급여 이체 내역{"\n"}상담: 고용24(1350) 또는 관할 고용센터</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 고용보험법 기준으로 작성했어요. 수급 요건, 금액은 법 개정에 따라 바뀔 수 있으니 고용24에서 확인하세요." />
    </ArticleLayout>
  );
}
