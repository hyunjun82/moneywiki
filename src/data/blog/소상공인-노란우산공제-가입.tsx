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
  title: "소상공인 노란우산공제 가입 조건 | 연간 소득공제 금액 절세 혜택",
  description: "노란우산공제에 가입하면 연간 최대 500만원 소득공제를 받을 수 있어요. 소상공인이라면 사업 폐업이나 노후 대비용으로 활용할 수 있는 절세 상품이에요. 가입 조건과 실제 절세 효과를 알려드려요.",
  category: "근로/노동",
  keywords: [
    "소상공인 노란우산공제 가입 조건",
    "소상공인 노란우산공제 소득공제 금액 500만원",
    "소상공인 노란우산공제 해지 불이익 주의사항",
    "소상공인 노란우산공제 납입금 절세 계산",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "노란우산공제 납입금은 연간 <strong>최대 500만원까지 소득공제</strong>를 받을 수 있어요.",
    "가입 대상은 <strong>소기업·소상공인</strong>으로, 법인 대표도 가입 가능해요.",
    "폐업·사망·노령·질병 등 사유 발생 시 <strong>퇴직금처럼 공제금을 수령</strong>해요.",
  ],
  sources: [
    { name: "중소기업중앙회 노란우산공제", url: "https://www.publicportal.or.kr", date: "2026-02" },
  ],
  faq: [
    { q: "소상공인 노란우산공제에 가입하면 세금이 얼마나 줄어드나요?", a: "소득 구간에 따라 다르지만, 연 소득 4,000만원이고 500만원을 납입하면 세율 15%로 약 75만원 세금이 줄어요. 여기에 지방소득세 7.5만원을 더하면 총 82.5만원 절세 효과예요." },
    { q: "소상공인 노란우산공제를 중도에 해지하면 불이익이 있나요?", a: "임의 해지(본인 희망 해지)는 원금 손실 없이 해지 환급금을 받을 수 있어요. 단, 납입 기간이 짧을수록 환급률이 낮아요. 3년 이내 해지 시 이자 손실이 커요. 법정 해지 사유(폐업, 질병 등)는 불이익이 없어요." },
  ],
  ctaCard: {
    label: "절세 계산",
    mainText: "노란우산공제 절세 효과 계산",
    subText: "소득·납입금 입력하면 즉시 계산",
    url: "/w/노란우산공제-절세-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "프리랜서 3.3% 원천징수 환급", url: "/w/프리랜서-3.3-원천징수-환급" },
    { title: "종합소득세 신고 기간", url: "/w/종합소득세-신고기간" },
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

    const bizType = q1;    // "sole" | "corp_ceo" | "employee"
    const income = q2;     // "under4000" | "4000to1e" | "over1e" (만원)
    const payment = q3;    // "min" | "medium" | "max" (납입금 수준)
    const years = q4;      // "long" | "medium" | "short"

    if (bizType === "employee") {
      const gridItems = [
        { label: "가입 가능 여부", value: "불가 — 근로소득자", ok: false },
        { label: "가입 대상", value: "소기업·소상공인만", ok: false },
        { label: "대안", value: "IRP 또는 연금저축", ok: true },
        { label: "절세 방법", value: "연말정산 공제 항목 활용", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "연말정산 절세 방법", desc: "근로소득자 절세 공제 항목 확인", href: "/w/연말정산-절세" },
        { icon: "🧮", title: "종합소득세 계산기", desc: "소득세 부담 계산", href: "/w/종합소득세-계산기" },
      ];
      return (
        <ResultFail title="근로소득자는 노란우산공제 가입 불가">
          <ResultGrid items={gridItems} />
          <P>노란우산공제는 소기업·소상공인 사업자 전용이에요. 직장인은 가입이 안 돼요. IRP나 연금저축으로 노후 대비와 절세를 동시에 할 수 있어요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    const deductionMax = income === "under4000" ? 500 : income === "4000to1e" ? 300 : 200;
    const taxRate = income === "under4000" ? 15 : income === "4000to1e" ? 24 : 35;
    const taxSave = Math.round(deductionMax * taxRate / 100 * 1.1); // 지방소득세 포함

    const gridItems = [
      { label: "가입 가능 여부", value: "가입 가능", ok: true },
      { label: "최대 소득공제", value: `${deductionMax}만원`, ok: true },
      { label: "예상 절세 효과", value: `연 약 ${taxSave}만원`, ok: true },
      { label: "납입 유지 권장", value: years === "long" ? "적합 — 장기 유리" : "주의 — 단기 해지 시 손실", ok: years === "long" },
    ];
    const links: ResLink[] = [
      { icon: "🧮", title: "노란우산공제 절세 계산기", desc: "실제 절세 효과 정확히 계산", href: "/w/노란우산공제-절세-계산기" },
      { icon: "📋", title: "종합소득세 신고 기간", desc: "공제 신청 방법과 신고 일정", href: "/w/종합소득세-신고기간" },
    ];
    return (
      <ResultPass title="노란우산공제 가입 추천이에요">
        <ResultGrid items={gridItems} />
        <P>연간 최대 {deductionMax}만원 소득공제로 약 {taxSave}만원을 절세할 수 있어요. 5년 이상 장기 유지하면 이자 혜택까지 더해져요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { t: "STEP 01 가입 효과 확인" },
    { t: "소상공인 노란우산공제 가입 조건은 무엇인가요?", sub: "소기업·소상공인 기준 · 법인 대표 · 제외 업종" },
    { t: "소상공인 노란우산공제 소득공제 금액은 얼마인가요?", sub: "500만원·300만원·200만원 소득 구간별 한도" },
    { t: "소상공인 노란우산공제 납입금 절세 계산 방법은?", sub: "세율 구간별 절세 · 실수령 효과 · 3인 사례" },
    { t: "소상공인 노란우산공제 해지 불이익과 주의사항은?", sub: "임의 해지 · 법정 해지 · 중도 해지 환급률" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "절세 계산기", desc: "노란우산공제 절세 효과 계산", href: "/w/노란우산공제-절세-계산기", hot: true },
              { icon: "📋", label: "종합소득세 신고", desc: "사업소득 신고와 공제 신청", href: "/w/종합소득세-신고기간" },
              { icon: "📊", label: "프리랜서 원천징수 환급", desc: "3.3% 환급 계산", href: "/w/프리랜서-3.3-원천징수-환급" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "프리랜서 3.3% 환급", href: "/w/프리랜서-3.3-원천징수-환급" },
              { icon: "📋", label: "종합소득세 신고 기간", href: "/w/종합소득세-신고기간" },
              { icon: "🏢", label: "간이과세자 기준 2026", href: "/w/부가가치세-간이과세자-기준-2026" },
              { icon: "🧾", label: "종합소득세 가산세", href: "/w/종합소득세-신고-안하면-가산세" },
              { icon: "💰", label: "재산세 납부 기간", href: "/w/재산세-납부-기간-2026" },
            ]}
          />
          <SidebarCalc
            items={[
              { icon: "🧮", label: "노란우산공제 절세 계산기", href: "/w/노란우산공제-절세-계산기" },
              { icon: "📊", label: "종합소득세 계산기", href: "/w/종합소득세-계산기" },
              { icon: "💼", label: "4대보험 계산기", href: "/w/4대보험-계산기" },
              { icon: "📈", label: "연봉 실수령액 계산기", href: "/w/연봉-실수령액-계산기" },
              { icon: "🏠", label: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반적인 금융 정보를 제공하며, 실제 절세 효과는 개인 상황에 따라 다를 수 있어요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="가입 효과 확인" sub="사업 유형·소득 입력하면 즉시 절세 효과 계산" />
      <CheckerShell title="노란우산공제 가입하면 얼마나 절세되나요?" result={getResult()}>
        <CheckerQ
          q="사업 형태는 무엇인가요?"
          opts={[
            { label: "개인사업자 (소상공인)", value: "sole" },
            { label: "법인 대표 (소기업)", value: "corp_ceo" },
            { label: "근로소득자 (직장인)", value: "employee" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="연간 사업 소득은 얼마인가요?"
          opts={[
            { label: "4,000만원 미만", value: "under4000" },
            { label: "4,000만~1억원", value: "4000to1e" },
            { label: "1억원 이상", value: "over1e" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="월 납입 계획은 얼마인가요?"
          opts={[
            { label: "5만~20만원 (최소)", value: "min" },
            { label: "20만~30만원 (중간)", value: "medium" },
            { label: "30만~70만원 (최대)", value: "max" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="납입 유지 기간 계획은?"
          opts={[
            { label: "5년 이상 장기 유지", value: "long" },
            { label: "3~5년", value: "medium" },
            { label: "3년 미만 단기", value: "short" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="노란우산공제는 절세와 퇴직금 대안을 동시에 해결할 수 있는 소상공인 전용 상품이에요."
        href="/w/노란우산공제-절세-계산기"
        label="절세 효과 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="소상공인 노란우산공제 가입 조건은 무엇인가요?" sub="소기업·소상공인 기준 · 법인 대표 · 제외 업종" />
      <P>노란우산공제는 <B>소기업·소상공인</B>이라면 누구나 가입할 수 있어요. 개인사업자, 법인 대표, 1인 기업 모두 가능해요. 업종과 매출 규모에 따라 소기업·소상공인 기준이 달라지는데, 대부분의 일반 사업자는 해당돼요.</P>
      <P>제외 업종도 있어요. 부동산 임대업, 유흥·향락 업종, 일부 사행성 업종은 가입이 안 돼요. 유흥주점이나 카지노 등 사회적으로 문제가 있는 업종은 지원 대상에서 제외돼요.</P>
      <P>법인 대표도 가입 가능해요. 단, 법인 대표의 경우 소기업 기준(매출 120억 이하, 업종별 다름)을 충족해야 해요. 법인 자체가 아니라 대표 개인 자격으로 가입하는 방식이에요.</P>
      <P>가입 창구는 중소기업중앙회 지역본부, 협약 금융기관(은행·상호저축은행·새마을금고 등)에서 할 수 있어요. 온라인 가입도 가능해요. 신분증과 사업자등록증이 필요해요.</P>

      <TableTitle>소상공인 노란우산공제 가입 기준</TableTitle>
      <TH cols={["사업자 유형", "가입 가능 여부", "소득공제 한도"]} />
      <THL rows={[
        ["개인사업자 (소상공인)", "가능", "최대 500만원"],
        ["법인 대표 (소기업)", "가능", "최대 500만원"],
        ["1인 자영업자", "가능", "최대 500만원"],
        ["근로소득자 (직장인)", "불가", "해당 없음"],
        ["유흥·부동산 임대업", "불가", "해당 없음"],
      ]} />
      <TableNote>소득 구간에 따라 공제 한도가 달라져요. 소득 구간별 한도는 SECTION 03 참조.</TableNote>

      <InlineLink
        icon="📋"
        title="간이과세자 기준 매출 2026"
        desc="내 사업 규모가 소상공인인지 확인"
        href="/w/부가가치세-간이과세자-기준-2026"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="소상공인 노란우산공제 소득공제 금액은 얼마인가요?" sub="500만원·300만원·200만원 소득 구간별 한도" />
      <P>소득공제 한도는 사업 소득에 따라 달라요. 사업 소득이 4,000만원 이하면 연간 납입액 중 <B>최대 500만원</B>을 공제받아요. 4,000만원 초과~1억원 이하는 300만원, 1억원 초과는 200만원이 한도예요.</P>
      <P>공제 한도 내에서 실제로 납입한 금액만큼 공제돼요. 한도가 500만원이더라도 연간 납입액이 300만원이라면 300만원만 공제돼요. 한도를 최대한 활용하려면 월 납입금 × 12개월이 한도 이상이 되어야 해요.</P>
      <P>소득공제는 종합소득세 신고 시 자동으로 반영돼요. 노란우산공제 납부확인서를 발급받아 신고 시 첨부하면 돼요. 홈택스에서도 공제 내역을 확인할 수 있어요.</P>
      <P>공제 효과는 세율 구간에 따라 달라요. 소득이 높을수록 세율이 높아서 실제 절세 금액도 커요. 반면 공제 한도는 소득이 높을수록 줄어들어요. 소득 4,000만원 이하 소상공인이 가장 큰 절세 효과를 볼 수 있어요.</P>

      <SpokeLink
        num="01"
        title="프리랜서 3.3% 원천징수 환급"
        desc="사업소득 종합소득세 환급 계산"
        href="/w/프리랜서-3.3-원천징수-환급"
      />

      <RelatedMid
        cards={[
          { title: "종합소득세 계산기", desc: "소득공제 후 세금 계산", href: "/w/종합소득세-계산기" },
          { title: "간이과세자 기준 2026", desc: "소상공인 부가세 기준 확인", href: "/w/부가가치세-간이과세자-기준-2026" },
          { title: "종합소득세 가산세", desc: "신고 안 하면 가산세 확인", href: "/w/종합소득세-신고-안하면-가산세" },
        ]}
        hubHref="/w/세금"
        hubLabel="세금 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="소상공인 노란우산공제 납입금 절세 계산 방법은?" sub="세율 구간별 절세 · 실수령 효과 · 3인 사례" />
      <P>절세 금액은 소득공제액 × 세율로 계산해요. 세율이 15%라면 500만원 공제 시 75만원, 지방소득세 포함하면 82.5만원을 아낄 수 있어요. 세율이 24%라면 300만원 × 24% = 72만원, 지방소득세 포함 79.2만원이에요.</P>
      <P>납입금 부담을 생각하면 이렇게 이해할 수 있어요. 월 42만원(연 500만원)을 납입하면 82만원을 돌려받아요. 연 순비용은 약 418만원인데, 이 금액이 나중에 목돈으로 돌아와요. 이자(연 복리 2.1% 내외)도 붙어요.</P>
      <P>납입금은 나중에 돌려받는 돈이에요. 일반 저축과 달리 세금을 낸 후 남은 돈으로 저축하는 게 아니라, 세금 내기 전 소득에서 공제하고 저축하는 효과예요. 세전 저축이라고 생각하면 돼요.</P>
      <P>이자 소득에도 세금이 붙지 않아요. 납입 기간 중 쌓이는 이자는 비과세예요. 수령 시 퇴직소득세가 부과되는데, 이 세율은 종합소득세보다 낮은 경우가 많아요.</P>

      <FormulaCard
        formula="절세 금액 = 납입금(공제 한도 내) × 소득세율 × 1.1(지방소득세 포함)"
        note="예) 연 500만원 납입, 세율 15% → 500만 × 15% × 1.1 = 82.5만원 절세"
      />

      <CaseBox
        cases={[
          {
            name: "소득 3,000만원 이씨",
            detail: "세율 15% · 연 500만원 납입 (월 42만원)",
            result: "절세 82.5만원 / 납입 500만원 → 실질 비용 연 417.5만원",
          },
          {
            name: "소득 6,000만원 김씨",
            detail: "세율 24% · 연 300만원 납입 (월 25만원)",
            result: "절세 79.2만원 / 납입 300만원 → 실질 비용 연 220.8만원",
          },
          {
            name: "소득 1.5억원 박씨",
            detail: "세율 35% · 연 200만원 납입 (월 17만원)",
            result: "절세 77만원 / 납입 200만원 → 실질 비용 연 123만원",
          },
        ]}
      />

      <Info type="warn">
        노란우산공제는 저축 기간이 짧을수록 불리해요. 임의 해지 시 환급금에서 이자가 줄어들어요. 3년 이상 유지를 권장해요.
      </Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="소상공인 노란우산공제 해지 불이익과 주의사항은?" sub="임의 해지 · 법정 해지 · 중도 해지 환급률" />
      <P>노란우산공제 해지에는 두 가지가 있어요. <B>법정 해지</B>는 폐업, 사망, 질병·부상, 노령(60세 이상) 등 불가피한 사유로 해지하는 경우예요. 법정 해지 시 공제금 전액(원금+이자)을 수령해요.</P>
      <P>임의 해지는 본인이 원해서 해지하는 경우예요. 임의 해지 시에도 원금은 보장돼요. 하지만 이자율이 낮아지고 납입 기간이 짧을수록 손실이 커요. 1년 미만 해지 시 이자를 거의 받지 못해요.</P>
      <P>수령 시 세금도 있어요. 법정 해지로 공제금을 받으면 퇴직소득세가 부과돼요. 퇴직소득세는 납입 기간이 길수록 낮아져요. 20년 이상 납입하면 세금 부담이 매우 낮아져서 실질 수익이 높아요.</P>
      <P>공제금은 압류가 금지돼요. 사업이 어려워 파산하더라도 노란우산공제 자금은 법적으로 보호받아요. 채권자가 가져갈 수 없어요. 이 점이 일반 저축과 다른 큰 장점이에요.</P>

      <SpokeLink
        num="02"
        title="종합소득세 신고 기간"
        desc="노란우산공제 소득공제 신고 방법과 일정"
        href="/w/종합소득세-신고기간"
      />

      <InlineLink
        icon="🧮"
        title="종합소득세 계산기"
        desc="공제 후 실제 납부 세금 계산"
        href="/w/종합소득세-계산기"
      />

      <ExtBtn href="https://www.publicportal.or.kr" label="중소기업중앙회 공식" text="노란우산공제 가입 안내 보기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "프리랜서 3.3% 원천징수 환급", href: "/w/프리랜서-3.3-원천징수-환급" },
          { title: "종합소득세 신고 기간", href: "/w/종합소득세-신고기간" },
          { title: "간이과세자 기준 매출 2026", href: "/w/부가가치세-간이과세자-기준-2026" },
          { title: "종합소득세 무신고 가산세", href: "/w/종합소득세-신고-안하면-가산세" },
          { title: "재산세 납부 기간 2026", href: "/w/재산세-납부-기간-2026" },
        ]}
      />
      <PrevNext
        prev={{ title: "생애최초 취득세 감면 조건", href: "/w/생애최초-취득세-감면-조건-2026" }}
        next={{ title: "취업후상환 학자금대출 상환", href: "/w/취업후상환-학자금대출-상환" }}
      />
    </BlogLayout>
  );
}

export { meta };
