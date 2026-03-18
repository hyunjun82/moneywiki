"use client";
// Q1. 장애 자녀가 있는 부모가 수당을 받을 수 있는지, 얼마인지 알고 싶은 상황
// Q2. 장애아동수당 자격 확인 → 주민센터에서 신청
// Q3. 만 18세 미만 장애아동, 수급자/차상위 기준, 장애 정도별 금액(2~22만원)
// Q4. EligibilityChecker + GreenBox(금액표) + Steps + FAQ

import { H2, EligibilityChecker, GreenBox, Steps, FAQ, References, Disclaimer } from "@/components/article-ui";

const p = { fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" } as const;

export default function Page() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: "16px" }}>
        <span style={{ color: "#1D9E75" }}>장애아동수당 자격과 월 지급액</span>
      </h1>
      <p style={p}>장애 자녀를 키우는 가정에서는 의료비, 치료비, 특수교육비 등 일반 가정보다 훨씬 많은 지출이 생기죠. 장애아동수당은 저소득 가정의 만 18세 미만 장애아동에게 매달 일정 금액을 지급하는 복지 제도예요.</p>
      <p style={p}>기초생활수급자 가구 기준 중증(심한 장애) 아동은 월 22만원, 경증(심하지 않은 장애) 아동은 월 11만원을 받을 수 있죠. 장애인 등록이 완료된 상태라면 바로 신청이 가능해요.</p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>복지로에서 장애아동수당 신청하기 →</a>

      <H2>신청 자격 요건</H2>
      <p style={p}>만 18세 미만이어야 하고, 장애인 등록이 완료된 아동이어야 해요. 가구의 소득이 기초생활수급자 또는 차상위계층 기준에 해당해야 하죠. 일반 소득 가구는 대상에서 제외돼요.</p>
      <p style={p}>2019년 이후 장애 등급제가 폐지되면서 심한 장애(이전 1~2급)와 심하지 않은 장애(이전 3~6급)로 구분돼요. 아이의 장애 정도에 따라 수당 금액이 달라지니까 미리 파악해 두면 수월하죠.</p>
      <EligibilityChecker
        items={[
          { id: "e1", label: "만 18세 미만 장애아동이에요" },
          { id: "e2", label: "장애인 등록이 완료된 상태예요" },
          { id: "e3", label: "기초생활수급자 또는 차상위계층 가구에 해당해요" },
        ]}
      />

      <H2>장애 정도별 월 지급액</H2>
      <p style={p}>기초수급자 가구의 심한 장애 아동은 월 22만원, 심하지 않은 장애 아동은 월 11만원이에요. 차상위계층이라면 심한 장애 월 17만원, 심하지 않은 장애 월 11만원이 지급되죠.</p>
      <p style={p}>매달 20일에 지정 계좌로 입금돼요. 한 가구에 장애아동이 2명 이상이면 각각 별도로 수당을 받을 수 있죠. 소득 변동이 생기면 주민센터에 신고해야 과지급 환수를 피할 수 있죠.</p>
      <GreenBox>
        <strong>월 지급액</strong><br />
        기초수급자  심한 장애: 22만원 | 심하지 않은 장애: 11만원<br />
        차상위계층  심한 장애: 17만원 | 심하지 않은 장애: 11만원
      </GreenBox>

      <H2>신청 절차</H2>
      <p style={p}>보호자(부모 또는 법정 대리인)가 거주지 주민센터 방문 또는 복지로 온라인으로 신청하면 돼요. 장애인 등록이 안 된 상태라면 먼저 등록 절차를 밟아야 하는데, 주민센터에서 함께 안내받을 수 있죠.</p>
      <Steps
        steps={[
          { title: "장애인 등록 확인", desc: "아동의 장애인 등록이 완료되었는지 확인해요. 미등록이면 먼저 등록 절차를 진행해야 하죠." },
          { title: "소득 기준 확인", desc: "기초생활수급자 또는 차상위계층 해당 여부를 주민센터에서 상담받아요." },
          { title: "주민센터 방문 또는 복지로 신청", desc: "장애인등록증, 통장 사본, 수급자 증명서를 지참하고 신청서를 제출해요." },
          { title: "수당 지급 시작", desc: "심사 완료(2~4주) 후 매달 20일에 지정 계좌로 입금돼요." },
        ]}
      />

      <H2>만 18세 이후에는?</H2>
      <p style={p}>만 18세 생일이 속한 달까지 장애아동수당이 지급되고, 이후에는 자동 종료돼요. 중증 장애인이라면 <a href="/w/장애인연금" style={{ color: "#1D9E75" }}>장애인연금</a>(월 최대 42만원)으로 전환 신청할 수 있고, 경증이라면 <a href="/w/장애수당" style={{ color: "#1D9E75" }}>장애수당</a>(월 최대 6만원) 대상이 되죠.</p>
      <a href="https://www.bokjiro.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>복지로에서 장애아동수당 신청하기 →</a>

      <H2>자주 묻는 질문</H2>
      <p style={{ ...p, marginBottom: "16px" }}>장애아동수당에 대해 자주 묻는 질문이에요.</p>
      <FAQ
        items={[
          { q: "장애아동수당과 장애인연금은 다른 건가요?", a: "네, 완전히 다른 제도예요. 장애아동수당은 만 18세 미만 저소득 장애아동 대상이고, 장애인연금은 만 18세 이상 중증장애인 대상이에요." },
          { q: "중증과 경증은 어떻게 구분하나요?", a: "2019년부터 심한 장애(이전 1~2급)와 심하지 않은 장애(이전 3~6급)로 나뉘어요. 장애인 등록증에 표시되어 있죠." },
          { q: "부모가 기초수급자가 아니면 신청할 수 없나요?", a: "기초생활수급자 또는 차상위계층 가구에 해당해야 해요. 일반 가구는 대상이 아니지만, 의료비 지원 등 다른 제도를 활용할 수 있죠." },
        ]}
      />
      <References groups={[{ category: "출처", items: [{ label: "복지로 장애아동수당 신청", url: "https://www.bokjiro.go.kr" }, { label: "보건복지부 장애인 복지 안내", url: "https://www.mohw.go.kr" }] }]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
