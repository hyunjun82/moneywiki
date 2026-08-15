"use client";
/*
  Q1. 만 65세 가까워졌거나 부모님이 65세인데, 기초연금을 받을 수 있는지 궁금한 사람
  Q2. 소득·재산을 입력해서 예상 수령액을 직접 확인한다
  Q2-1. 복지로(bokjiro.go.kr) 기초연금 신청 페이지
  Q3. 나이 조건(65세), 소득인정액 계산 공식, 선정기준액, 감액 구조
  Q4. 계산기(입력→결과) + 체크리스트(자격 확인) + 단계(신청 절차)
*/

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  H2, Divider, body, GreenBox, BorderBox, SectionBadge,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

// ─── 색상 ───
const C = {
  main: "#1D9E75",
  bg: "#E1F5EE",
  text: "#085041",
  border: "#9FE1CB",
  body: "#374151",
  heading: "#111",
  sub: "#6b7280",
  line: "#e5e7eb",
  faint: "#f9fafb",
};

// ─── 2026년 기초연금 기준 (보건복지부 고시 2026.01.01) ───
const CRITERIA = {
  selection: { single: 2_470_000, couple: 3_952_000 },
  pension: { full: 349_360, coupleRate: 0.8 },
  npCap: 524_040, // 기준연금액 150%
  propDeduct: { metro: 135_000_000, city: 85_000_000, rural: 72_500_000 },
  workDeduct: 1_120_000,
  finDeduct: 20_000_000,
};

// ─── 포맷 함수 ───
function fmt(n: number) { return Math.round(n).toLocaleString("ko-KR"); }
function fmtMan(n: number) {
  const m = n / 10_000;
  if (m >= 10_000) return `${(m / 10_000).toFixed(1)}억원`;
  if (m >= 1) return `${fmt(m)}만원`;
  return `${fmt(n)}원`;
}
function parse(v: string) { return parseInt(v.replace(/,/g, "")) || 0; }

// ─── 체크리스트 ───
const CHECK_ITEMS = [
  { id: "c1", label: "만 65세 이상이다 (1961년생 이전)" },
  { id: "c2", label: "대한민국 국적이고 국내 거주 중이다" },
  { id: "c3", label: "소득인정액이 단독 247만원 / 부부 395.2만원 이하다" },
  { id: "c4", label: "공무원·사학·군인·별정우체국 연금 수급자가 아니다" },
];

// ─── 신청 절차 ───
const STEPS = [
  { title: "자격 확인", desc: "만 65세 이상 + 소득인정액 기준 이하인지 확인해요" },
  { title: "신청 장소 선택", desc: "주민센터, 국민연금공단 지사, 복지로(온라인) 중 선택" },
  { title: "서류 준비", desc: "신분증, 통장 사본, 금융정보제공동의서, 전월세 계약서" },
  { title: "신청서 제출", desc: "기초연금 신청서 + 소득·재산 신고서를 함께 제출해요" },
  { title: "결과 통지", desc: "신청 후 30~60일 내에 결정 통지서가 와요" },
];

// ─── FAQ ───
const FAQS = [
  { q: "기초연금은 언제 입금되나요?", a: "매월 25일에 입금돼요. 25일이 주말이나 공휴일이면 그 전 영업일에 들어와요." },
  { q: "국민연금 받으면 기초연금 못 받나요?", a: "둘 다 받을 수 있어요. 다만 국민연금 수령액이 기준연금액의 150%(52만 4,040원)를 넘으면 기초연금이 최대 50%까지 감액될 수 있어요." },
  { q: "부부가 둘 다 받으면 얼마나 깎이나요?", a: "부부 모두 기초연금을 받으면 각각 20% 감액돼요. 2026년 기준 1인당 최대 27만 9,488원이에요." },
  { q: "집이 있어도 기초연금 받을 수 있나요?", a: "받을 수 있어요. 재산에서 기본공제(대도시 1억 3,500만원)를 빼고 소득으로 환산하기 때문에, 집이 있어도 소득인정액 기준 이하면 수급 대상이에요." },
  { q: "기초연금 모의계산 결과가 실제와 다를 수 있나요?", a: "이 계산기는 보건복지부 공식에 따른 예상치예요. 실제 심사에서는 공시가격, 금융 조회, 소득 조사 등 더 세밀한 기준이 적용돼요." },
  { q: "65세 되기 전에 미리 신청할 수 있나요?", a: "생일이 속한 달의 1개월 전부터 사전 신청할 수 있어요. 예를 들어 7월 생이면 6월 1일부터 신청 가능해요." },
];

