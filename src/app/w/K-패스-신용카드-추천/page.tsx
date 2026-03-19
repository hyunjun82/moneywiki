"use client";

// Q1. K-패스 신용카드를 발급받으려는데 여러 종류 중 어떤 게 유리한지 모르는 직장인
// Q2. 전월실적 30만원 채울 수 있으면서 교통비 환급 + 추가 할인을 동시에 받는 카드 1개 선택
// Q3. 연회비(5천~1만원), 추가 할인 카테고리(쇼핑/카페/편의점/주유), 전월실적 30만원 조건 공통
// Q4. 상황별 추천 GreenBox + 카드별 상세 BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Steps, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR } from "@/data/K-패스-guide";

const FAQS = [
  {
    q: "K-패스 신용카드는 전월실적이 꼭 30만원이어야 하나요?",
    a: "대부분 30만원이에요. 카드사별로 약간 다를 수 있는데 대체로 전월 국내 승인 금액 기준이에요. 교통비는 실적에 포함되지 않는 카드도 있어서 발급 전에 약관을 꼭 확인해야 해요.",
  },
  {
    q: "실적 못 채우면 환급이 안 되나요?",
    a: "K-패스 환급 자체는 실적과 무관해요. 실적 조건은 카드사가 제공하는 추가 할인 혜택(편의점·카페 등)에 적용되는 거예요. 실적 미달이어도 월 15회 이상 대중교통 이용하면 K-패스 환급(20%/30%/53%)은 그대로 받아요.",
  },
  {
    q: "신용카드보다 체크카드가 나을 수도 있나요?",
    a: "월 소비가 30만원 이하이거나 신용카드를 추가로 관리하기 번거로우면 체크카드가 나아요. 체크카드는 연회비도 없고 실적 조건도 없거든요. 단, 추가 할인 혜택은 신용카드보다 적어요.",
  },
  {
    q: "연회비가 아깝지 않나요?",
    a: "K-패스 환급만으로도 연간 충분히 회수해요. 예를 들어 월 교통비 8만원 × 20% 환급 = 월 1.6만원, 연 19.2만원이에요. 연회비 5천~8천원은 첫 달에 넘어요. 거기에 추가 할인까지 붙으면 더 이득이에요.",
  },
  {
    q: "카드사별로 환급 방식이 달라요?",
    a: "환급률은 모두 동일(20%/30%/53%)하지만 환급 수단이 달라요. 신한·KB는 월말 청구 할인, 농협은 캐시백, 하나는 하나머니 포인트 형태로 돌아와요. 현금처럼 쓸 수 있는 방식을 선호하면 청구 할인 방식이 편해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "K-패스 카드 안내 (korea-pass.kr)", url: "https://www.korea-pass.kr" },
      { label: "국토교통부: K-패스 제도 안내", url: "https://www.molit.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "신용·체크·선불 전 카드 필터·정렬 비교 표예요." },
  { slug: "K-패스-체크카드-추천", title: "K-패스 체크카드 추천", description: "실적·연회비 없는 체크카드 비교예요." },
  { slug: "연말정산-대중교통-신용카드", title: "대중교통 신용카드 공제 40%", description: "K-패스 환급 외에 연말정산 40% 추가 공제예요." },
];

const STEPS = [
  {
    title: "내 월 소비 확인",
    desc: "최근 3개월 평균 카드 결제액을 확인해요. 30만원 이상이면 신용카드, 미만이면 체크카드가 유리해요.",
  },
  {
    title: "추가 혜택 카테고리 선택",
    desc: "편의점을 자주 가면 신한·농협, 주유를 자주 하면 우리·IBK, 쇼핑이 많으면 삼성·KB를 먼저 살펴봐요.",
  },
  {
    title: "카드사 공식 사이트에서 약관 확인",
    desc: "실적 산정 기준(교통비 포함/제외 여부), 월 할인 한도, 연회비 면제 조건을 확인해요.",
  },
  {
    title: "발급 후 k-pass.or.kr 가입",
    desc: "카드 발급만으로는 환급이 안 돼요. k-pass.or.kr 또는 앱에서 K-패스 회원 가입을 별도로 해야 환급이 시작돼요.",
  },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} currentSlug="K-패스-신용카드-추천" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 신용카드
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 신용카드 추천<br />
        연회비·추가혜택 비교 5종
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스 카드 종류가 너무 많아서 뭘 골라야 할지 모르겠죠?
        월 카드 소비가 30만원 이상이라면 신용카드가 유리해요.
        교통비 환급은 기본이고, 편의점·카페·쇼핑 추가 할인까지 받을 수 있거든요.
        연회비는 5,000~10,000원인데 첫 달 환급으로 벌써 뽑아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 소비 패턴에 맞는 카드 고르기</H2>
      <p style={body}>
        K-패스 신용카드는 전부 전월실적 30만원 조건이고 환급률도 동일해요.
        차이는 추가 할인 카테고리뿐이라 내가 돈 쓰는 곳에 맞춰 골라야 해요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN, fontSize: 14 }}>① 신한카드 K-패스 신용 — 편의점·카페 자주 가는 분</strong><br />
        연회비 5,000원 / 전월실적 30만원<br />
        편의점(GS25·CU) 5% 할인, 스타벅스·이디야 등 카페 할인<br />
        신한SOL 앱에서 K-패스 환급 현황 + 할인 한눈에 확인<br />
        <a href="https://www.shinhancard.com/pconts/html/card/apply/transportation/1229619_2216.html" style={{ color: GREEN, fontWeight: 700, fontSize: 12 }}>신한카드 신청 →</a>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN, fontSize: 14 }}>② NH농협 올바른 K-패스 신용 — 농협 거래자</strong><br />
        연회비 5,000원 / 전월실적 30만원<br />
        농협몰·하나로마트 3% 할인, 농협ATM 수수료 면제<br />
        농협은행 주거래 고객이면 이자 우대·수수료 혜택까지 연동<br />
        <a href="https://card.nonghyup.com/ccard/cardApply.do" style={{ color: GREEN, fontWeight: 700, fontSize: 12 }}>농협카드 신청 →</a>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN, fontSize: 14 }}>③ KB국민 K-패스 신용 — KB 주거래 고객</strong><br />
        연회비 7,000원 / 전월실적 30만원<br />
        온라인쇼핑·통신비 1% 적립, KB스타뱅킹 자동 포인트 관리<br />
        KB국민은행 계좌 연동 시 다양한 우대 혜택 추가<br />
        <a href="https://card.kbcard.com/CRD/DCRDINTTC/DCRDINTOC0017.cms" style={{ color: GREEN, fontWeight: 700, fontSize: 12 }}>KB카드 신청 →</a>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN, fontSize: 14 }}>④ 삼성카드 K-패스 신용 — 삼성페이 쓰는 분</strong><br />
        연회비 8,000원 / 전월실적 30만원<br />
        삼성페이 NFC 결제 지원, 온라인쇼핑 1.5% M포인트 적립<br />
        삼성 갤럭시 사용자라면 페이·카드 앱 통합 관리 가능<br />
        <a href="https://www.samsungcard.com/" style={{ color: GREEN, fontWeight: 700, fontSize: 12 }}>삼성카드 신청 →</a>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN, fontSize: 14 }}>⑤ 하나 K-패스 신용 — 다양한 혜택 원하는 분</strong><br />
        연회비 5,000원 / 전월실적 30만원<br />
        하나머니 캐시백 + 쇼핑·엔터테인먼트 할인<br />
        하나1Q 앱에서 환급 현황 실시간 알림<br />
        <a href="https://www.hanacard.co.kr/OPI10000000M.web" style={{ color: GREEN, fontWeight: 700, fontSize: 12 }}>하나카드 신청 →</a>
      </BorderBox>

      <H2>발급 후 환급 받는 절차</H2>
      <p style={body}>
        카드 발급만으로는 환급이 시작되지 않아요.
        k-pass.or.kr 가입까지 해야 다음 달부터 환급이 들어와요.
      </p>

      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 카드별 연회비·혜택·실적 조건은 카드사 정책에 따라 변경될 수 있으니 신청 전 해당 카드사 공식 사이트에서 확인하세요." />
    </ArticleLayout>
  );
}
