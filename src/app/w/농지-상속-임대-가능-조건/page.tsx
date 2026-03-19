"use client";

// Q1. 부모님 농지를 상속받았는데 농사를 못 짓고 어떻게 해야 할지 모르는 비농업인
// Q2. 상속농지 보유·임대 가능 조건 파악 → 한국농어촌공사 위탁임대로 합법적 운용
// Q3. 1만㎡까지 보유 가능 / 초과분은 처분 or 위탁임대 / 직접임대·방치 시 처분명령
// Q4. GreenBox(보유·임대 가능 조건 요약) + BorderBox(위탁임대 신청 방법 + 처분명령 주의) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "상속 농지를 직접 임대해도 되나요?",
    a: "안 돼요. 비농업인이 상속농지를 직접 임대하면 농지법 위반이에요. 반드시 한국농어촌공사(농지은행)를 통한 위탁임대만 가능해요. 직접 임대 계약 시 처분명령 대상이 될 수 있어요.",
  },
  {
    q: "1만㎡를 초과하면 무조건 처분해야 하나요?",
    a: "처분하거나 한국농어촌공사에 위탁임대를 맡기면 돼요. 초과분을 그냥 방치하면 시·군·구청에서 처분명령이 나올 수 있어요.",
  },
  {
    q: "상속 후 처분 기간이 정해져 있나요?",
    a: "농지법상 상속 후 1년 이내에 처분·위탁 여부를 결정해야 해요. 1년이 지나도 방치하면 처분명령 대상이 될 수 있어요.",
  },
  {
    q: "위탁임대 수익은 어떻게 되나요?",
    a: "한국농어촌공사가 임차인을 찾아 임대하고, 임대료에서 수수료를 뺀 금액을 소유자에게 지급해요. 수수료는 임대료의 일정 비율로 정해져 있어요.",
  },
  {
    q: "상속농지를 팔면 세금이 많이 나오나요?",
    a: "상속받은 날부터 3년 이내에 처분하면 양도소득세 감면 혜택이 있어요. 3년이 지나면 일반 양도소득세가 적용돼요. 정확한 세금은 세무사에게 확인하는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "농지법 제6조 (농지 소유 제한)", url: "https://www.law.go.kr/법령/농지법" },
      { label: "한국농어촌공사 농지은행 위탁임대", url: "https://www.ekr.or.kr" },
      { label: "농림축산식품부 농지정책", url: "https://www.mafra.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "농지-전용-허가", title: "농지 전용 허가 절차", description: "농지를 다른 용도로 바꾸는 방법이에요." },
  { slug: "상속세-신고-기한", title: "상속세 신고 기한", description: "상속세 6개월 신고 기한과 방법이에요." },
  { slug: "양도소득세", title: "양도소득세 계산 방법", description: "상속농지 처분 시 양도세 계산법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 농지 · 상속</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농지 상속 임대 가능 조건<br />
        비농업인이 합법적으로 보유하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        농사를 짓지 않아도 상속받은 농지는 합법적으로 보유할 수 있어요.
        1만㎡(약 3,000평)까지는 그냥 보유해도 되고, 초과분은 한국농어촌공사에 위탁임대를 맡기면 돼요.
        직접 임대하거나 방치하면 처분명령이 나와요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>상속농지 보유 및 임대 가능 조건</H2>
      <p style={body}>
        농지법 제6조 제2항에 따라 비농업인도 상속농지는 소유할 수 있어요. 단, 면적 제한과 임대 방식 제한이 있어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>상황</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>허용 여부</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              { situation: "1만㎡ 이하 보유", allow: "✅ 가능", condition: "그냥 보유 (임대 없이)" },
              { situation: "한국농어촌공사 위탁임대", allow: "✅ 가능", condition: "농지은행 통한 위탁만" },
              { situation: "1만㎡ 초과 보유", allow: "⚠️ 초과분 처리 필요", condition: "처분 또는 위탁임대" },
              { situation: "직접 임대", allow: "❌ 불가", condition: "농지법 위반, 처분명령" },
              { situation: "방치 (미이용)", allow: "❌ 위험", condition: "처분명령 대상" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.situation}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.allow}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 1만㎡ = 약 3,025평 / 농지법 제6조 제2항 기준
        </p>
      </GreenBox>

      <H2>위탁임대 신청 방법과 처분명령 주의사항</H2>
      <p style={body}>
        위탁임대는 한국농어촌공사 농지은행에 신청해요.
        1년 이상 방치하면 시·군·구청에서 처분명령을 내릴 수 있어요.
      </p>

      <BorderBox>
        <strong>한국농어촌공사 위탁임대 신청 방법</strong><br />
        한국농어촌공사(ekr.or.kr) → 농지은행 → 농지임대수탁 신청<br />
        또는 가까운 한국농어촌공사 지사 방문 신청<br />
        필요 서류: 등기부등본, 농지원부, 신분증<br />
        <br />
        <strong>처분명령 주의사항</strong><br />
        상속 후 1년 이내 처리 계획 수립 권장<br />
        1만㎡ 초과분을 방치하면 시·군·구청에서 처분명령 가능<br />
        처분명령 후 미이행 시 이행강제금 부과<br />
        <br />
        <strong>상속 후 3년 이내 매도 시 양도세 혜택</strong><br />
        상속 농지를 3년 안에 처분하면 양도소득세 감면 혜택 있음<br />
        정확한 세금은 세무서 또는 세무사 확인 필수<br />
        <br />
        ★ 직접 임대는 절대 금지 — 반드시 한국농어촌공사 위탁
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 농지법 기준으로 작성됐어요. 농지 관련 규정은 개정될 수 있으니 한국농어촌공사나 시·군·구청에 확인하세요." />
    </ArticleLayout>
  );
}
