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
  { urgent: true, q: "양육비를 안 주는 상대방 재산을 압류할 수 있나요?", a: "판결조서나 공정증서로 양육비가 확정됐다면 상대방 예금·급여·부동산을 압류할 수 있어요. 양육비이행관리원(02-6232-7100)에 신청하면 무료로 강제집행 절차를 도와줘요. 급여는 최대 1/2까지 압류 가능해요. 이행명령을 어기면 과태료(1,000만원 이하) 또는 감치(최대 30일) 처분도 가능해요." },
  { urgent: true, q: "상대방 직장을 몰라요. 양육비를 어떻게 받나요?", a: "양육비이행관리원에 재산조회를 신청하면 상대방 재산·직장·금융계좌를 법원을 통해 조회할 수 있어요. 상대방이 재산을 숨겨도 법원 재산명시 명령을 통해 목록 제출을 강제할 수 있어요. 무단 은닉 시 과태료 처분도 가능해요." },
  { urgent: false, q: "양육비 금액은 어떻게 정해지나요?", a: "서울가정법원 양육비 산정기준표를 참고해요. 부모 합산 소득과 자녀 나이를 교차해서 표준 양육비가 나와요. 부모 합산 소득 월 400만원, 자녀 만 8세이면 약 월 60~80만원 수준이에요. 양육비이행관리원 홈페이지(www.childsupport.or.kr)에서 계산해볼 수 있어요." },
  { urgent: false, q: "양육비 소멸시효가 있나요?", a: "확정된 양육비는 소멸시효가 있어요. 협의 양육비는 3년, 판결로 확정된 양육비는 10년이에요. 미지급 기간이 쌓이면 소멸시효가 완성될 수 있으니 미지급이 발생하면 바로 강제집행을 신청하는 게 중요해요." },
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
export default function Page20() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 양육비 · 강제집행</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 양육비 청구 |<br />
          금액 계산과 미지급 시 강제 받는 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>이혼 후 양육비를 안 받고 있는 한부모 가정이 많아요. 양육비는 아이의 권리예요. 상대방이 소득이 없다고 해도, 연락이 안 된다고 해도 받을 수 있는 방법이 있어요. 양육비이행관리원(02-6232-7100)에 신청하면 무료로 강제집행을 도와줘요.</p>
        <HubLinks />
        <H2>양육비란 무엇인가요</H2>
        <p style={body}>양육비는 부모가 미성년 자녀를 양육하는 데 필요한 생활비예요. 의식주, 교육비, 의료비 등을 포함해요. 이혼 후에도 부모 모두가 자녀를 부양할 의무가 있어요. 미성년 자녀와 살지 않는 부모는 일반적으로 양육비를 지급해야 해요.</p>
        <p style={body}>양육비는 도덕적인 문제가 아니라 법적 의무예요. 상대방의 경제 상황이나 연락 여부와 관계없이 법원이 강제할 수 있어요. 자녀가 만 20세가 될 때까지 청구 대상이 돼요.</p>
        <Divider />
        <H2>양육비 금액은 어떻게 정해지나요</H2>
        <p style={body}>서울가정법원 양육비 산정기준표를 기준으로 부모의 소득과 자녀 나이를 고려해서 결정해요. 부모 합산 소득이 월 400만원이고 자녀가 만 8세라면 일반적으로 월 60~80만원 수준이에요. 법원은 기준표를 참고하되, 자녀 수, 부모의 재산, 특수한 교육 필요성 등을 종합적으로 판단해요.</p>
        <p style={body}>양육비이행관리원(02-6232-7100) 홈페이지에서 간단한 정보를 입력해서 예상 양육비를 미리 계산해볼 수 있어요. 법원 판결 전에 합의 기준을 정할 때 유용해요.</p>
        <Divider />
        <H2>양육비를 안 주면 어떻게 하나요</H2>
        <p style={body}>판결조서나 공정증서로 양육비가 확정됐다면 강제집행을 신청할 수 있어요. 상대방의 예금, 급여, 부동산을 압류할 수 있어요. 급여는 최대 1/2까지 압류 가능하고, 이행명령을 어기면 과태료(1,000만원 이하) 또는 감치(최대 30일) 처분도 가능해요.</p>
        <p style={body}>상대방의 직장을 모르면 양육비이행관리원에 재산조회를 신청해요. 법원을 통해 상대방의 직장, 금융계좌, 부동산을 조회할 수 있어요. 부모가 재산을 숨겨도 법원 명령에 따라 목록을 제출해야 하며, 무단 은닉 시 과태료 처분을 받을 수 있어요.</p>
        <Divider />
        <H2>양육비 청구 시 꼭 알아야 할 것들</H2>
        <p style={body}>양육비 소멸시효가 있어요. 협의로 정한 양육비는 3년, 판결로 확정된 양육비는 10년 동안만 청구할 수 있어요. 미지급 기간이 쌓이면 소멸시효가 완성돼서 더 이상 받을 수 없으니 주의해야 해요. 미지급이 발생하면 바로 강제집행을 신청하는 게 중요해요.</p>
        <p style={body}>협의이혼 시 양육비를 정하면 이를 공정증서로 만들어야 강제집행이 가능해요. 확정판결은 물론 공정증서도 법원의 강제집행 대상이 돼요. 양육비이행관리원은 무료로 강제집행 절차를 도와주니 언제든지 신청하세요.</p>
        <H2>이혼 양육비 청구 — 자주 묻는 것들</H2>
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
