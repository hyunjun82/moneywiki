import { useState } from "react";

const SIDEBAR_LINKS = [
  "이혼 재산분할 비율","재산분할 청구기한","이혼 퇴직금 재산분할","이혼 시부모 증여 토지",
  "이혼 전 재산 빼돌림","이혼 재산분할 집 취득세","이혼 위자료 청구","이혼 친권·양육권",
  "이혼 양육비 청구","협의이혼 절차","이혼 무료 법률상담","이혼 빚 공동부담",
  "이혼 소송 증거 수집","별거 중 이혼","이혼 일방 거부","이혼 소송 기간",
  "이혼 소송 비용","이혼 후 공동명의","위자료 소멸시효","대한법률구조공단",
];

const HUB_LINKS = [
  { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "대상 확인 후 비율 계산하세요", href: "#" },
  { title: "이혼 퇴직금 재산분할 | 재직 중 퇴직금도 분할 받을 수 있어요", desc: "퇴직금 분할 방법 전체 정리", href: "#" },
  { title: "이혼 전 재산 빼돌림 대비 | 처분금지가처분·가압류", desc: "분할 대상 재산 보전 방법", href: "#" },
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
];

const ITEMS_YES = [
  { label: "혼인 중 공동 명의 부동산", sub: "이름 무관, 실질적으로 공동 형성이면 포함" },
  { label: "남편·아내 단독 명의 부동산 (혼인 중 취득)", sub: "누구 이름이든 혼인 중 형성한 재산은 포함" },
  { label: "예금·주식·적금 (혼인 중 적립)", sub: "이름 무관, 혼인 중 근로·사업소득으로 모은 것" },
  { label: "재직 중 퇴직금 (혼인기간 비율분)", sub: "대법원 2013므2250 전합 — 재직 중도 분할 대상" },
  { label: "혼인 중 가입한 보험 해약환급금", sub: "공동재산으로 납부한 보험" },
  { label: "혼인 중 부담한 부부 공동 대출 (빚)", sub: "소극재산으로 포함 — 순재산에서 공제" },
];
const ITEMS_NO = [
  { label: "혼인 전 취득한 고유재산", sub: "혼인 전 예금·부동산·주식 — 특유재산 (민법 830조)" },
  { label: "혼인 중 상속받은 재산", sub: "원칙적 특유재산 (배우자 기여가 있으면 예외)" },
  { label: "혼인 중 부모에게 증여받은 재산", sub: "원칙적 특유재산 (배우자 기여가 있으면 예외)" },
  { label: "교통사고·산재 위로금 (비재산적 손해 배상)", sub: "특유재산 — 개인적 고통에 대한 보상" },
  { label: "혼인 파탄 이후 취득한 재산", sub: "혼인 중 공동 형성과 무관하면 제외 가능" },
];

const FAQS = [
  { urgent: true,
    q: "남편 명의 아파트인데 저도 재산분할을 받을 수 있나요?",
    a: "네. 명의와 무관하게 혼인 중 부부가 공동으로 형성한 재산이면 재산분할 대상이에요. 내가 가사노동·육아를 담당해 남편이 경제활동에 전념하도록 했다면 기여도가 인정돼요. 전업주부도 30~50% 기여도가 인정되는 경우가 많아요." },
  { urgent: true,
    q: "남편이 제3자 명의로 숨겨둔 재산도 분할 대상인가요?",
    a: "실질적으로 부부의 협력으로 형성한 재산이면 제3자 명의라도 재산분할 대상이에요(대법원 1998. 4. 10. 선고 96므1434). 숨긴 재산을 찾으려면 이혼 소장 제출 후 재산명시 명령과 법원 사실조회를 신청하세요." },
  { urgent: false,
    q: "빚도 재산분할 대상인가요?",
    a: "부부 공동으로 진 빚(집 담보대출, 생활비 대출 등)은 재산분할에서 소극재산으로 공제해요. 순재산(적극재산 - 소극재산)이 분할 대상이에요. 적극재산보다 빚이 더 많아도 빚 분담을 청구할 수 있어요(대법원 2013므4071 전합)." },
  { urgent: false,
    q: "혼인 전 제가 모아둔 예금은 분할 안 해도 되나요?",
    a: "혼인 전 취득한 고유재산은 원칙적으로 분할 대상이 아니에요. 하지만 혼인 기간이 길고 그 예금을 혼인 중 함께 관리·증식했다면 예외적으로 분할 대상이 될 수 있어요. 통장 개설일자 등 증거를 보관하세요." },
  { urgent: false,
    q: "상속받은 부동산도 분할 대상인가요?",
    a: "원칙적으로 분할 대상이 아닌 특유재산이에요. 그러나 배우자가 그 부동산 유지·증식에 기여했다면 예외적으로 분할 대상이 될 수 있어요(대법원 97므1486·1493). 혼인 기간이 길수록, 함께 생활한 부동산일수록 분할 가능성이 높아요." },
];

