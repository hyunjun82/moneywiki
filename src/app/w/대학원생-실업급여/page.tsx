"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "재직 중 고용보험에 가입돼 있었어요 (RA·TA·계약직 등)" },
  { id: "c2", label: "비자발적으로 퇴직했어요 (계약만료·권고사직 등)" },
  { id: "c3", label: "퇴직 전 18개월간 고용보험 가입기간이 180일 이상이에요" },
  { id: "c4", label: "구직활동이 가능하고 재취업 의사가 있어요" },
];

const CHECKLIST = [
  "야간·주말 대학원이면 별도 입증 없이 실업급여 수급 가능",
  "전일제 대학원이면 구직활동 기록을 꼼꼼히 남기기 (입사지원·면접)",
  "대학원 수업은 구직활동이 아님: 별도로 입사지원·면접 필요",
  "실업인정 때 구직활동 횟수 채우기 (1~2차 1회, 3차 이후 2회)",
  "취업하면 실업급여 종료: 조기재취업수당 확인",
];

const FAQS = [
  {
    q: "전일제 대학원 다니면 실업급여 못 받나요?",
    a: "꼭 그렇지는 않아요. 구직 의사와 능력을 입증하면 받을 수 있죠. 입사지원 기록이나 면접 참여 등으로 적극적인 구직활동을 보여주면 돼요.",
  },
  {
    q: "대학원 수업이 구직활동으로 인정되나요?",
    a: "안 돼요. 대학원 수업은 학업이지 구직활동이 아니죠. 실업인정을 받으려면 입사지원, 면접, 취업특강 참석 등 별도 활동이 필요해요.",
  },
  {
    q: "야간대학원 다니면서 구직활동은 어떻게 하나요?",
    a: "낮 시간에 입사지원하고 면접 보면 돼요. 야간·주말 대학원은 평일 낮에 근무할 수 있으니까 재취업 의사를 따로 입증할 필요도 없죠.",
  },
  {
    q: "대학원 휴학하면 실업급여에 유리한가요?",
    a: "네, 오히려 수월해요. 휴학 상태면 전일제든 야간이든 상관없이 구직 의사를 인정받기 쉽죠. 학업에 시간을 쓰고 있지 않다는 게 분명하니까요.",
  },
  {
    q: "대학원생인데 RA로 일하다 계약이 끝났어요. 실업급여 대상인가요?",
    a: "RA 계약이 고용보험에 가입된 상태였다면 대상이에요. 계약만료는 비자발적 퇴사이니까요. 고용24에서 가입 이력을 먼저 조회해보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 실업급여 수급자격 (재취업 의사와 능력)", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 안내 및 피보험 이력 조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 실업급여 상담(1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-직업훈련",
    title: "실업급여 받으면서 직업훈련 받는 방법",
    description: "고용센터 지정 직업훈련은 구직활동으로 인정돼요.",
  },
  {
    slug: "실업급여-온라인-교육",
    title: "실업급여 온라인 교육 이수 방법",
    description: "수급자격 신청 전에 온라인 교육부터 이수해야 해요.",
  },
  {
    slug: "실업급여-구직활동-횟수",
    title: "실업급여 구직활동 횟수와 인정 방법",
    description: "실업인정 때 필요한 구직활동 횟수와 인정되는 활동을 정리했어요.",
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
          currentSlug="대학원생-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 대학원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대학원생도 실업급여 된다고?<br />
        RA·TA 수급 조건 체크리스트
      </h1>

      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        &quot;대학원 다니면 실업급여 못 받는 거 아니에요?&quot;
      </p>
      <p style={body}>
        많은 분이 그렇게 알고 있는데, 아니에요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서
        실업급여 수급의 핵심 조건은 <strong>재취업 의사와 능력</strong>이죠.
        야간·주말 대학원이면 거의 문제없고, 전일제라도 구직활동을 입증하면 받을 수 있죠.
      </p>
      <p style={body}>
        다만 대학원 수업 자체는 구직활동으로 인정되지 않아요.
        별도로 입사지원이나 면접 기록을 남겨야 하죠.
        이 차이를 모르고 &quot;수업 열심히 들었으니 괜찮겠지&quot; 했다가 실업인정에서 탈락하는 분이 꽤 많죠.
        지금부터 어떻게 준비해야 하는지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 대학원생 수급 자격 */}
      <H2>RA·TA 계약이 끝나면 수급 조건이 되나요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        실업급여를 받으려면 고용보험에 가입돼 있어야 하죠.
        대학원생 중에서 <strong>RA(연구조교), TA(교육조교), 계약직 연구원</strong> 등으로 일했다면 고용보험에 가입돼 있을 가능성이 높아요.
        학교나 연구소에서 근로계약을 체결하고 급여를 받았다면 가입 대상이에요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 본인의 가입 이력을 바로 조회할 수 있죠.
      </p>
      <p style={body}>
        수급 자격의 핵심 조건은 세 가지예요.
        첫째, 퇴직 전 18개월간 고용보험 가입기간이 <strong>180일 이상</strong>이어야 해요.
        둘째, <strong>비자발적으로 퇴직</strong>해야 하죠: RA 계약만료나 연구과제 종료는 비자발적 퇴사로 인정돼요.
        셋째, <strong>재취업 의사와 능력</strong>이 있어야 해요.
      </p>
      <p style={body}>
        이 세 번째 조건이 대학원생에게 가장 중요한 부분이에요.
        &quot;대학원에 다니니까 취업 의사가 없는 거 아니냐&quot;고 걱정하는 분이 많은데, 그렇지 않아요.
        고용센터에서는 대학원 재학 자체를 취업 의사 부재로 보지 않죠.
        야간이냐 전일제냐에 따라 입증 방법이 달라질 뿐이에요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>고용보험 가입 이력 (RA·TA·계약직 등) 필수</p>
        <p style={{ margin: "0 0 4px" }}>비자발적 퇴직 (계약만료, 연구과제 종료 등)</p>
        <p style={{ margin: 0 }}>피보험기간 180일 이상 + 재취업 의사</p>
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 조건을 충족할 가능성이 높아요. 고용센터에 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 야간 vs 전일제 차이 */}
      <H2>야간과 전일제, 수급 조건이 다른가요?</H2>

      <p style={body}>
        <strong>야간·주말 대학원</strong>을 다니면 평일 낮에 근무할 수 있죠.
        고용센터에서도 이 점을 인정해요.
        낮에 일할 수 있는 상태이니 재취업 의사와 능력이 있다고 보는 거예요.
        별도로 구직 의사를 입증할 필요가 없고, 일반 수급자와 동일하게 처리되죠.
      </p>
      <p style={body}>
        <strong>전일제 대학원</strong>은 상황이 달라요.
        평일 낮에 수업이 있으니까 고용센터에서 &quot;낮에 일할 수 있는 건지&quot; 확인하죠.
        입증 방법은 어렵지 않아요. 워크넷이나 채용사이트에서 <strong>실제로 입사지원한 기록</strong>을 남기면 돼요.
        면접에 참여한 기록이 있다면 그건 더 강력한 증빙이 되죠.
      </p>
      <p style={body}>
        &quot;오전 수업이 없는 날에 근무 가능하다&quot;거나 &quot;재택근무 가능한 일자리를 찾고 있다&quot;고 설명하는 것도 방법이에요.
        대학원 시간표를 고용센터에 가져가서 취업 가능한 시간대를 보여주면 더 좋죠.
        핵심은 <strong>&quot;학업만 하려는 게 아니라 취업도 하려고 한다&quot;</strong>는 걸 명확히 하는 거예요.
        고용센터마다 판단이 조금씩 다를 수 있으니, 신청 전에{" "}
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 상담전화(1350)로 먼저 확인하는 게 안전하죠.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>야간·주말 대학원 → 별도 입증 불필요, 일반 수급자와 동일</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>전일제 대학원 → 입사지원·면접 기록으로 구직 의사 입증 필요</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>휴학 상태 → 전일제든 야간이든 구직 의사 인정 용이</p>
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 구직활동 체크리스트 */}
      <H2>구직활동 체크리스트와 실업인정 기준</H2>
      <SectionBadge>구직활동 체크리스트</SectionBadge>

      <p style={body}>
        여기서 많이 헷갈리는 부분이 하나 있죠.
        대학원 수업을 듣는 건 <strong>구직활동으로 인정되지 않아요</strong>.
        학업이지 취업 준비가 아니니까요.
        실업인정을 받으려면 수업과 별개로 구직활동을 해야 해요.
      </p>
      <p style={body}>
        인정되는{" "}
        <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동</a>은 <strong>입사지원, 면접, 취업특강 참석, 직업훈련</strong> 등이에요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 지정한 직업훈련을 듣는 건 구직활동으로 인정되죠.
        대학원 수업과 직업훈련은 성격이 완전히 달라요.
        자격증 공부나 개인 학습도 구직활동에 해당하지 않으니 주의하세요.
      </p>
      <p style={body}>
        실업인정 때 필요한 구직활동 횟수도 챙겨야 하죠.
        1~2차 실업인정은 <strong>1회</strong>, 3차부터는 <strong>2회 이상</strong>이에요.
        대학원 수업이 아무리 바빠도 이 횟수는 반드시 채워야 실업급여가 지급돼요.
        입사지원은 온라인으로도 가능하니까, 10분이면 끝나는 일이에요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 수급 금액과 기간 */}
      <H2>RA·TA 수급액과 수급기간 계산</H2>

      <p style={body}>
        대학원생이라고 금액이 다르지 않아요.
        일반 수급자와 동일하게 퇴직 전 평균임금의 <strong>60%</strong>를 받죠.
        2026년 기준으로{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라{" "}
        <a href="/w/실업급여-최대금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>1일 상한액은 68,100원</a>, 하한액은 <strong>66,048원</strong>이에요.
        월로 환산하면 최대 약 204만 원 수준이죠.
      </p>
      <p style={body}>
        수급기간은 나이와 피보험기간에 따라 120일에서 270일까지 갈려요.
        30세 미만이고 피보험기간이 1년 이상~3년 미만이면 120일이에요.
        50세 이상이고 10년 이상 가입했으면 최대 270일까지 받을 수 있죠.
        대학원생은 비교적 젊은 층이 많으니 120~150일이 일반적이에요.
      </p>
      <p style={body}>
        RA나 계약직으로 일했을 때 급여가 낮았더라도 걱정하지 마세요.
        하한액(66,048원/일)이 보장되니까, 월급이 적었어도 실업급여는 일정 수준 이상을 받게 돼요.
        정확한 예상 금액은{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 모의계산을 해볼 수 있죠.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>1일 상한액 68,100원 / 하한액 66,048원 (2026년 기준)</p>
        <p style={{ margin: "0 0 4px" }}>퇴직 전 평균임금의 60%로 계산</p>
        <p style={{ margin: 0 }}>수급기간: 나이·피보험기간에 따라 120~270일</p>
      </GreenBox>

      <Divider />

      {/* 섹션 5: 주의사항과 전략 */}
      <H2>수급 조건 체크리스트로 준비하세요</H2>

      <p style={body}>
        취업하면 실업급여는 바로 끝나요.
        대학원 다니면서 취업하면 그때부터 실업급여가 중단되죠.
        다만 수급일수의 절반 이상을 남기고 취업하면{" "}
        <a href="/w/실업급여-취업촉진수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>을 받을 수 있죠.
        남은 수급일수의 절반을 일시금으로 주는 제도이니까 꼭 챙기세요.
      </p>
      <p style={body}>
        휴학 상태면 오히려 수월해요.
        대학원을 휴학했다면 전일제든 야간이든 상관없이 구직 의사를 인정받기 쉽죠.
        학업에 시간을 쓰고 있지 않다는 게 명확하니까요.
        실업급여 수급 기간에만 휴학하는 것도 현실적인 전략이에요.
      </p>
      <p style={body}>
        고용센터마다 판단이 조금씩 다를 수 있다는 점은 알아두세요.
        전일제 대학원의 경우 담당자에 따라 심사 기준이 다소 차이가 나죠.
        그래서 신청 전에{" "}
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 상담전화(1350)로 먼저 확인하는 게 안전해요.
        사전 상담은 무료이고, 내 상황에서 어떤 서류를 준비해야 하는지 구체적으로 안내받을 수 있죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        대학원생 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 전일제 대학원의 수급자격 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
