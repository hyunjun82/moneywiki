"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 월급이나 퇴직금을 못 받아서 근로감독관에게 신고하려는데 방법을 모르는 상황
// Q2. 고용노동부 민원마당에서 온라인 진정을 접수하고, 처리 결과를 받는다
// Q3. 신고 대상(임금체불·부당해고), 온라인/방문 절차, 필요 증빙, 처리 기간(25일), 불응 시 제재
// Q4. Steps(신고 절차) + DocTable(서류) + GreenBox(처리 경로 요약) + BorderBox(제재) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "고용노동부 민원마당에 접속하세요",
    desc: "minwon.moel.go.kr에서 '임금체불 진정' 또는 '근로기준 진정'을 검색해요. 공동인증서나 간편인증으로 본인 인증을 하면 진정서 양식이 나와요.",
    link: { label: "민원마당 바로가기", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "진정서를 작성하세요",
    desc: "사업장명, 사업주 성명, 위반 내용(체불 임금, 부당해고 등), 피해 금액을 입력해요. 증빙 자료가 있으면 첨부하지만, 없어도 접수는 가능해요.",
    tip: "카카오톡 대화, 녹음, 문자도 증빙으로 제출 가능해요",
  },
  {
    title: "담당 근로감독관이 배정돼요",
    desc: "접수 후 약 2주 이내에 담당 근로감독관이 배정되고 문자로 안내가 와요. 감독관이 사업주에게 출석 요구서를 보내서 조사를 시작해요.",
  },
  {
    title: "조사 결과를 받으세요",
    desc: "처리 기간은 접수일로부터 25일 이내가 원칙이에요. 시정지시(14일 내 임금 지급), 검찰 송치, 각하 중 하나의 결과가 나와요. 진행 상황은 민원마당 '내 민원 조회'에서 확인 가능해요.",
  },
];

const DOCS = [
  { name: "진정서 (온라인 작성)", required: true, where: "민원마당에서 직접 작성" },
  { name: "근로계약서", required: false, where: "사본 첨부" },
  { name: "임금명세서 / 통장 내역", required: false, where: "체불액 입증용" },
  { name: "카카오톡 대화 캡처", required: false, where: "임금 요구 증빙" },
  { name: "녹음 파일 / 문자 메시지", required: false, where: "근무 사실 증빙" },
];

const FAQS = [
  { q: "신고하면 회사에서 내가 신고한 걸 알게 되나요?", a: "네, 알게 돼요. 근로감독관이 사업주를 조사하면서 진정 내용을 통보해요. 익명 신고는 불가능하지만, 신고를 이유로 불이익을 주면 부당노동행위로 추가 처벌받아요." },
  { q: "증거가 하나도 없어도 신고할 수 있나요?", a: "네, 가능해요. 진정서만 제출하면 근로감독관이 직접 사업주를 조사해요. 국민연금 가입 이력으로 근무 사실을 확인하고, 사업주에게 임금대장 제출을 요구해요." },
  { q: "신고 후 얼마나 걸리나요?", a: "처리 기간은 접수일로부터 25일 이내가 원칙이에요. 1회 연장이 가능해서 최대 50일까지 걸릴 수 있어요. 임금체불은 우선 처리돼서 보통 더 빠르게 진행돼요." },
  { q: "회사가 시정지시를 받고도 안 주면 어떻게 되나요?", a: "검찰에 송치돼요. 근로기준법 제109조에 따라 3년 이하 징역 또는 3천만원 이하 벌금형이에요. 고용노동부 임금체불 사업주 명단에 공개되고, 공공기관 입찰 제외도 받을 수 있어요." },
  { q: "회사가 망해서 돈이 없으면 어떻게 하나요?", a: "임금채권보장기금에서 대신 지급받을 수 있어요. 노동청 확인서를 받아 근로복지공단에 신청하면 최대 1,200만원까지 국가가 지급해 줘요. 퇴직금, 최종 3개월 임금, 휴업수당이 포함돼요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "근로기준법", url: "https://www.law.go.kr/법령/근로기준법" },
    { label: "근로감독관집무규정", url: "https://www.law.go.kr/행정규칙/근로감독관집무규정" },
  ]},
  { category: "정부 안내", items: [
    { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
    { label: "고용노동부 노동포털", url: "https://labor.moel.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 임금체불</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        월급이나 퇴직금 못 받았다면?<br />
        근로감독관 진정 신고 방법과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 월급을 안 주거나 퇴직금을 못 받고 있으면 어디에 신고해야 할지 막막하시죠?
      </p>
      <p style={body}>
        <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인으로 근로감독관에게 진정을 접수하면 돼요. 10분이면 신고가 끝나고, 접수 후 25일 이내에 처리 결과가 나와요. 증빙 서류가 없어도 접수 가능해요.
      </p>

      <Divider />

      <H2>어떤 경우에 신고할 수 있나요?</H2>
      <p style={body}>
        근로감독관은 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a> 위반 사항을 조사하고 처벌하는 노동 경찰이에요.
        임금체불이 가장 많고, 부당해고, 근로조건 위반도 신고 대상이에요.
      </p>

      <GreenBox title="신고 가능한 주요 사례">
        {"· 임금체불: 월급, 퇴직금, 연차수당, 주휴수당 미지급\n· 부당해고: 정당한 이유 없는 해고, 해고 예고 미실시\n· 근로조건 위반: 주 52시간 초과, 야간수당 미지급, 근로계약서 미교부\n· 4대보험 미가입"}
      </GreenBox>

      <p style={body}>
        부당해고의 경우 근로감독관 진정과 별도로 <a href="/w/부당해고-구제-신청-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동위원회 구제신청</a>도 함께 진행할 수 있어요.
      </p>

      <Divider />

      <H2>온라인 진정 접수는 이렇게 해요</H2>
      <p style={body}>
        온라인이 가장 빠르고 간편해요. 사업장 소재지 관할 지방고용노동청에 방문 접수하거나 우편으로도 가능하지만, 처리 속도는 온라인이 유리하죠.
      </p>

      <SectionBadge>접수 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>증빙 서류, 뭘 준비하면 좋을까요?</H2>
      <p style={body}>
        필수 서류는 진정서뿐이에요. 증빙은 있으면 조사가 빨라지지만, 없어도 근로감독관이 직접 사업주를 조사해요.
      </p>

      <SectionBadge>증빙 자료 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>조사 결과는 어떻게 나오나요?</H2>
      <p style={body}>
        근로감독관 조사 결과는 세 가지 경로 중 하나로 처리돼요.
      </p>

      <BorderBox>
        <strong>조사 결과 3가지 경로</strong>{"\n"}
        {"· 시정지시: 위반 확인 → 14일 내 임금 지급 명령 (대부분 여기서 해결)\n· 검찰 송치: 시정지시 불이행 or 악의적 체불 → 3년 징역 / 3천만원 벌금\n· 각하: 위반 사실 없음 → 민사소송으로 전환 가능"}
      </BorderBox>

      <p style={body}>
        <a href="/w/퇴직금-미지급-신고-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급</a> 사건은 지연이자(연 20%)도 함께 청구할 수 있어요. 14일 지급기한이 지나면 자동으로 이자가 붙거든요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로감독관집무규정에 따라 작성됐어요. 구체적인 사건은 고용노동부 상담센터(1350)에 문의하세요." />
    </div>
  );
}
