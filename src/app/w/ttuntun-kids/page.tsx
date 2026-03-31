"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 데이터
// 출처: 대한민국 정책브리핑 2026 튼튼머니 공식 공고, 국민체육진흥공단 nfa.kspo.or.kr

const FAQS = [
  {
    urgent: true,
    q: "아이 나이가 몇 살부터 참여할 수 있어요?",
    a: "만 4세 이상이면 참여할 수 있어요. 2026년부터 참여 연령이 만 11세에서 만 4세로 확대됐어요. 유아부터 초등학생까지 모두 포함돼요. 단, 아이 본인 명의로 국민체력100 계정을 만들어야 해요.",
  },
  {
    urgent: true,
    q: "14세 미만은 제로페이를 못 쓴다는데, 포인트를 어떻게 사용해요?",
    a: "만 14세 미만은 제로페이 앱 사용이 제한돼요. 대신 튼튼머니 앱에서 5,000P 단위로 문화상품권 교환을 신청할 수 있어요. 교환 신청 후 7일 이내에 모바일 문화상품권이 발송돼요. 온·오프라인 문화상품권 사용처 어디서나 쓸 수 있어요.",
  },
  {
    urgent: true,
    q: "부모가 아이 대신 운동 인증을 해줄 수 있나요?",
    a: "안 돼요. 각자 본인 계정으로 각자 시설에서 QR 인증을 해야 해요. 포인트는 개인 계정별로 적립돼요. 부모가 아이 계정을 관리(로그인 대리)는 할 수 있어도, 부모가 운동하고 아이 계정으로 인증하는 건 불가해요.",
  },
  {
    urgent: false,
    q: "4인 가족이 모두 참여하면 얼마나 받을 수 있어요?",
    a: "가족 구성원 각자 최대 5만P씩 적립돼요. 4인 가족 기준 최대 4 × 50,000P = 200,000P(20만원 상당)까지 가능해요. 가족 단위 참여가 가장 효율적으로 혜택을 극대화할 수 있는 방법이에요.",
  },
  {
    urgent: false,
    q: "아이가 다니는 태권도장·수영장도 적립이 되나요?",
    a: "튼튼머니 지정 적립시설로 등록된 곳이면 가능해요. 태권도·수영·무도장 등도 등록 대상이에요. 아이가 다니는 시설이 등록됐는지 nfa.kspo.or.kr에서 시설명으로 검색해서 먼저 확인하세요. 미등록이면 시설 측에 등록을 요청할 수 있어요.",
  },
  {
    urgent: false,
    q: "문화상품권 교환 후 유효기간이 있나요?",
    a: "교환 후 발송되는 모바일 문화상품권에는 별도 유효기간이 있어요. 문화상품권 발행사 기준을 따르므로 수령 후 확인하세요. 단, 튼튼머니 포인트 자체는 2026년 12월 20일까지 전환해야 소멸을 막을 수 있어요.",
  },
  {
    urgent: false,
    q: "아이 계정을 부모가 대신 만들어줄 수 있나요?",
    a: "네. 부모가 아이 정보로 국민체력100 계정을 만들어줄 수 있어요. 본인 인증 과정에서 법정대리인 인증 절차가 필요할 수 있어요. 가입 후 아이 계정 로그인은 부모가 대신 관리해줄 수 있어요.",
  },
];

