import { useState } from "react";

// ─── 데이터 ─────────────────────────────────────────────
const SIDEBAR_LINKS = [
  "가압류 신청 비용 계산",
  "가압류 신청서 작성 방법",
  "부동산 가압류 신청",
  "채권 가압류 신청",
  "가압류 담보 공탁 방법",
  "가압류 이의신청 방법",
  "오래된 가압류 해제 방법",
  "처분금지가처분 신청 조건",
  "소액사건 소장 작성",
  "차용증 없이 빌려준 돈 받는 방법",
  "강제집행 신청 방법",
  "임금체불 진정 방법",
  "전세보증금 반환 청구",
  "손해배상 청구 소송 방법",
  "지급명령 신청 방법",
  "법원 전자소송 이용 방법",
  "대한법률구조공단 무료 상담",
  "내용증명 보내는 방법",
  "소멸시효 중단 방법",
  "민사소송 절차",
];

const HUB_LINKS = [
  { title: "가압류 신청 비용 | 인지대·송달료·담보 금액 계산기", desc: "재산 유형별 예상 비용을 직접 계산해보세요", href: "#" },
  { title: "오래된 가압류 해제 방법 | 소멸시효·취소 신청 절차", desc: "3년 이상 방치된 가압류, 지금 취소 신청하세요", href: "#" },
  { title: "처분금지가처분 신청 조건 | 부동산 매매·담보 제공 기준", desc: "가압류보다 강력한 처분금지가처분 신청 방법", href: "#" },
  { title: "차용증 없이 빌려준 돈 받는 방법 | 통장 이체 내역으로 소송", desc: "증거 없어도 청구 가능한 방법", href: "#" },
];

const STEPS = [
  {
    title: "채무자 재산 파악 — 먼저 이것부터 해요",
    desc: "신청서에 가압류할 재산을 구체적으로 써야 해요. '재산 전부'는 안 돼요. 부동산이면 토지·건물 주소와 면적, 예금이면 은행명과 계좌번호(모르면 은행명만도 가능), 급여면 회사명을 적어요. 인터넷등기소(iros.go.kr)에서 채무자 이름으로 부동산 등기부를 검색하는 게 가장 빠른 방법이에요.",
    link: { label: "인터넷등기소 바로가기", url: "https://www.iros.go.kr" },
  },
  {
    title: "가압류 신청서 + 진술서 작성",
    desc: "신청서에는 ① 청구채권의 내용(언제, 얼마를, 어떤 이유로 빌려줬는지) ② 가압류할 재산 표시 ③ 신청이유(지금 신청하지 않으면 집행이 곤란한 이유)를 적어요. 대한법률구조공단 홈페이지 서식 자료실에서 양식을 무료로 받아서 기재례를 보고 쓰면 돼요. 틀려도 법원이 보정을 요청해줘요.",
    link: { label: "법률구조공단 서식 바로가기", url: "https://www.klac.or.kr" },
  },
  {
    title: "인지대·송달료 납부 + 선담보제공",
    desc: "인지대 10,000원(전자소송 9,000원)과 송달료를 납부해요. 부동산 가압류는 담보제공명령 전에 미리 SGI서울보증에서 보증보험증권을 발급받아 제출하면 결정이 빨라져요. 보증보험료는 담보금액(청구금액의 10%)에 연 0.1~0.3% 수준이에요. 청구금액 1,000만원이면 보험료는 수만원이에요.",
    tip: "전자소송(ecfs.scourt.go.kr)으로 신청하면 인지대 10% 할인 + 집에서 접수 가능해요",
  },
  {
    title: "관할 법원에 신청서 제출",
    desc: "부동산 가압류 → 부동산 소재지 관할 지방법원. 예금·급여 채권 가압류 → 은행·회사 주소지 관할 법원. 자동차 → 채무자 주소지 또는 자동차 소재지 법원. 전자소송(ecfs.scourt.go.kr)으로 온라인 제출하면 법원 방문 없이 처리돼요. 접수하면 사건번호가 나오고 법원 단말기나 대법원 나의사건검색에서 진행 상황을 확인할 수 있어요.",
    link: { label: "전자소송 바로가기", url: "https://ecfs.scourt.go.kr" },
  },
  {
    title: "담보제공명령 + 공탁",
    desc: "법원이 담보제공명령을 내리면 문자나 우편으로 통지가 와요. 명령에 적힌 금액만큼 보증보험증권을 발급받거나 현금을 공탁해야 해요. 부동산은 보증보험증권으로 대부분 처리돼요. 채권 가압류는 담보의 일부를 현금으로 공탁하라는 명령이 나오기도 해요. 담보 제공 후 법원 재판부에 담보제공신고서를 제출해야 절차가 진행돼요.",
  },
  {
    title: "가압류 결정 + 집행 확인",
    desc: "결정이 나면 부동산은 법원이 등기소에 촉탁해서 등기부에 가압류가 기재돼요. 채권(예금·급여)은 은행·회사에 지급금지 통지가 가요. 인터넷등기소에서 등기부를 열람해서 가압류 기재를 직접 확인하세요. 결정 후 3년 내에 반드시 본안소송(또는 지급명령)을 제기해야 가압류가 유지돼요.",
    tip: "3년 내 본안소송 미제기 시 채무자가 가압류 취소 신청 가능 (민사집행법 제288조)",
  },
];

