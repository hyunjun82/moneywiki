"use client";
// @ts-nocheck
import { useState } from "react";
$BDG
$DIVIDER

// 8번: 소액사건 소장 작성 | 3,000만원 이하 금전 청구 절차와 비용

const SIDEBAR_LINKS = ["가압류 신청 방법","차용증 없이 돈 받기","지급명령 신청","내용증명 보내기","소멸시효 중단","강제집행 신청","민사소송 절차","전자소송 이용","법원 관할 확인","임금체불 소송","보증금 반환 소송","손해배상 청구","계약금 반환 청구","물품대금 청구","대여금 반환 청구","나홀로 민사소송","인지대 계산","송달료 계산","소장 작성 방법","법률구조공단 상담"];

const HUB_LINKS = [
  { title: "가압류 신청 방법 | 비용·절차·재산 유형별", desc: "소송 전 채무자 재산 먼저 묶기", href: "#" },
  { title: "차용증 없이 빌려준 돈 받는 방법 | 이체 내역으로 소송", desc: "증거 없어도 청구 가능한 방법", href: "#" },
  { title: "오래된 가압류 해제 방법 | 소멸시효·취소 신청 절차", desc: "3년 이상 방치된 가압류 취소", href: "#" },
  { title: "처분금지가처분 신청 조건 | 부동산 매매·담보 기준", desc: "부동산 처분 막는 가처분 신청", href: "#" },
];

const STAMP_RATES = [
  { range: "1,000만원 이하", rate: "소가 × 0.5%", min: "1,000원 이상" },
  { range: "1,000만원 초과 ~ 3,000만원 이하", rate: "50,000원 + (소가 - 1,000만원) × 0.45%", min: "" },
];

const CLAIM_STEPS = [
  {
    title: "소장 작성 — 청구원인이 핵심이에요",
    desc: "소장에서 가장 중요한 건 청구원인이에요. '언제, 얼마를, 왜 줬고, 언제까지 갚기로 했는데 아직 안 갚았다'를 구체적으로 쓰면 돼요. 예시: '2024년 3월 5일 피고에게 카카오뱅크 계좌로 300만원을 이체하였고, 피고는 2024년 6월 5일까지 변제하기로 하였으나 현재까지 갚지 않고 있다.' 법원 전자민원센터(help.scourt.go.kr)에 소액사건 소장 기재례가 있어요. 그대로 따라 쓰면 돼요.",
    link: { label: "법원 전자민원센터 — 소장 기재례", url: "https://help.scourt.go.kr" },
  },
  {
    title: "인지대·송달료 납부 후 소장 제출",
    desc: "인지대는 청구금액 × 0.5%예요. 500만원 청구면 25,000원이에요. 전자소송으로 내면 10% 할인돼요. 관할 법원은 피고 주소지 법원이에요. 전자소송(ecfs.scourt.go.kr)으로 집에서 제출하면 법원 방문 없이 돼요. 제출하면 사건번호가 나오고, 대법원 나의사건검색에서 진행 상황을 확인할 수 있어요.",
    link: { label: "대법원 전자소송", url: "https://ecfs.scourt.go.kr" },
  },
  {
    title: "이행권고결정 — 피고가 14일 내 이의 없으면 끝",
    desc: "법원이 소장을 검토하고 청구가 정당하면 피고에게 이행권고결정을 보내요. '이 금액을 원고에게 갚으라'는 내용이에요. 피고가 14일 안에 이의신청을 하지 않으면 확정판결과 같은 효력이 생겨요. 이 단계에서 끝나면 소송 기간 1~2개월이에요. 피고가 이의신청을 하면 변론기일이 잡혀요.",
    tip: "변론기일이 잡히면 반드시 출석하세요. 원고가 출석하지 않으면 소가 취하된 것으로 간주될 수 있어요.",
  },
  {
    title: "판결 받은 뒤 — 안 갚으면 강제집행",
    desc: "승소 판결이 확정됐는데 피고가 계속 안 갚으면 강제집행을 신청하면 돼요. 피고 예금 계좌에 채권압류, 급여에 압류, 부동산에 경매를 신청할 수 있어요. 피고 재산이 어디 있는지 모르면 법원에 재산명시신청을 해서 피고가 재산 목록을 법원에 제출하게 만들 수 있어요. 강제집행까지 생각하면 소송 전에 가압류를 먼저 신청해두는 게 안전해요.",
  },
];

