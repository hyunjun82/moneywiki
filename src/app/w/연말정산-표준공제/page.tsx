"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 연말정산에서 공제 증빙을 못 챙겼는데 표준공제를 받을 수 있는지 궁금한 직장인
// Q2: 표준공제 13만원 적용 여부 판단 후 유리한 선택
// Q3: 표준공제 13만원, 항목별 공제 미신청 시 자동 적용, 배우자 없는 1인가구에게 유리할 수 있음
// Q4: GreenBox(핵심) + BorderBox(비교) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "특별소득공제(보험료·주택자금) 합산 금액 확인",
  "특별세액공제(의료비·교육비·기부금) 합산 금액 확인",
  "두 공제 합계가 13만원 이하면 표준공제가 유리",
  "표준공제 선택 시 항목별 공제는 모두 포기",
  "부양가족이 없는 1인가구는 표준공제 검토",
  "연말정산 간소화 서비스에서 공제 합계 먼저 확인",
];

const FAQS = [
  { q: "표준공제가 뭔가요?", a: "특별소득공제와 특별세액공제를 신청하지 않으면 대신 13만원을 공제해주는 거예요. 공제 증빙을 못 챙긴 사람을 위한 최소 보장이에요." },
  { q: "표준공제를 선택하면 의료비·교육비 공제를 못 받나요?", a: "네, 표준공제를 선택하면 특별소득공제와 특별세액공제를 모두 포기하는 거예요. 둘 중 하나만 선택할 수 있어요." },
  { q: "공제할 게 아예 없으면 자동으로 표준공제가 적용되나요?", a: "네, 특별소득공제와 특별세액공제를 하나도 신청하지 않으면 표준공제 13만원이 자동 적용돼요." },
  { q: "1인가구인데 표준공제가 유리한가요?", a: "부양가족이 없고, 의료비·교육비·보험료 합계가 13만원 미만이면 표준공제가 유리할 수 있어요. 다만 대부분은 항목별 공제가 더 많아요." },
  { q: "표준공제는 소득공제인가요, 세액공제인가요?", a: "세액공제 13만원이에요. 산출세액에서 13만원을 직접 빼주는 거라 소득공제보다 실질 효과가 커요." },
];

const REFERENCES = [
  { category: "법령·안내", items: [
    { label: "소득세법 제59조의4 (특별세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-특별세액공제-한도", title: "특별세액공제 한도", description: "의료비·교육비·기부금 공제 한도예요." },
  { slug: "연말정산-의료비-공제", title: "연말정산 의료비 공제", description: "의료비 공제 조건과 한도예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 표준공제 13만원, 받는 게 나을까?<br />
        항목별 공제와 비교하는 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        공제 증빙을 하나도 못 챙겼는데 그냥 표준공제 13만원을 받는 게 나을지 고민되죠?
        특별소득공제와 특별세액공제 합계가 13만원보다 적으면 표준공제가 유리해요.
        대부분은 항목별 공제가 더 크지만, 1인가구라면 한번 비교해볼 만해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>표준공제 vs 항목별 공제, 뭐가 유리할까?</H2>
      <p style={body}>표준공제를 선택하면 특별소득공제(보험료·주택자금)와 특별세액공제(의료비·교육비·기부금)를 모두 포기해요. 두 가지 중 하나만 선택할 수 있어요.</p>

      <GreenBox title="판단 기준">
        특별소득공제 + 특별세액공제 합계가 13만원 이상이면 → 항목별 공제 유리<br />
        합계가 13만원 미만이면 → 표준공제 13만원 유리
      </GreenBox>

      <BorderBox>
        <strong>표준공제 적용 대상</strong><br />
        특별소득공제와 특별세액공제를 하나도 신청하지 않은 근로자<br />
        공제 증빙을 챙기지 못한 경우<br />
        부양가족 없이 의료비·교육비 지출이 적은 1인가구
      </BorderBox>

      <CategoryButton label="세금·연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>표준공제 선택 전 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>연말정산 간소화 서비스에서 항목별 공제 합계를 먼저 확인하세요.</p>
      <SectionBadge>비교 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 표준공제 금액은 세법 개정에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
