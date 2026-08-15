// Q1. 장애인 의무고용률을 맞추기 위해 표준사업장 인증을 받으려는 사업주
// Q2. 인증 요건(10명, 30%, 편의시설) 확인 → 지원금(최대 10억) 파악 → 신청 절차 완료
// Q3. 장애인 10명+, 비율 30%+, 편의시설, 최저임금, 무상 10억, 세금 4년 감면
// Q4. EligibilityChecker(요건) + GreenBox(혜택 요약) + Steps(신청절차) + FAQ

"use client";
export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const ELIGIBILITY = [
  { id: "count", label: "장애인 근로자 10명 이상 고용하고 있어요" },
  { id: "ratio", label: "상시 근로자 중 장애인 비율이 30% 이상이에요 (100명 미만 기준)" },
  { id: "severe", label: "중증장애인 고용 비율이 15% 이상이에요 (100명 미만 기준)" },
  { id: "facility", label: "장애인 편의시설을 갖추고 있어요" },
  { id: "wage", label: "장애인 근로자에게 최저임금 이상 지급하고 있어요" },
];

const STEPS_DATA = [
  {
    title: "한국장애인고용공단과 설립 협약",
    desc: "공단 지역본부나 지사에 연락해서 표준사업장 설립 협약을 체결해요. 협약 후 시설 설치 비용의 3/4까지 지원받을 수 있어요.",
    link: { label: "한국장애인고용공단", href: "https://www.kead.or.kr" },
  },
  {
    title: "인증 신청서 및 서류 제출",
    desc: "인증신청서, 전월 임금대장, 장애인근로자 명부를 공단 지역본부에 제출해요. 정부24에서 온라인 신청도 가능해요.",
    link: { label: "정부24 온라인 신청", href: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A05001&CappBizCD=14920000066" },
  },
  {
    title: "현장 실사 및 인증 심사",
    desc: "공단 심사위원이 사업장을 방문해서 편의시설, 근로 환경, 장애인 고용 현황을 확인해요.",
  },
  {
    title: "인증 완료 → 지원금 수령",
    desc: "심사를 통과하면 인증서가 발급돼요. 인증 후 무상 지원금(최대 10억원)과 세금 감면 혜택이 시작돼요.",
  },
];

const FAQS = [
  { q: "표준사업장 인증받으면 부담금을 안 내도 되나요?", a: "자회사형 표준사업장은 부담금 감면을 받아요. 일반 표준사업장도 의무고용률(민간 3.1%)을 충족하면 부담금이 없어요." },
  { q: "지원금은 얼마나 받나요?", a: "무상 지원금 최대 10억원이에요. 지자체·공공기관이 자회사형으로 설립하면 최대 20억원까지 가능해요." },
  { q: "세금 감면은 어떻게 되나요?", a: "최초 소득 발생 후 2년간 법인세·소득세 100% 감면, 그 다음 2년간 50% 감면이에요. 총 4년간 혜택을 받아요." },
  { q: "인증이 취소되면 지원금을 돌려줘야 하나요?", a: "인증 후 3년 이내에 정당한 사유 없이 요건을 충족하지 못하면 지원금 환수 대상이 될 수 있어요." },
  { q: "300명 이상 대기업도 표준사업장이 될 수 있나요?", a: "네, 가능해요. 규모에 따라 장애인 비율 기준이 달라져요. 300명 이상은 5% + 20명 이상 고용이 기준이에요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국장애인고용공단 표준사업장 제도", url: "https://www.kead.or.kr/spdsysdesc/cntntsPage.do?menuId=MENU0694" },
      { label: "장애인고용촉진 및 직업재활법", url: "https://www.law.go.kr/법령/장애인고용촉진및직업재활법" },
      { label: "정부24 인증 신청", url: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A05001&CappBizCD=14920000066" },
    ],
  },
];

const RELATED = [
  { slug: "장애인-의무고용-100명-기준-비율", title: "장애인 의무고용 비율", description: "100명 이상 사업장의 의무고용 기준이에요." },
  { slug: "장애인고용부담금-감면-계산", title: "장애인고용부담금 계산", description: "부담금 금액과 감면 기준을 정리했어요." },
  { slug: "장애인근로자-보조공학기기-무상지원", title: "보조공학기기 무상지원", description: "장애인 근로자를 위한 보조기기 지원이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 장애인 고용 · 사업장</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 표준사업장 인증, 어떤 요건이 필요할까?<br />
        지원금과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        장애인 의무고용률 때문에 고민하고 있다면 표준사업장 인증을 검토해 보세요.
        장애인 10명 이상 고용하고 편의시설을 갖추면{" "}
        <a href="https://www.kead.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장애인고용공단</a>에서 인증해주고,{" "}
        최대 <strong>10억원 무상 지원금</strong>과 <strong>4년간 세금 감면</strong> 혜택을 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>인증 요건 체크리스트</H2>
      <p style={body}>
        아래 조건을 모두 충족하면 표준사업장 인증을 신청할 수 있어요. 100명 미만 기준이고, 규모가 크면 비율 기준이 달라져요.
      </p>

      <SectionBadge>인증 요건 (100명 미만 기준)</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="표준사업장 인증 요건을 충족해요. 아래 절차를 따라 신청하세요."
        partialMatchText="일부 요건이 맞지 않아요. 미충족 항목을 확인해 보세요."
      />

      <Divider />

      <H2>인증받으면 어떤 혜택이 있나요?</H2>
      <p style={body}>
        표준사업장 인증의 가장 큰 장점은 무상 지원금과 세금 감면이에요. 공공기관 우선구매 대상이 되는 것도 사업에 도움이 돼요.
      </p>

      <GreenBox title="주요 혜택">
        무상 지원금: 최대 10억원 (자회사형은 20억원)<br />
        세금 감면: 법인세·소득세 2년 100% + 2년 50%<br />
        공공기관 우선구매: 총 구매액의 0.8% 이상<br />
        장애인고용부담금 면제 (의무고용률 충족 시)
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청 절차</H2>
      <p style={body}>
        공단과 설립 협약을 먼저 체결하면 시설 비용 지원부터 받을 수 있어요. 이미 요건을 갖춘 사업장이라면 바로 인증 신청도 가능해요.
      </p>

      <Steps steps={STEPS_DATA} />

      <BorderBox>
        2026년 기준 민간 의무고용률은 3.1%, 공공기관은 3.8%예요.
        표준사업장은 이 비율을 훨씬 초과 달성하므로{" "}
        <a href="/w/장애인고용부담금-감면-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인고용부담금</a>을 낼 필요가 없어요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 장애인 표준사업장 인증 안내예요. 지원금 규모와 인증 기준은 정책 변경에 따라 달라질 수 있으니 한국장애인고용공단에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
