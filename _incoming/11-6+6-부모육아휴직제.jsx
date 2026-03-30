import { useState } from "react";

// ─── 2026년 기준 (고용보험법 §75①, 고용부 고시)
// 6+6 부모육아휴직제 (2024.1.1 시행):
//   부모 모두 육아휴직 사용 시 각자 첫 6개월 급여 인상
//   동시 사용 및 순차 사용 모두 가능
// 급여 상한액 (6+6 적용 시):
//   1개월차: 200만원 (통상임금 100%, 상한 200만원)
//   2개월차: 250만원
//   3개월차: 300만원
//   4개월차: 350만원
//   5개월차: 400만원
//   6개월차: 450만원
// 일반 육아휴직 급여:
//   첫 3개월: 통상임금 80% (상한 150만원)
//   4개월~: 통상임금 50% (상한 120만원)
// 적용 조건:
//   ① 같은 자녀에 대해 부모 모두 육아휴직 사용
//   ② 두 번째 사용자의 휴직 시작일이 2024.1.1 이후
//   ③ 두 번째 사용자 기준으로 6개월 급여 인상 적용
// 사후지급: 급여의 25%는 복직 후 6개월 이상 근무 후 지급
// 신청처: 거주지 관할 고용센터 또는 고용보험 사이트(ei.go.kr)

const SALARY_TABLE = [
  { month: "1개월차", upper: 200, rate: "통상임금 100%" },
  { month: "2개월차", upper: 250, rate: "통상임금 100%" },
  { month: "3개월차", upper: 300, rate: "통상임금 100%" },
  { month: "4개월차", upper: 350, rate: "통상임금 100%" },
  { month: "5개월차", upper: 400, rate: "통상임금 100%" },
  { month: "6개월차", upper: 450, rate: "통상임금 100%" },
];

const SIDEBAR_LINKS = [
  "6+6 부모육아휴직제 조건",
  "6+6 육아휴직 급여 계산",
  "부모 동시 육아휴직",
  "순차 육아휴직 6+6",
  "6+6 급여 상한액",
  "두 번째 육아휴직 급여",
  "육아휴직 급여 200만원",
  "육아휴직 급여 450만원",
  "2024 육아휴직 개편",
  "6+6 신청 방법",
  "6+6 공무원 적용",
  "6+6 소급 적용",
  "사후지급 25%",
  "육아휴직 통상임금 100%",
  "고용보험 육아휴직 급여",
  "육아휴직 동시 신청",
  "남성 육아휴직 6+6",
  "육아휴직 급여 상한",
  "ei.go.kr 육아휴직 신청",
  "고용센터 육아휴직",
];

