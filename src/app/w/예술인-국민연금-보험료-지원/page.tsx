"use client";

// Q1: 프리랜서 예술인이 국민연금 보험료 부담 줄일 수 있는지 궁금
// Q2: 보험료 50% 지원 자격 확인 → 한국예술인복지재단
// Q3: 예술활동증명 완료 필수, 월 소득 기준, 보험료 50% 지원
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { FAQ, DocTable, GreenBox, Steps, EligibilityChecker, References, Disclaimer, H2 } from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "한국예술인복지재단에서 예술활동증명이 완료된 상태예요" },
  { id: "c2", label: "지역가입자로 국민연금에 가입되어 있죠" },
  { id: "c3", label: "예술 활동으로 인한 소득이 있고 이를 증빙할 수 있죠" },
  { id: "c4", label: "직장가입자 또는 공무원·군인 연금 적용자가 아니에요" },
];

const DOCS = [
  { name: "예술활동증명 완료 확인서", required: true, where: "한국예술인복지재단 발급" },
  { name: "국민연금 가입 증명서", required: true, where: "국민연금공단 발급" },
  { name: "예술 활동 소득 증빙 서류", required: true, where: "계약서, 공연 수익 명세 등" },
  { name: "신분증", required: true, where: "본인 지참" },
];

const STEPS = [
  { title: "예술활동증명 신청 (필수 선행)", desc: "한국예술인복지재단에서 예술활동증명을 먼저 받아야 해요. 예술 분야 활동 실적이 있어야 하고 심사에 수개월이 걸릴 수 있죠." },
  { title: "국민연금 지역가입자 확인", desc: "국민연금공단에서 지역가입자 여부를 확인해요. 직장가입자인 경우 대상에서 제외돼요." },
  { title: "예술인복지재단 보험료 지원 신청", desc: "예술활동증명 완료 후 예술인복지재단에서 국민연금 보험료 지원을 신청해요." },
  { title: "지원 승인 및 보험료 감면 적용", desc: "승인 후 다음 달 보험료부터 50%가 감면돼요. 최대 월 4만 5천원이 지원돼요." },
];

const FAQ_ITEMS = [
  {
    q: "예술활동증명은 어떻게 받나요?",
    a: "한국예술인복지재단 홈페이지(kawf.kr)에서 신청해요. 예술 활동 실적(공연 참여, 전시 작품 판매, 방송 출연 등)을 증빙 서류와 함께 제출하면 심사를 거쳐 인정받아요. 심사에 1~3개월이 걸릴 수 있죠.",
  },
  {
    q: "지원 기간은 얼마나 되나요?",
    a: "예술활동증명 유효 기간인 3년 동안 지원받을 수 있죠. 3년 후에는 예술활동증명을 갱신하고 다시 지원을 신청해야 해요. 갱신 심사에서 탈락하면 지원도 중단돼요.",
  },
  {
    q: "프리랜서 예술인도 신청할 수 있나요?",
    a: "네, 프리랜서 예술인도 지역가입자이면 신청 가능해요. 전업 예술인이 아니어도 예술 활동 실적이 있고 예술활동증명을 받았다면 지원받을 수 있죠.",
  },
];

const REFS = [
  { label: "한국예술인복지재단 보험료 지원 신청", url: "https://www.kawf.kr" },
  { label: "국민연금공단 보험료 지원 안내", url: "https://www.nps.or.kr" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        예술인 국민연금 보험료 50% 지원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        프리랜서 예술인이라면 국민연금 보험료의 50%를 정부가 대신 내줘요. 한국예술인복지재단에서 예술활동증명을 받은 뒤 신청하면 되죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        예술인 국민연금 보험료 지원은 한국예술인복지재단의 예술활동증명을 받은 지역가입자 예술인이 대상이에요. 보험료 납부 금액의 50%를 국가가 지원하기 때문에 실제로 내야 하는 금액이 절반으로 줄어요. 지원 기간은 예술활동증명 유효 기간인 3년이에요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        이 글에서는 예술인 국민연금 보험료 지원의 자격 요건, 지원 금액, 신청 방법을 안내할게요. 예술활동증명이 선행 조건이기 때문에 아직 받지 않은 경우 먼저 신청해야 해요.
      </p>

      <a
        href="https://www.kawf.kr"
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
        보험료 지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        한국예술인복지재단에서 예술활동증명이 완료된 예술인이 대상이에요. 국민연금 지역가입자 또는 임의가입자여야 하고, 직장가입자는 해당되지 않죠. 월 소득이 일정 기준 이하여야 지원받을 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        증명 신청 시에는 예술 활동 실적을 증빙해야 해요. 공연 프로그램, 전시 참여 확인서, 저작권 등록 내역, 방송 출연 확인서 등이 증빙 자료로 사용될 수 있죠. 실적이 부족하면 심사에서 탈락할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        국민연금은 지역가입자 자격이어야 해요. 직장에서 4대 보험에 가입되어 있는 직장가입자는 이 지원 대상이 아니에요. 프리랜서, 개인 사업자 등 지역가입자로 국민연금을 납부하는 예술인이 해당돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        아래 항목을 모두 충족하면 신청이 가능해요. 예술활동증명이 아직 안 된 경우 먼저 예술인복지재단에서 증명 신청부터 진행해야 해요. 증명 신청은 kawf.kr에서 온라인으로 할 수 있고, 심사에 1~3개월이 소요될 수 있죠.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />

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
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        신청은 한국예술인복지재단 홈페이지에서 온라인으로 하거나 재단을 방문해 할 수 있죠. 핵심 서류는 예술활동증명 완료 확인서와 국민연금 가입 증명서예요. 두 서류 모두 각 기관에서 온라인으로 발급받을 수 있죠. 재단 방문 전에 전화로 필요 서류를 미리 확인하면 왕복 방문을 줄일 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        예술 활동 소득 증빙 서류도 필요해요. 계약서, 공연 수익 명세, 저작권료 수령 확인서 등이 사용되고, 소득이 없는 기간이 있어도 예술 활동 실적이 있으면 신청 가능해요. 소득 증빙이 어려운 경우 재단에 문의하면 대안 서류를 안내받을 수 있죠. 소득이 불규칙한 예술인의 특성을 반영해 인정 서류 범위가 비교적 넓어요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        신청 후 심사에 2~4주가 걸려요. 승인되면 다음 달 국민연금 고지서부터 50% 감면된 금액이 반영돼요. 3년 후 갱신 시에는 예술활동증명 갱신과 함께 보험료 지원도 다시 신청해야 해요. 갱신 시점을 놓치지 않으려면 예술활동증명 만료 3~4개월 전에 미리 갱신 신청을 시작하는 게 좋아요. 갱신이 늦어지면 보험료 지원이 중단되는 공백이 생길 수 있고 소급 지원도 안 되니 미리 일정을 챙겨야 해요.
      </p>
      <DocTable docs={DOCS} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "16px" }}>보험료 지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={FAQ_ITEMS} />
      <References groups={[{ category: "출처", items: REFS }]} />
      <Disclaimer text="이 글은 공식 발표 기준으로 작성됐어요. 정책 내용은 변경될 수 있으니 신청 전 해당 기관에서 최신 내용을 확인하세요." />
    </div>
  );
}
