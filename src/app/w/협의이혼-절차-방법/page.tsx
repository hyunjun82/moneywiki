"use client";
import { useState } from "react";
const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
const SIDEBAR_LINKS = ["이혼 재산분할 비율","재산분할 청구기한","이혼 위자료 청구","이혼 양육비 청구","이혼 친권·양육권","면접교섭권 신청","이혼 일방 거부","별거 중 이혼","이혼 무료 법률상담","이혼 소송 증거 수집","이혼 전 재산 빼돌림","이혼 후 공동명의","이혼 퇴직금 분할","이혼 빚 공동부담","이혼 재산분할 집 취득세","재산분할 대상 범위","이혼 소송 기간","이혼 소송 비용","위자료 소멸시효","대한법률구조공단"];
const STEPS = [
  { n: 1, title: "가정법원에 협의이혼의사확인 신청 + 상담 권고", desc: "부부 쌍방이 법원에 신청서를 제출해요. 법원 양식(협의이혼의사확인신청서)을 작성하고, 가족관계증명서·혼인관계증명서를 첨부해요. 법원이 이혼 안내를 해줘요. 자녀가 있으면 양육비·친권 협의서도 함께 제출해야 해요.", note: "미성년 자녀 있으면 자녀 양육·친권 협의서 필수" },
  { n: 2, title: "이혼숙려기간 대기", desc: "자녀 있는 부부: 3개월\n자녀 없는 부부: 1개월\n기간 내에 마음이 바뀌면 신청을 취하할 수 있어요.", note: "폭력 피해자 등 예외: 법원에 단축 신청 가능" },
  { n: 3, title: "이혼의사확인기일 출석 → 확인서 발급", desc: "지정된 날짜에 부부 쌍방이 법원에 출석해요. 판사 앞에서 이혼 의사를 확인받아요. 확인서와 협의서 사본을 교부받아요.", note: "2회 불출석 시 신청 취하 간주" },
  { n: 4, title: "이혼신고 (확인일로부터 3개월 이내)", desc: "주민센터에 이혼신고서를 제출하면 이혼이 확정돼요. 확인서 발급일로부터 3개월 이내에 신고하지 않으면 확인의 효력이 소멸해요.", note: "신고 기간: 확인일로부터 3개월" },
  { n: 5, title: "재산분할·위자료 청구 (이혼 후 2년 이내)", desc: "협의이혼 시 합의하지 못한 재산분할은 이혼 후 2년 이내에 별도로 청구 가능해요. 양육비·면접교섭도 이혼 후 변경 가능해요.", note: "재산분할 청구기한: 이혼 후 2년" },
];
const FAQS = [
  { urgent: true, q: "자녀가 있으면 협의이혼이 더 복잡한가요?", a: "네. 미성년 자녀가 있으면 양육비·친권자·면접교섭 조건을 협의서에 명시해야 해요. 법원이 협의 내용이 자녀 복리에 반한다고 판단하면 보정을 명할 수 있어요. 양육비 금액은 서울가정법원 양육비산정기준표를 참고하세요." },
  { urgent: true, q: "상대방이 이혼 신청에 동의했는데 출석을 안 해요. 어떻게 하나요?", a: "협의이혼은 부부 쌍방이 모두 출석해야 해요. 상대방이 2회 연속 불출석하면 신청이 자동 취하돼요. 상대방이 이혼을 거부하면 재판이혼(이혼 소장 제출)으로 전환해야 해요. 132에 상담하세요." },
  { urgent: false, q: "이혼 숙려기간 3개월을 단축할 수 있나요?", a: "가정폭력 피해자, 이미 별거 중인 경우 등 특별한 사정이 있으면 법원에 숙려기간 단축 신청을 할 수 있어요. 폭력 피해 증거를 제출하면 법원이 기간을 줄여줄 수 있어요. 132에 상담하세요." },
  { urgent: false, q: "협의이혼 후에도 재산분할을 청구할 수 있나요?", a: "협의 당시 재산분할을 합의하지 못했거나 합의가 부당했다면 이혼 후 2년 이내에 가정법원에 재산분할 심판을 청구할 수 있어요. 단, 합의서에 '일체 청구하지 않겠다'는 문구를 썼다면 어려울 수 있어요. 132에 확인하세요." },
  { urgent: false, q: "협의이혼 비용은 얼마인가요?", a: "법원 신청 비용 자체는 거의 없어요 (인지대·송달료 1~2만원 수준). 자녀 없는 경우 최소 1개월+신고 절차로 마무리돼요. 공정증서 비용은 공증 금액에 따라 달라요. 변호사 없이 직접 할 수 있어요. 어렵다면 132에 상담하세요." },
];
function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    agree: { title: "쌍방 합의가 됐어요", color: G, bg: GL, text: "법원에 협의이혼의사확인 신청부터 하세요. 미성년 자녀가 있으면 양육비·친권 협의서를 미리 작성해두세요. 아래 5단계 절차를 확인하세요." },
    child: { title: "자녀가 있어서 조건이 복잡해요", color: "#7C3AED", bg: "#F5F3FF", text: "양육비·친권·면접교섭 조건을 구체적으로 협의서에 써야 해요. 모호하게 쓰면 나중에 분쟁이 생겨요. 132에 무료 상담을 받고 협의서를 작성하세요." },
    refuse: { title: "상대방이 출석을 거부해요", color: "#DC2626", bg: "#FEF2F2", text: "협의이혼은 쌍방 출석이 필수예요. 상대방이 거부하면 재판이혼으로 전환해야 해요. 132에 이혼 소장 작성 지원을 받으세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ id: "agree", label: "쌍방 이혼 합의가 됐어요. 절차가 궁금해요." },{ id: "child", label: "미성년 자녀가 있어서 조건이 복잡해요." },{ id: "refuse", label: "상대방이 법원 출석을 거부해요." }].map((item) => (
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
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button onClick={() => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}
function ProcessSteps() {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < STEPS.length - 1 && <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{s.desc}</div>
            {s.note && <div style={{ marginTop: 6, display: "inline-block", fontSize: 11, background: "#FFF7ED", color: "#C2410C", borderRadius: 4, padding: "2px 8px" }}>⚠️ {s.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)} style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff" }}>
            <span>{f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}{f.q}</span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>}
        </div>
      ))}
    </div>
  );
}
function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>협의이혼·이혼 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}
export default function HyeopEuiIhonJeolChaPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>협의이혼 · 절차 · 기간</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>협의이혼 절차 방법 |<br />신청부터 이혼 확정까지 기간·서류·주의사항</h1>
        <p style={{ ...body, fontSize: 15 }}>
          이혼을 결심했어요. 둘 다 동의했으니 빨리 끝내고 싶어요.<br />
          협의이혼은 쌍방 합의가 있어도 바로 되지 않아요. 숙려기간이 있어요.<br /><br />
          자녀가 있으면 3개월, 없으면 1개월이에요. 지금 5단계 절차를 확인하세요.
        </p>
        <UrgentBanner />
        <Bdg>협의이혼 5단계 절차</Bdg>

        {/* H2 ① */}
        <H2>협의이혼 절차 신청부터 이혼 확정까지</H2>
        <p style={body}>자녀가 있으면 양육비·친권 협의서가 필수예요. 미리 합의해두세요.</p>
        <ProcessSteps />
        <GreenBox title="협의이혼 핵심">
          숙려기간: 자녀 있는 경우 3개월, 없으면 1개월<br />
          자녀 있으면: 양육비·친권·면접교섭 협의서 필수<br />
          이혼신고 기한: 확인서 발급일로부터 3개월<br />
          재산분할·위자료: 협의 후에도 이혼 후 2년 이내 별도 청구 가능
        </GreenBox>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 협의이혼 전 꼭 확인하세요</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "협의서 작성 전 비율 먼저 확인하세요", href: "#" },
              { title: "이혼 양육비 청구 | 금액 계산과 미지급 시 강제 받는 방법", desc: "협의서에 양육비 금액을 구체적으로 써야 해요", href: "#" },
              { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "협의서 작성 전 무료 상담 받으세요", href: "#" },
            ].map((link, i, arr) => (
              <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
                <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
              </a>
            ))}
          </div>
        </div>

        <Divider />

        {/* H2 ② */}
        <H2>협의이혼 필요 서류 준비 체크리스트</H2>
        <BorderBox title="기본 서류">
          협의이혼의사확인신청서 (법원 양식)<br />
          부부 각자 가족관계증명서 각 1통<br />
          부부 각자 혼인관계증명서 각 1통<br />
          주민등록증
        </BorderBox>
        <BorderBox title="미성년 자녀 있는 경우 추가 서류">
          자녀의 양육과 친권자결정에 관한 협의서 1통 + 사본 2통<br />
          양육비 소득 증빙 서류 (원천징수영수증 등)<br />
          자녀 기본증명서, 가족관계증명서
        </BorderBox>
        <BorderBox title="협의서에 반드시 명시해야 하는 것">
          친권자: 누구인지 명확하게 (단독 또는 공동)<br />
          양육권자: 누가 아이와 함께 사는지<br />
          양육비: 월 금액, 지급일, 지급 방법<br />
          면접교섭: 빈도·시간·장소 구체적으로<br />
          재산분할: 합의 금액과 이전 방법 (부동산 등기 명의 변경 포함)
        </BorderBox>

        <Divider />

        {/* H2 ③ */}
        <H2>협의이혼이 안 되는 경우 재판이혼으로 전환해요</H2>
        <p style={body}>
          협의이혼은 반드시 쌍방이 출석해야 해요.<br />
          상대방이 출석을 거부하거나 조건이 안 맞으면 재판이혼으로 가야 해요.
        </p>
        <BorderBox title="재판이혼으로 전환해야 하는 경우">
          상대방이 법원 출석을 2회 연속 거부하는 경우<br />
          양육비·재산분할 협의가 안 맞는 경우<br />
          상대방이 이혼 자체를 거부하는 경우<br />
          → 이혼 소장 제출 → 가정법원 재판 → 이혼 판결 확정
        </BorderBox>
        <BorderBox title="재판이혼 사유 (민법 제840조)">
          배우자의 부정행위 (외도)<br />
          배우자의 악의적 유기<br />
          배우자 또는 그 직계존속으로부터의 심히 부당한 대우<br />
          기타 혼인을 계속하기 어려운 중대한 사유 (6호 — 제소기간 없음)
        </BorderBox>

        <Divider />

        {/* H2 ④ */}
        <H2>협의이혼, 지금 당장 이렇게 시작하세요</H2>
        <p style={body}>합의가 됐다면 오늘 바로 시작할 수 있어요.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2",
              title: "재산분할·양육비 합의 확인",
              desc: "모호하게 합의하면 나중에 분쟁이 생겨요. 구체적인 금액·조건을 먼저 정리하세요. 132에서 무료로 도와줘요.",
              link: { label: "법률구조공단 132", url: "tel:132" } },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED",
              title: "가정법원에 협의이혼 신청서 제출",
              desc: "부부 쌍방이 함께 관할 가정법원에 방문해 신청서를 제출해요. 법원 홈페이지에서 양식을 미리 내려받으세요.",
              link: { label: "대법원 법원 안내", url: "https://www.scourt.go.kr" } },
            { step: "숙려기간 후", color: "#6b7280", bg: "#f9fafb",
              title: "이혼의사확인기일 출석 → 이혼신고",
              desc: "숙려기간(자녀 있으면 3개월, 없으면 1개월) 후 법원 출석해 확인서를 받고, 3개월 이내에 주민센터에 이혼신고서를 제출해요.",
              link: null },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", borderRadius: 8, background: s.bg, border: `1px solid ${s.color}30` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: s.color, flexShrink: 0, paddingTop: 2, minWidth: 52 }}>{s.step}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85, marginBottom: s.link ? 8 : 0 }}>{s.desc}</div>
                {s.link && (
                  <a href={s.link.url} style={{ fontSize: 12, fontWeight: 600, color: s.color === "#6b7280" ? G : s.color, background: "#fff", border: `1px solid ${s.color === "#6b7280" ? G : s.color}50`, borderRadius: 6, padding: "4px 10px", textDecoration: "none", display: "inline-block" }}>
                    {s.link.label} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* H2 ⑤ FAQ */}
        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />
        <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>협의이혼 전에 서류 먼저 점검하세요</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>132에서 무료로<br />협의서 작성을 도와줘요.</p>
          <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
            <a href="tel:132" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>📞 법률구조공단 132</a>
            <a href="https://www.scourt.go.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}` }}>🌐 법원 안내</a>
          </div>
        </div>
        <Divider />
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          {[
            { label: "민법 제836조 — 협의이혼 (이혼신고 3개월 기한)", url: "https://www.law.go.kr/" },
            { label: "민법 제836조의2 — 이혼숙려기간 (자녀 있는 경우 3개월)", url: "https://www.law.go.kr/" },
            { label: "찾기쉬운 생활법령 — 협의이혼 절차 (2026. 1. 15. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=233&ccfNo=2&cciNo=2&cnpClsNo=1" },
            { label: "대한법률구조공단 (132)", url: "tel:132" },
          ].map((item) => (
            <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none", marginBottom: 4 }}>
              <span style={{ color: G, fontSize: 11 }}>↗</span>{item.label}
            </a>
          ))}
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요.</p>
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>이 글은 법률 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며 증거자료로 쓸 수 없어요. 개별 사안에 따라 결과가 달라질 수 있으니 대한법률구조공단(132)에 상담하세요.</div>
      </div>
    </div>
  );
}
