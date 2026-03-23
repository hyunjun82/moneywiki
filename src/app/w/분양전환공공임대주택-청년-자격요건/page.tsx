"use client";

// Q1. 35세 무주택 직장인인데 분양전환 공공임대주택 청년 자격이 되는지 확인하고 싶은 상황이에요.
// Q2. 본인 나이·소득·자산이 청년 자격요건에 맞는지 확인하고 신청 방법을 파악할 수 있어요.
// Q3. 나이(19~39세), 무주택 미혼, 소득기준(도시근로자 100% 이하, 1인 약 359만원), 자산 2.54억 이하, 신청 순위(1~3순위), 신청 경로(마이홈·LH청약).
// Q4. GreenBox(핵심 자격요건) + EligibilityChecker(자가진단) + Steps(신청 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const FAQS = [
  {
    q: "39세 넘으면 바로 퇴거해야 하나요?",
    a: "아니요. 입주 당시 자격만 충족하면 계약기간 동안 거주 가능해요. 재계약은 소득 기준만 맞으면 돼요.",
  },
  {
    q: "결혼하면 청년 공공임대 자격이 사라지나요?",
    a: "결혼 후에도 소득·자산 기준을 충족하면 계속 거주 가능해요. 신혼부부 특별공급으로 전환 신청할 수도 있어요.",
  },
  {
    q: "소득 100%는 구체적으로 얼마인가요?",
    a: "2026년 기준 도시근로자 1인 가구 월평균 소득 100%는 약 359만원이에요. 매년 통계청 발표로 변경돼요.",
  },
  {
    q: "2순위와 3순위 차이가 뭔가요?",
    a: "2순위는 본인+부모 소득·자산을 함께 보고, 3순위는 본인 소득·자산만 봐요. 부모님 소득이 높으면 3순위가 유리할 수 있어요.",
  },
  {
    q: "청년 매입임대와 분양전환 임대 차이는 뭔가요?",
    a: "매입임대는 기존 주택을 LH가 사서 임대해주는 거고, 분양전환은 일정 기간 임대 후 분양받을 수 있는 기회가 생겨요.",
  },
  {
    q: "자산 기준에 부채도 포함되나요?",
    a: "자산은 부동산+자동차+금융자산 합산이고, 부채는 차감하지 않아요. 순자산이 아니라 총자산 기준이에요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "마이홈포털 (국토교통부)", url: "https://www.myhome.go.kr" },
      { label: "LH청약센터", url: "https://apply.lh.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 전환 방법", description: "청약통장 전환도 함께 확인하세요." },
  { slug: "국민임대주택-전용면적-70제곱미터-입주자격", title: "국민임대주택 입주자격", description: "국민임대 자격요건도 확인해보세요." },
];

const ELIGIBILITY_ITEMS = [
  { id: "age", label: "만 19세 ~ 39세" },
  { id: "single", label: "미혼 (기혼은 신혼부부 공급 대상)" },
  { id: "homeless", label: "무주택자 (본인 명의 주택 없음)" },
  { id: "income", label: "월평균 소득 도시근로자 100% 이하 (1인 약 359만원)" },
  { id: "asset", label: "총자산 2억 5,400만원 이하" },
];

const STEPS = [
  { title: "모집공고 확인", desc: "마이홈포털(myhome.go.kr)이나 LH청약센터에서 수시로 확인해요.", tip: "모집 기간이 보통 1주일 정도라 놓치지 마세요" },
  { title: "온라인 신청", desc: "LH청약센터(apply.lh.or.kr)에서 인터넷 신청해요. 공동인증서 로그인 필요해요." },
  { title: "당첨자 발표 대기", desc: "신청 후 당첨 여부가 발표되면 문자 또는 사이트에서 확인해요." },
  { title: "서류 제출·심사", desc: "당첨 후 소득·자산 증빙 서류를 제출하고 심사를 받아요." },
  { title: "계약·입주", desc: "심사 통과하면 임대차 계약을 하고 입주해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 공공임대 · 청년</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        분양전환 공공임대 청년 자격요건,<br />
        소득 기준부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        35세 직장인인데 분양전환 공공임대주택에 관심 생겼죠?
        19세~39세 무주택 미혼 청년이 대상이고, 소득은 도시근로자 100% 이하면 가능해요.
        시세보다 저렴하게 살다가 내 집으로 분양받을 수 있는 기회예요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>청년 자격요건, 이 조건을 갖춰야 해요</H2>

      <GreenBox>
        분양전환 공공임대 청년 핵심 자격 (2026년 기준)<br />
        · 나이: 만 <strong>19세~39세</strong> (신청일 기준)<br />
        · 혼인: <strong>미혼</strong><br />
        · 주택: <strong>무주택자</strong><br />
        · 소득: 도시근로자 월평균 소득 <strong>100% 이하</strong> (1인 약 359만원)<br />
        · 자산: 총 <strong>2억 5,400만원</strong> 이하
      </GreenBox>

      <p style={body}>
        소득은 근로소득·사업소득·재산소득 합산이에요. 비과세 소득은 제외돼요.
        자산은 부동산+자동차+금융자산 합산이고 부채는 차감 안 해요.
      </p>

      <Divider />

      <H2>내가 자격이 되는지 체크해보세요</H2>

      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="기본 자격요건을 충족해요. 마이홈포털에서 모집공고를 확인하고 신청하세요."
        partialMatchText="일부 조건이 미충족이에요. 해당 항목을 확인하고, 신혼부부 공급 등 다른 경로도 살펴보세요."
      />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>1순위~3순위, 어디에 해당하나요?</H2>

      <BorderBox title="신청 순위별 기준">
        <strong>1순위</strong>: 생계·의료·주거급여 수급자, 차상위계층, 한부모가족<br /><br />
        <strong>2순위</strong>: 본인 + 부모 월평균 소득 도시근로자 100% 이하, 자산 약 3.4억 이내<br /><br />
        <strong>3순위</strong>: 본인 소득만 확인 (부모 무관), 1인 가구 소득 100% 이하, 본인 자산만 확인<br /><br />
        순위가 높을수록 당첨 확률이 높아요.
      </BorderBox>

      <Divider />

      <H2>신청은 이 순서로 하세요</H2>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 정보 제공 목적이며, 실제 자격요건은 모집공고마다 다를 수 있어요. 정확한 조건은 마이홈포털이나 LH청약센터에서 확인하세요." />
    </ArticleLayout>
  );
}
