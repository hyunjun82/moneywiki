"use client";
import { useState } from "react";

// ─── 2026년 기준 (서민금융진흥원)
// 햇살론 대환대출 용도: 기존 고금리 대출(연 20% 이상 또는 대부업·불법사금융) 상환 목적
// 일반보증 대환: 연소득 3,500만원 이하(신용무관) 또는 4,500만원 이하+하위 20%, 한도 2,000만원, 금리 10% 이내
// 특례보증 대환: 연소득 3,500만원 이하+하위 20%, 한도 1,000만원, 금리 12.5%(사회배려 9.9%)
// 대환 요건: 대환 대상 대출이 존재해야 함 (기존 고금리 대출)
// 신청: 서민금융진흥원 앱 또는 1397, 협약은행 통해 실행
// 협약은행: 광주, 기업, 신한, 전북, 제주, 하나은행, 토스뱅크
// 대환 절차: 보증 승인 → 은행 대출 실행 → 기존 대출 직접 상환 (차주 본인이 상환)
// 주의: 대환 후 기존 대출 반드시 즉시 상환해야 함

const SIDEBAR_LINKS = [
  "햇살론 대환대출 조건",
  "고금리 대출 갈아타기",
  "햇살론 대환 신청 방법",
  "햇살론 대환 금리",
  "대부업 대출 갈아타기",
  "햇살론 일반보증 한도",
  "햇살론 특례보증 조건",
  "서민금융 대환 절차",
  "햇살론 부결 사유",
  "햇살론유스 자격 조건",
  "햇살론 보증료 계산",
  "신용회복위원회 채무조정",
  "소액생계비 대출",
  "서민금융콜센터 1397",
  "대출 이자 절감 방법",
  "저신용자 대출 상품",
  "신용점수 올리는 법",
  "서민금융진흥원 앱",
  "햇살론 연체 해결",
  "다중채무자 지원",
];

const HUB_LINKS = [
  { title: "햇살론 부결 사유 | 재신청 가능한 타이밍과 해결 방법", desc: "부결 5가지 사유와 재신청 로드맵", href: "#" },
  { title: "햇살론유스 자격 조건 | 한도와 신청 방법 대학생·취준생 기준", desc: "만 19~34세, 최대 1,200만원, 평생 1회", href: "#" },
  { title: "햇살론 보증료 계산 방법 | 면제 조건과 감면 받는 방법", desc: "사회적 배려 대상자 보증료 0.1%p 인하", href: "#" },
];

