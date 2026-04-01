"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 모델하우스 실제 차이에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 모델하우스와 실제가 다르면 계약 내용 불일치로 손해배상 청구 가능해요, 분양계약서와 설계도서를 기준으로 판단해요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "모델하우스는 법적 효력이 있나요?", a: "모델하우스 자체보다는 분양계약서와 설계도서가 법적 기준이에요. 다만 모델하우스에서 본 내용이 계약서에 포함되어 있다면 계약 내용으로 인정돼요." },
  { q: "어떤 차이가 손해배상 대상인가요?", a: "바닥재 종류, 창호 재질, 마감재 등급처럼 가격이나 품질에 영향을 주는 중요한 차이예요. 색상이나 미세한 디자인 차이는 인정되기 어려워요." },
  { q: "손해배상은 어떻게 청구하나요?", a: "먼저 건설사에 하자보수나 교체를 요청하고, 거부하면 하자심사분쟁조정위원회에 조정을 신청하거나 법원에 손해배상 청구소송을 제기할 수 있어요." },
  { q: "모델하우스와 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "모델하우스와 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "주택법", href: "https://www.law.go.kr" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" },
];

const RELATED = [
  { slug: "아파트-하자보수-청구", title: "아파트 하자보수 청구", description: "관련 내용 정리." },
  { slug: "분양계약-해제", title: "분양계약 해제", description: "관련 내용 정리." },
  { slug: "하자담보책임-기간", title: "하자담보책임 기간", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        모델하우스와 실제 아파트 다를 때 손해배상
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        모델하우스와 실제가 다르면 계약 내용 불일치로 손해배상 청구 가능해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>모델하우스와 실제 차이, 문제가 되나요?</H2>
      <p style={body}>모델하우스는 아파트 분양을 위해 건설사가 만든 견본 주택이에요. 실제 입주할 아파트와 최대한 비슷하게 만들지만, 항상 똑같지는 않아요.</p>
      <GreenBox>
        모델하우스와 실제가 다르면 계약 내용 불일치로 손해배상 청구 가능해요{"\n"}
        분양계약서와 설계도서를 기준으로 판단해요{"\n"}
        사소한 차이는 인정 안 될 수 있으니 중요한 부분인지 확인해야 해요
      </GreenBox>
      <p style={body}>주택법과 관련 규정에 따르면, 분양계약의 기준은 분양계약서와 설계도서예요. 모델하우스는 참고 자료일 뿐이죠.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>손해배상 청구 가능한 차이</H2>
      <p style={body}>모든 차이가 손해배상 대상은 아니에요. 중요한 부분의 차이여야 해요.</p>
      <BorderBox>
        <strong>손해배상 청구 가능한 차이</strong><br />
        모든 차이가 손해배상 대상은 아니에요. 중요한 부분의 차이여야 해요.<br />
        상황을 보면, A씨는 모델하우스에서 본 원목 마루가 계약서에 '강화마루'로 표기된 걸 나중에 발견했어요. 실제로는 일반 강화마루가 시공됐고, 계약서대로여서 청구가 어려웠죠. B씨는 계약서에 '원목 마루'라고 명시돼 
      </BorderBox>
      <p style={body}>상황을 보면, A씨는 모델하우스에서 본 원목 마루가 계약서에 '강화마루'로 표기된 걸 나중에 발견했어요. 실제로는 일반 강화마루가 시공됐고, 계약서대로여서 청구가 어려웠죠. B씨는 계약서에 '원목 마루'라고 명시돼 있었는데 실제는 강화마루여서 손해배상을 받았어요.</p>

      <Divider />
      <H2>손해배상 청구 절차</H2>
      <p style={body}>먼저 건설사에 하자보수나 교체를 요청해야 해요. 내용증명으로 보내면 법적 증거가 남아요.</p>
      <p style={body}>건설사가 거부하거나 응답이 없으면, 하자심사분쟁조정위원회에 조정을 신청할 수 있어요. 소송보다 빠르고 비용도 적게 들어요.</p>
      <p style={body}>조정이 안 되면 법원에 손해배상 청구소송을 제기하면 돼요. 모델하우스 사진, 분양계약서, 설계도서, 실제 시공 사진 등을 증거로 제출해야 해요.</p>

      <Divider />
      <H2>모델하우스와 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
