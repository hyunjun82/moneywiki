"use client";
import { useState } from "react";

// ─── 2026년 기준 (고용보험법 시행령 제29조제1항제4호, 2026.1.1. 시행)
// 육아휴직 업무분담지원금: 30인 미만 월 60만원 / 30인 이상 40만원 (2026.1.1.부터)
// 육아기 근로시간 단축 업무분담지원금: 기업 규모 무관 월 최대 20만원 유지
// 업무분담자 지정 증빙서류 제출 의무 폐지 (2026.1.1.부터)
// 사업주가 업무분담자에게 지급한 금액의 100% 지원 (지급 한도 내)

const SIDEBAR_LINKS = [
  "업무분담지원금 신청 방법",
  "대체인력 없이 지원금 받는 방법",
  "육아휴직 대체인력 지원금",
  "우선지원대상기업 해당 여부",
  "파견 vs 직고용 대체인력",
  "육아휴직 지원금 중복 수급",
  "남성 육아휴직 인센티브",
  "육아기 근로시간 단축 지원금",
  "업무분담자 지정 방법",
  "출산전후휴가 사업주 지원",
  "고용24 장려금 신청",
  "사업주 지원금 종류",
  "고용안정장려금 신청 기간",
  "우선지원대상기업 확인",
  "육아휴직 복직 거부 신고",
  "6+6 부모육아휴직 금액",
  "중소기업 육아휴직 지원",
  "단기 육아휴직 방학 활용",
  "육아휴직 거부 신고",
  "고용노동부 장려금 전화",
];