const ASSET_TYPES = [
  {
    type: "부동산",
    court: "부동산 소재지 법원",
    deposit: "청구금액의 10% (보증보험증권 대체 가능)",
    tax: "등록면허세 + 지방교육세 별도",
    tip: "현금공탁 명령은 드물어요. 보증보험증권으로 진행되는 경우가 많아요.",
  },
  {
    type: "예금·급여 채권",
    court: "은행·회사 주소지 법원",
    deposit: "청구금액의 40% (일부 현금공탁 명령 가능)",
    tax: "해당 없음",
    tip: "급여는 월급의 1/2만 가압류 가능해요(민사집행법 제246조)",
  },
  {
    type: "자동차",
    court: "채무자 주소지 또는 자동차 소재지 법원",
    deposit: "청구금액의 10~20%",
    tax: "등록면허세 15,000원 + 지방교육세 3,000원",
    tip: "자동차는 집행관이 열쇠를 보관하거나 견인하는 방식으로 집행돼요.",
  },
  {
    type: "유체동산",
    court: "채무자 주소지 법원",
    deposit: "청구금액의 40% 이상",
    tax: "해당 없음",
    tip: "집행관이 직접 현장에 가서 동산을 압류해요. 생활에 필요한 물건은 압류 금지예요.",
  },
];

