"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사한 지 14일이 넘었는데 퇴직금을 못 받았어요" },
  { id: "c2", label: "퇴사한 지 아직 3년이 안 됐어요 (소멸시효 이내)" },
  { id: "c3", label: "1년 이상 근무한 퇴직금 대상자예요" },
  { id: "c4", label: "회사가 아직 운영 중이에요 (폐업 아님)" },
];

const CHECKLIST = [
  "퇴사일 확인 — 정확한 퇴사일 기준으로 소멸시효(3년) 계산",
  "미지급 퇴직금 산정 — 평균임금 x 근속연수로 금액 계산",
  "지연이자 계산 — 미지급액 x 20% x (지연일수 / 365)",
  "내용증명 발송 — 퇴직금 + 지연이자 지급 요청서 우편 발송",
  "노동청 진정 접수 — 민원마당 온라인 또는 관할 노동청 방문",
];

const FAQS = [
  {
    q: "기한이 지났는데 아직도 퇴직금을 받을 수 있나요?",
    a: "퇴사일로부터 3년 이내라면 청구할 수 있어요. 3년이 소멸시효이기 때문에, 이 기간 안에만 움직이면 돼요.",
  },
  {
    q: "3년이 거의 다 됐는데 어떻게 해야 하나요?",
    a: "소멸시효 완성 전에 내용증명을 보내거나 노동청 진정을 접수하면 시효가 중단돼요. 하루라도 빨리 행동하세요.",
  },
  {
    q: "기한 초과 퇴직금에 지연이자가 얼마나 붙나요?",
    a: "연 20%예요. 14일 기한 다음 날부터 실제 지급일까지 계산하죠. 1년 미지급이면 퇴직금의 20%가 이자로 붙어요.",
  },
  {
    q: "퇴직금과 지연이자를 동시에 청구할 수 있나요?",
    a: "당연하죠. 노동청 진정이나 민사소송에서 퇴직금 원금과 지연이자를 함께 청구하면 돼요.",
  },
  {
    q: "회사가 폐업했어도 받을 수 있나요?",
    a: "체당금 제도를 활용하면 돼요. 고용노동부에 체당금을 신청하면 국가가 퇴직금을 대신 지급하죠. 최대 700만 원까지 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (14일 이내 지급)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제49조 — 임금 채권 소멸시효 3년", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제18조 — 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단 — 소액사건 무료 지원", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년 기준",
    description: "3년이 지나면 퇴직금 청구권이 사라져요. 기산점과 중단 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20% 계산",
    description: "기한 초과 시 자동으로 붙는 지연이자 계산법을 안내해요.",
  },
  {
    slug: "퇴직금-미지급-지급받는-방법",
    title: "퇴직금 미지급 시 받는 방법",
    description: "내용증명부터 소송까지, 단계별 대응법을 정리했어요.",
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
          currentSlug="퇴직금-지급-기한-초과"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 초과,<br />
        지금 받을 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴사한 지 몇 달이 됐는데 퇴직금을 아직도 못 받았어요. 이제 와서 받을 수 있나요?&rdquo;<br />
        받을 수 있죠. 퇴직금 청구권의 <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>소멸시효는 3년</a>이에요.
        퇴사일로부터 3년 이내라면 퇴직금 원금은 물론, <strong>연 20%</strong>의 지연이자까지 함께 청구할 수 있죠.
        다만 시간이 지날수록 증거 확보가 어려워지고, 회사가 폐업할 리스크도 커지니 빨리 움직여야 해요.
        기한 초과 퇴직금을 받는 구체적인 방법을 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>지급 기한이 지난 퇴직금도 받을 수 있나요?</H2>
      <p style={body}>
        네, 받을 수 있어요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>의 14일 기한은 회사의 &ldquo;지급 의무 기한&rdquo;이지, 근로자의 &ldquo;청구 기한&rdquo;이 아니거든요. 회사가 14일을 넘겼더라도 근로자의 퇴직금 청구권은 그대로 살아 있어요.
      </p>
      <p style={body}>
        다만 영원히 청구할 수 있는 건 아니에요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제49조</a>에 따르면 임금 채권(퇴직금 포함)의 <strong>소멸시효는 3년</strong>이죠. 퇴사일로부터 3년이 지나면 법적 청구권 자체가 사라져요.
      </p>
      <p style={body}>
        소멸시효가 임박했다면 &ldquo;시효 중단&rdquo; 조치를 취해야 해요. 내용증명을 보내면 6개월간 시효가 유예되고, 노동청 진정이나 소송을 제기하면 시효가 완전히 중단되죠. 퇴사한 지 2년 6개월이 넘었다면 하루라도 빨리 행동에 옮기세요.
      </p>

      <GreenBox title="핵심 정리">
        14일 기한 초과 = <strong>회사의 법 위반</strong> (근로자 청구권은 유지)<br />
        소멸시효 = 퇴사일로부터 <strong>3년</strong><br />
        시효 중단 = 내용증명(6개월 유예), 진정·소송(완전 중단)
      </GreenBox>

      <SectionBadge>내 상황을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 퇴직금과 지연이자를 함께 청구할 수 있어요. 내용증명부터 보내세요."
        partialMatchText="일부만 해당돼요. 소멸시효와 회사 상태를 먼저 확인하고 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>기한 초과 시 지연이자는 자동으로 붙나요?</H2>
      <p style={body}>
        법률상으로는 자동이에요. <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제18조</a>에 따르면 14일 기한을 넘긴 다음 날부터 미지급 퇴직금에 <strong>연 20%</strong>의 지연이자가 발생하죠. 근로자가 별도로 청구하지 않아도 법적으로 이자가 쌓이고 있는 셈이에요.
      </p>
      <p style={body}>
        다만 &ldquo;자동 발생&rdquo;과 &ldquo;자동 입금&rdquo;은 달라요. 회사가 알아서 이자를 보내주지는 않거든요. 실제로 지연이자를 받으려면 근로자가 직접 청구해야 하죠. 내용증명, 노동청 진정, 민사소송 — 이 세 가지 경로 중 하나를 선택하면 돼요.
      </p>
      <p style={body}>
        기한을 많이 넘겼을수록 지연이자도 커져요. 퇴직금 500만 원을 1년 동안 안 주면 이자만 100만 원이고, 2년이면 200만 원이죠. 회사 입장에서는 빨리 줄수록 부담이 적어지니까, 내용증명에 지연이자 금액을 구체적으로 적어서 보내면 지급을 앞당기는 데 효과적이에요.
      </p>

      <BorderBox title="지연이자 계산 예시">
        퇴직금 500만 원, 6개월(180일) 미지급 시<br />
        500만 원 x 20% x (180 / 365) = <strong>약 49만 3,151원</strong><br />
        원금 + 이자 = 약 549만 3,151원 청구 가능
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>소멸시효 3년, 지금 청구해도 될까요?</H2>
      <p style={body}>
        퇴사일로부터 3년이 안 됐다면 청구할 수 있어요. 소멸시효의 기산점은 &ldquo;퇴사일&rdquo;이에요. 정확히는 퇴사일 다음 날부터 3년을 세기 시작하죠. 2023년 6월 1일에 퇴사했다면 2026년 6월 1일까지가 청구 가능 기간이에요.
      </p>
      <p style={body}>
        시효가 6개월 이내로 남았다면 긴급 조치가 필요해요. <strong>내용증명을 보내면 6개월간 시효가 유예</strong>되죠. 이 유예 기간 안에 소송이나 노동청 진정을 제기하면 시효가 완전히 중단돼요. 유예 기간 안에 아무 조치도 안 하면 시효가 그대로 완성되니 주의하세요.
      </p>
      <p style={body}>
        소멸시효가 완성되면 퇴직금 청구권 자체가 사라져요. 지연이자 청구권도 함께 소멸하죠. &ldquo;나중에 여유 있을 때 청구하지&rdquo; 하다가 3년을 넘기면 법적으로 한 푼도 못 받게 되니까, 빨리 움직이는 게 최선이에요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>기한 초과 퇴직금 청구 방법은?</H2>
      <p style={body}>
        1단계는 <strong>내용증명 발송</strong>이에요. 우체국에서 &ldquo;퇴직금 ○○원과 지연이자 ○○원을 ○일까지 지급하라&rdquo;는 내용을 보내세요. 비용은 5,000원 안팎이고, 발송 기록이 남아서 &ldquo;공식적으로 청구했다&rdquo;는 증거가 되죠.
      </p>
      <p style={body}>
        2단계는 <strong>노동청 진정</strong>이에요. 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로 접수하거나, 관할 고용노동청에 직접 방문하면 돼요. 근로계약서, 급여명세서, 퇴직증명서, 내용증명 발송 기록을 첨부하세요. 접수 후 2~4주 내에 근로감독관이 시정지시를 내려요.
      </p>
      <p style={body}>
        3단계는 <strong>민사소송</strong>이에요. 노동청 시정지시에도 불응하면 소송으로 넘어가야 하죠. 청구 금액이 3,000만 원 이하이면 소액심판으로 빠르게 처리할 수 있고, 대한법률구조공단(klac.or.kr)에서 무료 법률 지원을 받을 수 있어요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>회사가 계속 미루면 어떻게 해야 하나요?</H2>
      <p style={body}>
        구두 약속에 속지 마세요. &ldquo;다음 달에 줄게&rdquo;, &ldquo;곧 정리될 거야&rdquo; — 이런 말은 법적 효력이 없어요. 말로 기다리겠다고 하면 오히려 &ldquo;합의 연장&rdquo;으로 오해받아 지연이자 청구가 어려워질 수 있죠.
      </p>
      <p style={body}>
        행동으로 옮기는 게 가장 효과적이에요. 내용증명을 보내고 10일 이내에 반응이 없으면 바로 노동청 진정을 접수하세요. 노동청 시정지시가 나오면 회사 대표에게 &ldquo;불이행 시 형사 고발&rdquo;이라는 압박이 가해지거든요. 이 단계에서 대부분 해결돼요.
      </p>
      <p style={body}>
        최악의 경우에는 <strong>가압류</strong>를 고려해야 해요. 회사 재산(부동산, 매출채권, 예금)에 가압류를 걸어두면 회사가 자산을 빼돌리는 걸 막을 수 있죠. 가압류 신청은 법원에 하는 건데, 법률구조공단 무료 상담을 통해 절차를 안내받을 수 있어요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 기한 초과와 청구 방법에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 고용노동부 고객센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
