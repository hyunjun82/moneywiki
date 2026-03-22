"use client";

// Q1. 혼인 전에 재산 약정(부부재산계약)을 했는데, 이혼 시 효력이 있는지 궁금한 상황
// Q2. 부부재산계약의 법적 효력 요건을 확인하고, 이혼 시 재산분할과의 관계를 파악한다
// Q3. 민법 제829조 부부재산계약, 등기 요건, 재산분할청구권과의 관계, 약정 무효 사유
// Q4. GreenBox(핵심 결론) + BorderBox(효력 요건) + Steps(계약 체결 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "부부재산계약서를 작성하세요", desc: "혼인신고 전에 부부재산계약서를 작성해야 해요. 각자의 재산 목록, 관리 방법, 이혼 시 분배 방식 등을 명시해요. 공증을 받아두면 더 안전해요." },
  { title: "혼인신고 전에 등기하세요", desc: "부부재산계약은 혼인신고 전에 등기해야 제3자에게 대항할 수 있어요. 등기 없이도 당사자 간에는 효력이 있지만, 등기가 있어야 완전해요." },
  { title: "이혼 시 약정 내용을 먼저 확인하세요", desc: "이혼할 때는 약정 내용에 따라 재산을 분배해요. 다만 법원은 약정이 현저히 불공정하면 재산분할 청구를 통해 수정할 수 있어요." },
];

const FAQS = [
  { q: "혼인 전 재산 약정은 언제 해야 하나요?", a: "반드시 혼인신고 전에 해야 해요. 혼인신고 후에는 부부재산계약을 변경할 수 없어요. 민법 제829조 제2항에 명시돼 있어요." },
  { q: "등기를 안 하면 효력이 없나요?", a: "당사자 사이에서는 효력이 있어요. 다만 등기하지 않으면 제3자(채권자 등)에게 대항할 수 없어요. 등기까지 해야 완전한 효력이에요." },
  { q: "약정 내용이 불공정해도 유효한가요?", a: "원칙적으로 유효하지만, 이혼 시 법원이 현저히 불공정하다고 판단하면 재산분할 청구를 통해 수정할 수 있어요. 한쪽에게 지나치게 불리한 약정은 위험해요." },
  { q: "외국에서 맺은 혼전 계약도 유효한가요?", a: "대한민국 법원에서는 한국 민법 기준으로 판단해요. 외국법에 따른 혼전 계약(prenup)이 한국에서 그대로 인정되는 건 아니에요. 국제사법에 따라 검토가 필요해요." },
  { q: "혼인 후에 재산 약정을 바꿀 수 있나요?", a: "민법상 혼인 후에는 부부재산계약을 변경할 수 없어요. 다만 당사자 합의로 별도 약정을 하는 건 가능하지만, 부부재산계약의 법적 보호를 받기 어려워요." },
];

const SOURCES = [
  { name: "민법 제829조", href: "https://www.law.go.kr/법령/민법" },
  { name: "대법원 판례", href: "https://glaw.scourt.go.kr" },
];

const RELATED = [
  { slug: "재산분할-대상-범위", title: "재산분할 대상 범위", description: "이혼 시 분할 대상 재산의 범위." },
  { slug: "이혼-재산분할-협의-불가-대응", title: "재산분할 협의 불가 시 대응", description: "법원 조정·심판 절차." },
  { slug: "재산분할-혼인신고-전-재산-포함", title: "혼전 재산도 분할 대상?", description: "혼인 전 재산의 분할 여부." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>이혼 · 부부재산계약 · 혼전 약정</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        혼인 전 재산 약정, 이혼할 때 효력이 있을까?<br />
        부부재산계약의 요건과 한계
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"혼전에 재산 약정을 했는데, 이혼하면 그대로 적용되나요?"</p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제829조</a>에 따라 혼인신고 전에 부부재산계약을 맺을 수 있어요.
        당사자 간에는 효력이 있지만, <strong>등기</strong>를 해야 완전하고,
        내용이 현저히 불공정하면 법원이 수정할 수 있어요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>부부재산계약, 언제 어떻게 맺나요?</H2>
      <GreenBox title="부부재산계약 핵심">
        {"시기: 혼인신고 전에만 가능 (혼인 후 변경 불가)\n내용: 각자 재산의 귀속, 관리, 이혼 시 분배 방식\n등기: 등기해야 제3자에게 대항 가능\n\n효력:\n· 당사자 간 → 등기 없어도 유효\n· 제3자 대항 → 등기 필요\n· 현저히 불공정 → 법원이 수정 가능"}
      </GreenBox>
      <CategoryButton label="이혼·가족법" count={8} href="/category/이혼" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>효력이 인정되려면 이 조건을 갖춰야 해요</H2>
      <BorderBox>
        <strong>부부재산계약 효력 요건</strong>{"\n"}
        · 혼인신고 전 체결 (혼인 후 체결 = 부부재산계약 아님){"\n"}
        · 서면 작성 (구두 약정은 증명 어려움){"\n"}
        · 등기 (제3자 대항력){"\n"}
        {"\n"}
        효력 제한 사유:{"\n"}
        · 현저히 불공정한 내용 → 재산분할 청구로 수정 가능{"\n"}
        · 강행규정 위반 → 해당 부분 무효{"\n"}
        · 사기·강박에 의한 약정 → 취소 가능
      </BorderBox>
      <Divider />

      <H2>부부재산계약 체결 절차</H2>
      <Steps steps={STEPS} />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 민법 기준으로 작성했어요. 부부재산계약은 사안에 따라 효력이 달라질 수 있으니 법률 상담을 권해요." />
    </ArticleLayout>
  );
}
