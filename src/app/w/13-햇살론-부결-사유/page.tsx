"use client";
import { useState } from "react";

// ─── 2026년 기준 (서민금융진흥원 운영 기준)
// 햇살론 종류: 햇살론15(저신용·저소득), 햇살론17(최저신용자), 햇살론유스(청년)
// 햇살론은 정책서민금융 상품으로 DSR 규제 적용 제외
// 주요 부결 사유:
//   ① 신용점수 기준 미달 (상품별 하한선 상이)
//   ② 소득 기준 초과: 연소득 3,500만원 이하 기준 (햇살론15)
//      무소득자는 일부 상품 제외
//   ③ 현재 연체 중 (즉시 부결. 해소 후 약 1개월 경과 후 재신청)
//   ④ 기존 햇살론 누적 한도 초과
//   ⑤ 소득 증빙 불가 (재직증명·급여통장 등 필요)
//   ⑥ 금융채무불이행자(신불자) 등재 중
// 재신청 대기:
//   신용점수 개선 최소 3~6개월
//   연체 해소 후 반영 약 1개월
// 앱컷(App Cut): 심사 전 시스템 자동 부결
// 대안: 최저신용자 특례보증, 사잇돌대출, 햇살론17
// 상담: 서민금융진흥원 1397

const SIDEBAR_LINKS = [
  "햇살론 부결 사유",
  "햇살론 재신청 기간",
  "햇살론 신용점수 기준",
  "햇살론 소득 기준",
  "햇살론 연체 부결",
  "햇살론 한도 초과 부결",
  "햇살론 부결 후 대안",
  "햇살론 앱컷",
  "햇살론15 부결",
  "햇살론17 자격",
  "최저신용자 특례보증",
  "사잇돌대출 조건",
  "서민금융진흥원 1397",
  "햇살론 재심사 요청",
  "햇살론 소득증빙",
  "금융채무불이행자 햇살론",
  "햇살론유스 부결",
  "저신용 대출 방법",
  "신용점수 올리는 법",
  "서민금융통합지원센터",
];

