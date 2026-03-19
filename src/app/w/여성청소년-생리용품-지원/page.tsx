"use client";

// Q1: 저소득 가정 여성 청소년이 생리용품 지원을 받을 수 있는지 궁금한 상황
// Q2: 생리용품 지원 자격 확인 → 복지로 또는 주민센터에서 신청
// Q3: 만 9~24세, 기초수급/차상위, 월 13,000원 국민행복카드 충전
// Q4: EligibilityChecker + Steps + FAQ

import { FAQ, DocTable, GreenBox, Steps, EligibilityChecker, References, Disclaimer, H2 } from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "만 9세 이상 만 24세 이하 여성청소년이에요" },
  { id: "c2", label: "기초생활수급자, 차상위계층, 또는 한부모가족 지원 대상에 해당해요" },
  { id: "c3", label: "주민등록상 주소가 신청 지역과 일치해요" },
  { id: "c4", label: "현재 같은 지원을 중복으로 받고 있지 않아요" },
];

const DOCS = [
  { name: "신분증(본인 또는 보호자)", required: true, where: "본인 지참" },
  { name: "기초생활수급자 증명서 또는 차상위계층 확인서", required: true, where: "주민센터 발급" },
  { name: "주민등록등본", required: false, where: "정부24 또는 주민센터" },
];

const STEPS = [
  { title: "복지로 또는 주민센터 접수", desc: "복지로 홈페이지에서 온라인으로 신청하거나 거주지 읍·면·동 주민센터를 방문해 신청해요." },
  { title: "서류 제출 및 자격 확인", desc: "기초수급자 증명서 또는 차상위계층 확인서를 제출하고 자격 심사를 받아요." },
  { title: "바우처 카드 수령", desc: "승인 후 국민행복카드(바우처 카드)로 지원금이 충전돼요. 기존 국민행복카드가 있으면 그 카드에 충전돼요." },
  { title: "편의점·약국 등에서 사용", desc: "국민행복카드를 제휴 가맹점(편의점, 약국, 대형마트 등)에서 생리용품 구입에 사용해요." },
];

const FAQ_ITEMS = [
  {
    q: "바우처로 어디서 생리용품을 살 수 있나요?",
    a: "GS25, CU, 세븐일레븐 등 편의점과 약국, 대형마트 등 국민행복카드 제휴 가맹점에서 사용할 수 있죠. 생리용품 외에 다른 상품을 구매할 수는 없어요.",
  },
  {
    q: "월 12,000원은 매달 자동 충전되나요?",
    a: "네, 매달 자동으로 국민행복카드에 충전돼요. 이번 달에 사용하지 않은 금액은 다음 달로 이월되지 않으니 매달 소진하는 게 좋아요.",
  },
  {
    q: "만 25세가 되면 지원이 자동으로 종료되나요?",
    a: "네, 만 24세까지만 지원이 돼요. 생일이 지나 만 25세가 되면 자동으로 지원이 종료돼요. 별도로 해지 신청을 하지 않아도 돼요.",
  },
];

