"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 실업신고 지연 후 가능 여부 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "실업신고 몇 개월 지나도 할 수 있나요?", a: "퇴사일로부터 12개월 이내라면 언제든 신청 가능해요. 지연된 기간도 수급 기간에서 빠지지 않아요." },
  { q: "회사가 이직확인서 안 내주면 어떻게 하나요?", a: "고용센터에서 직권으로 확인 조사해요. 이직확인서 없어도 국민연금 이력으로 확인하니 수급 자격에 문제없어요." },
  { q: "실업신고 늦게 하면 받을 돈 줄어드나요?", a: "아니요, 줄어들지 않아요. 신청일 기준으로 남은 수급 기간만큼 전액 받을 수 있어요." }
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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업신고 지연·늦게·소급·가능<br />
        여부
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업신고 늦게 해도 괜찮아요. 퇴사 후 12개월 이내 소급 신청 가능하며, 지연된 기간만큼 받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        실업신고 늦게 해도 괜찮아요. 퇴사 후 12개월 이내 소급 신청 가능하며, 지연된 기간만큼 받을 수 있어요.
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
