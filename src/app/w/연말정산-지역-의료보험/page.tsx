"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 프리랜서·개인사업자가 지역가입자 건강보험료를 연말정산에서 공제받을 수 있는지 궁금한 상황
// Q2. 지역가입자는 연말정산이 아닌 5월 종합소득세 신고 때 공제받는다는 것을 이해하고 실행한다
// Q3. 연말정산=직장가입자만, 지역가입자=종합소득세, 직장→지역 전환 시 각각 공제, 간소화서비스 조회
// Q4. GreenBox(핵심 구분) + BorderBox(사례별 정리) + Steps(종합소득세 공제 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "5월에 홈택스 종합소득세 신고 페이지를 열어요",
    desc: "홈택스에 로그인하고 '종합소득세 신고' 메뉴로 들어가요. 모두채움 신고서가 뜨면 건강보험료 납부 내역이 자동으로 반영돼 있는 경우가 많아요. 건강보험공단에서 국세청에 자료를 제출하기 때문이에요.",
    tip: "5월 1일~31일이 신고 기간이에요",
    link: { label: "홈택스 종합소득세 신고", href: "https://www.hometax.go.kr" },
  },
  {
    title: "건강보험료 납부 금액을 확인하세요",
    desc: "소득공제 항목에서 건강보험료 금액이 자동으로 잡혀 있는지 확인해요. 안 나와 있으면 건강보험공단(nhis.or.kr)에서 납부확인서를 발급받아 직접 입력하면 돼요.",
    tip: "건강보험공단 앱에서도 납부확인서 발급 가능",
  },
  {
    title: "납부한 보험료 전액을 소득공제받아요",
    desc: "지역가입자 건강보험료는 전액 소득공제 대상이에요. 장기요양보험료도 포함돼요. 납부한 금액 그대로 과세표준에서 빼주니까 세율만큼 절세가 되는 구조예요.",
    tip: "장기요양보험료까지 합산해서 공제",
  },
];

const FAQS = [
  {
    q: "프리랜서도 건강보험료를 공제받을 수 있나요?",
    a: "네. 프리랜서는 대부분 지역가입자예요. 연말정산은 안 되지만 5월 종합소득세 신고 때 납부한 건강보험료 전액을 소득공제받아요.",
  },
  {
    q: "직장 다니다가 퇴사하면 보험료 공제는 어떻게 되나요?",
    a: "직장 다닐 때 낸 보험료는 회사가 연말정산에 반영해요. 퇴사 후 지역가입자로 낸 보험료는 5월 종합소득세 신고 때 본인이 공제받으면 돼요. 둘 다 공제 가능해요.",
  },
  {
    q: "건강보험료 납부확인서는 어디서 발급받나요?",
    a: "건강보험공단 홈페이지(nhis.or.kr)나 앱에서 발급받을 수 있어요. 홈택스 간소화서비스에서도 5월 신고 시 자동 조회되는 경우가 많아요.",
  },
  {
    q: "부양가족의 지역 건강보험료도 내가 공제받을 수 있나요?",
    a: "본인이 실제로 부담한 부양가족의 보험료는 공제받을 수 있어요. 다만 본인 계좌에서 이체한 증빙이 있어야 해요.",
  },
  {
    q: "연말정산과 종합소득세 신고를 둘 다 해야 하는 경우가 있나요?",
    a: "네. 직장 소득과 프리랜서 소득이 둘 다 있으면 회사에서 연말정산을 하고, 5월에 다른 소득을 합산해서 종합소득세를 신고해요. 이때 지역가입자 보험료도 함께 공제받아요.",
  },
];

