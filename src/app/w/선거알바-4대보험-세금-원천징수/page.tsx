"use client";
// Q1. 선거 알바 수당에서 세금이 빠지는지, 4대보험 가입이 되는지 궁금한 상황
// Q2. 선거 알바의 세금 체계를 이해하고 실수령액을 정확히 계산한다
// Q3. (1) 기타소득 8.8% 원천징수 (2) 4대보험 미적용 (3) 직종별 실수령액 (4) 종합소득세 신고 여부
// Q4. GreenBox(핵심 요약) + 비교표(직종별 실수령액) + BorderBox(종합소득세) + FAQ

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

const PAY_TABLE = [
  { job: "투표관리관", gross: "190,000원", tax: "16,720원", net: "173,280원" },
  { job: "투표사무원", gross: "130,000원", tax: "11,440원", net: "118,560원" },
  { job: "개표사무원", gross: "75,000원", tax: "6,600원", net: "68,400원" },
  { job: "선거사무보조원", gross: "60,000원", tax: "5,280원", net: "54,720원" },
];

const FAQS = [
  {
    q: "선거 알바 수당은 종합소득세 신고 대상인가요?",
    a: "기타소득 중 필요경비를 제외한 소득이 연간 300만원 이하면 분리과세로 종결돼요. 선거 알바 1~2일 수당은 300만원에 한참 못 미치니 별도 종합소득세 신고는 필요 없는 경우가 대부분이에요.",
  },
  {
    q: "원천징수 영수증을 받을 수 있나요?",
    a: "네, 선관위에서 기타소득 원천징수 영수증을 발급해줘요. 연말정산이나 종합소득세 신고 시 필요하면 관할 선관위에 요청하면 되죠.",
  },
  {
    q: "투표사무원과 개표사무원을 같이 하면 세금은 어떻게 되나요?",
    a: "각각 기타소득으로 따로 원천징수돼요. 투표사무원 13만원에서 11,440원, 개표사무원 7.5만원에서 6,600원이 빠지죠. 합산 세전 20.5만원, 세후 약 187,000원이에요.",
  },
  {
    q: "4대보험이 안 되면 산재 사고 시 보상은 어떻게 받나요?",
    a: "선거사무원은 공무 수행자로 인정되기 때문에 근무 중 사고가 발생하면 국가배상법에 의한 보상을 받을 수 있어요. 산재보험과는 별개의 절차이죠.",
  },
  {
    q: "선거 알바 수당을 현금으로 받을 수 있나요?",
    a: "아니에요, 계좌 이체로만 지급돼요. 접수 시 등록한 본인 명의 계좌로 입금되죠. 현금 지급은 하지 않아요.",
  },
];

