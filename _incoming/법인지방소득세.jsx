import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 지방세법 제103조의20~제103조의24, 행정안전부 보도자료
// 신고납부기한: 사업연도 종료일이 속한 달 말일부터 4개월 이내
// 12월결산법인: 다음 해 4월 30일까지
// 신고납부시스템: 위택스(wetax.go.kr) / 서울은 이택스(etax.seoul.go.kr)
// 위택스콜센터: 110 / 이택스콜센터: 1566-3900
// 세율: 0.9%~2.4% (지방세법 제103조의20 누진세율)
// 무신고가산세: 납부세액의 20% (부정무신고 40%)
// 과소신고가산세: 과소신고납부세액의 10%
// 납부지연가산세: 미납세액 × 미납일수 × 22/100,000
// 분할납부대상: 납부세액 100만원 초과
// 분할납부기한_일반: 1개월 이내
// 분할납부기한_중소기업: 2개월 이내
// 안분기준: (종업원수/총종업원수 + 건축물연면적/총건축물연면적) ÷ 2

const SPOKES = [
  { title: "법인지방소득세 위택스 신고, 처음인데 어떻게 하나요?", sub: "단계별 절차와 서울 이택스 차이", href: "/w/법인지방소득세-위택스-신고방법" },
  { title: "법인지방소득세, 법인세의 10%라는데 그냥 10% 곱하면 되나요?", sub: "세율과 산출세액 계산법", href: "/w/법인지방소득세-세율-계산" },
  { title: "법인지방소득세 안분신고, 사업장이 두 곳 이상이면 어떻게 나눠 내나요?", sub: "안분 계산 공식과 위택스 작성법", href: "/w/법인지방소득세-안분신고" },
  { title: "법인지방소득세 신고를 못 했다면?", sub: "무신고 가산세와 기한 후 신고 방법", href: "/w/법인지방소득세-가산세-기한후신고" },
  { title: "법인지방소득세 100만원 넘으면 나눠 낼 수 있나요?", sub: "분할납부 조건과 신청방법", href: "/w/법인지방소득세-분할납부" },
];

const SIDEBAR_LINKS = [
  "법인지방소득세 신고방법",
  "법인지방소득세 위택스",
  "법인지방소득세 신고기한",
  "법인지방소득세 세율",
  "법인지방소득세 계산",
  "법인지방소득세 안분신고",
  "법인지방소득세 가산세",
  "법인지방소득세 분할납부",
  "법인지방소득세 서울 이택스",
  "법인지방소득세 무신고",
  "법인지방소득세 기한후신고",
  "법인지방소득세 납부기한연장",
  "법인세 지방소득세 차이",
  "위택스 법인지방소득세",
  "법인지방소득세 근거법령",
];

