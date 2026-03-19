"use client";

// Q1: 만 24세 이하 부모가 양육비 지원받을 수 있는지 궁금
// Q2: 양육비 지원 자격 확인 → 주민센터/복지로
// Q3: 만 24세 이하 부모, 중위소득 60% 이하, 아동 1인당 월 20만원
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { FAQ, DocTable, Steps, EligibilityChecker, References, Disclaimer , H2 } from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "부 또는 모 중 한 명이라도 만 24세 이하예요" },
  { id: "c2", label: "부모가 혼인 상태이고 함께 아동을 양육하고 있죠" },
  { id: "c3", label: "만 18세 미만 아동을 양육하고 있죠" },
  { id: "c4", label: "기준 중위소득 60% 이하 가구에 해당해요" },
];

const DOCS = [
  { name: "사회보장급여 신청서", required: true, where: "주민센터 비치 또는 복지로 양식" },
  { name: "가족관계증명서", required: true, where: "주민센터 또는 대법원 인터넷등기소" },
  { name: "혼인관계증명서", required: true, where: "주민센터 또는 대법원 인터넷등기소" },
  { name: "소득·재산 증빙 서류", required: true, where: "근로소득원천징수영수증 등" },
  { name: "통장 사본", required: true, where: "수당 받을 계좌" },
];

const STEPS = [
  { title: "복지로 또는 주민센터 신청", desc: "복지로 홈페이지에서 온라인으로 신청하거나 거주지 읍·면·동 주민센터를 방문해 신청해요." },
  { title: "서류 제출 및 소득 조사", desc: "가족관계증명서, 혼인관계증명서, 소득 증빙 서류를 제출해요. 공무원이 소득·재산 조사를 진행해요." },
  { title: "지원 승인 및 결과 통보", desc: "조사 완료 후 지원 여부가 결정되고 문자 또는 우편으로 결과가 안내돼요." },
  { title: "아동양육비 수령", desc: "승인 후 매달 아동 1인당 20만원이 지정 계좌로 입금돼요." },
];

const FAQ_ITEMS = [
  {
    q: "청소년부모와 청소년 한부모의 차이가 뭔가요?",
    a: "청소년부모는 부 또는 모 중 한 명이 만 24세 이하이고 두 부모가 함께 아동을 양육하는 경우예요. 청소년 한부모는 혼자 아이를 키우는 경우예요. 두 제도의 지원 금액과 대상이 달라요.",
  },
  {
    q: "아이가 2명이면 월 40만원을 받나요?",
    a: "네, 아동 1인당 월 20만원이 지급되기 때문에 아동이 2명이면 월 40만원이에요. 부모 연령 요건과 소득 기준을 충족하면 아동 수에 따라 지원액이 늘어나요.",
  },
  {
    q: "부 또는 모가 만 25세가 되면 지원이 끊기나요?",
    a: "부 또는 모 중 더 어린 사람이 만 25세가 되는 달까지 지원돼요. 만 25세 이후에는 청소년부모 지원이 종료돼요. 소득 기준을 충족한다면 일반 저소득 가구 지원 제도를 신청해 볼 수 있죠.",
  },
];

const REFS = [
  { label: "복지로 청소년부모 아동양육비 신청", url: "https://www.bokjiro.go.kr" },
  { label: "여성가족부 청소년부모 지원 안내", url: "https://www.mogef.go.kr" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        청소년부모 아동양육비, 월 20만원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 24세 이하 부모(양부모 포함)라면 아동 1인당 매달 20만원씩 양육비를 지원받을 수 있죠. 한부모가 아니어도, 부부 모두 만 24세 이하면 신청 가능해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        저소득 청소년부모 아동양육비 지원은 부 또는 모 중 한 명이 만 24세 이하이고 두 부모가 함께 아이를 양육하는 경우를 대상으로 해요. 소득 기준은 기준 중위소득 60% 이하예요. 청소년 한부모 지원과 다른 별도 제도예요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        이 글에서는 저소득 청소년부모 아동양육비 자격 요건, 지원 금액, 신청 방법을 안내할게요. 신청 절차가 복잡하지 않으니 해당된다면 바로 신청하는 게 좋아요.
      </p>

      <a
        href="https://www.bokjiro.go.kr"
        style={{
          display: "block",
          background: "linear-gradient(135deg,#1D9E75,#0D8B66)",
          color: "#fff",
          textAlign: "center" as const,
          padding: "16px 24px",
          borderRadius: "12px",
          fontWeight: 700,
          fontSize: "16px",
          margin: "24px 0",
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(29,158,117,0.3)",
        }}
      >
        양육비 지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        부 또는 모 중 한 명이라도 만 24세 이하인 가정이 대상이에요. 가구 소득이 기준 중위소득 60% 이하여야 하죠. 한부모가 아니어도, 양부모 모두 해당 연령이면 신청할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        소득 기준은 기준 중위소득 60% 이하예요. 2025년 기준 3인 가구 약 257만원, 4인 가구 약 312만원 이하가 대상이에요. 근로소득, 사업소득, 재산에서 발생하는 소득 등을 모두 합산해 판단해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        외국인 배우자가 있는 경우도 조건을 충족하면 지원받을 수 있죠. 다문화 청소년부모도 해당 가구의 한국인 또는 영주권자 배우자가 만 24세 이하이고 소득 기준을 충족하면 신청 가능해요. 구체적인 판단은 주민센터 상담을 통해 확인하는 게 정확해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        아래 항목에 모두 해당한다면 바로 신청할 수 있죠. 소득 기준이 불분명하면 주민센터에서 사전 소득 조사를 받아보는 게 좋아요. 판단이 어려운 경우 복지로 상담 전화(129)에서도 안내받을 수 있죠. 특히 소득 경계선에 걸린다면 공제 항목 적용 여부에 따라 결과가 달라질 수 있으니 담당자와 직접 확인하는 게 안전해요. 전화 상담보다 방문 상담이 더 정확하게 판단해 주는 경우가 많고, 서류 준비 안내도 함께 받을 수 있죠. 방문 전 필요한 서류 목록을 미리 물어두면 시간을 크게 아낄 수 있죠.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />

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
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        소득 증빙 서류는 가구 전체 소득을 증명해야 해요. 근로소득자는 근로소득원천징수영수증, 자영업자는 소득금액증명원이 필요해요. 소득이 없는 경우에는 사실 확인서나 소득 없음 확인서를 제출해요. 국세청 홈택스에서 발급하면 방문 없이 바로 출력할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        신청 후 소득·재산 조사에 2~4주가 걸려요. 승인 후 다음 달부터 아동양육비가 입금돼요. 소득이 변동되면 주민센터에 신고해야 하고, 매년 소득 갱신 조사가 있죠. 소득 증가를 신고하지 않으면 초과 수령액을 환수당할 수 있어서 소득 변동 시 즉시 신고하는 게 중요해요.
      </p>
      <DocTable docs={DOCS} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "16px" }}>양육비 지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={FAQ_ITEMS} />
      <References groups={[{ category: "출처", items: REFS }]} />
      <Disclaimer text="이 글은 공식 발표 기준으로 작성됐어요. 정책 내용은 변경될 수 있으니 신청 전 해당 기관에서 최신 내용을 확인하세요." />
    </div>
  );
}
