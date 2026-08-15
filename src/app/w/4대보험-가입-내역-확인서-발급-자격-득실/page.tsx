"use client";
// Q1. 이직 준비 중이거나 실업급여 신청하려는 직장인이 "4대보험 가입 내역 확인서 어디서 받아?" 확인하는 상황
// Q2. 4대사회보험 정보연계센터에서 즉시 발급받아 취업 서류·실업급여 신청에 활용
// Q3. 4insure.or.kr 한 번에 발급 / 기관별 따로 발급 방법 / 자격 득실 개념 / 조회 안 될 때 대처법
// Q4. GreenBox(발급 방법 요약) + Steps(발급 절차) + BorderBox(자격 득실과 실업급여 확인) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "4대사회보험 정보연계센터 접속",
    desc: "4insure.or.kr에 접속해요. 4개 보험을 한 번에 발급받을 수 있는 공식 통합 사이트예요. 구글에서 '4대사회보험 정보연계센터'로 검색해도 바로 나와요.",
    tip: "모바일에서도 이용 가능해요",
  },
  {
    title: "공인인증서 또는 간편인증으로 로그인",
    desc: "공인인증서(공동인증서), 카카오, 네이버, KB 등 간편인증으로 로그인할 수 있어요. 간편인증이 더 빠르고 편해요.",
    tip: "금융인증서(은행앱)로도 로그인 가능해요",
  },
  {
    title: "증명서 발급 신청",
    desc: "로그인 후 '증명서 발급신청' 메뉴에서 '4대사회보험 가입자 가입내역 확인서'를 선택해요. 기간을 설정하고 신청하면 바로 PDF로 받을 수 있어요.",
    tip: "정부24 전자문서지갑에 저장하면 나중에 다시 찾기 편해요",
  },
  {
    title: "PDF 저장 또는 출력",
    desc: "발급받은 확인서는 PDF로 저장하거나 출력해서 제출하면 돼요. 회사나 금융기관에 전자 문서 방식으로도 제출 가능해요. 유효기간은 보통 발급일로부터 3개월 이내를 요구해요.",
    tip: "취업 서류 제출 시 발급일 확인 필수예요",
  },
];

const FAQS = [
  {
    q: "건강보험공단, 국민연금공단에서도 따로 발급받을 수 있나요?",
    a: "네. 국민건강보험공단(nhis.or.kr)에서 '자격득실 확인서', 국민연금공단(nps.or.kr)에서 '가입증명서', 고용24(ei.go.kr)에서 '피보험자격 이력내역'을 각각 발급받을 수 있어요. 4대사회보험 정보연계센터(4insure.or.kr)에서 한 번에 받는 게 빠르고 편해요.",
  },
  {
    q: "퇴사한 회사 내역도 나오나요?",
    a: "네. 자격 득실 내역에 과거 회사들의 가입·상실 기록이 모두 나와요. 보통 10년 이상 기록이 보관돼요.",
  },
  {
    q: "4대보험이 조회 안 될 때는 어떻게 해요?",
    a: "최근에 입사했다면 회사가 신고하는 데 1~2주가 걸려요. 2주 후에 다시 확인해보세요. 그래도 안 나오면 회사가 신고를 안 한 거예요. 회사에 신고 요청하거나 고용노동부에 신고할 수 있어요.",
  },
  {
    q: "방문해서도 받을 수 있나요?",
    a: "네. 건강보험공단 지사, 국민연금공단 지사, 고용센터 어디서든 신분증만 가져가면 당일에 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 발급처",
    items: [
      { label: "4대사회보험 정보연계센터 (한 번에 발급)", url: "https://www.4insure.or.kr" },
      { label: "정부24: 민원 발급", url: "https://www.gov.kr" },
      { label: "고용24: 피보험자격 이력내역 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급-자격-조건", title: "실업급여 수급 자격 조건", description: "고용보험 180일 이상 가입 + 비자발적 퇴직 조건이에요." },
  { slug: "2026년-최저임금-월급-계산-실수령액", title: "2026년 최저임금과 실수령액", description: "최저시급 10,320원 기준 월급과 4대보험 공제액이에요." },
  { slug: "근로계약서-미작성-벌금-필수-기재-사항", title: "근로계약서 미작성 벌금과 필수 기재 사항", description: "근로계약서 없으면 500만원 벌금이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 4대보험 · 증명서 발급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        4대보험 가입 내역 확인서 발급<br />
        자격 득실 조회와 온라인 발급 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        4대보험 가입 내역 확인서는 4대사회보험 정보연계센터(4insure.or.kr)에서 한 번에 발급받을 수 있어요.
        공인인증서나 카카오 간편인증으로 로그인하면 당일 즉시 PDF로 받아요.
        취업 서류 제출, 실업급여 신청, 퇴직금 분쟁 시에 필요해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>한 번에 발급받는 가장 빠른 방법</H2>
      <p style={body}>
        4대보험은 건강보험공단, 국민연금공단, 근로복지공단(산재), 고용노동부(고용)에서 각각 관리해요.
        기관마다 따로 신청하는 대신, 정보연계센터에서 한 번에 받으면 돼요.
      </p>

      <GreenBox>
        <strong>4대보험 가입 내역 확인서 발급 방법 요약</strong><br />
        <strong>한 번에 발급</strong>: 4대사회보험 정보연계센터 (4insure.or.kr)<br />
        <br />
        기관별 따로 발급<br />
        건강보험: 국민건강보험공단 (nhis.or.kr) → 자격득실 확인서<br />
        국민연금: 국민연금공단 (nps.or.kr) → 가입증명서<br />
        고용보험: 고용24 (ei.go.kr) → 피보험자격 이력내역<br />
        산재보험: 근로복지공단 (kcomwel.or.kr) → 가입증명서<br />
        <br />
        오프라인: 건강보험공단 지사·국민연금공단 지사·고용센터 방문 (신분증 지참)
      </GreenBox>

      <H2>온라인 발급 절차</H2>
      <p style={body}>
        4insure.or.kr에서 5분이면 받을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <H2>자격 득실이 뭐고, 왜 확인해요?</H2>
      <p style={body}>
        자격 득실은 "언제부터 언제까지 4대보험에 가입되어 있었는지"를 기록한 이력이에요.
        자격을 얻는 것(취득)과 잃는 것(상실)을 합쳐 득실이라고 해요.
      </p>

      <BorderBox>
        <strong>자격 득실 활용 사례</strong><br />
        <br />
        <strong>① 실업급여 수급 자격 확인</strong><br />
        퇴직 전 18개월 내 고용보험 가입 기간이 180일 이상이어야 실업급여를 받을 수 있어요.<br />
        고용24 피보험자격 이력내역으로 기간 합산 확인 가능해요.<br />
        <br />
        <strong>② 퇴직금 분쟁 증거 자료</strong><br />
        "근무한 기간이 얼마다"를 증명하는 공식 자료로 활용돼요.<br />
        1년 이상 근무 입증 → 퇴직금 청구 근거<br />
        <br />
        <strong>③ 이직 시 경력 증명</strong><br />
        실제 근무 기간을 객관적으로 증명하는 서류예요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 발급 방법은 각 기관 시스템 변경에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
