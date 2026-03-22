"use client";

// Q1. 직장내 괴롭힘 신고 방법 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "직장내 괴롭힘 신고하면 해고되지 않나요?", a: "안 돼요. 신고자에게 불이익 처우하면 사업주가 3년 이하 징역 또는 3천만원 이하 벌금을 받아요. 법으로 신고자를 보호하고 있어요." },
  { q: "직장내 괴롭힘 증거 없으면 신고 못 하나요?", a: "증거 없어도 신고 가능해요. 동료 진술, 업무일지, 정황 증거만으로도 조사가 진행돼요. 다만 증거가 있으면 더 빠르게 해결돼요." },
  { q: "직장내 괴롭힘으로 회사가 망하면 보상 못 받나요?", a: "괴롭힘 자체는 민사 손해배상 청구로 해결해요. 회사가 망해도 가해자 개인에게 청구 가능하고, 산재 인정받으면 근로복지공단에서 치료비 지원받을 수 있어요." }
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
        직장내 괴롭힘·신고<br />
        방법·증거 수집·처벌
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직장내 괴롭힘 당하면 회사에 신고하고 고용노동부에 진정할 수 있어요. 증거 확보 방법과 처벌 기준 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        직장내 괴롭힘 당하면 회사에 신고하고 고용노동부에 진정할 수 있어요. 증거 확보 방법과 처벌 기준 알려드려요.
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
