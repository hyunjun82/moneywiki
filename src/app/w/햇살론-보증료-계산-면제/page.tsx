"use client";
import { useState } from "react";

// ─── Q1-Q4 사고 ───────────────────────────────────────────
// Q1. 검색자 상황: 햇살론 신청하려는데 보증료가 정확히 얼마나 드는지 알고 싶어하고, 보증료를 줄일 수 있는 방법이 있는지 궁금해함
// Q2. 행동: 보증료 계산 공식을 이해하고, 면제/감면 조건을 파악해서 대출 신청 전에 예상 비용을 줄일 수 있어야 함
// Q3. 정보: 보증료 개념·계산법·보증료율·예시 금액·면제 조건·최근 이벤트·신청 절차
// Q4. 형태: 보증료 계산기(슬라이더) + 면제 조건 체커 + 절차 안내 + FAQ + 출처

// ─── 보증료 계산 데이터 ────────────────────────────────────
const WARRANTY_RATES = [
  { type: "일반보증", range: "2.0~2.5%", default: 2.3, desc: "표준 햇살론 신청자" },
  { type: "특례보증", range: "2.5~3.0%", default: 2.8, desc: "신용점수 낮음·채무많음" },
];

const FAQS = [
  { tag: "긴급", q: "보증료가 최고 3%까지 간다고 들었는데 정말 그래요?",
    a: "맞아요. 신용점수·기존 채무 등으로 특례보증(2.5~3.0%)이 적용될 수 있어요. 서민금융진흥원이 우선 심사 후 보증료율을 통보해줘요. 신청 전에 자신의 신용도 파악하고 면제 조건 있는지 확인하면 실제 부담을 줄일 수 있어요." },
  { tag: "긴급", q: "iM뱅크 이벤트에서 보증료 100% 지원한다고 하는데 이게 진짜예요?",
    a: "맞아요. 2024~2025년 iM뱅크에서 '첫 회 보증료 100% 지원' 이벤트를 했어요. 선착순 5,000명 한정이었고, 신청하는 달의 첫 이자·보증료를 모두 면제받는 거예요. 마감됐을 수 있으니 iM뱅크 앱에서 실시간 확인하세요." },
  { tag: null, q: "성실상환하면 정말 보증료를 돌려받나요?",
    a: "정확히는 '면제'예요. 12개월 이상 월 정해진 금액 성실하게 상환하면 서민금융진흥원에서 연 1회 보증료를 전액 면제해줘요. 단, 성실상환 기간이 길수록 감면 효과가 커져요. 연락처는 서민금융진흥원(1397) 또는 대출한 은행에 물어보면 돼요." },
  { tag: null, q: "보증료와 이자는 뭐가 달라요?",
    a: "이자는 은행 수익, 보증료는 서민금융진흥원 수수료예요. 햇살론은 '대출금액에 서민금융진흥원이 90% 보증'하니까, 그 90%에 대한 보증료가 매년 부과되는 거예요. 예를 들어 1,000만원 빌려도 900만원에만 보증료가 붙어요." },
  { tag: null, q: "보증료를 안 내고 햇살론을 받을 수 있어요?",
    a: "직접 0원은 아니에요. 하지만 성실상환·정부 이벤트·은행 이벤트 등으로 사실상 안 낼 수 있어요. 또한 보증료는 연간 계산이라 상환 완료하면 남은 기간 것은 돌려받아요. 예를 들어 3년 대출을 1년 반 만에 완제하면 1.5년분 보증료는 환급받는 식이에요." },
  { tag: null, q: "보증료 계산에 중개수수료나 인지세는 안 들어가요?",
    a: "햇살론은 은행 직거래라 중개수수료가 없어요. 인지세는 대출액이 크거나 서면으로 계약할 때만 소액 발생할 수 있어요. 대부분의 경우 보증료 + 이자 + 기존 카드론·대출금 이 3가지만 계산하면 돼요." },
  { tag: null, q: "보증료율이 2.3%와 2.8%로 나뉘는 기준이 뭐예요?",
    a: "신용점수(신용등급)·기존 채무 비율·연체 기록 등을 종합 평가해서 은행이 추천하고 서민금융진흥원이 최종 결정해요. 같은 조건이어도 은행마다 조금씩 달라질 수 있어요. 사전에 은행에 문의하면 대략적인 보증료율을 알 수 있어요." },
  { tag: null, q: "보증료를 미리 내는 건가요, 매달 나가는 건가요?",
    a: "보증료는 월부금에 자동으로 포함돼요. 매달 '이자 + 보증료 + 원금'을 함께 내는 거예요. 계산기에서 보면 월 보증료가 따로 보여도, 실제로는 전체 월부금에 섞여서 나가요. 낸 보증료는 성실상환하면 연 1회 감면/환급 심사를 받을 수 있어요." },
];

