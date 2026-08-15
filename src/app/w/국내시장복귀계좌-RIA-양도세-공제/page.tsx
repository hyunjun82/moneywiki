"use client";
// Q1. 국내시장복귀계좌 RIA 양도세 공제 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "RIA 계좌에서 해외주식 다시 사면 어떻게 되나요?", a: "일반계좌에서 해외주식을 순매수하면 해당 금액에 비례해 소득공제 혜택이 줄어들어요. 세제 혜택만 노린 자금 돌려막기를 막기 위한 조치예요." },
  { q: "국민성장펀드 소득공제는 얼마까지 받을 수 있나요?", a: "투자금액 2억원 한도 내에서 최대 40% 소득공제받아요. 3천만원 이하 40%, 3~5천만원 20%, 5~7천만원 10% 공제율이 적용돼요." },
  { q: "RIA 양도세 공제는 언제까지 적용되나요?", a: "2026년 한 해 동안 한시적으로 적용돼요. 외환시장 안정화 목적으로 도입된 제도라서 연장 여부는 아직 미정이에요." }
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
        국내시장복귀계좌 RIA·양도세<br />
        공제·국민성장펀드
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        국내시장복귀계좌(RIA)로 해외주식 매도 후 국내주식 투자하면 양도세 최대 100% 공제받아요. 1분기 매도 시 전액 공제, 5천만원 한도예요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        국내시장복귀계좌(RIA)로 해외주식 매도 후 국내주식 투자하면 양도세 최대 100% 공제받아요. 1분기 매도 시 전액 공제, 5천만원 한도예요.
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
