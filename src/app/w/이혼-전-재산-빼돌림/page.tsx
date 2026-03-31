"use client";
import { useState } from "react";

const SIDEBAR_LINKS = [
  "처분금지가처분 신청 방법","처분금지가처분 비용","가압류 신청 방법","사해행위취소 소송",
  "이혼 재산분할 비율","재산분할 청구기한","이혼 소송 증거 수집","이혼 위자료 청구",
  "이혼 무료 법률상담","이혼 퇴직금 재산분할","이혼 친권·양육권","이혼 양육비 청구",
  "협의이혼 절차","별거 중 이혼","이혼 일방 거부","재산분할 대상 범위",
  "이혼 빚 공동부담","위자료 소멸시효","이혼 후 공동명의","대한법률구조공단",
];

const HUB_LINKS = [
  { title: "처분금지가처분 신청 조건 | 비용·담보·절차 정리", desc: "이혼 전 재산 묶는 가장 빠른 방법", href: "#" },
  { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "빼돌린 재산을 재산분할에 포함시키는 방법", href: "#" },
  { title: "이혼 소송 증거 수집 방법 | 외도·폭력 합법으로 모으는 법", desc: "재산 빼돌림 증거 수집 방법", href: "#" },
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
];

const METHODS = [
  {
    icon: "🚫", title: "처분금지가처분", badge: "가장 빠름", badgeColor: "#1D9E75",
    when: "부동산을 팔거나 담보를 설정할 것 같을 때",
    desc: "이혼 소장 제출 전에도 신청할 수 있어요. 결정이 나면 등기부에 즉시 가처분 등기가 돼서 상대방이 팔거나 담보를 설정할 수 없어요. 담보는 부동산 시가의 약 10~15% 수준이에요.",
    law: "민사집행법 제300조",
  },
  {
    icon: "🔒", title: "가압류", badge: "현금·예금 동결", badgeColor: "#2563eb",
    when: "계좌에서 돈을 빼가거나 급여를 빼돌릴 것 같을 때",
    desc: "계좌·예금·급여·채권을 압류해서 상대방이 쓰지 못하게 막아요. 위자료·재산분할을 현금으로 받으려 할 때 사용해요. 담보 제공 필요(채권액의 약 40%).",
    law: "민사집행법 제276조",
  },
  {
    icon: "⚖️", title: "사해행위취소 소송", badge: "이미 이전된 경우", badgeColor: "#7c3aed",
    when: "이미 가족·지인 명의로 재산을 이전한 경우",
    desc: "이혼 소송과 함께 가정법원에 사해행위취소를 청구해요. 상당한 정도를 초과하는 이전분만 취소 대상이에요. 제소기간: 취소원인을 안 날로부터 1년, 법률행위가 있은 날로부터 5년.",
    law: "민법 제839조의3",
  },
  {
    icon: "📋", title: "재산명시 명령", badge: "위치 파악", badgeColor: "#d97706",
    when: "숨긴 재산이 어디 있는지 모를 때",
    desc: "이혼 소장 제출 후 법원에 재산명시 명령을 신청하면 상대방이 재산 목록을 법원에 제출해야 해요. 거짓 제출 시 과태료 1,000만원 이하.",
    law: "가사소송법 제48조의2",
  },
];

