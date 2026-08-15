"use client";
// Q1. 실업급여 신청했는데 바로 안 나와서 7일 대기기간이 뭔지 궁금한 상황이에요.
// Q2. 대기기간이 언제부터 시작하고 언제 끝나는지 계산해서 첫 입금일을 파악하는 행동.
// Q3. 7일 대기기간(고용보험법 제49조), 실업 신고일부터 계산, 건설일용근로자 예외, 대기기간 vs 수급기간 차이.
// Q4. GreenBox(핵심 정리) + BorderBox(계산 예시) + Steps(대기기간 후 할 일) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "왜 7일을 기다려야 하나요?", a: "실업급여가 공적 자금이라 신청자가 정말 구직 의사가 있는지 확인하는 기간이에요. 부정수급을 방지하려는 취지예요." },
  { q: "7일 안에 취업하면 어떻게 되나요?", a: "대기기간 중 재취업하면 실업급여를 받을 수 없어요. 단, 조기재취업수당 대상이 될 수 있어요." },
  { q: "건설일용근로자도 7일 기다려야 하나요?", a: "아니에요. 건설일용근로자는 대기기간 없이 실업 신고일부터 바로 급여가 나와요." },
  { q: "대기기간과 수급기간이 뭐가 달라요?", a: "대기기간은 급여가 안 나오는 7일이고, 수급기간은 그 후 실제로 급여를 받는 기간(120~270일)이에요." },
  { q: "온라인으로 신고해도 대기기간이 같나요?", a: "네. 고용24에서 온라인 신고하든 고용센터 방문하든 신고 완료일부터 7일이에요." },
  { q: "대기기간에도 구직활동을 해야 하나요?", a: "의무는 아니지만 미리 시작하면 좋아요. 워크넷 이력서 작성, 입사지원 등을 해두면 이후 실업인정 받을 때 증빙으로 쓸 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제49조 (대기기간)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 실업급여 안내", url: "https://www.work24.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-신청방법", title: "실업급여 신청방법", description: "구직등록부터 입금까지 5단계 절차를 알려드려요." },
  { slug: "실업급여-계산기", title: "실업급여 계산기", description: "내가 받을 수 있는 금액을 계산해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 대기기간 7일<br />
        계산 방법과 예외
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 신청했는데 바로 입금될 줄 알았죠?
        실업 신고일부터 7일간 대기기간이 있어서 그 사이에는 급여가 안 나와요.
        내 대기기간이 언제 끝나는지 계산해보세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>대기기간 7일, 이렇게 계산해요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제49조</a>에 따라
        실업 신고일부터 7일간 구직급여가 지급되지 않아요. 퇴직한 날이 아니라 신고한 날이 기준이에요.
      </p>

      <GreenBox>
        대기기간 핵심 정리예요.<br />
        · 시작일: 실업 신고일 (고용센터 방문 또는 온라인 신고 완료일)<br />
        · 기간: 신고일 포함 7일<br />
        · 급여 시작: 8일째부터<br />
        · 예외: 건설일용근로자는 대기기간 없이 바로 지급
      </GreenBox>

      <p style={body}>
        빨리 신고할수록 빨리 급여를 받을 수 있어요.
        퇴직 후 미루지 말고 최대한 빨리 고용센터에 가거나 고용24에서 온라인 신고하세요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>내 대기기간 끝나는 날 계산해보세요</H2>
      <p style={body}>
        예시로 계산해볼게요. 달력에 표시해두면 첫 입금일을 알 수 있어요.
      </p>

      <SectionBadge>대기기간 계산 예시</SectionBadge>
      <BorderBox>
        <strong>예시 1: 2026년 3월 15일 신고</strong><br />
        대기기간: 3월 15일~3월 21일 (7일)<br />
        급여 지급 시작: 3월 22일부터<br /><br />
        <strong>예시 2: 2026년 4월 1일 신고, 수급기간 120일</strong><br />
        대기기간: 4월 1일~4월 7일 (7일)<br />
        급여 지급 시작: 4월 8일<br />
        급여 지급 종료: 8월 5일까지<br /><br />
        <strong>건설일용근로자</strong>: 대기기간 없음, 신고일부터 바로 급여 지급
      </BorderBox>

      <Divider />

      <H2>대기기간 끝나면 이렇게 해요</H2>
      <p style={body}>
        7일이 지나면 실업인정을 받아야 급여가 입금돼요.
        구직활동 증빙도 미리 준비해두세요.
      </p>

      <SectionBadge>대기기간 후 할 일</SectionBadge>
      <Steps steps={[
        { title: "실업인정일 확인", desc: "수급자격 인정 시 지정받은 실업인정일에 맞춰 구직활동을 보고해요." },
        { title: "구직활동 증빙 준비", desc: "입사지원 캡처, 면접 확인서, 취업박람회 참가 확인 등을 모아두세요." },
        { title: "실업인정 신청", desc: "고용센터 방문 또는 고용24 온라인으로 실업인정을 받아요." },
        { title: "급여 입금 확인", desc: "실업인정 후 2~3일 내 본인 계좌로 입금돼요. 고용24에서 수급내역을 확인할 수 있어요." },
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 제도 변경 시 대기기간 규정이 달라질 수 있으니 고용24에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
