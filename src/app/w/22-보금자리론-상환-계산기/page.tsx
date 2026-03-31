"use client";
import { useState } from "react";

// ─── 2026년 3월 1일 HF 공시 기준
// 아낌e-보금자리론 금리: 10년 4.05%, 15년 4.15%, 20년 4.20%, 30년 4.20%, 40년 4.30%, 50년 4.35%
// 우대금리 최대 1.0%p → 저소득·청년·신혼·사회적배려층 적용
// 소득 기준: 부부합산 7,000만원 이하
//   신혼(혼인 7년 이내): 8,500만원 / 미성년 자녀 1명: 9,000만원 / 다자녀(3명 이상): 1억원
// 주택가격: 6억원 이하
// LTV: 70% (생애최초 80%)
// 최대 한도: 3.6억원 (생애최초 4.2억원)
// 상환방식: 원리금균등 / 원금균등(체감식) / 체증식(만 40세 미만)
// 만기: 10·15·20·30·40·50년
// 중도상환수수료: 3년 이내 0.5% 한도 (잔여일수 비례)
// 1주택자: 3년 이내 처분 약정 시 신청 가능
// 기금대출(디딤돌 등)과 동시 이용 불가

const SIDEBAR_LINKS = [
  "보금자리론 2026 금리",
  "보금자리론 신청 조건",
  "보금자리론 월 납입액",
  "원리금균등 원금균등 차이",
  "보금자리론 소득 기준",
  "보금자리론 한도",
  "보금자리론 우대금리",
  "보금자리론 LTV",
  "생애최초 보금자리론",
  "신혼부부 보금자리론",
  "보금자리론 중도상환",
  "1주택자 보금자리론",
  "체증식 상환 방식",
  "보금자리론 만기",
  "보금자리론 vs 디딤돌",
  "보금자리론 사전심사",
  "보금자리론 서류",
  "HF 한국주택금융공사",
  "보금자리론 주택가격",
  "보금자리론 처분 약정",
];

