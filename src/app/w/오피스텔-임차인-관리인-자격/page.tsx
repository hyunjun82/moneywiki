"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 오피스텔 관리인에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 법적으로는 임차인도 관리인이 될 수 있어요, 임차인은 관리위원은 될 수 없고 구분소유자만 가능해요
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "임차인이 관리인 선임 투표에 참여할 수 있나요?", a: "네, 가능해요. 관리인 선임은 점유자에게 구분소유자의 의결권이 자동 위임돼 있어서 임차인도 투표할 수 있어요." },
  { q: "관리인과 관리위원은 뭐가 다른가요?", a: "관리인은 관리단을 대표하는 1명이고, 관리위원은 관리위원회를 구성하는 여러 명이에요. 임차인은 관리위원은 못 돼요." },
  { q: "오피스텔 관리인 선임 의결 정족수는 얼마인가요?", a: "구분소유자 및 의결권 과반수 동의가 필요해요. 의결권은 전유면적에 비례해서 결정돼요." },
  { q: "오피스텔 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "오피스텔 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "집합건물의 소유 및 관리에 관한 법률", href: "https://www.law.go.kr/법령/집합건물의 소유 및 관리에 관한 법률" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1171" },
];

const RELATED = [
  { slug: "집합건물법", title: "집합건물법", description: "관련 내용 정리." },
  { slug: "관리단", title: "관리단", description: "관련 내용 정리." },
  { slug: "오피스텔", title: "오피스텔", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        오피스텔 임차인 관리인 선임 자격
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        법적으로는 임차인도 관리인이 될 수 있어요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임차인도 관리인이 될 수 있어요</H2>
      <p style={body}>집합건물의 소유 및 관리에 관한 법률에서는 관리인의 결격 사유에 대해 별도로 규정하고 있지 않아요. 법적으로는 임차인도 관리인이 될 수 있는 가능성이 있어요.</p>
      <GreenBox>
        법적으로는 임차인도 관리인이 될 수 있어요{"\n"}
        임차인은 관리위원은 될 수 없고 구분소유자만 가능해요{"\n"}
        임차인은 구분소유자를 대신해서 의결권을 행사할 수 있어요
      </GreenBox>
      <p style={body}>관리인 후보는 반드시 구분소유자일 필요는 없고, 관리 능력과 전문성을 갖춘 외부인도 후보가 될 수 있어요. 다만 관리인은 관리단의 대표자이기 때문에 통상적으로 구분소유자가 관리인으로 선출되는 게 일반적이에요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>임차인은 관리위원은 될 수 없어요</H2>
      <p style={body}>관리인과 관리위원을 구분해야 해요. 관리인은 관리단을 대표하는 1명이고, 관리위원은 관리위원회를 구성하는 여러 명의 구성원이에요.</p>
      <BorderBox>
        <strong>임차인은 관리위원은 될 수 없어요</strong><br />
        관리인과 관리위원을 구분해야 해요. 관리인은 관리단을 대표하는 1명이고, 관리위원은 관리위원회를 구성하는 여러 명의 구성원이에요.<br />
        집합건물법은 구분소유자만이 관리위원으로 선출될 수 있도록 규정하고 있어요. 임차인은 관리위원이 될 수 없어요.
      </BorderBox>
      <p style={body}>집합건물법은 구분소유자만이 관리위원으로 선출될 수 있도록 규정하고 있어요. 임차인은 관리위원이 될 수 없어요.</p>

      <Divider />
      <H2>임차인의 의결권 행사</H2>
      <p style={body}>임차인은 관리인이나 관리위원 선임 및 해임, 공용부분의 관리에 관한 사항을 결정하기 위한 관리단 집회에서 구분소유자의 의결권을 대신 행사할 수 있어요.</p>
      <p style={body}>관리인 선임은 점유자에게 구분소유자의 의결권이 자동 위임돼 있어요. 그래서 점유자인 임차인이 구분소유자의 위임장이 없더라도 의결권을 행사할 수 있어요.</p>
      <p style={body}>예를 들어 집주인이 따로 살고 내가 임차인으로 오피스텔에 실제 거주하고 있다면, 관리인 선임 투표에서 집주인의 의결권을 대신 행사할 수 있어요. 별도 위임장 없이도 가능해요.</p>

      <Divider />
      <H2>오피스텔 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
