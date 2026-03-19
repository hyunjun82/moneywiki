"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "경영상 이유로 해고됐어요 (정리해고)" },
  { id: "c2", label: "고용보험 가입기간 180일 이상이에요" },
  { id: "c3", label: "재취업 의사가 있고 구직활동이 가능해요" },
  { id: "c4", label: "퇴직일 다음 날부터 12개월 이내예요" },
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
  "이직확인서에 '경영상 필요에 의한 해고'로 퇴직 사유가 기재됐는지 확인",
  "고용24(ei.go.kr)에서 피보험자격 이력 조회로 가입기간 180일 충족 여부 확인",
  "정리해고 통보서, 해고예고통지서 등 서면 자료를 반드시 보관",
  "퇴직일 다음 날부터 12개월 이내에 신청해야 하니 기한 체크",
  "관할 고용센터 위치 확인 후 워크넷 구직등록 먼저 진행",
];

const FAQS = [
  {
    q: "정리해고 통보를 받았는데 실업급여를 바로 신청할 수 있나요?",
    a: "퇴직일 이후에 신청할 수 있어요. 해고 통보만 받은 상태에서는 아직 재직 중이니까요. 퇴직 처리가 끝나고 이직확인서가 발급되면 그때 고용센터에 가면 되죠.",
  },
  {
    q: "정리해고인데 사직서를 써달라고 해요. 쓰면 안 되나요?",
    a: "쓰면 자발적 퇴사로 처리될 위험이 있어요. 사직서 대신 해고통지서를 받아야 하죠. 이미 썼더라도 이직확인서 퇴직 사유가 '경영상 해고'로 돼 있으면 실업급여는 받을 수 있지만, 가급적 쓰지 마세요.",
  },
  {
    q: "정리해고 대상자인데 회사가 위로금을 줬어요. 실업급여가 줄어드나요?",
    a: "줄어들지 않아요. 위로금은 실업급여 산정 기준인 평균임금에 포함되지 않죠. 퇴직금, 위로금, 실업급여 세 가지를 다 받는 게 맞아요. 별개의 돈이에요.",
  },
  {
    q: "정리해고 후 프리랜서로 일하면 실업급여가 끊기나요?",
    a: "사업자등록을 하면 취업한 것으로 간주돼서 구직급여가 중단될 수 있어요. 일시적인 소득은 괜찮지만, 사업자등록 전에 고용센터에 먼저 상담하는 게 안전하죠.",
  },
  {
    q: "부당해고인 것 같은데, 구제신청하면서 실업급여도 받을 수 있나요?",
    a: "동시에 진행할 수 있어요. 부당해고 구제신청은 노동위원회에, 실업급여는 고용센터에 각각 신청하면 되죠. 복직이 결정되면 그때 실업급여를 반환하게 되지만, 심사 중에는 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제24조: 경영상 이유에 의한 해고의 제한", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용보험법 제58조: 이직 사유에 따른 수급자격의 제한", url: "https://www.law.go.kr/법령/고용보험법" },
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
    slug: "권고사직-실업급여-신청-방법",
    title: "권고사직 실업급여 신청 방법과 조건",
    description: "권고사직은 비자발적 퇴사로 인정돼요. 정리해고와 마찬가지로 실업급여 대상이에요.",
  },
  {
    slug: "부당해고-구제신청-실업급여",
    title: "부당해고 구제신청과 실업급여 동시 진행",
    description: "부당해고 구제신청 중에도 실업급여를 받을 수 있어요. 복직하면 반환하지만 심사 중에는 가능하죠.",
  },
  {
    slug: "희망퇴직-실업급여",
    title: "희망퇴직 실업급여 수급 가능 여부",
    description: "희망퇴직도 조건에 따라 비자발적 퇴사로 인정돼요. 위로금과 실업급여를 동시에 받을 수 있죠.",
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
          currentSlug="정리해고-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 정리해고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        정리해고 당했다면?<br />
        실업급여 금액과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;구조조정 대상이라는 통보를 받았어요. 실업급여는 받을 수 있나요?&quot;<br />
        받을 수 있죠. <strong>정리해고는 대표적인 비자발적 퇴사</strong>니까요.<br /><br />
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제24조</a>에서 정한 경영상 해고에 해당하고,
        <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험 가입기간</a> 180일만 넘으면 월급의 60%를 최대 270일까지 받을 수 있죠.
        얼마를 받는지, 어떤 순서로 신청하는지 바로 정리해 드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 정리해고와 실업급여 */}
      <H2>정리해고면 실업급여 금액은 얼마나 받나요?</H2>
      <p style={body}>
        정리해고는 비자발적 퇴사니까 실업급여 수급 자격이 바로 생겨요. 금액은 퇴직 전 3개월 평균임금의 <strong>60%</strong>를 기준으로 산정하죠. 2026년 기준 1일 상한액은 <strong>68,100원</strong>, 하한액은 <strong>66,048원</strong>이에요. 월급이 220만 원이든 500만 원이든 하루 수급액은 이 범위 안에서 정해져요.
      </p>
      <p style={body}>
        진짜 차이가 나는 건 수급기간이에요. 나이와 고용보험 가입기간에 따라 <strong>120일부터 270일</strong>까지 달라지죠. 50세 이상이면 같은 가입기간이어도 30일을 더 받아요. 10년 이상 근무하고 50세 이후에 정리해고됐다면 최대 270일, 약 1,838만 원까지 수령할 수 있죠.
      </p>
      <p style={body}>
        퇴직금과 실업급여는 별개예요. 정리해고되면 퇴직금은 당연히 받고, 실업급여도 따로 받죠. 회사에서 위로금을 줬다고 해서 실업급여가 줄어드는 것도 아니에요. 위로금, 퇴직금, 실업급여 세 가지를 전부 챙기는 게 맞아요.
      </p>

      <GreenBox>
        평균임금의 60% 기준 → 1일 상한 68,100원 / 하한 66,048원<br />
        수급기간: 나이 + 가입기간에 따라 120~270일<br />
        위로금·퇴직금과 별개: 세 가지 모두 수령 가능
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 정리해고로 인한 실업급여 수급 자격을 갖췄어요. 관할 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <p style={{ ...body, marginTop: 14 }}>
        아래 계산기에서 본인의 월급, 나이, 가입기간을 입력하면 예상 수령액을 바로 볼 수 있죠. 숫자를 직접 확인하면 &ldquo;생각보다 많네&rdquo; 싶을 거예요.
      </p>

      <Divider />

      {/* 섹션 2: 금액 계산 */}
      <H2>신청 절차에서 가장 먼저 해야 할 건 뭔가요?</H2>
      <p style={body}>
        정리해고 통보를 받으면 <strong>해고통지서부터 받으세요</strong>. 회사가 &ldquo;사직서를 써달라&rdquo;고 하는 경우가 많은데, 절대 쓰면 안 돼요. 사직서를 쓰면 자발적 퇴사로 처리될 위험이 있고, 그러면 실업급여 수급이 복잡해지죠. 해고통지서를 받고, 이직확인서에 퇴직 사유가 &ldquo;경영상 필요에 의한 해고&rdquo;로 기재되는지 반드시 확인해야 해요.
      </p>
      <p style={body}>
        그다음은 <a href="https://www.worknet.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>워크넷</a>에 구직등록을 하는 거예요. 온라인으로 5분이면 끝나요. 구직등록 없이 고용센터에 가면 다시 오라고 하니까 미리 해두세요. 구직등록이 끝나면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 신청자 온라인 교육(약 1시간)을 수료하면 되죠.
      </p>

      <SectionBadge>내 나이와 가입기간으로 계산해보세요</SectionBadge>
      <Calculator
        title="정리해고 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있죠."
      />

      <p style={body}>
        해고예고를 30일 전에 받지 못했다면 <strong>해고예고수당</strong>(30일분 통상임금)도 청구할 수 있죠. 이건 실업급여와 별개의 돈이니까 꼭 챙기세요. 정리해고 통보서, 해고예고통지서 등 서면 자료는 반드시 보관해두세요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 정리해고 요건과 체크리스트 */}
      <H2>실업급여 신청 절차 4단계 순서</H2>
      <p style={body}>
        <strong>1단계: 워크넷 구직등록</strong>이에요. 온라인으로 5분이면 끝나죠. 이걸 먼저 해두지 않으면 고용센터 방문 시 돌려보내요. <strong>2단계: 수급자격 신청자 온라인 교육</strong>을 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 이수하세요. 약 1시간짜리 영상인데, 수료해야 다음 단계로 넘어갈 수 있죠.
      </p>
      <p style={body}>
        <strong>3단계: 관할 고용센터 방문</strong>이에요. 신분증, 통장 사본을 가져가면 되고, 이직확인서는 회사가 고용센터에 직접 제출하는 거라 본인이 갖고 갈 필요 없어요. 담당자가 이직확인서에 기재된 퇴직 사유를 확인하고, 수급자격 인정 여부를 심사하죠.
      </p>
      <p style={body}>
        <strong>4단계: 실업인정(구직활동 보고)</strong>이에요. 수급자격이 인정되면 1~4주마다 고용센터에 출석해서 구직활동 내역을 보고하고, 확인되면 입금돼요. 첫 입금까지 약 3~4주 걸리죠. 퇴직일 다음 날부터 <strong>12개월 이내</strong>에 신청해야 하니까 미루지 마세요.
      </p>

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        이직확인서 퇴직 사유가 &ldquo;경영상 필요에 의한 해고&rdquo;로 기재돼 있는지 꼭 확인해야 해요. 회사가 &ldquo;자진퇴직&rdquo;으로 잘못 적는 경우가 있는데, 이러면 고용센터에서 추가 심사가 필요해져서 시간이 늘어나죠. 해고통지서, 정리해고 공문 등 서면 자료를 보관해두면 정정 요청할 때 유리해요.
      </p>

      <Divider />

      {/* 섹션 4: 신청 절차 */}
      <H2>금액 산정 기준과 수급기간 계산법</H2>
      <p style={body}>
        실업급여 금액은 퇴직 전 3개월간 받은 임금을 기준으로 &ldquo;평균임금&rdquo;을 산출하고, 여기에 <strong>60%</strong>를 곱해서 1일 수급액을 정해요. 기본급뿐 아니라 고정적으로 지급된 수당, 상여금도 포함되죠. 다만 1일 상한액(68,100원)과 하한액(66,048원)이 있어서 대부분의 근로자는 이 범위 안에 들어가요.
      </p>
      <p style={body}>
        수급기간(소정급여일수)은 나이와 고용보험 가입기간으로 결정돼요. 50세 미만이면 가입기간 10년 이상일 때 <strong>240일</strong>, 50세 이상이면 <strong>270일</strong>이 최대치죠. 정리해고 대상자는 대부분 오래 근무한 분이라 가입기간이 긴 편이에요. 최대 270일 x 68,100원 = 약 <strong>1,838만 원</strong>까지 나오죠.
      </p>
      <p style={body}>
        한 가지 더 챙길 게 있죠. 해고예고를 30일 전에 받지 못했다면 <strong>해고예고수당</strong>(30일분 통상임금)을 별도로 청구할 수 있죠. 이건 회사가 지급해야 하는 돈이고, 실업급여와는 완전히 별개예요. 빠뜨리는 분이 많으니까 꼭 챙기세요.
      </p>

      <BorderBox>
        1일 수급액 = 평균임금의 60% (상한 68,100원 / 하한 66,048원)<br />
        50세 미만 / 가입 10년 이상 → 240일<br />
        50세 이상 / 가입 10년 이상 → 270일 (최대)<br />
        해고예고수당(30일분)도 별도로 청구 가능
      </BorderBox>

      <Divider />

      {/* 섹션 5: 주의사항 */}
      <H2>절차 중 거부당하면 이의신청부터 하세요</H2>
      <p style={body}>
        정리해고는 비자발적 퇴사가 확실한데도 거부되는 경우가 있죠. 대부분 서류 문제죠. <a href="/w/실업급여-이직확인서-거부" style={{ color: "#1D9E75", textDecoration: "underline" }}>이직확인서</a>에 퇴직 사유가 &ldquo;자진퇴직&rdquo;으로 잘못 기재된 경우가 가장 흔하죠. 사직서를 쓰라는 말에 응했거나, 회사가 고용센터에 잘못 신고한 거죠.
      </p>
      <p style={body}>
        이럴 때는 고용센터에 이직확인서 정정을 요청하세요. 회사가 거부하더라도 고용센터가 직권으로 조사할 수 있거든요. 해고통지서, 정리해고 공문, 문자나 이메일 등 증거가 있으면 훨씬 수월하죠. 구두로만 통보받았다면 녹취록이라도 있는 게 좋아요.
      </p>
      <p style={body}>
        정정 요청으로도 안 되면 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>심사청구</a>(90일 이내)와 <strong>재심사청구(30일 이내)</strong>를 순서대로 할 수 있죠. 정리해고인데 수급이 안 되면 수백만 원에서 최대 1,800만 원 넘는 돈을 놓치는 거예요. 한 번 거절당했다고 포기하지 마세요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제24조</a>의 정리해고 요건을 회사가 어긴 정황이 보인다면, 부당해고 구제신청(노동위원회, 해고일로부터 3개월 이내)도 동시에 진행할 수 있죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        정리해고와 실업급여에 대해 실제로 많이 물어보시는 것만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 근로기준법을 바탕으로 작성됐어요. 법령은 개정될 수 있으니 중요한 결정 전에 고용24(ei.go.kr)나 고용센터(1350)에서 직접 확인하세요." />
    </ArticleLayout>
  );
}
