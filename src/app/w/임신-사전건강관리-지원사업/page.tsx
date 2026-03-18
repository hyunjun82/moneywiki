"use client";

// Q1: 임신을 준비하면서 건강 검사를 무료로 받을 수 있는지 알고 싶은 상황
// Q2: 보건소 방문 → 무료 검사 받기
// Q3: 임신 전 여성 누구나(소득 제한 없음), 검사 항목, 무료
// Q4: GreenBox(검사 항목) + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        임신 전 건강검사, 보건소에서 무료
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        임신을 계획하고 있다면 보건소에서 무료로 건강 검사를 받을 수 있죠. 풍진 항체, B형간염, 빈혈, 자궁경부 상태 등을 미리 확인해서 임신 중 위험을 줄이는 예방 검사예요. 소득 기준 없이 누구나 받을 수 있죠.
      </p>
      <a href="https://www.gov.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        사전건강관리 신청하기 →
      </a>

      <H2>어떤 검사를 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        보건소마다 검사 항목이 조금 다를 수 있지만, 기본적으로 아래 항목을 무료로 검사해요.
      </p>
      <GreenBox>
        <strong>무료 검사 항목</strong><br />
        풍진 항체 검사 · B형간염 항원/항체 · 빈혈(혈색소) · 혈액형 · 매독 · 에이즈(HIV) · 소변검사 · 자궁경부 세포진 검사
      </GreenBox>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        임신을 계획하거나 준비 중인 여성이라면 나이, 소득과 관계없이 누구나 받을 수 있죠. 결혼 여부나 임신 경험과도 무관해요. 다만 이미 임신 중이라면 이 검사 대신 산전 검사 체계로 넘어가야 해요.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "임신을 계획하거나 준비 중인 여성이에요" },
        { id: "e2", label: "현재 임신 상태가 아니에요" },
        { id: "e3", label: "거주지 관할 보건소를 방문할 수 있죠" },
      ]} />

      <H2>보건소 방문 절차</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        거주지 관할 보건소에 신분증만 가지고 방문하면 돼요. 사전 예약 없이도 가능하지만, 보건소별로 운영 시간이 다르니 전화(보건소 대표번호)로 미리 확인하는 게 좋아요.
      </p>
      <Steps steps={[
        { title: "보건소 방문", desc: "거주지 보건소에 신분증을 가지고 방문해요." },
        { title: "검사 접수 및 채혈", desc: "담당 간호사가 검사 항목을 안내하고 채혈해요. 공복이 필요한 항목이 있으니 아침 식사 전에 가는 게 좋아요." },
        { title: "결과 확인", desc: "1~2주 후 보건소를 다시 방문하거나 전화로 결과를 확인해요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>사전건강관리에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "남편(배우자)도 함께 검사받을 수 있나요?", a: "보건소에 따라 배우자 검사를 함께 제공하는 곳도 있죠. 방문 전에 해당 보건소에 전화로 확인해봐요." },
        { q: "이상 소견이 나오면 어떻게 되나요?", a: "풍진 항체가 없으면 예방접종을 안내받고, 접종 후 1개월간 피임이 권고돼요. 다른 이상 소견도 보건소에서 후속 조치를 안내해주죠." },
        { q: "검사 비용이 정말 전액 무료인가요?", a: "기본 검사 항목은 전액 무료예요. 다만 추가 정밀 검사가 필요한 경우 의료기관 진료비는 별도로 발생할 수 있죠." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "정부24 임신 사전건강관리 안내", url: "https://www.gov.kr" },
        { label: "보건복지부 모자보건", url: "https://www.mohw.go.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
