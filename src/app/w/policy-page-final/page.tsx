"use client";
// @ts-nocheck
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
//  ★ 여기만 바꾸면 끝 — 어떤 정책이든 적용 가능
// ═══════════════════════════════════════════════════════
const META = {
  agency:      "금융위원회",
  badge:       "2026년 6월 출시",
  title:       "청년미래적금",
  desc:        "월 50만원씩 3년 저축하면\n정부가 기여금을 얹어줘요. 이자소득세도 면제예요.",
  kpis: [
    { num: "3년",    label: "만기 기간" },
    { num: "12%",   label: "최대 기여율" },
    { num: "2,200만", label: "예상 수령액" },
  ],
  applyUrl:    "https://www.fss.or.kr",
  tel:         "1332",
  viewers:     2341,
};

// 자격 체커 질문
const CHECKER_QS = [
  { label: "만 19세 ~ 34세 사이인가요?", hint: "(병역자는 최대 6년 차감)", failMsg: "나이 조건 미충족", failDesc: "만 19~34세만 가입할 수 있어요. 병역 이행 중이라면 최대 6년 차감이 적용되니 다시 확인해보세요." },
  { label: "개인소득 연 6,000만원 이하인가요?", hint: "", failMsg: "소득 조건 미충족", failDesc: "개인소득이 연 6,000만원을 초과하면 가입이 안 돼요. 소상공인은 연 매출 3억원 기준이에요." },
  { label: "가구 중위소득 200% 이하인가요?", hint: "(1인 기준 약 512만원 이하)", failMsg: "가구소득 조건 미충족", failDesc: "가구 기준 중위소득 200%를 초과하면 가입이 안 돼요." },
];

const UPGRADE_OPTIONS = [
  "중소기업 신규취업 6개월 이내",
  "소득 3,600만원 이하 + 중소기업 재직자",
  "연 매출 1억 이하 소상공인",
];

// 비교 데이터
const COMPARE_OPTIONS = [
  { key: "none", label: "미가입",       ttl: "👉 미래적금 신규 가입 추천",    desc: "도약계좌를 가입한 적 없다면 6월에 바로 미래적금으로 시작하세요. 기여율이 2배 높고 만기도 3년이에요." },
  { key: "new",  label: "가입 초기 (1년 미만)", ttl: "⚖️ 갈아타기 진지하게 고려할 만해요", desc: "가입 초기라면 도약계좌 손실이 크지 않아요. 중도해지 후 미래적금 전환을 검토해보세요. 구체적 전환 조건은 6월 발표 후 확인해야 해요." },
  { key: "mid",  label: "중간 (2~3년)",  ttl: "🔒 도약계좌 유지를 추천해요",    desc: "2~3년 이미 납입했다면 도약계좌를 만기까지 유지하는 게 나아요. 지금 해지하면 그간 쌓인 기여금을 포기하는 거예요." },
  { key: "end",  label: "만기 임박",     ttl: "✓ 만기 후 미래적금으로 이동하세요", desc: "도약계좌 만기 후 수령한 금액으로 미래적금에 신규 가입하는 게 가장 유리해요." },
];

const COMPARE_TABLE = [
  { label: "만기",     mine: "3년",       theirs: "5년" },
  { label: "월 한도",  mine: "50만원",    theirs: "70만원" },
  { label: "기여율",   mine: "최대 12%",  theirs: "최대 6%",  hI: true },
  { label: "금리효과", mine: "연 16.9%",  theirs: "연 8~10%", hI: true },
  { label: "총 수령",  mine: "최대 2,200만", theirs: "최대 5,000만", hT: true },
];

