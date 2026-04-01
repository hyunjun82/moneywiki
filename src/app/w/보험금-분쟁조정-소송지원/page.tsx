"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 보험금 분쟁조정에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 금융감독원 분쟁조정 결과에 불복하면 소송을 제기할 수 있고, 소송비용 지원을 받을 수 있어요., 금융감독원 산하 금융소비자보호재단에서 변호사 비용과 소송비용을 지원해요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "보험금 분쟁조정 신청 후 얼마나 걸리나요?", a: "보통 3~6개월 정도 걸려요. 사건의 복잡도에 따라 더 오래 걸릴 수도 있어요. 조정이 끝나면 결과를 서면으로 통지받아요." },
  { q: "분쟁조정 결과를 보험회사가 안 따르면 어떻게 되나요?", a: "보험회사가 조정안을 수락하지 않으면 소송으로 가야 해요. 하지만 조정 과정에서 나온 자료들은 소송에서 유리한 증거로 활용할 수 있어요." },
  { q: "소송지원은 누구나 받을 수 있나요?", a: "아니에요. 소득이나 재산 기준이 있고, 승소 가능성도 심사해요. 분쟁조정을 먼저 거친 경우와 금액이 큰 경우 우선 지원받을 수 있어요." },
  { q: "보험금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "보험금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr" },
  { name: "금융소비자보호법", href: "https://www.law.go.kr/법령/금융소비자보호법" },
];

const RELATED = [
  { slug: "금융감독원-민원-신청", title: "금융감독원 민원 신청", description: "관련 내용 정리." },
  { slug: "보험금-청구-절차", title: "보험금 청구 절차", description: "관련 내용 정리." },
  { slug: "소송비용-지원-제도", title: "소송비용 지원 제도", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보험금 분쟁조정 후 소송지원 제도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        금융감독원 분쟁조정 결과에 불복하면 소송을 제기할 수 있고, 소송비용 지원을 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>보험금 분쟁조정이란</H2>
      <p style={body}>보험회사랑 보험금 문제로 다툴 때 금융감독원에서 중간에서 조정해 주는 제도예요. 법원 소송보다 빠르고 비용도 안 들어서 많은 분들이 이용하죠.</p>
      <GreenBox>
        금융감독원 분쟁조정 결과에 불복하면 소송을 제기할 수 있고, 소송비용 지원을 받을 수 있어요.{"\n"}
        금융감독원 산하 금융소비자보호재단에서 변호사 비용과 소송비용을 지원해요.{"\n"}
        지원 한도는 사건당 최대 500만 원이며, 승소 확률이 높은 경우 우선 지원돼요.
      </GreenBox>
      <p style={body}>분쟁조정위원회에서 양쪽 주장을 듣고 증거를 살펴본 뒤 조정안을 제시해요. 쉽게 말해 "이 정도로 합의하는 게 어때요?"라고 중재해 주는 거예요.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>분쟁조정 후 소송 제기 가능 여부</H2>
      <p style={body}>분쟁조정 결과가 마음에 안 들면 당연히 소송을 제기할 수 있어요. 조정은 어디까지나 합의를 시도하는 절차일 뿐, 법적 구속력은 없거든요.</p>
      <BorderBox>
        <strong>분쟁조정 후 소송 제기 가능 여부</strong><br />
        분쟁조정 결과가 마음에 안 들면 당연히 소송을 제기할 수 있어요. 조정은 어디까지나 합의를 시도하는 절차일 뿐, 법적 구속력은 없거든요.<br />
        조정안을 거부하고 법원에 소송을 내면 돼요. 시간과 비용이 더 들지만, 제대로 된 판결을 받을 수 있어요. 특히 조정 과정에서 나온 증거들은 소송에서 유리하게 활용할 수 있어요.
      </BorderBox>
      <p style={body}>조정안을 거부하고 법원에 소송을 내면 돼요. 시간과 비용이 더 들지만, 제대로 된 판결을 받을 수 있어요. 특히 조정 과정에서 나온 증거들은 소송에서 유리하게 활용할 수 있어요.</p>

      <Divider />
      <H2>금융소비자 소송지원 제도</H2>
      <p style={body}>금융감독원 산하 금융소비자보호재단에서 소송비용을 지원해 주는 제도가 있어요. 금융회사와 분쟁이 생긴 소비자들을 돕기 위한 거예요.</p>
      <p style={body}>변호사 선임 비용, 소송 수수료, 감정료 같은 소송에 드는 비용을 지원해 줘요. 사건당 최대 500만 원까지 지원받을 수 있어요.</p>
      <p style={body}>누구나 다 받는 건 아니에요. 소득이나 재산 기준이 있고, 승소 가능성도 심사해요. 분쟁조정을 먼저 거친 경우나 피해 금액이 큰 경우 우선적으로 지원해 줘요.</p>

      <Divider />
      <H2>보험금 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
