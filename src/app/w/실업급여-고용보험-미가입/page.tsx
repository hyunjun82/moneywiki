"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "proof", label: "해당 사업장에서 근무했다는 증빙자료가 있다 (근로계약서, 급여명세서 등)" },
  { id: "payslip", label: "급여명세서 또는 통장 입금 내역을 보유하고 있다" },
  { id: "report", label: "고용노동부(1350) 또는 고용센터에 미가입 신고를 할 의사가 있다" },
  { id: "period", label: "근무기간이 180일(피보험단위기간) 이상이다" },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 피보험자격 이력 조회로 가입 여부 확인",
  "근로계약서, 급여명세서, 통장 입금 내역 등 근로 증빙자료 확보",
  "고용노동부(1350) 또는 근로복지공단(1588-0075)에 미가입 신고",
  "소급가입 처리 후 피보험기간 인정 확인",
  "퇴직 후 12개월 이내에 실업급여 신청 (기한 주의)",
];

const FAQS = [
  {
    q: "고용보험 미가입인데 실업급여를 받을 수 있나요?",
    a: "원칙적으로 못 받지만, 소급가입하면 받을 수 있죠. 근로복지공단에 미가입 신고를 하면 과거 근무 기간이 피보험기간으로 인정돼요.",
  },
  {
    q: "소급가입하면 보험료를 내야 하나요?",
    a: "밀린 보험료를 납부해야 해요. 원래 사업주와 근로자가 반반씩 부담하지만, 사업주 귀책이면 전액 사업주 부담으로 처리되기도 하죠.",
  },
  {
    q: "사업주가 협조를 거부하면 어떡하나요?",
    a: "고용노동부에서 직권으로 가입 처리할 수 있어요. 사업주에게는 최대 300만원 과태료가 부과되죠. 사업주 동의 없이도 진행이 가능해요.",
  },
  {
    q: "퇴직 후에도 소급가입이 되나요?",
    a: "가능해요. 퇴직 후에도 미가입 신고를 할 수 있죠. 다만 실업급여 신청 기한(퇴직 후 12개월)이 지나지 않도록 빨리 움직여야 해요.",
  },
  {
    q: "4대보험 중 고용보험만 빠져 있을 수 있나요?",
    a: "드물지만 가능해요. 사업주가 국민연금이나 건강보험은 넣고 고용보험만 누락하는 경우가 간혹 있죠. 고용24에서 피보험자격 이력을 조회하면 바로 확인돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 피보험자격 취득·상실 및 소급가입", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률", url: "https://www.law.go.kr/법령/고용보험및산업재해보상보험의보험료징수등에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 피보험자격 이력 조회", url: "https://www.ei.go.kr" },
      { label: "근로복지공단: 고용보험 가입 확인", url: "https://www.comwel.or.kr" },
      { label: "고용노동부: 고용보험 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "고용보험-적용-제외",
    title: "고용보험 적용 제외 근로자 기준",
    description: "고용보험이 원래 적용 안 되는 경우가 있어요. 적용제외 대상과 예외를 정리했죠.",
  },
  {
    slug: "실업급여-이직확인서-거부",
    title: "이직확인서 발급 거부 시 대처법",
    description: "회사가 이직확인서를 안 내주면 어떻게 해야 하는지 단계별로 알려드릴게요.",
  },
  {
    slug: "일용직-실업급여",
    title: "일용직 실업급여 수급 조건",
    description: "일용직도 고용보험에 가입돼 있으면 실업급여를 받을 수 있어요. 조건을 정리했죠.",
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
          currentSlug="실업급여-고용보험-미가입"
        />
      }
    >
      {/* ── 브레드크럼 + h1 + intro ── */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 소급가입</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고용보험 미가입인데 실업급여?<br />
        소급가입 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2년 넘게 다닌 회사를 퇴직하고 실업급여를 신청하려고 보니까
        고용보험이 안 들어져 있어요. 월급에서 뭔가 빠져나갔는데 정작 보험은 안 되어 있었던 거죠.<br /><br />
        당황스럽겠지만 포기하면 안 돼요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면
        사업주가 고용보험 가입 의무를 안 지킨 경우, <strong>소급가입</strong>을 통해 피보험기간을 인정받고
        실업급여를 수급할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 자격 체크 + 미가입 이유 ── */}
      <H2>소급가입 조건에 해당되는지 어떻게 알 수 있나요?</H2>
      <p style={body}>
        소급가입으로 실업급여를 받으려면 몇 가지 조건이 맞아야 해요. 가장 중요한 건 <strong>근무 사실을 증명할 수 있느냐</strong>죠. 아무런 증빙 없이 &quot;거기서 일했어요&quot;라고만 하면 처리가 어려워요.
      </p>
      <p style={body}>
        그 다음은 근무기간이에요. 실업급여 수급자격 자체가 피보험기간 180일 이상을 요구하니까, 소급가입을 해도 180일이 안 되면 의미가 없죠. 여러 직장의 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>가입기간을 합산</a>할 수 있으니 이전 직장 기록도 같이 따져보세요.
      </p>
      <p style={body}>
        아래 네 가지 항목을 체크해보세요. 전부 해당되면 소급가입 후 실업급여를 받을 가능성이 높아요.
      </p>

      <SectionBadge>소급가입 가능 여부를 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="소급가입으로 실업급여를 받을 가능성이 높아요. 바로 신고를 진행하세요."
        partialMatchText="일부 조건이 부족해요. 증빙자료를 더 확보하거나 고용노동부(1350)에 상담받아보세요."
      />

      <GreenBox>
        1. <strong>사업주 미신고</strong>: 보험료 아끼려고 일부러 안 한 경우<br />
        2. <strong>착오 누락</strong>: 실수로 빠진 경우<br />
        3. <strong>적용제외 오해</strong>: 아르바이트라서 안 된다고 착각한 경우<br />
        4. <strong>사업장 미등록</strong>: 사업장 자체가 등록되지 않은 경우
      </GreenBox>

      <Divider />

      {/* ── 섹션 2: 소급가입 절차 ── */}
      <H2>소급가입 신청 방법은 어떤 절차인가요?</H2>
      <p style={body}>
        소급가입은 원래 가입했어야 할 과거 기간을 지금이라도 가입 처리하는 제도예요. 완료되면 그 기간이 피보험기간으로 인정되고, 실업급여 수급자격을 얻을 수 있죠.
      </p>
      <p style={body}>
        절차는 이래요. 먼저 <strong>고용노동부(1350) 또는 근로복지공단(1588-0075)</strong>에 고용보험 미가입 사업장을 신고해요. 그러면 담당자가 조사에 들어가죠. 이때 근로 사실을 증명할 자료를 내야 해요.
      </p>
      <p style={body}>
        조사가 끝나면 소급가입 처리가 돼요. 밀린 보험료를 납부하고, 피보험기간이 확정되면 실업급여를 신청할 수 있죠. 사업주가 <a href="/w/실업급여-이직확인서-거부" style={{ color: "#1D9E75", textDecoration: "underline" }}>협조를 거부</a>해도 괜찮아요: <strong>고용노동부에서 직권으로 가입 처리</strong>할 수 있으니까요.
      </p>

      <BorderBox>
        1. 미가입 신고 (고용노동부 또는 근로복지공단)<br />
        2. 근로 사실 확인 (증빙자료 제출)<br />
        3. 조사 후 소급가입 처리 (1~2개월 소요)<br />
        4. 밀린 보험료 납부<br />
        5. 피보험기간 확정 → 실업급여 신청
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3: 증빙자료 + 체크리스트 ── */}
      <H2>소급가입 신청에 필요한 증빙자료</H2>
      <p style={body}>
        핵심은 <strong>&quot;내가 그 회사에서 일했다&quot;</strong>는 사실을 증명하는 거예요. 서류가 많을수록 유리하죠. 하나만 있어도 되지만, 여러 개를 갖추면 조사가 빨라져요.
      </p>
      <p style={body}>
        가장 강력한 증거는 <strong>근로계약서</strong>예요. 그 다음이 급여명세서, 급여 입금 내역(통장 거래내역)이죠. 원천징수영수증도 유효해요. 이런 서류가 없다면 출퇴근 기록, 업무 관련 이메일, 동료 증언도 증거로 인정받을 수 있죠.
      </p>
      <p style={body}>
        중요한 건 <strong>다니는 동안 미리 자료를 챙겨두는 것</strong>이에요. 퇴직 후에는 회사에서 자료를 받기 어려울 수 있으니까요. 급여명세서 캡처, 통장 내역 출력, 근로계약서 사본 정도는 지금이라도 보관해두세요.
      </p>

      <SectionBadge>소급가입 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4: 보험료와 과태료 ── */}
      <H2>소급가입 조건 충족 시 보험료와 과태료</H2>
      <p style={body}>
        소급가입하면 밀린 보험료를 납부해야 해요. 원래 고용보험료는 사업주와 근로자가 <strong>각각 0.9%씩</strong> 부담하는 구조죠. 월급 200만원 기준이면 각 18,000원, 합쳐서 매달 36,000원이에요.
      </p>
      <p style={body}>
        미가입 자체가 사업주 의무 위반이니까, 사업주에게 <strong>전액 부담</strong>을 시키는 경우도 있어요. 고용노동부 조사 결과에 따라 달라지죠. 근로자 부담분을 내야 하더라도 실업급여 금액에 비하면 훨씬 적은 금액이에요.
      </p>
      <p style={body}>
        사업주에게는 과태료도 따로 붙어요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면 미가입 사업주에게 <strong>최대 300만원</strong>의 과태료가 부과되죠. 미가입 기간과 근로자 수에 따라 금액이 달라져요.
      </p>

      <GreenBox>
        고용보험료 = 월급 × 0.9% (사업주) + 월급 × 0.9% (근로자)<br />
        소급가입 시 → 밀린 기간 전체 보험료 납부 필요<br />
        사업주 귀책 → 전액 사업주 부담 가능<br />
        미가입 과태료 → 사업주에게 <strong>최대 300만원</strong>
      </GreenBox>

      <Divider />

      {/* ── 섹션 5: 주의사항 ── */}
      <H2>소급가입 신청 전에 이것부터 챙기세요</H2>
      <p style={body}>
        가장 중요한 건 <strong>시간</strong>이에요. 실업급여 신청 기한은 퇴직 후 12개월이죠. 소급가입 처리에 1~2개월이 걸리니까, 퇴직하자마자 바로 신고해야 기한 안에 실업급여를 받을 수 있어요.
      </p>
      <p style={body}>
        소급가입 진행 중이라도 <strong>12개월 기한은 연장되지 않아요</strong>. 처리가 늦어지면 실업급여를 아예 못 받는 상황이 벌어질 수 있죠. 퇴직 후 최대한 빨리 움직이세요.
      </p>
      <p style={body}>
        신고 채널은 여러 곳이에요. 고용노동부 고객상담센터(1350), 근로복지공단(1588-0075), <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>, 관할 고용센터 직접 방문까지: 편한 곳에서 진행하면 돼요. 전화 한 통이면 절차가 시작되죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        고용보험 미가입과 소급가입에 대해 가장 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 소급가입 처리 기간과 보험료 부담은 개별 사안에 따라 달라지니, 고용노동부(1350)에 상담받아보세요." />
    </ArticleLayout>
  );
}
