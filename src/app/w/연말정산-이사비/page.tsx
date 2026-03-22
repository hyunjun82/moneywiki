"use client";

// Q1. 회사 전근으로 이사비를 받았는데 세금을 내야 하는지 궁금한 직장인
// Q2. 이사비가 비과세인지 과세인지 판단하고, 비과세를 받기 위해 영수증을 챙기는 행동
// Q3. 실비변상 vs 정액 지급 차이, 비과세 조건(전근·실비·증빙), 한도 초과 시 과세, 증빙서류
// Q4. GreenBox(비과세 핵심 조건) + Checklist(증빙 체크리스트) + BorderBox(과세 케이스) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Checklist } from "@/components/article-ui/Checklist";

const EVIDENCE_ITEMS = [
  "이사업체 세금계산서 또는 영수증",
  "운송비 영수증 (포장·이동·설치)",
  "회사 전근·발령 통지서 사본",
  "이사비 지급 관련 사내 규정 확인",
];

const FAQS = [
  { q: "회사에서 이사비를 정액 100만원 줬는데 세금 내야 하나요?", a: "정액 지급은 실비변상이 아니라 급여로 간주돼요. 실제 이사비 영수증 없이 받았다면 과세 대상이에요." },
  { q: "전근 없이 개인 사정으로 이사하면요?", a: "비과세 대상이 아니에요. 회사 발령·전근으로 불가피하게 이사하는 경우에만 비과세가 적용돼요." },
  { q: "비과세 한도가 정해져 있나요?", a: "명확한 금액 한도는 없지만, 통상적인 이사 비용 수준이어야 해요. 합리적 범위를 크게 벗어나면 국세청이 과세할 수 있어요." },
  { q: "실비 중 일부만 영수증이 있으면요?", a: "영수증이 있는 금액만 비과세로 인정돼요. 나머지는 과세될 수 있으니 모든 영수증을 빠짐없이 챙기세요." },
  { q: "이사비가 연말정산 간소화 서비스에 나오나요?", a: "안 나와요. 이사비 비과세 여부는 회사 경리팀에서 처리하는 사항이에요. 영수증은 회사에 제출하세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 시행령(법제처)", url: "https://www.law.go.kr/법령/소득세법시행령" },
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 절세 방법을 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 비과세 · 이사비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 이사비, 비과세 받으려면?<br />
        실비변상 조건과 증빙
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사 전근 때문에 이사비를 받았는데, 이것도 세금을 내야 하나요?
        실비변상(실제 비용만큼 받은 것)이면 비과세예요.
        <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령</a>에서 업무 수행에 필요한 실비변상적 급여는 비과세로 정하고 있어요.
        다만 정액 지급이거나 합리적 범위를 넘으면 과세 대상이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>비과세 되는 조건이 뭔가요?</H2>
      <p style={body}>
        이사비가 비과세로 인정받으려면 세 가지 조건을 모두 충족해야 해요.
        하나라도 빠지면 급여(과세)로 처리돼요.
      </p>

      <GreenBox title="이사비 비과세 3가지 조건">
        · <strong>회사 발령·전근</strong>으로 인한 이사여야 해요 (개인 사정 이사는 안 돼요)<br />
        · <strong>실제 이사 비용</strong>만큼만 받아야 해요 (영수증 증빙 필수)<br />
        · <strong>합리적 수준</strong>이어야 해요 (통상 이사비를 크게 초과하면 안 돼요)
      </GreenBox>

      <Divider />

      <H2>정액 지급이면 과세예요</H2>
      <p style={body}>
        회사에서 "이사비 명목으로 100만원" 이렇게 정액을 주면 실비변상이 아니에요.
        실제 이사에 얼마를 썼든 상관없이 급여로 간주돼서 과세 대상이 돼요.
      </p>

      <BorderBox>
        합리적 범위를 넘는 이사비도 마찬가지예요.
        통상적인 이사비가 150만원 수준인데 500만원을 받았다면 초과분은 급여로 볼 수 있어요.
        명확한 금액 한도가 법에 정해진 건 아니지만, <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>이 사후 검증할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>영수증을 꼭 챙기세요</H2>
      <p style={body}>
        비과세로 인정받으려면 증빙이 핵심이에요.
        이사업체, 운송업체, 설치업체에서 받은 영수증을 모두 보관하고 회사에 제출하세요.
      </p>

      <SectionBadge>증빙 체크리스트</SectionBadge>
      <Checklist items={EVIDENCE_ITEMS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles articles={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법 시행령 및 국세청 공개 자료를 바탕으로 작성했어요. 개별 비과세 적용 여부는 회사 경리팀이나 세무사에게 확인하세요." />
    </ArticleLayout>
  );
}
