"use client";

// Q1: 저소득 가정 여성 청소년이 생리용품 지원을 받을 수 있는지 궁금한 상황
// Q2: 생리용품 지원 자격 확인 → 복지로 또는 주민센터에서 신청
// Q3: 만 9~24세, 기초수급/차상위, 월 13,000원 국민행복카드 충전
// Q4: EligibilityChecker + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        여성청소년 생리용품 지원, 월 13,000원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        저소득 가정의 여성 청소년이라면 매달 13,000원어치 생리용품을 국민행복카드로 지원받을 수 있죠. 약국이나 편의점에서 카드로 결제하면 돼요.
      </p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        생리용품 지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 9세 이상 만 24세 이하 여성 청소년 중 기초생활수급자 또는 차상위 계층이 대상이에요. 나이 기준은 매년 1월 1일 기준이고, 주민등록상 여성이면 신청 가능하죠.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "만 9세 이상 만 24세 이하 여성 청소년이에요" },
        { id: "e2", label: "기초생활수급자 또는 차상위 계층에 해당해요" },
        { id: "e3", label: "국민행복카드를 발급받을 수 있죠" },
      ]} />

      <H2>월 13,000원, 어떻게 사용하나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        국민행복카드에 매달 13,000원이 자동 충전돼요. 약국, 편의점, 대형마트에서 생리용품을 구매할 때 이 카드로 결제하면 되죠. 미사용 금액은 다음 달로 이월되지 않으니 매달 사용하는 게 좋아요.
      </p>
      <GreenBox>
        <strong>사용 가능 장소</strong><br />
        약국 · 편의점(CU, GS25, 세븐일레븐) · 대형마트  생리용품(패드, 탐폰, 생리컵)만 결제 가능
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        주민센터 방문 또는 복지로 온라인 신청이 가능해요. 국민행복카드가 없다면 카드 발급부터 먼저 해야 하죠. 카드 발급은 은행(국민, 신한 등)에서 할 수 있죠.
      </p>
      <Steps steps={[
        { title: "국민행복카드 발급", desc: "은행 방문 또는 온라인으로 국민행복카드를 발급받아요." },
        { title: "주민센터 또는 복지로 신청", desc: "신분증과 카드를 가지고 주민센터를 방문하거나 복지로에서 온라인 신청해요." },
        { title: "자격 확인 후 충전 시작", desc: "승인되면 다음 달부터 매월 13,000원이 카드에 충전돼요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>생리용품 지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "생리용품 외에 다른 물품도 살 수 있나요?", a: "안 돼요. 생리용품(패드, 탐폰, 생리컵 등)만 결제할 수 있죠. 다른 물품을 함께 결제하면 전체 결제가 거부될 수 있으니 분리 결제하는 게 좋아요." },
        { q: "만 24세가 넘으면 지원이 끊기나요?", a: "네, 만 25세가 되는 해의 1월부터 지원이 종료돼요. 이후에는 별도의 복지 제도를 알아봐야 해요." },
        { q: "보호자가 대신 신청할 수 있나요?", a: "미성년자의 경우 보호자(부모 등)가 대리 신청할 수 있죠. 성인 청소년은 본인이 직접 신청해야 해요." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "복지로 여성청소년 생리용품 지원", url: "https://www.bokjiro.go.kr" },
        { label: "여성가족부 청소년 복지", url: "https://www.mogef.go.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
