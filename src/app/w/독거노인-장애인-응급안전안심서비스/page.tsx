"use client";

// Q1: 혼자 사는 어르신이나 중증장애인 가족이 응급 상황 대비 방법을 찾는 상황
// Q2: 응급안전안심서비스 자격 확인 → 주민센터에서 신청
// Q3: 대상(65세+ 독거노인 or 중증장애인), 무료 장비 설치, 24시간 모니터링
// Q4: EligibilityChecker + GreenBox(제공 장비) + Steps + FAQ

import { FAQ, GreenBox, Steps, EligibilityChecker, References, Disclaimer , H2 } from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "만 65세 이상 독거노인이거나 독거 중증장애인이에요" },
  { id: "c2", label: "혼자 생활하면서 응급 상황 발생 시 도움을 받기 어려운 환경이에요" },
  { id: "c3", label: "기초생활수급자, 차상위계층, 또는 기초연금 수급자에 해당해요" },
  { id: "c4", label: "현재 응급 안전 관련 장비를 따로 보유하지 않았어요" },
];

const STEPS = [
  { title: "주민센터 방문 또는 복지로 접속", desc: "거주지 읍·면·동 주민센터를 방문하거나 복지로(bokjiro.go.kr)에서 온라인으로 신청해요." },
  { title: "서비스 신청서 작성", desc: "본인 또는 대리인이 신청서를 작성하고, 건강 상태와 거주 환경 등 기본 정보를 기재해요." },
  { title: "현장 방문·장비 설치", desc: "담당자가 가정을 방문해 응급호출기, 화재감지기 등 장비를 무료로 설치해요." },
  { title: "24시간 모니터링 시작", desc: "설치 후 서비스가 시작되고, 응급 상황 발생 시 관제센터가 즉시 대응해요." },
];

const FAQ_ITEMS = [
  {
    q: "응급호출 버튼을 누르면 어떻게 되나요?",
    a: "호출 버튼을 누르면 24시간 관제센터로 연결돼요. 관제센터에서 상황을 파악한 후 가족, 이웃, 119 등에 즉시 연락해요. 응답이 없을 경우에는 자동으로 119에 신고가 접수돼요.",
  },
  {
    q: "장비 설치비나 월 이용료가 있나요?",
    a: "지원 대상자로 선정되면 장비 설치비와 월 이용료 모두 무료예요. 단, 장비를 고의로 파손하거나 분실한 경우에는 변상 책임이 생길 수 있죠.",
  },
  {
    q: "독거노인이 아닌 장애인도 신청할 수 있나요?",
    a: "네, 혼자 생활하는 중증장애인도 신청 대상이에요. 장애인 등록이 되어 있고 독거 상태이며 응급 상황 대응이 어려운 환경이라면 신청할 수 있죠.",
  },
];

