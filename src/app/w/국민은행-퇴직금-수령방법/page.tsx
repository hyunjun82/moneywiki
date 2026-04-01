"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 300만원을 초과해요" },
  { id: "c2", label: "퇴직이 확정됐거나 퇴직일이 정해졌어요" },
  { id: "c3", label: "KB국민은행 IRP 계좌를 개설했거나 개설할 수 있어요" },
  { id: "c4", label: "IRP 계좌번호를 회사 인사팀에 알려줬어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 수령액", min: 300, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 40, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "일시금 인출 시 퇴직소득세 (근사치)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const rate = Math.max(0.01, 0.12 - v.years * 0.003);
      return Math.round(base * rate);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 시 절세액 (퇴직소득세 30% 절감)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const rate = Math.max(0.01, 0.12 - v.years * 0.003);
      return Math.round(base * rate * 0.3);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "퇴직확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "KB국민은행 IRP 계좌번호", required: true, where: "KB스타뱅킹 앱 또는 통장" },
  { name: "근로소득 원천징수영수증 (연금 전환 신청 시)", required: false, where: "회사 인사팀 또는 홈택스" },
];

const STEPS = [
  {
    title: "KB국민은행 IRP 계좌 개설",
    desc: "KB스타뱅킹 앱이나 영업점에서 IRP 계좌를 개설해요. 앱으로 10분 이내에 가능하고, 공동인증서 또는 간편인증이 필요해요. 퇴직 전에 미리 만들어두면 퇴직금 이체가 지연되지 않아요.",
    tip: "기존 국민은행 계좌가 있으면 앱에서 바로 IRP 개설 가능해요",
  },
  {
    title: "IRP 계좌번호 인사팀에 통보",
    desc: "퇴직이 확정되면 IRP 계좌번호(은행명·계좌번호·예금주)를 인사팀에 문자나 메일로 알려줘요. 회사는 퇴직일로부터 14일 이내에 이 계좌로 퇴직금을 이체해야 해요. 14일을 넘기면 연 20% 지연이자를 청구할 수 있어요.",
    tip: "구두보다 문자·메일로 통보해야 증거가 남아요",
  },
  {
    title: "운용 상품 선택",
    desc: "퇴직금이 IRP에 들어오면 어떻게 운용할지 선택해야 해요. 원리금보장형(예금·채권)과 실적배당형(ETF·펀드) 중 고를 수 있어요. 운용 지시 없이 두면 기본 원리금보장형으로 배정돼요.",
    tip: "단기 보유라면 원리금보장형, 장기 운용이라면 ETF 분산 투자도 고려해보세요",
  },
  {
    title: "일시금 인출 또는 연금 수령 선택",
    desc: "IRP에서 바로 인출하면 퇴직소득세가 부과돼요. 55세 이후 연금으로 받으면 퇴직소득세의 30%를 줄일 수 있어요. 인출은 KB스타뱅킹 앱 또는 영업점에서 신청해요.",
    tip: "55세 미만에 중도 해지하면 기타소득세(16.5%)가 추가 부과될 수 있어요",
  },
];

const CHECKLIST = [
  "퇴직 전 IRP 계좌 개설: KB스타뱅킹 앱으로 10분 이내",
  "계좌번호 인사팀 통보: 메일·문자로 기록 남기기",
  "퇴직일 기준 14일 이내 입금 여부 확인",
  "14일 초과 시 연 20% 지연이자 청구 가능",
  "운용 지시: 원리금보장형 또는 ETF 선택",
  "55세 이후 연금 수령 시 퇴직소득세 30% 절감",
];

