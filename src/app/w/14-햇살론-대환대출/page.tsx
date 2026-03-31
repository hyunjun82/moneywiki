"use client";
import { useState } from "react";

// ─── 2026년 기준 (서민금융진흥원 햇살론 대환 운영 기준)
// 대환 대상: 연 10% 초과 고금리 대출 (카드론·캐피탈·저축은행·대부업 등)
// 대환 불가: 현재 연체 중인 대출, 1금융권(시중은행) 대출
// 신청 자격:
//   일반보증: 신용점수 하한 이상, 연소득 3,500만원 이하
//   특례보증(최저신용자): 신용점수 하위 10% 이내, 연소득 4,500만원 이하
// 대환 한도: 최대 2,000만원 (기존 대출 잔액 범위 내)
// 금리: 연 10.5~15.9% (보증 유형·신용도에 따라 상이)
// 상환 기간: 최대 5년 (60개월)
// 취급 기관: 농협·신협·새마을금고·저축은행 등 협약 금융기관
// 신청처: 서민금융진흥원 1397 또는 협약 금융기관 직접 방문
// 대환 후 기존 대출: 대환 실행 즉시 기존 대출 상환 처리

const SIDEBAR_LINKS = [
  "햇살론 대환대출 조건",
  "고금리 대출 갈아타기",
  "햇살론 대환 금리",
  "햇살론 대환 한도",
  "햇살론 대환 자격",
  "카드론 햇살론 대환",
  "대부업 햇살론 갈아타기",
  "캐피탈 햇살론 대환",
  "연체 대출 대환 가능",
  "햇살론 대환 신청 방법",
  "서민금융 대환대출",
  "특례보증 대환",
  "최저신용자 대환대출",
  "햇살론 대환 서류",
  "저신용 대출 갈아타기",
  "서민금융진흥원 대환",
  "1397 대환 상담",
];