const STEPS = [
  {
    title: "아이 명의로 국민체력100 회원가입",
    desc: "nfa.kspo.or.kr 또는 튼튼머니 앱에서 아이 정보로 계정을 만들어요. 만 4세 이상이면 가입 가능해요. 법정대리인 인증이 필요할 수 있어요.",
    link: { label: "nfa.kspo.or.kr", url: "https://nfa.kspo.or.kr" },
  },
  {
    title: "아이가 다니는 시설이 적립시설인지 확인",
    desc: "태권도장·수영장·축구 교실 등 아이가 운동하는 시설이 튼튼머니 지정 시설인지 먼저 확인해요. nfa.kspo.or.kr에서 시설명으로 검색하면 돼요.",
    tip: "목록에 없으면 시설 측에 등록 요청",
  },
  {
    title: "운동 전 아이 계정으로 QR 시작 인증",
    desc: "아이 계정으로 로그인한 상태에서 시설 QR코드를 스캔해요. 부모가 대신 로그인해서 스캔해줄 수 있어요.",
    tip: "아이 계정으로 로그인 필수",
  },
  {
    title: "30분 이상 운동 후 QR 종료 인증",
    desc: "운동 후 같은 QR코드를 다시 스캔해요. 두 번 모두 완료되면 500P가 아이 계정에 자동 적립돼요.",
  },
  {
    title: "5,000P 모이면 문화상품권 교환",
    desc: "튼튼머니 앱에서 아이 계정으로 로그인 후 문화상품권 교환 신청을 해요. 5,000P 단위로 신청 가능하고 7일 이내 모바일 문화상품권이 발송돼요.",
    tip: "14세 미만 전용 · 제로페이 사용 불가",
  },
];

const HUB_LINKS = [
  { title: "튼튼머니 적립방법 | QR 두 번 찍는 이유", desc: "포인트 안 쌓일 때 원인·해결법", href: "/w/튼튼머니-적립방법" },
  { title: "튼튼머니 사용처 | 제로페이·슬리머니 전환", desc: "성인 계정 포인트 사용처 안내", href: "/w/튼튼머니-사용처" },
  { title: "튼튼머니 포인트 계산 | 5만원 채우려면 몇 번?", desc: "가족별 포인트 계산기", href: "/w/튼튼머니-포인트-계산" },
  { title: "튼튼머니 앱 사용법 | 설치·로그인·QR 인증 순서", desc: "앱 설치부터 인증까지 단계별 안내", href: "/w/튼튼머니-앱" },
];

const SIDEBAR_LINKS = [
  "튼튼머니 어린이 참여",
  "튼튼머니 4세 이상 가입",
  "튼튼머니 가족 참여",
  "튼튼머니 14세 미만 사용",
  "튼튼머니 문화상품권 교환",
  "튼튼머니 아이 계정 만들기",
  "튼튼머니 수영장 아이",
  "튼튼머니 태권도 적립",
  "튼튼머니 가족 포인트 계산",
  "튼튼머니 적립방법",
  "튼튼머니 사용처",
  "튼튼머니 적립시설 찾기",
  "튼튼머니 앱 다운로드",
  "튼튼머니 포인트 소멸",
  "국민체육진흥공단 문의",
];

// ─── 디자인 토큰
const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

// ─── 상단 버튼
function ApplyButtons() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
      <a href="https://nfa.kspo.or.kr" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
        🏃 아이 계정 국민체력100 가입
      </a>
      <a href="https://nfa.kspo.or.kr/spoint/selectSpointFacility.kspo" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
        📍 아이 운동 시설 적립 여부 확인
      </a>
    </div>
  );
}