const STEPS = [
  { when: "지금",   title: "서민금융진흥원 앱 설치", desc: "출시 전 미리 자격 조회 서비스를 써볼 수 있어요. 첫날 신청자가 몰리기 전에 준비해두세요.", chip: "지금 바로 할 수 있어요", urgent: true },
  { when: "지금",   title: "주거래 은행 앱 업데이트", desc: "KB·신한·우리·하나·농협·IBK 중 하나. 비대면 신청이 가능한지 미리 확인해두세요.", chip: "지금 바로 할 수 있어요", urgent: true },
  { when: "5월",    title: "은행별 금리 비교", desc: "5월 중 은행별 기본금리 + 우대금리 조건이 발표돼요. 0.1~0.3%p 차이도 3년이면 수십만원이에요.", chip: "금융위원회 공식 발표 확인" },
  { when: "6월",    title: "출시 첫날 신청", desc: "예산 한도 소진 시 가입 마감될 수 있어요. 출시 당일 오전에 신청하는 게 안전해요.", chip: "2026년 6월 예정" },
  { when: "36개월", title: "만기 수령", desc: "원금 + 정부 기여금 + 은행 이자 일괄 지급. 중도해지 시 기여금·비과세 혜택 전부 소멸이에요.", chip: "2029년 6월경" },
];

const FAQS = [
  { q: "중도해지하면 기여금 다 날려요?",          a: "네. 정부 기여금과 이자 비과세 혜택이 전부 소멸해요. 원금과 은행 이자만 받을 수 있어요. 결혼·출산·질병 등 특별 사유는 예외 인정될 수 있으니 해지 전 반드시 확인하세요." },
  { q: "소득 없는 대학생·취준생도 되나요?",       a: "아르바이트 등 신고된 소득이 있으면 가능해요. 소득이 전혀 없으면 원칙적으로 가입이 어려워요. 전년도 소득이 증명된다면 대부분 인정돼요." },
  { q: "월 50만원 꼭 다 채워야 하나요?",         a: "아니요. 자유적립식이라 매월 금액이 달라도 돼요. 기여금은 실제 납입액 기준으로 지급되니 많이 넣을수록 유리해요." },
  { q: "여러 은행에 나눠서 가입할 수 있나요?",    a: "안 돼요. 1인 1계좌만 가능해요. 기여율이 높고 은행 우대금리 조건을 맞추기 쉬운 곳 한 곳을 골라야 해요." },
  { q: "예산 소진되면 못 가입하나요?",            a: "가능성 있어요. 7,446억원으로 예산이 정해져 있어서 조기 마감될 수 있어요. 출시 첫날 신청을 강력히 추천해요." },
];

// ═══════════════════════════════════════════════════════
//  디자인 토큰
// ═══════════════════════════════════════════════════════
const S = { black: "#000", text: "#111", muted: "#555", subtle: "#888", border: "#eaeaea", line: "#f4f4f4", surface: "#fafafa", white: "#fff" };
const f = { xs: 10, sm: 11, base: 12, md: 13, lg: 14, xl: 18, h2: 26, family: "'Pretendard','Apple SD Gothic Neo',-apple-system,sans-serif" };

// ── 공통
function Sec({ id, children }: any) {
  return <section id={id} style={{ padding: "28px 24px", borderBottom: `1px solid ${S.border}` }}>{children}</section>;
}
function SQ({ children }: any) {
  return <p style={{ fontSize: 18, fontWeight: 700, color: S.black, letterSpacing: "-0.4px", marginBottom: 6, lineHeight: 1.3 }}>{children}</p>;
}
function SH({ children }: any) {
  return <p style={{ fontSize: f.base, color: S.subtle, marginBottom: 20, lineHeight: 1.6 }}>{children}</p>;
}

