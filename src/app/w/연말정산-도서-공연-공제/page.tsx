"use client";
// Q1. 도서·공연·영화비로 얼마나 공제받을 수 있는지 궁금한 직장인
// Q2. 공제 대상 항목과 한도를 파악하고, 문화비 지출을 공제에 활용한다
// Q3. 30% 공제율, 총급여 7천만원 이하 조건, 추가한도 300만원(전통시장·대중교통 포함), 대상 항목(도서/공연/영화/헬스장)
// Q4. GreenBox(핵심 수치) + DocTable(대상 항목 비교) + BorderBox(제외 항목) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CULTURE_TABLE = {
  headers: ["항목", "공제 여부", "공제율", "비고"],
  rows: [
    ["종이책·전자책·오디오북", "O", "30%", "신문·잡지 구독료는 제외"],
    ["뮤지컬·연극·콘서트", "O", "30%", "스포츠 경기는 제외"],
    ["박물관·미술관 입장료", "O", "30%", ""],
    ["영화관 관람료", "O", "30%", "OTT·VOD는 제외"],
    ["헬스장·수영장", "O", "30%", "2025년 7월분부터 적용"],
    ["OTT 구독료 (넷플릭스 등)", "X", "-", "영화관 관람만 인정"],
    ["신문·잡지 구독", "X", "-", "도서 공제 대상 아님"],
    ["스포츠 경기 관람", "X", "-", "공연 공제 대상 아님"],
  ],
};

const FAQS = [
  { q: "총급여 7천만원 초과하면 아예 못 받나요?", a: "문화비 30% 공제는 못 받아요. 대신 일반 신용카드 소득공제(15%)는 적용돼요. 체크카드로 결제했으면 30% 공제는 받을 수 있고요." },
  { q: "전자책도 공제되나요?", a: "네, 종이책·전자책·오디오북 모두 30% 공제돼요. 교보문고, 예스24, 알라딘 등 서점 구매도 포함돼요." },
  { q: "넷플릭스나 티빙도 공제되나요?", a: "아니에요. OTT 구독료나 VOD 결제는 공제 대상이 아니에요. 영화관에서 직접 보는 관람료만 인정돼요." },
  { q: "문화비 공제 한도가 따로 있나요?", a: "전통시장·대중교통·문화비를 합쳐서 추가 한도 300만원이에요. 기본 신용카드 한도(200~300만원)와 별도라서 기본 한도를 다 채워도 문화비는 추가로 공제받을 수 있어요." },
  { q: "헬스장 이용료도 정말 공제되나요?", a: "2025년 7월 결제분부터 헬스장(체력단련장)과 수영장 이용료도 문화비 30% 공제에 포함돼요. 체육시설법에 따른 등록 시설이어야 해요." },
  { q: "공제를 받으려면 뭘 해야 하나요?", a: "신용카드·체크카드·현금영수증으로 결제하면 간소화 서비스에 자동 반영돼요. 별도 신청은 필요 없어요." },
];

const SOURCES = [
  { name: "문화체육관광부 문화비 소득공제", href: "https://www.culture.go.kr/deduction/" },
  { name: "조세특례제한법 제126조의2", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "국세청", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-공제항목", title: "연말정산 공제항목 종류", description: "소득공제와 세액공제 항목별 한도 비교." },
  { slug: "연말정산-과세표준", title: "연말정산 과세표준 세율", description: "과세표준 구간별 세율과 계산법." },
  { slug: "연말정산-부양가족-공제", title: "부양가족 공제 조건", description: "가족 1명당 150만원 소득공제 요건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 문화비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        도서·공연·영화 공제, 30% 받는 법<br />
        대상 항목과 한도 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        책 사고, 영화 보고, 뮤지컬 본 비용도 연말정산에서 공제받을 수 있어요. 문화비는 공제율이 30%라서 일반 신용카드 15%의 2배예요.
      </p>
      <p style={body}>
        다만 총급여 7천만원 이하 근로자만 해당되고, <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 제126조의2</a>에 따라 추가 한도 300만원(전통시장·대중교통 포함)이 기본 한도와 별도로 적용돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>문화비 공제 핵심 수치</H2>
      <p style={body}>
        문화비 공제의 핵심만 먼저 정리하면 이래요.
      </p>

      <GreenBox>
        공제율: 30% (신용카드 15%의 2배){"\n"}
        대상: 총급여 7,000만원 이하 근로자{"\n"}
        추가 한도: 300만원 (전통시장·대중교통·문화비 합산){"\n"}
        전제조건: 총급여의 25% 초과 사용해야 공제 시작
      </GreenBox>

      <CategoryButton label="연말정산" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>어떤 항목이 공제되고, 안 되나요?</H2>
      <p style={body}>
        같은 문화 소비라도 공제되는 항목과 안 되는 항목이 있어요. 헷갈리는 부분을 정리했어요.
      </p>
      <SectionBadge>문화비 공제 대상 항목 (2025년 귀속)</SectionBadge>
      <DocTable headers={CULTURE_TABLE.headers} rows={CULTURE_TABLE.rows} />

      <Divider />

      <H2>공제 안 되는 항목, 주의하세요</H2>
      <p style={body}>
        문화비라고 다 공제되는 건 아니에요. 자주 혼동하는 항목이에요.
      </p>

      <BorderBox>
        <strong>문화비 공제 제외 항목</strong><br />
        OTT 구독료: 넷플릭스, 티빙, 웨이브 등 (영화관 관람만 인정){"\n"}
        신문·잡지 구독: 도서 공제 대상 아님{"\n"}
        스포츠 경기 관람: 야구, 축구 등 (공연만 인정){"\n"}
        학습지·문제집: 교육 목적은 교육비 공제로 별도 처리
      </BorderBox>

      <Divider />

      <H2>문화비 공제, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 조세특례제한법을 기준으로 작성했어요. 공제 대상과 한도는 법 개정에 따라 달라질 수 있으니 문화체육관광부 문화비 소득공제 사이트에서 최신 정보를 확인해보세요." />
    </ArticleLayout>
  );
}