// ─── 긴급 배너
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    age: {
      title: "우리 아이 나이가 되는지 확인하려면",
      color: G,
      bg: GL,
      text: "만 4세 이상이면 참여할 수 있어요. 2026년부터 참여 연령이 확대됐어요. 유아부터 초등학생·중학생까지 모두 포함이에요. 만 14세 이상이 되면 제로페이도 쓸 수 있어요.",
    },
    use: {
      title: "아이 포인트를 어디서 쓰는지 모르겠다면",
      color: "#2563EB",
      bg: "#EFF6FF",
      text: "만 14세 미만은 제로페이를 쓸 수 없어요. 대신 튼튼머니 앱에서 5,000P 단위로 문화상품권을 교환할 수 있어요. 교환 신청 후 7일 이내에 모바일 문화상품권이 발송돼요.",
    },
    facility: {
      title: "아이 태권도장·수영장이 되는지 확인하려면",
      color: "#D97706",
      bg: "#FFFBEB",
      text: "nfa.kspo.or.kr → 튼튼머니 → 적립시설 메뉴에서 시설명으로 검색하세요. 태권도·수영·무도장 등도 등록 대상이에요. 목록에 없으면 시설 측에 등록을 요청해보세요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "age",      label: "우리 아이 나이가 되는지 확인하고 싶어요." },
          { id: "use",      label: "아이 포인트를 어디서 써야 하는지 모르겠어요." },
          { id: "facility", label: "아이 태권도장·수영장도 적립이 되는지 확인하고 싶어요." },
        ].map((item: any) => (
          <button key={item.id} onClick={(_e: any) => setType(item.id)} style={{
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
        <button onClick={(_e: any) => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 가족 포인트 계산기
function FamilyCalc() {
  const [members, setMembers] = useState(4);
  const [kidsUnder14, setKidsUnder14] = useState(2);

  const adults = Math.max(0, members - kidsUnder14);
  const kids   = Math.min(kidsUnder14, members);
  const totalPt = members * 50000;
  const adultPt = adults * 50000;
  const kidPt   = kids * 50000;

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        가족 구성원 수와 14세 미만 아이 수를 입력하면 가족 전체 예상 포인트가 나와요.
      </p>
      {[
        { label: "가족 구성원 수", display: `${members}명`, min: 1, max: 6, step: 1, val: members, set: setMembers },
        { label: "14세 미만 아이", display: `${kids}명`, min: 0, max: members, step: 1, val: kidsUnder14, set: (v) => setKidsUnder14(Math.min(v, members)) },
      ].map((s: any) => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <label style={{ fontSize: 13, color: "#6b7280", width: 120, flexShrink: 0 }}>{s.label}</label>
          <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
            onChange={(e: any) => s.set(+e.target.value)}
            style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 13, fontWeight: 700, minWidth: 60, textAlign: "right", color: "#111" }}>{s.display}</span>
        </div>
      ))}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 8 }}>
        <div style={{ background: GL, borderRadius: 8, border: "1px solid #9FE1CB", padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>가족 전체 최대</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: G }}>{totalPt.toLocaleString()}P</div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>≈ {(totalPt/10000).toFixed(0)}만원 상당</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>성인 ({adults}명)</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#374151" }}>{adultPt.toLocaleString()}P</div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>제로페이·슬리머니</div>
        </div>
        <div style={{ background: "#FFF7ED", borderRadius: 8, border: "1px solid #FED7AA", padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>14세 미만 ({kids}명)</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#D97706" }}>{kidPt.toLocaleString()}P</div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>문화상품권으로 교환</div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 기본 스포츠활동 5만P 기준. 체력측정·특별포인트 제외. 실제 적립은 예산 소진 시 조기 종료될 수 있어요.
      </p>
    </div>
  );
}

// ─── 연령별 비교 체커
function AgeChecker() {
  const [age, setAge] = useState("");
  const ageNum = parseInt(age, 10);

  function getInfo() {
    if (!age || isNaN(ageNum)) return null;
    if (ageNum < 4)  return { type: "under4",  color: "#DC2626", bg: "#FEF2F2" };
    if (ageNum < 14) return { type: "kids",    color: "#D97706", bg: "#FFFBEB" };
    return             { type: "adult",   color: G,        bg: GL };
  }

  const info = getInfo();
  const details = {
    under4: {
      title: "만 4세 미만 — 참여 불가",
      items: [
        { ok: false, text: "튼튼머니 참여 대상이 아니에요" },
        { ok: false, text: "국민체력100 회원가입 불가" },
      ],
    },
    kids: {
      title: `만 ${ageNum}세 — 참여 가능 (14세 미만)`,
      items: [
        { ok: true,  text: "튼튼머니 참여 가능 · 연 최대 5만P 적립" },
        { ok: true,  text: "지정 시설에서 30분 운동 + QR 인증으로 500P" },
        { ok: false, text: "제로페이 앱 사용 제한 — 스포츠상품권 전환 불가" },
        { ok: true,  text: "튼튼머니 앱에서 5,000P 단위 문화상품권 교환 가능" },
        { ok: true,  text: "부모가 계정 관리 가능" },
      ],
    },
    adult: {
      title: `만 ${ageNum}세 — 참여 가능 (14세 이상)`,
      items: [
        { ok: true,  text: "튼튼머니 참여 가능 · 연 최대 5만P 적립" },
        { ok: true,  text: "지정 시설에서 30분 운동 + QR 인증으로 500P" },
        { ok: true,  text: "제로페이 스포츠상품권 전환 가능 (1,000P 단위)" },
        { ok: true,  text: "삼성생명 슬리머니 전환 가능" },
        { ok: true,  text: "전국 약 8만 6천 곳 제로페이 가맹점에서 사용" },
      ],
    },
  };

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.7 }}>
        아이 만 나이를 입력하면 참여 가능 여부와 사용처를 바로 확인할 수 있어요.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <label style={{ fontSize: 13, color: "#6b7280", flexShrink: 0 }}>만 나이</label>
        <input type="number" value={age} onChange={(e: any) => setAge(e.target.value)} placeholder="예: 8"
          style={{ flex: 1, padding: "9px 12px", borderRadius: 7, border: "1px solid #d1d5db", fontSize: 14 }} />
      </div>
      {info && (
        <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: 8, background: info.bg, border: `1px solid ${info.color}33` }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: info.color, marginBottom: 10 }}>{details[info.type].title}</p>
          {details[info.type].items.map((item: any, i: any) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 14, color: item.ok ? G : "#DC2626", flexShrink: 0 }}>{item.ok ? "✓" : "✗"}</span>
              <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.7 }}>{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 절차 스텝
function ProcessSteps() {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {STEPS.map((s: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < STEPS.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />
          )}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
            {s.link && (
              <div style={{ marginTop: 8 }}>
                <a href={s.link.url} target="_self"
                  style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600 }}>
                  🌐 {s.link.label}
                </a>
              </div>
            )}
            {s.tip && (
              <span style={{ display: "inline-block", fontSize: 12, marginTop: 7, background: GL, color: "#0F6E56", borderRadius: 6, padding: "4px 10px" }}>
                {s.tip}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── FAQ
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f: any, i: any) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={(_e: any) => setOpen(open === i ? null : i)}
            style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff" }}>
            <span>
              {f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && (
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── CTA
function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>가족 모두 지금 시작하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        4인 가족이면 최대 20만원.<br />아이 계정부터 만들어보세요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        만 4세 이상 아이라면 각자 포인트를 쌓을 수 있어요.<br />
        14세 미만은 문화상품권으로 교환해서 사용해요.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://nfa.kspo.or.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none" }}>
          🌐 국민체력100 가입하기
        </a>
        <a href="https://nfa.kspo.or.kr/spoint/selectSpointFacility.kspo" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📍 아이 시설 적립 여부 확인
        </a>
      </div>
    </div>
  );
}

// ─── 허브 링크
function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 튼튼머니 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a key={i} href={link.href} target="_self"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
      <a href="/w/튼튼머니-신청방법" target="_self"
        style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>
        튼튼머니 전체 가이드 보기 →
      </a>
    </div>
  );
}

