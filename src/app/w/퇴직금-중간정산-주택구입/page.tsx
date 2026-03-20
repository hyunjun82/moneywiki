"use client";

// Q1. 주택 매매계약서는 썼는데 잔금이 부족해서 퇴직금을 미리 당겨 쓸 수 있는지 모르는 무주택 직장인이 검색함
// Q2. 무주택 요건을 확인하고, 서류를 준비해서, 인사팀에 중간정산을 신청함
// Q3. 무주택 범위(세대원 포함 여부), 필요 서류 목록, 잔금일 역산 일정, 근속기간 리셋 주의사항, IRP 300만원 기준
// Q4. GreenBox(조건 요약) + EligibilityChecker(내 상황 체크) + Calculator(예상 금액) + DocTable(서류) + Steps(절차) + Checklist(주의) + FAQ
//
// MAP:
// - Q1 → 서론 톤: 잔금 기한 촉박한 상황 공감
// - Q2 → H2 순서: 조건 → 금액 → 서류 → 절차 → 주의사항 → FAQ
// - Q3 → H2 개수/깊이: 세대원 범위, 서류 한 세트, 근속기간 리셋, IRP 기준 각 섹션에 반영
// - Q4 → GreenBox + EligibilityChecker + Calculator + DocTable + Steps + Checklist + FAQ 배치

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현재 본인 명의로 주택이 없죠 (무주택자)" },
  { id: "c2", label: "세대원(배우자·가족) 명의로도 주택이 없고요" },
  { id: "c3", label: "주택 매매계약서 또는 분양계약서를 체결했죠" },
  { id: "c4", label: "현재 재직 중이죠 (퇴직 전)" },
  { id: "c5", label: "같은 회사에서 1년 이상 근무했죠" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여 (만원)", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "현재까지 근속 기간 (년)", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 예상 금액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직소득세 (근속연수 공제 후 추정)",
    getValue: (v: Record<string, number>) => {
      const total = v.salary * 10000 * v.years;
      const deduct = Math.min(v.years * 1000000, total);
      return Math.round(Math.max(0, total - deduct) * 0.06);
    },
    format: (v: number) => v === 0 ? "공제 후 세금 없음 (추정)" : `약 ${Math.round(v / 10000).toLocaleString()}만원 (추정)`,
  },
];

const DOCS = [
  { name: "주택 매매계약서 또는 분양계약서 사본", required: true, where: "부동산 계약 시 수령" },
  { name: "무주택 확인서 (주민등록등본)", required: true, where: "정부24 무료 발급" },
  { name: "퇴직금 중간정산 신청서", required: true, where: "회사 인사팀 제공 양식" },
  { name: "임대차계약서 사본 (전세 자금 부족 사유인 경우)", required: false, where: "계약 시 수령" },
  { name: "금융기관 대출 확인서 (주택담보대출 이용 시)", required: false, where: "은행 발급" },
];

const STEPS = [
  {
    title: "무주택 요건 확인",
    desc: "신청일 기준으로 본인과 세대원 명의로 주택이 없어야 해요. 주민등록등본과 부동산 등기부 열람으로 증빙할 수 있죠. 세대원 중 한 명이라도 주택을 가지고 있으면 이 사유로는 중간정산이 불가능하고요.",
    tip: "주민등록등본은 정부24(gov.kr)에서 무료 발급 가능해요",
  },
  {
    title: "주택 계약서 준비",
    desc: "주택 매매계약서, 분양계약서, 또는 임대차계약서 사본을 준비해요. 계약서에 본인이 매수인(또는 임차인)으로 기재돼 있어야 하고요. 잔금일보다 충분히 앞서 신청해야 처리 기간을 맞출 수 있죠.",
    tip: "잔금일 기준 최소 2~3주 전에 신청을 시작하는 게 안전해요",
  },
  {
    title: "인사팀에 신청서 및 서류 제출",
    desc: "중간정산 신청서, 주택 계약서 사본, 주민등록등본을 한 세트로 인사팀에 제출해요. 근로자퇴직급여보장법 시행령 제3조에 따른 법정 사유이므로 회사가 정당한 이유 없이 거부하면 위법이에요. 서류를 한꺼번에 제출하면 반려 없이 처리가 빨라지고요.",
    tip: "서류를 한 세트로 묶어서 제출하면 처리 속도가 빨라져요",
  },
  {
    title: "퇴직소득세 원천징수 후 수령",
    desc: "승인되면 퇴직소득세를 원천징수한 뒤 수령해요. 300만원 초과 시 IRP 계좌로 먼저 입금된 다음 인출해야 하고요. 중간정산 이후 근속기간은 0년으로 초기화되고 다시 퇴직금이 쌓이기 시작해요.",
    tip: "IRP 계좌를 미리 개설해두면 수령 지연을 막을 수 있죠",
  },
];

