"use client";

// Q1. ISA 계좌 가입 세제혜택 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "ISA 계좌 서민형 일반형 차이가 뭔가요?", a: "서민형은 비과세 한도가 400만원으로 일반형 200만원보다 2배예요. 소득 요건 맞으면 무조건 서민형이 유리해요." },
  { q: "ISA 계좌 중도 해지하면?", a: "3년 의무 가입기간 전에 해지하면 비과세 혜택이 없어지고 일반 세율로 과세돼요. 급하게 돈 쓸 일 있으면 다른 곳에서 빌리는 게 나아요." },
  { q: "ISA 계좌 2026년 혜택 확대되나요?", a: "국회에서 비과세 한도를 일반형 500만원, 서민형 1천만원으로 늘리는 법안을 논의 중이에요. 통과되면 2026년 중 시행될 전망이에요." }
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
        ISA 계좌 가입 세제혜택 한도
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        ISA 만능통장이 좋다는데 뭐가 좋은지 모르겠다고요? ISA 계좌 가입 방법부터 비과세 혜택, 납입한도까지 쉽게 정리해드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        ISA 만능통장이 좋다는데 뭐가 좋은지 모르겠다고요? ISA 계좌 가입 방법부터 비과세 혜택, 납입한도까지 쉽게 정리해드릴게요.
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
