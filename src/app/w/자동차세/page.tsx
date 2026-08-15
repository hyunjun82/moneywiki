"use client";
// Q1. 자동차세 계산에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 자동차 소유자에게 부과되는 지방세로 배기량에 따라 cc당 80~200원이에요., 2,000cc 승용차 기준 연 52만원이고 전기차는 연 13만원 정액이에요.
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "자동차세는 1년에 얼마인가요?", a: "2,000cc 승용차 기준 연 52만원이며, 배기량에 따라 다릅니다." },
  { q: "자동차세 연납 할인은 얼마인가요?", a: "1월 연납 시 약 4.6% 할인됩니다. 3월, 6월, 9월에도 할인 혜택이 있습니다." },
  { q: "전기차 자동차세는 얼마인가요?", a: "전기차는 배기량 기준이 없어 연 13만원(비영업용 기준) 정액입니다." },
  { q: "자동차세 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "자동차세 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "지방세법", href: "https://www.law.go.kr/법령/지방세법" },
  { name: "위택스", href: "https://www.wetax.go.kr" },
];

const RELATED = [
  { slug: "부동산/취득세-세율", title: "취득세 세율", description: "관련 내용 정리." },
  { slug: "세금/등록면허세", title: "등록면허세", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자동차세 세율 및 납부 방법: 배기량별 과세 기준·연납 할인
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자동차 소유자에게 부과되는 지방세로 배기량에 따라 cc당 80~200원이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>자동차세가 뭐예요?</H2>
      <p style={body}>자동차세는 자동차 소유자한테 부과되는 지방세예요. 지방세법에서 정하고 있어요. 시·군·구에서 걷는 세금이라서 지역마다 조금씩 다를 수 있어요.</p>
      <GreenBox>
        자동차 소유자에게 부과되는 지방세로 배기량에 따라 cc당 80~200원이에요.{"\n"}
        2,000cc 승용차 기준 연 52만원이고 전기차는 연 13만원 정액이에요.{"\n"}
        1월 연납 시 약 4.6% 할인받고 3월, 6월, 9월에도 할인 혜택이 있어요.
      </GreenBox>
      <p style={body}>등록된 자동차 소유자면 다 내야 해요. 승용차, 승합차, 화물차, 이륜차 다 대상이에요. 건설기계 중에서도 일부는 자동차세 내야 하고요.</p>

      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>자동차세 세율은 얼마예요?</H2>
      <p style={body}>비영업용 승용차는 배기량에 따라 cc당 80원, 140원, 200원이에요. 1,000cc 이하는 cc당 80원, 1,000cc 초과 1,600cc 이하는 140원, 1,600cc 초과는 200원이죠.</p>
      <BorderBox>
        <strong>자동차세 세율은 얼마예요?</strong><br />
        비영업용 승용차는 배기량에 따라 cc당 80원, 140원, 200원이에요. 1,000cc 이하는 cc당 80원, 1,000cc 초과 1,600cc 이하는 140원, 1,600cc 초과는 200원이죠.<br />
        비영업용 승용차 세율:
- 1,000cc 이하: cc당 80원
- 1,000cc 초과~1,600cc 이하: cc당 140원
- 1,600cc 초과: cc당 200원
      </BorderBox>
      <p style={body}>비영업용 승용차 세율:
- 1,000cc 이하: cc당 80원
- 1,000cc 초과~1,600cc 이하: cc당 140원
- 1,600cc 초과: cc당 200원</p>

      <Divider />
      <H2>전기차 자동차세는 얼마예요?</H2>
      <p style={body}>전기차는 배기량이 없으니까 정액으로 내요. 비영업용은 연 13만원이에요. 2,000cc 승용차가 52만원인 거에 비하면 4분의 1 수준이죠.</p>
      <p style={body}>수소차도 전기차랑 똑같이 연 13만원이에요. 친환경 차라서 세금 혜택 많이 주는 거예요. 테슬라든 아이오닉5든 다 13만원만 내요.</p>
      <p style={body}>영업용 전기차는 연 2만원이에요. 전기택시 같은 거예요. 비영업용보다 훨씬 싸죠. 영업용은 원래 세금이 낮은데 전기차라서 더 낮은 거예요.</p>

      <Divider />
      <H2>자동차세 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
