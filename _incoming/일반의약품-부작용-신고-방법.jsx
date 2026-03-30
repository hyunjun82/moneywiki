import { useState } from "react";

/*
Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
→ 약을 먹고 몸에 이상 반응(두드러기, 구토, 어지러움 등)이 생겼는데, 이걸 어디에 어떻게 알려야 하는지 모르는 상황. 혹은 부작용이 심해서 병원비가 나왔는데 보상받을 수 있는지 궁금한 상황.

Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
→ 부작용 신고를 직접 접수하고, 피해구제 신청 자격이 되는지 확인하고, 필요한 서류를 준비해서 신청까지 할 수 있어야 함.

Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
→ 신고 채널(의약품안전나라·전화), 피해구제 제도 존재와 보상 범위(진료비·사망·장애·장례비), 신청 자격(2014.12.19 이후 부작용), 신청 기한(5년), 필요 서류, 절차.

Q4. 이 정보를 가장 잘 전달하는 형태는?
→ UrgentBanner(상황 분기) + 자격 체커(내가 해당되는지 바로 확인) + 보상 계산기(최저임금 기반 보상금 확인) + Steps(신고·신청 절차) + DocTable(서류) + FAQ + CTA
*/

// ─── 2026년 최저임금 기준 보상금 계산
// 2026년 최저임금: 시간당 10,030원 → 월환산액 2,096,270원 (209.6만원)
// 사망일시보상금: 월환산액 × 60개월(5년)
const MONTHLY_MIN_WAGE = 2096270;
const DEATH_COMPENSATION = MONTHLY_MIN_WAGE * 60; // 약 1억 2,578만원
const DISABILITY_RATES = [1.0, 0.75, 0.5, 0.25]; // 1~4급
const MAX_MEDICAL = 50000000; // 진료비 상한 5,000만원

const SIDEBAR_LINKS = [
  "타이레놀 부작용 증상",
  "이부프로펜 부작용 주의사항",
  "항생제 부작용 종류",
  "약 알레르기 반응 대처법",
  "의약품 부작용 피해구제 신청",
  "의약품안전나라 사용법",
  "약국 조제 오류 신고",
  "한국의약품안전관리원 역할",
  "식약처 의약품 리콜 확인",
  "어린이 약 부작용 대처",
  "노인 다약제 부작용 위험",
  "의약품 병용금기 확인 방법",
  "처방약 부작용 의사 상담",
  "건강기능식품 부작용 신고",
  "백신 부작용 피해보상 제도",
  "약 부작용 진료비 청구 방법",
  "소비자 의약품 부작용 보고",
  "약사법 부작용 보고 의무",
  "의약품 피해구제 심의 기간",
  "의약품 안전성 정보 확인",
];

const HUB_LINKS = [
  { title: "타이레놀 부작용 증상과 안전한 복용법", desc: "간 손상 위험부터 복용 간격까지", href: "/w/타이레놀-부작용" },
  { title: "약 알레르기 반응, 응급 상황 대처법", desc: "두드러기·호흡곤란 즉시 해야 할 일", href: "/w/약-알레르기-대처" },
  { title: "어린이 약 부작용 증상과 부모 대응법", desc: "영유아 해열제·항생제 부작용 체크리스트", href: "/w/어린이-약-부작용" },
  { title: "백신 부작용 피해보상 신청 방법", desc: "코로나·독감 백신 이상반응 보상 절차", href: "/w/백신-부작용-보상" },
];

const DOCS = [
  { name: "피해구제 급여신청서", required: true, where: "의약품안전나라 다운로드" },
  { name: "개인정보 수집·이용 동의서", required: true, where: "의약품안전나라 다운로드" },
  { name: "진료기록부 사본", required: true, where: "부작용 발생 당시 병원" },
  { name: "의약품 처방전 또는 구매 영수증", required: true, where: "병원·약국" },
  { name: "진단서 또는 소견서", required: true, where: "담당 의사 발급" },
  { name: "진료비 영수증 (진료비 청구 시)", required: false, where: "병원 수납 창구" },
  { name: "사망진단서 (사망 시)", required: false, where: "병원·보건소" },
  { name: "장애진단서 (장애 시)", required: false, where: "담당 의사 발급" },
  { name: "가족관계증명서 (유족 신청 시)", required: false, where: "정부24, 주민센터" },
];

