"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 국민연금 열심히 냈는데 기초연금이 깎여서 억울하고, 연계감액이 없어질 수 있다는 뉴스를 봤는데 실제로 폐지되는지 궁금한 상황
// Q2. 연계감액 폐지 논의의 현재 상황을 파악하고, 현행 기준에서 내 감액 여부를 확인하는 것
// Q3. (1) 연계감액 폐지 논의 경과 (2) 현행 적용 기준(A급여액 150%) (3) 폐지 시 예상 변화
// Q4. GreenBox(현행 기준 요약) + BorderBox(폐지 논의 경과) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "연계감액이 폐지되면 기초연금을 더 받을 수 있나요?",
    a: "네, 현재 연계감액으로 기초연금이 줄어든 분들은 폐지되면 기준연금액 전액(349,360원)을 받을 수 있어요. 다만 부부감액이나 소득역전 방지 감액은 별개로 적용돼요.",
  },
  {
    q: "연계감액 폐지 법안이 언제 통과될 수 있나요?",
    a: "22대 국회 임기(2028년 5월까지) 내에 처리될 가능성이 있지만, 재정 문제로 확정되지 않았어요. 정부와 국회 상임위 논의 상황을 지켜봐야 해요.",
  },
  {
    q: "폐지되면 소급 적용되나요?",
    a: "법안에 따라 다르지만, 대부분의 발의안은 시행일 이후부터 적용하는 구조예요. 과거 감액분을 소급해서 돌려주는 내용은 포함되지 않은 경우가 많아요.",
  },
  {
    q: "연계감액 폐지에 반대하는 쪽의 논리는 뭔가요?",
    a: "재정 부담이 가장 큰 이유예요. 연간 약 1조원 이상의 추가 예산이 필요하고, 고령화로 수급자가 계속 늘어나면 부담이 커질 수 있다는 거죠. 국민연금과의 역할 분담 논의도 있어요.",
  },
  {
    q: "지금 연계감액 중인데 어떻게 하면 되나요?",
    a: "현재는 기초연금법에 따라 연계감액이 계속 적용되고 있어요. 폐지가 확정되기 전까지는 현행 기준대로 받게 돼요. 국민연금공단(1355)에서 본인의 A급여액을 확인해보세요.",
  },
  {
    q: "국민연금 개혁과 연계감액 폐지는 관련이 있나요?",
    a: "국민연금 개혁 논의에서 기초연금과의 연계 문제가 함께 다뤄지고 있어요. 국민연금 소득대체율을 높이면서 연계감액을 폐지하는 방향이 유력하게 검토되고 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제5조(기초연금액의 산정)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 제도 안내", url: "https://www.mohw.go.kr" },
      { label: "국민연금공단: 내 연금 알아보기", url: "https://www.nps.or.kr" },
      { label: "국회 의안정보시스템", url: "https://likms.assembly.go.kr/bill/main.do" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-연계감액-계산-A급여액", title: "연계감액 계산과 A급여액", description: "연계감액이 실제로 얼마나 깎이는지 계산 방법이에요." },
  { slug: "기초연금-감액기준-A급여액-조회", title: "감액 기준과 A급여액 조회", description: "A급여액을 직접 조회하는 방법이에요." },
  { slug: "국민연금-기초연금-동시수급-감액기준", title: "국민연금 동시 수급 감액 기준", description: "국민연금과 기초연금을 함께 받을 때의 감액 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-연계감액-폐지논의-현재기준" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>연계감액 폐지</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 연계감액, 없어지나?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        폐지 논의와 현재 기준
      </p>

      <p style={body}>
        "국민연금 열심히 냈더니 기초연금이 깎이다니." 이 불만이 수년째 이어지고 있고, 국회에서도 연계감액 폐지 법안이 여러 건 발의됐어요. 폐지가 실제로 될 수 있는 건지, 지금 기준은 어떻게 되는지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>현재 연계감액 기준 (2026년)</H2>
      <p style={body}>
        폐지 논의 전에 현행 기준부터 정확히 알아야 해요. 연계감액은 국민연금 A급여액이 기준연금액의 150%를 넘을 때 적용돼요.
      </p>

      <GreenBox>
        <strong>2026년 연계감액 현행 기준</strong><br /><br />
        기준연금액: 349,360원<br />
        연계감액 시작선: 349,360원 x 150% = 524,040원<br /><br />
        A급여액 524,040원 이하: 감액 없음 (기초연금 전액)<br />
        A급여액 524,040원 초과: 초과분에 비례해 감액<br />
        최대 감액 한도: 기준연금액의 50% (174,680원)까지<br /><br />
        → 아무리 국민연금이 많아도 기초연금이 174,680원 이하로는 안 떨어짐
      </GreenBox>

      <p style={body}>
        현재 연계감액 대상자는 기초연금 수급자 중 약 30% 수준이에요. 국민연금 가입 기간이 긴 분들이 주로 해당되죠.
      </p>

      <H2>폐지 논의는 어디까지 왔나</H2>
      <p style={body}>
        연계감액 폐지 논의는 2014년 기초연금 도입 직후부터 시작됐어요. 10년 넘게 논의만 되고 있지만, 최근 국민연금 개혁과 맞물려 진전 가능성이 높아졌어요.
      </p>

      <BorderBox>
        <strong>연계감액 폐지 논의 경과</strong><br /><br />
        2014년: 기초연금법 시행, 연계감액 규정 포함<br />
        2018년: 기초연금 인상(25만원→30만원) 시 폐지 논의, 재정 부담으로 무산<br />
        2020~2023년: 국회 보건복지위 여러 의원 폐지 법안 발의, 상임위 계류<br />
        2024년: 22대 국회 출범 후 폐지·축소 법안 재발의<br />
        2025년: 국민연금 개혁 논의와 연계해 "연계감액 단계적 폐지" 검토<br />
        2026년 3월: 상임위 논의 중, 아직 확정 안 됨
      </BorderBox>

      <p style={body}>
        현재 유력한 방향은 "단계적 폐지"예요. A급여액 기준을 150%에서 200%, 250%로 점차 올려서 감액 대상을 줄이고, 최종적으로 폐지하는 방식이죠.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>폐지되면 뭐가 달라지나</H2>
      <p style={body}>
        연계감액이 폐지되면 국민연금 수령액과 무관하게 기초연금을 받을 수 있어요. 현재 감액 중인 분들에게는 상당한 혜택이죠.
      </p>
      <p style={body}>
        예를 들어 국민연금을 월 100만원 받으면서 연계감액으로 기초연금이 17만원대인 분은 폐지 후 349,360원 전액을 받게 돼요. 월 약 18만원 차이가 나죠.
      </p>
      <p style={body}>
        다만 폐지에는 연간 약 1조원 이상의 추가 재정이 필요해요. 기초연금 수급자가 매년 늘어나고 있어서 장기적으로 재정 부담이 커질 수 있다는 게 정부 측 우려예요.
      </p>

      <H2>지금 해야 할 것</H2>
      <p style={body}>
        폐지가 확정되기 전까지는 현행 기준이 그대로 적용돼요. 그러니 지금 할 수 있는 건 두 가지예요.
      </p>
      <p style={body}>
        첫째, <Link href="https://www.nps.or.kr" style={{ color: "#1D9E75" }}>국민연금공단</Link>에서 본인의 A급여액을 조회해보세요. A급여액이 524,040원 이하이면 연계감액이 적용되지 않으니 안심하면 돼요.
      </p>
      <p style={body}>
        둘째, 연계감액이 적용되고 있다면 <Link href="/w/기초연금-연계감액-계산-A급여액" style={{ color: "#1D9E75" }}>정확한 감액 금액을 계산</Link>해보세요. 감액 후에도 국민연금 + 기초연금 합계가 유리한지, 국민연금 수령 시기를 조정하는 게 나은지 비교해볼 수 있어요.
      </p>
      <p style={body}>
        연계감액 폐지 법안의 국회 심의 상황은 <Link href="https://likms.assembly.go.kr/bill/main.do" style={{ color: "#1D9E75" }}>국회 의안정보시스템</Link>에서 확인할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 연계감액 폐지 관련 법안은 국회 심의 중이라 변경될 수 있어요. 최신 현황은 보건복지부 또는 국회 의안정보시스템에서 확인하세요." />
    </ArticleLayout>
  );
}
