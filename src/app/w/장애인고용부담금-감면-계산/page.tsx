"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 장애인 직접 고용이 어려운 사업주가 부담금을 줄일 수 있는 방법(연계고용)이 있는지 알고 싶은 상황.
// Q2. 부담금 계산 공식을 이해하고 연계고용으로 최대 50% 감면 신청까지 할 수 있어야 해요.
// Q3. 부담금 공식(미달인원 x 월 1,280,800원 x 12), 의무고용률 3.1%, 연계고용 감면(최대 50%), 100인 미만 면제, 신고 기한 1월 31일.
// Q4. GreenBox(공식 요약) + Calculator(부담금 계산) + EligibilityChecker(납부 대상 확인) + Steps(신청 절차) + FAQ
// MAP-INTRO: 장애인 직접 고용이 어려운데 부담금을 줄이는 방법이 있는지 궁금함
// MAP-TYPE: 계산기
// MAP-H2: 부담금 계산 공식 > 납부 대상 확인 > 연계고용 감면 > 신청 방법 > FAQ
// MAP-COMP: GreenBox > Calculator > EligibilityChecker > Steps > FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

function BurdCalc() {
  const [employees, setEmployees] = useState(200);
  const [hired, setHired] = useState(2);
  const [linked, setLinked] = useState(false);
  const rate = 0.031;
  const required = Math.floor(employees * rate);
  const shortage = Math.max(0, required - hired);
  const monthly = 1280800;
  const annual = shortage * monthly * 12;
  const discounted = linked ? Math.round(annual * 0.5) : annual;
  const fmt = (n: number) => n.toLocaleString("ko-KR");

  return (
    <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20 }}>
      <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#111" }}>장애인고용부담금 계산기</p>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: "#6b7280" }}>상시 근로자 수</label>
        <input type="range" min={100} max={1000} step={10} value={employees} onChange={e => setEmployees(+e.target.value)} style={{ width: "100%", accentColor: "#1D9E75" }} />
        <span style={{ fontSize: 14, fontWeight: 600 }}>{employees}명 (의무 고용: {required}명)</span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: "#6b7280" }}>현재 장애인 고용 수</label>
        <input type="range" min={0} max={required + 5} step={1} value={hired} onChange={e => setHired(+e.target.value)} style={{ width: "100%", accentColor: "#1D9E75" }} />
        <span style={{ fontSize: 14, fontWeight: 600 }}>{hired}명 (미달: {shortage}명)</span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: "#6b7280", marginRight: 8 }}>연계고용 감면 적용</label>
        <input type="checkbox" checked={linked} onChange={e => setLinked(e.target.checked)} style={{ accentColor: "#1D9E75" }} />
        <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 4 }}>(최대 50% 감면)</span>
      </div>
      <div style={{ background: "#E1F5EE", borderRadius: 8, padding: 14 }}>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>연간 부담금</p>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#1D9E75" }}>{fmt(discounted)}원</p>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>미달 {shortage}명 x 월 {fmt(monthly)}원 x 12개월{linked ? " x 50% 감면" : ""}</p>
      </div>
    </div>
  );
}

const ELIG_ITEMS = [
  { id: "e1", label: "상시 근로자 100명 이상 사업장이에요" },
  { id: "e2", label: "장애인 의무고용률(3.1%)에 미달해요" },
  { id: "e3", label: "매년 1월 31일까지 부담금을 신고해야 해요" },
];

const APPLY_STEPS = [
  { title: "연계고용 대상 기관 찾기", desc: "장애인 표준사업장이나 중증장애인 직업재활시설에서 물품·용역을 구매할 수 있는 곳을 찾으세요." },
  { title: "연계고용 확인서 발급", desc: "한국장애인고용공단(kead.or.kr)에서 연계고용 확인서를 사전에 발급받으세요." },
  { title: "물품 구매 또는 도급 계약", desc: "확인서 발급 후 장애인 생산품 구매 또는 도급 계약을 체결하세요." },
  { title: "부담금 신고 시 감면 반영", desc: "매년 1월 31일까지 부담금 신고서에 연계고용 실적을 기재하면 감면이 적용돼요.", tip: "기한을 넘기면 가산금이 붙어요" },
];

