"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 중간정산을 신청하기로 했어요" },
  { id: "c2", label: "법정 사유(주택 구입·요양·파산 등)에 해당해요" },
  { id: "c3", label: "인사팀에 신청서 양식을 요청했어요" },
  { id: "c4", label: "사유별 증빙서류를 준비 중이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  { label: "중간정산 예상 금액", getValue: (v: Record<string, number>) => v.salary * 10000 * v.years, format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`, highlight: true },
  { label: "중간정산 후 리셋", getValue: () => 0, format: () => "정산 후 근속기간 0년 재시작" },
];

const DOCS = [
  { name: "퇴직금 중간정산 신청서", required: true, where: "회사 인사팀 양식 또는 고용노동부 서식" },
  { name: "사유별 증빙서류 (주택계약서·진단서 등)", required: true, where: "사유에 따라 다름" },
  { name: "무주택 확인서 (주택 구입 사유 시)", required: false, where: "정부24 발급" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사" },
];

const STEPS = [
  { title: "법정 사유 확인", desc: "중간정산 신청서를 쓰기 전에 법정 사유에 해당하는지 먼저 확인해요. 주택 구입, 장기 요양, 천재지변, 파산·회생이 주요 사유예요. 사유가 없으면 신청이 거부될 수 있어요.", tip: "사유별 증빙서류를 미리 준비해두세요" },
  { title: "신청서 양식 수령", desc: "인사팀에서 신청서 양식을 받아요. 회사마다 양식이 다를 수 있어요. 양식이 없으면 고용노동부 홈페이지에서 표준 서식을 내려받을 수 있어요.", tip: "고용노동부 민원마당에서 표준 서식 검색 가능" },
  { title: "신청서 작성", desc: "신청서에는 신청인 정보, 신청 사유, 정산 금액, 사용 목적 등을 기재해요. 사유에 맞는 증빙서류를 함께 첨부해요. 허위 기재는 법적 문제가 될 수 있어요.", tip: "정산 금액은 인사팀에 확인 후 기재하는 게 좋아요" },
  { title: "제출 및 승인 대기", desc: "신청서와 증빙서류를 인사팀에 제출해요. 승인 후 퇴직소득세를 원천징수하고 14일 이내에 지급돼요. 회사가 정당한 이유 없이 거부하면 위법이에요.", tip: "제출 후 진행 상황을 인사팀에 주기적으로 확인하세요" },
];

const CHECKLIST = [
  "법정 사유 확인: 신청 전 필수",
  "신청서 양식: 인사팀 또는 고용노동부 서식",
  "증빙서류: 사유별 서류 세트",
  "정산 금액 확인: 인사팀과 사전 협의",
  "근속기간 초기화: 정산 후 0년 재시작",
];

const FAQS = [
  { q: "중간정산 신청서 양식은 어디서 받나요?", a: "인사팀에서 받는 게 가장 빠르고 회사 기준에 맞아요. 없다면 고용노동부 민원마당에서 표준 서식을 내려받을 수 있어요." },
  { q: "신청서에 어떤 내용을 쓰나요?", a: "신청인 성명·주민번호, 신청 사유, 정산 요청 금액, 사용 목적을 기재해요. 사유별 증빙서류 목록도 함께 작성해요." },
  { q: "신청서 제출 후 얼마나 걸리나요?", a: "회사마다 달라요. 보통 1~2주 내에 승인·지급이 돼요. 14일이 지나도 지급이 없으면 지연이자가 발생해요." },
  { q: "허위 사유로 신청하면 어떻게 되나요?", a: "근로자퇴직급여보장법 위반이에요. 세금 추징 및 법적 책임을 질 수 있어요. 반드시 실제 법정 사유에만 신청하세요." },
  { q: "회사가 신청서를 받지 않으면?", a: "서면으로 신청서를 발송하거나 내용증명으로 발송하세요. 법정 사유가 있는데 거부하면 고용노동부에 진정을 낼 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 민원마당: 퇴직금 중간정산 서식", url: "https://minwon.moel.go.kr" }] },
];

