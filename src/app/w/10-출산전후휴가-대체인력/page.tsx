"use client";
import { useState } from "react";

// ─── 2026년 기준 (고용보험법 §70·§75·§76, 고용부 고시)
// 출산전후휴가 급여 (고용보험법 §75):
//   우선지원대상기업: 90일분 전액 고용보험 지급
//   대기업: 최초 60일분은 사업주 부담, 이후 30일분만 고용보험
// 급여 상한액 (2026 기준):
//   통상임금 기준. 우선지원 상한 월 220만원 (2024.1.1~)
// 대체인력지원금 (고용보험법 §70):
//   우선지원대상기업 사업주 지원
//   지원 기간: 출산전후휴가 90일 + 육아휴직 연장 시 해당 기간 포함
//   인수인계 기간: 출산전후휴가 시작 2주 전부터 최대 2개월 인정
//   지원 금액: 월 80만원 (30인 미만 월 120만원, 고용부 고시 기준)
//   ※ 2024.1.1부터 분기별 → 매월 지급 방식으로 변경
// 유산·사산휴가: 대체인력지원금 대상 (일정 임신 주수 이상)
// 신청 기한: 휴가 종료 후 12개월 이내
// 신청처: 사업장 관할 고용센터 또는 고용보험 사이트(ei.go.kr)

const SIDEBAR_LINKS = [
  "출산전후휴가 대체인력지원금",
  "출산전후휴가 급여 상한액",
  "출산전후휴가 대체인력 신청",
  "우선지원대상기업 대체인력",
  "출산전후휴가 육아휴직 연계",
  "대체인력 인수인계 기간",
  "출산전후휴가 대체인력 서류",
  "유산사산휴가 대체인력",
  "출산전후휴가 급여 계산",
  "대체인력지원금 월 지급",
  "고용보험 출산전후휴가",
  "출산전후휴가 파견 대체인력",
  "30인 미만 대체인력지원금",
  "출산전후휴가 90일",
  "대체인력 고용센터 신청",
  "육아휴직 대체인력 연장",
  "출산전후휴가 복직 후 인계",
  "사업주 출산전후휴가 지원",
  "고용보험 사이트 신청",
  "우선지원대상기업 조건",
];

