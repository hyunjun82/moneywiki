"use client";
import { useState } from "react";

// ─── 2025.9.7 발표 국토교통부 주택공급 확대방안 (공식 발표 수치)
// 총 공급 목표: 2026~2030년 수도권 135만호, 연간 27만호 착공
// 최근 3년 대비 1.7배, 연 11만호 증가. 착공 기준 관리 (인허가 아님)
// 물량별 배분 (5년간):
//   공공택지 37.2만호 (LH 직접시행 포함)
//   재개발·재건축 36.5만호 (공공참여 시 용적률 최대 390%)
//   비아파트 35.5만호
//   신축매입임대 등 21.9만호 (2026~2027년 50% 집중)
//   노후시설·유휴부지 3.8만호
// LH 직접시행: 수도권 6만호 추가 (직접시행 5.3만 + 용적률 상향 0.7만)
// LH 부채: 2025년 말 170조원 → 2029년 261조원 (기재부 전망)
// 규제지역 LTV: 50% → 40% (강남3구+용산, 9.7 대책)
// 착공 후 분양: 3~6개월 / 분양 후 입주: 2~3년

const SIDEBAR_LINKS = [
  "2030년 135만호 공급계획",
  "수도권 27만호 착공 일정",
  "LH 직접시행 2026",
  "9.7 부동산 대책",
  "수도권 공공택지 공급",
  "신축매입임대 공급",
  "재건축 용적률 390%",
  "강남 LTV 40%",
  "규제지역 LTV 변경",
  "3기 신도시 분양",
  "LH 부채 문제",
  "착공 기준 인허가 차이",
  "수도권 공급 부족",
  "2026 수도권 입주물량",
  "분양가 상한제",
  "재개발 규제 완화",
  "서리풀 과천 신규 택지",
  "주택 공급 전망 2026",
  "수도권 집값 전망",
  "부동산 대책 2025",
];

const HUB_LINKS = [
  { title: "보금자리론 2026 금리 | 원리금균등 월 납입액 계산기", desc: "현재 4.05%~4.35%, 월 납입액 바로 확인", href: "#" },
  { title: "일시적 2주택 양도세 비과세 | 3년 처분 기한", desc: "갈아타면서 2주택 됐을 때 비과세 조건", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "135만호는 이미 다 지어지는 건가요?",
    a: "아니에요. 2026~2030년 5년간 착공 목표예요. 착공이 시작되면 분양주택은 3~6개월 후 청약이 나오고, 실제 입주까지는 2~3년이 더 걸려요. 지금 당장 공급이 늘어나는 게 아니라 앞으로 공급을 쌓아가는 계획이에요.",
  },
  {
    urgent: true,
    q: "착공 기준이란 게 뭔가요? 인허가랑 다른가요?",
    a: "다르고, 이 차이가 중요해요. 인허가는 허가만 받은 것으로 실제 공사 시작과 다를 수 있어요. 착공은 실제로 공사를 시작한 거예요. 이전 정부 공급 계획이 인허가 숫자를 썼다가 '허가만 받고 짓지 않았다'는 비판을 받았어요. 이번 계획은 착공 기준으로 관리해요.",
  },
  {
    urgent: true,
    q: "지금 수도권에서 청약을 기다리는 중인데, 이 계획이 도움이 되나요?",
    a: "단기(2026~2028년)에는 큰 도움이 안 돼요. 착공은 해도 입주까지 2~3년이 걸리고, 2022~2023년 착공 절벽의 영향으로 지금 당장 입주물량이 부족해요. 2029~2030년 이후 물량이 본격적으로 늘어날 전망이에요.",
  },
  {
    urgent: false,
    q: "LH가 직접 시행하면 뭐가 달라지나요?",
    a: "기존엔 LH가 택지를 조성해서 민간에 팔고 민간이 집을 지었어요. 이제 LH가 직접 짓는 방식이에요. 공급 지연을 줄이고 속도를 높이려는 목적이에요. 다만 LH 부채가 2025년 말 170조원에서 2029년 261조원대로 급증할 전망이어서 재정 부담이 우려돼요.",
  },
  {
    urgent: false,
    q: "재건축 용적률 390%가 내 아파트 단지에도 적용되나요?",
    a: "공공이 참여하는 정비사업에만 법적 상한을 초과하는 용적률(최대 390%)이 허용돼요. 순수 민간 재건축은 300%가 상한이에요. 공공참여 대가로 임대주택 등을 기여해야 해요.",
  },
  {
    urgent: false,
    q: "강남구 집을 살 때 대출이 줄었다는 게 사실인가요?",
    a: "맞아요. 9·7 대책으로 강남3구(강남·서초·송파)와 용산구의 LTV가 50%에서 40%로 낮아졌어요. 12억원 아파트라면 최대 대출이 6억원에서 4억8,000만원으로 줄었어요.",
  },
  {
    urgent: false,
    q: "이 계획이 현실적으로 실현될 수 있나요?",
    a: "전문가 평가는 엇갈려요. 착공 기준 관리는 체감도를 높이는 장점이 있지만 LH 부채 급증, 재건축 조합과의 협의 지연, 단기 입주물량 부족 문제는 해결하기 어렵다는 지적이 있어요. 공급 계획이 목표치를 달성한 선례가 드물다는 것도 감안해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국토교통부: 주택공급 확대방안 (2025.9.7 발표)", url: "https://www.molit.go.kr/USR/NEWS/m_71/dtl.jsp?lcmspage=1&id=95091185" },
      { label: "국토교통부 보도자료: 135만호 공급계획 세부 내용", url: "https://www.molit.go.kr" },
    ],
  },
];

