"use client";

// Q1. 중개보조원 피해에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 중개보조원은 계약 체결 권한이 없어요, 임대인이 권한 위임 후 방치하면 사용자 책임 가능해요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "중개보조원과 공인중개사 차이가 뭔가요?", a: "공인중개사는 자격증 소지자로 계약 체결 권한이 있어요. 중개보조원은 단순 보조 업무만 가능해요." },
  { q: "임대인이 중개보조원에게 권한을 위임했다면 책임 있나요?", a: "네, 있어요. 위임한 후 제대로 관리하지 않았다면 사용자 책임을 물을 수 있어요." },
  { q: "피해 배상은 누구에게 청구하나요?", a: "공인중개사와 임대인 모두에게 청구할 수 있어요. 연대책임을 물을 수도 있어요." },
  { q: "중개보조원 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "중개보조원 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "공인중개사법", href: "https://www.law.go.kr/법령/공인중개사법" },
  { name: "민법 사용자 책임", href: "https://www.law.go.kr/법령/민법" },
];

const RELATED = [
  { slug: "부동산-중개보수", title: "부동산 중개보수", description: "관련 내용 정리." },
  { slug: "임대차계약-해지", title: "임대차 계약 해지", description: "관련 내용 정리." },
  { slug: "전세사기-피해구제", title: "전세사기 피해 구제", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        중개보조원 피해 임대인 책임 여부
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        중개보조원은 계약 체결 권한이 없어요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중개보조원의 법적 지위</H2>
      <p style={body}>중개보조원은 공인중개사가 아니에요. 공인중개사법에서는 중개보조원을 '공인중개사를 보조하는 사람'으로 정의하고 있어요. 자격증이 없고, 독자적으로 중개 업무를 할 수 없어요.</p>
      <GreenBox>
        중개보조원은 계약 체결 권한이 없어요{"\n"}
        임대인이 권한 위임 후 방치하면 사용자 책임 가능해요{"\n"}
        피해는 공인중개사와 임대인 모두에게 청구할 수 있어요
      </GreenBox>
      <p style={body}>중개보조원이 할 수 있는 일은 제한적이에요. 물건 안내, 현장 확인, 서류 정리 같은 보조 업무만 가능해요. 계약서 작성, 계약 체결, 중요사항 설명 같은 핵심 업무는 절대 못 해요. 이건 오직 공인중개사만 할 수 있어요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>임대인의 사용자 책임</H2>
      <p style={body}>중개보조원이 임대인으로부터 권한을 위임받았다고 하더라도, 임대인에게 책임이 없는 건 아니에요. 민법에서는 '사용자 책임'이라는 제도가 있어요.</p>
      <BorderBox>
        <strong>임대인의 사용자 책임</strong><br />
        중개보조원이 임대인으로부터 권한을 위임받았다고 하더라도, 임대인에게 책임이 없는 건 아니에요. 민법에서는 '사용자 책임'이라는 제도가 있어요.<br />
        사용자 책임이란, 사용자(여기서는 임대인)가 피용자(중개보조원)를 선임하고 감독할 때 주의를 다하지 않아서 제3자에게 손해를 입혔다면, 사용자도 책임을 진다는 거예요.
      </BorderBox>
      <p style={body}>사용자 책임이란, 사용자(여기서는 임대인)가 피용자(중개보조원)를 선임하고 감독할 때 주의를 다하지 않아서 제3자에게 손해를 입혔다면, 사용자도 책임을 진다는 거예요.</p>

      <Divider />
      <H2>피해 발생 시 책임 소재</H2>
      <p style={body}>중개보조원 때문에 피해를 입었다면, 책임은 여러 곳에 있을 수 있어요. 첫째는 중개보조원 본인이에요. 권한 없이 계약 업무를 했으니 당연히 책임이 있죠.</p>
      <p style={body}>둘째는 그 중개보조원을 고용한 공인중개사예요. 공인중개사는 자기 사무소 직원을 제대로 관리해야 할 의무가 있어요. 중개보조원이 문제를 일으켰다면, 공인중개사도 사용자 책임을 져야 해요.</p>
      <p style={body}>셋째가 임대인이에요. 만약 임대인이 중개보조원에게 직접 권한을 주고, 공인중개사 없이 일을 맡겼다면, 임대인도 사용자 책임을 질 수 있어요. 특히 임대인이 중개보조원의 자격을 확인하지 않고 맡겼다면 과실이 있는 거예요.</p>

      <Divider />
      <H2>중개보조원 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
