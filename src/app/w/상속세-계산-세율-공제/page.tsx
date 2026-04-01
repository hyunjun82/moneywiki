"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 가족이 돌아가셔서 상속받을 예정인데 상속세가 얼마나 나올지, 공제가 어떻게 되는지 막막한 상황
// Q2. 상속세 세율표와 공제 항목을 파악해서 예상 세금을 계산하고 신고 기한까지 준비
// Q3. 5단계 누진세율(10~50%), 배우자 공제 최대 30억, 자녀 공제 5억, 일괄공제 5억, 신고기한 6개월
// Q4. 세율표 + 공제 항목 비교표로 빠르게 파악
// MAP-INTRO: 가족이 돌아가시면 상속세를 얼마나 내야 할지 막막하죠
// MAP-TYPE: 비교표
// MAP-H2: 세율표 > 공제 항목 > 신고 기한·가산세 > 절세 포인트 > FAQ
// MAP-COMP: table > BorderBox > GreenBox > Steps > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const TAX_RATES = [
  { range: "1억원 이하", rate: "10%", deduct: "-" },
  { range: "1억원 초과 ~ 5억원 이하", rate: "20%", deduct: "1,000만원" },
  { range: "5억원 초과 ~ 10억원 이하", rate: "30%", deduct: "6,000만원" },
  { range: "10억원 초과 ~ 30억원 이하", rate: "40%", deduct: "1억 6,000만원" },
  { range: "30억원 초과", rate: "50%", deduct: "4억 6,000만원" },
];

const DEDUCTIONS = [
  { name: "일괄공제", amount: "5억원", note: "기초공제(2억)+인적공제와 비교해 큰 금액 선택" },
  { name: "배우자 공제", amount: "최대 30억원", note: "법정상속분 한도, 배우자 없어도 5억원 기본 공제" },
  { name: "자녀 공제", amount: "1인당 5억원", note: "자녀 2명이면 10억, 3명이면 15억 공제" },
  { name: "동거주택 공제", amount: "최대 6억원", note: "피상속인과 10년 이상 동거, 주택가액 × 80%" },
  { name: "금융재산 공제", amount: "최대 2억원", note: "순금융재산 × 20%, 2,000만원 이하는 전액 공제" },
];

const STEPS = [
  {
    title: "상속재산 파악 및 채무 확인",
    desc: "상속재산 합계액에서 피상속인의 채무, 공과금, 장례비용을 뺀 순상속재산을 계산해요. 금융재산은 금융거래정보 조회로 확인하고, 부동산은 공시지가 기준으로 평가해요.",
    tip: "채무도 공제 대상이에요. 대출, 미납 세금 등 꼼꼼히 정리하세요",
  },
  {
    title: "공제 항목 선택 및 과세표준 계산",
    desc: "일괄공제(5억원)와 기초공제(2억)+인적공제 중 큰 금액을 선택해요. 배우자 공제, 동거주택 공제, 금융재산 공제는 별도로 더해요. 모든 공제를 빼고 남은 금액이 과세표준이에요.",
    tip: "자녀가 2명 이상이면 인적공제가 일괄공제보다 클 수 있어요",
  },
  {
    title: "세율 적용 및 세액 계산",
    desc: "과세표준에 해당 세율을 곱하고 누진공제액을 빼서 산출세액을 구해요. 10억 과세표준이면 40% × 10억 - 1억 6,000만원 = 2억 4,000만원이에요. 여기서 신고 세액공제(3%)를 추가로 빼요.",
    tip: "기한 내 신고하면 산출세액의 3%를 세액공제받을 수 있어요",
  },
  {
    title: "신고·납부 (사망일로부터 6개월 이내)",
    desc: "상속개시일(사망일)이 속한 달의 말일부터 6개월 이내에 주소지 관할 세무서에 신고해요. 분할납부가 어려우면 연부연납(최대 10년)이나 물납 신청도 가능해요. 기한 넘기면 무신고 가산세 20%가 붙어요.",
    tip: "해외 거주자는 9개월 이내 신고예요",
    link: { label: "홈택스 상속세 신고 바로가기", href: "https://www.hometax.go.kr" },
  },
];

const CHECKLIST = [
  "사망일 속한 달 말일 + 6개월 = 신고 기한 계산",
  "일괄공제(5억) vs 기초공제(2억)+인적공제 중 큰 금액 선택",
  "배우자 공제: 상속받으면 최대 30억, 안 받아도 기본 5억",
  "자녀 공제: 1인당 5억 (자녀 수 × 5억)",
  "동거주택 공제: 10년 이상 동거 + 무주택 요건 확인",
  "기한 내 신고 시 산출세액의 3% 세액공제 적용",
];