// ── 히어로
function Hero({ viewers }: any) {
  return (
    <div style={{ padding: "28px 24px 24px", borderBottom: `1px solid ${S.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontSize: f.sm, color: S.subtle, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 500 }}>{META.agency} · {META.badge}</span>
        <span style={{ fontSize: f.sm, color: S.subtle, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: S.black, display: "inline-block" }} />
          {viewers.toLocaleString()}명
        </span>
      </div>
      <h1 style={{ fontSize: f.h2, fontWeight: 700, color: S.black, lineHeight: 1.2, letterSpacing: "-0.6px", marginBottom: 8 }}>{META.title}</h1>
      <p style={{ fontSize: f.md, color: S.muted, lineHeight: 1.7, marginBottom: 22, whiteSpace: "pre-line" }}>{META.desc}</p>

      {/* KPI */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", border: `1px solid ${S.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 20 }}>
        {META.kpis.map((k: any, i: any) => (
          <div key={k.label} style={{ padding: "14px 12px", borderRight: i < 2 ? `1px solid ${S.border}` : "none", textAlign: "center" }}>
            <p style={{ fontSize: f.xl, fontWeight: 700, color: S.black, letterSpacing: "-0.5px", lineHeight: 1, marginBottom: 3 }}>{k.num}</p>
            <p style={{ fontSize: f.xs, color: S.subtle, lineHeight: 1.4 }}>{k.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <a href={META.applyUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: S.black, color: S.white, borderRadius: 6, padding: "12px", fontSize: f.md, fontWeight: 600, textDecoration: "none" }}>
          신청하기 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href={`tel:${META.tel}`} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, background: S.white, color: S.muted, border: `1px solid ${S.border}`, borderRadius: 6, padding: "12px", fontSize: f.base, textDecoration: "none" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          {META.tel}
        </a>
      </div>
    </div>
  );
}

// ── 네비 (앵커 스크롤 — 콘텐츠는 모두 세로로 펼쳐짐)
const NAV_TABS = [
  { id: "s1", label: "나 받을 수 있나?" },
  { id: "s2", label: "얼마나 이득?" },
  { id: "s3", label: "도약계좌 비교" },
  { id: "s4", label: "지금 뭐 해야?" },
  { id: "s5", label: "주의사항" },
];
function StickyNav({ active, onNav }: any) {
  return (
    <nav style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", background: "rgba(255,255,255,.96)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: `1px solid ${S.border}`, position: "sticky", top: 0, zIndex: 50, height: 40 }}>
      {NAV_TABS.map((t: any) => (
        <button key={t.id} onClick={(_e: any) => onNav(t.id)} style={{ flex: "0 0 auto", height: 40, padding: "0 13px", fontSize: f.base, color: active === t.id ? S.black : S.subtle, fontWeight: active === t.id ? 600 : 400, background: "none", border: "none", borderBottom: active === t.id ? `1px solid ${S.black}` : "1px solid transparent", cursor: "pointer", whiteSpace: "nowrap", fontFamily: f.family, transition: "color 0.1s" }}>{t.label}</button>
      ))}
    </nav>
  );
}

// ── 자격 체커
function CheckerSection() {
  const [ans, setAns] = useState([null, null, null]);
  const [upgrade, setUpgrade] = useState([false, false, false]);

  const setQ = (i, v) => {
    const next = [...ans];
    next[i] = v;
    if (v === "N") { for (let j = i + 1; j < 3; j++) next[j] = null; }
    setAns(next);
  };

  const fail = ans.findIndex((a) => a === "N");
  const done = ans.every((a) => a !== null);
  const pass = done && fail === -1;
  const anyUpgrade = upgrade.some(Boolean);

  let resultState = "pending";
  if (fail >= 0) resultState = "fail";
  else if (pass) resultState = "pass";

  const resultBorder = { pending: S.border, fail: "#f43f5e", pass: S.black }[resultState];
  const resultBg = { pending: S.surface, fail: "#fff5f5", pass: S.surface }[resultState];

  return (
    <Sec id="s1">
      <SQ>나 받을 수 있나요?</SQ>
      <SH>3가지만 확인하면 돼요. 30초 걸려요.</SH>

      {CHECKER_QS.map((q: any, i: any) => {
        const enabled = i === 0 || ans[i - 1] === "Y";
        return (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: enabled ? S.black : S.border, color: enabled ? S.white : S.subtle, fontSize: f.xs, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: f.base, fontWeight: 600, color: enabled ? S.black : S.subtle }}>{q.label}</span>
              {q.hint && <span style={{ fontSize: f.xs, color: S.subtle }}>{q.hint}</span>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Y", "N"].map((v: any) => (
                <button key={v} disabled={!enabled} onClick={(_e: any) => setQ(i, v)} style={{ flex: 1, padding: 10, border: `1px solid ${ans[i] === v ? (v === "Y" ? S.black : "#f43f5e") : S.border}`, borderRadius: 6, background: ans[i] === v ? (v === "Y" ? S.black : "#fff5f5") : S.white, color: ans[i] === v ? (v === "Y" ? S.white : "#f43f5e") : S.muted, fontSize: f.base, fontWeight: 500, cursor: enabled ? "pointer" : "not-allowed", opacity: enabled ? 1 : 0.35, fontFamily: f.family, transition: "all 0.1s" }}>
                  {v === "Y" ? "네, 해당돼요" : "아니요"}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* 결과 */}
      <div style={{ border: `1px solid ${resultBorder}`, borderRadius: 8, padding: "16px", background: resultBg }}>
        {resultState === "pending" && <><p style={{ fontSize: f.md, fontWeight: 700, color: S.subtle, marginBottom: 4 }}>위 질문에 답해주세요</p><p style={{ fontSize: f.base, color: S.subtle, lineHeight: 1.7 }}>3가지 체크 후 결과가 나와요.</p></>}
        {resultState === "fail" && <><p style={{ fontSize: f.md, fontWeight: 700, color: "#f43f5e", marginBottom: 4 }}>❌ {CHECKER_QS[fail].failMsg}</p><p style={{ fontSize: f.base, color: S.muted, lineHeight: 1.7 }}>{CHECKER_QS[fail].failDesc}</p></>}
        {resultState === "pass" && <><p style={{ fontSize: f.md, fontWeight: 700, color: S.black, marginBottom: 4 }}>✓ 기본 조건 충족 — 일반형 가입 가능</p><p style={{ fontSize: f.base, color: S.muted, lineHeight: 1.7 }}>일반형(기여율 6%) 가입이 가능해요. 아래에서 우대형 조건도 확인해보세요.</p></>}
      </div>

      {/* 우대형 체크 */}
      {pass && (
        <div style={{ marginTop: 14, padding: "14px 16px", border: `1px solid ${S.border}`, borderRadius: 8, background: S.surface }}>
          <p style={{ fontSize: f.base, fontWeight: 600, color: S.black, marginBottom: 10 }}>🎯 우대형(12%)도 해당되나요?</p>
          {UPGRADE_OPTIONS.map((opt: any, i: any) => (
            <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: f.base, color: S.muted, cursor: "pointer", marginBottom: 6 }}>
              <input type="checkbox" checked={upgrade[i]} onChange={(e: any) => { const n = [...upgrade]; n[i] = e.target.checked; setUpgrade(n); }} style={{ accentColor: S.black }} />
              {opt}
            </label>
          ))}
          <p style={{ fontSize: f.base, color: anyUpgrade ? S.black : S.subtle, fontWeight: anyUpgrade ? 600 : 400, marginTop: 8 }}>
            {anyUpgrade ? "✓ 우대형 12% 적용 대상이에요!" : "하나라도 체크되면 우대형 12% 적용이에요."}
          </p>
        </div>
      )}
    </Sec>
  );
}

// ── 계산기
function CalcSection() {
  const [type, setType] = useState("일반");
  const [monthly, setMonthly] = useState(30);
  const rate = type === "우대" ? 0.12 : 0.06;
  const p = monthly * 36;
  const g = Math.round(monthly * rate * 36);
  const taxBase = Math.round(p * 0.05 * 0.5);
  const tax = Math.round(taxBase * 0.154);
  const total = p + g + taxBase + tax;

  return (
    <Sec id="s2">
      <SQ>실제로 얼마나 이득인가요?</SQ>
      <SH>월 납입액을 조절해보세요.</SH>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["일반", "우대"].map((t: any) => (
          <button key={t} onClick={(_e: any) => setType(t)} style={{ flex: 1, padding: 10, border: `1px solid ${type === t ? S.black : S.border}`, borderRadius: 6, background: type === t ? S.black : S.white, color: type === t ? S.white : S.muted, fontSize: f.base, fontWeight: 500, cursor: "pointer", fontFamily: f.family, transition: "all 0.1s", textAlign: "center" }}>
            {t}형 (기여율 {t === "일반" ? "6%" : "12%"})
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: f.base, color: S.muted }}>월 납입액</span>
          <span style={{ fontSize: f.lg, fontWeight: 700, color: S.black, letterSpacing: "-0.3px" }}>{monthly}만원</span>
        </div>
        <input type="range" min={1} max={50} step={1} value={monthly} onChange={(e: any) => setMonthly(Number(e.target.value))} style={{ width: "100%", accentColor: S.black }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: f.xs, color: "#ccc" }}><span>1만원</span><span>50만원</span></div>
      </div>

      <div style={{ border: `1px solid ${S.border}`, borderRadius: 8, overflow: "hidden" }}>
        {[
          { label: "내 납입 원금",       val: `${p.toLocaleString()}만원` },
          { label: "정부 기여금",         val: `+${g.toLocaleString()}만원` },
          { label: "은행 이자 (연 5% 가정)", val: `+${taxBase.toLocaleString()}만원` },
          { label: "절약된 세금 (비과세)", val: `+${tax.toLocaleString()}만원` },
        ].map((row: any) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", borderBottom: `1px solid ${S.line}`, fontSize: f.base }}>
            <span style={{ color: S.subtle }}>{row.label}</span>
            <span style={{ fontWeight: 600, color: S.text }}>{row.val}</span>
          </div>
        ))}
        <div style={{ background: S.black, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: f.sm, color: "rgba(255,255,255,.6)" }}>3년 후 수령액</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: S.white, letterSpacing: "-0.5px" }}>{total.toLocaleString()}만원</span>
        </div>
      </div>
      <p style={{ fontSize: f.xs, color: "#aaa", marginTop: 8, textAlign: "center" }}>※ 은행 금리 연 5% 가정. 실제 금액은 출시 시점에 따라 달라요.</p>
    </Sec>
  );
}

