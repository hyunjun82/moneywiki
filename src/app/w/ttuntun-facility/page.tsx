"use client";
import { useState } from "react";

// ─── 데이터
// 출처: 국민체력100 공식 홈페이지 (nfa.kspo.or.kr), 2026년 사업 기준

const FACILITY_TYPES = [
  { icon: "🏋️", name: "헬스장·피트니스센터", ok: true },
  { icon: "🏊", name: "수영장", ok: true },
  { icon: "🧘", name: "필라테스·요가원", ok: true },
  { icon: "🏓", name: "탁구장", ok: true },
  { icon: "🥊", name: "무도장 (검도·태권도 등)", ok: true },
  { icon: "🎳", name: "볼링장", ok: true },
  { icon: "🏃", name: "국민체력인증센터", ok: true },
  { icon: "⚽", name: "축구장·풋살장", ok: null },
  { icon: "🏠", name: "집 근처 아파트 헬스장", ok: false },
  { icon: "🏢", name: "회사 내 피트니스", ok: false },
  { icon: "🛒", name: "대형마트 문화센터", ok: null },
];

const SEARCH_STEPS = [
  {
    title: "nfa.kspo.or.kr 접속",
    desc: "국민체력100 공식 홈페이지에 접속해요. 로그인 없이도 시설 검색이 가능해요.",
    link: { label: "nfa.kspo.or.kr", url: "https://nfa.kspo.or.kr" },
  },
  {
    title: "상단 메뉴 [튼튼머니] → [적립시설] 클릭",
    desc: "홈페이지 상단 메뉴에서 튼튼머니 → 적립시설을 선택해요. 지도 또는 목록 형태로 확인할 수 있어요.",
    tip: "목록은 매주 월요일 오후 2시에 업데이트돼요",
  },
  {
    title: "시/도 → 시/군/구 선택",
    desc: "내가 운동하는 지역을 선택하면 해당 지역 등록 시설 목록이 나와요. 시설명·주소·운동 종류를 확인할 수 있어요.",
  },
  {
    title: "시설명으로 직접 검색",
    desc: "내가 다니는 헬스장 이름을 검색창에 입력해서 직접 확인하는 게 가장 빠르고 정확해요.",
    tip: "목록에 없으면 지정 시설이 아닌 거예요",
  },
];

const REGISTER_STEPS = [
  {
    title: "nfa.kspo.or.kr 접속 → [튼튼머니] → [적립시설 등록신청]",
    desc: "국민체력100 홈페이지 상단 메뉴에서 적립시설 등록신청 버튼을 클릭해요.",
  },
  {
    title: "3가지 동의·확인 사항 동의",
    desc: "개인정보 처리 동의, 허위정보 입력 시 지정 취소 동의 등 3가지를 확인하고 동의해야 신청서를 작성할 수 있어요.",
  },
  {
    title: "시설 정보 입력 + 사업자등록증 첨부",
    desc: "시설명·주소·운동 종류·대표자 정보 등을 입력하고 사업자등록증을 첨부해요.",
    tip: "허위정보 입력 시 지정 취소 및 재신청 제한",
  },
  {
    title: "심사 진행 (최대 7일)",
    desc: "순차 심사 후 결과를 카카오톡으로 통보해요. 영업일 기준으로 최대 7일 소요돼요.",
  },
  {
    title: "승인 완료 → QR코드 키트 수령 → 부착",
    desc: "승인 완료 후 QR코드 키트를 수령해 시설 내 잘 보이는 곳에 부착해요. 부착 후 회원들이 바로 포인트 적립을 시작할 수 있어요.",
    tip: "목록 반영: 매주 월요일 오후 2시",
  },
];

