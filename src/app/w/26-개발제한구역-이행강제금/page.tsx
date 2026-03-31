"use client";
import { useState } from "react";

// ─── 개발제한구역의 지정 및 관리에 관한 특별조치법 기준
// 이행강제금 근거: 개발제한구역법 제30조의2
// 부과 금액: 시가표준액의 100분의 50 이하 (50% 한도)
// 부과 횟수: 시정명령 불이행 시 연 1회 이상 반복 가능
// 형사처벌: 허가 없이 건축·토지 형질변경 등 → 3년 이하 징역 또는 3,000만원 이하 벌금 (동법 §30)
// 과태료 별도: 신고 위반 등 경미한 위반 → 300만원 이하 과태료 (동법 §32)
// 원상회복 명령: 시장·군수·구청장이 원상회복 명령 가능
// 이행강제금 불복: 처분일로부터 90일 이내 행정심판 또는 행정소송
// 개발제한구역 확인: luris.molit.go.kr, eum.go.kr

const SIDEBAR_LINKS = [
  "개발제한구역 이행강제금",
  "그린벨트 이행강제금",
  "개발제한구역 건축 허가",
  "그린벨트 건축물 위반",
  "이행강제금 부과 기준",
  "이행강제금 반복 부과",
  "개발제한구역 원상회복",
  "이행강제금 계산",
  "개발제한구역 위반 처벌",
  "그린벨트 무허가 건축",
  "개발제한구역 신고",
  "이행강제금 불복 방법",
  "이행강제금 행정심판",
  "개발제한구역 해제",
  "개발제한구역 조회",
  "토지이용규제정보서비스",
  "개발제한구역 토지",
  "개발제한구역 창고 허가",
  "그린벨트 용도변경",
  "개발제한구역 법령",
];

