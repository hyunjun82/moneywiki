"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현재 실업급여(구직급여)를 수급 중이에요" },
  { id: "c2", label: "조기재취업했거나 직업훈련에 참여하고 있어요" },
  { id: "c3", label: "고용센터의 승인을 받았거나 받을 수 있어요" },
  { id: "c4", label: "영수증·수료증 등 증빙서류를 보관하고 있어요" },
];

function calcEarlyReemployment(remainDays: number, dailyPay: number): number {
  return Math.round(remainDays * 0.5) * dailyPay;
}

const CALC_SLIDERS = [
  { id: "remainDays", label: "남은 수급일수", min: 30, max: 270, step: 10, defaultValue: 120, format: (v: number) => `${v}일` },
  { id: "dailyPay", label: "1일 구직급여액", min: 66048, max: 68100, step: 100, defaultValue: 66048, format: (v: number) => `${v.toLocaleString()}원` },
];

const CALC_RESULTS = [
  {
    label: "지급 대상 일수 (남은 일수의 50%)",
    getValue: (v: Record<string, number>) => Math.round(v.remainDays * 0.5),
    format: (v: number) => `${v}일`,
  },
  {
    label: "조기재취업수당 예상액",
    getValue: (v: Record<string, number>) => calcEarlyReemployment(v.remainDays, v.dailyPay),
    format: (v: number) => `${v.toLocaleString()}원 (약 ${Math.round(v / 10000).toLocaleString()}만원)`,
    highlight: true,
  },
];

const CHECKLIST = [
  "조기재취업수당: 수급기간 절반 이상 남기고 재취업 + 12개월 고용 유지 후 신청",
  "직업능력개발수당: 고용센터 소장이 지시한 훈련에 참여 + 실업인정일에 자동 반영",
  "광역구직활동비: 거주지에서 50km 이상 면접 전 고용센터에 사전 승인 필수",
  "이주비: 취업·훈련 목적 이사 전 고용센터에 사전 승인 필수",
  "증빙서류(면접확인서, 훈련수료증, 이사비 영수증 등) 반드시 보관",
];

