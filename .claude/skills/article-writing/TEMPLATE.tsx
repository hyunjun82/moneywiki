"use client";
import { useState } from "react";
// ─── 실제 산정기준표 (서울가정법원, 2022.3.1 시행, 현행)
// 단위: 천원, 자녀 1인 기준, 양육자녀 2인 4인 가구 평균양육비
// 소득 구간: ~199 / ~299 / ~399 / ~499 / ~599 / ~699 / ~799 / ~899 / ~999 / ~1199 / 1200+
const TABLE = {
  "0-2":  [621, 752, 945, 1098, 1245, 1401, 1582, 1789, 1997, 2095, 2207],
  "3-5":  [631, 759, 949, 1113, 1266, 1422, 1598, 1807, 2017, 2116, 2245],
  "6-8":  [648, 767, 959, 1140, 1292, 1479, 1614, 1850, 2065, 2137, 2312],
  "9-11": [667, 782, 988, 1163, 1318, 1494, 1630, 1887, 2137, 2180, 2405],
  "12-14":[679, 790, 998, 1280, 1423, 1598, 1711, 1984, 2159, 2223, 2476],
  "15-18":[703, 957,1227, 1402, 1604, 1794, 1964, 2163, 2246, 2540, 2883],
} as const;

type AgeGroup = keyof typeof TABLE;

