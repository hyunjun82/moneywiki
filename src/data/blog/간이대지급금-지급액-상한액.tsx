"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  InlineLink, ExtBtn, TableTitle, TableNote,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc, BridgeCard,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "간이대지급금 임금 퇴직금 합산 계산 | 700만원 초과 소송 처리",
  description:
    "간이대지급금은 임금과 퇴직금을 합쳐서 최대 얼마까지 받을 수 있는지 알고 계셨나요? 합산 상한 700만원 기준과 항목별 계산 예시를 알려드려요.",
  category: "임금",
  keywords: [
    "간이대지급금 지급액 항목별 상한",
    "간이대지급금 최저임금 220만원 적용",
    "간이대지급금 임금 퇴직금 합산 예시",
    "간이대지급금 초과 민사소송 지급명령",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "임금·퇴직금·휴업수당 합산 최대 700만원 지급 (2026년 기준)",
    "항목별 상한 — 임금 220만원×3개월, 퇴직금 220만원×3년분",
    "700만원 초과분은 민사소송 또는 지급 명령으로 별도 청구",
  ],
  sources: [
    { name: "임금채권보장법 시행령 - 간이대지급금 상한액", url: "https://www.law.go.kr/법령/임금채권보장법시행령", date: "2026-02" },
    { name: "근로복지공단 체당금 지급 기준", url: "https://www.comwel.or.kr", date: "2026-02" },
  ],
  faq: [
    { q: "간이대지급금 지급액이 실제 체불 금액보다 낮으면 어떻게 하나요?", a: "700만원 상한을 초과하는 금액은 민사소송으로 별도 청구해야 해요. 법원에 임금청구 소송을 제기하거나 소액사건으로 지급 명령을 신청할 수 있어요. 체불확인서가 이미 있어서 소송 증거가 확보된 상태예요." },
    { q: "간이대지급금 임금 퇴직금 중 하나만 체불됐어도 신청 가능한가요?", a: "네, 임금만 체불됐거나 퇴직금만 체불됐어도 신청 가능해요. 체불된 항목 전체를 합산해서 700만원 한도 내에서 지급돼요." },
  ],
};

type Sel = Record<string, string>;

function getResult(sel: Sel): string | null {
  const { item, amount } = sel;
  if (!item || !amount) return null;
  if (amount === "under700") {
    if (item === "wage") return "wage_full";
    if (item === "retire") return "retire_full";
    return "both_full";
  }
  if (item === "both") return "both_over";
  return "single_over";
}

