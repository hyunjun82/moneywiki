"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 손택스에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 손택스 앱에서 연말정산 간소화자료 조회와 PDF 제출이 가능해요., 간편인증(카카오, 네이버)이나 생체인증으로 로그인할 수 있어요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "손택스에서 연말정산 가능한가요?", a: "네. 간소화자료 조회와 PDF 발급이 가능해요." },
  { q: "손택스 로그인 방법은?", a: "공동인증서, 간편인증(카카오, 네이버), 생체인증으로 로그인해요." },
  { q: "손택스 이용 시간은 언제예요?", a: "매일 06:00~24:00에 이용할 수 있어요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-간소화서비스-이용방법", title: "연말정산 간소화서비스 이용방법", description: "관련 내용 정리." },
  { slug: "연말정산-환급금-조회", title: "연말정산 환급금 조회", description: "관련 내용 정리." },
  { slug: "연말정산", title: "연말정산", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 손택스
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        손택스 앱에서 연말정산 간소화자료 조회와 PDF 제출이 가능해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>손택스가 뭔가요</H2>
      <p style={body}>국세청 공식 모바일 앱이에요.</p>
      <GreenBox>
        손택스 앱에서 연말정산 간소화자료 조회와 PDF 제출이 가능해요.{"\n"}
        간편인증(카카오, 네이버)이나 생체인증으로 로그인할 수 있어요.
      </GreenBox>
      <p style={body}>홈택스에서 할 수 있는 대부분의 업무를 스마트폰에서 처리할 수 있어요. 연말정산 간소화자료 조회, PDF 다운로드, 회사에 자료 전송까지 가능해요.</p>

      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>어떻게 다운받아요</H2>
      <p style={body}>앱스토어나 플레이스토어에서 "손택스"를 검색하면 돼요.</p>
      <BorderBox>
        <strong>어떻게 다운받아요</strong><br />
        앱스토어나 플레이스토어에서 "손택스"를 검색하면 돼요.<br />
        아이폰은 앱스토어에서, 안드로이드는 플레이스토어에서 무료로 다운로드할 수 있어요. "손택스"로 검색하면 국세청 공식 앱이 나와요.
      </BorderBox>
      <p style={body}>아이폰은 앱스토어에서, 안드로이드는 플레이스토어에서 무료로 다운로드할 수 있어요. "손택스"로 검색하면 국세청 공식 앱이 나와요.</p>

      <Divider />
      <H2>로그인은 어떻게 해요</H2>
      <p style={body}>3가지 방법으로 로그인할 수 있어요.</p>
      <p style={body}>공동인증서(구 공인인증서)나 금융인증서로 로그인할 수 있어요. 카카오, 네이버 같은 간편인증도 가능해요. 지문이나 Face ID 같은 생체인증도 지원돼요.</p>
      <p style={body}>간편인증이 가장 편해요. 카카오나 네이버 계정만 있으면 별도 인증서 없이 바로 로그인할 수 있어요.</p>

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