const FAQS = [
  { urgent: true, q: "채무자가 재산을 숨기는 것 같아요. 지금 당장 뭘 해야 하나요?", a: "가압류는 채무자가 모르는 상태에서 진행돼요. 신청 → 결정까지 보통 1~4주가 걸리는데, 그 사이 채무자가 재산을 넘기면 막을 수 없어요. 부동산이 있다면 오늘 바로 인터넷등기소에서 등기부를 열람해서 근저당·이전 여부를 확인하고, 전자소송으로 즉시 신청하는 게 최선이에요. 급할 경우 대한법률구조공단(132) 또는 변호사에게 즉시 연락하세요." },
  { urgent: true, q: "판결문이 없어요. 차용증만 있어도 가압류가 되나요?", a: "가압류는 판결문(집행권원) 없이도 신청할 수 있어요. 차용증, 이체 내역, 카카오톡 대화 등 채권이 존재한다는 걸 소명할 수 있으면 돼요. 다만 소명 자료가 충분해야 법관이 인용 결정을 내려줘요. 자료가 부족하면 기각될 수 있어서, 있는 증거를 전부 첨부하는 게 중요해요." },
  { urgent: true, q: "공탁금이 없어서 가압류를 못 할 것 같아요. 방법이 있나요?", a: "부동산 가압류는 현금 없이 보증보험증권으로 담보제공이 가능해요. 보증보험료는 보증금액(청구금액의 10%)에 보험요율을 곱한 금액인데, 청구금액 1,000만원이면 보험료는 수만원 수준이에요. 채권 가압류는 일부 현금공탁 명령이 나올 수 있지만, 재산이 없다면 대한법률구조공단(132)에 소송구조를 신청하면 공탁비용 지원이 가능해요." },
  { urgent: false, q: "가압류 후 얼마 내에 소송을 제기해야 하나요?", a: "가압류 결정 후 3년 이내에 본안소송을 제기하지 않으면 채무자가 가압류 취소를 신청할 수 있어요(민사집행법 제288조). 가압류는 임시 처분이라 반드시 소송으로 이어야 해요. 가압류 집행 후 바로 지급명령 신청이나 본안소송을 준비하세요." },
  { urgent: false, q: "가압류를 잘못 신청하면 손해배상을 해야 하나요?", a: "채무자가 아무 의무 없이 가압류를 당한 게 밝혀지면 채권자에게 손해배상 책임이 생길 수 있어요. 공탁한 담보금이 그 손해배상 재원이 돼요. 채권이 실제로 존재하고 보전 필요성이 있다면 걱정하지 않아도 돼요." },
  { urgent: false, q: "가압류 신청이 기각됐어요. 다시 신청할 수 있나요?", a: "기각 결정을 받은 날부터 1주일 이내에 즉시항고를 할 수 있어요. 또는 소명 자료를 보완해서 다시 신청할 수도 있어요. 기각 사유가 소명 부족이라면 증거를 추가해서 재신청하면 인용될 가능성이 있어요." },
];

const DOCS = [
  { name: "가압류신청서 + 가압류신청 진술서", required: true, where: "대한법률구조공단 홈페이지 서식 자료실" },
  { name: "청구채권 소명 자료", required: true, where: "차용증, 이체 내역, 계약서, 카카오톡 대화 등" },
  { name: "인지 10,000원", required: true, where: "법원 내 수입인지 판매소 또는 전자수입인지(e-stamp.or.kr)" },
  { name: "송달료납부서", required: true, where: "법원 은행 창구 또는 전자소송 온라인 납부" },
  { name: "채무자·재산 특정 서류", required: true, where: "등기부등본(인터넷등기소), 법인등기부등본 등" },
  { name: "보증보험증권 또는 현금공탁서", required: false, where: "SGI서울보증·한국무역보험공사 / 법원 공탁소" },
  { name: "법인등기부등본", required: false, where: "당사자가 법인인 경우, 인터넷등기소" },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민사집행법 제276조 (가압류의 목적)", url: "https://www.law.go.kr/LSW/lsLawLinkInfo.do?lsJoLnkSeq=900066203&chrClsCd=010202" },
    { label: "민사집행법 제277조 (가압류의 요건)", url: "https://www.law.go.kr/" },
    { label: "민사집행법 제288조 (사정변경 등에 의한 취소)", url: "https://www.law.go.kr/" },
    { label: "민사소송 등 인지법 제9조 (보전처분 신청 인지)", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 가압류 신청 (2026. 2. 1. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=294&ccfNo=2&cciNo=1&cnpClsNo=1" },
    { label: "대법원 전자소송 포털 — 가압류 신청", url: "https://ecfs.scourt.go.kr/psp/index.on?m=PSP730M14" },
    { label: "대한법률구조공단 — 법률 서식 자료실", url: "https://www.klac.or.kr" },
    { label: "인터넷등기소 — 부동산 등기 열람", url: "https://www.iros.go.kr" },
  ]},
];

// ─── 디자인 토큰 ─────────────────────────────────────────
const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

// ─── 공통 UI ─────────────────────────────────────────────
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

