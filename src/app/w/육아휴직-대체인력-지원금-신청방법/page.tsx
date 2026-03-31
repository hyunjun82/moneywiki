"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 2026년 기준 우선지원대상기업 지원금 (고용보험법 시행령 제29조, 고용24 공식 자료)
// 대체인력지원금: 30인 미만 월 140만원 / 30인 이상 월 130만원 (2026.1.1. 시행)
// 업무분담지원금: 30인 미만 월 60만원 / 30인 이상 월 40만원 (2026.1.1. 시행)
// 육아휴직지원금 일반: 월 30만원 / 특례(만 12개월 이내): 첫 3개월 월 100만원

const SIDEBAR_LINKS = [
  "육아휴직 대체인력 지원금 대상 조건",
  "우선지원대상기업 해당 여부 확인",
  "업무분담지원금 신청 방법",
  "대체인력 파견 vs 직고용 비교",
  "남성 육아휴직 인센티브 조건",
  "육아휴직 지원금 신청 기간",
  "출산전후휴가 대체인력 지원금",
  "육아기 근로시간 단축 대체인력",
  "육아휴직 거부 신고 방법",
  "고용24 사업주 지원금 신청",
  "육아휴직 복직 거부 구제 방법",
  "6+6 부모육아휴직제 금액 계산",
  "단기 육아휴직 신청 방법",
  "육아휴직 급여 계산 방법",
  "임신 중 육아휴직 조건",
  "육아기 단축근무 신청 방법",
  "실업급여 수급 중 육아휴직",
  "육아휴직 중 건강보험료 납부",
  "사업주 출산 지원 세액공제",
  "고용센터 장려금 문의 전화",
];

const HUB_LINKS = [
  { title: "대체인력 지원금 대상 조건 | 우선지원대상기업 해당 여부 확인", desc: "업종별·규모별 우선지원대상기업 기준 + 자가진단", href: "#" },
  { title: "업무분담 지원금 신청 방법 | 대체인력 없이 월 20만원 받는 방법", desc: "2026년 개정 기준 30인 미만 월 60만원으로 인상", href: "#" },
  { title: "파견 vs 직고용 대체인력 | 어느 쪽이 지원금에 유리한가", desc: "직고용·파견 모두 30인 미만 월 140만원 / 30인 이상 130만원", href: "#" },
  { title: "남성 육아휴직 인센티브 | 중소기업 월 10만원 추가 지원", desc: "처음 허용한 세 번째 사례까지 월 10만원 추가", href: "#" },
];

const DOCS = [
  { name: "출산육아기고용안정장려금(대체인력지원금) 지급신청서", required: true, where: "고용24(work24.go.kr) 서식자료실" },
  { name: "출산전후휴가·육아휴직 실시 증명 서류", required: true, where: "확인서, 인사발령장 등 사본 1부" },
  { name: "대체인력 근로계약서 사본", required: true, where: "회사 보관 계약서" },
  { name: "월별 임금대장 사본", required: true, where: "각 월 지급 내역" },
  { name: "파견 대체인력의 경우 근로자파견계약서 + 대가 지급내역", required: false, where: "파견근로자 사용 시만 해당" },
  { name: "사업자등록증", required: true, where: "세무서 또는 국세청 홈택스" },
];

const STEPS = [
  {
    title: "대체인력 채용 또는 파견 사용",
    desc: "육아휴직 시작일 전 2개월 이내부터 채용 가능해요. 직고용·파견 모두 지원 대상이에요. 채용 후 30일 이상 계속 고용해야 지원금이 나와요.",
    tip: "30인 미만 기준 인수인계 기간도 월 140만원 동일 지원",
  },
  {
    title: "고용24 또는 관할 고용센터에 신청서 제출",
    desc: "온라인은 고용24(work24.go.kr)에서 신청 가능해요. 오프라인은 사업장 관할 고용센터에 서류를 직접 제출해요.",
    link: { label: "work24.go.kr", url: "https://www.work24.go.kr" },
    tel: { label: "고용노동부 고객상담센터 1350", url: "tel:1350" },
  },
  {
    title: "3개월 단위로 분할 신청",
    desc: "지원금의 50%는 육아휴직 시작 후 3개월마다 신청해요. 나머지 50%는 원직원 복직 후 1개월 이상 계속 고용한 경우에 한꺼번에 신청해요.",
    tip: "신청 기간: 육아휴직 시작 후 30일 경과 ~ 종료 후 12개월 이내",
  },
  {
    title: "지원금 지급",
    desc: "적격 판정 후 지원금이 사업주 계좌로 지급돼요. 대체인력 임금의 80%를 한도로 하며, 30인 미만 월 140만원, 30인 이상 130만원 이내에서 지급돼요.",
    tip: "임금 80% 한도 예시: 대체인력 월급 100만원 → 지원금 80만원",
  },
];

