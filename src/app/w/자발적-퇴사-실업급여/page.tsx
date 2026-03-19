"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
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
      { label: "고용보험법: 수급자격의 제한 (정당한 이직 사유)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙: 정당한 이직 사유 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 정당한 이직 사유 상담", url: "https://www.moel.go.kr" },
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
        자발적 퇴사도 실업급여 된다고?<br />
        정당한 사유 7가지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;내가 먼저 그만뒀으니까 실업급여는 꿈도 못 꾸겠지?&quot;<br />
        아니에요. <strong>정당한 사유</strong>만 있으면 받을 수 있죠.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이
        임금체불, 괴롭힘, 통근 곤란 같은 사유가 있으면
        자발적 퇴사도 비자발적 퇴사와 동일하게 취급해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 정당한 사유 7가지 */}
      <H2>정당한 사유 7가지, 구체적으로 뭐가 있나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a>이 정한 사유는 크게 7가지예요. 가장 흔한 건 <strong><a href="/w/임금체불-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금 관련 문제</a></strong>죠. 월급의 30% 이상을 안 줬거나 2개월 넘게 밀렸다면 정당한 사유에 해당돼요. 최저임금에 못 미치는 급여를 받은 경우도 마찬가지고요.
      </p>
      <p style={body}>
        두 번째는 <strong><a href="/w/직장내-괴롭힘-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>직장 내 괴롭힘</a>과 성희롱</strong>이에요. 상사나 동료한테 지속적으로 괴롭힘을 당하거나 성희롱 피해를 입고 퇴사한 경우죠. 세 번째는 <strong>통근 곤란</strong>: 사업장 이전이나 본인 이사 때문에 출퇴근 왕복이 3시간을 넘겨버린 경우예요.
      </p>
      <p style={body}>
        네 번째는 <strong>본인 건강 문제</strong>예요. 의사 진단서로 &quot;계속 근로가 어렵다&quot;는 판단이 나와야 하죠. 다섯 번째 <strong><a href="/w/간병-사유-퇴직-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>가족 간병</a></strong>은 30일 이상 직접 간병이 필요한 경우에 해당돼요. 여섯 번째 <strong>근로계약 위반</strong>은 채용 때 약속한 것과 실제 업무가 크게 다른 경우이고, 일곱 번째 <strong>사업장 법 위반</strong>은 산업안전보건법을 심각하게 어긴 사업장이 대상이에요.
      </p>

      <GreenBox>
        1. 임금체불 (30% 이상 또는 2개월 이상)<br />
        2. 직장 내 괴롭힘 · 성희롱<br />
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

      {/* 섹션 2: 안 되는 경우 */}
      <H2>정당한 사유에 해당 안 되는 경우도 있나요?</H2>
      <p style={body}>
        당연히 있죠. <strong>단순 이직 목적</strong> 퇴사가 대표적이에요. &quot;더 좋은 회사 갈 거라서&quot;, &quot;연봉이 낮아서&quot; 같은 이유는 정당한 사유가 아니에요. 이미 다른 곳에 합격한 상태에서 퇴사하는 것도 마찬가지죠.
      </p>
      <p style={body}>
        <strong>개인 사정</strong>도 인정이 어려워요. 공부, 여행, 단순 휴식은 정당한 사유에 해당하지 않죠. 육아 때문이라면 육아휴직을 먼저 쓸 수 있는지 점검해야 해요. 휴직이 가능한데 바로 퇴사를 선택하면 고용센터에서 인정해주지 않는 경우가 많아요.
      </p>
      <p style={body}>
        <strong>본인 귀책사유 해고</strong>도 실업급여 대상이 아니에요. 무단결근, 횡령, 업무상 비위행위로 징계해고된 경우에는 &quot;내 잘못으로 일자리를 잃은 것&quot;이라 수급이 제한되죠. 다만 부당해고라고 판단되면 구제신청 후 다시 다툴 수 있죠.
      </p>

      <BorderBox>
        권고사직 &rarr; <strong>비자발적</strong> (실업급여 대상)<br />
        사직서 제출 + 정당한 사유 &rarr; <strong>가능</strong><br />
        이직 목적 퇴사 &rarr; <strong>불가</strong><br />
        징계해고 (본인 귀책) &rarr; <strong>불가</strong>
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 증빙자료 */}
      <H2>사유별 증빙자료 준비법</H2>
      <p style={body}>
        정당한 사유를 말로만 주장하면 고용센터에서 인정이 어려워요. 서류로 뒷받침해야 하죠. 사유마다 필요한 증빙이 다르니 본인 상황에 맞는 걸 미리 챙겨두세요.
      </p>
      <p style={body}>
        <strong>임금체불</strong>이라면 급여명세서, 통장 입금 내역, 체불 확인서가 핵심 증거예요. <strong>직장 내 괴롭힘</strong>은 녹음 파일, 이메일, 문자 대화, 증인 진술서를 확보해야 하죠. <strong>통근 곤란</strong>은 사업장 이전 공문이나 이사 증빙서류와 함께 출퇴근 소요시간을 보여줄 수 있는 경로 검색 캡처가 효과적이에요.
      </p>
      <p style={body}>
        <strong>건강 문제</strong>는 의사 진단서가 필수예요. &quot;좀 힘들었다&quot; 수준이 아니라 의학적으로 &quot;계속 근로가 어렵다&quot;는 판단이 담겨야 하죠. 공통 포인트는 하나: <strong>퇴직 전에 미리 확보</strong>하는 거예요. 퇴직 후에는 회사 자료에 접근이 막히니까요.
      </p>

      <SectionBadge>퇴직 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 심사 절차 */}
      <H2>정당한 사유를 고용센터에서 심사하는 절차</H2>
      <p style={body}>
        실업급여를 신청하면 고용센터 담당자가 퇴직 사유를 심사해요. 이직확인서에 적힌 퇴직 사유를 먼저 보고, 필요하면 추가 증빙을 요청하죠. 임금체불 건이면 &quot;2개월 이상 밀린 게 맞는지&quot; 통장 내역으로 대조하는 식이에요.
      </p>
      <p style={body}>
        이직확인서에 &quot;자발적 퇴사&quot;로 기재돼 있어도 포기할 필요 없어요. 정당한 사유를 증빙으로 증명하면 수급자격이 인정되죠. 회사가 잘못 기재한 경우에는 고용센터에 정정을 요청할 수 있고, 아예 이직확인서를 안 발급해주면 근로복지공단(1588-0075)에 직접 신청하면 돼요.
      </p>
      <p style={body}>
        심사에서 불인정 결정이 나와도 길이 끝난 건 아니죠. <strong>60일 이내에 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청</a></strong>을 할 수 있죠. 추가 증거를 첨부해서 이의신청서를 제출하면 재심사를 받게 돼요. 그래도 안 되면 심사청구, 재심사청구까지 3단계의 불복 절차가 남아 있으니까요.
      </p>

      <GreenBox>
        고용센터(1350)에 전화해서 &quot;내 상황이 정당한 사유에 해당하는지&quot; 먼저 물어보세요.<br />
        상담은 무료이고, 어떤 서류가 필요한지까지 안내받을 수 있죠.<br />
        사전 상담이 심사 결과에 불이익을 주는 일은 없으니 걱정 마세요.
      </GreenBox>

      <Divider />

      {/* 섹션 5: 실전 팁 */}
      <H2>퇴직 전에 이 3가지부터 챙기세요</H2>
      <p style={body}>
        첫째, <strong>증빙자료를 퇴직 전에 확보</strong>하세요. 정당한 사유가 있어도 증거가 없으면 심사에서 인정받기 어려워요. 회사 시스템에 접근이 가능할 때 급여명세서, 계약서, 대화 기록 등을 전부 저장해두는 게 핵심이죠.
      </p>
      <p style={body}>
        둘째, <strong>사유가 복합적이면 전부 챙기세요</strong>. 임금체불에 괴롭힘까지 겹친 경우라면 양쪽 증빙을 다 준비하는 거예요. 사유가 여러 개일수록 정당한 이직 사유로 인정받을 가능성이 올라가죠.
      </p>
      <p style={body}>
        셋째, 퇴직 후 <strong>12개월 이내에 신청</strong>해야 해요. 이 기한을 넘기면 수급 자격 자체가 사라지니까요. 퇴직하면 가능한 빨리 관할 고용센터에 방문하거나 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 접수하세요. 하루라도 빨리 움직이는 게 유리해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        자발적 퇴사와 실업급여에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
