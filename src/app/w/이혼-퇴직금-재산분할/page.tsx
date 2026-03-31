"use client";
import { useState } from "react";

const SIDEBAR_LINKS = [
  "이혼 재산분할 비율","재산분할 대상 범위","재산분할 청구기한","이혼 시부모 증여 토지",
  "이혼 위자료 청구","이혼 전 재산 빼돌림","이혼 친권·양육권","이혼 양육비 청구",
  "협의이혼 절차","이혼 무료 법률상담","이혼 재산분할 집 취득세","이혼 빚 공동부담",
  "이혼 소송 증거 수집","별거 중 이혼","이혼 일방 거부","이혼 소송 기간",
  "이혼 소송 비용","이혼 후 공동명의","위자료 소멸시효","대한법률구조공단",
];

const HUB_LINKS = [
  { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "퇴직금 포함 재산분할 비율 기준", href: "#" },
  { title: "재산분할 대상 범위 | 혼인 전 재산·퇴직금·부모 증여 포함 여부", desc: "어떤 재산이 분할 대상인지 확인", href: "#" },
  { title: "이혼 전 재산 빼돌림 대비 | 처분금지가처분·가압류", desc: "퇴직금 빼돌림 막는 방법", href: "#" },
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
];

const FAQS = [
  { urgent: true,
    q: "남편이 아직 재직 중인데 퇴직금도 재산분할을 받을 수 있나요?",
    a: "네. 대법원 전원합의체(2013므2250, 2014. 7. 16.) 판례에 따라, 이혼 소송 사실심 변론종결 시점에 퇴직할 경우 받을 수 있는 퇴직금 상당액은 재산분할 대상이에요. '지금 당장 퇴직하면 받을 금액'이 기준이에요. 이혼 소장에 이 금액을 적극재산으로 포함해서 청구하세요." },
  { urgent: true,
    q: "퇴직금 중 혼인 전 근무 기간 분은 분할 대상인가요?",
    a: "혼인 전 근무 기간 분은 특유재산이라 원칙적으로 분할 대상이 아니에요. 분할 대상은 혼인 기간 동안의 근무 기간에 해당하는 비율분이에요. 총 재직 20년 중 혼인 기간이 15년이라면 15/20 비율분이 분할 대상이에요. 단, 혼인 전 분에 대해서도 배우자 기여가 인정되면 예외적으로 포함될 수 있어요." },
  { urgent: false,
    q: "퇴직금은 나중에 받는 건데 지금 현금으로 받을 수 있나요?",
    a: "재산분할 판결에서 현재 예상 퇴직금 상당액을 지금 현금으로 지급하라고 명할 수 있어요. 또는 실제 퇴직 시 지급하기로 하는 조건부 판결도 가능해요. 협의이혼이라면 합의서에 '퇴직 시 퇴직금의 ○○% 지급'으로 명시하고 공정증서로 만들어두세요." },
  { urgent: false,
    q: "공무원 배우자의 퇴직금도 분할 받을 수 있나요?",
    a: "공무원 퇴직연금은 공무원연금공단에 분할연금을 청구할 수 있어요. 분할 비율은 당사자 합의 또는 법원이 결정해요. 퇴직수당은 이혼 소송에서 별도로 재산분할 청구해야 해요(대법원 2017므11917). 군인연금·사학연금도 동일한 방식으로 처리돼요." },
  { urgent: false,
    q: "퇴직금을 가압류로 미리 묶어둘 수 있나요?",
    a: "퇴직금 채권도 가압류 대상이에요. 다만 퇴직금은 실제 퇴직 전까지는 채권으로만 존재하기 때문에 퇴직금 채권 가압류 형태로 신청해요. 이혼 소장 제출 전에도 신청할 수 있어요. 132에 상담하세요." },
];

