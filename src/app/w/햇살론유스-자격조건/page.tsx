"use client";
import { useState } from "react";

// ─── 2026년 기준 (서민금융진흥원)
// 햇살론유스: 만 19~34세, 연소득 3,500만원 이하 청년
// 취업준비생: 대학생·대학원생·미취업청년·학점은행제 수강자
// 사회초년생: 중소기업 1년 이하 재직자 (개인사업자 불가)
// 청년사업자: 창업 1년 이하 개인사업자 (미등록·휴폐업·공동사업자 제외)
// 한도: 평생 최대 1,200만원 (1회 부여, 상환 후 재신청 불가)
// 일반생활자금: 1회 300만원, 특정용도자금: 연간 900만원 (학업·취업준비비·의료비·주거비)
// 금리: 취업준비생·사회초년생 연 4.0% + 보증료 1.0% = 5.0%
// 사회적 배려 대상자: 연 1.9% + 보증료 0.1% = 2.0% (복권기금 이자지원 연 1.6%p 포함)
// 상환기간: 최대 8년 거치 + 7년 원금균등분할상환
// 금융교육 이수 필수 (6개월 이내 이수 기록)
// 신청: 서민금융진흥원 앱(서민금융 잇다)으로만 신청 가능
// 협약은행: 광주·기업·신한·전북·제주·하나은행·토스뱅크

const SIDEBAR_LINKS = [
  "햇살론유스 자격 조건",
  "햇살론유스 한도",
  "햇살론유스 신청 방법",
  "햇살론유스 대학생",
  "햇살론유스 취준생",
  "햇살론유스 무직자",
  "햇살론유스 사회초년생",
  "햇살론유스 금리",
  "햇살론유스 보증료",
  "햇살론유스 부결 사유",
  "햇살론유스 서류",
  "햇살론유스 재신청",
  "햇살론유스 주거비",
  "햇살론유스 생활비",
  "햇살론유스 의료비",
  "햇살론 대환대출",
  "서민금융진흥원 앱",
  "서민금융콜센터 1397",
  "청년 저금리 대출",
  "사회적 배려 대상자",
];

const HUB_LINKS = [
  { title: "햇살론 부결 사유 | 재신청 가능한 타이밍과 해결 방법", desc: "부결 5가지 사유와 재신청 로드맵", href: "#" },
  { title: "햇살론 대환대출 조건 | 고금리 대출 갈아타기 신청 방법", desc: "연 20% 이상 고금리 대출 갈아타기", href: "#" },
  { title: "햇살론 보증료 계산 방법 | 면제 조건과 감면 받는 방법", desc: "사회적 배려 대상자 연 2.0% 최저금리", href: "#" },
];