const HUB_LINKS = [
  { title: "건축 이행강제금 | 건축법 위반 시 부과 기준", desc: "무허가·불법 건축물 이행강제금 계산법", href: "#" },
  { title: "개발제한구역 토지 매수 | 주의해야 할 것들", desc: "그린벨트 토지 활용 제한과 해제 조건", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "개발제한구역에서 무허가로 건축하면 이행강제금이 얼마나 나오나요?",
    a: "시가표준액의 50% 이하가 이행강제금으로 부과돼요. 예를 들어 시가표준액이 1,000만원인 건축물이라면 최대 500만원이에요. 시정명령에도 이행하지 않으면 연 1회 이상 반복 부과돼요. 형사처벌(3년 이하 징역 또는 3,000만원 이하 벌금)도 별도로 받을 수 있어요.",
  },
  {
    urgent: true,
    q: "이행강제금이 계속 부과되나요?",
    a: "네, 위반 상태가 해소될 때까지 반복 부과돼요. 시정명령을 받고 원상회복을 하지 않으면 연 1회 이상 계속 부과돼요. 방치할수록 총 부담이 커지기 때문에 빨리 원상회복하거나 합법화 절차를 밟는 게 유리해요.",
  },
  {
    urgent: true,
    q: "이행강제금 부과에 불복하려면 어떻게 하나요?",
    a: "처분일로부터 90일 이내에 행정심판 또는 행정소송을 제기할 수 있어요. 이의신청 절차를 먼저 활용하는 방법도 있어요. 처분 내용에 위법·부당한 점이 있다면 전문 행정사·변호사와 상담해보세요.",
  },
  {
    urgent: false,
    q: "오래된 무허가 건축물도 이행강제금을 내나요?",
    a: "위반 상태가 지속되고 있다면 부과 대상이 될 수 있어요. 다만 준공 전부터 있던 기존 무허가 건축물에 대한 특례나 양성화 규정이 일부 있어요. 해당 지자체에 문의해서 적용 여부를 확인하는 게 좋아요.",
  },
  {
    urgent: false,
    q: "개발제한구역에서 어떤 행위를 하려면 허가가 필요한가요?",
    a: "건축물 건축·증축·개축·재축·이전, 공작물 설치, 토지의 형질 변경, 토석 채취, 죽목 벌채, 용도 변경 등은 시장·군수·구청장의 허가가 필요해요. 소규모 행위 일부는 신고로 가능해요.",
  },
  {
    urgent: false,
    q: "개발제한구역인지 어떻게 확인하나요?",
    a: "국토교통부 토지이용규제정보서비스(luris.molit.go.kr) 또는 토지이음(eum.go.kr)에서 주소를 입력하면 개발제한구역 포함 여부를 무료로 확인할 수 있어요.",
  },
  {
    urgent: false,
    q: "이행강제금과 벌금은 다른 건가요?",
    a: "다르고 별도로 부과돼요. 이행강제금은 위반 상태를 해소시키기 위한 행정상 강제수단이에요. 형사처벌(징역 또는 벌금)은 위반 행위 자체에 대한 형사적 제재예요. 두 가지가 동시에 부과될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "개발제한구역법 제30조의2: 이행강제금", url: "https://www.law.go.kr/" },
      { label: "개발제한구역법 제30조: 3년 이하 징역 또는 3,000만원 이하 벌금", url: "https://www.law.go.kr/" },
      { label: "개발제한구역법 제32조: 과태료 (300만원 이하)", url: "https://www.law.go.kr/" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "토지이용규제정보서비스: 개발제한구역 확인 (luris.molit.go.kr)", url: "https://luris.molit.go.kr" },
      { label: "토지이음: 토지이용규제 확인 (eum.go.kr)", url: "https://eum.go.kr" },
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

function WarnBox({ title, children }) {
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
    got: {
      title: "이행강제금 부과 처분을 받았다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "빨리 원상회복하거나 합법화 절차를 밟는 게 유리해요. 방치할수록 연 1회 이상 반복 부과돼요. 불복하려면 처분일로부터 90일 이내에 행정심판 또는 행정소송을 제기해야 해요.",
    },
    before: {
      title: "개발제한구역 내 행위를 하려는 중이라면",
      color: G,
      bg: GL,
      text: "건축·공작물 설치·토지 형질변경 등은 반드시 시장·군수·구청장의 허가를 먼저 받아야 해요. 허가 없이 하면 이행강제금(시가표준액의 50% 이하)과 형사처벌(3년 이하 징역 또는 3,000만원 이하 벌금)을 받을 수 있어요.",
    },
    check: {
      title: "내 토지가 개발제한구역인지 확인하려면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "토지이용규제정보서비스(luris.molit.go.kr)에서 주소를 입력하면 무료로 확인할 수 있어요. 토지 매수 전에 반드시 확인하세요. 개발제한구역이면 활용 가능한 행위가 매우 제한돼요.",
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
            { id: "got",    label: "이행강제금 부과 처분을 받았어요." },
            { id: "before", label: "개발제한구역 내 건축·공작물 설치를 하려고 해요." },
            { id: "check",  label: "내 토지가 개발제한구역인지 확인하고 싶어요." },
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

function FineCalc() {
  const [price, setPrice] = useState(5000);
  const fine = Math.round(price * 0.5);

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        건축물 시가표준액을 입력하면 이행강제금 최대 금액을 확인할 수 있어요.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <label style={{ fontSize: 13, color: "#6b7280", width: 130, flexShrink: 0 }}>
          시가표준액 (만원)
        </label>
        <input
          type="range"
          min={100}
          max={50000}
          step={100}
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          style={{ flex: 1, accentColor: G }}
        />
        <span style={{ fontSize: 12, fontWeight: 700, minWidth: 90, textAlign: "right" }}>
          {price.toLocaleString()}만원
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "12px 14px" }}>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>시가표준액</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#374151", margin: 0 }}>
            {price.toLocaleString()}만원
          </p>
        </div>
        <div style={{ background: "#FEF2F2", borderRadius: 8, border: "1px solid #f87171", padding: "12px 14px" }}>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>이행강제금 최대 (50%)</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#DC2626", margin: 0 }}>
            {fine.toLocaleString()}만원
          </p>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, lineHeight: 1.7 }}>
        ※ 개발제한구역법 §30의2. 실제 부과 금액은 위반 내용·면적 등에 따라 달라질 수 있어요.
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
        이 글은 2026년 3월 기준 법령을 바탕으로 작성됐어요. 개별 상황은 해당 지자체 또는 전문가와 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          개발제한구역 관련 글
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

export default function GreenBeltFinePage() {
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
          개발제한구역법 · 이행강제금 · 그린벨트
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          개발제한구역 건축 이행강제금 |<br />
          허가·신고 위반 시 부과 기준과 반복 부과
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          그린벨트인 줄 모르고 창고를 지었다가 이행강제금 고지서를 받으셨나요?<br />
          <strong>시가표준액의 50% 이하가 부과되고, 원상회복할 때까지 연 1회 이상 반복 부과돼요.</strong><br /><br />
          방치할수록 총 부담이 커져요. 지금 내 상황부터 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>이행강제금이 얼마나 나올지 확인해보세요</H2>
        <p style={body}>
          시가표준액을 알면 이행강제금 최대치를 바로 계산할 수 있어요.<br />
          아래 슬라이더로 내 건축물의 시가표준액을 맞춰보세요.
        </p>
        <Bdg>시가표준액 기준 최대 이행강제금</Bdg>
        <FineCalc />
        <WarnBox title="이행강제금은 원상회복할 때까지 계속 나와요">
          부과 금액이 크지 않아 보여도 반복 부과되면 총액이 빠르게 늘어요. 위반 상태가 오래될수록 총 부담이 커지므로 빨리 원상회복하거나 합법화 절차를 밟는 게 유리해요.
        </WarnBox>

        <Divider />

        <H2>허가·신고 위반 시 부과 기준이 어떻게 되나요?</H2>
        <p style={body}>
          이행강제금만 내면 끝이 아니에요.<br />
          위반 행위는 형사처벌로도 이어질 수 있어요. 단계별로 어떻게 진행되는지 확인하세요.
        </p>
        <div style={{ margin: "12px 0 1.2rem" }}>
          {[
            {
              step: "위반 행위 적발",
              desc: "지자체 공무원이 위반 건축물·행위를 적발해요.",
              color: "#9ca3af",
            },
            {
              step: "시정명령 발부",
              desc: "원상회복 또는 허가 취득 기한을 정해 시정명령을 발부해요.",
              color: "#f59e0b",
            },
            {
              step: "이행강제금 부과",
              desc: "기한 내 미이행 시 시가표준액의 50% 이하 부과. 미이행 지속 시 연 1회 이상 반복.",
              color: "#DC2626",
            },
            {
              step: "형사고발 가능",
              desc: "3년 이하 징역 또는 3,000만원 이하 벌금 (허가 없이 건축·토지 형질변경 등).",
              color: "#7C3AED",
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
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>
                  {item.step}
                </p>
                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        <H2>내 토지가 개발제한구역인지 확인하는 방법</H2>
        <p style={body}>
          토지를 사기 전에, 또는 건축하기 전에 반드시 먼저 확인해야 해요.<br />
          몰랐다고 해서 처벌이 면제되지 않아요.
        </p>
        <GreenBox title="개발제한구역 무료 확인 방법">
          토지이용규제정보서비스(luris.molit.go.kr) → 주소 입력 → 토지이용 규제사항 확인<br />
          또는 토지이음(eum.go.kr) → 주소 검색 → 용도지역·지구·구역 확인<br />
          취득 당시 기준이 중요하니, 매수 전에 반드시 확인하세요.
        </GreenBox>

        <HubLinks />

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 경우엔 어떻게 되나요?"로 가장 많이 물어보는 것들이에요. 급한 것부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            이행강제금 불복·원상회복 방법을 모르겠다면 전문가에게 문의하세요
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="https://luris.molit.go.kr"
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
              ↗ 개발제한구역 확인
            </a>
            <a
              href="tel:1670-1695"
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
              📞 국민권익위 1670-1695
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
          이 글은 2026년 3월 기준 법령을 바탕으로 작성됐어요. 개별 상황은 해당 지자체 또는 전문가와 확인하세요.
        </div>
      </div>
    </div>
  );
}
