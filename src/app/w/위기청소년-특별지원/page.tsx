"use client";

// Q1: 가출/폭력/가정해체 등 위기 상황 청소년(또는 보호자)이 도움을 찾는 상황
// Q2: 특별지원 신청 → 1388 전화 또는 청소년상담복지센터 방문
// Q3: 만 9~24세, 위기 상황 기준, 지원 종류(생활/의료/교육/자립), 연 최대 200만원
// Q4: EligibilityChecker + GreenBox(지원 종류) + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        위기청소년 특별지원, 연 최대 200만원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        가출, 학교폭력, 가정해체 등으로 어려운 상황에 놓인 청소년이라면 생활비, 의료비, 교육비를 지원받을 수 있죠. 전화 한 통(1388)이면 상담부터 신청까지 연결돼요.
      </p>
      <a href="https://www.kyci.or.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        특별지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 9세~24세 청소년 중 가출, 가정폭력, 학업중단, 성범죄 피해 등 복합적인 위기 상황에 처한 경우 대상이에요. 가구 소득이 기준 중위소득 72% 이하여야 하지만, 위기 상황이 심각하면 예외 인정도 가능하죠.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "만 9세 이상 만 24세 이하 청소년이에요" },
        { id: "e2", label: "가출, 폭력, 가정해체 등 위기 상황에 해당해요" },
        { id: "e3", label: "가구 소득이 기준 중위소득 72% 이하예요" },
      ]} />

      <H2>어떤 지원을 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        생활, 의료, 교육, 자립 네 가지 영역에서 지원받을 수 있죠. 상담사와 면담 후 필요한 지원이 결정돼요.
      </p>
      <GreenBox>
        <strong>지원 항목별 금액</strong><br />
        생활지원: 월 최대 50만원 · 의료지원: 연 최대 200만원 · 교육지원: 수업료·교재비 실비 · 자립지원: 자립에 필요한 비용 실비
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        가장 빠른 방법은 1388(청소년 상담 전화)로 연락하는 거예요. 24시간 운영되고, 상담사가 상황을 파악한 뒤 가까운 청소년상담복지센터로 연결해주죠.
      </p>
      <Steps steps={[
        { title: "1388 전화 또는 센터 방문", desc: "청소년 상담 전화 1388로 연락하거나, 가까운 청소년상담복지센터를 방문해요." },
        { title: "상담 및 위기 판정", desc: "상담사가 상황을 파악하고 지원 필요성을 판정해요." },
        { title: "지원 결정 및 지급", desc: "심사 후 2~3주 내에 필요한 지원이 시작돼요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>특별지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "부모 동의 없이도 신청할 수 있나요?", a: "가정폭력 등 부모 동의가 어려운 상황이면 청소년 본인이 직접 신청할 수 있죠. 상담사가 법적 대리인 없이도 진행할 수 있도록 도와줘요." },
        { q: "거절되면 재신청할 수 있나요?", a: "상황이 바뀌거나 추가 서류를 보완하면 재신청이 가능해요. 상담사에게 거절 사유를 물어보고 보완하면 돼요." },
        { q: "긴급한 상황이면 바로 지원받을 수 있나요?", a: "네, 긴급 상황이면 상담 당일 긴급 지원을 먼저 받고 정식 신청은 나중에 할 수 있죠." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "한국청소년상담복지개발원", url: "https://www.kyci.or.kr" },
        { label: "여성가족부 위기청소년 지원", url: "https://www.mogef.go.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
