"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "IBK기업은행 IRP 계좌가 있거나 개설할 예정이에요" },
  { id: "c2", label: "퇴직금이 300만원을 초과해요" },
  { id: "c3", label: "퇴직이 확정됐거나 곧 퇴직해요" },
  { id: "c4", label: "중소기업 재직자이거나 기업은행 거래 고객이에요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "IRP 수령액", min: 300, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 40, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직소득세 (일시 인출 시, 근사치)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const rate = Math.max(0.01, 0.12 - v.years * 0.003);
      return Math.round(base * rate);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 시 절세액 (30% 절감)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const rate = Math.max(0.01, 0.12 - v.years * 0.003);
      return Math.round(base * rate * 0.3);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "퇴직확인서 (또는 사직서 사본)", required: true, where: "회사 인사팀" },
  { name: "IRP 계좌 정보 (계좌번호)", required: true, where: "IBK기업은행 앱 또는 통장" },
  { name: "근로소득 원천징수영수증 (연금 전환 시)", required: false, where: "회사 인사팀 또는 홈택스" },
];

const STEPS = [
  {
    title: "IBK IRP 계좌 개설",
    desc: "IBK기업은행 앱(i-ONE Bank) 또는 영업점 방문으로 IRP 계좌를 개설해요. 앱으로 10분 이내에 가능하고, 공동인증서나 간편인증이 필요해요. 중소기업 재직자라면 기업은행 거래 고객이 많아 IRP 개설도 편해요.",
    tip: "기업은행 통장이 이미 있다면 앱에서 바로 IRP 연결 가능",
  },
  {
    title: "계좌번호 인사팀 통보",
    desc: "퇴직이 확정되면 IRP 계좌번호를 인사팀에 문자나 메일로 알려줘요. 회사는 퇴직일 후 14일 이내에 퇴직금을 IRP로 이체해야 해요. 14일을 넘기면 연 20% 지연이자를 청구할 수 있어요.",
    tip: "문자·메일로 통보하면 증거가 남아요",
  },
  {
    title: "운용 지시",
    desc: "퇴직금이 들어오면 어떻게 운용할지 선택해야 해요. 원리금보장형(예금·채권)과 실적배당형(ETF·펀드) 중 선택할 수 있어요. 운용 지시를 하지 않으면 기본 원리금보장형으로 배정돼요.",
    tip: "단기 보유라면 원리금보장형, 장기라면 ETF 혼합도 고려해보세요",
  },
  {
    title: "인출 또는 연금 수령",
    desc: "IRP에서 바로 인출하면 퇴직소득세가 부과돼요. 55세 이후 연금으로 받으면 세율이 30% 낮아져요. i-ONE Bank 앱이나 영업점에서 인출 신청할 수 있어요.",
    tip: "55세 미만 중도 해지 시 기타소득세(16.5%) 추가 부과 가능",
  },
];

const CHECKLIST = [
  "IRP 계좌: i-ONE Bank 앱으로 10분 이내 개설",
  "계좌번호 인사팀 통보: 메일·문자로 기록",
  "14일 이내 입금 확인: 초과 시 연 20% 지연이자",
  "운용 지시: 원리금보장형 or ETF 선택",
  "연금 전환: 55세 이후 수령 시 세금 30% 절감",
];

