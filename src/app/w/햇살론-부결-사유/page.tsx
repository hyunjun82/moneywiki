"use client";
import { useState } from "react";

// ─── 2026년 기준 (서민금융진흥원, 2026.1.1. 개편)
// 햇살론 2026년 개편: 기존 근로자햇살론·햇살론뱅크 폐지, 일반보증·특례보증으로 재편
// 일반보증: 연소득 3,500만원 이하(신용무관) 또는 4,500만원 이하+하위 20%, 한도 최대 2,000만원, 금리 10% 이내
// 특례보증: 연소득 3,500만원 이하+하위 20%, 한도 최대 1,000만원, 금리 12.5%(사회배려 9.9%)
// 햇살론유스: 만 19~34세, 연소득 3,500만원 이하, 한도 1,200만원(평생 1회), 금리 5% 내외
// 부결 주요 사유: 1)연체이력 2)기대출과다(DSR) 3)서류불일치 4)신용점수 450점 미만 5)소득초과
// 재신청: 부결 후 1~3개월, 연체 정리·신용관리 후
// 심사기간: 영업일 기준 1~3일 (서류미비 시 최대 7일)
// 신청: 서민금융진흥원 앱, 1397

const SIDEBAR_LINKS = [
  "햇살론 부결 사유",
  "햇살론 재신청 방법",
  "햇살론 부결 후 대처",
  "햇살론 연체 이력 해결",
  "햇살론 신용점수 조건",
  "햇살론 서류 준비",
  "햇살론 일반보증 조건",
  "햇살론 특례보증 조건",
  "햇살론유스 부결",
  "햇살론 DSR 계산",
  "햇살론 대환대출 조건",
  "서민금융진흥원 상담",
  "햇살론 심사 기간",
  "햇살론유스 자격 조건",
  "햇살론 보증료 계산",
  "신용점수 올리는 법",
  "소액생계비 대출",
  "서민금융콜센터 1397",
  "신용회복위원회",
  "최저신용자 대출",
];

const HUB_LINKS = [
  { title: "햇살론 대환대출 조건 | 고금리 대출 갈아타기 신청 방법", desc: "연 20% 이상 고금리를 10% 이내로 전환", href: "#" },
  { title: "햇살론유스 자격 조건 | 한도와 신청 방법 대학생·취준생 기준", desc: "만 19~34세, 최대 1,200만원, 평생 1회", href: "#" },
  { title: "햇살론 보증료 계산 방법 | 면제 조건과 감면 받는 방법", desc: "사회적 배려 대상자 보증료 인하 혜택", href: "#" },
];

