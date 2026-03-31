"use client";
import { useState } from "react";

// ─── 2026년 기준 (소득세법 §89①3, 시행령 §154①, §95②, §155의3)
// 1세대 1주택 비과세: 보유 2년 + 양도가액 12억원 이하 (소법 §89①3)
// 조정대상지역 2017.8.3 이후 취득: 보유 2년 + 거주 2년 필요 (소령 §154①)
// 취득일 기준: 잔금청산일 (등기접수일이 빠르면 등기접수일)
// 거주요건: 취득 당시 조정대상지역 여부 기준. 이후 해제돼도 동일 적용
// 거주 인정: 실제 거주 기준. 전입신고만으로 불충분
// 장기보유특별공제 최대 80%: 보유 4%/년(최대 40%) + 거주 4%/년(최대 40%)
// 거주 미충족 시: 보유기간 공제만 최대 30%
// 상생임대주택: 임대료 5% 이내 갱신 시 거주요건 면제 (소령 §155의3, 2026.12.31까지)
// 예정신고: 양도일 속하는 달 말일부터 2개월 이내 (소법 §105①)
// 2026년 현재 조정대상지역: 서울 강남·서초·송파·용산구 4개 구

const SIDEBAR_LINKS = [
  "1세대 1주택 비과세 조건",
  "조정대상지역 거주요건 2026",
  "실거주 2년 증빙 방법",
  "장기보유특별공제 거주기간",
  "전입신고만 하면 비과세 되나요",
  "2017년 8월 3일 이후 취득",
  "보유기간 2년 계산",
  "1세대 1주택 12억 초과",
  "양도소득세 예정신고",
  "세대원 거주요건",
  "일시적 2주택 비과세",
  "상생임대주택 거주요건 면제",
  "양도세 무신고 가산세",
  "취득일 기준 잔금청산일",
  "1주택자 장기보유특별공제",
  "고가주택 양도세 계산",
  "조정대상지역 해제 후 거주요건",
  "비거주자 1세대 1주택",
  "홈택스 양도세 모의계산",
  "국세청 126 양도세 상담",
];

