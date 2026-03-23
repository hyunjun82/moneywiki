"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps, DocTable, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  {
    "q": "초등학생 학원비도 공제되나요?",
    "a": "안 돼요. 미취학 아동(유치원·어린이집·학원비)만 공제되고, 초등학교 이상 학원비(보습·입시)는 공제 대상이 아니에요."
  },
  {
    "q": "대학 등록금 전액 공제 가능한가요?",
    "a": "연 900만원 한도 내에서 15% 세액공제예요. 등록금이 900만원이면 최대 135만원 세금을 줄일 수 있어요."
  },
  {
    "q": "맞벌이 부부는 누가 공제받나요?",
    "a": "자녀를 기본공제 대상으로 올린 쪽이 교육비도 공제받아요. 총급여가 높은 쪽이 유리해요."
  },
  {
    "q": "체험학습비도 교육비 공제 되나요?",
    "a": "초·중·고 학생의 체험학습비는 연 30만원 한도로 공제돼요."
  },
  {
    "q": "본인 대학원비는 한도가 없다고요?",
    "a": "네. 본인의 교육비(대학원·직업훈련비 등)는 한도 없이 전액 15% 세액공제돼요."
  }
];
const SOURCES = [
  {
    "name": "소득세법 제59조의4",
    "href": "https://www.law.go.kr/법령/소득세법"
  },
  {
    "name": "국세청 연말정산 안내",
    "href": "https://www.nts.go.kr"
  }
];
const RELATED = [
  {
    "slug": "연말정산-취학전-아동-교육비",
    "title": "취학전 아동 교육비",
    "description": "미취학 아동 교육비 공제."
  },
  {
    "slug": "연말정산-특별공제",
    "title": "연말정산 특별공제",
    "description": "5가지 특별공제 항목."
  },
  {
    "slug": "연말정산-약국비",
    "title": "연말정산 약국비",
    "description": "의료비 세액공제 기준."
  }
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 교육비</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>연말정산 교육비, 얼마까지 공제되나?<br />대상 항목과 세액공제 한도</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>자녀 학원비나 대학 등록금이 연말정산에서 공제되는지 궁금하죠.</p>
      <p style={body}>교육비 세액공제는 본인은 한도 없이, 자녀는 연 300만원 한도로 납입액의 15%를 세액공제받아요. 소득세법에서 정한 대상 항목에 해당해야 해요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>공제 대상과 한도</H2>
      <p style={body}>대상별로 한도가 달라요.</p>
      <SectionBadge>공제 대상과 한도</SectionBadge>
      <DocTable headers={["대상","한도","비고"]} rows={[["본인","한도 없음","대학원·직업훈련비 포함"],["자녀(초·중·고)","연 300만원","수업료·급식비·교과서대"],["자녀(대학)","연 900만원","입학금·수업료"],["미취학 아동","연 300만원","어린이집·유치원·학원비"]]} />

      <CategoryButton label="세금 정보" count={10} href="/category/세금" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>공제 안 되는 항목 주의</H2>
      <p style={body}>교육비처럼 보이지만 공제 대상이 아닌 항목이 있어요.</p>
      <BorderBox><strong>공제 안 되는 항목 주의</strong><br />학습지·과외비 (사교육) → 공제 불가<br />입시학원·보습학원 (초등 이상) → 공제 불가<br />유치원·어린이집은 → 공제 가능<br />대학 기숙사비 → 공제 가능 (교육비에 포함)</BorderBox>
      <Divider />

      <H2>교육비 빠짐없이 챙기는 법</H2>
      <p style={body}>간소화 자료에 안 뜨는 교육비도 있어요.</p>
      <SectionBadge>교육비 빠짐없이 챙기는 법</SectionBadge>
      <Steps steps={[{"title":"홈택스 간소화 확인","desc":"1월에 교육비 내역을 확인해요."},{"title":"누락분 영수증 수집","desc":"해외 교육비, 학원비 등 누락된 항목은 영수증을 직접 받아요."},{"title":"회사에 제출","desc":"간소화 자료 + 추가 영수증을 회사에 제출하면 돼요."}]} />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 공제 대상과 한도는 세법 개정에 따라 달라질 수 있으니, 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
