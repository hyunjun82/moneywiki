"use client";
// Q1. 사업주가 직원 급여에서 세금을 떼야 하는 의무가 있는지, 어떻게 해야 하는지 궁금한 소규모 사업주
// Q2. 원천징수의무자의 역할과 신고·납부 방법을 파악한다
// Q3. 원천징수 의무 대상(급여·사업소득 지급자), 간이세액표, 신고 기한(다음 달 10일), 가산세
// Q4. GreenBox(핵심 정리) + Steps(신고 절차) + BorderBox(간이세액표) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
const STEPS = [
  { title: "직원 급여에서 소득세를 원천징수하세요", desc: "매월 급여를 지급할 때 간이세액표에 따라 소득세를 원천징수해요. 국세청 홈택스에서 간이세액표를 조회할 수 있어요." },
  { title: "다음 달 10일까지 홈택스에서 신고·납부하세요", desc: "원천징수한 세금은 다음 달 10일까지 홈택스에서 원천세 신고를 하고, 납부까지 완료해야 해요.", link: { label: "홈택스", href: "https://www.hometax.go.kr" } },
  { title: "연말정산을 진행하세요", desc: "매년 2월에 전년도 근로소득에 대한 연말정산을 해요. 원천징수한 세금과 실제 세액을 정산해서 차액을 환급하거나 추가 징수해요." },
];
const FAQS = [
  { q: "직원 1명만 있어도 원천징수를 해야 하나요?", a: "네, 직원이 1명이라도 급여를 지급하면 원천징수의무가 있어요. 규모와 관계없이 모든 사업주가 해당돼요." },
  { q: "원천징수를 안 하면 어떻게 되나요?", a: "원천징수 불이행 가산세(미납 세액의 10%)와 납부불성실 가산세(연 8.03%)가 부과돼요. 반복되면 세무조사 대상이 될 수 있어요." },
  { q: "프리랜서에게 지급할 때도 원천징수하나요?", a: "네, 사업소득(프리랜서)에게 지급할 때는 3.3%(소득세 3% + 지방소득세 0.3%)를 원천징수해요." },
  { q: "반기납부가 뭔가요?", a: "상시 근로자 20인 이하 사업장은 반기납부(6개월에 한 번 신고·납부)를 신청할 수 있어요. 매월 신고하는 번거로움을 줄일 수 있어요." },
  { q: "간이세액표는 어디서 보나요?", a: "국세청 홈택스(hometax.go.kr)에서 '간이세액표 조회'를 하면 돼요. 월급여액과 부양가족 수를 입력하면 원천징수 세액이 나와요." },
];
const SOURCES = [{ name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" }, { name: "홈택스", href: "https://www.hometax.go.kr" }];
const RELATED = [
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "홈택스 원천세 신고 절차." },
  { slug: "금융소득-원천징수-이자-배당", title: "금융소득 원천징수", description: "이자·배당 원천징수 기준." },
  { slug: "법인세-신고-기한-세율", title: "법인세 신고 기한과 세율", description: "법인세 신고 절차." },
];
export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천징수 · 사업주 의무</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>직원 급여에서 세금을 떼야 하나요?<br />원천징수의무자의 역할과 신고 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"사업을 시작했는데, 직원 급여에서 세금을 얼마나 떼야 하죠?"</p>
      <p style={body}>직원에게 급여를 지급하는 사업주는 <strong>원천징수의무자</strong>예요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 급여에서 소득세를 미리 떼고 국세청에 납부해야 해요. 직원 1명이라도 있으면 해당돼요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>원천징수의무자란?</H2>
      <GreenBox title="원천징수 핵심 정리">{"원천징수의무자: 급여·사업소득 등을 지급하는 자\n대상 소득: 근로소득, 사업소득(3.3%), 이자·배당, 퇴직소득\n\n근로소득 원천징수:\n· 매월 급여 지급 시 간이세액표에 따라 징수\n· 다음 달 10일까지 홈택스에서 신고·납부\n· 연말에 연말정산으로 정산\n\n미이행 시 가산세:\n· 불이행 가산세: 미납 세액의 10%\n· 납부불성실 가산세: 연 8.03%"}</GreenBox>
      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>신고는 이렇게 하세요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>간이세액표란?</H2>
      <BorderBox><strong>간이세액표 예시 (부양가족 0명)</strong>{"\n"}· 월급여 200만원 → 소득세 약 19,520원{"\n"}· 월급여 300만원 → 소득세 약 60,940원{"\n"}· 월급여 400만원 → 소득세 약 130,720원{"\n"}· 월급여 500만원 → 소득세 약 228,170원{"\n"}{"\n"}+ 지방소득세 = 소득세의 10%{"\n"}{"\n"}※ 부양가족 수에 따라 감소{"\n"}※ 2026년 간이세액표 기준</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 소득세법 기준으로 작성했어요. 간이세액표, 가산세율은 법 개정에 따라 바뀔 수 있으니 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
