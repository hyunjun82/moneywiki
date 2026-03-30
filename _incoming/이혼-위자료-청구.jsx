import { useState } from "react";
const SIDEBAR_LINKS = ["이혼 재산분할 비율","재산분할 대상 범위","이혼 위자료 청구","이혼 친권·양육권","이혼 양육비 청구","협의이혼 절차","이혼 무료 법률상담","이혼 전 재산 빼돌림","이혼 별거 중 양육비","이혼 배우자 가출","이혼 빚 공동부담","재산분할 청구 기한","위자료 소멸시효","이혼 후 공동명의 대출","이혼 퇴직금 재산분할","면접교섭권 신청","양육비 미지급 대응","대한법률구조공단 상담","이혼 일방 거부","소액사건 소장 작성"];
const HUB_LINKS = [
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
  { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "재산분할 비율 결정 기준", href: "#" },
  { title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인", desc: "위자료 청구 방법과 기준", href: "#" },
  { title: "이혼 전 재산 빼돌림 대비 | 가압류·처분금지가처분", desc: "재산 보전 방법", href: "#" },
];
const FAQS = [
  { urgent: true, q: "위자료는 얼마나 받을 수 있나요?", a: "위자료는 법원이 사안을 종합해서 결정해요. 실무상 500만원~3,000만원 범위가 많아요. 폭행이나 외도가 심각하고 증거가 풍부할수록 높아져요. 외도 상대방(상간자)에게도 별도로 위자료를 청구할 수 있어요. 상간자 위자료는 별개 소송으로 진행해요." },
  { urgent: true, q: "외도를 용서했는데 나중에 위자료를 청구할 수 있나요?,", a: "외도 사실을 안 날로부터 6개월 이내에 이혼 청구를 해야 하고, 외도가 있은 날로부터 2년이 지나면 청구하지 못해요. 용서한 경우(사전 동의·사후 용서)에는 청구 불가예요. 단, 용서 후에 또 다른 외도가 있었다면 새로 청구할 수 있어요. 지금 이혼을 생각 중이라면 기간 확인이 중요해요." },
  { urgent: false, q: "위자료 소멸시효는 얼마인가요?", a: "이혼 위자료 청구권의 소멸시효는 이혼 확정일로부터 3년이에요. 이혼 후 3년이 지나면 청구할 수 없어요. 이혼하지 않은 상태에서 위자료만 따로 청구하는 것도 가능하고, 이 경우엔 손해 및 가해자를 안 날로부터 3년이에요." },
  { urgent: false, q: "위자료를 현금 대신 부동산으로 받을 수 있나요?", a: "가능하지만 세금 문제가 생겨요. 위자료로 부동산을 받으면 취득세 3.5%가 부과돼요. 재산분할로 받으면 1.5%예요. 위자료 명목의 부동산이전은 주는 사람에게도 양도소득세가 부과될 수 있어요. 협의이혼이라면 재산분할 명목으로 기재하는 게 세금 면에서 유리해요." },
];
const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
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
export default function Page21() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 위자료 · 손해배상</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 위자료 청구 |<br />
          금액 기준과 소멸시효 확인
        </h1>
        <p style={{ ...body, fontSize: 15 }}>위자료는 이혼의 원인을 만든 배우자에게 정신적 피해를 보상받는 돈이에요. 금액은 폭행·외도 등 귀책 정도, 혼인 기간, 자녀 유무, 상대방 재산을 종합해서 법원이 결정해요. 실무상 500만원~3,000만원 범위인 경우가 많아요.</p>
        <HubLinks />
        <H2>이혼 위자료 청구 — 자주 묻는 것들</H2>
        <FAQ />
        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 도움받을 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 법률상담 · 소송구조 신청" },
              { label: "대법원 전자민원센터", url: "https://help.scourt.go.kr", sub: "소장 양식 무료 제공" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 민법·가사소송법을 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
