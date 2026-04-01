"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "65세 이전에 고용보험에 가입했어요" },
  { id: "c2", label: "비자발적 퇴사예요 (권고사직, 계약만료 등)" },
  { id: "c3", label: "고용보험 가입기간 180일 이상이에요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능해요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 45, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

function getDays(age: number, years: number): number {
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
  "고용보험 최초 가입일이 65세 이전인지 확인",
  "가입기간 180일 이상 충족 여부 체크",
  "퇴직 사유가 비자발적인지 이직확인서 확인",
  "관할 고용센터 위치 확인 (1350 전화 가능)",
];

const FAQS = [
  {
    q: "65세에 퇴직했는데 실업급여를 받을 수 있나요?",
    a: "65세 이전에 고용보험에 가입한 사람이라면 받을 수 있죠. 핵심은 퇴직 시점이 아니라 고용보험 가입 시점이에요. 60세에 입사해서 68세에 퇴직해도 실업급여 대상이에요.",
  },
  {
    q: "50세 이상이면 뭐가 달라요?",
    a: "같은 가입기간이어도 수급기간이 30일 더 길어요. 예를 들어 10년 가입 기준으로 49세는 최대 240일, 50세는 최대 270일이에요. 재취업이 어려운 연령대를 고려한 거예요.",
  },
  {
    q: "정년퇴직도 실업급여 대상인가요?",
    a: "네, 대상이에요. 정년퇴직은 비자발적 퇴사로 인정돼요. 만 60세 정년이든 65세 정년이든, 고용보험 가입 요건만 충족하면 실업급여를 받게 돼요.",
  },
  {
    q: "65세 이후 신규 취업자도 앞으로 받을 수 있게 되나요?",
    a: "정부가 검토 중이에요. 법정정년 65세 연장 흐름에 맞춰 65세 이상 신규 취업자도 실업급여를 받을 수 있도록 확대하는 방안을 논의하고 있고, 이르면 2028년 이후 적용될 가능성이 있죠.",
  },
  {
    q: "장애인도 50세 이상과 같은 기준인가요?",
    a: "맞아요. 장애인은 나이와 관계없이 50세 이상과 동일한 수급기간을 적용받아요. 30대 장애인이어도 10년 가입 시 270일까지 받게 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제10조: 적용 제외 근로자", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조: 구직급여의 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 고객상담센터 (1350)", url: "https://1350.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-모의계산",
    title: "실업급여 모의계산 월급별 예상 금액",
    description: "월급, 나이, 가입기간을 넣으면 바로 예상 수령액이 나와요. 2026년 상한·하한액 적용 계산기를 제공해요.",
  },
  {
    slug: "실업급여-상병급여",
    title: "실업급여 받다가 아프면? 상병급여 조건",
    description: "실업급여 수급 중 질병이나 부상으로 구직활동을 못 하면 상병급여로 전환돼요. 금액은 동일하고 구직활동 면제예요.",
  },
  {
    slug: "정년퇴직후-실업급여-받는-방법",
    title: "정년퇴직 후 실업급여 수급 조건과 신청",
    description: "정년퇴직은 비자발적 퇴사로 인정돼요. 고용보험 가입 요건만 충족하면 실업급여 대상이에요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-나이제한"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 나이제한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 나이제한, 65세 넘으면 못 받을까?<br />
        연령별 수급 기간
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;나이 많은데 실업급여 받을 수 있을까?&quot;<br />
        퇴직 앞두고 이 질문 정말 많이 하시더라고요.<br /><br />
        핵심은 <strong>65세</strong>예요. 근데 퇴직할 때 나이가 아니라{" "}
        <strong>고용보험에 처음 가입한 시점</strong>이 기준이죠.<br />
        같은 10년 가입이라도 48세 퇴직이면 960만원, 52세면 1,080만원: 120만원 차이가 나요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 65세 기준 */}
      <H2>연령별 수급 기간, 65세가 왜 기준인가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제10조</a>가 실업급여 나이 기준을 정해놨어요. 기준선은 만 65세인데, 여기서 많이 헷갈리는 부분이 하나 있죠.
      </p>
      <p style={body}>
        65세 기준은 <strong>퇴직할 때 나이가 아니라 고용보험에 가입한 시점의 나이</strong>에 적용돼요. 60세에 입사해서 고용보험에 가입하고 68세에 퇴직했다면? 입사 시점이 65세 미만이니까 실업급여를 받을 수 있죠. 반대로 66세에 새로 취업해서 고용보험에 가입했다면? 가입 시점이 65세 이후라 실업급여 대상에서 빠지고요.
      </p>
      <p style={body}>
        이 차이 하나를 모르면 최대 810만원(270일치)을 통째로 놓칠 수 있죠. 내가 언제 고용보험에 처음 들었는지, 그 하나만 따지면 되는 문제예요.
      </p>

      <GreenBox>
        65세 <strong>이전</strong> 고용보험 가입 → 퇴직 시 나이 상관없이 실업급여 가능<br />
        65세 <strong>이후</strong> 신규 취업 → 2026년 현재 실업급여 대상 아님<br />
        핵심은 &ldquo;언제 고용보험에 들었나&rdquo;예요
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 실업급여 수급 자격을 갖췄어요. 관할 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <p style={{ ...body, marginTop: 14 }}>
        정년퇴직도 비자발적 퇴사로 인정돼요. 만 60세든 65세든 정년이 되면 실업급여 대상이죠. 계약 만료, 권고사직, 폐업도 마찬가지고요. 자발적으로 나왔더라도 <a href="/w/실업급여-임금체불" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금체불</a>이나 직장 내 괴롭힘 같은 <a href="/w/실업급여-정당한-퇴사-사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>정당한 사유</a>가 붙으면 인정받을 수 있어요.
      </p>

      <Divider />

      {/* 섹션 2: 연령별 수급기간 차이 */}
      <H2>수급 기간이 연령별로 얼마나 차이 나나요?</H2>
      <p style={body}>
        같은 회사에서 같은 기간 일했어도 퇴직 나이에 따라 받는 기간이 달라져요. 고용보험법이 50세 이상을 특별히 보호하고 있죠. 재취업이 현실적으로 어려운 나이대라는 걸 반영한 거예요.
      </p>
      <p style={body}>
        50세 미만이면 고용보험 10년 이상 가입 기준 최대 240일(약 8개월)이에요. 50세 이상이라면 같은 조건에서 최대 270일(약 9개월)이죠. 30일 차이가 작아 보이지만 금액으로 따지면 약 200만원이에요. 장애인은 나이와 관계없이 50세 이상과 동일한 기준을 적용받고요.
      </p>

      <SectionBadge>내 나이와 가입기간으로 계산해보세요</SectionBadge>
      <Calculator
        title="실업급여 예상 수령액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있죠."
      />

      <p style={body}>
        계산기에서 나이를 49세 → 50세로 바꿔보세요. 수급기간과 총액이 확 달라지는 게 보일 거예요. 퇴직 시점을 조절할 수 있다면 50세 이후로 미루는 편이 유리하죠. 물론 개인 상황에 따라 다르니까 무조건 그렇다는 건 아니에요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 65세 이상 현재 상황 */}
      <H2>65세 이후 신규 취업자의 수급 기간 제한</H2>
      <p style={body}>
        안타깝지만 2026년 현재, 65세 이후에 새로 고용보험에 가입한 사람은 실업급여를 받을 수 없어요. 이 규정은 정년이 55~60세였던 시절에 만들어졌는데, 지금은 65세 넘어서도 일하는 분이 훨씬 많아졌잖아요. 제도가 현실을 못 따라간 거죠.
      </p>
      <p style={body}>
        정부도 이 문제를 인식하고 있어요. 법정정년을 65세로 단계적 연장하는 흐름에 맞춰, 65세 이상 신규 취업자에게도 실업급여를 열어주는 방안을 검토 중이죠. 이르면 2027년 상반기에 논의를 시작해서 2028년 이후 적용될 가능성이 있어요.
      </p>
      <p style={body}>
        실업급여를 못 받는다고 아무 지원이 없는 건 아니에요. 국민연금, 근로장려금, 지자체 고령자 일자리 프로그램을 뒤져보면 생각보다 받을 수 있는 게 많죠. 주민센터나 고용센터에서 통합 상담을 받아보는 걸 추천해요.
      </p>

      <BorderBox>
        국민연금 노령연금 수령 확인 (nps.or.kr)<br />
        워크넷(work.go.kr) 고령자 맞춤 일자리 검색<br />
        정부24(gov.kr)에서 근로장려금·자활급여 확인<br />
        서울시 50플러스포털(50plus.or.kr) 등 지자체 프로그램 활용
      </BorderBox>

      <Divider />

      {/* 섹션 4: 확인 체크리스트 */}
      <H2>연령별 수급 기간 확인을 위한 체크리스트</H2>
      <p style={body}>
        나이 기준 하나 잘못 알아서 신청이 거절되는 경우가 꽤 많아요. 미리 체크해두면 헛걸음을 안 하죠. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험자격 이력을 조회하면 내가 언제 고용보험에 가입했는지, 가입기간이 얼마나 되는지 한 번에 나와요.
      </p>

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        고용24에서 조회가 안 되거나 기록이 이상하다면 관할 고용센터(1350)에 전화해보세요. 본인 상황을 설명하면 실업급여 대상이 되는지 미리 판단해줘요. 신청하고 거절당하는 것보다 전화 한 통이 훨씬 빠르죠.
      </p>

      <Divider />

      {/* 섹션 5: 주의사항 */}
      <H2>수급 거절당했다면 거절 사유부터 따져보세요</H2>
      <p style={body}>
        실업급여 신청이 거부됐을 때 &quot;나이 때문&quot;이라고 단정하기 전에 다른 조건부터 봐야 해요. 사실 나이보다 가입기간 180일 미달이나 자발적 퇴사 판정으로 탈락하는 경우가 훨씬 많죠.
      </p>
      <p style={body}>
        65세 이전에 고용보험에 가입했다는 걸 증명할 수 있으면 나이 이유로 탈락한 게 아니에요. 이직확인서에 고용보험 가입일이 적혀 있으니까, 그걸 가지고 이의신청을 하면 되죠. 고용센터 결정에 불복하면 심사청구(고용보험심사위원회)나 재심사청구 경로도 열려 있어요.
      </p>
      <p style={body}>
        거절 사유를 정확히 파악하고, 해당 안 되는 사유면 적극적으로 다퉈야 해요. <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청 절차</a>도 열려 있으니까요. 나이 제한 하나 때문에 최대 810만원을 포기하는 건 너무 아깝잖아요. 모르겠으면 고용센터(1350)에 전화해서 &quot;왜 거절됐는지&quot; 먼저 물어보세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        나이 관련해서 실제로 많이 물어보시는 것만 골랐죠.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 법령은 개정될 수 있으니 중요한 결정 전에 고용24(ei.go.kr)나 고용센터(1350)에서 직접 확인하세요." />
    </ArticleLayout>
  );
}
