import { useState } from "react";

const SIDEBAR_LINKS = [
  "대한법률구조공단 상담",
  "협의이혼 절차",
  "이혼 위자료 청구",
  "이혼 재산분할 비율",
  "이혼 친권·양육권",
  "이혼 양육비 청구",
  "가정폭력 이혼 방법",
  "이혼 소송 증거 수집",
  "이혼 전 재산 빼돌림",
  "별거 중 이혼 가능한가",
  "이혼 소송 중 양육비",
  "이혼 퇴직금 재산분할",
  "이혼 빚 공동부담",
  "재산분할 청구 기한",
  "위자료 소멸시효",
  "이혼 후 공동명의 대출",
  "면접교섭권 신청",
  "양육비 미지급 대응",
  "개인파산 면책 신청",
  "소액사건 소장 작성",
];

const HUB_LINKS = [
  { title: "가정폭력 이혼 방법 | 신고부터 이혼 소송·위자료까지", desc: "가정폭력 피해자 무료 법률 지원 방법", href: "#" },
  { title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인", desc: "위자료 산정 기준과 청구 방법", href: "#" },
  { title: "이혼 친권·양육권 | 법원 결정 기준", desc: "양육권 유리하게 받는 방법", href: "#" },
  { title: "협의이혼 절차 및 방법 | 준비 서류와 숙려기간", desc: "합의이혼 기본 절차 확인", href: "#" },
];

const SUPPORT_TYPES = [
  {
    org: "대한법률구조공단 (132)",
    type: "무료 소송구조 + 변호사 선임 지원",
    condition: "기준 중위소득 125% 이하 (2인 가구 약 월 524만원 이하)",
    content: "이혼소송 소장 작성 → 법원 대리 → 판결까지 공단 소속 변호사가 무료로 대리해요. 인지대·송달료도 지원돼요.",
    free: true,
    url: "https://www.klac.or.kr",
  },
  {
    org: "대한법률구조공단 (132)",
    type: "무조건 무료 (소득 무관)",
    condition: "기초생활수급자, 한부모가족, 장애인, 가정폭력·성폭력 피해자",
    content: "소득 확인 없이 바로 무료 지원받을 수 있어요. 전화 한 통으로 상담 신청 후 가까운 지사 방문하면 돼요.",
    free: true,
    url: "tel:132",
  },
  {
    org: "법원 나홀로소송 지원",
    type: "소장 작성 도구 무료 제공",
    condition: "누구나 (소득 무관)",
    content: "대법원 혼자하는 소송 사이트(pro-se.scourt.go.kr)에서 이혼 소장 양식과 작성 가이드를 무료로 제공해요. 소장을 직접 작성해서 제출할 수 있어요.",
    free: true,
    url: "https://pro-se.scourt.go.kr",
  },
  {
    org: "대한변호사협회 법률구조재단",
    type: "저소득층 무료 변호사 연결",
    condition: "기초수급자·차상위계층",
    content: "각 지방 변호사회에서 무료 법률구조 신청을 받아요. 서울은 서울지방변호사회(02-6353-5100), 각 지역 변호사회에서 신청 가능해요.",
    free: true,
    url: "https://www.koreanbar.or.kr",
  },
];

const STEPS = [
  {
    title: "소득 기준 먼저 확인 — 중위소득 125%가 기준이에요",
    desc: "대한법률구조공단 소송구조의 핵심 기준은 기준 중위소득 125% 이하예요. 2026년 기준으로 1인 가구는 월 약 320만원, 2인 가구는 월 약 524만원, 4인 가구는 월 약 811만원 이하면 해당돼요. 건강보험료 납부 확인서로 소득을 증빙해요. 기준이 애매하면 일단 132에 전화해서 확인해보세요. 전화 상담은 무료예요.",
    tel: { label: "대한법률구조공단 (132)", url: "tel:132" },
  },
  {
    title: "132 전화 → 가까운 지사 방문 예약",
    desc: "132에 전화해서 '이혼 소송구조 신청하고 싶다'고 말하면 가까운 지사와 방문 날짜를 안내해줘요. 전국 132개 출장소가 있어서 어디서든 신청 가능해요. 방문할 때 가져갈 서류는 신분증, 혼인관계증명서, 건강보험료 납부확인서(최근 3개월), 소득 증빙 서류예요.",
    link: { label: "공단 지사 찾기 klac.or.kr", url: "https://www.klac.or.kr" },
  },
  {
    title: "소송구조 승인 → 공단 변호사가 소장 작성 시작",
    desc: "소송구조가 승인되면 공단 소속 변호사가 배정돼요. 변호사가 직접 이혼 소장을 작성하고, 위자료·재산분할·양육권 청구를 함께 검토해줘요. 내가 따로 변호사를 선임할 필요가 없어요. 인지대와 송달료도 공단이 대신 납부해줘요. 나중에 이기면 상대방에게 소송비용을 청구할 수 있어요.",
  },
  {
    title: "소송 진행 중 — 변호사가 법원 기일에 대신 출석해요",
    desc: "조정기일, 변론기일에 공단 변호사가 나를 대리해서 출석해요. 내가 직접 법원에 출석하지 않아도 되는 기일이 많아요. 법원에서 오는 서류가 있으면 공단 변호사에게 바로 전달해야 해요. 기일 날짜나 진행 상황이 궁금하면 배정받은 변호사에게 직접 연락하면 돼요.",
  },
  {
    title: "소득이 기준 초과면 — 나홀로 소송이나 법무사 활용",
    desc: "소득이 기준을 초과해서 소송구조를 못 받는다면 두 가지 방법이 있어요. 첫째, 대법원 혼자하는 소송 사이트(pro-se.scourt.go.kr)에서 이혼 소장 양식과 작성 가이드를 무료로 내려받아 직접 제출하는 나홀로 소송이에요. 둘째, 법무사에게 소장 작성만 의뢰하는 방법이에요. 법무사 비용은 20~50만원 수준으로 변호사 선임(300만원~)보다 훨씬 저렴해요.",
    link: { label: "대법원 혼자하는 소송", url: "https://pro-se.scourt.go.kr" },
  },
];

const FAQS = [
  {
    urgent: true,
    q: "변호사비용이 없어서 이혼을 못 하고 있어요. 무조건 돈이 있어야 하나요?",
    a: "아니에요. 기준 중위소득 125% 이하라면 대한법률구조공단(132)에서 변호사 선임부터 법원 대리까지 무료로 해줘요. 기초수급자·한부모가족·가정폭력 피해자는 소득 무관하게 무료예요. 먼저 132에 전화해서 내가 해당되는지 확인하세요. 전화 상담은 무료예요.",
  },
  {
    urgent: true,
    q: "가정폭력 피해자인데 소득이 있어도 무료로 지원받을 수 있나요?",
    a: "네. 가정폭력 피해자는 소득 기준에 관계없이 대한법률구조공단의 무료 법률 지원을 받을 수 있어요. 또한 여성긴급전화 1366을 통해 연계되는 법률 지원도 있어요. 쉼터 입소 여부와 무관하게 피해자라면 신청 가능해요.",
  },
  {
    urgent: false,
    q: "소송구조 신청하면 얼마나 걸려요?",
    a: "소송구조 심사는 보통 1~2주 걸려요. 급박한 사정(가정폭력, 재산 처분 위험)이 있으면 빠른 처리를 요청할 수 있어요. 승인되면 바로 변호사가 배정돼서 소장 작성을 시작해요.",
  },
  {
    urgent: false,
    q: "공단에서 내 이혼을 거절할 수도 있나요?",
    a: "소송구조는 소득 기준 충족 + 이길 가능성이 있는 사건인지를 심사해요. 명백히 승소 가능성이 없는 사건은 거절될 수 있지만, 이혼 소송 대부분은 구조 신청이 받아들여져요. 거절되면 이유를 설명해주고 다른 방법을 안내해줘요.",
  },
  {
    urgent: false,
    q: "공단 변호사와 개인 변호사 중 어느 쪽이 나을까요?",
    a: "소송구조 대상이면 공단 변호사를 이용하는 게 당연히 낫고, 결과 면에서도 크게 차이 나지 않아요. 재산분할 금액이 크거나 양육권 다툼이 치열할 경우에는 개인 변호사 선임이 유리할 수도 있어요. 그렇지 않다면 공단 소송구조로도 충분해요.",
  },
  {
    urgent: false,
    q: "나홀로 소송으로 이혼 소장을 직접 낼 수 있나요?",
    a: "네. 이혼 소송은 변호사 없이도 제기할 수 있어요. 대법원 혼자하는 소송 사이트(pro-se.scourt.go.kr)에서 이혼 소장 양식과 작성 예시를 무료로 내려받을 수 있어요. 인지대(소가에 따라 다름)와 송달료만 납부하면 돼요. 복잡한 쟁점이 없는 협의이혼이라면 충분히 혼자 할 수 있어요.",
  },
];

const REFERENCES = [
  { category: "공식 기관", items: [
    { label: "대한법률구조공단 — 소송구조 신청 안내 (132)", url: "https://www.klac.or.kr" },
    { label: "대법원 혼자하는 소송 — 이혼 소장 양식 무료 제공", url: "https://pro-se.scourt.go.kr" },
    { label: "찾기쉬운 생활법령 — 이혼 준비사항 (2026. 1. 15. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=1&cciNo=2&cnpClsNo=1" },
  ]},
];

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }

