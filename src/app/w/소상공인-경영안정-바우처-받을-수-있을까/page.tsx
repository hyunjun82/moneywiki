"use client";
// @ts-nocheck
import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 중소벤처기업부 공고 제2026-37호
// 지원금액: 25만원 (1개사당)
// 매출기준: 2025년 연매출 0원 초과 1억 400만원 미만
// 2025년 개업자 환산: 개업 이후 월 평균 매출 × 12개월
// 개업일: 2025년 12월 31일 이전 (사업자등록증 기준)
// 사용기한: 2026년 12월 31일
// 콜센터: 1533-0600
// 제외업종: 유흥업·도박·담배도매·가상자산·금융업·병원 등

const EXCLUDED_INDUSTRIES = [
  { label: "유흥업", detail: "일반유흥주점업, 무도유흥주점업" },
  { label: "도박·사행성 업종", detail: "도박기계·사행성 오락기구 제조·도매·소매·임대업, 카지노" },
  { label: "담배 관련 업종", detail: "담배 중개업, 잎담배 도매업, 담배 도매업 (전자담배 포함)" },
  { label: "가상자산 매매·중개업", detail: "가상자산 매매 및 중개업" },
  { label: "금융·보험업", detail: "은행·투자·보험·연금·금융관련 서비스업" },
  { label: "부동산업", detail: "건물임대업·부동산중개·개발·공급업 (단, 부동산관리업·공유오피스 등 일부 가능)" },
  { label: "병원·한의원 등 보건업", detail: "단, 유사의료업(86902)은 신청 가능" },
  { label: "법무·세무·회계업", detail: "법무, 회계, 세무 등 기타 법무관련 서비스업" },
  { label: "골프장·카지노·무도장", detail: "골프장 운영업, 기타 사행시설, 무도장 운영업" },
  { label: "성인용 업종", detail: "성인게임장, 성인오락실, 휴게텔, 키스방, 대화방 등" },
];

const FAQS = [
  {
    urgent: true,
    q: "연매출 1억 400만원 기준이 정확히 뭔가요",
    a: "2025년 1년간 국세청에 신고한 매출액이에요. 부가가치세 신고 기준이에요. 세금 공제 전 총 매출액이 기준이고, 0원 초과 1억 400만원 미만이어야 해요. 매출이 0원(신고 없음)이면 대상에서 제외돼요. 1억 400만원 이상이면 제외예요.",
  },
  {
    urgent: true,
    q: "2025년에 개업했는데 바우처 신청할 수 있나요",
    a: "네. 2025년 중 개업한 소상공인도 신청할 수 있어요. 단, 매출 계산 방식이 달라요. 개업 이후 월 평균 매출액 × 12개월로 연 환산해요. 예를 들어 2025년 10월 개업 후 3개월간 2,500만원 매출이면 (2,500만원 ÷ 3개월) × 12개월 = 1억원으로 계산해요. 이 경우 1억 400만원 미만이므로 지원 대상이에요.",
  },
  {
    urgent: true,
    q: "어떤 업종은 신청이 안 되나요",
    a: "소상공인 정책자금 융자제외 업종은 신청이 안 돼요. 유흥업·도박·사행성 업종·담배도매업·가상자산 매매업·금융업·병원(보건업)·법무·세무·회계업 등이 제외예요. 내 업종이 해당하는지 헷갈리면 콜센터(☎1533-0600)에 업종코드로 문의하면 바로 확인할 수 있어요.",
  },
  {
    urgent: false,
    q: "사업체가 여러 개면 다 신청할 수 있나요",
    a: "안 돼요. 1인이 다수 사업체(법인·개인 무관)의 대표인 경우 1곳만 신청할 수 있어요. 매출 기준을 충족하는 사업체 중 1개를 선택해 신청하면 돼요. 공동대표가 운영하는 사업체는 주대표 1인만 신청 가능해요.",
  },
  {
    urgent: false,
    q: "2024년 이전 개업자는 어떻게 매출 계산하나요",
    a: "2024년 이전 개업 소상공인(2024년 12월 31일 이전 개업)은 국세청에 신고한 2025년 1년 매출액을 그대로 적용해요. 별도 환산 없이 2025년 연간 신고 매출액이 1억 400만원 미만이면 대상이에요.",
  },
  {
    urgent: false,
    q: "작년에 받았는데 올해도 신청할 수 있나요",
    a: "네. 2026년 경영안정 바우처는 별개 예산으로 진행되는 사업이에요. 2025년 부담경감 크레딧을 받았더라도 올해 매출 기준(1억 400만원 미만)을 충족하면 다시 신청할 수 있어요.",
  },
  {
    urgent: false,
    q: "법인사업자도 신청할 수 있나요",
    a: "법인과 개인사업자 모두 소상공인 요건을 충족하면 신청할 수 있어요. 단, 바우처를 사용하는 카드는 사업주 본인 명의의 개인 카드(신용·체크 무관)만 가능해요. 법인카드로는 사용할 수 없어요.",
  },
];

