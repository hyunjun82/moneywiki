"use client";
import { useState } from "react";

// ─── Q1-Q5 사고 ────────────────────────────────────────
// Q1. ① 방금 부결 통보 받음(패닉) ② 왜 부결인지 모름 ③ 재신청 타이밍 궁금 ④ 대안 대출 찾는 중
// Q2. 부결 사유 파악 → 해당 사유 개선 → 재신청 or 대안 상품 신청
// Q3. 부결 사유 7가지, 사유별 개선법+타임라인, 재신청 시기, 대안 상품 4종
// Q4. 계산할 숫자 없음 → Calculator 생략
// Q5. UrgentBanner + RejectionDiagnosis(인터랙티브) + FAQ(아코디언) + HubLinks+CTA+Sidebar
//     — Calculator ✕, EligibilityChecker ✕, ProcessSteps ✕, Checklist ✕

// ─── 데이터 ──────────────────────────────────────────
const REASONS = [
  { id: "dti", title: "소득 대비 부채비율 과다 (DSR)", desc: "월소득 대비 기존 대출 상환액이 40~50%를 넘으면 부결돼요.",
    fixes: ["기존 대출 일부 상환으로 월 부담 줄이기", "소득 증빙자료 재확인 (최근 3~6개월 급여명세)", "고금리 카드론 → 저금리 갈아타기로 DSR 낮추기"],
    timeline: "부채 감소 후 1~2개월", action: "상환 계획 수립 → 1~2개월 부채 감소 → 재신청" },
  { id: "delinquency", title: "연체 기록 (90일+ or 3개월 내 30일+)", desc: "최근 연체 기록이 있으면 자동 부결이에요. 소액 미납도 포함돼요.",
    fixes: ["현재 연체 중인 금액 즉시 상환", "신용카드 결제 자동이체 설정", "통신료·공과금 미납 해소", "신용정보조회로 정확한 기록 확인"],
    timeline: "연체 해결 후 3~6개월", action: "전액 상환 → 3개월 이상 깨끗한 기록 → 재신청" },
  { id: "credit", title: "신용점수 부족 (NICE 600점 미만)", desc: "600점 미만이면 앱컷 단계에서 자동 탈락돼요.",
    fixes: ["신용카드 소액 사용 + 제때 결제 (실적 쌓기)", "휴면 카드 활성화로 신용 이력 늘리기", "기존 대출 조기 상환", "신용정보 오류 있으면 이의신청 (10~15일 소요)"],
    timeline: "신용 관리 3~6개월 이상", action: "카드 깔끔 사용 3~6개월 → 50~100점 상승 → 재신청" },
  { id: "card", title: "최근 신용카드 발급", desc: "1~2개월 내 카드를 만들었으면 신용도 평가와 겹쳐서 부결돼요.",
    fixes: ["카드 발급 후 최소 2~3개월 대기", "그 사이 소액 결제 3~4회로 실사용 기록 만들기", "불필요한 카드 추가 발급 자제"],
    timeline: "카드 발급 후 2~3개월", action: "3개월 대기 → 실사용 기록 쌓기 → 재신청" },
  { id: "loan", title: "최근 1~2개월 내 다른 대출", desc: "새 대출 기록이 신용도를 일시적으로 떨어뜨려요.",
    fixes: ["새 대출 기록이 3개월 경과하도록 대기", "1~2개월간 건강한 상환 실적 만들기", "재신청 전 신용조회 1회만으로 제한"],
    timeline: "대출 후 2~3개월", action: "3개월 건강 상환 → 신용도 회복 → 재신청" },
  { id: "docs", title: "서류 미비·소득 불일치", desc: "증빙 서류가 부족하거나 신청서 소득과 실제 소득이 20% 이상 다르면 부결돼요.",
    fixes: ["워크넷 구직신청 (일용직·구직자용 소득 증빙)", "최근 3~6개월 급여명세서 전부 준비", "자영업자: 사업자등록증 + 소득금액증명원", "홈택스 소득과 신청서 소득 일치 확인"],
    timeline: "서류 준비 후 즉시", action: "서류 재준비 → 정확성 확인 → 바로 재신청 가능" },
  { id: "guarantee", title: "보증한도 초과", desc: "신용보증기금의 누적 보증 한도를 초과하면 추가 보증이 안 돼요.",
    fixes: ["보증재단 홈페이지에서 누적 보증금 조회", "기존 보증대출 상환으로 한도 확보", "다른 보증기관(기술보증기금) 활용 검토"],
    timeline: "기존 대출 상환 후 1~2주", action: "보증한도 확인 → 기존 대출 상환 → 한도 확보 후 재신청" },
] as const;

