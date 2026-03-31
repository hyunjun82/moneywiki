"use client";
import { useState } from "react";

// 6번: 근로계약서 작성 방법 | 필수 기재사항과 못 받았을 때 대처법

const SIDEBAR_LINKS = ["연차휴가 발생 기준","출산휴가 배우자출산휴가","임금체불 신고 방법","퇴직금 계산 방법","부당해고 신고 방법","실업급여 신청 방법","최저임금 2026년","주휴수당 계산","야간수당 계산","연장수당 계산","육아휴직 신청","직장 내 괴롭힘 신고","산재보험 신청 방법","고용노동부 신고","노동위원회 신청","소액사건 소장 작성","임금체불 지급명령","표준근로계약서 양식","계약직 근로계약서","아르바이트 근로계약서"];

const HUB_LINKS = [
  { title: "연차휴가 발생 기준 | 연차수당 계산·보상·촉진제도", desc: "근로계약서에 기재된 연차 조건 확인", href: "#" },
  { title: "출산휴가 및 배우자출산휴가 | 급여 신청 방법", desc: "근로계약서와 무관하게 법으로 보장", href: "#" },
  { title: "소액사건 소장 작성 | 3,000만원 이하 금전 청구", desc: "임금체불 소송 방법", href: "#" },
  { title: "차용증 없이 빌려준 돈 받는 방법", desc: "이체 내역으로 소송하기", href: "#" },
];

const REQUIRED_ITEMS = [
  { item: "임금", required: true, detail: "구성항목(기본급·수당), 계산방법, 지급방법, 지급일" },
  { item: "소정근로시간", required: true, detail: "하루·주 근무시간, 시업·종업 시각, 휴게시간" },
  { item: "휴일", required: true, detail: "주휴일, 공휴일, 근로자의날 포함 여부" },
  { item: "연차유급휴가", required: true, detail: "발생 일수, 사용 방법, 촉진제도 여부" },
  { item: "취업 장소·업무 내용", required: false, detail: "명시 권장 (분쟁 예방 목적)" },
  { item: "근로계약 기간", required: false, detail: "기간제·파견직은 반드시 기재" },
  { item: "사회보험 가입 여부", required: false, detail: "국민연금·건강보험·고용보험·산재보험" },
];

const VIOLATIONS = [
  {
    situation: "근로계약서를 아예 안 줬어요",
    action: "지금 당장 사업주에게 서면으로 계약서 교부를 요청하세요. 카카오톡이나 문자로 '근로계약서 주세요'라고 남겨두면 증거가 돼요. 거부하면 고용노동부 앱 또는 1350에 신고하면 돼요. 신고 전에 출근 기록, 급여 이체 내역, 카카오톡 업무 지시 내역을 미리 저장해두세요.",
    tip: "신고 후 사업주가 보복하면 그게 또 부당해고·불이익 처우로 추가 신고 대상이에요.",
  },
  {
    situation: "구두로만 계약하고 서면을 안 줬어요",
    action: "구두 계약도 계약은 성립해요. 하지만 나중에 임금·근무시간 분쟁이 생기면 증명이 어려워요. 지금이라도 사업주에게 최초 근무일로 소급해서 근로계약서 작성을 요청하세요. 거부하면 고용노동부 1350에 신고할 수 있어요.",
    tip: "구두로 합의한 조건이 뭔지 문자나 카카오톡으로 확인 메시지를 보내서 상대방 답변을 받아두세요.",
  },
  {
    situation: "계약서 내용이 최저임금보다 낮아요",
    action: "걱정하지 않아도 돼요. 최저임금보다 낮은 계약 조건은 법적으로 자동 무효예요. 그 부분만 최저임금으로 대체 적용돼요. 지금까지 최저임금보다 적게 받은 차액은 3년 이내에 청구할 수 있어요. 고용노동부 1350 또는 노동포털에서 차액 계산 후 진정을 제기하세요.",
    tip: "2026년 최저임금 시급 10,320원 / 월 2,156,880원 (주 40시간, 209시간 기준)",
  },
  {
    situation: "월급이 계약서에 적힌 금액보다 적게 들어와요",
    action: "이건 임금체불이에요. 먼저 급여명세서를 요청해서 어떤 항목에서 차이가 나는지 확인하세요. 이유 없는 차액이면 고용노동부 1350에 임금체불 진정을 접수하세요. 소멸시효가 3년이라 늦게 발견해도 청구할 수 있어요. 퇴직 후라도 마찬가지예요.",
    tip: "퇴직한 뒤라도 3년 이내면 청구 가능해요. 급여 이체 내역과 계약서를 같이 준비해두세요.",
  },
];

