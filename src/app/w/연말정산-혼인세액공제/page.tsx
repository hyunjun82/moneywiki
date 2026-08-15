"use client";
// Q1. 올해 결혼했는데 연말정산에서 세금 혜택이 있는지, 얼마 받을 수 있는지 궁금한 상황
// Q2. 혼인세액공제 50만원(부부 합산 100만원) 조건을 확인하고 혼인관계증명서를 준비해서 신청한다
// Q3. 2024~2026년 한정, 생애 1회, 부부 각각 50만원, 혼인신고 기준, 재혼도 가능, 출산공제 별도
// Q4. GreenBox(핵심) + Steps(신청절차) + BorderBox(다른 공제와 비교) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "혼인관계증명서를 발급받으세요",
    desc: "주민센터나 정부24(gov.kr)에서 혼인관계증명서를 발급받아요. 혼인신고를 한 날짜가 기록되어 있어야 해요. 연말정산 시즌에는 발급이 밀릴 수 있으니 미리 준비하세요.",
    tip: "정부24에서 온라인 발급 가능",
  },
  {
    title: "회사에 연말정산 서류와 함께 제출하세요",
    desc: "혼인관계증명서를 연말정산 제출 서류에 포함해서 회사 인사팀에 내면 돼요. 맞벌이 부부면 각자 회사에 따로 제출해야 각각 50만원씩 받아요.",
  },
  {
    title: "간소화서비스에서 자동 반영되는지 확인하세요",
    desc: "2025년 귀속부터 간소화서비스에서 혼인 정보가 자동 조회될 수 있어요. 자동 반영 안 되면 혼인관계증명서를 직접 제출하면 돼요.",
  },
];

