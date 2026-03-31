"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 2026년 기준 (서민금융진흥원 햇살론유스 운영 기준)
// 대상: 만 19세 이상 ~ 만 34세 이하 청년
// 유형별 자격 및 한도:
//   ① 재학생·휴학생: 대학(원) 재학 또는 휴학 중. 한도 1,200만원
//   ② 취준생: 졸업 후 미취업 상태. 한도 900만원
//   ③ 사회초년생: 중소·중견기업 재직 1년 미만. 한도 1,200만원
//   ④ 군 장병: 현역 복무 중. 한도 500만원
// 소득 기준: 연소득 3,500만원 이하 (무소득자 포함 일부 가능)
// 신용점수: 하한선 이상 (상품별 상이)
// 금리: 연 3.5~5.0% (보증료 포함)
// 용도: 학업비용, 주거비, 취업준비비, 생활비 등
// 신청처: 서민금융진흥원 1397, 농협·신협·새마을금고 등 협약 금융기관
// 중복 이용: 다른 햇살론과 중복 불가

const SIDEBAR_LINKS = [
  "햇살론유스 자격 조건",
  "햇살론유스 한도",
  "햇살론유스 금리",
  "햇살론유스 대학생",
  "햇살론유스 취준생",
  "햇살론유스 사회초년생",
  "햇살론유스 군인",
  "햇살론유스 신청 방법",
  "햇살론유스 소득 기준",
  "햇살론유스 신용점수",
  "햇살론유스 무소득",
  "청년 저금리 대출",
  "햇살론유스 서류",
  "햇살론유스 1397",
  "햇살론유스 취업준비",
  "햇살론유스 주거비",
  "햇살론유스 생활비",
  "햇살론유스 학비",
  "서민금융진흥원 청년",
  "햇살론유스 vs 청년도약계좌",
];