const HUB_LINKS = [
  { title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차", desc: "대체인력 고용 시 월 최대 140만원 지원", href: "#" },
  { title: "대체인력 지원금 대상 조건 | 우선지원대상기업 해당 여부 확인", desc: "업종별 상시근로자 기준과 자가 확인 방법", href: "#" },
  { title: "파견 vs 직고용 대체인력 | 어느 쪽이 지원금에 유리한가", desc: "직고용·파견 모두 동일 지원", href: "#" },
  { title: "남성 육아휴직 인센티브 | 중소기업 월 10만원 추가 지원", desc: "처음 허용한 세 번째 사례까지 월 10만원 추가", href: "#" },
];

const FAQS = [
  { urgent: true, q: "업무분담자에게 얼마를 줘야 지원금을 받을 수 있나요?", a: "금액 제한은 없어요. 사업주가 업무분담자에게 지급한 금액의 100%를 지원해요. 단, 30인 미만 사업장은 월 60만원, 30인 이상은 월 40만원을 한도로 해요. 예를 들어 30인 미만 사업장에서 업무분담자에게 월 50만원을 지급했다면 지원금도 50만원이에요. 80만원을 지급했다면 한도 60만원만 받아요." },
  { urgent: true, q: "2026년부터 업무분담자 지정 서류를 안 내도 된다는 게 맞나요?", a: "네, 맞아요. 2026년 1월 1일부터 업무분담자 지정 증빙서류 제출 의무가 폐지됐어요. 이전에는 업무분담자 지정 사실을 증명하는 서류를 별도로 내야 했는데, 지금은 내지 않아도 돼요. 신청 절차가 그만큼 간소화됐어요." },
  { urgent: true, q: "업무분담지원금과 대체인력지원금을 동시에 받을 수 있나요?", a: "아니요. 같은 직원에 대해 업무분담지원금과 대체인력지원금은 중복 수급이 안 돼요. 즉, 대체인력을 채용했다면 그 대체인력에 대해 다시 업무분담지원금을 받을 수 없어요. 둘 중 하나를 선택해야 해요. 대체인력이 없어서 기존 직원에게 업무를 맡기는 경우에 업무분담지원금을 신청하는 게 맞아요." },
  { urgent: false, q: "육아기 근로시간 단축도 업무분담지원금을 받을 수 있나요?", a: "받을 수 있어요. 단, 육아기 근로시간 단축에 대한 업무분담지원금은 기업 규모와 관계없이 월 최대 20만원이에요. 2026년 개정으로 인상된 60만원/40만원은 육아휴직에만 적용돼요. 또한 육아기 근로시간 단축은 주당 10시간 이상 단축이 있어야 업무분담지원금 대상이에요." },
  { urgent: false, q: "업무분담자를 여러 명 지정할 수 있나요?", a: "최대 5명까지 지정 가능해요. 단, 같은 업무분담자를 2명 이상의 육아휴직자에 대한 업무분담자로 동시에 지정할 수는 없어요. 또한 대체인력 지원금을 이미 받고 있는 직원을 업무분담자로 지정하면 업무분담지원금 대상에서 제외돼요." },
  { urgent: false, q: "업무분담지원금 신청 시기는 언제예요?", a: "업무분담자가 업무분담을 시작한 날이 속하는 달의 다음 달부터 3개월마다 신청해요. 예: 1월에 업무분담 시작 → 2월부터 3개월 단위로 신청. 2026년 1월 1일 이전에 이미 업무분담자를 지정한 경우라도 2026년 1월 1일 이후의 기간에 대해서는 인상된 지원금 단가가 적용돼요." },
  { urgent: false, q: "육아휴직지원금 특례(만 12개월 이내 특례)를 받으면 업무분담지원금도 받을 수 있나요?", a: "네, 받을 수 있어요. 육아휴직지원금(특례·남성인센티브 포함)은 업무분담지원금과 중복 수급이 가능해요. 단, 업무분담지원금과 대체인력지원금은 중복이 안 된다는 점은 동일해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "고용보험법 시행령 제29조제1항제4호 — 업무분담지원금 요건", url: "https://www.law.go.kr/" },
    { label: "고용창출장려금·고용안정장려금의 신청 및 지급에 관한 규정 별표5 제4호", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "서남권직장맘지원센터 — 업무분담지원금 제도 안내", url: "https://gworkingmom.net/businesses/business/17" },
    { label: "고용24 — 업무분담지원금 제도 안내", url: "https://m.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000456" },
    { label: "2026년 고용노동부 예산안 — 업무분담지원금 인상 내용", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148954128" },
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
    new: { title: "처음 신청하신다면", color: G, bg: GL, text: "대체인력을 구하지 않아도 돼요. 기존 직원에게 육아휴직자 업무를 맡기고 금전적 수당을 줬다면 그것만으로 신청 가능해요. 고용24(work24.go.kr)에서 온라인 신청 또는 관할 고용센터에 서류를 내면 돼요." },
    calc: { title: "지원금 얼마인지 계산하려면", color: "#7C3AED", bg: "#F5F3FF", text: "사업주가 업무분담자에게 준 금액의 100%가 지원금이에요. 30인 미만은 월 최대 60만원, 30인 이상은 월 최대 40만원이 한도예요. 지급한 금액이 한도보다 작으면 지급한 만큼만 받아요." },
    overlap: { title: "대체인력지원금과 같이 받으려면", color: "#C2410C", bg: "#FFF7ED", text: "같은 직원에 대해 업무분담지원금과 대체인력지원금은 중복 수급이 안 돼요. 대체인력을 고용했다면 그 대체인력에 대해 다시 업무분담지원금은 못 받아요. 대체인력이 없어서 기존 직원에게 업무를 맡기는 상황에 업무분담지원금을 쓰면 돼요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ id: "new", label: "처음 알았어요. 신청하고 싶어요." }, { id: "calc", label: "지원금이 얼마인지 계산해보고 싶어요." }, { id: "overlap", label: "대체인력지원금과 같이 받을 수 있는지 궁금해요." }].map(item => (
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

function Calculator() {
  const [size, setSize] = useState("small");
  const [paid, setPaid] = useState(0);
  const limit = size === "small" ? 60 : 40;
  const result = Math.min(paid, limit);
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "16px 18px", margin: "12px 0 1.2rem" }}>
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>사업장 규모</p>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ val: "small", label: "30인 미만 (월 최대 60만원)" }, { val: "large", label: "30인 이상 (월 최대 40만원)" }].map(o => (
            <button key={o.val} onClick={() => setSize(o.val)} style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${size === o.val ? G : "#e5e7eb"}`, background: size === o.val ? GL : "#fff", color: size === o.val ? GD : "#374151", fontSize: 13, cursor: "pointer", fontWeight: size === o.val ? 700 : 400 }}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>업무분담자에게 실제 지급한 월 금액 (만원)</p>
        <input type="number" value={paid || ""} onChange={e => setPaid(Number(e.target.value))} placeholder="0" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, outline: "none" }} />
      </div>
      <div style={{ padding: "12px 16px", borderRadius: 8, background: result > 0 ? GL : "#f9fafb", border: `1px solid ${result > 0 ? G : "#e5e7eb"}` }}>
        <p style={{ fontSize: 13, color: GD, margin: 0 }}>
          {result > 0
            ? <><strong>예상 지원금: 월 {result}만원</strong> (지급한 {paid}만원 중 {result === paid ? "전액" : `한도 ${limit}만원`} 지원)</>
            : "지급 금액을 입력해보세요."}
        </p>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>※ 실제 지원금은 고용센터 심사에 따라 달라질 수 있어요.</p>
    </div>
  );
}

function Steps() {
  const steps = [
    { title: "육아휴직 30일 이상 부여", desc: "근로자에게 육아휴직 또는 육아기 근로시간 단축을 30일 이상 부여해야 해요." },
    { title: "업무분담자 지정 + 금전적 지원", desc: "육아휴직자 업무를 대신할 직원을 지정하고, 수당 등 금전적 지원을 실제로 지급해야 해요. 얼마를 줘야 한다는 규정은 없지만 지급한 금액의 100%가 지원금이에요." },
    { title: "고용24 또는 고용센터에 신청", desc: "업무분담 시작 달의 다음 달부터 3개월마다 신청해요. 온라인(work24.go.kr) 또는 관할 고용센터에 서류를 제출해요.", link: { label: "work24.go.kr", url: "https://www.work24.go.kr" } },
    { title: "지원금 수령", desc: "사업주가 업무분담자에게 지급한 금액의 100%가 지원금으로 나와요. 지급 한도(30인 미만 월 60만원, 30인 이상 40만원) 내에서 지급돼요." },
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 육아휴직 사업주 지원금 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
          </a>
        ))}
      </div>
      <a href="#" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>사업주 지원금 관련 글 전체 보기 →</a>
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>사업주 지원금 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function WorkShareSubsidyPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>육아휴직 · 업무분담 · 사업주 지원금</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          업무분담 지원금 신청 방법 |<br />
          대체인력 없이 월 20만원 받는 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          사람을 새로 뽑지 않아도 지원금을 받을 수 있어요.<br />
          <strong>기존 직원에게 업무를 맡기고 수당을 지급하면, 그 금액 100%를 정부가 돌려줘요.</strong><br />
          2026년부터 30인 미만은 월 최대 60만원으로 올랐어요.
        </p>

        <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 업무분담지원금 핵심 3가지</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>얼마 돌려받나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>업무분담자에게 지급한 금액의 100%예요. 30인 미만은 월 최대 60만원, 30인 이상은 월 최대 40만원이 한도예요. 50만원 줬으면 50만원, 80만원 줬으면 한도인 60만원만 받아요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>대체인력지원금이랑 같이 받을 수 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>동일한 직원에 대해서는 중복이 안 돼요. 대체인력을 뽑았다면 그 대체인력에 대해 업무분담지원금은 못 받아요. 대체인력 없이 기존 직원에게 업무를 맡기는 상황에 쓰는 게 맞아요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>2026년에 달라진 게 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>두 가지요. 지원금이 월 20만원 → 30인 미만 60만원 / 30인 이상 40만원으로 대폭 올랐어요. 업무분담자 지정 증빙서류 제출 의무도 폐지됐어요. 임금명세서만 있으면 돼요.</p>
            </div>
          </div>
        </div>

        <H2>업무분담 지원금 조건과 월 지원 금액</H2>
        <p style={body}>
          육아휴직·육아기 근로시간 단축 근로자의 업무를 동료 직원이 나눠 맡을 때, 사업주가 그 직원에게 수당을 지급하면 그 금액을 정부가 돌려주는 제도예요.<br />
          대체인력을 채용하기 어려운 소규모 사업장에서 특히 유용해요.
        </p>
        <GreenBox title="2026년 지원금 한도">
          육아휴직 업무분담: 30인 미만 월 최대 60만원 / 30인 이상 월 최대 40만원<br />
          육아기 근로시간 단축 업무분담: 기업 규모 무관 월 최대 20만원 (변동 없음)<br />
          2026년 1월 1일부터 업무분담자 지정 증빙서류 제출 의무도 폐지됐어요.
        </GreenBox>

        <Divider />

        <H2>업무분담 지원금 금액 계산 방법</H2>
        <p style={body}>
          사업주가 지급한 금액의 100%가 지원금이에요. 한도 안에서요.<br />
          얼마를 줘야 할지 기준이 없어요. 1만원을 줘도 1만원이 돌아와요. 한도까지 맞추는 게 가장 유리해요.
        </p>
        <Bdg>업무분담지원금 계산기</Bdg>
        <Calculator />
        <p style={body}>
          계산기에서 금액을 확인했으면 아래 절차대로 신청하면 돼요.
        </p>

        <Divider />

        <H2>업무분담 지원금 신청 방법과 절차</H2>
        <p style={body}>
          복잡하지 않아요. 육아휴직 주면 → 수당 지급 → 3개월마다 신청하면 돼요.<br />
          업무분담자 지정 서류는 2026년부터 제출 의무가 폐지돼서 임금명세서만 있으면 돼요.
        </p>
        <Bdg>신청 절차</Bdg>
        <Steps />
        <BorderBox title="필요 서류">
          고용안정장려금 지급신청서 (고용24 서식자료실)<br />
          육아휴직 실시 증명 서류 사본 (인사발령장 등)<br />
          업무분담자에게 금전적 지원을 했음을 확인할 수 있는 서류 (임금명세서 등)<br />
          ※ 2026년부터 업무분담자 지정 증빙서류 별도 제출 의무 폐지
        </BorderBox>
        <p style={body}>
          신청은 업무분담 시작한 달의 다음 달부터 3개월마다 해요. 첫 신청 타이밍을 달력에 표시해두세요. 놓쳐도 해당 기간 종료 후 12개월 이내면 소급 신청 가능해요.
        </p>

        <HubLinks />

        <H2>대체인력 없이 받는 업무분담 지원금과 대체인력 지원금 차이</H2>
        <p style={body}>
          둘 다 사업주를 위한 지원금이지만 상황에 따라 다르게 써요.<br />
          대체인력을 이미 채용했다면 그 직원에 대해서는 업무분담지원금을 중복해서 받을 수 없어요. 사람을 새로 뽑기 어려운 상황에서 업무분담지원금을 쓰는 게 맞아요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: GL }}>
                {["구분", "대체인력지원금", "업무분담지원금"].map(h => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["조건", "새 직원 채용(직고용·파견)", "기존 직원에게 업무 맡기고 수당 지급"],
                ["지원금 (30인 미만)", "월 최대 140만원", "월 최대 60만원"],
                ["지원금 (30인 이상)", "월 최대 130만원", "월 최대 40만원"],
                ["중복 수급", "불가 (업무분담지원금과 동일 직원에 대해 불가)", "불가 (대체인력지원금과 동일 직원에 대해 불가)"],
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  {r.map((c, j) => <td key={j} style={{ padding: "9px 10px", fontWeight: j === 0 ? 600 : 400, color: "#374151" }}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={body}>
          어느 쪽을 쓸지 헷갈리면 아래 FAQ에서 확인하거나 고용센터(1350)에 물어보면 내 상황에 맞는 답을 바로 알 수 있어요.
        </p>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          업무분담자에게 얼마를 줘야 하는지, 대체인력지원금과 같이 받을 수 있는지 — 실제로 많이 막히는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지금 바로 신청하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>고용24에서 온라인 신청 가능해요. 3개월 단위 신청 타이밍을 달력에 미리 표시해두세요.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.work24.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 고용24 신청하기</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률·정책 정보 제공을 목적으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있어요. 구체적인 상황은 고용노동부 고객상담센터(1350)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
