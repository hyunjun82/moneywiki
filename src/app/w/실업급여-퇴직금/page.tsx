"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "비자발적 퇴사(해고·권고사직·계약만료 등)예요" },
  { id: "c2", label: "고용보험 가입 기간이 180일 이상이에요" },
  { id: "c3", label: "1년 이상 근무하고 주 15시간 이상 일했어요" },
  { id: "c4", label: "퇴직 후 고용센터에 구직 신청할 계획이 있어요" },
];

const FAQS = [
  {
    q: "퇴직금을 받으면 실업급여가 줄어드나요?",
    a: "아니에요. 퇴직금과 실업급여는 완전히 별개 제도라서 서로 영향을 주지 않아요. 퇴직금을 받았다고 실업급여가 삭감되거나 지급이 거부되는 일은 없죠.",
  },
  {
    q: "실업급여와 퇴직금을 동시에 신청할 수 있나요?",
    a: "동시에 신청할 수 있어요. 퇴직금은 회사에, 실업급여는 고용센터에 각각 별도로 신청하는 거죠. 절차가 겹치지 않으니 둘 다 빠르게 진행하세요.",
  },
  {
    q: "자발적으로 퇴사하면 실업급여를 못 받나요?",
    a: "원칙적으로 자발적 퇴사는 실업급여 대상이 아니에요. 다만 임금체불, 직장 내 괴롭힘, 근로조건 변경 등 정당한 사유가 인정되면 받을 수 있죠. 퇴직금은 퇴사 사유와 무관하게 받을 수 있어요.",
  },
  {
    q: "퇴직금을 IRP로 받으면 실업급여에 영향이 있나요?",
    a: "없어요. 퇴직금을 IRP 계좌로 받든 일반 계좌로 받든 실업급여와는 무관하죠. 수령 방식이 달라도 실업급여 금액이나 기간에 변화가 없어요.",
  },
  {
    q: "둘 다 최대로 받으려면 어떻게 해야 하나요?",
    a: "퇴직금은 퇴사 후 14일 이내 지급을 요청하고, 실업급여는 퇴직 후 빠르게 고용센터에 구직 등록을 하세요. 실업급여 신청이 늦어지면 수급 가능 기간이 줄어들 수 있으니 서두르는 게 좋죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 구직급여", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 실업급여 안내", url: "https://www.moel.go.kr" },
      { label: "고용보험 — 실업급여 신청", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 14일",
    description: "퇴직금 지급 기한과 위반 시 대응 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-수령방법",
    title: "퇴직금 수령 방법",
    description: "퇴직금 수령 방법과 IRP 활용법을 정리했어요.",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼이나요?",
    description: "퇴직소득세 계산 방법과 절세 팁을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="실업급여-퇴직금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 실업급여 · 동시 수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여와 퇴직금,<br />
        둘 다 받을 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직하면 퇴직금과 실업급여, 둘 다 받을 수 있는지 궁금하죠?
        결론부터 말하면, <strong>둘 다 받을 수 있어요</strong>.
        퇴직금은 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에 따른 권리이고, 실업급여는 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따른 권리라서 완전히 별개 제도이죠.
        하나를 받았다고 다른 하나가 줄어들거나 사라지지 않아요.
        두 제도의 차이, 신청 방법, 최대 수령 전략까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>실업급여와 퇴직금을 동시에 받을 수 있나요?</H2>
      <p style={body}>
        네, 동시에 받을 수 있어요. 퇴직금은 1년 이상 근무한 근로자에게 사업주가 지급하는 거고, 실업급여는 고용보험에서 구직활동 중인 실직자에게 지급하는 거죠. 재원도 다르고 목적도 다른 완전히 별개 제도예요.
      </p>
      <p style={body}>
        퇴직금을 먼저 받았다고 실업급여 신청이 거부되는 일은 없어요. 반대로 실업급여를 받고 있다고 퇴직금 청구가 제한되지도 않죠. 각각 별도로 신청하고 별도로 수령하면 돼요.
      </p>
      <p style={body}>
        다만 실업급여는 비자발적 퇴사(해고, 권고사직, 계약만료 등)여야 받을 수 있고, 퇴직금은 퇴사 사유와 무관하게 받을 수 있다는 점이 달라요. 자발적 퇴사라면 퇴직금만 받고 실업급여는 받기 어려울 수 있죠.
      </p>

      <GreenBox title="퇴직금 vs 실업급여">
        <strong>퇴직금</strong>: 사업주 지급 / 1년 이상 근무 / 퇴사 사유 무관 / 14일 이내 일시금<br />
        <strong>실업급여</strong>: 고용보험 지급 / 180일 이상 가입 / 비자발적 퇴사 / 매월 분할 지급
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 퇴직금과 실업급여를 모두 받을 수 있어요."
        partialMatchText="일부만 해당돼요. 실업급여 수급 요건을 고용센터에서 확인해보세요."
      />

      <Divider />

      <H2>퇴직금이 실업급여에 영향을 주나요?</H2>
      <p style={body}>
        영향을 주지 않아요. 실업급여 금액은 퇴직 전 3개월 평균임금의 60%(상한·하한 있음)로 계산되는데, 여기에 퇴직금 수령 여부는 전혀 반영되지 않죠.
      </p>
      <p style={body}>
        퇴직금을 IRP 계좌로 받든, 일반 계좌로 받든 마찬가지예요. 수령 방식이나 금액이 실업급여 산정에 영향을 주는 요소가 아니거든요. 두 제도는 법적 근거부터 재원까지 완전히 분리돼 있어요.
      </p>
      <p style={body}>
        간혹 &ldquo;퇴직금을 많이 받으면 실업급여가 안 나온다&rdquo;는 잘못된 정보가 돌기도 하는데, 사실이 아니에요. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험</a> 홈페이지에서 실업급여 모의계산을 해보면 퇴직금은 입력 항목에 포함되지 않는 걸 확인할 수 있죠.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금을 받으면 실업급여가 줄어드나요?</H2>
      <p style={body}>
        줄어들지 않아요. 앞서 말한 것처럼 두 제도는 완전히 독립적이에요. 퇴직금 1억을 받든 100만 원을 받든 실업급여 금액과 기간은 변하지 않죠.
      </p>
      <p style={body}>
        실업급여가 줄어들 수 있는 경우는 다른 이유가 있어요. 재취업을 했거나, 구직활동을 하지 않았거나, 부정수급이 적발된 경우이죠. 퇴직금 수령과는 무관한 사유예요.
      </p>
      <p style={body}>
        실업급여 수급 기간은 고용보험 가입 기간과 나이에 따라 90일~270일이에요. <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 수령</a>을 빠르게 처리하고, 실업급여도 퇴직 후 지체 없이 고용센터에 신청하세요. 두 가지를 동시에 진행하는 게 가장 효율적이에요.
      </p>

      <Divider />

      <H2>수령 순서가 있나요?</H2>
      <p style={body}>
        정해진 순서는 없어요. 퇴직금은 퇴직일로부터 14일 이내에 회사가 지급하고, 실업급여는 고용센터에 구직 등록 후 수급자격 인정을 받으면 지급이 시작되죠. 보통 퇴직금이 먼저 들어오는 경우가 많아요.
      </p>
      <p style={body}>
        실업급여 첫 입금까지는 구직 등록, 수급자격 인정, 대기기간(7일) 등을 거치니까 퇴직 후 약 3~4주 정도 걸려요. 퇴직금은 14일 이내이니까 시간적으로 퇴직금이 앞서는 구조이죠.
      </p>
      <p style={body}>
        퇴직금이 늦어지더라도 실업급여 신청은 미루지 마세요. 실업급여 수급 기한(퇴직일 다음 날부터 12개월)이 있어서, 늦게 신청하면 받을 수 있는 총 기간이 줄어들 수 있거든요. 퇴직 후 바로 고용센터에 가는 게 최선이에요.
      </p>

      <Divider />

      <H2>두 가지 모두 최대로 받는 방법은?</H2>
      <p style={body}>
        퇴직금은 퇴사 후 즉시 회사에 지급을 요청하고, 14일이 넘으면 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>를 청구하세요. 평균임금 산정 시 상여금, 수당 등이 빠지지 않았는지 꼼꼼히 확인하는 것도 중요하죠.
      </p>
      <p style={body}>
        실업급여는 퇴직 후 가능한 빨리 관할 고용센터에 구직 등록을 하세요. 이직확인서를 회사에서 발급받아야 하니까, 퇴직 전에 미리 요청해두면 절차가 빨라져요. 온라인 교육 수강도 미리 해두면 대기 시간을 줄일 수 있죠.
      </p>
      <p style={body}>
        퇴직금에 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>가 붙으니까 IRP 활용 여부도 따져보세요. IRP로 받으면 세금을 유예할 수 있고, 연금으로 수령하면 세율이 낮아지는 장점이 있어요. 실업급여에는 세금이 없으니 별도 절세 고민은 필요 없죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여와 퇴직금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
