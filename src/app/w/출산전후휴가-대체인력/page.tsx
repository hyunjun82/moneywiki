"use client";
import { useState } from "react";

// ─── 2026년 기준
// 출산전후휴가 대체인력지원금: 우선지원대상기업, 30인 미만 월 140만원 / 30인 이상 월 130만원 (2026년 기준)
// 출산전후휴가 → 육아휴직 연속 시: 출산전후휴가 시작일 전 2개월부터 채용한 대체인력으로 육아휴직까지 계속 사용 가능
// 동시 신청: 출산전후휴가 + 육아휴직 통합 신청 가능 (2025.1.1.부터)
// 대체인력 지원금 기간: 인수인계(2개월) + 출산전후휴가(90일) + 육아휴직 기간 + 복직 후 인수인계(1개월) 전체

const SIDEBAR_LINKS = [
  "출산전후휴가 대체인력 지원금",
  "출산전후휴가 육아휴직 연속 신청",
  "육아휴직 대체인력 지원금",
  "우선지원대상기업 해당 여부",
  "출산전후휴가 기간·급여",
  "출산전후휴가 급여 상한액",
  "파견 vs 직고용 대체인력",
  "업무분담지원금 신청",
  "남성 육아휴직 인센티브",
  "6+6 부모육아휴직 금액",
  "단기 육아휴직 방학 활용",
  "육아기 근로시간 단축 대체인력",
  "출산전후휴가 신청 서류",
  "배우자 출산휴가 20일",
  "고용24 사업주 신청",
  "육아휴직 자동 승인",
  "육아휴직 복직 거부 구제",
  "출산 후 해고 신고",
  "고용노동부 장려금 전화",
  "중소기업 모성보호 지원",
];

