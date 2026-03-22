"use client";

// Q1. 투표사무원과 개표사무원 중 어떤 걸 해야 더 유리한지 비교해서 고르고 싶은 상황
// Q2. 시급 환산, 업무 난이도, 체력 소모를 비교해서 본인에게 맞는 직종을 선택한다
// Q3. (1) 일당과 시급 환산 비교 (2) 근무시간과 업무 난이도 (3) 겸직 시 총 수령액 (4) 체력 부담 차이
// Q4. 비교표(핵심) + GreenBox(결론) + BorderBox(겸직 팁) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
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

const COMPARE = [
  { item: "일당", vote: "13만원", count: "7.5만원" },
  { item: "근무시간", vote: "약 14시간 (06시~20시)", count: "4~8시간 (야간)" },
  { item: "시급 환산", vote: "약 9,300원", count: "약 9,375~18,750원" },
  { item: "실수령액 (8.8% 공제)", vote: "약 118,560원", count: "약 68,400원" },
  { item: "업무", vote: "신분확인, 투표용지 교부", count: "투표지 분류, 집계 보조" },
  { item: "대면 여부", vote: "유권자 직접 대면", count: "대면 없음 (내부 작업)" },
  { item: "체력 소모", vote: "높음 (장시간 서서 근무)", count: "보통 (앉아서 분류 가능)" },
  { item: "근무 시간대", vote: "낮 (오전~저녁)", count: "밤 (저녁~새벽)" },
];

const FAQS = [
  {
    q: "시급으로만 보면 개표사무원이 더 유리한가요?",
    a: "개표가 4시간 만에 끝나면 시급 18,750원으로 투표사무원(9,300원)보다 훨씬 높아요. 하지만 8시간 걸리면 시급이 비슷해지죠. 개표 소요 시간은 당일에야 알 수 있어서 불확실성이 있어요.",
  },
  {
    q: "둘 다 하면 총 얼마를 받나요?",
    a: "세전 합계 205,000원, 8.8% 원천징수 후 실수령 약 186,960원이에요. 하루에 20만원 가까이 버는 셈이죠.",
  },
  {
    q: "체력적으로 둘 다 하는 게 가능한가요?",
    a: "가능은 하지만 정말 힘들어요. 오전 6시부터 시작해서 개표가 끝나는 새벽 3~4시까지 약 20시간 이상 연속 근무가 되니까요. 체력에 자신 있는 분만 추천해요.",
  },
  {
    q: "어떤 걸 먼저 신청해야 하나요?",
    a: "겸직을 원하면 공고에 '투표/개표 겸직 가능'이라고 적힌 건 한 번에 신청하면 돼요. 따로 모집하는 경우에는 두 공고에 각각 접수해야 해요.",
  },
  {
    q: "개표사무원은 경쟁률이 더 높은 편인가요?",
    a: "지역마다 다르지만, 근무시간이 짧아서 인기가 높은 편이에요. 특히 야간 근무에 거부감이 없는 대학생들의 지원이 많죠.",
  },
];

