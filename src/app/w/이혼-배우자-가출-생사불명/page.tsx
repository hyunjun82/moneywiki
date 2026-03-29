"use client";
import { useState } from "react";

const SIDEBAR_LINKS = [
  "이혼 무료 법률상담",
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
  "교도소 배우자 이혼",
  "이혼 빚 공동부담",
  "재산분할 청구 기한",
  "위자료 소멸시효",
  "이혼 후 공동명의 대출",
  "면접교섭권 신청",
  "양육비 미지급 대응",
  "실종선고 신청 방법",
  "대한법률구조공단 상담",
];

const HUB_LINKS = [
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "공시송달 이혼은 공단 지원 가능해요", href: "#" },
  { title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인", desc: "가출·유기에 따른 위자료 청구 방법", href: "#" },
  { title: "이혼 친권·양육권 | 법원 결정 기준", desc: "배우자 부재 시 단독 양육권 받는 방법", href: "#" },
  { title: "이혼 전 재산 빼돌림 대비 | 가압류·처분금지가처분", desc: "가출 배우자 재산 보전 방법", href: "#" },
];

const SITUATION_TYPES = [
  {
    type: "가출 후 주소 불명",
    reason: "민법 840조 2호 — 악의의 유기",
    desc: "생존은 알지만 어디 있는지 모르는 경우예요. 정당한 이유 없이 동거·부양·협조의무를 저버린 것으로 이혼 사유가 돼요.",
    note: "공시송달로 소장 전달 → 결석 판결 가능",
  },
  {
    type: "생사 3년 이상 불명",
    reason: "민법 840조 5호 — 생사불명",
    desc: "살아 있는지 여부 자체를 전혀 알 수 없는 상태가 3년 이상 계속된 경우예요. 가출과 다르게 생존 자체가 불분명해야 해요.",
    note: "공시송달로 소장 전달 → 결석 판결 가능",
  },
  {
    type: "장기 별거로 혼인 파탄",
    reason: "민법 840조 6호 — 혼인 지속 어려운 중대한 사유",
    desc: "가출·행방불명이 아니어도 장기 별거로 혼인관계가 사실상 회복 불가능하게 파탄 난 경우 적용 가능해요.",
    note: "상대방 주소 알고 있으면 일반 소송 진행",
  },
];

const STEPS = [
  {
    title: "가출·생사불명 증거 먼저 확보하세요",
    desc: "공시송달 이혼을 위해서는 '상대방 주소를 알 수 없다'는 것을 법원에 소명해야 해요. 경찰에 실종신고를 했다면 신고 접수증을 보관해두세요. 주민등록 주소로 법원 송달을 시도해도 반송됐다는 기록이 핵심 자료가 돼요. 가출 날짜를 알 수 있는 자료(마지막 통화, 문자, 목격자 진술)도 함께 준비하세요.",
    tip: "경찰에 실종신고를 하면 접수증이 발급돼요. 생사불명 소명에 활용할 수 있어요.",
  },
  {
    title: "이혼 소장 제출 — 이혼 사유와 청구 내용 결정",
    desc: "소장에 이혼 사유(악의의 유기 또는 생사불명), 위자료 청구 금액, 재산분할 청구, 양육권·양육비 청구를 한꺼번에 기재해요. 상대방 주소는 '마지막 주민등록 주소'를 기재하면 돼요. 법원이 송달을 시도하고, 송달이 안 되면 공시송달을 진행해줘요. 소장 작성이 어려우면 대한법률구조공단(132)에서 무료 지원받을 수 있어요.",
    link: { label: "대한법률구조공단 (132)", url: "tel:132" },
  },
  {
    title: "법원 송달 시도 → 반송 → 공시송달 신청",
    desc: "법원이 소장을 상대방 주소로 보내요. 반송되면 내가 '공시송달 신청서'를 법원에 제출해야 해요. 공시송달 신청서에는 상대방 주소를 알 수 없다는 소명 자료(실종신고 접수증, 주민등록 주소 반송 내역 등)를 첨부해요. 법원이 허가하면 법원 게시판과 전자공시 시스템에 공고를 내요.",
    tip: "공시송달 첫 번째는 공시한 날로부터 2주 후 효력 발생. 이후 재판 절차가 진행돼요.",
  },
  {
    title: "결석 재판 — 내 주장만으로 판결",
    desc: "공시송달로 진행되면 상대방이 법원에 나타나지 않아도 재판이 진행돼요. 상대방이 아무런 답변을 하지 않으면 내가 주장한 내용을 인정한 것으로 보고 판결이 나요. 위자료, 재산분할, 양육권 청구도 이 단계에서 판단돼요. 단, 위자료·양육권은 내가 입증 자료를 충분히 제출해야 인정받을 수 있어요.",
    tip: "공시송달 판결 후 배우자가 '추완 항소'를 제기할 수 있어요. 대비해서 증거를 잘 확보해두세요.",
  },
  {
    title: "판결 확정 후 이혼신고",
    desc: "판결이 확정되면 1개월 이내에 주민센터에 이혼신고를 해야 해요. 이혼신고를 해야 법적으로 혼인관계가 끝나요. 신고를 잊으면 아직 법적으로 혼인 상태예요. 판결 확정일을 메모해두고 기한 안에 신고하세요.",
  },
];

