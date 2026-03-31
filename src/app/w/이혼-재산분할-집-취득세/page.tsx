"use client";
import { useState } from "react";

const SIDEBAR_LINKS = ["이혼 재산분할 비율","재산분할 대상 범위","재산분할 청구 기한","이혼 위자료 청구","이혼 친권·양육권","이혼 양육비 청구","이혼 전 재산 빼돌림","이혼 퇴직금 재산분할","이혼 시부모 증여 토지","이혼 빚 공동부담","이혼 후 공동명의 대출","협의이혼 절차","이혼 무료 법률상담","별거 중 이혼 가능한가","이혼 소송 증거 수집","이혼 일방 거부","양육비 미지급 대응","면접교섭권 신청","개인파산 면책 신청","소액사건 소장 작성"];

const HUB_LINKS = [
  { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "재산분할 비율 결정 기준 전체 정리", href: "#" },
  { title: "재산분할 대상 범위 | 혼인 전 재산·퇴직금·부모 증여 포함 여부", desc: "어떤 재산이 분할 대상인지 확인", href: "#" },
  { title: "이혼 퇴직금 재산분할 | 재직 중 이혼해도 나눠야 하나요?", desc: "퇴직금 재산분할 기준 확인", href: "#" },
  { title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인", desc: "위자료 vs 재산분할 세금 차이", href: "#" },
];

const TAX_TABLE = [
  { item: "취득세", rate: "1.5%", note: "재산분할 특례세율 (일반 무상취득 3.5%에서 감면)", highlight: true },
  { item: "지방교육세", rate: "0.3%", note: "취득세의 20%" },
  { item: "농어촌특별세", rate: "0% (국민주택 이하)", note: "주택 전용면적 85㎡ 이하는 비과세" },
  { item: "양도소득세", rate: "없음", note: "재산분할은 유상양도로 보지 않음" },
  { item: "증여세", rate: "없음", note: "부부 공동재산 분할로 증여에 해당 안 함" },
  { item: "소득세", rate: "없음", note: "소득세법상 소득 해당 안 함" },
];

const FAQS = [
  { urgent: true, q: "이혼 재산분할로 집을 받으면 취득세를 얼마나 내야 하나요?", a: "재산분할로 부동산을 받으면 취득세 1.5% + 지방교육세 0.3% = 1.8%예요. 농어촌특별세는 주택 전용면적 85㎡ 이하이면 비과세예요. 예를 들어 시가 5억원 아파트를 재산분할로 받으면 취득세는 약 900만원이에요. 취득세는 소유권 이전 등기 전에 납부해야 해요." },
  { urgent: true, q: "위자료로 집을 받으면 취득세가 다른가요?", a: "네, 크게 달라요. 재산분할은 취득세 1.5%지만, 위자료로 집을 받으면 3.5%예요. 5억원 집이면 위자료 명목으로 받으면 취득세 1,750만원, 재산분할 명목으로 받으면 취득세 750만원이에요. 1,000만원 차이가 나요. 협의이혼 시 재산분할 명목으로 기재하는 게 세금 면에서 유리해요." },
  { urgent: false, q: "재산분할로 집을 받으면 나중에 팔 때 양도소득세는 어떻게 계산하나요?", a: "재산분할로 받은 집은 기존 소유자의 취득시기와 취득가액을 그대로 가져와요. 예를 들어 배우자가 10년 전 3억원에 산 집을 재산분할로 받았다면, 내 취득가액도 3억원, 취득시기도 10년 전이에요. 나중에 팔 때 시가에서 3억원을 뺀 차익에 양도소득세가 부과돼요." },
  { urgent: false, q: "이혼 합의서에 재산분할과 위자료를 따로 구분해야 하나요?", a: "네, 반드시 구분해서 적어야 해요. '재산분할' 명목과 '위자료' 명목에 따라 취득세율이 달라지고, 위자료는 주는 사람에게 양도소득세가 부과될 수 있어요. 합의서에 명확하게 구분해서 기재하면 나중에 세금 분쟁을 예방할 수 있어요." },
  { urgent: false, q: "다주택자인데 재산분할로 집을 받으면 취득세가 중과되나요?", a: "아니에요. 재산분할로 인한 취득은 무상취득으로 분류되어 다주택 중과 대상이 아니에요. 다주택 취득세 중과는 유상취득(매매·교환)에만 적용돼요. 재산분할은 중과세율 없이 1.5%만 납부하면 돼요." },
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }: any) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;

