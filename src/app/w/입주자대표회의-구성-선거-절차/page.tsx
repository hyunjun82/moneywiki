"use client";

// Q1. 입주자대표회의 구성 선거 절차 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "입주자대표회의 선거 투표율이 10분의 1 안 되면 어떻게 되나요?", a: "전체 입주자 10분의 1 이상이 투표해야 선출이 유효해요. 투표율이 안 되면 재선거를 해야 해요." },
  { q: "입주자대표회의 임기는 몇 년인가요?", a: "동별 대표자 임기는 2년이에요. 연임도 가능하고요." },
  { q: "입주자대표회의 구성 후 신고는 언제 하나요?", a: "입주자대표회의가 구성되거나 변경된 날부터 30일 이내에 시장·군수·구청장에게 신고서를 제출해야 해요." }
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
        입주자대표회의 구성 선거<br />
        절차 어떻게 되나요
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        입주자대표회의는 어떻게 구성되나요? 동별로 대표자 뽑고 전체 입주자 10분의 1 이상 투표하면 선출돼요. 임기는 2년이에요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        입주자대표회의는 어떻게 구성되나요? 동별로 대표자 뽑고 전체 입주자 10분의 1 이상 투표하면 선출돼요. 임기는 2년이에요.
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