const CHECKLIST = [
  "무주택 확인: 본인·세대원 명의 주택 없음 (등본으로 증빙)",
  "주택 계약서: 매매·분양·임대차계약서 사본 준비",
  "신청서 제출: 잔금일 최소 2~3주 전 인사팀 접수",
  "IRP 계좌: 300만원 초과 수령 시 사전 개설 필요",
  "근속기간 리셋: 중간정산 후 퇴직금 0년으로 재시작됨",
  "원천징수영수증 보관: 나중에 최종 퇴직금 계산 때 필요",
];

const FAQS = [
  {
    q: "전세 보증금이 부족한 경우에도 주택 구입 중간정산이 되나요?",
    a: "전세 계약도 신청 가능해요. 근로자퇴직급여보장법 시행령 제3조에 따르면 '무주택 근로자가 주거 목적으로 전세금을 부담하는 경우'도 중간정산 허용 사유에 해당하죠. 임대차계약서와 무주택 확인서를 함께 제출하면 돼요.",
  },
  {
    q: "배우자 명의로 주택이 있으면 신청이 안 되나요?",
    a: "그렇죠. 고용노동부 해석에 따르면 배우자를 포함한 세대원 명의 주택도 무주택 요건을 충족하지 못해요. 본인과 세대원 모두 주택이 없어야 주택 구입 중간정산 사유로 인정되고요.",
  },
  {
    q: "중간정산 금액에 세금이 얼마나 부과되나요?",
    a: "퇴직소득세는 중간정산 금액에 근속연수 공제를 적용한 뒤 계산해요. 근속기간이 길수록 공제액이 커져서 세율이 낮아지죠. 중간정산 세금 계산에 관한 자세한 내용은 <a href='/w/퇴직금-중간정산-세금' style='color:#1D9E75;text-decoration:underline'>중간정산 세금 글</a>에서 볼 수 있죠.",
  },
  {
    q: "중간정산 후 계속 다니면 퇴직금이 다시 쌓이나요?",
    a: "그렇죠. 중간정산일 다음 날부터 근속기간이 0년으로 리셋되고 퇴직금이 다시 쌓이기 시작해요. 최종 퇴직 때는 중간정산 이후 기간에 해당하는 퇴직금만 받을 수 있고요.",
  },
  {
    q: "회사가 중간정산을 거부하면 어떻게 하나요?",
    a: "법정 허용 사유가 명확하다면 거부할 수 없어요. 거부 시 고용노동부(1350)에 진정을 제기할 수 있죠. 거부 사유를 서면으로 요청하고, 이유가 불명확하면 지방고용노동청에 신고하면 돼요.",
  },
  {
    q: "300만원 이하 금액도 IRP로 받아야 하나요?",
    a: "300만원 이하는 IRP 의무 수령 예외예요. 본인 통장으로 직접 받을 수 있죠. 300만원 초과분은 IRP 계좌로 먼저 받은 뒤 인출해야 하고요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 중간정산 안내", url: "https://www.moel.go.kr" },
      { label: "정부24: 주민등록등본 발급", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산-조건", title: "퇴직금 중간정산 조건 전체", description: "법정 허용 사유 5가지와 신청 기준." },
  { slug: "퇴직금-중간정산-사유별-증빙서류", title: "중간정산 사유별 증빙서류", description: "사유마다 필요한 서류 목록 정리." },
  { slug: "퇴직금-중간정산-세금", title: "중간정산 세금 얼마나 나오나요", description: "퇴직소득세 원천징수 계산법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-중간정산-주택구입" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 주택구입</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        집 살 때 퇴직금 미리 받을 수 있나요?<br />
        무주택 조건·필요 서류·신청 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주택 잔금일이 다가오는데 자금이 부족하다면 퇴직금을 당겨 쓸 수 있는지 궁금하죠?{" "}
        <a href="/w/퇴직금-중간정산-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 시행령 제3조</a>에 따르면,
        무주택 근로자가 주택을 구입하거나 전세 자금이 부족할 때는 퇴직금 중간정산이 법적으로 허용돼요.
        무주택 조건부터 서류 준비, 신청 절차까지 이 글 하나로 끝낼 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>주택 구입 중간정산, 어떤 조건이어야 하나요?</H2>
      <p style={body}>
        가장 먼저 짚어야 할 건 무주택 여부예요.
        신청일 기준으로 본인과 세대원(배우자·직계가족) 명의로 주택이 하나도 없어야 하죠.
        전세로 살고 있어도 무주택자에 해당하고, 이 경우 전세 보증금 마련 목적으로도 신청할 수 있죠.
      </p>
      <p style={body}>
        주택을 구입하는 경우라면 매매계약서가, 전세를 들어가는 경우라면 임대차계약서가 필요해요.
        계약서에 본인이 매수인 또는 임차인으로 기재돼 있어야 하고, 재직 중인 상태에서 신청해야 하죠.
        퇴직한 뒤에는 중간정산이 아닌 퇴직금 지급 절차로 진행돼요.
      </p>

      <GreenBox>
        본인·세대원 명의 주택 없음 (무주택자)<br />
        주택 매매계약서 또는 임대차계약서 보유<br />
        계약서에 본인이 매수인·임차인으로 기재<br />
        현재 재직 중 (퇴직 후 신청 불가)
      </GreenBox>

      <SectionBadge>내 상황 체크해보기</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="주택 구입 중간정산 신청 조건에 해당해요. 아래 계산기로 예상 금액을 먼저 살펴보세요."
        partialMatchText="일부 조건이 맞지 않아요. 고용노동부(1350) 또는 인사팀에 상황을 먼저 설명하고 문의하세요."
      />

      <Divider />

      <H2>중간정산 금액, 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        중간정산 금액은 '1일 평균임금 × 30일 × 근속연수' 공식으로 계산해요.
        월 평균급여와 신청 시점까지의 근속기간을 넣으면 대략적인 금액을 파악할 수 있죠.
        상여금이나 수당이 포함된 실제 평균임금 기준이라 급여명세서를 보고 계산하는 게 정확하고요.
      </p>

      <SectionBadge>중간정산 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 × 근속연수 기준 추정값이에요. 실제 금액은 퇴직 전 3개월 평균임금 기준으로 차이가 날 수 있죠."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청에 필요한 서류가 뭔가요?</H2>
      <p style={body}>
        서류가 하나라도 빠지면 인사팀에서 반려하고 재제출 요청이 와요.
        주택 잔금일이 촉박할 때 반려되면 일정이 꼬이죠.
        아래 목록을 기준으로 한 번에 준비하면 처리가 빨라지고요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        주민등록등본은 <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서 무료로 발급할 수 있죠.
        중간정산 신청서 양식은 회사마다 달라서 인사팀에 먼저 문의해서 받아야 하죠.
        서류 한 세트를 묶어서 제출하면 처리 속도가 빨라지고요.
      </p>

      <Divider />

      <H2>신청 절차를 단계별로 보면</H2>
      <p style={body}>
        주택 계약서의 잔금일을 기준으로 역산해서 신청 일정을 잡아야 해요.
        회사마다 처리 기간이 다르지만 보통 1~2주는 걸리죠.
        잔금일보다 최소 2~3주 전에 인사팀에 접수하는 게 안전해요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        퇴직소득세가 얼마나 나오는지 미리 알고 싶다면{" "}
        <a href="/w/퇴직금-중간정산-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>중간정산 세금 계산 글</a>에서
        근속연수 공제 구조와 계산 방법을 볼 수 있죠.
      </p>

      <Divider />

      <H2>신청 전 빠뜨리지 말아야 할 것들</H2>
      <p style={body}>
        잔금일이 가까워지면 챙겨야 할 게 한꺼번에 몰려요.
        아래 체크리스트로 사전에 점검해두면 누락 없이 진행할 수 있죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        근속기간이 0년으로 초기화돼요 — 퇴직금은 중간정산일 다음 날부터 다시 쌓여요<br />
        퇴직소득세는 지급 금액에서 바로 차감되죠<br />
        원천징수영수증을 반드시 보관해요 — 나중에 최종 퇴직금 계산에 필요하고요
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        주택 구입 중간정산에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 시행령을 바탕으로 작성됐어요. 법령 개정이 있을 수 있으니 최신 기준은 고용노동부(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
