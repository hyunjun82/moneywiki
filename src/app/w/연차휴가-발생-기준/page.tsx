"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";
// @ts-nocheck
import { useState } from "react";

// 9번: 연차휴가 발생 기준 | 연차수당 계산·보상·촉진제도

const SIDEBAR_LINKS = ["근로계약서 작성 방법","출산휴가 배우자출산휴가","퇴직금 계산 방법","임금체불 신고 방법","주휴수당 계산","최저임금 2026","야간수당 계산","연장수당 계산","부당해고 신고","실업급여 신청","육아휴직 신청","직장 내 괴롭힘","산재보험 신청","고용노동부 신고","연차수당 청구","미사용 연차 정산","1년 미만 연차 계산","연차 촉진 통지","연차 수당 소멸시효","회계연도 연차 기준"];

const HUB_LINKS = [
  { title: "근로계약서 작성 방법 | 필수 기재사항과 못 받았을 때 대처법", desc: "계약서에 연차 조건이 제대로 기재됐는지 확인", href: "#" },
  { title: "출산휴가 및 배우자출산휴가 | 급여 신청 방법과 금액", desc: "출산 관련 휴가 제도 전체 정리", href: "#" },
  { title: "소액사건 소장 작성 | 3,000만원 이하 금전 청구", desc: "연차수당 청구 소송 방법", href: "#" },
  { title: "임금체불 신고 방법 | 고용노동부 진정 절차", desc: "연차수당 미지급 신고 방법", href: "#" },
];

const ANNUAL_LEAVE_TABLE = [
  { period: "1년 미만", basis: "매월 개근", days: "1일/월 (최대 11일)", note: "입사 1년 차에 소멸" },
  { period: "1년 이상 (80% 이상 출근)", basis: "1년 1일에 발생", days: "15일", note: "입사 1년 1일째 발생" },
  { period: "3년 이상", basis: "2년마다 1일 가산", days: "16일 (3~4년차)", note: "최대 25일 한도" },
  { period: "5년 이상", basis: "2년마다 1일 가산", days: "17일 (5~6년차)", note: "최대 25일 한도" },
  { period: "11년 이상", basis: "2년마다 1일 가산", days: "21일 (11~12년차)", note: "이후 23, 25일 순서" },
  { period: "21년 이상", basis: "최대치 도달", days: "25일 (상한)", note: "이후 가산 없음" },
];

const FAQS = [
  { urgent: true, q: "회사가 연차수당을 안 줘요. 어떻게 해야 하나요?", a: "연차수당도 임금이에요. 미지급 시 고용노동부(1350)에 임금체불로 진정을 제기할 수 있어요. 소멸시효는 3년이므로 연차 사용 기한이 만료된 날부터 3년 이내에 청구해야 해요. 퇴직 시에는 퇴직일로부터 14일 이내에 받아야 해요." },
  { urgent: true, q: "회사가 연차 사용촉진 통지를 보냈어요. 안 쓰면 수당을 못 받나요?", a: "법정 절차대로 촉진 통지를 받았다면, 기한 내에 사용 계획을 제출하거나 사용해야 해요. 적법한 촉진 후에도 사용하지 않으면 사업주의 수당 지급 의무가 면제돼요. 반드시 촉진 통지 절차가 적법했는지 확인하세요. 서면(또는 이메일) 통지가 아니거나 기간이 틀리면 무효예요." },
  { urgent: false, q: "1년 계약직인데 연차를 15일 받을 수 있나요?", a: "1년 계약직은 계약 종료 후 계속 근로가 없으면 15일 연차 청구권이 발생하지 않아요. 2021년 고용노동부 행정해석 변경으로 '1년 1일째에도 근로관계가 유지되어야' 15일 연차가 생겨요. 1년만 계약하고 퇴직하면 1년 미만 연차(최대 11일)만 발생해요." },
  { urgent: false, q: "입사일 기준과 회계연도 기준, 어느 쪽이 맞나요?", a: "원칙은 입사일 기준이지만, 회사가 관리 편의를 위해 회계연도(1월 1일) 기준을 쓸 수 있어요. 단, 회계연도 기준이 근로자에게 불리해서는 안 돼요. 중도 입사자에게는 비례 연차를 부여해야 해요." },
  { urgent: false, q: "연차를 쓰려고 했는데 회사가 거부해요. 어떻게 하나요?", a: "근로자는 원칙적으로 원하는 시기에 연차를 사용할 수 있어요. 다만 회사가 '시기변경권'을 행사해서 사업 운영상 지장이 있다면 다른 날로 바꿀 수 있어요. 무조건 거부는 안 돼요. 거부가 반복되면 고용노동부(1350)에 신고할 수 있어요." },
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }: any) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
const Bdg = ({ children }: any) => <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;

