"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 상속세 및 증여세법 제8조·제34조, 서울행정법원2016구합66209
// 증여세_과세기준: 계약자 변경 시점의 해지환급금 (상증령 제62조)
// 간주상속재산_요건: 피상속인 계약자·보험료납입, 수익자 법정상속인 (상증법 제8조)
// 증여공제_자녀: 5,000만원 (10년 합산)
// 증여세율: 10~50% (1억이하 10%, 5억이하 20%, 10억이하 30%, 30억이하 40%, 초과 50%)
// 상속공제_일괄: 5억원
// 배우자공제: 최대 30억원
// 절세전략: 해지환급금 작을 때 계약자 변경 + 증여세 신고 → 사망보험금 상속세 제외
// 보험료증여_공제한도: 10년 5,000만원
// 근거: 상증법 제8조·제34조, 서울행정법원2016구합66209(2017.03.24.)

const HUB_LINKS = [
  { title: "종신보험 상속세 면제 조건", sub: "계약 구조별 면제·과세 기준 정리", href: "/w/종신보험-상속세-면제" },
  { title: "상속세 계산 세율 공제", sub: "2026년 기준 세율표와 공제 항목", href: "/w/상속세-계산-세율-공제" },
  { title: "증여세 계산 방법과 세율", sub: "증여공제 한도와 계산 예시", href: "/w/증여세" },
];

const SIDEBAR_LINKS = [
  "종신보험 증여세 상속세",
  "종신보험 계약자 변경 증여세",
  "종신보험 상속세 과세 여부",
  "사망보험금 상속세",
  "간주상속재산 보험금",
  "종신보험 절세 방법",
  "해지환급금 증여세",
  "종신보험 계약자 자녀 변경",
  "보험료 증여 세금",
  "종신보험 상속세 면제",
  "상증법 제8조 보험금",
  "사망보험금 증여세",
  "상속세 재원 마련",
  "계약자 피보험자 수익자 세금",
  "종신보험 10년 룰",
];

const FAQS = [
  {
    urgent: true,
    q: "종신보험 계약자를 자녀로 바꾸면 증여세가 얼마나 나와요",
    a: "계약자 변경 시점의 해지환급금이 증여재산가액이에요(상증령 제62조, 서울행정법원 2016구합66209). 해지환급금에서 자녀 증여공제 5,000만원을 빼고 남은 금액에 세율을 곱해요. 예를 들어 해지환급금 8,000만원이면 (8,000만원 - 5,000만원) × 10% = 300만원이에요. 납입보험료나 나중의 사망보험금 기준이 아니에요.",
  },
  {
    urgent: true,
    q: "아버지가 가입한 종신보험 사망보험금도 상속세가 나오나요",
    a: "계약자와 보험료 납입자가 아버지(피상속인)이고 수익자가 자녀(법정상속인)라면 상속세가 나와요. 상증법 제8조에서 '간주상속재산'으로 규정하고 있어요. 사망보험금 전액이 다른 상속재산(부동산·예금 등)과 합산해서 상속세를 계산해요. 계약자와 실질 납입자가 자녀라면 상속세 제외예요.",
  },
  {
    urgent: true,
    q: "계약자를 자녀로 바꾸면 나중에 사망보험금은 상속세 안 나와요",
    a: "네. 계약자를 자녀로 변경하고 해지환급금으로 증여세 신고를 마치면, 이후 아버지 사망 시 지급되는 사망보험금은 상속재산에 포함되지 않아요. 다만 변경 후 10년 이상 경과한 시점에 사망이 발생해야 안전해요. 변경 직후 사망하면 국세청이 납입보험료를 기준으로 추가 과세할 수 있어요.",
  },
  {
    urgent: false,
    q: "부모가 보험료를 대신 내주면 증여세 나오나요",
    a: "네. 자녀 명의 종신보험 보험료를 부모가 납입하면 보험료만큼 증여로 봐요(상증법 제34조). 연간 납입액이 10년 합산 5,000만원 이하면 자녀 증여공제 한도 내라 증여세가 없어요. 초과분에는 증여세가 부과돼요. 가장 안전한 방법은 자녀가 실제 소득으로 직접 납입하는 거예요.",
  },
  {
    urgent: false,
    q: "해지환급금이 적을 때 계약자를 바꾸는 게 왜 유리한가요",
    a: "증여재산가액이 해지환급금 기준이라 납입 초기(저해지환급금 구간)에 변경하면 증여세가 적어요. 저해지 상품은 해지환급금이 40% 수준이라 더 유리해요. 예를 들어 해지환급금 3,000만원이면 자녀 공제 5,000만원 이하라 증여세 0원이에요. 이후 사망보험금 3억이 나와도 상속세 대상에서 빠지는 거예요.",
  },
  {
    urgent: false,
    q: "배우자를 계약자로 하면 어떻게 되나요",
    a: "배우자가 계약자·수익자이고 보험료도 배우자가 납입하면, 피보험자(남편 등) 사망 시 지급되는 보험금은 상속재산에 포함되지 않아요. 배우자 자산으로 보기 때문이에요. 다만 배우자에게 실제 소득이 없으면 국세청이 보험료 납입을 피상속인이 한 것으로 보아 상속세를 부과할 수 있으니 주의해야 해요.",
  },
  {
    urgent: false,
    q: "증여세 신고는 어디서 어떻게 하나요",
    a: "계약자 변경 후 3개월 이내에 홈택스(hometax.go.kr) 또는 관할 세무서에 증여세 신고를 해야 해요. 신고하지 않으면 나중에 국세청이 적발 시 가산세가 붙어요. 해지환급금이 증여공제 5,000만원 이하라도 신고는 해두는 게 안전해요. 신고 이력이 추후 상속세 제외 근거가 돼요.",
  },
];

