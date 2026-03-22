"use client";

// Q1. 전일제에서 시간선택제로 전환했거나 전환 예정인 근로자가 세금 혜택이 있는지 확인하려는 상황
// Q2. 시간선택제 전환 세액감면 대상인지 확인하고, 회사 인사팀에 서류를 제출한다
// Q3. 조세특례제한법 제30조의4, 전환 요건(육아·돌봄), 감면 기간(3년), 다른 감면과 중복 불가
// Q4. GreenBox(요건 정리) + EligibilityChecker + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY_ITEMS = [
  { id: "fulltime", label: "전일제(주 40시간) 근로자였다가 시간선택제로 전환했다" },
  { id: "hours", label: "전환 후 주 15시간 이상 35시간 미만으로 근무하고 있다" },
  { id: "reason", label: "임신·출산·육아·가족돌봄 등의 사유로 전환했다" },
  { id: "same", label: "같은 회사에서 계속 근무하고 있다" },
];

const STEPS = [
  {
    title: "전환 확인서와 증빙 서류를 준비하세요",
    desc: "시간선택제 전환 확인서, 근로계약서(변경), 육아·돌봄 증빙 서류(가족관계증명서, 임신확인서 등)를 준비해요.",
    tip: "전환 확인서는 회사 인사팀에서 발급받을 수 있어요",
  },
  {
    title: "회사 인사팀에 서류를 제출하세요",
    desc: "인사팀에 준비한 서류를 제출하면 회사가 연말정산 때 자동으로 세액감면을 적용해줘요. 근로자가 직접 국세청에 신청하는 게 아니에요.",
  },
  {
    title: "급여명세서에서 감면 적용 여부를 확인하세요",
    desc: "매월 급여명세서에서 세액감면이 제대로 적용되고 있는지 확인하세요. 누락된 경우 인사팀에 정정을 요청할 수 있어요.",
    tip: "홈택스 간소화서비스에서도 확인 가능",
  },
];

const FAQS = [
  {
    q: "시간선택제가 뭔가요?",
    a: "주 15~35시간 일하는 단시간 근로 형태예요. 전일제(주 40시간)보다 근로시간이 짧죠. 육아나 돌봄 때문에 전환하는 경우가 많아요.",
  },
  {
    q: "처음부터 시간선택제로 입사해도 감면받나요?",
    a: "아니에요. 전일제에서 시간선택제로 '전환'한 근로자만 받을 수 있어요. 처음부터 파트타임으로 입사한 사람은 해당 안 돼요.",
  },
  {
    q: "감면 기간은 얼마나 되나요?",
    a: "전환 시점부터 3년간 받을 수 있어요. 3년이 지나면 자동 종료되고 일반 근로자와 같은 세율이 적용돼요.",
  },
  {
    q: "중간에 전일제로 복귀하면 어떻게 되나요?",
    a: "복귀한 시점까지만 감면받아요. 2년 만에 전일제로 돌아가면 2년치만 감면되고 나머지 1년은 못 받아요.",
  },
  {
    q: "중소기업 취업자 감면과 중복으로 받을 수 있나요?",
    a: "안 돼요. 시간선택제 전환 감면과 중소기업 취업자 감면은 중복 적용이 안 돼요. 둘 다 해당하면 더 유리한 쪽 하나만 선택해야 해요.",
  },
  {
    q: "의료비·교육비 같은 세액공제는 별도로 받나요?",
    a: "네, 세액공제는 감면과 별개예요. 의료비·교육비·연금저축 같은 세액공제는 시간선택제 감면과 함께 적용돼요.",
  },
];

const SOURCES = [
  { name: "조세특례제한법 제30조의4", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
  { name: "남녀고용평등법", href: "https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" },
];

const RELATED = [
  { slug: "연말정산-근로소득-범위", title: "근로소득 범위와 비과세 항목", description: "뭐가 과세되고 뭐가 안 되는지 정리." },
  { slug: "연말정산-다자녀-추가공제", title: "다자녀 자녀세액공제", description: "자녀 수에 따라 25만~95만원 세액공제." },
  { slug: "연말정산-문화비", title: "문화비 소득공제 30%", description: "도서·공연·영화 30% 공제 조건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 세액감면 · 시간선택제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        시간선택제로 전환하면 세금 혜택이 있나요?<br />
        세액감면 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        육아나 돌봄 때문에 근무시간을 줄이고 싶은데, 세금 혜택이 있는지 궁금하시죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 제30조의4</a>에 따라
        전일제에서 시간선택제로 전환하면 <strong>전환 후 3년간</strong> 산출세액의 일정 비율을 감면받을 수 있어요.
        근무시간을 줄이면서 세금도 아낄 수 있는 제도예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 감면 대상인지 체크해 보세요</H2>
      <p style={body}>
        네 가지 조건을 모두 충족해야 세액감면을 받을 수 있어요.
      </p>

      <SectionBadge>대상 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="시간선택제 전환 세액감면 대상일 가능성이 높아요. 회사 인사팀에 서류를 제출하세요."
        partialMatchText="일부 조건이 부족해요. 전환 사유나 근무시간을 확인해 보세요."
      />

      <Divider />

      <H2>감면 내용을 정리했어요</H2>
      <p style={body}>
        감면율과 기간, 한도를 알아두면 절세 효과를 미리 계산할 수 있어요.
      </p>

      <SectionBadge>감면 요약</SectionBadge>
      <GreenBox title="시간선택제 전환 세액감면">
        <p><strong>감면 방식</strong> — 산출세액의 일정 비율 감면 (세금에서 직접 차감)</p>
        <p><strong>감면 기간</strong> — 전환 시점부터 3년</p>
        <p><strong>적용 시점</strong> — 전환한 해의 연말정산부터</p>
        <p><strong>감면 종료</strong> — 3년 경과, 전일제 복귀, 퇴사 중 먼저 발생하는 시점</p>
      </GreenBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        근로자가 직접 국세청에 신청하는 게 아니에요.
        회사를 통해 적용받는 구조예요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>주의할 점을 알아두세요</H2>
      <p style={body}>
        몇 가지 함정이 있어서 미리 알아두면 좋아요.
      </p>
      <BorderBox>
        <p><strong>다른 감면과 중복 불가</strong> — 중소기업 취업자 감면, 고용유지 중소기업 감면과 중복 적용 안 돼요. 더 유리한 하나만 선택</p>
        <p><strong>세액공제는 별도</strong> — 의료비·교육비·연금저축 등 세액공제는 감면과 별개로 받을 수 있어요</p>
        <p><strong>근로시간 범위 유지</strong> — 주 15~35시간을 벗어나면 감면이 취소될 수 있어요</p>
        <p><strong>증빙 서류 보관</strong> — 전환 확인서, 육아·돌봄 증빙 서류를 3년간 보관해 두세요</p>
      </BorderBox>

      <Divider />

      <CategoryButton label="연말정산" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준(조세특례제한법)으로 작성했어요. 감면율과 한도는 개인 상황에 따라 다를 수 있으니 회사 인사팀이나 세무사에게 확인하세요." />
    </ArticleLayout>
  );
}
