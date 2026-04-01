"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 부동산 거래하면서 중개사나 매수자가 다운계약서를 제안해서 고민 중인 상황
// Q2. 다운계약서 쓰면 비과세 배제 + 가산세 + 과태료 얼마나 나오는지 파악하고 절대 쓰지 않기
// Q3. 소득세법 제91조 비과세 배제 규정, 가산세 40%, 과태료 취득가액 10%, 매수자 불이익, 국세청 적발 방법
// Q4. GreenBox(불이익 요약표) + Steps(적발 시 진행 과정) + BorderBox(매수자 불이익) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "비과세 대상인데 다운계약서 쓰면 어떻게 되나요?", a: "1세대1주택 비과세 요건을 완벽히 충족해도 비과세가 부인돼요. 소득세법 제91조에서 허위계약서 작성 시 비과세 배제를 명시하고 있어요." },
  { q: "1억 다운하면 과태료가 얼마나 나오나요?", a: "부동산거래신고법 위반으로 취득가액의 최대 10% 과태료가 나와요. 10억짜리 집이면 과태료만 1억원이 될 수 있어요. 가산세는 별도예요." },
  { q: "매수자도 처벌받나요?", a: "네. 매수자도 나중에 그 집을 팔 때 비과세·감면을 못 받아요. 매도자와 동일한 불이익이 적용돼요." },
  { q: "업계약서도 같은 불이익인가요?", a: "동일해요. 실거래가보다 높게 쓴 업계약서도 허위계약서예요. 매수자가 대출 한도를 늘리려고 요구하는 경우가 많은데, 적발 시 똑같이 처벌받아요." },
  { q: "국세청은 어떻게 알아내나요?", a: "금융거래 내역 분석, 국토부 실거래가 신고 시스템, 주변 시세 비교, 세무조사 등으로 파악해요. 매매대금 이체 기록과 계약서 금액이 다르면 바로 걸려요." },
  { q: "적발 전에 자진신고하면 감면받을 수 있나요?", a: "가능해요. 수정신고하면 가산세가 감면돼요. 적발 전 자진신고 시 신고불성실가산세의 최대 90%까지 감면받을 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 제91조 (비과세 배제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 양도소득세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707" },
      { label: "홈택스 양도소득세 신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산 세율", description: "부동산 취득 시 내야 하는 취득세를 다뤄요." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "실거래가 신고 의무와 절차예요." },
  { slug: "서울-상가-경매-임차보증금-회수", title: "상가 경매 보증금 회수", description: "경매 시 임차보증금 우선변제권을 다뤄요." },
];

const PENALTY_STEPS = [
  { title: "금융거래 내역 분석", desc: "국세청이 매매대금 이체 기록을 분석해요. 계약서 금액과 실제 이체 금액이 다르면 의심 거래로 분류돼요." },
  { title: "실거래가 신고 시스템 대조", desc: "국토부 실거래가 신고 데이터와 주변 시세를 비교해요. 동일 단지에서 혼자 낮은 가격이면 조사 대상이에요." },
  { title: "세무조사 착수", desc: "의심 거래로 분류되면 관할 세무서에서 세무조사가 시작돼요. 매도자·매수자 모두 소환될 수 있어요." },
  { title: "비과세 부인 + 가산세 + 과태료 부과", desc: "허위계약서가 확인되면 비과세 배제, 무(과소)신고가산세 최대 40%, 납부지연가산세, 과태료(취득가액의 최대 10%)가 한꺼번에 부과돼요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 양도소득세 · 부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        다운계약서 쓰면 비과세 못 받아요<br />
        양도세 가산세와 과태료까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;어차피 비과세인데 금액 좀 낮춰도 되지 않아요?&quot;
        이런 제안을 받았다면 절대 응하지 마세요.
        소득세법 제91조에 따라 비과세 요건을 다 갖춰도 다운계약서를 쓰면 비과세가 부인돼요.
        양도세 전액 과세에 가산세, 과태료까지 폭탄이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>다운계약서 불이익, 얼마나 클까?</H2>
      <p style={body}>
        비과세 받으려다 오히려 수천만원 손해보는 구조예요.
        한눈에 보면 이렇게 정리돼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>불이익 항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>내용</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "비과세 배제", rule: "1세대1주택 비과세 요건 충족해도 양도세 전액 과세" },
              { item: "무(과소)신고가산세", rule: "납부세액의 최대 40%" },
              { item: "납부지연가산세", rule: "미납세액 x 일 0.022% (적발 늦을수록 눈덩이)" },
              { item: "과태료", rule: "취득가액의 최대 10% (부동산거래신고법 위반)" },
              { item: "매수자 불이익", rule: "향후 양도 시 비과세·감면 배제" },
              { item: "장기보유특별공제", rule: "부인될 수 있음" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.item}</td>
                <td style={{ padding: "5px 8px" }}>{row.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 소득세법 제91조 + 부동산거래신고법 기준
        </p>
      </GreenBox>

      <H2>국세청은 이렇게 알아내요</H2>
      <p style={body}>
        &quot;몇 년 전 일인데 어떻게 알겠어?&quot;라고 생각하면 큰일 나요.
        금융거래 내역은 5~10년 보관되고, 국세청 AI 시스템이 자동으로 이상 거래를 잡아내요.
      </p>

      <Steps steps={PENALTY_STEPS} />

      <H2>매수자도 손해를 봐요</H2>
      <p style={body}>
        다운계약서는 매도자만의 문제가 아니에요. 매수자도 나중에 큰 불이익을 받아요.
      </p>

      <BorderBox>
        <strong>매수자가 받는 불이익</strong><br /><br />
        ▶ 나중에 그 집을 팔 때 <strong>비과세·감면 적용 불가</strong><br />
        ▶ 취득가액이 실제보다 낮게 잡혀서 <strong>양도차익이 더 커짐</strong> → 양도세 증가<br />
        ▶ 부동산거래신고법 위반으로 <strong>매수자에게도 과태료 부과</strong><br /><br />
        ★ 매도자가 제안해도 거절하세요. &quot;비과세인데 상관없다&quot;는 말에 속으면 안 돼요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 소득세법·부동산거래신고법 기준으로 작성됐어요. 구체적인 세금 계산은 세무사 상담이나 국세청(126)에 확인하세요." />
    </ArticleLayout>
  );
}
