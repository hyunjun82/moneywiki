"use client";
import { useState } from "react";

const SIDEBAR_LINKS = [
  "가압류 신청 방법",
  "가압류 신청서 작성",
  "부동산 가압류 절차",
  "채권 가압류 절차",
  "가압류 이의신청",
  "오래된 가압류 해제",
  "처분금지가처분 신청",
  "소액사건 소장 작성",
  "차용증 없이 돈 받기",
  "지급명령 신청",
  "강제집행 신청",
  "전자소송 이용 방법",
  "법원 송달료 납부",
  "대법원 수입인지 구입",
  "보증보험증권 발급",
  "담보취소 신청 방법",
  "법률구조공단 상담",
  "임금체불 신고",
  "전세보증금 반환",
  "손해배상 청구",
];

const HUB_LINKS = [
  { title: "가압류 신청 방법 | 비용·절차·재산 유형별 신청", desc: "재산 유형별 가압류 신청 전 과정", href: "#" },
  { title: "오래된 가압류 해제 방법 | 소멸시효·취소 신청 절차", desc: "3년 이상 방치된 가압류 취소 신청", href: "#" },
  { title: "처분금지가처분 신청 조건 | 부동산 매매·담보 기준", desc: "가압류보다 강력한 처분금지가처분", href: "#" },
  { title: "차용증 없이 빌려준 돈 받는 방법 | 이체 내역으로 소송", desc: "증거 없어도 청구 가능한 방법", href: "#" },
];

const COST_ITEMS_REAL = [
  { label: "인지대", basis: "정액", note: "전자소송 시 10% 할인", fixed: 10000 },
  { label: "송달료", basis: "당사자 수 × 3회 × 5,200원", note: "사용 후 잔액 환급", fixed: null },
  { label: "담보금(보증보험 방식)", basis: "청구금액 × 10%", note: "현금 불필요, 보험료만 납부", fixed: null },
  { label: "보증보험료", basis: "담보금 × 요율(연 0.1~0.3%)", note: "실제 납부액, SGI서울보증 등", fixed: null },
  { label: "등록면허세", basis: "토지·건물 각 3,000원", note: "+ 지방교육세 20%", fixed: null },
  { label: "대법원수입증지", basis: "부동산 1개당 4,000원", note: "등기 촉탁용", fixed: null },
];

const COST_ITEMS_DEBT = [
  { label: "인지대", basis: "정액", note: "전자소송 시 10% 할인", fixed: 10000 },
  { label: "송달료", basis: "당사자 수 × 3회 × 5,200원", note: "제3채무자 포함", fixed: null },
  { label: "담보금", basis: "청구금액 × 40%", note: "법원 재량, 실무 기준", fixed: null },
  { label: "현금공탁(일부)", basis: "담보금 × 20~50%", note: "법원 명령 시 현금 필요", fixed: null },
  { label: "보증보험료", basis: "보험 허가 시 담보금 × 요율", note: "소명 충분하면 보험 대체 가능", fixed: null },
];