const STEPS_REPORT = [
  {
    title: "증상 기록부터 하세요",
    desc: "어떤 약을 얼마나 먹었는지, 언제부터 어떤 증상이 생겼는지 적어두세요. 약 포장지나 영수증도 보관하세요. 나중에 신고할 때 이 기록이 핵심이에요.",
  },
  {
    title: "병원에 가서 진료를 받으세요",
    desc: "부작용 증상을 의사에게 정확히 말하고, 어떤 약 때문에 생긴 것 같은지 이야기하세요. 진료기록에 남아야 이후 피해구제 신청이 가능해요.",
  },
  {
    title: "의약품안전나라에서 부작용 신고",
    desc: "nedrug.mfds.go.kr에 접속해서 '부작용 보고' 메뉴에서 신고하면 돼요. 회원가입 없이도 일반인 신고가 가능해요.",
    link: { label: "nedrug.mfds.go.kr", url: "https://nedrug.mfds.go.kr" },
    tel: { label: "1644-6223", url: "tel:16446223" },
  },
  {
    title: "전화 신고도 가능해요",
    desc: "한국의약품안전관리원 1644-6223으로 전화하면 상담원이 신고 접수를 도와줘요. 온라인이 어려우면 전화가 더 편해요.",
    tip: "평일 09:00~18:00, 공휴일 제외",
  },
];

const STEPS_RELIEF = [
  {
    title: "피해구제 신청서 작성",
    desc: "의약품안전나라(nedrug.mfds.go.kr)에서 온라인 신청하거나, 서류를 작성해서 우편으로 보내면 돼요.",
    link: { label: "nedrug.mfds.go.kr", url: "https://nedrug.mfds.go.kr/cntnts/230" },
  },
  {
    title: "접수 및 조사",
    desc: "한국의약품안전관리원에서 서류를 접수하고, 의약품과 부작용 사이의 인과관계를 조사해요. 필요하면 추가 서류를 요청할 수 있어요.",
  },
  {
    title: "인과성 평가 + 심의",
    desc: "식약처 소속 전문가 위원회에서 의약품 부작용이 맞는지 인과성을 평가하고, 보상 여부와 금액을 심의해요.",
    tip: "접수부터 결정까지 보통 120일 내외",
  },
  {
    title: "보상금 지급",
    desc: "심의에서 인정되면 진료비·사망일시보상금·장애일시보상금·장례비 중 해당 항목이 지급돼요. 계좌로 입금돼요.",
  },
];

const CHECKLIST = [
  "부작용 증상 발생 일시·내용 메모 완료",
  "복용한 약 이름·용량·복용 기간 기록",
  "약 포장지·영수증·처방전 보관",
  "병원 방문해서 진료 + 진료기록 확보",
  "의약품안전나라에서 부작용 신고 접수",
  "피해구제 신청서 + 동의서 작성",
  "진단서·진료비 영수증 등 서류 준비",
  "한국의약품안전관리원에 피해구제 접수",
];