const FAQS = [
  { urgent: true, q: "소득이 없는 취준생도 받을 수 있나요?", a: "받을 수 있어요. 소득이 없어도 취업준비생(미취업청년)으로 신청 가능해요. 소득 0원이라도 부결 사유가 아니에요. 대신 자금 사용 계획서를 구체적으로 작성하는 게 중요해요. 어디에 얼마가 필요한지 명확하게 써야 심사를 통과할 수 있어요." },
  { urgent: true, q: "상환하면 다시 쓸 수 있나요?", a: "없어요. 햇살론유스는 평생 1회, 최대 1,200만원이 전부예요. 다 갚아도 한도가 복구되지 않아요. 지금 꼭 필요한 금액만 신청하는 게 중요해요. 급하지 않으면 나눠서 신청하는 전략도 있어요." },
  { urgent: false, q: "대학교 등록금도 지원되나요?", a: "등록금은 안 돼요. 특정용도자금(학업·취업준비비) 항목에 등록금은 제외돼요. 학원비, 자격시험 응시료(1과목), 교재비 등은 가능해요. 주거비(월세·보증금), 의료비(본인 병원비), 생활비는 각각 용도에 맞게 신청하면 돼요." },
  { urgent: false, q: "중소기업 재직자인데 재직 1년이 넘으면 안 되나요?", a: "사회초년생 조건(1년 이하 재직)을 충족 못 하면 햇살론유스 신청이 어려워요. 다만 연소득 3,500만원 이하이고 신용점수 하위 20%라면 일반보증(햇살론 일반) 쪽으로 신청하는 방법이 있어요. 서민금융콜센터 1397에 전화해서 내 상황을 말하면 맞는 상품을 안내해줘요." },
  { urgent: false, q: "군필자는 나이 상한이 늘어난다고 하던데?", a: "맞아요. 군 복무 기간만큼 나이 상한이 연장돼요. 예를 들어 군 복무 2년이라면 만 36세까지 신청 가능해요. 상환 거치기간도 남성 군미필자는 2년 추가 부여돼요." },
  { urgent: false, q: "금융교육을 꼭 이수해야 하나요?", a: "네, 필수예요. 신청일 기준 6개월 이내에 이수한 기록이 있어야 보증 약정이 가능해요. 서민금융진흥원 금융교육포털에서 온라인으로 이수할 수 있어요. 짧게는 1~2시간 내에 완료 가능해요." },
  { urgent: false, q: "사회적 배려 대상자는 금리가 더 낮다던데, 어떤 경우인가요?", a: "기초생활수급자, 차상위계층, 장애인, 한부모가족 등이 해당돼요. 이 경우 대출금리 1.9% + 보증료 0.1% = 연 2.0%로 일반 금리(5.0%)보다 훨씬 낮아요. 정부 복권기금에서 이자를 1.6%p 지원해주는 구조예요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "서민금융진흥원 — 햇살론유스 제도 안내", url: "https://www.kinfa.or.kr/financialProduct/hessalLoanYoos.do" },
    { label: "토스뱅크 — 햇살론유스 신청 방법 상세 안내", url: "https://www.tossbank.com/articles/sunloan-youth" },
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
      <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 핵심 3가지 즉시 확인</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { q: "소득 없는 대학생·취준생도 받을 수 있나요?", a: "받을 수 있어요. 소득 0원이어도 취업준비생(미취업청년)으로 신청 가능해요. 단, 자금 사용 계획을 구체적으로 작성해야 해요." },
          { q: "한도가 얼마예요?", a: "최대 1,200만원. 평생 1회만 부여돼요. 다 갚아도 재신청 불가예요. 꼭 필요한 만큼만 신청하세요." },
          { q: "금리가 얼마예요?", a: "일반 청년 연 5.0%(금리 4.0% + 보증료 1.0%). 기초수급자·차상위 등 사회적 배려 대상자는 연 2.0%예요." },
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

function EligibilityChecker() {
  const [type, setType] = useState(null);
  const types = {
    student: { label: "대학생·대학원생·학점은행제", check: ["만 19~34세 (군필자는 복무기간만큼 연장)", "연소득 3,500만원 이하", "재학·휴학·수강 중임을 증명 가능", "금융교육 이수 완료 또는 예정"], docs: ["재학증명서 또는 휴학증명서", "건강보험자격득실확인서", "소득금액증명원 (소득 없으면 생략 가능)", "금융교육 수료증"] },
    unemployed: { label: "미취업청년 (무직)", check: ["만 19~34세", "연소득 3,500만원 이하 (소득 없어도 됨)", "현재 취업 준비 중임을 소명 가능 (면접 일정, 자격증 공부 등)", "금융교육 이수 완료 또는 예정"], docs: ["신분증", "건강보험자격득실확인서", "자금용도계획서 (구직활동 증빙 가능하면 추가)", "금융교육 수료증"] },
    earlycareer: { label: "사회초년생 (중소기업 1년 이하)", check: ["만 19~34세", "연소득 3,500만원 이하", "중소기업 재직기간 1년 이하", "금융교육 이수 완료 또는 예정"], docs: ["재직증명서 또는 근로계약서", "건강보험자격득실확인서", "소득금액증명원 또는 원천징수영수증", "금융교육 수료증"] },
    startup: { label: "청년사업자 (창업 1년 이하)", check: ["만 19~34세", "연소득 3,500만원 이하", "사업자등록증 개업일 기준 1년 이하", "미등록·휴폐업·공동사업자 제외", "금융교육 이수 완료 또는 예정"], docs: ["사업자등록증명원", "건강보험자격득실확인서", "소득금액증명원", "금융교육 수료증"] },
  };
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(types).map(([key, val]) => (
          <button key={key} onClick={() => setType(type === key ? null : key)}
            style={{ padding: "8px 14px", borderRadius: 20, border: `1px solid ${type === key ? G : "#e5e7eb"}`, background: type === key ? GL : "#fff", color: type === key ? GD : "#374151", fontSize: 12, fontWeight: type === key ? 700 : 400, cursor: "pointer" }}>
            {val.label}
          </button>
        ))}
      </div>
      {type && (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ background: GL, padding: "12px 16px" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: GD, margin: 0 }}>{types[type].label} 자격 조건</p>
          </div>
          <div style={{ padding: "14px 16px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", margin: "0 0 8px" }}>✓ 확인할 조건</p>
            {types[type].check.map((c, i) => <p key={i} style={{ fontSize: 13, color: "#374151", margin: "0 0 4px", display: "flex", gap: 6 }}><span style={{ color: G, flexShrink: 0 }}>✓</span>{c}</p>)}
            <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", margin: "14px 0 8px" }}>📄 필요 서류</p>
            {types[type].docs.map((d, i) => <p key={i} style={{ fontSize: 13, color: "#374151", margin: "0 0 4px", display: "flex", gap: 6 }}><span style={{ color: "#9ca3af", flexShrink: 0 }}>·</span>{d}</p>)}
          </div>
        </div>
      )}
    </div>
  );
}

