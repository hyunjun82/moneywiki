"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용보험법 시행규칙의 정당한 이직 사유에 해당해요" },
  { id: "c2", label: "사유를 증명할 증빙자료를 갖고 있어요" },
  { id: "c3", label: "이직확인서에 퇴직 사유가 정확히 기재돼 있어요" },
  { id: "c4", label: "퇴직 전 고용센터(1350) 사전 상담을 받을 예정이에요" },
];

const CHECKLIST = [
  "사유별 증빙자료 확보: 급여명세서, 통장 내역, 녹음 파일, 진단서 등",
  "퇴직 전 고용센터(1350) 사전 상담: 인정 가능성 미리 확인",
  "이직확인서 퇴직 사유 확인: 회사 기재 내용이 사실과 다르면 정정 요청",
  "퇴직 후 12개월 이내 실업급여 신청: 기한 넘기면 수급 불가",
  "불인정 시 60일 이내 이의신청 가능: 추가 증거 첨부해서 재심사 요청",
];

const FAQS = [
  {
    q: "내가 먼저 퇴사했는데, 실업급여 신청하면 무조건 거절당하나요?",
    a: "아니에요. 고용보험법에서 정한 정당한 이직 사유에 해당하면 자발적 퇴사여도 실업급여를 받을 수 있죠. 임금체불, 괴롭힘, 통근 곤란, 건강 문제 등이 대표적이에요.",
  },
  {
    q: "회사가 이직확인서에 '자발적 퇴사'로 적었으면 끝인 건가요?",
    a: "이직확인서만으로 결정되는 건 아니에요. 고용센터에 정당한 사유를 증빙자료와 함께 제출하면 재판단을 받을 수 있죠. 회사에 정정을 요청할 수도 있고, 회사가 거부하면 고용센터가 직접 확인 조사를 진행해요.",
  },
  {
    q: "상사가 싫어서 퇴사하면 괴롭힘으로 인정받을 수 있나요?",
    a: "'상사가 마음에 안 든다'는 건 인정이 어려워요. 지속적이고 반복적인 괴롭힘이 있었고, 이를 증명할 증거(녹음, 문자, 이메일 등)가 필요하죠. 회사에 신고했는데 조치를 안 한 기록도 중요해요.",
  },
  {
    q: "고용센터 심사에서 떨어지면 방법이 없나요?",
    a: "60일 이내에 이의신청을 할 수 있어요. 추가 증거를 첨부해서 재심사를 받게 되죠. 이의신청에서도 안 되면 심사청구, 재심사청구 절차가 남아 있으니 바로 포기할 필요 없어요.",
  },
  {
    q: "퇴직 사유가 여러 개 겹치면 유리한가요?",
    a: "네, 사유가 많을수록 인정 가능성이 높아져요. 임금체불에 괴롭힘까지 동시에 발생했다면 두 가지 모두 증빙자료를 따로따로 준비하세요. 고용센터 심사 때 어느 하나라도 인정되면 수급 자격이 생기죠.",
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
      { label: "고용노동부: 실업급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "자발적-퇴사-실업급여",
    title: "자발적 퇴사해도 실업급여 받는 방법",
    description: "자발적 퇴사와 실업급여의 관계를 전체적으로 정리한 글이에요.",
  },
  {
    slug: "근로조건-변경-실업급여",
    title: "근로조건 변경으로 퇴직 시 실업급여",
    description: "계약과 다른 업무 지시를 받아 퇴직했을 때 실업급여 받는 법을 정리했어요.",
  },
  {
    slug: "직장내-괴롭힘-실업급여",
    title: "직장 내 괴롭힘으로 퇴사하면 실업급여",
    description: "괴롭힘 증빙 방법과 실업급여 신청 절차를 정리했어요.",
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
          currentSlug="실업급여-정당한-퇴사-사유"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 정당한퇴사사유</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        어떤 퇴사가 정당한 사유일까?<br />
        조건부터 증빙 서류
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;내가 먼저 그만뒀으니까 실업급여는 포기해야겠지?&quot;<br />
        꼭 그렇지 않아요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은
        자발적 퇴사여도 <strong>정당한 이직 사유</strong>가 있으면 실업급여를 지급하도록 정해두고 있죠.<br /><br />
        임금체불, 직장 내 괴롭힘, 건강 문제처럼 &quot;어쩔 수 없이 나온&quot; 상황이라면
        비자발적 퇴사와 똑같이 실업급여를 받을 수 있죠.
        어떤 조건이 인정되는지, 증빙 서류는 뭘 챙겨야 하는지 바로 정리해 드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 정당한 이직 사유 + GreenBox + SectionBadge + EligibilityChecker */}
      <H2>어떤 조건이면 정당한 퇴사 사유로 인정되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a>이 정당한 이직 사유를 구체적으로 나열하고 있어요. 가장 흔한 게 <strong><a href="/w/임금체불-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금 관련 문제</a></strong>죠. 월급의 30% 이상을 안 줬거나, 2개월 이상 밀렸거나, 최저임금에 미달하는 급여를 받았다면 전부 해당돼요. 체불 금액이 적더라도 반복되면 인정 가능성이 높아지고요.
      </p>
      <p style={body}>
        <strong><a href="/w/직장내-괴롭힘-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>직장 내 괴롭힘</a>과 성희롱</strong>도 많이 인정되는 사유예요. 상사나 동료에게 지속적으로 괴롭힘을 당하거나 성희롱 피해를 입고 퇴사했는데, 회사가 제대로 조치를 안 했다면 정당한 사유가 되죠. <strong><a href="/w/출퇴근-곤란-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>통근 곤란</a></strong>은 사업장 이전이나 전근으로 출퇴근 왕복 3시간 이상이 된 경우에 해당돼요.
      </p>
      <p style={body}>
        <strong>건강 문제</strong>로 근로가 어려운 경우엔 의사 진단서가 필수예요. &quot;피곤하다&quot; 수준이 아니라 &quot;업무 수행이 불가능하다&quot;는 의학적 판단이 있어야 하죠. <strong>가족 간병</strong>은 30일 이상 직접 돌봄이 필요한 경우, <strong>근로계약 위반</strong>은 채용 시 약속한 업무와 실제 업무가 크게 다른 경우예요. <strong>사업장의 법 위반</strong>(산업안전보건법 위반 등)까지 합하면 사유의 범위가 꽤 넓어요.
      </p>

      <GreenBox>
        1. 임금체불: 30% 이상 또는 2개월 이상 미지급<br />
        2. 직장 내 괴롭힘 · 성희롱: 회사 미조치 시<br />
        3. 출퇴근 왕복 3시간 이상: 사업장 이전·전근<br />
        4. 본인 건강 문제: 의사 진단서 필수<br />
        5. 가족 간병: 30일 이상 직접 돌봄<br />
        6. 근로계약 위반 · 사업장 법 위반
      </GreenBox>

      <SectionBadge>내 상황이 해당되는지 체크해 보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="정당한 사유에 해당하고 증빙자료도 준비됐네요. 고용센터에 실업급여를 신청하세요."
        partialMatchText="아직 준비가 덜 된 항목이 있어요. 고용센터(1350)에 사전 상담부터 받아보세요."
      />

      <Divider />

      {/* 섹션 2: 인정 안 되는 경우 + BorderBox */}
      <H2>증빙 서류 없이도 인정받을 수 있나요?</H2>
      <p style={body}>
        증빙 서류가 없으면 사실상 어려워요. 고용센터 담당자가 퇴직 사유를 심사할 때 가장 먼저 보는 게 이직확인서이고, 그다음이 본인이 제출한 증빙자료죠. 말로만 &quot;임금체불이었다&quot;고 주장하면 인정해주기 힘들어요.
      </p>
      <p style={body}>
        다만 이직확인서에 회사가 퇴직 사유를 &quot;자발적 퇴사&quot;로 잘못 기재한 경우가 꽤 많아요. 이때는 고용센터에 정정을 요청할 수 있죠. 회사가 정정을 거부하더라도 고용센터가 직권으로 조사를 진행하니까, 본인이 가진 증거(통장 입금 내역, 녹음, 문자 등)를 함께 제출하면 돼요.
      </p>
      <p style={body}>
        서류가 아예 없는 상황이라면 고용센터(1350)에 먼저 상담을 받아보세요. 어떤 증거를 보완하면 인정받을 수 있는지 구체적으로 안내해줘요. 퇴직 전이라면 지금이라도 급여명세서, 이메일, 녹음 등을 챙겨두는 게 가장 중요하고요.
      </p>

      <BorderBox>
        급여명세서 + 통장 내역 → <strong>임금체불 입증에 유리</strong><br />
        녹음 파일 + 카톡 캡처 → <strong>괴롭힘 입증에 유리</strong><br />
        의사 진단서 → <strong>건강 문제 입증에 필수</strong><br />
        이직확인서 정정 요청 → <strong>회사 기재 오류 시 가능</strong><br />
        증빙 없이 구두 주장만 → <strong>인정 어려움</strong>
      </BorderBox>

      {/* ── 관련 글 + 광고 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 증빙자료 + SectionBadge + Checklist */}
      <H2>조건별로 필요한 증빙 서류가 달라요</H2>
      <p style={body}>
        <strong>임금체불</strong>이라면 급여명세서, 근로계약서, 통장 입금 내역이 핵심이에요. &quot;월급이 2개월째 안 들어왔다&quot;는 걸 통장으로 바로 보여줄 수 있으니까요. 노동청에 체불 진정을 넣은 기록까지 있으면 고용센터 심사가 훨씬 수월해지죠.
      </p>
      <p style={body}>
        <strong>직장 내 괴롭힘</strong>은 녹음 파일, 카카오톡 대화 캡처, 이메일, 동료 증언이 증거가 돼요. 회사에 공식적으로 신고했는데 조치를 안 한 기록이 남아 있으면 가장 강력한 증빙이 되죠. <strong>통근 곤란</strong>은 사업장 이전 공문과 네이버 지도 경로 캡처, 교통카드 내역을 활용하세요. 출퇴근 왕복 3시간 이상이라는 걸 객관적으로 보여줘야 해요.
      </p>
      <p style={body}>
        <strong>건강 문제</strong>는 &quot;업무 수행이 어렵다&quot;는 내용이 담긴 의사 진단서가 필수고요. 가장 중요한 건 <strong>퇴직 전에 미리 증빙을 확보</strong>하는 거예요. 회사를 나온 뒤에는 사내 시스템에 접근할 수 없고, 동료도 증언을 꺼리는 경우가 많아요. 지금 재직 중이라면 오늘이라도 증거부터 챙기세요.
      </p>

      <SectionBadge>퇴직 전 반드시 챙기세요</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 심사 절차와 이의신청 */}
      <H2>서류 제출 후 심사 과정과 이의신청</H2>
      <p style={body}>
        고용센터에 실업급여를 신청하면 담당자가 퇴직 사유를 심사해요. 먼저 회사가 제출한 이직확인서를 보고, 본인이 낸 증빙자료와 대조하죠. 임금체불 사유라면 &quot;정말 2개월 이상 밀렸는지&quot; 통장 내역으로 확인하는 식이에요. 심사 기간은 보통 2주 안팎이고요.
      </p>
      <p style={body}>
        심사에서 불인정 결정이 나왔다고 끝이 아니에요. <strong>60일 이내에 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청</a></strong>을 할 수 있죠. 처음 제출하지 못한 추가 증거를 첨부해서 재심사를 받는 거예요. 새로운 증거가 추가되면 결과가 뒤집히는 경우도 꽤 많죠.
      </p>
      <p style={body}>
        이의신청에서도 불인정되면 심사청구(고용보험 심사위원회), 재심사청구 순서로 절차가 남아 있죠. 최대 수백만 원이 걸린 문제니까, 한 번 거절당했다고 바로 포기할 이유가 없죠. 각 단계마다 기한이 정해져 있으니 놓치지 않도록 날짜를 꼭 메모해두세요.
      </p>

      <GreenBox>
        고용센터(1350)에 전화해서 &quot;내 상황이 정당한 사유에 해당하는지&quot; 먼저 물어보세요.<br />
        사전 상담은 무료이고, 심사 결과에 영향을 주지 않아요.<br />
        어떤 서류를 준비해야 하는지 구체적으로 안내받을 수 있어요.
      </GreenBox>

      <Divider />

      {/* 섹션 5: 핵심 정리 */}
      <H2>퇴사 전 증빙 서류부터 챙기세요</H2>
      <p style={body}>
        핵심은 딱 두 가지예요. <strong>증빙자료 확보</strong>와 <strong>고용센터 사전 상담</strong>이죠. 정당한 사유가 분명해도 증빙이 없으면 인정받기 어렵고, 사전 상담을 받으면 어떤 서류를 챙겨야 하는지 미리 파악할 수 있죠.
      </p>
      <p style={body}>
        퇴직 사유가 여러 개 겹치면 오히려 유리해요. 임금체불에 괴롭힘까지 동시에 발생했다면, 두 가지 모두 증빙자료를 따로따로 준비하세요. 고용센터 심사 때 어느 하나라도 인정되면 수급 자격이 생기니까요. 사유가 많을수록 인정 가능성이 올라가죠.
      </p>
      <p style={body}>
        퇴직 후 <strong>12개월 이내에 신청</strong>해야 한다는 점도 꼭 기억해두세요. 기한을 넘기면 자격 자체가 사라져요. 퇴직하면 가능한 빨리 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청하거나, 가까운 고용센터에 방문하세요. 퇴직 전이라면 지금 바로 1350에 전화하는 게 첫걸음이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        정당한 퇴사 사유와 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
