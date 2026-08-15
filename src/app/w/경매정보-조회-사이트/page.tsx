"use client";
// Q1. 경매정보 조회 사이트 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "경매 정보 조회는 무료인가요?", a: "대법원 법원경매는 100% 무료예요. 민간 플랫폼도 기본 검색은 무료고, 상세 분석이나 상담은 유료인 곳이 많아요." },
  { q: "어떤 사이트를 써야 하나요?", a: "처음이면 대법원 법원경매로 시작하세요. 권리분석이나 전문가 상담이 필요하면 민간 플랫폼을 추가로 이용하면 돼요." },
  { q: "경매 사이트마다 정보가 다른가요?", a: "기본 물건 정보는 모두 대법원 자료를 쓰니까 같아요. 차이는 권리분석, UI, 부가 서비스예요." }
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
        경매정보 조회 사이트: 대법원부터<br />
        민간 플랫폼 7개 총정리
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매 정보 어디서 봐야 하는지 궁금하시죠? 공식 사이트부터 무료 플랫폼까지 한곳에 정리했어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        경매 정보 어디서 봐야 하는지 궁금하시죠? 공식 사이트부터 무료 플랫폼까지 한곳에 정리했어요.
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
