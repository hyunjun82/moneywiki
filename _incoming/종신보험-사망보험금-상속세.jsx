import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 상속세 및 증여세법 제8조·제22조·제27조
// 간주상속재산_과세요건: 피상속인 실질 보험료 납입 + 수익자 법정상속인 (상증법 제8조)
// 상속재산_포함금액: 보험금 × (피상속인 납입보험료 / 총납입보험료)
// 금융재산상속공제: 순금융재산의 20%, 최대 2억원 (상증법 제22조)
// 금융재산공제_하한: 순금융재산 2,000만원 초과 시 적용
// 상속세_신고기한: 사망일이 속한 달의 말일부터 6개월
// 상속세_일괄공제: 5억원
// 배우자공제: 최대 30억원
// 상속세율: 10~50%
// 상속포기시보험금: 수령 가능 (민법상 상속인 고유재산)
// 채권자압류: 불가
// 세대건너뛰기할증: 산출세액 30% 할증 (손자 등)
// 이자소득세비과세: 사망 원인 보험금 보험차익 비과세

const HUB_LINKS = [
  { title: "종신보험 증여세·상속세, 언제 뭐가 나오나요?", sub: "계약자 변경 시 증여세 vs 사망 후 상속세 차이", href: "/w/종신보험-증여세-상속세-차이" },
  { title: "상속세 계산 세율 공제", sub: "2026년 기준 세율표와 공제 항목", href: "/w/상속세-계산-세율-공제" },
  { title: "상속세 신고 방법과 기한", sub: "6개월 이내, 홈택스 신고 절차", href: "/w/상속세-신고" },
  { title: "종신보험 계약자 변경 증여세", sub: "해지환급금 기준 계산과 절세 전략", href: "/w/종신보험-증여세-상속세-차이" },
];

const SIDEBAR_LINKS = [
  "종신보험 사망보험금 상속세",
  "사망보험금 상속세 과세 여부",
  "간주상속재산 보험금",
  "사망보험금 금융재산 상속공제",
  "종신보험 상속세 계산",
  "사망보험금 상속포기",
  "종신보험 상속세 안분 계산",
  "사망보험금 채권자 압류",
  "손자 보험금 세대건너뛰기",
  "종신보험 상속세 재원",
  "종신보험 이자소득세 비과세",
  "종신보험 상속세 면제",
  "상증법 제8조 보험금",
  "상증법 제22조 금융재산공제",
  "사망보험금 상속세 신고",
];

