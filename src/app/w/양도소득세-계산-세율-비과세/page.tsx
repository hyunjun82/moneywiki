"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     집을 팔았거나 팔 예정인 1주택자·다주택자가 세금이 얼마나 나올지 계산하려는 상황
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     내 세율 구간 확인 + 비과세 해당 여부 판단 + 양도일부터 2개월 내 신고 준비
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     세율 6~45%, 1주택 비과세 9억·2년 보유, 조정지역 2년 거주, 다주택 중과 유예 2026.5.9, 신고 기한 2개월
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     세율표 → 비과세 요건 GreenBox → 장기보유특별공제 표 → 신고 절차 Steps → FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const TAX_RATES = [
  { base: "1,400만원 이하", rate: "6%", tax: "과세표준 × 6%" },
  { base: "1,400만~5,000만원", rate: "15%", tax: "84만 + 초과분 × 15%" },
  { base: "5,000만~8,800만원", rate: "24%", tax: "624만 + 초과분 × 24%" },
  { base: "8,800만~1.5억원", rate: "35%", tax: "1,536만 + 초과분 × 35%" },
  { base: "1.5억~3억원", rate: "38%", tax: "3,706만 + 초과분 × 38%" },
  { base: "3억~5억원", rate: "40%", tax: "9,406만 + 초과분 × 40%" },
  { base: "5억원 초과", rate: "42%", tax: "17,406만 + 초과분 × 42%" },
];

const LONG_TERM = [
  { period: "3년 이상", house1: "24% (보유 연 8%)", other: "6% (연 2%)" },
  { period: "5년 이상", house1: "40% (보유 연 8%)", other: "10% (연 2%)" },
  { period: "10년 이상", house1: "80% (보유+거주 각 40%)", other: "15% (연 2%, 최대)" },
];

const STEPS = [
  {
    title: "양도차익 계산",
    desc: "양도차익 = 양도가액 - 취득가액 - 필요경비예요. 필요경비에는 취득세, 법무사 비용, 인테리어·수리 비용(자본적 지출) 등이 포함돼요. 영수증을 모아두면 세금을 줄일 수 있어요.",
    tip: "계약서, 취득세 영수증, 인테리어 영수증 모두 보관하세요",
  },
  {
    title: "비과세·공제 여부 확인",
    desc: "1세대 1주택이고 9억원 이하라면 전액 비과세예요. 9억 초과 고가주택은 초과분만 과세해요. 조정대상지역이면 2년 이상 거주 요건이 추가로 필요해요. 3년 이상 보유했다면 장기보유특별공제도 적용돼요.",
    tip: "거주 요건은 매수 당시 조정대상지역 여부가 기준이에요",
  },
  {
    title: "세율 적용 후 세액 계산",
    desc: "비과세·공제를 뺀 과세표준에 세율을 적용해요. 단기 보유(1~2년)는 40~50% 단일세율이 적용돼요. 1년 미만 보유는 70%, 1~2년은 60%예요. 장기 보유할수록 누진세율이 유리해요.",
  },
  {
    title: "양도일부터 2개월 내 예정신고",
    desc: "부동산 양도 후 양도일이 속하는 달의 말일부터 2개월 이내에 신고해야 해요. 1월에 팔면 3월 말까지예요. 홈택스에서 온라인 신고 가능해요. 신고 안 하면 무신고 가산세 20%가 붙어요.",
    link: { label: "홈택스 양도소득세 신고", href: "https://www.hometax.go.kr" },
  },
];

const CHECKLIST = [
  "1세대 1주택 + 9억원 이하 + 2년 보유 → 전액 비과세",
  "조정대상지역 + 2017.8.3 이후 매수 → 2년 거주 필수",
  "다주택자 중과 유예: 2022.5.10~2026.5.9 양도 시 기본세율",
  "3년 이상 보유 → 장기보유특별공제 (1주택 최대 80%)",
  "신고 기한: 양도일 속한 달 말일 + 2개월 (홈택스 신고)",
  "무신고 시 가산세 20% 추가 부과",
];

