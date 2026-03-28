"use client";
import { useState } from "react";

// ─── 2026년 기준 (서민금융진흥원)
// 보증료: 서민금융진흥원이 은행에 보증을 서주는 대가로 차주(대출자)가 내는 수수료
// 일반보증: 연 2.4~2.5% (보증원금=대출금의 90%에 적용, 대출 실행 시 선취)
// 특례보증: 연 5.4~5.5% (금리에 포함, 매월 원리금에 함께 납부)
// 햇살론유스: 일반 취업준비생·사회초년생 1.0%, 사회적 배려 대상자 0.1%
// 보증료 계산: 대출금 × 보증료율 × 대출기간(년)
// 감면 조건:
//   - 사회적 배려 대상자(기초수급자·차상위계층 등): 0.5%p 인하
//   - 금융교육·신용부채컨설팅 이수자, 국민취업지원제도 성공자, 복지멤버십 가입자: 0.1%p 인하
//   - 감면 중복 적용 불가
// 주의: 약정 후 보증료 인하 적용 불가 (신청 전 반드시 확인)
// 중도상환 시 잔여 기간 보증료 환급 (서민금융진흥원에 신청)

const SIDEBAR_LINKS = [
  "햇살론 보증료 계산",
  "햇살론 보증료 감면",
  "햇살론 보증료 면제",
  "햇살론 보증료 환급",
  "사회적 배려 대상자 보증료",
  "햇살론유스 보증료",
  "일반보증 보증료율",
  "특례보증 보증료율",
  "햇살론 실효 금리",
  "햇살론 보증료 중복 감면",
  "복지멤버십 보증료",
  "금융교육 보증료 인하",
  "햇살론 중도상환",
  "햇살론 부결 사유",
  "햇살론유스 자격 조건",
  "햇살론 대환대출",
  "서민금융진흥원 앱",
  "서민금융콜센터 1397",
  "사회적 배려 대상자 조건",
  "복지멤버십 가입 방법",
];

const HUB_LINKS = [
  { title: "햇살론유스 자격 조건 | 한도와 신청 방법 대학생·취준생 기준", desc: "유스 보증료: 일반 1.0%, 배려대상 0.1%", href: "#" },
  { title: "햇살론 부결 사유 | 재신청 가능한 타이밍과 해결 방법", desc: "부결 5가지 사유와 재신청 로드맵", href: "#" },
  { title: "햇살론 대환대출 조건 | 고금리 대출 갈아타기 신청 방법", desc: "고금리 대출을 연 10% 이내로 전환", href: "#" },
];

