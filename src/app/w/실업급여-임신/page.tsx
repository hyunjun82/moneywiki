"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "pregnant", label: "임신 확인서 또는 산모수첩 보유" },
  { id: "insured", label: "퇴직 전 18개월 내 고용보험 가입기간 180일 이상" },
  { id: "involuntary", label: "비자발적 퇴직 또는 정당한 사유의 자발적 퇴직" },
  { id: "report", label: "고용센터에 수급자격 인정 신청 의사 있음" },
];

const CHECKLIST = [
  "퇴직 전 18개월 내 고용보험 가입기간 180일 이상인지 확인",
  "비자발적 퇴직 또는 정당한 사유의 자발적 퇴직인지 확인",
  "고용센터에 수급기간 연장 신청서 제출 (임신확인서 첨부)",
  "출산전후휴가 급여와 실업급여 중복 수급 여부 확인",
  "출산 후 수급기간(연장 포함) 내에 실업급여 신청",
];

const FAQS = [
  {
    q: "임신 8개월인데 퇴직당했어요. 실업급여 바로 받을 수 있나요?",
    a: "수급자격 요건을 갖추면 바로 신청할 수 있죠. 다만 구직활동이 현실적으로 어렵다면 수급기간 연장을 신청하고, 출산 후 안정되면 그때 구직활동하면서 받는 게 나아요.",
  },
  {
    q: "임신 때문에 스스로 퇴사했는데 실업급여 대상이 되나요?",
    a: "단순히 임신했다는 이유만으로는 정당한 사유가 아니에요. 하지만 임신으로 건강이 나빠져 일을 못 하게 됐거나, 회사에서 퇴직을 강요했다면 정당한 이직 사유로 인정될 수 있죠. 진단서나 업무 기록 등 증빙을 준비하세요.",
  },
  {
    q: "출산전후휴가 급여를 받고 나서 실업급여도 받을 수 있나요?",
    a: "받을 수 있죠. 다만 동시에는 안 돼요. 출산전후휴가 급여 기간이 끝난 뒤에 실업급여를 신청하면 돼요. 두 급여는 별개 제도예요.",
  },
  {
    q: "수급기간 연장은 최대 몇 년까지 가능한가요?",
    a: "임신과 출산 사유로는 최대 4년까지 연장이 가능해요. 단, 연장된 기간이 지나면 남은 수급일수가 남아도 받을 수 없으니 기한을 꼭 확인하세요.",
  },
  {
    q: "구직활동을 꼭 해야 하나요? 임신 중인데 면접이 부담스러워요.",
    a: "고용센터에 임신 사실을 알리면 구직활동 방식을 조정해줘요. 대면 면접 대신 온라인 입사지원이나 직업상담으로 대체할 수 있죠. 무리하게 면접을 다닐 필요 없어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 수급기간 연장 (임신·출산 사유)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙: 수급기간 연장 신청 절차", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 임신·출산 근로자 지원", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-출산",
    title: "출산 후 실업급여 신청 방법과 시기",
    description: "출산 후 실업급여를 신청하는 시기와 절차를 정리했어요.",
  },
  {
    slug: "산전후휴가-계약만료-실업급여",
    title: "산전후휴가 중 계약만료 시 실업급여",
    description: "출산전후휴가 급여와 실업급여의 관계를 정리했어요.",
  },
  {
    slug: "실업급여-상병급여",
    title: "실업급여 상병급여 조건과 신청 방법",
    description: "질병이나 부상으로 구직활동이 어려울 때 받을 수 있는 급여예요.",
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
          currentSlug="실업급여-임신"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 임신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임신 중 퇴직하면 실업급여?<br />
        수급기간 연장 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;배 나오는데 면접을 보러 다니라고요?&rdquo;<br />
        걱정 마세요. 임신했다고 실업급여 자격이 없어지진 않아요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 정해놓은 수급요건만 갖추면 임신 중에도 실업급여를 받을 수 있고요.
        당장 구직활동이 힘들면 <strong>수급기간 연장</strong>을 신청해서
        출산 뒤에 여유 있게 받는 길도 열려 있죠. 연장 한도는 <strong>최대 4년</strong>이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 임신 중 실업급여 수급자격 + 자격확인 */}
      <H2>수급기간 연장 조건에 해당하는 사람은 누구인가요?</H2>
      <p style={body}>
        임신이 수급자격을 없애진 않아요. 기본 요건은 딱 두 가지예요. 퇴직 전 18개월 내 <strong>고용보험 가입기간 180일 이상</strong>, 그리고 <strong>비자발적 퇴직</strong>(또는 정당한 사유가 있는 자발적 퇴직)이죠.
        이 조건만 맞으면 임신 상태든 아니든 실업급여를 신청할 수 있어요.
      </p>
      <p style={body}>
        현실적인 문제는 따로 있죠. 실업급여를 받으려면 구직활동을 해야 하잖아요. 초기엔 가능해도 후기로 갈수록 면접을 다니기가 쉽지 않아요.
        그래서 고용보험법이 두 가지 보완장치를 마련해뒀어요.{" "}
        <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동</a> 의무 완화, 그리고 수급기간 연장이에요.
      </p>
      <p style={body}>
        고용센터에 임신 사실을 알리면 담당자가 구직활동 방식을 조정해줘요. 면접 대신 워크넷 온라인 입사지원이나 직업상담으로 인정해주는 경우가 많죠. 만삭인데 면접장을 돌아다녀야 하는 건 아니에요.
      </p>

      <GreenBox>
        퇴직 전 18개월 내 고용보험 가입 180일 이상<br />
        비자발적 퇴직 또는 정당한 사유의 자발적 퇴직<br />
        임신 여부는 수급자격 판단에 영향을 주지 않아요
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급자격이 있어요. 수급기간 연장도 함께 신청하세요."
        partialMatchText="일부 조건이 충족되지 않았어요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 수급기간 연장 제도 */}
      <H2>연장 신청 방법과 필요 서류는 뭐가 있나요?</H2>
      <p style={body}>
        실업급여는 퇴직 다음 날부터 <strong>12개월</strong> 안에 소진해야 해요. 기한이 지나면 남은 수급일수가 남았어도 그냥 사라지죠.
        그런데 임신 중에 면접을 보고 다닐 수 없는 상황이잖아요. 이럴 때 12개월이라는 기한 자체를 늘려주는 게 수급기간 연장 제도예요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 정한 연장 사유에 임신과 출산이 들어가 있어요.
        구직이 어려운 기간만큼 기한이 늘어나고, 임신·출산 사유라면 <strong>최대 4년</strong>까지 밀어줘요.
        출산하고 몸이 회복되면 그때 구직활동을 시작해서 실업급여를 받으면 되는 거예요.
      </p>
      <p style={body}>
        한 가지 주의할 점이 있죠. 연장 기간도 무한정이 아니에요. 4년을 받았으면 그 4년 안에 써야 해요. 기한이 지나면 남은 일수가 있어도 소멸돼요.
        대부분의 분이 출산 후 6개월~1년쯤에 구직활동을 시작하니까 시간은 넉넉한 편이에요.
      </p>

      <BorderBox>
        원래 수급기간: 퇴직 다음 날부터 12개월<br />
        연장 사유: 임신, 출산, 질병, 부상 등<br />
        연장 한도: 최대 4년<br />
        연장 기한이 지나면 남은 일수도 소멸돼요
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 연장 신청 방법 + 체크리스트 */}
      <H2>수급기간 연장 조건 충족 시 신청 절차</H2>
      <p style={body}>
        고용센터에 <strong>수급기간 연장 신청서</strong>를 내면 돼요. 임신확인서나 산모수첩 사본을 함께 첨부해야 하죠.
        수급자격 인정 신청을 할 때 동시에 내도 되고, 수급자격부터 확보한 뒤 별도로 제출해도 돼요.
      </p>
      <p style={body}>
        타이밍이 중요해요. 원래 수급기간 12개월이 다 지나고 나서 &ldquo;연장해주세요&rdquo; 하면 인정받기 어려울 수 있거든요.
        퇴직하면 바로 고용센터에 수급자격 인정 신청을 하고, 그 자리에서 연장 신청까지 같이 하는 게 가장 안전하죠.
      </p>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 일부 절차를 온라인으로 처리할 수 있지만, 연장 신청은 고용센터에 직접 전화(1350)하거나 방문하는 게 확실해요.
        내 상황에 맞춰서 담당자가 하나하나 안내해줘요.
      </p>

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 출산전후휴가 급여와의 관계 */}
      <H2>출산전후휴가 급여와 실업급여 수급 조건 비교</H2>
      <p style={body}>
        재직 중 출산전후휴가 급여를 받고 있거나 받을 예정이라면 이 부분을 꼭 알아야 해요. 출산전후휴가 급여와 실업급여는 <strong>동시에 못 받아요</strong>.
        둘 다 고용보험 재원이라 중복 수급이 법으로 금지돼 있죠. 출산전후휴가는 90일(다태아 120일)이고, 이 기간 동안은 별도의 휴가급여가 나와요.
      </p>
      <p style={body}>
        순서만 지키면 돼요. 출산전후휴가 급여를 먼저 다 받고, 휴가가 끝난 뒤에 실업급여를 신청하면 되죠.
        임신으로 건강이 나빠져서 퇴사했거나, 회사가 임신을 이유로 퇴직을 강요한 상황이라면 <strong>정당한 사유의 자발적 퇴사</strong>로 인정될 수 있어요.
        진단서나 회사와의 소통 기록을 미리 챙겨두면 심사에 도움이 되죠.
      </p>
      <p style={body}>
        육아휴직을 쓰다가 복직하지 않고 퇴직해도 실업급여 대상이에요. 육아휴직 기간이 고용보험 가입기간으로 인정되고, 육아휴직급여와 실업급여는 별개 제도니까요.
        자세한 내용은 <a href="/w/육아휴직-후-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>육아휴직 후 실업급여</a> 글에 정리했어요.
      </p>

      <Divider />

      {/* 섹션 5: 실전 행동 정리 */}
      <H2>임신 중 수급기간 연장 신청, 이 순서대로 하세요</H2>
      <p style={body}>
        첫 번째로 할 일은 고용센터에서 <strong>수급자격 인정 신청</strong>을 하는 거예요. 퇴직하면 최대한 빨리 움직이세요.
        이때 임신 사실을 알리면서 수급기간 연장 신청까지 동시에 진행하면 돼요. 임신확인서를 첨부하면 처리가 빠르죠.
      </p>
      <p style={body}>
        구직활동은 담당자와 방식을 상의하면 돼요. 임신 중인데 무리하게 면접장을 다닐 필요가 없어요.
        온라인 입사지원이나 직업상담으로 대체가 되는지 먼저 따져보고, 그마저도 어려우면 수급기간 연장을 받아서 출산 뒤에 받는 게 현실적이죠.
      </p>
      <p style={body}>
        출산 뒤에는 몸이 회복되는 대로 고용센터에 연락해서 구직활동을 시작하면 돼요.
        출산 후 신청 시기가 궁금하다면{" "}
        <a href="/w/실업급여-출산" style={{ color: "#1D9E75", textDecoration: "underline" }}>출산 후 실업급여 신청</a> 글을 참고하세요.
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 상담 전화 1350은 무료이고, 내 상황에 딱 맞는 안내를 받을 수 있죠. 연장 기한이 얼마나 남았는지도 이때 같이 살펴보세요.
      </p>

      <GreenBox>
        퇴직 → 수급자격 인정 + 연장 신청 → 출산 → 회복 후 구직활동 → 실업급여 수급
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임신 중 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 수급자격이나 연장 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