// ─── 출처
function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {[
        { category: "공식 자료", items: [
          { label: "대한민국 정책브리핑 — 2026 튼튼머니 공식 공고", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148959930" },
          { label: "국민체력100 공식 홈페이지 (nfa.kspo.or.kr)", url: "https://nfa.kspo.or.kr" },
          { label: "국민체육진흥공단 문의 ☎02-410-1414", url: "tel:0241011414" },
        ]},
      ].map((group: any) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item: any) => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요. 참여 조건·포인트 기준은 변경될 수 있으니 반드시 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

// ─── 사이드바
function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>튼튼머니 관련 글</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" target="_self"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── 메인
export default function TtuntunMoneyKidsPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>복지 · 스포츠 · 국민체육진흥공단</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          튼튼머니 어린이 참여 |<br />
          4세 이상·14세 미만 문화상품권 전환
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          아이도 참여할 수 있다는 거 알고 계셨어요?<br />
          4세 이상이면 가족 모두 각자 포인트를 쌓을 수 있어요.<br /><br />
          단, 14세 미만은 제로페이를 쓸 수 없어요. 아이 포인트는 문화상품권으로 교환해야 해요.<br />
          아래에서 아이 나이를 입력하면 바로 확인돼요.
        </p>

        <ApplyButtons />
        <UrgentBanner />

        <Bdg>아이 나이로 참여 가능 여부·사용처 바로 확인</Bdg>
        <AgeChecker />

        <Divider />

        <H2>가족이 함께하면 얼마나 받을 수 있나요</H2>
        <p style={body}>
          가족 구성원 수를 입력하면 전체 예상 포인트를 계산해줘요.<br />
          성인은 제로페이, 14세 미만 아이는 문화상품권으로 각자 혜택을 챙길 수 있어요.
        </p>
        <Bdg>가족 포인트 계산기</Bdg>
        <FamilyCalc />
        <GreenBox title="4인 가족 최대 혜택 예시">
          부모 2명 × 5만P = 10만P → 제로페이 스포츠상품권 (헬스장·약국·병원)<br />
          초등생 자녀 2명 × 5만P = 10만P → 문화상품권 (도서·문화시설·온라인 쇼핑)<br />
          합계: 최대 20만P (20만원 상당)<br /><br />
          가족이 함께 운동 습관을 만들면서 가계 혜택까지 챙길 수 있어요.
        </GreenBox>

        <Divider />

        <H2>아이 계정 만들고 참여하는 방법</H2>
        <p style={body}>
          아이 명의로 별도 계정을 만들어야 해요.<br />
          부모 계정으로 아이 포인트를 합산하는 건 안 돼요. 각자 계정, 각자 포인트예요.
        </p>
        <Bdg>아이 참여 절차</Bdg>
        <ProcessSteps />
        <BorderBox title="14세 미만 포인트 사용법">
          전환 방법: 튼튼머니 앱 → 아이 계정 로그인 → 문화상품권 교환 신청<br />
          최소 교환: 5,000P 단위<br />
          발송: 교환 신청 후 7일 이내 모바일 문화상품권 발송<br />
          사용처: 온·오프라인 문화상품권 사용처 전체<br />
          ※ 제로페이 앱은 만 14세 이상부터 사용 가능해요
        </BorderBox>

        <Divider />

        <H2>아이가 운동할 수 있는 적립시설은?</H2>
        <p style={body}>
          아이가 다니는 태권도·수영·체육관도 지정 적립시설이면 포인트가 쌓여요.<br />
          어른 전용 시설이 아니에요. 아이 눈높이에 맞는 시설이 많이 등록돼 있어요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { icon: "🥋", label: "태권도·검도·합기도" },
            { icon: "🏊", label: "수영장" },
            { icon: "⚽", label: "축구·풋살" },
            { icon: "🏸", label: "배드민턴" },
            { icon: "🤸", label: "체조·발레" },
            { icon: "🏋️", label: "피트니스·헬스" },
            { icon: "🎾", label: "테니스·스쿼시" },
            { icon: "🏃", label: "국민체력인증센터" },
          ].map((f: any, i: any) => (
            <div key={i} style={{ background: GL, borderRadius: 8, padding: "12px 14px", textAlign: "center", border: "1px solid #9FE1CB" }}>
              <p style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</p>
              <p style={{ fontSize: 12, color: GD, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{f.label}</p>
            </div>
          ))}
        </div>
        <p style={{ ...body, color: "#9ca3af", fontSize: 12 }}>
          ※ 종류가 맞더라도 튼튼머니 지정 적립시설로 등록된 곳이어야 해요. nfa.kspo.or.kr에서 시설명으로 직접 확인하세요.
        </p>

        <HubLinks />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공을 목적으로 작성됐어요. 참여 연령·포인트 기준은 사업 계획에 따라 변경될 수 있으니, 중요한 결정 전에 반드시 국민체력100 공식 홈페이지(nfa.kspo.or.kr)를 직접 확인하세요. 문의: ☎02-410-1414
        </div>
      </div>
    </div>
  );
}