const FAQS = [
  {
    urgent: true,
    q: "법인세 신고했으면 법인지방소득세는 자동으로 되는 건가요",
    a: "아니에요. 법인지방소득세는 법인세(국세)와 완전히 별개의 세금이에요. 홈택스에서 법인세를 신고해도 위택스에서 법인지방소득세를 따로 신고·납부해야 해요. 12월 결산법인은 4월 30일까지예요. 자동으로 처리되지 않아요.",
  },
  {
    urgent: true,
    q: "법인지방소득세 4월 30일 지나면 어떻게 되나요",
    a: "무신고 가산세 20%가 바로 붙어요. 부정 무신고면 40%예요. 거기다 납부지연 가산세(미납세액 × 미납일수 × 22/100,000)가 매일 쌓여요. 빨리 기한 후 신고를 하면 1개월 이내는 가산세 50% 감면, 3개월 이내는 30% 감면을 받을 수 있어요.",
  },
  {
    urgent: true,
    q: "서울에 본점이 있으면 위택스 말고 이택스에서 해야 하나요",
    a: "서울은 이택스(etax.seoul.go.kr)를 이용하면 돼요. 위택스도 가능하지만 서울시는 이택스가 주된 시스템이에요. 서울 외 지역은 위택스(wetax.go.kr)에서 신고하면 돼요.",
  },
  {
    urgent: false,
    q: "사업장이 여러 지자체에 있으면 각각 신고해야 하나요",
    a: "네. 사업장별로 해당 지자체에 안분신고를 해야 해요. 위택스 안분 작성 기능을 이용하면 한 번에 처리할 수 있어요. 안분 계산은 (종업원수 비율 + 건축물연면적 비율) ÷ 2로 해요.",
  },
  {
    urgent: false,
    q: "법인지방소득세 납부를 나눠서 낼 수 있나요",
    a: "납부세액이 100만원 초과면 분할납부 가능해요. 일반 법인은 1개월, 중소기업은 2개월 이내에 나머지를 내면 돼요. 위택스에서 신고할 때 분할납부를 선택하면 됩니다.",
  },
  {
    urgent: false,
    q: "법인지방소득세 세율이 법인세의 10%라고 하던데 맞나요",
    a: "정확하지 않아요. 법인지방소득세는 법인세 납부세액의 10%가 아니라 법인세 과세표준에 별도 누진세율(0.9%~2.4%)을 적용해서 산출해요. 결과적으로 비슷하게 나오는 경우가 많지만 세액공제·감면 적용 여부에 따라 차이가 생길 수 있어요.",
  },
  {
    urgent: false,
    q: "법인지방소득세 신고는 세무사에게 맡겨야 하나요",
    a: "위택스에서 직접 전자신고가 가능해요. 법인세 신고 때 세무조정 자료가 이미 있다면 그 수치를 그대로 활용해서 신고할 수 있어요. 다만 안분신고가 필요하거나 처음이라면 담당 세무사나 위택스 콜센터(☎110)에 확인하는 게 안전해요.",
  },
];

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

function ActionButtons() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
      <a href="https://www.wetax.go.kr" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
        💻 위택스 신고하기
      </a>
      <a href="https://etax.seoul.go.kr" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
        🏙️ 서울 이택스
      </a>
    </div>
  );
}

