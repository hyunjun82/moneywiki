"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 집 1채 팔려는 사람이 비과세 조건 되는지 / 얼마나 더 보유해야 하는지 확인하는 상황
// Q2. 보유·거주 기간 확인 → 조건 충족 여부 판단 → 매도 타이밍 결정
// Q3. 보유 2년(조정대상지역은 거주 2년 추가) / 12억 초과분 일부과세 / 일시적 2주택 3년 내 처분 / 동거봉양·혼인 합가 특례
// Q4. GreenBox(비과세 요건 핵심) + GreenBox(일시적 2주택 타임라인) + BorderBox(특례 케이스) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "2년 보유했는데 조정대상지역이면 거주도 2년 해야 하나요?",
    a: "네. 2017년 8월 3일 이후 취득한 조정대상지역 주택은 보유 2년 + 거주 2년 모두 채워야 비과세예요. 거주 2년은 전입신고 기준이에요. 2017년 8월 2일 이전 취득했다면 거주 요건 없이 보유 2년만으로 비과세돼요.",
  },
  {
    q: "12억 이하 집이면 양도세가 없나요?",
    a: "1세대 1주택 비과세는 실거래가 12억원 이하 주택에 적용돼요. 12억 초과 주택은 초과분에만 세금이 붙어요. 예를 들어 20억에 팔면 (20억-12억)/20억 비율만큼 과세돼요.",
  },
  {
    q: "이사 가면서 새 집 샀는데 일시적 2주택이에요. 언제까지 팔아야 하나요?",
    a: "신규 주택 취득일로부터 3년 이내에 기존 주택을 팔면 비과세예요. 예를 들어 2024년 1월에 새 집 샀다면 2027년 1월 이전에 팔면 돼요. 3년 넘기면 2주택자로 보아 양도세가 부과돼요.",
  },
  {
    q: "부모님을 모시러 합가했는데 2주택이 됐어요. 비과세 받을 수 있나요?",
    a: "동거봉양 합가 특례가 적용돼요. 부모님이 60세 이상이고 합가 시점에 각자 1주택이면, 합가일로부터 10년 이내에 한 채를 팔 때 비과세받을 수 있어요. 10년 내에 먼저 팔면 어느 쪽이든 비과세예요.",
  },
  {
    q: "결혼해서 배우자 주택 포함해 2주택 됐어요. 어떻게 해요?",
    a: "혼인 합가 특례가 적용돼요. 각자 1주택 가진 사람끼리 결혼해서 2주택이 된 경우, 혼인일로부터 5년 이내에 한 채를 팔면 비과세받을 수 있어요. 5년 내에 어느 쪽 주택이든 먼저 팔면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 제89조 (1세대 1주택 비과세)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청: 양도소득세 1세대1주택 비과세 안내", url: "https://www.nts.go.kr" },
      { label: "국세법령정보시스템: 1세대 1주택 해석 사례", url: "https://taxlaw.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "2주택자-임대소득세", title: "2주택자 임대소득세 과세 조건", description: "일시적 2주택 기간이 지나면 이 글을 확인하세요." },
  { slug: "간주임대료-계산", title: "간주임대료 계산 방법", description: "전세 보증금에 붙는 간주임대료 세금이에요." },
  { slug: "양도소득세-신고-방법", title: "양도소득세 신고 방법", description: "비과세 안 되면 이렇게 신고해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 양도소득세 · 1주택 비과세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1세대 1주택 양도소득세 비과세 요건<br />
        보유 2년·거주 2년·12억 한도 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집 1채를 2년 이상 보유하면 양도소득세가 면제돼요.
        조정대상지역 주택은 거주도 2년 채워야 하고, 실거래가 12억원을 넘으면 초과분에만 세금이 붙어요.
        이사 가면서 잠깐 2주택이 되는 경우엔 3년 이내 처분하면 비과세예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>비과세 받으려면 충족해야 하는 조건</H2>
      <p style={body}>
        소득세법 제89조에서 1세대 1주택 비과세 요건을 정하고 있어요.
        3가지 조건을 모두 충족해야 양도소득세가 0원이에요.
      </p>

      <GreenBox>
        <strong>1세대 1주택 비과세 3가지 조건</strong><br />
        <br />
        <strong>① 1세대 1주택</strong><br />
        양도 시점에 세대 전체(배우자·자녀 포함)가 주택 1채만 소유<br />
        <br />
        <strong>② 보유 기간 2년 이상</strong><br />
        취득일부터 양도일까지 2년 이상 보유<br />
        조정대상지역 2017년 8월 3일 이후 취득: 보유 2년 + 거주 2년 모두 필요<br />
        비조정대상지역 or 2017년 8월 2일 이전 취득: 보유 2년만 충족하면 OK<br />
        <br />
        <strong>③ 실거래가 12억원 이하</strong><br />
        12억 초과분은 과세 (초과 비율만큼 세금 부과)<br />
        <br />
        ★ 3가지 전부 충족 → 양도소득세 0원
      </GreenBox>

      <H2>이사 가면서 잠깐 2주택 — 일시적 2주택 특례</H2>
      <p style={body}>
        이사 과정에서 새 집을 먼저 사고 기존 집을 나중에 파는 경우, 잠깐 2주택자가 돼요.
        3년 이내에 기존 주택을 팔면 1세대 1주택 비과세를 그대로 받을 수 있어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>상황</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>처분 기한</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>비과세 여부</th>
            </tr>
          </thead>
          <tbody>
            {[
              { situation: "새 집 취득 후 기존 주택 처분", period: "3년 이내", tax: "비과세" },
              { situation: "3년 초과 후 기존 주택 처분", period: "3년 초과", tax: "과세" },
              { situation: "동거봉양 합가 (부모 60세 이상)", period: "10년 이내", tax: "비과세" },
              { situation: "혼인 합가 (각자 1주택)", period: "5년 이내", tax: "비과세" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.situation}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.period}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: row.tax === "비과세" ? "#1D9E75" : "#E53E3E", fontWeight: 600 }}>{row.tax}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 동거봉양·혼인 합가는 합가 시점 기준으로 기산
        </p>
      </GreenBox>

      <H2>12억 초과 주택 세금 계산</H2>
      <p style={body}>
        실거래가 12억원이 넘는 고가 주택도 12억까지는 비과세예요.
        12억 초과분만 과세 비율로 세금이 붙어요.
      </p>

      <BorderBox>
        <strong>고가 주택 양도세 계산 방식</strong><br />
        과세 비율 = (실거래가 − 12억원) ÷ 실거래가<br />
        <br />
        예시: 20억에 판 주택, 취득가 8억, 보유 5년<br />
        양도차익 = 20억 − 8억 = 12억<br />
        과세 비율 = (20억 − 12억) ÷ 20억 = 40%<br />
        과세 대상 양도차익 = 12억 × 40% = 4억 8천만원<br />
        (장기보유특별공제 적용 후 실제 세금은 더 줄어요)<br />
        <br />
        ★ 10년 이상 보유 + 10년 이상 거주: 장기보유특별공제 최대 80%<br />
        ★ 장기보유특별공제 적용하면 실제 납부세액 크게 감소
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 소득세법 제89조 및 2026년 국세청 기준으로 작성됐어요. 조정대상지역 지정 여부와 취득 시점에 따라 요건이 달라지니 매도 전 세무사 확인을 권해요." />
    </ArticleLayout>
  );
}
