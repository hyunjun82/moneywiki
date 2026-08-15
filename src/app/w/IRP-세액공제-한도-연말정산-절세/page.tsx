"use client";
// Q1. IRP 세액공제 한도 연말정산 절세 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "IRP 900만원 넣으면 연말정산에서 얼마 돌려받나요?", a: "총급여 5,500만원 이하면 148.5만원, 초과면 118.8만원 돌려받아요." },
  { q: "연금저축 600만원 + IRP 300만원이면 총 900만원 공제받나요?", a: "네, 맞아요. 둘을 합쳐서 900만원까지만 세액공제받으니까 이 조합이 정확해요." },
  { q: "IRP 중간에 빼면 어떻게 되나요?", a: "55세 전 해지하면 세액공제 받은 돈 전부 토해내야 해요. 추가로 16.5% 세금도 내니까 큰 손실이에요." }
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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP 세액공제 한도 및<br />
        연말정산 환급 계산법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP에 연간 900만원까지 납입하면 최대 148.5만원 세액공제받아요. 연금저축과 합산해서 공제받는 방법 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        IRP에 연간 900만원까지 납입하면 최대 148.5만원 세액공제받아요. 연금저축과 합산해서 공제받는 방법 알려드려요.
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
