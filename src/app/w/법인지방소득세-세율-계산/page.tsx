"use client";
import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 지방세법 제103조의20
// 세율: 0.9%~2.4% (누진세율 4구간)
// 구간1: 과세표준 2억이하 → 0.9%
// 구간2: 2억~200억 → 180만원 + (2억초과분 × 1.9%)
// 구간3: 200억~3000억 → 3,782만원 + (200억초과분 × 2.1%)
// 구간4: 3000억초과 → 381,582만원 + (3000억초과분 × 2.4%)
// 과세표준: 법인세 과세표준과 동일
// 법인세의10%설: 법인세 납부세액 × 10% 아님 — 과세표준에 별도 누진세율 적용
// 세액공제감면: 법인세와 별도로 지방세법상 감면 적용 가능

const SPOKE_LINKS = [
  { title: "법인지방소득세 위택스 신고, 처음인데 어떻게 하나요?", sub: "단계별 절차와 서울 이택스 차이", href: "/w/법인지방소득세-위택스-신고방법" },
  { title: "법인지방소득세 안분신고, 사업장이 두 곳 이상이면 어떻게 나눠 내나요?", sub: "안분 계산 공식과 위택스 작성법", href: "/w/법인지방소득세-안분신고" },
  { title: "법인지방소득세 신고를 못 했다면?", sub: "무신고 가산세와 기한 후 신고 방법", href: "/w/법인지방소득세-가산세-기한후신고" },
  { title: "법인지방소득세 100만원 넘으면 나눠 낼 수 있나요?", sub: "분할납부 조건과 신청방법", href: "/w/법인지방소득세-분할납부" },
];

const SIDEBAR_LINKS = [
  "법인지방소득세 세율",
  "법인지방소득세 계산",
  "법인지방소득세 법인세 10%",
  "법인지방소득세 과세표준",
  "법인지방소득세 세율표",
  "법인지방소득세 누진세율",
  "법인지방소득세 산출세액",
  "법인지방소득세 세액공제",
  "법인세 지방소득세 차이",
  "법인지방소득세 2억 이하",
  "법인지방소득세 계산기",
  "지방세법 제103조의20",
  "법인지방소득세 세율 0.9",
  "법인지방소득세 세율 2.4",
  "법인지방소득세 신고방법",
];

const FAQS = [
  {
    urgent: true,
    q: "법인지방소득세가 법인세의 10%라고 하던데 그냥 10% 곱하면 되나요",
    a: "아니에요. 법인세 납부세액에 10%를 곱하는 게 아니에요. 법인지방소득세는 법인세 과세표준에 별도 누진세율(0.9%~2.4%)을 적용해서 계산해요. 결과적으로 비슷하게 나오는 경우가 많지만 세액공제·감면 적용에 따라 차이가 생겨요. 아래 계산기로 정확한 금액을 확인해보세요.",
  },
  {
    urgent: true,
    q: "법인지방소득세 세율이 정확히 몇 %인가요",
    a: "지방세법 제103조의20 기준 4구간 누진세율이에요. 과세표준 2억 이하: 0.9% / 2억~200억: 1.9% / 200억~3,000억: 2.1% / 3,000억 초과: 2.4%. 대부분 중소기업은 과세표준 2억 이하라 0.9% 구간이에요.",
  },
  {
    urgent: false,
    q: "법인세 과세표준과 법인지방소득세 과세표준이 같은가요",
    a: "네, 동일해요. 홈택스에서 법인세 신고할 때 사용한 과세표준을 그대로 위택스 법인지방소득세 신고에 입력하면 돼요. 별도로 조정할 필요는 없어요.",
  },
  {
    urgent: false,
    q: "법인세 세액공제·감면을 받으면 법인지방소득세도 줄어드나요",
    a: "법인세 세액공제·감면과 법인지방소득세 세액공제·감면은 별개예요. 법인세가 감면돼도 법인지방소득세가 자동으로 줄어들지는 않아요. 지방세법상 별도로 인정되는 감면 항목이 있는지 확인해야 해요. 위택스 신고 화면에서 해당 감면을 따로 입력해야 해요.",
  },
  {
    urgent: false,
    q: "과세표준이 0원이면 법인지방소득세도 0원인가요",
    a: "네. 법인세 과세표준이 0원이면 법인지방소득세도 0원이에요. 다만 결손법인도 신고 의무는 있어요. 신고를 안 하면 무신고 가산세 대상이 될 수 있으니 0원으로라도 신고하는 게 안전해요.",
  },
];

const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

