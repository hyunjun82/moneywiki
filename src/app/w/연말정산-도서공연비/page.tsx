"use client";

// Q1: 책이나 공연 관람에 쓴 돈이 연말정산에서 공제되는지 궁금한 직장인
// Q2: 도서·공연비 소득공제 적용 여부와 한도 확인
// Q3: 총급여 7,000만원 이하, 신용카드 등 사용액이 총급여 25% 초과해야, 추가공제 300만원 한도, 대상 항목
// Q4: GreenBox(공제 핵심) + Checklist(공제 조건) + BorderBox(계산 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "총급여 7,000만원 이하 (7,000만원 초과 시 공제 불가)",
  "신용카드 등 사용액이 총급여의 25%를 초과해야 공제 시작",
  "도서·공연·미술관·박물관·영화 관람료가 대상",
  "온라인 서점, 전자책도 포함 (교재·학습서는 교육비 공제 대상)",
  "추가공제 한도 300만원 (전통시장·대중교통과 합산)",
  "현금영수증 또는 신용카드로 결제한 건만 인정",
];

const FAQS = [
  { q: "도서공연비 공제율이 얼마예요?", a: "30%예요. 신용카드 기본 공제(15%)보다 높아요. 다만 총급여 25%를 초과한 사용액부터 공제가 시작돼요." },
  { q: "넷플릭스나 OTT도 공제되나요?", a: "안 돼요. OTT 구독료는 도서공연비 공제 대상이 아니에요. 영화관 관람료는 2023년부터 추가됐어요." },
  { q: "온라인 서점에서 산 책도 되나요?", a: "네, 돼요. 온라인 서점 결제 금액, 전자책 구매비도 도서공연비에 포함돼요." },
  { q: "총급여 7,000만원을 넘으면 전혀 공제가 안 되나요?", a: "도서공연비 추가공제는 안 돼요. 다만 기본 신용카드 소득공제(15%)는 받을 수 있어요." },
  { q: "교재를 사면 도서공연비인가요, 교육비인가요?", a: "학원·학교 교재는 교육비 세액공제 대상이에요. 서점에서 직접 구매한 일반 서적이 도서공연비 소득공제 대상이에요." },
];

const REFERENCES = [
  { category: "법령·안내", items: [
    { label: "조세특례제한법 제126조의2", url: "https://www.law.go.kr/법령/조세특례제한법" },
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-대중교통-공제", title: "연말정산 대중교통 공제", description: "대중교통비도 추가공제 대상이에요." },
  { slug: "연말정산-체크카드", title: "연말정산 체크카드", description: "신용카드와 체크카드 공제율 차이예요." },
  { slug: "연말정산-특별세액공제-한도", title: "특별세액공제 한도", description: "연말정산 세액공제 항목별 한도 정리예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        책·공연·영화 관람료, 연말정산에서 공제될까?<br />
        도서공연비 공제 조건과 한도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        올해 서점에서 책도 많이 사고 뮤지컬도 봤는데 연말정산에서 돌려받을 수 있냐고요?
        총급여 7,000만원 이하 직장인이면 도서·공연·영화 관람료를 30% 공제율로 추가 공제받을 수 있어요.
        추가공제 한도는 전통시장·대중교통과 합쳐서 300만원이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>도서공연비 공제 구조</H2>
      <p style={body}>
        도서공연비는 신용카드 소득공제의 추가공제 항목이에요. 기본공제와 별도로 300만원까지 더 공제받을 수 있어요.
      </p>

      <GreenBox title="공제 핵심">
        대상: 도서·공연·미술관·박물관·영화 관람료<br />
        공제율: 30%<br />
        조건: 총급여 7,000만원 이하 + 신용카드 사용액이 총급여 25% 초과<br />
        한도: 추가공제 300만원 (전통시장·대중교통과 합산)
      </GreenBox>

      <BorderBox>
        <strong>계산 예시</strong><br /><br />
        총급여 5,000만원 직장인이 올해 도서·공연에 100만원 결제<br />
        공제율 30% 적용 → 30만원 소득공제<br />
        세율 15% 적용 시 → 약 4.5만원 세금 절감
      </BorderBox>

      <CategoryButton label="세금·연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>공제받으려면 이 조건을 갖춰야 해요</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기본 신용카드 사용액이 총급여의 25%를 넘어야 추가공제가 시작돼요. 이 문턱을 넘지 못하면 도서공연비 공제도 없어요.
      </p>

      <SectionBadge>도서공연비 공제 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 공제 대상과 한도는 세법 개정에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
