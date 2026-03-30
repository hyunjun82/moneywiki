import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 금융위원회 실손보험 개편안, 보험연구원 보고서(2025.12)
// 5세대_비중증비급여_자기부담률: 50% (4세대 30% → 상향)
// 5세대_비중증_보장한도: 연간 1,000만원 (4세대 5,000만원 → 축소)
// 5세대_중증_입원본인부담한도: 연 500만원 상한 신설 (중증 보장 강화)
// 5세대_보험료절감_특약1만: 4세대 대비 약 50% 인하 예정
// 5세대_보험료절감_특약1+2: 4세대 대비 약 30% 인하 예정
// 4세대_비급여_자기부담률: 30%
// 4세대_비급여_보장한도: 연간 5,000만원
// 4세대_도수치료한도: 연간 50회, 최대 350만원
// 4세대_비급여할증: 비급여 청구 100만원 초과 시 최대 300%
// 4세대_재가입주기: 5년
// 5세대_출시예정: 2026년 상반기 (특약1 먼저, 특약2 추후)

const HUB_LINKS = [
  { title: "4세대 실손보험 지금 가입해야 하나요?", sub: "5세대 출시 전 막차 타는 게 유리한 경우", href: "/w/4세대-실손보험-가입" },
  { title: "실손보험 도수치료 얼마까지 돼요?", sub: "세대별 한도·횟수·청구 방법 정리", href: "/w/실손보험-도수치료-한도" },
  { title: "실손보험 세대별 차이, 내 보험은 몇 세대?", sub: "1~4세대 자기부담금·보장 범위 비교", href: "/w/실손보험-세대별-차이" },
  { title: "실손보험 갱신 보험료가 올랐다면?", sub: "할증 구조 이해와 절감 방법", href: "/w/실손보험-갱신-보험료" },
];

const SIDEBAR_LINKS = [
  "5세대 실손보험 차이",
  "5세대 실손보험 출시일",
  "5세대 실손보험 도수치료",
  "5세대 실손보험 가입해야 하나",
  "4세대 5세대 실손보험 비교",
  "실손보험 비급여 자기부담금",
  "4세대 실손보험 전환",
  "실손보험 도수치료 50%",
  "5세대 실손보험 보험료",
  "5세대 실손보험 비중증",
  "실손보험 5세대 중증 보장",
  "실손보험 계약재매입",
  "4세대 실손보험 할증",
  "실손24 청구",
  "실손보험 세대 확인",
];

