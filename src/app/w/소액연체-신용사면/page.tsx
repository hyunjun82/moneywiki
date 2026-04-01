"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연체 때문에 대출·카드 발급이 안 돼서 금융 생활이 막혀 있는데, 다 갚았는데도 이력이 남아서 답답한 상황이에요.
// Q2. 신용사면 대상인지 확인하고, 올크레딧·나이스지키미에서 신용점수를 조회한 뒤 정상 금융 거래를 재개하는 행동.
// Q3. 대상 조건(5천만원 이하, 2025년 말까지 상환), 신용점수 상승폭(개인 29점/사업자 45점), 확인 방법(올크레딧·나이스지키미), 금융거래 정상화 현황.
// Q4. EligibilityChecker(대상 확인) + GreenBox(핵심 변화) + Steps(조회 방법) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "2020년 1월~2025년 8월 사이 연체가 있었다" },
  { id: "c2", label: "연체 금액이 5,000만원 이하였다" },
  { id: "c3", label: "2025년 12월 말까지 연체를 전액 상환했다" },
  { id: "c4", label: "개인 또는 개인사업자이다" },
];

const QUERY_STEPS = [
  { title: "올크레딧 접속 (KCB 점수)", desc: "allcredit.co.kr에서 '전국민 무료 신용조회' 버튼을 클릭해요. 연 3회 무료로 조회 가능해요." },
  { title: "나이스지키미 접속 (NICE 점수)", desc: "credit.co.kr에서 '무료신용조회'를 클릭해요. 2011년 10월 이후부터 조회해도 점수에 영향 없어요." },
  { title: "연체 이력 삭제 여부 확인", desc: "신용정보 상세 내역에서 연체 이력이 사라졌는지, 점수가 올랐는지 확인해요." },
  { title: "금융 거래 재개", desc: "점수가 올랐다면 대출 심사나 카드 발급을 다시 신청해보세요. 이미 11만명이 신규 대출을 받았어요." },
];

const FAQS = [
  { q: "신용사면 대상인지 어떻게 알 수 있나요?", a: "올크레딧이나 나이스지키미에서 무료 신용점수를 조회하면 돼요. 연체 이력이 삭제됐다면 점수가 올라 있을 거예요. 조회해도 점수에 영향 없으니 걱정 말고 확인하세요." },
  { q: "5천만원 넘는 연체도 사면 대상이에요?", a: "아니에요. 이번 조치는 5천만원 이하 소액연체만 해당해요. 5천만원을 초과하면 기존 규정대로 최장 5년간 연체 이력이 남아요." },
  { q: "연체 이력 삭제되면 바로 대출받을 수 있나요?", a: "가능해요. 신용점수가 회복되면 바로 대출 심사를 받을 수 있어요. 실제로 11만명이 은행에서 신규 대출을 받았고, 3.8만명이 신용카드를 새로 발급받았어요." },
  { q: "신용점수가 얼마나 올라요?", a: "개인 평균 29점, 개인사업자 평균 45점 상승했어요. 20대 이하가 평균 37점으로 가장 많이 올랐고요. 사회초년생 때 연체했던 분들이 가장 큰 혜택을 받은 거예요." },
  { q: "이전 신용회복 지원에서 혜택 못 받은 사람도 포함되나요?", a: "네. 금융위원회 발표에 따르면 과거 신용회복 지원 과정에서 혜택을 못 받았던 개인 41만 3천명, 개인사업자 5만명까지 포함됐어요." },
  { q: "신용점수 조회하면 점수가 깎이나요?", a: "아니에요. 2011년 10월 이후부터 본인 신용조회는 점수에 영향을 주지 않아요. 걱정 말고 조회하세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회 소액연체 신용사면 보도자료", url: "https://www.fsc.go.kr" },
      { label: "올크레딧 (KCB 신용점수 조회)", url: "https://www.allcredit.co.kr" },
      { label: "나이스지키미 (NICE 신용점수 조회)", url: "https://www.credit.co.kr" },
    ],
  },
];