const CHECKLIST = [
  "우선지원대상기업 해당 여부 확인 (고용24 모의계산 또는 고용센터 문의)",
  "육아휴직 30일 이상 부여 사실 확인 (확인서·인사발령장 발급)",
  "대체인력 고용 또는 파견 계약 체결 (30일 이상 계속 고용 필수)",
  "대체인력 채용 전 3개월~고용 후 1년간 다른 근로자 고용조정 없을 것",
  "근로계약서·월별 임금대장 보관",
  "고용24 신청서 작성 (서식자료실에서 다운로드)",
  "3개월 단위 신청 일정 달력에 기록",
];

const FAQS = [
  { urgent: true, q: "파견업체에서 쓰는 대체인력도 지원금 받을 수 있나요?", a: "네, 받을 수 있어요. 2025년 1월 1일부터 직고용뿐 아니라 파견근로자를 대체인력으로 사용한 경우도 동일하게 30인 미만 월 140만원, 30인 이상 월 130만원 지원돼요. 파견근로자파견계약서와 대가 지급내역을 추가로 제출하면 돼요." },
  { urgent: true, q: "우선지원대상기업이 아니면 아예 못 받나요?", a: "대체인력지원금·업무분담지원금·육아휴직지원금은 모두 우선지원대상기업 사업주에게만 지원해요. 우선지원대상기업 해당 여부는 업종별 상시근로자 수 기준으로 판단해요. 제조업 500인 이하, 건설업 300인 이하, 도소매·서비스업 100인 이하가 기본 기준이에요. 관할 고용센터(1350)에 전화하면 즉시 확인할 수 있어요." },
  { urgent: true, q: "육아휴직 시작하고 나서야 대체인력을 구했어요. 지원금 못 받나요?", a: "받을 수 있어요. 육아휴직 시작일 전 2개월부터 고용한 경우가 지원 대상이지만, 시작 후에 채용해도 30일 이상 계속 고용하면 지원금이 나와요. 단, 지원금은 채용 후 30일이 지난 시점부터 계산돼요. 육아휴직 종료 후 12개월 이내에만 신청하면 돼요." },
  { urgent: false, q: "육아휴직 지원금(특례)과 대체인력지원금을 동시에 받을 수 있나요?", a: "자녀 만 12개월 이내 특례(첫 3개월 월 100만원)를 선택하면 해당 육아휴직 전체 기간에 대한 대체인력지원금이 제한돼요. 일반 육아휴직 지원금(월 30만원)을 선택하면 대체인력지원금과 중복 수급이 가능해요. 어느 쪽이 유리한지는 고용센터에서 비교해볼 수 있어요." },
  { urgent: false, q: "대체인력이 중간에 퇴사하면 어떻게 되나요?", a: "대체인력이 퇴사하면 퇴사한 날까지 고용한 기간에 대해서만 지원금을 받아요. 30일 미만 고용 시에는 아예 지원이 안 돼요. 대체인력 퇴사 후 새 대체인력을 다시 채용하면 새 계약 기준으로 다시 지원 신청이 가능해요." },
  { urgent: false, q: "업무분담지원금은 2026년에 얼마나 올랐나요?", a: "2026년 1월 1일부터 30인 미만 사업장은 월 최대 60만원, 30인 이상은 월 최대 40만원으로 인상됐어요. 이전에는 월 20만원이었어요. 업무분담자 지정 증빙서류 제출 의무도 폐지됐어요. 육아기 근로시간 단축에는 적용되지 않고 종전 월 20만원이 유지돼요." },
  { urgent: false, q: "신청 기한을 넘기면 어떻게 되나요?", a: "대체인력지원금은 육아휴직 종료 후 12개월 이내에 최초 신청이 있어야 해요. 이 기간을 넘기면 지원금을 받을 수 없어요. 3개월 단위로 신청하는 첫 번째 타이밍을 놓쳐도 이후 기간에 몰아서 신청할 수 있으니, 종료 후 12개월 이내만 지키면 돼요." },
  { urgent: false, q: "고용조정 요건이란 게 뭔가요?", a: "대체인력을 채용하기 전 3개월부터 채용 후 1년까지 다른 근로자(새로 고용한 대체인력보다 나중에 고용된 근로자 제외)를 고용조정으로 이직시키면 안 돼요. 단, 근로자가 자기 사정으로 자진퇴사한 경우는 해당 없어요. 이 요건을 어기면 지원금 전액이 취소될 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "고용보험법 제23조 — 출산육아기 고용안정 장려금", url: "https://www.law.go.kr/lsInfoP.do?lsiSeq=225312" },
    { label: "고용보험법 시행령 제29조 — 대체인력지원금·업무분담지원금", url: "https://www.law.go.kr/" },
    { label: "남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "고용24 — 출산육아기 고용안정장려금 제도 안내", url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systClId=SC00000303" },
    { label: "보조금24 — 대체인력지원금 서비스 상세", url: "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/WII000001060" },
    { label: "찾기쉬운 생활법령 — 육아휴직 사업주 지원", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1380" },
    { label: "서울직장맘지원센터 — 2026년 개정 사업주 지원금 정리", url: "https://www.gworkingmom.net/about/notices/490" },
  ]},
];

