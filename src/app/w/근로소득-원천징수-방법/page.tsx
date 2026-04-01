"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 근로소득 원천징수란에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 회사가 월급 줄 때 미리 세금 떼는 게 근로소득 원천징수예요, 간이세액표 보면 내 세금이 얼마인지 알 수 있어요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "근로소득 원천징수는 누가 하나요?", a: "회사가 해요. 월급 주는 회사가 미리 세금을 떼서 국세청에 대신 납부하는 거예요" },
  { q: "간이세액표는 어디서 보나요?", a: "국세청 홈택스에서 확인할 수 있어요. 세금신고 메뉴에서 근로소득 간이세액표를 찾으면 돼요" },
  { q: "근로소득 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "근로소득 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "근로소득 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 홈택스", href: "https://www.hometax.go.kr" },
  { name: "국세청 근로소득 간이세액표", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6583&cntntsId=7862" },
];

const RELATED = [
  { slug: "연말정산-계산기", title: "연말정산 계산기", description: "관련 내용 정리." },
  { slug: "원천징수-영수증-발급", title: "원천징수 영수증 발급", description: "관련 내용 정리." },
  { slug: "근로소득세-계산기", title: "근로소득세 계산기", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로소득 원천징수 방법: 세율 계산 및 신고 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 월급 줄 때 미리 세금 떼는 게 근로소득 원천징수예요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>근로소득 원천징수란 무엇인가요?</H2>
      <p style={body}>회사가 월급 줄 때 미리 세금을 떼서 국세청에 대신 내주는 제도예요.</p>
      <GreenBox>
        회사가 월급 줄 때 미리 세금 떼는 게 근로소득 원천징수예요{"\n"}
        간이세액표 보면 내 세금이 얼마인지 알 수 있어요{"\n"}
        연말정산으로 많이 낸 세금은 돌려받을 수 있어요
      </GreenBox>
      <p style={body}>매달 받는 급여에서 소득세와 지방소득세를 미리 빼고 나머지 금액을 근로자에게 지급해요. 왜냐면 나중에 한 번에 세금 받으면 부담이 크니까, 매달 조금씩 미리 떼는 거죠. 국세청 근로소득 안내에서 자세한 규정을 확인할 수 있어요. 이렇게 떼간 세금은 연말정산 때 정산해서 많이 냈으면 돌려주고, 덜 냈으면 더 받아요. 회사 입장에서는 원천징수의무자로서 법적으로 반드시 해야 하는 의무예요.</p>

      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>근로소득 원천징수 세율은 어떻게 되나요?</H2>
      <p style={body}>간이세액표에 나온 금액대로 떼요. 급여가 많을수록 세율도 높아져요.</p>
      <BorderBox>
        <strong>근로소득 원천징수 세율은 어떻게 되나요?</strong><br />
        간이세액표에 나온 금액대로 떼요. 급여가 많을수록 세율도 높아져요.<br />
        국세청이 만든 근로소득 간이세액표를 보면 돼요. 월급 200만원 받는 사람과 500만원 받는 사람이 내는 세금이 다르거든요. 부양가족 수에 따라서도 달라져요. 본인만 있으면 세금이 많고, 부양가족이 많으면 세금이 줄
      </BorderBox>
      <p style={body}>국세청이 만든 근로소득 간이세액표를 보면 돼요. 월급 200만원 받는 사람과 500만원 받는 사람이 내는 세금이 다르거든요. 부양가족 수에 따라서도 달라져요. 본인만 있으면 세금이 많고, 부양가족이 많으면 세금이 줄어들어요. 예를 들어 월급 300만원에 부양가족 2명이면 월 약 4만원 정도 원천징수돼요. 근로소득세 계산기로 본인 상황에 맞춰 미리 계산해볼 수도 있어요. 근로자는 간이세액표 금액의 80%, 100%, 120% 중 선택할 수 있는데, 연말정산 때 환급 받고 싶으면 120%를 선택하면 돼요.</p>

      <Divider />
      <H2>근로소득 원천징수 계산 방법은 뭔가요?</H2>
      <p style={body}>간이세액표에서 내 월급과 부양가족 수를 찾으면 금액이 나와요.</p>
      <p style={body}>계산 공식이 복잡하니까 국세청이 미리 계산해서 표로 만들어뒀어요. 회사 담당자가 이 표를 보고 세금을 떼는 거예요. 자녀가 8세 이상 20세 이하면 추가로 공제받을 수 있어요. 자녀 1명이면 월 12,500원, 2명이면 29,160원, 3명 이상이면 29,160원에 2명 초과 인원당 25,000원씩 더 빼줘요. 국세청 홈택스에서 "근로소득 간이세액표"를 검색하면 전체 표를 다운받을 수 있어요. 실제 세금 계산은 총급여에서 근로소득공제, 인적공제, 표준공제를 빼고 나온 과세표준에 세율을 곱해서 나와요.</p>

      <Divider />
      <H2>근로소득 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
