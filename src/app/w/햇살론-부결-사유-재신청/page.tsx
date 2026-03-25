"use client";
import { useState } from "react";

// Q1. 햇살론 신청했다가 부결 받은 직장인이 부결 사유를 이해하고 재신청 전략을 세움
// Q2. 부결 사유 파악 → 신용개선/기대출 정리 → 재신청 준비 또는 대안 선택
// Q3. 주요 5가지 부결 사유 + 재신청 타이밍 + 대안 상품 정보
// Q4. EligibilityChecker(부결 위험도 자가진단) + H2 섹션별 상세 설명 + FAQ + References

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}

function H2({ children }) {
  return (
    <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>
      {children}
    </h2>
  );
}

function Bdg({ children }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}

function GreenBox({ title, children }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function BorderBox({ title, children }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

const REJECTION_REASONS = [
  {
    title: "기대출 과다 (DSR 초과)",
    icon: "📊",
    desc: "월소득 대비 빌린 돈 비율이 너무 높아요.",
    detail: "햇살론은 DSR(Debt Service Ratio) 기준을 엄격하게 봐요. 기존 대출금 + 햇살론 월상환액이 월소득의 40~50%를 넘으면 부결돼요. 직장인 대출자 대부분이 이 이유로 떨어져요.",
    howToFix: "기존 대출을 일부 상환해서 월 부담을 낮추거나, 소득이 증가할 때까지 3~6개월 대기하세요."
  },
  {
    title: "연체 이력 (최근 3년)",
    icon: "⏰",
    desc: "신용카드·대출금을 연체했거나 미납이 있어요.",
    detail: "최근 3년 내 30일 이상 연체 기록이 있으면 부결될 확률이 매우 높아요. 그것도 여러 건이면 더 떨어질 가능성이 커요. 소액 미납(휴대폰료, 공과금 등)도 기록되므로 주의하세요.",
    howToFix: "미납금을 모두 해소하고 3~6개월 이상 깨끗하게 관리한 후 재신청하세요. 신용점수가 회복되는 데 6개월~1년 걸릴 수 있어요."
  },
  {
    title: "신용점수 미달",
    icon: "🎯",
    desc: "신용점수가 600점 이하예요.",
    detail: "햇살론 심사 기준은 신용점수 600점 이상이에요. 600점 미만이면 자동으로 부결돼요. 서민금융진흥원이 발표하는 신용점수는 조회 시점마다 달라서, 300점 차이도 날 수 있어요.",
    howToFix: "신용카드 연체 해소, 소액 미납 정리, 기존 대출 상환으로 신용점수를 올리세요. 6개월~1년의 신용 관리 후 재신청하면 통과 가능성이 높아져요."
  },
  {
    title: "소득 증빙 불일치",
    icon: "📋",
    desc: "신청서에 적힌 소득과 실제 증빙 소득이 다르거나, 증빙이 부족해요.",
    detail: "국세청 소득자료와 신청서 소득이 20% 이상 차이 나면 부결돼요. 또는 최근 1년 소득 증빙(원천징수영수증, 급여명세서 등)이 없으면 심사 대상에도 오르지 않아요.",
    howToFix: "정확한 소득을 증빙하고, 최근 급여명세서 또는 연말정산영수증을 준비해서 재신청하세요."
  },
  {
    title: "앱컷 또는 자동 탈락",
    icon: "⚠️",
    desc: "자동심사 단계에서 불합격 판정을 받았어요.",
    detail: "햇살론 앱에서 신청하면 서류 제출 전 자동으로 심사돼요. 신용점수·기대출·연체 이력·소득 검증이 순간적으로 이루어져요. 이 단계에서 떨어지면 '앱컷'이라고 불러요. 앱컷은 서류 심사로 넘어가지 않아요.",
    howToFix: "1~3개월 후 신용점수가 개선되면 재신청해보세요. 이번엔 일반 심사 단계까지 진행될 가능성이 높아져요."
  }
];

const ALTS = [
  {
    name: "햇살론 특례보증",
    badge: "같은 상품, 덜 까다로워요",
    rate: "4.1~9.9%",
    amount: "최대 2,000만원",
    pros: ["신용점수 600점 미만도 가능", "기대출 1,500만원 이하면 심사 유리", "부결 받은 지 1개월 후 재신청 가능"],
    cons: ["보증료 있음 (1.5~2.5%)", "햇살론보다 금리 더 높을 수 있음"],
    link: "https://www.kinfa.or.kr"
  },
  {
    name: "불법사금융예방대출",
    badge: "최후의 선택",
    rate: "12.0~20.0%",
    amount: "최대 1,000만원",
    pros: ["신용점수 관계없음", "아무 신용정보도 조회 안 함", "부결 경험자도 대출 가능"],
    cons: ["금리가 매우 높음", "이 상품 이용 자체가 신용이력에 남음", "단기 어려움 극복용만 권장"],
    link: "https://www.kinfa.or.kr/illicit"
  },
  {
    name: "미소금융",
    badge: "저신용자 전용",
    rate: "2.0~6.0%",
    amount: "최대 2,000만원",
    pros: ["금리 매우 낮음", "신용점수 500점대도 가능", "창업·사업자금으로도 쓸 수 있음"],
    cons: ["심사 기간 1~2주 걸림", "사업 목적이어야 함"],
    link: "https://www.kinfa.or.kr/micro"
  },
  {
    name: "새희망홀씨",
    badge: "보증금 필요",
    rate: "4.5~7.5%",
    amount: "최대 1,000만원",
    pros: ["햇살론보다 기준 더 관대함", "금리 낮은 편", "신용회복 중인 사람도 가능"],
    cons: ["담보 필요 (부동산/보험 등)", "신청 자격 제한 있음"],
    link: "https://www.kinfa.or.kr/newhope"
  }
];

function RejectionReasonCard({ reason, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div key={index} style={{ border: `1px solid #e5e7eb`, borderRadius: 10, padding: "16px 18px", marginBottom: 12, cursor: "pointer", background: expanded ? GL : "#f9fafb" }} onClick={() => setExpanded(!expanded)}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>{reason.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 2 }}>{reason.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{reason.desc}</div>
          </div>
        </div>
        <span style={{ fontSize: 18, color: G, flexShrink: 0 }}>{expanded ? "−" : "+"}</span>
      </div>
      {expanded && (
        <>
          <Divider />
          <p style={body}>{reason.detail}</p>
          <GreenBox title="어떻게 해야 하나요?">
            {reason.howToFix}
          </GreenBox>
        </>
      )}
    </div>
  );
}

function AltCard({ alt }) {
  return (
    <div style={{ border: `1px solid #9FE1CB`, borderRadius: 10, padding: "18px 20px", marginBottom: 16, background: "#fff" }}>
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
      <div style={{ background: "#f9fafb", borderRadius: 6, padding: "10px 12px", marginBottom: 12, fontSize: 13, color: "#374151" }}>
        한도: {alt.amount}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 6 }}>장점</div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13 }}>
            {alt.pros.map((p, i) => (
              <li key={i} style={{ color: "#374151", marginBottom: 4, lineHeight: 1.5 }}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 6 }}>단점</div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13 }}>
            {alt.cons.map((c, i) => (
              <li key={i} style={{ color: "#d97706", marginBottom: 4, lineHeight: 1.5 }}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <a href={alt.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: 13, fontWeight: 600, color: G, textDecoration: "none", borderBottom: `1px solid ${G}` }}>
        서민금융진흥원에서 신청하기
      </a>
    </div>
  );
}

