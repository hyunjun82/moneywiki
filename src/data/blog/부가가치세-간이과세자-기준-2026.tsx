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
  title: "간이과세자 기준 매출 2026 | 일반과세 전환 부가세율 계산",
  description: "2026년 간이과세자 기준은 직전 연도 매출 8,000만 원 미만이에요. 업종별 부가세율과 일반과세자 전환 시점, 세금계산서 발행 의무까지 구체적으로 정리했어요.",
  category: "세금",
  keywords: [
    "간이과세자 기준 매출 8천만원 2026",
    "간이과세자 일반과세 전환 조건 시기",
    "간이과세자 부가가치세 세율 업종별",
    "간이과세자 세금계산서 발행 의무",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 간이과세자 기준은 직전 연도 공급대가 합계 <strong>8,000만원 미만</strong>이에요.",
    "직전 연도 매출 8,000만원 이상이면 다음 해 7월 1일부터 <strong>일반과세자로 전환</strong>돼요.",
    "간이과세자 부가세율은 업종별 1.5%~4%이고, 4,800만원 미만이면 <strong>납부 면제</strong>예요.",
  ],
  sources: [
    { name: "국세청 간이과세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2398&cntntsId=7676", date: "2026-02" },
  ],
  faq: [
    { q: "간이과세자 기준 매출이 2026년에 바뀐 건가요?", a: "네, 2021년에 4,800만원에서 8,000만원으로 인상됐어요. 2026년 현재도 8,000만원 미만이 기준이에요. 단, 일부 업종(부동산임대, 과세유흥장소)은 4,800만원 미만이 기준이에요." },
    { q: "간이과세자도 부가세 신고를 해야 하나요?", a: "네, 간이과세자도 매년 1월에 부가가치세 신고를 해야 해요. 단, 직전 연도 공급대가가 4,800만원 미만이면 납부는 면제돼요. 신고는 무조건 해야 한다는 점 기억하세요." },
  ],
  ctaCard: {
    label: "부가세 계산",
    mainText: "간이과세자 부가세 자동 계산",
    subText: "업종·매출 입력하면 바로 확인",
    url: "/w/부가가치세-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "부가가치세 신고 기간", url: "/w/부가가치세-신고기간" },
    { title: "일반과세자 전환 절차", url: "/w/일반과세자-전환" },
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

    const revenue = q1;     // "under4800" | "4800to8000" | "over8000"
    const business = q2;    // "general" | "restaurant" | "realestate"
    const vatReg = q3;      // "yes" | "no"
    const invoice = q4;     // "needed" | "not_needed"

    // 일반과세자 전환 케이스
    if (revenue === "over8000") {
      const gridItems = [
        { label: "현재 과세 유형", value: "일반과세자 해당", ok: false },
        { label: "매출 기준", value: "8,000만원 이상", ok: false },
        { label: "부가세율", value: "10% 적용", ok: false },
        { label: "세금계산서", value: "발행 의무 있음", ok: false },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "일반과세자 전환 절차", desc: "전환 시 준비사항 확인", href: "/w/일반과세자-전환" },
        { icon: "🧮", title: "부가세 신고 방법", desc: "일반과세자 신고 가이드", href: "/w/부가가치세-신고기간" },
      ];
      return (
        <ResultFail title="일반과세자 전환 대상이에요">
          <ResultGrid items={gridItems} />
          <P>직전 연도 매출이 8,000만원 이상이면 다음 해 7월 1일부터 일반과세자로 전환돼요. 부가세율이 10%로 오르고 세금계산서 발행 의무도 생겨요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    // 간이과세자 납부 면제
    if (revenue === "under4800") {
      const gridItems = [
        { label: "현재 과세 유형", value: "간이과세자", ok: true },
        { label: "부가세 납부", value: "면제 (신고는 필수)", ok: true },
        { label: "세금계산서", value: "발행 불가", ok: invoice === "not_needed" },
        { label: "다음 전환 기준", value: "8,000만원 초과 시", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "간이과세자 부가세 신고", desc: "1월 신고 방법 확인", href: "/w/부가가치세-신고기간" },
        { icon: "🧮", title: "업종별 부가세율 계산", desc: "실제 납부액 미리 계산", href: "/w/부가가치세-계산기" },
      ];
      return (
        <ResultPass title="간이과세자 납부 면제 대상이에요">
          <ResultGrid items={gridItems} />
          <P>직전 연도 매출이 4,800만원 미만이면 부가세 납부는 면제예요. 하지만 1월에 부가가치세 신고는 반드시 해야 해요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultPass>
      );
    }

    // 4800~8000 간이과세자 납부 의무
    const gridItems = [
      { label: "현재 과세 유형", value: "간이과세자", ok: true },
      { label: "부가세 납부", value: "의무 있음", ok: false },
      { label: "세금계산서", value: "발행 불가", ok: invoice === "not_needed" },
      { label: "전환 기준", value: "8,000만원 초과 시", ok: true },
    ];
    const links: ResLink[] = [
      { icon: "📋", title: "간이과세자 부가세 계산", desc: "업종별 납부액 계산", href: "/w/부가가치세-계산기" },
      { icon: "🧮", title: "간이과세자 신고 기간", desc: "연 1회 신고 일정 확인", href: "/w/부가가치세-신고기간" },
    ];
    return (
      <ResultPass title="간이과세자 납부 의무가 있어요">
        <ResultGrid items={gridItems} />
        <P>매출이 4,800만원 이상~8,000만원 미만이면 간이과세자이지만 부가세 납부 의무가 있어요. 업종별 부가가치세율(1.5%~4%)을 적용한 금액을 납부해야 해요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { t: "STEP 01 간이과세 여부 확인" },
    { t: "간이과세자 기준 매출은 2026년 얼마인가요?", sub: "8천만원 기준 · 업종별 예외 · 신규사업자" },
    { t: "간이과세자 기준 일반과세 전환은 언제 되나요?", sub: "7월 1일 전환 · 직전 연도 기준 · 통지 절차" },
    { t: "간이과세자 기준 부가세율은 업종마다 다른가요?", sub: "1.5%~4% 업종별 · 납부 면제 기준 · 계산 예시" },
    { t: "간이과세자 기준 세금계산서 발행은 가능한가요?", sub: "발행 제한 · 영수증 발급 · 4,800만원 이상 예외" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "부가세 계산기", desc: "간이·일반 비교 계산", href: "/w/부가가치세-계산기", hot: true },
              { icon: "📋", label: "부가세 신고 기간", desc: "신고 마감일 확인", href: "/w/부가가치세-신고기간" },
              { icon: "📊", label: "과세유형 비교", desc: "간이 vs 일반 차이", href: "/w/간이과세자-일반과세자-비교" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "사업자등록증 발급", href: "/w/사업자등록-방법" },
              { icon: "📋", label: "부가세 신고 기간", href: "/w/부가가치세-신고기간" },
              { icon: "🏢", label: "일반과세자 전환", href: "/w/일반과세자-전환" },
              { icon: "🧾", label: "세금계산서 발행 조건", href: "/w/세금계산서-발행-조건" },
              { icon: "💰", label: "종합소득세 신고", href: "/w/종합소득세-신고기간" },
            ]}
          />
          <SidebarCalc
            items={[
              { icon: "🧮", label: "부가세 계산기", href: "/w/부가가치세-계산기" },
              { icon: "📊", label: "종합소득세 계산기", href: "/w/종합소득세-계산기" },
              { icon: "💼", label: "4대보험 계산기", href: "/w/4대보험-계산기" },
              { icon: "📈", label: "연봉 실수령액 계산기", href: "/w/연봉-실수령액-계산기" },
              { icon: "🏠", label: "재산세 계산기", href: "/w/재산세-계산기" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반적인 세무 정보를 제공하며, 개인 상황에 따라 다를 수 있어요. 정확한 판단은 세무사 상담을 권장해요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="간이과세 여부 확인" sub="매출·업종 입력하면 즉시 판정" />
      <CheckerShell title="나는 간이과세자인가요?" result={getResult()}>
        <CheckerQ
          q="직전 연도 연간 매출은?"
          opts={[
            { label: "4,800만원 미만", value: "under4800" },
            { label: "4,800만~8,000만원", value: "4800to8000" },
            { label: "8,000만원 이상", value: "over8000" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="업종은 무엇인가요?"
          opts={[
            { label: "일반 소매·서비스", value: "general" },
            { label: "음식점·숙박업", value: "restaurant" },
            { label: "부동산 임대", value: "realestate" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="현재 부가세 일반과세자로 등록되어 있나요?"
          opts={[
            { label: "아니요 (간이과세자)", value: "no" },
            { label: "네 (일반과세자)", value: "yes" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="세금계산서 발행이 필요한 거래처가 있나요?"
          opts={[
            { label: "네, 있어요", value: "needed" },
            { label: "아니요, 없어요", value: "not_needed" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="간이과세자 기준을 알면 부가세 부담이 얼마나 되는지 미리 계산할 수 있어요."
        href="/w/부가가치세-계산기"
        label="부가세 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="간이과세자 기준 매출은 2026년 얼마인가요?" sub="8천만원 기준 · 업종별 예외 · 신규사업자" />
      <P>2026년 기준 간이과세자는 직전 연도 공급대가 합계가 <B>8,000만원 미만</B>인 개인사업자예요. 2021년 7월에 기존 4,800만원에서 8,000만원으로 기준이 올라갔어요. 법인사업자는 간이과세자가 될 수 없어요.</P>
      <P>예외 업종이 있어요. 부동산 임대업과 과세유흥장소는 여전히 4,800만원 미만이 기준이에요. 광업, 제조업, 도매업도 매출과 관계없이 간이과세 적용이 안 돼요.</P>
      <P>신규 사업자는 사업 개시 연도에 간이과세자로 등록할 수 있어요. 단, 시 이상 지역의 부동산임대업은 신규여도 일반과세자로만 등록해야 해요. 직전 연도 실적이 없으니 첫해에는 추정 매출로 판단해요.</P>
      <P>간이과세자 기준을 충족하더라도 세금계산서를 발행해야 하는 거래가 많다면 자발적으로 일반과세자를 선택하는 게 유리할 수 있어요. 매입 부가세 환급을 받을 수 있기 때문이에요.</P>

      <FormulaCard
        formula="간이과세 부가세 = 공급대가 × 업종별 부가가치율 × 10%"
        note="예) 음식점 1,000만원 매출 → 1,000만원 × 40% × 10% = 40만원"
      />

      <TableTitle>업종별 간이과세 부가가치율 및 부가세율</TableTitle>
      <TH cols={["업종", "부가가치율", "실효 부가세율", "비고"]} />
      <THL rows={[
        ["소매업·음식점업·숙박업", "15%~40%", "1.5%~4%", "업종 세분"],
        ["서비스업·건설업", "30%~40%", "3%~4%", "—"],
        ["부동산임대업", "40%", "4%", "기준 4,800만원"],
        ["과세유흥장소", "40%", "4%", "기준 4,800만원"],
      ]} />
      <TableNote>부가가치율 × 10% = 실효 부가세율. 업종 세분화에 따라 다를 수 있어요.</TableNote>

      <InlineLink
        icon="📋"
        title="부가가치세 신고 기간"
        desc="간이과세자 신고 마감일과 납부 일정 확인"
        href="/w/부가가치세-신고기간"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="간이과세자 기준 일반과세 전환은 언제 되나요?" sub="7월 1일 전환 · 직전 연도 기준 · 통지 절차" />
      <P>직전 연도 공급대가 합계가 8,000만원 이상이 되면 <B>다음 해 7월 1일</B>부터 일반과세자로 자동 전환돼요. 국세청에서 5~6월에 전환 예정 통지를 발송해요. 통지를 받으면 부가세 신고 방식도 바뀌므로 미리 준비해야 해요.</P>
      <P>반대로 매출이 줄어 8,000만원 미만이 되면 다음 해 7월 1일부터 간이과세자로 다시 전환될 수 있어요. 직전 연도 실적 기준으로 매년 7월에 재판정이 이루어져요.</P>
      <P>자발적으로 일반과세자 전환도 가능해요. 홈택스에서 '일반과세자 포기 신청'을 철회하면 되는데, 포기 신청 후 3년이 지나야 간이과세자로 돌아올 수 있어요. 한 번 일반을 선택하면 쉽게 못 돌아오는 셈이에요.</P>
      <P>간이과세자에서 일반과세자로 전환되면 세금계산서 발행 의무, 매입세액 공제, 매출의 10% 부가세 납부가 모두 바뀌어요. 특히 매입이 많은 업종이라면 일반과세자가 오히려 부담이 줄어드는 경우도 있어요.</P>

      <SpokeLink
        num="01"
        title="일반과세자로 전환 후 부가세 신고"
        desc="전환 후 첫 신고 준비와 주의사항"
        href="/w/일반과세자-전환"
      />

      <RelatedMid
        cards={[
          { title: "부가세 신고 기간", desc: "신고 마감일 확인", href: "/w/부가가치세-신고기간" },
          { title: "종합소득세 신고", desc: "사업자 필수 신고 정리", href: "/w/종합소득세-신고기간" },
          { title: "사업자등록 방법", desc: "과세유형 선택부터 등록까지", href: "/w/사업자등록-방법" },
        ]}
        hubHref="/w/세금"
        hubLabel="세금 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="간이과세자 기준 부가세율은 업종마다 다른가요?" sub="1.5%~4% 업종별 · 납부 면제 기준 · 계산 예시" />
      <P>간이과세자 부가세율은 업종에 따라 달라요. 소매업은 부가가치율 15%로 실효 부가세율 1.5%이고, 음식점·숙박업은 40%로 4%예요. 서비스업은 30%로 3%예요. 일반과세자(10%)보다 훨씬 낮아요.</P>
      <P>직전 연도 매출이 4,800만원 미만이면 부가세 납부 자체가 면제예요. 하지만 신고는 무조건 해야 해요. 신고를 안 하면 무신고 가산세(납부세액의 20%)가 붙어요. 납부만 없는 거지 신고 의무는 있어요.</P>
      <P>4,800만원 이상~8,000만원 미만 구간에서는 납부 의무가 생겨요. 예를 들어 음식점에서 연 6,000만원 매출이 나왔다면 6,000만원 × 40% × 10% = 240만원을 납부해야 해요.</P>
      <P>부가세 납부 시 공제도 있어요. 세금계산서나 신용카드 매출전표 등 적격증빙으로 받은 매입세액의 일부를 공제받을 수 있어요. 단, 간이과세자의 공제율은 일반과세자보다 낮아요.</P>

      <Info type="warn">
        간이과세자는 부가세 납부가 면제되더라도 종합소득세 신고는 별도로 해야 해요. 부가세와 소득세는 다른 세금이에요.
      </Info>

      <CaseBox
        cases={[
          {
            name: "소매업 이씨",
            detail: "연 매출 3,500만원 · 부가가치율 15%",
            result: "납부 면제 (4,800만원 미만) · 신고만 하면 됨",
          },
          {
            name: "음식점 김씨",
            detail: "연 매출 6,000만원 · 부가가치율 40%",
            result: "부가세 = 6,000만원 × 40% × 10% = 240만원 납부",
          },
          {
            name: "서비스업 박씨",
            detail: "연 매출 7,800만원 · 부가가치율 30%",
            result: "부가세 = 7,800만원 × 30% × 10% = 234만원 납부",
          },
        ]}
      />

      <InlineLink
        icon="🧮"
        title="부가가치세 계산기"
        desc="업종과 매출 입력하면 실제 납부액 자동 계산"
        href="/w/부가가치세-계산기"
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="간이과세자 기준 세금계산서 발행은 가능한가요?" sub="발행 제한 · 영수증 발급 · 4,800만원 이상 예외" />
      <P>원칙적으로 간이과세자는 세금계산서를 발행할 수 없어요. 대신 <B>영수증(간이영수증)</B>을 발행해야 해요. B2B 거래처가 부가세 매입세액 공제를 받으려면 세금계산서가 필요한데, 간이과세자와 거래하면 공제가 안 돼요.</P>
      <P>예외가 있어요. 직전 연도 공급대가가 4,800만원 이상인 간이과세자는 세금계산서를 발행할 수 있어요. 국세청에서 '세금계산서 발급 가능 간이과세자'로 지정하면 가능해요. 발행 시 전자세금계산서 의무 발행 대상에 해당할 수 있어요.</P>
      <P>세금계산서 발행이 필요한 거래가 많다면 일반과세자로 전환하는 게 나을 수 있어요. 간이과세자로 있으면 B2B 거래에서 불리하고, 거래처도 매입세액 공제를 받지 못해 불이익이 생기거든요.</P>
      <P>신용카드·현금영수증 발행은 간이과세자도 의무예요. 소비자 요청 시 반드시 발행해야 하고, 발행하지 않으면 미발행 금액의 5% 가산세가 부과돼요. 영세 사업자도 예외는 없어요.</P>

      <SpokeLink
        num="02"
        title="세금계산서 발행 조건과 절차"
        desc="전자세금계산서 발행 의무와 가산세 확인"
        href="/w/세금계산서-발행-조건"
      />

      <ExtBtn href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2398&cntntsId=7676" label="국세청 공식" text="간이과세 안내" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "부가가치세 신고 기간", href: "/w/부가가치세-신고기간" },
          { title: "종합소득세 신고 방법", href: "/w/종합소득세-신고기간" },
          { title: "사업자등록 방법과 종류", href: "/w/사업자등록-방법" },
          { title: "일반과세자 전환 절차", href: "/w/일반과세자-전환" },
          { title: "세금계산서 발행 조건", href: "/w/세금계산서-발행-조건" },
        ]}
      />
      <PrevNext
        prev={{ title: "종합소득세 가산세 계산", href: "/w/종합소득세-신고-안하면-가산세" }}
        next={{ title: "프리랜서 3.3% 원천징수 환급", href: "/w/프리랜서-3.3-원천징수-환급" }}
      />
    </BlogLayout>
  );
}

export { meta };
