"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 중소벤처기업부 공고 제2026-37호, 부가가치세법 제61조제2항
// 지원금액: 25만원 (1개사당)
// 매출기준: 2025년 연매출 0원 초과 1억 400만원 미만
// 2024년 이전 개업: 국세청 신고 2025년 1년 매출액 그대로
// 2025년 개업: 개업 이후 월 평균 매출 × 12개월 (1개월 미만 끝수는 1개월로 간주)
// 면세사업자: 수정신고 불가 → 4가지 서류 별도 제출
// 이의신청: 탈락 안내 후 10일 이내
// 사용기한: 2026년 12월 31일 (이월 없음, 국고 회수)
// 콜센터: 1533-0600

const CALC_EXAMPLES = [
  {
    label: "2024년 10월 개업 → 2025년 전체 운영",
    type: "before",
    months: 12,
    totalSales: 9000,
    calc: "9,000만원 (국세청 신고 2025년 연매출 그대로)",
    result: "✅ 1억 400만원 미만 → 지원 대상",
    ok: true,
  },
  {
    label: "2025년 4월 개업 → 9개월 운영, 총 매출 6,000만원",
    type: "new2025",
    months: 9,
    totalSales: 6000,
    calc: "(6,000만원 ÷ 9개월) × 12개월 = 8,000만원",
    result: "✅ 1억 400만원 미만 → 지원 대상",
    ok: true,
  },
  {
    label: "2025년 10월 개업 → 3개월 운영, 총 매출 2,500만원",
    type: "new2025",
    months: 3,
    totalSales: 2500,
    calc: "(2,500만원 ÷ 3개월) × 12개월 = 10,000만원",
    result: "✅ 1억 400만원 미만 → 지원 대상 (공고문 예시)",
    ok: true,
  },
  {
    label: "2025년 7월 개업 → 6개월 운영, 총 매출 8,000만원",
    type: "new2025",
    months: 6,
    totalSales: 8000,
    calc: "(8,000만원 ÷ 6개월) × 12개월 = 16,000만원",
    result: "❌ 1억 400만원 초과 → 지원 제외",
    ok: false,
  },
];

const FAQS = [
  {
    urgent: true,
    q: "부업이나 겸업 매출도 합산해서 계산하나요",
    a: "소상공인시장진흥공단이 국세청에 신고된 해당 사업체의 매출액을 기준으로 확인해요. 신청하는 사업체의 매출액이 기준이에요. 단, 1인이 여러 사업체를 운영할 경우 1개 사업체만 신청 가능하고, 선택한 사업체의 매출액이 1억 400만원 미만이어야 해요.",
  },
  {
    urgent: true,
    q: "2025년 중간에 개업했으면 매출을 어떻게 계산하나요",
    a: "개업 이후 월 평균 매출 × 12개월로 환산해요. 예를 들어 2025년 10월 20일 개업 후 3개월간 2,500만원 매출이면 (2,500만원 ÷ 3개월) × 12개월 = 1억원이에요. 1개월 미만 끝수는 1개월로 간주해요(부가가치세법 제61조제2항). 일 단위로 나누는 방식은 틀린 계산이에요.",
  },
  {
    urgent: true,
    q: "면세사업자는 매출을 어떻게 증명하나요",
    a: "면세사업자는 국세청 과세정보 자동 연계가 안 될 수 있어요. 이 경우 홈택스에서 4가지 서류를 제출해야 해요: ① 전자(세금)계산서 내역(분기별) ② 현금영수증 매출내역 누계(분기별) ③ 카드매출내역(분기별) ④ 주업종코드. 모두 캡처 또는 PDF로 제출 (엑셀 불가).",
  },
  {
    urgent: false,
    q: "매출이 기준 초과로 탈락했는데 이의신청 할 수 있나요",
    a: "네. 탈락 안내를 받은 날로부터 10일 이내에 이의신청(의견제출)을 할 수 있어요. 소상공인 경영안정 바우처 신청 홈페이지(voucher.sbiz24.kr)에서 매출 증빙 서류를 첨부해 재검증을 요청하면 돼요. 면세사업자라면 매출 0원으로 잡힌 경우에도 4가지 서류로 이의신청 가능해요.",
  },
  {
    urgent: false,
    q: "매출이 0원이면 신청이 안 되나요",
    a: "국세청 신고 기준으로 매출이 0원이면 지원 대상에서 제외돼요. 단, 면세사업자라서 매출이 0원으로 잡힌 경우 별도 서류를 제출해 재검증을 받을 수 있어요. 아직 매출 신고를 안 한 경우 국세청에 신고 후 신청해야 해요.",
  },
  {
    urgent: false,
    q: "2025년 12월 31일에 개업하면 신청할 수 있나요",
    a: "개업일 기준은 2025년 12월 31일 이전이에요. 2025년 12월 31일 개업도 가능해요. 단, 매출이 단 하루분이라도 국세청에 신고됐어야 해요. 사업자등록증의 개업연월일이 기준이에요 (발급일자가 아님).",
  },
  {
    urgent: false,
    q: "국세청에 신고한 매출과 실제 매출이 다르면 어떻게 되나요",
    a: "소상공인시장진흥공단은 국세청에 신고된 매출액만 확인해요. 실제 매출과 신고 매출이 다를 경우, 신고된 매출 기준으로 판단해요. 신고 매출 기준으로 기준 초과면 탈락해요. 허위 신고는 보조금 관리법에 따라 환수 조치될 수 있어요.",
  },
];

