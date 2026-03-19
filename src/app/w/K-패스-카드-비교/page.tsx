"use client";

// Q1. K-패스 카드를 발급받으려는데 어떤 카드가 나한테 유리한지 비교하려는 상황
// Q2. 신용/체크/선불 유형 + 연회비·실적 조건 필터링해서 내게 맞는 카드 1개 골라 바로 신청
// Q3. 환급률(일반20%/청년30%/저소득53%), 월15회 조건, 카드사별 추가 혜택, 연회비, 월실적 조건 차이
// Q4. 필터+정렬 인터랙티브 표 + 원클릭 카드사 이동 + 카드사별 장단점 BorderBox + FAQ

import { useState, useRef } from "react";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR } from "@/data/K-패스-guide";

/* ── 카드 데이터 ─────────────────────────────────────── */
type CardType = "신용" | "체크" | "선불";

interface KPassCard {
  id: string;
  name: string;
  issuer: string;
  type: CardType;
  annualFee: number;       // 원 (0 = 없음)
  minSpend: number;        // 전월실적 만원 단위 (0 = 없음)
  monthlyLimit: number;    // 월 환급 한도 만원 (0 = 별도 없음)
  extra: string;           // 한 줄 추가혜택
  applyUrl: string;
}

const CARDS: KPassCard[] = [
  // ── 신용카드 ──────────────────────────────────────────
  {
    id: "shinhan-credit-1",
    name: "신한카드 K-패스",
    issuer: "신한카드",
    type: "신용",
    annualFee: 5000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "편의점·커피전문점 5% 할인",
    applyUrl: "https://www.shinhancard.com/pconts/html/card/apply/transportation/1229619_2216.html",
  },
  {
    id: "shinhan-credit-2",
    name: "신한카드 K-패스 (with 신한은행)",
    issuer: "신한카드",
    type: "신용",
    annualFee: 5000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "신한은행 주거래 고객 추가 포인트",
    applyUrl: "https://www.shinhancard.com/pconts/html/card/apply/transportation/1229619_2216.html",
  },
  {
    id: "nh-credit",
    name: "NH농협 올바른 K-패스 신용",
    issuer: "NH농협카드",
    type: "신용",
    annualFee: 5000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "농협몰·하나로마트 3% 할인",
    applyUrl: "https://card.nonghyup.com/ccard/cardApply.do",
  },
  {
    id: "nh-credit-2",
    name: "NH농협 올바른 K-패스 신용 (BC망)",
    issuer: "NH농협카드",
    type: "신용",
    annualFee: 8000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "BC 페이북 포인트 적립",
    applyUrl: "https://card.nonghyup.com/ccard/cardApply.do",
  },
  {
    id: "kb-credit",
    name: "KB국민 K-패스 신용카드",
    issuer: "KB국민카드",
    type: "신용",
    annualFee: 7000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "온라인쇼핑·통신비 1% 적립",
    applyUrl: "https://card.kbcard.com/CRD/DCRDINTTC/DCRDINTOC0017.cms",
  },
  {
    id: "hana-credit",
    name: "하나 K-패스 신용카드",
    issuer: "하나카드",
    type: "신용",
    annualFee: 5000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "하나머니 캐시백 + 쇼핑 할인",
    applyUrl: "https://www.hanacard.co.kr/OPI10000000M.web",
  },
  {
    id: "woori-credit",
    name: "우리 K-패스 신용카드",
    issuer: "우리카드",
    type: "신용",
    annualFee: 5000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "편의점·주유소 할인",
    applyUrl: "https://www.wooricard.com/cbp/prmotCardMain.do",
  },
  {
    id: "ibk-credit",
    name: "IBK기업은행 K-패스 신용카드",
    issuer: "IBK기업은행",
    type: "신용",
    annualFee: 5000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "IBK통장 연계 0.1% 이자 우대",
    applyUrl: "https://www.ibk.co.kr/card/kpass.ibk",
  },
  {
    id: "samsung-credit",
    name: "삼성카드 K-패스 신용카드",
    issuer: "삼성카드",
    type: "신용",
    annualFee: 8000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "삼성페이 캐시백 + 온라인쇼핑 1.5% 적립",
    applyUrl: "https://www.samsungcard.com/home/card/cardinfo/PCIDCCardInfoDetails.do?v_cd=CD18M0034",
  },
  {
    id: "hyundai-credit",
    name: "현대카드 K-패스 (Z work)",
    issuer: "현대카드",
    type: "신용",
    annualFee: 10000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "현대카드 M포인트 적립 + 공항 라운지",
    applyUrl: "https://www.hyundaicard.com/cpc/mi/CPCMI0601.do",
  },
  {
    id: "lotte-credit",
    name: "롯데카드 K-패스 (엔로카)",
    issuer: "롯데카드",
    type: "신용",
    annualFee: 8000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "롯데백화점·마트 5% 할인",
    applyUrl: "https://www.lottecard.co.kr/app/LPCDCE_V100.lc",
  },
  {
    id: "bc-credit",
    name: "BC바로 K-패스 신용카드",
    issuer: "BC카드",
    type: "신용",
    annualFee: 5000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "페이북 포인트 + 각 은행 추가 서비스",
    applyUrl: "https://www.bccard.com/app/card/CardIntroduce.do",
  },
  {
    id: "im-credit",
    name: "iM카드 K-패스 신용카드",
    issuer: "iM카드",
    type: "신용",
    annualFee: 5000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "iM뱅크 주거래 할인",
    applyUrl: "https://www.imbank.co.kr/",
  },
  {
    id: "gwangju-credit",
    name: "광주은행 그린카드 K-패스",
    issuer: "광주은행",
    type: "신용",
    annualFee: 5000,
    minSpend: 30,
    monthlyLimit: 6,
    extra: "광주·전남 지역 특화 할인",
    applyUrl: "https://www.kjbank.com/",
  },
  // ── 체크카드 ──────────────────────────────────────────
  {
    id: "shinhan-check",
    name: "신한카드 K-패스 체크",
    issuer: "신한카드",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "신한SOL 앱 연동 + 자동 환급",
    applyUrl: "https://www.shinhancard.com/pconts/html/card/apply/transportation/1229619_2216.html",
  },
  {
    id: "shinhan-deep-dream",
    name: "신한 Deep Dream K-패스",
    issuer: "신한카드",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "쇼핑·카페 1% 할인",
    applyUrl: "https://www.shinhancard.com/pconts/html/card/apply/transportation/1229619_2216.html",
  },
  {
    id: "nh-check",
    name: "NH농협 올바른 K-패스 체크",
    issuer: "NH농협카드",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "농협ATM 수수료 면제",
    applyUrl: "https://card.nonghyup.com/ccard/cardApply.do",
  },
  {
    id: "kb-check",
    name: "KB국민 K-패스 체크카드",
    issuer: "KB국민카드",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "KB스타뱅킹 자동 적립",
    applyUrl: "https://card.kbcard.com/CRD/DCRDINTTC/DCRDINTOC0017.cms",
  },
  {
    id: "hana-check",
    name: "하나 K-패스 체크카드",
    issuer: "하나카드",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "하나1Q 앱 연동 + 캐시백",
    applyUrl: "https://www.hanacard.co.kr/OPI10000000M.web",
  },
  {
    id: "woori-check",
    name: "우리 K-패스 체크카드",
    issuer: "우리카드",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "우리은행 계좌 연결 필수",
    applyUrl: "https://www.wooricard.com/cbp/prmotCardMain.do",
  },
  {
    id: "ibk-check",
    name: "IBK기업은행 K-패스 체크",
    issuer: "IBK기업은행",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "i-ONE뱅크 자동 환급 알림",
    applyUrl: "https://www.ibk.co.kr/card/kpass.ibk",
  },
  {
    id: "samsung-check",
    name: "삼성카드 K-패스 체크",
    issuer: "삼성카드",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "삼성페이 간편 결제 지원",
    applyUrl: "https://www.samsungcard.com/",
  },
  {
    id: "kakao-check",
    name: "카카오뱅크 K-패스 체크",
    issuer: "카카오뱅크",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "카카오페이 연동 + 앱 자동 알림",
    applyUrl: "https://www.kakaobank.com/products/checkCard",
  },
  {
    id: "toss-check",
    name: "토스뱅크 K-패스 체크",
    issuer: "토스뱅크",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "토스앱 환급 현황 실시간 확인",
    applyUrl: "https://www.tossbank.com/cards",
  },
  {
    id: "kbank-check",
    name: "케이뱅크 K-패스 체크",
    issuer: "케이뱅크",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "케이뱅크 예금 0.1% 이자 우대",
    applyUrl: "https://www.kbanknow.com/",
  },
  {
    id: "im-check",
    name: "iM뱅크 K-패스 체크",
    issuer: "iM카드",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "iM뱅크 계좌 이자 우대",
    applyUrl: "https://www.imbank.co.kr/",
  },
  {
    id: "busan-check",
    name: "부산동백전 K-패스",
    issuer: "부산은행",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "부산 지역 가맹점 캐시백",
    applyUrl: "https://www.busanbank.co.kr/",
  },
  {
    id: "jeju-check",
    name: "제주은행 K-패스 체크",
    issuer: "제주은행",
    type: "체크",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 6,
    extra: "제주 지역 특화 서비스",
    applyUrl: "https://www.e-jejubank.com/",
  },
  // ── 선불카드 ──────────────────────────────────────────
  {
    id: "tmoney",
    name: "티머니 K-패스",
    issuer: "티머니",
    type: "선불",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 0,
    extra: "기존 티머니 교통카드 호환",
    applyUrl: "https://www.t-money.co.kr/ncs/pct/tmnyCard/ReadKpassMain.dev",
  },
  {
    id: "ezl",
    name: "이즐 K-패스",
    issuer: "이즐",
    type: "선불",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 0,
    extra: "이즐앱 충전 + 환급 관리",
    applyUrl: "https://www.ezl.co.kr/",
  },
  {
    id: "kakao-prepaid",
    name: "카카오페이 K-패스",
    issuer: "카카오페이",
    type: "선불",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 0,
    extra: "카카오페이 지갑 충전 연동",
    applyUrl: "https://www.kakaopay.com/",
  },
  {
    id: "naver-prepaid",
    name: "네이버페이 K-패스",
    issuer: "네이버페이",
    type: "선불",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 0,
    extra: "네이버페이 포인트 동시 적립",
    applyUrl: "https://pay.naver.com/",
  },
  {
    id: "rail-prepaid",
    name: "코레일 레일플러스 K-패스",
    issuer: "코레일",
    type: "선불",
    annualFee: 0,
    minSpend: 0,
    monthlyLimit: 0,
    extra: "KTX·무궁화 마일리지 동시 적립",
    applyUrl: "https://www.letskorail.com/",
  },
];