const FAQS = [
  {
    urgent: true,
    q: "내가 다니는 헬스장이 목록에 없어요. 포인트 못 받는 건가요?",
    a: "목록에 없으면 지정 적립시설이 아니에요. QR을 찍어도 포인트가 안 쌓여요. 두 가지 방법이 있어요. ① 해당 헬스장에 튼튼머니 적립시설 등록을 요청하세요 — 무료 등록이라 대부분 수락해줘요. ② 집 근처 다른 지정 시설로 바꿔서 운동해요. nfa.kspo.or.kr에서 내 동네 지정 시설을 검색하면 생각보다 가까운 곳이 많아요.",
  },
  {
    urgent: true,
    q: "아파트 단지 헬스장이나 회사 피트니스도 되나요?",
    a: "안 돼요. 개인 또는 법인 소유의 체육시설로 사업자등록이 돼 있어야 해요. 아파트 공용 헬스장, 회사 내 피트니스, 개인 홈짐은 등록 대상이 아니에요. 반드시 nfa.kspo.or.kr에서 지정 여부를 확인하세요.",
  },
  {
    urgent: true,
    q: "목록에 있는 시설인데도 포인트가 안 쌓여요.",
    a: "QR 인증 방법이 잘못된 경우가 대부분이에요. 시작 QR과 종료 QR 두 번 모두 찍어야 해요. 앱 출시(3월 31일) 이후에는 튼튼머니 앱으로만 인증이 가능해요. 홈페이지 QR은 앱 출시 후 사용 불가예요. 시설 내 QR코드 위치를 직원에게 물어보는 것도 방법이에요.",
  },
  {
    urgent: false,
    q: "시설 목록이 자주 업데이트되나요?",
    a: "매주 월요일 오후 2시에 업데이트돼요. 새로 등록된 시설이 있으면 그때 반영되니, 못 찾았던 시설이 다음 주에 올라올 수도 있어요. 자주 운동하는 시설이 아직 미등록이라면 헬스장 측에 등록 요청을 해보세요.",
  },
  {
    urgent: false,
    q: "헬스장 운영자인데 등록하면 어떤 점이 좋은가요?",
    a: "회원들이 포인트를 쌓으러 더 자주 방문하게 돼요. 등록·운영 비용은 무료예요. QR코드 키트를 받아서 시설 내 부착하는 것만으로 끝이에요. 심사 기간은 최대 7일이고, 결과는 카카오톡으로 통보돼요.",
  },
  {
    urgent: false,
    q: "전국에 지정 시설이 몇 개나 있나요?",
    a: "2026년 기준 전국 약 4,000여 개 시설이 등록돼 있어요. 계속 늘어나는 추세예요. 헬스장·수영장·필라테스·요가·탁구장·볼링장·무도장·국민체력인증센터 등 다양한 종류가 포함돼 있어요.",
  },
  {
    urgent: false,
    q: "앱 출시 후에는 시설 검색 방법이 달라지나요?",
    a: "튼튼머니 전용 앱(3월 31일 출시 예정)에서는 내 위치 기반으로 주변 적립시설을 지도에서 실시간 검색할 수 있어요. 홈페이지보다 훨씬 편리해요. 앱 출시 후에는 앱을 통한 검색과 인증을 추천해요.",
  },
];

const HUB_LINKS = [
  { title: "튼튼머니 적립방법 | QR 두 번 찍는 이유", desc: "포인트 안 쌓일 때 원인·해결법", href: "/w/튼튼머니-적립방법" },
  { title: "튼튼머니 사용처 | 제로페이·슬리머니 전환", desc: "쌓은 포인트 어디서 어떻게 쓰는지", href: "/w/튼튼머니-사용처" },
  { title: "튼튼머니 포인트 계산 | 5만원 채우려면 몇 번?", desc: "활동별 포인트 계산기", href: "/w/튼튼머니-포인트-계산" },
  { title: "튼튼머니 앱 사용법 | 설치·로그인·QR 인증 순서", desc: "앱 출시 후 인증 방법 단계별 안내", href: "/w/튼튼머니-앱" },
];

const SIDEBAR_LINKS = [
  "튼튼머니 적립시설 찾기",
  "내 헬스장 튼튼머니 되는지",
  "튼튼머니 지정시설 검색",
  "튼튼머니 적립시설 등록",
  "튼튼머니 수영장 되나요",
  "튼튼머니 필라테스 가능",
  "튼튼머니 아파트 헬스장",
  "튼튼머니 적립시설 목록",
  "국민체력100 시설 검색",
  "튼튼머니 적립방법",
  "튼튼머니 사용처",
  "튼튼머니 포인트 계산",
  "튼튼머니 앱 다운로드",
  "튼튼머니 QR 인증 방법",
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
      <a href="https://nfa.kspo.or.kr/spoint/selectSpointFacility.kspo" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
        📍 내 주변 적립시설 검색
      </a>
      <a href="https://nfa.kspo.or.kr" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
        🏢 적립시설 등록신청
      </a>
    </div>
  );
}

