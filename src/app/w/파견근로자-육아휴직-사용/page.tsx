"use client";

// Q1: 파견 근로자인데 육아휴직을 쓸 수 있는지 궁금한 상황
// Q2: 파견근로자 육아휴직 사용 가능 여부 확인 후 파견사업주에게 신청
// Q3: 파견근로자도 육아휴직 가능(근로기준법 적용), 신청 대상은 파견사업주, 고용보험 가입 필수, 1년 이상 근무
// Q4: GreenBox(결론) + Steps(신청 절차) + BorderBox(파견사업주 vs 사용사업주) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "고용보험 가입 확인", desc: "육아휴직급여를 받으려면 고용보험에 가입되어 있어야 해요. 파견근로자는 파견사업주가 고용보험을 가입해줘요.", tip: "고용보험 피보험자 확인: 고용보험 홈페이지(ei.go.kr)" },
  { title: "파견사업주에게 육아휴직 신청", desc: "육아휴직 신청은 파견사업주(파견회사)에게 해요. 사용사업주(실제 근무하는 회사)가 아니라 고용관계가 있는 파견회사에 신청하는 거예요.", tip: "출산 예정일 30일 전까지 신청하는 게 좋아요" },
  { title: "육아휴직급여 신청 (고용센터)", desc: "육아휴직 시작 후 1개월이 지나면 관할 고용센터에 육아휴직급여를 신청해요. 온라인으로도 가능해요.", tip: "고용24(work24.go.kr)에서 온라인 신청 가능" },
];

const FAQS = [
  { q: "파견근로자도 육아휴직을 쓸 수 있나요?", a: "네, 쓸 수 있어요. 파견근로자도 근로기준법과 남녀고용평등법이 적용돼요. 고용보험에 180일 이상 가입했고 만 8세 이하 자녀가 있으면 사용 가능해요." },
  { q: "육아휴직은 누구한테 신청하나요?", a: "파견사업주(파견회사)에게 신청해요. 실제 일하는 사용사업주가 아니라 근로계약을 맺은 파견회사가 고용주예요." },
  { q: "파견 계약이 끝나면 육아휴직도 끝나나요?", a: "파견 계약 종료와 육아휴직은 별개예요. 파견사업주와의 근로관계가 유지되면 육아휴직도 계속돼요. 다만 파견회사와 근로계약이 종료되면 실업급여로 전환될 수 있어요." },
  { q: "육아휴직급여는 얼마 받나요?", a: "통상임금의 80%예요 (상한 월 150만원, 하한 월 70만원). 첫 3개월은 통상임금의 100%(상한 250만원)를 받을 수 있어요." },
  { q: "사용사업주가 육아휴직을 거부하면요?", a: "사용사업주는 육아휴직을 거부할 권한이 없어요. 파견사업주가 거부하면 노동청에 신고할 수 있어요. 육아휴직 거부는 남녀고용평등법 위반이에요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "남녀고용평등법 제19조 (육아휴직)", url: "https://www.law.go.kr/법령/남녀고용평등과일ㆍ가정양립지원에관한법률" },
    { label: "파견근로자보호법", url: "https://www.law.go.kr/법령/파견근로자보호등에관한법률" },
  ]},
  { category: "신청", items: [
    { label: "고용24 육아휴직급여 신청", url: "https://www.work24.go.kr" },
  ]},
];

const RELATED = [
  { slug: "실업급여-수급-조건", title: "실업급여 수급 조건", description: "파견 계약 종료 후 실업급여 받는 조건이에요." },
  { slug: "유연근무제-신청-해제-방법", title: "유연근무제 신청 방법", description: "육아기 유연근무제를 쓰는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        파견근로자도 육아휴직 쓸 수 있을까?<br />
        신청 대상과 급여 받는 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        파견직으로 일하고 있는데 육아휴직을 쓸 수 있는 건지 확신이 없다고요?
        파견근로자도 당연히 육아휴직을 쓸 수 있어요. 신청은 실제 근무하는 회사가 아니라 파견사업주(파견회사)에게 해야 해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>파견근로자 육아휴직, 핵심 정리</H2>
      <p style={body}>파견근로자도 근로기준법과 남녀고용평등법이 동일하게 적용돼요. 사용사업주가 아닌 파견사업주가 고용주라는 점만 다를 뿐이에요.</p>
      <GreenBox title="핵심">
        파견근로자도 육아휴직 사용 가능 (남녀고용평등법 제19조)<br />
        신청 대상: 파견사업주(파견회사)<br />
        조건: 고용보험 180일 이상 + 만 8세 이하 자녀<br />
        급여: 통상임금 80% (상한 월 150만원)
      </GreenBox>

      <BorderBox>
        <strong>파견사업주 vs 사용사업주</strong><br />
        파견사업주(파견회사) = 근로계약 체결, 임금 지급, 고용보험 가입, 육아휴직 신청 대상<br />
        사용사업주(실제 근무 회사) = 업무 지시, 근무 장소 제공, 육아휴직 거부 권한 없음
      </BorderBox>

      <CategoryButton label="근로·노동 정보" count={6} href="/category/근로" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>육아휴직 신청 절차</H2>
      <p style={body}>파견사업주에게 신청하고, 휴직 시작 1개월 후 고용센터에서 급여를 신청하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 남녀고용평등법과 파견근로자보호법을 바탕으로 작성됐어요. 급여 상한액은 변경될 수 있으니 고용24에서 최신 정보를 확인해보세요." />
    </ArticleLayout>
  );
}
