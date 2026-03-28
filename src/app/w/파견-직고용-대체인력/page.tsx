"use client";
import { useState } from "react";

// ─── 2026년 기준 (고용보험법 시행령 제29조, 2026.1.1. 시행 개정 포함)
// 직고용·파견 모두 대체인력지원금 동일 월 130만원(30인 이상) / 140만원(30인 미만)
// 파견은 절대금지 업무 외 출산전후휴가·육아휴직에 가능
// 육아기 근로시간 단축의 경우 파견 허용업무만 가능

const SIDEBAR_LINKS = [
  "육아휴직 대체인력 지원금 신청 방법",
  "우선지원대상기업 해당 여부",
  "업무분담지원금 신청 방법",
  "파견 대체인력 지원금 조건",
  "육아휴직 직고용 대체인력",
  "파견업체 대체인력 계약서",
  "대체인력 고용조정 요건",
  "고용24 장려금 신청",
  "출산전후휴가 대체인력",
  "육아기 근로시간 단축 대체인력",
  "대체인력 인수인계 기간",
  "남성 육아휴직 인센티브",
  "육아휴직 복직 거부 신고",
  "6+6 부모육아휴직 금액",
  "단기 육아휴직 방학 활용",
  "중소기업 육아휴직 지원",
  "고용노동부 장려금 전화",
  "대체인력 파견 계약서 서류",
  "우선지원대상기업 자격",
  "육아휴직 지원금 중복 수급",
];

