"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 중소벤처기업부 공고 제2026-37호
// 지원금액: 25만원 (1개사당)
// 매출기준: 2025년 연매출 0원 초과 1억 400만원 미만
// 개업일: 2025년 12월 31일 이전
// 이의신청 기한: 탈락 안내 후 10일 이내
// 이의신청 경로: voucher.sbiz24.kr 로그인 → 신청 현황 → 이의신청
// 면세사업자 서류: 전자(세금)계산서·현금영수증·카드매출·주업종코드 4종
// 사용기한: 2026년 12월 31일 (이월 없음, 국고 회수)
// 콜센터: 1533-0600 (평일 09~18시)

const DENIAL_REASONS = [
  {
    id: "sales",
    icon: "💰",
    label: "매출 기준 초과 또는 0원",
    desc: "2025년 연매출이 1억 400만원 이상이거나 0원(미신고)인 경우",
    color: "#DC2626", bg: "#FEF2F2",
    solution: "이의신청 가능해요. 2025년 개업자라면 연 환산 계산 오류일 수 있어요. 면세사업자라면 매출이 0원으로 잡혔을 수 있어요. 탈락 안내 후 10일 이내에 voucher.sbiz24.kr에서 이의신청 하세요.",
    canAppeal: true,
  },
  {
    id: "industry",
    icon: "🚫",
    label: "제외 업종",
    desc: "유흥업·도박·담배도매·가상자산·금융업·병원(보건업)·법무·세무·회계업 등",
    color: "#7C3AED", bg: "#F5F3FF",
    solution: "이의신청이 어려운 경우예요. 본인 업종이 정말 제외 업종인지 콜센터(☎1533-0600)에 업종코드로 확인해보세요. 일부 업종은 예외 조항이 있어요 (부동산관리업·유사의료업 등).",
    canAppeal: false,
  },
  {
    id: "closed",
    icon: "🔒",
    label: "휴업·폐업 상태",
    desc: "신청일 기준 국세청에 휴업 또는 폐업으로 등록된 경우",
    color: "#D97706", bg: "#FFFBEB",
    solution: "실제로 영업 중인데 휴폐업으로 잡혔다면 이의신청 가능해요. 사업자등록증 정보를 업데이트하고 콜센터(☎1533-0600)에 문의하세요.",
    canAppeal: true,
  },
  {
    id: "opendate",
    icon: "📅",
    label: "개업일 기준 미충족",
    desc: "사업자등록증 기준 개업일이 2026년 1월 1일 이후인 경우",
    color: "#6B7280", bg: "#F9FAFB",
    solution: "해결이 어려운 경우예요. 2025년 12월 31일 이전 개업이 조건이에요. 사업자등록증의 개업연월일을 다시 확인해보세요 (발급일자 아님).",
    canAppeal: false,
  },
  {
    id: "duplicate",
    icon: "🔄",
    label: "중복 신청",
    desc: "1인이 여러 사업체로 이미 신청했거나 공동대표 중 다른 대표가 먼저 신청한 경우",
    color: "#0369A1", bg: "#EFF6FF",
    solution: "1인 1개사 원칙이에요. 다른 사업체로 이미 선정됐거나, 공동대표가 먼저 신청했다면 재신청이 어려워요. 콜센터(☎1533-0600)에 상황을 설명하고 문의하세요.",
    canAppeal: false,
  },
];

