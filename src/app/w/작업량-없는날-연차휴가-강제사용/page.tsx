"use client";
// Q1. 작업량 없는날 연차휴가 강제사용 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "관련 문의는 어디로 하나요?", a: "관할 기관 고객센터로 전화하거나 방문 상담하면 돼요." },
  { q: "온라인으로 처리할 수 있나요?", a: "대부분 정부24나 관할 기관 홈페이지에서 온라인 처리가 가능해요." },
  { q: "처리 기간은 얼마나 걸리나요?", a: "보통 2~4주 정도 소요돼요. 서류 보완이 필요하면 더 걸릴 수 있어요." },
  { q: "대리 신청이 가능한가요?", a: "위임장과 신분증 사본이 있으면 가능한 경우가 많아요." },
  { q: "비용이 드나요?", a: "대부분 무료예요. 일부 수수료가 발생할 수 있어요." }
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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 연차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        작업량 없는 날 연차휴가 강제사용
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        작업량이 없는 날을 회사가 일방적으로 연차휴가로 처리할 수 있나요? 연차휴가 강제 사용의 적법성을 알려드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        작업량이 없는 날을 회사가 일방적으로 연차휴가로 처리할 수 있나요? 연차휴가 강제 사용의 적법성을 알려드릴게요.
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
