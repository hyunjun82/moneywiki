"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 문화예술인 특수고용 계약서 작성 권리 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "문화예술인도 근로자로 인정받나요?", a: "특수고용 계약을 하면 독립계약자 지위에 있지만, 계약서로 명확하게 보호받을 수 있어요. 최근 법 개정으로 더 많은 권리가 인정되고 있어요." },
  { q: "표준계약서를 꼭 써야 하나요?", a: "반드시 서면 계약서를 작성해야 해요. 구두 약속으로 일한 후 돈 못 받는 사례가 많으니까 꼭 표준계약서를 사용하세요." },
  { q: "계약서 없이 일했는데 급여를 못 받으면 어떻게 하나요?", a: "문화예술용역법에 따라 사업주를 고소할 수 있어요. [한국예술인복지재단](/w/예술인-고용보험-가입)에서 무료 법률 상담을 받을 수 있어요." }
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
        문화예술인 특수고용·계약서<br />
        작성·권리
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        문화예술인이 특수고용 계약을 체결할 때 표준계약서를 사용하고 자신의 권리를 지키는 방법을 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        문화예술인이 특수고용 계약을 체결할 때 표준계약서를 사용하고 자신의 권리를 지키는 방법을 알려드려요.
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
