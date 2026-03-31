"use client";
// @ts-nocheck
import { useState } from "react";

const SIDEBAR_LINKS = [
  "이혼 양육비 청구","이혼 친권·양육권","이혼 별거 중 양육비","이혼 무료 법률상담",
  "협의이혼 절차","이혼 재산분할 비율","이혼 위자료 청구","이혼 소송 증거 수집",
  "별거 중 이혼","이혼 일방 거부","재산분할 청구기한","이혼 빚 공동부담",
  "위자료 소멸시효","이혼 후 공동명의","이혼 퇴직금 분할","가정폭력 이혼",
  "이혼 소송 기간","이혼 소송 비용","이혼 전 재산 빼돌림","대한법률구조공단",
];

const HUB_LINKS = [
  { title: "이혼 양육비 청구 | 금액 계산과 미지급 시 강제 받는 방법", desc: "면접교섭권과 양육비는 별개예요", href: "#" },
  { title: "이혼 친권·양육권 | 법원 결정 기준과 유리하게 받는 방법", desc: "면접교섭권은 양육권과 다른 권리예요", href: "#" },
  { title: "이혼 별거·소송 중 양육비 | 이혼 전에 임시 양육비 받는 방법", desc: "면접교섭 사전처분과 양육비 사전처분 동시 신청", href: "#" },
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
];

