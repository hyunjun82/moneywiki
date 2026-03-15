"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "임금체불(30% 이상 또는 2개월 이상 미지급)이에요" },
  { id: "c2", label: "직장 내 괴롭힘이나 성희롱 피해를 입었어요" },
  { id: "c3", label: "출퇴근 시간이 왕복 3시간 이상으로 늘어났어요" },
  { id: "c4", label: "본인 건강 문제 또는 가족 간병이 필요해요" },
  { id: "c5", label: "근로계약과 다른 업무를 지시받았어요" },
];

const CHECKLIST = [
  "퇴직 전에 증빙자료를 확보 (급여명세서, 통장 내역, 대화 기록 등)",
  "이직확인서의 퇴직 사유가 정확히 기재되었는지 확인",
  "정당한 사유에 해당하는지 고용센터(1350) 사전 상담",
  "퇴직 후 12개월 이내에 실업급여 신청",
  "불인정 시 60일 이내 이의신청 가능",
];

const FAQS = [
  {
    q: "자발적 퇴사하면 무조건 실업급여 못 받나요?",
    a: "아니에요. 정당한 사유가 있으면 받을 수 있죠. 임금체불, 괴롭힘, 통근 곤란, 건강 문제 등이 대표적인 정당한 사유예요.",
  },
  {
    q: "다른 회사로 이직하려고 퇴사하면요?",
    a: "이직 목적의 단순 자발적 퇴사는 실업급여 대상이 아니에요. 정당한 사유가 있어야 하죠.",
  },
  {
    q: "월급 안 줘서 퇴사하면 받을 수 있나요?",
    a: "받을 수 있죠. 임금체불은 대표적인 정당한 퇴직 사유예요. 30% 이상을 안 줬거나 2개월 이상 밀렸으면 인정돼요.",
  },
  {
    q: "이직확인서에 '자발적 퇴사'로 되어 있는데 어떡하죠?",
    a: "고용센터에서 정당한 사유를 증명하면 수급자격을 인정받을 수 있어요. 회사가 잘못 기재한 경우 정정을 요청할 수도 있죠.",
  },
  {
    q: "심사에서 불인정되면 방법이 없나요?",
    a: "60일 이내에 이의신청을 할 수 있어요. 추가 증거를 첨부해서 재심사를 받을 수 있죠. 이의신청에서도 안 되면 심사청구, 재심사청구 절차가 남아있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 수급자격의 제한 (정당한 이직 사유)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 — 정당한 이직 사유 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 정당한 이직 사유 상담", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "간병-사유-퇴직-실업급여",
    title: "간병 퇴직해도 실업급여 받는 방법",
    description: "부모님 간병으로 퇴직해도 정당한 사유로 인정받을 수 있어요.",
  },
  {
    slug: "실업급여-임금체불",
    title: "임금체불 퇴직 시 실업급여",
    description: "월급을 못 받아서 퇴사했다면 정당한 이직 사유로 인정돼요.",
  },
  {
    slug: "권고사직-실업급여-신청-방법",
    title: "권고사직 실업급여 신청 방법",
    description: "권고사직은 비자발적 퇴사로 실업급여 수급이 가장 쉬운 경우예요.",
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
          currentSlug="자발적-퇴사-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 자발적퇴사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자발적 퇴사해도 실업급여 받을 수 있을까?<br />
        정당한 사유 7가지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "내가 먼저 퇴사했는데 실업급여 받을 수 있을까?"<br />
        받을 수 있죠. <strong>정당한 사유</strong>가 있으면요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는
        자발적 퇴사여도 임금체불, 괴롭힘, 통근 곤란 등의 사유가 있으면
        비자발적 퇴사와 동일하게 실업급여를 지급해요.
      </p>

      <Divider />

      {/* 섹션 1 — 정당한 사유 7가지 */}
      <H2>어떤 사유가 정당한 이직 사유로 인정되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a>에서 정한 정당한 이직 사유는 크게 7가지예요. 가장 많은 게 <strong>임금 관련 문제</strong>예요. 월급의 30% 이상을 안 줬거나, 2개월 이상 밀렸으면 정당한 사유예요. 최저임금 미만으로 받은 경우도 해당되죠.
      </p>
      <p style={body}>
        두 번째는 <strong>직장 내 괴롭힘과 성희롱</strong>이에요. 상사나 동료로부터 지속적인 괴롭힘을 받거나 성희롱 피해를 입고 퇴사한 경우에 인정돼요. 세 번째는 <strong>통근 곤란</strong>이에요. 사업장 이전이나 본인 이사로 출퇴근 왕복 3시간 이상이 된 경우죠.
      </p>
      <p style={body}>
        네 번째는 <strong>건강 문제</strong>예요. 의사 진단서로 "근로가 어렵다"는 판단이 있어야 해요. 다섯 번째는 <strong>가족 간병</strong>으로, 30일 이상 직접 간병이 필요한 경우에 해당되죠. 여섯 번째는 <strong>근로계약 위반</strong>이에요. 채용 때 약속한 것과 실제 업무가 크게 다른 경우예요. 일곱 번째는 <strong>사업장 법 위반</strong>이에요. 산업안전보건법을 심각하게 위반한 사업장이 해당돼요.
      </p>

      <GreenBox title="정당한 이직 사유 7가지">
        1. 임금체불 (30% 이상 또는 2개월 이상)<br />
        2. 직장 내 괴롭힘·성희롱<br />
        3. 출퇴근 왕복 3시간 이상 (통근 곤란)<br />
        4. 본인 건강 문제 (의사 진단서 필요)<br />
        5. 가족 간병 (30일 이상)<br />
        6. 근로계약과 다른 업무 지시<br />
        7. 사업장 법 위반 (산업안전 등)
      </GreenBox>

      <SectionBadge>내 상황에 해당되는 게 있나요?</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="여러 사유에 해당되네요. 정당한 이직 사유로 인정될 가능성이 높아요. 증빙자료를 준비해서 고용센터에 신청하세요."
        partialMatchText="하나라도 해당되면 정당한 사유가 될 수 있어요. 고용센터(1350)에 사전 상담을 받아보세요."
      />

      <Divider />

      {/* 섹션 2 — 안 되는 경우 */}
      <H2>실업급여를 못 받는 자발적 퇴사도 있나요?</H2>
      <p style={body}>
        당연히 있죠. <strong>단순 이직 목적</strong>의 퇴사가 대표적이에요. "더 좋은 회사가 있어서", "연봉이 낮아서" 같은 이유로 퇴사하면 정당한 사유가 아니에요. 이미 다른 회사에 합격한 상태에서 퇴사하는 것도 마찬가지예요.
      </p>
      <p style={body}>
        <strong>개인 사정</strong>으로 퇴사하는 것도 어려워요. "공부하려고", "여행 가려고", "쉬고 싶어서" 등의 이유는 정당한 사유로 인정 안 되죠. 육아가 사유라면 육아휴직을 먼저 사용할 수 있는지 확인해야 해요. 육아휴직을 쓸 수 있는데도 퇴사하면 인정이 어려워요.
      </p>
      <p style={body}>
        <strong>본인 귀책사유</strong>로 해고된 경우도 실업급여 대상이 아니에요. 무단결근, 횡령, 업무상 비위행위 등으로 징계해고당한 경우에는 정당한 사유가 아니라 본인 잘못이기 때문에 수급이 제한되죠.
      </p>

      <BorderBox title="헷갈리는 경우">
        권고사직 → <strong>비자발적</strong> (실업급여 대상)<br />
        사직서 제출 → 정당한 사유 있으면 <strong>가능</strong><br />
        이직 목적 퇴사 → <strong>불가</strong><br />
        징계해고 → <strong>불가</strong> (본인 귀책)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* 섹션 3 — 증빙자료 */}
      <H2>증빙자료가 핵심이에요</H2>
      <p style={body}>
        정당한 사유를 주장하려면 증거가 있어야 해요. 말로만 "임금체불이었다"고 하면 고용센터에서 인정해주기 어렵죠. 사유별로 필요한 증빙이 달라요.
      </p>
      <p style={body}>
        <strong>임금체불</strong>은 급여명세서, 통장 입금 내역, 체불 확인서가 증거가 돼요. <strong>직장 내 괴롭힘</strong>은 녹음 파일, 이메일, 문자 메시지, 증인 진술서가 필요하죠. <strong>통근 곤란</strong>은 출퇴근 시간 증명, 사업장 이전 공문, 이사 증빙서류를 준비하세요.
      </p>
      <p style={body}>
        <strong>건강 문제</strong>는 의사 진단서가 필수예요. "힘들었다" 정도가 아니라, 의학적으로 근로가 어렵다는 판단이 있어야 해요. 중요한 건 <strong>퇴직 전에 미리 증빙자료를 확보</strong>하는 거예요. 퇴직 후에는 증거를 수집하기 어려울 수 있으니까요.
      </p>

      <SectionBadge>퇴직 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 심사 절차 */}
      <H2>고용센터 심사는 어떻게 진행되나요?</H2>
      <p style={body}>
        실업급여를 신청하면 고용센터 담당자가 퇴직 사유를 심사해요. 이직확인서에 기재된 퇴직 사유를 확인하고, 필요하면 추가 증빙자료를 요청하죠. 임금체불이면 "정말 2개월 이상 밀렸는지" 통장 내역으로 확인하는 식이에요.
      </p>
      <p style={body}>
        이직확인서에 회사가 퇴직 사유를 어떻게 기재했는지도 중요해요. "자발적 퇴사"로 기재돼 있어도 정당한 사유를 증명하면 수급자격을 인정받을 수 있죠. 회사가 잘못 기재한 경우 고용센터에 정정을 요청할 수 있어요.
      </p>
      <p style={body}>
        심사에서 불인정 결정이 나오면 <strong>60일 이내에 이의신청</strong>을 할 수 있어요. 추가 증거를 첨부해서 이의신청서를 제출하면 재심사를 받게 되죠. 이의신청에서도 불인정되면 심사청구, 재심사청구 절차가 남아있어요.
      </p>

      <GreenBox title="애매하면 사전 상담부터">
        퇴직 전에 고용센터(1350)에 전화해서<br />
        "내 상황이 정당한 사유에 해당하는지" 먼저 물어보세요.<br />
        사전 상담은 무료이고, 심사 결과에 영향을 주지 않아요.
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 실전 팁 */}
      <H2>실업급여 받으려면 이것만 기억하세요</H2>
      <p style={body}>
        핵심은 두 가지예요. <strong>증빙자료 확보</strong>와 <strong>퇴직 전 상담</strong>이에요. 정당한 사유가 있어도 증빙이 없으면 인정받기 어렵고, 사전에 상담을 받으면 어떤 서류를 준비해야 하는지 미리 알 수 있죠.
      </p>
      <p style={body}>
        퇴직 사유가 복합적인 경우도 많아요. 임금체불에 괴롭힘까지 겹친 경우라면, 둘 다 증빙자료를 준비하세요. 사유가 많을수록 정당한 이직 사유로 인정받을 가능성이 높아지죠.
      </p>
      <p style={body}>
        마지막으로, 퇴직 후 <strong>12개월 이내에 신청</strong>해야 해요. 너무 오래 미루면 자격이 사라지니까요. 퇴직하면 가능한 빨리 고용센터에 방문하거나 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        자발적 퇴사와 실업급여에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
