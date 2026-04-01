"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 새 통장을 만들었는데 이체가 막혀서 돈을 보내지 못하는 상황
// Q2. 한도제한계좌를 해제해서 자유롭게 이체할 수 있게 되는 것
// Q3. 해제 방법 3가지(앱/방문/자동), 필요 서류, 한도 수치
// Q4. Steps(해제 방법) + DocTable(서류) + GreenBox(핵심 요약)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "은행 앱에서 비대면 해제 신청",
    desc: "가장 빠른 방법이에요. KB스타뱅킹, 신한 쏠, 하나원큐 등 해당 은행 앱에서 '한도제한계좌 해제' 메뉴를 찾아요. 신분증 촬영 + 증빙서류 업로드 후 제출하면 심사 후 1~3일 안에 해제돼요.",
    tip: "앱 메뉴 위치가 은행마다 다르니 검색창에 '한도제한' 입력하면 빠르게 찾을 수 있어요",
  },
  {
    title: "은행 영업점 방문해서 당일 해제",
    desc: "신분증과 증빙서류를 들고 개설한 은행 영업점에 방문하면 돼요. 창구에서 '한도제한계좌 해제 신청서'를 작성하고 서류를 제출하면 심사 후 당일 해제가 가능해요. 앱이 불편하거나 서류 준비가 복잡하면 방문이 더 확실해요.",
    tip: "점심시간(12~13시)은 창구가 혼잡하니 오전 9~11시 방문을 권장해요",
  },
  {
    title: "자동 해제 조건 충족 (신청 불필요)",
    desc: "별도 신청 없이 조건만 충족하면 자동으로 해제돼요. 두 가지 방법이 있어요. 첫 번째는 3개월 연속 급여 50만원 이상 이체 거래내역이 확인되는 것, 두 번째는 3개월간 체크카드 사용 실적 30만원 이상이에요. 시간이 걸리지만 서류 준비 없이 가장 간편해요.",
    tip: "급여 이체 통장으로 지정하면 3개월 후 자동 해제되는 경우가 많아요",
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참 (주민등록증, 운전면허증)" },
  { name: "재직증명서 또는 급여명세서", required: false, where: "회사 발급 (직장인)" },
  { name: "사업자등록증", required: false, where: "국세청 홈택스에서 출력 (사업자)" },
  { name: "학생증 또는 등록금 납입 증명서", required: false, where: "학교 발급 (학생)" },
  { name: "가족관계증명서", required: false, where: "정부24에서 발급 (가족 용돈 통장)" },
];

