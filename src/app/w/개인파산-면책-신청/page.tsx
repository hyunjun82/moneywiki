"use client";
// @ts-nocheck
import { useState } from "react";
$BDG
$DIVIDER

// 5번: 개인파산 면책 신청 | 비용·절차·면책 안 되는 빚
// 4번과 주제가 겹치므로 비용·면책불가 채무 중심으로 차별화

const SIDEBAR_LINKS = ["개인파산 면책 신청 방법","개인회생 신청 방법","신용회복위원회 상담","채무조정 신청","파산 후 자격 제한","파산 복권 방법","압류금지 재산","급여 압류 해제","소액사건 소장 작성","임금체불 신고","가압류 신청 방법","차용증 없이 돈 받기","강제집행 신청","대한법률구조공단","국민행복기금 신청","서울회생법원","파산 면책 시간","개인회생 변제금 계산","파산 기록 조회","신용등급 회복 방법"];

const HUB_LINKS = [
  { title: "개인파산 면책 신청 방법 | 절차·비용·자격", desc: "처음부터 순서대로 신청하는 방법", href: "#" },
  { title: "소액사건 소장 작성 | 3,000만원 이하 금전 청구", desc: "채권자 입장에서 돈 받는 소송", href: "#" },
  { title: "가압류 신청 방법 | 비용·절차·재산 유형별", desc: "채무자 재산 먼저 묶는 방법", href: "#" },
  { title: "차용증 없이 빌려준 돈 받는 방법", desc: "이체 내역으로 소송하기", href: "#" },
];

const COST_TABLE = [
  { item: "인지대 (파산신청)", amount: "1,000원", note: "전자신청 900원" },
  { item: "인지대 (면책신청)", amount: "1,000원", note: "전자신청 900원" },
  { item: "기본 송달료", amount: "약 11만원~", note: "55,000 × 2 (채권자 없을 때)" },
  { item: "채권자 1명 추가 송달료", amount: "약 3만원~", note: "채권자 수에 비례 증가" },
  { item: "관재인형 예납금 (재산 있는 경우)", amount: "법원 결정", note: "최대 500만원 상한" },
];

const NO_DISCHARGE = [
  { type: "세금·공과금", desc: "국세·지방세·4대 보험료·관세 등" },
  { type: "벌금·과태료·추징금", desc: "형사처벌로 인한 모든 금전 제재" },
  { type: "고의 불법행위 배상금", desc: "사기·횡령·배임으로 인한 손해배상" },
  { type: "양육비·부양료", desc: "이혼 후 자녀 양육비, 부모 부양 의무" },
  { type: "누락된 채권자 채권", desc: "채권자 목록에 빠진 채권은 면책 제외" },
  { type: "근로자 임금·퇴직금", desc: "사업자 파산 시 임직원 체불 임금" },
];

const FAQS = [
  { urgent: true, q: "신청 비용이 없어요. 어떻게 해야 하나요?", a: "대한법률구조공단(132)에 소송구조를 신청하면 인지대·송달료 납부를 지원받을 수 있어요. 기초생활수급자·장애인은 비용 전부 무료이고, 기준 중위소득 125% 이하인 분은 비용 일부 지원을 받아요. 신청 전 132에 전화해서 소송구조 신청이 가능한지 먼저 확인하세요." },
  { urgent: true, q: "채권자 목록에 일부 빚을 빠뜨렸어요. 어떻게 되나요?", a: "채권자 목록에 누락된 채권은 면책의 효력이 미치지 않아요. 즉, 면책결정이 나도 그 채권자에게는 계속 빚을 갚아야 해요. 신청서 제출 전 반드시 모든 채권자를 목록에 기재하세요. 제출 후 누락을 발견하면 법원에 보정서를 제출해서 추가할 수 있어요." },
  { urgent: false, q: "면책불허가 결정을 받았어요. 어떻게 하나요?", a: "면책불허가결정에 대해 즉시항고를 할 수 있어요. 결정을 고지받은 날부터 1주일 이내에 면책불허가결정을 한 법원에 즉시항고장을 제출하면 돼요. 항고 이유를 구체적으로 기재하고 소명자료를 첨부하세요. 대한법률구조공단(132)에 도움을 요청할 수 있어요." },
  { urgent: false, q: "파산 선고 후 취업하면 소득을 빼앗기나요?", a: "아니에요. 파산 선고 후 새로 취업해서 생긴 소득은 파산재단에 포함되지 않아요(자유재산). 이미 파산 선고가 났다면 이후 취업 소득은 본인 것이에요. 다만 파산 선고 전에 이미 발생한 급여채권은 파산재단에 포함돼요." },
  { urgent: false, q: "파산하면 집은 어떻게 되나요?", a: "거주용 주택도 파산재단에 포함돼요. 다만 파산관재인이 처분 시 임차인 보증금이나 세입자 보호 절차를 거쳐요. 동시폐지형(재산이 거의 없는 경우)이면 처분 절차 없이 바로 면책 단계로 넘어가요. 보유 재산 규모에 따라 다르니 상담을 통해 확인하세요." },
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }: any) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
const Bdg = ({ children }: any) => <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;

