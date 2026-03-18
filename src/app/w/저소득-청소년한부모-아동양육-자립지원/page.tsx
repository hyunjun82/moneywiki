"use client";

// Q1: 만 24세 이하 한부모가 양육비+자립 지원받고 싶은 상황
// Q2: 자립지원 자격 확인 → 주민센터/복지로
// Q3: 만 24세 이하 한부모, 중위소득 72% 이하, 월 35만원+자립촉진수당
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        청소년한부모 양육·자립지원, 월 35만원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 24세 이하 한부모라면 아이 양육비와 자립 준비를 동시에 지원받을 수 있죠. 아동양육비 월 35만원에 검정고시나 자격증 취득 비용까지 별도로 지원돼요.
      </p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        자립지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        부 또는 모 중 한 명이라도 만 24세 이하인 한부모 가정이 대상이에요. 가구 소득이 기준 중위소득 72% 이하여야 하죠. 혼인 여부와 관계없이 실제로 아이를 양육하고 있으면 신청 가능해요.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "부 또는 모가 만 24세 이하예요" },
        { id: "e2", label: "한부모 가정이에요 (미혼모/부 포함)" },
        { id: "e3", label: "가구 소득이 기준 중위소득 72% 이하예요" },
      ]} />

      <H2>어떤 지원을 받나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        아동양육비와 자립촉진수당 두 가지를 동시에 받을 수 있죠.
      </p>
      <GreenBox>
        <strong>지원 항목</strong><br />
        아동양육비: 아동 1인당 월 35만원 · 자립촉진수당: 검정고시·자격증·학원비 등 월 10만원 · 별도로 의료비 지원도 가능
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        주민센터 방문 또는 복지로 온라인으로 신청해요. 신분증, 아이 주민등록등본, 소득 증빙 서류가 필요하죠. 한부모가족증명서가 없으면 주민센터에서 함께 발급받을 수 있죠.
      </p>
      <Steps steps={[
        { title: "주민센터 또는 복지로 신청", desc: "신분증, 주민등록등본, 통장 사본을 지참하고 신청해요." },
        { title: "소득·재산 조사", desc: "담당 공무원이 가구 소득을 확인해요. 약 30일 이내 결과가 나와요." },
        { title: "지급 시작", desc: "승인 후 다음 달부터 매월 계좌로 입금돼요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>청소년한부모 지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "부모와 함께 살아도 신청할 수 있나요?", a: "친정이나 시가에 거주해도 본인이 실제 양육자라면 신청 가능하죠. 세대 분리 여부는 상관없어요." },
        { q: "만 25세가 되면 지원이 끊기나요?", a: "만 25세 생일이 속한 달까지 지급되고, 이후에는 일반 한부모가족 지원으로 전환 신청할 수 있죠." },
        { q: "자립촉진수당은 뭘 배워도 되나요?", a: "검정고시, 자격증 취득, 학원비 등 자립에 필요한 교육이면 대부분 인정돼요. 구체적인 항목은 주민센터에서 안내받을 수 있죠." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "복지로 청소년한부모 지원", url: "https://www.bokjiro.go.kr" },
        { label: "여성가족부 한부모가족 지원", url: "https://www.mogef.go.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