function getAgeGroup(age: number): AgeGroup {
  if (age <= 2)  return "0-2";
  if (age <= 5)  return "3-5";
  if (age <= 8)  return "6-8";
  if (age <= 11) return "9-11";
  if (age <= 14) return "12-14";
  return "15-18";
}
function getIncomeIdx(income: number): number {
  // 소득 구간 인덱스 (만원 단위)
  if (income < 200)  return 0;
  if (income < 300)  return 1;
  if (income < 400)  return 2;
  if (income < 500)  return 3;
  if (income < 600)  return 4;
  if (income < 700)  return 5;
  if (income < 800)  return 6;
  if (income < 900)  return 7;
  if (income < 1000) return 8;
  if (income < 1200) return 9;
  return 10;
}
// 자녀수 가감: 1인이면 가산(표준은 2인 기준), 3인 이상이면 감산
// 실무상 1인 약 +10~15%, 3인 이상 약 -10% 적용 (해설서 기준)
function childrenAdjust(base: number, children: number): number {
  if (children === 1) return Math.round(base * 1.12); // 1인 가산
  if (children === 2) return base;                    // 2인 = 표준
  if (children === 3) return Math.round(base * 0.92); // 3인 감산
  return Math.round(base * 0.88);                     // 4인 이상
}
function calcAlimony(myIncome: number, theirIncome: number, age: number, children: number): {
  fullCost: number;
  theirShare: number;
  totalSum: number;
  ratio: number;
  total: number;
} {
  const total = myIncome + theirIncome;
  const ageGroup = getAgeGroup(age);
  const idx = getIncomeIdx(total);
  const basePerChild = TABLE[ageGroup][idx]; // 천원
  const adjusted = childrenAdjust(basePerChild, children); // 자녀수 보정, 천원
  const fullCost = adjusted; // 만원 단위로 표시 (천원 → 만원: /10 → 소수점, 그냥 천원 단위 유지)
  const ratio = total > 0 ? theirIncome / total : 0.5;
  const theirShare = Math.round(fullCost * ratio);
  const months = Math.max(0, 19 - age) * 12;
  const totalSum = theirShare * months; // 천원
  return { fullCost, theirShare, totalSum, ratio, total };
}
function fmtW(val: number): string {
  // 천원 → "약 XXX만원" or "약 X,XXX만원"
  const man = Math.round(val / 10) / 10; // 만원 단위, 소수점1자리
  if (man >= 10000) return `약 ${(man / 10000).toFixed(1)}억원`;
  return `약 ${Math.round(man).toLocaleString()}만원`;
}
function fmtMon(val: number): string {
  const man = Math.round(val / 10);
  return `약 ${man.toLocaleString()}만원`;
}
// ─── 데이터 ──────────────────────────────────────────
const FAQS = [
  // ─── 긴급 ───────────────────────────────────────────
  { tag: "긴급", q: "양육비 못 받고 있는데 지금 당장 뭐부터 해야 하나요?",
    a: "양육비이행관리원(1644-6621)에 전화하거나 온라인 신청하는 게 첫 번째예요. 무료로 법률 전문가가 연결되고, 서류 준비부터 법원 소송 대리까지 전부 같이 해줘요. 혼자 법원 가려고 하지 마세요. 이 한 통화가 수백만원을 만들어요." },
  { tag: "긴급", q: "양육비 받다가 갑자기 안 줘요. 바로 어떻게 할 수 있나요?",
    a: "공증 합의서가 있으면 법원 안 가도 바로 급여·예금 압류 신청 가능해요. 법원 결정서(판결·조정 조서)가 있으면 이행명령 → 감치(구치소 최대 30일) → 압류 순서로 강제할 수 있어요. 끊긴 시점부터 밀린 돈 전부 청구돼요. 양육비이행관리원에 이행확보 지원 신청하면 대리해줘요." },
  { tag: "긴급", q: "상대방 연락도 끊기고 어디 사는지도 모르는데 청구할 수 있나요?",
    a: "가능해요. 법원에 주소보정명령을 신청하면 주민등록 주소로 서류를 보낼 수 있어요. 그래도 안 되면 공시송달 방식으로 재판 진행이 가능해요. 양육비이행관리원이 소재 파악부터 소송 대리까지 무료로 도와줘요." },
  // ─── 미지급·강제 ────────────────────────────────────
  { tag: null, q: "양육비 안 주면 어떤 불이익을 받나요?",
    a: "이행명령 위반 시 1,000만원 이하 과태료, 감치(구치소 최대 30일), 운전면허 정지, 출국금지, 급여·예금·부동산 압류까지 단계적으로 올라가요. 양육비이행관리원 홈페이지에 채무자 명단이 공개되기도 해요." },
  { tag: null, q: "합의서 쓰고 공증도 받았는데 안 줘요. 어떻게 하나요?",
    a: "공증된 합의서는 판결과 같은 효력이에요. 법원 안 가도 바로 집행문을 받아서 급여·예금 압류 신청이 가능해요. 양육비이행관리원에 이행확보 지원을 신청하면 강제집행 절차도 대신 진행해줘요." },
  { tag: null, q: "상대방이 소득 없다고 하면 양육비를 안 내도 되나요?",
    a: "아니에요. 소득이 없어도 0원이 되지 않아요. 법원은 잠재적 소득 능력을 봐요. 건강한 성인이라면 최소 최저임금 수준 능력은 있다고 보고 양육비를 정해요. 실직·파산으로 감액 청구는 할 수 있지만, 소득 없음으로 완전 면제는 안 돼요." },
  // ─── 자격·상황 ──────────────────────────────────────
  { tag: null, q: "이혼 전에 혼자 키운 기간의 양육비도 받을 수 있나요?",
    a: "받을 수 있어요. 대법원 판례(92스21)에서 과거 양육비 청구가 가능하다고 인정했어요. 단, 상대방에게 갑자기 큰 금액을 부담시키는 게 가혹하다고 판단되면 법원이 감액할 수 있어요. 늦게 청구할수록 받을 수 있는 금액이 줄어드니 빠를수록 좋아요." },
  { tag: null, q: "재혼하면 양육비를 안 줘도 되나요?",
    a: "재혼과 상관없이 양육비 의무는 그대로예요. 상대방이 재혼하든 내가 재혼하든 생물학적 부모 의무는 사라지지 않아요. 단, 새 배우자가 자녀를 친양자로 입양하면 법적 부모가 바뀌면서 기존 부모의 의무가 소멸될 수 있어요." },
  { tag: null, q: "양육비 선지급제도란 뭔가요?",
    a: "상대방이 양육비를 주지 않을 때, 국가(양육비이행관리원)가 먼저 양육비를 지급하고 나중에 상대방에게 회수하는 제도예요. 자녀 1인당 월 20만원 한도로 지원돼요. 양육비이행관리원 홈페이지에서 신청할 수 있어요." },
  // ─── 금액·변경 ──────────────────────────────────────
  { tag: null, q: "양육비를 올리거나 내릴 수 있나요?",
    a: "돼요. 물가 상승, 자녀 상급학교 진학, 고액 치료비 발생 시 증액 청구 가능해요. 반대로 양육비 내는 쪽이 실직·파산하거나, 양육하는 쪽 소득이 크게 늘었다면 감액 청구도 돼요. 양쪽 합의 또는 법원 심판으로 변경해요." },
  { tag: null, q: "자녀가 성인이 된 후에도 못 받은 과거 양육비를 청구할 수 있나요?",
    a: "가능해요. 다만 2024년 7월 대법원 판례 변경으로 소멸시효가 생겼어요. ① 합의나 판결로 확정된 양육비 → 확정일부터 10년(합의만 한 경우 3년). ② 한 번도 정해진 적 없는 경우 → 자녀가 성년이 된 후 10년 이내에 청구 가능해요. 기간이 지나면 청구권이 소멸하니 빠르게 대응하세요." },
] as const;

