"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "파견 업체(파견사업주)와 근로계약을 체결했어요" },
  { id: "c2", label: "파견 업체 소속으로 1년 이상 근무했어요" },
  { id: "c3", label: "주 평균 15시간 이상 근무했어요" },
  { id: "c4", label: "퇴직일로부터 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 600, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "months", label: "파견 업체 근속 기간", min: 12, max: 120, step: 1, defaultValue: 24, format: (v: number) => `${Math.floor(v / 12)}년 ${v % 12}개월` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금 (세전)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * (v.months / 12)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년 기준 (1개월치 월급)",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 파견 계약서", required: true, where: "파견 업체 인사팀 요청" },
  { name: "급여명세서 또는 급여 이체 내역 (3개월치)", required: true, where: "은행 앱 출력 또는 파견 업체 요청" },
  { name: "4대보험 가입 이력 확인서", required: true, where: "고용24(ei.go.kr) 무료 조회" },
  { name: "사용 업체 근무 기록 (출입 기록, 업무지시서)", required: false, where: "사용 업체 또는 파견 업체 요청" },
  { name: "파견 업체 사업장 등록 증명", required: false, where: "근로복지공단 또는 고용노동부" },
];

const STEPS = [
  {
    title: "파견 업체에 퇴직금 지급 서면 요청",
    desc: "퇴직금은 파견 업체(파견사업주)에 청구해요. 파견 근로자의 법적 고용주는 파견 업체이기 때문이죠. 사용 업체는 근무 장소와 업무만 제공해요. 이메일이나 내용증명으로 서면 요청을 남겨두세요.",
    tip: "카카오톡·이메일 요청도 증거로 인정돼요 — 날짜와 내용이 명확하게 남도록 하세요",
  },
  {
    title: "퇴직일로부터 14일 이내 지급 여부 확인",
    desc: "파견 업체는 퇴직일로부터 14일 이내에 퇴직금을 지급해야 해요. 14일이 지났는데 입금이 안 됐다면 지연이자(연 20%)가 자동으로 붙어요. 다시 서면으로 독촉하고 날짜를 기록해두세요.",
    tip: "지연이자는 14일 초과 시점부터 실제 지급일까지 누적돼요",
  },
  {
    title: "고용노동부 민원마당에서 진정 접수",
    desc: "파견 업체가 퇴직금 지급을 거부하면 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로 진정을 접수해요. 불법 파견이 의심되는 경우에는 불법 파견 여부 확인도 함께 신청할 수 있어요.",
    tip: "온라인 접수 무료 — 접수 즉시 담당 근로감독관이 배정돼요",
    link: { label: "고용노동부 진정 접수", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "불법 파견 인정 시 사용 업체에 추가 청구",
    desc: "고용노동부가 불법 파견으로 인정하면 사용 업체에 직접 고용 의무와 퇴직금 지급 의무가 발생해요. 2년 초과 파견이나 허용 업종 외 파견이 불법 파견에 해당해요. 법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요.",
    tip: "법률구조공단(132) 무료 상담 — 소송까지 지원받을 수 있어요",
  },
];

const CHECKLIST = [
  "퇴직금 청구 대상 확인: 파견 업체(파견사업주)에 청구",
  "파견 업체 기준 1년 근속 확인: 사용 업체 여러 곳이어도 합산",
  "지급 기한 14일 확인: 초과 시 지연이자(연 20%) 청구 가능",
  "불법 파견 여부 확인: 2년 초과 파견 또는 허용 업종 외 파견",
  "소멸시효 3년: 퇴직일로부터 3년 이내 청구 필수",
  "증거 자료 보관: 파견 계약서·급여명세서·4대보험 이력",
];

const FAQS = [
  {
    q: "파견 근로자 퇴직금은 파견 업체가 줘야 하나요, 사용 업체가 줘야 하나요?",
    a: "원칙적으로 파견 업체(파견사업주)가 지급해요. 파견근로자 보호 등에 관한 법률에서 파견 근로자의 고용주는 파견 업체로 정해져 있거든요. 다만 불법 파견이 인정되면 사용 업체가 책임지는 경우도 있어요.",
  },
  {
    q: "사용 업체 여러 곳을 옮겨 다녔는데 퇴직금 계산은 어떻게 하나요?",
    a: "파견 업체와의 고용관계가 계속 이어졌다면 근속 기간이 합산돼요. A 업체 6개월, B 업체 8개월 일했어도 파견 업체 소속으로 총 14개월이면 퇴직금이 발생하죠. 파견 업체와의 고용관계가 중단된 시점이 있었는지 확인해야 해요.",
  },
  {
    q: "파견 기간이 끝나면 자동으로 퇴직금이 나오나요?",
    a: "파견 기간 종료가 곧 퇴직은 아니에요. 파견 업체와의 고용관계가 유지되면 다른 사용 업체로 배치될 수 있죠. 파견 업체와의 고용관계가 완전히 종료돼야 퇴직금이 발생해요.",
  },
  {
    q: "불법 파견이면 퇴직금을 누구한테 청구하나요?",
    a: "불법 파견이 인정되면 사용 업체가 직접 고용한 것으로 간주돼요. 이 경우 사용 업체에 퇴직금을 청구할 수 있어요. 불법 파견 여부는 고용노동부나 법원이 판단하죠.",
  },
  {
    q: "파견 업체가 폐업하면 퇴직금을 못 받나요?",
    a: "파견 업체가 폐업해도 체당금(임금 대지급금) 제도로 퇴직금 일부를 받을 수 있어요. 근로복지공단에 체당금 신청을 하면 되고, 상한액이 있으니 금액은 미리 확인하세요.",
  },
  {
    q: "파견에서 사용 업체 정규직으로 전환되면 퇴직금 계산이 어떻게 되나요?",
    a: "파견 기간과 정규직 기간이 자동으로 합산되는 건 아니에요. 파견 업체와의 고용관계가 종료될 때 그때까지의 퇴직금이 정산되고, 사용 업체 정규직으로 새 근로관계가 시작돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "파견근로자 보호 등에 관한 법률", url: "https://www.law.go.kr/법령/파견근로자보호등에관한법률" },
      { label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 파견 근로자 보호 제도", url: "https://www.moel.go.kr" },
      { label: "법률구조공단: 무료 법률 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건",
    description: "고용형태별 퇴직금 발생 조건과 1년 기준을 정리했어요.",
  },
  {
    slug: "퇴직금-지급-청구-방법",
    title: "퇴직금 지급 청구 방법",
    description: "직접 청구부터 고용노동부 신고까지 단계별로 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "퇴직금을 안 줄 때 어디에 어떻게 신고하는지 정리했어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="파견근로자-퇴직금-청구-대상" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 파견근로자 · 청구 대상</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        파견 근로자 퇴직금, 파견 업체에 받아야 하나요?<br />
        청구 대상·계산·절차 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        파견 근로자는 일하는 곳(사용 업체)과 고용 계약을 체결한 곳(파견 업체)이 달라서 퇴직금을 어디에 청구해야 하는지 헷갈리죠.
        <a href="https://www.law.go.kr/법령/파견근로자보호등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>파견근로자 보호 등에 관한 법률</a>에 따르면,
        퇴직금 지급 의무는 파견 업체(파견사업주)에 있어요.
        사용 업체를 여러 곳 옮겨 다녔어도 파견 업체 소속으로 1년이 넘으면 퇴직금이 발생해요.
        불법 파견이 인정되는 경우에는 사용 업체에 직접 청구할 수도 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>파견 근로자 퇴직금 청구 대상은 어디인가요?</H2>
      <p style={body}>
        파견 업체(파견사업주)예요. 파견 근로자의 법적 고용주는 사용 업체가 아닌 파견 업체이기 때문이죠.
        사용 업체는 근무 장소와 업무만 제공하는 거고, 고용관계의 당사자는 아니에요.
        퇴직금 청구서도, 지급 의무도, 14일 기한도 모두 파견 업체 기준으로 적용돼요.
      </p>
      <p style={body}>
        사용 업체를 여러 곳 옮겨 다녔더라도 파견 업체와의 고용관계가 끊기지 않았다면 근속 기간이 합산돼요.
        A 업체 6개월, B 업체 8개월 일했어도 파견 업체 소속으로 총 14개월이면 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 발생 조건</a>을 충족해요.
      </p>

      <GreenBox>
        청구 대상: 파견 업체(파견사업주) — 사용 업체 아님<br />
        발생 조건: 파견 업체 기준 1년 이상 + 주 15시간 이상<br />
        예외: 불법 파견 인정 시 사용 업체에 직접 청구 가능<br />
        소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 청구 조건을 갖췄어요. 아래 계산기로 예상 금액을 먼저 확인해보세요."
        partialMatchText="일부 조건이 다를 수 있어요. 파견 업체와의 고용관계를 확인한 뒤 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      <H2>파견 근로자 퇴직금 예상액 계산하기</H2>
      <p style={body}>
        퇴직금은 파견 업체 기준 평균임금 × 근속연수(일수/365)로 계산해요.
        사용 업체가 여러 곳이어도 파견 업체 소속 합산 근속 기간이 1년 이상이면 퇴직금이 발생하죠.
        아래 슬라이더로 월 평균임금과 근속 기간을 조절해보세요.
      </p>
      <p style={body}>
        상여금이나 연차수당이 평균임금에 포함되면 실제 금액이 더 높아져요.
        퇴직금 계산 공식이 헷갈린다면 <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산 방법</a>을 참고하세요.
      </p>

      <SectionBadge>파견 근로자 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 파견 업체 기준 근속 기간으로 계산해요. 상여금·연차수당 포함 시 실제 금액이 더 높아질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        파견 업체에 퇴직금을 청구하려면 고용관계와 근무 사실을 입증하는 서류가 필요해요.
        파견 계약서와 급여명세서가 핵심이고, 4대보험 가입 이력으로 근속 기간을 보강할 수 있어요.
      </p>
      <p style={body}>
        불법 파견을 주장하는 경우에는 사용 업체에서의 업무 지시 기록, 출입 기록도 함께 확보해두세요.
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 진정</a>을 넣을 때 증거로 첨부할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        2년 초과 파견이나 허용 업종 외 파견이 인정되면 사용 업체에 직접 고용 의무가 발생해요.
        고용노동부에 불법 파견 여부 확인을 신청하고, 법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요.
      </BorderBox>

      <Divider />

      <H2>파견 업체에 퇴직금 청구하는 절차</H2>
      <p style={body}>
        파견 업체에 먼저 서면으로 지급 요청하고, 거부하면 고용노동부 진정으로 이어가는 게 가장 효율적이에요.
        불법 파견이 의심되면 4단계까지 진행하면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        파견 관계에서 퇴직금 청구는 고용관계 정리가 핵심이에요.
        소멸시효 3년을 놓치지 않도록 퇴직 즉시 아래 항목을 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        파견 업체가 폐업해도 근로복지공단 체당금 신청으로 퇴직금 일부를 받을 수 있어요.
        상한액이 있으니 금액을 먼저 확인하고 신청하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        파견 근로자 퇴직금 청구에서 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 파견근로자 보호 등에 관한 법률과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
