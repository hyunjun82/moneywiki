"use client";
import { useState } from "react";
const SIDEBAR_LINKS = ["이혼 재산분할 비율","재산분할 대상 범위","이혼 위자료 청구","이혼 친권·양육권","이혼 양육비 청구","협의이혼 절차","이혼 무료 법률상담","이혼 전 재산 빼돌림","이혼 별거 중 양육비","이혼 배우자 가출","이혼 빚 공동부담","재산분할 청구 기한","위자료 소멸시효","이혼 후 공동명의 대출","이혼 퇴직금 재산분할","면접교섭권 신청","양육비 미지급 대응","대한법률구조공단 상담","이혼 일방 거부","소액사건 소장 작성"];
const HUB_LINKS = [
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
  { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "재산분할 비율 결정 기준", href: "#" },
  { title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인", desc: "위자료 청구 방법과 기준", href: "#" },
  { title: "이혼 전 재산 빼돌림 대비 | 가압류·처분금지가처분", desc: "재산 보전 방법", href: "#" },
];
const FAQS = [
  { urgent: true, q: "상대방이 이혼을 절대 안 해준다고 해요. 강제로 이혼할 수 있나요?", a: "네. 민법 840조에서 정한 이혼 사유(외도, 악의의 유기, 심히 부당한 대우, 생사불명, 혼인 지속 불가 중대 사유)가 인정되면 상대방 동의 없이도 법원이 이혼 판결을 내려줘요. 상대방이 이혼을 거부하는 이유가 재산 때문이라면 재산분할 조건을 명확히 하는 조정이혼을 먼저 시도해볼 수 있어요." },
  { urgent: false, q: "이혼 사유 6가지는 어떤 건가요?", a: "민법 840조: ①외도(부정행위) ②악의의 유기 ③배우자·직계존속으로부터 심히 부당한 대우 ④직계존속이 배우자로부터 심히 부당한 대우 ⑤생사불명 3년 이상 ⑥혼인을 계속하기 어려운 중대한 사유. 장기 별거, 성격 차이로 인한 혼인 파탄, 심각한 경제적 학대도 6호에 해당할 수 있어요." },
  { urgent: false, q: "이혼 소송에서 지는 경우도 있나요?", a: "이혼 소송에서 이혼이 기각되는 경우가 있어요. 이혼 사유가 인정되지 않거나, 청구인이 유책 배우자여서 기각되는 경우예요. 특히 내가 먼저 외도를 하거나 집을 나온 경우, 상대방 동의 없이 청구하면 기각될 수 있어요. 소장 제출 전에 132에 상담하세요." },
  { urgent: false, q: "조정이혼과 재판이혼, 어떻게 다른가요?", a: "이혼 소송을 제기하면 법원은 먼저 조정 절차를 거쳐요(조정전치주의). 조정에서 합의하면 조정이혼으로 끝나요. 조정이 안 되면 재판으로 넘어가서 법원이 판결을 내려요. 조정이혼은 양측이 조건을 합의한 거라 이후 분쟁이 적어요. 상대방이 재산 조건에는 동의할 수 있으면 조정을 먼저 시도해봐요." },
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
export default function Page22() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 재판이혼 · 이혼 사유</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 일방 거부·별거 이혼 사유 |<br />
          상대방이 거부해도 이혼하는 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>상대방이 이혼을 거부하고 있어요. 협의이혼은 둘 다 동의해야 가능하지만, 재판이혼은 상대방 동의 없이도 할 수 있어요. 민법 840조에서 정한 6가지 이혼 사유 중 하나에 해당하면 법원이 이혼을 선고해줘요.</p>
        <HubLinks />
        <H2>협의이혼과 재판이혼의 차이는 뭔가요</H2>
        <p style={body}>협의이혼은 둘이 모두 동의해야 가능해요. 상대방이 거부하면 협의이혼을 할 수 없어요. 하지만 민법 840조에 정한 이혼 사유 중 하나에 해당하면 재판이혼으로 넘어가요. 재판이혼은 법원이 이혼을 선고하는 거라 상대방 동의가 필요 없어요.</p>
        <p style={body}>이혼 소송을 제기하면 법원은 먼저 조정 절차를 거쳐요. 이를 조정전치주의라고 해요. 조정에서 합의하면 조정이혼으로 끝나고, 조정이 안 되면 재판으로 진행돼요. 조정이혼은 양측이 조건을 합의한 거라 이후 분쟁이 적어요. 상대방이 재산 조건에는 동의할 수 있으면 조정을 먼저 시도해보는 게 좋아요.</p>
        <Divider />
        <H2>민법 840조 이혼 사유 6가지는 뭔가요</H2>
        <p style={body}>이혼 사유는 정확히 6가지예요. ①외도(부정행위) ②악의의 유기 ③배우자나 직계존속으로부터 심히 부당한 대우 ④직계존속이 배우자로부터 심히 부당한 대우 ⑤생사불명 3년 이상 ⑥혼인을 계속하기 어려운 중대한 사유. 이 중 하나에만 해당해도 재판이혼 청구가 가능해요.</p>
        <p style={body}>6호가 가장 폭넓게 인정돼요. 장기 별거(3년 이상), 성격 차이로 인한 혼인 파탄, 심각한 경제적 학대도 해당할 수 있어요. 법원은 혼인 관계의 객관적 파탄 정도를 종합적으로 판단해요. 단순히 싫어하는 것만으로는 안 되고, 더 이상 함께 살 수 없는 상태여야 해요.</p>
        <Divider />
        <H2>상대방이 이혼을 절대 안 해준다고 할 때는 어떻게 하나요</H2>
        <p style={body}>상대방이 이혼을 거부해도 강제로 이혼할 수 있어요. 민법 840조의 이혼 사유가 인정되면 법원이 이혼 판결을 내려줘요. 상대방이 이혼을 거부하는 이유가 재산 때문이라면, 먼저 재산분할 조건을 명확히 하는 조정이혼을 시도해볼 수 있어요. 조정에서 재산 조건에 합의하면 이혼도 함께 가능해요.</p>
        <p style={body}>조정 신청은 가정법원 조정실에 직접 가거나 온라인으로 할 수 있어요. 법원이 양측을 불러서 중재하는 과정이에요. 조정이 안 되면 다시 소송으로 진행되는데, 이 과정에서 상대방의 태도도 재판부에 보여요. 재판부는 상대방이 조정을 거부했다는 것도 고려해서 판결을 내려요.</p>
        <Divider />
        <H2>이혼 소송에서 지는 경우도 있나요</H2>
        <p style={body}>이혼 소송에서 이혼이 기각되는 경우가 있어요. 이혼 사유가 인정되지 않거나, 청구인(먼저 소송을 건 사람)이 유책 배우자여서 기각되는 경우예요. 특히 내가 먼저 외도를 하거나 집을 나온 경우, 상대방 동의 없이 이혼을 청구하면 기각될 수 있어요.</p>
        <p style={body}>유책배우자 피보호 원칙이 있어요. 혼인 파탄의 책임이 청구인에게 더 크다고 인정되면 이혼을 못 할 수 있어요. 그래서 소장 제출 전에 132에 무료 상담을 받는 게 중요해요. 자신의 상황이 정말 이혼 사유에 해당하는지, 청구인 입장에서 유리한지 미리 판단해야 해요.</p>
        <H2>이혼 일방 거부·별거 이혼 사유 — 자주 묻는 것들</H2>
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
