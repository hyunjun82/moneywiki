"use client";
// @ts-nocheck
import { useState } from "react";

const SIDEBAR_LINKS = [
  "이혼 위자료 청구",
  "이혼 재산분할 비율",
  "이혼 친권·양육권",
  "이혼 소송 증거 수집",
  "협의이혼 절차",
  "이혼 양육비 청구",
  "이혼 전 재산 빼돌림",
  "별거 중 이혼 가능한가",
  "이혼 무료 법률상담",
  "가정폭력 접근금지 신청",
  "가정폭력 쉼터 안내",
  "112 신고 후 절차",
  "임시조치 신청 방법",
  "사전처분 신청 방법",
  "이혼소송 진행 기간",
  "이혼 후 공동명의 대출",
  "이혼 소송 중 양육비",
  "폭행 상해 고소 방법",
  "이혼 소송 중 면접교섭",
  "재산분할 청구 기한",
];

const HUB_LINKS = [
  { title: "이혼 소송 증거 수집 방법 | 외도·폭력 증거 합법으로 모으는 법", desc: "법원에서 인정받는 증거 수집 방법", href: "#" },
  { title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인", desc: "가정폭력 위자료 1,000~3,000만원 기준", href: "#" },
  { title: "이혼 친권·양육권 | 법원 결정 기준과 유리하게 받는 방법", desc: "가정폭력 피해자에게 유리한 기준 확인", href: "#" },
  { title: "이혼 별거 중·소송 중 양육비 | 이혼 전에 받을 수 있는 임시 양육비", desc: "이혼 전이어도 양육비 청구 가능해요", href: "#" },
];

const STEPS = [
  {
    title: "지금 당장 — 112 신고하고 병원 가세요",
    desc: "폭력이 있었다면 오늘 바로 두 가지를 해야 해요. 첫째, 112 신고예요. 신고 기록은 나중에 재판에서 가장 강력한 증거가 돼요. 신고하기 두렵다면 1366에 전화하면 신고 방법부터 같이 잡아줘요. 둘째, 병원이에요. 통증이 없어 보여도 가세요. 진단서를 발급받을 때 '폭행으로 인한 상해'라고 원인이 구체적으로 적혀있어야 증거로 쓸 수 있어요. 그냥 '타박상'만 적힌 진단서는 효력이 약해요.",
    tip: "112 신고 내역은 나중에 경찰청 정보공개 청구로 발급받을 수 있어요. 지금 신고하면 영구 기록으로 남아요.",
    tel: { label: "여성긴급전화 1366 (24시간)", url: "tel:1366" },
  },
  {
    title: "이혼 전이어도 — 접근금지 임시조치 신청",
    desc: "이혼 소송을 내기 전이어도 가해자를 집에서 내보내거나 연락을 못 하게 막을 수 있어요. 경찰이 출동했다면 그 자리에서 경찰관에게 '임시조치 신청해달라'고 요청하세요. 또는 관할 가정법원에 직접 신청할 수 있어요. 접근금지·퇴거명령은 최대 2개월이고 2회 연장돼요. 이혼 소송 중이면 법원에 '사전처분'으로 동일한 효과를 받을 수 있어요.",
    link: { label: "대한법률구조공단 (132) — 신청서 작성 무료 지원", url: "tel:132" },
  },
  {
    title: "증거 확보 — 진단서 없어도 포기하지 마세요",
    desc: "지금 당장 할 수 있는 것부터 하세요. ① 폭행 현장 사진·영상이 있으면 클라우드에 백업해두세요. ② 카카오톡 협박·폭언 내역을 캡처해두세요. ③ 상담소나 병원에 간 기록이 있으면 남겨두세요. 진단서가 없어도 112 신고 기록 한 장으로 위자료가 인정된 사례가 실제로 있어요. 있는 것부터 모으고 1366이나 상담소에 연락하면 증거 수집 방법을 같이 잡아줘요.",
    tip: "아이가 목격자라도 아이 진술에만 의존하지 마세요. 법원은 아이 진술을 단독 증거로 채택하지 않아요.",
  },
  {
    title: "이혼 소송 제기 — 상대 동의 없어도 돼요",
    desc: "가정폭력은 민법 제840조 제3호 재판상 이혼 사유예요. 상대가 '이혼 안 해' 해도 법원이 이혼을 선고할 수 있어요. 가정법원에 이혼 + 위자료 + 재산분할 + 양육권을 한꺼번에 청구하세요. 소장 하나로 다 되고 비용은 인지대 2만원 정도예요. 변호사 비용이 없으면 132에 소송구조를 신청하면 변호사 선임 없이도 공단이 대리해줘요.",
    link: { label: "대한법률구조공단 (132)", url: "tel:132" },
  },
  {
    title: "위자료·재산분할 — 증거 많을수록 올라가요",
    desc: "위자료는 폭행 횟수, 지속 기간, 상해 정도, 아이에 대한 영향을 종합해서 법원이 결정해요. 실무상 1,000만원~3,000만원 범위예요. 재산분할은 혼인 중 모은 재산을 나누는 거예요. 가정폭력이 심각하면 기여도 비율 판단에도 영향을 줘요. 상대가 재산을 빼돌릴 것 같으면 소장 제출과 동시에 재산 가압류·처분금지가처분을 신청하세요. 소송 중에 재산이 없어지면 이겨도 못 받아요.",
  },
];

const EVIDENCE = [
  { type: "강력한 증거", items: ["병원 진단서 (상해 원인·부위 상세 기재)", "112 신고 내역 (경찰청 정보공개 청구 가능)", "폭행 현장 녹음·영상 파일", "폭언·협박 카카오톡·문자 메시지"] },
  { type: "보완 증거", items: ["의료기록 (통원 기록, 처방전)", "이웃·지인 목격자 진술서", "가정폭력 상담소 상담 이력", "심리상담 기록·치료 내역"] },
  { type: "간접 증거", items: ["부서진 물건 사진", "멍·상처 부위 사진 (날짜 기록)", "일기·메모 (날짜·내용 구체적)", "가해자 SNS 게시글"] },
];

const FAQS = [
  { urgent: true, q: "지금 폭력이 무서워서 이혼 얘기를 꺼내지 못하고 있어요.", a: "이혼 얘기를 꺼냈다가 더 심한 폭력을 당할까봐 두려운 거 충분히 이해해요. 혼자 해결하려고 하지 마세요. 여성긴급전화 1366(24시간), 가정폭력 상담소에 전화하면 안전 계획 수립, 쉼터 연계, 법률 지원까지 같이 도와줘요. 먼저 전화 한 통으로 시작하세요." },
  { urgent: true, q: "진단서가 없어요. 증거가 부족해도 이혼·위자료 받을 수 있나요?", a: "가능해요. 법원은 가정 내 폭력의 은밀한 특성을 알고 있어요. 112 신고 내역, 주변 정황, 상담 기록만으로 유책성을 인정해 높은 재산분할 비율을 인정한 사례가 실제로 있어요. 있는 증거를 전부 모아서 전문가와 상의하세요. 대한법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요." },
  { urgent: true, q: "아이를 데리고 집을 나왔어요. 친권·양육권은 어떻게 되나요?", a: "가정폭력 피해자가 아이를 데리고 나온 것은 양육권 판단에서 불리하게 작용하지 않아요. 오히려 가해자가 아이에게도 폭력적이었다면 친권·양육권 판단에서 매우 불리해져요. 이혼 소송 중 법원에 '임시 양육자 지정' 사전처분을 신청하면 소송 기간 동안 아이와 함께 있을 수 있어요." },
  { urgent: false, q: "폭력 증거가 없는데 상대가 '내가 맞았다'고 역주장해요.", a: "가정폭력 가해자가 피해자인 척 역주장하는 경우가 있어요. 법원은 양측 주장을 비교하며 일관성·구체성·정황을 살펴요. 가해자의 주장이 억지스럽고 구체성이 없다면 오히려 가해자의 폭력적 성향을 더 드러내는 증거가 돼요. 당황하지 말고 있는 증거와 사실관계를 정리해 제출하면 돼요." },
  { urgent: false, q: "폭력이 딱 1번 있었는데 이혼 사유가 되나요?", a: "1회 폭행만으로는 이혼이 인정되기 어려울 수 있어요. 법원은 '혼인관계의 지속을 강요하는 것이 가혹하다고 여겨질 정도'인지를 봐요. 1회라도 폭행의 정도가 심각하거나, 협박·감금 등 다른 위협이 병행됐다면 인정될 수 있어요. 구체적인 상황은 법률구조공단(132) 또는 가정폭력 상담소에 상담하세요." },
  { urgent: false, q: "이혼 소송 중 가해자가 연락을 계속 해요.", a: "이혼 소송을 제기한 뒤에도 접근금지 사전처분을 신청할 수 있어요. 법원이 사전처분 결정을 내리면 가해자는 연락·접근이 금지돼요. 위반하면 과태료·감치 처분을 받아요. 소송을 제기하면 담당 재판부에 즉시 신청하세요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민법 제840조 제3호 — 재판상 이혼 사유 (심히 부당한 대우)", url: "https://www.law.go.kr/" },
    { label: "가정폭력범죄의 처벌 등에 관한 특례법 제29조 — 임시조치", url: "https://www.law.go.kr/" },
    { label: "가사소송법 — 2026. 1. 1. 시행", url: "https://www.law.go.kr/" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령 — 가정폭력 이혼 (2025. 11. 15. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=6&cciNo=2&cnpClsNo=2" },
    { label: "여성가족부 가정폭력 피해자 지원 — 1366", url: "https://www.mogef.go.kr" },
    { label: "대한법률구조공단 — 가정폭력 법률지원", url: "https://www.klac.or.kr" },
    { label: "찾기쉬운 생활법령 — 이혼 위자료 (2026. 1. 31. 기준)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=4&cciNo=1&cnpClsNo=1" },
  ]},
];

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() { return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />; }
function H2({ children }: { children: React.ReactNode }) { return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>; }
function Bdg({ children }: { children: React.ReactNode }) { return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>{children}</span>; }
function GreenBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    now: { title: "지금 위험한 상황이라면", color: "#DC2626", bg: "#FEF2F2",
      text: "112에 즉시 신고하세요. 경찰이 출동하면 폭력 제지와 분리가 이뤄져요. 여성긴급전화 1366은 24시간 운영해요. 가정폭력 쉼터로 안전하게 이동할 수 있어요. 이혼 절차는 안전을 확보한 후에 진행해도 늦지 않아요." },
    evidence: { title: "증거를 모으고 싶다면", color: "#7C3AED", bg: "#F5F3FF",
      text: "지금 당장 할 수 있는 것: ① 상처 부위 사진 촬영 (날짜 기록) ② 병원 방문 → 진단서 발급 ③ 폭언·협박 대화 캡처 저장 ④ 112 신고 내역 경찰청 정보공개 청구. 진단서가 없어도 포기하지 마세요. 112 신고 기록만으로도 인정된 사례가 있어요." },
    divorce: { title: "이혼 절차를 시작하고 싶다면", color: G, bg: GL,
      text: "가정법원에 이혼·위자료·재산분할·양육권을 동시에 청구해요. 상대가 동의하지 않아도 재판상 이혼이 가능해요. 비용이 없으면 대한법률구조공단(132)에 소송구조를 신청하면 변호사 비용 없이 진행할 수 있어요." },
  };
  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "now", label: "지금 위험한 상황이에요. 당장 어떻게 해야 하나요?" },
          { id: "evidence", label: "증거를 모아두고 싶어요. 뭐가 필요한가요?" },
          { id: "divorce", label: "이혼 절차를 시작하려고 해요." },
        ].map((item: any) => (
          <button key={item.id} onClick={(_e: any) => setType(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
  const m = messages[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <strong style={{ fontSize: 14, color: m.color }}>{m.title}</strong>
        <button onClick={(_e: any) => setType(null)} style={{ fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function EvidenceChecker() {
  const [checked, setChecked] = useState({});
  const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  const total = EVIDENCE.flatMap(g => g.items).length;
  const count = Object.values(checked).filter(Boolean).length;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden", marginBottom: "1.5rem" }}>
      <div style={{ padding: "14px 16px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", margin: 0 }}>📋 증거 체크리스트</p>
        <span style={{ fontSize: 12, color: count > 0 ? G : "#9ca3af", fontWeight: 600 }}>{count}/{total} 확보</span>
      </div>
      {EVIDENCE.map((group: any) => (
        <div key={group.type} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.05em", padding: "10px 16px 4px", margin: 0 }}>{group.type.toUpperCase()}</p>
          {group.items.map((item: any) => {
            const key = group.type + item;
            return (
              <label key={key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", cursor: "pointer", borderBottom: "1px solid #f9fafb" }}>
                <input type="checkbox" checked={!!checked[key]} onChange={(_e: any) => toggle(key)} style={{ accentColor: G, width: 15, height: 15, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: checked[key] ? G : "#374151", textDecoration: checked[key] ? "none" : "none" }}>{item}</span>
              </label>
            );
          })}
        </div>
      ))}
      {count >= 3 && (
        <div style={{ padding: "12px 16px", background: GL, fontSize: 13, color: GD }}>
          ✓ {count}가지 증거를 확보했어요. 대한법률구조공단(132) 또는 가정법원에 이혼 소송을 제기할 수 있어요.
        </div>
      )}
    </div>
  );
}

function ProcessSteps() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
      {STEPS.map((step: any, i: any) => (
        <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, background: "#e5e7eb", minHeight: 20 }} />}
          </div>
          <div style={{ paddingBottom: i < STEPS.length - 1 ? 20 : 0, flex: 1 }}>
            <strong style={{ fontSize: 14, color: "#111", display: "block", marginBottom: 4, lineHeight: 1.5 }}>{step.title}</strong>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, margin: "0 0 4px" }}>{step.desc}</p>
            {step.tip && <div style={{ fontSize: 12, color: GD, background: GL, borderRadius: 6, padding: "6px 10px", marginTop: 6 }}>💡 {step.tip}</div>}
            {step.link && <a href={step.link.url} style={{ fontSize: 12, color: G, fontWeight: 600, textDecoration: "none", display: "inline-block", marginTop: 6 }}>→ {step.link.label}</a>}
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
      {FAQS.map((faq: any, i: any) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
          <button onClick={(_e: any) => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", lineHeight: 1.5, display: "flex", alignItems: "center", gap: 8 }}>
              {faq.urgent && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10, background: "#FEE2E2", color: "#DC2626", flexShrink: 0 }}>긴급</span>}
              {faq.q}
            </span>
            <span style={{ fontSize: 16, color: "#9ca3af", flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 14px 14px", fontSize: 13, color: "#374151", lineHeight: 1.9, borderTop: "1px solid #f3f4f6" }}>
              <p style={{ margin: "12px 0 0" }}>{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 도움받을 수 있는 곳</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { label: "여성긴급전화 1366 (24시간)", url: "tel:1366", sub: "폭력 신고·상담·쉼터 연계" },
          { label: "대한법률구조공단 (132)", url: "tel:132", sub: "무료 법률상담·소송구조 신청" },
          { label: "가정폭력 상담소 — 복지로 검색", url: "https://www.bokjiro.go.kr", sub: "가까운 상담소 찾기" },
        ].map((item: any, i: any) => (
          <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span>
              <span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span>
            </div>
            <span style={{ color: G, fontWeight: 700 }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
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

function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {REFERENCES.map((group: any) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item: any) => (
              <a key={item.label} href={item.url} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>이 글은 2026년 3월 기준 법령·공식 자료를 바탕으로 작성됐어요.</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼·가정폭력 관련 글</p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function GajungpokryeokIhonPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 가정폭력 · 위자료</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          가정폭력 이혼 방법 |<br />
          신고부터 이혼 소송·위자료까지
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          이혼 얘기를 꺼냈다가 더 심하게 맞을까봐, 아이 때문에, 경제적으로 독립이 안 돼서 — 이 중 하나라도 해당하면 지금 이 글이 필요한 상황이에요.<br /><br />
          가정폭력은 상대가 동의하지 않아도 재판으로 이혼할 수 있는 사유예요. 진단서가 없어도, 증거가 부족해도 112 신고 기록 하나로 인정된 사례가 있어요.<br />
          안전 확보가 먼저예요. 지금 어떤 상황인지 선택하면 바로 필요한 정보를 드릴게요.
        </p>

        <UrgentBanner />

        <Bdg>어떤 증거가 있는지 먼저 체크해보세요</Bdg>
        <EvidenceChecker />

        <Divider />

        <H2>가정폭력 신고부터 이혼 소송 제기까지 — 순서대로</H2>
        <p style={body}>
          이혼 소송을 먼저 내면 안 돼요. 안전 확보 → 증거 확보 → 소송 순서로 진행해야 해요.<br />
          이혼 소송을 내기 전에 임시조치(접근금지)를 받아두면, 소송 중에 가해자가 연락하거나 접근하는 걸 법으로 막을 수 있어요.<br />
          1366이나 법률구조공단(132)에 연락하면 이 순서를 같이 잡아줘요. 혼자 법원에 가지 않아도 돼요.
        </p>
        <ProcessSteps />

        <Divider />

        <H2>가정폭력 이혼 위자료, 얼마나 받을 수 있나요?</H2>
        <p style={body}>
          위자료는 "폭력이 있었으니 얼마"처럼 정해진 금액이 없어요. 법원이 증거를 보고 직권으로 결정해요.<br />
          실무상 1,000만원~3,000만원 범위에서 판단되는 경우가 많지만, 증거가 많고 구체적일수록 높아져요.<br /><br />
          중요한 건 위자료만 생각하지 말라는 거예요. 재산분할에서 가정폭력이 인정되면 분할 비율이 달라질 수 있고, 양육권 판단에도 영향을 줘요. 세 가지를 동시에 청구하세요.
        </p>
        <BorderBox title="위자료를 높이려면 이 증거가 핵심이에요">
          폭행 횟수·지속 기간을 입증하는 자료 → 112 신고 내역(경찰청 정보공개 청구), 진단서 여러 장<br />
          정신적 피해를 입증하는 자료 → 심리상담 기록, 상담소 상담 이력<br />
          자녀에 대한 영향 → 자녀 상담 기록, 학교 상담 내역<br />
          가해자 재산 상태 → 재산분할과 동시에 청구하면 위자료 산정에도 반영돼요.
        </BorderBox>

        <HubLinks />

        <H2>가정폭력 이혼 소송·위자료에 대해 자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황 먼저 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률 정보 제공을 목적으로 작성됐어요. 구체적인 상황은 여성긴급전화(1366), 대한법률구조공단(132) 또는 가정법원에 상담하세요.
        </div>
      </div>
    </div>
  );
}
