"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 장애인 차별을 당했는데 어디에 신고하고 어떤 법적 조치를 받을 수 있는지 궁금한 상황이에요.
// Q2. 국가인권위원회에 진정하거나 법원에 구제 청구를 하는 행동.
// Q3. 신고 기관(인권위·법원), 진정 절차, 법적 구제 수단, 손해배상 청구 가능 여부.
// Q4. Steps(구제 절차) + GreenBox(핵심 요약) + BorderBox(법적 근거) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const REMEDY_STEPS = [
  { title: "국가인권위원회 진정", desc: "humanrights.go.kr 또는 1331로 진정을 제기해요.", tip: "온라인·우편·방문 모두 가능, 수수료 없음" },
  { title: "조사 및 조정", desc: "인권위가 조사한 뒤 당사자 간 조정을 시도해요." },
  { title: "시정 권고", desc: "차별이 인정되면 인권위가 시정을 권고해요.", tip: "권고 불이행 시 법무부 장관이 시정명령 가능" },
  { title: "법원 구제 청구", desc: "인권위 절차와 별도로 법원에 손해배상·차별 중지를 청구할 수 있어요." },
];

const FAQS = [
  { q: "장애인 차별 신고는 어디에 하나요?", a: "국가인권위원회(1331)에 진정을 넣으세요. 온라인(humanrights.go.kr)으로도 가능하고 수수료가 없어요." },
  { q: "직장에서 차별당하면 어떻게 하나요?", a: "인권위 진정과 함께 고용노동부(1350)에도 신고할 수 있어요. 채용·승진·해고에서 장애를 이유로 한 차별은 위법이에요." },
  { q: "손해배상 받을 수 있나요?", a: "가능해요. 장애인차별금지법 제46조에 따라 차별 행위로 인한 손해배상을 법원에 청구할 수 있어요. 입증책임이 가해자에게 전환돼요." },
  { q: "악의적 차별이면 형사 처벌도 되나요?", a: "네. 악의적 차별 행위는 3년 이하 징역 또는 3,000만원 이하 벌금이에요. 법무부 장관의 시정명령 불이행 시에도 형사 처벌 대상이에요." },
  { q: "편의 시설 미설치도 차별인가요?", a: "맞아요. 장애인의 접근권을 보장하지 않는 것도 간접 차별에 해당할 수 있어요. 인권위에 진정 가능해요." },
  { q: "무료 법률 상담은 어디서 받나요?", a: "대한법률구조공단(132)에서 장애인 대상 무료 법률 상담과 소송 지원을 받을 수 있어요." },
];

const REFERENCES = [
  { category: "법령 및 기관", items: [
    { label: "장애인차별금지법(법제처)", url: "https://www.law.go.kr/법령/장애인차별금지및권리구제등에관한법률" },
    { label: "국가인권위원회", url: "https://www.humanrights.go.kr" },
    { label: "대한법률구조공단", url: "https://www.klac.or.kr" },
  ]},
];

const RELATED = [
  { slug: "장애인-보조공학기기-지원", title: "장애인 보조공학기기 지원", description: "보조기기 지원 대상과 신청 방법을 정리했어요." },
  { slug: "부당해고-구제-사건-종류", title: "부당해고 구제 사건 종류", description: "직장에서 부당한 대우를 받았을 때 구제 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 인권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 차별, 어디에 신고하고 어떻게 구제받나요?<br />
        진정 절차와 법적 대응
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        장애를 이유로 부당한 대우를 받았는데 어디에 말해야 할지 모르겠죠? 국가인권위원회에 진정하면 조사와 시정 권고를 받을 수 있어요.
        손해배상 청구도 가능하고, 악의적 차별은 형사 처벌 대상이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>구제 절차, 이렇게 진행돼요</H2>
      <p style={body}>
        가장 먼저 할 수 있는 건 국가인권위원회 진정이에요. 수수료도 없고 온라인으로도 가능해요.
        <a href="https://www.law.go.kr/법령/장애인차별금지및권리구제등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인차별금지법</a>이 이 권리를 보장하고 있어요.
      </p>

      <Steps steps={REMEDY_STEPS} />

      <GreenBox title="핵심 연락처">
        국가인권위원회: 1331 / humanrights.go.kr<br />
        고용노동부(직장 차별): 1350<br />
        법률구조공단(무료 소송): 132
      </GreenBox>

      <Divider />

      <H2>어떤 행위가 차별인가요?</H2>
      <p style={body}>
        직접 차별뿐 아니라 간접 차별, 정당한 편의 미제공도 차별에 해당해요.
      </p>

      <BorderBox>
        <strong>장애인차별금지법상 차별 유형</strong><br /><br />
        · <strong>직접 차별</strong>: 장애를 이유로 채용 거부, 서비스 이용 제한<br />
        · <strong>간접 차별</strong>: 장애인에게 불리한 조건을 적용<br />
        · <strong>정당한 편의 미제공</strong>: 편의시설 미설치, 보조기기 미지원<br />
        · <strong>광고 차별</strong>: 장애인을 배제하는 광고·공고
      </BorderBox>

      <Divider />

      <H2>손해배상과 형사 처벌은 가능한가요?</H2>
      <p style={body}>
        가능해요. 차별 행위로 손해를 입었다면 법원에 손해배상을 청구할 수 있어요. 특히 입증 책임이 가해자에게 전환되는 게 큰 장점이에요.
        악의적 차별은 3년 이하 징역 또는 3,000만원 이하 벌금이에요.
      </p>

      <GreenBox>
        손해배상: 법원에 청구 가능, 입증 책임 가해자에게 전환<br />
        형사 처벌: 악의적 차별 시 3년 이하 징역 또는 3,000만원 이하 벌금
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 장애인차별금지법을 기준으로 작성됐어요. 구체적 사건은 법률구조공단(132)에서 무료 상담을 받으세요." />
    </ArticleLayout>
  );
}