const HUB_LINKS = [
  { title: "출산전후휴가 대체인력 지원금 | 육아휴직 연계 신청", desc: "사업주 지원금 신청 조건과 서류 정리", href: "#" },
  { title: "남성 육아휴직 인센티브 | 2026 지원금 조건", desc: "아빠 육아휴직 시 추가 지원금 받는 법", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "동시에 휴직을 써야 6+6이 적용되나요?",
    a: "아니에요. 동시 사용과 순차 사용 모두 가능해요. 부모 중 한 명이 먼저 육아휴직을 쓰고, 나중에 다른 한 명이 사용해도 돼요. 두 번째 사용자의 휴직 시작일이 2024년 1월 1일 이후이기만 하면 6+6이 적용돼요.",
  },
  {
    urgent: true,
    q: "두 번째 사람이 아직 신청 안 했어요. 첫 번째 사람 급여에 소급 적용되나요?",
    a: "돼요. 두 번째 사용자가 나중에 육아휴직을 시작하면, 첫 번째 사용자의 급여도 소급해서 인상분이 지급돼요. 두 번째가 신청할 때 첫 번째 사용자도 함께 정산 신청하면 차액을 받을 수 있어요.",
  },
  {
    urgent: true,
    q: "두 번째 사용자 기준이란 게 무슨 뜻인가요?",
    a: "부모 중 나중에 육아휴직을 시작한 사람 기준으로 6개월 급여 인상이 적용돼요. 두 번째 사용자의 휴직 시작월을 1개월차로 계산해요. 첫 번째 사용자도 두 번째가 사용한 기간만큼 소급해서 인상 급여를 받아요.",
  },
  {
    urgent: false,
    q: "부모 중 한 명이 공무원이에요. 6+6이 적용되나요?",
    a: "공무원·교원은 별도 법령(공무원보수규정 등)으로 운영되기 때문에 고용보험법의 6+6 부모육아휴직제가 직접 적용되지 않아요. 다만 공무원도 별도의 유사한 제도가 있으니 소속 기관 인사담당자에게 확인하세요.",
  },
  {
    urgent: false,
    q: "사후지급 25%가 뭔가요?",
    a: "육아휴직 급여의 25%는 복직 후 6개월 이상 근무한 뒤에 한꺼번에 지급돼요. 복직 후 6개월 이내에 퇴사하면 받지 못해요. 6+6 인상 급여에도 동일하게 적용돼요.",
  },
  {
    urgent: false,
    q: "6+6을 2024년 이전에 시작한 육아휴직에도 적용할 수 있나요?",
    a: "두 번째 사용자의 휴직 시작일이 2024년 1월 1일 이후여야 해요. 첫 번째 사용자가 2023년에 시작했어도, 두 번째가 2024년 이후에 시작하면 적용돼요. 두 번째 기준일이 핵심이에요.",
  },
  {
    urgent: false,
    q: "통상임금이 상한액보다 낮으면 어떻게 되나요?",
    a: "통상임금의 100%를 지급해요. 예를 들어 통상임금이 월 180만원이라면 1개월차 상한 200만원에 관계없이 180만원을 받아요. 상한액은 최대 금액이고, 실제 급여는 통상임금과 상한 중 낮은 금액이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제75조 제1항: 육아휴직 급여 (6+6)", url: "https://www.law.go.kr/" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용보험 사이트 (ei.go.kr): 육아휴직 급여 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 6+6 부모육아휴직제 안내", url: "https://www.moel.go.kr" },
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
    calc: {
      title: "6+6을 쓰면 급여가 얼마인지 궁금하다면",
      color: G,
      bg: GL,
      text: "아래 계산기에 통상임금을 입력하면 월별 예상 급여가 바로 나와요. 1개월차 최대 200만원부터 6개월차 최대 450만원까지 단계별로 올라가요.",
    },
    order: {
      title: "순서나 동시 사용 조건이 헷갈린다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "동시 사용과 순차 사용 모두 가능해요. 핵심은 두 번째 사용자의 휴직 시작일이 2024년 1월 1일 이후여야 한다는 것이에요. 첫 번째가 언제 시작했든 상관없어요.",
    },
    retro: {
      title: "이미 첫 번째가 육아휴직 중인데 소급이 되나요?",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "돼요. 두 번째 사용자가 2024년 이후에 시작하면 첫 번째 사용자 급여도 소급해서 인상분이 지급돼요. 두 번째가 신청할 때 함께 정산 신청하면 차액을 받을 수 있어요.",
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
            { id: "calc",  label: "6+6을 쓰면 급여가 얼마인지 계산해보고 싶어요." },
            { id: "order", label: "동시 사용해야 하는지, 순차 사용도 되는지 헷갈려요." },
            { id: "retro", label: "배우자가 이미 육아휴직 중인데 내가 쓰면 소급이 되나요?" },
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

function SalaryCalc() {
  const [wage, setWage] = useState(300);

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        통상임금을 입력하면 6+6 적용 시 월별 예상 급여가 나와요.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <label style={{ fontSize: 13, color: "#6b7280", width: 100, flexShrink: 0 }}>
          통상임금 (만원)
        </label>
        <input
          type="range"
          min={100}
          max={600}
          step={10}
          value={wage}
          onChange={(e) => setWage(+e.target.value)}
          style={{ flex: 1, accentColor: G }}
        />
        <span style={{ fontSize: 12, fontWeight: 700, minWidth: 70, textAlign: "right" }}>
          {wage}만원
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {SALARY_TABLE.map((row, i) => {
          const actual = Math.min(wage, row.upper);
          return (
            <div
              key={i}
              style={{
                background: actual >= row.upper ? GL : "#fff",
                border: `1px solid ${actual >= row.upper ? G : "#e5e7eb"}`,
                borderRadius: 8,
                padding: "10px 12px",
              }}
            >
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>{row.month}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: G, margin: "0 0 1px" }}>
                {actual}만원
              </p>
              <p style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>
                상한 {row.upper}만원
              </p>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 실제 급여 = min(통상임금, 상한액). 사후지급 25% 별도. 고용보험 가입 기간 등 조건 충족 시.
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
        이 글은 2026년 3월 기준 고용보험법 등을 바탕으로 작성됐어요. 지원 기준은 변경될 수 있으니 고용센터에서 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          육아휴직 관련 글
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

export default function ParentalLeave66Page() {
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
          고용보험 · 육아휴직 · 6+6 부모육아휴직제
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          육아휴직 급여 6+6 부모육아휴직제 |<br />
          신청 조건과 월별 금액 계산
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          부부가 같이 육아휴직을 쓰면 급여가 더 나온다는 얘기를 들으셨죠.<br />
          <strong>2024년 1월부터 부모 모두 육아휴직을 쓰면 각자 첫 6개월 급여가 최대 450만원까지 올라가요.</strong><br /><br />
          동시에 써야만 되는 게 아니에요. 순차 사용도 가능하고, 소급 적용도 돼요. 지금 내 상황을 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>6+6 적용 시 월별 급여, 직접 계산해보세요</H2>
        <p style={body}>
          내 통상임금을 입력하면 1~6개월차 예상 급여가 바로 나와요.<br />
          상한액보다 통상임금이 낮다면 통상임금의 100%를 받아요.
        </p>
        <Bdg>통상임금을 입력해보세요</Bdg>
        <SalaryCalc />
        <GreenBox title="일반 육아휴직 급여와 얼마나 차이나요?">
          일반 육아휴직: 첫 3개월 통상임금 80% (상한 150만원), 이후 50% (상한 120만원)<br />
          6+6 부모육아휴직: 1~6개월 통상임금 100% (상한 200만원~450만원)<br />
          통상임금 300만원 기준: 일반 150만원 → 6+6 300만원 (두 배)
        </GreenBox>

        <Divider />

        <H2>동시에 써야만 6+6이 되나요? 순차 사용도 되나요?</H2>
        <p style={body}>
          동시에 써야만 된다고 알고 있다가 포기하는 경우가 많아요.<br />
          아니에요. 순차 사용도 가능하고, 핵심은 두 번째 사용자 기준일 뿐이에요.
        </p>
        <div style={{ margin: "12px 0 1.2rem" }}>
          {[
            {
              num: "①",
              title: "같은 자녀에 대해 부모 모두 육아휴직 사용",
              desc: "동시 또는 순차 모두 가능해요. 부모 중 한 명이 먼저 써도 돼요.",
              color: G,
            },
            {
              num: "②",
              title: "두 번째 사용자의 휴직 시작일이 2024년 1월 1일 이후",
              desc: "첫 번째가 2023년에 시작해도 두 번째가 2024년 이후면 적용돼요.",
              color: G,
            },
            {
              num: "③",
              title: "두 번째 사용자 기준으로 1~6개월차 급여 인상",
              desc: "첫 번째 사용자도 소급해서 인상분을 받아요. 두 번째 신청 시 함께 정산해요.",
              color: G,
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: i % 2 === 0 ? "#fafafa" : "#fff",
                marginBottom: 8,
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: item.color,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {item.num}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <HubLinks />

        <Divider />

        <H2>배우자가 아직 안 썼어요. 지금 내가 쓰면 나중에 소급이 되나요?</H2>
        <p style={body}>
          가장 많이 물어보는 질문이에요.<br />
          결론부터 말하면, 돼요. 지금 먼저 써도 나중에 배우자가 쓰면 내 급여에 소급 적용돼요.
        </p>
        <div style={{ margin: "12px 0 1.2rem" }}>
          {[
            { step: "내가 먼저 육아휴직 시작", desc: "일반 육아휴직 급여(80%)로 우선 지급돼요.", color: "#9ca3af" },
            { step: "배우자가 2024.1.1 이후 육아휴직 시작", desc: "이 시점에 6+6 적용 조건이 충족돼요.", color: G },
            { step: "배우자 신청 시 내 급여도 함께 정산 신청", desc: "내가 먼저 받은 급여와 6+6 인상분의 차액을 한꺼번에 받아요.", color: G },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", borderRadius: 8, border: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fafafa" : "#fff", marginBottom: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: item.color, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>{item.step}</p>
                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>이것만 기억해요</strong>
          먼저 써도 나중에 소급 적용돼요.<br />
          배우자가 신청할 때 함께 정산 신청하면 차액을 받을 수 있어요.<br />
          정산 신청은 ei.go.kr 또는 관할 고용센터에서 가능해요.
        </div>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 경우엔 적용되나요?"로 가장 많이 물어보는 것들이에요. 급한 것부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            신청은 고용보험 사이트 또는 관할 고용센터로
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="https://www.ei.go.kr"
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
              ↗ 고용보험 사이트 (ei.go.kr)
            </a>
            <a
              href="tel:1350"
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
              📞 고용노동부 1350
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
          이 글은 2026년 3월 기준 고용보험법 등을 바탕으로 작성됐어요. 지원 기준은 변경될 수 있으니 고용센터에서 확인하세요.
        </div>
      </div>
    </div>
  );
}
