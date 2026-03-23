"use client";
// Q1. 기초생활수급자인데 실업급여도 받을 수 있는지 궁금한 상황
// Q2. 수급자 지위와 실업급여의 중복 수급 가능 여부를 확인하고, 소득 인정액 변동 영향을 파악한다
// Q3. 중복 수급 가능, 소득 인정액에 포함, 수급자격 유지/변동 기준, 신고 의무
// Q4. GreenBox(핵심 결론) + BorderBox(소득 인정액 영향) + Steps(절차) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
const STEPS = [
  { title: "고용24에서 실업급여를 신청하세요", desc: "기초수급자라고 실업급여 신청이 제한되지 않아요. 일반 근로자와 동일한 절차로 신청하면 돼요.", link: { label: "고용24", href: "https://www.ei.go.kr" } },
  { title: "주민센터에 소득 변동을 신고하세요", desc: "실업급여를 받기 시작하면 소득이 생긴 거예요. 주민센터에 소득 변동 신고를 해야 해요. 신고를 안 하면 나중에 부정수급으로 환수될 수 있어요.", tip: "30일 이내에 신고해야 해요" },
  { title: "수급액 변동 여부를 확인하세요", desc: "실업급여가 소득 인정액에 포함되면서 생계급여 등이 줄어들 수 있어요. 다만 의료급여나 주거급여는 기준이 다르니 각각 확인해야 해요." },
];
const FAQS = [
  { q: "기초수급자도 실업급여를 받을 수 있나요?", a: "네, 받을 수 있어요. 실업급여와 기초생활보장은 별개 제도라서 중복 수급이 가능해요. 다만 실업급여가 소득으로 잡혀서 수급액이 줄어들 수 있어요." },
  { q: "실업급여 받으면 기초수급자에서 탈락하나요?", a: "바로 탈락하지는 않지만, 소득 인정액이 기준 중위소득을 넘으면 생계급여가 줄거나 중단될 수 있어요. 실업급여 금액에 따라 달라져요." },
  { q: "생계급여는 얼마나 줄어드나요?", a: "실업급여 수령액이 소득 인정액에 합산돼요. 생계급여 = 기준 중위소득 32% - 소득 인정액이니까, 실업급여만큼 줄어드는 구조예요." },
  { q: "의료급여도 영향받나요?", a: "의료급여는 중위소득 40% 기준이라 생계급여보다 기준이 높아요. 실업급여를 받아도 의료급여는 유지되는 경우가 많아요." },
  { q: "소득 변동 신고를 안 하면 어떻게 되나요?", a: "나중에 확인되면 초과 지급된 수급액을 환수당해요. 일부러 신고를 안 하면 부정수급으로 추가 제재를 받을 수 있어요." },
];
const SOURCES = [
  { name: "국민기초생활보장법", href: "https://www.law.go.kr/법령/국민기초생활보장법" },
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "복지로", href: "https://www.bokjiro.go.kr" },
];
const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "실업급여를 받으려면 갖춰야 할 요건." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금", description: "갑작스러운 위기 시 긴급 지원." },
  { slug: "실업급여-금액", title: "실업급여 금액과 기간", description: "받을 수 있는 금액 계산." },
];
export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 기초수급자 · 중복 수급</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>기초수급자도 실업급여 받을 수 있나요?<br />중복 수급과 소득 인정액 영향</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"수급자인데 실업급여 받으면 수급이 끊기나요?"</p>
      <p style={body}>실업급여와 기초생활보장은 <strong>별개 제도</strong>라서 중복 수급이 가능해요. 다만 실업급여가 소득 인정액에 포함되니까 생계급여 등이 줄어들 수 있어요. 바로 탈락하는 건 아니지만, 주민센터에 소득 변동 신고는 꼭 해야 해요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>중복 수급, 어디까지 가능한가요?</H2>
      <GreenBox title="기초수급자 + 실업급여 핵심">{"실업급여 수급 = 가능 (별개 제도)\n\n영향:\n· 실업급여 → 소득 인정액에 합산\n· 생계급여(32%) → 줄어들 수 있음\n· 의료급여(40%) → 유지 가능성 높음\n· 주거급여(48%) → 유지 가능성 높음\n\n의무:\n· 소득 변동 신고 (30일 이내)\n· 미신고 시 부정수급 환수"}</GreenBox>
      <CategoryButton label="실업급여 정보" count={15} href="/category/실업급여" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>소득 인정액은 어떻게 바뀌나요?</H2>
      <BorderBox><strong>소득 인정액 계산 영향</strong>{"\n"}· 소득 인정액 = 소득평가액 + 재산의 소득환산액{"\n"}· 실업급여는 소득평가액에 합산{"\n"}{"\n"}예시) 기존 소득 0원 → 실업급여 월 198만원 수급{"\n"}· 소득 인정액 약 198만원 증가{"\n"}· 생계급여 기준(4인 가구 약 183만원) 초과 시 중단{"\n"}· 의료급여 기준(약 229만원) 이하면 유지{"\n"}{"\n"}※ 가구원 수, 재산에 따라 결과가 달라요</BorderBox>
      <Divider />
      <H2>이렇게 대응하세요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 국민기초생활보장법 기준으로 작성했어요. 중위소득 기준, 수급 기준은 매년 바뀌니 주민센터에서 확인해 주세요." />
    </ArticleLayout>
  );
}
