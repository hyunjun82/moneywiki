"use client";
import { useState } from "react";

// ─── 2026년 기준
// 육아기 근로시간 단축 대체인력지원금: 월 120만원 (30인 이상·미만 차등 없음, 육아휴직 차등 적용 안됨)
// 육아기 근로시간 단축 기간: 만 12세 이하 또는 초등학교 6학년 이하, 최대 3년 (육아휴직 미사용분 2배 가산)
// 단축 후 근로시간: 주 15시간 이상, 35시간 이하
// 육아휴직과 차이: 단축 기간 자녀 연령 더 넓음 / 파견 허용업무만 파견 가능
// 육아기 근로시간 단축 업무분담지원금: 월 20만원 (기업 규모 무관)

const SIDEBAR_LINKS = [
  "육아기 근로시간 단축 조건",
  "육아기 단축 대체인력 지원금",
  "육아휴직 대체인력 지원금",
  "육아기 단축 파견 허용 업무",
  "업무분담지원금 신청 방법",
  "육아기 근로시간 단축 기간",
  "육아기 단축 급여 계산",
  "10시 출근제 지원 신청",
  "육아기 단축 거부 신고",
  "우선지원대상기업 해당 여부",
  "육아휴직 vs 육아기 단축 비교",
  "6+6 부모육아휴직 금액",
  "단기 육아휴직 방학 활용",
  "복직 후 불이익 처우",
  "고용24 장려금 신청",
  "사업주 지원금 종류",
  "육아기 단축 신청 서류",
  "고용노동부 장려금 전화",
  "중소기업 육아 지원금",
  "출산전후휴가 대체인력",
];

