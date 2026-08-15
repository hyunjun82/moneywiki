"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 본인이나 가족이 국가유공자·참전유공자인데, 보훈급여금을 받을 수 있는지 대상 여부를 확인하고 신청하려는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 보훈급여금 대상 여부를 확인하고 보훈지청 방문 또는 정부24로 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 대상자 유형(국가유공자·참전유공자·유족 등), 신청 방법(보훈지청·정부24), 필요 서류, 조회 방법(1577-0606), 지급일(매월 25일경).
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → EligibilityChecker(대상 확인) + Steps(신청 절차) + BorderBox(조회 방법) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const ELIGIBILITY_ITEMS = [
  { id: "veteran", label: "국가유공자(전상·공상·순직군경 등)로 등록되어 있어요" },
  { id: "independence", label: "독립유공자 또는 그 유족이에요" },
  { id: "war", label: "참전유공자(6·25전쟁, 베트남전쟁)예요" },
  { id: "compensation", label: "보훈보상대상자(재해부상군경 등)예요" },
  { id: "family", label: "국가유공자 사망 후 배우자·부모·자녀로서 유족이에요" },
  { id: "agent", label: "고엽제 후유의증 환자예요" },
];

const STEPS = [
  { title: "대상 여부 확인", desc: "보훈상담센터 1577-0606에 전화해서 본인이 보훈급여금 대상인지 먼저 확인해요. 평일 오전 9시~오후 6시 운영돼요." },
  { title: "보훈지청 방문 예약", desc: "신규 등록은 대면 심사가 필요해요. 가까운 보훈지청 위치는 국가보훈부 홈페이지에서 찾을 수 있어요." },
  { title: "서류 준비", desc: "신분증, 병적증명서(군 복무자), 진단서(상이 인정용), 가족관계증명서(유족 신청 시)를 준비해요." },
  { title: "신청서 제출", desc: "보훈지청에서 담당자가 서류 안내부터 접수까지 도와줘요. 정보 변경이나 서류 발급은 정부24에서 온라인으로도 가능해요." },
  { title: "심사 및 결정", desc: "접수 후 보통 1~3개월 정도 걸려요. 등록 결정 후 해당 급여금 지급 요건을 충족하면 신청한 달 또는 다음 달부터 지급돼요." },
];

const FAQS = [
  { q: "보훈급여금 신청하면 얼마나 걸리나요?", a: "보훈지청 접수 후 보통 1~3개월 정도 걸려요. 서류 보완이 필요하면 더 걸릴 수 있어요. 이미 등록된 유공자라면 급여금은 자동 지급돼요." },
  { q: "보훈급여금 매달 언제 입금되나요?", a: "매월 25일경에 입금돼요. 주말이나 공휴일이면 그 전 영업일에 들어와요." },
  { q: "유족도 보훈급여금 받을 수 있나요?", a: "네, 국가유공자 사망 시 배우자가 1순위, 부모가 2순위, 자녀(25세 미만 또는 장애)가 3순위로 유족 보상금을 받을 수 있어요." },
  { q: "정부24에서 온라인 신청할 수 있나요?", a: "간단한 정보 변경이나 서류 발급은 온라인으로 가능하지만, 신규 국가유공자 등록은 대면 심사가 필수라서 보훈지청 방문이 필요해요." },
  { q: "추가 수당도 받을 수 있나요?", a: "기본 보상금 외에 생활조정수당(월 24~37만원), 부양가족수당(1인당 월 4.6만원), 간호수당(월 54~83만원) 등 추가 수당이 있어요. 해당 여부는 1577-0606에 문의하세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국가보훈부 — 보훈급여금 안내", url: "https://www.mpva.go.kr" },
      { label: "정부24 — 보훈 민원 서비스", url: "https://www.gov.kr" },
      { label: "국가유공자법 — 법제처", url: "https://www.law.go.kr/법령/국가유공자등예우및지원에관한법률" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 보훈</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보훈급여금, 누가 받을 수 있을까?<br />
        대상 확인부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "나도 보훈급여금 받을 수 있나?" 궁금하시죠. 국가를 위해 헌신하신 분들과 유족분들이 받을 수 있는 보상금이에요.
        대상 여부 확인하고 신청하는 방법을 순서대로 정리했어요.
      </p>

      <Divider />

      <H2>보훈급여금 대상, 누가 받나요?</H2>
      <p style={body}>
        보훈급여금은 <a href="https://www.mpva.go.kr" style={{ color: "#1D9E75" }}>국가보훈부</a>에서 지급하는 보상금이에요.
        국가를 위해 희생하거나 공헌한 분들과 유족이 대상이에요.
        이미 국가유공자로 등록되어 있으면 급여금은 자동으로 나오고, 신규 등록이 필요한 경우에만 별도 신청이 필요해요.
      </p>

      <SectionBadge>대상 여부 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="보훈급여금 대상에 해당될 가능성이 높아요. 보훈상담센터 1577-0606에서 정확한 대상 여부를 확인하세요."
        partialMatchText="일부 항목에 해당돼요. 보훈지청에 방문하면 정확한 대상 여부와 급여금 종류를 안내받을 수 있어요."
      />

      <Divider />

      <H2>신청 절차, 이렇게 진행돼요</H2>
      <p style={body}>
        가장 확실한 방법은 보훈지청 방문 신청이에요. 담당자가 서류 안내부터 접수까지 도와줘요.
        전국에 지방보훈청 5곳, 보훈지청 40곳 이상 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수급 상태와 금액 조회하는 방법</H2>
      <p style={body}>
        내가 얼마 받는지, 언제 입금되는지 궁금하면 세 가지 방법으로 조회할 수 있어요.
      </p>

      <BorderBox>
        조회 방법 3가지예요.<br />
        · <strong>보훈상담센터 1577-0606</strong>: 전화하면 상담원이 수급 상태, 금액, 입금 예정일을 안내해줘요 (평일 9시~18시)<br />
        · <strong>정부24</strong>: 로그인 후 '나의 서비스' → '보훈' 메뉴에서 확인할 수 있어요<br />
        · <strong>보훈지청 방문</strong>: 복잡한 문의나 서류 발급이 필요하면 직접 방문이 확실해요
      </BorderBox>

      <p style={body}>
        보훈급여금은 매월 25일경에 입금돼요. 25일이 주말이나 공휴일이면 그 전 영업일에 들어와요.
        기본 보상금 외에 생활조정수당, 부양가족수당, 간호수당 같은 추가 수당도 있으니 해당 여부를 꼭 확인하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국가보훈부 및 정부24 자료를 바탕으로 작성됐어요. 보훈급여금 금액은 매년 변경될 수 있으니 국가보훈부 홈페이지에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
