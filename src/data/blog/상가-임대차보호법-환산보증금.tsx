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
  title: "상가 임대차보호법 환산보증금 계산 | 계약갱신 임대료 인상 한도",
  description: "상가 세입자도 계약갱신 요구권이 있어요. 환산보증금 기준을 넘으면 보호가 축소돼요. 서울 기준 환산보증금 한도와 임대료 5% 상한 규정을 알기 쉽게 정리했어요.",
  category: "부동산",
  keywords: [
    "상가 임대차보호법 환산보증금 보증금 월세",
    "상가 임대차보호법 계약갱신 요구권 행사",
    "상가 임대차보호법 임대료 인상 5% 상한",
    "상가 임대차보호법 적용 보증금 서울 금액",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "환산보증금 = 보증금 + (월세 × 100)으로 계산하고, <strong>서울 기준 9억원 이하</strong>면 상가임대차보호법이 적용돼요.",
    "계약갱신 요구권은 최초 계약 포함 <strong>10년</strong>까지 행사할 수 있어요.",
    "임대료 인상 한도는 연 <strong>5%</strong>이고, 경제 상황에 따라 추가 제한이 적용될 수 있어요.",
  ],
  sources: [
    { name: "법제처 상가건물임대차보호법", url: "https://www.law.go.kr/법령/상가건물임대차보호법", date: "2026-02" },
  ],
  faq: [
    { q: "상가 임대차보호법 환산보증금을 초과하면 계약갱신이 안 되나요?", a: "환산보증금이 기준을 초과하면 법 일부 조항만 적용돼요. 계약갱신 요구권은 환산보증금 초과 임차인에게도 인정돼요. 다만 우선변제권, 확정일자 보호 등 일부 권리는 제한될 수 있어요." },
    { q: "상가 임대차보호법 적용 지역별 환산보증금 한도가 다른가요?", a: "네, 지역별로 달라요. 서울은 9억원, 수도권 과밀억제권역은 6억9천만원, 광역시 등은 5억4천만원, 기타 지역은 3억7천만원이에요. 매년 시행령 개정으로 조정될 수 있어요." },
  ],
  ctaCard: {
    label: "환산보증금 계산",
    mainText: "내 상가 환산보증금 즉시 계산",
    subText: "보증금·월세 입력 → 보호 여부 판정",
    url: "/w/환산보증금-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "주택임대차보호법 기준", url: "/w/주택임대차보호법-기준" },
    { title: "전세보증금 반환보증", url: "/w/전세보증금-반환보증" },
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

    const region = q1;      // "seoul" | "metro" | "other"
    const deposit = q2;     // "under3" | "3to6" | "over6" (억 단위 기준값)
    const rent = q3;        // "none" | "under100" | "over100" (만원/월)
    const years = q4;       // "under5" | "5to10" | "over10"

    // 환산보증금 초과 여부 판단 (간이 계산)
    const limit = region === "seoul" ? 9 : region === "metro" ? 6.9 : 3.7; // 억
    const depositB = deposit === "under3" ? 1.5 : deposit === "3to6" ? 4.5 : 7;
    const rentB = rent === "none" ? 0 : rent === "under100" ? 0.5 * 100 / 100 : 1.5 * 100 / 100; // 억
    const converted = depositB + rentB;
    const isProtected = converted < limit;

    // 갱신 요구 가능 여부
    const canRenew = years !== "over10";

    const gridItems = [
      { label: "환산보증금", value: `약 ${converted.toFixed(1)}억원`, ok: isProtected },
      { label: "법 적용 여부", value: isProtected ? "전체 보호" : "일부 보호", ok: isProtected },
      { label: "계약갱신 요구권", value: canRenew ? "행사 가능" : "10년 초과 — 불가", ok: canRenew },
      { label: "임대료 인상 한도", value: "연 5%", ok: true },
    ];
    const links: ResLink[] = [
      { icon: "🧮", title: "환산보증금 계산기", desc: "보증금·월세 입력 → 보호 여부 판정", href: "/w/환산보증금-계산기" },
      { icon: "📋", title: "계약갱신 요구권 행사", desc: "갱신 거절 사유와 대응 방법", href: "/w/주택임대차보호법-기준" },
    ];
    return isProtected ? (
      <ResultPass title="상가임대차보호법 전체 보호 대상이에요">
        <ResultGrid items={gridItems} />
        <P>환산보증금이 지역 기준 이하라 상가임대차보호법 전체가 적용돼요. 계약갱신 요구권, 임대료 5% 상한, 우선변제권을 모두 누릴 수 있어요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    ) : (
      <ResultFail title="환산보증금 초과 — 일부만 보호돼요">
        <ResultGrid items={gridItems} />
        <P>환산보증금이 기준을 초과해요. 계약갱신 요구권은 여전히 행사할 수 있지만, 우선변제권과 확정일자 보호는 적용되지 않아요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  const toc = [
    { t: "STEP 01 환산보증금 보호 여부 확인" },
    { t: "상가 임대차보호법 환산보증금 기준은 얼마인가요?", sub: "서울 9억 · 지역별 한도 · 계산 공식" },
    { t: "상가 임대차보호법 계약갱신 요구권은 어떻게 되나요?", sub: "10년 보장 · 거절 사유 · 행사 방법" },
    { t: "상가 임대차보호법 임대료 인상 한도 5%는?", sub: "5% 상한 · 기준 시점 · 위반 시 대응" },
    { t: "상가 임대차보호법 초과 임차인의 권리는?", sub: "환산보증금 초과 · 적용 조항 · 대응 전략" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "환산보증금 계산기", desc: "보호 여부 즉시 판정", href: "/w/환산보증금-계산기", hot: true },
              { icon: "📋", label: "주택임대차보호법", desc: "주택 세입자 권리 확인", href: "/w/주택임대차보호법-기준" },
              { icon: "🏠", label: "전세보증금 반환보증", desc: "보증금 지키는 방법", href: "/w/전세보증금-반환보증" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "주택임대차보호법 기준", href: "/w/주택임대차보호법-기준" },
              { icon: "📋", label: "전세보증금 반환보증", href: "/w/전세보증금-반환보증" },
              { icon: "🏢", label: "생애최초 취득세 감면", href: "/w/생애최초-취득세-감면-조건-2026" },
              { icon: "🧾", label: "재산세 납부 기간", href: "/w/재산세-납부-기간-2026" },
              { icon: "💰", label: "양도소득세 계산", href: "/w/양도소득세-계산" },
            ]}
          />
          <SidebarCalc
            items={[
              { icon: "🧮", label: "환산보증금 계산기", href: "/w/환산보증금-계산기" },
              { icon: "📊", label: "재산세 계산기", href: "/w/재산세-계산기" },
              { icon: "🏠", label: "취득세 계산기", href: "/w/취득세-계산기" },
              { icon: "📈", label: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
              { icon: "💼", label: "종합소득세 계산기", href: "/w/종합소득세-계산기" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반적인 법률 정보를 제공하며, 개별 상황에 따라 다를 수 있어요. 정확한 판단은 법률 전문가 상담을 권장해요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="환산보증금 보호 여부 확인" sub="지역·보증금·월세 입력하면 즉시 판정" />
      <CheckerShell title="내 상가는 임대차보호법 보호를 받나요?" result={getResult()}>
        <CheckerQ
          q="상가 위치는 어느 지역인가요?"
          opts={[
            { label: "서울", value: "seoul" },
            { label: "수도권 과밀억제권역 (경기·인천 일부)", value: "metro" },
            { label: "광역시 및 기타 지역", value: "other" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="보증금은 얼마인가요?"
          opts={[
            { label: "3억원 미만", value: "under3" },
            { label: "3억~6억원", value: "3to6" },
            { label: "6억원 이상", value: "over6" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="월 임대료는 얼마인가요?"
          opts={[
            { label: "없음 (보증금만)", value: "none" },
            { label: "100만원 미만", value: "under100" },
            { label: "100만원 이상", value: "over100" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="현재 임차 기간은 얼마나 됐나요?"
          opts={[
            { label: "5년 미만", value: "under5" },
            { label: "5년~10년", value: "5to10" },
            { label: "10년 초과", value: "over10" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="환산보증금 기준을 알면 계약갱신 요구권과 임대료 인상 한도를 정확히 파악할 수 있어요."
        href="/w/환산보증금-계산기"
        label="환산보증금 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="상가 임대차보호법 환산보증금 기준은 얼마인가요?" sub="서울 9억 · 지역별 한도 · 계산 공식" />
      <P>환산보증금은 실제 내 상가가 상가임대차보호법의 보호를 받는지 판단하는 기준이에요. <B>환산보증금 = 보증금 + (월세 × 100)</B>으로 계산해요. 예를 들어 보증금 2억원에 월세 200만원이면 환산보증금은 4억원이에요.</P>
      <P>지역별 환산보증금 한도는 달라요. 서울은 9억원, 수도권 과밀억제권역(경기·인천 일부)은 6억9천만원, 광역시 및 세종·김포 등은 5억4천만원, 기타 지역은 3억7천만원이에요. 이 한도 이하면 법 전체가 적용돼요.</P>
      <P>한도를 초과해도 일부 보호는 받아요. 계약갱신 요구권은 환산보증금을 초과해도 인정돼요. 다만 보증금 반환 우선권(우선변제권)이나 소액임차인 최우선변제는 적용이 안 돼요.</P>
      <P>환산보증금 기준은 계약 체결 당시를 기준으로 해요. 나중에 임대료가 올라 한도를 초과해도 기존 계약 때 보호를 받고 있었다면 그 계약 기간은 보호가 유지돼요.</P>

      <FormulaCard
        formula="환산보증금 = 보증금 + (월세 × 100)"
        note="예) 보증금 2억 + 월세 200만원 → 2억 + 2억 = 4억원 (서울 9억 이하 → 보호 대상)"
      />

      <TableTitle>지역별 환산보증금 상한액</TableTitle>
      <TH cols={["지역", "환산보증금 상한", "해당 지역"]} />
      <THL rows={[
        ["서울", "9억원", "서울시 전 지역"],
        ["수도권 과밀억제권역", "6억 9천만원", "경기·인천 일부"],
        ["광역시·세종·김포 등", "5억 4천만원", "부산·대구·인천·광주·대전·울산"],
        ["기타 지역", "3억 7천만원", "나머지 시·군 지역"],
      ]} />
      <TableNote>시행령 개정으로 조정될 수 있어요. 관할 구청 세무과에서 확인 권장해요.</TableNote>

      <InlineLink
        icon="🧮"
        title="환산보증금 계산기"
        desc="보증금·월세 입력하면 보호 여부 자동 판정"
        href="/w/환산보증금-계산기"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="상가 임대차보호법 계약갱신 요구권은 어떻게 되나요?" sub="10년 보장 · 거절 사유 · 행사 방법" />
      <P>상가 임차인은 최초 계약 날부터 <B>10년</B>까지 계약갱신 요구권을 행사할 수 있어요. 임대인이 정당한 사유 없이 갱신을 거절하면 위법이에요. 10년을 보장받는다는 의미는 그만큼 영업 기반을 지킬 수 있다는 거예요.</P>
      <P>갱신 요구는 계약 만료 6개월 전부터 1개월 전 사이에 해야 해요. 이 기간을 놓치면 자동 갱신(묵시적 갱신) 또는 갱신 요구권 포기로 볼 수 있어요. 갱신 요구는 서면으로 남겨두는 게 좋아요.</P>
      <P>임대인이 갱신을 거절할 수 있는 정당한 사유가 있어요. 임차인이 3개월 이상 차임을 연체하거나, 건물을 훼손하거나, 임대인의 직접 사용(자가 사용) 등이 해당해요. 임대인이 직접 사용을 이유로 갱신을 거절하면 3개월 내 실제 사용해야 해요.</P>
      <P>갱신 거절에 불복하면 민사소송을 제기할 수 있어요. 임대인이 허위 사유로 갱신을 거절하면 임차인은 손해배상을 청구할 수 있어요. 갱신 요구 내용과 날짜를 증명할 수 있게 내용증명 우편을 활용하세요.</P>

      <SpokeLink
        num="01"
        title="주택임대차보호법 기준"
        desc="주거용 임대차 계약갱신 요구권 비교"
        href="/w/주택임대차보호법-기준"
      />

      <RelatedMid
        cards={[
          { title: "전세보증금 반환보증", desc: "보증금 보호 방법 확인", href: "/w/전세보증금-반환보증" },
          { title: "재산세 납부 기간", desc: "임대 상가 보유세 납부", href: "/w/재산세-납부-기간-2026" },
          { title: "생애최초 취득세 감면", desc: "상가 취득 시 세금 확인", href: "/w/생애최초-취득세-감면-조건-2026" },
        ]}
        hubHref="/w/부동산"
        hubLabel="부동산 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="상가 임대차보호법 임대료 인상 한도 5%는?" sub="5% 상한 · 기준 시점 · 위반 시 대응" />
      <P>상가임대차보호법이 적용되는 임차인은 임대료 인상을 <B>연 5% 이내</B>로 제한받아요. 전년도 임대료 대비 5%를 초과하는 인상 요구는 임차인이 거절할 수 있어요. 5%는 법정 최고 한도이고, 임대인·임차인 합의로 더 낮게 정할 수 있어요.</P>
      <P>임대료 인상은 1년에 한 번만 청구할 수 있어요. 계약 체결 또는 임대료 증액 후 1년이 지나지 않으면 추가 인상을 요구할 수 없어요. 1년이 지났더라도 5% 한도를 넘길 수 없어요.</P>
      <P>임대인이 5%를 초과하는 인상을 요구하면 임차인은 그 부분을 무효로 주장할 수 있어요. 이미 초과 금액을 냈다면 부당이득 반환을 청구할 수 있어요. 5% 초과 합의서를 써줬더라도 법 위반 부분은 무효예요.</P>
      <P>경제 상황에 따라 임시로 상한이 더 낮게 적용된 사례가 있어요. 코로나19 시기에 서울시 등 일부 지자체가 인상을 2%로 제한한 적도 있어요. 현재 적용 기준은 관할 구청이나 법제처 홈페이지에서 확인하세요.</P>

      <Info type="warn">
        5% 임대료 상한은 법 적용 대상(환산보증금 이하)인 임차인에게만 해당해요. 환산보증금 초과 임차인은 협상으로 결정해야 해요.
      </Info>

      <CaseBox
        cases={[
          {
            name: "서울 소매업 이씨",
            detail: "보증금 3억 · 월세 100만원 → 환산보증금 4억 (서울 9억 이하)",
            result: "법 전체 적용 · 임대료 5% 상한 · 10년 갱신 요구 가능",
          },
          {
            name: "부산 식당 김씨",
            detail: "보증금 3억 · 월세 300만원 → 환산보증금 6억 (광역시 5.4억 초과)",
            result: "환산보증금 초과 · 계약갱신 요구권만 행사 가능 · 5% 상한 미적용",
          },
          {
            name: "경기 서비스업 박씨",
            detail: "보증금 2억 · 월세 50만원 → 환산보증금 2.5억 (과밀억제권역 6.9억 이하)",
            result: "법 전체 적용 · 임대료 5% 상한 · 10년 갱신 요구 가능",
          },
        ]}
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="상가 임대차보호법 초과 임차인의 권리는?" sub="환산보증금 초과 · 적용 조항 · 대응 전략" />
      <P>환산보증금이 지역 기준을 초과해도 상가임대차보호법의 일부 조항은 적용돼요. <B>계약갱신 요구권</B>은 환산보증금과 상관없이 10년까지 행사할 수 있어요. 이 점은 2018년 법 개정으로 모든 상가 임차인에게 확대됐어요.</P>
      <P>그러나 우선변제권과 확정일자에 따른 보증금 보호는 환산보증금 초과 시 적용이 안 돼요. 건물이 경매로 넘어가면 보증금 회수가 어려울 수 있어요. 이럴 때는 가능한 범위 내에서 전세권 등기를 활용하는 게 대안이에요.</P>
      <P>환산보증금이 높은 임차인은 계약서 내용에 더 신경 써야 해요. 임대료 인상 상한을 계약서에 명시하거나, 특약으로 중도 퇴거 보상 조항을 넣는 것도 방법이에요. 법의 보호가 약한 만큼 계약 내용으로 보완해야 해요.</P>
      <P>분쟁이 생기면 대한법률구조공단(132), 법원 조정 제도, 상가임대차분쟁조정위원회를 이용할 수 있어요. 무료 법률 서비스도 있으니 혼자 해결하려 하지 말고 전문가의 도움을 받으세요.</P>

      <SpokeLink
        num="02"
        title="전세보증금 반환보증 가입"
        desc="보증금 못 받을 때 HUG 보증 활용 방법"
        href="/w/전세보증금-반환보증"
      />

      <InlineLink
        icon="📋"
        title="주택임대차보호법 기준"
        desc="상가와 다른 주택 임대차 보호 조건 비교"
        href="/w/주택임대차보호법-기준"
      />

      <ExtBtn href="https://www.law.go.kr/법령/상가건물임대차보호법" label="법제처 공식" text="상가건물임대차보호법 원문 보기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "환산보증금 계산기", href: "/w/환산보증금-계산기" },
          { title: "주택임대차보호법 기준", href: "/w/주택임대차보호법-기준" },
          { title: "전세보증금 반환보증 가입", href: "/w/전세보증금-반환보증" },
          { title: "재산세 납부 기간 2026", href: "/w/재산세-납부-기간-2026" },
          { title: "생애최초 취득세 감면 조건", href: "/w/생애최초-취득세-감면-조건-2026" },
        ]}
      />
      <PrevNext
        prev={{ title: "재산세 납부 기간 2026", href: "/w/재산세-납부-기간-2026" }}
        next={{ title: "생애최초 취득세 감면 조건", href: "/w/생애최초-취득세-감면-조건-2026" }}
      />
    </BlogLayout>
  );
}

export { meta };
