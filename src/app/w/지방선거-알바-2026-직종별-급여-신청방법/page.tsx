"use client";

// Q1. 2026 지방선거 단기 알바를 해보고 싶은데, 어떤 직종이 있고 얼마 받는지 비교해서 골라야 하는 상황
// Q2. 직종별 급여와 업무를 비교한 뒤 자기에게 맞는 알바를 선택하고 선관위에 신청한다
// Q3. (1) 직종 종류와 급여 차이 (2) 근무시간과 업무 강도 (3) 신청 자격과 결격사유 (4) 신청 방법과 공고 일정
// Q4. 비교표(직종별) + GreenBox(핵심 요약) + Steps(신청 절차) + FAQ

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

const JOB_COMPARE = [
  { job: "투표관리관", pay: "19만원/일", hours: "약 14시간", duty: "투표소 총괄 관리", difficulty: "높음" },
  { job: "투표사무원", pay: "13만원/일", hours: "약 14시간", duty: "신분 확인, 투표용지 교부", difficulty: "보통" },
  { job: "개표사무원", pay: "7.5만원/일", hours: "4~8시간 (야간)", duty: "투표지 분류, 집계 보조", difficulty: "보통" },
  { job: "선거사무보조원", pay: "6만원 이내/일", hours: "8시간 내외", duty: "사전 준비, 행정 보조", difficulty: "낮음" },
  { job: "공정선거지원단", pay: "활동비 별도", hours: "수시", duty: "불법 선거운동 감시", difficulty: "낮음" },
];

const FAQS = [
  {
    q: "선거 알바는 만 몇 세부터 할 수 있나요?",
    a: "만 18세 이상이면 가능해요. 선거권이 있는 대한민국 국민이면 누구나 신청할 수 있어요. 다만 공무원, 후보자 관계자 등은 결격사유에 해당돼요.",
  },
  {
    q: "투표사무원과 개표사무원을 동시에 할 수 있나요?",
    a: "네, 둘 다 신청하면 하루에 투표사무(낮) + 개표사무(밤) 연달아 할 수 있어요. 이 경우 일당 합계가 약 20만원 정도 되지만 체력 소모가 상당하죠.",
  },
  {
    q: "선거 알바 급여에서 세금이 빠지나요?",
    a: "네, 기타소득으로 분류돼서 8.8%(소득세 8% + 지방소득세 0.8%)가 원천징수돼요. 4대보험은 단기 용역이라 적용되지 않아요.",
  },
  {
    q: "경쟁률이 높은가요?",
    a: "지역마다 차이가 커요. 대학가나 인구 밀집 지역은 빠르게 마감되고, 농어촌 지역은 비교적 여유 있는 편이에요. 공고가 뜨면 바로 신청하는 게 유리해요.",
  },
  {
    q: "선거 알바 경험이 스펙에 도움이 되나요?",
    a: "공공기관 활동 경력으로 기재할 수 있어요. 특히 공정선거지원단은 시민 참여 활동으로 자기소개서에 활용할 수 있죠.",
  },
  {
    q: "선거일 당일에만 일하나요?",
    a: "직종에 따라 달라요. 투표사무원은 투표일 당일, 개표사무원은 투표 마감 후 야간이에요. 선거사무보조원은 선거일 전후로 며칠간 근무하기도 해요.",
  },
  {
    q: "2026년 지방선거 알바 수당은 확정됐나요?",
    a: "아직 확정되지 않았어요. 이 글의 수당 정보는 2024년 제22대 국선 기준이에요. 2026년 수당은 선관위 공고 확정 시 업데이트할게요.",
  },
];

