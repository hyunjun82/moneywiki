"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "법정 사유에 해당하는 상황이에요" },
  { id: "c2", label: "증빙서류(계약서, 진단서 등)를 확보했어요" },
  { id: "c3", label: "신청서에 사유·금액·서류 목록을 적을 준비가 됐어요" },
  { id: "c4", label: "회사 인사팀에 제출할 수 있어요" },
];

const CHECKLIST = [
  "신청자 정보 — 이름, 사번, 부서, 연락처",
  "정산 사유 — 법정 사유 중 어디에 해당하는지 명시",
  "정산 희망 금액 — 전액 또는 일부 금액 기재",
  "증빙서류 목록 — 첨부하는 서류 종류와 매수",
  "신청일자 및 서명 — 반드시 본인이 직접 서명",
];

const FAQS = [
  {
    q: "신청서 양식이 법으로 정해져 있나요?",
    a: "법정 양식은 없어요. 회사 자체 양식이 있으면 그걸 쓰고, 없으면 자유 양식으로 작성해도 돼요. 핵심 항목만 빠짐없이 적으면 되죠.",
  },
  {
    q: "회사에 양식이 없다면 어디서 구하나요?",
    a: "고용노동부 홈페이지에 참고용 서식이 올라와 있어요. 인터넷에서 '퇴직금 중간정산 신청서 양식'으로 검색해도 다양한 양식을 찾을 수 있죠.",
  },
  {
    q: "이메일로 제출해도 되나요?",
    a: "회사 내부 규정에 따라 달라요. 서면 제출이 원칙이지만, 이메일 제출을 허용하는 곳도 있죠. 인사팀에 미리 확인하세요.",
  },
  {
    q: "신청서를 잘못 작성했으면 어떻게 하나요?",
    a: "인사팀에 보완 제출이 가능해요. 정정 사항을 명시한 수정 신청서를 다시 내면 되죠. 원본은 인사팀에서 보관하니 사본을 따로 보관해두세요.",
  },
  {
    q: "신청서 제출하면 바로 돈이 나오나요?",
    a: "바로 나오지는 않아요. 인사팀이 서류를 검토하고 평균임금을 산정한 뒤 정산 금액을 확정하죠. 보통 2주~1개월 정도 걸려요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제8조 — 퇴직금 중간정산", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 서식 자료실", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산-신청-법정-사유-절차",
    title: "중간정산 법정 사유와 절차",
    description: "법정 사유 목록과 신청 절차를 단계별로 안내해요.",
  },
  {
    slug: "퇴직금-중간정산-사유별-증빙서류",
    title: "사유별 증빙서류 목록",
    description: "주택 구입, 질병, 천재지변 등 사유별 서류를 정리했어요.",
  },
  {
    slug: "퇴직금-중간정산-조건",
    title: "중간정산 조건",
    description: "어떤 경우에 중간정산이 가능한지 상세히 안내해요.",
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
          currentSlug="퇴직금-중간정산-신청서"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 신청서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 신청서,<br />
        어떻게 작성하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;신청서를 써야 하는데, 양식을 어디서 구하고 뭘 적어야 하는지 모르겠어요.&rdquo;<br />
        법정 양식은 따로 없어요. 회사 자체 양식을 쓰거나, 없으면 자유 양식으로 작성하면 되죠.
        핵심은 사유, 금액, 증빙서류 목록을 빠짐없이 적는 거예요.
        신청서 구하는 법부터 작성 요령, 제출 후 과정까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>중간정산 신청서 양식은 어디서 구하나요?</H2>
      <p style={body}>
        가장 먼저 확인할 곳은 회사 인사팀이에요. 대기업이나 중견기업은 자체 양식을 가지고 있는 경우가 많죠. 인사팀에 &ldquo;퇴직금 중간정산 신청서 양식이 있나요?&rdquo;라고 물어보면 바로 받을 수 있어요.
      </p>
      <p style={body}>
        회사에 양식이 없다면 고용노동부 홈페이지에서 참고용 서식을 내려받을 수 있어요. 인터넷에 &ldquo;퇴직금 중간정산 신청서 양식&rdquo;으로 검색하면 워드·한글 파일 형태로 다양한 양식이 나오죠.
      </p>
      <p style={body}>
        양식이 전혀 없다면 자유 양식으로 직접 작성해도 법적으로 문제없어요. A4 용지에 필수 항목(신청자 정보, 사유, 금액, 증빙 목록, 서명)만 담으면 되죠. 중요한 건 양식이 아니라 내용이에요.
      </p>

      <GreenBox title="신청서 구하는 3가지 방법">
        1. <strong>회사 인사팀</strong> — 자체 양식 확인<br />
        2. <strong>고용노동부 홈페이지</strong> — 참고용 서식 다운로드<br />
        3. <strong>자유 양식</strong> — 필수 항목만 담아 직접 작성
      </GreenBox>

      <SectionBadge>신청 준비 상태 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="준비가 됐네요. 신청서를 작성해서 인사팀에 제출하세요."
        partialMatchText="일부 준비가 부족해요. 사유 확인과 증빙서류부터 갖추세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>신청서에 꼭 들어가야 할 내용은?</H2>
      <p style={body}>
        <strong>신청자 정보</strong>가 첫 번째예요. 이름, 사번, 소속 부서, 연락처를 적어야 인사팀에서 본인 확인이 가능하죠. 사번이 없는 소규모 회사라면 주민등록번호 앞자리와 입사일을 기재하면 돼요.
      </p>
      <p style={body}>
        <strong>정산 사유</strong>를 구체적으로 적어야 해요. 단순히 &ldquo;주택 구입&rdquo;이라고만 쓰지 말고, &ldquo;무주택자로서 아파트 매수 계약을 체결했으며, 잔금 납부를 위해 퇴직금 중간정산을 신청합니다&rdquo;처럼 상황을 설명하세요.
      </p>
      <p style={body}>
        <strong>정산 희망 금액</strong>과 <strong>증빙서류 목록</strong>도 빠지면 안 돼요. 전액 정산인지 일부만 정산인지 명시하고, 첨부하는 서류의 종류와 매수를 적으세요. 마지막에 날짜와 본인 서명을 하면 신청서가 완성되죠.
      </p>

      <BorderBox title="자유 양식 작성 팁">
        제목: 퇴직금 중간정산 신청서<br />
        본문 순서: 신청자 정보 → 정산 사유 → 희망 금액 → 증빙서류 목록<br />
        하단: 신청일자 + 본인 서명 (도장이나 전자서명도 가능)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>신청서 작성 시 주의할 점은?</H2>
      <p style={body}>
        사유와 증빙서류의 <strong>내용이 일치</strong>해야 해요. 신청서에는 &ldquo;주택 구입&rdquo;이라고 적었는데 증빙으로 전세계약서를 내면 불일치로 보완 요청이 올 수 있죠. 사유와 서류가 정확히 맞는지 꼭 확인하세요.
      </p>
      <p style={body}>
        <strong>금액 기재</strong>에도 신경 쓰세요. &ldquo;전액 정산&rdquo;이라고 적으면 현재까지 쌓인 퇴직금 전부를 정산받겠다는 뜻이에요. 일부만 필요하다면 구체적인 금액을 적되, 실제 퇴직금보다 많이 적으면 안 되죠.
      </p>
      <p style={body}>
        신청서 사본을 반드시 보관해두세요. 제출 후 분쟁이 생기거나, 세금 정산할 때 기록이 필요할 수 있어요. 이메일로 제출했다면 발송 기록을, 서면이라면 사본에 수령 확인 도장을 받아두는 게 안전하죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>신청서 제출 후 과정은 어떻게 되나요?</H2>
      <p style={body}>
        인사팀이 신청서와 증빙서류를 검토해요. 법정 사유에 해당하는지, 서류가 충분한지를 확인하죠. 문제가 없으면 평균임금을 산정하고 정산 금액을 확정해요.
      </p>
      <p style={body}>
        금액이 확정되면 퇴직소득세를 계산해서 원천징수한 뒤 나머지를 지급하죠. 보통 서류 제출부터 입금까지 2주~1개월이 걸려요. 증빙 보완이 필요하면 그만큼 더 지연될 수 있고요.
      </p>
      <p style={body}>
        정산이 완료되면 회사가 <strong>중간정산 확인서</strong>를 발급해요. 이 서류는 나중에 퇴직할 때 최종 퇴직금 계산의 기산점을 증명하는 데 쓰이니까 꼭 보관하세요. 잃어버리면 근속연수 산정에 혼란이 생길 수 있어요.
      </p>

      <SectionBadge>신청서 필수 항목 체크</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 */}
      <H2>신청서 작성 실수를 예방하는 방법은?</H2>
      <p style={body}>
        <strong>인사팀에 미리 상담</strong>하는 게 가장 확실해요. &ldquo;이런 사유인데 어떤 서류가 필요한가요?&rdquo;라고 물어보면 맞춤 안내를 받을 수 있죠. 처음부터 정확히 준비하면 보완 과정 없이 한 번에 통과할 수 있어요.
      </p>
      <p style={body}>
        다른 사람의 <strong>작성 사례</strong>를 참고하는 것도 도움이 돼요. 인터넷에 올라온 작성 예시를 보면서 항목별로 어떻게 적는지 감을 잡을 수 있죠. 다만 사유와 금액은 본인 상황에 맞게 수정해야 해요.
      </p>
      <p style={body}>
        제출 전에 <strong>체크리스트</strong>로 한 번 더 점검하세요. 이름 오타, 금액 실수, 증빙 누락 같은 사소한 실수가 의외로 많거든요. 5분만 투자해서 검토하면 시간을 훨씬 절약할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 신청서에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 회사별 내부 규정이 다를 수 있으니, 인사팀에 미리 확인하세요." />
    </ArticleLayout>
  );
}