// ─── 출처 ───
const REFERENCES = [
  { category: "법령", items: [
    { label: "기초연금법", url: "https://www.law.go.kr/법령/기초연금법" },
    { label: "기초연금법 시행령", url: "https://www.law.go.kr/법령/기초연금법시행령" },
  ]},
  { category: "공식 자료", items: [
    { label: "보건복지부 기초연금", url: "https://www.mohw.go.kr" },
    { label: "복지로 기초연금 신청", url: "https://www.bokjiro.go.kr" },
    { label: "국민연금공단", url: "https://www.nps.or.kr" },
  ]},
];

const RELATED = [
  { slug: "기초연금-수급자격-선정기준액-소득조건", title: "기초연금 수급자격 선정기준액과 소득 조건", description: "2026년 기초연금 수급자격과 선정기준액 조건 정리" },
  { slug: "기초연금-소득인정액-계산-공제항목", title: "기초연금 소득인정액 계산 공제항목", description: "소득인정액 계산 공식과 공제 항목 정리" },
  { slug: "기초연금-신청방법-절차", title: "기초연금 신청 방법과 절차", description: "주민센터, 복지로 신청 절차 안내" },
];

// ─── 빠른 입력 버튼 ───
function QuickBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      padding: "4px 10px", fontSize: 12, color: C.main, background: C.bg,
      border: `1px solid ${C.border}`, borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