/* ── 카드사별 장단점 데이터 ───────────────────────────── */
const BANK_INFO: { issuer: string; pros: string; cons: string }[] = [
  {
    issuer: "신한카드",
    pros: "신용·체크 라인업 가장 풍부 (6종). 신한SOL 앱에서 환급 현황 한눈에 확인. 편의점·카페 할인 겸용 가능.",
    cons: "신용카드는 전월실적 30만원 조건 있음. 카드 종류 많아서 비교에 시간 걸림.",
  },
  {
    issuer: "NH농협카드",
    pros: "농협ATM 수수료 면제. 농협몰·하나로마트 이용자에게 추가 할인. BC망 선택 가능.",
    cons: "BC망 카드는 연회비가 8,000원으로 비교적 높음. 타 은행 대비 추가 혜택 폭 좁음.",
  },
  {
    issuer: "KB국민카드",
    pros: "KB스타뱅킹 자동 적립 연동. 국내 가맹점 범위 넓음.",
    cons: "신용카드 연회비 7,000원으로 동급 중 높은 편. 체크카드는 KB은행 계좌 필수.",
  },
  {
    issuer: "카카오뱅크",
    pros: "실적 조건 없음 (체크카드). 연회비 0원. 카카오페이 연동으로 앱 하나로 관리 가능.",
    cons: "신용카드 없음. 추가 할인 혜택이 상대적으로 적음.",
  },
  {
    issuer: "토스뱅크",
    pros: "실적·연회비 0원. 토스앱에서 K-패스 환급 현황 실시간 확인. 간편한 발급.",
    cons: "신용카드 없음. 해외 결제 불가.",
  },
  {
    issuer: "케이뱅크",
    pros: "케이뱅크 예금 0.1% 이자 우대. 발급 절차 전부 앱으로 가능.",
    cons: "신용카드 없음. 오프라인 지점 없음.",
  },
  {
    issuer: "삼성카드",
    pros: "삼성페이 NFC 결제 지원. M포인트 신용카드와 겸용 가능. 온라인쇼핑 환급 폭 넓음.",
    cons: "연회비 8,000원(신용). 삼성계열 이용자 위주 혜택.",
  },
  {
    issuer: "티머니",
    pros: "기존 티머니 카드를 K-패스로 전환 가능. 별도 은행 계좌 불필요. 실물·모바일 모두 지원.",
    cons: "선불 충전 방식이라 잔액 관리 필요. 추가 할인 혜택 없음.",
  },
];