const STEPS = [
  { title: "신용도·채무 파악 — 5분이면 됩니다",
    desc: "신용보고서(신용점수) 확인, 기존 대출·카드론 총액 정리. 신용등급·연체 기록이 보증료율을 결정해요.",
    link: { label: "신용평가정보 조회", url: "https://www.kcredit.or.kr" },
  },
  { title: "은행·핀테크 비교 — 보증료율 다를 수 있어요",
    desc: "같은 서민금융진흥원 보증이라도 은행마다 금리·보증료·수수료가 조금씩 달라요. 국민·신한·농협·iM뱅크 등 3곳 이상 상담하고 비교하세요.",
    tip: "대출 조건은 은행 웹사이트나 1397(서민금융진흥원) 상담으로 미리 확인 가능해요",
  },
  { title: "햇살론 신청 — 온라인으로 10분",
    desc: "은행 앱 또는 웹에서 신청하면 서민금융진흥원이 신용도 심사해요. 기본정보·소득증명·신분증 정도면 충분해요.",
    tip: "신청 후 1~2일 내 보증료율과 금리가 확정돼요",
  },
  { title: "계약·실행 — 보증료 확인 단계",
    desc: "예정 금액 통보받으면 '월부금 = 원금상환액 + 이자 + 보증료' 이렇게 계산된 금액을 확인해요. 서명 전에 반드시 보증료 항목을 체크하세요.",
    tip: "이 단계에서 성실상환 조건·면제 이벤트가 있는지 마지막 질문하세요",
  },
  { title: "성실상환 — 보증료 감면 기회",
    desc: "12개월 이상 월 정해진 금액을 성실하게 상환하면 매해 보증료 감면/면제 신청이 가능해요.",
    tip: "서민금융진흥원 또는 대출은행에 '보증료 감면' 조회하면 돼요",
  },
];

const WARRANTY_EXEMPTION = [
  { title: "성실상환 감면", detail: "12개월 이상 상환 후 신청",
    desc: "서민금융진흥원 또는 은행에 보증료 감면 신청. 연 1회 가능해요. 상환 기간이 길수록 감면액 커져요.", highlight: true },
  { title: "신용회복사업 참여자", detail: "신용회복위원회 개인워크아웃 대상",
    desc: "신용회복사업 중인 사람은 보증료 감면 혜택 받을 수 있어요. 개인워크아웃 신청 시 함께 지원받으세요.", highlight: false },
  { title: "은행 프로모션", detail: "이벤트 기간 한정",
    desc: "iM뱅크·농협·국민은행 등에서 특정 기간 '첫 회 보증료 100% 지원' 같은 이벤트를 해요. 신청 전 확인하세요.", highlight: false },
  { title: "위기 가구 특별지원", detail: "극저소득층·기초수급자",
    desc: "소득 기준을 충족하면 정부에서 보증료를 직접 지원하는 경우도 있어요. 서민금융진흥원에 상담받아 보세요.", highlight: false },
];

// ─── 디자인 토큰 ──────────────────────────────────────────
const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

// ─── 공통 UI ──────────────────────────────────────────────
function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

