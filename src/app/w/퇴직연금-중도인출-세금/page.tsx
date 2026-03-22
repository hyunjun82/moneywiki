"use client";

// Q1. 퇴직연금 중도인출 세금에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 법정 사유로 인출하면 퇴직소득세만 내요., 법정 사유 아니면 기타소득세 16.5%가 추가로 붙어요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "법정 사유로 인출하면 세금이 얼마예요?", a: "퇴직소득세만 내요. 근속연수에 따라 다른데, 보통 실효세율 5~10% 정도예요." },
  { q: "법정 사유 아닌데 인출하면요?", a: "기타소득세 16.5%가 추가로 붙어요. 세금 폭탄 맞을 수 있어요." },
  { q: "퇴직소득세는 어떻게 계산해요?", a: "근속연수 공제 후 과세표준에 세율을 적용해요. 근속연수가 길수록 세금이 적어요." },
  { q: "세금은 언제 내요?", a: "인출할 때 원천징수돼요. 입금액에서 세금을 뺀 금액이 들어와요." },
  { q: "세액공제 받은 금액도 세금 내요?", a: "네. 세액공제 받은 납입금에 대해서는 세금을 내야 해요. 세액공제 혜택을 토해내는 거예요." },
];

const SOURCES = [
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "근로자퇴직급여보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
];

const RELATED = [
  { slug: "퇴직연금-중도인출", title: "퇴직연금 중도인출", description: "관련 내용 정리." },
  { slug: "퇴직연금-수령-세금", title: "퇴직연금 수령 세금", description: "관련 내용 정리." },
  { slug: "퇴직연금", title: "퇴직연금", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 중도인출 세금
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        법정 사유로 인출하면 퇴직소득세만 내요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>세금 구조예요</H2>
      <p style={body}>중도인출 세금은 이렇게 구성돼요.</p>
      <GreenBox>
        법정 사유로 인출하면 퇴직소득세만 내요.{"\n"}
        법정 사유 아니면 기타소득세 16.5%가 추가로 붙어요.{"\n"}
        세금 차이가 크니까 법정 사유 해당 여부를 꼭 확인하세요.
      </GreenBox>
      <p style={body}>법정 사유 인출: 퇴직소득세만 부과</p>

      <CategoryButton label="퇴직연금" count={10} href="/category/%ED%87%B4%EC%A7%81%EC%97%B0%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>법정 사유 세금이에요</H2>
      <p style={body}>법정 사유로 인출하면 퇴직소득세만 내요.</p>
      <BorderBox>
        <strong>법정 사유 세금이에요</strong><br />
        법정 사유로 인출하면 퇴직소득세만 내요.<br />
        퇴직소득세는 근속연수에 따라 달라요. 근속연수가 길수록 공제액이 커서 세금이 적어요. 실효세율은 보통 5~10% 정도예요.
      </BorderBox>
      <p style={body}>퇴직소득세는 근속연수에 따라 달라요. 근속연수가 길수록 공제액이 커서 세금이 적어요. 실효세율은 보통 5~10% 정도예요.</p>

      <Divider />
      <H2>법정 사유 아닌 경우 세금이에요</H2>
      <p style={body}>법정 사유가 아닌데 어떻게든 인출하면 기타소득세 16.5%가 붙어요.</p>
      <p style={body}>예를 들어 1,000만원을 인출하면요. 퇴직소득세 약 50~100만원 + 기타소득세 165만원 = 총 215~265만원이 빠져나가요. 세금 폭탄이에요.</p>
      <p style={body}>절대 법정 사유 아닌데 인출하지 마세요.</p>

      <Divider />
      <H2>퇴직연금 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
