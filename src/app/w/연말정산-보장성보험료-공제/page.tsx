"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 연말정산 시즌인데, 보험료를 많이 내고 있어서 공제가 되는지, 어떤 보험이 해당되는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 내 보험이 공제 대상인지 확인하고, 연말정산 간소화에서 빠진 보험료를 직접 준비하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 공제율 12%, 한도 100만원(최대 12만원 환급), 보장성 vs 저축성 구분, 장애인보험 추가 공제.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 기준) + BorderBox(계산 예시) + Checklist(공제 대상 보험) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd, Checklist,
  ArticleLayout,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "생명보험 (종신보험, 정기보험 등)",
  "실손의료보험 (실비보험)",
  "자동차보험 (책임보험, 종합보험, 운전자보험)",
  "화재보험",
  "상해보험",
  "암보험, 건강보험 (사보험)",
  "장애인 전용 보장성보험 (별도 15만원 한도)",
];

const FAQS = [
  {
    q: "저축보험도 공제되나요?",
    a: "안 돼요. 연금보험, 저축보험, 변액보험처럼 만기에 환급금이 나오는 저축성 보험은 공제 대상이 아니에요. 오직 보장성 보험만 돼요.",
  },
  {
    q: "자동차보험도 진짜 공제되나요?",
    a: "네, 돼요. 책임보험(의무), 종합보험, 운전자보험 모두 보장성보험이라 공제 대상이에요.",
  },
  {
    q: "맞벌이인데 배우자 보험료도 공제받을 수 있나요?",
    a: "배우자가 연 소득 100만원 이하(총급여 500만원 이하)여야 가능해요. 맞벌이라면 각자 본인 보험료만 공제받아요.",
  },
  {
    q: "장애인 전용 보험은 공제가 더 많나요?",
    a: "네. 일반 보장성보험 12만원 + 장애인 전용 보험 15만원 = 최대 27만원까지 돌려받을 수 있어요.",
  },
  {
    q: "간소화 서비스에 보험료가 안 나오면요?",
    a: "보험회사에 전화해서 보험료납입증명서를 발급받아 회사에 제출하면 돼요. 보통 보험사 앱에서도 발급 가능해요.",
  },
  {
    q: "보험료를 200만원 냈으면 공제는 얼마나 되나요?",
    a: "한도가 100만원이라 100만원의 12%인 12만원이 세금에서 빠져요. 200만원을 내든 300만원을 내든 최대 12만원이에요.",
  },
];

const REFERENCES = [
  {
    category: "국세청 자료",
    items: [
      { label: "국세청 연말정산 보험료 공제 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6592&cntntsId=7871" },
      { label: "소득세법 제59조의4", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "홈택스 연말정산 간소화", url: "https://www.hometax.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보장성보험료, 연말정산에서 얼마 돌려받나요?<br />
        공제 대상 보험과 한도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보험료를 꽤 내고 있는데 연말정산에서 얼마나 돌려받을 수 있는지 궁금하죠.
        보장성보험은 연 100만원 한도로 12% 세액공제를 받아요.
        최대 12만원인데, 어떤 보험이 되고 안 되는지가 중요해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>보장성보험료 세액공제, 핵심 기준</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에 따라
        보장성보험의 보험료는 세액공제 대상이에요.
        연간 납입한 보험료 중 100만원 한도 내에서 12%를 돌려받아요.
      </p>

      <GreenBox>
        <strong>일반 보장성보험</strong>: 연 100만원 한도 x 12% = 최대 <strong>12만원</strong><br />
        <strong>장애인 전용 보험</strong>: 연 100만원 한도 x 15% = 최대 <strong>15만원</strong><br />
        둘 다 해당하면 합산 최대 <strong>27만원</strong>까지 돌려받아요.
      </GreenBox>

      <Divider />

      <H2>어떤 보험이 공제되나요?</H2>
      <p style={body}>
        핵심은 '보장성'이에요. 사고·질병·사망 등을 보장하는 보험이면 돼요.
        만기에 돈을 돌려받는 저축성 보험은 공제 대상이 아니에요.
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6592&cntntsId=7871" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 안내</a>에서 구체적 기준을 확인할 수 있어요.
      </p>

      <SectionBadge>공제 대상 보험 목록</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <BorderBox title="공제 안 되는 보험 (저축성)">
        · 연금보험, 연금저축보험 (별도 공제 체계)<br />
        · 저축보험 (만기 환급형)<br />
        · 변액보험 (투자형)<br />
        · 보장 기능 없이 만기 환급만 있는 보험
      </BorderBox>

      <Divider />

      <H2>얼마를 돌려받는지 계산해볼까요?</H2>
      <p style={body}>
        계산은 단순해요. 1년간 낸 보장성보험료 합계에서 100만원 한도를 적용하고, 12%를 곱하면 돼요.
      </p>

      <BorderBox title="공제 계산 예시">
        연간 보험료 80만원 → 80만원 x 12% = <strong>96,000원</strong> 환급<br />
        연간 보험료 120만원 → 100만원(한도) x 12% = <strong>120,000원</strong> 환급<br />
        장애인 전용 보험 50만원 추가 → 50만원 x 15% = <strong>75,000원</strong> 추가 환급
      </BorderBox>

      <p style={body}>
        <a href="/w/연말정산-의료비-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>의료비 세액공제</a>와는 별도예요.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 간소화 서비스</a>에서 보험료 내역을 자동으로 불러올 수 있어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 세부 사항은 국세상담센터(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
