"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 상가건물 압류 임차인에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 핵심 내용 확인
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "상가건물이 압류되면 보증금 돌려받을 수 없나요?", a: "대항력과 우선변제권이 있고 배당요구를 하면 돌려받을 수 있어요. 조건 충족 여부가 핵심이에요." },
  { q: "건물 압류됐는데 계속 월세 내야 하나요?", a: "배당요구 후에는 월세를 내지 말고 보증금에서 공제했다고 주장하세요. 나중에 보증금 받을 때 차감돼요." },
  { q: "상가건물 압류 시 임차권은 어떻게 되나요?", a: "보증금 전액 받으면 임차권이 소멸하지만, 일부만 받거나 못 받으면 새 소유자에게 임차권이 인수돼요." },
  { q: "상가건물 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "상가건물 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "상가건물 임대차보호법", href: "https://www.law.go.kr/법령/상가건물_임대차보호법" },
  { name: "민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
];

const RELATED = [
  { slug: "상가건물-대항력-확정일자", title: "상가건물 대항력 확정일자", description: "관련 내용 정리." },
  { slug: "상가건물-보증금-회수", title: "상가건물 보증금 회수", description: "관련 내용 정리." },
  { slug: "부동산-경매-임차인-권리", title: "부동산 경매 임차인 권리", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상가건물 압류 임차인 대응방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        상가건물 임차 중 건물이 압류되었다는 통지를 받았다면, 어떻게 대응해야 보증금을 지킬 수 있을까요?
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>상가건물 압류, 임차인 권리부터 확인하세요</H2>
      <p style={body}>간단히 말해, 건물이 압류됐다고 해서 무조건 보증금을 못 받는 건 아니에요. 핵심은 내가 법적으로 보호받을 수 있는 조건을 갖췄느냐예요.</p>
      <GreenBox>
        상가건물 임차 중 건물이 압류되었다는 통지를 받았다면, 어떻게 대응해야 보증금을 지킬 수 있을까요?
      </GreenBox>
      <p style={body}>상가건물 임대차보호법에 따르면, 상가건물을 인도받고 사업자등록을 마치면 그 다음 날부터 대항력이 생겨요. 여기에 확정일자까지 받았다면 우선변제권도 생기죠.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>배당요구, 반드시 기간 내에 하세요</H2>
      <p style={body}>A씨는 상가 음식점을 운영하는데, 건물 인도와 사업자등록을 마치고 확정일자도 받았어요. B씨는 같은 건물에서 옷가게를 하는데, 사업자등록만 하고 확정일자는 안 받았어요. 건물이 압류되고 경매로 넘어갔을 때, A씨는 배당요구를 해서 보증금 전액을 받았지만, B씨는 우선변제권이 없어서 일부만 받았어요.</p>
      <BorderBox>
        <strong>배당요구, 반드시 기간 내에 하세요</strong><br />
        A씨는 상가 음식점을 운영하는데, 건물 인도와 사업자등록을 마치고 확정일자도 받았어요. B씨는 같은 건물에서 옷가게를 하는데, 사업자등록만 하고 확정일자는 안 받았어요. 건물이 압류되고 경매로 넘어갔을 때, A씨는 <br />
        경매 절차가 시작되면 법원에서 배당요구 종기일(마감일)을 정해요. 이 기간 안에 대법원 경매정보에서 배당요구 신청을 해야 해요. 기간 놓치면 배당에서 빠질 수 있으니 절대 놓치면 안 돼요.
      </BorderBox>
      <p style={body}>경매 절차가 시작되면 법원에서 배당요구 종기일(마감일)을 정해요. 이 기간 안에 대법원 경매정보에서 배당요구 신청을 해야 해요. 기간 놓치면 배당에서 빠질 수 있으니 절대 놓치면 안 돼요.</p>

      <Divider />
      <H2>경매 진행 중 월세는 어떻게 하나요</H2>
      <p style={body}>핵심은 배당요구를 한 시점부터는 월세를 내지 말라는 거예요. "보증금에서 월세를 공제했다"고 주장하면 돼요.</p>
      <p style={body}>왜냐하면 건물주가 경제적으로 어려워 압류까지 당한 상황에서, 계속 월세를 내봤자 나중에 돌려받기 어렵거든요. 법원도 이런 상황에서는 월세를 보증금에서 차감하는 걸 인정해요.</p>
      <p style={body}>단, 배당요구 전까지는 월세를 내야 해요. 배당요구 후부터 중단하는 게 원칙이에요.</p>

      <Divider />
      <H2>상가건물 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
