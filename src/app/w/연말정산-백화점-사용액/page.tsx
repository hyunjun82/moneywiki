"use client";

// Q1. 백화점에서 쓴 금액이 연말정산에서 얼마나 공제되는지 궁금한 상황이에요.
// Q2. 백화점 사용액 공제율을 확인하고 절세 전략을 세우는 행동.
// Q3. 신용카드 15% 공제율, 체크카드·현금영수증 30%, 전통시장 40%, 총급여 25% 초과분부터 적용.
// Q4. GreenBox(공제율 요약) + BorderBox(절세 팁) + Checklist(확인사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  "올해 총급여의 25%를 넘는 소비를 했는지 확인",
  "25% 초과분은 체크카드·현금영수증 비중을 높이면 유리",
  "백화점 쇼핑은 신용카드 15%로, 공제율이 가장 낮음",
  "같은 금액이면 전통시장(40%)이 가장 절세 효과가 큼",
];

const FAQS = [
  { q: "백화점 신용카드 사용액은 공제율이 얼마인가요?", a: "15%예요. 체크카드(30%)나 전통시장(40%)보다 절반 이하로 낮아요." },
  { q: "백화점에서 체크카드로 결제하면 30% 적용되나요?", a: "맞아요. 결제 수단 기준이에요. 백화점이든 마트든 체크카드로 결제하면 30% 공제율이 적용돼요." },
  { q: "총급여 25%가 뭔 뜻이에요?", a: "신용카드 공제는 총급여의 25%를 넘는 소비부터 적용돼요. 연봉 5,000만원이면 1,250만원까지는 공제 대상이 아니에요." },
  { q: "백화점 상품권도 공제되나요?", a: "신용카드로 구매한 상품권은 공제 대상이 아니에요. 현금영수증이 발급된 경우에만 공제 가능하고요." },
  { q: "공제 한도는 얼마인가요?", a: "총급여에 따라 다른데, 7,000만원 이하면 최대 300만원이에요. 전통시장·대중교통 추가 한도가 별도로 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청", url: "https://www.nts.go.kr" },
    { label: "홈택스", url: "https://www.hometax.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-세액계산-방법", title: "연말정산 세액계산 방법", description: "전체 세액 계산 흐름을 정리했어요." },
  { slug: "연말정산-세액공제-소득공제-차이", title: "세액공제 vs 소득공제 차이", description: "둘의 차이를 이해하면 절세 전략이 달라져요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 소득공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        백화점에서 쓴 돈, 연말정산에서 얼마나 돌려받나요?<br />
        공제율 15%와 절세 전략
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        백화점에서 꽤 썼는데 연말정산에서 얼마나 돌려받을 수 있을까 궁금하죠? 결론부터 말하면, 신용카드로 결제했다면 공제율은 15%예요.
        체크카드(30%)나 전통시장(40%)보다 절반도 안 돼요. 같은 금액을 쓸 거면 결제 수단을 바꾸는 게 유리해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>결제 수단별 공제율, 뭐가 제일 유리한가요?</H2>
      <p style={body}>
        연말정산 신용카드 소득공제는 총급여의 25%를 넘는 소비부터 적용돼요. 그 초과분에 결제 수단별 공제율을 곱해서 계산해요.
      </p>

      <SectionBadge>결제 수단별 공제율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>결제 수단</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>공제율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["신용카드", "15%", "백화점·온라인 포함"],
              ["체크카드", "30%", "직불카드 포함"],
              ["현금영수증", "30%", "발급분만 인정"],
              ["전통시장", "40%", "추가 한도 별도"],
              ["대중교통", "80%", "2025년 귀속 한시 적용"],
            ].map(([method, rate, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{method}</td>
                <td style={{ padding: "9px 12px" }}>{rate}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        백화점에서 신용카드로 100만원 쓰면 공제 대상은 15만원이에요.<br />
        같은 100만원을 전통시장에서 쓰면 40만원이 공제돼요.
      </GreenBox>

      <Divider />

      <H2>절세하려면 이것부터 챙기세요</H2>
      <p style={body}>
        총급여의 25%까지는 어차피 공제 대상이 아니에요. 이 구간까지는 신용카드를 쓰고, 넘는 시점부터 체크카드·현금영수증으로 전환하는 게 유리해요.
      </p>

      <Checklist items={CHECK_ITEMS} />

      <BorderBox>
        <strong>절세 전략 요약</strong><br /><br />
        1단계: 총급여 25%까지 → 신용카드 (혜택 챙기기)<br />
        2단계: 25% 초과분 → 체크카드·현금영수증 (공제율 2배)<br />
        3단계: 전통시장·대중교통 → 추가 한도까지 채우기
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 공제 한도와 세율은 총급여에 따라 달라지니 홈택스에서 간소화 자료를 확인하세요." />
    </ArticleLayout>
  );
}
