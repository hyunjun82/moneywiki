"use client";
import { useState } from "react";

const SIDEBAR_LINKS = ["이혼 양육비 청구","이혼 친권·양육권","협의이혼 절차","이혼 소송 증거 수집","이혼 위자료 청구","이혼 재산분할 비율","이혼 전 재산 빼돌림","별거 중 이혼 가능한가","이혼 무료 법률상담","양육비 미지급 대응","양육비이행관리원","면접교섭권 신청","이혼 소송 중 생활비","이혼 후 공동명의 대출","이혼 퇴직금 재산분할","재산분할 청구 기한","위자료 소멸시효","이혼 빚 공동부담","대한법률구조공단 상담","소액사건 소장 작성"];

const HUB_LINKS = [
  { title: "이혼 양육비 청구 | 금액 계산과 미지급 시 강제 받는 방법", desc: "이혼 후 양육비 청구 전체 정리", href: "#" },
  { title: "이혼 친권·양육권 | 법원 결정 기준과 유리하게 받는 방법", desc: "양육권 판단 기준 전체 정리", href: "#" },
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
  { title: "이혼 전 재산 빼돌림 대비 | 처분금지가처분·가압류", desc: "소송 중 재산 보전 방법", href: "#" },
];

const STEPS = [
  {
    title: "이혼 소장 제출 즉시 — 사전처분 신청서도 함께 내세요",
    desc: "양육비 사전처분은 이혼소송을 제기한 뒤에만 신청할 수 있어요. 소장을 낼 때 '양육비 사전처분 신청서'를 함께 제출하는 게 가장 빠른 방법이에요. 나중에 따로 내도 되지만 소송 초기에 신청할수록 양육비를 빨리 받을 수 있어요. 가사소송법 제62조에 근거해요.",
    tip: "사전처분 신청서는 대법원 전자민원센터(help.scourt.go.kr)에서 양식을 무료로 받을 수 있어요.",
  },
  {
    title: "신청서에 이것을 적어야 받을 수 있어요",
    desc: "① 현재 내가 아이를 양육하고 있다는 사실 ② 상대방이 양육비를 주지 않고 있다는 사실 ③ 상대방의 소득·재산 현황(급여명세서, 건강보험료 납부확인서 등) ④ 아이 양육에 실제로 드는 비용(교육비, 의료비, 생활비). 상대방 소득이 높을수록 임시 양육비가 높게 산정돼요. 상대방 소득 증빙 자료를 최대한 확보하세요.",
  },
  {
    title: "법원 결정 — 보통 판결 양육비의 약 60% 수준",
    desc: "법원은 부모 합산 소득과 자녀 연령을 기준으로 서울가정법원 양육비 산정기준표를 참고해서 임시 양육비를 결정해요. 임시 양육비는 최종 판결 양육비의 약 60% 수준으로 결정되는 경우가 많아요. 결정문이 나오면 상대방에게 직접 지급 명령이 내려져요.",
    tip: "임시 양육비 결정 후 상대방이 안 주면 강제집행은 안 되지만, 1,000만원 이하 과태료를 신청할 수 있어요.",
  },
  {
    title: "양육비를 안 주면 — 과태료 신청하세요",
    desc: "임시 양육비 사전처분은 집행력이 없어요. 강제집행(압류)을 바로 할 수 없어요. 대신 상대방이 정당한 이유 없이 안 주면 법원에 '이행명령'을 신청하고, 이행명령도 안 따르면 과태료(1,000만원 이하) 부과를 신청할 수 있어요. 소송 중이라서 상대방이 과태료를 맞으면 심리적 압박이 커져요.",
    link: { label: "양육비이행관리원 (02-6232-7100)", url: "tel:026232710" },
  },
  {
    title: "이혼 확정 후 — 판결 양육비로 강제집행 가능",
    desc: "이혼 판결이 확정되면 양육비가 판결조서에 기재돼요. 이때부터는 강제집행이 가능해요. 상대방 예금 압류, 급여 압류(최대 1/2), 부동산 경매 신청을 할 수 있어요. 양육비이행관리원(02-6232-7100)에 신청하면 강제집행을 무료로 도와줘요.",
  },
];

