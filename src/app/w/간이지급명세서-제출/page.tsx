"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 간이지급명세서에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 사업소득, 기타소득 간이지급명세서는 매월 말일까지 제출, 미제출 시 지급금액의 0.25% 가산세, 1개월 내 제출하면 0.125%
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "간이지급명세서 제출 안 하면 가산세가 얼마인가요?", a: "미제출 금액의 0.25%예요. 기한 후 1개월 내 제출하면 0.125%로 줄어요." },
  { q: "간이지급명세서 매월 제출하면 뭐가 좋은가요?", a: "연 1회 제출하는 지급명세서가 면제돼요. 연말에 한꺼번에 하는 것보다 부담이 줄어요." },
  { q: "모든 기타소득이 간이지급명세서 대상인가요?", a: "아니요. 강연료, 자문료 같은 인적용역 기타소득만 대상이에요. 복권 당첨금이나 경품은 대상 아니에요." },
  { q: "간이지급명세서 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "간이지급명세서 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 지급명세서 제출", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=12242&cntntsId=8631" },
  { name: "국세청 간이지급명세서(사업소득)", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40349&cntntsId=238925" },
  { name: "국세청 간이지급명세서(기타소득)", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40677&cntntsId=239031" },
];

const RELATED = [
  { slug: "2월-세금-신고-납부-일정", title: "2월 세금 신고 납부 일정", description: "관련 내용 정리." },
  { slug: "원천세-신고-납부", title: "원천세 신고 납부", description: "관련 내용 정리." },
  { slug: "일용근로소득-지급명세서", title: "일용근로소득 지급명세서", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        간이지급명세서 제출 기한 사업소득 기타소득 매월 말일까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        사업소득, 기타소득 간이지급명세서는 매월 말일까지 제출
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>간이지급명세서란 뭔가요</H2>
      <p style={body}>간이지급명세서는 누구한테 얼마를 줬는지 국세청에 알려주는 서류예요. 원천징수한 소득에 대해 매월 간략하게 신고하는 거예요.</p>
      <GreenBox>
        사업소득, 기타소득 간이지급명세서는 매월 말일까지 제출{"\n"}
        미제출 시 지급금액의 0.25% 가산세, 1개월 내 제출하면 0.125%{"\n"}
        매월 제출하면 연 1회 지급명세서 제출 면제 혜택
      </GreenBox>
      <p style={body}>국세청에서 소득 파악을 위해 의무화했어요. 예전에는 연 1회 지급명세서만 제출하면 됐는데, 이제는 매월 간이지급명세서도 제출해야 해요. 더 자주 신고하는 대신 연말 신고 부담이 줄어들었어요.</p>

      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>제출 기한: 매월 말일</H2>
      <p style={body}>간이지급명세서는 소득을 지급한 달의 다음 달 말일까지 제출해요.</p>
      <BorderBox>
        <strong>제출 기한: 매월 말일</strong><br />
        간이지급명세서는 소득을 지급한 달의 다음 달 말일까지 제출해요.<br />
        1월에 프리랜서한테 용역비 줬으면 2월 말일까지 제출해요. 2월에 강연료 줬으면 3월 말일까지예요. 매달 이 사이클이 반복돼요.
      </BorderBox>
      <p style={body}>1월에 프리랜서한테 용역비 줬으면 2월 말일까지 제출해요. 2월에 강연료 줬으면 3월 말일까지예요. 매달 이 사이클이 반복돼요.</p>

      <Divider />
      <H2>홈택스에서 제출하는 방법</H2>
      <p style={body}>간이지급명세서는 홈택스에서 전자제출해요. 전자제출이 원칙이에요.</p>
      <p style={body}>1. 홈택스 로그인
2. 세금신고 → 지급명세서 → 간이지급명세서
3. 소득 종류 선택 (사업소득 또는 기타소득)
4. 지급연월 선택
5. 소득자 정보, 지급금액 입력
6. 제출</p>
      <p style={body}>인원이 많으면 엑셀 파일로 일괄 업로드할 수 있어요. 홈택스에서 양식을 다운받아서 작성한 후 업로드하면 돼요.</p>

      <Divider />
      <H2>간이지급명세서 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
