"use client";

// Q1. 취업규칙이나 근로계약서에 연차가 법정 기준보다 적게 돼 있는데 이게 유효한지 궁금한 근로자
// Q2. 법정 기준 미달 연차 조건의 효력을 파악하고, 부족한 연차를 청구할 수 있는지 판단한다
// Q3. 근로기준법 제15조(강행규정), 제60조(연차 기준), 무효 부분만 법정 기준 적용, 유리한 조건은 유효
// Q4. GreenBox(핵심 결론) + BorderBox(법정 기준표) + Steps(대응 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "근로계약서와 취업규칙의 연차 조항을 확인하세요",
    desc: "내 근로계약서나 회사 취업규칙에 연차가 며칠로 돼 있는지 확인해요. 법정 기준(1년 근속 시 15일)보다 적다면 그 조항은 무효예요.",
  },
  {
    title: "법정 기준과 비교해서 부족한 일수를 계산하세요",
    desc: "법정 기준은 1년 80% 이상 출근 시 15일이에요. 취업규칙에 10일이라고 돼 있다면 5일이 부족한 거예요. 이 5일은 법정 기준에 따라 당연히 발생한 연차예요.",
    tip: "3년 이상 근속하면 2년마다 1일씩 추가 (최대 25일)",
  },
  {
    title: "회사에 부족한 연차를 사용하겠다고 요청하세요",
    desc: "법정 기준보다 부족한 연차는 사용할 권리가 있어요. 회사에 서면으로 연차 사용을 신청하세요. 거부하면 노동청에 진정을 넣을 수 있어요.",
    link: { label: "고용노동부 민원", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "사용 못 한 연차는 수당으로 청구하세요",
    desc: "퇴직 시 또는 연도 만료 시 사용하지 못한 연차는 연차수당으로 청구할 수 있어요. 1일분 통상임금 x 미사용 연차일수로 계산해요.",
    tip: "연차수당 청구권 소멸시효: 3년",
  },
];

const FAQS = [
  {
    q: "취업규칙에 연차 10일로 돼 있으면 유효한가요?",
    a: "무효예요. 근로기준법 제60조에서 1년 근속·80% 출근 시 15일을 보장하고 있어요. 법정 기준보다 낮은 부분은 무효가 되고 15일이 적용돼요.",
  },
  {
    q: "법정 기준보다 많은 연차는 유효한가요?",
    a: "네, 유효해요. 근로기준법은 최저 기준이라서, 그보다 유리한 조건은 그대로 효력이 있어요. 취업규칙에 20일로 돼 있으면 20일이 적용돼요.",
  },
  {
    q: "연차를 안 주기로 계약해도 되나요?",
    a: "안 돼요. 근로기준법 제15조에 따라 법정 기준에 미달하는 근로조건은 무효예요. 연차를 주지 않겠다는 약정은 강행규정 위반이에요.",
  },
  {
    q: "1년 미만 근무자는 연차가 없나요?",
    a: "1개월 개근 시마다 1일의 유급휴가가 발생해요. 1년 미만이라도 최대 11일까지 연차를 받을 수 있어요. 이것도 법정 기준이라 줄일 수 없어요.",
  },
  {
    q: "연차가 부족하게 돼 있으면 어디에 신고하나요?",
    a: "관할 고용노동청에 진정을 넣을 수 있어요. 온라인(minwon.moel.go.kr) 또는 방문 신고가 가능해요. 근로감독관이 조사 후 시정명령을 내려요.",
  },
  {
    q: "연차수당은 어떻게 계산하나요?",
    a: "1일분 통상임금 x 미사용 연차일수예요. 법정 15일 중 10일만 쓰고 퇴직하면 5일분 연차수당을 받을 수 있어요. 청구 시효는 3년이에요.",
  },
];

const SOURCES = [
  { name: "근로기준법 제15조", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "근로기준법 제60조", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "연차휴가-일수", title: "연차휴가 일수 계산", description: "근속 연수별 연차 일수 정리." },
  { slug: "연차수당-계산", title: "연차수당 계산 방법", description: "미사용 연차 수당 계산법." },
  { slug: "근로기준법-연차휴가", title: "근로기준법 연차휴가 규정", description: "법정 연차 기준 상세 해설." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 연차휴가 · 근로기준법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연차가 법정 기준보다 적으면 무효일까?<br />
        법 이하 조건의 효력과 대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "취업규칙에 연차가 10일로 정해져 있는데, 15일 아니었나요?"
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제15조</a>에 따라
        법정 기준에 미달하는 근로조건은 <strong>무효</strong>예요.
        무효가 된 부분은 자동으로 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제60조</a>의 기준이 적용돼요.
        취업규칙에 10일이라고 돼 있어도 법적으로는 15일이 맞아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>법정 연차 기준은 몇 일인가요?</H2>
      <p style={body}>
        1년간 80% 이상 출근하면 <strong>15일</strong>의 유급연차가 발생해요.
        3년 이상 근속하면 2년마다 1일씩 추가되고, 최대 25일까지 늘어나요.
      </p>

      <GreenBox title="법정 연차 기준 (근로기준법 제60조)">
        {"1년 근속, 80% 이상 출근 → 15일\n3년 근속 → 16일\n5년 근속 → 17일\n...\n21년 이상 → 최대 25일\n\n1년 미만: 1개월 개근 시 1일 (최대 11일)\n\n이 기준보다 적은 취업규칙·근로계약 = 무효\n무효 부분은 자동으로 법정 기준 적용"}
      </GreenBox>

      <CategoryButton label="근로 정보" count={14} href="/category/근로" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>법 이하 조건은 어떻게 되나요?</H2>
      <p style={body}>
        근로기준법은 <strong>강행규정</strong>이에요. 당사자가 합의했더라도 법정 기준 미만은 효력이 없어요.
        무효가 된 부분만 법정 기준으로 대체되고, 나머지 계약 내용은 그대로 유효해요.
      </p>

      <BorderBox>
        <strong>효력 판단 기준</strong>{"\n"}
        · 법정 기준 이하 → 무효 → 법정 기준 적용{"\n"}
        · 법정 기준 이상 → 유효 → 약정 기준 적용{"\n"}
        {"\n"}
        예시){"\n"}
        · 취업규칙 연차 10일 → 무효 → 15일 적용{"\n"}
        · 취업규칙 연차 20일 → 유효 → 20일 적용{"\n"}
        · "연차 없음" 약정 → 무효 → 15일 적용
      </BorderBox>

      <Divider />

      <H2>연차가 부족할 때 이렇게 대응하세요</H2>
      <p style={body}>
        법정 기준보다 적은 연차를 받고 있다면 정당하게 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 근로기준법 기준으로 작성했어요. 연차 일수, 수당 계산 등은 법 개정에 따라 바뀔 수 있으니 최신 내용은 고용노동부 또는 노동청에서 확인해 주세요." />
    </ArticleLayout>
  );
}