// ─── 긴급 배너
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    check: {
      title: "내 헬스장이 되는지 확인하려면",
      color: G,
      bg: GL,
      text: "nfa.kspo.or.kr → 튼튼머니 → 적립시설 메뉴에서 시설명으로 검색하세요. 목록에 있으면 OK, 없으면 지정 시설이 아니에요. 목록은 매주 월요일 오후 2시에 업데이트돼요.",
    },
    notlisted: {
      title: "내 헬스장이 목록에 없다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "두 가지 방법이 있어요. ① 헬스장 측에 등록을 요청하세요 — 무료 등록이라 거절하는 곳이 거의 없어요. ② 아니면 집 근처 다른 지정 시설에서 운동하면 돼요. nfa.kspo.or.kr에서 내 동네를 선택하면 등록된 시설 목록을 바로 확인할 수 있어요.",
    },
    register: {
      title: "시설 운영자인데 등록하려면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "nfa.kspo.or.kr → 튼튼머니 → 적립시설 등록신청에서 온라인으로 신청해요. 사업자등록증 첨부 후 최대 7일 심사, 결과는 카카오톡으로 통보돼요. 등록·운영 비용은 무료예요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "check",     label: "내가 다니는 헬스장이 적립시설인지 확인하고 싶어요." },
          { id: "notlisted", label: "검색했는데 목록에 없어요." },
          { id: "register",  label: "시설 운영자인데 등록하고 싶어요." },
        ].map((item) => (
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

// ─── 시설 유형 체커
function FacilityChecker() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.7 }}>
        내가 운동하는 시설 종류를 선택해서 적립 가능 여부를 바로 확인하세요.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
        {FACILITY_TYPES.map((f, i) => (
          <button key={i} onClick={() => setSelected(i === selected ? null : i)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, border: `1px solid ${selected === i ? (f.ok === true ? G : f.ok === false ? "#DC2626" : "#D97706") : "#e5e7eb"}`, background: selected === i ? (f.ok === true ? GL : f.ok === false ? "#FEF2F2" : "#FFFBEB") : "#fff", cursor: "pointer", textAlign: "left", fontSize: 13, color: "#374151" }}>
            <span style={{ fontSize: 18 }}>{f.icon}</span>
            <span style={{ flex: 1, lineHeight: 1.4 }}>{f.name}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: 8, background: FACILITY_TYPES[selected].ok === true ? GL : FACILITY_TYPES[selected].ok === false ? "#FEF2F2" : "#FFFBEB", border: `1px solid ${FACILITY_TYPES[selected].ok === true ? "#9FE1CB" : FACILITY_TYPES[selected].ok === false ? "#FCA5A5" : "#FED7AA"}` }}>
          {FACILITY_TYPES[selected].ok === true && (
            <p style={{ fontSize: 14, fontWeight: 600, color: GD, margin: 0 }}>
              ✅ 적립 가능한 시설 종류예요.<br />
              <span style={{ fontSize: 13, fontWeight: 400, color: "#374151" }}>단, 해당 시설이 튼튼머니 적립시설로 등록됐는지 반드시 nfa.kspo.or.kr에서 확인하세요.</span>
            </p>
          )}
          {FACILITY_TYPES[selected].ok === false && (
            <p style={{ fontSize: 14, fontWeight: 600, color: "#DC2626", margin: 0 }}>
              ❌ 이 시설은 적립 대상이 아니에요.<br />
              <span style={{ fontSize: 13, fontWeight: 400, color: "#374151" }}>사업자 등록이 된 체육시설이어야 해요. 아파트 공용 헬스장, 회사 피트니스, 홈짐은 등록이 안 돼요.</span>
            </p>
          )}
          {FACILITY_TYPES[selected].ok === null && (
            <p style={{ fontSize: 14, fontWeight: 600, color: "#D97706", margin: 0 }}>
              ⚠️ 시설에 따라 달라요.<br />
              <span style={{ fontSize: 13, fontWeight: 400, color: "#374151" }}>사업자 등록이 된 시설이고 튼튼머니 적립시설로 등록됐다면 가능해요. nfa.kspo.or.kr에서 시설명으로 직접 검색하세요.</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── 절차 스텝
function ProcessSteps({ steps }: any) {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < steps.length - 1 && (
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
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>지금 바로 확인하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        내 헬스장이 되는지,<br />지금 30초면 확인해요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        전국 4,000여 개 시설 중에 내 동네 시설이 있을 거예요.<br />
        없으면 헬스장에 등록 요청하거나, 가까운 다른 시설을 찾아보세요.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://nfa.kspo.or.kr/spoint/selectSpointFacility.kspo" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none" }}>
          📍 내 주변 적립시설 검색
        </a>
        <a href="tel:0241011414" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 02-410-1414 문의
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
        {HUB_LINKS.map((link, i) => (
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
          { label: "국민체력100 — 튼튼머니 적립시설 검색", url: "https://nfa.kspo.or.kr/spoint/selectSpointFacility.kspo" },
          { label: "국민체력100 — 적립시설 등록신청", url: "https://nfa.kspo.or.kr" },
          { label: "국민체육진흥공단 문의 ☎02-410-1414", url: "tel:0241011414" },
        ]},
      ].map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 국민체력100 공식 자료를 바탕으로 작성됐어요. 시설 목록은 매주 월요일 오후 2시 업데이트되니 반드시 공식 홈페이지에서 직접 확인하세요.
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

// ─── 메인
export default function TtuntunMoneyFacilityPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>복지 · 스포츠 · 국민체육진흥공단</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          튼튼머니 적립시설 찾기 |<br />
          내 헬스장 되는지 확인하는 법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          지금 다니는 헬스장이 적립되는지, 운동 가기 전에 확인하고 싶으신 거죠?<br />
          아무 헬스장이나 되는 게 아니에요. 반드시 지정 적립시설이어야 포인트가 쌓여요.<br /><br />
          30초면 확인되니, 지금 바로 시설명을 검색해보세요.
        </p>

        <ApplyButtons />
        <UrgentBanner />

        <Bdg>내 운동 시설 종류로 적립 가능 여부 바로 확인</Bdg>
        <FacilityChecker />

        <p style={body}>
          종류만 맞다고 끝이 아니에요.<br />
          같은 헬스장이라도 튼튼머니 적립시설로 등록이 돼 있어야만 포인트가 쌓여요.<br />
          반드시 nfa.kspo.or.kr에서 시설명으로 직접 검색해서 확인하세요.
        </p>

        <Divider />

        <H2>내 헬스장 확인하는 법, 30초면 돼요</H2>
        <p style={body}>
          홈페이지에서 지역·시설명으로 바로 검색할 수 있어요.<br />
          앱 출시(3월 31일 예정) 후에는 앱에서 위치 기반으로 주변 시설을 지도로 확인할 수 있어요.
        </p>
        <Bdg>적립시설 검색 절차</Bdg>
        <ProcessSteps steps={SEARCH_STEPS} />
        <GreenBox title="시설 검색 핵심 포인트">
          시설 목록은 매주 월요일 오후 2시에 업데이트돼요.<br />
          검색해도 없다면 아직 미등록이에요 — 헬스장에 등록 요청을 해보세요.<br />
          전국 약 4,000여 개 시설이 등록돼 있어요. 생각보다 가까운 곳이 많아요.
        </GreenBox>

        <Divider />

        <H2>적립 가능한 시설 종류는?</H2>
        <p style={body}>
          헬스장·수영장·필라테스·요가·탁구장·볼링장·무도장·국민체력인증센터가 주요 종류예요.<br />
          단, 같은 종류라도 튼튼머니 적립시설로 등록된 곳만 포인트가 쌓여요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { label: "✅ 가능한 시설", items: ["헬스장·피트니스센터", "수영장", "필라테스·요가원", "탁구장·볼링장", "무도장 (검도·태권도 등)", "국민체력인증센터"], color: G, bg: GL },
            { label: "❌ 불가한 시설", items: ["아파트 공용 헬스장", "회사 내 피트니스", "개인 홈짐", "공공체육관 미등록 시설"], color: "#DC2626", bg: "#FEF2F2" },
          ].map((group, i) => (
            <div key={i} style={{ background: group.bg, borderRadius: 8, padding: "14px 16px", border: `1px solid ${group.color}22` }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: group.color, marginBottom: 10 }}>{group.label}</p>
              {group.items.map((item, j) => (
                <p key={j} style={{ fontSize: 13, color: "#374151", margin: "4px 0", lineHeight: 1.6 }}>· {item}</p>
              ))}
            </div>
          ))}
        </div>
        <BorderBox title="등록 여부가 전부예요">
          종류가 맞아도 미등록 시설에서는 QR을 찍어도 포인트가 0이에요.<br />
          nfa.kspo.or.kr 시설 검색 → 내 시설명 입력 → 목록에 있으면 OK, 없으면 미등록이에요.<br />
          미등록 시설이면 헬스장에 등록 요청하거나 다른 지정 시설로 이동하세요.
        </BorderBox>

        <HubLinks />

        <H2>내 헬스장을 적립시설로 등록 요청하고 싶다면</H2>
        <p style={body}>
          헬스장 측에 등록 요청하면 되는 경우가 많아요.<br />
          등록 비용은 무료고, 고객들이 포인트를 쌓으러 더 자주 오게 되니 헬스장 입장에서도 이득이에요.<br />
          운영자에게 아래 절차를 알려주거나, 직접 운영자라면 지금 바로 신청하세요.
        </p>
        <Bdg>시설 등록 절차 (운영자용)</Bdg>
        <ProcessSteps steps={REGISTER_STEPS} />

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공을 목적으로 작성됐어요. 시설 등록 여부는 수시로 바뀔 수 있으니, 중요한 결정 전에 반드시 국민체력100 공식 홈페이지(nfa.kspo.or.kr)에서 직접 확인하세요. 문의: ☎02-410-1414
        </div>
      </div>
    </div>
  );
}
