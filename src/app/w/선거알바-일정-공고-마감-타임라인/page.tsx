"use client";

// Q1. 2026 지방선거 알바 일정을 전체적으로 파악해서 언제 신청하고 언제 일하는지 알고 싶은 상황
// Q2. 공고 시작부터 급여 지급까지 전체 타임라인을 파악하고, 적절한 시점에 신청한다
// Q3. (1) 공고 시작 시점 (2) 접수 마감 시점 (3) 사전 교육 일정 (4) 선거일과 급여 지급일
// Q4. Steps(타임라인) + GreenBox(핵심 날짜) + BorderBox(주의사항) + FAQ

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
    q: "사전투표일에도 알바를 구하나요?",
    a: "네, 사전투표(선거일 5일 전, 2일간)에도 별도로 투표사무원을 모집해요. 본투표 사무원과 따로 신청하는 경우가 많으니 공고를 꼼꼼히 살펴보세요.",
  },
  {
    q: "공고를 놓치면 다시 기회가 없나요?",
    a: "선관위에서 1차 모집 후 인원이 부족하면 2차, 3차 추가 모집을 하기도 해요. 하지만 확실히 하려면 1차 공고 때 신청하는 게 좋아요.",
  },
  {
    q: "사전 교육은 반드시 참석해야 하나요?",
    a: "네, 사전 교육 미참석 시 당일 투입이 안 될 수 있어요. 교육 일정은 선발 통보 때 함께 안내받으니 일정을 비워두세요.",
  },
  {
    q: "선거일에 투표도 할 수 있나요?",
    a: "투표사무원은 사전투표 기간에 미리 투표하거나, 근무 중 교대로 투표할 수 있는 시간이 주어져요. 투표권은 보장되니 걱정 없어요.",
  },
  {
    q: "지방선거 알바 일정은 국회의원 선거와 동일한가요?",
    a: "전체적인 흐름은 비슷하지만, 공고 시기와 모집 규모는 선거마다 달라요. 지방선거는 선출직이 많아서(시장, 도지사, 구청장, 시의원 등) 투표용지도 많고 개표도 더 오래 걸리죠.",
  },
];