function LimitTable() {
  const rows = [
    { type: "일반생활자금", limit: "1회 최대 300만원", period: "6개월 소요 자금 기준", note: "생활비, 교통비 등 일반 용도" },
    { type: "학업·취업준비비", limit: "연간 최대 900만원", period: "소요기간 기준", note: "학원비, 자격증 응시료 등 (등록금 제외)" },
    { type: "주거비", limit: "연간 최대 900만원", period: "월 최대 100만원", note: "월세·보증금, 본인 명의 계약만" },
    { type: "의료비", limit: "연간 최대 900만원", period: "소요기간 기준", note: "본인 병원비·수술비 (미용·성형 제외)" },
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: GL }}>
            {["용도", "한도", "기준", "주의사항"].map(h => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "#374151" }}>{r.type}</td>
              <td style={{ padding: "9px 10px", color: G, fontWeight: 700 }}>{r.limit}</td>
              <td style={{ padding: "9px 10px", color: "#374151" }}>{r.period}</td>
              <td style={{ padding: "9px 10px", color: "#9ca3af", fontSize: 12 }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>※ 일반생활자금 + 특정용도자금 합산 평생 한도 1,200만원. 용도 증빙서류 필수.</p>
    </div>
  );
}

function Steps() {
  const steps = [
    { title: "서민금융 잇다 앱 설치", desc: "서민금융진흥원 공식 앱을 설치해요. 앱을 통해서만 신청 가능해요 (홈페이지 불가).", link: { label: "서민금융 잇다 앱", url: "https://www.kinfa.or.kr" } },
    { title: "금융교육 이수", desc: "신청일 기준 6개월 이내에 이수한 금융교육 기록이 있어야 해요. 금융교육포털에서 온라인으로 1~2시간 이수 가능해요." },
    { title: "앱에서 자격 조건 확인 및 보증 신청", desc: "앱에서 내 유형(취업준비생/사회초년생 등) 선택 후 서류를 제출해요. 앱이 자동으로 건강보험 정보 등을 스크래핑해주는 경우가 많아요." },
    { title: "심사 (1~3영업일)", desc: "서민금융진흥원이 보증 적정성을 심사해요. 서류가 완비되면 영업일 기준 1~3일 내에 결과가 나와요. 결과는 문자로 통보돼요." },
    { title: "보증 승인 후 협약은행에서 대출 실행", desc: "보증번호를 받은 후 협약은행(광주·기업·신한·전북·제주·하나·토스뱅크) 앱에 입력해서 대출을 실행해요. 당일 또는 1~2영업일 내 입금돼요." },
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>햇살론유스 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function HaetsalYouthPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>햇살론유스 · 청년 대출 · 서민금융</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          햇살론유스 자격 조건 |<br />
          한도와 신청 방법 대학생·취준생 기준
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          은행 대출이 거절되는 대학생·취준생·사회초년생을 위한 정부 보증 대출이에요.<br />
          <strong>소득이 없어도 돼요. 연 5.0% 금리로 최대 1,200만원까지 가능해요.</strong><br />
          단, 평생 1회예요. 다 갚아도 재신청이 안 되니 신중하게 써야 해요.
        </p>

        <InstantAnswer />

        <H2>햇살론유스 자격 조건, 내 유형 확인하기</H2>
        <p style={body}>
          대학생인지, 취준생인지, 사회초년생인지에 따라 조건과 서류가 달라요.<br />
          아래에서 내 유형을 선택하면 해당 조건과 서류가 나와요.
        </p>
        <Bdg>유형별 조건 확인</Bdg>
        <EligibilityChecker />
        <GreenBox title="공통 주의사항">
          ① 만 19~34세 (군필자는 복무기간만큼 연장)<br />
          ② 연소득 3,500만원 이하 (소득 없어도 신청 가능)<br />
          ③ 금융교육 이수 필수 (신청일 기준 6개월 이내)<br />
          ④ 개인사업자는 사회초년생으로 신청 불가, 청년사업자(창업 1년 이하) 유형으로 신청
        </GreenBox>

        <Divider />

        <H2>햇살론유스 한도, 용도별 얼마까지 받나요?</H2>
        <p style={body}>
          한도는 용도에 따라 달라요. 생활비는 300만원, 학원비·주거비·의료비는 최대 900만원이에요.<br />
          평생 합산 1,200만원이 한도예요. 다 쓰지 않아도 재신청은 안 돼요.
        </p>
        <Bdg>용도별 한도 표</Bdg>
        <LimitTable />
        <BorderBox title="한도 전략">
          꼭 필요한 용도에 맞춰 나눠 신청하는 게 유리해요.<br />
          예: 생활비 200만원 먼저 → 이후 주거비 600만원 추가 신청 (잔여 한도 내에서 가능)<br />
          단, 동일 용도는 소요 기간 이후에만 추가 신청 가능해요.
        </BorderBox>

        <HubLinks />

        <H2>햇살론유스 신청 방법과 절차</H2>
        <p style={body}>
          서민금융 잇다 앱에서 보증 신청 → 금융교육 이수 → 심사 → 협약은행 대출 실행 순서예요.<br />
          앱을 통한 비대면 신청이 기본이에요. 방문 심사는 일부 경우에만 해당해요.
        </p>
        <Bdg>신청 절차</Bdg>
        <Steps />
        <p style={body}>
          심사 기간은 서류가 완비되면 영업일 기준 1~3일이에요. 서류 미비 시 최대 7일까지 걸릴 수 있어요. 서류를 꼼꼼히 챙기면 가장 빠르게 처리돼요.
        </p>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          소득 없어도 받을 수 있는지, 상환 후 재신청 가능한지, 실제로 가장 많이 묻는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지금 바로 확인하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            서민금융 잇다 앱에서 1분이면 자격 조건 확인이 돼요.<br />
            헷갈리면 1397로 전화하면 내 유형에 맞게 안내해줘요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.kinfa.or.kr/financialProduct/hessalLoanYoos.do" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 서민금융 잇다 앱</a>
            <a href="tel:1397" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 서민금융콜센터 1397</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요. 금융상품 조건은 시기별로 달라질 수 있어요. 구체적인 상황은 서민금융콜센터(1397)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
