"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용보험 가입기간이 180일 이상이에요" },
  { id: "c2", label: "비자발적 퇴직이에요 (계약만료, 권고사직, 근무조건 변경 등)" },
  { id: "c3", label: "출산예정일 또는 출산일을 알고 있어요" },
  { id: "c4", label: "고용센터에 수급기간 연기(연장) 신청을 할 수 있어요" },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 피보험자격 이력 조회: 가입기간 180일 확인",
  "출산전후휴가 급여 수급이 완전히 종료됐는지 확인 (중복 수급 불가)",
  "이직확인서 퇴직 사유가 비자발적으로 기재됐는지 확인",
  "출산으로 구직활동이 어려우면 수급기간 연장 신청 (최대 4년)",
  "관할 고용센터(1350) 사전 상담으로 내 수급 가능 여부 점검",
];

const FAQS = [
  {
    q: "출산전후휴가 급여를 받고 나서 실업급여도 받을 수 있나요?",
    a: "받을 수 있어요. 다만 동시에는 안 돼요. 출산전후휴가 급여가 끝난 뒤에 실업급여를 신청해야 해요. 둘 다 고용보험에서 나오는 급여라 중복 수급이 법으로 금지돼 있죠.",
  },
  {
    q: "임신 중에 퇴직하면 바로 실업급여를 신청해야 하나요?",
    a: "바로 신청할 필요 없어요. 고용센터에 출산 서류를 제출하고 수급기간 연장을 받으면 최대 4년까지 미룰 수 있어요. 출산하고 몸이 회복된 뒤에 천천히 신청해도 돼요.",
  },
  {
    q: "육아휴직 쓰다가 복직 안 하고 퇴직하면 실업급여 받을 수 있나요?",
    a: "받을 수 있어요. 육아휴직 기간도 고용보험 가입기간으로 인정돼요. 다만 회사가 복직을 받아줬는데 본인이 거부한 경우, 자발적 퇴직으로 분류될 수 있어요. 퇴직 사유를 잘 정리해야 하죠.",
  },
  {
    q: "아기 돌보면서 구직활동은 어떻게 하나요?",
    a: "워크넷 온라인 입사지원만으로도 구직활동이 인정돼요. 고용센터 방문이 어려우면 담당자에게 상황을 설명하세요. 전화상담이나 온라인 상담으로 대체 가능한 경우가 많아요.",
  },
  {
    q: "출산급여(건강보험)와 실업급여는 다른 건가요?",
    a: "완전히 다른 제도예요. 출산급여는 건강보험에서 지급하는 일시금이고, 실업급여는 고용보험에서 지급하는 구직급여예요. 재원도 다르고 관할 기관도 달라서 둘 다 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제52조: 수급기간 연장 (출산·육아 사유)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령 제71조: 수급기간 연장 신청 절차 및 첨부서류", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 인터넷 신청 및 수급기간 연장 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 모성보호 제도(출산전후휴가·육아휴직) 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-임신",
    title: "임신 중 실업급여 신청과 수급 유예",
    description: "임신 상태에서 퇴직했을 때 실업급여를 받는 방법과 유예 절차를 정리했어요.",
  },
  {
    slug: "산전후휴가-계약만료-실업급여",
    title: "산전후휴가 중 계약만료 실업급여",
    description: "출산휴가 쓰다가 계약이 만료된 경우 실업급여 수급 조건을 정리했어요.",
  },
  {
    slug: "육아휴직-후-실업급여",
    title: "육아휴직 후 퇴직 시 실업급여",
    description: "육아휴직을 마치고 복직하지 않았을 때 실업급여를 받는 절차예요.",
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
          currentSlug="실업급여-출산"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 출산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        출산 후 실업급여, 언제 신청해?<br />
        수급기간 연장 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;아기 낳고 퇴직했는데, 실업급여 기한이 지난 거 아닌가요?&rdquo;<br />
        아직 늦지 않았어요. 출산했다고 수급자격 자체가 없어지진 않거든요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제52조</a>가
        출산·육아로 구직이 어려운 상황을 위해 수급기간을 <strong>최대 4년까지 연장</strong>해주는 제도를 두고 있어요.
        출산전후휴가 급여와는 별개 제도이고, 순서만 지키면 둘 다 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 수급 조건 + EligibilityChecker */}
      <H2>수급기간 연장 기준을 충족하려면 어떤 조건이 필요한가요?</H2>
      <p style={body}>
        기본 조건은 일반 실업급여와 같아요. 퇴직 전 18개월 내 <strong>고용보험 가입기간 180일 이상</strong>, 그리고 <strong>비자발적 퇴직</strong>이면 돼요. 출산을 했든 안 했든, 이 두 가지가 맞으면 수급자격이 생기죠.
      </p>
      <p style={body}>
        놓치기 쉬운 부분이 하나 있어요. 출산전후휴가나 육아휴직 기간도 <strong>고용보험 가입기간에 포함</strong>돼요. 출산휴가 90일에 육아휴직 12개월을 썼다면 그 기간이 전부 피보험기간으로 잡히죠. 오히려 180일 채우기가 더 수월해지는 구조예요.
      </p>
      <p style={body}>
        &ldquo;비자발적 퇴직&rdquo;이라는 조건도 빠뜨리면 안 돼요. 계약만료, 권고사직, 근무조건 불리변경은 당연히 해당되죠. 그런데 회사가 복직을 제안했는데 본인이 거부한 경우라면 자발적 퇴직으로 분류될 수 있어요. 이직확인서에 퇴직 사유가 어떻게 적히는지 반드시 살펴보세요.
      </p>

      <GreenBox>
        퇴직 전 18개월 내 고용보험 가입 <strong>180일 이상</strong><br />
        비자발적 퇴직 (계약만료, 권고사직, 정당한 사유 등)<br />
        출산전후휴가·육아휴직 기간 → 가입기간에 포함<br />
        출산전후휴가 급여 종료 후 → 실업급여 신청 가능
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 실업급여 수급자격이 있을 가능성이 높아요. 출산전후휴가 급여가 끝났다면 관할 고용센터에 방문해서 신청하세요."
        partialMatchText="일부만 해당돼요. 가입기간이나 퇴직 사유가 불확실하면 고용센터(1350)에 먼저 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2: 출산전후휴가 급여와 중복 불가 */}
      <H2>출산전후휴가 급여와 실업급여, 수급 기준이 어떻게 다른가요?</H2>
      <p style={body}>
        동시에 받는 건 안 돼요. 출산전후휴가 급여와 실업급여(구직급여)는 둘 다 고용보험 기금에서 나오는 돈이에요. 같은 재원이라 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 중복 수급을 막아놨죠. 순서를 지키면 문제 없어요.
      </p>
      <p style={body}>
        출산전후휴가는 90일(다태아 120일)이에요. 이 기간에 출산전후휴가 급여를 받고, 휴가가 완전히 끝난 뒤에 실업급여를 신청하면 되죠. 재직 중 출산휴가를 쓰다가 복직 없이 퇴직한 경우에도 순서는 동일해요.
      </p>
      <p style={body}>
        헷갈리기 쉬운 게 <strong>출산급여(건강보험 일시금)</strong>예요. 이건 건강보험공단에서 지급하는 별도 제도이고, 고용보험 재원이 아니에요. 그래서 출산급여와 실업급여를 동시에 받는 건 가능하죠. 이름이 비슷해서 혼동하는 분이 많은데, 재원 자체가 달라요.
      </p>

      <BorderBox>
        출산전후휴가 급여 (고용보험) → 종료 후 → 실업급여 신청 <strong>O</strong><br />
        출산전후휴가 급여 + 실업급여 동시 → <strong>X (중복 불가)</strong><br />
        출산급여 (건강보험) + 실업급여 → <strong>O (재원이 다름)</strong><br />
        육아휴직급여 → 종료 후 퇴직 → 실업급여 신청 <strong>O</strong>
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 수급기간 연장 + Checklist */}
      <H2>수급기간 연장 기준에 따라 최대 4년까지 미룰 수 있어요</H2>
      <p style={body}>
        실업급여는 퇴직 다음 날부터 <strong>12개월 이내</strong>에 소진해야 해요. 기한을 넘기면 남은 수급일수가 남아도 그냥 날아가죠. 그런데 신생아를 안고 면접을 보러 다니라는 건 말이 안 되잖아요.
      </p>
      <p style={body}>
        그래서 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제52조</a>가 출산과 육아를 수급기간 연장 사유로 인정하고 있어요. 고용센터에 출생증명서나 모자보건수첩 등을 내면{" "}
        <a href="/w/실업급여-수급기간-몇개월-받나요" style={{ color: "#1D9E75", textDecoration: "underline" }}>수급기간</a>을 <strong>최대 4년까지</strong> 늘려줘요. 아이가 좀 크고 어린이집에 맡기기 시작한 뒤에 여유 있게 구직활동을 해도 되는 거예요.
      </p>
      <p style={body}>
        신청 시점을 놓치면 안 돼요. 원래 수급기간 12개월이 만료되기 <strong>전에</strong> 연장을 신청해야 하죠. 기한이 지나고 나서 &ldquo;연장해주세요&rdquo; 해봤자 소용없어요. 기준이 퇴직일이지 출산일이 아니라는 것도 빠뜨리면 안 돼요. 퇴직하면 곧바로 고용센터에 연장 가능 여부를 확인하는 게 가장 안전하죠.
      </p>

      <GreenBox>
        대상: 출산·육아로 구직활동이 불가능한 수급자<br />
        연장 한도: 기본 12개월 → <strong>최대 4년</strong><br />
        제출 서류: 출생증명서, 모자보건수첩 등<br />
        신청처: 관할 고용센터 또는 고용24 온라인<br />
        주의: 원래 수급기간(12개월) 만료 전에 신청해야 해요
      </GreenBox>

      <SectionBadge>출산 후 실업급여 신청 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 육아휴직 후 퇴직 */}
      <H2>육아휴직 후 퇴직 시 수급기간 연장 적용 기준</H2>
      <p style={body}>
        출산 뒤 출산휴가와 육아휴직을 쓰다가 복직 없이 퇴직하는 분이 꽤 많죠. 이 경우에도 실업급여를 받을 수 있어요. 육아휴직 기간 전부가 고용보험 가입기간으로 잡히기 때문에 180일 조건은 오히려 넉넉하게 넘기는 편이에요.
      </p>
      <p style={body}>
        갈림길은 <strong>퇴직 사유</strong>예요. 회사가 복직을 거부했거나 복귀 뒤 근무조건이 나빠졌다면 비자발적 퇴직이죠. 실업급여 수급이 가능해요. 반면 회사가 원래 자리로 돌아오라는데 본인이 &ldquo;안 가겠다&rdquo;고 했다면 자발적 퇴직으로 잡힐 수 있어요.
      </p>
      <p style={body}>
        자발적 퇴직이라고 길이 완전히 막힌 건 아니에요. 육아를 이유로 한 퇴직이{" "}
        <a href="/w/실업급여-정당한-퇴사-사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>정당한 이직 사유</a>로 인정받는 경우가 있죠. 어린이집 대기가 걸려서 아이를 맡길 곳이 없는 상황 등이 해당될 수 있어요. 고용센터(1350)에 사전 상담을 꼭 받아보세요.
      </p>

      <BorderBox>
        회사가 복직 거부 → 비자발적 퇴직 → <strong>실업급여 수급 가능</strong><br />
        근무조건 불리 변경 → 비자발적 퇴직 → <strong>실업급여 수급 가능</strong><br />
        회사가 복직 제안 + 본인 거부 → 자발적 퇴직 → <strong>정당한 사유 심사 필요</strong><br />
        자발적 퇴직이라도 육아 사유 인정 시 수급 가능 (고용센터 심사)
      </BorderBox>

      <Divider />

      {/* 섹션 5: 구직활동 현실적 방법 */}
      <H2>출산 후 수급기간 연장, 이렇게 신청하세요</H2>
      <p style={body}>
        면접장을 돌아다녀야만{" "}
        <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동</a>이 인정되는 건 아니에요. <strong>워크넷(work.go.kr) 온라인 입사지원</strong>만으로도 충분히 인정돼요. 아기 재우고 나서 컴퓨터 앞에 앉아 입사지원 몇 건 넣으면 되는 거죠. 고용센터에 매번 가지 않아도 되는 방법이 여럿 있어요.
      </p>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 실업인정도 가능해요. 첫 번째 실업인정일에만 고용센터를 직접 방문하고, 그 이후부터는 온라인으로 처리하는 방식이죠. 영유아 자녀를 키우는 수급자에게는 구직활동 방식을 유연하게 조정해주는 경우가 많아요.
      </p>
      <p style={body}>
        방문 자체가 힘든 상황이면 담당자에게 전화로 사정을 설명하세요. 전화상담이나 화상상담으로 구직활동을 대체할 수 있는지 확인할 수 있어요. 인정 기준에 고용센터 재량이 있으니, 본인 상황을 솔직하게 말하는 게 가장 나은 방법이에요.
      </p>

      <GreenBox>
        워크넷(work.go.kr) 입사지원 → 구직활동으로 인정<br />
        고용24 온라인 실업인정 → 매번 고용센터 방문 불필요<br />
        전화·화상 직업상담 → 담당자 확인 후 대체 가능<br />
        첫 실업인정일만 방문, 이후 온라인 전환 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        출산 후 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 상황의 수급 인정 여부는 고용센터 심사에 따라 달라지니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
