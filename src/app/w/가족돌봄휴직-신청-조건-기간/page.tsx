"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 부모님이 아파서 회사를 쉬어야 하는데 사직하지 않고 쉴 수 있는 방법을 찾는 직장인이에요.
// Q2. 가족돌봄휴직 신청 자격을 확인하고 회사에 신청서를 제출하는 행동.
// Q3. 대상 가족(부모·배우자·자녀·배우자 부모·조부모·손자녀), 기간(90일), 분할(30일 단위), 무급 원칙, 신청 절차.
// Q4. EligibilityChecker(대상 확인) + Steps(신청 절차) + GreenBox(핵심 요약) + BorderBox(비교) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const CHECK_ITEMS = [
  { id: "c1", label: "돌봄 대상이 부모, 배우자, 자녀, 배우자 부모, 조부모, 손자녀 중 하나다" },
  { id: "c2", label: "돌봄 사유가 질병, 사고, 노령 중 하나다" },
  { id: "c3", label: "현 직장에서 6개월 이상 근무했다" },
  { id: "c4", label: "올해 가족돌봄휴직 사용 일수가 90일 미만이다" },
];

const STEPS_DATA = [
  {
    title: "신청서 작성",
    desc: "가족돌봄휴직 신청서에 돌봄 대상 가족, 사유(질병·사고·노령), 휴직 시작일과 기간을 적어요.",
  },
  {
    title: "휴직 시작 30일 전 제출",
    desc: "회사(사업주)에게 최소 30일 전에 신청서를 제출해야 해요. 긴급한 경우에는 사유를 설명하고 기간을 단축할 수 있어요.",
    tip: "긴급 상황이면 30일 전 제출 요건이 완화될 수 있어요",
  },
  {
    title: "회사 승인 대기",
    desc: "회사는 정당한 사유 없이 거부할 수 없어요. 다만, 계속 근로 기간이 6개월 미만이거나 같은 자녀에 대해 배우자가 이미 휴직 중이면 거부 가능해요.",
  },
  {
    title: "휴직 시작",
    desc: "승인 후 정해진 날짜부터 휴직이 시작돼요. 최소 30일 단위로 사용하고, 연간 최대 90일까지 가능해요.",
  },
];

const FAQS = [
  {
    q: "가족돌봄휴직 중 급여를 받을 수 있나요?",
    a: "원칙적으로 무급이에요. 사업주가 임금을 지급할 의무는 없어요. 다만 회사 규정에 따라 유급으로 운영하는 곳도 있으니 취업규칙이나 단체협약을 확인해 보세요.",
  },
  {
    q: "형제자매를 돌보려고 쓸 수 있나요?",
    a: "안 돼요. 부모, 배우자, 자녀, 배우자 부모, 조부모, 손자녀만 대상이에요. 형제자매는 해당 안 돼요.",
  },
  {
    q: "30일씩 나눠서 쓸 수 있나요?",
    a: "네. 30일 + 30일 + 30일처럼 최소 30일 단위로 분할 사용 가능해요. 30일 미만으로 쪼개서 쓸 수는 없어요.",
  },
  {
    q: "회사가 거부하면 어떻게 하나요?",
    a: "정당한 사유 없이 거부하면 과태료 대상이에요. 고용노동부(1350)에 신고하세요. 다만 근속 6개월 미만 등 법정 거부 사유가 있으면 거절될 수 있어요.",
  },
  {
    q: "가족돌봄휴직 기간에 퇴직금은 어떻게 되나요?",
    a: "가족돌봄휴직 기간도 근속기간에 포함돼요. 퇴직금 산정, 연차 일수 가산에도 반영되니까 불이익은 없어요.",
  },
  {
    q: "가족돌봄휴가와 뭐가 다른가요?",
    a: "가족돌봄휴가는 연간 10일 단기 휴가(1일 단위 사용 가능)이고, 가족돌봄휴직은 최대 90일 장기 휴직(30일 단위)이에요. 사유와 대상은 동일해요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "남녀고용평등법 제22조의2 — 가족돌봄휴직", url: "https://www.law.go.kr/법령/남녀고용평등과일가정양립지원에관한법률" },
      { label: "고용노동부 — 가족돌봄 지원 제도", url: "https://www.moel.go.kr" },
      { label: "정부24 — 가족돌봄휴직 제도", url: "https://www.gov.kr/portal/service/serviceInfo/PTR000051336" },
    ],
  },
];

