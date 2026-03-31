"use client";
import { useState } from "react";

const SIDEBAR_LINKS = [
  "이혼 양육비 청구","면접교섭권 신청","이혼 소송 중 면접교섭권","이혼 무료 법률상담",
  "이혼 재산분할 비율","이혼 위자료 청구","이혼 소송 증거 수집","협의이혼 절차",
  "별거 중 이혼","이혼 일방 거부","재산분할 청구기한","이혼 빚 공동부담",
  "위자료 소멸시효","이혼 후 공동명의","이혼 퇴직금 분할","가정폭력 이혼",
  "이혼 소송 기간","이혼 소송 비용","이혼 전 재산 빼돌림","대한법률구조공단",
];

const HUB_LINKS = [
  { title: "이혼 양육비 청구 | 금액 계산과 미지급 시 강제 받는 방법", desc: "양육권 결정 후 양육비 청구 방법", href: "#" },
  { title: "이혼 소송 중 면접교섭권 | 이혼 전에 아이를 만나는 방법", desc: "소송 중 면접교섭 사전처분 신청", href: "#" },
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
  { title: "이혼 소송 증거 수집 방법 | 외도·폭력 합법으로 모으는 법", desc: "양육권에 유리한 증거 수집 방법", href: "#" },
];

const CRITERIA = [
  { id: "c1", label: "현재 아이를 주로 내가 돌보고 있어요", sub: "법원이 가장 중요하게 보는 요소예요. 기존 생활 구조를 안정적으로 유지하는 쪽을 선호해요." },
  { id: "c2", label: "아이와 함께할 시간이 충분해요", sub: "아이를 직접 돌볼 수 있는 시간과 환경이 있는지 봐요. 재택·유연근무·조부모 지원도 유리해요." },
  { id: "c3", label: "안정적인 주거 환경을 제공할 수 있어요", sub: "아이가 학교·친구·지역사회 연결을 유지할 수 있는 주거 안정성이 중요해요." },
  { id: "c4", label: "아이 학교·의료·일상기록을 내가 주로 담당해왔어요", sub: "학원·병원·생일·학교 행사 기록이 주 양육자 입증 자료가 돼요." },
  { id: "c5", label: "아이가 13세 이상이고 나와 함께 살고 싶다고 해요", sub: "13세 이상 자녀의 의견은 법원이 반드시 청취해야 해요(가사소송규칙 제100조)." },
];