// ─── 세율 계산기
function TaxCalc() {
  const [base, setBase] = useState(5000); // 만원

  const calcTax = (b) => {
    if (b <= 20000)       return Math.round(b * 0.009);
    if (b <= 2000000)     return Math.round(180 + (b - 20000) * 0.019);
    if (b <= 300000000)   return Math.round(37820 + (b - 2000000) * 0.021);
    return Math.round(6277820 + (b - 300000000) * 0.024);
  };

  const getRate = (b) => {
    if (b <= 20000)     return "0.9%";
    if (b <= 2000000)   return "1.9%";
    if (b <= 300000000) return "2.1%";
    return "2.4%";
  };

  const tax = calcTax(base);
  const effectiveRate = base > 0 ? ((tax / base) * 100).toFixed(2) : "0.00";

  // 법인세 10% 가정값 (비교용)
  const corpTaxApprox = (() => {
    let ct = 0;
    if (base <= 20000)       ct = base * 0.09;
    else if (base <= 200000) ct = 1800 + (base - 20000) * 0.19;
    else if (base <= 300000) ct = 35800 + (base - 200000) * 0.21;  // 2026 세율
    else                     ct = 56800 + (base - 300000) * 0.24;
    return Math.round(ct * 0.10);
  })();

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        법인세 과세표준을 입력하면 법인지방소득세 산출세액이 나와요.<br />
        법인세 납부세액 × 10%와 얼마나 차이 나는지도 비교할 수 있어요.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <label style={{ fontSize: 13, color: "#6b7280", width: 120, flexShrink: 0 }}>법인세 과세표준</label>
        <input type="range" min={0} max={50000} step={100} value={base}
          onChange={e => setBase(+e.target.value)} style={{ flex: 1, accentColor: G }} />
        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 90, textAlign: "right" }}>{base.toLocaleString()}만원</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 8, marginTop: 16 }}>
        {[
          { label: "적용 세율",             val: getRate(base),         sub: "지방세법 제103조의20",  color: G,         bg: GL,        border: "#9FE1CB" },
          { label: "법인지방소득세 산출세액", val: `${tax.toLocaleString()}만원`, sub: "정확한 계산",  color: "#111",    bg: "#fff",    border: "#e5e7eb" },
          { label: "법인세 × 10% (참고)",   val: `${corpTaxApprox.toLocaleString()}만원`, sub: "정확하지 않음", color: "#9ca3af", bg: "#f3f4f6", border: "#e5e7eb" },
          { label: "실효세율",              val: `${effectiveRate}%`,   sub: "과세표준 대비",        color: "#374151", bg: "#fff",    border: "#e5e7eb" },
        ].map(card => (
          <div key={card.label} style={{ background: card.bg, borderRadius: 8, padding: "11px 12px", border: `1px solid ${card.border}` }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: card.color, marginBottom: 3 }}>{card.val}</div>
            <div style={{ fontSize: 10, color: "#9ca3af" }}>{card.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 지방세법 제103조의20 누진세율 기준. 세액공제·감면 미적용. 참고용이며 정확한 세액은 위택스 신고 화면에서 확인하세요.
      </p>
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
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function SpokeLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 법인지방소득세 관련 글</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {SPOKE_LINKS.map((link, i) => (
          <a key={i} href={link.href} target="_self"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 4px", borderBottom: i < SPOKE_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.sub}</span>
            </span>
          </a>
        ))}
      </div>
      <a href="/w/법인지방소득세" target="_self"
        style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>
        법인지방소득세 전체 가이드 보기 →
      </a>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>4월 30일 마감</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        위택스에서 과세표준 입력하면<br />세율은 자동으로 계산돼요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        위택스 콜센터(☎110)에 전화하면 신고 방법을 바로 안내해줘요.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, maxWidth: 480, margin: "0 auto" }}>
        <a href="https://www.wetax.go.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none" }}>
          💻 위택스 신고하기
        </a>
        <a href="tel:110" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 위택스 콜센터 110
        </a>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>관련 검색어</p>
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

