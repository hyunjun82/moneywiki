"use client";

import { useState } from "react";

// Q1. 19~34세 청년이 서민금융 저금리 대출이 필요한 상황에 놓여있어요.
// Q2. 자격 확인 → 한도·금리 이해 → 신청 방법까지 한 번에 해결해야 해요.
// Q3. 대상 나이/소득/자격 조건/신청 절차/필요 서류/금리 정보/내부링크 포함
// Q4. 자격 체커 + FAQ + 신청 가이드 + CTA를 인터랙티브 형태로 구성

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" } as const;

// 헤더, 제목
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "2rem 0 14px", lineHeight: 1.5 }}>
      {children}
    </h2>
  );
}

function Bdg({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginRight: 8 }}>
      {children}
    </span>
  );
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

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}

// 자격 체커
function EligibilityChecker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setChecked((p: Record<string, boolean>) => ({ ...p, [id]: !p[id] }));

  const allPass =
    checked["age"] &&
    checked["income"] &&
    (checked["student"] || checked["jobseeker"] || checked["newgrad"] || checked["business"]);

  const someChecked = checked["age"] || checked["income"];

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label
          onClick={() => toggle("age")}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 8,
            cursor: "pointer",
            border: `1px solid ${checked["age"] ? G : "#e5e7eb"}`,
            background: checked["age"] ? GL : "#f9fafb",
          }}
        >
          <input type="checkbox" checked={!!checked["age"]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
          <span style={{ fontSize: 13, lineHeight: 1.6 }}>만 19~34세예요</span>
        </label>

        <label
          onClick={() => toggle("income")}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 8,
            cursor: "pointer",
            border: `1px solid ${checked["income"] ? G : "#e5e7eb"}`,
            background: checked["income"] ? GL : "#f9fafb",
          }}
        >
          <input type="checkbox" checked={!!checked["income"]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
          <span style={{ fontSize: 13, lineHeight: 1.6 }}>연소득 3,500만원 이하예요</span>
        </label>

        {[
          { id: "student", label: "대학생 또는 휴학 중이에요" },
          { id: "jobseeker", label: "취업준비생이에요" },
          { id: "newgrad", label: "사회초년생 (직장 1년 미만)이에요" },
          { id: "business", label: "청년사업자예요" },
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
              marginLeft: 0,
            }}
          >
            <input type="checkbox" checked={!!checked[item.id]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>{item.label}</span>
          </label>
        ))}
      </div>

      {allPass && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          <strong>자격 충족해요!</strong> 아래 신청 방법을 보고 서민금융 잇다 앱 또는 1397에서 신청하면 돼요.
        </div>
      )}

      {!allPass && someChecked && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
          위 조건이 불명확하다면 1397로 전화해서 물어봐도 돼요. 무료 상담 가능해요.
        </div>
      )}
    </div>
  );
}

