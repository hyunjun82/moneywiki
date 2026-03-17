"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "육아휴직을 사용했어요 (현재 중이거나 사용 후 복직했어요)" },
  { id: "c2", label: "입사일부터 퇴직일까지 총 1년 이상이에요" },
  { id: "c3", label: "육아휴직 전 급여명세서 3개월치가 있어요" },
  { id: "c4", label: "퇴직금을 아직 한 번도 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "육아휴직 전 월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "입사~퇴직 전체 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 (육아휴직 포함 전체 근속 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "근속 1년당 적립액",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "육아휴직 확인서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (육아휴직 전 3개월)", required: true, where: "회사 인사팀" },
  { name: "근로계약서", required: false, where: "회사 인사팀" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "육아휴직 기간의 근속 산입 여부 확인",
    desc: "육아휴직 기간은 퇴직금 근속기간에 포함돼요. 남녀고용평등법과 근로기준법에 따라 육아휴직은 계속 근로기간으로 인정해요. 육아휴직 1년을 썼어도 입사일부터 퇴직일까지 전체가 근속기간이에요.",
    tip: "육아휴직 기간 = 퇴직금 근속기간에 포함",
  },
  {
    title: "평균임금 계산 시 주의사항",
    desc: "퇴직금 평균임금은 퇴직 전 3개월 임금 기준이에요. 육아휴직 중이나 직후 퇴직하면 평균임금이 낮게 나올 수 있어요. 이 경우 육아휴직 전 3개월 임금을 기준으로 하는 게 유리하고, 법적으로도 허용돼요.",
    tip: "육아휴직 직후 퇴직 시 평균임금 산정 기준을 인사팀에 확인하세요",
  },
  {
    title: "퇴직금 계산 및 청구",
    desc: "전체 근속기간(육아휴직 포함)을 기준으로 퇴직금을 계산해요. 회사가 육아휴직 기간을 제외하고 계산했다면 차액이 있어요. 차액을 청구하거나 거부 시 고용노동부에 진정을 낼 수 있어요.",
    tip: "소멸시효 3년 이내라면 이미 퇴직 후에도 청구 가능",
  },
  {
    title: "IRP 계좌로 수령",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로만 수령해요. IRP 계좌번호를 인사팀에 알려주면 14일 이내에 이체돼요. IRP에서 연금으로 수령하면 퇴직소득세를 30% 절감할 수 있어요.",
    tip: "퇴직 전에 IRP 계좌 미리 만들어두세요",
  },
];

const CHECKLIST = [
  "육아휴직 기간: 퇴직금 근속기간에 반드시 포함",
  "평균임금: 육아휴직 직후 퇴직 시 기준 인사팀 확인",
  "퇴직금 계산 확인: 전체 근속기간 기준인지 확인",
  "IRP 계좌: 300만원 초과 시 필수 개설",
  "지급 기한: 퇴직 후 14일 이내 (초과 시 연 20% 지연이자)",
];

