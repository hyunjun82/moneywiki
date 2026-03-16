"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "사망한 수급자의 미지급 실업급여가 남아 있어요" },
  { id: "c2", label: "배우자 또는 직계가족(자녀, 부모 등)에 해당해요" },
  { id: "c3", label: "사망자와 생계를 같이 한 사실이 있어요" },
  { id: "c4", label: "사망진단서(또는 사망확인서)를 확보할 수 있어요" },
];

const CHECKLIST = [
  "고용24 또는 관할 고용센터에서 미지급 급여 잔액 확인하기",
  "사망진단서(사망확인서) 원본 또는 사본 준비하기",
  "가족관계증명서로 유족 관계 증빙하기",
  "주민등록등본으로 동거(생계 같이 한 사실) 증명하기",
  "미지급 급여 청구서 작성 후 고용센터에 제출하기",
];

const FAQS = [
  {
    q: "미지급 실업급여는 누가 받을 수 있나요?",
    a: "사망한 수급자와 생계를 같이한 유족이 받을 수 있죠. 배우자가 1순위이고, 자녀 → 부모 → 손자녀 → 조부모 → 형제자매 순으로 우선순위가 정해져 있어요.",
  },
  {
    q: "같은 순위 유족이 여러 명이면 어떻게 나누나요?",
    a: "같은 순위에 해당하는 유족이 2명 이상이면 균등하게 나눠 받아요. 예를 들어 자녀가 3명이면 각각 3분의 1씩 지급되죠.",
  },
  {
    q: "사망일 이후 남은 수급일수도 전부 받을 수 있나요?",
    a: "아니에요. 사망일 전날까지 발생한 미지급 급여만 청구할 수 있죠. 사망일 이후의 소정급여일수는 지급 대상이 아니에요.",
  },
  {
    q: "신청 기한을 놓치면 방법이 없나요?",
    a: "소멸시효가 3년이에요. 사망일로부터 3년이 지나면 청구권 자체가 사라지니까 기한 안에 반드시 신청해야 하죠.",
  },
  {
    q: "사실혼 배우자도 미지급 급여를 청구할 수 있나요?",
    a: "네, 사실혼 관계도 배우자로 인정돼요. 다만 사실혼을 입증할 수 있는 자료(동거 사실 증명, 주민등록등본 등)를 고용센터에 제출해야 하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제59조 — 미지급 구직급여", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "찾기쉬운 생활법령정보 — 미지급 실업급여", url: "https://easylaw.go.kr" },
      { label: "정부24 — 가족관계증명서 발급", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-재심사청구",
    title: "실업급여 재심사청구 방법",
    description: "심사청구에서도 불인정됐을 때 마지막으로 할 수 있는 절차예요.",
  },
  {
    slug: "실업급여-이의신청",
    title: "실업급여 이의신청 절차",
    description: "수급 결정에 이의가 있으면 60일 이내에 이의신청할 수 있죠.",
  },
  {
    slug: "실업급여-첫-입금일",
    title: "실업급여 첫 입금일은 언제?",
    description: "실업급여 신청 후 첫 입금까지 걸리는 기간을 정리했어요.",
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
          currentSlug="미지급-실업급여-수급-순위-및-신청-방법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 미지급급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        미지급 실업급여, 누가 받을 수 있을까?<br />
        수급 순위와 청구 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여를 받던 분이 갑자기 돌아가시면, 남은 급여는 그냥 사라지는 걸까요?<br />
        아니에요. <strong>유족이 미지급 실업급여를 대신 받을 수 있죠.</strong><br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제59조</a>에서
        수급자격자가 사망한 경우 유족이 미지급 구직급여를 청구할 수 있도록 보장하고 있어요.
        수급 순위부터 신청 서류, 소멸시효까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 미지급 실업급여란 + EligibilityChecker */}
      <H2>수급 순위에 해당하는 유족은 누구인가요?</H2>
      <p style={body}>
        실업급여를 받고 있던 사람이 사망하면, 아직 지급받지 못한 급여가 남을 수 있죠. 이 <strong>미수령 급여를 유족이 대신 청구해서 받는 제도</strong>가 미지급 실업급여예요. 사망 전에 실업인정을 받은 기간에 대해서만 급여가 발생하고, 사망일 이후 분은 지급 대상이 아니에요.
      </p>
      <p style={body}>
        예를 들어볼게요. 소정급여일수가 150일인 분이 100일째 수급 중 사망했다면, 마지막 실업인정일 이후부터 사망 전날까지의 급여가 미지급분이 되는 거예요. 남은 50일분 전체가 아니라, <strong>실업인정을 받은 기간</strong>만 해당된다는 점이 핵심이죠.
      </p>
      <p style={body}>
        미지급 실업급여를 신청할 수 있는 조건은 세 가지예요. 첫째, 수급자격자가 사망했을 것. 둘째, 사망 전에 지급받지 못한 구직급여가 남아있을 것. 셋째, 청구할 수 있는 유족이 있을 것. 이 세 가지를 모두 충족해야 하죠.
      </p>

      <SectionBadge>청구 자격 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="미지급 실업급여를 청구할 수 있는 조건을 갖췄어요. 아래 절차를 따라 신청하세요."
        partialMatchText="충족되지 않은 항목이 있어요. 해당 부분을 먼저 점검해 보세요."
      />

      <Divider />

      {/* 섹션 2 — 수급 순위 */}
      <H2>청구 기준에서 같은 순위 유족은 어떻게 나누나요?</H2>
      <p style={body}>
        미지급 실업급여를 받을 수 있는 유족에는 법으로 정한 순위가 있죠. <strong>1순위는 배우자</strong>이고, 사실혼 관계도 포함돼요. 그다음이 자녀, 부모, 손자녀, 조부모, 형제자매 순이에요. 상위 순위자가 있으면 하위 순위자는 청구할 수 없죠.
      </p>
      <p style={body}>
        같은 순위 안에서는 <strong>사망 당시 생계를 같이한 유족</strong>이 우선이에요. 부모가 두 분 다 계신데 한 분만 사망자와 함께 살았다면, 함께 살던 쪽이 먼저 청구권을 갖게 되죠. 주민등록등본으로 동거 여부를 증명하는 방식이에요.
      </p>
      <p style={body}>
        같은 순위의 유족이 여러 명이면 <strong>균등하게 나눠서</strong> 받아요. 자녀가 2명이면 50%씩, 3명이면 약 33%씩 배분되죠. 한 명이 전부 가져갈 수는 없어요.
      </p>

      <GreenBox title="미지급 실업급여 수급 순위">
        1순위: 배우자 (사실혼 포함)<br />
        2순위: 자녀<br />
        3순위: 부모<br />
        4순위: 손자녀<br />
        5순위: 조부모<br />
        6순위: 형제자매<br />
        * 같은 순위 내에서는 생계를 같이한 유족이 우선
      </GreenBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 방법과 서류 + Checklist */}
      <H2>청구 기준에 맞는 서류와 신청 절차</H2>
      <p style={body}>
        관할 고용센터를 방문하거나 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청할 수 있죠. <strong>미지급 급여 청구서</strong>를 작성하고, 사망 증빙서류와 유족 관계를 증명하는 서류를 함께 제출하면 돼요.
      </p>
      <p style={body}>
        필요한 서류를 정리하면 이래요. 미지급 급여 청구서(고용센터 비치 또는 온라인 다운로드), 사망진단서 또는 사망확인서, 가족관계증명서, 주민등록등본(생계를 같이했다는 걸 증빙할 때), 그리고 유족 본인의 통장 사본이에요. 서류가 빠지면 접수가 안 되니 미리 챙기세요.
      </p>
      <p style={body}>
        궁금한 점은 고용센터 대표번호 <strong>1350</strong>으로 먼저 확인해보세요. 관할 고용센터가 어디인지, 추가로 필요한 서류가 있는지 전화 한 통이면 알 수 있죠. 가족관계증명서와 주민등록등본은 <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24(gov.kr)</a>에서 온라인 발급도 가능하고요.
      </p>

      <BorderBox title="신청 시 필요한 서류 목록">
        미지급 급여 청구서<br />
        사망진단서 또는 사망확인서<br />
        가족관계증명서<br />
        주민등록등본 (동거 증빙용)<br />
        유족 본인 통장 사본
      </BorderBox>

      <SectionBadge>미지급 급여 신청 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 소멸시효와 금액 */}
      <H2>수급 순위별 소멸시효와 청구 금액</H2>
      <p style={body}>
        미지급 실업급여의 <strong>소멸시효는 3년</strong>이에요. 사망일로부터 3년이 지나면 청구권 자체가 사라지죠. 2026년 1월 15일에 사망했다면 2029년 1월 14일까지 신청해야 해요. 유족분들이 슬픔에 빠져 시기를 놓치는 경우가 종종 있으니 꼭 기억해두세요.
      </p>
      <p style={body}>
        금액은 사망일 전날까지 받을 수 있었던 급여 그대로예요. 2026년 기준 구직급여 일 상한액은 <strong>68,100원</strong>, 일 하한액은 <strong>66,048원</strong>이에요. 만약 50일분이 미지급이라면 상한액 기준으로 약 340만 원 정도 되죠.
      </p>
      <p style={body}>
        그리고 주의할 점이 하나 더 있죠. 사망일 <strong>이후</strong>의 소정급여일수는 지급 대상이 아니에요. 아무리 남은 수급일수가 많아도 사망일까지만 계산되죠. 실업인정을 아직 안 받은 기간도 마찬가지로 급여가 발생하지 않고요.
      </p>

      <Divider />

      {/* 섹션 5 — 주의사항 */}
      <H2>청구 기준에 맞춰 서류부터 준비하세요</H2>
      <p style={body}>
        가장 흔한 실수가 <strong>실업인정 기간을 착각하는 거</strong>예요. 미지급 급여는 사망 전에 실업인정을 받은 기간에 대해서만 발생하죠. 실업인정을 아직 안 받은 구간은 아무리 소정급여일수가 남아 있어도 미지급 대상이 아니에요.
      </p>
      <p style={body}>
        유족 순위와 관련해서도 분쟁이 생길 수 있죠. 사실혼 배우자와 법률혼 배우자가 동시에 청구하는 경우가 대표적이에요. 이런 경우 고용센터에서 사실관계를 확인하게 되고, 경우에 따라 법원 판단을 거쳐야 할 수도 있어요.
      </p>
      <p style={body}>
        서류를 준비하기 어려운 상황이라면 고용센터에 미리 상담을 요청하세요. 가족관계증명서나 주민등록등본은 <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24(gov.kr)</a>에서 온라인으로 발급받을 수 있고, 사망진단서는 사망 당시 의료기관에서 발급받을 수 있죠. 서류 준비가 복잡하게 느껴져도, 하나씩 챙기면 어렵지 않아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        미지급 실업급여와 관련해서 실제로 많이 물어보시는 내용을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사안은 고용센터 심사에 따라 달라질 수 있으니, 관할 고용센터(1350)에 확인해보세요." />
    </ArticleLayout>
  );
}