const HUB_LINKS = [
  { title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차", desc: "30인 미만 월 140만원 (육아기 단축은 120만원으로 차이 있음)", href: "#" },
  { title: "업무분담 지원금 신청 방법 | 대체인력 없이 월 20만원 받는 방법", desc: "육아기 단축 업무분담은 규모 무관 월 20만원", href: "#" },
  { title: "파견 vs 직고용 대체인력 | 어느 쪽이 지원금에 유리한가", desc: "육아기 단축은 파견 허용업무만 파견 가능", href: "#" },
  { title: "중소기업 육아휴직 거부 신고 | 사업주 과태료와 신고 방법", desc: "육아기 단축 거부도 500만원 이하 과태료", href: "#" },
];

const COMPARE_TABLE = [
  { item: "자녀 연령", leave: "만 8세 이하 또는 초등학교 2학년 이하", reduce: "만 12세 이하 또는 초등학교 6학년 이하" },
  { item: "최대 기간", leave: "1년 (요건 충족 시 1년 6개월)", reduce: "1년 (육아휴직 미사용 시 최대 3년)" },
  { item: "근로 형태", leave: "완전 휴직", reduce: "주 15~35시간으로 단축 근무" },
  { item: "사업주 지원금", leave: "월 30만원 (30인 미만 140만원 대체인력)", reduce: "월 30만원 (30인 무관 120만원 대체인력)" },
  { item: "대체인력 파견", leave: "절대금지 업무 외 전부 가능", reduce: "파견법상 허용 업무만 가능" },
  { item: "업무분담지원금", leave: "30인 미만 월 60만원", reduce: "규모 무관 월 20만원" },
  { item: "6+6 특례", leave: "생후 18개월 이내 자녀, 첫 6개월 100%", reduce: "해당 없음" },
];

const FAQS = [
  { urgent: true, q: "육아기 근로시간 단축 대체인력 지원금이 육아휴직보다 왜 적은가요?", a: "육아기 단축은 근로자가 계속 출근하면서 시간만 줄이는 거라, 업무 공백이 일부에 불과해요. 대체인력이 단축된 시간만큼만 커버하기 때문에 지원금도 단축 시간에 비례해서 산정해요. 육아휴직은 100% 공백이라 단위 지원금이 더 높아요. 또한 2026년 육아휴직 대체인력지원금은 30인 미만 사업장에 대해 월 140만원으로 인상됐지만, 육아기 단축 대체인력은 종전 기준(월 120만원)이 유지돼요." },
  { urgent: true, q: "파견으로 대체인력을 쓰고 싶은데 육아기 단축은 제한이 있다고 들었어요.", a: "맞아요. 육아기 근로시간 단축 대체인력은 파견법상 '허용 업무' (별표 32개 업종)에만 파견을 사용할 수 있어요. 반면 출산전후휴가·육아휴직은 절대금지 업무 외에는 모두 파견 가능해요. 사무직, IT, 영업 등 허용업무라면 파견 사용이 가능해요. 제조 직접생산, 건설 작업 등은 파견 자체가 불가하므로 직고용만 가능해요." },
  { urgent: false, q: "육아기 근로시간 단축 기간은 최대 3년이라는데 어떻게 계산해요?", a: "기본 1년에 육아휴직을 사용하지 않은 기간의 두 배를 더해서 최대 3년까지 사용할 수 있어요. 예를 들어 육아휴직을 전혀 사용하지 않았다면 1년 + (1년×2) = 3년이에요. 육아휴직을 6개월 쓰고 단축으로 전환한다면 1년 + (6개월×2) = 2년이에요. 자녀 연령이 만 12세 이하인 기간 내에서 사용해야 해요." },
  { urgent: false, q: "육아휴직과 육아기 단축 중 어느 쪽이 유리한가요?", a: "자녀가 초등학생 이상이라면 육아기 단축이 유일한 선택이에요. 소득을 완전히 0으로 만들고 싶지 않다면 육아기 단축이 유리해요. 반면 아이가 어릴 때 집중 돌봄이 필요하거나 6+6 부모육아휴직제 혜택을 받고 싶다면 육아휴직이 더 유리해요. 두 제도를 순서를 바꿔 써도 돼요." },
  { urgent: false, q: "육아기 근로시간 단축도 대체인력지원금 신청 방법이 동일한가요?", a: "네, 절차는 동일해요. 고용24 또는 관할 고용센터에 출산육아기고용안정장려금(대체인력지원금) 지급신청서, 단축 실시 증명 서류, 대체인력 근로계약서, 월별 임금대장을 제출해요. 3개월마다 신청하면 돼요." },
  { urgent: false, q: "육아기 근로시간 단축 거부 시 사업주 처벌은?", a: "500만원 이하의 과태료예요(남녀고용평등법 제39조제3항제6호). 예외적으로 거부 가능한 경우는 14일 이상 고용센터에 대체인력 구인 신청했으나 채용 못한 경우, 또는 업무 특성상 단축이 사업 운영에 중대한 지장을 초래하고 이를 사업주가 증명하는 경우예요. 거부 시 서면으로 사유를 통보하고 육아휴직을 대신 부여하거나 다른 조치를 협의해야 해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "남녀고용평등법 제19조의2 — 육아기 근로시간 단축", url: "https://www.law.go.kr/" },
    { label: "고용보험법 시행령 제29조제1항제3호 — 대체인력지원금", url: "https://www.law.go.kr/" },
    { label: "2026년 고용노동부 개정 안내 — 대체인력지원금 기업규모별 차등", url: "https://www.gworkingmom.net/about/notices/490" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 육아기 근로시간 단축 신청", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1380&ccfNo=2&cciNo=2&cnpClsNo=1" },
    { label: "고용24 — 육아기 근로시간 단축 급여 신청", url: "https://www.work24.go.kr" },
    { label: "서남권직장맘지원센터 — 대체인력지원금 2026 개정 내용", url: "https://www.gworkingmom.net/about/notices/490" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: { children: React.ReactNode }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: { children: React.ReactNode }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function CompareTable() {
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: GL }}>{["항목", "육아휴직", "육아기 근로시간 단축"].map(h => <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>)}</tr></thead>
        <tbody>
          {COMPARE_TABLE.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{r.item}</td>
              <td style={{ padding: "9px 10px", color: "#374151" }}>{r.leave}</td>
              <td style={{ padding: "9px 10px", color: "#374151" }}>{r.reduce}</td>
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 육아기 단축 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>육아기 단축 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ChildcareReducedHoursPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>육아기 근로시간 단축 · 대체인력 · 사업주 지원금</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          육아기 근로시간 단축 대체인력 |<br />
          육아휴직과 차이점
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          초등학교 고학년 자녀를 둔 부모라면 육아휴직을 쓸 수 없어요. 육아기 근로시간 단축을 써야 해요.<br />
          <strong>대체인력 지원금은 나오지만, 육아휴직보다 낮아요. 핵심 차이 3가지부터 확인하세요.</strong>
        </p>

        <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 육아기 단축 대체인력 핵심 차이</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>지원금이 육아휴직보다 얼마나 적나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>육아기 단축 대체인력은 기업 규모 관계없이 월 120만원이에요. 육아휴직은 30인 미만 140만원, 30인 이상 130만원이에요. 규모별 차등도 없어요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>파견 대체인력을 쓸 수 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>파견법상 허용 업무(32개 업종)에만 가능해요. 육아휴직은 절대금지 업무 외 전부 가능한 것과 달리 제한이 있어요. 우리 직무가 허용 업무인지 파견업체 또는 고용센터(1350)에 먼저 확인하세요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>자녀 연령 기준이 다른가요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>육아기 단축은 만 12세 이하(초6)까지 가능해요. 육아휴직은 만 8세 이하(초2)까지예요. 초등학생 이상 자녀라면 육아기 단축이 유일한 선택이에요.</p>
            </div>
          </div>
        </div>

        <GreenBox title="핵심 차이 3가지">
          ① 자녀 연령: 육아기 단축은 초등학교 6학년(만 12세) 이하까지 가능 (육아휴직은 초2 이하)<br />
          ② 대체인력지원금: 육아기 단축은 기업 규모 무관 월 120만원 (육아휴직 30인 미만은 140만원)<br />
          ③ 파견 대체인력: 육아기 단축은 파견 허용업무만 가능 (육아휴직은 절대금지 업무 외 전부)
        </GreenBox>

        <Divider />

        <H2>육아기 근로시간 단축 대체인력과 육아휴직 대체인력 차이</H2>
        <p style={body}>
          자녀가 초등학생이라면 육아기 단축이 유일한 선택이에요. 육아휴직은 초2 이하까지만 돼요.<br />
          대신 대체인력지원금이 육아휴직보다 낮고, 파견 사용도 더 제한돼요. 표에서 내 상황에 맞는 제도를 먼저 확인하세요.
        </p>
        <Bdg>육아기 근로시간 단축 대체인력과 육아휴직 대체인력 차이표</Bdg>
        <CompareTable />
        <p style={body}>
          표를 보고 육아기 단축으로 진행할 거라면 아래에서 지원금 조건과 금액을 확인하세요.
        </p>

        <Divider />

        <H2>육아기 근로시간 단축 대체인력 지원금 조건과 금액</H2>
        <p style={body}>
          육아기 단축 대체인력 지원금은 2026년에도 월 120만원으로 유지돼요. 육아휴직처럼 기업 규모별 차등이 없어요.<br />
          업무분담지원금도 30인 기준 차등 없이 월 20만원이에요. 대신 대체인력 없이 기존 직원에게 업무를 맡기는 방식이면 이쪽이 더 간편해요.
        </p>
        <BorderBox title="육아기 근로시간 단축 대체인력 지원금 조건과 금액 (2026년)">
          <strong>대체인력지원금</strong>: 월 120만원 (기업 규모 무관, 2026년 변경 없음)<br />
          → 육아휴직 30인 미만 140만원과 달리 구분 없이 동일 적용<br /><br />
          <strong>업무분담지원금</strong>: 월 최대 20만원 (기업 규모 무관)<br />
          → 육아휴직 업무분담지원금(30인 미만 60만원)과 달리 단독 기준 유지<br /><br />
          <strong>육아기 근로시간 단축 지원금</strong>: 월 30만원<br />
          → 육아휴직 지원금과 동일, 처음 허용한 1~3번째 사례까지 월 10만원 인센티브 추가
        </BorderBox>
        <p style={body}>
          파견 대체인력을 쓰려면 우리 업무가 파견 허용 업무인지 먼저 확인해야 해요. 허용 업무가 아니면 직고용만 가능해요. 파견업체나 고용센터(1350)에 확인해보세요.
        </p>

        <HubLinks />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          육아기 단축 대체인력지원금이 왜 육아휴직보다 적은지, 파견 사용이 제한되는 이유 — 실제로 많이 묻는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지원금 신청은 고용24에서</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>육아휴직·육아기 단축 모두 동일한 경로로 신청해요.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.work24.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 고용24 신청하기</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있어요.
        </div>
      </div>
    </div>
  );
}