const ALTS = [
  { name: "미소금융", badge: "저신용자 전용", rate: "2.0~6.0%", amount: "최대 2,000만원",
    pros: ["신용점수 500점대도 가능", "금리 매우 낮음", "창업·사업자금으로도 활용"],
    cons: ["심사 1~2주 소요", "사업 목적이어야 함"] },
  { name: "새희망홀씨", badge: "신용회복 중도 가능", rate: "4.5~7.5%", amount: "최대 1,000만원",
    pros: ["햇살론보다 기준 관대", "금리 낮은 편", "신용회복 중인 사람 가능"],
    cons: ["담보 필요할 수 있음", "신청 자격 제한"] },
  { name: "사잇돌대출", badge: "빠른 심사", rate: "6.9~8.9%", amount: "최대 500만원",
    pros: ["불법사금융 차용자 가능", "개인회생 준비자 가능", "심사 빠름"],
    cons: ["한도 낮음", "금리 높은 편"] },
  { name: "긴급복지생활비", badge: "이자 무료", rate: "무이자", amount: "최대 500만원 (월 100만원)",
    pros: ["이자 0%", "위기상황 지원", "서민금융통합지원센터 신청"],
    cons: ["위기상황 증빙 필요", "3개월 이내 신청"] },
] as const;

const FAQS = [
  { tag: "긴급", q: "부결 직후 바로 재신청해도 돼요?",
    a: "안 돼요. 바로 신청하면 또 떨어져요. 부결 사유를 파악하고 개선한 후에 신청해야 해요. 서류 미비만 문제였으면 즉시 재신청 가능하지만, DSR이나 신용점수 문제면 최소 1~3개월 후가 좋아요." },
  { tag: "긴급", q: "부결 사유를 직접 물어볼 수 있어요?",
    a: "네. 신청한 은행(KB국민, 우리, 농협 등) 콜센터에 전화하면 부결 사유 1~2개를 알려줘요. 서민금융진흥원 고객센터(1599-8900)에도 물어볼 수 있어요. 세부 사항은 안 알려주는 경우도 있으니, 위 자가진단을 같이 활용하세요." },
  { tag: "긴급", q: "신용점수 450점인데 햇살론 말고 방법이 있나요?",
    a: "있어요. 미소금융이나 긴급복지생활비는 신용점수를 안 봐요. 서민금융통합지원센터(1397)에 전화하면 본인 상황에 맞는 상품을 무료로 추천받을 수 있어요." },
  { tag: null, q: "앱컷이랑 심사 부결이 뭐가 달라요?",
    a: "앱컷은 서류 제출 전에 자동으로 떨어지는 거고, 심사 부결은 서류를 다 낸 후에 떨어지는 거예요. 앱컷은 신용점수·연체 기록 등 기본 조건에서 걸린 거라 개선에 시간이 더 걸려요." },
  { tag: null, q: "신용점수 600점 넘으면 무조건 통과돼요?",
    a: "아니에요. 600점은 필요조건이지 충분조건이 아니에요. 600점 이상이어도 기대출이 많거나 연체 이력이 있으면 떨어져요. 600점 이상이면 심사 단계에 진입할 기회가 생기는 거예요." },
  { tag: null, q: "부결 후 다른 서민금융도 계속 부결되나요?",
    a: "아뇨. 상품마다 심사 기준이 달라요. 햇살론은 신용점수·연체를 중요하게 보지만, 미소금융이나 새희망홀씨는 소득과 서류를 더 봐요. 하나 떨어졌다고 다 떨어지는 건 아니에요." },
  { tag: null, q: "재신청 전에 카드 만들거나 다른 대출 받으면 안 돼요?",
    a: "피하세요. 신용도를 다시 내려요. 재신청 3개월 전부터는 새 금융상품 신청을 멈추고, 기존 대출·카드만 깨끗하게 관리하세요." },
  { tag: null, q: "햇살론 금리는 미리 알 수 있어요?",
    a: "심사 후에 결정돼요. 신용점수·기대출·연체·소득에 따라 4.1~9.9% 범위에서 달라져요. 신용점수를 올리고 기대출을 줄인 후 신청하면 더 낮은 금리를 받을 수 있어요." },
] as const;

