"use client";

// Q1: 청년미래적금과 청년도약계좌 중 뭘 가입해야 유리한지 비교하고 싶은 청년
// Q2: 두 상품의 차이를 이해하고 자기 상황에 맞는 상품 선택
// Q3: 만기(3년 vs 5년), 월납입한도, 정부기여금, 중복가입 불가, 갈아타기 조건
// Q4: CompareTable(비교) + GreenBox(결론) + Checklist(가입 전 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "만기", optionA: "3년", optionB: "5년" },
  { label: "월 납입 한도", optionA: "최대 70만원", optionB: "최대 70만원" },
  { label: "최대 수령액", optionA: "약 2,800만원", optionB: "약 5,000만원" },
  { label: "정부 기여금", optionA: "월 최대 4만원", optionB: "월 최대 3.3만원" },
  { label: "이자 비과세", optionA: "비과세", optionB: "비과세" },
  { label: "소득 조건", optionA: "총급여 7,500만원 이하", optionB: "총급여 7,500만원 이하" },
  { label: "나이 조건", optionA: "만 19~34세", optionB: "만 19~34세" },
  { label: "중도해지 패널티", optionA: "기여금 반환", optionB: "기여금 반환 (3년 후 면제)" },
];

const CHECKLIST = [
  "현재 청년도약계좌 가입 중이면 청년미래적금 중복 가입 불가",
  "총급여 7,500만원 이하 확인 (종합소득 6,300만원 이하)",
  "만 19~34세 확인 (병역 기간 최대 6년 차감)",
  "3년 유지 가능하면 청년미래적금, 5년 유지 가능하면 청년도약계좌",
  "청년도약계좌 3년 이상 가입 후 갈아타기 시 기여금 유지",
  "월 납입 여력 확인 (최대 월 70만원)",
];

const FAQS = [
  { q: "두 상품 동시에 가입할 수 있나요?", a: "안 돼요. 정부에서 중복 가입을 막았어요. 하나를 해지하고 다른 하나에 가입해야 해요." },
  { q: "어떤 게 더 유리한가요?", a: "3년 안에 목돈이 필요하면 청년미래적금이 나아요. 5년 유지할 수 있고 목돈을 더 크게 모으고 싶으면 청년도약계좌가 유리해요. 기여금 비율은 미래적금이 약간 높아요." },
  { q: "청년도약계좌에서 미래적금으로 갈아타면 손해 보나요?", a: "3년 이상 가입했으면 기여금 전액 받고 패널티 없이 갈아탈 수 있어요. 3년 미만이면 기여금을 돌려줘야 해요." },
  { q: "군 복무 기간도 나이에서 빼주나요?", a: "네, 병역 이행 기간은 최대 6년까지 나이에서 차감해요. 만 36세까지 가입 가능한 경우도 있어요." },
  { q: "가입은 어디서 하나요?", a: "시중은행 앱에서 가입할 수 있어요. 서민금융진흥원 홈페이지에서 가입 가능 은행 목록을 확인해보세요." },
];

const REFERENCES = [
  { category: "안내", items: [
    { label: "서민금융진흥원 청년상품 안내", url: "https://www.kinfa.or.kr" },
    { label: "기획재정부 청년정책", url: "https://www.moef.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년미래적금-가입방법", title: "청년미래적금 가입방법", description: "청년미래적금 가입 절차와 필요 서류예요." },
  { slug: "청년도약계좌", title: "청년도약계좌", description: "청년도약계좌의 자세한 가입 조건과 혜택이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 청년정책</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년미래적금 vs 청년도약계좌, 뭐가 다를까?<br />
        기여금·만기·중복가입 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년미래적금이 새로 나왔는데 기존 청년도약계좌와 뭐가 다른 건지 헷갈리죠?
        둘 다 정부가 기여금을 보태주는 청년 적금이지만, 만기와 기여금 구조가 달라요.
        중복 가입은 안 되니까 자기 상황에 맞는 걸 골라야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>한눈에 보는 두 상품 비교</H2>
      <p style={body}>
        가장 큰 차이는 만기예요. 미래적금은 3년, 도약계좌는 5년이에요. 목돈이 빨리 필요하냐, 더 크게 모으고 싶으냐에 따라 선택이 달라져요.
      </p>

      <SectionBadge>청년미래적금 vs 청년도약계좌</SectionBadge>
      <CompareTable titleA="청년미래적금" titleB="청년도약계좌" rows={COMPARE_ROWS} />

      <GreenBox title="선택 기준">
        3년 안에 전세·결혼 등 목돈이 필요하다면 → 청년미래적금<br />
        5년 유지 가능하고 최대한 많이 모으고 싶다면 → 청년도약계좌<br />
        기여금 비율만 따지면 청년미래적금이 살짝 높아요
      </GreenBox>

      <CategoryButton label="금융·청년정책 정보" count={4} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>가입 전에 꼭 체크할 것</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        소득 조건과 나이 조건이 같아서 헷갈리기 쉬운데, 중복 가입이 안 된다는 게 핵심이에요.
      </p>

      <SectionBadge>가입 전 확인 항목</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 청년미래적금·청년도약계좌 제도를 바탕으로 작성됐어요. 기여금 비율과 가입 조건은 정책 변경에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
