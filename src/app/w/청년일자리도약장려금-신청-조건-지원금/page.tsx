"use client";

// Q1. 취업이 어려운 청년이 중소기업에 취업했을 때 받을 수 있는 지원금이 있는지 궁금한 상황이에요.
// Q2. 자격 조건을 확인하고 기업과 함께 신청하는 행동.
// Q3. 만 15~34세, 4개월 이상 실업, 중소기업 채용, 최대 720만원, 신청 절차.
// Q4. EligibilityChecker(자격 확인) + GreenBox(지원금 요약) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "age", label: "만 15~34세예요 (군 복무 기간 제외)" },
  { id: "unemployed", label: "4개월 이상 실업 상태였어요" },
  { id: "company", label: "5인 이상 중소기업에 정규직으로 채용됐어요" },
  { id: "insurance", label: "고용보험에 가입돼 있어요" },
];

const APPLY_STEPS = [
  { title: "기업이 참여 신청", desc: "고용24에서 기업이 청년일자리도약장려금 참여를 신청해요." },
  { title: "청년 채용", desc: "참여 승인 후 취업애로청년을 정규직으로 채용해요." },
  { title: "6개월 근속", desc: "채용된 청년이 6개월 이상 근속하면 1차 지원금 청구가 가능해요." },
  { title: "지원금 수령", desc: "6개월 근속 후 480만원, 12개월 근속 후 추가 240만원 지급돼요.", tip: "총 720만원 (기업에 지급)" },
];

const FAQS = [
  { q: "지원금은 청년이 받나요, 기업이 받나요?", a: "기업이 받아요. 기업이 청년을 채용하고 유지하는 비용을 보조하는 구조예요. 다만 채용 청년에게도 간접적 혜택이 돌아가요." },
  { q: "4개월 실업 상태는 어떻게 확인하나요?", a: "고용보험 가입 이력으로 확인해요. 4개월 동안 고용보험 피보험자가 아니었으면 해당돼요." },
  { q: "대기업에 취업해도 받을 수 있나요?", a: "아니에요. 5인 이상 중소·중견기업만 대상이에요. 대기업은 해당되지 않아요." },
  { q: "계약직이면 안 되나요?", a: "정규직 채용이 원칙이에요. 다만 기간의 정함이 없는 근로계약이어야 해요." },
  { q: "청년이 6개월 안에 퇴사하면 어떻게 되나요?", a: "6개월 근속을 채우지 못하면 지원금이 지급되지 않아요. 이미 지급된 금액은 환수될 수 있어요." },
  { q: "신청은 어디서 하나요?", a: "고용24(work24.go.kr)에서 기업이 온라인으로 신청해요. 청년 개인이 직접 신청하는 건 아니에요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용노동부", url: "https://www.moel.go.kr" },
    { label: "고용24", url: "https://www.work24.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년-중소기업-소득세-감면-신청", title: "청년 중소기업 소득세 감면", description: "중소기업 취업 청년이라면 소득세도 감면받을 수 있어요." },
  { slug: "청년도약계좌-가입-조건", title: "청년도약계좌 가입 조건", description: "취업한 청년이라면 청년도약계좌로 목돈 마련이 가능해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 청년 지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년일자리도약장려금, 최대 720만원 받는 조건은?<br />
        신청 자격과 지원금 구조
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        4개월 넘게 일자리를 못 구하다가 중소기업에 취업했다면, 그 기업이 최대 720만원을 받을 수 있어요.
        기업에 지급되는 돈이지만, 채용을 유도하고 안정적 고용을 지원하는 제도라서 청년에게도 도움이 돼요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>내가 대상인지 확인해보세요</H2>
      <p style={body}>
        청년과 기업 양쪽 모두 조건을 충족해야 해요. 청년 기준은 아래와 같아요.
      </p>

      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="청년일자리도약장려금 대상이에요"
        partialMatchText="일부 조건이 충족되지 않아요"
      />

      <Divider />

      <H2>지원금은 얼마, 언제 나오나요?</H2>
      <p style={body}>
        채용된 청년이 6개월 근속하면 1차 480만원, 12개월 근속하면 추가 240만원이 기업에 지급돼요.
      </p>

      <GreenBox title="지원금 구조">
        · 6개월 근속: 480만원 (1차 지급)<br />
        · 12개월 근속: 240만원 (2차 지급)<br />
        · <strong>합계: 최대 720만원 (기업에 지급)</strong>
      </GreenBox>

      <Divider />

      <H2>신청 절차</H2>
      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        청년 개인이 직접 신청하는 게 아니라 기업이 고용24에서 신청해요. 취업을 준비하고 있다면 참여 기업 목록을 고용24에서 확인해보세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 고용노동부 공고를 기준으로 작성됐어요. 지원 조건과 금액은 예산 상황에 따라 변경될 수 있으니 고용24에서 최신 공고를 확인하세요." />
    </ArticleLayout>
  );
}
