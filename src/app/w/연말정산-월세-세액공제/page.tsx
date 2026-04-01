"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 월세 살고 있는 직장인인데 연말정산에서 세금 혜택이 있는지 궁금한 상황이에요.
// Q2. 본인이 월세 세액공제 대상인지 확인하고, 서류를 준비해서 신청하는 행동.
// Q3. 공제 조건(무주택·총급여·면적), 공제율(17%/15%), 한도(1,000만원), 필요 서류, 소득공제 전환 방법.
// Q4. EligibilityChecker(대상 확인) + GreenBox(공제율 요약) + Steps(신청 절차) + DocTable(서류) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";
import { DocTable } from "@/components/article-ui/DocTable";

const CHECK_ITEMS = [
  { id: "c1", label: "무주택 세대의 세대주 또는 세대원이다" },
  { id: "c2", label: "총급여 8,000만원 이하 (종합소득 7,000만원 이하)다" },
  { id: "c3", label: "전입신고가 되어 있다 (주민등록 주소 = 계약서 주소)" },
  { id: "c4", label: "전용면적 85m2 이하 또는 기준시가 4억원 이하 주택이다" },
  { id: "c5", label: "임대차계약서상 본인 명의로 계약했다" },
];

const DOCS = [
  { name: "주민등록표등본", required: true, where: "정부24 (gov.kr) 또는 주민센터" },
  { name: "임대차계약서 사본", required: true, where: "본인 보관본 복사" },
  { name: "월세 이체 증빙", required: true, where: "은행 앱 → 이체 내역 출력" },
  { name: "무통장입금증 (현금 납부 시)", required: false, where: "은행 창구 발급" },
];

const STEPS_DATA = [
  {
    title: "공제 대상 확인",
    desc: "무주택 세대주(또는 세대원), 총급여 8,000만원 이하, 전용면적 85m2 이하 또는 기준시가 4억원 이하 주택이면 대상이에요.",
  },
  {
    title: "서류 3가지 준비",
    desc: "주민등록표등본, 임대차계약서 사본, 월세 이체 증빙(계좌이체 내역)을 준비해요. 현금 납부했으면 무통장입금증도 필요해요.",
  },
  {
    title: "회사에 제출",
    desc: "연말정산 기간에 회사 인사팀에 서류를 제출하면 돼요. 집주인 동의는 필요 없어요. 홈택스 간소화 서비스에서는 자동 반영 안 되니까 직접 제출해야 해요.",
    tip: "집주인 동의 없이 신청 가능해요",
  },
];

const FAQS = [
  {
    q: "월세 얼마까지 공제받을 수 있나요?",
    a: "연간 월세 1,000만원까지 공제 대상이에요. 월세가 그 이상이어도 1,000만원까지만 인정돼요. 2025년 귀속부터 한도가 750만원에서 1,000만원으로 올랐어요.",
  },
  {
    q: "집주인 동의 필요한가요?",
    a: "아니에요. 집주인 동의 없이도 공제받을 수 있어요. 임대차계약서와 이체 증빙만 있으면 돼요. 집주인이 반대해도 공제 신청하는 데 문제없어요.",
  },
  {
    q: "세액공제 대신 소득공제로 받을 수도 있나요?",
    a: "네. 총급여 8,000만원 초과자는 세액공제가 안 되지만, 현금영수증 발급받아서 신용카드 소득공제(30%)로 받을 수 있어요. 국세청 126에 전화해서 현금영수증 발급 요청하면 돼요.",
  },
  {
    q: "전입신고 안 하면 어떻게 되나요?",
    a: "공제를 못 받아요. 주민등록상 주소지와 임대차계약서 주소가 같아야 해요. 전입신고를 안 했다면 지금이라도 하세요.",
  },
  {
    q: "반전세도 월세 세액공제가 되나요?",
    a: "네. 보증금과 별도로 월세를 내고 있다면 그 월세 부분에 대해 공제받을 수 있어요.",
  },
  {
    q: "올해 이사했으면 어떻게 하나요?",
    a: "이사 전 집과 이사 후 집의 월세를 각각 합산해서 공제받을 수 있어요. 양쪽 임대차계약서와 이체 증빙을 모두 제출하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "국세청 — 월세액 세액공제", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40613&cntntsId=239025" },
      { label: "소득세법 제59조의4 — 특별세액공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "홈택스 연말정산 간소화", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-주택담보대출-이자", title: "주택담보대출 이자 공제", description: "주담대 이자도 소득공제받을 수 있어요." },
  { slug: "연말정산-세액공제", title: "연말정산 세액공제", description: "세액공제 항목을 한눈에 정리했어요." },
  { slug: "연말정산-신용카드-공제-한도", title: "신용카드 소득공제", description: "신용카드·체크카드 공제 한도와 전략이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 세액공제 · 월세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        월세 내면 세금 돌려받을 수 있을까?<br />
        세액공제 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월세 내고 있다면 연말정산에서 최대 17%를 돌려받을 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에
        따라 무주택 세대주이고 총급여 8,000만원 이하면 대상이에요. 2025년 귀속부터 한도도 1,000만원으로 올랐어요.
      </p>

      <Divider />

      <H2>공제 대상인지 먼저 확인해요</H2>
      <p style={body}>
        다섯 가지 조건을 모두 충족해야 월세 세액공제를 받을 수 있어요. 하나라도 안 되면 세액공제는 안 되지만, 소득공제(현금영수증)로 전환할 수 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="월세 세액공제 대상이에요! 아래 서류를 준비해서 회사에 제출하세요."
        partialMatchText="일부 조건이 안 맞으면 현금영수증 소득공제(30%)로 전환할 수 있어요."
      />

      <Divider />

      <H2>공제율과 한도는 얼마나 되나요?</H2>
      <p style={body}>
        총급여에 따라 공제율이 달라져요. 연간 월세 1,000만원까지 공제 대상이에요.
      </p>

      <SectionBadge>2025년 귀속 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>총급여</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>공제율</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>최대 환급액</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "9px 12px" }}>5,500만원 이하</td>
              <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>17%</td>
              <td style={{ padding: "9px 12px", textAlign: "right" }}>170만원</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee", background: "#fafafa" }}>
              <td style={{ padding: "9px 12px" }}>5,500만원 초과 ~ 8,000만원 이하</td>
              <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>15%</td>
              <td style={{ padding: "9px 12px", textAlign: "right" }}>150만원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <GreenBox title="계산 예시">
        월세 60만원 × 12개월 = 연 720만원<br />
        총급여 4,000만원 → 720만원 × 17% = <strong>약 122만원 환급</strong><br />
        총급여 7,000만원 → 720만원 × 15% = <strong>약 108만원 환급</strong>
      </GreenBox>

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        홈택스 간소화 서비스에서 자동으로 반영되지 않아요. 서류를 직접 준비해서 회사에 제출해야 해요.
      </p>

      <Steps steps={STEPS_DATA} />

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 소득세법 기준으로 작성됐어요. 공제율·한도는 법 개정 시 변경될 수 있으니 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
