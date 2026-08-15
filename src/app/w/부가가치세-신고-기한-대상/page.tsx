"use client";
// Q1. 부가가치세에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 개인 일반사업자는 1월 25일까지, 간이과세자는 1년에 한 번 신고해요., 법인사업자는 1년에 4회 신고하고, 개인사업자는 2회 신고해요.
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "부가가치세 신고 안 하면 어떻게 되나요?", a: "신고불성실가산세와 납부지연가산세가 부과돼요. 무신고 시 산출세액의 20%가 가산세로 붙어요." },
  { q: "간이과세자 부가세 신고는 언제 하나요?", a: "1년에 한 번, 다음 해 1월 25일까지 신고해요. 2025년 1월 1일부터 12월 31일까지의 전체 실적을 2026년 1월 25일까지 신고하는 거예요." },
  { q: "부가가치세 환급은 얼마나 걸리나요?", a: "신고 후 약 30일 이내에 환급금이 지정한 계좌로 입금돼요. 조기환급 신청하면 더 빠르게 받을 수 있어요." },
  { q: "부가가치세 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "부가가치세 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 홈택스 부가가치세", href: "https://hometax.go.kr" },
  { name: "국세청 부가가치세 개요", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "종합소득세-신고", title: "종합소득세 신고 방법", description: "관련 내용 정리." },
  { slug: "사업자등록-신청", title: "사업자등록 신청", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부가가치세 신고 기한 대상 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        개인 일반사업자는 1월 25일까지, 간이과세자는 1년에 한 번 신고해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>부가가치세 신고 기한 2026</H2>
      <p style={body}>개인 일반사업자는 2025년 7월 1일부터 12월 31일까지의 실적을 2026년 1월 1일부터 1월 25일까지 신고해요. 간이과세자는 1년에 한 번 신고하는데요. 2025년 1월 1일부터 12월 31일까지의 전체 실적을 2026년 1월 25일까지 신고하면 돼요.</p>
      <GreenBox>
        개인 일반사업자는 1월 25일까지, 간이과세자는 1년에 한 번 신고해요.{"\n"}
        법인사업자는 1년에 4회 신고하고, 개인사업자는 2회 신고해요.{"\n"}
        홈택스와 손택스로 간편하게 신고 가능해요.
      </GreenBox>
      <p style={body}>법인사업자는 2025년 4분기(10월~12월) 실적에 대한 확정 신고를 동일한 기간 내에 마쳐야 해요. 2026년 1월 25일은 일요일이므로, 국세기본법에 따라 신고 및 납부 기한은 그다음 영업일인 1월 26일(월요일)까지 연장돼요.</p>

      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>부가가치세 신고 대상</H2>
      <p style={body}>법인사업자는 1년에 4회, 개인사업자는 2회 신고해요. 과세기간 중에 월별 조기환급 신고를 한 경우에는 해당기간의 실적은 제외하고 신고하면 돼요.</p>
      <BorderBox>
        <strong>부가가치세 신고 대상</strong><br />
        법인사업자는 1년에 4회, 개인사업자는 2회 신고해요. 과세기간 중에 월별 조기환급 신고를 한 경우에는 해당기간의 실적은 제외하고 신고하면 돼요.<br />
        간이과세자는 1년을 과세기간으로 하여 신고·납부해요. 연 매출 8,000만원 미만의 소규모 사업자가 간이과세자예요.
      </BorderBox>
      <p style={body}>간이과세자는 1년을 과세기간으로 하여 신고·납부해요. 연 매출 8,000만원 미만의 소규모 사업자가 간이과세자예요.</p>

      <Divider />
      <H2>부가가치세 신고 방법 홈택스</H2>
      <p style={body}>홈택스에 로그인한 후, 상단 메뉴에서 세금신고 → 부가가치세 신고 → 정기신고(확정/예정) 순서로 접속하면 본인의 사업자 정보가 입력된 신고 화면이 나타나요.</p>
      <p style={body}>디지털 시대에 맞춰 국세청 홈택스와 손택스(모바일)를 활용하면 집에서도 간편하게 부가세 신고가 가능해요. 세무사 없이도 충분히 할 수 있죠.</p>
      <p style={body}>마감일에는 국세청 홈택스 접속이 폭주할 수 있으므로 가급적 미리 완료하는 것이 좋아요. 마지막 날까지 미루지 마세요.</p>

      <Divider />
      <H2>부가가치세 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
