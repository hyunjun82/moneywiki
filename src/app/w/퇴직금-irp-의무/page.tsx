"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "2022년 4월 14일 이후 퇴직했거나 퇴직 예정이에요" },
  { id: "c2", label: "퇴직일 기준 만 55세 미만이에요" },
  { id: "c3", label: "퇴직금이 300만원을 초과해요" },
  { id: "c4", label: "IRP 계좌가 아직 없어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 20, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 의무 여부",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => v > 3000000 ? "IRP 계좌 의무 (300만원 초과)" : "일반 계좌 가능 (300만원 이하)",
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "IRP 계좌번호 (은행명·계좌번호·예금주)", required: true, where: "IRP 개설 금융기관" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "IRP 의무 대상 해당 여부 확인",
    desc: "퇴직일 기준 만 55세 미만이고 퇴직금이 300만원을 초과하면 IRP 의무 대상이에요. 2022년 4월 14일 이후 퇴직하는 경우 모두 해당돼요. 55세 생일이 퇴직일 이전이면 예외예요.",
    tip: "55세 생일이 퇴직일 전인지 후인지 확인하세요. 하루 차이로 달라져요",
  },
  {
    title: "금융사별 IRP 수수료 비교",
    desc: "증권사 IRP는 수수료가 연 0.2% 수준으로 은행(0.3~0.5%)보다 낮아요. 퇴직금 규모가 클수록 수수료 차이가 커지고, ETF 투자도 가능해요. 퇴직금 수령만 목적이면 수수료 0% 상품도 있어요.",
    tip: "미래에셋·삼성증권·NH투자증권 등 증권사 IRP가 수수료 낮음",
  },
  {
    title: "모바일 앱으로 IRP 개설",
    desc: "금융사 앱으로 10분이면 개설할 수 있어요. 신분증과 공동인증서(또는 간편인증)만 있으면 돼요. 일부 은행은 비대면 개설 한도가 있어 방문이 필요할 수 있어요.",
    tip: "퇴직 확정되면 바로 개설하세요. 늦으면 퇴직금 이체가 지연돼요",
  },
  {
    title: "계좌번호를 회사 인사팀에 전달",
    desc: "IRP 계좌번호(은행명, 계좌번호, 예금주명)를 인사팀에 문자나 메일로 알려줘요. 회사는 14일 이내에 이 계좌로 퇴직금을 이체해야 해요. 지연 시 연 20% 지연이자가 발생해요.",
    tip: "구두보다 문자·메일로 남겨두는 게 나중에 증거가 돼요",
  },
];

const CHECKLIST = [
  "IRP 의무 대상 해당 여부 확인: 55세 미만 + 퇴직금 300만원 초과",
  "금융사별 IRP 수수료 비교 후 결정",
  "모바일 앱으로 IRP 개설 (10분)",
  "계좌번호를 회사 인사팀에 문자·메일로 전달",
  "추가 납입으로 연말정산 세액공제 활용 검토",
];

