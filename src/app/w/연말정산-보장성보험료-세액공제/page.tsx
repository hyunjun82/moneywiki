"use client";
// Q1. 연말정산 시즌에 보장성보험료로 세액공제를 얼마나 받을 수 있는지 궁금한 직장인
// Q2. 내 보험이 공제 대상인지 확인하고, 간소화서비스에서 조회해서 최대한 환급받는다
// Q3. 공제 대상 보험 종류, 공제율 12%와 한도 100만원, 장애인 15% 별도 한도, 제외 보험
// Q4. GreenBox 공제율 요약 + BorderBox 대상/비대상 구분 + Checklist 확인사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "생명보험·상해보험·실손보험 납입 내역 간소화서비스에서 확인",
  "만기환급형 보험은 공제 대상 아님 (순수 보장형만 해당)",
  "장애인 전용 보험은 별도 100만원 한도 + 15% 공제율",
  "부양가족 보험료도 합산 가능 (소득·나이 요건 충족 시)",
  "자동차보험·화재보험·저축성보험은 공제 제외",
  "보험사별 분류가 이상하면 보험사에 직접 문의",
];

const FAQS = [
  { q: "실손보험도 보장성보험에 포함되나요?", a: "네. 실손의료보험은 대표적인 보장성보험이에요. 매월 납부하는 보험료를 연 100만원 한도 내에서 12% 공제받을 수 있어요." },
  { q: "만기환급형 실손보험은 왜 안 되나요?", a: "만기에 보험료를 돌려주는 구조면 저축성으로 분류돼요. 순수 보장형(소멸형)만 공제 대상이에요." },
  { q: "배우자 보험료도 제가 공제받을 수 있나요?", a: "본인이 계약자이고 배우자가 피보험자인 보험이면 가능해요. 단, 배우자가 소득 100만원 이하여야 부양가족 요건을 충족해요." },
  { q: "최대 얼마까지 절세되나요?", a: "일반 보장성보험 100만원 x 12% = 12만원이 최대예요. 장애인 전용 보험이 있으면 100만원 x 15% = 15만원이 추가돼서 총 27만원까지 가능해요." },
  { q: "간소화서비스에 안 뜨는 보험은 어떻게 하나요?", a: "보험사에 연락해서 보장성보험 분류 여부를 확인하고, 납입증명서를 직접 발급받아 회사에 제출하면 돼요." },
  { q: "종신보험은 공제 대상인가요?", a: "사망보장이 주목적인 순수 보장형 종신보험은 공제 대상이에요. 다만 저축 기능이 포함된 변액종신보험은 저축성으로 분류될 수 있어요." },
];

const SOURCES = [
  { name: "소득세법 제59조의4 (특별세액공제)", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 보험료 세액공제", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7874" },
  { name: "홈택스 간소화서비스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-고용보험료", title: "연말정산 고용보험료 소득공제", description: "고용보험료 0.9%도 전액 소득공제 대상이에요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "IRP·연금저축 합산 한도와 절세 전략." },
  { slug: "연말정산-계산기", title: "연말정산 계산기", description: "내 환급액을 바로 계산해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 세액공제 · 보험료</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보장성보험료 세액공제, 어떤 보험이 되나?<br />
        공제율·한도·대상 보험 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 보험료를 내고 있는데, 연말정산에서 얼마나 돌려받을 수 있는지 궁금하시죠?
      </p>
      <p style={body}>
        보장성보험료는 연간 100만원 한도에서 12%를 세액공제로 받아요. 최대 12만원이에요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에서 규정하고 있고, 순수 보장 목적 보험만 해당돼요. 저축성보험이나 만기환급형은 빠져요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공제율과 한도부터 볼게요</H2>
      <p style={body}>
        복잡하게 생각할 것 없이, 딱 두 가지만 기억하면 돼요.
      </p>

      <GreenBox>
        일반 보장성보험료: 연 100만원 한도, 공제율 12% → 최대 12만원 환급{"\n"}
        장애인 전용 보장성보험료: 별도 연 100만원 한도, 공제율 15% → 최대 15만원 환급{"\n"}
        두 가지 합치면: 최대 200만원 납입분, 최대 27만원 절세 가능
      </GreenBox>

      <p style={body}>
        장애인 전용 보험은 가족 중 장애인이 계약자나 피보험자인 경우에 별도로 추가돼요. 일반 보장성보험 한도와 겹치지 않아서, 둘 다 해당되면 최대 200만원까지 공제받는 거예요.
      </p>

      <CategoryButton label="연말정산" count={18} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>공제되는 보험 vs 안 되는 보험</H2>
      <p style={body}>
        같은 보험이라도 유형에 따라 공제 여부가 완전히 달라져요.
      </p>

      <SectionBadge>공제 대상</SectionBadge>
      <BorderBox>
        <strong>공제되는 보험 (순수 보장형)</strong><br />
        실손의료보험, 암보험, 정기보험, 종신보험(순수 보장형), 상해보험, 질병보험{"\n"}
        → 만기에 돌려받는 금액이 없거나 납입 보험료보다 적어야 해요
      </BorderBox>

      <div style={{ height: 12 }} />

      <BorderBox>
        <strong>공제 안 되는 보험</strong><br />
        저축성보험(연금보험, 교육보험), 만기환급형 실손보험, 자동차보험, 화재보험{"\n"}
        회사 단체보험(이미 비과세 혜택을 받는 경우){"\n"}
        → 돈이 돌아오는 구조면 저축으로 보고 공제에서 빠져요
      </BorderBox>

      <p style={body}>
        가장 헷갈리는 게 만기환급형이에요. 같은 실손보험이라도 소멸형은 공제되고, 환급형은 안 돼요. <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>간소화서비스</a>에서 자동으로 분류해주니까 1월에 꼭 확인해보세요.
      </p>

      <Divider />

      <H2>공제 전 이것만 확인하세요</H2>
      <p style={body}>
        놓치기 쉬운 항목을 점검 리스트로 정리했어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>보장성보험 공제, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        매년 반복되는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 공제율과 한도는 세법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
