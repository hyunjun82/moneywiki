"use client";

// Q1. 연말정산에서 추가납부가 나왔는데 한 번에 내기 부담스러운 직장인이에요.
// Q2. 분할납부 신청해서 3개월로 나눠 내는 행동.
// Q3. 분할납부 조건(10만원 초과), 이자 없음, 3개월 분할, 신청 방법(회사에 신청), 추가납부 원인.
// Q4. GreenBox(핵심 요약) + Steps(신청 절차) + BorderBox(원인 분석) + Checklist(예방 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "추가납부 금액 확인",
    desc: "지급명세서에서 차감징수세액이 플러스(+)이면 추가납부예요. 10만원 초과 시 분할납부를 신청할 수 있어요.",
  },
  {
    title: "회사 인사팀에 분할납부 신청",
    desc: "소득·세액공제 신고서에 분할납부를 표시하고 회사에 제출하면 돼요. 별도 서류는 필요 없어요.",
    tip: "연말정산 서류 제출 기간에 함께 신청하세요",
  },
  {
    title: "2월~4월 급여에서 분할 공제",
    desc: "추가납부 세금이 2월, 3월, 4월 급여에서 1/3씩 나눠서 빠져나가요. 이자가 붙지 않아서 원금만 내면 돼요.",
  },
];

const PREVENT_ITEMS = [
  "원천징수 비율을 100%나 120%로 올려놓기 (기본 80%)",
  "연금저축·IRP 납입해서 세액공제 늘리기",
  "신용카드보다 체크카드 비율 높이기 (공제율 차이)",
  "기부금, 의료비 영수증 빠짐없이 제출하기",
  "연말정산 미리보기 서비스로 11월에 미리 확인하기",
];

const FAQS = [
  {
    q: "분할납부하면 이자가 붙나요?",
    a: "아니에요. 연말정산 분할납부는 이자 없이 원금만 내면 돼요. 3개월로 나눠도 추가 비용이 전혀 없어요.",
  },
  {
    q: "10만원 이하면 분할납부 못 하나요?",
    a: "네. 추가납부 세액이 10만원 이하면 2월 급여에서 한 번에 빠져요. 10만원 초과부터 분할납부 신청 가능해요.",
  },
  {
    q: "회사가 분할납부를 거부할 수 있나요?",
    a: "법적으로 10만원 초과 시 근로자가 신청하면 회사는 분할 납부를 허용해야 해요. 소득세법 제137조에 명시된 근로자 권리예요.",
  },
  {
    q: "추가납부는 왜 발생하나요?",
    a: "원천징수 비율을 80%로 낮춰뒀거나, 성과급·상여금이 늘었거나, 작년보다 공제 항목이 줄었을 때 발생해요. 매달 세금을 적게 떼다가 연말에 정산하니까 부족분이 나오는 거예요.",
  },
  {
    q: "분할납부를 신청 안 하면 어떻게 되나요?",
    a: "2월 급여에서 한 번에 전액 공제돼요. 금액이 크면 2월 실수령액이 크게 줄어들 수 있으니 미리 신청하세요.",
  },
  {
    q: "중도 퇴사자도 분할납부가 되나요?",
    a: "퇴사하면 퇴직하는 달에 정산하기 때문에 분할납부가 어려워요. 퇴직 후 5월 종합소득세 신고 때 추가 공제를 적용해서 세금을 줄일 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "소득세법 제137조 — 근로소득세액의 연말정산", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 — 연말정산 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 연말정산 간소화", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-환급금-조회", title: "연말정산 환급금 조회", description: "환급금 조회 방법과 지급 시기예요." },
  { slug: "연말정산-공제항목", title: "연말정산 공제항목", description: "놓치기 쉬운 공제항목을 정리했어요." },
  { slug: "연말정산-연금저축", title: "연금저축 세액공제", description: "세액공제로 추가납부를 줄이는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 추가납부 · 분할</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 추가납부, 한 번에 내기 힘들다면?<br />
        3개월 분할납부 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산에서 "토해내야 한다"는 말 듣고 당황하셨죠.{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제137조</a>에
        따라 추가납부 세금이 10만원을 넘으면 2월~4월 급여에서 3개월로 나눠 낼 수 있어요. 이자도 없어요.
      </p>

      <Divider />

      <H2>분할납부, 이렇게 신청해요</H2>
      <p style={body}>
        회사에 신청만 하면 돼요. 복잡한 서류 없이 연말정산 서류 제출 때 함께 신청하세요.
      </p>

      <Steps steps={STEPS_DATA} />

      <GreenBox title="분할납부 핵심 정리">
        <strong>신청 조건</strong>: 추가납부 세액 10만원 초과<br />
        <strong>분할 기간</strong>: 2월~4월 (3개월)<br />
        <strong>이자</strong>: 없음 (원금만 납부)<br />
        <strong>신청 방법</strong>: 소득·세액공제 신고서에 분납 표시 후 회사 제출
      </GreenBox>

      <Divider />

      <H2>추가납부, 왜 나오는 걸까?</H2>
      <p style={body}>
        추가납부가 나오는 건 매달 원천징수한 세금이 실제 결정세액보다 적었기 때문이에요. 의도적으로 원천징수를 적게 한 게 아니라면 아래 원인을 확인하세요.
      </p>

      <BorderBox>
        <strong>주요 원인</strong><br /><br />
        1. <strong>원천징수 비율 80%</strong>: 매달 세금을 적게 떼니까 연말에 부족분이 나와요<br />
        2. <strong>성과급·상여금 증가</strong>: 소득이 늘었는데 공제는 그대로면 세금이 커져요<br />
        3. <strong>공제 항목 감소</strong>: 작년엔 있던 공제가 올해 빠지면 세금이 늘어요<br />
        4. <strong>맞벌이 공제 중복</strong>: 부부가 같은 항목을 중복 공제하면 추징돼요
      </BorderBox>

      <Divider />

      <H2>내년 추가납부 줄이려면?</H2>
      <p style={body}>
        올해 추가납부가 나왔다면 내년에는 미리 대비하세요. 원천징수 비율 조정이 가장 효과적이에요.
      </p>

      <Checklist items={PREVENT_ITEMS} />

      <p style={body}>
        특히{" "}
        <a href="/w/연말정산-연금저축" style={{ color: "#1D9E75", textDecoration: "underline" }}>연금저축</a>이나 IRP에 납입하면
        세액공제를 받아서 추가납부를 크게 줄일 수 있어요. 총급여 5,500만원 이하면 납입금의 16.5%를 돌려받아요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 소득세법 기준으로 작성됐어요. 구체적인 분할납부 절차는 회사 인사팀 또는 국세청(126)에 문의하세요." />
    </ArticleLayout>
  );
}
