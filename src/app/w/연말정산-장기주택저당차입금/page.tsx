"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 주택담보대출에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 주택담보대출 이자는 연 1,800만원까지 소득공제돼요., 상환기간 15년 이상, 주택가액 6억원 이하 조건 맞아야 해요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "주택담보대출 이자 얼마까지 공제받을 수 있나요?", a: "상환기간 15년 이상이면 연 1,800만원까지, 15년 미만이면 500~1,500만원까지예요." },
  { q: "아파트 가격 제한이 있나요?", a: "네, 주택 기준시가 6억원 이하만 공제 대상이에요." },
  { q: "원금 상환액도 공제되나요?", a: "아니요, 이자만 공제돼요. 원금은 공제 대상이 아니에요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-jutaegjageum-gongje", title: "연말정산 주택자금공제", description: "관련 내용 정리." },
  { slug: "연말정산-jutaegimchachaipgeum", title: "연말정산 주택임차차입금", description: "관련 내용 정리." },
  { slug: "연말정산-sodeukgongje", title: "연말정산 소득공제", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 장기주택저당차입금
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주택담보대출 이자는 연 1,800만원까지 소득공제돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>장기주택저당차입금이 뭐예요?</H2>
      <p style={body}>연말정산에서 장기주택저당차입금은 주택 매입 시 빌린 주택담보대출의 이자를 소득공제해주는 거예요. 원금은 공제 안 되고 이자만 인정돼요. 예를 들어 대출 3억원 받아서 연 이자 900만원 냈다면, 900만원이 총급여에서 빠지는 거죠. 소득세법상 정식 명칭이 "장기주택저당차입금 이자상환액 공제"예요.</p>
      <GreenBox>
        주택담보대출 이자는 연 1,800만원까지 소득공제돼요.{"\n"}
        상환기간 15년 이상, 주택가액 6억원 이하 조건 맞아야 해요.{"\n"}
        15년 미만은 연 500~1,500만원 한도로 제한돼요.
      </GreenBox>

      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>공제 요건은요?</H2>
      <p style={body}>15년 이상, 6억원 이하, 무주택자 조건이에요.</p>
      <BorderBox>
        <strong>공제 요건은요?</strong><br />
        15년 이상, 6억원 이하, 무주택자 조건이에요.<br />
        첫째, 상환기간 15년 이상이어야 해요. 10년이나 20년 대출이면 조건에 따라 한도가 달라져요. 둘째, 주택 기준시가 6억원 이하여야 해요. 아파트 시세가 아니라 국세청이 정한 기준시가 기준이죠. 셋째, 대출 실행
      </BorderBox>
      <p style={body}>첫째, 상환기간 15년 이상이어야 해요. 10년이나 20년 대출이면 조건에 따라 한도가 달라져요. 둘째, 주택 기준시가 6억원 이하여야 해요. 아파트 시세가 아니라 국세청이 정한 기준시가 기준이죠. 셋째, 대출 실행일 현재 무주택 또는 1주택자여야 해요. 2주택 이상이면 공제 안 돼요. 넷째, 주택 소유권 이전일부터 3개월 이내 대출 받아야 해요.</p>

      <Divider />
      <H2>상환기간별 한도는요?</H2>
      <p style={body}>15년 이상 1,800만원, 미만은 500~1,500만원이에요.</p>
      <p style={body}>상환기간에 따라 공제 한도가 달라요. 15년 이상 30년 미만은 연 1,500만원, 30년 이상은 1,800만원까지 공제돼요. 10년 이상 15년 미만은 1,000만원, 10년 미만은 500만원으로 제한되죠. 예를 들어 30년 대출 받고 이자 2,000만원 냈다면, 1,800만원까지만 공제되고 200만원은 제외되는 거예요.</p>

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
