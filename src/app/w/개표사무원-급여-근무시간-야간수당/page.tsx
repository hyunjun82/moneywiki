"use client";

// Q1. 개표사무원은 밤에 하는 알바라는데 급여가 얼마고 몇 시간 일하는지 알고 싶은 상황
// Q2. 개표사무원의 급여, 근무시간, 야간 수당 체계를 파악하고 신청 여부를 결정한다
// Q3. (1) 일당 7.5만원의 근거 (2) 야간 4~8시간 근무 환경 (3) 야간 수당 별도 여부 (4) 투표사무원 겸직 가능 여부
// Q4. GreenBox(급여 요약) + BorderBox(야간 수당 설명) + Steps(개표 흐름) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const SIDEBAR_ITEMS = [
  { slug: "지방선거-알바-2026-직종별-급여-신청방법", title: "지방선거 알바 허브" },
  { slug: "투표사무원-급여-업무-신청자격", title: "투표사무원 급여/업무" },
  { slug: "개표사무원-급여-근무시간-야간수당", title: "개표사무원 급여/시간" },
  { slug: "선거사무보조원-급여-업무-모집시기", title: "선거사무보조원" },
  { slug: "공정선거지원단-신청조건-활동내용", title: "공정선거지원단" },
  { slug: "선거알바-신청자격-나이-결격사유", title: "신청 자격/결격사유" },
  { slug: "선거알바-신청방법-선관위-공고찾기", title: "신청 방법/공고 찾기" },
  { slug: "선거알바-4대보험-세금-원천징수", title: "4대보험/세금 처리" },
  { slug: "투표사무원-개표사무원-급여-비교", title: "투표 vs 개표 비교" },
  { slug: "선거알바-급여-지급시기-입금", title: "급여 지급 시기" },
  { slug: "선거알바-일정-공고-마감-타임라인", title: "알바 일정 타임라인" },
];

const FAQS = [
  {
    q: "개표는 보통 몇 시에 끝나나요?",
    a: "지역과 투표 규모에 따라 달라요. 빠르면 자정 전후, 늦으면 새벽 3~4시까지 이어지기도 해요. 대도시 구청 개표소는 투표지가 많아서 시간이 더 걸리죠.",
  },
  {
    q: "개표사무원도 사전 교육을 받나요?",
    a: "네, 개표 절차와 투표지 분류 방법에 대해 1~2시간 정도 사전 교육이 있어요. 교육 날짜는 선발 통보 때 함께 안내받죠.",
  },
  {
    q: "야간 근무라 귀가 교통편이 걱정돼요",
    a: "일부 선관위에서 셔틀버스를 운영하거나 택시비를 지원하는 경우가 있어요. 확정된 건 아니고 지역마다 다르니 사전 교육 때 미리 물어보세요.",
  },
  {
    q: "투표사무원과 개표사무원을 같은 날에 둘 다 할 수 있나요?",
    a: "가능해요. 낮에 투표사무원(13만원)으로 일하고, 밤에 개표사무원(7.5만원)까지 하면 하루에 약 20만원을 벌 수 있어요. 다만 총 20시간 이상 연속 근무라 체력 소모가 커요.",
  },
  {
    q: "7.5만원에서 세금 빼면 실수령액은 얼마인가요?",
    a: "기타소득 8.8% 원천징수 후 실수령액은 약 68,400원이에요. 투표사무원과 겸직하면 합산 실수령이 약 187,000원 정도 되죠.",
  },
];

