import { useState } from "react";

// ─── 2026년 기준 (소득세법 §89①3, 시행령 §155②④, §167의10, §155의3)
// 일시적 2주택 처분기한: 신규주택 취득일로부터 3년 이내 (소령 §155②)
// 종전주택 취득 후 1년 이상 경과 후 신규주택 취득
// 비과세 기준가액: 양도가액 12억원 이하 (소법 §89①3)
// 조정대상지역 2017.8.3 이후 취득: 보유 2년 + 거주 2년
// 다주택자 중과 유예: 2022.5.10~2026.5.9 (소령 §167의10)
// 중과 재개 시: 2주택 +20%p, 3주택 +30%p
// 혼인 합가: 혼인일로부터 10년 이내 (소령 §155③)
// 동거봉양 합가: 합친 날로부터 10년 이내 (소령 §155④)
// 상속주택: 일반주택 먼저 양도 시 기한 없이 비과세
// 상생임대주택: 임대료 5% 이내 → 거주요건 면제 (소령 §155의3, 2026.12.31)
// 예정신고: 양도일 속하는 달 말일부터 2개월 이내 (소법 §105①)

const SIDEBAR_LINKS = [
  "일시적 2주택 비과세 조건",
  "일시적 2주택 3년 처분 기한",
  "2026년 5월 9일 양도세 중과",
  "1가구 2주택 양도세 세율",
  "조정대상지역 거주요건 2년",
  "혼인 합가 비과세 기간",
  "동거봉양 합가 비과세",
  "상속주택 비과세",
  "상생임대주택 거주요건 면제",
  "1세대 1주택 양도세 비과세",
  "양도소득세 12억 기준",
  "양도소득세 예정신고",
  "장기보유특별공제 계산",
  "분양권 주택수 포함 2026",
  "종전주택 1년 기준",
  "비과세 적용 후 신고 방법",
  "양도세 신고기한",
  "양도세 홈택스 신고",
  "무신고가산세 20%",
  "국세청 126 상담",
];