const DOCS = [
  { name: "양육비 심판청구 소장", required: true, where: "법원 민원실, 법원 홈페이지" },
  { name: "가족관계증명서", required: true, where: "정부24, 주민센터" },
  { name: "혼인관계증명서", required: true, where: "정부24, 주민센터" },
  { name: "주민등록등본 (자녀 포함)", required: true, where: "정부24, 주민센터" },
  { name: "소득 증빙 서류", required: true, where: "홈택스 원천징수영수증" },
  { name: "자녀 양육 사실 증명", required: true, where: "어린이집·학교 재학증명서" },
  { name: "상대방 재산·소득 자료", required: false, where: "건강보험 납부내역, 차량등록증 등" },
] as const;

const STEPS = [
  { title: "양육비이행관리원 상담 — 무료예요",
    desc: "법원 가기 전에 여기서 먼저 시작하세요. 상담·협의 지원·소송 대리까지 전부 무료예요. 미혼 부모, 사실혼 케이스도 다 도와줘요.",
    link: { label: "childsupport.or.kr", url: "https://www.childsupport.or.kr" },
    tel: { label: "1644-6621", url: "tel:16446621" } },
  { title: "가정법원에 심판 청구",
    desc: "합의가 안 되면 관할 가정법원에 소장을 내요. 인지대 약 2만원 + 송달료만 내면 접수 완료예요. 양육자 지정 청구랑 동시에 하면 절차가 한 번에 끝나요.",
    tip: "상대방 또는 자녀 주소지 가정법원" },
  { title: "재산명시·재산조회 신청",
    desc: "상대방 소득·재산을 모를 때 법원에 신청해요. 금융기관·국세청·건강보험공단에 직접 조회해줘요. 거짓 제출 시 1,000만원 이하 과태료예요." },
  { title: "그래도 안 주면 강제 수단",
    desc: "이행명령 → 감치(구치소 최대 30일) → 운전면허 정지 → 출국금지 → 급여·예금 압류 순서로 단계적으로 올라가요.",
    tip: "양육비이행관리원이 이 과정도 함께해요" },
] as const;

const CHECKLIST = [
  "가족관계증명서·혼인관계증명서 발급",
  "내 소득 증빙 서류 준비 (원천징수영수증 등)",
  "자녀 양육 사실 증명 자료 (재학증명서 등)",
  "상대방 직장·수입 관련 자료 수집",
  "양육비이행관리원 or 법률구조공단 상담 예약",
  "관할 가정법원 확인 및 소장 양식 다운로드",
] as const;

const PAYMENT_METHODS = [
  { title: "급여 자동이체", badge: "가장 확실해요",
    desc: "상대방 직장이 있다면 급여에서 자동으로 빠져나오게 법원에 신청할 수 있어요. 상대방이 의도적으로 안 주는 상황을 원천 차단해요.", highlight: true },
  { title: "예금 압류", badge: null,
    desc: "상대방 은행 계좌를 직접 압류해요. 통장에 돈이 들어오는 순간 자동으로 빠져나와요.", highlight: false },
  { title: "일시불 수령", badge: null,
    desc: "매달 받는 대신 한 번에 전액을 받을 수 있어요. 상대방 동의가 있거나 법원이 인정하면 가능해요.", highlight: false },
  { title: "부동산·차량 등 실물", badge: null,
    desc: "현금 대신 상대방 소유 부동산이나 차량으로 받는 것도 가능해요. 합의 또는 법원 결정으로 처리해요.", highlight: false },
] as const;

