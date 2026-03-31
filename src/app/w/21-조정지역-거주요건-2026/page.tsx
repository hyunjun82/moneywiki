"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 2026년 기준 (소득세법 시행령 §154①, §155의3)
// 거주요건 적용: 취득 당시 조정대상지역 + 2017.8.3 이후 취득 → 보유 2년 + 거주 2년
// 기준: 취득일(잔금청산일). 이후 해제돼도 거주요건 그대로 적용
// 2025.10.15 대책으로 조정대상지역 확대:
//   서울 25개 구 전역 + 경기 과천·광명·성남(분당·수정·중원)·수원(영통·장안·팔달)·안양(동안)·용인(수지)·의왕·하남
// 거주요건 면제: 상생임대주택(임대료 5% 이내 갱신, 2026.12.31까지)
// 거주요건 예외: 조정지역 지정 전 계약금 납부 + 당시 무주택 증빙
// 2017.8.3 이전 취득: 조정지역이어도 거주요건 없음
// 전입신고만으로 거주요건 불충분. 실거주 증빙(공과금·카드 사용 등) 필요

const SIDEBAR_LINKS = [
  "조정대상지역 거주요건 2026",
  "강남 아파트 팔 때 거주요건",
  "조정대상지역 지정 현황 2026",
  "2025.10.15 조정지역 확대",
  "실거주 2년 증빙 방법",
  "전입신고만 하면 거주요건",
  "조정지역 해제 거주요건",
  "상생임대주택 거주요건 면제",
  "2017년 8월 3일 이전 취득",
  "조정지역 취득 잔금청산일",
  "1세대 1주택 비과세 조건",
  "장기보유특별공제 거주기간",
  "거주요건 없이 비과세",
  "조정지역 계약금 납부 예외",
  "부득이한 사유 거주요건",
  "세대원 거주요건 예외",
  "비조정지역 비과세",
  "홈택스 양도세 모의계산",
  "국세청 126 양도세 상담",
  "조정대상지역 확인 방법",
];

