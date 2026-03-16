"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 산출 내역서를 회사에서 받았어요" },
  { id: "c2", label: "급여명세서 3개월분을 가지고 있어요" },
  { id: "c3", label: "정산 금액이 예상보다 적어서 검증이 필요해요" },
  { id: "c4", label: "중간정산을 한 적이 있어서 계산이 복잡해요" },
];

const CHECKLIST = [
  "퇴직금 산출 내역서 — 회사의 평균임금·근속연수 적용 근거",
  "급여명세서 3개월분 — 기본급, 수당, 상여금, 공제 내역",
  "근로계약서 — 임금 구성 항목과 입사일 확인",
  "중간정산 기록 — 중간정산 시점, 금액, 정산 범위 확인",
  "취업규칙 또는 단체협약 — 상여금·수당 지급 기준 확인",
];

const FAQS = [
  {
    q: "퇴직금은 언제까지 받을 수 있나요?",
    a: "퇴직일로부터 14일 이내에 지급해야 해요. 근로자퇴직급여 보장법 제9조에서 정한 기한이죠. 14일을 넘기면 연 20%의 지연이자가 붙어요.",
  },
  {
    q: "퇴직금에서 세금이 빠지나요?",
    a: "퇴직소득세가 원천징수돼요. 근속연수와 퇴직금 규모에 따라 세율이 달라지죠. IRP 계좌로 이체하면 실제 인출 시까지 과세가 이연돼요.",
  },
  {
    q: "중간정산을 한 적이 있는데 퇴직금은 어떻게 계산하나요?",
    a: "중간정산 시점 이후부터 퇴직일까지의 근속연수와 퇴직 시점 평균임금으로 계산해요. 중간정산 이전 기간은 이미 정산됐으니 제외되죠.",
  },
  {
    q: "정산 금액이 예상보다 적으면 어떻게 하나요?",
    a: "산출 내역서를 요청해서 평균임금 항목과 근속연수를 대조해보세요. 수당·상여금 누락이나 근속연수 오류가 있으면 서면으로 이의를 제기하면 돼요.",
  },
  {
    q: "퇴직금을 IRP로 받아야 하나요?",
    a: "55세 미만 퇴직자는 원칙적으로 IRP 계좌로 받아야 해요. 퇴직금이 300만 원 이하이거나 55세 이상이면 본인 계좌로 직접 받을 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제8조~제9조 — 퇴직금 산정 및 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조 — 평균임금의 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "국세청 — 퇴직소득세 계산 방법", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-정산서",
    title: "퇴직금 정산서 양식과 작성법",
    description: "퇴직금 정산서에 포함되는 항목과 양식을 정리했어요.",
  },
  {
    slug: "퇴직금-계산-방법",
    title: "퇴직금 계산 방법 전체 정리",
    description: "평균임금 산출부터 최종 퇴직금까지 계산 흐름을 한눈에 볼 수 있어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 절차",
    description: "회사가 퇴직금을 제대로 안 줬을 때 신고하는 방법을 정리했어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-정산"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 평균임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 정산, 퇴직 전에<br />
        꼭 확인해야 할 것들
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금을 받았는데 왜 이렇게 적죠? 어디서 뭐가 빠진 건지 모르겠어요.&rdquo;<br />
        퇴직금 정산은 퇴직 후에 확인하면 늦어요. 퇴직 전에 미리 계산해보고, 회사가 제시하는 금액과 대조해야 하죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제8조</a>에 따라 계속근로기간 1년에 대해 30일분의 평균임금을 받는 구조인데,
        어떤 항목이 포함되고 왜 금액이 예상보다 적은지, 미리 챙겨야 할 서류가 뭔지까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 정산은 어떻게 이루어지나요?</H2>
      <p style={body}>
        퇴직금 정산은 &ldquo;평균임금 산정 → 근속연수 확인 → 퇴직금 계산 → 세금 공제 → 지급&rdquo;의 순서로 진행돼요. 회사 인사팀이나 회계팀에서 처리하고, 퇴직일로부터 <strong>14일 이내</strong>에 지급해야 하죠.
      </p>
      <p style={body}>
        먼저 퇴직 전 3개월간의 임금 총액을 역일수로 나눠서 1일 평균임금을 구해요. 여기에 30을 곱하고, 다시 &ldquo;총 재직일수 / 365&rdquo;를 곱하면 세전 퇴직금이 나오죠. 이 금액에서 퇴직소득세를 원천징수한 뒤 지급하는 거예요.
      </p>
      <p style={body}>
        55세 미만 퇴직자는 원칙적으로 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP(개인형 퇴직연금) 계좌</a>로 받아요. 퇴직금이 300만 원 이하이거나 55세 이상이면 본인 계좌로 직접 받을 수 있죠. IRP로 받으면 실제 인출할 때까지 과세가 이연되니까 절세 효과가 있어요.
      </p>

      <GreenBox title="퇴직금 정산 흐름">
        1. 평균임금 산정 (퇴직 전 3개월 임금 / 역일수)<br />
        2. 퇴직금 계산 (1일 평균임금 x 30 x 재직일수/365)<br />
        3. 퇴직소득세 원천징수<br />
        4. 퇴직일로부터 14일 이내 지급
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>정산 시 포함되는 항목은 뭔가요?</H2>
      <p style={body}>
        평균임금에 들어가는 모든 항목이 퇴직금 정산에 반영돼요. 기본급은 당연하고, 매달 고정으로 나오는 연장근로수당·야간수당·직책수당·식대·교통비가 포함되죠. 전 직원에게 일률적으로 지급되는 항목이면 임금으로 봐요.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-상여금-포함" style={{ color: "#1D9E75", textDecoration: "underline" }}>정기 상여금</a>도 빠뜨리면 안 돼요. 연간 총액을 12로 나눈 뒤 3을 곱해서 3개월분으로 안분해요. 취업규칙이나 단체협약에 지급 기준이 명시된 상여금은 의무 지급 항목이니까 평균임금에 넣어야 하죠.
      </p>
      <p style={body}>
        반면 경조사비, 체력단련비, 학자금 보조 같은 복리후생비는 제외돼요. 실적에 따른 불규칙 성과급도 지급 기준이 없으면 빠지죠. &ldquo;포함인지 제외인지&rdquo;가 애매한 항목은 급여명세서와 취업규칙을 대조해서 판단해야 해요.
      </p>

      <BorderBox title="퇴직소득세는 얼마나 빠지나요?">
        퇴직소득세는 근속연수와 퇴직금 규모에 따라 달라져요.<br />
        근속연수가 길수록, 퇴직금이 적을수록 세율이 낮아지죠.<br />
        <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 퇴직소득세 계산기로 미리 확인해볼 수 있어요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>정산 금액이 예상보다 적은 이유는?</H2>
      <p style={body}>
        첫 번째 원인은 <strong>수당·상여금 누락</strong>이에요. 회사가 기본급만으로 평균임금을 산정하고 고정수당이나 정기 상여금을 뺀 경우가 가장 많죠. 급여명세서의 항목과 퇴직금 산출 내역의 항목을 하나하나 대조해보면 빠진 게 보여요.
      </p>
      <p style={body}>
        두 번째는 <strong>퇴직 전 3개월 급여 변동</strong>이에요. 무급휴직, 단축근무, 임금 삭감이 있었다면 평균임금이 낮아지죠. 이 경우 <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금 보장 규정</a>(근로기준법 제2조 제2항)을 적용받을 수 있어요. 평균임금이 통상임금보다 낮으면 통상임금이 기준이 되거든요.
      </p>
      <p style={body}>
        세 번째는 <strong>중간정산 반영</strong>이에요. 재직 중 퇴직금 중간정산을 했다면 그 시점까지의 근속연수는 이미 정산된 거예요. 이후 기간만 새로 쌓이니까 정산 전 기간을 포함해서 계산하면 금액이 맞지 않죠. 중간정산 이력을 반드시 확인해야 해요.
      </p>
      <p style={body}>
        네 번째는 <strong>퇴직소득세 공제</strong>예요. 세전 퇴직금과 세후 실수령액의 차이를 모르면 &ldquo;왜 이렇게 적지?&rdquo;라고 느낄 수 있어요. 퇴직소득세는 근속연수가 길수록 공제가 많이 돼서 세부담이 줄어드는 구조예요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 산출 내역서와 급여명세서를 대조해서 누락 항목과 중간정산 이력을 꼼꼼히 확인하세요."
        partialMatchText="일부만 해당돼요. 산출 내역서를 먼저 받아서 어떤 기준으로 계산됐는지 확인하는 게 우선이에요."
      />

      <Divider />

      {/* 섹션 4 */}
      <H2>정산 전에 미리 확인해야 할 서류는?</H2>
      <p style={body}>
        <strong>급여명세서 3개월분</strong>이 가장 중요해요. 퇴직 전 3개월간 기본급, 수당, 상여금, 공제 내역이 전부 들어있으니까요. 회사가 제시하는 평균임금과 직접 계산한 금액을 대조할 수 있는 유일한 근거예요.
      </p>
      <p style={body}>
        <strong>근로계약서</strong>도 챙기세요. 입사일이 언제인지, 임금 구성이 어떻게 되어 있는지가 적혀 있어요. 계약 변경이 있었다면 변경 이력도 함께 확보해야 하죠. 입사일 하루 차이가 근속연수를 바꿀 수 있어요.
      </p>
      <p style={body}>
        <strong>취업규칙 또는 단체협약</strong>에는 상여금·수당 지급 기준이 들어있어요. 상여금이 퇴직금에 포함되는지 판단하려면 이 문서가 필요하죠. 회사에 사본을 요청하면 제공할 의무가 있어요.
      </p>
      <p style={body}>
        중간정산을 한 적이 있다면 <strong>중간정산 기록</strong>도 확인하세요. 정산 시점, 금액, 정산 범위(어디까지가 정산됐는지)가 명확해야 이후 퇴직금이 정확하게 계산돼요. 중간정산 시 받은 <a href="/w/퇴직금-정산서" style={{ color: "#1D9E75", textDecoration: "underline" }}>정산서 사본</a>을 보관하고 계세요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 */}
      <H2>정산에 이의가 있을 때 어떻게 하나요?</H2>
      <p style={body}>
        회사에 서면으로 이의를 제기하는 게 첫 단계예요. 퇴직금 산출 내역서에서 어떤 항목이 잘못됐는지 구체적으로 적어서 이메일이나 내용증명으로 보내세요. &ldquo;급여명세서상 이 수당이 빠졌다&rdquo;, &ldquo;상여금이 안분 계산되지 않았다&rdquo;처럼 명확하게 지적해야 해요.
      </p>
      <p style={body}>
        회사가 수정을 거부하면 관할 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 지방노동관서에 진정(임금체불 신고)을 넣으세요. 근로감독관이 회사의 임금대장, 취업규칙, 급여명세서를 조사해서 정확한 퇴직금을 재산정해요. 차액이 확인되면 시정명령이 나가죠.
      </p>
      <p style={body}>
        14일 지급 기한을 넘겼다면 <strong>연 20%의 지연이자</strong>도 청구할 수 있어요. 퇴직일 다음 날부터 실제 지급일까지의 기간에 대해 연 20%를 적용하죠. 지연이자는 퇴직금 원금과 별개로 발생하니까 함께 청구하면 돼요. 소멸시효는 퇴직일로부터 3년이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 정산과 관련해서 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 관할 노동관서(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