const FAQS = [
  {
    urgent: true,
    q: "소상공인 바우처 신청했는데 탈락했어요, 왜 그런가요",
    a: "탈락 이유는 카카오 알림톡으로 안내돼요. 주요 원인은 ① 매출 1억 400만원 초과 또는 0원 ② 제외 업종 ③ 휴·폐업 상태 ④ 개업일 기준 미충족 ⑤ 중복 신청 중 하나예요. 탈락 안내에 사유가 명시돼 있으니 먼저 확인하고, 오류라고 생각되면 10일 이내에 이의신청하세요.",
  },
  {
    urgent: true,
    q: "매출 기준 초과로 탈락했는데 이의신청 할 수 있나요",
    a: "네. 2025년 개업자라면 연 환산 계산이 잘못됐을 수 있어요. 올바른 계산은 '월 평균 매출 × 12개월'이에요. 일 단위로 계산하면 기준 초과가 나올 수 있어요. 탈락 안내 후 10일 이내에 voucher.sbiz24.kr에서 이의신청 메뉴로 매출 증빙 서류를 제출하세요.",
  },
  {
    urgent: true,
    q: "면세사업자라서 매출이 0원으로 잡혔어요, 어떻게 하나요",
    a: "면세사업자는 국세청 과세정보 자동 연계가 안 되는 경우가 있어요. 수정신고가 불가능하니 4가지 서류를 제출해서 재검증 받아야 해요. ① 전자(세금)계산서 내역 ② 현금영수증 매출내역 ③ 카드매출내역 ④ 주업종코드 — 모두 홈택스에서 캡처 또는 PDF로 제출 (엑셀 불가). 탈락 안내 후 10일 이내에 이의신청 메뉴에서 제출하세요.",
  },
  {
    urgent: false,
    q: "바우처 탈락 후 재신청 가능한가요",
    a: "이의신청이 곧 재신청이에요. 탈락 안내 후 10일 이내에 voucher.sbiz24.kr에서 이의신청(의견제출)을 하면 재검증을 받을 수 있어요. 이의신청 기한을 놓치면 해당 회차 신청이 취소될 수 있어요. 이후 추가 모집 공고가 있다면 다시 신청할 수 있지만, 예산 소진 여부에 따라 불가능할 수 있어요.",
  },
  {
    urgent: false,
    q: "이의신청 기한을 놓쳤어요",
    a: "안타깝게도 10일 기한이 지나면 해당 회차 신청이 취소될 수 있어요. 콜센터(☎1533-0600)에 연락해서 추가 모집 일정이나 재신청 가능 여부를 문의해보세요.",
  },
  {
    urgent: false,
    q: "이의신청이 통과되면 바우처는 언제 지급되나요",
    a: "이의신청 승인 후 소상공인시장진흥공단이 카드사에 정보를 전달하고, 카드에 바우처가 자동 등록돼요. 승인 후 보통 영업일 기준 5~10일 이내에 지급 안내가 와요. 지급 후에는 2026년 12월 31일까지 사용해야 해요.",
  },
  {
    urgent: false,
    q: "이의신청 결과는 어떻게 확인하나요",
    a: "voucher.sbiz24.kr에 로그인 후 신청 현황 메뉴에서 확인할 수 있어요. 결과가 확정되면 카카오 알림톡으로도 안내가 와요.",
  },
];

const HUB_LINKS = [
  { title: "소상공인 경영안정 바우처 받을 수 있을까?", sub: "매출 기준과 제외 대상", href: "/w/소상공인-경영안정-바우처-받을-수-있을까" },
  { title: "소상공인 경영안정 바우처 매출 계산 방법", sub: "1억 400만원 기준 정확히 따지는 법", href: "/w/소상공인-경영안정-바우처-매출-계산" },
  { title: "소상공인 경영안정 바우처 신청방법", sub: "소상공인24 온라인 접수 절차", href: "/w/소상공인-경영안정-바우처-신청방법" },
];

const SIDEBAR_LINKS = [
  "소상공인 경영안정 바우처 탈락",
  "소상공인 바우처 이의신청",
  "소상공인 바우처 탈락 이유",
  "소상공인 바우처 재신청",
  "소상공인 바우처 매출 초과 탈락",
  "소상공인 바우처 면세사업자 탈락",
  "소상공인 바우처 휴폐업 탈락",
  "소상공인 바우처 이의신청 기한",
  "소상공인 경영안정 바우처 신청방법",
  "소상공인 경영안정 바우처 대상",
  "소상공인 경영안정 바우처 25만원",
  "소상공인 경영안정 바우처 매출계산",
  "소상공인 경영안정 바우처 2026",
  "voucher.sbiz24.kr",
  "소상공인시장진흥공단 콜센터",
];