export default function Article110() {
  const [sel, setSel] = useState<Sel>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const toc = [
    { t: "STEP 01 예상 지급액 확인", sub: "체불 항목 · 금액 규모" },
    { t: "간이대지급금 지급액 상한 기준", sub: "항목별 상한 · 700만원 합산 상한" },
    { t: "임금 퇴직금 합산 계산 예시", sub: "실제 체불액 vs 상한액 비교" },
    { t: "상한 기준 최저임금 220만원 적용", sub: "월급 차이 · 시급제 계산" },
    { t: "700만원 초과 시 나머지 받는 방법", sub: "소액소송 · 지급 명령 신청" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "노동·임금", "체불임금", "간이대지급금"]}
      tags={["2026년 최신", "체불임금", "대지급금"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>임금과 퇴직금이 둘 다 밀렸다면 합산해서 <B>최대 700만원</B>을 받을 수 있어요. 항목별 상한 기준과 <B>700만원 초과 시 소송 방법</B>까지 정리했어요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법 시행령·근로복지공단", date: "2026.02" }}
      stickyLabel="합산 상한액"
      stickyValue="최대 700만원"
      stickyBtn="근로복지공단 신청"
      stickyHref="https://www.comwel.or.kr"
      disclaimer="이 글은 임금채권보장법 시행령·근로복지공단 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA items={[
            { icon: "💰", title: "간이대지급금 신청", sub: "체불 임금 최대 700만원", href: "https://www.comwel.or.kr", hot: true },
            { icon: "📋", title: "간이대지급금 신청 방법", sub: "체불확인서 발급 → 신청 절차", href: "/w/간이대지급금-신청-방법-절차" },
            { icon: "💰", title: "퇴직금 지연이자 계산", sub: "연 20% 지연이자 청구 방법", href: "/w/퇴직급여-지급-지연이자-받기" },
          ]} />
          <SidebarDocs items={[
            { title: "간이대지급금 신청 방법", cat: "임금·체불", href: "/w/간이대지급금-신청-방법-절차" },
            { title: "퇴직금 지연이자 계산", cat: "퇴직·임금", href: "/w/퇴직급여-지급-지연이자-받기" },
            { title: "학력 위조 해고 정당성", cat: "노동·해고", href: "/w/학력-거짓-해고-정당성" },
          ]} />
          <SidebarCalc items={[
            { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
            { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          ]} />
        </>
      }
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        q="임금이랑 퇴직금이 둘 다 밀렸어요. 합쳐서 얼마나 받을 수 있나요?"
        a="임금·퇴직금 합산해서 최대 700만원까지예요. 아래에서 내 상황을 선택해 예상 수령액을 확인해 보세요."
        label="예상 지급액 확인"
        href="#checker"
      />

      {/* STEP 01 */}
      <Sec n="01" id="checker" title="STEP 01 예상 지급액 확인" sub="체불 항목 · 금액 규모">
        <CheckerShell title="간이대지급금 지급액 얼마나 받을 수 있나요?" sub="30초 확인">
          <CheckerQ
            n="1"
            label="체불된 항목이 어떻게 되나요?"
            group="item"
            opts={[
              ["wage", "월급(임금)이 밀렸어요"],
              ["retire", "퇴직금이 안 들어왔어요"],
              ["both", "임금과 퇴직금 모두 못 받았어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="체불 금액이 얼마나 되나요?"
            group="amount"
            opts={[
              ["under700", "700만원 이하예요"],
              ["over700", "700만원을 넘어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          {result === "wage_full" && (
            <ResultPass title="체불 임금 전액을 받을 수 있어요">
              <P>임금 체불 금액이 700만원 이하라면 전액 지급돼요. 다만 월 220만원 × 최대 3개월(660만원)이 임금 상한이에요. 실제 월급이 220만원을 초과하면 초과분은 상한 적용을 받아요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "임금 상한", pass: true, desc: "220만원×3개월=660만원" },
                { icon: "✅", name: "700만원 이하", pass: true, desc: "전액 수령 가능" },
                { icon: "📋", name: "신청 경로", pass: true, desc: "근로복지공단" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 신청" desc="간이대지급금 접수하기" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "retire_full" && (
            <ResultPass title="퇴직금 체불액을 받을 수 있어요">
              <P>퇴직금 상한은 월 220만원 × 최대 3년 분이에요. 3년 이내 재직이라면 실제 퇴직금이 상한 내일 가능성이 높아요. 700만원 이하라면 전액 신청이 가능해요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "퇴직금 상한", pass: true, desc: "220만원×3년분" },
                { icon: "✅", name: "700만원 이하", pass: true, desc: "전액 수령 가능" },
                { icon: "📋", name: "신청 경로", pass: true, desc: "근로복지공단" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 신청" desc="간이대지급금 접수하기" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "both_full" && (
            <ResultPass title="합산 700만원 이하면 전액 받을 수 있어요">
              <P>임금과 퇴직금을 합산해서 700만원 이하라면 전액 지급돼요. 항목별 상한(임금 660만원, 퇴직금 상한)도 각각 적용되지만, 합산 700만원 이내라면 전액 수령 가능해요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "합산 상한 이하", pass: true, desc: "700만원 내 전액" },
                { icon: "✅", name: "항목별 상한", pass: true, desc: "각각 적용" },
                { icon: "📋", name: "신청 경로", pass: true, desc: "근로복지공단" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 신청" desc="간이대지급금 접수하기" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "single_over" && (
            <ResultFail title="700만원까지만 지급, 초과분은 소송이 필요해요">
              <P>간이대지급금은 최대 700만원이에요. 체불 금액이 700만원을 초과하면 700만원까지만 받고, 나머지는 민사소송으로 청구해야 해요. 체불확인서가 이미 있어서 소송 시 증거로 활용할 수 있어요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "700만원", pass: true, desc: "한도 내 지급" },
                { icon: "⚠️", name: "초과분", pass: false, desc: "민사소송 필요" },
                { icon: "📋", name: "소액소송", pass: true, desc: "3,000만원 이하 간편" },
              ]} />
              <ResultCTA icon="📋" title="소액사건 소송 안내" desc="초과분 청구 방법 확인" href="https://www.scourt.go.kr" />
            </ResultFail>
          )}
          {result === "both_over" && (
            <ResultFail title="합산 700만원 한도, 초과분은 소송 필요해요">
              <P>임금과 퇴직금 합산이 700만원을 초과하면 그 한도까지만 받아요. 항목별로 수령 우선순위를 정해서 신청하는 게 유리할 수 있어요. 700만원 초과분은 민사소송이나 지급 명령으로 청구하세요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "700만원", pass: true, desc: "한도 내 지급" },
                { icon: "⚠️", name: "초과분", pass: false, desc: "민사소송 병행" },
                { icon: "📋", name: "우선순위", pass: true, desc: "공단 상담 필요" },
              ]} />
              <ResultCTA icon="📞" title="근로복지공단 상담" desc="항목별 수령 우선순위 확인" href="https://www.comwel.or.kr" />
            </ResultFail>
          )}
          {!result && (
            <ResultFail title="체불 항목을 선택해 주세요">
              <P>체불된 항목과 금액대를 선택하면 예상 지급액을 안내해 드려요.</P>
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>
      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="limit" title="간이대지급금 지급액 상한 기준" sub="항목별 상한 · 700만원 합산 상한">
        <P><B>전체 상한은 700만원이에요.</B> 그 안에서 항목별 상한도 각각 적용돼요. <A href="https://www.law.go.kr/법령/임금채권보장법시행령">임금채권보장법 시행령</A>에서 정한 기준이에요.</P>
        <P>월 220만원은 2026년 기준 최저임금 월환산액 기준이에요. 실제 월급이 220만원을 초과하면 초과분에 대해서는 보장이 안 돼요. 월급 400만원을 3개월 못 받았다면 체불액 1,200만원 중 220만원×3=660만원까지만 받아요.</P>
        <P>전체 합산 한도 700만원이 우선 적용돼요. 임금과 퇴직금 각각의 항목별 상한이 있어도, 합산이 700만원을 넘으면 700만원까지만 받아요. 700만원 초과분은 민사소송으로 별도 청구해야 해요.</P>
        <P>휴업수당도 포함돼요. 휴업수당은 월 154만원(최저임금의 70%) × 최대 3개월 = 462만원이 상한이에요. 임금·퇴직금·휴업수당 모두 합산해서 700만원 이내예요.</P>

        <H3>항목별 상한 정리</H3>
        <TableTitle>간이대지급금 항목별 상한액 (2026년 기준)</TableTitle>
        <table>
          <thead><tr>
            <th>항목</th><th>상한 기준</th><th>최대 금액</th>
          </tr></thead>
          <tbody>
            <tr><td>임금</td><td>월 220만원 × 최대 3개월</td><td>660만원</td></tr>
            <tr><td>퇴직금</td><td>월 220만원 × 최대 3년분</td><td>630만원(3년분)</td></tr>
            <tr><td>휴업수당</td><td>월 154만원 × 최대 3개월</td><td>462만원</td></tr>
            <tr><td>합산 상한</td><td>—</td><td>최대 700만원</td></tr>
          </tbody>
        </table>
        <TableNote>실제 체불액이 상한보다 낮으면 실제 체불액 기준으로 지급</TableNote>
      </Sec>
      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="calc" title="임금 퇴직금 합산 계산 예시" sub="실제 체불액 vs 상한액 비교">
        <P><B>실제 체불액과 상한액 중 낮은 금액이 기준이에요.</B> 계산 예시를 보면 이해가 쉬워요.</P>
        <P>예시 1 — 700만원 이내 전액 수령. 월급 200만원×2개월 체불(400만원) + 퇴직금 180만원 체불. 합산 580만원으로 700만원 이하라서 전액 지급돼요.</P>
        <P>예시 2 — 상한 적용. 월급 300만원×3개월 체불. 실제 체불액 900만원이지만 상한 적용 시 220만원×3=660만원이에요. 700만원 이하라서 660만원 지급돼요.</P>
        <P>예시 3 — 합산 한도 초과. 월급 250만원×3개월 체불 + 퇴직금 250만원 체불. 임금 상한 660만원 + 퇴직금 250만원 = 910만원이지만 전체 합산 700만원이 우선 적용돼 700만원만 받아요. 항목을 어떤 순서로 신청하느냐에 따라 실제 수령액이 달라질 수 있어서 공단 상담이 중요해요.</P>
      </Sec>

      <RelatedMid
        items={[
          { icon: "📋", title: "간이대지급금 신청 방법", desc: "체불확인서 발급부터 근로복지공단 신청까지", href: "/w/간이대지급금-신청-방법-절차" },
          { icon: "💰", title: "퇴직금 지연이자 계산", desc: "퇴직금 14일 초과 미지급 시 연 20% 지연이자", href: "/w/퇴직급여-지급-지연이자-받기" },
        ]}
        hubHref="/w/실업급여"
        hubLabel="실업급여 허브 → 전체 내용 보기"
      />
      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="minimum" title="상한 기준 최저임금 220만원 적용" sub="월급 차이 · 시급제 계산">
        <P><B>실제 임금이 220만원 이하라면 실제 임금 기준으로 계산돼요.</B> 상한은 넘을 수 없는 최대치지, 무조건 220만원을 지급하는 게 아니에요.</P>
        <P>최저임금도 못 받은 경우에는 실제 받아야 할 임금을 기준으로 계산해요. 월급 180만원을 3개월 못 받았다면 체불액 540만원 전액을 지급받을 수 있어요. 상한인 220만원×3=660만원보다 실제 체불액이 낮으니 체불액 전액이에요.</P>
        <P>시급제나 일급제 근로자는 계산이 조금 달라요. 실제로 일한 시간과 시급을 기준으로 체불 임금을 계산하고, 그 금액을 월 환산해서 상한과 비교해요. 근로복지공단에서 실제 계산을 도와줘요.</P>
        <P>퇴직금 계산에서 3년이 넘는 장기 근속자는 3년 초과 퇴직금 부분이 간이대지급금 범위 밖이에요. 5년 재직 후 퇴직금 전체가 체불됐어도 700만원 한도 내에서만 간이대지급금으로 받을 수 있어요.</P>
      </Sec>
      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="exceed" title="700만원 초과 시 나머지 받는 방법" sub="소액소송 · 지급 명령 신청">
        <P><B>민사소송이나 지급 명령 신청이 방법이에요.</B> 700만원 초과분은 법원을 통해 청구해야 해요. 체불확인서와 간이대지급금 지급 내역이 이미 있어서 증거 준비가 훨씬 쉬워요.</P>
        <P>소액사건 소송(3,000만원 이하)은 비교적 간단하게 처리돼요. 법원에 소장을 제출하면 사업주에게 지급 명령이 내려져요. 이의 없이 확정되면 사업주 재산을 압류할 수 있어요.</P>
        <P>지급 명령 신청도 있어요. 법원에 지급 명령을 신청하면 사업주에게 지급하라는 명령이 내려져요. 사업주가 이의를 제기하지 않으면 바로 강제집행이 가능해요. 비용이 적고 빠른 게 장점이에요.</P>
        <P>두 가지 방법을 병행하는 경우도 많아요. 간이대지급금으로 700만원을 먼저 받고, 그다음 초과분에 대해 소액소송이나 지급 명령으로 청구하면 생활비를 빨리 확보하면서 나머지도 추가로 받을 수 있어요.</P>

        <InlineLink
          icon="📋"
          title="간이대지급금 신청 방법"
          desc="체불확인서 발급부터 근로복지공단 신청까지 단계별 안내"
          href="/w/간이대지급금-신청-방법-절차"
        />

        <ExtBtn
          badge="근로복지공단 공식"
          text="간이대지급금 지급 기준 및 신청"
          cta="신청하기 →"
          href="https://www.comwel.or.kr"
        />
      </Sec>
      <Divider />

      <FAQAccordion items={meta.faq.map((f) => ({ q: f.q, a: f.a }))} />
      <RelatedArticles items={[
        { title: "간이대지급금 신청 방법", desc: "체불확인서 발급부터 근로복지공단 신청까지", href: "/w/간이대지급금-신청-방법-절차" },
        { title: "퇴직금 지연이자 계산", desc: "퇴직금 미지급 시 연 20% 지연이자 청구 방법", href: "/w/퇴직급여-지급-지연이자-받기" },
      ]} />
      <PrevNext
        prev={{ title: "간이대지급금 신청 방법 절차", href: "/w/간이대지급금-신청-방법-절차" }}
        next={{ title: "대지급금 연차 상여금 포함 계산", href: "/w/대지급금-금액-계산-연차-상여금" }}
      />
    </BlogLayout>
  );
}
