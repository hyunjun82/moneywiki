"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 건설현장에서 일용직으로 일하는데, 다치면 산재보험 적용되는지 궁금한 상황
// Q2. 산재 발생 시 근로복지공단에 요양급여 신청을 한다
// Q3. 적용 기준(2천만원·1일부터), 신고 주체(원수급인), 보험료 계산, 산재 신청법, 미가입 시 처벌
// Q4. GreenBox로 적용 기준 + Steps로 산재 신청 절차 + BorderBox로 미가입 처벌

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "다치면 바로 병원부터 가요",
    desc: "산재 지정 병원이면 치료비가 바로 처리돼요. 일반 병원이어도 괜찮아요. 치료받고 진단서를 발급받으세요.",
    tip: "산재 지정 병원은 근로복지공단 홈페이지에서 검색 가능",
  },
  {
    title: "근로복지공단 지사에 요양급여 신청서 제출",
    desc: "진단서, 출근부(또는 동료 증언), 임금명세서를 함께 내요. 사업주 서명이 없어도 근로자가 직접 신청할 수 있어요.",
    link: { label: "근로복지공단", href: "https://www.kcomwel.or.kr" },
  },
  {
    title: "공단 심사 후 치료비·휴업급여 지급",
    desc: "승인되면 치료비 전액을 공단이 부담하고, 4일 이상 쉬면 평균임금의 70%를 휴업급여로 받아요. 처음 3일은 사업주가 60%를 지급해야 하고요.",
    tip: "일용직 평균임금 = 최근 3개월 임금 평균. 증빙 자료 미리 챙기기",
  },
  {
    title: "치료 종결 후 장해등급 판정 (해당 시)",
    desc: "치료가 끝나도 장해가 남으면 장해등급 판정을 받아요. 등급에 따라 장해보상금이 추가로 나와요.",
  },
];

const FAQS = [
  { q: "하루만 일해도 산재보험이 적용되나요?", a: "네. 근무 기간과 상관없이 1일 근무부터 산재보험이 적용돼요. 공사금액 2천만원 이상 현장이어야 해요." },
  { q: "산재보험료는 누가 내나요?", a: "원수급인(원청 건설사)이 내요. 일용근로자는 보험료를 안 내요. 공사금액에 업종별 요율을 곱해서 일괄 납부하고요." },
  { q: "사업주가 산재보험에 가입 안 했으면 어떡하나요?", a: "근로복지공단에 산재 신청하면 돼요. 공단이 치료비를 먼저 지급하고, 나중에 사업주에게 구상권으로 청구해요. 사업주는 형사처벌까지 받을 수 있어요." },
  { q: "출퇴근 중에 다쳐도 산재인가요?", a: "네. 출퇴근 재해도 산재보험 적용 대상이에요. 2026년 추가 부담금에 출퇴근재해 0.6‰가 포함돼 있어요." },
  { q: "2026년 산재보험료율이 바뀌었나요?", a: "2026년 평균 산재보험료율은 1.47%로 전년과 동일해요. 다만 임금채권부담금이 0.06%에서 0.09%로 인상됐어요." },
  { q: "근로계약서가 없어도 산재 신청할 수 있나요?", a: "네. 실제로 일한 증거만 있으면 돼요. 출근부, 임금 이체 내역, 동료 증언, CCTV 등이 증거가 되고요." },
];

const SOURCES = [
  { name: "산업재해보상보험법", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단", href: "https://www.kcomwel.or.kr" },
  { name: "고용노동부 산재보험료율 고시", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "산재보험-신청-방법", title: "산재보험 신청 방법", description: "산재 발생 시 신청 절차와 필요 서류." },
  { slug: "일용근로자-4대보험", title: "일용근로자 4대보험", description: "일용직도 4대보험 적용되는 기준." },
  { slug: "건설업-퇴직공제", title: "건설업 퇴직공제", description: "건설 일용직 퇴직공제금 신청 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 산재보험 · 건설현장</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건설현장 일용직, 다치면 보상받을 수 있을까?<br />
        산재보험 적용 기준과 신청법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        건설현장에서 하루만 일해도 다치면 산재보험으로 치료비 전액을 보상받을 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법</a>에 따라 공사금액 2천만원 이상 현장은 산재보험 의무 가입 대상이에요.
        보험료는 원청이 내고, 일용근로자는 한 푼도 안 내요.
        사업주가 미가입해도 근로자는 보상받을 수 있고, 사업주에게는 징역형까지 내려져요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>산재보험 적용되는 건설현장 기준</H2>
      <p style={body}>
        모든 현장이 적용되는 건 아니에요. 공사 규모에 따라 달라요.
      </p>

      <GreenBox>
        공사금액 2천만원 이상 또는 연면적 100㎡ 초과 → 의무 가입{"\n"}
        일용근로자: 1일 근무부터 적용 (근무 기간 무관){"\n"}
        근로계약서 없어도 실제 근무 사실이면 적용{"\n"}
        보험 가입·보험료 납부: 원수급인(원청 건설사){"\n"}
        2026년 평균 보험료율: 1.47% (전년 동일)
      </GreenBox>

      <p style={body}>
        소규모 인테리어 공사라도 공사금액이 2천만원을 넘으면 가입 대상이에요.
        여러 공사를 합쳐서 2천만원이 넘는 경우도 포함되고요.
      </p>

      <CategoryButton label="근로 정보" count={10} href="/category/근로" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>현장에서 다쳤을 때, 이렇게 신청해요</H2>
      <p style={body}>
        사업주 협조 없이도 근로자가 직접 신청할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>사업주가 산재보험에 가입 안 했다면?</H2>
      <p style={body}>
        미가입 현장이라도 근로자 보상은 받을 수 있어요. 사업주에게는 무거운 처벌이 내려지고요.
      </p>

      <BorderBox>
        <strong>미가입 시 사업주 제재</strong><br />
        형사처벌: 7년 이하 징역 또는 1억원 이하 벌금{"\n"}
        구상권: 공단이 치료비 선지급 후 사업주에게 전액 + 보험료 3배 청구{"\n"}
        입찰 제한: 미가입 적발 시 공공기관 입찰 3년 참가 불가{"\n\n"}
        <strong>근로자는?</strong> 공단에 직접 신청하면 치료비를 먼저 받아요. 미가입 사실이 근로자 불이익이 되지 않아요.
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>건설 일용직 산재보험에 대해 많이 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 산업재해보상보험법을 바탕으로 작성했어요. 보험료율·급여 기준은 매년 변경될 수 있으니 근로복지공단(1588-0075)에서 확인하세요." />
    </ArticleLayout>
  );
}
