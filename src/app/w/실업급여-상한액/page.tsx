"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 실업급여를 받을 예정인데 2026년 상한액이 얼마인지, 본인이 얼마를 받을 수 있는지 알고 싶은 상황.
// Q2. 2026년 상한액(일 68,100원, 월 약 204만원)을 확인하고 본인 예상 수급액을 계산할 수 있어야 해요.
// Q3. 2026년 상한액 일 68,100원(6년 만에 인상), 하한액 일 64,192원, 계산법(퇴직 전 평균임금의 60%), 수급 기간(120~270일).
// Q4. GreenBox(상한액 요약) + Calculator(예상 수급액) + BorderBox(연도별 변화) + BorderBox(수급 기간) + FAQ
// MAP-INTRO: 실업급여 받을 예정인데 2026년 상한액이 얼마인지 궁금
// MAP-TYPE: 계산기
// MAP-H2: 2026년 상한액 > 수급액 계산법 > 수급 기간 > 연도별 변화 > FAQ
// MAP-COMP: GreenBox > Calculator > BorderBox > BorderBox > FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

function BenefitCalc() {
  const [salary, setSalary] = useState(300);
  const daily = Math.round(salary * 10000 / 30 * 0.6);
  const upper = 68100;
  const lower = 64192;
  const actual = Math.min(upper, Math.max(lower, daily));
  const monthly = actual * 30;
  const fmt = (n: number) => n.toLocaleString("ko-KR");

  return (
    <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20 }}>
      <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#111" }}>실업급여 예상 수급액 계산기</p>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: "#6b7280" }}>퇴직 전 월평균 급여 (만원)</label>
        <input type="range" min={100} max={800} step={10} value={salary} onChange={e => setSalary(+e.target.value)} style={{ width: "100%", accentColor: "#1D9E75" }} />
        <span style={{ fontSize: 14, fontWeight: 600 }}>{fmt(salary)}만원</span>
      </div>
      <div style={{ background: "#E1F5EE", borderRadius: 8, padding: 14 }}>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>일 수급액</p>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#1D9E75" }}>{fmt(actual)}원</p>
        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 8 }}>월 수급액 (30일 기준)</p>
        <p style={{ fontSize: 18, fontWeight: 600, color: "#111" }}>{fmt(monthly)}원</p>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
          계산: 월급 {fmt(salary)}만원 ÷ 30일 x 60% = {fmt(daily)}원 → {daily > upper ? "상한액 적용" : daily < lower ? "하한액 적용" : "그대로 적용"}
        </p>
      </div>
    </div>
  );
}

const FAQS = [
  { q: "2026년 실업급여 상한액이 얼마예요?", a: "일 68,100원이에요. 월로 환산하면 약 204만 3천원이에요. 2020년 이후 6년 만에 인상됐어요." },
  { q: "하한액은 얼마예요?", a: "일 64,192원이에요. 2026년 최저임금(시급 10,030원)의 80%에 해당해요. 아무리 월급이 낮아도 이 금액 이상 받아요." },
  { q: "상한액이면 월급이 높아도 더 못 받나요?", a: "네, 월급이 500만원이든 800만원이든 실업급여 일 상한은 68,100원이에요. 고소득자에게 불리한 구조예요." },
  { q: "실업급여 수급 기간은 얼마예요?", a: "나이와 고용보험 가입기간에 따라 120~270일이에요. 50세 이상이고 10년 이상 가입했으면 최대 270일이에요." },
  { q: "자발적 퇴사도 받을 수 있나요?", a: "원칙적으로 안 돼요. 다만 정당한 사유(임금체불, 직장 내 괴롭힘 등)가 있으면 자발적 퇴사도 수급 가능해요." },
  { q: "실업급여 신청은 어디서 하나요?", a: "고용센터에 방문하거나 워크넷(work.go.kr)에서 온라인 신청해요. 퇴직 후 12개월 이내에 신청해야 해요." },
];

const REFS = [
  { category: "공식 자료", items: [
    { label: "고용보험법", url: "https://www.law.go.kr/법령/고용보험법" },
    { label: "고용노동부", url: "https://www.moel.go.kr" },
    { label: "워크넷", url: "https://www.work.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 상한액 · 수급액</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 실업급여 상한액 일 68,100원<br />
        월 204만원 계산법과 수급 기간
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여를 받을 예정인데 얼마나 받을 수 있는지 궁금하시죠?
        2026년 실업급여 상한액은 일 68,100원(월 약 204만원)이에요. 2020년 이후 6년 만에 인상됐어요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75" }}>고용보험법</a>에 따른 계산법과 수급 기간을 정리했어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>2026년 상한액·하한액이 얼마예요?</H2>
      <p style={body}>상한액은 일 68,100원, 하한액은 일 64,192원이에요. 아무리 월급이 높아도 상한액 이상은 받을 수 없고, 아무리 낮아도 하한액은 보장돼요.</p>
      <GreenBox title="2026년 실업급여 상한·하한">상한액: 일 68,100원 (월 약 204만 3천원) | 하한액: 일 64,192원 (월 약 192만 6천원) | 계산: 퇴직 전 평균임금의 60%</GreenBox>
      <Divider />
      <H2>내 실업급여가 얼마인지 계산해보세요</H2>
      <p style={body}>퇴직 전 월평균 급여를 넣으면 예상 일 수급액과 월 수급액을 볼 수 있어요. 실제 금액은 <a href="/w/실업급여-모의계산" style={{ color: "#1D9E75" }}>실업급여 모의계산</a>에서 정확히 확인하세요.</p>
      <BenefitCalc />
      <Divider />
      <H2>수급 기간은 얼마예요?</H2>
      <p style={body}>나이와 고용보험 가입기간에 따라 120~270일이에요. 50세 이상이거나 장애인은 우대를 받아요.</p>
      <BorderBox title="수급 기간 (2026년 기준)">1년 미만 가입: 120일 | 1~3년: 150일 | 3~5년: 180일 | 5~10년: 210일 | 10년 이상(50세 이상): 270일 | 10년 이상(50세 미만): 240일</BorderBox>
      <Divider />
      <H2>연도별 상한액은 어떻게 변했나요?</H2>
      <p style={body}>2020년 일 66,000원으로 인상된 후 5년간 동결됐다가 2026년에 68,100원으로 올랐어요.</p>
      <BorderBox title="연도별 상한액 변화">2019년: 일 60,000원 | 2020~2025년: 일 66,000원 (6년 동결) | 2026년: 일 68,100원 (인상)</BorderBox>
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 고용보험법 정보를 바탕으로 작성됐어요. 실제 수급액은 개인 상황에 따라 다를 수 있으니 고용센터(1350)에 확인하세요." />
    </div>
  );
}
