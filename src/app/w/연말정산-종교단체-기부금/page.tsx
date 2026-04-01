"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 매달 교회/절/성당에 헌금·보시금을 내는데, 연말정산에서 공제받을 수 있는지 궁금한 직장인
// Q2. 종교단체 기부금 공제율·한도를 파악하고 기부금영수증을 발급받아 연말정산에 반영한다
// Q3. 공제율 15%(1천만원 초과 30%), 한도 소득 10%, 기부금영수증 필수, 이월공제 10년
// Q4. GreenBox(공제율·한도 요약) + BorderBox(계산 예시) + Steps(영수증 발급 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "소속 종교단체에 기부금영수증을 요청하세요",
    desc: "교회, 성당, 절 등 소속 종교단체의 사무실에 기부금영수증 발급을 요청하면 돼요. 보통 연말에 일괄 발급하는 곳이 많아요. 12월 중순~1월 초에 한꺼번에 발급하니까 미리 확인하세요.",
    tip: "발급 시 주민등록번호와 납부 금액이 정확한지 꼭 확인",
  },
  {
    title: "간소화서비스에서 조회되는지 확인하세요",
    desc: "종교단체가 국세청에 기부금 자료를 제출하면 홈택스 간소화서비스에서 자동으로 조회돼요. 제출하지 않은 단체도 있으니 1월 15일 이후 간소화서비스에서 먼저 확인하세요.",
    tip: "조회 안 되면 영수증을 직접 챙겨야 해요",
    link: { label: "홈택스 간소화서비스", href: "https://www.hometax.go.kr" },
  },
  {
    title: "회사에 기부금영수증을 제출하세요",
    desc: "간소화서비스에 안 나오면 종교단체에서 직접 발급받은 영수증을 PDF나 사진으로 회사에 제출하면 돼요. 홈택스에서 직접 등록할 수도 있어요. 영수증에는 단체명, 고유번호, 기부 금액, 기부 일자가 있어야 해요.",
    tip: "종교단체 고유번호가 빠져 있으면 공제 불가",
  },
];

const FAQS = [
  {
    q: "십일조도 연말정산에서 공제받을 수 있나요?",
    a: "네. 십일조, 헌금, 봉헌금, 보시금 모두 종교단체 기부금으로 공제돼요. 기부금영수증만 있으면 돼요. 건축헌금이나 특별헌금도 마찬가지예요.",
  },
  {
    q: "공제 한도를 넘기면 그냥 날리는 건가요?",
    a: "아니에요. 한도 초과분은 10년간 이월공제가 가능해요. 올해 한도를 넘겼으면 내년 연말정산에서 공제받을 수 있어요.",
  },
  {
    q: "배우자가 낸 헌금도 내가 공제받을 수 있나요?",
    a: "배우자가 기본공제 대상(소득 100만원 이하)이면 배우자 명의 기부금도 내가 공제받을 수 있어요. 맞벌이라면 각자 공제받아야 해요.",
  },
  {
    q: "기부금영수증이 없으면 공제 못 받나요?",
    a: "맞아요. 기부금영수증이 없으면 공제가 안 돼요. 현금으로 헌금했더라도 종교단체에서 영수증을 발급받아야 해요. 구두 확인만으로는 인정이 안 돼요.",
  },
  {
    q: "종교단체 기부금과 일반 기부금은 다른 건가요?",
    a: "종교단체 기부금은 지정기부금 중 별도 한도가 있어요. 일반 지정기부금은 소득의 30% 한도지만, 종교단체 기부금은 10%예요. 비종교 기부금이 따로 있다면 합산 30% 한도까지 가능해요.",
  },
  {
    q: "교회에서 기부금영수증 발급을 안 해주면요?",
    a: "종교단체는 기부금영수증 발급 의무가 있어요. 발급을 거부하면 국세청에 신고할 수 있어요. 다만 실무적으로는 사무실에 정중히 요청하면 대부분 발급해줘요.",
  },
];