function CostCalculator() {
  const [creditors, setCreditors] = useState(5);
  const [electronic, setElectronic] = useState(false);
  const stamp = electronic ? 1800 : 2000;
  const baseDelivery = 55000 * 2;
  const creditorDelivery = creditors * (55000 + creditors * 3 * 5200);
  const total = stamp + baseDelivery + Math.round(creditors * 38500);
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14 }}>💰 파산·면책 신청 비용 계산기</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>채권자 수</label>
          <input type="number" value={creditors} min={1} max={50} onChange={(e) => setCreditors(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>신청 방식</label>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {[{ v: false, l: "서면" }, { v: true, l: "전자소송" }].map(opt => (
              <button key={String(opt.v)} onClick={() => setElectronic(opt.v)} style={{ flex: 1, padding: "8px 0", borderRadius: 6, fontSize: 12, cursor: "pointer", border: `1px solid ${electronic === opt.v ? G : "#d1d5db"}`, background: electronic === opt.v ? GL : "#fff", color: electronic === opt.v ? GD : "#374151" }}>{opt.l}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px" }}>
        {[
          { label: `인지대 (파산+면책)`, val: stamp.toLocaleString() + "원" },
          { label: `기본 송달료`, val: baseDelivery.toLocaleString() + "원" },
          { label: `채권자 ${creditors}명 추가 송달료 (추정)`, val: Math.round(creditors * 38500).toLocaleString() + "원~" },
        ].map((row, i, arr) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: i < arr.length - 1 ? "1px solid #e5e7eb" : "none" }}>
            <span style={{ fontSize: 13, color: "#374151" }}>{row.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{row.val}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 4, borderTop: "2px solid #e5e7eb" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>예상 총 비용</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: G }}>{total.toLocaleString()}원~</span>
        </div>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>실제 법원 청구액과 다를 수 있어요. 대한법률구조공단(klac.or.kr) 소송비용 자동계산기로 정확히 확인하세요.</p>
      </div>
    </div>
  );
}

function NoDischargTable() {
  return (
    <div style={{ border: "1px solid #FEE2E2", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem" }}>
      {NO_DISCHARGE.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 14px", borderBottom: i < NO_DISCHARGE.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "flex-start" }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 12, background: "#FEE2E2", color: "#DC2626", flexShrink: 0, marginTop: 2 }}>면책불가</span>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: "0 0 2px" }}>{row.type}</p><p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{row.desc}</p></div>
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>파산·채무 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ParasanMyeonchackCostPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>개인파산 · 면책 · 채무 해방</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          개인파산 면책 신청 |<br />
          비용·절차·면책 안 되는 빚
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          파산 신청하러 가기 전에 두 가지만 먼저 확인해야 해요.<br />
          내 빚이 면책되는 빚인지, 비용을 낼 수 있는지예요.<br /><br />
          비용은 채권자 5명 기준 약 30만원이에요. 돈이 없으면 법률구조공단에서 대신 내줘요.<br />
          채권자 수만 입력하면 내 예상 비용이 바로 나와요.
        </p>

        <Bdg>채권자 수 입력해서 비용 확인해보세요</Bdg>
        <CostCalculator />

        <Divider />

        <H2>개인파산 면책 안 되는 빚 — 세금·양육비·불법행위 배상금</H2>
        <p style={body}>
          파산을 결심하기 전에 반드시 확인해야 해요. 면책 안 되는 빚이 주라면 파산해도 빚이 안 없어져요.<br />
          아래 목록에 해당하는 빚이 전체의 절반 이상이라면, 파산 전에 132에 전화해서 다른 방법이 있는지 먼저 물어보세요.
        </p>
        <NoDischargTable />
        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>이것만 기억해요</strong>
          카드빚·은행 대출·사업 빚·친구에게 빌린 돈 등 일반 금전채무는 면책 가능해요.<br />
          세금·양육비·고의 불법행위 배상금은 면책 불가예요. 어느 쪽인지 헷갈리면 132에 상담하세요.
        </div>

        <HubLinks />

        <H2>개인파산 면책 신청 비용 — 인지대·송달료 항목별 안내</H2>
        <p style={body}>
          파산·면책 신청 비용에서 가장 큰 변수는 채권자 수예요. 채권자 1명 추가될수록 송달료가 약 3~4만원 늘어나요.<br />
          비용을 낼 돈이 없어도 포기하지 마세요. 대한법률구조공단 소송구조 신청 → 심사 통과 → 공단이 비용 대납해줘요.<br />
          기초생활수급자·장애인은 심사 없이 무료예요.
        </p>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr", gap: 8, padding: "8px 14px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>항목</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>금액</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>비고</span>
          </div>
          {COST_TABLE.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr", gap: 8, padding: "10px 14px", borderBottom: i < COST_TABLE.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <span style={{ fontSize: 13, color: "#111" }}>{row.item}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: G }}>{row.amount}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{row.note}</span>
            </div>
          ))}
        </div>

        <Divider />
        <H2>개인파산 면책 비용·절차·면책 안 되는 빚에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 도움받을 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 상담·소송구조 신청" },
              { label: "서울회생법원 (02-530-1672)", url: "tel:025301672", sub: "파산·면책 전문 법원" },
              { label: "신용회복위원회 (1600-5500)", url: "tel:16005500", sub: "파산 전 채무조정 상담" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 서울회생법원 또는 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
