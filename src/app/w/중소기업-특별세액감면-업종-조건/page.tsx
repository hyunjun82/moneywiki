"use client";

// Q1. 중소기업을 운영하는데 세액감면을 받을 수 있는 업종인지 확인하려는 상황
// Q2. 우리 회사가 감면 대상 업종인지 확인하고 법인세·소득세 신고 시 감면을 적용한다
// Q3. 감면 대상 업종 목록, 감면율(5~30%), 매출 기준, 수도권/비수도권 차이, 신청 방법
// Q4. DocTable(업종별 감면율) + EligibilityChecker(대상 확인) + GreenBox(감면율 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const INDUSTRY_TABLE = {
  headers: ["업종", "수도권", "비수도권", "비고"],
  rows: [
    ["제조업", "10%", "30%", "소기업 기준"],
    ["도·소매업", "5%", "15%", "소기업 기준"],
    ["음식·숙박업", "5%", "15%", "소기업 기준"],
    ["건설업", "10%", "30%", "소기업 기준"],
    ["운수업", "5%", "15%", "소기업 기준"],
    ["출판·영상·통신업", "10%", "30%", "소기업 기준"],
    ["전문·과학·기술서비스업", "10%", "30%", "소기업 기준"],
    ["사업지원서비스업", "5%", "15%", "소기업 기준"],
    ["교육서비스업", "5%", "15%", "소기업 기준"],
  ],
};

const ELIGIBILITY = [
  { id: "e1", label: "중소기업기본법상 중소기업에 해당한다" },
  { id: "e2", label: "감면 대상 업종을 영위하고 있다" },
  { id: "e3", label: "직전 과세연도 매출이 업종별 기준 이내다" },
  { id: "e4", label: "부동산임대업, 유흥업 등 제외 업종이 아니다" },
];

const FAQS = [
  { q: "중기업과 소기업의 감면율 차이가 있나요?", a: "네. 소기업은 업종별 5~30% 감면을 받지만, 중기업은 소기업 감면율의 절반 수준이에요. 예를 들어 제조업 소기업이 비수도권에서 30%면 중기업은 15%예요." },
  { q: "수도권 과밀억제권역이 어디인가요?", a: "서울 전역, 인천(일부 제외), 의정부·구리·하남·고양·수원·성남·안양·부천·광명·과천·시흥(일부) 등이에요. 국토교통부 고시에서 확인할 수 있어요." },
  { q: "두 가지 업종을 같이 하면 어떻게 되나요?", a: "주된 업종의 매출 비율이 50% 이상이면 그 업종 기준으로 감면받아요. 업종별로 안분 계산하는 것도 가능해요. 세무사와 상의하는 게 정확해요." },
  { q: "감면 신청은 별도로 해야 하나요?", a: "법인세·소득세 신고서에 중소기업 특별세액감면 신청서를 첨부하면 돼요. 별도 사전 신청은 필요 없어요." },
  { q: "부동산임대업은 왜 제외되나요?", a: "조세특례제한법에서 부동산임대업, 유흥주점업 등은 감면 대상에서 제외하고 있어요. 정책적으로 생산적 산업을 우대하는 취지예요." },
  { q: "감면 한도가 있나요?", a: "1억원 한도가 있어요. 감면세액이 1억원을 넘으면 1억원까지만 감면돼요. 농어촌특별세(감면세액의 20%)도 별도로 내야 해요." },
];

const SOURCES = [
  { name: "조세특례제한법 제7조", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "국세청 중소기업 세액감면 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "중소기업-청년-소득세-감면-신청", title: "중소기업 청년 소득세 감면", description: "중소기업에 취업한 청년 근로자 소득세 감면." },
  { slug: "법인세-신고-기한-세율", title: "법인세 신고 기한과 세율", description: "법인세 신고 일정과 세율 구간 정리." },
  { slug: "개인사업자-퇴직연금", title: "개인사업자 퇴직연금", description: "개인사업자도 퇴직연금을 활용할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 법인세 · 소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        중소기업 특별세액감면, 우리 회사도 되나?<br />
        업종별 감면율과 적용 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        법인세 신고할 때 중소기업이면 세금을 깎아준다는 건 알겠는데, 우리 업종이 대상인지 모르겠죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 제7조</a>에서 정한 업종에 해당하면 법인세·소득세의 5~30%를 감면받을 수 있어요. 수도권이냐 비수도권이냐에 따라 감면율이 크게 달라지고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>업종별 감면율은 이렇게 돼요</H2>
      <p style={body}>
        소기업 기준 감면율이에요. 중기업은 이 감면율의 절반 수준이에요.
      </p>

      <SectionBadge>업종별 세액감면율 (소기업 기준)</SectionBadge>
      <DocTable headers={INDUSTRY_TABLE.headers} rows={INDUSTRY_TABLE.rows} />

      <p style={body}>
        제조업·건설업·전문서비스업이 비수도권에 있으면 30%로 가장 높아요. 감면 한도는 연 1억원이고, 농어촌특별세(감면액의 20%)는 별도로 내야 해요.
      </p>

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>감면 대상인지 먼저 확인하세요</H2>
      <p style={body}>
        업종이 맞아도 매출 기준이나 제외 업종에 걸리면 안 돼요.
      </p>

      <EligibilityChecker items={ELIGIBILITY} allMatchText="세액감면 대상에 해당할 가능성이 높아요" partialMatchText="일부 조건을 확인해보세요" />

      <Divider />

      <H2>감면 제외 업종은 꼭 확인하세요</H2>
      <p style={body}>
        중소기업이라도 아래 업종은 감면 대상에서 빠져요.
      </p>

      <BorderBox>
        <strong>감면 제외 업종</strong><br />
        부동산임대업 · 유흥주점업 · 무도유흥업{"\n"}<br />
        금융·보험업 · 전문직 서비스업(법무·회계·세무){"\n"}<br />
        소비성 서비스업 일부
      </BorderBox>

      <p style={body}>
        정확한 업종 분류는 한국표준산업분류(KSIC) 코드로 판단해요. 업종 코드가 애매하면 관할 세무서에 문의하는 게 확실해요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>중소기업 세액감면에서 자주 헷갈리는 부분이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 조세특례제한법을 바탕으로 작성했어요. 업종 분류와 감면율은 세법 개정에 따라 달라질 수 있으니, 국세청(nts.go.kr)이나 관할 세무서에서 확인하세요." />
    </ArticleLayout>
  );
}
