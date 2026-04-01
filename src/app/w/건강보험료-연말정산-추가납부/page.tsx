"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 4월 급여가 갑자기 적게 들어온 이유를 모르거나, 건강보험료 연말정산 고지서를 받은 상황
// Q2. 추가납부 금액 계산 확인 → 분할 납부 신청 여부 결정 → 환급이면 4월 급여에서 자동 수령
// Q3. 4월 정산 시점, 보수총액 기준 계산법(3.545%), 분할 납부 조건(3개월분 이상), 이직자 처리
// Q4. GreenBox(계산 예시) + BorderBox(보수총액 포함/제외 항목) + BorderBox(이직/퇴사자 처리) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DIVISION_STEPS = [
  { title: "4월 급여명세서에서 추가납부 금액 확인", description: "급여명세서에서 '건강보험 정산' 항목을 찾아요. 추가납부인지 환급인지 살펴봐요." },
  { title: "분할 납부 조건 확인 (3개월치 이상)", description: "추가납부금이 3개월치 보험료 이상이어야 분할 납부를 신청할 수 있어요. 3개월 미만이면 한꺼번에 납부해요." },
  { title: "급여담당자 또는 건보공단에 분할 신청", description: "회사 급여담당자에게 요청하거나 건강보험공단 고객센터(1577-1000)에 전화해서 최대 12개월 분할 납부를 신청해요." },
];

const FAQS = [
  {
    q: "건강보험료 연말정산은 언제 하나요?",
    a: "매년 4월이에요. 전년도 실제 소득을 기준으로 정산해서 4월 급여에 반영돼요. 별도로 신청할 필요 없고 자동으로 처리돼요.",
  },
  {
    q: "추가 납부 금액이 너무 커요. 나눠서 낼 수 있나요?",
    a: "추가 납부금이 3개월치 보험료 이상이면 최대 12개월까지 분할 납부할 수 있어요. 회사 급여담당자나 건강보험공단(1577-1000)에 요청하면 돼요.",
  },
  {
    q: "건보료 환급은 어떻게 받나요?",
    a: "4월 급여에 환급금이 포함돼서 자동으로 들어와요. 별도 신청 없어요. 퇴사자는 퇴사 정산 때 처리돼요.",
  },
  {
    q: "성과급도 보수총액에 포함되나요?",
    a: "네. 명절 상여금, 성과급, 연장근로수당은 보수총액에 포함돼요. 전년도에 성과급을 많이 받았으면 추가 납부가 나올 수 있어요.",
  },
  {
    q: "소득세 연말정산이랑 다른 건가요?",
    a: "네. 소득세 연말정산은 국세청이 담당하고 2~3월에 해요. 건보료 연말정산은 건강보험공단이 담당하고 4월에 해요. 둘 다 별개로 처리돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국민건강보험공단 - 보험료 정산 안내", url: "https://www.nhis.or.kr" },
      { label: "국민건강보험법", url: "https://www.law.go.kr/법령/국민건강보험법" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-환급금-지급일", title: "연말정산 환급금 지급일", description: "소득세 연말정산 환급 일정이에요." },
  { slug: "직장인-건강보험료율", title: "직장인 건강보험료율", description: "2026년 건강보험료율과 계산 방법이에요." },
  { slug: "소득세-환급금-조회", title: "소득세 환급금 조회", description: "홈택스에서 환급금 조회하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 건강보험 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건강보험료 연말정산 추가납부<br />
        4월에 왜 급여가 줄었는지 이유와 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        4월 급여가 갑자기 줄었죠? 건강보험료 연말정산 때문일 수 있어요.
        전년도 실제 소득이 예상보다 높으면 차액을 4월에 추가로 내요.
        낮으면 반대로 돌려받아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>건강보험료 연말정산이 뭔가요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/국민건강보험법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>국민건강보험법</a>에 따라 매년 4월에 하는 보험료 재계산이에요.
        매달 내는 건강보험료는 전전년도 소득 기준이에요.
        2026년에 내는 보험료는 2024년 소득 기준으로 계산한 거예요.
      </p>
      <p style={body}>
        2026년 4월이 되면 2025년 실제 소득으로 다시 계산해요. 2024년 소득 기준으로 낸 것보다 더 냈으면 환급, 덜 냈으면 추가 납부예요.
        소득세 연말정산과는 별개고, 건강보험공단이 따로 담당해요.
      </p>

      <GreenBox>
        <strong>추가납부 계산 예시</strong><br />
        <br />
        2025년 실제 보수총액: 6,000만원<br />
        기존 보수월액 기준 총액: 5,500만원<br />
        2026년 건강보험료율: 7.09% (근로자 부담: 3.545%)<br />
        <br />
        정산 보험료: 6,000만원 × 3.545% = 2,127,000원<br />
        이미 낸 보험료: 5,500만원 × 3.545% = 1,949,750원<br />
        <strong>추가 납부: 177,250원</strong><br />
        <br />
        ★ 연봉이 500만원 올랐으면 약 17만원 추가 납부예요.
      </GreenBox>

      <H2>보수총액에 포함되는 것과 제외되는 것</H2>
      <p style={body}>
        회사가 3월에 건강보험공단에 보수총액을 신고해요. 개인이 할 일은 없고, 4월 급여에 자동 반영돼요.
        보수총액이 무엇을 포함하는지 알면 왜 추가납부가 나왔는지 이해할 수 있어요.
      </p>

      <BorderBox>
        <strong>보수총액 기준</strong><br />
        <br />
        <strong>포함되는 것</strong><br />
        기본급, 명절 상여금·성과급, 연장근로수당, 비과세 한도 초과 식대·교통비<br />
        <br />
        <strong>제외되는 것</strong><br />
        비과세 식대(월 20만원까지), 비과세 자가운전보조금(월 20만원까지),<br />
        비과세 출산·보육수당(월 20만원까지), 퇴직금, 실업급여<br />
        <br />
        ★ 성과급을 많이 받은 해는 다음 해 4월에 추가납부가 클 수 있어요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>추가납부 부담스러우면 분할 납부하세요</H2>
      <p style={body}>
        추가납부금이 3개월치 보험료 이상이면 최대 12개월까지 나눠 낼 수 있어요.
        3개월 미만이면 분할 불가예요.
        환급받는 경우에는 4월 급여에 자동으로 포함되고 별도 신청 없어요.
      </p>

      <Steps steps={DIVISION_STEPS} />

      <H2>이직자와 퇴사자는 어떻게 처리되나요</H2>
      <BorderBox>
        <strong>이직자 처리</strong><br />
        전 직장과 현 직장에서 각각 보수총액 신고해요.<br />
        이직 후 첫 4월에는 전 직장 근무분만 정산돼요.<br />
        현 직장 근무분은 다음 해 4월에 정산돼요.<br />
        <br />
        <strong>퇴사자 처리</strong><br />
        퇴사 후 미취업이면 지역가입자로 전환돼요.<br />
        퇴사 시점에 정산이 완료돼서 마지막 급여에서 차감되거나 환급돼요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 국민건강보험법 기준으로 작성됐어요. 보험료율은 매년 변경될 수 있으니 건강보험공단에 살펴봐요." />
    </ArticleLayout>
  );
}
