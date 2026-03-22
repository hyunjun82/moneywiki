"use client";

// Q1. 회사에서 학자금 상환금이 빠지는데 ICL 원천공제가 뭔지, 신고는 어떻게 하는지 궁금
// Q2. ICL 원천공제 의무 이해 → 신고 방법 확인 → 납부 기한 준수
// Q3. ICL 원천공제 의무(사업주), 의무상환액 계산, 신고 기한(다음 달 10일), 미납 가산세
// Q4. GreenBox(핵심 정리) + Steps(신고 절차) + BorderBox(미납 시 불이익) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "의무상환액 통지서 확인", desc: "한국장학재단이 사업주에게 ICL 의무상환액 통지서를 보내요. 근로자별 공제액이 적혀 있어요." },
  { title: "급여에서 원천공제", desc: "매월 급여 지급 시 통지서에 명시된 금액을 공제해요." },
  { title: "원천공제 신고", desc: "다음 달 10일까지 세무서에 ICL 원천공제 신고서를 제출해요. 홈택스 전자신고 가능.", tip: "원천세 신고와 별도 서식" },
  { title: "납부", desc: "신고와 함께 공제한 금액을 국세청에 납부해요. 계좌이체·카드 가능." },
];

const FAQS = [
  { q: "ICL 원천공제는 꼭 해야 하나요?", a: "네, 의무상환액 통지를 받은 사업주는 반드시 원천공제해야 해요. 안 하면 사업주에게 가산세가 부과돼요." },
  { q: "의무상환액은 어떻게 정해지나요?", a: "연간 소득이 상환 기준소득을 넘으면 초과분의 일정 비율이 의무상환액이에요. 소득이 높을수록 상환액이 커져요." },
  { q: "퇴사하면 어떻게 되나요?", a: "퇴직하면 사업주의 원천공제 의무가 끝나요. 이후에는 본인이 직접 자발적으로 상환하거나, 새 직장에서 다시 원천공제돼요." },
  { q: "대출이 전액 상환되면 통지가 오나요?", a: "네, 한국장학재단이 상환 완료 통지를 사업주와 근로자에게 보내요. 이후 원천공제는 중단돼요." },
  { q: "근로자가 원천공제를 거부할 수 있나요?", a: "거부할 수 없어요. 법적 의무이기 때문에 근로자 동의 여부와 관계없이 공제돼요." },
];

const REFERENCES = [
  { category: "법령", items: [{ label: "취업 후 학자금 상환 특별법", url: "https://www.law.go.kr/법령/취업후학자금상환특별법" }] },
  { category: "기관", items: [
    { label: "한국장학재단 ICL", url: "https://www.kosaf.go.kr" },
    { label: "홈택스 원천세 신고", url: "https://www.hometax.go.kr" },
  ]},
];

const RELATED = [
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "원천세 신고 기한과 절차예요." },
  { slug: "연말정산-세액감면", title: "연말정산 세액감면", description: "연말정산 감면 항목 정리예요." },
  { slug: "월급-세금-공제-항목", title: "월급 세금 공제 항목", description: "급여에서 빠지는 항목들이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 학자금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        급여에서 학자금이 빠져나간다?<br />
        ICL 원천공제 신고 방법과 납부 기한
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급여명세서를 보니 ICL 상환금이 빠져 있어서 당황스럽죠.
        취업 후 학자금 상환(ICL)은 소득이 기준을 넘으면 회사가 급여에서 자동 공제하는 제도예요. 사업주 신고 의무도 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>ICL 원천공제가 이런 거예요</H2>
      <p style={body}>학자금 대출을 받은 사람이 취업 후 일정 소득이 넘으면 의무적으로 상환하는 제도예요.</p>
      <GreenBox>
        <strong>대상</strong>: 취업 후 학자금대출(ICL) 미상환자 중 연 소득이 상환 기준소득 초과<br />
        <strong>공제 주체</strong>: 사업주(회사)가 급여에서 원천공제<br />
        <strong>신고 기한</strong>: 공제한 달의 다음 달 10일까지<br />
        <strong>납부</strong>: 신고와 동시에 국세청 납부<br /><br />
        ★ 근로자 동의 불필요. 법적 의무 공제예요.
      </GreenBox>

      <H2>신고 절차 4단계</H2>
      <p style={body}>사업주(경리·인사 담당자)가 매월 처리해야 하는 절차예요.</p>
      <Steps steps={STEPS} />

      <H2>미납하면 이런 불이익이 있어요</H2>
      <p style={body}>사업주가 원천공제를 안 하거나 신고·납부를 안 하면 가산세가 붙어요.</p>
      <BorderBox>
        <strong>원천공제 미이행</strong>: 공제하지 않은 세액의 10% 가산세<br />
        <strong>신고 지연</strong>: 무신고 가산세 + 납부불성실 가산세<br />
        <strong>근로자 불이익</strong>: 원천공제 안 돼도 연말정산 시 추가 상환해야 할 수 있어요<br /><br />
        ★ 사업주 의무이므로 근로자가 피해를 볼 이유는 없어요. 회사에 확인하세요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 취업 후 학자금 상환 특별법 기준으로 작성됐어요. 상환 기준소득과 상환율은 매년 변경되니 한국장학재단에 확인하세요." />
    </ArticleLayout>
  );
}