function AnnualLeaveCalculator() {
  const [monthlyPay, setMonthlyPay] = useState(300);
  const [unusedDays, setUnusedDays] = useState(5);
  const [workHours, setWorkHours] = useState(8);
  const dailyWage = Math.round((monthlyPay * 10000) / 209 * workHours);
  const allowance = dailyWage * unusedDays;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14 }}>🗓️ 연차수당 계산기</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>월급 (만원)</label>
          <input type="number" value={monthlyPay} onChange={(e) => setMonthlyPay(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>미사용 연차 (일)</label>
          <input type="number" value={unusedDays} min={1} max={25} onChange={(e) => setUnusedDays(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>1일 소정근로시간</label>
          <select value={workHours} onChange={(e) => setWorkHours(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}>
            {[4,5,6,7,8].map(h => <option key={h} value={h}>{h}시간</option>)}
          </select>
        </div>
      </div>
      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: "1px solid #e5e7eb" }}>
          <span style={{ fontSize: 13, color: "#374151" }}>1일 통상임금 (월급 ÷ 209시간 × {workHours}시간)</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{dailyWage.toLocaleString()}원</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: "1px solid #e5e7eb" }}>
          <span style={{ fontSize: 13, color: "#374151" }}>미사용 연차</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{unusedDays}일</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>연차수당 (1일 통상임금 × 미사용 일수)</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: G }}>{allowance.toLocaleString()}원</span>
        </div>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>통상임금 계산은 임금 구성 항목에 따라 달라질 수 있어요. 성과급·식대 등 고정·비고정 여부에 따라 달라지니 정확한 계산은 고용노동부 노동포털(labor.moel.go.kr)을 참고하세요.</p>
      </div>
    </div>
  );
}

function LeaveTable() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#f9fafb", padding: "8px 14px", borderBottom: "1px solid #e5e7eb" }}>
        {["근속 기간", "발생 기준", "연차 일수", "비고"].map(h => <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>{h}</span>)}
      </div>
      {ANNUAL_LEAVE_TABLE.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "10px 14px", borderBottom: i < ANNUAL_LEAVE_TABLE.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{row.period}</span>
          <span style={{ fontSize: 12, color: "#374151" }}>{row.basis}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: G }}>{row.days}</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{row.note}</span>
        </div>
      ))}
    </div>
  );
}