const RELATED = [
  { slug: "투표사무원-급여-업무-신청자격", title: "투표사무원 상세 안내", description: "업무 내용과 당일 흐름." },
  { slug: "개표사무원-급여-근무시간-야간수당", title: "개표사무원 상세 안내", description: "야간 근무 환경과 절차." },
  { slug: "선거알바-4대보험-세금-원천징수", title: "세금 처리 방법", description: "실수령액과 원천징수 계산." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="투표사무원-개표사무원-급여-비교" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/지방선거-알바-2026-직종별-급여-신청방법" style={{ color: "#6b7280" }}>지방선거 알바</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>투표 vs 개표 비교</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        투표사무원 vs 개표사무원
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        급여, 시급 환산, 근무시간, 난이도 비교
      </p>

      <p style={body}>
        "투표사무원이 돈은 더 많이 받는데, 시급으로 치면 개표사무원이 나을 수도 있지 않나요?"
      </p>
      <p style={body}>
        맞아요, 일당만 보면 투표사무원(13만원)이 개표사무원(7.5만원)보다 높지만, 근무시간을 고려하면 이야기가 달라져요. 두 직종의 급여, 시급, 업무 난이도를 비교해서 어떤 게 본인에게 맞는지 판단해 보세요.
      </p>

      <Divider />

      <H2>핵심 비교표</H2>
      <SectionBadge>2024년 국선 기준</SectionBadge>

      <div style={{ overflowX: "auto", margin: "1rem 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.7 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>투표사무원</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>개표사무원</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.item}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>{row.vote}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ArticleAd position="intro" />
      <Divider />

      <H2>시급 환산으로 보면 어떤 게 유리할까</H2>
      <SectionBadge>시급으로 계산해 보면</SectionBadge>

      <p style={body}>
        투표사무원은 14시간에 13만원이니 시급 약 <strong>9,300원</strong>이에요. 2026년 최저시급에 가까운 수준이죠.
      </p>
      <p style={body}>
        개표사무원은 근무시간에 따라 시급이 크게 달라져요. 4시간이면 시급 <strong>18,750원</strong>으로 투표사무원의 2배가 되고, 8시간이면 시급 <strong>9,375원</strong>으로 비슷해지죠. 개표 소요 시간은 지역과 투표 규모에 따라 달라서 미리 예측하기 어려워요.
      </p>
      <p style={body}>
        확정된 금액을 중시한다면 투표사무원이 나아요. 시간 대비 효율을 따진다면 개표사무원에 기대를 걸어볼 수 있죠. 단, 개표가 오래 걸릴 수 있는 리스크는 감수해야 해요.
      </p>

      <GreenBox title="정리하면">
        안정적으로 13만원 확보 → 투표사무원{"\n"}
        짧은 시간에 높은 시급 기대 → 개표사무원{"\n"}
        최대 금액 확보 → 둘 다 겸직 (약 20만원)
      </GreenBox>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/지방선거-알바-2026-직종별-급여-신청방법" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>업무 난이도와 체력 소모</H2>
      <SectionBadge>어떤 게 더 힘든가요</SectionBadge>

      <p style={body}>
        <strong>투표사무원</strong>은 14시간 동안 서서 근무하는 게 가장 큰 부담이에요. 유권자 대면 업무라 집중력도 계속 유지해야 하죠. 점심~저녁 피크 시간대에 유권자가 몰리면 상당히 바빠요.
      </p>
      <p style={body}>
        <strong>개표사무원</strong>은 야간 근무라는 점이 부담이지만, 업무 자체는 투표지를 분류하고 넣는 반복 작업이에요. 앉아서 할 수 있는 경우도 많고, 유권자 대면이 없어서 심리적 부담은 적죠.
      </p>
      <p style={body}>
        체력 기준으로만 보면 개표사무원이 상대적으로 편한 편이에요. 하지만 새벽까지 일하고 귀가하는 게 부담이라면 투표사무원이 생활 패턴에 맞을 수 있죠.
      </p>

      <Divider />

      <H2>겸직하면 어떻게 되나요</H2>
      <SectionBadge>둘 다 하는 건 가능한가요</SectionBadge>

      <p style={body}>
        <strong>가능해요.</strong> 낮에 투표사무원으로 일하고, 투표 마감 후 개표소로 이동해서 개표사무원으로 일할 수 있어요.
      </p>
      <p style={body}>
        세전 합계 205,000원, 세후 실수령 약 186,960원이에요. 하루에 이 정도 벌 수 있는 단기 알바는 흔치 않죠.
      </p>
      <p style={body}>
        다만 오전 6시부터 새벽 3~4시까지 약 20시간 이상 연속 근무가 돼요. 투표소와 개표소 위치가 다르면 이동 시간까지 추가되죠. 체력에 진짜 자신 있는 분만 도전하세요.
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
