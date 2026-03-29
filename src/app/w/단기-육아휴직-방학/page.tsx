"use client";
import { useState } from "react";

// ─── 2026년 기준
// 단기 육아휴직: 남녀고용평등법·고용보험법 개정안 국회 통과 2026.1.29.
// 최소 사용단위 1개월로 단축 (기존 30일) → 방학 등 단기 돌봄 수요 활용 가능
// 분할 사용 3회까지 (총 4덩어리) - 임신 중 육아휴직 횟수 제외
// 육아기 근로시간 단축 최소 사용단위도 1개월로 단축
// 기존: 1회 기간 3개월 이상 → 개정 후: 1개월 이상으로 단축
// 전체 기간 합산은 동일 (최대 1년 또는 1년6개월)

const SIDEBAR_LINKS = [
  "단기 육아휴직 신청 방법",
  "육아휴직 방학 분할 사용",
  "육아휴직 분할 횟수 3회",
  "육아휴직 최소 사용 기간",
  "단기 육아휴직 급여",
  "육아기 근로시간 단축 분할",
  "육아휴직 신청 서류",
  "육아휴직 자동 승인",
  "6+6 부모육아휴직 금액",
  "육아휴직 급여 계산기",
  "육아휴직 거부 신고",
  "육아휴직 복직 거부 구제",
  "대체인력 지원금 신청",
  "출산전후휴가 대체인력",
  "남성 육아휴직 인센티브",
  "업무분담지원금 신청",
  "고용24 육아휴직 신청",
  "육아휴직 중 건강보험",
  "국민연금 납부유예",
  "육아기 10시 출근제",
];

