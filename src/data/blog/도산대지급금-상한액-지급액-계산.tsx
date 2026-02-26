"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  Info, InlineLink, ExtBtn, TableTitle, TableNote,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc, BridgeCard,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "도산대지급금 상한액 지급액 계산 | 최대 2100만원 한도 기준",
  description:
    "도산대지급금 상한액이 최대 2100만원이라는 사실 알고 계셨나요? 연령별 계산 방법부터 간이대지급금 700만원과 차이까지 알려드려요.",
  category: "임금",
  keywords: [
    "도산대지급금 연령별 상한액 기준",
    "도산대지급금 2100만원 임금 퇴직금 계산",
    "도산대지급금 간이대지급금 차이 비교",
    "도산대지급금 퇴직금 임금 합산 상한",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "도산대지급금 상한액은 연령에 따라 최대 2,100만원 — 50세 이상 장기 근속자에게 유리",
    "임금·퇴직금·휴업수당 합산 후 연령별 상한 적용 — 항목별 상한도 각각 있음",
    "간이대지급금(700만원)보다 3배 높아 — 회사 도산 시 도산대지급금 신청 필수",
  ],
  sources: [
    { name: "임금채권보장법 시행령 도산대지급금 상한액", url: "https://www.law.go.kr/법령/임금채권보장법시행령", date: "2026-02" },
    { name: "근로복지공단 도산 체당금 안내", url: "https://www.comwel.or.kr", date: "2026-02" },
  ],
  faq: [
    { q: "도산대지급금 2100만원 한도는 모든 사람에게 동일한가요?", a: "아니에요. 연령에 따라 상한이 달라요. 30세 미만, 30~39세, 40~49세, 50세 이상으로 나뉘어요. 나이가 많을수록 상한이 높아요. 정확한 금액은 매년 고용노동부 고시로 발표돼요." },
    { q: "도산대지급금 퇴직금과 임금 중 어느 게 먼저 지급되나요?", a: "합산해서 한도 내에서 지급돼요. 항목 간 우선순위는 없고, 체불확인서에 기재된 금액 전체를 합산해서 상한 내에서 지급해요. 합산이 상한을 초과하면 항목별 배분을 결정해요." },
  ],
};

type Sel = Record<string, string>;

function getResult(sel: Sel): string | null {
  const { age, amount } = sel;
  if (!age || !amount) return null;
  if (age === "young" && amount === "under") return "young_under";
  if (age === "young" && amount === "over") return "young_over";
  if (age === "middle" && amount === "under") return "middle_under";
  if (age === "middle" && amount === "over") return "middle_over";
  if (age === "senior" && amount === "under") return "senior_under";
  return "senior_over";
}

