"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금을 못 받았어요" },
  { id: "c2", label: "근로계약서나 급여명세서 등 증빙이 있어요" },
  { id: "c3", label: "지연이자(연 20%)도 함께 청구하고 싶어요" },
  { id: "c4", label: "퇴직한 지 3년이 지나지 않았어요" },
];

const FAQS = [
  {
    q: "노동청 진정과 지연이자 청구를 동시에 할 수 있나요?",
    a: "당연하죠. 진정서에 퇴직금 원금과 지연이자를 함께 기재하면 돼요. 별도 절차가 필요하지 않아요.",
  },
  {
    q: "지연이자율이 연 20%라는 건 확실한가요?",
    a: "근로기준법 시행령 제17조에 명시되어 있어요. 퇴직 후 14일이 지난 다음 날부터 지급일까지 연 20%가 적용되죠.",
  },
  {
    q: "노동청 신고와 민사 소송을 동시에 진행할 수 있나요?",
    a: "가능해요. 노동청 진정은 행정 절차이고, 민사 소송은 별개의 사법 절차이기 때문에 병행할 수 있죠.",
  },
  {
    q: "회사가 일부만 주겠다고 합의를 제안하면?",
    a: "퇴직금 원금 전액 + 지연이자가 법적 권리예요. 급하게 합의하기보다 원금과 이자를 계산해보고, 그보다 적으면 거절해도 돼요.",
  },
  {
    q: "지연이자를 회사가 안 주면 어떻게 하나요?",
    a: "노동청에서 시정 지시를 내리고, 불응 시 검찰 송치까지 이어져요. 민사 소송에서도 지연이자 청구가 인정되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (14일 이내 지급 의무)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제17조 — 미지급 임금에 대한 지연이자 (연 20%)", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 임금체불 진정 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부 — 임금체불 관련 FAQ", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고, 어디에 어떻게 하나요?",
    description: "노동청 신고 장소, 준비 서류, 진행 절차를 한눈에 정리했어요.",
  },
  {
    slug: "퇴직금-지연이자-받기",
    title: "퇴직금 지연이자 받는 방법",
    description: "연 20% 지연이자를 실제로 받아내는 절차와 계산법을 알려드려요.",
  },
  {
    slug: "퇴직금-미지급-지급받는-방법",
    title: "퇴직금 미지급, 지금 당장 받는 방법",
    description: "내용증명부터 소액체당금까지, 가장 빠르게 퇴직금을 받는 방법이에요.",
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
          currentSlug="퇴직금-미지급-신고-절차-지연이자-청구"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 미지급 신고 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 미지급 신고 절차와<br />
        지연이자 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금도 안 주면서 이자까지 받을 수 있나요?&rdquo;<br />
        받을 수 있죠. <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제17조</a>에 따르면, 퇴직 후 14일이 지나도 퇴직금을 안 주면 그다음 날부터 <strong>연 20%</strong> 지연이자가 붙어요.
        노동청 진정을 넣을 때 원금과 이자를 한꺼번에 청구할 수 있고, 별도 절차가 필요 없죠.
        신고 절차, 이자 계산법, 노동청 vs 민사 소송 비교, 합의 대응까지 한번에 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>미지급 신고 절차가 어떻게 되나요?</H2>
      <p style={body}>
        사업장 소재지 관할 <strong>지방고용노동청</strong>에 &ldquo;임금체불 진정서&rdquo;를 제출하면 돼요. 방문·우편·온라인(<a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>) 세 가지 방법이 있고, 비용은 무료죠. 진정서에는 회사명, 대표자명, 미지급 금액, 근무 기간을 적어요.
      </p>
      <p style={body}>
        접수되면 근로감독관이 배정되고, 사업주에게 출석 요구서가 나가요. 보통 접수 후 1~2주 안에 첫 조사가 시작되죠. 양측의 주장을 듣고 사실관계를 확인하는 과정이에요.
      </p>
      <p style={body}>
        조사 결과 체불이 확인되면 근로감독관이 사업주에게 <strong>시정 지시</strong>를 내려요. 시정 기한 안에 지급하면 사건이 종결되고, 불응하면 <strong>검찰 송치</strong>로 넘어가죠. 접수부터 종결까지 평균 1~3개월이 걸려요.
      </p>

      <GreenBox title="진정서 필수 기재 항목">
        1. 사업장명(회사명)과 대표자 성명<br />
        2. 사업장 소재지와 연락처<br />
        3. 근무 기간(입사일~퇴직일)<br />
        4. 미지급 퇴직금 금액 + 지연이자 금액
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>신고와 동시에 지연이자도 청구할 수 있나요?</H2>
      <p style={body}>
        가능하죠. 진정서에 퇴직금 원금과 <strong>지연이자를 함께 기재</strong>하면 돼요. 별도의 서류나 추가 절차가 필요 없어요. 근로감독관이 체불 사실을 확인하면서 지연이자까지 포함해 시정 지시를 내려주죠.
      </p>
      <p style={body}>
        지연이자 기산점은 <strong>퇴직 후 15일째 되는 날</strong>이에요. 근로기준법 제36조가 14일 이내 지급을 의무화하고 있으니, 15일째부터 &ldquo;안 줬다&rdquo;는 게 확정되는 거죠. 이날부터 실제 지급일까지의 일수에 연 20%를 적용해요.
      </p>
      <p style={body}>
        주의할 점이 하나 있어요. 회사가 &ldquo;자금 사정이 어렵다&rdquo;며 지급 기한 연장에 동의해달라고 요청하는 경우가 있죠. 이때 서면으로 동의하면 동의한 기간 동안은 지연이자가 적용되지 않아요. 동의 전에 이자 금액을 꼼꼼히 따져보세요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>노동청 신고 vs 민사 소송, 뭐가 나은가요?</H2>
      <p style={body}>
        결론부터 말하면 <strong>노동청 진정을 먼저</strong> 하세요. 비용이 무료이고, 처리 기간도 1~3개월로 짧아요. 민사 소송은 인지대·송달료 등 비용이 들고, 6개월~1년 이상 걸리죠. 노동청에서 해결이 안 될 때 민사 소송을 검토해도 늦지 않아요.
      </p>
      <p style={body}>
        노동청 진정의 장점은 <strong>형사 처벌 압박</strong>이에요. 사업주가 시정 지시에 불응하면 검찰 송치되니까, 대부분 진정 단계에서 돈을 내놓으려 하죠. 반면 민사 소송은 이겨도 사업주가 재산을 숨기면 강제 집행이 어려울 수 있어요.
      </p>
      <p style={body}>
        다만 금액이 크거나 사업주가 악의적으로 버티는 경우에는 <strong>병행 전략</strong>이 효과적이에요. 노동청 진정과 민사 소송을 동시에 진행할 수 있거든요. 민사 소송에서 가압류 신청까지 하면 사업주가 재산을 처분하지 못하게 막을 수 있죠.
      </p>

      <BorderBox title="노동청 진정 vs 민사 소송 비교">
        <strong>노동청 진정</strong> — 무료, 1~3개월, 형사 처벌 압박<br />
        <strong>민사 소송</strong> — 유료(인지대+송달료), 6개월~1년, 강제 집행 가능<br />
        <strong>추천 순서</strong> — 노동청 먼저 → 안 되면 민사 소송
      </BorderBox>

      <Divider />

      {/* 섹션 4 */}
      <H2>지연이자 계산은 어떻게 하나요?</H2>
      <p style={body}>
        공식은 간단해요. <strong>미지급 퇴직금 x 20% x (지연 일수 / 365)</strong>이죠. 예를 들어 퇴직금 500만 원을 90일 동안 못 받았다면, 500만 x 20% x (90/365) = 약 24만 6,575원이에요.
      </p>
      <p style={body}>
        기산점을 정확히 알아야 계산이 맞아요. 퇴직일 다음 날부터 14일까지는 지급 기한이니 이자가 안 붙고, <strong>15일째</strong>부터 이자가 시작되죠. 만약 2026년 1월 1일에 퇴직했다면, 1월 16일부터 지연이자가 계산되는 거예요.
      </p>
      <p style={body}>
        퇴직금을 나눠서 받은 경우에는 각 미지급 잔액에 대해 일별로 이자를 계산해야 해요. 좀 복잡해지죠. 이때는 고용노동부 상담(1350)에서 정확한 금액을 안내받을 수 있어요. 진정서에 대략적인 금액만 적어도 근로감독관이 정확하게 재산정해주니 걱정 마세요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>신고 후 합의를 요청받으면 어떻게 하나요?</H2>
      <p style={body}>
        합의 제안을 받는 건 흔한 일이에요. 사업주 입장에서는 검찰 송치보다 합의가 나으니까요. 중요한 건 <strong>합의 금액이 적절한지</strong> 따져보는 거예요. 퇴직금 원금 + 지연이자를 계산해보고, 그보다 적은 금액이면 거절해도 돼요.
      </p>
      <p style={body}>
        합의할 때 반드시 <strong>서면으로</strong> 남기세요. 합의서에 지급 금액, 지급 기한, 미이행 시 조치를 명확히 적어야 해요. 구두 합의는 나중에 &ldquo;그런 적 없다&rdquo;고 뒤집힐 수 있거든요. 근로감독관 앞에서 작성하면 더 안전하죠.
      </p>
      <p style={body}>
        합의 후에도 약속한 날짜에 입금이 안 되면 다시 진정을 넣을 수 있어요. 이미 합의를 어긴 상태이기 때문에 근로감독관이 바로 시정 지시나 검찰 송치로 넘어가죠. 사업주가 한 번 약속을 어기면 두 번째는 훨씬 불리해지니, 합의서를 꼭 챙겨두세요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당돼요. 노동청에 퇴직금 원금 + 지연이자를 함께 청구하세요."
        partialMatchText="일부만 해당돼요. 고용노동부(1350)에 상담을 받아보면 방향을 잡을 수 있어요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        미지급 신고와 지연이자 청구에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