const FAQS = [
  { urgent: true, q: "부결됐는데 바로 재신청할 수 있나요?", a: "바로 재신청하면 거의 다시 부결돼요. 부결 사유를 먼저 파악하는 게 중요해요. 연체 때문이라면 연체를 정리하고 1~3개월 후, 서류 문제라면 서류를 보완해서 재신청하면 돼요. 부결 통보 문자나 서민금융진흥원 앱에서 부결 사유를 확인할 수 있어요. 모르면 1397에 전화해서 물어보세요." },
  { urgent: true, q: "연체 기록이 있는데 햇살론이 가능한가요?", a: "현재 연체 중이라면 사실상 불가능해요. 연체가 완전히 해소된 이후, 1~3개월 신용 회복 기간을 두고 재신청하는 게 현실적이에요. 통신비, 카드 대금 같은 소액 연체도 똑같이 적용돼요. 연체 정리 후 신용점수가 오르면 승인 가능성이 높아져요." },
  { urgent: false, q: "앱컷이 뭔가요?", a: "앱컷(APP CUT)은 서민금융진흥원 앱에서 신청했을 때 심사도 없이 자동 거절되는 상태예요. 신용점수가 최소 기준(450점 내외) 미달이거나 기본 자격 조건을 충족 못 할 때 나와요. 앱컷이 나오면 앱 신청은 포기하고 서민금융통합지원센터를 방문해 상담 후 진행하는 게 좋아요." },
  { urgent: false, q: "부결 사유를 정확히 알 수 없어요. 어디서 확인하나요?", a: "서민금융진흥원 앱 > 신청내역에서 확인 가능해요. 확인이 안 되면 서민금융콜센터 1397로 전화해서 부결 사유를 물어볼 수 있어요. 상담원이 내 상황에 맞는 보완 방법도 안내해줘요." },
  { urgent: false, q: "DSR이 높아서 부결됐어요. 어떻게 해야 하나요?", a: "DSR(총부채원리금상환비율)이 너무 높으면 상환 능력이 부족하다고 판단해요. 기존 대출 일부를 먼저 상환해서 DSR을 낮추거나, 신청 금액을 줄여서 재신청하는 방법이 있어요. 한도 전액보다 적은 금액으로 신청하면 심사 통과율이 높아지는 경우가 많아요." },
  { urgent: false, q: "소득 증빙이 안 되는 아르바이트 소득인데 신청 가능한가요?", a: "가능하지만 소득 증빙 서류가 중요해요. 근로계약서, 급여통장 3~6개월 내역, 원천징수영수증(있는 경우) 등을 준비하세요. 서류상 소득과 신청서 기재 소득이 다르면 바로 부결돼요. 소득 증빙이 어렵다면 서민금융통합지원센터에서 상담 후 서류 보완 방법을 안내받으세요." },
  { urgent: false, q: "재신청은 몇 번까지 할 수 있나요?", a: "횟수 제한은 없지만 단기간에 여러 번 신청하면 오히려 심사에 불리해요. 신청할 때마다 신용조회가 생기기 때문이에요. 부결 사유를 제대로 해결한 뒤 한 번에 신청하는 게 가장 유리해요. 통상 1~3개월 간격을 두세요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "서민금융진흥원 — 햇살론 제도 안내 (2026년 개편)", url: "https://www.kinfa.or.kr" },
    { label: "뱅크샐러드 — 2026년 개편 햇살론 일반보증·특례보증 정리", url: "https://www.banksalad.com/articles/%EC%A0%80%EC%8B%A0%EC%9A%A9%EC%9E%90-%EB%8C%80%EC%B6%9C-%EC%B0%BE%EA%B3%A0-%EC%9E%88%EB%8A%94-%EB%8B%B9%EC%8B%A0%EC%9D%B4-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-%ED%96%87%EC%82%B4%EB%A1%A0-%EC%B4%9D%EC%A0%95%EB%A6%AC" },
    { label: "토스뱅크 — 2026 햇살론일반·햇살론특례 안내", url: "https://www.tossbank.com/articles/sunloan2026" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: { children: React.ReactNode }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: { children: React.ReactNode }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function InstantAnswer() {
  return (
    <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 10 }}>🚨 부결 직후 할 일</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { q: "부결 사유 확인이 먼저예요", a: "서민금융진흥원 앱 > 신청내역 또는 1397 전화로 부결 사유를 확인하세요. 사유를 모르면 해결할 수 없어요." },
          { q: "바로 재신청하면 안 되는 이유", a: "신청할 때마다 신용조회 이력이 생겨요. 사유 해결 없이 반복 신청하면 오히려 승인율이 낮아져요. 1~3개월 후 재신청하세요." },
          { q: "부결돼도 다른 선택지가 있어요", a: "서민금융통합지원센터(1397) 방문 상담을 받으면 내 상황에 맞는 다른 상품(소액생계비 대출, 미소금융 등)을 연결해줘요." },
        ].map((item: any, i: any) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #FECACA" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{item.q}</p>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RejectReasonTable() {
  const reasons = [
    { rank: "1위", reason: "연체 이력", detail: "통신비·카드·대출 연체 1건이라도 있으면 사실상 불가. 현재 연체 중이면 즉시 해소 필요.", fix: "연체 전액 상환 후 1~3개월 경과", hard: true },
    { rank: "2위", reason: "DSR 과다 (기대출 너무 많음)", detail: "소득 대비 기존 대출 원리금 상환액이 너무 높으면 상환 능력 부족으로 거절.", fix: "기존 대출 일부 상환하거나 신청 금액 줄이기", hard: true },
    { rank: "3위", reason: "서류 불일치·미비", detail: "신청서 소득과 서류상 소득이 다르거나 필수 서류 누락.", fix: "서류 보완 후 즉시 재신청 가능 (가장 빠른 해결)", hard: false },
    { rank: "4위", reason: "신용점수 기준 미달", detail: "NICE 기준 450점 미만이면 앱컷(자동거절). 600점 이상이면 승인율 높아짐.", fix: "신용카드 소액 사용·성실상환으로 점수 회복", hard: true },
    { rank: "5위", reason: "소득 기준 초과", detail: "연소득 3,500만원 초과 (일반보증은 4,500만원+하위 20% 조건으로 신청 가능).", fix: "일반보증으로 전환 신청 검토", hard: false },
  ];
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {reasons.map((r: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f3f4f6", alignItems: "flex-start" }}>
          <div style={{ width: 52, flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: r.hard ? "#FEE2E2" : GL, color: r.hard ? "#DC2626" : GD }}>{r.rank}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{r.reason}</p>
            <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, margin: "0 0 6px" }}>{r.detail}</p>
            <p style={{ fontSize: 12, color: G, fontWeight: 600, margin: 0 }}>→ 해결: {r.fix}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function RetryTimeline() {
  const steps = [
    { day: "부결 당일", action: "부결 사유 확인 (앱 또는 1397)", note: "이 단계를 건너뛰면 재신청해도 같은 결과예요" },
    { day: "즉시", action: "서류 문제라면 바로 보완해서 재신청", note: "서류 문제는 빠르면 당일 재신청도 가능" },
    { day: "1~2주 내", action: "연체 전액 정리", note: "통신비·카드 연체 포함, 1원도 남기지 않고 해소" },
    { day: "1~3개월 후", action: "신용 회복 후 재신청", note: "이 기간 새 대출 신청 금지, 기존 대출 성실 상환만" },
    { day: "재신청 전", action: "서민금융통합지원센터 상담 (선택)", note: "1397 또는 방문, 내 상황에 맞는 전략 확인" },
  ];
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {steps.map((step: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: GL, color: GD }}>{step.day}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{step.action}</span>
            </div>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, lineHeight: 1.6 }}>{step.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function OtherOptions() {
  const opts = [
    { name: "소액생계비 대출", desc: "최저신용자 대상. 100만원 한도. 연 15.9%. 상환 후 재이용 가능.", tel: "1397" },
    { name: "미소금융", desc: "무담보·무보증 소액대출. 창업·운영·긴급생계 자금. 서민금융진흥원 심사.", tel: "1397" },
    { name: "신용회복위원회 채무조정", desc: "여러 빚이 있고 상환이 어려울 때. 이자 감면·원금 분할 상환 조정.", tel: "1600-5500" },
    { name: "복지멤버십", desc: "서민금융진흥원 복지멤버십 가입 시 보증료 0.1%p 인하 혜택.", tel: "1397" },
  ];
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "12px 0 1.2rem" }}>
      {opts.map((o: any, i: any) => (
        <div key={i} style={{ flex: 1, minWidth: 160, border: "1px solid #e5e7eb", borderRadius: 8, padding: "12px 14px", background: "#fafafa" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{o.name}</p>
          <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, margin: "0 0 6px" }}>{o.desc}</p>
          <a href={`tel:${o.tel}`} style={{ fontSize: 12, color: G, fontWeight: 700, textDecoration: "none" }}>📞 {o.tel}</a>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = i => setOpen(p => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {FAQS.map((faq: any, i: any) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button onClick={(: any) => toggle(i)} style={{ width: "100%", textAlign: "left", padding: "13px 4px", display: "flex", alignItems: "flex-start", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
            {faq.urgent && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: "#FEE2E2", color: "#DC2626", flexShrink: 0, marginTop: 2 }}>급한 상황</span>}
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", flex: 1, lineHeight: 1.6 }}>{faq.q}</span>
            <span style={{ color: "#9ca3af", fontSize: 16, flexShrink: 0 }}>{open[i] ? "▲" : "▼"}</span>
          </button>
          {open[i] && <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, padding: "0 4px 14px", margin: 0 }}>{faq.a}</p>}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 햇살론 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
          </a>
        ))}
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
      {REFERENCES.map(group => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map(item => (
              <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요.</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>햇살론 관련 글</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function HaetsalRejectionPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>햇살론 · 부결 · 재신청</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          햇살론 부결 사유 |<br />
          재신청 가능한 타이밍과 해결 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          조건이 되는 것 같은데 부결됐을 때 당황스럽죠.<br />
          <strong>대부분의 부결은 연체이력·DSR·서류불일치 이 3가지 중 하나예요.</strong><br />
          사유를 알면 해결할 수 있어요. 바로 재신청하는 것만 피하면 돼요.
        </p>

        <InstantAnswer />

        <H2>햇살론 부결 사유 5가지</H2>
        <p style={body}>
          서민금융진흥원이 공식으로 밝힌 부결 사유와 실제 후기를 종합하면 아래 5가지가 전부예요.<br />
          내 사유가 뭔지 먼저 파악하세요. 빨간색은 해결에 시간이 필요한 사유예요.
        </p>
        <Bdg>부결 사유 빈도 순위</Bdg>
        <RejectReasonTable />
        <GreenBox title="이것만 기억해요">
          통신비 며칠 연체도 부결 사유가 돼요. 신청 전 3개월 이내 모든 연체를 정리하세요.<br />
          서류 불일치는 가장 쉽게 해결돼요. 보완 후 바로 재신청 가능해요.
        </GreenBox>

        <Divider />

        <H2>햇살론 재신청 타이밍과 방법</H2>
        <p style={body}>
          부결 사유에 따라 재신청 타이밍이 달라요.<br />
          사유를 해결하지 않고 반복 신청하면 신용조회 이력만 늘어나요.
        </p>
        <Bdg>재신청 단계별 로드맵</Bdg>
        <RetryTimeline />
        <BorderBox title="재신청 전 체크리스트">
          ✓ 현재 연체 중인 항목 없음 (통신비·카드·대출 포함)<br />
          ✓ 서류 내용이 신청서 기재 내용과 일치<br />
          ✓ 신청 금액이 내 소득 수준에 맞는 범위<br />
          ✓ 최근 3개월 이내 신규 대출 신청 없음<br />
          ✓ 신용점수 450점 이상 (NICE 기준)
        </BorderBox>

        <HubLinks />

        <H2>햇살론 부결 후 다른 대안</H2>
        <p style={body}>
          햇살론이 안 됐다고 선택지가 없는 건 아니에요.<br />
          신용점수가 낮거나 연체 이력이 있어도 이용 가능한 서민금융 상품이 있어요.<br />
          서민금융통합지원센터(1397)에 전화하면 내 상황에 맞는 상품을 바로 안내해줘요.
        </p>
        <Bdg>부결 후 대안 상품</Bdg>
        <OtherOptions />

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          부결 후 바로 재신청해도 되는지, 연체 있어도 되는지, 막혀 있는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>부결 사유 확인 먼저 하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            서민금융콜센터 1397에 전화하면 부결 사유 확인 + 재신청 전략 상담을 무료로 받을 수 있어요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.kinfa.or.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 서민금융진흥원 앱</a>
            <a href="tel:1397" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 서민금융콜센터 1397</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요. 심사 기준은 금융기관별·시기별로 달라질 수 있어요. 구체적인 상황은 서민금융콜센터(1397)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