const HUB_LINKS = [
  { title: "일시적 2주택 양도세 비과세 조건 | 3년 처분 기한과 5월 9일 중과 유예", desc: "갈아타면서 2주택 됐을 때 비과세 3가지 조건", href: "#" },
  { title: "양도소득세 비과세 12억 기준 | 초과 시 세금 계산 방법", desc: "12억 넘으면 전액 과세 아닌 이유와 계산 공식", href: "#" },
  { title: "부동산 취득세 계산 2026 | 주택수별 세율표", desc: "조정지역 2주택 8%, 일시적 2주택 특례 적용법", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "전입신고는 했는데 실제로 거의 안 살았어요. 거주요건 인정받나요?",
    a: "안 돼요. 거주요건은 실제 거주가 기준이에요. 전입신고만으로는 인정받지 못해요. 과세당국은 전기·수도 사용량, 신용카드 사용내역, 관리비 납부내역, 우편물 수령주소 등으로 실거주 여부를 확인해요. 전입만 해놓고 실제로 살지 않은 경우 세무조사에서 거부될 수 있어요.",
  },
  {
    urgent: true,
    q: "취득할 때는 조정지역이었는데 지금은 해제됐어요. 거주요건 있나요?",
    a: "있어요. 거주요건은 취득 당시 조정대상지역 여부로 판단해요. 취득 당시 조정지역이었다면 이후 해제돼도 거주 2년을 채워야 비과세예요. 반대로 취득 당시 비조정지역이었다면 이후 지정돼도 거주요건 없이 보유 2년만으로 비과세가 돼요.",
  },
  {
    urgent: true,
    q: "거주 2년을 못 채웠어요. 방법이 없나요?",
    a: "2가지 방법이 있어요. ① 상생임대주택 특례: 임대차 갱신 시 임대료를 직전 계약 대비 5% 이내로 인상하면 거주요건이 면제돼요(2026.12.31까지). ② 부득이한 사유 예외: 취학·근무상 형편·질병 등으로 1년 이상 거주 후 부득이하게 이사한 경우 예외 인정이 가능해요. 정확한 상황은 세무사에게 확인하세요.",
  },
  {
    urgent: false,
    q: "세대원 전원이 거주해야 하나요? 자녀가 학교 때문에 따로 살아요.",
    a: "원칙은 세대원 전원 거주예요. 하지만 취학·근무·질병 등 부득이한 사유로 일부 세대원이 일시 퇴거한 경우, 나머지 세대원이 거주요건을 충족했다면 인정돼요. 자녀 학교 때문에 일시적으로 따로 살았다면 사유를 입증하면 예외 적용이 가능해요.",
  },
  {
    urgent: false,
    q: "거주요건 미충족 시 장기보유특별공제가 얼마나 줄어드나요?",
    a: "거주요건 미충족 시 보유기간 공제(4%/년)만 받을 수 있고 최대 30%예요. 거주 2년 이상 충족 시 보유 공제(최대 40%) + 거주 공제(최대 40%)로 합산 최대 80%까지 받아요. 20억원 아파트 기준으로 이 차이가 수억원에 달할 수 있어요.",
  },
  {
    urgent: false,
    q: "2017년 8월 3일 이전에 취득한 집도 거주요건이 있나요?",
    a: "없어요. 거주요건은 2017.8.3 이후 조정대상지역에서 취득한 주택에만 적용돼요. 그 이전 취득이라면 조정지역이어도 보유 2년만으로 비과세가 가능해요.",
  },
  {
    urgent: false,
    q: "보유기간 2년은 계약일부터 계산하나요?",
    a: "잔금청산일부터예요. 계약일이 아니에요. 잔금일 전에 등기접수가 먼저라면 등기접수일이 취득일이에요. 양도일도 같은 기준으로 잔금청산일이에요.",
  },
  {
    urgent: false,
    q: "비과세라도 신고를 해야 하나요?",
    a: "네, 신고해야 해요. 비과세를 적용받아도 양도 후 잔금일이 속한 달 말일로부터 2개월 이내에 홈택스에서 예정신고를 해야 해요. 신고를 누락하면 무신고가산세(납부세액의 20%)가 부과될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제89조 제1항 제3호: 1세대 1주택 비과세", url: "https://www.law.go.kr/" },
      { label: "소득세법 시행령 제154조 제1항: 보유·거주기간 요건", url: "https://www.law.go.kr/" },
      { label: "소득세법 제95조 제2항: 장기보유특별공제율 표", url: "https://www.law.go.kr/" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 알기쉬운 양도소득세 (2026 기준)", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308" },
      { label: "찾기쉬운 생활법령: 1세대 1주택 양도소득세", url: "https://easylaw.go.kr/" },
      { label: "홈택스: 양도소득세 모의계산 및 예정신고", url: "https://www.hometax.go.kr" },
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

function UrgentBanner() {
  const [type, setType] = useState(null);

  const messages = {
    check: {
      title: "지금 팔려는데 거주요건이 있는지 모르겠다면",
      color: G,
      bg: GL,
      text: "2가지만 확인하세요. 취득 당시 조정대상지역인가, 2017.8.3 이후 취득인가. 둘 다 해당하면 보유 2년 + 거주 2년이 필요해요. 아래 체커로 내 주택이 거주요건 대상인지 먼저 확인해보세요.",
    },
    fake: {
      title: "전입신고는 했는데 실제로 안 살았다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "전입신고만으로는 거주요건이 인정되지 않아요. 과세당국은 전기·수도 사용량, 카드 사용내역, 관리비 납부내역으로 실거주를 확인해요. 임대차 갱신 시 임대료를 5% 이내로 유지하면 거주요건을 면제받을 수 있어요.",
    },
    short: {
      title: "거주 2년을 아직 못 채웠다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "상생임대주택 특례(2026.12.31까지): 임대료 인상 5% 이내 갱신 계약 시 거주요건 전체 면제. 부득이한 사유 예외: 취학·근무·질병으로 1년 이상 거주 후 부득이하게 이사한 경우 인정 가능. 정확한 상황은 세무사와 확인하세요.",
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
            { id: "check", label: "지금 팔려는데 거주요건이 있는지 모르겠어요." },
            { id: "fake",  label: "전입신고는 했는데 실제로 거의 안 살았어요." },
            { id: "short", label: "거주 2년을 아직 못 채웠어요." },
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
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

function ResidenceChecker() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));

  const conditions = [
    {
      id: "a",
      label: "취득 당시 조정대상지역이었어요 (강남·서초·송파·용산 포함)",
      sub: "현재 해제됐어도 취득 당시 기준이에요",
    },
    {
      id: "b",
      label: "2017년 8월 3일 이후에 취득했어요 (잔금청산일 기준)",
      sub: "2017.8.2 이전 잔금이면 거주요건 없어요",
    },
    {
      id: "c",
      label: "실제로 2년 이상 거주했어요",
      sub: "전입신고 + 실거주 흔적(공과금·카드 사용 등)이 있어야 해요",
    },
  ];

  const needsResidence = checked["a"] && checked["b"];
  const allOk = needsResidence && checked["c"];
  const noNeed = checked["a"] === false || (checked["a"] && checked["b"] === false);
  const someChecked = Object.keys(checked).length > 0;

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {conditions.map((c) => (
          <label
            key={c.id}
            onClick={() => toggle(c.id)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer",
              border: `1px solid ${checked[c.id] ? G : "#e5e7eb"}`,
              background: checked[c.id] ? GL : "#f9fafb",
            }}
          >
            <input
              type="checkbox"
              checked={!!checked[c.id]}
              readOnly
              style={{ accentColor: G, marginTop: 3, flexShrink: 0 }}
            />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>
              {c.label}
              <span style={{ fontSize: 11, color: "#6b7280", display: "block", marginTop: 3 }}>
                {c.sub}
              </span>
            </span>
          </label>
        ))}
      </div>
      {allOk && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          ✅ <strong>거주요건 충족.</strong> 비과세 기본 요건(보유 2년 + 12억 이하)도 함께 확인하세요.
        </div>
      )}
      {needsResidence && !checked["c"] && someChecked && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#FEF2F2", fontSize: 13, lineHeight: 1.8 }}>
          <strong style={{ color: "#DC2626" }}>거주 2년 미충족.</strong> 비과세를 받으려면 실거주를 채우거나 상생임대주택 특례를 활용해야 해요.
        </div>
      )}
      {noNeed && someChecked && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          ✅ <strong>거주요건 없어요.</strong> 보유 2년 + 양도가액 12억 이하 충족 시 비과세예요.
        </div>
      )}
    </div>
  );
}

