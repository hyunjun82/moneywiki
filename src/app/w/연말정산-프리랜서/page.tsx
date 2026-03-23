"use client";

// Q1. 연말정산 프리랜서에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 프리랜서는 연말정산 대상이 아니고 5월 종합소득세 신고로 정산해요., 3.3% 원천징수(소득세 3% + 지방세 0.3%)로 미리 세금을 내요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "프리랜서도 연말정산 하나요?", a: "아니요. 프리랜서는 연말정산 대상이 아니고 5월 종합소득세 신고해요." },
  { q: "3.3% 세금은 뭔가요?", a: "사업소득 원천징수세율(소득세 3% + 지방세 0.3%)이에요. 미리 낸 세금이에요." },
  { q: "프리랜서도 환급받을 수 있나요?", a: "네. 5월 종소세 신고하면 경비 공제받아서 3.3% 환급받을 수 있어요." },
  { q: "직장 다니면서 프리랜서로 부업하면요?", a: "연말정산은 회사에서 하고, 프리랜서 소득은 5월에 합산 신고해요." },
  { q: "경비 어떻게 공제해요?", a: "단순경비율, 기준경비율, 장부기장 중 선택해요. 수입에 따라 유리한 방법이 달라요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법 제70조", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-기타소득", title: "연말정산 기타소득", description: "관련 내용 정리." },
  { slug: "연말정산", title: "연말정산", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 프리랜서
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        프리랜서는 연말정산 대상이 아니고 5월 종합소득세 신고로 정산해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>프리랜서는 연말정산 안 해요?</H2>
      <p style={body}>안 해요. 5월에 종소세 신고해요.</p>
      <GreenBox>
        프리랜서는 연말정산 대상이 아니고 5월 종합소득세 신고로 정산해요.{"\n"}
        3.3% 원천징수(소득세 3% + 지방세 0.3%)로 미리 세금을 내요.{"\n"}
        경비가 많으면 3.3% 환급받을 수 있어요.
      </GreenBox>
      <p style={body}>프리랜서 세금 정산:
- 연말정산: 대상 아님
- 종합소득세 신고: 5월에 직접 신고
- 원천징수: 3.3% 미리 납부</p>

      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>3.3%가 뭐예요?</H2>
      <p style={body}>프리랜서 대가를 받을 때 3.3%를 원천징수당해요.</p>
      <BorderBox>
        <strong>3.3%가 뭐예요?</strong><br />
        프리랜서 대가를 받을 때 3.3%를 원천징수당해요.<br />
        3.3% 구성:
- 소득세: 3%
- 지방소득세: 0.3%
- 합계: 3.3%
      </BorderBox>
      <p style={body}>3.3% 구성:
- 소득세: 3%
- 지방소득세: 0.3%
- 합계: 3.3%</p>

      <Divider />
      <H2>환급받을 수 있어요?</H2>
      <p style={body}>5월 종소세 신고할 때 경비를 공제받아요. 실제 내야 할 세금이 3.3%보다 적으면 환급받아요.</p>
      <p style={body}>환급받을 수 있는 경우:
- 경비가 많을 때
- 수입이 적을 때
- 기타 공제가 많을 때</p>
      <p style={body}>예시 (연 수입 2천만원):
- 원천징수: 66만원 (2천만원 × 3.3%)
- 경비 공제 후 결정세액: 30만원
- 환급: 36만원</p>

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
