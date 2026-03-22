"use client";

// Q1. 퇴직급여 수급 요건에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 1년 이상 계속 근무한 근로자는 퇴직급여 수급 대상이며, 주 15시간 이상 근무 시 적용, 계속근로기간은 입사일부터 퇴직일까지 기간이며, 휴직·육아휴직 포함 계산
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "알바도 1년 일하면 퇴직금 받을 수 있나요?", a: "네, 가능해요. 주 15시간 이상 근무하고 1년 이상 일했다면 정규직이든 알바든 퇴직금을 받을 수 있어요." },
  { q: "휴직 기간도 계속근로기간에 포함되나요?", a: "포함돼요. 병가, 육아휴직, 산전후휴가 등 모든 휴직 기간은 계속근로기간에 포함돼요." },
  { q: "퇴직금과 퇴직연금 중 뭐가 더 유리한가요?", a: "퇴직연금(DC형)은 운용 수익을 받을 수 있어 장기적으로 유리하지만, 퇴직금은 즉시 현금으로 받을 수 있어요. 상황에 따라 선택하시면 돼요." },
  { q: "퇴직급여 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "퇴직급여 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "근로자퇴직급여 보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "퇴직금-미지급-지급받는-방법", title: "퇴직금 미지급 신고 방법", description: "관련 내용 정리." },
  { slug: "퇴직금-계산", title: "퇴직금 계산 방법", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직급여 수급 요건, 1년 미만 근무자도 받을 수 있나요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        1년 이상 계속 근무한 근로자는 퇴직급여 수급 대상이며, 주 15시간 이상 근무 시 적용
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직급여 수급 요건, 1년만 일하면 되나요?</H2>
      <p style={body}>네, 맞아요. 근로자퇴직급여 보장법 제4조에서 1년 이상 계속 근무한 근로자는 퇴직급여를 받을 수 있다고 명시하고 있어요.</p>
      <GreenBox>
        1년 이상 계속 근무한 근로자는 퇴직급여 수급 대상이며, 주 15시간 이상 근무 시 적용{"\n"}
        계속근로기간은 입사일부터 퇴직일까지 기간이며, 휴직·육아휴직 포함 계산{"\n"}
        퇴직금제와 퇴직연금제 중 선택 가능하며, 지급 시기는 퇴직 후 14일 이내
      </GreenBox>
      <p style={body}>퇴직급여를 받으려면 두 가지 조건을 충족해야 해요. 첫째, 주당 평균 15시간 이상 일해야 해요. 둘째, 계속근로기간이 1년 이상이어야 해요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>계속근로기간 1년 계산, 어떻게 하나요?</H2>
      <p style={body}>계속근로기간은 입사일부터 퇴직일까지의 기간이에요. 실제 출근한 날만 세는 게 아니라 재직한 전체 기간을 세요.</p>
      <BorderBox>
        <strong>계속근로기간 1년 계산, 어떻게 하나요?</strong><br />
        계속근로기간은 입사일부터 퇴직일까지의 기간이에요. 실제 출근한 날만 세는 게 아니라 재직한 전체 기간을 세요.<br />
        2024년 3월 2일 입사해서 2026년 3월 1일 퇴직했다면 정확히 2년이에요. 하루라도 모자라면 1년 미만이 되니 주의하셔야 해요.
      </BorderBox>
      <p style={body}>2024년 3월 2일 입사해서 2026년 3월 1일 퇴직했다면 정확히 2년이에요. 하루라도 모자라면 1년 미만이 되니 주의하셔야 해요.</p>

      <Divider />
      <H2>퇴직금제와 퇴직연금제 차이점은?</H2>
      <p style={body}>사업주는 퇴직금제 또는 퇴직연금제 중 하나를 선택해서 설정해야 해요. 근로자가 선택할 수는 없지만 어떤 제도인지 알아두면 도움이 돼요.</p>
      <p style={body}>퇴직금제는 퇴직할 때 일시금으로 받는 방식이에요. 계산 공식은 평균임금 × 30일 × (재직일수 ÷ 365)예요.</p>
      <p style={body}>퇴직일로부터 14일 이내에 현금으로 받아요. 근로기준법에서 14일 내 지급을 의무화하고 있어요. 14일이 지나면 연 20% 지연이자가 발생해요.</p>

      <Divider />
      <H2>퇴직급여 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
