"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 국가장학금 소득구간에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 소득구간은 월 소득인정액(소득+재산환산액)으로 9단계로 구분돼요., 건강보험료와 기초생활 수급 여부가 주요 기준이에요.
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "국가장학금 소득구간은 어떻게 정해져요?", a: "부모님 소득, 재산을 소득으로 환산한 금액으로 정해져요. 월 소득인정액이 낮을수록 1구간에 가까워요." },
  { q: "부모님 정보 제공 동의를 안 하면 어떻게 되나요?", a: "정보 제공 동의가 없으면 소득구간 산정이 안 돼서 국가장학금 신청 대상에서 탈락해요. 반드시 동의가 필요해요." },
  { q: "소득구간 산정은 얼마나 걸려요?", a: "보통 신청 후 약 8주 내외가 걸려요. 서류 심사와 확인에 시간이 필요해요." },
  { q: "국가장학금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "국가장학금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "한국장학재단", href: "https://www.kosaf.go.kr/" },
  { name: "교육부", href: "https://www.moe.go.kr" },
];

const RELATED = [
  { slug: "학자금-대출-금리-한도", title: "학자금 대출 금리 및 한도", description: "관련 내용 정리." },
  { slug: "초중고-입학준비금-신청-방법", title: "초중고 입학준비금 신청", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>교육</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국가장학금 소득구간 산정 기준: 1학기 지급액 총정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        소득구간은 월 소득인정액(소득+재산환산액)으로 9단계로 구분돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>국가장학금 소득구간, 어떻게 정해져요?</H2>
      <p style={body}>소득구간은 월 소득인정액으로 정해져요. 쉽게 말하면 부모님의 소득에 재산을 소득으로 환산한 금액을 더한 것이에요. 한국장학재단에서 이 금액을 기준중위소득과 비교해서 1구간부터 9구간까지 나눠요. 국가장학금 1차 2차 차이도 참고해보세요.</p>
      <GreenBox>
        소득구간은 월 소득인정액(소득+재산환산액)으로 9단계로 구분돼요.{"\n"}
        건강보험료와 기초생활 수급 여부가 주요 기준이에요.{"\n"}
        부모님의 정보 제공 동의가 필수예요. 동의 없으면 탈락해요.
      </GreenBox>
      <p style={body}>소득구간은 건강보험료 수준으로 대략 판단할 수 있어요. 건강보험료가 낮으면 소득구간도 낮고, 높으면 높아요. 하지만 정확한 계산은 복잡해요. 소득뿐만 아니라 재산도 영향을 미치거든요. 금융자산, 부동산, 자동차 같은 것들을 모두 평가해서 소득으로 환산해요.</p>

      <CategoryButton label="교육" count={10} href="/category/%EA%B5%90%EC%9C%A1" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>국가장학금 소득구간별 2026년 1학기 지급액은 얼마예요?</H2>
      <p style={body}>2026년부터 소득구간이 9단계로 확대됐어요. 1구간이 가장 낮고, 9구간이 가장 높아요.</p>
      <BorderBox>
        <strong>국가장학금 소득구간별 2026년 1학기 지급액은 얼마예요?</strong><br />
        2026년부터 소득구간이 9단계로 확대됐어요. 1구간이 가장 낮고, 9구간이 가장 높아요.<br />
        정확한 지급액은 매 학기마다 달라져요. 2026년 1학기 국가장학금은 한국장학재단 공식 발표를 통해 확인할 수 있어요. 보통 1-3구간 학생들은 한 학기에 300만 원대의 지원을 받고, 구간이 높아질수록 지원액이 줄
      </BorderBox>
      <p style={body}>정확한 지급액은 매 학기마다 달라져요. 2026년 1학기 국가장학금은 한국장학재단 공식 발표를 통해 확인할 수 있어요. 보통 1-3구간 학생들은 한 학기에 300만 원대의 지원을 받고, 구간이 높아질수록 지원액이 줄어들어요.</p>

      <Divider />
      <H2>국가장학금 소득구간 산정 기준은 뭔가요?</H2>
      <p style={body}>소득구간은 다음 요소들을 종합적으로 고려해서 정해져요.</p>
      <p style={body}>1. 소득: 부모님의 근로소득, 사업소득, 금융이자, 연금 같은 모든 소득이 포함돼요. 근로계약서, 급여통장, 사업장 자료 같은 것들로 증명해야 해요.</p>
      <p style={body}>2. 재산: 금융자산(통장잔액, 주식, 펀드), 부동산(주택, 전세금), 자동차 같은 것들이 포함돼요. 이걸 월 소득으로 환산해요. 예를 들어 금융자산 1억 원이 있으면 연 이자율을 곱해서 월 소득으로 계산하는 식이에요.</p>

      <Divider />
      <H2>국가장학금 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
