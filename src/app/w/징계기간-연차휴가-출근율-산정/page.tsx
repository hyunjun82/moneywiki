"use client";

// Q1. 징계기간 연차휴가에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 정직, 출근정지 등 징계기간은 결근으로 처리돼요., 출근율 계산 시 소정근로일수에는 포함하고 출근일수에서는 제외해요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "정직 30일이면 연차휴가에 영향 있나요?", a: "출근율에 영향을 줘요. 80% 미달하면 연차가 줄어들 수 있어요." },
  { q: "징계기간은 출근으로 인정 안 되나요?", a: "아니요, 징계기간은 결근으로 처리돼요." },
  { q: "대기발령 기간은요?", a: "대기발령은 근로를 제공할 의사가 있으므로 출근으로 볼 수 있어요." },
  { q: "징계기간 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "징계기간 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "근로기준법 제60조", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부 행정해석", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "연차휴가-출근율-계산", title: "연차휴가 출근율 계산", description: "관련 내용 정리." },
  { slug: "정직-징계", title: "정직 징계", description: "관련 내용 정리." },
  { slug: "연차휴가-발생-조건", title: "연차휴가 발생 조건", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연차휴가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        징계기간 연차휴가 출근율 산정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        정직, 출근정지 등 징계기간은 결근으로 처리돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>징계기간은 결근으로 처리돼요</H2>
      <p style={body}>정직, 출근정지 등 징계기간은 출근한 것으로 인정되지 않아요.</p>
      <GreenBox>
        정직, 출근정지 등 징계기간은 결근으로 처리돼요.{"\n"}
        출근율 계산 시 소정근로일수에는 포함하고 출근일수에서는 제외해요.{"\n"}
        징계기간이 길면 출근율 80% 미달로 연차가 줄어들 수 있어요.
      </GreenBox>
      <p style={body}>징계는 근로자의 잘못에 대한 제재예요. 근로자 책임으로 일하지 못한 기간이므로 결근으로 처리해요. 산재나 출산휴가처럼 출근 간주되지 않아요.</p>

      <CategoryButton label="연차휴가" count={10} href="/category/%EC%97%B0%EC%B0%A8%ED%9C%B4%EA%B0%80" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>출근율 계산 예시</H2>
      <p style={body}>1년(250 소정근로일) 중 정직 30일을 받은 경우를 볼게요.</p>
      <BorderBox>
        <strong>출근율 계산 예시</strong><br />
        1년(250 소정근로일) 중 정직 30일을 받은 경우를 볼게요.<br />
        정직기간 30일을 제외한 220일 중 전부 출근했다면 출근율은 220 ÷ 250 = 88%예요. 80% 이상이므로 연차휴가 15일이 발생해요.
      </BorderBox>
      <p style={body}>정직기간 30일을 제외한 220일 중 전부 출근했다면 출근율은 220 ÷ 250 = 88%예요. 80% 이상이므로 연차휴가 15일이 발생해요.</p>

      <Divider />
      <H2>징계기간이 길면 연차가 줄어들 수 있어요</H2>
      <p style={body}>징계기간이 50일 이상이면 출근율 80% 달성이 어려워질 수 있어요.</p>
      <p style={body}>1년 250일 기준으로 80% 출근율은 200일 출근이에요. 정직 50일을 받으면 나머지 200일을 전부 출근해야 겨우 80%가 돼요. 하루라도 결근하면 80% 미달이에요.</p>
      <p style={body}>출근율 80% 미달 시 연차휴가는 15일이 아니라 최대 11일(1개월 개근 시 1일 × 11개월)만 발생해요.</p>

      <Divider />
      <H2>징계기간 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