const FAQS = [
  { urgent: true, q: "담보 제공 명령이 왔는데 현금이 없어요. 어떻게 해요?", a: "부동산 가압류는 보증보험증권으로 현금 없이 담보를 제공할 수 있어요. SGI서울보증(1588-3690) 또는 한국무역보험공사에서 발급받으면 돼요. 채권 가압류도 소명이 충분하면 보험증권으로 대체되는 경우가 있으니, 먼저 신청서를 제출하고 담보 명령을 기다려보세요. 재산이 없어서 비용조차 없다면 대한법률구조공단(132)에 소송구조 신청을 하면 공탁비용 지원도 가능해요." },
  { urgent: true, q: "비용을 냈는데 가압류가 기각됐어요. 돌려받을 수 있나요?", a: "인지대는 환급이 안 돼요. 송달료는 사용하지 않은 잔액은 사건 종결 후 환급 신청하면 돌려받을 수 있어요. 현금공탁을 한 경우 신청 기각이면 공탁 원인이 소멸했으므로 공탁소에서 회수 가능해요. 보증보험료는 보험사 약관에 따라 일부 환급되는 경우도 있으니 보험사에 문의해보세요." },
  { urgent: false, q: "전자소송으로 신청하면 왜 인지대가 싸요?", a: "법원이 전자소송을 장려하기 위해 인지대 10%를 할인해줘요. 가압류 인지대 10,000원 → 전자소송 시 9,000원이에요. 전자소송 포털(ecfs.scourt.go.kr)에서 공인인증서 또는 금융인증서로 로그인하면 돼요." },
  { urgent: false, q: "송달료를 너무 많이 냈어요. 어떻게 환급받나요?", a: "가압류 사건이 종결된 후 법원에 '송달료 환급 신청서'를 제출하면 돼요. 또는 잔액이 남으면 법원에서 자동으로 계좌로 환급해주는 경우도 있어요. 환급받을 계좌를 신청서에 기재해두면 편해요." },
  { urgent: false, q: "보증보험증권은 어디서 받나요?", a: "SGI서울보증보험(1588-3690, sgi.or.kr), 한국무역보험공사 등에서 발급해줘요. 가압류 결정 후 담보제공명령이 나오면 법원이 보증금액을 알려줘요. 그 금액을 기준으로 보험증권을 발급받아 해당 재판부에 제출하면 돼요. 미리 선담보제공을 하면 절차가 빨라져요." },
  { urgent: false, q: "공탁금은 나중에 다 돌려받나요?", a: "소송에서 이기면 담보취소 신청 후 전액 회수할 수 있어요. 소송에서 지더라도, 상대방이 실제로 손해배상을 청구하지 않으면 역시 돌려받아요. 상대방이 손해를 입증해서 배상금이 확정되면 그 금액만큼 공탁금에서 차감돼요. 패소해도 일부 또는 전부 돌려받는 경우가 대부분이에요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민사소송 등 인지법 제9조 — 보전처분 신청 인지", url: "https://www.law.go.kr/" },
    { label: "민사집행법 제282조 — 가압류 해방금액", url: "https://www.law.go.kr/" },
    { label: "송달료규칙 — 1회 송달료 5,200원", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 가압류 신청비용 납부 (2026. 2. 1. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=294&ccfNo=2&cciNo=3&cnpClsNo=1" },
    { label: "대한법률구조공단 — 소송비용 자동 계산기", url: "https://www.klac.or.kr/legalstruct/autoCostCalculation.do" },
    { label: "대법원 전자소송 — 가압류 신청", url: "https://ecfs.scourt.go.kr/psp/index.on?m=PSP730M14" },
    { label: "SGI서울보증 — 공탁보증보험 안내", url: "https://www.sgi.or.kr" },
  ]},
];

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
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

