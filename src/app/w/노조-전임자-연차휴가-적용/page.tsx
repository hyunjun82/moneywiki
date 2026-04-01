"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 노조 전임자로 활동 중인데 연차휴가를 받을 수 있는지, 어디에 청구하는지 모르는 상황
// Q2. 전임자 연차휴가 발생 여부를 확인하고, 회사에 연차를 청구한다
// Q3. 근로관계 유지→연차 발생, 출근율 인정, 청구 대상(회사), 복귀 후 미사용 연차 처리
// Q4. GreenBox(결론) + BorderBox(발생 기준) + 인라인 테이블(처리 방식) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
} from "@/components/article-ui";

const FAQS = [
  { q: "노조 전임자도 연차휴가가 발생하나요?", a: "네, 발생해요. 전임기간에도 근로관계가 유지되니까 근로기준법 제60조에 따라 연차유급휴가가 발생해요. 1년 근무 후 15일이 기본이고, 3년차부터 2년마다 1일씩 가산돼요." },
  { q: "전임기간은 출근으로 인정되나요?", a: "네, 인정돼요. 고용노동부 행정해석에 따르면 전임기간은 출근한 것으로 봐서 출근율 계산에 포함돼요. 80% 이상 출근 요건을 충족하는 거예요." },
  { q: "연차는 누구에게 청구하나요?", a: "회사에 청구해요. 연차유급휴가는 사용자가 부여하는 거니까요. 다만 노조 업무를 수행하는 중이라 노조와도 협의가 필요할 수 있어요." },
  { q: "전임 중 연차를 못 쓰면 수당으로 받을 수 있나요?", a: "논란이 있어요. 고용노동부 행정해석에 따르면 전임자는 실제 근로를 제공하지 않으므로 연차 미사용 수당 지급 의무가 없다는 해석이 있어요. 단체협약에서 별도로 정한 경우는 예외예요." },
  { q: "복귀 후 미사용 연차는 어떻게 되나요?", a: "복귀 후에는 전임기간을 포함한 총 근속기간을 기준으로 연차가 계산돼요. 사용기간이 지난 연차는 단체협약이나 취업규칙에 따라 수당으로 정산받을 수 있어요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "근로기준법 제60조 (연차유급휴가)", url: "https://www.law.go.kr/법령/근로기준법" },
    { label: "노동조합 및 노동관계조정법", url: "https://www.law.go.kr/법령/노동조합및노동관계조정법" },
  ]},
  { category: "정부 안내", items: [
    { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동조합 · 연차휴가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        노조 전임자도 연차휴가를 받을 수 있나요?<br />
        발생 기준과 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        노조 전임으로 활동하고 있는데 연차휴가는 어떻게 되는지 궁금하시죠?
      </p>
      <p style={body}>
        결론부터 말하면, <strong>노조 전임자도 연차휴가가 발생</strong>해요.
        전임기간에도 근로관계는 유지되니까 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제60조</a>에 따라 연차유급휴가가 생기는 거예요.
      </p>

      <Divider />

      <H2>전임기간도 근로관계가 유지돼요</H2>
      <p style={body}>
        노조 전임자는 회사 업무에서 벗어나 노조 활동에 전념하지만, 근로계약 자체는 끊어지지 않아요.
        근로관계가 유지되는 한 근속연수도 계속 쌓이고, 연차휴가도 발생하죠.
      </p>

      <GreenBox title="핵심 포인트">
        {"· 노조 전임자 = 근로관계 유지 → 연차휴가 발생\n· 전임기간 = 출근으로 인정 (출근율 80% 충족)\n· 연차 청구 대상 = 회사 (노조와 협의 필요)\n· 전임 전 발생한 연차도 유효해요"}
      </GreenBox>

      <Divider />

      <H2>출근율 계산에서 전임기간은 어떻게 처리되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>은 1년간 80% 이상 출근한 근로자에게 15일의 연차휴가를 부여하도록 규정하고 있어요.
        전임기간은 <strong>출근한 것으로 인정</strong>돼요.
      </p>

      <BorderBox>
        <strong>연차휴가 발생 기준</strong>{"\n"}
        {"· 전임기간 1년 = 출근율 80% 이상 충족 → 연차 15일 발생\n· 3년차부터 2년마다 1일 가산 (최대 25일)\n· 전임 전에 이미 발생한 연차도 소멸하지 않아요\n· 법 명시는 아니지만 고용노동부 행정해석과 판례에서 인정"}
      </BorderBox>

      <Divider />

      <H2>연차 사용과 수당 청구는 어떻게 하나요?</H2>
      <p style={body}>
        연차는 <strong>회사에 청구</strong>해요. 노조 전임자라도 연차유급휴가의 부여 주체는 사용자(회사)니까요.
        다만 노조 업무를 수행하는 중이라 노조에도 알리는 게 실무적으로 일반적이에요.
      </p>

      <SectionBadge>전임자 연차 처리 방식</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>처리 방식</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["전임 중 연차 사용", "회사에 청구 (노조에도 알림)"],
              ["전임 중 미사용 연차 수당", "행정해석상 지급 의무 없음 (단체협약 예외)"],
              ["복귀 후 미사용 연차", "사용 가능 또는 수당 정산"],
              ["복귀 후 연차 계산", "전임기간 포함 총 근속연수 기준"],
            ].map(([label, method], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px" }}>{method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        연차 미사용 수당은 논란이 있어요. 고용노동부 행정해석에 따르면 전임자는 실제 근로를 제공하지 않으므로 수당 지급 의무가 없다는 입장이에요. 하지만 단체협약에서 별도로 정했다면 그 내용이 우선해요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 고용노동부 행정해석에 따라 작성됐어요. 단체협약 내용에 따라 달라질 수 있으니 노무사에게 상담받으세요." />
    </div>
  );
}