// ── 도약계좌 비교
function CompareSection() {
  const [sel, setSel] = useState("none");
  const cur = COMPARE_OPTIONS.find((o: any) => o.key === sel);

  return (
    <Sec id="s3">
      <SQ>도약계좌랑 뭐가 달라요?</SQ>
      <SH>내 상황을 선택하면 뭐가 유리한지 알려드려요.</SH>

      <p style={{ fontSize: f.base, color: S.muted, marginBottom: 8 }}>지금 도약계좌 가입 상태는?</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {COMPARE_OPTIONS.map((o: any) => (
          <button key={o.key} onClick={(_e: any) => setSel(o.key)} style={{ padding: "7px 14px", border: `1px solid ${sel === o.key ? S.black : S.border}`, borderRadius: 20, fontSize: f.base, color: sel === o.key ? S.white : S.muted, background: sel === o.key ? S.black : S.white, cursor: "pointer", fontFamily: f.family, transition: "all 0.1s", whiteSpace: "nowrap" }}>
            {o.label}
          </button>
        ))}
      </div>

      <div style={{ border: `1px solid ${S.border}`, borderRadius: 8, padding: "16px 18px" }}>
        <p style={{ fontSize: f.lg, fontWeight: 700, color: S.black, marginBottom: 6 }}>{cur.ttl}</p>
        <p style={{ fontSize: f.base, color: S.muted, lineHeight: 1.8 }}>{cur.desc}</p>
      </div>

      {/* 비교 표 */}
      <div style={{ border: `1px solid ${S.border}`, borderRadius: 8, overflow: "hidden", marginTop: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: S.surface, padding: "10px 14px", borderBottom: `1px solid ${S.border}` }}>
          <span style={{ fontSize: f.sm, fontWeight: 600, color: S.subtle }}>항목</span>
          <span style={{ fontSize: f.sm, fontWeight: 700, color: S.black, textAlign: "center" }}>미래적금</span>
          <span style={{ fontSize: f.sm, fontWeight: 600, color: S.subtle, textAlign: "center" }}>도약계좌</span>
        </div>
        {COMPARE_TABLE.map((row: any, i: any) => (
          <div key={row.label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 14px", borderBottom: i < COMPARE_TABLE.length - 1 ? `1px solid ${S.line}` : "none", alignItems: "center" }}>
            <span style={{ fontSize: f.base, color: S.subtle }}>{row.label}</span>
            <span style={{ fontSize: f.base, textAlign: "center", color: row.hI ? S.black : S.muted, fontWeight: row.hI ? 600 : 400 }}>{row.mine}</span>
            <span style={{ fontSize: f.base, textAlign: "center", color: row.hT ? S.black : S.muted, fontWeight: row.hT ? 600 : 400 }}>{row.theirs}</span>
          </div>
        ))}
      </div>
    </Sec>
  );
}

// ── 지금 뭐 해야?
function StepsSection() {
  return (
    <Sec id="s4">
      <SQ>지금 당장 뭘 해야 하나요?</SQ>
      <SH>6월 출시 전 미리 준비하면 첫날 바로 신청할 수 있어요.</SH>
      {STEPS.map((step: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < STEPS.length - 1 ? `1px solid ${S.line}` : "none", alignItems: "flex-start" }}>
          <span style={{ fontSize: f.sm, fontWeight: 700, color: S.black, width: 32, flexShrink: 0, paddingTop: 2 }}>{step.when}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: f.base, fontWeight: 600, color: S.black, marginBottom: 3 }}>{step.title}</p>
            <p style={{ fontSize: f.base, color: S.muted, lineHeight: 1.7, marginBottom: 5 }}>{step.desc}</p>
            <span style={{ fontSize: f.xs, color: step.urgent ? S.white : S.subtle, background: step.urgent ? S.black : "#f4f4f4", padding: "2px 8px", borderRadius: 3, display: "inline-block" }}>{step.chip}</span>
          </div>
        </div>
      ))}
    </Sec>
  );
}

