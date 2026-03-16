"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현재 실업급여를 수급 중이에요" },
  { id: "c2", label: "취업이나 창업 계획이 없어요" },
  { id: "c3", label: "실업인정일에 고용센터 출석이 가능해요" },
  { id: "c4", label: "구직활동 기록을 보관하고 있어요" },
];

const CHECKLIST = [
  "실업인정일을 달력에 미리 표시하고 알림 설정하기",
  "구직활동 증빙자료(입사지원 캡처, 면접확인서) 날짜별로 모아두기",
  "해외 출국 예정이면 출국 전 고용센터에 반드시 사전 신고",
  "단시간 근로(알바)를 하게 됐다면 즉시 고용센터에 신고",
  "수급기간(퇴직 다음날부터 12개월) 만료일 확인해두기",
];

const FAQS = [
  {
    q: "실업인정일 한 번 빠졌는데, 앞으로 실업급여를 아예 못 받나요?",
    a: "아니에요. 빠진 기간만 급여가 안 나올 뿐이죠. 다음 실업인정일에 정상 출석하면 그때부터 다시 지급돼요. 수급기간(12개월) 안에만 출석하면 돼요.",
  },
  {
    q: "알바하면서 실업급여를 받으면 부정수급인가요?",
    a: "신고하지 않고 일하면 부정수급이에요. 받은 금액 환수에 최대 2배 제재금까지 물 수 있죠. 단시간 근로는 신고 후 감액 수급이 가능하니 반드시 고용센터에 알리세요.",
  },
  {
    q: "해외여행 갔다 오면 실업급여가 끊기나요?",
    a: "출국 기간 동안 급여가 정지돼요. 입국 후 수급기간이 남아 있으면 다시 받을 수 있죠. 출국 전에 고용센터에 미리 알려야 불이익이 없어요.",
  },
  {
    q: "취업했다가 3개월 만에 다시 퇴사하면 실업급여를 이어서 받나요?",
    a: "잔여 수급일수가 남아 있으면 이어받을 수 있어요. 다만 새 직장에서 피보험기간이 180일을 넘겼으면 새 수급자격이 생기니, 고용센터에서 확인하세요.",
  },
  {
    q: "실업급여 중단이랑 환수는 같은 건가요?",
    a: "완전히 달라요. 중단은 일시적으로 급여가 안 나오는 거고, 사유 해소 시 재개돼요. 환수는 부정수급이 적발됐을 때 이미 받은 금액을 돌려내야 하는 거예요. 제재금까지 붙으니 차원이 다르죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 실업급여 수급자격 및 정지 사유", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제62조 — 부정수급 환수 및 제재금", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 및 실업인정 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 구직급여 지급 기준 (상담 1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-부정수급",
    title: "실업급여 부정수급 처벌 기준과 환수",
    description: "부정수급 적발 시 환수와 제재금이 어떻게 부과되는지 정리했어요.",
  },
  {
    slug: "실업급여-받으면서-알바",
    title: "실업급여 받으면서 알바 60시간 기준",
    description: "단시간 근로 신고 방법과 감액 기준을 정리했어요.",
  },
  {
    slug: "실업급여-재신청",
    title: "실업급여 재신청 방법과 절차",
    description: "수급 중단 후 다시 신청하는 절차를 정리했어요.",
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
          currentSlug="실업급여-중단"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 수급중단</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 갑자기 끊겼다면?<br />
        중단 사유와 대처 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;어제까지 잘 나오던 실업급여가 왜 안 들어오죠?&rdquo;
      </p>
      <p style={body}>
        한 번 놓쳤다고 수급 자격 자체가 날아가는 건 아니에요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은
        실업급여를 &ldquo;실업 상태&rdquo;에 한해 지급하도록 정하고 있죠.
        이 상태가 깨지거나, 정해진 의무를 빠뜨리면 급여가 멈춰요.
      </p>
      <p style={body}>
        중단 사유별로 재개 방법이 전부 달라요.
        사유를 정확히 파악해야 빠르게 되살릴 수 있으니, 지금부터 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 중단 사유 4가지 */}
      <H2>중단 사유에는 어떤 것들이 있나요?</H2>
      <SectionBadge>수급 상태 체크</SectionBadge>

      <p style={body}>
        가장 흔한 건 <strong>취업</strong>이에요. 정규직뿐 아니라 계약직, 아르바이트, 자영업 전부 해당되죠.
        일을 시작한 순간 &ldquo;실업 상태&rdquo;가 깨지니까 급여가 멈춰요.
        사업자등록을 내거나 실질적으로 사업을 운영해도 마찬가지고요.
      </p>
      <p style={body}>
        두 번째는 <strong>구직활동 미이행</strong>이에요.
        실업급여는 &ldquo;적극적으로 일자리를 찾는 중&rdquo;이라는 전제 아래 지급되죠.
        워크넷 입사지원, 면접, 직업훈련 같은 기록 없이 실업인정을 신청하면 불인정으로 처리돼요.
        증빙이 하나도 없으면 그 차수의 급여가 통째로 빠지는 거예요.
      </p>
      <p style={body}>
        세 번째는 <strong>실업인정일 불참</strong>이에요.
        2~4주마다 돌아오는 실업인정일에 출석하지 않으면 해당 기간 급여를 못 받아요.
        네 번째는 <strong>해외 출국</strong>이죠.
        국내에서 구직활동을 할 수 없는 상태이니 출국 기간 동안 급여가 자동으로 정지돼요.
      </p>

      <GreenBox title="중단 사유 4가지">
        취업 — 정규직·계약직·알바·자영업 전부 해당<br />
        구직활동 미이행 — 증빙 없는 실업인정 → 불인정 처리<br />
        실업인정일 불참 — 해당 기간 급여 미지급<br />
        해외 출국 — 출국 기간 동안 자동 정지
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="현재 수급이 중단될 가능성이 낮아요. 실업인정일 출석과 구직활동을 꾸준히 하세요."
        partialMatchText="일부 항목이 해당돼요. 중단 사유가 생기기 전에 고용센터에 미리 상담받으세요."
      />

      <Divider />

      {/* 섹션 2 — 불인정 vs 출국 정지 */}
      <H2>불인정과 출국 정지, 중단 사유가 다른가요?</H2>

      <p style={body}>
        실업인정 <strong>불인정</strong>은 신청은 했는데 인정을 못 받는 거예요.
        구직활동 증빙이 부족하거나, 허위로 작성했거나, 취업 상태를 숨긴 경우가 해당되죠.
        불인정 처리되면 그 기간 급여가 나오지 않아요.
        허위 신고가 심하면 부정수급으로 넘어갈 수도 있고요.
      </p>
      <p style={body}>
        해외 출국은 맥락이 좀 달라요.
        출국 자체가 &ldquo;국내 구직활동 불가&rdquo;를 뜻하니까 자동으로 <strong>정지</strong>가 되죠.
        출국 전에 고용센터에 미리 알려야 해요.
        알리지 않고 나갔다가 실업인정을 놓치면 불인정으로 처리될 수 있으니까요.
      </p>
      <p style={body}>
        둘 다 공통점이 하나 있죠.
        <strong>수급기간(퇴직 다음날부터 12개월)이 남아 있으면 다시 받을 수 있다</strong>는 거예요.
        불인정은 다음 실업인정일에 증빙을 제대로 갖추면 되고, 해외출국은 입국 후 고용센터에 재신청하면 돼요.
      </p>

      <BorderBox title="불인정 vs 출국 정지">
        불인정 → 증빙 미비·허위 신고 시 해당 기간만 급여 미지급<br />
        출국 정지 → 출국 기간 동안 자동 정지, 입국 후 재개 가능<br />
        공통 → 수급기간(12개월) 안이면 다시 받을 수 있음
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 중단 방지 체크리스트 */}
      <H2>중단을 막는 대처 방법 5가지</H2>
      <SectionBadge>중단 방지 체크리스트</SectionBadge>

      <p style={body}>
        중단되는 이유를 살펴보면 대부분 예방 가능한 것들이에요.
        실업인정일을 깜빡했거나, 구직활동 증빙을 챙기지 않아서 생기는 경우가 절대다수죠.
        아래 다섯 가지를 습관으로 만들면 중단 위험이 확 줄어들어요.
      </p>
      <p style={body}>
        해외 출국 예정이라면 반드시 사전 신고를 하세요.
        출국 전에 고용센터에 알리면 출국 기간만 정지되고, 입국 후 정상적으로 재개가 돼요.
        사전 신고 없이 나갔다가 실업인정일을 놓치면 불인정 처리에 불이익까지 붙을 수 있죠.
      </p>
      <p style={body}>
        알바를 시작했다면 그 즉시 신고하는 게 핵심이에요.
        단시간 근로는 신고만 하면 감액 수급이 가능하지만, 신고 없이 일하면 부정수급으로 넘어가요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 신고가 되니까 번거롭지도 않아요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 취업 후 재실업 */}
      <H2>취업 후 재실업 시 대처 방법</H2>

      <p style={body}>
        실업급여를 받다가 취업했는데 얼마 안 돼서 다시 퇴사했다면 어떻게 될까요?
        이 경우 <strong>잔여 수급일수</strong>를 이어받을 수 있죠.
        원래 150일치를 받을 수 있었는데 90일까지 받고 취업했다면, 재실업 시 남은 60일을 이어서 받는 구조예요.
      </p>
      <p style={body}>
        여기서 중요한 분기점이 하나 있죠.
        새 직장에서 <strong>고용보험 피보험기간이 180일을 넘기면</strong> 새로운 수급자격이 생겨요.
        잔여일수가 아니라 새 조건으로 실업급여를 받게 되는 거예요.
        반대로 180일 미만이면 기존 잔여일수를 이어받고요.
      </p>
      <p style={body}>
        어느 쪽이든 <strong>수급기간(퇴직 다음날부터 12개월)</strong> 안에 신청해야 해요.
        이 기한을 넘기면 남은 일수가 있어도 못 받죠.
        재실업 후 빠르게{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>나 관할 고용센터에 방문하는 게 안전해요.
      </p>

      <Divider />

      {/* 섹션 5 — 중단 vs 환수 차이 */}
      <H2>중단 사유와 환수를 혼동하지 마세요</H2>

      <p style={body}>
        중단은 <strong>급여가 일시적으로 안 나오는</strong> 거예요.
        실업인정을 놓쳤거나 해외에 나간 경우처럼, 사유가 해소되면 다시 받을 수 있죠.
        이미 받은 돈을 돌려내야 하는 건 아니에요.
      </p>
      <p style={body}>
        환수는 완전히 다른 문제예요.
        거짓으로 신고해서 급여를 탔다면 <strong>부정수급</strong>이 되죠.
        받은 금액 전부를 돌려내야 하고, 추가로 받은 금액의 <strong>최대 5배</strong>까지 추가징수가 붙어요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제62조</a>에 명시된 규정이죠.
      </p>
      <p style={body}>
        실업인정일을 놓친 건 중단이지 환수가 아니에요.
        그 부분은 너무 걱정하지 않아도 돼요.
        다만 취업 사실을 숨기고 급여를 계속 타면 환수 대상이 되니까, 상황이 바뀌는 즉시 고용센터에 알리세요.
      </p>

      <GreenBox title="중단 vs 환수">
        중단 — 급여 일시 정지, 사유 해소 시 재개 가능, 반환 의무 없음<br />
        환수 — 부정수급 적발 시 수령액 전액 반환 + 최대 5배 추가징수
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 중단과 재개에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 판단은 고용센터 심사에 따라 다르니, 고용센터(1350)에 사전 상담을 받아보세요." />
    </ArticleLayout>
  );
}
