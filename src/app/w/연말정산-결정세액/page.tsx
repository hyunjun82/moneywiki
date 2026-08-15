"use client";
// Q1. 연말정산 원천징수영수증을 받았는데 결정세액이 뭔지 모르겠고 환급금과 뭐가 다른지 궁금한 상황
// Q2. 결정세액 계산 구조를 이해하고, 결정세액과 기납부세액 차이로 환급/추가납부를 판단한다
// Q3. 계산 흐름(총급여→과세표준→산출세액→결정세액→환급), 세율 구간, 결정세액 0원 의미, 확인 방법
// Q4. GreenBox(계산 흐름) + 세율 테이블 + BorderBox(예시) + Steps(확인 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const CONFIRM_STEPS = [
  {
    title: "원천징수영수증에서 찾아보세요",
    desc: "회사에서 연말정산이 끝나면 2~3월에 원천징수영수증을 발급해 줘요. 영수증 하단에 '결정세액' 항목이 있어요. 바로 옆에 '기납부세액'과 '차감징수세액(환급 또는 추가납부)'도 함께 나와요.",
  },
  {
    title: "홈택스에서도 확인할 수 있어요",
    desc: "홈택스(hometax.go.kr) 로그인 → My 홈택스 → 지급명세서 등 제출내역에서 원천징수영수증 PDF를 볼 수 있어요. 회사에서 영수증을 안 줬거나 분실했을 때 유용해요.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "결정세액이 높으면 경정청구를 고려하세요",
    desc: "빠뜨린 공제 항목이 있으면 5년 이내에 경정청구로 돌려받을 수 있어요. 홈택스에서 온라인으로 신청 가능해요. 의료비, 교육비, 기부금 영수증을 놓치는 경우가 가장 많아요.",
  },
];

const FAQS = [
  {
    q: "결정세액이 0원이면 세금을 안 내도 되나요?",
    a: "맞아요. 결정세액 0원은 1년간 낼 세금이 없다는 뜻이에요. 세액공제가 산출세액보다 크면 0원이 되고, 이미 매월 원천징수로 낸 세금은 전액 환급돼요.",
  },
  {
    q: "결정세액이 마이너스가 될 수 있나요?",
    a: "안 돼요. 결정세액은 최소 0원이에요. 세액공제가 산출세액보다 많아도 0원에서 멈추지 마이너스로 내려가지 않아요. 초과된 세액공제는 사라져요.",
  },
  {
    q: "결정세액과 환급금은 어떤 관계인가요?",
    a: "환급금 = 기납부세액(매월 원천징수한 세금 합계) - 결정세액이에요. 결정세액이 낮을수록 환급금이 많아지고, 결정세액이 기납부세액보다 크면 추가 납부해야 해요.",
  },
  {
    q: "연봉이 같은데 왜 동료보다 환급금이 적을까요?",
    a: "세액공제와 소득공제 적용액이 다르기 때문이에요. 부양가족 수, 의료비·교육비 지출액, 신용카드 사용액, 기부금 등에 따라 결정세액이 달라지고, 환급금도 달라져요.",
  },
  {
    q: "결정세액을 줄이려면 뭘 해야 하나요?",
    a: "세액공제를 최대한 활용하세요. 연금저축(16.5%/13.2%), 의료비(15%), 교육비(15%), 기부금(15~30%) 등이에요. 소득공제(신용카드, 인적공제)도 과세표준을 낮춰서 산출세액 자체를 줄여 줘요.",
  },
  {
    q: "연말정산을 안 했으면 어떻게 하나요?",
    a: "5월 종합소득세 신고 때 직접 할 수 있어요. 홈택스에서 근로소득 신고를 선택하고 공제 항목을 적용하면 돼요. 환급금이 있으면 신고 후 1~2개월 내에 입금돼요.",
  },
];

