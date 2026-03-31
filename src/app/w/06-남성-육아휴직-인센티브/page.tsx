"use client";
import { useState } from "react";

// ─── 2026년 기준 (고용보험법 시행령 제29조제3항 + 고용창출장려금·고용안정장려금의 신청 및 지급에 관한 규정)
// 남성 육아휴직 인센티브: 우선지원대상기업에서 남성 근로자 육아휴직을 처음 허용한 첫~세 번째 사례까지 월 10만원 추가
// 육아휴직 지원금 일반: 월 30만원 (복직 후 50% 추가 지급)
// 대체인력지원금 중복 수급 가능 (남성 인센티브는 대체인력지원금과 중복 가능)

const SIDEBAR_LINKS = [
  "남성 육아휴직 인센티브 조건",
  "육아휴직 대체인력 지원금",
  "우선지원대상기업 해당 여부",
  "업무분담지원금 신청 방법",
  "6+6 부모육아휴직 금액",
  "남성 육아휴직 급여",
  "육아휴직 자동 승인 절차",
  "배우자 출산휴가 20일",
  "육아기 근로시간 단축",
  "단기 육아휴직 방학 활용",
  "육아휴직 거부 신고",
  "육아휴직 복직 후 처우",
  "출산전후휴가 대체인력",
  "고용24 사업주 신청",
  "사업주 지원금 종류",
  "육아휴직 지원금 중복 수급",
  "육아기 10시 출근제",
  "고용노동부 장려금 전화",
  "고용안정장려금 신청",
  "중소기업 고용지원금",
];

