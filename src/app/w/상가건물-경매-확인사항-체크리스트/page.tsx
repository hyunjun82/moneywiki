"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 상가건물 경매 확인사항에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 권리분석을 위해 부동산등기기록, 건축물대장, 토지이용계획확인서를 확인하고 현장조사를 통해 임차인 유무를 파악해야 해요, 대항력 있는 임차권은 매수인에게 인수될 수 있으니, 임차인 보증금과 배당요구 여부를 필수로 확인하세요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "상가 경매 권리분석 어떻게 하나요?", a: "부동산등기기록에서 근저당권, 가압류, 임차권등기 등을 확인하고, 매각기준일 이전에 설정된 권리들이 소멸하는지 인수되는지 판단해야 해요." },
  { q: "상가 경매 낙찰 후 임차인이 안 나가면 어떡하나요?", a: "대항력 있는 임차인은 보증금을 전액 배당받지 못하면 매수인에게 인수돼요. 인수되면 보증금을 돌려줘야 임차인이 나가요." },
  { q: "상가 경매 현장조사에서 뭘 봐야 하나요?", a: "임차인 유무, 영업 상태, 주변 상권, 접근성, 주차 여건, 건물 상태 등을 직접 눈으로 확인해야 해요." },
  { q: "상가건물 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "상가건물 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "찾기쉬운 생활법령정보 - 부동산 경매", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=2&cciNo=2&cnpClsNo=2" },
  { name: "대법원경매사이트", href: "https://www.courtauction.go.kr" },
  { name: "민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
];

const RELATED = [
  { slug: "상가건물-임대차보호법", title: "상가건물 임대차보호법", description: "관련 내용 정리." },
  { slug: "경매-낙찰-후-절차", title: "경매 낙찰 후 절차", description: "관련 내용 정리." },
  { slug: "상가-권리금", title: "상가 권리금", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상가건물 경매 확인사항 체크리스트 권리분석
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        권리분석을 위해 부동산등기기록, 건축물대장, 토지이용계획확인서를 확인하고 현장조사를 통해 임차인 유무를 파악해야 해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>상가건물 경매, 주택과 뭐가 다른가요?</H2>
      <p style={body}>상가건물 경매는 주택 경매보다 훨씬 복잡해요. 주택은 사람이 사는 곳이지만, 상가는 장사하는 곳이기 때문에 수익성, 상권, 임차인 구성 등 고려할 게 많거든요.</p>
      <GreenBox>
        권리분석을 위해 부동산등기기록, 건축물대장, 토지이용계획확인서를 확인하고 현장조사를 통해 임차인 유무를 파악해야 해요{"\n"}
        대항력 있는 임차권은 매수인에게 인수될 수 있으니, 임차인 보증금과 배당요구 여부를 필수로 확인하세요{"\n"}
        상가 입지, 수익률, 용도지역, 임차인 구성 등을 종합적으로 검토해야 낙찰 후 손해를 보지 않아요
      </GreenBox>
      <p style={body}>또 상가건물 임대차보호법은 주택임대차보호법과 보호 범위가 다르고, 보증금 기준도 지역마다 달라요. 서울은 보증금 9억원 이하, 수도권 과밀억제권역은 6억9천만원 이하, 그 외 지역은 5억4천만원 이하만 보호받아요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>상가 경매 권리분석 필수 확인사항</H2>
      <p style={body}>권리분석은 경매의 핵심이에요. 낙찰받은 후 어떤 권리가 소멸하고 어떤 권리가 인수되는지 알아야 손해를 보지 않아요.</p>
      <BorderBox>
        <strong>상가 경매 권리분석 필수 확인사항</strong><br />
        권리분석은 경매의 핵심이에요. 낙찰받은 후 어떤 권리가 소멸하고 어떤 권리가 인수되는지 알아야 손해를 보지 않아요.<br />
        대법원경매사이트에서 부동산등기기록을 열람하세요. 근저당권, 가압류, 가등기, 임차권등기 등 모든 권리를 확인해야 해요. 매각기준일보다 먼저 설정된 권리들이 낙찰 후 소멸되는지 인수되는지 판단하는 게 핵심이에요.
      </BorderBox>
      <p style={body}>대법원경매사이트에서 부동산등기기록을 열람하세요. 근저당권, 가압류, 가등기, 임차권등기 등 모든 권리를 확인해야 해요. 매각기준일보다 먼저 설정된 권리들이 낙찰 후 소멸되는지 인수되는지 판단하는 게 핵심이에요.</p>

      <Divider />
      <H2>임차인 확인이 가장 중요해요</H2>
      <p style={body}>상가 경매에서 가장 조심해야 할 부분이 바로 임차인이에요. 주택보다 보증금 규모가 크고, 권리금 문제도 복잡하거든요.</p>
      <p style={body}>사업자등록을 마치고 건물을 인도받은 임차인은 대항력을 가져요. 대항력이 있으면 매수인에게 보증금 반환을 청구할 수 있어요. 배당절차에서 보증금을 전액 받지 못하면 임차권이 매수인에게 인수돼요.</p>
      <p style={body}>인수된다는 건, 낙찰받은 후에도 임차인이 그대로 있고, 매수인이 보증금을 돌려줘야 임차인이 나간다는 뜻이에요. 3억원 보증금의 임차인이 인수되면, 낙찰가 외에 3억원을 추가로 부담해야 하는 거죠.</p>

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
