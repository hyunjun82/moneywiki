"use client";

// Q1. 배당금 미지급에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 핵심 내용 확인
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "주식 배당금 안 주면 법적으로 문제 아닌가요?", a: "배당 여부는 주주총회에서 결정해요. 총회에서 배당하지 않기로 결의하면 법적으로 문제가 없어요. 다만 결의 후 지급을 안 하면 위법이에요." },
  { q: "배당금 못 받으면 어떻게 대응하나요?", a: "주주총회에서 배당 결의가 났는데 안 주면 회사에 지급을 요구할 수 있어요. 그래도 안 주면 소송으로 강제할 수 있고요." },
  { q: "배당금 청구권은 언제까지 유효한가요?", a: "배당 결의일로부터 5년이에요. 5년이 지나면 소멸시효로 청구권이 사라져요." },
  { q: "주식 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "주식 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "상법 제464조의2 이익배당 지급시기", href: "https://www.law.go.kr" },
  { name: "찾기쉬운 생활법령정보 - 주주권리", href: "https://www.easylaw.go.kr" },
];

const RELATED = [
  { slug: "주식-투자-기초", title: "주식 투자 기초", description: "관련 내용 정리." },
  { slug: "주주총회-의결권", title: "주주총회 의결권", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주식 배당금 미지급 주주권리 상법 이익배당청구권
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        1년 동안 주식 보유했는데 회사가 올해는 배당 안 준다고 해요. 회사에 이익이 발생해도 배당금을 안 줘도 되는 건가요? 주주 권리를 알려드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>배당금 미지급 이유 주주총회 결의</H2>
      <p style={body}>주주의 이익배당청구권은 상법에서 보장하는 주주의 고유권이에요. 정관이나 주주총회 결의로도 박탈하거나 제한할 수 없어요.</p>
      <GreenBox>
        1년 동안 주식 보유했는데 회사가 올해는 배당 안 준다고 해요. 회사에 이익이 발생해도 배당금을 안 줘도 되는 건가요? 주주 권리를 알려드릴게요.
      </GreenBox>
      <p style={body}>그런데 여기서 오해하면 안 되는 게 있어요. "고유권"이라는 게 "무조건 배당을 받을 권리"가 아니라 "배당을 받을 수 있는 지위"를 말하는 거예요.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>배당금 미지급 주주권리 법적 청구</H2>
      <p style={body}>주주총회에서 배당을 결의했다면, 결의일로부터 1개월 이내에 지급해야 해요. 상법 제464조의2에서 정한 기간이에요.</p>
      <BorderBox>
        <strong>배당금 미지급 주주권리 법적 청구</strong><br />
        주주총회에서 배당을 결의했다면, 결의일로부터 1개월 이내에 지급해야 해요. 상법 제464조의2에서 정한 기간이에요.<br />
        1개월이 지났는데도 안 주면 상법 위반이에요. 이때는 회사에 지급을 요구할 수 있어요. 내용증명을 보내서 "배당금 지급하세요"라고 정식으로 요청하는 거예요.
      </BorderBox>
      <p style={body}>1개월이 지났는데도 안 주면 상법 위반이에요. 이때는 회사에 지급을 요구할 수 있어요. 내용증명을 보내서 "배당금 지급하세요"라고 정식으로 요청하는 거예요.</p>

      <Divider />
      <H2>배당금 미지급 청구 전자공시 확인</H2>
      <p style={body}>회사가 배당을 결의했는지는 금융감독원 전자공시시스템에서 확인할 수 있어요. "정기주주총회 결과" 공시를 찾아보면 배당 결의 여부와 금액이 나와요.</p>
      <p style={body}>배당금 지급일도 공시에 나와요. 보통 주주총회 다음 달에 지급되는데, 정확한 날짜는 회사마다 달라요.</p>
      <p style={body}>배당금은 내가 가진 주식 수에 비례해서 나눠줘요. 주당 배당금이 1,000원이고 내가 100주를 가지고 있으면 10만 원을 받는 거예요.</p>

      <Divider />
      <H2>주식 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
