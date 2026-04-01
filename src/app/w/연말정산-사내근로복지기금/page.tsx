"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     복지기금에서 학자금/의료비를 받았는데 연말정산 때 세금을 내야 하는지 확인하려는 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     복지기금 지급인지 회사 직접 지급인지 구분해서 비과세 여부를 판단한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     복지기금 지급=비과세, 회사 직접 지급=과세, 복지포인트=과세, 비과세 항목 목록
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox(결론) + BorderBox(비교표) + Checklist(확인 포인트) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "내가 받은 혜택이 '사내근로복지기금'에서 나온 건지 확인",
  "급여명세서에 포함됐는지 확인 (포함되면 과세 가능성)",
  "복지포인트(선택적 복지)와 복지기금 구분",
  "복지기금 수혜 확인서 또는 지원 내역 보관",
  "회사에 사내근로복지기금 설립 여부 확인",
];

const FAQS = [
  {
    q: "학자금을 회사에서 받으면 과세인데, 복지기금에서 받으면 비과세라고요?",
    a: "맞아요. 같은 학자금 100만원이라도 지급 주체가 달라요. 회사가 직접 지급하면 근로소득으로 과세되고, 사내근로복지기금을 통해 지급하면 비과세예요.",
  },
  {
    q: "복지포인트(선택적 복지)도 비과세인가요?",
    a: "아니에요. 복지포인트는 사내근로복지기금이 아니라 회사 급여의 일종이에요. 과세 대상이에요. 카페테리아 복지, 선택적 복지 포인트 모두 과세예요.",
  },
  {
    q: "연말정산 때 따로 신고해야 하나요?",
    a: "비과세라서 신고할 필요가 없어요. 이미 과세 대상이 아니니까 연말정산 서류에 잡히지 않아요. 별도로 신청할 것도 없어요.",
  },
  {
    q: "어떤 지원이 비과세 대상인가요?",
    a: "학자금, 의료비, 주거자금, 재난구호금, 경조금, 생활안정자금 등이 비과세예요. 근로복지기본법에 따라 기금 정관에서 정한 복지사업이면 해당돼요.",
  },
  {
    q: "모든 회사에 사내근로복지기금이 있나요?",
    a: "아니에요. 기금을 설립한 회사만 해당돼요. 기업 이익의 일부를 별도 기금으로 출연하고 노사가 공동 운영하는 구조라서, 중소기업에는 없는 경우가 많아요.",
  },
];

const SOURCES = [
  { name: "근로복지기본법 제88조", href: "https://www.law.go.kr/법령/근로복지기본법" },
  { name: "국세청 비과세 근로소득 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-비과세-소득", title: "연말정산 비과세 소득", description: "비과세 항목 전체 목록과 조건." },
  { slug: "연말정산", title: "연말정산 공제 항목", description: "소득공제·세액공제 전체 정리." },
  { slug: "연말정산-근로소득-범위", title: "연말정산 근로소득 범위", description: "과세 대상 근로소득과 비과세 구분." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 사내근로복지기금, 세금을 내야 할까?<br />
        비과세 기준과 확인 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        복지기금에서 학자금을 받았는데 세금 내야 하는지 궁금하시죠?
      </p>
      <p style={body}>
        사내근로복지기금에서 받은 지원금은 비과세예요. <a href="https://www.law.go.kr/법령/근로복지기본법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지기본법</a>에 따라 설립된 기금에서 지급하는 복지 혜택은 근로소득으로 보지 않아요. 다만 회사가 직접 지급하는 복지 혜택은 과세 대상이에요. 같은 학자금 100만원이라도 지급 주체에 따라 세금이 달라지니 꼭 구분해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>복지기금 지급 vs 회사 직접 지급, 뭐가 다를까?</H2>
      <p style={body}>
        핵심은 &quot;누가 주느냐&quot;예요. 복지기금이 주면 비과세, 회사가 주면 과세예요.
      </p>

      <GreenBox>
        사내근로복지기금 지급 → 비과세 (소득세 0원, 4대보험료도 0원){"\n"}
        회사 직접 지급 → 과세 (근로소득에 포함){"\n"}
        복지포인트(선택적 복지) → 과세 (회사 급여로 봄)
      </GreenBox>

      <p style={body}>
        사내근로복지기금은 기업이 이익의 일부를 별도 기금으로 출연하고, 노사가 공동 운영하는 법정 기금이에요. 근로의 대가가 아니라 복지 목적으로 지급하는 거라서 소득세가 붙지 않아요.
      </p>

      <CategoryButton label="연말정산 정보" count={15} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>비과세 대상 항목, 뭐가 해당될까?</H2>
      <p style={body}>
        기금 정관에서 정한 복지사업이면 비과세예요.
      </p>

      <BorderBox>
        <strong>비과세 항목 (복지기금 지급 시)</strong><br /><br />
        학자금 지원 (본인·자녀){"\n"}
        의료비 지원{"\n"}
        주거자금 지원 (전세자금 등){"\n"}
        재난구호금{"\n"}
        경조금 (결혼, 사망 등){"\n"}
        생활안정자금{"\n"}<br />
        <strong>과세 항목 (비과세 아님)</strong><br /><br />
        복지포인트 (카페테리아·선택적 복지){"\n"}
        회사가 직접 지급하는 학자금·의료비{"\n"}
        성과급, 명절 상여금
      </BorderBox>

      <Divider />

      <H2>내 혜택이 비과세인지 확인하는 법</H2>
      <p style={body}>
        아래 체크리스트로 확인해보세요.
      </p>

      <SectionBadge>확인 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        복지기금 수혜 내역은 급여명세서에 나오지 않아요. 별도의 복지기금 수혜 확인서나 복지 포털 지원 이력에서 확인할 수 있어요. <a href="/w/연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산</a> 때도 신청할 게 없어요. 이미 비과세니까요.
      </p>

      <Divider />

      <H2>복지기금 비과세, 이런 점이 궁금하죠</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 사내근로복지기금 설립 여부와 비과세 항목은 회사마다 다르니 인사팀에 직접 확인하세요." />
    </ArticleLayout>
  );
}
