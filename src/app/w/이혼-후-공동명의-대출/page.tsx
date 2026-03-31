"use client";
// @ts-nocheck
import { useState } from "react";
const SIDEBAR_LINKS = ["이혼 재산분할 비율","재산분할 대상 범위","이혼 위자료 청구","이혼 친권·양육권","이혼 양육비 청구","협의이혼 절차","이혼 무료 법률상담","이혼 전 재산 빼돌림","이혼 별거 중 양육비","이혼 배우자 가출","이혼 빚 공동부담","재산분할 청구 기한","위자료 소멸시효","이혼 후 공동명의 대출","이혼 퇴직금 재산분할","면접교섭권 신청","양육비 미지급 대응","대한법률구조공단 상담","이혼 일방 거부","소액사건 소장 작성"];
const HUB_LINKS = [
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
  { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "재산분할 비율 결정 기준", href: "#" },
  { title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인", desc: "위자료 청구 방법과 기준", href: "#" },
  { title: "이혼 전 재산 빼돌림 대비 | 가압류·처분금지가처분", desc: "재산 보전 방법", href: "#" },
];
const FAQS = [
  { urgent: true, q: "이혼 합의서에 상대방이 대출을 갚기로 했는데 안 갚아요. 어떻게 하나요?", a: "합의서가 공정증서이면 강제집행이 가능해요. 일반 합의서면 소송을 제기해야 해요. 은행에 대해서는 나도 상환 의무가 있으니 내가 갚은 뒤 상대방에게 구상권을 청구하세요. 상대방 재산에 가압류를 신청하면 구상권 확보에 도움이 돼요." },
  { urgent: false, q: "공동명의 대출을 단독명의로 전환하는 방법은 뭔가요?", a: "은행에 대출 명의 변경을 신청해야 해요. 단, 은행이 동의해야 하고, 단독 명의자의 신용·소득 심사를 통과해야 해요. 심사를 통과하면 기존 대출을 해지하고 단독명의 대출을 새로 실행해요. 이혼 전에 처리하는 게 가장 간단해요." },
  { urgent: false, q: "상대방이 공동명의 대출을 안 갚으면 내 신용에 영향이 있나요?", a: "네. 공동명의 대출은 부부 모두의 연대채무예요. 상대방이 안 갚으면 은행이 나에게 상환을 요구하고, 내가 못 갚으면 내 신용에 연체 기록이 남아요. 상대방 연체가 예상되면 즉시 은행에 연락해서 단독명의 전환 또는 상환 방법을 협의하세요." },
  { urgent: false, q: "이혼 후 공동명의 집에 담보대출이 있어요. 집을 팔면 대출은 어떻게 되나요?", a: "집을 팔면 매각 대금에서 대출을 먼저 상환해요. 남은 금액을 재산분할 비율에 따라 나눠요. 집값이 대출보다 낮으면(깡통 전세·역전세) 오히려 부족분을 부부가 추가로 분담해야 해요. 이 경우 처리 방법을 이혼 합의 시 반드시 결정해두어야 해요." },
];
const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }: any) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
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
export default function Page23() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 공동명의 대출 · 채무 처리</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 후 공동명의 대출은 |<br />
          누가 갚아야 하나요
        </h1>
        <p style={{ ...body, fontSize: 15 }}>이혼 합의서에 상대방이 갚기로 했는데 안 갚고 있어요. 은행에서 나에게 상환을 요구하고 있어요. 공동명의 대출은 이혼해도 은행에 대한 연대 상환 의무가 그대로 남아요. 지금 당장 할 수 있는 행동이 있어요.</p>
        <HubLinks />
        <H2>공동명의 대출의 법적 책임 — 혼인해제가 효력이 없어</H2>
        <p style={body}>공동명의 대출은 이혼 전후로 법적 성질이 바뀌지 않아요. 이혼해도 은행 입장에서 봤을 때 당신과 상대방은 여전히 연대 채무자예요. 연대 채무라는 건 둘 중 누가 갚든 은행은 상관없다는 뜻이죠. 상대방이 갚으면 그만이지만, 상대방이 안 갚으면 은행은 언제든지 당신에게 전액을 청구할 수 있어요.</p>
        <p style={body}>이혼 합의서에 '상대방이 대출을 갚겠다'고 써도 은행을 구속하지 못해요. 이혼 합의는 당신과 상대방 사이의 계약일 뿐, 은행한테는 아무 효력이 없어요. 상대방이 약속을 어기면 당신이 온전한 피해자가 되는 거죠. 그래서 이혼 전에 공동명의 대출을 단독명의로 전환하거나 상환하는 게 가장 안전해요.</p>
        <H2>공동명의 대출 중단하는 방법</H2>
        <p style={body}>가장 좋은 방법은 대출을 완전히 상환하는 거예요. 하지만 불가능하다면 단독명의로 전환해야 해요. 은행에 '공동명의 대출 명의 변경'을 신청하면 돼요. 다만 은행 입장에선 리스크가 커지니까 동의가 필요해요. 단독 명의자(당신 또는 상대방)가 충분한 신용과 소득을 가지고 있는지 재심사를 해야 거든요.</p>
        <p style={body}>심사에 통과하면 기존 공동명의 대출을 해지하고 단독명의 신규 대출을 새로 실행해요. 이 과정에서 금리가 오르거나 대출 조건이 바뀔 수 있으니 확인이 필요해요. 이혼 전에 처리하는 게 가장 간단한데, 이유는 혼인 상태일 때 상대방을 설득하기가 이혼 후보다 쉽거든요. 이혼 후에는 상대방이 협력하지 않으면 단독명의 전환이 어려워질 수 있어요.</p>
        <H2>상대방이 대출을 안 갚을 때 대응 방법</H2>
        <p style={body}>상대방이 대출을 안 갚으면 먼저 은행에 즉시 연락해야 해요. 상대방의 연체를 알리고 자신의 상황을 설명해두는 거죠. 그 다음 상대방에게 상환을 촉구하고, 가능하면 서면(카톡, 문자)으로 남겨두세요. 상대방이 계속 안 갚으면 이혼 합의서의 공정증서 여부를 확인해야 해요.</p>
        <p style={body}>합의서가 공정증서면 강제집행이 가능해요. 공정증서가 아니면 소송을 제기해서 판결을 받아야 강제집행을 할 수 있어요. 한편 당신이 먼저 은행에 상환했다면 상대방에게 '구상권'을 청구할 수 있어요. 구상권은 당신이 대신 갚은 돈을 상대방으로부터 받는 권리죠. 상대방 재산에 가압류를 신청하면 나중에 판결이나 합의가 났을 때 강제집행이 수월해요.</p>
        <H2>이혼 후 공동명의 대출은 — 자주 묻는 것들</H2>
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
