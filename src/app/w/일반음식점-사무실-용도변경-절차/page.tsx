"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 일반음식점 사무실 용도변경 절차 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "용도변경 비용은 얼마나 드나요?", a: "같은 시설군 내 변경은 수수료가 거의 안 들어요. 건축물대장 기재내용 변경 신청비만 내면 돼요. 지역마다 다르지만 보통 몇만 원 수준이에요." },
  { q: "용도변경 기간은 얼마나 걸리나요?", a: "같은 시설군 내 변경은 신청 후 3~7일 정도면 처리돼요. 서류가 완비되면 빠르게 진행돼요." },
  { q: "용도변경 없이 그냥 사무실로 쓰면 안 되나요?", a: "안 돼요. 무단으로 용도를 바꾸면 이행강제금이나 원상복구 명령을 받을 수 있어요. 반드시 정식 절차를 거쳐야 해요." }
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
        일반음식점을 사무실로<br />
        용도변경 절차
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        150제곱미터 4층 건물을 음식점에서 사무실로 바꾸려면 어떻게 하나요? 같은 시설군이면 간단해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        150제곱미터 4층 건물을 음식점에서 사무실로 바꾸려면 어떻게 하나요? 같은 시설군이면 간단해요.
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
