"use client";

// Q1: 착오송금 반환청구 방법 부당이득 예금보험공사 info
// Q2: 첫째: 착오송금은 민법상 부당이득 반환청구권으로 돌려받을 수 있음
// Q3: 첫째: 착오송금은 민법상 부당이득 반환청구권으로 돌려받을 수 있음, 둘째: 5만 원 이상 1억 원 이하, 송금 후 1년 이내면 예금보험공사 반환지원 제도 이용 가능, 셋째: 상대방이 반환 거부하면 예금보험공사가 채권 매입 후 강제 회수 진행
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "첫째: 착오송금은 민법상 부당이득 반환청구권으로 돌려받", desc: "첫째: 착오송금은 민법상 부당이득 반환청구권으로 돌려받을 수 있음" },
  { title: "둘째: 5만 원 이상 1억 원 이하, 송금 후 1년 이", desc: "둘째: 5만 원 이상 1억 원 이하, 송금 후 1년 이내면 예금보험공사 반환지원 제도 이용 가능" },
  { title: "셋째: 상대방이 반환 거부하면 예금보험공사가 채권 매입", desc: "셋째: 상대방이 반환 거부하면 예금보험공사가 채권 매입 후 강제 회수 진행" },
];
const CHECKLIST = [
  "첫째: 착오송금은 민법상 부당이득 반환청구권으로 돌려받을 수 있음",
  "둘째: 5만 원 이상 1억 원 이하, 송금 후 1년 이내면 예금보험공사 반환지원 제도 이용 가능",
  "셋째: 상대방이 반환 거부하면 예금보험공사가 채권 매입 후 강제 회수 진행"
];

const FAQS = [
  { q: "착오송금은 무조건 돌려받을 수 있나요?", a: "법적으로는 돌려받을 권리가 있어요. 다만 상대방 계좌에 돈이 없거나, 이미 압류되어 있으면 실제로 회수하기 어려울 수 있어요." },
  { q: "착오송금 반환청구 기간은 언제까지인가요?", a: "예금보험공사 지원제도는 송금 후 1년 이내에 신청해야 해요. 법적으로는 부당이득 반환청구권 소멸시효 10년까지 가능하지만, 빨리 신청할수록 유리해요." },
  { q: "착오송금 반환받는데 비용이 드나요?", a: "예금보험공사 지원제도는 무료예요. 다만 예보에서 채권을 매입할 때 약간의 수수료가 차감될 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "민법 제741조 부당이득", url: "https://www.law.go.kr" },
      { label: "찾기쉬운 생활법령정보 - 착오송금", url: "https://www.easylaw.go.kr" },
      { label: "예금보험공사 착오송금 반환지원", url: "https://fins.kdic.or.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        착오송금 반환청구 방법 부당이득 예금보험공사
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계좌번호 잘못 입력해서 엉뚱한 사람한테 7천만 원을 보냈어요. 돌려받을 수 있을까요? 착오송금 반환 절차와 예금보험공사 지원제도를 알려드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>첫째: 착오송금은 민법상 부당이득 반환청구권으로 돌려받</H2>
      <p style={body}>첫째: 착오송금은 민법상 부당이득 반환청구권으로 돌려받을 수 있음</p>
      <GreenBox title="핵심 정리">
        첫째: 착오송금은 민법상 부당이득 반환청구권으로 돌려받을 수 있음<br />
        둘째: 5만 원 이상 1억 원 이하, 송금 후 1년 이내면 예금보험공사 반환지원 제도 이용 가능<br />
        셋째: 상대방이 반환 거부하면 예금보험공사가 채권 매입 후 강제 회수 진행
      </GreenBox>

      <CategoryButton label="금융 · 경제 정보" count={5} href="/category/금융" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>둘째: 5만 원 이상 1억 원 이하, 송금 후</H2>
      <p style={body}>둘째: 5만 원 이상 1억 원 이하, 송금 후 1년 이내면 예금보험공사 반환지원 제도 이용 가능</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
