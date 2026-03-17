"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "65세 이전에 현재(또는 마지막) 직장에 취업했어요" },
  { id: "c2", label: "비자발적 퇴직이에요 (정년퇴직, 계약만료, 권고사직 등)" },
  { id: "c3", label: "퇴직 전 18개월 이내 고용보험 180일 이상 가입했어요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능해요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 55, max: 75, step: 1, defaultValue: 67, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 25, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

function getDays(age: number, years: number): number {
  // 65세 이상은 항상 50세 이상 기준 적용
  if (age >= 50) {
    if (years < 1) return 120;
    if (years < 3) return 180;
    if (years < 5) return 210;
    if (years < 10) return 240;
    return 270;
  }
  if (years < 1) return 120;
  if (years < 3) return 150;
  if (years < 5) return 180;
  if (years < 10) return 210;
  return 240;
}

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.salary * 10000 * 0.6) / 30);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round((v.salary * 10000 * 0.6) / 30)));
      return daily * getDays(v.age, v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 피보험자격 이력 조회",
  "급여명세서에서 고용보험료 공제 여부 확인",
  "65세 이전 취업 여부를 증명할 수 있는 근로계약서 보관",
  "퇴직 후 12개월 이내에 고용센터 방문 또는 온라인 신청",
  "일용직이라면 근로내역확인서 발급받기",
];