const FAQS = [
  { urgent: true, q: "보증료를 미리 내야 하나요?", a: "상품마다 달라요. 일반보증과 햇살론유스는 대출 실행 시 선취(먼저 납부)해요. 대출금을 받을 계좌에 보증료만큼 잔액이 있어야 해요. 특례보증은 금리에 포함돼 매월 원리금에 함께 납부돼요. 선취 방식이면 대출 신청 전에 계좌에 보증료 금액을 미리 입금해두세요." },
  { urgent: true, q: "보증료 감면은 언제 적용되나요?", a: "반드시 약정(대출 계약) 전에 적용해야 해요. 약정 후에는 소급 적용이 안 돼요. 금융교육을 이수했다면 이수 증빙을 대출 신청 전에 서민금융진흥원에 제출하세요. 사회적 배려 대상자도 신청 시에 증명 서류를 함께 제출해야 인하가 적용돼요." },
  { urgent: false, q: "중도 상환하면 보증료를 돌려받을 수 있나요?", a: "네, 환급받을 수 있어요. 조기 상환한 경우 남은 기간에 해당하는 보증료를 서민금융진흥원에 환급 신청하면 돼요. 중도상환수수료는 없어요. 여유가 생기면 빨리 갚을수록 보증료 환급액이 커져요." },
  { urgent: false, q: "사회적 배려 대상자가 되면 보증료가 얼마나 싸지나요?", a: "일반보증 기준 0.5%p 인하돼요. 예를 들어 보증료율이 2.5%라면 2.0%로 낮아져요. 햇살론유스는 기본 보증료 1.0%에서 0.1%로 대폭 낮아지고, 복권기금 이자지원까지 합쳐 연 2.0%로 쓸 수 있어요. 기초생활수급자, 차상위계층, 장애인, 한부모가족이 해당돼요." },
  { urgent: false, q: "금융교육 이수 감면과 사회적 배려 감면을 둘 다 받을 수 있나요?", a: "중복 적용이 안 돼요. 둘 중 더 유리한 쪽 하나만 적용돼요. 사회적 배려 대상자는 0.5%p 인하이고, 금융교육 이수는 0.1%p 인하이니 사회적 배려 대상자라면 그쪽이 훨씬 유리해요." },
  { urgent: false, q: "복지멤버십이 뭔가요?", a: "서민금융진흥원이 운영하는 금융복지 서비스예요. 가입하면 보증료 0.1%p 인하 혜택을 받을 수 있어요. 서민금융 잇다 앱이나 서민금융통합지원센터 방문으로 가입 가능해요. 가입 자체는 무료예요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "서민금융진흥원 — 햇살론 보증료 안내", url: "https://www.kinfa.or.kr" },
    { label: "토스뱅크 — 햇살론일반·특례 보증료 구조", url: "https://www.tossbank.com/articles/sunloan2026" },
    { label: "뱅크샐러드 — 2026년 개편 햇살론 총정리", url: "https://www.banksalad.com/articles/%EC%A0%80%EC%8B%A0%EC%9A%A9%EC%9E%90-%EB%8C%80%EC%B6%9C-%EC%B0%BE%EA%B3%A0-%EC%9E%88%EB%8A%94-%EB%8B%B9%EC%8B%A0%EC%9D%B4-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-%ED%96%87%EC%82%B4%EB%A1%A0-%EC%B4%9D%EC%A0%95%EB%A6%AC" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: any) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: any) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: any) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }: any) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function InstantAnswer() {
  return (
    <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 보증료 핵심 3가지</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { q: "보증료가 뭔가요?", a: "서민금융진흥원이 은행에 보증을 서주는 대가로 내는 수수료예요. 대출금리에 더해지는 추가 비용이에요. 실질 부담 금리 = 대출금리 + 보증료율로 계산해요." },
          { q: "감면받는 방법이 있나요?", a: "있어요. 사회적 배려 대상자(기초수급자·차상위 등)는 0.5%p, 금융교육 이수·복지멤버십 가입자는 0.1%p 인하돼요. 단, 약정 전에 신청해야 해요. 약정 후엔 소급 안 돼요." },
          { q: "중도 상환하면 보증료를 돌려받나요?", a: "네, 환급돼요. 남은 기간의 보증료를 서민금융진흥원에 신청하면 돌려받을 수 있어요." },
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

function RateTable() {
  const rows = [
    { product: "일반보증", rate: "연 2.4~2.5%", base: "대출금의 90% (보증원금)", method: "대출 실행 시 선취" },
    { product: "특례보증", rate: "연 5.4~5.5%", base: "대출금 기준 (금리에 포함)", method: "매월 원리금에 포함 납부" },
    { product: "햇살론유스 (일반)", rate: "연 1.0%", base: "대출금 기준", method: "대출 실행 시 선취" },
    { product: "햇살론유스 (사회배려)", rate: "연 0.1%", base: "대출금 기준", method: "대출 실행 시 선취" },
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: GL }}>
            {["상품", "보증료율", "계산 기준", "납부 방식"].map(h => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "#374151" }}>{r.product}</td>
              <td style={{ padding: "9px 10px", color: G, fontWeight: 700 }}>{r.rate}</td>
              <td style={{ padding: "9px 10px", color: "#374151" }}>{r.base}</td>
              <td style={{ padding: "9px 10px", color: "#374151" }}>{r.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Calculator() {
  const [loan, setLoan] = useState(1000);
  const [rateType, setRateType] = useState("general");
  const [years, setYears] = useState(3);
  const [discount, setDiscount] = useState("none");

  const baseRates = { general: 2.5, special: 5.5, youth: 1.0, youth_care: 0.1 };
  const discounts = { none: 0, care: 0.5, edu: 0.1 };

  const baseRate = baseRates[rateType];
  const disc = discounts[discount];
  const finalRate = Math.max(baseRate - disc, 0.1);

  // 일반보증은 대출금의 90%에 적용
  const principal = rateType === "general" ? loan * 0.9 : loan;
  const totalFee = Math.round(principal * (finalRate / 100) * years);
  const annualFee = Math.round(principal * (finalRate / 100));

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "12px 0 1.2rem" }}>
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: "#374151", marginBottom: 6, fontWeight: 700 }}>대출 금액</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="range" min={100} max={2000} step={100} value={loan}
            onChange={e => setLoan(Number(e.target.value))} style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: G, minWidth: 60 }}>{loan}만원</span>
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: "#374151", marginBottom: 6, fontWeight: 700 }}>상품 유형</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[{ id: "general", label: "일반보증 2.5%" }, { id: "special", label: "특례보증 5.5%" }, { id: "youth", label: "유스 일반 1.0%" }, { id: "youth_care", label: "유스 배려 0.1%" }].map(opt => (
            <button key={opt.id} onClick={() => setRateType(opt.id)}
              style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${rateType === opt.id ? G : "#e5e7eb"}`, background: rateType === opt.id ? GL : "#fff", color: rateType === opt.id ? GD : "#374151", fontSize: 12, fontWeight: rateType === opt.id ? 700 : 400, cursor: "pointer" }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: "#374151", marginBottom: 6, fontWeight: 700 }}>대출 기간</p>
        <div style={{ display: "flex", gap: 8 }}>
          {[1, 2, 3, 5, 7].map(y => (
            <button key={y} onClick={() => setYears(y)}
              style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${years === y ? G : "#e5e7eb"}`, background: years === y ? GL : "#fff", color: years === y ? GD : "#374151", fontSize: 12, fontWeight: years === y ? 700 : 400, cursor: "pointer" }}>
              {y}년
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, color: "#374151", marginBottom: 6, fontWeight: 700 }}>감면 조건</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[{ id: "none", label: "해당 없음" }, { id: "care", label: "사회적 배려 대상자 (-0.5%p)" }, { id: "edu", label: "금융교육·복지멤버십 (-0.1%p)" }].map(opt => (
            <button key={opt.id} onClick={() => setDiscount(opt.id)}
              style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${discount === opt.id ? G : "#e5e7eb"}`, background: discount === opt.id ? GL : "#fff", color: discount === opt.id ? GD : "#374151", fontSize: 12, fontWeight: discount === opt.id ? 700 : 400, cursor: "pointer" }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: "#374151" }}>적용 보증료율</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: G }}>{finalRate.toFixed(1)}%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: "#374151" }}>연간 보증료</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>약 {annualFee.toLocaleString()}만원</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#374151" }}>{years}년 총 보증료</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: G }}>약 {totalFee.toLocaleString()}만원</span>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6, lineHeight: 1.7 }}>
        ※ 일반보증은 대출금의 90%(보증원금)에 보증료율 적용. 실제 보증료는 금융기관 조건에 따라 다를 수 있어요.
      </p>
    </div>
  );
}

function DiscountTable() {
  const rows = [
    { condition: "사회적 배려 대상자", target: "기초생활수급자, 차상위계층, 장애인, 한부모가족 등", discount: "0.5%p 인하", note: "가장 큰 감면, 증명 서류 필요" },
    { condition: "금융교육·신용부채컨설팅 이수", target: "서민금융진흥원 금융교육 이수자", discount: "0.1%p 인하", note: "온라인 이수 가능" },
    { condition: "국민취업지원제도 성공자", target: "구직촉진수당 수급 후 취업 성공한 자", discount: "0.1%p 인하", note: "취업 확인서 제출" },
    { condition: "복지멤버십 가입", target: "서민금융진흥원 복지멤버십 가입자", discount: "0.1%p 인하", note: "앱 또는 방문으로 무료 가입" },
  ];
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f3f4f6", alignItems: "flex-start" }}>
          <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: i === 0 ? GL : "#f3f4f6", color: i === 0 ? GD : "#374151", flexShrink: 0, marginTop: 2 }}>{r.discount}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>{r.condition}</p>
            <p style={{ fontSize: 12, color: "#374151", margin: "0 0 2px" }}>{r.target}</p>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{r.note}</p>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 10, padding: "10px 14px", background: "#FFF7ED", borderRadius: 8, border: "1px solid #FED7AA" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#C2410C", margin: "0 0 4px" }}>⚠️ 중복 적용 불가</p>
        <p style={{ fontSize: 12, color: "#374151", margin: 0 }}>위 감면 조건 중 하나만 적용돼요. 가장 유리한 조건을 선택하세요. 사회적 배려 대상자라면 0.5%p 인하가 가장 유리해요.</p>
      </div>
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

export default function HaetsalFeeCalcPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>햇살론 · 보증료 · 감면</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          햇살론 보증료 계산 방법 |<br />
          면제 조건과 감면 받는 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          햇살론 금리 옆에 보증료라는 게 붙어있어요. 이게 뭔지, 얼마인지 모르면 실제 부담이 얼마인지 알 수 없어요.<br />
          <strong>보증료 = 서민금융진흥원이 보증 서주는 대가. 금리에 더해 내야 하는 추가 비용이에요.</strong><br />
          사회적 배려 대상자는 0.5%p, 금융교육 이수하면 0.1%p 인하되니 신청 전에 꼭 확인하세요.
        </p>

        <InstantAnswer />

        <H2>햇살론 보증료 계산 방법</H2>
        <p style={body}>
          보증료는 대출금 × 보증료율 × 대출기간(년)으로 계산해요.<br />
          일반보증은 대출금의 90%(보증원금)에 적용하고 선취(먼저 납부)해요. 대출 받기 전에 계좌에 금액이 있어야 해요.
        </p>
        <Bdg>상품별 보증료율</Bdg>
        <RateTable />
        <GreenBox title="실효 금리 계산 예시 (일반보증 1,000만원, 3년)">
          보증원금: 1,000만원 × 90% = 900만원<br />
          연간 보증료: 900만원 × 2.5% = 22.5만원<br />
          3년 총 보증료: 22.5만원 × 3 = 67.5만원<br />
          → 대출금리 10% + 보증료 2.25% = 실질 연 12.25% 수준
        </GreenBox>

        <Divider />

        <H2>보증료 감면 받는 방법</H2>
        <p style={body}>
          아래 조건 중 하나에 해당하면 보증료를 인하받을 수 있어요.<br />
          중요한 건 반드시 약정 전에 신청해야 해요. 약정 후에는 소급 적용이 안 돼요.
        </p>
        <Bdg>감면 조건별 인하율</Bdg>
        <DiscountTable />
        <BorderBox title="복지멤버십 가입으로 0.1%p 인하 받는 방법">
          서민금융 잇다 앱 → 복지멤버십 가입 (무료)<br />
          또는 서민금융통합지원센터 방문 가입<br />
          가입 후 보증 신청 시 자동 적용 → 대출금리에서 0.1%p 인하
        </BorderBox>

        <Divider />

        <H2>내 보증료 직접 계산해보기</H2>
        <p style={body}>
          상품 유형, 대출 금액, 기간, 감면 조건을 선택하면 예상 보증료가 나와요.<br />
          감면 조건이 있다면 선택해서 얼마나 달라지는지 비교해보세요.
        </p>
        <Bdg>보증료 계산기</Bdg>
        <Calculator />
        <p style={body}>
          계산 결과를 확인했으면, 감면 받을 수 있는 조건이 있는지 신청 전에 꼭 확인하세요. 약정 후엔 변경이 안 돼요.
        </p>

        <HubLinks />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          보증료를 언제 내야 하는지, 감면 적용은 언제 해야 하는지, 실제로 가장 많이 막히는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>신청 전에 보증료 감면 여부 확인하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            약정 후에는 소급 적용이 안 돼요. 신청 전에 1397로 전화해서 내가 감면 대상인지 먼저 확인하세요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.kinfa.or.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 서민금융진흥원</a>
            <a href="tel:1397" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 서민금융콜센터 1397</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요. 보증료율은 금융기관별·시기별로 달라질 수 있어요. 구체적인 상황은 서민금융콜센터(1397)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
