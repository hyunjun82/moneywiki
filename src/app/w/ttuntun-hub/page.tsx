import { useState } from "react";

// ─── 데이터
// 출처: 대한민국 정책브리핑 2026 튼튼머니 공식 공고 (korea.kr), 국민체육진흥공단

const SPOKES = [
  {
    slug: "/w/튼튼머니-적립방법",
    title: "적립방법 | QR 두 번 찍는 이유",
    desc: "포인트가 안 쌓일 때 → 이 글",
    tag: "가장 많이 찾는 글",
    tagColor: "#DC2626",
    tagBg: "#FEF2F2",
    icon: "📱",
  },
  {
    slug: "/w/튼튼머니-사용처",
    title: "사용처 | 제로페이·슬리머니·문화상품권",
    desc: "쌓은 포인트 어디서 어떻게 쓰는지",
    tag: "전환 방법",
    tagColor: "#2563EB",
    tagBg: "#EFF6FF",
    icon: "💳",
  },
  {
    slug: "/w/튼튼머니-적립시설",
    title: "적립시설 | 내 헬스장 되는지 확인",
    desc: "지정시설 검색법과 등록 기준",
    tag: "시설 확인",
    tagColor: "#7C3AED",
    tagBg: "#F5F3FF",
    icon: "📍",
  },
  {
    slug: "/w/튼튼머니-포인트-계산",
    title: "포인트 계산 | 5만원 채우려면 몇 번?",
    desc: "내 루틴으로 포인트 계산기",
    tag: "계산기",
    tagColor: "#1D9E75",
    tagBg: "#E1F5EE",
    icon: "🧮",
  },
  {
    slug: "/w/튼튼머니-앱",
    title: "앱 사용법 | 설치·로그인·QR 인증",
    desc: "앱 출시 후 인증 방법 단계별 안내",
    tag: "앱",
    tagColor: "#D97706",
    tagBg: "#FFFBEB",
    icon: "📲",
  },
  {
    slug: "/w/튼튼머니-어린이",
    title: "어린이 참여 | 4세 이상·문화상품권",
    desc: "가족 단위 참여·아이 포인트 사용법",
    tag: "가족",
    tagColor: "#059669",
    tagBg: "#ECFDF5",
    icon: "👨‍👩‍👧‍👦",
  },
];

const STEPS = [
  {
    title: "국민체력100 회원가입",
    desc: "nfa.kspo.or.kr 또는 튼튼머니 앱에서 가입해요. 만 4세 이상 누구나 가능해요. 별도 신청서 제출 없이 가입만 하면 돼요.",
    link: { label: "nfa.kspo.or.kr 가입", url: "https://nfa.kspo.or.kr" },
  },
  {
    title: "내 운동 시설이 적립시설인지 확인",
    desc: "아무 헬스장이나 되는 게 아니에요. nfa.kspo.or.kr에서 시설명으로 검색해서 지정 여부를 먼저 확인하세요. 전국 약 4,000개 시설이 등록돼 있어요.",
    tip: "목록에 없으면 시설에 등록 요청",
  },
  {
    title: "튼튼머니 앱 설치",
    desc: "3월 31일 앱 출시 후에는 앱으로만 QR 인증이 가능해요. 플레이스토어·앱스토어에서 '튼튼머니'를 검색해 설치하고 기존 계정으로 로그인하세요.",
    tip: "개발사 국민체육진흥공단인지 확인",
  },
  {
    title: "운동 전 QR 시작 인증 → 30분 운동 → QR 종료 인증",
    desc: "시설 내 QR코드를 시작 전 한 번, 30분 운동 후 한 번 더 스캔해요. 두 번 모두 완료해야 500P가 적립돼요.",
    tip: "한 번만 찍으면 0P — 두 번 필수",
  },
  {
    title: "포인트 모이면 제로페이로 전환",
    desc: "12월 20일까지 제로페이·슬리머니·문화상품권으로 전환해야 해요. 전환 안 하면 소멸돼요. 전환한 제로페이는 5년간 유효해요.",
    tip: "포인트 쌓이면 바로바로 전환 권장",
  },
];

