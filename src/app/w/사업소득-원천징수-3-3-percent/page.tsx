"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 프리랜서로 일하는데 통장에 들어온 금액이 계약서보다 적어서 왜 3.3%를 떼는지 궁금한 상황
// Q2. 3.3% 계산 구조를 이해하고 홈택스에서 원천세 신고하거나 5월 종합소득세로 환급받는 방법 파악
// Q3. 소득세 3% + 지방소득세 0.3%, 다음 달 10일까지 신고, 5월 종합소득세에서 정산·환급
// Q4. 계산표 + Steps로 신고 흐름 시각화
// MAP-INTRO: 프리랜서로 일하는데 통장에 찍힌 금액이 계약서보다 적으면 3.3% 원천징수 때문이에요
// MAP-TYPE: 절차
// MAP-H2: 3.3% 계산표 > 원천세 신고 흐름 > 필요 서류 > 체크리스트 > FAQ
// MAP-COMP: table > Steps > DocTable > Checklist > FAQ

"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "사업주가 용역비 지급 시 3.3% 원천징수",
    desc: "프리랜서에게 용역비를 줄 때 사업주가 소득세 3% + 지방소득세 0.3%를 차감해요. 100만원 계약이면 96만 7천원이 입금되고, 3만 3천원은 국가에 대신 납부해요. 별도로 신청하지 않아도 자동으로 이뤄져요.",
    tip: "지방소득세는 소득세(3%)의 10%인 0.3%예요",
  },
  {
    title: "다음 달 10일까지 원천세 신고·납부",
    desc: "사업주는 용역비를 지급한 달의 다음 달 10일까지 홈택스에서 원천세를 신고하고 납부해야 해요. '원천세 신고 > 일반신고'에서 원천징수이행상황 신고서를 작성해요. 지방소득세는 위택스에서 따로 신고해요.",
    tip: "기한 안 지키면 납부불성실가산세가 매일 쌓여요",
    link: { label: "홈택스 원천세 신고 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "지급명세서 제출 (1월·7월)",
    desc: "1월에는 전년도 하반기(7~12월) 지급분, 7월에는 상반기(1~6월) 지급분에 대한 지급명세서를 홈택스에 제출해야 해요. 프리랜서별로 지급금액과 원천징수 세액을 기재해요. 제출 기한을 놓치면 불성실가산세가 붙어요.",
    tip: "간이지급명세서는 매달 또는 반기별 제출이에요",
  },
  {
    title: "프리랜서 5월 종합소득세 정산·환급",
    desc: "3.3%는 미리 낸 세금이에요. 다음 해 5월에 종합소득세를 신고하면 실제 세율로 정산해요. 3.3%보다 실제 세금이 적으면 차액을 돌려받고, 많으면 추가 납부해요. 소득이 적은 프리랜서는 대부분 환급이에요.",
    tip: "종합소득세 신고 때 원천징수영수증이 꼭 필요해요",
    link: { label: "종합소득세 신고 방법 보기", href: "/w/종합소득세-신고" },
  },
];

const CALC_TABLE = [
  { pay: "100만원", income: "30,000원", local: "3,000원", total: "33,000원", receive: "967,000원" },
  { pay: "200만원", income: "60,000원", local: "6,000원", total: "66,000원", receive: "1,934,000원" },
  { pay: "300만원", income: "90,000원", local: "9,000원", total: "99,000원", receive: "2,901,000원" },
  { pay: "500만원", income: "150,000원", local: "15,000원", total: "165,000원", receive: "4,835,000원" },
];

const DOCS = [
  { name: "원천징수영수증 (사업소득분)", required: true, where: "용역비 받을 때 사업주에게 요청" },
  { name: "홈택스 원천징수이행상황 신고서", required: true, where: "홈택스 원천세 신고 메뉴" },
  { name: "종합소득세 신고서", required: true, where: "다음 해 5월 홈택스에서 작성" },
  { name: "사업소득 지급명세서", required: false, where: "사업주가 1월·7월 홈택스 제출" },
];

const CHECKLIST = [
  "지급액 × 3.3% = 원천징수 세액 (소득세 3% + 지방소득세 0.3%)",
  "사업주: 다음 달 10일까지 홈택스 원천세 신고·납부",
  "사업주: 1월·7월 지급명세서 홈택스 제출",
  "프리랜서: 원천징수영수증 보관 (5월 종합소득세 신고용)",
  "다음 해 5월 종합소득세로 실제 세금 정산 (환급 or 추가납부)",
  "소득이 낮은 프리랜서는 대부분 일부 환급 받아요",
];