const FAQS = [
  { urgent: true, q: "일반의약품(약국에서 산 약)도 피해구제 대상이에요?", a: "네, 대상이에요. 처방약뿐 아니라 약국에서 직접 구매한 일반의약품도 피해구제 신청이 가능해요. 다만 정상적인 용법·용량대로 복용했는데 부작용이 생긴 경우에 해당돼요. 과다복용이나 오남용은 제외될 수 있어요. 약 부작용이 의심되면 일단 신고부터 하세요." },
  { urgent: true, q: "부작용 신고하면 약국이나 제약사에 불이익이 가나요?", a: "신고는 약의 안전성을 높이기 위한 거예요. 특정 약국이나 제약사를 처벌하려는 게 아니에요. 신고 내용은 통계·안전성 분석에 활용되고, 신고인 정보는 비밀이 보장돼요. 부담 없이 신고하면 돼요." },
  { urgent: true, q: "부작용이 생긴 지 오래됐는데 지금도 신청할 수 있나요?", a: "2014년 12월 19일 이후에 발생한 부작용이라면 신청 가능해요. 다만 진료비는 진료일로부터 5년, 사망·장애 보상금은 발생일로부터 5년 이내에 신청해야 해요. 5년이 넘으면 신청 자체가 안 되니까, 해당된다면 빨리 접수하세요." },
  { urgent: false, q: "보상금은 얼마나 받을 수 있어요?", a: "보상 유형에 따라 달라요. 진료비는 건강보험 적용 범위 내에서 최대 5,000만원까지, 사망일시보상금은 최저임금 월환산액의 60개월분(2026년 기준 약 1억 2,578만원)이에요. 장애는 등급에 따라 사망보상금의 25~100% 비율로 지급돼요." },
  { urgent: false, q: "건강기능식품 부작용도 여기서 신고하나요?", a: "아니에요. 건강기능식품은 '의약품'이 아니라서 이 피해구제 제도 대상이 아니에요. 건강기능식품 부작용은 식품안전나라(foodsafetykorea.go.kr) 또는 식약처 통합민원신고(uvoice.mfds.go.kr)로 신고하면 돼요." },
  { urgent: false, q: "피해구제 심의에서 탈락하면 방법이 없나요?", a: "이의신청을 할 수 있어요. 결정 통보를 받은 날로부터 90일 이내에 이의신청서를 제출하면 재심의가 진행돼요. 새로운 의학적 증거나 추가 자료가 있으면 인정될 가능성이 높아져요. 한국의약품안전관리원(1644-6223)에 상담해보세요." },
  { urgent: false, q: "신고는 본인만 할 수 있나요?", a: "아니에요. 환자 본인, 보호자, 의사, 약사 누구나 신고할 수 있어요. 피해구제 신청은 본인 또는 유족(배우자, 자녀, 부모, 손자녀, 조부모, 형제자매)이 할 수 있어요." },
  { urgent: false, q: "한약도 피해구제 대상인가요?", a: "식약처에서 허가한 한약(한약제제)은 대상이에요. 다만 의료기관에서 개별 조제한 탕약은 제외될 수 있어요. 정확한 해당 여부는 1644-6223으로 확인하는 게 가장 확실해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "약사법 제68조의8 (의약품 부작용 등의 보고)", url: "https://www.law.go.kr/법령/약사법" },
    { label: "약사법 제86조의2~제86조의8 (의약품 부작용 피해구제)", url: "https://www.law.go.kr/법령/약사법" },
    { label: "의약품 등의 안전에 관한 규칙", url: "https://www.law.go.kr/법령/의약품등의안전에관한규칙" },
  ]},
  { category: "공식 자료", items: [
    { label: "의약품안전나라 피해구제 제도소개", url: "https://nedrug.mfds.go.kr/cntnts/227" },
    { label: "의약품안전나라 피해구제 민원신청", url: "https://nedrug.mfds.go.kr/cntnts/230" },
    { label: "한국의약품안전관리원 공식 홈페이지", url: "https://www.drugsafe.or.kr" },
    { label: "식품의약품안전처 통합민원신고", url: "https://uvoice.mfds.go.kr" },
    { label: "2026년 최저임금 고시 (고용노동부)", url: "https://www.moel.go.kr" },
  ]},
];

// ─── 디자인 토큰
const G   = "#1D9E75";
const GL  = "#E1F5EE";
const GD  = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

// ─── 공통 UI
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