const FAQS = [
  {
    urgent: true,
    q: "배우자가 오피스텔을 형 명의로 이미 바꿨어요. 돌려받을 수 있나요?",
    a: "사해행위취소 소송을 가정법원에 제기하면 돌려받을 수 있어요. 이혼 소송이 진행 중이거나 이혼이 임박한 상황에서 재산을 이전했다면 사해행위로 인정될 가능성이 높아요. 단, 상당한 정도를 초과하는 이전분만 취소 대상이에요. 취소원인을 안 날로부터 1년이 소멸시효예요. 지금 바로 132에 전화하세요.",
  },
  {
    urgent: true,
    q: "배우자가 계좌에서 돈을 다 빼가려고 해요. 지금 당장 막을 수 있나요?",
    a: "지금 바로 가압류를 신청하세요. 이혼 소장 제출 전에도 가능해요. 계좌 가압류는 법원 결정 후 하루 이틀 안에 집행돼요. 132에 전화하거나 대법원 전자소송(ecfs.scourt.go.kr)으로 신청하세요.",
  },
  {
    urgent: false,
    q: "처분금지가처분과 가압류, 어떤 걸 선택해야 하나요?",
    a: "부동산을 재산분할로 직접 받고 싶으면 처분금지가처분, 현금으로 받고 싶으면 가압류예요. 처분금지가처분은 담보율 약 10~15%, 가압류는 약 40%예요. 132에 상담하세요.",
  },
  {
    urgent: false,
    q: "상대방이 재산을 어디에 숨겼는지 몰라요. 어떻게 찾나요?",
    a: "이혼 소장 제출 후 법원에 재산명시 명령을 신청하면 상대방이 재산 목록을 법원에 제출해야 해요. 법원 사실조회로 금융계좌·부동산·차량도 조회할 수 있어요. 거짓 제출 시 과태료 1,000만원 이하예요.",
  },
  {
    urgent: false,
    q: "사해행위취소 제소기간이 얼마나 되나요?",
    a: "취소원인을 안 날로부터 1년, 법률행위가 있은 날로부터 5년이에요(민법 제406조). 이미 이전한 사실을 알았다면 지금 바로 1년 타이머가 돌아가고 있어요. 즉시 132에 상담하세요.",
  },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민사집행법 제300조 — 처분금지가처분", url: "https://www.law.go.kr/" },
    { label: "민사집행법 제276조 — 가압류", url: "https://www.law.go.kr/" },
    { label: "민법 제839조의3 — 재산분할청구권 보전을 위한 사해행위취소권", url: "https://www.law.go.kr/" },
    { label: "가사소송법 제48조의2 — 재산명시 명령", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 재산처분 방지 조치 (2026. 2. 28. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=3&cciNo=2&cnpClsNo=4" },
    { label: "대법원 전자소송 — 가압류·가처분 신청", url: "https://ecfs.scourt.go.kr" },
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
  const messages = {
    now:  { title: "지금 처분하려는 것 같아요", color: "#DC2626", bg: "#FEF2F2",
      text: "지금 바로 처분금지가처분(부동산) 또는 가압류(현금·예금)를 신청하세요. 이혼 소장 제출 전에도 가능해요. 대법원 전자소송(ecfs.scourt.go.kr) 또는 132에 바로 전화하세요." },
    done: { title: "이미 제3자에게 이전했어요", color: G, bg: GL,
      text: "사해행위취소 소송을 이혼 소장과 함께 가정법원에 제기하세요. 취소원인을 안 날로부터 1년이 소멸시효예요. 지금 즉시 132에 전화하세요." },
    find: { title: "재산이 어디에 숨어있는지 몰라요", color: "#7C3AED", bg: "#F5F3FF",
      text: "이혼 소장 제출 후 법원에 재산명시 명령을 신청하세요. 상대방이 재산 목록을 법원에 제출해야 해요. 거짓 제출 시 과태료 1,000만원 이하예요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "now",  label: "배우자가 지금 재산을 처분하려는 것 같아요." },
          { id: "done", label: "이미 가족·지인 명의로 재산을 이전했어요." },
          { id: "find", label: "재산이 어디에 숨어있는지 모르겠어요." },
        ].map((item) => (
          <button key={item.id} onClick={() => setType(item.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
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

function MethodCards() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
      {METHODS.map((m, i) => (
        <div key={i} style={{ border: `1px solid ${open === i ? G : "#e5e7eb"}`, borderRadius: 10, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)}
            style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, background: open === i ? GL : "#fff" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{m.icon}</span>
            <span style={{ flex: 1 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{m.title}</span>
                <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 10, background: `${m.badgeColor}18`, color: m.badgeColor, fontWeight: 600 }}>{m.badge}</span>
              </span>
              <span style={{ fontSize: 12, color: "#6b7280" }}>{m.when}</span>
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginTop: 4 }}>▼</span>
          </div>
          {open === i && (
            <div style={{ padding: "10px 16px 14px", borderTop: "1px solid #f3f4f6" }}>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85, margin: "0 0 8px" }}>{m.desc}</p>
              <span style={{ fontSize: 11, background: GL, color: "#0F6E56", borderRadius: 6, padding: "3px 8px" }}>{m.law}</span>
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 재산 보전·분할 관련 글도 함께 보세요</p>
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>1분이라도 빠를수록 좋아요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>지금 바로 가처분·가압류를<br />신청할 수 있어요.</p>
      <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
        <a href="tel:132" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>📞 법률구조공단 132</a>
        <a href="https://ecfs.scourt.go.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}` }}>🌐 전자소송 신청</a>
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼·재산 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function IhonJaeSanBbaeDolLimPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 재산 보전 · 가처분</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 전 재산 빼돌림 대비 |<br />
          처분금지가처분·가압류·사해행위취소 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          이혼 얘기를 꺼내자마자 배우자가 오피스텔을 형 명의로, 차량을 어머니 명의로 바꿨어요.<br />
          "이미 내 재산이 아니니 뭘 나누자는 거냐"는 말을 듣는 순간 막막하죠.<br /><br />
          법은 이걸 막을 수단을 이미 준비해뒀어요.<br />
          지금 내 상황부터 선택하면 가장 빠른 방법을 알려드릴게요.
        </p>

        <UrgentBanner />

        {/* H2 ① */}
        <Bdg>내 상황에 맞는 방법을 선택하세요</Bdg>
        <H2>지금 당장 쓸 수 있는 법적 수단 4가지</H2>
        <p style={body}>
          상황에 따라 사용하는 도구가 달라요.<br />
          클릭해서 내 상황에 맞는 방법과 법적 근거를 확인하세요.
        </p>
        <MethodCards />
        <GreenBox title="처분금지가처분 vs 가압류 핵심 차이">
          처분금지가처분: 부동산 처분·담보 설정 금지. 재산 자체를 받고 싶을 때. 담보율 약 10~15%.<br />
          가압류: 예금·급여·채권 동결. 현금으로 받고 싶을 때. 담보율 약 40%.<br />
          둘 다 이혼 소장 제출 전에도 신청 가능. 결정 즉시 집행됨.
        </GreenBox>

        <HubLinks />

        <Divider />

        {/* H2 ② */}
        <H2>빼돌린 방식에 따라 대응 방법이 달라요</H2>
        <p style={body}>
          어떤 방식으로 처분했느냐에 따라 써야 할 수단이 달라요.
        </p>
        <BorderBox title="부동산을 빼돌린 경우">
          아직 처분 전: 처분금지가처분 신청 → 이혼 소장 + 재산분할 청구<br />
          이미 팔았다면: 사해행위취소 소송 + 제3자에게 소유권이전등기 말소 청구
        </BorderBox>
        <BorderBox title="현금·예금을 빼돌린 경우">
          아직 출금 전: 가압류 신청 → 계좌 즉시 동결<br />
          이미 출금했다면: 이혼 소송에서 재산분할 기준 시점(소 제기일)을 소급 주장
        </BorderBox>
        <BorderBox title="재산 위치를 모르는 경우">
          이혼 소장 제출 후 재산명시 명령 신청<br />
          법원 사실조회로 금융계좌·부동산·차량 조회 가능
        </BorderBox>

        <Divider />

        {/* H2 ③ */}
        <H2>사해행위취소 소송, 이렇게 진행해요</H2>
        <p style={body}>
          이미 가족·지인 명의로 이전된 재산이 있다면 사해행위취소 소송이 마지막 수단이에요.<br />
          취소원인을 안 날로부터 1년이 지나면 청구 자체가 불가능해요. 지금 바로 시작해야 해요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
          {[
            { n: 1, title: "사해행위 증거 수집", desc: "이전 날짜, 이전 경위, 이혼 임박 상황 입증 자료를 확보해요. 카카오톡에 이혼 얘기가 있고 그 직후 재산을 이전했다면 강력한 증거가 돼요." },
            { n: 2, title: "취소원인을 안 날 확인 (1년 타이머)", desc: "취소원인을 안 날로부터 1년이 제소기간이에요. 등기부 조회로 이전 날짜를 확인하고 1년을 계산해두세요." },
            { n: 3, title: "이혼 소장 + 사해행위취소 병합 청구", desc: "가정법원에 이혼 소장을 내면서 사해행위취소 청구를 병합해요. 가정법원에서 함께 심리해요." },
            { n: 4, title: "판결 후 원상회복 등기", desc: "취소 판결이 나면 제3자 명의 등기를 말소하고 원래 명의로 돌아와요. 이후 이혼 재산분할로 처리해요." },
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
        <H2>이혼 전 재산 빼돌림, 지금 당장 이렇게 시작하세요</H2>
        <p style={body}>
          막막한 상황일수록 첫 번째 행동이 중요해요.<br />
          오늘 할 수 있는 것부터 순서대로 정리했어요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2", title: "등기부 조회", desc: "대법원 인터넷등기소(iros.go.kr)에서 해당 부동산 등기부를 조회하세요. 소유권 이전·가압류 등기 여부를 실시간으로 확인할 수 있어요. 무료예요." },
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2", title: "132 전화 — 신청 방법 확인", desc: "대한법률구조공단 132에 전화하면 처분금지가처분 또는 가압류 신청서 작성을 무료로 도와줘요. 담보 마련 방법(서울보증보험 공탁보험증권)도 안내받을 수 있어요." },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED", title: "정황 증거 캡처·보관", desc: "이혼 얘기 직후 재산을 이전한 카카오톡·문자 메시지를 캡처해두세요. 사해행위 인정의 핵심 증거가 돼요." },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED", title: "전자소송으로 가처분·가압류 신청", desc: "대법원 전자소송(ecfs.scourt.go.kr)에서 온라인 신청이 가능해요. 법원 방문 없이 진행할 수 있어요. 132에서 신청서 작성을 도와줘요." },
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
