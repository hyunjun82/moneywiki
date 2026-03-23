"use client";

// Q1. 육아휴직 급여가 얼마인지, 사후지급금이 폐지됐는지, 어떻게 신청하는지 궁금한 상황이에요.
// Q2. 급여 금액을 확인하고 고용24에서 육아휴직 급여를 신청하는 행동.
// Q3. 월 최대 250만원, 사후지급금 25% 폐지, 6+6 부모육아휴직제, 고용24 신청 절차.
// Q4. GreenBox(급여 요약) + Steps(신청 절차) + BorderBox(6+6 제도) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "회사에 육아휴직 신청", desc: "시작 30일 전까지 서면으로 신청해요.", tip: "정당한 사유 없이 거부 시 500만원 이하 과태료" },
  { title: "고용24 접속", desc: "work24.go.kr에 로그인해요." },
  { title: "육아휴직 급여 신청", desc: "휴직 시작일 이후 1개월이 지난 뒤부터 매월 신청해요." },
  { title: "매월 급여 수령", desc: "심사 후 지정 계좌로 지급돼요.", tip: "신청일로부터 14일 이내 지급" },
];

const FAQS = [
  { q: "2026년 육아휴직 급여가 얼마나 올랐나요?", a: "월 최대 250만원으로 인상됐어요. 통상임금의 80%를 받고, 상한이 250만원, 하한이 70만원이에요." },
  { q: "사후지급금 25%가 정말 폐지됐나요?", a: "네, 2026년부터 폐지됐어요. 이전에는 급여의 25%를 복직 후에 받았지만, 이제는 매달 100% 전액 지급돼요." },
  { q: "6+6 부모육아휴직제가 뭔가요?", a: "자녀 생후 18개월 이내에 부모가 동시에 또는 순차적으로 육아휴직하면, 처음 6개월간 통상임금의 100%(최대 월 450만원)를 받아요." },
  { q: "아빠도 육아휴직 급여를 받을 수 있나요?", a: "당연히 가능해요. 부모 모두 각각 최대 1년 6개월까지 육아휴직할 수 있어요." },
  { q: "육아휴직 중 다른 회사에서 일할 수 있나요?", a: "주 10시간 이하의 부업은 허용돼요. 이를 초과하면 급여가 중단될 수 있으니 주의하세요." },
  { q: "급여 신청을 늦게 하면 못 받나요?", a: "휴직 종료 후 12개월 이내에 신청해야 해요. 이 기한을 넘기면 받을 수 없어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용노동부", url: "https://www.moel.go.kr" },
    { label: "고용24", url: "https://www.work24.go.kr" },
    { label: "고용보험법(법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
  ]},
];

const RELATED = [
  { slug: "육아기-근로시간-단축-급여-계산", title: "육아기 단축근무 급여 계산", description: "육아휴직 대신 단축근무를 선택할 때 급여 계산법이에요." },
  { slug: "임신-중-근로시간-단축-2시간-가능", title: "임신 중 근로시간 단축", description: "임신 중에도 2시간 단축이 가능해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 육아</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아휴직 급여, 2026년엔 얼마 받나요?<br />
        사후지급금 폐지와 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        육아휴직하면 급여가 확 줄어들까 봐 걱정되죠? 2026년부터 월 최대 250만원으로 올랐고, 사후지급금 25%도 폐지돼서 매달 전액을 받아요.
        부부가 함께 쓰면 6+6 제도로 처음 6개월은 월 최대 450만원까지 가능해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>2026년 육아휴직 급여, 핵심만 정리하면</H2>
      <p style={body}>
        통상임금의 80%를 받되, 상한이 월 250만원이에요. 하한은 월 70만원이고요.
        가장 큰 변화는 사후지급금 폐지예요. 이전에는 25%를 복직 후에야 받았는데, 이제는 매달 100% 전액 지급돼요.
      </p>

      <GreenBox title="2026년 육아휴직 급여">
        · 금액: 통상임금의 80% (상한 250만원, 하한 70만원)<br />
        · 사후지급금: 폐지 → 매달 전액 지급<br />
        · 기간: 자녀 1명당 최대 1년 6개월<br />
        · 6+6 제도: 부모 동시 휴직 시 처음 6개월 100% (상한 450만원)
      </GreenBox>

      <Divider />

      <H2>6+6 부모육아휴직제, 어떤 제도인가요?</H2>
      <p style={body}>
        자녀 생후 18개월 이내에 부모가 모두 육아휴직을 사용하면 큰 혜택이 있어요. 처음 6개월간 통상임금의 100%를 지급하고, 상한도 월 450만원으로 높아져요.
      </p>

      <BorderBox>
        <strong>6+6 부모육아휴직제 조건</strong><br /><br />
        · 자녀 생후 18개월 이내<br />
        · 부모 모두 육아휴직 사용 (동시 또는 순차적)<br />
        · 처음 6개월: 통상임금 100% (상한 450만원)<br />
        · 7개월째부터: 일반 급여 적용 (80%, 상한 250만원)
      </BorderBox>

      <Divider />

      <H2>고용24에서 이렇게 신청하세요</H2>
      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        급여 신청은 휴직 시작 1개월 후부터 가능해요. 매달 신청하면 되고, 종료 후 12개월 이내에 미신청분을 한꺼번에 청구할 수도 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 고용보험법을 기준으로 작성됐어요. 통상임금에 따라 실제 급여가 달라지니 고용24에서 모의계산해보세요." />
    </ArticleLayout>
  );
}
