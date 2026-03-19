"use client";
// Q1. 중증 장애인인데 연금을 받을 수 있는지, 기초연금과 뭐가 다른지 궁금한 상황
// Q2. 장애인연금 자격 확인 → 주민센터 또는 복지로에서 신청
// Q3. 중증장애인 기준, 소득 요건, 기초급여+부가급여 구조, 월 최대 42만원
// Q4. EligibilityChecker + GreenBox(급여 구조) + Steps + FAQ

import { H2, EligibilityChecker, GreenBox, Steps, FAQ, References, Disclaimer } from "@/components/article-ui";

const p = { fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" } as const;

export default function Page() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: "16px" }}>
        <span style={{ color: "#1D9E75" }}>장애인연금 자격과 월 최대 42만원</span>
      </h1>
      <p style={p}>중증 장애인(장애 정도가 심한)이라면 매월 최대 42만원까지 받을 수 있는 제도가 있죠. 장애인연금이에요. 기초급여와 부가급여 두 가지로 구성되어 있고, 국민연금 가입 여부와 상관없이 신청할 수 있죠.</p>
      <p style={p}><a href="/w/장애수당" style={{ color: "#1D9E75" }}>장애수당</a>(경증 대상, 월 최대 6만원)과는 완전히 다른 제도예요. 신청하지 않으면 소급 적용이 안 되니까 장애 판정을 받았다면 빠르게 움직이는 게 유리하죠.</p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>복지로에서 장애인연금 신청하기 →</a>

      <H2>신청 자격 세 가지</H2>
      <p style={p}>첫째, 장애인복지법에 따른 중증 장애인(장애 정도가 심한)이어야 해요. 둘째, 만 18세 이상이어야 하죠. 셋째, 소득인정액이 선정 기준액 이하여야 해요. 2024년 기준 단독 가구는 약 130만원, 부부 가구는 약 208만원 이하예요.</p>
      <p style={p}>만 65세가 되면 기초급여가 중단되고 기초연금으로 전환돼요. 자동 전환이 아니라 별도로 기초연금을 신청해야 하니까 65세 생일 3개월 전에 미리 준비해야 해요.</p>
      <EligibilityChecker
        items={[
          { id: "e1", label: "장애 정도가 심한 중증 장애인으로 등록되어 있죠" },
          { id: "e2", label: "만 18세 이상이에요" },
          { id: "e3", label: "소득인정액이 선정 기준액 이하예요" },
          { id: "e4", label: "만 65세 미만이에요 (65세 이상은 기초연금 전환)" },
        ]}
      />

      <H2>기초급여와 부가급여 금액</H2>
      <p style={p}>기초급여는 소득 보전 목적으로 2024년 기준 월 최대 약 34만원이에요. 부가급여는 수급 유형에 따라 월 2~8만원이 추가되죠. 기초수급자 재가 기준으로 두 급여를 합하면 월 최대 42만원까지 받을 수 있죠.</p>
      <p style={p}>시설 입소자는 기초급여 지급이 제한될 수 있죠. 시설에서 기본 생활비를 지원받기 때문이에요. 금액은 매년 1월 기준 중위소득 변동에 따라 조정되니까 해마다 달라질 수 있죠.</p>
      <GreenBox>기초수급자 재가: 월 최대 42만원 | 차상위: 최대 41만원 | 일반(기준 이하): 최대 36만원</GreenBox>

      <H2>신청 방법</H2>
      <p style={p}>거주지 읍면동 주민센터 방문 또는 복지로(bokjiro.go.kr) 온라인으로 신청하면 돼요. 거동이 불편하면 주민센터 담당자가 직접 방문해서 도와주는 서비스도 있죠.</p>
      <Steps
        steps={[
          { title: "장애 정도 확인", desc: "내 장애 정도가 심한(중증)인지 주민센터나 장애인 등록증으로 확인해요." },
          { title: "소득인정액 모의계산", desc: "복지로 모의계산 기능으로 선정 기준액 이하인지 미리 계산해 봐요." },
          { title: "주민센터 또는 복지로 신청", desc: "신분증, 장애인 등록증, 통장 사본을 지참하고 신청해요." },
          { title: "연금 지급 시작", desc: "소득·재산 조사(30일 이내) 후 다음 달부터 매월 계좌로 입금돼요." },
        ]}
      />

      <H2>65세 이후 기초연금 전환</H2>
      <p style={p}>만 65세가 되면 기초급여는 중단되고 기초연금으로 전환해야 해요. 부가급여는 65세 이후에도 계속 받을 수 있죠. 기초연금 금액이 장애인연금 기초급여보다 높을 수도 있으니 전환 시점에 담당자와 상담해 봐요.</p>
      <GreenBox>만 65세 도달 시 기초연금 별도 신청 필수 (자동 전환 안 됨). 부가급여는 계속 지급돼요.</GreenBox>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>복지로에서 장애인연금 신청하기 →</a>

      <H2>자주 묻는 질문</H2>
      <p style={{ ...p, marginBottom: "16px" }}>장애인연금에 대해 자주 묻는 질문이에요.</p>
      <FAQ
        items={[
          { q: "국민연금을 내고 있어도 장애인연금을 받을 수 있나요?", a: "국민연금 가입 여부와 별개로 신청할 수 있죠. 단, 국민연금 장애연금과 동시 수급 시 금액 조정이 될 수 있죠." },
          { q: "배우자 소득이 있으면 자격이 안 되나요?", a: "배우자 소득도 소득인정액에 포함돼요. 부부 합산 소득이 기준액을 초과하면 자격이 안 될 수 있죠." },
          { q: "시설에 입소해 있어도 신청할 수 있나요?", a: "신청은 가능하지만 시설 입소자는 기초급여 지급이 제한될 수 있죠. 시설에서 기본 생활을 지원받기 때문이에요." },
        ]}
      />
      <References groups={[{ category: "출처", items: [{ label: "복지로 장애인연금 신청", url: "https://www.bokjiro.go.kr" }, { label: "보건복지부 장애인연금 안내", url: "https://www.mohw.go.kr" }] }]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
