import { useState } from "react";

// ─── 2026년 기준 (소득세법 §89①3, §95②, 국세청 세액계산요령)
// 비과세 기준: 1세대 1주택 + 보유 2년 이상 + 양도가액 12억원 이하 (소법 §89①3)
// 12억 초과 과세 차익 = 전체 양도차익 × (양도가액 - 12억) / 양도가액
// 장기보유특별공제: 보유 4%/년(최대 40%) + 거주 4%/년(최대 40%) = 최대 80%
// 거주 2년 미충족 시: 보유기간 공제만 최대 30%
// 기본공제: 연 250만원
// 예정신고: 양도일 속하는 달 말일부터 2개월 이내 (소법 §105①)
// 무신고가산세: 납부세액의 20%
// 누진세율: 1,400만원 이하 6% ~ 10억 초과 45% (8단계)
// 지방소득세: 양도소득세의 10%

const SIDEBAR_LINKS = [
  "양도소득세 12억 기준",
  "12억 초과 양도세 계산",
  "1주택 비과세 12억",
  "12억 초과 세금 공식",
  "장기보유특별공제 계산",
  "양도세 계산 방법",
  "1세대 1주택 비과세 조건",
  "양도소득세 세율표 2026",
  "보유기간별 공제율",
  "양도세 기본공제 250만원",
  "조정대상지역 거주요건",
  "양도세 예정신고",
  "무신고가산세 20%",
  "홈택스 양도세 계산",
  "국세청 126 상담",
  "양도소득세 누진세율",
  "고가주택 양도세",
  "12억 초과 비율 계산",
  "부부 공동명의 양도세",
  "양도소득세 필요경비",
];

const HUB_LINKS = [
  { title: "1세대 1주택 양도세 비과세 조건 | 거주기간 요건 2026", desc: "보유 2년·거주 2년 요건 전체 정리", href: "#" },
  { title: "일시적 2주택 양도세 비과세 조건 | 3년 처분 기한", desc: "갈아타면서 2주택 됐을 때 비과세 조건", href: "#" },
  { title: "조정대상지역 거주요건 2026 | 강남 아파트 팔 때", desc: "2017.8.3 이후 취득 주택만 해당", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "12억을 1원이라도 넘으면 전액 과세인가요?",
    a: "아니에요. 가장 많이 하는 오해예요. 12억원을 초과하는 부분에 비례하는 양도차익만 과세돼요. 예를 들어 16억원에 팔았다면 초과금액 4억원을 양도가액 16억원으로 나눈 비율(25%)만큼만 양도차익이 과세돼요. 12억 이하 부분의 이익은 세금이 없어요.",
  },
  {
    urgent: true,
    q: "12억 기준은 취득가액인가요, 양도가액인가요?",
    a: "양도가액(실제로 판 가격) 기준이에요. 취득가액이 아니에요. 10억에 사서 13억에 팔았다면 양도가액 13억이 기준이 돼요. 초과분 1억에 해당하는 비율의 양도차익만 과세돼요.",
  },
  {
    urgent: true,
    q: "10년 보유하고 10년 살면 장기보유특별공제가 80%가 맞나요?",
    a: "맞아요. 1세대 1주택 고가주택의 장기보유특별공제는 보유기간 4%/년(최대 40%) + 거주기간 4%/년(최대 40%)으로 최대 80%예요. 단, 거주요건이 있는 주택은 거주 2년 이상을 충족해야 거주 공제를 받을 수 있어요.",
  },
  {
    urgent: false,
    q: "부부 공동명의로 가지고 있으면 어떻게 계산되나요?",
    a: "공동명의라도 12억 기준 판단은 전체 양도가액 기준이에요. 다만 각 지분별로 과세표준을 따로 계산하기 때문에 누진세율 구간이 낮아지는 효과가 있어요. 예를 들어 각 50%씩 보유하면 각자의 양도소득이 절반으로 나뉘어 낮은 세율이 적용될 수 있어요.",
  },
  {
    urgent: false,
    q: "양도소득세 신고를 언제까지 해야 하나요?",
    a: "양도일이 속하는 달의 말일로부터 2개월 이내에 예정신고·납부해야 해요. 예를 들어 3월 20일에 잔금을 받았다면 5월 31일까지예요. 신고 안 하면 납부세액의 20% 무신고가산세 + 1일 0.022% 납부지연가산세가 붙어요.",
  },
  {
    urgent: false,
    q: "필요경비로 공제받을 수 있는 항목은 뭐가 있나요?",
    a: "취득세(농특세·교육세 포함), 법무사 비용, 중개수수료, 자본적 지출(베란다 확장, 샷시 교체 등)이 해당돼요. 단순 수선비(페인트 칠 등)는 해당 안 돼요. 증빙서류(영수증, 계약서)가 있어야 해요.",
  },
  {
    urgent: false,
    q: "비과세라도 신고를 해야 하나요?",
    a: "네, 신고해야 해요. 비과세를 적용받아도 양도 후 2개월 이내에 홈택스에서 예정신고를 해야 해요. 납부할 세액이 0원이면 가산세가 없지만, 신고 자체는 해두는 게 안전해요.",
  },
  {
    urgent: false,
    q: "양도소득세 세율이 어떻게 되나요?",
    a: "보유 2년 이상 주택은 과세표준에 따른 누진세율 6~45%(8단계)를 적용해요. 지방소득세 10% 별도예요. 1년 미만 보유는 70%, 1~2년 미만은 60%의 단일세율이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제89조 제1항 제3호: 1세대 1주택 비과세", url: "https://www.law.go.kr/" },
      { label: "소득세법 제95조 제2항: 1주택 장기보유특별공제율", url: "https://www.law.go.kr/" },
      { label: "소득세법 시행령 제160조 제1항: 고가주택 양도차익 계산", url: "https://www.law.go.kr/" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 1세대 1주택 비과세 세액계산요령", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=12271&cntntsId=8799" },
      { label: "홈택스: 양도소득세 모의계산", url: "https://www.hometax.go.kr" },
    ],
  },
];