// 신청 절차
function ProcessSteps() {
  const STEPS = [
    {
      title: "서민금융 잇다 앱 설치 또는 1397 전화",
      desc: "서민금융진흥원에서 운영하는 '서민금융 잇다' 앱을 다운로드하거나, 1397에 전화하면 된답니다. 무료 상담으로 자격 여부 확인 가능해요.",
      link: { label: "서민금융 잇다 앱", url: "https://www.kinfa.or.kr" },
    },
    {
      title: "필요 서류 준비",
      desc: "신분증, 통장 사본, 소득 증빙 서류(재학증명서/급여명세서/사업자등록증 등) 등을 준비하면 돼요. 앱에서 정확한 서류 목록을 안내해줘요.",
    },
    {
      title: "온라인 신청 또는 대출 은행 방문",
      desc: "앱으로 신청하면 해당 은행으로 안내받아요. 은행 지점 방문 또는 온라인 채널로 진행할 수 있어요. 1397로 신청했다면 연결된 은행에 연락하면 돼요.",
    },
    {
      title: "심사 및 승인",
      desc: "신용도, 상환 능력, 소득 등을 심사해요. 보통 2~3일 내에 결과가 나와요. 승인 후 계약 진행하고 대출금을 받으면 완료예요.",
    },
  ];

  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < STEPS.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />
          )}
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              flexShrink: 0,
              background: GL,
              color: "#0F6E56",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
            {s.link && (
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <a
                  href={s.link.url}
                  style={{
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: GL,
                    color: "#0F6E56",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  바로가기
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// FAQ
function FAQ() {
  const FAQS = [
    {
      tag: "필수",
      q: "햇살론유스와 일반 햇살론의 차이가 뭔가요?",
      a: "햇살론유스는 만 19~34세 청년 대상이에요. 일반 햇살론은 만 35세 이상이에요. 둘 다 저금리 서민금융 상품이지만, 대상층이 다르답니다. 자세한 내용은 하단 관련 글을 참고하세요.",
    },
    {
      tag: null,
      q: "신용점수가 낮아도 신청할 수 있나요?",
      a: "네, 가능해요. 햇살론유스는 신용점수 요구 기준이 없어서 신용 불량자도 신청 가능해요. 대신 상환 능력이 있어야 해요. 신용점수 개선 방법은 관련 글을 참고하세요.",
    },
    {
      tag: null,
      q: "한도가 1,200만원인데 꼭 다 받아야 하나요?",
      a: "아니에요. 본인이 필요한 금액만 신청해도 돼요. 예를 들어 300만원만 필요하다면 300만원만 신청하면 되고, 심사 후 승인 여부가 결정돼요.",
    },
    {
      tag: null,
      q: "금리가 몇 퍼센트인가요? 추가 수수료는 없나요?",
      a: "기본 금리는 연 5.0% 내외예요. 사회적 배려 대상자(차상위 계층, 차인 농·어민 등)는 연 2.0%까지 낮아질 수 있어요. 중도상환수수료 같은 추가 수수료는 없어요.",
    },
    {
      tag: null,
      q: "대학생인데 소득 증빙을 못 하면 어떻게 하나요?",
      a: "대학생이라면 재학증명서로 신청할 수 있어요. 소득 증빙이 없어도 대학생 신분으로 자격 요건 충족해요. 부모님 소득이나 본인 아르바이트 수입이 있다면 증빙하면 한도가 조정될 수 있어요.",
    },
    {
      tag: null,
      q: "대출 후 갈아탈 수 있나요?",
      a: "네, 가능해요. 더 나은 금리나 조건의 대출이 생기면 갈아탈 수 있어요. 다만 중도상환에 따른 이자 계산과 새 대출의 승인 절차가 필요해요. 자세한 내용은 관련 글을 참고하세요.",
    },
    {
      tag: null,
      q: "연 5% 금리는 높은 건가요?",
      a: "서민금융 상품 중에서는 낮은 편이에요. 신용점수가 낮으면 일반 은행 대출은 8~15% 이상 금리가 나와요. 그래서 햇살론유스 5% 금리는 청년 서민에게는 매우 유리한 조건이에요.",
    },
    {
      tag: null,
      q: "신청 후 얼마나 빨리 돈을 받을 수 있나요?",
      a: "보통 신청 후 2~3일이면 심사가 끝나요. 승인되면 1~2일 내에 대출금이 계좌로 입금돼요. 은행에 따라 조금 다를 수 있으니 신청 시 확인하면 좋아요.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.tag ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              padding: "12px 16px",
              fontSize: 14,
              fontWeight: f.tag ? 600 : 500,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: open === i ? "#f9fafb" : f.tag ? "#FFF7ED" : "#fff",
            }}
          >
            <span>
              {f.tag && (
                <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>
                  {f.tag}
                </span>
              )}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>
              ▼
            </span>
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

// CTA
function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>지금 바로 신청할 수 있어요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        생각보다 간단해요.<br />최저 2%까지 낮출 수 있어요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        서민금융 잇다 앱이나 1397로 지금 바로 신청하면 돼요. <br />
        무료 상담으로 자격 여부 먼저 확인해봐요.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400, margin: "0 auto" }}>
        <a
          href="https://www.kinfa.or.kr"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: G,
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            padding: "11px 14px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          서민금융진흥원 방문
        </a>
        <a
          href="tel:1397"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: "#fff",
            color: G,
            fontWeight: 700,
            fontSize: 13,
            padding: "11px 16px",
            borderRadius: 8,
            textDecoration: "none",
            border: `1.5px solid ${G}`,
          }}
        >
          1397 전화하기
        </a>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 16, lineHeight: 1.7 }}>
        무료 상담이에요. 신청 전에 자격 여부 먼저 물어봐도 괜찮아요.
      </p>
    </div>
  );
}

