"use client";
import { useState } from "react";

// ─── 2026년 기준 (남녀고용평등과 일·가정 양립 지원에 관한 법률)
// 육아휴직 거부 사업주: 500만원 이하 벌금 (제37조제4항제4호)
// 육아휴직 이유 해고·불리한 처우: 3년 이하 징역 또는 3천만원 이하 벌금 (제37조제2항)
// 복직 후 동일 업무 미복귀: 500만원 이하 벌금
// 신고: 관할 고용노동청 진정·고소 / 부당해고는 노동위원회 구제신청
// 2025.1.1.부터 사업주 14일 이내 미응답 시 자동 승인

const SIDEBAR_LINKS = [
  "육아휴직 거부 신고 방법",
  "육아휴직 거부 과태료",
  "부당해고 구제신청 방법",
  "노동위원회 구제신청",
  "육아휴직 복직 거부 처벌",
  "고용노동청 진정 접수",
  "육아휴직 자동 승인 절차",
  "육아휴직 후 직급 강등 대응",
  "육아기 근로시간 단축 거부",
  "임신 중 해고 신고",
  "근로감독관 조사 절차",
  "부당전보 구제신청",
  "권리구제 대리인 무료지원",
  "육아휴직 대체인력 지원금",
  "남성 육아휴직 인센티브",
  "6+6 부모육아휴직 금액",
  "단기 육아휴직 방학 활용",
  "출산전후휴가 대체인력",
  "직장 내 모성보호 상담",
  "서울직장맘지원센터 상담",
];

const HUB_LINKS = [
  { title: "육아휴직 후 복직 거부 | 사업주 처벌과 구제 신청 방법", desc: "복직 후 불리한 처우도 3개월 이내 노동위원회 구제 가능", href: "#" },
  { title: "육아기 근로시간 단축 대체인력 | 육아휴직과 차이점", desc: "단축 신청 거부 시 500만원 과태료", href: "#" },
  { title: "6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산", desc: "생후 18개월 이내 자녀, 부모 각각 첫 6개월 통상임금 100%", href: "#" },
  { title: "단기 육아휴직 신청 방법 | 방학 활용 제도", desc: "2026년 도입 예정 단기 육아휴직으로 방학 기간 활용", href: "#" },
];