export default function CorporateLocalTaxRatePage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>

        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>법인세금 · 세율 계산 · 지방세법</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          법인지방소득세, 법인세에 그냥 10% 곱하면 되나요?<br />
          세율 계산법과 오해 정리
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          법인세 납부세액 × 10%는 어림값이에요. 정확하지 않아요.<br />
          법인지방소득세는 법인세 과세표준에 별도 누진세율(0.9%~2.4%)을 적용해요.<br />
          세액공제·감면이 클수록 두 계산 방식의 차이가 벌어져요.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
          <a href="https://www.wetax.go.kr" target="_self"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
            💻 위택스 신고하기
          </a>
          <a href="tel:110" target="_self"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
            📞 위택스 콜센터 110
          </a>
        </div>

        <Divider />

        <H2>법인지방소득세 세율이 정확히 몇 %인가요</H2>
        <p style={body}>
          4구간 누진세율이에요. 대부분 중소기업은 과세표준 2억 이하라 0.9%예요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["과세표준 구간", "세율", "누진공제", "비고"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { range: "2억원 이하",          rate: "0.9%",  deduct: "—",           note: "대부분 중소법인" },
                { range: "2억원 ~ 200억원",     rate: "1.9%",  deduct: "200만원",      note: "" },
                { range: "200억원 ~ 3,000억원", rate: "2.1%",  deduct: "3,800만원",    note: "" },
                { range: "3,000억원 초과",      rate: "2.4%",  deduct: "13,800만원",   note: "대기업" },
              ].map((row, i) => (
                <tr key={i} style={{ background: i === 0 ? GL : i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", fontWeight: i === 0 ? 600 : 400 }}>{row.range}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", fontWeight: 700, color: G }}>{row.rate}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: "#6b7280" }}>{row.deduct}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: "#9ca3af", fontSize: 12 }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>근거: 지방세법 제103조의20</p>
        </div>
        <Bdg>산출세액 계산기 — 과세표준을 입력해보세요</Bdg>
        <TaxCalc />

        <Divider />

        <H2>법인세 납부세액에 10%를 곱하면 되나요, 과세표준에 곱하나요</H2>
        <p style={body}>
          과세표준에 세율을 곱하는 게 맞아요. 법인세 납부세액에 10%를 곱하는 건 어림값이에요.
        </p>
        <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", margin: "12px 0 1.2rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>⚠️ '법인세의 10%' 계산이 틀리는 경우</p>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 2 }}>
            <span style={{ color: "#DC2626" }}>❌ 틀린 방법: 법인세 납부세액 × 10%</span><br />
            법인세 세액공제·감면이 클수록 납부세액이 줄어들어 법인지방소득세를 과소 계산하게 돼요.<br /><br />
            <span style={{ color: G }}>✅ 맞는 방법: 법인지방소득세 과세표준 × 세율(0.9%~2.4%)</span><br />
            법인세 과세표준과 법인지방소득세 과세표준이 같아요. 여기에 누진세율을 적용해요.
          </div>
        </div>
        <GreenBox title="계산 예시 — 과세표준 5억원인 법인">
          법인지방소득세 = 180만원 + (5억 - 2억) × 1.9% = 180만원 + 570만원 = 750만원<br /><br />
          (참고) 법인세 세액 약 5,300만원 × 10% = 530만원 → 220만원 차이 발생 가능
        </GreenBox>

        <Divider />

        <H2>세액공제·감면이 법인지방소득세에도 적용되나요</H2>
        <p style={body}>
          법인세 세액공제·감면과 법인지방소득세 세액공제·감면은 별개예요.<br />
          위택스 신고 화면에서 지방세법상 감면 항목을 따로 입력해야 해요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { label: "창업중소기업 세액감면",   detail: "지방세특례제한법에 따라 법인지방소득세도 감면 가능", ok: true },
            { label: "중소기업 특별세액감면",    detail: "지방세법상 별도 조항 있음, 위택스에서 항목 선택 필요", ok: true },
            { label: "연구·인력개발비 세액공제", detail: "국세(홈택스)에서만 적용, 법인지방소득세는 별도 확인", ok: false },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", borderRadius: 8, background: row.ok ? GL : "#f9fafb", border: `1px solid ${row.ok ? "#9FE1CB" : "#e5e7eb"}` }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2 }}>{row.ok ? "✅" : "⚠️"}</span>
              <span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 3 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{row.detail}</span>
              </span>
            </div>
          ))}
        </div>

        <Divider />

        <H2>법인지방소득세 과세표준은 어떻게 구하나요</H2>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" }}>
          법인세 과세표준과 동일해요. 홈택스에서 법인세 신고할 때 쓴 수치를 그대로 위택스에 입력하면 돼요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { step: "①", label: "법인세 신고서 과세표준 확인", detail: "홈택스 → 법인세 신고내역 → 과세표준 금액" },
            { step: "②", label: "위택스 법인지방소득세 신고 화면에 입력", detail: "신고하기 → 지방소득세 → 법인소득분 → 과세표준 입력란" },
            { step: "③", label: "세율 자동 계산 확인", detail: "0.9%~2.4% 누진세율이 자동 적용되어 산출세액이 나와요" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1D9E75", flexShrink: 0 }}>{s.step}</span>
              <span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 3 }}>{s.label}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{s.detail}</span>
              </span>
            </div>
          ))}
        </div>

        <SpokeLinks />

        <H2>법인지방소득세 세율·계산, 자주 하는 질문</H2>
        <FAQ />

        <CTA />
        <Divider />

        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "지방세법 제103조의20 — 법인지방소득세 세율 (0.9%~2.4%)", url: "https://www.law.go.kr/" },
              { label: "위택스 공식 사이트 (wetax.go.kr) — 법인지방소득세 신고", url: "https://www.wetax.go.kr" },
            ].map(item => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공 목적으로 작성됐어요. 정확한 세액은 위택스 신고 화면 또는 관할 지자체에서 확인하세요.<br />
          ※ 법인지방소득세 세율: 0.9%~2.4% 누진 / 과세표준 2억이하 0.9% / 근거: 지방세법 제103조의20 / 신고납부기한: 4월 30일 (12월 결산) / 위택스: wetax.go.kr / 콜센터: ☎110
        </div>
      </div>
    </div>
  );
}