const FAQS = [
  {
    q: "KB국민은행 IRP 수수료는 얼마예요?",
    a: "원리금보장형은 수수료 0%예요. 실적배당형(ETF·펀드)은 연 0.2~0.5% 수준이에요. 퇴직금 수령만 목적이라면 수수료 부담이 없어요. 증권사 IRP보다 수수료가 약간 높을 수 있으니 비교해보는 게 좋아요.",
  },
  {
    q: "퇴직금이 IRP에 들어오는 데 얼마나 걸려요?",
    a: "회사가 퇴직일로부터 14일 이내에 이체해야 해요. 14일을 넘기면 연 20%의 지연이자를 청구할 수 있고, 고용노동부(1350)에 신고도 가능해요.",
  },
  {
    q: "IRP에서 바로 인출하면 세금이 얼마 나오나요?",
    a: "퇴직소득세가 부과돼요. 근속기간이 길수록 세금이 적어요. 55세 이후 연금으로 받으면 퇴직소득세의 30%를 줄일 수 있어요.",
  },
  {
    q: "KB국민은행 IRP에서 ETF에 투자할 수 있나요?",
    a: "가능해요. KB스타뱅킹 앱에서 ETF·펀드·예금 등 다양한 상품을 선택해 운용할 수 있어요. 실적배당형은 원금 손실 가능성이 있으니 본인 투자 성향에 맞게 선택하세요.",
  },
  {
    q: "국민은행과 증권사 IRP, 어느 쪽이 더 유리해요?",
    a: "퇴직금 보관만 목적이라면 수수료 차이가 크지 않아요. ETF 투자를 원한다면 증권사 IRP가 상품 종류가 더 많고 수수료가 낮은 편이에요. 국민은행은 오프라인 영업점 접근성이 좋고 기존 고객이라면 앱 연동이 편해요.",
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
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 안내", description: "일시금·연금·IRP 이전 절차까지." },
  { slug: "퇴직금-irp-의무", title: "퇴직금 IRP 의무 이전 규정", description: "300만원 초과 시 IRP 의무화 기준." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="국민은행-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · KB국민은행 · IRP 수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민은행 IRP로 퇴직금 받으려면?<br />
        계좌 개설부터 일시금·연금 수령까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 300만원을 넘으면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있어요.
        KB국민은행 IRP는 KB스타뱅킹 앱으로 10분이면 개설되고, 퇴직금 수령 후 ETF·예금으로 운용도 돼요.
        55세 이후 연금으로 받으면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>의 30%를 줄일 수 있어요.
        계좌 개설부터 일시금·연금 수령까지 단계별로 보여드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>국민은행 IRP 수령, 내가 준비됐나요?</H2>
      <p style={body}>
        퇴직금이 300만원을 초과하면 <a href="/w/퇴직금-irp-의무" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌 이전이 의무</a>예요.
        KB국민은행 IRP는 기존 국민은행 계좌가 있으면 앱에서 바로 연동되고, 오프라인 영업점도 전국에 많아서 접근성이 좋아요.
        원리금보장형을 선택하면 수수료가 0%라서 퇴직금 수령만 목적이라면 비용 부담이 없어요.
      </p>
      <p style={body}>
        퇴직 전에 IRP를 미리 만들어두는 게 중요해요.
        퇴직 후에 개설하면 회사가 계좌를 확인하는 데 시간이 걸려서 14일 이내 이체가 늦어질 수 있거든요.
        증권사 IRP보다 ETF 상품 종류가 적을 수 있지만, 편의성과 접근성은 국민은행이 높아요.
      </p>

      <GreenBox>
        수수료: 원리금보장형 0%, 실적배당형 연 0.2~0.5%<br />
        개설 방법: KB스타뱅킹 앱 또는 영업점 방문 (10분 이내)<br />
        연금 수령: 55세 이후, 퇴직소득세 30% 절감 가능
      </GreenBox>

      <SectionBadge>수령 준비 조건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="국민은행 IRP로 퇴직금을 받을 준비가 됐어요. 아래 계산기로 세후 수령액을 확인해보세요."
        partialMatchText="조건이 다를 수 있어요. KB국민은행(1588-9999) 또는 금융감독원(1332)에 상담해보세요."
      />

      <Divider />

      <H2>일시금 vs 연금 수령, 세금 차이 계산해보세요</H2>
      <p style={body}>
        IRP에서 바로 인출하면 퇴직소득세가 부과돼요.
        55세 이후 연금으로 나눠 받으면 같은 금액이라도 세율이 30% 낮아져서 손에 쥐는 돈이 늘어요.
        수령액과 근속기간을 조정해서 절세 효과를 직접 확인해보세요.
      </p>

      <SectionBadge>세후 수령액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직소득세는 근속기간·퇴직소득에 따라 달라요. 연금 수령 시 퇴직소득세 30% 절감 기준 (근로자퇴직급여보장법 제48조)."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>IRP 개설 및 수령에 필요한 서류</H2>
      <p style={body}>
        IRP 개설과 퇴직금 수령에 필요한 서류는 많지 않아요.
        신분증과 퇴직 증빙 서류, 계좌 정보면 충분해요.
        앱으로 개설할 때는 공동인증서 또는 간편인증이 필요하고, 영업점 방문 시에는 신분증만 있으면 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>KB국민은행 IRP 퇴직금 수령 4단계</H2>
      <p style={body}>
        계좌 개설부터 실제 수령까지 순서대로 따라가면 어렵지 않아요.
        퇴직 확정 전에 미리 개설해두는 게 핵심이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        14일 이내 입금이 안 되면 연 20% 지연이자를 청구할 수 있어요.
        날짜를 반드시 체크하고, 미입금 시 바로 인사팀에 연락하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
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