function IncomeChecker() {
  const [people, setPeople] = useState(1);
  const limits = { 1: 320, 2: 524, 3: 669, 4: 811, 5: 944 };
  const limit = limits[people] || 618;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14 }}>💰 소송구조 소득 기준 확인기 (2026년 기준 중위소득 125%)</p>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>가구원 수</label>
        <div style={{ display: "flex", gap: 8 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setPeople(n)} style={{ padding: "7px 16px", borderRadius: 20, border: `1px solid ${people === n ? G : "#e5e7eb"}`, background: people === n ? GL : "#fff", color: people === n ? GD : "#374151", fontSize: 13, fontWeight: people === n ? 700 : 400, cursor: "pointer" }}>{n}인</button>
          ))}
        </div>
      </div>
      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: "1px solid #e5e7eb" }}>
          <span style={{ fontSize: 13, color: "#374151" }}>{people}인 가구 소송구조 기준 월 소득 상한</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: G }}>월 {limit}만원 이하</span>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, lineHeight: 1.7 }}>건강보험료 납부확인서로 확인해요. 기초수급자·한부모·가정폭력 피해자는 소득 무관 무료예요.</p>
      </div>
    </div>
  );
}

function SupportTable() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.5rem" }}>
      {SUPPORT_TYPES.map((item, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{item.org}</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: GL, color: GD, flexShrink: 0 }}>{item.type}</span>
          </div>
          <p style={{ fontSize: 12, color: "#DC2626", fontWeight: 600, margin: "0 0 4px" }}>대상: {item.condition}</p>
          <p style={{ fontSize: 13, color: "#374151", margin: "0 0 8px", lineHeight: 1.8 }}>{item.content}</p>
          <a href={item.url} style={{ fontSize: 12, color: G, fontWeight: 600, textDecoration: "none" }}>→ 바로가기</a>
        </div>
      ))}
    </div>
  );
}