const REFS = [
  { label: "복지로 여성청소년 생리용품 바우처 신청", url: "https://www.bokjiro.go.kr" },
  { label: "여성가족부 청소년 지원 안내", url: "https://www.mogef.go.kr" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        여성청소년 생리용품 지원, 월 13,000원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        저소득 가정의 여성 청소년이라면 매달 13,000원어치 생리용품을 국민행복카드로 지원받을 수 있죠. 약국이나 편의점에서 카드로 결제하면 돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        여성청소년 생리용품 바우처 지원 대상은 만 9세부터 만 24세까지 저소득 가정의 여성청소년이에요. 기초생활수급자, 차상위계층, 한부모가족 지원 대상 가구에 속하면 신청할 수 있죠. 신청 후 승인되면 매달 카드에 자동 충전돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        이 글에서는 생리용품 바우처 신청 자격, 사용처, 신청 방법을 단계별로 안내할게요. 복잡하지 않고 주민센터 방문 또는 복지로 온라인 신청으로 간단하게 받을 수 있죠.
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
        생리용품 지원 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 9세 이상 만 24세 이하 여성 청소년 중 기초생활수급자 또는 차상위 계층이 대상이에요. 나이 기준은 매년 1월 1일 기준이고, 주민등록상 여성이면 신청 가능하죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        소득 기준은 기초생활수급자, 차상위계층, 한부모가족 지원 대상 가구예요. 본인이 아니라 가구 전체 소득 기준이기 때문에 부모 또는 보호자의 소득이 기준에 해당해야 해요. 주민등록상 주소지 기준으로 신청하기 때문에 실제 거주지와 주민등록이 다를 경우 주민등록 이전이 필요해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        학교 밖 청소년도 신청 가능해요. 학교를 다니지 않는 청소년도 연령과 소득 기준을 충족하면 동일하게 지원받을 수 있죠. 가정 외 보호 시설(보호시설, 쉼터 등)에 있는 청소년도 해당 시설을 통해 신청할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        아래 자격 항목에 모두 해당한다면 바로 신청 가능해요. 소득 기준이 불분명하다면 주민센터에서 복지 담당자와 상담을 통해 파악할 수 있죠. 보호자 소득이 기준에 가까운 경우 근로소득 공제나 재산 공제 항목 적용 여부에 따라 결과가 달라질 수 있어서, 상담으로 직접 확인하는 게 확실해요.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />

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
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        국민행복카드가 없는 경우 신청 시 카드 발급도 함께 신청할 수 있죠. 기존 국민행복카드가 있다면 그 카드에 충전돼요. 카드 발급은 주민센터 또는 복지로에서 연계된 카드사를 통해 발급받을 수 있죠. BC카드, 삼성카드, 롯데카드 등 여러 카드사에서 국민행복카드를 발급하고 있어서 원하는 카드사를 선택해 신청할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        신청 후 보통 1~2주 내에 승인 결과를 문자나 우편으로 안내받아요. 승인 후 다음 달부터 바우처가 충전되기 시작해요. 신청이 거절된 경우에는 사유를 확인하고 서류를 보완해서 재신청할 수 있죠. 서류 미비로 거절되는 경우가 많아서 제출 전 목록을 꼼꼼히 살펴보는 게 좋아요.
      </p>
      <DocTable docs={DOCS} />

      <H2>신청 절차 단계별 안내</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        신청 절차는 총 4단계로 이루어져요. 복지로 온라인 신청이 가장 빠르고 편리하지만, 온라인 사용이 어렵다면 주민센터를 방문해도 돼요. 만 14세 미만은 보호자가 함께 신청해야 하고, 만 14세 이상이라면 본인이 직접 신청할 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        복지로에서 온라인 신청 시 공인인증서 또는 간편 인증(카카오, 네이버 등)으로 로그인해요. 신청서 작성 후 서류를 파일로 첨부하면 바로 접수가 돼요. 처리 상황은 복지로 마이페이지에서 실시간으로 확인할 수 있죠. 신청 완료 후 승인까지 통상 1~2주 정도 걸려요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        주민센터 방문 신청은 서류를 직접 제출하기 때문에 즉시 접수가 가능해요. 담당자와 대면 상담을 통해 자격 요건이나 서류 미비 사항을 바로 해결할 수 있죠. 방문 전에 전화로 필요 서류를 확인하면 헛걸음을 줄일 수 있죠. 신청이 처음이라면 방문 신청을 통해 전 과정을 안내받는 게 더 확실해요.
      </p>
      <Steps steps={STEPS} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "16px" }}>생리용품 지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={FAQ_ITEMS} />
      <References groups={[{ category: "출처", items: REFS }]} />
      <Disclaimer text="이 글은 공식 발표 기준으로 작성됐어요. 정책 내용은 변경될 수 있으니 신청 전 해당 기관에서 최신 내용을 확인하세요." />
    </div>
  );
}
