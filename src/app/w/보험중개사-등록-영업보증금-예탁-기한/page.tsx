"use client";
// Q1: 보험중개사 등록을 마쳤는데 영업보증금을 언제까지 예탁해야 하는지 모르는 상황
// Q2: 영업개시 7일 전까지 금융감독원에 영업보증금 예탁 완료
// Q3: 예탁 기한(영업개시 7일 전), 금액(개인 1억/법인 3억), 예탁 방법 4가지, 중개계좌 신고, 제출 서류
// Q4: GreenBox(금액 요약) + Steps(예탁 절차) + DocTable(서류) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "영업보증금 예탁 방법 선택",
    desc: "현금, 거래소 상장 증권, 보증보험증권, 지급보증서 중 하나를 골라요. 보증보험증권이 가장 보편적인 방법이에요.",
  },
  {
    title: "예탁신청서 작성 및 서류 준비",
    desc: "영업보증금 예탁신청서에 등록증 사본을 첨부해요. 보증보험증권으로 예탁하면 원본도 함께 제출해야 해요.",
  },
  {
    title: "금융감독원에 예탁 완료",
    desc: "영업개시 7일 전까지 금융감독원에 서류를 제출하고 예탁을 마쳐야 해요. 7일 전까지 못 하면 영업개시일을 뒤로 미뤄야 해요.",
  },
  {
    title: "보험중개계좌 개설 및 신고",
    desc: "영업개시와 동시에 원보험·재보험 중개계좌를 각각 개설하고 금융감독원에 즉시 신고해요. 일반 사업 자금과 분리해야 해요.",
  },
];

const DOCS = [
  { name: "영업보증금 예탁신청서", required: true, where: "금융감독원 양식" },
  { name: "보험중개사 등록증 사본", required: true, where: "금융위원회 발급" },
  { name: "보증보험증권 원본", required: false, where: "보증보험증권으로 예탁 시" },
  { name: "보험중개계좌 보고서", required: true, where: "계좌 개설 후 작성" },
  { name: "통장 사본", required: true, where: "중개계좌 통장" },
  { name: "사업자등록증 사본", required: true, where: "관할 세무서 발급" },
];

const CHECKLIST = [
  "영업개시 7일 전까지 예탁 완료했는지 확인",
  "개인 1억원 이상 / 법인 3억원 이상 금액 충족",
  "원보험·재보험 중개계좌 각각 별도 개설",
  "중개계좌 개설 즉시 금융감독원 신고 완료",
  "증권·보증보험증권 평가액이 기준 미달 시 14일 이내 보전",
];

