"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 자손 자상 보험료에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 자상이 자손보다 연간 3만~5만원 더 비싸요, 자상은 과실 비율 상관없이 위자료·휴업손해까지 보상해요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "자손 자상 보험료 차이가 얼마나 나나요?", a: "연간 3만~5만원 정도 차이나요. 월로 계산하면 3천원 정도예요. 자상이 더 비싸지만 보장 범위가 훨씬 넓어요." },
  { q: "자손 자상 중 어느 게 더 유리한가요?", a: "자상이 보험료는 비싸지만 과실 비율 상관없이 치료비, 위자료, 휴업손해를 모두 받을 수 있어서 유리해요." },
  { q: "자손 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "자손 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "자손 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "손해보험협회", href: "https://www.knia.or.kr" },
  { name: "금융감독원", href: "https://www.fss.or.kr" },
];

const RELATED = [
  { slug: "자동차보험-자동차상해-특약", title: "자동차보험 자동차상해 특약", description: "관련 내용 정리." },
  { slug: "자동차보험-자기신체사고-특약", title: "자동차보험 자기신체사고 특약", description: "관련 내용 정리." },
  { slug: "4대보험료-계산기", title: "4대보험료 계산기", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자손 자상 보험료 차이: 얼마나 비싸나요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자상이 자손보다 연간 3만~5만원 더 비싸요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>자손 자상 보험료는 얼마나 차이 나나요?</H2>
      <p style={body}>자상이 자손보다 연간 3만~5만원 더 비싸요.</p>
      <GreenBox>
        자상이 자손보다 연간 3만~5만원 더 비싸요{"\n"}
        자상은 과실 비율 상관없이 위자료·휴업손해까지 보상해요{"\n"}
        보험료 차이는 월 3천원이지만 사고 시 보상은 몇 배 차이나요
      </GreenBox>
      <p style={body}>손해보험협회 2026년 기준으로 자손(자기신체사고)은 연간 10만~18만원, 자상(자동차상해)은 연간 13만~23만원 정도예요. 신규 가입자는 5만원, 5년 무사고 운전자는 4만원, 10년 이상 장기 무사고 운전자는 3만원 정도 차이 나요. 월로 계산하면 3천~4천원 정도 더 내는 셈이죠. 보험료는 자상이 더 비싸지만 사고가 났을 때 받는 보험금 차이가 수백만원에서 수천만원까지 날 수 있어요. 4대보험료 계산기로 전체 보험료 부담도 확인해보세요.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>자손 자상 가격 차이는 왜 나나요?</H2>
      <p style={body}>보장 범위가 완전히 다르기 때문이에요.</p>
      <BorderBox>
        <strong>자손 자상 가격 차이는 왜 나나요?</strong><br />
        보장 범위가 완전히 다르기 때문이에요.<br />
        자손은 상해 등급별 한도 내에서 치료비만 보상하고, 내 과실 비율만큼 차감돼요. 예를 들어 14급(경미한 부상)은 한도가 50만원인데 내 과실이 50%면 25만원만 받아요. 반면 자상은 가입 한도 내에서 치료비 전액
      </BorderBox>
      <p style={body}>자손은 상해 등급별 한도 내에서 치료비만 보상하고, 내 과실 비율만큼 차감돼요. 예를 들어 14급(경미한 부상)은 한도가 50만원인데 내 과실이 50%면 25만원만 받아요. 반면 자상은 가입 한도 내에서 치료비 전액을 보상하고 과실 비율 상관없어요. 거기에 정신적 고통에 대한 위자료, 일을 못 해서 생긴 수입 감소분인 휴업손해까지 추가로 받을 수 있어요. 뱅크샐러드 자동차상해 비교에서도 보장 범위 차이를 강조하고 있어요.</p>

      <Divider />
      <H2>자손 자상 보험료 차이는 얼마나 나나요?</H2>
      <p style={body}>월 3천~4천원 정도 더 내는 셈이에요.</p>
      <p style={body}>연간 3만~5만원 차이는 월로 나누면 3천~4천원 정도예요. 커피 한 잔 값이죠. 하지만 사고가 났을 때 받는 보험금 차이는 어마어마해요. 실제 사례로 설명하면, 50대50 과실 사고에서 치료비 500만원, 위자료 150만원, 휴업손해 200만원이 발생했다고 가정해볼게요. 자손(9급 상해 가정)은 치료비 500만원의 50%인 250만원과 9급 한도 240만원 중 작은 금액인 240만원만 받아요. 하지만 자상(3천만원 가입)은 850만원 전액을 과실 비율 상관없이 받아요. 610만원이나 차이 나는 거예요.</p>

      <Divider />
      <H2>자손 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
