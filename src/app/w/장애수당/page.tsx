"use client";
// Q1. 장애인으로 등록됐는데 수당을 따로 신청해야 하는지, 얼마 받는지 모르는 상황
// Q2. 장애수당 자격 확인 → 주민센터 또는 복지로에서 신청
// Q3. 장애 정도 구분(심한/심하지 않은), 소득 요건(수급자/차상위), 월 지급액(3~6만원), 장애인연금과 차이
// Q4. EligibilityChecker(자격 체크) + GreenBox(장애수당 vs 연금 구분) + Steps(신청 절차) + FAQ

import { H2, EligibilityChecker, GreenBox, Steps, FAQ, References, Disclaimer } from "@/components/article-ui";

const p = { fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" } as const;

export default function Page() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: "16px" }}>
        <span style={{ color: "#1D9E75" }}>장애수당 신청 자격과 월 지급액</span>
      </h1>
      <p style={p}>장애인 등록이 되어 있어도 장애수당은 따로 신청해야 받을 수 있죠. 기초생활수급자나 차상위 계층인 경증 장애인에게 매월 3~6만원을 지급하는 제도예요. 신청하지 않으면 소급 적용이 안 되니까, 자격이 된다면 바로 움직이는 게 유리해요.</p>
      <p style={p}>중증 장애인(장애 정도가 심한)은 장애수당이 아니라 <a href="/w/장애인연금" style={{ color: "#1D9E75" }}>장애인연금</a> 대상이에요. 18세 미만이라면 <a href="/w/장애아동수당" style={{ color: "#1D9E75" }}>장애아동수당</a>을 신청해야 하고요. 나이와 장애 정도부터 먼저 파악해야 해요.</p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>복지로에서 장애수당 신청하기 →</a>

      <H2>신청 자격 두 가지</H2>
      <p style={p}>장애수당은 장애 등록과 소득 요건을 동시에 충족해야 받을 수 있죠. 장애인복지법에 따라 등록된 만 18세 이상 장애인이면서, 장애 정도가 심하지 않은(경증) 분이 대상이에요. 기초생활수급자 또는 차상위 계층(중위소득 50~100%)이어야 해요.</p>
      <p style={p}>2019년 장애 등급제 폐지 이후 기존 1~6급 대신 심한/심하지 않은으로 나뉘어요. 오래된 장애 등록증이라면 본인 구분을 주민센터에서 재확인해 봐요. 잘못된 구분으로 신청하면 반려될 수 있죠.</p>
      <EligibilityChecker
        items={[
          { id: "e1", label: "장애인복지법에 따라 장애인으로 등록되어 있죠" },
          { id: "e2", label: "만 18세 이상이에요" },
          { id: "e3", label: "기초생활수급자 또는 차상위 계층이에요" },
          { id: "e4", label: "장애 정도가 심하지 않은 장애인(경증)이에요" },
        ]}
      />

      <H2>월 얼마 받나요?</H2>
      <p style={p}>기초수급자 재가(가정 거주)는 월 6만원, 시설 입소자는 월 3만원이에요. 차상위 계층은 거주 형태와 무관하게 월 3만원이죠. 소액으로 보여도 연간 최대 72만원이에요.</p>
      <p style={p}>매월 신청자 명의 계좌로 입금되고, 소득이나 재산이 변동되면 주민센터에 신고 의무가 있죠. 지자체마다 추가 수당을 지급하는 곳도 있으니 거주 지역 구청 복지과에 문의해 봐요.</p>

      <H2>신청 절차</H2>
      <p style={p}>거주지 읍면동 주민센터 방문 또는 복지로(bokjiro.go.kr) 온라인으로 신청할 수 있죠. 대리 신청도 가능한데, 위임장과 신분증을 지참하면 가족이 대신 접수할 수 있죠.</p>
      <Steps
        steps={[
          { title: "장애 등록·정도 확인", desc: "복지로 또는 주민센터에서 장애 정도(심한/심하지 않은)를 확인해요." },
          { title: "소득 자격 자가 진단", desc: "복지로 모의계산 기능으로 수급 자격을 미리 계산해 봐요." },
          { title: "신청서 제출", desc: "주민센터 방문 또는 복지로 온라인 신청. 신분증과 통장 사본을 지참해요." },
          { title: "수당 지급 시작", desc: "소득·재산 조사(30일 이내) 후 다음 달부터 매월 계좌로 입금돼요." },
        ]}
      />

      <H2>장애수당 vs 장애인연금 차이</H2>
      <p style={p}>둘 다 저소득 장애인 대상이지만 장애 정도와 금액이 완전히 달라요. 중증(심한 장애)은 장애인연금(월 최대 42만원), 경증(심하지 않은 장애)은 장애수당(월 최대 6만원)이에요. 두 제도를 동시에 받을 수는 없죠.</p>
      <GreenBox>장애 정도 심함 → 장애인연금 | 심하지 않음 → 장애수당 | 18세 미만 → 장애아동수당</GreenBox>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>복지로에서 장애수당 신청하기 →</a>

      <H2>자주 묻는 질문</H2>
      <p style={{ ...p, marginBottom: "16px" }}>장애수당에 대해 자주 묻는 질문이에요.</p>
      <FAQ
        items={[
          { q: "65세 이상 장애인도 장애수당을 받을 수 있나요?", a: "받을 수 있죠. 65세 이상이면 장애수당과 기초연금을 동시에 받는 것도 가능해요." },
          { q: "소득이 늘어서 차상위 기준을 넘으면 어떻게 되나요?", a: "소득인정액이 기준을 초과하면 지급이 중단돼요. 소득 변동이 생기면 주민센터에 신고해야 하죠." },
          { q: "가족이 대신 신청해도 되나요?", a: "위임장과 신분증을 지참하면 가족이 대리 신청할 수 있죠. 복지로 온라인은 본인 인증이 필요해요." },
        ]}
      />
      <References groups={[{ category: "출처", items: [{ label: "복지로 장애수당 신청", url: "https://www.bokjiro.go.kr" }, { label: "보건복지부 장애수당 안내", url: "https://www.mohw.go.kr" }] }]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
