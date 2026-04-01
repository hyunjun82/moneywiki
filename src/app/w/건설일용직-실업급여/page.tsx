"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. [에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 건설일용직은 이직 전 18개월 내 피보험기간이 180일 이상이면 실업급여를 받을 수 있어요., 일반 근로자(18개월 180일)와 같은 기준이지만, 근로내용 확인신고 방식이 달라요.
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "건설일용직 실업급여 신청 전에 마지막 현장에서 며칠이나 일해야 하나요?", a: "이직 전 1개월 내에 10일 미만 근무한 상태여야 해요. 건설일용직은 마지막 현장이 종료되거나 1개월 내 10일 미만 일했을 때 이직한 것으로 봐요. 이직 상태가 된 시점부터 수급자격 신청이 가능해요." },
  { q: "건설일용직 피보험기간 180일은 같은 현장만 카운트되나요?", a: "아니에요. 여러 현장에서 일한 기간을 모두 합산해요. 고용보험에 가입된 사업장에서 일한 날을 모두 더하면 돼요. 다만 사업주가 근로내용 확인신고를 제대로 해야 기간이 인정돼요." },
  { q: "건설일용직 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "건설일용직 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "건설일용직 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "고용보험법 - 일용근로자 구직급여", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용노동부 - 건설일용직 고용보험 안내", href: "https://www.moel.go.kr/policy/policyinfo/benefit/list.do" },
];

const RELATED = [
  { slug: "실업급여-건설일용직", title: "건설일용근로자 실업급여 신청 절차", description: "관련 내용 정리." },
  { slug: "계약직-실업급여", title: "계약직 실업급여 신청 요건", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건설일용직 실업급여 신청 조건 | 피보험기간 180일 계산 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        건설일용직은 이직 전 18개월 내 피보험기간이 180일 이상이면 실업급여를 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>건설일용직 실업급여 180일은 어떻게 계산하나요?</H2>
      <p style={body}>이직 전 18개월 내 실제 근무일수를 합산해요. 여러 현장에서 일한 날이 모두 합산돼요.</p>
      <GreenBox>
        건설일용직은 이직 전 18개월 내 피보험기간이 180일 이상이면 실업급여를 받을 수 있어요.{"\n"}
        일반 근로자(18개월 180일)와 같은 기준이지만, 근로내용 확인신고 방식이 달라요.{"\n"}
        실업급여 신청 전 마지막 일한 현장 사업주에게 이직확인서 발급을 요청해야 해요.
      </GreenBox>
      <p style={body}>18개월 기준을 이해하는 게 중요해요. 이직(마지막 현장 종료)일로부터 역산해서 18개월 이내에 일한 날을 모두 더해요. 2024년 7월 1일 이직이라면 2023년 1월 1일부터 2024년 7월 1일까지가 기준 기간이에요.</p>

      <CategoryButton label="실업급여" count={10} href="/category/%EC%8B%A4%EC%97%85%EA%B8%89%EC%97%AC" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>건설일용직 피보험기간 조건이 뭐예요?</H2>
      <p style={body}>18개월 내 180일이 기본 요건이에요. 일반 근로자와 동일한 기준이에요.</p>
      <BorderBox>
        <strong>건설일용직 피보험기간 조건이 뭐예요?</strong><br />
        18개월 내 180일이 기본 요건이에요. 일반 근로자와 동일한 기준이에요.<br />
        추가 조건도 확인해야 해요. 첫째, 이직 전 1개월 내에 10일 미만 근무한 상태여야 해요. 마지막 현장이 종료된 상태이거나 1개월 동안 10일도 일하지 못한 상황이어야 이직으로 봐요. 둘째, 구직 의사와 능력이 있
      </BorderBox>
      <p style={body}>추가 조건도 확인해야 해요. 첫째, 이직 전 1개월 내에 10일 미만 근무한 상태여야 해요. 마지막 현장이 종료된 상태이거나 1개월 동안 10일도 일하지 못한 상황이어야 이직으로 봐요. 둘째, 구직 의사와 능력이 있어야 해요. 취업할 의지가 있고 건강상 근무 가능한 상태여야 해요.</p>

      <Divider />
      <H2>건설일용직 실업급여 신청은 어떻게 하나요?</H2>
      <p style={body}>고용센터 방문 신청이 원칙이에요. 건설일용직은 인터넷 신청보다 고용센터 방문이 일반적이에요.</p>
      <p style={body}>신청 절차예요. 먼저 마지막 현장 사업주에게 이직확인서 발급을 요청해요. 이직확인서를 받으면 거주지 관할 고용센터에 방문해서 수급자격 인정 신청서를 제출해요. 신청 후 1~2주 내에 수급자격 여부가 결정돼요.</p>
      <p style={body}>필요 서류예요. 신분증, 이직확인서, 통장 사본이 필요해요. 고용24에서 피보험기간을 미리 조회해서 180일 이상인지 확인하고 가면 좋아요.</p>

      <Divider />
      <H2>건설일용직 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
