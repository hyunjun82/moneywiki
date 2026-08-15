"use client";
// Q1. 재건축 아파트 조합원인데 부담금이 얼마나 나올지, 어떻게 계산하는지 알고 싶은 상황.
// Q2. 재건축부담금 산정 공식을 이해하고 본인 부담금을 추정할 수 있어야 해요.
// Q3. 산정 공식(초과이익 x 부과율), 면제 기준(8천만원 이하), 부과율 구간(10~50%), 1주택 장기보유 감면(최대 70%), 60세 이상 납부 유예.
// Q4. GreenBox(공식 요약) + Calculator(부담금 추정) + BorderBox(부과율 구간표) + BorderBox(감면율) + FAQ
// MAP-INTRO: 재건축 아파트에 살고 있는데 부담금이 얼마나 나올지 궁금함
// MAP-TYPE: 계산기
// MAP-H2: 산정 공식 > 부과율 구간 > 면제 기준 > 장기보유 감면 > 납부 유예 > FAQ
// MAP-COMP: GreenBox > Calculator > BorderBox > BorderBox > BorderBox > FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

function BurdCalc() {
  const [profit, setProfit] = useState(15000);
  const [years, setYears] = useState(10);
  const exempt = 8000;
  const taxable = Math.max(0, profit - exempt);
  let rate = 0;
  if (taxable <= 5000) rate = 0.1;
  else if (taxable <= 10000) rate = 0.2;
  else if (taxable <= 20000) rate = 0.3;
  else rate = 0.5;
  const raw = taxable * rate;
  let discountRate = 0;
  if (years >= 20) discountRate = 0.7;
  else if (years >= 15) discountRate = 0.6;
  else if (years >= 10) discountRate = 0.5;
  else if (years >= 6) discountRate = years * 0.1 - 0.5;
  const final = Math.max(0, raw * (1 - discountRate));
  const fmt = (n: number) => n.toLocaleString("ko-KR");

  return (
    <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20 }}>
      <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#111" }}>재건축부담금 간이 계산기</p>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: "#6b7280" }}>초과이익 (만원)</label>
        <input type="range" min={0} max={50000} step={1000} value={profit} onChange={e => setProfit(+e.target.value)} style={{ width: "100%", accentColor: "#1D9E75" }} />
        <span style={{ fontSize: 14, fontWeight: 600 }}>{fmt(profit)}만원</span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: "#6b7280" }}>1주택 보유기간 (년)</label>
        <input type="range" min={0} max={30} step={1} value={years} onChange={e => setYears(+e.target.value)} style={{ width: "100%", accentColor: "#1D9E75" }} />
        <span style={{ fontSize: 14, fontWeight: 600 }}>{years}년 {years >= 6 ? `(감면 ${(discountRate * 100).toFixed(0)}%)` : "(감면 없음)"}</span>
      </div>
      <div style={{ background: "#E1F5EE", borderRadius: 8, padding: 14, marginTop: 10 }}>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>예상 부담금</p>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#1D9E75" }}>{fmt(Math.round(final))}만원</p>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>과세 초과이익 {fmt(taxable)}만원 x 부과율 {(rate * 100).toFixed(0)}% = {fmt(Math.round(raw))}만원 → 감면 후</p>
      </div>
    </div>
  );
}