const FAQS = [
  {
    q: "IRP 의무 가입 대상이 누구인가요?",
    a: "2022년 4월 14일 이후 퇴직하는 만 55세 미만 근로자 중 퇴직금이 300만원을 초과하는 경우 의무 대상이에요. 두 조건이 모두 해당돼야 해요.",
  },
  {
    q: "IRP 의무 금액 기준은 세전인가요, 세후인가요?",
    a: "세전 퇴직금 총액 기준이에요. 300만원 초과 여부를 판단할 때 퇴직소득세 공제 전 금액으로 봐요.",
  },
  {
    q: "IRP 의무를 어기면 어떻게 되나요?",
    a: "의무를 어기는 주체는 회사예요. 회사가 IRP가 아닌 일반 계좌로 지급하면 과태료가 부과될 수 있어요. 근로자에게 직접적인 불이익은 없어요.",
  },
  {
    q: "IRP 의무 예외가 되는 조건은?",
    a: "만 55세 이상, 퇴직금 300만원 이하, 근로자 사망, 퇴직연금 담보대출 상계로 지급되는 경우예요. 이 중 하나라도 해당하면 일반 계좌로 받을 수 있어요.",
  },
  {
    q: "의무 가입 외 추가 납입도 가능한가요?",
    a: "가능해요. 퇴직금 수령분 외에 연간 1,800만원까지 추가 납입할 수 있어요. 이 중 900만원까지 세액공제(13.2~16.5%)를 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: IRP 의무 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: IRP 의무 가입 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-irp-의무-예외", title: "IRP 의무 예외 조건", description: "IRP 없이 퇴직금을 받을 수 있는 4가지 예외." },
  { slug: "퇴직금-IRP-계좌", title: "퇴직금 IRP 계좌 개설", description: "IRP 계좌 개설 방법과 금융사 수수료 비교." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 수령 vs 일시금 수령 세금 차이." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-irp-의무" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 의무가입</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 의무 가입, 누구에게 해당되나요?<br />
        2022년 4월 기준 조건과 개설 4단계
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2022년 4월 14일부터 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 바뀌었어요.
        만 55세 미만이고 퇴직금이 300만원을 초과하면 IRP 계좌 없이는 퇴직금을 받을 수 없어요.
        퇴직 전에 IRP를 미리 개설해두지 않으면 지급이 14일을 넘겨 연 20% 지연이자가 붙을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 의무 가입 대상인지 확인해보세요</H2>
      <p style={body}>
        의무 가입 조건은 두 가지예요. 퇴직일 기준 만 55세 미만이고, 퇴직금이 300만원을 초과해야 해요.
        두 조건을 모두 충족하면 IRP 계좌가 없으면 퇴직금을 받을 수 없어요.
      </p>
      <p style={body}>
        정규직, 계약직, 파트타임 관계없이 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금 대상이에요.
        퇴직금 제도 회사든 퇴직연금 가입 회사든 동일하게 IRP 의무가 적용돼요.
        55세 생일이 퇴직일 바로 다음 날이어도 의무 대상이에요.
      </p>

      <GreenBox title="IRP 의무 가입 기준">
        의무 대상: 55세 미만 + 퇴직금 300만원 초과 (세전 기준)<br />
        예외 대상: 55세 이상 또는 퇴직금 300만원 이하
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 의무 가입 대상이에요. 퇴직 전에 IRP를 개설해두세요. 아래 계산기로 퇴직금 금액도 확인해보세요."
        partialMatchText="예외에 해당할 수 있어요. 나이와 퇴직금 금액을 정확히 확인해보세요."
      />

      <Divider />

      <H2>퇴직금 금액으로 IRP 의무 여부 확인</H2>
      <p style={body}>
        월 평균급여와 근속 기간을 입력하면 예상 퇴직금과 IRP 의무 여부를 바로 확인할 수 있어요.
        300만원 기준은 세전 퇴직금 총액이에요. 퇴직소득세 공제 전 금액으로 판단해요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금이 300만원 초과하면 IRP 계좌가 의무예요. 이하면 일반 계좌로 수령 가능해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 개설에 필요한 서류</H2>
      <p style={body}>
        IRP 개설은 신분증과 인증서만 있으면 돼요. 대부분 금융사 앱으로 10분이면 개설 가능해요.
        계좌번호를 회사에 전달해야 14일 이내 이체가 이루어지니 퇴직 확정 즉시 개설하세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 의무 가입 절차 4단계</H2>
      <p style={body}>
        의무 여부 확인부터 계좌번호 전달까지 4단계예요.
        수수료 비교만 해두면 개설 자체는 10분이면 끝나요.
        퇴직 전에 미리 만들어두는 게 가장 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 의무 가입 체크리스트</H2>
      <p style={body}>
        퇴직 전에 아래 항목을 하나씩 처리하면 퇴직금 수령이 지연되지 않아요.
        놓치면 지연이자를 못 받거나 퇴직금 이체 자체가 막힐 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP에 추가 납입하면 세금 혜택도 있어요">
        퇴직금 수령 외에도 연간 900만원까지 추가 납입하면 세액공제(최대 16.5%)를 받아요.<br />
        연 300만원 납입 시 약 49.5만원 환급이에요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 의무 가입에 관해 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
