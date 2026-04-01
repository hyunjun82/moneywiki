"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 농지전용허가 처벌에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 농업진흥지역은 5년 이하 징역 또는 토지가액 상당 벌금이에요, 농업진흥지역 밖은 3년 이하 징역 또는 토지가액 50% 벌금이에요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "농지전용허가는 어디서 받나요?", a: "농지가 있는 시·군·구청에서 받아요. 용도에 따라 시장·군수 또는 농림축산식품부장관 허가예요." },
  { q: "원상회복 명령 안 따르면 어떻게 되나요?", a: "행정청이 강제로 원상회복하는 대집행을 해요. 비용은 토지 소유자가 부담하고요." },
  { q: "농지전용 신고만 하면 되는 경우도 있나요?", a: "네, 농업인 주택 같은 일부 용도는 신고만으로 가능해요. 면적과 용도에 따라 달라요." },
  { q: "농지전용허가 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "농지전용허가 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "농지법", href: "https://www.law.go.kr/법령/농지법" },
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1815&ccfNo=2&cciNo=1&cnpClsNo=1" },
];

const RELATED = [
  { slug: "농지전용허가-신청", title: "농지전용허가 신청", description: "관련 내용 정리." },
  { slug: "농지-취득-자격", title: "농지 취득 자격", description: "관련 내용 정리." },
  { slug: "농업진흥지역-확인", title: "농업진흥지역 확인", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농지전용허가 안 받고 전용하면 처벌
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        농업진흥지역은 5년 이하 징역 또는 토지가액 상당 벌금이에요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>농지전용허가, 왜 필요한가요</H2>
      <p style={body}>농지는 우리나라 식량 생산의 기반이에요. 함부로 다른 용도로 바꾸면 농지가 줄어들어서 식량 자급률이 떨어지죠. 그래서 농지법에서 농지를 다른 용도로 쓰려면 반드시 허가나 신고를 받도록 정해놨어요.</p>
      <GreenBox>
        농업진흥지역은 5년 이하 징역 또는 토지가액 상당 벌금이에요{"\n"}
        농업진흥지역 밖은 3년 이하 징역 또는 토지가액 50% 벌금이에요{"\n"}
        형사처벌과 별도로 원상회복 명령 받고 대집행될 수 있어요
      </GreenBox>
      <p style={body}>농지전용은 농지를 농업 생산이나 농지개량 외의 용도로 사용하는 걸 말해요. 예를 들어 밭에 건물 짓거나, 논을 주차장으로 만들거나, 농지를 도로로 쓰는 게 다 전용이에요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>농지전용허가 처벌, 얼마나 무거운가요</H2>
      <p style={body}>농지법 제58조에서 처벌 규정을 정하고 있어요. 농업진흥지역과 그 밖의 지역으로 나눠서 처벌 수위가 달라요.</p>
      <BorderBox>
        <strong>농지전용허가 처벌, 얼마나 무거운가요</strong><br />
        농지법 제58조에서 처벌 규정을 정하고 있어요. 농업진흥지역과 그 밖의 지역으로 나눠서 처벌 수위가 달라요.<br />
        농업진흥지역 내 농지 무단 전용은 5년 이하 징역 또는 해당 토지 개별공시지가 상당 벌금이에요. 토지가액이 5억 원이면 벌금도 최대 5억 원까지 나올 수 있다는 거예요. 거짓이나 부정한 방법으로 허가받은 것도 마찬가
      </BorderBox>
      <p style={body}>농업진흥지역 내 농지 무단 전용은 5년 이하 징역 또는 해당 토지 개별공시지가 상당 벌금이에요. 토지가액이 5억 원이면 벌금도 최대 5억 원까지 나올 수 있다는 거예요. 거짓이나 부정한 방법으로 허가받은 것도 마찬가지예요.</p>

      <Divider />
      <H2>농지 원상회복 명령과 대집행</H2>
      <p style={body}>형사처벌과 별개로 행정조치도 받아요. 농림축산식품부장관이나 시장·군수가 원상회복 명령을 내릴 수 있어요. 기간을 정해서 "원래 농지 상태로 돌려놔라"고 명령하는 거예요.</p>
      <p style={body}>원상회복 명령을 안 따르면요? 행정청이 강제로 원상회복하는 대집행을 해요. 건물 철거하고 토지 정리하는 비용을 행정청이 먼저 쓰고, 나중에 토지 소유자한테 청구해요. 대집행 비용은 수천만 원에서 억 단위까지 나올 수 있어요.</p>
      <p style={body}>게다가 원상회복 명령을 위반하면 또 처벌받아요. 농지법 제63조에서 1년 이하 징역 또는 1,000만 원 이하 벌금으로 정하고 있어요. 무단 전용으로 한 번 처벌받고, 원상회복 명령 위반으로 또 처벌받는 거죠.</p>

      <Divider />
      <H2>농지전용허가 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