const G  = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }: any) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }: any) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }: any) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }: any) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function ApplyButtons() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
      <a href="https://voucher.sbiz24.kr/" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
        📝 이의신청 바로가기
      </a>
      <a href="tel:15330600" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
        📞 콜센터 1533-0600
      </a>
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    sales: {
      title: "매출 기준으로 탈락했다면",
      color: "#DC2626", bg: "#FEF2F2",
      text: "2025년 개업자라면 연 환산 계산을 확인해보세요. 올바른 계산 = 월 평균 매출 × 12개월. 일 단위 계산은 틀렸어요. 면세사업자라면 매출이 0원으로 잡혔을 수 있어요. 탈락 안내 후 10일 이내에 voucher.sbiz24.kr에서 이의신청 하세요.",
    },
    exempt: {
      title: "면세사업자라서 매출 0원으로 탈락했다면",
      color: "#D97706", bg: "#FFFBEB",
      text: "4가지 서류를 제출해야 해요. ① 전자(세금)계산서 내역 ② 현금영수증 매출내역 ③ 카드매출내역 ④ 주업종코드. 모두 홈택스에서 캡처 또는 PDF로 제출 (엑셀 불가). 10일 기한 안에 제출하세요.",
    },
    appeal: {
      title: "이의신청 방법이 궁금하다면",
      color: G, bg: GL,
      text: "voucher.sbiz24.kr 로그인 → 신청 현황 → 이의신청 메뉴에서 사유와 서류를 제출하면 돼요. 탈락 안내를 받은 날로부터 10일 이내에 해야 해요. 기한 초과 시 해당 회차 신청이 취소될 수 있어요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 10 }}>🚨 탈락 통보 받으셨나요? 이의신청 기한은 10일이에요. 지금 바로 확인하세요.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "sales",  label: "매출 기준으로 탈락했어요." },
          { id: "exempt", label: "면세사업자라서 매출 0원으로 탈락했어요." },
          { id: "appeal", label: "이의신청 방법을 알고 싶어요." },
        ].map(item => (
          <button key={item.id} onClick={() => setType(item.id)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
            borderRadius: 8, border: "1px solid #FCA5A5", background: "#fff",
            fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left",
          }}>
            <span style={{ color: "#DC2626", flexShrink: 0 }}>→</span>{item.label}
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

// ─── 탈락 원인 체커 (핵심 컴포넌트)
function DenialChecker() {
  const [selected, setSelected] = useState(null);
  const item = DENIAL_REASONS.find(r => r.id === selected);

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>
        탈락 통보에 명시된 사유를 선택하면 해결 방법이 나와요.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {DENIAL_REASONS.map(r => (
          <button key={r.id} onClick={() => setSelected(selected === r.id ? null : r.id)} style={{
            display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 14px", borderRadius: 8, cursor: "pointer", textAlign: "left",
            border: `2px solid ${selected === r.id ? r.color : "#e5e7eb"}`,
            background: selected === r.id ? r.bg : "#fff",
          }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{r.icon}</span>
            <span>
              <span style={{ fontSize: 13, fontWeight: 600, color: selected === r.id ? r.color : "#111", display: "block", marginBottom: 3 }}>{r.label}</span>
              <span style={{ fontSize: 12, color: "#6b7280" }}>{r.desc}</span>
            </span>
            <span style={{ marginLeft: "auto", fontSize: 11, padding: "3px 8px", borderRadius: 10, flexShrink: 0,
              background: r.canAppeal ? "#DCFCE7" : "#FEE2E2",
              color: r.canAppeal ? "#166534" : "#991B1B", fontWeight: 600 }}>
              {r.canAppeal ? "이의신청 가능" : "이의신청 어려움"}
            </span>
          </button>
        ))}
      </div>

      {item && (
        <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: 8, background: item.bg, border: `1px solid ${item.color}33` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 8 }}>
            {item.canAppeal ? "💡 이의신청 방법" : "⚠️ 해결 방법"}
          </p>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{item.solution}</p>
          {item.canAppeal && (
            <a href="https://voucher.sbiz24.kr/" target="_self"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 12, padding: "6px 14px", borderRadius: 6, background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600 }}>
              voucher.sbiz24.kr 이의신청 →
            </a>
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
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FCA5A5" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)}
            style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FEF2F2" : "#fff" }}>
            <span>
              {f.urgent && <span style={{ fontSize: 11, background: "#DC2626", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && (
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 소상공인 경영안정 바우처 관련 글</p>
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
      <a href="/w/소상공인-경영안정-바우처" target="_self"
        style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>
        소상공인 경영안정 바우처 전체 가이드 보기 →
      </a>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>이의신청 기한 10일 — 지금 바로 하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        오류라면 이의신청으로 뒤집을 수 있어요.<br />탈락 안내 후 10일 이내예요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        voucher.sbiz24.kr → 신청 현황 → 이의신청 메뉴<br />
        문의는 콜센터(☎1533-0600, 평일 09~18시)로 하세요.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://voucher.sbiz24.kr/" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none" }}>
          📝 이의신청 바로가기
        </a>
        <a href="tel:15330600" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 콜센터 1533-0600
        </a>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>소상공인 경영안정 바우처 관련 글</p>
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

export default function VoucherDenialPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>소상공인 지원 · 중소벤처기업부 · 2026</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          소상공인 경영안정 바우처 탈락했다면?<br />
          거절 이유와 이의신청 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          탈락 통보 받으셨죠. 원인은 대부분 매출 기준·제외 업종·휴폐업 상태 셋 중 하나예요.<br />
          이의신청 기한이 10일이니 지금 바로 탈락 사유를 확인하고 대응하세요.<br /><br />
          아래에서 탈락 이유를 선택하면 해결 방법이 바로 나와요.
        </p>

        <ApplyButtons />
        <UrgentBanner />

        <Bdg>탈락 이유 선택 → 해결 방법 확인</Bdg>
        <DenialChecker />

        <Divider />

        <H2>소상공인 바우처 신청했는데 탈락했어요, 왜 그런가요</H2>
        <p style={body}>
          탈락 이유는 카카오 알림톡에 명시돼요. 주요 원인 5가지예요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { n:"①", label:"매출 1억 400만원 초과 또는 0원", detail:"국세청 신고 기준 / 2025년 개업자는 연 환산 계산 오류 가능성 있음", appeal:true },
            { n:"②", label:"제외 업종",                      detail:"유흥업·도박·금융업·병원 등 소상공인 정책자금 융자제외 업종", appeal:false },
            { n:"③", label:"휴업·폐업 상태",                 detail:"신청일 기준 국세청에 휴·폐업으로 등록된 경우", appeal:true },
            { n:"④", label:"개업일 기준 미충족",              detail:"사업자등록증 기준 개업일이 2026년 1월 1일 이후", appeal:false },
            { n:"⑤", label:"중복 신청",                      detail:"1인이 여러 사업체로 신청 또는 공동대표 중 다른 대표가 먼저 신청", appeal:false },
          ].map((row, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"11px 14px", borderRadius:8, background:"#f9fafb", border:"1px solid #e5e7eb" }}>
              <span style={{ fontSize:13, fontWeight:700, color:"#6b7280", flexShrink:0, marginTop:2 }}>{row.n}</span>
              <span style={{ flex:1 }}>
                <span style={{ fontSize:13, fontWeight:600, color:"#111", display:"block", marginBottom:3 }}>{row.label}</span>
                <span style={{ fontSize:12, color:"#6b7280" }}>{row.detail}</span>
              </span>
              <span style={{ fontSize:11, padding:"3px 8px", borderRadius:10, flexShrink:0,
                background: row.appeal ? "#DCFCE7" : "#FEE2E2",
                color: row.appeal ? "#166534" : "#991B1B", fontWeight:600 }}>
                {row.appeal ? "이의신청 가능" : "이의신청 어려움"}
              </span>
            </div>
          ))}
        </div>

        <Divider />

        <H2>매출 기준 초과로 탈락했는데 이의신청 할 수 있나요</H2>
        <p style={body}>
          네. 특히 2025년 개업자는 연 환산 계산 방식을 먼저 확인해보세요.<br />
          일 단위로 계산하면 기준 초과가 나오지만, 올바른 방법(월 평균 × 12개월)으로 계산하면 기준 이하일 수 있어요.
        </p>
        <div style={{ background: "#FFF7ED", borderRadius: 10, padding: "16px 18px", margin: "12px 0 1.2rem", border: "1px solid #FED7AA" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 8 }}>⚠️ 2025년 개업자 — 계산 방식 먼저 확인</p>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 2, margin: 0 }}>
            <span style={{ color: "#DC2626" }}>❌ 잘못된 계산: (2,500만원 ÷ 72일) × 365일 = 1억 2,674만원 → 탈락</span><br />
            <span style={{ color: G }}>✅ 올바른 계산: (2,500만원 ÷ 3개월) × 12개월 = 1억원 → 통과</span><br />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>※ 1개월 미만 끝수는 1개월로 간주 (부가가치세법 제61조제2항)</span>
          </p>
        </div>
        <GreenBox title="이의신청 방법 (매출 기준 탈락 시)">
          경로: voucher.sbiz24.kr 로그인 → 신청 현황 → 이의신청 메뉴<br />
          기한: 탈락 안내를 받은 날로부터 10일 이내<br />
          서류: 매출 증빙 서류 첨부 (면세사업자는 4종 서류 필수)<br />
          기한 초과 시: 해당 회차 신청 취소 — 반드시 기한 내 제출
        </GreenBox>

        <Divider />

        <H2>면세사업자라서 매출이 0원으로 잡혔어요, 어떻게 하나요</H2>
        <p style={body}>
          면세사업자는 국세청 과세정보 자동 연계가 안 되는 경우가 있어요.<br />
          수정신고가 불가능하니 4가지 서류를 제출해서 재검증을 받아야 해요.
        </p>
        <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "0 0 1.2rem" }}>
          {[
            { n:"①", title:"전자(세금)계산서 내역 (분기별)", path:"홈택스 → 전자(세금)계산서·현금영수증·신용카드 → 전자(세금)계산서 조회 → 월/분기별 목록조회" },
            { n:"②", title:"현금영수증 매출내역 누계 (분기별)", path:"홈택스 → 현금영수증 조회·발급수단 → 가맹점 → 현금영수증 매출내역 조회" },
            { n:"③", title:"카드매출내역 (분기별)", path:"홈택스 → 신용카드 매출 → 신용카드 판매(결제)대행 매출자료 조회" },
            { n:"④", title:"주업종코드", path:"홈택스 → 기타 세무정보 → 사업자등록사항 및 담당자 안내" },
          ].map((s, i) => (
            <div key={i} style={{ display:"flex", gap:12, paddingBottom: i < 3 ? 14 : 0, position:"relative" }}>
              {i < 3 && <div style={{ position:"absolute", left:15, top:28, bottom:0, width:1, background:"#e5e7eb" }} />}
              <div style={{ width:30, height:30, borderRadius:"50%", flexShrink:0, background:GL, color:"#0F6E56", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700 }}>{s.n}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{s.title}</div>
                <div style={{ fontSize:12, color:"#6b7280", lineHeight:1.8 }}>{s.path}</div>
              </div>
            </div>
          ))}
          <p style={{ fontSize:12, color:"#DC2626", marginTop:14, background:"#FEF2F2", borderRadius:6, padding:"8px 12px" }}>
            ⚠️ 캡처 또는 PDF 파일로 제출 — 엑셀 파일은 인정 안 돼요
          </p>
        </div>

        <Divider />

        <H2>바우처 탈락 후 재신청 가능한가요</H2>
        <p style={body}>
          이의신청이 곧 재신청이에요.<br />
          탈락 안내 후 10일 이내에 이의신청을 해야 해요. 기한을 넘기면 추가 모집 공고를 기다려야 해요.
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:8, margin:"12px 0 1.2rem" }}>
          {[
            { stage:"탈락 안내 후 10일 이내", action:"이의신청 가능", ok:true, detail:"voucher.sbiz24.kr → 신청 현황 → 이의신청" },
            { stage:"10일 초과",             action:"해당 회차 취소",  ok:false, detail:"콜센터 문의 후 추가 모집 공고 대기" },
            { stage:"이의신청 승인 후",      action:"바우처 지급",      ok:true, detail:"영업일 기준 5~10일 이내 카드 자동 등록" },
          ].map((row, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"11px 14px", borderRadius:8, background: row.ok ? GL : "#FEF2F2", border:`1px solid ${row.ok ? "#9FE1CB" : "#FCA5A5"}` }}>
              <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:10, background: row.ok ? G : "#DC2626", color:"#fff", flexShrink:0, whiteSpace:"nowrap", marginTop:2 }}>{row.stage}</span>
              <span>
                <span style={{ fontSize:13, fontWeight:600, color:"#111", display:"block", marginBottom:3 }}>{row.action}</span>
                <span style={{ fontSize:12, color:"#6b7280" }}>{row.detail}</span>
              </span>
            </div>
          ))}
        </div>
        <BorderBox title="이의신청 승인 후 바우처 사용 주의사항">
          이의신청으로 바우처를 받아도 사용기한은 동일하게 2026년 12월 31일까지예요.<br />
          미사용 잔액은 국고로 회수돼요. 이월 없어요.<br />
          지급 후 카드사 변경은 불가능해요. 신청 시 선택한 카드로만 사용 가능해요.
        </BorderBox>

        <HubLinks />

        <H2>소상공인 경영안정 바우처 탈락, 자주 하는 질문</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />

        <div style={{ marginTop:"2rem" }}>
          <h3 style={{ fontSize:15, fontWeight:600, color:"#374151", marginBottom:14 }}>출처 및 참고자료</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {[
              { label:"중소벤처기업부 공고 제2026-37호 — 이의신청 기한 10일, 면세사업자 서류 명시", url:"https://voucher.sbiz24.kr/" },
              { label:"부가가치세법 제61조제2항 — 1개월 미만 끝수는 1개월로 간주", url:"https://www.law.go.kr/" },
              { label:"소상공인 경영안정 바우처 이의신청 사이트 (voucher.sbiz24.kr)", url:"https://voucher.sbiz24.kr/" },
              { label:"소상공인 경영안정 바우처 전용 콜센터 ☎1533-0600", url:"tel:15330600" },
            ].map(item => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 12px", borderRadius:6, border:"1px solid #f3f4f6", background:"#fafafa", fontSize:13, color:"#374151", textDecoration:"none" }}>
                <span style={{ color:G, fontSize:11, flexShrink:0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop:"1.2rem", padding:"14px 18px", background:"#f9fafb", borderRadius:10, fontSize:12, color:"#9ca3af", lineHeight:1.9 }}>
          이 글은 정보 제공 목적으로 작성됐어요. 이의신청 결과 및 재신청 가능 여부는 소상공인24 또는 소상공인시장진흥공단(☎1533-0600)에서 최종 확인하세요.<br />
          ※ 지원금액 25만원 / 매출기준 1억 400만원 미만 / 개업일 2025년 12월 31일 이전 / 카드사 9개사 (법인카드 불가) / 사용처: 공과금·4대 보험료·차량연료비·전통시장화재공제 (통신비 제외) / 사용기한 2026년 12월 31일 (이월 없음, 국고 회수) / 이의신청 기한 10일 / 근거: 중소벤처기업부 공고 제2026-37호
        </div>
      </div>
    </div>
  );
}