const FAQS = [
  {
    q: "3.3% 세금은 언제 돌려받나요?",
    a: "다음 해 5월 종합소득세 신고 때 정산해요. 실제 세금이 미리 낸 3.3%보다 적으면 차액을 환급받아요. 소득이 적을수록 환급액이 커지는 구조예요.",
  },
  {
    q: "프리랜서가 직접 신고해야 하는 건가요?",
    a: "원천세는 사업주가 신고해요. 프리랜서는 다음 해 5월 종합소득세만 직접 신고하면 돼요. 원천징수영수증을 사업주에게 받아두면 신고가 훨씬 편해요.",
  },
  {
    q: "3.3%를 안 떼고 줬는데 어떻게 되나요?",
    a: "사업주에게 가산세가 붙어요. 납부불성실가산세가 기한부터 매일 쌓여요. 프리랜서는 5월에 본인이 직접 세금을 납부해야 해요.",
  },
  {
    q: "사업자등록이 있어도 3.3% 원천징수 하나요?",
    a: "사업자등록이 있어도 인적 용역(강의, 디자인 등)에서 소득이 생기면 3.3% 원천징수 대상이에요. 부가세 별도 계산서를 발행했더라도 소득세 부분은 3.3%로 원천징수해요.",
  },
  {
    q: "원천징수영수증은 어디서 받나요?",
    a: "용역비를 지급한 사업주에게 요청하면 돼요. 홈택스 '조회·발급 > 지급명세서 조회' 메뉴에서도 확인할 수 있어요.",
  },
  {
    q: "배달 라이더나 강사도 3.3% 대상인가요?",
    a: "네, 해당돼요. 강사, 작가, 디자이너, 배달 라이더, 보험설계사, 골프 캐디 등 인적 용역을 제공하고 소득을 받는 사람이면 모두 사업소득 원천징수 대상이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "소득세법 제127조: 원천징수 의무", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청: 원천징수 개요", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2289&cntntsId=7701" },
      { label: "홈택스: 원천세 신고·납부", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "종합소득세-신고", title: "종합소득세 신고 방법", description: "5월 종합소득세 신고로 3.3% 환급받는 방법이에요." },
  { slug: "프리랜서-실업급여", title: "프리랜서 실업급여 받을 수 있나요?", description: "3.3% 프리랜서도 조건 충족 시 실업급여 신청이 가능해요." },
  { slug: "원천징수-영수증-발급", title: "원천징수영수증 발급 방법", description: "사업소득 원천징수영수증 홈택스 조회·출력 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        세금 · 사업소득 · 원천징수
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        사업소득 원천징수 3.3%<br />
        왜 떼는지, 신고는 어떻게 하는지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        프리랜서로 일하는데 통장에 찍힌 금액이 계약서보다 적으면 3.3% 원천징수 때문이에요.
        소득세 3%와 지방소득세 0.3%를 합쳐서 미리 납부하는 구조예요.
        여기서는 3.3% 계산 방법부터{" "}
        <a href="/w/종합소득세-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          5월 종합소득세로 환급받는 방법
        </a>까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>3.3%가 뭔지, 계산표로 먼저 보기</H2>
      <p style={body}>
        3.3%는 소득세(3%)와 지방소득세(0.3%)를 합친 금액이에요.
        용역비를 줄 때 사업주가 미리 공제해서 국가에 대신 납부하는 방식이에요.
        프리랜서 입장에서는 미리 낸 세금이 되고, 5월 종합소득세 신고 때 최종 정산해요.
      </p>
      <p style={body}>
        100만원 계약이면 33,000원을 공제하고 967,000원이 입금돼요.
        이 33,000원은 없어지는 게 아니라 미리 낸 세금이에요.
      </p>

      <SectionBadge>지급액별 원천징수 세액</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>지급액</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>소득세 (3%)</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>지방소득세 (0.3%)</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>합계 (3.3%)</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>실수령액</th>
            </tr>
          </thead>
          <tbody>
            {CALC_TABLE.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{row.pay}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "#6b7280" }}>{row.income}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "#6b7280" }}>{row.local}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "#dc2626", fontWeight: 600 }}>{row.total}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "#1D9E75", fontWeight: 700 }}>{row.receive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        소득세 3% + 지방소득세 0.3% = 총 3.3%<br />
        사업주가 공제 후 납부 → 5월 종합소득세에서 최종 정산<br />
        실제 세금이 3.3%보다 적으면 차액을 환급받아요
      </GreenBox>

      <Divider />

      <H2>원천세 신고·납부 4단계 흐름</H2>
      <p style={body}>
        3.3% 원천징수는 사업주와 프리랜서 각각 할 일이 있어요.
        사업주는 다음 달 10일까지 신고·납부, 프리랜서는 원천징수영수증을 받아서 이듬해 5월에 종합소득세를 신고해요.
        기한을 넘기면 가산세가 붙으니 날짜 관리가 중요해요.
      </p>

      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신고에 필요한 서류</H2>
      <p style={body}>
        사업주는 원천세 신고 시 원천징수이행상황 신고서를 홈택스에서 작성해요.
        프리랜서는 원천징수영수증을 보관했다가 5월 종합소득세 신고 때 쓰면 돼요.
        홈택스에서도 조회 가능하지만 사업주에게 직접 받아두는 게 가장 확실해요.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        원천징수영수증에는 지급금액·소득세·지방소득세가 모두 기재돼요.
        5월 종합소득세 신고 때 이 금액을 기준으로 환급 또는 추가 납부를 정산해요.
      </BorderBox>

      <Divider />

      <H2>사업소득 원천징수 핵심 체크리스트</H2>
      <p style={body}>
        사업주와 프리랜서 모두 놓치면 가산세가 붙는 항목들이에요.
        지급명세서 제출 기한은 의외로 많이 놓쳐서 주의가 필요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        3.3% 원천징수와 종합소득세 정산에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 소득세법을 바탕으로 작성됐어요. 세율·신고 기한은 변경될 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