const REFS = [
  { label: "복지로 응급안전안심서비스 신청", url: "https://www.bokjiro.go.kr" },
  { label: "보건복지부 노인복지 서비스 안내", url: "https://www.mohw.go.kr" },
];

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
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        이 글에서는 응급안전안심서비스 신청 자격부터 장비 설치 절차, 응급 대응 방식까지 안내할게요. 신청 전에 아래 자격 항목을 먼저 살펴보면 대상에 해당하는지 바로 파악할 수 있죠.
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
        응급안전서비스 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        만 65세 이상 독거노인이거나, 장애 정도가 심한 중증장애인 중 혼자 거주하는 분이 대상이에요. 기초생활수급자나 차상위 계층이 우선 선정되지만, 독거 상태면 소득과 무관하게 신청할 수 있는 지역도 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        소득 기준은 주로 기초생활수급자, 차상위계층, 기초연금 수급자에게 우선 지원돼요. 소득 기준이 맞지 않더라도 응급 위험도가 높다고 판단되면 지방자치단체 재량으로 지원받는 경우도 있죠. 담당 공무원이 직접 방문해 상황을 평가하고 지원 여부를 결정해요. 혼자 사는 어르신 가구를 주기적으로 방문하는 복지사가 연계해 신청을 도와주는 경우도 있으니, 주민센터에 먼저 연락해보는 게 좋아요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        중증장애인은 장애 등급이 1~2급(또는 심한 장애)에 해당하는 분이 대상이에요. 뇌병변, 심장, 호흡기, 신장 장애 등 일상생활이 어려운 장애 유형의 독거 장애인도 신청할 수 있죠. 장애인 등록이 되어 있지 않더라도 기능 평가를 통해 지원받는 경로가 있으니 주민센터에서 상담받아 보세요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        아래 자격 항목에 해당하면 신청을 진행할 수 있죠. 4가지 모두 해당한다면 바로 신청 가능하고, 일부 항목이 불분명하다면 주민센터 담당자와 상담을 통해 결정하면 돼요. 대상이 맞는지 판단이 어려울 때는 복지로 콜센터(129)에 문의하는 것도 좋은 방법이에요. 전화 상담으로 방문 전 서류 목록을 미리 파악해두면 헛걸음을 줄일 수 있죠.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />

      <H2>어떤 장비가 설치되나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        가정에 설치되는 장비는 화재감지기, 활동감지센서, 응급호출기 세 가지예요. 활동감지센서는 일정 시간 움직임이 없으면 관제센터에 자동 알림이 가죠. 응급호출기는 목걸이나 손목밴드 형태로, 버튼 하나만 누르면 119와 연결돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        화재감지기는 가스 누출이나 화재를 감지하면 자동으로 관제센터에 알림을 보내요. 어르신이 직접 호출하지 않아도 위험 상황이 감지되는 구조이기 때문에 의식을 잃은 상황에서도 대응이 돼요. 활동감지기는 일정 시간 동안 움직임이 없으면 이상 신호를 보내요. 보통 새벽 시간대에 일정 이상 움직임이 없으면 자동으로 확인 절차가 시작돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        관제센터는 24시간 365일 운영되고, 신호가 접수되면 담당자가 전화로 먼저 상황을 파악해요. 전화 연결이 안 되거나 응답이 없으면 지역 담당자나 119에 즉시 연락해요. 가족 연락처도 미리 등록되어 있어 가족에게도 동시에 연락이 가요. 응급 대응 이력은 기록으로 남아서 이후 상황 파악에 활용되기도 해요.
      </p>

      <GreenBox>
        응급호출기(목걸이·손목형), 화재감지기, 활동감지기를 무료로 설치해요. 24시간 관제센터 연동으로 위기 상황 시 119 및 가족에게 즉시 연락해요.
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        주민센터에 신분증 지참해서 방문하면 돼요. 신청 후 담당자가 가정을 방문해서 환경을 확인하고 장비를 설치해주죠. 설치까지 보통 2~4주 정도 걸려요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        신청 후 담당 공무원이 가정을 방문해 생활 환경을 확인하고 지원 여부를 결정해요. 선정되면 전문 설치 기사가 다시 방문해 응급호출기와 감지기를 무료로 설치해요. 설치 후 사용법을 직접 안내받을 수 있죠. 장비 위치는 어르신의 생활 동선을 고려해 가장 효과적인 곳에 배치해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        설치 완료 후에는 별도 조작 없이 바로 서비스가 시작돼요. 장비 사용법이 익숙하지 않으면 담당자에게 추가 교육을 요청할 수 있죠. 장비에 문제가 생기면 전화(관제센터 또는 주민센터)로 신청하면 무상 수리 또는 교체가 돼요. 정기적으로 장비 점검 방문도 이루어져서 고장을 미리 발견할 수 있죠.
      </p>
      <Steps steps={STEPS} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "16px" }}>응급안전서비스에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={FAQ_ITEMS} />
      <References groups={[{ category: "출처", items: REFS }]} />
      <Disclaimer text="이 글은 공식 발표 기준으로 작성됐어요. 정책 내용은 변경될 수 있으니 신청 전 해당 기관에서 최신 내용을 확인하세요." />
    </div>
  );
}