const HUB_LINKS = [
  { title: "소상공인 경영안정 바우처 신청방법", sub: "소상공인24 온라인 접수 절차", href: "/w/소상공인-경영안정-바우처-신청방법" },
  { title: "소상공인 경영안정 바우처 매출 계산 방법", sub: "1억 400만원 기준 정확히 따지는 법", href: "/w/소상공인-경영안정-바우처-매출-계산" },
  { title: "소상공인 경영안정 바우처 탈락했다면?", sub: "거절 이유와 이의신청 방법", href: "/w/소상공인-경영안정-바우처-탈락" },
];

const SIDEBAR_LINKS = [
  "소상공인 경영안정 바우처 대상",
  "소상공인 경영안정 바우처 매출기준",
  "소상공인 경영안정 바우처 제외업종",
  "소상공인 바우처 2025년 개업",
  "소상공인 바우처 매출 환산",
  "소상공인 바우처 중복신청",
  "소상공인 바우처 법인사업자",
  "소상공인 경영안정 바우처 신청방법",
  "소상공인 경영안정 바우처 사용처",
  "소상공인 경영안정 바우처 탈락",
  "소상공인 경영안정 바우처 이의신청",
  "소상공인24 바우처",
  "소상공인시장진흥공단 콜센터",
  "소상공인 경영안정 바우처 25만원",
  "소상공인 바우처 2026 사용기한",
];