const HUB_LINKS = [
  { title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차", desc: "출산전후휴가 → 육아휴직 연속 시 동일 대체인력 계속 지원", href: "#" },
  { title: "파견 vs 직고용 대체인력 | 어느 쪽이 지원금에 유리한가", desc: "출산전후휴가도 파견 가능 (절대금지 업무 외)", href: "#" },
  { title: "6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산", desc: "출산전후휴가 이후 바로 6+6 육아휴직 연계 가능", href: "#" },
  { title: "대체인력 지원금 대상 조건 | 우선지원대상기업 해당 여부 확인", desc: "업종별 상시근로자 기준과 온라인 확인 방법", href: "#" },
];

const TIMELINE_DATA = [
  { label: "인수인계 기간", period: "최대 2개월", support: "월 140만원\n(30인 미만)", note: "출산전후휴가 시작일 전 2개월부터" },
  { label: "출산전후휴가", period: "90일 (다태아 120일)", support: "월 140만원\n(30인 미만)", note: "3개월 단위 신청" },
  { label: "육아휴직", period: "최대 1년 6개월", support: "월 140만원\n(30인 미만)", note: "동일 대체인력 계속 가능" },
  { label: "복직 후 인수인계", period: "최대 1개월", support: "동일 지원", note: "2026년 신설" },
];

const FAQS = [
  { urgent: true, q: "출산전후휴가에서 바로 육아휴직으로 넘어가면 대체인력을 다시 채용해야 하나요?", a: "아니요. 출산전후휴가 시작일 전 2개월 이내부터 채용한 대체인력이라면 출산전후휴가 → 육아휴직으로 연속 이어지더라도 동일 대체인력을 계속 사용할 수 있어요. 대체인력지원금도 끊기지 않고 전체 기간에 대해 지급돼요. 새로 채용할 필요 없어요." },
  { urgent: true, q: "출산전후휴가와 육아휴직을 동시에 신청할 수 있나요?", a: "네, 2025년 1월 1일부터 출산전후휴가와 육아휴직을 동시에 통합 신청할 수 있어요. 고용24에서 한 번에 신청 가능해요. 동시 신청 시 사업주가 14일 이내 응답하지 않으면 육아휴직도 자동 승인돼요." },
  { urgent: false, q: "출산전후휴가만 주고 육아휴직은 안 줄 때도 대체인력지원금을 받을 수 있나요?", a: "받을 수 있어요. 출산전후휴가만으로도 30일 이상 부여하고 대체인력을 채용했다면 지원금 대상이에요. 육아휴직까지 연속으로 사용할 경우 지원금 기간이 더 길어져요." },
  { urgent: false, q: "출산전후휴가 대체인력지원금의 지급 방식이 달라졌나요?", a: "2026년 개정으로 사후지급 제도가 폐지됐어요. 기존에는 50%를 복직 후 6개월 이상 고용 조건으로 사후 지급했는데, 이제는 대체인력 근무 기간 전액을 선지급해요. 3개월 단위 신청 구조는 유지돼요." },
  { urgent: false, q: "출산전후휴가 급여 상한액도 올랐나요?", a: "네, 2026년 1월 1일부터 출산전후휴가 급여 상한액이 월 210만원에서 220만원으로 인상됐어요. 단태아 기준 총 90일이면 총 660만원 한도예요. 배우자 출산휴가 급여도 1,607,650원에서 1,684,210원으로 인상됐어요." },
  { urgent: false, q: "출산전후휴가 대체인력도 파견을 쓸 수 있나요?", a: "네, 파견법상 절대금지 업무(제조직접생산, 건설작업, 유해·위험업무 등)를 제외한 모든 업무에 파견 대체인력을 쓸 수 있어요. 파견인 경우 파견계약서와 대가 지급내역을 추가 서류로 제출해야 해요." },
  { urgent: false, q: "유산·사산휴가도 대체인력지원금 대상인가요?", a: "네, 대상이에요. 출산전후휴가, 유산·사산 휴가, 육아휴직, 육아기 근로시간 단축 모두 대체인력지원금 대상이에요. 유산·사산휴가의 경우 임신기간에 따라 휴가 기간이 다르고(10일~90일), 30일 이상이어야 지원금 대상이에요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "근로기준법 제74조 — 출산전후휴가", url: "https://www.law.go.kr/" },
    { label: "고용보험법 시행령 제29조제1항제3호 — 대체인력지원금", url: "https://www.law.go.kr/" },
    { label: "2026년 개정 — 대체인력지원금 기업규모별 차등 및 사후지급 폐지", url: "https://www.gworkingmom.net/about/notices/490" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 출산육아기 고용안정장려금", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1379&ccfNo=1&cciNo=2&cnpClsNo=1" },
    { label: "서남권직장맘지원센터 — 대체인력지원금 요건·서류", url: "https://gworkingmom.net/businesses/business/3" },
    { label: "고용24 — 출산육아기 대체인력지원금 제도 안내", url: "https://www.work24.go.kr" },
    { label: "정책브리핑 — 2026년 달라지는 출산·육아휴직 제도", url: "https://www.newspim.com/news/view/20251230001069" },
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
    continuous: { title: "출산전후휴가 후 바로 육아휴직 들어간다면", color: G, bg: GL, text: "같은 대체인력을 계속 써도 돼요. 출산전후휴가 시작일 전 2개월 이내 채용한 대체인력이면 육아휴직까지 이어서 지원금이 나와요. 고용24에서 통합 신청도 가능해요." },
    first: { title: "처음 신청한다면", color: "#7C3AED", bg: "#F5F3FF", text: "우선지원대상기업 여부부터 확인하세요. 출산전후휴가 시작일 전 2개월 이내부터 대체인력을 채용하고, 고용24에서 지원금을 신청하면 돼요. 출산전후휴가 시작 후 30일이 지나면 첫 신청이 가능해요." },
    docs: { title: "서류 준비가 막힌다면", color: "#C2410C", bg: "#FFF7ED", text: "필수 서류: 출산전후휴가 실시 증명 서류 + 대체인력 근로계약서 + 월별 임금대장. 파견인 경우 파견계약서 + 파견대가 지급내역 추가. 고용24 서식자료실에서 신청서 다운로드 가능해요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ id: "continuous", label: "출산전후휴가 후 육아휴직까지 연속으로 써요." }, { id: "first", label: "처음 신청하려고 해요." }, { id: "docs", label: "서류 준비를 어디서부터 해야 할지 모르겠어요." }].map(item => (
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

function Timeline() {
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
        {TIMELINE_DATA.map((item, i) => (
          <div key={i} style={{ flex: 1, minWidth: 140, border: `1px solid ${i === 0 ? "#FED7AA" : G}`, borderRadius: 8, padding: "12px 14px", background: i === 0 ? "#FFF7ED" : GL }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "#C2410C" : GD, margin: "0 0 4px" }}>{item.label}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{item.period}</p>
            <p style={{ fontSize: 12, color: G, fontWeight: 700, whiteSpace: "pre-line", margin: "0 0 4px" }}>{item.support}</p>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{item.note}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>※ 지원금은 30인 미만 사업장 기준. 30인 이상은 월 130만원. 임금의 80% 한도.</p>
    </div>
  );
}

function DocTable() {
  const docs = [
    { name: "출산육아기고용안정장려금(대체인력지원금) 지급신청서", required: true, where: "고용24 서식자료실" },
    { name: "출산전후휴가 실시 증명 서류 사본", required: true, where: "인사발령장, 확인서 등" },
    { name: "대체인력 근로계약서 사본", required: true, where: "회사 보관" },
    { name: "월별 임금대장 사본", required: true, where: "각 월 지급 내역" },
    { name: "파견 대체인력: 파견계약서 + 대가 지급내역", required: false, where: "파견 이용 시만 해당" },
  ];
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", margin: "12px 0 1.2rem" }}>
      {docs.map((doc, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 14px", borderBottom: i < docs.length - 1 ? "1px solid #f3f4f6" : "none", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: doc.required ? GL : "#f3f4f6", color: doc.required ? GD : "#9ca3af", flexShrink: 0, alignSelf: "flex-start", marginTop: 2 }}>
            {doc.required ? "필수" : "해당 시"}
          </span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: "0 0 2px" }}>{doc.name}</p>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{doc.where}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Steps() {
  const steps = [
    { title: "출산전후휴가 시작일 전 2개월 이내 대체인력 채용", desc: "출산전후휴가 시작일 전 2개월이 되는 날부터 채용한 대체인력만 지원 대상이에요. 예: 출산전후휴가 시작이 7월 1일이면, 5월 1일 이후 채용한 대체인력." },
    { title: "출산전후휴가 + 육아휴직 동시 신청 (선택)", desc: "고용24에서 출산전후휴가와 육아휴직을 동시에 통합 신청할 수 있어요. 사업주 14일 이내 미응답 시 자동 승인.", link: { label: "work24.go.kr", url: "https://www.work24.go.kr" } },
    { title: "출산전후휴가 시작 후 30일 경과 시 첫 신청", desc: "인수인계 기간(2개월)에 해당하는 지원금은 출산전후휴가 시작 후 30일이 지나면 신청 가능해요. 이후 3개월마다 신청해요." },
    { title: "육아휴직으로 연속 시 추가 신청", desc: "동일 대체인력이 출산전후휴가→육아휴직으로 이어질 경우 별도 채용 없이 그대로 신청을 이어가면 돼요." },
    { title: "복직 후 인수인계 기간 마지막 신청", desc: "2026년부터 복직 후 1개월 인수인계 기간까지 지원금이 나와요. 복직 후 1개월이 지나면 마지막 지원금을 신청하면 돼요.", tel: { label: "고용24 신청", url: "https://www.work24.go.kr" } },
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 출산전후휴가 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
          </a>
        ))}
      </div>
      <a href="#" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>출산·육아휴직 관련 글 전체 보기 →</a>
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>출산·육아 사업주 지원금</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function MaternitySubstitutePage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>출산전후휴가 · 대체인력 · 사업주 지원금</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          출산전후휴가 대체인력 지원금 |<br />
          육아휴직과 동시 신청 가능한가
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          출산전후휴가 대체인력, 육아휴직으로 넘어갈 때 새로 채용해야 하나요?<br />
          <strong>아니요. 같은 대체인력을 그대로 쓰면 되고, 지원금도 끊기지 않아요.</strong><br />
          출산전후휴가 + 육아휴직 동시 신청도 2025년부터 가능해요. 이 두 가지가 핵심이에요.
        </p>

        <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 지금 상황별 즉시 확인</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>출산전후휴가 → 육아휴직 연속으로 간다면</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>대체인력 새로 안 뽑아도 돼요. 출산전후휴가 시작일 전 2개월 이내 채용한 대체인력이면 육아휴직 끝날 때까지 동일 대체인력 계속 쓸 수 있어요. 지원금도 끊기지 않고 전체 기간 나와요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>출산전후휴가와 육아휴직 동시에 신청할 수 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>가능해요. 2025년 1월부터 고용24에서 한 번에 통합 신청돼요. 사업주가 14일 이내에 답하지 않으면 자동 승인이에요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>대체인력 지원금, 언제 얼마 받나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>30인 미만 월 140만원, 30인 이상 130만원. 인수인계 기간(최대 2개월) + 출산전후휴가 90일 + 육아휴직 기간 + 복직 후 인수인계 1개월까지 전부 나와요.</p>
            </div>
          </div>
        </div>

        <H2>출산전후휴가 대체인력 지원금 지급 기간</H2>
        <p style={body}>
          "출산전후휴가 때 뽑은 대체인력, 육아휴직으로 이어지면 지원금이 언제까지 나오나요?" — 가장 많이 묻는 질문이에요.<br />
          인수인계부터 복직 후 인계까지, 전 기간이 지원 대상이에요. 아래 타임라인에서 내 상황이 몇 개월인지 확인하세요.
        </p>
        <Bdg>출산전후휴가 ~ 육아휴직 전체 지원금 타임라인</Bdg>
        <Timeline />
        <GreenBox title="이것만 기억해요">
          ① 출산전후휴가 시작일 전 2개월부터 채용 → 인수인계 포함 지원<br />
          ② 출산전후휴가→육아휴직 연속 시 동일 대체인력 계속 사용 가능 — 새로 채용 불필요<br />
          ③ 2025년부터 출산전후휴가 + 육아휴직 통합 신청 가능<br />
          ④ 2026년부터 복직 후 인수인계 1개월도 지원
        </GreenBox>
        <p style={body}>
          예를 들어 출산전후휴가 90일 + 육아휴직 12개월이라면, 인수인계 2개월 포함해서 최대 17개월치 지원금이 나와요. 30인 미만이면 월 140만원 × 17 = 최대 2,380만원이에요.<br />
          타임라인 확인됐으면 아래에서 서류를 체크하고 바로 신청하면 돼요.
        </p>

        <Divider />

        <H2>출산전후휴가 대체인력 지원금 신청 서류</H2>
        <p style={body}>
          서류 누락이 반려의 90%예요. 미리 체크해두면 신청 당일에 막히는 일이 없어요.<br />
          월별 임금대장이 가장 자주 빠져요. 한 달이라도 없으면 해당 기간 지원금을 못 받아요. 지금 바로 챙겨두세요.
        </p>
        <Bdg>제출 서류</Bdg>
        <DocTable />
        <p style={body}>
          서류가 다 준비됐으면 출산전후휴가 시작 후 30일이 지나면 첫 신청이 가능해요. 인수인계 기간(출산전후휴가 전 2개월) 지원금은 이 시점에 한꺼번에 신청해요.
        </p>

        <Divider />

        <H2>출산전후휴가 육아휴직 동시 신청 방법과 절차</H2>
        <p style={body}>
          출산전후휴가 시작 전부터 준비해야 놓치는 게 없어요.<br />
          2025년부터 출산전후휴가와 육아휴직을 고용24에서 한 번에 통합 신청할 수 있어요. 사업주가 14일 이내에 응답하지 않으면 자동 승인이에요.
        </p>
        <Bdg>신청 절차</Bdg>
        <Steps />
        <p style={body}>
          지원금 신청 기한은 출산전후휴가·육아휴직 종료 후 12개월 이내예요. 첫 신청을 놓쳐도 이 기한 안에 소급 신청 가능해요.
        </p>

        <HubLinks />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          출산전후휴가에서 육아휴직으로 연속 갈 때 대체인력을 다시 채용해야 하는지, 동시 신청이 가능한지 — 실제로 가장 많이 묻는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지금 바로 신청하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            고용24에서 출산전후휴가·육아휴직 통합 신청 및 대체인력지원금 신청이 가능해요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.work24.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 고용24 신청하기</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있어요. 구체적인 상황은 고용노동부(1350)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
