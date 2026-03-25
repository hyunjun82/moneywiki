"use client";
import { useState } from "react";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
// → 신용점수 낮거나 소득 기준 맞는 저신용자/저소득층이 서민금융상품들이 헷갈려서 비교하고 싶어함

// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
// → 자신의 신용등급/소득/나이별로 신청 가능한 상품 찾기, 금리·한도·조건 비교, 신청처 결정하기

// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
// → 햇살론(일반/특례/유스/카드), 새희망홀씨, 미소금융, 불법사금융예방대출의 대상·한도·금리·보증비율 및 신청 자격

// Q4. 이 정보를 가장 잘 전달하는 형태는?
// → 비교표(DocTable), 상품 선택 체커(EligibilityChecker), 각 상품 상세 섹션(H2), FAQ, 신청 프로세스(ProcessSteps)

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}

function H2({ children }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
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

// 상품별 데이터
const PRODUCTS = [
  {
    name: "햇살론 일반보증",
    target: "연소득 3,500만원 이하, 신용등급 제한 없음",
    limit: "최대 1,500만원",
    rate: "연 5~8%",
    guarantee: "보증비율 80%",
    apply: "은행 / 서민금융진흥원",
  },
  {
    name: "햇살론 특례보증",
    target: "신용등급 하위 20% (신용점수 낮은 사람)",
    limit: "최대 1,000만원",
    rate: "연 10.9~12.9%",
    guarantee: "보증비율 90%",
    apply: "은행 / 서민금융진흥원",
  },
  {
    name: "햇살론유스",
    target: "만 19~34세, 신용등급 제한 없음",
    limit: "최대 1,200만원",
    rate: "연 5% 이내",
    guarantee: "보증비율 80%",
    apply: "은행 / 서민금융진흥원",
  },
  {
    name: "햇살론카드",
    target: "연소득 3,500만원 이하",
    limit: "최대 500만원",
    rate: "연 5~8%",
    guarantee: "신용카드 형태",
    apply: "참여 은행",
  },
  {
    name: "새희망홀씨",
    target: "연소득 3,500만원 이하, 기존 높은 금리 대출자",
    limit: "최대 3,000만원",
    rate: "은행별 상이 (일반적으로 연 5~10%)",
    guarantee: "대출상품",
    apply: "여수신은행",
  },
  {
    name: "미소금융",
    target: "소득이 낮거나 신용점수 낮은 사람, 창업자",
    limit: "최대 2,000만원",
    rate: "연 2~4.5%",
    guarantee: "보증비율 90~100%",
    apply: "미소금융재단 / 취급기관",
  },
  {
    name: "불법사금융예방대출",
    target: "고금리(월 10% 이상) 사금융 차용자",
    limit: "최대 100만원",
    rate: "연 9% (고정)",
    guarantee: "직접대출",
    apply: "금융감독원 / 참여은행",
  },
];

// 상품 비교 테이블
function ProductComparisonTable() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            {["상품명", "대상", "한도", "금리", "보증", "신청처"].map((h) => (
              <th key={h} style={{ padding: "10px 8px", textAlign: "left", fontWeight: 600, color: "#6b7280", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PRODUCTS.map((p, i) => (
            <tr key={i}>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f4f6", fontWeight: 600, color: "#111" }}>{p.name}</td>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f4f6", fontSize: 11, color: "#6b7280" }}>{p.target}</td>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f4f6", fontSize: 11, color: "#111" }}>{p.limit}</td>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f4f6", fontSize: 11, color: "#111", fontWeight: 600 }}>{p.rate}</td>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f4f6", fontSize: 11, color: "#6b7280" }}>{p.guarantee}</td>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f4f6", fontSize: 11, color: "#6b7280" }}>{p.apply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 상품 선택 가이드 (EligibilityChecker 스타일)
function ProductFinder() {
  const [situation, setSituation] = useState(null);

  const guides = {
    young: {
      title: "20대~30대 초반이신가요?",
      recommendation: "햇살론유스를 강력 추천해요. 같은 조건에서 가장 낮은 금리(연 5% 이내)를 받을 수 있어요.",
      products: ["햇살론유스", "새희망홀씨"],
    },
    lowCredit: {
      title: "신용등급이 낮으신가요?",
      recommendation: "햇살론 특례보증 또는 미소금융을 확인해보세요. 신용등급이 낮아도 신청 가능해요.",
      products: ["햇살론 특례보증", "미소금융"],
    },
    highRate: {
      title: "높은 금리로 돈을 빌린 상태인가요?",
      recommendation: "새희망홀씨로 갈아타기가 유리해요. 기존 고금리 대출을 낮은 금리로 전환할 수 있어요.",
      products: ["새희망홀씨", "미소금융"],
    },
    illegal: {
      title: "불법 사금융(사채, 월 10% 이상)을 쓰셨나요?",
      recommendation: "불법사금융예방대출로 빠져나올 수 있어요. 직접대출이라 심사가 빨라요.",
      products: ["불법사금융예방대출"],
    },
    startUp: {
      title: "자영업이나 창업을 하신가요?",
      recommendation: "미소금융(창업자 전용)을 먼저 확인해보세요. 저금리에 창업 자금을 지원해요.",
      products: ["미소금융"],
    },
  };

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "young", label: "👤 만 19~34세다" },
          { id: "lowCredit", label: "📉 신용등급이 낮다" },
          { id: "highRate", label: "📊 지금 받은 대출 금리가 높다 (갈아타고 싶다)" },
          { id: "illegal", label: "⚠️ 불법 사금융(사채)을 사용했다" },
          { id: "startUp", label: "🏪 자영업/창업 중이다" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSituation(situation === item.id ? null : item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 8,
              border: `1px solid ${situation === item.id ? G : "#e5e7eb"}`,
              background: situation === item.id ? GL : "#fff",
              fontSize: 13,
              color: "#374151",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span style={{ color: G, flexShrink: 0 }}>→</span>
            {item.label}
          </button>
        ))}
      </div>

      {situation && guides[situation] && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          <strong style={{ display: "block", marginBottom: 6 }}>{guides[situation].title}</strong>
          {guides[situation].recommendation}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${G}40` }}>
            <p style={{ fontSize: 11, color: "#0F6E56", margin: "5px 0", fontWeight: 600 }}>추천 상품:</p>
            {guides[situation].products.map((prod, idx) => (
              <div key={idx} style={{ fontSize: 12, color: "#0F6E56", marginLeft: 8 }}>• {prod}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 신청 프로세스
function ApplyProcess() {
  const steps = [
    {
      title: "상품 선택",
      desc: "위 비교표와 추천 가이드를 보고 자신에게 맞는 상품을 선택해요.",
    },
    {
      title: "신청 자격 확인",
      desc: "금융기관별로 자격 요건이 달라요. 신청하기 전에 꼭 공식 사이트에서 확인하세요.",
    },
    {
      title: "필요 서류 준비",
      desc: "신분증, 소득증명서류, 거주지 확인 서류 등. 상품별로 다르니 신청처에 먼저 물어보세요.",
    },
    {
      title: "온라인 또는 방문 신청",
      desc: "대부분 온라인으로 신청할 수 있어요. 급하면 지점에 직접 가서 상담받으세요.",
    },
    {
      title: "심사 및 승인",
      desc: "소득, 신용 등을 심사해요. 빠르면 3~5일, 늦으면 2주 정도 걸려요.",
    },
    {
      title: "계약 및 입금",
      desc: "최종 승인 후 계약서 작성하고 돈이 통장으로 입금돼요.",
    },
  ];

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
          </div>
        </div>
      ))}
    </div>
  );
}

// FAQ 섹션
function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "어떤 상품부터 신청해야 하나요?",
      a: "햇살론 일반보증 → 새희망홀씨 → 미소금융 순서로 신청하는 게 일반적이에요. 금리가 낮은 상품부터 시도해서 떨어지면 다음 상품을 신청하세요. 동시에 여러 곳 신청하면 신용점수가 떨어질 수 있으니 피하세요.",
    },
    {
      q: "신용점수 낮아도 정말 대출 가능한가요?",
      a: "네, 가능해요. 햇살론 특례보증이나 미소금융은 신용점수가 낮은 사람도 신청할 수 있도록 만들어졌어요. 단, 금리는 좀 높을 수 있어요.",
    },
    {
      q: "금리가 얼마나 차이 나나요?",
      a: "상황에 따라 많이 달라요. 햇살론유스(연 5%)와 햇살론 특례보증(연 10.9~12.9%)은 7% 이상 차이가 날 수 있어요. 미소금융(연 2~4.5%)이 가장 낮아요.",
    },
    {
      q: "한 번에 여러 상품 신청해도 되나요?",
      a: "피하는 게 좋아요. 신청할 때마다 신용조회가 들어가고, 많을수록 신용점수가 떨어져요. 한 곳 떨어진 후 1주일 기다렸다가 다음 곳에 신청하세요.",
    },
    {
      q: "승인까지 얼마나 걸려요?",
      a: "빠르면 3~5일, 보통 1~2주 정도 걸려요. 불법사금융예방대출은 빠르다는 평가가 있고, 미소금융은 좀 오래 걸릴 수 있어요.",
    },
  ];

  return (
    <div>
      {faqs.map((f, i) => (
        <div key={i} style={{ border: `1px solid #e5e7eb`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)} style={{
            padding: "12px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: open === i ? "#f9fafb" : "#fff",
          }}>
            <span>{f.q}</span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && (
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// References (출처)
function References() {
  const refs = [
    { category: "공식 기관", items: [
      { label: "서민금융진흥원 (햇살론 정보)", url: "https://www.kinfa.or.kr" },
      { label: "금융감독원 (서민금융 정보)", url: "https://www.fss.or.kr" },
      { label: "미소금융재단", url: "https://www.microfinance.or.kr" },
      { label: "정부24 (서민금융 민원)", url: "https://www.gov.kr" },
    ]},
    { category: "법령", items: [
      { label: "금융감독 규정", url: "https://www.fsc.go.kr" },
    ]},
  ];

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {refs.map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
              <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 공식 정보를 바탕으로 작성됐어요. 각 상품의 구체적인 조건은 금융기관별로 다를 수 있으니, 신청 전에 공식 사이트에서 최신 정보를 꼭 확인하세요.
      </p>
    </div>
  );
}

// CTA (행동 유도)
function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>지금 바로 시작하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>금리는 낮을수록 좋아요.<br />서민금융상품을 비교하고 신청하세요.</p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        상품별 조건이 다르니까, 꼭 공식 사이트에서 최신 정보를 확인하고 신청하세요.<br />
        불명확하면 서민금융진흥원(1397)이나 금융감독원에 물어보면 돼요.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400, margin: "0 auto" }}>
        <a href="https://www.kinfa.or.kr" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>
          🌐 서민금융진흥원 방문
        </a>
        <a href="tel:1397" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}`, whiteSpace: "nowrap" }}>
          📞 1397 (서민금융 콜센터)
        </a>
      </div>
    </div>
  );
}

// 사이드바
function Sidebar() {
  const links = [
    "햇살론 일반보증·특례보증 금리 조건",
    "불법사금융예방대출 금리 신청방법",
    "대출과 신용점수의 관계",
    "대출 갈아타기 조건 및 절차",
    "신용점수 올리는 방법",
    "연소득 3,500만원 기준이란",
    "보증비율과 수수료 차이",
    "미소금융 창업자 대출",
    "햇살론유스 신청 자격",
    "새희망홀씨 갈아타기",
  ];

  return (
    <div style={{
      width: 176, flexShrink: 0,
      position: "sticky", top: 24,
      alignSelf: "flex-start",
    }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          관련 글
        </p>
        {links.map((label, i) => (
          <a key={i} href="#" style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "6px 0",
            fontSize: 12, color: "#374151", textDecoration: "none",
            borderBottom: "1px solid #f0f0f0",
            lineHeight: 1.5,
          }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

// 메인 컴포넌트
export default function SMELoanComparisonPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>서민금융 · 저금리 대출 · 신용개선</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          서민금융 대출 종류 7가지, 한눈에 비교<br />
          내게 맞는 상품 찾기부터 신청까지
        </h1>
        <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
          신용등급 낮으면 대출받기 어렵다고 생각해요?<br />
          아니에요. 신용점수가 낮아도, 소득이 적어도 빌릴 수 있는 서민금융상품들이 있어요.<br /><br />
          햇살론, 새희망홀씨, 미소금융... 상품이 많아서 헷갈린다면, 지금 바로 비교해보세요.
        </p>

        <Divider />
        <H2>서민금융상품 7가지 한눈에 비교</H2>
        <p style={body}>
          아래는 서민금융진흥원과 금융감독원이 제공하는 서민금융상품들을 정리한 거예요.<br />
          각 상품마다 대상, 한도, 금리가 달라요. 자신의 신용등급·소득·나이에 맞는 상품을 찾아보세요.
        </p>
        <Bdg>상품별 조건 한눈에 보기</Bdg>
        <ProductComparisonTable />

        <GreenBox title="금리가 차이 나는 이유">
          같은 서민금융이어도 금리가 크게 달라요. 왜일까요?<br />
          - 신용등급이 낮을수록 금리가 높아져요 (위험도 높음)<br />
          - 한도가 높을수록 금리가 낮을 수 있어요<br />
          - 보증비율이 높을수록 대출받기 쉬워요 (금리는 높음)
        </GreenBox>

        <Divider />
        <H2>내게 맞는 상품 찾기</H2>
        <p style={body}>
          아래 상황에 맞는 버튼을 클릭하면, 추천 상품이 나타나요.<br />
          여러 개 클릭해도 상관없어요. 가장 조건 좋은 상품부터 시도해보세요.
        </p>
        <Bdg>나의 상황을 선택하세요</Bdg>
        <ProductFinder />

        <Divider />
        <H2>각 상품 상세 가이드</H2>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 10, color: "#111" }}>🎯 햇살론 일반보증 (가장 기본)</h3>
        <p style={body}>
          소득이 낮거나 신용등급 상관없이 받을 수 있는 기본 상품이에요.<br />
          연소득 3,500만원 이하면 신청 가능하고, 최대 1,500만원까지 빌릴 수 있어요.<br />
          금리는 연 5~8% 정도로 일반 대출보다는 낮아요.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 10, color: "#111" }}>⚠️ 햇살론 특례보증 (신용 낮은 사람)</h3>
        <p style={body}>
          신용등급이 하위 20%인 사람, 즉 신용점수가 정말 낮은 사람을 위한 상품이에요.<br />
          금리는 연 10.9~12.9%로 높지만, 신용등급 제약이 없어서 최후의 보루로 생각하면 돼요.<br />
          한도는 최대 1,000만원이에요.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 10, color: "#111" }}>💚 햇살론유스 (20대~30대 초반)</h3>
        <p style={body}>
          만 19~34세만 받을 수 있는 대출이에요. <a href="/w/햇살론-일반보증-특례보증-금리-조건" style={{ color: G, textDecoration: "none", fontWeight: 600 }}>햇살론 일반보증</a>보다 금리가 낮아요 (연 5% 이내).<br />
          나이만 맞으면 신용등급 제약 없이 신청할 수 있으니, 젊다면 꼭 노려봐야 할 상품이에요.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 10, color: "#111" }}>💳 햇살론카드 (계속 쓸 수 있어요)</h3>
        <p style={body}>
          최대 500만원을 신용카드 형태로 받는 거예요.<br />
          한 번 받은 후, 일부를 갚으면 다시 그만큼 쓸 수 있어요. 금리는 연 5~8%예요.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 10, color: "#111" }}>🔄 새희망홀씨 (갈아타기 목적)</h3>
        <p style={body}>
          지금 받은 대출의 금리가 높으면, 새희망홀씨로 낮은 금리로 갈아탈 수 있어요.<br />
          최대 3,000만원까지 가능하고, 금리는 은행별로 다르지만 보통 연 5~10% 정도예요.<br />
          갈아타기 목적이 아니어도 첫 대출로 받을 수 있어요.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 10, color: "#111" }}>⭐ 미소금융 (가장 낮은 금리)</h3>
        <p style={body}>
          서민금융 중 <strong>가장 낮은 금리</strong> (연 2~4.5%)를 받을 수 있어요.<br />
          신용점수가 낮거나, 소득이 없는 사람, 자영업자도 신청할 수 있어요.<br />
          최대 2,000만원까지 가능하고, 창업 자금으로도 쓸 수 있어요.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 10, color: "#111" }}>🚨 불법사금융예방대출 (최후의 보루)</h3>
        <p style={body}>
          사채(불법 사금융)에서 빠져나오기 위한 상품이에요.<br />
          월 10% 이상의 고금리 사채를 쓰고 있다면, 은행에서 직접 최대 100만원을 빌릴 수 있어요.<br />
          금리는 연 9% (고정)이고, <a href="/w/불법사금융예방대출-금리-신청방법" style={{ color: G, textDecoration: "none", fontWeight: 600 }}>신청 절차도 빠른 편</a>이에요.
        </p>

        <Divider />
        <H2>신청하기 전에 꼭 알아두세요</H2>
        <p style={body}>
          서민금융상품을 신청할 때 실수하면, 신용점수가 더 떨어질 수 있어요.<br />
          아래 팁을 참고해서 현명하게 신청하세요.
        </p>

        <BorderBox title="여러 곳에 동시 신청은 피하세요">
          한 곳 신청할 때마다 금융기관이 신용조회를 해요. 조회가 많을수록 신용점수가 떨어져요.<br />
          한 곳 떨어진 후 최소 1주일을 기다렸다가 다음 곳에 신청하는 게 좋아요.
        </BorderBox>

        <BorderBox title="신청 순서는 금리 낮은 것부터">
          금리 낮은 상품 → 중간 금리 → 높은 금리 순서로 신청하세요.<br />
          가장 조건 좋은 상품(예: 햇살론유스)부터 시도하고 떨어지면 다음 상품으로 가는 식이에요.
        </BorderBox>

        <BorderBox title="서류는 최신 것으로 준비하세요">
          소득증명서, 신분증 등 서류는 발급 후 3~6개월 이내가 기본이에요.<br />
          너무 오래된 서류는 심사에서 불리할 수 있어요.
        </BorderBox>

        <Divider />
        <H2>신청 절차 6단계</H2>
        <p style={body}>
          서민금융상품은 신청 방법이 상품마다 조금 다르지만, 기본 흐름은 비슷해요.<br />
          아래 단계를 따라 신청하면 돼요.
        </p>
        <Bdg>신청 순서</Bdg>
        <ApplyProcess />

        <Divider />
        <H2>자주 묻는 질문</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          실제로 많이 나오는 질문들을 정리했어요. 비슷한 상황이면 답변을 참고하세요.
        </p>
        <FAQ />

        <CTA />

        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 서민금융 정보 제공을 목적으로 작성됐어요. 각 상품의 자격, 금리, 한도는 금융기관 사정에 따라 언제든 바뀔 수 있어요. 신청 전에 꼭 공식 사이트(서민금융진흥원 1397, 금융감독원 등)에서 최신 정보를 확인하세요.
        </div>
      </div>
    </div>
  );
}
