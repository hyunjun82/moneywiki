"use client";
// Q1. 65세 넘었는데 퇴직당했거나 퇴직 예정인 상황. 실업급여를 받을 수 있는지 아닌지 모르겠는 불안한 상태.
// Q2. 본인이 '65세 이전 입사 + 동일 사업장 계속 고용' 조건에 해당하는지 확인하고, 고용센터에 수급자격 신청하는 행동.
// Q3. 고용보험법 제10조 적용 제외, 동일 사업장 계속 고용 조건, 65세 이후 신규 취업은 구직급여 제외, 피보험기간 180일.
// Q4. EligibilityChecker(자격 확인) + GreenBox(핵심 조건) + BorderBox(사례별 정리) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "before65", label: "65세 이전에 현재(또는 마지막) 직장에 입사했어요" },
  { id: "continuous", label: "그 직장에서 65세 전후로 계속 근무했어요 (중간 이직 없음)" },
  { id: "insured180", label: "고용보험 피보험기간이 180일 이상이에요" },
  { id: "involuntary", label: "본인 의사와 관계없이 퇴직했어요 (비자발적 퇴직)" },
  { id: "jobseeking", label: "재취업 의사가 있고 구직활동을 할 계획이에요" },
];

const FAQS = [
  { q: "65세 이후 새로 취업하면 고용보험이 아예 없나요?", a: "구직급여(실업급여)만 적용 제외돼요. 산재보험, 고용안정사업, 직업능력개발사업은 계속 적용돼요." },
  { q: "사업주가 바뀌어도 동일 사업장이면 괜찮나요?", a: "네, 사업양도·합병 등으로 사업주가 바뀌었어도 같은 사업장에서 계속 근무했다면 '동일 사업장 계속 고용'으로 인정돼요." },
  { q: "65세 이전 직장을 퇴직하고 65세 이후 재취업했다면요?", a: "65세 이후 새 직장은 구직급여 적용 제외예요. 65세 이전 직장에서 퇴직할 때 실업급여 요건이 됐다면 그때 신청했어야 해요." },
  { q: "실업급여 수급 기간은 얼마나 되나요?", a: "나이와 피보험기간에 따라 120~270일이에요. 50세 이상이면 같은 피보험기간 대비 수급일수가 더 많아요." },
  { q: "65세 이상인데 일용직이에요. 실업급여 받을 수 있나요?", a: "65세 이전부터 같은 사업장에서 일용직으로 계속 근무했다면 가능해요. 일용직도 피보험기간 180일 이상을 충족해야 해요." },
  { q: "고용센터에 직접 가야 하나요?", a: "최초 수급자격 인정 신청은 거주지 관할 고용센터를 방문해야 해요. 이후 구직활동 신고는 고용24(ei.go.kr) 온라인으로 가능해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제10조 (적용 제외)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용노동부 65세 이상 고용보험 안내", url: "https://www.moel.go.kr" },
      { label: "고용24 수급자격 신청", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격-인정", title: "실업급여 수급자격 신청 절차", description: "고용센터 방문부터 수급자격 인정까지 단계별 절차를 정리했어요." },
  { slug: "50세-이상-실업급여", title: "50세 이상 실업급여 수급기간 혜택", description: "50세 이상이면 실업급여 수급일수가 더 많아요." },
  { slug: "실업급여-계산기", title: "실업급여 계산기", description: "내 급여 기준으로 실업급여 예상 수급액을 계산해봐요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 65세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        65세 이상 실업급여, 받을 수 있을까?<br />
        동일 사업장 계속 고용 조건과 수급 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        65세가 넘었는데 퇴직하게 됐다면 실업급여를 받을 수 있는지 걱정되죠.
        핵심은 '65세 이전에 입사해서 같은 직장에서 계속 일했느냐'예요.
        이 조건을 충족하면 65세 이후에도 실업급여를 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>65세 이상 실업급여, 가능한 경우와 불가능한 경우</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제10조</a>에 따라
        65세 이후 새로 고용된 사람은 구직급여(실업급여) 적용이 제외돼요.
        하지만 65세 이전부터 같은 사업장에서 계속 근무한 경우는 예외예요.
      </p>

      <GreenBox>
        · 65세 이전 입사 + 같은 직장 계속 고용 → 실업급여 <strong>가능</strong><br />
        · 65세 이후 새 직장에 취업 → 구직급여 <strong>적용 제외</strong><br />
        · 사업주가 바뀌어도 동일 사업장이면 → <strong>가능</strong><br />
        · 중간에 이직 후 65세 이후 재취업 → <strong>불가</strong>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>내가 받을 수 있는지 확인해보세요</H2>
      <p style={body}>
        아래 항목에 모두 해당하면 65세 이상이어도 실업급여 수급 자격이에요.
        하나라도 빠지면 수급이 어려울 수 있으니 고용센터에 상담해봐야 해요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="모든 조건을 충족해요. 고용센터에 수급자격 인정 신청을 하면 돼요."
        partialMatchText="일부 조건이 충족되지 않아요. 고용센터(1350)에 상담해보시는 게 좋아요."
      />

      <Divider />

      <H2>사례별로 살펴보면 이래요</H2>
      <p style={body}>
        같은 65세 이상이라도 입사 시점과 사업장 연속성에 따라 결과가 완전히 달라져요.
      </p>

      <BorderBox>
        <strong>사례 1) 62세 입사, 67세 퇴직 (같은 회사)</strong><br />
        → 65세 이전 입사 + 계속 고용. 실업급여 <strong>가능</strong><br /><br />
        <strong>사례 2) 60세 A회사 퇴직 → 66세 B회사 입사 → 68세 퇴직</strong><br />
        → 65세 이후 새 직장 취업. 구직급여 <strong>적용 제외</strong><br /><br />
        <strong>사례 3) 63세 입사, 사업 양도로 사업주 변경, 67세 퇴직</strong><br />
        → 동일 사업장 계속 고용. 실업급여 <strong>가능</strong>
      </BorderBox>

      <p style={body}>
        65세 이후에도 산재보험, 고용안정사업, 직업능력개발사업은 계속 적용돼요.
        고용센터 취업 알선 등 재취업 지원 서비스도 이용할 수 있으니 참고해두세요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 고용보험법 및 고용노동부 안내 자료를 바탕으로 작성됐어요. 개인 상황에 따라 수급 자격이 달라질 수 있으니 관할 고용센터(1350)에 상담해봐요." />
    </ArticleLayout>
  );
}