const RELATED = [
  { slug: "투표사무원-급여-업무-신청자격", title: "투표사무원 일당과 업무", description: "낮 시간대 13만원 일당 근무 조건." },
  { slug: "투표사무원-개표사무원-급여-비교", title: "투표 vs 개표 비교", description: "시급 환산으로 어떤 게 유리한지." },
  { slug: "선거알바-급여-지급시기-입금", title: "급여 언제 입금되나", description: "선거 후 지급 일정 안내." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="개표사무원-급여-근무시간-야간수당" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/지방선거-알바-2026-직종별-급여-신청방법" style={{ color: "#6b7280" }}>지방선거 알바</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>개표사무원</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        개표사무원 급여와 근무시간
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        야간 수당 계산, 업무 내용, 겸직 가능 여부
      </p>

      <p style={body}>
        "개표 알바는 밤에만 일한다는데, 급여는 얼마나 되는 걸까요?"
      </p>
      <p style={body}>
        개표사무원은 투표가 마감된 뒤 투표지를 분류하고 집계하는 역할이에요. 야간 4~8시간 근무하고 일당 <strong>7.5만원</strong>(2024년 국선 기준)을 받죠. 근무시간 대비 급여만 보면 투표사무원보다 시급이 높은 편이에요.
      </p>

      <GreenBox title="개표사무원 핵심 요약 (2024년 국선 기준)">
        일당: 7.5만원 (세전){"\n"}
        실수령액: 약 68,400원 (8.8% 원천징수 후){"\n"}
        근무시간: 4~8시간 (투표 마감 후 ~ 개표 종료){"\n"}
        시급 환산: 약 9,375원~18,750원 (근무시간에 따라 변동){"\n"}
        2026년 수당은 선관위 공고 확정 시 업데이트 예정
      </GreenBox>

      <ArticleAd position="intro" />
      <Divider />

      <H2>개표사무원의 업무 내용</H2>
      <SectionBadge>구체적으로 뭘 하나요</SectionBadge>

      <p style={body}>
        개표사무원은 개표소(주로 구청, 체육관 등)에서 투표함을 열고 투표지를 분류하는 일을 해요. 후보별로 투표지를 나누고, 분류기에 넣고, 결과를 집계하는 과정을 보조하죠.
      </p>
      <p style={body}>
        자동분류기가 있는 개표소에서는 기계에 투표지를 넣는 보조 역할이 중심이에요. 수작업 분류가 필요한 무효표나 의심표는 별도 확인 과정을 거치는데, 이 부분은 경험자가 주로 맡아요.
      </p>
      <p style={body}>
        개표 참관인(정당 추천)과 함께 진행되기 때문에 모든 과정이 공개적으로 이뤄져요. 투표지를 몰래 빼거나 훼손하는 행위는 당연히 선거법 위반이고 형사 처벌 대상이에요.
      </p>

      <Divider />

      <H2>근무 당일 흐름</H2>
      <SectionBadge>개표 시작부터 종료까지</SectionBadge>

      <Steps
        steps={[
          { title: "투표 마감 후 집합 (18:00~20:00)", desc: "투표 마감 시간에 맞춰 개표소에 모여요. 역할 배분과 최종 교육을 받죠." },
          { title: "투표함 도착 및 개봉", desc: "각 투표소에서 봉인된 투표함이 도착하면 개표관리관 입회 하에 개봉해요." },
          { title: "투표지 분류 및 집계", desc: "자동분류기 또는 수작업으로 후보별 투표지를 나누고 매수를 세요." },
          { title: "결과 확인 및 종료", desc: "최종 집계가 끝나면 정리하고 퇴근이에요. 빠르면 자정, 늦으면 새벽 3~4시." },
        ]}
      />

      <p style={body}>
        근무시간은 개표 물량에 따라 달라요. 소규모 선거구는 4시간 안에 끝나기도 하고, 대규모 선거구는 8시간 이상 걸리기도 하죠. 일당은 동일하게 7.5만원이에요.
      </p>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/지방선거-알바-2026-직종별-급여-신청방법" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>야간 수당은 별도로 받나요</H2>
      <SectionBadge>야간 근무 수당 체계</SectionBadge>

      <p style={body}>
        결론부터 말하면, <strong>야간 수당이 별도로 추가되지는 않아요</strong>. 개표사무원 일당 7.5만원에 야간 근무 대가가 포함된 구조이죠.
      </p>
      <p style={body}>
        근로기준법상 야간근로 가산수당(50%)은 근로자에게 적용되는 건데, 선거사무원은 근로계약이 아닌 단기 용역 위촉이에요. 그래서 근로기준법상 야간수당 규정이 적용되지 않죠.
      </p>
      <p style={body}>
        그래도 시급으로 환산하면 나쁘지 않아요. 4시간 만에 끝나면 시급 약 18,750원, 8시간이 걸려도 시급 약 9,375원이니까요. <Link href="/w/투표사무원-개표사무원-급여-비교" style={{ color: "#1D9E75", textDecoration: "underline" }}>투표사무원과의 시급 비교</Link>는 별도 글에서 자세히 다뤘어요.
      </p>

      <BorderBox title="투표사무원과 겸직하면?">
        낮에 투표사무원(13만원) + 밤에 개표사무원(7.5만원) = 하루 약 20만원. 세금 공제 후 실수령 약 187,000원이에요. 20시간 이상 연속 근무라 체력에 자신 있는 분만 추천해요.
      </BorderBox>

      <Divider />

      <H2>신청 방법과 유의사항</H2>
      <SectionBadge>어디서 신청하나요</SectionBadge>

      <p style={body}>
        개표사무원 모집은 각 시/군/구 선관위에서 진행해요. <Link href="/w/선거알바-신청방법-선관위-공고찾기" style={{ color: "#1D9E75", textDecoration: "underline" }}>선관위 공고 찾는 법</Link>을 참고해서 본인 거주 지역 선관위 홈페이지를 확인하세요.
      </p>
      <p style={body}>
        투표사무원과 개표사무원을 동시에 지원할 수 있는 경우가 많아요. 공고에 "투표/개표 겸직 가능" 여부가 명시되니 꼼꼼히 살펴보세요. 개표소 위치는 투표소와 다른 경우가 대부분이라 이동 시간도 고려해야 해요.
      </p>
      <p style={body}>
        야간 근무 후 귀가 교통편도 미리 확인해 두세요. 일부 지역은 셔틀을 운영하지만, 자차나 택시를 이용해야 하는 곳도 많아요.
      </p>

      <BorderBox title="2024년 기준 안내">
        이 글의 수당 정보는 2024년 제22대 국선 기준이에요. 2026년 지방선거 수당은 선관위 공고 확정 시 업데이트할게요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <References
        groups={[
          {
            category: "법령",
            items: [
              { label: "공직선거법", url: "https://www.law.go.kr/법령/공직선거법" },
            ],
          },
          {
            category: "기관",
            items: [
              { label: "중앙선거관리위원회", url: "https://www.nec.go.kr" },
            ],
          },
        ]}
      />

      <Disclaimer text="이 글은 공식 자료를 바탕으로 작성했지만, 실제 적용은 개인 상황에 따라 달라질 수 있어요. 정확한 내용은 관련 기관에 문의하세요." />
    </ArticleLayout>
  );
}
