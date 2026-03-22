"use client";

// Q1. 파업 참여 해고에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 정당한 파업 참여는 해고 사유가 아니며, 단순 참여로 해고 시 부당해고에 해당해요, 폭력, 업무방해, 불법점거 등 위법행위 동반 시에만 정당한 해고 가능해요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "파업 참여 해고는 무조건 부당한가요?", a: "정당한 파업은 법으로 보호받는 권리예요. 단순 참여만으로 해고하면 부당해고에 해당해요." },
  { q: "파업 중 폭력 행위 있으면 해고 정당한가요?", a: "네, 정당해요. 폭력, 협박, 불법점거 등 위법행위를 동반하면 정당한 해고 사유가 돼요." },
  { q: "파업 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "파업 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "파업 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "노동조합 및 노동관계조정법", href: "https://www.law.go.kr/법령/노동조합및노동관계조정법" },
  { name: "근로기준법", href: "https://www.law.go.kr/법령/근로기준법" },
];

const RELATED = [
  { slug: "부당해고-구제신청-방법", title: "부당해고 구제신청 절차", description: "관련 내용 정리." },
  { slug: "소명기회-없는-해고-효력", title: "해고 소명기회 의무", description: "관련 내용 정리." },
  { slug: "경영상-이유-해고-요건", title: "경영상 이유 해고 요건", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        파업 참여 해고 정당성: 보호 범위 및 구제 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        정당한 파업 참여는 해고 사유가 아니며, 단순 참여로 해고 시 부당해고에 해당해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>파업 참여 해고는 언제 정당한가요?</H2>
      <p style={body}>정당한 파업에 참여했다는 이유만으로는 해고할 수 없어요. 노동조합 및 노동관계조정법 제3조에서 파업권을 근로자의 기본권으로 보장하고 있어요.</p>
      <GreenBox>
        정당한 파업 참여는 해고 사유가 아니며, 단순 참여로 해고 시 부당해고에 해당해요{"\n"}
        폭력, 업무방해, 불법점거 등 위법행위 동반 시에만 정당한 해고 가능해요{"\n"}
        부당해고는 노동위원회에 해고일로부터 3개월 내 구제신청해서 복직 및 임금 소급 받을 수 있어요
      </GreenBox>
      <p style={body}>정당한 파업이란 노동조합이 절차에 따라 진행하는 쟁의행위를 말해요. 조합원 과반수 찬성, 노동위원회 조정 절차 거친 경우예요. 이런 절차를 거친 파업에 참여한 근로자는 법적으로 보호받아요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>해고 정당성 판단은 어떻게 하나요?</H2>
      <p style={body}>파업이라도 위법한 방법으로 진행했다면 해고가 정당할 수 있어요. 폭력, 협박, 업무방해 등이 있었다면 정당한 해고 사유가 돼요.</p>
      <BorderBox>
        <strong>해고 정당성 판단은 어떻게 하나요?</strong><br />
        파업이라도 위법한 방법으로 진행했다면 해고가 정당할 수 있어요. 폭력, 협박, 업무방해 등이 있었다면 정당한 해고 사유가 돼요.<br />
        파업 중 폭력을 행사했다면 정당한 해고 사유예요. 대체 근로자를 폭행하거나 협박한 경우, 파업 참여를 강요하며 폭력을 쓴 경우가 해당돼요.
      </BorderBox>
      <p style={body}>파업 중 폭력을 행사했다면 정당한 해고 사유예요. 대체 근로자를 폭행하거나 협박한 경우, 파업 참여를 강요하며 폭력을 쓴 경우가 해당돼요.</p>

      <Divider />
      <H2>노조 활동 보호 범위는 어디까지인가요?</H2>
      <p style={body}>파업 후 복직을 거부하거나 다른 부서로 배치하는 것도 불이익 조치예요. 원래 업무로 복귀시켜야 해요. 승진 탈락, 인사고과 불이익도 금지돼요.</p>
      <p style={body}>노동조합이 절차를 안 지켰다면 불법 파업이에요. 조합원 투표 없이 간부 몇 명이 결정했거나, 노동위원회 조정 절차를 안 거친 경우예요.</p>
      <p style={body}>불법 파업에 참여했다고 바로 해고할 수 있는 건 아니에요. 근로기준법 제23조에 따라 "사회통념상 고용관계를 계속할 수 없을 정도"여야 해요. 1회 불법 파업 참여만으로는 부족하고, 반복적이거나 악의적인 경우여야 해요.</p>

      <Divider />
      <H2>파업 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
