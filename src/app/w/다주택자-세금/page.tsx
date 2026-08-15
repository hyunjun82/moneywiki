"use client";
// Q1. 집이 여러 채인데 세금이 얼마나 되는지, 중과 배제는 언제까지인지 궁금
// Q2. 취득세·종부세·양도세 각각 확인 → 중과 배제 기간 확인 → 매도 시기 판단
// Q3. 취득세 중과(8~12%), 종부세 2주택 일반/3주택 5%, 양도세 중과 배제 2026.5월까지, 임대소득세
// Q4. GreenBox(세금 종류별 요약) + CompareTable(2주택 vs 3주택+) + BorderBox(양도세 중과 배제) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "취득세", optionA: "8% (조정대상지역)", optionB: "12% (조정대상지역)" },
  { label: "종합부동산세", optionA: "일반세율 (0.5~2.7%)", optionB: "최대 5%" },
  { label: "양도소득세 중과", optionA: "기본세율 +20%p", optionB: "기본세율 +30%p" },
  { label: "양도세 중과 배제", optionA: "2026.5월까지 적용", optionB: "2026.5월까지 적용" },
  { label: "임대소득세", optionA: "2천만원 이하 분리과세 가능", optionB: "2천만원 이하 분리과세 가능" },
];

const FAQS = [
  { q: "양도세 중과 배제가 2026년 5월까지라는데 정확한 날짜는요?", a: "2026년 5월 31일까지 양도분에 대해 중과세율이 배제돼요. 기본세율(6~45%)만 적용돼요. 이후 연장 여부는 국회 결정 사항이에요." },
  { q: "2주택인데 종부세가 일반세율이라고요?", a: "네, 2주택은 일반세율(0.5~2.7%)이 적용돼요. 과거 중과세율이 적용됐지만 완화됐어요. 3주택 이상은 최대 5%까지 올라가요." },
  { q: "조정대상지역이 아니면 취득세 중과 안 되나요?", a: "비조정대상지역은 2주택까지 일반세율(1~3%)이에요. 3주택부터 중과(8~12%)되고요. 조정대상지역은 2주택부터 8%예요." },
  { q: "월세 받으면 세금을 또 내야 하나요?", a: "네, 주택임대소득이 있으면 소득세를 내야 해요. 연 2천만원 이하면 14% 분리과세 선택 가능, 초과하면 종합소득 합산 과세예요." },
  { q: "주택 수를 줄이려면 어떤 순서가 유리한가요?", a: "양도차익이 적은 주택부터 팔면 세금 부담이 줄어요. 중과 배제 기간(2026.5월)에 매도하면 추가 세율을 피할 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "소득세법 (양도소득세)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "종합부동산세법", url: "https://www.law.go.kr/법령/종합부동산세법" },
    { label: "지방세법 (취득세)", url: "https://www.law.go.kr/법령/지방세법" },
  ]},
];

const RELATED = [
  { slug: "다가구주택-상생임대주택", title: "다가구주택 상생임대 특례", description: "상생임대 특례 비과세 조건이에요." },
  { slug: "종신보험-상속세-절세-방법", title: "종신보험 상속세 절세", description: "보험을 활용한 절세 방법이에요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산 세율 납부", description: "집 살 때 취득세 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        집 여러 채 있으면 세금이 얼마나 나올까?<br />
        다주택자 취득세·종부세·양도세 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        다주택자라 세금이 걱정되죠. 취득세·종부세·양도세 모두 주택 수에 따라 세율이 달라져요.
        양도세 중과 배제가 2026년 5월까지 연장돼서 지금이 매도 적기일 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>세금 3가지가 동시에 늘어나요</H2>
      <p style={body}>다주택자는 집을 살 때(취득세), 보유할 때(종부세), 팔 때(양도세) 모두 세금이 많아져요.</p>
      <GreenBox>
        <strong>취득세</strong>: 2주택 8%, 3주택+ 12% (조정대상지역 기준)<br />
        <strong>종합부동산세</strong>: 2주택 일반세율, 3주택+ 최대 5%<br />
        <strong>양도소득세</strong>: 2주택 +20%p, 3주택+ +30%p (중과 배제 시 기본세율)<br />
        <strong>임대소득세</strong>: 월세 수입 연 2천만원 이하 분리과세 14%<br /><br />
        ★ 2026년 5월 31일까지 양도세 중과 배제 적용 중
      </GreenBox>

      <H2>2주택 vs 3주택 이상 세금 비교</H2>
      <p style={body}>주택 수가 하나 더 늘어나면 세율이 크게 올라가요.</p>
      <CompareTable titleA="2주택" titleB="3주택 이상" rows={COMPARE_ROWS} />

      <H2>양도세 중과 배제 기간을 활용하세요</H2>
      <p style={body}>중과 배제 기간에 매도하면 기본세율만 적용돼서 세금을 크게 줄일 수 있어요.</p>
      <BorderBox>
        <strong>양도세 중과 배제 기간</strong>: 2026년 5월 31일까지 양도분<br />
        <strong>적용 효과</strong>: 2주택 +20%p, 3주택 +30%p 중과세율 배제 → 기본세율(6~45%)만 적용<br />
        <strong>장기보유특별공제</strong>: 중과 배제 기간에는 장기보유특별공제도 적용 가능<br /><br />
        ★ 매도 예정이라면 2026년 5월 이전에 양도 완료하는 게 유리해요. 이후 연장 여부는 미정이에요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 세법 기준으로 작성됐어요. 양도세 중과 배제 연장 여부, 종부세율 변경 등은 국회 입법에 따라 달라질 수 있으니 세무사에게 확인하세요." />
    </ArticleLayout>
  );
}