const SOURCES = [
  { name: "국세청 기부금 세액공제", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=239040" },
  { name: "소득세법 제34조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-기부금-세액공제", title: "기부금 세액공제 종류와 한도", description: "정치자금·법정·지정 기부금별 공제율 차이." },
  { slug: "연말정산", title: "연말정산 가이드", description: "소득공제와 세액공제 전체 구조 이해하기." },
  { slug: "연말정산-정치자금-기부금", title: "정치자금 기부금 공제 방법", description: "10만원까지 전액 환급되는 정치후원금." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 기부금 · 종교단체</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        십일조·헌금, 연말정산에서 돌려받을 수 있나요?<br />
        종교단체 기부금 공제율과 영수증 발급법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 교회에 헌금을 내는데, 이걸 연말정산에서 공제받을 수 있냐고요?
      </p>
      <p style={body}>
        종교단체 기부금은 <strong>15% 세액공제</strong>(1천만원 초과분 30%) 대상이에요.
        연 500만원 헌금을 냈다면 한도 내에서 최대 <strong>60만원</strong>을 돌려받을 수 있어요.
        십일조, 봉헌금, 보시금 전부 해당돼요. 핵심은 <strong>기부금영수증</strong>을 챙기는 거예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공제율과 한도가 얼마예요?</H2>
      <p style={body}>
        종교단체 기부금은 <strong>지정기부금</strong>으로 분류돼요. 다른 지정기부금과 공제율은 같지만 한도가 달라요.
        일반 지정기부금은 소득의 30% 한도인데, 종교단체는 <strong>10%</strong>예요.
      </p>

      <SectionBadge>종교단체 기부금 공제 구조</SectionBadge>
      <GreenBox>
        · 공제율: 1,000만원까지 15%, 1,000만원 초과분 30%{"\n"}
        · 한도: 근로소득금액의 10%{"\n"}
        · 이월공제: 한도 초과분 10년간 이월 가능{"\n"}
        · 대상: 십일조, 헌금, 봉헌금, 보시금, 건축헌금 등
      </GreenBox>

      <SectionBadge>계산 예시</SectionBadge>
      <BorderBox>
        <strong>근로소득금액 4,000만원, 헌금 500만원</strong>{"\n"}
        · 한도: 4,000만 × 10% = 400만원{"\n"}
        · 공제 대상: 400만원 (한도 적용){"\n"}
        · 환급: 400만 × 15% = <strong>60만원</strong>{"\n"}
        · 나머지 100만원은 내년으로 이월{"\n\n"}
        <strong>근로소득금액 5,000만원, 헌금 300만원</strong>{"\n"}
        · 한도: 5,000만 × 10% = 500만원{"\n"}
        · 공제 대상: 300만원 (전액){"\n"}
        · 환급: 300만 × 15% = <strong>45만원</strong>
      </BorderBox>

      <p style={body}>
        근로소득금액은 총급여에서 근로소득공제를 뺀 금액이에요. 총급여와 다르니까 원천징수영수증에서 확인하는 게 정확해요.
        그런데 영수증을 어떻게 발급받느냐가 실제로 가장 중요하죠.
      </p>

      <CategoryButton label="연말정산 가이드" count={30} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>기부금영수증, 이렇게 발급받으세요</H2>
      <p style={body}>
        영수증 없으면 공제가 아예 안 돼요. 현금으로 헌금했더라도 영수증을 반드시 발급받아야 해요.
        대부분의 종교단체는 연말에 일괄 발급하지만, 미리 요청하는 게 안전해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>비종교 기부금이 따로 있다면 합산 30% 한도예요</H2>
      <p style={body}>
        종교단체 기부금 한도는 소득의 10%지만, 비종교 지정기부금(사회복지단체, 대학교 등)까지 합치면 <strong>30%</strong>까지 올라가요.
        두 가지를 모두 내고 있다면 합산 한도를 활용할 수 있어요.
      </p>

      <BorderBox>
        <strong>합산 한도 예시 (근로소득금액 5,000만원)</strong>{"\n"}
        · 종교단체 기부금: 500만원 (한도 10% = 500만원 OK){"\n"}
        · 사회복지단체 기부금: 200만원{"\n"}
        · 합산 한도: 30% = 1,500만원{"\n"}
        · 총 공제 대상: 700만원{"\n"}
        · 환급: 700만 × 15% = <strong>105만원</strong>
      </BorderBox>

      <p style={body}>
        <a href="/w/연말정산-기부금-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>기부금 세액공제</a> 전체 구조가 궁금하다면 별도 글에서 정리했어요.
        <a href="/w/연말정산-정치자금-기부금" style={{ color: "#1D9E75", textDecoration: "underline" }}>정치자금 기부금</a>은 10만원까지 전액 환급되는 별도 항목이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        종교단체 기부금에서 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 기부금 공제율과 한도는 세법 개정에 따라 달라질 수 있으니 최신 기준은 국세청에서 확인해 주세요." />
    </ArticleLayout>
  );
}
