import { useState } from "react";

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

const SIDEBAR_LINKS = [
  "이혼 전 재산 빼돌림","재산분할 대상 범위","이혼 재산분할 비율","이혼 재산분할 집 취득세",
  "재산분할 청구기한","이혼 위자료 청구","이혼 퇴직금 재산분할","이혼 친권·양육권",
  "이혼 양육비 청구","협의이혼 절차","이혼 무료 법률상담","이혼 빚 공동부담",
  "이혼 소송 증거 수집","별거 중 이혼","이혼 일방 거부","이혼 소송 기간",
  "이혼 소송 비용","이혼 후 공동명의","위자료 소멸시효","대한법률구조공단",
];

const HUB_LINKS = [
  { title: "이혼 전 재산 빼돌림 대비 | 처분금지가처분·가압류·사해행위취소 방법", desc: "빼돌린 재산 돌려받는 방법 전체 정리", href: "#" },
  { title: "이혼 재산분할 비율 | 기여도 판단 기준과 높이는 방법", desc: "가처분 후 분할 비율 확인하세요", href: "#" },
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
];

const FAQS = [
  { urgent: true,
    q: "처분금지가처분 신청은 이혼 소장 제출 전에도 할 수 있나요?",
    a: "네. 이혼 소장 제출 전에도 가능해요(민사집행법 300조). 긴급하게 부동산이 처분될 것 같다면 지금 바로 신청할 수 있어요. 대법원 전자소송(ecfs.scourt.go.kr) 또는 법원 방문으로 신청하세요. 132에 바로 전화하세요." },
  { urgent: true,
    q: "담보를 얼마나 제공해야 하나요?",
    a: "법원이 담보액을 결정해요. 부동산 가치의 약 10~15% 수준이 일반적이에요. 10억짜리 아파트라면 1억~1.5억 수준이에요. 담보는 현금 공탁 또는 서울보증보험 공탁보험증권으로 대체할 수 있어요. 담보 금액이 부담이라면 132에 상담하세요." },
  { urgent: false,
    q: "처분금지가처분 결정이 나면 상대방은 어떻게 되나요?",
    a: "결정이 나면 등기부에 가처분 등기가 돼요. 이후 상대방이 부동산을 팔거나 담보를 설정해도 가처분 이후 등기를 말소시킬 수 있어요. 이혼 판결 후 소유권을 이전받으면 그 이후의 등기를 전부 말소할 수 있어요." },
  { urgent: false,
    q: "처분금지가처분과 가압류 중 어떤 걸 선택해야 하나요?",
    a: "부동산을 재산분할로 직접 받고 싶으면 처분금지가처분, 현금으로 위자료·재산분할을 받고 싶으면 가압류예요. 처분금지가처분은 담보율 약 10~15%, 가압류는 약 40%예요. 부동산을 집으로 받고 싶다면 처분금지가처분이 유리해요." },
  { urgent: false,
    q: "가처분 결정이 났는데 상대방이 무시하고 팔았어요.",
    a: "가처분 등기 이후의 소유권 이전은 가처분 채권자에게 대항할 수 없어요. 이혼 판결 후 소유권이전등기를 하면 제3자 명의 등기를 말소할 수 있어요. 사해행위취소 소송으로도 다툴 수 있어요. 132에 바로 상담하세요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민사집행법 제300조 — 처분금지가처분", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 재산처분 방지 조치 (2026. 2. 28. 기준)", url: "https://easylaw.go.kr/" },
    { label: "대법원 전자소송", url: "https://ecfs.scourt.go.kr" },
    { label: "대한법률구조공단 (132)", url: "tel:132" },
  ]},
];

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}
    </div>
  );
}
function BorderBox({ title, children }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    now:   { title: "지금 당장 처분될 것 같아요", color: "#DC2626", bg: "#FEF2F2",
      text: "지금 바로 처분금지가처분을 신청하세요. 소장 제출 전에도 가능해요. 전자소송(ecfs.scourt.go.kr) 또는 법원 방문으로 즉시 신청할 수 있어요. 132에 바로 전화하세요." },
    cost:  { title: "담보 비용이 걱정돼요", color: G, bg: GL,
      text: "담보는 현금 공탁 대신 서울보증보험 공탁보험증권으로 대체할 수 있어요. 보험료는 보통 담보액의 1~2%예요. 1억 담보라면 보험료 약 100~200만원이에요. 132에 상담하면 무료 법률 지원도 가능해요." },
    after: { title: "이미 소장을 제출한 상태예요", color: "#7C3AED", bg: "#F5F3FF",
      text: "이혼 소장과 함께 또는 별도로 처분금지가처분을 신청하세요. 이혼 소송 중에도 언제든 신청 가능해요. 담보가 준비됐다면 전자소송으로 바로 신청하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "now",   label: "배우자가 지금 부동산을 처분하려 해요." },
          { id: "cost",  label: "담보 비용 부담이 걱정돼요." },
          { id: "after", label: "이미 이혼 소장을 낸 상태예요." },
        ].map((item) => (
          <button key={item.id} onClick={() => setType(item.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
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

function CostCalc() {
  const [price, setPrice] = useState(50000);
  const ratio = 0.12;
  const deposit = Math.round(price * 10000 * ratio);
  const insuranceFee = Math.round(deposit * 0.015);
  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>부동산 가액을 입력하면 예상 담보 금액을 알 수 있어요.</p>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>부동산 시가 (만원): {price.toLocaleString()}</label>
        <input type="range" min={5000} max={200000} step={1000} value={price}
          onChange={e => setPrice(+e.target.value)} style={{ width: "100%", accentColor: G }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { label: "예상 담보 금액", val: `${deposit.toLocaleString()}원`, sub: "시가의 약 12%" },
          { label: "보험증권 보험료", val: `약 ${insuranceFee.toLocaleString()}원`, sub: "담보액의 약 1.5%/년" },
        ].map((c, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "10px 12px" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>{c.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: G }}>{c.val}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{c.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>참고용이에요. 실제 담보 금액은 법원이 결정해요. 담보는 현금 공탁 또는 보험증권으로 가능해요.</p>
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
            <span>
              {f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 재산 보전 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>1분이라도 빠를수록 좋아요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>지금 바로 가처분을<br />신청할 수 있어요.</p>
      <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
        <a href="tel:132" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>📞 법률구조공단 132</a>
        <a href="https://ecfs.scourt.go.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}` }}>🌐 전자소송 신청</a>
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
      {REFERENCES.map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
              <a key={item.label} href={item.url}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼·재산 보전 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function CheobunGumjiGacheobunPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 처분금지가처분 · 재산 보전</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          처분금지가처분 신청 조건 |<br />
          비용·담보·절차와 이혼 전 재산 묶는 방법
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          이혼 소장도 아직 안 냈는데 배우자가 아파트를 팔려고 해요. 지금 막을 수 있어요.<br />
          처분금지가처분은 이혼 소장 제출 전에도 신청할 수 있어요.<br /><br />
          결정이 나면 등기부에 즉시 가처분 등기가 돼서 상대방이 팔거나 담보를 설정할 수 없어요.
        </p>

        <UrgentBanner />

        {/* H2 ① */}
        <Bdg>담보 비용 먼저 확인하세요</Bdg>
        <H2>처분금지가처분 비용과 담보 금액 계산</H2>
        <p style={body}>부동산 시가를 입력하면 예상 담보 금액을 알 수 있어요.</p>
        <CostCalc />
        <GreenBox title="처분금지가처분 핵심">
          신청 시기: 이혼 소장 제출 전에도 신청 가능 (민사집행법 300조)<br />
          담보: 부동산 시가의 약 10~15%. 현금 공탁 또는 보험증권으로 대체<br />
          효력: 결정 즉시 등기부에 가처분 등기 → 상대방 처분·담보 불가<br />
          이후 이혼 판결 후 이전등기 시 가처분 이후 등기 전부 말소 가능
        </GreenBox>

        <HubLinks />

        <Divider />

        {/* H2 ② */}
        <H2>처분금지가처분 신청 절차 4단계</H2>
        <p style={body}>
          담보만 준비되면 하루 안에 신청서를 제출할 수 있어요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
          {[
            { n: 1, title: "가처분 신청서 작성 + 소명자료 준비",
              desc: "피보전권리(재산분할청구권), 보전의 필요성(처분 우려)을 기재해요. 부동산 등기부등본·혼인관계증명서·처분 정황 증거가 필요해요. 132에서 무료로 작성을 도와줘요.",
              link: null },
            { n: 2, title: "법원 제출",
              desc: "이혼 소장을 낼 법원 또는 부동산 소재지 지방법원에 제출해요.",
              link: { label: "전자소송 바로가기", url: "https://ecfs.scourt.go.kr" } },
            { n: 3, title: "법원 결정 + 담보 제공",
              desc: "법원이 담보 금액을 정해줘요. 현금 공탁 또는 서울보증보험 증권으로 납부해요. 담보 납부 후 가처분 결정이 집행돼요.",
              link: null },
            { n: 4, title: "등기부에 가처분 등기 완료",
              desc: "등기부에 가처분 등기가 되면 상대방이 팔거나 담보를 설정할 수 없어요. 이후 이혼 소장 제출 + 재산분할 청구를 진행하세요.",
              link: null },
          ].map((s, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
              {i < arr.length - 1 && <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />}
              <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85, marginBottom: s.link ? 8 : 0 }}>{s.desc}</div>
                {s.link && (
                  <a href={s.link.url} style={{ fontSize: 12, fontWeight: 600, color: G, background: GL, border: `1px solid #9FE1CB`, borderRadius: 6, padding: "4px 10px", textDecoration: "none", display: "inline-block" }}>
                    {s.link.label} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* H2 ③ */}
        <H2>처분금지가처분 신청 조건과 필요 서류</H2>
        <p style={body}>
          두 가지 요건을 모두 소명해야 법원이 결정을 내려줘요.
        </p>
        <BorderBox title="신청 요건 2가지">
          피보전권리: 재산분할청구권이 있어야 해요 (혼인 관계 존재 + 분할 대상 재산 존재)<br />
          보전의 필요성: 지금 처분하지 않으면 나중에 집행이 불가능할 우려가 있어야 해요<br />
          → 배우자가 매물을 내놓은 사실, 이혼 요구 직후 처분 시도 정황이 증거가 돼요
        </BorderBox>
        <BorderBox title="필요 서류">
          가처분 신청서 (법원 양식)<br />
          부동산 등기부등본 (대법원 인터넷등기소 발급, 무료)<br />
          혼인관계증명서<br />
          처분 우려 소명자료 (매물 등록 화면 캡처, 배우자와의 카카오톡 등)<br />
          담보 제공 자료 (현금 공탁 또는 서울보증보험 증권)
        </BorderBox>

        <Divider />

        {/* H2 ④ */}
        <H2>처분금지가처분, 지금 당장 이렇게 시작하세요</H2>
        <p style={body}>1분이라도 빠를수록 좋아요. 오늘 할 수 있는 것부터 시작하세요.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2",
              title: "등기부 조회로 현황 확인",
              desc: "대법원 인터넷등기소(iros.go.kr)에서 부동산 등기부를 조회하세요. 소유권 이전·가압류 여부를 실시간으로 확인할 수 있어요.",
              link: { label: "인터넷등기소 바로가기", url: "https://www.iros.go.kr" } },
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2",
              title: "132 전화 — 신청서 작성 지원",
              desc: "대한법률구조공단 132에 전화하면 가처분 신청서 작성을 무료로 도와줘요.",
              link: { label: "법률구조공단 132", url: "tel:132" } },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED",
              title: "전자소송으로 가처분 신청 제출",
              desc: "온라인으로 법원 방문 없이 신청 가능해요. 담보 납부 후 바로 집행돼요.",
              link: { label: "전자소송 바로가기", url: "https://ecfs.scourt.go.kr" } },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", borderRadius: 8, background: s.bg, border: `1px solid ${s.color}30` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: s.color, flexShrink: 0, paddingTop: 2, minWidth: 36 }}>{s.step}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85, marginBottom: 8 }}>{s.desc}</div>
                <a href={s.link.url} style={{ fontSize: 12, fontWeight: 600, color: s.color, background: "#fff", border: `1px solid ${s.color}50`, borderRadius: 6, padding: "4px 10px", textDecoration: "none" }}>
                  {s.link.label} →
                </a>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* H2 ⑤ FAQ */}
        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 법적 효력을 갖는 유권해석이 아니며, 각종 신고·불복 청구 등의 증거자료로 쓸 수 없어요. 개별 사안에 따라 결과가 달라질 수 있으니, 구체적인 상황은 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
