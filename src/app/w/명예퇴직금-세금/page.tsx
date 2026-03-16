"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "명예퇴직금-세금";

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} title="퇴직금 가이드" />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
          명예퇴직금 · 세금 · 비과세
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.35, color: "#111827", marginBottom: 8 }}>
          명예퇴직금 세금, 일반 퇴직금이랑 다른가요?
        </h1>
        <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.6 }}>
          비과세 한도부터 퇴직소득세 계산까지
        </p>
      </div>

      {/* 인트로 */}
      <p style={{ ...body, marginBottom: 16 }}>
        명예퇴직금은 일반 퇴직금보다 세금이 유리해요. 근속연수×150만원까지 비과세 혜택이 있어요. 근속 20년이면 3,000만원까지 세금이 없어요. 한도를 초과하는 금액만 퇴직소득세가 적용되니, 명예퇴직 제안을 받았다면 세금부터 계산해보세요.
      </p>

      {/* 섹션 1: 해당 여부 체크 */}
      <EligibilityChecker
        title="명예퇴직금 세금, 해당되는지 체크해보세요"
        items={[
          "명예퇴직을 권고받았어요",
          "일반 퇴직금 외에 추가 명예퇴직금이 있어요",
          "비과세 한도가 얼마인지 모르겠어요",
          "세금을 어떻게 계산하는지 알고 싶어요",
        ]}
      />

      <Divider />

      {/* 섹션 1: 비과세 한도 */}
      <H2>명예퇴직금 비과세 한도, 얼마까지 안 내도 되나요</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        명예퇴직금에는 일반 퇴직금에 없는 별도 비과세 혜택이 있어요. <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제22조</a>에 따라 근속연수×150만원까지는 세금을 전혀 안 내도 돼요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        근속 10년이면 1,500만원, 20년이면 3,000만원, 30년이면 4,500만원까지 비과세예요. 단, 최대 한도는 3억원이에요. 근속 200년이 아닌 이상 3억 한도에 걸릴 일은 없지만, 법령상 상한선이 있다는 점은 알아두세요.
      </p>
      <GreenBox>
        비과세 한도 공식: 근속연수 × 150만원 (최대 3억원)<br />
        한도 초과분만 퇴직소득세 부과 — 소득세법 제22조
      </GreenBox>
      <p style={{ ...body, marginTop: 16, marginBottom: 16 }}>
        일반 퇴직금은 전액이 퇴직소득세 과세 대상이에요. 반면 명예퇴직금은 비과세 한도만큼 먼저 제외하고, 나머지에만 세금을 매기죠. 같은 금액이라도 명예퇴직금이 세금 부담이 훨씬 작은 이유예요.
      </p>

      <ArticleAd />

      {/* 섹션 2: 계산기 */}
      <H2>명예퇴직금 세금 계산기</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        명예퇴직금 금액과 근속 기간을 입력하면 비과세 한도와 과세 대상 금액을 바로 확인할 수 있어요. 과세 대상이 0원이면 세금을 전혀 안 내도 되는 거예요.
      </p>
      <Calculator
        sliders={[
          {
            key: "amount",
            label: "명예퇴직금",
            min: 1000,
            max: 20000,
            step: 500,
            defaultValue: 5000,
            format: (v: number) => `${v.toLocaleString()}만원`,
          },
          {
            key: "years",
            label: "근속 기간",
            min: 5,
            max: 35,
            step: 1,
            defaultValue: 15,
            format: (v: number) => `${v}년`,
          },
        ]}
        results={[
          {
            label: "비과세 한도",
            highlight: true,
            getValue: (v: Record<string, number>) =>
              Math.min(v.years * 150 * 10000, 300000 * 10000),
            format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
          },
          {
            label: "과세 대상 금액 (한도 초과분)",
            getValue: (v: Record<string, number>) =>
              Math.max(
                0,
                v.amount * 10000 -
                  Math.min(v.years * 150 * 10000, 300000 * 10000)
              ),
            format: (v: number) =>
              v === 0
                ? "비과세 범위 내"
                : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
          },
        ]}
        note="※ 명예퇴직금 비과세 한도: 근속연수 × 150만원 (최대 3억원). 한도 초과분은 퇴직소득세 적용."
      />
      <p style={{ ...body, marginTop: 16, marginBottom: 16 }}>
        과세 대상 금액이 나왔다면 실제 세금은 여기서 끝나지 않아요. 과세 대상에도 근속연수공제와 환산급여공제를 추가로 적용해요. 퇴직소득세는 근속 기간이 길수록 공제가 커지기 때문에, 실제 납부 세금은 계산기보다 더 적을 수 있어요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 완전 가이드 보기" />

      <RelatedArticles
        articles={[
          { href: "/w/퇴직금-세금-몇프로", title: "퇴직금 세금 몇 퍼센트", desc: "퇴직소득세 계산기" },
          { href: "/w/퇴직금-소득세", title: "퇴직금 소득세 계산", desc: "환급도 가능해요" },
          { href: "/w/퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령", desc: "연금 수령 시 30% 절세" },
        ]}
      />

      <Divider />

      {/* 섹션 3: 퇴직소득세 계산 절차 */}
      <H2>퇴직소득세 계산, 단계별로 따라가보세요</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        과세 대상 금액이 있다면 퇴직소득세 계산이 필요해요. 복잡해 보이지만 순서대로 따라가면 어렵지 않아요. 회사 인사팀에서 원천징수를 대신 해주기 때문에 직접 신고할 일은 없지만, 세금이 얼마인지는 스스로 파악해두는 게 좋아요.
      </p>
      <Steps
        steps={[
          {
            title: "비과세 한도 확인",
            desc: "근속연수×150만원 계산",
            tip: "근속 20년이면 3,000만원 비과세",
          },
          {
            title: "과세 대상 금액 계산",
            desc: "명예퇴직금 - 비과세 한도 = 과세 대상",
            tip: "한도 이하면 세금 0",
          },
          {
            title: "퇴직소득세 계산",
            desc: "과세 대상에 근속연수공제+환산급여공제 후 세율 적용",
            tip: "홈택스 모의계산 활용",
          },
          {
            title: "IRP 절세 검토",
            desc: "과세 대상이 크면 IRP로 받고 연금 수령 시 30% 절세",
            tip: "명예퇴직금도 IRP 이전 가능",
          },
        ]}
      />
      <p style={{ ...body, marginTop: 16, marginBottom: 16 }}>
        일반 퇴직금과 명예퇴직금은 합산해서 퇴직소득 계산에 반영해요. 두 금액을 따로 보지 않고, 전체 퇴직소득을 기준으로 공제와 세율을 적용해요. 명예퇴직금만 별도로 세금 계산을 하는 게 아니라는 점, 꼭 기억해두세요.
      </p>

      <Divider />

      {/* 섹션 4: 필요 서류 */}
      <H2>명예퇴직금 세금 관련 챙겨야 할 서류</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        명예퇴직 후 세금 문제로 다툼이 생기거나 경정청구(세금 환급 신청)를 해야 할 때 필요한 서류예요. 퇴직 직후에 미리 챙겨두지 않으면 나중에 구하기 어려울 수 있어요.
      </p>
      <DocTable
        docs={[
          { name: "명예퇴직금 지급 계약서", required: true, where: "회사 인사팀" },
          { name: "퇴직소득원천징수영수증", required: true, where: "회사 인사팀" },
          { name: "근로계약서", required: true, where: "인사팀" },
          { name: "근속증명서", required: false, where: "인사팀" },
        ]}
      />
      <p style={{ ...body, marginTop: 16, marginBottom: 16 }}>
        퇴직소득원천징수영수증은 세금 신고와 환급의 핵심 서류예요. 비과세 한도가 제대로 적용됐는지, 근속연수 계산이 맞는지 직접 들여다볼 수 있어요. 금액이 클수록 꼼꼼하게 검토하는 게 이득이에요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>명예퇴직금 세금 절차 체크리스트</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        명예퇴직금을 받기 전후로 세금 처리를 빠뜨리지 않도록 체크해두세요. IRP 절세까지 챙기면 수백만 원 차이가 날 수 있어요.
      </p>
      <Checklist
        items={[
          "비과세 한도 계산 — 근속연수×150만원",
          "한도 초과분 세금 계산",
          "원천징수영수증 수령 확인",
          "IRP 절세 검토 — 금액 크면 유리",
          "소득세법 제22조 근거 확인",
        ]}
      />

      <Divider />

      {/* FAQ */}
      <FAQ
        items={[
          {
            q: "명예퇴직금은 일반 퇴직금과 세금이 어떻게 다른가요?",
            a: "일반 퇴직금은 전액 퇴직소득세 대상이지만, 명예퇴직금은 근속연수×150만원까지 비과세 혜택이 있어요.",
          },
          {
            q: "비과세 한도가 3억이면 근속연수가 얼마나 돼야 하나요?",
            a: "3억 ÷ 150만원 = 200년이에요. 실제로는 최대 3억 한도가 있으니 장기 근속자도 3억까지만 비과세예요.",
          },
          {
            q: "일반 퇴직금과 명예퇴직금 세금을 합산하나요?",
            a: "합산해서 계산해요. 퇴직소득은 일반 퇴직금+명예퇴직금 전체를 합산한 뒤 공제를 적용해요.",
          },
          {
            q: "명예퇴직금을 거부하고 계속 근무하면 어떻게 되나요?",
            a: "거부는 가능해요. 회사가 강제 퇴직시키면 부당해고가 될 수 있어요.",
          },
          {
            q: "명예퇴직금도 IRP로 받아야 하나요?",
            a: "총 퇴직금(일반+명예)이 300만원을 초과하면 IRP 계좌로 이체해야 해요.",
          },
        ]}
      />

      <Divider />

      {/* 출처 */}
      <References
        items={[
          {
            label: "소득세법 제22조 퇴직소득 비과세",
            href: "https://www.law.go.kr/법령/소득세법",
          },
          {
            label: "근로자퇴직급여보장법",
            href: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
          },
          {
            label: "국세청",
            href: "https://www.nts.go.kr",
          },
        ]}
      />

      <Disclaimer />
    </ArticleLayout>
  );
}