// ─── UrgentBanner
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    first: {
      title: "처음 신고하시나요",
      color: G, bg: GL,
      text: "위택스(wetax.go.kr)에 로그인 → 신고하기 → 지방소득세 → 법인소득분 순서로 진행해요. 서울 법인이라면 이택스(etax.seoul.go.kr)에서 해요. 법인세 신고 때 쓴 과세표준 수치를 그대로 입력하면 돼요. 처음이라 막막하면 위택스 콜센터(☎110)에 전화하면 친절히 안내해줘요.",
    },
    late: {
      title: "4월 30일 지났다면",
      color: "#DC2626", bg: "#FEF2F2",
      text: "지금 바로 기한 후 신고를 하세요. 1개월 이내 신고하면 무신고 가산세 50% 감면, 3개월 이내면 30% 감면이에요. 하루라도 빨리 하는 게 유리해요. 위택스 → 신고하기 → 법인소득분 → 기한 후 신고로 진행하면 됩니다.",
    },
    split: {
      title: "세금이 100만원 넘어서 부담된다면",
      color: "#D97706", bg: "#FFFBEB",
      text: "납부세액이 100만원 초과면 분할납부 신청이 가능해요. 일반 법인은 1개월, 중소기업은 2개월 이내에 나머지를 내면 돼요. 위택스 신고 화면에서 분할납부를 선택하면 됩니다.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "first", label: "법인지방소득세 처음 신고해요." },
          { id: "late",  label: "4월 30일이 지났어요." },
          { id: "split", label: "세금이 많아서 나눠 내고 싶어요." },
        ].map(item => (
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

// ─── 신고 타임라인
function Timeline() {
  const steps = [
    { icon: "📋", label: "법인세 신고 완료", sub: "홈택스 — 3월 31일까지 (12월 결산)", done: true },
    { icon: "💻", label: "위택스/이택스 접속", sub: "wetax.go.kr 또는 etax.seoul.go.kr", done: true },
    { icon: "📝", label: "법인지방소득세 신고", sub: "신고하기 → 지방소득세 → 법인소득분", done: false },
    { icon: "💳", label: "납부", sub: "납부세액 100만원 초과 시 분할납부 가능", done: false },
    { icon: "✅", label: "신고납부 완료", sub: "4월 30일까지", done: false },
  ];
  return (
    <div style={{ margin: "10px 0 1.5rem" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 18, position: "relative" }}>
          {i < steps.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 2, background: s.done ? G : "#e5e7eb" }} />
          )}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: s.done ? GL : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
            {s.icon}
          </div>
          <div style={{ paddingTop: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: s.done ? GD : "#111", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 가산세 계산기
function PenaltyCalc() {
  const [tax, setTax] = useState(500);
  const [days, setDays] = useState(30);
  const noReport = Math.round(tax * 0.2);
  const delay    = Math.round(tax * days * 22 / 100000);
  const total    = noReport + delay;

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        신고·납부 기한을 넘겼을 때 얼마나 붙는지 확인해보세요.
      </p>
      {[
        { label: "납부세액", display: `${tax}만원`, min: 10, max: 5000, step: 10, val: tax, set: setTax },
        { label: "연체 일수",  display: `${days}일`,   min: 1,  max: 365, step: 1,  val: days, set: setDays },
      ].map(s => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <label style={{ fontSize: 13, color: "#6b7280", width: 90, flexShrink: 0 }}>{s.label}</label>
          <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
            onChange={e => s.set(+e.target.value)} style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 13, fontWeight: 700, minWidth: 70, textAlign: "right" }}>{s.display}</span>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 16 }}>
        {[
          { label: "무신고 가산세", val: `${noReport}만원`, sub: "납부세액 × 20%", color: "#DC2626", bg: "#FEF2F2" },
          { label: "납부지연 가산세", val: `${delay}만원`, sub: `${days}일 기준`, color: "#D97706", bg: "#FFFBEB" },
          { label: "합계", val: `${total}만원`, sub: "즉시 기한 후 신고 권장", color: G, bg: GL },
        ].map(card => (
          <div key={card.label} style={{ background: card.bg, borderRadius: 8, padding: "12px 14px", border: `1px solid ${card.color}30` }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: card.color, marginBottom: 3 }}>{card.val}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{card.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 무신고가산세(납부세액 × 20%) + 납부지연가산세(미납세액 × 일수 × 22/100,000) 기준. 부정 무신고는 40%. 1개월 이내 기한 후 신고 시 무신고 가산세 50% 감면.
        근거: 지방세기본법 제53조·제55조
      </p>
    </div>
  );
}

// ─── SpokeLinks
function SpokeLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 법인지방소득세 자세히 보기</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {SPOKES.map((link, i) => (
          <a key={i} href={link.href} target="_self"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 4px", borderBottom: i < SPOKES.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.sub}</span>
            </span>
          </a>
        ))}
      </div>
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>4월 30일 마감 — 지금 바로 신고하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        법인세 신고 끝났다고 끝이 아니에요.<br />
        위택스에서 법인지방소득세 따로 해야 해요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        놓치면 무신고 가산세 20% + 납부지연 가산세가 매일 쌓여요.<br />
        위택스 콜센터(☎110, 무료)에 물어보면 바로 안내해줘요.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://www.wetax.go.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none" }}>
          💻 위택스 신고하기
        </a>
        <a href="tel:110" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 위택스 콜센터 110
        </a>
      </div>
    </div>
  );
}

// ─── Sidebar
function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>법인지방소득세 관련 검색어</p>
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

export default function CorporateLocalIncomeTaxHub() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>

        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>법인세금 · 지방세법 · 4월 마감</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          법인지방소득세, 4월 30일 지나면 가산세?<br />
          12월 결산법인 신고납부 기한과 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          법인세 신고했다고 끝이 아니에요. 법인지방소득세는 위택스에서 따로 신고해야 해요.<br />
          12월 결산법인은 4월 30일까지. 안 하면 무신고 가산세 20%가 바로 붙어요.<br /><br />
          지금 어떤 상황인지 선택하면 바로 해결 방법이 나와요.
        </p>

        <ActionButtons />
        <UrgentBanner />

        <Bdg>신고납부 흐름 — 법인세 신고 후 이 순서로</Bdg>
        <Timeline />

        <Divider />

        <H2>법인지방소득세가 법인세랑 다른 세금인가요</H2>
        <p style={body}>
          네. 완전히 별개예요. 법인세는 국세(홈택스), 법인지방소득세는 지방세(위택스)예요.<br />
          법인세 신고해도 법인지방소득세는 자동으로 신고되지 않아요. 반드시 따로 해야 해요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { label: "법인세 (국세)", system: "홈택스 (hometax.go.kr)", deadline: "3월 31일까지", dept: "국세청", ok: true },
            { label: "법인지방소득세 (지방세)", system: "위택스 / 서울은 이택스", deadline: "4월 30일까지", dept: "지방자치단체", ok: false },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderRadius: 8, background: row.ok ? "#f9fafb" : GL, border: `1px solid ${row.ok ? "#e5e7eb" : "#9FE1CB"}` }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2 }}>{row.ok ? "🏛️" : "🏢"}</span>
              <span style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111", display: "block", marginBottom: 5 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: "#6b7280", display: "block" }}>신고 시스템: {row.system}</span>
                <span style={{ fontSize: 12, color: "#6b7280", display: "block" }}>12월 결산 기한: {row.deadline} / 관할: {row.dept}</span>
              </span>
              {!row.ok && <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 10, background: G, color: "#fff", fontWeight: 600, flexShrink: 0 }}>지금 해야 해요</span>}
            </div>
          ))}
        </div>
        <GreenBox title="법인지방소득세 신고·납부 기한 (지방세법 제103조의23)">
          12월 결산법인: 다음 해 4월 30일까지<br />
          기준: 사업연도 종료일이 속한 달의 말일부터 4개월 이내<br />
          연결법인: 5개월 이내 (5월 31일까지)
        </GreenBox>

        <Divider />

        <H2>4월 30일까지 위택스에서 어떻게 신고하나요</H2>
        <p style={body}>
          위택스 로그인 후 5단계로 끝나요. 서울 법인은 이택스에서 동일한 절차로 진행하면 돼요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { n: "1", title: "위택스 접속 후 로그인", detail: "wetax.go.kr → 공동인증서 또는 간편인증 / 서울 법인: etax.seoul.go.kr" },
            { n: "2", title: "신고하기 → 지방소득세 → 법인소득분", detail: "메뉴 경로: 신고하기 > 지방소득세 > 법인소득분 선택" },
            { n: "3", title: "사업자번호 입력 후 과세표준 작성", detail: "법인세 신고 때 사용한 과세표준 수치 그대로 입력. 사업장 2곳 이상이면 안분 작성 필요" },
            { n: "4", title: "산출세액 확인 후 신청 제출", detail: "세율(0.9%~2.4%) 자동 적용. 세액공제·감면 있으면 해당 항목 입력" },
            { n: "5", title: "납부", detail: "납부세액 100만원 초과 시 분할납부 선택 가능. 전자납부·가상계좌·ARS·은행 CD/ATM 이용 가능" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "12px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.8 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, margin: "0 0 1.2rem", flexWrap: "wrap" }}>
          <a href="https://www.wetax.go.kr" target="_self"
            style={{ fontSize: 12, padding: "6px 14px", borderRadius: 6, background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600 }}>
            위택스 바로가기 →
          </a>
          <a href="https://etax.seoul.go.kr" target="_self"
            style={{ fontSize: 12, padding: "6px 14px", borderRadius: 6, background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600 }}>
            서울 이택스 바로가기 →
          </a>
          <a href="tel:110" target="_self"
            style={{ fontSize: 12, padding: "6px 14px", borderRadius: 6, background: "#f3f4f6", color: "#374151", textDecoration: "none", fontWeight: 600 }}>
            위택스 콜센터 ☎110
          </a>
        </div>

        <Divider />

        <H2>사업장이 여러 개면 어떻게 나눠서 내나요</H2>
        <p style={body}>
          사업장이 둘 이상의 지자체에 있으면 안분신고를 해야 해요.<br />
          안분 없이 한 곳에 몰아 납부하면 가산세 대상이 돼요.
        </p>
        <GreenBox title="안분 계산 공식 (지방세법 제103조의21)">
          사업장 납부세액 = 법인지방소득세 산출세액 × 안분율<br /><br />
          안분율 = (해당 사업장 종업원수 / 법인 총 종업원수 + 해당 사업장 건축물연면적 / 법인 총 건축물연면적) ÷ 2<br /><br />
          위택스 '안분 작성' 기능으로 자동 계산 가능
        </GreenBox>
        <BorderBox title="안분신고 주의사항">
          서울시 내 여러 구에 사업장이 있으면 본점 소재지 구에 일괄 신고납부 가능<br />
          안분 오류 발견 시 지자체가 고지하기 전까지 수정신고 가능 (가산세 면제)<br />
          안분 자체를 하지 않고 한 곳에 몰아 낸 경우는 가산세 면제 적용 안 됨
        </BorderBox>

        <Divider />

        <H2>신고 안 하면 가산세가 얼마나 붙나요</H2>
        <p style={body}>
          하루라도 늦으면 무신고 가산세 20%가 붙고, 거기다 납부지연 가산세가 매일 쌓여요.<br />
          슬라이더로 내 상황을 넣어보면 얼마나 붙는지 바로 나와요.
        </p>
        <Bdg>가산세 계산기 — 납부세액과 연체 일수를 넣어보세요</Bdg>
        <PenaltyCalc />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "0 0 1.2rem" }}>
          {[
            { label: "무신고 가산세", rate: "납부세액 × 20%", note: "부정 무신고 시 40%", color: "#DC2626", bg: "#FEF2F2" },
            { label: "과소신고 가산세", rate: "과소신고납부세액 × 10%", note: "실제보다 적게 신고한 경우", color: "#D97706", bg: "#FFFBEB" },
            { label: "납부지연 가산세", rate: "미납세액 × 미납일수 × 22/100,000", note: "한도: 납부세액의 75%", color: "#6B7280", bg: "#F9FAFB" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 14px", borderRadius: 8, background: row.bg, border: `1px solid ${row.color}30` }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: row.color, flexShrink: 0, marginTop: 2, minWidth: 90 }}>{row.label}</span>
              <span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 3 }}>{row.rate}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{row.note}</span>
              </span>
            </div>
          ))}
        </div>
        <div style={{ background: "#FFF7ED", borderRadius: 8, padding: "12px 16px", margin: "0 0 1.2rem", border: "1px solid #FED7AA", fontSize: 13, color: "#374151", lineHeight: 1.9 }}>
          💡 기한 후 신고 시 무신고 가산세 감면<br />
          1개월 이내: 50% 감면 / 3개월 이내: 30% 감면 / 6개월 이내: 20% 감면<br />
          지금 바로 기한 후 신고를 하면 가산세를 줄일 수 있어요.
        </div>

        <SpokeLinks />

        <H2>법인지방소득세, 자주 하는 질문</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />

        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "지방세법 제103조의20~제103조의24 — 법인지방소득세 세율·신고·안분 근거", url: "https://www.law.go.kr/" },
              { label: "지방세기본법 제53조·제55조 — 무신고·납부지연 가산세", url: "https://www.law.go.kr/" },
              { label: "행정안전부 보도자료 — 4월은 법인지방소득세 신고납부의 달", url: "https://www.mois.go.kr/" },
              { label: "위택스 공식 사이트 (wetax.go.kr)", url: "https://www.wetax.go.kr" },
              { label: "서울시 이택스 (etax.seoul.go.kr) — 서울 법인 신고납부", url: "https://etax.seoul.go.kr" },
            ].map(item => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공 목적으로 작성됐어요. 정확한 세액 계산 및 신고는 위택스(☎110) 또는 관할 지자체 세무부서에서 최종 확인하세요.<br />
          ※ 12월 결산법인 신고납부 기한: 4월 30일 / 세율: 0.9%~2.4% (지방세법 제103조의20) / 무신고 가산세: 20% / 분할납부: 100만원 초과 시 가능 / 위택스: wetax.go.kr / 이택스(서울): etax.seoul.go.kr
        </div>
      </div>
    </div>
  );
}
