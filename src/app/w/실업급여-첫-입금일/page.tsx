"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "수급자격 인정이 완료됐어요" },
  { id: "c2", label: "1차 실업인정일을 확인했어요" },
  { id: "c3", label: "고용24에 통장번호를 등록했어요" },
  { id: "c4", label: "대기기간 7일이 지났어요" },
];

const CHECKLIST = [
  "퇴직 즉시 회사에 이직확인서 처리 요청",
  "이직확인서 처리 당일 수급자격 신청 + 온라인 교육 이수",
  "고용24에 본인 통장번호 등록 확인",
  "1차 실업인정일 달력에 표시 (고용24 앱 알림 설정)",
  "실업인정일 절대 놓치지 않기 — 놓치면 입금이 밀려요",
];

const FAQS = [
  {
    q: "실업급여 신청하면 바로 입금되나요?",
    a: "바로 들어오지 않아요. 대기기간 7일을 거치고, 1차 실업인정을 받은 뒤에야 지급이 시작돼요. 보통 신청부터 첫 입금까지 2~3주 걸리죠.",
  },
  {
    q: "첫 입금 금액이 왜 이렇게 적은 건가요?",
    a: "대기기간 7일치가 빠지고, 수급자격 인정일부터 1차 실업인정일까지의 일수만 지급되기 때문이에요. 보통 10~15일치 정도가 들어오죠. 두 번째부터는 28일치씩 정상 지급돼요.",
  },
  {
    q: "실업인정 후 며칠 만에 통장에 들어오나요?",
    a: "보통 3~5영업일이에요. 주말이나 공휴일이 끼면 조금 더 걸릴 수 있죠. 정해진 입금 요일은 따로 없어요.",
  },
  {
    q: "5일 넘게 지났는데 입금이 안 됐으면 어떻게 하나요?",
    a: "고용24에서 지급 내역을 먼저 조회해보세요. 계좌번호 오류나 서류 미비 문제일 수 있으니, 해결이 안 되면 고용센터(1350)에 전화하는 게 빨라요.",
  },
  {
    q: "대기기간 7일 동안 구직활동을 해야 하나요?",
    a: "안 해도 돼요. 대기기간은 실업 상태를 확인하는 기간이라 별도의 구직활동 의무가 없어요. 다만 이 시간을 활용해서 이력서를 미리 준비해두면 좋죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제49조 — 대기기간 및 구직급여 지급 절차", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청·조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-고용센터",
    title: "실업급여 관할 고용센터 찾기",
    description: "내 주소지 기준 관할 고용센터를 조회하는 방법이에요.",
  },
  {
    slug: "실업급여-신청-준비물-목록",
    title: "실업급여 신청 준비물 목록",
    description: "신청 전 미리 챙겨야 할 서류와 준비물을 정리했어요.",
  },
  {
    slug: "실업인정일-변경",
    title: "실업인정일 변경 방법",
    description: "실업인정일에 참석이 어려울 때 날짜를 바꾸는 절차예요.",
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
          currentSlug="실업급여-첫-입금일"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 입금일정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 첫 입금, 언제 들어올까?<br />
        대기기간과 입금 일정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "실업급여 신청했는데 언제 첫 입금이 되는 거죠?"<br />
        신청한다고 바로 들어오지 않아요. <strong>대기기간 7일</strong>이 먼저 지나야 하고,
        그 뒤에 <strong>1차 실업인정</strong>까지 마쳐야 비로소 통장에 입금돼요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제49조</a>에 따르면
        수급자격을 인정받은 날부터 7일간은 지급이 유예되고, 이후 실업인정을 거쳐야 지급이 시작되죠.
        신청부터 첫 입금까지 보통 <strong>2~3주</strong> 걸려요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 첫 입금까지 전체 일정 + 자격 체크 */}
      <H2>첫 입금까지 일정은 어떻게 되나요?</H2>
      <p style={body}>
        퇴직 후 첫 입금까지는 총 5단계를 거쳐요. 가장 먼저 해야 할 건 <strong>이직확인서 처리</strong>예요. 퇴직하면 회사가 고용보험에 이직확인서를 제출하는데, 이게 보통 3~10일 정도 걸리죠. 회사가 늑장을 부리면 더 밀릴 수도 있으니, 퇴직 직후에 회사 측에 처리를 요청하는 게 좋아요.
      </p>
      <p style={body}>
        이직확인서가 처리되면 <strong>수급자격 신청과 온라인 교육</strong>을 같은 날 진행할 수 있어요. 고용센터에 방문하거나 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청하면 되죠. 교육까지 이수해야 수급자격이 인정돼요. 그 다음부터 <strong>대기기간 7일</strong>이 시작되고, 7일이 지난 뒤 고용센터가 지정한 날짜에 1차 실업인정을 받아요.
      </p>
      <p style={body}>
        1차 실업인정이 끝나면 <strong>3~5영업일 내에 첫 입금</strong>이 돼요. 퇴직일 기준으로 따지면 빠르면 2주, 늦으면 3~4주 후에 통장에 돈이 들어오는 셈이죠.
      </p>

      <GreenBox title="첫 입금까지 5단계">
        1단계: 퇴직 → 이직확인서 처리 (3~10일)<br />
        2단계: 수급자격 신청 + 온라인 교육 이수 (1일)<br />
        3단계: 대기기간 (7일)<br />
        4단계: 1차 실업인정 (고용센터 지정 날짜)<br />
        5단계: 입금 (실업인정 후 3~5영업일)
      </GreenBox>

      <SectionBadge>내 상황에서 바로 입금 가능한지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 완료됐어요. 1차 실업인정만 받으면 3~5영업일 내 입금돼요."
        partialMatchText="아직 빠진 단계가 있어요. 미완료 항목을 먼저 처리하세요."
      />

      <Divider />

      {/* 섹션 2 — 대기기간 7일 + 계산기 */}
      <H2>대기기간 7일은 왜 기다려야 하나요?</H2>
      <p style={body}>
        수급자격을 인정받은 날부터 <strong>첫 7일은 실업급여가 나오지 않아요</strong>. 이걸 "대기기간"이라고 부르죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 명시된 제도라서 예외 없이 모든 수급자에게 적용돼요.
      </p>
      <p style={body}>
        왜 이런 기간이 필요할까요? 실업 상태가 일시적인 건지, 진짜 구직이 필요한 건지 확인하려는 목적이에요. 일종의 "관찰 기간"이라고 보면 되죠. 이 7일 동안은 구직활동을 준비하는 시간으로 활용하면 돼요.
      </p>
      <p style={body}>
        대기기간 7일은 첫 지급에만 적용되고, 두 번째 실업인정부터는 빠지지 않아요. 그래서 첫 입금이 다음 달보다 적게 느껴지는 원인 중 하나이기도 하죠.
      </p>

      <BorderBox title="대기기간 핵심 포인트">
        수급자격 인정일로부터 연속 7일<br />
        모든 수급자에게 동일 적용 (예외 없음)<br />
        이 기간의 실업급여는 지급되지 않음<br />
        첫 지급 시에만 적용, 이후 실업인정에는 미적용
      </BorderBox>

      <Calculator
        title="첫 입금일 예상 계산기"
        sliders={[
          {
            id: "elapsed",
            label: "수급자격 인정 후 경과일",
            min: 0,
            max: 30,
            step: 1,
            defaultValue: 14,
            format: (v: number) => `${v}일`,
          },
        ]}
        results={[
          {
            label: "대기기간 종료일",
            getValue: (inputs: Record<string, number>) => Math.max(0, 7 - inputs.elapsed),
            format: (v: number) => v > 0 ? `${v}일 남음` : "종료됨",
          },
          {
            label: "1차 실업인정 가능 시점",
            getValue: (inputs: Record<string, number>) => {
              const remaining = Math.max(0, 7 - inputs.elapsed);
              return remaining > 0 ? remaining + 1 : 0;
            },
            format: (v: number) => v > 0 ? `${v}일 후` : "지금 가능",
          },
          {
            label: "예상 첫 입금까지",
            getValue: (inputs: Record<string, number>) => {
              const waitDays = Math.max(0, 7 - inputs.elapsed);
              return waitDays > 0 ? waitDays + 5 : Math.max(0, 5 - (inputs.elapsed - 7));
            },
            format: (v: number) => v > 0 ? `약 ${v}일 후` : "곧 입금 예정",
            highlight: true,
          },
        ]}
        note="* 실업인정 후 3~5영업일 기준 예상치예요. 고용센터 상황에 따라 달라질 수 있어요."
      />

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 1차 실업인정과 입금 타이밍 + 체크리스트 */}
      <H2>1차 실업인정과 입금 일정</H2>
      <p style={body}>
        대기기간 7일이 끝나면 고용센터에서 <strong>1차 실업인정일</strong>을 지정해줘요. 이 날짜에 맞춰서 실업인정을 신청해야 하죠. 온라인(고용24)이나 고용센터 방문 중 선택할 수 있어요. 1차는 특별한 구직활동 증빙 없이 인정되는 경우가 많아요.
      </p>
      <p style={body}>
        실업인정이 승인되면 <strong>3~5영업일 내에 통장으로 입금</strong>돼요. 월요일에 실업인정을 받았다면 그 주 목~금요일쯤 확인할 수 있는 식이죠. 다만 주말이나 공휴일이 끼면 영업일 기준이라 하루 이틀 더 걸릴 수 있어요.
      </p>
      <p style={body}>
        실업인정일을 놓치면 그 주기의 실업급여를 못 받을 수 있으니 날짜를 꼭 기억해두세요. 고용24 앱에서 알림을 설정하면 놓칠 일이 없죠.
      </p>

      <SectionBadge>첫 입금을 앞당기는 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 첫 입금 금액이 적은 이유 */}
      <H2>첫 입금 금액이 적은 이유</H2>
      <p style={body}>
        첫 입금 금액을 보고 "이게 맞나?" 싶을 수 있어요. <strong>정상이에요.</strong> 대기기간 7일치가 빠지고, 수급자격 인정일부터 1차 실업인정일까지의 일수만 지급되기 때문이죠. 보통 10~15일치 정도가 첫 입금으로 들어와요.
      </p>
      <p style={body}>
        구체적인 예시를 볼게요. 1월 2일에 퇴직하고 1월 5일에 수급자격을 신청했다면, 1월 5~11일이 대기기간이에요. 1월 20일에 1차 실업인정을 받으면, 1월 12~20일(9일치)만 첫 입금 대상이 되는 거죠. 이후 1월 23~25일경에 통장으로 입금돼요.
      </p>
      <p style={body}>
        두 번째 실업인정부터는 <strong>4주(28일)치씩 정상 지급</strong>돼요. 첫 달만 좀 적고, 그 뒤로는 일정한 금액이 꾸준히 들어오니 걱정하지 않아도 되죠.
      </p>

      <GreenBox title="첫 입금 vs 이후 입금 비교">
        첫 입금: 대기기간 7일 제외, 10~15일치 (약 50~80만 원 수준)<br />
        2회차부터: 28일치씩 정상 지급 (약 130~200만 원 수준)<br />
        * 금액은 퇴직 전 평균임금에 따라 달라져요
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 빨리 받으려면 */}
      <H2>입금 일정을 최대한 앞당기는 방법</H2>
      <p style={body}>
        첫 입금을 빠르게 받고 싶다면 <strong>퇴직 직후 바로 움직이는 게 핵심</strong>이에요. 이직확인서 처리가 가장 큰 병목이니, 퇴직하자마자 회사에 "이직확인서 빨리 처리해달라"고 요청하세요. 회사가 10일 넘게 안 해주면 고용센터에 신고할 수 있어요.
      </p>
      <p style={body}>
        이직확인서가 처리되면 <strong>당일에 수급자격 신청과 온라인 교육을 모두 끝내세요</strong>. 교육은 1~2시간이면 이수할 수 있어요. 이걸 하루라도 미루면 대기기간 시작이 그만큼 밀리죠. 수급자격 신청을 빨리 할수록 대기기간도, 1차 실업인정일도 앞당겨지는 구조예요.
      </p>
      <p style={body}>
        마지막으로 <strong>실업인정일에 절대 늦지 마세요</strong>. 지정된 날짜를 놓치면 다음 주기로 밀려서 입금도 그만큼 늦어져요. 고용24 앱에서 실업인정일 알림을 켜두면 까먹을 일이 없죠.
      </p>

      <SectionBadge>입금 빨리 받는 3가지 핵심</SectionBadge>
      <BorderBox title="실전 체크리스트">
        퇴직 즉시 회사에 이직확인서 처리 요청<br />
        이직확인서 처리 당일, 수급자격 신청 + 교육 이수 완료<br />
        1차 실업인정일 절대 놓치지 않기 (고용24 앱 알림 설정)
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 첫 입금에 대해 실제로 많이 궁금해하시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 실업인정 일정과 입금 소요일은 고용센터 상황에 따라 다를 수 있으니, 정확한 일정은 고용24 또는 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
