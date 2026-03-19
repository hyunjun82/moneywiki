"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 일방적으로 근로조건을 변경했어요 (임금, 근무지, 업무 등)" },
  { id: "c2", label: "변경 전후를 증명할 서류가 있어요 (계약서, 급여명세서, 발령문 등)" },
  { id: "c3", label: "변경이 원인이 돼서 퇴직한 거예요 (비자발적 퇴사 인정)" },
  { id: "c4", label: "퇴직 전 18개월 중 고용보험 가입기간이 180일 이상이에요" },
];

const CHECKLIST = [
  "근로계약서 원본 보관 (변경 전 조건 증명)",
  "급여명세서 삭감 전후 비교 준비",
  "인사발령 통보서, 업무 변경 공문 확보",
  "이메일, 문자 등 회사 통보 기록 저장",
  "이직확인서 퇴직 사유 기재 내용 확인",
];

const FAQS = [
  {
    q: "임금이 깎였는데 그만두면 실업급여를 받을 수 있나요?",
    a: "받을 수 있죠. 임금이 20% 이상 삭감되면 정당한 퇴사 사유로 인정돼요. 20% 미만이라도 생활이 어려울 정도라면 고용센터 심사에서 인정받을 수 있고요.",
  },
  {
    q: "근무지가 바뀌면 실업급여 대상이 되나요?",
    a: "출퇴근이 불가능할 정도로 멀어지면 정당한 사유예요. 왕복 3시간 이상 걸리거나 가족과 분리돼야 하는 수준이면 인정되죠. 회사가 이사비용이나 주거 지원을 안 해주면 더 확실해요.",
  },
  {
    q: "전혀 다른 업무로 배치됐는데 그만두면요?",
    a: "본인 전공이나 경력과 완전히 다른 업무로 바뀌면 정당한 사유가 될 수 있죠. 다만 비슷한 업무 내 부서 이동은 인정이 어렵고요. 업무 성격 자체가 달라져야 해요.",
  },
  {
    q: "이직확인서에 '자발적 퇴사'로 적혀 있으면 어떻게 하죠?",
    a: "고용센터에 이의를 제기하면 돼요. 증빙자료를 제출해서 근로조건 변경 사실을 입증하면 비자발적 퇴사로 정정할 수 있죠.",
  },
  {
    q: "야간 근무로 전환됐는데 이것도 정당한 퇴사 사유가 되나요?",
    a: "될 수 있어요. 주간 근무에서 야간 근무로 일방적으로 바뀌면 생활 패턴이 완전히 달라지죠. 가족 돌봄이나 건강 문제가 있으면 고용센터에서 정당한 사유로 인정하는 경우가 많아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 수급자격의 제한 (정당한 이직 사유)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙: 정당한 이직 사유 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 근로조건 변경 관련 상담", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "임금삭감-퇴직-실업급여",
    title: "임금삭감 퇴직 시 실업급여",
    description: "월급이 일방적으로 깎였다면 정당한 이직 사유에 해당되죠.",
  },
  {
    slug: "자발적-퇴사-실업급여",
    title: "자발적 퇴사해도 실업급여 받는 방법",
    description: "정당한 사유만 있으면 본인이 먼저 퇴사해도 실업급여를 받을 수 있죠.",
  },
  {
    slug: "실업급여-정당한-퇴사-사유",
    title: "실업급여 인정 퇴사 사유 전체 목록",
    description: "어떤 사유가 비자발적 퇴사로 인정되는지 한눈에 볼 수 있어요.",
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
          currentSlug="근로조건-변경-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 근로조건변경</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로조건 바뀌어서 퇴사했다면?<br />
        수급 인정 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;회사가 갑자기 월급을 깎겠다고 해요. 이런 상황에서 그만두면 실업급여를 못 받는 건가요?&rdquo;<br />
        받을 수 있죠. 회사가 동의 없이 근로조건을 불리하게 바꾸면 <strong>정당한 퇴사 사유</strong>에 해당하니까요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은 본인이 먼저 퇴사했더라도 근로조건 변경이 원인이면 비자발적 이직과 동일하게 실업급여를 인정해요.
        임금 <strong>20% 이상</strong> 삭감, 근무지 왕복 <strong>3시간</strong> 이상: 이런 기준을 지금부터 하나씩 짚어드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 정당한 이직 사유가 되는 경우 */}
      <H2>어떤 변경이 수급 인정 조건에 해당하나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a>이 기준을 정해놨어요. 근로조건이 <strong>크게 불리해지면</strong> 정당한 이직 사유로 인정되죠. 임금 삭감, 근무지 변경, 업무 변경, 근로시간 변경: 이 네 가지가 대표적이에요.
      </p>
      <p style={body}>
        핵심은 <strong>&ldquo;본인 동의 없이 일방적으로 바뀌었는가&rdquo;</strong>예요. 노사 협의를 거치거나 근로자가 동의한 변경은 정당한 사유로 보기 어렵죠. 반대로 회사가 통보만 하고 강행했다면, 본인이 먼저 퇴사하더라도 실업급여를 받을 수 있죠.
      </p>
      <p style={body}>
        회사 사정이 어려워서 바뀐 경우라도 똑같아요. 경영난으로 임금을 깎거나 사업장을 이전했더라도 근로자 입장에서 받아들이기 어려운 수준이면 퇴사할 권리가 보장되죠. 고용센터는 &ldquo;근로자에게 얼마나 불이익이 생겼는가&rdquo;를 중심으로 판단하니까요.
      </p>

      <GreenBox>
        임금 삭감 (20% 이상이면 확실, 미만이라도 가능)<br />
        근무지 변경 (통근 불가능한 수준)<br />
        업무 변경 (전혀 다른 직무로 배치)<br />
        근로시간 변경 (야간 전환, 풀타임→파트타임 등)
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 근로조건 변경에 의한 실업급여 수급 자격을 갖췄어요. 증빙자료를 챙겨서 고용센터에 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2: 임금 삭감과 근무지 변경 */}
      <H2>임금 삭감과 근무지 변경, 인정 기준이 뭔가요?</H2>
      <p style={body}>
        <a href="/w/임금삭감-퇴직-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금 삭감</a>이 가장 흔한 사유예요. <strong>월급이 20% 이상 줄어들면</strong> 정당한 퇴사 사유로 인정되죠. 300만 원 받던 사람이 240만 원으로 깎이면 정확히 20% 삭감이에요. 이 경우 본인이 먼저 퇴사하더라도 실업급여 신청이 가능하죠.
      </p>
      <p style={body}>
        20% 미만이라고 무조건 탈락하는 건 아니에요. 생활이 어려울 정도로 소득이 줄었다면 고용센터에서 종합 판단을 하죠. 기본급은 그대로인데 수당이 대폭 삭감된 경우도 해당될 수 있고요. 심사 기준은 &ldquo;계약서상 금액&rdquo;이 아니라 실수령액이에요.
      </p>
      <p style={body}>
        <a href="/w/출퇴근-곤란-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>근무지 변경</a>은 <strong>통근이 불가능한 수준</strong>이어야 인정돼요. 서울에서 일하던 사람이 부산 지사로 발령받으면 당연히 해당되죠. 왕복 출퇴근 3시간 이상이 기준이에요. 회사가 이사비용이나 주거 지원을 제공하면 판단이 달라질 수 있지만, 아무 지원 없이 강행했다면 정당한 사유가 돼요.
      </p>

      <BorderBox>
        임금 삭감 → 20% 이상이면 확실, 미만이라도 심사 가능<br />
        근무지 변경 → 왕복 3시간 이상, 회사 지원 없을 때<br />
        공통점 → 본인 동의 없는 일방적 변경이어야 함
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 업무 변경과 근로시간 변경 */}
      <H2>업무 변경과 근로시간 변경 인정 조건</H2>
      <p style={body}>
        업무 변경은 <strong>직무 성격 자체가 바뀌었을 때</strong> 인정돼요. 개발자로 입사했는데 갑자기 영업을 시키면 문제가 되죠. 본인 전공이나 경력과 전혀 맞지 않는 업무로 바뀌면 정당한 퇴사 사유가 될 수 있고요.
      </p>
      <p style={body}>
        비슷한 업무 범위 안에서 부서만 이동하는 건 대부분 인정이 안 돼요. 마케팅팀에서 홍보팀으로 가는 수준은 업무 성격이 크게 다르지 않으니까요. &ldquo;사무직에서 현장직으로&rdquo;, &ldquo;기술직에서 단순노무직으로&rdquo;: 이 정도 변화가 있어야 하죠.
      </p>
      <p style={body}>
        근로시간 변경은 대표적으로 야간 전환이에요. 주간 근무였는데 갑자기 야간으로 바뀌면 생활 패턴이 완전히 무너지죠. 가족 돌봄이나 건강 문제가 겹치면 더 심각하고요. 풀타임에서 파트타임으로 전환돼 임금까지 줄어드는 것도 해당돼요. 결국 <strong>근로자의 일상에 심각한 타격</strong>을 주는 변경인지가 핵심 기준이에요.
      </p>

      <Divider />

      {/* 섹션 4: 증빙자료 준비 */}
      <H2>수급 인정에 필요한 증빙자료</H2>
      <p style={body}>
        정당한 사유를 주장하려면 증거가 뒷받침돼야 해요. &ldquo;임금이 깎였다&rdquo;고 말로만 해서는 고용센터에서 인정해주기 어렵죠. 퇴직하기 <strong>전에 미리</strong> 자료를 모아두는 게 가장 중요해요.
      </p>
      <p style={body}>
        <strong>근로계약서</strong>가 핵심 서류예요. 원래 약속된 조건이 뭐였는지 증명해주니까요. 여기에 <strong>급여명세서</strong>를 함께 제출하면 삭감 전후를 비교할 수 있죠. 두 서류를 나란히 보여주면 &ldquo;계약 조건과 달라졌다&rdquo;는 게 명확해져요.
      </p>
      <p style={body}>
        <strong>인사발령 통보서</strong>는 근무지나 업무 변경의 직접 증거가 되죠. 공식 문서가 없더라도 회사에서 보낸 <strong>이메일, 문자, 카카오톡 메시지</strong>까지 증빙으로 쓸 수 있어요. 퇴사를 결심했다면 이런 기록을 절대 삭제하지 말고 캡처해서 따로 보관해두세요.
      </p>

      <SectionBadge>퇴직 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5: 퇴사 전 절차와 고용센터 심사 */}
      <H2>퇴사 전에 이 조건부터 챙기세요</H2>
      <p style={body}>
        바로 그만두지 마세요. 먼저 회사에 <strong>서면으로 이의를 제기</strong>하는 게 좋아요. &ldquo;근로조건 변경에 동의하지 않는다&rdquo;는 내용을 이메일이나 내용증명으로 보내두세요. 이 기록 자체가 나중에 &ldquo;일방적 변경이었다&rdquo;는 증거가 되죠.
      </p>
      <p style={body}>
        이의를 제기했는데도 회사가 강행하면 그때 퇴사 의사를 밝히세요. 퇴직할 때 반드시 <strong>이직확인서</strong>를 요청하고, 이직 사유란에 &ldquo;근로조건 변경&rdquo;이 명시되는지 확인해야 해요. 회사가 &ldquo;자발적 퇴사&rdquo;로 처리해버리면 나중에 수급자격이 막힐 수 있으니까요.
      </p>
      <p style={body}>
        고용센터에 신청하면 담당자가 이직확인서와 증빙자료를 보고 수급자격을 심사해요. 만약 불인정 결정이 나오더라도 <strong>60일 이내에 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청</a></strong>이 가능하죠. 추가 증거를 첨부해서 재심사를 받으면 되고요. 퇴직 전에 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>나 고용센터(1350)에 사전 상담을 받아두면 심사 과정이 훨씬 수월해져요.
      </p>

      <GreenBox>
        퇴직 전에 고용센터(1350)에 전화해서<br />
        &ldquo;내 상황이 정당한 사유에 해당하는지&rdquo; 먼저 물어보세요.<br />
        사전 상담은 무료이고, 심사 결과에 영향을 주지 않아요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        근로조건 변경과 실업급여에 대해 실제로 자주 나오는 질문만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