const FAQS = [
  {
    q: "육아휴직 기간이 퇴직금 계산에 포함되나요?",
    a: "맞아요. 남녀고용평등법 제19조에 따라 육아휴직 기간은 계속 근로기간으로 인정돼요. 퇴직금 근속기간에 포함돼요.",
  },
  {
    q: "육아휴직 중 퇴직하면 퇴직금이 줄어드나요?",
    a: "퇴직금 근속기간은 줄지 않아요. 하지만 퇴직 전 3개월 임금이 육아휴직급여(통상임금의 80%)라면 평균임금이 낮게 나올 수 있어요. 이 경우 육아휴직 전 임금을 기준으로 재산정을 요청할 수 있어요.",
  },
  {
    q: "육아휴직 후 바로 퇴직해도 퇴직금이 있나요?",
    a: "있어요. 육아휴직 기간 포함 총 근속기간이 1년 이상이면 퇴직금이 발생해요. 육아휴직 복귀 후 바로 퇴직해도 동일해요.",
  },
  {
    q: "회사가 육아휴직 기간을 근속기간에서 빼고 계산했어요",
    a: "위법이에요. 남녀고용평등법에 따라 육아휴직은 계속 근로기간으로 인정해야 해요. 고용노동부에 진정을 낼 수 있고, 차액을 청구할 수 있어요.",
  },
  {
    q: "배우자 출산휴가도 퇴직금 근속기간에 포함되나요?",
    a: "맞아요. 배우자 출산휴가, 출산전후휴가도 근로기준법에 따라 계속 근로기간으로 인정돼요. 퇴직금 계산에서 제외할 수 없어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "남녀고용평등법 제19조: 육아휴직 계속근로기간 산입", url: "https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 육아휴직 퇴직금 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년 이상 요건과 예외 상황." },
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산", description: "포함 항목과 산정 기준을 설명해요." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌로 안전하게 받는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-육아휴직" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 육아휴직 · 근속기간</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아휴직 기간도 퇴직금 계산에 포함되나요?<br />
        근속기간 산입 기준부터 평균임금 주의사항까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        육아휴직을 쓰고 나면 퇴직금이 줄어들까 걱정되죠.
        결론부터 말하면 육아휴직 기간은 퇴직금 근속기간에 그대로 포함돼요.
        <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법 제19조</a>에서 이걸 명시적으로 보장하기 때문에 회사가 임의로 뺄 수 없어요.
        단, 육아휴직 중이나 직후에 퇴직하면 평균임금이 낮게 잡힐 수 있어요. 이 부분만 정확히 알면 퇴직금을 온전히 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>육아휴직, 퇴직금 계산에 어떻게 반영되나요?</H2>
      <p style={body}>
        퇴직금은 '계속 근로기간 1년에 30일분 평균임금'으로 계산해요. 여기서 핵심은 '계속 근로기간'인데, 육아휴직 기간은 이 계속 근로기간에 포함돼요.
        육아휴직을 1년 썼어도 입사일부터 퇴직일 사이 기간 전부가 근속기간이에요.
      </p>
      <p style={body}>
        예를 들어 5년 근무 중 1년 육아휴직을 썼다면, 퇴직금 계산의 근속기간은 5년이에요. 육아휴직 기간을 뺀 4년이 아니에요.
        이 차이가 꽤 커요. 5년 기준이면 4년 기준보다 퇴직금이 25% 더 많아지거든요.
      </p>

      <GreenBox title="육아휴직 기간 = 퇴직금 근속기간 포함">
        남녀고용평등법 제19조 4항에 따라 육아휴직 기간은 계속 근로기간으로 인정돼요.<br />
        배우자 출산휴가, 출산전후휴가도 동일하게 포함돼요. 회사가 이를 제외하고 계산하면 위법이에요.
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="육아휴직 기간을 포함한 전체 근속기간으로 퇴직금을 받을 수 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="상황에 따라 판단이 달라질 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>육아휴직 포함 예상 퇴직금 계산해보세요</H2>
      <p style={body}>
        아래 계산기는 육아휴직 전 월 평균급여와 입사~퇴직 전체 기간을 기준으로 퇴직금을 추산해요.
        육아휴직 기간을 포함한 전체 근속기간을 입력하면 돼요.
      </p>
      <p style={body}>
        육아휴직 직후 퇴직 시 평균임금이 낮게 산정될 수 있어요. 이 경우 아래 계산값과 차이가 날 수 있으니 인사팀에 정확한 평균임금을 확인하는 게 좋아요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 육아휴직 전 월 평균급여 기준 추산. 육아휴직 직후 퇴직 시 실제 금액과 차이가 있을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 수령에 필요한 서류</H2>
      <p style={body}>
        육아휴직 후 퇴직 시에는 일반 퇴직보다 서류가 조금 더 필요해요.
        회사가 평균임금을 어떻게 산정했는지 확인하려면 급여명세서가 핵심이에요.
        육아휴직 전 3개월치와 퇴직 전 3개월치를 모두 받아두세요.
      </p>
      <p style={body}>
        IRP 계좌는 퇴직금 300만원 초과 시 필수예요. 퇴직 전에 미리 만들어두지 않으면 지급이 지연될 수 있어요.
        은행이나 증권사 앱에서 10분이면 개설할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>육아휴직 후 퇴직금 수령 4단계 절차</H2>
      <p style={body}>
        육아휴직 후 퇴직금 수령 과정에서 가장 많이 놓치는 게 평균임금 산정 기준이에요.
        회사가 자동으로 유리하게 계산해주지 않는 경우도 있어서 직접 확인이 필요해요.
        4단계를 순서대로 진행하면 손해 없이 퇴직금을 받을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>육아휴직 퇴직금 체크리스트</H2>
      <p style={body}>
        퇴직 전에 아래 항목을 하나씩 점검해두면 퇴직금 손해를 막을 수 있어요.
        특히 평균임금과 IRP 계좌는 퇴직 전날까지 준비해야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="회사가 육아휴직을 제외하고 계산했다면?">
        즉시 인사팀에 서면으로 이의를 신청하세요.<br />
        거부하면 고용노동부(1350)에 진정을 낼 수 있어요. 퇴직 후라도 소멸시효 3년 안이면 청구 가능해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        육아휴직과 퇴직금을 둘러싼 질문 중 가장 많이 나오는 것들만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 남녀고용평등법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