const FAQS = [
  {
    urgent: true,
    q: "헬스장 다니는데 포인트가 한 번도 안 쌓였어요.",
    a: "두 가지를 확인하세요. ① 내 헬스장이 튼튼머니 지정 적립시설인지 — nfa.kspo.or.kr에서 시설명 검색. ② QR 인증을 시작·종료 두 번 모두 찍었는지 — 한 번만 찍으면 0P예요. 이 두 가지가 가장 많은 실패 원인이에요.",
  },
  {
    urgent: true,
    q: "신청서를 따로 제출해야 하나요?",
    a: "아니에요. 별도 신청서가 없어요. 국민체력100 홈페이지에 회원가입하고, 지정 시설에서 QR 인증하면 자동으로 포인트가 쌓여요. '신청'이 아니라 '인증'이 핵심이에요.",
  },
  {
    urgent: true,
    q: "지금 시작해도 5만원 채울 수 있나요?",
    a: "2026년 적립 기간은 11월 30일까지예요. 오늘(3월 말) 기준 약 35주 남았어요. 주 3회 운동하면 35주 × 3회 = 105회로 100회 한도를 충분히 채울 수 있어요. 예산 소진 시 조기 종료될 수 있으니 지금 바로 시작하세요.",
  },
  {
    urgent: false,
    q: "포인트를 현금으로 받을 수 있나요?",
    a: "안 돼요. 제로페이 스포츠상품권, 슬리머니, 또는 문화상품권으로 전환해서 사용해야 해요. 전환 후 제로페이는 전국 8만 6천 곳에서 현금처럼 쓸 수 있어요.",
  },
  {
    urgent: false,
    q: "가족이 함께 참여할 수 있나요?",
    a: "네. 4세 이상이면 가족 각자 계정을 만들어 각자 포인트를 쌓을 수 있어요. 4인 가족이 모두 참여하면 최대 20만원 상당까지 가능해요. 14세 미만 아이는 문화상품권으로 교환해요.",
  },
  {
    urgent: false,
    q: "온라인으로도 포인트를 받을 수 있나요?",
    a: "네. 국민체력100 온라인 운동코칭에 참여하면 1,000P를 집에서 바로 받을 수 있어요. 가입 후 제일 먼저 해두면 좋은 항목이에요. 스포츠활동은 지정 시설 방문이 필수예요.",
  },
  {
    urgent: false,
    q: "적립 기간 내에 전환도 완료해야 하나요?",
    a: "아니에요. 적립 기간(~11월 30일)과 전환 기간(~12월 20일)이 별도예요. 11월 30일까지 포인트를 쌓고, 12월 20일까지 전환하면 돼요. 단, 예산 소진 시 전환도 조기 종료될 수 있어요.",
  },
];

const SIDEBAR_LINKS = [
  "튼튼머니 신청방법",
  "튼튼머니 2026 참여 방법",
  "튼튼머니 적립방법",
  "튼튼머니 사용처",
  "튼튼머니 적립시설 찾기",
  "튼튼머니 포인트 계산",
  "튼튼머니 앱 다운로드",
  "튼튼머니 어린이 참여",
  "튼튼머니 제로페이 전환",
  "튼튼머니 5만원 받는 법",
  "튼튼머니 QR 인증 방법",
  "국민체력100 회원가입",
  "튼튼머니 포인트 소멸",
  "튼튼머니 가족 참여",
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
function H2({ children }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }) {
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
        🏃 국민체력100 지금 가입하기
      </a>
      <a href="https://nfa.kspo.or.kr/spoint/selectSpointFacility.kspo" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
        📍 내 주변 적립시설 검색
      </a>
    </div>
  );
}

