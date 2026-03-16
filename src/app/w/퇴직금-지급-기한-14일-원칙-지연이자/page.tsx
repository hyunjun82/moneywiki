"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사일로부터 14일이 지났는데 퇴직금을 못 받았어요" },
  { id: "c2", label: "회사와 기한 연장 합의를 한 적이 없어요" },
  { id: "c3", label: "1년 이상 근무한 정규직·계약직이에요" },
  { id: "c4", label: "퇴사한 지 아직 3년이 안 됐어요" },
];

const CHECKLIST = [
  "퇴사일 기준 14일 경과 여부 확인 — 달력 기준(토·일 포함)",
  "미지급 퇴직금 금액 확인 — 퇴직금 명세서 또는 직접 계산",
  "지연이자 계산 — 미지급액 x 20% x (지연일수 / 365)",
  "내용증명 발송 — 퇴직금 + 지연이자 지급 요청",
  "노동청 진정 접수 — 고용노동부 민원마당 또는 관할 노동청 방문",
];

const FAQS = [
  {
    q: "14일 원칙은 어떤 법 조항에 근거하나요?",
    a: "근로기준법 제36조예요. '사용자는 근로자가 퇴직한 경우 14일 이내에 모든 금품을 지급하여야 한다'고 명시하고 있죠.",
  },
  {
    q: "지연이자 연 20%는 단리인가요 복리인가요?",
    a: "단리예요. 미지급 원금에 대해서만 연 20%를 적용하죠. 이자에 이자가 붙는 복리 방식은 아니에요.",
  },
  {
    q: "14일 안에 일부만 지급하면 지연이자는 어떻게 되나요?",
    a: "미지급 잔액에 대해서만 지연이자가 붙어요. 예를 들어 퇴직금 1,000만 원 중 600만 원을 14일 안에 줬다면, 나머지 400만 원에 대해 연 20%가 적용되죠.",
  },
  {
    q: "회사가 경영난이라 못 준다고 하면 지연이자가 면제되나요?",
    a: "원칙적으로 면제되지 않아요. 다만 법원이 '천재지변, 회생 절차 등 정당한 사유'를 인정하면 감면될 수 있죠. 단순 자금난은 정당한 사유에 해당하지 않아요.",
  },
  {
    q: "퇴직연금(DB형)도 14일 원칙이 적용되나요?",
    a: "적용돼요. DB형은 회사가 운용하는 퇴직연금이니까, 14일 이내에 IRP 계좌로 이전해야 하죠. 이전이 늦어지면 마찬가지로 지연이자 대상이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (14일 이내 지급)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제18조 — 미지급 임금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 해설", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단 — 퇴직금 미지급 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 총정리",
    description: "퇴사 후 14일 이내 지급이 원칙이고, 위반 시 대응 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-지연이자-받기",
    title: "퇴직금 지연이자 실제로 받는 방법",
    description: "지연이자 청구 절차와 성공 포인트를 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 노동청 신고",
    description: "노동청에 신고하는 구체적인 절차를 안내해요.",
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
          currentSlug="퇴직금-지급-기한-14일-원칙-지연이자"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 14일 지급 원칙,<br />
        어기면 지연이자가 붙나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금이 14일 안에 안 들어왔는데, 이자를 받을 수 있는 건가요?&rdquo;<br />
        받을 수 있죠.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>가 정한 14일 기한을 넘기면, <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>같은 법 시행령 제18조</a>에 따라 <strong>연 20%</strong>의 지연이자가 자동으로 붙어요.
        회사가 &ldquo;곧 줄게&rdquo;라고 해도 법적으로는 이미 이자가 돌아가고 있는 셈이죠.
        14일 원칙의 정확한 의미, 지연이자 계산법, 청구 방법을 차례로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>14일 원칙이 정확히 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>의 핵심이에요. 근로자가 퇴직하면 사용자는 퇴직일로부터 <strong>14일 이내</strong>에 퇴직금을 포함한 모든 금품을 지급해야 하죠. 여기서 14일은 달력 기준이에요. 주말이나 공휴일도 포함해서 세니까 &ldquo;영업일 14일&rdquo;이 아니에요.
      </p>
      <p style={body}>
        기산점(세기 시작하는 날)은 퇴직일 다음 날이에요. 3월 10일에 퇴사했다면 3월 11일이 1일째, 3월 24일이 14일째가 되죠. 이 날까지 퇴직금이 통장이나 IRP 계좌에 들어와야 해요. 15일째부터는 지연이자가 발생하기 시작하죠.
      </p>
      <p style={body}>
        예외가 딱 하나 있어요. &ldquo;당사자 간 합의&rdquo;로 지급 기한을 연장하는 경우죠. 이건 근로자가 자발적으로 동의해야만 유효해요. 회사가 일방적으로 통보하는 건 합의가 아니니까, 동의하지 않았다면 14일 원칙이 그대로 적용돼요.
      </p>

      <GreenBox title="14일 원칙 요약">
        기한 = 퇴직일 다음 날부터 <strong>달력 기준 14일</strong><br />
        근거 = 근로기준법 제36조<br />
        예외 = 당사자 간 <strong>합의</strong>로 연장 가능 (일방 통보는 무효)
      </GreenBox>

      <SectionBadge>내 상황을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 지연이자를 청구할 수 있는 상황이에요. 내용증명부터 보내세요."
        partialMatchText="일부만 해당돼요. 기한 연장 합의 여부와 소멸시효를 먼저 확인하고 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>14일 이후에는 자동으로 지연이자가 붙나요?</H2>
      <p style={body}>
        네, 자동이에요. 별도 청구를 하지 않아도 법적으로는 15일째부터 이자가 발생하죠. <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제18조</a>가 &ldquo;지급 기일 후 지연 기간에 대해 연 20%의 지연이자를 지급하여야 한다&rdquo;고 규정하고 있어요.
      </p>
      <p style={body}>
        &ldquo;자동&rdquo;이라는 건 법률상 발생한다는 뜻이지, 회사가 알아서 이자를 보내준다는 뜻은 아니에요. 실제로 받으려면 근로자가 직접 청구해야 하죠. 내용증명으로 &ldquo;퇴직금 원금 + 지연이자를 지급해달라&rdquo;고 요청하거나, 노동청 진정 시 지연이자를 함께 청구하면 돼요.
      </p>
      <p style={body}>
        다만 예외가 있어요. 회사가 <strong>회생 절차</strong>에 들어갔거나 <strong>천재지변</strong> 같은 불가항력 사유가 있으면 법원이 지연이자를 감면해줄 수 있죠. 하지만 &ldquo;매출이 줄었다&rdquo;, &ldquo;자금 사정이 어렵다&rdquo; 같은 단순 경영난은 감면 사유에 해당하지 않아요.
      </p>

      <BorderBox title="지연이자 발생 시점 예시">
        퇴사일: 3월 10일 → 지급 기한: 3월 24일<br />
        3월 25일부터 지연이자(연 20%) 발생<br />
        4월 24일에 지급하면 → 31일분의 지연이자를 함께 받을 수 있어요
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>지연이자 계산 방법은?</H2>
      <p style={body}>
        공식은 간단해요. <strong>미지급 퇴직금 x 20% x (지연일수 / 365)</strong>이죠. 예를 들어 퇴직금 1,000만 원을 60일 늦게 받았다면 → 1,000만 원 x 0.2 x (60/365) = 약 32만 8,767원이에요.
      </p>
      <p style={body}>
        지연일수는 14일 기한 다음 날부터 실제 지급일까지 세면 돼요. 달력 기준이니까 주말과 공휴일도 포함하죠. 연 20%라는 이율은 단리예요. 이자에 이자가 붙는 복리 방식이 아니라서 계산이 단순하죠.
      </p>
      <p style={body}>
        퇴직금 일부만 받은 경우에는 미지급 잔액에 대해서만 이자가 붙어요. 퇴직금 1,000만 원 중 700만 원을 14일 안에 받고 나머지 300만 원을 30일 뒤에 받았다면, 300만 원 x 0.2 x (30/365) = 약 4만 9,315원이 지연이자가 되죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>지연이자를 받으려면 어떻게 해야 하나요?</H2>
      <p style={body}>
        가장 먼저 할 일은 <strong>내용증명</strong>을 보내는 거예요. &ldquo;퇴직금 원금 ○○원과 지연이자 ○○원을 ○일까지 지급해주세요&rdquo;라는 내용을 우체국 내용증명으로 발송하죠. 이게 &ldquo;공식적으로 청구했다&rdquo;는 기록이 돼요.
      </p>
      <p style={body}>
        회사가 내용증명을 무시하면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>(minwon.moel.go.kr)에서 &ldquo;임금체불 진정&rdquo;을 접수하세요. 진정서에 지연이자 청구도 함께 기재하면 돼요. 근로감독관이 회사에 시정지시를 내리면 퇴직금 원금과 지연이자를 함께 지급받을 수 있죠.
      </p>
      <p style={body}>
        노동청 시정지시로도 해결이 안 되면 <strong>민사소송</strong>으로 넘어가야 해요. 소액사건(3,000만 원 이하)이면 소액심판으로 빠르게 진행할 수 있고, 대한법률구조공단(klac.or.kr)에서 무료 법률 상담과 소송 지원을 받을 수 있죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>회사가 사정이 어렵다고 하면 어떻게 하나요?</H2>
      <p style={body}>
        &ldquo;돈이 없어서 못 줘&rdquo;라는 말은 법적으로 통하지 않아요. 경영난은 지연이자 면제 사유가 아니거든요. 법원 판례에서도 단순 자금 부족을 &ldquo;정당한 사유&rdquo;로 인정한 적이 없죠. 회사가 아무리 어렵다 해도 퇴직금과 지연이자 지급 의무는 그대로 남아요.
      </p>
      <p style={body}>
        다만 회사가 <strong>법원 회생 절차</strong>(기업 회생)에 들어갔다면 이야기가 달라져요. 이 경우 모든 채권이 동결되니까 퇴직금 지급도 법원 결정에 따라 유예될 수 있죠. 하지만 퇴직금은 &ldquo;최우선변제권&rdquo;이 있어서 다른 채권보다 먼저 배분받아요.
      </p>
      <p style={body}>
        회사가 완전히 <a href="/w/회사-폐업-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>폐업</a>한 상태라면 정부의 <strong>체당금 제도</strong>를 활용하세요. 고용노동부에 체당금을 신청하면 국가가 퇴직금을 대신 지급하고, 나중에 사업주에게 구상권을 행사하는 구조예요. 체당금 상한은 퇴직 당시 나이와 금액에 따라 달라지지만, 최대 700만 원까지 받을 수 있죠.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 14일 원칙과 지연이자에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 같은 법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 고용노동부 고객센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
