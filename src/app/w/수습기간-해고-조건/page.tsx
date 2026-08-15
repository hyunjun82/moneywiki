"use client";
// Q1. 수습기간에 해고 통보를 받았거나, 수습 중인데 해고될까 불안한 상황이에요.
// Q2. 본인의 해고가 부당한지 판단하고, 부당하다면 노동위원회에 구제신청을 하는 행동.
// Q3. 수습기간도 정당 사유 필요, 3개월 기준(예고수당 면제 vs 지급), 정당한 사유의 기준(객관적 평가), 부당해고 시 구제신청 절차와 보상금.
// Q4. EligibilityChecker(부당해고 판단) + Steps(구제신청 절차) + GreenBox(핵심 기준) + BorderBox(3개월 기준 차이) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "해고 사유를 구체적으로 서면 통보받지 못했다" },
  { id: "c2", label: "업무 평가 기록이나 피드백 없이 갑자기 해고됐다" },
  { id: "c3", label: "교육·개선 기회를 받지 못했다" },
  { id: "c4", label: "5인 이상 사업장에서 근무했다" },
  { id: "c5", label: "해고일로부터 아직 3개월이 지나지 않았다" },
];

const RELIEF_STEPS = [
  { title: "증거 확보", desc: "해고 통보서, 근로계약서, 급여명세서, 업무 이메일·메시지를 모아요. 구두 통보였다면 문자로 \"해고 통보 맞나요? 사유가 뭔가요?\"라고 확인 요청하세요.", tip: "회사 컴퓨터 접근이 막히기 전에 서둘러야 해요" },
  { title: "관할 노동위원회 확인", desc: "고용노동부(moel.go.kr)에서 지역별 지방노동위원회 연락처를 찾아요. 전화로 상담부터 받는 게 좋아요." },
  { title: "구제신청서 작성·제출", desc: "노동위원회 홈페이지에서 양식을 다운로드해요. 해고 경위, 부당한 이유, 요청 사항을 자세히 적어요. 수수료 없고 변호사 없이도 가능해요." },
  { title: "심리·결정 (2~3개월)", desc: "노동위원회에서 조사를 시작해요. 회사가 해고의 정당성을 입증해야 하고, 근로자는 부당함을 주장하면 돼요.", tip: "해고일로부터 3개월 이내에 반드시 신청해야 해요" },
];

