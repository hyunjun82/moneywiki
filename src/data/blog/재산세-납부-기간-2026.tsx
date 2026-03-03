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
  title: "재산세 납부 기간 2026 | 7월 9월 주택 토지 세율 계산",
  description: "2026년 재산세 납부 기간은 7월과 9월이에요. 주택은 두 번으로 나눠 내고, 토지는 9월에 한 번 내요. 공시가격 기준 세율과 실제 납부액 계산 방법을 알려드려요.",
  category: "세금",
  keywords: [
    "재산세 납부 기간 7월 9월 납부일",
    "재산세 납부 주택 7월 9월 20만원 기준",
    "재산세 납부 주택 토지 세율 공시가격",
    "재산세 납부 감면 1주택 세액 공제",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 재산세 납부 기간은 <strong>주택 7월 31일·9월 30일, 토지 9월 30일</strong>이에요.",
    "주택 재산세가 <strong>20만원 이하면 7월에 전액 납부</strong>하고 9월 고지서는 없어요.",
    "공시가격에 공정시장가액비율(주택 60%)을 곱한 <strong>과세표준에 세율 0.1%~0.4%</strong>를 적용해요.",
  ],
  sources: [
    { name: "행정안전부 재산세 안내", url: "https://www.mois.go.kr/frt/sub/a06/b09/propertytax/screen.do", date: "2026-02" },
  ],
  faq: [
    { q: "재산세 납부 기간을 놓치면 어떻게 되나요?", a: "납부 기한을 넘기면 3%의 납부지연가산세가 부과돼요. 이후 1개월이 지날 때마다 0.75%씩 추가돼요. 위택스나 ARS(1899-0341)에서 납부하면 기한 후 납부도 가능해요." },
    { q: "재산세 납부 기간에 분납은 어떻게 하나요?", a: "재산세가 500만원을 초과하면 납부 기한 이후 2개월 이내에 분납할 수 있어요. 분납 신청은 위택스 또는 구청 세무과에서 납부 기한 전에 신청해야 해요." },
  ],
  ctaCard: {
    label: "재산세 계산",
    mainText: "공시가격 기준 재산세 자동 계산",
    subText: "주택·토지 납부액 미리 확인",
    url: "/w/재산세-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "재산세 계산기", url: "/w/재산세-계산기" },
    { title: "종합부동산세 기준", url: "/w/종합부동산세-기준" },
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

    const propType = q1;   // "house" | "land" | "building"
    const pubPrice = q2;   // "under100m" | "100to300m" | "over300m"
    const count = q3;      // "one" | "multi"
    const paid = q4;       // "july" | "sept" | "both" | "not_yet"

    // 7월 납부 대상인지 판단
    const isJulyPayer = propType === "house";
    const isSeptOnly = propType === "land" || propType === "building";

    let deadline = isJulyPayer ? "7월 31일 · 9월 30일" : "9월 30일";
    let tax_range = pubPrice === "under100m" ? "약 6만~15만원" : pubPrice === "100to300m" ? "약 15만~80만원" : "약 80만원 이상";

    const gridItems = [
      { label: "부동산 유형", value: propType === "house" ? "주택" : propType === "land" ? "토지" : "건물", ok: true },
      { label: "납부 기간", value: deadline, ok: true },
      { label: "예상 세액 범위", value: tax_range, ok: true },
      { label: "1주택 감면", value: count === "one" && propType === "house" ? "세액 공제 가능" : "해당 없음", ok: count === "one" && propType === "house" },
    ];
    const links: ResLink[] = [
      { icon: "🧮", title: "재산세 계산기", desc: "공시가격 입력하면 실납부액 계산", href: "/w/재산세-계산기" },
      { icon: "📋", title: "종합부동산세 기준", desc: "재산세와 종부세 합산 납부 확인", href: "/w/종합부동산세-기준" },
    ];
    return (
      <ResultPass title={isJulyPayer ? "주택 재산세 — 7월·9월 두 번 납부" : "토지·건물 재산세 — 9월에 납부"}>
        <ResultGrid items={gridItems} />
        <P>{isJulyPayer ? "주택 재산세는 7월 31일과 9월 30일 두 번 나눠 내요. 단, 세액이 20만원 이하면 7월에 전액 부과하고 9월 고지서는 없어요." : "토지·건물 재산세는 9월 30일까지 한 번만 납부해요. 위택스 또는 구청에서 납부할 수 있어요."}</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { t: "STEP 01 납부 기간 확인" },
    { t: "재산세 납부 기간은 2026년 언제인가요?", sub: "7월 31일 · 9월 30일 · 주택·토지 구분" },
    { t: "재산세 납부 주택은 왜 두 번 내나요?", sub: "20만원 기준 · 7월 반·9월 반 · 분납 조건" },
    { t: "재산세 납부 주택 토지 세율은 얼마인가요?", sub: "공시가격 × 60% · 세율 구간 · 세부담 상한" },
    { t: "재산세 납부 감면은 어떤 경우에 받나요?", sub: "1세대 1주택 · 공정시장가액 · 세액 공제" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "재산세 계산기", desc: "공시가격 기준 납부액 계산", href: "/w/재산세-계산기", hot: true },
              { icon: "📋", label: "종합부동산세 기준", desc: "종부세 합산 납부 확인", href: "/w/종합부동산세-기준" },
              { icon: "🏠", label: "취득세 계산기", desc: "부동산 취득세 계산", href: "/w/취득세-계산기" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "종합부동산세 기준", href: "/w/종합부동산세-기준" },
              { icon: "📋", label: "취득세 감면 조건", href: "/w/생애최초-취득세-감면-조건-2026" },
              { icon: "🏢", label: "부동산 양도소득세", href: "/w/양도소득세-계산" },
              { icon: "🧾", label: "재산세 계산기", href: "/w/재산세-계산기" },
              { icon: "💰", label: "종합소득세 신고", href: "/w/종합소득세-신고기간" },
            ]}
          />
          <SidebarCalc
            items={[
              { icon: "🧮", label: "재산세 계산기", href: "/w/재산세-계산기" },
              { icon: "📊", label: "종합부동산세 계산기", href: "/w/종합부동산세-계산기" },
              { icon: "🏠", label: "취득세 계산기", href: "/w/취득세-계산기" },
              { icon: "📈", label: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
              { icon: "💼", label: "종합소득세 계산기", href: "/w/종합소득세-계산기" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반적인 세금 정보를 제공하며, 실제 세액은 공시가격 및 지자체 고지서 기준이에요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="납부 기간 확인" sub="부동산 유형·공시가격 입력하면 즉시 확인" />
      <CheckerShell title="내 재산세 납부 기간이 언제인가요?" result={getResult()}>
        <CheckerQ
          q="부동산 유형은 무엇인가요?"
          opts={[
            { label: "주택 (아파트·단독주택 등)", value: "house" },
            { label: "토지", value: "land" },
            { label: "상가·건물", value: "building" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="공시가격(공시지가)은 얼마인가요?"
          opts={[
            { label: "1억원 미만", value: "under100m" },
            { label: "1억~3억원", value: "100to300m" },
            { label: "3억원 이상", value: "over300m" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="주택 보유 수는 몇 채인가요?"
          opts={[
            { label: "1주택 (1세대 1주택)", value: "one" },
            { label: "2주택 이상", value: "multi" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="2026년 재산세 고지서를 받으셨나요?"
          opts={[
            { label: "7월 고지서 받았어요", value: "july" },
            { label: "9월 고지서 받았어요", value: "sept" },
            { label: "둘 다 받았어요", value: "both" },
            { label: "아직 안 받았어요", value: "not_yet" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="재산세 납부 기간을 확인했다면, 실제 납부액이 얼마인지 계산해봐요."
        href="/w/재산세-계산기"
        label="재산세 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="재산세 납부 기간은 2026년 언제인가요?" sub="7월 31일 · 9월 30일 · 주택·토지 구분" />
      <P>2026년 재산세 납부 기간은 부동산 종류에 따라 달라요. 주택은 <B>7월 31일과 9월 30일</B> 두 번 납부하고, 토지는 <B>9월 30일</B> 한 번만 납부해요. 상가·건물 건축물분 재산세는 7월 31일에 납부해요.</P>
      <P>납부 기한이 토요일이나 공휴일이면 다음 영업일로 연장돼요. 위택스(wetax.go.kr), ARS(1899-0341), 인터넷뱅킹, 편의점 등 다양한 방법으로 납부할 수 있어요.</P>
      <P>재산세는 매년 6월 1일을 기준으로 소유자가 납부해요. 6월 1일 이전에 부동산을 매도했다면 세금 부담 없이 넘길 수 있어요. 매수자라면 6월 2일 이후에 잔금을 치르면 그해 재산세를 피할 수 있어요.</P>
      <P>고지서는 납부 기한 약 20~30일 전에 우편이나 전자 통지로 발송돼요. 전자 고지를 신청하면 세액의 500원~200원을 공제해줘요. 고지서를 못 받았더라도 위택스에서 직접 조회하고 납부할 수 있어요.</P>

      <TableTitle>2026년 재산세 납부 기간 일정</TableTitle>
      <TH cols={["부동산 구분", "1차 납부", "2차 납부", "비고"]} />
      <THL rows={[
        ["주택 (건축물분)", "7월 31일", "9월 30일", "세액 20만원 이하 → 7월 전액"],
        ["토지", "—", "9월 30일", "토지 전체 9월 납부"],
        ["상가·건물 건축물분", "7월 31일", "—", "7월 한 번"],
        ["선박·항공기", "7월 31일", "—", "한 번 납부"],
      ]} />
      <TableNote>재산세 = 주택분 + 토지분. 공시가격 기준으로 지자체가 부과해요.</TableNote>

      <InlineLink
        icon="🧮"
        title="재산세 계산기"
        desc="공시가격 입력하면 예상 납부액 자동 계산"
        href="/w/재산세-계산기"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="재산세 납부 주택은 왜 두 번 내나요?" sub="20만원 기준 · 7월 반·9월 반 · 분납 조건" />
      <P>주택 재산세는 연간 세액을 반으로 나눠 7월과 9월에 각각 납부해요. 이는 납세자의 납부 부담을 줄여주기 위한 제도예요. 한 번에 큰 금액을 내는 게 부담스러울 수 있으니 두 번으로 나눈 거예요.</P>
      <P>단, <B>연간 재산세가 20만원 이하면 7월에 전액</B>을 한 번에 부과해요. 이 경우 9월 고지서는 발행되지 않아요. 세액이 적으면 두 번 납부하는 게 오히려 번거로울 수 있어서 간소화한 거예요.</P>
      <P>재산세가 500만원을 초과하면 분납 신청이 가능해요. 납부 기한 이내에 일부만 내고, 나머지는 2개월 이내에 낼 수 있어요. 분납 신청은 위택스나 구청 세무과에서 납부 기한 전에 해야 해요.</P>
      <P>고지서에 적힌 금액이 맞는지 꼭 확인해요. 납세자가 잘못된 세액을 내도 이의 신청이 가능하지만 번거로워요. 공시가격이 조정되거나 용도 변경이 있었다면 세액이 달라질 수 있어요.</P>

      <SpokeLink
        num="01"
        title="종합부동산세 기준 확인"
        desc="재산세와 함께 종부세 대상인지 확인"
        href="/w/종합부동산세-기준"
      />

      <RelatedMid
        cards={[
          { title: "재산세 계산기", desc: "주택·토지 납부액 계산", href: "/w/재산세-계산기" },
          { title: "취득세 감면 조건", desc: "생애최초 취득세 혜택", href: "/w/생애최초-취득세-감면-조건-2026" },
          { title: "양도소득세 계산", desc: "부동산 양도 시 세금 계산", href: "/w/양도소득세-계산" },
        ]}
        hubHref="/w/세금"
        hubLabel="세금 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="재산세 납부 주택 토지 세율은 얼마인가요?" sub="공시가격 × 60% · 세율 구간 · 세부담 상한" />
      <P>재산세 계산 기준은 <B>공시가격 × 공정시장가액비율(주택 60%)</B>이에요. 공시가격 3억원 주택이라면 3억 × 60% = 1억 8천만원이 과세표준이 돼요. 이 과세표준에 세율을 적용해요.</P>
      <P>주택 재산세율은 과세표준에 따라 달라요. 6천만원 이하 0.1%, 6천만~1억5천만원 0.15%, 1억5천만~3억원 0.25%, 3억원 초과 0.4%예요. 누진세율이므로 구간별로 계산해요.</P>
      <P>세부담 상한제도가 있어요. 전년도 대비 재산세가 일정 비율 이상 오르지 않도록 제한해요. 공시가격 3억원 이하는 105%, 3억~6억은 110%, 6억 초과는 130%가 상한이에요. 갑자기 세금이 급등하는 걸 막아줘요.</P>
      <P>토지는 종류에 따라 세율이 달라요. 농지·목장용지 같은 분리과세 토지는 0.07~0.2%이고, 별도합산과세 토지는 0.2~0.4%, 종합합산과세 토지는 0.2~0.5%예요.</P>

      <FormulaCard
        formula="재산세 = 공시가격 × 60%(공정시장가액비율) × 세율"
        note="예) 공시가격 3억원 주택 → 3억 × 60% = 1.8억 과세표준 → 세율 0.25% 구간 → 연간 약 27만원"
      />

      <CaseBox
        cases={[
          {
            name: "공시가 1억원 이씨",
            detail: "주택 · 공정시장가액비율 60% · 과세표준 6천만원",
            result: "재산세 = 6천만 × 0.1% = 6만원 → 7월에 전액 납부",
          },
          {
            name: "공시가 3억원 김씨",
            detail: "주택 · 과세표준 1.8억원",
            result: "재산세 ≈ 27만원 → 7월 13.5만 · 9월 13.5만 납부",
          },
          {
            name: "공시가 8억원 박씨",
            detail: "주택 · 과세표준 4.8억원",
            result: "재산세 ≈ 138만원 → 7월 69만 · 9월 69만 납부 + 종부세 별도",
          },
        ]}
      />

      <Info type="warn">
        공시가격 9억원 초과 1주택자는 종합부동산세(종부세) 대상이에요. 재산세와 별도로 12월에 고지서가 발송돼요.
      </Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="재산세 납부 감면은 어떤 경우에 받나요?" sub="1세대 1주택 · 공정시장가액 · 세액 공제" />
      <P>1세대 1주택자는 공시가격 9억원 이하인 경우 재산세 특례세율이 적용돼요. 일반 세율보다 낮은 특례세율(0.05%~0.35%)로 계산해서 세금 부담이 줄어요. 다주택자나 법인은 특례 적용이 안 돼요.</P>
      <P>임시 감면 제도도 있어요. 공시가격이 급등한 시기에 정부가 한시적으로 공정시장가액비율을 45%로 낮춰 과세표준을 줄여준 사례가 있어요. 2026년 적용 여부는 행정안전부 고시를 확인해야 해요.</P>
      <P>장애인이나 국가유공자 등은 지자체별로 추가 감면 혜택이 있어요. 재산세 50% 감면이나 전액 면제 사례도 있어요. 신청은 매년 납부 기한 전에 구청 세무과에 해야 하고, 자동 적용이 아니에요.</P>
      <P>국민주택규모(85㎡) 이하 주택을 신축하거나 취득하면 일정 기간 재산세 감면 혜택도 있어요. 세금 감면은 자동으로 적용되지 않는 경우가 많으니, 내 상황에 맞는 감면을 직접 신청해야 해요.</P>

      <SpokeLink
        num="02"
        title="생애최초 취득세 감면 조건 2026"
        desc="주택 취득 시 취득세와 재산세 감면 확인"
        href="/w/생애최초-취득세-감면-조건-2026"
      />

      <InlineLink
        icon="📋"
        title="종합부동산세 기준 확인"
        desc="공시가격 9억 초과 시 종부세 납부 확인"
        href="/w/종합부동산세-기준"
      />

      <ExtBtn href="https://www.wetax.go.kr" label="위택스 공식" text="재산세 조회·납부 바로가기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "재산세 계산기", href: "/w/재산세-계산기" },
          { title: "종합부동산세 기준", href: "/w/종합부동산세-기준" },
          { title: "생애최초 취득세 감면 조건", href: "/w/생애최초-취득세-감면-조건-2026" },
          { title: "양도소득세 계산 방법", href: "/w/양도소득세-계산" },
          { title: "종합소득세 신고 기간", href: "/w/종합소득세-신고기간" },
        ]}
      />
      <PrevNext
        prev={{ title: "프리랜서 3.3% 원천징수 환급", href: "/w/프리랜서-3.3-원천징수-환급" }}
        next={{ title: "상가 임대차보호법 환산보증금", href: "/w/상가-임대차보호법-환산보증금" }}
      />
    </BlogLayout>
  );
}

export { meta };
