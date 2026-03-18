"use client";

// Q1: 복지시설 퇴소 후 자립 준비 중인 청소년이 지원금을 알고 싶은 상황
// Q2: 자립지원수당 자격 확인 → 복지로 또는 주민센터에서 신청
// Q3: 대상 시설(쉼터, 자립생활관), 나이(만 18~24세), 월 50만원, 5년간
// Q4: EligibilityChecker + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        퇴소청소년 자립지원수당, 월 50만원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        청소년쉼터나 자립생활관 같은 복지시설에서 퇴소한 뒤 자립을 준비하고 있다면, 매달 50만원씩 최대 5년간 지원받을 수 있죠. 따로 신청해야 받을 수 있는 제도예요.
      </p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        자립지원수당 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        여성가족부가 지정한 청소년복지시설(청소년쉼터, 자립생활관, 회복지원시설 등)에서 퇴소한 만 18세~24세 청소년이 대상이에요. 퇴소 후 5년 이내에 신청해야 하고, 소득 기준은 별도로 없죠.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "청소년복지시설(쉼터, 자립생활관 등)에서 퇴소했어요" },
        { id: "e2", label: "퇴소 당시 만 18세 이상 만 24세 이하예요" },
        { id: "e3", label: "퇴소한 지 5년이 지나지 않았어요" },
      ]} />

      <H2>얼마나 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        매달 50만원이 계좌로 입금돼요. 신청일부터 지급이 시작되고, 소급 적용은 안 되죠. 최대 5년간 받을 수 있으니 자격이 되면 빠르게 신청하는 게 유리해요.
      </p>
      <GreenBox>
        <strong>지급 정보</strong><br />
        월 50만원 · 최대 5년간 · 신청일 기준 지급 시작 · 소득 기준 없음
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        주민센터 방문 또는 복지로 온라인 신청이 가능해요. 퇴소 확인서, 신분증, 통장 사본이 필요하죠. 서류 준비가 어려우면 시설 사회복지사에게 도움을 요청할 수 있죠.
      </p>
      <Steps steps={[
        { title: "퇴소 확인서 준비", desc: "퇴소한 시설에서 퇴소 확인서를 발급받아요." },
        { title: "주민센터 또는 복지로 신청", desc: "신분증, 통장 사본, 퇴소 확인서를 지참하고 신청해요." },
        { title: "자격 확인 후 지급 시작", desc: "승인되면 다음 달부터 매월 50만원이 입금돼요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>자립지원수당에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "퇴소 후 바로 신청하지 않으면 소급 지급이 되나요?", a: "안 돼요. 신청일부터 지급이 시작되기 때문에 늦게 신청할수록 받을 수 있는 총액이 줄어들죠." },
        { q: "취업하면 수당이 끊기나요?", a: "취업해도 계속 받을 수 있죠. 소득 기준이 별도로 없기 때문에 자격 요건만 유지되면 지급이 계속돼요." },
        { q: "아동복지시설(보육원) 퇴소자도 받을 수 있나요?", a: "아동복지시설 퇴소자는 자립정착금(별도 제도)이 지원되고, 이 수당은 청소년복지시설 퇴소자만 대상이에요. 시설 유형을 먼저 확인해봐요." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "복지로 자립지원수당 안내", url: "https://www.bokjiro.go.kr" },
        { label: "여성가족부 청소년 자립지원", url: "https://www.mogef.go.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
