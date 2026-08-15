"use client";
// Q1. 개인하수처리시설 관리기준 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "개인하수처리시설 방류수 측정은 언제 해야 하나요?", a: "시설 규모에 따라 달라요. 1일 처리용량 200㎥ 이상이면 6개월마다 1회 이상, 50㎥ 이상 200㎥ 미만이면 연 1회 이상 측정해야 해요. 측정 결과는 3년간 보관해야 하고요." },
  { q: "정화조 청소는 얼마나 자주 해야 하나요?", a: "기본적으로 연 1회 이상 내부청소를 실시해야 해요. 관광숙박업, 식품접객업, 숙박업은 연 2회 이상 해야 해요. 안 하면 100만 원 과태료가 나올 수 있어요." },
  { q: "전기 설비 있는 시설인데 전원 꺼도 되나요?", a: "절대 안 돼요. 전기 설비가 있는 개인하수처리시설의 경우 전원을 끄는 행위는 금지되어 있어요. 위반하면 100만 원 이하의 과태료를 부과받아요." }
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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        개인하수처리시설 관리기준 의무사항<br />
        방류수 측정
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        개인하수처리시설이 있는 건물 관리하는데 기준이 뭔가요? 방류수 수질 측정, 내부청소, 전원 끄면 안 되는 것까지 총정리예요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        개인하수처리시설이 있는 건물 관리하는데 기준이 뭔가요? 방류수 수질 측정, 내부청소, 전원 끄면 안 되는 것까지 총정리예요.
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