const FAQS = [
  {
    q: "2023년에 결혼했는데 혼인세액공제 받을 수 있나요?",
    a: "안 돼요. 2024년 1월 1일 이후 혼인신고한 경우만 해당돼요. 2023년 이전 결혼은 대상이 아니에요.",
  },
  {
    q: "부부가 각각 50만원씩 받는 건가요?",
    a: "네, 근로소득이 있는 부부 각자가 50만원씩 세금에서 빠져요. 맞벌이면 합쳐서 100만원 절세. 한쪽만 근로소득 있으면 그 사람만 50만원 받아요.",
  },
  {
    q: "매년 받을 수 있나요?",
    a: "아니요, 결혼한 해에 생애 1회만 받아요. 2025년 결혼했으면 2026년 2월 연말정산 때 한 번만 받고 끝이에요.",
  },
  {
    q: "재혼이어도 받을 수 있나요?",
    a: "이전에 혼인세액공제를 받지 않았다면 가능해요. 초혼·재혼 여부, 나이는 상관없어요. 이미 받았다면 다시 못 받아요.",
  },
  {
    q: "혼인신고 안 하고 결혼식만 했으면 되나요?",
    a: "안 돼요. 혼인신고(지자체에 혼인신고서 접수)를 완료해야 해요. 결혼식만으로는 대상이 아니에요.",
  },
  {
    q: "출산 세액공제도 별도로 받을 수 있나요?",
    a: "네, 별개 항목이에요. 출산 세액공제는 첫째 30만원, 둘째 50만원, 셋째 이상 70만원이에요. 결혼하고 같은 해에 출산하면 혼인 50만원 + 출산 30만원 = 80만원을 받을 수 있어요.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "조세특례제한법", href: "https://www.law.go.kr/법령/조세특례제한법" },
];

const RELATED = [
  { slug: "연말정산-맞벌이-절세-전략", title: "맞벌이 부부 연말정산 절세", description: "맞벌이 부부 공제 몰아주기 전략." },
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제." },
  { slug: "예비-신혼부부-특별공급-신청-방법", title: "예비 신혼부부 특별공급", description: "결혼 전 공공주택 청약 신청 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 . 결혼 . 혼인세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        결혼하면 세금 100만원 깎아줘요<br />
        혼인세액공제 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "결혼하면 연말정산에서 뭔가 혜택이 있다던데, 진짜예요?"
      </p>
      <p style={body}>
        진짜예요. <strong>2024~2026년 사이</strong> 혼인신고하면 부부 각각 <strong>50만원씩, 합계 100만원</strong>을 세금에서 직접 빼줘요.
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법</a>에 신설된 결혼 장려 세제 혜택이에요.
        생애 1회, 결혼한 해에만 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>혼인세액공제, 핵심 조건은?</H2>
      <p style={body}>
        복잡한 요건이 아니에요. 두 가지만 맞으면 돼요.
      </p>

      <SectionBadge>핵심 요약</SectionBadge>
      <GreenBox title="혼인세액공제 한눈에 보기">
        <strong>금액</strong>: 1인당 50만원 (부부 합산 최대 100만원)<br />
        <strong>대상</strong>: 2024.1.1 ~ 2026.12.31 혼인신고 완료한 근로자<br />
        <strong>횟수</strong>: 생애 1회 (결혼한 해의 연말정산에서만)<br />
        <strong>조건</strong>: 초혼·재혼 무관, 나이 무관
      </GreenBox>

      <Divider />

      <H2>어떻게 신청하나요?</H2>
      <p style={body}>
        혼인관계증명서만 있으면 돼요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>다른 결혼·출산 혜택도 함께 챙기세요</H2>
      <p style={body}>
        혼인세액공제만 있는 게 아니에요. 같은 해에 출산했다면 출산 세액공제도 별도로 받을 수 있어요.
      </p>

      <SectionBadge>결혼·출산 관련 세제 혜택</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["혼인세액공제", "1인 50만원", "2024~2026년 혼인, 생애 1회"],
              ["출산 세액공제 (첫째)", "30만원", "출산한 해 연말정산"],
              ["출산 세액공제 (둘째)", "50만원", "출산한 해 연말정산"],
              ["출산 세액공제 (셋째~)", "70만원", "출산한 해 연말정산"],
              ["자녀 세액공제", "연 15만원~", "기본공제 대상 자녀"],
            ].map(([item, amount, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, background: "#fafafa" }}>{item}</td>
                <td style={{ padding: "10px 12px", color: "#1D9E75", fontWeight: 600 }}>{amount}</td>
                <td style={{ padding: "10px 12px" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        결혼하고 같은 해에 첫째를 출산했다면 혼인 50만원 + 출산 30만원 = <strong>80만원 세액공제</strong>.
        <a href="/w/연말정산-맞벌이-절세-전략" style={{ color: "#1D9E75", textDecoration: "underline" }}>맞벌이 부부</a>라면 각자 신청해서 합쳐 더 큰 절세 효과를 누릴 수 있어요.
      </p>

      <Divider />

      <H2>주의할 점 3가지</H2>
      <p style={body}>
        빠뜨리면 못 받으니까 미리 챙기세요.
      </p>

      <SectionBadge>꼭 기억할 것</SectionBadge>
      <BorderBox title="혼인세액공제 주의사항">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li><strong>혼인신고 기준</strong>: 결혼식 날짜가 아니라 혼인신고서를 지자체에 접수한 날이에요. 12월 31일까지 신고해야 그 해 연말정산에서 받아요.</li>
          <li><strong>맞벌이 각자 신청</strong>: 부부가 각각 자기 회사에 따로 제출해야 해요. 한쪽만 내면 50만원만 받아요.</li>
          <li><strong>2026년까지 한정</strong>: 이 제도는 2024~2026년 혼인신고분에만 적용돼요. 2027년 이후 연장 여부는 아직 미정이에요.</li>
        </ul>
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="연말정산 글 더보기" href="/w" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 일반적인 안내예요. 개인 상황에 따라 다를 수 있으니 국세청(126) 또는 세무사와 상담하세요." />
    </ArticleLayout>
  );
}
