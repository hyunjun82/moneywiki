"use client";

// Q1. 부모님 사망 후 종신보험금 받았는데 상속세 신고해야 하는지, 기한이 언제까지인지 궁금
// Q2. 신고 기한(6개월) 확인 → 과세 대상 여부 판단 → 서류 준비 후 신고
// Q3. 사망일 속한 달 말일부터 6개월, 보험계약 구조별 과세 여부, 필요 서류, 과세표준 공제
// Q4. GreenBox(신고 기한 핵심) + Steps(신고 절차) + DocTable(필요 서류) + FAQ

import {
  H2, GreenBox, Divider, body,
  FAQ, References, Disclaimer, Steps, DocTable,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "사망 사실 확인·신고", desc: "사망일이 속한 달 말일부터 6개월 이내가 신고 기한이에요. 예: 3월 15일 사망 → 9월 30일까지.", tip: "기한 넘기면 무신고 가산세 20%" },
  { title: "보험계약 구조 확인", desc: "계약자=피보험자=사망자이면 상속재산. 계약자가 수익자(자녀)이면 상속세가 아니라 소득세일 수 있어요." },
  { title: "서류 준비", desc: "사망진단서, 보험증권, 보험금 지급 내역서, 상속인 목록, 기타 재산 목록을 준비해요." },
  { title: "상속세 신고서 제출", desc: "피상속인(사망자) 주소지 관할 세무서에 신고서를 제출해요. 홈택스 전자신고도 가능해요." },
];

const DOCS = [
  { name: "상속세 과세표준 신고서", required: true, where: "홈택스 또는 관할 세무서" },
  { name: "사망진단서(사체검안서)", required: true, where: "병원 또는 주민센터" },
  { name: "보험증권 사본", required: true, where: "보험사 고객센터" },
  { name: "보험금 지급 내역서", required: true, where: "보험사에 요청" },
  { name: "가족관계증명서", required: true, where: "주민센터·정부24" },
  { name: "재산 목록(부동산·예금 등)", required: true, where: "등기부·금융조회" },
  { name: "채무 증빙(대출 등)", required: false, where: "금융기관" },
];

const FAQS = [
  { q: "보험금이 5억인데 상속세를 내야 하나요?", a: "다른 상속재산 합산 후 기초공제(5억) + 배우자공제(5~30억)를 빼고 남는 금액에 세금이 붙어요. 보험금만으로는 판단 어려워요." },
  { q: "계약자가 자녀이고 보험료도 자녀가 냈으면요?", a: "이 경우 보험금은 상속재산이 아니라 자녀의 소득이에요. 상속세가 아니라 소득세(일시금 수령 시)로 과세될 수 있어요." },
  { q: "신고 기한을 넘기면 어떤 불이익이 있나요?", a: "무신고 가산세 20%가 붙고, 납부 지연 시 납부불성실 가산세(연 약 8.03%)도 추가돼요." },
  { q: "상속세 신고는 세무사에게 맡겨야 하나요?", a: "재산이 복잡하면 세무사 도움이 필요해요. 단순한 보험금만 있으면 홈택스에서 직접 신고할 수도 있어요." },
  { q: "보험금을 아직 못 받았어도 신고해야 하나요?", a: "네, 수령 여부와 관계없이 사망일 기준으로 신고 기한이 시작돼요. 보험금 청구가 지연되더라도 기한 내 신고하세요." },
];

const REFERENCES = [
  { category: "법령", items: [{ label: "상속세 및 증여세법", url: "https://www.law.go.kr/법령/상속세및증여세법" }] },
  { category: "기관", items: [{ label: "국세청 상속세 안내", url: "https://www.nts.go.kr" }] },
];

const RELATED = [
  { slug: "종신보험-상속재산-포함", title: "종신보험 상속재산 포함 기준", description: "보험금이 상속재산에 포함되는 경우예요." },
  { slug: "종신보험-상속세-절세-방법", title: "종신보험 상속세 절세 방법", description: "보험 활용 절세 전략이에요." },
  { slug: "법인세-신고-기한", title: "법인세 신고 기한", description: "법인세 신고 기한과 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 상속</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종신보험금 받았는데 상속세 신고해야 할까?<br />
        신고 기한과 필요 서류
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부모님이 돌아가시고 종신보험금을 받았는데 상속세를 내야 하는지, 언제까지 신고해야 하는지 막막하죠.
        사망일이 속한 달 말일부터 6개월 이내에 신고해야 해요. 보험 계약 구조에 따라 과세 방법이 달라져요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>6개월 안에 신고해야 해요</H2>
      <p style={body}>상속세 신고 기한은 사망일이 속한 달 말일부터 6개월이에요. 넘기면 가산세가 붙어요.</p>
      <GreenBox>
        <strong>신고 기한 계산 예시</strong><br /><br />
        사망일: 2026년 3월 15일<br />
        기한 시작: 2026년 3월 31일<br />
        신고 마감: 2026년 9월 30일<br /><br />
        ★ 기한 내 신고하면 신고세액공제 3%를 받을 수 있어요
      </GreenBox>

      <H2>신고 절차 4단계</H2>
      <p style={body}>보험 계약 구조부터 확인하고, 서류를 갖춰서 관할 세무서에 신고해요.</p>
      <Steps steps={STEPS} />

      <H2>이 서류가 필요해요</H2>
      <p style={body}>보험사에서 받는 서류와 행정기관 서류를 함께 준비하세요.</p>
      <DocTable docs={DOCS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 상속세 및 증여세법 기준으로 작성됐어요. 개별 사안은 세무사에게 상담받으세요." />
    </ArticleLayout>
  );
}