const HUB_LINKS = [
  { title: "햇살론 부결 사유 | 재신청 가능한 타이밍", desc: "부결 후 해결 방법과 재신청 타이밍 정리", href: "#" },
  { title: "햇살론 대환대출 | 고금리 대출 갈아타기", desc: "연 10% 초과 고금리 대출을 햇살론으로 전환", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "소득이 없는 취준생도 받을 수 있나요?",
    a: "가능해요. 햇살론유스 취준생 유형은 무소득자도 신청할 수 있어요. 다만 소득이 아예 없으면 심사에서 불리할 수 있어요. 아르바이트 소득이 있다면 급여통장 내역 등으로 증빙하는 게 유리해요. 정확한 기준은 1397에서 확인하세요.",
  },
  {
    urgent: true,
    q: "중소기업 재직 1년이 넘었는데 사회초년생 유형으로 신청할 수 없나요?",
    a: "사회초년생 유형은 중소·중견기업 재직 1년 미만이 조건이에요. 재직 1년을 넘겼다면 이 유형은 안 돼요. 연소득 3,500만원 이하라면 일반 햇살론15를 검토해보세요.",
  },
  {
    urgent: true,
    q: "만 35세인데 신청할 수 없나요?",
    a: "안 돼요. 햇살론유스는 만 34세 이하만 가능해요. 만 35세 이상이라면 햇살론15 또는 서민금융 다른 상품을 검토하세요. 서민금융진흥원 1397에 전화하면 내 상황에 맞는 상품을 안내받을 수 있어요.",
  },
  {
    urgent: false,
    q: "상환하면 다시 쓸 수 있나요?",
    a: "아니에요. 햇살론유스는 1회성 상품이에요. 상환해도 재이용은 안 돼요. 한도 내에서 처음 한 번만 이용할 수 있어요.",
  },
  {
    urgent: false,
    q: "대학교 등록금도 사용할 수 있나요?",
    a: "가능해요. 재학생·휴학생 유형의 경우 학업비용(등록금·교재비 등) 용도로 사용할 수 있어요. 다만 실제 집행 용도를 증빙해야 할 수 있어요.",
  },
  {
    urgent: false,
    q: "군 전역 후에도 군 장병 유형으로 신청할 수 있나요?",
    a: "아니에요. 군 장병 유형은 현역 복무 중인 경우에만 가능해요. 전역 후라면 취준생 또는 사회초년생 유형으로 신청하세요.",
  },
  {
    urgent: false,
    q: "햇살론유스와 다른 햇살론을 같이 받을 수 있나요?",
    a: "안 돼요. 햇살론 계열 상품은 중복 이용이 안 돼요. 현재 다른 햇살론을 이용 중이라면 햇살론유스를 새로 받을 수 없어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "서민금융진흥원: 햇살론유스 상품 안내", url: "https://www.kinfa.or.kr" },
      { label: "서민금융통합지원센터 콜센터: 1397", url: "https://www.kinfa.or.kr" },
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
    student: {
      title: "대학생·휴학생이라면",
      color: G,
      bg: GL,
      text: "재학생·휴학생 유형으로 최대 1,200만원까지 신청 가능해요. 학비·주거비·생활비 모두 사용 가능해요. 소득이 없어도 신청할 수 있어요. 아래 유형별 조건표에서 내 상황을 먼저 보세요.",
    },
    jobseeker: {
      title: "취준생이라면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "졸업 후 미취업 상태라면 취준생 유형으로 최대 900만원까지 가능해요. 무소득자도 신청할 수 있지만, 아르바이트 소득이 있다면 증빙하는 게 심사에 유리해요.",
    },
    worker: {
      title: "사회초년생이라면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "중소·중견기업 재직 1년 미만이면 사회초년생 유형으로 최대 1,200만원까지 가능해요. 재직 1년이 넘었다면 이 유형은 안 되고 일반 햇살론15를 검토해야 해요.",
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
            { id: "student",  label: "대학교 재학 중이거나 휴학 중이에요." },
            { id: "jobseeker",label: "졸업 후 취업 준비 중이에요." },
            { id: "worker",   label: "중소기업에 취업한 지 얼마 안 됐어요." },
          ].map((item: any) => (
            <button
              key={item.id}
              onClick={(_e: any) => setType(item.id)}
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
          onClick={(_e: any) => setType(null)}
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

function TypeChecker() {
  const [selected, setSelected] = useState(null);

  const types = [
    {
      id: "a",
      label: "재학생·휴학생",
      sub: "대학(원) 재학 또는 휴학 중",
      limit: "최대 1,200만원",
      rate: "연 3.5~5.0%",
      income: "연소득 3,500만원 이하",
      color: G,
    },
    {
      id: "b",
      label: "취준생",
      sub: "졸업 후 미취업 상태",
      limit: "최대 900만원",
      rate: "연 3.5~5.0%",
      income: "연소득 3,500만원 이하 (무소득 가능)",
      color: "#7C3AED",
    },
    {
      id: "c",
      label: "사회초년생",
      sub: "중소·중견기업 재직 1년 미만",
      limit: "최대 1,200만원",
      rate: "연 3.5~5.0%",
      income: "연소득 3,500만원 이하",
      color: "#0ea5e9",
    },
    {
      id: "d",
      label: "군 장병",
      sub: "현역 복무 중",
      limit: "최대 500만원",
      rate: "연 3.5~5.0%",
      income: "연소득 3,500만원 이하",
      color: "#f59e0b",
    },
  ];

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {types.map((t: any) => (
          <button
            key={t.id}
            onClick={(_e: any) => setSelected(selected === t.id ? null : t.id)}
            style={{
              padding: "12px 14px",
              borderRadius: 8,
              border: `2px solid ${selected === t.id ? t.color : "#e5e7eb"}`,
              background: selected === t.id ? t.color + "10" : "#f9fafb",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: t.color, margin: "0 0 2px" }}>
              {t.label}
            </p>
            <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>{t.sub}</p>
          </button>
        ))}
      </div>
      {selected && (() => {
        const t = types.find((x: any) => x.id === selected);
        return (
          <div style={{
            marginTop: 12,
            padding: "14px 16px",
            borderRadius: 8,
            background: t.color + "10",
            border: `1px solid ${t.color}40`,
          }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: t.color, margin: "0 0 8px" }}>
              {t.label} 유형 상세
            </p>
            {[
              ["한도", t.limit],
              ["금리", t.rate],
              ["소득 기준", t.income],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 12, marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: GD, width: 70, flexShrink: 0 }}>
                  {k}
                </span>
                <span style={{ fontSize: 12, color: "#374151" }}>{v}</span>
              </div>
            ))}
          </div>
        );
      })()}
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
            onClick={(_e: any) => toggle(i)}
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
      <h3 style={{
        fontSize: 15,
        fontWeight: 600,
        color: "#374151",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
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
        이 글은 2026년 3월 기준으로 작성됐어요. 상품 기준은 변경될 수 있으니 서민금융진흥원(1397)에서 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          햇살론 관련 글
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

export default function HatSalYouthPage() {
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
          서민금융 · 햇살론유스 · 청년 대출
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          햇살론유스 자격 조건 |<br />
          한도와 신청 방법 대학생·취준생 기준
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          등록금·생활비·취업 준비 비용이 부담스러운데 마땅한 대출이 없어서 막막하셨죠.<br />
          <strong>만 19~34세 청년이라면 대학생·취준생·사회초년생·군 장병 유형으로 연 3.5~5% 저금리로 최대 1,200만원까지 받을 수 있어요.</strong><br /><br />
          내 상황이 어느 유형에 해당하는지 먼저 보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>내 유형이 뭔지 모르겠어요. 4가지 유형별 조건을 보세요</H2>
        <p style={body}>
          햇살론유스는 청년 상황에 따라 4가지 유형으로 나뉘어요.<br />
          재학생인지, 졸업 후 취준 중인지, 취업 초반인지, 군 복무 중인지에 따라 한도와 조건이 달라요.<br />
          아래에서 내 유형을 선택하면 한도·금리·소득 기준이 바로 나와요.
        </p>
        <Bdg>내 상황을 선택해보세요</Bdg>
        <TypeChecker />
        <GreenBox title="이것만 기억해요">
          만 19~34세 + 연소득 3,500만원 이하 + 해당 유형 조건 충족 → 신청 가능<br />
          금리 연 3.5~5.0% / 최대 1,200만원 (군 장병 500만원)<br />
          다른 햇살론 이용 중이면 중복 신청 불가
        </GreenBox>

        <Divider />

        <H2>소득이 없어도 신청할 수 있나요?</H2>
        <p style={body}>
          "소득이 없으면 안 되겠지"라고 포기하는 분이 많은데, 꼭 그렇지 않아요.<br />
          취준생 유형은 무소득자도 신청할 수 있고, 아르바이트 소득이 있다면 증빙하는 게 심사에 유리해요.<br />
          단, 연소득이 3,500만원을 초과하면 전 유형 모두 신청이 안 돼요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: GL }}>
                {["유형", "무소득 가능 여부", "소득 상한"].map((h: any) => (
                  <th key={h} style={{
                    padding: "8px 10px",
                    textAlign: "left",
                    fontWeight: 700,
                    color: GD,
                    borderBottom: `2px solid ${G}`,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["재학생·휴학생", "가능 (심사 시 불리할 수 있음)",      "연 3,500만원 이하"],
                ["취준생",       "가능 (아르바이트 소득 증빙 유리)",    "연 3,500만원 이하"],
                ["사회초년생",   "불가 (재직 소득 필요)",               "연 3,500만원 이하"],
                ["군 장병",      "가능 (복무 급여 인정)",               "연 3,500만원 이하"],
              ].map((row: any, i: any) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "9px 10px", fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ padding: "9px 10px" }}>{row[1]}</td>
                  <td style={{ padding: "9px 10px", color: GD, fontWeight: 600 }}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <HubLinks />

        <Divider />

        <H2>신청 방법이 어떻게 되나요?</H2>
        <p style={body}>
          온라인 신청이 어렵다면 1397에 전화하면 가까운 취급 기관을 바로 안내해줘요.<br />
          서류만 완비하면 신청 당일 처리가 가능한 경우도 있어요.
        </p>
        <div style={{ margin: "12px 0 1.2rem" }}>
          {[
            {
              step: "1397 전화 또는 협약 기관 방문",
              desc: "서민금융진흥원 1397에 전화하거나, 농협·신협·새마을금고 등 협약 금융기관을 방문해요.",
            },
            {
              step: "유형별 서류 준비",
              desc: "신분증 + 재학증명서(재학생) / 졸업증명서(취준생) / 재직증명서·근로계약서(사회초년생) / 병적증명서(군 장병). 소득 증빙은 급여통장 내역·건강보험료 납부확인서 등.",
            },
            {
              step: "심사 및 실행",
              desc: "서류 심사 후 결과 통보. 승인 시 지정 계좌로 입금돼요.",
            },
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
                background: G,
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
                </p>
                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "0 0 1.5rem" }}>
          <a
            href="https://www.kinfa.or.kr"
            style={{
              padding: "11px 20px",
              borderRadius: 8,
              background: G,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ↗ 지금 신청하러 가기
          </a>
          <a
            href="tel:1397"
            style={{
              padding: "11px 20px",
              borderRadius: 8,
              background: "#fff",
              border: `1px solid ${G}`,
              color: G,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            📞 서민금융진흥원 1397
          </a>
        </div>

        <Divider />

        <H2>상환하면 다시 받을 수 있나요? 한도 부족하면 어떻게 하나요?</H2>
        <p style={body}>
          "다 갚으면 또 쓸 수 있겠지"라고 생각하셨다면, 아쉽게도 안 돼요.<br />
          햇살론유스는 1회성 상품이에요. 상환 후 재이용이 안 되고, 한도를 높이거나 추가 대출도 안 돼요.<br />
          한도가 부족하다면 1397에 전화해서 다른 서민금융 상품과 병행이 가능한지 상담받는 게 좋아요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0 1.2rem" }}>
          {[
            { q: "상환 후 재이용",    a: "불가. 1회성 상품이에요.", bad: true },
            { q: "한도 증액",         a: "불가. 유형별 한도가 고정이에요.", bad: true },
            { q: "다른 햇살론 중복",  a: "불가. 햇살론 계열 중복 이용 안 돼요.", bad: true },
            { q: "한도 부족 시 대안", a: "1397 상담 → 다른 서민금융 상품 안내", bad: false },
          ].map((item: any, i: any) => (
            <div
              key={i}
              style={{
                padding: "12px 14px",
                borderRadius: 8,
                border: `1px solid ${item.bad ? "#FED7AA" : "#9FE1CB"}`,
                background: item.bad ? "#FFF7ED" : GL,
              }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, color: item.bad ? "#C2410C" : GD, margin: "0 0 4px" }}>
                {item.q}
              </p>
              <p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 경우에도 되나요?"로 가장 많이 물어보는 것들이에요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            내 유형과 자격이 불확실하다면 1397에 바로 전화하세요
          </p>
          <a
            href="tel:1397"
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              background: G,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            📞 서민금융진흥원 1397
          </a>
        </div>

        <Divider />
        <References />

        <div style={{
          marginTop: "1.2rem",
          padding: "14px 18px",
          background: "#f9fafb",
          borderRadius: 10,
          fontSize: 12,
          color: "#9ca3af",
          lineHeight: 1.9,
        }}>
          이 글은 2026년 3월 기준으로 작성됐어요. 상품 기준은 변경될 수 있으니 서민금융진흥원(1397)에서 확인하세요.
        </div>
      </div>
    </div>
  );
}