const SIDEBAR = [
  { cat: "햇살론", items: ["햇살론유스 자격·한도·신청", "햇살론 보증료 계산·면제", "햇살론 대환대출 갈아타기", "햇살론 금리 비교", "햇살론 심사 기간", "햇살론 한도 늘리기"] },
  { cat: "신용관리", items: ["신용점수 올리는 방법", "신용점수 무료 조회", "연체 기록 삭제 방법", "신용카드 현명하게 쓰기", "신용조회 영향"] },
  { cat: "서민금융", items: ["미소금융 신청 방법", "새희망홀씨 조건", "사잇돌대출 자격", "긴급복지생활비", "서민금융 상품 비교"] },
  { cat: "대출 기초", items: ["DSR이란?", "대출 갈아타기 조건", "개인회생 vs 워크아웃", "대출 이자 계산"] },
] as const;

const REFS = [
  { category: "공식 자료", items: [
    { label: "서민금융진흥원 — 햇살론 안내", url: "https://www.kinfa.or.kr" },
    { label: "금융감독원 — 서민금융 가이드", url: "https://www.fss.or.kr" },
    { label: "한국신용정보원 — 신용점수 조회", url: "https://www.kcredit.or.kr" },
    { label: "서민금융통합지원센터 — 1397", url: "https://www.서민금융콜센터.kr" },
  ]},
] as const;

// ─── 디자인 토큰 ──────────────────────────────────────
const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" } as const;

// ─── 공통 UI ──────────────────────────────────────────
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: { children: React.ReactNode }: any) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }: { children: React.ReactNode }: any) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }: { title: string; children: React.ReactNode }: any) {
  return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>;
}
function BorderBox({ title, children }: { title: string; children: React.ReactNode }: any) {
  return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>;
}

