"use client";
// Q1. 회사가 사실상 도산했는데 체불임금·퇴직금을 받으려면 도산등사실인정을 받아야 한다는데 어떻게 신청하는지 모르는 상황.
// Q2. 고용노동부에 도산등사실인정 신청서를 제출하고, 체당금을 받을 수 있어야 해요.
// Q3. 도산등사실인정 = 법원 파산 없이도 체당금 받는 경로, 신청 대상(6개월 이상 임금 체불 등), 필요 서류, 고용노동부 신청, 체당금(최대 1천만원).
// Q4. GreenBox(핵심 요약) + Steps(신청 절차) + DocTable(필요 서류) + BorderBox(체당금 한도) + FAQ
// MAP-INTRO: 회사가 사실상 문 닫았는데 체불임금을 받으려면 도산등사실인정이 필요하다는데 어떻게 하는지 모르겠음
// MAP-TYPE: 절차
// MAP-H2: 도산등사실인정이란 > 신청 절차 > 필요 서류 > 체당금 한도 > FAQ
// MAP-COMP: GreenBox > Steps > DocTable > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, DocTable, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "관할 고용노동청 확인", desc: "회사 소재지 관할 지방고용노동청(관서)을 확인하세요. 고용노동부 홈페이지에서 검색할 수 있어요." },
  { title: "도산등사실인정 신청서 작성", desc: "신청서에 회사 정보, 체불 임금 내역, 도산 사유를 기재하세요." },
  { title: "증빙 서류 첨부", desc: "근로계약서, 임금 체불 확인서, 사업장 폐쇄 증빙 등을 함께 제출하세요." },
  { title: "고용노동청에 제출", desc: "방문 또는 우편으로 제출해요. 접수 후 조사관이 사실관계를 확인해요.", tip: "온라인 제출도 일부 관서에서 가능해요" },
  { title: "인정 결정 후 체당금 신청", desc: "도산등사실인정이 나오면 근로복지공단에 체당금을 신청하세요. 보통 1~2개월 소요돼요." },
];

const DOCS = [
  { name: "도산등사실인정 신청서", required: true, where: "고용노동부 양식" },
  { name: "근로계약서", required: true, where: "본인 보관분" },
  { name: "임금 체불 확인서", required: true, where: "고용노동청 발급" },
  { name: "급여 명세서 또는 통장 거래내역", required: true, where: "본인 보관분" },
  { name: "사업장 폐쇄 증빙", required: false, where: "사진, 공고문 등" },
  { name: "신분증 사본", required: true, where: "본인" },
];

const FAQS = [
  { q: "도산등사실인정이 뭔가요?", a: "법원에 파산 신청을 하지 않아도 사실상 회사가 망한 것을 고용노동부가 인정해주는 제도예요. 이걸 받으면 국가가 대신 체불임금을 지급(체당금)해줘요." },
  { q: "체당금은 얼마까지 받나요?", a: "퇴직 당시 연령에 따라 다르지만, 임금·퇴직금·휴업수당 합산 최대 1천만원(일반)이에요. 30세 미만은 한도가 좀 낮아요." },
  { q: "회사가 정식으로 파산하지 않아도 되나요?", a: "네, 도산등사실인정은 법원 파산 절차 없이도 가능해요. 회사가 6개월 이상 임금을 못 줬거나, 사실상 폐업 상태면 돼요." },
  { q: "신청 기간 제한이 있나요?", a: "퇴직일로부터 2년 이내에 신청해야 해요. 기한을 넘기면 체당금을 받을 수 없어요." },
  { q: "신청부터 체당금 수령까지 얼마나 걸리나요?", a: "도산등사실인정까지 1~2개월, 체당금 지급까지 추가 1개월 정도 걸려요. 총 2~3개월 예상하세요." },
];

const REFS = [
  { category: "법령·기관", items: [
    { label: "임금채권보장법", url: "https://www.law.go.kr/법령/임금채권보장법" },
    { label: "고용노동부", url: "https://www.moel.go.kr" },
    { label: "근로복지공단", url: "https://www.comwel.or.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 체당금 · 도산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        도산등사실인정, 어떻게 신청하나요?<br />
        필요 서류와 체당금 수령까지
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 사실상 문을 닫았는데 밀린 임금을 못 받고 있나요?
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75" }}>임금채권보장법</a>에 따라
        고용노동부에 도산등사실인정을 신청하면 국가가 대신 체불임금을 지급(체당금)해줘요. 법원 파산 없이도 가능해요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>도산등사실인정이 뭔가요?</H2>
      <p style={body}>회사가 법원에 파산 신청을 하지 않았어도 사실상 망한 상태면, 고용노동부가 이를 인정해주는 제도예요. 인정받으면 근로복지공단에서 체당금(미지급 임금·퇴직금)을 대신 지급해줘요.</p>
      <GreenBox title="핵심 요약">대상: 6개월 이상 임금 체불 또는 사실상 폐업 | 신청처: 관할 지방고용노동청 | 체당금: 임금+퇴직금+휴업수당 합산 최대 1천만원 | 기한: 퇴직일로부터 2년 이내</GreenBox>
      <Divider />
      <H2>어떻게 신청하나요?</H2>
      <p style={body}>관할 고용노동청에 신청서와 증빙 서류를 제출해요. 인정까지 1~2개월, 체당금 지급까지 추가 1개월 정도 걸려요.</p>
      <Steps steps={APPLY_STEPS} />
      <Divider />
      <H2>어떤 서류가 필요한가요?</H2>
      <p style={body}>아래 서류를 준비해서 제출하세요. 임금 체불 확인서는 고용노동청에서 진정(신고) 후 발급받을 수 있어요.</p>
      <DocTable docs={DOCS} />
      <Divider />
      <H2>체당금은 얼마까지 받을 수 있나요?</H2>
      <p style={body}>퇴직 당시 연령에 따라 한도가 달라요. 임금·퇴직금·휴업수당을 합산해서 지급돼요.</p>
      <BorderBox title="체당금 한도 (2026년 기준)">30세 미만: 월 220만원 한도 | 30~40세: 월 310만원 한도 | 40세 이상: 월 350만원 한도 | 총 한도: 최대 1천만원 (임금+퇴직금+휴업수당 합산)</BorderBox>
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 임금채권보장법 정보를 바탕으로 작성됐어요. 체당금 한도와 절차는 변경될 수 있으니 고용노동부(1350)에 확인하세요." />
    </div>
  );
}
