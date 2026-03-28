"use client";
import { useState } from "react";

// 10번: 오래된 가압류 해제 방법 | 소멸시효·취소 신청 절차

const SIDEBAR_LINKS = ["가압류 신청 방법","가압류 신청 비용","가압류 이의신청","처분금지가처분 신청","소멸시효 중단 방법","소멸시효 완성 확인","채무 소멸시효","부동산 등기 말소","강제집행 취소","담보취소 신청","채무변제 확인서","불법행위 소멸시효","판결 소멸시효","소액사건 소장 작성","차용증 없이 돈 받기","전자소송 이용 방법","법률구조공단 상담","인터넷등기소 열람","등기부 말소 방법","등기 촉탁 신청"];

const HUB_LINKS = [
  { title: "가압류 신청 방법 | 비용·절차·재산 유형별 신청", desc: "가압류 신규 신청 방법", href: "#" },
  { title: "가압류 신청 비용 | 인지대·송달료·담보 금액 계산기", desc: "가압류 관련 비용 계산", href: "#" },
  { title: "처분금지가처분 신청 조건 | 부동산 매매·담보 기준", desc: "가압류보다 강력한 처분금지가처분", href: "#" },
  { title: "소액사건 소장 작성 | 3,000만원 이하 금전 청구 절차", desc: "채권 회수 소송 방법", href: "#" },
];

const LIMITATION_TABLE = [
  { period: "2002. 7. 1. 이전 신청", limit: "10년 본안 미제기 시 취소 신청 가능", note: "구 민사소송법 적용" },
  { period: "2002. 7. 1. ~ 2005. 7. 27.", limit: "5년 본안 미제기 시 취소 신청 가능", note: "경과 규정 적용" },
  { period: "2005. 7. 28. 이후 신청", limit: "3년 본안 미제기 시 취소 신청 가능", note: "현행 민사집행법 제288조" },
];

const STEPS_DEBTOR = [
  {
    title: "등기부에서 가압류 집행 날짜 확인",
    desc: "인터넷등기소(iros.go.kr)에 접속해서 해당 부동산 등기부등본을 열람하세요. 열람 비용은 700원이에요. '을구' 항목에서 가압류 접수 날짜를 찾으세요. 예: '접수 2020년 4월 10일'. 이 날짜가 기준이에요. 2023년 4월 10일 이후라면 3년 경과로 취소 신청 가능해요.",
    link: { label: "인터넷등기소 바로가기", url: "https://www.iros.go.kr" },
  },
  {
    title: "채권자가 본안소송을 제기했는지 확인",
    desc: "대법원 나의사건검색(www.scourt.go.kr)에서 채권자 이름 또는 등기부에 적힌 사건번호로 검색해보세요. 소송이 없으면 취소 요건이 충족됐어요. 소송이 있으면 3년 기간이 중단된 것일 수 있어서 취소가 어려울 수 있어요. 불확실하면 132에 물어보세요.",
  },
  {
    title: "가압류취소 신청서 작성해서 법원에 제출",
    desc: "가압류 결정을 내린 법원(등기부에서 확인)에 '사정변경에 따른 가압류취소신청서'를 제출해요. 인지 1,000원 + 송달료(5,200원 × 3회분)를 납부해요. 서류 작성이 어려우면 132에 전화해서 무료 도움을 요청하세요. 신청 후 법원이 채권자를 소환하고 심문기일을 열어요.",
    link: { label: "대한법률구조공단 (132)", url: "tel:132" },
  },
  {
    title: "심문기일 — 내가 출석하지 않아도 돼요",
    desc: "법원이 채권자를 불러요. 채권자가 출석해서 '소송을 제기했다', '새로 가압류 신청하겠다'고 하면 취소가 안 될 수도 있어요. 채권자가 나오지 않거나 반박을 못 하면 취소결정이 나와요. 나(채무자)는 신청인으로 출석 의무가 없지만, 법원에서 연락이 오면 꼭 응하세요.",
  },
  {
    title: "취소결정 확정 → 등기부 말소",
    desc: "취소결정이 확정되면 법원이 자동으로 등기소에 말소 촉탁을 보내요. 등기부에서 가압류 기재가 삭제돼요. 확정 후 등기부를 다시 열람해서 말소됐는지 확인하세요. 여기까지 완료되면 부동산 거래나 대출이 가능해져요.",
  },
];