const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }: any) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }: any) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }: any) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }: any) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function ApplyButtons() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
      <a href="https://voucher.sbiz24.kr/" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
        📱 바우처 신청하기
      </a>
      <a href="tel:15330600" target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
        📞 콜센터 1533-0600
      </a>
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    sales: {
      title: "매출이 기준 근처라 헷갈린다면",
      color: G, bg: GL,
      text: "2024년 이전 개업자는 2025년 국세청 신고 연매출을 그대로 적용해요. 2025년 개업자는 월 평균 매출 × 12개월로 환산해요. 아래 계산기로 직접 확인해보세요.",
    },
    industry: {
      title: "내 업종이 제외인지 확인하고 싶다면",
      color: "#D97706", bg: "#FFFBEB",
      text: "유흥업·도박·담배도매·가상자산·금융업·병원(보건업)·법무·세무·회계업 등이 제외예요. 헷갈리면 업종코드를 갖고 콜센터(☎1533-0600)에 문의하면 바로 확인할 수 있어요.",
    },
    multiple: {
      title: "사업체가 여러 개라면",
      color: "#7C3AED", bg: "#F5F3FF",
      text: "1인이 다수 사업체를 보유해도 1곳만 신청 가능해요. 매출 기준을 충족하는 사업체 중 1개를 선택해요. 다수 사업체 중 매출 1억 400만원 미만인 곳이 1곳이면 그곳으로 신청하면 돼요.",
    },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "sales",    label: "매출이 1억 언저리라 해당되는지 모르겠어요." },
          { id: "industry", label: "내 업종이 제외 대상인지 확인하고 싶어요." },
          { id: "multiple", label: "사업체가 여러 개인데 어떻게 해야 하나요." },
        ].map(item => (
          <button key={item.id} onClick={(_e: any) => setType(item.id)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
            borderRadius: 8, border: "1px solid #FED7AA", background: "#fff",
            fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left",
          }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );

  const m = messages[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button onClick={(_e: any) => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 매출 계산기 (핵심 컴포넌트)
function SalesCalculator() {
  const [openType, setOpenType] = useState("before"); // before / new2025
  const [annualSales, setAnnualSales] = useState(8000); // 만원
  const [monthlyAvg, setMonthlyAvg] = useState(800);   // 만원
  const LIMIT = 10400; // 1억 400만원

  const calcNew = monthlyAvg * 12;
  const eligible_before = annualSales > 0 && annualSales < LIMIT;
  const eligible_new    = calcNew > 0 && calcNew < LIMIT;

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.7 }}>
        개업 시점을 선택하면 매출 기준 해당 여부를 바로 확인할 수 있어요.
      </p>

      {/* 탭 */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {[
          { id: "before", label: "2024년 이전 개업" },
          { id: "new2025", label: "2025년 개업" },
        ].map(tab => (
          <button key={tab.id} onClick={(_e: any) => setOpenType(tab.id)} style={{
            padding: "8px 18px", borderRadius: 20,
            border: `2px solid ${openType === tab.id ? G : "#e5e7eb"}`,
            background: openType === tab.id ? GL : "#fff",
            cursor: "pointer", fontSize: 13, fontWeight: openType === tab.id ? 700 : 400,
            color: openType === tab.id ? GD : "#374151",
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {openType === "before" && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: "#6b7280", width: 120, flexShrink: 0 }}>2025년 연매출</label>
            <input type="range" min={0} max={15000} step={100} value={annualSales}
              onChange={e => setAnnualSales(+e.target.value)}
              style={{ flex: 1, accentColor: G }} />
            <span style={{ fontSize: 13, fontWeight: 700, minWidth: 90, textAlign: "right", color: "#111" }}>{annualSales.toLocaleString()}만원</span>
          </div>
          <div style={{ padding: "14px 16px", borderRadius: 8, background: eligible_before ? GL : "#FEF2F2", border: `1px solid ${eligible_before ? "#9FE1CB" : "#FCA5A5"}` }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: eligible_before ? G : "#DC2626", marginBottom: 6 }}>
              {eligible_before ? "✅ 지원 대상이에요" : annualSales === 0 ? "⚠️ 매출 0원 — 지원 제외" : "❌ 매출 기준 초과 — 지원 제외"}
            </p>
            <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.7 }}>
              {eligible_before
                ? `2025년 연매출 ${annualSales.toLocaleString()}만원으로 1억 400만원 미만이에요. 업종·개업일 조건도 충족하면 신청 가능해요.`
                : annualSales === 0
                ? "매출 0원(미신고)은 지원 대상에서 제외돼요. 국세청에 매출 신고 후 신청하세요."
                : `2025년 연매출 ${annualSales.toLocaleString()}만원으로 기준(1억 400만원)을 초과해요.`}
            </p>
          </div>
        </>
      )}

      {openType === "new2025" && (
        <>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
            2025년 개업자는 <strong>월 평균 매출 × 12개월</strong>로 연 환산해요.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: "#6b7280", width: 120, flexShrink: 0 }}>개업 후 월 평균 매출</label>
            <input type="range" min={0} max={1500} step={50} value={monthlyAvg}
              onChange={e => setMonthlyAvg(+e.target.value)}
              style={{ flex: 1, accentColor: G }} />
            <span style={{ fontSize: 13, fontWeight: 700, minWidth: 90, textAlign: "right", color: "#111" }}>{monthlyAvg.toLocaleString()}만원/월</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <div style={{ flex: 1, background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "10px 14px" }}>
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>연 환산 매출</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{calcNew.toLocaleString()}만원</p>
              <p style={{ fontSize: 11, color: "#9ca3af" }}>{monthlyAvg.toLocaleString()}만원 × 12개월</p>
            </div>
            <div style={{ flex: 1, background: eligible_new ? GL : "#FEF2F2", borderRadius: 8, border: `1px solid ${eligible_new ? "#9FE1CB" : "#FCA5A5"}`, padding: "10px 14px" }}>
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>기준 대비</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: eligible_new ? G : "#DC2626" }}>
                {eligible_new ? "기준 이하 ✅" : monthlyAvg === 0 ? "매출 없음 ⚠️" : "기준 초과 ❌"}
              </p>
              <p style={{ fontSize: 11, color: "#9ca3af" }}>기준: 1억 400만원</p>
            </div>
          </div>
          {eligible_new && (
            <p style={{ fontSize: 13, color: GD, lineHeight: 1.8, margin: 0 }}>
              연 환산 매출 {calcNew.toLocaleString()}만원으로 기준 미만이에요. 업종·개업일 조건도 충족하면 신청 가능해요.
            </p>
          )}
          {!eligible_new && monthlyAvg > 0 && (
            <p style={{ fontSize: 13, color: "#DC2626", lineHeight: 1.8, margin: 0 }}>
              연 환산 매출 {calcNew.toLocaleString()}만원으로 기준(1억 400만원)을 초과해요.
            </p>
          )}
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
            ※ 1개월 미만 끝수는 1개월로 간주 (부가가치세법 제61조제2항) / 근거: 중소벤처기업부 공고 제2026-37호
          </p>
        </>
      )}
    </div>
  );
}

