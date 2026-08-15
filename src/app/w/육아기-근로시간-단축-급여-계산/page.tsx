"use client";
// Q1. 육아기 단축근무를 하려는데, 급여가 얼마나 줄고 정부 지원은 얼마인지 궁금한 상황이에요.
// Q2. 단축급여 계산법을 이해하고 고용24에서 신청하는 행동.
// Q3. 최초 10시간 250만원/나머지 160만원 상한, 계산 공식, 만 12세 이하 24개월, 신청 절차.
// Q4. GreenBox(급여 요약) + Steps(신청 절차) + BorderBox(계산 공식) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "회사에 단축근무 신청", desc: "30일 전까지 서면으로 신청해요.", tip: "정당한 사유 없이 거부하면 500만원 이하 과태료" },
  { title: "고용24 접속", desc: "work24.go.kr에 로그인해요." },
  { title: "육아기 근로시간 단축 급여 신청", desc: "단축 시작일, 단축 시간, 통상임금 등을 입력하고 신청해요." },
  { title: "매월 급여 수령", desc: "심사 후 매월 지정 계좌로 단축급여가 지급돼요." },
];

const FAQS = [
  { q: "단축근무하면 급여가 많이 줄어드나요?", a: "회사 급여는 줄어든 시간만큼 줄지만, 정부 단축급여를 합치면 기존의 80~90% 수준을 받을 수 있어요." },
  { q: "회사가 단축근무를 거부하면 어떻게 하나요?", a: "정당한 사유 없이 거부하면 500만원 이하 과태료 대상이에요. 고용노동부 1350에 신고하면 돼요." },
  { q: "육아휴직 쓰고 나서도 단축근무할 수 있나요?", a: "가능해요. 육아휴직과 단축근무를 합쳐서 최대 24개월까지 사용할 수 있어요. 예를 들어 휴직 12개월 + 단축 12개월이에요." },
  { q: "주 몇 시간까지 줄일 수 있나요?", a: "주 15시간 이상 30시간 이하로 조정할 수 있어요. 주 35시간 → 25시간이면 10시간 단축이에요." },
  { q: "아빠도 신청할 수 있나요?", a: "당연히 가능해요. 부모 중 한 명이 아닌, 부모 각각 신청할 수 있어요. 같은 자녀에 대해 동시에도 가능하고요." },
  { q: "단축급여 신청 후 얼마나 걸려서 나오나요?", a: "심사에 보통 2~4주가 걸려요. 첫 달은 늦을 수 있고, 이후부터는 매월 정기적으로 지급돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용노동부", url: "https://www.moel.go.kr" },
    { label: "고용24", url: "https://www.work24.go.kr" },
    { label: "남녀고용평등법(법제처)", url: "https://www.law.go.kr/법령/남녀고용평등과일ㆍ가정양립지원에관한법률" },
  ]},
];

const RELATED = [
  { slug: "육아휴직-급여-신청-방법-사후-지급금", title: "육아휴직 급여 신청 방법", description: "육아휴직 급여와 사후지급금 구조를 정리했어요." },
  { slug: "임신-중-근로시간-단축-2시간-가능", title: "임신 중 근로시간 단축", description: "임신 중에도 2시간 단축 근무가 가능해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 육아</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아기 단축근무하면 급여는 얼마 받나요?<br />
        계산법과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이가 어린데 풀타임 근무가 버거워서 단축근무를 고민하고 있죠? 줄어든 급여만큼 정부에서 단축급여를 지원해줘요.
        2026년 기준 최초 10시간 단축분은 통상임금의 100%(월 250만원 상한), 나머지는 80%(월 160만원 상한)까지 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>단축급여는 어떻게 계산하나요?</H2>
      <p style={body}>
        급여 계산은 "줄인 시간"이 기준이에요. 주 40시간에서 30시간으로 줄였다면 10시간 단축이에요. 이 10시간에 대해 정부가 급여를 보전해줘요.
      </p>

      <BorderBox>
        <strong>단축급여 계산 공식</strong><br /><br />
        · 최초 10시간: 통상임금 × (단축 시간/소정근로시간) × 100%<br />
        → 상한 월 250만원<br /><br />
        · 10시간 초과분: 통상임금 × (초과 단축 시간/소정근로시간) × 80%<br />
        → 상한 월 160만원
      </BorderBox>

      <SectionBadge>월급 300만원, 10시간 단축 시 예시</SectionBadge>
      <GreenBox>
        회사 급여: 300만원 × (30/40) = 225만원<br />
        정부 단축급여: 300만원 × (10/40) × 100% = 75만원<br />
        <strong>합계: 월 300만원 (기존과 동일)</strong>
      </GreenBox>

      <p style={body}>
        10시간까지는 줄어든 급여를 100% 보전받아서 사실상 손해가 없어요. 10시간을 넘기면 80%로 떨어지니 이 구간을 잘 맞추는 게 유리해요.
      </p>

      <Divider />

      <H2>신청 조건은 어떻게 되나요?</H2>
      <p style={body}>
        만 12세 이하(초등학교 6학년 이하) 자녀를 양육하는 근로자라면 신청할 수 있어요. 육아휴직과 합산해서 최대 24개월까지 사용 가능하고요.
        <a href="https://www.law.go.kr/법령/남녀고용평등과일ㆍ가정양립지원에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법</a>에서 보장하는 권리예요.
      </p>

      <BorderBox>
        · 만 12세 이하 자녀 양육 중인 근로자<br />
        · 주 15시간 이상 ~ 30시간 이하로 조정<br />
        · 육아휴직 + 단축근무 합산 최대 24개월<br />
        · 부모 각각 신청 가능 (동시 사용도 가능)
      </BorderBox>

      <Divider />

      <H2>신청은 회사 → 고용24 순서예요</H2>
      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        회사 신청은 30일 전까지 서면으로 해야 해요. 회사가 거부하면 고용노동부에 신고하세요. 법으로 보장된 권리예요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 남녀고용평등법과 고용보험법을 기준으로 작성됐어요. 통상임금과 소정근로시간에 따라 실제 급여가 달라지니 고용24에서 모의계산해보세요." />
    </ArticleLayout>
  );
}
