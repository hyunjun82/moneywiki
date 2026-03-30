import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 근로자퇴직급여보장법 제22조·시행령 제3조, KB금융 안내자료
// 법정사유: 무주택자 주거 목적 전세금·임차보증금
// 인출가능유형: DC형, IRP (DB형 불가)
// 인출한도: 임대차계약서 금액 한도 (적립금 전액 아님)
// DC형_보증금_횟수: 동일 사업장 1회 한정
// IRP_보증금_횟수: 횟수 제한 없음
// 세금_회사부담금_운용손익: 퇴직소득세 (근속연수 따라 다름)
// 세금_개인부담금_운용손익: 기타소득세 16.5% (세액공제 받은 금액)
// 기타소득세율: 16.5% (소득세 15% + 지방소득세 1.5%)
// 무주택기준: 본인 + 배우자 모두 무주택
// 심사기간: 3~7영업일

const DOCS = [
  { name: "주민등록등본",        required: true,  where: "정부24 또는 주민센터 (무주택 확인용)" },
  { name: "임대차계약서",        required: true,  where: "계약서 원본 또는 공증본 (보증금 금액 확인)" },
  { name: "무주택확인서",        required: true,  where: "등기사항전부증명서 또는 건축물대장 (본인·배우자)" },
  { name: "중도인출 신청서",     required: true,  where: "금융기관 앱·홈페이지 또는 회사 인사팀" },
  { name: "신분증 사본",         required: true,  where: "주민등록증·운전면허증" },
  { name: "통장 사본",           required: false, where: "인출금 받을 계좌 (금융기관 따라 다름)" },
];