// ─── 입력 필드 컴포넌트 ───
function Field({ label, value, onChange, desc, unit = "원", quickAmounts }: {
  label: string; value: number; onChange: (v: number) => void; desc?: string; unit?: string;
  quickAmounts?: number[];
}) {
  return (
    <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.line}` }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
        <span style={{ minWidth: 120, flexShrink: 0, fontSize: 14, fontWeight: 500, color: C.body }}>{label}</span>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="text"
            inputMode="numeric"
            value={fmt(value)}
            onChange={(e) => onChange(parse(e.target.value))}
            style={{ width: "100%", maxWidth: 200, padding: "8px 12px", textAlign: "right", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: "none" }}
          />
          <span style={{ fontSize: 13, color: C.sub }}>{unit}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, marginTop: 6, marginLeft: 0 }}>
        {quickAmounts && quickAmounts.map((a) => (
          <QuickBtn key={a} label={`+${fmtMan(a)}`} onClick={() => onChange(value + a)} />
        ))}
        {value > 0 && <QuickBtn label="초기화" onClick={() => onChange(0)} />}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        {desc && <span style={{ fontSize: 12, color: C.sub }}>{desc}</span>}
        {value > 0 && <span style={{ fontSize: 12, color: C.main, fontWeight: 600 }}>= {fmtMan(value)}</span>}
      </div>
    </div>
  );
}

// ─── 메인 페이지 ───
export default function Page() {
  const [birthYear, setBirthYear] = useState(1959);
  const [household, setHousehold] = useState<"single" | "couple">("single");
  const [region, setRegion] = useState<"metro" | "city" | "rural">("metro");
  const [workIncome, setWorkIncome] = useState(0);
  const [pensionIncome, setPensionIncome] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [generalProp, setGeneralProp] = useState(0);
  const [financialAsset, setFinancialAsset] = useState(0);
  const [debt, setDebt] = useState(0);

  const [result, setResult] = useState({ age: 0, ageOk: false, workEval: 0, monthlyEval: 0, propEval: 0, total: 0, criteria: 0, eligible: false, amount: 0 });

  const calc = useCallback(() => {
    const age = 2026 - birthYear;
    const ageOk = age >= 65;
    const criteria = household === "single" ? CRITERIA.selection.single : CRITERIA.selection.couple;
    const workD = Math.max(0, workIncome - CRITERIA.workDeduct);
    const workEval = workD * 0.7;
    const monthlyEval = workEval + pensionIncome + otherIncome;
    const deduct = CRITERIA.propDeduct[region];
    const finD = Math.max(0, financialAsset - CRITERIA.finDeduct);
    const netProp = Math.max(0, (generalProp - deduct) + finD - debt);
    const propEval = (netProp * 0.04) / 12;
    const total = monthlyEval + propEval;
    const eligible = ageOk && total <= criteria;
    let amount = 0;
    if (eligible) {
      amount = CRITERIA.pension.full;
      if (household === "couple") amount = Math.round(amount * CRITERIA.pension.coupleRate);
      if (pensionIncome > CRITERIA.npCap) amount = Math.max(Math.round(CRITERIA.pension.full * 0.5), Math.round(amount * 0.5));
      if (total + amount > criteria) {
        const adj = Math.max(0, criteria - total);
        amount = Math.max(Math.round(CRITERIA.pension.full * 0.5), adj);
      }
    }
    setResult({ age, ageOk, workEval, monthlyEval, propEval, total, criteria, eligible, amount });
  }, [birthYear, household, region, workIncome, pensionIncome, otherIncome, generalProp, financialAsset, debt]);

  useEffect(() => { calc(); }, [calc]);

  const regionLabel = region === "metro" ? "대도시" : region === "city" ? "중소도시" : "농어촌";
  const regionDeduct = CRITERIA.propDeduct[region];

  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-모의계산" />}>
      {/* 브레드크럼 */}
      <nav style={{ fontSize: 13, color: C.sub, marginBottom: 8 }}>
        <Link href="/" style={{ color: C.sub }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: C.sub }}>기초연금</Link> &gt;{" "}
        <span style={{ color: C.body }}>모의계산</span>
      </nav>

      {/* h1 */}
      <h1 style={{ fontSize: 26, fontWeight: 800, color: C.heading, lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 모의계산
      </h1>
      <p style={{ fontSize: 17, color: C.main, fontWeight: 600, marginBottom: 20 }}>
        내 소득·재산으로 얼마 받을까? 수령액 확인
      </p>

      {/* intro */}
      <p style={body}>
        부모님이나 본인이 곧 65세인데, 기초연금을 받을 수 있는지 궁금하죠. 소득이 얼마 이하여야 하는지, 집이 있으면 안 되는 건지 헷갈리고요.
      </p>
      <p style={body}>
        아래 계산기에 출생연도, 소득, 재산을 입력하면 2026년 기준 예상 수령액을 바로 확인할 수 있어요. 선정기준액은 단독가구 월 247만원, 부부가구 월 395만 2천원이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── H2-1: 자격 확인 ── */}
      <H2>내가 기초연금 대상인지 먼저 확인해요</H2>
      <p style={body}>
        기초연금은 만 65세 이상이면서 소득인정액이 선정기준 이하인 분께 지급돼요. 아래 4가지를 모두 충족하는지 체크해 보세요.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />
      <p style={body}>
        4가지를 모두 충족하면 기초연금 신청 대상이에요. 다만 공무원연금·사학연금 등 직역연금을 받고 있으면 원칙적으로 제외되지만, 연금 수령액이 기준연금액 이하이거나 유족연금만 받는 경우는 예외로 인정돼요.
      </p>

      <Divider />

      {/* ── H2-2: 계산기 ── */}
      <H2>소득·재산 입력하고 예상 수령액 계산해요</H2>
      <p style={body}>
        아래에 본인(배우자 포함) 소득과 재산을 입력하면 소득인정액을 자동으로 계산하고, 기초연금 수급 여부와 예상 금액을 바로 보여줘요.
      </p>

      {/* 계산기 본체 */}
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
        {/* 헤더 */}
        <div style={{ background: C.main, color: "#fff", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>기초연금 모의계산기</div>
            <div style={{ fontSize: 13, color: C.bg, marginTop: 4 }}>2026년 보건복지부 기준</div>
          </div>
          <button type="button" onClick={() => {
            setWorkIncome(0); setPensionIncome(0); setOtherIncome(0);
            setGeneralProp(0); setFinancialAsset(0); setDebt(0);
            setBirthYear(1959); setHousehold("single"); setRegion("metro");
          }} style={{
            padding: "6px 14px", fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.4)", borderRadius: 8, cursor: "pointer",
          }}>
            전체 초기화
          </button>
        </div>

        {/* 1. 기본 정보 */}
        <div style={{ borderBottom: `1px solid ${C.line}` }}>
          <div style={{ background: C.bg, padding: "10px 20px", borderBottom: `1px solid ${C.line}` }}>
            <span style={{ fontWeight: 600, color: C.text }}>1. 기본 정보</span>
          </div>
          {/* 출생연도 */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: `1px solid ${C.line}` }}>
            <span style={{ width: 160, fontSize: 14, fontWeight: 500, color: C.body }}>출생연도</span>
            <input type="number" value={birthYear} onChange={(e) => setBirthYear(parseInt(e.target.value) || 0)} min={1920} max={1961}
              style={{ width: 100, padding: "8px 12px", textAlign: "right", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14 }} />
            <span style={{ fontSize: 13, color: C.sub }}>년</span>
            <span style={{ fontSize: 13, color: result.ageOk ? C.main : "#d97706", fontWeight: 600 }}>
              만 {result.age}세 {result.ageOk ? "(대상)" : "(미달)"}
            </span>
          </div>
          {!result.ageOk && birthYear > 0 && (
            <div style={{ margin: "8px 16px", padding: 12, background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 10, fontSize: 13, color: "#92400E" }}>
              만 65세 이상부터 신청할 수 있어요. {result.age < 65 && `${65 - result.age}년 후(${birthYear + 65}년)`} 생일 1개월 전부터 사전 신청 가능해요.
            </div>
          )}
          {/* 가구형태 */}
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.line}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ width: 160, fontSize: 14, fontWeight: 500, color: C.body }}>가구형태</span>
              {(["single", "couple"] as const).map((t) => (
                <label key={t} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <input type="radio" name="hh" checked={household === t} onChange={() => setHousehold(t)}
                    style={{ accentColor: C.main }} />
                  <span style={{ fontSize: 14, color: C.body }}>{t === "single" ? "단독가구" : "부부가구"}</span>
                </label>
              ))}
            </div>
            {household === "couple" && (
              <p style={{ fontSize: 12, color: C.sub, marginTop: 4, marginLeft: 160 }}>부부 모두 수급 시 각각 20% 감액</p>
            )}
          </div>
          {/* 거주지역 */}
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.line}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ width: 160, fontSize: 14, fontWeight: 500, color: C.body }}>거주지역</span>
              <select value={region} onChange={(e) => setRegion(e.target.value as "metro" | "city" | "rural")}
                style={{ padding: "8px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, background: "#fff" }}>
                <option value="metro">대도시 (특별시·광역시)</option>
                <option value="city">중소도시 (시 지역)</option>
                <option value="rural">농어촌 (군 지역)</option>
              </select>
            </div>
            <p style={{ fontSize: 12, color: C.sub, marginTop: 4, marginLeft: 160 }}>
              재산 기본공제: {fmtMan(regionDeduct)}
            </p>
          </div>
        </div>

        {/* 2. 소득 */}
        <div style={{ borderBottom: `1px solid ${C.line}` }}>
          <div style={{ background: C.bg, padding: "10px 20px", borderBottom: `1px solid ${C.line}` }}>
            <span style={{ fontWeight: 600, color: C.text }}>2. 월 소득 (세전, 본인+배우자 합산)</span>
          </div>
          <Field label="근로소득" value={workIncome} onChange={setWorkIncome} desc="월급·일용직 (112만원 공제 후 70% 반영)" quickAmounts={[500_000, 1_000_000, 2_000_000]} />
          <Field label="국민연금 수령액" value={pensionIncome} onChange={setPensionIncome} desc="국민·공무원·사학연금 등" quickAmounts={[300_000, 500_000, 1_000_000]} />
          <div style={{ padding: "8px 16px", background: C.faint, fontSize: 12, color: C.sub, borderBottom: `1px solid ${C.line}` }}>
            국민연금 수령액을 모르면 국민연금공단(1355) 또는{" "}
            <Link href="https://www.nps.or.kr" style={{ color: C.main, fontWeight: 600 }}>nps.or.kr</Link>에서 조회할 수 있어요
          </div>
          <Field label="기타소득" value={otherIncome} onChange={setOtherIncome} desc="사업·이자·배당·임대소득 등" quickAmounts={[100_000, 500_000, 1_000_000]} />
        </div>

        {/* 3. 재산 */}
        <div style={{ borderBottom: `1px solid ${C.line}` }}>
          <div style={{ background: C.bg, padding: "10px 20px", borderBottom: `1px solid ${C.line}` }}>
            <span style={{ fontWeight: 600, color: C.text }}>3. 재산 (본인+배우자 합산)</span>
          </div>
          <Field label="일반재산" value={generalProp} onChange={setGeneralProp} desc="주택·토지 시가표준액" quickAmounts={[50_000_000, 100_000_000, 200_000_000]} />
          <Field label="금융재산" value={financialAsset} onChange={setFinancialAsset} desc="예금·적금·주식 (2,000만원 공제)" quickAmounts={[10_000_000, 50_000_000, 100_000_000]} />
          <Field label="부채" value={debt} onChange={setDebt} desc="대출금 등 (재산에서 차감)" quickAmounts={[10_000_000, 50_000_000, 100_000_000]} />
        </div>

        {/* 4. 계산 과정 */}
        <div style={{ borderBottom: `1px solid ${C.line}` }}>
          <div style={{ background: C.bg, padding: "10px 20px", borderBottom: `1px solid ${C.line}` }}>
            <span style={{ fontWeight: 600, color: C.text }}>4. 소득인정액 계산 과정</span>
          </div>
          <div style={{ padding: 16 }}>
            {[
              { label: "근로소득 평가 (공제 후 70%)", val: result.workEval, highlight: false },
              { label: "연금 + 기타소득", val: pensionIncome + otherIncome, highlight: false },
              { label: "월 소득평가액", val: result.monthlyEval, highlight: true },
              { label: `재산 소득환산액 (${regionLabel} 기준)`, val: result.propEval, highlight: false },
              { label: "소득인정액 합계", val: result.total, highlight: true },
            ].map((r, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", padding: "8px 12px", borderBottom: `1px solid ${C.line}`,
                background: r.highlight ? C.bg : "transparent", borderRadius: r.highlight ? 6 : 0,
              }}>
                <span style={{ fontSize: 14, color: r.highlight ? C.text : C.sub, fontWeight: r.highlight ? 600 : 400 }}>{r.label}</span>
                <span style={{ fontSize: 14, fontWeight: r.highlight ? 700 : 500, color: r.highlight ? C.main : C.body }}>{fmt(r.val)}원</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderBottom: `1px solid ${C.line}` }}>
              <span style={{ fontSize: 14, color: C.sub }}>선정기준액 ({household === "single" ? "단독" : "부부"}가구)</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: C.body }}>{fmt(result.criteria)}원</span>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, marginTop: 4,
              background: result.eligible ? "#ECFDF5" : "#FEF3C7",
            }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>수급 판정</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: result.eligible ? C.main : "#92400E" }}>
                {!result.ageOk ? "나이 미달" : result.eligible ? "수급 가능" : `기준 초과 (+${fmt(result.total - result.criteria)}원)`}
              </span>
            </div>
            {/* 수급 불가 시 안내 */}
            {result.ageOk && !result.eligible && (
              <div style={{ marginTop: 8, padding: 12, background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 8, fontSize: 13, color: "#9A3412" }}>
                <strong>기준을 넘었다고 포기하지 마세요.</strong>
                <ul style={{ marginTop: 6, paddingLeft: 16 }}>
                  <li>부채(대출금)가 누락됐는지 다시 입력해 보세요. 부채는 재산에서 차감돼요.</li>
                  <li>일반재산은 시가가 아니라 <strong>시가표준액(공시가격)</strong> 기준이에요. 실거래가보다 낮아요.</li>
                  <li>가까운 주민센터나 국민연금공단(1355)에서 정확한 심사를 받아보세요.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 5. 결과 */}
        {result.eligible && (
          <div style={{ background: `linear-gradient(135deg, ${C.bg}, #F0FDF4)` }}>
            <div style={{ background: C.main, padding: "10px 20px" }}>
              <span style={{ fontWeight: 600, color: "#fff" }}>기초연금 예상 결과</span>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: 24, textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                <p style={{ color: C.sub, marginBottom: 8 }}>예상 월 수령액</p>
                <p style={{ fontSize: 36, fontWeight: 800, color: C.main, marginBottom: 4 }}>{fmt(result.amount)}원</p>
                <p style={{ fontSize: 14, color: C.sub }}>연간 약 {fmtMan(result.amount * 12)}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                <div style={{ background: "#fff", borderRadius: 10, padding: 16, textAlign: "center" }}>
                  <p style={{ fontSize: 12, color: C.sub }}>가구형태</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: C.heading }}>{household === "single" ? "단독" : "부부"}가구</p>
                </div>
                <div style={{ background: "#fff", borderRadius: 10, padding: 16, textAlign: "center" }}>
                  <p style={{ fontSize: 12, color: C.sub }}>지급일</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: C.heading }}>매월 25일</p>
                </div>
              </div>
              {household === "couple" && (
                <div style={{ marginTop: 12, padding: 12, background: "rgba(255,255,255,0.6)", borderRadius: 10, fontSize: 14, color: C.body }}>
                  부부가구는 각각 20% 감액돼서 1인당 {fmt(result.amount)}원이에요. 두 분 합산하면 월 {fmt(result.amount * 2)}원을 받을 수 있어요.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <GreenBox>
        <strong>소득인정액 = 월 소득평가액 + 재산의 소득환산액</strong><br />
        근로소득은 월 112만원 공제 후 70%만 반영하고, 재산은 기본공제를 뺀 뒤 연 4%로 환산해요. 금융재산은 2,000만원까지 추가 공제돼요.
      </GreenBox>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── H2-3: 감액 ── */}
      <H2>기초연금이 깎이는 경우는 3가지예요</H2>
      <SectionBadge>감액 구조</SectionBadge>
      <p style={body}>
        기초연금 기준연금액은 월 34만 9,360원이지만, 모든 수급자가 이 금액을 다 받는 건 아니에요. 크게 3가지 경우에 감액이 적용돼요.
      </p>
      <p style={body}>
        첫째, <strong>부부 감액</strong>이에요. 부부 모두 기초연금을 받으면 각각 20%씩 줄어들어요. 1인당 27만 9,488원이 돼요. 둘째, <strong>국민연금 연계감액</strong>이에요. 국민연금 수령액이 기준연금액의 150%(52만 4,040원)를 넘기면, 기초연금이 최대 50%까지 감액될 수 있어요.
      </p>
      <p style={body}>
        셋째, <strong>소득역전 방지 감액</strong>이에요. 소득인정액에 기초연금을 더한 금액이 선정기준액을 넘으면, 넘는 만큼 줄여요. 다만 기준연금액의 50%(17만 4,680원)는 최소한 보장돼요.
      </p>
      <BorderBox>
        감액이 적용되더라도 기준연금액의 50%인 <strong>17만 4,680원</strong>은 최소한 보장돼요. 기초연금이 0원으로 떨어지는 경우는 없어요.
      </BorderBox>

      <Divider />

      {/* ── H2-4: 신청 ── */}
      <H2>기초연금 신청은 이렇게 해요</H2>
      <p style={body}>
        기초연금은 만 65세 생일이 속한 달의 1개월 전부터 신청할 수 있어요. 주민센터(읍면동 행정복지센터), 국민연금공단 지사, 또는 <Link href="https://www.bokjiro.go.kr" style={{ color: C.main, fontWeight: 600 }}>복지로</Link>에서 온라인으로 신청하면 돼요.
      </p>
      <Steps steps={STEPS} />
      <p style={body}>
        신청 후 소득·재산 조사를 거쳐 30~60일 이내에 결정 통지서를 받아요. 수급이 결정되면 신청일이 속한 달부터 기초연금이 지급돼요. 늦게 신청하면 신청 전 기간은 소급되지 않으니, 65세가 되면 바로 신청하는 게 유리해요.
      </p>

      <Divider />

      {/* ── FAQ ── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 계산기는 2026년 보건복지부 기준에 따른 예상치이며, 실제 수급 여부는 공적 심사를 통해 결정돼요. 정확한 결과는 국민연금공단이나 주민센터에서 확인하세요." />
    </ArticleLayout>
  );
}
