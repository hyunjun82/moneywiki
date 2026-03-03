// @ts-nocheck
"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag,
  FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "취업후상환 학자금대출 의무 상환 조건 | 소득 초과 상환액 계산",
  description: "취업후상환 학자금대출(ICL)은 소득이 생기면 자동으로 상환이 시작돼요. 2026년 기준 의무 상환 소득 기준과 연간 상환액 계산 방법을 알기 쉽게 정리했어요.",
  category: "복지",
  keywords: [
    "취업후상환 학자금대출 의무 상환 소득 기준",
    "취업후상환 학자금대출 상환액 계산 연간",
    "취업후상환 학자금대출 이자 유예 재학중",
    "취업후상환 학자금대출 중도 상환 이점",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "ICL(취업후상환 학자금대출)은 연간 소득이 <strong>상환 기준 소득(2026년 3,152만원)</strong>을 초과하면 자동 상환이 시작돼요.",
    "상환액은 소득 초과분의 <strong>20%</strong>이고, 국세청이 연말정산 후 원천공제해요.",
    "재학·군 복무·임신·출산 기간에는 이자 유예로 <strong>이자가 붙지 않아요</strong>.",
  ],
  sources: [
    { name: "한국장학재단 ICL 상환 안내", url: "https://www.kosaf.go.kr/ko/loan.do?pg=loan_14_03", date: "2026-02" },
  ],
  faq: [
    { q: "취업후상환 학자금대출 상환은 언제 시작되나요?", a: "졸업(또는 중퇴) 후 소득이 발생하는 시점부터 시작돼요. 전년도 연간 소득이 상환 기준 소득(2026년 3,152만원)을 초과하면 그해 연말정산 후 국세청이 자동 공제해요. 의무 상환 외에도 자발적 상환도 가능해요." },
    { q: "취업후상환 학자금대출 이자는 언제 붙나요?", a: "재학 중, 군 복무 기간, 임신·출산·육아 기간에는 이자가 유예돼요. 이자 유예 종료 후 취업 전까지는 이자가 발생하지만 거치돼요. 의무 상환이 시작되면 원금과 이자를 함께 갚아요." },
  ],
  ctaCard: {
    label: "상환액 계산",
    mainText: "ICL 연간 상환액 자동 계산",
    subText: "소득 입력하면 납부액 즉시 확인",
    url: "/w/학자금대출-상환액-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "학자금대출 상환액 계산기", url: "/w/학자금대출-상환액-계산기" },
    { title: "국민장학금 소득분위 계산", url: "/w/국민장학금-소득분위" },
  ],
};