const FAQS = [
  { urgent: true, q: "근로계약서를 못 받았어요. 지금 당장 어떻게 해야 하나요?", a: "고용주에게 서면 근로계약서 교부를 요청하세요. 거부하면 고용노동부(1350) 또는 지방노동청에 진정서를 제출할 수 있어요. 사업주는 500만원 이하 벌금에 처해져요. 신고 전에 근무 기록(카카오톡·문자·출근 기록·급여이체 내역)을 먼저 확보해두면 좋아요." },
  { urgent: true, q: "수습 기간에 최저임금 이하를 받고 있어요. 맞나요?", a: "1년 이상 근로계약을 체결하고 수습 시작 후 3개월 이내에 한해 최저임금의 10%까지 감액할 수 있어요. 단, 단순노무직종은 감액 불가예요. 3개월이 지났는데도 낮은 임금을 주면 임금체불이에요. 근로계약서에 수습 조건이 명시돼 있어야 해요." },
  { urgent: false, q: "계약서에 없는 야근을 시켜요. 거부할 수 있나요?", a: "연장근로는 근로자 동의가 필요해요. 계약서에 고정 연장근로가 명시되지 않았다면 거부할 수 있어요. 연장근로를 했다면 통상임금의 50% 가산해서 수당을 받아야 해요. 미지급 시 임금체불로 신고 가능해요." },
  { urgent: false, q: "계약기간이 끝났는데 자동으로 정규직이 되나요?", a: "기간제 근로자가 같은 사업장에서 2년 초과 근무하면 기간의 정함이 없는 근로계약(사실상 정규직)으로 전환돼요. 단, 고용주가 계약을 갱신하지 않으면 여기서 그치고, 자동 정규직 전환은 아닐 수 있어요. 구체적인 상황은 노동위원회(1350) 또는 대한법률구조공단(132)에 상담하세요." },
  { urgent: false, q: "아르바이트도 근로계약서를 써야 하나요?", a: "네. 하루 1시간이라도 근로를 제공하면 근로계약서 작성·교부 의무가 생겨요. 단기 아르바이트·일용직도 예외 없어요. 쓰지 않으면 사업주가 500만원 이하 벌금 또는 과태료를 받을 수 있어요. 아르바이트도 고용노동부 1350에 신고할 수 있어요." },
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }: any) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
const Bdg = ({ children }: any) => <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;

function MinWageChecker() {
  const [hourly, setHourly] = useState(10320);
  const MIN_WAGE = 10320;
  const monthly = Math.round(hourly * 209);
  const ok = hourly >= MIN_WAGE;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14 }}>⚖️ 2026 최저임금 확인기</p>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>내 시급 (원)</label>
        <input type="number" value={hourly} onChange={(e) => setHourly(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />
      </div>
      <div style={{ background: ok ? GL : "#FEF2F2", borderRadius: 8, padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#374151" }}>2026년 최저임금</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>10,320원</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, borderTop: "1px solid #e5e7eb", paddingTop: 8 }}>
          <span style={{ fontSize: 13, color: "#374151" }}>내 월급 환산 (209시간)</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: ok ? G : "#DC2626" }}>{monthly.toLocaleString()}원</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: ok ? GD : "#DC2626", marginTop: 8 }}>
          {ok ? `✓ 최저임금 이상이에요 (+${(hourly - MIN_WAGE).toLocaleString()}원)` : `✕ 최저임금 위반이에요. 신고 가능해요.`}
        </div>
      </div>
    </div>
  );
}

