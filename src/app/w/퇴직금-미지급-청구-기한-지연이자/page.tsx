"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 3년이 지나지 않았어요" },
  { id: "c2", label: "퇴직금을 전액 또는 일부 못 받았어요" },
  { id: "c3", label: "퇴직 후 14일이 지났어요 (지연이자 대상)" },
  { id: "c4", label: "근무 사실을 증명할 서류가 있어요" },
];

const FAQS = [
  {
    q: "3년이 지나면 퇴직금을 아예 못 받나요?",
    a: "법적 청구권은 소멸돼요. 다만 사업주가 자발적으로 지급하면 받을 수 있죠. 법적으로 강제할 수는 없어요.",
  },
  {
    q: "소멸시효 3년은 퇴직일부터인가요?",
    a: "맞아요. 퇴직일(마지막 근무일) 다음 날부터 기산되죠. 퇴직금 지급 기한인 14일과는 별개예요.",
  },
  {
    q: "내용증명을 보내면 시효가 중단되나요?",
    a: "일시적으로 중단 효과가 있어요. 다만 내용증명 발송 후 6개월 안에 소송이나 노동청 신고를 해야 효력이 유지되죠.",
  },
  {
    q: "지연이자 청구에도 시효가 있나요?",
    a: "지연이자도 퇴직금 청구권과 같은 3년 소멸시효가 적용돼요. 퇴직금 원금 청구 시 함께 청구하는 게 좋죠.",
  },
  {
    q: "시효가 1개월밖에 안 남았는데 어떻게 해야 하나요?",
    a: "가장 빠른 방법은 내용증명을 보내는 거예요. 발송 즉시 시효가 일시 중단되죠. 그 후 6개월 안에 노동청 신고나 소송을 진행하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제49조 — 임금채권 소멸시효 (3년)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제17조 — 지연이자 (연 20%)", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 관련 상담 안내", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단 — 무료 법률 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년, 지금 청구할 수 있나요?",
    description: "소멸시효 기산점, 중단 사유, 시효 만료 전 대처법을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고, 어디에 어떻게 하나요?",
    description: "노동청 신고 장소, 준비 서류, 진행 절차를 한눈에 정리했어요.",
  },
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20% 계산법",
    description: "14일 지나면 붙는 지연이자 계산법과 청구 방법을 안내해요.",
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
          currentSlug="퇴직금-미지급-청구-기한-지연이자"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 청구 기한 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 미지급 청구 기한<br />
        3년 안에 해야 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직한 지 2년이 넘었는데, 아직 퇴직금을 청구할 수 있나요?&rdquo;<br />
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제49조</a>에 따르면 퇴직금 청구권의 소멸시효는 <strong>3년</strong>이에요. 퇴직일 다음 날부터 시작되죠.
        3년이 지나면 법적 강제력이 사라지니까, 기한 안에 반드시 움직여야 해요.
        청구 기한, 지연이자 계산, 시효 중단 방법까지 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 청구 기한이 3년인가요?</H2>
      <p style={body}>
        맞아요. 근로기준법 제49조가 &ldquo;임금채권은 3년간 행사하지 않으면 시효로 소멸한다&rdquo;고 규정하고 있죠. 퇴직금도 임금채권에 포함되기 때문에 동일하게 3년이 적용돼요.
      </p>
      <p style={body}>
        기산점(시작일)은 <strong>퇴직일(마지막 근무일) 다음 날</strong>이에요. 2023년 3월 16일에 퇴직했다면 2026년 3월 16일까지가 청구 기한이죠. 퇴직금 지급 기한인 14일과 혼동하기 쉬운데, 소멸시효 3년은 별개의 기간이에요.
      </p>
      <p style={body}>
        이 기한은 퇴직금뿐 아니라 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a>(연 20%)에도 적용돼요. 퇴직금과 지연이자를 동시에 청구하는 게 일반적이니, 시효 만료 전에 한꺼번에 움직이는 게 효율적이죠.
      </p>

      <GreenBox title="소멸시효 핵심 정리">
        기간: 퇴직일 다음 날부터 <strong>3년</strong><br />
        근거: 근로기준법 제49조<br />
        적용 범위: 퇴직금 원금 + 지연이자 모두
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>3년이 지나면 정말 못 받나요?</H2>
      <p style={body}>
        법적으로는 그래요. 소멸시효가 완성되면 사업주가 &ldquo;시효 소멸&rdquo;을 주장할 수 있고, 법원도 이를 인정하죠. 노동청 진정을 넣어도 시효가 지났으면 강제할 수 없어요.
      </p>
      <p style={body}>
        다만 사업주가 &ldquo;시효 소멸&rdquo;을 주장하지 않으면 지급받을 수 있어요. 사업주가 자발적으로 지급하는 건 법적으로 문제가 없거든요. 현실에서는 시효가 지나도 &ldquo;양심적으로&rdquo; 주는 경우가 가끔 있죠.
      </p>
      <p style={body}>
        그렇지만 사업주의 선의에 기대는 건 위험해요. 시효가 가까워지고 있다면 지금 바로 행동에 나서야 하죠. 내용증명 발송만으로도 시효를 일시 중단시킬 수 있으니, 일단 내용증명부터 보내세요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>지연이자는 언제부터 계산되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제17조</a>에 따라, 퇴직 후 <strong>14일이 지난 다음 날</strong>부터 지연이자가 시작돼요. 14일은 법이 정한 퇴직금 지급 기한이고, 이 기한을 넘기면 &ldquo;지연&rdquo;이 확정되는 거죠.
      </p>
      <p style={body}>
        이자율은 <strong>연 20%</strong>예요. 계산 공식은 간단하죠. 미지급 퇴직금 x 20% x (지연 일수 / 365)이에요. 예를 들어 퇴직금 600만 원을 100일 동안 못 받았다면, 600만 x 20% x (100/365) = 약 32만 8,767원이에요.
      </p>
      <p style={body}>
        지연이자는 퇴직금이 실제 입금되는 날까지 계속 불어나요. 그래서 회사가 늦게 줄수록 근로자가 받는 이자가 커지죠. 합의 시 이자 금액을 빠뜨리지 말고 원금과 함께 청구하세요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>시효 중단을 위해 해야 할 것들은?</H2>
      <p style={body}>
        소멸시효를 중단(멈춤)시키는 방법은 세 가지예요. <strong>내용증명 발송, 노동청 진정, 민사 소송 제기</strong>죠. 이 중 하나만 해도 시효가 중단되고, 중단 시점부터 시효가 새로 시작돼요.
      </p>
      <p style={body}>
        가장 간편한 건 <strong>내용증명</strong>이에요. 우체국이나 인터넷 우체국에서 바로 보낼 수 있죠. 다만 내용증명은 &ldquo;최고(催告)&rdquo;에 해당해서, 발송 후 <strong>6개월 안에</strong> 소송이나 노동청 신고를 해야 시효 중단 효력이 유지돼요. 6개월을 넘기면 다시 시효가 진행되니 주의하세요.
      </p>
      <p style={body}>
        노동청 진정이나 민사 소송은 제기 자체로 시효가 완전히 중단돼요. 진정서를 접수한 날, 소장을 제출한 날부터 시효가 멈추죠. 시효 만료가 임박했다면 내용증명을 먼저 보내고, 6개월 안에 노동청 진정을 넣는 게 가장 현실적인 순서예요.
      </p>

      <BorderBox title="시효 중단 방법 비교">
        <strong>내용증명</strong> — 발송 즉시 일시 중단, 6개월 내 후속 조치 필요<br />
        <strong>노동청 진정</strong> — 접수일부터 완전 중단, 무료<br />
        <strong>민사 소송</strong> — 소장 제출일부터 완전 중단, 비용 발생
      </BorderBox>

      <Divider />

      {/* 섹션 5 */}
      <H2>기한 내 청구 방법은?</H2>
      <p style={body}>
        시효 3년 이내라면 순서가 정해져 있어요. 먼저 <strong>내용증명</strong>으로 퇴직금 지급을 요청하고, 반응이 없으면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동청 진정</a>을 넣으세요. 노동청에서도 해결이 안 되면 법원 지급명령이나 민사 소송으로 넘어가면 되죠.
      </p>
      <p style={body}>
        각 단계에서 퇴직금 원금과 <strong>지연이자를 함께</strong> 청구하는 게 중요해요. 원금만 청구하고 이자를 빠뜨리는 실수가 의외로 많거든요. 진정서나 소장에 &ldquo;미지급 퇴직금 ○○원 및 근로기준법 시행령 제17조에 따른 지연이자&rdquo;라고 명시하면 돼요.
      </p>
      <p style={body}>
        법률 지식이 부족해서 걱정된다면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대한법률구조공단</a>에서 무료 법률 상담을 받을 수 있어요. 소득이 일정 기준 이하이면 소송 대리까지 무료로 지원해주죠. 고용노동부 상담전화(1350)에서도 절차를 안내받을 수 있고요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당돼요. 시효가 남아 있으니 내용증명 발송 → 노동청 진정 순으로 진행하세요."
        partialMatchText="일부만 해당돼요. 시효 확인부터 하고 고용노동부(1350)에 상담을 받아보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 청구 기한과 지연이자에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