const FAQS = [
  {
    q: "상속세 자녀 공제는 얼마예요?",
    a: "1인당 5억원이에요. 자녀 2명이면 10억, 3명이면 15억을 공제받아요. 기존 5천만원에서 대폭 늘어났어요.",
  },
  {
    q: "배우자 공제는 얼마까지 되나요?",
    a: "배우자가 직접 상속받으면 법정상속분 한도 내에서 최대 30억원까지 공제받아요. 배우자가 실제로 상속받지 않더라도 기본 5억원은 공제돼요.",
  },
  {
    q: "상속세는 언제까지 신고하나요?",
    a: "사망일이 속한 달의 말일부터 6개월 이내예요. 1월에 돌아가셨으면 7월 말까지예요. 해외 거주자는 9개월 이내예요.",
  },
  {
    q: "상속세를 분할 납부할 수 있나요?",
    a: "네, 연부연납 제도가 있어요. 세액이 2,000만원 초과 시 신청 가능하고, 최대 10년에 걸쳐 나눠 낼 수 있어요. 부동산이나 주식으로 납부하는 물납도 가능해요.",
  },
  {
    q: "신고 기한을 넘기면 어떻게 되나요?",
    a: "무신고 가산세로 산출세액의 20%가 추가로 붙어요. 신고를 했지만 세금이 부족하면 과소신고 가산세가 적용돼요. 기한 내 신고하면 오히려 3% 세액공제를 받을 수 있어요.",
  },
  {
    q: "10억 아파트를 상속받으면 세금이 얼마예요?",
    a: "상황에 따라 달라요. 일괄공제 5억을 적용하면 과세표준은 5억이에요. 여기에 30% 세율을 적용하고 누진공제 6,000만원을 빼면 약 9,000만원이에요. 배우자·자녀 공제를 추가로 적용하면 더 줄어요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "상속세 및 증여세법", url: "https://www.law.go.kr/법령/상속세및증여세법" },
      { label: "국세청: 상속세 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 상속세 신고·납부", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "증여세-계산", title: "증여세 계산 방법과 세율", description: "상속 전 사전 증여로 절세하는 방법이에요." },
  { slug: "금융거래정보-조회", title: "금융거래정보 조회 방법", description: "피상속인의 금융재산 파악에 필요한 조회 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        세금 · 상속세 · 공제
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상속세 계산 세율 공제<br />
        배우자·자녀 공제부터 신고 기한까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가족이 돌아가시면 상속세를 얼마나 내야 할지 막막하죠.
        상속세는 10~50% 누진세율이지만{" "}
        <a href="/w/증여세-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          배우자·자녀 공제
        </a>를 잘 챙기면 실제 납부액이 크게 줄어요.
        세율표, 공제 항목, 신고 기한까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>상속세 세율표 (2026 기준)</H2>
      <p style={body}>
        상속세는 과세표준 구간에 따라 10%~50%까지 5단계 누진세율이 적용돼요.
        공제를 모두 적용한 뒤 남은 금액(과세표준)에 세율을 곱하는 방식이에요.
        세율이 높아 보이지만 배우자·자녀 공제를 적용하면 실제 세금은 많이 줄어요.
      </p>

      <SectionBadge>상속세 세율표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>과세표준</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>누진공제액</th>
            </tr>
          </thead>
          <tbody>
            {TAX_RATES.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{row.range}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{row.rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "#6b7280" }}>{row.deduct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        공제 적용 후 과세표준 × 세율 - 누진공제 = 산출세액<br />
        기한 내 신고 시 산출세액의 3% 추가 세액공제<br />
        배우자·자녀 공제를 최대한 활용하면 세금을 크게 줄일 수 있어요
      </GreenBox>

      <Divider />

      <H2>공제 항목 — 얼마나 빠지나요?</H2>
      <p style={body}>
        상속세에서 가장 중요한 건 공제 항목이에요.
        배우자가 있으면 최대 30억까지, 자녀는 1인당 5억씩 빠져요.
        공제를 잘 챙기면 재산이 10억이어도 세금이 0원이 될 수 있어요.
      </p>

      <SectionBadge>주요 공제 항목</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>공제 항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>공제 한도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {DEDUCTIONS.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{row.name}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{row.amount}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#6b7280" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        재산 10억 + 배우자 있음 + 자녀 2명 기준:<br />
        일괄공제 5억 + 배우자 5억(기본) = 10억 공제 → 과세표준 0원 → 세금 0원<br />
        상속재산 규모와 가족 구성에 따라 실제 세금이 크게 달라져요
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>상속세 신고부터 납부까지 4단계</H2>
      <p style={body}>
        상속세는 사망일 기준으로 6개월 안에 신고해야 해요.
        재산 파악부터 공제 선택, 세액 계산, 신고·납부까지 순서가 있어요.
        기한을 넘기면 무신고 가산세 20%가 바로 붙으니 미리 준비하는 게 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>상속세 준비 체크리스트</H2>
      <p style={body}>
        신고 기한을 놓치면 가산세가 붙고, 공제를 빠뜨리면 세금을 더 내게 돼요.
        특히 배우자·자녀 공제는 신청해야 적용되는 항목이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        상속세 계산과 공제에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 상속세 및 증여세법을 바탕으로 작성됐어요. 세율·공제 한도는 법 개정으로 변경될 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