// Sidebar
function Sidebar() {
  const SIDEBAR_LINKS = [
    { label: "햇살론 일반보증·특례보증 금리 조건", href: "/w/햇살론-일반보증-특례보증-금리-조건" },
    { label: "불법사금융예방대출 금리 신청방법", href: "/w/불법사금융예방대출-금리-신청방법" },
    { label: "대출과 신용점수의 관계", href: "/w/대출과-신용점수의-관계" },
    { label: "신용점수 올리는 방법", href: "/w/신용점수-올리는-방법" },
    { label: "대출 갈아타기 조건", href: "/w/대출-갈아타기-조건" },
    { label: "햇살론 신청 방법", href: "/w/햇살론-신청-방법" },
    { label: "직장 없이 대출받기", href: "/w/직장-없이-대출받기" },
    { label: "신용점수 낮아도 대출", href: "/w/신용점수-낮아도-대출" },
    { label: "청년 전세자금 대출", href: "/w/청년-전세자금-대출" },
    { label: "취업준비생 생활비 대출", href: "/w/취업준비생-생활비-대출" },
  ];

  return (
    <aside
      style={{
        position: "sticky",
        top: 60,
        width: 280,
        flexShrink: 0,
        fontSize: 13,
        color: "#6b7280",
      }}
    >
      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px", marginBottom: 20 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, color: "#111", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          관련 글
        </h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SIDEBAR_LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              style={{
                fontSize: 12,
                color: G,
                textDecoration: "none",
                lineHeight: 1.6,
                borderBottom: "1px solid #f3f4f6",
                paddingBottom: 8,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// References
function References() {
  const REFERENCES = [
    {
      category: "공식 사이트",
      items: [
        { label: "서민금융진흥원 공식 홈페이지", url: "https://www.kinfa.or.kr" },
        { label: "서민금융 잇다 앱 정보", url: "https://www.kinfa.or.kr/product" },
      ],
    },
    {
      category: "법령",
      items: [
        { label: "서민의 금융생활 지원에 관한 법률", url: "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=168348" },
      ],
    },
    {
      category: "금융 정보",
      items: [
        { label: "금융감독원 소비자 공시", url: "https://www.fsc.go.kr" },
      ],
    },
  ];

  return (
    <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.5rem", marginTop: "2rem" }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: "1rem" }}>출처</h3>
      {REFERENCES.map((ref, i) => (
        <div key={i} style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: 12, fontWeight: 600, color: GD, marginBottom: 8 }}>{ref.category}</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {ref.items.map((item, j) => (
              <li key={j} style={{ marginBottom: 6 }}>
                <a href={item.url} style={{ fontSize: 12, color: G, textDecoration: "none", borderBottom: "1px solid #e5e7eb", paddingBottom: 2 }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// 메인 페이지
export default function Page() {
  return (
    <article style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 히어로 섹션 */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ marginBottom: 12 }}>
              <Bdg>만 19~34세</Bdg>
              <Bdg>연소득 3,500만원 이하</Bdg>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#111", lineHeight: 1.4, marginBottom: 12 }}>
              햇살론유스
            </h1>
            <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.6, marginBottom: 20 }}>
              청년을 위한 저금리 서민금융. 최저 연 2% ~ 최고 5%대까지. 신용 불량이어도 신청 가능해요.
            </p>
            <p style={body}>
              대학생, 취업준비생, 사회초년생, 청년사업자 대상으로 서민금융진흥원이 제공하는 서민 대출이에요. 신용점수가 낮아도 신청할 수 있고, 한도는 최대 1,200만원, 금리는 연 5.0% 내외라서 다른 서민금융 상품에 비해 조건이 좋은 편이에요.
            </p>
          </div>

          {/* 자격 체크 */}
          <GreenBox title="자격이 있는지 먼저 확인해봐요">
            <EligibilityChecker />
          </GreenBox>

          <Divider />

          {/* H2: 대상자 및 조건 */}
          <H2>대상자 및 조건</H2>
          <p style={body}>
            햇살론유스는 만 19세 이상 34세 이하의 청년을 대상이에요. 단순히 나이만 맞으면 되는 게 아니라, 연소득이 3,500만원 이하이고 특정 신분 중 하나여야 해요.
          </p>

          <BorderBox title="자격 조건">
            <p style={{ ...body, marginBottom: 12 }}>
              <strong>기본 조건:</strong>
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem" }}>
              <li style={{ fontSize: 14, color: "#374151", lineHeight: 2, paddingLeft: 20, marginBottom: 8 }}>
                • 만 19세 이상 34세 이하
              </li>
              <li style={{ fontSize: 14, color: "#374151", lineHeight: 2, paddingLeft: 20, marginBottom: 8 }}>
                • 연소득 3,500만원 이하
              </li>
            </ul>

            <p style={{ ...body, marginBottom: 12 }}>
              <strong>신분 조건 (다음 중 하나):</strong>
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ fontSize: 14, color: "#374151", lineHeight: 2, paddingLeft: 20, marginBottom: 8 }}>
                • 대학생 (졸업 예정, 휴학 중 포함)
              </li>
              <li style={{ fontSize: 14, color: "#374151", lineHeight: 2, paddingLeft: 20, marginBottom: 8 }}>
                • 취업준비생
              </li>
              <li style={{ fontSize: 14, color: "#374151", lineHeight: 2, paddingLeft: 20, marginBottom: 8 }}>
                • 사회초년생 (직장 입직 1년 미만)
              </li>
              <li style={{ fontSize: 14, color: "#374151", lineHeight: 2, paddingLeft: 20 }}>
                • 청년사업자 (2년 미만의 신규 사업자)
              </li>
            </ul>
          </BorderBox>

          <p style={body}>
            예를 들어 22세 대학생이고 아르바이트 수입이 연 1,500만원이라면? 완벽하게 자격 충족해요. 또는 32세 회사원인데 1년 전에 입직했다면 사회초년생으로 신청 가능해요.
          </p>

          <Divider />

          {/* H2: 한도와 금리 */}
          <H2>한도와 금리</H2>
          <p style={body}>
            햇살론유스의 한도와 금리는 신분과 상황에 따라 조정돼요. 한도는 최대 1,200만원인데, 1회만 신청할 수 있다는 점이 중요해요.
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              margin: "1rem 0 1.5rem",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#111", borderBottom: "1px solid #e5e7eb" }}>
                  항목
                </th>
                <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#111", borderBottom: "1px solid #e5e7eb" }}>
                  내용
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #f3f4f6", fontWeight: 600, color: "#111" }}>최대 한도</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #f3f4f6", color: "#374151" }}>1,200만원</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #f3f4f6", fontWeight: 600, color: "#111" }}>신청 횟수</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #f3f4f6", color: "#374151" }}>1회 한정</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #f3f4f6", fontWeight: 600, color: "#111" }}>기본 금리</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #f3f4f6", color: "#374151" }}>연 5.0% 내외</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#111" }}>저금리 (배려 대상)</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>연 2.0% ~ 4.0%</td>
              </tr>
            </tbody>
          </table>

          <GreenBox title="금리가 낮아질 수 있어요">
            기본 금리 5.0%는 상환 능력이 있고 신용도가 중간 이상일 때예요. 차상위 계층, 차인 농·어민, 사회적 취약계층 같은 사회적 배려 대상자라면 최저 연 2.0%까지 대폭 낮아질 수 있어요. 1397에 전화해서 본인이 배려 대상에 해당하는지 물어봐도 돼요.
          </GreenBox>

          <Divider />

          {/* H2: 신청 방법 */}
          <H2>신청 방법</H2>
          <p style={body}>
            햇살론유스는 서민금융진흥원에서 관리하는 상품이에요. 앱으로 신청하거나 전화로 신청할 수 있고, 신청 후 해당 은행에서 심사를 진행해요.
          </p>

          <ProcessSteps />

          <Divider />

          {/* H2: FAQ */}
          <H2>자주 묻는 질문</H2>
          <p style={body}>
            햇살론유스에 대해 자주 나오는 질문들을 정리했어요.
          </p>
          <FAQ />

          <Divider />

          {/* References & CTA */}
          <References />
          <CTA />
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </article>
  );
}
