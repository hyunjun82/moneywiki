"use client";
// Q1. 책·영화·공연 지출이 많은 직장인이 연말정산에서 추가 혜택이 있는지 확인하려는 상황
// Q2. 문화비 소득공제 대상 항목을 확인하고 홈택스 간소화서비스에서 반영 여부를 점검한다
// Q3. 30% 공제율, 총급여 7천만원 이하 조건, 대상 항목(도서·공연·영화·박물관·헬스장), OTT 제외
// Q4. GreenBox(핵심 요약) + BorderBox(대상/제외 항목) + Checklist(절세 전략) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "총급여 7천만원 이하인지 확인 (초과 시 문화비 30% 적용 안 됨)",
  "도서·공연·영화·박물관 결제를 카드로 했는지 확인",
  "헬스장·수영장 이용료가 2025년 7월 이후 결제분인지 확인",
  "OTT(넷플릭스·왓챠)는 문화비 대상이 아님 주의",
  "홈택스 간소화서비스에서 문화비 항목 누락 여부 확인",
];

const FAQS = [
  {
    q: "문화비 소득공제율은 얼마예요?",
    a: "30%예요. 일반 신용카드 15%보다 2배 높아서 같은 금액을 써도 공제액이 커요.",
  },
  {
    q: "넷플릭스나 왓챠도 문화비에 포함되나요?",
    a: "아니에요. OTT 구독료, 웹툰 유료결제, 음원 스트리밍은 문화비에서 제외돼요. 일반 신용카드 15% 공제율이 적용돼요.",
  },
  {
    q: "온라인 서점에서 산 책도 되나요?",
    a: "네, 교보문고·YES24·알라딘 같은 온라인 서점도 되고, 전자책(e-book)과 오디오북도 포함돼요.",
  },
  {
    q: "헬스장 PT 비용도 공제되나요?",
    a: "2025년 7월부터 헬스장·수영장 이용료가 문화비에 포함됐어요. 다만 PT(강습) 비용은 50%만 문화비로 인정돼요.",
  },
  {
    q: "문화비 한도가 따로 있나요?",
    a: "문화비는 전통시장·대중교통과 합쳐서 추가 한도 300만원(총급여 7천만원 이하)이에요. 기본 한도 300만원과 별도예요.",
  },
  {
    q: "공연 티켓을 인터파크에서 사도 되나요?",
    a: "네, 인터파크·티켓링크 같은 온라인 티켓 판매처에서 카드 결제하면 문화비로 인정돼요.",
  },
];

const SOURCES = [
  { name: "조세특례제한법 제126조의2", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "문화비 소득공제 누리집", href: "https://www.culture.go.kr/deduction/" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
];

const RELATED = [
  { slug: "연말정산-신용카드-공제-한도", title: "신용카드 공제 한도와 계산법", description: "25% 초과분부터 시작, 카드별 공제율 정리." },
  { slug: "연말정산-근로소득-범위", title: "근로소득 범위와 비과세 항목", description: "뭐가 과세되고 뭐가 안 되는지 정리." },
  { slug: "연말정산-다자녀-추가공제", title: "다자녀 자녀세액공제", description: "자녀 수에 따라 25만~95만원 세액공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 문화비 · 소득공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        책·영화·공연비로 세금 돌려받을 수 있나요?<br />
        문화비 소득공제 30% 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        책이나 영화를 많이 보는 편인데 연말정산에서 혜택이 있는지 궁금하시죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법</a> 기준으로
        도서·공연·영화·박물관 관람비는 <strong>30% 소득공제</strong>가 적용돼요.
        일반 신용카드 15%의 2배예요.
        2025년 7월부터는 헬스장·수영장 이용료도 포함됐고요.
        다만 총급여 7천만원 이하만 해당돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>문화비 소득공제 핵심 정리</H2>
      <p style={body}>
        문화비는 <a href="/w/연말정산-신용카드-공제-한도" style={{ color: "#1D9E75", textDecoration: "underline" }}>신용카드 소득공제</a>의 특별 항목이에요.
        같은 카드 사용인데 공제율이 2배로 높아지는 거예요.
      </p>

      <SectionBadge>핵심 요약</SectionBadge>
      <GreenBox title="문화비 소득공제">
        <p><strong>공제율</strong> — 30% (일반 신용카드 15%의 2배)</p>
        <p><strong>소득 조건</strong> — 총급여 7천만원 이하 근로자</p>
        <p><strong>추가 한도</strong> — 연 300만원 (전통시장·대중교통 포함)</p>
        <p><strong>적용 시작</strong> — 총급여 25% 초과 사용분부터</p>
      </GreenBox>

      <Divider />

      <H2>어떤 게 문화비에 포함되고, 어떤 게 안 되나요?</H2>
      <p style={body}>
        비슷해 보여도 되는 것과 안 되는 것이 확실히 나뉘어요.
      </p>

      <SectionBadge>대상 항목 구분</SectionBadge>
      <BorderBox>
        <p><strong>공제 되는 것 (30%)</strong></p>
        <p>종이책·전자책·오디오북, 연극·뮤지컬·콘서트 티켓, 박물관·미술관 입장료, 영화 관람료(CGV·롯데·메가박스), 종이신문 구독료, 헬스장·수영장 이용료(2025년 7월~)</p>
      </BorderBox>
      <BorderBox>
        <p><strong>공제 안 되는 것 (일반 15%)</strong></p>
        <p>OTT 구독료(넷플릭스·왓챠·디즈니+), 웹툰 유료결제, 음원 스트리밍(멜론·지니), 영화관 팝콘·음료, 헬스장 PT비(50%만 인정)</p>
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>절세 효과를 높이는 방법</H2>
      <p style={body}>
        문화비 공제를 최대로 활용하려면 몇 가지 포인트가 있어요.
      </p>

      <SectionBadge>절세 전략</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        문화비 항목은 1월 15일부터 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 간소화서비스</a>에서
        자동 조회돼요. 서점·영화관이 국세청에 자료를 제출하니까 영수증을 따로 챙길 필요는 없어요.
        다만 누락된 경우 카드사나 판매처에 자료 제출을 요청하세요.
      </p>

      <Divider />

      <CategoryButton label="연말정산" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준(조세특례제한법)으로 작성했어요. 총급여와 사용액에 따라 실제 공제금액이 달라질 수 있어요." />
    </ArticleLayout>
  );
}
