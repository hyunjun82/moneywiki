"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "계약기간 만료로 퇴직했어요 (갱신 거부 포함)" },
  { id: "c2", label: "퇴직 전 18개월 이내 고용보험 180일 이상 가입했어요" },
  { id: "c3", label: "갱신 거부 시 근로조건이 이전보다 나빠졌어요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능해요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 35, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 2, format: (v: number) => `${v}년` },
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
  "이직확인서에 퇴직 사유가 '계약기간 만료'로 기재됐는지 확인",
  "고용24(ei.go.kr)에서 피보험기간 180일 이상인지 조회",
  "갱신 거부 시 근로조건 변경 증빙자료 확보 (급여명세서, 근로계약서)",
  "퇴직 후 12개월 이내에 수급자격 신청 (기한 초과 시 자격 소멸)",
  "수급자격 신청자 온라인 교육 이수 (고용24에서 가능)",
];

const FAQS = [
  {
    q: "계약만료되면 무조건 실업급여를 받을 수 있나요?",
    a: "기본 조건을 충족해야 해요. 퇴직 전 18개월 이내에 고용보험 가입기간 180일 이상이어야 하고, 재취업 의사와 능력이 필요하죠. 1년 이상 계약직이었다면 대부분 충족돼요.",
  },
  {
    q: "회사가 갱신을 제안했는데 거절하면 실업급여를 못 받나요?",
    a: "꼭 그렇진 않아요. 갱신 제안의 근로조건이 이전보다 나빠졌다면 거절해도 비자발적 퇴사로 인정돼요. 임금 삭감, 근무지 변경, 근로시간 변경 등이 해당되죠.",
  },
  {
    q: "이직확인서에 '자진퇴사'로 적혀 있으면 어떻게 하나요?",
    a: "고용센터에 정정을 요청하면 돼요. 계약서 사본이나 계약 종료 통보서를 증빙자료로 첨부하세요. 회사가 정정에 응하지 않으면 고용센터(1350)에 신고할 수 있어요.",
  },
  {
    q: "반복 계약직인데 가입기간은 어떻게 계산되나요?",
    a: "같은 회사에서 1년씩 3번 계약했다면 총 3년으로 계산돼요. 수급기간도 3년 기준으로 산정되니 더 오래 받을 수 있죠. 회사가 달라도 고용보험 가입기간은 합산돼요.",
  },
  {
    q: "계약만료 후 퇴직금도 같이 받을 수 있나요?",
    a: "네, 둘 다 받을 수 있죠. 실업급여와 퇴직금은 완전히 별개 제도예요. 1년 이상 근무했으면 퇴직금 대상이고, 회사가 14일 이내에 지급하지 않으면 연 20% 지연이자를 청구할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 비자발적 이직 사유 (계약기간 만료 포함)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 — 수급자격 인정 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 계약직 근로자 권리 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기간제-실업급여",
    title: "기간제 근로자 실업급여 수급 조건",
    description: "기간제 계약이 끝나면 실업급여를 받을 수 있는 조건을 정리했어요.",
  },
  {
    slug: "실업급여-수급기간-몇개월-받나요",
    title: "실업급여 수급기간, 최대 몇 개월 받나요?",
    description: "가입기간과 나이에 따라 수급기간이 달라지는 기준을 정리했어요.",
  },
  {
    slug: "실업급여-조기재취업수당",
    title: "조기재취업수당 조건과 금액",
    description: "실업급여 받다가 빨리 취업하면 남은 금액의 일부를 돌려받을 수 있죠.",
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
          currentSlug="계약만료-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 계약직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약만료 실업급여, 갱신 거부당하면?<br />
        수급 조건과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;1년 계약직인데 다음 달이면 계약이 끝나요. 연장도 안 해준대요.&rdquo;<br />
        이런 상황이라면 실업급여를 받을 수 있죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서
        계약기간 만료를 비자발적 이직으로 보고 있으니까요.<br /><br />
        1년 계약 기준으로 최소 120일(약 4개월), 가입기간이 길면 최대 270일(약 9개월)까지 받을 수 있어요.
        2026년 기준 1일 상한액은 68,100원이고, 하한액은 66,048원이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 계약만료가 비자발적 퇴사인 이유 */}
      <H2>수급 조건을 갖추려면 뭐가 필요한가요?</H2>
      <p style={body}>
        계약직은 처음부터 기간이 정해져 있죠. 1년 계약이면 1년이 지나면 끝나요. 이건 근로자가 선택한 게 아니에요. 계약 조건 자체가 그렇게 설정된 것이기 때문에, <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는 이를 <strong>비자발적 이직</strong>으로 분류하고 있죠.
      </p>
      <p style={body}>
        회사가 갱신을 하지 않겠다고 통보하면 근로자는 나갈 수밖에 없어요. 본인 의지와 상관없이 퇴직하게 되는 거예요. 그래서 권고사직이나 정리해고와 마찬가지로 실업급여 수급 대상에 포함되죠. 회사 측에서 &ldquo;계약이 끝났으니 나가라&rdquo;고 한 셈이니까요.
      </p>
      <p style={body}>
        다만 기본적인 수급 조건은 충족해야 해요. 퇴직 전 18개월 이내에 <strong>고용보험 가입기간 180일 이상</strong>이어야 하고, 재취업 의사와 능력이 필요하죠. 1년 계약직이라면 고용보험 180일은 대부분 넘기 때문에 크게 걱정할 필요는 없어요.
      </p>

      <GreenBox title="계약만료 실업급여 기본 조건">
        계약기간 만료로 퇴직 (비자발적 이직)<br />
        퇴직 전 18개월 이내 고용보험 180일 이상 가입<br />
        재취업 의사와 능력 보유<br />
        퇴직 후 12개월 이내 신청
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 계약만료 실업급여 수급 자격을 갖췄어요. 관할 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2 — 갱신 거부 시 주의사항 + 계산기 */}
      <H2>갱신 거부당하면 수급 조건이 달라지나요?</H2>
      <p style={body}>
        여기가 좀 복잡한 부분이에요. 회사가 <strong>동일한 조건으로 갱신을 제안</strong>했는데 내가 거절한 경우에는 자발적 퇴사로 볼 수 있죠. 회사는 계속 일하라고 했는데 본인이 안 하겠다고 한 거니까요. 이 경우 실업급여 수급이 어려워질 수 있어요.
      </p>
      <p style={body}>
        그런데 근로조건이 이전보다 <strong>나빠진 경우</strong>라면 달라지죠. 임금이 삭감되거나, 근무지가 멀어지거나, 근로시간이 크게 바뀌는 조건이었다면 거절해도 비자발적 퇴사로 인정돼요. 나빠진 조건을 받아들이라고 강요할 수는 없으니까요.
      </p>
      <p style={body}>
        핵심은 <strong>&ldquo;갱신 조건이 이전과 같았는지, 달랐는지&rdquo;</strong>예요. 같은 조건인데 거절하면 자발적 퇴사, 나빠진 조건이면 비자발적 퇴사로 판단돼요. 갱신 제안서나 근로계약서를 반드시 보관해두세요. 나중에 고용센터에서 증빙자료로 요구할 수 있으니까요.
      </p>

      <BorderBox title="갱신 거부 시 판단 기준">
        동일 조건으로 갱신 제안 + 본인 거절 → <strong>자발적 퇴사</strong> (실업급여 어려움)<br />
        나빠진 조건으로 갱신 제안 + 본인 거절 → <strong>비자발적 퇴사</strong> (실업급여 가능)<br />
        회사가 갱신 안 함 → <strong>비자발적 퇴사</strong> (실업급여 가능)
      </BorderBox>

      <SectionBadge>내 가입기간과 나이로 수급액을 계산해보세요</SectionBadge>
      <Calculator
        title="계약만료 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 이직확인서 확인 */}
      <H2>이직확인서 수급 조건 확인법</H2>
      <p style={body}>
        퇴직하면 회사에서 <strong>이직확인서</strong>를 작성해서 고용센터로 제출해요. 이 서류에 적힌 퇴직 사유가 실업급여 수급 여부를 결정하죠. &ldquo;계약기간 만료&rdquo;로 되어 있어야 비자발적 퇴사로 인정받을 수 있어요.
      </p>
      <p style={body}>
        문제는 일부 회사에서 &ldquo;자진퇴사&rdquo;로 기재하는 경우가 있다는 점이죠. 계약이 끝났는데도 퇴직 사유를 잘못 적는 거예요. 이러면 고용센터에서 자발적 퇴사로 판단할 수 있기 때문에 반드시 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 이직확인서 처리 내역을 조회해야 해요.
      </p>
      <p style={body}>
        잘못 기재된 경우에는 회사에 정정을 요청하거나, 고용센터(1350)에 신고하면 돼요. 계약서 사본, 계약 종료 통보 문자, 이메일 등이 증빙자료가 되죠. 퇴직 전에 미리 이런 서류를 확보해두는 게 중요해요.
      </p>

      <SectionBadge>퇴직 전 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 신청 절차 */}
      <H2>계산법에 따른 수급기간과 금액</H2>
      <p style={body}>
        계약만료 후 실업급여를 신청하려면 먼저 회사에서 이직확인서를 고용센터로 보내야 해요. 퇴직일로부터 10일 이내에 제출하도록 되어 있죠. 이직확인서가 접수되면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 신청자 온라인 교육을 이수해야 해요.
      </p>
      <p style={body}>
        교육을 마치면 관할 고용센터에 방문해서 수급자격 인정을 신청하세요. 1~4주 대기기간이 지나면 첫 실업인정을 받게 되고, 이후 2~4주 간격으로 실업인정을 받으면 급여가 지급되죠. 첫 지급은 보통 신청 후 1~2주 뒤에 시작돼요.
      </p>
      <p style={body}>
        수급기간은 고용보험 가입기간과 나이에 따라 달라져요. 1년 미만이면 120일, 1~3년이면 150일(50세 미만) 또는 180일(50세 이상)이에요. 같은 회사에서 계약을 반복해서 총 3년 일했다면 가입기간 3년으로 계산되니 더 오래 받을 수 있죠.
      </p>

      <GreenBox title="수급기간 (50세 미만 / 50세 이상)">
        1년 미만: 120일 / 120일<br />
        1~3년: 150일 / 180일<br />
        3~5년: 180일 / 210일<br />
        5~10년: 210일 / 240일<br />
        10년 이상: 240일 / 270일
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 퇴직금·조기재취업수당 */}
      <H2>퇴직금과 조기재취업수당 함께 챙기세요</H2>
      <p style={body}>
        계약만료로 퇴직해도 <strong>퇴직금</strong>은 별도로 받을 수 있죠. 1년 이상 근무했으면 퇴직금 대상이에요. 실업급여와 퇴직금은 완전히 별개의 제도이기 때문에 둘 다 받을 수 있어요. 회사가 14일 이내에 지급하지 않으면 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에 따라 연 20%의 지연이자를 청구할 수 있죠.
      </p>
      <p style={body}>
        실업급여를 받다가 새 일자리를 구하면 <strong>조기재취업수당</strong>도 받을 수 있어요. 수급일수가 절반 이상 남은 상태에서 재취업하면 남은 금액의 절반을 일시금으로 지급해요. 다음 계약직으로 취업하는 경우에도 적용되니까 빠른 재취업이 오히려 유리할 수 있죠.
      </p>
      <p style={body}>
        새 직장에서 다시 고용보험에 가입되면 피보험기간이 다시 쌓이기 시작해요. 다음 계약만료 때 또 실업급여 대상이 될 수 있는 거예요. 중요한 건 실업급여 신청 기한이 퇴직 후 <strong>12개월</strong>이라는 점이에요. 너무 오래 미루면 수급 자격 자체가 사라지니 가능한 빨리 신청하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계약만료와 실업급여에 대해 실제로 많이 궁금해하는 내용만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 상황에 따라 수급 여부가 달라질 수 있으니, 고용센터(1350) 상담을 받아보세요." />
    </ArticleLayout>
  );
}
