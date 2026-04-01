"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 청년인데 내가 받을 수 있는 정부·지자체 혜택이 뭔지 한번에 확인하고 싶은 상황
// Q2. 카테고리별 혜택 리스트 확인 → 자격 되는 것 골라서 → 각 페이지로 이동해 신청
// Q3. K-패스 교통비 30% / 청년월세지원 월 20만원 / 경기도 청년기본소득 / 국민연금 보험료 지원
// Q4. GreenBox(혜택 카드 그리드) + BorderBox(신청 우선순위 가이드) + 각 내부링크

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR, K패스_HIGHLIGHT } from "@/data/K-패스-guide";

const GREEN = "#1D9E75";

const BENEFITS = [
  {
    category: "교통",
    title: "K-패스 교통비 환급",
    desc: "월 15회 이상 대중교통 이용 시 교통비 30% 환급 (청년 기준). 버스·지하철·GTX 모두 해당.",
    amount: "월 최대 3만원 이상",
    slug: "K-패스-청년-환급",
    tag: "매달 환급",
  },
  {
    category: "주거",
    title: "청년월세지원",
    desc: "만 19~34세, 월세 사는 무주택 청년에게 월 최대 20만원씩 2년간 지원. 2026년 3월 30일~5월 29일 신청.",
    amount: "월 최대 20만원 × 24개월",
    slug: "청년월세지원",
    tag: "2026 신청중",
  },
  {
    category: "소득",
    title: "경기도 청년기본소득",
    desc: "경기도 거주 만 24세 청년에게 분기당 25만원(연 100만원) 지역화폐로 지급.",
    amount: "연 100만원",
    slug: "경기도-청년-기본소득-신청-기간-및-지급-조건",
    tag: "경기도 한정",
  },
  {
    category: "연금",
    title: "예술인·청년 국민연금 보험료 지원",
    desc: "저소득 예술인·지역가입자 청년의 국민연금 보험료 일부를 국가가 지원.",
    amount: "보험료 50% 지원",
    slug: "예술인-국민연금-보험료-지원",
    tag: "해당자 한정",
  },
];

const FAQS = [
  {
    q: "청년 혜택 여러 개를 동시에 받을 수 있나요?",
    a: "대부분 중복 수령 가능해요. K-패스 환급과 청년월세지원은 다른 사업이라 동시에 받을 수 있어요. 단, 청년월세지원은 주거급여 등 유사 지원과 중복이 제한될 수 있어요.",
  },
  {
    q: "가장 먼저 신청해야 할 혜택은 뭔가요?",
    a: "2026년 기준 청년월세지원 신청 기간(3월 30일~5월 29일)이 정해져 있어요. 이 기간을 놓치면 1년을 기다려야 해요. K-패스는 상시 신청 가능하니 월세지원 먼저 챙기세요.",
  },
  {
    q: "K-패스 카드는 어느 것을 골라야 하나요?",
    a: "연회비 없는 체크카드가 부담 없어요. 카카오뱅크·신한·농협 K-패스 체크카드가 인기예요. 신용카드 기준으로는 현대·BC카드가 추가 혜택이 많아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "K-패스 공식 사이트", url: "https://korea-pass.kr" },
      { label: "복지로 청년월세지원 신청", url: "https://www.bokjiro.go.kr" },
      { label: "경기도 청년기본소득 신청", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "34개 카드 연회비·혜택 한눈에 비교해요." },
  { slug: "청년월세지원-자격조건", title: "청년월세지원 자격조건", description: "소득·자산·주거 조건 상세 정리예요." },
  { slug: "K-패스-환급-계산", title: "K-패스 환급액 계산", description: "내 교통비로 월 얼마 돌아오는지 계산해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} highlightSlugs={K패스_HIGHLIGHT} currentSlug="청년-패스" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 혜택 · 교통 · 주거 · 소득
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년 패스 — 지금 받을 수 있는<br />
        혜택 4가지 한눈에 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년이라면 놓치기 쉬운 혜택이 생각보다 많아요.
        K-패스로 교통비를 돌려받고, 월세도 지원받을 수 있어요.
        자격이 되는 것만 골라서 신청하면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>받을 수 있는 혜택 4가지</H2>
      <p style={body}>
        신청 기간이 있는 것부터 먼저 챙기세요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>혜택</th>
              <th style={{ textAlign: "right", padding: "5px 8px", color: GREEN }}>지원 금액</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>태그</th>
            </tr>
          </thead>
          <tbody>
            {BENEFITS.map((b, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>
                  <a
                    href={`/w/${b.slug}`}
                    style={{ fontWeight: 700, color: "#111", textDecoration: "none" }}
                  >
                    {b.title}
                  </a>
                  <br />
                  <span style={{ fontSize: 11, color: "#666" }}>{b.desc}</span>
                </td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: GREEN, fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>
                  {b.amount}
                </td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 6px",
                    background: b.tag.includes("신청중") ? "#1D9E75" : "rgba(29,158,117,0.12)",
                    color: b.tag.includes("신청중") ? "#fff" : GREEN,
                    borderRadius: 4,
                  }}>
                    {b.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>신청 우선순위 가이드</H2>
      <p style={body}>
        기간 제한이 있는 것, 금액이 큰 것 순으로 챙기세요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>① 청년월세지원 (2026년 3월 30일~5월 29일)</strong><br />
        기간을 놓치면 1년을 기다려야 해요. 최대 480만원(24개월)이라 금액이 가장 커요.<br />
        소득 기준이 맞는다면 무조건 먼저 신청하세요.<br />
        → <a href="/w/청년월세지원" style={{ color: GREEN }}>청년월세지원 자격·신청 방법 보기</a><br />
        <br />
        <strong style={{ color: GREEN }}>② K-패스 교통비 환급 (상시 신청 가능)</strong><br />
        카드 발급 후 k-pass.or.kr에 등록하면 그달부터 환급이 시작돼요.<br />
        연회비 없는 체크카드면 부담 없이 시작할 수 있어요.<br />
        → <a href="/w/K-패스-카드-비교" style={{ color: GREEN }}>K-패스 카드 34개 전체 비교 보기</a><br />
        <br />
        <strong style={{ color: GREEN }}>③ 경기도 청년기본소득 (만 24세 경기도민)</strong><br />
        분기별 신청이에요. 만 24세가 되는 해에 놓치지 말고 챙기세요.<br />
        → <a href="/w/경기도-청년-기본소득-신청-기간-및-지급-조건" style={{ color: GREEN }}>경기도 청년기본소득 신청 조건 보기</a>
      </BorderBox>

      <H2>K-패스 × 청년월세지원 동시 수령 전략</H2>
      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { item: "K-패스 (청년 30%)", monthly: "월 2~4만원 환급", note: "교통비 10만원 기준" },
              { item: "청년월세지원", monthly: "월 최대 20만원", note: "24개월 한정" },
              { item: "합계", monthly: "월 최대 24만원 절감", note: "중복 수령 가능" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 2 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 2 ? 700 : 500 }}>{r.item}</td>
                <td style={{ padding: "5px 8px", color: GREEN, fontWeight: i === 2 ? 700 : 500 }}>{r.monthly}</td>
                <td style={{ padding: "5px 8px", fontSize: 11, color: "#666" }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 공식 자료를 바탕으로 작성됐어요. 혜택별 신청 기간·자격은 변경될 수 있으니 각 공식 사이트를 확인하세요." />
    </ArticleLayout>
  );
}