// ─── 긴급 배너 ───────────────────────────────────────────
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    now: { title: "지금 당장 신청해야 한다면", color: "#DC2626", bg: "#FEF2F2",
      text: "채무자가 재산을 처분하기 전에 움직여야 해요. 전자소송(ecfs.scourt.go.kr)에서 오늘 바로 신청할 수 있어요. 재산을 특정하지 못했다면 인터넷등기소에서 등기부등본을 먼저 열람하세요. 서류가 복잡하면 대한법률구조공단(132)에 전화하면 무료로 안내받을 수 있어요." },
    first: { title: "처음 신청하는 거라면", color: G, bg: GL,
      text: "가압류는 판결문 없이 신청할 수 있어요. 차용증, 이체 내역, 계약서 등 채권 증거를 준비하고, 채무자 재산(부동산·예금·급여)을 특정한 뒤 신청서를 작성해요. 재산 유형에 따라 관할 법원이 달라지니 아래 재산별 안내를 먼저 확인하세요." },
    cost: { title: "비용이 얼마인지 알고 싶다면", color: "#7C3AED", bg: "#F5F3FF",
      text: "인지대 10,000원 + 송달료(당사자 수 × 3회 × 5,200원)는 고정이에요. 담보(공탁)가 변수예요. 부동산은 청구금액의 10% 보증보험증권(보험료 수만원), 채권은 일부 현금공탁이 나올 수 있어요. 아래 계산기로 예상 비용을 확인하세요." },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "now",   label: "채무자가 재산을 빼돌릴 것 같아요. 지금 당장 해야 해요." },
          { id: "first", label: "처음이에요. 순서부터 알고 싶어요." },
          { id: "cost",  label: "비용이 얼마나 드는지 먼저 알고 싶어요." },
        ].map((item) => (
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <strong style={{ fontSize: 14, color: m.color }}>{m.title}</strong>
        <button onClick={() => setType(null)} style={{ fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 비용 계산기 ─────────────────────────────────────────
function CostCalculator() {
  const [amount, setAmount] = useState(1000);
  const [assetType, setAssetType] = useState("real");
  const [parties, setParties] = useState(2);

  const stamp = 10000;
  const delivery = parties * 3 * 5200;
  const depositRate = assetType === "real" ? 0.10 : assetType === "debt" ? 0.40 : 0.20;
  const depositAmt = Math.round(amount * 10000 * depositRate);
  // 보증보험료 추정: 부동산 연 0.1~0.3%, 채권 연 0.1~0.5%
  const insuranceRate = assetType === "real" ? 0.002 : 0.004;
  const insurance = Math.round(depositAmt * insuranceRate);

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14 }}>💰 가압류 예상 비용 계산기</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>청구금액 (만원)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>당사자 수 (채권자+채무자)</label>
          <select value={parties} onChange={(e) => setParties(Number(e.target.value))}
            style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}>
            {[2,3,4].map(n => <option key={n} value={n}>{n}명</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 6 }}>가압류 대상 재산</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { id: "real", label: "부동산" },
            { id: "debt", label: "예금·급여 채권" },
            { id: "car",  label: "자동차·동산" },
          ].map((t) => (
            <button key={t.id} onClick={() => setAssetType(t.id)} style={{
              padding: "7px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
              border: `1px solid ${assetType === t.id ? G : "#d1d5db"}`,
              background: assetType === t.id ? GL : "#fff",
              color: assetType === t.id ? GD : "#374151", fontWeight: assetType === t.id ? 600 : 400,
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "인지대", value: stamp.toLocaleString() + "원", fixed: true },
            { label: `송달료 (${parties}명 × 3회)`, value: delivery.toLocaleString() + "원", fixed: true },
            { label: `담보금액 (청구금액의 ${depositRate * 100}%)`, value: depositAmt.toLocaleString() + "원", fixed: false, note: "보증보험증권으로 대체 가능" },
            { label: "보증보험료 (추정)", value: "약 " + insurance.toLocaleString() + "원", fixed: false, note: "실제 요율은 보험사마다 달라요" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>
              <div>
                <span style={{ fontSize: 13, color: "#374151" }}>{row.label}</span>
                {row.note && <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 6 }}>({row.note})</span>}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: row.fixed ? "#374151" : G }}>{row.value}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>실제 납부 예상</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: G }}>
              {(stamp + delivery + insurance).toLocaleString()}원~
            </span>
          </div>
        </div>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
          담보를 현금공탁으로 명령받으면 {depositAmt.toLocaleString()}원을 직접 납부해야 해요. 현금공탁금은 소송 종결 후 돌려받을 수 있어요.
        </p>
      </div>
    </div>
  );
}

