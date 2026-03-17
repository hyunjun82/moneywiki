"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "형법 위반이 아닌 사유로 해고됐어요" },
  { id: "c2", label: "단순 업무능력 부족으로 해고됐어요" },
  { id: "c3", label: "경미한 취업규칙 위반으로 해고됐어요" },
  { id: "c4", label: "사업장에 중대한 손해를 끼치지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 40, format: (v: number) => `${v}세` },
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
  "이직확인서에 해고 사유가 어떻게 기재됐는지 반드시 확인",
  "고용24(ei.go.kr)에서 피보험자격 이력과 가입기간 180일 충족 확인",
  "해고통지서, 징계서류 등 해고 관련 서류를 모두 보관",
  "해고 사유가 고용보험법 시행규칙 별표2의 중대한 귀책사유에 해당하는지 대조",
  "고용센터(1350)에 사전 상담으로 수급 가능 여부 문의",
];

const FAQS = [
  {
    q: "업무능력이 부족해서 해고됐는데, 이것도 중대한 귀책사유인가요?",
    a: "아니에요. 단순 업무능력 부족은 중대한 귀책사유가 아니에요. 회사가 교육이나 배치전환 노력 없이 바로 해고한 거라면 오히려 부당해고일 수 있죠. 실업급여는 받을 수 있어요.",
  },
  {
    q: "지각을 여러 번 했다는 이유로 해고됐어요. 실업급여 받을 수 있나요?",
    a: "횟수와 정도에 따라 달라요. 경고도 없이 몇 번 지각으로 해고한 건 중대한 귀책사유로 보기 어렵죠. 다만 수십 회 반복에 여러 차례 경고까지 받았다면 달라질 수 있어요. 고용센터에서 구체적으로 판단해요.",
  },
  {
    q: "징계해고와 중대한 귀책사유는 같은 건가요?",
    a: "다른 개념이에요. 징계해고는 회사의 인사 절차이고, 중대한 귀책사유는 고용보험법에서 실업급여 수급을 제한하는 기준이에요. 징계해고를 당했어도 그 사유가 고용보험법상 중대한 귀책사유에 해당하지 않으면 실업급여를 받을 수 있죠.",
  },
  {
    q: "횡령으로 해고됐는데 혐의를 부인해요. 실업급여는 어떻게 되나요?",
    a: "형사 유죄 판결 전이라도 고용센터가 자체 판단으로 중대한 귀책사유 해당 여부를 결정해요. 해고 사유가 횡령이면 실업급여가 제한될 가능성이 높죠. 무죄가 확정되면 그때 재신청할 수 있어요.",
  },
  {
    q: "중대한 귀책사유로 실업급여가 거부됐는데, 불복할 수 있나요?",
    a: "할 수 있어요. 고용센터 결정에 불복하면 심사청구(90일 이내)를 하고, 그래도 안 되면 재심사청구(30일 이내)를 할 수 있죠. 귀책사유의 &ldquo;중대성&rdquo;에 대한 판단은 사람마다 다를 수 있으니 적극적으로 다퉈볼 만해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제58조: 이직 사유에 따른 수급자격의 제한", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 별표2: 수급자격이 제한되는 이직 사유", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
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
    slug: "무단결근-해고-실업급여",
    title: "무단결근 해고 시 실업급여 받을 수 있을까",
    description: "무단결근으로 해고됐을 때 실업급여가 가능한 경우와 불가능한 경우를 정리했어요.",
  },
  {
    slug: "부당해고-구제신청-실업급여",
    title: "부당해고 구제신청과 실업급여 동시 진행",
    description: "부당해고 구제신청 중에도 실업급여를 받을 수 있어요. 복직하면 반환하지만 심사 중에는 가능하죠.",
  },
  {
    slug: "실업급여-이의신청",
    title: "실업급여 이의신청 방법과 절차",
    description: "실업급여가 거부됐을 때 심사청구와 재심사청구로 불복하는 방법을 안내해요.",
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
          currentSlug="중대귀책사유-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 귀책사유</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        중대 귀책사유 해고, 실업급여 안 될까?<br />
        자격과 이의신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;네 잘못으로 해고된 거니까 실업급여 안 돼.&quot;
      </p>
      <p style={body}>
        회사에서 이런 말을 들으면 그냥 포기하게 되죠.
        그런데 <strong>모든 귀책사유 해고가 실업급여 대상 밖인 건 아니에요</strong>.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제58조</a>가 말하는 &ldquo;중대한 귀책사유&rdquo;는 범위가 꽤 좁아요.
        횡령, 폭행, 기밀 유출 같은 수준이어야 하죠.
      </p>
      <p style={body}>
        업무능력 부족이나 경미한 규칙 위반은 여기에 해당하지 않아요.
        내 해고 사유가 정말 &ldquo;중대한&rdquo; 수준인지, 이의신청은 어떻게 하는지 아래에서 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 중대한 귀책사유란 */}
      <H2>어떤 사유가 자격 제한에 해당하나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제58조</a>에서 실업급여 수급을 제한하는 이직 사유를 정해놨어요.
        여기서 말하는 &ldquo;중대한 귀책사유&rdquo;는 우리가 일상적으로 생각하는 &ldquo;잘못&rdquo;보다 훨씬 범위가 좁죠.
        구체적인 목록은{" "}
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙 별표2</a>에 나와 있어요.
      </p>
      <p style={body}>
        대표적으로 형법 위반 행위(횡령, 배임, 절도 등), 고의로 사업장에 막대한 재산상 손해를 끼친 경우, 정당한 사유 없이 장기간(보통 7일 이상) 무단결근을 한 경우가 해당되죠.
        핵심은 &ldquo;고의성&rdquo;과 &ldquo;중대한 손해&rdquo;예요.
        실수로 일을 못 한 건 여기에 해당하지 않아요.
      </p>
      <p style={body}>
        이 구분이 왜 중요하냐면, 회사가 &ldquo;귀책사유&rdquo;라고 해고해도 고용센터가 보기에 &ldquo;중대한&rdquo; 수준이 아니면 실업급여를 받을 수 있기 때문이에요.
        회사의 판단과 고용센터의 판단은 다를 수 있죠.
        해고됐다고 바로 포기하면 안 되는 이유가 여기에 있어요.
      </p>

      <GreenBox title="중대한 귀책사유 vs 경미한 귀책사유">
        <strong>중대한 귀책사유 (실업급여 제한)</strong><br />
        횡령·배임, 고의 기물파손, 기밀 유출, 7일+ 무단결근, 폭행<br /><br />
        <strong>경미한 귀책사유 (실업급여 가능)</strong><br />
        업무능력 부족, 실적 미달, 경미한 취업규칙 위반, 동료 갈등
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 중대한 귀책사유에 해당하지 않을 가능성이 높아요. 고용센터에서 실업급여 신청을 진행해보세요."
        partialMatchText="일부만 해당돼요. 해고 사유에 따라 달라지니 고용센터(1350)에 사전 상담을 받아보세요."
      />

      <p style={{ ...body, marginTop: 14 }}>
        최종 판단 권한은 고용센터에 있어요.
        회사가 징계해고를 했더라도 그 사유가 시행규칙 별표2에 열거된 항목에 해당하지 않으면 실업급여를 받을 수 있죠.
        반대로 회사가 &ldquo;권고사직&rdquo;이라고 처리했어도 실제로는 형법 위반이 원인이었다면 제한될 수 있고요.
      </p>

      <Divider />

      {/* 섹션 2: 금액 계산 */}
      <H2>자격이 인정되면 금액은 얼마나 나올까요?</H2>
      <p style={body}>
        중대한 귀책사유에 해당하지 않아서 수급이 가능하다면, 금액 계산법은 일반적인 비자발적 퇴사와 동일해요.
        퇴직 전 3개월 평균임금의 60%가 기준이고, 하루 상한 68,100원, 하한 66,048원이 적용되죠.
      </p>
      <p style={body}>
        수급기간은 나이와 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험 가입기간</a>으로 결정돼요.
        50세 이상이면 같은 가입기간이어도 30일을 더 받을 수 있죠.
        다만 귀책사유 해고의 경우 고용센터 심사에 시간이 좀 더 걸릴 수 있어요.
        일반적인 비자발적 퇴사보다 서류 확인을 꼼꼼하게 하거든요.
      </p>

      <SectionBadge>수급 가능하다면 얼마나 받을 수 있는지 계산해보세요</SectionBadge>
      <Calculator
        title="실업급여 예상 수령액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 중대한 귀책사유에 해당하지 않는 경우에만 수급 가능해요. 2026년 기준 상한·하한액 적용."
      />

      <p style={body}>
        계산기 결과를 보면 금액이 적지 않다는 걸 알 수 있어요.
        5년 가입 기준으로도 약 1,200만원이에요.
        &ldquo;귀책사유니까 안 되겠지&rdquo; 하고 넘어가면 이 돈을 그냥 포기하는 거예요.
        일단 고용센터에 가서 물어보는 게 가장 빠른 답이에요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 경미한 귀책사유 상세 + 체크리스트 */}
      <H2>자격 제한 대상이 아닌 경미한 사유</H2>
      <p style={body}>
        실무에서 가장 헷갈리는 영역이에요.
        회사는 &ldquo;너 잘못이야&rdquo;라고 하는데, 고용보험법 기준으로는 중대하지 않은 경우가 많죠.
        업무능력 부족이 대표적이에요.
        실적이 안 나온다고 해고했다면 이건 근로자의 &ldquo;중대한&rdquo; 잘못이라고 보기 어려워요.
      </p>
      <p style={body}>
        동료와의 갈등이나 상사와의 불화로 해고된 경우도 마찬가지예요.
        물리적 폭행이 아닌 이상 중대한 귀책사유로 보기 어렵죠.
        지각, 복장 규정 위반, 사내 절차 미준수 같은 경미한 취업규칙 위반도 실업급여 제한 사유가 아니에요.
      </p>
      <p style={body}>
        영업 비밀이 아닌 일반 정보를 동료에게 공유한 경우, 실수로 물건을 파손한 정도의 경미한 손해, 시용기간(수습기간) 만료 후 본채용 거부도 중대한 귀책사유에 해당하지 않죠.
        이런 상황에서 해고됐다면 실업급여를 신청할 수 있어요.
      </p>

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        해고 사유를 정확히 파악하는 게 첫 번째 할 일이에요.
        해고통지서나 징계서류에 적힌 사유를 고용보험법 시행규칙 별표2와 대조해보세요.
        거기 나와 있지 않은 사유라면 실업급여 수급 가능성이 높아요.
      </p>

      <Divider />

      {/* 섹션 4: 대응 방법 */}
      <H2>자격 제한 결정 후 이의신청 절차</H2>
      <p style={body}>
        고용센터가 중대한 귀책사유에 해당한다고 결정하면 실업급여가 바로 거부돼요.
        하지만 여기서 끝이 아니에요.
        <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>심사청구</a>를 처분을 안 날로부터 <strong>90일 이내</strong>에 고용보험심사관에게 제출할 수 있죠.
      </p>
      <p style={body}>
        심사청구가 기각되면 <strong>30일 이내</strong>에 재심사청구를 고용보험심사위원회에 할 수 있어요.
        여기서도 안 되면 행정소송까지 가능하죠.
        실제로 &ldquo;중대한 귀책사유&rdquo;의 범위를 놓고 다퉈서 뒤집힌 사례가 적지 않아요.
        특히 &ldquo;무단결근 일수&rdquo;나 &ldquo;손해의 중대성&rdquo;에 대한 판단은 사안마다 다를 수 있거든요.
      </p>
      <p style={body}>
        이의신청을 할 때는 해고 당시 정황을 구체적으로 설명하는 게 핵심이에요.
        &ldquo;회사가 교육이나 배치전환 없이 바로 해고했다&rdquo;, &ldquo;손해 금액이 경미했다&rdquo;, &ldquo;고의가 아니라 과실이었다&rdquo; 같은 점을 소명하면 뒤집힐 가능성이 올라가죠.
      </p>

      <BorderBox title="이의신청 시 준비할 서류">
        해고통지서 또는 징계 결정서 사본<br />
        회사의 취업규칙 또는 인사규정 사본<br />
        해고 사유에 대한 본인 의견서 (경위를 구체적으로 작성)<br />
        관련 증거 (이메일, 문자, 동료 진술서 등)
      </BorderBox>

      <Divider />

      {/* 섹션 5: 퇴직금과 해고예고수당 */}
      <H2>이의신청과 함께 퇴직금도 반드시 챙기세요</H2>
      <p style={body}>
        실업급여와 퇴직금은 전혀 다른 제도예요.
        중대한 귀책사유로 실업급여가 안 되더라도 퇴직금은 별도로 받아야 해요.
        1년 이상 근무했다면 퇴직금 지급은 사업주의 의무이고, 이걸 안 주면 근로기준법 위반이죠.
      </p>
      <p style={body}>
        해고예고수당도 따져봐야 해요.
        해고 30일 전에 통보하지 않았다면 30일분의 통상임금을 해고예고수당으로 받을 권리가 있어요.
        다만 근로자가 회사에 중대한 손해를 끼친 경우(근로기준법 시행규칙 별표)에는 이 의무가 면제되니, 이 부분은 따로 확인이 필요하죠.
      </p>
      <p style={body}>
        귀책사유 해고를 당하면 심리적으로 위축되기 쉬워요.
        그래서 받을 수 있는 것도 안 챙기는 분이 많죠.
        실업급여가 안 되더라도 퇴직금, 해고예고수당, 미사용 연차수당은 반드시 청구하세요.
        <a href="/w/임금체불-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금체불</a>이면 고용노동부에 진정을 넣으면 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        귀책사유 해고와 실업급여에 대해 실제로 많이 물어보시는 것만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용보험법 시행규칙을 바탕으로 작성됐어요. 법령은 개정될 수 있으니 중요한 결정 전에 고용24(ei.go.kr)나 고용센터(1350)에서 직접 확인하세요." />
    </ArticleLayout>
  );
}