const FAQS = [
  {
    q: "계좌 개설 제한이 걸렸다고 해서 통장을 아예 못 만드는 건가요?",
    a: "아니에요. 통장은 만들 수 있어요. 다만 새로 만든 통장은 한도제한계좌로 시작해요. 인터넷 이체 1일 100만원, ATM 출금 100만원으로 제한될 뿐이에요. 증빙서류를 제출하거나 자동 해제 조건을 충족하면 제한이 풀려요.",
  },
  {
    q: "한도제한계좌는 왜 생기는 건가요?",
    a: "보이스피싱에 쓰이는 대포통장 개설을 막기 위해서예요. 2024년 8월 28일부터 시행된 통신사기피해환급법에 따라 모든 은행과 증권사가 새로 개설한 계좌에 이 제도를 적용하고 있어요.",
  },
  {
    q: "한도제한이 걸려 있으면 이체가 전혀 안 되나요?",
    a: "완전히 막히는 건 아니에요. 인터넷·모바일 이체 1일 100만원, ATM 출금 및 이체 1일 100만원, 은행 창구 출금 1일 300만원까지 가능해요. 소액이라면 제한 상태에서도 사용할 수 있어요.",
  },
  {
    q: "내 계좌가 한도제한계좌인지 어떻게 알 수 있나요?",
    a: "은행 앱에서 전체 계좌 조회 화면에 한도제한 표시가 나와요. 금융감독원 홈페이지에서도 전자금융거래제한대상자 지정 여부를 본인 인증 후 확인할 수 있어요.",
  },
  {
    q: "비대면 신청 후 며칠 안에 해제되나요?",
    a: "보통 1~3 영업일 안에 결과가 나와요. 은행 앱으로 신청하면 알림으로 결과를 알려줘요. 급하면 영업점 방문 시 당일 해제가 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "통신사기피해환급법 (2024.8.28 시행)", url: "https://www.law.go.kr" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: 전자금융거래제한대상자 조회", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "금융거래-제한-해제", title: "금융거래 제한 해제 방법", description: "금융거래 제한이 걸렸을 때 해제하는 절차예요." },
  { slug: "공동인증서-재발급", title: "공동인증서 재발급 방법", description: "공동인증서가 만료됐거나 잃어버렸을 때 재발급하는 방법이에요." },
  { slug: "CMA계좌", title: "CMA 계좌란?", description: "은행보다 금리가 높은 증권사 입출금 통장이에요. 매일 이자가 붙어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 은행 · 계좌</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계좌 개설 제한 해제, 한도제한계좌<br />
        푸는 방법 3가지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        새 통장 개설했는데 이체가 막혔나요? 계좌 개설 자체가 제한된 게 아니에요.
        새로 만든 계좌는 한도제한계좌로 시작하는데, 이게 정상이에요.{" "}
        <a href="https://www.law.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>통신사기피해환급법</a>에 따라
        2024년 8월부터 모든 은행·증권사 신규 계좌에 적용되는 제도거든요.
        앱 신청, 영업점 방문, 자동 해제 중 상황에 맞는 방법으로 풀 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>한도제한계좌, 얼마까지 쓸 수 있나요?</H2>
      <p style={body}>
        한도제한 상태에서도 계좌를 완전히 못 쓰는 건 아니에요. 인터넷·모바일·폰뱅킹 이체와
        ATM 출금·이체는 1일 100만원까지 가능해요. 은행 창구에서 출금하면 1일 300만원까지 돼요.
        소액 거래라면 해제 전에도 사용할 수 있어요.
      </p>
      <p style={body}>
        이 한도는 2024년 5월 2일부터 상향된 기준이에요. 그 전에는 더 낮았어요.
        50만원이나 100만원 초과 이체가 막힌다면 한도제한계좌 상태인 거예요.
        아래 해제 방법 중 하나로 진행하면 돼요.
      </p>

      <GreenBox>
        인터넷·모바일 이체: 1일 100만원<br />
        ATM 출금·이체: 1일 100만원<br />
        은행 창구 출금: 1일 300만원<br />
        해제 후: 모든 한도 정상 복구
      </GreenBox>

      <Divider />

      <H2>한도제한계좌 해제 방법 3가지</H2>
      <p style={body}>
        상황에 따라 가장 편한 방법을 고르면 돼요.
        빨리 해제해야 한다면 영업점 방문이, 서류 준비가 번거로우면 자동 해제 조건을 활용하는 게 유리해요.
      </p>

      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>해제에 필요한 서류 목록</H2>
      <p style={body}>
        어떤 목적으로 쓰는 통장인지에 따라 준비하는 서류가 달라요.
        직장인은 재직증명서나 급여명세서, 사업자는 사업자등록증이 핵심이에요.
        신분증은 어떤 경우든 필수로 챙겨야 해요.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        정부24(gov.kr)에서 가족관계증명서, 홈택스(hometax.go.kr)에서 사업자등록증을
        무료로 발급받을 수 있어요. 방문 전에 미리 출력해두면 시간을 줄일 수 있어요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        한도제한계좌 관련해서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 통신사기피해환급법과 금융감독원 안내를 바탕으로 작성됐어요. 은행별 해제 절차와 수수료는 변경될 수 있으니 해당 은행에 문의하세요." />
    </ArticleLayout>
  );
}
