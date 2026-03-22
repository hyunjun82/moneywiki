"use client";

// Q1. [에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 중도해지 시 정부 기여금 전액 환수, 3년 유지 후 해지 시 기여금 60% 지급
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "청년도약계좌 중도해지 후 재가입 가능한가요?", a: "네, 중도해지 후 2개월이 지나면 재가입할 수 있어요. 다만 기가입 기간에 따라 정부기여금이 차감돼요." },
  { q: "청년도약계좌 중도해지 이율은 얼마인가요?", a: "중도해지 시 약정금리가 아닌 중도해지이율이 적용돼요. 은행별로 다르지만 보통 1~2% 수준이에요." },
  { q: "청년도약계좌 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "청년도약계좌 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "청년도약계좌 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "금융위원회", href: "https://www.fsc.go.kr" },
  { name: "서민금융진흥원", href: "https://ylaccount.kinfa.or.kr" },
];

const RELATED = [
  { slug: "청년도약계좌-신청", title: "청년도약계좌 신청", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년도약계좌 중도해지 불이익: 정부기여금 환수 및 3년 유지 혜택
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        중도해지 시 정부 기여금 전액 환수
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>청년도약계좌 중도해지하면 정부 기여금은 어떻게 되나요?</H2>
      <p style={body}>5년 만기 전에 해지하면 정부 기여금을 받을 수 없어요. 매월 받았던 정부 기여금이 전액 환수돼요. 예를 들어 1년간 36만원을 받았다면 그 돈은 모두 사라지는 거예요. 이건 서민금융진흥원에서 정한 규칙이에요.</p>
      <GreenBox>
        중도해지 시 정부 기여금 전액 환수{"\n"}
        3년 유지 후 해지 시 기여금 60% 지급{"\n"}
        특별중도해지 시 전액 혜택 유지
      </GreenBox>
      <p style={body}>금리도 약정금리가 아닌 중도해지이율이 적용돼요. 청년도약계좌 기본금리는 4.5%지만, 중도해지하면 1~2% 수준으로 확 낮아져요. 비과세 혜택도 사라져서 이자소득세 15.4%를 내야 해요. 받았던 혜택이 모두 날아가는 거라 손해가 정말 크죠.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>청년도약계좌 중도해지 불이익은 뭐가 있나요?</H2>
      <p style={body}>첫째, 정부 기여금 전액 환수예요. 매월 최대 7만원씩 받던 기여금이 0원이 돼요. 둘째, 비과세 혜택 상실이에요. 이자에 대해 15.4% 세금을 내야 해요. 셋째, 중도해지이율 적용으로 이자가 확 줄어요. 약정금리 4.5~6% 대신 1~2%만 받게 돼요.</p>
      <BorderBox>
        <strong>청년도약계좌 중도해지 불이익은 뭐가 있나요?</strong><br />
        첫째, 정부 기여금 전액 환수예요. 매월 최대 7만원씩 받던 기여금이 0원이 돼요. 둘째, 비과세 혜택 상실이에요. 이자에 대해 15.4% 세금을 내야 해요. 셋째, 중도해지이율 적용으로 이자가 확 줄어요. 약정금리<br />
        넷째, 재가입까지 2개월을 기다려야 해요. 재가입해도 기가입 기간에 따라 기여금이 차감돼요. 이미 납입한 원금은 찾을 수 있지만 혜택은 모두 날아가요. 급하게 돈이 필요하더라도 청년전용 버팀목전세자금대출이나 담보대출
      </BorderBox>
      <p style={body}>넷째, 재가입까지 2개월을 기다려야 해요. 재가입해도 기가입 기간에 따라 기여금이 차감돼요. 이미 납입한 원금은 찾을 수 있지만 혜택은 모두 날아가요. 급하게 돈이 필요하더라도 청년전용 버팀목전세자금대출이나 담보대출을 먼저 알아보세요.</p>

      <Divider />
      <H2>청년도약계좌 3년 해지하면 혜택을 받을 수 있나요?</H2>
      <p style={body}>3년 이상 유지하고 해지하면 일부 혜택을 받을 수 있어요. 정부 기여금의 60%가 지급돼요. 5년 만기까지 못 채워도 최소 3년은 유지하는 게 유리해요. 비과세 혜택도 유지되니까 이자소득세 15.4%를 안 내도 돼요.</p>
      <p style={body}>예를 들어 3년간 기여금 100만원이 쌓였다면 60만원을 받을 수 있어요. 0원보다는 훨씬 낫죠. 5년이 부담스럽다면 '3년'을 심리적 마지노선으로 잡으세요. 청년희망적금처럼 만기가 짧은 상품과 비교해보는 것도 좋아요. 3년 유지 후 해지하면 일반 적금보다 확실히 이득이에요.</p>

      <Divider />
      <H2>청년도약계좌 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
