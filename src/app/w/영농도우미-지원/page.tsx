"use client";

// Q1: 농번기 일손 부족하거나 농업인이 아프거나 출산해서 도움 필요
// Q2: 영농도우미 신청 → 농업기술센터
// Q3: 농업경영체 등록, 연 최대 90일, 일당 5만원
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        영농도우미 지원, 일당 5만원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        농번기에 일손이 부족하거나, 질병·출산·사고로 직접 농사를 짓기 어려운 상황이라면 영농도우미를 지원받을 수 있죠. 도우미 인건비를 정부가 일당 5만원씩 지원해줘요.
      </p>
      <a href="https://www.gov.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        영농도우미 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        농업경영체에 등록된 농업인이 대상이에요. 질병, 출산, 군 입영, 사고 등으로 직접 농작업이 어려운 경우 우선 배정되죠. 농번기 일손 부족도 신청 사유로 인정돼요.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "농업경영체에 등록된 농업인이에요" },
        { id: "e2", label: "질병, 출산, 사고 등으로 직접 농작업이 어렵죠" },
        { id: "e3", label: "농번기 일손 부족으로 도움이 필요해요" },
      ]} />

      <H2>얼마나 지원되나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        도우미 1인당 일당 5만원을 정부가 지원해요. 연간 최대 90일까지 신청할 수 있죠. 도우미는 농업기술센터에서 모집한 인력풀에서 배정돼요.
      </p>
      <GreenBox>
        <strong>지원 내용</strong><br />
        일당 5만원 (정부 지원) · 연 최대 90일 · 출산/질병 시 우선 배정
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        거주지 시군구 농업기술센터에 방문하거나 전화로 신청해요. 농업경영체 등록 확인서와 신분증이 필요하죠. 출산이나 질병 사유면 관련 증빙서류도 함께 제출해요.
      </p>
      <Steps steps={[
        { title: "농업기술센터 방문 또는 전화", desc: "거주지 시군구 농업기술센터에 신청해요." },
        { title: "서류 제출", desc: "농업경영체 등록 확인서, 신분증, 사유별 증빙서류를 제출해요." },
        { title: "도우미 배정", desc: "승인되면 인력풀에서 도우미가 배정돼요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>영농도우미에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "도우미를 직접 지정할 수 있나요?", a: "원칙적으로 센터에서 배정하지만, 이전에 같이 일했던 도우미를 지정 요청할 수 있는 지역도 있죠. 센터에 문의해봐요." },
        { q: "하우스 작업이나 축산도 해당되나요?", a: "농작물 재배뿐 아니라 축산, 시설원예 등 농업 전반이 대상이에요. 구체적인 작업 범위는 센터에서 안내받을 수 있죠." },
        { q: "예산 소진되면 신청 못 하나요?", a: "연간 예산이 정해져 있어서 예산 소진 시 마감될 수 있죠. 농번기 전에 미리 신청하는 게 유리해요." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "정부24 영농도우미 안내", url: "https://www.gov.kr" },
        { label: "농림축산식품부", url: "https://www.mafra.go.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
