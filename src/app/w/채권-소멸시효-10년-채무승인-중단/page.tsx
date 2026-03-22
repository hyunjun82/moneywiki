"use client";

// Q1. 채권 소멸시효 10년 채무승인 중단 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "12년 전에 빌린 돈인데 중간에 일부 갚았어요. 소멸시효 지났나요?", a: "아니요, 안 지났어요. 일부 변제는 채무 승인이 돼서 소멸시효가 중단돼요. 일부 갚은 시점부터 다시 10년이 새로 시작되기 때문에 아직 소멸시효가 안 지났어요." },
  { q: "채무 승인이란 뭐고 어떤 행위가 승인에 해당하나요?", a: "채무 승인은 채무자가 빚이 있다는 걸 인정하는 행위예요. 명시적으로 " },
  { q: "소멸시효가 중단되면 어떻게 되나요?", a: "중단되기 전까지 지나간 시간은 모두 무효가 돼요. 그리고 중단 사유가 끝난 시점부터 다시 10년이 새로 시작돼요. 예를 들어 8년 지났을 때 일부 변제하면, 그 8년은 리셋되고 변제한 날부터 다시 10년이에요." }
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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        채권 소멸시효 10년 채무<br />
        승인 중단 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        12년 전에 빌려준 돈인데 일부 갚았어요. 소멸시효 지나서 안 갚아도 되나요? 아니에요, 채무 승인하면 소멸시효가 중단되고 다시 10년이 시작돼요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        12년 전에 빌려준 돈인데 일부 갚았어요. 소멸시효 지나서 안 갚아도 되나요? 아니에요, 채무 승인하면 소멸시효가 중단되고 다시 10년이 시작돼요.
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