const HUB_LINKS = [
  { title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차", desc: "남성 인센티브 + 대체인력지원금 중복 수급 가능", href: "#" },
  { title: "6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산", desc: "생후 18개월 이내 자녀, 부모 각각 첫 6개월 통상임금 100%", href: "#" },
  { title: "육아휴직 급여 6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산", desc: "1~3개월 통상임금 100%, 부부 합산 월 최대 450만원", href: "#" },
  { title: "업무분담 지원금 신청 방법 | 대체인력 없이 월 60만원 받는 방법", desc: "2026년 30인 미만 월 60만원으로 인상", href: "#" },
];

const FAQS = [
  { urgent: true, q: "남성 인센티브 월 10만원을 받으려면 정확히 어떤 조건이에요?", a: "우선지원대상기업이어야 하고, 해당 사업장에서 남성 근로자가 육아휴직을 사용한 이력이 없어야 해요. 그 사업장에서 처음으로 남성 육아휴직이 허용되는 세 번째 사례까지 적용돼요. 즉, 같은 사업장에서 첫 번째 남성 육아휴직자부터 세 번째 남성 육아휴직자까지 각각 월 10만원을 추가로 받아요. 네 번째부터는 인센티브 없이 기본 지원금(월 30만원)만 나와요." },
  { urgent: true, q: "남성 인센티브와 대체인력지원금을 동시에 받을 수 있나요?", a: "네, 받을 수 있어요. 남성 육아휴직 인센티브는 육아휴직지원금 유형 중에서 대체인력지원금과 중복 수급이 가능한 경우예요. 즉, 남성 직원이 육아휴직을 떠나서 대체인력을 고용했다면 대체인력지원금(월 최대 140만원) + 남성 인센티브(월 10만원)를 동시에 받을 수 있어요." },
  { urgent: false, q: "사업장이 여러 개인데, 각 사업장별로 인센티브가 따로 계산되나요?", a: "네, 사업장별로 독립적으로 계산해요. 사업장 A에서 남성 육아휴직이 처음 허용된 경우에 A사업장의 첫 세 번째 사례까지 인센티브가 나와요. 사업장 B는 B대로 따로 계산돼요." },
  { urgent: false, q: "남성 직원이 6+6 부모육아휴직제를 쓰면 인센티브도 받을 수 있나요?", a: "6+6 부모육아휴직제(생후 18개월 이내 자녀)를 적용받는 경우와 남성 인센티브는 별개예요. 6+6 특례 첫 3개월은 사업주에게 월 100만원이 지원되는데, 이 경우 대체인력지원금과는 중복 수급이 안 돼요. 남성 인센티브(월 10만원 추가)는 6+6 특례·일반 유형 관계없이 첫 세 번째 사례까지 적용 가능해요." },
  { urgent: false, q: "남성 근로자가 육아휴직을 쓴 것과 안 쓴 것을 어떻게 확인하나요?", a: "고용24에서 사업장의 육아휴직 사용 현황을 조회할 수 있어요. 지원금 신청 시 고용센터에서 해당 사업장의 남성 육아휴직 이력을 확인하고 인센티브 해당 여부를 판단해요. 이력 확인이 어려우면 고용노동부 1350에 문의하면 돼요." },
  { urgent: false, q: "남성 인센티브 지원금은 언제 신청해요?", a: "육아휴직지원금 신청과 동일한 시기에 같이 신청해요. 육아휴직 사용 기간 중 50%는 3개월마다, 나머지 50%는 복직 후 6개월 이상 계속 고용 시 한꺼번에 신청해요. 신청 기간은 육아휴직 시작 달의 다음 달부터 ~ 종료 후 12개월 이내예요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "고용보험법 시행령 제29조제3항 — 육아휴직지원금 + 남성 인센티브", url: "https://www.law.go.kr/" },
    { label: "고용창출장려금·고용안정장려금의 신청 및 지급에 관한 규정 별표5 제1호", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "보조금24 — 출산육아기 고용안정장려금 서비스 상세", url: "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/WII000001060" },
    { label: "서남권직장맘지원센터 — 2025년 사업주 지원금 개정 내용", url: "https://www.gworkingmom.net/network/articles/122" },
    { label: "고용24 — 육아휴직지원금 제도 안내", url: "https://m.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systClId=SC00000302&systId=SI00000398" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: any) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: any) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: any) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }: any) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function IncTable() {
  // 월별 지원금 시뮬레이터
  const [months, setMonths] = useState(12);
  const basic = 30;
  const incentive = 10;
  const total = months * (basic + incentive);
  const halfDuring = Math.floor(months / 2) * (basic + incentive);
  const halfAfter = total - halfDuring;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "16px 18px", margin: "12px 0 1.2rem" }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>육아휴직 기간 (개월)</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <input type="range" min={1} max={18} value={months} onChange={e => setMonths(Number(e.target.value))} style={{ flex: 1, accentColor: G }} />
        <span style={{ fontSize: 15, fontWeight: 700, color: G, minWidth: 40, textAlign: "right" }}>{months}개월</span>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "월 지원금", val: `${basic + incentive}만원`, note: "기본 30 + 인센티브 10" },
          { label: "총 지원금", val: `${total}만원`, note: `${months}개월` },
          { label: "휴직 중 50%", val: `${halfDuring}만원`, note: "3개월 단위 신청" },
          { label: "복직 후 50%", val: `${halfAfter}만원`, note: "복직 후 6개월 이상 고용 시" },
        ].map((r: any, i: any) => (
          <div key={i} style={{ flex: 1, minWidth: 100, background: i === 0 ? GL : "#f9fafb", borderRadius: 8, padding: "10px 12px", border: `1px solid ${i === 0 ? G : "#e5e7eb"}` }}>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>{r.label}</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: i === 0 ? GD : "#111", margin: "0 0 2px" }}>{r.val}</p>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{r.note}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>※ 첫~세 번째 남성 육아휴직 사례에만 적용. 네 번째부터는 기본 월 30만원만 지원. 실제 지원금은 고용센터 확인 후 달라질 수 있어요.</p>
    </div>
  );
}