const FAQS = [
  { urgent: true,
    q: "친권과 양육권, 뭐가 다른가요? 둘 다 가져와야 하나요?",
    a: "친권은 자녀의 신분·재산에 관한 포괄적 권리(여권 발급, 계좌 개설, 수술 동의 등)예요. 양육권은 자녀를 직접 키우는 권리예요. 보통 함께 지정하지만 따로 지정할 수 있어요. 공동친권은 매번 두 사람 동의가 필요해서 실생활에서 불편해요. 일반적으로 친권·양육권 모두 단독으로 갖는 게 유리해요." },
  { urgent: true,
    q: "아이를 지금 내가 키우고 있는데, 법원에서도 그대로 인정해주나요?",
    a: "현재 실제로 양육하고 있는 상황이 가장 강력한 증거예요. 법원은 기존 생활 구조의 안정성을 유지하려는 경향이 있어요. 아이 학원비 납부 내역, 병원 기록, 학교 연락 기록, 카카오톡 양육 관련 대화를 보관하세요. 소송 중 현재 양육자가 누구인지가 판결에 결정적으로 영향을 줘요." },
  { urgent: false,
    q: "이혼 소송 중에 상대방이 아이를 데려갔어요. 어떻게 하나요?",
    a: "즉시 가정법원에 임시양육자 지정 사전처분을 신청하세요. 법원이 임시로 양육자를 정해줘요. 이 임시 양육 기간이 최종 판결에도 영향을 주므로 빨리 신청하는 게 유리해요. 132에 전화하면 무료로 신청서 작성을 도와줘요." },
  { urgent: false,
    q: "외도한 배우자도 양육권을 가져갈 수 있나요?",
    a: "외도는 위자료 청구 사유이지 양육권에 직접 영향을 주지는 않아요. 양육권은 자녀의 복리 기준으로 판단해요. 단, 외도 상대방과 자녀가 함께 생활하는 것이 자녀 복리에 해가 된다면 양육권 판단에 간접적으로 영향을 줄 수 있어요." },
  { urgent: false,
    q: "전업주부인데 소득이 없어도 양육권을 받을 수 있나요?",
    a: "소득이 낮다고 양육권을 못 받는 것은 아니에요. 아이를 직접 돌봐온 기간과 양육 환경, 아이와의 정서적 유대가 더 중요해요. 부모의 경제적 상황은 양육비로 보완할 수 있어요. 전업주부도 주 양육자였다는 것을 입증하면 유리해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민법 제909조 — 친권자 지정", url: "https://www.law.go.kr/" },
    { label: "민법 제837조 — 이혼 후 자녀 양육", url: "https://www.law.go.kr/" },
    { label: "가사소송규칙 제100조 — 13세 이상 자녀 의견 청취", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 친권·양육권 (2025. 1. 15. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=5&cciNo=1&cnpClsNo=1" },
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
    want:   { title: "양육권을 갖고 싶어요", color: G, bg: GL,
      text: "지금 아이와 함께 있다면 양육 기록을 최대한 남겨두세요. 아이 학원·병원·학교 기록, 카카오톡 대화가 주 양육자 증거가 돼요. 이혼 소장과 함께 임시양육자 지정 사전처분을 신청하세요." },
    taken:  { title: "상대방이 아이를 데려갔어요", color: "#DC2626", bg: "#FEF2F2",
      text: "지금 바로 가정법원에 임시양육자 지정 사전처분을 신청하세요. 이 임시 기간이 최종 판결에 영향을 줘요. 132에 바로 전화하세요." },
    change: { title: "이미 판결됐는데 변경하고 싶어요", color: "#7C3AED", bg: "#F5F3FF",
      text: "양육권 변경은 자녀의 복리에 실질적으로 부정적 영향이 있다는 것을 새로 입증해야 해요. 단순 소득 변화만으로는 어려워요. 132에 상담하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "want",   label: "이혼하면서 양육권을 제가 갖고 싶어요." },
          { id: "taken",  label: "이혼 소송 중에 상대방이 아이를 데려갔어요." },
          { id: "change", label: "이혼 판결 후 양육권을 변경하고 싶어요." },
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

function CriteriaChecker() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked(p => ({ ...p, [id]: !p[id] }));
  const count = CRITERIA.filter(c => checked[c.id]).length;
  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CRITERIA.map((c) => (
          <label key={c.id} onClick={() => toggle(c.id)}
            style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: 8, cursor: "pointer", border: `1px solid ${checked[c.id] ? G : "#e5e7eb"}`, background: checked[c.id] ? GL : "#f9fafb" }}>
            <input type="checkbox" checked={!!checked[c.id]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>
              {c.label}
              <span style={{ fontSize: 11, color: "#6b7280", display: "block", marginTop: 2 }}>{c.sub}</span>
            </span>
          </label>
        ))}
      </div>
      {count >= 4 && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          ✅ 양육권 확보에 유리한 조건이 많아요. 지금 당장 양육 기록을 보관하고 132에 상담하세요.
        </div>
      )}
      {count >= 2 && count < 4 && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
          조건이 일부 있어요. 양육 기록을 최대한 확보하고 132에 구체적인 전략을 상담하세요.
        </div>
      )}
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 친권·양육권 관련 글도 함께 보세요</p>
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>아이를 지키고 싶다면 지금 시작하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>기록 확보와 무료 상담이<br />양육권 다툼의 시작이에요.</p>
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼·양육 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ChinGyeonYangYukGwonPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 친권 · 양육권</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 친권·양육권 |<br />
          법원 결정 기준과 유리하게 받는 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          아이를 두고 이혼하는 게 가장 힘들어요. 양육권을 잃으면 아이와 함께 사는 권리가 없어져요.<br />
          법원은 부모의 잘잘못이 아니라 아이의 복리를 기준으로 결정해요.<br /><br />
          지금 아이를 직접 돌보고 있는 쪽이 유리해요. 지금부터 기록을 남겨두세요.
        </p>

        <UrgentBanner />

        {/* H2 ① */}
        <Bdg>내가 유리한 조건인지 확인해보세요</Bdg>
        <H2>법원이 양육권을 결정하는 5가지 기준</H2>
        <p style={body}>
          양육권은 주장이 아니라 생활 구조로 결정돼요.<br />
          해당하는 것을 체크해보세요.
        </p>
        <CriteriaChecker />
        <GreenBox title="친권 vs 양육권 핵심 차이">
          친권: 자녀 신분·재산에 관한 포괄적 권리 (여권 발급, 수술 동의, 계좌 개설 등)<br />
          양육권: 자녀를 직접 양육하는 권리 (함께 생활, 양육 결정)<br />
          보통 함께 지정하지만 따로 지정할 수 있어요<br />
          공동친권은 매번 두 사람 동의가 필요해서 실생활에서 불편해요 → 단독 지정이 일반적
        </GreenBox>

        <HubLinks />

        <Divider />

        {/* H2 ② */}
        <H2>양육권 유리하게 받으려면 지금 당장 이것부터</H2>
        <p style={body}>
          양육권 다툼이 시작됐다면 주장보다 생활 기록이 먼저예요.<br />
          법원은 "현재까지 누가 주로 키워왔는가"를 가장 중요하게 봐요.
        </p>
        <BorderBox title="양육 주도 입증 자료">
          아이 학원·병원 납부 영수증 (내 이름으로 결제된 것)<br />
          학교 알림장 수령·서명 기록<br />
          카카오톡 아이 양육 관련 대화 내역<br />
          아이와 함께 찍은 사진 (타임스탬프 포함)<br />
          조부모·지인 양육 지원 확인서
        </BorderBox>
        <BorderBox title="상대방 양육 부적합 입증 자료 (해당 시)">
          가정폭력: 진단서, 112 신고 접수증<br />
          학대: 아동보호전문기관 신고 기록<br />
          음주·도박: 관련 기록<br />
          방임: 아이 결석·의료 방치 기록
        </BorderBox>

        <Divider />

        {/* H2 ③ */}
        <H2>이혼 소송 중 양육권 다툼, 절차가 이렇게 돼요</H2>
        <p style={body}>
          이혼 소송이 길어지는 동안 아이 양육이 불안정해지면 안 돼요.<br />
          소장 제출과 동시에 임시양육자 지정 사전처분을 신청하면 소송 중에도 양육이 확정돼요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
          {[
            { n: 1, title: "이혼 소장 + 임시양육자 지정 사전처분 동시 신청",
              desc: "이혼 소장을 낼 때 '임시양육자 지정 사전처분 신청서'를 함께 제출해요. 소송 중 아이가 누구와 생활할지를 법원이 임시로 정해줘요. 132에서 무료로 신청서 작성을 도와줘요." },
            { n: 2, title: "법원 사전처분 결정",
              desc: "법원이 임시양육자를 결정해줘요. 사건마다 다르지만 통상 수 주 내에 결정이 나와요. 이 임시 기간 동안 형성된 생활 구조가 최종 판결의 기초 자료가 돼요. 임시양육자로 지정된 쪽이 최종 판결에서도 유리해요." },
            { n: 3, title: "재판 진행 중 양육 기록 계속 축적",
              desc: "재판 기간 동안 아이와의 일상 기록을 계속 쌓아가세요. 병원 동행, 학교 행사 참석, 아이와의 대화 기록이 모두 증거가 돼요." },
            { n: 4, title: "이혼 판결 확정 → 양육권·면접교섭 확정",
              desc: "이혼 판결에 양육권자, 면접교섭 조건, 양육비가 명시돼요. 판결 이후 상대방이 면접교섭을 방해하면 이행명령·과태료로 강제할 수 있어요." },
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
        <H2>양육권 결정 후 반드시 확인해야 할 것들</H2>
        <p style={body}>
          양육권이 확정됐다고 끝이 아니에요.<br />
          협의서나 판결문이 불명확하면 이후 분쟁이 반복돼요.
        </p>
        <BorderBox title="협의이혼 협의서에 반드시 구체적으로 써야 하는 것">
          친권자: 단독 또는 공동 명시 (공동이면 실생활에서 매번 동의 필요)<br />
          양육권자: 누가 아이와 함께 사는지<br />
          양육비: 월 금액·지급일·지급 계좌·인상 기준 구체적으로<br />
          면접교섭: 빈도·시간·장소 구체적으로 (예: 격주 토요일 10시~일요일 18시)<br />
          방학·명절·생일 특별 교섭 조건<br />
          법원에 제출한 협의서는 판결문과 동일한 효력이 있어요 — 모호하게 쓰면 나중에 다시 법원 가야 해요
        </BorderBox>
        <BorderBox title="재판이혼 판결 후 상대방이 면접교섭을 방해하면">
          가정법원에 이행명령 신청 → 불응 시 과태료 1,000만원 이하 (가사소송법 제67조)<br />
          반복 방해 시 양육권 변경 청구 사유가 될 수 있어요<br />
          방해 사실을 날짜별로 기록해두는 것이 중요해요 (카카오톡·문자 캡처)
        </BorderBox>
        <GreenBox title="공동친권보다 단독 친권이 일반적인 이유">
          아이 여권 발급, 계좌 개설, 수술 동의 등 모든 법률행위에 두 사람 동의가 필요해요<br />
          갈등이 남아있는 전 배우자와 매번 협의해야 해서 아이 일상에 공백이 생겨요<br />
          법원도 갈등이 있는 경우 단독 친권을 선호하는 경향이 있어요
        </GreenBox>

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
