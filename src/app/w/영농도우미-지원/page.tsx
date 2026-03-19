"use client";

// Q1: 농번기 일손 부족하거나 농업인이 아프거나 출산해서 도움 필요
// Q2: 영농도우미 신청 → 농업기술센터
// Q3: 농업경영체 등록, 연 최대 90일, 일당 5만원
// Q4: EligibilityChecker + GreenBox + Steps + FAQ

import { FAQ, DocTable, Steps, EligibilityChecker, References, Disclaimer , H2 } from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "농업경영체에 등록된 농업인이에요" },
  { id: "c2", label: "농번기이거나 부상·질병·출산 등으로 농작업이 어려운 상황이에요" },
  { id: "c3", label: "주민센터 또는 농업기술센터에서 신청 가능한 지역에 거주하고 있죠" },
  { id: "c4", label: "저소득 기준(기초수급자·차상위계층)에 해당하거나 일반 이용료를 낼 수 있죠" },
];

const DOCS = [
  { name: "영농도우미 신청서", required: true, where: "읍·면 사무소 또는 농업기술센터 비치" },
  { name: "농업경영체 등록 확인서", required: true, where: "농관원 발급" },
  { name: "진단서 또는 입원 확인서(부상·질병 시)", required: false, where: "의료기관 발급" },
  { name: "기초수급자 증명서(저소득 무료 신청 시)", required: false, where: "주민센터 발급" },
];

const STEPS = [
  { title: "읍·면 사무소 또는 농업기술센터 연락", desc: "영농도우미 지원은 지역 농업기술센터나 읍·면 사무소를 통해 신청해요. 사전에 전화로 지원 가능 여부와 일정을 확인해요." },
  { title: "신청서 작성 및 서류 제출", desc: "신청서와 함께 농업경영체 등록 확인서를 제출해요. 부상·질병 사유라면 진단서도 함께 제출해요." },
  { title: "현장 확인 및 일정 조율", desc: "담당자가 신청 내용을 검토하고 파견 일정을 조율해요. 농번기에는 수요가 많아 미리 신청할수록 유리해요." },
  { title: "영농도우미 파견 및 이용료 납부", desc: "파견된 도우미와 함께 농작업을 진행해요. 일반 농업인은 자부담 이용료를 사후 납부해요." },
];

const FAQ_ITEMS = [
  {
    q: "저소득이 아닌 일반 농업인도 이용 가능한가요?",
    a: "네, 일반 농업인도 이용 가능해요. 다만 저소득 기초수급자·차상위계층은 무료로 이용하고, 일반 농업인은 시간당 일부 이용료를 부담해요. 지원 비율은 지자체마다 다를 수 있죠.",
  },
  {
    q: "영농도우미는 어떤 일을 도와주나요?",
    a: "모내기, 수확, 밭갈기, 비닐하우스 관리 등 농작업 전반을 지원해요. 가사노동이나 농작업 이외의 업무는 지원하지 않아요. 도우미 1인당 하루 작업 가능 시간이 정해져 있죠.",
  },
  {
    q: "농번기가 아닌 시기에도 신청할 수 있나요?",
    a: "부상, 질병, 출산 등의 사유가 있으면 농번기가 아닌 시기에도 신청 가능해요. 이 경우 진단서 등 증빙 서류가 필요해요. 지원 가능 여부는 지역마다 달라요.",
  },
];

