"use client";

// Q1: 부모님께 상속받은 주택을 팔려는데 거주요건 때문에 비과세를 받을 수 있는지 모르는 상황
// Q2: 동일세대/별도세대 여부 판단 후 거주요건 충족해서 비과세 양도
// Q3: 동일세대 기간 합산 vs 별도세대 별도 충족, 조정대상지역 2년 거주, 취득시기=상속개시일
// Q4: BorderBox(비교표) + Steps(비과세 절차) + GreenBox(핵심 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "거주·보유 기간", optionA: "피상속인 기간 합산 가능", optionB: "상속인이 별도로 충족" },
  { label: "조정지역 거주요건", optionA: "합산해서 2년 이상이면 충족", optionB: "상속 후 직접 2년 이상 거주" },
  { label: "취득시기", optionA: "피상속인 취득일", optionB: "상속개시일(사망일)" },
  { label: "비과세 난이도", optionA: "상대적으로 쉬움", optionB: "거주 안 하면 불가능" },
  { label: "증명 방법", optionA: "주민등록등본으로 동일세대 입증", optionB: "상속 후 전입신고·거주 증명" },
];

const STEPS_SEPARATE = [
  {
    title: "상속개시일 확인 (취득시기)",
    desc: "피상속인 사망일이 상속주택의 취득시기예요. 이 날짜부터 보유기간과 거주기간을 계산해요.",
  },
  {
    title: "조정대상지역 여부 확인",
    desc: "상속개시일 기준으로 주택이 조정대상지역에 있었는지 확인해요. 조정지역이면 2년 거주가 필수예요.",
  },
  {
    title: "상속주택에 전입신고 후 2년 거주",
    desc: "별도세대 상속이면 상속인이 직접 들어가서 살아야 해요. 전입신고 후 실제 거주 2년이 핵심이에요.",
  },
  {
    title: "2년 보유 + 2년 거주 후 양도",
    desc: "보유기간과 거주기간 모두 충족한 뒤에 양도하고 비과세 신고해요. 홈택스에서 양도소득세 신고하면 돼요.",
    link: { label: "홈택스 양도소득세 신고", href: "https://www.hometax.go.kr" },
  },
];

const CHECKLIST = [
  "상속 당시 동일세대였는지 별도세대였는지 확인 (주민등록 기준)",
  "상속개시일 기준 조정대상지역 여부 확인",
  "별도세대면 상속 후 직접 2년 이상 거주 계획 수립",
  "동일세대면 피상속인 + 상속인 거주기간 합산 확인",
  "상속주택 외 다른 주택 보유 여부 확인 (1세대1주택 판단)",
];

