"use client";
// Q1. 기본공제 외에 추가로 받을 수 있는 공제가 있는지, 부모님·장애인 자녀 때문에 추가 절세하고 싶은 상황
// Q2. 추가공제 4종류(경로우대·장애인·부녀자·한부모)의 금액과 조건을 파악해서 빠짐없이 신청한다
// Q3. 각 공제 금액과 요건, 중복 적용 가능/불가, 세법상 장애인(중증환자) 포함, 부녀자 소득 요건
// Q4. GreenBox(요약표) + BorderBox(세부 조건) + EligibilityChecker + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const ELIGIBILITY_ITEMS = [
  { id: "senior", label: "기본공제 대상자 중 만 70세 이상인 분이 있다" },
  { id: "disabled", label: "기본공제 대상자 중 장애인(세법상 장애인 포함)이 있다" },
  { id: "woman_spouse", label: "본인이 여성이고 배우자가 있으며 종합소득 3,000만원 이하다" },
  { id: "woman_head", label: "본인이 여성 세대주이고 부양가족이 있으며 종합소득 3,000만원 이하다" },
  { id: "single_parent", label: "배우자 없이 기본공제 대상 자녀를 양육하고 있다" },
];

const FAQS = [
  {
    q: "추가공제는 기본공제와 별도로 받는 건가요?",
    a: "네, 기본공제(1인당 150만원) 위에 추가로 받는 소득공제예요. 예를 들어 70세 부모님이면 기본공제 150만원 + 경로우대 100만원 = 총 250만원이 공제돼요.",
  },
  {
    q: "부녀자 공제와 한부모 공제를 둘 다 받을 수 있나요?",
    a: "안 돼요. 둘 다 해당되면 금액이 더 큰 한부모 공제(100만원)만 자동 적용돼요. 부녀자 공제(50만원)는 빠져요.",
  },
  {
    q: "중증환자(암, 치매)도 장애인 공제 대상인가요?",
    a: "네, 세법상 장애인에 해당돼요. 병원에서 장애인증명서를 발급받으면 장애인등록증 없어도 추가공제 200만원을 받을 수 있어요. 항시 치료가 필요한 중증질환자가 대상이에요.",
  },
  {
    q: "70세 이상 장애인 부모님이면 얼마 공제되나요?",
    a: "기본공제 150만원 + 경로우대 100만원 + 장애인 200만원 = 총 450만원이에요. 세율 24%면 108만원이나 절세돼요.",
  },
  {
    q: "부녀자 공제의 소득 3,000만원 기준이 뭔가요?",
    a: "총급여가 아니라 종합소득금액 기준이에요. 총급여에서 근로소득공제를 뺀 금액이 3,000만원 이하여야 해요. 총급여로 따지면 대략 4,150만원 정도까지 해당돼요.",
  },
  {
    q: "장애인 추가공제는 나이 제한이 없나요?",
    a: "네, 장애인은 나이 요건이 면제돼요. 만 20세 넘은 성인 자녀도 장애인이면 기본공제 + 장애인 추가공제를 받을 수 있어요. 직계비속의 20세 이하 나이 요건이 적용 안 돼요.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법 제51조", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-기본공제", title: "연말정산 기본공제 대상", description: "부양가족 기본공제 요건과 소득 기준." },
  { slug: "연말정산-장애인-공제", title: "연말정산 장애인 공제", description: "장애인 공제 범위와 세법상 장애인 기준." },
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 . 인적공제 . 추가공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기본공제 외에 더 받을 수 있는 건?<br />
        추가공제 4종류 금액과 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "부모님이 70세 넘으셨는데 추가 공제가 있다던데요?"
      </p>
      <p style={body}>
        네, <a href="/w/연말정산-기본공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>기본공제</a> 150만원에 더해서 받을 수 있는 <strong>추가공제 4종류</strong>가 있어요.
        경로우대 <strong>100만원</strong>, 장애인 <strong>200만원</strong>, 부녀자 <strong>50만원</strong>, 한부모 <strong>100만원</strong>이에요.
        해당 요건만 맞으면 중복으로도 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>추가공제 4종류, 얼마씩 공제되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제51조</a>에 따라 기본공제 대상자 중 특별한 상황에 해당하면 추가 소득공제를 받아요.
      </p>

      <SectionBadge>추가공제 금액표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>종류</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>절세(세율 24%)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["경로우대", "100만원", "만 70세 이상", "24만원"],
              ["장애인", "200만원", "장애인(세법상 포함)", "48만원"],
              ["부녀자", "50만원", "배우자 있는 여성 / 부양가족 있는 여성 세대주", "12만원"],
              ["한부모", "100만원", "배우자 없이 자녀 양육", "24만원"],
            ].map(([type, amount, target, save], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, background: "#fafafa" }}>{type}</td>
                <td style={{ padding: "10px 12px", color: "#1D9E75", fontWeight: 600 }}>{amount}</td>
                <td style={{ padding: "10px 12px" }}>{target}</td>
                <td style={{ padding: "10px 12px" }}>{save}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="최대 공제 예시: 75세 장애인 어머니">
        기본공제 150만원 + 경로우대 100만원 + 장애인 200만원 = <strong>총 450만원 소득공제</strong>. 세율 24%면 <strong>108만원 절세</strong>.
      </GreenBox>

      <Divider />

      <H2>내가 받을 수 있는 추가공제는?</H2>
      <p style={body}>
        해당하는 항목을 체크해 보세요. 여러 개 해당되면 중복으로 받을 수 있어요 (부녀자+한부모만 중복 불가).
      </p>

      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="해당하는 추가공제를 모두 받을 수 있어요! (단, 부녀자+한부모는 한부모만 적용)"
        partialMatchText="체크한 항목에 해당하는 추가공제를 받을 수 있어요."
      />

      <Divider />
      <ArticleAd position="mid" />

      <H2>중복 적용 가능한 조합은?</H2>
      <p style={body}>
        대부분의 조합은 중복 가능해요. 유일하게 <strong>부녀자와 한부모만 중복 불가</strong>예요.
      </p>

      <SectionBadge>중복 가능 여부</SectionBadge>
      <BorderBox title="조합별 중복 적용">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>경로우대 + 장애인: <strong>가능</strong> (300만원)</li>
          <li>경로우대 + 부녀자: <strong>가능</strong> (150만원)</li>
          <li>장애인 + 부녀자: <strong>가능</strong> (250만원)</li>
          <li>장애인 + 한부모: <strong>가능</strong> (300만원)</li>
          <li>부녀자 + 한부모: <strong>불가</strong> → 한부모(100만원)만 적용</li>
        </ul>
      </BorderBox>

      <Divider />

      <H2>세법상 장애인, 장애인등록증 없어도 돼요</H2>
      <p style={body}>
        암, 치매, 중풍, 만성신부전 등 <strong>항시 치료가 필요한 중증질환자</strong>도 세법상 장애인에 해당돼요.
        병원에서 <strong>장애인증명서</strong>를 발급받으면 장애인등록증 없이도 추가공제 200만원을 받을 수 있어요.
      </p>
      <p style={body}>
        나이 요건도 면제돼요. 만 20세가 넘은 성인 자녀도 장애인이면 기본공제 + 장애인 추가공제를 받을 수 있고,
        <a href="/w/연말정산-장애인-공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인 의료비·교육비 공제</a>도 한도 없이 가능해요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="연말정산 글 더보기" href="/w" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 일반적인 안내예요. 개인 상황에 따라 다를 수 있으니 국세청(126) 또는 세무사와 상담하세요." />
    </ArticleLayout>
  );
}
