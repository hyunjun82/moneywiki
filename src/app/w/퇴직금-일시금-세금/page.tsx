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
  { id: "c1", label: "퇴직금을 일시금으로 받았거나 받을 예정이에요" },
  { id: "c2", label: "퇴직 후 IRP 계좌로 퇴직금이 들어왔어요" },
  { id: "c3", label: "IRP에서 일시금 인출 신청을 했거나 할 예정이에요" },
  { id: "c4", label: "퇴직소득 원천징수영수증을 아직 못 받았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 1000, step: 50, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "근속연수 공제액",
    getValue: (v: Record<string, number>) => {
      const y = v.years;
      if (y <= 5) return 300000 * y;
      if (y <= 10) return 1500000 + 500000 * (y - 5);
      if (y <= 20) return 4000000 + 800000 * (y - 10);
      return 12000000 + 1200000 * (y - 20);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "예상 퇴직소득세",
    getValue: (v: Record<string, number>) => {
      const total = v.salary * 10000 * v.years;
      const y = v.years;
      let deduction = 0;
      if (y <= 5) deduction = 300000 * y;
      else if (y <= 10) deduction = 1500000 + 500000 * (y - 5);
      else if (y <= 20) deduction = 4000000 + 800000 * (y - 10);
      else deduction = 12000000 + 1200000 * (y - 20);
      const taxBase = Math.max(0, total - deduction);
      const annualBase = taxBase / y;
      let rate = 0;
      if (annualBase <= 14000000) rate = 0.06;
      else if (annualBase <= 50000000) rate = 0.15;
      else if (annualBase <= 88000000) rate = 0.24;
      else rate = 0.35;
      return Math.round(taxBase * rate * 0.5);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (참고값)`,
  },
];

const DOCS = [
  { name: "퇴직소득 원천징수영수증", required: true, where: "회사 인사팀 요청 또는 홈택스 조회" },
  { name: "근로계약서 또는 재직증명서 (근속기간 확인)", required: true, where: "회사 인사팀" },
  { name: "경정청구서 (세금 과다 납부 시)", required: false, where: "국세청 홈택스 작성" },
  { name: "중간정산 확인서 (중간정산 이력 있는 경우)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "퇴직소득 원천징수영수증 수령",
    desc: "회사 인사팀에 퇴직소득 원천징수영수증을 요청해요. 퇴직 후에도 재발급 요청이 가능하고, 홈택스에서도 조회할 수 있어요. 이 영수증에 근속연수 공제와 실납부 세액이 모두 나와요.",
    tip: "퇴직 직후 받아두는 게 좋아요. 경정청구 기한(5년)이 있으니 나중에도 가능해요",
    link: { label: "홈택스에서 조회하기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "근속연수 공제 적용 확인",
    desc: "영수증에서 근속연수 공제가 맞게 적용됐는지 확인해요. 5년 이하 30만원/년, 10년 이하 50만원/년(150만원 기본), 20년 이하 80만원/년(400만원 기본), 20년 초과 120만원/년(1,200만원 기본)이 기준이에요.",
    tip: "중간정산 이력이 있으면 정산 이후 근속연수로 다시 계산해요",
  },
  {
    title: "세액 이의 있으면 경정청구",
    desc: "공제가 잘못 적용됐거나 세금이 과다하게 나왔다면 홈택스에서 경정청구를 할 수 있어요. 납부 기준일로부터 5년 이내면 언제든 신청 가능하고, 과다 납부 금액을 환급받을 수 있어요.",
    tip: "홈택스 메뉴: 세금신고 → 경정청구",
    link: { label: "경정청구 신청하기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "IRP 연금 수령 절세 여부 판단",
    desc: "IRP 계좌에 퇴직금이 있다면 55세 이후 연금으로 수령하면 퇴직소득세를 30~40% 줄일 수 있어요. 일시금으로 빼면 감면 없이 세금 전액을 납부해요. 퇴직금 규모가 클수록 절세 금액 차이가 커요.",
    tip: "10년 이상 연금 수령 시 퇴직소득세 최대 40% 감면돼요",
  },
];

const CHECKLIST = [
  "퇴직소득 원천징수영수증: 퇴직 직후 인사팀에서 수령",
  "근속연수 공제 확인: 5·10·20년 구간별 적용 여부",
  "중간정산 이력: 있으면 이후 기간 기준으로 재계산",
  "경정청구: 세금 과다 납부 시 납부일로부터 5년 이내",
  "IRP 연금 수령: 55세 이후 연금으로 받으면 세금 30~40% 절세",
];

const FAQS = [
  {
    q: "퇴직금 일시금 세금이 얼마나 나오나요?",
    a: "근속 기간과 퇴직금 규모에 따라 크게 달라요. 근속 10년에 퇴직금 3,500만원이라면 근속연수 공제 후 실질 세율이 5% 안팎으로, 수십만 원~100만원 수준이에요. 근속기간이 길수록 공제가 커져서 세금이 줄어요.",
  },
  {
    q: "퇴직소득세는 종합소득세에 합산되나요?",
    a: "아니에요. 퇴직소득은 분리과세예요. 다른 소득(근로·사업·이자·배당)과 합산하지 않고 별도로 계산해요. 연봉이 높아도 퇴직금 세금에는 영향이 없어요.",
  },
  {
    q: "회사가 세금을 알아서 처리해주나요?",
    a: "맞아요. 회사가 퇴직금 지급 시 퇴직소득세를 원천징수해서 세무서에 납부해요. 별도 신고 없이 처리돼요. 퇴직소득 원천징수영수증은 꼭 받아두세요.",
  },
  {
    q: "IRP로 받으면 세금이 달라지나요?",
    a: "IRP에 이체되는 것만으로는 세금이 달라지지 않아요. 그 돈을 55세 이후 연금으로 10년 이상 수령하면 퇴직소득세가 30~40% 감면돼요. 일시금으로 인출하면 일반 퇴직소득세가 그대로 나와요.",
  },
  {
    q: "세금을 더 낸 것 같으면 어떻게 하나요?",
    a: "국세청 홈택스에서 경정청구를 하면 돼요. 근속연수 공제 계산 오류, 중간정산 이력 처리 누락 등이 원인인 경우가 많아요. 납부일로부터 5년 이내면 신청할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조: 퇴직소득 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조: 퇴직소득공제(근속연수 공제)", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 퇴직소득세 계산 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 퇴직소득세 모의계산 및 경정청구", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 구조와 세율 구간 정리." },
  { slug: "퇴직금-세금-몇프로", title: "퇴직금 세금 몇 프로?", description: "근속연수별 실효 세율 계산법." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "퇴직금 절세 방법", description: "IRP 연금 수령으로 세금 30~40% 아끼는 법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-일시금-세금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일시금 · 퇴직소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 일시금으로 받으면 세금이 얼마나 나오나요?<br />
        근속연수 공제부터 절세 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 일시금으로 받을 때 "세금이 얼마나 나오지?" 바로 떠오르는 질문이죠.
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>는
        일반 소득세와 계산 방식이 달라서, 근속기간이 길수록 공제가 커지고 세율도 낮아져요.
        근속 10년이면 생각보다 세금이 적게 나오는 게 이 때문이에요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 원천징수로 알아서 처리해주지만, 공제가 제대로 적용됐는지는 본인이 확인해야 해요.
        잘못 적용됐으면 5년 이내에 경정청구로 환급받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 일시금 세금, 어떻게 계산되나요?</H2>
      <p style={body}>
        퇴직소득세는 퇴직금에서 근속연수 공제를 먼저 뺀 뒤 세율을 적용해요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제48조</a>가
        근속연수 공제 기준을 정하고 있는데, 근속기간에 따라 수십~수천만 원을 먼저 공제해줘요.
        공제 후 남은 금액에만 세율이 붙어요.
      </p>
      <p style={body}>
        공제 후 남은 금액은 근속연수로 나눠 연 단위 환산급여를 계산하고, 여기서 환산급여공제도 한 번 더 적용돼요.
        두 단계 공제를 거치면 최종 실질 세율이 퇴직금의 5~10% 수준까지 낮아지는 경우가 많아요.
        퇴직소득은 분리과세라 연봉이나 다른 소득과 합산되지 않아요.
      </p>

      <GreenBox>
        · 5년 이하: 근속연수 × 30만원<br />
        · 6~10년: 150만원 + (근속연수-5) × 50만원<br />
        · 11~20년: 400만원 + (근속연수-10) × 80만원<br />
        · 20년 초과: 1,200만원 + (근속연수-20) × 120만원
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직소득세 확인이 필요한 상황이에요. 아래 계산기로 예상 세금을 먼저 확인하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 국세청(126) 또는 세무사 상담을 권해요."
      />

      <Divider />

      <H2>내 퇴직금에 세금이 얼마나 붙나요?</H2>
      <p style={body}>
        월 평균급여와 근속 기간을 조정하면 예상 퇴직금, 근속연수 공제액, 퇴직소득세 참고값을 바로 볼 수 있어요.
        실제 세액은 환산급여공제 계산이 별도로 있어서 아래 수치보다 낮게 나오는 경우가 많아요.
        정확한 금액은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 퇴직소득 모의계산</a>으로
        확인하세요.
      </p>

      <SectionBadge>퇴직소득세 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 환산급여공제 미적용 참고값. 실제 세금은 홈택스 모의계산으로 확인하세요."
      />

      <p style={body}>
        근속 기간 슬라이더를 조정해보면 공제액이 늘어나면서 세금이 줄어드는 게 보여요.
        같은 퇴직금이라도 10년과 20년 근속의 세금 차이가 큰 게 근속연수 공제 효과예요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직소득세 신고에 필요한 서류</H2>
      <p style={body}>
        퇴직소득세는 회사가 원천징수로 처리해요. 별도 신고는 필요 없지만, 공제가 제대로 적용됐는지 확인하려면
        원천징수영수증이 반드시 있어야 해요. 중간정산 이력이 있다면 확인서도 챙겨두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        경정청구는 납부일로부터 5년 이내면 언제든 신청할 수 있어요.
        근속연수 계산 오류나 중간정산 처리 누락이 가장 흔한 원인이에요.
      </p>

      <Divider />

      <H2>퇴직소득세 납부 절차</H2>
      <p style={body}>
        대부분은 회사가 처리해줘서 별도 행동이 필요 없지만, 세금이 제대로 계산됐는지 직접 확인하는 두 번째 단계가 중요해요.
        IRP에서 일시금 인출을 선택하기 전에 연금 수령과 세금 차이도 꼭 비교해보세요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        세금 환급 확인은 놓치기 쉬운 단계예요.
        중간정산 이력이 있거나 근속기간 계산에 오류가 있었다면 납부 세금을 돌려받을 수 있어요.
        이왕이면 퇴직 직후에 챙기는 게 편해요.
      </p>

      <Divider />

      <H2>퇴직 전후 세금 체크리스트</H2>
      <p style={body}>
        회사가 알아서 처리해주는 부분도 있지만, 직접 챙겨야 하는 항목도 있어요.
        놓치면 불필요하게 세금을 더 낼 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        · 55세 이후 연금 수령 시 퇴직소득세 30% 감면<br />
        · 10년 초과 수령 시 추가 10% 감면 (총 최대 40%)<br />
        · 일시금 인출 시 감면 없음: 연금 수령 여부가 핵심
      </GreenBox>

      <p style={body}>
        IRP 연금 절세는 퇴직금 규모가 클수록 효과가 커요.
        퇴직금이 5,000만원 이상이고 55세까지 시간 여유가 있다면 연금 수령 방식을 진지하게 검토할 만해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 일시금 세금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
