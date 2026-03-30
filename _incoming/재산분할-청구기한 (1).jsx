import { useState } from "react";

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

const SIDEBAR_LINKS = [
  "이혼 재산분할 비율","재산분할 대상 범위","이혼 퇴직금 재산분할","이혼 시부모 증여 토지",
  "이혼 전 재산 빼돌림","이혼 재산분할 집 취득세","이혼 위자료 청구","이혼 친권·양육권",
  "이혼 양육비 청구","협의이혼 절차","이혼 무료 법률상담","이혼 빚 공동부담",
  "이혼 소송 증거 수집","별거 중 이혼","이혼 일방 거부","이혼 소송 기간",
  "이혼 소송 비용","이혼 후 공동명의","위자료 소멸시효","대한법률구조공단",
];

const HUB_LINKS = [
  { title: "재산분할 대상 범위 | 혼인 전 재산·퇴직금 포함 여부", desc: "기한 전 대상부터 확인하세요", href: "#" },
  { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "기여도 계산 방법 확인", href: "#" },
  { title: "이혼 전 재산 빼돌림 대비 | 처분금지가처분·가압류", desc: "청구 전 재산 보전 방법", href: "#" },
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
];

const FAQS = [
  { urgent: true,
    q: "이혼한 지 1년 반이 됐어요. 재산분할 청구할 수 있나요?",
    a: "협의이혼은 이혼신고 수리일로부터, 재판이혼은 판결 확정일로부터 2년이에요. 1년 반이면 아직 6개월 남았어요. 지금 바로 이혼 후 재산분할 심판 청구를 하세요. 132에 바로 전화해서 청구서 작성을 도와받으세요." },
  { urgent: true,
    q: "이혼한 지 2년이 지났어요. 재산분할 청구가 불가능한가요?",
    a: "민법 839조의2 제3항에 따라 이혼 후 2년이 지나면 재산분할청구권이 소멸해요. 2년이 지났다면 원칙적으로 청구가 불가능해요. 다만 소멸시효 중단 사유가 있는지 132에 확인해보세요. 상대방이 재산분할 협의를 하자고 한 적이 있다면 중단 사유가 될 수 있어요." },
  { urgent: false,
    q: "협의이혼 시 재산분할을 합의했는데 2년이 지나도 받을 수 있나요?",
    a: "합의서(공정증서)가 있다면 2년 이후에도 강제집행이 가능해요. 집행권원이 있으면 10년간 강제집행할 수 있어요. 공정증서 없이 구두 합의만 했다면 2년이 지나면 청구가 어려워요." },
  { urgent: false,
    q: "이혼 소송 중에 재산분할 청구기한이 지나가나요?",
    a: "이혼 소송 중에 재산분할 청구를 병합하면 기한 문제가 없어요. 재산분할 청구기한 2년은 이혼 확정 후부터 기산해요. 이혼 소송 중에는 기한이 진행되지 않아요. 단, 이혼 판결 확정 후 재산분할을 별도로 청구하는 경우는 확정일로부터 2년이에요." },
  { urgent: false,
    q: "위자료 소멸시효는 얼마인가요?",
    a: "위자료의 소멸시효는 이혼 확정일로부터 3년이에요(민법 766조). 재산분할 청구기한(이혼 후 2년)과 달라요. 두 가지를 혼동하지 마세요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민법 제839조의2 제3항 — 재산분할 청구기한 이혼 후 2년", url: "https://www.law.go.kr/" },
    { label: "민법 제766조 — 위자료 소멸시효 3년", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 재산분할 (2025. 9. 15. 기준)", url: "https://easylaw.go.kr/" },
    { label: "대법원 전자소송", url: "https://ecfs.scourt.go.kr" },
    { label: "대한법률구조공단 (132)", url: "tel:132" },
  ]},
];

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}
    </div>
  );
}
function BorderBox({ title, children }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    soon:   { title: "2년 기한이 다가오고 있어요", color: "#DC2626", bg: "#FEF2F2",
      text: "지금 바로 이혼 후 재산분할 심판을 청구하세요. 청구서는 가정법원에 제출하거나 전자소송으로 신청해요. 132에 바로 전화해서 무료 작성 지원을 받으세요." },
    missed: { title: "2년이 지났어요", color: "#7C3AED", bg: "#F5F3FF",
      text: "원칙적으로 청구가 불가능하지만 소멸시효 중단 사유가 있는지 확인이 필요해요. 상대방과 재산분할 합의 시도가 있었다면 중단 사유가 될 수 있어요. 지금 바로 132에 상담하세요." },
    check:  { title: "기한이 얼마나 남았는지 확인하고 싶어요", color: G, bg: GL,
      text: "아래 계산기에서 확인하세요. 협의이혼이면 이혼신고 수리일, 재판이혼이면 판결 확정일 기준이에요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "soon",   label: "2년 기한이 다가오고 있어요." },
          { id: "missed", label: "이혼한 지 2년이 지났어요." },
          { id: "check",  label: "기한이 얼마나 남았는지 확인하고 싶어요." },
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

function DeadlineCalc() {
  const [dateStr, setDateStr] = useState("");
  const [itype, setItype] = useState("협의이혼");
  const now = new Date();
  const divorce = dateStr ? new Date(dateStr) : null;
  const deadline = divorce ? new Date(divorce.getFullYear() + 2, divorce.getMonth(), divorce.getDate()) : null;
  const daysLeft = deadline ? Math.ceil((deadline - now) / 86400000) : null;
  const passed = daysLeft !== null && daysLeft <= 0;
  const urgent = daysLeft !== null && daysLeft > 0 && daysLeft <= 90;
  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>이혼 날짜를 입력하면 재산분할 청구 기한까지 남은 기간을 알려줘요.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>이혼 날짜</label>
          <input type="date" value={dateStr} onChange={e => setDateStr(e.target.value)}
            style={{ width: "100%", padding: "6px 8px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>이혼 종류</label>
          <select value={itype} onChange={e => setItype(e.target.value)}
            style={{ width: "100%", padding: "6px 8px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}>
            <option>협의이혼</option>
            <option>재판이혼</option>
          </select>
        </div>
      </div>
      {daysLeft !== null && (
        <div style={{ padding: "14px 16px", borderRadius: 8, background: passed ? "#FEF2F2" : urgent ? "#FFF7ED" : GL, border: `1px solid ${passed ? "#fca5a5" : urgent ? "#FED7AA" : "#9FE1CB"}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: passed ? "#DC2626" : urgent ? "#C2410C" : GD }}>
            {passed ? "⚠️ 2년 기한이 지났어요" : urgent ? `🔴 ${daysLeft}일 남았어요 — 지금 바로 청구하세요` : `✅ ${daysLeft}일 남았어요`}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
            {itype} 기준 청구기한: {deadline ? `${deadline.getFullYear()}.${String(deadline.getMonth()+1).padStart(2,"0")}.${String(deadline.getDate()).padStart(2,"0")}` : ""}까지
          </div>
        </div>
      )}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>협의이혼은 이혼신고 수리일, 재판이혼은 판결 확정일 기준이에요.</p>
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 재산분할 관련 글도 함께 보세요</p>
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>기한을 놓치지 마세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>이혼 후 2년이 기한이에요.<br />지금 바로 132에 상담하세요.</p>
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
        이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼·재산분할 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function JaeSanBunHalCheongGuhan() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 재산분할 · 청구기한</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          재산분할 청구기한 |<br />
          이혼 후 2년 이내에 청구해야 해요
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          이혼을 서두르다 보니 재산분할을 미뤄두셨나요? 아직 늦지 않았을 수 있어요.<br />
          이혼 후 2년이 기한이에요. 이 날을 넘기면 재산분할청구권이 소멸돼요.<br /><br />
          내 기한이 얼마나 남았는지 아래에서 바로 확인하세요.
        </p>

        <UrgentBanner />

        {/* H2 ① */}
        <Bdg>남은 기한 바로 확인하세요</Bdg>
        <H2>재산분할 청구기한 이혼 날짜로 계산하기</H2>
        <p style={body}>이혼 날짜를 입력하면 청구기한이 얼마나 남았는지 알 수 있어요.</p>
        <DeadlineCalc />
        <GreenBox title="재산분할 청구기한 핵심 3가지">
          협의이혼: 이혼신고 수리일로부터 2년<br />
          재판이혼: 판결 확정일로부터 2년<br />
          기한 초과 시: 청구권 소멸 (민법 839조의2 제3항)<br />
          위자료 소멸시효(3년)와 다르니 혼동 주의
        </GreenBox>

        <HubLinks />

        <Divider />

        {/* H2 ② */}
        <H2>이혼 후 재산분할 청구 절차</H2>
        <p style={body}>
          이혼 소송에서 재산분할을 빠뜨렸거나, 이혼 후 별도로 청구해야 하는 경우예요.
        </p>
        <BorderBox title="이혼 후 재산분할 심판 청구 방법">
          관할: 상대방 주소지 가정법원<br />
          신청서: 재산분할심판 청구서 + 혼인관계증명서 + 재산 관련 자료<br />
          인지대: 청구 금액에 따라 달라요 — 전자소송(ecfs.scourt.go.kr) 또는 132에서 확인하세요<br />
          온라인: 대법원 전자소송(ecfs.scourt.go.kr)에서 신청 가능<br />
          무료 지원: 132에 전화하면 청구서 작성을 무료로 도와줘요
        </BorderBox>
        <BorderBox title="이혼 소송과 병합할 때 (권장)">
          이혼 소장 제출 시 재산분할 청구를 함께 병합하는 게 가장 유리해요<br />
          이혼 소송 중에는 2년 기한이 진행되지 않아요<br />
          이혼 판결 확정 후 별도 청구 시 확정일로부터 2년 기한 시작
        </BorderBox>

        <Divider />

        {/* H2 ③ */}
        <H2>소멸시효 중단 — 2년이 지났어도 확인해야 하는 것</H2>
        <p style={body}>
          2년이 지났다고 무조건 포기하지 마세요.<br />
          소멸시효 중단 사유가 있으면 다시 2년이 진행돼요.
        </p>
        <BorderBox title="소멸시효 중단 사유">
          상대방이 재산분할 협의를 요청하거나 일부 이행한 경우<br />
          내가 재산분할 심판을 청구한 경우 (청구 시점부터 중단)<br />
          상대방이 재산분할 채무를 승인한 경우 (문자·카카오톡 포함)
        </BorderBox>
        <BorderBox title="2년이 지난 경우라도 이것을 확인하세요">
          이혼 후 상대방과 재산분할 관련 연락을 주고받은 내역<br />
          상대방이 "나중에 줄게", "정리되면 나눠줄게" 등 발언한 문자·카카오톡<br />
          이 기록이 있다면 중단 사유가 될 수 있어요 — 132에 바로 상담하세요
        </BorderBox>

        <Divider />

        {/* H2 ④ */}
        <H2>재산분할 청구기한, 지금 당장 이렇게 시작하세요</H2>
        <p style={body}>기한이 촉박할수록 오늘 할 수 있는 것부터 시작해야 해요.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2",
              title: "기한 확인",
              desc: "위 계산기에서 남은 일수를 확인하세요. 90일 이내라면 지금 즉시 132에 전화하세요." },
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2",
              title: "소멸시효 중단 증거 확인",
              desc: "이혼 후 상대방과 재산분할 관련 연락이 있었다면 지금 바로 캡처해서 보관하세요." },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED",
              title: "132 전화 + 심판 청구서 작성",
              desc: "대한법률구조공단 132에 전화하면 재산분할 심판 청구서 작성을 무료로 도와줘요. 소득 기준 125% 이하면 소송 비용도 지원돼요." },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED",
              title: "전자소송으로 심판 청구 제출",
              desc: "대법원 전자소송(ecfs.scourt.go.kr)에서 온라인 제출 가능해요. 법원 방문 없이 진행할 수 있어요." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", borderRadius: 8, background: s.bg, border: `1px solid ${s.color}30` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: s.color, flexShrink: 0, paddingTop: 2, minWidth: 36 }}>{s.step}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

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