const HUB_LINKS = [
  { title: "6+6 부모육아휴직제 | 2026 급여 상한과 적용 조건", desc: "부모 동시 육아휴직 시 급여 인상 구조 정리", href: "#" },
  { title: "육아기 근로시간 단축 대체인력 | 지원금 신청 방법", desc: "단축 기간 대체인력 채용 시 지원금 조건", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "출산전후휴가에서 바로 육아휴직으로 넘어가면 대체인력을 다시 채용해야 하나요?",
    a: "아니에요. 같은 대체인력이 육아휴직 기간까지 계속 일하면 지원금도 이어서 받을 수 있어요. 출산전후휴가 종료 후 육아휴직으로 연장되는 경우, 대체인력 계약도 연장하면 지원금이 단절 없이 지급돼요. 별도로 새 대체인력을 채용할 필요 없어요.",
  },
  {
    urgent: true,
    q: "대체인력을 출산전후휴가 시작 전부터 미리 채용했어요. 지원금이 나오나요?",
    a: "나와요. 인수인계 목적으로 출산전후휴가 시작 2주 전부터 채용한 경우, 최대 2개월까지 인수인계 기간을 지원 기간에 포함할 수 있어요. 복직 후 인수인계 기간도 마찬가지예요.",
  },
  {
    urgent: true,
    q: "우리 회사가 대기업이면 지원금을 못 받나요?",
    a: "못 받아요. 대체인력지원금은 우선지원대상기업(중소기업) 사업주만 받을 수 있어요. 다만 출산전후휴가 급여는 대기업도 마지막 30일분을 고용보험에서 지급받아요.",
  },
  {
    urgent: false,
    q: "지원금이 분기마다 나오던 것 같은데, 지금도 그런가요?",
    a: "아니에요. 2024년 1월 1일부터 분기별 지급 방식에서 매월 지급 방식으로 바뀌었어요. 매월 신청하면 해당 월 지원금을 받을 수 있어요.",
  },
  {
    urgent: false,
    q: "유산·사산 후 휴가를 주었는데 대체인력지원금 받을 수 있나요?",
    a: "받을 수 있어요. 임신 16주 이후의 유산·사산으로 인한 휴가도 대체인력지원금 대상이에요. 임신 주수별로 휴가 일수가 다르니 고용센터에 확인하세요.",
  },
  {
    urgent: false,
    q: "대체인력으로 파견 근로자를 써도 되나요?",
    a: "돼요. 직접 채용 외에 파견 근로자도 대체인력으로 인정돼요. 다만 파견 계약서 등 파견 사용 증빙이 필요해요.",
  },
  {
    urgent: false,
    q: "신청 기한이 있나요?",
    a: "휴가 종료일 다음 날로부터 12개월 이내에 신청해야 해요. 기한을 넘기면 지원금을 받지 못해요. 사업장 관할 고용센터 또는 고용보험 사이트(ei.go.kr)에서 신청할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제70조: 대체인력지원금", url: "https://www.law.go.kr/" },
      { label: "고용보험법 제75조: 출산전후휴가 급여", url: "https://www.law.go.kr/" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용보험 사이트 (ei.go.kr): 신청 및 지원금 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 일·가정 양립 지원제도 안내", url: "https://www.moel.go.kr" },
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

function H2({ children }) {
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

function Bdg({ children }) {
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

function GreenBox({ title, children }) {
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

function WarnBox({ title, children }) {
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
    employer: {
      title: "사업주로서 지원금을 신청하려는 중이라면",
      color: G,
      bg: GL,
      text: "우선지원대상기업(중소기업)만 받을 수 있어요. 대체인력을 출산전후휴가 시작 2주 전부터 채용했다면 인수인계 기간도 지원 대상이에요. 아래 체커로 지원 가능 기간을 먼저 확인해보세요.",
    },
    extend: {
      title: "출산전후휴가 후 육아휴직으로 이어지는 경우라면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "같은 대체인력이 육아휴직 기간까지 계속 일하면 지원금도 이어서 받을 수 있어요. 별도로 새 대체인력을 채용할 필요 없어요. 대체인력 계약을 육아휴직 기간까지 연장하면 돼요.",
    },
    docs: {
      title: "서류 준비 중인데 뭘 챙겨야 할지 모르겠다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "월별 임금대장이 가장 자주 빠져요. 한 달이라도 없으면 해당 기간 지원금을 못 받아요. 대체인력 근로계약서와 임금대장부터 지금 바로 챙겨두세요.",
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
            { id: "employer", label: "사업주인데 대체인력지원금 신청 방법을 알고 싶어요." },
            { id: "extend",   label: "출산전후휴가 후 육아휴직으로 바로 이어지는 경우예요." },
            { id: "docs",     label: "신청 서류가 복잡해서 뭘 챙겨야 하는지 모르겠어요." },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setType(item.id)}
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
          onClick={() => setType(null)}
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

function PeriodChecker() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));

  const conditions = [
    {
      id: "a",
      label: "우선지원대상기업(중소기업)이에요",
      sub: "상시 근로자 수 기준. 업종별 300~500인 이하",
    },
    {
      id: "b",
      label: "대체인력을 새로 채용했어요 (기존 근로자 전환 아님)",
      sub: "파견 근로자도 가능해요",
    },
    {
      id: "c",
      label: "출산전후휴가 시작일로부터 30일 이상 지났어요",
      sub: "최소 30일 이상 대체인력 사용 후 신청 가능",
    },
  ];

  const allOk = conditions.every((c) => checked[c.id]);
  const someChecked = Object.keys(checked).length > 0;

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {conditions.map((c) => (
          <label
            key={c.id}
            onClick={() => toggle(c.id)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer",
              border: `1px solid ${checked[c.id] ? G : "#e5e7eb"}`,
              background: checked[c.id] ? GL : "#f9fafb",
            }}
          >
            <input
              type="checkbox"
              checked={!!checked[c.id]}
              readOnly
              style={{ accentColor: G, marginTop: 3, flexShrink: 0 }}
            />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>
              {c.label}
              <span style={{ fontSize: 11, color: "#6b7280", display: "block", marginTop: 3 }}>
                {c.sub}
              </span>
            </span>
          </label>
        ))}
      </div>
      {allOk && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          ✅ <strong>지원금 신청이 가능해요.</strong> 사업장 관할 고용센터 또는 ei.go.kr에서 신청하세요.
        </div>
      )}
      {!allOk && someChecked && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#FEF2F2", fontSize: 13, lineHeight: 1.8 }}>
          <strong style={{ color: "#DC2626" }}>미충족 조건이 있어요.</strong> 3가지 모두 충족해야 신청 가능해요.
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = (i) => setOpen((p) => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button
            onClick={() => toggle(i)}
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
        {HUB_LINKS.map((link, i) => (
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
      {REFERENCES.map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>
            {group.category.toUpperCase()}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
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
        이 글은 2026년 3월 기준 고용보험법 등을 바탕으로 작성됐어요. 지원 기준은 변경될 수 있으니 고용센터에서 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          출산·육아 지원 관련 글
        </p>
        {SIDEBAR_LINKS.map((label, i) => (
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

export default function MaternityReplacePage() {
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
          고용보험 · 출산전후휴가 · 대체인력지원금
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          출산전후휴가 대체인력 지원금 |<br />
          육아휴직과 동시 신청 가능한가
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          직원이 출산전후휴가를 쓰는데 대체인력 채용 비용이 부담되셨죠.<br />
          <strong>우선지원대상기업(중소기업)이라면 대체인력 인건비의 일부를 고용보험에서 지원받을 수 있어요.</strong><br /><br />
          육아휴직으로 이어져도 같은 대체인력으로 지원금을 계속 받을 수 있어요. 지금 내 상황부터 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>지원금 신청 가능 여부, 먼저 체크해보세요</H2>
        <p style={body}>
          지원금을 받으려면 3가지 조건을 모두 충족해야 해요.<br />
          하나라도 빠지면 신청이 안 되니, 미리 확인하세요.
        </p>
        <Bdg>3가지 조건 체크해보세요</Bdg>
        <PeriodChecker />
        <GreenBox title="이것만 기억해요">
          우선지원대상기업 + 새로 채용한 대체인력 + 30일 이상 사용<br />
          육아휴직으로 연장 시 같은 대체인력으로 지원금 계속 수령 가능<br />
          2024.1.1부터 분기별이 아닌 매월 신청·수령 방식으로 변경
        </GreenBox>

        <Divider />

        <H2>지원 기간과 금액은 얼마나 되나요?</H2>
        <p style={body}>
          "얼마나 받을 수 있냐"가 가장 궁금하시죠.<br />
          채용 시점부터 복직 후 인수인계까지 전 기간이 지원 대상이에요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: GL }}>
                {["구분", "지원 내용"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 10px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: GD,
                      borderBottom: `2px solid ${G}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["지원 금액",      "월 80만원 (상시 30인 미만: 월 120만원)"],
                ["지원 기간",      "출산전후휴가 90일 + 연장 시 육아휴직 기간 포함"],
                ["인수인계 기간",  "휴가 시작 2주 전부터 최대 2개월 (복직 후 포함)"],
                ["지급 방식",      "매월 신청 (2024.1.1~ 분기 → 월 변경)"],
                ["신청 기한",      "휴가 종료 후 12개월 이내"],
                ["신청처",         "사업장 관할 고용센터 또는 ei.go.kr"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "9px 10px", fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ padding: "9px 10px", color: "#374151" }}>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <WarnBox title="월별 임금대장이 없으면 해당 기간 지원금 못 받아요">
          신청 서류 중 월별 임금대장이 가장 자주 빠져요. 한 달이라도 없으면 그 기간 지원금을 받지 못해요. 대체인력을 채용했다면 지금 바로 임금대장부터 챙겨두세요.
        </WarnBox>

        <HubLinks />

        <Divider />

        <H2>신청 서류, 뭘 준비해야 하나요?</H2>
        <p style={body}>
          서류 누락이 반려의 대부분이에요.<br />
          아래 목록으로 미리 준비하면 신청 당일에 막히는 일이 없어요.
        </p>
        <div style={{ margin: "12px 0 1.2rem" }}>
          {[
            { item: "출산전후휴가 확인서 (근로자 서명)", required: true },
            { item: "대체인력 근로계약서", required: true },
            { item: "월별 임금대장 (대체인력)", required: true },
            { item: "통장 사본 (사업주)", required: true },
            { item: "사업자등록증 사본", required: true },
            { item: "파견 사용 시: 파견 계약서", required: false },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                border: `1px solid ${s.required ? "#9FE1CB" : "#e5e7eb"}`,
                background: s.required ? GL : "#fafafa",
                marginBottom: 6,
              }}
            >
              <span style={{ color: s.required ? G : "#9ca3af", fontWeight: 700, flexShrink: 0 }}>
                {s.required ? "✓" : "△"}
              </span>
              <span style={{ fontSize: 13, color: "#374151" }}>{s.item}</span>
              {s.required && (
                <span style={{ fontSize: 11, color: G, marginLeft: "auto", fontWeight: 600 }}>필수</span>
              )}
            </div>
          ))}
        </div>

        <Divider />

        <H2>자주 막히는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 경우엔 되나요?"로 가장 많이 물어보는 것들이에요. 급한 것부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            신청은 고용보험 사이트 또는 관할 고용센터로
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="https://www.ei.go.kr"
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                background: G,
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              ↗ 고용보험 사이트 (ei.go.kr)
            </a>
            <a
              href="tel:1350"
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                background: "#fff",
                border: `1px solid ${G}`,
                color: G,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              📞 고용노동부 1350
            </a>
          </div>
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
          이 글은 2026년 3월 기준 고용보험법 등을 바탕으로 작성됐어요. 지원 기준은 변경될 수 있으니 고용센터에서 확인하세요.
        </div>
      </div>
    </div>
  );
}
