"use client";

// Q1. 자동차 이사 타지역 변경등록 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "전국번호판이면 차량등록 안 해도 되나요?", a: "네, 전국번호판에 소유자가 개인이고 주소가 주민등록주소지와 같으면 전입신고만 하면 자동으로 변경등록이 완료돼요. 별도로 차량등록사업소에 갈 필요 없어요." },
  { q: "지역번호판은 어떻게 하나요?", a: "지역번호판은 타 시·도로 이사하면 30일 내에 변경등록을 신청해야 해요. 차량등록사업소에 가서 신청하면 되고, 위반하면 최고 30만 원 과태료가 나와요." },
  { q: "법인 차량도 전국번호판이면 안 해도 되나요?", a: "아니요. 법인(사단, 재단 포함)은 전국번호판을 받았어도 주사무소 소재지 등 사용본거지가 변경되면 법인등기부 변경등기일로부터 30일 내에 신청해야 해요." }
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
        자동차 이사 타지역<br />
        변경등록 의무 전국번호판
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        서울에서 청주로 이사했어요. 차량 변경등록 꼭 해야 하나요? 전국번호판이면 전입신고만 하면 되고, 지역번호판이면 30일 내 변경해야 해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        서울에서 청주로 이사했어요. 차량 변경등록 꼭 해야 하나요? 전국번호판이면 전입신고만 하면 되고, 지역번호판이면 30일 내 변경해야 해요.
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
