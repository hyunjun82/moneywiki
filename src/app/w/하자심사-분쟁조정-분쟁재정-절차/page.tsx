"use client";

// Q1. 하자심사 절차에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 핵심 내용 확인
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "하자심사와 분쟁조정 차이가 뭔가요?", a: "하자심사는 하자 유무만 판단하고, 분쟁조정은 합의를 도와 해결해요. 분쟁재정은 강제력 있는 판정이에요." },
  { q: "하자심사 신청 비용이 드나요?", a: "신청비는 무료예요. 하지만 하자 감정이 필요하면 감정 비용이 발생할 수 있어요." },
  { q: "하자심사 결과에 불복하면 어떻게 하나요?", a: "분쟁조정이나 분쟁재정을 신청하거나, 법원에 소송을 제기할 수 있어요." },
  { q: "하자심사 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "하자심사 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "공동주택관리법", href: "https://www.law.go.kr/법령/공동주택관리법" },
  { name: "하자심사분쟁조정위원회", href: "https://www.adc.go.kr" },
];

const RELATED = [
  { slug: "아파트-하자보수-청구", title: "아파트 하자보수 청구", description: "관련 내용 정리." },
  { slug: "입주자대표회의-역할", title: "입주자대표회의 역할", description: "관련 내용 정리." },
  { slug: "아파트-하자담보책임", title: "아파트 하자담보책임", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        하자심사 분쟁조정 분쟁재정 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아파트 하자보수 분쟁이 생겼을 때 하자심사, 분쟁조정, 분쟁재정 중 어떤 절차를 밟아야 하는지 궁금하시죠?
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>하자심사·분쟁조정·분쟁재정, 뭐가 다른가요</H2>
      <p style={body}>간단히 말해, 세 가지는 목적과 효력이 달라요. 하자심사는 "이게 하자가 맞는지 아닌지"만 판단해요. 분쟁조정은 양쪽이 합의할 수 있게 도와주는 거고, 분쟁재정은 위원회가 강제로 결정을 내리는 거예요.</p>
      <GreenBox>
        아파트 하자보수 분쟁이 생겼을 때 하자심사, 분쟁조정, 분쟁재정 중 어떤 절차를 밟아야 하는지 궁금하시죠?
      </GreenBox>
      <p style={body}>A씨는 거실 바닥 균열로 하자심사를 신청했어요. 위원회가 "하자 맞다"고 판정했지만, 시공사가 보수 비용을 두고 다퉈서 결국 분쟁조정까지 갔어요. B씨는 처음부터 분쟁재정을 신청해서 위원회 결정으로 시공사가 보수하게 됐어요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>하자심사 절차, 단계별로 알아봐요</H2>
      <p style={body}>하자심사는 하자 유무만 판단하는 절차예요. 보수 책임이나 비용까지는 결정하지 않아요.</p>
      <BorderBox>
        <strong>하자심사 절차, 단계별로 알아봐요</strong><br />
        하자심사는 하자 유무만 판단하는 절차예요. 보수 책임이나 비용까지는 결정하지 않아요.<br />
        1단계 신청: 하자심사 신청서를 작성해서 제출해요. 신청서에는 하자 내용, 사진, 증거자료를 첨부하면 돼요. 피신청인(시공사) 수만큼 사본도 준비해야 해요.
      </BorderBox>
      <p style={body}>1단계 신청: 하자심사 신청서를 작성해서 제출해요. 신청서에는 하자 내용, 사진, 증거자료를 첨부하면 돼요. 피신청인(시공사) 수만큼 사본도 준비해야 해요.</p>

      <Divider />
      <H2>분쟁조정 절차, 합의가 목표예요</H2>
      <p style={body}>분쟁조정은 양쪽이 서로 합의해서 문제를 해결하도록 돕는 절차예요. 조정이 성립하면 재판상 화해와 같은 효력이 생겨요.</p>
      <p style={body}>1단계 신청 및 답변: 하자심사와 비슷하게 신청서 내고, 피신청인 답변서 받아요.</p>
      <p style={body}>2단계 의견 청취: 양쪽 의견을 듣고, 필요하면 화해를 권고해요.</p>

      <Divider />
      <H2>하자심사 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