const HUB_LINKS = [
  { title: "1세대 1주택 양도세 비과세 조건 | 거주기간 요건 2026", desc: "보유 2년·거주 2년·12억 기준 전체 정리", href: "#" },
  { title: "양도소득세 비과세 12억 기준 | 초과 시 세금 계산", desc: "12억 넘으면 전액 과세 아닌 이유", href: "#" },
  { title: "조정대상지역 거주요건 2026 | 강남 아파트 팔 때", desc: "2017.8.3 이후 취득 주택만 해당", href: "#" },
  { title: "부동산 취득세 계산 2026 | 주택수별 세율표", desc: "조정지역 2주택 8%, 일시적 2주택 특례", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "종전집 취득 1년이 안 됐는데 새 집 샀어요. 비과세 안 되나요?",
    a: "원칙적으로 안 돼요. 종전주택 취득일로부터 1년이 지난 뒤 신규주택을 취득해야 일시적 2주택 특례를 받을 수 있어요. 이 조건을 모르고 신규주택을 먼저 산 사례에서 1억6,100만원을 추가로 낸 경우가 국세청 공개 자료에 있어요. 단, 건설임대주택 분양전환, 수용, 취학·근무·질병 등 부득이한 사유는 예외가 있으니 세무사에게 확인하세요.",
  },
  {
    urgent: true,
    q: "2026년 5월 9일이 지나면 세금이 얼마나 늘어나요?",
    a: "2026년 5월 10일 이후 양도분부터는 조정대상지역 2주택자에게 기본세율에 +20%p, 3주택자에게 +30%p가 붙어요. 지방소득세 포함 시 최고 82.5%까지 올라가요. 하지만 일시적 2주택 요건을 충족하면 5월 9일 이후에도 비과세가 그대로 적용돼요. 중과 유예 종료와 일시적 2주택 비과세는 별개예요.",
  },
  {
    urgent: true,
    q: "3년 기한 날짜를 어떻게 계산하나요?",
    a: "신규주택의 잔금청산일이 기산점이에요. 계약일이 아니에요. 잔금청산일보다 등기접수일이 빠르면 등기접수일이 취득일이에요. 예를 들어 신규주택 잔금을 2023년 6월 1일에 받았다면 종전주택은 2026년 5월 31일까지 잔금 완료가 돼야 비과세예요.",
  },
  {
    urgent: false,
    q: "혼인하면서 2주택이 됐어요. 어떻게 처리하나요?",
    a: "혼인 합가 특례가 있어요. 각각 1주택을 가진 상태에서 혼인하면 혼인일로부터 10년 이내에 먼저 파는 주택을 1세대 1주택으로 봐요. 비과세 기본요건(보유 2년 등)만 충족하면 세금 없이 팔 수 있어요.",
  },
  {
    urgent: false,
    q: "부모님 모시려고 합가했어요. 2주택인데 괜찮나요?",
    a: "동거봉양 합가 특례가 있어요. 60세 이상 직계존속(시부모 포함)을 모시기 위해 합가해서 2주택이 된 경우, 합친 날로부터 10년 이내에 먼저 파는 주택은 비과세예요.",
  },
  {
    urgent: false,
    q: "상속으로 주택을 받았어요. 기존 주택을 팔면 어떻게 되나요?",
    a: "상속주택과 일반주택을 각 1채 보유한 경우, 일반주택(원래 갖고 있던 주택)을 먼저 팔 때는 기한 제한 없이 비과세가 적용돼요.",
  },
  {
    urgent: false,
    q: "분양권 때문에 2주택이 됐는데, 기존 집 팔 때 비과세 되나요?",
    a: "2021년 1월 1일 이후 취득한 분양권은 주택 수에 포함돼요. 분양권 취득일로부터 3년 이내에 기존 주택을 양도하고, 종전주택 취득 후 1년 이상 경과 요건을 충족하면 비과세가 돼요. 2020년 12월 31일 이전 취득 분양권은 주택 수에 포함되지 않아요.",
  },
  {
    urgent: false,
    q: "세입자가 있어서 거주를 못 했어요. 거주요건 면제받을 수 없나요?",
    a: "상생임대주택 특례가 있어요. 임대차 갱신 시 임대료 인상률을 직전 계약 대비 5% 이내로 유지했다면 조정대상지역 2년 거주요건이 면제돼요. 2026년 12월 31일까지 한시 적용이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제89조 제1항 제3호: 1세대 1주택 비과세", url: "https://www.law.go.kr/" },
      { label: "소득세법 시행령 제155조: 일시적 2주택 등 비과세 특례", url: "https://www.law.go.kr/" },
      { label: "소득세법 시행령 제167조의10: 다주택자 중과 한시 배제", url: "https://www.law.go.kr/" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 양도소득세 비과세 요건 판단", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308" },
      { label: "찾기쉬운 생활법령: 1세대 1주택 양도소득세 (2026.2.15 기준)", url: "https://easylaw.go.kr/" },
      { label: "홈택스: 양도소득세 모의계산 및 예정신고", url: "https://www.hometax.go.kr" },
    ],
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
function WarnBox({ title, children }) {
  return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", color: "#C2410C", marginBottom: 6 }}>{title}</strong>
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
    timing: {
      title: "3년 기한 안에 팔아야 한다면",
      color: G, bg: GL,
      text: "신규주택 취득일로부터 3년이에요. 날짜를 잘못 계산해서 비과세를 놓치는 경우가 많아요. 잔금청산일 또는 등기접수일 중 빠른 날이 취득일이에요. 계약일이 아니에요. 아래 체커로 3가지 조건을 먼저 확인해보세요.",
    },
    may9: {
      title: "5월 9일 중과 유예 종료가 걱정된다면",
      color: "#DC2626", bg: "#FEF2F2",
      text: "일시적 2주택 요건을 충족하면 5월 9일 이후에도 비과세가 그대로 유지돼요. 중과 유예 종료와 일시적 2주택 비과세는 별개예요. 비과세 요건을 충족했다면 서두를 필요 없어요. 단, 요건 미충족 상태에서 중과 전에 팔고 싶다면 5월 9일 전에 잔금이 완료돼야 해요.",
    },
    check: {
      title: "비과세 되는지 확인하고 싶다면",
      color: "#7C3AED", bg: "#F5F3FF",
      text: "아래 체커로 3가지 조건을 체크해보세요. 전부 통과하면 양도 후 2개월 이내 홈택스에서 비과세 예정신고를 하면 돼요. 비과세라도 신고 누락 시 무신고가산세(납부세액의 20%)가 부과될 수 있어요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "timing", label: "새 집 샀는데 기존 집을 3년 안에 팔아야 해요." },
          { id: "may9",   label: "5월 9일 중과 유예 전에 팔아야 하는지 모르겠어요." },
          { id: "check",  label: "비과세가 적용되는지 확인하고 싶어요." },
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button onClick={() => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function EligibilityChecker() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const allPass = checked["c1"] && checked["c2"] && checked["c3"];
  const someChecked = Object.values(checked).some(Boolean);

  const conditions = [
    {
      id: "c1",
      label: "종전주택을 취득한 지 1년 이상 지난 뒤에 신규주택을 샀어요",
      sub: "잔금청산일 또는 등기접수일 기준. 계약일이 아니에요",
    },
    {
      id: "c2",
      label: "종전주택을 2년 이상 보유했어요 (조정대상지역 2017.8.3 이후 취득이라면 거주 2년 포함)",
      sub: "현재 조정대상지역: 서울 강남·서초·송파·용산구 4개 구",
    },
    {
      id: "c3",
      label: "신규주택 취득일로부터 3년이 아직 지나지 않았어요",
      sub: "3년 초과 시 비과세 불가. 날짜 계산은 잔금청산일 기준",
    },
  ];

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {conditions.map((c) => (
          <label key={c.id} onClick={() => toggle(c.id)} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px",
            borderRadius: 8, cursor: "pointer",
            border: `1px solid ${checked[c.id] ? G : "#e5e7eb"}`,
            background: checked[c.id] ? GL : "#f9fafb",
          }}>
            <input type="checkbox" checked={!!checked[c.id]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>
              {c.label}
              <span style={{ fontSize: 11, color: "#6b7280", display: "block", marginTop: 3 }}>{c.sub}</span>
            </span>
          </label>
        ))}
      </div>
      {allPass && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          ✅ <strong>3가지 모두 해당돼요.</strong> 일시적 2주택 비과세 요건을 충족해요.<br />
          양도 후 잔금일이 속한 달 말일로부터 2개월 이내에 홈택스에서 예정신고하세요.
        </div>
      )}
      {!allPass && someChecked && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#FEF2F2", fontSize: 13, lineHeight: 1.8 }}>
          <strong style={{ color: "#DC2626" }}>아직 미충족 조건이 있어요.</strong><br />
          3가지 전부 해당해야 비과세가 돼요. 세무사와 상담하세요.
        </div>
      )}
    </div>
  );
}

