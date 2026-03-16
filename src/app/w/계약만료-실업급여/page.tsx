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
        &ldquo;계약 끝났으니 다음 달부터 안 나와도 돼요.&rdquo;
      </p>
      <p style={body}>
        이 말을 듣는 순간 머릿속이 복잡해지죠. 당장 다음 달 생활비는 어떻게 하나, 실업급여라도 받을 수 있나.
        받을 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은
        계약기간 만료를 비자발적 이직으로 분류하고 있거든요. 내가 나가고 싶어서 나간 게 아니니까요.
      </p>
      <p style={body}>
        1일 상한액 68,100원, 하한액 66,048원(2026년 기준)이에요. 가입기간에 따라 120일에서 최대 270일까지 받을 수 있죠.
        갱신을 거부당한 경우, 이직확인서 확인법, 수급기간 계산법까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 수급 조건 */}
      <H2>수급 조건을 갖추려면 뭐가 필요한가요?</H2>
      <p style={body}>
        네 가지를 봐요. 첫째, 계약기간 만료로 퇴직해야 하죠. 둘째, 퇴직 전 18개월 이내에 <strong>고용보험 가입기간 180일 이상</strong>이 필요해요. 셋째, 재취업 의사와 능력이 있어야 하고요. 넷째, 퇴직 후 12개월 이내에 신청해야 돼요.
      </p>
      <p style={body}>
        1년짜리 계약직이었다면 고용보험 180일은 자연스럽게 넘기니까 크게 걱정할 건 없어요. 문제가 되는 경우는 6개월 이하 단기 계약을 반복한 사람인데, 이때도 여러 직장의 가입기간이 합산되니까 합쳐서 180일 넘으면 돼요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은 계약기간 만료를 비자발적 이직으로 보고 있어요. 내가 그만두겠다고 한 게 아니라, 계약이 끝난 거니까요. 권고사직이나 정리해고와 같은 카테고리에 들어가죠. 그래서 수급 자격 심사에서 퇴직 사유 때문에 걸릴 일은 거의 없어요.
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
        &ldquo;회사에서 연장하자고 했는데 제가 거절했어요. 이래도 실업급여 받을 수 있나요?&rdquo; 이 질문이 정말 많아요.
        결론부터 말하면, 갱신 제안의 조건이 이전과 <strong>같았는지 나빠졌는지</strong>에 따라 달라져요.
      </p>
      <p style={body}>
        회사가 동일한 조건으로 연장을 제안했는데 본인이 거절했다면, 자발적 퇴사로 볼 수 있죠. 반면 임금을 깎거나, 근무지를 먼 곳으로 바꾸거나, 근로시간을 크게 줄이는 조건이었다면 이야기가 달라져요. 나빠진 조건을 수용하라고 강제할 수는 없으니까, 거절해도 비자발적 퇴사로 인정돼요.
      </p>
      <p style={body}>
        실무에서 자주 벌어지는 상황 하나 더 알려드릴게요. 회사가 구두로만 &ldquo;연장할 수 있었는데 네가 안 했잖아&rdquo;라고 주장하는 경우예요. 이때 서면 제안서가 없으면 회사 주장이 받아들여지기 어렵죠. 갱신 제안을 받았으면 반드시 문서나 메일로 남겨달라고 요청하세요. 그래야 고용센터 심사에서 유리해요.
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
        실업급여를 좌우하는 서류가 딱 하나 있어요. <strong>이직확인서</strong>예요. 퇴직하면 회사가 이 서류를 작성해서 고용센터에 제출하는데, 여기 적힌 퇴직 사유가 &ldquo;계약기간 만료&rdquo;여야 비자발적 이직으로 인정받죠.
      </p>
      <p style={body}>
        그런데 간혹 회사가 퇴직 사유를 &ldquo;자진퇴사&rdquo;로 잘못 적는 경우가 있어요. 계약이 끝난 건데 자기가 그만둔 것처럼 처리하는 거예요. 이러면 고용센터에서 수급 자격을 거부할 수 있으니까, 퇴직 직후 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 이직확인서 처리 내역부터 조회하세요.
      </p>
      <p style={body}>
        사유가 잘못 적혀 있다면 회사에 <a href="/w/실업급여-이직확인서-거부" style={{ color: "#1D9E75", textDecoration: "underline" }}>정정 요청</a>을 먼저 해요. 회사가 응하지 않으면 고용센터(1350)에 신고하면 되죠. 이때 근로계약서 사본, 계약 종료 통보 문자, 이메일 같은 증빙이 있으면 정정이 훨씬 빨라요. 퇴직 전에 이런 자료를 챙겨두는 게 실업급여 수급의 첫 번째 관문이에요.
      </p>

      <SectionBadge>퇴직 전 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 수급기간과 금액 */}
      <H2>계산법에 따른 수급기간과 금액</H2>
      <p style={body}>
        얼마나 오래, 얼마를 받는지가 가장 궁금하죠. 수급기간은 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험 가입기간</a>과 <strong>퇴직 시 나이</strong> 두 가지로 결정돼요. 가입기간이 길수록, 나이가 50세 이상이면 더 오래 받을 수 있죠. 아래 표를 보면 바로 내 상황이 어디에 해당하는지 파악이 되실 거예요.
      </p>
      <p style={body}>
        금액은 퇴직 전 3개월 평균임금의 60%예요. 다만 상한과 하한이 정해져 있어서, 2026년 기준으로 1일 최대 68,100원, 최소 66,048원이에요. 월로 환산하면 대략 198만~204만원 사이가 되죠. 계약직이라고 해서 금액이 다르진 않아요. 일반 정규직과 동일한 계산 방식이에요.
      </p>
      <p style={body}>
        같은 회사에서 1년 계약을 3번 반복했다면 가입기간은 3년이에요. 회사가 달라도 고용보험 가입기간은 합산되니까, 여러 곳에서 계약직으로 일했어도 합쳐서 계산하면 수급기간이 늘어나죠. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 본인의 피보험 이력을 미리 조회해보세요.
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
        &ldquo;실업급여 받으면 퇴직금은 못 받나요?&rdquo; 아니에요, 둘은 완전히 별개예요. 실업급여는 고용보험 기금에서, 퇴직금은 회사 재원에서 나오거든요. 1년 이상 근속했다면 퇴직금 대상이고, 회사가 퇴직일로부터 14일 안에 안 주면 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에 따라 연 20% 지연이자를 청구할 수 있죠.
      </p>
      <p style={body}>
        하나 더요. 실업급여를 받는 중에 새 일자리를 구하면 <a href="/w/실업급여-취업촉진수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>이 나와요. 수급일수가 절반 이상 남은 상태에서 12개월 이상 고용이 확정된 곳에 취업하면, 남은 금액의 절반을 한꺼번에 받는 거예요. 다음 계약직이라도 적용되니까 빠른 재취업이 오히려 유리할 수 있어요.
      </p>
      <p style={body}>
        신규 직장에서 고용보험에 다시 가입되면 피보험기간이 새로 쌓여요. 다음 계약이 끝날 때 또 실업급여 대상이 될 수 있는 거죠. 한 가지 꼭 기억할 점 — 실업급여 신청 기한은 퇴직 후 <strong>12개월</strong>이에요. &ldquo;나중에 해야지&rdquo; 하다가 기한을 넘기면 수급 자격 자체가 소멸돼요. 빠르게 움직이세요.
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