const G  = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}

function H2({ children }: any) {
  return (
    <h2 style={{
      fontSize: 18,
      fontWeight: 700,
      color: "#111",
      borderLeft: `3px solid ${G}`,
      paddingLeft: 12,
      margin: "0 0 14px",
      lineHeight: 1.5,
    }}>
      {children}
    </h2>
  );
}

function Bdg({ children }: any) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      background: GL,
      color: "#0F6E56",
      marginBottom: 10,
    }}>
      {children}
    </span>
  );
}

function GreenBox({ title, children }: any) {
  return (
    <div style={{
      background: GL,
      borderRadius: 8,
      padding: "14px 18px",
      margin: "12px 0 1.2rem",
      fontSize: 14,
      lineHeight: 1.95,
      color: GD,
    }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function WarnBox({ title, children }: any) {
  return (
    <div style={{
      background: "#FFF7ED",
      border: "1px solid #FED7AA",
      borderRadius: 8,
      padding: "14px 18px",
      margin: "12px 0 1.2rem",
      fontSize: 14,
      lineHeight: 1.95,
    }}>
      <strong style={{ display: "block", color: "#C2410C", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);

  const messages = {
    wait: {
      title: "수도권 청약을 기다리는 중이라면",
      color: G,
      bg: GL,
      text: "단기(2026~2028년) 입주물량 부족은 이 계획으로 해결하기 어려워요. 착공은 해도 입주까지 2~3년이 걸리기 때문이에요. 2029~2030년 이후 물량 확대가 본격화될 전망이에요. 지금 당장 청약 경쟁은 여전히 치열할 수 있어요.",
    },
    price: {
      title: "수도권 집값이 앞으로 어떻게 될지 걱정된다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "공급 확대 신호로 중장기 안정을 기대하는 시각과, 단기 입주물량 부족으로 2026~2028년 가격 상승 압력이 이어질 수 있다는 시각이 공존해요. 1~2년 내 매수 결정은 신중하게 하세요.",
    },
    lh: {
      title: "LH 직접시행이 내 집 마련에 어떤 영향인지 궁금하다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "LH가 직접 공급하는 공공주택은 분양가가 낮고 청약 기회가 늘어날 수 있어요. 다만 LH 부채 급증 우려가 있고, 민간 공급이 줄어 원하는 입지의 민간 아파트 청약 기회는 상대적으로 줄 수 있어요.",
    },
  };

  if (!type) {
    return (
      <div style={{
        background: "#FFF7ED",
        border: "1px solid #FED7AA",
        borderRadius: 10,
        padding: "16px 18px",
        marginBottom: "1.5rem",
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>
          📌 지금 어떤 상황이에요?
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "wait",  label: "수도권에서 분양을 기다리는 중인데, 이 계획이 나한테 도움이 되나요?" },
            { id: "price", label: "수도권 집값이 앞으로 어떻게 될지 걱정돼요." },
            { id: "lh",    label: "LH 직접시행이 내 집 마련에 어떤 영향을 주는지 궁금해요." },
          ].map((item: any) => (
            <button
              key={item.id}
              onClick={(: any) => setType(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #FED7AA",
                background: "#fff",
                fontSize: 13,
                color: "#374151",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const m = messages[type];
  return (
    <div style={{
      background: m.bg,
      border: `1px solid ${m.color}40`,
      borderRadius: 10,
      padding: "16px 18px",
      marginBottom: "1.5rem",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button
          onClick={(: any) => setType(null)}
          style={{
            background: "none",
            border: "none",
            fontSize: 12,
            color: "#9ca3af",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          다시 선택
        </button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function SupplyChart() {
  const items = [
    { label: "공공택지 (LH 직접시행 포함)", val: 37.2, color: G },
    { label: "재개발·재건축",               val: 36.5, color: "#059669" },
    { label: "비아파트 공급",               val: 35.5, color: "#10b981" },
    { label: "신축매입임대 등",             val: 21.9, color: "#34d399" },
    { label: "노후시설·유휴부지",           val: 3.8,  color: "#6ee7b7" },
  ];
  const total = items.reduce((s: any, i: any) => s + i.val, 0);

  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {items.map((item: any, i: any) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: "#374151" }}>{item.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: GD }}>{item.val}만호</span>
          </div>
          <div style={{ background: "#f0fdf4", borderRadius: 6, height: 14, overflow: "hidden" }}>
            <div style={{
              width: `${(item.val / total) * 100}%`,
              background: item.color,
              borderRadius: 6,
              height: "100%",
            }} />
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>
        ※ 총 {total}만호. 2026~2030년 착공 기준. 출처: 국토교통부 (2025.9.7)
      </p>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = (i) => setOpen((p) => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      {FAQS.map((faq: any, i: any) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button
            onClick={(: any) => toggle(i)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "13px 4px",
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {faq.urgent && (
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 20,
                background: "#FEE2E2",
                color: "#DC2626",
                flexShrink: 0,
                marginTop: 2,
                whiteSpace: "nowrap",
              }}>
                자주 막히는 곳
              </span>
            )}
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", flex: 1, lineHeight: 1.6 }}>
              {faq.q}
            </span>
            <span style={{ color: "#9ca3af", fontSize: 16, flexShrink: 0 }}>
              {open[i] ? "▲" : "▼"}
            </span>
          </button>
          {open[i] && (
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, padding: "0 4px 14px", margin: 0 }}>
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 같이 보면 도움 되는 글</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a
            key={i}
            href={link.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 4px",
              textDecoration: "none",
              borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none",
            }}
          >
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>
                {link.title}
              </span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
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
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {REFERENCES.map((group: any) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>
            {group.category.toUpperCase()}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item: any) => (
              <a
                key={item.label}
                href={item.url}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 12px",
                  borderRadius: 6,
                  border: "1px solid #f3f4f6",
                  background: "#fafafa",
                  fontSize: 13,
                  color: "#374151",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2025년 9월 7일 국토교통부 발표를 바탕으로 2026년 3월 기준으로 작성됐어요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          주택 공급 관련 글
        </p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a
            key={i}
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 0",
              fontSize: 12,
              color: "#374151",
              textDecoration: "none",
              borderBottom: "1px solid #f0f0f0",
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Supply135Page() {
  return (
    <div style={{
      maxWidth: 1060,
      margin: "0 auto",
      padding: "2rem 1.5rem",
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
      color: "#111",
      display: "flex",
      gap: 28,
      alignItems: "flex-start",
    }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>
          부동산 정책 · 주택 공급 · 9.7 대책
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          2030년 135만호 공급계획이 뭔가요 |<br />
          수도권 27만호 연간 일정과 물량별 배분
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          집을 사려는데 공급이 부족하다는 말이 계속 들려서 불안하셨죠.<br />
          <strong>정부가 2026~2030년 수도권에 매년 27만호를 짓겠다고 발표했어요. 하지만 착공과 입주는 다르고, 단기 효과는 제한적이에요.</strong><br /><br />
          내 집 마련 계획에 어떤 영향인지 먼저 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>수도권 27만호 물량은 어디서 나오나요?</H2>
        <p style={body}>
          135만호가 하나의 방식으로 짓는 게 아니에요.<br />
          5가지 경로로 나뉘는데, 어디서 나오느냐에 따라 내가 청약할 수 있는 물량이 달라져요.
        </p>
        <Bdg>물량별 배분 (2026~2030년 5년간)</Bdg>
        <SupplyChart />
        <GreenBox title="신축매입임대 21.9만호가 뭔가요?">
          정부나 LH가 신축 주택을 직접 매입해 임대로 공급하는 방식이에요. 공공택지 개발보다 빠르게 공급할 수 있어서 2026~2027년에 전체 14만호 중 50%를 집중 공급할 예정이에요. 분양이 아니라 임대라는 점을 참고하세요.
        </GreenBox>

        <Divider />

        <H2>27만호 착공, 내가 사려는 집에는 언제 영향을 미치나요?</H2>
        <p style={body}>
          착공 소식이 나와도 실제 입주까지는 시간이 걸려요.<br />
          집 마련 타임라인을 이해하면 언제 어떤 준비를 해야 할지 보여요.
        </p>
        <div style={{ margin: "12px 0 1.2rem" }}>
          {[
            { step: "착공", time: "2026~2030년", desc: "공사 시작. 분양주택은 착공 3~6개월 후 청약 접수 시작.", color: G },
            { step: "분양·청약", time: "착공 3~6개월 후", desc: "계약금·중도금·잔금 납부 일정 시작. 이때 내 자금 계획 필요.", color: "#059669" },
            { step: "입주", time: "분양 후 2~3년", desc: "실제 이사 가능. 2026년 착공 → 2028~2029년 입주 가능.", color: "#10b981" },
          ].map((item: any, i: any) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: i % 2 === 0 ? "#fafafa" : "#fff",
                marginBottom: 8,
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: item.color,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>
                  {item.step}
                  <span style={{ fontSize: 11, color: item.color, fontWeight: 600, marginLeft: 8 }}>
                    ({item.time})
                  </span>
                </p>
                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <WarnBox title="2026~2028년 단기 입주물량 부족은 해결 안 돼요">
          2022~2023년 착공 절벽의 영향으로 이미 입주물량이 줄어든 상태예요. 이 계획은 2029~2030년 이후 공급 정상화를 목표로 해요. 지금 당장 2~3년 내 입주를 원한다면 기존 매매나 전세를 함께 검토해야 해요.
        </WarnBox>

        <HubLinks />

        <Divider />

        <H2>정부 계획을 그대로 믿어도 될까요?</H2>
        <p style={body}>
          숫자만 보면 충분해 보이는데, 실제로 이뤄질지는 따져봐야 해요.<br />
          기대와 우려를 균형 있게 알고 내 판단을 세워야 해요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0 1.2rem" }}>
          {[
            {
              title: "기대 요인",
              color: G,
              items: [
                "착공 기준 관리 → 인허가보다 실현 가능성 높음",
                "LH 직접시행 → 공급 지연 감소 기대",
                "신축매입임대 → 2026~2027년 단기 공급 효과",
                "재건축 용적률 완화 → 도심 공급 확대",
              ],
            },
            {
              title: "우려 요인",
              color: "#DC2626",
              items: [
                "LH 부채 2029년 261조원 급증 전망",
                "2026~2028년 입주물량 부족 지속",
                "조합 반발·사업 지연 가능성",
                "과거 공급 목표 미달 선례 반복 우려",
              ],
            },
          ].map((col: any, i: any) => (
            <div
              key={i}
              style={{
                border: `1px solid ${col.color}30`,
                borderRadius: 8,
                padding: "14px 16px",
                background: col.color + "05",
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, color: col.color, marginBottom: 10 }}>
                {col.title}
              </p>
              {col.items.map((item: any, j: any) => (
                <p key={j} style={{
                  fontSize: 12,
                  color: "#374151",
                  margin: "0 0 6px",
                  paddingLeft: 12,
                  lineHeight: 1.5,
                  borderLeft: `2px solid ${col.color}40`,
                }}>
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 집 마련 계획에는 어떤 영향인가요?"로 가장 많이 물어보는 것들이에요.
        </p>
        <FAQ />

        <div style={{
          marginTop: "1.2rem",
          padding: "14px 18px",
          background: "#f9fafb",
          borderRadius: 10,
          fontSize: 12,
          color: "#9ca3af",
          lineHeight: 1.9,
        }}>
          이 글은 2025년 9월 7일 국토교통부 발표를 바탕으로 2026년 3월 기준으로 작성됐어요. 정책은 변동될 수 있으니 공식 발표를 직접 확인하세요.
        </div>
        <Divider />
        <References />
      </div>
    </div>
  );
}
