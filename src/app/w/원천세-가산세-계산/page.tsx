"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 원천세 신고·납부 기한을 놓쳐서 가산세가 얼마나 나올지 걱정하는 사업자
// Q2. 가산세 금액을 계산하고, 감면 여부를 확인한 뒤 자진 수정신고를 한다
// Q3. 가산세 계산식(3% + 일할 0.022%), 최대 한도(50%), 감면 조건(자진 수정 시 감면율), 수정신고 방법
// Q4. GreenBox(계산식) + BorderBox(계산 예시) + Steps(수정신고 절차) + PenaltyTable + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스에 로그인하세요",
    desc: "hometax.go.kr에 공동인증서나 간편인증으로 로그인해요. 신고/납부 → 원천세 → 수정신고를 선택하면 돼요.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "미납분을 수정신고하세요",
    desc: "기존 신고서를 불러와서 미납(과소납부) 금액을 정확히 수정해요. 가산세는 자동으로 계산되어 나와요. 세무서에서 조사하기 전에 먼저 신고하면 가산세 감면을 받을 수 있어요.",
    tip: "6개월 이내 수정신고 시 가산세 50% 감면",
  },
  {
    title: "납부까지 완료하세요",
    desc: "수정신고 후 바로 납부해야 해요. 계좌이체, 신용카드, 가상계좌 등으로 결제할 수 있어요. 납부일이 하루라도 늦어지면 일할 가산세가 계속 쌓이니까 신고 당일에 납부하는 게 최선이에요.",
  },
];

const FAQS = [
  {
    q: "원천세 가산세는 최대 얼마까지 붙나요?",
    a: "미납세액의 50%가 한도예요. 아무리 오래 안 내도 원금의 50%를 넘기지 않아요. 다만 50%까지 쌓이려면 수년이 걸리는 수준이라 대부분의 경우 10% 미만에서 정리돼요.",
  },
  {
    q: "소규모 사업자도 원천세 가산세가 붙나요?",
    a: "네, 직원이 1명이든 100명이든 원천세 납부 의무가 있으면 가산세가 동일하게 적용돼요. 반기 납부 승인을 받은 사업자는 1월과 7월에 한 번씩만 내면 되니까 기한 관리가 조금 수월해요.",
  },
  {
    q: "가산세가 1천원 미만이면 안 내도 되나요?",
    a: "맞아요. 가산세가 1천원 미만이면 부과하지 않아요. 국세기본법에 따른 소액 부징수 규정이에요. 미납세액이 아주 적고 지연 기간이 짧으면 이 경우에 해당할 수 있어요.",
  },
  {
    q: "천재지변이나 질병으로 기한을 놓쳤으면요?",
    a: "정당한 사유가 인정되면 가산세가 면제될 수 있어요. 국세기본법 제48조에 따라 천재지변, 중대한 질병, 화재 등으로 기한 내 납부가 불가능했다면 증빙을 첨부해서 감면 신청을 하세요.",
  },
  {
    q: "수정신고 시 감면을 얼마나 받을 수 있나요?",
    a: "법정기한 경과 후 6개월 이내면 50%, 6개월~1년이면 20%, 1~2년이면 10% 감면돼요. 세무서 조사 통지 전에 자진 수정해야 적용되고, 조사 통지 이후에는 감면이 안 돼요.",
  },
  {
    q: "원천세에 신고불성실 가산세도 있나요?",
    a: "아니에요. 원천세는 다른 세금과 달리 신고불성실 가산세가 없고 납부지연 가산세만 있어요. 국세기본법 제47조의5에 따라 미납세액의 3%와 일할 계산 가산세만 부과돼요.",
  },
];

