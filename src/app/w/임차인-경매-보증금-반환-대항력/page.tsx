"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 임차인 경매 보증금에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 대항력과 우선변제권이 있으면 경매 낙찰금에서 보증금을 받을 수 있어요, 배당요구를 기한 내에 신청해야 배당받을 수 있어요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "경매 배당요구는 언제까지 해야 하나요?", a: "법원이 정한 배당요구 종기일까지 해야 해요. 이 기한을 놓치면 배당을 못 받을 수 있으니, 경매 진행 사실을 알았다면 바로 법원에 가서 배당요구 신청하세요." },
  { q: "대항력만 있고 확정일자가 없으면 보증금 못 받나요?", a: "배당은 못 받지만 낙찰자에게 보증금 돌려달라고 요구할 수 있어요. 낙찰자는 보증금을 돌려줄 때까지 임대차 관계가 계속되니까, 보증금 받을 때까지 계속 살 수 있어요." },
  { q: "소액보증금은 얼마까지 보호되나요?", a: "서울은 보증금 1억 7천만원 이하면 최대 5,500만원까지, 수도권 과밀억제권역은 1억 3천만원 이하에서 최대 4,800만원까지 보호돼요. 지역마다 다르니 확인해 보세요." },
  { q: "임차인 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "임차인 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "주택임대차 보증금 회수", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=629" },
];

const RELATED = [
  { slug: "주택임대차-대항력", title: "주택임대차 대항력 취득", description: "관련 내용 정리." },
  { slug: "전입신고-방법", title: "전입신고 방법", description: "관련 내용 정리." },
  { slug: "확정일자-받는-방법", title: "확정일자 받는 방법", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임차인 경매 보증금 반환 대항력 배당
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대항력과 우선변제권이 있으면 경매 낙찰금에서 보증금을 받을 수 있어요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임차인 경매 보증금, 돌려받을 수 있나요?</H2>
      <p style={body}>주택임대차보호법에 따르면 돌려받을 수 있어요. 하지만 조건이 있어요. 대항력이 있거나 확정일자를 받아뒀어야 해요.</p>
      <GreenBox>
        대항력과 우선변제권이 있으면 경매 낙찰금에서 보증금을 받을 수 있어요{"\n"}
        배당요구를 기한 내에 신청해야 배당받을 수 있어요{"\n"}
        소액보증금은 최우선으로 보호되지만 지역별 한도가 있어요
      </GreenBox>
      <p style={body}>대항력이란 쉽게 말해 "나 여기 먼저 살고 있었어!"라고 주장할 수 있는 권리예요. 전입신고하고 집을 인도받은 다음 날부터 대항력이 생겨요. 대항력만 있으면 경매로 집이 넘어가도 보증금 돌려받을 때까지 계속 살 수 있어요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>경매 대항력과 우선변제권 차이</H2>
      <p style={body}>대항력과 우선변제권은 비슷해 보이지만 보호하는 내용이 달라요.</p>
      <BorderBox>
        <strong>경매 대항력과 우선변제권 차이</strong><br />
        대항력과 우선변제권은 비슷해 보이지만 보호하는 내용이 달라요.<br />
        대항력은 '임대차 관계를 유지할 권리'예요. 집이 경매로 넘어가도 낙찰자에게 "보증금 돌려주기 전까지 나 여기 계속 살 거야"라고 말할 수 있어요. 대항력만 있으면 배당에는 참여 못 하지만, 낙찰자한테 보증금 돌려달
      </BorderBox>
      <p style={body}>대항력은 '임대차 관계를 유지할 권리'예요. 집이 경매로 넘어가도 낙찰자에게 "보증금 돌려주기 전까지 나 여기 계속 살 거야"라고 말할 수 있어요. 대항력만 있으면 배당에는 참여 못 하지만, 낙찰자한테 보증금 돌려달라고 요구하면서 거주를 계속할 수 있어요.</p>

      <Divider />
      <H2>경매 배당 절차와 배당요구 방법</H2>
      <p style={body}>경매가 진행되면 법원에서 배당요구 종기일을 정해요. 이 날짜까지 배당요구를 해야 배당을 받을 수 있어요.</p>
      <p style={body}>배당요구는 경매 법원에 신청하면 돼요. 신청서에 임대차계약서, 주민등록등본, 확정일자 증명서를 첨부해서 제출하면 돼요. 대항력과 확정일자가 있는 임차인은 꼭 배당요구를 해야 배당받을 수 있어요.</p>
      <p style={body}>배당기일이 되면 법원에서 배당표를 작성해요. 경매 낙찰금을 누가 얼마씩 받을지 정하는 거죠. 소액보증금 임차인이 제일 먼저 받고, 그다음에 근저당권자나 다른 채권자들이 순서대로 받아요.</p>

      <Divider />
      <H2>임차인 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