// ─── 긴급 배너
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    first: {
      title: "처음 참여하는 분께",
      color: G,
      bg: GL,
      text: "별도 신청서는 없어요. nfa.kspo.or.kr에서 회원가입 → 내 시설이 적립시설인지 확인 → 튼튼머니 앱 설치 → 운동 전후 QR 두 번 스캔. 이게 전부예요. 처음 한 번만 해보면 그다음부터는 자연스럽게 습관이 돼요.",
    },
    notearning: {
      title: "운동하는데 포인트가 안 쌓인다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "원인 95%는 셋 중 하나예요. ① 지정 적립시설이 아닌 곳에서 운동 ② QR 종료 인증을 안 함 ③ 앱 출시 후에도 홈페이지로 인증 시도. 아래 스포크 글에서 각 문제별 해결법을 확인하세요.",
    },
    use: {
      title: "포인트를 어디서 써야 하는지 모른다면",
      color: "#2563EB",
      bg: "#EFF6FF",
      text: "제로페이맵 앱에서 1,000P 단위로 스포츠상품권 전환 후 전국 8만 6천 곳에서 사용해요. 14세 미만 아이는 문화상품권으로 교환해요. 12월 20일까지 전환 안 하면 소멸돼요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "first",     label: "튼튼머니 처음 알았어요. 어떻게 시작해요?" },
          { id: "notearning", label: "헬스장 다니는데 포인트가 안 쌓여요." },
          { id: "use",       label: "포인트를 어디서 써야 하는지 모르겠어요." },
        ].map((item) => (
          <button key={item.id} onClick={() => setType(item.id)} style={{
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
        <button onClick={() => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 스포크 카드 (개별 — PAA H2와 함께 사용)
function SpokeCard({ s }) {
  return (
    <a href={s.slug} target="_self"
      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", textDecoration: "none", margin: "10px 0 1.2rem" }}>
      <span style={{ fontSize: 24, flexShrink: 0 }}>{s.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{s.title}</span>
          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: s.tagBg, color: s.tagColor, fontWeight: 600, flexShrink: 0 }}>{s.tag}</span>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{s.desc}</p>
      </div>
      <span style={{ color: G, fontSize: 16, flexShrink: 0, fontWeight: 700 }}>›</span>
    </a>
  );
}

// ─── 절차 스텝
function ProcessSteps() {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < STEPS.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />
          )}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
            {s.link && (
              <div style={{ marginTop: 8 }}>
                <a href={s.link.url} target="_self"
                  style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600 }}>
                  🌐 {s.link.label}
                </a>
              </div>
            )}
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
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)}
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>지금 시작해도 충분해요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        운동하면 연 최대 5만원.<br />신청이 아니라 인증이에요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        가입하고 QR 두 번만 찍으면 500P씩 쌓여요.<br />
        예산 소진 시 조기 종료될 수 있으니 지금 바로 시작하세요.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://nfa.kspo.or.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none" }}>
          🌐 국민체력100 가입하기
        </a>
        <a href="tel:0241011414" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 02-410-1414 문의
        </a>
      </div>
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
        { category: "전환·사용처", items: [
          { label: "제로페이 공식 홈페이지 — 가맹점 검색", url: "https://www.zeropay.or.kr" },
        ]},
      ].map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요. 포인트 기준·예산은 변경될 수 있으니 반드시 공식 출처를 직접 확인하세요.
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