function PromotionGuide() {
  const [step, setStep] = useState(null);
  const steps = [
    {
      title: "1차 촉진 통지를 받았어요 (연차 소멸 6개월 전)",
      desc: "회사가 '미사용 연차가 몇 일 있으니 언제 쓸지 알려달라'는 통지를 보낸 거예요. 이 통지는 반드시 서면(이메일 포함)이어야 해요. 구두나 구두 후 문자로만 왔다면 절차 하자예요. 통지를 받으면 10일 이내에 사용 계획을 회사에 제출해야 해요. 안 하면 회사가 날짜를 강제로 지정해요.",
    },
    {
      title: "사용 계획 제출 — 10일 안에 하세요",
      desc: "1차 통지를 받은 날부터 10일 안에 '몇 월 몇 일에 연차를 쓰겠다'는 계획을 회사에 제출하세요. 이메일이나 문자로 남겨두면 나중에 증거가 돼요. 만약 10일 안에 제출하지 않으면 회사가 사용 시기를 지정해서 2차 통지를 보낼 수 있어요.",
    },
    {
      title: "2차 촉진 통지를 받았어요 (연차 소멸 2개월 전)",
      desc: "내가 사용 계획을 안 냈거나 제출이 늦었을 때 회사가 보내는 거예요. '○월 ○일에 쉬어라'고 날짜를 지정해서 서면으로 통지해요. 이 날짜에 쉬지 않으면 수당을 못 받을 수 있어요. 지정된 날짜가 불가능하면 회사에 변경 요청을 해두세요. 요청 기록을 남겨두면 나중에 분쟁 시 유리해요.",
    },
    {
      title: "촉진 절차가 다 끝났는데 연차를 못 썼어요",
      desc: "회사가 1차·2차 촉진 절차를 모두 서면으로 적법하게 진행했다면, 내가 안 써도 회사는 수당을 안 줘도 돼요. 하지만 절차 중 하나라도 구두였거나, 기간이 틀렸거나, 2차 때 날짜 지정이 없었다면 촉진이 무효예요. 촉진 통지 문서를 캡처해서 보관해두고, 의심되면 1350에 문의하세요.",
    },
  ];
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
          <button onClick={() => setStep(step === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", lineHeight: 1.5 }}>{s.title}</span>
            <span style={{ fontSize: 16, color: "#9ca3af", flexShrink: 0 }}>{step === i ? "−" : "+"}</span>
          </button>
          {step === i && <div style={{ padding: "0 14px 14px", fontSize: 13, color: "#374151", lineHeight: 1.9, borderTop: "1px solid #f3f4f6" }}><p style={{ margin: "12px 0 0" }}>{s.desc}</p></div>}
        </div>
      ))}
    </div>
  );
}

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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>근로 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function AnnualLeavePage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>근로 · 연차 · 임금</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          연차휴가 발생 기준 |<br />
          연차수당 계산·보상·촉진제도
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          연차수당을 못 받고 있거나, 촉진 통지를 받았는데 수당을 못 받게 되는 건지 걱정되시죠.<br />
          연차수당은 임금이에요. 안 주면 임금체불로 고용노동부에 신고할 수 있고, 소멸시효는 3년이에요.<br /><br />
          촉진 통지를 받았다고 무조건 수당을 못 받는 건 아니에요. 회사가 절차를 정확히 지켰는지가 핵심이에요.<br />
          월급을 입력하면 내가 받아야 할 연차수당이 바로 나와요.
        </p>

        <Bdg>미사용 연차수당 바로 계산해보세요</Bdg>
        <AnnualLeaveCalculator />

        <Divider />

        <H2>연차휴가 발생 기준 — 근속 기간별 연차수당 계산</H2>
        <p style={body}>
          연차 일수는 입사일 기준으로 계산해요. 회사가 회계연도 기준을 쓰는 경우도 있지만, 근로자에게 불리하면 안 돼요.<br />
          1년 미만과 1년 이상 기준이 달라서 헷갈리는 경우가 많아요. 특히 1년 계약직은 아래를 꼭 확인하세요.
        </p>
        <LeaveTable />
        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>1년 계약직이라면 이것 먼저 확인하세요</strong>
          1년 딱 맞고 계약이 끝나면 15일 연차 청구권이 발생하지 않아요. 1년 1일째에도 재직 중이어야 해요.<br />
          1년 계약 후 퇴직하면 → 1년 미만 연차(최대 11일)만 발생해요.<br />
          계약이 갱신되거나 1년 이후에도 계속 다닌다면 → 15일 연차가 새로 발생해요.
        </div>

        <HubLinks />

        <H2>연차 사용촉진제도 — 촉진 통지를 받았다면 지금 이걸 확인하세요</H2>
        <p style={body}>
          촉진 통지를 받으면 많은 분이 "이제 수당을 못 받나" 하고 포기해요. 그런데 절차에 하자가 있으면 수당을 받을 수 있어요.<br />
          회사가 아래 절차를 정확히 지켰는지 확인하세요. 하나라도 어겼으면 촉진 효력이 없어서 수당 청구 가능해요.
        </p>
        <PromotionGuide />
        <BorderBox title="촉진 절차 하자 체크리스트 — 하나라도 해당하면 수당 청구 가능해요">
          ✕ 서면(또는 이메일)이 아닌 구두·구두로만 통보했어요<br />
          ✕ 연차 소멸 6개월 전이 아닌 더 늦게 1차 통보를 했어요<br />
          ✕ 근로자가 10일 내에 사용 계획을 제출했는데 회사가 2차 통보를 안 했어요<br />
          ✕ 2차 통보에서 사용 시기를 구체적으로 지정하지 않았어요<br />
          위 중 하나라도 해당하면 촉진의 효력이 없어요. 고용노동부(1350)에 신고하거나 임금체불 진정을 제기하세요.
        </BorderBox>

        <Divider />
        <H2>연차수당 계산·보상·촉진제도에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>연차수당 미지급 신고 방법</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "고용노동부 민원마당 (1350)", url: "tel:1350", sub: "연차수당 미지급 임금체불 신고" },
              { label: "고용노동부 노동포털 연차 계산기", url: "https://labor.moel.go.kr/cmmt/calAnnlVctn.do", sub: "입사일 기준 연차 개수 자동 계산" },
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 법률상담" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 근로기준법 제60조·제61조를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 고용노동부(1350)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
