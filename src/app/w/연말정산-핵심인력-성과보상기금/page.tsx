"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 핵심인력에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 핵심인력 성과보상기금 50% 소득세 감면이에요., 5년 이상 근무 후 수령 시 적용돼요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "성과보상기금이 뭐예요?", a: "기업과 정부가 함께 적립해서 핵심인력에게 지급하는 목돈이에요. 내일채움공제가 대표적이에요." },
  { q: "감면율이 얼마예요?", a: "소득세 50%예요. 기금 수령액의 절반만 과세돼요." },
  { q: "중도 퇴사해도 감면받아요?", a: "5년 미만 근무 후 수령하면 감면 안 돼요. 5년 이상이어야 해요." },
  { q: "내일채움공제도 해당돼요?", a: "네. 내일채움공제, 청년내일채움공제 모두 해당돼요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 성과보상기금 과세", href: "https://www.nts.go.kr" },
  { name: "조세특례제한법 제29조의6", href: "https://www.law.go.kr/법령/조세특례제한법" },
];

const RELATED = [
  { slug: "연말정산-성과공유-중소기업", title: "연말정산 성과공유 중소기업", description: "관련 내용 정리." },
  { slug: "연말정산-중소기업-취업자-감면", title: "연말정산 중소기업 취업자 감면", description: "관련 내용 정리." },
  { slug: "연말정산", title: "연말정산", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 핵심인력 성과보상기금
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        핵심인력 성과보상기금 50% 소득세 감면이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심인력 성과보상기금이 뭔가요</H2>
      <p style={body}>중소기업 핵심인력의 장기 근속을 유도하기 위한 제도예요.</p>
      <GreenBox>
        핵심인력 성과보상기금 50% 소득세 감면이에요.{"\n"}
        5년 이상 근무 후 수령 시 적용돼요.{"\n"}
        내일채움공제, 청년내일채움공제 등이 대상이에요.
      </GreenBox>
      <p style={body}>회사, 정부, 본인이 함께 돈을 적립해요. 일정 기간 근무하면 목돈으로 지급받아요. 대표적인 게 내일채움공제예요.</p>

      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>세금이 얼마나 줄어들어요</H2>
      <p style={body}>5년 이상 근무 후 기금을 수령하면 소득세 50% 감면이에요.</p>
      <BorderBox>
        <strong>세금이 얼마나 줄어들어요</strong><br />
        5년 이상 근무 후 기금을 수령하면 소득세 50% 감면이에요.<br />
        예를 들어볼게요. 성과보상기금 3,000만원을 받았다면요. 원래 3,000만원 전액이 과세 대상이에요. 근데 50% 감면이 적용되면 1,500만원만 과세돼요.
      </BorderBox>
      <p style={body}>예를 들어볼게요. 성과보상기금 3,000만원을 받았다면요. 원래 3,000만원 전액이 과세 대상이에요. 근데 50% 감면이 적용되면 1,500만원만 과세돼요.</p>

      <Divider />
      <H2>5년 미만 근무하면요</H2>
      <p style={body}>5년 미만 근무 후 중도 퇴사하면 감면을 못 받아요. 전액 근로소득으로 과세돼요. 목돈 받을 때 세금 폭탄 맞을 수 있어요.</p>
      <p style={body}>그래서 가능하면 5년 채우는 게 유리해요. 4년 11개월에 퇴사하면 50% 감면을 놓치는 거예요.</p>

      <Divider />
      <H2>연말정산 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
