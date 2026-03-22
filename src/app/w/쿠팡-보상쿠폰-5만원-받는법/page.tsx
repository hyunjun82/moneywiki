"use client";

// Q1. 쿠팡 보상쿠폰 5만원 받는법 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. steps + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  { q: "쿠팡 보상쿠폰 탈퇴 회원도 받을 수 있나요?", a: "네, 가능해요. 탈퇴 전 사용했던 휴대폰 번호로 다시 가입하면 쿠폰을 받을 수 있어요." },
  { q: "쿠팡 5만원 쿠폰 언제까지 사용할 수 있나요?", a: "2026년 4월 15일까지예요. 기한 지나면 자동 소멸되니 빨리 쓰세요." },
  { q: "쿠팡 보상쿠폰 가족한테 줄 수 있나요?", a: "아니요, 양도 불가예요. 본인 계정에서만 사용 가능하고, 가족 계정으로 옮길 수 없어요." }
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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활/소비</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        쿠팡 보상쿠폰 5만원 받는법과<br />
        0원 상품 구매 꿀팁
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        쿠팡 개인정보 유출 보상으로 5만원 쿠폰 받았는데 어떻게 쓰는지 모르겠죠? 0원으로 생수, 라면 공짜로 받는 방법 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        쿠팡 개인정보 유출 보상으로 5만원 쿠폰 받았는데 어떻게 쓰는지 모르겠죠? 0원으로 생수, 라면 공짜로 받는 방법 알려드려요.
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
