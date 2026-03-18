"use client";
// Q1. 농업인인데 공익직불금을 어떻게 신청하는지, 얼마 받는지 모르는 상황
// Q2. 농업경영체 등록 확인 → 농업기술센터에서 신청
// Q3. 농업경영체 등록 요건, 면적별 지급 단가(ha당 100~205만원), 준수사항 7가지
// Q4. EligibilityChecker + GreenBox(지급 단가표) + Steps + FAQ

import { H2, EligibilityChecker, GreenBox, Steps, FAQ, References, Disclaimer } from "@/components/article-ui";

const p = { fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" } as const;

export default function Page() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: "16px" }}>
        <span style={{ color: "#1D9E75" }}>기본형 공익직불제 신청과 지급 단가</span>
      </h1>
      <p style={p}>논밭을 직접 경작하는 농업인이라면 매년 2~5월에 신청만 하면 면적에 따라 수십만~수백만 원을 받을 수 있죠. 기본형 공익직불제는 환경 보전과 농촌 유지에 기여하는 농업인에게 정부가 직접 지급하는 직불금이에요.</p>
      <p style={p}>소득과 무관하게 농업경영체 등록만 되어 있으면 신청 가능하죠. 신청 기간(2~5월)을 놓치면 다음 해까지 기다려야 하니까, 조건이 된다면 빨리 접수하는 게 좋아요.</p>
      <a href="https://www.gov.kr/portal/service/serviceInfo/SD0000052052" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>정부24에서 공익직불제 신청하기 →</a>

      <H2>신청 자격 요건</H2>
      <p style={p}>국립농산물품질관리원에 농업경영체 등록이 되어 있어야 해요. 신청 농지가 본인 소유 또는 임차 중이어야 하고, 직전 3년 중 1년 이상 농업에 종사한 이력이 필요하죠. 최소 면적은 0.1ha 이상이에요.</p>
      <p style={p}>임차 농지도 실경작자가 신청하는 구조예요. 임대인이 아니라 실제 경작하는 사람이 신청해야 하고, 서면 임차 계약서가 필요할 수 있죠.</p>
      <EligibilityChecker
        items={[
          { id: "e1", label: "농업경영체에 등록되어 있죠" },
          { id: "e2", label: "신청 농지가 본인 소유 또는 임차 중이에요" },
          { id: "e3", label: "직전 3년 중 1년 이상 농업에 종사했어요" },
          { id: "e4", label: "신청 면적이 0.1ha 이상이에요" },
        ]}
      />

      <H2>지급 단가와 금액</H2>
      <p style={p}>0.5ha 미만 소농은 면적과 무관하게 연 120만원 정액을 받아요. 0.5ha 이상이면 면적 기준 단가가 적용되는데, 논은 ha당 약 178만원, 밭은 약 136만원 수준이죠. 농가당 최대 6ha까지만 계산돼요.</p>
      <GreenBox>
        <strong>지급 단가</strong><br />
        소농(0.5ha 미만): 연 120만원 정액<br />
        논: ha당 약 178만원 | 밭: ha당 약 136만원<br />
        상한: 농가당 최대 6ha
      </GreenBox>

      <H2>신청 절차</H2>
      <p style={p}>신청 기간은 매년 2~5월이에요. 거주지 읍면동 주민센터 또는 농업경영체 등록정보 포털(agrix.go.kr)에서 온라인으로도 가능하죠. 이행 조건(농약 기록부, 농지 원형 유지 등)을 위반하면 직불금이 환수될 수 있으니 꼭 지켜야 해요.</p>
      <Steps
        steps={[
          { title: "농업경영체 등록 확인", desc: "등록 정보가 현재 경작 농지와 일치하는지 확인해요. 미등록이면 먼저 등록이 필요하죠." },
          { title: "주민센터 방문 또는 온라인 신청", desc: "신분증, 농지 목록, 임차 계약서(임차 시)를 지참하고 2~5월 안에 접수해요." },
          { title: "이행 조건 준수", desc: "농약 기록부 작성, 농지 원형 유지 등 준수사항을 지켜요. 위반 시 환수 처분을 받아요." },
          { title: "직불금 수령", desc: "심사 후 연말 또는 다음 해 초에 신청 계좌로 지급돼요." },
        ]}
      />

      <H2>신청 시 주의할 점</H2>
      <p style={p}>가장 흔한 반려 사유는 농업경영체 등록 정보가 실제 경작 농지와 다른 경우예요. 팔았거나 임차가 끝난 농지가 등록에 남아 있으면 신청 자체가 안 되죠. 신청 전에 등록 정보를 먼저 업데이트해야 해요.</p>
      <p style={p}>부부 공동 소유 농지는 실제 경작자 중 1명만 신청할 수 있죠. 2명이 동시에 신청하면 반려되니까 미리 정해두고 진행해야 해요.</p>
      <a href="https://www.gov.kr/portal/service/serviceInfo/SD0000052052" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>정부24에서 공익직불제 신청하기 →</a>

      <H2>자주 묻는 질문</H2>
      <p style={{ ...p, marginBottom: "16px" }}>공익직불제에 대해 자주 묻는 질문이에요.</p>
      <FAQ
        items={[
          { q: "농지가 0.05ha밖에 없는데 신청 가능한가요?", a: "소농 직불금은 0.5ha 미만도 가능하지만 최소 0.1ha 이상이어야 해요. 0.05ha는 대상이 아니에요." },
          { q: "임대인이 직접 신청하면 어떻게 되나요?", a: "실제 경작자가 신청 자격을 가져요. 임대인이 신청하려면 본인이 직접 경작하고 있어야 하죠." },
          { q: "처음 신청하는데 절차가 다른가요?", a: "절차는 동일해요. 다만 신규 신청 시 담당자가 현장 확인을 나올 수 있죠." },
        ]}
      />
      <References groups={[{ category: "출처", items: [{ label: "농림축산식품부 공익직불제 안내", url: "https://www.mafra.go.kr" }, { label: "정부24 기본형 공익직불금 신청", url: "https://www.gov.kr/portal/service/serviceInfo/SD0000052052" }] }]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
