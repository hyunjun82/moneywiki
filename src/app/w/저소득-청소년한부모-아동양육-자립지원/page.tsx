"use client";

// Q1: 만 24세 이하 한부모가 양육비+자립 지원받고 싶은 상황
// Q2: 자립지원 자격 확인 → 주민센터/복지로
// Q3: 만 24세 이하 한부모, 중위소득 72% 이하, 월 35만원+자립촉진수당
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { FAQ, DocTable, Steps, EligibilityChecker, References, Disclaimer , H2 } from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "만 24세 이하 한부모(모 또는 부)예요" },
  { id: "c2", label: "만 18세 미만 아동을 양육하고 있죠" },
  { id: "c3", label: "기준 중위소득 65% 이하 가구에 해당해요" },
  { id: "c4", label: "현재 시설에 입소해 있지 않고 독립 가구로 생활하고 있죠" },
];

const DOCS = [
  { name: "사회보장급여 신청서", required: true, where: "주민센터 비치 또는 복지로 양식" },
  { name: "가족관계증명서", required: true, where: "주민센터 또는 대법원 인터넷등기소" },
  { name: "주민등록등본", required: true, where: "정부24 또는 주민센터" },
  { name: "소득·재산 증빙 서류", required: true, where: "근로소득원천징수영수증, 사업소득증빙 등" },
  { name: "통장 사본", required: true, where: "수당 받을 계좌" },
];

const STEPS = [
  { title: "복지로 또는 주민센터 신청", desc: "복지로 홈페이지에서 온라인으로 신청하거나 거주지 읍·면·동 주민센터를 방문해 신청해요." },
  { title: "소득·가구 조사", desc: "신청 후 공무원이 소득·재산 조사를 진행해요. 필요 서류를 제출하면 조사 기간이 단축돼요." },
  { title: "지원 승인 및 통보", desc: "조사 결과에 따라 지원 여부와 금액이 결정되고 문자·우편으로 안내돼요." },
  { title: "수당 지급 시작", desc: "승인 후 다음 달부터 매달 아동양육비와 자립지원수당이 지정 계좌로 입금돼요." },
];

const FAQ_ITEMS = [
  {
    q: "아동양육비 35만원과 자립지원수당 10만원을 동시에 받을 수 있나요?",
    a: "네, 두 가지를 동시에 받을 수 있죠. 아동양육비는 양육 아동 1인당 월 35만원이고, 자립지원수당은 청소년 한부모 본인에게 월 10만원이 지급돼요. 합치면 매달 최소 45만원을 받을 수 있죠.",
  },
  {
    q: "아이가 2명이면 양육비가 두 배로 나오나요?",
    a: "네, 아동 수에 따라 양육비가 지급돼요. 아동 2명이면 월 70만원, 3명이면 105만원이에요. 자립지원수당은 아동 수와 관계없이 청소년 한부모 본인에게 월 10만원이에요.",
  },
  {
    q: "만 25세가 되면 지원이 바로 끊기나요?",
    a: "청소년 한부모 지원은 만 25세 생일이 있는 달까지 지급돼요. 만 25세가 되면 일반 한부모 가족 지원 제도로 전환 신청을 해야 해요. 전환하면 지원 금액이 달라지니 주민센터에서 안내받는 게 좋아요.",
  },
];

const REFS = [
  { label: "복지로 한부모가족 지원 신청", url: "https://www.bokjiro.go.kr" },
  { label: "여성가족부 한부모가족 지원 안내", url: "https://www.mogef.go.kr" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        청소년한부모 양육·자립지원, 월 35만원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 24세 이하 한부모라면 아이 양육비와 자립 준비를 동시에 지원받을 수 있죠. 아동양육비 월 35만원에 검정고시나 자격증 취득 비용까지 별도로 지원돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        청소년 한부모 지원은 만 24세 이하 한부모가 대상이에요. 아동양육비는 양육 아동 1인당 월 35만원, 자립지원수당은 청소년 한부모 본인에게 월 10만원이 별도로 지급돼요. 두 가지를 합치면 아이 1명 양육 시 매달 최소 45만원을 받을 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        이 글에서는 청소년 한부모 아동양육비·자립지원수당의 자격 요건, 지원 금액, 신청 방법을 안내할게요. 신청 기간을 놓치지 않으면 소급 지원이 안 되니 빨리 신청하는 게 유리해요.
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
        자립지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        부 또는 모 중 한 명이라도 만 24세 이하인 한부모 가정이 대상이에요. 가구 소득이 기준 중위소득 72% 이하여야 하죠. 혼인 여부와 관계없이 실제로 아이를 양육하고 있으면 신청 가능해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        소득 기준 중위소득 65%는 2025년 기준 2인 가구 약 218만원, 3인 가구 약 279만원 이하예요. 근로소득, 사업소득, 금융소득 등 모든 소득을 합산해 판단해요. 재산 기준도 있어서 소득 외에 재산 조사도 함께 진행돼요. 소득이 경계선 근처라면 주민센터에서 사전 조사를 받아보는 게 좋아요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        시설에 입소해 생활하는 경우에는 별도 지원 체계가 적용되어 이 제도 대상에서 제외돼요. 독립적으로 생활하는 청소년 한부모가 대상이에요. 부모님 집에 함께 사는 경우는 세대 구성에 따라 판단이 달라질 수 있죠. 같은 세대에 부양가족이 있으면 소득 산정 방식이 달라져요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        아래 항목을 체크해 자격을 확인해 보세요. 소득 기준이 애매하다면 주민센터에서 사전 상담을 받으면 돼요. 신청 전 상담만으로도 내 상황이 해당되는지 명확하게 파악할 수 있죠.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />

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
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        필요 서류는 가족관계증명서, 주민등록등본, 소득·재산 증빙 서류, 통장 사본이에요. 가족관계증명서는 한부모 상태(이혼·미혼·사망 등)를 증명하는 서류예요. 미혼모·부의 경우 아동의 부(또는 모) 정보가 없어도 신청 가능해요. 소득·재산 증빙은 근로소득원천징수영수증이나 건강보험료 납부 확인서로 대체할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        신청 후 소득·재산 조사에 2~4주가 걸려요. 승인되면 다음 달부터 매달 수당이 계좌로 입금돼요. 매년 소득 변동 여부를 확인하는 갱신 절차가 있어서 연락처와 주소 정보를 최신으로 유지해야 해요. 소득이 늘거나 주소가 바뀌면 주민센터에 변경 신고를 해야 지원이 끊기지 않아요. 갱신 시점에 서류를 미리 챙겨두면 지원 공백 없이 이어서 받을 수 있죠.
      </p>
      <DocTable docs={DOCS} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "16px" }}>자립지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={FAQ_ITEMS} />
      <References groups={[{ category: "출처", items: REFS }]} />
      <Disclaimer text="이 글은 공식 발표 기준으로 작성됐어요. 정책 내용은 변경될 수 있으니 신청 전 해당 기관에서 최신 내용을 확인하세요." />
    </div>
  );
}
