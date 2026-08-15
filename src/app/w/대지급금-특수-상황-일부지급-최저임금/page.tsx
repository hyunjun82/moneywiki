"use client";
// Q1. 대지급금을 신청했는데 일부만 지급됐거나 거부당해서 나머지를 어떻게 받을지 고민
// Q2. 일부 지급 사유 확인 → 초과분 별도 청구 → 부정수급 제재 회피
// Q3. 일부 지급 사유(상한 초과, 항목 불인정), 부정수급 제재(전액환수+추가징수), 최저임금 보정, 이의신청
// Q4. GreenBox(일부 지급 사유) + BorderBox(부정수급 제재) + Steps(이의신청 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "지급 결정서 확인", desc: "근로복지공단에서 보낸 대지급금 지급 결정서를 확인해요. 일부 지급 사유와 금액이 적혀 있어요." },
  { title: "이의신청서 작성", desc: "지급 결정에 이의가 있으면 결정 통보일부터 90일 이내에 근로복지공단에 이의신청해요.", tip: "90일 지나면 행정소송만 가능" },
  { title: "초과분 민사청구 검토", desc: "상한 초과분은 사업주에게 직접 청구하거나, 파산·회생 절차에서 배당을 신청해요." },
  { title: "법률 지원 활용", desc: "대한법률구조공단(132) 무료 법률 상담을 받을 수 있어요. 소송 비용도 지원돼요." },
];

const FAQS = [
  { q: "대지급금 상한이 얼마인가요?", a: "퇴직 전 3개월분 임금과 퇴직급여 각각 상한이 있어요. 연령·근속연수에 따라 다르고, 매년 고용노동부 고시로 정해져요." },
  { q: "최저임금보다 적게 받았는데 대지급금은 어떻게 되나요?", a: "최저임금 미달 임금은 최저임금액으로 보정해서 대지급금에 반영돼요. 실제 받은 금액이 아니라 법정 최저임금 기준으로 계산해요." },
  { q: "거짓으로 신청하면 어떻게 되나요?", a: "부정수급으로 전액 환수 + 동일 금액 추가 징수돼요. 형사처벌(사기죄)까지 가능하니 정확한 금액으로만 신청하세요." },
  { q: "사업주가 일부 임금을 줬는데 전액 신청해도 되나요?", a: "안 돼요. 이미 받은 금액을 빼고 미지급분만 신청해야 해요. 중복 수령 시 부정수급으로 제재받아요." },
  { q: "대지급금 결정에 불복하면 어떻게 하나요?", a: "근로복지공단에 이의신청(90일 이내) → 고용노동부 심사청구 → 행정소송 순으로 진행할 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "임금채권보장법", url: "https://www.law.go.kr/법령/임금채권보장법" },
  ]},
  { category: "기관", items: [
    { label: "근로복지공단 대지급금 안내", url: "https://www.kcomwel.or.kr" },
  ]},
];

const RELATED = [
  { slug: "대지급금-체당금-지급-사유-종류", title: "대지급금 체당금 지급 사유", description: "대지급금 신청 자격과 지급 종류예요." },
  { slug: "월급-세금-공제-항목", title: "월급 세금 공제 항목", description: "급여에서 빠지는 세금 항목 정리예요." },
  { slug: "고용24-실업급여", title: "고용24 실업급여 신청", description: "실업급여 온라인 신청 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 임금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대지급금 일부만 나왔다면?<br />
        일부 지급 사유와 부정수급 제재 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        체불임금 대지급금을 신청했는데 생각보다 적게 나왔거나 일부 항목이 빠져서 당황스럽죠.
        상한 초과, 항목 불인정, 이미 받은 금액 차감 등 여러 사유가 있어요. 초과분은 별도로 청구할 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>왜 일부만 지급되는 걸까</H2>
      <p style={body}>
        대지급금에는 상한이 있고, 신청 항목 중 인정되지 않는 부분이 있으면 차감돼요.
      </p>
      <GreenBox>
        <strong>일부 지급 사유 3가지</strong><br /><br />
        ① 상한 초과: 연령·근속연수별 상한액을 넘는 금액은 지급 불가<br />
        ② 항목 불인정: 증빙 부족하거나 임금으로 인정되지 않는 항목 차감<br />
        ③ 기지급분 차감: 사업주에게 이미 받은 금액은 대지급금에서 빠져요<br /><br />
        ★ 최저임금 미달 임금은 최저임금액으로 보정해서 반영돼요
      </GreenBox>

      <H2>부정수급하면 이런 제재를 받아요</H2>
      <p style={body}>
        거짓 신청이나 중복 수령은 부정수급으로 엄격하게 제재돼요. 실제 체불액만 정확히 신청해야 해요.
      </p>
      <BorderBox>
        <strong>부정수급 제재</strong><br />
        전액 환수 + 동일 금액 추가 징수 (2배 반환)<br />
        형사고발(사기죄) 가능 → 징역 또는 벌금<br />
        향후 대지급금 신청 제한<br /><br />
        <strong>부정수급 예시</strong><br />
        사업주와 짜고 허위 체불 신고 → 대지급금 수령<br />
        이미 받은 임금을 숨기고 전액 신청<br />
        근무하지 않은 기간 임금 청구
      </BorderBox>

      <H2>일부만 받았을 때 나머지는 이렇게 해요</H2>
      <p style={body}>
        상한 초과분이나 불인정 항목에 이의가 있다면 공단에 이의신청을 하고, 초과분은 민사로 청구할 수 있어요.
      </p>
      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 임금채권보장법 기준으로 작성됐어요. 대지급금 상한·지급 기준은 매년 변경되니 근로복지공단(1588-0075)에 확인하세요." />
    </ArticleLayout>
  );
}