const FAQS = [
  {
    q: "67세인데 정년퇴직했어요. 실업급여 받을 수 있나요?",
    a: "65세 이전부터 같은 회사에서 일했다면 받을 수 있죠. 정년퇴직은 비자발적 퇴직이라 수급 요건을 충족하면 지급돼요.",
  },
  {
    q: "65세 넘어서 다른 회사로 이직하면 어떻게 되나요?",
    a: "새 회사에서는 65세 이후 신규 취업으로 보기 때문에 고용보험 가입 대상이 아니에요. 이직하면 실업급여 자격을 잃을 수 있으니 신중하게 결정해야 하죠.",
  },
  {
    q: "65세 이후에 일용직으로 일해도 고용보험이 적용되나요?",
    a: "네, 일용직은 나이에 관계없이 고용보험이 적용돼요. 건설 일용직이나 단기 알바 등 하루 단위 고용이면 65세 이후에도 피보험기간이 쌓이죠.",
  },
  {
    q: "64세에 입사해서 66세에 퇴직하면요?",
    a: "받을 수 있죠. 65세 이전에 취업한 거니까요. 중간에 65세가 넘었어도 계속 일한 거라면 고용보험이 유지돼요.",
  },
  {
    q: "65세 이상이면 수급기간이나 금액이 줄어드나요?",
    a: "아니에요. 50세 이상과 동일한 기준이 적용되죠. 오히려 50세 미만보다 수급일수가 더 많아서 가입기간 10년 이상이면 최대 270일까지 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제10조: 적용 제외 근로자 (65세 이후 신규 취업자)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령: 일용직 근로자 적용 기준", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 피보험자격 이력 조회 및 실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 고용보험 적용 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-나이제한",
    title: "실업급여 나이제한 기준",
    description: "나이에 따라 실업급여 수급기간과 자격이 어떻게 달라지는지 정리했어요.",
  },
  {
    slug: "고용보험-적용-제외",
    title: "고용보험 적용 제외 근로자 기준",
    description: "어떤 근로자가 고용보험에서 제외되는지 정리했어요.",
  },
  {
    slug: "정년퇴직후-실업급여-받는-방법",
    title: "정년퇴직 후 실업급여 받는 방법",
    description: "정년퇴직은 비자발적 퇴직이라 실업급여를 받을 수 있죠.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="실업급여-65세"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 65세이상</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        65세 이후에도 실업급여 받을까?<br />
        가입 시점 기준과 수급 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;67세인데 정년퇴직했어요. 나이 들었으니까 실업급여 못 받나요?&rdquo;<br />
        받을 수 있죠. <strong>65세 이전부터 같은 회사에서 일했다면요.</strong><br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제10조</a>가 65세 이후 신규 취업자를
        고용보험 적용 대상에서 빼고 있지만, 65세 이전에 취업해서 계속 일한 사람은
        나이에 상관없이 실업급여를 받을 수 있어요.
        50세 이상 기준이 적용되니까 가입기간 10년 이상이면 최대 270일까지 나오죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 65세 기준의 핵심 */}
      <H2>가입 시점 기준이 정확히 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제10조</a>가 <strong>65세 이후에 새로 취업한 사람</strong>을 고용보험 적용 대상에서 빼놨어요. 65세가 넘어서 새로 취업하면 고용보험에 가입이 안 되죠. 보험료도 안 내고, 퇴직해도 실업급여를 못 받는 구조예요.
      </p>
      <p style={body}>
        왜 65세가 기준일까요? <strong>국민연금 수령 시작 나이</strong>와 맞물려 있죠. 65세부터 국민연금이 나오는데, 연금과 실업급여를 동시에 받으면 중복 지원이 되니까요. 그래서 65세 이후 신규 취업자를 고용보험에서 뺀 거예요.
      </p>
      <p style={body}>
        반면 65세 이전부터 일하던 사람은 <strong>기득권을 인정</strong>해서 고용보험이 계속 유지돼요. 이미 보험료를 내고 있던 사람의 권리를 갑자기 빼앗을 순 없으니까요. 핵심은 딱 하나, <strong>&ldquo;언제 취업했느냐&rdquo;</strong>죠.
      </p>

      <GreenBox title="65세 기준 핵심 요약">
        65세 이전 취업 + 계속 근무 → 고용보험 유지 → <strong>실업급여 가능</strong><br />
        65세 이후 신규 취업 → 고용보험 가입 불가 → <strong>실업급여 불가</strong><br />
        일용직 → 나이 무관 → <strong>실업급여 가능</strong>
      </GreenBox>

      <SectionBadge>자격 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 65세 이상이어도 실업급여 수급 자격을 갖췄어요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담하세요."
      />

      <Divider />

      {/* 섹션 2: 받을 수 있는 경우 vs 못 받는 경우 */}
      <H2>수급 조건에 맞는 경우와 안 맞는 경우는?</H2>
      <p style={body}>
        64세에 취업해서 68세에 퇴직했다면? 받을 수 있죠. 취업 시점이 65세 이전이니까요. 60세에 들어가서 70세에 나와도 마찬가지예요. 중간에 65세를 넘겼어도 같은 직장에서 계속 일했으면 고용보험이 유지되죠.
      </p>
      <p style={body}>
        반대로 66세에 처음 취업한 사람은 고용보험 가입 대상 자체가 아니에요. 보험료를 낸 적이 없으니 실업급여도 나올 수 없죠. 67세에 취업해서 69세에 퇴직해도 결과는 같고요.
      </p>
      <p style={body}>
        주의할 건 <strong>65세 이후 이직</strong>이에요. 65세 이전에 A회사에서 일하다가 65세 이후에 B회사로 옮기면, B회사 입장에서는 <strong>신규 취업</strong>으로 봐요. <a href="/w/고용보험-적용-제외" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험 적용 제외 기준</a>에 걸리는 거죠. B회사에서는 고용보험 가입이 안 되니 실업급여도 못 받죠. 65세 이후에 이직을 고려하고 있다면 이 부분을 반드시 따져봐야 해요.
      </p>

      <BorderBox title="65세 이후 이직, 이게 함정이에요">
        A회사(64세 입사) → 65세 이후 퇴직 → <strong>실업급여 가능</strong><br />
        A회사(64세 입사) → 66세에 B회사로 이직 → B회사 퇴직 시 <strong>실업급여 불가</strong><br />
        이직하는 순간 신규 취업 취급을 받으니 주의하세요.
      </BorderBox>

      <SectionBadge>내 조건으로 수급액을 계산해보세요</SectionBadge>
      <Calculator
        title="65세 이상 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 65세 이상은 50세 이상 기준 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 일용직 예외 */}
      <H2>일용직은 가입 시점과 관계없이 수급 조건 충족</H2>
      <p style={body}>
        여기서 중요한 예외가 하나 있죠. <strong>일용직 근로자</strong>는 나이에 관계없이 고용보험이 적용돼요. 건설 현장 일용직, 단기 알바처럼 하루 단위로 고용되는 형태가 이에 해당하죠.
      </p>
      <p style={body}>
        왜 일용직만 예외일까요? 일용직은 고용이 불안정하고 국민연금 수급과 직접적인 관련이 적어요. 그래서 고용보험법이 나이와 무관하게 보호하고 있죠. 70세 일용직 근로자도 고용보험에 가입이 되고, 피보험기간도 쌓여요.
      </p>
      <p style={body}>
        일용직으로 일하면서 피보험기간 180일 이상을 채우면 실업급여를 신청할 수 있죠. 다만 일용직 실업급여는 일반 실업급여와 계산 방식이 다르니, <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 본인의 피보험 이력을 먼저 조회해 보는 게 좋아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 수급기간과 금액 */}
      <H2>가입 시점별 수급 조건과 기간 비교</H2>
      <p style={body}>
        65세 이상이라고 수급기간이 짧아지거나 금액이 깎이진 않아요. <strong>50세 이상</strong>과 동일한 기준을 적용받죠. 오히려 50세 미만보다 유리한 편이에요.
      </p>
      <p style={body}>
        피보험기간에 따라 수급일수가 달라지는데, 50세 이상이면 같은 피보험기간에서도 일수가 더 길어요. 10년 이상 가입이면 <strong>최대 270일</strong>까지 실업급여가 나오죠. 1년 미만이어도 120일이에요.
      </p>
      <p style={body}>
        금액도 마찬가지예요. 퇴직 전 3개월 <a href="/w/실업급여-평균임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금</a>의 60%를 기준으로 계산하고, 상한액·하한액이 정해져 있죠. 2026년 기준 1일 상한액 68,100원, 하한액 66,048원이에요. 나이가 많다고 깎이는 건 없어요.
      </p>

      <GreenBox title="50세 이상 수급기간 (65세도 동일 적용)">
        1년 미만: 120일<br />
        1~3년: 180일<br />
        3~5년: 210일<br />
        5~10년: 240일<br />
        10년 이상: 270일 (최대)
      </GreenBox>

      <Divider />

      {/* 섹션 5: 실전 확인 방법 */}
      <H2>가입 시점과 수급 조건, 지금 바로 점검하세요</H2>
      <p style={body}>
        가장 먼저 할 일은 <strong>본인의 고용보험 가입 여부</strong>를 따져보는 거예요. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 접속해서 피보험자격 이력을 조회하면, 현재 고용보험에 가입돼 있는지, 언제부터 가입됐는지 한 번에 나오죠.
      </p>
      <p style={body}>
        급여명세서에서 고용보험료가 공제되고 있는지도 같이 살펴보세요. 보험료가 빠지고 있다면 가입 상태인 거예요. 65세 이전에 입사했는데 고용보험료가 안 빠지고 있다면, 회사 쪽에 바로 확인을 요청해야 하죠.
      </p>
      <p style={body}>
        퇴직을 앞두고 있다면 <strong>이직확인서</strong>에 퇴직 사유가 정확히 기재되는지도 챙겨야 해요. 정년퇴직, 계약만료 같은 비자발적 사유가 맞게 적혀 있어야 심사가 수월하죠. 준비가 됐다면 퇴직 후 가능한 빨리 고용센터에 방문하거나 온라인으로 신청하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        65세 이상 실업급여에 대해 실제로 궁금해하시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사안은 고용센터 심사에 따라 달라질 수 있으니, 고용센터(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
