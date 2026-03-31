"use client";
import { useState } from "react";
const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: any) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: any) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: any) { return <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
function BorderBox({ title, children }: any) { return <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}><strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>{children}</div>; }
const SIDEBAR_LINKS = ["폭행 고소 방법","상해 고소 방법","가정폭력 신고","가정폭력 이혼","성폭력 고소","스토킹 신고 방법","모욕죄 고소","협박죄 고소","이혼 소송 증거 수집","이혼 무료 법률상담","이혼 위자료 청구","이혼 재산분할 비율","이혼 친권·양육권","이혼 양육비 청구","협의이혼 절차","이혼 일방 거부","이혼 소송 기간","이혼 소송 비용","이혼 전 재산 빼돌림","대한법률구조공단"];
const FAQS = [
  { urgent: true, q: "맞고 나서 얼마 만에 고소해야 하나요?", a: "폭행죄는 친고죄이므로 고소기간이 있어요. '폭행을 안 날로부터 6개월 이내'에 고소해야 해요(형사소송법 230조). 상해죄는 비친고죄라 기간 제한이 없어요. 하지만 빠를수록 증거가 살아있어요. 진단서는 지금 바로 발급받으세요." },
  { urgent: true, q: "폭행과 상해 차이가 뭔가요?", a: "폭행: 신체에 대한 유형력 행사 (때렸지만 상처 없음) — 2년 이하 징역·500만원 이하 벌금\n상해: 신체에 실질적 피해 (멍, 골절, 찰과상 등) — 7년 이하 징역·1,000만원 이하 벌금\n진단서가 있으면 상해, 없으면 폭행이에요. 맞은 즉시 병원에서 진단서를 받으세요." },
  { urgent: false, q: "고소장은 어떻게 작성하나요?", a: "고소인, 피고소인 인적사항 / 고소 사실 (날짜·장소·행위) / 증거 목록 / 고소 이유 / 처벌 희망 여부를 기재해요. 관할 경찰서에 방문 또는 사이버경찰청(ecrm.police.go.kr)에서 온라인 접수도 가능해요. 132에서 무료로 작성을 도와줘요." },
  { urgent: false, q: "가정폭력이에요. 고소 말고 다른 방법이 있나요?", a: "가정폭력은 경찰에 신고하면 현행범 체포·접근금지 임시조치를 즉시 받을 수 있어요. 가정폭력상담소(1366)에 연락하면 피해자 지원·쉼터 연계도 가능해요. 이혼 소송과 가정폭력 고소를 동시에 진행할 수 있어요." },
  { urgent: false, q: "합의를 하면 처벌을 안 받나요?", a: "폭행죄는 친고죄라 합의 후 고소를 취하하면 처벌이 어려워요. 상해죄는 비친고죄라 합의해도 검사가 기소할 수 있어요. 합의는 형을 낮추는 요소는 되지만 처벌을 완전히 막지는 않아요. 합의금 협상 전에 132에 상담하세요." },
];
function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    now: { title: "지금 막 폭행을 당했어요", color: "#DC2626", bg: "#FEF2F2", text: "지금 즉시 112에 신고하세요. 현장에서 경찰을 부르면 가장 강력한 증거가 돼요. 사진을 찍고 목격자를 확보하세요. 이후 병원에서 진단서를 발급받으세요." },
    past: { title: "이미 일어난 사건인데 고소하려 해요", color: G, bg: GL, text: "진단서, 사진, 목격자, CCTV 등 증거를 확보하고 경찰서에 고소장을 제출하세요. 폭행죄는 안 날로부터 6개월 이내에 고소해야 해요. 132에서 고소장 작성을 무료로 도와줘요." },
    dv: { title: "가정폭력 상황이에요", color: "#7C3AED", bg: "#F5F3FF", text: "지금 즉시 112에 신고하거나 1366(가정폭력상담소)에 전화하세요. 경찰이 오면 접근금지 임시조치를 요청하세요. 이혼과 고소를 동시에 진행할 수 있어요. 132에 상담하세요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ id: "now", label: "지금 막 폭행을 당했어요. (즉시 대응)" },{ id: "past", label: "이미 일어난 사건인데 고소하려 해요." },{ id: "dv", label: "가정폭력 상황이에요." }].map((item) => (
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
function ProcessSteps() {
  const steps = [
    { n: 1, title: "즉시 증거 확보", desc: "부상 사진 촬영 (타임스탬프 포함), 진단서 발급 (맞은 당일이 가장 좋음), 목격자 연락처 확보, CCTV 위치 기록, 통화·카카오톡 내역 보관" },
    { n: 2, title: "경찰서 고소장 제출 또는 112 신고 후 사후 고소", desc: "관할 경찰서 방문 또는 사이버경찰청(ecrm.police.go.kr) 온라인 접수. 폭행죄는 안 날로부터 6개월 이내. 132에서 고소장 작성을 무료로 도와줘요." },
    { n: 3, title: "경찰 수사 → 검찰 송치", desc: "경찰이 수사 후 검찰에 송치해요. 피의자 조사, 현장 검증, 증거 수집이 진행돼요. 피해자 진술 기회가 주어져요." },
    { n: 4, title: "검사 기소 → 재판 → 판결", desc: "상해죄: 검사가 기소 → 법원 재판 → 징역·벌금 판결\n폭행죄: 합의 없으면 기소, 합의 시 고소 취하 가능\n민사 손해배상 청구도 병행 가능해요." },
  ];
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < steps.length - 1 && <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{s.desc}</div>
          </div>
        </div>
      ))}
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>폭행·고소 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}
export default function PokhaengSanghaeGosoPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>폭행 · 상해 · 고소</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>폭행·상해 고소 방법 |<br />증거 확보부터 고소장 제출까지 4단계</h1>
        <p style={{ ...body, fontSize: 15 }}>
          맞고 나서 그냥 넘어가지 마세요. 맞은 것도 범죄고, 당신이 피해자예요.<br />
          폭행죄는 안 날로부터 6개월 이내에 고소해야 해요. 지금 바로 시작하세요.<br /><br />
          먼저 지금 상황이 어떤 상황인지 선택하면 가장 빠른 방법을 알려드릴게요.
        </p>
        <UrgentBanner />
        <Bdg>단계별 절차 확인하세요</Bdg>

        {/* H2 ① */}
        <H2>폭행·상해 고소, 증거 확보부터 판결까지 4단계</H2>
        <p style={body}>빠른 증거 확보와 고소장 제출이 가장 중요해요.</p>
        <ProcessSteps />
        <GreenBox title="폭행 vs 상해 처벌과 고소기간이 달라요">
          폭행죄: 2년 이하 징역·500만원 이하 벌금. 친고죄 (안 날 6개월 내 고소 필수)<br />
          상해죄: 7년 이하 징역·1,000만원 이하 벌금. 비친고죄 (기간 제한 없음)<br />
          진단서가 핵심: 상처 기록이 있으면 상해죄로 처벌 가능<br />
          가정폭력: 가정폭력처벌법 적용 → 즉시 접근금지 임시조치 가능
        </GreenBox>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 관련 글도 함께 보세요</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { title: "이혼 소송 증거 수집 방법 | 외도·폭력 합법으로 모으는 법", desc: "가정폭력 증거 수집 방법 전체 정리", href: "#" },
              { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
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
        <H2>고소 증거 지금 당장 확보해야 할 것들</H2>
        <BorderBox title="의료 증거 (가장 중요)">
          진단서: 맞은 당일 발급이 가장 강력해요<br />
          진료기록부, 처방전<br />
          상처 사진 (날짜·시간 포함, 촬영 타임스탬프)
        </BorderBox>
        <BorderBox title="현장 증거">
          CCTV (위치와 날짜 기록 후 경찰에 보전 요청)<br />
          목격자 연락처<br />
          112 신고 접수증<br />
          통화·카카오톡 내역 (폭행 직후 상대방과의 대화)
        </BorderBox>

        <Divider />

        {/* H2 ③ */}
        <H2>가정폭력이라면 고소 외에 이것도 할 수 있어요</H2>
        <p style={body}>
          가정폭력은 일반 폭행과 다르게 즉시 격리·보호 조치를 받을 수 있어요.
        </p>
        <BorderBox title="경찰 신고 시 즉시 받을 수 있는 것">
          현행범 체포 (현장에서 폭행이 진행 중이면)<br />
          접근금지 임시조치 (가해자를 집에서 격리)<br />
          피해자 동행 서비스 (경찰이 안전한 장소로 데려다줘요)<br />
          → 112 신고 후 임시조치 신청을 반드시 요청하세요
        </BorderBox>
        <BorderBox title="1366 가정폭력 피해자 지원센터">
          24시간 운영, 무료 상담·법률 지원·쉼터 연계<br />
          이혼 소송과 가정폭력 고소를 동시에 진행할 수 있어요<br />
          <a href="tel:1366" style={{ color: G, fontWeight: 700, textDecoration: "none" }}>📞 1366 바로 전화하기 →</a>
        </BorderBox>

        <Divider />

        {/* H2 ④ */}
        <H2>고소장 제출, 지금 당장 이렇게 시작하세요</H2>
        <p style={body}>오늘 할 수 있는 것부터 순서대로 정리했어요.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2",
              title: "병원 방문 → 진단서 발급",
              desc: "맞은 당일 발급이 가장 강력한 증거예요. 타임스탬프가 포함된 상처 사진도 함께 찍어두세요.",
              link: null },
            { step: "오늘", color: "#DC2626", bg: "#FEF2F2",
              title: "카카오톡·문자·CCTV 증거 확보",
              desc: "폭행 직후 대화 내역, 목격자 연락처, CCTV 위치를 기록해두세요. CCTV는 경찰에 보전 신청을 해야 해요.",
              link: null },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED",
              title: "132 전화 → 고소장 작성 지원",
              desc: "대한법률구조공단 132에 전화하면 고소장 작성을 무료로 도와줘요.",
              link: { label: "법률구조공단 132", url: "tel:132" } },
            { step: "이번 주", color: "#C2410C", bg: "#FFF7ED",
              title: "경찰서 고소장 제출 또는 온라인 접수",
              desc: "관할 경찰서 방문 또는 사이버경찰청에서 온라인 접수 가능해요.",
              link: { label: "사이버경찰청 온라인 고소", url: "https://ecrm.police.go.kr" } },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", borderRadius: 8, background: s.bg, border: `1px solid ${s.color}30` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: s.color, flexShrink: 0, paddingTop: 2, minWidth: 36 }}>{s.step}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85, marginBottom: s.link ? 8 : 0 }}>{s.desc}</div>
                {s.link && (
                  <a href={s.link.url} style={{ fontSize: 12, fontWeight: 600, color: s.color, background: "#fff", border: `1px solid ${s.color}50`, borderRadius: 6, padding: "4px 10px", textDecoration: "none", display: "inline-block" }}>
                    {s.link.label} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* H2 ⑤ FAQ */}
        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />
        <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>혼자 하지 마세요</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>고소장 작성을 무료로<br />도와줘요.</p>
          <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
            <a href="tel:132" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>📞 법률구조공단 132</a>
            <a href="tel:112" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}` }}>🚨 경찰 112</a>
          </div>
        </div>
        <Divider />
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14 }}>출처 및 참고자료</h3>
          {[
            { label: "형법 제260조 — 폭행죄 (2년 이하 징역·500만원 이하 벌금)", url: "https://www.law.go.kr/" },
            { label: "형법 제257조 — 상해죄 (7년 이하 징역·1,000만원 이하 벌금)", url: "https://www.law.go.kr/" },
            { label: "형사소송법 제230조 — 고소기간 (안 날 6개월)", url: "https://www.law.go.kr/" },
            { label: "사이버경찰청 — 온라인 고소 접수", url: "https://ecrm.police.go.kr" },
            { label: "대한법률구조공단 (132)", url: "tel:132" },
          ].map((item) => (
            <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none", marginBottom: 4 }}>
              <span style={{ color: G, fontSize: 11 }}>↗</span>{item.label}
            </a>
          ))}
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>이 글은 법률 정보 제공을 목적으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 대한법률구조공단(132)에 상담하세요.</div>
      </div>
    </div>
  );
}
