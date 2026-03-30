import { useState } from "react";

// ─── 수도법 제33조·시행령·시행규칙 기준
// 급수설비 검사 의무 대상:
//   연면적 5,000㎡ 이상 또는 100세대 이상 (수도법 §33①)
// 검사 종류:
//   ① 사용 전 검사: 준공·사용개시 전
//   ② 정기검사: 최초 사용개시일로부터 3년 이내, 이후 3년마다
// 검사 주체: 시장·군수·구청장 또는 지정 검사기관
// 검사 항목: 수질(잔류염소·탁도·pH·대장균 등), 수량, 시설 위생 상태
// 잔류염소 기준: 0.1mg/L 이상 (수돗물 기준)
// 탁도 기준: 0.5NTU 이하
// pH 기준: 5.8~8.5
// 과태료: 검사 미실시 시 300만원 이하 (수도법 §84)
// 저수조 청소: 연면적 5,000㎡ 이상 건물 6개월에 1회 이상
// 수도계량기 검정 유효기간: 규격에 따라 8~10년

const SIDEBAR_LINKS = [
  "건물 급수관 검사 시기",
  "수도법 급수설비 검사",
  "건물 수질검사 의무",
  "급수설비 정기검사 주기",
  "100세대 급수관 검사",
  "5000제곱미터 급수관",
  "준공 후 급수관 검사",
  "급수관 검사 과태료",
  "수도법 제33조",
  "급수관 위생 검사",
  "수도계량기 교체 주기",
  "건물 수질 관리",
  "옥내급수관 교체",
  "급수관 잔류염소 검사",
  "급수설비 검사 기관",
  "급수설비 검사 신청",
  "레지오넬라균 급수",
  "건물 음용수 수질",
  "상수도 수질검사",
  "수도사업소 급수",
];

