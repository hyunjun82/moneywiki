"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 아직 혼인신고 전인데 신혼부부 특별공급을 신청할 수 있는지 궁금한 상황
// Q2. 예비 신혼부부로 공공주택 특별공급에 신청하고 입주 전까지 혼인신고를 완료한다
// Q3. 공공주택만 가능(민영 불가), 자격 조건(소득·자산·무주택), 혼인 증명 시기, 당첨 후 절차, 미혼인 채 불가 시 당첨 취소
// Q4. GreenBox(핵심) + EligibilityChecker + Steps(신청절차) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const ELIGIBILITY_ITEMS = [
  { id: "marriage", label: "결혼 예정이며 입주 전까지 혼인신고 가능하다" },
  { id: "saving", label: "청약저축(주택청약종합저축)에 6개월 이상 가입, 6회 이상 납입했다" },
  { id: "homeless", label: "본인과 예비 배우자 모두 무주택자다" },
  { id: "income", label: "월평균소득이 도시근로자 가구 기준 130% 이하다 (맞벌이 200%)" },
  { id: "asset", label: "부동산 자산 2.15억원 이하, 자동차 3,683만원 이하다" },
];

const STEPS = [
  {
    title: "LH 청약플러스에서 공고를 확인하세요",
    desc: "공공주택 입주자 모집공고가 나오면 LH 청약플러스(apply.lh.or.kr) 또는 마이홈 포털에서 '예비 신혼부부 신청 가능' 여부를 확인해요. 모든 공공주택이 예비 신혼 대상은 아니에요.",
    tip: "공고에 '예비 신혼부부' 문구가 있는지 꼭 확인",
    link: { label: "LH 청약플러스", href: "https://apply.lh.or.kr" },
  },
  {
    title: "예비 신혼부부로 신청하세요",
    desc: "LH 청약플러스 또는 공공주택 청약 앱에서 신청해요. '예비 신혼부부'로 체크하고 결혼 예정일을 입력해요. 예비 배우자의 인적사항, 무주택 여부, 소득·자산 정보도 함께 입력해야 해요.",
  },
  {
    title: "당첨되면 예비 신혼 증빙을 제출하세요",
    desc: "당첨 후 공급계약을 체결할 때 결혼 예정을 증명하는 서류를 제출해요. 예식장 계약서, 청첩장 등이 증빙 자료가 될 수 있어요.",
  },
  {
    title: "입주 전까지 혼인신고를 완료하세요",
    desc: "이게 제일 중요해요. 입주 전까지 혼인신고를 완료하고 혼인관계증명서를 제출해야 해요. 못 하면 당첨이 취소되고 계약금도 돌려받지 못할 수 있어요.",
    tip: "공고에 따라 공고일부터 1년 이내 증명 요구하는 경우도 있음",
  },
];

const FAQS = [
  {
    q: "민영주택 신혼특공도 예비 신혼으로 신청 가능한가요?",
    a: "안 돼요. 예비 신혼부부 신청은 공공주택(LH, 지자체 공급)에서만 가능해요. 민영주택이나 국민주택 신혼특공은 혼인신고 완료 후에만 신청할 수 있어요.",
  },
  {
    q: "당첨 후 파혼하면 어떻게 되나요?",
    a: "당첨 자격이 박탈돼요. 계약금은 위약금으로 공제되고, 일정 기간 청약 신청도 제한될 수 있어요. 신중하게 결정해야 해요.",
  },
  {
    q: "예비 배우자가 주택을 가지고 있으면 안 되나요?",
    a: "네, 신청자와 예비 배우자 모두 무주택이어야 해요. 신청 시점뿐 아니라 혼인신고 전까지 무주택 요건을 유지해야 해요.",
  },
  {
    q: "소득 기준 130%가 구체적으로 얼마인가요?",
    a: "2025년 기준 3인 가구 도시근로자 월평균소득의 130%는 약 752만원이에요. 맞벌이면 200%까지 완화돼서 약 1,157만원이에요. 자녀가 있으면 추가 완화돼요.",
  },
  {
    q: "예비 신혼부부도 일반 신혼과 당첨 확률이 같나요?",
    a: "네, 동일한 조건으로 추첨해요. 예비 신혼이라서 불이익은 없어요. 다만 당첨 후 혼인신고를 못 하면 당첨이 취소된다는 점만 다르죠.",
  },
],

