"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 데이터
// 출처: 대한민국 정책브리핑 2026 튼튼머니 공식 공고, 국민체육진흥공단 nfa.kspo.or.kr

const INSTALL_STEPS = [
  {
    title: "구글 플레이스토어 또는 앱스토어 접속",
    desc: "스마트폰에서 구글 플레이(안드로이드) 또는 앱스토어(아이폰)를 열어요.",
    tip: "유사 앱 주의 — 반드시 '튼튼머니' 공식 앱인지 확인하세요",
  },
  {
    title: "'튼튼머니' 검색 후 설치",
    desc: "검색창에 '튼튼머니'를 입력하고 국민체육진흥공단 공식 앱을 설치해요. 개발사가 국민체육진흥공단인지 꼭 확인하세요.",
  },
  {
    title: "앱 실행 후 국민체력100 계정으로 로그인",
    desc: "기존 국민체력100 홈페이지(nfa.kspo.or.kr) 아이디·비밀번호로 로그인해요. 계정이 없으면 앱 내에서 신규 회원가입 가능해요.",
    tip: "홈페이지 계정과 앱 계정은 동일해요",
  },
  {
    title: "적립시설 검색",
    desc: "앱 내 지도에서 내 위치 기반으로 주변 적립시설을 실시간 검색할 수 있어요. 홈페이지보다 훨씬 편리해요.",
  },
  {
    title: "운동 시작 전 QR 스캔 (시작 인증)",
    desc: "시설 내 QR코드를 앱으로 스캔해요. 앱에 로그인된 상태에서 스캔해야 인증이 돼요.",
  },
  {
    title: "30분 이상 운동",
    desc: "시작 인증 후 최소 30분 이상 운동해요. 30분이 지나야 종료 QR 스캔이 가능해요.",
    tip: "29분에 스캔하면 인정 안 돼요",
  },
  {
    title: "운동 종료 후 QR 스캔 (종료 인증)",
    desc: "같은 QR코드를 다시 스캔해요. 시작·종료 두 번 모두 완료되면 500P가 자동 적립돼요.",
  },
];

const APP_FEATURES = [
  { icon: "📍", title: "주변 적립시설 지도 검색", desc: "내 위치 기반으로 가까운 적립시설을 지도에서 실시간 확인. 홈페이지보다 빠르고 직관적이에요." },
  { icon: "📷", title: "QR 인증 (시작·종료)", desc: "앱에서 바로 QR을 스캔해 시작·종료 인증을 완료할 수 있어요. 홈페이지 로그인이 필요 없어요." },
  { icon: "💰", title: "포인트 현황 확인", desc: "내 적립 포인트, 남은 한도, 적립 내역을 한 화면에서 확인해요." },
  { icon: "🎁", title: "문화상품권 교환 (14세 미만)", desc: "14세 미만 회원은 앱에서 5,000P 단위로 문화상품권 교환 신청 가능해요." },
  { icon: "📢", title: "이벤트·특별포인트 공지", desc: "설문·이벤트 등 특별포인트 관련 공지를 앱 알림으로 먼저 받을 수 있어요." },
];

