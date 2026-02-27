"use client";

import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 연봉별 계산 예시 | 월급 300만 500만 실수령액 비교",
  description: "실업급여는 연봉에 따라 하한액(일 63,104원)부터 상한액(일 68,100원)까지 적용돼요. 월급 200만·350만·500만 원 구간별 예상 수령액을 직접 계산해 비교했어요.",
  category: "실업급여",
  keywords: ["실업급여 연봉별 계산 예시", "월급 300만 실업급여 금액", "실업급여 연봉별 상한액 적용", "연봉별 수급기간 총 수령액"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "2026년 실업급여: 하한액 일 63,104원 ~ 상한액 일 68,100원",
    "월급 약 323만 원 미만이면 하한액, 348만 원 이상이면 상한액 적용",
    "총 수령액은 일 지급액 × 소정급여일수(120~270일)로 결정돼요",
  ],
  sources: [
    { name: "고용노동부 실업급여 안내", url: "https://www.moel.go.kr/policy/policyinfo/support/list4.do", date: "2026-02" },
  ],
  faq: [
    { q: "연봉이 높으면 실업급여를 더 많이 받나요?", a: "연봉이 높으면 상한액이 적용돼요. 2026년 상한액은 일 68,100원이에요. 월급이 약 348만 원을 넘으면 모두 같은 상한액이 적용돼요. 대신 피보험기간이 길수록 소정급여일수가 늘어나서 총액이 달라져요." },
    { q: "연봉이 낮으면 실업급여가 너무 적어서 생활이 어렵지 않나요?", a: "하한액(일 63,104원)이 최저 보장금액이에요. 2026년 기준 월 약 189만 원이에요. 최저임금의 80%로 설정돼 있어서 생활 최저선을 보장하는 구조예요." },
  ],
  ctaCard: {
    label: "30초 계산",
    mainText: "내 연봉별 실업급여 금액 확인",
    subText: "월급과 근무기간만 입력하면 돼요",
    url: "/w/실업급여-계산기",
    external: false,
  },
  relatedDocs: [{ title: "실업급여 상한액 하한액 기준", url: "/w/실업급여-상한액" }],
};

type Q1 = "under200" | "200-300" | "300-400" | "over400";
type Q2 = "under1" | "1-3" | "3-10" | "over10";
type Q3 = "under50" | "over50";
type Q4 = "involuntary" | "voluntary";