const REFERENCES = [
  { category: "법령 및 판례", items: [
    { label: "민법 제839조의2 — 재산분할청구권", url: "https://www.law.go.kr/" },
    { label: "대법원 2013므2250 전합 (2014. 7. 16.) — 재직 중 퇴직금도 재산분할 대상", url: "https://www.law.go.kr/LSW//precInfoP.do?precSeq=187486" },
    { label: "대법원 2017므11917 — 공무원 퇴직수당 재산분할 대상", url: "https://www.law.go.kr/" },
    { label: "근로자퇴직급여보장법 — 퇴직금 계산 기준", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 재산분할 대상 (2025. 11. 15. 기준)", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=233&ccfNo=4&cciNo=2&cnpClsNo=2" },
    { label: "공무원연금공단 — 분할연금 안내", url: "https://www.geps.or.kr" },
    { label: "대한법률구조공단 (132)", url: "tel:132" },
  ]},
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: any) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }: any) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }: any) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}
    </div>
  );
}
function BorderBox({ title, children }: any) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    working: { title: "배우자가 아직 재직 중이에요", color: G, bg: GL,
      text: "2014년 대법원 전원합의체 판결로 재직 중 퇴직금도 분할 대상이에요. '지금 퇴직하면 받을 금액'을 기준으로 이혼 소장에 적극재산으로 포함해서 청구하세요. 132에 상담하세요." },
    retired: { title: "배우자가 이미 퇴직했어요", color: "#7C3AED", bg: "#F5F3FF",
      text: "이미 수령한 퇴직금은 당연히 재산분할 대상이에요. 퇴직금이 어디 있는지 모른다면 이혼 소장 제출 후 재산명시 명령을 신청하세요. 가압류로 미리 묶어두는 것도 방법이에요." },
    civil: { title: "공무원·군인·교직원이에요", color: "#DC2626", bg: "#FEF2F2",
      text: "퇴직연금은 공무원연금공단·군인공제회·사학연금에 분할연금을 청구하고, 퇴직수당은 이혼 소송 재산분할로 별도 청구해야 해요. 이혼 소장 제출 시 둘 다 반드시 포함하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 배우자 상황이 어떤가요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "working", label: "배우자가 아직 재직 중이에요." },
          { id: "retired", label: "배우자가 이미 퇴직했어요." },
          { id: "civil",   label: "배우자가 공무원·군인·교직원이에요." },
        ].map((item) => (
          <button key={item.id} onClick={() => setType(item.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
  const m = msgs[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button onClick={() => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function Calculator() {
  const [total, setTotal] = useState(5000);
  const [married, setMarried] = useState(15);
  const [service, setService] = useState(20);
  const [contrib, setContrib] = useState(40);
  const ratio = Math.min(married / Math.max(service, 1), 1);
  const target = Math.round(total * ratio);
  const share = Math.round(target * contrib / 100);
  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>참고용 계산기예요. 실제 금액은 법원이 기여도·재직기간·퇴직금 규모를 종합해 결정해요.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { label: `예상 퇴직금 (만원): ${total.toLocaleString()}`, val: total, set: setTotal, min: 500, max: 30000, step: 500 },
          { label: `혼인 기간 (년): ${married}`, val: married, set: setMarried, min: 1, max: 40, step: 1 },
          { label: `전체 재직기간 (년): ${service}`, val: service, set: setService, min: 1, max: 40, step: 1 },
          { label: `배우자 기여도 (%): ${contrib}`, val: contrib, set: setContrib, min: 10, max: 50, step: 5 },
        ].map((s, i) => (
          <div key={i}>
            <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>{s.label}</label>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e => s.set(+e.target.value)} style={{ width: "100%", accentColor: G }} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { label: "분할 대상 퇴직금", val: `${target.toLocaleString()}만원`, sub: `혼인비율 ${Math.round(ratio*100)}%` },
          { label: "배우자 청구 가능액", val: `${share.toLocaleString()}만원`, sub: `기여도 ${contrib}%` },
          { label: "혼인/재직 비율", val: `${Math.round(ratio*100)}%`, sub: `${married}년 / ${service}년` },
        ].map((c, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "10px 12px" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>{c.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: i === 1 ? G : "#111" }}>{c.val}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{c.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10 }}>대법원 2013므2250 판결 기준 참고치예요. 실제 기여도와 퇴직금은 법원이 구체적으로 결정해요.</p>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)}
            style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff" }}>
            <span>
              {f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 퇴직금·재산분할 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>퇴직금을 누락 없이 청구하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>이혼 소장 작성 전에<br />132에 무료 상담받으세요.</p>
      <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
        <a href="tel:132" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>📞 법률구조공단 132</a>
        <a href="https://ecfs.scourt.go.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}` }}>🌐 전자소송</a>
      </div>
    </div>
  );
}

function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />출처 및 참고자료
      </h3>
      {REFERENCES.map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
              <a key={item.label} href={item.url}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 법령·판례·공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼·퇴직금 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function IhonToeJikGumPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 퇴직금 · 재산분할</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 퇴직금 재산분할 |<br />
          재직 중 퇴직금도 분할 받을 수 있어요
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          "아직 퇴직을 안 했는데 퇴직금을 어떻게 나눠요?"<br />
          2014년 대법원 전원합의체 판결로 이 질문의 답이 바뀌었어요.<br /><br />
          이혼 소송 변론종결 시점에 퇴직할 경우 받을 수 있는 퇴직금은 재산분할 대상이에요.<br />
          지금 내 몫이 얼마인지 먼저 계산해보세요.
        </p>

        <UrgentBanner />

        {/* H2 ① */}
        <Bdg>퇴직금 분할 금액 계산해보세요</Bdg>
        <H2>내 퇴직금 분할 금액 계산해보세요</H2>
        <p style={body}>
          혼인 기간, 전체 재직기간, 배우자 기여도를 입력하면 참고 금액이 나와요.<br />
          계산 공식: 예상 퇴직금 × (혼인기간 ÷ 재직기간) × 기여도
        </p>
        <Calculator />
        <GreenBox title="대법원 2013므2250 전합 — 2014년 바뀐 핵심">
          변경 전: 이혼 당시 이미 퇴직해서 수령한 경우만 분할 대상<br />
          변경 후: 재직 중이어도 변론종결 시점에 퇴직할 경우 받을 금액이 분할 대상<br />
          분할 범위: 혼인 기간 중 근무 기간에 해당하는 비율분만 대상<br />
          명예퇴직금: 이미 수령했으면 전액 분할 대상
        </GreenBox>

        <HubLinks />

        <Divider />

        {/* H2 ② */}
        <H2>퇴직금 종류별로 청구 방법이 달라요</H2>
        <p style={body}>
          일반 직장인인지, 공무원·군인·교직원인지에 따라 청구하는 기관과 방법이 달라요.
        </p>
        <BorderBox title="일반 근로자 퇴직금">
          이혼 소장에 퇴직금 상당액을 적극재산으로 포함해서 청구<br />
          상대방이 퇴직 전이면 퇴직금 채권 가압류로 미리 묶어둘 수 있어요<br />
          협의이혼 시: 합의서에 '퇴직 시 퇴직금의 ○○% 지급' 명시 + 공정증서 작성
        </BorderBox>
        <BorderBox title="공무원·군인·교직원 퇴직연금 및 퇴직수당">
          퇴직연금 분할: 공무원연금공단·군인공제회·사학연금공단에 분할연금 청구<br />
          분할 비율: 당사자 합의 또는 법원이 결정 (혼인기간 중 재직기간 비율 기준)<br />
          퇴직수당: 이혼 소송 재산분할로 별도 청구 필요 (공무원연금법에 분할청구 규정 없음)<br />
          근거: 대법원 2017므11917 — 공무원 퇴직수당은 재산분할 대상
        </BorderBox>

        <Divider />

        {/* H2 ③ */}
        <H2>퇴직금 재산분할, 이혼 소장에 이렇게 포함시켜요</H2>
        <p style={body}>
          퇴직금을 이혼 소장에 빠뜨리면 나중에 별도로 청구해야 해요.<br />
          이혼 후 재산분할 청구기한은 2년이에요. 처음부터 포함하는 게 유리해요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
          {[
            { n: 1, title: "퇴직금 규모 파악",
              desc: "급여명세서·재직증명서로 예상 퇴직금을 계산하세요. 공무원이면 공무원연금공단 홈페이지에서 예상 연금액을 조회할 수 있어요." },
            { n: 2, title: "혼인기간 비율 계산",
              desc: "전체 재직기간 중 혼인 기간에 해당하는 비율을 계산해요. (혼인 기간 ÷ 전체 재직기간) × 예상 퇴직금 = 분할 대상 금액이에요." },
            { n: 3, title: "이혼 소장에 적극재산으로 명시",
              desc: "이혼 소장의 재산목록에 '퇴직금 채권 ○○○만원'으로 기재해요. 132에서 소장 작성을 무료로 도와줘요." },
            { n: 4, title: "필요 시 가압류로 먼저 보전",
              desc: "배우자가 퇴직금을 수령하기 전에 가압류를 신청하면 퇴직금이 지급될 때 자동으로 압류돼요. 소장 제출 전에도 신청 가능해요." },
          ].map((s, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
              {i < arr.length - 1 && <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />}
              <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* H2 ④ */}
        <H2>퇴직금 재산분할에서 자주 놓치는 것들</H2>
        <p style={body}>
          퇴직금을 포함했다고 생각했지만 실제로 빠진 경우가 많아요.
        </p>
        <BorderBox title="이것도 분할 대상이에요">
          재직 중 퇴직금: 변론종결 시점 기준 예상액 (2013므2250 전합)<br />
          이미 수령한 퇴직금: 예금 등에 남아있으면 당연히 대상<br />
          명예퇴직금: 이미 수령했으면 전액 대상<br />
          공무원 퇴직수당: 이혼 소송 재산분할로 별도 청구 필요 (2017므11917)
        </BorderBox>
        <BorderBox title="분할 대상에서 제외돼요">
          혼인 전 근무 기간에 해당하는 비율분 (원칙적으로 특유재산)<br />
          다만, 배우자가 혼인 전 재직 기간의 유지에 기여했다면 예외적으로 포함 가능
        </BorderBox>

        <Divider />

        {/* H2 ⑤ FAQ */}
        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 각종 신고·불복 청구 등의 증거자료로 쓸 수 없어요. 개별 사안에 따라 결과가 달라질 수 있으니, 구체적인 상황은 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