const FAQS = [
  { q: "재건축부담금은 누가 내나요?", a: "재건축 조합원이 내요. 분양받을 때 조합에서 부담금을 정산해서 청구해요. 일반 분양자는 대상이 아니에요." },
  { q: "20년 넘게 보유한 1주택자는 감면 받나요?", a: "네, 70% 감면받아요. 보유 기간에 따라 감면율이 달라지는데 20년 이상이 최대 70%예요." },
  { q: "초과이익 8천만원 이하면 부담금이 없나요?", a: "네, 면제예요. 8천만원을 넘는 부분에만 부과율이 적용돼요." },
  { q: "부담금은 언제 내나요?", a: "관리처분계획 인가 후에 청구받아요. 보통 입주 전에 납부해요. 일시납 또는 분할납부가 가능해요." },
  { q: "60세 이상이면 납부를 미룰 수 있나요?", a: "1가구 1주택 고령자는 납부 유예가 가능해요. 나중에 집을 팔 때 정산하면 돼요. 다만 이자가 붙어요." },
  { q: "상속받은 집이 있으면 1주택 감면이 안 되나요?", a: "상속 주택은 취득 후 5년 이내에 처분하면 주택 수에서 제외돼요. 5년 안에 팔면 1주택자로 인정받아 감면 혜택을 받을 수 있어요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "재건축초과이익 환수에 관한 법률", url: "https://www.law.go.kr/법령/재건축초과이익환수에관한법률" },
    { label: "찾기쉬운 생활법령 재건축사업", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1170" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 재건축 · 부담금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재건축부담금, 얼마나 내야 하나요?<br />
        산정 기준과 감면 조건
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        재건축 아파트에 살고 있는데, 부담금이 얼마나 나올지 걱정되시죠?
        <a href="https://www.law.go.kr/법령/재건축초과이익환수에관한법률" style={{ color: "#1D9E75" }}>재건축초과이익 환수법</a>에 따라
        일반 집값 상승분을 넘어서는 초과이익에 부담금이 부과돼요. 8천만원까지는 면제이고, 1주택 장기보유자는 최대 70% 감면돼요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>산정 공식은 어떻게 되나요?</H2>
      <p style={body}>
        재건축부담금 = 재건축초과이익 x 부과율이에요. 초과이익은 재건축 완료 후 집값에서 재건축 전 집값, 정상 집값 상승분, 개발비용을 뺀 금액이에요.
        정상 상승분은 같은 지역 일반 주택이 평균적으로 오른 만큼을 말해요.
      </p>
      <GreenBox title="산정 공식">
        초과이익 = (재건축 후 집값) - (재건축 전 집값) - (정상 집값 상승분) - (개발비용). 이 초과이익에 부과율(10~50%)을 곱하면 부담금이에요. 8천만원 이하면 면제.
      </GreenBox>

      <Divider />

      <H2>부과율은 얼마예요?</H2>
      <p style={body}>
        초과이익이 클수록 부과율이 높아지는 누진 구조예요. 8천만원까지는 면제이고, 초과하는 부분에 구간별로 부과돼요.
      </p>
      <BorderBox title="초과이익 구간별 부과율">
        8천만원 이하: 면제(0%) | ~1억3천만원: 10% | ~1억8천만원: 20% | ~2억8천만원: 30% | 2억8천만원 초과: 50%
      </BorderBox>

      <Divider />

      <H2>우리 집 부담금이 얼마일지 계산해보세요</H2>
      <p style={body}>
        초과이익과 보유기간을 넣으면 대략적인 부담금을 계산할 수 있어요. 실제 금액은 조합 정산 시 확정되지만 참고용으로 활용하세요.
      </p>
      <BurdCalc />

      <Divider />

      <H2>1주택 장기보유자는 얼마나 감면되나요?</H2>
      <p style={body}>
        1가구 1주택으로 오래 보유했다면 부담금을 크게 깎아줘요. 실거주 목적으로 오래 산 사람을 배려하는 거예요.
        보유기간은 취득일부터 재건축 종료일까지로 계산해요.
      </p>
      <BorderBox title="보유기간별 감면율 (1주택자)">
        6~10년 미만: 10~40% | 10~15년 미만: 50% | 15~20년 미만: 60% | 20년 이상: 70% (최대)
      </BorderBox>

      <Divider />

      <H2>60세 이상이면 납부를 미룰 수 있나요?</H2>
      <p style={body}>
        1가구 1주택 고령자(60세 이상)는 납부 유예를 받을 수 있어요. 당장 목돈을 내기 어려운 상황을 고려한 거예요.
        나중에 집을 팔 때 정산하면 돼요. 다만 유예 기간 동안 이자가 붙고, 일정 소득 기준 이하여야 해요.
      </p>
      <BorderBox title="납부 유예 조건">
        60세 이상 1가구 1주택자 | 일정 소득 기준 이하 | 유예 기간 이자 부과 | 주택 매도 시 정산
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 1월 기준 법령 정보를 바탕으로 작성됐어요. 실제 부담금은 조합 정산 시 확정되니 관리처분계획을 확인하세요." />
    </div>
  );
}