// ── 주의사항 FAQ
function FaqSection() {
  const [open, setOpen] = useState(null);
  return (
    <Sec id="s5">
      <SQ>결정 전에 꼭 확인할 것들</SQ>
      <SH>모르고 넘기면 손해 보는 것들이에요.</SH>
      {FAQS.map((item: any, i: any) => (
        <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? `1px solid ${S.line}` : "none" }}>
          <button onClick={(_e: any) => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 12, fontFamily: f.family }}>
            <span style={{ fontSize: f.base, fontWeight: 500, color: S.text, lineHeight: 1.5, flex: 1 }}>{item.q}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={S.subtle} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {open === i && <p style={{ fontSize: f.base, color: S.muted, lineHeight: 1.8, paddingBottom: 14 }}>{item.a}</p>}
        </div>
      ))}
    </Sec>
  );
}

// ═══════════════════════════════════════════════════════
//  메인
// ═══════════════════════════════════════════════════════
export default function PolicyPage() {
  const [active, setActive] = useState("s1");
  const [viewers, setViewers] = useState(META.viewers);

  // 스크롤스파이
  useEffect(() => {
    const ids = NAV_TABS.map((t: any) => t.id);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e: any) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ids.forEach((id: any) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setViewers((v) => v + Math.floor(Math.random() * 2)), 6000);
    return () => clearInterval(t);
  }, []);

  const onNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: S.white, minHeight: "100vh", fontFamily: f.family, WebkitFontSmoothing: "antialiased", color: S.text, paddingBottom: 80 }}>
      <Hero viewers={viewers} />
      <StickyNav active={active} onNav={onNav} />
      <CheckerSection />
      <CalcSection />
      <CompareSection />
      <StepsSection />
      <FaqSection />
      <p style={{ fontSize: f.xs, color: "#aaa", textAlign: "center", padding: "20px 24px 24px", lineHeight: 1.8 }}>
        이 페이지는 참고 목적으로 작성됐어요.<br />세부 조건은 2026년 6월 출시 시점에 확정돼요.
      </p>

      {/* 플로팅 CTA */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "10px 16px 16px", background: "linear-gradient(to top, rgba(255,255,255,1) 60%, rgba(255,255,255,0))", zIndex: 100, maxWidth: 480, margin: "0 auto" }}>
        <a href={META.applyUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, width: "100%", background: S.black, color: S.white, borderRadius: 6, padding: 13, fontSize: f.md, fontWeight: 600, textDecoration: "none" }}>
          지금 신청하기 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  );
}