const HUB_LINKS = [
  { title: "햇살론 대환대출 | 고금리 대출 갈아타는 방법", desc: "기존 고금리 대출을 햇살론으로 전환하는 조건", href: "#" },
  { title: "햇살론유스 자격조건 | 청년 저금리 대출 신청 방법", desc: "만 19~34세 청년 대상 햇살론유스 완전 정리", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "부결됐는데 바로 재신청할 수 있나요?",
    a: "즉시 재신청은 가능하지만 사유를 해결하지 않으면 또 부결돼요. 신용점수 미달이라면 최소 3~6개월 후에, 연체 해소 후라면 약 1개월이 지난 다음 신청하는 게 효과적이에요. 짧은 기간에 여러 번 부결되면 이력이 쌓여 더 불리해질 수 있어요.",
  },
  {
    urgent: true,
    q: "연체 기록이 있는데 햇살론이 가능한가요?",
    a: "현재 연체 중이라면 부결돼요. 연체를 먼저 해소해야 해요. 연체 해소 후 신용점수에 반영되기까지 약 1개월이 걸려요. 과거 연체 이력은 신용점수에 반영돼 있어서 점수가 기준 미달이라면 마찬가지로 부결될 수 있어요.",
  },
  {
    urgent: true,
    q: "부결 사유를 알 수 없어요. 어디서 확인하나요?",
    a: "신청한 금융기관 또는 서민금융진흥원 콜센터(1397)에 전화하면 부결 사유를 안내받을 수 있어요. 시스템 자동 부결(앱컷)인 경우에는 신용점수·소득 등 기본 조건 미달 수준의 안내만 나오기도 해요.",
  },
  {
    urgent: false,
    q: "앱컷이 뭔가요?",
    a: "Application Cut의 줄임말이에요. 심사 담당자가 검토하기 전에 시스템이 자동으로 부결 처리하는 것을 말해요. 신용점수·소득·누적 한도 등 기본 조건이 미달하면 앱컷으로 즉시 부결돼요.",
  },
  {
    urgent: false,
    q: "소득이 없어도 신청할 수 있나요?",
    a: "원칙적으로 소득 증빙이 필요해요. 다만 상품별로 소득 인정 기준이 달라요. 무소득자는 대부분 어렵지만, 서민금융통합지원센터(1397)에서 상담을 받아보면 대안을 찾을 수 있어요.",
  },
  {
    urgent: false,
    q: "이전에 햇살론을 받은 적 있어요. 또 받을 수 있나요?",
    a: "상품별 누적 이용 한도가 있어요. 기존에 받은 금액이 한도를 초과하면 부결돼요. 이 경우 햇살론17이나 다른 서민금융 상품을 검토해보거나 1397에서 상담받으세요.",
  },
  {
    urgent: false,
    q: "부결 후 다른 대출 방법은 없나요?",
    a: "최저신용자 특례보증, 사잇돌대출, 햇살론17을 검토해보세요. 최저신용자 특례보증은 신용점수가 매우 낮아도 이용 가능한 상품이에요. 서민금융진흥원 콜센터(1397)에서 내 상황에 맞는 상품을 안내받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "서민금융진흥원: 햇살론 상품 안내", url: "https://www.kinfa.or.kr" },
      { label: "서민금융통합지원센터 콜센터: 1397", url: "https://www.kinfa.or.kr" },
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
    reason: {
      title: "부결 사유를 모르겠다면",
      color: G,
      bg: GL,
      text: "신청한 금융기관 또는 서민금융진흥원 콜센터(1397)에 전화하면 부결 사유를 안내받을 수 있어요. 사유를 알아야 재신청 타이밍을 잡을 수 있어요.",
    },
    retry: {
      title: "바로 재신청하려는 중이라면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "사유를 해결하지 않으면 또 부결돼요. 연체 해소 후라면 약 1개월, 신용점수 미달이라면 최소 3~6개월은 기다려야 해요. 지금 바로 재신청하면 부결 이력만 쌓여요.",
    },
    alt: {
      title: "다른 대안을 찾고 있다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "최저신용자 특례보증, 사잇돌대출, 햇살론17을 검토해보세요. 서민금융진흥원 콜센터(1397)에서 내 상황에 맞는 상품을 바로 안내받을 수 있어요.",
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
            { id: "reason", label: "부결됐는데 이유를 모르겠어요." },
            { id: "retry",  label: "부결 후 바로 재신청하려고 해요." },
            { id: "alt",    label: "햇살론 말고 다른 방법을 찾고 있어요." },
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

function ReasonChecker() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));

  const reasons = [
    {
      id: "a",
      label: "지금 연체 중이에요",
      sub: "현재 연체는 즉시 부결. 연체 해소 후 약 1개월 뒤 재신청",
      action: "연체부터 해소해야 해요. 그 후 1개월 기다리세요.",
      color: "#DC2626",
    },
    {
      id: "b",
      label: "신용점수가 낮아요",
      sub: "상품별 하한선 미달. 카드 성실 사용, 장기 계좌 유지 등으로 개선 가능",
      action: "신용점수 개선 후 3~6개월 뒤 재신청이 효과적이에요.",
      color: "#f59e0b",
    },
    {
      id: "c",
      label: "소득 증빙이 어려워요",
      sub: "급여통장 내역, 건강보험료 납부확인서, 근로계약서 등으로 증빙 가능",
      action: "소득 증빙 서류를 준비한 다음 재신청하세요.",
      color: "#f59e0b",
    },
    {
      id: "d",
      label: "이전에 햇살론을 받은 적 있어요",
      sub: "상품별 누적 이용 한도가 있어요",
      action: "햇살론17 또는 최저신용자 특례보증 등 다른 상품을 검토하세요.",
      color: "#7C3AED",
    },
    {
      id: "e",
      label: "금융채무불이행자(신불자)로 등재돼 있어요",
      sub: "신불자 해제 후 신청 가능",
      action: "1397에 전화해서 신불자 해제 절차와 가능한 상품을 안내받으세요.",
      color: "#7C3AED",
    },
  ];

  const selected = reasons.filter((r) => checked[r.id]);

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {reasons.map((r) => (
          <label
            key={r.id}
            onClick={() => toggle(r.id)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer",
              border: `1px solid ${checked[r.id] ? r.color : "#e5e7eb"}`,
              background: checked[r.id] ? r.color + "10" : "#f9fafb",
            }}
          >
            <input
              type="checkbox"
              checked={!!checked[r.id]}
              readOnly
              style={{ accentColor: r.color, marginTop: 3, flexShrink: 0 }}
            />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>
              {r.label}
              <span style={{ fontSize: 11, color: "#6b7280", display: "block", marginTop: 3 }}>
                {r.sub}
              </span>
            </span>
          </label>
        ))}
      </div>
      {selected.length > 0 && (
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          {selected.map((r) => (
            <div
              key={r.id}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: r.color + "10",
                border: `1px solid ${r.color}40`,
                fontSize: 13,
                color: r.color,
                fontWeight: 600,
              }}
            >
              → {r.action}
            </div>
          ))}
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
        이 글은 2026년 3월 기준으로 작성됐어요. 상품 기준은 변경될 수 있으니 서민금융진흥원(1397)에서 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          햇살론 관련 글
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

