"use client";

// Q1: 다문화가정 자녀 교육비 부담 줄이고 싶은 상황
// Q2: 교육활동비 신청 → 다문화가족지원센터/복지로
// Q3: 다문화가족 만 18세 이하 자녀, 기초학습·진로설계·교육활동비
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { H2, FAQ, EligibilityChecker, Steps, GreenBox, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        다문화가족 자녀 교육활동비 지원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        다문화가정 자녀라면 기초학습, 진로설계, 교육활동에 필요한 비용을 지원받을 수 있죠. 학원비, 교재비, 체험활동비 등이 포함돼요.
      </p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>
        교육활동비 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        다문화가족(국제결혼 가정 또는 외국인 부모 가정)의 만 18세 이하 자녀가 대상이에요. 소득 기준은 지자체마다 다를 수 있으니 거주지 다문화가족지원센터에 문의하는 게 정확하죠.
      </p>
      <EligibilityChecker items={[
        { id: "e1", label: "다문화가족(국제결혼 또는 외국인 부모 가정)이에요" },
        { id: "e2", label: "만 18세 이하 자녀가 있죠" },
        { id: "e3", label: "교육 관련 비용 지원이 필요해요" },
      ]} />

      <H2>어떤 비용이 지원되나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        지원 범위는 지자체와 프로그램에 따라 달라지지만, 공통적으로 아래 항목이 포함돼요.
      </p>
      <GreenBox>
        <strong>지원 항목</strong><br />
        기초학습(한국어·수학 등 학습 지원) · 진로설계(진로 상담·체험 프로그램) · 교육활동비(학원비, 교재비, 체험활동비)
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        거주지 다문화가족지원센터(1577-5432)에 방문하거나 전화로 신청해요. 복지로 온라인 신청도 가능한 지역이 있죠. 외국인등록증이나 가족관계증명서가 필요할 수 있으니 미리 확인해봐요.
      </p>
      <Steps steps={[
        { title: "다문화가족지원센터 연락", desc: "1577-5432로 전화하거나 가까운 센터를 방문해요." },
        { title: "프로그램 신청", desc: "자녀에게 맞는 교육 프로그램을 선택하고 신청서를 작성해요." },
        { title: "교육 참여 및 비용 지원", desc: "승인되면 프로그램에 참여하고 교육비가 지원돼요." },
      ]} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>교육활동비에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={[
        { q: "한국 국적 취득 후에도 지원받을 수 있나요?", a: "다문화가족 지원법상 귀화 후에도 다문화가족으로 인정되기 때문에 계속 지원받을 수 있죠." },
        { q: "자녀가 여러 명이면 각각 신청해야 하나요?", a: "자녀별로 각각 신청해야 해요. 자녀마다 필요한 프로그램이 다를 수 있으니 센터 상담사와 이야기해봐요." },
        { q: "방학 중에도 프로그램을 이용할 수 있나요?", a: "대부분 연중 운영되지만, 센터별로 프로그램 일정이 다를 수 있죠. 미리 확인하고 신청하는 게 좋아요." },
      ]} />
      <References groups={[{ category: "출처", items: [
        { label: "다문화가족지원포털 다누리", url: "https://www.liveinkorea.kr" },
        { label: "여성가족부 다문화가족 지원", url: "https://www.mogef.go.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