function SpecialCases() {
  const cases = [
    {
      title: "혼인 합가",
      period: "혼인일로부터 10년 이내",
      desc: "각자 1주택 보유 후 혼인해서 2주택이 된 경우. 먼저 파는 주택이 비과세예요.",
      note: "비과세 기본요건(보유 2년 등)은 충족해야 해요",
    },
    {
      title: "동거봉양 합가",
      period: "합친 날로부터 10년 이내",
      desc: "60세 이상 직계존속(시부모 포함)을 모시기 위해 합가해서 2주택이 된 경우.",
      note: "직계존속 중 한 명만 60세 이상이면 적용돼요",
    },
    {
      title: "상속주택",
      period: "기한 제한 없음",
      desc: "상속주택 + 일반주택 각 1채 보유 시, 일반주택을 먼저 팔면 비과세.",
      note: "상속주택이 2채 이상이면 우선순위 있어요",
    },
    {
      title: "상생임대주택",
      period: "2026년 12월 31일까지",
      desc: "임대료 인상률 5% 이내로 갱신 계약 체결 시 거주요건 면제.",
      note: "세입자가 있어서 거주를 못 했을 때 활용",
    },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0 1.2rem" }}>
      {cases.map((c, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 16px", background: "#fafafa" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{c.title}</p>
          <p style={{ fontSize: 12, color: G, margin: "0 0 6px", fontWeight: 600 }}>{c.period}</p>
          <p style={{ fontSize: 12, color: "#374151", margin: "0 0 6px", lineHeight: 1.6 }}>{c.desc}</p>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{c.note}</p>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = (i) => setOpen((p) => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button onClick={() => toggle(i)} style={{ width: "100%", textAlign: "left", padding: "13px 4px", display: "flex", alignItems: "flex-start", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
            {faq.urgent && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: "#FEE2E2", color: "#DC2626", flexShrink: 0, marginTop: 2, whiteSpace: "nowrap" }}>
                자주 막히는 곳
              </span>
            )}
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", flex: 1, lineHeight: 1.6 }}>{faq.q}</span>
            <span style={{ color: "#9ca3af", fontSize: 16, flexShrink: 0 }}>{open[i] ? "▲" : "▼"}</span>
          </button>
          {open[i] && (
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, padding: "0 4px 14px", margin: 0 }}>{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 같이 보면 도움 되는 글</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", textDecoration: "none", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none" }}>
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
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>양도세 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function TwoHouseTaxPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>부동산 · 양도소득세 · 2주택</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          일시적 2주택 양도세 비과세 조건 |<br />
          3년 처분 기한과 2026년 5월 9일 중과 유예
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          갈아타면서 잠깐 두 채가 됐는데 세금 걱정되시죠.<br />
          조건 3가지만 맞으면 세금 0원이에요.<br /><br />
          5월 9일 중과 유예 종료와 일시적 2주택 비과세는 별개예요. 지금 내 상황부터 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>3가지 조건, 전부 맞아야 비과세예요</H2>
        <p style={body}>
          "일시적으로 두 채가 됐으니까 괜찮겠지"는 틀릴 수 있어요.<br />
          아래 3가지 조건이 전부 충족돼야 비과세가 돼요.
        </p>
        <Bdg>해당되는 거 체크해보세요</Bdg>
        <EligibilityChecker />
        <p style={{ ...body, marginTop: 14 }}>
          가장 많이 걸리는 게 <strong>"종전주택 취득 1년 이상 경과 후 신규 취득"</strong> 조건이에요.<br />
          이를 모르고 넘어간 경우 1억6,100만원을 추가로 낸 사례가 국세청 공개 자료에 있어요.
        </p>
        <GreenBox title="이것만 기억해요">
          ① 종전주택 취득 1년 이상 후 신규 취득 → ② 종전주택 보유 2년 이상 (조정지역은 거주 2년) → ③ 신규주택 취득일로부터 3년 이내 종전주택 양도<br />
          3가지 모두 충족해야 비과세예요.
        </GreenBox>

        <Divider />

        <H2>3년 기한, 날짜 계산이 틀리면 비과세가 날아가요</H2>
        <p style={body}>
          "3년 안에 팔면 된다"고 알고 있지만, 3년의 시작일을 잘못 잡으면 비과세를 놓쳐요.<br />
          시작일은 신규주택의 <strong>잔금청산일</strong>이에요. 계약일이 아니에요.
        </p>
        <BorderBox title="날짜 계산 기준">
          신규주택 취득일 = 잔금청산일 (등기접수일이 빠르면 등기접수일)<br />
          처분기한 = 신규주택 취득일로부터 3년<br /><br />
          예시: 신규주택 잔금 2023년 6월 1일 → 종전주택은 2026년 5월 31일까지 잔금 완료
        </BorderBox>
        <WarnBox title="분양권으로 산 신규주택은 취득일 계산이 달라요">
          분양권 취득 시점이 아니라 실제 준공 후 잔금청산일이 신규주택 취득일이에요.<br />
          같은 단지에 입주했어도 분양권 취득 시점에 따라 3년 기산점이 달라져 비과세 결과가 달라질 수 있어요.
        </WarnBox>

        <Divider />

        <H2>갈아타기 말고 다른 이유로 2주택이 됐다면</H2>
        <p style={body}>
          혼인, 봉양, 상속, 임대 각 상황별로 특례가 따로 있어요.<br />
          내 상황이 어디에 해당하는지 확인해보세요.
        </p>
        <Bdg>상황별 특례 유형</Bdg>
        <SpecialCases />

        <HubLinks />

        <Divider />

        <H2>5월 9일 이후엔 세금이 얼마나 달라지나요?</H2>
        <p style={body}>
          일시적 2주택 비과세 요건을 충족했다면 5월 9일 이후에도 세금 0원이에요.<br />
          요건을 못 충족한 상태에서 5월 10일 이후 조정대상지역 주택을 팔 때 중과가 적용돼요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: GL }}>
                {["구분", "2026.5.9 이전", "2026.5.10 이후 (중과 재개 시)"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["일시적 2주택 (요건 충족)", "비과세", "비과세 (변동 없음)"],
                ["2주택 (조정대상지역)", "기본세율 6~45%", "기본세율 +20%p"],
                ["3주택 (조정대상지역)", "기본세율 6~45%", "기본세율 +30%p"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "9px 10px", color: j === 2 && i > 0 ? "#DC2626" : "#374151", fontWeight: i === 0 && j > 0 ? 700 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <GreenBox title="이것만 기억해요">
          일시적 2주택 요건 충족 = 5월 9일 이후에도 비과세<br />
          요건 미충족 + 조정지역 2주택 + 5월 10일 이후 = 기본세율 +20%p (지방소득세 포함 최고 82.5%)
        </GreenBox>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "이 경우엔 어떻게 되나요?"로 가장 많이 물어보는 것들이에요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>팔기 전에 홈택스에서 먼저 계산해보세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            양도 후 잔금일이 속한 달 말일로부터 2개월 이내에 예정신고해야 해요.<br />
            비과세라도 신고 누락 시 무신고가산세 20%가 부과될 수 있어요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.hometax.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              ↗ 홈택스 양도세 신고
            </a>
            <a href="tel:126" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              📞 국세청 126 상담
            </a>
          </div>
        </div>

        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 개별 사안에 따라 결과가 달라질 수 있으니, 구체적인 상황은 국세청(126) 또는 세무사와 상담하세요.
        </div>
      </div>
    </div>
  );
}
