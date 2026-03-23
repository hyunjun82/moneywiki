"use client";

// Q1. 선거사무보조원이 뭘 하는 직종인지, 급여가 얼마인지, 언제 모집하는지 궁금한 상황
// Q2. 선거사무보조원의 업무와 급여를 파악하고, 모집 시기에 맞춰 신청한다
// Q3. (1) 일당 6만원 이내의 근거 (2) 투표사무원과의 차이점 (3) 모집 시기와 근무 기간 (4) 공직선거법상 수당 기준
// Q4. GreenBox(급여 요약) + BorderBox(차이점) + Steps(신청 절차) + FAQ

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
    q: "선거사무보조원은 며칠간 일하나요?",
    a: "보통 선거일 전후 1~5일 정도예요. 모집 공고에 근무 기간이 명시되니 확인하면 되죠. 짧게는 하루, 길게는 일주일까지 다양해요.",
  },
  {
    q: "대학생도 선거사무보조원으로 일할 수 있나요?",
    a: "만 18세 이상이면 가능해요. 평일 근무인 경우도 있어서, 수업 일정과 맞는지 미리 확인하는 게 좋아요.",
  },
  {
    q: "투표사무원보다 급여가 왜 적은가요?",
    a: "투표사무원은 투표일 당일 14시간을 근무하지만, 선거사무보조원은 8시간 내외에 업무 강도도 낮아요. 공직선거법에서 '일당 6만원 이내'로 상한을 정해두고 있죠.",
  },
  {
    q: "선거사무보조원도 세금이 빠지나요?",
    a: "네, 기타소득으로 8.8% 원천징수돼요. 6만원 기준 약 5,280원이 빠져서 실수령액은 약 54,720원이에요.",
  },
  {
    q: "선거사무보조원은 어떤 경우에 모집하나요?",
    a: "선거 준비 물량이 많은 선관위에서 주로 모집해요. 투표소 설치/철거, 안내문 발송, 투표 안내 홍보 같은 단순 행정 업무를 도울 인력이 필요할 때 공고가 나죠.",
  },
];