// ─── 메인
export default function TtuntunMoneyHubPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>복지 · 스포츠 · 국민체육진흥공단</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          튼튼머니 신청방법 2026 |<br />
          QR 인증·포인트 적립·제로페이 전환
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          헬스장 다니고 있는데 포인트를 한 번도 못 받고 있다면, 신청이 아니라 '인증'을 안 한 거예요.<br />
          튼튼머니는 별도 신청서가 없어요. 가입하고 QR만 찍으면 돼요.<br /><br />
          2026년 적립 기간은 11월 30일까지예요. 지금 바로 시작하세요.
        </p>

        <ApplyButtons />
        <UrgentBanner />

        <Divider />

        <H2>튼튼머니가 뭐예요? 운동하면 진짜 5만원 받을 수 있나요</H2>
        <p style={body}>
          국민체육진흥공단이 운영하는 스포츠 활동 인센티브예요. 받을 수 있어요.<br />
          만 4세 이상 누구나 소득 기준 없이 참여할 수 있어요.<br />
          지정 시설에서 30분 운동 + QR 두 번 = 500P. 연 최대 5만P = 5만원 상당이에요.
        </p>
        <GreenBox title="2026 튼튼머니 핵심 정보">
          참여 대상: 만 4세 이상 국민 누구나 (소득 기준 없음)<br />
          적립 기간: 2026년 2월 23일 ~ 11월 30일<br />
          전환 기간: 2026년 3월 말 ~ 12월 20일<br />
          기본 한도: 연 최대 5만P (스포츠활동 100회 × 500P)<br />
          사용처: 제로페이 가맹점 약 8만 6천 곳 · 슬리몰 · 문화상품권<br />
          문의: nfa.kspo.or.kr / ☎02-410-1414
        </GreenBox>

        <Divider />

        <H2>튼튼머니 신청방법, 어떻게 시작하면 되나요</H2>
        <p style={body}>
          별도 신청서가 없어요. 가입하고 QR 찍으면 바로 시작이에요.<br />
          가입 → 시설 확인 → 앱 설치 → QR 인증 → 전환. 5단계가 전부예요.
        </p>
        <Bdg>참여 절차</Bdg>
        <ProcessSteps />
        <BorderBox title="딱 하나만 기억하세요">
          QR을 시작할 때 한 번, 30분 후 종료할 때 한 번 — 두 번 모두 찍어야 500P예요.<br />
          한 번만 찍으면 0P. 이게 가장 많은 실패 원인이에요.
        </BorderBox>

        <Divider />

        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 주제별로 더 자세히 알아보세요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SPOKES.map((s, i) => (
              <a key={i} href={s.slug} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < SPOKES.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
                <span style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{s.title}</span>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{s.desc}</span>
                </span>
                <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
              </a>
            ))}
          </div>
        </div>

        <Divider />

        <H2>튼튼머니 포인트 항목별로 얼마나 적립되나요</H2>
        <p style={body}>
          스포츠활동만 해도 연 5만P지만, 체력측정·온라인 운동코칭을 더하면 더 빠르게 채울 수 있어요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["항목", "포인트", "한도", "비고"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { item: "온라인 운동코칭",       pt: "1,000P",  limit: "연 1회",     note: "집에서 바로 가능" },
                { item: "스포츠활동 (30분↑)",    pt: "500P/회", limit: "하루 1회·주 5회·연 100회", note: "지정시설 QR 인증 필수" },
                { item: "간편 체력측정",         pt: "2,000P/회", limit: "최대 4회", note: "헬스업 앱 연계" },
                { item: "국민체력100 체력측정",  pt: "2,000P/회", limit: "최대 2회", note: "체력인증센터 예약 필수" },
                { item: "특별포인트",            pt: "별도",     limit: "최대 30,000P", note: "이벤트·설문·우수자 별도 공고" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: G }}>{row.item}</td>
                  <td style={{ padding: "10px 12px", color: "#374151", fontWeight: 600 }}>{row.pt}</td>
                  <td style={{ padding: "10px 12px", color: "#374151" }}>{row.limit}</td>
                  <td style={{ padding: "10px 12px", color: "#6b7280", fontSize: 12 }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H2>튼튼머니 관련해서 많이 헷갈리는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공을 목적으로 작성됐어요. 포인트 기준·예산·앱 출시일은 변경될 수 있으니, 중요한 결정 전에 반드시 국민체력100 공식 홈페이지(nfa.kspo.or.kr)를 직접 확인하세요. 문의: ☎02-410-1414
        </div>
      </div>
    </div>
  );
}