const SOURCES = [
  { name: "국세청 종합소득세 안내", href: "https://www.nts.go.kr" },
  { name: "건강보험공단", href: "https://www.nhis.or.kr" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 가이드", description: "직장인을 위한 연말정산 전체 구조." },
  { slug: "연말정산-건강보험료", title: "건강보험료 소득공제 방법", description: "직장가입자 건강보험료 공제 조건." },
  { slug: "연말정산-종합소득세", title: "종합소득세 신고 방법", description: "프리랜서·투잡 직장인을 위한 5월 신고." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 건강보험 · 지역가입자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지역 건강보험료, 연말정산에서 공제되나요?<br />
        직장·지역가입자별 공제 방법 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        프리랜서인데 건강보험료를 매달 내고 있잖아요. 이걸 연말정산에서 돌려받을 수 있냐고요?
      </p>
      <p style={body}>
        결론부터 말하면, 지역가입자 건강보험료는 <strong>연말정산 대상이 아니에요</strong>.
        연말정산은 <strong>직장가입자(회사원)</strong>만 하는 거예요. 프리랜서나 개인사업자는 <strong>5월 종합소득세 신고</strong> 때 건강보험료 전액을 소득공제받아요.
        직장을 다니다 퇴사한 경우엔 둘 다 공제받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>직장가입자와 지역가입자, 공제 방법이 달라요</H2>
      <p style={body}>
        건강보험은 <strong>직장가입자</strong>와 <strong>지역가입자</strong>로 나뉘어요. 공제받는 시점과 방법이 완전히 달라요.
      </p>

      <SectionBadge>가입 유형별 공제 방법</SectionBadge>
      <GreenBox>
        직장가입자 (회사원){"\n"}
        · 급여에서 원천징수 → 연말정산에서 자동 반영{"\n"}
        · 별도로 챙길 것 없음{"\n\n"}
        지역가입자 (프리랜서·개인사업자·무직){"\n"}
        · 본인이 직접 납부 → 5월 종합소득세 신고 때 공제{"\n"}
        · 전액 소득공제 대상
      </GreenBox>

      <p style={body}>
        직장가입자는 회사가 알아서 처리해 주니까 신경 쓸 게 없어요.
        지역가입자는 본인이 직접 챙겨야 해요. 5월 신고를 안 하면 공제를 못 받는 거예요.
      </p>

      <CategoryButton label="연말정산 가이드" count={30} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>중간에 직장가입자에서 지역가입자로 바뀌면요?</H2>
      <p style={body}>
        연 중에 퇴사하면 <strong>직장가입자 → 지역가입자</strong>로 전환돼요. 이 경우 보험료 공제를 두 군데서 받을 수 있어요.
      </p>

      <SectionBadge>전환 시 공제 방법</SectionBadge>
      <BorderBox>
        <strong>예시: 6월 말 퇴사</strong>{"\n"}
        · 1~6월 직장가입자 보험료 → 회사가 연말정산에 반영{"\n"}
        · 7~12월 지역가입자 보험료 → 5월 종합소득세 신고에서 공제{"\n"}
        · 둘 다 공제 가능, 손해 없음{"\n\n"}
        <strong>주의할 점</strong>{"\n"}
        · 입사 전에 지역가입자로 낸 보험료는 연말정산에서 공제 불가{"\n"}
        · 근로 제공 기간 중 납부분만 연말정산 대상
      </BorderBox>

      <p style={body}>
        퇴사 후 프리랜서로 전환했다면 종합소득세 신고를 꼭 하세요.
        안 하면 지역가입자 보험료뿐만 아니라 다른 공제도 못 받아요.
      </p>

      <Divider />

      <H2>종합소득세 신고 때 이렇게 공제받으세요</H2>
      <p style={body}>
        지역가입자가 건강보험료를 공제받으려면 5월 종합소득세 신고가 필수예요. 대부분 자동으로 반영되지만 확인은 꼭 해야 해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        지역 건강보험료 공제에서 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 기준으로 작성했어요. 건강보험료 공제 방법은 가입 유형과 소득 종류에 따라 달라질 수 있으니 국세청과 건강보험공단에서 확인해 주세요." />
    </ArticleLayout>
  );
}