const FAQS = [
  { urgent: true, q: "소장에 뭘 적어야 할지 모르겠어요. 도움받을 곳이 있나요?", a: "대한법률구조공단(132)에서 소장 작성 도움을 무료로 받을 수 있어요. 기준 중위소득 125% 이하이면 소송 수행까지 지원해줘요. 법원 전자민원센터(help.scourt.go.kr)에도 소장 양식과 기재례가 있어요." },
  { urgent: true, q: "차용증이 없어요. 이체 내역만 있는데 소송이 가능한가요?", a: "네. 통장 이체 내역은 금전 이동의 증거가 돼요. '빌려준 것인지, 선물인지'를 다투는 경우가 있는데, 이체 시 메모란에 '대여' 표시가 있거나 반환 요청 카카오톡·문자가 있으면 더 유리해요. 증거가 부족하면 대한법률구조공단(132)에 먼저 상담하세요." },
  { urgent: false, q: "피고가 어디 사는지 모르면 소장을 어디에 내야 하나요?", a: "소액사건은 원칙적으로 피고 주소지 관할 법원에 제출해요. 피고 주소를 모르면 주민등록법상 열람 신청 또는 법원에 주소 보정 명령을 신청할 수 있어요. 전자소송으로 제출 후 주소 보정 절차를 밟는 방법도 있어요." },
  { urgent: false, q: "승소했는데 피고가 안 갚아요. 어떻게 하나요?", a: "판결이 확정되면 강제집행을 신청할 수 있어요. 피고의 예금(은행 계좌 채권 압류), 급여(급여 채권 압류), 부동산(경매)에 강제집행이 가능해요. 피고 재산을 모른다면 재산명시신청 또는 채무불이행자 명부 등재를 활용해 재산을 파악할 수 있어요." },
  { urgent: false, q: "소액사건 판결이유에 아무것도 안 적혀있어요. 항소할 수 있나요?", a: "소액사건은 법원이 판결 이유를 생략할 수 있어요. 항소는 지방법원 합의부에 할 수 있지만, 소액사건은 상고(대법원)에 제한이 있어요. 헌법 위반, 명백한 법률 위반 등 특수한 경우에만 상고가 허용돼요." },
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }: any) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
const Bdg = ({ children }: any) => <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;

function CostCalculator() {
  const [amount, setAmount] = useState(500);
  const [parties, setParties] = useState(2);
  const [electronic, setElectronic] = useState(false);
  const stamp = Math.max(1000, Math.round(amount * 10000 * 0.005));
  const stampFinal = electronic ? Math.round(stamp * 0.9) : stamp;
  const delivery = parties * 10 * 5200;
  const total = stampFinal + delivery;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14 }}>💰 소액사건 소송 비용 계산기</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>청구금액 (만원)</label>
          <input type="number" value={amount} min={1} max={3000} onChange={(e) => setAmount(Math.min(3000, Number(e.target.value)))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />
          {amount > 3000 && <p style={{ fontSize: 11, color: "#DC2626", margin: "4px 0 0" }}>3,000만원 초과 → 소액사건 아님</p>}
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>당사자 수</label>
          <select value={parties} onChange={(e) => setParties(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}>
            {[2,3,4].map(n => <option key={n} value={n}>{n}명</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[{ v: false, l: "서면" }, { v: true, l: "전자소송 (10% 할인)" }].map(opt => (
          <button key={String(opt.v)} onClick={() => setElectronic(opt.v)} style={{ flex: 1, padding: "8px 0", borderRadius: 6, fontSize: 12, cursor: "pointer", border: `1px solid ${electronic === opt.v ? G : "#d1d5db"}`, background: electronic === opt.v ? GL : "#fff", color: electronic === opt.v ? GD : "#374151" }}>{opt.l}</button>
        ))}
      </div>
      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px" }}>
        {[
          { label: `인지대 (청구금액 × 0.5%${electronic ? ", 10% 할인" : ""})`, val: stampFinal.toLocaleString() + "원" },
          { label: `송달료 (${parties}명 × 10회)`, val: delivery.toLocaleString() + "원" },
        ].map((row, i, arr) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: i < arr.length - 1 ? "1px solid #e5e7eb" : "none" }}>
            <span style={{ fontSize: 13, color: "#374151" }}>{row.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{row.val}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 4, borderTop: "2px solid #e5e7eb" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>예상 총 비용</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: G }}>{total.toLocaleString()}원</span>
        </div>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, lineHeight: 1.7 }}>승소하면 소송비용을 상대방에게 청구할 수 있어요.</p>
      </div>
    </div>
  );
}

