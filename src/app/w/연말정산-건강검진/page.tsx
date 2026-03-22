"use client";

// Q1. 종합검진 받았는데 연말정산 의료비 공제에 포함되는지 궁금한 직장인
// Q2. 건강검진 비용 중 공제 가능한 항목을 파악하고, 연말정산에 반영하는 방법을 확인한다
// Q3. 공제 대상(본인 부담분만), 국가건강검진 제외, 회사 부담 제외, 실손 차감, 공제율 15%, 3% 초과분
// Q4. GreenBox(공제 결론) + BorderBox(대상 구분표) + Checklist(확인 사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "종합검진 영수증 보관 / 간소화에 안 잡히면 직접 제출",
  "국가건강검진 비용인지 확인 / 무료면 공제 불가",
  "회사 부담 여부 확인 / 회사가 낸 건 공제 불가",
  "실손보험 수령액 확인 / 실손 받은 금액은 차감",
  "간소화 자료 내역 확인 / 누락 시 병원에서 영수증 발급",
];

const FAQS = [
  {
    q: "종합검진 비용도 의료비 공제 되나요?",
    a: "네, 본인이 돈을 낸 종합검진은 의료비 공제 대상이에요. 정밀검진, 암검진 등도 포함돼요. 단, 국가건강검진처럼 무료인 건 해당 안 돼요.",
  },
  {
    q: "국가건강검진은 공제 안 되나요?",
    a: "국가건강검진은 비용이 0원이니까 공제 대상이 아니에요. 국가검진 후 추가로 본인 돈으로 정밀검사를 받았다면 그 비용은 공제돼요.",
  },
  {
    q: "회사에서 건강검진비를 지원해줬어요",
    a: "회사가 전액 부담한 검진은 공제 안 돼요. 회사 지원 한도를 초과해서 본인이 추가로 낸 금액만 공제 대상이에요.",
  },
  {
    q: "검진비 50만원이면 얼마 돌려받나요?",
    a: "단독으로는 계산이 어려워요. 다른 의료비와 합쳐서 총급여의 3%를 초과한 금액에 15% 공제율을 적용해요. 총급여 5,000만원이면 150만원 초과분부터 공제가 시작돼요.",
  },
  {
    q: "실손보험으로 돌려받았으면요?",
    a: "실손보험으로 받은 금액은 공제 대상에서 빠져요. 검진비 50만원 중 실손으로 30만원 받았으면 본인 부담 20만원만 의료비에 포함돼요.",
  },
  {
    q: "간소화 자료에 검진비가 안 잡혀요",
    a: "일부 병원은 간소화 자료에 자동 반영이 안 될 수 있어요. 병원에서 의료비 영수증과 진료비 납입확인서를 발급받아 직접 제출하면 돼요.",
  },
];

const SOURCES = [
  { name: "소득세법 제59조의4", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 의료비 공제", href: "https://www.nts.go.kr" },
  { name: "홈택스 간소화", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-의료비-세액공제", title: "연말정산 의료비 세액공제", description: "의료비 공제 대상과 한도 정리." },
  { slug: "연말정산-의료비-공제한도", title: "연말정산 의료비 공제한도", description: "총급여 3% 초과분부터 공제되는 구조." },
  { slug: "연말정산", title: "연말정산 전체 가이드", description: "연말정산 절차와 공제 항목 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 건강검진 · 의료비 공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건강검진 비용, 연말정산에서 돌려받을 수 있을까?<br />
        공제 대상과 주의할 점
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "종합검진 받았는데 이것도 연말정산에 들어가나요?"
      </p>
      <p style={body}>
        본인이 돈을 낸 건강검진은 <strong>의료비 세액공제</strong> 대상이에요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에 따라
        총급여의 3%를 초과한 의료비에 <strong>15% 공제율</strong>을 적용해요.
        다만 국가건강검진(무료)이나 회사 부담 검진은 빠져요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 검진이 공제되고, 어떤 건 안 되나요?</H2>
      <p style={body}>
        건강검진이라고 다 공제되는 건 아니에요.
        핵심은 <strong>본인이 돈을 냈느냐</strong>예요.
      </p>

      <GreenBox title="건강검진 공제 여부 정리">
        {"공제 되는 경우\n· 종합검진 본인 부담분\n· 정밀검진, 암검진 본인 부담분\n· 국가건강검진 후 추가 정밀검사 본인 부담분\n\n공제 안 되는 경우\n· 국가건강검진 (무료)\n· 회사가 전액 부담한 검진\n· 실손보험으로 돌려받은 금액"}
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>공제 금액은 어떻게 계산하나요?</H2>
      <p style={body}>
        건강검진비만 따로 공제되는 게 아니라, 다른 의료비랑 합산해서 계산해요.
        총급여의 3%를 초과한 금액에 15% 공제율을 적용하는 구조예요.
      </p>

      <BorderBox>
        <strong>의료비 세액공제 계산 구조</strong>{"\n"}
        · (의료비 합계 - 총급여 x 3%) x 15% = 공제액{"\n"}
        {"\n"}
        예시) 총급여 5,000만원, 의료비 합계 250만원{"\n"}
        · 5,000만원 x 3% = 150만원 (문턱){"\n"}
        · 250만원 - 150만원 = 100만원 (공제 대상){"\n"}
        · 100만원 x 15% = 15만원 (환급액){"\n"}
        {"\n"}
        ※ 본인 의료비는 공제한도 없음{"\n"}
        ※ 부양가족 의료비는 연 700만원 한도
      </BorderBox>

      <p style={body}>
        총급여가 높으면 3% 문턱도 높아져서, 의료비가 꽤 많아야 공제가 시작돼요.
        총급여 5,000만원이면 150만원을 넘어야 공제가 되는 거죠.
        건강검진비만으로는 부족할 수 있으니 다른 의료비와 합산 효과를 봐야 해요.
      </p>

      <Divider />

      <H2>연말정산 전 체크해봐요</H2>
      <p style={body}>
        건강검진 공제에서 가장 많이 놓치는 건 간소화 자료 누락과 실손 차감이에요.
        아래 항목을 미리 확인해두면 공제를 빠트리지 않아요.
      </p>

      <SectionBadge>검진비 공제 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 공제율, 한도, 간소화 반영 범위는 법 개정에 따라 바뀔 수 있으니 최신 내용은 국세청(126)이나 홈택스에서 확인해 주세요." />
    </ArticleLayout>
  );
}
