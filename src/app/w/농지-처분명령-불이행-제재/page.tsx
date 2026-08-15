"use client";
// Q1. 농지 처분명령을 받았는데 기한 내 처분 못 하면 어떤 제재를 받는지 궁금한 상황이에요.
// Q2. 이행강제금 규모를 파악하고 처분 기한 내에 매도를 결정하는 행동.
// Q3. 처분 기한 6개월, 이행강제금 토지가액 20%, 매년 반복 부과, 처분 방법.
// Q4. GreenBox(제재 요약) + Steps(대응 절차) + BorderBox(이행강제금 계산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const RESPONSE_STEPS = [
  { title: "처분명령 내용 확인", desc: "통지서에 적힌 처분 사유, 기한, 농지 범위를 확인해요." },
  { title: "매수인 찾기", desc: "부동산 중개업소에 의뢰하거나, 한국농어촌공사에 매입 신청을 해요.", tip: "농어촌공사가 매입 대상 농지라면 공시지가 수준에서 매수해줘요" },
  { title: "6개월 내 매매계약 체결", desc: "매수인과 계약하고 소유권 이전 등기를 완료해요." },
  { title: "처분 완료 신고", desc: "시장·군수에게 처분 완료를 신고하면 이행강제금 부과가 중단돼요." },
];

const FAQS = [
  { q: "처분명령 받으면 언제까지 팔아야 하나요?", a: "6개월이에요. 시장·군수가 정한 기간 안에 처분하지 않으면 이행강제금이 부과돼요." },
  { q: "이행강제금은 한 번만 내나요?", a: "아니에요. 처분할 때까지 매년 반복해서 부과돼요. 토지가액의 20%가 매년 나가니 빨리 처분하는 게 유리해요." },
  { q: "토지가액 1억이면 이행강제금이 얼마인가요?", a: "연 2,000만원이에요. 2년 방치하면 4,000만원, 5년이면 1억이에요. 토지 값과 맞먹는 금액이 나가요." },
  { q: "한국농어촌공사가 매입해주나요?", a: "공사가 매입 대상 농지로 판단하면 매수해줘요. 개별공시지가 수준의 가격이라 시세보다 낮을 수 있지만, 빠르게 처분할 수 있는 방법이에요." },
  { q: "농사를 지으면 처분명령을 취소받을 수 있나요?", a: "자경을 시작하면 시장·군수에게 처분명령 유예나 취소를 신청할 수 있어요. 실제 경작 사실을 입증해야 해요." },
  { q: "처분명령에 불복할 수 있나요?", a: "행정심판이나 행정소송으로 불복할 수 있어요. 처분 사유가 부당하다고 판단되면 전문 변호사와 상담하세요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "농지법(법제처)", url: "https://www.law.go.kr/법령/농지법" },
    { label: "농지법 시행령(법제처)", url: "https://www.law.go.kr/법령/농지법시행령" },
  ]},
];

const RELATED = [
  { slug: "농지-대리경작-기간-비용", title: "농지 대리경작 기간과 비용", description: "직접 농사를 못 지을 때 대리경작 방법을 정리했어요." },
  { slug: "농지보전부담금-5천만원-할부-납부", title: "농지보전부담금 할부 납부", description: "5천만원 이상이면 분할 납부가 가능해요." },
  { slug: "농지-임대차-대리경작-가능여부", title: "농지 임대차 가능 여부", description: "어떤 경우에 농지 임대차가 허용되는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 농지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농지 처분명령 무시하면 어떻게 되나요?<br />
        이행강제금 계산과 대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        농지를 샀는데 농사를 안 지어서 처분명령을 받으셨죠? 6개월 안에 팔지 않으면 토지가액의 20%가 이행강제금으로 부과돼요.
        이게 한 번이 아니라 매년 반복이에요. 토지가액 1억이면 연 2,000만원씩 나가는 거예요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>이행강제금, 얼마나 나오나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/농지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>농지법 제62조</a>에 따르면
        처분 기한 내 미처분 시 토지가액의 20%를 이행강제금으로 부과해요. 개별공시지가 또는 감정평가액이 기준이에요.
      </p>

      <GreenBox title="이행강제금 핵심">
        · 부과 기준: 토지가액(공시지가 or 감정가)의 20%<br />
        · 부과 시기: 처분 기한(6개월) 경과 후<br />
        · 반복 부과: 처분 완료할 때까지 매년<br />
        · 1억 기준: 연 2,000만원, 5년이면 1억
      </GreenBox>

      <Divider />

      <H2>처분명령 받으면 어떻게 대응해야 하나요?</H2>
      <p style={body}>
        가장 좋은 방법은 6개월 안에 매도하는 거예요. 매수인 찾기가 어렵다면 한국농어촌공사에 매입 신청을 하는 것도 방법이에요.
      </p>

      <Steps steps={RESPONSE_STEPS} />

      <p style={body}>
        자경을 시작하면 처분명령 유예를 받을 수도 있어요. 다만 실제 경작 사실을 입증해야 하니, 형식적 경작은 인정받기 어려워요.
      </p>

      <Divider />

      <H2>처분명령 사유는 뭔가요?</H2>
      <p style={body}>
        농지법에서 농지 소유자에게 자경 의무를 부과하고 있어요. 이 의무를 지키지 않으면 시장·군수가 처분명령을 내려요.
      </p>

      <BorderBox>
        <strong>주요 처분명령 사유</strong><br /><br />
        · 농지 취득 후 정당한 사유 없이 경작하지 않는 경우<br />
        · 자경 의무 기간(취득 후 일정 기간) 내 미경작<br />
        · 농업경영 목적 없이 농지를 보유하고 있는 경우<br />
        · 허위로 농업경영계획서를 작성한 경우
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 농지법을 기준으로 작성됐어요. 개별공시지가와 처분명령 기한은 지자체마다 다를 수 있으니 관할 시·군에 확인하세요." />
    </ArticleLayout>
  );
}