const FAQS = [
  {
    urgent: true,
    q: "고인 명의 종신보험인데 사망보험금에 상속세가 붙나요",
    a: "고인(피상속인)이 계약자이고 보험료도 고인이 납입했다면 상속세가 붙어요. 이걸 '간주상속재산'이라고 해요(상증법 제8조). 사망보험금 전액이 부동산·예금 등 다른 상속재산과 합산돼서 상속세를 계산해요. 단, 상속세가 나오더라도 금융재산 상속공제(최대 2억원)가 추가로 적용돼서 실제 납부세액은 줄어요.",
  },
  {
    urgent: true,
    q: "상속포기 했는데 사망보험금도 받을 수 없나요",
    a: "받을 수 있어요. 사망보험금은 민법상 상속재산이 아니라 수익자의 고유재산이에요. 상속포기를 해도 지정된 수익자라면 보험금을 수령할 수 있어요. 고인의 빚이 많아서 상속포기를 하더라도 종신보험 수익자로 지정돼 있다면 보험금은 그대로 받을 수 있어요.",
  },
  {
    urgent: true,
    q: "사망보험금에 상속세가 나온다면 얼마나 나오나요",
    a: "보험금만으로 상속세를 계산하는 게 아니에요. 보험금 + 부동산·예금 등 전체 상속재산을 합산한 뒤 일괄공제(5억원)·배우자공제 등을 빼고 세율을 적용해요. 보험금이 상속재산에 잡히면 금융재산 상속공제(최대 2억원)도 추가 적용돼요. 아래 계산기로 대략적인 금액을 확인해보세요.",
  },
  {
    urgent: false,
    q: "고인과 상속인이 보험료를 반반씩 냈어요. 상속세는 어떻게 되나요",
    a: "보험료를 나눠 낸 비율만큼만 상속세가 붙어요. 계산식은 '보험금 × (피상속인이 낸 보험료 / 총납입보험료)'예요. 고인이 절반을 냈다면 보험금의 절반만 상속재산에 포함돼요. 나머지 절반은 상속인의 고유재산이라 상속세 대상이 아니에요.",
  },
  {
    urgent: false,
    q: "사망보험금이 상속재산에 포함되면 금융재산 공제도 받을 수 있나요",
    a: "네. 사망보험금이 간주상속재산으로 상속재산에 포함되면 금융재산이기 때문에 금융재산 상속공제를 받을 수 있어요(상증법 제22조). 순금융재산(예금·보험금 등 금융재산 - 금융채무)의 20%, 최대 2억원이 추가로 공제돼요. 공제받으려면 상속세 신고기한(사망일이 속한 달 말일부터 6개월) 내에 신고해야 해요.",
  },
  {
    urgent: false,
    q: "손자를 보험금 수익자로 지정하면 세금이 더 많이 나오나요",
    a: "네. 손자가 수익자인 경우 세대를 건너뛴 상속에 해당해서 상속세 산출세액의 30%가 할증과세로 추가돼요(상증법 제27조). 미성년 손자가 받는 상속재산가액이 20억원을 초과하면 40% 할증이에요. 절세 목적이라면 자녀를 수익자로 하는 게 유리해요.",
  },
  {
    urgent: false,
    q: "고인이 아니라 자녀가 보험료를 낸 경우에는요",
    a: "자녀가 계약자이고 실제 보험료를 자녀가 납입했다면 상속세가 안 붙어요. 자녀의 고유재산으로 보기 때문이에요. 단, 서류상 자녀가 납입자지만 실제로 고인 자금으로 납입했다면 국세청이 실질과세원칙으로 상속세를 부과할 수 있어요. 자녀 소득으로 실제 납입했다는 증빙이 있어야 해요.",
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
function BorderBox({ title, children }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

// ─── UrgentBanner
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    taxYes: {
      title: "고인(피상속인)이 계약자이고 보험료를 납입한 경우",
      color: "#DC2626", bg: "#FEF2F2",
      text: "사망보험금이 간주상속재산에 포함돼요(상증법 제8조). 전체 상속재산과 합산해서 상속세를 계산해요. 하지만 금융재산 상속공제(최대 2억원)가 추가로 적용돼서 실제 납부세액은 줄어요. 사망일이 속한 달 말일부터 6개월 이내에 신고해야 해요.",
    },
    taxNo: {
      title: "자녀가 계약자이고 보험료를 직접 납입한 경우",
      color: G, bg: GL,
      text: "상속세가 안 붙어요. 자녀의 고유재산으로 보기 때문이에요. 단, 서류상 자녀 명의이지만 실제 고인 돈으로 납입했다면 국세청이 상속세를 부과할 수 있어요. 자녀 소득으로 납입했다는 증빙(계좌이체 내역 등)을 잘 보관해두세요.",
    },
    unsure: {
      title: "고인과 자녀가 보험료를 나눠서 낸 경우",
      color: "#D97706", bg: "#FFFBEB",
      text: "비율만큼만 상속세가 붙어요. 상속세 포함 금액 = 보험금 × (고인이 낸 보험료 / 총납입보험료). 예를 들어 고인이 60%를 냈다면 보험금의 60%만 상속재산이에요. 아래 계산기로 확인해보세요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 보험 계약 구조가 어떻게 돼요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "taxYes",  label: "고인(피상속인)이 계약자이고 보험료도 고인이 납입했어요." },
          { id: "taxNo",   label: "자녀가 계약자이고 자녀가 보험료를 직접 납입했어요." },
          { id: "unsure",  label: "고인과 자녀가 보험료를 나눠서 납입했어요." },
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

// ─── 상속세 포함 금액 계산기
function TaxCalc() {
  const [insurance, setInsurance] = useState(30000); // 만원
  const [parentRatio, setParentRatio] = useState(100); // %
  const [otherAssets, setOtherAssets] = useState(50000); // 만원

  // 상속재산에 포함되는 보험금
  const includedInsurance = Math.round(insurance * parentRatio / 100);
  // 순금융재산 (보험금만 있다고 가정)
  const netFinancial = includedInsurance;
  // 금융재산 상속공제
  const financialDeduction = netFinancial <= 2000 ? netFinancial :
    Math.min(Math.round(netFinancial * 0.2), 20000); // 최대 2억
  // 전체 상속재산
  const totalAssets = otherAssets + includedInsurance;
  // 일괄공제 5억
  const baseDeduction = 50000;
  // 과세표준
  const taxBase = Math.max(0, totalAssets - baseDeduction - financialDeduction);
  // 상속세 계산 (누진세율)
  const calcTax = (base) => {
    if (base <= 10000)       return Math.round(base * 0.10);
    if (base <= 50000)       return Math.round(1000 + (base - 10000) * 0.20);
    if (base <= 100000)      return Math.round(9000 + (base - 50000) * 0.30);
    if (base <= 300000)      return Math.round(24000 + (base - 100000) * 0.40);
    return Math.round(104000 + (base - 300000) * 0.50);
  };
  const inheritanceTax = calcTax(taxBase);

  const fmt = (n) => n.toLocaleString();

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        슬라이더로 입력하면 상속세 포함 보험금과 금융재산 공제 후 세액이 나와요.
      </p>
      {[
        { label: "사망보험금", display: `${fmt(insurance)}만원`, min: 5000, max: 200000, step: 1000, val: insurance, set: setInsurance },
        { label: "피상속인 납입 비율", display: `${parentRatio}%`, min: 0, max: 100, step: 10, val: parentRatio, set: setParentRatio },
        { label: "기타 상속재산 (부동산·예금)", display: `${fmt(otherAssets)}만원`, min: 0, max: 300000, step: 5000, val: otherAssets, set: setOtherAssets },
      ].map(s => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: "#6b7280", width: 140, flexShrink: 0 }}>{s.label}</label>
          <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
            onChange={e => s.set(+e.target.value)} style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 12, fontWeight: 700, minWidth: 100, textAlign: "right" }}>{s.display}</span>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px,1fr))", gap: 8, marginTop: 16 }}>
        {[
          { label: "보험금 상속포함액",    val: `${fmt(includedInsurance)}만원`, sub: `보험금 × ${parentRatio}%`,         color: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5" },
          { label: "금융재산 추가공제",    val: `${fmt(financialDeduction)}만원`, sub: "순금융재산 20%, 최대 2억",        color: GD, bg: GL, border: "#9FE1CB" },
          { label: "전체 상속재산",        val: `${fmt(totalAssets)}만원`,        sub: "보험금 포함액 + 기타",            color: "#374151", bg: "#fff", border: "#e5e7eb" },
          { label: "과세표준",             val: `${fmt(taxBase)}만원`,            sub: "공제 후 세금 기준금액",           color: "#374151", bg: "#fff", border: "#e5e7eb" },
          { label: "예상 상속세",          val: taxBase <= 0 ? "0원" : `${fmt(inheritanceTax)}만원`, sub: "배우자 있으면 크게 줄어요", color: inheritanceTax > 0 ? "#DC2626" : G, bg: inheritanceTax > 0 ? "#FEF2F2" : GL, border: inheritanceTax > 0 ? "#FCA5A5" : "#9FE1CB" },
        ].map(card => (
          <div key={card.label} style={{ background: card.bg, borderRadius: 8, padding: "11px 12px", border: `1px solid ${card.border}` }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: card.color, marginBottom: 3 }}>{card.val}</div>
            <div style={{ fontSize: 10, color: "#9ca3af" }}>{card.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 일괄공제 5억원 적용, 배우자공제·기타 인적공제 미적용 (배우자 있으면 최소 5억~최대 30억 추가 공제). 참고용이며 정확한 세액은 세무사에게 확인하세요. 근거: 상증법 제8조·제22조
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

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 관련 글도 확인해보세요</p>
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
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>상속세 신고기한 6개월, 놓치면 가산세 20%예요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        보험금 상속세, 금융재산 공제까지 챙겨야<br />실제 납부세액이 줄어요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        혼자 계산하기 어려우면 국세청(☎126)에 무료 상담을 받으세요.<br />
        상속세 신고는 홈택스에서 직접 할 수 있어요.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, maxWidth: 480, margin: "0 auto" }}>
        <a href="https://www.hometax.go.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none" }}>
          💻 홈택스 상속세 신고
        </a>
        <a href="tel:126" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 국세청 ☎126 무료 상담
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

export default function LifeInsuranceInheritanceTaxPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>

        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>세금 · 상속세 · 종신보험</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          종신보험 사망보험금, 상속세가 나오나요?<br />
          과세 조건·계산법·금융재산 공제까지
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          핵심은 누가 보험료를 냈느냐예요.<br />
          피상속인이 납입했으면 상속세, 상속인이 직접 납입했으면 상속세 없어요.<br />
          상속세가 나오더라도 금융재산 공제(최대 2억원)가 붙어서 실제 납부세액은 줄어요.<br /><br />
          아래에서 보험 계약 구조를 선택하면 과세 여부가 바로 나와요.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
          <a href="https://www.hometax.go.kr" target="_self"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
            💻 홈택스 상속세 신고
          </a>
          <a href="tel:126" target="_self"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
            📞 국세청 ☎126 무료
          </a>
        </div>

        <UrgentBanner />

        <Divider />

        <H2>사망보험금이 모두 상속세 대상은 아니에요</H2>
        <p style={body}>
          핵심은 '누가 보험료를 냈느냐'예요.<br />
          피상속인이 실질적으로 보험료를 납입했을 때만 상속세가 붙어요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { icon: "❌", tag: "상속세 과세",   tagColor: "#DC2626", bg: "#FEF2F2",
              label: "고인(피상속인)이 계약자이고 보험료도 납입",
              desc: "사망보험금 전액(또는 납입비율 해당분)이 간주상속재산으로 상속세 과세 (상증법 제8조)" },
            { icon: "❌", tag: "상속세 과세",   tagColor: "#DC2626", bg: "#FEF2F2",
              label: "자녀가 계약자지만 실제 납입은 고인",
              desc: "실질과세원칙 적용 — 서류상 계약자와 무관하게 실납입자 기준으로 상속세 부과" },
            { icon: "✅", tag: "상속세 없음",  tagColor: G, bg: GL,
              label: "자녀가 계약자이고 자녀 소득으로 직접 납입",
              desc: "자녀 고유재산 — 상속세·증여세 모두 없음 (이자소득세도 비과세)" },
            { icon: "⚡", tag: "안분 과세",     tagColor: "#D97706", bg: "#FFFBEB",
              label: "고인과 자녀가 보험료를 나눠서 납입",
              desc: "보험금 × (피상속인 납입보험료 / 총납입보험료) = 상속재산 포함금액" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderRadius: 8, background: row.bg, border: `1px solid ${row.tagColor}30` }}>
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{row.icon}</span>
              <span style={{ flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: row.tagColor + "20", color: row.tagColor, display: "inline-block", marginBottom: 6 }}>{row.tag}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 4 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.8 }}>{row.desc}</span>
              </span>
            </div>
          ))}
        </div>

        <Divider />

        <H2>상속세가 나온다면 얼마나 나오나요</H2>
        <p style={body}>
          보험금만으로 계산하는 게 아니에요. 전체 상속재산과 합산해요.<br />
          그리고 금융재산이라서 추가 공제(최대 2억원)가 붙어요.
        </p>
        <Bdg>상속세 계산기 — 슬라이더로 내 상황을 넣어보세요</Bdg>
        <TaxCalc />
        <GreenBox title="상속세 계산 흐름 (상증법 제8조·제22조)">
          ① 상속재산 포함 보험금 = 사망보험금 × (피상속인 납입보험료 / 총납입보험료)<br />
          ② 전체 상속재산 = 부동산·예금 + ①<br />
          ③ 공제 차감 = ② - 일괄공제(5억) - 배우자공제(최대 30억) - 금융재산 공제(최대 2억) - 기타<br />
          ④ 과세표준 × 세율(10~50%) = 상속세<br />
          <br />
          금융재산 공제: 순금융재산 2,000만원 초과 시 20% (최대 2억원 한도)
        </GreenBox>

        <Divider />

        <H2>금융재산 상속공제 2억원, 보험금에도 적용되나요</H2>
        <p style={body}>
          네. 간주상속재산으로 상속세가 나오는 보험금도 금융재산이라서 공제를 받을 수 있어요.<br />
          많은 분이 이걸 모르고 놓쳐요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["순금융재산 규모", "공제 금액", "비고"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { range: "2,000만원 이하",          deduct: "전액 공제",         note: "전부 공제" },
                { range: "2,000만원 초과 ~ 10억원", deduct: "순금융재산 × 20%",  note: "예) 5억 → 1억 공제" },
                { range: "10억원 초과",              deduct: "2억원 (한도)",      note: "최대 2억 고정" },
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: "#374151" }}>{row.range}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", fontWeight: 600, color: G }}>{row.deduct}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: "#6b7280" }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <BorderBox title="금융재산 공제 받는 조건">
          사망일이 속한 달의 말일부터 6개월 이내에 상속세 신고를 해야 해요.<br />
          신고 기한을 놓치면 공제를 못 받고 무신고 가산세 20%가 붙어요.<br />
          순금융재산 = 예금·보험금·주식 등 금융재산 - 금융채무<br />
          근거: 상증법 제22조
        </BorderBox>

        <Divider />

        <H2>상속포기 해도 사망보험금을 받을 수 있나요</H2>
        <p style={body}>
          네. 이 부분이 많은 분이 헷갈리는 포인트예요.<br />
          사망보험금은 민법상 상속재산이 아니라 수익자의 고유재산이에요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { icon: "✅", label: "상속포기 해도 보험금 수령 가능", desc: "수익자로 지정된 상속인은 상속포기와 무관하게 보험금을 받을 수 있어요 (대법원 2013두1041)", color: G, bg: GL },
            { icon: "✅", label: "채권자 압류 불가",                desc: "사망보험금은 민법상 상속인의 고유재산이라 고인의 채권자가 압류할 수 없어요", color: G, bg: GL },
            { icon: "✅", label: "보험차익 이자소득세 비과세",     desc: "사망을 원인으로 지급되는 보험금의 보험차익(보험금 - 납입보험료)은 이자소득세 비과세 (한도 없음)", color: G, bg: GL },
            { icon: "⚠️", label: "손자 수익자는 세대건너뛰기 할증",desc: "손자가 수익자인 경우 상속세 산출세액에 30% 할증과세가 붙어요 (미성년 손자·20억 초과 시 40%, 상증법 제27조)", color: "#D97706", bg: "#FFFBEB" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 14px", borderRadius: 8, background: row.bg, border: `1px solid ${row.color}30` }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>{row.icon}</span>
              <span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 3 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.8 }}>{row.desc}</span>
              </span>
            </div>
          ))}
        </div>

        <HubLinks />

        <H2>종신보험 사망보험금 상속세, 자주 하는 질문</H2>
        <p style={{ ...body, marginBottom: 14 }}>막막한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />

        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "상속세 및 증여세법 제8조 — 상속재산으로 보는 보험금 (간주상속재산)", url: "https://www.law.go.kr/" },
              { label: "상속세 및 증여세법 제22조 — 금융재산 상속공제 (최대 2억원)", url: "https://www.law.go.kr/" },
              { label: "상속세 및 증여세법 제27조 — 세대를 건너뛴 상속에 대한 할증과세 30%", url: "https://www.law.go.kr/" },
              { label: "대법원 2013두1041 (2013.5.23) — 상속포기 시에도 보험금 수령 가능", url: "https://www.law.go.kr/" },
              { label: "국세청 상속세 신고 안내 (☎126)", url: "https://www.nts.go.kr/" },
            ].map(item => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공 목적으로 작성됐어요. 개별 세액은 상속 구조·재산 규모에 따라 달라지므로 세무사 또는 국세청(☎126)에서 확인하세요.<br />
          ※ 간주상속재산 요건: 피상속인 실질납입 + 법정상속인 수익자 (상증법 제8조) / 상속재산 포함금액: 보험금 × 피상속인납입비율 / 금융재산공제: 순금융재산 20%, 최대 2억 (상증법 제22조) / 신고기한: 사망일 속한 달 말일부터 6개월 / 세대건너뛰기 할증: 30% (상증법 제27조) / 이자소득세: 비과세 / 상속포기시 보험금: 수령 가능
        </div>
      </div>
    </div>
  );
}
