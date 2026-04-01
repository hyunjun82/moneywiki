"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 주택 임대차 계약 소유자 대리인 배우자 체결 가능 여부 info
// Q2: 첫째: 배우자도 명시적 위임 없이는 대리권 없음
// Q3: 첫째: 배우자도 명시적 위임 없이는 대리권 없음, 둘째: 위임장, 인감증명서, 신분증 필수 확인, 셋째: 소유자와 직접 통화로 대리권 확인
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "첫째: 배우자도 명시적 위임 없이는 대리권 없음", desc: "첫째: 배우자도 명시적 위임 없이는 대리권 없음" },
  { title: "둘째: 위임장, 인감증명서, 신분증 필수 확인", desc: "둘째: 위임장, 인감증명서, 신분증 필수 확인" },
  { title: "셋째: 소유자와 직접 통화로 대리권 확인", desc: "셋째: 소유자와 직접 통화로 대리권 확인" },
];
const CHECKLIST = [
  "첫째: 배우자도 명시적 위임 없이는 대리권 없음",
  "둘째: 위임장, 인감증명서, 신분증 필수 확인",
  "셋째: 소유자와 직접 통화로 대리권 확인"
];

const FAQS = [
  { q: "집주인 부인과 계약해도 안전한가요?", a: "아니요. 부인이더라도 정식 위임장과 인감증명서가 없으면 계약이 무효가 될 수 있어요. 반드시 위임장, 인감증명서, 신분증을 확인하고 집주인과 직접 통화해서 대리권을 확인하세요." },
  { q: "대리인 계약 시 위임장에 뭐가 있어야 하나요?", a: "부동산 소재지, 소유자 이름·연락처, 대리인 이름·주소·주민등록번호, 계약의 모든 사항 위임 취지, 날짜, 위임인(소유자) 인감 날인이 있어야 해요. 이 인감이 인감증명서와 일치해야 법적 효력이 있어요." },
  { q: "위임장만 있으면 되나요?", a: "아니요. 위임장, 인감증명서, 대리인 신분증 3가지 모두 확인해야 해요. 추가로 소유자와 직접 통화하면서 대리권 수여를 확인하고 녹음하거나 확인서를 받으면 더 안전해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "찾기쉬운 생활법령정보", url: "https://easylaw.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택 임대차 계약 소유자 대리인 배우자 체결 가능 여부
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집주인이 바빠서 부인이랑 계약하라는데 괜찮을까요? 대리인과 임대차 계약 체결 시 꼭 확인해야 할 위임장, 인감증명서, 대리권 증명 방법이에요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>첫째: 배우자도 명시적 위임 없이는 대리권 없음</H2>
      <p style={body}>첫째: 배우자도 명시적 위임 없이는 대리권 없음</p>
      <GreenBox title="핵심 정리">
        첫째: 배우자도 명시적 위임 없이는 대리권 없음<br />
        둘째: 위임장, 인감증명서, 신분증 필수 확인<br />
        셋째: 소유자와 직접 통화로 대리권 확인
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>둘째: 위임장, 인감증명서, 신분증 필수 확인</H2>
      <p style={body}>둘째: 위임장, 인감증명서, 신분증 필수 확인</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
