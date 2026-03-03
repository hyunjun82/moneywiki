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
  title: "생애최초 주택 취득세 감면 조건 2026 | 1주택 200만원 면제 계산",
  description: "생애 처음 집을 사면 취득세를 200만원까지 감면받을 수 있어요. 2026년 기준 소득·주택가격 조건과 감면 한도 계산 방법을 알기 쉽게 정리했어요.",
  category: "부동산",
  keywords: [
    "생애최초 취득세 감면 조건 2026",
    "생애최초 주택 취득세 200만원 한도",
    "생애최초 주택 취득세 감면 소득 기준",
    "생애최초 취득세 감면 불가 사례",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "생애최초 주택 취득 시 취득세를 <strong>최대 200만원</strong>까지 감면받을 수 있어요.",
    "부부 합산 소득 <strong>7,000만원 이하</strong>이고 주택가격 <strong>12억원 이하</strong>면 신청 가능해요.",
    "취득세가 200만원 이하면 <strong>전액 면제</strong>, 200만원 초과면 200만원만 감면받아요.",
  ],
  sources: [
    { name: "행정안전부 취득세 감면 안내", url: "https://www.mois.go.kr/frt/sub/a06/b09/taxExemption/screen.do", date: "2026-02" },
  ],
  faq: [
    { q: "생애최초 주택 취득세 감면은 부부 중 한 명이라도 주택을 소유한 적 있으면 안 되나요?", a: "네, 세대 구성원 전원이 주택을 소유한 적 없어야 해요. 배우자나 자녀가 과거에 주택을 소유한 사실이 있으면 감면이 안 돼요. 단, 상속으로 취득한 후 바로 처분한 경우 등 예외가 있어요." },
    { q: "생애최초 주택 취득세 감면 신청은 언제 해야 하나요?", a: "잔금 납부일(소유권 이전) 후 60일 이내에 관할 시·군·구청 세무과에 신청해야 해요. 이 기간을 넘기면 감면을 받을 수 없어요. 부동산 취득 전 미리 조건을 확인해두는 게 좋아요." },
  ],
  ctaCard: {
    label: "취득세 계산",
    mainText: "생애최초 취득세 감면 후 실납부액 계산",
    subText: "주택가격 입력하면 감면액 자동 계산",
    url: "/w/취득세-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "취득세 계산기", url: "/w/취득세-계산기" },
    { title: "재산세 납부 기간", url: "/w/재산세-납부-기간-2026" },
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

    const income = q1;     // "under5000" | "5000to7000" | "over7000"
    const price = q2;      // "under6" | "6to12" | "over12" (억)
    const firstTime = q3;  // "yes" | "no"
    const realLive = q4;   // "yes" | "no"

    // 소득 초과
    if (income === "over7000") {
      const gridItems = [
        { label: "소득 조건", value: "부부합산 7,000만원 초과", ok: false },
        { label: "주택가격 조건", value: price === "over12" ? "12억 초과 — 불가" : "충족", ok: price !== "over12" },
        { label: "생애최초 조건", value: firstTime === "yes" ? "충족" : "미충족", ok: firstTime === "yes" },
        { label: "감면 가능 여부", value: "불가 — 소득 초과", ok: false },
      ];
      const links: ResLink[] = [
        { icon: "🧮", title: "취득세 계산기", desc: "감면 없이 실납부 취득세 계산", href: "/w/취득세-계산기" },
        { icon: "📋", label: "재산세 납부 기간", desc: "보유 시 재산세 일정 확인", href: "/w/재산세-납부-기간-2026" } as any,
      ];
      return (
        <ResultFail title="소득 조건 미충족 — 감면 불가">
          <ResultGrid items={gridItems} />
          <P>부부 합산 소득이 7,000만원을 초과하면 생애최초 취득세 감면을 받을 수 없어요. 소득 조건은 취득일 전년도 기준이에요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    if (firstTime === "no" || price === "over12") {
      const gridItems = [
        { label: "소득 조건", value: "충족", ok: true },
        { label: "주택가격 조건", value: price === "over12" ? "12억 초과 — 불가" : "충족", ok: price !== "over12" },
        { label: "생애최초 조건", value: firstTime === "yes" ? "충족" : "과거 주택 소유 이력", ok: firstTime === "yes" },
        { label: "감면 가능 여부", value: "조건 미충족", ok: false },
      ];
      const links: ResLink[] = [
        { icon: "🧮", title: "취득세 계산기", desc: "일반 취득세 납부액 계산", href: "/w/취득세-계산기" },
        { icon: "📋", title: "상가임대차 환산보증금", desc: "상가 취득 시 보호 조건 확인", href: "/w/상가-임대차보호법-환산보증금" },
      ];
      return (
        <ResultFail title="감면 조건 미충족이에요">
          <ResultGrid items={gridItems} />
          <P>{price === "over12" ? "주택 가격이 12억원을 초과하면 생애최초 취득세 감면 대상이 아니에요." : "세대 구성원 중 과거에 주택을 소유한 이력이 있으면 감면을 받을 수 없어요."}</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    const gridItems = [
      { label: "소득 조건", value: "충족 (7,000만원 이하)", ok: true },
      { label: "주택가격 조건", value: "충족 (12억 이하)", ok: true },
      { label: "생애최초 조건", value: "충족", ok: true },
      { label: "감면 한도", value: "최대 200만원", ok: true },
    ];
    const links: ResLink[] = [
      { icon: "🧮", title: "취득세 계산기", desc: "감면 후 실납부액 계산", href: "/w/취득세-계산기" },
      { icon: "📋", title: "재산세 납부 기간", desc: "취득 후 재산세 납부 일정", href: "/w/재산세-납부-기간-2026" },
    ];
    return (
      <ResultPass title="생애최초 취득세 감면 대상이에요!">
        <ResultGrid items={gridItems} />
        <P>잔금 납부일 후 60일 이내에 관할 시·군·구청 세무과에 신청하면 취득세를 최대 200만원까지 감면받을 수 있어요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { t: "STEP 01 감면 대상 여부 확인" },
    { t: "생애최초 주택 취득세 감면 조건은 무엇인가요?", sub: "소득 7,000만원 · 주택 12억 · 생애최초 요건" },
    { t: "생애최초 주택 취득세 200만원 한도 계산은?", sub: "200만원 초과 시 차감 · 실납부액 계산 · 사례" },
    { t: "생애최초 주택 취득세 감면 불가 사례는?", sub: "소득 초과 · 과거 소유 이력 · 투기과열지구" },
    { t: "생애최초 주택 취득세 감면 후 주의사항은?", sub: "3년 실거주 의무 · 추징 사유 · 추징 금액" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "취득세 계산기", desc: "감면 후 실납부액 계산", href: "/w/취득세-계산기", hot: true },
              { icon: "📋", label: "재산세 납부 기간", desc: "보유 중 재산세 납부일 확인", href: "/w/재산세-납부-기간-2026" },
              { icon: "🏠", label: "환산보증금 계산기", desc: "상가 임대 보호 여부 판정", href: "/w/환산보증금-계산기" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "재산세 납부 기간 2026", href: "/w/재산세-납부-기간-2026" },
              { icon: "📋", label: "상가임대차 환산보증금", href: "/w/상가-임대차보호법-환산보증금" },
              { icon: "🏢", label: "양도소득세 계산", href: "/w/양도소득세-계산" },
              { icon: "🧾", label: "종합부동산세 기준", href: "/w/종합부동산세-기준" },
              { icon: "💰", label: "주택임대차보호법 기준", href: "/w/주택임대차보호법-기준" },
            ]}
          />
          <SidebarCalc
            items={[
              { icon: "🧮", label: "취득세 계산기", href: "/w/취득세-계산기" },
              { icon: "📊", label: "재산세 계산기", href: "/w/재산세-계산기" },
              { icon: "🏠", label: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
              { icon: "📈", label: "종합부동산세 계산기", href: "/w/종합부동산세-계산기" },
              { icon: "💼", label: "종합소득세 계산기", href: "/w/종합소득세-계산기" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반적인 세금 정보를 제공하며, 실제 감면 여부는 관할 지자체 확인이 필요해요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="감면 대상 여부 확인" sub="소득·주택가격·생애최초 조건 입력하면 즉시 판정" />
      <CheckerShell title="나는 생애최초 취득세 감면 대상인가요?" result={getResult()}>
        <CheckerQ
          q="부부 합산 소득은 얼마인가요?"
          opts={[
            { label: "5,000만원 미만", value: "under5000" },
            { label: "5,000만~7,000만원", value: "5000to7000" },
            { label: "7,000만원 초과", value: "over7000" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="취득하려는 주택 가격은?"
          opts={[
            { label: "6억원 미만", value: "under6" },
            { label: "6억~12억원", value: "6to12" },
            { label: "12억원 초과", value: "over12" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="세대 구성원 전원이 생애 처음 주택을 취득하나요?"
          opts={[
            { label: "네, 처음이에요", value: "yes" },
            { label: "아니요, 과거 소유 이력 있어요", value: "no" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="취득 후 직접 거주할 예정인가요?"
          opts={[
            { label: "네, 직접 거주할 거예요", value: "yes" },
            { label: "아니요, 임대할 예정이에요", value: "no" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="감면 대상이 확인됐다면 실제 납부할 취득세가 얼마인지 계산해봐요."
        href="/w/취득세-계산기"
        label="취득세 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="생애최초 주택 취득세 감면 조건은 무엇인가요?" sub="소득 7,000만원 · 주택 12억 · 생애최초 요건" />
      <P>생애최초 주택 취득세 감면을 받으려면 세 가지 조건을 모두 충족해야 해요. 첫째, <B>부부 합산 소득이 7,000만원 이하</B>여야 해요. 소득은 취득일 전년도 기준이에요.</P>
      <P>둘째, 취득하려는 주택 가격이 <B>12억원 이하</B>여야 해요. 실거래가 기준으로 12억원을 넘으면 감면 대상이 아니에요. 2023년 법 개정으로 기존 5억~6억원에서 12억원으로 완화됐어요.</P>
      <P>셋째, <B>세대 구성원 전원이 생애 처음 주택을 소유</B>하는 경우여야 해요. 배우자나 자녀가 과거에 주택을 소유한 이력이 있으면 안 돼요. 오피스텔이나 상가도 주택으로 간주하는 경우가 있으니 주의가 필요해요.</P>
      <P>취득 후 3개월 이내 실거주를 시작해야 해요. 실거주 조건을 지키지 않으면 감면받은 취득세 전액을 추징당해요. 감면 신청은 잔금 납부일 후 60일 이내에 관할 시·군·구청에 해야 해요.</P>

      <TableTitle>생애최초 취득세 감면 조건 요약</TableTitle>
      <TH cols={["조건 항목", "기준", "비고"]} />
      <THL rows={[
        ["부부 합산 소득", "7,000만원 이하", "전년도 기준"],
        ["주택 가격", "12억원 이하", "실거래가 기준"],
        ["생애최초 요건", "세대 구성원 전원 무주택 이력", "상속·증여 이력도 포함"],
        ["실거주 의무", "취득 후 3개월 내 전입", "3년 이상 거주 필요"],
      ]} />
      <TableNote>2023년 개정 기준이에요. 법 개정으로 조건이 바뀔 수 있어요.</TableNote>

      <InlineLink
        icon="🧮"
        title="취득세 계산기"
        desc="주택가격 입력하면 감면 후 실납부액 계산"
        href="/w/취득세-계산기"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="생애최초 주택 취득세 200만원 한도 계산은?" sub="200만원 초과 시 차감 · 실납부액 계산 · 사례" />
      <P>감면 한도는 최대 <B>200만원</B>이에요. 취득세가 200만원 이하라면 전액 면제이고, 200만원을 초과하면 200만원만 깎아줘요. 주택 가격이 높을수록 취득세도 많아져서 200만원 이상을 내야 하는 경우가 생겨요.</P>
      <P>예를 들어 6억원 주택을 사면 기본 취득세율 1%를 적용하면 600만원이에요. 여기서 200만원을 빼면 실제 납부액은 400만원이에요. 1억5천만원 주택이라면 취득세 150만원이 전액 면제돼요.</P>
      <P>취득세율은 주택 가격 구간별로 달라요. 6억 이하는 1%, 6억~9억은 2%, 9억 초과는 3%예요. 조정대상지역이면 세율이 높아질 수 있어요. 감면 혜택은 이 세율을 적용한 금액에서 200만원을 차감하는 방식이에요.</P>
      <P>농어촌특별세, 지방교육세 등 부가세도 있어요. 기본 취득세만 감면되고, 농특세와 지방교육세는 별도로 납부해야 해요. 실제 내는 총액은 취득세 감면분 + 부가세를 합산한 금액이에요.</P>

      <FormulaCard
        formula="실납부 취득세 = (주택가격 × 취득세율) - 200만원"
        note="예) 7억 주택 → 7억 × 2% = 1,400만원 → 1,400만원 - 200만원 = 1,200만원 납부"
      />

      <CaseBox
        cases={[
          {
            name: "1억5천만원 주택 이씨",
            detail: "취득세 1% 적용 → 150만원",
            result: "150만원 < 200만원 → 전액 면제 (0원 납부)",
          },
          {
            name: "5억원 주택 김씨",
            detail: "취득세 1% 적용 → 500만원",
            result: "500만원 - 200만원 = 300만원 납부",
          },
          {
            name: "10억원 주택 박씨",
            detail: "취득세 3% 적용 → 3,000만원",
            result: "3,000만원 - 200만원 = 2,800만원 납부",
          },
        ]}
      />

      <SpokeLink
        num="01"
        title="재산세 납부 기간 2026"
        desc="주택 취득 후 보유 중 재산세 납부 일정"
        href="/w/재산세-납부-기간-2026"
      />

      <RelatedMid
        cards={[
          { title: "취득세 계산기", desc: "감면 후 실납부액 계산", href: "/w/취득세-계산기" },
          { title: "재산세 납부 기간", desc: "보유 중 재산세 일정 확인", href: "/w/재산세-납부-기간-2026" },
          { title: "상가임대차 환산보증금", desc: "상가 임대 보호 조건 확인", href: "/w/상가-임대차보호법-환산보증금" },
        ]}
        hubHref="/w/부동산"
        hubLabel="부동산 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="생애최초 주택 취득세 감면 불가 사례는?" sub="소득 초과 · 과거 소유 이력 · 투기과열지구" />
      <P>가장 흔한 불가 사례는 소득 초과예요. 부부 합산 소득이 7,000만원을 넘으면 감면이 안 돼요. 맞벌이 부부라면 두 사람의 소득을 합산하기 때문에 초과하기 쉬워요.</P>
      <P>과거 주택 소유 이력도 흔한 불가 사유예요. 배우자나 세대 구성원이 이전에 주택을 소유했다면 안 돼요. 단, 상속으로 주택을 취득했다가 6개월 이내에 처분한 경우 등 예외가 있어요. 예외 사항은 지자체에 미리 확인해야 해요.</P>
      <P>실거주 목적이 아닌 투자용 취득도 문제가 될 수 있어요. 취득 후 3개월 이내에 전입신고를 하지 않으면 감면세액 전부를 추징당해요. 실거주 의사 없이 감면만 받을 목적으로 신청하면 절세가 아니라 탈세가 돼요.</P>
      <P>법인이나 공동 취득에서 개인 지분이 낮은 경우에도 제한될 수 있어요. 법인 명의 취득은 생애최초 감면 대상이 아니에요. 부모와 공동 취득 시 부모가 이미 주택을 소유하고 있으면 안 돼요.</P>

      <Info type="warn">
        감면 후 3년 이내에 주택을 매도하거나 임대하면 감면받은 세액 전액을 추징당해요. 3년 실거주는 반드시 지켜야 해요.
      </Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="생애최초 주택 취득세 감면 후 주의사항은?" sub="3년 실거주 의무 · 추징 사유 · 추징 금액" />
      <P>감면을 받았다면 <B>3년 이상 실거주</B>해야 해요. 3년 이내에 주택을 처분하거나 다른 사람에게 임대하면 감면받은 취득세 전액을 추징당해요. 이자까지 더해 납부해야 하는 경우도 있어요.</P>
      <P>추징 사유는 여러 가지예요. 3년 내 매도, 임대 전환, 전입 포기, 타 주택 취득 등이 해당돼요. 부득이한 사정(이직, 학교 진학, 자녀 양육)으로 거주하지 못하는 경우에는 지자체에 사전 신고를 하면 추징을 면할 수 있어요.</P>
      <P>추징 금액은 최초 감면받은 금액 전액이에요. 이자는 납부 지연 기간에 따라 가산돼요. 3년 후 처분할 계획이라면 감면 신청 시 이 점을 고려해야 해요. 일부러 감면받고 단기 매매하는 건 위험해요.</P>
      <P>감면 신청 후 주소지 변경 시 지자체에 알려야 해요. 자동으로 추적이 되지는 않지만, 과세당국이 3년 내 처분 이력을 발견하면 소급 추징이 가능해요. 감면 내역은 관할 지자체에서 관리해요.</P>

      <SpokeLink
        num="02"
        title="양도소득세 계산"
        desc="주택 매도 시 양도세 부담 미리 계산"
        href="/w/양도소득세-계산"
      />

      <InlineLink
        icon="📋"
        title="종합부동산세 기준 확인"
        desc="주택 보유 시 종부세 부과 기준 확인"
        href="/w/종합부동산세-기준"
      />

      <ExtBtn href="https://www.mois.go.kr/frt/sub/a06/b09/taxExemption/screen.do" label="행정안전부 공식" text="취득세 감면 안내 보기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "취득세 계산기", href: "/w/취득세-계산기" },
          { title: "재산세 납부 기간 2026", href: "/w/재산세-납부-기간-2026" },
          { title: "상가임대차 환산보증금", href: "/w/상가-임대차보호법-환산보증금" },
          { title: "양도소득세 계산", href: "/w/양도소득세-계산" },
          { title: "종합부동산세 기준", href: "/w/종합부동산세-기준" },
        ]}
      />
      <PrevNext
        prev={{ title: "상가 임대차보호법 환산보증금", href: "/w/상가-임대차보호법-환산보증금" }}
        next={{ title: "소상공인 노란우산공제 가입", href: "/w/소상공인-노란우산공제-가입" }}
      />
    </BlogLayout>
  );
}

export { meta };