const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
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

// ─── UrgentBanner
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    change: {
      title: "계약자를 자녀로 바꾸려 한다면",
      color: G, bg: GL,
      text: "해지환급금이 작을 때 바꾸는 게 유리해요. 해지환급금 - 자녀 증여공제 5,000만원이 0이하면 증여세 없이 변경할 수 있어요. 변경 후 3개월 이내 홈택스에서 증여세 신고를 꼭 해두세요. 이후 사망보험금은 상속세 대상에서 빠져요.",
    },
    tax: {
      title: "내 종신보험에 상속세가 나오는지 확인하고 싶다면",
      color: "#DC2626", bg: "#FEF2F2",
      text: "계약자와 보험료 납입자가 피상속인(아버지 등)이고, 수익자가 법정상속인이면 사망보험금 전액이 상속재산에 포함돼요(상증법 제8조). 아래 '내 종신보험 세금 나오나요?' 확인 도구에서 내 보험 구조를 선택해보세요.",
    },
    premium: {
      title: "부모가 보험료를 대신 내주고 있다면",
      color: "#D97706", bg: "#FFFBEB",
      text: "보험료 납입액이 10년 합산 5,000만원 이하면 자녀 증여공제 한도 내라 증여세가 없어요. 초과하면 초과분에 증여세가 붙어요. 가장 안전한 방법은 자녀가 직접 납입하는 거예요. 소득 출처가 명확해야 국세청에서 납입자를 실제 부모로 보지 않아요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "change",  label: "종신보험 계약자를 자녀로 바꾸려고 해요." },
          { id: "tax",     label: "내 종신보험에 상속세가 나오는지 확인하고 싶어요." },
          { id: "premium", label: "부모가 보험료를 대신 내주고 있어요." },
        ].map(item => (
          <button key={item.id} onClick={(_e: any) => setType(item.id)} style={{
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
        <button onClick={(_e: any) => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 계약 구조 체커 (핵심 컴포넌트)
function ContractChecker() {
  const [contractor, setContractor] = useState(null);
  const [payer, setPayer]           = useState(null);
  const [beneficiary, setBeneficiary] = useState(null);

  const getResult = () => {
    if (!contractor || !payer || !beneficiary) return null;
    if (contractor === "parent" && payer === "parent" && beneficiary === "heir")
      return { type: "상속세", color: "#DC2626", bg: "#FEF2F2",
        text: "사망보험금 전액이 간주상속재산으로 상속세 과세 대상이에요. (상증법 제8조)" };
    if (contractor === "child"  && payer === "child"  && beneficiary === "child")
      return { type: "세금 없음", color: G, bg: GL,
        text: "자녀가 계약자·납입자·수익자라면 상속세·증여세 없이 보험금 수령 가능해요." };
    if (contractor === "child"  && payer === "parent" && beneficiary === "child")
      return { type: "증여세", color: "#D97706", bg: "#FFFBEB",
        text: "계약자는 자녀지만 실제 보험료를 부모가 납입하면 납입보험료 기준 증여세 과세 가능해요. (상증법 제34조)" };
    if (contractor === "parent" && payer === "parent" && beneficiary === "notHeir")
      return { type: "증여세 (수익자에게)", color: "#7C3AED", bg: "#F5F3FF",
        text: "수익자가 법정상속인 아닌 제3자라면 보험금 수령 시 수익자에게 증여세가 부과돼요." };
    return { type: "구조 재확인 필요", color: "#6B7280", bg: "#F9FAFB",
      text: "계약 구조가 복잡해요. 세무사 상담을 통해 정확한 과세 여부를 확인하세요." };
  };

  const result = getResult();

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        아래 3가지를 선택하면 세금이 나오는지 안 나오는지 바로 알 수 있어요.
      </p>

      {[
        { label: "계약자는?", state: contractor, set: setContractor, opts: [
          { id: "parent", label: "부모(피상속인)" },
          { id: "child",  label: "자녀" },
          { id: "spouse", label: "배우자" },
        ]},
        { label: "보험료 납입자는?", state: payer, set: setPayer, opts: [
          { id: "parent", label: "부모가 납입" },
          { id: "child",  label: "자녀가 직접 납입" },
        ]},
        { label: "수익자는?", state: beneficiary, set: setBeneficiary, opts: [
          { id: "heir",    label: "법정상속인 (배우자·자녀)" },
          { id: "child",   label: "자녀 (본인)" },
          { id: "notHeir", label: "제3자" },
        ]},
      ].map(({ label, state, set, opts }: any) => (
        <div key={label} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>{label}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {opts.map(opt => (
              <button key={opt.id} onClick={(_e: any) => set(opt.id)} style={{
                padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 12,
                border: `2px solid ${state === opt.id ? G : "#e5e7eb"}`,
                background: state === opt.id ? GL : "#fff",
                fontWeight: state === opt.id ? 700 : 400,
                color: state === opt.id ? GD : "#374151",
              }}>{opt.label}</button>
            ))}
          </div>
        </div>
      ))}

      {result && (
        <div style={{ padding: "14px 16px", borderRadius: 8, background: result.bg, border: `1px solid ${result.color}30`, marginTop: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: result.color, marginBottom: 6 }}>
            결과: {result.type}
          </p>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{result.text}</p>
        </div>
      )}
    </div>
  );
}

// ─── 증여세 계산기
function GiftTaxCalc() {
  const [refund, setRefund] = useState(8000);
  const exemption = 5000;
  const taxable   = Math.max(0, refund - exemption);
  let tax = 0;
  if (taxable <= 10000)      tax = taxable * 0.10;
  else if (taxable <= 50000) tax = 1000 + (taxable - 10000) * 0.20;
  else if (taxable <= 100000)tax = 9000 + (taxable - 50000) * 0.30;
  else                       tax = 24000 + (taxable - 100000) * 0.40;
  tax = Math.round(tax);

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        계약자 변경 시점의 해지환급금을 입력하면 증여세가 나와요.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <label style={{ fontSize: 13, color: "#6b7280", width: 110, flexShrink: 0 }}>해지환급금</label>
        <input type="range" min={0} max={50000} step={500} value={refund}
          onChange={e => setRefund(+e.target.value)} style={{ flex: 1, accentColor: G }} />
        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 90, textAlign: "right" }}>{refund.toLocaleString()}만원</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { label: "해지환급금",     val: `${refund.toLocaleString()}만원`,     sub: "증여재산가액",       color: "#374151", bg: "#fff", border: "#e5e7eb" },
          { label: "증여공제 (자녀)", val: `${exemption.toLocaleString()}만원`, sub: "10년 합산 한도",    color: GD, bg: GL, border: "#9FE1CB" },
          { label: "증여세",          val: taxable <= 0 ? "0원" : `${tax.toLocaleString()}만원`,
            sub: taxable <= 0 ? "공제 한도 내" : `과세표준 ${taxable.toLocaleString()}만원`,
            color: taxable <= 0 ? G : "#DC2626", bg: taxable <= 0 ? GL : "#FEF2F2", border: taxable <= 0 ? "#9FE1CB" : "#FCA5A5" },
        ].map(card => (
          <div key={card.label} style={{ background: card.bg, borderRadius: 8, padding: "12px 14px", border: `1px solid ${card.border}` }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: card.color, marginBottom: 3 }}>{card.val}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{card.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 증여재산가액 = 변경 시점 해지환급금 (상증령 제62조, 서울행정법원 2016구합66209). 자녀 증여공제 5,000만원은 10년 합산 기준. 정확한 세액은 세무사에게 확인하세요.
      </p>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f: any, i: any) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={(_e: any) => setOpen(open === i ? null : i)}
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
        {HUB_LINKS.map((link: any, i: any) => (
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>지금 계약 구조를 점검하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        해지환급금 작을 때 계약자 바꾸고<br />증여세 신고하면 상속세 0원이에요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        증여세 신고는 홈택스에서 직접 할 수 있어요.<br />
        세금 계산이 복잡하면 국세청 상담(☎126)이 무료예요.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, maxWidth: 480, margin: "0 auto" }}>
        <a href="https://www.hometax.go.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none" }}>
          💻 홈택스 증여세 신고
        </a>
        <a href="tel:126" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 국세청 상담 ☎126
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
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" target="_self"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function JongsinInsuranceTaxPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>

        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>세금 · 상속증여세 · 종신보험</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          종신보험 증여세·상속세, 언제 뭐가 나오나요?<br />
          계약 구조에 따라 완전히 달라져요
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          계약자를 자녀로 바꾸려는데 세금이 얼마나 나올지 모르시죠.<br />
          결론부터: 계약자를 살아있을 때 바꾸면 해지환급금 기준으로 증여세, 사망 후 보험금 받으면 상속세예요.<br /><br />
          계약 구조를 선택하면 세금 여부가 바로 나와요.
        </p>

        <UrgentBanner />

        <Bdg>내 종신보험 세금 나오나요? — 3가지 선택으로 바로 확인</Bdg>
        <ContractChecker />

        <Divider />

        <H2>종신보험 증여세는 언제 나오나요</H2>
        <p style={body}>
          계약자가 살아있을 때 자녀로 바꾸면 증여세가 나와요.<br />
          기준은 납입보험료나 사망보험금이 아니라 <strong>변경 시점의 해지환급금</strong>이에요.
        </p>
        <Bdg>해지환급금으로 증여세 계산해보세요</Bdg>
        <GiftTaxCalc />
        <GreenBox title="증여세 절세 포인트 — 해지환급금 작을 때 변경하세요">
          납입 초기(5~7년)에는 해지환급금이 납입보험료보다 적어요 (저해지 구간)<br />
          이 시점에 자녀로 계약자 변경 → 해지환급금이 5,000만원 이하면 증여세 0원<br />
          변경 후 증여세 신고 → 이후 사망보험금은 상속재산에서 제외<br />
          근거: 상증령 제62조 / 서울행정법원 2016구합66209(2017.03.24.)
        </GreenBox>

        <Divider />

        <H2>종신보험 사망보험금도 상속세 나오나요</H2>
        <p style={body}>
          계약자·납입자가 피상속인이고 수익자가 법정상속인이면 사망보험금 전액이 상속재산이에요.<br />
          이걸 '간주상속재산'이라고 해요(상증법 제8조).
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { icon: "❌", tag: "상속세 과세",  tagColor: "#DC2626", bg: "#FEF2F2",
              label: "아버지 계약·납입, 자녀 수익자",
              desc: "사망보험금 전액이 간주상속재산 → 다른 상속재산과 합산 과세 (상증법 제8조)" },
            { icon: "✅", tag: "상속세 제외", tagColor: G, bg: GL,
              label: "자녀 계약·납입·수익자, 아버지 피보험자",
              desc: "보험료를 자녀가 직접 납입 → 자녀 고유재산으로 상속세 없음" },
            { icon: "✅", tag: "상속세 제외", tagColor: G, bg: GL,
              label: "계약자 변경 후 증여세 신고 완료",
              desc: "해지환급금으로 증여세 신고 → 이후 사망보험금은 상속재산 불포함" },
            { icon: "⚠️", tag: "증여세 주의", tagColor: "#D97706", bg: "#FFFBEB",
              label: "자녀 계약자이지만 부모가 보험료 납입",
              desc: "국세청이 실질 납입자를 부모로 보아 납입 보험료 기준 과세 가능 (상증법 제34조)" },
          ].map((row: any, i: any) => (
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

        <H2>종신보험 계약자 변경은 언제 하는 게 유리한가요</H2>
        <p style={body}>
          해지환급금이 적은 초기에 변경할수록 증여세가 줄어요.<br />
          변경 후 10년 이상 지난 뒤 사망이 발생해야 안전하게 상속세를 피할 수 있어요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["시점", "세금 종류", "과세 기준", "절세 효과"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { 시점: "살아있을 때 계약자 변경", 세금: "증여세", 기준: "해지환급금", 절세: "해지환급금 ≤ 5,000만원이면 0원" },
                { 시점: "사망 후 보험금 수령", 세금: "상속세", 기준: "사망보험금 전액", 절세: "계약자 변경 완료 시 제외" },
                { 시점: "자녀가 처음부터 계약·납입", 세금: "없음", 기준: "해당 없음", 절세: "가장 깔끔한 구조" },
              ].map((row: any, i: any) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: "#374151" }}>{row.시점}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6",
                    color: row.세금 === "없음" ? G : row.세금 === "증여세" ? "#D97706" : "#DC2626", fontWeight: 600 }}>{row.세금}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: "#6b7280" }}>{row.기준}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: "#374151" }}>{row.절세}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <BorderBox title="계약자 변경 절차">
          ① 보험사에 계약자 변경 신청 (신분증·가족관계증명서 지참)<br />
          ② 변경 후 3개월 이내 홈택스에서 증여세 신고 (해지환급금 5,000만원 이하도 신고 권장)<br />
          ③ 이후 자녀가 보험료를 직접 납입하는 구조로 전환<br />
          ④ 변경일로부터 10년 이상 경과 후 사망 시 사망보험금 상속세 제외
        </BorderBox>

        <HubLinks />

        <H2>종신보험 증여세·상속세, 자주 하는 질문</H2>
        <p style={{ ...body, marginBottom: 14 }}>막막한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />

        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "상속세 및 증여세법 제8조 — 상속재산으로 보는 보험금 (간주상속재산)", url: "https://www.law.go.kr/" },
              { label: "상속세 및 증여세법 제34조 — 보험금의 증여", url: "https://www.law.go.kr/" },
              { label: "상증세법 시행령 제62조 — 보험계약 증여재산가액 (해지환급금 기준)", url: "https://www.law.go.kr/" },
              { label: "서울행정법원 2016구합66209 (2017.03.24.) — 계약자 변경 증여재산가액은 해지환급금", url: "https://www.law.go.kr/" },
              { label: "국세청 상담 ☎126 — 증여세 신고 무료 안내", url: "https://www.nts.go.kr/" },
            ].map(item => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공 목적으로 작성됐어요. 개별 세액은 계약 구조·납입 이력에 따라 달라지므로 세무사 또는 국세청(☎126)에 확인하세요.<br />
          ※ 증여세 과세기준: 해지환급금 (상증령 제62조) / 자녀 증여공제: 10년 합산 5,000만원 / 간주상속재산: 상증법 제8조 / 증여세율: 10~50% / 상속공제 일괄: 5억원 / 배우자공제: 최대 30억원
        </div>
      </div>
    </div>
  );
}
