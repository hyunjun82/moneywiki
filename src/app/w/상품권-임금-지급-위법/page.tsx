"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 상품권 임금 지급에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 임금은 통화(현금, 계좌이체)로 전액 지급이 원칙, 상품권, 현물 지급은 근로기준법 위반, 2년 이하 징역 또는 2천만원 이하 벌금
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "근로자가 동의하면 상품권으로 줘도 되나요?", a: "안 돼요. 근로자가 동의해도 법 위반이에요. 근로기준법은 강행규정이라 당사자 합의로 회피할 수 없어요." },
  { q: "명절 상품권은 괜찮은 거 아닌가요?", a: "명절 선물이나 복리후생 차원의 상품권은 괜찮아요. 다만 정기 임금을 상품권으로 대체하면 안 돼요." },
  { q: "상품권 월급 주면 어떤 처벌 받나요?", a: "2년 이하 징역 또는 2천만원 이하 벌금형을 받을 수 있어요. 근로자가 노동청에 신고하면 형사처벌 대상이에요." },
  { q: "상품권 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "상품권 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "근로기준법", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "임금-미지급-6개월-해결-방법", title: "임금 미지급 해결", description: "관련 내용 정리." },
  { slug: "임금명세서-교부-의무-기재-내용", title: "임금명세서 교부", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상품권 임금 지급 위법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임금은 통화(현금, 계좌이체)로 전액 지급이 원칙
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임금은 통화로 전액 지급이 원칙</H2>
      <p style={body}>근로기준법 제43조에서는 임금 지급 원칙 4가지를 정하고 있어요.</p>
      <GreenBox>
        임금은 통화(현금, 계좌이체)로 전액 지급이 원칙{"\n"}
        상품권, 현물 지급은 근로기준법 위반, 2년 이하 징역 또는 2천만원 이하 벌금{"\n"}
        근로자 동의해도 무효, 노동청 신고로 시정 가능
      </GreenBox>
      <p style={body}>통화 지급: 대한민국 원화로 지급해야 해요. 달러, 엔화 같은 외국 돈도 안 되고 상품권, 물건도 안 돼요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>근로자 동의해도 무효예요</H2>
      <p style={body}>"근로자가 괜찮다고 했는데요?"라고 항변해도 소용없어요. 근로기준법은 강행규정이라 당사자끼리 합의해도 법을 피해갈 수 없어요.</p>
      <BorderBox>
        <strong>근로자 동의해도 무효예요</strong><br />
        "근로자가 괜찮다고 했는데요?"라고 항변해도 소용없어요. 근로기준법은 강행규정이라 당사자끼리 합의해도 법을 피해갈 수 없어요.<br />
        예를 들어 월급 200만원 중 50만원을 상품권으로 주기로 근로자와 합의했다? 이 합의 자체가 무효예요. 근로자는 언제든 상품권 부분을 현금으로 달라고 청구할 수 있어요.
      </BorderBox>
      <p style={body}>예를 들어 월급 200만원 중 50만원을 상품권으로 주기로 근로자와 합의했다? 이 합의 자체가 무효예요. 근로자는 언제든 상품권 부분을 현금으로 달라고 청구할 수 있어요.</p>

      <Divider />
      <H2>상품권 임금 지급 시 처벌</H2>
      <p style={body}>사용자가 상품권으로 임금을 지급하면 근로기준법 제109조에 따라 2년 이하 징역 또는 2천만원 이하 벌금에 처해져요.</p>
      <p style={body}>근로자는 고용노동부 지청에 임금 지급 방법 위반으로 진정을 넣을 수 있어요. 노동청에서 조사 후 위반 사실이 확인되면 회사에 시정명령을 내리고, 불응하면 형사고발해요.</p>
      <p style={body}>이미 상품권으로 받은 금액은 현금으로 재청구할 수 있어요. 상품권 액면가만큼 임금 미지급으로 봐서 지연이자까지 붙어요.</p>

      <Divider />
      <H2>상품권 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
