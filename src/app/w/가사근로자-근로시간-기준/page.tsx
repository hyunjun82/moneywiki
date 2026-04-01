"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 가사근로자 근로시간에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 가사근로자 최소 근로시간은 주당 15시간 이상이에요, 법정 근로시간은 1주 40시간, 1일 8시간이 원칙이에요
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "가사근로자 주당 15시간 미만 근무도 가능한가요?", a: "본인이 명시적으로 원하거나 경영상 불가피한 사유가 있으면 가능해요. 다만 이 경우 일부 혜택이 제한될 수 있어요." },
  { q: "가사근로자 야간 근무 수당도 받을 수 있나요?", a: "인증된 가사서비스 제공기관 소속이면 근로기준법에 준하는 야간 수당을 받을 수 있어요. 통상임금의 50% 가산이에요." },
  { q: "가사근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "가사근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "가사근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "가사근로자의 고용개선 등에 관한 법률", href: "https://www.law.go.kr/법령/가사근로자의고용개선등에관한법률" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
  { name: "근로기준법", href: "https://www.law.go.kr/법령/근로기준법" },
];

const RELATED = [
  { slug: "최저임금", title: "최저임금", description: "관련 내용 정리." },
  { slug: "퇴직금", title: "퇴직금", description: "관련 내용 정리." },
  { slug: "연차휴가", title: "연차휴가", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가사근로자 근로시간 기준: 근로시간 및 초과근무 규정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가사근로자 최소 근로시간은 주당 15시간 이상이에요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가사근로자 근로시간은 얼마인가요?</H2>
      <p style={body}>가사근로자의 최소 근로시간은 주당 15시간 이상이에요.</p>
      <GreenBox>
        가사근로자 최소 근로시간은 주당 15시간 이상이에요{"\n"}
        법정 근로시간은 1주 40시간, 1일 8시간이 원칙이에요{"\n"}
        초과근무 시 통상임금의 1.5배 수당 받을 수 있어요
      </GreenBox>
      <p style={body}>가사근로자의 고용개선 등에 관한 법률 제15조에서 정한 기준이에요.
인증받은 가사서비스 제공기관에서 일하면 이 법의 보호를 받을 수 있어요.
주당 15시간 이상 일해야 최저임금, 연차휴가, 퇴직금 등 근로자 권리를 온전히 보장받을 수 있거든요.
다만 본인이 명시적으로 원하거나 경영상 불가피한 사유가 있으면 15시간 미만도 가능해요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>가사근로자 근로시간 기준은 어떻게 되나요?</H2>
      <p style={body}>법정 근로시간은 1주 40시간, 1일 8시간이 원칙이에요.</p>
      <BorderBox>
        <strong>가사근로자 근로시간 기준은 어떻게 되나요?</strong><br />
        법정 근로시간은 1주 40시간, 1일 8시간이 원칙이에요.<br />
        근로기준법 제50조에서 정한 기준이 가사근로자에게도 준용돼요.
인증받은 가사서비스 제공기관 소속이면 일반 근로자와 동일한 근로시간 규정이 적용되죠.
입주가사근로자처럼 실제 근로시간 산정이 어려운 경우에는 계약서에 명
      </BorderBox>
      <p style={body}>근로기준법 제50조에서 정한 기준이 가사근로자에게도 준용돼요.
인증받은 가사서비스 제공기관 소속이면 일반 근로자와 동일한 근로시간 규정이 적용되죠.
입주가사근로자처럼 실제 근로시간 산정이 어려운 경우에는 계약서에 명시한 서비스 제공시간을 근로시간으로 봐요.
최저임금 계산도 이 기준으로 하니까 계약서를 꼼꼼히 확인하세요.</p>

      <Divider />
      <H2>가사근로자 기준 규정은 뭐가 있나요?</H2>
      <p style={body}>최저임금, 퇴직금, 연차휴가, 4대 보험 가입이 의무예요.</p>
      <p style={body}>2022년 6월 16일부터 시행된 가사근로자의 고용개선 등에 관한 법률에서 정한 내용이에요.
인증받은 가사서비스 제공기관에서 일하면 일반 근로자와 거의 동일한 권리를 보장받아요.
1년 이상 근무하면 퇴직금도 받을 수 있고, 근무 기간에 따라 연차휴가도 생겨요.
4대 보험(국민연금, 건강보험, 고용보험, 산재보험)도 의무 가입이라 안전하게 일할 수 있죠.</p>
      <p style={body}>가사근로자에게 보장되는 권리는 다음과 같아요.</p>

      <Divider />
      <H2>가사근로자 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
