"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 3년이 아직 안 됐어요" },
  { id: "c2", label: "퇴직금을 한 번도 받은 적이 없어요" },
  { id: "c3", label: "회사에 지급을 요청하거나 내용증명을 보낸 적이 있어요" },
  { id: "c4", label: "근무 사실을 증명할 수 있는 서류가 있어요" },
];

const FAQS = [
  {
    q: "소멸시효 3년은 영업일 기준인가요?",
    a: "아니에요, 달력 기준(역일)이에요. 공휴일이나 주말도 포함해서 계산하죠.",
  },
  {
    q: "중간정산을 받은 퇴직금도 시효가 같나요?",
    a: "중간정산은 정산 시점에 이미 지급이 완료된 거예요. 시효 문제가 생기지 않죠. 시효는 미지급 퇴직금에만 적용돼요.",
  },
  {
    q: "퇴직금 일부를 받았는데 나머지도 3년인가요?",
    a: "미지급 잔액에 대해서도 퇴직일 다음 날부터 3년이에요. 일부 지급 시점이 기산점을 바꾸지는 않죠.",
  },
  {
    q: "시효가 거의 다 됐는데 지금 뭘 해야 하나요?",
    a: "내용증명을 바로 보내세요. 발송 즉시 시효가 일시 중단돼요. 이후 6개월 안에 노동청 진정이나 소송을 제기하면 되죠.",
  },
  {
    q: "해외에 있어서 직접 신고하기 어려운데요?",
    a: "고용노동부 민원마당에서 온라인 접수가 가능해요. 대리인(가족, 노무사)을 통해서도 진정할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제49조 — 임금채권 소멸시효 (3년)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "민법 제174조 — 최고(내용증명)에 의한 시효 중단", url: "https://www.law.go.kr/법령/민법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 소멸시효 안내", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단 — 무료 법률 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-미지급-청구-기한-지연이자",
    title: "퇴직금 미지급 청구 기한, 3년 안에 해야 하나요?",
    description: "청구 기한 3년의 의미와 지연이자 계산법을 함께 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고, 어디에 어떻게 하나요?",
    description: "노동청 신고 장소, 준비 서류, 진행 절차를 한눈에 정리했어요.",
  },
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20% 계산법",
    description: "14일 이후부터 적용되는 지연이자의 계산법과 청구 방법이에요.",
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
          currentSlug="퇴직금-소멸시효"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 소멸시효 · 3년</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 소멸시효 3년<br />
        지금 청구할 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직한 지 2년 반이 됐는데, 퇴직금을 아직 안 받았어요. 너무 늦은 건 아닌가요?&rdquo;<br />
        아직 늦지 않았어요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제49조</a>에 따르면 퇴직금 청구권의 소멸시효는 <strong>3년</strong>이에요. 퇴직일 다음 날부터 계산하죠.
        하지만 시효가 다가오고 있다면 빨리 움직여야 해요. 기산점, 시효 중단 방법, 3년이 지난 경우의 대처법까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 소멸시효가 3년인가요?</H2>
      <p style={body}>
        맞아요. 근로기준법 제49조가 &ldquo;이 법에 따른 임금채권은 3년간 행사하지 않으면 시효로 소멸한다&rdquo;고 규정하고 있죠. 퇴직금은 임금채권에 포함되기 때문에 동일하게 3년이 적용돼요.
      </p>
      <p style={body}>
        일반 채권의 소멸시효(민법상 10년)와 다르다는 점을 주의하세요. 근로기준법이 별도로 3년을 정해놨기 때문에, 퇴직금에는 3년이 우선 적용되죠. &ldquo;10년이니까 여유 있다&rdquo;고 생각하면 큰일이에요.
      </p>
      <p style={body}>
        소멸시효가 완성되면 법적 강제력이 사라져요. 노동청 진정을 넣어도, 법원에 소송을 제기해도 사업주가 &ldquo;시효 소멸&rdquo;을 주장하면 받아들여지죠. 그래서 기한 안에 행동하는 게 핵심이에요.
      </p>

      <GreenBox title="핵심 정리">
        기간: 퇴직일 다음 날부터 <strong>3년</strong><br />
        근거: 근로기준법 제49조<br />
        효과: 시효 완성 시 법적 청구권 소멸
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>3년 기산점은 언제부터인가요?</H2>
      <p style={body}>
        <strong>퇴직일(마지막 근무일) 다음 날</strong>부터예요. 2023년 6월 15일에 퇴직했다면 2023년 6월 16일이 시효 기산일이고, 2026년 6월 15일까지가 청구 기한이죠. 달력 기준(역일)으로 계산하니까 공휴일이나 주말도 포함돼요.
      </p>
      <p style={body}>
        퇴직금 지급 기한인 14일과 헷갈리기 쉬운데, 두 가지는 별개예요. 14일은 &ldquo;사업주가 지급해야 하는 기한&rdquo;이고, 3년은 &ldquo;근로자가 청구할 수 있는 기한&rdquo;이죠. 14일이 지나면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a>(연 20%)가 붙기 시작하고, 3년이 지나면 청구권 자체가 없어져요.
      </p>
      <p style={body}>
        퇴직금 중간정산을 받은 적이 있다면 그 금액은 이미 정산된 거예요. 시효 문제가 안 생기죠. 시효가 적용되는 건 <strong>아직 받지 못한 퇴직금</strong>이에요. 중간정산 이후 추가 근무 기간에 대한 퇴직금이 미지급된 경우, 최종 퇴직일 다음 날부터 3년이에요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>시효가 중단되는 경우는?</H2>
      <p style={body}>
        소멸시효는 특정 행위를 하면 &ldquo;중단&rdquo;(멈춤)시킬 수 있어요. 중단되면 그때까지 흐른 시효가 무효가 되고, 중단 사유가 끝난 시점부터 새로 3년이 시작되죠. <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제168조~제174조</a>에 규정되어 있어요.
      </p>
      <p style={body}>
        대표적인 시효 중단 사유는 세 가지예요. <strong>내용증명 발송</strong>(최고), <strong>노동청 진정</strong>, <strong>민사 소송 제기</strong>죠. 이 중 내용증명은 &ldquo;일시적 중단&rdquo;이에요. 발송 후 6개월 안에 소송이나 진정으로 이어져야 완전한 중단 효력이 유지되죠.
      </p>
      <p style={body}>
        노동청 진정이나 소송 제기는 접수 시점에 시효가 완전히 멈춰요. 진정이 종결되거나 판결이 확정된 후 다시 시효가 진행되죠. 시효 만료가 임박했다면 일단 내용증명을 보내 시간을 벌고, 6개월 안에 노동청 진정을 넣는 게 현실적인 전략이에요.
      </p>

      <BorderBox title="시효 중단 방법">
        <strong>내용증명</strong> — 발송 즉시 일시 중단, 6개월 내 후속 조치 필수<br />
        <strong>노동청 진정</strong> — 접수일부터 완전 중단, 무료<br />
        <strong>민사 소송</strong> — 소장 제출일부터 완전 중단
      </BorderBox>

      <Divider />

      {/* 섹션 4 */}
      <H2>3년이 지난 퇴직금도 받을 수 있나요?</H2>
      <p style={body}>
        법적으로는 어려워요. 소멸시효가 완성되면 사업주가 &ldquo;시효 소멸&rdquo;을 주장할 권리가 생기고, 법원도 이를 인정하죠. 노동청에 진정을 넣어도 강제할 수 없어요.
      </p>
      <p style={body}>
        다만 예외가 있어요. 사업주가 시효 소멸을 <strong>주장하지 않으면</strong> 법원이 직권으로 시효를 적용하지 않아요. 소송에서 사업주가 시효 항변을 안 하면 판결이 유리하게 나올 수 있죠. 물론 사업주가 이걸 모르고 넘어갈 확률은 낮지만요.
      </p>
      <p style={body}>
        시효가 지났더라도 사업주에게 직접 연락해서 자발적 지급을 요청할 수는 있어요. 법적 강제력은 없지만, 양심적으로 지급하는 사업주도 가끔 있죠. 하지만 이건 운에 맡기는 거니까, 시효 만료 전에 행동하는 게 최선이에요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>소멸시효 전에 해야 할 것들은?</H2>
      <p style={body}>
        시효가 남아 있다면 <strong>빨리 행동</strong>하는 게 답이에요. 첫 번째로 <strong>내용증명</strong>을 보내세요. 비용은 5,000원 안팎이고, 인터넷 우체국에서 온라인 발송도 가능하죠. 시효 중단 효과가 즉시 발생해요.
      </p>
      <p style={body}>
        내용증명 발송 후 <strong>6개월 안에</strong> <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동청 진정</a>을 넣으세요. 온라인으로 접수 가능하고, 비용은 무료예요. 진정 접수와 동시에 시효가 완전히 멈추니까 안심할 수 있죠.
      </p>
      <p style={body}>
        법률 지식이 부족하면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대한법률구조공단</a>에서 무료 상담을 받으세요. 소득 기준을 충족하면 소송 대리까지 무료로 지원해줘요. 고용노동부 상담전화(1350)에서도 절차를 안내해주니, 혼자 고민하지 말고 전문가 도움을 받는 게 효율적이죠.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당돼요. 시효 내에 있으니 내용증명 → 노동청 진정 순서로 바로 진행하세요."
        partialMatchText="일부만 해당돼요. 시효 기한부터 확인하고 고용노동부(1350)에 상담을 받아보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 소멸시효에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
