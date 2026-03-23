"use client";

// Q1. 직장어린이집 이용하면서 세금 혜택이 있는지, 보육수당과 별개인지 궁금한 상황
// Q2. 직장어린이집 비과세와 보육수당 비과세가 별개임을 확인하고 두 혜택을 모두 챙긴다
// Q3. 직장어린이집 비과세(한도 없음) vs 보육수당(월 20만원), 적용 조건, 외부 위탁 가능 여부
// Q4. GreenBox(핵심 비교) + BorderBox(적용 조건) + Checklist(확인사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "직장어린이집 이용 중인지, 외부 위탁 어린이집인지 확인",
  "급여명세서에서 비과세 항목으로 처리되어 있는지 확인",
  "보육수당 월 20만원이 별도로 비과세 적용되고 있는지 확인",
  "개인이 직접 선택한 어린이집이면 보육수당 한도만 적용됨을 인지",
];

const FAQS = [
  {
    q: "직장어린이집 비과세에 한도가 있나요?",
    a: "한도 없이 전액 비과세예요. 회사가 직접 운영하거나 위탁계약한 어린이집 이용료는 금액 제한 없이 세금이 안 붙어요.",
  },
  {
    q: "보육수당과 직장어린이집 비과세를 둘 다 받을 수 있나요?",
    a: "네, 별개의 비과세 항목이에요. 직장어린이집 이용료 지원(한도 없음) + 보육수당(월 20만원) 둘 다 비과세로 받을 수 있어요.",
  },
  {
    q: "외부 어린이집도 비과세 되나요?",
    a: "회사가 위탁계약한 외부 어린이집이면 돼요. 회사가 특정 보육시설과 계약을 맺어서 지원하는 경우만 해당해요. 개인이 직접 선택한 어린이집은 보육수당 한도(월 20만원)만 적용돼요.",
  },
  {
    q: "연말정산 때 별도로 신청해야 하나요?",
    a: "아니요, 회사에서 급여 지급 시 자동으로 비과세 처리해 줘요. 별도 신청은 필요 없어요. 급여명세서에서 비과세로 표시되어 있는지만 확인하면 돼요.",
  },
  {
    q: "직장어린이집이 없는 회사면 어떻게 되나요?",
    a: "보육수당 월 20만원 비과세만 받을 수 있어요. 회사에서 보육수당을 지급하면 자녀 1인당 월 20만원까지 비과세예요. 2024년부터 10만원에서 20만원으로 한도가 올랐어요.",
  },
],

SOURCES = [
  { name: "국세청 비과세 근로소득", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6588&cntntsId=7867" },
  { name: "소득세법 시행령 제12조", href: "https://www.law.go.kr/법령/소득세법시행령" },
];

const RELATED = [
  { slug: "연말정산-비과세-소득", title: "연말정산 비과세 소득", description: "식대, 보육수당 등 비과세 항목 정리." },
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제." },
  { slug: "연말정산-출산보육수당", title: "출산·보육수당 비과세", description: "보육수당 월 20만원 비과세 조건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 . 비과세 . 직장어린이집</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        직장어린이집 이용료, 세금 안 내도 돼요<br />
        보육수당과 별개로 비과세
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "회사 어린이집 보내고 있는데, 이 비용도 세금이 붙나요?"
      </p>
      <p style={body}>
        아니요, <strong>직장어린이집 이용료는 한도 없이 전액 비과세</strong>예요.
        보육수당 월 20만원과는 <strong>별개</strong>로 적용돼요.
        둘 다 받으면 둘 다 비과세되니까 합쳐서 꽤 큰 절세 효과가 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>직장어린이집 비과세 vs 보육수당, 뭐가 다른가요?</H2>
      <p style={body}>
        이름이 비슷해서 헷갈리기 쉬운데, 완전히 별개의 비과세 항목이에요.
      </p>

      <SectionBadge>비교 정리</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>직장어린이집 비과세</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보육수당 비과세</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["한도", "한도 없음 (전액)", "월 20만원"],
              ["대상", "사내 또는 위탁계약 어린이집", "6세 이하 자녀 보육 급여"],
              ["중복 적용", "보육수당과 별개", "직장어린이집과 별개"],
              ["신청 방법", "회사 자동 처리", "회사 자동 처리"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, background: "#fafafa" }}>{label}</td>
                <td style={{ padding: "10px 12px" }}>{a}</td>
                <td style={{ padding: "10px 12px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="둘 다 받으면?">
        직장어린이집 지원 월 50만원 + 보육수당 월 20만원 = 합계 월 70만원, <strong>전액 비과세</strong>. 연간 840만원이 세금 없이 지급돼요.
      </GreenBox>

      <Divider />

      <H2>어떤 경우에 비과세가 적용되나요?</H2>
      <p style={body}>
        핵심은 <strong>사업주가 제공하는 보육서비스</strong>여야 한다는 거예요.
      </p>

      <SectionBadge>적용 조건</SectionBadge>
      <BorderBox title="비과세 적용 여부">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>사내 직장어린이집 이용 → <strong>비과세 O</strong> (한도 없음)</li>
          <li>회사가 위탁계약한 외부 어린이집 → <strong>비과세 O</strong> (한도 없음)</li>
          <li>개인이 직접 선택한 어린이집 → <strong>보육수당 한도(월 20만원)만 적용</strong></li>
        </ul>
      </BorderBox>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령 제12조</a>에서 사업주가 직접 또는 위탁으로 운영하는 보육시설 이용료를 비과세 근로소득으로 규정하고 있어요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>내 급여에 제대로 반영됐는지 체크하세요</H2>
      <p style={body}>
        회사에서 자동 처리하지만, 간혹 비과세가 누락되는 경우도 있어요.
      </p>

      <SectionBadge>확인 리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="연말정산 글 더보기" href="/w" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 일반적인 안내예요. 회사별 보육 지원 정책이 다를 수 있으니 인사팀에 확인하세요." />
    </ArticleLayout>
  );
}