const REFERENCES = [
  { category: "법령", items: [
    { label: "민법 제837조 — 이혼과 자녀의 양육책임", url: "https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=JO&lsNm=%EB%AF%BC%EB%B2%95&joNo=083700000&languageType=KO&paras=1" },
    { label: "가사소송법 제2조 — 가사비송사건", url: "https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=JO&lsNm=%EA%B0%80%EC%82%AC%EC%86%8C%EC%86%A1%EB%B2%95&joNo=000200000&languageType=KO&paras=1" },
    { label: "양육비 이행확보 및 지원에 관한 법률", url: "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=168348" },
  ]},
  { category: "판례", items: [
    { label: "대법원 1994.5.13. 자 92스21 결정 — 과거 양육비 청구 가능 여부", url: "https://www.law.go.kr/판례/(92스21)" },
    { label: "대법원 1992.1.21. 선고 91므689 판결 — 양육비 청구권", url: "https://www.law.go.kr/판례/(91므689)" },
  ]},
  { category: "공식 자료", items: [
    { label: "서울가정법원 양육비 산정기준표 (현행, 2022. 3. 1. 시행)", url: "https://www.scourt.go.kr/portal/dcboard/DcNewsViewAction.work?gubun=41&seqnum=9654&cbub_code=000230" },
    { label: "찾기쉬운 생활법령 — 자녀 양육비 부담", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=5&cciNo=3&cnpClsNo=1" },
    { label: "양육비이행관리원 공식 홈페이지", url: "https://www.childsupport.or.kr" },
  ]},
] as const;

// ─── 디자인 토큰 ──────────────────────────────────────
const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" } as const;

// ─── 공통 UI ──────────────────────────────────────────
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

// ─── 긴급 배너 ────────────────────────────────────────
function UrgentBanner() {
  const [type, setType] = useState<string | null>(null);
  type MessageType = "new" | "stopped" | "noncompliance";
  const messages: Record<MessageType, { title: string; color: string; bg: string; text: string }> = {
    new:           { title: "처음 청구하신다면", color: G, bg: GL,
      text: "양육비이행관리원(1644-6621)에 먼저 전화하세요. 무료로 전 과정을 도와줘요. 아래 계산기로 예상 금액 먼저 확인하고, 체크리스트 챙긴 뒤 상담 예약하면 돼요." },
    stopped:       { title: "갑자기 끊겼다면", color: "#DC2626", bg: "#FEF2F2",
      text: "공증 합의서 있으면 → 바로 강제집행 신청. 법원 결정서 있으면 → 이행명령 신청. 아무것도 없으면 → 양육비이행관리원에 전화해서 소급 청구부터 시작하세요. 끊긴 시점부터 밀린 돈 전부 청구 가능해요." },
    noncompliance: { title: "결정 났는데 안 준다면", color: "#7C3AED", bg: "#F5F3FF",
      text: "이행명령 신청 → 감치(구치소 최대 30일) → 운전면허 정지 → 출국금지 → 급여·예금 압류 순서로 강도가 올라가요. 양육비이행관리원에 이행 확보 지원 신청하면 법원 절차를 대신해줘요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>지금 상황이 어떻게 되세요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "new" as const, label: "처음 청구해요. 아직 아무것도 안 했어요." },
          { id: "stopped" as const, label: "받다가 갑자기 끊겼어요." },
          { id: "noncompliance" as const, label: "법원 결정이 났는데 안 줘요." },
        ].map((item) => (
          <button key={item.id} onClick={() => setType(item.id)} style={{
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
  const m = messages[type as MessageType];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button onClick={() => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 계산기 ──────────────────────────────────────────
function Calculator() {
  const [myIncome, setMyIncome] = useState<number>(200);
  const [theirIncome, setTheirIncome] = useState<number>(300);
  const [age, setAge] = useState<number>(8);
  const [children, setChildren] = useState<number>(1);
  const { fullCost, theirShare, totalSum, ratio, total } =
    calcAlimony(myIncome, theirIncome, age, children);
  const childLabel = children === 1 ? "1명 (가산 적용)" : children === 2 ? "2명 (기준)" : `${children}명 (감산 적용)`;
  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        슬라이더를 움직이면 바로 계산돼요. 합산 소득 <strong style={{ color: "#111" }}>{total}만원</strong> 기준이에요.
      </p>
      {[
        { label: "내 월소득", display: `${myIncome}만원`, min: 50, max: 1100, step: 50, val: myIncome, set: setMyIncome },
        { label: "상대방 월소득", display: `${theirIncome}만원`, min: 50, max: 1100, step: 50, val: theirIncome, set: setTheirIncome },
        { label: "자녀 나이", display: `${age}세`, min: 0, max: 18, step: 1, val: age, set: setAge },
        { label: "자녀 수", display: childLabel, min: 1, max: 4, step: 1, val: children, set: setChildren },
      ].map((s) => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <label style={{ fontSize: 13, color: "#6b7280", width: 100, flexShrink: 0 }}>{s.label}</label>
          <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
            onChange={(e) => s.set(+e.target.value)} style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 12, fontWeight: 700, minWidth: 100, textAlign: "right", color: "#111" }}>{s.display}</span>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 16 }}>
        {[
          { label: "월 양육비 총액", value: fmtMon(fullCost), sub: "부모 합산 부담", highlight: false },
          { label: "상대방 부담액", value: `${fmtMon(theirShare)}/월`, sub: `소득 비율 ${Math.round(ratio * 100)}% 적용`, highlight: true },
          { label: "성년까지 총합", value: fmtW(totalSum), sub: `잔여 ${Math.max(0, 19 - age)}년`, highlight: false },
        ].map((c) => (
          <div key={c.label} style={{ background: "#fff", borderRadius: 8, border: `1px solid ${c.highlight ? "#9FE1CB" : "#e5e7eb"}`, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.highlight ? G : "#111", marginBottom: 3 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{c.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 서울가정법원 양육비 산정기준표(현행, 2022. 3. 1. 시행) 기반 추정치예요.
        실제 금액은 거주 지역(도시 가산·농어촌 감산)·특별 치료비·교육비 등에 따라 법원 판단으로 달라질 수 있어요.
      </p>
    </div>
  );
}

// ─── 자격 체커 ────────────────────────────────────────
function EligibilityChecker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [altC1, setAltC1] = useState<boolean>(false);
  const toggle = (id: string) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const c1Pass = checked["c1"] || altC1;
  const allPass = c1Pass && checked["c2"] && checked["c3"] && checked["c4"];
  const someChecked = checked["c2"] || checked["c3"] || checked["c4"];
  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label onClick={() => { toggle("c1"); if (altC1) setAltC1(false); }} style={{
          display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: 8, cursor: "pointer",
          border: `1px solid ${checked["c1"] ? G : "#e5e7eb"}`,
          background: checked["c1"] ? GL : "#f9fafb",
        }}>
          <input type="checkbox" checked={!!checked["c1"]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
          <span style={{ fontSize: 13, lineHeight: 1.6 }}>이혼이 됐거나 진행 중이에요</span>
        </label>
        {!checked["c1"] && (
          <label onClick={() => setAltC1((p) => !p)} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: 8, cursor: "pointer",
            border: `1px solid ${altC1 ? G : "#e5e7eb"}`,
            background: altC1 ? GL : "#fff", marginLeft: 16,
          }}>
            <input type="checkbox" checked={altC1} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
            <span style={{ fontSize: 13, lineHeight: 1.6, color: "#6b7280" }}>
              사실혼 종료 / 미혼 부모예요
              <span style={{ fontSize: 11, background: "#f3f4f6", borderRadius: 4, padding: "1px 6px", marginLeft: 6 }}>이것도 청구 가능해요</span>
            </span>
          </label>
        )}
        {[
          { id: "c2", label: "만 19세 미만 자녀가 있어요" },
          { id: "c3", label: "내가 실제로 자녀를 키우고 있어요" },
          { id: "c4", label: "상대방이 양육비를 안 줬거나 정해진 적이 없어요" },
        ].map((item) => (
          <label key={item.id} onClick={() => toggle(item.id)} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: 8, cursor: "pointer",
            border: `1px solid ${checked[item.id] ? G : "#e5e7eb"}`,
            background: checked[item.id] ? GL : "#f9fafb",
          }}>
            <input type="checkbox" checked={!!checked[item.id]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>{item.label}</span>
          </label>
        ))}
      </div>
      {allPass && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          <strong>4가지 모두 해당돼요.</strong> 청구 자격 있어요.<br />
          아래 절차 1단계 — 양육비이행관리원(1644-6621) 상담부터 시작하세요. 무료예요.
        </div>
      )}
      {!allPass && !c1Pass && someChecked && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
          이혼·사실혼 종료 여부가 불분명해도 자녀가 <strong>인지(認知)</strong>됐다면 청구할 수 있어요.<br />
          인지가 안 됐다면 인지청구 + 양육비 청구를 동시에 진행할 수 있어요. 양육비이행관리원에 먼저 상담해보세요.
        </div>
      )}
    </div>
  );
}

// ─── 수령 방법 ────────────────────────────────────────
function PaymentMethods() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "10px 0 1.2rem" }}>
      {PAYMENT_METHODS.map((m, i) => (
        <div key={i} style={{ padding: "12px 16px", borderRadius: 8, border: `1px solid ${m.highlight ? "#9FE1CB" : "#e5e7eb"}`, background: m.highlight ? GL : "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: m.highlight ? GD : "#111" }}>{m.title}</span>
            {m.badge && <span style={{ fontSize: 11, background: G, color: "#fff", borderRadius: 4, padding: "1px 7px", fontWeight: 600 }}>{m.badge}</span>}
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{m.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ─── 서류 테이블 ──────────────────────────────────────
function DocTable() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            {["서류", "구분", "발급처"].map((h) => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 500, color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DOCS.map((d, i) => (
            <tr key={i}>
              <td style={{ padding: "9px 12px", borderBottom: "1px solid #f3f4f6" }}>{d.name}</td>
              <td style={{ padding: "9px 12px", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 4, background: d.required ? GL : "#f3f4f6", color: d.required ? GD : "#6b7280" }}>
                  {d.required ? "필수" : "선택"}
                </span>
              </td>
              <td style={{ padding: "9px 12px", borderBottom: "1px solid #f3f4f6", color: "#6b7280" }}>{d.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── 절차 스텝 ────────────────────────────────────────
function ProcessSteps() {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < STEPS.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />
          )}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
            {/* 1단계: 링크 + 전화 버튼 */}
            {s.link && (
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                <a href={s.link.url} style={{
                  fontSize: 12, padding: "4px 10px", borderRadius: 6,
                  background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600,
                }}>🌐 {s.link.label}</a>
                <a href={s.tel.url} style={{
                  fontSize: 12, padding: "4px 10px", borderRadius: 6,
                  background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600,
                }}>📞 {s.tel.label}</a>
              </div>
            )}
            {s.tip && !s.link && (
              <span style={{ display: "inline-block", fontSize: 12, marginTop: 7, background: GL, color: "#0F6E56", borderRadius: 6, padding: "4px 10px" }}>{s.tip}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 체크리스트 ──────────────────────────────────────
function Checklist() {
  const [done, setDone] = useState<boolean[]>(new Array(CHECKLIST.length).fill(false));
  const doneCount = done.filter(Boolean).length;
  const pct = Math.round((doneCount / CHECKLIST.length) * 100);
  const toggle = (i: number) => setDone((p) => p.map((v, idx) => (idx === i ? !v : v)));
  return (
    <div>
      <div style={{ height: 5, background: "#f3f4f6", borderRadius: 3, margin: "10px 0 4px" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: G, borderRadius: 3, transition: "width 0.3s" }} />
      </div>
      <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>{doneCount} / {CHECKLIST.length} 완료</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {CHECKLIST.map((item, i) => (
          <div key={i} onClick={() => toggle(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: "pointer", border: "1px solid #e5e7eb", background: done[i] ? "#f9fafb" : "#fff" }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: done[i] ? G : "#fff", border: `1.5px solid ${done[i] ? G : "#d1d5db"}`, color: "#fff", fontSize: 11 }}>
              {done[i] && "✓"}
            </div>
            <span style={{ fontSize: 13, color: done[i] ? "#9ca3af" : "#111", textDecoration: done[i] ? "line-through" : "none" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.tag ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)} style={{
            padding: "12px 16px", fontSize: 14, fontWeight: f.tag ? 600 : 500, cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: open === i ? "#f9fafb" : f.tag ? "#FFF7ED" : "#fff",
          }}>
            <span>
              {f.tag && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && (
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── CTA ─────────────────────────────────────────────
function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>지금 바로 시작할 수 있어요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>혼자 하지 마세요.<br />둘 다 무료예요.</p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        양육비이행관리원은 상담·서류·소송 대리까지 전부 무료예요.<br />
        법률구조공단은 소득 기준 충족 시 변호사 선임까지 무료 지원해요.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="https://www.childsupport.or.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>
            🌐 양육비이행관리원
          </a>
          <a href="tel:16446621" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}`, whiteSpace: "nowrap" }}>
            📞 1644-6621
          </a>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="https://www.klac.or.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
            🌐 대한법률구조공단
          </a>
          <a href="tel:132" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db", whiteSpace: "nowrap" }}>
            📞 132
          </a>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 16, lineHeight: 1.7 }}>
        양육비이행관리원은 소득 제한 없이 무료예요. 법률구조공단은 소득 기준 확인 후 지원 여부가 결정돼요.
      </p>
    </div>
  );
}

// ─── 출처 ─────────────────────────────────────────────
function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {REFERENCES.map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
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

// ─── 허브 링크 데이터 ─────────────────────────────────
const HUB_LINKS = [
  { title: "이혼 위자료, 얼마나 받을 수 있을까?", desc: "유책 배우자 기준과 실제 판결 금액", href: "#" },
  { title: "친권과 양육권, 뭐가 달라요?", desc: "이혼 후 자녀 결정권 완전 정리", href: "#" },
  { title: "재산분할 비율, 법원은 어떻게 정하나?", desc: "기여도·혼인 기간별 실제 분할 사례", href: "#" },
  { title: "협의이혼 절차와 기간 총정리", desc: "신청부터 완료까지 단계별 가이드", href: "#" },
] as const;

// ─── 사이드바 링크 데이터 ─────────────────────────────
const SIDEBAR_LINKS = [
  "이혼 위자료 청구 방법",
  "협의이혼 절차와 기간",
  "재산분할 비율 계산",
  "친권과 양육권 차이",
  "양육비 강제집행 방법",
  "면접교섭권 신청 방법",
  "이혼 소송 기간과 비용",
  "유책배우자 이혼 가능한가",
  "혼인무효 vs 이혼 차이",
  "사실혼 재산분할 가능한가",
  "이혼 후 성씨 변경 방법",
  "황혼이혼 재산분할 특이점",
  "외국인과 이혼하는 방법",
  "이혼 숙려기간 면제 조건",
  "양육비 선지급제도 신청",
  "미혼부 인지청구 방법",
  "이혼 후 건강보험 처리",
  "이혼 후 국민연금 분할",
  "별거 기간 재산분할 영향",
  "이혼 조정 신청 방법",
] as const;

// ─── 허브 링크 박스 ───────────────────────────────────
function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>
        이혼 관련 글도 함께 보세요
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 4px",
            borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none",
            textDecoration: "none",
          }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
      <a href="#" style={{
        display: "block", textAlign: "center", marginTop: 12,
        fontSize: 12, color: G, fontWeight: 600, textDecoration: "none",
        padding: "8px", borderRadius: 6, background: GL,
      }}>
        이혼 관련 글 전체 보기 →
      </a>
    </div>
  );
}

// ─── 사이드바 ─────────────────────────────────────────
function Sidebar() {
  return (
    <div style={{
      width: 176, flexShrink: 0,
      position: "sticky", top: 24,
      alignSelf: "flex-start",
    }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          이혼 관련 글
        </p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "6px 0",
            fontSize: 12, color: "#374151", textDecoration: "none",
            borderBottom: "1px solid #f0f0f0",
            lineHeight: 1.5,
          }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── 메인 ─────────────────────────────────────────────
export default function AlimonyPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      {/* ── 사이드바 ── */}
      <Sidebar />
      {/* ── 본문 ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 자녀문제 · 양육비</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 후 양육비, 얼마나 받을 수 있을까?<br />
          법원 기준표 계산부터 청구 절차까지
        </h1>
        <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
          모르면 그냥 넘어가는 돈이에요.<br />
          상대방이 안 줘도, 법이 강제할 수 있어요. 안 주면 구치소까지 가거든요.<br /><br />
          내가 얼마 받을 수 있는지, 어떻게 받는지 지금 바로 확인해보세요.
        </p>
        <UrgentBanner />
        <Bdg>내 상황 맞게 직접 계산해보세요</Bdg>
        <Calculator />
        <p style={body}>
          <strong>성년까지 총합</strong>을 꼭 보세요.<br />
          매달 받는 금액이 작아 보여도, 자녀가 어릴수록 수천만원이 쌓여요.<br />
          그냥 넘어가면 그 돈 전부 포기하는 거예요.
        </p>
        <Divider />
        <H2>양육비, 누가 얼마나 내야 해요?</H2>
        <p style={body}>
          "상대방이 돈 없다고 하면 어쩔 수 없는 거 아닌가요?"<br />
          아니에요. <strong>민법 제837조</strong>가 딱 정해놨어요.<br />
          자녀 양육 비용은 부모가 <strong>공동으로</strong> 부담해야 해요. 이혼해도 의무는 사라지지 않아요.
        </p>
        <p style={body}>
          금액은 부모 양쪽 소득·자녀 나이·자녀 수를 합쳐서 법원이 정해요.<br />
          서울가정법원 양육비 산정기준표(현행)가 전국 법원 실무 기준이에요.<br />
          각자 소득 비율로 부담을 나눠요. 상대방 소득이 높을수록 상대방 부담이 커져요.
        </p>
        <GreenBox title="이것만 기억해요">
          이혼해도 부모 의무는 그대로예요. 양쪽 모두 내야 해요.<br />
          자녀가 만 19세가 될 때까지예요. 대학 가고 안 가고 상관없어요.<br />
          과거 양육비도 청구 가능해요. 혼자 키운 기간도 소급돼요.
        </GreenBox>
        <Divider />
        <H2>나도 청구할 수 있는 상황인가요?</H2>
        <p style={body}>
          정식 이혼이 완료되지 않았어도 돼요.<br />
          이혼 진행 중·사실혼 종료·미혼 부모도 모두 청구할 수 있어요.
        </p>
        <Bdg>해당되는 거 체크해보세요</Bdg>
        <EligibilityChecker />
        <p style={{ ...body, marginTop: 14 }}>
          사실혼·미혼 부모라도 자녀가 <strong>인지(認知)</strong>됐다면 바로 청구할 수 있어요.<br />
          인지가 안 됐다면 인지청구 + 양육비 청구를 동시에 할 수 있고, 양육비이행관리원이 대리해줘요.
        </p>
        <GreenBox title="오래전부터 혼자 키웠어도 받을 수 있어요">
          과거 기간 양육비도 소급 청구가 돼요.<br />
          단, 상대방 형평을 고려해 전액이 아닐 수 있어요.<br />
          늦게 청구할수록 불리하니까, 빠를수록 좋아요.
        </GreenBox>
        <Divider />
        <H2>양육비, 어떻게 받는 게 제일 확실해요?</H2>
        <p style={body}>
          합의로 정해도 나중에 안 줄 수 있어요.<br />
          어떤 방식으로 받느냐에 따라 실제로 받을 수 있는 확률이 완전히 달라져요.
        </p>
        <Bdg>수령 방법 비교</Bdg>
        <PaymentMethods />
        <BorderBox title="합의했다면 반드시 공증받으세요">
          구두 약속이나 카카오톡 합의는 법적으로 강제하기 어려워요.<br />
          <strong>공증이나 법원 조정 조서</strong>로 남겨야 바로 강제집행이 가능해요.<br />
          공증 비용은 양육비 총액에 따라 달라지니 공증인 사무소에서 확인하세요.
        </BorderBox>
        {/* ── 허브 링크 박스 — 본문 중간 삽입 ── */}
        <HubLinks />
        <H2>어떤 서류가 필요해요?</H2>
        <p style={body}>
          대부분 정부24에서 온라인으로 발급할 수 있어요. 발급일로부터 3개월 이내여야 해요.<br />
          직장인이라면 홈택스 원천징수영수증, 자영업자라면 종합소득세 신고 내역이에요.<br />
          소득이 불규칙하다면 최근 3~6개월 평균 소득으로 산정하는 경우가 많아요.
        </p>
        <Bdg>필요 서류 목록</Bdg>
        <DocTable />
        <BorderBox title="상대방 소득을 모른다면요?">
          법원에 <strong>재산명시명령·재산조회</strong>를 신청하면 돼요.<br />
          법원이 금융기관·국세청에 직접 조회해서 소득과 재산을 파악해줘요.<br />
          거짓 제출 시 1,000만원 이하 과태료예요.<br />
          카카오톡 대화·SNS 소비 내역도 증거로 쓸 수 있어요.
        </BorderBox>
        <Divider />
        <H2>청구 절차, 순서대로 알려드릴게요</H2>
        <p style={body}>
          혼자 법원부터 가지 마세요.<br />
          양육비이행관리원이 무료로 전 과정을 같이 해줘요. 거기서 시작하는 게 제일 빠르고 확실해요.
        </p>
        <Bdg>신청 절차</Bdg>
        <ProcessSteps />
        <Divider />
        <H2>청구 전에 이것부터 챙겨두세요</H2>
        <p style={body}>
          미리 준비하면 법원 절차가 훨씬 빨라져요.<br />
          특히 상대방 소득·재산 자료는 나중에 구하기 어려울 수 있으니 지금 모아두세요.
        </p>
        <Checklist />
        <Divider />
        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          급한 상황부터 위에 올렸어요. 상황이 비슷하다면 먼저 확인해보세요.
        </p>
        <FAQ />
        <CTA />
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 각종 신고·불복 청구 등의 증거자료로 쓸 수 없어요. 개별 사안에 따라 결과가 달라질 수 있으니, 구체적인 상황은 양육비이행관리원(1644-6621) 또는 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>{/* end 본문 */}
    </div>
  );
}

// ─── layout.tsx 템플릿 (반드시 함께 생성) ──────────────
// 파일 위치: src/app/w/{slug}/layout.tsx
//
// import type { Metadata } from "next";
//
// export const dynamic = "force-static";
//
// export const metadata: Metadata = {
//   title: "타이틀 line1 — 타이틀 line2 | 머니위키",
//   description: "검색 의도에 맞는 2문장 요약",
//   alternates: { canonical: "https://jjyu.co.kr/w/{slug}" },
//   openGraph: {
//     title: "타이틀 line1 — 타이틀 line2",
//     description: "검색 의도에 맞는 2문장 요약",
//     url: "https://jjyu.co.kr/w/{slug}",
//     type: "article",
//   },
// };
//
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return <>{children}</>;
// }

// ─── ★★★ 빌드 실패 방지 필수 규칙 (2025.03 실패 10회+ 교훈) ──
//
// 1. article-ui에서 컴포넌트 import 절대 금지
//    - H2, GreenBox, Steps, DocTable, Checklist, FAQ, References, Disclaimer
//    - article-ui에서 가져오면 props 타입 불일치로 빌드 에러
//    - 이 템플릿처럼 파일 안에서 자체 정의해야 함
//
// 2. 이 파일의 유일한 외부 import: useState (from "react")
//    - ArticleLayout, Sidebar, ArticleAd 등 article-ui 공용 컴포넌트도 사용 안 함
//    - 사이드바, 레이아웃 전부 이 파일 안에서 자체 구현
//
// 3. 파일 최상단에 "use client" 필수
//    - useState 등 React 훅 사용 시 Next.js가 요구함
//    - 빠뜨리면 빌드 에러
//
// 4. 배포: Cloudflare Pages (main 푸시 → 자동 빌드, 약 3~5분)
//    - Vercel 아님. Cloudflare Pages 대시보드에서 빌드 로그 확인