function TaxCompare() {
  const [salePrice, setSalePrice] = useState(200000);
  const [buyPrice,  setBuyPrice]  = useState(80000);
  const [holdYrs,   setHoldYrs]   = useState(10);

  const gain    = Math.max(0, salePrice - buyPrice);
  const taxable = salePrice > 120000 ? gain * (salePrice - 120000) / salePrice : 0;
  const residRate   = Math.min(holdYrs * 8, 80);
  const noResidRate = Math.min(holdYrs * 4, 30);

  const calcTax = (rate) => {
    const base = Math.max(0, taxable * (1 - rate / 100) - 250);
    if (base <= 0)     return 0;
    if (base <= 1400)  return base * 0.06;
    if (base <= 5000)  return base * 0.15 - 126;
    if (base <= 8800)  return base * 0.24 - 576;
    if (base <= 15000) return base * 0.35 - 1544;
    if (base <= 30000) return base * 0.38 - 1994;
    return base * 0.45 - 6594;
  };

  const taxWith    = Math.round(calcTax(residRate) * 1.1);
  const taxWithout = Math.round(calcTax(noResidRate) * 1.1);
  const diff = taxWithout - taxWith;

  const sliders = [
    { label: "양도가액 (만원)", val: salePrice, set: setSalePrice, min: 50000, max: 500000, step: 1000, disp: `${salePrice.toLocaleString()}만원` },
    { label: "취득가액 (만원)", val: buyPrice,  set: setBuyPrice,  min: 10000, max: 400000, step: 1000, disp: `${buyPrice.toLocaleString()}만원` },
    { label: "보유기간",        val: holdYrs,   set: setHoldYrs,   min: 3,     max: 20,     step: 1,    disp: `${holdYrs}년` },
  ];

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        거주요건 충족 여부에 따라 세금이 얼마나 달라지는지 확인해보세요.
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
        <div style={{ background: GL, borderRadius: 8, padding: "14px 16px" }}>
          <p style={{ fontSize: 11, color: GD, margin: "0 0 4px" }}>거주 {holdYrs}년 충족 시</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: G, margin: "0 0 2px" }}>
            {taxWith.toLocaleString()}만원
          </p>
          <p style={{ fontSize: 11, color: GD, margin: 0 }}>장기보유특별공제 {residRate}%</p>
        </div>
        <div style={{ background: "#FEF2F2", borderRadius: 8, padding: "14px 16px" }}>
          <p style={{ fontSize: 11, color: "#DC2626", margin: "0 0 4px" }}>거주 미충족 시</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#DC2626", margin: "0 0 2px" }}>
            {taxWithout.toLocaleString()}만원
          </p>
          <p style={{ fontSize: 11, color: "#DC2626", margin: 0 }}>장기보유특별공제 {noResidRate}%</p>
        </div>
      </div>
      {diff > 0 && (
        <div style={{
          marginTop: 10,
          padding: "10px 14px",
          borderRadius: 8,
          background: "#fff",
          border: `1px solid ${G}`,
          fontSize: 13,
          color: GD,
          textAlign: "center",
        }}>
          거주요건 충족 시 <strong>{diff.toLocaleString()}만원</strong> 절세 (지방소득세 포함 추정)
        </div>
      )}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 12억 초과분에 대한 개략 계산. 기본공제 250만원 적용. 실제 세금은 세무사 확인 필요해요.
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
      <h3 style={{
        fontSize: 15,
        fontWeight: 600,
        color: "#374151",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
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

export default function OneHouseTaxPage() {
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
          부동산 · 1세대 1주택 · 양도소득세
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          1세대 1주택 양도세 비과세 조건 |<br />
          거주기간 요건과 조정대상지역 기준 2026
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          집 한 채인데 세금이 나온다는 말을 들었다면 거주요건 때문이에요.<br />
          <strong>조정대상지역에서 2017.8.3 이후 샀다면 보유 2년으로는 부족해요. 실거주 2년이 더 필요해요.</strong><br /><br />
          "전입신고 했으니까 괜찮겠지"는 틀릴 수 있어요. 지금 내 상황을 먼저 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>거주기간 2년, 전입신고만 해서는 안 되는 이유</H2>
        <p style={body}>
          거주요건 대상인지 아닌지부터 확인해야 해요.<br />
          취득 당시 조정대상지역 + 2017.8.3 이후 취득, 이 2가지가 모두 해당할 때만 실거주 2년이 필요해요.
        </p>
        <Bdg>내 주택에 거주요건이 있는지 체크해보세요</Bdg>
        <ResidenceChecker />
        <p style={{ ...body, marginTop: 14 }}>
          거주요건은 주민등록 전입이 아니라 <strong>실제 거주</strong>가 기준이에요.<br />
          과세당국은 전기·수도 사용량, 카드 사용내역, 관리비 납부내역으로 실거주를 확인해요.
        </p>
        <GreenBox title="이것만 기억해요">
          취득 당시 조정대상지역 + 2017.8.3 이후 취득 = 보유 2년 + 거주 2년 필요<br />
          이 두 조건 중 하나라도 아니라면 거주요건 없이 보유 2년만 충족해도 돼요.
        </GreenBox>

        <Divider />

        <H2>거주 2년 못 채우면 세금이 얼마나 달라지나요?</H2>
        <p style={body}>
          보유기간을 채워도 거주요건 미충족 시 장기보유특별공제가 크게 줄어요.<br />
          아래 계산기로 내 상황에서 실제 차이를 확인해보세요.
        </p>
        <Bdg>거주 충족/미충족 세금 직접 비교</Bdg>
        <TaxCompare />
        <GreenBox title="거주 공제 차이가 이렇게 커요">
          거주 2년 충족: 보유 공제(최대 40%) + 거주 공제(최대 40%) = 최대 80%<br />
          거주 2년 미충족: 보유 공제만 최대 30%<br />
          20억원 아파트 기준으로 이 차이가 수억원에 달할 수 있어요.
        </GreenBox>

        <Divider />

        <H2>조정대상지역 기준, 이 경우엔 거주요건이 없어요</H2>
        <p style={body}>
          조정지역 취득이어도 아래 경우엔 거주요건이 적용되지 않거나 면제돼요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0 1.2rem" }}>
          {[
            {
              title: "2017.8.3 이전 취득",
              badge: "거주요건 없음",
              bc: G,
              desc: "잔금청산일 기준. 조정지역이어도 보유 2년만으로 비과세.",
            },
            {
              title: "비조정지역 취득",
              badge: "거주요건 없음",
              bc: G,
              desc: "취득 당시 비조정지역이었다면 이후 지정돼도 거주요건 없음.",
            },
            {
              title: "상생임대주택",
              badge: "거주요건 면제 (2026.12.31까지)",
              bc: "#7C3AED",
              desc: "임대료 5% 이내 갱신 계약 체결 시 거주요건 전체 면제.",
            },
            {
              title: "부득이한 사유",
              badge: "1년 이상 거주 후 양도",
              bc: "#7C3AED",
              desc: "취학·근무·질병 등으로 부득이하게 이사한 경우 예외 인정.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 16px", background: "#fafafa" }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>
                {item.title}
              </p>
              <span style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 12,
                background: item.bc + "15",
                color: item.bc,
                marginBottom: 8,
              }}>
                {item.badge}
              </span>
              <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <HubLinks />

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          거주요건 관련해서 가장 많이 헷갈리는 것들이에요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            팔기 전에 홈택스에서 먼저 계산해보세요
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
              ↗ 홈택스 양도세 신고
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