function getResult(q1: Q1 | "", q2: Q2 | "", q3: Q3 | "", q4: Q4 | "") {
  if (!q1 || !q2 || !q3 || !q4) return null;
  if (q4 === "voluntary") {
    return {
      pass: false,
      title: "자발적 퇴직은 원칙적으로 실업급여 대상이 아니에요",
      desc: "실업급여는 비자발적 퇴직이어야 수급할 수 있어요. 임금 미지급·직장 내 괴롭힘 등 정당한 사유가 있으면 예외가 가능해요.",
      links: [
        { icon: "📋", title: "자발적 퇴직 정당사유 확인", desc: "임금삭감·괴롭힘 등 예외 사유 안내", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
      ],
    };
  }
  const dayMap: Record<Q2, Record<Q3, number>> = {
    "under1": { "under50": 120, "over50": 120 },
    "1-3": { "under50": 150, "over50": 180 },
    "3-10": { "under50": 210, "over50": 240 },
    "over10": { "under50": 240, "over50": 270 },
  };
  const days = dayMap[q2][q3];
  type DailyMap = { rate: string; daily: number; label: string };
  const dailyMap: Record<Q1, DailyMap> = {
    "under200": { rate: "하한액 적용", daily: 63104, label: "월급 200만 원 미만" },
    "200-300": { rate: "하한액 적용 가능", daily: 63104, label: "월급 200~300만 원" },
    "300-400": { rate: "일반 계산 또는 상한액", daily: 66000, label: "월급 300~400만 원" },
    "over400": { rate: "상한액 적용", daily: 68100, label: "월급 400만 원 이상" },
  };
  const info = dailyMap[q1];
  const total = info.daily * days;
  const months = Math.floor(days / 30);
  return {
    pass: true,
    title: `예상 일 지급액: ${info.daily.toLocaleString()}원 (${info.rate})`,
    desc: `${info.label}, ${q2 === "under1" ? "1년 미만" : q2 === "1-3" ? "1~3년" : q2 === "3-10" ? "3~10년" : "10년 이상"} 피보험기간 기준으로 소정급여일수 ${days}일(약 ${months}개월), 총 예상 수령액 약 ${Math.floor(total / 10000)}만 원이에요.`,
    links: [
      { icon: "🧮", title: "정확한 금액 계산하기", desc: "실업급여 계산기로 내 수령액 계산", href: "/w/실업급여-계산기" },
      { icon: "📅", title: "소정급여일수 기준 확인", desc: "피보험기간·나이별 수급일수 조회", href: "/w/실업급여-소정급여일수" },
    ],
  };
}

type ResLink = { icon: string; title: string; desc: string; href: string };

export default function Page() {
  const [q1, setQ1] = useState<Q1 | "">("");
  const [q2, setQ2] = useState<Q2 | "">("");
  const [q3, setQ3] = useState<Q3 | "">("");
  const [q4, setQ4] = useState<Q4 | "">("");
  const result = getResult(q1, q2, q3, q4);

  const sidebar = (
    <>
      <SidebarCTA items={[
        { icon: "💰", title: "실업급여 수급액 계산", sub: "30초 내 예상 금액 확인", href: "/w/실업급여-계산기", hot: true },
        { icon: "📅", title: "소정급여일수 확인", sub: "피보험기간·나이별 수급일수", href: "/w/실업급여-소정급여일수" },
        { icon: "📊", title: "상한액·하한액 기준", sub: "2026년 기초일액 기준 안내", href: "/w/실업급여-상한액" },
      ]} />
      <SidebarDocs items={[
        { title: "실업급여 상한액 하한액 기준", cat: "실업급여·계산", href: "/w/실업급여-상한액" },
        { title: "실업급여 소정급여일수", cat: "실업급여·수급기간", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 신청 방법", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
        { title: "피보험기간 180일 계산", cat: "실업급여·자격", href: "/w/실업급여-피보험기간-180일-계산" },
        { title: "실업급여 대기기간", cat: "실업급여·수급", href: "/w/실업급여-대기기간" },
      ]} />
      <SidebarCalc items={[
        { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
        { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
        { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
        { title: "건강보험료 계산기", href: "/w/건강보험료-계산기" },
        { title: "국민연금 계산기", href: "/w/국민연금-계산기" },
      ]} />
    </>
  );

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "수급액 계산", "연봉별 계산"]}
      tags={["2026년 최신", "실업급여", "연봉별 계산", "수령액"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>실업급여는 <B>연봉에 따라 일 63,104원(하한액)~68,100원(상한액)</B>이 적용돼요. 월급 200만·350만·500만 원 구간별 예상 수령액을 직접 계산해 비교했어요.</>}
      sourceBar={{ badge: "고용노동부", name: "실업급여 안내", date: "2026.02" }}
      stickyLabel="2026년 상한액"
      stickyValue="일 68,100원"
      stickyBtn="내 금액 계산"
      disclaimer="이 글은 고용노동부 공개 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 개인별 수급액은 실제 평균임금·피보험기간에 따라 달라질 수 있어요."
      sidebar={sidebar}
    >
      <TOC items={[
        { n: "01", t: "내 연봉별 예상 수령액 빠른 확인", sub: "월급 구간 · 근무기간 선택" },
        { n: "02", t: "실업급여 연봉별 계산 기준은 어떻게 되나요?", sub: "하한액·상한액 적용 월급 기준" },
        { n: "03", t: "실업급여 연봉별 상한액 하한액 적용이 달라지나요?", sub: "연봉별 일 지급액 비교표" },
        { n: "04", t: "실업급여 연봉별 계산 사례 3가지", sub: "200만·350만·500만 시뮬레이션" },
        { n: "05", t: "실업급여 연봉별 총 수령액이 얼마나 차이 나나요?", sub: "소정급여일수 × 일 지급액 비교" },
        { n: "FAQ", t: "자주 묻는 질문", sub: "연봉 높으면 더 많나요 · 하한액 생활 가능" },
      ]} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 — 체커 */}
      <Sec n="01" id="checker" title="내 연봉별 예상 수령액 빠른 확인" sub="월급 구간 · 근무기간 선택">
        <CheckerShell
          title="내 월급과 근무기간으로 예상 수령액이 얼마일까?"
          subtitle="30초 확인"
          intro="월급 구간과 피보험기간을 선택하면 예상 수령액을 바로 알 수 있어요."
        >
          <CheckerQ
            n={1}
            group="q1"
            label="퇴직 전 월 평균임금이 얼마인가요?"
            opts={[
              ["under200", "200만 원 미만"],
              ["200-300", "200만 ~ 300만 원"],
              ["300-400", "300만 ~ 400만 원"],
              ["over400", "400만 원 이상"],
            ]}
            sel={q1}
            pick={(v) => setQ1(v as Q1)}
          />
          <CheckerQ
            n={2}
            group="q2"
            label="고용보험 피보험기간은 얼마나 되나요?"
            opts={[
              ["under1", "1년 미만"],
              ["1-3", "1~3년"],
              ["3-10", "3~10년"],
              ["over10", "10년 이상"],
            ]}
            sel={q2}
            pick={(v) => setQ2(v as Q2)}
          />
          <CheckerQ
            n={3}
            group="q3"
            label="이직 당시 나이는 몇 세인가요?"
            opts={[
              ["under50", "50세 미만"],
              ["over50", "50세 이상 또는 장애인"],
            ]}
            sel={q3}
            pick={(v) => setQ3(v as Q3)}
          />
          <CheckerQ
            n={4}
            group="q4"
            label="퇴직 사유는 무엇인가요?"
            opts={[
              ["involuntary", "비자발적 퇴직 (권고사직·계약만료 등)"],
              ["voluntary", "자발적 퇴직"],
            ]}
            sel={q4}
            pick={(v) => setQ4(v as Q4)}
          />
          {result && (() => {
            const links = result.links as ResLink[];
            return result.pass ? (
              <ResultPass title={result.title} desc={result.desc}>
                {links.map((l) => (
                  <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
                ))}
              </ResultPass>
            ) : (
              <ResultFail title={result.title} desc={result.desc}>
                {links.map((l) => (
                  <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
                ))}
              </ResultFail>
            );
          })()}
        </CheckerShell>
      </Sec>

      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="standard" title="실업급여 연봉별 계산 기준은 어떻게 되나요?" sub="하한액·상한액 적용 월급 기준">
        <P>실업급여 1일 지급액은 <B>퇴직 전 3개월 평균임금의 60%</B>예요. 이 금액이 <B>상한액(일 68,100원)보다 높으면 상한액</B>이, <B>하한액(일 63,104원)보다 낮으면 하한액</B>이 자동 적용돼요.</P>
        <P>상한액이 적용되는 기준 월급은 약 <B>348만 원</B>이에요. 하한액이 적용되는 기준 월급은 약 <B>323만 원</B>이에요. 이 두 금액 사이(323~348만 원)라면 순수하게 평균임금의 60%가 지급돼요.</P>
        <P>대부분의 실업급여 수급자는 <B>하한액 또는 상한액</B>에 해당해요. 연봉이 높다고 실업급여가 무제한으로 늘어나지 않아요. 상한액 이상이면 누구나 동일하게 일 68,100원이에요.</P>
        <P>총 수령액은 일 지급액에 소정급여일수를 곱해요. 소정급여일수는 피보험기간과 나이에 따라 <A href="https://www.moel.go.kr/policy/policyinfo/support/list4.do">고용노동부 기준</A>으로 120~270일이 적용돼요.</P>

        <FormulaCard
          formula="실업급여 일 지급액 = 퇴직 전 3개월 평균임금 × 60%"
          notes={[
            "2026년 상한액: 일 68,100원 (월급 약 348만 원 이상 적용)",
            "2026년 하한액: 일 63,104원 (최저임금 10,030원 × 8h × 80%)",
            "총 수령액 = 일 지급액 × 소정급여일수 (120~270일)",
          ]}
        />

        <InlineLink
          icon="📊"
          title="실업급여 상한액 하한액 기준 상세"
          desc="2026년 기초일액 상한·하한 적용 기준 전체 안내"
          href="/w/실업급여-상한액"
        />
        <SpokeLink num={1} title="실업급여 소정급여일수 기준표" desc="피보험기간·나이별 120일~270일 수급일수" href="/w/실업급여-소정급여일수" />
      </Sec>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="comparison" title="실업급여 연봉별 상한액 하한액 적용이 달라지나요?" sub="연봉별 일 지급액 비교표">
        <P>연봉이 다르면 일 지급액이 달라져요. 하지만 월급 323만 원 미만이거나 348만 원 이상이면 모두 동일한 금액이 적용돼요. 연봉별로 정확히 얼마를 받는지 아래 표로 정리했어요.</P>
        <P>월급 200만 원이면 일 평균임금이 약 65,217원이고, 60%는 약 39,130원이에요. 하한액(63,104원)보다 낮아서 <B>하한액 63,104원이 적용</B>돼요. 월급이 올라도 약 323만 원까지는 하한액이에요.</P>
        <P>월급 350만 원이면 일 평균임금이 약 114,130원이고, 60%는 약 68,478원이에요. 상한액(68,100원)보다 약간 높아서 <B>상한액 68,100원이 적용</B>돼요. 이 구간부터 상한액이 의미 있어요.</P>
        <P>결국 대부분의 직장인은 하한액(63,104원) 또는 상한액(68,100원) 둘 중 하나가 적용돼요. 두 금액의 차이는 일 4,996원, 270일 기준 약 135만 원 차이예요.</P>

        <TableTitle>연봉(월급)별 실업급여 일 지급액 비교 (2026년)</TableTitle>
        <TH cols={["월급 구간", "일 평균임금", "60% 계산액", "실제 지급액", "적용"]} rows={[
          ["200만 원", "65,217원", "39,130원", "63,104원", "하한액"],
          ["250만 원", "81,522원", "48,913원", "63,104원", "하한액"],
          ["300만 원", "97,826원", "58,696원", "63,104원", "하한액"],
          ["340만 원", "110,870원", "66,522원", "66,522원", "일반 계산"],
          ["350만 원", "114,130원", "68,478원", "68,100원", "상한액"],
          ["400만 원", "130,435원", "78,261원", "68,100원", "상한액"],
          ["500만 원", "163,043원", "97,826원", "68,100원", "상한액"],
        ]} />
        <TableNote>* 3개월 = 92일로 계산. 월급별 일 평균임금 = 월급 × 3 ÷ 92일.</TableNote>

        <Info type="warn">
          <B>연봉 2배 차이여도 일 지급액은 같을 수 있어요</B><br />
          월급 350만 원과 500만 원은 모두 상한액 68,100원이 적용돼요. 총 수령액의 차이는 소정급여일수(피보험기간·나이)에서 발생해요. 고소득자일수록 피보험기간을 길게 유지하는 게 중요해요.
        </Info>
      </Sec>

      <RelatedMid
        title="실업급여 계산 관련 글 모아봤어요"
        items={[
          { icon: "📊", title: "실업급여 상한액·하한액 기준", desc: "2026년 기초일액 68,100원 적용 기준", href: "/w/실업급여-상한액" },
          { icon: "📅", title: "실업급여 소정급여일수", desc: "피보험기간·나이별 수급일수 조회", href: "/w/실업급여-소정급여일수" },
          { icon: "📋", title: "피보험기간 180일 계산", desc: "고용보험 가입 기간 합산 방법", href: "/w/실업급여-피보험기간-180일-계산" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="cases" title="실업급여 연봉별 계산 사례 3가지" sub="200만·350만·500만 시뮬레이션">
        <P>연봉별 실제 수령액이 어떻게 다른지 세 가지 케이스로 비교해 봤어요. 월급 200만·350만·500만 원으로 다른 케이스예요. 내 상황과 가장 가까운 케이스를 찾아보세요.</P>

        <H3>이 씨(28세), 월급 200만 원, 피보험기간 10개월</H3>
        <P>일 평균임금이 <B>65,217원</B>이고, 60%는 39,130원이에요. 하한액보다 낮아 하한액이 적용돼요. 28세·1년 미만 근무라 소정급여일수는 <B>120일(4개월)</B>이에요.</P>
        <CaseBox
          badge="예시 1"
          label="이 씨(28세), 월급 200만 원, 피보험기간 10개월"
          conditions={["일 평균임금: 200만 × 3 ÷ 92 = 65,217원", "60% = 39,130원 → 하한액(63,104원) 이하 → 하한액 적용"]}
          steps={[
            { label: "적용 일 지급액", value: "63,104원 (하한액)" },
            { label: "소정급여일수", value: "120일 (28세, 1년 미만)" },
            { label: "총 수령 예상액", value: "63,104원 × 120일 = 7,572,480원" },
          ]}
          total="총 예상 수령: 약 757만 원"
          result="하한액 적용 (약 757만 원, 약 4개월)"
          pass={true}
        />

        <H3>박 씨(42세), 월급 350만 원, 피보험기간 4년</H3>
        <P>일 평균임금이 <B>114,130원</B>이고, 60%는 68,478원이에요. 상한액(68,100원)에 가까워 상한액이 적용돼요. 42세·3~5년 피보험기간이라 소정급여일수는 <B>180일(6개월)</B>이에요.</P>
        <CaseBox
          badge="예시 2"
          label="박 씨(42세), 월급 350만 원, 피보험기간 4년"
          conditions={["일 평균임금: 350만 × 3 ÷ 92 = 114,130원", "60% = 68,478원 → 상한액(68,100원) 초과 → 상한액 적용"]}
          steps={[
            { label: "적용 일 지급액", value: "68,100원 (상한액)" },
            { label: "소정급여일수", value: "180일 (42세, 3~5년)" },
            { label: "총 수령 예상액", value: "68,100원 × 180일 = 12,258,000원" },
          ]}
          total="총 예상 수령: 약 1,226만 원"
          result="상한액 적용 (약 1,226만 원, 약 6개월)"
          pass={true}
        />

        <H3>김 씨(52세), 월급 600만 원, 피보험기간 15년</H3>
        <P>일 평균임금이 <B>195,652원</B>이고, 60%는 117,391원이에요. 상한액보다 훨씬 높지만 상한액인 일 <B>68,100원만 적용</B>돼요. 52세·10년 이상 피보험기간이라 소정급여일수는 <B>270일(9개월)</B>이에요.</P>
        <CaseBox
          badge="예시 3"
          label="김 씨(52세), 월급 600만 원, 피보험기간 15년"
          conditions={["일 평균임금: 600만 × 3 ÷ 92 = 195,652원", "60% = 117,391원 → 상한액(68,100원) 대폭 초과 → 상한액 적용"]}
          steps={[
            { label: "적용 일 지급액", value: "68,100원 (상한액, 초과분 소멸)" },
            { label: "소정급여일수", value: "270일 (52세, 10년 이상)" },
            { label: "총 수령 예상액", value: "68,100원 × 270일 = 18,387,000원" },
          ]}
          total="총 예상 수령: 약 1,839만 원"
          result="상한액 적용 (약 1,839만 원, 9개월)"
          pass={true}
        />

        <BridgeCard
          q="내 정확한 월급과 피보험기간으로 계산하고 싶다면?"
          a="실업급여 계산기에서 직접 입력하면 30초 안에 정확한 금액이 나와요."
          label="실업급여 계산기 바로 가기"
          href="/w/실업급여-계산기"
        />
      </Sec>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="total" title="실업급여 연봉별 총 수령액이 얼마나 차이 나나요?" sub="소정급여일수 × 일 지급액 비교">
        <P>총 수령액의 핵심은 <B>소정급여일수</B>예요. 같은 상한액(일 68,100원)을 받더라도 소정급여일수가 120일이면 약 817만 원, 270일이면 약 1,839만 원이에요. 2.2배 차이가 나요.</P>
        <P>연봉이 높은 고소득자는 상한액이 적용되니 일 지급액은 누구나 68,100원으로 같아요. 대신 총 수령액은 피보험기간과 나이가 결정해요. <B>오래 일할수록</B>, <B>나이가 많을수록</B> 유리해요.</P>
        <P>반면 저소득자는 하한액(63,104원)이 적용되지만 소정급여일수 차이는 동일하게 적용돼요. 1년 이상 근무했다면 단기 계약직보다 30~60일 더 받아요. 피보험기간을 최대한 채우는 게 중요해요.</P>
        <P>요약하면 <B>연봉보다 피보험기간과 나이가 총 수령액을 더 많이 결정</B>해요. 연봉 500만 원이어도 피보험기간이 1년 미만이면 120일만 받아요. 연봉 200만 원이어도 10년 이상 근무한 50세 이상이면 270일을 받아요.</P>

        <InlineLink
          icon="📅"
          title="소정급여일수 계산 기준"
          desc="피보험기간·나이별 120일~270일 상세 기준표"
          href="/w/실업급여-소정급여일수"
        />

        <SpokeLink num={2} title="실업급여 수급기간 몇 개월 받나요" desc="유효기간 12개월 내 소정급여일수 활용 방법" href="/w/실업급여-수급기간-몇개월-받나요" />

        <ExtBtn
          badge="고용노동부 공식"
          text="실업급여 수급액 조회 및 신청"
          cta="바로가기 →"
          href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 상한액·하한액 기준", href: "/w/실업급여-상한액" },
        { title: "실업급여 소정급여일수 계산 기준", href: "/w/실업급여-소정급여일수" },
        { title: "피보험기간 180일 계산하기", href: "/w/실업급여-피보험기간-180일-계산" },
        { title: "실업급여 신청 방법과 절차", href: "/w/실업급여-신청방법" },
        { title: "실업급여 대기기간 7일 안내", href: "/w/실업급여-대기기간" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 실업크레딧 가입 조건", href: "/w/실업급여-실업크레딧" }}
        next={{ title: "실업급여 재취업 조건 안내", href: "/w/실업급여-재취업-조건" }}
      />
    </BlogLayout>
  );
}