const RELATED = [
  { slug: "연말정산-기본공제-대상", title: "기본공제 대상과 요건", description: "1인당 150만원 소득공제 요건 정리." },
  { slug: "연말정산-의료비-공제-한도", title: "의료비 공제 한도", description: "총급여 3% 초과분부터 15% 세액공제." },
  { slug: "연말정산-자주-묻는-질문", title: "연말정산 자주 묻는 질문", description: "매년 반복되는 궁금증 10가지." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 세액 계산 · 환급금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 결정세액이 뭔가요?<br />
        계산 방법과 환급금 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "원천징수영수증에 결정세액이라고 적혀 있는데, 이게 내가 돌려받는 돈인가요?"
      </p>
      <p style={body}>
        결정세액은 <strong>1년간 실제로 내야 할 최종 세금</strong>이에요. 환급금이 아니에요.
        환급금은 이미 낸 세금(기납부세액)에서 결정세액을 뺀 차액이에요. 결정세액이 낮을수록 환급금이 많아지는 구조예요.
      </p>

      <Divider />

      <H2>결정세액은 이렇게 계산돼요</H2>
      <p style={body}>
        연말정산 세액 계산은 4단계로 진행돼요. 총급여에서 출발해서 최종 결정세액까지 하나씩 빼 나가는 구조예요.
      </p>

      <GreenBox>
        연말정산 세액 계산 흐름{"\n"}
        총급여 - 근로소득공제 = 근로소득금액{"\n"}
        근로소득금액 - 소득공제(인적·신용카드 등) = 과세표준{"\n"}
        과세표준 x 세율 = 산출세액{"\n"}
        산출세액 - 세액공제(의료비·교육비 등) = 결정세액{"\n"}
        기납부세액 - 결정세액 = 환급금(양수) 또는 추가납부(음수)
      </GreenBox>

      <p style={body}>
        소득공제는 과세표준을 줄여서 적용 세율 자체를 낮추는 효과가 있고, 세액공제는 세금에서 직접 빼 주는 거예요.
        <a href="/w/연말정산-기본공제-대상" style={{ color: "#1D9E75", textDecoration: "underline" }}>기본공제</a>는 소득공제고, 의료비·교육비는 세액공제예요.
      </p>

      <CategoryButton label="연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>과세표준에 적용되는 세율 구간이에요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 과세표준이 높을수록 높은 세율이 적용되는 누진세 구조예요. 구간별로 다른 세율이 적용돼요.
      </p>

      <SectionBadge>2025년 귀속 소득세율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>과세표준</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>누진공제</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1,400만원 이하", "6%", "—"],
              ["1,400만~5,000만원", "15%", "126만원"],
              ["5,000만~8,800만원", "24%", "576만원"],
              ["8,800만~1.5억원", "35%", "1,544만원"],
              ["1.5억~3억원", "38%", "1,994만원"],
              ["3억~5억원", "40%", "2,594만원"],
              ["5억~10억원", "42%", "3,594만원"],
              ["10억원 초과", "45%", "6,594만원"],
            ].map(([bracket, rate, deduction], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{bracket}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{deduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>총급여 5,000만원이면 결정세액이 얼마일까요?</H2>
      <p style={body}>
        구체적인 숫자로 봐야 감이 오죠. 총급여 5,000만원, 4인 가족, 세액공제 120만원을 가정한 예시예요.
      </p>

      <BorderBox>
        <strong>계산 예시 (총급여 5,000만원)</strong>{"\n"}
        · 근로소득공제 후 → 근로소득금액 약 3,750만원{"\n"}
        · 인적공제(4인 × 150만원) 등 소득공제 → 과세표준 약 3,000만원{"\n"}
        · 세율 적용: 1,400만 × 6% + 1,600만 × 15% = 84만 + 240만 = 324만원(산출세액){"\n"}
        · 세액공제 120만원 차감 → 결정세액 204만원{"\n"}
        · 기납부세액 240만원 → 환급금 36만원
      </BorderBox>

      <p style={body}>
        같은 연봉이라도 부양가족 수, 의료비·교육비 지출, 신용카드 사용액에 따라 결정세액이 크게 달라져요.
        <a href="/w/연말정산-의료비-공제-한도" style={{ color: "#1D9E75", textDecoration: "underline" }}>의료비 공제</a>나 연금저축 세액공제를 놓치면 결정세액이 그만큼 올라가요.
      </p>

      <Divider />

      <H2>결정세액은 어디서 확인하나요?</H2>
      <p style={body}>
        원천징수영수증이 가장 정확한 확인 방법이에요. 회사에서 안 줬거나 분실했으면 홈택스에서 직접 조회할 수 있어요.
      </p>

      <Steps steps={CONFIRM_STEPS} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        <a href="https://www.nts.go.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>국세청</a>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>소득세법</a>
        <a href="https://www.hometax.go.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>홈택스</a>
      </div>

      <Disclaimer text="이 글은 2025년 귀속(2026년 신고) 기준으로 작성됐어요. 세법 개정에 따라 세율이나 공제 한도가 달라질 수 있어요." />
    </ArticleLayout>
  );
}