const FAQS = [
  {
    q: "기업은행 IRP 수수료는 얼마인가요?",
    a: "원리금보장형은 수수료 0%, 실적배당형은 연 0.2~0.4% 수준이에요. 퇴직금 수령만 목적이라면 수수료 부담이 거의 없어요.",
  },
  {
    q: "중소기업 재직자만 기업은행 IRP를 쓸 수 있나요?",
    a: "아니에요. 누구든 IBK기업은행 IRP를 개설할 수 있어요. 다만 기업은행은 중소기업 거래처가 많아 직장인들이 자연스럽게 많이 이용해요.",
  },
  {
    q: "기업은행 IRP에서 ETF 투자가 가능한가요?",
    a: "가능해요. i-ONE Bank 앱에서 ETF·펀드를 선택해 운용할 수 있어요. 원금 손실 가능성이 있으니 투자 성향에 맞게 선택하세요.",
  },
  {
    q: "퇴직금이 IRP에 들어오는 기간은?",
    a: "회사가 퇴직일로부터 14일 이내에 이체해야 해요. 14일을 넘기면 지연이자(연 20%)를 청구하거나 고용노동부(1350)에 신고할 수 있어요.",
  },
  {
    q: "기업은행 IRP를 나중에 다른 곳으로 옮길 수 있나요?",
    a: "가능해요. IRP 계좌는 금융기관 간 이전(계좌 이동)이 가능해요. 수수료나 운용 상품이 더 좋은 곳으로 옮기고 싶다면 이전 신청을 하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: IRP 계좌 의무 이전", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 가입 및 운용 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
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
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="기업은행-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IBK기업은행 · IRP수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기업은행 IRP로 퇴직금 받는 방법<br />
        계좌 개설부터 인출·연금 수령까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 300만원을 넘으면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있어요.
        IBK기업은행 IRP는 앱(i-ONE Bank)으로 10분이면 개설되고, 중소기업 재직자들이 많이 이용해요.
        55세 이후 연금으로 받으면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>의 30%를 절감할 수 있어요.
        개설부터 수령까지 단계별로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기업은행 IRP, 퇴직금 수령에 적합한가요?</H2>
      <p style={body}>
        IBK기업은행은 중소기업 거래처가 많아서 중소기업 재직자라면 이미 기업은행 통장을 갖고 있는 경우가 많아요.
        앱(i-ONE Bank)에서 바로 IRP를 연결할 수 있어 개설이 편하고, 퇴직금 수령 목적이라면 수수료 0% 원리금보장형을 선택할 수 있어요.
        ETF·펀드 투자도 앱에서 가능해요.
      </p>
      <p style={body}>
        증권사 IRP에 비해 상품 수가 적을 수 있지만, 오프라인 영업점 접근이 쉽고 고객센터 상담이 편해요.
        퇴직 전 미리 개설해두면 퇴직금 수령 지연 없이 바로 받을 수 있어요.
      </p>

      <GreenBox title="기업은행 IRP 핵심 정보">
        수수료: 원리금보장형 0%, 실적배당형 연 0.2~0.4%<br />
        개설: i-ONE Bank 앱 또는 영업점 방문<br />
        연금 수령: 55세 이후, 퇴직소득세 30% 절감 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="기업은행 IRP로 퇴직금을 받을 준비가 됐어요. 아래 절세 계산기로 연금 전환 효과를 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. IBK기업은행 고객센터(1566-2566) 또는 금융감독원(1332) 상담을 권해요."
      />

      <Divider />

      <H2>일시 인출 vs 연금 수령, 세금 차이는?</H2>
      <p style={body}>
        IRP에서 바로 인출하면 퇴직소득세가 부과돼요.
        55세 이후 연금으로 나눠 받으면 세율이 30% 낮아져요.
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
        신분증과 퇴직 증빙 서류, 계좌 정보면 충분해요.
        앱으로 개설할 때는 공동인증서나 간편인증이 필요해요.
        영업점 방문 시에는 청구서를 직접 작성해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>기업은행 IRP 퇴직금 수령 4단계</H2>
      <p style={body}>
        계좌 개설부터 실제 수령까지 순서대로 따라가면 어렵지 않아요.
        퇴직 확정 전에 미리 개설해두는 게 가장 중요해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 수령 체크리스트</H2>
      <p style={body}>
        14일 이내 입금이 안 되면 지연이자를 청구할 수 있어요. 날짜를 꼭 체크하세요.
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
        기업은행 IRP 퇴직금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