const RELATED = [
  { slug: "연말정산-결정세액", title: "결정세액 계산 방법", description: "산출세액에서 세액공제를 빼면 결정세액." },
  { slug: "사업소득-원천징수-3-3-percent", title: "3.3% 원천징수란?", description: "프리랜서 원천징수 구조와 종소세 신고." },
  { slug: "연말정산-자주-묻는-질문", title: "연말정산 자주 묻는 질문", description: "매년 반복되는 궁금증 10가지 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천세 · 가산세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        원천세 늦게 내면 가산세가 얼마나 붙을까?<br />
        계산 방법과 감면 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "원천세 신고를 깜빡했는데 가산세가 얼마나 나올까요?"
      </p>
      <p style={body}>
        원천세 가산세는 미납세액의 <strong>3% + 하루 0.022%</strong>가 누적돼요. 100만원을 30일 늦게 냈다면 약 36,600원이에요.
        <a href="https://www.law.go.kr/법령/국세기본법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세기본법 제47조의5</a>에 따르면 원천세는 신고불성실 가산세 없이 납부지연 가산세만 부과돼요.
        기한을 놓쳤다면 빨리 수정신고하는 게 가산세를 줄이는 유일한 방법이에요.
      </p>

      <Divider />

      <H2>원천세 가산세, 이렇게 계산해요</H2>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2292&cntntsId=7704" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>에 따르면 2026년 현재 원천세 가산세 계산식은 두 부분으로 구성돼요.
      </p>

      <GreenBox>
        원천세 가산세 계산식{"\n"}
        기본 가산세: 미납세액 x 3%{"\n"}
        일할 가산세: 미납세액 x 2.2/10,000 x 경과일수{"\n"}
        합계 = 기본 + 일할 (최대 미납세액의 50%)
      </GreenBox>

      <BorderBox>
        <strong>계산 예시 (100만원 미납, 30일 경과)</strong>{"\n"}
        · 기본 가산세: 1,000,000 x 3% = 30,000원{"\n"}
        · 일할 가산세: 1,000,000 x 0.00022 x 30 = 6,600원{"\n"}
        · 합계: 36,600원{"\n\n"}
        <strong>계산 예시 (500만원 미납, 90일 경과)</strong>{"\n"}
        · 기본: 5,000,000 x 3% = 150,000원{"\n"}
        · 일할: 5,000,000 x 0.00022 x 90 = 99,000원{"\n"}
        · 합계: 249,000원
      </BorderBox>

      <p style={body}>
        일할 가산세율은 시기에 따라 달라졌어요. 2019년까지 3/10,000, 2022년까지 2.5/10,000, 현재는 2.2/10,000이에요. 기한을 놓쳤다면 하루가 지날수록 가산세가 쌓이니까 바로 처리하세요.
      </p>

      <CategoryButton label="세금 정보" count={8} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수정신고하면 가산세를 깎아줘요</H2>
      <p style={body}>
        세무서에서 조사 통지를 받기 전에 자진 수정신고하면 가산세가 감면돼요.
        <a href="https://www.law.go.kr/법령/국세기본법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세기본법 제48조</a>에 따른 감면율이에요.
      </p>

      <SectionBadge>수정신고 가산세 감면율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>수정신고 시기</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>감면율</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["법정기한 후 6개월 이내", "50%"],
              ["6개월 ~ 1년", "20%"],
              ["1년 ~ 2년", "10%"],
              ["세무서 조사 통지 후", "감면 없음"],
            ].map(([when, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{when}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        6개월 이내에 수정하면 가산세가 절반으로 줄어요. 36,600원이 18,300원이 되는 거예요. 가산세 1천원 미만은 아예 부과하지 않고, 천재지변·중대 질병 등 정당한 사유가 있으면 전액 면제도 가능해요.
      </p>

      <Divider />

      <H2>수정신고하는 절차예요</H2>
      <p style={body}>
        기한을 놓쳤다면 최대한 빨리 수정신고하세요. 하루만 더 늦어도 일할 가산세가 추가되니까요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2292&cntntsId=7704" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>국세청 가산세 안내</a>
        <a href="https://www.law.go.kr/법령/국세기본법" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>국세기본법</a>
      </div>

      <Disclaimer text="이 글은 2026년 3월 기준 법령을 바탕으로 작성됐어요. 가산세율과 감면 조건은 법 개정에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