const FAQS = [
  { urgent: true,
    q: "이혼 소송 중인데 아이를 전혀 못 만나고 있어요. 당장 만날 수 있나요?",
    a: "지금 바로 이혼 소장에 면접교섭 허용 사전처분을 신청하거나 별도로 신청하세요. 법원이 임시 면접교섭 일정을 정해줘요. 132에 전화하면 신청서 작성을 무료로 도와줘요." },
  { urgent: true,
    q: "상대방이 면접교섭을 계속 방해해요. 어떻게 강제할 수 있나요?",
    a: "가정법원에 이행명령을 신청하세요. 이행명령에도 불응하면 과태료(1,000만원 이하)가 부과돼요(가사소송법 제67조). 반복적으로 방해하면 양육권 변경 청구 사유가 될 수 있어요. 방해 사실을 날짜별로 기록해두세요." },
  { urgent: false,
    q: "면접교섭권과 양육권은 뭐가 다른가요?",
    a: "양육권은 아이와 함께 생활하는 권리예요. 면접교섭권은 비양육자가 아이를 정기적으로 만나는 권리예요. 양육권이 없어도 면접교섭권은 부모의 당연한 권리예요. 단, 아이에게 실질적 해가 인정되면 법원이 면접교섭을 제한할 수 있어요." },
  { urgent: false,
    q: "협의이혼 시 면접교섭 조건을 어떻게 정하나요?",
    a: "협의이혼 시 자녀 양육에 관한 협의서에 면접교섭 일정·방법·장소를 구체적으로 명시해야 해요. '격주 토요일 10시에 아버지가 데려간다'처럼 구체적으로 적어야 나중에 분쟁이 생기지 않아요." },
  { urgent: false,
    q: "아이가 만나기 싫다고 해요. 그래도 면접교섭을 해야 하나요?",
    a: "아이의 의사도 고려되지만 면접교섭권은 부모의 권리이기도 해요. 아이가 13세 이상이고 강하게 거부한다면 법원이 이를 감안해요. 아이가 싫다고 한다면 거부 이유를 파악하고 비폭력적인 방식으로 교섭을 시작하는 방법을 찾아보세요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민법 제837조의2 — 면접교섭권", url: "https://www.law.go.kr/" },
    { label: "가사소송법 제62조 — 사전처분 (소송 중 임시 면접교섭)", url: "https://www.law.go.kr/" },
    { label: "가사소송법 제67조 — 면접교섭 방해 시 과태료 1,000만원 이하", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 면접교섭권 (2025. 11. 15. 기준)", url: "https://easylaw.go.kr/" },
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
    blocked:  { title: "아이를 전혀 못 만나고 있어요", color: "#DC2626", bg: "#FEF2F2",
      text: "지금 바로 이혼 소장에 면접교섭 사전처분을 신청하거나 별도로 신청하세요. 법원이 임시 일정을 정해줘요. 132에 바로 전화하세요." },
    blocked2: { title: "결정됐는데 상대방이 방해해요", color: G, bg: GL,
      text: "가정법원에 이행명령을 신청하세요. 불응 시 과태료(1,000만원 이하)가 부과돼요. 방해 기록(날짜·내용)을 모아두세요. 반복 방해는 양육권 변경 사유가 돼요." },
    setup:    { title: "면접교섭 조건을 처음 정하려고 해요", color: "#7C3AED", bg: "#F5F3FF",
      text: "아래 단계별 절차를 확인하세요. 협의이혼이라면 협의서에 구체적인 일정(격주 토요일 10시 등)을 명시하세요. 모호하게 쓰면 나중에 분쟁이 생겨요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "blocked",  label: "이혼 소송 중인데 아이를 전혀 못 만나고 있어요." },
          { id: "blocked2", label: "면접교섭 결정이 났는데 상대방이 방해해요." },
          { id: "setup",    label: "면접교섭 조건을 처음 정하려고 해요." },
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 면접교섭·양육 관련 글도 함께 보세요</p>
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>아이를 만날 권리를 지금 찾을 수 있어요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>사전처분 신청서 작성을<br />무료로 도와줘요.</p>
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼·면접교섭 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function MyeonJeopGyoSeopGwonPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 면접교섭권 · 사전처분</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 소송 중 면접교섭권 |<br />
          이혼 전에 아이를 만나는 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          이혼 소송이 길어지는 동안 아이를 못 만나고 있어요. 이혼이 확정돼야만 만날 수 있는 게 아니에요.<br />
          이혼 소장 제출과 동시에 면접교섭 사전처분을 신청하면 이혼 전에도 정기적으로 아이를 만날 수 있어요.
        </p>

        <UrgentBanner />

        {/* H2 ① */}
        <Bdg>단계별 절차를 확인하세요</Bdg>
        <H2>이혼 소송 중에 아이를 만나는 4단계</H2>
        <p style={body}>
          이혼 소장 제출과 사전처분 신청을 동시에 하면 가장 빨리 아이를 만날 수 있어요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
          {[
            { n: 1, title: "이혼 소장 제출 + 면접교섭 사전처분 동시 신청",
              desc: "소장을 낼 때 '면접교섭 허용 사전처분 신청서'를 함께 제출해요. 이혼 판결 전에도 아이를 정기적으로 만날 수 있는 임시 결정을 받을 수 있어요. 132에서 무료로 신청서 작성을 도와줘요." },
            { n: 2, title: "법원 사전처분 결정",
              desc: "법원이 임시 면접교섭 일정(예: 격주 토요일 10시~일요일 18시)을 결정해줘요. 결정 즉시 효력이 발생해요. 사건마다 기간이 다를 수 있어요." },
            { n: 3, title: "상대방이 방해하면 이행명령 신청",
              desc: "정당한 이유 없이 면접교섭을 거부하면 과태료(1,000만원 이하)를 부과받아요(가사소송법 제67조). 반복 거부 시 양육권 변경 사유가 될 수도 있어요. 방해 기록을 날짜별로 남겨두세요." },
            { n: 4, title: "이혼 판결 확정 후 면접교섭 조건 확정",
              desc: "이혼 판결에 면접교섭 일정·장소·방법이 명시돼요. 이후 변경이 필요하면 가정법원에 면접교섭 변경 심판을 청구해요." },
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
        <GreenBox title="면접교섭권 핵심">
          면접교섭권은 비양육자가 아이를 정기적으로 만나는 부모의 당연한 권리예요 (민법 제837조의2)<br />
          이혼 판결 전에도 사전처분으로 임시 면접교섭 결정을 받을 수 있어요<br />
          방해 시 과태료 1,000만원 이하 (가사소송법 제67조)<br />
          아이에게 실질적 해가 인정되면 법원이 제한·금지할 수 있어요
        </GreenBox>

        <HubLinks />

        <Divider />

        {/* H2 ② */}
        <H2>면접교섭을 방해할 때 대응 방법</H2>
        <p style={body}>
          결정이 났는데도 상대방이 아이를 안 보내줘요.<br />
          방해 유형에 따라 대응 수단이 달라요.
        </p>
        <BorderBox title="방해 유형별 대응">
          단순 거부: 가정법원 이행명령 신청 → 과태료 부과<br />
          반복 거부: 양육권 변경 청구 사유 → 방해 기록(날짜·내용·카카오톡) 보관 필수<br />
          아이 세뇌·거부 유도: 가정법원에 면접교섭 제한 심판 변경 청구<br />
          이사로 연락 두절: 법원에 소재 파악 신청 + 이행명령
        </BorderBox>
        <BorderBox title="방해 기록 이렇게 남겨두세요">
          날짜, 시간, 거부 사유, 상대방 발언을 메모<br />
          카카오톡·문자로 면접교섭 요청 → 거부 답변 캡처<br />
          이 기록이 이행명령 신청과 양육권 변경 청구의 핵심 증거가 돼요
        </BorderBox>

        <Divider />

        {/* H2 ③ */}
        <H2>협의서에 면접교섭 조건을 구체적으로 써야 해요</H2>
        <p style={body}>
          협의이혼 시 면접교섭 조건을 모호하게 쓰면 이후 분쟁이 반복돼요.<br />
          법원에 제출한 협의서는 판결문과 동일한 효력이 있어요.
        </p>
        <BorderBox title="협의서에 반드시 명시해야 하는 내용">
          면접교섭 빈도: 격주 토요일, 매달 첫째·셋째 주 주말 등 구체적으로<br />
          시간: 토요일 10:00 ~ 일요일 18:00 등 시작·종료 시각 명확히<br />
          인도 장소·귀가 장소 명시<br />
          방학·명절·생일 특별 교섭 조건
        </BorderBox>
        <BorderBox title="재판이혼 판결에서도 이렇게 요청하세요">
          면접교섭 빈도·시간·장소를 소장에 구체적으로 기재해요<br />
          법원이 판결에 명시해줘요 — 모호하면 이후 분쟁이 생겨요<br />
          이행명령 신청 시 구체적인 조건이 있어야 강제집행이 가능해요
        </BorderBox>

        <Divider />

        {/* H2 ④ */}
        <H2>면접교섭권, 지금 당장 이렇게 시작하세요</H2>
        <p style={body}>
          오늘 할 수 있는 것부터 순서대로 정리했어요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2",
              title: "132 전화 — 신청서 작성 지원",
              desc: "대한법률구조공단 132에 전화하면 면접교섭 사전처분 신청서 작성을 무료로 도와줘요. 소득 기준 125% 이하면 소송 비용도 지원돼요." },
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2",
              title: "방해 기록 시작",
              desc: "아이를 못 만난 날짜, 상대방 거부 사유, 관련 카카오톡을 지금부터 기록하세요. 이행명령 신청의 핵심 증거가 돼요." },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED",
              title: "이혼 소장 + 사전처분 신청서 제출",
              desc: "대법원 전자소송(ecfs.scourt.go.kr)에서 온라인 신청 가능해요. 132에서 작성을 도와줘요." },
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
