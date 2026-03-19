"use client";

// Q1: 다문화가정 자녀 교육비 부담 줄이고 싶은 상황
// Q2: 교육활동비 신청 → 다문화가족지원센터/복지로
// Q3: 다문화가족 만 18세 이하 자녀, 기초학습·진로설계·교육활동비
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { FAQ, DocTable, Steps, EligibilityChecker, References, Disclaimer , H2 } from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "국제결혼 가정 또는 외국인 부모 가정의 자녀예요" },
  { id: "c2", label: "초등학교 또는 중학교에 재학 중이에요" },
  { id: "c3", label: "기준 중위소득 100% 이하 가구에 해당해요" },
  { id: "c4", label: "한국에 주민등록이 되어 있고 국내에 거주하고 있죠" },
];

const DOCS = [
  { name: "사회보장급여 신청서", required: true, where: "주민센터 비치 또는 복지로 양식" },
  { name: "가족관계증명서 또는 외국인등록사실증명", required: true, where: "주민센터 또는 출입국·외국인청" },
  { name: "재학 증명서", required: true, where: "학교 발급" },
  { name: "소득·재산 증빙 서류", required: true, where: "근로소득원천징수영수증 등" },
  { name: "통장 사본", required: true, where: "지원금 받을 계좌" },
];

const STEPS = [
  { title: "복지로 또는 주민센터 신청", desc: "복지로 홈페이지에서 온라인으로 신청하거나 거주지 읍·면·동 주민센터를 방문해 신청해요." },
  { title: "서류 제출 및 자격 심사", desc: "다문화가족 여부를 증명하는 서류와 재학증명서, 소득 증빙 서류를 제출해요." },
  { title: "지원 승인 및 통보", desc: "심사 후 지원 여부와 금액이 결정되고 문자 또는 우편으로 안내돼요." },
  { title: "교육활동비 수령 및 사용", desc: "승인 후 지정 계좌로 교육활동비가 지급돼요. 교육 관련 용도에 사용해요." },
];

const FAQ_ITEMS = [
  {
    q: "외국 국적 자녀도 지원받을 수 있나요?",
    a: "한국 국적이 있거나 영주권을 보유한 경우 지원 가능해요. 외국 국적이더라도 국내 학교에 재학 중이고 주민등록이 되어 있으면 지원 신청을 해볼 수 있죠. 정확한 판단은 주민센터 상담을 통해 살펴보세요.",
  },
  {
    q: "교육활동비를 어디에 써야 하나요?",
    a: "교재비, 학원비, 학용품비, 교육 관련 활동비 등 교육 관련 용도에 사용해요. 사용처 영수증을 보관해두면 필요 시 증빙에 활용할 수 있죠. 지원금은 계좌로 입금되기 때문에 사용처가 자동으로 제한되지는 않아요.",
  },
  {
    q: "고등학교 자녀도 지원받을 수 있나요?",
    a: "현재 다문화가족 자녀 교육활동비는 초등학교와 중학교 재학 자녀를 대상으로 해요. 고등학생은 별도의 장학금이나 교육비 지원 제도를 통해 받을 수 있죠. 지자체별로 고등학생 대상 추가 지원이 있을 수 있으니 주민센터에서 확인해 보세요.",
  },
];

const REFS = [
  { label: "복지로 다문화가족 지원 신청", url: "https://www.bokjiro.go.kr" },
  { label: "여성가족부 다문화가족 지원 안내", url: "https://www.mogef.go.kr" },
  { label: "다문화가족지원포털 다누리", url: "https://www.liveinkorea.kr" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        다문화가족 자녀 교육활동비 지원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        다문화가정 자녀라면 기초학습, 진로설계, 교육활동에 필요한 비용을 지원받을 수 있죠. 학원비, 교재비, 체험활동비 등이 포함돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        다문화가족 자녀 교육활동비는 초등학교 재학 자녀에게 연 20만원, 중학교 재학 자녀에게 연 30만원을 지원해요. 소득 기준 중위소득 100% 이하 가구의 다문화가족 자녀가 대상이에요. 연 1회 지급되는 방식으로 학년초에 신청하는 게 좋아요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        이 글에서는 다문화가족 자녀 교육활동비 신청 자격, 지원 금액, 신청 방법을 안내할게요. 학기 시작 때 신청해서 한 해 동안 교육비로 활용할 수 있죠.
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
        교육활동비 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        다문화가족(국제결혼 가정 또는 외국인 부모 가정)의 만 18세 이하 자녀가 대상이에요. 소득 기준은 지자체마다 다를 수 있으니 거주지 다문화가족지원센터에 문의하는 게 정확하죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        자녀는 초등학교 또는 중학교 재학 중이어야 해요. 검정고시를 준비 중인 학교 밖 청소년은 해당 연령대여도 대상에서 제외될 수 있죠. 국내 학교에 재학 중이고 주민등록이 되어 있는 경우가 기본 요건이에요. 학교에 입학 전 아동이나 고등학생은 별도 지원 제도를 통해 받을 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        소득 기준은 기준 중위소득 100% 이하이에요. 2025년 기준 4인 가구 약 540만원 이하가 해당돼요. 소득 기준이 다른 복지 제도보다 넓은 편이라서 비교적 많은 다문화가족이 혜택을 받을 수 있죠. 맞벌이 가구도 소득 합산 후 기준 이하라면 신청 가능해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        아래 항목에 해당하면 신청이 가능해요. 소득 기준이 애매하다면 주민센터에서 미리 확인해 보는 게 좋아요. 소득 조사 없이 간단한 상담만으로도 해당 여부를 파악할 수 있죠.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />

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
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        신청은 복지로 온라인 또는 거주지 주민센터 방문으로 해요. 복지로에서 온라인 신청 시에는 공인인증서나 간편인증으로 로그인 후 신청서를 작성하고 서류를 첨부해요. 주민센터 방문 시에는 담당자와 직접 상담하면서 필요한 서류를 확인할 수 있죠. 한국어가 어려운 경우 다누리 콜센터(1577-1366)에서 통역 지원을 받을 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        다문화가족 여부 확인을 위해 가족관계증명서 또는 외국인등록사실증명이 필요해요. 외국인 부모가 있는 경우 출입국·외국인청에서 외국인등록사실증명을 발급받을 수 있죠. 재학증명서는 학교에서 발급받아요. 서류 발급이 어렵다면 주민센터 담당자가 대신 조회해 주는 경우도 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        신청 후 심사에 2~4주가 걸려요. 승인되면 지정 계좌로 교육활동비가 입금돼요. 매년 재신청이 필요하기 때문에 매학기 초에 신청 일정을 확인하는 게 좋아요. 신청 기간을 놓치면 그 해 지원을 받지 못하기 때문에 학교에서 안내하는 공지를 미리 확인해 두는 게 중요해요.
      </p>
      <DocTable docs={DOCS} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "16px" }}>교육활동비에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={FAQ_ITEMS} />
      <References groups={[{ category: "출처", items: REFS }]} />
      <Disclaimer text="이 글은 공식 발표 기준으로 작성됐어요. 정책 내용은 변경될 수 있으니 신청 전 해당 기관에서 최신 내용을 확인하세요." />
    </div>
  );
}
