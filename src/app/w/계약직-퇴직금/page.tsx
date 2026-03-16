"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

export default function Page() {
  const currentSlug = "계약직-퇴직금";

  return (
    <ArticleLayout
      sidebar={<Sidebar data={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
          퇴직금 · 계약직 · 수령조건
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.35, color: "#111827", marginBottom: 8 }}>
          계약직 퇴직금, 정규직이랑 똑같이 받을 수 있나요?
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280", fontWeight: 400 }}>
          조건부터 계산법, 신청까지 완전 정리
        </p>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        계약직도 퇴직금을 받을 수 있어요. 정규직이랑 완전히 동일한 조건이에요 — 같은 사업장에서 1년 이상 근무하고 주 15시간 이상 일했다면 계약 형태와 상관없이 퇴직금이 발생해요. 회사에서 '계약직은 해당 없다'고 해도 틀린 말이에요.
      </p>
      <p style={body.prose}>
        <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 수령 조건</a>은 고용 형태로 나뉘지 않아요. 근로자퇴직급여보장법 제4조는 '계속근로기간 1년 이상, 주 15시간 이상 근로자'에게 퇴직급여를 지급하도록 사업주에게 의무를 부과하고 있어요. 계약직이든 정규직이든 이 두 가지만 채우면 돼요.
      </p>
      <p style={body.prose}>
        아래에서 조건 체크, 계산, 서류, 신청 순서로 정리했어요. 읽고 나면 혼자서도 퇴직금 청구까지 완전히 처리할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 1: 수령 조건 */}
      <H2>계약직 퇴직금, 이 두 가지만 맞으면 돼요</H2>
      <p style={body.prose}>
        조건은 딱 두 개예요. 1년 이상 근속, 그리고 주 15시간 이상 근무. 이걸 모두 충족하면 계약직도 당연히 퇴직금을 받을 수 있어요.
      </p>
      <p style={body.prose}>
        1년 계산은 생각보다 엄격해요. 입사일 기준 정확히 365일 이상이어야 해요. 계약 종료일이 하루라도 모자라면 법적으로 퇴직금이 발생하지 않아요. 계약서에 적힌 종료일이 아닌, 실제 마지막 출근일을 기준으로 계산하는 게 맞아요.
      </p>
      <p style={body.prose}>
        주 15시간 조건도 중요해요. 4주를 평균 냈을 때 주당 근무시간이 15시간 이상이어야 해요. 파트타임이나 단시간 근로자가 이 기준을 못 채우는 경우가 많으니, 본인 계약서의 근무시간을 꼭 확인해 보세요.
      </p>

      <EligibilityChecker
        title="계약직 퇴직금 수령 조건 체크"
        items={[
          { id: "tenure", label: "같은 사업장에서 1년 이상 근무했어요" },
          { id: "hours", label: "4주 평균 주 15시간 이상 일했어요" },
          { id: "insured", label: "계약직이지만 4대보험에 가입됐어요" },
          { id: "claim", label: "계약 종료 후 바로 퇴직금을 받고 싶어요" },
        ]}
        resultText={{
          allChecked: "퇴직금 수령 가능성이 높아요. 아래 계산기로 예상 금액을 확인해 보세요.",
          notAllChecked: "조건 미충족 항목이 있어요. 1년 근속과 주 15시간은 필수예요.",
        }}
      />

      <GreenBox>
        계약직 퇴직금 핵심 요약<br />
        · 조건: 1년 이상 근속 + 주 15시간 이상 근무<br />
        · 계산: 1일 평균임금 × 30일 × 근속연수<br />
        · 지급기한: 계약 종료 후 14일 이내<br />
        · 소멸시효: 퇴직 후 3년
      </GreenBox>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>예상 퇴직금, 직접 계산해 보세요</H2>
      <p style={body.prose}>
        퇴직금은 '1일 평균임금 × 30일 × 근속연수'로 계산해요. 단순히 월급 × 근속연수로도 어림잡을 수 있는데, 아래 슬라이더로 빠르게 확인해 보세요.
      </p>
      <p style={body.prose}>
        실제 퇴직금은 상여금과 연차수당도 포함돼요. 연간 상여금이 있다면 총액을 12로 나눠서 월 급여에 더한 금액으로 계산하는 게 정확해요. 아래 계산기는 월 급여 기준 추정치예요.
      </p>

      <Calculator
        sliders={[
          { key: "salary", label: "월 급여", min: 150, max: 500, step: 10, defaultValue: 250, format: (v) => `${v}만원` },
          { key: "months", label: "계약 기간", min: 12, max: 60, step: 1, defaultValue: 24, format: (v) => `${v}개월` },
        ]}
        results={[
          {
            label: "예상 퇴직금",
            highlight: true,
            getValue: (v) => Math.round(v.salary * 10000 * (v.months / 12)),
            format: (v) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
          },
          {
            label: "1년당 기준 (1개월치)",
            getValue: (v) => v.salary * 10000,
            format: (v) => `${Math.round(v / 10000).toLocaleString()}만원`,
          },
        ]}
        note="※ 월 급여 × 근속연수 기준 추정치. 상여금·연차수당 포함 시 더 높을 수 있어요."
      />

      <CategoryButton href="/w/퇴직금-계산법" label="퇴직금 계산법 자세히 보기" />

      <RelatedArticles
        articles={[
          { href: "/w/퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건 완전 정리" },
          { href: "/w/퇴직금-계산법", title: "퇴직금 계산기", description: "예상 퇴직금을 직접 계산" },
          { href: "/w/퇴직금-지급-기준", title: "퇴직금 지급 기준", description: "5인 미만도 해당되는지 확인" },
        ]}
      />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body.prose}>
        퇴직금 청구에 복잡한 서류는 필요 없어요. 근로계약서와 급여명세서만 있으면 기본적으로 처리할 수 있어요.
      </p>
      <p style={body.prose}>
        4대보험 가입이력은 선택이지만, 회사가 근무 사실 자체를 부인하는 상황에서는 유효한 증빙이 돼요. 고용24에서 무료로 조회할 수 있어요. 4대보험에 미가입된 계약직이라도 실제 근무 사실이 증명되면 퇴직금 청구는 가능해요.
      </p>
      <p style={body.prose}>
        근로계약서를 못 받은 경우에도 방법이 있어요. 문자, 카카오톡, 이메일 등 근무 지시나 출퇴근 기록이 있다면 증빙으로 쓸 수 있어요. 급여 이체 내역도 유효한 증거가 돼요.
      </p>

      <DocTable
        items={[
          { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
          { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
          { name: "4대보험 가입이력", required: false, where: "고용24 무료 조회" },
          { name: "재직증명서", required: false, where: "회사 인사팀" },
        ]}
      />

      <Divider />

      {/* 섹션 4: 신청 절차 */}
      <H2>계약 종료 후 퇴직금 받는 순서</H2>
      <p style={body.prose}>
        계약이 끝나면 회사는 14일 안에 퇴직금을 지급해야 해요. 자동으로 주는 경우도 있지만, IRP 계좌 정보를 미리 알려주지 않으면 처리가 늦어질 수 있어요.
      </p>
      <p style={body.prose}>
        퇴직금이 300만원을 넘으면 IRP(개인형 퇴직연금) 계좌로만 받을 수 있어요. 은행이나 증권사에서 무료로 개설할 수 있고, 5분이면 돼요. 300만원 이하라면 일반 통장으로도 받을 수 있어요.
      </p>

      <Steps
        items={[
          {
            title: "1년 충족 여부 확인",
            description: "입사일~계약 종료일 정확히 계산. 하루라도 짧으면 퇴직금 없어요.",
            tip: "고용24에서 입사일 확인 가능",
          },
          {
            title: "퇴직금 계산",
            description: "1일 평균임금 × 30 × 근속연수. 기본급만이 아닌 상여금 포함이에요.",
            tip: "상여금은 연간 총액 ÷ 12로 환산",
          },
          {
            title: "지급 요청",
            description: "계약 종료 후 14일 이내에 지급 요청. IRP 계좌번호 인사팀에 통보.",
            tip: "300만원 초과면 IRP 계좌 필수",
          },
          {
            title: "미지급 시 신고",
            description: "14일 넘어도 안 주면 고용노동부에 임금체불 진정 접수.",
            tip: "minwon.moel.go.kr 온라인 접수",
          },
        ]}
      />

      <Checklist
        title="퇴직금 신청 전 체크리스트"
        items={[
          { label: "1년 근속 — 입사일~종료일 정확히 계산" },
          { label: "주 15시간 — 4주 평균 주 15시간 이상 증빙" },
          { label: "IRP 계좌 — 300만원 초과 시 사전 개설" },
          { label: "3개월 급여명세서 — 평균임금 산정 증빙" },
          { label: "소멸시효 — 퇴직 후 3년 내 청구 필수" },
        ]}
      />

      <ArticleAd />

      <Divider />

      {/* FAQ */}
      <FAQ
        items={[
          {
            question: "계약직도 정규직과 동일한 퇴직금을 받나요?",
            answer: "맞아요. 계약직, 정규직, 알바 구분 없이 1년 이상 + 주 15시간 이상이면 동일하게 적용돼요.",
          },
          {
            question: "계약을 반복 갱신했으면 근속기간이 합산되나요?",
            answer: "합산돼요. 같은 사업장에서 계속 근무했다면 갱신 횟수와 관계없이 전체 기간이 근속기간이에요.",
          },
          {
            question: "계약 종료 전에 퇴직금을 미리 받을 수 있나요?",
            answer: "중간정산은 법정 사유(주택 구입 등)가 있어야 가능해요. 이유 없이 미리 지급하는 건 원칙적으로 안 돼요.",
          },
          {
            question: "계약 종료 후 바로 재계약하면 퇴직금은 어떻게 되나요?",
            answer: "공백 없이 재계약 시 계속근로로 볼 수 있어요. 다만 실질적인 근로 단절이 있으면 계약별로 퇴직금이 정산돼요.",
          },
          {
            question: "4대보험 미가입 계약직인데 퇴직금을 받을 수 있나요?",
            answer: "받을 수 있어요. 4대보험 가입 여부는 퇴직금 수령 조건과 무관해요. 실제 근무 사실이 증명되면 돼요.",
          },
        ]}
      />

      <Divider />

      {/* 출처 */}
      <References
        items={[
          {
            category: "법령",
            name: "근로자퇴직급여보장법 제4조 — 퇴직급여제도 설정 의무",
            url: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
          },
          {
            category: "법령",
            name: "근로기준법 제2조 — 계속근로기간",
            url: "https://www.law.go.kr/법령/근로기준법",
          },
          {
            category: "공식",
            name: "고용노동부 — 계약직 퇴직금 안내",
            url: "https://www.moel.go.kr",
          },
        ]}
      />

      <Disclaimer />
    </ArticleLayout>
  );
}