const REFERENCES = [
  { category: "법령 및 판례", items: [
    { label: "민법 제830조 — 특유재산 (혼인 전 취득·상속·증여)", url: "https://www.law.go.kr/" },
    { label: "민법 제839조의2 — 재산분할청구권", url: "https://www.law.go.kr/" },
    { label: "대법원 96므1434 — 제3자 명의도 분할 대상", url: "https://www.law.go.kr/" },
    { label: "대법원 2013므2250 전합 — 재직 중 퇴직금도 분할 대상", url: "https://www.law.go.kr/" },
    { label: "대법원 2010므4071 전합 — 빚도 재산분할 대상", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 재산분할 대상 (2025. 9. 15. 기준)", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=233&ccfNo=4&cciNo=2&cnpClsNo=2" },
    { label: "대한법률구조공단 (132)", url: "tel:132" },
  ]},
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

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
    check:  { title: "재산이 분할 대상인지 확인하고 싶어요", color: G, bg: GL,
      text: "아래 체커에서 확인하세요. 명의보다 '혼인 중 공동으로 형성했는가'가 기준이에요. 애매한 것은 132에 상담하세요." },
    hidden: { title: "배우자가 재산을 숨긴 것 같아요", color: "#DC2626", bg: "#FEF2F2",
      text: "이혼 소장 제출 후 재산명시 명령과 법원 사실조회를 신청하세요. 처분금지가처분으로 먼저 묶어두는 것도 방법이에요. 132에 바로 전화하세요." },
    debt:   { title: "빚이 더 많아요. 재산분할을 받을 수 있나요?", color: "#7C3AED", bg: "#F5F3FF",
      text: "빚이 더 많아도 재산분할 청구가 가능해요(대법원 2010므4071 전합). 상대방이 더 많은 자산을 보유하거나 빚 부담이 적으면 청구할 수 있어요. 132에 상담하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "check",  label: "어떤 재산이 분할 대상인지 확인하고 싶어요." },
          { id: "hidden", label: "배우자가 재산을 숨겼을 것 같아요." },
          { id: "debt",   label: "빚이 더 많은데 재산분할을 받을 수 있나요?" },
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

function ItemChecker() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: G, marginBottom: 4 }}>✅ 분할 대상</p>
      {ITEMS_YES.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px", borderRadius: 8, background: GL, border: "1px solid #9FE1CB" }}>
          <span style={{ color: G, flexShrink: 0, fontWeight: 700, fontSize: 14 }}>✓</span>
          <span style={{ fontSize: 13, lineHeight: 1.6 }}>{item.label}
            <span style={{ display: "block", fontSize: 11, color: "#6b7280", marginTop: 2 }}>{item.sub}</span>
          </span>
        </div>
      ))}
      <p style={{ fontSize: 13, fontWeight: 600, color: "#DC2626", marginBottom: 4, marginTop: 8 }}>❌ 분할 대상 아님 (원칙)</p>
      {ITEMS_NO.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #fca5a5" }}>
          <span style={{ color: "#DC2626", flexShrink: 0, fontWeight: 700, fontSize: 14 }}>✗</span>
          <span style={{ fontSize: 13, lineHeight: 1.6 }}>{item.label}
            <span style={{ display: "block", fontSize: 11, color: "#6b7280", marginTop: 2 }}>{item.sub}</span>
          </span>
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>재산 목록을 누락 없이 확인하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>재산분할 소장 작성부터<br />132에서 무료로 도와줘요.</p>
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

export default function JaeSanBunHalDaeJangPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 재산분할 · 분할 대상</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          재산분할 대상 범위 |<br />
          혼인 전 재산·퇴직금·부모 증여 포함 여부
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          "남편 명의니까 제 거 아니에요"라는 말, 법적으로 맞지 않아요.<br />
          명의보다 '혼인 중 공동으로 형성했는가'가 기준이에요.<br /><br />
          어떤 재산이 분할 대상이고 어떤 게 아닌지 아래에서 바로 확인하세요.
        </p>

        <UrgentBanner />

        {/* H2 ① */}
        <Bdg>분할 대상 재산 바로 확인하세요</Bdg>
        <H2>재산분할 대상 vs 비대상 핵심 정리</H2>
        <p style={body}>원칙은 '혼인 중 공동 형성'이에요. 명의가 누구냐는 관계없어요.</p>
        <ItemChecker />
        <GreenBox title="핵심 원칙 3가지">
          1. 명의 무관: 누구 이름이든 혼인 중 공동 형성이면 분할 대상<br />
          2. 특유재산 예외: 상속·증여 재산도 배우자 기여 시 분할 가능<br />
          3. 빚도 포함: 소극재산(빚)도 분할 대상 — 순재산 기준으로 계산
        </GreenBox>

        <HubLinks />

        <Divider />

        {/* H2 ② */}
        <H2>혼인 전 재산·부모 증여·퇴직금 포함 여부</H2>
        <p style={body}>
          타이틀 line2 키워드인 혼인 전 재산·퇴직금·부모 증여는 원칙적으로 특유재산이에요.<br />
          하지만 배우자의 기여가 인정되면 예외적으로 분할 대상이 될 수 있어요.
        </p>
        <BorderBox title="혼인 전 재산 (고유재산)">
          원칙: 분할 대상 아님 (민법 제830조 특유재산)<br />
          예외: 혼인 중 배우자가 그 재산의 유지·증식에 기여했다면 분할 가능<br />
          예시: 혼인 전 취득한 아파트를 함께 대출 상환했다면 기여분 인정 가능
        </BorderBox>
        <BorderBox title="부모 증여 재산">
          원칙: 분할 대상 아님 (특유재산)<br />
          예외: 배우자가 그 재산을 함께 관리·증식했거나 혼인 생활에 공동 사용했다면 기여분 인정 가능<br />
          예시: 증여받은 토지 위에 함께 건물을 지었다면 건물 부분은 분할 대상
        </BorderBox>
        <BorderBox title="퇴직금 (재직 중 포함)">
          원칙: 혼인기간 중 근무 기간에 해당하는 비율분은 분할 대상<br />
          근거: 대법원 2013므2250 전합 (2014. 7. 16.) — 재직 중도 변론종결 시점 예상액 기준으로 분할<br />
          혼인 전 근무 기간 분: 원칙적으로 특유재산 (예외 가능)
        </BorderBox>

        <Divider />

        {/* H2 ③ */}
        <H2>재산분할 기준 시점과 지금 당장 해야 할 것들</H2>
        <p style={body}>
          재산분할 기준 시점은 이혼 소장 제출일이 아니에요.<br />
          이혼 소송의 사실심 변론종결일이 기준이에요. 그 전에 재산이 처분되면 문제가 생겨요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { step: "지금 즉시", color: "#DC2626", bg: "#FEF2F2",
              title: "등기부 조회로 재산 현황 파악",
              desc: "대법원 인터넷등기소(iros.go.kr)에서 부동산 등기부를 조회하세요. 소유권 이전·가압류 여부를 실시간으로 확인할 수 있어요." },
            { step: "지금 즉시", color: "#DC2626", bg: "#FEF2F2",
              title: "처분 위험 재산은 가처분·가압류로 보전",
              desc: "변론종결 전에 상대방이 재산을 처분하면 분할 대상에서 빠질 수 있어요. 지금 바로 처분금지가처분 또는 가압류로 묶어두세요." },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED",
              title: "재산 목록 작성 + 132 상담",
              desc: "부동산·예금·주식·퇴직금·보험까지 전체 재산 목록을 정리하고 132에 상담하세요. 누락된 재산이 있는지 확인해줘요." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", borderRadius: 8, background: s.bg, border: `1px solid ${s.color}30` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: s.color, flexShrink: 0, paddingTop: 2, minWidth: 44 }}>{s.step}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* H2 ④ */}
        <H2>재산분할 대상 범위에 대해 자주 묻는 것들</H2>
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
