"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 전세 2채 가진 집주인이 "2026년부터 세금 내야 해?" 변경사항 확인하는 상황
// Q2. 내 주택 기준시가 확인 → 간주임대료 계산 → 사업자 등록 + 종합소득세 신고
// Q3. 과세 조건 (기준시가 12억 초과 2채 + 보증금 합계 12억 초과) / 간주임대료 계산 / 분리과세 14% / 사업자 등록 의무
// Q4. GreenBox(과세 조건 요약) + GreenBox(간주임대료 계산 예시) + BorderBox(사업자 등록 의무) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "기준시가 12억 이하 2주택자도 전세보증금에 세금이 붙나요?",
    a: "아니에요. 두 주택 중 하나라도 기준시가 12억원 이하이면 간주임대료 과세 대상이 아니에요. 두 주택 모두 12억 초과이고, 보증금 합계도 12억 초과여야 과세돼요.",
  },
  {
    q: "기준시가는 어디서 확인해요?",
    a: "국토교통부 부동산 공시가격 알리미(realtyprice.kr)에서 확인할 수 있어요. 공동주택 공시가격이 기준시가예요. 단독주택은 개별주택 공시가격이에요.",
  },
  {
    q: "월세와 전세를 섞어서 임대하면 어떻게 계산해요?",
    a: "월세 수입은 그대로 임대소득으로 보고, 전세보증금은 간주임대료로 환산해서 더해요. 합산 금액이 연 2,000만원 이하면 분리과세(14%)를 선택할 수 있어요.",
  },
  {
    q: "사업자 등록을 꼭 해야 하나요?",
    a: "임대소득이 발생하면 사업 개시일로부터 20일 이내에 세무서에 사업자 등록을 해야 해요. 등록하지 않으면 수입금액의 0.2%가 매년 가산세로 붙어요.",
  },
  {
    q: "분리과세와 종합과세 중 어떤 게 유리해요?",
    a: "임대소득이 연 2,000만원 이하면 분리과세(14%)와 종합과세 중 선택할 수 있어요. 다른 소득(근로소득 등)이 많으면 분리과세가 유리하고, 다른 소득이 적으면 종합과세가 유리할 수 있어요. 세무사와 상담해 보세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 주택임대소득 과세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2249&cntntsId=7681" },
      { label: "소득세법 (간주임대료 과세)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "홈택스: 종합소득세 신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "간주임대료-계산", title: "간주임대료 계산 공식과 2026년 이자율", description: "보증금별 간주임대료 금액과 2주택 계산 예시예요." },
  { slug: "주택임대소득-신고", title: "주택임대소득 종합소득세 신고 방법", description: "분리과세 선택과 필요경비 50% 공제 방법이에요." },
  { slug: "임대사업자-등록", title: "임대사업자 등록 절차와 세액감면", description: "세무서 등록 의무와 민간임대주택 세액감면이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 임대소득 · 2주택자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2주택자 임대소득세 2026년 변경<br />
        전세보증금 간주임대료 과세 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년부터 기준시가 12억원 초과 주택 2채 보유자가 보증금 합계 12억원을 넘기면
        전세만 줘도 간주임대료로 세금이 붙어요.
        기준시가 12억 이하라면 해당 없어요. 사업자 등록도 의무예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 과세 대상 조건</H2>
      <p style={body}>
        2025년까지는 2주택자 전세는 모두 비과세였어요.
        2026년부터 고가 2주택자에게도 간주임대료 과세가 시작됐어요.
        아래 두 조건을 모두 충족해야 과세 대상이에요.
      </p>

      <GreenBox>
        <strong>2주택자 간주임대료 과세 조건 (2026년~)</strong><br />
        조건 1: 두 주택 모두 기준시가 12억원 초과<br />
        조건 2: 전세보증금 합계 12억원 초과<br />
        → 두 조건 모두 충족해야 과세<br />
        <br />
        <strong>비과세 케이스</strong><br />
        주택 1채라도 기준시가 12억원 이하 → 비과세<br />
        보증금 합계 12억원 이하 → 비과세<br />
        <br />
        기준시가 확인: 국토교통부 공시가격 알리미(realtyprice.kr)
      </GreenBox>

      <H2>간주임대료 계산 예시</H2>
      <p style={body}>
        서울 아파트 2채(각각 기준시가 13억, 14억)를 전세 7억, 8억에 놓은 경우예요.
        공식은 (보증금 합계 - 3억) × 60% × 3.1%(2026년 이자율)예요.
        자세한 계산법은 <a href="/w/간주임대료-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>간주임대료 계산 방법</a>에서 볼 수 있어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>금액</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "A주택 보증금", amount: "7억원" },
              { label: "B주택 보증금", amount: "8억원" },
              { label: "3억원 공제 후 기준", amount: "(7억+8억-3억) = 12억원" },
              { label: "60% 적용", amount: "12억 × 60% = 7.2억원" },
              { label: "간주임대료 (연간)", amount: "7.2억 × 3.1% = 2,232만원" },
              { label: "분리과세 세액 (필요경비 50% 후 14%)", amount: "약 156만원/년" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 5 ? "rgba(29,158,117,0.08)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 5 ? 700 : 400 }}>{row.label}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: i === 5 ? 700 : 400, color: i === 5 ? "#1D9E75" : undefined }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 분리과세 시 필요경비 50%, 기본공제 200만원 적용<br />
          ※ 실제 세금은 다른 소득과 공제에 따라 달라져요
        </p>
      </GreenBox>

      <H2>사업자 등록, 안 하면 가산세 붙어요</H2>
      <p style={body}>
        간주임대료 과세 대상이 되면 사업자 등록이 의무예요.
        늦게 하거나 안 하면 가산세가 붙어요.
      </p>

      <BorderBox>
        <strong>임대사업자 등록 의무 사항</strong><br />
        등록 기한: 사업 개시일(2026년 1월 1일)로부터 20일 이내<br />
        등록 방법: 홈택스(hometax.go.kr) 온라인 or 가까운 세무서 방문<br />
        미등록 가산세: 수입금액의 0.2% 매년 부과<br />
        <br />
        <strong>분리과세 신고 방법</strong><br />
        임대소득 연 2,000만원 이하: 분리과세(14%) 또는 종합과세 선택 가능<br />
        신고 기간: 매년 5월 종합소득세 신고<br />
        필요경비: 분리과세 시 50% 자동 공제, 기본공제 200만원 추가 공제<br />
        <br />
        ※ 다른 소득이 많으면 분리과세가 유리, 소득이 적으면 종합과세 비교 필요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 소득세법 개정 및 국세청 안내 기준으로 작성됐어요. 과세 여부와 절세 방법은 개인 상황에 따라 다르니 세무사 상담을 받으세요." />
    </ArticleLayout>
  );
}
