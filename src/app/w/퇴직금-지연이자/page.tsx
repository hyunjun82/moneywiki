"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사일로부터 14일이 넘었는데 퇴직금을 못 받았어요" },
  { id: "c2", label: "기한 연장에 동의한 적이 없어요" },
  { id: "c3", label: "퇴사한 지 아직 3년이 안 됐어요" },
  { id: "c4", label: "미지급 퇴직금 금액을 알고 있어요" },
];

const CHECKLIST = [
  "14일 기한 초과 확인 — 퇴사일 다음 날부터 달력 기준 14일 계산",
  "지연이자 계산 — 미지급액 x 20% x (지연일수 / 365)",
  "내용증명 발송 — 퇴직금 원금 + 지연이자 구체적 금액 명시",
  "노동청 진정 접수 — 지연이자 항목 함께 기재",
  "소멸시효 확인 — 퇴사일로부터 3년 이내 청구 필수",
];

const FAQS = [
  {
    q: "지연이자 연 20%는 어떤 법에 근거하나요?",
    a: "근로기준법 시행령 제18조예요. '사용자는 지급 기일 후 지연 기간에 대해 연 100분의 20에 해당하는 지연이자를 지급하여야 한다'고 규정하고 있죠.",
  },
  {
    q: "지연이자는 세금이 붙나요?",
    a: "퇴직금 원금에는 퇴직소득세가 붙지만, 지연이자는 기타소득으로 분류돼요. 원천징수 후 지급되거나, 종합소득세 신고 시 반영되죠.",
  },
  {
    q: "지연이자만 따로 청구할 수 있나요?",
    a: "할 수 있어요. 퇴직금 원금은 이미 받았지만 늦게 지급된 경우, 지연 기간에 해당하는 이자만 별도로 청구할 수 있죠.",
  },
  {
    q: "회사가 파산하면 지연이자도 못 받나요?",
    a: "체당금 제도에서는 퇴직금 원금만 대상이에요. 지연이자는 체당금에 포함되지 않죠. 다만 사업주 개인에 대한 민사소송으로 청구할 수는 있어요.",
  },
  {
    q: "연 20%가 은행 이자보다 훨씬 높은데 정말 받을 수 있나요?",
    a: "법에 정해진 이율이니까 받을 수 있죠. 실제로 노동청 시정지시나 법원 판결을 통해 지연이자를 받는 사례가 많아요. 회사가 지연이자를 줄이려면 빨리 지급하는 수밖에 없어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 14일 이내", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제18조 — 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법시행령" },
      { label: "근로기준법 제49조 — 임금 채권 소멸시효 3년", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 해설", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단 — 근로자 무료 법률 지원", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지급-기한-14일-원칙-지연이자",
    title: "퇴직금 14일 원칙과 지연이자",
    description: "14일 원칙의 정확한 의미와 지연이자 발생 시점을 정리했어요.",
  },
  {
    slug: "퇴직금-지연이자-받기",
    title: "퇴직금 지연이자 실제로 받는 방법",
    description: "지연이자를 청구하고 실제로 수령하는 절차를 안내해요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 노동청 신고",
    description: "노동청에 진정을 넣는 구체적인 방법을 정리했어요.",
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
          currentSlug="퇴직금-지연이자"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지연이자,<br />
        연 20% 받는 방법은?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금이 늦게 들어왔는데, 이자를 따로 받을 수 있나요?&rdquo;<br />
        받을 수 있죠.
        <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제18조</a>에 따르면 퇴직금 지급이 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>14일</a>을 넘기면 <strong>연 20%</strong>의 지연이자가 자동으로 붙어요.
        시중 은행 예금 이자가 연 3% 안팎인 걸 생각하면 상당히 높은 이율이죠.
        지연이자가 정확히 얼마나 되는지, 자동으로 받을 수 있는지, 청구 방법은 뭔지 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 지연이자가 얼마나 되나요?</H2>
      <p style={body}>
        <strong>연 20%</strong>예요. <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제18조</a>가 정한 법정 이율이죠. 미지급 퇴직금 원금에 대해 하루 단위로 이자가 계산돼요. 퇴직금 1,000만 원을 1년 동안 안 주면 이자만 <strong>200만 원</strong>이 쌓이는 거예요.
      </p>
      <p style={body}>
        단리 방식이에요. 이자에 이자가 붙는 복리가 아니라, 원금에 대해서만 20%가 적용되죠. 그래도 시중 금리 대비 6~7배 수준이니까 금액이 상당해요. 퇴직금 500만 원이 6개월 늦어지면 이자가 약 49만 원, 300만 원이 3개월 늦어지면 약 15만 원이에요.
      </p>
      <p style={body}>
        이자 발생 시점은 <strong>14일 기한 다음 날</strong>이에요. 3월 10일에 퇴사했다면 3월 24일이 기한 마감, 3월 25일부터 이자가 돌아가기 시작하죠. 실제 퇴직금을 받는 날까지 매일 이자가 쌓여요.
      </p>

      <GreenBox title="지연이자 핵심 숫자">
        이율 = <strong>연 20%</strong> (단리)<br />
        발생 시점 = 14일 기한 다음 날부터<br />
        계산 = 미지급액 x 20% x (지연일수 / 365)
      </GreenBox>

      <SectionBadge>내 상황을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 지연이자를 청구할 수 있는 상태예요. 금액을 계산해서 내용증명을 보내세요."
        partialMatchText="일부만 해당돼요. 기한 초과 여부와 금액을 먼저 확인하고 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>지연이자는 자동으로 받을 수 있나요?</H2>
      <p style={body}>
        법적으로는 &ldquo;자동 발생&rdquo;이지만, 실제로 &ldquo;자동 입금&rdquo;은 아니에요. 14일이 지나면 법률상 이자가 쌓이기 시작하지만, 회사가 알아서 이자를 보내주는 경우는 거의 없죠. 근로자가 직접 &ldquo;이자도 함께 달라&rdquo;고 청구해야 받을 수 있어요.
      </p>
      <p style={body}>
        청구하지 않으면 이자를 못 받는 건 아니에요. 법적 청구권은 그대로 남아 있으니까요. 다만 청구하지 않으면 회사가 무시해버리니까, 적극적으로 요청하는 게 중요하죠. 내용증명이나 노동청 진정서에 지연이자 항목을 명시하면 돼요.
      </p>
      <p style={body}>
        예외적으로 지연이자가 면제되는 경우가 있어요. 회사가 법원 <strong>회생 절차</strong>에 들어가거나, <strong>천재지변</strong> 같은 불가항력 사유가 있으면 법원이 감면해줄 수 있죠. 하지만 단순 경영난이나 자금 부족은 면제 사유가 아니에요. 회사가 &ldquo;돈이 없어서&rdquo;라고 해도 지연이자 의무는 그대로 남아요.
      </p>

      <BorderBox title="지연이자 면제가 인정되는 경우">
        법원 회생 절차 진행 중 (기업회생, 개인회생)<br />
        천재지변 등 불가항력 사유 존재<br />
        <strong>단순 경영난, 자금 부족은 면제 사유 아님</strong>
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>지연이자 계산 방법은?</H2>
      <p style={body}>
        공식은 <strong>미지급 퇴직금 x 20% x (지연일수 / 365)</strong>이에요. 세 가지 숫자만 넣으면 바로 계산되죠. 미지급 퇴직금은 세후 금액이 아니라 <strong>세전 총액</strong>을 기준으로 해요.
      </p>
      <p style={body}>
        예를 들어볼게요. 퇴직금이 800만 원이고 60일 늦게 받았다면 → 800만 원 x 0.2 x (60/365) = <strong>약 26만 3,014원</strong>이에요. 퇴직금이 1,500만 원이고 90일 늦었다면 → 1,500만 원 x 0.2 x (90/365) = <strong>약 73만 9,726원</strong>이죠. 금액이 클수록, 기간이 길수록 이자가 커져요.
      </p>
      <p style={body}>
        퇴직금 일부만 받은 경우에는 <strong>미지급 잔액</strong>에 대해서만 이자가 붙어요. 1,000만 원 중 700만 원을 14일 안에 받고, 나머지 300만 원을 40일 뒤에 받았다면 → 300만 원 x 0.2 x (40/365) = 약 6만 5,753원이 지연이자예요. 이미 지급된 700만 원에 대해서는 이자가 발생하지 않죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>지연이자를 받기 위해 해야 할 것들은?</H2>
      <p style={body}>
        <strong>1단계: 금액 계산</strong>이에요. 위의 공식으로 지연이자를 정확히 산출하세요. &ldquo;대충 이 정도&rdquo;가 아니라 원 단위까지 계산해서 적어야 회사가 진지하게 받아들이죠. 계산 과정을 메모해두면 나중에 증거 자료로 활용할 수 있어요.
      </p>
      <p style={body}>
        <strong>2단계: 내용증명 발송</strong>이에요. &ldquo;퇴직금 원금 ○○원과 지연이자 ○○원(연 20%, ○일분)을 ○일까지 지급해주세요. 미이행 시 노동청 진정 및 법적 조치를 진행하겠습니다&rdquo;라는 내용으로 보내세요. 우체국에서 5,000원이면 발송할 수 있어요.
      </p>
      <p style={body}>
        <strong>3단계: 노동청 진정 또는 민사소송</strong>이에요. 내용증명에 반응이 없으면 고용노동부 민원마당(minwon.moel.go.kr)에 &ldquo;임금체불 진정&rdquo;을 접수하세요. 진정서에 지연이자 청구도 함께 기재하면 돼요. 시정지시로 안 되면 <a href="/w/퇴직금-지연이자-받기" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사소송(소액심판)</a>으로 확실하게 받아내야 하죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>지연이자 청구 시 주의할 점은?</H2>
      <p style={body}>
        <strong>소멸시효</strong>를 꼭 챙기세요. 퇴직금 청구권과 지연이자 청구권 모두 소멸시효가 <strong>3년</strong>이에요. 퇴사일로부터 3년이 지나면 원금이든 이자든 청구할 수 없게 돼요. 시효가 임박했다면 내용증명을 먼저 보내서 6개월 유예를 확보하세요.
      </p>
      <p style={body}>
        <strong>기한 연장 합의</strong> 여부도 확인해야 해요. 회사와 지급 기한 연장에 합의했다면 합의 기한까지는 지연이자가 발생하지 않거든요. &ldquo;기다리겠다&rdquo;고 구두로 말한 것도 합의로 인정될 수 있으니, 앞으로는 합의 여부를 서면으로 명확히 남기세요.
      </p>
      <p style={body}>
        <strong>세금 처리</strong>도 알아둬야 해요. 퇴직금 원금은 퇴직소득세가 적용되지만, 지연이자는 <strong>기타소득</strong>으로 분류돼요. 지연이자에 대해서도 원천징수가 될 수 있고, 금액이 크면 종합소득세 신고 대상이 될 수 있죠. 이 부분은 국세청 홈택스(hometax.go.kr)에서 확인하세요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지연이자에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 같은 법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 고용노동부 고객센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