const FAQS = [
  {
    urgent: true,
    q: "앱 출시 전에 홈페이지로 적립했는데, 이제 앱으로 바꿔야 하나요?",
    a: "네. 3월 31일(예정) 앱 출시 후에는 튼튼머니 앱으로만 QR 인증이 가능해요. 홈페이지 QR 인증은 앱 출시 후 사용 불가예요. 반드시 앱을 설치하고 기존 국민체력100 계정으로 로그인하세요. 포인트 기록은 그대로 이어져요.",
  },
  {
    urgent: true,
    q: "앱 설치 후 기존 포인트가 사라지나요?",
    a: "아니에요. 홈페이지에서 쌓은 포인트는 그대로 유지돼요. 앱과 홈페이지는 같은 국민체력100 계정을 공유해요. 기존 아이디·비밀번호로 앱에 로그인하면 포인트 내역이 그대로 보여요.",
  },
  {
    urgent: true,
    q: "유사 앱을 잘못 설치했어요. 어떻게 확인하나요?",
    a: "앱스토어·플레이스토어에서 개발사가 '국민체육진흥공단'인지 확인하세요. 튼튼머니라는 이름의 유사 앱이 있을 수 있어요. 공식 앱이 아니면 QR 인증이 안 되고 포인트도 쌓이지 않아요. 의심스러우면 nfa.kspo.or.kr 공식 홈페이지에서 앱 링크를 찾아 설치하세요.",
  },
  {
    urgent: false,
    q: "앱 없이 홈페이지로도 계속 쓸 수 있나요?",
    a: "앱 출시(3월 31일) 이후에는 스포츠활동 QR 인증은 앱에서만 가능해요. 홈페이지는 적립 현황 확인, 시설 검색, 체력측정 예약 등 일부 기능은 계속 사용할 수 있어요. QR 인증만큼은 반드시 앱이 필요해요.",
  },
  {
    urgent: false,
    q: "스마트폰이 없는 어르신은 어떻게 해요?",
    a: "스마트폰이 없는 경우 일부 시설에서 직원 도움을 받아 인증할 수 있어요. 또는 국민체력100 온라인 운동코칭(1,000P, 홈페이지에서 가능), 체력측정(센터 방문) 등 QR 없이 적립할 수 있는 항목도 있어요. 자세한 내용은 ☎02-410-1414로 문의하세요.",
  },
  {
    urgent: false,
    q: "앱에서 포인트를 제로페이로 전환할 수 있나요?",
    a: "제로페이 스포츠상품권 전환은 튼튼머니 앱이 아니라 제로페이맵 앱에서 해요. 슬리머니 전환은 더헬스 앱, 문화상품권은 튼튼머니 앱에서 가능해요. 앱마다 역할이 다르니 혼동하지 마세요.",
  },
  {
    urgent: false,
    q: "앱 로그인이 안 돼요.",
    a: "국민체력100 홈페이지(nfa.kspo.or.kr)에서 아이디·비밀번호를 먼저 확인하세요. 홈페이지 로그인이 된다면 같은 정보로 앱에서도 로그인할 수 있어요. 계정이 없다면 앱 내에서 신규 가입하면 돼요. 문의: ☎02-410-1414",
  },
];

const HUB_LINKS = [
  { title: "튼튼머니 적립방법 | QR 두 번 찍는 이유", desc: "포인트 안 쌓일 때 원인·해결법", href: "/w/튼튼머니-적립방법" },
  { title: "튼튼머니 사용처 | 제로페이·슬리머니 전환", desc: "쌓은 포인트 어디서 어떻게 쓰는지", href: "/w/튼튼머니-사용처" },
  { title: "튼튼머니 적립시설 찾기 | 내 헬스장 되는지", desc: "지정시설 검색법과 등록 기준", href: "/w/튼튼머니-적립시설" },
  { title: "튼튼머니 포인트 계산 | 5만원 채우려면 몇 번?", desc: "활동별 포인트 계산기", href: "/w/튼튼머니-포인트-계산" },
];

const SIDEBAR_LINKS = [
  "튼튼머니 앱 다운로드",
  "튼튼머니 앱 사용법",
  "튼튼머니 앱 로그인 방법",
  "튼튼머니 앱 QR 인증",
  "튼튼머니 앱 출시일",
  "튼튼머니 앱 설치 안됨",
  "튼튼머니 앱 유사앱 주의",
  "국민체력100 앱 차이",
  "튼튼머니 홈페이지 인증",
  "튼튼머니 적립방법",
  "튼튼머니 사용처",
  "튼튼머니 적립시설 찾기",
  "튼튼머니 포인트 계산",
  "제로페이맵 앱",
  "국민체육진흥공단 문의",
];

// ─── 디자인 토큰
const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

// ─── 상단 버튼
function ApplyButtons() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
      <a href="https://nfa.kspo.or.kr" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
        📱 튼튼머니 앱 다운로드
      </a>
      <a href="https://nfa.kspo.or.kr" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
        🌐 국민체력100 홈페이지
      </a>
    </div>
  );
}