const REFS = [
  { label: "정부24 영농도우미 신청", url: "https://www.gov.kr" },
  { label: "농림축산식품부 영농도우미 안내", url: "https://www.mafra.go.kr" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
        영농도우미 지원, 일당 5만원
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        농번기에 일손이 부족하거나, 질병·출산·사고로 직접 농사를 짓기 어려운 상황이라면 영농도우미를 지원받을 수 있죠. 도우미 인건비를 정부가 일당 5만원씩 지원해줘요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        영농도우미 지원은 농업경영체에 등록된 농업인이 농번기, 부상, 질병, 출산 등으로 농작업이 어려울 때 인력을 파견해 주는 서비스예요. 기초생활수급자나 차상위계층 농업인은 무료로 이용할 수 있고, 일반 농업인도 일부 이용료만 내면 이용 가능해요. 노인 단독 농가나 여성 농업인도 신청 대상에 해당해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        이 글에서는 영농도우미 신청 대상, 이용 조건, 신청 방법을 안내할게요. 농번기에는 수요가 몰리기 때문에 미리 신청하는 게 중요해요. 처음 신청이라면 가까운 농업기술센터에 전화해서 지원 가능 여부를 먼저 확인하는 게 시간을 아끼는 방법이에요.
      </p>

      <a
        href="https://www.gov.kr"
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
        영농도우미 신청하기 →
      </a>

      <H2>누가 받을 수 있나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        농업경영체에 등록된 농업인이 대상이에요. 질병, 출산, 군 입영, 사고 등으로 직접 농작업이 어려운 경우 우선 배정되죠. 농번기 일손 부족도 신청 사유로 인정돼요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        이용 조건은 크게 세 가지예요. 첫째, 농번기(모내기·수확 등 집중 작업 시기), 둘째, 부상·질병·출산·장례 등으로 작업이 어려운 경우, 셋째, 기타 지자체에서 인정하는 특별한 사유예요. 농번기는 봄·가을이 주요 시기이고, 지역마다 지원 기간이 다를 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        이용료는 소득 수준에 따라 달라요. 기초생활수급자와 차상위계층은 무료로 이용할 수 있죠. 일반 농업인은 시간당 이용료의 일부를 자부담해야 하고, 나머지는 지자체에서 지원해요. 자부담 비율은 지역마다 다르기 때문에 신청 시 확인이 필요해요. 이용료가 부담되는 경우 담당자에게 미리 금액을 물어보면 예산 계획을 세우기 더 쉬워요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        아래 항목에 해당하면 신청 가능해요. 농번기에는 수요가 집중되므로 농작업 시작 2~3주 전에 미리 신청하는 게 좋아요. 지역에 따라 선착순으로 파견 인력이 배정되기 때문에 빠른 신청이 유리해요. 전년도에 이용 경험이 있더라도 매년 새로 신청해야 하고, 농업경영체 등록 확인서도 새로 제출해야 하는 경우도 있죠.
      </p>
      <EligibilityChecker items={CHECK_ITEMS} />

      <H2>얼마나 지원되나요?</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        도우미 1인당 일당 5만원을 정부가 지원해요. 연간 최대 90일까지 신청할 수 있죠. 도우미는 농업기술센터에서 모집한 인력풀에서 배정돼요.
      </p>
      <GreenBox>
        <strong>지원 내용</strong><br />
        일당 5만원 (정부 지원) · 연 최대 90일 · 출산/질병 시 우선 배정
      </GreenBox>

      <H2>신청 방법</H2>
      <p style={{ fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" }}>
        거주지 시군구 농업기술센터에 방문하거나 전화로 신청해요. 농업경영체 등록 확인서와 신분증이 필요하죠. 출산이나 질병 사유면 관련 증빙서류도 함께 제출해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        부상이나 질병 사유로 신청할 때는 의료기관에서 발급한 진단서 또는 입원 확인서를 함께 제출해요. 사유가 명확할수록 빠르게 파견 일정이 잡혀요. 출산 사유는 출생증명서 또는 산모수첩으로 대신할 수 있죠. 장례 사유는 사망진단서 또는 가족관계증명서로 증빙해요.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "20px" }}>
        신청 후 담당자가 검토하고 파견 가능 여부와 일정을 연락해요. 농번기에는 신청자가 많아 대기가 생길 수 있죠. 작업 예정일보다 2~3주 전에 신청하면 원하는 날짜에 지원받을 가능성이 높아요. 파견 일정이 확정되면 당일 도우미와 작업 시작 전 업무 내용을 확인하는 게 좋아요.
      </p>
      <DocTable docs={DOCS} />

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "16px" }}>영농도우미에 대해 자주 묻는 질문이에요.</p>
      <FAQ items={FAQ_ITEMS} />
      <References groups={[{ category: "출처", items: REFS }]} />
      <Disclaimer text="이 글은 공식 발표 기준으로 작성됐어요. 정책 내용은 변경될 수 있으니 신청 전 해당 기관에서 최신 내용을 확인하세요." />
    </div>
  );
}