const FAQS = [
  { urgent: true, q: "회사가 육아휴직을 거부하고 있어요. 바로 출근 안 해도 되나요?", a: "네, 출근 안 해도 돼요. 육아휴직은 요건(계속 근로 6개월 이상)만 충족하면 효력이 발생하는 강행법규예요. 사업주에게 거부권과 시기변경권이 없어요. 신청서를 서면으로 제출하고, 2025년 1월부터 사업주가 14일 이내에 회신하지 않으면 신청한 대로 자동 승인돼요. 이미 거부 의사를 표시했다면 바로 관할 고용노동청에 진정을 내세요." },
  { urgent: true, q: "신고하면 진짜 처벌받나요, 아니면 흐지부지 되나요?", a: "진정을 접수하면 담당 근로감독관이 사업주와 근로자를 출석시켜 사실관계를 조사해요. 위반 사실이 확인되면 사업주에게 시정지시를 내리고, 기한 내 시정하지 않으면 사건을 검찰에 송치해요. 육아휴직 거부는 500만원 이하 벌금, 해고는 3년 이하 징역 또는 3천만원 이하 벌금이라 사업주가 쉽게 무시하기 어려워요." },
  { urgent: true, q: "육아휴직 신청했다가 권고사직을 받았어요. 어떻게 해야 하나요?", a: "육아휴직을 이유로 한 권고사직·해고는 불법이에요. 3년 이하 징역 또는 3천만원 이하 벌금을 받을 수 있어요. 권고사직 요구에 응하지 않고 증거(문자, 이메일, 녹음)를 확보하세요. 부당해고가 발생하면 3개월 이내에 지방노동위원회에 구제신청을 하면 돼요. 월 평균임금 300만원 미만이면 공인노무사·변호사를 무료로 지원받을 수 있어요." },
  { urgent: false, q: "계속 근로기간이 6개월 미만인데 육아휴직을 신청했어요.", a: "육아휴직 시작일 전날까지 계속 근로기간이 6개월 미만인 경우에는 사업주가 거부할 수 있어요. 이 경우 법적으로 사업주의 거부가 정당해요. 6개월을 채운 뒤 신청하거나, 사업주와 협의해보는 방법밖에 없어요." },
  { urgent: false, q: "복직했는데 이전과 전혀 다른 부서로 발령났어요.", a: "복직 후 이전과 판이하게 다른 직무로 옮기거나 임금을 삭감한 경우 부당전보나 불이익 처분에 해당할 수 있어요. 3개월 이내에 지방노동위원회에 부당전보 구제신청을 하거나, 관할 고용노동청에 진정을 내세요. 증거(발령장, 이전·이후 업무 내용)를 미리 확보해두세요." },
  { urgent: false, q: "5인 미만 사업장이라 노동위원회 구제신청을 못 한다고 들었어요.", a: "맞아요. 부당해고 구제신청(노동위원회)은 상시 근로자 5인 이상 사업장에만 적용돼요. 5인 미만이면 노동위원회 구제신청은 안 되지만, 민사소송으로 다툴 수 있어요. 또한 형사 신고(고용노동청 진정·고소)는 사업장 규모 관계없이 가능해요. 법률구조공단(132)이나 직장맘지원센터에 먼저 상담해보세요." },
  { urgent: false, q: "증거가 없어도 신고할 수 있나요?", a: "할 수 있어요. 신고 후 근로감독관이 사실관계를 조사해요. 다만 증거가 있으면 처리가 더 빠르고 유리해요. 육아휴직 신청서, 거부 의사 표시 (문자·이메일·녹음), 권고사직 요구 내용 등을 미리 확보해두는 게 좋아요. 신청서는 항상 서면으로 하고 제출 증거를 남겨두세요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조 — 육아휴직", url: "https://www.law.go.kr/" },
    { label: "남녀고용평등법 제37조 — 벌칙 (3년 이하 징역 또는 3천만원 이하 벌금)", url: "https://www.law.go.kr/" },
    { label: "남녀고용평등법 제39조 — 과태료 (500만원 이하)", url: "https://www.law.go.kr/" },
    { label: "남녀고용평등법 시행령 제10조 — 거부 가능한 예외 사유", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 육아휴직 신청 및 거부 처벌", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1380&ccfNo=2&cciNo=1&cnpClsNo=1" },
    { label: "서남권직장맘지원센터 — 육아휴직 거부 대응 방법", url: "https://gworkingmom.net/working_parents/parenting/single/17" },
    { label: "노동위원회 — 부당해고 구제신청 안내", url: "https://www.nlrc.go.kr" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: { children: React.ReactNode }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: { children: React.ReactNode }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    refuse: { title: "지금 거부당하고 있다면", color: "#DC2626", bg: "#FEF2F2", text: "서면으로 육아휴직 신청서를 다시 제출하세요. 2025년부터 사업주가 14일 이내에 회신하지 않으면 신청한 대로 자동 승인돼요. 거부를 계속하면 바로 관할 고용노동청에 진정을 접수하세요. 민원24 또는 직접 방문 모두 가능해요." },
    fired: { title: "육아휴직 이유로 해고됐다면", color: "#DC2626", bg: "#FEF2F2", text: "3개월 이내에 지방노동위원회에 부당해고 구제신청을 해야 해요(5인 이상 사업장). 증거(해고통보서, 문자, 녹음)를 확보하세요. 월 평균임금 300만원 미만이면 노동위원회에서 공인노무사·변호사를 무료로 배정해줘요." },
    return: { title: "복직 후 불이익을 받고 있다면", color: "#7C3AED", bg: "#F5F3FF", text: "복직 후 판이하게 다른 직무 발령, 임금 삭감, 업무 배제 등은 3개월 이내에 지방노동위원회에 구제신청이 가능해요. 또는 관할 고용노동청에 진정을 접수하면 근로감독관이 조사해요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ id: "refuse", label: "육아휴직 신청했는데 회사가 안 된다고 해요." }, { id: "fired", label: "육아휴직 때문에 해고됐어요." }, { id: "return", label: "복직했는데 이상한 부서로 발령났어요." }].map(item => (
          <button key={item.id} onClick={(: any) => setType(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
  const m = msgs[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <strong style={{ fontSize: 14, color: m.color }}>{m.title}</strong>
        <button onClick={(: any) => setType(null)} style={{ fontSize: 11, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function PenaltyTable() {
  const rows = [
    { act: "육아휴직 허용 거부", penalty: "500만원 이하 벌금", law: "남녀고용평등법 제37조제4항제4호" },
    { act: "육아휴직 이유 해고·불리한 처우", penalty: "3년 이하 징역 또는 3천만원 이하 벌금", law: "남녀고용평등법 제37조제2항제2호" },
    { act: "육아휴직 기간 중 해고", penalty: "3년 이하 징역 또는 3천만원 이하 벌금", law: "남녀고용평등법 제37조제2항제2호" },
    { act: "복직 후 동일 업무·수준 미복귀", penalty: "500만원 이하 벌금", law: "남녀고용평등법 제37조제4항제5호" },
    { act: "육아기 근로시간 단축 거부", penalty: "500만원 이하 과태료", law: "남녀고용평등법 제39조제3항제6호" },
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: GL }}>{["위반 행위", "처벌", "근거 법령"].map(h => <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r: any, i: any) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "#111" }}>{r.act}</td>
              <td style={{ padding: "9px 10px", color: "#DC2626", fontWeight: 700 }}>{r.penalty}</td>
              <td style={{ padding: "9px 10px", color: "#9ca3af", fontSize: 12 }}>{r.law}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Steps() {
  const steps = [
    { title: "서면 신청서 제출 (증거 보관)", desc: "육아휴직 신청서를 서면으로 제출하고 제출 증거를 남겨요. 이메일·내용증명도 가능해요. 2025년부터 사업주가 14일 이내 미응답 시 자동 승인돼요." },
    { title: "증거 수집", desc: "거부 문자·이메일·녹음 파일을 확보하세요. 구두 거부라도 녹음해두면 좋아요. 신청서 제출일과 거부 응답일 기록도 보관하세요." },
    { title: "관할 고용노동청에 진정·고소 접수", desc: "사업장 소재지 관할 고용노동청에 방문하거나 민원24에서 온라인 접수해요. 근로감독관이 조사에 착수해요.", tel: { label: "고용노동부 1350", url: "tel:1350" } },
    { title: "부당해고 시 노동위원회 구제신청", desc: "해고가 발생했다면 3개월 이내에 지방노동위원회에 구제신청을 해요. 월 평균임금 300만원 미만이면 공인노무사·변호사 무료 지원을 받을 수 있어요.", tel: { label: "중앙노동위원회 1588-0106", url: "tel:15880106" } },
  ];
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {steps.map((step: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{step.title}</p>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>{step.desc}</p>
            {step.tel && <a href={step.tel.url} style={{ display: "inline-block", marginTop: 4, fontSize: 12, color: "#374151", fontWeight: 600, textDecoration: "none", border: "1px solid #e5e7eb", padding: "3px 10px", borderRadius: 20 }}>📞 {step.tel.label}</a>}
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = i => setOpen(p => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {FAQS.map((faq: any, i: any) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button onClick={(: any) => toggle(i)} style={{ width: "100%", textAlign: "left", padding: "13px 4px", display: "flex", alignItems: "flex-start", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
            {faq.urgent && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: "#FEE2E2", color: "#DC2626", flexShrink: 0, marginTop: 2 }}>급한 상황</span>}
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", flex: 1, lineHeight: 1.6 }}>{faq.q}</span>
            <span style={{ color: "#9ca3af", fontSize: 16, flexShrink: 0 }}>{open[i] ? "▲" : "▼"}</span>
          </button>
          {open[i] && <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, padding: "0 4px 14px", margin: 0 }}>{faq.a}</p>}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 육아휴직 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
          </a>
        ))}
      </div>
      <a href="#" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>육아휴직 관련 글 전체 보기 →</a>
    </div>
  );
}

function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />출처 및 참고자료
      </h3>
      {REFERENCES.map(group => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map(item => (
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>육아휴직 권리 구제</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ChildcareLeaveRefusalPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>육아휴직 · 권리 구제 · 노동법</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          중소기업 육아휴직 거부 신고 |<br />
          사업주 과태료와 신고 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          "대체 인력을 못 구했다", "회사가 작다"는 이유로 육아휴직을 거부할 수 없어요.<br />
          <strong>계속 근로 6개월만 넘으면 무조건 줘야 해요. 거부하면 500만원 이하 벌금이에요.</strong>
        </p>

        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 10 }}>🚨 지금 상황별 즉시 대응</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #FECACA" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>지금 거부당하고 있어요</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>서면으로 신청서를 다시 제출하세요. 사업주가 14일 이내에 응답하지 않으면 자동 승인이에요. 거부 의사를 표시하면 바로 관할 고용노동청에 진정을 접수하세요. 고용노동부 1350에 전화하면 절차를 안내해줘요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #FECACA" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>육아휴직 이유로 해고됐어요</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>해고일로부터 3개월 이내에 지방노동위원회에 부당해고 구제신청을 해야 해요. 이 기한을 놓치면 안 돼요. 월 평균임금 300만원 미만이면 노무사·변호사를 무료로 지원받을 수 있어요. 노동위원회 1588-0106.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #FECACA" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>복직 후 불이익을 받고 있어요</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>다른 부서 발령, 임금 삭감, 업무 배제도 전부 불법이에요. 처분일로부터 3개월 이내에 노동위원회에 구제신청을 하거나 고용노동청에 진정을 내세요.</p>
            </div>
          </div>
        </div>

        <H2>육아휴직 거부 사업주 과태료와 처벌 기준</H2>
        <p style={body}>말로 설명해봤자 사업주가 믿지 않는다면 법 조항을 직접 보여주세요.</p>
        <Bdg>위반 행위별 처벌 기준</Bdg>
        <PenaltyTable />
        <GreenBox title="이것만 기억해요">
          ① 거부 자체: 500만원 이하 벌금<br />
          ② 불리한 처우·해고: 3년 이하 징역 또는 3천만원 이하 벌금 (더 무거운 처벌)<br />
          ③ 사업주가 14일 이내 응답 없으면 자동 승인 (2025.1.1.부터)
        </GreenBox>

        <Divider />

        <H2>육아휴직 거부 신고 방법과 절차</H2>
        <p style={body}>
          신청서를 서면으로 제출하는 게 먼저예요. 구두로만 요청했다면 사업주가 "신청받은 적 없다"고 할 수 있어요.<br />
          서면 제출 후 14일 이내 응답이 없으면 자동 승인이에요. 거부 의사를 표시하면 그때 신고하면 돼요.
        </p>
        <Bdg>신고 절차</Bdg>
        <Steps />

        <HubLinks />

        <H2>중소기업 육아휴직 거부 가능한 경우</H2>
        <p style={body}>
          "대체인력을 못 구했다", "회사가 작다"는 이유는 법적으로 거부 사유가 안 돼요.<br />
          거부할 수 있는 예외는 딱 하나예요.
        </p>
        <BorderBox title="사업주가 거부할 수 있는 유일한 예외">
          육아휴직 시작일 전날까지 해당 사업장에서 <strong>계속 근로기간이 6개월 미만</strong>인 근로자<br /><br />
          이 경우가 아니면 인력 부족, 업무 특성, 회사 규모 등 어떤 이유도 거부 사유가 안 돼요.
        </BorderBox>

        <Divider />

        <H2>육아휴직 거부 신고 무료 지원 기관</H2>
        <p style={body}>전문가 도움을 공짜로 받을 수 있는 방법이 있어요.</p>
        <div style={{ display: "flex", gap: 12, margin: "12px 0 1.2rem", flexWrap: "wrap" }}>
          {[
            { name: "서울직장맘지원센터", tel: "02-6929-3700", desc: "서울 소재 사업장 무료 상담" },
            { name: "대한법률구조공단", tel: "132", desc: "법률 상담 및 소송 지원" },
            { name: "노동위원회 권리구제대리인", tel: "1588-0106", desc: "월급 300만원 미만이면 공인노무사·변호사 무료" },
          ].map((c: any, i: any) => (
            <div key={i} style={{ flex: 1, minWidth: 150, border: "1px solid #e5e7eb", borderRadius: 8, padding: "12px 14px", background: "#fafafa" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{c.name}</p>
              <a href={`tel:${c.tel.replace(/-/g, "")}`} style={{ fontSize: 13, color: G, fontWeight: 700, textDecoration: "none", display: "block", marginBottom: 4 }}>📞 {c.tel}</a>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          거부당했을 때 출근을 안 해도 되는지, 권고사직을 받았을 때 어떻게 해야 하는지 — 지금 당장 막혀 있는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지금 바로 신고하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            서면 신청서를 제출하고, 거부 시 바로 관할 고용노동청에 접수하세요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://minwon.moel.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 민원24 진정 접수</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 개별 사안에 따라 결과가 달라질 수 있어요. 고용노동부(1350) 또는 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
