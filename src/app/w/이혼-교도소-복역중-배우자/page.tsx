"use client";
import { useState } from "react";

const SIDEBAR_LINKS = [
  "협의이혼 절차 및 방법",
  "이혼 위자료 청구",
  "이혼 재산분할 비율",
  "이혼 친권·양육권",
  "이혼 양육비 청구",
  "이혼 소송 증거 수집",
  "이혼 전 재산 빼돌림",
  "별거 중 이혼 가능한가",
  "이혼 무료 법률상담",
  "이혼 소송 중 양육비",
  "이혼 배우자 가출·생사불명",
  "이혼 소송 증거 수집",
  "이혼 빚 공동부담",
  "재산분할 청구 기한",
  "위자료 소멸시효",
  "이혼 후 공동명의 대출",
  "이혼 퇴직금 재산분할",
  "면접교섭권 신청",
  "양육비 미지급 대응",
  "대한법률구조공단 상담",
];

const HUB_LINKS = [
  { title: "협의이혼 절차 및 방법 | 준비 서류와 숙려기간 총정리", desc: "합의이혼 기본 절차 확인", href: "#" },
  { title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인", desc: "위자료 산정 기준과 청구 방법", href: "#" },
  { title: "이혼 친권·양육권 | 법원 결정 기준과 유리하게 받는 방법", desc: "양육권 판단 기준 전체 정리", href: "#" },
  { title: "이혼 소송 중 양육비 | 이혼 전 임시 양육비 받는 방법", desc: "소송 중에도 양육비 받을 수 있어요", href: "#" },
];

const DIVORCE_TYPES = [
  {
    type: "협의이혼",
    condition: "배우자가 이혼에 동의하는 경우",
    process: "내가 혼자 법원에 출석해서 신청서 제출 가능 (교도소 수감 중인 배우자는 재감인증명서 첨부). 법원이 교도소로 이혼의사확인 서류를 송달해요. 배우자가 서류에 서명하면 확인 완료.",
    tip: "배우자 동의가 있으면 재판 없이 1~3개월 내 이혼 가능해요.",
  },
  {
    type: "재판상 이혼",
    condition: "배우자가 이혼에 동의하지 않는 경우",
    process: "가정법원에 이혼 소송 제기. 수감 중인 배우자에게 교도소로 소장이 송달돼요. 민법 제840조 제6호 '혼인을 계속하기 어려운 중대한 사유' 또는 제2호 '악의의 유기' 적용 가능.",
    tip: "장기 수감으로 사실상 혼인관계 파탄이 인정되면 재판상 이혼 가능해요.",
  },
];

const STEPS = [
  {
    title: "배우자 수감 사실 확인 서류 준비",
    desc: "이혼 신청 전에 배우자가 현재 어느 교도소에 수감 중인지 확인해야 해요. '재감인증명서'는 배우자가 수감된 교도소에 신청하면 발급받을 수 있어요. 또는 '수용자 수용 여부 확인서'를 법무부 교정본부에 요청하는 방법도 있어요. 이 서류가 법원 제출 서류에 포함돼요.",
    tip: "재감인증명서 발급은 직접 교도소에 방문하거나 우편으로 신청할 수 있어요.",
  },
  {
    title: "협의이혼이면 — 혼자 법원에 가도 돼요",
    desc: "배우자가 교도소에 수감 중인 경우, 협의이혼 신청은 내가 혼자 출석해서 할 수 있어요. 보통은 부부가 함께 가야 하지만 수감 중인 경우는 예외예요. 재감인증명서를 첨부해서 관할 가정법원에 협의이혼의사확인 신청서를 제출하면, 법원이 교도소로 서류를 송달해요. 배우자가 서명하면 이혼 의사 확인이 완료돼요.",
    link: { label: "대법원 전자민원센터 — 협의이혼 서류 안내", url: "https://help.scourt.go.kr" },
  },
  {
    title: "재판상 이혼이면 — 소장 제출 후 교도소로 송달",
    desc: "배우자가 이혼을 거부하면 가정법원에 이혼소송을 제기해요. 소장에 배우자 주소 대신 '수용 중인 교도소 주소'를 기재하면 법원이 교도소로 소장을 송달해줘요. 이혼 사유는 민법 제840조 제6호(혼인을 계속하기 어려운 중대한 사유) 또는 제2호(악의의 유기)로 청구할 수 있어요. 비용이 없으면 대한법률구조공단(132)에 소송구조를 신청하면 돼요.",
    link: { label: "대한법률구조공단 (132)", url: "tel:132" },
  },
  {
    title: "위자료·재산분할·양육권 동시 청구",
    desc: "이혼 소송을 낼 때 위자료, 재산분할, 양육권·양육비를 한꺼번에 청구하세요. 나중에 따로 청구하면 별도 소송이 필요해서 비용과 시간이 더 들어요. 배우자가 수감 중이라면 재산을 숨기거나 처분하기 어렵기 때문에 오히려 재산 파악이 쉬울 수 있어요. 부동산이 있다면 소장 제출과 동시에 처분금지가처분을 신청해두세요.",
  },
  {
    title: "이혼 확정 후 — 이혼신고로 완료",
    desc: "협의이혼은 법원에서 확인서를 받은 날로부터 3개월 이내에 주민센터에 이혼신고서를 제출해야 이혼이 성립해요. 3개월이 지나면 다시 처음부터 절차를 밟아야 해요. 재판이혼은 판결이 확정된 날로부터 1개월 이내에 이혼신고를 해야 해요.",
    tip: "이혼신고를 잊으면 법적으로 아직 혼인 상태예요. 확인서 받은 날 날짜를 기록해두세요.",
  },
];

const FAQS = [
  {
    urgent: true,
    q: "배우자가 수감 중인데 이혼에 동의하지 않아요. 강제로 이혼할 수 있나요?",
    a: "네. 배우자 동의 없이도 재판상 이혼이 가능해요. 장기 수감으로 사실상 부부 공동생활이 불가능한 상태라면 민법 제840조 제6호 '혼인을 계속하기 어려운 중대한 사유'가 인정될 수 있어요. 또는 제2호 '악의의 유기'를 이유로 청구할 수도 있어요. 수감 기간이 길수록 인정 가능성이 높아요. 대한법률구조공단(132)에 먼저 상담해보세요.",
  },
  {
    urgent: true,
    q: "배우자가 어느 교도소에 있는지 모르면 어떻게 하나요?",
    a: "배우자의 주민등록번호를 알면 법무부 교정본부(www.corrections.go.kr)에 수용 여부 조회를 신청할 수 있어요. 또는 가정법원에 이혼소송을 제기할 때 법원이 직권으로 주소를 조회해주는 경우도 있어요. 주소 자체를 모른다면 대한법률구조공단(132)에 상담하면 절차를 안내해줘요.",
  },
  {
    urgent: false,
    q: "배우자 출소 후 다시 돌아오면 이혼이 취소되나요?",
    a: "아니에요. 이혼이 확정되면 배우자가 출소해도 혼인관계는 부활하지 않아요. 다만 협의이혼의 경우 이혼 확인서를 받은 후 3개월 이내에 이혼신고를 하지 않으면 효력이 없어져요. 이 기간을 반드시 지켜야 해요.",
  },
  {
    urgent: false,
    q: "이혼하면 배우자 범죄로 인한 피해보상이나 소송에 영향이 있나요?",
    a: "이혼이 확정되면 배우자와 법적으로 남남이 돼요. 배우자의 채무나 범죄로 인한 배상 책임은 원칙적으로 이혼 후 내게 영향을 주지 않아요. 하지만 이혼 전 공동명의 재산이나 보증 관계가 있다면 이혼 후에도 정리가 필요할 수 있어요. 이혼 소장에 재산분할을 함께 청구해서 정리하세요.",
  },
  {
    urgent: false,
    q: "아이 양육권은 자동으로 제가 갖게 되나요?",
    a: "자동으로 결정되지 않아요. 이혼 소송에서 양육권·친권자 지정을 함께 청구해야 해요. 법원은 아이의 복리를 최우선으로 판단해요. 현재 아이를 돌보고 있는 사람이 누구인지, 경제적 능력, 아이와의 유대 관계를 봐요. 배우자가 수감 중이라면 사실상 양육이 불가능한 상태이므로 내가 양육권을 받을 가능성이 높아요.",
  },
  {
    urgent: false,
    q: "위자료를 받을 수 있나요? 배우자가 수감 중이라 돈이 없을 것 같아요.",
    a: "위자료 청구는 가능해요. 다만 지금 당장 받기 어려울 수 있어요. 판결로 위자료가 확정되면 배우자가 출소 후 재산이 생겼을 때 강제집행이 가능해요. 판결 확정일로부터 10년간 집행이 가능해요. 지금 청구해서 판결문을 받아두는 게 중요해요.",
  },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민법 제840조 — 재판상 이혼 원인 6가지", url: "https://www.law.go.kr/" },
    { label: "가사소송법 — 2026. 1. 1. 시행", url: "https://www.law.go.kr/" },
    { label: "민법 제836조의2 — 이혼숙려기간", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "대법원 전자민원센터 — 협의이혼 절차 안내 (수감 중 특례 포함)", url: "https://help.scourt.go.kr/nm/min_3/min_3_2/min_3_2_1/index.html" },
    { label: "찾기쉬운 생활법령 — 재판상 이혼 사유 (2026. 1. 15. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=3&cciNo=1&cnpClsNo=2" },
    { label: "대한법률구조공단 (132) — 무료 이혼 법률 상담", url: "https://www.klac.or.kr" },
  ]},
];

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: any) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: any) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
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

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    agree: {
      title: "배우자가 이혼에 동의한다면",
      color: G, bg: GL,
      text: "협의이혼이 가능해요. 수감 중인 경우 내가 혼자 법원에 가서 신청할 수 있어요. 재감인증명서를 교도소에서 받아서 첨부하면 돼요. 법원이 교도소로 서류를 보내주고, 배우자가 서명하면 완료예요. 빠르면 1~3개월이면 이혼이 돼요."
    },
    refuse: {
      title: "배우자가 이혼을 거부한다면",
      color: "#DC2626", bg: "#FEF2F2",
      text: "재판상 이혼을 제기해야 해요. 장기 수감으로 혼인관계가 사실상 파탄 났다면 민법 제840조 제6호로 이혼 청구가 가능해요. 소장에 배우자 교도소 주소를 적으면 법원이 교도소로 소장을 보내줘요. 대한법률구조공단(132)에서 소장 작성 무료 도움을 받을 수 있어요."
    },
    unknown: {
      title: "배우자가 어느 교도소에 있는지 모른다면",
      color: "#7C3AED", bg: "#F5F3FF",
      text: "법무부 교정본부(www.corrections.go.kr)에서 수용 여부를 조회할 수 있어요. 배우자 주민등록번호가 필요해요. 또는 가정법원에 이혼소송을 제기하면 법원이 직권으로 주소를 조회해주기도 해요. 132에 전화해서 절차를 안내받으세요."
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "agree", label: "배우자가 이혼에 동의해요." },
          { id: "refuse", label: "배우자가 이혼을 거부하거나 연락이 안 돼요." },
          { id: "unknown", label: "배우자가 어느 교도소에 있는지 몰라요." },
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

