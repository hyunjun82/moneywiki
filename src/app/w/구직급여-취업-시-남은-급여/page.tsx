"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 구직급여 받다가 취업 제안이 왔는데, 남은 급여를 포기해야 하나 아까운 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 조기재취업수당 대상인지 판단하고, 12개월 후 직접 신청하는 것.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 소정급여일수 절반 이상 남아야 함, 12개월 이상 재직 필수, 미지급 구직급여×50% 계산법, 신청 방법과 기한.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(결론 먼저) + BorderBox(계산 예시) + Steps(신청 절차) + EligibilityChecker + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const FAQS = [
  {
    q: "조기재취업수당은 언제 신청하나요?",
    a: "재취업 후 12개월 이상 계속 근무한 뒤에 신청할 수 있어요. 12개월 채우기 전에는 신청 버튼이 활성화되지 않아요.",
  },
  {
    q: "남은 급여가 딱 절반이면 받을 수 있나요?",
    a: "네, 소정급여일수의 '2분의 1 이상' 남아있으면 돼요. 딱 절반도 포함이에요.",
  },
  {
    q: "조기재취업수당도 세금을 내나요?",
    a: "아니요. 비과세 소득이에요. 소득세도 없고 연말정산에도 안 잡혀요.",
  },
  {
    q: "11개월에 퇴사하면 어떻게 되나요?",
    a: "12개월을 채우지 못하면 조기재취업수당을 못 받아요. 다만 비자발적 퇴사라면 다시 실업급여를 신청할 수 있어요.",
  },
  {
    q: "자영업으로 창업해도 받을 수 있나요?",
    a: "네, 영리를 목적으로 사업을 시작하고 12개월 이상 영위하면 조기재취업수당 대상이에요.",
  },
  {
    q: "조기재취업수당 상한액이 있나요?",
    a: "구직급여 일액 상한(2026년 68,100원)을 기준으로 계산한 금액이 상한이에요. 남은 일수가 150일이면 68,100원 × 150일 × 50% = 약 511만원이 최대예요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "고용보험법 제64조 (조기재취업수당)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 조기재취업수당 신청", url: "https://www.ei.go.kr" },
      { label: "정부24 조기재취업수당 청구", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  { slug: "권고사직-실업급여", title: "권고사직 실업급여 조건", description: "권고사직으로 퇴사했을 때 실업급여 받는 방법을 정리했어요." },
  { slug: "실업급여-계산기", title: "실업급여 계산기", description: "나이·근무기간·월급 입력하면 실업급여 금액이 바로 나와요." },
  { slug: "고용보험-이중취득-제한", title: "고용보험 이중취득 제한", description: "두 직장 다니면 고용보험이 어디서 가입되는지 정리했어요." },
];

const APPLY_STEPS = [
  { title: "12개월 재직 확인", desc: "재취업한 회사에서 12개월 이상 계속 근무했는지 확인해요.", tip: "정확히 12개월을 꽉 채운 다음 날부터 신청할 수 있어요." },
  { title: "고용24 접속·로그인", desc: "고용24(ei.go.kr)에 접속해서 공동인증서나 간편인증으로 로그인해요." },
  { title: "조기재취업수당 청구", desc: "'조기재취업수당 신청' 메뉴에서 청구서를 작성해요. 재취업한 회사 정보가 자동으로 나와요." },
  { title: "지급 확인", desc: "신청 후 약 2~3주 이내에 지정 계좌로 입금돼요." },
];

const ELIG_ITEMS = [
  { id: "e1", label: "구직급여 수급 중 취업했다" },
  { id: "e2", label: "소정급여일수의 절반 이상 남은 시점에 취업했다" },
  { id: "e3", label: "재취업 후 12개월 이상 계속 근무했다 (또는 사업을 12개월 이상 영위했다)" },
  { id: "e4", label: "주 15시간 이상 근무하는 정규 고용보험 가입 직장이다" },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 조기재취업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        구직급여 받다가 취업하면?<br />
        조기재취업수당 조건과 금액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 받다가 취업 제안이 왔는데, 아직 구직급여가 많이 남았죠.
        "남은 돈 다 받고 취업할까" 고민되지만, 조기재취업수당이라는 게 있어요.
        남은 급여의 절반을 나중에 한꺼번에 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>조기재취업수당, 남은 구직급여의 절반을 받아요</H2>
      <p style={body}>
        조기재취업수당은 구직급여를 받다가 빨리 재취업한 사람에게 남은 급여의 50%를 일시금으로 주는 제도예요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조</a>에서 규정하고 있어요.
      </p>

      <GreenBox title="핵심 공식">
        조기재취업수당 = 미지급 구직급여 × 50%<br />
        미지급 구직급여 = 남은 일수 × 1일 구직급여액<br /><br />
        · 소정급여일수의 <strong>절반 이상</strong> 남았을 때 취업해야 대상이에요<br />
        · 재취업 후 <strong>12개월 이상</strong> 계속 근무해야 지급돼요<br />
        · 비과세 — 세금 없이 전액 수령
      </GreenBox>

      <Divider />

      <H2>나는 조기재취업수당 대상일까?</H2>
      <p style={body}>
        아래 4가지를 모두 충족하면 조기재취업수당을 받을 수 있어요. 하나라도 빠지면 대상이 아니에요.
      </p>

      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="모두 해당하면 조기재취업수당 대상이에요. 12개월 채운 뒤 고용24에서 신청하세요."
        partialMatchText="체크가 빠진 항목이 있으면 대상이 아닐 수 있어요. 고용센터(☎ 1350)에 확인하세요."
      />

      <Divider />

      <H2>실제 금액은 얼마나 되나요?</H2>
      <p style={body}>
        2026년 기준 구직급여 일액 상한은 68,100원이에요. 남은 일수에 따라 금액이 크게 달라져요.
      </p>

      <SectionBadge>계산 예시</SectionBadge>
      <BorderBox title="예시 1: 남은 일수 100일, 일액 68,100원">
        미지급 구직급여: 68,100원 × 100일 = 681만원<br />
        조기재취업수당: 681만원 × 50% = <strong>약 340만원</strong>
      </BorderBox>

      <BorderBox title="예시 2: 남은 일수 60일, 일액 55,000원">
        미지급 구직급여: 55,000원 × 60일 = 330만원<br />
        조기재취업수당: 330만원 × 50% = <strong>165만원</strong>
      </BorderBox>

      <p style={body}>
        남은 일수가 많을수록 수당도 커져요. 빨리 취업할수록 남은 일수가 많으니 조기재취업수당이 유리해요.
        정확한 구직급여 일액은 <a href="/w/실업급여-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 계산기</a>에서 확인하세요.
      </p>

      <Divider />

      <H2>신청은 12개월 재직 후 이렇게 해요</H2>
      <p style={body}>
        취업한 직후가 아니라 12개월을 채운 뒤에 신청해요. 온라인으로 간단하게 끝나요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        오프라인은 가까운 고용센터에 방문해서 신분증과 통장 사본을 제출하면 돼요.
        취업 후 7일 이내에 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 재취업 신고는 꼭 해두세요. 안 하면 부정수급으로 간주될 수 있어요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성했어요. 개별 상황에 따라 수급 여부가 달라질 수 있으니 고용센터(☎ 1350)에 확인하세요." />
    </ArticleLayout>
  );
}