// ─── 자격 체커
function EligibilityChecker() {
  const [checked, setChecked] = useState({});
  const toggle = id => setChecked(p => ({ ...p, [id]: !p[id] }));
  const allPass = checked.c1 && checked.c2 && checked.c3 && checked.c4;
  const someChecked = Object.values(checked).some(Boolean);

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "c1", label: "2025년 연매출이 0원 초과 1억 400만원 미만이에요", sub: "2025년 개업자는 월 평균 매출 × 12개월로 환산" },
          { id: "c2", label: "사업자등록증 기준 개업일이 2025년 12월 31일 이전이에요", sub: "개업연월일 기준 (발급일자 아님)" },
          { id: "c3", label: "신청일 기준 영업 중이에요 (휴·폐업 아님)", sub: "국세청 신고 기준" },
          { id: "c4", label: "유흥업·도박·금융업·병원 등 제외 업종이 아니에요", sub: "소상공인 정책자금 융자제외 업종 해당 여부 확인 필요" },
        ].map(c => (
          <label key={c.id} onClick={(_e: any) => toggle(c.id)} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: 8, cursor: "pointer",
            border: `1px solid ${checked[c.id] ? G : "#e5e7eb"}`,
            background: checked[c.id] ? GL : "#f9fafb",
          }}>
            <input type="checkbox" checked={!!checked[c.id]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
            <span style={{ fontSize: 13, lineHeight: 1.6 }}>
              {c.label}
              <span style={{ fontSize: 11, color: "#6b7280", display: "block", marginTop: 3 }}>{c.sub}</span>
            </span>
          </label>
        ))}
      </div>
      {allPass && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          ✅ <strong>4가지 모두 해당돼요.</strong> 소상공인24에서 바로 신청하세요.<br />
          바우처 25만원이 선택한 카드에 자동 등록돼요.
        </div>
      )}
      {!allPass && someChecked && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
          충족 안 된 조건이 있어요. 콜센터(☎1533-0600)에 문의하면 내 상황에 맞는 안내를 받을 수 있어요.
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f: any, i: any) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={(_e: any) => setOpen(open === i ? null : i)}
            style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff" }}>
            <span>
              {f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
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

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 소상공인 경영안정 바우처 관련 글</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a key={i} href={link.href} target="_self"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.sub}</span>
            </span>
          </a>
        ))}
      </div>
      <a href="/w/소상공인-경영안정-바우처" target="_self"
        style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>
        소상공인 경영안정 바우처 전체 가이드 보기 →
      </a>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>예산 소진 전에 신청하세요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        대상 확인됐으면 바로 신청하세요.<br />서류 없이 3분이면 완료예요.
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        소상공인24 또는 소상공인경영안정바우처.kr에서 신청하세요.<br />
        신청 후 알림톡으로 선정 여부가 안내돼요.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://voucher.sbiz24.kr/" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none" }}>
          📱 바우처 신청하기
        </a>
        <a href="tel:15330600" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 콜센터 1533-0600
        </a>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>소상공인 경영안정 바우처 관련 글</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" target="_self"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function VoucherEligibilityPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>소상공인 지원 · 중소벤처기업부 · 2026</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          소상공인 경영안정 바우처 받을 수 있을까?<br />
          매출 기준과 제외 대상
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          매출이 딱 1억 언저리라면 계산 방법이 중요해요.<br />
          연 환산 방식이 달라서 같은 매출도 대상이 되기도, 안 되기도 해요.<br /><br />
          아래 계산기와 체커로 내 상황을 바로 확인해보세요.
        </p>

        <ApplyButtons />
        <UrgentBanner />

        <Bdg>내 매출 기준 해당 여부 계산기</Bdg>
        <SalesCalculator />

        <Bdg>최종 자격 체커</Bdg>
        <EligibilityChecker />

        <Divider />

        <H2>연매출 1억 400만원 기준이 정확히 뭔가요</H2>
        <p style={body}>
          2025년 한 해 동안 국세청에 신고한 부가가치세 신고 기준 매출액이에요.<br />
          0원이면 제외, 1억 400만원 이상이면 제외예요. 딱 그 사이만 해당돼요.
        </p>
        <GreenBox title="매출 기준 핵심 정리 (중소벤처기업부 공고 제2026-37호)">
          기준: 2025년 연매출 0원 초과 1억 400만원 미만<br />
          산정: 소상공인시장진흥공단이 국세청 신고 매출액을 자동 확인<br />
          2024년 이전 개업: 2025년 국세청 신고 연매출 그대로 적용<br />
          2025년 개업: 개업 이후 월 평균 매출 × 12개월로 환산
        </GreenBox>
        <div style={{ background: "#FFF7ED", borderRadius: 10, padding: "16px 18px", margin: "12px 0 1.2rem", border: "1px solid #FED7AA" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 8 }}>⚠️ 잘못된 계산 vs 올바른 계산 (2025년 개업자)</p>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>
            예시: 2025년 10월 20일 개업, 2025년 매출 2,500만원<br />
            <span style={{ color: "#DC2626" }}>❌ 잘못된 계산: (2,500만원 ÷ 72일) × 365일 = 1억 2,674만원 → 기준 초과</span><br />
            <span style={{ color: G }}>✅ 올바른 계산: (2,500만원 ÷ 3개월) × 12개월 = 1억원 → 기준 이하 (지원 대상)</span><br />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>※ 1개월 미만 끝수는 1개월로 간주 (부가가치세법 제61조제2항)</span>
          </p>
        </div>

        <Divider />

        <H2>2025년에 개업했는데 바우처 신청할 수 있나요</H2>
        <p style={body}>
          네, 신청 가능해요. 단 매출 계산 방식이 다르니 꼭 확인하세요.<br />
          개업 이후 월 평균 매출 × 12개월로 연 환산해서 1억 400만원 미만이면 돼요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { label: "2024년 12월 31일 이전 개업", method: "2025년 국세청 신고 1년 매출액 적용", ok: true },
            { label: "2025년 1월 1일 ~ 12월 31일 개업", method: "개업 이후 월 평균 매출 × 12개월로 환산", ok: true },
            { label: "2025년 12월 31일 이후 개업", method: "개업일 기준 미충족 — 신청 불가", ok: false },
          ].map((row: any, i: any) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 14px", borderRadius: 8, background: row.ok ? GL : "#FEF2F2", border: `1px solid ${row.ok ? "#9FE1CB" : "#FCA5A5"}` }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: row.ok ? G : "#DC2626", flexShrink: 0, marginTop: 1 }}>{row.ok ? "✅" : "❌"}</span>
              <span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 3 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{row.method}</span>
              </span>
            </div>
          ))}
        </div>

        <Divider />

        <H2>어떤 업종은 신청이 안 되나요</H2>
        <p style={body}>
          소상공인 정책자금 융자제외 업종은 신청이 안 돼요.<br />
          대표적인 제외 업종을 아래에서 확인하세요. 헷갈리면 업종코드로 콜센터에 문의하세요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {EXCLUDED_INDUSTRIES.map((item: any, i: any) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #FCA5A5" }}>
              <span style={{ fontSize: 14, color: "#DC2626", flexShrink: 0, marginTop: 1 }}>❌</span>
              <span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block", marginBottom: 2 }}>{item.label}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{item.detail}</span>
              </span>
            </div>
          ))}
        </div>
        <BorderBox title="제외 업종이지만 일부 신청 가능한 경우">
          부동산업 중 부동산관리업(6821) · 6개월 이상 영업 중인 부동산 중개·대리업(68221) · 공유오피스·공유주방을 운영하는 비주거용건물임대업(68112)은 신청 가능해요.<br />
          보건업(86) 중 유사의료업(86902)도 신청 가능해요.<br />
          시각장애인이 운영하는 안마원·안마시술소도 신청 가능해요.
        </BorderBox>

        <Divider />

        <H2>사업체가 여러 개면 다 신청할 수 있나요</H2>
        <p style={body}>
          안 돼요. 1인 1개사 원칙이에요.<br />
          사업체가 3개 있어도 매출 기준을 충족하는 1개 사업체만 신청할 수 있어요.
        </p>
        <GreenBox title="다수 사업체 보유 시 예시 (공고문 기준)">
          A업장 매출 4억원 / B업장 매출 1억원 / C업장 매출 5억원인 경우<br />
          → 매출 1억 400만원 미만인 B업장으로만 신청 가능<br />
          공동대표로 운영하는 사업체는 주대표 1인만 신청 가능해요.<br />
          법인·개인 무관 동일 적용이에요.
        </GreenBox>

        <HubLinks />

        <H2>소상공인 경영안정 바우처 대상, 자주 하는 질문</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />

        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "중소벤처기업부 공고 제2026-37호 — 소상공인 경영안정 바우처 지원사업 시행 공고", url: "https://voucher.sbiz24.kr/" },
              { label: "소상공인 경영안정 바우처 신청 사이트 (소상공인경영안정바우처.kr)", url: "https://voucher.sbiz24.kr/" },
              { label: "소상공인 경영안정 바우처 전용 콜센터 ☎1533-0600", url: "tel:15330600" },
            ].map(item => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, lineHeight: 1.7 }}>
            이 글은 중소벤처기업부 공고 제2026-37호(2026.1.28.)를 기준으로 작성됐어요. 지원 내용은 정부 정책에 따라 변경될 수 있으니 신청 전 공식 사이트에서 확인하세요.
          </p>
        </div>

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 정보 제공 목적으로 작성됐어요. 정확한 지원 자격 및 결과는 소상공인24 또는 소상공인시장진흥공단(☎1533-0600)에서 최종 확인하세요.
          ※ 지원금액 25만원 / 매출기준 1억 400만원 미만 / 사용기한 2026년 12월 31일 (미사용 잔액 국고 회수) / 근거: 중소벤처기업부 공고 제2026-37호
        </div>
      </div>
    </div>
  );
}