function EligibilityChecker() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));

  const failCount = [
    checked.c1, // 신용점수 600 미만
    checked.c2, // 최근 3년 연체
    checked.c3, // DSR 초과 (기대출 많음)
    checked.c4, // 소득 증빙 부족
  ].filter(Boolean).length;

  let riskLevel = "낮음";
  let riskColor = "#10b981";
  if (failCount === 1) {
    riskLevel = "중간";
    riskColor = "#f59e0b";
  } else if (failCount >= 2) {
    riskLevel = "높음";
    riskColor = "#ef4444";
  }

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>해당하는 항목을 모두 체크해보세요.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "c1", label: "신용점수가 600점 미만이에요" },
          { id: "c2", label: "최근 3년 내 신용카드·대출 연체 이력이 있어요" },
          { id: "c3", label: "기존 대출이 1,500만원 이상 있어요" },
          { id: "c4", label: "최근 1년 소득 증빙 서류가 없거나 불일치해요" },
        ].map((item) => (
          <label
            key={item.id}
            onClick={() => toggle(item.id)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer",
              border: `1px solid ${checked[item.id] ? G : "#e5e7eb"}`,
              background: checked[item.id] ? GL : "#f9fafb",
            }}
          >
            <input
              type="checkbox"
              checked={!!checked[item.id]}
              readOnly
              style={{ accentColor: G, marginTop: 3, flexShrink: 0 }}
            />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>{item.label}</span>
          </label>
        ))}
      </div>

      {Object.values(checked).some(Boolean) && (
        <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "16px 18px", marginTop: 16, border: `1px solid ${riskColor}40` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: "50%", background: riskColor }}></span>
            <span style={{ fontSize: 12, fontWeight: 700, color: riskColor }}>부결 위험도: {riskLevel}</span>
          </div>
          {failCount === 0 && (
            <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.6 }}>
              체크된 항목이 없으면 햇살론 심사 통과 가능성이 높아요. 바로 신청해보세요.
            </p>
          )}
          {failCount === 1 && (
            <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.6 }}>
              1개 항목이 걱정된다면, 아래 '재신청 전 준비사항' 섹션을 읽고 2~3개월 준비 후 신청하는 게 좋아요.
            </p>
          )}
          {failCount >= 2 && (
            <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.6 }}>
              2개 이상 해당된다면 햇살론 통과가 어려워요. 아래 '대안 상품' 섹션에서 다른 대출을 찾거나, 3~6개월 신용개선 후 재신청하세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const FAQS = [
  {
    q: "햇살론 부결 받았는데, 바로 다시 신청해도 돼요?",
    a: "안 돼요. 최소 1개월 대기가 필요해요. 더 좋은 결과를 원하면 3~6개월을 권장해요. 그 사이에 신용점수가 올라가거나 기대출을 줄일 수 있거든요. 너무 자주 신청하면 오히려 신용점수가 떨어질 수 있어요.",
  },
  {
    q: "앱컷과 심사 부결이 뭐가 다르나요?",
    a: "앱컷은 서류 제출 전 자동으로 떨어지는 거고, 심사 부결은 서류를 다 제출한 후에 떨어지는 거예요. 앱컷은 기술적으로 되돌리기 어렵고, 심사 부결은 2~3개월 신용 개선 후 재신청하면 통과 가능성이 있어요.",
  },
  {
    q: "부결 받은 이유를 직접 물어볼 수 있나요?",
    a: "햇살론 앱이나 서민금융진흥원 고객센터(1599-8900)에 전화하면 부결 사유 몇 개를 알려줘요. 하지만 세부 사항은 공개 안 하는 경우도 있어요. 그럼 위의 자가진단으로 예상 사유를 파악하고 준비하세요.",
  },
  {
    q: "신용점수 600점을 넘으면 꼭 통과되나요?",
    a: "아니에요. 신용점수는 필요조건일 뿐 충분조건은 아니에요. 600점 이상이어도 기대출이 많거나 최근 연체 이력이 있으면 떨어질 수 있어요. 다만 600점 이상이면 심사 단계에 진입할 기회는 생겨요.",
  },
  {
    q: "대출 금리를 미리 알 수 있나요?",
    a: "햇살론은 심사 후에 금리가 결정돼요. 신용점수·기대출·연체 이력·소득 수준에 따라 4.1~9.9% 범위에서 달라져요. 더 좋은 금리를 원하면 신용점수를 올리고 기대출을 줄인 후 신청하세요.",
  },
];