const FAQS = [
  {
    q: "K-패스 환급률은 모든 카드가 같나요?",
    a: "맞아요. K-패스 환급률(일반 20% / 청년 30% / 저소득 53%)은 정부에서 정한 기준이라 모든 카드가 동일해요. 카드별로 다른 건 연회비, 전월실적 조건, 월 환급 한도, 그리고 교통비 외 추가 할인 혜택이에요.",
  },
  {
    q: "K-패스 신청하면 언제부터 환급 받나요?",
    a: "카드 발급 후 k-pass.or.kr에서 K-패스 회원 가입을 해야 환급이 시작돼요. 회원 가입 없이는 그냥 교통카드로만 써지고 환급이 안 돼요. 가입 당월 15회 이상 이용하면 다음 달 10일 전후로 환급돼요.",
  },
  {
    q: "체크카드 vs 신용카드 어떤 게 나을까요?",
    a: "전월실적 30만원 채우기 어려우면 체크카드가 유리해요. 체크카드는 실적 조건도, 연회비도 없거든요. 반면 신용카드는 추가 할인 혜택(쇼핑, 카페, 주유)이 붙어서 교통비 외 지출이 많으면 더 유리할 수 있어요.",
  },
  {
    q: "선불카드는 환급을 어떻게 받나요?",
    a: "티머니·이즐 같은 선불카드는 환급금이 카드 잔액으로 돌아와요. 신용·체크카드처럼 계좌 입금이 아니라 다음 교통비로 쓸 수 있게 충전되는 방식이에요.",
  },
  {
    q: "여러 장 발급받아서 쓸 수 있나요?",
    a: "K-패스 회원 등록은 1인 1카드만 가능해요. 여러 장 발급받아도 환급 카드로 등록하는 건 1개뿐이에요. 단, 언제든지 다른 카드로 변경 등록할 수 있어요.",
  },
  {
    q: "기존 알뜰교통카드 쓰던 사람은 어떻게 하나요?",
    a: "알뜰교통카드는 2024년 4월로 서비스 종료됐어요. K-패스로 자동 전환되지 않아서 기존 카드 그대로 쓰면 환급이 안 돼요. K-패스 카드를 새로 발급받고 k-pass.or.kr에서 다시 가입해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "K-패스 공식 사이트", url: "https://www.korea-pass.kr" },
      { label: "국토교통부: K-패스 안내", url: "https://www.molit.go.kr" },
      { label: "K-패스 회원가입 및 카드 안내", url: "https://k-pass.kr" },
    ],
  },
];

