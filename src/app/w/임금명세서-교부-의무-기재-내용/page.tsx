// Q1. 회사에서 월급명세서를 안 주는데 법적으로 받을 권리가 있는지, 어떻게 대응할지 궁금
// Q2. 임금명세서 교부 의무 확인 → 필수 기재사항 파악 → 미교부 시 신고 방법
// Q3. 근로기준법 48조, 필수 기재 7항목, 전자문서 가능, 과태료 500만원, 5인 미만도 적용
// Q4. GreenBox(필수 기재사항) + DocTable(기재 항목) + Steps(신고 절차) + FAQ

"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const DOCS = [
  { name: "성명·생년월일·사원번호", required: true, where: "근로자 특정 정보" },
  { name: "임금 지급일", required: true, where: "정확한 날짜 (예: 2026.3.25)" },
  { name: "임금 총액", required: true, where: "세전 총 급여액" },
  { name: "기본급·수당·상여금 항목별 금액", required: true, where: "구성항목 각각 분리 기재" },
  { name: "연장·야간·휴일근로 시간 수", required: true, where: "해당하는 경우 시간 포함" },
  { name: "공제 항목별 금액 (소득세·4대보험)", required: true, where: "항목별로 각각 기재" },
  { name: "실 지급액", required: true, where: "공제 후 실제 입금 금액" },
];

const STEPS_DATA = [
  {
    title: "회사에 서면으로 요청",
    desc: "이메일이나 문자로 임금명세서 교부를 요청하고 기록을 남기세요. 구두 요청만으로는 증거가 부족해요.",
  },
  {
    title: "고용노동부 신고",
    desc: "회사가 거부하면 고용노동부 민원마당에서 온라인 진정을 넣을 수 있어요. 전화(1350)로도 상담 가능해요.",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "과태료 부과",
    desc: "근로감독관이 조사해서 미교부가 확인되면 500만원 이하 과태료가 부과돼요. 기재사항이 누락되거나 사실과 다르게 적힌 경우에도 같은 과태료예요.",
  },
];

const FAQS = [
  { q: "임금명세서를 카톡이나 이메일로 줘도 되나요?", a: "네, 전자문서도 인정돼요. 카카오톡, 이메일, 사내 시스템 등 근로자가 확인하고 보관할 수 있는 형태면 충분해요." },
  { q: "알바생에게도 줘야 하나요?", a: "네, 줘야 해요. 정규직·계약직·아르바이트·일용직 구분 없이 모든 근로자에게 의무예요." },
  { q: "5인 미만 사업장도 의무인가요?", a: "네, 사업장 규모와 상관없이 1명이라도 고용하면 의무예요. 5인 미만이라고 예외가 아니에요." },
  { q: "임금명세서를 안 주면 바로 과태료인가요?", a: "근로자가 신고하면 근로감독관이 시정 지시를 먼저 해요. 그래도 안 주면 과태료가 부과돼요. 즉시 과태료는 아니에요." },
  { q: "명세서에 적힌 금액이 실제와 다르면 어떻게 하나요?", a: "사실과 다르게 기재한 것도 과태료 대상이에요. 고용노동부에 신고하면 돼요. 임금체불이 의심되면 체불 진정도 함께 넣을 수 있어요." },
  { q: "고용노동부 양식을 꼭 써야 하나요?", a: "정해진 양식은 없어요. 필수 기재사항이 모두 포함되면 회사 자체 양식이어도 돼요. 고용노동부 홈페이지에서 표준 양식을 다운받을 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제48조 (임금대장 및 임금명세서)", url: "https://www.law.go.kr/법령/근로기준법/제48조" },
      { label: "근로기준법 시행령 제27조의2 (기재사항)", url: "https://www.law.go.kr/법령/근로기준법시행령" },
      { label: "고용노동부 임금명세서 안내", url: "https://www.moel.go.kr/wageCal.do" },
    ],
  },
];

const RELATED = [
  { slug: "임금-미지급-6개월-해결-방법", title: "임금 미지급 해결 방법", description: "체불임금을 받을 수 있는 방법을 안내해요." },
  { slug: "최저임금-미달-처벌", title: "최저임금 미달 처벌", description: "최저임금보다 적게 받았을 때 대응법이에요." },
  { slug: "퇴직금-미지급-지급받는-방법", title: "퇴직금 미지급 해결", description: "퇴직금을 못 받았을 때 청구 절차예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 임금 · 명세서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임금명세서, 회사가 꼭 줘야 하나요?<br />
        필수 기재사항과 미교부 시 과태료
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월급 통장에 찍힌 숫자만 보고 끝내고 있나요? 기본급이 얼마인지, 4대보험은 얼마나 빠졌는지 모르면 내 권리를 지킬 수 없어요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법/제48조" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제48조</a>에 따라{" "}
        <strong>모든 사업장은 임금명세서를 교부할 의무</strong>가 있고, 안 주면 <strong>500만원 이하 과태료</strong>가 부과돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임금명세서에 꼭 들어가야 할 항목</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제27조의2</a>에서{" "}
        정한 필수 기재사항이에요. 이 중 하나라도 빠지면 과태료 대상이에요.
      </p>

      <SectionBadge>필수 기재 항목</SectionBadge>
      <DocTable docs={DOCS} />

      <GreenBox title="핵심 포인트">
        "월급 300만원 입금" 이것만으로는 안 돼요.<br />
        기본급, 수당, 공제 항목을 각각 분리해서 적어야 해요.<br />
        종이·이메일·카톡·사내시스템 모두 가능, 근로자가 보관할 수 있으면 OK
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>안 주면 어떻게 해야 하나요?</H2>
      <p style={body}>
        요청해도 안 주면 고용노동부에 신고할 수 있어요. 1인 사업장이든 대기업이든 예외 없이 적용돼요.
      </p>

      <Steps steps={STEPS_DATA} />

      <BorderBox>
        과태료는 1회 위반 시 30만원, 2회 50만원, 3회 이상 100만원으로 단계적으로 올라가요.
        <a href="/w/임금-미지급-6개월-해결-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금체불</a>이 함께 의심되면 체불 진정도 같이 넣는 게 효과적이에요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임금명세서 교부 의무 안내예요. 과태료 기준은 법령 개정에 따라 변경될 수 있으니 고용노동부에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
