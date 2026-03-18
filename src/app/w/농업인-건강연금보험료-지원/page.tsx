"use client";

// Q1: 농업인인데 건강보험료·국민연금 부담이 큰 상황
// Q2: 보험료 50% 지원 자격 확인 → 국민연금공단/건강보험공단에서 신청
// Q3: 농업경영체 등록 필수, 건강보험료+연금 각 50% 지원
// Q4: EligibilityChecker + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        농업인 건강·연금보험료 50% 지원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        농업경영체에 등록된 농업인이라면 건강보험료와 국민연금 보험료를 각각 50%씩 지원받을 수 있죠. 매달 내는 보험료가 절반으로 줄어드는 거예요.
      </p>
      <a href="https://www.nps.or.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        보험료 지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        농업경영체에 등록되어 있고, 지역가입자(건강보험)이거나 지역가입자·임의가입자(국민연금)인 농업인이 대상이에요. 직장가입자는 해당되지 않죠.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "농업경영체에 등록되어 있죠" },
        { id: "e2", label: "건강보험 지역가입자예요" },
        { id: "e3", label: "국민연금 지역가입자 또는 임의가입자예요" },
      ]} />

      <H2>얼마나 지원되나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        건강보험료와 국민연금 보험료 각각 본인 부담분의 50%를 지원해요. 다만 연간 지원 한도가 정해져 있어서 보험료가 높은 경우 전액 50%가 아닐 수 있죠.
      </p>
      <GreenBox>
        <strong>지원 비율</strong><br />
        건강보험료 본인 부담분 50% + 국민연금 보험료 본인 부담분 50% (각각 연간 한도 내)
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        국민연금은 국민연금공단(1355), 건강보험은 국민건강보험공단(1577-1000)에 각각 신청해요. 농업경영체 등록 확인서가 필요하죠.
      </p>
      <Steps steps={[
        { title: "농업경영체 등록 확인", desc: "농업기술센터에서 농업경영체 등록 여부를 확인해요." },
        { title: "국민연금공단 신청", desc: "1355로 전화하거나 지사를 방문해서 연금 보험료 지원을 신청해요." },
        { title: "건강보험공단 신청", desc: "1577-1000으로 전화하거나 지사를 방문해서 건강보험료 지원을 신청해요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>농업인 보험료 지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "공익직불제와 동시에 받을 수 있나요?", a: "네, 별도 제도라서 동시 신청이 가능하죠. 농업경영체 등록이 공통 요건이에요." },
        { q: "배우자도 함께 지원받을 수 있나요?", a: "배우자가 농업경영체에 공동 등록되어 있으면 각각 지원받을 수 있죠." },
        { q: "매년 재신청해야 하나요?", a: "최초 1회 신청하면 자격이 유지되는 한 자동으로 지원돼요. 다만 농업경영체 등록이 해제되면 지원도 중단되죠." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "국민연금공단 농업인 보험료 지원", url: "https://www.nps.or.kr" },
        { label: "국민건강보험공단", url: "https://www.nhis.or.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