const RELATED = [
  { slug: "K-패스-청년-환급", title: "K-패스 청년 30% 환급 상세", description: "청년 기준 월 환급액 시뮬레이션과 조건을 정리했어요." },
  { slug: "청년월세지원", title: "청년월세지원 월 최대 20만원", description: "K-패스와 함께 받으면 월 최대 24만원 절감이에요." },
  { slug: "청년-패스", title: "청년 혜택 모음 한눈에 보기", description: "K-패스·월세지원·기본소득 등 청년 혜택 전체 정리예요." },
];

/* ── 컬러 상수 ───────────────────────────────────────── */
const GREEN = "#1D9E75";
const GREEN_LIGHT = "rgba(29,158,117,0.08)";

/* ── 컴포넌트 ────────────────────────────────────────── */
export default function Page() {
  const [activeType, setActiveType] = useState<"전체" | CardType>("전체");
  const [sortBy, setSortBy] = useState<"annualFee" | "minSpend">("annualFee");
  const tableRef = useRef<HTMLDivElement>(null);

  /* 필터 + 정렬 */
  const filtered = CARDS
    .filter((c) => activeType === "전체" || c.type === activeType)
    .sort((a, b) => a[sortBy] - b[sortBy]);

  /* 카드사 이동 */
  const scrollToIssuer = (issuer: string) => {
    const el = document.getElementById(`issuer-${issuer}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const typeColors: Record<"전체" | CardType, string> = {
    "전체": GREEN,
    "신용": "#2563EB",
    "체크": "#7C3AED",
    "선불": "#D97706",
  };

  const typeBadgeStyle = (type: CardType): React.CSSProperties => ({
    display: "inline-block",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 4,
    background:
      type === "신용" ? "rgba(37,99,235,0.10)" :
      type === "체크" ? "rgba(124,58,237,0.10)" :
      "rgba(217,119,6,0.10)",
    color:
      type === "신용" ? "#2563EB" :
      type === "체크" ? "#7C3AED" : "#D97706",
  });

  const issuersInData = [...new Set(BANK_INFO.map((b) => b.issuer))];

  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} currentSlug="K-패스-카드-비교" />}>
      {/* 카테고리 태그 */}
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 카드 비교
      </p>

      {/* 제목 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 카드 전체 비교<br />
        신용·체크·선불 환급률·연회비 한눈에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스는 월 15회 이상 대중교통 이용하면 교통비를 환급해주는 제도예요.
        신용카드·체크카드·선불카드 모두 쓸 수 있는데, 환급률은 모두 동일하고
        연회비·실적 조건·추가 혜택이 카드마다 달라요.
        아래에서 내게 맞는 카드를 바로 골라서 신청할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 환급률 요약 */}
      <H2>K-패스 환급률 — 모든 카드 동일</H2>
      <p style={body}>
        어떤 카드를 쓰든 환급률은 같아요. 차이는 연회비와 추가 혜택이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>대상</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>환급률</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>대상 조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              { group: "일반", rate: "20%", cond: "만 19세 이상 성인 누구나" },
              { group: "청년", rate: "30%", cond: "만 19~34세 (주민등록상 연령 기준)" },
              { group: "저소득층", rate: "53%", cond: "기초생활수급자 또는 차상위계층" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? GREEN_LIGHT : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{r.group}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: GREEN, fontWeight: 700, fontSize: 15 }}>{r.rate}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{r.cond}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          ★ 월 15회 이상 이용분에서 환급 / 환급 한도는 카드사별 월 최대 6만원 내외
        </p>
      </GreenBox>

      {/* 빠른 이동 — 카드사 chips */}
      <H2>카드사별 바로 가기</H2>
      <p style={body}>
        주거래 은행이나 평소 쓰는 카드사가 있으면 바로 해당 섹션으로 이동해요.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {BANK_INFO.map((b) => (
          <button
            key={b.issuer}
            onClick={() => scrollToIssuer(b.issuer)}
            style={{
              padding: "7px 14px",
              borderRadius: "999px",
              border: `1.5px solid ${GREEN}`,
              background: "transparent",
              color: GREEN,
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = GREEN;
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = GREEN;
            }}
          >
            {b.issuer}
          </button>
        ))}
      </div>

      {/* 카드 비교 표 */}
      <H2>전체 카드 비교 표</H2>

      {/* 필터 + 정렬 */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {(["전체", "신용", "체크", "선불"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              style={{
                padding: "5px 14px",
                borderRadius: "999px",
                border: `1.5px solid ${typeColors[t]}`,
                background: activeType === t ? typeColors[t] : "transparent",
                color: activeType === t ? "#fff" : typeColors[t],
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, fontSize: 12, color: "#666", alignItems: "center" }}>
          <span style={{ fontWeight: 600 }}>정렬:</span>
          <button
            onClick={() => setSortBy("annualFee")}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: "1px solid #ddd",
              background: sortBy === "annualFee" ? "#f0fdf9" : "transparent",
              color: sortBy === "annualFee" ? GREEN : "#666",
              fontWeight: sortBy === "annualFee" ? 700 : 400,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            연회비↑
          </button>
          <button
            onClick={() => setSortBy("minSpend")}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: "1px solid #ddd",
              background: sortBy === "minSpend" ? "#f0fdf9" : "transparent",
              color: sortBy === "minSpend" ? GREEN : "#666",
              fontWeight: sortBy === "minSpend" ? 700 : 400,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            실적↑
          </button>
        </div>
      </div>

      {/* 표 */}
      <div ref={tableRef} style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: 10 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 560 }}>
          <thead>
            <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700 }}>카드명</th>
              <th style={{ textAlign: "center", padding: "10px 8px", fontWeight: 700 }}>유형</th>
              <th style={{ textAlign: "right", padding: "10px 8px", fontWeight: 700 }}>연회비</th>
              <th style={{ textAlign: "right", padding: "10px 8px", fontWeight: 700 }}>전월실적</th>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 700 }}>추가혜택</th>
              <th style={{ textAlign: "center", padding: "10px 8px", fontWeight: 700 }}>신청</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((card, i) => (
              <tr
                key={card.id}
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  background: i % 2 === 0 ? "#fff" : "#fafafa",
                }}
              >
                <td style={{ padding: "9px 12px", fontWeight: 600, fontSize: 12 }}>{card.name}</td>
                <td style={{ textAlign: "center", padding: "9px 8px" }}>
                  <span style={typeBadgeStyle(card.type)}>{card.type}</span>
                </td>
                <td style={{ textAlign: "right", padding: "9px 8px", fontWeight: card.annualFee === 0 ? 700 : 400, color: card.annualFee === 0 ? GREEN : "#333" }}>
                  {card.annualFee === 0 ? "없음" : card.annualFee.toLocaleString() + "원"}
                </td>
                <td style={{ textAlign: "right", padding: "9px 8px", color: card.minSpend === 0 ? GREEN : "#333", fontWeight: card.minSpend === 0 ? 700 : 400 }}>
                  {card.minSpend === 0 ? "없음" : card.minSpend + "만원"}
                </td>
                <td style={{ padding: "9px 8px", fontSize: 11, color: "#555" }}>{card.extra}</td>
                <td style={{ textAlign: "center", padding: "9px 8px" }}>
                  <a
                    href={card.applyUrl}
                    style={{
                      display: "inline-block",
                      padding: "5px 12px",
                      borderRadius: 6,
                      background: GREEN,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 11,
                      textDecoration: "none",
                    }}
                  >
                    신청
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: "#888", marginTop: 8 }}>
        * 환급률은 일반 20% / 청년 30% / 저소득 53% — 모든 카드 동일 | 연회비·실적 조건은 카드사 사정으로 변경될 수 있어요
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 카드사별 장단점 */}
      <H2>카드사별 장단점 — 한눈에 비교</H2>
      <p style={body}>
        환급률은 같아도 어떤 카드사를 고르느냐에 따라 생활 할인 혜택이 달라져요.
      </p>

      {BANK_INFO.map((b) => (
        <div key={b.issuer} id={`issuer-${b.issuer}`} style={{ marginBottom: 16, scrollMarginTop: 80 }}>
          <BorderBox>
            <strong style={{ fontSize: 14, color: GREEN }}>{b.issuer}</strong><br />
            <span style={{ fontWeight: 700 }}>장점:</span> {b.pros}<br />
            <span style={{ fontWeight: 700 }}>주의:</span> {b.cons}
          </BorderBox>
        </div>
      ))}

      <Divider />

      {/* 선택 가이드 */}
      <H2>내 상황별 추천 카드 유형</H2>
      <p style={body}>
        어떤 카드를 골라야 할지 아직 모르겠으면 아래 기준으로 먼저 좁혀봐요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>상황</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>추천 유형</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>추천 이유</th>
            </tr>
          </thead>
          <tbody>
            {[
              { case: "월 소비 30만원 이상", type: "신용카드", reason: "추가 할인 혜택(쇼핑·카페)으로 총절약액 더 커짐" },
              { case: "월 소비 30만원 미만", type: "체크카드", reason: "실적·연회비 없음. 카카오뱅크·토스뱅크 추천" },
              { case: "주거래 은행이 있음", type: "같은 은행 카드", reason: "ATM 수수료 면제, 앱 통합 관리 가능" },
              { case: "은행 계좌 없는 청소년", type: "선불카드 (티머니)", reason: "충전식이라 계좌·신용 불필요. 교통 전용" },
              { case: "청년 (만 19~34세)", type: "어떤 카드든 OK", reason: "환급률 30%로 동일. 연회비·실적 조건만 비교" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.case}</td>
                <td style={{ padding: "5px 8px", color: GREEN, fontWeight: 700, fontSize: 12 }}>{r.type}</td>
                <td style={{ padding: "5px 8px", fontSize: 11, color: "#555" }}>{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 카드별 연회비·실적 조건·혜택은 카드사 정책에 따라 변경될 수 있어요. 신청 전 해당 카드사 공식 사이트에서 최신 조건을 확인하세요." />
    </ArticleLayout>
  );
}