const RELATED = [
  { slug: "투표사무원-급여-업무-신청자격", title: "투표사무원 일당과 업무", description: "13만원 일당 투표일 당일 근무 조건." },
  { slug: "선거알바-일정-공고-마감-타임라인", title: "알바 일정 타임라인", description: "공고부터 급여 지급까지 전체 일정." },
  { slug: "선거알바-4대보험-세금-원천징수", title: "세금과 원천징수 처리", description: "실수령액 계산과 세금 체계." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="선거사무보조원-급여-업무-모집시기" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/지방선거-알바-2026-직종별-급여-신청방법" style={{ color: "#6b7280" }}>지방선거 알바</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>선거사무보조원</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        선거사무보조원, 뭐 하고 얼마 받을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        업무 내용, 급여, 모집 시기 정리
      </p>

      <p style={body}>
        "선거사무보조원은 투표사무원이랑 뭐가 다른 걸까요?"
      </p>
      <p style={body}>
        선거사무보조원은 선거 전후에 행정 보조 업무를 담당하는 직종이에요. 투표소 설치, 안내문 발송, 물품 정리 같은 단순 업무가 중심이죠. 일당은 <strong>6만원 이내</strong>(공직선거법 기준)로 투표사무원보다 적지만, 근무시간과 업무 강도도 낮아요.
      </p>

      <GreenBox title="선거사무보조원 핵심 요약">
        일당: 6만원 이내 (공직선거법 상한){"\n"}
        실수령액: 약 54,720원 (6만원 기준, 8.8% 원천징수 후){"\n"}
        근무시간: 8시간 내외{"\n"}
        근무 기간: 선거일 전후 1~5일 (공고마다 다름){"\n"}
        업무: 투표소 설치/철거, 안내문 발송, 물품 정리 등
      </GreenBox>

      <ArticleAd position="intro" />
      <Divider />

      <H2>선거사무보조원의 업무 내용</H2>
      <SectionBadge>구체적으로 뭘 하나요</SectionBadge>

      <p style={body}>
        선거사무보조원은 선관위 직원들이 처리하기 어려운 단순 행정 업무를 보조해요. 투표일 당일이 아니라 선거 준비/정리 기간에 주로 투입되죠.
      </p>
      <p style={body}>
        주요 업무로는 투표소 설비(기표대, 투표함, 안내판) 설치와 철거, 선거 안내문과 투표 안내서 발송 보조, 투표 물품 정리와 운반 등이 있어요. 유권자와 직접 대면하는 일은 거의 없죠.
      </p>
      <p style={body}>
        투표사무원처럼 선거법 관련 지식이 필요한 건 아니에요. 물건을 옮기고 정리하는 단순 노동에 가까워서 별도의 사전 교육이 간소한 편이죠.
      </p>

      <Divider />

      <H2>투표사무원과 어떻게 다른가요</H2>
      <SectionBadge>차이점 비교</SectionBadge>

      <div style={{ overflowX: "auto", margin: "1rem 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.7 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>투표사무원</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>선거사무보조원</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "일당", a: "13만원", b: "6만원 이내" },
              { item: "근무시간", a: "약 14시간", b: "8시간 내외" },
              { item: "근무일", a: "투표일 당일", b: "선거 전후 1~5일" },
              { item: "업무", a: "신분확인, 투표용지 교부", b: "설치, 정리, 행정 보조" },
              { item: "유권자 대면", a: "직접 대면", b: "거의 없음" },
              { item: "난이도", a: "보통", b: "낮음" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.item}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>{row.a}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        급여는 투표사무원이 2배 이상 높지만, 근무시간과 업무 강도를 고려하면 선거사무보조원도 나쁘지 않아요. 특히 며칠 연속 근무가 가능하면 총 수령액이 더 많아질 수 있죠.
      </p>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/지방선거-알바-2026-직종별-급여-신청방법" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>모집 시기와 신청 방법</H2>
      <SectionBadge>언제 어디서 신청하나요</SectionBadge>

      <p style={body}>
        선거사무보조원 모집은 <strong>선거일 1~2개월 전</strong>부터 시작돼요. 투표사무원/개표사무원보다 먼저 모집하는 경우가 많죠. 투표소 설치 같은 준비 작업이 먼저 필요하니까요.
      </p>
      <p style={body}>
        신청은 각 시/군/구 선관위 홈페이지에서 해요. <Link href="/w/선거알바-신청방법-선관위-공고찾기" style={{ color: "#1D9E75", textDecoration: "underline" }}>선관위 공고 찾는 법</Link>을 참고하면 본인 지역 공고를 쉽게 찾을 수 있어요.
      </p>
      <p style={body}>
        모집 인원은 투표사무원보다 적은 편이에요. 지역별로 수십 명 수준이라 빨리 마감되는 경우도 있으니 공고가 뜨면 바로 신청하는 게 좋아요.
      </p>

      <Divider />

      <H2>급여와 세금 처리</H2>
      <SectionBadge>실수령액과 원천징수</SectionBadge>

      <p style={body}>
        공직선거법에서 선거사무보조원 수당 상한을 <strong>일당 6만원 이내</strong>로 정해두고 있어요. 지역에 따라 5만원~6만원 사이에서 지급되죠.
      </p>
      <p style={body}>
        세금은 다른 선거 알바와 동일하게 기타소득 8.8% 원천징수예요. 6만원 기준 약 5,280원이 빠져서 실수령액은 약 54,720원이에요. <Link href="/w/선거알바-4대보험-세금-원천징수" style={{ color: "#1D9E75", textDecoration: "underline" }}>세금 처리 상세 안내</Link>에서 더 자세히 볼 수 있어요.
      </p>
      <p style={body}>
        5일 연속 근무하면 총 수령액은 약 27만원(세후)이에요. 투표사무원 1일 근무(약 11.8만원 세후)보다 총액은 높아지죠.
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
              { label: "공직선거법 제135조 (선거사무관계자에 대한 수당과 실비보상)", url: "https://www.law.go.kr/법령/공직선거법" },
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
