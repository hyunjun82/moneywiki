"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 의료비를 많이 썼는데 공제 한도가 얼마인지, 본인과 부양가족 한도가 다른지 궁금한 상황
// Q2. 내 의료비 공제 한도를 정확히 파악하고 한도 없는 대상인지 확인한다
// Q3. 총급여 3% 초과분 기준, 한도 없는 4가지 대상, 700만원 한도 대상, 산후조리원·난임 특례
// Q4. GreenBox(결론) + 비교 테이블(한도 있음/없음) + EligibilityChecker + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const ELIGIBILITY_ITEMS = [
  { id: "self", label: "본인이 직접 지출한 의료비가 있다" },
  { id: "senior", label: "만 65세 이상 부양가족의 의료비를 냈다" },
  { id: "disabled", label: "장애인 부양가족의 의료비를 냈다" },
  { id: "critical", label: "건강보험 산정특례자(암·중증질환)의 의료비를 냈다" },
  { id: "child6", label: "6세 이하 자녀의 의료비를 냈다 (2025년 귀속 신설)" },
  { id: "infertility", label: "난임 시술비를 지출했다" },
];

const FAQS = [
  {
    q: "의료비 공제는 소득 없는 배우자 것도 받을 수 있나요?",
    a: "네, 의료비는 특례로 소득 요건이 없어요. 소득 있는 배우자 의료비도 본인이 결제했으면 공제 대상이에요. 다만 기본공제와 달리 의료비 특례라는 점을 기억하세요.",
  },
  {
    q: "건강보험산정특례자 확인은 어떻게 해요?",
    a: "국민건강보험공단에서 산정특례 확인서를 발급받을 수 있어요. 암, 희귀질환, 중증질환 등으로 등록된 경우 해당돼요. 이 확인서를 연말정산 서류에 첨부하면 한도 없이 공제받아요.",
  },
  {
    q: "산후조리원비는 누구나 공제받을 수 있나요?",
    a: "총급여 7,000만원 이하 근로자만 가능해요. 출산 1회당 200만원 한도고, 7,000만원을 1원이라도 넘으면 아예 공제를 못 받으니 총급여를 꼭 확인하세요.",
  },
  {
    q: "난임 시술비 공제율이 일반 의료비와 다른가요?",
    a: "네, 2025년 귀속 기준 난임 시술비는 30% 공제율이에요. 일반 의료비 15%보다 2배나 높죠. 미숙아·선천성 이상아 의료비는 20%예요.",
  },
  {
    q: "미용·성형 비용도 의료비 공제 되나요?",
    a: "안 돼요. 쌍꺼풀, 코 성형, 지방 흡입 같은 미용 목적 시술은 의료비에서 제외돼요. 건강검진비는 공제되지만, 영양제나 건강식품 구입비는 해당 안 해요.",
  },
  {
    q: "6세 이하 의료비 한도 폐지는 언제부터예요?",
    a: "2025년 귀속(2026년 2월 연말정산)부터 적용돼요. 6세 이하 부양가족 의료비는 700만원 한도 없이 전액 공제 대상이에요.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법 제59조의4", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-의료비-세액공제", title: "연말정산 의료비 세액공제", description: "의료비 공제 대상 항목과 신청 방법." },
  { slug: "연말정산-맞벌이-절세-전략", title: "맞벌이 부부 연말정산 절세", description: "의료비 몰아주기 등 맞벌이 절세 팁." },
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 . 의료비 . 공제한도</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        의료비 공제한도, 누가 한도 없이 받나요?<br />
        대상별 한도와 공제율 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "병원비 많이 썼는데 700만원까지밖에 공제 안 된다고요?"
      </p>
      <p style={body}>
        대상에 따라 달라요. <strong>본인, 65세 이상, 장애인, 산정특례자</strong> 의료비는 한도 없이 전액 공제돼요.
        2025년 귀속부터는 <strong>6세 이하 자녀</strong>도 한도가 사라졌어요.
        일반 부양가족만 <strong>연 700만원 한도</strong>가 붙죠. 총급여의 3%를 초과한 금액이 공제 대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>한도 없는 대상 vs 700만원 한도, 한눈에 비교</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에 따라 의료비 공제 한도는 대상자별로 다르게 적용돼요.
      </p>

      <SectionBadge>대상별 공제 한도·공제율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>한도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제율</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["본인", "한도 없음", "15%"],
              ["65세 이상", "한도 없음", "15%"],
              ["장애인", "한도 없음", "15%"],
              ["건강보험 산정특례자", "한도 없음", "15%"],
              ["6세 이하 자녀 (2025~)", "한도 없음", "15%"],
              ["난임 시술비", "한도 없음", "30%"],
              ["미숙아·선천성이상아", "한도 없음", "20%"],
              ["그 외 부양가족", "연 700만원", "15%"],
              ["산후조리원", "출산 1회당 200만원", "15%"],
              ["안경·콘택트렌즈", "1인당 연 50만원", "15%"],
            ].map(([label, limit, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, background: "#fafafa" }}>{label}</td>
                <td style={{ padding: "10px 12px" }}>{limit}</td>
                <td style={{ padding: "10px 12px" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>내 의료비가 한도 없이 공제되는지 확인해 보세요</H2>
      <p style={body}>
        아래 항목 중 하나라도 해당하면 그 대상의 의료비는 700만원 한도 없이 전액 공제돼요.
      </p>

      <SectionBadge>한도 없는 대상 체크</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="해당하는 의료비는 모두 한도 없이 공제돼요!"
        partialMatchText="체크한 항목의 의료비는 한도 없이 공제돼요. 나머지 부양가족 의료비는 700만원 한도가 적용돼요."
      />

      <Divider />
      <ArticleAd position="mid" />

      <H2>총급여 3% 기준이 뭔가요?</H2>
      <p style={body}>
        의료비 공제는 <strong>총급여의 3%를 초과한 금액</strong>부터 시작해요. 총급여 5,000만원이면 150만원(5,000만 x 3%)이 기준선이에요. 의료비를 200만원 썼다면 150만원을 빼고 50만원이 공제 대상이 되는 거죠.
      </p>

      <GreenBox title="3% 기준 계산 예시">
        총급여 5,000만원, 의료비 400만원 지출 → 5,000만 x 3% = 150만원 → 400만 - 150만 = <strong>250만원이 공제 대상</strong> → 250만 x 15% = <strong>37.5만원 환급</strong>
      </GreenBox>

      <p style={body}>
        의료비가 총급여의 3%를 넘지 않으면 공제 자체가 안 돼요.
        <a href="/w/연말정산-맞벌이-절세-전략" style={{ color: "#1D9E75", textDecoration: "underline" }}>맞벌이 부부</a>라면 총급여가 낮은 쪽에 의료비를 몰아주는 게 유리한 이유가 바로 이 3% 기준 때문이에요.
      </p>

      <Divider />

      <H2>공제 안 되는 의료비도 챙겨두세요</H2>
      <p style={body}>
        병원에서 쓴 돈이라고 다 공제되는 건 아니에요. 아래 항목은 의료비 공제에서 빠져요.
      </p>

      <SectionBadge>제외 항목</SectionBadge>
      <BorderBox title="의료비 공제 제외 대상">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>미용·성형 목적 시술 (쌍꺼풀, 코성형, 지방흡입 등)</li>
          <li>건강증진 목적 지출 (영양제, 건강식품, 보양용 한약)</li>
          <li>간병인 비용</li>
          <li>외국 의료기관 지출 (국내 의료기관만 해당)</li>
          <li>보험회사에서 보전받은 금액</li>
        </ul>
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="연말정산 글 더보기" href="/w" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 일반적인 안내예요. 개인 상황에 따라 다를 수 있으니 정확한 세무 판단은 국세청(126) 또는 세무사와 상담하세요." />
    </ArticleLayout>
  );
}
