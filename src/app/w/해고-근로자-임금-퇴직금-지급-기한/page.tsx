"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "해고를 당했거나 해고 통보를 받았어요" },
  { id: "c2", label: "밀린 임금이나 퇴직금이 있어요" },
  { id: "c3", label: "해고 후 14일이 지났는데 아직 입금이 안 됐어요" },
  { id: "c4", label: "퇴직 후 아직 3년이 지나지 않았어요" },
];

const FAQS = [
  {
    q: "해고 당일 임금과 퇴직금을 바로 받을 수 있나요?",
    a: "즉시 지급을 요청할 수는 있지만, 법적 기한은 퇴직일로부터 14일이에요. 회사는 14일 안에 지급하면 법을 지킨 거죠.",
  },
  {
    q: "즉시 해고(당일 해고)라도 14일 기한이 적용되나요?",
    a: "네, 동일하게 적용돼요. 해고 통보일이 곧 퇴직일이 되고, 그날부터 14일 카운트가 시작되죠.",
  },
  {
    q: "임금과 퇴직금 지급 기한이 같은가요?",
    a: "네, 동일해요. 근로기준법 제36조는 '임금, 보상금, 그 밖의 금품'을 14일 이내에 지급하라고 규정하고 있어서, 밀린 임금과 퇴직금 모두 같은 기한이 적용되죠.",
  },
  {
    q: "14일이 지나면 지연이자가 자동으로 붙나요?",
    a: "네, 14일이 지나면 미지급 금액에 대해 연 20% 지연이자가 자동으로 발생해요. 다만 실제로 받으려면 회사에 청구해야 하죠.",
  },
  {
    q: "해고예고수당도 14일 이내에 받아야 하나요?",
    a: "해고예고수당은 해고 시점에 지급해야 해요. 퇴직금과 별도이니, 해고 당일 또는 해고 통보 시점에 즉시 지급을 요청하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제26조 — 해고의 예고", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 해고 관련 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-해고",
    title: "해고 시 퇴직금 받는 방법",
    description: "해고 사유와 관계없이 퇴직금을 받을 수 있는지 정리했어요.",
  },
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 14일 원칙",
    description: "퇴직금 지급 기한과 위반 시 대응 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20%",
    description: "14일이 넘으면 연 20% 지연이자가 붙어요. 청구 방법을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="해고-근로자-임금-퇴직금-지급-기한"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 해고 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해고 근로자 임금·퇴직금 지급 기한,<br />
        언제까지인가요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해고를 당하면 밀린 임금과 퇴직금을 언제까지 받을 수 있는지 궁금하죠.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 퇴직일로부터 <strong>14일 이내</strong>에 임금, 보상금, 퇴직금 등 모든 금품을 청산하도록 규정하고 있어요.
        해고든 자발적 퇴사든 기한은 동일하죠.
        14일이 넘으면 연 20% 지연이자가 붙기 시작해요.
        기한 적용 기준, 지연 시 대응법, 빠르게 받는 방법까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>해고 시 임금과 퇴직금 지급 기한이 같은가요?</H2>
      <p style={body}>
        네, 같아요. 근로기준법 제36조는 &ldquo;사용자는 근로자가 사망 또는 퇴직한 경우에 그 지급 사유가 발생한 때부터 14일 이내에 임금, 보상금, 그 밖에 일체의 금품을 지급하여야 한다&rdquo;고 규정하고 있죠. 여기서 &ldquo;일체의 금품&rdquo;에 밀린 임금, 퇴직금, 해고예고수당이 모두 포함돼요.
      </p>
      <p style={body}>
        해고 사유가 무엇이든 14일 기한은 변하지 않아요. 징계 해고, 경영상 해고, 권고사직 등 어떤 형태든 동일하게 적용되죠. 회사가 &ldquo;해고라서 퇴직금 정산이 늦어진다&rdquo;고 하더라도 법적 기한은 14일이에요.
      </p>
      <p style={body}>
        기한 연장은 당사자 합의가 있어야만 가능해요. 서면 합의 없이 일방적으로 늦추는 건 법 위반이죠. 합의를 하더라도 기한과 조건을 명확히 적은 서면을 남겨둬야 해요.
      </p>

      <GreenBox title="해고 시 금품 청산 기한">
        - 밀린 임금: 퇴직일로부터 <strong>14일 이내</strong><br />
        - 퇴직금: 퇴직일로부터 <strong>14일 이내</strong><br />
        - 해고예고수당: <strong>해고 시점에 즉시</strong><br />
        - 14일 초과 시: <strong>연 20% 지연이자</strong> 발생
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 지연이자를 포함해서 임금과 퇴직금을 청구하세요."
        partialMatchText="일부만 해당돼요. 14일 기한과 지연이자를 확인한 뒤 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      <H2>즉시 해고 시 기한이 달라지나요?</H2>
      <p style={body}>
        달라지지 않아요. 즉시 해고(당일 해고)라도 해고 통보일이 곧 퇴직일이 되고, 그날부터 14일 카운트가 시작되죠. 30일 전 해고 예고를 하지 않은 경우에는 해고예고수당(30일분 통상임금)을 별도로 지급해야 해요.
      </p>
      <p style={body}>
        즉시 해고가 되면 <a href="/w/퇴직금-해고" style={{ color: "#1D9E75", textDecoration: "underline" }}>해고 퇴직금</a>뿐 아니라 밀린 야근수당, 연차수당, 해고예고수당 등을 한꺼번에 정산받아야 해요. 14일 이내에 전부 지급하는 게 원칙이니까, 퇴직 당일에 정산 항목 목록을 회사에 요청하세요.
      </p>
      <p style={body}>
        회사가 &ldquo;갑작스러운 해고라 정산에 시간이 필요하다&rdquo;고 하더라도 법적 기한은 변하지 않아요. 합의 없이 14일을 넘기면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 자동으로 발생하죠.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>기한 초과 시 지연이자가 붙나요?</H2>
      <p style={body}>
        네, 붙어요. 14일이 지난 시점부터 미지급 금액에 대해 <strong>연 20%</strong>의 지연이자가 발생해요. 근로기준법 시행령에서 정한 이율이죠. 이자는 미지급 전체 금액(임금 + 퇴직금)에 대해 산정돼요.
      </p>
      <p style={body}>
        예를 들어 퇴직금 500만 원이 30일 늦게 지급됐다면, 지연이자는 500만 원 x 20% x (16일/365일) = 약 4만 4천 원이에요. 금액이 크고 지연 기간이 길수록 이자가 상당해지죠.
      </p>
      <p style={body}>
        지연이자는 자동으로 발생하지만, 실제로 받으려면 회사에 청구해야 해요. 내용증명으로 &ldquo;퇴직금 + 지연이자&rdquo;를 청구하는 게 효과적이죠. 회사가 이자 지급을 거부하면 고용노동부에 진정을 넣으면 돼요.
      </p>

      <Divider />

      <H2>기한 위반 신고 방법은?</H2>
      <p style={body}>
        관할 고용노동지청에 &ldquo;임금·퇴직금 미지급 진정&rdquo;을 넣으면 돼요. 온라인(고용노동부 민원마당)이나 방문 접수 모두 가능하죠. 접수 시 해고 통보서, 급여명세서, 퇴직금 미지급 증빙을 함께 제출하세요.
      </p>
      <p style={body}>
        접수 후 근로감독관이 사업주를 조사하는데 보통 2~4주 걸려요. 미지급이 확인되면 시정 명령이 내려지고, 사업주가 이행하지 않으면 형사 처벌(3년 이하 징역 또는 3천만 원 이하 벌금)까지 가능하죠.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 지급 기한</a> 위반은 형사 처벌 대상이라 사업주에게 상당한 압박이 돼요. 진정만 넣어도 대부분 해결되는 이유이죠. 소멸시효 3년 이내에 움직이세요.
      </p>

      <Divider />

      <H2>빠르게 받기 위한 방법은?</H2>
      <p style={body}>
        가장 빠른 방법은 퇴직 즉시 회사에 서면으로 임금·퇴직금 지급을 요청하는 거예요. 구두 요청보다 내용증명이 효과적이죠. 내용증명은 법적 조치를 예고하는 의미가 있어서 회사가 빠르게 움직이게 만들어요.
      </p>
      <p style={body}>
        14일이 지나도 안 들어오면 바로 고용노동부에 진정을 넣으세요. 진정 접수 자체가 사업주에게 통보되니까 압박 효과가 크죠. 동시에 지연이자도 청구하면 사업주가 빨리 해결하려는 유인이 생겨요.
      </p>
      <p style={body}>
        해고와 동시에 증빙 자료를 확보해두는 게 핵심이에요. 해고 통보서(문자·이메일 포함), 급여명세서, 근로계약서, 계좌 이체 내역 등을 퇴직 전에 복사해두세요. 나중에 회사가 자료를 안 주면 곤란해지거든요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        해고 근로자 임금·퇴직금 지급 기한에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
