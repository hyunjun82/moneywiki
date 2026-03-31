"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 고용보험법 시행령 제12조 별표1 (2026.1.2. 시행)
// 제조업 500인 이하 / 광업·건설업·운수업·정보통신 등 300인 이하 / 도소매·숙박음식 200인 이하 / 수리기타서비스 100인 이하
// 중소기업기본법상 중소기업이면 상시근로자 초과해도 해당
// 규모 초과 시 다음연도부터 5년간 자격 유지

const SIDEBAR_LINKS = [
  "우선지원대상기업 해당 여부 확인",
  "고용산재보험 토탈서비스 조회",
  "상시근로자 수 계산 방법",
  "육아휴직 대체인력 지원금 조건",
  "업무분담지원금 신청 방법",
  "고용안정장려금 종류",
  "대체인력 지원금 중복 수급",
  "육아휴직 사업주 지원금",
  "남성 육아휴직 인센티브",
  "출산전후휴가 지원금",
  "고용유지지원금 신청 방법",
  "워라밸일자리장려금 조건",
  "육아기 근로시간 단축 지원금",
  "중소기업 고용지원금 종류",
  "고용센터 장려금 문의",
  "고용24 사업주 신청",
  "청년 채용 장려금 조건",
  "정규직 전환 지원금",
  "장애인 고용 장려금",
  "고령자 고용 지원금",
];

const HUB_LINKS = [
  { title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차", desc: "30인 미만 월 140만원 / 30인 이상 130만원 (2026년 기준)", href: "#" },
  { title: "업무분담지원금 신청 방법 | 대체인력 없이 월 20만원 받는 방법", desc: "2026년 30인 미만 월 60만원으로 인상", href: "#" },
  { title: "파견 vs 직고용 대체인력 | 어느 쪽이 지원금에 유리한가", desc: "2025년부터 파견도 직고용과 동일 지원", href: "#" },
  { title: "고용안정장려금 종류 | 사업주가 받을 수 있는 지원금 목록", desc: "육아휴직·대체인력·업무분담 지원금 한눈에 비교", href: "#" },
];

const INDUSTRY_TABLE = [
  { industry: "제조업", code: "C", limit: "500인 이하" },
  { industry: "광업", code: "B", limit: "300인 이하" },
  { industry: "건설업", code: "F", limit: "300인 이하" },
  { industry: "운수·창고업", code: "H", limit: "300인 이하" },
  { industry: "정보통신업", code: "J", limit: "300인 이하" },
  { industry: "금융·보험업", code: "K", limit: "300인 이하" },
  { industry: "전문·과학·기술", code: "M", limit: "300인 이하" },
  { industry: "사업시설관리·지원", code: "N", limit: "300인 이하" },
  { industry: "도소매업", code: "G", limit: "200인 이하" },
  { industry: "숙박·음식점업", code: "I", limit: "200인 이하" },
  { industry: "보건·사회복지", code: "Q", limit: "300인 이하" },
  { industry: "예술·스포츠·여가", code: "R", limit: "200인 이하" },
  { industry: "수리 및 기타서비스", code: "S", limit: "100인 이하" },
];

const FAQS = [
  { urgent: true, q: "우리 회사가 해당하는지 직접 확인하는 방법이 있나요?", a: "고용산재보험 토탈서비스(total.kcomwel.or.kr)에 사업장 명의로 로그인 후 '정보조회 → 사업장 총괄카드 조회'에서 사업자등록번호를 입력하면 '대규모기업' 항목이 나와요. 이 항목이 '비해당'으로 표시되면 우선지원대상기업이에요. 고용24 마이페이지에서도 확인할 수 있어요. 전화로 확인하려면 고용노동부 1350 또는 근로복지공단 1588-0075로 문의하면 돼요." },
  { urgent: true, q: "직원 수가 기준을 초과했는데, 아직 지원금 받을 수 있나요?", a: "규모가 커져 기준을 초과하게 된 경우라도 그 사유가 발생한 연도 다음 연도부터 5년간은 우선지원대상기업 자격을 유지해요. 예를 들어 2024년에 초과했다면 2025~2029년까지 5년간 그대로 지원금을 받을 수 있어요. 단, 상호출자제한기업집단(대기업 계열사)에 속하게 되면 즉시 자격이 박탈돼요." },
  { urgent: true, q: "사업장이 여러 개인데, 각각 판단하나요 아니면 합산하나요?", a: "하나의 사업주가 여러 사업을 경영하는 경우, 상시근로자 수가 가장 많은 산업을 기준으로 전체 사업장 인원을 합산해서 판단해요. 예를 들어 제조업 공장 1개(150명) + 유통사업장 1개(60명)를 운영한다면 제조업 기준으로 210명으로 계산해요. 제조업 500인 이하이므로 우선지원대상기업에 해당돼요." },
  { urgent: false, q: "관계기업(자회사·모회사)은 어떻게 계산하나요?", a: "주식 또는 출자지분의 50%를 초과해 소유하는 관계회사가 있다면, 그 관계회사의 상시근로자 수를 합산해야 해요. 투자 관계와 경영 지배 관계를 혼동하지 않도록 주의하세요. 정확한 계산이 어려우면 고용센터 또는 노무사에게 확인하는 게 안전해요." },
  { urgent: false, q: "파트타임 직원도 상시근로자 수에 포함되나요?", a: "월 소정근로시간 60시간 미만 단시간 근로자는 상시근로자에서 제외돼요. 월 60시간 이상인 단시간 근로자는 0.5명으로 산정해요. 상시근로자 수는 전년도 매월 말일 기준 인원의 평균으로 계산해요. 예: 1~10월 말일 100명, 11~12월 말일 120명 → (100×10 + 120×2) ÷ 12 = 103.3명." },
  { urgent: false, q: "중소기업기본법상 중소기업이면 무조건 해당되나요?", a: "네, 상시근로자 수 기준을 초과하더라도 중소기업기본법 제2조에 따른 중소기업에 해당하면 우선지원대상기업으로 봐요. 단, 독점규제법에 따라 지정된 상호출자제한기업집단에 속하는 회사는 제외돼요." },
  { urgent: false, q: "우선지원대상기업이 되면 자동으로 지원금이 나오나요?", a: "아니요. 우선지원대상기업 여부는 지원금을 신청할 자격이 되는지의 조건이에요. 지원금을 받으려면 별도 요건을 갖추고 고용24 또는 관할 고용센터에 직접 신청해야 해요. 우선지원대상기업 등록 자체에는 별도 신청·승인 절차가 없어요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "고용보험법 제19조제2항 — 우선지원대상기업 정의", url: "https://www.law.go.kr/" },
    { label: "고용보험법 시행령 제12조 + 별표1 — 업종별 기준 (2026.1.2. 시행)", url: "https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lspttninfSeq=106053" },
    { label: "중소기업기본법 제2조 — 중소기업 기준", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "고용산재보험 토탈서비스 — 우선지원대상기업 자가 조회", url: "https://total.kcomwel.or.kr" },
    { label: "고용24 — 사업주 장려금 신청", url: "https://www.work24.go.kr" },
    { label: "고용노동부 민원마당 — 우선지원대상기업 판단 방법", url: "https://www.moel.go.kr" },
  ]},
];

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: { children: React.ReactNode }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: { children: React.ReactNode }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>;
}
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>;
}

