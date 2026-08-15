"use client";
// Q1. 집이 있는데 기초연금을 받을 수 있는지 걱정되는 상황, 재산 때문에 탈락할까 봐 불안함
// Q2. 기본재산액 공제 기준을 확인하고, 내 부동산이 소득인정액에 얼마나 반영되는지 계산하는 것
// Q3. (1) 지역별 기본재산액 공제액 (2) 재산의 소득환산 공식 (3) 주택 소유 시 계산 예시
// Q4. GreenBox(지역별 공제액) + BorderBox(계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "기본재산액 공제는 매년 바뀌나요?",
    a: "네, 매년 보건복지부 고시로 조정돼요. 부동산 시세 변동, 물가 상승 등을 반영해서 공제액이 달라질 수 있어요.",
  },
  {
    q: "내가 사는 곳이 대도시인지 중소도시인지 어떻게 아나요?",
    a: "특별시, 광역시의 '구'에 해당하면 대도시, 도의 '시'에 해당하면 중소도시, '군'이면 농어촌이에요. 주민센터에서 정확하게 확인할 수 있어요.",
  },
  {
    q: "전세로 살고 있으면 재산 반영이 어떻게 되나요?",
    a: "전세보증금은 재산으로 반영돼요. 하지만 기본재산액 공제가 먼저 적용되니, 보증금이 공제액 이하이면 재산 환산액이 0원이 돼요.",
  },
  {
    q: "주택을 자녀에게 증여하면 기초연금에 유리한가요?",
    a: "증여 후 5년간은 증여 재산이 본인 재산으로 간주돼요. 증여 시점부터 5년이 지나야 재산에서 빠지니 단기적으로는 효과가 없어요.",
  },
  {
    q: "토지만 있고 건물은 없어도 재산에 포함되나요?",
    a: "네, 토지도 일반재산으로 포함돼요. 공시지가 기준으로 반영되고 기본재산액 공제가 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 시행령 제3조(재산의 소득환산)", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 재산 기준", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 모의계산", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-소득인정액-계산-공제항목", title: "소득인정액 계산과 공제항목", description: "소득인정액 전체 계산 방법을 정리했어요." },
  { slug: "기초연금-금융재산-공제기준-계산", title: "금융재산 공제 기준", description: "예금·적금이 있을 때 공제되는 기준이에요." },
  { slug: "기초연금-자동차-재산기준-고급차", title: "자동차 재산 기준", description: "자동차 소유 시 재산 반영 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-기본재산액-공제-지역별기준" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>기본재산액 공제</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        집 있어도 기초연금 받을 수 있을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        기본재산액 공제와 지역별 기준
      </p>

      <p style={body}>
        "집이 있으면 기초연금 못 받는 거 아니야?" 걱정하는 분이 정말 많아요. 결론부터 말하면, 집이 있어도 기초연금을 받을 수 있어요. 재산에서 기본재산액을 먼저 공제하기 때문이에요. 지역에 따라 공제액이 다르고, 서울 같은 대도시는 1억3,500만원까지 공제돼요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>지역별 기본재산액 공제 기준</H2>
      <p style={body}>
        기초연금 재산 산정 시 지역에 따라 기본재산액을 먼저 빼요. 이 금액이 꽤 크기 때문에 실거주 주택은 상당 부분 공제되는 경우가 많아요.
      </p>

      <GreenBox>
        <strong>2026년 기본재산액 공제 (지역별)</strong><br /><br />
        대도시 (특별시·광역시 구): 1억3,500만원<br />
        중소도시 (도의 시): 8,500만원<br />
        농어촌 (도의 군): 7,250만원<br /><br />
        이 금액을 재산에서 먼저 빼고 남은 금액만 소득으로 환산해요
      </GreenBox>

      <p style={body}>
        대도시에 사는 분이 가장 유리해요. 1.35억 원까지 공제되니까, 재산이 이 금액 이하이면 재산 환산액이 0원이 돼요.
      </p>

      <H2>재산의 소득환산 계산 방법</H2>
      <p style={body}>
        기본재산액을 공제한 후 남은 재산은 소득으로 환산돼요. <Link href="https://www.law.go.kr/법령/기초연금법시행령" style={{ color: "#1D9E75" }}>기초연금법 시행령 제3조</Link>에 따른 공식이에요.
      </p>

      <BorderBox>
        <strong>재산의 소득환산 공식</strong><br /><br />
        월 소득환산액 = (재산 - 기본재산액 - 부채) x 4% / 12개월<br /><br />
        <strong>계산 예시 1: 서울(대도시), 시가 2억 원 주택, 부채 3,000만원</strong><br />
        (2억 - 1.35억 - 3,000만) x 4% / 12 = 약 5만원/월<br /><br />
        <strong>계산 예시 2: 경기도 시(중소도시), 시가 1.5억 원 주택, 부채 없음</strong><br />
        (1.5억 - 8,500만) x 4% / 12 = 약 21만7천원/월<br /><br />
        <strong>계산 예시 3: 농어촌 군, 시가 8,000만원 주택, 부채 없음</strong><br />
        (8,000만 - 7,250만) x 4% / 12 = 약 2,500원/월
      </BorderBox>

      <p style={body}>
        서울에 2억 원짜리 집이 있어도 부채가 있으면 월 5만원 정도만 소득인정액에 반영돼요. 생각보다 적죠. 농어촌이면 거의 반영되지 않는 수준이에요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>주의할 점: 증여와 처분</H2>
      <p style={body}>
        기초연금을 받기 위해 재산을 자녀에게 증여하거나 처분하는 경우가 있는데, 조심해야 해요.
      </p>
      <p style={body}>
        증여한 재산은 증여일로부터 5년간 본인 재산으로 간주돼요. 그러니 기초연금 신청 직전에 증여해도 5년은 기다려야 효과가 나타나요. 재산을 처분해서 현금으로 바꾸면 금융재산으로 잡히니 결과가 비슷할 수 있어요.
      </p>
      <p style={body}>
        실거주 주택을 <Link href="/w/기초연금-주택연금-동시수령-우대형혜택" style={{ color: "#1D9E75" }}>주택연금</Link>으로 전환하면 재산 산정에서 제외되는 효과가 있어요. 주택연금 가입 후 기초연금을 함께 받는 분도 많아요.
      </p>

      <H2>대도시·중소도시·농어촌 구분법</H2>
      <p style={body}>
        내가 사는 곳이 어디에 해당하는지 헷갈릴 수 있어요. 구분 기준은 행정구역이에요.
      </p>
      <p style={body}>
        서울특별시, 부산·대구·인천·광주·대전·울산광역시의 자치구에 거주하면 대도시예요. 세종특별자치시도 대도시에 포함돼요. 경기도, 충청도, 경상도, 전라도, 강원도의 "시" 지역은 중소도시, "군" 지역은 농어촌이에요.
      </p>
      <p style={body}>
        정확한 구분은 주민센터에서 확인할 수 있고, <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75" }}>소득인정액 계산</Link> 시 자동으로 적용돼요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법 시행령과 보건복지부 고시를 바탕으로 작성됐어요. 기본재산액 공제는 매년 조정될 수 있으니 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