export default function Page() {
  type ResLink = { icon: string; title: string; desc: string; href: string };

  const [sel, setSel] = useState<{ q1: string; q2: string; q3: string; q4: string }>({
    q1: "", q2: "", q3: "", q4: "",
  });

  function getResult(): React.ReactNode | null {
    const { q1, q2, q3, q4 } = sel;
    if (!q1 || !q2 || !q3 || !q4) return null;

    const status = q1;     // "enrolled" | "graduated" | "leave"
    const income = q2;     // "under3152" | "3152to5000" | "over5000"
    const hasLoan = q3;    // "yes" | "no"
    const repayType = q4;  // "auto" | "voluntary" | "notStarted"

    if (hasLoan === "no") {
      const gridItems = [
        { label: "대출 여부", value: "없음", ok: true },
        { label: "상환 의무", value: "해당 없음", ok: true },
        { label: "장학금 조건", value: "소득분위 확인 필요", ok: true },
        { label: "대안", value: "국민장학금 신청 검토", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "국민장학금 소득분위", desc: "장학금 수혜 가능 여부 확인", href: "/w/국민장학금-소득분위" },
        { icon: "🧮", title: "교육급여 지원 금액", desc: "기초수급자 교육 지원 확인", href: "/w/기초생활수급자-교육급여-신청" },
      ];
      return (
        <ResultPass title="ICL 대출이 없어요">
          <ResultGrid items={gridItems} />
          <P>ICL 대출이 없으면 상환 의무가 없어요. 학자금이 필요하다면 국민장학금 신청 조건을 먼저 확인해봐요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultPass>
      );
    }

    if (status === "enrolled") {
      const gridItems = [
        { label: "현재 상태", value: "재학 중", ok: true },
        { label: "이자 유예", value: "재학 중 이자 미발생", ok: true },
        { label: "의무 상환", value: "졸업 후 소득 발생 시", ok: true },
        { label: "확인 사항", value: "장학재단 대출 잔액 조회", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "한국장학재단 ICL 안내", desc: "재학 중 이자 유예 조건 확인", href: "https://www.kosaf.go.kr" },
        { icon: "🧮", title: "상환액 계산기", desc: "졸업 후 예상 상환액 미리 계산", href: "/w/학자금대출-상환액-계산기" },
      ];
      return (
        <ResultPass title="재학 중 — 이자 유예 적용 중">
          <ResultGrid items={gridItems} />
          <P>재학 기간에는 이자가 붙지 않아요. 졸업 후 소득이 3,152만원을 넘으면 그때부터 상환이 시작돼요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultPass>
      );
    }

    const isRepayment = income !== "under3152";
    const excessIncome = income === "3152to5000" ? 1000 : income === "over5000" ? 2500 : 0;
    const annualRepay = Math.round(excessIncome * 0.2);

    const gridItems = [
      { label: "의무 상환 여부", value: isRepayment ? "의무 상환 시작" : "기준 미달 — 유예", ok: !isRepayment },
      { label: "상환 기준 소득", value: "3,152만원 (2026년)", ok: true },
      { label: "예상 연간 상환액", value: isRepayment ? `약 ${annualRepay}만원` : "해당 없음", ok: !isRepayment },
      { label: "상환 방식", value: "국세청 원천공제 (자동)", ok: true },
    ];
    const links: ResLink[] = [
      { icon: "🧮", title: "상환액 계산기", desc: "소득 기준 정확한 상환액 계산", href: "/w/학자금대출-상환액-계산기" },
      { icon: "📋", title: "차상위계층 확인서 발급", desc: "소득 낮은 경우 복지 혜택 확인", href: "/w/차상위계층-확인서-발급" },
    ];
    return isRepayment ? (
      <ResultFail title="의무 상환 대상이에요">
        <ResultGrid items={gridItems} />
        <P>소득이 상환 기준을 초과해 연간 약 {annualRepay}만원이 원천공제돼요. 국세청이 연말정산 후 자동으로 처리해요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    ) : (
      <ResultPass title="아직 상환 기준 소득 미달이에요">
        <ResultGrid items={gridItems} />
        <P>연 소득이 3,152만원 이하면 의무 상환이 없어요. 소득이 늘어나는 해에 상환이 자동 시작돼요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { t: "STEP 01 상환 의무 확인" },
    { t: "취업후상환 학자금대출 의무 상환 소득 기준은?", sub: "2026년 3,152만원 · 소득 판단 기준 · 자동 공제" },
    { t: "취업후상환 학자금대출 상환액 계산 방법은?", sub: "초과분 20% · 계산 공식 · 사례 3가지" },
    { t: "취업후상환 학자금대출 이자 유예 기간은?", sub: "재학 중 · 군 복무 · 출산 육아 · 유예 종료 시점" },
    { t: "취업후상환 학자금대출 중도 상환 이점은?", sub: "자발적 상환 · 이자 절감 · 상환 우선 순서" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "상환액 계산기", desc: "ICL 연간 납부액 계산", href: "/w/학자금대출-상환액-계산기", hot: true },
              { icon: "📋", label: "국민장학금 소득분위", desc: "장학금 수혜 가능 여부", href: "/w/국민장학금-소득분위" },
              { icon: "📊", label: "기초생활수급자 교육급여", desc: "교육 지원금 신청 확인", href: "/w/기초생활수급자-교육급여-신청" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "국민장학금 소득분위 계산", href: "/w/국민장학금-소득분위" },
              { icon: "📋", label: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
              { icon: "🏢", label: "기초생활수급자 주거급여", href: "/w/기초생활수급자-주거급여-2026" },
              { icon: "🧾", label: "차상위계층 확인서 발급", href: "/w/차상위계층-확인서-발급" },
              { icon: "💰", label: "종합소득세 신고 기간", href: "/w/종합소득세-신고기간" },
            ]}
          />
          <SidebarCalc
            items={[
              { icon: "🧮", label: "학자금대출 상환액 계산기", href: "/w/학자금대출-상환액-계산기" },
              { icon: "📊", label: "종합소득세 계산기", href: "/w/종합소득세-계산기" },
              { icon: "💼", label: "4대보험 계산기", href: "/w/4대보험-계산기" },
              { icon: "📈", label: "연봉 실수령액 계산기", href: "/w/연봉-실수령액-계산기" },
              { icon: "🏠", label: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반적인 정보를 제공하며, 실제 상환액은 한국장학재단과 국세청 확인을 권장해요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="상환 의무 확인" sub="재학 여부·소득 입력하면 즉시 판정" />
      <CheckerShell title="내가 ICL 상환을 해야 하나요?" result={getResult()}>
        <CheckerQ
          q="현재 상태는 무엇인가요?"
          opts={[
            { label: "재학 중 (대학교)", value: "enrolled" },
            { label: "졸업 또는 중퇴", value: "graduated" },
            { label: "휴학 중", value: "leave" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="연간 소득은 얼마인가요? (근로+사업 합산)"
          opts={[
            { label: "3,152만원 미만", value: "under3152" },
            { label: "3,152만~5,000만원", value: "3152to5000" },
            { label: "5,000만원 이상", value: "over5000" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="ICL 학자금대출이 있나요?"
          opts={[
            { label: "네, 있어요", value: "yes" },
            { label: "아니요, 없어요", value: "no" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="현재 상환 방식은 어떻게 되나요?"
          opts={[
            { label: "국세청 자동 원천공제", value: "auto" },
            { label: "자발적 상환 중", value: "voluntary" },
            { label: "아직 상환 안 함", value: "notStarted" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="ICL 상환액은 소득에 따라 자동으로 달라져요. 실제 납부액을 미리 계산해봐요."
        href="/w/학자금대출-상환액-계산기"
        label="상환액 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="취업후상환 학자금대출 의무 상환 소득 기준은?" sub="2026년 3,152만원 · 소득 판단 기준 · 자동 공제" />
      <P>ICL의 의무 상환 기준 소득은 매년 조정돼요. 2026년 기준은 연간 <B>3,152만원</B>이에요. 전년도 소득이 이 금액을 초과하면 다음 해 연말정산 후 국세청이 자동으로 초과분의 20%를 원천공제해요.</P>
      <P>소득 범위는 근로소득, 사업소득, 이자·배당소득 등 종합소득 전체예요. 비과세 소득은 제외돼요. 학생 아르바이트나 단기 소득도 합산되니 주의해야 해요.</P>
      <P>원천공제는 국세청이 자동 처리해요. 별도로 신청하지 않아도 돼요. 연말정산 결과 환급금이 발생하면 먼저 ICL 상환에 사용하고 남은 금액이 환급돼요.</P>
      <P>재직 중 의무 상환 외에도 자발적으로 상환할 수 있어요. 자발적 상환은 한국장학재단 앱이나 홈페이지에서 언제든 가능해요. 이자가 매일 쌓이므로 여유가 있을 때 추가 상환하면 이자를 줄일 수 있어요.</P>

      <InlineLink
        icon="📋"
        title="국민장학금 소득분위 계산"
        desc="ICL과 함께 신청 가능한 장학금 조건 확인"
        href="/w/국민장학금-소득분위"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="취업후상환 학자금대출 상환액 계산 방법은?" sub="초과분 20% · 계산 공식 · 사례 3가지" />
      <P>의무 상환액은 <B>전년도 소득에서 기준 소득을 뺀 초과분의 20%</B>예요. 예를 들어 연 소득 4,000만원이면 (4,000만 - 3,152만) × 20% = 169.6만원이 연간 상환액이에요.</P>
      <P>상환은 연간 한 번, 연말정산 후에 이루어져요. 세금 환급금이 있으면 거기서 먼저 공제하고, 환급금이 부족하면 별도로 납부해야 해요. 매월 분할 납부 방식이 아니라 연 1회 방식이에요.</P>
      <P>부채 잔액이 남아 있는 한 계속 상환돼요. 소득이 기준 이상인 해마다 20%씩 공제돼요. 소득이 기준 이하로 떨어지면 그해는 공제가 없어요. 대출 잔액을 완전히 갚으면 종료돼요.</P>
      <P>자발적으로 더 빨리 갚고 싶다면 추가 상환이 가능해요. 이자가 매일 가산되므로 한 달만 빨리 갚아도 이자를 줄일 수 있어요.</P>

      <FormulaCard
        formula="연간 의무 상환액 = (전년도 소득 - 3,152만원) × 20%"
        note="예) 연 소득 4,500만원 → (4,500 - 3,152) × 20% = 269.6만원 상환"
      />

      <CaseBox
        cases={[
          {
            name: "소득 3,500만원 이씨",
            detail: "초과분 348만원 · 상환율 20%",
            result: "연간 의무 상환액 = 348만원 × 20% = 69.6만원",
          },
          {
            name: "소득 5,000만원 김씨",
            detail: "초과분 1,848만원 · 상환율 20%",
            result: "연간 의무 상환액 = 1,848만원 × 20% = 369.6만원",
          },
          {
            name: "소득 7,000만원 박씨",
            detail: "초과분 3,848만원 · 상환율 20%",
            result: "연간 의무 상환액 = 3,848만원 × 20% = 769.6만원",
          },
        ]}
      />

      <SpokeLink
        num="01"
        title="기초생활수급자 교육급여 지원"
        desc="소득이 낮은 학생의 교육 지원 확인"
        href="/w/기초생활수급자-교육급여-신청"
      />

      <RelatedMid
        cards={[
          { title: "국민장학금 소득분위", desc: "장학금 수혜 가능 여부 계산", href: "/w/국민장학금-소득분위" },
          { title: "기초생활수급자 주거급여", desc: "주거비 지원 조건 확인", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "차상위계층 확인서 발급", desc: "복지 혜택 대상 여부 확인", href: "/w/차상위계층-확인서-발급" },
        ]}
        hubHref="/w/복지"
        hubLabel="복지 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="취업후상환 학자금대출 이자 유예 기간은?" sub="재학 중 · 군 복무 · 출산 육아 · 유예 종료 시점" />
      <P>ICL의 가장 큰 장점 중 하나는 <B>재학 기간 이자 유예</B>예요. 대학교 재학 중에는 이자가 전혀 붙지 않아요. 대출을 받아도 학교를 다니는 동안은 이자 걱정이 없어요.</P>
      <P>군 복무 기간에도 이자가 유예돼요. 입영 통지서 등 증빙 자료를 한국장학재단에 제출하면 군 복무 기간 이자가 면제돼요. 현역, 사회복무요원 등 모두 해당돼요.</P>
      <P>임신·출산·육아 기간에도 이자 유예를 신청할 수 있어요. 임신 확인서, 출생증명서 등을 제출하면 해당 기간 이자를 면제받아요. 자녀 6세까지 혜택이 적용돼요.</P>
      <P>유예가 끝나면 이자가 쌓이기 시작해요. 취업 전이라도 졸업 후에는 이자가 발생해요. 이자는 일별로 계산되므로 취업 후 빨리 자발적 상환을 시작하는 게 유리해요.</P>

      <Info type="warn">
        이자 유예 기간에는 이자가 붙지 않지만, 원금은 그대로 남아 있어요. 유예 종료 후 이자가 가산되기 시작하므로 취업 직후 상환 시작을 권장해요.
      </Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="취업후상환 학자금대출 중도 상환 이점은?" sub="자발적 상환 · 이자 절감 · 상환 우선 순서" />
      <P>의무 상환액 외에 자발적으로 추가 상환을 할 수 있어요. 여윳돈이 생겼을 때 한국장학재단 앱에서 바로 상환할 수 있어요. 이자가 매일 붙으므로 빨리 갚을수록 총 부담이 줄어요.</P>
      <P>중도 상환에 수수료는 없어요. 일반 은행 대출처럼 조기 상환 수수료가 없으므로 여유가 생길 때마다 갚는 게 이득이에요. 소액이라도 꾸준히 갚으면 이자 부담이 크게 줄어요.</P>
      <P>상환 우선 순서는 이자 먼저예요. 납입금이 먼저 미납 이자에 충당되고, 그다음 원금에 적용돼요. 원금을 줄이려면 이자를 내고 남은 금액이 원금에 적용돼요.</P>
      <P>전액 상환도 가능해요. 대출 잔액 전부를 한 번에 갚고 싶다면 '전액 상환' 기능을 이용하면 돼요. 잔액 조회는 한국장학재단 앱이나 홈페이지에서 확인할 수 있어요.</P>

      <SpokeLink
        num="02"
        title="차상위계층 확인서 발급"
        desc="소득 낮은 경우 복지 혜택 추가 확인"
        href="/w/차상위계층-확인서-발급"
      />

      <InlineLink
        icon="🧮"
        title="학자금대출 상환액 계산기"
        desc="소득 기준 연간 의무 상환액 자동 계산"
        href="/w/학자금대출-상환액-계산기"
      />

      <ExtBtn href="https://www.kosaf.go.kr/ko/loan.do?pg=loan_14_03" label="한국장학재단 공식" text="ICL 상환 안내 바로가기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "국민장학금 소득분위 계산", href: "/w/국민장학금-소득분위" },
          { title: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
          { title: "기초생활수급자 주거급여 2026", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "차상위계층 확인서 발급", href: "/w/차상위계층-확인서-발급" },
          { title: "종합소득세 신고 기간", href: "/w/종합소득세-신고기간" },
        ]}
      />
      <PrevNext
        prev={{ title: "소상공인 노란우산공제 가입", href: "/w/소상공인-노란우산공제-가입" }}
        next={{ title: "기초생활수급자 주거급여 2026", href: "/w/기초생활수급자-주거급여-2026" }}
      />
    </BlogLayout>
  );
}

export { meta };
