"use client";

// Q1: 전세 계약서를 쓰기 전에 어떤 특약을 넣어야 보증금을 지킬 수 있는지 궁금한 세입자
// Q2: 필수 특약 항목을 파악하고 계약서에 반영
// Q3: 근저당 해지 조건, 전세보증보험 협조, 수리비 부담, 계약 해지 조건, 보증금 반환 기한
// Q4: Checklist(필수 특약 목록) + GreenBox(핵심 3대 특약) + Steps(특약 작성법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const MUST_CHECKLIST = [
  "근저당 설정 시 전세보증금보다 선순위 채권이 적을 것",
  "전세보증보험 가입에 집주인이 협조할 것 (서류 제공 포함)",
  "보증금 반환 기한 (계약 종료 후 OO일 이내)",
  "보증금 미반환 시 지연이자 연 O% 적용",
  "하자 수리 비용은 집주인 부담 (보일러, 수도, 전기 등)",
  "세입자 동의 없이 근저당 추가 설정 금지",
  "계약 기간 중 매도 시 보증금 승계 의무",
  "중도 해지 시 보증금 반환 조건과 기한",
];

const STEPS = [
  { title: "등기부등본 확인", desc: "계약 전에 등기부등본을 떠서 근저당, 가압류, 전세권 설정 내역을 확인해요. 선순위 채권이 보증금보다 많으면 위험해요.", tip: "대법원 인터넷등기소(iros.go.kr)에서 확인" },
  { title: "필수 특약 작성", desc: "위 체크리스트 항목을 계약서 특약란에 직접 기재해요. 공인중개사에게 특약 추가를 요청하면 돼요." },
  { title: "전세보증보험 가입", desc: "계약 후 HUG, SGI서울보증, 한국주택금융공사 중 하나에서 전세보증보험에 가입해요. 집주인 동의와 서류 협조가 필요해요." },
];

const FAQS = [
  { q: "특약은 법적 효력이 있나요?", a: "네, 계약서에 기재된 특약은 법적 효력이 있어요. 다만 강행규정에 반하는 특약(세입자에게 불리한 대항력 포기 등)은 무효예요." },
  { q: "집주인이 특약을 거부하면 어떻게 하나요?", a: "특약 거부 자체가 계약 의사가 없다는 신호일 수 있어요. 보증금 보호에 필수적인 특약을 거부하는 집주인과는 계약을 재고하는 게 좋아요." },
  { q: "전세보증보험에 집주인이 협조를 안 해요", a: "계약서에 '전세보증보험 가입에 필요한 서류를 제공한다'는 특약을 넣으면 법적 근거가 돼요. 이 특약이 있으면 집주인이 거부하기 어려워요." },
  { q: "보증금 반환 지연이자는 얼마가 적절한가요?", a: "보통 연 5~10%로 정해요. 법정이자율(연 5%)을 기준으로 하되, 합의에 따라 정할 수 있어요." },
  { q: "계약 기간 중 집이 팔리면 보증금은요?", a: "대항력이 있으면 새 집주인에게 보증금 반환을 요구할 수 있어요. 특약에 '매도 시 보증금 승계'를 명시하면 더 안전해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
  { category: "서비스", items: [
    { label: "HUG 전세보증보험", url: "https://www.khug.or.kr" },
    { label: "대법원 인터넷등기소", url: "https://www.iros.go.kr" },
  ]},
];

const RELATED = [
  { slug: "확정일자", title: "확정일자 받는 방법", description: "보증금을 지키려면 확정일자가 필수예요." },
  { slug: "임대차계약서-작성법", title: "임대차계약서 작성법", description: "계약서 작성 시 기본 주의사항이에요." },
  { slug: "전세자금대출-전세보증보험-가입", title: "전세자금대출과 보증보험", description: "전세보증보험 가입 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세계약서에 꼭 넣어야 할 특약은?<br />
        보증금 보호를 위한 필수 특약 8가지
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약서를 쓸 때 특약란을 비워두면 나중에 후회할 수 있어요.
        근저당 해지, 전세보증보험 협조, 보증금 반환 기한 같은 핵심 특약을 넣어야 보증금을 안전하게 지킬 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>보증금 보호 필수 특약 8가지</H2>
      <p style={body}>아래 항목을 계약서 특약란에 기재하면 보증금 사고를 예방할 수 있어요.</p>
      <SectionBadge>전세계약 필수 특약</SectionBadge>
      <Checklist items={MUST_CHECKLIST} />

      <GreenBox title="3대 핵심 특약">
        전세보증보험 가입 협조 (집주인 서류 제공 의무)<br />
        보증금 반환 기한 + 지연이자<br />
        세입자 동의 없이 근저당 추가 금지
      </GreenBox>

      <CategoryButton label="부동산·임대차 정보" count={8} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>특약 작성은 이렇게 해요</H2>
      <p style={body}>등기부등본을 먼저 확인하고, 필요한 특약을 계약서에 직접 쓰면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 주택임대차보호법을 바탕으로 작성됐어요. 특약 내용은 상황에 따라 조정이 필요할 수 있으니 공인중개사와 상의해보세요." />
    </ArticleLayout>
  );
}
