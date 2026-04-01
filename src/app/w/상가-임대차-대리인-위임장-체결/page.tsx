"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 상가를 계약하려는데 건물주 대신 다른 사람(배우자 등)이 나와서, 이대로 계약해도 되는지 불안한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 위임장·인감증명서·신분증 3종 세트를 확인하고, 건물주와 직접 통화해서 대리권을 확인하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 상가는 일상가사가 아니라 위임 필수, 위임장 기재사항, 인감 일치 확인, 건물주 직접 확인.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Checklist(확인사항) + GreenBox(핵심 규칙) + Steps(확인 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd, Steps, Checklist,
  ArticleLayout,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "위임장 원본 (인감 날인 필수)",
  "인감증명서 원본 (3개월 이내 발급분)",
  "건물 소유자 신분증 사본",
  "대리인 신분증 원본",
  "건물 등기사항증명서 (소유자 확인용)",
  "건물주와 직접 전화 통화 (녹음 권장)",
];

const STEPS = [
  { title: "등기사항증명서 확인", desc: "인터넷등기소에서 건물 등기사항증명서를 떼서 진짜 소유자가 누구인지 먼저 확인해요." },
  { title: "위임장·인감증명서 수령", desc: "대리인에게 위임장 원본과 인감증명서 원본을 요구해요. 인감증명서는 3개월 이내 발급분이어야 해요.", tip: "위임장의 인감과 인감증명서의 인감이 동일한지 대조하세요." },
  { title: "건물주와 직접 통화", desc: "등기부에 기재된 소유자 본인과 직접 전화해서 대리인에게 위임했는지 확인해요.", tip: "통화 내용을 녹음해두면 나중에 분쟁 시 증거가 돼요." },
  { title: "계약서 작성", desc: "모든 확인이 끝나면 계약서를 작성해요. 계약서에도 소유자(위임인)의 인감을 날인받아요." },
];

const FAQS = [
  {
    q: "건물주 부인이면 그냥 계약해도 되나요?",
    a: "안 돼요. 상가 임대는 일상가사(부부간 당연히 할 수 있는 가사)가 아니에요. 배우자라도 정식 위임장과 인감증명서가 없으면 대리권이 없어서 계약이 무효가 될 수 있어요.",
  },
  {
    q: "위임장 양식이 정해져 있나요?",
    a: "법정 양식은 없지만, 부동산 소재지·소유자 이름·대리인 이름·위임 내용·날짜·인감날인이 반드시 들어가야 해요. 공인중개사가 양식을 제공하기도 해요.",
  },
  {
    q: "인감증명서 대신 본인서명사실확인서도 되나요?",
    a: "법적으로는 가능하지만, 부동산 거래에서는 인감증명서가 훨씬 안전해요. 위조 위험이 적고 법적 효력이 강해요.",
  },
  {
    q: "공인중개사가 대리인 확인을 해주나요?",
    a: "공인중개사는 중개 의무가 있지만 대리권 확인 책임은 임차인 본인에게도 있어요. 중개사만 믿지 말고 직접 확인하세요.",
  },
  {
    q: "위임장 없이 계약했는데 어떻게 하나요?",
    a: "소유자가 추인(나중에 인정)하면 유효해요. 하지만 추인을 거부하면 계약이 무효가 돼요. 소유자에게 추인 의사를 서면으로 받아두세요.",
  },
];

const REFERENCES = [
  {
    category: "법령·정부 자료",
    items: [
      { label: "상가건물 임대차보호법", url: "https://www.law.go.kr/법령/상가건물임대차보호법" },
      { label: "찾기쉬운 생활법령정보 — 상가건물 임대차", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=627&ccfNo=2&cciNo=2&cnpClsNo=1" },
      { label: "인터넷등기소", url: "https://www.iros.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 상가임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상가 계약, 건물주 대신 다른 사람이 나왔다면?<br />
        위임장 확인부터 안전한 체결까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        상가 계약하러 갔는데 건물주 대신 배우자나 다른 사람이 나왔어요.
        상가는 주택보다 금액이 크고 영업이 걸려 있어서 더 신중해야 해요.
        위임장과 인감증명서 없이 계약하면 나중에 무효가 될 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>상가 임대는 배우자라도 위임이 필수예요</H2>
      <p style={body}>
        주택 임대는 '일상가사'로 볼 수 있어서 배우자가 대리할 여지가 있지만,
        상가는 달라요. <a href="https://www.law.go.kr/법령/상가건물임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>상가건물 임대차보호법</a>상
        상가 임대는 일상가사가 아니라서, 누구든 대리하려면 정식 위임이 필요해요.
      </p>

      <GreenBox>
        <strong>상가 대리인 계약 = 반드시 3종 세트 확인</strong><br />
        1. 위임장 원본 (소유자 인감 날인)<br />
        2. 인감증명서 원본 (3개월 이내)<br />
        3. 건물주와 직접 통화 확인 (녹음 권장)
      </GreenBox>

      <Divider />

      <H2>대리인 확인하는 절차는?</H2>
      <p style={body}>
        계약 전에 아래 4단계를 반드시 거치세요.
        귀찮더라도 이 과정을 생략하면 보증금을 날릴 수 있어요.
      </p>

      <SectionBadge>안전한 계약 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>계약 전 반드시 확인할 것</H2>
      <p style={body}>
        아래 체크리스트를 하나씩 확인하세요.
        하나라도 빠지면 계약을 미루는 게 안전해요.
        <a href="/w/상가-임대차계약서" style={{ color: "#1D9E75", textDecoration: "underline" }}>상가 임대차 계약서 작성법</a>도 함께 확인하면 좋아요.
      </p>

      <SectionBadge>필수 확인 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <BorderBox title="위임장 기재사항">
        · 부동산 소재지 (주소)<br />
        · 소유자(위임인) 이름·주소·연락처<br />
        · 대리인 이름·주소·주민등록번호<br />
        · 위임 내용 (임대차계약 체결에 관한 일체의 권한)<br />
        · 작성 날짜<br />
        · 소유자 인감 날인
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 상가건물 임대차보호법을 바탕으로 작성됐어요. 구체적 법률 상담은 법률구조공단(132) 또는 변호사에게 문의하세요." />
    </ArticleLayout>
  );
}