const HUB_LINKS = [
  { title: "6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산", desc: "생후 18개월 이내 자녀 부모 각각 첫 6개월 통상임금 100%", href: "#" },
  { title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차", desc: "30인 미만 월 140만원 지원", href: "#" },
  { title: "중소기업 육아휴직 거부 신고 | 사업주 과태료와 신고 방법", desc: "거부 시 500만원 이하 벌금", href: "#" },
  { title: "육아기 근로시간 단축 대체인력 | 육아휴직과 차이점", desc: "초등학교 6학년 이하까지 단축 가능", href: "#" },
];

const FAQS = [
  { urgent: true, q: "방학에만 1개월 육아휴직을 쓸 수 있나요?", a: "네, 가능해요. 2026년 1월 29일 국회 통과된 개정법에 따라 육아휴직 최소 사용단위가 1개월로 줄었어요. 예전에는 한 번에 30일 이상을 써야 했는데, 이제는 여름방학·겨울방학 등 단기 돌봄이 필요한 기간에만 1개월씩 써도 돼요. 분할 사용 횟수(3회, 총 4덩어리)를 소진하지 않도록 계획을 세워두세요." },
  { urgent: true, q: "분할 3회면 총 몇 번 나눠 쓸 수 있나요?", a: "분할 '3회'는 나누는 횟수예요. 원래 1덩어리인 육아휴직을 3번 쪼갤 수 있으니 총 4덩어리로 사용할 수 있어요. 예를 들어 ① 여름방학 1개월 → ② 출산 후 연속 3개월 → ③ 겨울방학 1개월 → ④ 이후 7개월 이런 식으로 나눠 쓸 수 있어요. 임신 중 육아휴직에 쓴 분할 횟수는 여기서 제외돼요." },
  { urgent: false, q: "방학에 1개월만 쓰면 육아휴직 급여를 받을 수 있나요?", a: "받을 수 있어요. 30일 이상(1개월) 육아휴직을 사용하면 급여 지급 대상이에요. 급여는 사용한 기간에 비례해서 지급돼요. 예를 들어 딱 1개월만 쓰면 그 1개월에 해당하는 급여가 나와요. 단, 육아휴직 급여 신청은 육아휴직이 종료된 후 1개월부터 ~ 12개월 이내에 해야 해요." },
  { urgent: false, q: "단기 육아휴직은 언제부터 쓸 수 있나요?", a: "2026년 1월 29일에 국회를 통과했어요. 법률 공포 후 시행까지 준비 기간이 필요해요. 고용노동부에서 하위법령 정비와 시스템 개선 후 시행일을 확정해요. 정확한 시행일은 고용24 또는 고용노동부 공지를 확인하세요. 시행 전이라도 기존 분할 사용 방식(30일 이상 단위)으로는 지금도 사용 가능해요." },
  { urgent: false, q: "육아기 근로시간 단축도 단기로 쓸 수 있게 됐나요?", a: "네, 동일하게 개정됐어요. 육아기 근로시간 단축도 최소 사용단위가 기존 3개월에서 1개월로 단축됐어요. 방학 기간에만 근로시간을 줄이는 것도 가능해져요. 분할 사용 규정도 육아휴직과 동일하게 적용돼요." },
  { urgent: false, q: "육아휴직을 방학마다 1개월씩 4번 쓰면 분할 3회를 다 써버리나요?", a: "1회 분할이 총 횟수에서 1회 차감돼요. 4번 나눠 쓰면 3회 분할 + 나머지 1회, 총 4덩어리가 돼요. 분할 3회를 모두 써버리면 남은 기간을 한꺼번에 이어서만 써야 해요. 방학마다 조금씩 쓰고 싶다면 횟수를 아껴두는 것도 방법이에요. 임신 중 육아휴직은 이 횟수에 포함되지 않아요." },
  { urgent: false, q: "육아휴직 1년 6개월까지 쓸 수 있는 경우에도 단기 사용이 가능한가요?", a: "네, 가능해요. 부모 둘 다 육아휴직을 각각 3개월 이상 사용하거나 한부모·중증장애아동 부모라면 6개월 추가 사용이 가능한데, 이 추가 6개월도 1개월 단위로 나눠 쓸 수 있어요. 연장된 기간에도 분할 사용 규정이 적용돼요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조의4 (개정 2026.1.29.)", url: "https://www.law.go.kr/" },
    { label: "고용보험법 제70조 — 육아휴직 급여 지급 요건", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "고용노동부 — 단기육아휴직 도입 국회 통과 보도자료 (2026.1.29.)", url: "https://www.moel.go.kr" },
    { label: "정책브리핑 — 육아휴직 기간 연장·4회 분할 사용", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148934505" },
    { label: "서남권직장맘지원센터 — 개정된 육아휴직 6개월 추가 사용법", url: "https://www.gworkingmom.net/network/articles/120" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    vacation: { title: "방학에 잠깐 쓰고 싶다면", color: G, bg: GL, text: "개정법 시행 후에는 1개월 단위로 방학 기간에만 육아휴직을 쓸 수 있어요. 분할 3회 안에서 나눠 쓰면 돼요. 지금 당장 쓰고 싶다면 30일 이상 단위로 기존 방식으로도 가능해요." },
    split: { title: "분할 횟수가 남았는지 확인하고 싶다면", color: "#7C3AED", bg: "#F5F3FF", text: "고용24(work24.go.kr)에서 육아휴직 사용현황을 조회하면 이미 쓴 횟수와 남은 기간을 확인할 수 있어요." },
    plan: { title: "어떻게 나눠 쓸지 계획하고 싶다면", color: "#C2410C", bg: "#FFF7ED", text: "아래 사용 패턴 예시를 참고해서 계획을 세워보세요. 분할 횟수와 남은 기간을 먼저 확인하고, 자녀 연령 기준(만 8세 이하)도 체크하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ id: "vacation", label: "방학에만 짧게 쓰고 싶어요." }, { id: "split", label: "분할 횟수가 얼마나 남았는지 확인하고 싶어요." }, { id: "plan", label: "어떻게 나눠 쓰는 게 유리한지 알고 싶어요." }].map(item => (
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

function BeforeAfterTable() {
  const rows = [
    { item: "최소 사용단위", before: "30일 (약 1개월)", after: "1개월 (단기 사용 가능)" },
    { item: "분할 사용 횟수", before: "2회 (3덩어리)", after: "3회 (4덩어리)" },
    { item: "최대 기간", before: "1년 (조건 충족 시 1년 6개월)", after: "동일" },
    { item: "자녀 연령", before: "만 8세 이하 또는 초2 이하", after: "동일" },
    { item: "육아기 단축 최소 단위", before: "3개월", after: "1개월" },
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: GL }}>
            {["항목", "개정 전", "개정 후 (2026년)"].map(h => <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "#374151" }}>{r.item}</td>
              <td style={{ padding: "9px 10px", color: "#9ca3af" }}>{r.before}</td>
              <td style={{ padding: "9px 10px", color: G, fontWeight: 700 }}>{r.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsagePatternCard() {
  const patterns = [
    {
      title: "방학 활용 패턴",
      desc: "여름방학 1개월 + 겨울방학 1개월 + 남은 기간 연속 사용",
      detail: "① 여름방학 1개월 → ② 겨울방학 1개월 → ③ 남은 10개월 연속",
      note: "분할 2회 사용, 1회 남음",
    },
    {
      title: "출산 집중 + 방학 패턴",
      desc: "출산 후 3~6개월 연속 + 이후 방학마다 단기 사용",
      detail: "① 출산 직후 6개월 → ② 여름방학 1개월 → ③ 겨울방학 1개월 → ④ 남은 4개월",
      note: "분할 3회 모두 사용",
    },
    {
      title: "입학 적응 패턴",
      desc: "초등학교 입학 시기에 집중 사용",
      detail: "① 입학 전후 2~3개월 → ② 여름방학 1개월 → ③ 겨울방학 이후 연속",
      note: "자녀 만 8세 이하 기간 안에 활용",
    },
  ];
  return (
    <div style={{ display: "flex", gap: 12, margin: "12px 0 1.2rem", flexWrap: "wrap" }}>
      {patterns.map((p, i) => (
        <div key={i} style={{ flex: 1, minWidth: 200, border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 16px", background: i === 0 ? GL : "#fafafa" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? GD : "#111", margin: "0 0 6px" }}>{p.title}</p>
          <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, margin: "0 0 8px" }}>{p.desc}</p>
          <p style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.6, margin: "0 0 6px" }}>{p.detail}</p>
          <p style={{ fontSize: 11, fontWeight: 600, color: G, margin: 0 }}>💡 {p.note}</p>
        </div>
      ))}
    </div>
  );
}

function Steps() {
  const steps = [
    { title: "분할 횟수·남은 기간 확인", desc: "고용24 마이페이지에서 이미 쓴 육아휴직 기간과 분할 횟수를 확인해요. 총 3회 분할(4덩어리) 가능해요.", link: { label: "work24.go.kr", url: "https://www.work24.go.kr" } },
    { title: "사용 계획 수립", desc: "방학 일정·자녀 나이·업무 상황을 고려해 언제 얼마나 쓸지 계획해요. 자녀가 만 8세 초과 전에 사용해야 해요." },
    { title: "휴직개시 30일 전 신청", desc: "육아휴직 시작일의 30일 전까지 신청서를 사업주에게 제출해요. 긴급 상황(출산 전 조기 출산 등)은 7일 전까지도 가능해요." },
    { title: "사업주 14일 이내 응답", desc: "사업주는 14일 이내에 서면으로 허용 여부를 알려야 해요. 14일 이내에 응답이 없으면 신청한 대로 자동 승인돼요." },
    { title: "고용센터에 급여 신청", desc: "육아휴직 시작 후 1개월 이후부터 급여 신청 가능. 매월 신청하거나 몰아서 신청해요. 종료 후 12개월 이내에 신청해야 해요.", tel: { label: "고용24 급여 신청", url: "https://www.work24.go.kr" } },
  ];
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{step.title}</p>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>{step.desc}</p>
            {step.link && <a href={step.link.url} style={{ display: "inline-block", marginTop: 4, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", border: `1px solid ${G}`, padding: "3px 10px", borderRadius: 20 }}>↗ {step.link.label}</a>}
            {step.tel && <a href={step.tel.url} style={{ display: "inline-block", marginTop: 4, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", border: `1px solid ${G}`, padding: "3px 10px", borderRadius: 20 }}>↗ {step.tel.label}</a>}
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
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 단기 육아휴직 시행일은 고용노동부 공지를 별도 확인하세요.</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>육아휴직 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ShortLeaveVacationPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>육아휴직 · 단기 분할 · 방학 활용</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          단기 육아휴직 신청 방법 |<br />
          2026년 방학 활용 제도
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          방학에 1개월만 써도 되나요?<br />
          <strong>2026년 개정으로 최소 1개월 단위 사용이 가능해졌어요. 여름방학·겨울방학에 잠깐씩 쓸 수 있어요.</strong>
        </p>

        <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 단기 육아휴직 즉시 확인</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>방학에 1개월만 쓰면 급여도 나오나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>나와요. 1개월(30일 이상)만 써도 해당 기간 급여가 지급돼요. 1~3개월은 통상임금 100%(최대 250만원), 이후 구간은 달라요. 분할 사용 시 기간을 합산해서 구간이 결정돼요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>몇 번까지 나눠 쓸 수 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>3회 분할(4덩어리)이에요. 방학마다 1개월씩 3번 + 남은 기간 연속으로 쓰는 게 가능해요. 고용24에서 내 남은 분할 횟수를 먼저 확인하세요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>언제부터 쓸 수 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>개정법이 2026년 1월 29일 국회 통과됐어요. 정확한 시행일은 고용노동부 공지를 확인하세요. 시행 전에도 30일 이상 단위로 기존 방식으로 분할 사용은 지금도 가능해요.</p>
            </div>
          </div>
        </div>

        <H2>2026년 단기 육아휴직 제도 변경 사항</H2>
        <p style={body}>
          2026년 1월 29일 국회를 통과한 개정법으로 육아휴직 사용 방식이 더 유연해졌어요.
        </p>
        <Bdg>개정 전후 비교</Bdg>
        <BeforeAfterTable />
        <GreenBox title="핵심 변화">
          ① 최소 사용단위: 30일 → 1개월 (방학 등 단기 돌봄 수요 대응 가능)<br />
          ② 분할 횟수: 2회(3덩어리) → 3회(4덩어리)<br />
          ③ 육아기 근로시간 단축 최소 단위도 3개월 → 1개월<br />
          ※ 정확한 시행일은 고용노동부 공지 확인 필요
        </GreenBox>

        <Divider />

        <H2>방학 활용 단기 육아휴직 분할 사용 방법</H2>
        <p style={body}>
          분할 횟수는 총 3회(4덩어리)예요. 한 번 쓸 때마다 1회가 차감되니 미리 계획을 세워두는 게 좋아요.<br />
          방학·입학 등 돌봄이 집중되는 시기를 노려서 전략적으로 쓰는 게 유리해요.
        </p>
        <Bdg>사용 패턴 예시</Bdg>
        <UsagePatternCard />
        <BorderBox title="분할 횟수 계산 예시">
          총 1년 육아휴직 기간, 분할 3회(4덩어리) 예시:<br />
          ① 출산 후 4개월 → ② 여름방학 1개월 → ③ 겨울방학 1개월 → ④ 남은 6개월<br />
          → 급여: 1~3개월 월 250만원, 4~6개월 200만원, 이후 160만원 (분할 사용 시 합산)
        </BorderBox>
        <p style={body}>
          패턴을 정했으면 고용24에서 남은 분할 횟수와 기간을 먼저 조회하고 신청해요.
        </p>

        <Divider />

        <H2>단기 육아휴직 신청 방법과 절차</H2>
        <p style={body}>
          기존 육아휴직 신청 방법과 동일해요. 분할 횟수가 남아 있는지 먼저 확인하고 시작하세요.<br />
          휴직 시작일 30일 전까지 신청서를 내야 해요. 방학 일정에 맞추려면 한 달 전부터 준비해야 해요.
        </p>
        <Bdg>신청 절차</Bdg>
        <Steps />
        <p style={body}>
          신청 후 사업주가 14일 이내에 응답하지 않으면 자동 승인돼요. 거부 의사를 표시하면 고용노동부(1350)에 신고하면 돼요.
        </p>

        <HubLinks />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          방학에 1개월만 써도 급여를 받을 수 있는지, 분할 횟수가 얼마나 남았는지 — 지금 바로 궁금한 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>분할 사용 현황 확인하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>고용24에서 이미 쓴 기간과 남은 분할 횟수를 조회할 수 있어요.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.work24.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 고용24 사용현황 조회</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 단기 육아휴직 시행일은 고용노동부 공지를 별도 확인하세요. 구체적인 상황은 고용노동부(1350)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
