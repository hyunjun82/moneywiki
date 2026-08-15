"use client";
// Q1. 공인중개사 시험에 합격했는데 바로 사무소를 열 수 있는지, 어떤 절차를 거쳐야 하는지 궁금한 상황.
// Q2. 실무교육 이수부터 중개사무소 개설등록까지 전체 절차를 파악하고 시작할 수 있어야 해요.
// Q3. 실무교육 이수(28~32시간), 중개사무소 개설등록(관할 시군구청), 공제(보증보험 가입), 사무소 요건, 등록 서류.
// Q4. Steps(개업 절차) + DocTable(필요 서류) + GreenBox(핵심 요약) + Checklist(개업 준비 체크) + FAQ
// MAP-INTRO: 공인중개사 시험 합격했는데 바로 사무소 열 수 있는지 궁금
// MAP-TYPE: 절차
// MAP-H2: 개업까지 전체 절차 > 실무교육 > 필요 서류 > 보증보험 > 준비 체크리스트 > FAQ
// MAP-COMP: Steps > BorderBox > DocTable > GreenBox > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, DocTable, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const OPEN_STEPS = [
  { title: "실무교육 이수", desc: "한국공인중개사협회에서 28~32시간 실무교육을 받아야 해요. 자격증만으로는 개업이 안 돼요.", tip: "온라인+오프라인 혼합 과정이에요" },
  { title: "사무소 확보", desc: "건축물대장 기준 사무실 용도여야 해요. 주거용은 안 돼요. 임대차 계약 후 사업자등록증을 발급받으세요." },
  { title: "보증보험 가입", desc: "한국공인중개사협회 공제 또는 보증보험에 가입해야 해요. 개인 사무소는 1억원, 법인은 2억원 이상이에요." },
  { title: "중개사무소 개설등록 신청", desc: "관할 시·군·구청 부동산 담당부서에 개설등록 신청서와 서류를 제출하세요." },
  { title: "등록증 수령 및 간판 설치", desc: "등록이 완료되면 중개사무소 등록증을 받고, 규격에 맞는 간판을 설치하세요." },
];

const DOCS = [
  { name: "개설등록 신청서", required: true, where: "시·군·구청 양식" },
  { name: "공인중개사 자격증 사본", required: true, where: "원본 지참" },
  { name: "실무교육 수료증", required: true, where: "한국공인중개사협회" },
  { name: "보증설정 증명서류", required: true, where: "공제조합 또는 보험사" },
  { name: "사무소 임대차 계약서", required: true, where: "사무소 소재지" },
  { name: "건축물대장 등본", required: true, where: "정부24 발급" },
  { name: "사진 2매", required: true, where: "반명함판" },
];

const PREP_CHECK = [
  "실무교육 28~32시간 이수했어요",
  "사무실 용도 건물 임대차 계약 완료했어요",
  "보증보험(1억원 이상) 가입했어요",
  "사업자등록증을 발급받았어요",
  "개설등록 서류를 준비했어요",
];

const FAQS = [
  { q: "시험 합격 후 바로 개업 가능한가요?", a: "아니요. 실무교육(28~32시간)을 먼저 이수해야 해요. 교육 없이는 개설등록이 안 돼요." },
  { q: "사무소를 집에서 열 수 있나요?", a: "주거용 건물에서는 안 돼요. 건축물대장 기준 사무실 용도여야 해요. 주상복합 상가는 가능해요." },
  { q: "보증보험 비용은 얼마예요?", a: "공제조합 연회비 기준 약 20~30만원 정도예요. 보험사 보증보험은 상품에 따라 달라요." },
  { q: "개설등록 수수료가 있나요?", a: "등록 수수료 2만원 정도예요. 시·군·구마다 약간 다를 수 있어요." },
  { q: "소속 공인중개사로 일해도 되나요?", a: "네, 직접 개업하지 않고 다른 사무소에 소속 공인중개사로 등록할 수 있어요. 이 경우에도 실무교육은 필요해요." },
];

const REFS = [
  { category: "법령·기관", items: [
    { label: "공인중개사법", url: "https://www.law.go.kr/법령/공인중개사법" },
    { label: "한국공인중개사협회", url: "https://www.kar.or.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 자격증 · 개업</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공인중개사 자격증 땄으면 바로 개업?<br />
        사무소 개설까지 5단계 절차
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        공인중개사 시험에 합격했는데 바로 사무소를 열 수 있는 건 아니에요.
        <a href="https://www.law.go.kr/법령/공인중개사법" style={{ color: "#1D9E75" }}>공인중개사법</a>에 따라
        실무교육 이수, 보증보험 가입, 개설등록 절차를 거쳐야 해요. 교육부터 간판 설치까지 전체 절차를 정리했어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>개업까지 어떤 절차를 거쳐야 하나요?</H2>
      <p style={body}>시험 합격부터 사무소 개설까지 보통 1~2개월 정도 걸려요. 실무교육 일정에 따라 더 걸릴 수 있으니 미리 신청하세요.</p>
      <Steps steps={OPEN_STEPS} />
      <Divider />
      <H2>실무교육은 어디서 받나요?</H2>
      <p style={body}>한국공인중개사협회(kar.or.kr)에서 운영해요. 28~32시간 과정이고, 온라인과 오프라인 혼합이에요. 교육비는 약 10~15만원 정도예요. 분기마다 일정이 달라서 홈페이지에서 확인하세요.</p>
      <BorderBox title="실무교육 개요">교육 기관: 한국공인중개사협회 | 시간: 28~32시간 | 방식: 온라인+오프라인 혼합 | 비용: 약 10~15만원 | 수료증: 개설등록 시 필수 제출</BorderBox>
      <Divider />
      <H2>어떤 서류가 필요한가요?</H2>
      <p style={body}>관할 시·군·구청에 개설등록 신청할 때 아래 서류를 제출해야 해요.</p>
      <DocTable docs={DOCS} />
      <Divider />
      <H2>보증보험은 얼마짜리 가입해야 하나요?</H2>
      <p style={body}>개인 사무소는 1억원, 법인은 2억원 이상 보증을 설정해야 해요. 한국공인중개사협회 공제조합에 가입하는 방법이 가장 많이 쓰여요. 연회비 약 20~30만원이에요.</p>
      <GreenBox title="보증 설정 기준">개인 사무소: 1억원 이상 | 법인 사무소: 2억원 이상 | 공제조합 연회비: 약 20~30만원 | 사무소 이전·폐업 시 정산 가능</GreenBox>
      <Divider />
      <H2>개업 준비 체크리스트</H2>
      <p style={body}>빠뜨린 게 없는지 확인하세요.</p>
      <Checklist items={PREP_CHECK} />
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 공인중개사법 정보를 바탕으로 작성됐어요. 지역별로 등록 요건이 다를 수 있으니 관할 시·군·구청에 확인하세요." />
    </div>
  );
}
