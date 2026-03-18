"use client";

// Q1: 혼자 사는 어르신이나 중증장애인 가족이 응급 상황 대비 방법을 찾는 상황
// Q2: 응급안전안심서비스 자격 확인 → 주민센터에서 신청
// Q3: 대상(65세+ 독거노인 or 중증장애인), 무료 장비 설치, 24시간 모니터링
// Q4: EligibilityChecker + GreenBox(제공 장비) + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        독거노인·장애인 응급안전안심서비스
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        혼자 사는 어르신이나 중증장애인이 집에서 쓰러지거나 화재가 나면, 주변에 알릴 방법이 없죠. 응급안전안심서비스는 집에 감지 장비를 무료로 설치해주고, 이상 신호가 감지되면 119로 자동 연결해주는 제도예요.
      </p>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        장비 설치비, 통신비 모두 무료예요. 신청만 하면 담당자가 직접 방문해서 설치해주죠.
      </p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        응급안전서비스 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 65세 이상 독거노인이거나, 장애 정도가 심한 중증장애인 중 혼자 거주하는 분이 대상이에요. 기초생활수급자나 차상위 계층이 우선 선정되지만, 독거 상태면 소득과 무관하게 신청할 수 있는 지역도 있죠.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "만 65세 이상 독거노인이거나 중증장애인이에요" },
        { id: "e2", label: "혼자 거주하고 있죠 (1인 가구)" },
        { id: "e3", label: "응급 상황 시 도움을 요청하기 어려운 환경이에요" },
      ]} />

      <H2>어떤 장비가 설치되나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        가정에 설치되는 장비는 화재감지기, 활동감지센서, 응급호출기 세 가지예요. 활동감지센서는 일정 시간 움직임이 없으면 관제센터에 자동 알림이 가죠. 응급호출기는 목걸이나 손목밴드 형태로, 버튼 하나만 누르면 119와 연결돼요.
      </p>
      <GreenBox>
        <strong>무료 설치 장비 3가지</strong><br />
        화재감지기 (연기 감지 → 자동 신고) · 활동감지센서 (장시간 미활동 감지) · 응급호출기 (버튼 1회 → 119 연결)
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        주민센터에 신분증 지참해서 방문하면 돼요. 신청 후 담당자가 가정을 방문해서 환경을 확인하고 장비를 설치해주죠. 설치까지 보통 2~4주 정도 걸려요.
      </p>
      <Steps steps={[
        { title: "주민센터 방문", desc: "신분증을 가지고 거주지 읍면동 주민센터를 방문해요." },
        { title: "신청서 작성", desc: "담당 복지사가 신청서 작성을 도와줘요." },
        { title: "가정 방문 조사", desc: "담당자가 집을 방문해서 설치 환경을 확인해요." },
        { title: "장비 설치 완료", desc: "화재감지기, 활동감지센서, 응급호출기가 무료로 설치돼요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>응급안전안심서비스에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "장비 고장 나면 어떻게 하나요?", a: "관제센터(129)에 연락하면 무료로 수리 또는 교체해줘요. 장비 유지보수 비용도 전액 지원이에요." },
        { q: "가족과 함께 살면 신청 못 하나요?", a: "원칙적으로 1인 가구가 대상이에요. 다만 동거 가족이 장시간 부재하는 경우 예외적으로 인정되는 지역도 있으니 주민센터에 문의해봐요." },
        { q: "이사하면 장비를 다시 설치해야 하나요?", a: "네, 이사 후 새 거주지 주민센터에 다시 신청하면 돼요. 기존 장비는 철거하고 새 집에 다시 설치해주죠." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "복지로 응급안전안심서비스 안내", url: "https://www.bokjiro.go.kr" },
        { label: "보건복지부 독거노인 지원", url: "https://www.mohw.go.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