const FAQS = [
  {
    urgent: true,
    q: "도수치료 자주 받는데 5세대로 갈아타면 손해인가요",
    a: "네, 손해예요. 4세대는 비급여 자기부담률이 30%지만, 5세대 비중증 특약에서는 50%로 오르고 보장한도도 연간 5,000만원에서 1,000만원으로 줄어요. 도수치료·체외충격파·비급여 주사를 자주 받는 분이라면 4세대를 유지하거나, 5세대 특약2 출시 전에 4세대로 가입하는 게 낫습니다.",
  },
  {
    urgent: true,
    q: "지금 실손보험 없는데 4세대 가입이 나은가요, 5세대 기다려야 하나요",
    a: "비급여 치료를 거의 안 받는 건강한 분이라면 5세대를 기다려볼 수 있어요. 보험료가 4세대 대비 50% 저렴해질 전망이거든요. 반면 도수치료·MRI 등을 자주 받거나 받을 가능성이 크다면 5세대 출시 전에 4세대로 가입하는 게 유리해요. 5세대는 비중증 비급여 보장이 크게 줄어드니까요.",
  },
  {
    urgent: true,
    q: "5세대 실손보험 출시되면 기존 4세대는 자동으로 전환되나요",
    a: "자동 전환이 아니에요. 4세대는 5년마다 재가입할 때 전환 여부를 선택할 수 있어요. 1·2세대는 '계약 재매입' 방식으로 보상금을 받고 해지 후 5세대 무심사 재가입이 도입될 예정이에요. 강제 전환은 없으니 갱신 시점에 본인 상황에 맞게 판단하면 됩니다.",
  },
  {
    urgent: false,
    q: "5세대 실손보험은 언제 나오나요",
    a: "2026년 상반기 출시가 유력해요. 기본계약과 특약1(중증 비급여)이 먼저 나오고, 특약2(비중증 비급여 — 도수치료·비급여 주사 등)는 이후 출시될 예정이에요. 비급여 항목을 자주 쓰는 분은 특약2가 출시될 때까지 기다렸다가 전체 구조를 보고 판단하는 게 좋아요.",
  },
  {
    urgent: false,
    q: "5세대 실손보험은 중증 환자에게 유리한가요",
    a: "네. 5세대는 암·뇌혈관·심장질환 등 중증 질환 비급여에 대해 연 500만원 본인부담 상한을 신설해서 고액 의료비 부담을 낮추는 방향이에요. 중증 환자가 보험료는 낮추면서 꼭 필요한 보장을 챙기기에 유리한 구조예요.",
  },
  {
    urgent: false,
    q: "4세대 실손보험 비급여 할증이 무섭던데 5세대도 똑같이 할증되나요",
    a: "4세대와 동일하게 비급여 이용량에 따라 할증 구조가 유지돼요. 비급여를 많이 쓰면 보험료가 2~4배까지 오를 수 있어요. 다만 5세대는 비중증 비급여를 특약으로 분리했기 때문에, 특약2 미가입 시 그 항목 할증 자체가 없어요. 비급여를 거의 안 쓰는 분에게는 유리한 구조예요.",
  },
  {
    urgent: false,
    q: "임신·출산 관련 의료비도 5세대에서 보장되나요",
    a: "네. 5세대 실손보험의 주요 변화 중 하나가 임신·출산 관련 급여 의료비 보장 추가예요. 기존 실손보험에서는 임신·출산 의료비 급여 항목이 보장 범위 밖이었는데, 5세대에서 포함됩니다.",
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
    doseFreq: {
      title: "도수치료·비급여 주사를 자주 받는다면",
      color: "#DC2626", bg: "#FEF2F2",
      text: "5세대 출시 전에 4세대로 가입하세요. 5세대는 비중증 비급여 자기부담률이 30%→50%로 오르고, 연간 보장한도도 5,000만원→1,000만원으로 줄어요. 도수치료·비급여 주사·체외충격파를 자주 받는 분에게는 불리한 구조입니다.",
    },
    noUse: {
      title: "병원을 거의 안 가고 비급여 치료도 없다면",
      color: G, bg: GL,
      text: "5세대를 기다려볼 수 있어요. 보험료가 4세대보다 50% 저렴해질 전망이에요. 비급여를 안 쓰면 할증도 없고, 중증 질환 보장은 오히려 강화돼요. 단, 5세대 출시 시점과 특약 구성을 확인하고 판단하세요.",
    },
    switch: {
      title: "갱신 통보 받았거나 전환이 고민된다면",
      color: "#7C3AED", bg: "#F5F3FF",
      text: "아래 '내 상황 체커'로 먼저 확인해보세요. 비급여 이용량이 많으면 4세대 유지, 거의 없으면 5세대 전환이 유리해요. 1·2세대는 계약 재매입 보상금 수준이 공개된 뒤 판단하는 게 안전해요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 내 상황이 어떤가요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "doseFreq", label: "도수치료·비급여 주사를 자주 받아요." },
          { id: "noUse",    label: "병원을 거의 안 가고 비급여 치료도 없어요." },
          { id: "switch",   label: "갱신 통보 받았거나 전환을 고민 중이에요." },
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

// ─── 핵심 비교 테이블
function CompareTable() {
  const rows = [
    { item: "비급여 자기부담률",  v4: "30%",               v5: "50% (비중증)",       bad: true },
    { item: "비급여 보장한도",    v4: "연간 5,000만원",     v5: "연간 1,000만원 (비중증)", bad: true },
    { item: "중증 본인부담 상한", v4: "없음",               v5: "연 500만원 신설",     bad: false },
    { item: "도수치료 보장",      v4: "연 50회·350만원",    v5: "제한 강화 또는 제외", bad: true },
    { item: "보험료",             v4: "기준",               v5: "특약1만: -50% / 특약1+2: -30%", bad: false },
    { item: "임신·출산 급여",     v4: "미보장",             v5: "신규 포함",           bad: false },
    { item: "비급여 할증 구조",   v4: "4세대와 동일",       v5: "동일 유지",          bad: null },
    { item: "재가입 주기",        v4: "5년",                v5: "5년 (동일)",         bad: null },
  ];

  return (
    <div style={{ overflowX: "auto", margin: "10px 0 1.5rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            {["항목", "4세대", "5세대"].map((h, i) => (
              <th key={h} style={{ padding: "10px 14px", textAlign: i === 0 ? "left" : "center", fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", fontWeight: 500, color: "#374151" }}>{r.item}</td>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", textAlign: "center", color: "#6b7280" }}>{r.v4}</td>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", textAlign: "center",
                color: r.bad === true ? "#DC2626" : r.bad === false ? G : "#6b7280",
                fontWeight: r.bad !== null ? 600 : 400 }}>
                {r.v5}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6, lineHeight: 1.7 }}>
        ※ 5세대 수치는 금융위원회 개편안 기준. 확정 약관은 출시 시점에 재확인 필요. 근거: 금융위원회 보도자료·보험연구원 보고서(2025.12)
      </p>
    </div>
  );
}

// ─── 내 상황 체커 (핵심 컴포넌트)
function SituationChecker() {
  const [checked, setChecked] = useState({});
  const toggle = id => setChecked(p => ({ ...p, [id]: !p[id] }));

  const items = [
    { id: "dose",    label: "도수치료·체외충격파·비급여 주사를 자주 받아요",         sub: "연 3회 이상이면 4세대 유지가 유리해요" },
    { id: "mri",     label: "MRI·비급여 영상검사를 받을 가능성이 높아요",            sub: "근골격계 만성질환, 척추·관절 문제 있는 경우" },
    { id: "old",     label: "1·2세대 실손보험 보유 중이에요",                       sub: "보험료 부담이 크다면 계약 재매입 조건 확인 후 판단" },
    { id: "healthy", label: "병원을 거의 안 가고 비급여 치료 경험이 없어요",         sub: "5세대 전환 시 보험료 절감 효과가 큼" },
    { id: "severe",  label: "암·뇌혈관·심장질환 등 중증 질환 이력 또는 위험이 있어요", sub: "5세대 중증 보장이 강화돼 유리할 수 있어요" },
    { id: "baby",    label: "임신·출산 계획이 있어요",                              sub: "5세대에서 임신·출산 급여 의료비가 신규 보장" },
  ];

  const stay4  = checked["dose"]    || checked["mri"];
  const to5    = checked["healthy"] || checked["severe"] || checked["baby"];
  const check1 = checked["old"];

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.7 }}>
        해당되는 항목을 모두 선택하면 4세대 유지 vs 5세대 전환 방향이 나와요.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map(c => (
          <label key={c.id} onClick={() => toggle(c.id)} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: 8, cursor: "pointer",
            border: `1px solid ${checked[c.id] ? G : "#e5e7eb"}`,
            background: checked[c.id] ? GL : "#fff",
          }}>
            <input type="checkbox" checked={!!checked[c.id]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>
              {c.label}
              <span style={{ fontSize: 11, color: "#6b7280", display: "block", marginTop: 3 }}>{c.sub}</span>
            </span>
          </label>
        ))}
      </div>

      {(stay4 || to5 || check1) && (
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {stay4 && (
            <div style={{ padding: "12px 16px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #FCA5A5", fontSize: 13, lineHeight: 1.8 }}>
              <strong style={{ color: "#DC2626" }}>⚠️ 4세대 유지 또는 5세대 출시 전 4세대 가입 권장</strong><br />
              비중증 비급여 자기부담률이 30%→50%로 오르고 한도도 줄어요. 지금 받는 치료가 더 비싸질 수 있어요.
            </div>
          )}
          {to5 && !stay4 && (
            <div style={{ padding: "12px 16px", borderRadius: 8, background: GL, border: "1px solid #9FE1CB", fontSize: 13, lineHeight: 1.8 }}>
              <strong style={{ color: GD }}>✅ 5세대 검토 가능</strong><br />
              보험료 절감 효과가 크고, 중증 보장·임신출산 보장은 강화돼요. 출시 후 약관을 확인하고 판단하세요.
            </div>
          )}
          {check1 && (
            <div style={{ padding: "12px 16px", borderRadius: 8, background: "#EFF6FF", border: "1px solid #93C5FD", fontSize: 13, lineHeight: 1.8 }}>
              <strong style={{ color: "#1D4ED8" }}>💡 1·2세대 보유자</strong><br />
              계약 재매입 보상금 조건이 공개되면 비교 후 결정하세요. 비급여를 자주 쓴다면 유지가 유리할 수 있어요.
            </div>
          )}
        </div>
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>5세대 출시 전이 결정의 골든타임이에요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        도수치료·비급여 자주 받는다면<br />지금 4세대 가입이 유리해요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        5세대는 비중증 비급여 자기부담 50%·보장한도 1,000만원으로 줄어요.<br />
        보험료 낮추고 싶지만 비급여도 챙기고 싶다면 지금 비교해보세요.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, maxWidth: 480, margin: "0 auto" }}>
        <a href="https://www.fss.or.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none" }}>
          🔍 보험다모아 비교
        </a>
        <a href="https://www.insure.or.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          💬 실손24 잔액 확인
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

