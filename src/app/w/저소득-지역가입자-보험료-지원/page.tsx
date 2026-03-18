"use client";
// Q1. 직장 없이 지역가입자인데 건강보험료가 부담되는 상황
// Q2. 보험료 50% 지원 자격 확인 → 국민건강보험공단에서 신청
// Q3. 소득 기준(연 336만원 이하), 지원 비율(50%), 신청 방법
// Q4. EligibilityChecker + Steps + FAQ

import { H2, EligibilityChecker, GreenBox, Steps, FAQ, References, Disclaimer } from "@/components/article-ui";

const p = { fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" } as const;

export default function Page() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: "16px" }}>
        <span style={{ color: "#1D9E75" }}>저소득 지역가입자 건강보험료 지원</span>
      </h1>
      <p style={p}>프리랜서나 자영업자로 일하다 보면 직장가입자에 비해 건강보험료가 꽤 무겁게 느껴지죠. 정부에서는 소득이 연 336만원 이하인 지역가입자를 대상으로 보험료 최대 50%를 지원하는 제도를 운영하고 있죠.</p>
      <p style={p}>단순히 보험료를 깎아주는 게 아니라 납부해야 할 금액에서 일정 비율을 차감해 주는 방식이에요. 소급 적용이 안 되니까 빨리 신청할수록 유리하죠.</p>
      <a href="https://www.nhis.or.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>건강보험공단에서 보험료 지원 신청하기 →</a>

      <H2>지원 자격 요건</H2>
      <p style={p}>직장건강보험 가입자나 피부양자는 해당되지 않고, 직접 보험료를 납부하는 지역가입자여야 해요. 소득 기준은 연 336만원 이하(월 28만원 이하)이고, 근로소득·사업소득·이자소득 등 모든 소득이 합산돼요.</p>
      <p style={p}>재산 기준도 충족해야 하죠. 토지·건물·주택 합계가 일정 금액 이하여야 하고, 1,600cc 이상 자동차 보유 시 제외될 수 있죠. 정확한 기준은 건강보험공단 지사(1577-1000)에 문의하는 게 가장 정확해요.</p>
      <EligibilityChecker
        items={[
          { id: "e1", label: "지역가입자로 건강보험에 가입되어 있죠" },
          { id: "e2", label: "연 소득이 336만원 이하(월 28만원 이하)예요" },
          { id: "e3", label: "재산이 기준 금액 이하이고 고가 자동차가 없어요" },
          { id: "e4", label: "다른 보험료 감면 혜택을 중복으로 받고 있지 않아요" },
        ]}
      />

      <H2>감면 금액과 기간</H2>
      <p style={p}>소득이 가장 낮은 구간은 보험료의 최대 50%까지 지원받을 수 있죠. 승인된 다음 달 보험료부터 바로 반영돼요. 이미 낸 보험료에는 소급 적용이 안 되니까 미리 신청하는 게 중요해요.</p>
      <p style={p}>지원 기간은 최초 승인 시점부터 1년이에요. 1년 후 소득·재산 변동을 재확인하고 재신청해야 지원이 이어지죠. 소득이 기준을 초과하면 자동 중단돼요.</p>
      <GreenBox>소득 기준 충족 시 보험료 최대 50% 감면. 1년 후 재신청 필요. 승인 다음 달부터 고지서에 자동 반영돼요.</GreenBox>

      <H2>신청 방법</H2>
      <p style={p}>국민건강보험공단 지사 방문, 홈페이지 온라인 신청, 전화(1577-1000) 세 가지 방법이 있죠. 소득금액증명원은 홈택스에서 무료 발급되고, 보험료 납부확인서는 건강보험공단 앱에서 바로 출력할 수 있죠.</p>
      <Steps
        steps={[
          { title: "자격 사전 확인", desc: "건강보험공단 홈페이지 또는 전화(1577-1000)로 소득·재산 기준 해당 여부를 먼저 파악해요." },
          { title: "서류 준비", desc: "소득금액증명원(홈택스), 건강보험료 납부확인서(공단 앱), 신분증을 준비해요." },
          { title: "신청서 제출", desc: "공단 지사 방문 또는 온라인으로 신청서와 서류를 제출해요." },
          { title: "감면 적용", desc: "심사(2~4주) 후 승인되면 다음 달 보험료부터 감면이 반영돼요." },
        ]}
      />
      <a href="https://www.nhis.or.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>건강보험공단에서 보험료 지원 신청하기 →</a>

      <H2>자주 묻는 질문</H2>
      <p style={{ ...p, marginBottom: "16px" }}>보험료 지원에 대해 자주 묻는 질문이에요.</p>
      <FAQ
        items={[
          { q: "소득 기준은 정확히 얼마인가요?", a: "연 소득 336만원 이하(월 28만원 이하)가 기준이에요. 사업소득, 근로소득, 금융소득 등 모든 소득을 합산해 계산하죠." },
          { q: "감면 기간이 끝나면 자동 연장되나요?", a: "자동 연장은 안 돼요. 1년 후 소득·재산 변동을 다시 확인하고 재신청해야 하죠. 소득이 기준을 넘으면 감면이 종료돼요." },
          { q: "직장을 잃고 지역가입자가 됐는데 바로 신청 가능한가요?", a: "퇴사 후 지역가입자로 전환된 경우 소득 기준을 충족하면 바로 신청할 수 있죠." },
        ]}
      />
      <References groups={[{ category: "출처", items: [{ label: "국민건강보험공단", url: "https://www.nhis.or.kr" }, { label: "복지로 보험료 경감 신청", url: "https://www.bokjiro.go.kr" }] }]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
