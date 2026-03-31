"use client";
// @ts-nocheck
import { useState } from "react";

const SIDEBAR_LINKS = [
  "개인회생 신청 방법",
  "개인파산 면책 비용",
  "면책 안 되는 빚",
  "파산 후 자격 제한",
  "파산 복권 방법",
  "신용불량자 회복 방법",
  "채무조정 신청",
  "신용회복위원회 상담",
  "압류금지 재산 종류",
  "급여 압류 해제",
  "가압류 취소 신청",
  "개인회생 vs 파산 차이",
  "소액사건 소장 작성",
  "임금체불 신고",
  "차용증 없이 돈 받기",
  "대한법률구조공단 상담",
  "채무변제 협약 방법",
  "국민행복기금 지원",
  "서울회생법원 안내",
  "파산 전 체크리스트",
];

const HUB_LINKS = [
  { title: "개인파산 면책 신청 | 비용·절차·면책 안 되는 빚", desc: "비용 계산과 면책 제외 채무 확인", href: "#" },
  { title: "소액사건 소장 작성 | 3,000만원 이하 금전 청구 절차", desc: "채권자 입장에서 돈 받는 소송", href: "#" },
  { title: "차용증 없이 빌려준 돈 받는 방법 | 이체 내역으로 소송", desc: "증거 없어도 청구 가능", href: "#" },
  { title: "가압류 신청 방법 | 비용·절차·재산 유형별", desc: "채무자 재산 먼저 묶는 방법", href: "#" },
];

const DISQUALIFICATIONS = [
  { category: "면책이 안 되는 빚", items: [
    "조세·공과금 (세금, 4대 보험료)",
    "벌금·과태료·과료·형사 추징금",
    "사기·횡령·배임으로 인한 손해배상",
    "고의로 타인에게 가한 불법행위 손해배상",
    "양육비·부양료 (이혼 후 자녀 양육비 포함)",
    "근로자 임금·퇴직금 (사업자 파산 시)",
    "허위 채권자 목록 제출로 누락된 채권",
  ]},
];

const STEPS = [
  {
    title: "신청 전에 — 채권자 목록 빠짐없이 만들기",
    desc: "파산 신청에서 가장 많이 실수하는 게 채권자 목록 누락이에요. 빠진 채권자에게는 면책 효력이 안 미쳐요. 즉, 그 빚은 파산해도 안 없어져요. 신청 전에 신용정보원(www.credit.or.kr)에서 내 채무 전체를 조회하세요. 법원 앱 '스마트법원'에서도 확인 가능해요. 카드빚, 은행 대출, 개인 차용금, 의료비까지 전부 목록에 올려야 해요.",
    tip: "기억 안 나는 소액 채권도 빠뜨리면 안 돼요. 누락이 나중에 발견되면 해당 채권자에게 계속 갚아야 해요.",
  },
  {
    title: "서류 준비 — 이것만 있으면 돼요",
    desc: "① 채권자 목록(금융기관명·잔액·이자율) ② 재산 목록(부동산·자동차·예금·보험 해약환급금 등) ③ 수입·지출 목록(월급·생활비·의료비 등) ④ 가족관계증명서·주민등록등본 ⑤ 소득 증빙(급여명세서 또는 건강보험료 납부확인서). 서울회생법원 홈페이지(slb.scourt.go.kr)에 양식과 기재례가 있어요. 처음이라 모르겠으면 132에 전화하면 서류 목록부터 같이 잡아줘요.",
    link: { label: "서울회생법원 — 양식 자료실", url: "https://slb.scourt.go.kr" },
  },
  {
    title: "비용 납부 — 돈 없어도 신청할 수 있어요",
    desc: "인지대는 파산+면책 합쳐서 2,000원이에요. 나머지는 채권자 수에 따른 송달료예요. 채권자 5명이면 약 30만원, 10명이면 약 50만원이에요. 이 돈도 없으면 포기하지 마세요. 대한법률구조공단(132)에 소송구조를 신청하면 비용을 대신 내줘요. 기초생활수급자·장애인은 심사 없이 무료예요.",
    tip: "비용이 없다고 포기하는 분이 많아요. 132에 먼저 전화해서 소송구조 신청이 가능한지 확인하세요.",
  },
  {
    title: "파산선고 — 재산이 없으면 바로 다음 단계로",
    desc: "법원이 서류를 검토해요. 재산이 거의 없으면 파산선고와 동시에 절차를 폐지해요. 이걸 동시폐지라고 해요. 개인파산의 대부분이 동시폐지 방식이에요. 재산이 있으면 파산관재인이 선임돼서 재산을 처분하고 채권자에게 배당한 뒤 면책 단계로 넘어가요. 어느 쪽이든 면책을 받으면 빚이 없어지는 건 동일해요.",
  },
  {
    title: "면책 심사 — 반드시 출석해야 해요",
    desc: "파산관재인이 면책불허가 사유가 있는지 조사해요. 심문기일에 반드시 출석해야 해요. 연락이 안 되거나 출석을 안 하면 면책이 기각돼요. 기각되면 파산 선고는 유지되는데 빚은 안 없어지는 최악의 상황이 돼요. 관재인 연락은 무조건 받고 모르는 내용은 132에 물어보면서 진행하세요.",
    tip: "도박·낭비 이력이 있어도 포기하지 마세요. 비율과 반성 태도를 보고 일부 면책이 허가되는 경우도 있어요.",
  },
  {
    title: "면책 확정 — 이 순간부터 빚이 없어져요",
    desc: "면책허가결정이 확정되는 순간 카드빚·대출·개인 차용금 등 파산채권자에 대한 모든 채무가 면제돼요. 동시에 복권되어 공무원·변호사 등 자격 제한도 사라져요. 여기서 중요한 게 하나 있어요. 세금·양육비·불법행위 배상금은 면책 후에도 남아요. 신청 전에 이 빚이 얼마인지 꼭 확인하세요.",
  },
];

