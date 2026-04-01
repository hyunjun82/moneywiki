"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 기간제근로자 정기상여금에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 기간제근로자도 정규직과 동일한 정기상여금을 받을 수 있어요. 근로계약 기간이 다르다는 이유만으로 차별할 수 없어요., 정기상여금은 매월 또는 분기별로 지급되는 성과금이나 보너스로, 정규직과 동일한 기준으로 지급해야 해요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "기간제라는 이유로 상여금을 안 줘도 되나요?", a: "안 돼요. 근로계약 기간이 다르다는 이유만으로 정기상여금을 안 주거나 적게 주는 건 불합리한 차별이에요." },
  { q: "정기상여금은 어떤 기준으로 지급되나요?", a: "정규직과 동일한 기준으로 지급돼요. 재직기간, 성과, 직급 등 합리적인 사유로만 차등 지급이 가능해요." },
  { q: "차별받으면 어디에 신고하나요?", a: "노동위원회에 시정신청을 하거나 고용노동부에 진정을 제기할 수 있어요. 회사는 차별을 시정하고 손해배상을 해야 해요." },
  { q: "기간제근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "기간제근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "기간제 및 단시간근로자 보호 등에 관한 법률", href: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "기간제근로자-근로계약", title: "기간제근로자 근로계약", description: "관련 내용 정리." },
  { slug: "퇴직급여-지급-대상-조건", title: "퇴직금 지급 대상", description: "관련 내용 정리." },
  { slug: "부당해고-구제", title: "부당해고 구제", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기간제근로자 정기상여금 동일
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기간제근로자도 정규직과 동일한 정기상여금을 받을 수 있어요. 근로계약 기간이 다르다는 이유만으로 차별할 수 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기간제근로자 정기상여금 지급 의무</H2>
      <p style={body}>기간제 및 단시간근로자 보호 등에 관한 법률에서는 기간제근로자라는 이유만으로 차별하는 걸 금지하고 있어요. 정기상여금도 마찬가지예요.</p>
      <GreenBox>
        기간제근로자도 정규직과 동일한 정기상여금을 받을 수 있어요. 근로계약 기간이 다르다는 이유만으로 차별할 수 없어요.{"\n"}
        정기상여금은 매월 또는 분기별로 지급되는 성과금이나 보너스로, 정규직과 동일한 기준으로 지급해야 해요.{"\n"}
        차별받았다면 노동위원회에 시정신청을 하거나 고용노동부에 진정을 제기할 수 있어요.
      </GreenBox>
      <p style={body}>정기상여금은 매월, 분기별, 또는 연간 단위로 지급되는 보너스나 성과금을 말해요. 회사가 정규직에게 정기상여금을 지급하고 있다면, 기간제근로자에게도 동일한 기준으로 지급해야 해요. 근로계약 기간이 2년이든 6개월이든 상관없어요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>정기상여금 동일 지급 기준</H2>
      <p style={body}>정기상여금은 정규직과 동일한 기준으로 지급돼요. 회사가 정규직에게 매월 기본급의 100%를 상여금으로 준다면, 기간제근로자에게도 동일하게 100%를 줘야 해요.</p>
      <BorderBox>
        <strong>정기상여금 동일 지급 기준</strong><br />
        정기상여금은 정규직과 동일한 기준으로 지급돼요. 회사가 정규직에게 매월 기본급의 100%를 상여금으로 준다면, 기간제근로자에게도 동일하게 100%를 줘야 해요.<br />
        재직기간, 성과, 직급 같은 합리적인 사유로만 차등 지급이 가능해요. "A씨는 3년 근무했고 B씨는 6개월 근무했으니 성과급을 다르게 줘야 한다"는 건 합리적이에요. 하지만 "A씨는 정규직이고 B씨는 계약직이니까"는
      </BorderBox>
      <p style={body}>재직기간, 성과, 직급 같은 합리적인 사유로만 차등 지급이 가능해요. "A씨는 3년 근무했고 B씨는 6개월 근무했으니 성과급을 다르게 줘야 한다"는 건 합리적이에요. 하지만 "A씨는 정규직이고 B씨는 계약직이니까"는 합리적인 사유가 아니에요.</p>

      <Divider />
      <H2>기간제 정기상여금 차별 구제 방법</H2>
      <p style={body}>차별받았다면 구제 방법이 있어요. 노동위원회에 시정신청을 할 수 있어요. 차별적 처우가 있은 날부터 6개월 이내에 신청해야 해요.</p>
      <p style={body}>고용노동부에 진정을 제기할 수도 있어요. 고용노동부에서 진정서를 작성해 제출하면 근로감독관이 조사해요. 위반이 확인되면 시정 명령을 내려요.</p>
      <p style={body}>회사가 시정 명령을 따르지 않으면 3년 이하 징역 또는 3천만원 이하 벌금에 처해질 수 있어요. 근로자는 차별로 인한 손해배상도 청구할 수 있어요. 부당해고 구제 절차와 유사하게 진행돼요.</p>

      <Divider />
      <H2>기간제근로자 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
