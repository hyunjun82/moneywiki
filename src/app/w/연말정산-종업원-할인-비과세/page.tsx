"use client";

// Q1. 회사 제품을 직원 할인으로 샀는데 세금이 붙는지 궁금한 상황
// Q2. 종업원 할인 비과세 조건(시가 20% + 연 240만원)을 확인하고 내 할인이 비과세인지 판단한다
// Q3. 시가 20% 이상 가격 조건, 연 240만원 한도, 초과분 과세 방식, 재판매 금지 조건
// Q4. GreenBox(핵심 요약) + BorderBox(조건 정리) + 예시 테이블 + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "모든 회사에 적용되나요?",
    a: "회사가 직접 생산하거나 판매하는 제품·서비스에 대한 직원 할인이면 다 해당돼요. 제조업, 유통업, 서비스업 상관없어요.",
  },
  {
    q: "240만원 넘으면 전액 과세인가요?",
    a: "아니에요, 초과분만 과세돼요. 할인 혜택이 300만원이면 240만원은 비과세, 60만원만 근로소득으로 과세돼요.",
  },
  {
    q: "시가의 20% 미만으로 사면 어떻게 되나요?",
    a: "비과세 혜택 자체를 못 받아요. 100만원짜리를 10만원에 샀으면(시가의 10%) 할인액 90만원 전체가 과세 대상이에요. 240만원 한도고 뭐고 의미 없어요.",
  },
  {
    q: "직원 할인으로 산 제품을 되팔아도 되나요?",
    a: "안 돼요. 직접 소비 목적으로 구매해야 비과세예요. 자동차·대형가전·고가재화는 2년, 그 외 재화는 1년간 재판매가 금지돼요. 위반하면 비과세가 취소될 수 있어요.",
  },
  {
    q: "급여명세서에 어떻게 표시되나요?",
    a: "비과세 범위 내라면 급여명세서에 비과세 항목으로 처리돼요. 240만원 초과분이 있으면 근로소득에 포함돼서 세금이 부과돼요. 인사팀에 확인해 보세요.",
  },
  {
    q: "언제부터 적용되나요?",
    a: "2025년 귀속분(2026년 2월 연말정산)부터 적용돼요. 2024년 이전 직원 할인에는 해당 안 돼요.",
  },
];

const SOURCES = [
  { name: "국세청 비과세 근로소득", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6588&cntntsId=7867" },
  { name: "소득세법 시행령 제38조", href: "https://www.law.go.kr/법령/소득세법시행령" },
];

const RELATED = [
  { slug: "연말정산-비과세-소득", title: "연말정산 비과세 소득", description: "식대, 보육수당 등 비과세 항목 정리." },
  { slug: "연말정산-식대-비과세", title: "연말정산 식대 비과세", description: "식대 월 20만원 비과세 조건." },
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 . 비과세 . 종업원 할인</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        직원 할인받으면 세금 내야 하나요?<br />
        종업원 할인 비과세 조건과 한도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "회사 제품 30% 할인받았는데, 이것도 세금 붙나요?"
      </p>
      <p style={body}>
        2025년 귀속부터 <strong>시가의 20% 이상</strong> 가격으로 사고, 할인 혜택이 <strong>연 240만원 이하</strong>면 비과세예요.
        예전에는 직원 할인도 전부 <a href="/w/연말정산-근로소득-범위" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로소득</a>으로 과세됐는데, 이제 조건만 맞으면 세금 걱정 없이 할인받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>비과세 조건이 뭔가요?</H2>
      <p style={body}>
        두 가지를 동시에 충족해야 해요. 하나라도 안 맞으면 비과세 혜택을 못 받아요.
      </p>

      <SectionBadge>핵심 비과세 조건</SectionBadge>
      <GreenBox title="2가지 조건 모두 충족해야 비과세">
        <strong>조건 1.</strong> 시가(정가)의 <strong>20% 이상</strong> 가격으로 구매 (80% 넘게 할인받으면 안 됨)<br />
        <strong>조건 2.</strong> 연간 할인 혜택 합계 <strong>240만원 이하</strong><br /><br />
        + 직접 소비 목적으로 구매해야 하고, 일정 기간 재판매 금지
      </GreenBox>

      <Divider />

      <H2>240만원 넘으면 전부 과세되나요?</H2>
      <p style={body}>
        아니에요, <strong>초과분만 과세</strong>돼요. 240만원까지는 비과세, 넘는 금액만 근로소득에 포함돼요.
      </p>

      <SectionBadge>금액별 과세 예시</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연간 할인 혜택</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비과세</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>과세</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["100만원", "100만원", "0원"],
              ["240만원", "240만원", "0원"],
              ["300만원", "240만원", "60만원"],
              ["500만원", "240만원", "260만원"],
            ].map(([total, free, taxed], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, background: "#fafafa" }}>{total}</td>
                <td style={{ padding: "10px 12px", color: "#1D9E75" }}>{free}</td>
                <td style={{ padding: "10px 12px" }}>{taxed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />
      <ArticleAd position="mid" />

      <H2>시가 20% 조건, 구체적으로 어떤 뜻인가요?</H2>
      <p style={body}>
        정가의 20% 이상을 내고 사야 한다는 뜻이에요. 거의 공짜로 주는 건 사실상 현물 급여니까 비과세 대상이 아니에요.
      </p>

      <SectionBadge>시가 20% 기준 예시</SectionBadge>
      <BorderBox title="가격 조건 비교">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>정가 100만원 → 최소 <strong>20만원</strong> 이상 내고 사야 비과세</li>
          <li>정가 100만원 → 5만원에 샀다면? 시가의 5%라서 비과세 <strong>불가</strong></li>
          <li>정가 4,000만원 → 시가의 20% = 800만원, 할인액 중 800만원까지 비과세 가능</li>
        </ul>
      </BorderBox>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령 제38조</a>에서 시가의 20% 또는 연 240만원 중 큰 금액까지 비과세로 규정하고 있어요.
        고가 제품이면 시가 20% 기준이 240만원보다 클 수 있고, 저가 제품은 240만원이 더 크죠.
      </p>

      <Divider />

      <H2>재판매 금지 조건도 있어요</H2>
      <p style={body}>
        비과세 혜택을 받으려면 직접 소비 목적으로 구매해야 해요. 되팔면 안 돼요.
      </p>

      <SectionBadge>재판매 금지 기간</SectionBadge>
      <BorderBox title="품목별 재판매 금지 기간">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li><strong>자동차, 대형가전, 고가재화</strong>: 구매 후 <strong>2년간</strong> 재판매 금지</li>
          <li><strong>그 외 일반 재화</strong>: 구매 후 <strong>1년간</strong> 재판매 금지</li>
        </ul>
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="연말정산 글 더보기" href="/w" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 일반적인 안내예요. 회사별 직원 할인 정책이 다를 수 있으니 인사팀에 비과세 적용 여부를 확인하세요." />
    </ArticleLayout>
  );
}
