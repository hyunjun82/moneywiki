"use client";

// Q1. 부모님 소득이 높은데, 그래도 청년월세지원을 받을 수 있는지 알고 싶은 상황
// Q2. 원가구(부모) 소득 기준을 이해하고, 내 경우에 면제가 되는지 판단한다
// Q3. 원가구=부모 가구, 중위소득 100% 이하, 4인 가구 약 540만원, 면제 조건(사망/실종/단절), 건보료 역산법
// Q4. GreenBox(기준 금액표) + BorderBox(면제 조건) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const FAQS = [
  { q: "부모님이 이혼하셨는데 양쪽 다 보나요?", a: "부모가 이혼한 경우, 양육권이나 부양 의무가 있는 쪽 부모의 소득만 봐요. 실제로 어떤 부모의 소득이 반영되는지는 신청 시 가구 관계를 정확히 기재하면 심사에서 판단해줘요." },
  { q: "부모님이 해외에 거주하면 어떻게 되나요?", a: "부모가 해외 거주 중이면 국내 소득이 없으니, 원가구 소득이 없는 것으로 처리될 수 있어요. 다만 해외 소득이 있으면 다르게 판단될 수 있으니, 주민센터에서 상담받아봐야 해요." },
  { q: "부모님 소득을 어떻게 확인하나요?", a: "부모의 건강보험료 납부 금액을 알면 소득 수준을 대략 파악할 수 있어요. 직장가입자라면 급여명세서, 지역가입자라면 건강보험료 고지서를 보면 돼요. 정확한 산정은 심사 과정에서 이뤄져요." },
  { q: "부모님이 자영업이면 소득 파악이 어려운데요?", a: "자영업 소득은 종합소득세 신고 기준으로 봐요. 부모가 자영업자라면 직전 연도 종합소득세 신고 내역이 기준이에요. 소득 신고를 안 했다면 추정 소득으로 산정될 수 있어요." },
  { q: "부모님 재산도 보나요?", a: "네, 원가구(부모) 재산도 봐요. 부모 가구의 총 재산이 4억 7,000만원 이하여야 해요. 재산에는 부동산, 자동차, 금융자산이 포함돼요." },
  { q: "결혼해서 배우자가 있으면 원가구 기준이 달라지나요?", a: "기혼이면 원가구가 배우자를 포함한 본인 가구가 돼요. 부모 소득 대신 배우자 소득이 합산되는 거예요. 이 경우 본인+배우자 가구의 소득인정액이 중위소득 60% 이하인지를 봐요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "청년월세 한시 특별지원사업 안내 (국토교통부)", url: "https://www.molit.go.kr" },
    { label: "복지로 청년월세지원", url: "https://www.bokjiro.go.kr" },
    { label: "2026년 기준 중위소득 (보건복지부)", url: "https://www.mohw.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-소득기준-중위소득60-계산", title: "소득 기준 계산법", description: "본인 가구 소득 기준과 중위소득 60% 계산법을 정리했어요." },
  { slug: "청년월세지원-자격조건-나이-소득-재산", title: "자격 조건 전체 정리", description: "부모 소득 외에 나이, 재산, 주거 조건도 함께 봐요." },
  { slug: "청년월세지원-탈락사유-재신청-방법", title: "탈락 사유와 재신청", description: "부모 소득 때문에 탈락한 경우 대응 방법을 정리했어요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-부모님-소득-합산-분리" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 부모 소득
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 부모님 소득도 봐요?<br />
        소득 합산 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;나는 소득이 없는데 부모님 소득 때문에 안 되는 거 아니야?&quot; 걱정되죠.
        맞아요, 청년월세지원은 본인 소득뿐 아니라 원가구(부모) 소득도 봐요.
        이 부분 때문에 탈락하는 사람이 의외로 많아요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        원가구란 부모를 포함한 가구를 말해요. 부모 합산 소득이 기준 중위소득 100% 이하여야 해요.
        다만 부모가 사망했거나 관계가 단절된 경우에는 면제되는 조건이 있으니, 아래에서 자세히 확인해봐요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>원가구 소득 기준 금액</H2>
      <p style={body}>
        원가구 소득은 기준 중위소득 100% 이하여야 해요. 부모 가구의 가구원수에 따라 기준이 달라요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>원가구 가구원수</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>중위소득 100%</th>
            </tr>
          </thead>
          <tbody>
            {[
              { n: "2인 (부모 2명)", val: "약 345만원" },
              { n: "3인 (부모 2 + 형제 1)", val: "약 443만원" },
              { n: "4인 (부모 2 + 형제 2)", val: "약 540만원" },
              { n: "5인", val: "약 634만원" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.n}</td>
                <td style={{ padding: "5px 8px" }}>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          2026년 보건복지부 기준 / 청년 본인은 원가구에서 제외하고 별도 가구로 봄
        </p>
      </GreenBox>

      <p style={body}>
        예를 들어 부모 2명 + 형제 1명인 3인 가구라면, 부모 합산 소득이 약 443만원 이하여야 해요.
        부모가 맞벌이라면 합산 금액이 기준을 넘기기 쉬워요.
      </p>
      <p style={body}>
        부모의 건강보험료 납부 금액을 알면 소득 수준을 대략 파악할 수 있어요.
        정확한 건 심사 과정에서 이뤄지지만, 미리 확인하면 시간을 아낄 수 있죠.
      </p>

      <Divider />

      <H2>원가구 기준 면제 조건</H2>
      <p style={body}>
        아래 경우에 해당되면 원가구(부모) 소득을 보지 않아요. 본인 가구 소득만으로 심사해요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>부모 사망</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          양쪽 부모 모두 사망한 경우 원가구 기준이 면제돼요.
          한쪽 부모만 사망한 경우에는 생존 부모의 소득이 원가구 기준으로 적용돼요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>부모 실종</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          부모가 실종 신고가 된 경우에도 면제돼요.
          실종 사실을 증명할 수 있는 서류(경찰 접수 확인서 등)를 제출해야 해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>관계 단절 (이혼 포함)</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          부모와 관계가 단절된 경우에도 면제가 가능해요. 부모 이혼 시에는 양육권이 없는 쪽 부모의 소득이 제외돼요.
          관계 단절을 입증할 수 있는 서류가 필요하고, 주민센터에서 상담 후 개별 판단돼요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>해외 거주</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          부모가 해외에 장기 거주 중이면 국내 소득이 없는 것으로 처리될 수 있어요.
          다만 해외 소득이나 국내 재산이 있으면 별도로 확인될 수 있으니 주민센터에서 상담받아야 해요.
        </p>
      </BorderBox>

      <Divider />

      <H2>부모 소득 확인 방법</H2>
      <p style={body}>
        부모 소득을 미리 확인하고 싶다면 건강보험료를 활용하면 돼요.
        직장가입자는 급여명세서에서, 지역가입자는 건강보험료 고지서에서 월 보험료를 확인할 수 있어요.
      </p>
      <p style={body}>
        건강보험료와 소득 기준의 관계는 매년 바뀌는데, 대략적으로 4인 가구 중위소득 100%(약 540만원)에 해당하는
        직장가입자 건강보험료가 월 17~19만원 정도예요. 이보다 많이 내고 있으면 기준을 넘길 가능성이 커요.
      </p>
      <p style={body}>
        정확한 판단은 심사에서 이뤄지지만, 미리 건보료를 확인하면 &quot;신청해볼 만한지&quot; 대략 판단할 수 있어요.
        본인 소득 기준이 궁금하다면 <Link href="/w/청년월세지원-소득기준-중위소득60-계산" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>소득 기준 계산 페이지</Link>를 참고하면 돼요.
      </p>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국토교통부 청년월세지원사업 안내와 보건복지부 기준 중위소득을 바탕으로 작성됐어요. 면제 조건은 개별 사례에 따라 다를 수 있으니 주민센터 상담이 필요해요." />
    </ArticleLayout>
  );
}