const FAQS = [
  {
    q: "금융기관보험중개사도 영업보증금을 예탁해야 하나요?",
    a: "아니에요. 은행 등 금융기관이 보험중개사로 등록한 경우에는 예탁 의무가 면제돼요. 이미 금융당국의 감독을 받고 있기 때문이에요.",
  },
  {
    q: "보증보험증권 평가액이 떨어지면 어떻게 되나요?",
    a: "금융감독원에서 미달 통보가 와요. 통보받은 날부터 14일 이내에 부족분을 보전하거나 다시 예탁해야 해요. 기한 내 안 하면 영업 정지될 수 있어요.",
  },
  {
    q: "현금으로 예탁하면 이자는 받을 수 있나요?",
    a: "금융감독원이 지정한 계좌에 예탁하는 거라 별도 이자 수령은 어려워요. 그래서 보증보험증권을 많이 선택해요.",
  },
  {
    q: "중개계좌를 변경하거나 폐지하면 신고해야 하나요?",
    a: "네, 즉시 금융감독원에 신고해야 해요. 변경·폐지 후 신고를 안 하면 제재를 받을 수 있어요.",
  },
  {
    q: "영업보증금은 나중에 돌려받을 수 있나요?",
    a: "보험중개사 등록을 말소하면 돌려받을 수 있어요. 다만 미해결 분쟁이나 손해배상 건이 있으면 그만큼 차감될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "보험업법", url: "https://www.law.go.kr/법령/보험업법" },
      { label: "보험업법 시행령", url: "https://www.law.go.kr/법령/보험업법시행령" },
    ],
  },
  {
    category: "공식 안내",
    items: [
      { label: "찾기쉬운 생활법령정보 - 보험모집인", url: "https://www.easylaw.go.kr/CSP/CsmMain.laf?csmSeq=1695" },
      { label: "금융감독원", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "보험계약자", title: "보험계약자 권리와 의무", description: "보험 계약에서 계약자가 알아야 할 핵심이에요." },
  { slug: "금전거래", title: "금전거래 주의사항", description: "돈 빌려줄 때 꼭 챙겨야 할 것들이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보험중개사 영업보증금 예탁 기한<br />
        등록 후 영업개시까지 준비할 것들
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보험중개사 등록을 마쳤는데 바로 영업을 시작할 수 있는 게 아니에요.
        <a href="https://www.law.go.kr/법령/보험업법" style={{ color: "#1D9E75", textDecoration: "underline" }}>보험업법</a>에
        따라 영업보증금을 금융감독원에 예탁하고, 중개계좌를 개설해야 비로소 영업을 시작할 수 있죠.
        기한은 영업개시 7일 전까지예요. 놓치면 영업 자체를 못 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>영업보증금은 얼마를 예탁해야 하나요?</H2>
      <p style={body}>
        영업보증금은 보험계약자에게 입힌 손해를 배상하기 위한 안전장치예요.
        고객이 피해를 봤을 때 보상해줄 수 있는 돈을 미리 맡겨두는 거죠. 개인이냐 법인이냐에 따라 금액이 달라요.
      </p>

      <GreenBox>
        <strong>영업보증금 기준</strong><br />
        개인 보험중개사: 1억원 이상<br />
        법인 보험중개사: 3억원 이상<br />
        금융기관보험중개사: 예탁 의무 면제<br /><br />
        예탁 기한: 영업개시 7일 전까지
      </GreenBox>

      <p style={body}>
        1월 15일에 영업을 시작하려면 늦어도 1월 8일까지는 예탁을 마쳐야 해요.
        1월 10일에 예탁하면 영업개시일을 1월 17일 이후로 미뤄야 하고요.
      </p>

      <CategoryButton label="금융·보험 정보" count={4} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>예탁 절차 4단계</H2>
      <p style={body}>
        예탁 방법은 현금, 거래소 상장 증권, 보증보험증권, 지급보증서 4가지가 있어요.
        실무에서는 보증보험증권을 선택하는 경우가 많죠. 현금 1억원을 묶어두기 부담스럽기 때문이에요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        <strong>증권·보증보험 예탁 시 주의</strong><br />
        평가액이 기준금액 아래로 떨어지면 금융감독원에서 미달 통보가 와요.
        통보받은 날부터 14일 이내에 부족분을 보전해야 해요. 못 하면 영업 정지 대상이에요.
      </BorderBox>

      <Divider />

      <H2>제출 서류 한눈에 보기</H2>
      <p style={body}>
        서류가 부족하면 신고가 반려돼요. 미리 준비해서 한 번에 제출하는 게 시간을 아끼는 방법이에요.
        보증보험증권으로 예탁하는 경우에만 원본 제출이 추가돼요.
      </p>

      <SectionBadge>예탁 시 제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>영업 전 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        영업보증금 예탁과 중개계좌 신고를 빠짐없이 마쳐야 해요. 중개계좌는 원보험과 재보험을 따로 만들어야 하고,
        일반 사업 자금과 섞이면 안 돼요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 보험업법과 시행령을 바탕으로 작성됐어요. 예탁 절차와 금액 기준은 변경될 수 있으니 금융감독원에서 최신 정보를 직접 확인해봐요." />
    </ArticleLayout>
  );
}
