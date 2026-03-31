"use client";
// @ts-nocheck
import { useState } from "react";
$BBOX

// 7번: 무보험 교통사고 처리 | 피해자 보상 방법과 과실 처리

const SIDEBAR_LINKS = ["교통사고 합의 방법","뺑소니 사고 처리","자동차보험 청구","교통사고 과실 비율","형사합의 방법","교통사고 진단서","교통사고 치료비","보험사 합의 거절","교통사고 소송","자동차 수리비 청구","공탁 방법","교통사고 위자료","후유장애 보상","정부보장사업 청구","자동차손해배상보장법","무보험차상해특약","뺑소니 신고 방법","사고 현장 증거 수집","보험료 할증 확인","자동차 전손 처리"];

const HUB_LINKS = [
  { title: "폭행 상해 고소 방법 | 증거 수집부터 수사 절차까지", desc: "교통사고 가해자 형사 고소 방법", href: "#" },
  { title: "소액사건 소장 작성 | 3,000만원 이하 금전 청구", desc: "소액 수리비·치료비 민사 청구", href: "#" },
  { title: "가압류 신청 방법 | 비용·절차·재산 유형별", desc: "가해자 재산 선제적으로 묶기", href: "#" },
  { title: "차용증 없이 빌려준 돈 받는 방법", desc: "이체 내역으로 소송하기", href: "#" },
];

const COMPENSATION_LIMITS = [
  { type: "사망", limit: "1억 5,000만원 (최소 2,000만원)", note: "정부보장사업 한도" },
  { type: "부상", limit: "최고 3,000만원", note: "부상 급수별 차등 지급" },
  { type: "후유장애", limit: "최고 1억 5,000만원", note: "장애 등급별 차등" },
];

const STEPS = [
  {
    title: "사고 직후 — 112 신고하고 현장 기록하세요",
    desc: "무보험 차에 치였다는 걸 알아도 112 신고를 안 하는 경우가 많아요. 신고 없이 가해자와 개인 합의만 하면 나중에 정부보장사업 청구가 어려워지고, 합의 금액이 실제 손해보다 적어도 추가 청구가 막혀요. 사고 현장에서 반드시 ① 112 신고 ② 가해 차량 번호판 사진 ③ 운전자 신분증 확인 ④ 현장 사진 촬영을 하세요. 가해자가 도망가더라도 차량 번호만 있으면 나중에 정부보장사업 청구할 수 있어요.",
    tip: "현장에서 가해자가 '나중에 다 줄게'라고 해도 신고 먼저 하세요. 신고 기록 없으면 나중에 손해예요.",
  },
  {
    title: "사고 당일 — 통증 없어도 병원 가세요",
    desc: "교통사고 후 통증은 2~3일 뒤에 나타나는 경우가 많아요. 사고 당일 병원을 가지 않으면 나중에 치료를 시작할 때 '사고와 관계없는 것'으로 인과관계를 부정당할 수 있어요. 사고 당일 응급실이나 정형외과를 방문해서 '교통사고로 내원했다'고 밝히고 치료 기록을 만들어두세요. 치료비 영수증은 전부 보관하세요. 나중에 정부보장사업 청구할 때 필요해요.",
  },
  {
    title: "보상 경로 확인 — 내 보험 먼저, 그 다음 정부보장사업",
    desc: "두 가지를 확인하세요. 첫째, 내 자동차보험에 '무보험자동차상해 특약'이 있는지 확인하세요. 보험증권이나 보험사 앱에서 확인 가능해요. 특약이 있으면 내 보험사에 청구하면 돼요. 보험료도 올라가지 않아요. 둘째, 특약이 없거나 가해자를 알 수 없으면 정부보장사업(1544-0049)에 청구하세요. 어느 손해보험회사 창구에서나 접수할 수 있어요.",
    tel: { label: "정부보장사업 1544-0049", url: "tel:15440049" },
  },
  {
    title: "정부보장사업 청구 — 서류 준비해서 보험사 창구 방문",
    desc: "청구 서류는 ① 교통사고사실확인서(경찰서 발급) ② 진단서 ③ 치료비 영수증 ④ 보상금 청구서(보험사 창구 비치)예요. 교통사고사실확인서는 경찰 신고가 접수된 뒤 발급받을 수 있어요. 사고 발생일로부터 3년 이내에 청구해야 해요. 이미 자비로 치료비를 낸 경우에도 영수증이 있으면 소급 청구 가능해요.",
  },
  {
    title: "보상이 부족하면 — 가해자에게 직접 청구",
    desc: "정부보장사업 보상 한도를 초과하는 손해는 가해자에게 직접 민사소송으로 청구할 수 있어요. 수리비 등 대물 피해는 정부보장사업 대상이 아니에요. 자차 보험으로 처리한 뒤 보험사가 가해자에게 구상하거나, 직접 소액사건 소송을 제기하면 돼요. 가해자 재산이 있으면 소송 전에 가압류를 신청해서 먼저 묶어두는 게 안전해요.",
  },
];

