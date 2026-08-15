"use client";
// Q1. 연말정산 복지카드에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 장애인 복지카드 결제액도 신용카드 소득공제 대상이에요., 일반 신용카드와 동일하게 15% 공제율 적용돼요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "복지카드도 신용카드 소득공제를 받을 수 있나요?", a: "네, 일반 신용카드와 동일하게 15% 소득공제받을 수 있어요." },
  { q: "복지카드 공제율이 더 높은가요?", a: "아니요, 일반 신용카드와 동일한 15%예요. 별도 우대는 없어요." },
  { q: "체크카드 기능도 있으면 어떻게 되나요?", a: "체크카드로 결제하면 30% 공제율이 적용돼요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
  { name: "조세특례제한법", href: "https://www.law.go.kr/법령/조세특례제한법" },
];

const RELATED = [
  { slug: "연말정산-sinnyongkadeu-sodeukgongje", title: "연말정산 신용카드 소득공제", description: "관련 내용 정리." },
  { slug: "연말정산-jangaein-gongje", title: "연말정산 장애인 공제", description: "관련 내용 정리." },
  { slug: "연말정산-sodeukgongje", title: "연말정산 소득공제", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 복지카드
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        장애인 복지카드 결제액도 신용카드 소득공제 대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>복지카드 소득공제가 뭐예요?</H2>
      <p style={body}>장애인 복지카드는 지자체(시·군·구청)에서 발급하는 카드인데, 신용카드나 체크카드 기능이 있으면 연말정산 때 소득공제를 받을 수 있어요. 신용카드 기능이면 15%, 체크카드 기능이면 30% 공제율이 적용되죠. 복지카드라고 해서 특별히 높은 공제율이 있는 건 아니에요. 일반 카드와 동일하게 총급여의 25%를 초과한 금액부터 공제되고, 연간 한도도 300만원까지예요.</p>
      <GreenBox>
        장애인 복지카드 결제액도 신용카드 소득공제 대상이에요.{"\n"}
        일반 신용카드와 동일하게 15% 공제율 적용돼요.{"\n"}
        간소화서비스에서 자동 조회돼요.
      </GreenBox>

      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>체크카드 기능이 더 유리해요</H2>
      <p style={body}>복지카드 중에는 체크카드 기능이 있는 것도 있어요. 이 경우 신용카드(15%)보다 체크카드(30%)로 사용하는 게 유리해요. 같은 100만원을 써도 신용카드는 15만원 공제받지만 체크카드는 30만원 공제받으니까 2배 차이 나죠. 복지카드 발급받을 때 체크카드 기능으로 신청하는 게 절세에 유리해요.</p>
      <BorderBox>
        <strong>체크카드 기능이 더 유리해요</strong><br />
        복지카드 중에는 체크카드 기능이 있는 것도 있어요. 이 경우 신용카드(15%)보다 체크카드(30%)로 사용하는 게 유리해요. 같은 100만원을 써도 신용카드는 15만원 공제받지만 체크카드는 30만원 공제받으니까 2배
      </BorderBox>

      <Divider />
      <H2>장애인 추가공제와 별개예요</H2>
      <p style={body}>복지카드로 받는 신용카드 소득공제는 장애인 추가공제(200만원)와는 별개예요. 장애인 추가공제는 인적공제 항목이고, 신용카드 소득공제는 소득공제 항목이니까 둘 다 받을 수 있어요. 예를 들어 본인이 장애인이면 인적공제 150만원 + 장애인 추가공제 200만원 + 복지카드 신용카드 소득공제(사용액에 따라)를 모두 받는 거죠.</p>

      <Divider />
      <H2>연말정산 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
