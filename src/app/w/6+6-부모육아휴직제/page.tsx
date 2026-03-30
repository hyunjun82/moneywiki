"use client";
import { useState } from "react";

// ─── 2026년 기준 (고용보험법 시행령 제95조의3, 2026.1.2. 시행)
// 6+6 부모육아휴직제: 생후 18개월 이내 자녀, 부모 모두 육아휴직 사용 시
// 첫 6개월 각각 통상임금 100% 지급
// 월별 상한액: 1개월 250 / 2개월 250 / 3개월 300 / 4개월 350 / 5개월 400 / 6개월 450 (만원)
// 7개월~: 통상임금 80%, 상한 160만원
// 일반 육아휴직 급여: 1~3개월 상한 250만원, 4~6개월 상한 200만원, 7개월~ 상한 160만원
// 신청: 육아휴직 시작 후 1개월~12개월 이내, 고용24(ei.go.kr)
// 조건: 고용보험 피보험단위기간 180일 이상, 2024.1.1. 이후 최초 사용
// 한부모 특례: 1~3개월 상한 300만원 (단독)
// 육아휴직 기간: 기본 1년, 부모 각각 3개월 이상 사용 시 6개월 추가 (최대 1년 6개월)

const SIDEBAR_LINKS = [
  "6+6 부모육아휴직제 신청 방법",
  "6+6 육아휴직 급여 계산",
  "6+6 부모육아휴직 조건",
  "육아휴직 급여 월별 상한액",
  "육아휴직 동시 사용 급여",
  "육아휴직 순차 사용 전략",
  "한부모 육아휴직 특례",
  "육아휴직 1년 6개월 조건",
  "고용보험 180일 계산",
  "육아휴직 신청 서류",
  "육아휴직 자동 승인",
  "출산전후휴가 육아휴직 연계",
  "육아휴직 대체인력 지원금",
  "남성 육아휴직 인센티브",
  "단기 육아휴직 방학 활용",
  "육아기 근로시간 단축",
  "6+6 공무원 적용",
  "육아휴직 중 건강보험",
  "국민연금 납부유예",
  "고용24 급여 신청",
];

