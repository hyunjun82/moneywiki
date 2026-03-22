"use client";

// Q1. 청년미래적금 출시일에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 2026년 6월 출시 예정, 5월에 구체적인 일정 발표돼요, 출시되면 주요 은행 앱에서 바로 신청할 수 있어요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "청년미래적금 6월 정확히 며칠에 출시되나요?", a: "아직 구체적인 날짜는 발표 안 됐어요. 5월 중순쯤 정부에서 정확한 출시일과 신청 기간을 공지할 거예요." },
  { q: "청년미래적금 출시 전에 미리 신청할 수 있나요?", a: "안 돼요. 6월 출시되면 그때부터 신청할 수 있어요. 미리 은행 앱 설치하고 서류 준비만 해두세요." },
  { q: "청년미래적금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "청년미래적금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "청년미래적금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "기획재정부", href: "https://www.moef.go.kr" },
  { name: "금융위원회", href: "https://www.fsc.go.kr" },
];

const RELATED = [
  { slug: "청년미래적금-가입방법", title: "청년미래적금 가입방법", description: "관련 내용 정리." },
  { slug: "청년미래적금-자격조건", title: "청년미래적금 자격조건", description: "관련 내용 정리." },
  { slug: "청년미래적금-기여금", title: "청년미래적금 기여금", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년미래적금 6월 출시 예정일과 신청 시기
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 6월 출시 예정, 5월에 구체적인 일정 발표돼요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>청년미래적금 출시일은 언제인가요?</H2>
      <p style={body}>2026년 6월에 출시 예정이에요. 5월에 구체적인 날짜를 발표해요.</p>
      <GreenBox>
        2026년 6월 출시 예정, 5월에 구체적인 일정 발표돼요{"\n"}
        출시되면 주요 은행 앱에서 바로 신청할 수 있어요{"\n"}
        미리 서류 준비하고 은행 알림 신청하면 놓치지 않아요
      </GreenBox>
      <p style={body}>기획재정부와 금융위원회에서 공식 발표한 일정이에요. 6월 중이긴 한데 정확한 날짜는 아직 안 나왔어요.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>청년미래적금 신청 시기는 언제인가요?</H2>
      <p style={body}>출시되는 6월부터 신청할 수 있고, 기간 제한은 없어요.</p>
      <BorderBox>
        <strong>청년미래적금 신청 시기는 언제인가요?</strong><br />
        출시되는 6월부터 신청할 수 있고, 기간 제한은 없어요.<br />
        청년도약계좌처럼 신청 기간이 정해져 있지 않아요. 조건만 충족하면 언제든 신청할 수 있어요.
      </BorderBox>
      <p style={body}>청년도약계좌처럼 신청 기간이 정해져 있지 않아요. 조건만 충족하면 언제든 신청할 수 있어요.</p>

      <Divider />
      <H2>청년미래적금 출시 전 준비할 것은?</H2>
      <p style={body}>서류 미리 발급받고 은행 앱 설치해두면 출시되자마자 신청할 수 있어요.</p>
      <p style={body}>출시되고 나서 허둥대지 말고 미리 준비하세요. 서류 발급에 시간이 걸리니까 1~2주 전에 준비하는 게 좋아요.</p>
      <p style={body}>1. 신분증 확인
   - 주민등록증 또는 운전면허증
   - 유효기간 확인</p>

      <Divider />
      <H2>청년미래적금 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