SOURCES = [
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr" },
  { name: "LH 청약플러스", href: "https://apply.lh.or.kr" },
  { name: "국토교통부", href: "https://www.molit.go.kr" },
];

const RELATED = [
  { slug: "신혼부부-특별공급", title: "신혼부부 특별공급 조건", description: "신혼특공 자격 요건과 소득 기준." },
  { slug: "연말정산-혼인세액공제", title: "혼인세액공제 50만원", description: "결혼하면 받는 세금 혜택." },
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 전환 방법", description: "청약통장 종류별 전환 조건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 . 청약 . 특별공급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        결혼 전에도 신혼특공 신청 가능해요<br />
        예비 신혼부부 특별공급 자격과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "6개월 후 결혼인데, 지금 나온 공공분양 아파트에 신혼특공 넣을 수 있나요?"
      </p>
      <p style={body}>
        <strong>공공주택이면 가능</strong>해요. 아직 혼인신고를 안 했어도 <strong>예비 신혼부부</strong>로 신청할 수 있어요.
        다만 민영주택이나 국민주택은 안 돼요. <a href="https://apply.lh.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>LH 청약플러스</a>에서 공공주택 공고를 확인하세요.
        당첨되면 <strong>입주 전까지 혼인신고를 완료</strong>해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공공주택만 예비 신혼 신청이 가능해요</H2>
      <p style={body}>
        모든 신혼특공에 예비 신혼으로 넣을 수 있는 건 아니에요. 주택 유형에 따라 달라요.
      </p>

      <SectionBadge>주택 유형별 가능 여부</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>주택 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>예비 신혼 신청</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["공공주택 (LH, 지자체)", "가능", "공고에 '예비 신혼부부' 명시 확인"],
              ["민영주택", "불가", "혼인신고 완료 후에만 신청"],
              ["국민주택", "불가", "혼인신고 완료 후에만 신청"],
            ].map(([type, status, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, background: "#fafafa" }}>{type}</td>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: status === "가능" ? "#1D9E75" : "#dc2626" }}>{status}</td>
                <td style={{ padding: "10px 12px" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>자격 조건, 체크해 보세요</H2>
      <p style={body}>
        일반 신혼부부 특별공급 자격을 기본으로 갖춰야 해요. 아래 항목을 모두 충족하면 신청 가능해요.
      </p>

      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="예비 신혼부부 특별공급 자격이 돼요! 공고에서 '예비 신혼부부' 대상 여부를 확인하세요."
        partialMatchText="체크 안 된 항목을 충족해야 신청할 수 있어요."
      />

      <Divider />
      <ArticleAd position="mid" />

      <H2>신청부터 입주까지 절차는?</H2>
      <p style={body}>
        신청 자체는 어렵지 않지만, <strong>당첨 후 혼인신고가 핵심</strong>이에요.
      </p>

      <SectionBadge>진행 순서</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>당첨 후 혼인신고 못 하면 어떻게 되나요?</H2>
      <p style={body}>
        가장 큰 리스크예요. 입주 시점까지 혼인신고를 안 하면 아래와 같은 불이익이 있어요.
      </p>

      <SectionBadge>주의사항</SectionBadge>
      <BorderBox title="혼인신고 미완료 시 불이익">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li><strong>당첨 자격 박탈</strong>: 공급계약이 해제돼요</li>
          <li><strong>계약금 몰수 가능</strong>: 위약금으로 공제될 수 있어요</li>
          <li><strong>청약 제한</strong>: 일정 기간 청약 신청이 제한돼요</li>
          <li><strong>예비 배우자 주택 취득 금지</strong>: 혼인신고 전 배우자가 주택을 취득하면 무주택 요건 위반</li>
        </ul>
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="부동산 글 더보기" href="/w" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 일반적인 안내예요. 공고마다 세부 조건이 다를 수 있으니 해당 공고문을 반드시 확인하세요." />
    </ArticleLayout>
  );
}
