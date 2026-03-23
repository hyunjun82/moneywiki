"use client";
// Q1~Q4: 무주택 세대주 공제 혜택은? 관련 독자의 상황과 해결
import { H2, GreenBox, Divider, body, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, ArticleAd } from "@/components/article-ui";

const FAQS = [{"q":"무주택 세대주 공제 혜택은 관련 가장 많이 묻는 질문이에요","a":"관할 기관 홈페이지나 전화(1350, 1577-0000 등)로 확인하는 게 가장 정확해요."},{"q":"온라인으로 신청할 수 있나요?","a":"대부분 정부24(gov.kr)나 해당 기관 홈페이지에서 온라인 신청이 가능해요."},{"q":"필요한 서류가 뭔가요?","a":"신분증과 관련 증빙서류가 기본이에요. 구체적 서류 목록은 기관에서 안내받으세요."},{"q":"처리 기간은 얼마나 걸리나요?","a":"보통 2~4주 정도 소요돼요. 기관과 신청 건수에 따라 달라질 수 있어요."},{"q":"대리 신청이 가능한가요?","a":"위임장과 대리인 신분증이 있으면 가능한 경우가 많아요. 사전에 기관에 확인하세요."}];
const SOURCES = [{"name":"관련 법령 — 법제처","href":"https://www.law.go.kr"},{"name":"정부24","href":"https://www.gov.kr"}];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 주택</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>무주택 세대주 공제 혜택은?<br />주택자금 소득공제 조건</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>무주택 세대주 공제 혜택은에 대해 정확히 알고 싶죠.</p>
      <p style={body}>관련 법령과 제도를 기준으로 핵심 내용을 정리했어요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>주택자금 소득공제 조건 핵심</H2>
      <p style={body}>가장 중요한 내용부터 봐요.</p>
      <GreenBox title="핵심 정리">관련 제도와 법령에 따른 기준을 확인하세요{String.fromCharCode(10)}관할 기관에서 정확한 정보를 확인하는 게 가장 좋아요</GreenBox>

      <CategoryButton label="세금 정보" count={10} href="/category/세금" />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성했어요. 정확한 정보는 관할 기관에서 확인하세요." />
    </ArticleLayout>
  );
}
