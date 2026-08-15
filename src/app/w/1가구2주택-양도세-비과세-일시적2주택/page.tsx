"use client";
// Q1. 이사하면서 새 집 사고 기존 집 팔려는 사람이 양도세 안 낼 수 있는지 확인하는 상황
// Q2. 종전주택 2년 보유 확인 → 신규주택 취득 시기 확인 → 3년 이내 종전주택 처분
// Q3. 종전주택 1년 후 신규 취득 / 3년 이내 처분 / 조정대상지역 2년 거주 추가 / 12억 이하 비과세
// Q4. GreenBox(일시적2주택 3가지 조건) + GreenBox(성공·실패 사례 비교) + BorderBox(조정대상지역 추가요건) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "새 집을 사기 전에 기존 집을 반드시 팔아야 하나요?",
    a: "꼭 그럴 필요 없어요. 일시적 2주택 특례가 있어서 신규주택 취득 후 3년 이내에 기존 집을 팔면 양도소득세를 안 낼 수 있어요. 다만 종전주택을 2년 이상 보유했어야 해요.",
  },
  {
    q: "3년 기한을 하루라도 넘기면 어떻게 되나요?",
    a: "일시적 2주택 특례가 적용되지 않아요. 3년은 정확히 신규주택 취득일 기준이에요. 하루라도 넘기면 비과세가 안 되니 날짜를 꼭 확인해야 해요.",
  },
  {
    q: "조정대상지역에서는 조건이 더 까다롭나요?",
    a: "네, 조정대상지역은 2년 이상 보유와 함께 2년 이상 거주도 해야 해요. 전세를 놓고 본인이 살지 않았다면 비과세가 안 돼요.",
  },
  {
    q: "종전주택이 12억원을 넘으면 어떻게 되나요?",
    a: "12억원까지는 전액 비과세고, 12억원을 넘는 부분에 대해서만 세금을 내요. 12억원 초과분에는 일반 양도소득세율이 적용돼요.",
  },
  {
    q: "일시적 2주택 기간 중 또 다른 집을 사면 어떻게 되나요?",
    a: "일시적 2주택 기간 중 세 번째 집을 사면 중과세를 받을 수 있어요. 조정대상지역이면 세율이 높아져요. 일시적 2주택 기간에는 추가 부동산 거래를 피하는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 양도소득세 비과세 안내", url: "https://www.nts.go.kr" },
      { label: "소득세법 제89조 (비과세 양도소득)", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
];

const RELATED = [
  { slug: "1세대-1주택-양도소득세-비과세-요건", title: "1세대 1주택 양도소득세 비과세 요건", description: "집 1채 팔 때 비과세 조건이에요." },
  { slug: "양도소득세-계산", title: "양도소득세 계산 방법", description: "비과세 제외 양도세 계산 공식이에요." },
  { slug: "취득세-계산", title: "집 살 때 취득세 계산", description: "신규주택 구입 시 취득세 계산 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 양도소득세 · 비과세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1가구 2주택 양도소득세 비과세<br />
        일시적 2주택 3년 이내 처분 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이사 때문에 잠깐 2주택이 되면 조건만 맞으면 세금을 안 내요.
        신규주택 산 날부터 3년 이내에 기존 집을 팔면 비과세예요.
        조정대상지역은 2년 거주 조건이 추가로 붙어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>일시적 2주택 비과세 3가지 조건</H2>
      <p style={body}>
        세 가지 조건을 모두 충족해야 비과세예요. 하나라도 빠지면 세금이 붙어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>조건</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>내용</th>
            </tr>
          </thead>
          <tbody>
            {[
              { condition: "① 종전주택 보유기간", detail: "2년 이상 보유 (조정대상지역: 2년 이상 거주도 필요)" },
              { condition: "② 신규주택 취득 시기", detail: "종전주택 취득 후 1년 이상 지난 뒤 신규 취득" },
              { condition: "③ 종전주택 처분 기한", detail: "신규주택 취득일부터 3년 이내에 종전주택 양도" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.condition}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 3년 기한은 신규주택 취득일 기준 정확히 계산 / 하루라도 넘기면 비과세 불인정
        </p>
      </GreenBox>

      <H2>성공·실패 사례 비교</H2>
      <p style={body}>
        날짜 계산이 핵심이에요. 구체적인 사례로 조건이 되는지 확인해 봐요.
      </p>

      <GreenBox>
        <strong>비과세 성공 사례</strong><br />
        2022년 1월: 서울 아파트 취득 (종전주택)<br />
        2023년 3월: 1년 1개월 후 신규주택 취득 → 일시적 2주택<br />
        2025년 12월: 신규 취득 후 2년 9개월 내 종전주택 양도 → 비과세 ✅<br />
        <br />
        <strong>비과세 실패 사례</strong><br />
        2022년 1월: 종전주택 취득<br />
        2023년 3월: 신규주택 취득<br />
        2026년 4월: 신규 취득 후 3년 1개월에 종전주택 양도 → 과세 ❌<br />
        <br />
        ★ 3년 기한: 2023년 3월 → 2026년 3월이 마지막 / 4월은 1개월 초과
      </GreenBox>

      <H2>조정대상지역 추가 요건</H2>
      <p style={body}>
        조정대상지역 집은 보유만으로 부족해요. 거주 기간도 채워야 비과세가 돼요.
      </p>

      <BorderBox>
        <strong>조정대상지역 비과세 조건</strong><br />
        보유 2년 이상 + 거주 2년 이상 (동시 충족 필요)<br />
        전월세로만 놔두고 본인이 살지 않으면 거주 요건 미충족<br />
        조정대상지역: 서울, 경기 일부, 세종 등 (지정 변경 가능)<br />
        <br />
        <strong>12억원 초과 주택</strong><br />
        12억원까지는 전액 비과세<br />
        12억원 초과분은 양도차익 × (초과금액/양도가액) 비율로 과세<br />
        <br />
        <strong>추가 주의사항</strong><br />
        일시적 2주택 기간 중 세 번째 집 매수 금지 (중과세 위험)<br />
        상속·증여로 취득한 주택은 주택 수 산정 방법 별도 확인<br />
        <br />
        ★ 정확한 세액은 홈택스 양도소득세 계산기 or 세무사 상담 권장
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 소득세법 기준으로 작성됐어요. 조정대상지역 지정 현황과 비과세 요건은 변경될 수 있으니 국세청 또는 세무사에게 확인하세요." />
    </ArticleLayout>
  );
}