function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    real: { title: "부동산 가압류 비용", color: G, bg: GL,
      text: "인지대 10,000원 + 송달료(당사자 수 × 3회 × 5,200원) + 담보(청구금액의 10% → 보증보험료만 납부). 부동산은 등록면허세(토지·건물 각 3,000원 + 지방교육세 20%) + 대법원수입증지(1개당 4,000원)도 필요해요. 현금공탁 명령은 드문 편이에요." },
    debt: { title: "예금·급여 채권 가압류 비용", color: "#7C3AED", bg: "#F5F3FF",
      text: "인지대 10,000원 + 송달료(채권자+채무자+제3채무자 수 × 3회 × 5,200원) + 담보(청구금액의 40%). 채권 가압류는 현금공탁 명령이 나오는 경우가 있어요(담보의 20~50%). 소명이 충분하면 보증보험증권으로 대체 가능해요." },
    total: { title: "실제 내 주머니에서 나가는 돈", color: "#DC2626", bg: "#FEF2F2",
      text: "인지대·송달료·보증보험료가 실제 납부액이에요. 담보금은 나중에 돌려받아요. 청구금액 1,000만원 부동산 가압류 기준: 인지대 10,000 + 송달료 31,200 + 보증보험료 약 5,000~30,000원 = 총 5만~7만원 수준이에요. 계산기로 직접 확인해보세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 어떤 가압류 비용이 궁금하세요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "real", label: "부동산 가압류 비용이 궁금해요." },
          { id: "debt", label: "예금·급여 가압류 비용이 궁금해요." },
          { id: "total", label: "실제 내 주머니에서 얼마 나가는지 알고 싶어요." },
        ].map((item) => (
          <button key={item.id} onClick={() => setType(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
  const m = messages[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <strong style={{ fontSize: 14, color: m.color }}>{m.title}</strong>
        <button onClick={() => setType(null)} style={{ fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function CostCalculator() {
  const [amount, setAmount] = useState(1000);
  const [assetType, setAssetType] = useState("real");
  const [parties, setParties] = useState(2);
  const [thirdParty, setThirdParty] = useState(1);
  const [electronic, setElectronic] = useState(false);

  const stamp = electronic ? 9000 : 10000;
  const totalParties = assetType === "debt" ? parties + thirdParty : parties;
  const delivery = totalParties * 3 * 5200;
  const depositRate = assetType === "real" ? 0.10 : 0.40;
  const depositAmt = Math.round(amount * 10000 * depositRate);
  const insuranceRate = assetType === "real" ? 0.002 : 0.004;
  const insurance = Math.round(depositAmt * insuranceRate);
  const regTax = assetType === "real" ? 3000 * 1.2 * 2 : 0;
  const courtStamp = assetType === "real" ? 4000 : 0;
  const cashDeposit = assetType === "debt" ? Math.round(depositAmt * 0.2) : 0;

  const actualCost = stamp + delivery + insurance + regTax + courtStamp;

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14 }}>💰 가압류 비용 계산기</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { id: "real", label: "부동산" },
          { id: "debt", label: "예금·급여" },
          { id: "car", label: "자동차·동산" },
        ].map((t) => (
          <button key={t.id} onClick={() => setAssetType(t.id)} style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", border: `1px solid ${assetType === t.id ? G : "#d1d5db"}`, background: assetType === t.id ? GL : "#fff", color: assetType === t.id ? GD : "#374151", fontWeight: assetType === t.id ? 600 : 400 }}>{t.label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>청구금액 (만원)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>당사자 수</label>
          <select value={parties} onChange={(e) => setParties(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}>
            {[2,3,4].map(n => <option key={n} value={n}>{n}명</option>)}
          </select>
        </div>
        {assetType === "debt" && (
          <div>
            <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>제3채무자 수 (은행·회사)</label>
            <select value={thirdParty} onChange={(e) => setThirdParty(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}>
              {[1,2,3].map(n => <option key={n} value={n}>{n}개</option>)}
            </select>
          </div>
        )}
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>신청 방식</label>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {[{ v: false, l: "서면" }, { v: true, l: "전자소송" }].map((opt) => (
              <button key={String(opt.v)} onClick={() => setElectronic(opt.v)} style={{ flex: 1, padding: "8px 0", borderRadius: 6, fontSize: 12, cursor: "pointer", border: `1px solid ${electronic === opt.v ? G : "#d1d5db"}`, background: electronic === opt.v ? GL : "#fff", color: electronic === opt.v ? GD : "#374151" }}>{opt.l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px" }}>
        {[
          { label: `인지대${electronic ? " (전자 10% 할인)" : ""}`, val: stamp.toLocaleString() + "원", cash: true },
          { label: `송달료 (${totalParties}명 × 3회)`, val: delivery.toLocaleString() + "원", cash: true },
          { label: `담보금 (청구금액 × ${depositRate * 100}%)`, val: depositAmt.toLocaleString() + "원", cash: false, note: "보증보험증권으로 대체 가능, 나중에 회수" },
          { label: "보증보험료 (추정)", val: "약 " + insurance.toLocaleString() + "원~", cash: true },
          ...(assetType === "real" ? [
            { label: "등록면허세 + 지방교육세", val: regTax.toLocaleString() + "원", cash: true },
            { label: "대법원수입증지", val: courtStamp.toLocaleString() + "원", cash: true },
          ] : []),
          ...(assetType === "debt" ? [
            { label: "현금공탁 (법원 명령 시)", val: cashDeposit.toLocaleString() + "원~", cash: false, note: "법원 재량, 나중에 회수" },
          ] : []),
        ].map((row, i, arr) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: i < arr.length - 1 ? "1px solid #e5e7eb" : "none", paddingBottom: 8, marginBottom: 8 }}>
            <div>
              <span style={{ fontSize: 13, color: "#374151" }}>{row.label}</span>
              {row.note && <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 6 }}>({row.note})</span>}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: row.cash ? "#374151" : "#9ca3af" }}>{row.val}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "2px solid #e5e7eb" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>실제 납부 예상 (담보 제외)</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: G }}>{actualCost.toLocaleString()}원~</span>
        </div>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
          담보금({depositAmt.toLocaleString()}원)은 소송 종결 후 대부분 돌려받아요. 위 계산은 추정치이며 실제 법원 결정에 따라 달라질 수 있어요.
        </p>
      </div>
    </div>
  );
}

function CostTable({ items }) {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "10px 14px", borderBottom: i < items.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "start" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{item.label}</span>
          <span style={{ fontSize: 12, color: "#374151" }}>{item.basis}</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{item.note}</span>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", lineHeight: 1.5, display: "flex", alignItems: "center", gap: 8 }}>
              {faq.urgent && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10, background: "#FEE2E2", color: "#DC2626", flexShrink: 0 }}>긴급</span>}
              {faq.q}
            </span>
            <span style={{ fontSize: 16, color: "#9ca3af", flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 14px 14px", fontSize: 13, color: "#374151", lineHeight: 1.9, borderTop: "1px solid #f3f4f6" }}>
              <p style={{ margin: "12px 0 0" }}>{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>비용 확인 후 바로 신청할 수 있어요</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { label: "대법원 전자소송 (ecfs.scourt.go.kr)", url: "https://ecfs.scourt.go.kr", sub: "온라인 인지 납부 + 신청 접수" },
          { label: "대한법률구조공단 소송비용 자동계산기", url: "https://www.klac.or.kr/legalstruct/autoCostCalculation.do", sub: "청구금액별 인지·송달료 자동 계산" },
          { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 상담·소송구조 신청" },
        ].map((item, i) => (
          <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span>
              <span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span>
            </div>
            <span style={{ color: G, fontWeight: 700 }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 가압류 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {REFERENCES.map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
              <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 위 공식 출처를 직접 확인하세요.</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>가압류·채권 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function GaapryuBiyongPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>채권 보전 · 가압류 비용</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          가압류 신청 비용 |<br />
          인지대·송달료·담보 금액 계산기
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          가압류 비용이 얼마인지 몰라서 시작을 못 하고 있는 분이 많아요.<br />
          결론부터 말하면, 청구금액 1,000만원 부동산 가압류 기준 실제 납부액은 5~7만원 수준이에요.<br /><br />
          담보금은 크게 보이지만 소송이 끝나면 대부분 돌려받아요. 지금 당장 현금이 없어도 보증보험증권으로 대체할 수 있어요.<br />
          아래 계산기에 금액을 입력하면 내 상황에 맞는 예상 비용이 바로 나와요.
        </p>

        <UrgentBanner />

        <Bdg>재산 유형과 금액을 입력해보세요</Bdg>
        <CostCalculator />

        <Divider />

        <H2>인지대·송달료·담보 금액, 항목별로 알아두세요</H2>
        <p style={body}>
          가압류 비용은 크게 세 덩어리예요. 인지대·송달료는 청구금액에 관계없이 고정이에요. 담보금은 청구금액에 비례하지만 나중에 돌려받아요. 실제로 내 주머니에서 나가는 건 보증보험료뿐이에요.<br /><br />
          부동산과 채권(예금·급여)은 담보 비율이 달라요. 부동산은 10%, 채권은 40%예요. 채권 가압류는 담보가 크기 때문에 소명이 충분하면 보증보험증권으로 대체 신청하는 게 중요해요.
        </p>

        <Bdg>부동산 가압류 비용 항목</Bdg>
        <CostTable items={COST_ITEMS_REAL} />

        <Bdg>예금·급여 채권 가압류 비용 항목</Bdg>
        <CostTable items={COST_ITEMS_DEBT} />

        <GreenBox title="담보금은 돌려받아요 — 보증보험료만 실제 비용이에요">
          담보금은 잘못된 가압류로 상대방이 피해를 입을 때를 대비해 법원에 맡기는 돈이에요.<br />
          소송에서 이기면 담보취소 신청으로 전액 돌려받아요. 현금 없이 보증보험증권으로 대체하면 실제로 내는 돈은 보험료뿐이에요.<br /><br />
          예를 들어 청구금액 1,000만원 부동산 가압류라면:<br />
          담보금 100만원 → 보증보험증권 발급 → 실제 납부 보험료 약 1,000~3,000원/월 수준<br />
          SGI서울보증(1588-3690) 또는 가까운 보험대리점에서 발급해요.
        </GreenBox>

        <HubLinks />

        <H2>담보 금액이 없을 때 — 공탁 없이 가압류 신청하는 방법</H2>
        <p style={body}>
          보증보험료도 부담이 된다면, 또는 아예 비용이 없다면 포기하지 마세요.<br />
          소송구조 제도를 신청하면 국가가 인지대·공탁비용을 대신 내줘요.<br />
          132에 전화해서 "소송구조 신청하고 싶다"고 하면 절차를 안내해줘요. 소득 확인 후 지원 여부가 결정돼요.
        </p>
        <BorderBox title="소송구조 — 기준 중위소득 125% 이하면 신청 가능해요">
          지원 내용: 인지대·송달료·공탁비용 전액 또는 일부 지원, 변호사 선임비 지원(일부)<br />
          신청 방법: 대한법률구조공단(132) 전화 또는 klac.or.kr 온라인 신청<br />
          기초생활수급자·장애인·농어업인·한부모가족은 소득 기준 없이 무료 지원 가능해요.<br />
          신청 → 심사 → 지원 결정까지 보통 1~2주 걸려요. 급하면 전화로 먼저 상담하세요.
        </BorderBox>

        <Divider />

        <H2>인지대·송달료·담보에 대해 자주 묻는 것들</H2>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 구체적인 사안은 대한법률구조공단(132) 또는 법원(1588-1657)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
