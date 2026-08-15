"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일 다음 날부터 12개월 이내예요" },
  { id: "c2", label: "고용보험 가입기간 180일 이상이에요" },
  { id: "c3", label: "비자발적 퇴사예요 (권고사직, 계약만료 등)" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능해요" },
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

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 40, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

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
  "고용24(ei.go.kr)에서 이직확인서 처리 완료 여부 확인",
  "퇴직일 기준 남은 수급기간 계산 (12개월 - 경과일수)",
  "워크넷 구직등록 완료",
  "수급자격 신청자 온라인 교육 이수",
  "관할 고용센터 방문 예약 (신분증, 통장 사본 지참)",
];

const FAQS = [
  {
    q: "퇴사하고 12개월 지나면 실업급여를 아예 못 받나요?",
    a: "맞아요. 수급기간 12개월이 지나면 고용보험법에 따라 수급권이 소멸돼요. 수급일수가 남아 있어도 지급이 불가능하죠. 새 직장에서 고용보험 가입기간을 다시 쌓아야 해요.",
  },
  {
    q: "해외에 나가 있다가 돌아오면 수급기간이 연장되나요?",
    a: "해외 체류만으로는 수급기간이 연장되지 않아요. 질병, 출산, 군복무 같은 법정 사유가 있어야 최대 4년까지 연장 신청이 가능하죠.",
  },
  {
    q: "퇴사 후 바로 신청하면 첫 입금은 언제쯤이에요?",
    a: "수급자격 신청 후 대기기간 7일이 지나고 첫 실업인정일에 지급이 결정돼요. 퇴사 후 대략 3~4주면 첫 실업급여가 통장에 들어오죠.",
  },
  {
    q: "이직확인서를 회사가 안 내주면 신청 자체가 안 되나요?",
    a: "그렇지 않아요. 회사가 10일 이내에 이직확인서를 제출하지 않으면 고용센터(1350)에 신고하세요. 고용센터가 회사에 직권으로 제출을 요구하죠. 과태료까지 부과돼요.",
  },
  {
    q: "11개월째인데 지금 신청해도 수급일수를 다 받을 수 있나요?",
    a: "남은 수급기간 1개월(약 30일) 안에 수급일수를 소화해야 해요. 수급일수가 120일이라면 30일밖에 못 받고 90일치를 날리게 되죠. 하루라도 빨리 신청하는 게 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제48조: 수급기간 및 수급권 소멸", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조: 구직급여의 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 고객상담센터 (1350)", url: "https://1350.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-신청-준비물-목록",
    title: "실업급여 신청 준비물 목록",
    description: "신분증부터 이직확인서까지, 빠뜨리면 안 되는 서류를 정리했어요.",
  },
  {
    slug: "실업급여-고용센터",
    title: "실업급여 관할 고용센터 찾기",
    description: "거주지 기준 관할 고용센터 위치와 방문 전 준비사항을 알려드려요.",
  },
  {
    slug: "실업급여-첫-입금일",
    title: "실업급여 첫 입금일 언제?",
    description: "수급자격 인정 후 대기기간 7일이 지나면 첫 실업인정일에 지급돼요.",
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
          currentSlug="퇴사후-실업급여-신청-기간"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 신청기간</p>

      {/* h1: 2줄 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴사 후 실업급여, 언제까지 신청해야?<br />
        12개월 기한과 절차
      </h1>

      {/* intro */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;좀 쉬다가 신청해도 되죠?&quot;
      </p>
      <p style={body}>
        되긴 하는데, 대가가 커요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제48조</a>가 정한 수급기간은 <strong>퇴직일 다음 날부터 딱 12개월</strong>이에요.
        이 기간 안에 신청하고, 받을 수 있는 일수를 전부 소화해야 하죠.
        12개월이 지나면 수급일수가 남아 있어도 한 푼도 못 받아요.
      </p>
      <p style={body}>
        늦게 신청할수록 받을 수 있는 날이 줄어들어요.
        하루 미루면 1일 6만원 이상을 버리는 셈이니, 퇴사 직후부터 움직이는 게 유리하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 수급기간 12개월의 의미 ── */}
      <H2>12개월 기한은 정확히 뭘 뜻하나요?</H2>
      <p style={body}>
        많은 분이 헷갈리는 부분이에요.
        12개월은 &quot;신청 기한&quot;이 아니라 <strong>&quot;수급을 완료해야 하는 기한&quot;</strong>이에요.
        신청만 12개월 안에 하면 되는 게 아니라, 받을 수 있는 일수를 전부 소화해야 하는 기간이죠.
      </p>
      <p style={body}>
        구체적으로 보면, 2026년 1월 15일에 퇴직했다면 수급기간은 1월 16일~2027년 1월 15일이에요.
        이 12개월이 지나는 순간 수급권이 소멸되죠.
        수급일수가 90일이 남았든 150일이 남았든 상관없이 끝나버려요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 명시된 강행규정이라 고용센터 담당자가 재량으로 바꿀 수 있는 문제가 아니에요.
      </p>
      <p style={body}>
        핵심은 <strong>가능한 빨리 신청</strong>하는 거예요.
        늦게 시작하면 12개월 안에 수급일수를 다 채우지 못하죠.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 이직확인서 처리 완료가 확인되면 곧바로 움직이세요.
      </p>

      <GreenBox>
        퇴직일 다음 날부터 12개월 = 수급기간<br />
        12개월 안에 신청 + 수급 완료해야 해요<br />
        12개월 지나면 수급일수가 남아도 지급 불가<br />
        고용보험법 제48조 강행규정: 예외 거의 없음
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 실업급여 수급 자격을 갖췄어요. 관할 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <p style={{ ...body, marginTop: 14 }}>
        정년퇴직도 비자발적 퇴사로 인정돼요. 계약 만료, 권고사직, 폐업 전부 마찬가지고요. 본인이 사표를 냈더라도 임금체불이나 직장 내 괴롭힘 같은 정당한 사유가 있으면 수급자격을 받을 수 있죠.
      </p>

      <Divider />

      {/* ── 섹션 2: 손해 계산 + 계산기 ── */}
      <H2>기한을 넘기면 얼마나 손해인가요?</H2>
      <p style={body}>
        수급기간 12개월은 퇴직일 기준이라, 내가 언제 신청하든 <strong>끝나는 날짜는 똑같아요</strong>.
        3개월 뒤에 신청하면 남은 수급기간이 9개월뿐이죠.
        수급일수가 150일(약 5개월)이라면 9개월 안에 다 소화할 수 있으니 이 경우는 손해가 없어요.
      </p>
      <p style={body}>
        문제는 더 늦어질 때예요.
        같은 150일 수급자가 퇴직 후 8개월째에 신청하면, 남은 수급기간은 4개월(약 120일)뿐이죠.
        150일 중 30일치를 아예 날리게 돼요.
        2026년 기준 1일 하한액 <strong>66,048원</strong>만 잡아도 약 <strong>198만원</strong>을 그냥 버리는 셈이에요.
      </p>
      <p style={body}>
        1일 상한액 <strong>68,100원</strong> 기준이면 30일에 약 204만원이에요.
        60일을 놓치면 408만원, 90일이면 612만원이죠.
        미루는 하루하루가 돈으로 직결된다고 보면 돼요.
        아래 계산기에서 본인 예상 수령액을 조회해보세요.
      </p>

      <BorderBox>
        1월 퇴직 → 2월 신청: 수급기간 11개월 남음 (여유 충분)<br />
        1월 퇴직 → 7월 신청: 수급기간 6개월 남음 (빠듯할 수 있음)<br />
        1월 퇴직 → 11월 신청: 수급기간 2개월 남음 (대부분 못 채움)
      </BorderBox>

      <SectionBadge>내 예상 수령액을 계산해보세요</SectionBadge>
      <Calculator
        title="실업급여 예상 수령액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있죠."
      />

      {/* ── 관련 글 + 광고 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3: 신청 절차와 타임라인 ── */}
      <H2>퇴사 후 신청 절차 순서</H2>

      <SectionBadge>신청 전 체크리스트</SectionBadge>

      <p style={body}>
        퇴사 당일에 곧바로 신청할 수 있는 건 아니에요.
        회사가 <strong>이직확인서</strong>를 고용보험 시스템에 제출해야 하는데, 법적 기한이 퇴직 후 10일이에요.
        대부분의 회사가 기한 안에 처리하지만, 안 해주면 고용센터(1350)에 신고하세요.
        미제출 사업주에게는 과태료가 부과되죠.
      </p>
      <p style={body}>
        이직확인서가 처리되면{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 확인할 수 있어요.
        그다음은 워크넷에 구직등록을 하고, <a href="/w/실업급여-온라인-교육" style={{ color: "#1D9E75", textDecoration: "underline" }}>수급자격 신청자 온라인 교육</a>을 이수하면 되죠.
        교육 이수 후 관할 고용센터에 방문해서 수급자격을 신청하세요.
        요즘은 온라인으로도 진행이 가능해요.
      </p>
      <p style={body}>
        수급자격 신청 후에는 <strong>대기기간 7일</strong>이 지나고 1차 실업인정일이 잡혀요.
        첫 실업인정을 통과하면 3~5영업일 내에 통장으로 입금되죠.
        퇴사 후 빠르게 움직이면 대략 <strong>3~4주</strong> 만에 첫 실업급여를 받을 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4: 수급기간 연장 예외 ── */}
      <H2>12개월 기한이 연장되는 예외</H2>
      <p style={body}>
        원칙적으로 12개월이 지나면 수급권이 사라져요.
        그런데{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 정한 <strong>법정 사유</strong>에 해당하면 수급기간 연장 신청이 가능하죠.
        질병, 부상, 출산, 만 8세 이하 자녀 육아, 의무 <a href="/w/실업급여-군입대" style={{ color: "#1D9E75", textDecoration: "underline" }}>군복무</a>가 그 사유예요.
      </p>
      <p style={body}>
        질병이나 부상으로 취업 자체가 어려운 경우, 의사 진단서를 첨부해서 고용센터에 연장 신청을 하면 돼요.
        출산 전후나 자녀 육아로 구직활동이 불가능한 기간도 인정되죠.
        의무 군복무 기간은 수급기간에서 아예 제외할 수 있고요.
      </p>
      <p style={body}>
        연장이 승인되면 최대 <strong>4년</strong>까지 수급기간이 늘어나요.
        단, 자동 연장이 아니라 본인이 직접 증빙서류와 함께 신청해야 하죠.
        &quot;몰랐다&quot;, &quot;바빠서 못 했다&quot;는 연장 사유가 아니에요.
        해당 사유가 생기면 즉시 고용센터에 연락하세요: 늦으면 연장 자체가 불가능해질 수 있어요.
      </p>

      <GreenBox>
        질병·부상: 의사 진단서 필요<br />
        출산·육아: 만 8세 이하 자녀<br />
        군복무: 의무 복무 기간<br />
        최대 4년까지 연장 가능 (증빙서류 + 본인 신청 필수)
      </GreenBox>

      <Divider />

      {/* ── 섹션 5: 기한 놓쳤을 때 ── */}
      <H2>기한을 놓쳤을 때 대처 방법</H2>
      <p style={body}>
        수급기간 12개월이 지나면 <strong>법적으로 수급권이 소멸</strong>돼요.
        어떤 사유를 대도 이미 지난 기간에 대해서는 실업급여를 받을 방법이 없어요.
        고용센터에 문의해도 같은 답변을 받게 되죠.
        담당자 재량으로 바꿀 수 있는 문제가 아니라, 법에 명시된 강행규정이에요.
      </p>
      <p style={body}>
        그렇다고 실업급여를 영영 못 받는 건 아니에요.
        새로 취업해서 <strong>고용보험 가입기간을 다시 쌓으면</strong> 다음 퇴직 때 수급자격이 새로 생기죠.
        18개월 중 180일 이상 가입하면 돼요.
        이전에 실업급여를 못 받았다고 해서 불이익이 가중되지는 않아요.
      </p>
      <p style={body}>
        결국 교훈은 하나예요: 퇴사하면 <strong>가능한 빨리 신청</strong>하세요.
        쉬고 싶으면 실업급여를 받으면서 쉬면 돼요.
        <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동 보고</a>는 2~4주에 한 번이라 부담이 크지 않아요.
        미루는 하루마다 1일 6만원 이상을 그냥 버리는 거라고 생각하면, 늦출 이유가 없죠.
      </p>

      <Divider />

      {/* ── FAQ 5개 ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴사 후 실업급여 신청 기간에 대해 실제로 많이 물어보는 내용만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 상황에 따라 수급자격과 기간이 달라질 수 있으니, 고용센터(1350)나 고용24(ei.go.kr)에서 직접 확인하세요." />
    </ArticleLayout>
  );
}