const HUB_LINKS = [
  { title: "건물 소방설비 검사 의무 | 작동기능점검·종합정밀점검", desc: "소방시설 점검 대상과 주기 정리", href: "#" },
  { title: "건물 승강기 검사 의무 | 정기검사 주기와 과태료", desc: "승강기 검사 대상 기준과 검사 신청 방법", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "우리 건물이 급수관 검사 의무 대상인가요?",
    a: "연면적 5,000㎡ 이상이거나 100세대 이상인 건물이 대상이에요. 이 둘 중 하나만 충족해도 의무예요. 해당된다면 사용개시일로부터 3년 이내에 최초 정기검사를 받아야 해요.",
  },
  {
    urgent: true,
    q: "검사를 안 받으면 과태료가 얼마인가요?",
    a: "수도법 제84조에 따라 300만원 이하의 과태료가 부과될 수 있어요. 검사를 미루면 위반 상태가 지속되므로 빨리 신청하는 게 유리해요.",
  },
  {
    urgent: true,
    q: "정기검사 주기가 어떻게 되나요?",
    a: "사용개시일로부터 3년 이내에 최초 정기검사를 받아야 하고, 이후 3년마다 받아야 해요. 검사를 받지 않았거나 시기를 놓쳤다면 지자체 상수도사업소나 지정 검사기관에 문의하세요.",
  },
  {
    urgent: false,
    q: "급수관 검사는 어디서 신청하나요?",
    a: "관할 시·군·구청 상수도 담당 부서 또는 지자체가 지정한 검사기관에 신청하면 돼요. 한국상하수도협회나 지역 상수도사업소에서 안내받을 수 있어요.",
  },
  {
    urgent: false,
    q: "급수관 검사 항목이 어떻게 되나요?",
    a: "수질검사(잔류염소 0.1mg/L 이상, 탁도 0.5NTU 이하, pH 5.8~8.5, 대장균 불검출 등), 수량 검사, 급수시설 위생 상태 확인이 기본이에요.",
  },
  {
    urgent: false,
    q: "100세대 미만, 5,000㎡ 미만 건물은 검사 의무가 없나요?",
    a: "수도법상 정기검사 의무 대상에서는 제외돼요. 하지만 수질 이상 시 관할 상수도사업소에 수시 점검을 요청할 수 있어요.",
  },
  {
    urgent: false,
    q: "수도계량기 교체 주기는 얼마인가요?",
    a: "계량기 검정 유효기간은 규격에 따라 8~10년이에요. 유효기간이 지나면 교체해야 해요. 관할 지자체 상수도사업소가 교체해줘요.",
  },
  {
    urgent: false,
    q: "저수조 청소도 의무인가요?",
    a: "연면적 5,000㎡ 이상 건물의 저수조는 6개월에 1회 이상 청소해야 해요. 청소 결과를 기록하고 보관해야 해요. 청소 미실시 시 과태료 대상이 될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "수도법 제33조: 급수설비 검사 의무", url: "https://www.law.go.kr/" },
      { label: "수도법 제84조: 과태료 (300만원 이하)", url: "https://www.law.go.kr/" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "환경부 상하수도 정책: 급수설비 관리", url: "https://www.me.go.kr" },
      { label: "한국상하수도협회: 검사기관 안내", url: "https://www.kwwa.or.kr" },
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
    check: {
      title: "우리 건물이 검사 대상인지 모르겠다면",
      color: G,
      bg: GL,
      text: "연면적 5,000㎡ 이상 또는 100세대 이상이면 의무 대상이에요. 아래 체커에서 해당 여부와 검사 시기를 바로 확인해보세요.",
    },
    late: {
      title: "정기검사 시기를 놓쳤거나 늦었다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "미실시 시 300만원 이하 과태료가 부과될 수 있어요. 지금이라도 관할 시·군·구 상수도 담당 부서에 문의해서 검사를 신청하세요. 적발 전 자진 신청이 유리해요.",
    },
    quality: {
      title: "수돗물 수질이 의심된다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "녹물·냄새·탁도 이상이 있으면 관할 상수도사업소에 수질 검사를 요청하세요. 의무 검사와 별개로 수시 수질 점검을 요청할 수 있어요.",
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
            { id: "check",   label: "우리 건물이 급수관 검사 의무 대상인지 확인하고 싶어요." },
            { id: "late",    label: "정기검사 시기를 놓쳤거나 언제 해야 하는지 모르겠어요." },
            { id: "quality", label: "수돗물 수질에 문제가 있는 것 같아요." },
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

function CheckSchedule() {
  const [area,  setArea]  = useState(3000);
  const [units, setUnits] = useState(80);
  const [year,  setYear]  = useState(2022);

  const isTarget = area >= 5000 || units >= 100;
  const dueYear  = year + 3;
  const now      = new Date().getFullYear();
  const overdue  = dueYear < now;
  const dueNow   = dueYear === now;

  const sliders = [
    {
      label: "연면적 (㎡)",
      val: area,
      set: setArea,
      min: 100,
      max: 50000,
      step: 100,
      disp: `${area.toLocaleString()}㎡`,
    },
    {
      label: "세대 수 (세대)",
      val: units,
      set: setUnits,
      min: 10,
      max: 1000,
      step: 10,
      disp: `${units}세대`,
    },
    {
      label: "사용개시 연도",
      val: year,
      set: setYear,
      min: 1990,
      max: 2025,
      step: 1,
      disp: `${year}년`,
    },
  ];

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        건물 정보를 입력하면 검사 의무 여부와 다음 검사 시기를 알 수 있어요.
      </p>
      {sliders.map((s) => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <label style={{ fontSize: 13, color: "#6b7280", width: 130, flexShrink: 0 }}>
            {s.label}
          </label>
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={s.val}
            onChange={(e) => s.set(+e.target.value)}
            style={{ flex: 1, accentColor: G }}
          />
          <span style={{ fontSize: 12, fontWeight: 700, minWidth: 80, textAlign: "right" }}>
            {s.disp}
          </span>
        </div>
      ))}
      <div style={{
        marginTop: 16,
        padding: "14px 16px",
        borderRadius: 8,
        background: isTarget ? GL : "#f0f0f0",
        border: `1px solid ${isTarget ? G : "#e5e7eb"}`,
      }}>
        {isTarget ? (
          <>
            <p style={{ fontSize: 14, fontWeight: 700, color: GD, margin: "0 0 6px" }}>
              검사 의무 대상이에요
            </p>
            <p style={{ fontSize: 13, color: GD, margin: "0 0 4px" }}>
              {area >= 5000 && "연면적 5,000㎡ 이상 "}
              {units >= 100 && "100세대 이상"}
            </p>
            <p style={{ fontSize: 13, color: GD, margin: 0 }}>
              최초 정기검사 기한: {year}년 ~ {dueYear}년
              {overdue && (
                <strong style={{ color: "#DC2626" }}> (기한 초과. 빨리 신청하세요)</strong>
              )}
              {dueNow && (
                <strong style={{ color: "#f59e0b" }}> (올해 검사 필요해요)</strong>
              )}
              {!overdue && !dueNow && (
                <strong style={{ color: G }}> ({dueYear}년 이전 검사 필요)</strong>
              )}
            </p>
          </>
        ) : (
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
            연면적 5,000㎡ 미만, 100세대 미만으로 수도법상 정기검사 의무 대상이 아니에요.
          </p>
        )}
      </div>
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
        이 글은 2026년 3월 기준 수도법 등 법령을 바탕으로 작성됐어요. 검사 세부 기준은 관할 지자체에서 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          건물 관리 관련 글
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

export default function WaterPipeInspectionPage() {
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
          수도법 · 급수설비 · 건물 관리
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          건물 급수관 검사 시기 |<br />
          준공 후 정기검사 언제 해야 하나요
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          건물 관리 중에 급수관 검사 얘기를 들었는데 우리 건물이 대상인지 몰라 막막하셨죠.<br />
          <strong>연면적 5,000㎡ 이상이거나 100세대 이상이면 사용개시 후 3년 이내에 첫 정기검사를 받아야 해요.</strong><br /><br />
          놓치면 300만원 이하 과태료가 붙어요. 아래에서 우리 건물 검사 시기를 바로 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>우리 건물 검사 시기, 직접 계산해보세요</H2>
        <p style={body}>
          연면적·세대수·사용개시 연도를 입력하면 의무 대상 여부와 검사 기한이 바로 나와요.<br />
          기한이 지났다면 빨리 신청해야 해요.
        </p>
        <Bdg>연면적·세대수·사용개시 연도 입력</Bdg>
        <CheckSchedule />
        <GreenBox title="이것만 기억해요">
          연면적 5,000㎡ 이상 또는 100세대 이상 → 의무 대상<br />
          사용개시일로부터 3년 이내 최초 검사, 이후 3년마다<br />
          미실시 시 300만원 이하 과태료 (수도법 §84)
        </GreenBox>

        <Divider />

        <H2>정기검사를 놓쳤다면 어떻게 해야 하나요?</H2>
        <p style={body}>
          검사 시기를 놓쳤더라도 적발 전에 자진 신청하면 과태료를 줄이거나 피할 수 있어요.<br />
          아래 순서로 진행하세요.
        </p>
        <div style={{ margin: "12px 0 1.2rem" }}>
          {[
            {
              step: "관할 지자체 상수도 담당 부서에 문의",
              desc: "시·군·구청 상수도 담당 부서 또는 지역 상수도사업소에 연락해요.",
            },
            {
              step: "지정 검사기관 확인",
              desc: "지자체가 지정한 검사기관 목록을 확인하고 검사를 신청해요.",
            },
            {
              step: "검사 실시 후 결과 제출",
              desc: "수질·시설 검사를 받고 결과보고서를 지자체에 제출해요.",
            },
          ].map((item, i) => (
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
        <WarnBox title="검사 항목 불합격 시 개선 후 재검사">
          수질 기준 초과나 시설 불량으로 불합격하면 개선 조치 후 재검사를 받아야 해요. 잔류염소 부족(0.1mg/L 미만)이나 탁도 초과(0.5NTU 초과) 시 옥내급수관 상태를 점검하고 필요시 교체를 검토하세요.
        </WarnBox>

        <HubLinks />

        <Divider />

        <H2>어떤 항목을 검사하나요?</H2>
        <p style={body}>
          수질 기준을 충족하는지, 시설이 위생적으로 관리되는지 확인해요.<br />
          이 기준을 알아두면 검사 전 미리 점검할 수 있어요.
        </p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: GL }}>
                {["검사 항목", "기준"].map((h) => (
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
                ["잔류염소", "0.1mg/L 이상"],
                ["탁도",     "0.5NTU 이하"],
                ["pH",       "5.8~8.5"],
                ["대장균",   "불검출"],
                ["급수시설 위생 상태", "저수조 청소·관리 상태 확인"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "9px 10px", fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ padding: "9px 10px", color: "#374151" }}>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <GreenBox title="저수조 청소도 6개월마다 해야 해요">
          연면적 5,000㎡ 이상 건물의 저수조는 6개월에 1회 이상 청소해야 해요. 청소 결과를 기록하고 보관해야 해요. 급수관 검사와 별도로 관리해야 하는 항목이에요.
        </GreenBox>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "우리 건물은 어떻게 되나요?"로 가장 많이 물어보는 것들이에요. 급한 것부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            검사 신청은 관할 지자체 상수도 담당 부서로
          </p>
          <a
            href="https://www.me.go.kr"
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
            ↗ 환경부 상하수도 정책
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
          이 글은 2026년 3월 기준 수도법 등을 바탕으로 작성됐어요. 검사 세부 기준은 관할 지자체에서 확인하세요.
        </div>
      </div>
    </div>
  );
}
