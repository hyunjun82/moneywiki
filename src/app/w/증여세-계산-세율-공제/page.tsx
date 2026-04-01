"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 부모·배우자에게 돈 받거나 자녀에게 주려는 사람이 세금 얼마인지 알려는 상황
// Q2. 공제 한도 확인 → 과세표준 계산 → 세율 적용 → 3개월 이내 신고
// Q3. 배우자6억/성인자녀5천/미성년자2천/기타1천 / 결혼·출산 1억 추가 / 세율10~50% / 자진신고 3% 공제 / 10년 합산
// Q4. GreenBox(가족 관계별 공제 한도) + GreenBox(세율 구간 + 절세 계산) + BorderBox(신고 기한 + 추징 주의) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "부모 자식 간 증여세 면제 한도는 얼마인가요?",
    a: "직계존비속 간에는 성인 5천만원, 미성년자 2천만원까지 비과세예요. 10년 이내 동일인에게 받은 금액을 합산해서 계산해요. 예를 들어 10년 안에 3천만원 받고 또 3천만원 받으면 합계 6천만원에서 5천만원 공제 후 1천만원에 세금이 붙어요.",
  },
  {
    q: "증여세 신고는 언제까지 해야 하나요?",
    a: "증여받은 날이 속한 달의 말일부터 3개월 이내에 신고해야 해요. 1월에 받았으면 4월 말까지예요. 자진 신고하면 산출세액의 3%를 공제해줘요. 안 하면 무신고 가산세 20%가 붙어요.",
  },
  {
    q: "결혼할 때 부모님께 받은 돈도 증여세를 내야 하나요?",
    a: "기존 직계존비속 공제 5천만원에 더해 혼인 증여 1억원을 추가로 공제받을 수 있어요. 총 1억5천만원까지 비과세예요. 양가 합치면 최대 3억원까지 세금 없이 줄 수 있어요.",
  },
  {
    q: "배우자에게 얼마까지 줄 수 있나요?",
    a: "배우자 간 증여는 6억원까지 비과세예요. 10년 이내 동일 배우자에게 준 금액을 합산해요. 6억원을 넘으면 초과분에 대해 세금을 내야 해요.",
  },
  {
    q: "형제자매 간 증여는 얼마까지 비과세인가요?",
    a: "형제자매는 기타 친족에 해당해서 1천만원까지만 공제돼요. 며느리, 사위도 마찬가지예요. 직계존비속(부모, 자녀)과 공제 한도가 달라요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 증여세 안내", url: "https://www.nts.go.kr" },
      { label: "상속세 및 증여세법", url: "https://www.law.go.kr/법령/상속세및증여세법" },
    ],
  },
];

const RELATED = [
  { slug: "상속세-계산", title: "상속세 계산 방법", description: "돌아가신 후 재산 받을 때 내는 세금이에요." },
  { slug: "1세대-1주택-양도소득세-비과세-요건", title: "양도소득세 비과세 요건", description: "집 팔 때 내는 세금 줄이는 방법이에요." },
  { slug: "세금-납부-연장-신청", title: "세금 납부 연장 신청", description: "증여세 낼 돈이 부족할 때 기한 연장 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 증여세 · 공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        증여세 계산 세율 공제<br />
        가족 간 공제 한도와 세율표
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부모님께 돈을 받거나 자녀에게 줄 때 증여세를 내요.
        배우자는 6억원, 성인 자녀는 5천만원까지 비과세예요.
        결혼·출산하면 1억원을 추가로 공제받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가족 관계별 증여세 공제 한도</H2>
      <p style={body}>
        증여받는 사람과의 관계에 따라 공제 한도가 달라요.
        10년 이내 동일인에게 받은 금액을 모두 합산해서 계산해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>증여자 관계</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>기본 공제 한도</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>추가 공제</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rel: "배우자", limit: "6억원", extra: "—" },
              { rel: "직계존비속 (성인 자녀, 부모)", limit: "5천만원", extra: "결혼·출산 시 +1억원" },
              { rel: "직계존비속 (미성년 자녀)", limit: "2천만원", extra: "결혼·출산 시 +1억원" },
              { rel: "기타 친족 (형제, 며느리, 사위)", limit: "1천만원", extra: "—" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.05)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i < 2 ? 700 : 400 }}>{row.rel}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.limit}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#1D9E75", fontSize: 12 }}>{row.extra}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 10년 이내 동일인 증여액 합산 / 결혼 공제: 혼인 전후 2년 이내 증여 (양가 각 1억, 합산 2억)
        </p>
      </GreenBox>

      <H2>증여세 세율과 자진신고 공제</H2>
      <p style={body}>
        공제 한도를 넘는 금액에 세율이 붙어요.
        3개월 안에 자진 신고하면 세금의 3%를 깎아줘요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>과세표준 (공제 후 금액)</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>세율</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>자진신고 후 실효세율</th>
            </tr>
          </thead>
          <tbody>
            {[
              { range: "1억원 이하", rate: "10%", actual: "9.7%" },
              { range: "1억원 초과 ~ 5억원", rate: "20%", actual: "19.4%" },
              { range: "5억원 초과 ~ 10억원", rate: "30%", actual: "29.1%" },
              { range: "10억원 초과 ~ 30억원", rate: "40%", actual: "38.8%" },
              { range: "30억원 초과", rate: "50%", actual: "48.5%" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.range}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#E53E3E", fontWeight: 600 }}>{row.rate}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#1D9E75" }}>{row.actual}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 자진신고 3% 공제 적용 시 / 무신고 가산세 20% + 납부불성실가산세 별도
        </p>
      </GreenBox>

      <H2>신고 기한과 주의사항</H2>
      <p style={body}>
        신고 기한을 놓치면 가산세가 커요. 받은 후 3개월 안에 꼭 신고해요.
      </p>

      <BorderBox>
        <strong>증여세 신고 기한</strong><br />
        증여받은 날이 속한 달 말일 + 3개월 이내<br />
        예: 1월 15일 증여 → 4월 30일까지 신고·납부<br />
        자진신고 시 산출세액 3% 공제 혜택<br />
        <br />
        <strong>가산세</strong><br />
        무신고: 산출세액 × 20%<br />
        납부 지연: 하루 0.022% (연 약 8%)<br />
        <br />
        <strong>10년 합산 규칙</strong><br />
        동일인에게 10년 이내 받은 금액 전부 합산<br />
        → 10년 주기로 공제 한도가 리셋됨<br />
        여러 해에 나눠 받아도 합산 금액이 공제 한도 초과 시 세금 발생<br />
        <br />
        ★ 홈택스 → 신고/납부 → 증여세 자진신고에서 직접 신고 가능
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 상속세및증여세법 기준으로 작성됐어요. 증여세 공제 한도와 세율은 세법 개정에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
