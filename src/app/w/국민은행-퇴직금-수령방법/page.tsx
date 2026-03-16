"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "국민은행 IRP 계좌가 있어요" },
  { id: "c2", label: "퇴직금이 300만원을 초과해요" },
  { id: "c3", label: "퇴직이 확정됐거나 확정될 예정이에요" },
  { id: "c4", label: "IRP에서 일시금 또는 연금으로 받고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "IRP 수령액", min: 300, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 40, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직소득세 (일시 인출 시, 근사치)",
    getValue: (v: Record<string, number>) => {
      const tax = v.amount * 10000 * Math.max(0, 0.12 - v.years * 0.003);
      return Math.round(Math.max(tax, v.amount * 10000 * 0.01));
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 시 절세 효과 (30% 절감)",
    getValue: (v: Record<string, number>) => {
      const tax = v.amount * 10000 * Math.max(0, 0.12 - v.years * 0.003);
      const baseTax = Math.max(tax, v.amount * 10000 * 0.01);
      return Math.round(baseTax * 0.3);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "퇴직확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "IRP 계좌 정보 (계좌번호 확인용)", required: true, where: "KB국민은행 앱 또는 통장" },
  { name: "근로소득 원천징수영수증 (연금 전환 시)", required: false, where: "회사 인사팀 또는 홈택스" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설 (미개설 시)",
    desc: "KB국민은행 앱(KB스타뱅킹) 또는 영업점 방문으로 IRP 계좌를 개설해요. 앱으로 10분 이내에 가능하고, 공동인증서나 간편인증이 필요해요. 퇴직 전 미리 만들어두는 게 좋아요.",
    tip: "이미 국민은행 계좌가 있다면 앱에서 바로 IRP 개설 가능",
  },
  {
    title: "계좌번호 인사팀에 통보",
    desc: "퇴직이 확정되면 IRP 계좌번호(은행명·계좌번호·예금주)를 인사팀에 문자나 메일로 알려줘요. 회사는 퇴직일로부터 14일 이내에 이 계좌로 퇴직금을 이체해야 해요.",
    tip: "구두보다 문자·메일로 통보하면 증거가 남아요",
  },
  {
    title: "운용 지시",
    desc: "퇴직금이 IRP로 들어오면 어떻게 운용할지 선택해야 해요. 원리금보장형(예금)이나 실적배당형(ETF·펀드)을 고를 수 있어요. 운용 지시 없이 두면 기본 원리금보장형으로 배정돼요.",
    tip: "장기 운용 계획이라면 ETF 분산 투자를 고려해보세요",
  },
  {
    title: "인출 또는 연금 수령 선택",
    desc: "IRP에서 바로 인출하면 퇴직소득세가 부과돼요. 55세 이후 연금으로 받으면 세율이 30% 낮아져요. 인출은 KB스타뱅킹 앱 또는 영업점에서 신청할 수 있어요.",
    tip: "55세 이전 해지 시 기타소득세(16.5%)가 추가로 부과될 수 있어요",
  },
];

const CHECKLIST = [
  "IRP 계좌 — KB국민은행 앱으로 10분 이내 개설",
  "계좌번호 인사팀 통보 — 메일·문자로 기록 남기기",
  "14일 이내 입금 — 초과 시 연 20% 지연이자 청구 가능",
  "운용 지시 — 원리금보장형 or ETF 선택",
  "연금 전환 — 55세 이후 수령 시 세금 30% 절감",
];

const FAQS = [
  {
    q: "국민은행 IRP 수수료는 얼마인가요?",
    a: "운용 수수료는 연 0.2~0.5% 수준이에요. 퇴직금 수령만 목적이라면 수수료 0% 상품도 있어요. 증권사 IRP보다 수수료가 다소 높을 수 있으니 비교해보세요.",
  },
  {
    q: "국민은행 IRP에서 ETF에 투자할 수 있나요?",
    a: "가능해요. KB스타뱅킹 앱에서 ETF·펀드·예금 등 다양한 상품에 투자할 수 있어요. 실적배당형은 원금 손실 가능성이 있으니 본인 성향에 맞게 선택하세요.",
  },
  {
    q: "퇴직금이 IRP로 들어오는 데 얼마나 걸려요?",
    a: "회사가 퇴직일로부터 14일 이내에 이체해야 해요. 14일을 넘기면 연 20%의 지연이자를 청구할 수 있고, 고용노동부(1350)에 신고도 가능해요.",
  },
  {
    q: "IRP에서 바로 인출하면 세금이 얼마나 나오나요?",
    a: "퇴직소득세가 부과돼요. 근속기간이 길수록 세금이 적어요. 55세 이후 연금으로 받으면 퇴직소득세의 30%를 절감할 수 있어요.",
  },
  {
    q: "국민은행과 증권사 IRP, 어느 쪽이 더 좋나요?",
    a: "퇴직금 보관만 목적이라면 수수료 차이가 크지 않아요. ETF 투자를 원한다면 증권사 IRP가 상품 종류가 더 많고 수수료가 낮은 편이에요. 국민은행은 오프라인 서비스가 편하고 접근성이 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 — IRP 계좌 의무 이전", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — IRP 가입 및 운용 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부 — 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 수수료 비교부터 개설까지." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 절차", description: "계좌 개설 후 이체까지 4단계." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 절세 방법까지 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="국민은행-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · KB국민은행 · IRP수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민은행 IRP로 퇴직금 받는 방법<br />
        계좌 개설부터 인출·연금 수령까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 300만원을 넘으면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있어요.
        KB국민은행 IRP는 앱(KB스타뱅킹)으로 10분이면 개설할 수 있고, 퇴직금 수령 후 ETF·예금으로 운용할 수 있어요.
        55세 이후 연금으로 받으면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>의 30%를 절감할 수 있어요.
        계좌 개설부터 인출까지 단계별로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>국민은행 IRP, 퇴직금 수령에 적합한가요?</H2>
      <p style={body}>
        국민은행 IRP는 오프라인 영업점 접근성이 좋고, 앱도 편해서 많이 선택해요.
        퇴직금 수령만 목적이라면 수수료 0% 상품을 고를 수도 있어요.
        ETF·펀드에 투자하고 싶다면 KB스타뱅킹 앱에서 다양한 상품을 고를 수 있어요.
      </p>
      <p style={body}>
        증권사 IRP에 비해 수수료가 약간 높을 수 있지만, 기존 국민은행 고객이라면 앱에서 바로 연동돼서 편리해요.
        퇴직 전 미리 개설해두면 퇴직금 수령 시 지연 없이 바로 이체받을 수 있어요.
      </p>

      <GreenBox title="국민은행 IRP 핵심 정보">
        수수료: 원리금보장형 0%, 실적배당형 연 0.2~0.5%<br />
        개설 방법: KB스타뱅킹 앱 또는 영업점 방문<br />
        연금 수령: 55세 이후, 퇴직소득세 30% 절감 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="국민은행 IRP로 퇴직금을 받을 준비가 됐어요. 아래 절세 계산기로 연금 전환 효과를 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. KB국민은행(1588-9999) 또는 금융감독원(1332) 상담을 권해요."
      />

      <Divider />

      <H2>일시 인출 vs 연금 수령, 세금 차이는?</H2>
      <p style={body}>
        IRP에서 바로 인출하면 퇴직소득세가 부과돼요.
        55세 이후 연금으로 나눠 받으면 세율이 30% 낮아져서 같은 금액이라도 세금이 줄어요.
        수령액과 근속기간을 입력해 절세 효과를 확인해보세요.
      </p>

      <SectionBadge>IRP 연금 전환 절세 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 세금은 근속기간·퇴직소득에 따라 달라요. 연금 수령 시 퇴직소득세 30% 절감 기준 (근로자퇴직급여보장법 제48조)."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>수령에 필요한 서류</H2>
      <p style={body}>
        IRP 개설과 퇴직금 수령에 필요한 서류는 많지 않아요.
        신분증과 퇴직 증빙 서류, 계좌 정보면 충분해요.
        앱으로 개설할 때는 공동인증서나 간편인증이 필요해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>국민은행 IRP 퇴직금 수령 4단계</H2>
      <p style={body}>
        계좌 개설부터 실제 수령까지 순서대로 따라가면 어렵지 않아요.
        퇴직 확정 전에 미리 개설해두는 게 핵심이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 수령 체크리스트</H2>
      <p style={body}>
        14일 이내 입금이 안 되면 연 20% 지연이자를 청구할 수 있어요. 놓치지 마세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="55세 이후 연금으로 받으면 세금이 줄어요">
        IRP에서 바로 인출하지 않고 55세부터 연금으로 받으면 퇴직소득세의 30%를 아낄 수 있어요.
        장기 보유 계획이라면 연금 전환을 고려해보세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        국민은행 IRP 퇴직금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
