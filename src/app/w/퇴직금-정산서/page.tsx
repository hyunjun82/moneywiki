"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 퇴직금 정산서를 받았어요" },
  { id: "c2", label: "정산서 금액과 내 계산이 일치하는지 확인했어요" },
  { id: "c3", label: "평균임금 산정 내역을 확인했어요" },
  { id: "c4", label: "근속연수 계산이 맞는지 확인했어요" },
];

const FAQS = [
  {
    q: "정산서에 서명하면 추가 청구가 안 되나요?",
    a: "원칙적으로 정산서에 서명하면 금액에 동의한 것으로 봐요. 다만 계산이 명백히 잘못됐거나 사기·강박에 의한 서명이었다면 취소할 수 있죠. 서명 전에 꼼꼼히 확인하는 게 가장 좋아요.",
  },
  {
    q: "정산서 금액이 예상보다 적으면 어떻게 하나요?",
    a: "서명하지 말고 회사에 산정 내역을 요청하세요. 평균임금에 빠진 항목이 있거나 근속연수가 잘못 계산됐을 수 있어요. 의문이 있으면 고용노동부(1350)에 상담받아보세요.",
  },
  {
    q: "정산서에 서명하면 지연이자도 포기하는 건가요?",
    a: "정산서에 &ldquo;일체의 금품을 받았다&rdquo;는 문구가 있으면 지연이자 청구가 어려워질 수 있어요. 그래서 서명 전에 지연이자 포함 여부를 꼭 확인해야 하죠.",
  },
  {
    q: "정산서 서명을 거부해도 되나요?",
    a: "네, 거부할 수 있어요. 정산서 서명은 법적 의무가 아니에요. 금액이 맞지 않거나 이의가 있다면 서명을 보류하고 회사와 협의하세요.",
  },
  {
    q: "이미 서명했는데 금액이 잘못된 걸 나중에 발견했어요.",
    a: "명백한 계산 오류가 있다면 차액을 청구할 수 있어요. 퇴직금은 법정 의무이기 때문에, 잘못된 계산으로 지급한 경우 차액 청구권은 유지되죠. 소멸시효 3년 이내에 청구해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제36조 — 금품 청산", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-정산",
    title: "퇴직금 정산 확인사항",
    description: "퇴직금 정산 시 포함되는 항목과 주의할 점을 정리했어요.",
  },
  {
    slug: "퇴직금-포기각서",
    title: "퇴직금 포기각서, 무효인 이유",
    description: "퇴직금 포기각서가 법적으로 무효인 이유를 정리했어요.",
  },
  {
    slug: "퇴직금-계산-방법",
    title: "퇴직금 계산 방법",
    description: "퇴직금 계산 공식과 평균임금 산정법을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-정산서"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 정산서 · 서명 주의</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 정산서,<br />
        서명 전에 꼭 확인해야 할 것들
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직할 때 회사에서 퇴직금 정산서를 내미는 경우가 있죠.
        별생각 없이 서명하면 나중에 금액 차이를 발견해도 추가 청구가 어려워질 수 있어요.
        정산서에 서명하기 전에 평균임금 산정 내역, 근속연수, 포함 항목을 반드시 확인해야 하죠.
        정산서가 뭔지, 서명 전에 체크할 포인트, 불리한 정산서 대응법까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 정산서가 뭔가요?</H2>
      <p style={body}>
        퇴직금 정산서는 회사가 퇴직금 계산 내역을 정리한 문서예요. 근속연수, 평균임금, 최종 퇴직금 금액이 기재돼 있죠. 근로자가 서명하면 &ldquo;이 금액에 동의한다&rdquo;는 의미가 되는 거예요.
      </p>
      <p style={body}>
        법적으로 정산서 작성이 의무인 건 아니에요. 하지만 많은 회사가 분쟁 방지를 위해 정산서에 서명을 받죠. 서명 후에는 &ldquo;금액이 잘못됐다&rdquo;고 주장하기가 훨씬 어려워지니까, 회사 입장에서 안전장치 역할을 하는 거예요.
      </p>
      <p style={body}>
        정산서와 <a href="/w/퇴직금-포기각서" style={{ color: "#1D9E75", textDecoration: "underline" }}>포기각서</a>는 전혀 다른 문서예요. 포기각서는 퇴직금 자체를 포기하겠다는 내용이라 법적으로 무효이지만, 정산서는 &ldquo;이 금액이 맞다&rdquo;는 확인 문서이니 효력이 있을 수 있죠. 혼동하지 않도록 주의하세요.
      </p>

      <Divider />

      <H2>정산서에 서명하면 추가 청구가 안 되나요?</H2>
      <p style={body}>
        원칙적으로 서명하면 금액에 동의한 것으로 봐요. &ldquo;퇴직금 ○○○원을 수령하였으며, 이와 관련하여 향후 이의를 제기하지 않겠다&rdquo;는 문구가 있다면 추가 청구가 어려워지죠.
      </p>
      <p style={body}>
        다만 예외가 있어요. 계산이 명백히 잘못된 경우(산식 오류, 근속연수 누락 등)에는 정산서 서명 후에도 차액을 청구할 수 있죠. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 정한 최소 금액보다 적게 계산된 경우에도 마찬가지예요.
      </p>
      <p style={body}>
        사기·강박에 의한 서명도 취소 사유가 돼요. &ldquo;서명 안 하면 퇴직 처리 안 한다&rdquo;는 협박을 받고 서명했다면, 의사표시 취소를 주장할 수 있죠. 이런 상황이라면 증거를 확보해두는 게 중요해요.
      </p>

      <GreenBox title="정산서 서명 전 필수 확인">
        1. <strong>근속연수</strong> — 입사일~퇴직일 정확한지 (육아휴직 포함 여부)<br />
        2. <strong>평균임금</strong> — 퇴직 전 3개월 기준, 상여금·수당 포함 여부<br />
        3. <strong>공제 항목</strong> — 세금 외 부당한 공제가 없는지<br />
        4. <strong>문구 확인</strong> — &ldquo;이의 제기 불가&rdquo; 같은 제한 문구 유무
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 확인했네요. 정산서 내용이 정확하다면 서명해도 괜찮아요."
        partialMatchText="일부만 확인됐어요. 나머지 항목도 확인한 뒤 서명 여부를 결정하세요."
      />

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>정산서 금액이 잘못됐다면?</H2>
      <p style={body}>
        서명 전이라면 회사에 산정 내역을 요청하세요. <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산 방법</a>을 직접 적용해보고, 차이가 나는 부분을 구체적으로 짚어서 이의를 제기하면 되죠.
      </p>
      <p style={body}>
        흔한 오류로는 상여금·식대·교통비를 평균임금에서 빼는 경우, 육아휴직 기간을 근속연수에서 빼는 경우, 근속연수를 연 단위로만 계산해서 월·일 단위를 누락하는 경우 등이 있어요. 하나라도 해당되면 금액이 달라지죠.
      </p>
      <p style={body}>
        이미 서명한 뒤 오류를 발견했다면 회사에 정정을 요청하고, 거부하면 고용노동부(1350)에 상담을 받으세요. 명백한 계산 오류라면 서명 후에도 차액 청구가 가능한 경우가 있어요. 소멸시효 3년 이내에 움직여야 하죠.
      </p>

      <Divider />

      <H2>서명 전에 확인해야 할 항목은?</H2>
      <p style={body}>
        첫째, 근속연수를 확인하세요. 입사일과 퇴직일이 정확한지, 육아휴직·출산휴가·병가 기간이 포함돼 있는지 살펴야 해요. 근속연수가 하루라도 빠지면 퇴직금이 줄어들죠.
      </p>
      <p style={body}>
        둘째, 평균임금 산정 내역을 뜯어보세요. 퇴직 전 3개월 급여에 상여금, 식대, 교통비 등이 포함됐는지, 통상임금과 비교해서 어느 쪽이 유리한지 따져보는 게 좋아요. <a href="/w/퇴직금-정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 정산</a> 시 빠지는 항목이 있다면 지적하세요.
      </p>
      <p style={body}>
        셋째, 공제 항목을 살펴보세요. 퇴직소득세 원천징수는 정당하지만, 회사가 자체적으로 &ldquo;대출금 상계&rdquo;나 &ldquo;손해배상금 공제&rdquo;를 하는 건 법적으로 문제가 될 수 있어요. 퇴직금에서 일방적으로 공제하는 건 근로기준법 위반이죠.
      </p>

      <Divider />

      <H2>불리한 정산서 서명을 거부할 수 있나요?</H2>
      <p style={body}>
        네, 거부할 수 있어요. 정산서 서명은 법적 의무가 아니에요. 금액이 맞지 않거나 의문이 있으면 서명을 보류하고 &ldquo;재계산 후 다시 제출해달라&rdquo;고 요청하세요.
      </p>
      <p style={body}>
        회사가 &ldquo;서명 안 하면 퇴직금을 안 준다&rdquo;고 압박하는 건 불법이에요. 정산서 서명 여부와 퇴직금 지급 의무는 별개 문제이죠. 이런 압박을 받고 있다면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 즉시 상담하세요.
      </p>
      <p style={body}>
        서명을 거부하면 회사와 금액 협의가 진행되겠지만, 합의가 안 되면 고용노동부 진정으로 해결할 수 있어요. 진정 시 정산서 사본과 내 계산 내역을 함께 제출하면 근로감독관이 양쪽 산정을 비교해서 판단하죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 정산서에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