const FAQS = [
  { urgent: true, q: "파산하면 가족에게 불이익이 생기나요?", a: "아니에요. 파산 선고의 불이익은 파산자 본인에게만 해당해요. 배우자·자녀 등 가족에게는 아무런 법적 불이익이 없어요. 다만, 파산자가 공무원·변호사·부동산중개업자 등 자격증이 필요한 직종에 종사 중이라면 파산 선고로 자격 제한을 받아요. 면책결정이 확정되면 자격 제한도 소멸해요." },
  { urgent: true, q: "소득이 조금 있어요. 파산이 가능한가요?", a: "소득이 있어도 파산은 가능해요. 다만 소득이 있어서 일정 기간 변제가 가능하다면 법원이 '개인회생을 먼저 하라'고 파산신청을 기각할 수 있어요. 소득이 최저생계비(2026년 중위소득 60%) 수준이거나 채무가 너무 많아 사실상 상환 불가능하면 파산이 인용돼요. 정확한 판단은 서울회생법원(02-530-1672) 또는 대한법률구조공단(132)에 상담하세요." },
  { urgent: true, q: "도박으로 생긴 빚도 면책이 되나요?", a: "도박·낭비 등 면책불허가 사유가 있으면 면책이 거절될 수 있어요. 하지만 모든 도박 관련 빚이 자동으로 면책 불가인 건 아니에요. 법원이 사안의 정도·비율·반성 태도 등을 종합해서 판단해요. '일부 면책'이 허가되는 경우도 있어요. 면책불허가 사유가 있다고 스스로 단정 짓지 말고 상담을 받아보세요." },
  { urgent: false, q: "파산하면 집이나 차를 모두 빼앗기나요?", a: "법적으로 생활에 필요한 기본 재산은 압류가 금지돼요. 거주용 주택(부채 제외 후 일정 한도), 생활에 필요한 가전, 의복, 농업용 기구 등은 보호돼요. 자동차도 영업용이 아닌 생계 수단으로 필요하면 일부 인정받을 수 있어요. 구체적인 재산 내역은 신청 전 상담을 통해 확인하세요." },
  { urgent: false, q: "파산하면 취업·대출이 안 되나요?", a: "파산 선고 후 면책결정이 확정되면 공·사법상 자격 제한이 소멸해요. 일반 직장 취업에는 법적 제한이 없어요. 다만 금융기관 대출은 신용 기록이 회복될 때까지 어렵고, 이 기록은 보통 5~7년간 남아요. 공무원·변호사·금융기관 임직원 등 특수 직종은 파산 선고 기간 중 취임 제한이 있어요." },
  { urgent: false, q: "개인파산과 개인회생, 어떻게 다른가요?", a: "개인회생은 소득이 있는 분이 3~5년간 생계비를 뺀 나머지를 변제하고 나머지 채무를 면제받는 절차예요. 개인파산은 변제 능력이 없는 분이 재산을 처분하고 빚 전부를 면제받는 절차예요. 소득이 있으면 회생, 소득이 없거나 매우 적으면 파산이 적합해요. 어느 쪽이 유리한지는 채무 규모와 소득을 비교해야 해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "채무자 회생 및 파산에 관한 법률 제566조 — 면책 효력", url: "https://www.law.go.kr/" },
    { label: "채무자 회생 및 파산에 관한 법률 제564조 — 면책허가 결정", url: "https://www.law.go.kr/" },
    { label: "개인파산 및 면책신청사건의 처리에 관한 예규 제2조의4 — 예납금 상한", url: "https://ecfs.scourt.go.kr" },
  ]},
  { category: "공식 자료", items: [
    { label: "서울회생법원 — 개인파산 및 면책 절차 안내", url: "https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp" },
    { label: "대법원 전자소송 — 개인파산 및 면책 신청", url: "https://ecfs.scourt.go.kr/psp/index.on?m=PSP734M01" },
    { label: "찾기쉬운 생활법령 — 개인파산·면책 절차 개관 (2026. 2. 15. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=616&ccfNo=1&cciNo=1&cnpClsNo=1" },
    { label: "대한법률구조공단 (132) — 파산·면책 무료 상담", url: "https://www.klac.or.kr" },
  ]},
];

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: { children: React.ReactNode }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: { children: React.ReactNode }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>;
}
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>;
}

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    qualify: { title: "자격이 되는지 확인하고 싶다면", color: G, bg: GL,
      text: "자격 요건: ① 지급불능 상태 (변제 능력이 없음) ② 소득이 없거나 최저생계비 수준 ③ 처분 가능한 재산이 거의 없음. 도박·낭비 등 면책불허가 사유가 없을 것. 소득이 조금 있어도 채무가 너무 많으면 파산이 가능해요. 서울회생법원(02-530-1672) 또는 대한법률구조공단(132)에 먼저 상담하세요." },
    cost: { title: "비용이 얼마인지 알고 싶다면", color: "#7C3AED", bg: "#F5F3FF",
      text: "인지대 2,000원 + 송달료(채권자 수 × 약 3~4만원). 채권자 5명 기준 약 30만원, 10명 기준 약 50만원이에요. 비용이 없으면 대한법률구조공단(132)에 소송구조를 신청하면 지원받을 수 있어요. 기초수급자·장애인은 비용 전부 무료예요." },
    exempt: { title: "면책 안 되는 빚이 있는지 확인하고 싶다면", color: "#DC2626", bg: "#FEF2F2",
      text: "세금·과태료, 양육비, 고의 불법행위 손해배상, 사기·횡령 배상금은 면책이 안 돼요. 나머지 카드빚·개인 대출·사업 빚 등은 면책 가능해요. 아래에서 구체적인 목록을 확인하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 게 궁금하세요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "qualify", label: "자격이 되는지 먼저 확인하고 싶어요." },
          { id: "cost", label: "비용이 얼마인지 알고 싶어요." },
          { id: "exempt", label: "면책 안 되는 빚이 있는지 확인하고 싶어요." },
        ].map((item: any) => (
          <button key={item.id} onClick={(_e: any) => setType(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
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
        <button onClick={(_e: any) => setType(null)} style={{ fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function EligibilityChecker() {
  const items = [
    "현재 빚을 갚을 수 없는 상태예요 (지급불능)",
    "소득이 없거나 최저생계비 수준이에요",
    "처분 가능한 재산이 거의 없어요",
    "도박·낭비·사기로 생긴 빚이 아니에요 (또는 일부만 해당해요)",
    "최근 7년 내 파산 면책을 받은 적 없어요",
    "최근 5년 내 개인회생 면책을 받은 적 없어요",
  ];
  const [checked, setChecked] = useState({});
  const count = Object.values(checked).filter(Boolean).length;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden", marginBottom: "1.5rem" }}>
      <div style={{ padding: "12px 16px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", margin: 0 }}>✅ 자격 체크리스트</p>
        <span style={{ fontSize: 12, color: count >= 4 ? G : "#9ca3af", fontWeight: 600 }}>{count}/{items.length} 해당</span>
      </div>
      {items.map((item: any, i: any) => (
        <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}>
          <input type="checkbox" checked={!!checked[i]} onChange={(_e: any) => setChecked(p => ({ ...p, [i]: !p[i] }))} style={{ accentColor: G, width: 15, height: 15, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "#374151" }}>{item}</span>
        </label>
      ))}
      {count >= 4 && (
        <div style={{ padding: "12px 16px", background: GL, fontSize: 13, color: GD }}>
          ✓ 기본 자격 요건을 충족할 가능성이 있어요. 대한법률구조공단(132) 또는 서울회생법원에 상담해보세요.
        </div>
      )}
    </div>
  );
}

function ProcessSteps() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
      {STEPS.map((step: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, background: "#e5e7eb", minHeight: 20 }} />}
          </div>
          <div style={{ paddingBottom: i < STEPS.length - 1 ? 20 : 0, flex: 1 }}>
            <strong style={{ fontSize: 14, color: "#111", display: "block", marginBottom: 4, lineHeight: 1.5 }}>{step.title}</strong>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 4px" }}>{step.desc}</p>
            {step.tip && <div style={{ fontSize: 12, color: GD, background: GL, borderRadius: 6, padding: "6px 10px", marginTop: 6 }}>⚠️ {step.tip}</div>}
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
      {FAQS.map((faq: any, i: any) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
          <button onClick={(_e: any) => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
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
        {HUB_LINKS.map((link: any, i: any) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
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
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />출처 및 참고자료
      </h3>
      {REFERENCES.map((group: any) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item: any) => (
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>파산·채무 관련 글</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ParasanMyeonchackPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>개인파산 · 면책 · 채무 해방</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          개인파산 면책 신청 방법 |<br />
          절차·비용·자격
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          카드빚, 대출, 사업 실패로 갚을 수 없는 빚이 쌓였을 때 — 파산 면책은 빚을 전부 없애고 다시 시작하는 제도예요.<br />
          파산하면 가족이 피해를 본다, 취업이 안 된다고 알고 있는 분이 많은데 사실이 아니에요.<br /><br />
          파산의 불이익은 본인에게만 해당하고, 면책결정이 확정되면 그 불이익도 사라져요.<br />
          자격 조건부터 확인해보세요.
        </p>

        <UrgentBanner />

        <Bdg>자격 조건 체크해보세요</Bdg>
        <EligibilityChecker />

        <Divider />

        <H2>개인파산 면책 자격 — 신청 가능한 조건은?</H2>
        <p style={body}>
          파산을 신청하기 전에 반드시 확인할 게 있어요. 면책이 안 되는 빚이 있는지예요.<br />
          세금·양육비·고의 불법행위 배상금은 파산해도 없어지지 않아요. 이 빚이 전부라면 파산보다 다른 방법을 찾아야 해요.<br />
          반대로 카드빚·대출·사업 빚이 주라면 파산 면책이 가능해요.
        </p>
        <div style={{ border: "1px solid #FEE2E2", borderRadius: 8, padding: "14px 18px", marginBottom: "1.5rem", background: "#fff" }}>
          {DISQUALIFICATIONS[0].items.map((item: any, i: any) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0", borderBottom: i < DISQUALIFICATIONS[0].items.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <span style={{ color: "#DC2626", fontSize: 11, flexShrink: 0, marginTop: 2 }}>✕</span>
              <span style={{ fontSize: 13, color: "#374151" }}>{item}</span>
            </div>
          ))}
        </div>
        <GreenBox title="카드빚·대출·사업 빚은 면책돼요 — 채권자 목록이 핵심이에요">
          면책 대상: 카드빚, 은행 대출, 개인 차용금, 의료비, 사업 관련 채무 등 일반 금전채무 전부<br />
          채권자 목록에 반드시 전부 기재해야 해요. 실수로 누락하면 그 채권자에게는 면책 효력이 안 미쳐요.<br />
          신청 전에 신용정보원(www.credit.or.kr)에서 내 채무 목록을 조회해서 빠진 채권자가 없는지 확인하세요.
        </GreenBox>

        <HubLinks />

        <H2>개인파산 면책 신청 절차 — 신청부터 면책 확정까지</H2>
        <p style={body}>
          신청부터 면책 확정까지 보통 6개월~1년 걸려요. 재산이 거의 없으면 동시폐지로 빨리 끝나는 경우도 있어요.<br />
          가장 중요한 건 심문기일에 반드시 출석하는 것이에요. 안 나오면 면책이 기각돼요.<br />
          서류 준비가 어려우면 대한법률구조공단(132)에 먼저 연락하세요. 신청서 작성부터 도와줘요.
        </p>
        <ProcessSteps />

        <Divider />

        <H2>개인파산 면책 절차·비용·자격에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 상담받을 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "서울회생법원 — 02-530-1672", url: "tel:025301672", sub: "파산·면책 전문 법원" },
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 법률상담·소송구조 신청" },
              { label: "신용회복위원회 (1600-5500)", url: "tel:16005500", sub: "파산 전 채무조정 상담" },
            ].map((item: any, i: any) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 서울회생법원(02-530-1672) 또는 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