const FAQS = [
  { q: "수습기간에는 아무 이유 없이 해고할 수 있나요?", a: "아니에요. 수습기간에도 정당한 사유가 필요해요. '마음에 안 든다', '성격이 안 맞다' 같은 이유로는 부당해고로 인정돼요. 5인 이상 사업장이면 근로기준법 제23조가 동일하게 적용돼요." },
  { q: "수습 3개월 마지막 날 해고하면 예고수당 안 줘도 되나요?", a: "맞아요. 수습 시작일로부터 3개월 이내 해고는 해고예고수당 지급 의무가 면제돼요. 하지만 예고수당 면제와 자유롭게 해고할 수 있는 건 완전히 다른 얘기예요." },
  { q: "부당해고로 인정되면 얼마 받을 수 있나요?", a: "원직 복직이 원칙이에요. 복직이 어려우면 해고 기간 동안의 임금 상당액을 최대 1년분까지 보상금으로 받을 수 있어요. 월급 250만원이면 최대 3,000만원이에요." },
  { q: "4인 이하 소규모 사업장이면 어떻게 되나요?", a: "상시 근로자 4인 이하 사업장에서는 근로기준법 해고 제한 규정이 적용되지 않아요. 해고예고 의무는 있지만, 정당한 사유 없는 해고에 대한 보호가 약해요." },
  { q: "구제신청에 비용이 드나요?", a: "신청 수수료가 없어요. 변호사 선임 없이도 신청 가능해요. 물론 변호사가 있으면 더 유리하지만 필수는 아니에요." },
  { q: "\"능력 부족\"이라고 하면 정당한 사유가 되나요?", a: "그것만으로는 부족해요. 구체적인 평가 자료(실적 데이터, 오류율 등)가 있어야 하고, 교육과 개선 기회를 줬어야 해요. 한 번도 피드백 없이 갑자기 자르면 부당해고로 인정될 가능성이 높아요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "근로기준법 (법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 부당해고 구제", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급조건", title: "실업급여 받을 수 있는 조건", description: "해고 후 실업급여를 받으려면 어떤 조건이 필요한지 확인해보세요." },
  { slug: "퇴직금-미지급-신고-처벌-지연이자", title: "퇴직금 안 주면 신고하는 방법", description: "해고 후 퇴직금까지 안 주면 어떻게 대응해야 하는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 해고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        수습기간 해고, 마음대로 못 해요<br />
        부당해고 기준과 구제신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        입사한 지 한 달 됐는데 갑자기 "오늘까지만 나오세요" 통보받으셨나요?
        "수습이니까 마음대로 자를 수 있는 거 아냐?" 생각하시는 분이 많은데, 법적으로 전혀 그렇지 않아요.
        <a href="https://www.law.go.kr/법령/근로기준법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제23조</a>에서 정당한 이유 없는 해고를 금지하고 있고, 수습기간도 동일하게 보호받아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>내 해고가 부당한지 판단해보세요</H2>
      <p style={body}>
        수습기간의 의미는 근로자의 업무 적합성을 평가하는 기간이에요.
        평가 결과 정당한 사유가 있으면 해고할 수 있지만, 막연한 이유로는 안 돼요.
        아래 항목 중 해당하는 게 있다면 부당해고 가능성이 높아요.
      </p>

      <SectionBadge>부당해고 가능성 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="부당해고 가능성이 높아요. 노동위원회에 구제신청을 검토해보세요." partialMatchText="일부 해당해요. 고용노동부(1350)에 전화로 상담받아보세요." />

      <p style={body}>
        실제로 법원 판례를 보면 "능력 부족", "적응 실패"라는 이유만으로는 정당성을 인정받지 못한 사례가 많아요.
        구체적인 평가 기록이 있어야 하고, 교육과 개선 기회를 줬어야 해요.
      </p>

      <Divider />

      <H2>수습 3개월, 왜 중요한 기준인가요?</H2>
      <p style={body}>
        3개월을 기준으로 해고예고수당 지급 의무가 달라져요.
        많은 회사가 이 부분을 오해해서 "3개월 안에는 자유롭게 자를 수 있다"고 착각하는데, 법적으로 완전히 틀려요.
      </p>

      <SectionBadge>3개월 기준 비교</SectionBadge>
      <BorderBox title="수습 3개월 전후 차이">
        <p style={{ ...body, marginBottom: 8 }}><strong>3개월 이내 해고</strong></p>
        <p style={{ ...body, marginBottom: 8 }}>해고예고수당 면제 (30일 전 통보 불필요). 하지만 정당한 사유 없으면 여전히 부당해고예요.</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>3개월 초과 후 해고</strong></p>
        <p style={{ ...body, marginBottom: 0 }}>30일 전 예고 또는 평균임금 30일분 해고예고수당 지급 의무. 월급 250만원이면 약 250만원 받을 수 있어요.</p>
      </BorderBox>

      <p style={body}>
        "3개월 딱 채우고 해고하면 예고수당 안 줘도 되니까 이득"이라고 생각하는 회사도 있는데,
        부당해고로 판정나면 예고수당과는 비교도 안 되게 큰 금액을 배상해야 해요.
      </p>

      <Divider />

      <H2>부당해고 구제신청 절차</H2>
      <p style={body}>
        부당해고로 인정되면 복직하거나 금전 보상(최대 1년분 임금)을 받을 수 있어요.
        해고 통보를 받으면 즉시 대응해야 해요. 시간이 지나면 증거가 사라지고 신청 기간도 지나가요.
      </p>

      <SectionBadge>구제신청 순서</SectionBadge>
      <Steps steps={RELIEF_STEPS} />

      <GreenBox title="핵심 수치">
        <p style={{ ...body, marginBottom: 6 }}><strong>신청 기한</strong>: 해고일로부터 3개월 이내 (놓치면 신청 불가)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>처리 기간</strong>: 약 2~3개월</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>보상금</strong>: 해고 기간 임금 상당액 최대 1년분 (월급 250만원이면 최대 3,000만원)</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>비용</strong>: 신청 수수료 없음, 변호사 선임 선택 사항</p>
      </GreenBox>

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 고용노동부 자료를 바탕으로 작성했어요. 개별 사안은 노동위원회나 노무사 상담을 받으세요." />
    </ArticleLayout>
  );
}
