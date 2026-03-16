"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금을 못 받았어요" },
  { id: "c2", label: "회사에 지급을 요청했지만 응답이 없어요" },
  { id: "c3", label: "근로계약서, 급여명세서, 통장 내역 중 하나 이상 있어요" },
  { id: "c4", label: "퇴직한 지 3년이 지나지 않았어요" },
];

const FAQS = [
  {
    q: "내용증명을 보내면 퇴직금을 꼭 받을 수 있나요?",
    a: "법적 강제력은 없지만, 사업주에게 '이 문제를 공식적으로 추적하겠다'는 신호를 보내는 거예요. 내용증명만으로 지급하는 경우가 생각보다 많죠.",
  },
  {
    q: "노동청 신고에 비용이 드나요?",
    a: "무료예요. 변호사 선임 없이 본인이 직접 진정서를 작성할 수 있고, 온라인으로도 접수가 가능하죠.",
  },
  {
    q: "소액체당금은 누구나 받을 수 있나요?",
    a: "퇴직 전 1년간 고용보험에 가입되어 있었고, 사업주가 체불로 확인되면 대상이 돼요. 근로복지공단에 신청하면 되죠.",
  },
  {
    q: "법원 지급명령은 얼마나 걸리나요?",
    a: "신청 후 사업주가 이의를 제기하지 않으면 2~3주 만에 확정돼요. 확정 후 강제 집행이 가능하죠.",
  },
  {
    q: "회사가 폐업했으면 어떻게 하나요?",
    a: "체당금 제도를 활용하세요. 근로복지공단이 퇴직금의 일부(최대 1,000만 원)를 대신 지급해줘요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (퇴직 후 14일 이내)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "임금채권보장법 — 체당금 지급 제도", url: "https://www.law.go.kr/법령/임금채권보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "근로복지공단 — 체당금 신청 안내", url: "https://www.comwel.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고, 어디에 어떻게 하나요?",
    description: "노동청 신고 장소, 준비 서류, 진행 절차를 한눈에 정리했어요.",
  },
  {
    slug: "회사-폐업-퇴직금-체당금-신청-우선변제권",
    title: "회사 폐업 시 퇴직금 체당금 신청 방법",
    description: "폐업한 회사의 퇴직금을 체당금으로 받는 절차와 우선변제권을 정리했어요.",
  },
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년, 지금 청구할 수 있나요?",
    description: "퇴직금 청구권의 3년 시효와 중단 방법을 안내해요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-미지급-지급받는-방법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 미지급 · 지급받는 방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 미지급<br />
        지금 당장 받을 수 있는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금 달라고 했는데 회사가 무시해요. 어떻게 해야 하죠?&rdquo;<br />
        방법이 여러 가지 있어요. 가장 빠른 건 <strong>내용증명</strong>을 보내는 거고, 그래도 안 되면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동청 진정</a>을 넣으면 되죠.
        회사가 도산했다면 정부의 <strong>소액체당금 제도</strong>로 받을 수 있고, 최후 수단으로 법원 <strong>지급명령</strong>도 있어요.
        단계별로 정리할 테니, 본인 상황에 맞는 방법을 골라보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 미지급 시 가장 빠른 방법은?</H2>
      <p style={body}>
        가장 먼저 시도할 건 <strong>내용증명 발송</strong>이에요. 우체국에서 보내는 공식 문서로, &ldquo;퇴직금 ○○원을 ○일까지 지급하라&rdquo;는 내용을 담아 회사에 발송하죠. 법적 강제력은 없지만, &ldquo;정식으로 청구한 기록&rdquo;이 남기 때문에 사업주에게 심리적 압박이 돼요.
      </p>
      <p style={body}>
        내용증명 한 통에 비용은 5,000원 안팎이에요. 우체국 방문이 번거로우면 인터넷 우체국에서 온라인으로 보낼 수 있죠. 발송 후 1~2주 안에 반응이 없으면 다음 단계로 넘어가면 돼요.
      </p>
      <p style={body}>
        내용증명을 보내는 게 중요한 이유가 하나 더 있어요. <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>소멸시효</a>(3년)가 얼마 안 남았을 때, 내용증명 발송이 시효 중단 효과를 가져다주죠. 단, 발송 후 6개월 안에 소송이나 신고를 해야 효력이 유지돼요.
      </p>

      <GreenBox title="내용증명에 넣을 내용">
        1. 보내는 사람(본인)과 받는 사람(회사 대표) 정보<br />
        2. 근무 기간과 퇴직일<br />
        3. 미지급 퇴직금 금액<br />
        4. 지급 요청 기한 (보통 수령일로부터 7~14일)
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>내용증명이 효과가 있나요?</H2>
      <p style={body}>
        생각보다 효과가 커요. 사업주 입장에서는 &ldquo;이 사람이 법적 조치를 준비하고 있구나&rdquo;라는 신호로 받아들이거든요. 내용증명만으로 퇴직금을 지급하는 경우가 실제로 30~40%에 달한다는 노무사들의 경험담이 있죠.
      </p>
      <p style={body}>
        특히 소규모 사업장일수록 효과가 좋아요. 대표가 &ldquo;귀찮아서&rdquo; 미루고 있던 경우라면, 공식 문서 한 통이 결정타가 되죠. 반대로 자금 사정이 정말 어려운 회사라면 내용증명만으로는 부족할 수 있어요.
      </p>
      <p style={body}>
        내용증명을 보냈는데도 반응이 없다면 바로 <strong>노동청 진정</strong>으로 넘어가세요. 이미 내용증명 발송 기록이 있으니, &ldquo;사전에 지급을 요청했으나 불응했다&rdquo;는 증거가 확보된 상태예요. 노동청 심사에서 유리하게 작용하죠.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>노동청 신고 절차는 얼마나 걸리나요?</H2>
      <p style={body}>
        관할 지방고용노동청에 임금체불 진정서를 제출하면 돼요. <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인 접수도 가능하고, 비용은 무료죠. 접수 후 1~2주 안에 근로감독관이 사업주에게 출석 요구서를 보내요.
      </p>
      <p style={body}>
        처리 기간은 사건에 따라 달라요. 사업주가 협조적이면 <strong>1개월 이내</strong>에 끝나기도 하고, 출석을 거부하거나 다투면 2~3개월까지 늘어나죠. 검찰 송치까지 가면 6개월 이상 걸릴 수 있지만, 대부분 시정 지시 단계에서 해결돼요.
      </p>
      <p style={body}>
        노동청의 강점은 <strong>형사 처벌 압박</strong>이에요. 임금체불은 근로기준법 제109조에 따라 3년 이하 징역 또는 3,000만 원 이하 벌금이죠. 이 부담 때문에 사업주 대부분이 진정 단계에서 퇴직금을 지급해요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>소액체당금 제도를 활용할 수 있나요?</H2>
      <p style={body}>
        회사가 도산(부도·파산·폐업)했거나 사업주가 돈이 없어 지급 능력이 없는 경우, <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>이 사업주를 대신해 퇴직금을 지급해주는 제도예요. <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 근거하고 있죠.
      </p>
      <p style={body}>
        지급 한도는 퇴직 당시 나이에 따라 달라요. 30세 미만은 최대 180만 원, 30~39세는 220만 원, 40세 이상은 260만 원이 월 상한이에요. 퇴직금 기준으로는 최대 <strong>1,000만 원</strong>까지 받을 수 있죠.
      </p>
      <p style={body}>
        신청 조건이 있어요. 퇴직 전 <strong>최종 1년간 고용보험에 가입</strong>되어 있어야 하고, 노동청에 체불 사실이 확인된 상태여야 하죠. 노동청 진정서를 먼저 접수한 뒤, 체불 확인이 되면 근로복지공단에 체당금 신청서를 제출하면 돼요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>법원 지급명령 신청은 어떻게 하나요?</H2>
      <p style={body}>
        노동청에서도 해결이 안 되면 법원에 <strong>지급명령 신청</strong>을 할 수 있어요. 정식 소송보다 훨씬 간단하고, 신청서 양식에 미지급 퇴직금 금액과 증빙을 첨부하면 되죠. 법원에 직접 가거나 전자소송(ecfs.scourt.go.kr)으로 접수할 수 있어요.
      </p>
      <p style={body}>
        신청 후 법원이 사업주에게 지급명령을 발령해요. 사업주가 <strong>2주 안에 이의를 제기하지 않으면</strong> 판결과 같은 효력이 생기죠. 이의를 제기하면 정식 소송으로 넘어가지만, 증거가 확실하면 이의를 제기하는 경우는 많지 않아요.
      </p>
      <p style={body}>
        확정된 지급명령으로 <strong>강제 집행</strong>이 가능해요. 사업주의 통장, 부동산, 매출채권 등을 압류할 수 있죠. 비용은 인지대(소송 가액의 0.5%)와 송달료(약 5만 원) 정도로, 정식 소송에 비해 저렴해요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당돼요. 내용증명 발송 → 노동청 진정 순서로 진행하세요."
        partialMatchText="일부만 해당돼요. 고용노동부(1350)에 상담을 받아 방향을 잡아보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금을 받아내는 방법에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 임금채권보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