function RequiredTable() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem" }}>
      {REQUIRED_ITEMS.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 14px", borderBottom: i < REQUIRED_ITEMS.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "flex-start" }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 12, background: row.required ? G : "#e5e7eb", color: row.required ? "#fff" : "#6b7280", flexShrink: 0, marginTop: 2 }}>{row.required ? "필수" : "권장"}</span>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: "0 0 2px" }}>{row.item}</p><p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{row.detail}</p></div>
        </div>
      ))}
    </div>
  );
}

function ViolationGuide() {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {VIOLATIONS.map((v, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
          <button onClick={() => setSel(sel === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", lineHeight: 1.5 }}>{v.situation}</span>
            <span style={{ fontSize: 16, color: "#9ca3af", flexShrink: 0 }}>{sel === i ? "−" : "+"}</span>
          </button>
          {sel === i && (
            <div style={{ padding: "0 14px 14px", borderTop: "1px solid #f3f4f6" }}>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, marginTop: 12 }}>→ {v.action}</p>
              <div style={{ fontSize: 12, color: GD, background: GL, borderRadius: 6, padding: "6px 10px", marginTop: 6 }}>💡 {v.tip}</div>
            </div>
          )}
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

export default function GeunrokyeiyakseoPAge() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>근로 · 임금 · 고용</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          근로계약서 작성 방법 |<br />
          필수 기재사항과 못 받았을 때 대처법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          입사했는데 계약서를 안 줘요. 계약서에 사인했는데 사본을 안 줘요. 계약서 내용이 말로 한 것과 달라요.<br />
          이 중 하나라도 해당하면 사업주가 법을 위반한 거예요. 500만원 이하 벌금 대상이에요.<br /><br />
          지금 당장 할 수 있는 건 고용노동부 1350에 신고하는 거예요. 신고는 익명도 가능해요.<br />
          내 시급이 최저임금 이상인지 먼저 확인해보세요.
        </p>

        <Bdg>내 시급이 최저임금 이상인지 확인해보세요</Bdg>
        <MinWageChecker />

        <Divider />

        <H2>근로계약서 필수 기재사항</H2>
        <p style={body}>
          사업주가 반드시 서면으로 줘야 하는 항목들이에요. 이 항목이 빠지거나 구두로만 전달했다면 위반이에요.<br />
          계약서를 받았더라도 아래 항목이 전부 기재돼 있는지 확인하세요. 빠진 항목은 지금 요청할 수 있어요.
        </p>
        <RequiredTable />
        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>고용노동부 표준근로계약서를 쓰면 편해요</strong>
          고용노동부(moel.go.kr)에서 정규직·계약직·아르바이트용 표준근로계약서 양식을 무료로 내려받을 수 있어요.
        </div>

        <HubLinks />

        <H2>근로계약서 못 받았을 때 대처법</H2>
        <p style={body}>
          신고가 무서워서 참는 분이 많아요. 신고는 익명 가능하고, 신고했다고 해고하면 그게 또 부당해고예요.<br />
          상황에 따라 할 수 있는 행동이 달라요. 내 상황을 선택해보세요.
        </p>
        <ViolationGuide />

        <Divider />
        <H2>근로계약서 필수 기재사항·대처법에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 도움받을 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "고용노동부 민원마당 (1350)", url: "tel:1350", sub: "임금체불·계약서 미교부 신고" },
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 법률상담" },
              { label: "고용노동부 표준근로계약서 양식", url: "https://www.moel.go.kr", sub: "정규직·계약직·아르바이트 양식 무료 제공" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 근로기준법·최저임금법을 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 고용노동부(1350) 또는 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
