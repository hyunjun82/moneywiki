"use client";

// Q1. 상가 유익비 상환청구 보일러 인테리어 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "인테리어 비용은 무조건 돌려받을 수 있나요?", a: "아니요. 건물 가치가 실제로 증가했고, 그 증가분이 임대차 종료 시까지 남아 있어야 해요." },
  { q: "유익비와 필요비는 뭐가 다른가요?", a: "필요비는 건물 유지를 위한 필수 수리비고, 유익비는 가치를 높이기 위한 개량비예요. 필요비는 즉시, 유익비는 임대차 종료 시 청구해요." },
  { q: "계약서에 유익비 포기 특약이 있으면요?", a: "특약이 유효하면 청구할 수 없어요. 계약 전에 꼭 확인하세요." }
];

const REFERENCES = [{ category: "참고", items: [{ label: "관련 법령·기관", url: "https://www.law.go.kr" }] }];
const RELATED: { slug: string; title: string; description: string }[] = [];

const STEPS = [
  { title: "자격·요건 확인", desc: "본인이 대상인지 관련 법령이나 기관 안내를 확인해요." },
  { title: "서류 준비", desc: "필요 서류를 미리 갖추면 빠르게 처리돼요." },
  { title: "신청·접수", desc: "온라인 또는 관할 기관 방문으로 신청해요." },
  { title: "결과 확인", desc: "처리 완료 후 결과를 확인하고 후속 조치를 해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상가 유익비 상환청구 보일러<br />
        인테리어 비용 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        사무실을 식당으로 바꾸려고 보일러, 주방, 페인트칠 다 했어요. 가게 닫고 이사 갈 때 건물주에게 비용 청구할 수 있나요?
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        사무실을 식당으로 바꾸려고 보일러, 주방, 페인트칠 다 했어요. 가게 닫고 이사 갈 때 건물주에게 비용 청구할 수 있나요?
      </GreenBox>

      <H2>이렇게 진행하면 돼요</H2>
      <p style={body}>순서대로 따라 하면 어렵지 않아요.</p>
      <Steps steps={STEPS} />

      <H2>놓치기 쉬운 주의사항</H2>
      <p style={body}>꼭 확인해야 할 부분이에요.</p>
      <BorderBox>
        기한과 요건을 꼼꼼히 확인하세요. 개별 사안은 관할 기관이나 전문가 상담을 권장해요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성됐어요. 법령·제도 변경에 따라 달라질 수 있으니 관할 기관에 확인하세요." />
    </ArticleLayout>
  );
}