export default function SilsonInsurancePage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>

        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>보험 · 실손의료보험 · 2026 개편</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          5세대 실손보험, 4세대랑 뭐가 달라요?<br />
          도수치료·보험료·자기부담금 차이 정리
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          갱신 통보 받으셨거나, 5세대 나온다는 기사 보셨죠.<br />
          핵심은 하나예요. 도수치료·비급여를 자주 쓰느냐 아니냐로 답이 갈려요.<br /><br />
          내 상황을 선택하면 4세대 유지 vs 5세대 전환 방향이 바로 나와요.
        </p>

        <UrgentBanner />

        <Bdg>4세대 vs 5세대 핵심 차이 비교</Bdg>
        <CompareTable />

        <Divider />

        <H2>5세대 실손보험이 4세대와 다른 점이 뭔가요</H2>
        <p style={body}>
          5세대의 핵심 변화는 비급여를 '중증'과 '비중증'으로 쪼갠 것이에요.<br />
          중증은 보장을 강화하고, 비중증(도수치료·비급여 주사 등)은 대폭 줄이는 방향이에요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "12px 0 1.2rem" }}>
          {[
            {
              tag: "비중증 비급여 보장 축소", tagColor: "#DC2626",
              title: "도수치료·비급여 주사·체외충격파 — 자기부담 30%→50%, 한도 5,000만→1,000만원",
              desc: "비급여를 자주 받는 분에게는 실질적으로 불리해요. 100만원 치료 시 4세대는 30만원 부담, 5세대는 50만원 부담이에요.",
              icon: "⚠️",
            },
            {
              tag: "중증 보장 강화", tagColor: G,
              title: "암·뇌혈관·심장질환 등 중증 — 연 500만원 본인부담 상한 신설",
              desc: "고액 의료비가 집중되는 중증 환자는 오히려 부담 상한이 생겨서 유리해요.",
              icon: "✅",
            },
            {
              tag: "보험료 인하", tagColor: G,
              title: "특약1(중증)만 가입 시 4세대 대비 약 50% 인하 예정",
              desc: "특약1·2 모두 가입하면 약 30% 인하 예정. 비급여를 거의 안 쓰는 분에게 유리해요.",
              icon: "✅",
            },
            {
              tag: "임신·출산 신규 보장", tagColor: G,
              title: "기존 실손보험에 없던 임신·출산 급여 의료비가 5세대에서 포함",
              desc: "임신·출산 계획이 있다면 5세대 전환이 이 항목에서만큼은 유리해요.",
              icon: "✅",
            },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "14px 16px", borderRadius: 10, background: "#f9fafb", border: "1px solid #e5e7eb" }}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
              <span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: item.tagColor + "20", color: item.tagColor, display: "inline-block", marginBottom: 6 }}>{item.tag}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 4 }}>{item.title}</span>
                <span style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.8 }}>{item.desc}</span>
              </span>
            </div>
          ))}
        </div>

        <Divider />

        <H2>5세대 실손보험 나오면 갈아타야 하나요</H2>
        <p style={body}>
          "무조건 갈아타야 한다" "무조건 유지해야 한다" 둘 다 틀렸어요.<br />
          내 비급여 이용 패턴에 따라 결론이 완전히 달라져요.
        </p>
        <Bdg>내 상황 체커 — 해당 항목 선택하면 방향이 나와요</Bdg>
        <SituationChecker />
        <GreenBox title="한 줄 요약">
          도수치료·비급여 주사 자주 받는다 → 4세대 유지 또는 지금 4세대 가입<br />
          병원 거의 안 간다 → 5세대 기다렸다 보험료 낮추기<br />
          중증 질환 위험 있다 → 5세대 중증 특약이 유리<br />
          임신·출산 계획 있다 → 5세대 신규 보장 포함
        </GreenBox>

        <Divider />

        <H2>도수치료, 5세대에서는 얼마나 보장되나요</H2>
        <p style={body}>
          5세대에서 도수치료는 비중증 특약(특약2)으로 분리돼요.<br />
          특약2에 가입해야만 보장받을 수 있고, 자기부담률도 높아져요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { label: "4세대 도수치료 보장",    detail: "연간 50회·최대 350만원 / 자기부담 30%",          ok: true },
            { label: "5세대 도수치료 보장",    detail: "비중증 특약2에 별도 가입 필요 / 자기부담 50% / 한도 대폭 축소", ok: false },
            { label: "5세대 특약2 미가입 시",  detail: "도수치료·체외충격파·비급여 주사 보장 없음",        ok: false },
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
        <BorderBox title="5세대 특약2(비중증 비급여) 주요 변화 예정">
          비중증 항목: 도수치료·체외충격파·비급여 주사·MRI 등<br />
          자기부담률: 30% → 50%로 상향<br />
          보장한도: 연간 5,000만원 → 1,000만원으로 축소<br />
          특약2는 2026년 상반기 이후 출시 예정 (특약1보다 늦게 출시)
        </BorderBox>

        <HubLinks />

        <H2>5세대 실손보험, 자주 하는 질문</H2>
        <p style={{ ...body, marginBottom: 14 }}>막막한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />

        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "금융위원회 — 실손의료보험 개편안 보도자료 (2025.04)", url: "https://www.fsc.go.kr/" },
              { label: "보험연구원 — 5세대 실손의료보험 도입에 따른 공사보험 상생방안 (2025.12)", url: "https://www.kiri.or.kr/" },
              { label: "보험다모아 — 실손보험 상품 비교공시", url: "https://www.e-insura.or.kr/" },
              { label: "금융감독원 — 실손24 (실손보험 청구 간소화)", url: "https://www.insure.or.kr/" },
            ].map(item => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공 목적으로 작성됐어요. 개인 상황에 따라 유불리가 다르므로 보험사 약관과 전문가 상담을 권장해요. 투자·보험 권유 목적이 아니에요.<br />
          ※ 5세대 비중증 자기부담률 50% / 비중증 보장한도 연간 1,000만원 / 중증 입원 본인부담 연 500만원 상한 / 4세대 대비 특약1만 가입 시 보험료 약 50% 인하 예정 / 근거: 금융위원회 개편안·보험연구원 보고서(2025.12)
        </div>
      </div>
    </div>
  );
}
