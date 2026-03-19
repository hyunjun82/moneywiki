"use client";

// Q1. 청년월세지원 신청하려는데 내가 자격이 되는지 정확하게 확인하고 싶은 상황
// Q2. 나이·소득·자산·주거 4가지 조건을 순서대로 체크해서 신청 가능 여부 판단
// Q3. 만 19~34세 / 청년가구 중위소득 60% / 원가구 100% / 자산 1.22억 / 부모별거·무주택·월세
// Q4. GreenBox(조건별 상세표) + BorderBox(탈락 케이스 + 예외 규정) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR } from "@/data/청년월세지원-guide";

const FAQS = [
  {
    q: "만 34세 생일이 올해인데 신청할 수 있나요?",
    a: "신청일 기준으로 만 34세면 신청 가능해요. 신청 기간(3월 30일~5월 29일) 중에 생일이 지나서 만 35세가 되더라도 신청 시점에 만 34세였으면 해당돼요.",
  },
  {
    q: "부모님이 돌아가신 경우 원가구 기준은 어떻게 되나요?",
    a: "부모가 없거나 사실상 부양 관계가 단절된 경우 원가구 기준이 면제될 수 있어요. 관련 서류(사망진단서, 가족관계증명서 등)를 제출하면 담당 기관에서 검토해줘요.",
  },
  {
    q: "보증금이 있는 월세도 해당되나요?",
    a: "보증금 있는 월세도 해당돼요. 예를 들어 보증금 500만원에 월세 30만원이라면 월세(30만원) 부분에 대해 지원받을 수 있어요. 보증금 자체는 지원 대상이 아니에요.",
  },
  {
    q: "고시원·기숙사에 살면 신청 안 되나요?",
    a: "임대차계약서가 있는 정식 고시원은 신청 가능해요. 학교 기숙사는 대부분 해당 안 돼요. 월세를 납부하는 계약 형태인지가 핵심이에요.",
  },
  {
    q: "자산에 차량도 포함되나요?",
    a: "맞아요. 본인 명의 차량의 현재 시세가 자산에 포함돼요. 다만 생업용 차량(장애인, 영업용 등)은 제외될 수 있어요. 1.22억 한도 내에서 금융자산·부동산·차량이 모두 합산돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "마이홈포털: 청년월세지원 자가진단", url: "https://www.myhome.go.kr" },
      { label: "복지로 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "청년월세지원", title: "청년월세지원 전체 안내", description: "지원 금액·기간·신청 방법 전체 개요예요." },
  { slug: "청년월세지원-소득기준", title: "중위소득 60% 기준 계산", description: "내 소득이 기준 이하인지 계산하는 방법이에요." },
  { slug: "청년월세지원-신청방법", title: "복지로 신청 방법 4단계", description: "신청 절차와 필요 서류를 정리했어요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={청년월세지원_SIDEBAR} currentSlug="청년월세지원-자격조건" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 월세 · 자격 조건
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 자격조건<br />
        소득·자산·주거 기준 상세 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년월세지원은 4가지 조건을 모두 충족해야 해요.
        나이·소득·자산·주거 중 하나라도 안 되면 신청이 반려돼요.
        특히 원가구(부모) 소득 기준을 놓치는 경우가 많아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>자격 조건 상세</H2>

      <GreenBox>
        <strong style={{ fontSize: 13, color: GREEN }}>① 나이</strong>
        <p style={{ margin: "4px 0 12px", fontSize: 13 }}>
          신청일 기준 만 19세 이상 ~ 만 34세 이하
        </p>

        <strong style={{ fontSize: 13, color: GREEN }}>② 주거 조건 (3가지 모두 충족)</strong>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, margin: "4px 0 12px" }}>
          <tbody>
            {[
              { cond: "무주택", detail: "본인 명의 주택 없음" },
              { cond: "부모와 별도 거주", detail: "주민등록상 다른 주소에 거주" },
              { cond: "월세 임차인", detail: "임대차계약서 있는 월세 거주자" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "4px 8px", fontWeight: 600, width: "40%" }}>{r.cond}</td>
                <td style={{ padding: "4px 8px", fontSize: 12 }}>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <strong style={{ fontSize: 13, color: GREEN }}>③ 소득 기준</strong>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, margin: "4px 0 12px" }}>
          <tbody>
            {[
              { who: "청년 가구", crit: "중위소득 60% 이하", ex: "1인 가구 약 134만원" },
              { who: "원가구 (부모)", crit: "중위소득 100% 이하", ex: "4인 가구 약 609만원" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "4px 8px", fontWeight: 600, width: "30%" }}>{r.who}</td>
                <td style={{ padding: "4px 8px", color: GREEN, fontWeight: 600 }}>{r.crit}</td>
                <td style={{ padding: "4px 8px", fontSize: 11, color: "#555" }}>{r.ex}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <strong style={{ fontSize: 13, color: GREEN }}>④ 자산 기준</strong>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, margin: "4px 0 0" }}>
          <tbody>
            {[
              { who: "청년 가구", val: "1억 2,200만원 이하", note: "금융자산·부동산·차량 합산" },
              { who: "원가구 (부모)", val: "4억 7,000만원 이하", note: "부모 가구 전체 합산" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "4px 8px", fontWeight: 600, width: "30%" }}>{r.who}</td>
                <td style={{ padding: "4px 8px", color: GREEN, fontWeight: 600 }}>{r.val}</td>
                <td style={{ padding: "4px 8px", fontSize: 11, color: "#555" }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>탈락하는 주요 케이스</H2>
      <p style={body}>
        조건을 잘 못 읽어서 탈락하는 경우예요. 미리 확인해요.
      </p>

      <BorderBox>
        <strong>부모 집에 함께 거주</strong><br />
        주민등록상 부모와 같은 주소면 탈락이에요. 실거주와 무관하게 주민등록 기준이에요.<br />
        <br />
        <strong>원가구 소득이 중위소득 100% 초과</strong><br />
        부모 소득이 높으면 청년 본인 소득이 낮아도 탈락해요.<br />
        4인 가구 건강보험료 기준 약 609만원 초과 시 탈락.<br />
        <br />
        <strong>전세 거주</strong><br />
        월세가 없는 전세 계약은 해당 안 돼요. 보증금+월세 형태여야 해요.<br />
        <br />
        <strong>다른 월세 지원 수령 중</strong><br />
        주거급여(주거비 지원) 등 유사 지원을 이미 받고 있으면 중복 수령이 제한될 수 있어요.<br />
        <br />
        ★ 예외: 부모 없음·연락 두절 등 가구 관계 단절 시 원가구 기준 면제 가능 (증빙 필요)
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 공고 기준으로 작성됐어요. 소득·자산 기준 금액은 매년 조정되니 복지로 공고문을 확인하세요." />
    </ArticleLayout>
  );
}
