"use client";

// Q1: 프리랜서 예술인이 국민연금 보험료 부담 줄일 수 있는지 궁금
// Q2: 보험료 50% 지원 자격 확인 → 한국예술인복지재단
// Q3: 예술활동증명 완료 필수, 월 소득 기준, 보험료 50% 지원
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        예술인 국민연금 보험료 50% 지원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        프리랜서 예술인이라면 국민연금 보험료의 50%를 정부가 대신 내줘요. 한국예술인복지재단에서 예술활동증명을 받은 뒤 신청하면 되죠.
      </p>
      <a href="https://www.kawf.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        보험료 지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        한국예술인복지재단에서 예술활동증명이 완료된 예술인이 대상이에요. 국민연금 지역가입자 또는 임의가입자여야 하고, 직장가입자는 해당되지 않죠. 월 소득이 일정 기준 이하여야 지원받을 수 있죠.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "예술활동증명이 완료된 상태예요" },
        { id: "e2", label: "국민연금 지역가입자 또는 임의가입자예요" },
        { id: "e3", label: "월 소득이 지원 기준 이하예요" },
      ]} />

      <H2>얼마나 지원되나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        국민연금 보험료 본인 부담분의 50%를 지원해요. 예를 들어 월 보험료가 9만원이면 4만 5천원을 정부가 대신 내주는 거죠.
      </p>
      <GreenBox>
        <strong>지원 내용</strong><br />
        국민연금 보험료 본인 부담분 50% 지원 · 최초 신청 후 자격 유지 시 자동 연장
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        한국예술인복지재단 홈페이지(kawf.kr)에서 온라인으로 신청하거나, 국민연금공단(1355)에 전화해도 돼요. 예술활동증명서와 국민연금 납부 확인서가 필요하죠.
      </p>
      <Steps steps={[
        { title: "예술활동증명 완료", desc: "한국예술인복지재단에서 예술활동증명을 먼저 받아요." },
        { title: "보험료 지원 신청", desc: "재단 홈페이지 또는 국민연금공단에 신청해요." },
        { title: "지원 적용", desc: "승인 후 다음 달부터 보험료 고지서에 50% 감면이 반영돼요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>예술인 보험료 지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "예술활동증명은 어떻게 받나요?", a: "한국예술인복지재단 홈페이지에서 온라인으로 신청해요. 최근 활동 실적(공연, 전시, 출판 등)을 증빙하면 되죠. 심사에 2~4주 정도 걸려요." },
        { q: "직장에 취업하면 지원이 끊기나요?", a: "직장가입자로 전환되면 지원이 중단돼요. 다시 프리랜서로 전환되면 재신청할 수 있죠." },
        { q: "다른 예술인 복지와 동시에 받을 수 있나요?", a: "예술인 고용보험, 창작준비금 등 다른 지원과 중복 수령이 가능한 경우가 많아요. 재단에서 안내받을 수 있죠." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "한국예술인복지재단", url: "https://www.kawf.kr" },
        { label: "국민연금공단 예술인 지원", url: "https://www.nps.or.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