function SupportMap() {
  const rows = [
    { type: "일반 육아휴직", special: "없음", support: "월 30만원", combo: "대체인력지원금 중복 ○" },
    { type: "일반 육아휴직", special: "남성 인센티브", support: "월 40만원", combo: "대체인력지원금 중복 ○" },
    { type: "6+6 특례 (만 12개월 이내)", special: "첫 3개월", support: "월 100만원", combo: "대체인력지원금 중복 ✗" },
    { type: "6+6 특례 + 남성 인센티브", special: "첫 3개월", support: "월 110만원", combo: "대체인력지원금 중복 ✗" },
    { type: "6+6 특례 이후 (4개월~)", special: "일반", support: "월 30만원", combo: "대체인력지원금 중복 ○" },
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: GL }}>{["유형", "특례", "사업주 지원금", "대체인력지원금"].map(h => <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r: any, i: any) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "#111" }}>{r.type}</td>
              <td style={{ padding: "9px 10px", color: "#374151" }}>{r.special}</td>
              <td style={{ padding: "9px 10px", color: G, fontWeight: 700 }}>{r.support}</td>
              <td style={{ padding: "9px 10px", color: r.combo.includes("○") ? G : "#DC2626", fontWeight: 600 }}>{r.combo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = i => setOpen(p => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ margin: "12px 0 1.2rem" }}>
      {FAQS.map((faq: any, i: any) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button onClick={(: any) => toggle(i)} style={{ width: "100%", textAlign: "left", padding: "13px 4px", display: "flex", alignItems: "flex-start", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 육아휴직 지원금 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
          </a>
        ))}
      </div>
      <a href="#" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>육아휴직 관련 글 전체 보기 →</a>
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
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요.</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>육아휴직 사업주 지원금</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function MaleLeaveIncentivePage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>육아휴직 · 사업주 지원금 · 인센티브</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          남성 육아휴직 인센티브 |<br />
          중소기업 월 10만원 추가 지원
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          남자 직원이 처음으로 육아휴직을 쓰면 회사에 월 10만원이 더 나와요.<br />
          <strong>기본 30만원 + 인센티브 10만원 = 월 40만원. 대체인력까지 채용하면 월 최대 180만원.</strong>
        </p>

        <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 남성 인센티브 즉시 확인</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>우리 회사에 해당하나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>우선지원대상기업이고, 사업장 내 남성 직원이 육아휴직을 쓴 이력이 없거나 세 번째 사례까지라면 해당돼요. 네 번째부터는 기본 30만원만 나와요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>대체인력지원금과 같이 받을 수 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>네, 가능해요. 남성 인센티브는 대체인력지원금과 중복 수급이 돼요. 월 40만원(지원금+인센티브) + 월 최대 140만원(대체인력) = 월 최대 180만원까지 받을 수 있어요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>6+6 특례 첫 3개월(월 100만원)과 중복되나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>6+6 특례 기간에는 대체인력지원금과 중복이 안 돼요. 남성 인센티브(+10만원)는 유형에 관계없이 적용돼요. 6+6 특례 vs 일반 중 어느 쪽이 유리한지는 아래 표에서 비교해보세요.</p>
            </div>
          </div>
        </div>

        <GreenBox title="2026년 남성 육아휴직 인센티브 핵심">
          조건: 우선지원대상기업 + 사업장 내 남성 육아휴직 허용 이력 없는 첫~세 번째 사례<br />
          금액: 기본 월 30만원 + 인센티브 월 10만원 = 월 40만원<br />
          중복: 대체인력지원금(월 최대 140만원)과 동시 수급 가능 → 합산 월 최대 180만원
        </GreenBox>

        <Divider />

        <H2>남성 육아휴직 인센티브 월 10만원 추가 지원 계산</H2>
        <p style={body}>
          인센티브는 신청할 때 자동 반영되는 게 아니에요. 사업장 내 남성 육아휴직 이력이 없어야 해당돼요.<br />
          몇 개월을 쓰든 월 40만원(기본+인센티브)이 기간 내내 나와요. 슬라이더로 기간별 총 지원금을 직접 확인해보세요.
        </p>
        <Bdg>남성 인센티브 포함 지원금 계산기</Bdg>
        <IncTable />
        <p style={body}>
          계산기 결과를 보고 대체인력지원금과 같이 받을 수 있는지 아래에서 확인하세요.
        </p>

        <Divider />

        <H2>중소기업 남성 육아휴직 인센티브와 지원금 중복 조건</H2>
        <p style={body}>
          6+6 특례를 받으면 첫 3개월 동안 대체인력지원금과 중복이 안 돼요.<br />
          어떤 경우에 어떻게 조합하면 유리한지 확인해보세요.
        </p>
        <Bdg>유형별 지원금 + 중복 수급 가이드</Bdg>
        <SupportMap />
        <BorderBox title="가장 많이 받는 조합은?">
          ① 남성 육아휴직 (일반 유형) + 대체인력지원금<br />
          → 월 40만원(지원금+인센티브) + 월 최대 140만원(대체인력) = 월 최대 180만원<br /><br />
          ② 여성 육아휴직 6+6 특례 첫 3개월 (대체인력 미사용 시)<br />
          → 월 100만원 (단, 대체인력지원금 중복 불가)
        </BorderBox>
        <p style={body}>
          남성 직원 육아휴직이 사업장 내 처음이라면 인센티브 + 대체인력지원금 조합이 가장 유리해요. 두 번째, 세 번째 사례까지 인센티브가 계속 나오니 이후 남성 직원 육아휴직도 놓치지 마세요.
        </p>

        <HubLinks />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          인센티브 조건이 정확히 무엇인지, 대체인력지원금과 동시에 받을 수 있는지 — 실제로 많이 묻는 질문들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지금 바로 신청하세요</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>고용24에서 육아휴직지원금 신청 시 인센티브가 자동으로 반영돼요.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.work24.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 고용24 신청하기</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률·정책 정보 제공을 목적으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있어요. 고용노동부(1350)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
