"use client";
// Q1. 면세사업자인데 사업장 현황신고를 해야 하는지, 기한이 언제인지 궁금
// Q2. 2월 10일까지 신고 확인 → 홈택스에서 전자신고
// Q3. 대상(면세사업자), 기한(2.10), 신고 방법(홈택스), 미신고 가산세
// Q4. GreenBox(핵심 정리) + Steps(신고 절차) + BorderBox(미신고 불이익) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, Steps, ArticleLayout, RelatedArticles, ArticleAd } from "@/components/article-ui";

const STEPS = [
  { title: "홈택스 접속·로그인", desc: "홈택스(hometax.go.kr)에 공동인증서로 로그인해요.", tip: "모바일 손택스에서도 가능" },
  { title: "사업장 현황신고서 작성", desc: "신고/납부 → 사업장 현황신고에서 전년도 수입금액, 매출·매입 내역을 입력해요." },
  { title: "첨부 서류 제출", desc: "매출·매입처별 계산서합계표, 수입금액 명세서를 함께 제출해요." },
  { title: "신고 완료 확인", desc: "접수증을 출력하거나 저장해두세요. 수정이 필요하면 기한 내 정정 가능해요." },
];

const FAQS = [
  { q: "면세사업자가 뭔가요?", a: "부가가치세가 면제되는 사업을 하는 사업자예요. 병의원, 학원, 주택임대, 농산물 판매 등이 해당돼요." },
  { q: "언제까지 신고해야 하나요?", a: "매년 2월 10일까지 전년도 사업장 현황을 신고해야 해요." },
  { q: "미신고하면 어떻게 되나요?", a: "수입금액의 0.5% 가산세가 부과돼요. 수입금액이 크면 가산세도 커지니 기한 내 신고하세요." },
  { q: "복합과세사업자는 어떻게 하나요?", a: "면세 부분만 사업장 현황신고를 해요. 과세 부분은 부가세 신고에서 처리해요." },
  { q: "수입금액이 없어도 신고해야 하나요?", a: "네, 수입금액이 0원이어도 신고해야 해요. '무실적 신고'로 간단히 처리돼요." },
];

const REFERENCES = [
  { category: "법령", items: [{ label: "소득세법 제78조 (사업장 현황신고)", url: "https://www.law.go.kr/법령/소득세법" }] },
  { category: "기관", items: [{ label: "국세청 홈택스", url: "https://www.hometax.go.kr" }] },
];
const RELATED = [
  { slug: "부가세-환급-신청", title: "부가세 환급 신청", description: "부가세 환급 절차예요." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "원천세 신고 기한이에요." },
  { slug: "법인세-신고-기한", title: "법인세 신고 기한", description: "법인세 신고 기한과 세율이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>면세사업자 사업장 현황신고, 언제까지?<br />홈택스 신고 방법과 기한</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>병의원, 학원, 임대사업자처럼 면세사업자라면 매년 2월 10일까지 사업장 현황신고를 해야 해요. 홈택스에서 간편하게 할 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>2월 10일까지 신고해야 해요</H2>
      <p style={body}>부가가치세가 면제되는 대신 사업장 현황을 매년 신고하는 의무가 있어요.</p>
      <GreenBox><strong>대상</strong>: 면세사업자 (병의원, 학원, 주택임대, 농산물 등)<br /><strong>기한</strong>: 매년 2월 10일 (전년도 수입금액 기준)<br /><strong>방법</strong>: 홈택스 전자신고 또는 관할 세무서 방문<br /><strong>미신고</strong>: 수입금액의 0.5% 가산세<br /><br />★ 수입금액이 없어도 '무실적 신고'는 해야 해요</GreenBox>
      <H2>홈택스 신고 절차</H2>
      <p style={body}>전자신고가 가장 간편해요.</p>
      <Steps steps={STEPS} />
      <H2>미신고하면 가산세가 붙어요</H2>
      <p style={body}>기한을 넘기면 가산세가 자동 부과돼요.</p>
      <BorderBox><strong>무신고 가산세</strong>: 수입금액 × 0.5%<br /><strong>예시</strong>: 연 수입 5,000만원 → 가산세 25만원<br /><strong>기한 후 신고</strong>: 늦게라도 자진 신고하면 가산세 감면 가능<br /><br />★ 세무사 도움 없이 홈택스에서 직접 신고할 수 있어요</BorderBox>
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" /><Divider />
      <H2>자주 묻는 것들</H2><FAQ items={FAQS} /><Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 소득세법 기준으로 작성됐어요. 업종별 세부 신고 항목은 국세청 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
