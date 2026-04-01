"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 작년에 못 쓴 연차가 남아있는데 아직 쓸 수 있는지, 수당으로 받을 수 있는지 궁금한 상황이에요.
// Q2. 연차 소멸 기한과 수당 청구 시효를 파악해서, 기한 내에 수당을 청구하는 행동.
// Q3. 연차 발생 후 1년 소멸, 수당 청구권 3년 시효, 사용촉진 절차 있으면 수당 청구 불가, 노동부 신고 방법.
// Q4. GreenBox(핵심 기한) + BorderBox(사용촉진 영향) + Steps(수당 청구 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  { title: "미사용 연차 일수 확인", desc: "급여명세서나 인사팀에 확인해서 소멸된 연차가 몇 일인지 파악해요." },
  { title: "사용촉진 절차 여부 확인", desc: "회사가 사용촉진 절차(서면 통보 2회)를 했는지 확인해요. 안 했다면 수당 청구 가능해요.", tip: "사용촉진 통보서를 받은 적 없다면 회사 과실" },
  { title: "회사에 수당 지급 요청", desc: "인사팀에 연차수당 지급을 서면으로 요청해요. 구두보다 이메일이나 내용증명이 안전해요." },
  { title: "미지급 시 노동부 진정", desc: "회사가 지급을 거부하면 관할 고용노동부에 임금체불 진정을 넣어요. 온라인(고용노동부 민원마당)으로도 가능해요." },
];

const FAQS = [
  {
    q: "연차를 1년 넘겨서 사용할 수 있나요?",
    a: "원칙적으로 안 돼요. 연차는 발생일로부터 1년 이내에 사용해야 하고, 넘기면 소멸돼요. 다만 회사 규정으로 이월을 허용하는 곳도 있어요.",
  },
  {
    q: "소멸된 연차는 무조건 수당으로 받을 수 있나요?",
    a: "회사가 사용촉진 절차를 안 했다면 수당을 받을 수 있어요. 하지만 회사가 서면으로 2회 사용촉진 통보를 했다면 수당 지급 의무가 없어요.",
  },
  {
    q: "연차수당 청구 시효가 3년이라는 게 무슨 뜻이에요?",
    a: "연차수당 청구권은 근로기준법 제49조에 따라 3년간 행사하지 않으면 소멸돼요. 퇴직 후 3년이 지나면 청구할 수 없어요.",
  },
  {
    q: "사용촉진 절차는 구체적으로 뭐예요?",
    a: "사용 기간 만료 6개월 전에 미사용 연차 일수를 서면으로 알려주고, 10일 이내에 직원이 사용 시기를 정하지 않으면 만료 2개월 전에 회사가 사용 시기를 지정해요.",
  },
  {
    q: "퇴직할 때 남은 연차는 어떻게 되나요?",
    a: "퇴직 시 미사용 연차는 수당으로 정산받아요. 이건 사용촉진 절차와 관계없이 지급돼요. 퇴직금과 별도예요.",
  },
  {
    q: "연차 일수는 어떻게 계산하나요?",
    a: "1년 미만 근무 시 매월 1일씩, 1년 이상 근무 시 연 15일이에요. 3년 이상부터는 2년마다 1일씩 가산돼서 최대 25일까지 늘어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제60조 (연차 유급휴가)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연차휴가-사용촉진제도", title: "연차휴가 사용촉진제도", description: "회사가 사용촉진 절차를 하면 수당 안 줘도 되는 제도예요." },
  { slug: "연차수당-계산", title: "연차수당 계산법", description: "미사용 연차 1일당 얼마를 받는지 계산하는 방법이에요." },
  { slug: "연차휴가-발생", title: "연차휴가 발생 기준", description: "입사일 기준 연차가 몇 일 생기는지 정리해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>노동 · 연차 · 휴가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연차휴가, 언제 소멸되고 수당은 언제까지?<br />
        소멸시효와 청구 기한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        작년에 못 쓴 연차가 아직 남아있는지 궁금하셨죠?
        연차휴가는 발생일로부터 1년이 지나면 소멸돼요.
        하지만 수당으로 청구할 수 있는 기한은 3년이에요. 이 두 가지를 혼동하면 안 돼요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>연차 소멸 1년, 수당 청구 3년</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제60조</a>에 따르면
        연차 유급휴가는 발생한 날로부터 1년간 사용하지 않으면 소멸돼요.
        하지만 소멸된 연차에 대한 수당 청구권은 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>제49조</a>에 따라 3년간 유효해요.
      </p>

      <GreenBox>
        기한 정리예요.<br />
        · <strong>연차휴가 사용 기한</strong>: 발생일로부터 1년 (넘기면 자동 소멸)<br />
        · <strong>연차수당 청구 시효</strong>: 3년 (소멸 시점부터 기산)<br />
        · 단, 회사가 <strong>사용촉진 절차</strong>를 했다면 수당 지급 의무 없음
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>사용촉진 절차가 있으면 수당 못 받나요?</H2>
      <p style={body}>
        회사가 법적 사용촉진 절차를 제대로 밟았다면 미사용 연차에 대한 수당 지급 의무가 없어요.
        반대로 절차가 없었다면 수당을 받을 수 있어요.
      </p>

      <BorderBox>
        사용촉진 절차 2단계예요.<br /><br />
        <strong>1단계 (만료 6개월 전)</strong>: 회사가 미사용 연차 일수를 직원에게 서면 통보<br />
        → 직원은 10일 이내에 사용 시기를 정해서 알려야 함<br /><br />
        <strong>2단계 (만료 2개월 전)</strong>: 직원이 시기를 안 정했으면 회사가 사용 시기를 지정하여 서면 통보<br /><br />
        이 두 단계를 모두 밟아야 사용촉진이 유효해요. 하나라도 빠졌으면 수당을 청구할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>연차수당 청구는 이렇게 해요</H2>
      <p style={body}>
        회사가 사용촉진 절차 없이 연차를 소멸시켰다면, 아래 순서대로 수당을 청구할 수 있어요.
      </p>

      <SectionBadge>수당 청구 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 개별 사안은 고용노동부 상담(1350)이나 노무사 상담을 받아보는 게 정확해요." />
    </ArticleLayout>
  );
}