// ─── 디자인 토큰
const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

// ─── 공통 UI
function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

// ─── 긴급 배너
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    new:    { title: "처음 신청하신다면", color: G, bg: GL,
      text: "우선지원대상기업 여부 먼저 확인하세요. 대체인력을 30일 이상 고용했다면 지금 바로 고용24(work24.go.kr)에서 신청 가능해요. 3개월 단위로 신청하는 구조라 첫 타이밍을 놓쳐도 육아휴직 종료 후 12개월 이내면 소급해서 받을 수 있어요." },
    reject: { title: "신청했다가 거절됐다면", color: "#DC2626", bg: "#FEF2F2",
      text: "가장 많은 거절 사유는 ① 우선지원대상기업 미해당 ② 고용조정 요건 위반(채용 전후 다른 직원 해고) ③ 30일 미만 고용이에요. 거절 통보서에 이유가 적혀 있어요. 고용조정 요건 위반이라면 이의신청이 어렵고, 나머지 사유는 관할 고용센터(1350)에 재확인 요청이 가능해요." },
    check:  { title: "지원금 종류를 비교하려면", color: "#7C3AED", bg: "#F5F3FF",
      text: "대체인력지원금(30인 미만 월 140만원/30인 이상 130만원) / 업무분담지원금(30인 미만 월 60만원) / 육아휴직지원금(월 30만원)을 중복 수급하는 경우도 있어요. 단, 육아휴직 특례(만 12개월 이내 첫 3개월 월 100만원)를 받으면 해당 휴직 전체 기간에 대해 대체인력지원금이 제한돼요." },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "new",    label: "대체인력 채용했어요. 처음 신청해요." },
          { id: "reject", label: "신청했다가 거절됐어요." },
          { id: "check",  label: "어떤 지원금 받을 수 있는지 확인하고 싶어요." },
        ].map((item: any) => (
          <button key={item.id} onClick={(_e: any) => setType(item.id)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
            borderRadius: 8, border: "1px solid #FED7AA", background: "#fff",
            fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left",
          }}>
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

// ─── 지원금 비교표
function SupportTable() {
  const rows = [
    { name: "대체인력지원금", amount: "30인 미만 월 140만원\n30인 이상 월 130만원", target: "대체인력 고용·파견 사용", note: "임금 80% 한도" },
    { name: "업무분담지원금", amount: "30인 미만 월 60만원\n30인 이상 월 40만원", target: "업무 분담자에게 금전 지원한 사업주", note: "2026.1.1. 기준" },
    { name: "육아휴직지원금(일반)", amount: "월 30만원", target: "우선지원대상기업 사업주", note: "대체인력지원금 중복 가능" },
    { name: "육아휴직지원금(특례)", amount: "첫 3개월 월 100만원", target: "자녀 만 12개월 이내", note: "대체인력지원금 중복 불가" },
    { name: "남성 육아휴직 인센티브", amount: "월 10만원 추가", target: "남성 육아휴직 처음 허용한 3번째 사례까지", note: "대체인력지원금 중복 가능" },
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: GL }}>
            {["지원금 종류", "월 지원액", "지원 대상", "비고"].map(h => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}`, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any, i: any) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "#111" }}>{r.name}</td>
              <td style={{ padding: "9px 10px", color: G, fontWeight: 700, whiteSpace: "pre-line" }}>{r.amount}</td>
              <td style={{ padding: "9px 10px", color: "#374151" }}>{r.target}</td>
              <td style={{ padding: "9px 10px", color: "#9ca3af", fontSize: 12 }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── 자격 체커
function EligibilityChecker() {
  const items = [
    { id: "a", text: "우선지원대상기업 사업주예요 (제조업 500인 이하, 도소매·서비스업 100인 이하 등)" },
    { id: "b", text: "근로자에게 육아휴직·출산전후휴가·육아기근로시간단축을 30일 이상 부여했어요" },
    { id: "c", text: "새로 대체인력을 고용하거나 파견근로자를 대체인력으로 사용했어요" },
    { id: "d", text: "대체인력을 30일 이상 계속 고용(사용)했어요" },
    { id: "e", text: "채용 전 3개월~채용 후 1년간 다른 근로자를 고용조정으로 이직시키지 않았어요" },
  ];
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked(p => ({ ...p, [id]: !p[id] }));
  const count = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "16px 18px", margin: "12px 0 1.2rem" }}>
      {items.map(item => (
        <label key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}>
          <input type="checkbox" checked={!!checked[item.id]} onChange={(_e: any) => toggle(item.id)}
            style={{ marginTop: 3, accentColor: G, width: 15, height: 15, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{item.text}</span>
        </label>
      ))}
      <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 8,
        background: count === 5 ? GL : count >= 3 ? "#FFF7ED" : "#F9FAFB",
        border: `1px solid ${count === 5 ? G : count >= 3 ? "#FED7AA" : "#e5e7eb"}` }}>
        {count === 5
          ? <p style={{ fontSize: 13, color: GD, fontWeight: 700, margin: 0 }}>✓ 5가지 전부 해당돼요. 지금 바로 고용24에서 신청하세요.</p>
          : count >= 3
          ? <p style={{ fontSize: 13, color: "#C2410C", margin: 0 }}>미체크 항목을 다시 확인해보세요. 전부 충족해야 신청 가능해요.</p>
          : <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>{count}개 해당. 나머지 요건을 확인해보세요.</p>
        }
      </div>
    </div>
  );
}

// ─── 문서 테이블
function DocTable() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", margin: "12px 0 1.2rem" }}>
      {DOCS.map((doc: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 14px", borderBottom: i < DOCS.length - 1 ? "1px solid #f3f4f6" : "none", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
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

// ─── 신청 절차
function ProcessSteps() {
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {STEPS.map((step: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{step.title}</p>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>{step.desc}</p>
            {step.tip && <p style={{ fontSize: 12, color: G, marginTop: 4 }}>💡 {step.tip}</p>}
            {step.link && (
              <div style={{ marginTop: 6, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a href={step.link.url} style={{ fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", border: `1px solid ${G}`, padding: "3px 10px", borderRadius: 20 }}>↗ {step.link.label}</a>
                {step.tel && <a href={step.tel.url} style={{ fontSize: 12, color: "#374151", fontWeight: 600, textDecoration: "none", border: "1px solid #e5e7eb", padding: "3px 10px", borderRadius: 20 }}>📞 {step.tel.label}</a>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 체크리스트
function Checklist() {
  const [done, setDone] = useState({});
  const toggle = (i) => setDone(p => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 16px", margin: "12px 0 1.2rem" }}>
      {CHECKLIST.map((item: any, i: any) => (
        <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", borderBottom: i < CHECKLIST.length - 1 ? "1px solid #f3f4f6" : "none", cursor: "pointer" }}>
          <input type="checkbox" checked={!!done[i]} onChange={(_e: any) => toggle(i)}
            style={{ marginTop: 3, accentColor: G, width: 15, height: 15, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: done[i] ? "#9ca3af" : "#374151", textDecoration: done[i] ? "line-through" : "none", lineHeight: 1.7 }}>{item}</span>
        </label>
      ))}
    </div>
  );
}

// ─── FAQ
function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = (i) => setOpen(p => ({ ...p, [i]: !p[i] }));
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

// ─── CTA
function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
      <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지금 바로 신청하세요</p>
      <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
        고용24에서 온라인 신청이 가능해요.<br />
        서류 준비가 막히면 관할 고용센터 또는 고용노동부 상담센터에 전화하세요.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a href="https://www.work24.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 고용24 신청하기</a>
        <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
      </div>
    </div>
  );
}

// ─── 허브 링크
function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 육아휴직 대체인력 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
      <a href="#" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>
        육아휴직 관련 글 전체 보기 →
      </a>
    </div>
  );
}

// ─── 출처
function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {REFERENCES.map((group: any) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item: any) => (
              <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

// ─── 사이드바
function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>육아휴직 관련 글</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── 메인
export default function ChildcareLeaveSubstitutePage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>육아휴직 · 대체인력 · 사업주 지원금</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          육아휴직 대체인력 지원금 신청 방법 |<br />
          중소기업 조건·금액·절차
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          직원이 육아휴직 들어가면 대체인력 뽑았을 때 지원금이 나와요.<br />
          <strong>30인 미만은 월 140만원, 30인 이상은 월 130만원. 파견이어도 동일해요.</strong><br />
          조건 3가지만 충족하면 돼요. 지금 내 상황에 해당하는지 바로 확인해보세요.
        </p>

        <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 핵심 3가지 즉시 확인</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>얼마 받나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>30인 미만 월 140만원, 30인 이상 월 130만원. 인수인계 2개월 + 육아휴직 기간 + 복직 후 1개월까지 전부 나와요. 1년 육아휴직이면 최대 2,100만원(30인 미만 기준)이에요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>어떤 조건이어야 하나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>① 우선지원대상기업(중소기업) ② 30일 이상 육아휴직 부여 ③ 30일 이상 대체인력 채용. 이 세 가지예요. 파견이어도 직고용이어도 조건 동일해요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>가장 많이 걸리는 게 뭔가요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>고용조정 요건이에요. 대체인력 채용 전 3개월~후 1년 사이에 다른 직원을 회사 사정으로 내보내면 지원금 전액 취소돼요. 자진퇴사는 괜찮아요.</p>
            </div>
          </div>
        </div>

        <H2>중소기업 대체인력 지원금 종류와 금액</H2>
        <p style={body}>
          대체인력 하나 고용했다고 받는 지원금만 있는 게 아니에요.<br />
          대체인력지원금(인건비 보전), 육아휴직지원금(허용 장려금), 업무분담지원금(동료 수당 환급) 이렇게 세 가지가 있고 상황에 따라 중복도 돼요.<br />
          먼저 어떤 지원금이 내 상황에 해당하는지 확인하는 게 먼저예요.
        </p>
        <Bdg>2026년 기준 지원금 비교</Bdg>
        <SupportTable />
        <GreenBox title="이것만 기억해요">
          대체인력 월급이 150만원이면 지원금은 최대 120만원 (임금의 80% 한도. 30인 미만 상한 140만원).<br />
          업무분담지원금은 대체인력 없이도 받을 수 있어요. 기존 직원에게 업무를 맡기고 돈을 지급하면 돼요.<br />
          표에서 내 상황에 맞는 지원금을 확인했으면, 아래에서 신청 조건을 체크해보세요.
        </GreenBox>

        <Divider />

        <H2>육아휴직 대체인력 지원금 신청 조건</H2>
        <p style={body}>
          "대체인력 뽑았으니까 당연히 받는 거 아닌가요?" 하고 신청했다가 거절되는 경우가 있어요.<br />
          가장 많이 걸리는 게 고용조정 요건이에요. 대체인력 채용 전후로 다른 직원을 내보낸 게 있으면 그게 발목을 잡아요.<br />
          5가지 요건을 전부 체크해보세요. 하나라도 빠지면 지원금이 안 나와요.
        </p>
        <Bdg>해당되는 거 체크해보세요</Bdg>
        <EligibilityChecker />
        <BorderBox title="고용조정 요건이 핵심이에요">
          대체인력을 채용하기 전 3개월부터 채용 후 1년까지, 다른 직원을 회사 사정으로 내보내면 안 돼요.<br />
          직원이 자진퇴사한 건 괜찮아요. 권고사직·해고·감원은 안 돼요.<br />
          이 요건 위반으로 지원금 취소된 경우가 많으니 꼭 확인하세요.
        </BorderBox>
        <p style={body}>
          5가지 전부 해당된다면 아래 서류를 준비해서 고용24에 신청하면 돼요.
        </p>

        <HubLinks />

        <H2>대체인력 지원금 신청 방법과 필요 서류</H2>
        <p style={body}>
          고용24(work24.go.kr) 온라인 신청 또는 관할 고용센터에 서류를 제출해요.<br />
          파견근로자를 대체인력으로 쓴 경우에는 파견계약서를 추가로 내요.<br />
          서류 중에 빠지기 쉬운 게 월별 임금대장이에요. 매월 지급 내역이 다 있어야 해요. 미리 모아두세요.
        </p>
        <Bdg>필요 서류 목록</Bdg>
        <DocTable />
        <p style={body}>
          서류가 다 준비됐으면 육아휴직 시작 후 30일이 지나면 첫 신청이 가능해요. 3개월마다 신청하는 구조라 첫 타이밍을 미리 달력에 표시해두는 게 좋아요.
        </p>

        <Divider />

        <H2>중소기업 대체인력 지원금 신청 절차</H2>
        <p style={body}>
          육아휴직 시작하고 30일이 지나면 첫 신청이 가능해요.<br />
          지원금의 50%는 3개월마다 받고, 나머지 50%는 원직원이 복직 후 1개월 이상 계속 고용된 뒤에 한꺼번에 받는 구조예요.<br />
          복직 후 직원이 자진퇴사해도 2025년 7월 이후 육아휴직 개시분부터는 나머지 50%를 받을 수 있어요.
        </p>
        <Bdg>신청 절차</Bdg>
        <ProcessSteps />
        <p style={body}>
          신청 기한은 육아휴직 종료 후 12개월 이내예요. 첫 신청을 놓쳐도 이 기한 안에만 몰아서 신청하면 돼요. 단, 기한을 넘기면 받을 수 없으니 달력에 꼭 표시해두세요.
        </p>

        <Divider />

        <H2>육아휴직 대체인력 지원금 신청 전 체크리스트</H2>
        <p style={body}>
          신청서 접수 후 반려되는 대부분의 이유가 서류 누락이나 고용조정 요건 미확인이에요.<br />
          아래 항목을 미리 체크해두면 요건 조사 단계에서 지연되는 일 없이 바로 처리돼요.
        </p>
        <Checklist />
        <p style={body}>
          전부 체크됐으면 고용24에서 바로 신청하세요. 온라인이 안 되면 사업장 관할 고용센터에 방문해도 돼요.
        </p>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          신청했다가 거절된 경우, 파견으로 써도 되는지, 특례와 중복이 되는지 — 실제로 많이 막히는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률·정책 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 개별 사안에 따라 결과가 달라질 수 있어요. 구체적인 상황은 고용노동부 고객상담센터(1350) 또는 관할 고용센터에 문의하세요.
        </div>
      </div>
    </div>
  );
}