const FAQS = [
  {
    q: "부모님과 따로 살다가 상속받으면 거주 안 하고 팔 수 있나요?",
    a: "조정대상지역이면 안 돼요. 별도세대 상속은 상속인이 직접 2년 이상 거주해야 비과세예요. 비조정지역이면 2년 보유만으로 가능해요.",
  },
  {
    q: "부모님 보유기간이 20년인데 합산 안 되나요?",
    a: "별도세대였다면 합산 안 돼요. 동일세대(같이 살았던 경우)만 피상속인의 보유·거주 기간을 합산할 수 있어요.",
  },
  {
    q: "동일세대였다는 걸 어떻게 증명하나요?",
    a: "상속개시일 기준 주민등록등본에 같은 주소로 등재되어 있으면 돼요. 세대분리가 안 되어 있었다면 동일세대로 인정돼요.",
  },
  {
    q: "상속주택 말고 내 집이 따로 있으면 비과세 안 되나요?",
    a: "상속주택은 1세대1주택 판단 시 특례가 적용돼요. 기존 주택을 먼저 팔면 상속주택에 대해 비과세를 받을 수 있는 경우가 많아요.",
  },
  {
    q: "상속 후 6개월 이내에 팔면 세금이 없다는 게 사실인가요?",
    a: "상속개시일부터 6개월 이내에 양도하면 양도가액과 취득가액이 같아져서 양도차익이 0이 돼요. 사실상 양도세가 안 나오는 거예요.",
  },
  {
    q: "조정대상지역은 자주 바뀌나요?",
    a: "네, 정부 정책에 따라 수시로 지정·해제돼요. 상속개시일 기준으로 판단하니까 그 시점의 지정 여부가 중요해요. 국토교통부 공고를 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령·해석",
    items: [
      { label: "소득세법 (양도소득세)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 시행령", url: "https://www.law.go.kr/법령/소득세법시행령" },
    ],
  },
  {
    category: "공식 서비스",
    items: [
      { label: "국세청 (양도소득세 안내)", url: "https://www.nts.go.kr" },
      { label: "홈택스 (양도소득세 신고)", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "양도소득세", title: "양도소득세 계산과 신고", description: "양도세 기본 세율과 비과세 조건이에요." },
  { slug: "1세대1주택-비과세", title: "1세대1주택 비과세 조건", description: "2년 보유·거주 요건을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 양도소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상속주택 양도세, 거주요건이 핵심이에요<br />
        동일세대·별도세대 비과세 조건 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부모님께 상속받은 집을 팔려는데 세금이 걱정되시죠? 상속주택은 부모님과 같이 살았느냐, 따로 살았느냐에 따라
        비과세 조건이 완전히 달라요. 별도세대였다면 부모님이 20년 보유했어도 상속인이 직접 거주하지 않으면 비과세를 못 받아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>동일세대 vs 별도세대, 뭐가 달라요?</H2>
      <p style={body}>
        상속 당시 주민등록이 같은 주소에 있었으면 동일세대, 따로 되어 있었으면 별도세대예요.
        이 구분 하나가 수천만원의 세금 차이를 만들어요.
      </p>

      <SectionBadge>동일세대 vs 별도세대 비교</SectionBadge>
      <CompareTable titleA="동일세대 상속" titleB="별도세대 상속" rows={COMPARE_ROWS} />

      <p style={body}>
        동일세대면 부모님이 20년 보유·거주한 기간을 합산할 수 있어서 상속 직후에도 비과세가 가능해요.
        별도세대면 상속개시일부터 새로 시작이에요. 이 차이를 모르면 세금 폭탄을 맞을 수 있어요.
      </p>

      <CategoryButton label="세금·양도소득세 정보" count={5} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>별도세대 상속, 비과세 받으려면?</H2>
      <p style={body}>
        별도세대에서 상속받았다면 상속인이 처음부터 다시 거주요건을 충족해야 해요.
        조정대상지역이면 2년 보유 + 2년 거주, 비조정지역이면 2년 보유만 하면 돼요.
      </p>

      <Steps steps={STEPS_SEPARATE} />

      <GreenBox>
        <strong>6개월 이내 양도 = 양도세 0원</strong><br />
        상속개시일부터 6개월 이내에 양도하면 양도가액이 취득가액과 같아져요.
        양도차익이 0이라 양도세가 발생하지 않아요. 빨리 처분할 계획이면 이 방법도 검토해보세요.
      </GreenBox>

      <Divider />

      <H2>실수하기 쉬운 포인트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        상속주택 양도세에서 가장 많이 틀리는 부분이에요. 하나라도 놓치면 비과세를 못 받아요.
      </p>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        <strong>가장 흔한 실수</strong><br />
        &ldquo;부모님이 오래 보유하셨으니 비과세 되겠지&rdquo; → 별도세대면 합산 불가<br />
        &ldquo;조정지역인 줄 몰랐어요&rdquo; → 상속개시일 기준으로 확인 필수<br />
        &ldquo;거주 안 하고 팔았어요&rdquo; → 별도세대 + 조정지역이면 100% 과세
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 기획재정부 유권해석을 바탕으로 작성됐어요. 개별 상황에 따라 과세 여부가 달라질 수 있으니 세무사 상담을 권장해요." />
    </ArticleLayout>
  );
}