const FAQS = [
  {
    urgent: true,
    q: "배우자가 가출한 지 1년이 됐는데 바로 이혼 소송할 수 있나요?",
    a: "네. 1년이라도 정당한 이유 없이 가출해서 동거·부양·협조의무를 저버렸다면 '악의의 유기'로 이혼 청구 가능해요. 3년을 기다릴 필요 없어요. 3년 기준은 '생사 자체가 불명'인 경우에만 해당해요. 가출 후 연락이 두절된 것만으로도 충분히 이혼 사유가 돼요.",
  },
  {
    urgent: true,
    q: "배우자 주소를 모르면 소장을 어디로 보내야 하나요?",
    a: "마지막으로 알고 있는 주민등록 주소로 기재하면 돼요. 법원이 먼저 그 주소로 송달을 시도해요. 반송되면 내가 공시송달 신청서를 제출하면 돼요. 주민등록 주소조차 없으면 처음부터 공시송달 신청을 할 수 있어요. 132에 전화하면 절차를 안내해줘요.",
  },
  {
    urgent: false,
    q: "공시송달로 이혼하면 위자료도 받을 수 있나요?",
    a: "청구는 가능하지만 입증이 더 철저해야 해요. 상대방이 법원에 나오지 않아서 반박이 없는 상황이지만, 법원은 위자료 인정에 신중해요. 가출 경위, 기간, 생활고 등 구체적인 피해 사실을 서류로 입증해야 해요. 가출로 인한 위자료 실무상 인정 범위는 500만원~3,000만원 수준이에요.",
  },
  {
    urgent: false,
    q: "나중에 배우자가 나타나면 이혼이 취소되나요?",
    a: "공시송달로 판결이 확정되면 배우자가 나타나도 이혼이 자동 취소되지 않아요. 단, 배우자가 공시송달 사실을 몰랐다는 이유로 '추완 항소'를 제기할 수 있어요. 추완 항소가 받아들여지면 새로운 소송 절차가 시작돼요. 이를 대비해서 가출 경위·기간에 대한 증거를 충분히 확보해두는 게 중요해요.",
  },
  {
    urgent: false,
    q: "배우자 생사가 5년 이상 불명이에요. 실종선고와 이혼 중 어느 것이 유리한가요?",
    a: "5년 이상 생사불명이면 법원에 실종선고를 신청할 수 있어요. 실종선고가 나면 배우자가 법적으로 사망한 것으로 간주되어 혼인이 자동 해소돼요. 다만 배우자가 살아 돌아오면 실종선고가 취소되고 혼인이 부활할 수 있어요. 이혼 판결은 배우자가 돌아와도 혼인이 부활하지 않아요. 어느 쪽이 유리한지는 상황에 따라 달라지니 132에 상담하세요.",
  },
  {
    urgent: false,
    q: "아이 양육권은 어떻게 되나요?",
    a: "이혼 소장에 양육권 청구를 함께 하세요. 배우자가 장기간 부재 중이고 내가 실질적으로 아이를 돌보고 있다면 단독 양육권을 받을 가능성이 높아요. 양육비는 배우자 재산이 있으면 소송 중 또는 판결 후 강제집행으로 받을 수 있어요.",
  },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민법 제840조 제2호 — 악의의 유기", url: "https://www.law.go.kr/" },
    { label: "민법 제840조 제5호 — 생사불명 3년 이상", url: "https://www.law.go.kr/" },
    { label: "민사소송법 제194조·제196조 — 공시송달", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 공시송달에 의한 이혼 (2026. 2. 15. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=3&cciNo=2&cnpClsNo=2" },
    { label: "대한법률구조공단 (132) — 무료 이혼 법률상담", url: "https://www.klac.or.kr" },
  ]},
];

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: { children: React.ReactNode }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: { children: React.ReactNode }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }

