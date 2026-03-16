"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

export default function Page() {
  const currentSlug = "퇴직금-중간정산-세금";

  const checkItems = [
    "중간정산을 신청할 계획이에요",
    "주택구입이나 임차보증금 사유예요",
    "세금이 어떻게 되는지 모르겠어요",
    "이후 퇴직금 계산이 어떻게 되는지 궁금해요",
  ];

  const calcSliders = [
    {
      key: "amount",
      label: "중간정산금액",
      min: 500,
      max: 10000,
      step: 100,
      defaultValue: 3000,
      format: (v: number) => `${v.toLocaleString()}만원`,
    },
    {
      key: "years",
      label: "당시 근속기간",
      min: 1,
      max: 30,
      step: 1,
      defaultValue: 5,
      format: (v: number) => `${v}년`,
    },
  ];

  const calcResults = [
    {
      label: "퇴직소득세 추정",
      highlight: true,
      getValue: (v: Record<string, number>) =>
        Math.round(
          Math.max(
            0,
            v.amount * 10000 * 0.04 * (1 - Math.min(v.years, 20) * 0.02)
          )
        ),
      format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    },
    {
      label: "세후 수령액",
      getValue: (v: Record<string, number>) => {
        const tax = Math.round(
          Math.max(
            0,
            v.amount * 10000 * 0.04 * (1 - Math.min(v.years, 20) * 0.02)
          )
        );
        return v.amount * 10000 - tax;
      },
      format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    },
  ];

  const docs = [
    { name: "근로계약서", required: true, from: "인사팀" },
    { name: "중간정산신청서", required: true, from: "인사팀" },
    { name: "사유증빙서류", required: true, from: "해당기관" },
    { name: "급여명세서 3개월", required: true, from: "인사팀" },
  ];

  const steps = [
    {
      title: "사유 해당 여부 확인",
      desc: "법정 사유(무주택자 주택구입, 전세보증금, 요양 등) 해당 여부를 먼저 체크해야 해요.",
      tip: "법정 사유 외 중간정산은 원칙적으로 불가해요.",
    },
    {
      title: "세금 사전 계산",
      desc: "중간정산 금액에 퇴직소득세가 어떻게 적용되는지 미리 계산해두세요.",
      tip: "국세청 홈택스 퇴직소득세 모의계산을 활용하면 정확해요.",
    },
    {
      title: "중간정산 신청",
      desc: "인사팀에 신청서와 사유증빙서류를 제출하면 돼요.",
      tip: "정산 후 근속기간은 정산일부터 다시 계산돼요.",
    },
    {
      title: "세금 납부 확인",
      desc: "원천징수 후 지급되니 영수증을 꼭 수령해두세요.",
      tip: "퇴직소득원천징수영수증은 나중에도 필요하니 보관 필수예요.",
    },
  ];

  const checklistItems = [
    "법정 사유 해당 여부 확인",
    "세금 사전 계산 — 홈택스 모의계산",
    "정산 후 근속기간 리셋 인지",
    "원천징수영수증 보관",
    "이후 퇴직금 — 정산일부터 재계산",
  ];

  const faqs = [
    {
      q: "중간정산 받으면 퇴직소득세를 꼭 내야 하나요?",
      a: "맞아요. 중간정산도 퇴직으로 보기 때문에 퇴직소득세가 원천징수돼요.",
    },
    {
      q: "중간정산 후 최종 퇴직 시 세금이 또 나오나요?",
      a: "나와요. 중간정산일부터 최종 퇴직일까지의 퇴직금에 별도로 퇴직소득세가 부과돼요.",
    },
    {
      q: "중간정산 금액이 작으면 세금이 0원일 수도 있나요?",
      a: "가능해요. 근속연수공제 후 과세표준이 0이 되면 세금이 0원이에요. 근속기간이 짧고 금액이 작을수록 가능성이 높아요.",
    },
    {
      q: "IRP로 중간정산을 받을 수 있나요?",
      a: "원칙적으로 중간정산은 IRP가 아닌 본인 계좌로 받아요. IRP는 퇴직 시 수령용이에요.",
    },
    {
      q: "중간정산 사유가 없으면 어떻게 되나요?",
      a: "법정 사유 없이 중간정산하면 세금 혜택이 줄어들 수 있어요. 중간정산보다 퇴직 시 전액 받는 게 세금 면에서 유리한 경우가 많아요.",
    },
  ];

  const references = [
    {
      label: "소득세법 제22조 (퇴직소득세)",
      url: "https://www.law.go.kr/법령/소득세법",
    },
    {
      label: "근로자퇴직급여보장법 제8조 (중간정산)",
      url: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
    },
    {
      label: "국세청 홈택스",
      url: "https://www.hometax.go.kr",
    },
  ];

  const relatedArticles = [
    {
      slug: "퇴직금-중간정산",
      title: "퇴직금 중간정산 조건",
      desc: "법정 사유부터 절차까지",
    },
    {
      slug: "퇴직금-세금-몇프로",
      title: "퇴직금 세금 몇 퍼센트",
      desc: "계산기로 확인",
    },
    {
      slug: "퇴직금-계산법",
      title: "퇴직금 계산법",
      desc: "중간정산 후 퇴직금 계산",
    },
  ];

  const sidebar = <Sidebar data={퇴직금_SIDEBAR} currentSlug={currentSlug} />;

  return (
    <ArticleLayout
      breadcrumb="퇴직금 · 중간정산 · 세금"
      title="퇴직금 중간정산 받으면 세금이 얼마나 나오나요?"
      subtitle="정산 시점 과세부터 절세 방법까지"
      sidebar={sidebar}
    >
      {/* Intro */}
      <p style={body}>
        퇴직금 중간정산을 받아도 퇴직소득세가 발생해요. 중간정산을 퇴직으로
        보기 때문이에요. 다만 근속연수공제가 적용돼 세금이 생각보다 낮을 수
        있어요. 정산 후에는 근속기간이 정산일부터 다시 계산되니, 세금과 이후
        퇴직금 영향을 함께 고려해야 해요.
      </p>

      <EligibilityChecker title="이런 분들께 필요해요" items={checkItems} />

      <ArticleAd />

      <Divider />

      {/* H2-1: 중간정산 세금 기본 구조 */}
      <H2>중간정산 세금이 어떻게 계산되나요</H2>
      <SectionBadge>퇴직소득세 과세 구조</SectionBadge>

      <p style={body}>
        중간정산은 세법상 퇴직으로 간주돼요.{" "}
        <a
          href="https://www.law.go.kr/법령/소득세법"
          style={{ color: "#1D9E75" }}
        >
          소득세법 제22조
        </a>
        에 따라 퇴직소득세가 그대로 적용돼요. 급여소득세가 아니기 때문에
        누진세율이 아닌 퇴직소득 전용 세율 체계를 써요.
      </p>

      <p style={body}>
        퇴직소득세 계산 순서는 이래요. 중간정산 금액에서 근속연수공제를 먼저
        빼고, 남은 금액(환산급여)에 세율을 적용해요. 근속기간이 길수록 공제가
        커지기 때문에 같은 금액이라도 오래 일한 사람이 세금을 덜 내요.
      </p>

      <GreenBox title="근속연수공제 기준 (2025년 기준)">
        <p style={body}>
          · 5년 이하: 30만원 × 근속연수
          <br />
          · 5년 초과~10년 이하: 150만원 + 50만원 × (근속연수 - 5)
          <br />
          · 10년 초과~20년 이하: 400만원 + 80만원 × (근속연수 - 10)
          <br />· 20년 초과: 1,200만원 + 120만원 × (근속연수 - 20)
        </p>
      </GreenBox>

      <p style={body}>
        환산급여에서 환산급여공제를 한 번 더 적용하고, 그 결과에 세율 6~45%를
        곱해요. 다만 퇴직소득은 일반 소득세처럼 바로 최고세율이 붙지 않아요.
        환산 과정에서 세율이 희석되기 때문에 실효세율은 대개 낮게 나와요.
      </p>

      <BorderBox title="중간정산 vs 일반 퇴직 세금 차이">
        <p style={body}>
          세금 계산 방식 자체는 동일해요. 차이는 근속기간이에요. 중간정산은
          입사일부터 정산일까지의 기간, 일반 퇴직은 입사일부터 퇴직일까지의
          기간을 써요. 기간이 짧을수록 공제가 줄어 세금이 상대적으로 높아질 수
          있어요.
        </p>
      </BorderBox>

      {/* H2-2: 세금 계산기 */}
      <H2>퇴직소득세 미리 계산해보세요</H2>
      <SectionBadge>중간정산 세금 시뮬레이션</SectionBadge>

      <p style={body}>
        중간정산 전에 세금을 먼저 계산해보는 게 좋아요. 생각보다 세금이 클 수
        있거든요. 아래 계산기로 대략적인 금액을 확인하고, 정확한 계산은
        국세청 홈택스 모의계산을 사용하세요.
      </p>

      <Calculator
        sliders={calcSliders}
        results={calcResults}
        note="※ 중간정산 시에도 퇴직소득세 발생. 근속연수공제 후 세율 적용. 실제 세금은 국세청 홈택스에서 계산하세요."
      />

      <p style={body}>
        계산기는 간단한 추정값이에요. 실제 세금은 환산급여공제, 세액공제 등
        여러 항목이 더 반영돼요.{" "}
        <a
          href="https://www.hometax.go.kr"
          style={{ color: "#1D9E75" }}
        >
          국세청 홈택스
        </a>
        에서 퇴직소득세 모의계산 메뉴를 쓰면 정확한 금액을 알 수 있어요.
      </p>

      <RelatedArticles articles={relatedArticles} />

      <ArticleAd />

      <Divider />

      {/* H2-3: 중간정산 후 퇴직금에 미치는 영향 */}
      <H2>중간정산 후 퇴직금은 어떻게 달라지나요</H2>
      <SectionBadge>근속기간 리셋과 퇴직금 재계산</SectionBadge>

      <p style={body}>
        중간정산을 받으면 퇴직금 계산의 기준이 되는 근속기간이 리셋돼요. 정산일
        다음 날부터 새로 근속기간이 쌓이기 시작해요. 나중에 최종 퇴직할 때는
        정산일 이후 기간만큼의 퇴직금을 받게 되죠.
      </p>

      <p style={body}>
        예를 들어 10년 근무 중 5년 차에 중간정산을 받으면, 이후 5년분 퇴직금은
        별도로 다시 쌓여요. 임금이 올랐다면 이후 근속분 퇴직금도 늘어나지만,
        전체 근속기간을 하나로 합쳤을 때보다 근속연수공제 총액이 줄어들 수
        있어요.
      </p>

      <GreenBox title="중간정산이 세금에 불리할 수 있는 이유">
        <p style={body}>
          퇴직소득세는 근속기간이 길수록 공제가 크고 세금이 적어요. 중간에
          정산하면 근속기간을 두 번 나눠서 쓰기 때문에, 한 번에 전액을 받을
          때보다 총 세금이 더 많이 나올 수 있어요. 세금 면에서는 중간정산을
          피하는 게 유리한 경우가 많아요.
        </p>
      </GreenBox>

      <p style={body}>
        물론 지금 당장 목돈이 필요한 상황이라면 선택지가 없을 수도 있어요. 세금
        손해를 알면서도 중간정산을 선택하는 건 개인 사정에 따른 거예요. 중요한
        건 세금이 얼마인지, 이후 퇴직금이 어떻게 바뀌는지 미리 알고 결정하는
        거예요.
      </p>

      <Divider />

      {/* H2-4: 중간정산 절차와 서류 */}
      <H2>중간정산 신청 절차와 필요 서류</H2>
      <SectionBadge>신청 단계별 가이드</SectionBadge>

      <p style={body}>
        중간정산은 아무때나 신청할 수 있는 게 아니에요.{" "}
        <a
          href="https://www.law.go.kr/법령/근로자퇴직급여보장법"
          style={{ color: "#1D9E75" }}
        >
          근로자퇴직급여보장법 제8조
        </a>
        에서 정한 법정 사유가 있을 때만 가능해요. 주택 구입, 전세보증금 마련,
        본인 또는 가족 요양, 파산·회생 절차 개시 등이 해당돼요.
      </p>

      <Steps steps={steps} />

      <DocTable docs={docs} />

      <p style={body}>
        사유증빙서류는 사유마다 달라요. 주택 구입이라면 매매계약서, 전세라면
        임대차계약서를 준비하면 돼요. 요양 사유는 진단서가 필요하고요. 인사팀에
        먼저 문의하면 어떤 서류가 필요한지 안내받을 수 있어요.
      </p>

      <Divider />

      {/* H2-5: 체크리스트 */}
      <H2>중간정산 전 꼭 챙겨야 할 것들</H2>
      <SectionBadge>신청 전 체크리스트</SectionBadge>

      <p style={body}>
        중간정산은 한 번 실행하면 되돌리기 어려워요. 신청 전에 아래 항목을 하나씩
        점검하세요. 특히 세금과 이후 퇴직금 변화는 꼭 계산해본 뒤 결정하는 게
        좋아요.
      </p>

      <Checklist items={checklistItems} />

      <p style={body}>
        원천징수영수증은 나중에 종합소득세 신고나 금융 거래 시 필요할 수 있어요.
        회사에서 자동으로 주는 경우도 있지만, 요청해서라도 꼭 받아두세요. 분실
        시 홈택스에서 재발급받을 수 있어요.
      </p>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>중간정산 세금 자주 묻는 질문</H2>
      <SectionBadge>FAQ</SectionBadge>

      <p style={body}>
        중간정산 세금에 대해 헷갈리는 부분들을 모았어요. 신청 전에 이 질문들을
        먼저 읽어보면 불필요한 실수를 줄일 수 있어요.
      </p>

      <FAQ items={faqs} />

      <Divider />

      <References items={references} />
      <Disclaimer />
    </ArticleLayout>
  );
}
