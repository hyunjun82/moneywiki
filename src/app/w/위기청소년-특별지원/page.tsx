"use client";

// Q1: 가출/폭력/가정해체 등 위기 상황 청소년(또는 보호자)이 도움을 찾는 상황
// Q2: 특별지원 신청 → 1388 전화 또는 청소년상담복지센터 방문
// Q3: 만 9~24세, 위기 상황 기준, 지원 종류(생활/의료/교육/자립), 연 최대 200만원
// Q4: EligibilityChecker + GreenBox(지원 종류) + Steps + FAQ

import { FAQ, GreenBox, Steps, EligibilityChecker, References, Disclaimer , H2 } from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "만 9세 이상 만 24세 이하 청소년이에요" },
  { id: "c2", label: "가정해체, 가출, 학교폭력, 학업중단 등 위기 상황에 처해 있죠" },
  { id: "c3", label: "소득 기준 중위 소득 72% 이하 가구에 속해요" },
  { id: "c4", label: "현재 다른 법적 보호를 받고 있지 않은 상태예요" },
];

const STEPS = [
  { title: "청소년상담복지센터 연락", desc: "가까운 청소년상담복지센터에 전화하거나 방문해요. 전국 어디서나 1388로 전화하면 상담과 연계를 받을 수 있죠." },
  { title: "상담 및 위기 평가", desc: "상담사와 면담을 통해 현재 상황을 파악하고 위기 정도를 평가해요. 솔직하게 상황을 이야기할수록 더 적합한 지원을 받을 수 있죠." },
  { title: "지원 신청서 작성", desc: "상담사의 도움으로 특별지원 신청서를 작성해요. 필요한 서류도 함께 안내받아요." },
  { title: "심사 후 지원 시작", desc: "지원 심사 후 승인되면 생활비·의료비 등 필요한 지원이 시작돼요." },
];

const FAQ_ITEMS = [
  {
    q: "부모 동의 없이 신청할 수 있나요?",
    a: "위기청소년 특별지원은 본인이 직접 신청하거나 관련 기관이 의뢰할 수 있죠. 가정 내 위기 상황으로 부모 동의를 받기 어려운 경우, 청소년상담복지센터에서 도움을 받아 신청이 가능해요.",
  },
  {
    q: "월 최대 65만원은 어떤 항목에 쓰이나요?",
    a: "생활비 지원이 가장 큰 항목이에요. 이 외에 의료비, 학업·직업훈련비, 법률 지원비, 심리·정서 상담비 등 여러 항목으로 나뉘어 지원돼요. 각 항목별 한도는 개인 상황에 따라 달라질 수 있죠.",
  },
  {
    q: "얼마 동안 지원받을 수 있나요?",
    a: "최초 지원 기간은 1년 이내예요. 상황에 따라 연장이 가능하지만, 총 지원 기간에는 제한이 있죠. 지원 기간 동안 정기적으로 상담사와 만나 상황을 점검해요.",
  },
];