const FAQS = [
  { urgent: true, q: "별거 중인데 이혼 소송 전이에요. 지금 양육비를 받을 수 있나요?", a: "이혼 소송을 제기하기 전에는 양육비 사전처분을 신청할 수 없어요. 하지만 별거 중이라도 이혼 소장을 먼저 제출하면 그 즉시 사전처분 신청이 가능해요. 소장 제출 → 사전처분 신청을 같은 날 하면 돼요. 132에 전화하면 소장 작성부터 도와줘요." },
  { urgent: true, q: "상대방이 소득이 없다고 주장해요. 양육비를 아예 못 받나요?", a: "아니에요. 법원은 소득이 없어도 최소한의 양육 의무가 있다고 봐요. 근로 능력이 있는데 일을 안 하는 경우, 법원은 잠재적 소득을 추정해서 양육비를 산정해요. 상대방 재산(부동산, 자동차, 예금)을 입증하면 소득이 없어도 양육비가 산정될 수 있어요." },
  { urgent: false, q: "임시 양육비와 최종 판결 양육비가 차이 나면 어떻게 되나요?", a: "임시 양육비는 최종이 아니에요. 이혼 판결에서 더 높은 양육비가 확정되면 소급 청구가 가능한 경우도 있어요. 임시 양육비가 더 높게 결정됐다면 최종 판결에서 조정될 수 있어요. 어느 쪽이든 임시 양육비를 신청해두는 게 유리해요." },
  { urgent: false, q: "과거 양육비, 즉 별거 기간 동안 못 받은 양육비도 청구할 수 있나요?", a: "청구할 수 있어요. 다만 2024년 7월 대법원 판례 변경으로, 합의한 적 없는 과거 양육비는 자녀가 성년이 된 이후 10년 이내에 청구해야 해요. 합의했는데 못 받은 양육비는 3년 소멸시효가 적용돼요. 별거 기간이 길수록 지금 바로 청구하는 게 중요해요." },
  { urgent: false, q: "양육비 얼마나 받을 수 있는지 기준이 있나요?", a: "서울가정법원 양육비 산정기준표(2022년 시행)가 기준이에요. 부모 합산 소득과 자녀 나이를 교차해서 표준 양육비가 나와요. 예를 들어 부모 합산 소득 월 400만원, 자녀 만 6세이면 월 약 60~70만원 수준이에요. 자녀 수가 많을수록 비례해서 증가해요. 양육비이행관리원 홈페이지에서 계산해볼 수 있어요." },
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }: any) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
const Bdg = ({ children }: any) => <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;

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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼·양육비 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function IhonSosongYangYukbiPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 양육비 · 사전처분</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 별거 중·소송 중 양육비 |<br />
          이혼 전에 받을 수 있는 임시 양육비
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          이혼 소송이 끝날 때까지 양육비를 한 푼도 못 받고 버텨야 한다고 생각하시는 분이 많아요.<br />
          아니에요. 이혼 소장을 낸 직후부터 임시 양육비를 신청할 수 있어요.<br /><br />
          이걸 '양육비 사전처분'이라고 해요. 가사소송법 제62조에 근거한 제도예요.<br />
          소장 제출 → 사전처분 신청 → 법원 결정 → 상대방에게 임시 양육비 지급 명령 순서예요.
        </p>

        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "0 0 1.5rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>핵심 정리 — 별거·소송 중 임시 양육비</strong>
          신청 시점: 이혼 소장 제출 이후 (별거 중이어도 소장만 내면 바로 신청 가능)<br />
          금액: 최종 판결 양육비의 약 60% 수준<br />
          안 주면: 강제집행 불가 → 이행명령 → 과태료(1,000만원 이하) 신청<br />
          법적 근거: 가사소송법 제62조
        </div>

        <HubLinks />

        <H2>이혼 전 임시 양육비 받는 방법 — 사전처분 신청 순서</H2>
        <p style={body}>
          소장 제출과 동시에 사전처분 신청서를 함께 내면 가장 빠르게 받을 수 있어요.<br />
          상대방 소득 자료를 최대한 확보하세요. 소득이 높을수록 임시 양육비가 높게 산정돼요.
        </p>
        <ProcessSteps />

        <Divider />
        <H2>임시 양육비가 약 60% 수준인 이유</H2>
        <p style={body}>
          임시 양육비는 최종 판결 양육비의 약 60% 수준으로 산정되는 게 일반적이에요.<br />
          왜냐하면 임시 양육비는 이혼이 아직 확정되지 않은 상태에서 긴급히 아이 양육비를 보장하는 목적이거든요.<br />
          최종 판결에서는 부모 합산 소득, 자녀 연령, 자녀 수 등 더 많은 요소를 고려해서 금액이 조정될 수 있어요.<br />
          임시 양육비라도 신청해두는 게 중요한 이유는 이 기간 동안 아이 양육에 들어가는 실제 비용을 지킬 수 있기 때문이에요.
        </p>
        <Divider />
        <H2>이혼 별거 중·소송 중 양육비에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 도움받을 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "소장·사전처분 신청서 작성 무료 지원" },
              { label: "양육비이행관리원 (02-6232-7100)", url: "tel:026232710", sub: "양육비 미지급 강제집행 무료 지원" },
              { label: "대법원 전자민원센터 — 사전처분 신청서 양식", url: "https://help.scourt.go.kr", sub: "양육비 사전처분 신청서 무료 제공" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 가사소송법 제62조·찾기쉬운 생활법령(2026. 2. 28. 기준)을 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