const HUB_LINKS = [
  { title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차", desc: "직고용·파견 모두 월 최대 140만원 지원 (30인 미만 기준)", href: "#" },
  { title: "대체인력 지원금 대상 조건 | 우선지원대상기업 해당 여부 확인", desc: "업종별 상시근로자 기준과 자가 확인 방법", href: "#" },
  { title: "업무분담 지원금 신청 방법 | 대체인력 없이 월 20만원 받는 방법", desc: "2026년 30인 미만 월 60만원으로 인상", href: "#" },
  { title: "출산전후휴가 대체인력 지원금 | 육아휴직과 동시 신청 가능한가", desc: "출산전후휴가→육아휴직 연속 시 대체인력 그대로 유지 가능", href: "#" },
];

const COMPARE_DATA = [
  { item: "지원금 금액", direct: "30인 미만 월 140만원 / 30인 이상 130만원", dispatch: "동일 (직고용과 같음)" },
  { item: "임금 80% 한도", direct: "사업주가 지급한 임금의 80%", dispatch: "파견 대가의 80%" },
  { item: "허용 범위", direct: "모든 업무 가능", dispatch: "절대금지 업무 외 가능\n(육아기 단축은 허용업무만)" },
  { item: "고용조정 요건", direct: "채용 전 3개월~후 1년간 감원 금지", dispatch: "동일" },
  { item: "신청 서류 추가", direct: "근로계약서 + 임금대장", dispatch: "파견계약서 + 파견대가 지급내역 추가" },
  { item: "4대 보험", direct: "사업주가 직접 납부", dispatch: "파견업체가 납부 (비용 차이 발생)" },
  { item: "계약 기간", direct: "육아휴직 기간에 맞춰 자유롭게", dispatch: "파견업체와 기간 협의 필요" },
  { item: "실무 난이도", direct: "직접 채용·관리 필요", dispatch: "파견업체가 인력 공급·관리" },
];

const FAQS = [
  { urgent: true, q: "파견으로 쓰면 지원금을 더 적게 받나요?", a: "아니요. 2025년 1월 1일부터 직고용과 파견 모두 동일하게 30인 미만 월 140만원, 30인 이상 월 130만원을 지원해요. 단, 파견 대가의 80%를 한도로 하므로 파견 대가 자체가 낮으면 그에 맞춰 지원금도 줄어요." },
  { urgent: true, q: "육아기 근로시간 단축은 파견 사용이 제한된다는데 왜요?", a: "육아기 근로시간 단축은 파견 허용 업무에만 파견 대체인력을 쓸 수 있어요. 파견 허용 업무는 파견법 별표에 정해진 32개 업무로 제한돼요. 반면 출산전후휴가·육아휴직은 절대 금지 업무(제조직접생산, 건설작업, 유해·위험 업무 등)만 아니면 파견 가능해요." },
  { urgent: true, q: "파견으로 대체인력 쓸 때 추가로 내야 하는 서류가 있나요?", a: "파견 대체인력의 경우 기본 서류 외에 근로자파견계약서 사본과 근로자파견의 대가 지급내역 사본을 추가로 제출해야 해요. 이 서류가 없으면 파견 지원금을 받을 수 없어요. 파견업체에 계약 시 미리 요청해 두세요." },
  { urgent: false, q: "직고용과 파견 중 어느 쪽이 실제로 더 유리한가요?", a: "지원금 액수는 동일해요. 비용 측면에서 파견은 파견업체 수수료가 붙어서 파견 대가가 직고용 임금보다 높은 경우가 많아요. 지원금은 실제 지급액의 80%를 한도로 하므로 파견 대가가 높으면 지원금도 더 받을 수 있지만, 순수 비용은 직고용이 더 낮은 경우가 많아요. 반면 파견은 채용·관리 부담이 적은 장점이 있어요. 업무 특성과 인력 수급 상황에 따라 선택하면 돼요." },
  { urgent: false, q: "파견 대체인력도 고용조정 요건을 지켜야 하나요?", a: "네, 직고용과 동일하게 파견 대체인력 사용 전 3개월부터 사용 후 1년까지 다른 근로자를 고용조정으로 이직시키면 안 돼요. 이 요건을 어기면 직고용·파견 관계없이 지원금 전액이 취소돼요." },
  { urgent: false, q: "대체인력이 중간에 파견 계약을 종료하면 어떻게 되나요?", a: "파견 계약이 종료되면 그 날까지 사용한 기간에 대해서만 지원금을 받아요. 30일 미만이면 지원이 아예 안 돼요. 새 파견 대체인력으로 교체하면 교체 후 30일 이상 사용한 기간부터 다시 지원 신청이 가능해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "고용보험법 시행령 제29조제1항제3호 — 대체인력지원금 요건", url: "https://www.law.go.kr/" },
    { label: "파견근로자 보호 등에 관한 법률 — 파견 허용·금지 업무", url: "https://www.law.go.kr/" },
    { label: "고용창출장려금·고용안정장려금의 신청 및 지급에 관한 규정 별표5 제3호", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "서남권직장맘지원센터 — 2025년 사업주 지원금 개정 내용", url: "https://www.gworkingmom.net/network/articles/122" },
    { label: "고용24 — 대체인력지원금 제도 안내", url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systClId=SC00000303" },
    { label: "찾기쉬운 생활법령 — 출산육아기 고용안정장려금", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1380&ccfNo=2&cciNo=3&cnpClsNo=1" },
  ]},
];

const G = "#1D9E75"; const GL = "#E1F5EE"; const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }

function CompareTable() {
  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: GL }}>
            {["비교 항목", "직고용 대체인력", "파견 대체인력"].map(h => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: `2px solid ${G}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_DATA.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{r.item}</td>
              <td style={{ padding: "9px 10px", color: "#374151", whiteSpace: "pre-line" }}>{r.direct}</td>
              <td style={{ padding: "9px 10px", color: "#374151", whiteSpace: "pre-line" }}>{r.dispatch}</td>
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
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 육아휴직 대체인력 관련 글도 함께 보세요</p>
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
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>육아휴직 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function DispatchVsDirectPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>육아휴직 · 대체인력 · 사업주 지원금</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          파견 vs 직고용 대체인력 |<br />
          어느 쪽이 지원금에 유리한가
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          "파견으로 쓰면 지원금이 적게 나오지 않나요?"<br />
          <strong>아니요. 2025년 1월부터 직고용과 파견 모두 동일해요. 30인 미만 월 140만원, 30인 이상 130만원.</strong><br />
          차이가 있다면 서류 1개 추가, 그리고 육아기 근로시간 단축은 파견 허용 업무인지 먼저 확인해야 한다는 점이에요.
        </p>

        <div style={{ background: GL, border: `1px solid ${G}`, borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 10 }}>✅ 파견 vs 직고용 핵심 차이만 요약</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>지원금 금액 차이가 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>없어요. 직고용이든 파견이든 30인 미만 월 140만원, 30인 이상 130만원으로 동일해요. 단, 지원금은 실제 지급 임금(또는 파견 대가)의 80%를 한도로 해요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>파견 쓰면 추가로 내야 하는 서류가 있나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>파견계약서 사본 + 파견 대가 지급내역 사본 2가지가 추가돼요. 계약 시 파견업체에 미리 요청해두세요.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>육아기 근로시간 단축도 파견 써도 되나요?</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>파견법상 허용 업무(32개 업종)에만 가능해요. 육아휴직·출산전후휴가는 절대금지 업무 외 전부 가능해서 제한이 훨씬 적어요. 허용 업무인지 모르겠으면 파견업체나 고용센터(1350)에 먼저 확인하세요.</p>
            </div>
          </div>
        </div>

        <GreenBox title="핵심 결론">
          직고용과 파견, 지원금 금액은 같아요.<br />
          30인 미만 월 140만원 / 30인 이상 월 130만원 — 고용 형태 무관하게 동일.<br />
          단, 파견 서류가 하나 더 필요하고, 육아기 근로시간 단축에는 파견 허용 업무만 가능해요.
        </GreenBox>

        <Divider />

        <H2>파견 대체인력과 직고용 대체인력 지원금 차이</H2>
        <p style={body}>
          지원금 금액은 동일한데 실무에서 신경 써야 할 차이가 있어요.<br />
          특히 서류가 하나 더 필요하고, 육아기 근로시간 단축은 파견 허용 업무인지부터 확인해야 해요.
        </p>
        <Bdg>직고용 vs 파견 대체인력 비교</Bdg>
        <CompareTable />
        <p style={body}>
          표에서 우리 상황에 맞는 항목을 확인했으면, 파견 사용이 가능한 경우인지 아래에서 체크해보세요.
        </p>

        <Divider />

        <H2>육아휴직 대체인력 파견 가능한 경우</H2>
        <p style={body}>
          파견 대체인력 사용이 가능한지는 어떤 휴직·단축인지에 따라 달라요.<br />
          육아휴직·출산전후휴가라면 대부분 파견이 가능해요. 육아기 근로시간 단축은 파견 허용 업무인지 먼저 확인해야 해요.
        </p>
        <BorderBox title="파견 가능 범위">
          <strong>출산전후휴가·유산사산휴가·육아휴직 대체인력</strong><br />
          파견법상 절대 금지 업무(제조직접생산, 건설작업, 유해·위험 업무 등)를 제외한 모든 업무에 파견 가능<br /><br />
          <strong>육아기 근로시간 단축 대체인력</strong><br />
          파견법 별표에 정해진 허용 업무(32개 업종)에만 파견 가능<br />
          허용 업무 외 직종이라면 파견 대체인력 대신 직고용만 가능
        </BorderBox>
        <p style={body}>
          우리 회사 직무가 파견 허용 업무인지 확실하지 않으면 파견업체에 먼저 확인을 요청하거나 고용센터(1350)에 문의하세요. 파견으로 썼는데 허용 업무가 아니면 지원금이 취소될 수 있어요.
        </p>

        <HubLinks />

        <H2>직고용 vs 파견 대체인력 어느 쪽이 유리한가</H2>
        <p style={body}>
          지원금 금액이 같다면 결국 채용 속도와 관리 편의성으로 결정하면 돼요.<br />
          빠르게 사람이 필요하고 단기라면 파견, 장기이거나 정규직 전환을 고려한다면 직고용이 유리해요.
        </p>
        <div style={{ display: "flex", gap: 12, margin: "12px 0 1.2rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, border: `1px solid ${G}`, borderRadius: 8, padding: "14px 16px", background: GL }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 8 }}>직고용이 유리한 경우</p>
            <p style={{ fontSize: 13, color: GD, lineHeight: 1.8, margin: 0 }}>
              ▪ 같은 업무를 이미 아는 사람을 채용할 수 있을 때<br />
              ▪ 파견 수수료를 아끼고 싶을 때<br />
              ▪ 이후 정규직 전환을 고려할 때
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 200, border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 16px", background: "#fafafa" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>파견이 유리한 경우</p>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0 }}>
              ▪ 채용에 시간을 쓸 수 없을 때<br />
              ▪ 단기간이라 직고용 계약이 부담될 때<br />
              ▪ 전문 인력이 필요한데 파견업체가 보유할 때
            </p>
          </div>
        </div>
        <p style={body}>
          방향이 정해졌으면 아래 FAQ에서 실제로 많이 막히는 상황들을 확인해보세요.
        </p>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          파견으로 쓰면 지원금이 다른지, 고용조정 요건이 파견에도 적용되는지 — 실제로 많이 묻는 상황들이에요. 급한 상황부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 10 }}>지원금 신청은 고용24에서</p>
          <p style={{ fontSize: 13, color: GD, lineHeight: 1.85, margin: "0 0 14px" }}>
            직고용·파견 모두 고용24 또는 관할 고용센터에서 신청할 수 있어요.<br />
            파견인 경우 파견계약서와 대가 지급내역을 미리 파견업체에 요청해두세요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://www.work24.go.kr" style={{ padding: "10px 18px", borderRadius: 8, background: G, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>↗ 고용24 신청하기</a>
            <a href="tel:1350" style={{ padding: "10px 18px", borderRadius: 8, background: "#fff", border: `1px solid ${G}`, color: G, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <References />
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률·정책 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 개별 사안에 따라 결과가 달라질 수 있어요. 구체적인 상황은 고용노동부 고객상담센터(1350)에 문의하세요.
        </div>
      </div>
    </div>
  );
}