function ProcessSteps() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
      {CLAIM_STEPS.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            {i < CLAIM_STEPS.length - 1 && <div style={{ width: 2, flex: 1, background: "#e5e7eb", minHeight: 20 }} />}
          </div>
          <div style={{ paddingBottom: i < CLAIM_STEPS.length - 1 ? 20 : 0, flex: 1 }}>
            <strong style={{ fontSize: 14, color: "#111", display: "block", marginBottom: 4, lineHeight: 1.5 }}>{step.title}</strong>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 4px" }}>{step.desc}</p>
            {step.tip && <div style={{ fontSize: 12, color: GD, background: GL, borderRadius: 6, padding: "6px 10px", marginTop: 6 }}>💡 {step.tip}</div>}
            {step.link && <a href={step.link.url} style={{ fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", display: "inline-block", marginTop: 6 }}>→ {step.link.label}</a>}
          </div>
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>채권·소송 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SoaekSagunPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>민사소송 · 소액사건 · 채권 회수</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          소액사건 소장 작성 |<br />
          3,000만원 이하 금전 청구 절차와 비용
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          빌려준 돈을 안 갚아요. 계약금을 돌려주지 않아요. 물건값을 못 받고 있어요.<br />
          3,000만원 이하라면 소액사건으로 처리돼요. 변호사 없이 혼자 할 수 있고, 인지대는 청구금액의 0.5%예요.<br /><br />
          가장 빠른 방법은 이행권고결정이에요. 소장을 내면 법원이 상대방에게 "갚아라"는 결정문을 먼저 보내줘요.<br />
          상대방이 14일 내에 이의하지 않으면 판결과 같은 효력이 생겨서 바로 강제집행할 수 있어요.
        </p>

        <Bdg>청구금액 입력해서 비용 확인해보세요</Bdg>
        <CostCalculator />

        <Divider />

        <H2>3,000만원 이하 금전 청구 소액사건, 일반 소송과 다른 점</H2>
        <p style={body}>
          일반 민사소송은 답변서 제출, 변론준비기일, 변론기일이 여러 번 열려서 1년 이상 걸리는 경우가 많아요.<br />
          소액사건은 이행권고결정으로 변론 없이 끝나거나, 변론을 하더라도 1회로 끝내는 게 원칙이에요.<br />
          첫 변론기일에 모든 증거를 다 가져가야 해요. 그 날 못 내면 다음 기회가 없을 수 있어요.
        </p>
        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>소액사건 핵심 장점 — 이게 다 돼요</strong>
          ① 이행권고결정 → 상대방이 14일 내 이의 없으면 변론 없이 확정, 강제집행 가능<br />
          ② 1회 변론 원칙 → 빠르면 접수 후 30일 내 선고<br />
          ③ 배우자·직계혈족이 대리 가능 → 위임장만 있으면 됨<br />
          ④ 법원 창구에서 구두로 소 제기 가능 → 소장 직접 못 써도 됨
        </div>

        <HubLinks />

        <H2>소액사건 소장 작성부터 금전 청구 판결까지 절차</H2>
        <p style={body}>
          소장에서 가장 중요한 부분은 청구원인이에요. "언제, 얼마를, 왜 빌려줬고, 언제까지 갚기로 했는데 아직 안 갚았다"를 구체적으로 쓰면 돼요.<br />
          법원 전자민원센터(help.scourt.go.kr)에 소액사건 소장 기재례가 있어요. 그대로 따라 쓰면 돼요.
        </p>
        <ProcessSteps />

        <Divider />
        <H2>3,000만원 이하 청구 절차·비용에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 시작할 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대법원 전자소송 (ecfs.scourt.go.kr)", url: "https://ecfs.scourt.go.kr", sub: "온라인으로 소장 제출" },
              { label: "대법원 전자민원센터 — 소장 양식", url: "https://help.scourt.go.kr", sub: "소액사건 소장 양식 무료 제공" },
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 법률상담·소장 작성 지원" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 소액사건심판법·찾기쉬운 생활법령을 바탕으로 작성됐어요.
        </div>
      </div>
    </div>
  );
}
