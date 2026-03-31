"use client";
// @ts-nocheck
import { useState } from "react";
const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: any) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: any) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: any) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }: any) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
const SIDEBAR_LINKS = ["출산전후휴가 급여","배우자 출산휴가","육아휴직 기간","육아휴직 급여 계산","출산휴가 신청 방법","고용보험 출산급여","임신부 보호휴가","유산 사산 휴가","유산 후 휴가","임신 중 근로조건","근로기준법 모성보호","사업주 출산 지원금","배우자 출산휴가 거부","출산휴가 중 해고","육아기 근로시간 단축","육아 지원금","임신 출산 진료비","고운맘카드 사용처","산후조리원 지원","대한법률구조공단"];
const FAQS = [
  { urgent: true, q: "배우자 출산휴가 20일은 모두 유급인가요?", a: "네. 배우자 출산휴가 20일 전체가 유급이에요. 중소기업(우선지원대상기업)은 고용보험에서 통상임금 100%를 지급해요. 대기업은 최초 5일은 사업주 지급, 나머지 15일은 고용보험에서 지급해요. 2025. 2. 23. 시행으로 10일에서 20일로 늘었어요. 3회 분할(최대 4번) 사용 가능, 사용 기한도 90일에서 120일로 확대됐어요." },
  { urgent: true, q: "배우자 출산휴가를 회사가 거부할 수 있나요?", a: "안 돼요. 배우자 출산휴가는 근로자의 법적 권리예요(남녀고용평등법 18조의2). 사업주가 거부하면 500만원 이하의 과태료가 부과돼요. 거부당하면 고용노동부 고객상담센터(1350)에 신고하세요." },
  { urgent: false, q: "출산전후휴가 급여는 얼마인가요?", a: "우선지원대상기업(중소기업): 고용보험에서 통상임금 100% 지급 (상한 월 약 238만원)\n대기업: 최초 60일은 사업주, 이후 30일은 고용보험에서 지급 (상한 월 238만원)\n신청: 휴가 종료일로부터 12개월 이내에 고용보험 홈페이지(ei.go.kr) 또는 근로복지공단에 신청하세요." },
  { urgent: false, q: "쌍둥이를 낳으면 출산전후휴가가 더 길어지나요?", a: "쌍둥이 이상(다태아)이면 출산전후휴가가 120일(일반 90일)이에요. 산후 60일(일반 45일) 이상 확보해야 해요. 급여도 고용보험에서 120일 기준으로 지급해요." },
  { urgent: false, q: "출산전후휴가 중 해고가 가능한가요?", a: "출산전후휴가 기간과 그 후 30일 동안은 해고가 금지돼요(근로기준법 23조). 이 기간에 해고하면 5년 이하 징역 또는 5,000만원 이하 벌금이에요. 해고 통보를 받으면 즉시 노동위원회(부당해고 구제신청) 또는 고용노동부(1350)에 신고하세요." },
];
function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    husband: { title: "배우자 출산휴가를 신청하려 해요", color: G, bg: GL, text: "배우자 출산휴가는 출산 후 120일 이내에 3회 분할(최대 4번)하여 20일을 쓸 수 있어요. 회사에 '배우자 출산휴가 신청서'를 제출하세요. 거부 시 1350에 신고하세요." },
    mother: { title: "출산전후휴가를 신청하려 해요", color: "#7C3AED", bg: "#F5F3FF", text: "출산전후휴가는 출산 전후 90일(다태아 120일)이에요. 산후 45일(다태아 60일) 이상 확보해야 해요. 고용보험(ei.go.kr)에서 급여를 신청하세요." },
    refuse: { title: "회사가 휴가를 거부했어요", color: "#DC2626", bg: "#FEF2F2", text: "배우자 출산휴가 거부 시 사업주에게 500만원 이하 과태료가 부과돼요. 고용노동부 고객상담센터(1350)에 지금 바로 신고하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ id: "husband", label: "남편(아내)이 배우자 출산휴가를 쓰려고 해요." },{ id: "mother", label: "출산전후휴가(산전산후 휴가)를 신청하려 해요." },{ id: "refuse", label: "회사가 휴가 신청을 거부했어요." }].map((item) => (
          <button key={item.id} onClick={() => setType(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
  const m = msgs[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button onClick={() => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}
function PayCalc() {
  const [wage, setWage] = useState(350);
  const [isSME, setIsSME] = useState(true);
  const [twins, setTwins] = useState(false);
  const days = twins ? 120 : 90;
  const cap = 238;
  const govDays = isSME ? days : 30;
  const govPay = Math.min(wage, cap) * govDays / 30;
  const bizPay = isSME ? 0 : Math.min(wage, cap) * (days - 30) / 30;
  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>통상임금과 직장 규모를 입력하면 출산전후휴가 급여를 확인할 수 있어요.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>월 통상임금 (만원): {wage}</label>
          <input type="range" min={200} max={600} step={10} value={wage} onChange={e => setWage(+e.target.value)} style={{ width: "100%", accentColor: G }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>직장 구분</label>
          <select value={isSME ? "중소기업" : "대기업"} onChange={e => setIsSME(e.target.value === "중소기업")} style={{ width: "100%", padding: "6px 8px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}>
            <option>중소기업</option>
            <option>대기업</option>
          </select>
        </div>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer", marginBottom: 14 }}>
        <input type="checkbox" checked={twins} onChange={e => setTwins(e.target.checked)} style={{ accentColor: G }} />
        쌍둥이 이상 (다태아) 120일 적용
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { label: "총 출산전후휴가", val: `${days}일`, sub: twins ? "다태아" : "단태아" },
          { label: "고용보험 급여", val: `약 ${Math.round(govPay).toLocaleString()}만원`, sub: `${govDays}일 기준 상한 ${cap}만원/월` },
          ...(isSME ? [] : [{ label: "사업주 지급", val: `약 ${Math.round(bizPay).toLocaleString()}만원`, sub: `${days - 30}일 기준` }]),
        ].map((c, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "10px 12px" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>{c.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: G }}>{c.val}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{c.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>참고용이에요. 실제 급여는 고용보험 홈페이지(ei.go.kr)에서 모의계산할 수 있어요.</p>
    </div>
  );
}
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)} style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff" }}>
            <span>{f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}{f.q}</span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>}
        </div>
      ))}
    </div>
  );
}
function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>출산휴가 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}
export default function ChulSanHyugaPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>출산휴가 · 배우자 출산휴가 · 급여</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>출산휴가 배우자출산휴가 |<br />배우자 출산휴가 20일·급여 계산·신청 방법</h1>
        <p style={{ ...body, fontSize: 15 }}>
          2025년 2월 23일부터 배우자 출산휴가가 10일에서 20일로 늘었어요.<br />
          많은 분이 아직 10일인 줄 알고 계세요. 지금 바로 확인하고 신청하세요.<br /><br />
          출산전후휴가 급여도 모르면 못 받는 돈이에요. 아래에서 내 급여를 먼저 계산해보세요.
        </p>
        <UrgentBanner />

        {/* H2 ① */}
        <Bdg>급여 금액 먼저 계산하세요</Bdg>
        <H2>출산전후휴가 급여 계산</H2>
        <p style={body}>직장 규모와 통상임금을 입력하면 받을 수 있는 급여를 확인할 수 있어요.</p>
        <PayCalc />
        <GreenBox title="2025년 2월 시행 핵심">
          배우자 출산휴가: 10일 → 20일 (법률 개정 2024. 10. 22. / 시행 2025. 2. 23.)<br />
          분할 사용: 3회 분할, 최대 4번에 나눠 사용 가능 / 사용 기한: 출산 후 120일 이내<br />
          급여: 전액 유급 (중소기업은 고용보험에서 통상임금 100%, 상한 월 238만원)
        </GreenBox>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 관련 제도도 함께 보세요</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { title: "육아휴직 급여 계산 | 통상임금 기준과 상한 확인", desc: "출산전후휴가 후 이어서 신청 가능", href: "#" },
              { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "고용보험 관련 법률 지원", href: "#" },
            ].map((link, i) => (
              <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i === 0 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
                <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
              </a>
            ))}
          </div>
        </div>

        <Divider />

        {/* H2 ② */}
        <H2>출산전후휴가 vs 배우자 출산휴가 한눈에 비교</H2>
        <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: GL }}>
                {["구분","출산전후휴가 (산모)","배우자 출산휴가"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: GD, borderBottom: "2px solid #9FE1CB" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["기간","90일 (다태아 120일)","20일 (2024. 10. 개정)"],
                ["대상","출산한 근로자","배우자가 출산한 근로자"],
                ["사용 기간","출산 전후","출산 후 120일 이내"],
                ["분할","60일+30일","3회 분할(최대 4번)"],
                ["급여","고용보험+사업주","전액 고용보험"],
                ["거부 시","부당해고 등 보호","과태료 500만원 이하"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  {row.map((cell, j) => <td key={j} style={{ padding: "9px 12px", fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Divider />

        {/* H2 ③ */}
        <H2>출산전후휴가 급여 신청 방법</H2>
        <p style={body}>
          모르면 못 받아요. 출산 후 1개월 이내에 신청해야 해요.
        </p>
        <BorderBox title="출산전후휴가 급여 신청 절차">
          ① 회사에 출산전후휴가 신청서 제출 (출산 전 미리 제출 가능)<br />
          ② 출산 후 고용보험 홈페이지(ei.go.kr) 또는 근로복지공단에 급여 신청<br />
          ③ 신청 기한: 휴가 종료일로부터 12개월 이내 (놓치면 못 받아요)
          ④ 우선지원대상기업(중소기업): 전액 고용보험 지급<br />
          ⑤ 대기업: 최초 60일 사업주 지급 + 이후 30일 고용보험 지급
        </BorderBox>
        <BorderBox title="배우자 출산휴가 급여 신청 절차">
          ① 회사에 배우자 출산휴가 신청서 제출 (출산 후 120일 이내 사용)<br />
          ② 중소기업: 고용보험 홈페이지에서 배우자 출산휴가 급여 신청<br />
          ③ 대기업: 최초 5일 사업주 지급 + 나머지 15일 고용보험 지급<br />
          ④ 신청 기한: 휴가 종료일로부터 12개월 이내
        </BorderBox>

        <Divider />

        {/* H2 ④ */}
        <H2>회사가 거부하면 지금 당장 이렇게 하세요</H2>
        <p style={body}>
          배우자 출산휴가는 법적 권리예요. 거부하면 과태료가 부과돼요.<br />
          출산전후휴가 중 해고도 금지돼요. 권리를 지키세요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { case: "배우자 출산휴가 거부", badge: "과태료 500만원 이하",
              desc: "남녀고용평등법 제18조의2 위반이에요. 지금 바로 고용노동부 고객상담센터(1350)에 신고하세요." },
            { case: "출산전후휴가 중 해고 통보", badge: "5년 이하 징역",
              desc: "출산전후휴가 기간과 그 후 30일 동안은 해고가 금지돼요(근로기준법 23조). 즉시 노동위원회에 부당해고 구제신청을 하세요." },
            { case: "급여를 사업주가 안 줘요", badge: "고용보험 직접 신청",
              desc: "우선지원대상기업은 사업주가 아니라 고용보험에서 직접 지급해요. ei.go.kr에서 직접 신청하세요." },
          ].map((item, i) => (
            <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{item.case}</span>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: "#FEF2F2", color: "#DC2626", fontWeight: 600 }}>{item.badge}</span>
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.85 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
          <a href="tel:1350" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>📞 고용노동부 1350</a>
          <a href="https://www.ei.go.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}` }}>🌐 고용보험 바로가기</a>
        </div>

        <Divider />

        {/* H2 ⑤ FAQ */}
        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />
        <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>모르면 못 받는 돈이에요</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>고용보험 홈페이지에서<br />지금 신청하세요.</p>
          <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
            <a href="https://www.ei.go.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>🌐 고용보험 신청</a>
            <a href="tel:1350" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}` }}>📞 고용노동부 1350</a>
          </div>
        </div>
        <Divider />
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          {[
            { label: "근로기준법 제74조 — 출산전후휴가 90일 (다태아 120일)", url: "https://www.law.go.kr/" },
            { label: "남녀고용평등법 제18조의2 — 배우자 출산휴가 20일 (2025. 2. 23. 시행)", url: "https://www.law.go.kr/" },
            { label: "고용보험 홈페이지 — 출산전후휴가 급여 신청", url: "https://www.ei.go.kr" },
            { label: "고용노동부 고객상담센터 — 1350", url: "tel:1350" },
          ].map((item) => (
            <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none", marginBottom: 4 }}>
              <span style={{ color: G, fontSize: 11 }}>↗</span>{item.label}
            </a>
          ))}
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요.</p>
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>이 글은 법률 정보 제공을 목적으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 고용노동부(1350) 또는 근로복지공단에 상담하세요.</div>
      </div>
    </div>
  );
}
