"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "2022년 4월 14일 이후에 퇴직했거나 퇴직 예정이에요" },
  { id: "c2", label: "퇴직금이 300만원을 초과할 것 같아요" },
  { id: "c3", label: "IRP 계좌를 아직 개설하지 않았어요" },
  { id: "c4", label: "만 55세 미만이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액 (법정 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 의무 수령 해당 여부",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => v > 3000000 ? "IRP 수령 의무 (300만원 초과)" : "일반 계좌 수령 가능 (300만원 이하)",
  },
];

const DOCS = [
  { name: "IRP 계좌번호", required: true, where: "증권사·은행 앱 개설 후 확인" },
  { name: "신분증", required: true, where: "본인 지참 또는 앱 인증" },
  { name: "퇴직 확인서", required: false, where: "회사 인사팀" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
];

const STEPS = [
  {
    title: "퇴직금 300만원 초과 여부 확인",
    desc: "퇴직금이 300만원을 초과하면 2022년 4월 14일부터 IRP로만 수령해요. 300만원 이하라면 일반 계좌로도 받을 수 있어요. 퇴직 전에 예상 금액을 먼저 계산해보세요.",
    tip: "월급 × 근속연수로 대략적인 퇴직금을 추정할 수 있어요",
  },
  {
    title: "IRP 계좌 개설",
    desc: "증권사나 은행 앱으로 10분이면 개설 가능해요. 수수료가 낮은 증권사(미래에셋, 삼성증권, NH투자증권 등)를 권해요. 퇴직 전에 미리 만들어두면 이체 지연을 막을 수 있어요.",
    tip: "수수료 0% 상품도 있어요 (일부 증권사 퇴직금 수령 전용)",
  },
  {
    title: "인사팀에 IRP 계좌번호 통보",
    desc: "퇴직이 확정되면 IRP 계좌번호(은행명·계좌번호·예금주명)를 인사팀에 알려요. 메일이나 문자로 남기면 증거가 돼요. 회사는 퇴직일로부터 14일 이내에 이체해야 해요.",
    tip: "14일 초과 시 연 20% 지연이자를 청구할 수 있어요",
  },
  {
    title: "IRP에서 일시금 또는 연금 수령",
    desc: "IRP에 들어온 퇴직금을 바로 일시금으로 빼면 퇴직소득세를 내요. 55세 이후 연금으로 받으면 퇴직소득세를 30~40% 절감해요. 연금 수령이 가능한 나이라면 연금을 선택하는 게 유리해요.",
    tip: "10년 이상 연금 수령 시 퇴직소득세 40% 감면",
  },
];

const CHECKLIST = [
  "2022년 4월 14일부터 300만원 초과 퇴직금 → IRP 의무 수령",
  "IRP 계좌: 퇴직 전 미리 개설 (수수료 비교 후 선택)",
  "계좌번호 인사팀 통보: 메일·문자로 증거 남기기",
  "14일 기한 준수: 초과 시 지연이자(연 20%) 청구 가능",
  "연금 수령: 55세 이후 받으면 퇴직소득세 30~40% 절세",
];

const FAQS = [
  {
    q: "IRP 의무화가 정확히 언제부터인가요?",
    a: "2022년 4월 14일부터예요. 근로자퇴직급여보장법 개정으로 이 날 이후 퇴직하는 근로자는 300만원 초과 퇴직금을 IRP로만 수령해야 해요.",
  },
  {
    q: "2022년 4월 이전에 입사한 직원도 IRP가 필요한가요?",
    a: "퇴직 시점이 2022년 4월 14일 이후라면 필요해요. 입사 시점이 아니라 퇴직 시점 기준이에요.",
  },
  {
    q: "퇴직금이 정확히 300만원이면 어떻게 되나요?",
    a: "300만원 이하는 일반 계좌로 수령 가능해요. 300만원을 초과하면 IRP로만 수령해야 해요. 딱 300만원이면 일반 계좌도 가능해요.",
  },
  {
    q: "회사가 IRP 대신 현금으로 주겠다고 하면?",
    a: "300만원 초과 퇴직금을 IRP 이외 방법으로 지급하면 위법이에요. 고용노동부(1350)에 신고하면 돼요.",
  },
  {
    q: "IRP 없이 퇴직금이 들어오면 어떻게 되나요?",
    a: "회사가 이체할 수 없어서 지급이 지연돼요. 근로자 귀책으로 볼 수도 있어서 퇴직 전에 반드시 IRP를 개설하고 계좌번호를 알려줘야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: IRP 이체 의무 (2022년 4월 14일 시행)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: IRP 의무화 시행 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원: IRP 가입 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "어느 금융사가 유리한지, 수수료 비교까지." },
  { slug: "퇴직금-irp-의무", title: "IRP 의무 가입 대상", description: "의무 대상과 예외 사항을 설명해요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 연금 수령 시 절세 효과를 계산해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-연금-의무화-언제부터" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP의무화 · 시행일</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 의무화, 언제부터 적용되나요?<br />
        2022년 4월 기준 대상과 예외 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 수령해야 하는 의무화는 2022년 4월 14일부터 시행됐어요.
        입사 시점이 아니라 퇴직 시점이 기준이에요.
        IRP 없이 퇴직하면 회사가 이체할 수 없어 지급이 지연되고, 지연이자(연 20%) 문제로 이어질 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 의무화 대상, 내가 해당되는지 확인해보세요</H2>
      <p style={body}>
        2022년 4월 14일 이후에 퇴직하는 모든 근로자가 대상이에요.
        퇴직금이 300만원을 초과하면 IRP로만 수령 가능하고, 300만원 이하라면 일반 계좌로도 받을 수 있어요.
        퇴직연금(DB·DC형)에 가입된 회사라면 이미 IRP 수령 절차가 설계되어 있어요.
      </p>
      <p style={body}>
        IRP 계좌가 없으면 회사가 이체할 곳이 없어서 지급 자체가 지연돼요.
        이 경우엔 근로자 귀책으로 볼 수도 있어서, 퇴직 전에 반드시 개설해야 해요.
        수수료 비교만 먼저 해두면 개설은 앱으로 10분이면 돼요.
      </p>

      <GreenBox title="IRP 의무화 핵심 정리">
        시행일: 2022년 4월 14일 (근로자퇴직급여보장법 제9조)<br />
        대상: 퇴직금 300만원 초과 모든 근로자<br />
        예외: 300만원 이하 또는 만 55세 이상은 일반 계좌 수령 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 의무 수령 대상이에요. 아래 계산기로 퇴직금 예상액을 확인하세요."
        partialMatchText="조건에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>IRP 의무 수령 해당 여부 계산</H2>
      <p style={body}>
        월 평균임금과 근속 기간을 입력하면 퇴직금 예상액과 IRP 의무 수령 해당 여부를 바로 확인할 수 있어요.
        300만원 기준을 넘는지 미리 파악해서 IRP 개설 시점을 결정하세요.
      </p>

      <SectionBadge>퇴직금 IRP 의무 해당 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 최저 기준이에요. 실제 퇴직금은 상여금·수당 포함 시 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 개설에 필요한 서류</H2>
      <p style={body}>
        신분증 하나로 대부분 앱에서 10분 안에 개설 가능해요.
        수수료가 낮은 증권사를 선택하면 장기적으로 유리해요.
        퇴직 전에 미리 만들어두고 계좌번호만 인사팀에 전달하면 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 의무화 대응 4단계</H2>
      <p style={body}>
        퇴직금 금액 확인 → IRP 개설 → 계좌번호 통보 → 수령 방식 선택 순서예요.
        14일 기한 내에 이체가 완료되는지 꼭 확인하세요.
        지연이 발생하면 연 20% 지연이자를 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 의무화 대응 체크리스트</H2>
      <p style={body}>
        IRP 개설을 미루면 지급이 지연돼요. 퇴직이 확정되면 바로 개설하세요.
        연금 수령 방식을 선택하면 세금도 줄어들어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP에 넣어두면 세금이 줄어요">
        IRP 안에 두면 운용 수익에 세금이 없어요(과세 이연).<br />
        55세 이후 연금으로 수령하면 퇴직소득세를 30~40% 절감할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 IRP 의무화에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