const FAQS = [
  { urgent: true, q: "사고 현장에서 가해자와 개인 합의만 했어요. 나중에 치료비 더 받을 수 있나요?", a: "합의서에 '일체의 청구를 포기한다'는 내용이 있으면 어렵지만, 이후 예상 못한 후유증이 발생했다면 추가 청구가 가능한 경우도 있어요. 합의서 서명 전에는 반드시 치료가 완전히 끝난 상태에서 서명하는 게 중요해요. 아직 합의서를 쓰지 않았다면 서두르지 마세요." },
  { urgent: true, q: "가해자가 연락을 끊었어요. 어떻게 보상받나요?", a: "무보험 차 가해자가 도주하거나 연락을 끊으면 정부보장사업(1544-0049)을 통해 보상을 받을 수 있어요. 청구 기한은 사고 발생일로부터 3년이에요. 치료비 납입 영수증을 가지고 손해보험회사 창구에 방문하면 돼요." },
  { urgent: false, q: "무보험 차와 사고 나면 내 보험료가 올라가나요?", a: "무보험자동차상해 특약으로 보험금을 받아도 내 보험료는 올라가지 않아요. 특약 구조상 내 보험사가 나중에 가해자에게 구상권을 행사하기 때문에 내 할인할증등급에 영향을 주지 않아요." },
  { urgent: false, q: "자동차가 아닌 오토바이와 사고 났는데 정부보장사업 적용이 되나요?", a: "오토바이(이륜차)도 자동차손해배상보장법 적용 대상이에요. 무보험 이륜차와 사고가 났다면 동일하게 정부보장사업을 통해 보상 청구할 수 있어요." },
  { urgent: false, q: "수리비가 많이 나왔는데 가해자가 배상을 거부해요.", a: "가해자가 배상을 거부하면 민사소송을 제기할 수 있어요. 수리비가 3,000만원 이하이면 소액사건심판 절차로 빠르게 처리돼요. 정부보장사업은 대인(사람) 피해만 보상하고 대물(차량 수리비) 보상은 하지 않아요. 자차 보험으로 처리 후 보험사가 가해자에게 구상하는 방법도 있어요." },
];

const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }: any) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
const Bdg = ({ children }: any) => <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>;

