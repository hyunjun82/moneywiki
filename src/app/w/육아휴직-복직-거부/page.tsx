"use client";
import { useState } from "react";

// ─── 2026년 기준 (남녀고용평등법 제19조제4항)
// 복직 후 동일 업무 또는 동일 수준 임금 직무에 복귀시켜야
// 미복귀 사업주: 500만원 이하 벌금
// 불리한 처우: 3년 이하 징역 또는 3천만원 이하 벌금
// 부당해고·부당전보 구제신청: 3개월 이내, 지방노동위원회 (5인 이상 사업장)
// 육아휴직 기간 근속기간 포함

const SIDEBAR_LINKS = [
  "육아휴직 복직 거부 구제신청",
  "부당해고 구제신청 방법",
  "노동위원회 구제신청 기간",
  "복직 후 직급 강등 신고",
  "육아휴직 이유 해고 처벌",
  "복직 후 임금 삭감 대응",
  "고용노동청 진정 접수",
  "부당전보 구제신청",
  "권리구제 대리인 무료지원",
  "육아휴직 거부 신고",
  "육아휴직 근속기간 포함",
  "복직 후 연차 계산",
  "육아기 근로시간 단축 복직",
  "6+6 부모육아휴직 금액",
  "단기 육아휴직 방학 활용",
  "육아휴직 대체인력 지원금",
  "서울직장맘지원센터 상담",
  "대한법률구조공단 상담",
  "고용노동부 민원 접수",
  "근로감독관 조사 절차",
];

const HUB_LINKS = [
  { title: "중소기업 육아휴직 거부 신고 | 사업주 과태료와 신고 방법", desc: "육아휴직 거부 시 500만원 이하 벌금", href: "#" },
  { title: "6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산", desc: "생후 18개월 이내 자녀 부모 각 6개월 통상임금 100%", href: "#" },
  { title: "육아기 근로시간 단축 대체인력 | 육아휴직과 차이점", desc: "단축 후 복직도 동일 업무 복귀 의무", href: "#" },
  { title: "단기 육아휴직 신청 방법 | 방학 활용 제도", desc: "2026년 도입 예정 단기 육아휴직으로 방학 기간 활용", href: "#" },
];