const FAQS = [
  { q: "100명 미만 사업장도 부담금을 내나요?", a: "아니요. 상시 근로자 100명 미만은 부담금 납부 의무 자체가 없어요. 의무고용률 신고는 해야 하지만 부담금은 0원이에요." },
  { q: "부담기초액은 매년 바뀌나요?", a: "네, 최저임금 인상을 반영해서 매년 조정돼요. 2026년 기준 월 1,280,800원이에요." },
  { q: "연계고용으로 최대 얼마까지 감면받나요?", a: "해당 연도 부담금 총액의 50%까지 감면돼요. 연계고용 실적이 아무리 많아도 절반 이상은 감면이 안 돼요." },
  { q: "부담금 신고 기한은 언제예요?", a: "매년 1월 31일까지예요. 전년도 고용 현황과 연계고용 실적을 합산해서 신고하면 돼요. 기한을 넘기면 가산금이 붙어요." },
  { q: "의무고용률을 초과하면 장려금을 받나요?", a: "네, 초과 고용 시 고용장려금을 받을 수 있어요. 한국장애인고용공단에서 신청하면 돼요." },
  { q: "분할납부가 가능한가요?", a: "네, 일시납 또는 분할납부가 가능해요. 분할납부 조건은 공단에 문의하세요." },
];

const REFS = [
  { category: "법령·기관", items: [
    { label: "장애인고용촉진 및 직업재활법", url: "https://www.law.go.kr/법령/장애인고용촉진및직업재활법" },
    { label: "한국장애인고용공단", url: "https://www.kead.or.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 장애인 · 부담금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인고용부담금, 얼마나 나오나요?<br />
        감면 계산과 연계고용 신청 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        장애인을 직접 고용하기 어려운데 부담금이 부담되시죠? 연계고용 제도를 활용하면 부담금을 최대 50%까지 감면받을 수 있어요.
        <a href="https://www.law.go.kr/법령/장애인고용촉진및직업재활법" style={{ color: "#1D9E75" }}>장애인고용촉진법</a>에서 인정하는 합법적 감면 방식이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>부담금 계산 공식은 어떻게 되나요?</H2>
      <p style={body}>
        부담금 = (의무고용인원 - 실제고용인원) x 부담기초액(월) x 12개월이에요. 2026년 의무고용률은 3.1%이고, 부담기초액은 월 1,280,800원이에요.
        상시 근로자 200명인 회사라면 의무 고용 6명이에요. 2명만 고용했다면 미달 4명이고, 연간 약 6,150만원이 부담금이에요.
      </p>
      <GreenBox title="부담금 핵심 요약">
        100명 미만: 부담금 없음 | 100명 이상: 의무 3.1% 미달 시 부담금 발생 | 부담기초액: 월 1,280,800원 (2026년) | 연계고용: 최대 50% 감면 | 신고 기한: 매년 1월 31일
      </GreenBox>

      <Divider />

      <H2>우리 회사 부담금이 얼마인지 계산해보세요</H2>
      <p style={body}>
        상시 근로자 수와 장애인 고용 인원을 넣으면 연간 부담금을 추정할 수 있어요. 연계고용 감면까지 적용해볼 수 있어요.
      </p>
      <BurdCalc />

      <Divider />

      <H2>우리 회사가 납부 대상인가요?</H2>
      <p style={body}>
        상시 근로자 100명 이상 사업장이 대상이에요. 100명 미만이면 부담금 자체가 없어요.
        의무고용률(3.1%) 이상 장애인을 고용하고 있다면 부담금이 0원이에요.
      </p>
      <SectionBadge>납부 대상 확인</SectionBadge>
      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="부담금 납부 대상이에요. 연계고용으로 감면받는 방법을 확인하세요."
        partialMatchText="일부 조건에 해당해요. 사업장 규모와 고용 현황을 다시 확인해보세요."
      />

      <Divider />

      <H2>연계고용으로 감면받으려면 어떻게 하나요?</H2>
      <p style={body}>
        장애인 표준사업장이나 직업재활시설에서 물품·용역을 구매하면 연계고용 실적으로 인정돼요.
        구매 금액의 일정 비율이 부담금에서 감면돼요. 최대 50%까지 가능해요.
      </p>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 2월 기준 장애인고용촉진법 정보를 바탕으로 작성됐어요. 정확한 부담금은 한국장애인고용공단에서 확인하세요." />
    </div>
  );
}
