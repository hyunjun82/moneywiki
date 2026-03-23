"use client";

// Q1: 개인사업자의 법인 전환 시기와 세금 비교: 언제가 최적일까 info
// Q2: 순이익이 5,000만 원 이상이면 법인 전환을 고려해봐야 해요.
// Q3: 순이익이 5,000만 원 이상이면 법인 전환을 고려해봐야 해요., 개인사업자는 38% 세율인데 법인은 10~20% 정도라서 세금이 훨씬 적어요., 성실신고 대상이 되기 전에 전환하면 초기 3년 성실신고를 피할 수 있어요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "순이익이 5,000만 원 이상이면 법인 전환을 고려해봐야 해요.",
  "개인사업자는 38% 세율인데 법인은 10~20% 정도라서 세금이 훨씬 적어요.",
  "성실신고 대상이 되기 전에 전환하면 초기 3년 성실신고를 피할 수 있어요."
];

const FAQS = [
  { q: "개인사업자와 법인의 세금 차이가 정말 클까요?", a: "정말 커요. 순이익이 1억 원이라면 개인사업자는 38% 세율인데 법인은 10%여요. 같은 1억 원에서 개인은 3,800만 원 세금, 법인은 1,000만 원 세금이에요. 2,800만 원 차이가 나죠." },
  { q: "법인으로 바꾸면 언제부터 세금을 덜 내요?", a: "법인등기를 완료한 날부터 법인세 대상이 돼요. 그래서 연도 중간에 전환하면 개인사업자 소득세 몇 개월 + 법인세 몇 개월로 나뉘어서 더 유리해요." },
  { q: "성실신고 대상은 뭐예요?", a: "소득이 커서 국세청이 꼼꼼하게 봐야 한다고 생각하는 사람이에요. 개인사업자는 순이익 2억 원 이상, 부동산임차료 3억 원 이상 등이 해당돼요. 성실신고 대상이 되면 3년간 회계기록 정리가 복잡해져요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 법인세 정보", url: "https://www.nts.go.kr" },
      { label: "2026년 세제개편 내용", url: "https://taxly.kr/post/1449" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        개인사업자의 법인 전환 시기와 세금 비교<br />
        언제가 최적일까
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        개인사업자지만 법인으로 바꿀까 고민이시죠. 세금이 얼마나 적게 드는지, 언제 바꾸는 게 최적인지 완벽하게 설명해드릴게요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>순이익이 5,000만 원 이상이면 법인 전환을 고려해봐</H2>
      <p style={body}>순이익이 5,000만 원 이상이면 법인 전환을 고려해봐야 해요.</p>
      <GreenBox title="핵심 정리">
        순이익이 5,000만 원 이상이면 법인 전환을 고려해봐야 해요.<br />
        개인사업자는 38% 세율인데 법인은 10~20% 정도라서 세금이 훨씬 적어요.<br />
        성실신고 대상이 되기 전에 전환하면 초기 3년 성실신고를 피할 수 있어요.
      </GreenBox>

      <CategoryButton label="세금 · 절세 정보" count={5} href="/category/세금" />
      <RelatedArticles items={[]} />
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
      <Disclaimer text="이 글은 2026년 1월 기준, 2026년 법인세 인상 반영 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
