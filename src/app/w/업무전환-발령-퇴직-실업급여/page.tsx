"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "업무전환 또는 발령 통보를 받았어요" },
  { id: "c2", label: "근로계약서에 적힌 업무와 본질적으로 다른 업무예요" },
  { id: "c3", label: "고용보험 피보험단위기간 180일 이상이에요" },
  { id: "c4", label: "퇴직 의사를 밝혔거나 퇴직 예정이에요" },
];

const CHECKLIST = [
  "근로계약서 원본 또는 사본 확보 (채용 시 업무 내용 확인용)",
  "발령 통지서 보관 (날짜, 부서, 업무 내용 기재 확인)",
  "기존 업무와 새 업무의 차이점을 비교표로 정리",
  "보복성 인사라면 관련 기록 확보 (이메일, 문자, 녹취 등)",
  "고용센터(1350)에 사전 상담 전화해서 인정 가능성 확인",
];

const FAQS = [
  {
    q: "부서 이동이면 무조건 실업급여 받을 수 있나요?",
    a: "아니에요. 같은 계열 업무 안에서 이동한 거라면 본질적인 변경이 아니라 정당한 이직 사유로 인정받기 어렵죠. 개발팀 내에서 프론트엔드에서 백엔드로 바뀐 정도는 해당이 안 돼요.",
  },
  {
    q: "개발자인데 영업팀으로 발령받았어요. 퇴직하면 실업급여 되나요?",
    a: "될 가능성이 높죠. 채용 당시 '개발 업무'로 계약했는데 완전히 다른 영업 업무를 지시받은 거니까요. 근로계약서와 발령 통지서를 증빙으로 준비하면 정당한 이직 사유로 인정받을 수 있어요.",
  },
  {
    q: "발령을 거부하면 해고당하나요?",
    a: "정당한 인사 발령이면 거부 시 징계 대상이 될 수 있어요. 반대로 부당한 발령이면 거부할 권리가 있고, 노동위원회에 부당전보 구제신청도 가능하죠.",
  },
  {
    q: "서울에서 지방으로 발령받았는데 이것도 해당되나요?",
    a: "해당될 수 있어요. 근무지 이전으로 출퇴근 왕복 3시간 이상 걸리면 '통근 곤란'으로 정당한 이직 사유가 되죠. 업무전환과 별개로 근무지 변경 자체가 사유가 돼요.",
  },
  {
    q: "증빙자료를 못 챙기고 이미 퇴직했어요. 어떡하죠?",
    a: "고용센터에서 회사에 이직확인서 기재 내용을 확인할 수 있어요. 동료 진술서, 기존 업무 관련 이메일 등 간접 증거라도 모아두세요. 1350에 전화해서 상담받는 게 우선이에요.",
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
      { label: "고용노동부: 부당전보 구제신청", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "근로조건-변경-실업급여",
    title: "근로조건 변경으로 퇴직 시 실업급여",
    description: "임금 삭감, 근무시간 변경 등 근로조건이 불리하게 바뀌면 정당한 이직 사유가 돼요.",
  },
  {
    slug: "자발적-퇴사-실업급여",
    title: "자발적 퇴사해도 실업급여 받는 방법",
    description: "정당한 사유가 있으면 자발적 퇴사도 실업급여 대상이에요.",
  },
  {
    slug: "실업급여-정당한-퇴사-사유",
    title: "실업급여 정당한 퇴사 사유 전체 목록",
    description: "고용보험법이 인정하는 정당한 이직 사유 전체를 확인할 수 있어요.",
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
          currentSlug="업무전환-발령-퇴직-실업급여"
        />
      }
    >
      {/* ── 브레드크럼 ── */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 업무전환발령</p>

      {/* ── h1 (2줄) ── */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        업무전환 발령 거부 후 퇴직, 실업급여 될까?<br />
        인정 기준
      </h1>

      {/* ── intro (숫자+법률 포함) ── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;개발자로 입사했는데 갑자기 영업팀으로 발령났어요. 거부하면 불이익 받나요?&quot;<br />
        이런 상황이라면 퇴직해도 실업급여 대상이 될 수 있죠.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙 별표2</a>는
        &quot;채용 시 제시된 근로조건이 낮아지게 된 경우&quot;를
        정당한 이직 사유로 명시하고 있죠. 고용보험 피보험단위기간 <strong>180일</strong> 이상이고,
        본질적으로 다른 업무로 발령받아 퇴직하면 수급자격이 생겨요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 정당한 이직 사유 + GreenBox + EligibilityChecker ── */}
      <H2>어떤 업무전환이 실업급여 인정 기준에 맞나요?</H2>
      <p style={body}>
        근로계약서에 &quot;개발 업무&quot;로 적혀 있는데 영업을 시키면, 이건 사실상 계약 위반이에요. <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a>은 채용 시 제시된 <a href="/w/근로조건-변경-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로조건</a>이 본질적으로 달라진 경우를 정당한 이직 사유로 명시하고 있죠. 여기서 판단 기준은 <strong>직무의 성격 자체가 바뀌었느냐</strong>예요.
      </p>
      <p style={body}>
        구체적으로 보면, 개발자가 영업으로, 디자이너가 경리로, 사무직이 현장직으로 발령받는 건 본질적인 변경에 해당해요. 직무의 핵심이 완전히 달라졌으니까요. 반면 같은 개발팀 안에서 프론트엔드가 백엔드로 바뀌는 건 해당이 안 되죠. 기술 스택은 달라도 직무 유형이 동일하기 때문이에요.
      </p>
      <p style={body}>
        <strong>보복성 인사</strong>도 인정 기준에 포함돼요. 내부 문제를 제기했더니 한직으로 발령내는 경우가 대표적이죠. 이런 징벌적 인사 조치 뒤에 퇴직하면 정당한 이직 사유로 인정받을 수 있고요. <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>도 인사권 남용에 해당하는 전보를 부당하다고 판단하고 있죠.
      </p>

      <GreenBox>
        채용 시 약속과 완전히 다른 업무 지시 (개발 → 영업 등)<br />
        전문성과 무관한 업무로의 강제 발령<br />
        보복성·징벌성 인사 발령<br />
        근무지 이전으로 출퇴근 왕복 3시간 이상
      </GreenBox>

      <SectionBadge>내 상황 자격 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 가능성이 높아요. 고용센터(1350) 상담을 받아보세요."
        partialMatchText="해당하지 않는 항목이 있으면 수급이 어려울 수 있어요."
      />

      <Divider />

      {/* ── 섹션 2: 인정 안 되는 경우 + BorderBox ── */}
      <H2>인정 기준에서 빠지는 경우도 있나요?</H2>
      <p style={body}>
        같은 계열 안에서 역할만 바뀐 경우는 정당한 이직 사유로 인정받기 어려워요. 영업팀에서 담당 지역이 바뀌거나, 마케팅팀 내에서 SNS 담당이 광고 담당으로 변경되는 건 본질적 변경이 아니죠. 직무의 핵심 성격이 그대로이니까요.
      </p>
      <p style={body}>
        경영 악화로 조직을 개편하면서 부서가 통폐합되고, 그 과정에서 소폭의 업무 변경이 생긴 경우도 해당이 안 돼요. 회사의 정당한 인사권 행사로 볼 수 있기 때문이죠. 이런 상황에서 퇴직하면 자발적 퇴사로 처리될 가능성이 높아요.
      </p>
      <p style={body}>
        내 상황이 어디에 해당하는지 판단하는 기준은 <strong>근로계약서</strong>예요. 계약서에 &quot;개발 업무&quot;라고 적혀 있는데 영업을 시키면 명백한 계약 위반이죠. 반면 &quot;회사가 정하는 업무&quot;라고 포괄적으로 적혀 있으면 다툴 여지가 생겨요. 퇴직 전에 계약서 문구부터 꼼꼼히 살펴보세요.
      </p>

      <BorderBox>
        개발 → 영업 (본질적 변경) → <strong>인정</strong><br />
        프론트엔드 → 백엔드 (같은 계열) → <strong>불인정</strong><br />
        보복성 한직 발령 → <strong>인정</strong><br />
        조직 개편 후 소폭 변경 → <strong>불인정 가능성 높음</strong>
      </BorderBox>

      {/* ── 섹션 2 끝 → CategoryButton + RelatedArticles + ArticleAd(mid) ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3: 발령 거부 vs 퇴직 + SectionBadge + Checklist ── */}
      <H2>발령 거부와 퇴직, 인정받으려면 어느 쪽이 유리해요</H2>
      <p style={body}>
        발령이 부당하다면 거부부터 고려해보세요. 근로계약에 명시된 업무와 완전히 다르거나 보복성 인사에 해당하면 법적으로 거부할 권리가 있죠. <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 노동위원회에 <strong>부당전보 구제신청</strong>을 넣으면 발령 자체를 취소시킬 수도 있고요.
      </p>
      <p style={body}>
        반면 회사의 정당한 인사권 행사에 해당하면 거부가 어려워요. 업무 지시 불이행으로 징계 대상이 될 수 있기 때문이죠. 이 경우에는 발령에 따르거나, 퇴직을 선택하는 두 갈래가 남아요.
      </p>
      <p style={body}>
        한 가지 포인트가 있는데요. 정당한 발령이더라도 본인이 감당하기 어려운 수준이면 퇴직 후 실업급여를 받을 여지가 생겨요. 서울에서 지방으로 발령받아 출퇴근 왕복 3시간 이상이 되는 경우가 대표적이죠. 업무 변경과 별개로 <strong><a href="/w/출퇴근-곤란-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>통근 곤란</a></strong>이라는 독립된 정당한 이직 사유가 성립해요.
      </p>

      <SectionBadge>퇴직 전 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4: 증빙자료와 신청 절차 ── */}
      <H2>인정 기준 충족을 위한 증빙자료 준비법</H2>
      <p style={body}>
        1순위 증빙은 <strong>근로계약서</strong>예요. 채용 당시 &quot;어떤 업무를 하기로 했는지&quot;가 적혀 있으니, 발령과의 차이를 명확히 보여줄 수 있죠. 2순위는 <strong>발령 통지서</strong>예요. 언제, 어떤 부서로, 어떤 업무를 지시받았는지 공식적으로 기록된 문서이니까요.
      </p>
      <p style={body}>
        이 두 문서를 나란히 놓으면 &quot;약속한 업무 vs 지시받은 업무&quot;의 차이가 한눈에 드러나죠. 여기에 기존 업무와 새 업무의 <strong>내용 비교표</strong>를 직접 만들어서 첨부하면 고용센터 심사에서 강력한 증거가 돼요.
      </p>
      <p style={body}>
        퇴직 후에는 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 실업급여를 신청하세요. 수급자격 심사 과정에서 퇴직 사유를 소명해야 하는데, 이때 준비해둔 증빙자료를 함께 제출하면 돼요. 만약 불인정 판정이 나오더라도 <strong>60일 이내 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청</a></strong>으로 재심사를 받을 수 있으니 끝까지 포기하지 마세요.
      </p>

      <Divider />

      {/* ── 섹션 5: 실업급여 금액과 실전 팁 ── */}
      <H2>퇴직 후 실업급여 신청부터 바로 시작하세요</H2>
      <p style={body}>
        업무전환 발령으로 퇴직이 인정되면 퇴직 전 평균임금의 <strong>60%</strong>를 실업급여로 받아요. 2026년 기준 1일 상한액 <strong>68,100원</strong>, 하한액 <strong>66,048원</strong>이죠. 월로 환산하면 최대 약 204만 원 수준이에요.
      </p>
      <p style={body}>
        수급 기간은 나이와 고용보험 가입 기간에 따라 120일에서 270일까지 차이가 나요. 퇴직 후 <strong>12개월 이내</strong>에 반드시 신청해야 하죠. 이 기한을 넘기면 아무리 정당한 사유가 있어도 수급자격 자체가 소멸해요.
      </p>
      <p style={body}>
        퇴직 전에 <strong>고용센터(1350) 사전 상담</strong>을 받아두는 게 가장 좋은 방법이에요. 내 상황이 인정 기준에 맞는지, 증빙을 뭘 더 모아야 하는지 무료로 안내받을 수 있죠. 사전 상담은 심사 결과에 영향을 주지 않으니 부담 없이 전화하세요.
      </p>

      <GreenBox>
        채용 시 약속과 본질적으로 다른 업무 발령 = 정당한 이직 사유<br />
        근로계약서 + 발령 통지서 + 업무 비교표 = 3대 증빙<br />
        퇴직 전 고용센터(1350) 사전 상담 = 가장 확실한 준비
      </GreenBox>

      <Divider />

      {/* ── FAQ (5개) ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        업무전환 발령과 실업급여에 대해 실제로 많이 궁금해하는 내용을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* ── References + Disclaimer ── */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 달라지니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