const STEPS = [
  {
    n: "1",
    title: "내 퇴직연금 유형 확인",
    desc: "DC형 또는 IRP만 중도인출 가능해요. DB형이라면 인출 안 돼요. 금융기관 앱 또는 회사 인사팀에 확인하세요.",
    tip: "금감원 통합연금포털에서 내 퇴직연금 유형 조회 가능",
    link: { label: "통합연금포털 조회", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
  },
  {
    n: "2",
    title: "서류 준비",
    desc: "임대차계약서, 주민등록등본, 무주택확인서, 중도인출 신청서가 핵심이에요. 계약서 서명 전에는 신청 불가해요.",
    tip: "계약서 작성 후 → 잔금 지급일 전에 신청해야 해요",
  },
  {
    n: "3",
    title: "금융기관 신청",
    desc: "DC형은 회사 인사팀 경유 → 금융기관 제출이에요. IRP는 본인이 직접 금융기관 앱·홈페이지에 제출해요.",
    tip: "앱 접속 → 중도인출 → '전세금/보증금 마련' 선택",
  },
  {
    n: "4",
    title: "심사 후 지급",
    desc: "서류 심사 완료 후 3~7영업일 내에 지정 계좌로 입금돼요. 급하면 미리 여유 있게 신청하세요.",
    tip: "정기예금 편입 상품은 중도해지 후 지급 → 수익 일부 손실 가능",
  },
];

const HUB_LINKS = [
  { title: "퇴직연금 중도인출",          sub: "6가지 법정 사유 전체 정리",                href: "/w/퇴직연금-중도인출" },
  { title: "퇴직연금 중도인출 주택구입", sub: "주택 구입 시 한도·서류·세금",              href: "/w/퇴직연금-중도인출-주택구입" },
  { title: "퇴직연금 중도인출 서류",     sub: "사유별 필요 서류 목록",                    href: "/w/퇴직연금-중도인출-서류" },
  { title: "IRP 퇴직금 인출 조건 세금",  sub: "IRP 해지 vs 중도인출 차이",               href: "/w/irp-퇴직금-인출" },
];

const SIDEBAR_LINKS = [
  "퇴직연금 중도인출 월세보증금",
  "퇴직연금 중도인출 전세보증금",
  "퇴직연금 DC형 중도인출 조건",
  "IRP 중도인출 보증금",
  "퇴직연금 중도인출 무주택",
  "퇴직연금 중도인출 DB형 불가",
  "퇴직연금 중도인출 세금",
  "퇴직연금 중도인출 기타소득세",
  "퇴직연금 중도인출 서류",
  "퇴직연금 중도인출 한도",
  "퇴직연금 중도인출 횟수",
  "퇴직연금 중도인출 심사기간",
  "근로자퇴직급여보장법 중도인출",
  "퇴직연금 보증금 법정사유",
  "퇴직연금 통합연금포털",
];

const FAQS = [
  {
    urgent: true,
    q: "월세 보증금도 퇴직연금 중도인출 사유가 되나요",
    a: "네. 전세뿐만 아니라 월세 보증금도 법정 사유예요. '무주택자가 주거 목적으로 전세금 또는 임차보증금을 부담하는 경우'로 규정돼 있어요(근로자퇴직급여보장법 시행령 제3조). 월세 보증금도 임차보증금에 포함돼요.",
  },
  {
    urgent: true,
    q: "DB형인데 보증금 때문에 중도인출 할 수 있나요",
    a: "안 돼요. DB형(확정급여형)은 어떤 사유로도 중도인출이 불가능해요. DC형(확정기여형) 또는 IRP만 법정 사유 중도인출이 가능해요. 내 퇴직연금 유형이 DB형이라면 금감원 통합연금포털이나 회사 인사팀에 확인해보세요.",
  },
  {
    urgent: true,
    q: "보증금 마련으로 중도인출하면 세금이 얼마나 나오나요",
    a: "회사가 납입한 부담금과 그 운용수익에는 퇴직소득세가 붙어요. 근속연수에 따라 다르지만 일반 소득세보다 낮아요. 내가 추가로 납입하고 세액공제 받은 금액과 그 운용수익은 기타소득세 16.5%가 붙어요. 세액공제 받지 않고 납입한 금액은 세금 없어요.",
  },
  {
    urgent: false,
    q: "중도인출 횟수 제한이 있나요",
    a: "DC형은 동일 사업장에서 보증금 마련으로 1회만 가능해요. IRP는 횟수 제한 없이 중도인출 가능해요. 단, 주택 구입과 보증금 마련을 합쳐 DC형은 생애 사업장당 1회 한정이에요.",
  },
  {
    urgent: false,
    q: "배우자가 집이 있으면 안 되나요",
    a: "네. 무주택 기준은 본인과 배우자 모두 무주택이어야 해요. 배우자 명의 주택이 있으면 중도인출이 안 돼요. 본인만 무주택이어도 배우자에게 주택이 있으면 요건 미충족이에요.",
  },
  {
    urgent: false,
    q: "보증금 전액을 다 뺄 수 있나요",
    a: "아니에요. 임대차계약서에 적힌 보증금 금액 한도까지만 인출할 수 있어요. 적립금이 5,000만원 있어도 보증금이 3,000만원이면 3,000만원까지만 뺄 수 있어요. 단, 적립금 한도를 초과해서 인출하는 건 안 돼요.",
  },
  {
    urgent: false,
    q: "계약서 쓰기 전에 미리 신청해도 되나요",
    a: "안 돼요. 임대차계약서가 있어야 신청 가능해요. 계약서 작성 후 잔금 지급일 전까지 신청해야 해요. 잔금 지급일이 촉박하다면 계약 직후 바로 신청하는 게 안전해요. 심사까지 3~7영업일이 걸려요.",
  },
];

const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

// ─── UrgentBanner
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    db: {
      title: "DB형인데 보증금이 필요하다면",
      color: "#DC2626", bg: "#FEF2F2",
      text: "아쉽게도 DB형은 중도인출이 안 돼요. 주택청약, 전세자금대출(주택도시기금·시중은행), 또는 회사에서 DC형 전환 가능 여부 확인을 해보세요. 금감원 통합연금포털에서 내 퇴직연금 유형부터 먼저 확인하세요.",
    },
    dc: {
      title: "DC형·IRP인데 바로 신청하고 싶다면",
      color: G, bg: GL,
      text: "임대차계약서 작성 후 → 금융기관 앱 접속 → 중도인출 → '전세금/보증금 마련' 선택 → 서류 업로드 순서예요. 회사 부담금은 퇴직소득세, 개인 세액공제분은 기타소득세 16.5%가 붙어요. 심사까지 3~7영업일 걸려요.",
    },
    unsure: {
      title: "내 퇴직연금 유형을 모르겠다면",
      color: "#D97706", bg: "#FFFBEB",
      text: "금감원 통합연금포털(100lifeplan.fss.or.kr)에서 공동인증서로 로그인하면 내 퇴직연금 유형·잔액을 바로 확인할 수 있어요. 회사 인사팀이나 HR 담당자에게 물어봐도 돼요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "dc",     label: "DC형 또는 IRP예요. 바로 신청하고 싶어요." },
          { id: "db",     label: "DB형인 것 같아요. 중도인출 가능한가요?" },
          { id: "unsure", label: "내 퇴직연금 유형을 모르겠어요." },
        ].map(item => (
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

  const m = messages[type];
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

// ─── 가능 여부 확인 도구 (핵심 컴포넌트)
function EligibilityChecker() {
  const [checks, setChecks] = useState({});
  const toggle = id => setChecks(p => ({ ...p, [id]: !p[id] }));

  const conditions = [
    { id: "c1", label: "퇴직연금이 DC형 또는 IRP예요",          sub: "DB형은 중도인출 불가" },
    { id: "c2", label: "본인과 배우자 모두 무주택이에요",        sub: "배우자 명의 주택 있으면 해당 안 됨" },
    { id: "c3", label: "임대차계약서가 이미 작성돼 있어요",      sub: "계약서 없으면 신청 불가" },
    { id: "c4", label: "인출 금액이 계약서 보증금 이하예요",     sub: "보증금 초과 인출 안 됨" },
  ];

  const allPass   = conditions.every(c => checks[c.id]);
  const someCheck = conditions.some(c => checks[c.id]);
  const failedC1  = someCheck && !checks["c1"];

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {conditions.map(c => (
          <label key={c.id} onClick={() => toggle(c.id)} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px",
            borderRadius: 8, cursor: "pointer",
            border: `1px solid ${checks[c.id] ? G : "#e5e7eb"}`,
            background: checks[c.id] ? GL : "#f9fafb",
          }}>
            <input type="checkbox" checked={!!checks[c.id]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>
              {c.label}
              <span style={{ fontSize: 11, color: "#6b7280", display: "block", marginTop: 3 }}>{c.sub}</span>
            </span>
          </label>
        ))}
      </div>

      {allPass && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          ✅ <strong>4가지 모두 해당돼요.</strong> 중도인출 신청 가능해요.<br />
          금융기관 앱에서 바로 신청하거나, DC형이라면 회사 인사팀에 서류를 제출하세요.
        </div>
      )}
      {failedC1 && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #FCA5A5", fontSize: 13, lineHeight: 1.8, color: "#374151" }}>
          ❌ <strong>DC형·IRP가 아니면 중도인출이 안 돼요.</strong><br />
          DB형이라면 전세자금대출(주택도시기금·시중은행)을 알아보세요.
        </div>
      )}
      {!allPass && someCheck && !failedC1 && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
          아직 충족 안 된 조건이 있어요.<br />
          빠진 조건을 확인해보세요. 금감원 통합연금포털이나 금융기관 고객센터에 문의하면 돼요.
        </div>
      )}
    </div>
  );
}