const REFS = [
  { category: "공식 자료", items: [
    { label: "서민금융진흥원 햇살론", url: "https://www.kinfa.or.kr" },
    { label: "금융감독원 서민금융 가이드", url: "https://www.fss.or.kr" },
    { label: "한국신용정보원 신용점수 조회", url: "https://www.kcredit.or.kr" },
  ]},
];

export default function Page() {
  return (
    <article style={{ maxWidth: 640, margin: "0 auto", padding: "24px 20px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", marginBottom: 8, lineHeight: 1.4 }}>
        햇살론 부결 사유 & 재신청 전략
      </h1>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 24, lineHeight: 1.7 }}>
        신청했다가 떨어졌다면, 부결 이유를 알고 준비해야 다시 통과해요.
      </p>

      <GreenBox title="지금 상황이 어떻게 되세요?">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <strong>방금 부결 받았어요</strong><br />
            아래 '부결 사유 확인' 섹션에서 당신의 상황과 맞는 이유를 찾으세요. 앱에서 안내한 사유 1~2개가 나올 거예요.
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <strong>언제 다시 신청할 수 있나요?</strong><br />
            최소 1개월 후예요. 하지만 3~6개월 대기하면서 신용점수·기대출을 개선하면 통과 확률이 훨씬 높아져요.
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <strong>다른 대출도 고려 중이에요</strong><br />
            아래 '대안 상품' 섹션에서 햇살론보다 까다롭지 않은 상품들을 찾을 수 있어요.
          </div>
        </div>
      </GreenBox>

      <Divider />

      <H2>부결 위험도 자가진단</H2>
      <p style={body}>
        당신이 햇살론 심사에서 어떤 항목에 걸렸는지 체크해보세요. 점수가 높을수록 부결 가능성이 커요.
      </p>
      <EligibilityChecker />

      <Divider />

      <H2>부결 사유 5가지 (+ 대처법)</H2>
      <p style={body}>
        햇살론을 떨어뜨리는 가장 흔한 사유들이에요. 각 항목을 펼쳐서 당신의 상황을 확인하세요.
      </p>
      {REJECTION_REASONS.map((reason, idx) => (
        <RejectionReasonCard key={idx} reason={reason} index={idx} />
      ))}

      <Divider />

      <H2>재신청 전 준비사항</H2>
      <p style={body}>
        부결 후 3~6개월 동안 이렇게 준비하면 재신청 통과 확률이 크게 올라가요.
      </p>

      <BorderBox title="1단계: 신용점수 올리기 (1~3개월)">
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14, lineHeight: 2, color: "#374151" }}>
          <li><a href="/w/신용점수-올리는-방법" style={{ color: G, textDecoration: "none", borderBottom: `1px solid ${G}` }}>신용카드 연체 즉시 해소</a> — 미납금이 있으면 무조건 먼저 갚으세요.</li>
          <li>최근 6개월간 신용카드 결제 기록 남기기 — 정상 사용 기록이 신용점수를 올려요.</li>
          <li>신용조회 건수 줄이기 — 한 달에 2~3회 이상 신용 조회하면 신용점수가 떨어져요.</li>
        </ul>
      </BorderBox>

      <BorderBox title="2단계: 기대출 정리하기 (1~3개월)">
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14, lineHeight: 2, color: "#374151" }}>
          <li>고금리 대출(카드론, 신용대출) 우선 상환 — 월 부담을 최대 200만원 이상 줄여야 해요.</li>
          <li><a href="/w/대출-갈아타기-조건" style={{ color: G, textDecoration: "none", borderBottom: `1px solid ${G}` }}>저금리 상품으로 갈아타기</a> — 같은 금액이라도 금리가 낮으면 월상환액이 줄어들어요.</li>
          <li>단기 현금부채 정리하기 — 선결제 카드 잔액, 휴대폰 분납금도 다 포함돼요.</li>
        </ul>
      </BorderBox>

      <BorderBox title="3단계: 소득 증빙 정리하기 (신청 1주일 전)">
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14, lineHeight: 2, color: "#374151" }}>
          <li>최근 급여명세서 3개월분 준비 — 홈택스 소득과 일치해야 해요.</li>
          <li>원천징수영수증 또는 연말정산영수증 보관 — 국세청 소득 증빙용이에요.</li>
          <li>자영업자면 사업자등록증·통장·세금계산서 준비 — 소득 일관성을 보여줘야 해요.</li>
        </ul>
      </BorderBox>

      <Divider />

      <H2>대안 상품: 햇살론 떨어진 사람을 위한 선택지</H2>
      <p style={body}>
        햇살론이 안 되면 서민금융진흥원의 다른 상품들을 살펴보세요. 덜 까다롭고 금리도 비슷하거나 더 낮을 수 있어요.
      </p>
      {ALTS.map((alt, idx) => (
        <AltCard key={idx} alt={alt} />
      ))}

      <Divider />

      <H2>자주 묻는 질문 (FAQ)</H2>
      {FAQS.map((faq, idx) => (
        <div key={idx} style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 8 }}>Q. {faq.q}</h3>
          <p style={{ ...body, marginBottom: 0 }}>A. {faq.a}</p>
        </div>
      ))}

      <Divider />

      <H2>출처</H2>
      {REFS.map((ref, idx) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 8 }}>{ref.category}</p>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.8 }}>
            {ref.items.map((item, i) => (
              <li key={i}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: G, textDecoration: "none" }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Divider />

      <div style={{ background: GL, borderRadius: 10, padding: "18px 20px", textAlign: "center" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 8 }}>지금 바로 햇살론 재신청하기</p>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12, lineHeight: 1.6 }}>
          위의 준비사항을 모두 확인했다면, 서민금융진흥원 앱에서 재신청할 수 있어요.
        </p>
        <a href="https://www.kinfa.or.kr" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "10px 20px", background: G, color: "#fff", borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
          서민금융진흥원 방문하기
        </a>
      </div>
    </article>
  );
}