function DivorceTypeTable() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1.5rem" }}>
      {DIVORCE_TYPES.map((item, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: i === 0 ? GL : "#FEF2F2", color: i === 0 ? GD : "#DC2626" }}>{item.type}</span>
            <span style={{ fontSize: 12, color: "#6b7280" }}>{item.condition}</span>
          </div>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 6px" }}>{item.process}</p>
          <div style={{ fontSize: 12, color: GD, background: GL, borderRadius: 6, padding: "6px 10px" }}>💡 {item.tip}</div>
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
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, background: "#e5e7eb", minHeight: 20 }} />}
          </div>
          <div style={{ paddingBottom: i < STEPS.length - 1 ? 20 : 0, flex: 1 }}>
            <strong style={{ fontSize: 14, color: "#111", display: "block", marginBottom: 4, lineHeight: 1.5 }}>{step.title}</strong>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 4px" }}>{step.desc}</p>
            {step.tip && <div style={{ fontSize: 12, color: GD, background: GL, borderRadius: 6, padding: "6px 10px", marginTop: 6 }}>💡 {step.tip}</div>}
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
          {open === i && (
            <div style={{ padding: "0 14px 14px", fontSize: 13, color: "#374151", lineHeight: 1.9, borderTop: "1px solid #f3f4f6" }}>
              <p style={{ margin: "12px 0 0" }}>{faq.a}</p>
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

function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
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
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요.</p>
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

export default function IhonEducosoPAge() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 재판상 이혼 · 협의이혼</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 교도소 복역중 배우자 |<br />
          협의이혼과 재판이혼 절차
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          배우자가 교도소에 수감 중인데 이혼하고 싶은데 방법을 모르는 분이 많아요.<br />
          결론부터 말하면, 배우자가 교도소에 있어도 이혼할 수 있어요. 협의이혼은 혼자 법원에 가도 되고, 재판이혼은 소장이 교도소로 송달돼요.<br /><br />
          배우자 동의가 있으면 1~3개월, 재판이면 6개월~1년 정도 걸려요.<br />
          지금 상황을 선택하면 바로 필요한 내용을 확인할 수 있어요.
        </p>

        <UrgentBanner />

        <H2>교도소 복역중 배우자 이혼 — 협의이혼과 재판이혼 절차</H2>
        <p style={body}>
          배우자가 이혼에 동의하는지 여부가 핵심이에요. 동의하면 협의이혼, 거부하면 재판상 이혼을 선택하면 돼요.<br />
          두 경우 모두 내가 혼자 법원에 가서 진행할 수 있어요. 배우자가 직접 법원에 나올 필요가 없어요.
        </p>
        <DivorceTypeTable />

        <GreenBox title="수감 중인 배우자에게 서류가 전달되는 방법">
          협의이혼 → 법원이 교도소로 협의이혼 확인 서류를 송달해요. 배우자가 서명해서 돌려보내면 돼요.<br />
          재판이혼 → 소장에 배우자 교도소 주소를 기재하면 법원이 교도소로 직접 송달해요.<br />
          배우자 주소를 교도소 주소로 적어야 송달이 돼요. 기존 집 주소로 적으면 송달이 안 돼요.
        </GreenBox>

        <HubLinks />

        <H2>교도소 복역중 배우자 이혼 절차 — 순서대로</H2>
        <p style={body}>
          일반 이혼과 차이는 딱 두 가지예요. 재감인증명서가 필요하고, 배우자 주소를 교도소 주소로 적는 것이에요.<br />
          나머지 절차는 일반 이혼과 동일해요.
        </p>
        <ProcessSteps />

        <Divider />

        <H2>이혼 교도소 복역중 배우자 관련 자주 묻는 것들</H2>
        <p style={body}>동의 여부, 위자료, 양육권까지 정리했어요.</p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 도움받을 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 법률상담 · 소장 작성 지원" },
              { label: "대법원 전자민원센터 — 협의이혼 안내", url: "https://help.scourt.go.kr/nm/min_3/min_3_2/min_3_2_1/index.html", sub: "수감 중 배우자 특례 절차 확인" },
              { label: "법무부 교정본부 — 수용자 조회", url: "https://www.corrections.go.kr", sub: "배우자 수감 교도소 확인" },
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
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 대한법률구조공단(132) 또는 가정법원에 상담하세요.
        </div>
      </div>
    </div>
  );
}