const FAQS = [
  { urgent: true, q: "복직했는데 다른 부서로 발령났어요. 바로 거부할 수 있나요?", a: "네. 사업주는 육아휴직 후 휴직 전과 같은 업무 또는 같은 수준의 임금을 지급하는 직무에 복귀시켜야 해요. 이전과 판이하게 다른 직무나 임금이 낮은 직무로 보내는 건 위법이에요. 거부 의사를 서면으로 표시하고, 관할 고용노동청에 진정을 내거나 3개월 이내에 노동위원회에 부당전보 구제신청을 하세요." },
  { urgent: true, q: "복직 신청했는데 회사가 자리가 없다고 해요.", a: "자리가 없다는 이유로 복직을 거부할 수 없어요. 복직 의무는 사업주에게 있어요. 복직 거부 자체가 500만원 이하 벌금 대상이에요. 관할 고용노동청에 진정을 접수하세요. 근로감독관이 조사에 착수하면 사업주가 시정하거나 처벌받게 돼요." },
  { urgent: true, q: "복직 후 임금이 줄었어요. 신고할 수 있나요?", a: "할 수 있어요. 복직 후 '같은 수준의 임금을 지급하는 직무'에 복귀시켜야 하므로 임금 삭감은 위법이에요. 임금 삭감 전후 급여명세서, 발령장 등을 확보하고 관할 고용노동청에 진정을 접수하세요. 또는 3개월 이내에 노동위원회에 부당전보 구제신청을 하면 돼요." },
  { urgent: false, q: "5인 미만 사업장인데 구제신청을 할 수 없나요?", a: "부당해고 및 부당전보 구제신청(노동위원회)은 상시 근로자 5인 이상 사업장에만 해당해요. 5인 미만이면 형사 신고(고용노동청 진정·고소)는 사업장 규모와 관계없이 할 수 있어요. 또한 민사소송으로 손해배상을 청구할 수도 있어요. 대한법률구조공단(132)에 먼저 상담해보세요." },
  { urgent: false, q: "육아휴직 기간이 근속기간에 포함되나요?", a: "네, 법령으로 명시돼 있어요. 육아휴직 기간은 근속기간에 포함돼요. 퇴직금, 연차휴가 계산 시에도 육아휴직 기간은 근속기간으로 산정해요. 단, 연차 발생은 실제 출근한 기간을 기준으로 계산하는 경우와 다를 수 있으니 회사 규정도 함께 확인하세요." },
  { urgent: false, q: "복직 거부 시 구제신청 기간은 얼마예요?", a: "부당해고는 해고가 있은 날부터 3개월 이내에 지방노동위원회에 구제신청을 해야 해요. 부당전보(불이익 처분)도 처분이 있은 날부터 3개월 이내에 신청해야 해요. 이 기간을 놓치면 구제신청이 불가능해질 수 있으므로, 복직 거부나 불리한 처우가 발생하면 바로 전문가에게 상담하세요." },
  { urgent: false, q: "노동위원회 구제신청이 인정되면 어떻게 되나요?", a: "노동위원회가 부당하다고 인정하면 사업주에게 원직 복직 명령과 해고 기간 동안의 임금 상당액 지급을 명해요. 복직이 어려운 경우 일정 금액의 금전보상 명령도 가능해요. 사업주가 명령을 이행하지 않으면 이행강제금이 부과돼요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "남녀고용평등법 제19조제4항 — 복직 후 동일 업무 복귀 의무", url: "https://www.law.go.kr/" },
    { label: "남녀고용평등법 제37조 — 벌칙 (복직 미복귀 500만원 이하 벌금)", url: "https://www.law.go.kr/" },
    { label: "근로기준법 제23조 — 해고 등의 제한", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "서남권직장맘지원센터 — 육아휴직 복직 권리 안내", url: "https://gworkingmom.net/working_parents/parenting/single/17" },
    { label: "찾기쉬운 생활법령 — 육아휴직 후 복직", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1380&ccfNo=2&cciNo=1&cnpClsNo=1" },
    { label: "노동위원회 — 부당해고 구제신청 안내", url: "https://www.nlrc.go.kr" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: any) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: any) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: any) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }: any) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    refuse: { title: "복직 자체를 거부당했다면", color: "#DC2626", bg: "#FEF2F2", text: "복직 거부는 500만원 이하 벌금 대상이에요. 관할 고용노동청에 즉시 진정을 접수하세요. 5인 이상 사업장이라면 3개월 이내에 노동위원회에 부당해고 구제신청도 병행하세요." },
    demotion: { title: "다른 부서·낮은 임금으로 발령났다면", color: "#7C3AED", bg: "#F5F3FF", text: "불이익 처분에 해당해요. 발령장, 기존·현재 직무와 임금 관련 서류를 확보하세요. 3개월 이내에 노동위원회에 부당전보 구제신청을 하거나 고용노동청에 진정을 내세요." },
    exclusion: { title: "업무에서 배제되거나 따돌림을 당한다면", color: "#C2410C", bg: "#FFF7ED", text: "복직 후 업무 배제, 대기 발령, 따돌림 등도 불리한 처우예요. 관할 고용노동청에 진정을 접수하거나 서울직장맘지원센터(02-6929-3700)에 상담하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ id: "refuse", label: "복직 신청했는데 회사가 안 된다고 해요." }, { id: "demotion", label: "복직은 했는데 다른 부서로 발령났어요." }, { id: "exclusion", label: "복직했는데 업무에서 배제되고 있어요." }].map(item => (
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <strong style={{ fontSize: 14, color: m.color }}>{m.title}</strong>
        <button onClick={() => setType(null)} style={{ fontSize: 11, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function PenaltyTable() {
  const rows = [
    { act: "복직 후 동일 업무·수준 임금 미복귀", penalty: "500만원 이하 벌금", law: "남녀고용평등법 제37조제4항" },
    { act: "육아휴직 이유 불리한 처우", penalty: "3년 이하 징역 또는 3천만원 이하 벌금", law: "남녀고용평등법 제37조제2항" },
    { act: "복직 의무 위반 (복귀 거부)", penalty: "500만원 이하 벌금", law: "남녀고용평등법 제37조제4항" },
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: GL }}>{["위반 행위", "처벌", "근거 법령"].map(h => <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
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
    { title: "증거 확보", desc: "복직 거부 통보서, 발령장, 급여명세서, 이전 직무 관련 자료, 문자·이메일·녹음 파일을 확보해요. 구두로 전달됐다면 녹음해두세요." },
    { title: "관할 고용노동청에 진정 접수", desc: "사업장 소재지 관할 고용노동청에 방문하거나 민원24에서 온라인 접수해요. 근로감독관이 조사에 착수해요.", tel: { label: "고용노동부 1350", url: "tel:1350" } },
    { title: "3개월 이내 노동위원회 구제신청", desc: "부당해고·부당전보는 3개월 이내에 지방노동위원회에 구제신청을 해야 해요. 이 기간을 놓치면 안 돼요. 월 평균임금 300만원 미만이면 공인노무사·변호사 무료 지원.", tel: { label: "중앙노동위원회 1588-0106", url: "tel:15880106" } },
    { title: "결과 이행 명령", desc: "구제신청이 인정되면 원직 복직 + 해고 기간 임금 지급 명령이 나와요. 사업주 불이행 시 이행강제금이 부과돼요." },
  ];
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {steps.map((step, i) => (
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
      {FAQS.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button onClick={() => toggle(i)} style={{ width: "100%", textAlign: "left", padding: "13px 4px", display: "flex", alignItems: "flex-start", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
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
        {HUB_LINKS.map((link, i) => (
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
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ReturnRefusalPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>육아휴직 · 복직 · 권리 구제</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          육아휴직 후 복직 거부 |<br />
          사업주 처벌과 구제 신청 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          "자리가 없다", "사람을 새로 뽑았다"는 이유로 복직을 거부할 수 없어요.<br />
          <strong>복귀 못 시키면 500만원 이하 벌금, 해고하면 3년 이하 징역 또는 3천만원 이하 벌금이에요.</strong>
        </p>

        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 10 }}>🚨 지금 상황별 즉시 대응</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #FECACA" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>복직 자체를 거부당했어요</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>거부일로부터 3개월 이내에 지방노동위원회에 부당해고 구제신청을 해야 해요. 이 기한을 절대 놓치면 안 돼요. 문자·이메일·녹음 등 거부 증거를 지금 바로 확보하세요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #FECACA" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>복직했는데 다른 부서로 발령났어요</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>발령일로부터 3개월 이내에 노동위원회에 부당전보 구제신청을 하세요. 또는 고용노동청에 진정을 내면 근로감독관이 조사해요. 발령장을 증거로 확보해두세요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #FECACA" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>임금이 삭감됐거나 업무에서 배제되고 있어요</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>전부 불법이에요. 급여명세서와 이전·현재 직무 관련 자료를 확보하고 고용노동청에 진정을 내세요. 혼자 싸우기 힘들면 노동위원회 권리구제대리인(1588-0106)에 전화하면 무료로 도움받을 수 있어요.</p>
            </div>
          </div>
        </div>

        <H2>육아휴직 복직 거부 사업주 처벌 기준</H2>
        <p style={body}>법령으로 정해진 처벌을 먼저 확인하세요.</p>
        <Bdg>위반 행위별 처벌 기준</Bdg>
        <PenaltyTable />
        <GreenBox title="이것만 기억해요">
          ① 복직 의무: 육아휴직 전 동일 업무 또는 동일 수준 임금 직무로 복귀<br />
          ② 복직 거부·임금 삭감·직무 변경: 500만원 이하 벌금<br />
          ③ 육아휴직 이유 불리한 처우·해고: 3년 이하 징역 또는 3천만원 이하 벌금<br />
          ④ 구제신청 기한: 처분일로부터 3개월 이내
        </GreenBox>

        <Divider />

        <H2>육아휴직 복직 거부 구제 신청 방법</H2>
        <p style={body}>
          3개월 기한이 있어요. 복직 거부나 불이익 처분이 있었던 날로부터 3개월이 지나면 노동위원회 구제신청 자체가 안 돼요.<br />
          지금 당장 증거부터 확보하고 절차를 밟아야 해요.
        </p>
        <Bdg>구제 절차</Bdg>
        <Steps />
        <p style={body}>
          절차를 밟기 힘들면 아래 무료 지원 기관에 먼저 전화하세요. 노무사·변호사가 대리해줘요.
        </p>

        <HubLinks />

        <H2>육아휴직 후 복직 불이익 처우 대응 방법</H2>
        <p style={body}>
          복직 거부가 아니더라도 다른 부서 발령, 임금 삭감, 업무 배제도 불법이에요.<br />
          내 상황이 어디에 해당하는지 먼저 확인하고 대응 방법을 선택하세요.
        </p>
        <BorderBox title="복직 후 불리한 처우 유형별 대응">
          <strong>다른 부서·직무 발령</strong> → 부당전보 구제신청 (3개월 이내)<br />
          <strong>임금 삭감</strong> → 노동청 진정 + 체불 임금 청구<br />
          <strong>업무 배제·대기 발령</strong> → 노동청 진정 (불리한 처우)<br />
          <strong>권고사직 압박</strong> → 응하지 말고 거부 의사 표시 + 노동청 신고<br />
          <strong>복직 자체 거부</strong> → 부당해고 구제신청 (3개월 이내)
        </BorderBox>
        <p style={body}>
          어떤 유형이든 증거(발령장, 급여명세서, 문자, 녹음)를 먼저 확보해두는 게 가장 중요해요.
        </p>

        <H2>육아휴직 복직 거부 구제 무료 지원 기관</H2>
        <p style={body}>
          혼자 싸울 필요 없어요. 아래 기관은 전부 무료예요. 전화 한 통으로 내 상황에 맞는 조언을 바로 받을 수 있어요.
        </p>
        <div style={{ display: "flex", gap: 12, margin: "12px 0 1.2rem", flexWrap: "wrap" }}>
          {[
            { name: "서울직장맘지원센터", tel: "02-6929-3700", desc: "서울 소재 사업장 무료 상담" },
            { name: "대한법률구조공단", tel: "132", desc: "법률 상담 및 소송 지원" },
            { name: "노동위원회 권리구제대리인", tel: "1588-0106", desc: "월급 300만원 미만 노무사·변호사 무료" },
          ].map((c, i) => (
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
          복직했는데 다른 부서로 발령났을 때, 5인 미만 사업장이라 구제신청을 못 할 때 — 막혀 있는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>3개월 기한을 놓치지 마세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>부당해고·부당전보 구제신청은 처분일로부터 3개월 이내예요. 지금 바로 신청하세요.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.nlrc.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 노동위원회 구제신청</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 개별 사안에 따라 결과가 달라질 수 있어요. 구체적인 상황은 고용노동부(1350) 또는 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