function SituationChecker() {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📌 내 상황을 선택하세요</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {SITUATION_TYPES.map((item, i) => (
          <div key={i}>
            <button onClick={() => setSel(sel === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 8, border: `1px solid ${sel === i ? G : "#e5e7eb"}`, background: sel === i ? GL : "#fff", cursor: "pointer", textAlign: "left", gap: 10 }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111", display: "block" }}>{item.type}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>이혼 사유: {item.reason}</span>
              </div>
              <span style={{ fontSize: 16, color: "#9ca3af", flexShrink: 0 }}>{sel === i ? "−" : "+"}</span>
            </button>
            {sel === i && (
              <div style={{ border: "1px solid #9FE1CB", borderRadius: "0 0 8px 8px", padding: "12px 14px", borderTop: "none" }}>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 8px" }}>{item.desc}</p>
                <div style={{ fontSize: 12, color: GD, background: GL, borderRadius: 6, padding: "6px 10px" }}>💡 {item.note}</div>
              </div>
            )}
          </div>
        ))}
      </div>
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

export default function IhonGachulPAge() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 가출 · 공시송달 · 생사불명</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 배우자 가출·생사불명 |<br />
          3년 이상이면 이혼 청구 가능해요
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          배우자가 가출하고 연락이 두절됐는데 이혼을 어떻게 해야 할지 모르는 분이 많아요.<br />
          배우자 주소를 모르거나 어디 있는지 모르더라도 이혼 소송을 제기할 수 있어요.<br /><br />
          생사불명은 3년 이상이어야 하지만, 단순 가출은 기간에 관계없이 이혼 청구 가능해요.<br />
          소장은 법원이 공시 방법으로 전달해줘요. 내 상황을 먼저 선택해보세요.
        </p>

        <SituationChecker />

        <H2>가출·생사불명 배우자 이혼 — 이혼 사유와 공시송달 절차</H2>
        <p style={body}>
          배우자 주소를 몰라도 이혼 소송이 가능해요. 핵심은 공시송달이에요.<br />
          법원이 소장을 법원 게시판과 전자공시 시스템에 게시하고, 그 사실을 배우자가 확인할 수 있도록 하는 방식이에요.<br />
          배우자가 나타나지 않으면 내 주장대로 판결이 나요.
        </p>
        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>가출 vs 생사불명 — 이혼 사유가 달라요</strong>
          가출 후 연락 두절 → 민법 840조 2호 '악의의 유기'. 기간 제한 없음.<br />
          생사 자체를 알 수 없음 → 민법 840조 5호 '생사불명'. 3년 이상 경과해야 청구 가능.<br />
          장기 별거로 혼인 파탄 → 민법 840조 6호 '혼인 지속 어려운 중대한 사유'. 상대방 주소 알면 일반 소송 가능.
        </div>

        <HubLinks />

        <H2>공시송달 이혼 절차 — 순서대로</H2>
        <p style={body}>
          일반 이혼 소송과 절차는 같고, 송달 방법만 달라요.<br />
          소장 제출 → 주소 송달 시도 → 반송 → 공시송달 신청 → 결석 판결 순서예요.<br />
          소장 작성이 어려우면 132에 전화하면 무료로 도와줘요.
        </p>
        <ProcessSteps />

        <Divider />

        <H2>이혼 배우자 가출·생사불명에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 도움받을 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "공시송달 이혼 소장 작성 무료 지원" },
              { label: "대법원 전자민원센터 — 공시송달 신청 안내", url: "https://help.scourt.go.kr", sub: "공시송달 신청서 양식 제공" },
              { label: "경찰청 실종신고 (182)", url: "tel:182", sub: "생사불명 소명 자료 확보" },
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
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          {REFERENCES.map((group) => (
            <div key={group.category} style={{ marginBottom: 14 }}>
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
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 대한법률구조공단(132) 또는 가정법원에 상담하세요.
        </div>
      </div>
    </div>
  );
}
