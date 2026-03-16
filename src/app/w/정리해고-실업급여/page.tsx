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
      { label: "근로기준법 제24조 — 경영상 이유에 의한 해고의 제한", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용보험법 제58조 — 이직 사유에 따른 수급자격의 제한", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 안내", url: "https://www.ei.go.kr" },
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
        회사가 경영난이라 구조조정을 한다고 해요.<br />
        어느 날 갑자기 정리해고 통보를 받으면 머릿속이 하얘지죠.<br /><br />
        다행히 <strong>정리해고는 실업급여 대상</strong>이에요. 본인 잘못이 아니라 회사 사정으로 나온 거니까요.<br />
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제24조</a>에서 정한 경영상 해고는 대표적인 비자발적 퇴사예요.
        고용보험 가입기간 180일만 넘으면 월급의 60%를 최대 270일까지 받을 수 있죠.<br />
        다만 12개월 안에 신청해야 하고, 서류 하나 잘못되면 거절당할 수도 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 정리해고와 실업급여 */}
      <H2>정리해고면 실업급여 금액은 얼마나 받나요?</H2>
      <p style={body}>
        정리해고는 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제24조</a>에 따라 &ldquo;경영상 이유에 의한 해고&rdquo;로 분류돼요. 쉽게 말해 회사가 돈이 없어서, 구조조정을 해야 해서, 기술 변화로 인력이 줄어야 해서 내보내는 거예요. 근로자 본인의 의사와 상관없이 퇴직하는 거니까 비자발적 퇴사에 해당하죠.
      </p>
      <p style={body}>
        비자발적 퇴사라는 건 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제58조</a>에서 정한 실업급여의 가장 중요한 조건을 자동으로 충족한다는 뜻이에요. 권고사직이나 계약만료와 마찬가지로, 정리해고를 당하면 실업급여를 받을 수 있는 자격이 바로 생기죠. 문제는 나머지 조건인 고용보험 가입기간이나 신청 기한을 놓치는 경우가 꽤 있다는 거예요.
      </p>
      <p style={body}>
        정리해고가 적법한 해고인지 부당해고인지는 실업급여와 별개의 문제예요. 회사가 정리해고 요건(해고 회피 노력, 합리적 기준, 근로자 대표와 50일 전 협의 등)을 지키지 않았더라도 실업급여는 받을 수 있어요. 부당해고 구제신청은 따로 노동위원회에 하면 되죠.
      </p>

      <GreenBox title="정리해고 실업급여 핵심 정리">
        정리해고 = 비자발적 퇴사 → 실업급여 대상<br />
        고용보험 180일 이상 + 퇴직 후 12개월 이내 신청<br />
        부당해고 여부와 실업급여는 별개 (동시 진행 가능)
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 정리해고로 인한 실업급여 수급 자격을 갖췄어요. 관할 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <p style={{ ...body, marginTop: 14 }}>
        정리해고 통보를 받았다면 가장 먼저 할 일은 해고통지서를 받는 거예요. 사직서를 쓰라고 하더라도 절대 쓰면 안 돼요. 사직서를 쓰면 자발적 퇴사로 처리될 수 있고, 그러면 실업급여 수급이 복잡해지죠. 해고통지서를 받고, 이직확인서에 퇴직 사유가 &ldquo;경영상 필요에 의한 해고&rdquo;로 기재되는지 반드시 확인해야 해요.
      </p>

      <Divider />

      {/* 섹션 2 — 금액 계산 */}
      <H2>신청 절차에서 가장 먼저 해야 할 건 뭔가요?</H2>
      <p style={body}>
        실업급여 금액은 퇴직 전 3개월 평균임금의 60%를 기준으로 해요. 여기에 1일 상한액(68,100원)과 하한액(66,048원)이 적용되죠. 대부분의 근로자는 이 범위 안에 들어가요. 월급이 220만원이든 500만원이든 하루에 받는 금액은 크게 다르지 않다는 뜻이에요.
      </p>
      <p style={body}>
        진짜 차이가 나는 건 수급기간이에요. 나이와 고용보험 가입기간에 따라 120일부터 270일까지 달라지죠. 50세 이상이면 같은 가입기간이어도 30일을 더 받아요. 10년 이상 근무하고 50세 이후에 정리해고됐다면 최대 270일, 약 1,838만원까지 받을 수 있어요.
      </p>

      <SectionBadge>내 나이와 가입기간으로 계산해보세요</SectionBadge>
      <Calculator
        title="정리해고 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있죠."
      />

      <p style={body}>
        퇴직금과 실업급여는 별개예요. 정리해고되면 퇴직금도 당연히 받고, 실업급여도 따로 받아요. 회사에서 위로금을 준다고 해서 실업급여가 줄어드는 것도 아니에요. 위로금, 퇴직금, 실업급여 세 가지를 다 챙기는 게 맞아요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 정리해고 요건과 체크리스트 */}
      <H2>실업급여 신청 절차 4단계 순서</H2>
      <p style={body}>
        정리해고는 아무 때나 할 수 있는 게 아니에요. 근로기준법 제24조가 정한 4가지 요건을 모두 충족해야 적법한 정리해고가 돼요. 이걸 몰라서 부당해고인 줄도 모르고 넘어가는 분들이 많죠.
      </p>
      <p style={body}>
        첫째, 긴박한 경영상 필요가 있어야 해요. 단순히 이익이 줄었다 정도가 아니라 사업 계속이 어려울 정도의 경영 위기여야 하죠. 둘째, 해고를 피하기 위한 노력을 충분히 해야 해요. 신규 채용 중단, 배치전환, 근로시간 단축, 일시 휴직 같은 조치를 먼저 시도했는지가 중요해요.
      </p>
      <p style={body}>
        셋째, 대상자 선정 기준이 합리적이고 공정해야 해요. 특정인을 골라서 내보내면 안 되고, 근무성적이나 근속연수 등 객관적 기준이 있어야 하죠. 넷째, 해고일 50일 전까지 근로자 대표에게 통보하고 성실히 협의해야 해요. 이 중 하나라도 빠지면 부당해고로 다툴 수 있어요.
      </p>

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        이 4가지 요건을 회사가 지키지 않았다면 부당해고 구제신청을 할 수 있어요. 구제신청은 해고일로부터 3개월 이내에 관할 노동위원회에 하면 되죠. 실업급여 신청과 동시에 진행할 수 있으니, 부당하다 싶으면 둘 다 하세요.
      </p>

      <Divider />

      {/* 섹션 4 — 신청 절차 */}
      <H2>금액 산정 기준과 수급기간 계산법</H2>
      <p style={body}>
        퇴직하고 나면 정신이 없죠. 그래도 순서만 따라가면 어렵지 않아요. 첫 번째로 <a href="https://www.worknet.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>워크넷</a>에 구직등록을 해요. 온라인으로 5분이면 끝나요. 구직등록 없이 고용센터에 가면 다시 오라고 하니까 미리 해두세요.
      </p>
      <p style={body}>
        두 번째로 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 신청자 온라인 교육을 들어요. 약 1시간짜리 영상인데, 이걸 수료해야 다음 단계로 넘어가요. 세 번째로 관할 고용센터에 방문해서 수급자격 인정 신청을 해요. 신분증, 통장 사본, 이직확인서(회사가 고용센터에 제출)가 필요하죠.
      </p>
      <p style={body}>
        네 번째로 고용센터에서 수급자격 인정 여부를 결정해요. 보통 2주 안에 나오죠. 인정되면 1~4주마다 고용센터에 출석해서 구직활동을 보고(실업인정)하고, 확인되면 입금돼요. 첫 입금까지 약 3~4주 걸려요.
      </p>

      <BorderBox title="정리해고 실업급여 신청 시 주의할 점">
        사직서를 쓰지 말 것 — 해고통지서를 받아야 해요<br />
        이직확인서 퇴직 사유가 &ldquo;경영상 해고&rdquo;인지 반드시 확인<br />
        퇴직일로부터 12개월이 지나면 수급권 자체가 소멸돼요<br />
        해고예고수당(30일분 통상임금)도 별도로 청구 가능
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 주의사항 */}
      <H2>절차 중 거부당하면 이의신청부터 하세요</H2>
      <p style={body}>
        정리해고는 비자발적 퇴사가 확실한데도 거부되는 경우가 있어요. 대부분 서류 문제예요. 이직확인서에 퇴직 사유가 &ldquo;자진퇴직&rdquo;으로 잘못 기재된 경우가 가장 흔하죠. 사직서를 썼거나, 회사가 고용센터에 잘못 신고한 거예요.
      </p>
      <p style={body}>
        이럴 때는 고용센터에 이직확인서 정정을 요청하면 돼요. 회사가 정정을 거부하면 고용센터가 직권으로 조사할 수 있죠. 해고통지서, 정리해고 공문, 문자나 이메일 등 증거가 있으면 훨씬 수월해요. 증거 없이 구두로만 통보받았다면 녹취록이라도 있는 게 좋아요.
      </p>
      <p style={body}>
        그래도 안 되면 이의신청을 할 수 있어요. 고용보험 심사청구(90일 이내)와 재심사청구(30일 이내)가 있죠. 최대 810만원이 걸린 문제니까, 거절당했다고 바로 포기하지 마세요.
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
