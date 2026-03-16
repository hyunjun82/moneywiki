"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사한 지 14일이 넘었는데 퇴직금이 아직 안 들어왔어요" },
  { id: "c2", label: "회사가 지급 시기를 계속 미루고 있어요" },
  { id: "c3", label: "지급 기한 연장에 동의한 적이 없어요" },
  { id: "c4", label: "1년 이상 근무했고 퇴직금 대상이에요" },
];

const CHECKLIST = [
  "퇴사일 확인 — 근로계약서, 사직서, 퇴직증명서 등으로 정확한 날짜 파악",
  "14일 기한 계산 — 퇴사일 다음 날부터 14일째 되는 날이 지급 마감일",
  "지급 여부 확인 — 통장 입금 내역 또는 IRP 계좌 이체 내역 점검",
  "내용증명 발송 — 기한 초과 시 회사에 지급 요청 내용증명 우편 발송",
  "노동청 신고 준비 — 근로계약서, 급여명세서, 퇴직증명서 사본 확보",
];

const FAQS = [
  {
    q: "퇴직금 지급 기한이 정확히 언제부터 언제까지인가요?",
    a: "퇴사일 다음 날부터 세기 시작해서 14일째 되는 날까지예요. 근로기준법 제36조에 명시된 기한이죠.",
  },
  {
    q: "14일째 되는 날이 주말이면 어떻게 되나요?",
    a: "민법상 기간 계산에 따르면 마지막 날이 공휴일이면 그다음 영업일까지 유예돼요. 하지만 평일 기준 14일이 아니라 달력상 14일이에요.",
  },
  {
    q: "회사가 돈이 없다고 하면 기한이 연장되나요?",
    a: "자동 연장은 없어요. 당사자 간 합의가 있어야만 연장이 가능하죠. 합의 없이 넘기면 지연이자가 붙어요.",
  },
  {
    q: "퇴직금이 14일 넘게 안 들어오면 이자를 받을 수 있나요?",
    a: "받을 수 있죠. 근로기준법 시행령에 따라 연 20%의 지연이자가 14일 이후부터 자동으로 발생해요.",
  },
  {
    q: "퇴직금을 3년 넘게 안 받으면 어떻게 되나요?",
    a: "퇴직금 청구권의 소멸시효가 3년이에요. 퇴사일로부터 3년이 지나면 법적으로 청구할 수 없게 되니 빨리 움직여야 하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (14일 이내 지급 의무)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제18조 — 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 퇴직금 미지급 신고", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지급-기한-14일-원칙-지연이자",
    title: "퇴직금 14일 원칙과 지연이자",
    description: "14일 원칙을 어기면 연 20% 지연이자가 자동으로 붙어요.",
  },
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20% 계산법",
    description: "지연이자가 얼마나 되는지, 어떻게 계산하는지 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 노동청 신고 방법",
    description: "회사가 퇴직금을 안 주면 노동청에 신고할 수 있어요.",
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
          currentSlug="퇴직금-지급-기한"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한,<br />
        퇴사 후 언제까지 받아야 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴사한 지 2주가 넘었는데 퇴직금이 아직도 안 들어왔어요.&rdquo;<br />
        이런 상황이라면 회사가 법을 어기고 있는 거예요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 퇴직금을 포함한 모든 금품을 <strong>퇴사일로부터 14일 이내</strong>에 지급하라고 못 박아뒀죠.
        이 기한을 넘기면 <strong>연 20%</strong>의 지연이자가 붙고, 노동청 신고까지 가능해요.
        지급 기한의 정확한 기준, 기한 초과 시 대응법, 신고 절차를 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 지급 기한이 법으로 정해져 있나요?</H2>
      <p style={body}>
        네, 법으로 정해져 있어요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>가 &ldquo;사용자는 근로자가 사망 또는 퇴직한 경우에 그 지급 사유가 발생한 때부터 <strong>14일 이내</strong>에 임금, 보상금, 그 밖의 모든 금품을 지급하여야 한다&rdquo;고 규정하죠. 여기서 &ldquo;모든 금품&rdquo;에 퇴직금이 포함돼요.
      </p>
      <p style={body}>
        14일은 달력 기준이에요. 영업일이 아니라 토·일·공휴일도 포함해서 세죠. 퇴사일 다음 날부터 계산을 시작하고, 14일째 되는 날이 마감일이에요. 예를 들어 3월 1일에 퇴사했다면 3월 2일부터 세기 시작해서 3월 15일까지가 기한이죠.
      </p>
      <p style={body}>
        다만 &ldquo;특별한 사정&rdquo;이 있으면 당사자 간 합의로 기한을 연장할 수 있어요. 이건 어디까지나 <strong>쌍방 합의</strong>가 전제조건이에요. 회사가 일방적으로 &ldquo;다음 달에 줄게&rdquo;라고 하는 건 합의가 아니니까, 그 경우에는 14일이 넘는 순간부터 지연이자가 붙기 시작하죠.
      </p>

      <GreenBox title="핵심 요약">
        퇴직금 지급 기한 = <strong>퇴사일로부터 14일 이내</strong><br />
        근거 법령 = 근로기준법 제36조<br />
        위반 시 = 연 20% 지연이자 + 노동청 신고 가능
      </GreenBox>

      <SectionBadge>내 상황을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 회사가 지급 기한을 위반한 상태예요. 내용증명 발송 후 노동청 신고를 진행하세요."
        partialMatchText="일부만 해당돼요. 정확한 퇴사일과 기한을 다시 확인하고, 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>14일 이내 지급이 원칙인 이유는?</H2>
      <p style={body}>
        근로자 보호가 목적이에요. 퇴사 후에는 월급이 끊기니까 생활비가 급해지죠. 그래서 법이 &ldquo;14일 안에 다 정산하라&rdquo;고 강제하는 거예요. 이 규정은 1953년 근로기준법 제정 때부터 있었고, 지금까지 한 번도 바뀐 적 없는 핵심 조항이죠.
      </p>
      <p style={body}>
        14일이라는 기간은 회사가 퇴직금을 계산하고 지급을 처리하기에 충분한 시간으로 본 거예요. 평균임금 산정, 세금 공제, 계좌 이체 — 이 과정이 2주면 넉넉하다는 판단이죠. 실제로 대부분의 회사가 퇴사 후 1주일 안에 처리해요.
      </p>
      <p style={body}>
        이 기한을 못 지키면 <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제18조</a>에 따라 <strong>연 20%</strong>의 지연이자가 붙어요. 회사 입장에서는 퇴직금 원금에 이자까지 물어야 하니까, 법이 &ldquo;빨리 줘라&rdquo;고 압박하는 셈이죠. 3년을 넘기면 소멸시효가 완성돼서 청구 자체가 불가능해지니 근로자도 서둘러야 하고요.
      </p>

      <BorderBox title="퇴직연금(DB·DC형)도 14일 적용?">
        퇴직연금 DB형은 회사가 운용하므로 14일 이내 IRP로 이전해야 하죠.<br />
        DC형은 이미 근로자 계좌에 적립돼 있으니 별도 이전이 필요 없어요.<br />
        IRP 해지 후 실수령까지는 금융기관 처리 기간(2~3영업일)이 추가로 걸려요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>기한을 넘기면 어떤 불이익이 생기나요?</H2>
      <p style={body}>
        가장 직접적인 불이익은 <strong>지연이자</strong>예요. 14일이 지난 다음 날부터 미지급 퇴직금에 대해 연 20%의 이자가 붙기 시작하죠. 퇴직금이 500만 원이라면 1년 미지급 시 이자만 100만 원이에요. 이건 회사가 &ldquo;몰랐다&rdquo;고 해도 면제되지 않아요.
      </p>
      <p style={body}>
        형사처벌도 가능해요. 근로기준법 제109조에 따르면 금품 미청산은 <strong>3년 이하 징역 또는 3,000만 원 이하 벌금</strong>에 해당하죠. 실무적으로는 노동청 진정 → 시정지시 → 불이행 시 검찰 송치 순서로 진행돼요. 대부분 시정지시 단계에서 회사가 지급하긴 하지만, 끝까지 안 주면 형사 절차까지 가죠.
      </p>
      <p style={body}>
        근로자 입장에서 주의할 점은 <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>소멸시효 3년</a>이에요. 퇴사일로부터 3년이 지나면 퇴직금 청구권 자체가 사라져요. 지연이자를 받을 권리도 함께 소멸되죠. &ldquo;나중에 받아야지&rdquo; 하고 미루다가 3년이 넘으면 법적으로 한 푼도 못 받게 돼요.
      </p>

      <GreenBox title="기한 초과 시 불이익 정리">
        1. <strong>지연이자</strong> — 14일 이후부터 연 20% 자동 발생<br />
        2. <strong>형사처벌</strong> — 3년 이하 징역 또는 3,000만 원 이하 벌금<br />
        3. <strong>소멸시효</strong> — 퇴사일로부터 3년 이내 청구하지 않으면 권리 소멸
      </GreenBox>

      <Divider />

      {/* 섹션 4 */}
      <H2>퇴직금이 늦게 들어온다면 어떻게 하나요?</H2>
      <p style={body}>
        먼저 회사에 직접 연락해서 지급 일정을 물어보세요. 단순 행정 지연인 경우도 있거든요. 담당자가 &ldquo;이번 주 안에 처리하겠다&rdquo;고 하면 며칠 더 기다려볼 수 있죠. 이때 통화 내용이나 카톡은 꼭 캡처해두세요. 나중에 신고할 때 증거가 돼요.
      </p>
      <p style={body}>
        구두 요청으로 해결이 안 되면 <strong>내용증명</strong>을 보내세요. 우체국에서 발송할 수 있고, 내용은 &ldquo;퇴직금 ○○원을 ○일까지 지급해주세요. 미지급 시 노동청 신고 및 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a> 청구를 진행하겠습니다&rdquo; 정도면 충분하죠. 내용증명 자체가 법적 효력이 있는 건 아니지만, 회사에 심리적 압박을 주는 효과가 커요.
      </p>
      <p style={body}>
        내용증명 이후에도 반응이 없으면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동청 신고</a>로 넘어가세요. 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로 접수할 수 있고, 관할 고용노동청에 직접 방문해도 돼요. 신고 후 근로감독관이 회사에 출석 요구를 하면 대부분 이 단계에서 퇴직금을 지급하죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>지급 기한 위반을 신고하는 방법은?</H2>
      <p style={body}>
        신고 경로는 두 가지예요. 첫째, <strong>고용노동부 민원마당</strong>(minwon.moel.go.kr)에서 &ldquo;임금체불 진정&rdquo;으로 접수하는 방법이 있죠. 회원 가입 후 &ldquo;민원 신청 → 임금체불 → 퇴직금 미지급&rdquo;을 선택하고, 근로계약서·급여명세서·퇴직증명서를 첨부하면 돼요.
      </p>
      <p style={body}>
        둘째, 관할 고용노동청에 <strong>직접 방문</strong>해서 접수할 수 있어요. 회사 소재지 기준으로 관할이 정해지죠. 방문 시에는 신분증, 근로계약서, 급여명세서, 퇴직증명서를 챙겨가세요. 현장에서 진정서를 작성하면 바로 접수돼요.
      </p>
      <p style={body}>
        접수 후 처리 절차는 이래요. 근로감독관이 회사에 출석 요구 → 사실 조사 → 시정지시(보통 접수 후 2~4주) → 회사가 이행하면 종결, 불이행하면 검찰 송치까지 가죠. 시정지시에서 끝나는 경우가 대부분이지만, 회사가 폐업 상태이거나 대표가 연락 두절이면 체당금 제도(<a href="/w/회사-폐업-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>회사 폐업 퇴직금</a> 참고)를 활용해야 해요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 고용노동부 고객센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