export default function HatSalRejectionPage() {
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
          서민금융 · 햇살론 · 부결
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          햇살론 부결 사유 |<br />
          재신청 가능한 타이밍과 해결 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          햇살론이 부결됐는데 이유도 모르고 막막하셨죠.<br />
          <strong>사유를 모르면 재신청해도 또 부결돼요. 연체인지, 신용점수인지, 한도 문제인지에 따라 해결 방법과 재신청 타이밍이 완전히 달라요.</strong><br /><br />
          아래 항목 중 내 상황과 맞는 것을 골라보세요. 해결 방향이 바로 나와요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>왜 부결됐는지 모르겠어요. 사유별로 해결 방법이 달라요</H2>
        <p style={body}>
          햇살론 부결 사유는 크게 5가지예요.<br />
          연체 중이라면 먼저 해소, 신용점수 미달이라면 개선 기간이 필요, 소득 증빙 문제라면 서류만 갖추면 바로 재신청이 가능해요.<br />
          아래 항목 중 내 상황에 해당하는 것을 골라보세요.
        </p>
        <Bdg>내 상황에 해당하는 항목을 골라보세요</Bdg>
        <ReasonChecker />
        <GreenBox title="이것만 기억해요">
          현재 연체 중 → 연체 해소 먼저. 해소 후 약 1개월 뒤 재신청<br />
          신용점수 미달 → 최소 3~6개월 개선 후 재신청<br />
          소득 증빙 불가 → 서류 준비 후 바로 재신청 가능
        </GreenBox>

        <Divider />

        <H2>바로 재신청하면 안 되나요? 사유마다 기다려야 할 기간이 달라요</H2>
        <p style={body}>
          부결 직후 바로 재신청하고 싶은 마음, 당연해요.<br />
          하지만 사유를 해결하지 않은 상태에서 재신청하면 또 부결돼요. 짧은 기간에 여러 번 부결 이력이 쌓이면 나중에 더 불리해질 수 있어요.<br />
          사유별로 최소 대기 기간을 먼저 확인하세요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: GL }}>
                {["부결 사유", "재신청 가능 타이밍"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 10px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: GD,
                      borderBottom: `2px solid ${G}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["현재 연체",        "연체 해소 후 약 1개월 경과"],
                ["신용점수 미달",    "개선 조치 후 3~6개월 후"],
                ["소득 증빙 불가",   "증빙 서류 준비 후 즉시 가능"],
                ["누적 한도 초과",   "다른 서민금융 상품으로 전환"],
                ["금융채무불이행자", "신불자 해제 후 재신청 가능"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "9px 10px", fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ padding: "9px 10px", color: "#374151" }}>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <WarnBox title="부결 이력이 쌓이면 불리해요">
          짧은 기간에 여러 번 부결되면 금융기관에서 더 부정적으로 볼 수 있어요. 사유를 해결한 다음 신청하는 게 장기적으로 유리해요.
        </WarnBox>

        <HubLinks />

        <Divider />

        <H2>햇살론 말고 지금 당장 받을 수 있는 대안은 없나요?</H2>
        <p style={body}>
          햇살론이 부결됐다고 다른 방법이 없는 건 아니에요.<br />
          신용점수가 매우 낮거나 현재 연체 중인 분도 이용 가능한 서민금융 상품이 따로 있어요.<br />
          서민금융진흥원 콜센터(1397)에 전화하면 내 신용점수와 소득 수준에 맞는 상품을 1대1로 안내받을 수 있어요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0 1.2rem" }}>
          {[
            {
              title: "최저신용자 특례보증",
              tag: "신용점수 매우 낮아도 가능",
              tagColor: G,
              desc: "신용점수 하위 10% 이내 대상. 서민금융진흥원이 보증하는 대출이에요.",
            },
            {
              title: "햇살론17",
              tag: "최저신용자 전용",
              tagColor: G,
              desc: "신용점수가 낮은 최저신용자를 위한 상품이에요. 문턱이 낮아요.",
            },
            {
              title: "사잇돌대출",
              tag: "중금리 대출",
              tagColor: "#7C3AED",
              desc: "저신용자도 이용 가능한 중금리 대출. 은행·저축은행에서 신청 가능해요.",
            },
            {
              title: "서민금융통합지원센터",
              tag: "1:1 맞춤 상담",
              tagColor: "#7C3AED",
              desc: "1397로 전화하면 내 상황에 맞는 상품을 바로 안내받을 수 있어요.",
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
                background: item.tagColor + "15",
                color: item.tagColor,
                marginBottom: 8,
              }}>
                {item.tag}
              </span>
              <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 경우엔 되나요?"로 가장 많이 물어보는 것들이에요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            부결 사유가 불명확하다면 1397에 바로 전화하세요
          </p>
          <a
            href="tel:1397"
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
            📞 서민금융진흥원 1397
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
          이 글은 2026년 3월 기준으로 작성됐어요. 상품 기준은 변경될 수 있으니 서민금융진흥원(1397)에서 확인하세요.
        </div>
      </div>
    </div>
  );
}