const STEPS_CREDITOR = [
  {
    title: "지금 당장 — 3년이 됐는지 확인하세요",
    desc: "가압류 집행 날짜로부터 3년이 됐거나 다가오고 있다면 지금 바로 움직여야 해요. 가장 빠른 방법은 지급명령 신청이에요. 지급명령은 소송보다 빠르고 비용도 적어요. 제출하면 취소 신청을 막을 수 있어요. 3년이 이미 지났다면 아래 2번으로 바로 이동하세요.",
  },
  {
    title: "3년이 이미 지났다면 — 새 가압류 먼저 신청",
    desc: "기존 가압류가 취소될 것 같으면, 취소되기 전에 새로운 가압류를 다시 신청해야 해요. 채무자가 취소 신청을 하면 법원이 나(채권자)를 소환해요. 그 사이에도 새 가압류를 신청할 수 있어요. 기존 가압류가 취소돼도 새 가압류가 있으면 채권 보전이 유지돼요.",
  },
  {
    title: "소멸시효 완성 여부도 함께 확인",
    desc: "가압류는 소멸시효를 중단시켜요. 하지만 가압류가 취소되면 취소 시점부터 다시 소멸시효가 진행돼요. 일반 채권 소멸시효는 10년이에요. 빌려준 날짜, 가압류 날짜, 지금 날짜를 계산해서 소멸시효가 완성되지 않았는지 확인하세요. 헷갈리면 132에 계산을 도와달라고 하세요.",
  },
];