const HUB_LINKS = [
  { title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차", desc: "사업주가 받는 지원금, 30인 미만 월 140만원", href: "#" },
  { title: "단기 육아휴직 신청 방법 | 2026년 방학 활용 제도", desc: "최소 1개월 단위, 3회 분할 사용 가능", href: "#" },
  { title: "출산전후휴가 대체인력 지원금 | 육아휴직과 동시 신청 가능한가", desc: "출산전후휴가→육아휴직 연속 통합 신청", href: "#" },
  { title: "남성 육아휴직 인센티브 | 중소기업 월 10만원 추가 지원", desc: "처음 허용한 세 번째 사례까지 추가 지원", href: "#" },
];

const MONTH_LIMITS = [250, 250, 300, 350, 400, 450];

const FAQS = [
  { urgent: true, q: "동시에 휴직을 써야 6+6이 적용되나요?", a: "아니요. 동시 사용과 순차 사용 모두 적용돼요. 생후 18개월 이내에 부모가 모두 육아휴직을 사용하기만 하면 돼요. 예를 들어 엄마가 먼저 6개월 쓰고, 이후 아빠가 6개월 써도 두 사람 모두 6+6 상한액이 적용돼요." },
  { urgent: true, q: "첫 번째 사람이 휴직 중인데 두 번째가 아직 신청 안 했어요. 소급 적용되나요?", a: "돼요. 두 번째 사람이 육아휴직 급여를 신청하면 그때 6+6 적용 여부를 판단해요. 첫 번째 사람이 일반 급여로 받고 있다가 두 번째가 신청하면, 첫 번째 사람의 해당 기간 차액분이 추가 지급돼요." },
  { urgent: false, q: "부모 중 한 명이 공무원이에요. 6+6이 적용되나요?", a: "일반 근로자에게만 고용보험 기반 6+6 제도가 적용돼요. 공무원은 별도 공무원 수당 규정이 적용되며, 6개월째 상한이 450만원으로 동일하게 설정돼 있어요. 배우자(일반 근로자)는 6+6 적용을 받을 수 있어요." },
  { urgent: false, q: "6+6을 적용받으려면 2024년 이후 사용해야 한다는 게 무슨 뜻인가요?", a: "부모 중 한 명이라도 2024년 1월 1일 이후에 육아휴직을 최초로 시작했어야 해요. 예를 들어 엄마가 2023년에 이미 다 썼더라도 아빠가 2024년 이후에 처음 육아휴직을 시작하면 6+6이 적용돼요." },
  { urgent: false, q: "한부모도 6+6을 받을 수 있나요?", a: "한부모 특례는 별도로 적용돼요. 한부모가족지원법상 모 또는 부에 해당하면 단독으로도 1~3개월 상한 300만원, 이후 일반 급여 기준이 적용돼요. 6+6은 부모 둘 다 써야 하는 구조라 한부모에게는 적용되지 않지만, 한부모 특례가 더 유리할 수 있어요." },
  { urgent: false, q: "6+6을 쓴 뒤 7개월부터는 얼마 받나요?", a: "7개월부터는 일반 육아휴직 급여로 전환돼요. 통상임금의 80%, 상한 160만원이에요. 예를 들어 월 통상임금 300만원인 사람은 7개월부터 160만원을 받게 돼요." },
  { urgent: false, q: "육아휴직을 1년 6개월까지 늘릴 수 있다는데, 6+6과 어떻게 연결되나요?", a: "별개 혜택이에요. 부모가 각각 3개월 이상 육아휴직을 쓰면 기본 1년에 6개월을 추가로 사용할 수 있어요(최대 1년 6개월). 이 추가 6개월은 통상임금 80%, 상한 160만원이 적용돼요. 6+6은 급여 상한액을 올려주는 제도, 기간 연장은 별도 조건이에요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "고용보험법 시행령 제95조의3 — 출생 후 18개월 이내 자녀 특례 (2026.1.2. 시행)", url: "https://www.law.go.kr/" },
    { label: "고용보험법 시행령 제95조 — 일반 육아휴직 급여 (2026.1.2. 시행)", url: "https://www.law.go.kr/" },
    { label: "남녀고용평등법 제19조 — 육아휴직 조건", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "고용노동부 — 6+6 부모육아휴직제 제도 안내", url: "https://www.moel.go.kr" },
    { label: "고용24 — 육아휴직 급여 신청", url: "https://www.work24.go.kr" },
    { label: "서남권직장맘지원센터 — 2026년 개정 육아휴직 제도 정리", url: "https://www.gworkingmom.net/network/articles/120" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: { children: React.ReactNode }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: { children: React.ReactNode }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function InstantAnswer() {
  return (
    <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 6+6 핵심 3가지 즉시 확인</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { q: "6+6을 적용받으려면 무엇이 필요한가요?", a: "생후 18개월 이내 자녀 + 부모 둘 다 육아휴직 사용. 동시·순차 모두 가능해요. 한 명이라도 2024년 1월 이후 최초 사용이면 돼요." },
          { q: "일반 육아휴직보다 얼마나 더 받나요?", a: "1~3개월은 같아요(상한 250만원). 4개월차부터 달라져요. 일반은 200만원, 6+6은 350만원이에요. 6개월차엔 일반 200만원 vs 6+6 450만원으로 차이가 최대 250만원이에요." },
          { q: "부부가 각각 6개월 쓰면 합산 얼마까지 받나요?", a: "통상임금이 상한액 이상인 경우 6개월 합산 최대 2,000만원(한 명 기준), 부부 합산 최대 4,000만원이에요. 이후 6개월 연장까지 쓰면 더 늘어나요." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{item.q}</p>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MonthlyTable() {
  const rows = [
    { month: "1개월", limit6: "250만원", limitGeneral: "250만원", diff: "같음" },
    { month: "2개월", limit6: "250만원", limitGeneral: "250만원", diff: "같음" },
    { month: "3개월", limit6: "300만원", limitGeneral: "250만원", diff: "+50만원" },
    { month: "4개월", limit6: "350만원", limitGeneral: "200만원", diff: "+150만원" },
    { month: "5개월", limit6: "400만원", limitGeneral: "200만원", diff: "+200만원" },
    { month: "6개월", limit6: "450만원", limitGeneral: "200만원", diff: "+250만원" },
    { month: "7개월~", limit6: "160만원 (80%)", limitGeneral: "160만원 (80%)", diff: "같음" },
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: GL }}>
            {["기간", "6+6 상한액 (각각)", "일반 육아휴직 상한액", "차이"].map(h => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i >= 3 && i <= 5 ? GL : i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "#374151" }}>{r.month}</td>
              <td style={{ padding: "9px 10px", color: G, fontWeight: 700 }}>{r.limit6}</td>
              <td style={{ padding: "9px 10px", color: "#374151" }}>{r.limitGeneral}</td>
              <td style={{ padding: "9px 10px", color: r.diff === "같음" ? "#9ca3af" : "#DC2626", fontWeight: r.diff !== "같음" ? 700 : 400 }}>{r.diff}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>※ 6+6은 부모 각각 위 금액 적용. 통상임금이 상한액 미만이면 통상임금 100% 지급. 하한 70만원.</p>
    </div>
  );
}

function Calculator() {
  const [wage, setWage] = useState(300);
  const [mode, setMode] = useState("66");

  const limits66 = [250, 250, 300, 350, 400, 450];
  const limitsGeneral = [250, 250, 250, 200, 200, 200];

  const calc = (limits: number[]) => limits.map(lim => Math.min(wage, lim));
  const payments66 = calc(limits66);
  const paymentsGeneral = calc(limitsGeneral);
  const total66 = payments66.reduce((a, b) => a + b, 0);
  const totalGeneral = paymentsGeneral.reduce((a, b) => a + b, 0);

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "12px 0 1.2rem" }}>
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 6 }}>월 통상임금</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="range" min={70} max={600} step={10} value={wage}
            onChange={e => setWage(Number(e.target.value))}
            style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: G, minWidth: 60 }}>{wage}만원</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[{ id: "66", label: "6+6 부모육아휴직제" }, { id: "general", label: "일반 육아휴직" }].map(opt => (
          <button key={opt.id} onClick={() => setMode(opt.id)}
            style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${mode === opt.id ? G : "#e5e7eb"}`, background: mode === opt.id ? GL : "#fff", color: mode === opt.id ? GD : "#374151", fontSize: 12, fontWeight: mode === opt.id ? 700 : 400, cursor: "pointer" }}>
            {opt.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {(mode === "66" ? payments66 : paymentsGeneral).map((amt, i) => (
          <div key={i} style={{ flex: 1, minWidth: 60, textAlign: "center", padding: "10px 6px", borderRadius: 8, background: GL, border: `1px solid ${G}` }}>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>{i + 1}개월</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: GD, margin: 0 }}>{amt}만원</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#374151" }}>6개월 합계</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: G }}>{mode === "66" ? total66 : totalGeneral}만원</span>
      </div>
      {mode === "66" && (
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6, lineHeight: 1.7 }}>
          일반 대비 6개월 추가 수령: <strong style={{ color: G }}>{total66 - totalGeneral}만원</strong> 더 받아요. 부부 합산은 2배예요.
        </p>
      )}
    </div>
  );
}

function ConditionChecker() {
  const [checks, setChecks] = useState({});
  const items = [
    { id: "child", label: "자녀가 생후 18개월 이내예요" },
    { id: "insurance", label: "고용보험 가입 기간이 180일 이상이에요 (부모 각각)" },
    { id: "both", label: "부모 둘 다 육아휴직을 쓸 예정이에요" },
    { id: "date", label: "부모 중 한 명이라도 2024년 1월 이후 처음 육아휴직을 쓰는 상황이에요" },
    { id: "private", label: "일반 근로자예요 (공무원·사립학교 교원 제외)" },
  ];
  const toggle = (id) => setChecks(p => ({ ...p, [id]: !p[id] }));
  const count = Object.values(checks).filter(Boolean).length;

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "12px 0 1.2rem" }}>
      {items.map(item => (
        <div key={item.id} onClick={() => toggle(item.id)}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${checks[item.id] ? G : "#d1d5db"}`, background: checks[item.id] ? G : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {checks[item.id] && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{item.label}</span>
        </div>
      ))}
      <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: count === 5 ? GL : count >= 3 ? "#FFF7ED" : "#f9fafb" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: count === 5 ? GD : count >= 3 ? "#C2410C" : "#9ca3af", margin: 0 }}>
          {count === 5 ? "✅ 5가지 모두 해당, 6+6 적용 가능해요. 아래 절차대로 신청하세요." : count >= 3 ? `⚠️ ${5 - count}가지 더 확인 필요해요.` : `${count}/5 확인됨`}
        </p>
      </div>
    </div>
  );
}

