"use client";

// Q1: 농업인인데 건강보험료·국민연금 부담이 큰 상황
// Q2: 보험료 50% 지원 자격 확인 → 국민연금공단/건강보험공단에서 신청
// Q3: 농업경영체 등록 필수, 건강보험료+연금 각 50% 지원
// Q4: EligibilityChecker + Steps + FAQ

import { FAQ, DocTable, Steps, EligibilityChecker, References, Disclaimer, H2, GreenBox } from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "농업경영체 등록이 완료된 상태예요" },
  { id: "c2", label: "농업·임업·어업을 직접 경영하거나 종사하고 있죠" },
  { id: "c3", label: "지역가입자로 건강보험 또는 국민연금에 가입되어 있죠" },
  { id: "c4", label: "농지 또는 시설의 규모가 지원 기준 이상이에요" },
];

const DOCS = [
  { name: "농업경영체 등록 확인서", required: true, where: "국립농산물품질관리원(농관원) 발급" },
  { name: "건강보험료 또는 국민연금 납부확인서", required: true, where: "건강보험공단·국민연금공단" },
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "농지 임대차계약서(해당자)", required: false, where: "농지 임차 시 첨부" },
];

const STEPS = [
  { title: "농업경영체 등록", desc: "국립농산물품질관리원(농관원)에 농업경영체 등록을 해요. 등록이 완료되어야 보험료 지원 신청이 가능해요." },
  { title: "지원 기관 신청", desc: "건강보험료 지원은 국민건강보험공단, 국민연금 보험료 지원은 국민연금공단에 각각 신청해요." },
  { title: "서류 제출 및 심사", desc: "농업경영체 등록 확인서와 보험료 납부 확인서를 제출하고 심사를 받아요." },
  { title: "지원 승인 및 감면 적용", desc: "승인 후 다음 달 보험료 고지서부터 감면된 금액이 반영돼요." },
];

const FAQ_ITEMS = [
  {
    q: "농업경영체 등록은 어떻게 하나요?",
    a: "국립농산물품질관리원(농관원) 지역 사무소에 방문하거나 농업경영체 등록 시스템(agrix.me.go.kr)에서 온라인으로 신청해요. 농지 면적 기준(논밭 0.1ha 이상 등)을 충족해야 해요.",
  },
  {
    q: "건강보험료 22% 지원과 국민연금 50% 지원을 동시에 받을 수 있나요?",
    a: "네, 두 가지 지원을 동시에 받을 수 있죠. 건강보험료 지원은 건강보험공단에, 국민연금 보험료 지원은 국민연금공단에 각각 별도로 신청해야 해요.",
  },
  {
    q: "농업경영체 등록 후 바로 지원받을 수 있나요?",
    a: "등록 후 지원 기관에 별도 신청을 해야 해요. 등록만으로 자동 지원되지는 않아요. 신청 후 심사를 거쳐 다음 달 보험료부터 감면이 적용돼요.",
  },
];

const REFS = [
  { label: "국민연금공단 농업인 보험료 지원", url: "https://www.nps.or.kr" },
  { label: "국민건강보험공단 농어업인 지원", url: "https://www.nhis.or.kr" },
  { label: "농림축산식품부 농업경영체 등록", url: "https://www.mafra.go.kr" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        농업인 건강·연금보험료 50% 지원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        농업경영체에 등록된 농업인이라면 건강보험료와 국민연금 보험료를 각각 50%씩 지원받을 수 있죠. 매달 내는 보험료가 절반으로 줄어드는 거예요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        농업인 건강보험료·연금보험료 지원은 농업경영체에 등록된 농업인이라면 받을 수 있는 제도예요. 국민연금 보험료 50% 지원은 지역 가입 농어업인의 보험료 부담을 크게 줄여줘요. 이 두 가지 지원을 동시에 받을 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        이 글에서는 농업인 보험료 지원의 자격 요건, 지원 금액, 신청 방법을 안내할게요. 농업경영체 등록이 선행되어야 하기 때문에 등록 절차도 함께 안내할게요.
      </p>

      <a
        href="https://www.nps.or.kr"
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
        농업경영체에 등록되어 있고, 지역가입자(건강보험)이거나 지역가입자·임의가입자(국민연금)인 농업인이 대상이에요. 직장가입자는 해당되지 않죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        지역가입자로 건강보험 또는 국민연금에 가입되어 있어야 해요. 직장가입자는 이미 직장에서 보험료를 납부하기 때문에 이 지원 대상이 아니에요. 농업을 겸업으로 하는 직장인도 지역가입자가 아니면 적용되지 않아요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        가족 중 농업에 종사하는 분이 있다면 각각 개인 기준으로 신청해야 해요. 배우자가 농업에 종사한다면 배우자도 별도로 농업경영체 등록을 하고 지원 신청을 해야 해요. 가구 단위가 아닌 개인 단위로 지원이 이루어져요. 부부가 각각 농업경영체 등록을 하면 두 사람 모두 보험료 지원을 받을 수 있어서 가구 전체 절감 금액이 두 배가 돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        아래 항목에 해당하면 보험료 지원 신청이 가능해요. 농업경영체 등록이 안 된 경우 먼저 등록을 진행해야 해요. 등록과 지원 신청은 별도 기관에서 처리되므로 순서대로 진행하는 게 중요해요.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />

      <H2>얼마나 지원되나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        건강보험료와 국민연금 보험료 각각 본인 부담분의 50%를 지원해요. 다만 연간 지원 한도가 정해져 있어서 보험료가 높은 경우 전액 50%가 아닐 수 있죠.
      </p>
      <GreenBox>
        <strong>지원 비율</strong><br />
        건강보험료 본인 부담분 50% + 국민연금 보험료 본인 부담분 50% (각각 연간 한도 내)
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        국민연금은 국민연금공단(1355), 건강보험은 국민건강보험공단(1577-1000)에 각각 신청해요. 농업경영체 등록 확인서가 필요하죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        농업경영체 등록 확인서가 핵심 서류예요. 이 서류는 농관원에서 발급받고, 온라인으로도 발급받을 수 있죠. 신청할 보험료 기관에서 필요한 추가 서류를 안내해 줄 거예요. 농지 임차 농업인은 임대차 계약서도 함께 준비하는 게 좋아요. 농관원 온라인 발급은 무료이고, 발급 당일 바로 사용할 수 있어서 방문 전에 미리 출력해 챙겨가면 편리해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        신청 후 심사를 거쳐 승인되면 다음 달 고지서부터 지원이 반영돼요. 농업경영체 등록 정보가 갱신되면 별도 신청 없이 지원이 유지돼요. 다만 경작 규모가 기준 이하로 줄어들거나 등록이 취소되면 지원도 중단돼요. 경작 면적이 변동됐을 때 농관원에 갱신 신고를 빠르게 하면 지원이 원활하게 이어져요. 신고 누락으로 지원이 중단됐다가 재신청하면 중단 기간 소급 지원이 안 되니 변경 사항은 즉시 처리하는 게 중요해요.
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
