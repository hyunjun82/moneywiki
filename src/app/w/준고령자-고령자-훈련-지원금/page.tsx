"use client";

// Q1. 50대 이상인데 직업훈련비 지원받을 수 있는지, 사업주가 신청하는 건지 궁금
// Q2. 지원 자격 확인 → 사업주 또는 개인 신청 → 훈련비 환급
// Q3. 준고령자(50~54세)·고령자(55세+) 구분, 사업주 훈련지원금, 개인 내일배움카드, 지원 금액
// Q4. GreenBox(지원 대상 구분) + Steps(신청 절차) + BorderBox(지원 금액) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "대상 여부 확인", desc: "만 50세 이상 근로자를 고용한 사업주이거나, 만 50세 이상 구직자 본인이면 신청 가능해요." },
  { title: "훈련과정 선택", desc: "HRD-Net(hrd.go.kr)에서 직업능력개발 훈련과정을 검색해요. 고용노동부 인정 과정이어야 지원돼요." },
  { title: "신청서 제출", desc: "사업주는 고용보험 시스템에서, 개인은 내일배움카드로 신청해요.", tip: "사업주 훈련은 훈련 시작 전 신청 필수" },
  { title: "훈련비 환급", desc: "훈련 수료 후 사업주는 훈련비 전액 또는 일부를 환급받아요. 개인은 카드로 자동 결제돼요." },
];

const FAQS = [
  { q: "준고령자와 고령자의 나이 기준은요?", a: "고용상 연령차별금지법에 따라 준고령자는 50~54세, 고령자는 55세 이상이에요." },
  { q: "사업주가 아니라 개인이 직접 받을 수 있나요?", a: "네, 국민내일배움카드를 발급받으면 개인도 직업훈련비 지원을 받을 수 있어요. 연 200~300만원 한도예요." },
  { q: "어떤 훈련과정이 지원되나요?", a: "고용노동부가 인정한 직업능력개발 훈련과정이에요. IT, 요양보호사, 회계, 용접 등 다양한 과정이 있어요." },
  { q: "사업주 훈련 지원금은 얼마인가요?", a: "훈련비 전액 또는 80~100%를 환급받아요. 우선지원대상기업(중소기업)은 100%, 대기업은 80% 수준이에요." },
  { q: "훈련 도중 퇴사하면 어떻게 되나요?", a: "수료하지 못하면 지원금이 지급되지 않아요. 사업주 훈련의 경우 환급 불가, 개인은 자비 부담이 생길 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [{ label: "고용보험법 (직업능력개발)", url: "https://www.law.go.kr/법령/고용보험법" }] },
  { category: "기관", items: [
    { label: "HRD-Net 직업훈련포털", url: "https://www.hrd.go.kr" },
    { label: "고용노동부", url: "https://www.moel.go.kr" },
  ]},
];

const RELATED = [
  { slug: "고령자-취업-프로그램", title: "고령자 취업 프로그램", description: "55세 이상 재취업 지원 프로그램이에요." },
  { slug: "고용24-실업급여", title: "고용24 실업급여", description: "실업급여 신청 방법이에요." },
  { slug: "계약직-정규직-전환-기준-요건", title: "계약직 정규직 전환 기준", description: "기간제 근로자 전환 요건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        50세 넘어도 직업훈련비 지원받을 수 있을까?<br />
        준고령자·고령자 훈련 지원금 신청 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        나이가 들면서 새로운 기술을 배우고 싶은데 훈련비가 부담되죠.
        만 50세 이상이면 사업주 훈련 지원금이나 내일배움카드로 훈련비를 지원받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>누가 지원받을 수 있나요</H2>
      <p style={body}>사업주가 고령 근로자를 훈련시키거나, 개인이 직접 훈련을 받거나 둘 다 지원돼요.</p>
      <GreenBox>
        <strong>사업주 훈련 지원</strong>: 준고령자(50~54세)·고령자(55세+) 근로자를 훈련시키면 훈련비 전액/일부 환급<br />
        <strong>개인 훈련 지원</strong>: 국민내일배움카드 발급 → 연 200~300만원 한도 훈련비 지원<br /><br />
        ★ 사업주·개인 모두 고용노동부 인정 훈련과정만 가능
      </GreenBox>

      <H2>신청 절차 4단계</H2>
      <p style={body}>사업주 신청과 개인 신청 모두 온라인으로 가능해요.</p>
      <Steps steps={STEPS} />

      <H2>지원 금액은 이만큼이에요</H2>
      <p style={body}>기업 규모와 훈련 유형에 따라 환급률이 달라져요.</p>
      <BorderBox>
        <strong>사업주 훈련비 환급</strong><br />
        우선지원대상기업(중소기업): 훈련비 100% 환급<br />
        대규모기업(1,000인 이상): 훈련비 80% 환급<br /><br />
        <strong>개인 내일배움카드</strong><br />
        자비부담: 훈련비의 0~45% (과정별 상이)<br />
        한도: 연 200~300만원 (5년간 300~500만원)<br /><br />
        ★ 실업자·저소득자는 자비부담이 더 적어요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 고용보험법 기준으로 작성됐어요. 지원 금액과 조건은 매년 변경될 수 있으니 HRD-Net이나 고용노동부에 확인하세요." />
    </ArticleLayout>
  );
}