const FAQS = [
  {
    q: "1주택자 비과세 요건이 정확히 뭔가요?",
    a: "1세대가 1주택을 2년 이상 보유하고 양도가액이 9억원 이하면 전액 비과세예요. 9억원 초과 고가주택은 초과분에만 세금을 내요. 조정대상지역이라면 2년 이상 거주 요건이 추가로 있어요.",
  },
  {
    q: "다주택자인데 지금 팔면 세금이 얼마나 나오나요?",
    a: "2026년 5월 9일까지 양도하면 기본세율(6~45%)이 적용돼요. 중과세 유예 기간이에요. 그 이후에는 조정대상지역 2주택자는 +20%p, 3주택자는 +30%p 중과될 수 있어요.",
  },
  {
    q: "취득 후 1년 안에 팔면 세율이 어떻게 되나요?",
    a: "70% 단일세율이에요. 1~2년 보유는 60%예요. 2년 이상 보유해야 일반 누진세율(6~45%)이 적용돼요. 단기 양도는 세금 부담이 매우 커요.",
  },
  {
    q: "장기보유특별공제는 어떻게 계산해요?",
    a: "1주택은 3년 이상 보유부터 연 8%씩 공제돼요. 10년 이상 보유+거주하면 80%까지 공제받아요. 다른 부동산은 3년부터 연 2%씩, 최대 15%예요. 공제가 클수록 실효세율이 낮아져요.",
  },
  {
    q: "신고를 안 하면 어떻게 되나요?",
    a: "국세청이 직권으로 조사하고 세금을 추징해요. 무신고 가산세 20%에 납부불성실 가산세도 붙어요. 홈택스로 신고하면 어렵지 않으니 기한 내에 꼭 하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제94조: 양도소득의 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제89조: 비과세 양도소득", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "조세특례제한법: 다주택자 중과 유예", url: "https://www.law.go.kr/법령/조세특례제한법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 양도소득세 개요", url: "https://www.nts.go.kr" },
      { label: "홈택스: 양도소득세 신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "1세대-1주택-양도소득세-비과세-요건", title: "1세대 1주택 비과세 요건", description: "2년 보유·거주·9억 기준 상세 조건이에요." },
  { slug: "취득세-계산", title: "취득세 계산 방법", description: "집 살 때 내는 취득세 계산법이에요." },
  { slug: "종합부동산세", title: "종합부동산세 계산", description: "다주택자·고가주택 보유세 계산이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>양도소득세 · 부동산 세금 · 비과세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        양도소득세 계산·세율·비과세<br />
        2026년 기준 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집을 팔면 차익에 대해 양도소득세를 내야 해요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제94조</a>에서 양도소득의 범위를 정해요.
        1세대 1주택이라면 9억원까지 비과세 혜택이 있고, 다주택자는 2026년 5월 9일까지 중과 유예 중이에요.
        세율은 과세표준에 따라 6%~42%로 적용돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>양도소득세 세율표 2026</H2>
      <p style={body}>
        양도소득세는 과세표준에 따라 누진세율이 적용돼요.
        과세표준은 양도차익에서 각종 공제를 뺀 금액이에요.
        단기 보유(2년 미만)는 40~70% 단일세율이라 일반 누진세율보다 훨씬 높아요.
      </p>

      <SectionBadge>2026년 세율표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf8" }}>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>과세표준</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>세율</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>산출 방식</th>
            </tr>
          </thead>
          <tbody>
            {TAX_RATES.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb" }}>{row.base}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", fontWeight: 700, color: "#1D9E75" }}>{row.rate}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", color: "#4b5563" }}>{row.tax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        1주택 비과세: 9억원 이하 + 2년 보유 (조정지역은 2년 거주 추가)<br />
        다주택 중과 유예: 2022.5.10~2026.5.9 기본세율 적용<br />
        단기 양도: 1년 미만 70%, 1~2년 60% (누진세율 대신 적용)
      </GreenBox>

      <Divider />

      <H2>장기보유특별공제</H2>
      <p style={body}>
        3년 이상 보유하면 양도차익에서 일정 비율을 공제해줘요.
        1주택자는 보유+거주 기간이 길수록 공제율이 높아져요.
        10년 이상 보유하고 거주까지 하면 80%까지 공제받아요.
      </p>

      <SectionBadge>장기보유특별공제율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf8" }}>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>보유기간</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>1세대 1주택</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>일반 부동산</th>
            </tr>
          </thead>
          <tbody>
            {LONG_TERM.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", fontWeight: 600 }}>{row.period}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", color: "#1D9E75" }}>{row.house1}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", color: "#4b5563" }}>{row.other}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신고 납부 절차</H2>
      <p style={body}>
        양도 후 2개월 안에 신고해야 해요. 홈택스에서 직접 할 수 있고, 복잡한 경우엔 세무사 도움을 받는 게 좋아요.
        신고를 빠뜨리면 가산세가 붙고, 나중에 국세청이 직권으로 조사해요.
        필요경비 영수증은 부동산 매매 전부터 모아두는 게 세금을 줄이는 데 도움이 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신고 전 체크리스트</H2>
      <p style={body}>
        비과세 해당 여부부터 확인하고, 해당 안 되면 공제 항목 챙기는 순서로 진행하세요.
        다주택자는 2026년 5월 9일이 중과 유예 마감이에요.
      </p>

      <SectionBadge>양도소득세 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        양도가액 - 취득가액 - 필요경비 = 양도차익<br />
        양도차익 - 장기보유특별공제 - 양도소득기본공제(250만원) = 과세표준<br />
        과세표준 × 세율 = 양도소득세
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 소득세법을 바탕으로 작성됐어요. 비과세 기준·중과세 유예 일정은 변경될 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