// ─── 긴급 배너
function UrgentBanner() {
  const [type, setType] = useState(null);
  const messages = {
    mild: { title: "경미한 부작용이라면", color: G, bg: GL,
      text: "두드러기, 속쓰림, 졸음 같은 경미한 증상이라도 신고할 수 있어요. 의약품안전나라(nedrug.mfds.go.kr)에서 온라인 신고하거나, 1644-6223으로 전화하면 돼요. 신고 자체는 5분이면 끝나요." },
    severe: { title: "심각한 부작용이라면", color: "#DC2626", bg: "#FEF2F2",
      text: "입원이 필요하거나, 후유증이 남았거나, 장애가 생겼다면 병원 진료부터 먼저 받으세요. 진료기록을 확보한 뒤 피해구제를 신청하면 진료비 최대 5,000만원, 장애·사망 보상금까지 받을 수 있어요. 1644-6223으로 바로 전화하세요." },
    cost: { title: "병원비를 보상받고 싶다면", color: "#7C3AED", bg: "#F5F3FF",
      text: "의약품 부작용 피해구제 제도를 이용하면 돼요. 소송 없이 국가에서 보상해줘요. 2014년 12월 19일 이후 발생한 부작용이면 신청 가능하고, 진료일로부터 5년 이내에 신청해야 해요. 아래에서 자격 확인해보세요." },
  };

  if (!type) return (
    <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>지금 어떤 상황이에요?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { id: "mild",   label: "약 먹고 이상 반응이 생겼어요." },
          { id: "severe", label: "부작용이 심해서 병원에 갔어요." },
          { id: "cost",   label: "부작용 때문에 든 병원비를 돌려받고 싶어요." },
        ].map((item) => (
          <button key={item.id} onClick={() => setType(item.id)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
            borderRadius: 8, border: "1px solid #FED7AA", background: "#fff",
            fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left",
          }}>
            <span style={{ color: "#F97316", flexShrink: 0 }}>&#8594;</span>{item.label}
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
        <button onClick={() => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 보상금 계산기
function CompensationCalc() {
  const [type, setType] = useState(0); // 0: 진료비, 1: 장애, 2: 사망
  const [medicalCost, setMedicalCost] = useState(500);
  const [grade, setGrade] = useState(0);

  const labels = ["진료비 보상", "장애일시보상금", "사망일시보상금"];
  const deathAmt = DEATH_COMPENSATION;
  const disabilityAmt = Math.round(deathAmt * DISABILITY_RATES[grade]);
  const medicalAmt = Math.min(medicalCost * 10000, MAX_MEDICAL);

  const result = type === 0 ? medicalAmt : type === 1 ? disabilityAmt : deathAmt;
  const resultLabel = type === 0 ? `${(medicalAmt / 10000).toLocaleString()}만원` : `${(result / 10000).toLocaleString()}만원`;

  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 22px", margin: "0 0 1.5rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7 }}>
        보상 유형을 선택하면 예상 금액을 확인할 수 있어요.
        <strong style={{ color: "#111" }}> 2026년 최저임금</strong> 기준이에요.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {labels.map((l, i) => (
          <button key={i} onClick={() => setType(i)} style={{
            flex: 1, padding: "8px 4px", borderRadius: 6, fontSize: 12, fontWeight: type === i ? 700 : 400,
            border: `1px solid ${type === i ? G : "#e5e7eb"}`, background: type === i ? GL : "#fff",
            color: type === i ? GD : "#6b7280", cursor: "pointer",
          }}>{l}</button>
        ))}
      </div>

      {type === 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <label style={{ fontSize: 13, color: "#6b7280", width: 110, flexShrink: 0 }}>실제 진료비</label>
          <input type="range" min={10} max={5000} step={10} value={medicalCost}
            onChange={(e) => setMedicalCost(+e.target.value)} style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 12, fontWeight: 700, minWidth: 90, textAlign: "right", color: "#111" }}>{medicalCost}만원</span>
        </div>
      )}

      {type === 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <label style={{ fontSize: 13, color: "#6b7280", width: 110, flexShrink: 0 }}>장애 등급</label>
          <input type="range" min={0} max={3} step={1} value={grade}
            onChange={(e) => setGrade(+e.target.value)} style={{ flex: 1, accentColor: G }} />
          <span style={{ fontSize: 12, fontWeight: 700, minWidth: 90, textAlign: "right", color: "#111" }}>{grade + 1}급 ({DISABILITY_RATES[grade] * 100}%)</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginTop: 16 }}>
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>보상 유형</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 3 }}>{labels[type]}</div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>
            {type === 0 ? "건보 적용 범위 내" : type === 1 ? `사망보상금의 ${DISABILITY_RATES[grade] * 100}%` : "최저임금 월환산액 x 60개월"}
          </div>
        </div>
        <div style={{ background: GL, borderRadius: 8, border: `1px solid #9FE1CB`, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>예상 보상금</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: G, marginBottom: 3 }}>{resultLabel}</div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>
            {type === 0 ? `상한 ${(MAX_MEDICAL / 10000).toLocaleString()}만원` : "2026년 최저임금 기준"}
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, lineHeight: 1.7 }}>
        ※ 2026년 최저임금 시급 10,030원, 월환산액 2,096,270원 기준. 실제 보상금은 심의 결과에 따라 달라질 수 있어요.
        진료비는 국민건강보험 또는 의료급여 적용 범위 내 금액만 해당돼요.
      </p>
    </div>
  );
}