// ─── 보증료 계산기 ────────────────────────────────────────
function Calculator() {
  const [loanAmount, setLoanAmount] = useState(1500); // 만원
  const [warrantyRate, setWarrantyRate] = useState(2.3);
  const [months, setMonths] = useState(60);

  const guaranteePercentage = 0.9; // 90%
  const guaranteeAmount = loanAmount * guaranteePercentage; // 보증 금액
  const annualWarranty = guaranteeAmount * (warrantyRate / 100); // 연간 보증료
  const monthlyWarranty = Math.round(annualWarranty / 12 * 100) / 100; // 월 보증료
  const totalWarranty = Math.round(annualWarranty * (months / 12) * 100) / 100; // 전체 보증료
  const exemptedCases = Math.round(totalWarranty * 0.5 * 100) / 100; // 성실상환 50% 감면 예상

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        슬라이더를 움직이면 실시간 계산돼요. 보증료는 <strong style={{ color: "#111" }}>대출금의 90%에만</strong> 붙어요.
      </p>
      {[
        { label: "대출금액", display: `${loanAmount}만원`, min: 500, max: 5000, step: 100, val: loanAmount, set: setLoanAmount },
        { label: "보증료율", display: `${warrantyRate}%`, min: 2.0, max: 3.0, step: 0.1, val: warrantyRate, set: setWarrantyRate },
        { label: "상환기간", display: `${months}개월`, min: 12, max: 84, step: 6, val: months, set: setMonths },
      ].map((s) => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <label style={{ fontSize: 13, color: "#6b7280", width: 90, flexShrink: 0 }}>{s.label}</label>
          <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
            onChange={(e) => s.set(+e.target.value)} style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 12, fontWeight: 700, minWidth: 85, textAlign: "right", color: "#111" }}>{s.display}</span>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 16 }}>
        {[
          { label: "보증 금액", value: `${Math.round(guaranteeAmount).toLocaleString()}만원`, sub: "대출금 90%", highlight: false },
          { label: "월 보증료", value: `${monthlyWarranty.toLocaleString()}만원`, sub: "월부금에 포함", highlight: false },
          { label: "전체 보증료", value: `${totalWarranty.toLocaleString()}만원`, sub: "총 상환 시", highlight: true },
          { label: "성실상환 감면", value: `약 ${exemptedCases.toLocaleString()}만원`, sub: "50% 감면 예상", highlight: false },
        ].map((c) => (
          <div key={c.label} style={{ background: "#fff", borderRadius: 8, border: `1px solid ${c.highlight ? "#9FE1CB" : "#e5e7eb"}`, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.highlight ? G : "#111", marginBottom: 3 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{c.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 보증료는 서민금융진흥원 2024년 기준 요율 적용했어요. 실제 신청 시 신용도에 따라 2.0~3.0% 범위 내에서 결정돼요.
        이자는 별도로 계산되며, 은행에 따라 연 5~8% 범위예요.
      </p>
    </div>
  );
}

// ─── 면제 조건 체커 ────────────────────────────────────────
function ExemptionChecker() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const passCount = Object.values(checked).filter(Boolean).length;
  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "c1", label: "신용카드 연체 기록이 없어요", desc: "(최근 12개월)" },
          { id: "c2", label: "기존 대출금이 월 소득의 100% 이상 아니에요" },
          { id: "c3", label: "이미 햇살론을 받은 적이 없어요", desc: "(신규 신청자)" },
          { id: "c4", label: "은행 이벤트 기간에 신청하려고 해요", desc: "(첫 회 보증료 100% 지원 등)" },
        ].map((item) => (
          <label key={item.id} onClick={() => toggle(item.id)} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: 8, cursor: "pointer",
            border: `1px solid ${checked[item.id] ? G : "#e5e7eb"}`,
            background: checked[item.id] ? GL : "#f9fafb",
          }}>
            <input type="checkbox" checked={!!checked[item.id]} readOnly style={{ accentColor: G, marginTop: 3, flexShrink: 0 }} />
            <span>
              <span style={{ fontSize: 13, lineHeight: 1.6, display: "block" }}>{item.label}</span>
              {item.desc && <span style={{ fontSize: 12, color: "#9ca3af" }}>{item.desc}</span>}
            </span>
          </label>
        ))}
      </div>
      {passCount >= 3 && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: GL, color: GD, fontSize: 13, lineHeight: 1.8 }}>
          <strong>{passCount}가지 해당해요.</strong> 보증료를 더 줄일 가능성이 높아요.<br />
          신청 전에 은행에 '보증료 감면 조건'을 물어보고, 이벤트 기간인지 확인하세요.
        </div>
      )}
      {passCount < 2 && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
          연체 기록이 있거나 채무가 많으면 보증료율이 올라갈 수 있어요.<br />
          그래도 성실상환으로 12개월 후 감면을 받을 수 있으니 포기하지 마세요.
        </div>
      )}
    </div>
  );
}