const RELATED = [
  { slug: "육아휴직-단축근무", title: "육아휴직 단축근무", description: "자녀 양육을 위한 근무시간 단축 제도예요." },
  { slug: "가족돌봄-근로시간-단축", title: "가족돌봄 근로시간 단축", description: "휴직 대신 근무시간을 줄일 수도 있어요." },
  { slug: "남성-배우자-출산휴가-신청", title: "배우자 출산휴가", description: "배우자 출산 시 쓸 수 있는 유급 휴가예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 가족돌봄 · 휴직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가족 아프면 회사 그만둬야 할까?<br />
        가족돌봄휴직 신청 조건과 기간
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부모님이 갑자기 아프셔서 "사직해야 하나" 고민 중이시죠. 그만두지 않아도 돼요.{" "}
        <a href="https://www.law.go.kr/법령/남녀고용평등과일가정양립지원에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법</a>에
        따라 연간 최대 90일까지 가족돌봄휴직을 쓸 수 있어요.
      </p>

      <Divider />

      <H2>내가 신청 가능한지 확인해요</H2>
      <p style={body}>
        네 가지 조건을 모두 충족하면 신청 가능해요. 회사는 정당한 사유 없이 거부할 수 없어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="가족돌봄휴직 신청 대상이에요! 아래 절차대로 회사에 신청하세요."
        partialMatchText="일부 조건이 안 맞으면 가족돌봄휴가(연 10일) 사용을 검토해 보세요."
      />

      <Divider />

      <H2>기간과 사용 방법</H2>
      <p style={body}>
        연간 최대 90일이고, 30일 단위로 나눠서 쓸 수 있어요.
      </p>

      <GreenBox title="가족돌봄휴직 핵심 정리">
        <strong>기간</strong>: 연간 최대 90일<br />
        <strong>분할 사용</strong>: 30일 단위로 나눠서 사용 가능 (30+30+30일)<br />
        <strong>급여</strong>: 원칙적으로 무급 (회사 규정에 따라 유급도 가능)<br />
        <strong>근속기간</strong>: 휴직 기간도 근속에 포함 (퇴직금·연차 불이익 없음)<br />
        <strong>대상 가족</strong>: 부모, 배우자, 자녀, 배우자 부모, 조부모, 손자녀
      </GreenBox>

      <p style={body}>
        무급이 부담스러우면{" "}
        <a href="/w/가족돌봄-근로시간-단축" style={{ color: "#1D9E75", textDecoration: "underline" }}>가족돌봄 근로시간 단축</a> 제도도 있어요. 완전히 쉬지 않고 근무시간만 줄이는 방법이에요.
      </p>

      <Divider />

      <H2>신청 절차</H2>
      <p style={body}>
        30일 전에 신청서를 제출하는 게 원칙이지만, 긴급한 경우엔 단축할 수 있어요.
      </p>

      <Steps steps={STEPS_DATA} />

      <BorderBox>
        <strong>가족돌봄휴직 vs 가족돌봄휴가 비교</strong><br /><br />
        가족돌봄<strong>휴직</strong>: 최대 90일, 30일 단위, 장기 돌봄용<br />
        가족돌봄<strong>휴가</strong>: 연 10일, 1일 단위, 단기 긴급용<br /><br />
        긴급 상황이면 가족돌봄휴가를 먼저 쓰고, 장기화되면 가족돌봄휴직으로 전환하세요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 남녀고용평등법을 기반으로 작성됐어요. 구체적인 사안은 고용노동부(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
