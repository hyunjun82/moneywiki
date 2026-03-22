"use client";

// Q1. 퇴직급여 지급에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 계속근로기간 1년 이상, 주 15시간 이상 근무한 근로자가 퇴직급여 지급 대상, 1년 미만 근로자는 원칙적으로 못 받지만 취업규칙이나 근로계약에 명시되면 가능
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "퇴직급여 6개월 근무하고 받을 수 있나요?", a: "원칙적으로는 못 받아요. 하지만 회사 취업규칙이나 근로계약서에 1년 미만도 지급한다고 명시되어 있으면 받을 수 있어요." },
  { q: "알바도 퇴직급여 대상인가요?", a: "네, 가능해요. 1년 이상 근무하고 주 15시간 이상 일했다면 알바도 퇴직급여를 받을 수 있어요. 시간제라고 해서 제외되는 건 아니에요." },
  { q: "휴직 기간도 계속근로기간에 포함되나요?", a: "네, 포함돼요. 회사가 승인한 휴직이라면 계속근로기간에 포함돼요. 육아휴직, 병가 등 승인받은 휴직은 모두 인정돼요." },
  { q: "퇴직급여 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "퇴직급여 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "근로자퇴직급여 보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=999&ccfNo=3&cciNo=1&cnpClsNo=2" },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "관련 내용 정리." },
  { slug: "퇴직금-계산", title: "퇴직금 계산 방법", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직급여 지급 대상 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계속근로기간 1년 이상, 주 15시간 이상 근무한 근로자가 퇴직급여 지급 대상
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직급여 지급 대상, 누가 받을 수 있나요?</H2>
      <p style={body}>근로자퇴직급여 보장법 제4조에서 퇴직급여 지급 대상을 명확하게 규정하고 있어요.</p>
      <GreenBox>
        계속근로기간 1년 이상, 주 15시간 이상 근무한 근로자가 퇴직급여 지급 대상{"\n"}
        1년 미만 근로자는 원칙적으로 못 받지만 취업규칙이나 근로계약에 명시되면 가능{"\n"}
        동거 친족 사업장과 가사 사용인은 적용 제외, 퇴직일로부터 14일 내 지급 의무
      </GreenBox>
      <p style={body}>계속근로기간이 1년 이상이어야 해요. 계속근로기간이란 동일한 회사에서 계속해서 근로를 제공한 기간을 말해요. 중간에 회사를 옮기면 새로 카운트돼요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>퇴직급여 못 받는 경우는 언제인가요?</H2>
      <p style={body}>모든 근로자가 퇴직급여를 받는 건 아니에요. 법에서 제외하는 경우가 있어요.</p>
      <BorderBox>
        <strong>퇴직급여 못 받는 경우는 언제인가요?</strong><br />
        모든 근로자가 퇴직급여를 받는 건 아니에요. 법에서 제외하는 경우가 있어요.<br />
        계속근로기간이 1년 미만이면 원칙적으로 퇴직급여를 못 받아요. 11개월 29일 일하고 퇴사하면 못 받아요. 딱 1일 차이로 안 받게 되는 거예요.
      </BorderBox>
      <p style={body}>계속근로기간이 1년 미만이면 원칙적으로 퇴직급여를 못 받아요. 11개월 29일 일하고 퇴사하면 못 받아요. 딱 1일 차이로 안 받게 되는 거예요.</p>

      <Divider />
      <H2>퇴직급여 지급 기한은 언제까지인가요?</H2>
      <p style={body}>퇴직급여를 받을 수 있는 대상이라면 언제까지 받아야 하는지도 중요해요.</p>
      <p style={body}>회사는 근로자가 퇴직한 날로부터 14일 이내에 퇴직급여를 지급해야 해요. 근로기준법 제36조에서 명시하고 있어요.</p>
      <p style={body}>14일을 넘기면 회사는 지연이자를 물어야 해요. 연 20%예요. 한 달 지연되면 퇴직금의 약 1.67%를 추가로 받을 수 있어요.</p>

      <Divider />
      <H2>퇴직급여 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