const RELATED = [
  { slug: "선거알바-급여-지급시기-입금", title: "급여 지급 시기", description: "언제 입금되는지 일정 안내." },
  { slug: "투표사무원-개표사무원-급여-비교", title: "투표 vs 개표 비교", description: "시급 환산과 실수령액 차이." },
  { slug: "지방선거-알바-2026-직종별-급여-신청방법", title: "직종별 급여 비교", description: "전체 직종 비교표." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="선거알바-4대보험-세금-원천징수" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/선거알바-신청방법-선관위-공고찾기" style={{ color: "#6b7280" }}>지방선거 알바</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>4대보험/세금</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        선거 알바 4대보험 적용될까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        세금 8.8% 원천징수, 실수령액 계산, 종합소득세
      </p>

      <p style={body}>
        "선거 알바 일당에서 세금이 빠지나요? 4대보험 가입이 되는 건가요?"
      </p>
      <p style={body}>
        선거 알바 수당은 <strong>기타소득</strong>으로 분류돼요. 근로소득이 아니라서 4대보험은 적용되지 않고, 대신 <strong>8.8%</strong>(소득세 8% + 지방소득세 0.8%)가 원천징수된 뒤 나머지가 통장에 들어오죠.
      </p>

      <GreenBox title="세금 처리 핵심 요약">
        소득 분류: 기타소득 (근로소득 아님){"\n"}
        원천징수: 8.8% (소득세 8% + 지방소득세 0.8%){"\n"}
        4대보험: 미적용 (국민연금, 건강보험, 고용보험, 산재보험 전부){"\n"}
        종합소득세: 연 300만원 이하면 분리과세로 종결
      </GreenBox>

      <ArticleAd position="intro" />
      <Divider />

      <H2>왜 4대보험이 안 되나요</H2>
      <SectionBadge>단기 용역의 세금 구조</SectionBadge>

      <p style={body}>
        선거 알바는 근로계약을 체결하는 게 아니라 <strong>단기 용역 위촉</strong> 형태예요. 선관위와 고용 관계가 아닌 위촉 관계이기 때문에 근로기준법상 근로자가 아니죠.
      </p>
      <p style={body}>
        4대보험(국민연금, 건강보험, 고용보험, 산재보험)은 근로자에게 적용되는 제도예요. 선거사무원은 근로자 신분이 아니라서 4대보험 가입 대상이 아니에요.
      </p>
      <p style={body}>
        대신 수당이 기타소득으로 분류되면서 8.8% 원천징수가 돼요. 기타소득은 일시적이고 비정기적인 소득에 부과되는 세금이에요. 강연료, 원고료 같은 것과 같은 방식이죠.
      </p>

      <Divider />

      <H2>직종별 실수령액 계산</H2>
      <SectionBadge>세금 빼면 얼마 남나요</SectionBadge>

      <p style={body}>
        아래 표는 2024년 국선 기준 수당에서 8.8% 원천징수를 뺀 실수령액이에요.
      </p>

      <div style={{ overflowX: "auto", margin: "1rem 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.7 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>직종</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세전</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>원천징수 (8.8%)</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>실수령액</th>
            </tr>
          </thead>
          <tbody>
            {PAY_TABLE.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.job}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>{row.gross}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#dc2626" }}>{row.tax}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{row.net}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        투표사무원과 개표사무원을 겸직하면 합산 세전 205,000원, 원천징수 18,040원, 실수령액 약 186,960원이에요.
      </p>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/선거알바-신청방법-선관위-공고찾기" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>종합소득세 신고는 해야 하나요</H2>
      <SectionBadge>추가 세금 납부 여부</SectionBadge>

      <p style={body}>
        기타소득은 필요경비를 제외한 소득 금액이 연간 300만원을 넘으면 종합소득세 신고 대상이에요. 하지만 선거 알바 1~2일 수당은 아무리 겸직해도 20만원 내외이니 300만원에 한참 못 미치죠.
      </p>
      <p style={body}>
        기타소득의 필요경비율은 60%예요. 투표사무원 13만원 기준으로 필요경비를 빼면 소득 금액은 52,000원이에요. 연 300만원 이하이면 <strong>분리과세</strong>로 종결되기 때문에 별도 종합소득세 신고가 필요 없죠.
      </p>
      <p style={body}>
        다만 프리랜서로 다른 기타소득이 많은 분은 합산 금액이 300만원을 넘을 수 있어요. 이 경우에는 5월 종합소득세 신고 때 선거 알바 수당도 포함해서 신고해야 해요.
      </p>

      <BorderBox title="원천징수 영수증은 선관위에서 발급">
        종합소득세 신고가 필요하거나 연말정산에 반영하고 싶으면, 관할 선관위에 기타소득 원천징수 영수증 발급을 요청하면 돼요.
      </BorderBox>

      <Divider />

      <H2>근무 중 사고가 나면 어떻게 되나요</H2>
      <SectionBadge>산재보험이 안 되는데</SectionBadge>

      <p style={body}>
        산재보험은 적용되지 않지만 걱정할 필요는 없어요. 선거사무원은 <strong>공무 수행자</strong>로 인정되기 때문에 근무 중 사고 시 국가배상법에 의한 보상을 받을 수 있어요.
      </p>
      <p style={body}>
        투표소에서 넘어지거나 다치는 경우, 관할 선관위에 즉시 보고하면 돼요. 이후 치료비와 보상 절차가 진행되죠. 산재보험과는 별개의 공적 보상 체계예요.
      </p>
      <p style={body}>
        다만 출퇴근 중 사고는 상황에 따라 인정 여부가 달라질 수 있어요. 가능하면 근무 장소까지의 이동 경로를 기록해 두는 게 좋아요.
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
              { label: "소득세법 제21조 (기타소득)", url: "https://www.law.go.kr/법령/소득세법" },
              { label: "공직선거법", url: "https://www.law.go.kr/법령/공직선거법" },
            ],
          },
          {
            category: "기관",
            items: [
              { label: "국세청 홈택스", url: "https://www.hometax.go.kr" },
              { label: "중앙선거관리위원회", url: "https://www.nec.go.kr" },
            ],
          },
        ]}
      />

      <Disclaimer text="이 글은 공식 자료를 바탕으로 작성했지만, 실제 적용은 개인 상황에 따라 달라질 수 있어요. 정확한 내용은 관련 기관에 문의하세요." />
    </ArticleLayout>
  );
}