function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    check: { title: "해당 여부 확인하려면", color: G, bg: GL,
      text: "고용산재보험 토탈서비스(total.kcomwel.or.kr)에서 사업장 명의로 로그인 후 '사업장 총괄카드 조회'에서 대규모기업 항목이 '비해당'이면 우선지원대상기업이에요. 또는 고용24 마이페이지에서도 확인 가능해요." },
    over: { title: "직원 수가 기준을 넘었는데", color: "#7C3AED", bg: "#F5F3FF",
      text: "초과한 연도 다음 연도부터 5년간 자격이 유지돼요. 규모 초과 후에도 당분간 지원금을 계속 받을 수 있어요. 단, 상호출자제한기업집단에 속하게 되면 즉시 자격이 없어져요." },
    sme: { title: "중소기업인데 직원 수 기준 초과했다면", color: "#C2410C", bg: "#FFF7ED",
      text: "중소기업기본법 제2조에 따른 중소기업에 해당하면 상시근로자 수가 업종 기준을 초과해도 우선지원대상기업으로 봐요. 중소기업 해당 여부는 중소벤처기업부 중소기업 확인서로 확인할 수 있어요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ id: "check", label: "우리 회사가 해당되는지 확인하고 싶어요." }, { id: "over", label: "직원이 늘어서 기준을 넘었어요." }, { id: "sme", label: "중소기업인데 직원 수가 많아요." }].map(item => (
          <button key={item.id} onClick={(_e: any) => setType(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
  const m = messages[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <strong style={{ fontSize: 14, color: m.color }}>{m.title}</strong>
        <button onClick={(_e: any) => setType(null)} style={{ fontSize: 11, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function IndustryTable() {
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: GL }}>
            {["업종", "한국표준산업분류", "상시근로자 기준"].map(h => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INDUSTRY_TABLE.map((r: any, i: any) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "8px 10px", fontWeight: 600, color: "#111" }}>{r.industry}</td>
              <td style={{ padding: "8px 10px", color: "#9ca3af" }}>{r.code}</td>
              <td style={{ padding: "8px 10px", color: G, fontWeight: 700 }}>{r.limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>※ 위 기준은 주요 업종만 표시. 세부 업종은 고용보험법 시행령 별표1 참조. 중소기업기본법상 중소기업은 위 기준 초과 시에도 해당.</p>
    </div>
  );
}

function Checker() {
  const items = [
    { id: "a", text: "사업자등록번호와 사업장관리번호가 있어요 (고용산재보험 토탈서비스 조회 필수)" },
    { id: "b", text: "우리 업종의 상시근로자 기준을 확인했어요" },
    { id: "c", text: "전년도 매월 말일 기준 상시근로자 평균을 계산했어요" },
    { id: "d", text: "관계기업(지분 50% 초과 소유)이 있으면 합산했어요" },
    { id: "e", text: "월 소정근로시간 60시간 미만 단시간 근로자는 제외했어요" },
  ];
  const [checked, setChecked] = useState({});
  const toggle = id => setChecked(p => ({ ...p, [id]: !p[id] }));
  const count = Object.values(checked).filter(Boolean).length;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "16px 18px", margin: "12px 0 1.2rem" }}>
      {items.map(item => (
        <label key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}>
          <input type="checkbox" checked={!!checked[item.id]} onChange={(_e: any) => toggle(item.id)} style={{ marginTop: 3, accentColor: G, width: 15, height: 15, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{item.text}</span>
        </label>
      ))}
      <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 8, background: count === 5 ? GL : "#f9fafb", border: `1px solid ${count === 5 ? G : "#e5e7eb"}` }}>
        {count === 5
          ? <p style={{ fontSize: 13, color: GD, fontWeight: 700, margin: 0 }}>✓ 준비됐어요. 고용산재보험 토탈서비스에서 최종 확인하세요.</p>
          : <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>미체크 항목을 먼저 확인해보세요.</p>}
      </div>
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
          <button onClick={(_e: any) => toggle(i)} style={{ width: "100%", textAlign: "left", padding: "13px 4px", display: "flex", alignItems: "flex-start", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 사업주 지원금 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
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
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>사업주 지원금 관련 글</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function PriorityFirmPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>고용보험 · 사업주 지원금 · 장려금</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          대체인력 지원금 대상 조건 |<br />
          우선지원대상기업 해당 여부 확인
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          육아휴직 대체인력 지원금, 업무분담지원금 등 사업주 지원금 대부분이 우선지원대상기업에만 나와요.<br />
          <strong>우리 회사가 해당하는지 30초 만에 확인할 수 있어요.</strong>
        </p>

        <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 해당 여부 즉시 판단</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>가장 빠른 확인 방법</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>고용산재보험 토탈서비스(total.kcomwel.or.kr) → 사업장 총괄카드 조회 → '대규모기업' 항목이 <strong>'비해당'</strong>이면 우선지원대상기업이에요. 사업자등록번호만 있으면 30초면 돼요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>직원 수가 기준을 넘었는데 받을 수 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>기준 초과해도 두 가지 예외가 있어요. ① 중소기업기본법상 중소기업이면 해당 ② 기준 초과된 연도 다음 연도부터 5년간 자격 유지. 확신이 없으면 토탈서비스 조회가 가장 정확해요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>업종별 기준이 다른가요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>달라요. 제조업 500인 이하, 건설·운수·IT 등 300인 이하, 도소매·숙박 200인 이하, 기타서비스 100인 이하예요. 파트타임은 제외하거나 0.5명으로 계산하는 방식이라 생각보다 낮게 나와요.</p>
            </div>
          </div>
        </div>

        <H2>우선지원대상기업 대상 조건이란</H2>
        <p style={body}>
          고용보험법에서 정한 개념이에요. 업종별 상시근로자 수 기준을 충족하는 중·소규모 기업으로, 정부 고용 지원 사업에서 우선적으로 혜택을 받는 기업이에요.<br />
          별도 신청·승인 절차가 없어요. 기준에 해당하면 자동으로 해당돼요.
        </p>
        <GreenBox title="핵심 요약">
          ① 업종별 상시근로자 수 기준 충족 → 우선지원대상기업<br />
          ② 기준 초과해도 중소기업이면 해당<br />
          ③ 규모 초과 시 다음 연도부터 5년간 자격 유지<br />
          ④ 상호출자제한기업집단(대기업 계열) 제외
        </GreenBox>

        <Divider />

        <H2>우선지원대상기업 업종별 해당 여부 기준</H2>
        <p style={body}>
          업종에 따라 기준이 달라요. 아래 표에서 우리 회사 업종을 찾으면 돼요.<br />
          기준 안에 들어오면 우선지원대상기업이에요.<br />
          업종 구분이 애매하면 한국표준산업분류(통계청)에서 사업자등록증 업태·종목으로 확인할 수 있어요.
        </p>
        <Bdg>2026년 기준 업종별 상시근로자 기준</Bdg>
        <IndustryTable />
        <p style={body}>
          표 기준을 초과하더라도 두 가지 예외가 있어요. 중소기업기본법상 중소기업이거나, 기준을 초과하게 된 연도 다음 연도부터 5년간은 자격이 유지돼요. 불확실하면 아래에서 직접 조회해보세요.
        </p>

        <Divider />

        <H2>우선지원대상기업 해당 여부 확인 방법</H2>
        <p style={body}>
          직접 계산하지 않아도 돼요. 온라인으로 30초 만에 확인할 수 있어요.<br />
          사업장관리번호 또는 사업자등록번호만 있으면 바로 조회 가능해요.
        </p>
        <BorderBox title="온라인 확인 경로">
          고용산재보험 토탈서비스(total.kcomwel.or.kr)<br />
          → 사업장 명의 로그인<br />
          → 정보조회 → 사업장 총괄카드 조회(20101)<br />
          → 사업자등록번호 입력 후 조회<br />
          → <strong>'대규모기업' 항목이 '비해당'</strong>이면 우선지원대상기업이에요<br /><br />
          고용24(work24.go.kr) 마이페이지에서도 확인 가능해요.
        </BorderBox>
        <Bdg>조회 전 확인 체크리스트</Bdg>
        <Checker />
        <p style={body}>
          조회 결과 우선지원대상기업이 맞으면 대체인력지원금·업무분담지원금·육아휴직지원금을 신청할 자격이 생겨요. 해당이 안 된다고 나왔는데 5년 유예 기간이라면 고용센터(1350)에 전화해서 이력을 확인해보세요.
        </p>

        <HubLinks />

        <H2>우선지원대상기업 확인에 필요한 상시근로자 수 계산</H2>
        <p style={body}>
          "직원이 몇 명이에요?" 하고 단순 셀 수 없어요.<br />
          법령에서 정한 방식대로 계산해야 해요. 파트타임·단시간 직원을 그냥 1명으로 세면 기준을 초과해서 해당 안 된다고 잘못 판단하는 경우가 있어요.
        </p>
        <BorderBox title="상시근로자 수 계산 방법">
          전년도 매월 말일 기준 상시근로자 수를 모두 더한 뒤 12로 나눠요.<br />
          예시: 1~10월 말일 100명, 11~12월 말일 120명 → (100×10 + 120×2) ÷ 12 = 103.3명<br /><br />
          <strong>이런 직원은 제외하거나 0.5명으로 계산해요</strong><br />
          ▪ 월 소정근로시간 60시간 미만 → 제외<br />
          ▪ 월 소정근로시간 60시간 이상 단시간 → 0.5명<br />
          ▪ 복수 사업장 운영 시 → 가장 큰 업종 기준으로 합산
        </BorderBox>
        <p style={body}>
          계산이 복잡하거나 관계기업(지분 50% 초과 자회사 등)이 있으면 합산 대상이 달라질 수 있어요. 이런 경우엔 직접 계산보다 토탈서비스 조회 결과를 신뢰하는 게 더 정확해요.
        </p>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "직원 수가 기준을 넘었는데 아직 받을 수 있나요", "여러 사업장이 있으면 합산하나요" — 실제로 많이 막히는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>해당 여부 직접 확인하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            온라인 조회가 가장 확실해요.<br />
            헷갈리면 고용노동부 1350에 전화하면 바로 확인해줘요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://total.kcomwel.or.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 토탈서비스 조회</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률·정책 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 개별 사안에 따라 결과가 달라질 수 있어요. 구체적인 상황은 고용노동부 고객상담센터(1350)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
