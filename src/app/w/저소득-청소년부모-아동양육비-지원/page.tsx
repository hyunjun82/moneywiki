"use client";

// Q1: 만 24세 이하 부모가 양육비 지원받을 수 있는지 궁금
// Q2: 양육비 지원 자격 확인 → 주민센터/복지로
// Q3: 만 24세 이하 부모, 중위소득 60% 이하, 아동 1인당 월 20만원
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        청소년부모 아동양육비, 월 20만원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 24세 이하 부모(양부모 포함)라면 아동 1인당 매달 20만원씩 양육비를 지원받을 수 있죠. 한부모가 아니어도, 부부 모두 만 24세 이하면 신청 가능해요.
      </p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        양육비 지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        부 또는 모 중 한 명이라도 만 24세 이하인 가정이 대상이에요. 가구 소득이 기준 중위소득 60% 이하여야 하죠. 한부모가 아니어도, 양부모 모두 해당 연령이면 신청할 수 있죠.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "부 또는 모 중 한 명이 만 24세 이하예요" },
        { id: "e2", label: "가구 소득이 기준 중위소득 60% 이하예요" },
        { id: "e3", label: "만 18세 미만 아동을 양육하고 있죠" },
      ]} />

      <H2>얼마 받나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        아동 1인당 월 20만원이 계좌로 입금돼요. 자녀가 2명이면 월 40만원이죠. 별도로 의료비·검정고시 비용 지원도 연계 신청할 수 있죠.
      </p>
      <GreenBox>
        <strong>지급 정보</strong><br />
        아동 1인당 월 20만원 · 자녀 수만큼 지급 · 매월 계좌 입금
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        주민센터 방문 또는 복지로 온라인 신청이 가능해요. 신분증, 주민등록등본, 통장 사본이 필요하죠.
      </p>
      <Steps steps={[
        { title: "주민센터 또는 복지로 신청", desc: "신분증, 주민등록등본, 통장 사본을 지참하고 신청해요." },
        { title: "소득·재산 조사", desc: "담당 공무원이 가구 소득을 확인해요." },
        { title: "지급 시작", desc: "승인 후 다음 달부터 매월 20만원(아동 1인 기준)이 입금돼요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>청소년부모 양육비에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "청소년한부모 지원과 중복으로 받을 수 있나요?", a: "한부모 가정이라면 청소년한부모 양육·자립지원(월 35만원)을 신청하는 게 금액이 더 크죠. 두 제도를 동시에 받는 건 안 돼요." },
        { q: "부부 중 한 명만 24세 이하면 되나요?", a: "네, 부 또는 모 중 한 명만 만 24세 이하면 신청 가능해요." },
        { q: "만 25세가 되면 어떻게 되나요?", a: "만 25세 생일이 속한 달까지 지급돼요. 이후에는 일반 양육수당이나 아동수당으로 전환 신청할 수 있죠." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "복지로 청소년부모 지원", url: "https://www.bokjiro.go.kr" },
        { label: "여성가족부", url: "https://www.mogef.go.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