// ─── 긴급 배너
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    change: {
      title: "홈페이지 인증에서 앱 인증으로 바뀐 분께",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "3월 31일 앱 출시 후에는 QR 인증이 앱에서만 가능해요. 홈페이지 QR은 더 이상 사용할 수 없어요. 기존 국민체력100 아이디·비밀번호로 앱에 로그인하면 포인트 기록은 그대로 이어져요.",
    },
    new: {
      title: "처음 시작하는 분께",
      color: G,
      bg: GL,
      text: "플레이스토어 또는 앱스토어에서 '튼튼머니'를 검색해 설치하세요. 개발사가 국민체육진흥공단인지 꼭 확인하세요. 국민체력100 계정이 없으면 앱 내에서 바로 회원가입 가능해요.",
    },
    trouble: {
      title: "앱 로그인이 안 된다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "홈페이지(nfa.kspo.or.kr)에서 먼저 로그인을 시도해보세요. 홈페이지 로그인이 된다면 같은 정보로 앱에서도 로그인할 수 있어요. 안 된다면 비밀번호 재설정 후 시도하거나 ☎02-410-1414로 문의하세요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "change",  label: "홈페이지로 인증했는데 이제 앱으로 바꿔야 한다고 해요." },
          { id: "new",     label: "처음 시작해요. 앱 어디서 받아요?" },
          { id: "trouble", label: "앱 설치했는데 로그인이 안 돼요." },
        ].map((item: any) => (
          <button key={item.id} onClick={(_e: any) => setType(item.id)} style={{
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
        <button onClick={(_e: any) => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 앱 전후 비교 체커
function BeforeAfterChecker() {
  const [period, setPeriod] = useState(null);

  const info = {
    before: {
      label: "앱 출시 전 (~ 3월 30일)",
      color: "#D97706",
      bg: "#FFFBEB",
      items: [
        { ok: true,  text: "국민체력100 홈페이지(nfa.kspo.or.kr)에서 QR 인증" },
        { ok: true,  text: "홈페이지에서 로그인 후 시작·종료 QR 스캔" },
        { ok: false, text: "튼튼머니 앱 없이도 적립 가능" },
        { ok: true,  text: "포인트 현황은 홈페이지 마이페이지에서 확인" },
      ],
    },
    after: {
      label: "앱 출시 후 (3월 31일~)",
      color: G,
      bg: GL,
      items: [
        { ok: true,  text: "튼튼머니 전용 앱에서만 QR 인증 가능" },
        { ok: false, text: "홈페이지 QR 인증 사용 불가" },
        { ok: true,  text: "앱에서 주변 적립시설 지도 검색" },
        { ok: true,  text: "앱에서 포인트 현황·적립 내역 확인" },
        { ok: true,  text: "14세 미만: 앱에서 문화상품권 교환 신청" },
      ],
    },
  };

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.7 }}>
        앱 출시 전과 후 어떻게 달라지는지 선택해서 확인해보세요.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {["before", "after"].map((key: any) => (
          <button key={key} onClick={(_e: any) => setPeriod(period === key ? null : key)}
            style={{ padding: "12px 14px", borderRadius: 8, border: `2px solid ${period === key ? info[key].color : "#e5e7eb"}`, background: period === key ? info[key].bg : "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, color: period === key ? info[key].color : "#374151", textAlign: "center" }}>
            {info[key].label}
          </button>
        ))}
      </div>
      {period && (
        <div style={{ padding: "14px 16px", borderRadius: 8, background: info[period].bg, border: `1px solid ${info[period].color}33` }}>
          {info[period].items.map((item: any, i: any) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: item.ok ? G : "#DC2626", flexShrink: 0, marginTop: 1 }}>{item.ok ? "✓" : "✗"}</span>
              <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.7 }}>{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 절차 스텝
function ProcessSteps() {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {INSTALL_STEPS.map((s: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < INSTALL_STEPS.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />
          )}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
            {s.tip && (
              <span style={{ display: "inline-block", fontSize: 12, marginTop: 7, background: GL, color: "#0F6E56", borderRadius: 6, padding: "4px 10px" }}>
                {s.tip}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── FAQ
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f: any, i: any) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={(_e: any) => setOpen(open === i ? null : i)}
            style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff" }}>
            <span>
              {f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
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

// ─── CTA
function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>앱 출시 후에는 앱이 필수예요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        튼튼머니 앱 지금 설치하세요.<br />QR 인증은 앱에서만 가능해요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        개발사가 '국민체육진흥공단'인지 반드시 확인하세요.<br />
        기존 홈페이지 계정으로 바로 로그인할 수 있어요.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://nfa.kspo.or.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none" }}>
          📱 앱 다운로드
        </a>
        <a href="tel:0241011414" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 02-410-1414 문의
        </a>
      </div>
    </div>
  );
}

// ─── 허브 링크
function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 튼튼머니 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a key={i} href={link.href} target="_self"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
      <a href="/w/튼튼머니-신청방법" target="_self"
        style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>
        튼튼머니 전체 가이드 보기 →
      </a>
    </div>
  );
}

// ─── 출처
function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {[
        { category: "공식 자료", items: [
          { label: "대한민국 정책브리핑 — 2026 튼튼머니 공식 공고", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148959930" },
          { label: "국민체력100 공식 홈페이지 (nfa.kspo.or.kr)", url: "https://nfa.kspo.or.kr" },
          { label: "국민체육진흥공단 문의 ☎02-410-1414", url: "tel:0241011414" },
        ]},
      ].map((group: any) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item: any) => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요. 앱 출시일·기능은 변경될 수 있으니 반드시 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

// ─── 사이드바
function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>튼튼머니 관련 글</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" target="_self"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── 메인
export default function TtuntunMoneyAppPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>복지 · 스포츠 · 국민체육진흥공단</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          튼튼머니 앱 사용법 |<br />
          설치·로그인·QR 인증 순서
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          앱 출시 전에 홈페이지로 인증했던 방식이 3월 31일부터 바뀌었어요.<br />
          이제는 튼튼머니 전용 앱에서만 QR 인증이 가능해요.<br /><br />
          아직 앱을 설치 안 했다면 지금 바로 설치하세요. 기존 포인트는 그대로 이어져요.
        </p>

        <ApplyButtons />
        <UrgentBanner />

        <Bdg>앱 출시 전후 인증 방식 비교</Bdg>
        <BeforeAfterChecker />

        <p style={body}>
          가장 중요한 변화 하나만 기억하세요.<br />
          <strong>3월 31일 이후 QR 인증 = 앱에서만.</strong> 홈페이지 QR은 더 이상 사용할 수 없어요.
        </p>

        <Divider />

        <H2>튼튼머니 앱, 설치부터 QR 인증까지</H2>
        <p style={body}>
          처음 설치해서 첫 QR 인증까지 7단계예요.<br />
          한 번만 해보면 그다음부터는 운동 전후로 스캔하는 것만 남아요.
        </p>
        <Bdg>설치·인증 절차</Bdg>
        <ProcessSteps />
        <BorderBox title="유사 앱 설치 주의">
          앱스토어·플레이스토어에서 '튼튼머니'를 검색하면 유사 앱이 함께 나올 수 있어요.<br />
          반드시 개발사가 <strong>국민체육진흥공단</strong>인지 확인하세요.<br />
          공식 앱이 아니면 QR 인증이 안 되고 포인트가 쌓이지 않아요.
        </BorderBox>

        <Divider />

        <H2>앱에서 할 수 있는 것들</H2>
        <p style={body}>
          앱은 QR 인증 외에도 여러 기능을 제공해요.<br />
          특히 위치 기반 시설 지도 검색은 홈페이지보다 훨씬 편리해요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, margin: "12px 0 1.2rem" }}>
          {APP_FEATURES.map((f: any, i: any) => (
            <div key={i} style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px", border: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: 20, marginBottom: 8 }}>{f.icon}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 6 }}>{f.title}</p>
              <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <Divider />

        <H2>앱별 역할 구분 — 헷갈리기 쉬운 부분</H2>
        <p style={body}>
          튼튼머니 관련 앱이 여러 개라서 헷갈릴 수 있어요.<br />
          어떤 앱에서 무엇을 해야 하는지 정리했어요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["앱 이름", "주요 역할", "사용 시점"].map((h: any) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { app: "튼튼머니 앱", role: "QR 인증·시설 검색·포인트 확인·문화상품권 교환", when: "운동 전후 매번" },
                { app: "제로페이맵 앱", role: "튼튼머니→스포츠상품권 전환·가맹점 검색·결제", when: "포인트 전환할 때" },
                { app: "더헬스(The Health) 앱", role: "튼튼머니→슬리머니 전환·슬리몰 쇼핑", when: "슬리머니 전환할 때" },
                { app: "국민체력100 홈페이지", role: "회원가입·체력측정 예약·포인트 조회 (QR 인증 불가)", when: "가입·예약할 때" },
              ].map((row: any, i: any) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: G }}>{row.app}</td>
                  <td style={{ padding: "10px 12px", color: "#374151" }}>{row.role}</td>
                  <td style={{ padding: "10px 12px", color: "#6b7280" }}>{row.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <GreenBox title="이것만 기억하세요">
          운동 인증 = 튼튼머니 앱<br />
          포인트 전환(제로페이) = 제로페이맵 앱<br />
          포인트 전환(슬리머니) = 더헬스 앱<br />
          회원가입·체력측정 예약 = 국민체력100 홈페이지
        </GreenBox>

        <HubLinks />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요. 앱 출시일·기능·인증 방식은 변경될 수 있으니 중요한 결정 전에 반드시 국민체력100 공식 홈페이지(nfa.kspo.or.kr)를 직접 확인하세요. 문의: ☎02-410-1414
        </div>
      </div>
    </div>
  );
}