function UrgentBanner() {
  const [type, setType] = useState(null);
  const msgs = {
    now: { title: "방금 사고가 났다면", color: "#DC2626", bg: "#FEF2F2", text: "① 112 신고 ② 병원 방문 (통증 없어도) ③ 가해 차량 번호·운전자 정보 사진으로 기록. 경찰 신고 없이 개인 합의만 하지 마세요. 나중에 치료비 청구가 어려워져요." },
    claim: { title: "보상 청구 방법을 알고 싶다면", color: G, bg: GL, text: "무보험·뺑소니 사고 → 정부보장사업(1544-0049). 내 보험에 무보험차상해 특약 → 내 보험사에 먼저 청구. 가해자에게 직접 청구 → 소액소송 또는 민사소송. 아래에서 단계별로 확인하세요." },
    limit: { title: "보상 한도를 알고 싶다면", color: "#7C3AED", bg: "#F5F3FF", text: "정부보장사업 한도: 사망 1억 5,000만원, 부상 최고 3,000만원, 후유장애 최고 1억 5,000만원. 실제 손해액이 이를 초과하면 가해자에게 직접 추가 청구 가능해요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "now", label: "방금 무보험 차와 사고가 났어요." },
          { id: "claim", label: "보상을 어디서 어떻게 받아야 하는지 모르겠어요." },
          { id: "limit", label: "정부보장사업 보상 한도가 궁금해요." },
        ].map((item) => (
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
        <strong style={{ fontSize: 14, color: m.color }}>{m.title}</strong>
        <button onClick={() => setType(null)} style={{ fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function ProcessSteps() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
      {STEPS.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, background: "#e5e7eb", minHeight: 20 }} />}
          </div>
          <div style={{ paddingBottom: i < STEPS.length - 1 ? 20 : 0, flex: 1 }}>
            <strong style={{ fontSize: 14, color: "#111", display: "block", marginBottom: 4, lineHeight: 1.5 }}>{step.title}</strong>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 4px" }}>{step.desc}</p>
            {step.tel && <a href={step.tel.url} style={{ fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", display: "inline-block", marginTop: 6 }}>→ {step.tel.label}</a>}
          </div>
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>교통사고·보험 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function MuboheomAccidentPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>교통사고 · 무보험 · 정부보장사업</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          무보험 교통사고 처리 |<br />
          피해자 보상 방법과 과실 처리
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          무보험 차에 치였는데 가해자가 "돈 없다", "나중에 줄게" 하면서 버티거나 연락을 끊었나요.<br />
          보험이 없는 차량 사고라도 포기하지 않아도 돼요. 정부가 대신 보상해주는 제도가 있어요.<br /><br />
          핵심은 두 가지예요. 반드시 112 신고하고, 바로 병원 가야 해요.<br />
          신고 기록이 없으면 나중에 정부보장사업 청구가 어려워져요. 가해자와 개인 합의만 하고 끝내면 안 돼요.
        </p>

        <UrgentBanner />

        <H2>무보험 교통사고 피해자 보상 방법 — 정부보장사업 한도</H2>
        <p style={body}>
          정부보장사업은 가해자가 무보험이거나 뺑소니인 경우, 국가가 피해자에게 직접 보상하는 제도예요.<br />
          가해자가 도망가거나 돈이 없어도 청구할 수 있어요. 사고 후 3년 안에 청구해야 해요.<br />
          청구는 삼성화재·현대해상 등 손해보험회사 창구 어디서나 가능하고, 보험사가 지급 후 가해자에게 구상해요.
        </p>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem" }}>
          {COMPENSATION_LIMITS.map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 14px", borderBottom: i < COMPENSATION_LIMITS.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", width: 80, flexShrink: 0 }}>{row.type}</span>
              <span style={{ fontSize: 13, color: G, fontWeight: 700, flex: 1 }}>{row.limit}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{row.note}</span>
            </div>
          ))}
        </div>
        <BorderBox title="청구 기한 3년 — 지나친 치료비도 소급 청구 가능해요">
          사고 발생일로부터 3년 이내에 청구해야 해요.<br />
          이미 자비로 치료비를 낸 경우에도 영수증만 있으면 최근 3년치까지 소급해서 돌려받을 수 있어요.<br />
          영수증을 버렸다면 병원에서 진료비 납부 확인서를 재발급 받으세요.
        </BorderBox>

        <HubLinks />

        <H2>무보험 교통사고 피해자 보상 절차 — 순서대로</H2>
        <p style={body}>
          사고 직후 가장 많이 실수하는 게 경찰 신고 없이 가해자와 개인 합의부터 하는 거예요.<br />
          가해자가 처음엔 갚겠다고 해도 나중에 연락을 끊으면 손해배상 청구도 어렵고, 정부보장사업 청구도 복잡해져요.<br />
          반드시 112 신고 → 병원 → 정부보장사업 청구 순서로 진행하세요.
        </p>
        <ProcessSteps />

        <Divider />
        <H2>무보험 교통사고 피해자 보상 방법에 대해 자주 묻는 것들</H2>
        <FAQ />

        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 연락하세요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "정부보장사업 통합안내 1544-0049", url: "tel:15440049", sub: "무보험·뺑소니 피해 보상 청구" },
              { label: "경찰청 교통민원 민원24", url: "https://www.minwon.go.kr", sub: "교통사고사실확인서 발급" },
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 법률상담" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 자동차손해배상보장법·찾기쉬운 생활법령을 바탕으로 작성됐어요.
        </div>
      </div>
    </div>
  );
}