function Steps() {
  const steps = [
    { title: "육아휴직 신청 (회사에 30일 전 서면 제출)", desc: "개시 예정일 30일 전까지 회사에 서면으로 신청해요. 동시에 출산전후휴가와 통합 신청도 가능해요. 사업주가 14일 이내 미응답 시 자동 승인." },
    { title: "육아휴직 확인서 발급", desc: "회사가 육아휴직을 허용하면 육아휴직 확인서를 발급해줘요. 이 서류가 있어야 고용센터에 급여를 신청할 수 있어요." },
    { title: "고용24에서 육아휴직 급여 신청", desc: "휴직 시작 후 1개월 이후부터 신청 가능해요. 매월 또는 몰아서 신청 모두 가능해요. 종료 후 12개월 이내에 신청해야 해요.", link: { label: "work24.go.kr 신청", url: "https://www.work24.go.kr" } },
    { title: "두 번째 사람 신청 시 6+6 자동 적용", desc: "두 번째 사람이 육아휴직 급여를 신청하면 고용센터에서 6+6 적용 여부를 확인해요. 첫 번째 사람의 차액이 있으면 소급 추가 지급돼요." },
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

export default function ParentalLeave66Page() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>육아휴직 · 6+6 특례 · 급여 계산</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          육아휴직 급여 6+6 부모육아휴직제 |<br />
          신청 조건과 월별 금액 계산
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          부부가 함께 육아휴직을 쓰면 급여가 확 올라요.<br />
          <strong>6개월차에 일반 육아휴직은 200만원이지만, 6+6은 450만원이에요. 차이가 250만원이에요.</strong><br />
          조건은 생후 18개월 이내 자녀 + 부모 둘 다 육아휴직 사용. 동시·순차 모두 돼요.
        </p>

        <InstantAnswer />

        <H2>6+6 부모육아휴직제 신청 조건</H2>
        <p style={body}>
          조건이 까다롭지 않아요. 아래 5가지를 체크해보세요.<br />
          한 명이라도 2024년 이후 처음 쓰는 거라면 대부분 해당돼요.
        </p>
        <Bdg>6+6 적용 조건 체크</Bdg>
        <ConditionChecker />
        <p style={body}>
          5가지 전부 해당된다면 아래 계산기에서 내가 받을 금액부터 확인해보세요.
        </p>

        <Divider />

        <H2>6+6 부모육아휴직제 월별 금액 계산</H2>
        <p style={body}>
          통상임금이 같더라도 몇 개월 쓰느냐에 따라 받는 금액이 달라져요.<br />
          4개월차부터 6+6과 일반 육아휴직의 차이가 벌어지기 시작해요. 슬라이더로 내 통상임금을 입력해보세요.
        </p>
        <Bdg>월별 급여 계산기</Bdg>
        <Calculator />
        <GreenBox title="부부 합산 최대 금액 (통상임금 상한 이상인 경우)">
          6개월 한 명 기준: 250+250+300+350+400+450 = 2,000만원<br />
          부부 합산 6개월: 4,000만원<br />
          이후 6개월 연장 사용 시 (통상임금 80%, 상한 160만원) 각각 최대 960만원 추가
        </GreenBox>

        <Divider />

        <H2>6+6 부모육아휴직 급여 상한액 비교</H2>
        <p style={body}>
          일반 육아휴직과 6+6의 차이가 어느 달에 얼마나 나는지 표로 바로 확인할 수 있어요.<br />
          3개월까지는 같고, 4개월차부터 6+6이 월등히 높아요.
        </p>
        <Bdg>월별 상한액 비교표</Bdg>
        <MonthlyTable />
        <BorderBox title="7개월차부터는 동일해요">
          6+6 혜택은 첫 6개월에만 적용돼요. 7개월째부터는 일반 육아휴직 급여와 동일하게 통상임금 80%, 상한 160만원이에요.<br />
          6개월차에 최대한 많이 받고 싶다면 통상임금이 450만원 이상인 달에 맞춰 6개월차가 오도록 시기를 조율하는 것도 전략이에요.
        </BorderBox>

        <HubLinks />

        <H2>6+6 부모육아휴직제 신청 방법과 절차</H2>
        <p style={body}>
          신청 자체는 기존 육아휴직과 동일해요. 6+6은 자동으로 판단되기 때문에 별도 신청이 필요 없어요.<br />
          두 번째 사람이 급여를 신청하면 고용센터에서 6+6 여부를 확인하고 첫 번째 사람 차액도 소급 지급해요.
        </p>
        <Bdg>신청 절차</Bdg>
        <Steps />
        <p style={body}>
          신청 기한은 육아휴직 종료 후 12개월 이내예요. 매월 신청하지 않아도 몰아서 신청할 수 있어요. 단 기한은 절대 넘기면 안 돼요.
        </p>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          동시 사용이어야 하는지, 첫 번째 사람이 이미 일반 급여로 받고 있는데 소급 적용되는지, 실제로 가장 많이 막히는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지금 바로 신청하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            고용24에서 육아휴직 급여 신청 시 6+6 적용 여부가 자동 확인돼요.<br />
            헷갈리면 고용노동부 1350에 전화하면 내 상황에 맞게 안내해줘요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.work24.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 고용24 신청하기</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 개별 사안에 따라 달라질 수 있어요. 고용노동부(1350) 또는 관할 고용센터에 문의하세요.
        </div>
      </div>
    </div>
  );
}