function ProcessSteps() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
      {STEPS.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
            {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, background: "#e5e7eb", minHeight: 20 }} />}
          </div>
          <div style={{ paddingBottom: i < STEPS.length - 1 ? 20 : 0, flex: 1 }}>
            <strong style={{ fontSize: 14, color: "#111", display: "block", marginBottom: 4, lineHeight: 1.5 }}>{step.title}</strong>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 4px" }}>{step.desc}</p>
            {step.tel && <a href={step.tel.url} style={{ fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", display: "inline-block", marginTop: 6 }}>→ {step.tel.label}</a>}
            {step.link && <a href={step.link.url} style={{ fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", display: "inline-block", marginTop: 6 }}>→ {step.link.label}</a>}
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", lineHeight: 1.5, display: "flex", alignItems: "center", gap: 8 }}>
              {faq.urgent && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10, background: "#FEE2E2", color: "#DC2626", flexShrink: 0 }}>긴급</span>}
              {faq.q}
            </span>
            <span style={{ fontSize: 16, color: "#9ca3af", flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div style={{ padding: "0 14px 14px", fontSize: 13, color: "#374151", lineHeight: 1.9, borderTop: "1px solid #f3f4f6" }}><p style={{ margin: "12px 0 0" }}>{faq.a}</p></div>}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function IhonMuroPAge() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 무료 법률상담 · 소송구조</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 무료 법률상담 소송구조 |<br />
          변호사비 없이 이혼 소송하는 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          이혼하고 싶은데 변호사비가 없어서 못 하고 있는 분들이 많아요.<br />
          기준 중위소득 125% 이하라면 대한법률구조공단에서 변호사 선임부터 법원 대리까지 전부 무료로 해줘요.<br /><br />
          기초수급자, 한부모가족, 가정폭력 피해자는 소득에 관계없이 무료예요.<br />
          내가 지원 대상인지 아래에서 바로 확인해보세요.
        </p>

        <Bdg>가구원 수 선택해서 소득 기준 확인하세요</Bdg>
        <IncomeChecker />

        <H2>변호사비 없이 이혼 소송하는 방법 — 지원 기관별 정리</H2>
        <p style={body}>
          국가에서 운영하는 무료 법률 지원 제도가 여러 개 있어요. 내 상황에 맞는 곳에 연락하면 돼요.<br />
          가장 빠른 방법은 132에 전화해서 '이혼 소송구조 신청하고 싶다'고 말하는 거예요.
        </p>
        <SupportTable />

        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>소송구조 받으면 실제로 어떻게 진행되나요?</strong>
          공단 변호사 배정 → 이혼 소장 작성(위자료·재산분할·양육권 동시 청구) → 법원 접수(인지대·송달료 공단 납부) → 조정·변론기일 공단 변호사 대리 출석 → 판결 확정<br />
          내가 직접 법원에 가야 하는 날은 판사가 당사자 직접 확인이 필요한 기일뿐이에요.
        </div>

        <HubLinks />

        <H2>소송구조 신청 절차 — 132 전화부터 판결까지</H2>
        <p style={body}>
          신청부터 변호사 배정까지 보통 1~2주 걸려요. 급박한 상황이면 빠른 처리를 요청할 수 있어요.<br />
          아래 순서대로 따라가면 변호사비 없이 이혼 소송을 끝낼 수 있어요.
        </p>
        <ProcessSteps />

        <Divider />

        <H2>이혼 무료 법률상담·소송구조에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 신청하세요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "이혼 소송구조 신청 · 무료 법률상담" },
              { label: "대법원 혼자하는 소송", url: "https://pro-se.scourt.go.kr", sub: "이혼 소장 양식 무료 제공" },
              { label: "여성긴급전화 (1366)", url: "tel:1366", sub: "가정폭력 피해자 법률 지원 연계 (24시간)" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span>
                </div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        <Divider />
        <div style={{ marginTop: "1rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />출처 및 참고자료
          </h3>
          {REFERENCES.map((group) => (
            <div key={group.category} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {group.items.map((item) => (
                  <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                    <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
