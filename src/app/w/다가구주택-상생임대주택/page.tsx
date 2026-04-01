"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 다가구주택 팔려는데 상생임대 특례로 양도세 비과세 받을 수 있는지 확인하는 상황
// Q2. 호별 요건 충족 여부 확인 → 전체 양도 vs 호별 양도 판단
// Q3. 상생임대주택 요건(직전1년6개월+상생2년), 다가구 전체양도 시 모든 호 충족 필요, 호별 양도 대안
// Q4. GreenBox(핵심 요건) + EligibilityChecker(요건 체크) + BorderBox(전체 vs 호별 비교) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, EligibilityChecker,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "각 호마다 직전 임대차계약이 1년 6개월 이상이었다" },
  { id: "c2", label: "직전 계약 종료 후 바로 상생계약을 체결했다" },
  { id: "c3", label: "상생계약은 임대료 5% 이내 인상으로 2년 이상 유지했다" },
  { id: "c4", label: "모든 호가 위 3가지 조건을 충족한다" },
  { id: "c5", label: "1세대 1주택자이거나 조정대상지역 2년 거주를 충족한다" },
];

const FAQS = [
  { q: "다가구주택 3층 중 1층만 공실이면 특례 안 되나요?", a: "전체 양도 시에는 특례 적용이 안 돼요. 공실인 호는 임대차계약 자체가 없으니 요건 미충족이에요. 호별 양도로 전환하면 나머지 층만 특례를 받을 수 있어요." },
  { q: "호별 양도가 뭔가요?", a: "다가구주택을 한 번에 파는 게 아니라 층별·호별로 나눠서 파는 방식이에요. 구분등기가 필요할 수 있고, 세무사와 상의해야 해요." },
  { q: "상생계약 기간 중간에 세입자가 나가면요?", a: "2년 이상 유지 요건이 미충족돼요. 새 세입자와 다시 상생계약을 맺어도 기간은 새로 시작하니 주의해야 해요." },
  { q: "임대료 5% 인상 제한은 월세도 포함인가요?", a: "네, 보증금과 월세 전환액 합산 기준으로 5% 이내여야 해요. 보증금만 올리고 월세는 그대로인 경우에도 합산해서 판단해요." },
  { q: "상생임대주택 특례 신청은 어디서 하나요?", a: "양도소득세 신고 시 관할 세무서에 특례 적용을 신청해요. 임대차계약서, 확정일자 등 증빙서류를 함께 제출해야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "소득세법 시행령 (상생임대주택 특례)", url: "https://www.law.go.kr/법령/소득세법시행령" },
    { label: "국세청 상생임대 안내", url: "https://www.nts.go.kr" },
  ]},
];

const RELATED = [
  { slug: "1세대-1주택-양도소득세-비과세-요건", title: "1세대 1주택 비과세 요건", description: "양도소득세 비과세 기본 조건이에요." },
  { slug: "보증금-증액-한도-5퍼센트-제한", title: "보증금 증액 5% 제한", description: "계약갱신 시 임대료 인상 한도예요." },
  { slug: "다주택자-세금", title: "다주택자 세금 정리", description: "다주택자 양도세·종부세 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        다가구주택 상생임대 특례, 받을 수 있을까?<br />
        모든 호 요건 충족 조건과 호별 양도 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        다가구주택을 팔면서 상생임대 특례로 양도세를 줄이고 싶은데, 모든 호가 조건을 충족해야 한다니 복잡하죠.
        한 호라도 미충족이면 전체 양도 시 특례가 안 돼요. 호별 양도라는 대안이 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>상생임대주택 특례 핵심 요건</H2>
      <p style={body}>
        상생임대주택 특례는 임대료를 5% 이내로 올리고 2년 이상 유지한 집주인에게 양도세 비과세 혜택을 주는 제도예요.
      </p>
      <GreenBox>
        <strong>3가지 핵심 요건</strong><br /><br />
        ① 직전 임대차계약 1년 6개월 이상 유지<br />
        ② 상생계약: 임대료 5% 이내 인상 + 2년 이상 유지<br />
        ③ 1세대 1주택 + 2년 보유 (조정대상지역: 2년 거주 추가)<br /><br />
        ★ 다가구주택 전체 양도 시 → 모든 호가 ①②를 충족해야 해요
      </GreenBox>

      <H2>우리 집 요건 충족되는지 체크해보세요</H2>
      <p style={body}>
        아래 항목을 모두 체크할 수 있으면 전체 양도 시 특례 적용이 가능해요.
      </p>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="모든 호 요건 충족! 전체 양도 시 상생임대 특례 적용 가능해요."
        partialMatchText="일부 호 미충족. 전체 양도 시 특례 불가 → 호별 양도를 검토하세요."
      />

      <H2>전체 양도 vs 호별 양도, 어떻게 다를까</H2>
      <p style={body}>
        전체 양도가 안 되면 호별 양도를 고려해볼 수 있어요. 다만 절차가 복잡하니 세무사 상담이 필수예요.
      </p>
      <BorderBox>
        <strong>전체 양도</strong><br />
        다가구주택을 통째로 파는 방식. 모든 호가 상생임대 요건을 충족해야 특례 적용.<br />
        한 호라도 공실이거나 요건 미달이면 전체에 특례 불가.<br /><br />
        <strong>호별 양도</strong><br />
        층별·호별로 나눠서 매각. 요건 충족한 호만 특례 적용 가능.<br />
        구분등기가 필요할 수 있고, 양도차익 계산이 복잡해져요.<br /><br />
        ★ 호별 양도 시 다주택자가 될 수 있어서 양도 순서도 중요해요. 반드시 세무사와 상의하세요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 소득세법 시행령 기준으로 작성됐어요. 다가구주택 특례 적용은 세무사에게 구체적인 상담을 받으세요." />
    </ArticleLayout>
  );
}