const HUB_LINKS = [
  { title: "디딤돌 대출 2026 조건 | 소득 기준과 금리 비교", desc: "무주택자 우선. 보금자리론과 선택 기준 정리", href: "#" },
  { title: "주택담보대출 금리 비교 | 시중은행 vs 정책 대출", desc: "2026년 3월 기준 금리 비교표", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "2026년 3월 현재 금리가 얼마인가요?",
    a: "2026년 3월 1일 공시 기준으로 10년 연 4.05%, 30년 연 4.20%, 50년 연 4.35%예요. 저소득·청년·신혼·사회적배려층은 우대금리 최대 1.0%p가 적용돼 최저 3.05%까지 낮아질 수 있어요. 금리는 매달 공시되니 신청 전에 HF 홈페이지에서 확인하세요.",
  },
  {
    urgent: true,
    q: "소득이 7,000만원을 넘는데 신청이 아예 안 되나요?",
    a: "상황에 따라 가능해요. 신혼(혼인 7년 이내)은 8,500만원, 미성년 자녀 1명은 9,000만원, 다자녀(3명 이상)는 1억원까지 허용돼요. 기본 기준을 넘더라도 가구 상황에 따라 달라지니 HF 홈페이지에서 먼저 확인해보세요.",
  },
  {
    urgent: true,
    q: "원리금균등과 원금균등 중 어느 걸 선택해야 하나요?",
    a: "매달 같은 금액이 편하다면 원리금균등, 이자를 아끼고 싶다면 원금균등이에요. 원금균등은 초기 납입이 가장 많고 갈수록 줄어들어요. 총 이자는 원금균등이 더 적어요. 위 계산기에서 두 방식을 직접 비교해보면 차이가 바로 나와요.",
  },
  {
    urgent: false,
    q: "체증식 상환은 어떤 경우에 선택하나요?",
    a: "만 40세 미만만 선택 가능해요. 초기 납입이 적고 시간이 지날수록 늘어나요. 취업 초기나 소득이 앞으로 늘어날 예정일 때 유리해요. 다만 총 이자 부담은 세 가지 방식 중 가장 커요.",
  },
  {
    urgent: false,
    q: "1주택자도 신청할 수 있나요?",
    a: "가능해요. 기존 주택을 3년 이내에 처분한다는 약정을 체결하면 신청할 수 있어요. 약정 기간 내 처분하지 못하면 기한의 이익이 상실돼 즉시 전액 상환해야 하니 매도 일정을 먼저 확인하세요.",
  },
  {
    urgent: false,
    q: "3년 이내에 갚으면 수수료가 얼마인가요?",
    a: "최초 실행일로부터 3년 이내 중도상환 시 잔여일수에 비례해 최대 0.5% 수수료가 붙어요. 3년이 지나면 수수료가 없어요. 사회적배려층 우대금리 대상자는 면제예요.",
  },
  {
    urgent: false,
    q: "보금자리론과 디딤돌 대출 중 뭐가 더 유리한가요?",
    a: "디딤돌 자격이 된다면 디딤돌을 먼저 검토하세요. 디딤돌은 주택가격 5억원 이하, 소득 6,000만원 이하(생애최초 7,000만원)로 기준이 좁지만 금리가 더 낮은 경우가 많아요. 두 대출을 동시에 이용할 수는 없어요.",
  },
  {
    urgent: false,
    q: "6억원을 넘는 집은 신청 자체가 안 되나요?",
    a: "안 돼요. 주택가격이 6억원을 초과하면 보금자리론을 이용할 수 없어요. 최대 한도도 3.6억원(생애최초 4.2억원)이라는 점도 함께 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "HF 한국주택금융공사: 보금자리론 금리 공시 (2026.3.1)", url: "https://www.hf.go.kr/ko/sub01/sub01_01_04.do" },
      { label: "HF 한국주택금융공사: 보금자리론 상품 안내", url: "https://www.hf.go.kr" },
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
    apply: {
      title: "보금자리론 신청하려는 분이라면",
      color: G,
      bg: GL,
      text: "3가지를 먼저 확인하세요. 주택가격 6억원 이하인지, 부부합산 소득이 7,000만원 이하인지(신혼·다자녀 예외), 무주택자 또는 3년 내 처분 약정이 가능한지. 조건이 맞으면 아래 계산기로 월 납입액을 먼저 확인해보세요.",
    },
    method: {
      title: "원리금균등과 원금균등 중 뭘 골라야 할지 모르겠다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "아래 계산기에서 두 방식을 나란히 비교해볼 수 있어요. 월 납입액 차이와 총 이자 차이를 직접 확인하면 선택이 쉬워져요. 초기 납입이 부담된다면 원리금균등, 이자를 줄이고 싶다면 원금균등이에요.",
    },
    income: {
      title: "소득이 기준을 넘을 것 같아 걱정이라면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "신혼(혼인 7년 이내)은 8,500만원, 미성년 자녀 1명이면 9,000만원, 다자녀(3명 이상)는 1억원까지 허용돼요. 기본 기준을 넘더라도 포기하지 말고 HF에서 먼저 확인해보세요.",
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
            { id: "apply",  label: "보금자리론을 신청하려는데 자격이 되는지 확인하고 싶어요." },
            { id: "method", label: "원리금균등과 원금균등 중 어느 방식을 선택할지 모르겠어요." },
            { id: "income", label: "소득이 기준보다 조금 높을 것 같아 걱정이에요." },
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

function PaymentCalc() {
  const [principal, setPrincipal] = useState(30000);
  const [rate,      setRate]      = useState(4.20);
  const [years,     setYears]     = useState(30);
  const [method,    setMethod]    = useState("equal");

  const r = rate / 100 / 12;
  const n = years * 12;
  const P = principal * 10000;

  const equalPay = r > 0
    ? Math.round(P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
    : Math.round(P / n);

  const firstDecr = Math.round(P / n + P * r);

  const totalIntEqual = Math.round((equalPay * n - P) / 10000);
  const totalIntDecr  = Math.round((P * r * (n + 1) / 2) / 10000);

  const fmt = (v) => `${Math.round(v / 10000).toLocaleString()}만원`;

  const rates = [
    { v: 4.05, l: "4.05% (10년)" },
    { v: 4.20, l: "4.20% (30년)" },
    { v: 4.35, l: "4.35% (50년)" },
  ];

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
          대출금액 (만원)
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="range"
            min={5000}
            max={42000}
            step={500}
            value={principal}
            onChange={(e) => setPrincipal(+e.target.value)}
            style={{ flex: 1, accentColor: G }}
          />
          <span style={{ fontSize: 12, fontWeight: 700, color: G, minWidth: 80, textAlign: "right" }}>
            {principal.toLocaleString()}만원
          </span>
        </div>
        {principal > 36000 && (
          <p style={{ fontSize: 11, color: "#DC2626", marginTop: 2 }}>
            ※ 일반 최대 3.6억, 생애최초 최대 4.2억이에요.
          </p>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
          금리 선택 (2026.3.1 공시)
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {rates.map(({ v, l }) => (
            <button
              key={v}
              onClick={() => setRate(v)}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                border: `1px solid ${rate === v ? G : "#e5e7eb"}`,
                background: rate === v ? GL : "#fff",
                fontSize: 12,
                fontWeight: rate === v ? 700 : 400,
                cursor: "pointer",
                color: rate === v ? GD : "#374151",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>만기</p>
        <div style={{ display: "flex", gap: 6 }}>
          {[10, 20, 30, 40, 50].map((y) => (
            <button
              key={y}
              onClick={() => setYears(y)}
              style={{
                flex: 1,
                padding: "6px 0",
                borderRadius: 8,
                border: `1px solid ${years === y ? G : "#e5e7eb"}`,
                background: years === y ? GL : "#fff",
                fontSize: 12,
                fontWeight: years === y ? 700 : 400,
                cursor: "pointer",
                color: years === y ? GD : "#374151",
              }}
            >
              {y}년
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>상환 방식</p>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ v: "equal", l: "원리금균등" }, { v: "decr", l: "원금균등" }].map(({ v, l }) => (
            <button
              key={v}
              onClick={() => setMethod(v)}
              style={{
                flex: 1,
                padding: "9px 0",
                borderRadius: 8,
                border: `1px solid ${method === v ? G : "#e5e7eb"}`,
                background: method === v ? GL : "#fff",
                fontSize: 12,
                fontWeight: method === v ? 700 : 400,
                cursor: "pointer",
                color: method === v ? GD : "#374151",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: GL, borderRadius: 8, padding: "14px 16px" }}>
          <p style={{ fontSize: 11, color: GD, margin: "0 0 4px" }}>
            {method === "equal" ? "매월 납입액 (동일)" : "첫달 납입액 (이후 감소)"}
          </p>
          <p style={{ fontSize: 20, fontWeight: 700, color: G, margin: "0 0 2px" }}>
            {method === "equal" ? fmt(equalPay) : fmt(firstDecr)}
          </p>
          <p style={{ fontSize: 11, color: GD, margin: 0 }}>
            총 이자 {method === "equal" ? totalIntEqual.toLocaleString() : totalIntDecr.toLocaleString()}만원
          </p>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px", border: "1px solid #e5e7eb" }}>
          <p style={{ fontSize: 11, color: "#374151", margin: "0 0 4px" }}>
            비교 ({method === "equal" ? "원금균등 첫달" : "원리금균등 매달"})
          </p>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#374151", margin: "0 0 2px" }}>
            {method === "equal" ? fmt(firstDecr) : fmt(equalPay)}
          </p>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
            총 이자 {method === "equal" ? totalIntDecr.toLocaleString() : totalIntEqual.toLocaleString()}만원
          </p>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, lineHeight: 1.7 }}>
        ※ 단리 계산. 실제 납입액은 HF 홈페이지 사전심사 결과와 다를 수 있어요.
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
        이 글은 2026년 3월 1일 HF 공시 기준이에요. 금리는 변동될 수 있으니 신청 전 HF 공식 사이트에서 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          보금자리론 관련 글
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

export default function BogeumjarilonPage() {
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
          정책 대출 · 보금자리론 · 금리 2026
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          2026 보금자리론 상환 계산기 |<br />
          원리금균등·원금균등 월 납입액 바로 확인
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          집을 사려는데 매달 얼마씩 내야 할지 막막하셨죠.<br />
          <strong>아래 계산기에 대출금액과 만기를 넣으면 원리금균등·원금균등 납입액을 바로 비교할 수 있어요.</strong><br /><br />
          2026년 3월 1일 공시 기준 금리는 30년 기준 연 4.20%예요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>월 납입액 계산기로 바로 확인해보세요</H2>
        <p style={body}>
          대출금액·금리·만기·상환방식을 바꿔보면서 내 상황에 맞는 조건을 찾아보세요.<br />
          원리금균등과 원금균등을 나란히 비교할 수 있어요.
        </p>
        <Bdg>대출금액·금리·만기를 맞춰보세요</Bdg>
        <PaymentCalc />
        <GreenBox title="이것만 기억해요">
          원리금균등: 매달 같은 금액 → 예산 계획 세우기 쉬워요<br />
          원금균등: 초기 납입이 많고 갈수록 줄어요 → 총 이자가 적어요<br />
          소득이 안정적이면 원리금균등, 초기 여유가 있다면 원금균등이 유리해요.
        </GreenBox>

        <Divider />

        <H2>원리금균등과 원금균등, 어느 게 유리한가요?</H2>
        <p style={body}>
          "어느 게 낫나요?"라고 많이 물어보시는데, 상황에 따라 달라요.<br />
          두 방식의 핵심 차이를 먼저 파악하면 선택이 쉬워져요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0 1.2rem" }}>
          {[
            {
              title: "원리금균등",
              tag: "안정형",
              tagColor: G,
              pros: "매달 같은 금액 → 생활비 계획 세우기 쉬워요",
              cons: "총 이자 부담이 원금균등보다 많아요",
              for: "소득이 안정적이고 예측 가능한 지출을 원할 때",
            },
            {
              title: "원금균등 (체감식)",
              tag: "절약형",
              tagColor: "#7C3AED",
              pros: "총 이자가 적어요 → 상환할수록 월 납입 감소",
              cons: "첫달 납입이 가장 많아요",
              for: "초기 부담을 견딜 수 있고 이자를 아끼고 싶을 때",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 16px", background: "#fafafa" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: 0 }}>{item.title}</p>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 12,
                  background: item.tagColor + "15",
                  color: item.tagColor,
                }}>
                  {item.tag}
                </span>
              </div>
              <p style={{ fontSize: 12, color: G, margin: "0 0 4px" }}>✓ {item.pros}</p>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 8px" }}>△ {item.cons}</p>
              <p style={{ fontSize: 11, color: "#374151", margin: 0, lineHeight: 1.6 }}>{item.for}</p>
            </div>
          ))}
        </div>

        <HubLinks />

        <Divider />

        <H2>보금자리론 신청 자격이 안 되는 경우도 있어요</H2>
        <p style={body}>
          기대하고 신청했다가 거절되면 당황스럽죠.<br />
          아래 조건 중 하나라도 해당하면 신청 자체가 안 되니, 먼저 확인해보세요.
        </p>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 2.0 }}>
          <p style={{ fontWeight: 700, marginBottom: 8, color: "#111" }}>신청 불가 주요 조건</p>
          {[
            "주택가격 6억원 초과",
            "기금대출(디딤돌, 버팀목 등)과 동시 이용",
            "부부합산 소득 7,000만원 초과 (신혼·다자녀 예외 있음)",
            "2주택 이상 보유 (1주택자는 3년 내 처분 약정 가능)",
            "DTI(총부채상환비율) 초과",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
              <span style={{ color: "#DC2626", fontWeight: 700, flexShrink: 0 }}>✗</span>
              <span style={{ fontSize: 13, color: "#374151" }}>{item}</span>
            </div>
          ))}
        </div>

        <Divider />

        <H2>자주 막히는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 경우엔 되나요?"로 가장 많이 물어보는 것들이에요. 급한 것부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            HF 홈페이지에서 사전심사 받으세요
          </p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            자격 여부와 정확한 금리는 신청 전에 HF 사전심사로 먼저 확인할 수 있어요.
          </p>
          <a
            href="https://www.hf.go.kr"
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              background: G,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            ↗ HF 한국주택금융공사
          </a>
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
          이 글은 2026년 3월 1일 HF 공시 기준이에요. 금리는 변동될 수 있으니 신청 전 HF 공식 사이트에서 확인하세요.
        </div>
      </div>
    </div>
  );
}