const RELATED = [
  { slug: "퇴직금-중간정산-조건", title: "중간정산 허용 조건", description: "법정 사유 5가지 정리." },
  { slug: "퇴직금-중간정산-주택구입", title: "주택 구입 중간정산", description: "무주택자 주택 구입 시 신청 방법." },
  { slug: "퇴직금-중간정산-세금", title: "중간정산 세금 계산", description: "원천징수 금액 미리 확인." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중간정산-신청서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 신청서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 신청서, 어떻게 작성하나요?<br />
        양식 수령부터 작성 방법, 필요 서류까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a> 신청서는 법정 사유와 증빙서류가 갖춰져야 해요.
        신청서 한 장만 내면 된다고 생각하는 분이 많은데, 사유를 증명하는 서류를 반드시 함께 제출해야 해요.
        양식 수령부터 제출 후 처리 절차까지 순서대로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중간정산 신청서, 어떤 내용을 써야 하나요?</H2>
      <p style={body}>
        신청서에는 신청인 정보, 신청 사유, 정산 금액, 사용 목적이 들어가요.
        회사마다 양식이 조금씩 다르지만 핵심 내용은 같아요.
        고용노동부에서 표준 서식을 제공하기도 하지만 인사팀 양식을 쓰는 게 더 일반적이에요.
      </p>
      <p style={body}>
        신청서를 제출한다고 무조건 받을 수 있는 건 아니에요. 회사가 사유를 검토하고 증빙서류까지 확인한 뒤에 승인해줘요.
        법정 사유가 명확하면 거부할 수 없고, 승인 후 14일 이내에 지급해야 해요.
      </p>

      <GreenBox title="신청서 핵심 3가지">
        1. 신청인 정보: 이름, 주민번호, 입사일<br />
        2. 신청 사유: 법정 사유 중 해당 항목 선택<br />
        3. 정산 금액: 인사팀과 사전 확인 후 기재
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청 준비가 됐어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="법정 사유 해당 여부를 고용노동부(1350) 또는 인사팀에 먼저 확인하세요."
      />

      <Divider />

      <H2>중간정산 예상 금액 미리 확인해보세요</H2>
      <p style={body}>
        신청서를 쓰기 전에 얼마를 받을 수 있는지 먼저 파악해두는 게 좋아요.
        중간정산 후에는 근속기간이 0년으로 리셋되니까 이 점도 꼭 고려해야 해요.
      </p>

      <SectionBadge>중간정산 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 × 근속연수 추정치. 실제 금액은 인사팀 계산 기준으로 다를 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신청서 외에 이 서류들을 함께 내야 해요</H2>
      <p style={body}>
        증빙서류 없이 신청서만 낸다고 처리되지 않아요. 어떤 사유로 신청하느냐에 따라 필요한 서류가 달라요.
        서류를 빠뜨리면 승인이 지연되니까 미리 챙겨두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        300만원을 초과하는 금액을 정산받을 때는 IRP 계좌로 받아야 해요.
        은행이나 증권사에서 IRP 계좌를 먼저 만들고, 계좌번호를 신청서에 기재해요.
      </p>

      <Divider />

      <H2>신청서 작성부터 수령까지 단계별 절차예요</H2>
      <p style={body}>
        사유 확인 → 양식 수령 → 작성 → 제출, 이 네 단계예요.
        가장 먼저 해야 할 건 내 상황이 법정 사유에 해당하는지 확인하는 거예요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        제출 후 14일이 지나도 지급이 없다면 고용노동부(1350)에 문의하거나 진정을 낼 수 있어요.
        지연 일수에 따라 연 20%의 지연이자도 청구할 수 있어요.
      </p>

      <Divider />

      <H2>제출 전 꼭 확인할 체크리스트</H2>
      <p style={body}>
        신청서를 다 썼다고 끝이 아니에요. 빠뜨린 서류가 있거나 금액이 잘못 기재된 경우 반려되고 처음부터 다시 해야 할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="신청서 반려를 막으려면">
        증빙서류는 원본 또는 공증 사본으로 제출<br />
        정산 금액은 인사팀 확인 후 기재<br />
        IRP 계좌는 사전에 개설 완료
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 신청서에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