const RELATED = [
  { slug: "투표사무원-급여-업무-신청자격", title: "투표사무원 일당과 업무", description: "13만원 일당의 구체적 업무 내용." },
  { slug: "개표사무원-급여-근무시간-야간수당", title: "개표사무원 급여와 야간 수당", description: "야간 4~8시간 근무 조건." },
  { slug: "선거알바-신청방법-선관위-공고찾기", title: "선관위 공고 찾는 법", description: "지역별 신청 경로와 공고 확인 방법." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="지방선거-알바-2026-직종별-급여-신청방법" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>지방선거 알바</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        2026 지방선거 알바, 하루 최대 19만원?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        직종별 급여, 근무시간, 신청 방법 비교
      </p>

      <p style={body}>
        "선거 때 하루 알바로 19만원 받을 수 있다는데, 어떤 일을 해야 하죠?"
      </p>
      <p style={body}>
        2026년 6월 3일 제9회 전국동시지방선거가 확정됐어요. 선거 때마다 선관위에서 단기 인력을 대규모로 모집하는데, 직종에 따라 하루 7.5만원부터 19만원까지 일당이 달라요. 어떤 직종이 있고 뭘 선택해야 유리한지, 한눈에 비교해 드릴게요.
      </p>

      <GreenBox title="2024년 국선 기준 수당 (2026년 미확정)">
        투표관리관: 19만원/일 (투표소 총괄){"\n"}
        투표사무원: 13만원/일 (신분확인, 투표용지 교부){"\n"}
        개표사무원: 7.5만원/일 (야간 4~8시간){"\n"}
        선거사무보조원: 6만원 이내/일{"\n"}
        2026년 수당은 선관위 공고 확정 시 업데이트 예정
      </GreenBox>

      <ArticleAd position="intro" />
      <Divider />

      <H2>직종별 급여와 근무시간 비교</H2>
      <SectionBadge>직종 비교표</SectionBadge>

      <p style={body}>
        선거 알바는 크게 5가지 직종이 있어요. 급여가 높을수록 근무시간이 길고 책임도 커지죠. 본인 체력과 일정에 맞는 직종을 골라야 해요.
      </p>

      <div style={{ overflowX: "auto", margin: "1rem 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.7 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>직종</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>일당</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>근무시간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>주요 업무</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>난이도</th>
            </tr>
          </thead>
          <tbody>
            {JOB_COMPARE.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.job}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{row.pay}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>{row.hours}</td>
                <td style={{ padding: "10px 12px" }}>{row.duty}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>{row.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        투표관리관이 가장 높은 19만원이지만 투표소 전체를 책임지는 자리라 경험자 우대인 경우가 많아요. 처음 도전한다면 투표사무원(13만원)이나 개표사무원(7.5만원)이 현실적이에요.
      </p>

      <BorderBox title="투표사무원 + 개표사무원 동시 가능">
        낮에 투표사무원, 밤에 개표사무원을 연달아 하면 하루 약 20만원을 벌 수 있어요. 다만 새벽까지 이어지는 강행군이라 체력을 고려해야 해요.
      </BorderBox>

      <Divider />

      <H2>직종별 상세 안내</H2>
      <SectionBadge>각 직종 자세히 보기</SectionBadge>

      <p style={body}>
        각 직종의 구체적인 업무 내용, 근무 환경, 주의할 점을 따로 정리해뒀어요. 관심 있는 직종을 눌러 자세한 내용을 확인해 보세요.
      </p>

      <div style={{ display: "grid", gap: 12, margin: "1rem 0" }}>
        {[
          { slug: "투표사무원-급여-업무-신청자격", label: "투표사무원", desc: "일당 13만원, 투표일 당일 06시~20시 근무" },
          { slug: "개표사무원-급여-근무시간-야간수당", label: "개표사무원", desc: "일당 7.5만원, 투표 마감 후 야간 4~8시간" },
          { slug: "선거사무보조원-급여-업무-모집시기", label: "선거사무보조원", desc: "일당 6만원 이내, 선거 전후 행정 보조" },
          { slug: "공정선거지원단-신청조건-활동내용", label: "공정선거지원단", desc: "활동비 별도, 불법 선거운동 감시" },
        ].map((item) => (
          <Link key={item.slug} href={`/w/${item.slug}`} style={{ display: "block", padding: "14px 16px", borderRadius: 10, border: "1px solid #e5e7eb", textDecoration: "none", color: "#111" }}>
            <strong style={{ color: "#1D9E75", fontSize: 15 }}>{item.label}</strong>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{item.desc}</p>
          </Link>
        ))}
      </div>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/지방선거-알바-2026-직종별-급여-신청방법" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>신청 자격과 결격사유</H2>
      <SectionBadge>누가 할 수 있나요</SectionBadge>

      <p style={body}>
        선거 알바는 <strong>만 18세 이상 선거권을 가진 대한민국 국민</strong>이면 누구나 신청할 수 있어요. 대학생, 직장인(연차 사용), 프리랜서 모두 가능하죠.
      </p>
      <p style={body}>
        단, 결격사유에 해당하면 신청 자체가 안 돼요. 공무원, 정당 당원, 후보자의 가족(배우자, 직계존비속), 후보자 선거사무관계자는 제외돼요. <Link href="/w/선거알바-신청자격-나이-결격사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>신청 자격과 결격사유 상세 안내</Link>에서 자세히 확인할 수 있어요.
      </p>

      <BorderBox title="공무원도 개표참관은 가능">
        공무원은 선거 알바를 할 수 없지만, 개표참관인으로 참여하는 건 별개예요. 다만 이 경우 급여가 아니라 참관 활동이라 수당 체계가 달라요.
      </BorderBox>

      <Divider />

      <H2>신청 방법과 공고 찾기</H2>
      <SectionBadge>어디서 어떻게 신청하나요</SectionBadge>

      <Steps
        steps={[
          { title: "중앙선거관리위원회 접속", desc: "nec.go.kr에 접속하거나, 본인 거주 지역 구/시/군 선관위 홈페이지를 방문해요." },
          { title: "채용 공고 확인", desc: "'선거사무원 모집' 또는 '투표사무원 모집' 공고를 찾아요. 보통 선거일 2~3개월 전부터 올라와요." },
          { title: "온라인 또는 방문 접수", desc: "공고에 따라 온라인 접수 또는 관할 선관위 방문 접수로 신청해요. 신분증 사본이 필요한 경우가 많아요." },
          { title: "선발 통보", desc: "접수 마감 후 선관위에서 개별 연락을 줘요. 사전 교육 일정도 함께 안내받아요." },
        ]}
      />

      <p style={body}>
        공고는 지역마다 시점이 다르고, 선착순 마감인 경우가 많아요. 선거일 3개월 전부터 주기적으로 <Link href="/w/선거알바-신청방법-선관위-공고찾기" style={{ color: "#1D9E75", textDecoration: "underline" }}>선관위 공고</Link>를 확인하는 게 좋아요.
      </p>

      <Divider />

      <H2>세금과 급여 지급</H2>
      <SectionBadge>세금 처리와 입금 시기</SectionBadge>

      <p style={body}>
        선거 알바 수당은 <strong>기타소득</strong>으로 분류돼요. 급여에서 8.8%(소득세 8% + 지방소득세 0.8%)가 원천징수되고, 나머지가 통장에 입금되죠.
      </p>
      <p style={body}>
        4대보험은 적용되지 않아요. 하루짜리 단기 용역이기 때문에 국민연금, 건강보험, 고용보험, 산재보험 모두 가입 대상이 아니에요. <Link href="/w/선거알바-4대보험-세금-원천징수" style={{ color: "#1D9E75", textDecoration: "underline" }}>세금 처리 상세 안내</Link>에서 실수령액 계산 예시를 확인할 수 있어요.
      </p>
      <p style={body}>
        급여는 선거 후 1~2주 내에 본인 계좌로 입금돼요. 접수 시 등록한 계좌로 들어오니 계좌 정보를 정확히 기재해야 해요.
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
              { label: "선거관리위원회법", url: "https://www.law.go.kr/법령/선거관리위원회법" },
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
