"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. KB국민카드 아이행복카드에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. KB국민카드 아이행복카드는 체크카드와 신용카드 선택이 가능해요, 대형마트, 온라인쇼핑, 통신비, 관리비 할인 혜택이 있어요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "KB국민카드 아이행복카드 체크카드도 되나요?", a: "네, 신용카드와 체크카드 둘 다 발급 가능해요. 본인 상황에 맞게 선택하면 돼요." },
  { q: "KB국민카드 아이행복카드 연회비 있나요?", a: "연회비는 무료예요. 신용카드든 체크카드든 유지 비용 걱정 없이 쓸 수 있어요." },
  { q: "KB국민카드 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "KB국민카드 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "KB국민카드 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국민행복카드 공식", href: "http://www.voucher.go.kr/card/childCare.do" },
  { name: "KB국민카드 공식", href: "https://card.kbcard.com" },
];

const RELATED = [
  { slug: "어린이집-보육료-결제-및-아이행복카드-발급-방법", title: "어린이집 보육료 결제 및 아이행복카드 발급 방법", description: "관련 내용 정리." },
  { slug: "첫만남-이용권-바우처-사용처-및-잔액-조회", title: "첫만남 이용권 바우처 사용처 및 잔액 조회", description: "관련 내용 정리." },
  { slug: "에너지바우처-신청방법-대상-지원금액", title: "에너지바우처 신청방법 대상 지원금액", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        KB국민카드 아이행복카드: 발급 방법 및 혜택 완벽 가이드
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        KB국민카드 아이행복카드는 체크카드와 신용카드 선택이 가능해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>KB국민카드 아이행복카드가 뭔가요?</H2>
      <p style={body}>보육료 결제하면서 생활비 절약까지 할 수 있는 정부 바우처 카드예요.</p>
      <GreenBox>
        KB국민카드 아이행복카드는 체크카드와 신용카드 선택이 가능해요{"\n"}
        대형마트, 온라인쇼핑, 통신비, 관리비 할인 혜택이 있어요{"\n"}
        연회비 무료이고 만 0~5세 자녀를 둔 부모라면 누구나 발급받을 수 있어요
      </GreenBox>
      <p style={body}>KB국민카드 아이행복카드는 만 0~5세 자녀를 둔 부모나 보호자가 어린이집 보육료나 유치원 학비를 정부 지원금으로 결제할 수 있는 카드예요. 국민행복카드 공식 사이트에서 관리하는 바우처 시스템과 연동되어 있어서, 보육료 결제 시 정부 지원금이 자동으로 차감돼요. KB국민카드의 장점은 체크카드와 신용카드 선택 폭이 넓다는 거예요. 신용등급이 낮거나 신용카드 발급이 어려운 분은 체크카드로 신청할 수 있고, 신용카드를 원하는 분은 신용카드로 신청하면 돼요. 보육료 결제 외에도 대형마트, 온라인쇼핑몰, 홈쇼핑, 통신비, 관리비 할인 같은 생활 혜택이 많아서 누구나 신청할 수 있는 생활카드예요. 연회비는 무료예요. 자세한 보육료 결제 방법은 어린이집 보육료 결제 및 아이행복카드 발급 방법에서 확인하세요.</p>

      <CategoryButton label="복지" count={10} href="/category/%EB%B3%B5%EC%A7%80" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>국민카드 아이행복카드 혜택은 뭐가 있나요?</H2>
      <p style={body}>대형마트, 온라인쇼핑, 통신비, 관리비 할인과 캐시백 혜택을 받을 수 있어요.</p>
      <BorderBox>
        <strong>국민카드 아이행복카드 혜택은 뭐가 있나요?</strong><br />
        대형마트, 온라인쇼핑, 통신비, 관리비 할인과 캐시백 혜택을 받을 수 있어요.<br />
        KB국민카드 아이행복카드는 캐시백 중심의 혜택이 특징이에요. 먼저 대형마트에서 결제하면 할인을 받을 수 있어요. 이마트, 롯데마트, 홈플러스 같은 곳에서 장볼 때 유용하죠. 온라인쇼핑몰 할인도 있어서 11번가, G마
      </BorderBox>
      <p style={body}>KB국민카드 아이행복카드는 캐시백 중심의 혜택이 특징이에요. 먼저 대형마트에서 결제하면 할인을 받을 수 있어요. 이마트, 롯데마트, 홈플러스 같은 곳에서 장볼 때 유용하죠. 온라인쇼핑몰 할인도 있어서 11번가, G마켓, 쿠팡 같은 곳에서 육아용품 살 때 할인받을 수 있어요. 홈쇼핑 할인도 제공되고, 통신비나 관리비 결제 시에도 할인이 적용돼요. 캐시백 혜택은 전월 실적 조건에 따라 달라질 수 있으니까 KB국민카드 홈페이지에서 확인하는 게 좋아요. 어린이집이나 유치원 외 일반 가맹점에서 사용할 때 이런 할인과 캐시백 혜택이 적용되는 거예요. 비슷한 복지 카드로는 첫만남 이용권 바우처도 있어요.</p>

      <Divider />
      <H2>KB아이행복카드 발급은 어떻게 하나요?</H2>
      <p style={body}>복지로 홈페이지나 KB국민카드 영업점에서 신청하면 돼요.</p>
      <p style={body}>KB국민카드 아이행복카드 발급 방법은 크게 세 가지예요. 첫 번째는 복지로 홈페이지에서 온라인 신청하는 방법이고, 두 번째는 가까운 KB국민카드 영업점을 방문해서 신청하는 방법, 세 번째는 KB국민카드 공식 사이트에서 직접 신청하는 방법이에요. 발급 대상은 만 0~5세 자녀를 둔 부모나 보호자이고, 신청할 때 부모 명의로 발급받으면 돼요. 신용카드와 체크카드 중 선택할 수 있고, 신용등급이 낮아도 체크카드는 발급받을 수 있어요. 카드가 발급된 후에는 복지로에서 아이행복카드 사용신청을 완료해야 보육료나 유아학비 결제가 가능해요. 연회비는 무료이고, 복지로에서 별도의 보육료 지원 신청을 완료해야 바우처 기능이 활성화되니까 꼭 기억하세요.</p>

      <Divider />
      <H2>KB국민카드 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