const HUB_LINKS = [
  { title: "소상공인 경영안정 바우처 받을 수 있을까?", sub: "매출 기준과 제외 대상", href: "/w/소상공인-경영안정-바우처-받을-수-있을까" },
  { title: "소상공인 경영안정 바우처 신청방법", sub: "소상공인24 온라인 접수 절차", href: "/w/소상공인-경영안정-바우처-신청방법" },
  { title: "소상공인 경영안정 바우처 탈락했다면?", sub: "거절 이유와 이의신청 방법", href: "/w/소상공인-경영안정-바우처-탈락" },
];

const SIDEBAR_LINKS = [
  "소상공인 경영안정 바우처 매출계산",
  "소상공인 바우처 연매출 1억 400만원",
  "소상공인 바우처 2025년 개업 매출",
  "소상공인 바우처 면세사업자",
  "소상공인 바우처 이의신청",
  "소상공인 바우처 매출 환산",
  "소상공인 바우처 겸업 매출",
  "소상공인 바우처 탈락 이유",
  "소상공인 경영안정 바우처 대상",
  "소상공인 경영안정 바우처 신청방법",
  "소상공인 경영안정 바우처 사용처",
  "소상공인 경영안정 바우처 25만원",
  "소상공인 경영안정 바우처 2026",
  "소상공인시장진흥공단 콜센터",
  "voucher.sbiz24.kr",
];