const REFS = [
  { label: "청소년상담복지개발원 공식 사이트", url: "https://www.kyci.or.kr" },
  { label: "복지로 위기청소년 지원 안내", url: "https://www.bokjiro.go.kr" },
  { label: "여성가족부 청소년 지원", url: "https://www.mogef.go.kr" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        위기청소년 특별지원, 연 최대 200만원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        가출, 학교폭력, 가정해체 등으로 어려운 상황에 놓인 청소년이라면 생활비, 의료비, 교육비를 지원받을 수 있죠. 전화 한 통(1388)이면 상담부터 신청까지 연결돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        위기청소년 특별지원은 만 9세부터 만 24세까지의 청소년 중 가정해체, 가출, 학교폭력, 학업중단, 성범죄 피해 등 위기 상황에 처한 경우 신청할 수 있죠. 소득 기준 중위소득 72% 이하 가구가 대상이고, 전국 청소년상담복지센터를 통해 신청할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        이 글에서는 위기청소년 특별지원의 대상, 지원 종류, 신청 경로를 안내할게요. 혼자 신청이 어렵다면 1388에 전화하면 전문 상담사가 도와줘요. 지금 당장 위기 상황이라면 전화 한 통으로 도움이 시작될 수 있죠.
      </p>

      <a
        href="https://www.kyci.or.kr"
        style={{
          display: "block",
          background: "linear-gradient(135deg,#1D9E75,#0D8B66)",
          color: "#fff",
          textAlign: "center" as const,
          padding: "16px 24px",
          borderRadius: "12px",
          fontWeight: 700,
          fontSize: "16px",
          margin: "24px 0",
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(29,158,117,0.3)",
        }}
      >
        특별지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 9세~24세 청소년 중 가출, 가정폭력, 학업중단, 성범죄 피해 등 복합적인 위기 상황에 처한 경우 대상이에요. 가구 소득이 기준 중위소득 72% 이하여야 하지만, 위기 상황이 심각하면 예외 인정도 가능하죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        소득 기준은 가구 소득이 기준 중위소득의 72% 이하여야 해요. 2025년 기준 4인 가구는 월 약 395만원 이하가 해당돼요. 소득 기준이 불분명해도 상담센터에서 일단 상담을 받으면 적합한 지원을 안내받을 수 있죠. 가구 소득이 기준을 넘는 경우에도 위기 상황이 심각하다면 예외적으로 지원이 가능한 경우가 있으니 포기하지 말고 상담부터 받아보는 게 좋아요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        이미 소년법에 의한 보호처분이나 다른 법적 보호를 받고 있는 경우에는 지원이 제한될 수 있죠. 하지만 동시에 받을 수 없는 지원과 받을 수 있는 지원이 나뉘기 때문에, 현재 어떤 지원을 받고 있는지 상담사에게 알리고 확인하는 게 좋아요. 지원이 안 되는 항목이라도 다른 방식으로 연계해주는 경우도 있어서 상담을 포기하지 않는 게 중요해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        위기 상황의 원인이 복합적인 경우에는 심리·정서 지원과 생활비 지원을 함께 받는 게 도움이 돼요. 혼자 있는 게 외롭고 무섭더라도 1388에 전화하면 전문 상담사가 연결돼요. 통화가 어렵다면 문자나 카카오톡으로도 상담을 요청할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        아래 항목에 해당하면 청소년상담복지센터에 연락해 상담부터 시작해 보세요. 상황에 따라 빠르게 지원이 연결될 수 있죠. 신청이 어렵거나 무섭게 느껴진다면 1388에 전화해 먼저 상담만 받는 것도 좋아요.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />

      <H2>어떤 지원을 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        생활, 의료, 교육, 자립 네 가지 영역에서 지원받을 수 있죠. 상담사와 면담 후 필요한 지원이 결정돼요.
      </p>

      <GreenBox>
        생활비·의료비·학업지원비·직업훈련비·법률 지원비·심리·정서 상담비. 월 최대 65만원까지 지원하며, 개인 상황에 따라 항목별 금액이 달라져요.
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        가장 빠른 방법은 1388(청소년 상담 전화)로 연락하는 거예요. 24시간 운영되고, 상담사가 상황을 파악한 뒤 가까운 청소년상담복지센터로 연결해주죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        법률 지원은 학교폭력 피해나 성범죄 피해 청소년이 법적 조치를 취할 때 변호사 비용 등을 지원해요. 심리·정서 상담은 트라우마 치료, 심리 검사, 상담 비용 등을 포함해요. 여러 항목을 동시에 받을 수 있고 총 한도가 월 65만원이에요. 어떤 항목이 얼마나 필요한지는 상담사와 함께 결정하게 돼요.
      </p>

      <H2>신청 절차와 방법</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        신청은 전국 청소년상담복지센터를 통해 해요. 전화 1388로 연락하면 가까운 센터와 연결되고, 방문 또는 전화 상담을 통해 신청 절차를 안내받을 수 있죠. 청소년이 혼자 신청하기 어렵다면 상담사가 대신 도와줘요. 보호자가 없어도 본인이 직접 신청하는 것이 가능해요. 야간이나 주말에는 1388 긴급 상담을 통해 빠르게 연결할 수 있어서 시간에 상관없이 연락할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        신청서 외에 소득 증빙 서류, 위기 상황을 설명하는 서류(진단서, 피해 확인서 등)가 필요할 수 있죠. 서류 준비가 어렵다면 상담센터에서 도움을 받을 수 있죠. 상담사가 기관과 연계해서 서류를 대신 발급받아 주는 경우도 있죠. 서류가 없더라도 일단 연락하면 상황에 맞게 해결 방법을 안내해줘요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        심사 결과는 통상 2~3주 내에 나와요. 긴급한 상황이라면 긴급 지원을 먼저 받고 나중에 정식 신청을 하는 방법도 있죠. 긴급 상황은 상담 당일 즉시 연결이 가능해요. 지원 승인 후에도 정기적으로 상담사와 만나 상황을 점검하면서 필요에 따라 지원 내용을 조정받을 수 있죠.
      </p>
      <Steps steps={STEPS} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "16px" }}>특별지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={FAQ_ITEMS} />
      <References groups={[{ category: "출처", items: REFS }]} />
      <Disclaimer text="이 글은 공식 발표 기준으로 작성됐어요. 정책 내용은 변경될 수 있으니 신청 전 해당 기관에서 최신 내용을 확인하세요." />
    </div>
  );
}