const FAQS = [
  { urgent: true, q: "대부업 대출을 햇살론으로 갈아탈 수 있나요?", a: "네, 가능해요. 햇살론 대환대출의 핵심 목적이 대부업·불법사금융 고금리 대출을 제도권 저금리로 전환하는 거예요. 연소득 3,500만원 이하이면서 신용점수 하위 20%라면 특례보증으로 최대 1,000만원까지 갈아탈 수 있어요. 일반보증은 연소득 조건만 맞으면 신용점수 관계없이 신청 가능해요." },
  { urgent: true, q: "현재 연체 중인 대출을 대환할 수 있나요?", a: "연체 중인 상태에서는 대환 신청 자체가 어려워요. 먼저 연체를 해소하거나, 신용회복위원회(1600-5500)의 채무조정을 통해 상환 계획을 정상화한 뒤 신청하는 게 현실적이에요. 신용회복위원회 채무조정 후 9개월(9회) 이상 성실 상환 중이라면 햇살론 신청이 가능한 경우도 있어요." },
  { urgent: false, q: "대환 후 기존 대출은 어떻게 처리하나요?", a: "햇살론 대환대출이 실행되면 차주(본인)가 직접 기존 대출을 상환해야 해요. 은행에서 자동으로 갚아주는 구조가 아니에요. 대출금을 받은 즉시 기존 고금리 대출 기관에 연락해서 상환 처리하세요. 상환 확인서를 받아두는 것도 중요해요." },
  { urgent: false, q: "여러 개의 고금리 대출을 한꺼번에 대환할 수 있나요?", a: "한도 내에서 여러 대출을 합쳐서 대환하는 것도 가능해요. 다만 한도(최대 2,000만원)를 초과하면 일부만 대환돼요. 우선 이자율이 가장 높은 대출부터 대환하는 게 이자 절감에 유리해요." },
  { urgent: false, q: "대환대출이 되면 신용점수가 오르나요?", a: "즉시 오르지는 않지만, 고금리 대출을 상환하고 성실하게 새 대출을 갚으면 신용점수 개선에 도움이 돼요. 연체 없이 상환하는 것 자체가 신용점수 개선의 가장 확실한 방법이에요." },
  { urgent: false, q: "보증료가 따로 드나요?", a: "네, 보증료가 있어요. 대출금 × 보증료율 × 대출기간으로 계산하고 대출 실행 시 선납해요. 사회적 배려 대상자(기초생활수급자, 차상위계층 등)는 보증료가 인하돼요. 복지멤버십 가입이나 금융교육 이수 시 추가로 0.1%p 인하를 받을 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "서민금융진흥원 — 햇살론 대환 제도 안내", url: "https://www.kinfa.or.kr" },
    { label: "뱅크샐러드 — 2026년 개편 햇살론 일반보증·특례보증", url: "https://www.banksalad.com/articles/%EC%A0%80%EC%8B%A0%EC%9A%A9%EC%9E%90-%EB%8C%80%EC%B6%9C-%EC%B0%BE%EA%B3%A0-%EC%9E%88%EB%8A%94-%EB%8B%B9%EC%8B%A0%EC%9D%B4-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-%ED%96%87%EC%82%B4%EB%A1%A0-%EC%B4%9D%EC%A0%95%EB%A6%AC" },
    { label: "토스뱅크 — 햇살론일반·햇살론특례 2026", url: "https://www.tossbank.com/articles/sunloan2026" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function InstantAnswer() {
  return (
    <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 대환대출 즉시 확인</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { q: "어떤 대출을 갈아탈 수 있나요?", a: "연 20% 이상 고금리 대출, 대부업, 불법사금융 대출이 대상이에요. 제도권 은행 대출도 고금리라면 갈아탈 수 있어요." },
          { q: "얼마까지 갈아탈 수 있나요?", a: "일반보증 최대 2,000만원(금리 10% 이내), 특례보증 최대 1,000만원(금리 12.5%). 연소득·신용점수에 따라 실제 한도는 달라져요." },
          { q: "지금 당장 뭘 해야 하나요?", a: "서민금융진흥원 앱을 설치하고 내 조건(소득·신용점수)에 맞는 상품을 먼저 확인하세요. 모르겠으면 1397로 전화해서 내 상황을 말하면 맞는 상품을 안내해줘요." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{item.q}</p>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCompare() {
  const products = [
    { name: "일반보증", target: "연소득 3,500만원 이하\n(신용점수 무관)\nor 4,500만원 이하+하위 20%", limit: "최대 2,000만원", rate: "연 10% 이내", notes: "신용점수 상관없이 소득만 맞으면 신청 가능" },
    { name: "특례보증", target: "연소득 3,500만원 이하\n+신용점수 하위 20%", limit: "최대 1,000만원", rate: "연 12.5%\n(사회배려 9.9%)", notes: "최저신용자·불법사금융 피해자 우선 지원" },
  ];
  return (
    <div style={{ display: "flex", gap: 12, margin: "12px 0 1.2rem", flexWrap: "wrap" }}>
      {products.map((p, i) => (
        <div key={i} style={{ flex: 1, minWidth: 220, border: `1px solid ${i === 0 ? G : "#FED7AA"}`, borderRadius: 10, padding: "14px 16px", background: i === 0 ? GL : "#FFF7ED" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: i === 0 ? GD : "#C2410C", margin: "0 0 10px" }}>{p.name}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[["대상", p.target], ["한도", p.limit], ["금리", p.rate], ["특징", p.notes]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", minWidth: 30 }}>{k}</span>
                <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-line" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function InterestCalc() {
  const [principal, setPrincipal] = useState(500);
  const [fromRate, setFromRate] = useState(25);
  const toRate = 10;
  const fromInterest = Math.round(principal * fromRate / 100);
  const toInterest = Math.round(principal * toRate / 100);
  const saved = fromInterest - toInterest;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "12px 0 1.2rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 14 }}>연간 이자 절감액 계산</p>
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: "#374151", marginBottom: 4 }}>대출 잔액</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="range" min={100} max={2000} step={100} value={principal}
            onChange={e => setPrincipal(Number(e.target.value))}
            style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: G, minWidth: 55 }}>{principal}만원</span>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, color: "#374151", marginBottom: 4 }}>현재 금리 (연 %)</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="range" min={10} max={40} step={1} value={fromRate}
            onChange={e => setFromRate(Number(e.target.value))}
            style={{ flex: 1, accentColor: "#DC2626" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#DC2626", minWidth: 40 }}>{fromRate}%</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, padding: "10px 14px", borderRadius: 8, background: "#FEF2F2", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>현재 연간 이자</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#DC2626", margin: 0 }}>{fromInterest.toLocaleString()}만원</p>
        </div>
        <div style={{ flex: 1, padding: "10px 14px", borderRadius: 8, background: GL, textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>대환 후 연간 이자 (10%)</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: GD, margin: 0 }}>{toInterest.toLocaleString()}만원</p>
        </div>
        <div style={{ flex: 1, padding: "10px 14px", borderRadius: 8, background: "#fff", border: `2px solid ${G}`, textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>연간 절감액</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: G, margin: 0 }}>+{saved.toLocaleString()}만원</p>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>※ 단리 기준 개략 계산. 실제 이자는 상환 방식에 따라 달라져요.</p>
    </div>
  );
}

function Steps() {
  const steps = [
    { title: "내 조건 확인", desc: "연소득, 신용점수 하위 20% 여부를 먼저 확인하세요. 서민금융진흥원 앱에서 사전 진단이 가능해요." },
    { title: "서민금융진흥원 앱에서 보증 신청", desc: "앱에서 대환 목적 신청을 선택하고, 기존 대출 정보와 서류를 제출해요. 신청 후 1~3영업일 내 심사 결과가 나와요.", link: { label: "서민금융진흥원 앱", url: "https://www.kinfa.or.kr" } },
    { title: "보증 승인 후 협약은행 선택", desc: "보증 승인 통지를 받으면 협약은행(광주, 기업, 신한, 전북, 제주, 하나은행, 토스뱅크) 중에서 대출 받을 곳을 선택해요. 금리·우대서비스를 비교해서 고르세요." },
    { title: "은행 대출 실행", desc: "선택한 협약은행에서 대출 계약을 체결하고 대출금을 받아요. 당일 또는 1~2영업일 내에 계좌로 입금돼요." },
    { title: "기존 고금리 대출 즉시 상환", desc: "대출금을 받은 즉시 기존 고금리 대출을 상환하세요. 은행이 자동으로 처리해주는 구조가 아니에요. 상환 후 확인서를 받아두세요." },
  ];
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{step.title}</p>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>{step.desc}</p>
            {step.link && <a href={step.link.url} style={{ display: "inline-block", marginTop: 4, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", border: `1px solid ${G}`, padding: "3px 10px", borderRadius: 20 }}>↗ {step.link.label}</a>}
          </div>
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
      {FAQS.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button onClick={() => toggle(i)} style={{ width: "100%", textAlign: "left", padding: "13px 4px", display: "flex", alignItems: "flex-start", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
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
        {HUB_LINKS.map((link, i) => (
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
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function HaetsalRefinancePage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>햇살론 · 대환대출 · 고금리 갈아타기</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          햇살론 대환대출 조건 |<br />
          고금리 대출 갈아타기 신청 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          대부업·카드론 같은 고금리 대출, 이자가 원금보다 많아질 것 같죠.<br />
          <strong>햇살론 대환대출로 연 20% 이상 고금리를 연 10% 이내로 낮출 수 있어요.</strong><br />
          조건은 연소득 3,500만원 이하면 신용점수 상관없이 신청 가능해요.
        </p>

        <InstantAnswer />

        <H2>햇살론 대환대출 조건과 일반보증 vs 특례보증</H2>
        <p style={body}>
          2026년부터 햇살론이 일반보증과 특례보증으로 개편됐어요.<br />
          두 상품 모두 대환 목적으로 사용 가능해요. 내 소득과 신용점수에 따라 해당 상품이 달라요.
        </p>
        <Bdg>상품 비교</Bdg>
        <ProductCompare />
        <GreenBox title="신용점수 하위 20% 기준">
          NICE 기준 749점 이하, KCB 기준 700점 이하예요.<br />
          내 신용점수가 이 이하라면 특례보증도 신청 가능해요. 두 상품 중 조건이 맞는 쪽으로 신청하면 돼요.
        </GreenBox>

        <Divider />

        <H2>고금리 대출 갈아타기 이자 절감 계산</H2>
        <p style={body}>
          내 대출 잔액과 현재 금리를 입력하면 대환 후 연간 이자 절감액을 확인할 수 있어요.<br />
          금리 차이가 클수록 절감 효과가 커요.
        </p>
        <Bdg>이자 절감 계산기</Bdg>
        <InterestCalc />
        <p style={body}>
          이자 절감액을 확인했으면 아래 신청 절차를 따라 진행하면 돼요.
        </p>

        <Divider />

        <H2>햇살론 대환대출 신청 방법과 절차</H2>
        <p style={body}>
          전부 비대면으로 가능해요. 서민금융진흥원 앱에서 보증 신청 후 협약은행에서 대출을 실행하는 구조예요.<br />
          대출금이 입금되면 바로 기존 대출을 상환해야 해요. 이 단계를 놓치면 안 돼요.
        </p>
        <Bdg>신청 절차</Bdg>
        <Steps />
        <BorderBox title="필요 서류">
          신분증 사본<br />
          소득 증빙 서류 (근로소득자: 원천징수영수증, 사업소득자: 소득금액증명원)<br />
          기존 대출 잔액 증명 서류 (대환 대상 대출의 잔액 확인서)
        </BorderBox>

        <HubLinks />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          대부업 대출 갈아타기 가능한지, 연체 중인 대출도 대환할 수 있는지, 실제로 많이 막히는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지금 바로 내 조건 확인하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            서민금융진흥원 앱에서 사전 진단 후 신청 가능해요.<br />
            모르겠으면 1397로 전화해서 내 상황을 말하면 맞는 방법을 안내해줘요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.kinfa.or.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 서민금융진흥원</a>
            <a href="tel:1397" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 서민금융콜센터 1397</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요. 금융상품 조건은 금융기관별·시기별로 달라질 수 있어요. 구체적인 상황은 서민금융콜센터(1397)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
