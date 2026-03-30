import { useState } from "react";

// ─── 핵심 데이터 (JSON 검증 기준)
// 출처: 지방세법 제103조의22, 행정안전부 보도자료
// 분할납부_대상: 납부세액 100만원 초과
// 분할납부_기한_일반: 1개월 이내
// 분할납부_기한_중소기업: 2개월 이내
// 분할납부_금액1: 납부세액 100만원초과~200만원이하 → 100만원 초과분
// 분할납부_금액2: 납부세액 200만원초과 → 납부세액의 50% 이하
// 분할납부_신청방법: 위택스 신고 화면에서 선택
// 신고기한: 4월 30일 (신고는 기한 내, 분할분 납부만 기한 연장)

const SPOKE_LINKS = [
  { title: "법인지방소득세 위택스 신고, 처음인데 어떻게 하나요?", sub: "단계별 절차와 서울 이택스 차이", href: "/w/법인지방소득세-위택스-신고방법" },
  { title: "법인지방소득세, 법인세의 10%라는데 그냥 10% 곱하면 되나요?", sub: "세율과 산출세액 계산법", href: "/w/법인지방소득세-세율-계산" },
  { title: "법인지방소득세 안분신고, 사업장이 두 곳 이상이면 어떻게 나눠 내나요?", sub: "안분 계산 공식과 위택스 작성법", href: "/w/법인지방소득세-안분신고" },
  { title: "법인지방소득세 신고를 못 했다면?", sub: "무신고 가산세와 기한 후 신고 방법", href: "/w/법인지방소득세-가산세-기한후신고" },
];

const SIDEBAR_LINKS = [
  "법인지방소득세 분할납부",
  "법인지방소득세 분할납부 조건",
  "법인지방소득세 분할납부 신청",
  "법인지방소득세 분할납부 기한",
  "법인지방소득세 중소기업 분할납부",
  "법인지방소득세 100만원 초과",
  "위택스 분할납부",
  "법인지방소득세 납부 나눠서",
  "법인지방소득세 분할납부 금액",
  "지방세법 103조 분할납부",
  "법인지방소득세 4월 30일",
  "법인세 지방소득세 분납",
  "법인지방소득세 중소기업 2개월",
  "위택스 법인지방소득세 신고",
  "법인지방소득세 납부방법",
];

const FAQS = [
  {
    urgent: true,
    q: "법인지방소득세 분할납부 대상이 되는 조건이 뭔가요",
    a: "납부세액이 100만원을 초과하면 분할납부가 가능해요. 예를 들어 납부세액이 150만원이라면 100만원 초과분인 50만원을 나중에 낼 수 있어요. 200만원을 초과하면 납부세액의 50% 이하를 분할납부할 수 있어요.",
  },
  {
    urgent: true,
    q: "분할납부 기한이 얼마나 되나요",
    a: "일반 법인은 신고납부기한(4월 30일)으로부터 1개월 이내, 중소기업은 2개월 이내예요. 단, 신고는 4월 30일까지 완료해야 하고, 분할분만 납부기한이 연장돼요.",
  },
  {
    urgent: false,
    q: "위택스에서 분할납부는 어떻게 신청하나요",
    a: "위택스 신고 화면에서 법인지방소득세를 입력할 때 분할납부 항목을 선택하면 돼요. 신고 완료 후 분할납부를 따로 신청하는 게 아니라 신고할 때 미리 선택해야 해요.",
  },
  {
    urgent: false,
    q: "중소기업 여부는 어떻게 판단하나요",
    a: "법인세법상 중소기업 요건을 충족하면 중소기업으로 분류돼요. 일반적으로 매출액 기준으로 업종별 중소기업 기준을 확인하면 돼요. 법인세 신고 시 중소기업 여부가 확정되므로 그 기준을 그대로 적용하면 돼요.",
  },
  {
    urgent: false,
    q: "분할납부 기한을 놓치면 어떻게 되나요",
    a: "분할납부 기한을 초과하면 납부지연 가산세(미납세액 × 미납일수 × 22/100,000)가 붙어요. 분할납부 신청을 했더라도 기한 내에 납부하지 않으면 가산세 대상이에요.",
  },
  {
    urgent: false,
    q: "법인세 분납과 법인지방소득세 분할납부를 동시에 할 수 있나요",
    a: "네. 법인세 분납과 법인지방소득세 분할납부는 별개예요. 법인세는 홈택스에서, 법인지방소득세는 위택스에서 각각 따로 신청하면 돼요.",
  },
];

