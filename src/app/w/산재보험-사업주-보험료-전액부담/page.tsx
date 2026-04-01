"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 산재보험 사업주 전액부담에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 산재보험료는 사업주가 100% 전액 부담하며 근로자 급여에서 일절 공제 불가, 근로자 급여에서 공제 시 300만원 이하 과태료 처분 및 차액 환급 의무 발생
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "산재보험료를 근로자 급여에서 떼도 되나요?", a: "절대 안 돼요. 산재보험료는 사업주가 100% 부담하는 게 법으로 정해져 있어요. 근로자 급여에서 공제하면 불법이고 300만원 이하 과태료 처분받아요." },
  { q: "산재보험료율은 어떻게 정해지나요?", a: "업종별 위험도에 따라 0.7%부터 34%까지 차등 적용돼요. 사무직은 0.7%, 건설업은 평균 5~10%, 위험도 높은 제조업은 최대 34%까지 적용돼요." },
  { q: "근로자가 산재보험료 부담했다면 돌려받을 수 있나요?", a: "네, 가능해요. 근로복지공단이나 고용노동청에 신고하면 사업주가 공제한 금액을 전액 돌려줘야 해요. 3년 이내 신고하면 소급해서 받을 수 있어요." },
  { q: "산재보험 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "산재보험 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "산업재해보상보험법", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단", href: "https://www.kcomwel.or.kr" },
];

const RELATED = [
  { slug: "고용보험-실업급여-수급조건", title: "고용보험 실업급여 수급 조건", description: "관련 내용 정리." },
  { slug: "4대보험-가입조건-대상", title: "4대보험 가입 조건 대상", description: "관련 내용 정리." },
  { slug: "건강보험료-회사-부담-비율", title: "건강보험료 회사 부담 비율", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        산재보험 사업주 보험료 전액부담·근로자 부담 없음·징수 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        산재보험료는 사업주가 100% 전액 부담하며 근로자 급여에서 일절 공제 불가
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>산재보험료 사업주 전액부담 법적 근거</H2>
      <p style={body}>산재보험은 4대보험 중 유일하게 사업주가 100% 보험료를 부담하는 보험이에요. 이건 선택이 아니라 법적 의무예요.</p>
      <GreenBox>
        산재보험료는 사업주가 100% 전액 부담하며 근로자 급여에서 일절 공제 불가{"\n"}
        근로자 급여에서 공제 시 300만원 이하 과태료 처분 및 차액 환급 의무 발생{"\n"}
        보험료율은 업종별로 0.7%~34%까지 차등 적용되며 2026년 평균 1.32% 수준
      </GreenBox>
      <p style={body}>산업재해보상보험법 제10조는 "보험료는 사업주가 부담한다"고 명확하게 규정하고 있어요. 근로자 급여에서 산재보험료를 공제하는 것은 법 위반이에요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>산재보험료 징수 기준 계산 방법</H2>
      <p style={body}>산재보험료는 근로자 전체 임금총액에 업종별 보험료율을 곱해서 계산해요. 개인별로 따로 떼는 게 아니라 사업장 전체로 계산해요.</p>
      <BorderBox>
        <strong>산재보험료 징수 기준 계산 방법</strong><br />
        산재보험료는 근로자 전체 임금총액에 업종별 보험료율을 곱해서 계산해요. 개인별로 따로 떼는 게 아니라 사업장 전체로 계산해요.<br />
        공식은 간단해요. 임금총액 × 보험료율 = 산재보험료
      </BorderBox>
      <p style={body}>공식은 간단해요. 임금총액 × 보험료율 = 산재보험료</p>

      <Divider />
      <H2>산재보험 보험료율 업종별 기준표</H2>
      <p style={body}>보험료율은 업종의 위험도에 따라 천차만별이에요. 위험한 업종일수록 보험료율이 높아요.</p>
      <p style={body}>사무직이 가장 낮아요. 사무직 중심 사업장은 0.7%예요. IT 기업, 금융회사, 법무법인 같은 곳이에요.</p>
      <p style={body}>제조업은 업종에 따라 차이가 커요. 식품 제조는 1.8%, 자동차 제조는 2.4%, 금속 제조는 5~10%까지 올라가요. 화학물질 취급하는 제조업은 최대 34%까지 적용돼요.</p>

      <Divider />
      <H2>산재보험 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