const G  = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}

function H2({ children }) {
  return (
    <h2 style={{
      fontSize: 18,
      fontWeight: 700,
      color: "#111",
      borderLeft: `3px solid ${G}`,
      paddingLeft: 12,
      margin: "0 0 14px",
      lineHeight: 1.5,
    }}>
      {children}
    </h2>
  );
}

function Bdg({ children }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      background: GL,
      color: "#0F6E56",
      marginBottom: 10,
    }}>
      {children}
    </span>
  );
}

function GreenBox({ title, children }) {
  return (
    <div style={{
      background: GL,
      borderRadius: 8,
      padding: "14px 18px",
      margin: "12px 0 1.2rem",
      fontSize: 14,
      lineHeight: 1.95,
      color: GD,
    }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function BorderBox({ title, children }) {
  return (
    <div style={{
      border: "1px solid #9FE1CB",
      borderRadius: 8,
      padding: "14px 18px",
      margin: "12px 0 1.2rem",
      fontSize: 14,
      lineHeight: 1.95,
    }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);

  const messages = {
    sell: {
      title: "12억 넘는 집 팔 예정이라면",
      color: G,
      bg: GL,
      text: "세금이 얼마나 나올지 먼저 알아야 매도 결정을 할 수 있죠. 12억 초과분에만 세금이 붙고, 오래 보유했다면 장기보유특별공제로 대폭 줄어요. 아래 계산기에 집값과 취득가를 넣어보세요.",
    },
    confused: {
      title: "세금이 나왔는데 계산 방법을 모르겠다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "고지서 금액이 왜 그렇게 나왔는지 이해가 안 되시죠. 과세차익 = 전체 양도차익 × (양도가액 - 12억) / 양도가액 이에요. 12억 넘는 비율만큼만 과세돼요. 아래 계산기에 숫자를 넣으면 단계별로 확인할 수 있어요.",
    },
    lth: {
      title: "장기보유특별공제를 얼마나 받는지 모르겠다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "보유기간 4%/년 + 거주기간 4%/년으로 최대 80%예요. 10년 보유하고 10년 살았다면 과세차익의 80%를 공제받아요. 거주 2년 미충족이면 보유기간 공제만 최대 30%로 줄어요. 거주기간이 얼마나 중요한지 아래 계산기로 확인해보세요.",
    },
  };

  if (!type) {
    return (
      <div style={{
        background: "#FFF7ED",
        border: "1px solid #FED7AA",
        borderRadius: 10,
        padding: "16px 18px",
        marginBottom: "1.5rem",
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>
          📌 지금 어떤 상황이에요?
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "sell",     label: "12억 넘는 집을 팔 예정인데 세금이 얼마인지 확인하고 싶어요." },
            { id: "confused", label: "세금 고지서를 받았는데 계산 방법을 모르겠어요." },
            { id: "lth",      label: "장기보유특별공제를 얼마나 받는지 모르겠어요." },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setType(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #FED7AA",
                background: "#fff",
                fontSize: 13,
                color: "#374151",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const m = messages[type];
  return (
    <div style={{
      background: m.bg,
      border: `1px solid ${m.color}40`,
      borderRadius: 10,
      padding: "16px 18px",
      marginBottom: "1.5rem",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button
          onClick={() => setType(null)}
          style={{
            background: "none",
            border: "none",
            fontSize: 12,
            color: "#9ca3af",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          다시 선택
        </button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function TaxCalc() {
  const [saleP, setSaleP] = useState(200000);
  const [buyP,  setBuyP]  = useState(80000);
  const [hold,  setHold]  = useState(10);
  const [resid, setResid] = useState(10);

  const gain        = Math.max(0, saleP - buyP);
  const excessRatio = saleP > 120000 ? (saleP - 120000) / saleP : 0;
  const taxable     = gain * excessRatio;
  const holdRate    = Math.min(hold * 4, 40);
  const residRate   = resid >= 2 ? Math.min(resid * 4, 40) : 0;
  const totalRate   = Math.min(holdRate + residRate, 80);
  const base        = Math.max(0, taxable * (1 - totalRate / 100) - 250);

  const calcTax = (b) => {
    if (b <= 0)     return 0;
    if (b <= 1400)  return b * 0.06;
    if (b <= 5000)  return b * 0.15 - 126;
    if (b <= 8800)  return b * 0.24 - 576;
    if (b <= 15000) return b * 0.35 - 1544;
    if (b <= 30000) return b * 0.38 - 1994;
    if (b <= 50000) return b * 0.40 - 2594;
    if (b <= 100000) return b * 0.42 - 3594;
    return b * 0.45 - 6594;
  };

  const tax = Math.round(calcTax(base) * 1.1);

  const sliders = [
    { label: "양도가액 (만원)", val: saleP, set: setSaleP, min: 50000,  max: 500000, step: 1000, disp: `${saleP.toLocaleString()}만원` },
    { label: "취득가액 (만원)", val: buyP,  set: setBuyP,  min: 10000,  max: 400000, step: 1000, disp: `${buyP.toLocaleString()}만원` },
    { label: "보유기간",        val: hold,  set: setHold,  min: 3,      max: 20,     step: 1,    disp: `${hold}년` },
    { label: "거주기간",        val: resid, set: setResid, min: 0,      max: 15,     step: 1,    disp: resid >= 2 ? `${resid}년` : `${resid}년 (미충족)` },
  ];

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        슬라이더로 내 집값·취득가를 맞추면 바로 세금이 나와요.
      </p>
      {sliders.map((s) => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <label style={{ fontSize: 13, color: "#6b7280", width: 120, flexShrink: 0 }}>
            {s.label}
          </label>
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={s.val}
            onChange={(e) => s.set(+e.target.value)}
            style={{ flex: 1, accentColor: G }}
          />
          <span style={{ fontSize: 12, fontWeight: 700, minWidth: 90, textAlign: "right" }}>
            {s.disp}
          </span>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 16 }}>
        {[
          { label: "전체 양도차익",  val: `${gain.toLocaleString()}만원`,              sub: "" },
          { label: "과세 대상 차익", val: `${Math.round(taxable).toLocaleString()}만원`, sub: `${(excessRatio * 100).toFixed(1)}% 비율` },
          { label: "장기보유공제",   val: `${totalRate}%`,                              sub: `보유${holdRate}%+거주${residRate}%` },
        ].map((item) => (
          <div key={item.label} style={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "12px 14px" }}>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>{item.label}</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: G, margin: "0 0 2px" }}>{item.val}</p>
            {item.sub && <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{item.sub}</p>}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 10,
        padding: "14px 16px",
        borderRadius: 8,
        background: GL,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: GD }}>예상 세금 (지방소득세 포함)</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: G }}>{tax.toLocaleString()}만원</span>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, lineHeight: 1.7 }}>
        ※ 기본공제 250만원 적용. 필요경비 미반영. 실제 세금은 세무사 확인 필요해요.
      </p>
    </div>
  );
}

function LTHTable() {
  const rows = [
    ["3년", "12%", "0%", "12%"],
    ["4년", "16%", "8% (거주 2년 이상)", "24%"],
    ["5년", "20%", "20%", "40%"],
    ["6년", "24%", "24%", "48%"],
    ["7년", "28%", "28%", "56%"],
    ["8년", "32%", "32%", "64%"],
    ["9년", "36%", "36%", "72%"],
    ["10년 이상", "40%", "40%", "최대 80%"],
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: GL }}>
            {["기간", "보유 공제율", "거주 공제율", "합산"].map((h) => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i === 7 ? GL : i % 2 === 0 ? "#fff" : "#fafafa" }}>
              {r.map((cell, j) => (
                <td key={j} style={{ padding: "8px 10px", fontWeight: i === 7 ? 700 : 400, color: j === 3 ? G : "#374151" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>
        ※ 거주 2년 미충족 시 보유 공제만 최대 30% 적용.
      </p>
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
          <button
            onClick={() => toggle(i)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "13px 4px",
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {faq.urgent && (
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 20,
                background: "#FEE2E2",
                color: "#DC2626",
                flexShrink: 0,
                marginTop: 2,
                whiteSpace: "nowrap",
              }}>
                자주 막히는 곳
              </span>
            )}
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", flex: 1, lineHeight: 1.6 }}>
              {faq.q}
            </span>
            <span style={{ color: "#9ca3af", fontSize: 16, flexShrink: 0 }}>
              {open[i] ? "▲" : "▼"}
            </span>
          </button>
          {open[i] && (
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, padding: "0 4px 14px", margin: 0 }}>
              {faq.a}
            </p>
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
          <a
            key={i}
            href={link.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 4px",
              textDecoration: "none",
              borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none",
            }}
          >
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>
                {link.title}
              </span>
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
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>
            {group.category.toUpperCase()}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
              <a
                key={item.label}
                href={item.url}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 12px",
                  borderRadius: 6,
                  border: "1px solid #f3f4f6",
                  background: "#fafafa",
                  fontSize: 13,
                  color: "#374151",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>
                {item.label}
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          양도세 관련 글
        </p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a
            key={i}
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 0",
              fontSize: 12,
              color: "#374151",
              textDecoration: "none",
              borderBottom: "1px solid #f0f0f0",
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Tax12BPage() {
  return (
    <div style={{
      maxWidth: 1060,
      margin: "0 auto",
      padding: "2rem 1.5rem",
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
      color: "#111",
      display: "flex",
      gap: 28,
      alignItems: "flex-start",
    }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>
          부동산 · 양도소득세 · 1주택 비과세
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          양도소득세 비과세 12억원 기준 |<br />
          초과 시 세금 계산 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          집값이 12억을 넘으면 얼마나 세금이 나올지 걱정되셨죠.<br />
          <strong>12억을 넘었다고 전액 과세되는 게 아니에요. 넘는 부분에 해당하는 비율만 과세돼요.</strong><br /><br />
          오래 보유하고 거주했다면 장기보유특별공제로 세금이 훨씬 줄어요. 내 집 세금이 얼마인지 직접 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>12억 초과 시 세금, 계산기로 직접 확인해보세요</H2>
        <p style={body}>
          아래 슬라이더에 내 집값과 취득가액을 맞추면 예상 세금이 바로 나와요.<br />
          보유기간과 거주기간도 바꿔보면 장기보유특별공제가 얼마나 차이 나는지 실감할 수 있어요.
        </p>
        <Bdg>내 집값·취득가·보유기간을 맞춰보세요</Bdg>
        <TaxCalc />
        <p style={body}>
          세금이 생각보다 적게 나왔죠?<br />
          <strong>과세차익 = 전체 양도차익 × (양도가액 - 12억) / 양도가액</strong> — 12억 이하 부분의 이익엔 세금이 없어요.
        </p>

        <Divider />

        <H2>12억 1원 초과면 전액 과세라는 오해, 왜 생겼을까요?</H2>
        <p style={body}>
          "12억 넘었으니 전부 세금"이라고 잘못 알고 매도를 포기한 분들이 있어요.<br />
          실제로는 12억을 넘는 부분에 비례하는 차익만 과세돼요. 아래 예시로 직접 확인해보세요.
        </p>
        <BorderBox title="실제 계산 예시 — 8억에 사서 16억에 팔았을 때">
          전체 양도차익: 16억 - 8억 = 8억원<br />
          초과 비율: (16억 - 12억) / 16억 = 25%<br />
          과세 대상 차익: 8억 × 25% = 2억원 ← 나머지 6억엔 세금 없어요<br />
          10년 보유·거주 장기보유특별공제 80% 적용: 2억 × 20% = 4,000만원<br />
          기본공제 250만원 차감 후 → 예상 세금 약 200만원 (지방소득세 포함)
        </BorderBox>
        <GreenBox title="이것만 기억해요">
          12억 초과 주택 = 전액 과세 (X)<br />
          12억 초과 주택 = 초과분 비율의 양도차익만 과세 (O)<br />
          오래 보유하고 실거주할수록 내야 할 세금이 크게 줄어요.
        </GreenBox>

        <Divider />

        <H2>10년 보유·거주하면 세금이 얼마나 달라지나요?</H2>
        <p style={body}>
          보유·거주 기간 1년마다 공제율이 4%씩 올라가요.<br />
          10년을 채우면 최대 80%까지 공제되고, 세금이 거의 없는 수준이 되기도 해요. 위 계산기에서 직접 바꿔보세요.
        </p>
        <Bdg>보유·거주 기간별 공제율</Bdg>
        <LTHTable />

        <HubLinks />

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "이 경우엔 어떻게 되나요?"로 가장 많이 물어보는 것들이에요. 급한 것부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            팔기 전에 홈택스에서 정확히 계산해보세요
          </p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            양도 후 잔금일이 속한 달 말일로부터 2개월 이내에 예정신고해야 해요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="https://www.hometax.go.kr"
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                background: G,
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              ↗ 홈택스 양도세 모의계산
            </a>
            <a
              href="tel:126"
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                background: "#fff",
                border: `1px solid ${G}`,
                color: G,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              📞 국세청 126 상담
            </a>
          </div>
        </div>

        <Divider />
        <References />

        <div style={{
          marginTop: "1.2rem",
          padding: "14px 18px",
          background: "#f9fafb",
          borderRadius: 10,
          fontSize: 12,
          color: "#9ca3af",
          lineHeight: 1.9,
        }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 개별 사안은 결과가 다를 수 있으니 국세청(126) 또는 세무사와 상담하세요.
        </div>
      </div>
    </div>
  );
}