const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }) {
  return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>;
}

// ─── 분할납부 계산기
function SplitCalc() {
  const [tax, setTax]   = useState(300);
  const [isSme, setIsSme] = useState(false);

  let immediate = 0, deferred = 0;
  if (tax <= 100)       { immediate = tax; deferred = 0; }
  else if (tax <= 200)  { immediate = 100; deferred = tax - 100; }
  else                  { deferred = Math.floor(tax * 0.5); immediate = tax - deferred; }

  const deadline = isSme ? "2개월" : "1개월";

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        납부세액을 입력하면 분할납부 가능 금액과 기한이 나와요.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <label style={{ fontSize: 13, color: "#6b7280", width: 90, flexShrink: 0 }}>납부세액</label>
        <input type="range" min={0} max={5000} step={10} value={tax}
          onChange={e => setTax(+e.target.value)} style={{ flex: 1, accentColor: G }} />
        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 80, textAlign: "right" }}>{tax}만원</span>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        {[
          { id: false, label: "일반 법인" },
          { id: true,  label: "중소기업" },
        ].map(opt => (
          <button key={String(opt.id)} onClick={() => setIsSme(opt.id)} style={{
            flex: 1, padding: "9px 14px", borderRadius: 8, cursor: "pointer",
            border: `2px solid ${isSme === opt.id ? G : "#e5e7eb"}`,
            background: isSme === opt.id ? GL : "#fff",
            fontSize: 13, fontWeight: isSme === opt.id ? 700 : 400, color: isSme === opt.id ? GD : "#374151",
          }}>
            {opt.label}
          </button>
        ))}
      </div>
      {tax <= 100 ? (
        <div style={{ padding: "14px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280", textAlign: "center" }}>
          납부세액 100만원 이하는 분할납부 대상이 아니에요. 4월 30일까지 전액 납부해야 해요.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {[
            { label: "4월 30일까지 납부",  val: `${immediate}만원`, sub: "신고기한 내 납부",     color: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5" },
            { label: `${deadline} 이내 납부`, val: `${deferred}만원`, sub: "분할납부 가능 금액",  color: G, bg: GL, border: "#9FE1CB" },
            { label: "분할납부 기한",       val: deadline,           sub: isSme ? "중소기업 혜택" : "일반 법인", color: "#374151", bg: "#fff", border: "#e5e7eb" },
          ].map(card => (
            <div key={card.label} style={{ background: card.bg, borderRadius: 8, padding: "11px 12px", border: `1px solid ${card.border}` }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: card.color, marginBottom: 3 }}>{card.val}</div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>{card.sub}</div>
            </div>
          ))}
        </div>
      )}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 100만원초과~200만원이하: 100만원 초과분 분할. 200만원 초과: 납부세액 50% 이하 분할. 근거: 지방세법 제103조의22.
      </p>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)}
            style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff" }}>
            <span>{f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}{f.q}</span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>}
        </div>
      ))}
    </div>
  );
}

function SpokeLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 법인지방소득세 관련 글</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {SPOKE_LINKS.map((link, i) => (
          <a key={i} href={link.href} target="_self"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 4px", borderBottom: i < SPOKE_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.sub}</span>
            </span>
          </a>
        ))}
      </div>
      <a href="/w/법인지방소득세" target="_self"
        style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", padding: "8px", borderRadius: 6, background: GL }}>
        법인지방소득세 전체 가이드 보기 →
      </a>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>신고는 4월 30일까지, 분할분은 이후에</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>
        분할납부 선택은 신고할 때 해야 해요.<br />
        신고 후에는 변경이 안 돼요.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, maxWidth: 480, margin: "22px auto 0" }}>
        <a href="https://www.wetax.go.kr" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none" }}>
          💻 위택스 신고하기
        </a>
        <a href="tel:110" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          📞 콜센터 ☎110
        </a>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>관련 검색어</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" target="_self"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SplitPaymentPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>법인세금 · 분할납부 · 지방세법</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          법인지방소득세 100만원 넘으면 나눠 낼 수 있나요?<br />
          분할납부 조건과 신청방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          납부세액이 100만원을 초과하면 분할납부가 가능해요.<br />
          일반 법인은 1개월, 중소기업은 2개월 이내에 나머지를 내면 돼요.<br />
          단, 신고할 때 분할납부를 선택해야 해요. 신고 완료 후에는 변경이 안 돼요.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
          <a href="https://www.wetax.go.kr" target="_self"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: G, color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
            💻 위택스 신고하기
          </a>
          <a href="tel:110" target="_self"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
            📞 콜센터 ☎110
          </a>
        </div>

        <Divider />

        <H2>분할납부 대상이 되는 조건이 뭔가요</H2>
        <p style={body}>납부세액 100만원 초과면 가능해요. 금액에 따라 분할 가능 금액이 달라요.</p>
        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["납부세액", "4월 30일 납부 (필수)", "분할납부 가능 금액", "분할납부 기한"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { range: "100만원 이하",       now: "전액",          split: "분할납부 불가",        deadline: "—" },
                { range: "100만원 초과~200만원", now: "100만원",      split: "100만원 초과분",       deadline: "일반 1개월 / 중소 2개월" },
                { range: "200만원 초과",        now: "납부세액 50% 이상", split: "납부세액의 50% 이하", deadline: "일반 1개월 / 중소 2개월" },
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", fontWeight: 500 }}>{row.range}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: "#DC2626", fontWeight: 600 }}>{row.now}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: G, fontWeight: 600 }}>{row.split}</td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid #f3f4f6", color: "#6b7280" }}>{row.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>근거: 지방세법 제103조의22</p>
        </div>

        <Divider />

        <H2>분할납부 금액을 얼마까지 나눌 수 있나요</H2>
        <Bdg>분할납부 계산기 — 납부세액과 법인 구분을 선택해보세요</Bdg>
        <SplitCalc />

        <Divider />

        <H2>중소기업은 분할납부 기한이 더 긴가요</H2>
        <p style={body}>
          네. 중소기업은 분할납부 기한이 2개월이에요. 일반 법인은 1개월이에요.
        </p>
        <GreenBox title="분할납부 기한 비교 (지방세법 제103조의22)">
          일반 법인: 신고납부기한(4월 30일)으로부터 1개월 이내 (5월 31일까지)<br />
          중소기업: 신고납부기한(4월 30일)으로부터 2개월 이내 (6월 30일까지)<br /><br />
          ⚠️ 신고는 반드시 4월 30일까지 — 분할납부를 신청해도 신고 기한은 동일해요
        </GreenBox>

        <Divider />

        <H2>위택스에서 분할납부 신청하는 방법이 어떻게 되나요</H2>
        <p style={body}>
          신고 화면에서 분할납부를 선택하면 돼요. 신고 완료 후에는 선택이 안 되니 신고 전에 꼭 확인하세요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {[
            { n: "①", text: "위택스 → 신고하기 → 지방소득세 → 법인소득분" },
            { n: "②", text: "과세표준 입력 후 산출세액 확인" },
            { n: "③", text: "납부세액 100만원 초과 시 분할납부 항목 체크" },
            { n: "④", text: "분할납부 금액 입력 (자동 계산 가능)" },
            { n: "⑤", text: "신고 제출 → 4월 30일까지 즉시납부분 납부" },
            { n: "⑥", text: "분할납부 기한(1개월 또는 2개월) 내 나머지 납부" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "9px 14px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: G, flexShrink: 0 }}>{s.n}</span>
              <span style={{ fontSize: 13, color: "#374151" }}>{s.text}</span>
            </div>
          ))}
        </div>

        <SpokeLinks />
        <H2>법인지방소득세 분할납부, 자주 하는 질문</H2>
        <FAQ />
        <CTA />
        <Divider />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          ※ 분할납부 대상: 납부세액 100만원 초과 / 일반법인 기한: 1개월 / 중소기업 기한: 2개월 / 신고기한: 4월 30일 (변경없음) / 근거: 지방세법 제103조의22 / 위택스: wetax.go.kr / 콜센터: ☎110
        </div>
      </div>
    </div>
  );
}