const G  = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }: any) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }: any) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }: any) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }: any) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function ApplyButtons() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
      <a href="https://voucher.sbiz24.kr/" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
        📱 바우처 신청하기
      </a>
      <a href="tel:15330600" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
        📞 콜센터 1533-0600
      </a>
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    new2025: {
      title: "2025년에 개업해서 계산 방법이 헷갈린다면",
      color: G, bg: GL,
      text: "월 평균 매출 × 12개월이 공식이에요. 일 단위로 나누는 방법은 틀렸어요. 개업일 이후 영업한 월 수로만 나누고 12를 곱하면 돼요. 1개월 미만 끝수는 1개월로 간주해요. 아래 계산기로 바로 확인해보세요.",
    },
    exempt: {
      title: "면세사업자라서 매출이 0원으로 잡혔다면",
      color: "#D97706", bg: "#FFFBEB",
      text: "수정신고가 불가능하니 당황하지 말고 4가지 서류를 제출하면 돼요. ① 전자(세금)계산서 내역 ② 현금영수증 매출내역 ③ 카드매출내역 ④ 주업종코드. 모두 홈택스에서 캡처 또는 PDF로 제출 (엑셀 불가).",
    },
    appeal: {
      title: "매출 기준 초과로 탈락했는데 이의신청하고 싶다면",
      color: "#DC2626", bg: "#FEF2F2",
      text: "탈락 안내를 받은 날로부터 10일 이내에 이의신청을 해야 해요. voucher.sbiz24.kr에 접속해 매출 증빙 서류를 첨부하고 재검증을 요청하면 돼요. 기한을 넘기면 해당 회차 신청이 취소될 수 있어요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "new2025", label: "2025년에 개업해서 매출 계산 방법이 헷갈려요." },
          { id: "exempt",  label: "면세사업자라서 매출이 0원으로 잡혔어요." },
          { id: "appeal",  label: "매출 기준 초과로 탈락했는데 이의신청하고 싶어요." },
        ].map(item => (
          <button key={item.id} onClick={() => setType(item.id)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
            borderRadius: 8, border: "1px solid #FED7AA", background: "#fff",
            fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left",
          }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );

  const m = messages[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button onClick={() => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 매출 계산기 (핵심 컴포넌트)
function SalesCalculator() {
  const [tab, setTab] = useState("before");
  const [annualSales, setAnnualSales] = useState(8000);
  const [months, setMonths] = useState(6);
  const [periodSales, setPeriodSales] = useState(5000);
  const LIMIT = 10400;

  const annualized = Math.round((periodSales / months) * 12);
  const eligBefore = annualSales > 0 && annualSales < LIMIT;
  const eligNew    = annualized > 0 && annualized < LIMIT;

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {[
          { id: "before",  label: "2024년 이전 개업" },
          { id: "new2025", label: "2025년 개업" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 18px", borderRadius: 20, cursor: "pointer", fontSize: 13,
            border: `2px solid ${tab === t.id ? G : "#e5e7eb"}`,
            background: tab === t.id ? GL : "#fff",
            fontWeight: tab === t.id ? 700 : 400,
            color: tab === t.id ? GD : "#374151",
          }}>{t.label}</button>
        ))}
      </div>

      {tab === "before" && (
        <>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>국세청에 신고한 2025년 연매출을 그대로 적용해요.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: "#6b7280", width: 120, flexShrink: 0 }}>2025년 연매출</label>
            <input type="range" min={0} max={15000} step={100} value={annualSales}
              onChange={e => setAnnualSales(+e.target.value)}
              style={{ flex: 1, accentColor: G }} />
            <span style={{ fontSize: 13, fontWeight: 700, minWidth: 90, textAlign: "right" }}>{annualSales.toLocaleString()}만원</span>
          </div>
          <div style={{ padding: "14px 16px", borderRadius: 8, background: eligBefore ? GL : annualSales === 0 ? "#FEF9C3" : "#FEF2F2", border: `1px solid ${eligBefore ? "#9FE1CB" : annualSales === 0 ? "#FCD34D" : "#FCA5A5"}` }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: eligBefore ? G : annualSales === 0 ? "#B45309" : "#DC2626", marginBottom: 4 }}>
              {eligBefore ? "✅ 지원 대상이에요" : annualSales === 0 ? "⚠️ 매출 0원 — 지원 제외" : "❌ 기준 초과 — 지원 제외"}
            </p>
            <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
              {eligBefore ? `연매출 ${annualSales.toLocaleString()}만원 < 1억 400만원 기준 충족` :
               annualSales === 0 ? "매출 신고 후 신청하거나, 면세사업자는 별도 서류 제출" :
               `연매출 ${annualSales.toLocaleString()}만원 > 1억 400만원 기준 초과`}
            </p>
          </div>
        </>
      )}

      {tab === "new2025" && (
        <>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
            공식: <strong>(개업 후 총 매출 ÷ 영업 개월 수) × 12개월</strong> — 1개월 미만 끝수는 1개월로 간주
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: "#6b7280", width: 120, flexShrink: 0 }}>영업 개월 수</label>
            <input type="range" min={1} max={12} step={1} value={months}
              onChange={e => setMonths(+e.target.value)}
              style={{ flex: 1, accentColor: G }} />
            <span style={{ fontSize: 13, fontWeight: 700, minWidth: 90, textAlign: "right" }}>{months}개월</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: "#6b7280", width: 120, flexShrink: 0 }}>기간 내 총 매출</label>
            <input type="range" min={0} max={10000} step={100} value={periodSales}
              onChange={e => setPeriodSales(+e.target.value)}
              style={{ flex: 1, accentColor: G }} />
            <span style={{ fontSize: 13, fontWeight: 700, minWidth: 90, textAlign: "right" }}>{periodSales.toLocaleString()}만원</span>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <div style={{ flex: 1, background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "10px 14px" }}>
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>월 평균 매출</p>
              <p style={{ fontSize: 15, fontWeight: 700 }}>{Math.round(periodSales / months).toLocaleString()}만원</p>
            </div>
            <div style={{ flex: 1, background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "10px 14px" }}>
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>연 환산 매출</p>
              <p style={{ fontSize: 15, fontWeight: 700 }}>{annualized.toLocaleString()}만원</p>
            </div>
            <div style={{ flex: 1, background: eligNew ? GL : "#FEF2F2", borderRadius: 8, border: `1px solid ${eligNew ? "#9FE1CB" : "#FCA5A5"}`, padding: "10px 14px" }}>
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>결과</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: eligNew ? G : "#DC2626" }}>
                {eligNew ? "대상 ✅" : "초과 ❌"}
              </p>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.7 }}>
            계산식: ({periodSales.toLocaleString()}만원 ÷ {months}개월) × 12개월 = {annualized.toLocaleString()}만원 / 기준: 1억 400만원 미만<br />
            ※ 부가가치세법 제61조제2항 — 1개월 미만 끝수는 1개월로 간주
          </p>
        </>
      )}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)}
            style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff" }}>
            <span>
              {f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && (
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 소상공인 경영안정 바우처 관련 글</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} target="_self"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.sub}</span>
            </span>
          </a>
        ))}
      </div>
      <a href="/w/소상공인-경영안정-바우처" target="_self"
        style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>
        소상공인 경영안정 바우처 전체 가이드 보기 →
      </a>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>매출 기준 확인됐으면 바로 신청하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        계산하고 보니 해당된다면<br />예산 소진 전에 바로 신청하세요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        소상공인24에서 서류 없이 3분이면 완료예요.<br />
        2026년 12월 31일까지 미사용 잔액은 국고로 회수돼요.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://voucher.sbiz24.kr/" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none" }}>
          📱 소상공인24 바로 신청
        </a>
        <a href="tel:15330600" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 콜센터 1533-0600
        </a>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>소상공인 경영안정 바우처 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" target="_self"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function VoucherSalesCalcPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>소상공인 지원 · 중소벤처기업부 · 2026</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          소상공인 경영안정 바우처 매출 계산 방법<br />
          1억 400만원 기준 정확히 따지는 법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          계산 방법이 맞아야 통과예요. 같은 매출인데 방법이 틀리면 탈락이에요.<br />
          2025년 개업자는 월 평균 × 12개월, 2024년 이전 개업자는 연매출 그대로예요.<br /><br />
          아래 계산기로 내 매출이 기준에 해당하는지 바로 확인해보세요.
        </p>

        <ApplyButtons />
        <UrgentBanner />

        <Bdg>개업 시점 선택 → 매출 기준 계산기</Bdg>
        <SalesCalculator />

        <Divider />

        <H2>연매출 1억 400만원 기준, 부업이나 겸업 매출도 합산하나요</H2>
        <p style={body}>
          신청하는 사업체의 국세청 신고 매출만 봐요. 겸업이라도 해당 사업체 매출 기준이에요.<br />
          다만 1인이 여러 사업체를 운영하면 1개 사업체만 신청 가능하니, 기준 충족하는 곳을 골라야 해요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { label: "본업 사업체 매출만 기준", detail: "신청하는 사업체의 국세청 신고 매출이 1억 400만원 미만이면 됨", ok: true },
            { label: "여러 사업체 중 1개 선택 신청", detail: "매출 기준 충족하는 사업체 1개만 선택 가능", ok: true },
            { label: "여러 사업체 매출 합산은 안 함", detail: "각 사업체 매출은 개별 판단 (합산 아님)", ok: true },
            { label: "1인 여러 사업체 중복 신청", detail: "안 됨 — 1인 1개사 원칙", ok: false },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", borderRadius: 8, background: row.ok ? GL : "#FEF2F2", border: `1px solid ${row.ok ? "#9FE1CB" : "#FCA5A5"}` }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2 }}>{row.ok ? "✅" : "❌"}</span>
              <span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 3 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{row.detail}</span>
              </span>
            </div>
          ))}
        </div>

        <Divider />

        <H2>2025년 중간에 개업했으면 매출을 어떻게 계산하나요</H2>
        <p style={body}>
          월 평균 매출 × 12개월이 공식이에요. 일 단위로 나누는 건 틀린 방법이에요.<br />
          공고문에 올바른 계산법과 잘못된 계산법이 명시돼 있어요.
        </p>
        <div style={{ background: "#FFF7ED", borderRadius: 10, padding: "16px 18px", margin: "12px 0 1.2rem", border: "1px solid #FED7AA" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>⚠️ 같은 매출, 다른 계산 — 결과가 달라요</p>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 2, margin: 0 }}>
            <strong>상황:</strong> 2025년 10월 20일 개업 / 2025년 총 매출 2,500만원 (3개월 영업)<br />
            <span style={{ color: "#DC2626" }}>❌ 잘못된 계산: (2,500만원 ÷ 72일) × 365일 = 1억 2,674만원 → 기준 초과, 탈락</span><br />
            <span style={{ color: G }}>✅ 올바른 계산: (2,500만원 ÷ 3개월) × 12개월 = 1억원 → 기준 이하, 통과</span><br />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>※ 1개월 미만 끝수는 1개월로 간주 (부가가치세법 제61조제2항) / 근거: 중소벤처기업부 공고 제2026-37호</span>
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "0 0 1.2rem" }}>
          {CALC_EXAMPLES.map((ex, i) => (
            <div key={i} style={{ padding: "12px 16px", borderRadius: 8, background: ex.ok ? GL : "#FEF2F2", border: `1px solid ${ex.ok ? "#9FE1CB" : "#FCA5A5"}` }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: ex.ok ? GD : "#DC2626", marginBottom: 6 }}>{ex.label}</p>
              <p style={{ fontSize: 12, color: "#374151", marginBottom: 4 }}>계산: {ex.calc}</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: ex.ok ? G : "#DC2626", margin: 0 }}>{ex.result}</p>
            </div>
          ))}
        </div>

        <Divider />

        <H2>면세사업자는 매출을 어떻게 증명하나요</H2>
        <p style={body}>
          면세사업자는 국세청 과세정보 자동 연계가 안 될 수 있어요.<br />
          수정신고가 불가능하기 때문에 별도 서류 4가지를 제출해서 재검증받아야 해요.
        </p>
        <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "0 0 1.2rem" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 14 }}>제출 서류 4가지 (홈택스에서 출력)</p>
          {[
            { n: "①", title: "전자(세금)계산서 내역 (분기별)", path: "홈택스 → 전자(세금)계산서·현금영수증·신용카드 → 전자(세금)계산서 조회 → 월/분기별 목록조회" },
            { n: "②", title: "현금영수증 매출내역 누계 (분기별)", path: "홈택스 → 전자(세금)계산서·현금영수증·신용카드 → 현금영수증 조회·발급수단 → 가맹점 → 현금영수증 매출내역 조회" },
            { n: "③", title: "카드매출내역 (분기별)", path: "홈택스 → 신용카드 매출 → 신용카드 판매(결제)대행 매출자료 조회" },
            { n: "④", title: "주업종코드", path: "홈택스 → 기타 세무정보 → 사업자등록사항 및 담당자 안내" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, paddingBottom: i < 3 ? 16 : 0, position: "relative" }}>
              {i < 3 && <div style={{ position: "absolute", left: 15, top: 28, bottom: 0, width: 1, background: "#e5e7eb" }} />}
              <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.8 }}>{s.path}</div>
              </div>
            </div>
          ))}
          <p style={{ fontSize: 12, color: "#DC2626", marginTop: 14, background: "#FEF2F2", borderRadius: 6, padding: "8px 12px" }}>
            ⚠️ 캡처 또는 PDF 파일로 제출 — 엑셀 파일은 인정 안 돼요
          </p>
        </div>

        <Divider />

        <H2>매출이 기준 초과로 탈락했는데 이의신청 할 수 있나요</H2>
        <p style={body}>
          네. 탈락 안내를 받은 날로부터 10일 이내에 이의신청을 할 수 있어요.<br />
          계산 오류·면세사업자 매출 미반영·국세청 신고 지연 등의 경우 재검증 기회가 있어요.
        </p>
        <GreenBox title="이의신청 방법">
          신청 경로: voucher.sbiz24.kr 로그인 → 신청 현황 → 이의신청 메뉴<br />
          기한: 탈락 안내를 받은 날로부터 10일 이내<br />
          필요 서류: 매출 증빙 자료 (면세사업자는 4가지 서류), 사유 소명서<br />
          기한 초과 시: 해당 회차 신청 취소 — 반드시 기한 내 제출해야 해요
        </GreenBox>
        <BorderBox title="이의신청이 가능한 경우">
          면세사업자라서 매출이 0원으로 잡힌 경우<br />
          국세청 신고 지연으로 매출이 반영 안 된 경우<br />
          2025년 개업자 연 환산 매출 계산 오류 의심 시<br />
          기타 매출 기준 판단 오류라고 생각되는 경우
        </BorderBox>

        <HubLinks />

        <H2>소상공인 경영안정 바우처 매출 계산, 자주 하는 질문</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />

        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "중소벤처기업부 공고 제2026-37호 (2026.1.28.) — 매출 산정기준·연 환산 방식 명시", url: "https://voucher.sbiz24.kr/" },
              { label: "부가가치세법 제61조제2항 — 1개월 미만 끝수는 1개월로 간주", url: "https://www.law.go.kr/" },
              { label: "소상공인 경영안정 바우처 신청 사이트 (voucher.sbiz24.kr)", url: "https://voucher.sbiz24.kr/" },
              { label: "소상공인 경영안정 바우처 전용 콜센터 ☎1533-0600", url: "tel:15330600" },
            ].map(item => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공 목적으로 작성됐어요. 매출 기준 적용 및 이의신청은 소상공인24 또는 소상공인시장진흥공단(☎1533-0600)에서 최종 확인하세요.<br />
          ※ 지원금액 25만원 / 매출기준 1억 400만원 미만 / 개업일 2025년 12월 31일 이전 / 카드사 9개사 / 사용처: 공과금·4대 보험료·차량연료비 / 사용기한 2026년 12월 31일 (이월 없음, 국고 회수) / 이의신청 기한 10일 / 근거: 중소벤처기업부 공고 제2026-37호
        </div>
      </div>
    </div>
  );
}
