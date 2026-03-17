"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "급여명세서 또는 통장 내역으로 임금체불 사실을 증명할 수 있어요" },
  { id: "c2", label: "체불 증빙자료(카톡, 문자, 이메일 등)를 보관하고 있어요" },
  { id: "c3", label: "고용보험 피보험기간이 180일 이상이에요" },
  { id: "c4", label: "회사에 퇴직 의사를 명확히 표시했어요" },
];

const CHECKLIST = [
  "급여명세서로 체불 금액과 기간 확인",
  "통장 거래내역에서 실제 입금 날짜 캡처",
  "카톡 또는 문자로 월급 요청한 대화 기록 저장",
  "근로계약서에서 급여일 확인",
  "이직확인서 퇴직 사유가 '임금체불'로 기재되었는지 확인",
];

const FAQS = [
  {
    q: "월급 한 달만 밀려도 실업급여 받을 수 있나요?",
    a: "한 달 체불만으로는 인정이 어려워요. 2개월 이상 지급이 지연되거나, 임금의 30% 이상이 체불되어야 정당한 이직 사유로 인정되죠. 부분 체불도 비율 기준을 넘으면 해당돼요.",
  },
  {
    q: "사장이 이직확인서를 '자진퇴사'로 적으면 어떡하죠?",
    a: "고용센터에 이의를 제기하면 돼요. 급여명세서, 통장 내역 같은 증빙자료를 제출하면 퇴직 사유를 정정할 수 있죠. 근로복지공단(1588-0075)에도 상담 가능해요.",
  },
  {
    q: "밀린 월급이랑 실업급여를 동시에 받을 수 있나요?",
    a: "받을 수 있죠. 실업급여와 체불임금은 완전히 별개예요. 노동청에 진정을 넣으면 체불임금을 돌려받을 수 있고, 실업급여는 고용센터에서 따로 신청하면 돼요.",
  },
  {
    q: "회사가 이직확인서 자체를 안 줘요. 방법이 없나요?",
    a: "근로복지공단에 피보험자격 상실 확인을 직접 신청할 수 있어요. 계약서, 급여내역 등 서류를 제출하면 회사 협조 없이도 절차가 진행되죠.",
  },
  {
    q: "체불임금을 받으면 실업급여가 줄어드나요?",
    a: "줄어들지 않아요. 체불임금은 원래 받아야 할 돈을 뒤늦게 돌려받는 것이고, 실업급여는 고용보험에서 지급하는 별도의 급여예요. 둘은 산정 기준이 다르기 때문에 서로 영향을 주지 않죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제58조: 수급자격의 제한 (정당한 이직 사유)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 별표2: 정당한 이직 사유 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 임금체불 신고 및 상담", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-임금체불",
    title: "임금체불 퇴직 시 실업급여 수급 조건",
    description: "월급을 못 받아서 퇴사했다면 비자발적 퇴사로 인정돼요.",
  },
  {
    slug: "임금삭감-퇴직-실업급여",
    title: "임금삭감으로 퇴직하면 실업급여 받을 수 있을까",
    description: "급여가 15% 이상 깎여서 퇴사한 경우에도 정당한 사유가 돼요.",
  },
  {
    slug: "실업급여-정당한-퇴사-사유",
    title: "실업급여 인정 퇴사 사유 7가지",
    description: "비자발적 퇴사로 인정되는 사유를 한눈에 정리했어요.",
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
          currentSlug="임금체불-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 &middot; 고용보험 &middot; 임금체불</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        월급 밀려서 퇴사해도 실업급여?<br />
        체불 기준과 신청까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;월급이 계속 밀리는데, 내가 먼저 나가면 실업급여 못 받는 건가요?&quot;<br />
        받을 수 있죠. 월급을 안 주는 건 <strong>회사가 근로계약을 어긴 것</strong>이니까요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제58조</a>가
        임금체불 퇴사를 <strong>비자발적 퇴사</strong>로 분류하고 있죠.
        2개월 이상 지연되거나 임금의 30% 이상이 체불되면 정당한 이직 사유에 해당하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 왜 임금체불이 비자발적 퇴사인가 ── */}
      <H2>체불 기준은 얼마나 밀려야 해당되나요?</H2>
      <p style={body}>
        일하고 돈을 못 받으면 생계가 흔들리죠. <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙 별표2</a>는 이런 상황을 <a href="/w/실업급여-정당한-퇴사-사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>&quot;근로자가 계속 근로할 수 없는 사유&quot;</a>로 규정하고 있죠. 약속한 급여를 회사가 지키지 않은 거니까, 퇴사해도 근로자 잘못이 아닌 거예요.
      </p>
      <p style={body}>
        세 가지 조건 중 <strong>하나만 해당되면</strong> 충분해요. 첫째, <strong>2개월 이상 임금 지급이 지연</strong>된 경우. 둘째, <strong>임금의 30% 이상이 체불</strong>된 경우. 셋째, <strong>반복적으로 제때 지급되지 않은</strong> 경우예요. 전액이 밀리지 않더라도 일부 체불이 30%를 넘기면 해당되죠.
      </p>
      <p style={body}>
        여기서 중요한 건 &quot;내가 먼저 퇴사했느냐&quot;가 아니에요. <strong>왜 나갈 수밖에 없었느냐</strong>가 판단 기준이죠. 월급도 안 주는 회사에서 계속 일하라고 강제할 수 없으니까, 그 퇴사가 정당한 선택으로 인정되는 거예요.
      </p>

      <GreenBox title="체불 인정 기준: 하나만 충족하면 돼요">
        1. 2개월 이상 임금 지급이 지연된 경우<br />
        2. 임금의 30% 이상이 체불된 경우<br />
        3. 반복적으로 임금이 제때 지급되지 않은 경우
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 확인해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 가능성이 높아요. 증빙자료를 갖추고 고용센터에 상담해보세요."
        partialMatchText="일부 항목이 충족되지 않았어요. 고용센터(1350)에서 사전 상담을 받아보세요."
      />

      <Divider />

      {/* ── 섹션 2: 증빙자료 준비 ── */}
      <H2>신청 전에 꼭 챙겨야 할 체불 증빙자료는요?</H2>
      <p style={body}>
        고용센터 담당자가 &quot;진짜 체불이 맞는지&quot; 서류로 확인해요. 말로만 &quot;월급 안 줬다&quot;고 주장하면 인정이 어렵죠. 퇴직하면 회사 자료에 접근이 막히니, 재직 중에 증거를 모아두는 게 핵심이에요.
      </p>
      <p style={body}>
        가장 강력한 증빙은 <strong>통장 거래내역</strong>이에요. 급여일에 입금이 없다는 사실을 통장으로 보여주면 반박이 어렵죠. 여기에 <strong>급여명세서</strong>를 붙이면 &quot;얼마를 받기로 했는데 실제 입금은 이만큼이었다&quot;는 게 명확해져요. <strong>근로계약서</strong>로 급여일과 약정 금액을 확인하는 것도 빠뜨리면 안 되고요.
      </p>
      <p style={body}>
        카카오톡이나 문자로 &quot;사장님, 월급 언제 들어오나요?&quot;라고 보낸 기록도 훌륭한 증빙이 되죠. 체불 사실을 인지하고 요구까지 했다는 걸 보여주는 거니까요. 갑자기 그만둔 것보다 <strong>지급을 요청한 뒤 퇴사한 흐름</strong>이 심사에서 훨씬 유리해요.
      </p>

      <BorderBox title="증빙서류 우선순위">
        1순위: 통장 거래내역 (급여일 입금 없음 증명)<br />
        2순위: 급여명세서 + 근로계약서 (약정 금액과 실수령 대조)<br />
        3순위: 카톡/문자 대화 기록 (체불 인지 및 지급 요구)<br />
        4순위: 임금체불 진정서 접수 확인증
      </BorderBox>

      <SectionBadge>퇴직 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      {/* ── 중간 관련 글 + 광고 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3: 이직확인서 대응 ── */}
      <H2>이직확인서 사유가 신청 결과를 좌우해요</H2>
      <p style={body}>
        고용센터가 가장 먼저 보는 서류가 <strong>이직확인서</strong>예요. 여기에 퇴직 사유가 &quot;임금체불&quot; 또는 &quot;근로조건 불이행&quot;으로 기재되어 있으면 수급자격 인정이 수월하죠. 이직확인서 한 장이 심사 방향을 크게 좌우해요.
      </p>
      <p style={body}>
        문제는 임금을 체불하는 회사가 이걸 순순히 써줄 리 없다는 거죠. &quot;자진퇴사&quot;나 &quot;개인 사유&quot;로 적어버리는 경우가 흔하죠. 당황할 필요 없어요. <strong>고용센터에 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의를 제기</a></strong>하면 되니까요. 통장 내역, 급여명세서, 대화 기록을 제출하면 퇴직 사유를 정정받을 수 있죠.
      </p>
      <p style={body}>
        이직확인서 자체를 발급해주지 않는 회사도 있죠. 그럴 때는 <strong>근로복지공단(1588-0075)</strong>에 전화해서 피보험자격 상실 확인을 직접 신청하세요. 계약서와 급여내역을 제출하면 회사 협조 없이도 절차가 진행돼요. 회사가 비협조적이라고 실업급여를 포기할 이유가 전혀 없어요.
      </p>

      <Divider />

      {/* ── 섹션 4: 체불임금 회수 ── */}
      <H2>체불임금 회수와 실업급여는 별개로 진행돼요</H2>
      <p style={body}>
        실업급여를 받으면 체불임금은 포기해야 하는 건 아니에요. 둘은 <strong>완전히 다른 돈</strong>이죠. 실업급여는 고용보험 기금에서, 체불임금은 회사에서 나오니까요. 동시에 청구해도 아무 문제 없어요.
      </p>
      <p style={body}>
        체불임금을 돌려받는 가장 일반적인 경로는 <strong>노동청 진정</strong>이에요. 관할 지방고용노동청에 진정서를 넣으면 근로감독관이 사업장을 조사하죠. 체불이 확인되면 사업주에게 시정 명령이 떨어지고, 대부분 이 단계에서 해결돼요.
      </p>
      <p style={body}>
        회사가 도산했거나 사업주 연락이 끊긴 경우엔 <strong>체당금 제도</strong>를 활용할 수 있죠. 근로복지공단이 체불임금 일부를 먼저 지급하고, 나중에 사업주에게 구상권을 행사하는 구조예요. 민사소송이라는 최후 수단도 남아있지만, 시간과 비용을 생각하면 노동청 진정부터 시작하는 게 현실적이죠.
      </p>

      <Divider />

      {/* ── 섹션 5: 수급기간과 신청 절차 ── */}
      <H2>실업급여 신청 순서대로 바로 시작하세요</H2>
      <p style={body}>
        임금체불 퇴사도 <a href="/w/실업급여-수급기간-몇개월-받나요" style={{ color: "#1D9E75", textDecoration: "underline" }}>수급기간</a>은 <strong>일반 근로자와 동일</strong>해요. 고용보험 가입 기간과 나이에 따라 120일~270일까지 받을 수 있죠. 1년 미만 가입이면 120일, 10년 이상이면 50세 미만 240일 / 50세 이상 270일이에요.
      </p>
      <p style={body}>
        신청 순서는 이래요. 증빙자료(급여명세서, 통장 내역, 대화 기록)를 먼저 갖추고, <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 이직확인서를 조회하세요. 수급자격 신청자 온라인 교육을 이수한 뒤, 관할 고용센터에 방문해서 수급자격 인정 신청을 하면 되죠.
      </p>
      <p style={body}>
        심사 단계에서 체불 증빙을 제출하고, 수급자격이 인정되면 실업인정일마다 구직활동을 보고해요. 그러면 실업급여가 통장으로 들어오죠. 퇴직 후 <strong>12개월 이내에 신청</strong>해야 하니까 미루지 마세요. 빨리 움직일수록 한 달이라도 더 받을 수 있으니까요.
      </p>

      <GreenBox title="아직 재직 중이라면 사전 상담부터">
        고용센터(1350)에 전화해서 &quot;임금체불 퇴직인데 실업급여 가능한지&quot; 먼저 물어보세요.<br />
        어떤 서류가 필요한지 미리 안내받을 수 있고, 상담은 무료예요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임금체불 퇴직과 실업급여에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
