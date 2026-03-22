"use client";

// Q1. 연말정산에서 추가 납부 세액이 크게 나와서 한 번에 내기 부담되는 상황
// Q2. 분납 가능 여부를 확인하고, 분납 신청 또는 회사에 분할 납부를 요청한다
// Q3. 분납 가능 금액 기준(10만원 초과), 분납 기간(3개월), 신청 방법, 이자 여부
// Q4. GreenBox(분납 기준) + Steps(신청 절차) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  { title: "추가 납부 세액 확인", desc: "연말정산 결과표에서 차감징수세액이 양수(+)면 추가 납부 세액이에요. 마이너스(-)면 환급이니 분납이 필요 없어요." },
  { title: "회사에 분납 요청", desc: "추가 납부 세액이 10만원을 넘으면 회사 급여 담당자에게 분납을 요청해요. 근로자가 요청하면 회사가 분할 공제해야 해요." },
  { title: "3개월 분할 공제", desc: "추가 납부 세액을 2월~4월 급여에서 나눠 공제해요. 예를 들어 30만원이면 매월 10만원씩 3개월간 빠져요." },
];

const FAQS = [
  { q: "분납하면 이자가 붙나요?", a: "아니에요. 연말정산 분납은 이자 없이 3개월 나눠 내는 거예요. 종합소득세 분납과 달라요." },
  { q: "10만원 이하면 분납이 안 되나요?", a: "소득세법상 추가 납부 세액이 10만원 이하면 분납 대상이 아니에요. 한 번에 납부해야 해요." },
  { q: "회사가 분납을 거부하면 어떻게 하나요?", a: "소득세법 제137조의2에 따라 근로자가 요청하면 회사는 분납해야 할 의무가 있어요. 거부하면 관할 세무서에 문의하세요." },
  { q: "중도퇴사자도 분납할 수 있나요?", a: "중도퇴사 시에는 퇴사 월 급여에서 한 번에 정산돼요. 분납이 어려울 수 있지만, 퇴사 전 회사와 협의해볼 수 있어요." },
  { q: "추가 납부 세액이 100만원 넘으면요?", a: "금액에 상관없이 3개월 분할이에요. 100만원이면 매월 약 33만원씩 공제돼요. 그 이상 분할은 안 돼요." },
];

const SOURCES = [
  { name: "소득세법 제137조의2", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-환급-조회-기간", title: "연말정산 환급금 조회와 지급 시기", description: "환급금이 언제 들어오는지 확인하는 법." },
  { slug: "연말정산-과다공제-사례", title: "연말정산 과다공제 사례", description: "자주 실수하는 공제 항목과 가산세." },
  { slug: "중도퇴사자-연말정산-처리", title: "중도퇴사자 연말정산 처리", description: "퇴사 후 연말정산 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 분납</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 추가 납부, 나눠 낼 수 있을까?<br />
        분납 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산에서 수십만원 추가 납부가 나오면 부담되죠. 10만원이 넘으면 3개월에 나눠 낼 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제137조의2</a>에 따라 추가 납부 세액이 10만원을 초과하면 근로자가 원할 때 회사가 2월부터 4월까지 분할 공제해야 해요. 이자도 안 붙어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>분납 가능 조건부터 확인하세요</H2>
      <p style={body}>
        모든 추가 납부가 분납 대상은 아니에요. 핵심 기준은 금액이에요.
      </p>

      <GreenBox title="연말정산 분납 기준">
        추가 납부 세액 10만원 초과 → 분납 가능{"\n"}
        추가 납부 세액 10만원 이하 → 분납 불가, 일시 납부{"\n"}
        분납 기간: 2월~4월 (3개월 분할){"\n"}
        이자: 없음
      </GreenBox>

      <p style={body}>
        근로자가 요청하지 않으면 회사가 2월 급여에서 한 번에 공제할 수 있어요. 분납을 원하면 반드시 급여 담당자에게 말해야 해요.
      </p>

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>분납 신청은 이렇게 해요</H2>
      <p style={body}>
        별도 세무서 신청 없이 회사 급여팀에 요청하면 돼요.
      </p>

      <SectionBadge>분납 요청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>분납 시 주의할 점</H2>
      <p style={body}>
        분납 자체는 간단하지만, 몇 가지 알아둘 점이 있어요.
      </p>

      <BorderBox>
        <strong>분납 주의사항</strong><br />
        3개월 이상 분할은 안 돼요 (최대 2월~4월){"\n"}<br />
        이직하면 새 회사에서 잔여 세액을 한 번에 공제할 수 있어요{"\n"}<br />
        종합소득세 분납과는 별개 제도예요 (종소세는 2개월 분납, 이자 있음)
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>분납에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 개별 회사 급여 규정에 따라 분납 절차가 다를 수 있으니, 급여 담당자에게 확인하세요." />
    </ArticleLayout>
  );
}