const FAQS = [
  {
    q: "구직급여 받으면서 취업촉진수당도 같이 받을 수 있나요?",
    a: "받을 수 있어요. 취업촉진수당은 구직급여와 별개예요. 직업능력개발수당이나 광역구직활동비는 구직급여와 동시에 수급이 가능하죠. 조기재취업수당만 예외인데, 이건 취업한 시점에 남은 구직급여를 포기하는 대신 받는 거예요.",
  },
  {
    q: "조기재취업수당은 취업하자마자 바로 신청하나요?",
    a: "바로는 안 돼요. 재취업한 직장에서 12개월 이상 고용을 유지한 뒤에 신청할 수 있죠. 12개월이 지나면 고용24(ei.go.kr)에서 온라인으로 신청하면 돼요.",
  },
  {
    q: "광역구직활동비는 면접 다녀온 후에 신청해도 되나요?",
    a: "안 돼요. 반드시 면접 출발 전에 고용센터에서 사전 승인을 받아야 해요. 먼저 다녀오고 나중에 신청하면 지급 대상에서 빠지죠. 순서가 핵심이에요.",
  },
  {
    q: "직업능력개발수당 금액이 얼마 정도 되나요?",
    a: "하루 단가가 수천 원 수준이에요. 금액이 크진 않지만 교통비와 식비를 보조하는 성격이라 훈련 기간 동안 조금이나마 보탬이 되죠. 훈련 참여일수에 비례해서 지급돼요.",
  },
  {
    q: "조기재취업수당을 받으면 남은 구직급여는 어떻게 되나요?",
    a: "소멸해요. 빨리 취업한 보너스를 받는 대신 나머지 구직급여는 포기하는 구조예요. 남은 수급일수가 적으면 조기재취업수당보다 구직급여를 끝까지 받는 게 유리한 경우도 있어요. 아래 계산기로 비교해보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제64조~제69조: 취업촉진수당 4종 지급 요건 및 금액", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙: 취업촉진수당 신청 절차 및 증빙서류", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 취업촉진수당 신청 안내 및 온라인 접수", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 실업급여 및 취업촉진수당 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-조기재취업수당",
    title: "실업급여 조기재취업수당 조건과 계산법",
    description: "수급기간 절반 이상 남기고 취업하면 남은 급여의 절반을 일시금으로 받을 수 있어요.",
  },
  {
    slug: "실업급여-직업능력개발수당",
    title: "실업급여 직업능력개발수당 신청 방법",
    description: "고용센터 지시 훈련을 받으면 참여일수에 따라 수당이 지급돼요.",
  },
  {
    slug: "실업급여-광역구직활동비",
    title: "실업급여 광역구직활동비 지원 조건",
    description: "거주지에서 50km 이상 떨어진 면접에 교통비와 숙박비를 지원받을 수 있어요.",
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
          currentSlug="실업급여-취업촉진수당"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 취업촉진수당</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        취업촉진수당 4종류, 뭐가 다를까?<br />
        종류별 조건과 금액 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;실업급여 말고 또 받을 수 있는 돈이 있다고요?&quot;
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조~제69조</a>에 따르면
        실업급여 수급자가 적극적으로 재취업하거나 직업훈련을 받으면 <strong>추가 수당</strong>을 지급하도록 돼 있죠.
        조기재취업수당, 직업능력개발수당, 광역구직활동비, 이주비: 이 네 가지를 통칭해서 <strong>취업촉진수당</strong>이라고 해요.
      </p>
      <p style={body}>
        구직급여와 별도로 지급되기 때문에 조건만 맞추면 둘 다 챙길 수 있어요.
        종류별 조건과 금액이 어떻게 다른지, 어떤 걸 신청해야 유리한지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 취업촉진수당 개요 + EligibilityChecker */}
      <H2>취업촉진수당 종류별로 뭐가 다른가요?</H2>
      <p style={body}>
        구직급여는 실직 후 구직활동을 하는 동안 <strong>매달 정기적으로</strong> 받는 기본 급여예요.
        취업촉진수당은 성격이 달라요. 특정 조건을 충족했을 때 <strong>추가로 지급</strong>되는 인센티브이죠.
      </p>
      <p style={body}>
        고용보험법은 실업급여를 &quot;구직급여&quot;와 &quot;취업촉진수당&quot;으로 나눠요.
        대부분의 사람이 구직급여만 알고 취업촉진수당은 모르고 지나가죠.
        이유는 간단해요. 구직급여는 신청하면 자동으로 나오지만, 취업촉진수당은 <strong>본인이 조건을 충족하고 별도로 신청</strong>해야 하기 때문이에요.
      </p>
      <p style={body}>
        네 종류를 간략히 정리하면 이렇죠. <strong>조기재취업수당</strong>은 빨리 취업한 보상, <strong>직업능력개발수당</strong>은 직업훈련 참여 지원금, <strong>광역구직활동비</strong>는 먼 거리 면접 교통비, <strong>이주비</strong>는 취업 목적 이사 비용이에요. 대상과 신청 방식이 다 다르니 하나씩 살펴볼게요.
      </p>

      <GreenBox>
        1. <strong>조기재취업수당</strong>: 수급기간 절반 이상 남기고 재취업 시 남은 급여의 50% 일시금<br />
        2. <strong>직업능력개발수당</strong>: 고용센터 지시 훈련 참여 시 참여일수에 따라 지급<br />
        3. <strong>광역구직활동비</strong>: 거주지에서 50km 이상 면접 시 교통비·숙박비 실비 지급<br />
        4. <strong>이주비</strong>: 취업·훈련 목적 이사 시 이사 비용 실비 지급
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 취업촉진수당 신청 자격이 있을 가능성이 높아요. 아래에서 해당 수당의 구체적인 신청 방법을 확인하세요."
        partialMatchText="일부만 해당돼요. 먼저 구직급여 수급 중인지 확인하고, 해당하는 수당만 골라서 신청하세요."
      />

      <Divider />

      {/* 섹션 2: 조기재취업수당 상세 + Calculator */}
      <H2>조기재취업수당 금액, 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        조기재취업수당은 취업촉진수당 중에서 금액이 가장 커요.
        구직급여 수급기간의 <strong>절반 이상을 남겨놓고 재취업</strong>하면 받을 수 있죠.
        핵심 조건이 하나 더 붙는데, 재취업한 직장에서 <strong>12개월 이상 고용이 유지</strong>돼야 해요.
      </p>
      <p style={body}>
        계산 방식은 단순하죠. <strong>남은 수급일수 x 50% x 1일 구직급여액</strong>이에요.
        수급기간 180일 중 60일만 쓰고 취업했다면, 남은 120일의 절반인 60일분이 지급돼요.
        1일 구직급여가 66,048원이면 60일 x 66,048원 = <strong>약 396만원</strong>을 한꺼번에 받는 셈이죠.
      </p>
      <p style={body}>
        전략적으로 따져볼 부분이 하나 있어요. 남은 수급일수가 너무 적으면 조기재취업수당보다 구직급여를 끝까지 받는 게 유리하죠.
        남은 일수의 50%만 받으니까, 최소한 수급기간 절반 이상은 남겨야 의미가 있고요.
        아래 계산기로 본인 상황을 직접 비교해보세요.
      </p>

      <Calculator
        title="조기재취업수당 예상액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 수급기간 절반 이상 남기고 재취업 + 12개월 고용 유지가 전제 조건이에요. 실제 금액은 고용센터 심사 후 확정돼요."
      />

      <BorderBox>
        수급기간 180일 중 60일 수급 후 재취업 → 남은 일수 120일<br />
        지급 일수: 120일 x 50% = <strong>60일</strong><br />
        1일 구직급여 66,048원 x 60일 = <strong>3,962,880원 일시금</strong><br /><br />
        비교: 구직급여 끝까지 받으면 66,048원 x 120일 = 7,925,760원<br />
        → 조기재취업수당(약 396만원) + 빠른 재취업이 유리한지 판단 필요
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 직업능력개발수당 + 광역구직활동비 + 이주비 + Checklist */}
      <H2>직업능력개발수당, 광역구직활동비, 이주비 조건 비교</H2>
      <p style={body}>
        <strong>직업능력개발수당</strong>은 고용센터 소장이 지시한 직업훈련을 받을 때 지급돼요.
        국민내일배움카드로 수강할 수 있는 훈련과 연계되는 경우가 많죠.
        금액 자체는 하루 수천 원 수준으로 크지 않지만, 교통비와 식비를 보조하는 성격이에요.
        훈련 참여일수에 비례해서 지급되고, 별도 신청 없이 <strong>실업인정일에 자동 반영</strong>되니 편하죠.
      </p>
      <p style={body}>
        <strong>광역구직활동비</strong>는 거주지에서 <strong>50km 이상 떨어진 곳</strong>에 면접을 보러 갈 때 교통비를 실비로 지원해요.
        서울에서 부산 면접을 본다든지, 대전에서 광주로 이동하는 경우가 해당되죠.
        숙박이 필요한 거리면 숙박비도 나오고요. 중요한 건 <strong>면접 출발 전에 고용센터에서 사전 승인</strong>을 받아야 한다는 점이에요. 먼저 다녀오고 나중에 신청하면 한 푼도 못 받아요.
      </p>
      <p style={body}>
        <strong>이주비</strong>도 비슷한 구조예요.
        취업하거나 직업훈련을 받기 위해 주거를 이전할 때 <strong>이사 비용을 실비로 지급</strong>하죠.
        가족이 함께 이사하면 가족분 이사비까지 포함돼요.
        이것도 이사 전에 고용센터에서 <strong>사전 승인이 필수</strong>이고, 지방에서 수도권으로 이동하거나 다른 도시로 옮기는 경우에 활용하면 돼요.
      </p>

      <GreenBox>
        <strong>광역구직활동비</strong>: 면접 출발 전 고용센터 승인 → 면접 → 증빙 제출<br />
        <strong>이주비</strong>: 이사 전 고용센터 승인 → 이사 → 증빙 제출<br /><br />
        먼저 하고 나중에 신청하면 지급 대상에서 빠져요. 순서가 핵심이죠.
      </GreenBox>

      <SectionBadge>수당별 신청 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 여러 수당 동시 수급 + 전략 */}
      <H2>여러 종류 동시 수급과 금액 전략</H2>
      <p style={body}>
        조건만 맞으면 <strong>여러 취업촉진수당을 동시에</strong> 챙길 수 있어요.
        직업훈련을 받으면서 직업능력개발수당을 받고, 훈련 후 수급기간 절반 이상을 남기고 취업해서 조기재취업수당까지 받는 식이죠.
        먼 곳에 면접을 보러 가서 광역구직활동비를 받은 뒤, 그 회사에 취업해서 이사하면 이주비까지 가능해요.
      </p>
      <p style={body}>
        다만 한 가지 주의할 점이 있죠. <a href="/w/실업급여-조기재취업수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>을 받으면 <strong>남은 구직급여는 소멸</strong>돼요.
        빨리 취업한 보너스를 받는 대신 나머지 구직급여를 포기하는 구조이기 때문이에요.
        남은 수급일수가 30일밖에 안 남았다면 조기재취업수당(15일분)보다 구직급여를 끝까지 받는 게 더 유리하죠.
      </p>
      <p style={body}>
        실수하기 쉬운 부분도 짚어드릴게요. 광역구직활동비나 이주비는 &quot;일단 하고 나중에 청구하면 되겠지&quot;라는 생각이 가장 위험해요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 사전 승인을 요건으로 정해놓았기 때문에, 승인 없이 진행하면 지급 대상에서 완전히 빠지죠.
        &quot;사후 신청 불가&quot;라는 원칙을 반드시 기억하세요.
      </p>

      <BorderBox>
        <strong>조기재취업수당</strong> → 재취업 후 12개월 고용 유지 → 고용24 온라인 신청<br />
        <strong>직업능력개발수당</strong> → 훈련 참여 → 실업인정일에 자동 반영 (별도 신청 불필요)<br />
        <strong>광역구직활동비</strong> → 면접 전 고용센터 사전 승인 → 면접 후 증빙 제출<br />
        <strong>이주비</strong> → 이사 전 고용센터 사전 승인 → 이사 후 증빙 제출
      </BorderBox>

      <Divider />

      {/* 섹션 5: 실전 전략 */}
      <H2>종류별 조건에 맞춰 수당을 최대로 챙기세요</H2>
      <p style={body}>
        가장 큰 금액은 단연 조기재취업수당이에요.
        남은 수급일수가 많을수록 유리하니까, 빨리 재취업할 자신이 있다면 구직급여를 오래 끌지 말고 적극적으로 취업활동을 하세요.
        수급기간 150일 중 30일만 쓰고 취업하면 남은 120일의 50%인 60일분, 약 <strong>396만원</strong>을 한 번에 받을 수 있죠.
      </p>
      <p style={body}>
        <a href="/w/실업급여-직업훈련" style={{ color: "#1D9E75", textDecoration: "underline" }}>직업훈련</a>을 계획하고 있다면 고용센터에 먼저 상담하세요.
        고용센터 소장이 &quot;지시&quot;한 훈련이어야 직업능력개발수당이 나와요.
        본인이 알아서 수강한 훈련은 대상이 아니에요.
        국민내일배움카드 훈련과 연계하면 수강료 지원에 직업능력개발수당까지 이중으로 챙길 수 있죠.
      </p>
      <p style={body}>
        지방에서 수도권으로 취업을 노리고 있다면 광역구직활동비와 이주비를 꼭 활용하세요.
        면접 교통비와 이사 비용을 합치면 수십만원에서 100만원 넘게 지원받을 수 있어요.
        &quot;몰라서 못 받는 돈&quot;이 가장 아까운 돈이에요. 해당되는 건 전부 신청하세요.
      </p>

      <GreenBox>
        구직급여 수급 시작 → 직업훈련 참여 → <strong>직업능력개발수당</strong> 수령<br />
        먼 거리 면접 시 → 출발 전 사전 승인 → <strong>광역구직활동비</strong> 수령<br />
        수급기간 절반 이상 남기고 재취업 → 12개월 유지 → <strong>조기재취업수당</strong> 수령<br />
        취업 목적 이사 → 이사 전 사전 승인 → <strong>이주비</strong> 수령
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        취업촉진수당에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 제64조~제69조를 바탕으로 작성됐어요. 수당별 세부 조건과 금액은 변경될 수 있으니, 고용센터(1350)나 고용24(ei.go.kr)에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
