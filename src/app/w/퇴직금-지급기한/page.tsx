"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사한 지 14일이 넘었어요" },
  { id: "c2", label: "퇴직금이 아직 입금되지 않았어요" },
  { id: "c3", label: "회사와 지급 기한 연장 합의를 하지 않았어요" },
  { id: "c4", label: "근로계약서나 급여명세서를 갖고 있어요" },
];

const CHECKLIST = [
  "퇴사일 기준 14일 경과 확인 — 달력 기준, 주말·공휴일 포함",
  "회사에 지급 요청 연락 — 전화 또는 이메일(기록 남기기)",
  "내용증명 발송 — 퇴직금 + 지연이자 지급 요청",
  "노동청 진정 접수 — 민원마당 온라인 또는 관할 노동청 방문",
  "소멸시효 확인 — 퇴사일로부터 3년 이내인지 점검",
];

const FAQS = [
  {
    q: "14일은 영업일 기준인가요?",
    a: "아니에요. 달력 기준이죠. 토·일·공휴일도 포함해서 14일을 세요. 영업일 기준이 아니라서 생각보다 빨리 기한이 도래해요.",
  },
  {
    q: "퇴직금이 IRP로 들어가는 경우에도 14일인가요?",
    a: "맞아요. IRP 계좌로 이전하는 경우에도 14일 이내에 이전을 완료해야 하죠. IRP 해지 후 실수령까지는 금융기관 처리 시간이 추가로 걸려요.",
  },
  {
    q: "회사가 연락이 안 돼요. 어떻게 하나요?",
    a: "내용증명을 회사 등기부상 주소로 보내세요. 등기부등본은 인터넷등기소(iros.go.kr)에서 발급받을 수 있어요. 이후 노동청에 진정을 넣으면 근로감독관이 직접 회사에 연락해요.",
  },
  {
    q: "소규모 회사인데도 14일 원칙이 적용되나요?",
    a: "5인 미만 사업장이라도 퇴직금 지급 의무와 14일 원칙은 동일하게 적용돼요. 사업장 규모와 무관하죠.",
  },
  {
    q: "퇴직금을 빨리 받으려면 가장 효과적인 방법이 뭔가요?",
    a: "내용증명 발송 → 7일 내 반응 없으면 노동청 진정이 가장 빨라요. 시정지시가 나오면 대부분 2~4주 안에 해결되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 14일 이내", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제18조 — 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법시행령" },
      { label: "근로기준법 제109조 — 벌칙 (3년 이하 징역, 3,000만 원 이하 벌금)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 임금체불 진정", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부 고객센터 — 1350", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 법적 기준",
    description: "14일 기한의 법적 근거와 위반 시 불이익을 정리했어요.",
  },
  {
    slug: "퇴직금-지연이자-받기",
    title: "퇴직금 지연이자 받는 방법",
    description: "연 20% 지연이자를 실제로 받는 절차를 안내해요.",
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
          currentSlug="퇴직금-지급기한"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급기한,<br />
        14일 안에 안 들어오면?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;그만둔 지 보름이 넘었는데 퇴직금 소식이 없어요.&rdquo;<br />
        그렇다면 회사가 법을 어기고 있는 거예요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 퇴직금을 포함한 모든 금품을 퇴사일로부터 <strong>14일 안에</strong> 지급하도록 정해뒀죠.
        14일이 지나면 <strong>연 20%</strong> 지연이자가 붙고, 노동청에 신고할 수 있어요.
        지급기한의 정확한 계산법부터 빠르게 받는 실전 방법까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 지급기한이 14일인 이유는?</H2>
      <p style={body}>
        근로자 보호를 위해서예요. 퇴사하면 월급이 끊기니까 생활이 급박해지죠. 법이 &ldquo;14일 안에 다 정산하라&rdquo;고 못 박은 건, 근로자가 최소한의 시간 안에 생계를 이어갈 수 있도록 하기 위해서예요. 이 규정은 1953년 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a> 제정 때부터 존재했죠.
      </p>
      <p style={body}>
        14일이라는 기간은 회사가 퇴직금을 산정하고 세금을 공제한 뒤 이체까지 마치기에 충분한 시간이에요. 평균임금을 계산하고, 퇴직소득세를 원천징수하고, 계좌로 보내는 과정이 2주면 넉넉하다고 본 거죠. 실제로 대기업이나 중견기업은 퇴사 후 1주일 안에 처리하는 경우가 많아요.
      </p>
      <p style={body}>
        기한을 못 지키면 벌칙이 따라와요. <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제18조</a>에 따른 <strong>연 20% 지연이자</strong>, 그리고 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제109조</a>에 따른 <strong>3년 이하 징역 또는 3,000만 원 이하 벌금</strong>이죠. 회사 입장에서 퇴직금을 미루는 건 경제적·법적 리스크가 큰 행위예요.
      </p>

      <GreenBox title="14일 기한 핵심">
        근거 = 근로기준법 제36조<br />
        계산 = 퇴사일 다음 날부터 달력 기준 14일<br />
        위반 시 = 지연이자 연 20% + 형사처벌 가능
      </GreenBox>

      <SectionBadge>내 상황을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 회사가 법을 어기고 있는 상태예요. 내용증명부터 발송하세요."
        partialMatchText="일부만 해당돼요. 퇴사일과 기한을 정확히 확인한 뒤 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>14일이 지나도 안 오면 어떻게 해야 하나요?</H2>
      <p style={body}>
        먼저 회사에 연락해보세요. 담당자에게 전화하거나 이메일을 보내서 &ldquo;퇴직금 지급 일정이 어떻게 되나요?&rdquo;라고 물어보는 거예요. 이때 통화 녹음이나 이메일 내용을 <strong>반드시 보관</strong>하세요. 나중에 신고할 때 &ldquo;회사에 요청했지만 미지급&rdquo;이라는 증거가 돼요.
      </p>
      <p style={body}>
        회사가 반응이 없거나 &ldquo;기다려달라&rdquo;만 반복하면 <strong>내용증명</strong>을 보내세요. 우체국에서 발송하고, 내용은 &ldquo;퇴직금 ○○원과 지연이자를 ○일까지 지급해주세요. 미이행 시 노동청 진정 및 법적 조치를 진행하겠습니다&rdquo;라고 쓰면 돼요. 비용은 5,000원 안팎이에요.
      </p>
      <p style={body}>
        내용증명 후 7~10일을 기다려도 지급이 안 되면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동청 진정</a>을 접수하세요. 고용노동부 민원마당(minwon.moel.go.kr)에서 &ldquo;임금체불&rdquo;로 접수하면 되고, 근로감독관이 회사에 시정지시를 내려요. 이 단계에서 대부분 해결되죠.
      </p>

      <BorderBox title="연락조차 안 될 때">
        회사 대표나 담당자가 연락을 피하면 등기부등본에 적힌 주소로 내용증명을 보내세요.<br />
        등기부등본은 인터넷등기소(iros.go.kr)에서 발급받을 수 있어요.<br />
        이후 노동청에 접수하면 근로감독관이 직접 회사에 출석 요구를 해요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>지연이자를 청구하는 방법은?</H2>
      <p style={body}>
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a>는 퇴직금 원금과 함께 청구하면 돼요. 내용증명에 &ldquo;퇴직금 ○○원 + 지연이자 ○○원(연 20%, ○일분)을 합산하여 지급해주세요&rdquo;라고 적으세요. 구체적인 금액을 명시하면 회사가 더 진지하게 받아들이죠.
      </p>
      <p style={body}>
        계산은 간단해요. <strong>미지급 퇴직금 x 20% x (지연일수 / 365)</strong>이면 끝이에요. 예를 들어 퇴직금 800만 원이 45일 늦어졌다면 → 800만 원 x 0.2 x (45/365) = 약 19만 7,260원이 지연이자예요. 단리 계산이니까 복잡하지 않죠.
      </p>
      <p style={body}>
        노동청 진정 시에도 지연이자를 함께 청구할 수 있어요. 진정서 &ldquo;청구 내용&rdquo;란에 퇴직금 원금과 지연이자를 각각 적으세요. 근로감독관의 시정지시에 지연이자 지급도 포함시킬 수 있거든요. 다만 노동청이 지연이자를 강제하기 어려운 경우도 있어서, 확실하게 받으려면 민사소송을 병행하는 게 좋아요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>노동청 신고 절차는 어떻게 되나요?</H2>
      <p style={body}>
        온라인과 오프라인 두 가지 방법이 있어요. 온라인은 고용노동부 민원마당(minwon.moel.go.kr)에서 &ldquo;민원 신청 → 임금체불 → 퇴직금 미지급&rdquo;을 선택하고, 근로계약서·급여명세서·퇴직증명서를 첨부하면 돼요. 오프라인은 회사 소재지 관할 고용노동청에 직접 가서 진정서를 작성하는 방법이죠.
      </p>
      <p style={body}>
        접수 후 처리 과정은 이래요. 근로감독관이 사건을 배정받고 → 회사에 출석 요구 → 사실 확인 → <strong>시정지시</strong>(보통 접수 후 2~4주) → 이행하면 종결, 불이행하면 검찰 송치예요. 시정지시 단계에서 90% 이상 해결되니까 대부분 여기서 끝나요.
      </p>
      <p style={body}>
        검찰 송치까지 가면 사업주에게 <strong>3년 이하 징역 또는 3,000만 원 이하 벌금</strong>이 부과될 수 있어요. 이 압박 때문에 송치 직전에 퇴직금을 지급하는 경우가 많죠. 회사가 폐업 상태라면 노동청 진정과 별개로 <strong>체당금</strong>을 신청해야 해요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>빠르게 받기 위한 실전 방법은?</H2>
      <p style={body}>
        가장 빠른 루트는 &ldquo;내용증명 → 7일 대기 → 노동청 진정&rdquo;이에요. 내용증명만 보내도 회사가 놀라서 바로 지급하는 경우가 꽤 많죠. 내용증명에 &ldquo;지연이자 ○○원&rdquo;을 구체적으로 적으면 효과가 더 커요. 회사 입장에서 &ldquo;빨리 주는 게 돈이 덜 나간다&rdquo;는 걸 깨닫거든요.
      </p>
      <p style={body}>
        노동청 진정을 넣을 때 <strong>접수 당일 근로감독관 배정을 요청</strong>하세요. &ldquo;긴급한 생계 문제&rdquo;라고 설명하면 우선 배정이 가능한 경우가 있어요. 방문 접수가 온라인 접수보다 처리가 빠른 편이니, 시간이 되면 직접 가는 게 좋죠.
      </p>
      <p style={body}>
        최종 무기는 <strong>가압류</strong>예요. 회사 예금 계좌나 매출채권에 가압류를 걸면 회사가 자산을 빼돌릴 수 없게 돼요. 가압류는 법원에 신청하는 건데, 대한법률구조공단(klac.or.kr)에서 무료 법률 지원을 받을 수 있죠. 소멸시효 3년 이내라면 언제든 활용할 수 있는 방법이에요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급기한에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 고용노동부 고객센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