// ─── 재산 유형별 표 ──────────────────────────────────────
function AssetTable() {
  const [selected, setSelected] = useState(0);
  const a = ASSET_TYPES[selected];
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
        {ASSET_TYPES.map((t, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            flex: 1, padding: "10px 4px", fontSize: 12, fontWeight: selected === i ? 700 : 400,
            background: selected === i ? GL : "#f9fafb", border: "none",
            borderRight: i < ASSET_TYPES.length - 1 ? "1px solid #e5e7eb" : "none",
            color: selected === i ? GD : "#6b7280", cursor: "pointer",
          }}>{t.type}</button>
        ))}
      </div>
      <div style={{ padding: "14px 16px", fontSize: 13, lineHeight: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px" }}>
          <span style={{ color: "#9ca3af", fontWeight: 600 }}>관할 법원</span>
          <span>{a.court}</span>
          <span style={{ color: "#9ca3af", fontWeight: 600 }}>담보 기준</span>
          <span>{a.deposit}</span>
          <span style={{ color: "#9ca3af", fontWeight: 600 }}>등록세 등</span>
          <span>{a.tax}</span>
        </div>
        <div style={{ marginTop: 10, background: GL, borderRadius: 6, padding: "8px 12px", fontSize: 12, color: GD }}>
          💡 {a.tip}
        </div>
      </div>
    </div>
  );
}