const FAQS = [
  { urgent: true, q: "등기부에 10년 전 가압류가 걸려 있어요. 말소할 수 있나요?", a: "2005. 7. 28. 이후 신청된 가압류는 집행 후 3년 내 본안소송이 없으면 취소 신청 가능해요. 2002. 7. 1. 이전 가압류는 10년 기준이에요. 집행 날짜와 채권자의 본안소송 여부를 먼저 확인하고, 법원에 가압류취소신청서를 제출하면 돼요. 대한법률구조공단(132)에서 도움받을 수 있어요." },
  { urgent: true, q: "가압류 채권자와 연락이 안 돼요. 그냥 취소 신청해도 되나요?", a: "가압류취소 신청을 하면 법원이 채권자를 소환해요. 채권자의 현재 주소를 모르더라도 법원이 채권자 주소 조회 후 소환해요. 채권자가 법원에 나오지 않아도 취소 절차가 진행될 수 있어요. 소환 절차가 포함돼 있으니 혼자 걱정하지 않아도 돼요." },
  { urgent: false, q: "가압류가 취소되면 채무 자체가 없어지는 건가요?", a: "아니에요. 가압류는 채권 보전 수단이에요. 가압류가 취소돼도 채무 자체는 소멸하지 않아요. 채권의 소멸시효가 완성되지 않았다면 채권자가 다시 소송을 제기할 수 있어요. 단, 가압류 취소 후 새로운 가압류가 없으면 채무자가 재산을 처분할 수 있게 돼요." },
  { urgent: false, q: "가압류 해방공탁으로 집행을 취소할 수 있나요?", a: "채무자가 법원이 정한 해방공탁금(보통 청구금액과 같은 금액)을 공탁하면 가압류 집행을 취소할 수 있어요. 단, 가압류 명령 자체는 유지돼요. 공탁금에 가압류의 효력이 이전되는 거예요. 합의가 된 후 해방공탁을 활용하면 빠르게 등기에서 가압류를 제거할 수 있어요." },
  { urgent: false, q: "채권자 사망 후 상속인을 상대로 취소 신청해야 하나요?", a: "채권자가 사망한 경우 그 상속인이 채권자 지위를 승계해요. 가압류취소 신청의 상대방은 채권자의 상속인이 돼요. 상속인을 특정하기 어려우면 법원에 상속 조회를 신청하거나 대한법률구조공단(132)에 도움을 요청하세요." },
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
const Bdg = ({ children }) => <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    debtor: { title: "채무자 입장 — 오래된 가압류를 없애고 싶다면", color: G, bg: GL,
      text: "집행 후 3년(이전 규정은 5년·10년) 본안소송이 없으면 취소 신청 가능해요. 가압류 집행 날짜를 확인하고, 민사집행법 제288조에 따라 취소 신청서를 관할 법원에 제출하면 돼요. 대한법률구조공단(132) 또는 법무사 도움을 받을 수 있어요." },
    creditor: { title: "채권자 입장 — 내가 건 가압류가 취소될까봐 걱정된다면", color: "#DC2626", bg: "#FEF2F2",
      text: "가압류 후 3년 내에 반드시 본안소송(또는 지급명령)을 제기해야 해요. 이미 3년이 지났다면 새로운 가압류를 즉시 신청하고, 기존 가압류 취소에 대응하세요. 소멸시효 완성 여부도 함께 확인하세요." },
    check: { title: "등기부에 가압류가 있는지 확인하고 싶다면", color: "#7C3AED", bg: "#F5F3FF",
      text: "인터넷등기소(iros.go.kr)에서 부동산 등기부등본을 열람하면 가압류 기재를 확인할 수 있어요. 인터넷 열람은 700원이에요. 가압류 결정 날짜와 채권자 정보를 확인한 뒤 취소 가능 여부를 판단하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "debtor", label: "오래된 가압류를 없애고 싶어요 (채무자)." },
          { id: "creditor", label: "내가 건 가압류가 취소될까봐 걱정돼요 (채권자)." },
          { id: "check", label: "등기부에 가압류가 있는지 확인하고 싶어요." },
        ].map((item) => (
          <button key={item.id} onClick={() => setType(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
  const m = msgs[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <strong style={{ fontSize: 14, color: m.color }}>{m.title}</strong>
        <button onClick={() => setType(null)} style={{ fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function LimitationTable() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#f9fafb", padding: "8px 14px", borderBottom: "1px solid #e5e7eb" }}>
        {["신청 시기", "취소 가능 기간", "근거"].map(h => <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>{h}</span>)}
      </div>
      {LIMITATION_TABLE.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 14px", borderBottom: i < LIMITATION_TABLE.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{row.period}</span>
          <span style={{ fontSize: 13, color: G, fontWeight: 700 }}>{row.limit}</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{row.note}</span>
        </div>
      ))}
    </div>
  );
}

function ProcessSteps({ steps }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: "#e5e7eb", minHeight: 20 }} />}
          </div>
          <div style={{ paddingBottom: i < steps.length - 1 ? 20 : 0, flex: 1 }}>
            <strong style={{ fontSize: 14, color: "#111", display: "block", marginBottom: 4, lineHeight: 1.5 }}>{step.title}</strong>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 4px" }}>{step.desc}</p>
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
            <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>가압류·채권 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function OldAttachmentReleasePage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>채권 보전 · 가압류 취소 · 등기 말소</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          오래된 가압류 해제 방법 |<br />
          소멸시효·취소 신청 절차
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          집을 팔거나 대출을 받으려는데 등기부에 몇 년 전 가압류가 남아 있어서 막혀 있나요.<br />
          가압류 집행 후 3년 안에 채권자가 본안소송을 제기하지 않으면, 채무자가 취소 신청을 할 수 있어요.<br /><br />
          먼저 인터넷등기소(iros.go.kr)에서 등기부를 열람해서 가압류 기재 날짜를 확인하세요. 700원이에요.<br />
          그 날짜로부터 3년이 지났고 채권자가 소송을 제기하지 않았다면, 지금 취소 신청을 할 수 있어요.
        </p>

        <UrgentBanner />

        <H2>오래된 가압류 소멸시효 — 취소 신청 가능 기간</H2>
        <p style={body}>
          취소 가능 기간은 가압류가 언제 신청됐는지에 따라 달라요. 2005년 이후 신청된 가압류는 집행 후 3년이 기준이에요.<br />
          중요한 건 '가압류 결정 날짜'가 아니라 '집행된 날짜'예요. 부동산은 등기부에 기재된 날짜를 보면 돼요.
        </p>
        <LimitationTable />
        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>집행 날짜 찾는 법 — 등기부에서 바로 확인해요</strong>
          인터넷등기소(iros.go.kr) → 부동산 등기부등본 열람 → '을구' 항목에서 가압류 접수일자 확인<br />
          예: "접수 2019년 3월 15일" → 2022년 3월 15일 이후에 취소 신청 가능해요.<br />
          채권자가 본안소송을 제기했는지는 대법원 나의사건검색(www.scourt.go.kr)에서 사건번호로 조회할 수 있어요.
        </div>

        <HubLinks />

        <H2>가압류 취소 신청 절차 — 채무자 신청 순서</H2>
        <p style={body}>
          취소 신청서는 가압류 결정을 한 법원에 제출해요. 등기부에 적힌 가압류 기재 법원이 어디인지 확인하세요.<br />
          인지 1,000원 + 송달료만 내면 돼요. 서류 작성이 어려우면 대한법률구조공단(132)에서 무료로 도와줘요.
        </p>
        <Bdg>채무자 취소 신청 절차</Bdg>
        <ProcessSteps steps={STEPS_DEBTOR} />

        <Divider />

        <H2>가압류 소멸시효 중단 — 채권자 대응 방법</H2>
        <p style={body}>
          내가 건 가압류가 취소될까봐 걱정된다면, 지금 당장 두 가지를 확인하세요.<br />
          집행 후 3년이 지났는지, 본안소송을 제기했는지예요. 3년이 지났다면 지금 바로 소송을 내거나 새 가압류를 신청해야 해요.<br />
          채무자가 취소 신청을 하면 법원이 채권자를 소환해요. 그 사이에도 새 가압류를 신청할 수 있어요.
        </p>
        <Bdg>채권자 대응 절차</Bdg>
        <ProcessSteps steps={STEPS_CREDITOR} />

        <Divider />
        <H2>오래된 가압류 소멸시효·취소 신청 절차에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 도움받을 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "가압류 취소 신청 무료 법률 지원" },
              { label: "인터넷등기소 — 등기부 열람", url: "https://www.iros.go.kr", sub: "부동산 가압류 기재 확인 (700원)" },
              { label: "대법원 전자소송 — 가압류취소 신청", url: "https://ecfs.scourt.go.kr", sub: "온라인으로 취소 신청서 제출" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 민사집행법 제288조·찾기쉬운 생활법령(2026. 2. 15. 기준)을 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 대한법률구조공단(132) 또는 법원(1588-1657)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
