"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 보일러 수리비 부담에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 보일러는 주요 시설물이므로 원칙적으로 임대인이 수선해야 해요, 세입자 과실로 고장났다면 세입자가 비용을 부담해야 해요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "전세 보일러 고장나면 누가 고치나요?", a: "원칙적으로 집주인(임대인)이 수리해야 해요. 보일러는 집의 주요 설비이고, 민법에서 임대인의 수선의무로 정하고 있거든요." },
  { q: "보일러 제가 실수로 고장냈으면 제 돈 내야 하나요?", a: "네, 세입자 과실이라면 세입자가 수리비를 부담해야 해요. 예를 들어 관리 소홀이나 부주의로 인한 고장은 세입자 책임이에요." },
  { q: "계약서에 보일러 세입자가 고친다고 써있으면 어떡하나요?", a: "대규모 수선은 특약이 있어도 임대인 의무로 인정돼요. 보일러 교체 같은 큰 수리는 집주인이 내야 해요." },
  { q: "임대차 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "임대차 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "민법", href: "https://www.law.go.kr/법령/민법" },
  { name: "찾기쉬운 생활법령정보 - 임대차", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=4&cciNo=2&cnpClsNo=2" },
];

const RELATED = [
  { slug: "임대차-수선의무", title: "임대차 수선의무", description: "관련 내용 정리." },
  { slug: "전월세-보증금-반환", title: "전월세 보증금 반환", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임대차 보일러 수리 비용 부담 임대인 임차인
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보일러는 주요 시설물이므로 원칙적으로 임대인이 수선해야 해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임대인의 수선의무 기본 원칙</H2>
      <p style={body}>민법 제623조에 따르면 임대인은 임차인에게 목적물을 사용·수익하게 할 의무가 있어요. 여기에는 임대차 목적물을 정상적으로 사용할 수 있도록 유지·보수할 의무도 포함돼요.</p>
      <GreenBox>
        보일러는 주요 시설물이므로 원칙적으로 임대인이 수선해야 해요{"\n"}
        세입자 과실로 고장났다면 세입자가 비용을 부담해야 해요{"\n"}
        특약이 있어도 대규모 수선은 임대인 의무로 인정돼요
      </GreenBox>
      <p style={body}>보일러는 집의 주요 시설물이에요. 겨울에 난방이 안 되면 정상적으로 거주할 수 없잖아요. 그래서 보일러 고장은 원칙적으로 임대인이 수선해야 하는 사항이에요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>보일러 수리비 임대인 부담 조건</H2>
      <p style={body}>임대인이 보일러 수리비를 부담해야 하는 경우는 크게 두 가지예요.</p>
      <BorderBox>
        <strong>보일러 수리비 임대인 부담 조건</strong><br />
        임대인이 보일러 수리비를 부담해야 하는 경우는 크게 두 가지예요.<br />
        첫째, 노후화로 인한 고장이에요. 보통 보일러 설치 후 7년 이상 지났다면 노후화로 인한 고장일 가능성이 크다고 봐요. 이런 경우 임대인이 전액 부담해야 해요.
      </BorderBox>
      <p style={body}>첫째, 노후화로 인한 고장이에요. 보통 보일러 설치 후 7년 이상 지났다면 노후화로 인한 고장일 가능성이 크다고 봐요. 이런 경우 임대인이 전액 부담해야 해요.</p>

      <Divider />
      <H2>보일러 수리비 임차인 부담 조건</H2>
      <p style={body}>반대로 세입자가 수리비를 내야 하는 경우도 있어요.</p>
      <p style={body}>첫째, 세입자 과실로 인한 고장이에요. 보일러 사용 중 부주의하거나 관리 소홀로 고장이 났다면 세입자 책임이에요. 예를 들어 동파 방지를 안 해서 겨울에 얼었다거나, 물을 너무 뜨겁게 해서 부품이 손상됐다거나 하는 경우죠.</p>
      <p style={body}>둘째, 설치 후 7년 이하인 보일러인데 세입자에게 명백한 과실이 있는 경우예요. 보일러가 비교적 새 거라면 정상적으로 사용했으면 고장날 리가 없거든요.</p>

      <Divider />
      <H2>임대차 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