// ─── 자격 체커
function EligibilityChecker() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const allPass = checked["c1"] && checked["c2"] && checked["c3"] && checked["c4"];
  const someChecked = checked["c1"] || checked["c2"] || checked["c3"] || checked["c4"];

  const conditions = [
    { id: "c1", label: "2014년 12월 19일 이후에 부작용이 발생했어요", sub: "이 날짜 이전 부작용은 제도 시행 전이라 대상이 아니에요" },
    { id: "c2", label: "정상적인 용법·용량대로 약을 복용했어요", sub: "과다복용·오남용은 제외될 수 있어요" },
    { id: "c3", label: "부작용 발생일로부터 5년이 지나지 않았어요", sub: "진료비는 진료일 기준, 사망·장애는 발생일 기준" },
    { id: "c4", label: "식약처 허가 의약품을 복용했어요", sub: "건강기능식품·해외 직구약·불법 의약품은 제외" },
  ];

  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {conditions.map((c) => (
          <label key={c.id} onClick={() => toggle(c.id)} style={{
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
          4가지 모두 해당돼요. 피해구제 신청 자격이 있어요.<br />
          한국의약품안전관리원(1644-6223)에 전화하거나 의약품안전나라에서 온라인 신청하세요.
        </div>
      )}
      {!allPass && someChecked && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
          아직 확인 안 된 항목이 있어요.<br />
          정확한 해당 여부는 한국의약품안전관리원(1644-6223)에 전화해서 상담받으면 확실하게 알 수 있어요.
        </div>
      )}
    </div>
  );
}

