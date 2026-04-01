"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 버스·지하철 이용 금액이 연말정산에서 공제되는지, 한도가 얼마인지 궁금한 직장인
// Q2: 대중교통 소득공제 조건과 한도 확인
// Q3: 공제율 80%(2024~), 추가공제 300만원 한도, 총급여 25% 초과 시 적용, KTX·시외버스 포함
// Q4: GreenBox(핵심) + BorderBox(공제율 비교) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "교통카드(신용카드·체크카드·현금영수증)로 결제한 대중교통비 확인",
  "대상: 버스, 지하철, KTX, 시외버스, 마을버스 등",
  "택시·자가용 주유비는 대중교통 공제 대상 아님",
  "총급여의 25% 초과 사용분부터 공제 시작",
  "공제율 80% (2024년부터 인상, 기존 40%)",
  "추가공제 한도 300만원 (전통시장·도서공연비와 합산)",
];

const FAQS = [
  { q: "대중교통 공제율이 얼마예요?", a: "80%예요. 2024년부터 기존 40%에서 80%로 대폭 인상됐어요. 신용카드 기본 공제(15%)보다 훨씬 높아요." },
  { q: "KTX도 포함되나요?", a: "네, KTX·SRT·시외버스·고속버스·마을버스 모두 포함돼요. 단, 택시와 비행기는 포함 안 돼요." },
  { q: "교통카드 외에 현금으로 타면요?", a: "현금영수증을 받았으면 공제돼요. 현금영수증 없이 현금으로 결제하면 공제를 못 받아요." },
  { q: "총급여 25% 문턱은 뭔가요?", a: "신용카드 등 총 사용액이 총급여의 25%를 넘어야 공제가 시작돼요. 이 문턱 안에서는 대중교통비도 공제 대상이 아니에요." },
  { q: "택시비는 공제 안 되나요?", a: "택시비는 대중교통 공제가 아니라 일반 신용카드 사용분(15%)으로 공제돼요. 체크카드로 결제하면 30%예요." },
];

const REFERENCES = [
  { category: "법령·안내", items: [
    { label: "조세특례제한법 제126조의2", url: "https://www.law.go.kr/법령/조세특례제한법" },
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-도서공연비", title: "연말정산 도서공연비", description: "도서·공연비도 추가공제 대상이에요." },
  { slug: "연말정산-체크카드", title: "연말정산 체크카드", description: "체크카드 공제율이 더 높아요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대중교통비 연말정산 공제율 80%, 한도는?<br />
        버스·지하철·KTX 공제 조건
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매일 버스와 지하철을 타는데 연말정산에서 얼마나 돌려받을 수 있는지 궁금하죠?
        대중교통비 소득공제율이 2024년부터 80%로 올랐어요.
        KTX, 시외버스까지 포함되고 추가공제 한도 300만원이에요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>대중교통 공제 핵심</H2>
      <p style={body}>대중교통비는 신용카드 소득공제 중에서 가장 높은 공제율을 받아요.</p>
      <GreenBox title="공제 핵심">
        공제율: 80% (2024년~ 인상)<br />
        대상: 버스, 지하철, KTX, SRT, 시외버스, 마을버스<br />
        제외: 택시, 비행기, 자가용 주유비<br />
        한도: 추가공제 300만원 (전통시장·도서공연비와 합산)
      </GreenBox>

      <BorderBox>
        <strong>공제율 비교</strong><br />
        대중교통: 80%<br />
        전통시장: 50%<br />
        도서·공연·영화: 30%<br />
        체크카드·현금영수증: 30%<br />
        신용카드: 15%
      </BorderBox>

      <CategoryButton label="세금·연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>공제받으려면 이것만 확인하세요</H2>
      <SectionBadge>대중교통 공제 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 공제율과 한도는 세법 개정에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