// ─── 절차 스텝 ────────────────────────────────────────────
function ProcessSteps() {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < STEPS.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />
          )}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
            {s.link && (
              <a href={s.link.url} style={{
                display: "inline-block", fontSize: 12, padding: "4px 10px", borderRadius: 6,
                background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600, marginTop: 8,
              }}>→ {s.link.label}</a>
            )}
            {s.tip && (
              <span style={{ display: "inline-block", fontSize: 12, marginTop: 7, marginLeft: s.link ? 8 : 0, background: GL, color: "#0F6E56", borderRadius: 6, padding: "4px 10px" }}>{s.tip}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 면제 방법 박스 ───────────────────────────────────────
function ExemptionMethods() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "10px 0 1.2rem" }}>
      {WARRANTY_EXEMPTION.map((m, i) => (
        <div key={i} style={{ padding: "12px 16px", borderRadius: 8, border: `1px solid ${m.highlight ? "#9FE1CB" : "#e5e7eb"}`, background: m.highlight ? GL : "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: m.highlight ? GD : "#111" }}>{m.title}</span>
            <span style={{ fontSize: 11, background: m.highlight ? G : "#f3f4f6", color: m.highlight ? "#fff" : "#6b7280", borderRadius: 4, padding: "1px 7px", fontWeight: 600 }}>{m.detail}</span>
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{m.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.tag ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)} style={{
            padding: "12px 16px", fontSize: 14, fontWeight: f.tag ? 600 : 500, cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: open === i ? "#f9fafb" : f.tag ? "#FFF7ED" : "#fff",
          }}>
            <span>
              {f.tag && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && (
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── 출처 및 참고자료 ──────────────────────────────────────
function References() {
  const REFERENCES = [
    { category: "법령", items: [
      { label: "서민금융지원법 제3조 — 보증료", url: "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=168348" },
      { label: "소비자보호법 제13조 — 금융기관 조건명시", url: "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=175410" },
    ]},
    { category: "공식 자료", items: [
      { label: "서민금융진흥원 — 햇살론 공식 안내", url: "https://www.kinfa.or.kr" },
      { label: "금융위원회 — 햇살론 기준금리·보증료율", url: "https://www.fsc.go.kr" },
      { label: "금융감독원 금융소비자 포털 — 보증료 계산기", url: "https://finlife.fss.or.kr" },
    ]},
    { category: "참고사이트", items: [
      { label: "iM뱅크 — 햇살론 전용 상품", url: "https://www.imbank.com" },
      { label: "국민은행 — 톡톡 햇살론", url: "https://www.kb.co.kr" },
      { label: "신한은행 — 신한 햇살론", url: "https://www.shinhan.com" },
    ]},
  ];

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {REFERENCES.map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
              <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요. 보증료는 신용도·은행·신청 시기에 따라 달라질 수 있으니 정확한 금액은 은행에 문의하세요.
      </p>
    </div>
  );
}

// ─── CTA ──────────────────────────────────────────────────
function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>지금 바로 햇살론 신청할 수 있어요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>보증료 계산기로<br />예상 금액을 확인한 후 신청하세요.</p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        서민금융진흥원 상담은 무료예요. 신청 전에 보증료율·면제 조건을 꼭 물어보세요.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400, margin: "0 auto" }}>
        <a href="https://www.kinfa.or.kr" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>
          웹사이트 방문 — 서민금융진흥원
        </a>
        <a href="tel:1397" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}`, whiteSpace: "nowrap" }}>
          전화상담 — 1397
        </a>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 16, lineHeight: 1.7 }}>
        햇살론은 소득 제한 없이 누구나 신청 가능해요. 신용도 낮아도 포기하지 마세요.
      </p>
    </div>
  );
}

// ─── 메인 페이지 ──────────────────────────────────────────
export default function Page() {
  return (
    <article style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px", ...body }}>
      {/* 타이틀 */}
      <h1 style={{ fontSize: 32, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.3 }}>
        햇살론 보증료<br />계산하고 면제받기
      </h1>
      <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 20, lineHeight: 1.6 }}>
        서민금융진흥원 90% 보증의 비용을 정확히 이해하고,<br />
        성실상환·이벤트로 보증료를 줄이는 방법
      </p>

      {/* 계산기 */}
      <GreenBox title="지금 당신의 보증료를 계산해보세요">
        <Calculator />
      </GreenBox>

      <Divider />

      {/* 섹션 1: 보증료란 */}
      <section>
        <H2>보증료가 뭐예요?</H2>
        <p>
          햇살론은 서민금융진흥원이 90% 보증해줘요. 은행 입장에서는 위험이 줄어드니까 저금리로 대출해줄 수 있는 거죠.
          그 보증료는 <strong>대출을 받은 사람이</strong> 서민금융진흥원에 매년 내는 거예요.
        </p>
        <p>
          예를 들어 1,000만원을 빌렸다고 해봐요. 보증료율이 2.3%면 보증금 900만원(대출금의 90%)에만 보증료가 붙어요.
          900만원 × 2.3% = 연 20.7만원이에요. 이걸 12개월로 나누면 월 1.7만원 정도를 매달 내는 거죠.
        </p>
        <GreenBox title="여기서 중요한 포인트">
          보증료는 <strong>상환하지 않은 잔금에만</strong> 붙어요. 예를 들어 3년(36개월) 상환 계획에서 1년 반(18개월) 만에 다 갚으면,
          남은 1년 반 보증료는 환급받아요. 빨리 갚을수록 이득이에요.
        </GreenBox>
        <p>
          이자와 헷갈릴 수 있는데, 이자는 은행 수익이고 보증료는 서민금융진흥원 수수료예요. 둘 다 내는 거죠.
        </p>
      </section>

      <Divider />

      {/* 섹션 2: 보증료율 */}
      <section>
        <H2>보증료율은 뭘로 정해져요?</H2>
        <p>
          보증료율은 <strong>신용도</strong>와 <strong>채무 상황</strong>으로 결정돼요. 신용등급이 낮거나 기존 대출이 많으면 특례보증(높은 요율)이 적용돼요.
        </p>
        <p>
          일반적으로 다음 두 가지로 나뉘어요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0 1.2rem" }}>
          {WARRANTY_RATES.map((r, i) => (
            <div key={i} style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#f9fafb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{r.type}</span>
                <span style={{ fontSize: 11, background: GL, color: GD, borderRadius: 4, padding: "1px 7px", fontWeight: 600 }}>{r.range}</span>
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>
        <p>
          <strong>서민금융진흥원과 은행이 협력해서</strong> 최종 요율을 정해요. 같은 신용도라도 은행마다 조금 다를 수 있으니,
          <a href="/w/햇살론-일반보증-특례보증-금리-조건" style={{ color: G, textDecoration: "none", fontWeight: 600 }}>햇살론 금리·조건 비교</a>
          {" "}글을 참고해서 여러 은행을 비교해보세요.
        </p>
      </section>

      <Divider />

      {/* 섹션 3: 면제 조건 */}
      <section>
        <H2>보증료를 줄일 수 있어요</H2>
        <p>
          보증료를 <strong>완전히 0원</strong>으로 만들 수는 없어요. 하지만 성실상환·정부 지원·은행 이벤트로 사실상 줄이거나 면제받을 수 있어요.
        </p>
        <p>
          당신이 어떤 상황인지 아래 체커로 확인해보세요.
        </p>
        <ExemptionChecker />
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111", marginTop: 24, marginBottom: 12 }}>면제·감면 방법 4가지</h3>
        <ExemptionMethods />
        <p style={{ marginTop: 16 }}>
          이 중 당신에게 맞는 게 있으면 신청 전에 은행에 꼭 말씀하세요. "보증료 감면이 가능한가요?"라고 물어보면 돼요.
        </p>
      </section>

      <Divider />

      {/* 섹션 4: 신청 절차 */}
      <section>
        <H2>보증료 확인하며 신청하는 방법</H2>
        <p>
          햇살론 신청할 때 보증료를 꼼꼼히 확인해야 해요. 그 과정이 5단계예요.
        </p>
        <ProcessSteps />
        <GreenBox title="신청 전에 꼭 확인하세요">
          월부금 고지서를 받으면 <strong>'보증료' 항목을 반드시 체크</strong>하세요.
          "월부금 = 원금상환액 + 이자 + 보증료"이 보이면 맞아요.
          이 단계에서 "성실상환 조건 뭐예요?", "첫 회 보증료 지원은 없나요?"라고 마지막 질문 꼭 하세요.
        </GreenBox>
      </section>

      <Divider />

      {/* 섹션 5: FAQ */}
      <section>
        <H2>자주 묻는 질문</H2>
        <FAQ />
      </section>

      <Divider />

      {/* CTA */}
      <CTA />

      {/* 출처 */}
      <References />

      {/* 내부 링크 */}
      <div style={{ marginTop: "2rem", borderTop: "1px solid #e5e7eb", paddingTop: "2rem" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12 }}>
          관련 글 더 보기
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { title: "햇살론 일반보증·특례보증 금리·조건 비교", href: "/w/햇살론-일반보증-특례보증-금리-조건" },
            { title: "햇살론 성실상환 금리인하", href: "/w/햇살론-성실상환-금리인하" },
            { title: "대출 상환 방식 비교 (원금균등·원리금균등)", href: "/w/대출-상환-방식-비교" },
            { title: "대출이자 계산기", href: "/w/대출이자-계산기" },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 4px",
              borderBottom: "1px solid #f3f4f6",
              textDecoration: "none",
              cursor: "pointer",
            }}>
              <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{link.title}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