// ─── 서류 테이블
function DocTable() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            {["서류", "구분", "발급처"].map(h => (
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
                  {d.required ? "필수" : "확인"}
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

// ─── 신청 절차
function ProcessSteps() {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < STEPS.length - 1 && <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {s.n}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
            {s.tip && (
              <span style={{ display: "inline-block", fontSize: 12, marginTop: 7, background: GL, color: "#0F6E56", borderRadius: 6, padding: "4px 10px" }}>{s.tip}</span>
            )}
            {s.link && (
              <div style={{ marginTop: 8 }}>
                <a href={s.link.url} target="_self" style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600 }}>
                  🌐 {s.link.label}
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
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
          {open === i && (
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 관련 글도 확인해보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} target="_self"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.sub}</span>
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>보증금 급하다면 지금 바로 확인하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        DC형·IRP면 가능해요.<br />
        임대차계약서 작성 후 바로 신청할 수 있어요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        내 퇴직연금 유형이 헷갈리면 금감원 통합연금포털에서 먼저 확인하세요.<br />
        심사까지 3~7영업일 걸리니 잔금 지급일 전에 미리 신청하세요.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, maxWidth: 480, margin: "0 auto" }}>
        <a href="https://100lifeplan.fss.or.kr/retire/retireInfo.do" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none" }}>
          🔍 내 퇴직연금 유형 확인
        </a>
        <a href="https://nhuf.molit.go.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          🏠 전세자금대출 알아보기
        </a>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>관련 검색어</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" target="_self"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function RetirementWithdrawalDepositPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>

        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 중도인출 · 주거비</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          퇴직연금으로 월세·전세 보증금 뺄 수 있나요?<br />
          무주택자 법정 사유, 조건·서류·세금 정리
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          보증금이 급한데 퇴직연금 건드려도 되나 고민이시죠.<br />
          결론부터: 무주택자면 월세·전세 보증금 모두 법정 사유예요. 단, DC형·IRP만 가능해요.<br /><br />
          내 상황을 선택하면 바로 신청 방법이 나와요.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
          <a href="https://100lifeplan.fss.or.kr/retire/retireInfo.do" target="_self"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
            🔍 내 퇴직연금 유형 확인
          </a>
          <a href="https://www.moel.go.kr" target="_self"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
            📋 고용노동부 퇴직연금
          </a>
        </div>

        <UrgentBanner />

        <Divider />

        <H2>월세·전세 보증금, 퇴직연금 중도인출이 가능한가요</H2>
        <p style={body}>
          네. 무주택자가 주거 목적으로 임차보증금을 부담하는 경우는 법정 사유예요.<br />
          월세 보증금도 임차보증금에 해당하니 전세만 되는 게 아니에요.
        </p>
        <Bdg>내 상황에 해당하나요? — 4가지 선택으로 바로 확인</Bdg>
        <EligibilityChecker />
        <GreenBox title="중도인출 핵심 조건 요약 (근로자퇴직급여보장법 시행령 제3조)">
          퇴직연금 유형: DC형 또는 IRP만 가능 (DB형 불가)<br />
          무주택 기준: 본인 + 배우자 모두 무주택<br />
          인출 한도: 임대차계약서 보증금 금액까지<br />
          DC형 횟수: 동일 사업장 1회 한정 / IRP: 횟수 제한 없음<br />
          계약서 필요: 임대차계약서 작성 후에만 신청 가능
        </GreenBox>

        <Divider />

        <H2>퇴직연금 중도인출 신청 방법이 어떻게 되나요</H2>
        <p style={body}>
          4단계예요. 잔금 지급일이 촉박하다면 계약서 작성 직후 바로 신청하세요.<br />
          심사까지 3~7영업일 걸려요.
        </p>
        <ProcessSteps />

        <Divider />

        <H2>보증금 마련으로 중도인출하면 세금이 얼마나 나오나요</H2>
        <p style={body}>
          "법정 사유라서 세금 불이익이 없다"는 말이 맞기도 하고 틀리기도 해요.<br />
          회사 부담금과 내가 넣은 돈에 따라 세금이 달라요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { label: "회사 부담금 + 그 운용수익",           tax: "퇴직소득세",       rate: "근속연수에 따라 다름",     ok: true,  desc: "일반 소득세보다 낮은 세율 — 법정 사유라 추가 불이익 없음" },
            { label: "내가 납입 + 세액공제 받은 금액 + 운용수익", tax: "기타소득세 16.5%", rate: "소득세 15% + 지방세 1.5%", ok: false, desc: "세액공제 혜택을 되돌려 내는 구조 — 세액공제 받지 않은 금액은 세금 없음" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderRadius: 8, background: row.ok ? GL : "#FFFBEB", border: `1px solid ${row.ok ? "#9FE1CB" : "#FED7AA"}` }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2 }}>{row.ok ? "✅" : "⚠️"}</span>
              <span style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 3 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: "#6b7280", display: "block" }}>세금: <strong>{row.tax}</strong> ({row.rate})</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{row.desc}</span>
              </span>
            </div>
          ))}
        </div>
        <BorderBox title="세금 정리">
          법정 사유(보증금 마련) = 퇴직소득세만 내요. 기타소득세 16.5% 불이익은 없어요.<br />
          단, 내가 추가 납입하고 세액공제 받은 금액은 법정 사유여도 기타소득세 16.5% 붙어요.<br />
          세액공제 받지 않고 납입한 금액은 세금 없어요.
        </BorderBox>

        <Divider />

        <H2>신청할 때 필요한 서류가 뭔가요</H2>
        <p style={body}>
          서류를 금융기관 앱에 사진 찍어 올리면 돼요. DC형은 회사 인사팀 경유예요.
        </p>
        <Bdg>필요 서류 목록</Bdg>
        <DocTable />

        <HubLinks />

        <H2>퇴직연금 월세·전세 보증금 중도인출, 자주 하는 질문</H2>
        <p style={{ ...body, marginBottom: 14 }}>막막한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />

        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "근로자퇴직급여보장법 제22조 — 중도인출 근거", url: "https://www.law.go.kr/" },
              { label: "근로자퇴직급여보장법 시행령 제3조 — 법정 사유 (임차보증금)", url: "https://www.law.go.kr/" },
              { label: "금감원 통합연금포털 — 내 퇴직연금 유형·잔액 조회", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
              { label: "고용노동부 퇴직연금 안내", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
            ].map(item => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공 목적으로 작성됐어요. 개인 상황에 따라 세금·한도가 다를 수 있으니 금융기관 또는 고용노동부(☎1350)에 확인하세요.<br />
          ※ 법정사유: 무주택자 임차보증금 / 인출유형: DC형·IRP (DB형 불가) / 인출한도: 임대차계약서 금액 / DC형 횟수: 동일 사업장 1회 / 기타소득세: 16.5% (세액공제분) / 심사기간: 3~7영업일 / 근거: 근로자퇴직급여보장법 제22조·시행령 제3조
        </div>
      </div>
    </div>
  );
}