// ─── 절차 단계 ───────────────────────────────────────────
function ProcessSteps() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
      {STEPS.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, background: "#e5e7eb", minHeight: 20 }} />}
          </div>
          <div style={{ paddingBottom: i < STEPS.length - 1 ? 20 : 0, flex: 1 }}>
            <strong style={{ fontSize: 14, color: "#111", display: "block", marginBottom: 4, lineHeight: 1.5 }}>{step.title}</strong>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 4px" }}>{step.desc}</p>
            {step.tip && <div style={{ fontSize: 12, color: GD, background: GL, borderRadius: 6, padding: "6px 10px", marginTop: 6 }}>💡 {step.tip}</div>}
            {step.link && <a href={step.link.url} style={{ fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", display: "inline-block", marginTop: 6 }}>→ {step.link.label}</a>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 서류 목록 ───────────────────────────────────────────
function DocTable() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem" }}>
      {DOCS.map((doc, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 14px", borderBottom: i < DOCS.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "flex-start" }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 12, background: doc.required ? G : "#e5e7eb", color: doc.required ? "#fff" : "#6b7280", flexShrink: 0, marginTop: 2 }}>{doc.required ? "필수" : "해당시"}</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: "0 0 2px" }}>{doc.name}</p>
            <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{doc.where}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const urgent = FAQS.filter(f => f.urgent);
  const normal = FAQS.filter(f => !f.urgent);
  const all = [...urgent, ...normal];
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {all.map((faq, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
            width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10,
          }}>
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

// ─── CTA ─────────────────────────────────────────────────
function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 시작할 수 있어요</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { label: "대법원 전자소송 — 가압류 신청", url: "https://ecfs.scourt.go.kr", sub: "온라인으로 오늘 바로 접수" },
          { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 상담·소송구조 신청" },
          { label: "찾기쉬운 생활법령 — 가압류", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=294", sub: "법령 기반 절차 확인" },
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

// ─── 허브 링크 ───────────────────────────────────────────
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
      <a href="#" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>
        가압류 관련 글 전체 보기 →
      </a>
    </div>
  );
}

// ─── 출처 ────────────────────────────────────────────────
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
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

// ─── 사이드바 ────────────────────────────────────────────
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

// ─── 메인 ────────────────────────────────────────────────
export default function GaapryuSinchungPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>

      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>채권 보전 · 가압류 · 강제집행</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          가압류 신청 방법 |<br />
          비용·절차·재산 유형별 신청
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          돈을 못 받고 있는데, 상대방이 재산을 팔거나 넘길 것 같아서 불안하시죠.<br />
          소송까지 가면 1년이 걸려요. 그 사이 재산이 사라지면 이겨도 못 받아요.<br /><br />
          가압류는 판결문 없이 지금 바로 신청할 수 있어요. 차용증이나 이체 내역만 있어도 돼요.<br />
          부동산은 신청 후 1~4주면 등기부에 가압류가 걸려요. 재산 유형부터 확인하세요.
        </p>

        <UrgentBanner />

        <Bdg>예상 비용 먼저 계산해보세요</Bdg>
        <CostCalculator />

        <Divider />

        <H2>재산 유형별 신청 — 부동산·채권·자동차 절차가 달라요</H2>
        <p style={body}>
          가압류는 묶을 재산을 딱 하나 특정해서 신청해야 해요. "재산 전부"는 안 돼요.<br />
          부동산인지, 예금인지, 급여인지에 따라 어느 법원에 내야 하는지, 담보를 얼마나 내야 하는지가 달라져요.<br />
          재산을 특정하지 못하면 법원이 신청서를 기각해요. 아래에서 내 상황에 맞는 유형을 먼저 선택하세요.
        </p>
        <Bdg>재산 유형 선택해서 확인하세요</Bdg>
        <AssetTable />
        <GreenBox title="재산을 모르면 이렇게 찾으세요">
          부동산이 있는지 → 인터넷등기소(iros.go.kr)에서 채무자 이름으로 열람. 1건에 700원이에요.<br />
          예금이 있는지 → 금융감독원 금융소비자정보포털에서 금융거래 조회 신청(본인 또는 법원 조회).<br />
          급여를 받는지 → 채무자 재직 회사를 확인해서 급여 채권을 대상으로 신청해요.<br />
          그래도 모른다면 → 가압류 결정 후 법원에 재산명시신청을 같이 준비하세요.
        </GreenBox>

        <HubLinks />

        <H2>가압류 신청 절차 — 신청서 제출부터 집행까지</H2>
        <p style={body}>
          변호사 없이 혼자 할 수 있어요. 전자소송으로 집에서 접수도 가능해요.<br />
          가장 많이 막히는 지점은 두 군데예요. 소명 자료 준비와 담보 제공이에요.<br />
          소명 자료는 차용증·이체 내역·카카오톡 등 있는 증거를 전부 모아서 첨부하면 돼요.<br />
          담보는 부동산 가압류라면 현금 없이 보증보험증권으로 대체할 수 있어요.
        </p>
        <Bdg>신청 절차</Bdg>
        <ProcessSteps />

        <Divider />

        <H2>가압류 신청에 필요한 서류</H2>
        <p style={body}>
          판결문(집행권원)은 필요 없어요. 채권이 존재한다는 소명 자료만 있으면 돼요.<br />
          차용증이 없어도 카카오톡 대화, 이체 내역, 계약서 중 하나만 있어도 신청 가능해요.<br />
          소명 자료가 많을수록 법관이 인용 결정을 내릴 가능성이 높아져요. 있는 증거는 전부 첨부하세요.
        </p>
        <DocTable />
        <BorderBox title="소명 자료, 이렇게 준비하면 돼요">
          ① 돈을 빌려줬다는 증거 → 이체 확인증, 차용증, 계약서 중 하나<br />
          ② 갚기로 했다는 증거 → 변제 약속 문자, 카카오톡, 이메일<br />
          ③ 아직 안 갚았다는 증거 → 독촉 문자와 묵묵부답 내역, 통장 내역<br />
          ④ 지금 신청해야 하는 이유 → "최근 부동산을 팔려고 한다", "다른 사람에게 넘기려고 한다" 등 구체적 정황<br />
          소명 자료가 빈약하면 기각되거나 전액 현금공탁 명령이 날 수 있어요.
        </BorderBox>

        <Divider />

        <H2>가압류 신청 비용·절차에서 자주 막히는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 각종 신고·불복 청구 등의 증거자료로 쓸 수 없어요. 개별 사안에 따라 결과가 달라질 수 있으니, 구체적인 상황은 대한법률구조공단(132) 또는 법원(1588-1657)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
