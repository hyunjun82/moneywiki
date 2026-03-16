"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

export default function Page() {
  const currentSlug = "퇴직금-세금-몇프로";

  const checkItems = [
    { id: "years", label: "근속기간이 5년 이상이에요" },
    { id: "irp", label: "IRP 계좌가 있어요" },
    { id: "amount", label: "퇴직금이 2,000만원을 넘어요" },
    { id: "save", label: "세금을 최대한 줄이고 싶어요" },
  ];

  const sliders = [
    {
      id: "amount",
      label: "퇴직금 총액",
      min: 500,
      max: 10000,
      step: 100,
      defaultValue: 3000,
      format: (v: number) => `${v.toLocaleString()}만원`,
    },
    {
      id: "years",
      label: "근속 기간",
      min: 1,
      max: 35,
      step: 1,
      defaultValue: 10,
      format: (v: number) => `${v}년`,
    },
  ];

  const results = [
    {
      id: "result1",
      label: "퇴직소득세 추정",
      highlight: true,
      getValue: (v: Record<string, number>) =>
        Math.round(
          Math.max(
            0,
            v.amount * 10000 * 0.06 * (1 - Math.min(v.years, 30) * 0.015)
          )
        ),
      format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    },
    {
      id: "result2",
      label: "세후 실수령액",
      getValue: (v: Record<string, number>) => {
        const tax = Math.round(
          Math.max(
            0,
            v.amount * 10000 * 0.06 * (1 - Math.min(v.years, 30) * 0.015)
          )
        );
        return v.amount * 10000 - tax;
      },
      format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    },
  ];

  const docs = [
    {
      name: "퇴직소득원천징수영수증",
      required: true,
      where: "회사 인사팀",
    },
    {
      name: "근로계약서",
      required: true,
      where: "인사팀 또는 입사 시 수령본",
    },
    {
      name: "급여명세서 (최근 3개월)",
      required: false,
      where: "인사팀",
    },
    {
      name: "IRP 계좌 정보",
      required: false,
      where: "IRP 개설 금융기관",
    },
  ];

  const steps = [
    {
      title: "퇴직소득 계산",
      description:
        "퇴직금에서 근속연수공제를 빼요. 근속 5년 이하 1년당 30만원, 5~10년 1년당 50만원, 10~20년 1년당 80만원, 20년 초과 1년당 120만원이에요.",
      tip: "근속기간 길수록 공제 커짐",
    },
    {
      title: "환산급여 계산",
      description:
        "(퇴직소득 × 12) ÷ 근속연수로 환산급여를 구해요. 이 금액에 환산급여공제를 적용해요.",
      tip: "회사에서 원천징수영수증으로 확인 가능",
    },
    {
      title: "세율 적용",
      description:
        "환산급여에 일반 소득세율(6~45%)을 적용한 뒤, 근속연수로 다시 나눠요. 이게 최종 퇴직소득세예요.",
      tip: "근속기간이 길수록 실질 세율이 낮아져요",
    },
    {
      title: "IRP 연금 절세",
      description:
        "IRP에 넣고 55세 이후 연금으로 수령하면 퇴직소득세를 30% 감면받아요. 일시금 수령보다 수백만원 차이 날 수 있어요.",
      tip: "연금으로 받으면 수백만원 절세 가능",
    },
  ];

  const checklistItems = [
    { id: "c1", label: "근속연수공제 — 근속기간 정확히 계산" },
    { id: "c2", label: "IRP 계좌 — 퇴직 전 개설" },
    { id: "c3", label: "연금 수령 선택 — 55세 이후 연금 30% 절세" },
    { id: "c4", label: "원천징수영수증 — 회사 발급 확인" },
    { id: "c5", label: "소멸시효 — 환급 청구는 5년 이내" },
  ];

  const faqs = [
    {
      question: "퇴직금 세금이 정확히 몇 퍼센트인가요?",
      answer:
        "정해진 세율이 아니에요. 근속연수공제 후 환산급여에 일반 소득세율(6~45%)이 적용되고, 근속연수로 다시 나눠요. 근속 10년이면 실질 세율이 2~3%대도 나와요.",
    },
    {
      question: "퇴직금 세금은 회사에서 알아서 떼나요?",
      answer:
        "맞아요. 회사가 원천징수하고 세무서에 납부해요. 퇴직소득원천징수영수증으로 확인할 수 있어요.",
    },
    {
      question: "IRP로 받으면 세금이 없나요?",
      answer:
        "IRP로 받을 때는 원천징수 없이 이체돼요. 나중에 연금이나 일시금으로 수령할 때 세금을 내요. 연금으로 받으면 퇴직소득세 30% 감면이에요.",
    },
    {
      question: "퇴직금 세금이 너무 많이 나온 것 같은데요?",
      answer:
        "원천징수영수증을 꺼내서, 공제 항목이 맞게 적용됐는지 살펴보세요. 오류가 있으면 연말정산(경정청구)으로 환급받을 수 있어요.",
    },
    {
      question: "퇴직금에 건강보험료도 붙나요?",
      answer:
        "퇴직소득은 건강보험료 부과 대상에서 제외돼요. 퇴직소득세만 납부하면 돼요.",
    },
  ];

  const references = [
    {
      type: "법령" as const,
      title: "소득세법 제22조 — 퇴직소득세 계산",
      url: "https://www.law.go.kr/법령/소득세법",
    },
    {
      type: "법령" as const,
      title: "소득세법 제48조 — 퇴직소득 공제",
      url: "https://www.law.go.kr/법령/소득세법",
    },
    {
      type: "공식" as const,
      title: "국세청 — 퇴직소득세 안내",
      url: "https://www.nts.go.kr",
    },
  ];

  const relatedArticles = [
    {
      slug: "퇴직금-세금",
      title: "퇴직금 세금, 얼마나 떼나요?",
      description: "IRP 절세 방법까지 정리",
    },
    {
      slug: "퇴직금-IRP-수령방법",
      title: "퇴직금 IRP 수령 방법",
      description: "연금 수령 시 30% 절세",
    },
    {
      slug: "퇴직금-계산법",
      title: "퇴직금 계산기",
      description: "예상 퇴직금을 직접 계산",
    },
  ];

  const sidebar = <Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />;

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <p style={{ ...body.sm, color: "#6B7280", marginBottom: "8px" }}>
        퇴직금 · 세금 · 퇴직소득세
      </p>

      {/* 타이틀 */}
      <h1 style={{ ...body.h1, marginBottom: "6px" }}>
        퇴직금 세금, 몇 퍼센트나 나가나요?
      </h1>
      <p style={{ ...body.lead, marginBottom: "24px" }}>
        퇴직소득세 계산법부터 IRP 절세까지
      </p>

      {/* 인트로 */}
      <p style={{ ...body.base, marginBottom: "12px" }}>
        퇴직금 세금은 '퇴직소득세'로, 일반 근로소득세와 계산 방식이 달라요.
        근속연수공제를 적용해서 근속기간이 길수록 세금이 줄어드는 구조예요.
        퇴직금 3,000만원을 10년 근속 후 받으면 세금이 100만원대로 낮아질 수 있어요.
        IRP로 받아서 연금 수령하면 30%를 더 절약할 수 있죠.
      </p>
      <p style={{ ...body.base, marginBottom: "24px" }}>
        퇴직소득세 계산 4단계, IRP 절세 전략, 그리고 챙겨야 할 서류까지
        이 글 하나로 다 해결돼요. 퇴직 예정이라면 지금 숫자를 미리 파악해두는 게 좋아요.
      </p>

      <Divider />

      {/* 섹션 1: 퇴직소득세란 */}
      <H2>퇴직소득세, 일반 소득세와 뭐가 달라요?</H2>
      <p style={{ ...body.base, marginBottom: "12px" }}>
        퇴직금은 수십 년 일한 대가로 한꺼번에 받는 돈이에요. 이걸 그 해
        소득으로 잡아서 과세하면 세율이 터무니없이 높아지겠죠.{" "}
        <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>
          소득세법 제22조
        </a>는 그래서 퇴직소득에만 특별한 계산 구조를 적용해요.
      </p>
      <p style={{ ...body.base, marginBottom: "12px" }}>
        핵심은 두 가지예요. 첫째, 근속연수공제로 과세표준 자체를 낮춰요. 20년
        근속이면 공제액만 1,060만원이에요. 둘째, 환산급여 방식으로 세율을 계산한
        뒤 다시 근속연수로 나눠요. 같은 3,000만원을 받아도 근속 5년과 15년의
        세금이 두 배 이상 차이 나요.
      </p>
      <p style={{ ...body.base, marginBottom: "20px" }}>
        일반 근로소득세는 매달 급여에서 원천징수하지만, 퇴직소득세는 퇴직할 때
        회사가 한 번에 계산해서 원천징수해요.{" "}
        <a href="/w/퇴직금-원천징수" style={{ color: "#1D9E75" }}>원천징수 방식</a>이기
        때문에 따로 신고할 필요는 없어요.
      </p>

      <GreenBox>
        근속 10년, 퇴직금 3,000만원 기준 → 퇴직소득세 약 100만원대 (실질 세율 3~4%대).
        일반 소득세율이 아닌 특별 공제 구조 덕분이에요.
      </GreenBox>

      <Divider />

      {/* 섹션 2: 계산 4단계 */}
      <H2>퇴직소득세 계산, 4단계로 끝내요</H2>
      <p style={{ ...body.base, marginBottom: "16px" }}>
        아래 순서는{" "}
        <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>
          국세청 퇴직소득세 안내
        </a>
        를 기준으로 정리한 거예요. 복잡해 보여도 순서대로 따라가면 이해돼요.
      </p>

      <Steps steps={steps} />

      <p style={{ ...body.base, marginTop: "16px", marginBottom: "8px" }}>
        회사 인사팀이 이 과정을 대신 계산해서 원천징수영수증에 적어줘요.
        퇴직 후 영수증을 꼭 챙겨두세요. 나중에 IRP에서 연금 수령할 때
        기준이 되는 서류예요.
      </p>

      <CategoryButton category="퇴직금" slug={currentSlug} />
      <RelatedArticles articles={relatedArticles} />

      <Divider />

      {/* 섹션 3: 계산기 + 서류 */}
      <H2>예상 퇴직소득세, 직접 계산해보기</H2>
      <p style={{ ...body.base, marginBottom: "16px" }}>
        퇴직금 총액과 근속기간을 조정하면 예상 세금을 바로 볼 수 있어요.
        근속연수가 길수록 공제가 늘어나면서 세금이 크게 줄어드는 걸 숫자로
        확인할 수 있어요.
      </p>

      <Calculator
        sliders={sliders}
        results={results}
        note="※ 근속연수가 길수록 세금 감소. 실제 세금은 근속연수공제 후 환산급여 기준으로 계산돼요."
      />

      <p style={{ ...body.base, margin: "20px 0 16px" }}>
        계산기는 단순화된 추정값이에요. 정확한 금액은 회사가 발급하는
        퇴직소득원천징수영수증에서 나와요. 아래는 퇴직 시 챙겨야 할 서류
        목록이에요.
      </p>

      <DocTable docs={docs} />

      <ArticleAd />

      <Divider />

      {/* 섹션 4: IRP 절세 + 체크리스트 */}
      <H2>IRP로 퇴직소득세 30% 줄이는 방법</H2>
      <p style={{ ...body.base, marginBottom: "12px" }}>
        퇴직금을 IRP 계좌로 받으면 그 시점엔 세금을 안 내요. 원천징수 없이
        전액이 IRP로 들어오고, 나중에 수령할 때 세금이 결정돼요.{" "}
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75" }}>IRP 수령 방법</a>을
        미리 알아두면 선택지가 넓어져요.
      </p>
      <p style={{ ...body.base, marginBottom: "12px" }}>
        핵심은 55세 이후 연금으로 받는 거예요. 일시금으로 꺼내면 퇴직소득세
        전액을 내지만, 연금으로 받으면 30%를 감면받아요. 10년 넘게 연금으로
        수령하면 감면율이 40%로 올라가요. 퇴직금 5,000만원이면 세금 차이가
        수백만원 날 수 있어요.
      </p>
      <p style={{ ...body.base, marginBottom: "20px" }}>
        퇴직 전에 IRP 계좌를 만들어두는 게 좋아요. 회사가 IRP로 바로 이체할
        수 있게 퇴직 전 계좌 정보를 인사팀에 알려두면 절차가 훨씬 간단해요.
      </p>

      <BorderBox title="IRP 연금 수령 절세 요약">
        <ul style={{ paddingLeft: "16px", margin: 0 }}>
          <li style={{ ...body.base, marginBottom: "6px" }}>
            IRP 이체 시점 → 원천징수 없음 (과세 이연)
          </li>
          <li style={{ ...body.base, marginBottom: "6px" }}>
            55세 이후 연금 수령 → 퇴직소득세 30% 감면
          </li>
          <li style={{ ...body.base, marginBottom: "6px" }}>
            10년 초과 연금 수령 → 퇴직소득세 40% 감면
          </li>
          <li style={{ ...body.base }}>
            일시금 수령 → 감면 없이 퇴직소득세 전액 납부
          </li>
        </ul>
      </BorderBox>

      <EligibilityChecker
        title="내 상황 체크"
        items={checkItems}
        resultText="IRP + 연금 수령 절세 전략을 쓸 수 있어요"
      />

      <p style={{ ...body.base, margin: "20px 0 16px" }}>
        퇴직 전 놓치면 안 되는 체크리스트예요. 하나라도 빠지면 수백만원 차이
        날 수 있어요.
      </p>

      <Checklist items={checklistItems} />

      <Divider />

      <FAQ items={faqs} />

      <Divider />

      <References items={references} />

      <Disclaimer />
    </ArticleLayout>
  );
}