const HUB_LINKS = [
  { title: "1세대 1주택 양도세 비과세 조건 | 거주기간 요건 2026", desc: "거주요건 체크부터 세금 비교 계산기까지", href: "#" },
  { title: "일시적 2주택 양도세 비과세 조건 | 3년 처분 기한", desc: "갈아타면서 2주택 됐을 때 비과세 조건 3가지", href: "#" },
  { title: "양도소득세 비과세 12억 기준 | 초과 시 세금 계산", desc: "12억 넘어도 전액 과세 아닌 이유", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "2025년 10월에 조정지역이 됐는데, 그전에 산 집도 거주요건이 생기나요?",
    a: "아니에요. 거주요건은 취득 당시 기준이에요. 2025.10.15 지정 전에 잔금을 치른 집이라면 당시 비조정지역이었으니 거주요건이 없어요. 새로 지정돼도 기존 집엔 소급 적용되지 않아요. 앞으로 새로 살 집은 거주요건이 생겨요.",
  },
  {
    urgent: true,
    q: "강남구 아파트를 2020년에 샀어요. 실거주 안 해도 비과세 되나요?",
    a: "안 돼요. 2020년 강남구는 2017.8.3 이후 취득 + 조정지역이어서 보유 2년 외에 거주 2년도 필요해요. 세입자가 있어서 못 살았다면 임대차 갱신 시 임대료를 5% 이내로 유지하면 상생임대주택 특례로 거주요건이 면제돼요(2026.12.31까지).",
  },
  {
    urgent: true,
    q: "조정지역으로 지정되기 전에 계약했는데 잔금은 지정 후에 냈어요. 거주요건 있나요?",
    a: "원칙적으로 있어요. 거주요건은 잔금청산일(취득일) 기준이에요. 계약일이 아니에요. 단, 조정지역 공고 전에 계약금을 납부하고 당시 무주택자였다면 예외로 거주요건이 없어요. 계약금 납부 증빙을 꼭 보관해두세요.",
  },
  {
    urgent: false,
    q: "조정지역이 해제됐는데 거주요건도 없어지나요?",
    a: "아니에요. 취득 당시 조정지역이었다면 이후 해제돼도 거주 2년을 채워야 비과세예요. 거주요건은 취득 당시 기준이에요.",
  },
  {
    urgent: false,
    q: "전입신고만 하고 실제로 잘 안 살았어요. 거주요건 인정되나요?",
    a: "안 돼요. 거주요건은 실제 거주가 기준이에요. 과세당국은 전기·수도 사용량, 카드 사용내역, 관리비 납부내역 등으로 실거주를 확인해요. 전입신고만으로는 인정받기 어려워요.",
  },
  {
    urgent: false,
    q: "거주요건을 못 채웠을 때 비과세 받을 방법이 있나요?",
    a: "상생임대주택 특례가 있어요. 임대차 갱신 시 임대료를 직전 계약 대비 5% 이내로 인상하면 거주요건 전체가 면제돼요. 2026년 12월 31일까지 한시 적용이에요. 취학·근무·질병 등 부득이한 사유로 1년 이상 거주 후 이사한 경우도 예외 인정이 가능해요.",
  },
  {
    urgent: false,
    q: "내 집이 조정지역인지 어떻게 확인하나요?",
    a: "국토교통부 토지이용규제정보서비스(luris.molit.go.kr)에서 주소를 입력하면 무료로 확인할 수 있어요. 취득 당시 기준이 중요하니, 잔금청산일의 지정 현황을 확인하세요.",
  },
  {
    urgent: false,
    q: "2017.8.3 이전에 산 집도 거주요건이 있나요?",
    a: "없어요. 거주요건은 2017.8.3 이후 조정지역에서 취득한 주택에만 적용돼요. 2017.8.2 이전에 잔금을 치른 집은 조정지역이어도 보유 2년만으로 비과세예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 시행령 제154조 제1항: 1주택 거주요건", url: "https://www.law.go.kr/" },
      { label: "소득세법 시행령 제155조의3: 상생임대주택 거주요건 면제", url: "https://www.law.go.kr/" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국토부 토지이용규제정보서비스: 조정대상지역 확인", url: "https://luris.molit.go.kr" },
      { label: "국세청: 양도소득세 비과세 요건 (2026 기준)", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308" },
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

function H2({ children }: any) {
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

function Bdg({ children }: any) {
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

function GreenBox({ title, children }: any) {
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

function WarnBox({ title, children }: any) {
  return (
    <div style={{
      background: "#FFF7ED",
      border: "1px solid #FED7AA",
      borderRadius: 8,
      padding: "14px 18px",
      margin: "12px 0 1.2rem",
      fontSize: 14,
      lineHeight: 1.95,
    }}>
      <strong style={{ display: "block", color: "#C2410C", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);

  const messages = {
    sell: {
      title: "강남·서울 아파트 팔 예정이라면",
      color: G,
      bg: GL,
      text: "2017.8.3 이후 취득했다면 보유 2년 외에 실거주 2년이 필요해요. 아래 체커로 내 집에 거주요건이 있는지 먼저 확인해보세요. 세입자가 있어서 못 살았다면 상생임대주택 특례를 확인하세요.",
    },
    newreg: {
      title: "10.15 이후 조정지역이 됐는데 우리 집이 해당되나요?",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "기존에 보유하던 집은 걱정 안 하셔도 돼요. 거주요건은 취득 당시 기준이라 2025.10.15 전에 잔금 치른 집엔 소급 적용되지 않아요. 앞으로 새로 살 집부터 거주요건이 생겨요.",
    },
    nomove: {
      title: "실거주를 못 했는데 비과세 받을 방법이 있나요?",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "세입자가 있어서 못 살았다면 상생임대주택 특례가 있어요. 임대차 갱신 시 임대료를 5% 이내로 올리면 거주요건 전체가 면제돼요. 2026년 12월 31일까지예요. 지금 임대차 계약 만료가 언제인지 먼저 확인해보세요.",
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
            { id: "sell",   label: "강남·서울 아파트를 팔 예정인데 거주요건이 있는지 모르겠어요." },
            { id: "newreg", label: "2025.10.15 이후 조정지역이 됐는데 우리 집도 해당되나요?" },
            { id: "nomove", label: "실거주를 못 했는데 비과세 받을 방법이 있나요?" },
          ].map((item: any) => (
            <button
              key={item.id}
              onClick={(_e: any) => setType(item.id)}
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
          onClick={(_e: any) => setType(null)}
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
      label: "취득 당시 조정대상지역이었어요",
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
      sub: "전입신고 + 실거주 흔적(공과금·카드 사용 등) 필요",
    },
  ];

  const needsResidence = checked["a"] && checked["b"];
  const allOk = needsResidence && checked["c"];
  const noNeed = checked["a"] === false || (checked["a"] && checked["b"] === false);
  const someChecked = Object.keys(checked).length > 0;

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {conditions.map((c: any) => (
          <label
            key={c.id}
            onClick={(_e: any) => toggle(c.id)}
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
          ✅ <strong>거주요건 충족됐어요.</strong> 비과세 기본요건(보유 2년 + 양도가액 12억 이하)도 함께 확인하세요.
        </div>
      )}
      {needsResidence && !checked["c"] && someChecked && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#FEF2F2", fontSize: 13, lineHeight: 1.8 }}>
          <strong style={{ color: "#DC2626" }}>거주 2년 미충족.</strong> 상생임대주택 특례(임대료 5% 이내 갱신)를 활용하면 거주요건이 면제될 수 있어요.
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

function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = (i) => setOpen((p) => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      {FAQS.map((faq: any, i: any) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button
            onClick={(_e: any) => toggle(i)}
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
        {HUB_LINKS.map((link: any, i: any) => (
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
      {REFERENCES.map((group: any) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>
            {group.category.toUpperCase()}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item: any) => (
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
        이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 조정지역 현황은 변동될 수 있으니 국토부 공식 사이트에서 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          조정지역 양도세 관련 글
        </p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
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

export default function AdjustedZonePage() {
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
          조정대상지역 · 거주요건 · 양도소득세
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          1세대 1주택 조정지역 거주요건 2026 |<br />
          강남·용산 아파트 팔 때 실거주 2년이 필요한 이유
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          집 한 채인데 "거주요건 미충족"으로 세금이 나왔다는 말, 들어보셨나요?<br />
          <strong>조정지역에서 2017.8.3 이후 샀다면 보유 2년만으로는 부족해요. 실거주 2년이 더 필요해요.</strong><br /><br />
          전입신고만 해놓고 실제로 안 살았다면 비과세를 받지 못할 수 있어요. 지금 내 상황부터 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>강남·용산 아파트, 팔 때 실거주 2년이 필요한 이유</H2>
        <p style={body}>
          왜 1주택인데도 실거주가 필요한지 이해가 안 되셨죠.<br />
          2017년 8·2 부동산 대책에서 조정지역 투기 수요를 막기 위해 거주요건을 추가했어요.<br />
          "보유만 해도 되던" 시대가 끝난 거예요. 먼저 내 집에 거주요건이 있는지 확인해보세요.
        </p>
        <Bdg>내 주택에 거주요건이 있는지 체크해보세요</Bdg>
        <ResidenceChecker />
        <p style={{ ...body, marginTop: 14 }}>
          거주요건은 주민등록 전입이 아니라 <strong>실제로 살았다는 흔적</strong>이 기준이에요.<br />
          전기·수도 사용량, 카드 사용내역, 관리비 내역으로 확인하기 때문에 전입만 해놓으면 거부당해요.
        </p>
        <GreenBox title="이것만 기억해요">
          취득 당시 조정지역 + 2017.8.3 이후 취득 → 보유 2년 + 실거주 2년 필요<br />
          이 둘 중 하나라도 아니라면 보유 2년만으로 비과세예요.
        </GreenBox>

        <Divider />

        <H2>지금 조정대상지역이 어디인지 확인해보세요</H2>
        <p style={body}>
          2025년 10월 15일 대책으로 조정지역이 서울 전역으로 확대됐어요.<br />
          앞으로 서울에서 집을 산다면 거주요건이 생기니 꼭 확인하세요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: GL }}>
                {["구분", "조정대상지역 (2026.3 현재)"].map((h: any) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["서울", "25개 구 전역 (2025.10.15 대책으로 확대)"],
                ["경기", "과천·광명·성남(분당·수정·중원)·수원(영통·장안·팔달)·안양(동안)·용인(수지)·의왕·하남"],
              ].map((row: any, i: any) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "9px 10px", fontWeight: 700 }}>{row[0]}</td>
                  <td style={{ padding: "9px 10px", color: "#374151", lineHeight: 1.7 }}>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <WarnBox title="10.15 이전에 취득한 집은 거주요건이 없어요">
          2025.10.15 지정 전에 잔금을 치른 집은 취득 당시 비조정지역이었으니 거주요건이 생기지 않아요. 이후 새로 살 집부터 거주요건이 적용돼요.
        </WarnBox>

        <HubLinks />

        <Divider />

        <H2>거주요건 없이 비과세 받을 수 있는 경우</H2>
        <p style={body}>
          조정지역 취득이라도 아래 4가지 경우엔 거주 안 해도 비과세를 받을 수 있어요.<br />
          내 상황이 해당하는지 먼저 확인해보세요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0 1.2rem" }}>
          {[
            {
              title: "2017.8.3 이전 취득",
              badge: "거주요건 없음",
              bc: G,
              desc: "잔금청산일 기준. 조정지역이어도 보유 2년만으로 비과세예요.",
            },
            {
              title: "상생임대주택",
              badge: "거주요건 면제 (2026.12.31까지)",
              bc: "#7C3AED",
              desc: "임대료 5% 이내로 갱신 계약 체결 시 거주요건 전체 면제. 세입자 있어서 못 살았을 때 활용해요.",
            },
            {
              title: "조정지정 전 계약금 납부",
              badge: "거주요건 없음",
              bc: G,
              desc: "지정 공고 전 계약 + 계약금 납부 + 당시 무주택 증빙이 있으면 거주요건 적용 안 돼요.",
            },
            {
              title: "부득이한 사유",
              badge: "1년 이상 거주 후 양도",
              bc: "#7C3AED",
              desc: "취학·근무·질병 등으로 부득이하게 이사한 경우, 1년 이상 거주 후 양도 시 예외 인정돼요.",
            },
          ].map((item: any, i: any) => (
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
              <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <Divider />

        <H2>자주 막히는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 집은 어떻게 되나요?"로 가장 많이 물어보는 것들이에요. 급한 것부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            팔기 전에 홈택스에서 먼저 계산해보세요
          </p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            조정지역 여부는 국토부에서, 세금 계산은 홈택스에서 확인할 수 있어요.
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
              href="https://luris.molit.go.kr"
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
              ↗ 조정지역 확인 (국토부)
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
              📞 국세청 126
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
          이 글은 2026년 3월 기준으로 작성됐어요. 조정지역 현황은 변동될 수 있으니 국토부 공식 사이트에서 확인하세요. 개별 사안은 세무사와 상담하세요.
        </div>
      </div>
    </div>
  );
}