const RELATED = [
  { slug: "선거알바-신청방법-선관위-공고찾기", title: "선관위 공고 찾는 법", description: "공고 확인하고 신청하는 방법." },
  { slug: "선거알바-급여-지급시기-입금", title: "급여 지급 시기", description: "일한 뒤 언제 입금되는지." },
  { slug: "지방선거-알바-2026-직종별-급여-신청방법", title: "직종별 급여 비교", description: "어떤 직종을 선택할지 비교." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="선거알바-일정-공고-마감-타임라인" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/지방선거-알바-2026-직종별-급여-신청방법" style={{ color: "#6b7280" }}>지방선거 알바</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>알바 일정</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        2026 지방선거 알바 일정
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        공고 시작, 접수 마감, 교육, 근무, 급여 지급 타임라인
      </p>

      <p style={body}>
        "선거 알바 공고는 언제 뜨고, 언제까지 신청해야 하나요?"
      </p>
      <p style={body}>
        2026년 6월 3일 제9회 전국동시지방선거가 확정됐어요. 선거 알바를 하려면 공고 시점을 놓치지 않는 게 가장 중요하죠. 공고부터 급여 지급까지 전체 타임라인을 정리해 드릴게요.
      </p>

      <GreenBox title="2026 지방선거 핵심 날짜">
        선거일: 2026년 6월 3일 (수){"\n"}
        사전투표: 2026년 5월 29일(금)~30일(토) (예상){"\n"}
        선거 운동 기간: 2026년 5월 21일(목)~6월 2일(화) (예상){"\n"}
        알바 공고: 2026년 3~4월경부터 순차 게시 (예상){"\n"}
        위 일정은 과거 선거 패턴 기준 예상이며, 확정 시 업데이트 예정
      </GreenBox>

      <ArticleAd position="intro" />
      <Divider />

      <H2>전체 타임라인</H2>
      <SectionBadge>공고부터 급여 지급까지</SectionBadge>

      <Steps
        steps={[
          { title: "선거일 3~4개월 전 (2~3월)", desc: "선거사무보조원, 공정선거지원단 모집이 먼저 시작돼요. 투표소 설치 등 사전 준비 인력이 필요하니까요." },
          { title: "선거일 2~3개월 전 (3~4월)", desc: "투표사무원, 개표사무원 모집 공고가 올라와요. 지역마다 시점이 다르니 선관위 홈페이지를 수시로 확인하세요." },
          { title: "선거일 1~2개월 전 (4~5월)", desc: "접수 마감. 선착순 마감인 곳은 일찍 끝나요. 1차에서 인원이 부족하면 추가 모집이 나오기도 해요." },
          { title: "선거일 2~3주 전 (5월 중순)", desc: "선발 통보 및 사전 교육. 2~3시간 교육을 받아야 당일 투입이 가능해요." },
          { title: "사전투표일 (5월 29~30일 예상)", desc: "사전투표 사무원이 근무해요. 본투표 사무원과 별도 모집인 경우가 많아요." },
          { title: "선거일 당일 (6월 3일)", desc: "투표사무원은 06시~20시, 개표사무원은 투표 마감 후~개표 종료까지 근무해요." },
          { title: "선거 후 1~2주", desc: "급여가 등록 계좌로 입금돼요. 8.8% 원천징수 후 실수령액이 들어오죠." },
        ]}
      />

      <Divider />

      <H2>직종별 모집 시기 차이</H2>
      <SectionBadge>어떤 직종이 먼저 모집되나요</SectionBadge>

      <div style={{ overflowX: "auto", margin: "1rem 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.7 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>직종</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>모집 시기 (예상)</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>근무 시기</th>
            </tr>
          </thead>
          <tbody>
            {[
              { job: "선거사무보조원", recruit: "2~3월", work: "선거 전후 1~5일" },
              { job: "공정선거지원단", recruit: "3~4월", work: "선거운동 기간 (5월 21일~6월 2일 예상)" },
              { job: "투표사무원", recruit: "3~4월", work: "선거일 당일 (6월 3일)" },
              { job: "개표사무원", recruit: "3~4월", work: "선거일 야간 (6월 3일 밤)" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.job}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>{row.recruit}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>{row.work}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        선거사무보조원이 가장 먼저 모집되고, 투표/개표사무원이 그 뒤를 따라요. 여러 직종을 동시에 신청할 수도 있으니, 원하는 직종의 공고 시기에 맞춰 <Link href="/w/선거알바-신청방법-선관위-공고찾기" style={{ color: "#1D9E75", textDecoration: "underline" }}>선관위 홈페이지</Link>를 확인하세요.
      </p>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/지방선거-알바-2026-직종별-급여-신청방법" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>공고를 놓치지 않는 팁</H2>
      <SectionBadge>미리 준비하세요</SectionBadge>

      <p style={body}>
        선관위 공고는 예고 없이 올라오고, 인기 지역은 빠르게 마감돼요. 놓치지 않으려면 미리 준비해야 하죠.
      </p>
      <p style={body}>
        첫째, 본인 거주지 관할 선관위 홈페이지를 즐겨찾기에 추가해 두세요. 둘째, 선관위에서 운영하는 알림 서비스나 뉴스레터가 있다면 구독해 두면 좋아요. 셋째, 포털에서 '선거사무원 모집' 키워드를 뉴스 알림으로 설정해 두면 공고가 뜰 때 바로 확인할 수 있죠.
      </p>
      <p style={body}>
        특히 선착순 마감인 지역은 공고 당일에 마감되는 경우도 있어요. 3~4월부터 주 1회 정도는 선관위 사이트를 점검하는 게 좋아요.
      </p>

      <Divider />

      <H2>지방선거 특이사항</H2>
      <SectionBadge>국회의원 선거와 뭐가 다른가요</SectionBadge>

      <p style={body}>
        지방선거는 국회의원 선거보다 선출직이 훨씬 많아요. 시장, 도지사, 구청장, 시의원, 도의원, 교육감까지 한꺼번에 뽑기 때문에 투표용지가 여러 장이죠.
      </p>
      <p style={body}>
        투표용지가 많으면 투표사무원의 업무 부담도 커져요. 유권자에게 여러 장의 투표용지를 교부해야 하고, 안내할 내용도 늘어나죠. 개표도 선출직별로 따로 해야 해서 개표 시간이 더 길어질 수 있어요.
      </p>
      <p style={body}>
        그만큼 필요 인력도 많아서 국선보다 모집 규모가 큰 편이에요. 지원 기회가 더 많다고 볼 수 있죠.
      </p>

      <BorderBox title="예상 일정 안내">
        이 글의 일정은 과거 선거 패턴을 기반으로 한 예상이에요. 2026년 지방선거 정확한 일정은 선관위 공고 확정 시 업데이트할게요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <References
        groups={[
          {
            category: "기관",
            items: [
              { label: "중앙선거관리위원회", url: "https://www.nec.go.kr" },
            ],
          },
          {
            category: "법령",
            items: [
              { label: "공직선거법", url: "https://www.law.go.kr/법령/공직선거법" },
              { label: "선거관리위원회법", url: "https://www.law.go.kr/법령/선거관리위원회법" },
            ],
          },
        ]}
      />

      <Disclaimer text="이 글은 공식 자료를 바탕으로 작성했지만, 실제 적용은 개인 상황에 따라 달라질 수 있어요. 정확한 내용은 관련 기관에 문의하세요." />
    </ArticleLayout>
  );
}