const HUB_LINKS = [
  { title: "햇살론 부결 사유 | 재신청 가능한 타이밍", desc: "부결 후 해결 방법과 재신청 타이밍 정리", href: "#" },
  { title: "햇살론유스 자격조건 | 청년 저금리 대출 신청 방법", desc: "만 19~34세 청년 대상 햇살론유스 완전 정리", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "대부업 대출을 햇살론으로 갈아탈 수 있나요?",
    a: "가능해요. 대부업 대출은 연 10% 초과 고금리 대출이라 햇살론 대환 대상이에요. 현재 연체 중이지 않고 신용점수·소득 기준을 충족하면 신청할 수 있어요. 1397에 전화하면 내 상황에 맞는 취급 기관을 안내받을 수 있어요.",
  },
  {
    urgent: true,
    q: "현재 연체 중인 대출을 대환할 수 있나요?",
    a: "안 돼요. 현재 연체 중인 대출은 대환 대상에서 제외돼요. 연체를 먼저 해소해야 해요. 연체 해소 후 약 1개월이 지나면 신용점수에 반영되고, 그 후 대환 신청이 가능해요.",
  },
  {
    urgent: true,
    q: "1금융권(시중은행) 대출도 대환이 되나요?",
    a: "안 돼요. 1금융권 대출은 대환 대상이 아니에요. 연 10% 초과 고금리 대출, 즉 카드론·캐피탈·저축은행·대부업 등이 대상이에요.",
  },
  {
    urgent: false,
    q: "여러 개의 고금리 대출을 한꺼번에 대환할 수 있나요?",
    a: "한도 범위 내에서 여러 대출을 묶어서 대환할 수 있어요. 최대 한도는 2,000만원이에요. 총 잔액이 2,000만원을 넘으면 일부만 대환하거나 추가 상담이 필요해요.",
  },
  {
    urgent: false,
    q: "대환 후 기존 대출은 어떻게 처리되나요?",
    a: "대환 실행 즉시 기존 대출이 상환 처리돼요. 대환 금액이 기존 대출 잔액 범위 내에서 실행되기 때문에, 잔액이 남으면 별도로 갚아야 해요.",
  },
  {
    urgent: false,
    q: "신청 후 얼마나 걸려요?",
    a: "취급 기관에 따라 다르지만 보통 서류 심사 후 3~5 영업일 내에 결과가 나와요. 서류가 완비돼 있으면 더 빠를 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "서민금융진흥원: 햇살론 대환대출 안내", url: "https://www.kinfa.or.kr" },
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
    apply: {
      title: "지금 바로 대환 신청하려는 중이라면",
      color: G,
      bg: GL,
      text: "연 10% 초과 고금리 대출이 있고, 현재 연체 중이지 않다면 신청 가능해요. 아래 조건표에서 내가 해당하는지 먼저 보고, 1397에 전화하거나 협약 금융기관을 방문하세요.",
    },
    eligible: {
      title: "내가 대환 대상인지 모르겠다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "대환 가능한 대출은 연 10% 초과 고금리 대출이에요. 카드론·캐피탈·저축은행·대부업이 해당해요. 1금융권(시중은행) 대출은 대상이 아니에요. 연체 중이면 해소 후 신청해야 해요.",
    },
    saving: {
      title: "이자가 얼마나 줄어드는지 궁금하다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "아래 계산기에 현재 대출금액과 현재 금리를 입력하면 햇살론으로 갈아탔을 때 절감 이자를 바로 볼 수 있어요.",
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
            { id: "apply",    label: "카드론·대부업 대출을 햇살론으로 갈아타고 싶어요." },
            { id: "eligible", label: "내 대출이 대환 대상인지 모르겠어요." },
            { id: "saving",   label: "이자가 얼마나 줄어드는지 계산해보고 싶어요." },
          ].map((item: any) => (
            <button
              key={item.id}
              onClick={(: any) => setType(item.id)}
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
          onClick={(: any) => setType(null)}
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

function EligibilityTable() {
  const rows = [
    { item: "대환 대상 대출",   val: "연 10% 초과 고금리 대출 (카드론·캐피탈·저축은행·대부업)" },
    { item: "대환 불가 대출",   val: "1금융권(시중은행) 대출, 현재 연체 중인 대출" },
    { item: "신청 자격 (일반)", val: "신용점수 하한 이상, 연소득 3,500만원 이하" },
    { item: "신청 자격 (특례)", val: "신용점수 하위 10% 이내, 연소득 4,500만원 이하" },
    { item: "대환 한도",        val: "최대 2,000만원 (기존 대출 잔액 범위 내)" },
    { item: "금리",             val: "연 10.5~15.9% (보증 유형·신용도에 따라 상이)" },
    { item: "상환 기간",        val: "최대 5년 (60개월)" },
  ];

  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <tbody>
          {rows.map((r: any, i: any) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid #e5e7eb",
                background: i % 2 === 0 ? "#fff" : "#fafafa",
              }}
            >
              <td style={{ padding: "9px 12px", fontWeight: 700, color: GD, width: "35%", background: GL }}>
                {r.item}
              </td>
              <td style={{ padding: "9px 12px", color: "#374151" }}>{r.val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SavingCalc() {
  const [amount,  setAmount]  = useState(1000);
  const [curRate, setCurRate] = useState(20);
  const [months,  setMonths]  = useState(36);

  const newRate = 13;
  const curMonthly  = Math.round((amount * 10000) * (curRate / 100 / 12));
  const newMonthly  = Math.round((amount * 10000) * (newRate / 100 / 12));
  const totalSaving = Math.round((curMonthly - newMonthly) * months / 10000);

  const sliders = [
    { label: "대출 잔액 (만원)", val: amount,  set: setAmount,  min: 100,  max: 2000, step: 100, disp: `${amount.toLocaleString()}만원` },
    { label: "현재 금리",        val: curRate, set: setCurRate, min: 10,   max: 40,   step: 1,   disp: `연 ${curRate}%` },
    { label: "남은 기간",        val: months,  set: setMonths,  min: 6,    max: 60,   step: 6,   disp: `${months}개월` },
  ];

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        현재 대출 금액과 금리를 입력하면 햇살론(연 13% 기준)으로 갈아탔을 때 절감 이자가 나와요.
      </p>
      {sliders.map((s: any) => (
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
            onChange={(e: any) => s.set(+e.target.value)}
            style={{ flex: 1, accentColor: G }}
          />
          <span style={{ fontSize: 12, fontWeight: 700, minWidth: 70, textAlign: "right" }}>
            {s.disp}
          </span>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
        <div style={{ background: "#FEF2F2", borderRadius: 8, padding: "12px 14px" }}>
          <p style={{ fontSize: 11, color: "#DC2626", margin: "0 0 4px" }}>현재 월 이자</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#DC2626", margin: 0 }}>
            {curMonthly.toLocaleString()}원
          </p>
        </div>
        <div style={{ background: GL, borderRadius: 8, padding: "12px 14px" }}>
          <p style={{ fontSize: 11, color: GD, margin: "0 0 4px" }}>대환 후 월 이자</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: G, margin: 0 }}>
            {newMonthly.toLocaleString()}원
          </p>
        </div>
        <div style={{ background: GL, borderRadius: 8, padding: "12px 14px" }}>
          <p style={{ fontSize: 11, color: GD, margin: "0 0 4px" }}>총 절감 이자</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: G, margin: 0 }}>
            약 {totalSaving.toLocaleString()}만원
          </p>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, lineHeight: 1.7 }}>
        ※ 이자만 계산. 실제 햇살론 금리는 연 10.5~15.9% 범위 내에서 결정돼요.
      </p>
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
            onClick={(: any) => toggle(i)}
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

export default function HatSalRefinancePage() {
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
          서민금융 · 햇살론 · 대환대출
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          햇살론 대환대출 조건 |<br />
          고금리 대출 갈아타기 신청 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          카드론·대부업 이자가 너무 무거워서 매달 힘드셨죠.<br />
          <strong>연 10% 초과 고금리 대출을 햇살론으로 갈아타면 이자 부담을 크게 줄일 수 있어요.</strong><br /><br />
          단, 현재 연체 중이거나 1금융권 대출은 대환 대상이 아니에요. 내 상황부터 보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>내 대출이 대환 대상인지, 조건은 뭔지 알아볼게요</H2>
        <p style={body}>
          대환 대상 여부는 대출 종류와 금리, 현재 연체 여부로 결정돼요.<br />
          카드론·캐피탈·저축은행·대부업은 해당이지만, 시중은행 대출이나 연체 중인 대출은 안 돼요.<br />
          아래 표로 내 대출이 해당하는지 먼저 보세요.
        </p>
        <Bdg>대환 조건 한눈에 보기</Bdg>
        <EligibilityTable />
        <GreenBox title="이것만 기억해요">
          연 10% 초과 + 연체 없음 + 신용점수·소득 기준 충족 → 대환 신청 가능<br />
          최대 2,000만원까지, 금리는 연 10.5~15.9%로 낮아져요<br />
          신용점수가 매우 낮다면 특례보증(연소득 4,500만원 이하)을 신청하세요
        </GreenBox>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "0 0 1.5rem" }}>
          <a
            href="tel:1397"
            style={{
              padding: "11px 20px",
              borderRadius: 8,
              background: G,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            📞 1397 전화로 자격 확인
          </a>
          <a
            href="https://www.kinfa.or.kr"
            style={{
              padding: "11px 20px",
              borderRadius: 8,
              background: "#fff",
              border: `1px solid ${G}`,
              color: G,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ↗ 서민금융진흥원 바로가기
          </a>
        </div>

        <Divider />

        <H2>갈아타면 이자가 얼마나 줄어드나요?</H2>
        <p style={body}>
          금리 차이가 작아 보여도 기간이 길어지면 이자 차이가 커요.<br />
          현재 대출 잔액과 금리, 남은 기간을 넣으면 절감 이자가 바로 나와요.
        </p>
        <Bdg>현재 대출 금액·금리·기간을 맞춰보세요</Bdg>
        <SavingCalc />
        <WarnBox title="실제 햇살론 금리는 내 신용도에 따라 달라요">
          위 계산기는 연 13% 기준 추정값이에요. 실제 햇살론 금리는 연 10.5~15.9% 범위 내에서 신용도에 따라 결정돼요. 정확한 금리는 취급 기관 심사 후 확인할 수 있어요.
        </WarnBox>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "0 0 1.5rem" }}>
          <a
            href="https://www.kinfa.or.kr"
            style={{
              padding: "11px 20px",
              borderRadius: 8,
              background: G,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ↗ 지금 대환 신청하러 가기
          </a>
          <a
            href="tel:1397"
            style={{
              padding: "11px 20px",
              borderRadius: 8,
              background: "#fff",
              border: `1px solid ${G}`,
              color: G,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            📞 금리 먼저 확인 (1397)
          </a>
        </div>

        <HubLinks />

        <Divider />

        <H2>신청은 어떻게 해야 하나요?</H2>
        <p style={body}>
          온라인 신청이 어렵다면 1397에 전화하면 가까운 취급 기관을 안내해줘요.<br />
          준비 서류가 완비돼 있으면 보통 3~5 영업일 안에 결과가 나와요.
        </p>
        <div style={{ margin: "12px 0 1.2rem" }}>
          {[
            {
              step: "1397 전화 또는 협약 금융기관 방문",
              desc: "서민금융진흥원 콜센터(1397)에 전화하면 가까운 취급 기관(농협·신협·새마을금고·저축은행 등)을 안내받을 수 있어요.",
            },
            {
              step: "서류 준비",
              desc: "신분증, 소득 증빙 서류(근로소득: 근로소득원천징수영수증, 사업소득: 종합소득세 신고서), 기존 대출 잔액 증명서.",
            },
            {
              step: "심사 및 대환 실행",
              desc: "서류 심사 후 3~5 영업일 내 결과 통보. 승인 시 기존 대출이 즉시 상환 처리되고 햇살론이 실행돼요.",
            },
          ].map((item: any, i: any) => (
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
                background: G,
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
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "0 0 1.5rem" }}>
          <a
            href="https://www.kinfa.or.kr"
            style={{
              padding: "11px 20px",
              borderRadius: 8,
              background: G,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ↗ 취급 기관 찾기
          </a>
          <a
            href="tel:1397"
            style={{
              padding: "11px 20px",
              borderRadius: 8,
              background: "#fff",
              border: `1px solid ${G}`,
              color: G,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            📞 서민금융진흥원 1397
          </a>
        </div>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 대출도 되나요?"로 가장 많이 물어보는 것들이에요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            1397에 전화하면 가까운 취급 기관을 안내해줘요
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