// ─── 서류 테이블
function DocTable() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            {["서류", "구분", "발급처"].map((h) => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 500, color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DOCS.map((d, i) => (
            <tr key={i}>
              <td style={{ padding: "9px 12px", borderBottom: "1px solid #f3f4f6" }}>{d.name}</td>
              <td style={{ padding: "9px 12px", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 4, background: d.required ? GL : "#f3f4f6", color: d.required ? GD : "#6b7280" }}>
                  {d.required ? "필수" : "선택"}
                </span>
              </td>
              <td style={{ padding: "9px 12px", borderBottom: "1px solid #f3f4f6", color: "#6b7280" }}>{d.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── 절차 스텝
function ProcessSteps({ steps }) {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < steps.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />
          )}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: GL, color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
            {s.link && (
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                <a href={s.link.url} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600 }}>{s.link.label}</a>
                {s.tel && <a href={s.tel.url} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: GL, color: "#0F6E56", textDecoration: "none", fontWeight: 600 }}>{s.tel.label}</a>}
              </div>
            )}
            {s.tip && !s.link && (
              <span style={{ display: "inline-block", fontSize: 12, marginTop: 7, background: GL, color: "#0F6E56", borderRadius: 6, padding: "4px 10px" }}>{s.tip}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 체크리스트
function ChecklistUI() {
  const [done, setDone] = useState(new Array(CHECKLIST.length).fill(false));
  const doneCount = done.filter(Boolean).length;
  const pct = Math.round((doneCount / CHECKLIST.length) * 100);
  const toggle = (i) => setDone((p) => p.map((v, idx) => (idx === i ? !v : v)));
  return (
    <div>
      <div style={{ height: 5, background: "#f3f4f6", borderRadius: 3, margin: "10px 0 4px" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: G, borderRadius: 3, transition: "width 0.3s" }} />
      </div>
      <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>{doneCount} / {CHECKLIST.length} 완료</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {CHECKLIST.map((item, i) => (
          <div key={i} onClick={() => toggle(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: "pointer", border: "1px solid #e5e7eb", background: done[i] ? "#f9fafb" : "#fff" }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: done[i] ? G : "#fff", border: `1.5px solid ${done[i] ? G : "#d1d5db"}`, color: "#fff", fontSize: 11 }}>
              {done[i] && "\u2713"}
            </div>
            <span style={{ fontSize: 13, color: done[i] ? "#9ca3af" : "#111", textDecoration: done[i] ? "line-through" : "none" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)} style={{
            padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff",
          }}>
            <span>
              {f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>{"\u25BC"}</span>
          </div>
          {open === i && (
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── CTA
function CTA() {
  return (
    <div style={{ background: GL, borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: GD, fontWeight: 600, marginBottom: 6 }}>지금 바로 할 수 있어요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>부작용 신고 5분,<br />피해구제 신청도 온라인으로.</p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>
        부작용 신고는 의약품안전나라에서 바로 가능해요.<br />
        피해구제 상담은 한국의약품안전관리원에서 무료로 받을 수 있어요.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="https://nedrug.mfds.go.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: G, color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none" }}>의약품안전나라</a>
          <a href="tel:16446223" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: G, fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: `1.5px solid ${G}`, whiteSpace: "nowrap" }}>1644-6223</a>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="https://uvoice.mfds.go.kr" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 14px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>식약처 통합민원</a>
          <a href="tel:15771255" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db", whiteSpace: "nowrap" }}>1577-1255</a>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 16, lineHeight: 1.7 }}>부작용 신고는 누구나 무료로 할 수 있어요. 피해구제 신청도 별도 수수료 없이 가능해요.</p>
    </div>
  );
}

// ─── 허브 링크
function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>의약품 부작용 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>{"\u203A"}</span>
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

// ─── 출처
function References() {
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
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>{"\u2197"}</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 법령과 공식 자료를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

// ─── 사이드바
function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>의약품 안전 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>{"\u203A"}</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── 메인
export default function DrugSideEffectReportPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>

      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>건강 · 의약품 · 부작용 신고</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          일반의약품 부작용 신고 방법 |<br />
          피해구제 보상금 신청까지
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          약 먹고 몸에 이상이 생겼는데, 어디에 말해야 하는지 모르겠죠.<br />
          신고는 5분이면 끝나고, 심하면 보상금도 받을 수 있어요.<br /><br />
          지금 내 상황에 맞게 확인해보세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>부작용 신고, 어디에 어떻게 하나요</H2>
        <p style={body}>
          약 부작용 신고는 <a href="https://nedrug.mfds.go.kr" style={{ color: G, fontWeight: 600 }}>의약품안전나라</a>에서 온라인으로 하거나,
          한국의약품안전관리원(1644-6223)에 전화로 할 수 있어요.
          환자 본인뿐 아니라 보호자, 의사, 약사 누구나 신고 가능해요.
          신고인 정보는 비밀이 보장되고, 특정 약국이나 제약사를 처벌하려는 게 아니에요.
        </p>
        <p style={body}>
          <a href="https://www.law.go.kr/법령/약사법" style={{ color: G }}>약사법 제68조의8</a>에 따라
          의사·약사·제약사는 심각한 부작용을 발견하면 의무적으로 보고해야 해요.
          일반 소비자는 의무는 아니지만, 신고하면 같은 약을 먹는 다른 사람을 지킬 수 있어요.
        </p>
        <GreenBox title="이런 경우 꼭 신고하세요">
          입원이 필요했거나 입원 기간이 늘어난 경우, 생명이 위태로웠던 경우,
          후유증이 남은 경우, 선천성 기형이 의심되는 경우.
          경미한 증상(두드러기, 메스꺼움 등)이라도 신고하면 약 안전성 데이터에 반영돼요.
        </GreenBox>
        <Bdg>신고 절차</Bdg>
        <ProcessSteps steps={STEPS_REPORT} />

        <Divider />

        <H2>피해구제 제도, 소송 없이 보상받는 방법</H2>
        <p style={body}>
          정상적으로 약을 먹었는데 부작용으로 병원비가 나왔다면, 국가에서 보상해주는 제도가 있어요.
          <a href="https://www.law.go.kr/법령/약사법" style={{ color: G }}> 약사법 제86조의2~제86조의8</a>에
          근거한 의약품 부작용 피해구제 제도예요.
          2014년 12월 19일 이후에 발생한 부작용이 대상이에요.
        </p>
        <p style={body}>
          보상 항목은 진료비(최대 5,000만원), 사망일시보상금, 장애일시보상금, 장례비 4가지예요.
          소송을 걸 필요 없이, <a href="https://nedrug.mfds.go.kr/cntnts/230" style={{ color: G }}>의약품안전나라</a>에서
          온라인으로 신청하거나 한국의약품안전관리원에 우편으로 서류를 보내면 돼요.
        </p>

        <Bdg>내가 받을 수 있는 보상금 확인</Bdg>
        <CompensationCalc />

        <Divider />

        <H2>피해구제 신청 자격, 내가 해당되나요</H2>
        <p style={body}>
          아래 4가지를 전부 충족하면 신청할 수 있어요.
          하나라도 해당 안 되면 제외될 수 있는데, 애매한 경우는 1644-6223으로 전화해서 확인하는 게 가장 정확해요.
        </p>
        <Bdg>해당되는 거 체크해보세요</Bdg>
        <EligibilityChecker />
        <BorderBox title="제외되는 경우가 있어요">
          과다복용·오남용으로 인한 부작용, 의약품 허가사항에 이미 기재된 경미한 부작용,
          건강기능식품·화장품·해외 직구 의약품으로 인한 피해, 2014년 12월 19일 이전 부작용은 대상이 아니에요.
          다만 경계선에 있는 경우도 많으니 먼저 상담받아보세요.
        </BorderBox>

        <HubLinks />

        <H2>피해구제 신청 서류, 뭐가 필요한가요</H2>
        <p style={body}>
          온라인(<a href="https://nedrug.mfds.go.kr/cntnts/230" style={{ color: G }}>의약품안전나라</a>) 또는
          우편(경기도 안양시 동안구 부림로 169번길 22, 2층 한국의약품안전관리원)으로 신청해요.
          가장 중요한 건 진료기록부 사본과 의약품 처방전이에요. 이 두 가지가 없으면 인과관계 증명이 어려워요.
        </p>
        <Bdg>필요 서류 목록</Bdg>
        <DocTable />

        <Divider />

        <H2>피해구제 신청 절차, 순서대로 안내할게요</H2>
        <p style={body}>접수부터 보상금 지급까지 보통 120일 정도 걸려요.</p>
        <Bdg>신청 절차</Bdg>
        <ProcessSteps steps={STEPS_RELIEF} />

        <Divider />

        <H2>신고·신청 전에 이것부터 챙기세요</H2>
        <p style={body}>미리 준비하면 접수가 빨라지고, 누락 없이 진행할 수 있어요.</p>
        <ChecklistUI />

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ />

        <CTA />
        <Divider />
        <References />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법령과 공식 기관 자료를 바탕으로 작성됐지만, 개별 사례에 따라 결과가 달라질 수 있어요.
          정확한 판단은 한국의약품안전관리원(1644-6223) 또는 식약처(1577-1255) 상담을 통해 확인하세요.
          이 글은 법률 자문이 아니며, 글에 포함된 정보의 정확성을 보증하지 않아요.
        </div>
      </div>
    </div>
  );
}
