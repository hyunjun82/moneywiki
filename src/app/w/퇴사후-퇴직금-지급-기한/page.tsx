"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사일로부터 14일이 넘었는데 퇴직금이 안 왔어요" },
  { id: "c2", label: "회사에 연락했지만 뚜렷한 답변이 없어요" },
  { id: "c3", label: "기한 연장에 동의한 적이 없어요" },
  { id: "c4", label: "근로계약서, 급여명세서를 갖고 있어요" },
];

const CHECKLIST = [
  "정확한 퇴사일 확인 — 퇴직증명서 또는 사직서 접수일",
  "14일째 날짜 계산 — 퇴사일 다음 날부터 달력 기준 14일",
  "입금 내역 확인 — 본인 계좌 또는 IRP 계좌 이체 내역",
  "내용증명 발송 — 기한 초과 시 퇴직금 + 지연이자 지급 요청",
  "노동청 진정서 작성 — 근로계약서, 급여명세서, 퇴직증명서 첨부",
];

const FAQS = [
  {
    q: "퇴사일이 정확히 언제인가요? 마지막 출근일인가요?",
    a: "마지막 근무일이에요. 연차 소진 기간이 포함된 경우에는 연차 마지막 날이 퇴사일이 되죠. 퇴직증명서에 적힌 날짜가 가장 정확해요.",
  },
  {
    q: "14일을 세는데 첫날도 포함하나요?",
    a: "아니에요. 퇴사일 다음 날부터 세기 시작해요. 3월 1일 퇴사 → 3월 2일이 1일째 → 3월 15일이 14일째(마감일)죠.",
  },
  {
    q: "퇴직금이 조금이라도 들어왔으면 기한 위반이 아닌가요?",
    a: "일부만 지급하면 미지급 잔액에 대해 기한 위반이에요. 잔액에 대해서만 지연이자가 붙죠.",
  },
  {
    q: "퇴직연금(DC형)인데 14일이 적용되나요?",
    a: "DC형은 이미 근로자 계좌에 적립돼 있어서 별도 이전이 필요 없어요. 다만 DB형이라면 14일 이내에 IRP로 이전해야 하죠.",
  },
  {
    q: "노동청 신고와 민사소송 중 뭘 먼저 해야 하나요?",
    a: "노동청 진정을 먼저 하는 게 비용 부담이 없어서 유리해요. 시정지시로 안 되면 그때 소송을 검토하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 14일 이내", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제18조 — 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지급기한",
    title: "퇴직금 지급기한 14일 원칙",
    description: "14일 기한의 법적 근거와 빠르게 받는 실전 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-지급받는-방법",
    title: "퇴직금 미지급 시 받는 방법",
    description: "내용증명부터 소송까지, 단계별 대응 절차를 안내해요.",
  },
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20%",
    description: "지연이자가 얼마나 되는지, 어떻게 계산하는지 정리했어요.",
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
          currentSlug="퇴사후-퇴직금-지급-기한"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴사 후 퇴직금 지급 기한,<br />
        며칠 기다려야 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴사하고 나서 퇴직금이 언제 들어오는지 궁금하죠?&rdquo;<br />
        답은 <strong>14일</strong>이에요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>가 퇴직금을 포함한 모든 금품을 퇴사일로부터 14일 이내에 지급하라고 정해뒀거든요.
        이 기한을 넘기면 <strong>연 20%</strong>의 지연이자가 붙고, 노동청 신고까지 가능해요.
        14일 계산법, 안 들어올 때 대응법, 노동청 신고와 소송 비교까지 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴사 후 퇴직금은 언제 들어오나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>가 정한 기한은 <strong>퇴사일로부터 14일</strong>이에요. 이 기간 안에 퇴직금, 미지급 월급, 연차수당 등 모든 금품이 정산돼야 하죠. 대부분의 회사는 퇴사 후 1주일 안에 처리하지만, 법적 마감은 14일째 되는 날이에요.
      </p>
      <p style={body}>
        지급 방식은 두 가지예요. <strong>퇴직금을 직접 계좌로 받는 경우</strong>와 <strong>IRP(개인형 퇴직연금) 계좌로 이전받는 경우</strong>죠. 퇴직연금 DB형이라면 회사가 IRP로 이전해야 하고, 이 이전도 14일 안에 완료돼야 해요. IRP에서 실수령 계좌로 인출하는 건 별도 절차이니까 따로 시간이 걸리죠.
      </p>
      <p style={body}>
        당사자 간 합의가 있으면 14일을 넘겨서 지급할 수 있어요. 하지만 이건 어디까지나 근로자가 <strong>자발적으로 동의</strong>한 경우에만 유효해요. 회사가 일방적으로 &ldquo;늦어질 수 있다&rdquo;고 통보하는 건 합의가 아니니까, 14일 원칙이 그대로 적용돼요.
      </p>

      <GreenBox title="퇴사 후 퇴직금 지급 일정">
        법정 기한 = 퇴사일로부터 <strong>14일 이내</strong> (달력 기준)<br />
        실제 지급 = 대부분 퇴사 후 5~10일 안에 처리<br />
        기한 초과 시 = 연 20% 지연이자 발생 + 노동청 신고 가능
      </GreenBox>

      <SectionBadge>내 상황을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 회사가 법을 어기고 있는 상태예요. 내용증명을 발송하고 노동청 진정을 준비하세요."
        partialMatchText="일부만 해당돼요. 정확한 퇴사일과 기한을 다시 확인한 뒤 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>14일 기한 계산은 어떻게 하나요?</H2>
      <p style={body}>
        퇴사일 다음 날부터 세기 시작해요. 민법상 기간 계산 원칙에 따르면 &ldquo;초일 불산입&rdquo;이거든요. 쉽게 말해 퇴사 당일은 빼고, 그다음 날이 1일째예요. 3월 1일에 퇴사했다면 3월 2일이 1일째, 3월 15일이 14일째(마감일)가 되죠.
      </p>
      <p style={body}>
        14일은 <strong>달력 기준</strong>이에요. 영업일이 아니라 토·일·공휴일도 포함해서 세요. &ldquo;주말 빼면 아직 안 됐잖아&rdquo;라는 회사 측 변명은 법적으로 통하지 않죠. 다만 14일째가 공휴일이면 민법 기간 계산에 따라 그다음 영업일까지 유예되는 해석이 있어요.
      </p>
      <p style={body}>
        퇴사일이 모호한 경우가 가끔 있어요. 연차 소진 기간이 있으면 마지막 연차일이 퇴사일이 되고, 수습 기간 중 퇴사하면 수습 종료 통보일이 기준이죠. 가장 정확한 건 <strong>퇴직증명서</strong>에 적힌 퇴사일이에요. 회사에 퇴직증명서 발급을 요청하세요.
      </p>

      <BorderBox title="기한 계산 예시">
        퇴사일: 3월 10일 (화요일)<br />
        1일째: 3월 11일 (수) → 14일째: 3월 24일 (화) = 지급 마감일<br />
        3월 25일(수)부터 지연이자(연 20%) 발생
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>퇴직금이 안 들어올 때 먼저 할 일은?</H2>
      <p style={body}>
        1순위는 <strong>회사에 연락</strong>하는 거예요. 인사팀이나 경리팀에 &ldquo;퇴직금 언제 나오나요?&rdquo;라고 물어보세요. 단순 행정 착오일 수 있거든요. 이때 전화 녹음이나 카톡·이메일 내용을 꼭 캡처해두세요. 나중에 &ldquo;요청했지만 미지급&rdquo;이라는 증거가 되죠.
      </p>
      <p style={body}>
        회사가 &ldquo;기다려달라&rdquo;고만 하거나 연락이 안 되면 <strong>내용증명</strong>을 보내세요. 내용증명은 우체국에서 보내는 공식 우편이에요. &ldquo;퇴직금 ○○원과 지연이자를 ○일까지 지급하라. 미이행 시 노동청 진정 및 법적 조치를 진행하겠다&rdquo;라고 쓰면 충분하죠.
      </p>
      <p style={body}>
        내용증명을 받고도 7~10일 안에 지급하지 않으면 <a href="/w/퇴직금-미지급-지급받는-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동청 진정</a>으로 넘어가세요. 비용이 들지 않고, 근로감독관이 회사에 시정지시를 내리니까 가장 현실적인 방법이에요. 대부분 시정지시 단계에서 해결되죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>지연이자를 받으려면 어떻게 하나요?</H2>
      <p style={body}>
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a>는 14일 기한 다음 날부터 자동으로 발생해요. 이율은 <strong>연 20%</strong>이고, 미지급 퇴직금 원금에 대해서만 적용되는 단리 방식이죠. 공식은 &ldquo;미지급액 x 20% x (지연일수 / 365)&rdquo;이에요.
      </p>
      <p style={body}>
        받으려면 직접 청구해야 해요. 내용증명에 &ldquo;퇴직금 원금 ○○원 + 지연이자 ○○원&rdquo;을 명시하거나, 노동청 진정서에 지연이자 항목을 추가하면 되죠. 구체적인 금액을 적으면 회사가 &ldquo;빨리 줘야 이자가 안 불어난다&rdquo;는 걸 깨달아서 지급 속도가 빨라져요.
      </p>
      <p style={body}>
        회사가 지연이자 지급을 거부하면 <strong>민사소송</strong>으로 강제할 수 있어요. 청구 금액이 3,000만 원 이하이면 소액심판(1회 변론으로 판결)으로 빠르게 진행할 수 있고, 대한법률구조공단(klac.or.kr)에서 무료 법률 지원을 받을 수 있죠. 소멸시효 3년 이내라면 청구권은 유효해요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>노동청 신고와 민사 소송 중 뭐가 나을까요?</H2>
      <p style={body}>
        <strong>노동청 진정을 먼저</strong> 하는 게 좋아요. 비용이 들지 않고, 절차가 간단하고, 처리 속도도 빠르거든요. 접수부터 시정지시까지 보통 2~4주면 돼요. 시정지시에 회사가 응하면 퇴직금 원금은 물론 지연이자까지 받을 수 있죠.
      </p>
      <p style={body}>
        노동청으로 해결이 안 되는 경우에 <strong>민사소송</strong>을 검토하세요. 회사가 시정지시를 무시하거나, 지연이자 지급을 끝까지 거부할 때 필요하죠. 소액심판(3,000만 원 이하)이면 변호사 없이도 혼자 진행할 수 있어요. 대한법률구조공단에서 서류 작성을 도와주기도 하고요.
      </p>
      <p style={body}>
        둘을 동시에 진행할 수도 있어요. 노동청 진정은 형사 절차(사업주 처벌)에 초점이 맞춰져 있고, 민사소송은 금전 회수에 초점이 맞춰져 있거든요. 퇴직금 액수가 크거나 회사 재정이 불안하다면 노동청 진정과 민사소송을 <strong>병행</strong>하는 게 가장 효과적이에요. 소멸시효 3년을 넘기지 않도록 주의하세요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴사 후 퇴직금 지급 기한에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 고용노동부 고객센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