const RELATED = [
  { slug: "신용점수-올리기", title: "신용점수 올리는 실전 방법", description: "신용사면 이후 점수를 더 끌어올리는 전략이에요." },
  { slug: "연체-불이익-해결", title: "연체 시 불이익과 해결 방법", description: "연체가 생겼을 때 빠르게 대처하는 방법이에요." },
  { slug: "신용카드-발급-조건", title: "신용카드 발급 조건", description: "신용 회복 후 카드 발급받을 때 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 신용 · 연체</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        소액연체 신용사면, 292만명 대상<br />
        신용점수 회복과 금융 거래 재개 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연체 다 갚았는데 5년이나 기다려야 한다니 막막하셨죠?
        2026년 1월부터 5천만원 이하 소액연체를 전액 상환한 292만 8천명이 신용사면을 받았어요.
        연체 이력이 즉시 삭제되고, 대출·카드 발급이 바로 가능해졌어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>나도 신용사면 대상인지 확인해보세요</H2>
      <p style={body}>
        <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회</a>에서 발표한 대상 조건은 명확해요.
        2020년 1월~2025년 8월 사이 5천만원 이하 연체가 있었고, 2025년 12월 말까지 전액 상환했다면 대상이에요.
        대상자는 약 370만명이었고, 그중 292만 8천명이 실제로 혜택을 받았어요.
      </p>

      <SectionBadge>대상자 자가 확인</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="신용사면 대상이에요. 올크레딧이나 나이스지키미에서 점수를 확인해보세요." partialMatchText="일부 조건이 맞지 않아요. 정확한 확인은 올크레딧·나이스지키미에서 신용점수를 조회해보세요." />

      <p style={body}>
        기존에는 연체를 갚아도 최장 5년간 금융거래 제한이 있었어요.
        이번 조치로 전액 상환하면 연체 이력이 즉시 삭제돼요. 5년 기다릴 필요가 없어진 거예요.
        과거 신용회복 지원에서 혜택을 못 받았던 개인 41만 3천명, 개인사업자 5만명까지 포함됐어요.
      </p>

      <Divider />

      <H2>신용점수가 얼마나 올랐을까요?</H2>
      <p style={body}>
        신용사면 이후 모든 연령대에서 신용점수가 올랐어요.
        20대 이하가 가장 많이 올라서, 사회초년생 때 연체했던 분들이 큰 혜택을 받았어요.
      </p>

      <SectionBadge>신용점수 상승 현황</SectionBadge>
      <GreenBox title="신용사면 효과">
        <p style={{ ...body, marginBottom: 6 }}><strong>개인 전체</strong>: 평균 29점 상승</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>개인사업자</strong>: 평균 45점 상승</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>20대 이하</strong>: 평균 37점 상승 (최대 폭)</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>금융 정상화</strong>: 개인 3.8만명 카드 발급, 11만명 신규 대출, 사업자 6천명 신규 대출</p>
      </GreenBox>

      <p style={body}>
        개인사업자 중에서는 숙박·음식점업과 도소매업에서 신용회복자가 많았어요.
        코로나 때 힘들었던 민생 밀접 업종이 회복 기회를 얻은 거예요.
      </p>

      <Divider />

      <H2>내 신용점수 확인하는 방법</H2>
      <p style={body}>
        대상자인지 확인하는 가장 확실한 방법은 직접 조회해보는 거예요.
        연체 이력이 삭제됐다면 점수가 올라 있을 거예요. 조회해도 점수에 영향 없으니 걱정 마세요.
      </p>

      <SectionBadge>무료 신용점수 조회 순서</SectionBadge>
      <Steps steps={QUERY_STEPS} />

      <Divider />

      <H2>신용사면 이후 주의할 점</H2>
      <p style={body}>
        신용이 회복됐다고 해서 무리하게 대출받으면 다시 연체 위험에 빠질 수 있어요.
        회복된 신용을 유지하는 게 중요해요.
      </p>

      <SectionBadge>주의사항</SectionBadge>
      <BorderBox title="신용사면 이후 체크포인트">
        <p style={{ ...body, marginBottom: 6 }}><strong>무리한 대출 자제</strong>: 갚을 수 있는 범위 내에서만 빌리세요</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>카드 사용액 관리</strong>: 결제일 전에 잔액 확인하는 습관이 중요해요</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>소액이라도 연체 금지</strong>: 통신비·공과금 연체도 신용점수에 영향을 줘요</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>정기적 점수 확인</strong>: 올크레딧·나이스지키미에서 분기별로 확인하세요</p>
      </BorderBox>

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융위원회 보도자료를 바탕으로 작성했어요. 신용사면 대상 여부는 올크레딧·나이스지키미에서 직접 확인하세요." />
    </ArticleLayout>
  );
}
