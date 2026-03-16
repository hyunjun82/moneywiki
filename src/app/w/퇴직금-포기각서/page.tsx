"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-포기각서";

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 헤더 */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
          퇴직금 · 포기각서 · 법적효력
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.35, color: "#111827", marginBottom: 8 }}>
          퇴직금 포기각서, 서명했어도 받을 수 있나요?
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.6 }}>
          법적 효력과 청구 방법 완전 정리
        </p>
      </div>

      {/* 인트로 */}
      <p style={body}>
        퇴직금 포기각서에 서명했어도 퇴직금을 받을 수 있어요. 근로자퇴직급여 보장법은 강행법규라, 근로자가 서명한 포기 약정은 법적으로 무효예요. 회사가 각서를 내밀어도 서명할 필요 없고, 이미 서명했어도 청구권은 그대로 살아있어요.
      </p>
      <p style={body}>
        "서명했으니까 포기한 거다"라고 회사가 버틴다면, 그 말은 법적으로 근거가 없어요. 강행법규는 당사자 간 합의로도 바꿀 수 없는 규정이기 때문에, 포기각서 자체가 처음부터 효력이 없는 문서예요.
      </p>

      <Divider />

      {/* 섹션 1: 포기각서가 무효인 이유 */}
      <H2>포기각서가 무효인 이유</H2>
      <p style={body}>
        퇴직금은 근로자퇴직급여 보장법 제9조에 따라 사용자가 반드시 지급해야 하는 법정 권리예요. 이 법은 강행법규(强行法規)로, 근로자와 사용자가 서로 합의해도 법이 정한 기준 이하로 낮출 수 없어요.
      </p>
      <p style={body}>
        포기각서는 "나는 퇴직금을 받지 않겠다"는 약속이지만, 강행법규 아래에서는 이런 약속 자체가 효력이 없어요. 계약서를 아무리 잘 써도 법을 이길 수 없는 거예요.
      </p>
      <p style={body}>
        근로기준법 제15조도 같은 원칙을 담고 있어요. "이 법에서 정한 기준에 미치지 못하는 근로조건을 정한 근로계약은 그 부분에 한해 무효"라고 명시하고 있어요.
      </p>

      <GreenBox>
        <strong>핵심 요약</strong><br />
        포기각서에 서명했어도 퇴직금 청구권은 살아있어요. 강행법규 위반으로 각서 자체가 무효예요.
      </GreenBox>

      {/* 적격 체크 */}
      <EligibilityChecker
        title="내가 청구 가능한지 확인해 볼게요"
        items={[
          "퇴직금 포기각서에 서명했어요",
          "재직 중 또는 퇴직 시에 서명했어요",
          "실제로 퇴직금을 한 번도 받지 못했어요",
          "청구가 가능한지 확인하고 싶어요",
        ]}
        resultText="네 가지를 모두 충족하면 퇴직금 청구가 가능해요. 포기각서는 법적으로 무효예요."
      />

      <Divider />

      {/* 섹션 2: 단 하나의 예외 */}
      <H2>단 하나의 예외, 영수 확인 각서</H2>
      <p style={body}>
        포기각서가 무조건 무효인 건 아니에요. 딱 하나 예외가 있어요. 퇴직금을 실제로 받은 뒤 서명한 "영수 확인 각서"는 효력이 있어요. 받은 돈에 대해 수령했다고 확인하는 건 유효한 행위거든요.
      </p>
      <p style={body}>
        구별 기준은 간단해요. 돈이 먼저냐, 각서가 먼저냐의 문제예요. 퇴직금을 한 푼도 받지 않은 상태에서 쓴 포기각서는 무효예요. 반면 퇴직금을 받고 나서 쓴 영수증은 유효해요.
      </p>
      <p style={body}>
        회사가 퇴직금 지급 대신 각서를 먼저 받고 나중에 지급하겠다고 하는 경우도 있어요. 이때도 퇴직금을 실제로 받기 전 서명한 각서는 무효로 봐요.
      </p>

      <BorderBox>
        <strong>포기각서 vs 영수 확인 각서</strong><br /><br />
        <strong>포기각서 (무효)</strong>: 퇴직금 받기 전에 "받지 않겠다" 서명<br />
        <strong>영수 확인 각서 (유효)</strong>: 퇴직금 실제 수령 후 "받았다" 서명
      </BorderBox>

      <CategoryButton href="/w/퇴직금-조건" label="퇴직금 받을 수 있는 조건 보기" />
      <RelatedArticles
        articles={[
          { href: "/w/퇴직금-조건", title: "퇴직금 받을 수 있는 조건", desc: "1년·주 15시간 조건" },
          { href: "/w/퇴직금-미지급-신고", title: "퇴직금 미지급 신고", desc: "노동청 진정 절차" },
          { href: "/w/퇴직금-소멸시효", title: "퇴직금 소멸시효 3년", desc: "시효 중단 방법" },
        ]}
      />

      <Divider />

      {/* 섹션 3: 청구 가능 금액 계산 */}
      <H2>청구 가능 금액 계산해 보기</H2>
      <p style={body}>
        포기각서가 무효라면 퇴직금 전액을 청구할 수 있어요. 여기에 지급기한(14일)을 넘기면 연 20% 지연이자도 붙어요. 아래에서 대략적인 금액을 계산해 볼 수 있어요.
      </p>
      <p style={body}>
        퇴직금은 평균임금 × 30일 × 근속연수로 계산해요. 아래 계산기는 월 급여 기준으로 추정한 값이에요. 정확한 금액은 고용노동부 퇴직금 계산기나 노무사 상담을 통해 확인하는 게 좋아요.
      </p>

      <Calculator
        sliders={[
          { key: "salary", label: "월 급여", min: 150, max: 800, step: 10, defaultValue: 300, format: (v) => `${v}만원` },
          { key: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v) => `${v}년` },
        ]}
        results={[
          {
            label: "청구 가능 퇴직금 추정",
            highlight: true,
            getValue: (v) => v.salary * 10000 * v.years,
            format: (v) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
          },
          {
            label: "지연이자 추정 (1년 지연 기준)",
            getValue: (v) => Math.round(v.salary * 10000 * v.years * 0.2),
            format: (v) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
          },
        ]}
        note="※ 포기각서는 법적으로 무효예요. 퇴직금 전액 + 지연이자 청구 가능해요."
      />

      <Divider />

      {/* 섹션 4: 청구 절차 */}
      <H2>퇴직금 청구 4단계 절차</H2>
      <p style={body}>
        포기각서가 무효라는 걸 알았으면 이제 실제로 청구해야 해요. 아래 4단계를 순서대로 따라가면 돼요. 회사가 거부하면 노동청에 진정할 수 있어요.
      </p>
      <p style={body}>
        소멸시효는 퇴직일 기준 3년이에요. 3년이 지나면 청구권이 사라지기 때문에, 서두르는 게 좋아요. 내용증명을 보내면 소멸시효 6개월 중단 효과도 생겨요.
      </p>

      <Steps
        steps={[
          {
            title: "포기각서 무효 확인",
            desc: "근로자퇴직급여 보장법은 강행법규라 포기 약정 자체가 무효예요. 이미 서명했어도 청구권은 그대로예요.",
            tip: "서명한 날짜와 실제 퇴직금 수령 여부를 정리해 두세요.",
          },
          {
            title: "증빙 서류 준비",
            desc: "근로계약서, 급여명세서, 4대보험 가입이력을 준비해요.",
            tip: "포기각서 사본도 보관하면 오히려 유리해요. 각서 내용이 강행법규 위반임을 보여주는 증거가 돼요.",
          },
          {
            title: "내용증명 발송",
            desc: "\"포기각서는 법적으로 무효이며, 퇴직금 ○○만원을 청구함\"이라는 내용으로 내용증명을 보내요.",
            tip: "소멸시효 6개월 중단 효과가 생겨요. 우체국 내용증명 서비스를 이용하면 돼요.",
          },
          {
            title: "노동청 진정",
            desc: "회사가 거부하면 고용노동부 임금체불 진정을 접수해요.",
            tip: "minwon.moel.go.kr에서 온라인으로 접수할 수 있어요.",
          },
        ]}
      />

      <Divider />

      {/* 서류 */}
      <H2>준비해야 할 서류</H2>
      <p style={body}>
        청구에 필요한 서류는 많지 않아요. 근로 사실을 증명할 수 있는 서류면 충분해요. 포기각서 사본은 필수는 아니지만, 보관하고 있으면 회사 주장을 반박하는 데 유리해요.
      </p>

      <DocTable
        docs={[
          { name: "근로계약서", required: true, from: "인사팀" },
          { name: "급여명세서", required: true, from: "인사팀" },
          { name: "포기각서 사본", required: false, from: "본인 보관" },
          { name: "퇴직사실증빙", required: true, from: "인사팀" },
        ]}
      />

      <Divider />

      {/* 체크리스트 */}
      <H2>청구 전 최종 점검</H2>
      <p style={body}>
        노동청 진정 전에 아래 항목을 하나씩 짚어보세요. 특히 소멸시효 3년 안에 움직이는 게 중요해요.
      </p>

      <Checklist
        items={[
          "포기각서 무효 — 강행법규 위반으로 효력 없음",
          "실제 수령 여부 — 한 번도 못 받았으면 청구 가능",
          "소멸시효 3년 — 퇴직일 기준 3년 내",
          "내용증명 발송 — 청구 의사 표명",
          "노동청 진정 — 거부 시 신고",
        ]}
      />

      <ArticleAd />

      <Divider />

      {/* FAQ */}
      <FAQ
        items={[
          {
            q: "퇴직금 포기각서에 서명하면 정말 못 받나요?",
            a: "아니에요. 포기각서는 근로자퇴직급여 보장법 위반으로 무효예요. 서명과 상관없이 퇴직금 청구권은 그대로예요.",
          },
          {
            q: "회사가 포기각서를 강요하면 어떻게 하나요?",
            a: "서명을 거부할 수 있어요. 강요가 심하면 노동청에 신고할 수 있어요. 서명했어도 나중에 청구 가능해요.",
          },
          {
            q: "포기각서와 퇴직금 영수증은 다른가요?",
            a: "달라요. 이미 퇴직금을 받고 쓴 영수증은 유효해요. 하지만 받지도 않고 쓴 포기각서는 무효예요.",
          },
          {
            q: "포기각서를 쓴 게 3년 전인데 청구할 수 있나요?",
            a: "소멸시효 3년 이내면 가능해요. 퇴직일 기준 3년이에요.",
          },
          {
            q: "퇴직금 포기 합의서도 무효인가요?",
            a: "퇴직 전 합의서는 무효예요. 하지만 퇴직 후 발생한 퇴직금을 놓고 적법하게 합의한 경우는 효력이 있을 수 있어요.",
          },
        ]}
      />

      <Divider />

      {/* 참고 */}
      <References
        items={[
          { label: "근로자퇴직급여보장법 제9조", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
          { label: "근로기준법 제15조 강행법규", href: "https://www.law.go.kr/법령/근로기준법" },
          { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
        ]}
      />

      <Disclaimer />
    </ArticleLayout>
  );
}
