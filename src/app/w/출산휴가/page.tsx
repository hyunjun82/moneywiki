"use client";

// Q1. 출산휴가에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 출산휴가는 최소 45일을 출산 후 사용해야 하며, 단태아 90일 또는 다태아 120일 전체를 보장받아요., 급여는 통상임금 100%이고 월 220만원 상한액이 있으며, 고용보험과 사업주가 나눠서 지급해요.
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "출산휴가는 정확히 며칠인가요?", a: "단태아 90일, 다태아 120일이에요. 하지만 출산 후 최소 45일(다태아 60일) 이상을 꼭 사용해야 해요." },
  { q: "출산휴가 급여는 누가 줘요?", a: "일반 회사는 사업주가 60일, 고용보험이 30일을 지급해요. 근로자 300명 미만 우선지원대상기업은 90일 전액 고용보험에서 줘요." },
  { q: "배우자가 출산휴가를 안 쓰면 어떻게 되나요?", a: "출산일로부터 90일 이내면 언제든 사용할 수 있어요. 하지만 기간이 지나면 소멸돼요." },
  { q: "출산휴가 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "출산휴가 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "근로기준법", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "경제/육아휴직급여", title: "육아휴직급여", description: "관련 내용 정리." },
  { slug: "경제/4대보험", title: "4대보험", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        출산휴가 및 배우자출산휴가 급여 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        출산휴가는 최소 45일을 출산 후 사용해야 하며, 단태아 90일 또는 다태아 120일 전체를 보장받아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>출산전후휴가 기간 및 급여</H2>
      <p style={body}>출산을 앞두고 있거나 최근 출산했다면 법적으로 보장받는 휴가 기간이 있어요. 아이가 하나냐 둘 이상이냐에 따라 기간이 달라져요.</p>
      <GreenBox>
        출산휴가는 최소 45일을 출산 후 사용해야 하며, 단태아 90일 또는 다태아 120일 전체를 보장받아요.{"\n"}
        급여는 통상임금 100%이고 월 220만원 상한액이 있으며, 고용보험과 사업주가 나눠서 지급해요.{"\n"}
        배우자출산휴가는 10일 유급이고, 출산일로부터 90일 이내에 사용해야 해요.
      </GreenBox>
      <p style={body}>단태아는 총 90일을 보장받고, 쌍둥이 이상 다태아는 120일을 보장받아요. 하지만 이 전체 기간을 마음대로 쓸 수 있는 건 아니에요. 근로기준법 제74조에서 최소 사용 기간을 정하고 있거든요. 출산 후에는 반드시 45일(다태아는 60일) 이상을 써야 해요. 이는 출산 후 회복 기간을 보장하기 위한 규정이에요. 임신 중에는 44일까지만 먼저 쓸 수 있고, 나머지는 출산 후에 써야 한다는 뜻이에요.</p>

      <CategoryButton label="법률" count={10} href="/category/%EB%B2%95%EB%A5%A0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>출산휴가 급여 지급 기준</H2>
      <p style={body}>출산휴가 중에도 급여를 받을 수 있어요. 하지만 누가 주는지, 얼마나 주는지는 회사 규모에 따라 달라져요.</p>
      <BorderBox>
        <strong>출산휴가 급여 지급 기준</strong><br />
        출산휴가 중에도 급여를 받을 수 있어요. 하지만 누가 주는지, 얼마나 주는지는 회사 규모에 따라 달라져요.<br />
        일반 회사(상시근로자 300명 초과 또는 우선지원대상이 아닌 회사):
      </BorderBox>
      <p style={body}>일반 회사(상시근로자 300명 초과 또는 우선지원대상이 아닌 회사):</p>

      <Divider />
      <H2>유산·사산 시 휴가 및 급여</H2>
      <p style={body}>안타깝지만 유산이나 사산으로 출산하지 못하는 경우도 있어요. 이런 상황에서도 근로자를 보호하는 제도가 있어요.</p>
      <p style={body}>유산이나 사산의 경우 임신 기간에 따라 휴가 기간이 달라져요. 11주 이내면 5일, 12주부터 15주까지는 10일, 16주부터 21주까지는 30일, 22주부터 27주까지는 60일, 28주 이후면 90일을 휴가로 보장받아요. 이건 출산휴가와 같은 수준으로 보호를 받는 거예요.</p>
      <p style={body}>급여는 출산휴가 급여와 동일하게 지급돼요. 통상임금 100% 기준에 월 220만원 상한액이 적용되죠. 회사 규모에 따라 지급 주체는 달라지지만, 보장받는 급여 수준은 같아요. 유산·사산은 자주 발생하지 않지만, 발생했을 때 경제적 어려움이 크기 때문에 법이 이렇게 보호하고 있어요.</p>

      <Divider />
      <H2>출산휴가 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