// ─── UrgentBanner ────────────────────────────────────
function UrgentBanner() {
  const [type, setType] = useState<string | null>(null);
  type MsgKey = "panic" | "unknown" | "reapply" | "alt";
  const messages: Record<MsgKey, { title: string; color: string; bg: string; text: string }> = {
    panic: { title: "방금 부결 받으셨다면", color: "#DC2626", bg: "#FEF2F2",
      text: "당황하지 마세요. 부결은 끝이 아니에요. 아래에서 7가지 사유 중 내 상황을 찾고, 사유별 개선법을 따라하면 충분히 재신청할 수 있어요." },
    unknown: { title: "왜 부결인지 모르겠다면", color: "#7C3AED", bg: "#F5F3FF",
      text: "은행 콜센터(신청한 은행)나 서민금융진흥원(1599-8900)에 전화하면 사유 1~2개를 알려줘요. 안 알려주면 아래 진단으로 예상 사유를 찾아보세요." },
    reapply: { title: "재신청 타이밍이 궁금하다면", color: G, bg: GL,
      text: "서류 미비만 문제였으면 바로 재신청 가능해요. DSR·신용점수 문제면 최소 1~3개월 후. 아래 타이밍 가이드에서 내 사유별 최적 시점을 확인하세요." },
    alt: { title: "대안 대출을 찾고 있다면", color: "#2563EB", bg: "#EFF6FF",
      text: "햇살론 말고도 미소금융, 새희망홀씨, 사잇돌대출, 긴급복지생활비가 있어요. 신용점수가 낮아도 받을 수 있는 상품들이에요. 아래에서 비교해보세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>지금 상황이 어떻게 되세요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {([
          { id: "panic" as const, label: "방금 부결 통보 받았어요" },
          { id: "unknown" as const, label: "왜 부결됐는지 모르겠어요" },
          { id: "reapply" as const, label: "재신청 타이밍이 궁금해요" },
          { id: "alt" as const, label: "대안 대출을 찾고 있어요" },
        ]).map((item) => (
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
  const m = messages[type as MsgKey];
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

// ─── 부결 사유 진단 (인터랙티브) ──────────────────────
function RejectionDiagnosis() {
  const [selected, setSelected] = useState<string | null>(null);
  const reason = selected ? REASONS.find((r) => r.id === selected) : null;
  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>의심되는 사유를 눌러보세요. 사유별 개선법과 재신청 타이밍이 바로 나와요.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, marginBottom: selected ? 16 : 0 }}>
        {REASONS.map((r) => (
          <button key={r.id} onClick={() => setSelected(selected === r.id ? null : r.id)} style={{
            padding: "10px 14px", borderRadius: 8, cursor: "pointer", textAlign: "left", fontSize: 13, lineHeight: 1.5,
            border: selected === r.id ? `2px solid ${G}` : "1px solid #e5e7eb",
            background: selected === r.id ? GL : "#f9fafb",
            fontWeight: selected === r.id ? 700 : 500,
            color: selected === r.id ? GD : "#374151",
          }}>
            {r.title}
          </button>
        ))}
      </div>
      {reason && (
        <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "18px 20px" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 8 }}>{reason.title}</p>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, marginBottom: 14 }}>{reason.desc}</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 8 }}>개선 방법</p>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: "#374151", marginBottom: 14 }}>
            {reason.fixes.map((f: string, i: number) => <li key={i} style={{ marginBottom: 4 }}>{f}</li>)}
          </ul>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 6, padding: "10px 14px", border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>예상 대기 기간</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: GD }}>{reason.timeline}</div>
            </div>
            <div style={{ background: "#fff", borderRadius: 6, padding: "10px 14px", border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>액션 플랜</div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{reason.action}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FAQ (아코디언) ──────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "10px 0 1.2rem" }}>
      {FAQS.map((faq, i: number) => (
        <div key={i}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
            width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", borderRadius: open === i ? "8px 8px 0 0" : 8,
            border: faq.tag ? `1px solid #F97316` : `1px solid #e5e7eb`,
            background: open === i ? GL : (faq.tag ? "#FFF7ED" : "#f9fafb"),
            fontSize: 13, fontWeight: 600, color: "#111", cursor: "pointer", textAlign: "left", gap: 8,
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {faq.tag && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: "#F97316", color: "#fff" }}>{faq.tag}</span>}
              {faq.q}
            </span>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{open === i ? "▼" : "▶"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "12px 16px", background: GL, border: `1px solid ${G}`, borderTop: "none", borderRadius: "0 0 8px 8px", fontSize: 13, lineHeight: 1.85, color: "#374151" }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── 메인 컴포넌트 ──────────────────────────────────────
export default function Page() {
  return (
    <article style={{ maxWidth: 640, margin: "0 auto", padding: "24px 20px" }}>
      {/* ─── H1 + 도입부 (감정→행동 전환) ─── */}
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", marginBottom: 8, lineHeight: 1.4 }}>
        햇살론 부결됐다고요? 사유별 해결법과 재신청 타이밍까지
      </h1>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 6, lineHeight: 1.7 }}>
        떨어졌다고 끝이 아니에요.
      </p>
      <p style={body}>
        햇살론 부결 사유는 대부분 7가지 중 하나예요.
        사유를 정확히 알면 고칠 수 있고, 고치면 재신청에서 통과돼요.
        지금 내 상황부터 확인해보세요.
      </p>

      <UrgentBanner />

      <Divider />

      {/* ─── H2-1: 부결 사유 진단 ─── */}
      <H2>왜 부결됐을까? 7가지 사유 한눈에</H2>
      <p style={body}>
        햇살론 부결 사유는 크게 7가지예요. DSR 초과가 가장 많고, 연체 기록이 그 다음이에요.
        아래에서 의심되는 사유를 눌러보면 개선법과 재신청 타이밍이 바로 나와요.
      </p>
      <RejectionDiagnosis />

      <Divider />

      {/* ─── H2-2: 재신청 타이밍 ─── */}
      <H2>재신청, 언제 하는 게 좋을까?</H2>
      <p style={body}>
        무작정 다시 넣으면 또 떨어져요. 사유별로 최적 타이밍이 달라요.
      </p>
      <GreenBox title="사유별 재신청 타이밍">
        <div style={{ fontSize: 13, lineHeight: 2 }}>
          <strong>서류 미비:</strong> 해결 후 즉시 재신청 가능<br />
          <strong>DSR 과다:</strong> 부채 감소 후 1~2개월<br />
          <strong>신용점수 부족:</strong> 신용 관리 후 3~6개월<br />
          <strong>연체 기록:</strong> 상환 후 3~6개월<br />
          <strong>최근 카드/대출:</strong> 2~3개월 대기
        </div>
      </GreenBox>
      <BorderBox title="재신청 전 반드시 확인">
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 2, color: "#374151" }}>
          <li>부결 사유를 은행에 직접 확인했는가?</li>
          <li>해당 사유를 실제로 개선했는가?</li>
          <li>최근 3개월간 새 금융상품 신청을 안 했는가?</li>
          <li>소득 증빙 서류가 최신인가?</li>
          <li>신용점수를 조회해서 600점 이상인가?</li>
        </ul>
      </BorderBox>

      <Divider />

      {/* ─── H2-3: 대안 상품 ─── */}
      <H2>햇살론 말고 다른 길은 없을까?</H2>
      <p style={body}>
        신용점수가 낮거나 연체가 있어도 받을 수 있는 서민금융 상품이 있어요. 상품마다 기준이 다르니까 하나 떨어졌다고 포기하지 마세요.
      </p>
      {ALTS.map((alt, idx: number) => (
        <div key={idx} style={{ border: "1px solid #9FE1CB", borderRadius: 10, padding: "18px 20px", marginBottom: 16, background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{alt.name}</h3>
              <Bdg>{alt.badge}</Bdg>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>금리</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: G }}>{alt.rate}</div>
            </div>
          </div>
          <div style={{ background: "#f9fafb", borderRadius: 6, padding: "10px 12px", marginBottom: 12, fontSize: 13, color: "#374151" }}>한도: {alt.amount}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 6 }}>장점</div>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13 }}>
                {alt.pros.map((p: string, i: number) => <li key={i} style={{ color: "#374151", marginBottom: 4, lineHeight: 1.5 }}>{p}</li>)}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 6 }}>단점</div>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13 }}>
                {alt.cons.map((c: string, i: number) => <li key={i} style={{ color: "#d97706", marginBottom: 4, lineHeight: 1.5 }}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <Divider />

      {/* ─── FAQ ─── */}
      <H2>자주 묻는 질문</H2>
      <FAQSection />

      <Divider />

      {/* ─── HubLinks ─── */}
      <H2>관련 글 더 보기</H2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.5rem" }}>
        {[
          { title: "햇살론유스 자격·한도·신청 완벽 가이드", slug: "/w/햇살론유스-자격-한도-신청" },
          { title: "햇살론 보증료 계산·면제 조건", slug: "/w/햇살론-보증료-계산-면제" },
          { title: "햇살론 대환대출 갈아타기", slug: "/w/햇살론-대환대출-갈아타기" },
          { title: "신용점수 올리는 방법", slug: "/w/신용점수-올리는-방법" },
          { title: "서민금융 대출 종류 비교", slug: "/w/서민금융-대출-종류-비교" },
        ].map((link, i: number) => (
          <a key={i} href={link.slug} style={{
            display: "block", padding: "12px 14px", background: "#f9fafb", border: "1px solid #e5e7eb",
            borderRadius: 8, fontSize: 13, color: "#374151", textDecoration: "none", lineHeight: 1.5,
          }}>{link.title}</a>
        ))}
      </div>

      {/* ─── CTA ─── */}
      <div style={{ background: GL, borderRadius: 10, padding: "20px 22px", textAlign: "center", marginBottom: "2rem" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 8 }}>전문가 무료 상담 받고 싶으세요?</p>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.6 }}>
          서민금융통합지원센터는 부결 원인 분석·맞춤 상품 추천을 무료로 해줘요.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:1397" style={{ display: "inline-block", padding: "10px 20px", background: G, color: "#fff", borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            1397 전화 상담
          </a>
          <a href="https://www.kinfa.or.kr" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "10px 20px", background: "#fff", color: GD, borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none", border: `1px solid ${G}` }}>
            서민금융진흥원 방문
          </a>
        </div>
      </div>

      <Divider />

      {/* ─── Sidebar ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: "2rem" }}>
        {SIDEBAR.map((sec, idx: number) => (
          <div key={idx}>
            <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 8 }}>{sec.cat}</p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, lineHeight: 2, listStyle: "none" }}>
              {sec.items.map((item: string, i: number) => (
                <li key={i}><a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>{item}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Divider />

      {/* ─── 출처 ─── */}
      <H2>출처</H2>
      {REFS.map((ref, idx: number) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 8 }}>{ref.category}</p>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.8 }}>
            {ref.items.map((item: { label: string; url: string }, i: number) => (
              <li key={i}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: G, textDecoration: "none" }}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
}
