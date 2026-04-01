"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 재개발 조합원 자격에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 정비구역 내 토지·건물 소유자는 자동으로 조합원이 돼요, 투기과열지구는 관리처분계획 인가 후 양수자 조합원 불가해요
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "재개발 조합원 자격은 누구에게 있나요?", a: "정비구역 내 토지나 건물의 소유자 또는 지상권자가 조합원이 돼요. 동의서를 내지 않아도 자동으로 조합원이에요." },
  { q: "투기과열지구에서 집을 사면 조합원이 안 되나요?", a: "관리처분계획 인가 후에 매수하면 조합원이 안 돼요. 다만 양도인이 1세대 1주택으로 10년 이상 소유·5년 이상 거주했으면 양수인도 조합원이 될 수 있어요." },
  { q: "공유 명의면 조합원이 어떻게 되나요?", a: "여러 명이 공유하면 대표 1명을 조합원으로 봐요. 1세대에 속하는 여러 소유자도 대표 1명만 조합원이에요." },
  { q: "재개발 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "재개발 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "도시 및 주거환경정비법", href: "https://www.law.go.kr/법령/도시및주거환경정비법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" },
];

const RELATED = [
  { slug: "재개발-절차", title: "재개발 절차", description: "관련 내용 정리." },
  { slug: "관리처분계획", title: "관리처분계획이란", description: "관련 내용 정리." },
  { slug: "투기과열지구", title: "투기과열지구 규제", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재개발 조합원 자격 요건 투기과열지구 제한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        정비구역 내 토지·건물 소유자는 자동으로 조합원이 돼요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>재개발 조합원이란</H2>
      <p style={body}>간단히 말해 재개발사업을 함께 진행하고 나중에 새 아파트를 받을 권리가 있는 사람이에요. 도시 및 주거환경정비법에서 조합원의 자격과 권리를 규정하고 있어요.</p>
      <GreenBox>
        정비구역 내 토지·건물 소유자는 자동으로 조합원이 돼요{"\n"}
        투기과열지구는 관리처분계획 인가 후 양수자 조합원 불가해요{"\n"}
        1세대 1주택 10년 소유·5년 거주하면 양수자도 조합원 가능해요
      </GreenBox>
      <p style={body}>재개발사업은 조합이 주도해서 진행하는데, 조합원이 되어야 사업에 참여하고 분양권을 받을 수 있어요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>재개발 조합원 기본 자격</H2>
      <p style={body}>정리하면 정비구역 내 토지나 건물의 소유자 또는 지상권자가 조합원이 돼요. 재건축과 달리 재개발은 동의서를 내지 않아도 해당 정비구역 안 토지등소유자면 자동으로 조합원이 돼요.</p>
      <BorderBox>
        <strong>재개발 조합원 기본 자격</strong><br />
        정리하면 정비구역 내 토지나 건물의 소유자 또는 지상권자가 조합원이 돼요. 재건축과 달리 재개발은 동의서를 내지 않아도 해당 정비구역 안 토지등소유자면 자동으로 조합원이 돼요.<br />
        토지등소유자: 토지 소유자, 건물 소유자, 토지·건물 공유자, 지상권자 모두 포함돼요.
      </BorderBox>
      <p style={body}>토지등소유자: 토지 소유자, 건물 소유자, 토지·건물 공유자, 지상권자 모두 포함돼요.</p>

      <Divider />
      <H2>투기과열지구 조합원 제한</H2>
      <p style={body}>투기과열지구로 지정된 지역에서는 조합원 자격에 제한이 있어요. 도시 및 주거환경정비법 제39조에서 규정하고 있어요.</p>
      <p style={body}>다시 말해 관리처분계획 인가 후에 해당 정비사업의 건축물이나 토지를 양수한 사람은 조합원이 될 수 없어요. 상속이나 이혼으로 받은 경우는 예외예요.</p>
      <p style={body}>양도인이 특정 요건을 충족하면 양수인도 조합원이 될 수 있어요.</p>

      <Divider />
      <H2>재개발 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