function TaxCalc() {
  const [price, setPrice] = useState(500);
  const [area, setArea] = useState("85이하");
  const acq = Math.round(price * 10000 * 0.015);
  const edu = Math.round(price * 10000 * 0.003);
  const rural = area === "85이하" ? 0 : Math.round(price * 10000 * 0.002);
  const total = acq + edu + rural;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14 }}>🏠 재산분할 취득세 계산기</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div><label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>부동산 시가 (만원)</label>
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} /></div>
        <div><label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>주택 규모</label>
          <select value={area} onChange={e => setArea(e.target.value)} style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}>
            <option value="85이하">전용 85㎡ 이하</option>
            <option value="85초과">전용 85㎡ 초과</option>
          </select></div>
      </div>
      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px" }}>
        {[
          { label: "취득세 (1.5%)", value: acq },
          { label: "지방교육세 (0.3%)", value: edu },
          { label: `농어촌특별세 (${area === "85이하" ? "비과세" : "0.2%"})`, value: rural },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 6, marginBottom: 6, borderBottom: "1px solid #e5e7eb" }}>
            <span style={{ fontSize: 13, color: "#374151" }}>{row.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{row.value.toLocaleString()}원</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>합계 납부액</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: G }}>{total.toLocaleString()}원</span>
        </div>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, lineHeight: 1.7 }}>재산분할 명목으로 받는 경우에만 적용돼요. 위자료 명목이면 취득세 3.5%가 적용돼요. 등기 전에 납부해야 해요.</p>
      </div>
    </div>
  );
}

function TaxTable() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr", background: "#f9fafb", padding: "8px 14px", borderBottom: "1px solid #e5e7eb" }}>
        {["세금 종류", "세율", "비고"].map(h => <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>{h}</span>)}
      </div>
      {TAX_TABLE.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr", padding: "10px 14px", borderBottom: i < TAX_TABLE.length - 1 ? "1px solid #f3f4f6" : "none", background: row.highlight ? "#f0fdf9" : "transparent" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{row.item}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: row.highlight ? G : (row.rate === "없음" ? "#6b7280" : "#111") }}>{row.rate}</span>
          <span style={{ fontSize: 12, color: "#6b7280" }}>{row.note}</span>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", lineHeight: 1.5, display: "flex", alignItems: "center", gap: 8 }}>
              {faq.urgent && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10, background: "#FEE2E2", color: "#DC2626", flexShrink: 0 }}>긴급</span>}
              {faq.q}
            </span>
            <span style={{ fontSize: 16, color: "#9ca3af", flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div style={{ padding: "0 14px 14px", fontSize: 13, color: "#374151", lineHeight: 1.9, borderTop: "1px solid #f3f4f6" }}><p style={{ margin: "12px 0 0" }}>{faq.a}</p></div>}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 관련 글도 함께 보세요</p>
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

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼·재산분할 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function IhonJasanBunhalTakseoPAge() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 재산분할 · 취득세</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          이혼 재산분할로 집을 받으면 |<br />
          취득세를 내야 하나요
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          재산분할로 집을 받으면 증여세·양도소득세는 없지만 취득세는 내야 해요.<br />
          다만 일반 증여(3.5%)보다 낮은 1.5% 특례세율이 적용돼요.<br /><br />
          위자료 명목으로 받으면 3.5%가 적용되니, 협의이혼 시 반드시 재산분할 명목으로 기재하세요.<br />
          아래에서 내 집 가격으로 취득세를 바로 계산해볼 수 있어요.
        </p>

        <TaxCalc />

        <H2>재산분할 후 취득세 신청 방법</H2>
        <p style={body}>취득세는 집 소유권 이전 등기 시 납부해요. 이전 등기 신청일로부터 60일 이내에 납부하지 않으면 가산세가 붙어요. 위택스(wetax.go.kr)에서 온라인으로 신고·납부가 가능해요. 등기소에 방문할 때 취득세 납부 영수증을 함께 제출해야 해요.</p>
        <p style={body}>이혼 재산분할은 취득 원인을 반드시 0027재산분할0027로 기재해야 1.5% 특례세율이 적용돼요. 0027위자료0027로 기재하면 3.5%로 올라가요. 협의이혼 합의서 작성 시 반드시 확인하세요.</p>

        <H2>재산분할로 집을 받을 때 세금 정보</H2>
        <p style={body}>
          재산분할은 부부 공동재산을 나누는 것이라 증여세·양도소득세가 없어요.<br />
          취득세만 납부하면 돼요. '재산분할' 명목으로 기재할 때만 1.5% 특례세율이 적용돼요.
        </p>
        <TaxTable />
        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>재산분할 vs 위자료 — 세금 차이가 커요</strong>
          재산분할 취득세: 1.5% → 5억 집이면 약 750만원<br />
          위자료 취득세: 3.5% → 5억 집이면 약 1,750만원 (+1,000만원 차이)<br />
          위자료로 주는 사람은 양도소득세까지 부담할 수 있어요. 협의이혼이라면 합의서에 '재산분할' 명목으로 명확히 기재하세요.
        </div>

        <HubLinks />

        <H2>이혼 재산분할로 집을 받을 때 취득세에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 확인하세요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "재산분할 합의서 작성·세금 상담" },
              { label: "위택스 — 취득세 신고·납부", url: "https://www.wetax.go.kr", sub: "소유권 이전 등기 전 취득세 납부" },
              { label: "국세청 홈택스", url: "https://www.hometax.go.kr", sub: "양도소득세 신고 확인" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 지방세법·소득세법·상속세및증여세법을 바탕으로 작성됐어요. 세금은 개별 상황에 따라 달라질 수 있으니 세무사 또는 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