export default function Article115() {
  const [sel, setSel] = useState<Sel>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const toc = [
    { t: "STEP 01 예상 지급액 확인", sub: "연령 · 체불 금액" },
    { t: "연령별 상한액 기준", sub: "30세 미만 ~ 50세 이상 구간" },
    { t: "2100만원 한도 항목별 계산", sub: "임금 · 퇴직금 · 휴업수당 합산" },
    { t: "간이대지급금과 차이 비교", sub: "도산 여부 · 한도 · 신청 기한" },
    { t: "퇴직금 임금 합산 상한 적용", sub: "항목 배분 · 초과분 처리" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "노동·임금", "체불임금", "도산대지급금"]}
      tags={["2026년 최신", "도산대지급금", "체당금"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>회사가 파산했을 때 도산대지급금은 <B>간이대지급금(700만원)보다 최대 3배</B> 더 받을 수 있어요. 연령에 따라 최대 2,100만원이에요. 상한액 계산 방법을 정리했어요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법 시행령·근로복지공단", date: "2026.02" }}
      stickyLabel="50세 이상 상한"
      stickyValue="최대 2,100만원"
      stickyBtn="근로복지공단 체당금 신청"
      stickyHref="https://www.comwel.or.kr"
      disclaimer="이 글은 임금채권보장법 시행령과 근로복지공단 공식 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA items={[
            { icon: "💰", title: "근로복지공단 체당금 신청", sub: "도산대지급금 접수", href: "https://www.comwel.or.kr", hot: true },
            { icon: "📋", title: "도산등사실인정 신청", sub: "고용노동부 1350", href: "https://www.moel.go.kr" },
            { icon: "📞", title: "근로복지공단 1588-0075", sub: "지급액 계산 문의", href: "https://www.comwel.or.kr" },
          ]} />
          <SidebarDocs items={[
            { title: "도산대지급금 신청 방법", cat: "임금·체불", href: "/w/도산대지급금-신청-방법-절차" },
            { title: "간이대지급금 지급액 상한액", cat: "임금·체불", href: "/w/간이대지급금-지급액-상한액" },
            { title: "도산등사실인정 신청 방법", cat: "임금·체불", href: "/w/도산등사실인정-신청-방법-서류" },
          ]} />
          <SidebarCalc items={[
            { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
            { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
          ]} />
        </>
      }
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        q="도산대지급금 얼마나 받을 수 있는지 바로 확인하고 싶으신가요?"
        a="연령과 체불 금액을 선택하면 예상 지급액 범위를 안내해 드려요."
        label="지급액 확인"
        href="#checker"
      />

      {/* STEP 01 */}
      <Sec n="01" id="checker" title="STEP 01 예상 지급액 확인" sub="연령 · 체불 금액">
        <CheckerShell title="도산대지급금 얼마나 받을 수 있나요?" sub="30초 확인">
          <CheckerQ
            n="1"
            label="퇴직 당시 연령이 어떻게 되나요?"
            group="age"
            opts={[
              ["young", "30세 미만이에요"],
              ["middle", "30세 이상 50세 미만이에요"],
              ["senior", "50세 이상이에요"],
            ]}
            sel={sel}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="체불 금액이 얼마나 되나요?"
            group="amount"
            opts={[
              ["under", "상한액(최대 2100만원) 이하예요"],
              ["over", "상한액을 초과해요"],
            ]}
            sel={sel}
            pick={pick}
          />
          {result === "young_under" && (
            <ResultPass title="30세 미만 상한 내 전액 지급돼요">
              <P>30세 미만은 도산대지급금 상한이 다른 연령대보다 낮아요. 체불액이 상한 이내라면 전액 지급받을 수 있어요. 정확한 상한액은 당해 연도 고용노동부 고시를 확인하세요. 근로복지공단에서 계산을 도와줘요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "전액 지급", pass: true, desc: "상한 내 전액" },
                { icon: "📋", name: "신청 기한", pass: true, desc: "도산 확인 후 2년" },
                { icon: "💰", name: "상한 확인", pass: true, desc: "고용노동부 고시 참고" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="도산대지급금 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "young_over" && (
            <ResultFail title="상한 초과분은 파산 배당으로 청구하세요">
              <P>도산대지급금 상한을 초과하는 금액은 파산 배당 또는 회생채권 신고로 청구해야 해요. 최우선변제 임금채권으로 인정되면 다른 채권보다 앞서 변제받을 가능성이 있어요. 법원 파산 절차에서 채권 신고를 하세요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "도산대지급금", pass: true, desc: "상한 내 수령" },
                { icon: "⚖️", name: "파산 배당", pass: true, desc: "초과분 청구 가능" },
                { icon: "⚠️", name: "신고 기한", pass: true, desc: "파산 공고 확인 필수" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="대지급금 먼저 접수" href="https://www.comwel.or.kr" />
            </ResultFail>
          )}
          {result === "middle_under" && (
            <ResultPass title="상한 내 전액 지급받을 수 있어요">
              <P>30~49세 구간에서 체불액이 상한 이내라면 전액 받아요. 임금, 퇴직금, 휴업수당을 합산해서 상한 내라면 전부 신청 가능해요. 2026년 기준 상한은 공단에서 확인하세요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "전액 지급", pass: true, desc: "합산 상한 내 전액" },
                { icon: "📋", name: "항목 합산", pass: true, desc: "임금+퇴직금+휴업수당" },
                { icon: "⏰", name: "신청 기한", pass: true, desc: "도산 확인 후 2년" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="도산대지급금 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "middle_over" && (
            <ResultFail title="상한 초과분은 파산 배당으로 청구하세요">
              <P>도산대지급금 상한을 초과한 금액은 파산 또는 회생절차에서 배당 신청으로 받아야 해요. 공단에서 지급한 금액에 대해서는 국가가 대위권을 행사하고, 나머지는 근로자의 우선변제권으로 청구해요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "도산대지급금", pass: true, desc: "한도 내 수령" },
                { icon: "⚖️", name: "우선변제", pass: true, desc: "초과분 배당 신청" },
                { icon: "📋", name: "병행 전략", pass: true, desc: "두 가지 동시 진행" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="대지급금 먼저 접수" href="https://www.comwel.or.kr" />
            </ResultFail>
          )}
          {result === "senior_under" && (
            <ResultPass title="50세 이상 최대 2100만원까지 받을 수 있어요">
              <P>50세 이상 구간이 도산대지급금 상한이 가장 높아요. 최대 2,100만원까지 지급 가능한 구간이에요. 체불액이 이 상한 이내라면 전액 받을 수 있어요. 장기 근속자일수록 혜택이 커요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "최대 상한", pass: true, desc: "2100만원 구간" },
                { icon: "✅", name: "전액 지급", pass: true, desc: "상한 내 전액" },
                { icon: "⏰", name: "신청 기한", pass: true, desc: "도산 확인 후 2년" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="도산대지급금 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "senior_over" && (
            <ResultFail title="최대 2100만원 + 초과분 우선변제 병행하세요">
              <P>50세 이상도 상한(최대 2,100만원)을 초과하면 초과분은 우선변제로 청구해야 해요. 최우선변제 임금채권(최근 3개월 임금, 3년 퇴직금)은 담보권보다 우선이라 배당 가능성이 높아요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "도산대지급금", pass: true, desc: "최대 2100만원" },
                { icon: "⚖️", name: "우선변제", pass: true, desc: "초과분 배당 신청" },
                { icon: "📋", name: "병행 필수", pass: true, desc: "두 가지 동시 진행" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="대지급금 먼저 접수" href="https://www.comwel.or.kr" />
            </ResultFail>
          )}
          {!result && (
            <ResultFail title="연령을 선택해 주세요">
              <P>연령과 체불 금액을 선택하면 예상 도산대지급금 지급액을 안내해 드려요.</P>
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>
      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="ceiling" title="연령별 상한액 기준" sub="30세 미만 ~ 50세 이상 구간">
        <P><B>연령에 따라 달라요.</B> 2026년 기준 연령별 상한액이에요. <A href="https://www.law.go.kr/법령/임금채권보장법시행령">임금채권보장법 시행령</A>에 따라 매년 최저임금 변동에 따라 조정돼요.</P>
        <P>상한액은 매년 고용노동부 고시로 발표되기 때문에 정확한 금액은 근로복지공단에서 확인해야 해요. 연령이 높을수록 상한이 높은 구조는 장기 근속자를 보호하기 위한 취지예요.</P>
        <P>간이대지급금(700만원 한도)과 비교하면 도산대지급금이 훨씬 유리해요. 회사가 도산했다면 가능한 빨리 도산 확인을 받고 도산대지급금을 신청하는 게 좋아요.</P>

        <H3>2026년 도산대지급금 연령별 상한액</H3>
        <TableTitle>연령 구간별 합산 상한액 (참고)</TableTitle>
        <table>
          <thead><tr>
            <th>연령</th><th>합산 상한액(참고)</th><th>임금 항목 상한</th>
          </tr></thead>
          <tbody>
            <tr><td>30세 미만</td><td>약 1,100만원</td><td>임금+퇴직금+휴업수당 합산</td></tr>
            <tr><td>30~39세</td><td>약 1,400만원</td><td>임금+퇴직금+휴업수당 합산</td></tr>
            <tr><td>40~49세</td><td>약 1,800만원</td><td>임금+퇴직금+휴업수당 합산</td></tr>
            <tr><td>50세 이상</td><td>약 2,100만원</td><td>임금+퇴직금+휴업수당 합산</td></tr>
          </tbody>
        </table>
        <TableNote>위 금액은 2026년 기준 참고용이에요. 정확한 상한액은 근로복지공단(1588-0075)에서 확인하세요.</TableNote>
      </Sec>
      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="calc" title="2100만원 한도 항목별 계산" sub="임금 · 퇴직금 · 휴업수당 합산">
        <P><B>임금, 퇴직금, 휴업수당을 합산해서 상한 이내예요.</B> 항목별 상한도 각각 있어요.</P>
        <P>임금 상한이에요. 월 기준 최저임금 환산액 × 최대 3개월이에요. 2026년 기준 월 약 220만원을 기준으로 해요. 3개월 최대 약 660만원이에요. 3개월을 초과하는 기간의 임금 체불은 포함되지 않아요.</P>
        <P>퇴직금 상한이에요. 월 기준 최저임금 환산액을 기준으로 재직 기간에 따라 계산해요. 재직 기간이 길수록 지급액이 늘어요. 연령별 상한 내에서 퇴직금 항목이 결정돼요.</P>
        <P>휴업수당이에요. 휴업 기간에 받지 못한 수당도 포함될 수 있어요. 월 최저임금의 70%(약 154만원) × 최대 3개월이에요. 항목을 합산했을 때 연령별 상한을 초과하면 상한까지만 지급돼요.</P>
        <InlineLink icon="link" title="근로복지공단 체당금 계산 안내" desc="항목별 상한 확인" href="https://www.comwel.or.kr" />
      </Sec>
      <RelatedMid
        title="도산 절차 관련 글도 확인해 보세요"
        items={[
          { icon: "📋", title: "도산대지급금 신청 방법", desc: "2년 기한과 필요 서류 정리", href: "/w/도산대지급금-신청-방법-절차" },
          { icon: "📊", title: "도산등사실인정 신청 방법", desc: "고용노동부 신청 절차 안내", href: "/w/도산등사실인정-신청-방법-서류" },
          { icon: "⚖️", title: "재판상 도산 파산 회생 비교", desc: "파산·회생 시 대지급금 차이", href: "/w/재판상-도산-파산-회생절차-대지급금" },
        ]}
        hubHref="/category/임금"
        hubLabel="체불임금 전체 보기"
      />
      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="compare" title="간이대지급금과 차이 비교" sub="도산 여부 · 한도 · 신청 기한">
        <P><B>도산 여부가 핵심이에요.</B> 두 제도의 주요 차이점이에요.</P>
        <P>도산대지급금은 법원의 파산·회생 결정이나 고용노동부의 도산 사실 인정이 있어야 해요. 상한이 최대 2,100만원으로 높지만, 도산 절차 진행 중에만 신청할 수 있어요. 신청 기한은 도산 확인 후 2년 이내예요.</P>
        <P>간이대지급금은 회사가 운영 중이어도 체불이 있으면 신청할 수 있어요. 상한이 700만원으로 낮지만, 도산 절차 없이 빠르게 처리돼요. 신청 기한은 퇴직 후 1년 이내예요.</P>
        <P>회사가 도산했다면 도산대지급금이 유리해요. 상한이 세 배가량 높거든요. 반면 운영 중인 회사에서 체불이면 간이대지급금밖에 선택이 없어요.</P>
        <Info type="warn">{"도산 확인을 먼저 받아야 도산대지급금을 신청할 수 있어요. 법원 파산 선고나 고용노동부 도산등사실인정이 필요해요."}</Info>
      </Sec>
      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="merge" title="퇴직금 임금 합산 상한 적용" sub="항목 배분 · 초과분 처리">
        <P><B>합산 후 연령별 상한을 적용해요.</B> 임금과 퇴직금을 별도로 계산한 후 합산해서 상한과 비교해요.</P>
        <P>퇴직금이 체불된 경우가 많아요. 재직 기간이 길수록 퇴직금 체불액이 커져요. 30년 근무 후 퇴직금 3,000만원이 체불됐다면 대지급금 상한 이내 부분만 받고, 나머지는 우선변제권으로 청구해야 해요.</P>
        <P>임금과 퇴직금 중 어떤 항목을 먼저 충당할지는 근로복지공단과 협의해요. 실무에서는 임금(생계와 직결)을 먼저 충당하는 경향이 있어요. 지급 결정 후 국가가 대위권을 행사해요.</P>
        <P>공단에서 지급한 금액만큼 파산 배당이나 회생절차에서 국가가 채권을 행사해요. 근로자는 상한 초과분에 대해 직접 우선변제권을 행사해요. 대지급금 지급 결정서를 받은 후 파산 채권 신고 기한을 확인하세요.</P>

        <ExtBtn badge="근로복지공단 공식" text="도산 체당금 지급 기준 및 신청" cta="신청하기 →" href="https://www.comwel.or.kr" />
      </Sec>
      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "도산대지급금 신청 방법 절차", desc: "2년 기한과 필요 서류 정리", href: "/w/도산대지급금-신청-방법-절차" },
        { title: "도산등사실인정 신청 방법 서류", desc: "고용노동부 신청 절차 안내", href: "/w/도산등사실인정-신청-방법-서류" },
        { title: "재판상 도산 파산 회생 비교", desc: "파산·회생 시 대지급금 차이", href: "/w/재판상-도산-파산-회생절차-대지급금" },
        { title: "간이대지급금 지급액 상한액", desc: "700만원 한도 항목별 계산", href: "/w/간이대지급금-지급액-상한액" },
        { title: "대지급금 임금채권 우선변제 차이", desc: "대위권과 변제 순위 구조", href: "/w/대지급금-임금채권-우선변제-차이" },
      ]} />
      <PrevNext
        prev={{ title: "대지급금 일부 지급 거부 사유", href: "/w/대지급금-특수-상황-일부지급-최저임금" }}
        next={{ title: "도산대지급금 신청 방법 절차", href: "/w/도산대지급금-신청-방법-절차" }}
      />
    </BlogLayout>
  );
}
