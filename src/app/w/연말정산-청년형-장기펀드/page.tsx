"use client";

// Q1: 청년형 장기펀드에 가입했거나 가입하려는 직장인이 소득공제 혜택을 알고 싶은 상황
// Q2: 공제 한도와 조건을 확인하고 연말정산에서 소득공제 적용
// Q3: 납입액 40% 소득공제, 연 600만원 한도, 만 19~34세, 총급여 5,000만원 이하, 3년 이상 유지, 중도해지 시 추징
// Q4: GreenBox(공제 핵심) + BorderBox(세금 절감 예시) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "만 19~34세 확인 (병역 기간 최대 6년 차감)",
  "총급여 5,000만원 이하 (종합소득 3,800만원 이하)",
  "펀드 가입 후 3년 이상 유지 필수",
  "연간 납입한도 600만원 (초과 납입은 공제 불가)",
  "연말정산 시 소득공제 항목에 자동 반영",
  "중도해지 시 기존 공제세액 추징 주의",
];

const FAQS = [
  { q: "공제율이 얼마예요?", a: "납입액의 40%를 소득공제해요. 연 600만원을 넣으면 240만원이 소득에서 빠져요. 세율 15%구간이면 약 36만원 세금이 줄어요." },
  { q: "나이 제한이 어떻게 되나요?", a: "만 19~34세예요. 군 복무 기간은 최대 6년까지 나이에서 빼줘요. 군대 2년 다녀왔으면 만 36세까지 가입 가능해요." },
  { q: "중도해지하면 어떻게 되나요?", a: "3년 미만 해지 시 받았던 소득공제 세액을 추징당해요. 3년 이상 유지한 뒤 해지하면 추징이 없어요." },
  { q: "청년도약계좌랑 중복으로 혜택받을 수 있나요?", a: "네, 가능해요. 청년형 장기펀드는 소득공제, 청년도약계좌는 정부기여금이라 성격이 달라서 중복 혜택이 돼요." },
  { q: "어디서 가입하나요?", a: "증권사에서 가입해요. 펀드 이름에 '청년형 장기집합투자증권'이 포함된 상품을 찾으면 돼요." },
  { q: "총급여 5,000만원을 넘으면 공제를 못 받나요?", a: "가입 당시 조건이 맞으면 유지 중에 소득이 올라도 공제를 받을 수 있어요. 다만 가입 시점의 소득 기준을 초과하면 신규 가입이 안 돼요." },
];

const REFERENCES = [
  { category: "법령·안내", items: [
    { label: "조세특례제한법 제91조의20", url: "https://www.law.go.kr/법령/조세특례제한법" },
    { label: "국세청 청년 세제지원 안내", url: "https://www.nts.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-표준공제", title: "연말정산 표준공제", description: "공제 항목을 놓쳤을 때 적용되는 표준공제예요." },
  { slug: "소득공제장기펀드-세액공제", title: "소득공제장기펀드 세액공제", description: "장기펀드 소득공제의 상세 조건이에요." },
  { slug: "연말정산-특별세액공제-한도", title: "특별세액공제 한도", description: "연말정산 세액공제 항목별 한도 정리예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년형 장기펀드 소득공제, 얼마나 돌려받나?<br />
        공제 한도와 가입 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년형 장기펀드에 가입하면 납입액의 40%를 소득공제 받을 수 있어요.
        연 600만원 한도니까 최대 240만원이 소득에서 빠져요.
        만 19~34세, 총급여 5,000만원 이하라면 가입할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공제 구조를 숫자로 보면</H2>
      <p style={body}>
        소득공제는 소득에서 빼주는 거라 실제 절세 금액은 세율에 따라 달라져요.
      </p>

      <GreenBox title="공제 핵심">
        납입액의 40% 소득공제 / 연 600만원 한도 / 최대 240만원 공제<br />
        3년 이상 유지 필수 / 중도해지 시 추징
      </GreenBox>

      <BorderBox>
        <strong>세금 절감 예시</strong><br /><br />
        총급여 4,000만원, 연간 600만원 납입 시<br />
        소득공제: 240만원<br />
        세율 15% 적용 → 약 36만원 세금 절감<br />
        세율 24% 적용 → 약 57만원 세금 절감<br /><br />
        3년간 유지하면 최소 108만원~171만원 절세돼요
      </BorderBox>

      <CategoryButton label="세금·연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>가입 전 꼭 체크할 것</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        3년 유지가 핵심이에요. 중도해지하면 공제받은 세액을 다시 내야 하니까 유지 가능한지 먼저 확인하세요.
      </p>

      <SectionBadge>청년형 장기펀드 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 가입 조건과 공제 한도는 세법 개정에 따라 변경될 수 있으니 국세청에서 최신 정보를 확인해보세요." />
    </ArticleLayout>
  );
}
