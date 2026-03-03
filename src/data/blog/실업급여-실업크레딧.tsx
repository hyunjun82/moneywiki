// @ts-nocheck
"use client";

import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 실업크레딧 가입 조건 | 구직급여 수급자 국민연금 특례",
  description: "실업크레딧은 실업급여(구직급여) 수급자가 국민연금 보험료의 75%를 정부 지원받는 제도예요. 실직 중에도 국민연금 가입 기간을 유지할 수 있어 노후 연금에 유리해요.",
  category: "실업급여",
  keywords: ["실업급여 실업크레딧 가입 조건", "구직급여 수급자 국민연금 특례", "실업크레딧 보험료 지원 금액", "실업크레딧 신청 기간 방법"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "실업크레딧은 구직급여 수급자의 국민연금 보험료 75%를 정부가 지원해요",
    "인정 소득은 실직 전 3개월 평균 소득의 50% (최대 70만 원)",
    "평생 최대 12개월 지원, 구직급여 수급 기간 내 신청해야 해요",
  ],
  sources: [
    { name: "국민연금공단 실업크레딧 안내", url: "https://www.nps.or.kr/jsppage/business/insure/credit/unemployment_credit.jsp", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 실업크레딧 가입 조건은 무엇인가요?", a: "구직급여(실업급여)를 받는 중이고, 국민연금 가입 이력이 있어야 해요. 18세 이상 60세 미만이어야 하고, 이미 국민연금을 수령 중인 분은 대상이 아니에요." },
    { q: "실업크레딧 신청은 언제까지 해야 하나요?", a: "구직급여 수급 기간 내에 신청해야 해요. 수급이 끝난 후에는 신청이 불가능해요. 국민연금공단 지사 방문 또는 온라인(www.nps.or.kr)으로 신청할 수 있어요." },
  ],
  ctaCard: {
    label: "지금 신청",
    mainText: "실업크레딧 국민연금공단에서 신청하기",
    subText: "구직급여 수급 중에만 신청 가능해요",
    url: "https://www.nps.or.kr/jsppage/business/insure/credit/unemployment_credit.jsp",
    external: true,
  },
  relatedDocs: [{ title: "국민연금 임의가입 안내", url: "/w/국민연금-임의가입-전업주부" }],
};

type Q1 = "receiving" | "not_receiving";
type Q2 = "has_history" | "no_history";
type Q3 = "under60" | "over60";
type Q4 = "want_join" | "not_sure";

function getResult(q1: Q1 | "", q2: Q2 | "", q3: Q3 | "", q4: Q4 | "") {
  if (!q1 || !q2 || !q3 || !q4) return null;
  if (q1 === "not_receiving") {
    return {
      pass: false,
      title: "구직급여 수급 중이어야 실업크레딧 가입이 가능해요",
      desc: "실업크레딧은 구직급여(실업급여)를 받는 기간에만 신청할 수 있어요. 구직급여 수급 자격이 있는지 먼저 확인해 보세요.",
      links: [
        { icon: "📋", title: "실업급여 수급자격 확인", desc: "피보험기간 180일 기준 확인 방법", href: "/w/실업급여-피보험기간-180일-계산" },
      ],
    };
  }
  if (q2 === "no_history") {
    return {
      pass: false,
      title: "국민연금 가입 이력이 없으면 실업크레딧 대상이 아니에요",
      desc: "실업크레딧은 국민연금 가입 이력이 있어야 해요. 이전에 한 번이라도 국민연금을 납부한 이력이 있으면 가입할 수 있어요.",
      links: [
        { icon: "📋", title: "국민연금 임의가입 안내", desc: "전업주부 등 임의가입자 조건 확인", href: "/w/국민연금-임의가입-전업주부" },
      ],
    };
  }
  if (q3 === "over60") {
    return {
      pass: false,
      title: "60세 이상은 실업크레딧 대상이 아니에요",
      desc: "실업크레딧은 18세 이상 60세 미만 국민연금 가입 대상자에게만 지원돼요. 국민연금을 이미 수령 중이거나 60세 이상이면 대상에서 제외돼요.",
      links: [
        { icon: "📋", title: "국민연금 조기수령 신청 조건", desc: "60세 이전 연금 수령 조건 확인", href: "/w/국민연금-조기수령-신청-조건" },
      ],
    };
  }
  return {
    pass: true,
    title: "실업크레딧 가입 가능해요 — 보험료의 25%만 부담해요",
    desc: "구직급여 수급 기간 내에 국민연금공단에 신청하면 돼요. 인정 소득의 75%는 정부가 부담하고 본인은 25%만 내면 돼요. 평생 최대 12개월 혜택이에요.",
    links: [
      { icon: "🏛️", title: "국민연금공단 실업크레딧 신청", desc: "온라인 또는 지사 방문 신청 가능", href: "https://www.nps.or.kr/jsppage/business/insure/credit/unemployment_credit.jsp" },
      { icon: "📋", title: "실업급여 신청 방법", desc: "구직급여 수급 신청 전체 절차", href: "/w/실업급여-신청방법" },
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
        { icon: "🏛️", title: "실업크레딧 국민연금공단 신청", sub: "구직급여 수급 중 온라인 신청", href: "https://www.nps.or.kr/jsppage/business/insure/credit/unemployment_credit.jsp", hot: true },
        { icon: "💰", title: "실업급여 수급액 계산", sub: "30초 내 예상 금액 확인", href: "/w/실업급여-계산기" },
        { icon: "📋", title: "국민연금 조기수령 조건", sub: "60세 이전 연금 수령 방법", href: "/w/국민연금-조기수령-신청-조건" },
      ]} />
      <SidebarDocs items={[
        { title: "국민연금 임의가입 전업주부", cat: "국민연금·가입", href: "/w/국민연금-임의가입-전업주부" },
        { title: "국민연금 조기수령 신청 조건", cat: "국민연금·수령", href: "/w/국민연금-조기수령-신청-조건" },
        { title: "실업급여 신청 방법", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
        { title: "실업급여 소정급여일수", cat: "실업급여·수급기간", href: "/w/실업급여-소정급여일수" },
        { title: "피보험기간 180일 계산", cat: "실업급여·자격", href: "/w/실업급여-피보험기간-180일-계산" },
      ]} />
      <SidebarCalc items={[
        { title: "국민연금 계산기", href: "/w/국민연금-계산기" },
        { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
        { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
        { title: "건강보험료 계산기", href: "/w/건강보험료-계산기" },
        { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
      ]} />
    </>
  );

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "수급 중 관리", "실업크레딧"]}
      tags={["2026년 최신", "실업급여", "실업크레딧", "국민연금"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>실업크레딧은 구직급여 수급 중 <B>국민연금 보험료의 75%</B>를 정부가 지원하는 제도예요. 실직 기간에도 <B>국민연금 가입 기간을 유지</B>할 수 있어 노후 연금에 유리해요.</>}
      sourceBar={{ badge: "국민연금공단", name: "실업크레딧 안내", date: "2026.02" }}
      stickyLabel="정부 지원 비율"
      stickyValue="75%"
      stickyBtn="신청 자격 확인"
      disclaimer="이 글은 국민연금공단 공개 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 개인별 인정 소득과 지원 금액은 실제 상황에 따라 다를 수 있어요."
      sidebar={sidebar}
    >
      <TOC items={[
        { n: "01", t: "실업크레딧 가입 자격 빠른 확인", sub: "구직급여 수급 여부 · 나이 · 가입 이력" },
        { n: "02", t: "실업급여 실업크레딧 가입 조건은 무엇인가요?", sub: "수급자 조건 · 18세 이상 60세 미만" },
        { n: "03", t: "실업급여 실업크레딧 보험료를 얼마나 지원받나요?", sub: "75% 정부 지원 · 인정 소득 기준" },
        { n: "04", t: "실업급여 실업크레딧 신청 기간이 언제인가요?", sub: "구직급여 수급 중 · 평생 12개월" },
        { n: "05", t: "실업급여 실업크레딧 가입이 노후에 유리한가요?", sub: "연금 수령액 증가 · 가입 기간 효과" },
        { n: "FAQ", t: "자주 묻는 질문", sub: "가입 조건 · 신청 기간" },
      ]} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 — 체커 */}
      <Sec n="01" id="checker" title="실업크레딧 가입 자격 빠른 확인" sub="구직급여 수급 여부 · 나이 · 가입 이력">
        <CheckerShell
          title="나는 실업크레딧 가입이 가능할까?"
          subtitle="30초 확인"
          intro="구직급여 수급 여부와 국민연금 이력을 선택하면 바로 알 수 있어요."
        >
          <CheckerQ
            n={1}
            group="q1"
            label="현재 구직급여(실업급여)를 받고 있나요?"
            opts={[
              ["receiving", "예, 수급 중이에요"],
              ["not_receiving", "아니요, 아직 받지 않고 있어요"],
            ]}
            sel={q1}
            pick={(v) => setQ1(v as Q1)}
          />
          <CheckerQ
            n={2}
            group="q2"
            label="국민연금 가입 이력이 있나요?"
            opts={[
              ["has_history", "예, 이전에 납부한 이력이 있어요"],
              ["no_history", "아니요, 가입한 적이 없어요"],
            ]}
            sel={q2}
            pick={(v) => setQ2(v as Q2)}
          />
          <CheckerQ
            n={3}
            group="q3"
            label="현재 나이가 어떻게 되나요?"
            opts={[
              ["under60", "60세 미만"],
              ["over60", "60세 이상"],
            ]}
            sel={q3}
            pick={(v) => setQ3(v as Q3)}
          />
          <CheckerQ
            n={4}
            group="q4"
            label="실업크레딧 가입을 원하시나요?"
            opts={[
              ["want_join", "예, 가입하고 싶어요"],
              ["not_sure", "잘 모르겠어요 — 혜택을 알고 싶어요"],
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
      <Sec n="02" id="condition" title="실업급여 실업크레딧 가입 조건은 무엇인가요?" sub="수급자 조건 · 18세 이상 60세 미만">
        <P>실업크레딧은 <B>구직급여(실업급여)를 받는 수급자</B>이면서 <B>국민연금 가입 이력이 있는 분</B>이 대상이에요. <A href="https://www.nps.or.kr/jsppage/business/insure/credit/unemployment_credit.jsp">국민연금공단</A>에서 운영하는 국민연금 특례 제도예요.</P>
        <P>나이 조건은 <B>18세 이상 60세 미만</B>이에요. 이미 노령연금을 수령 중이거나 60세 이상이면 가입할 수 없어요. 구직급여 수급 기간이 곧 가입 가능 기간이에요.</P>
        <P>국민연금 가입 이력이 있어야 해요. 직장에 다니면서 한 번이라도 국민연금을 납부했던 이력이 있으면 돼요. 납부 이력이 없는 분은 별도로 임의가입 후 실업크레딧 가입이 가능한지 상담이 필요해요.</P>
        <P>2016년 8월 1일 이후 구직급여 수급자부터 적용되는 제도예요. 평생 최대 <B>12개월</B>까지 지원받을 수 있어요. 이전에 실업크레딧을 받은 이력이 있으면 남은 기간만큼만 받을 수 있어요.</P>

        <TableTitle>실업크레딧 가입 자격 요건</TableTitle>
        <TH cols={["항목", "기준"]} rows={[
          ["기본 조건", "구직급여(실업급여) 수급자"],
          ["연령", "18세 이상 60세 미만"],
          ["국민연금 이력", "가입 이력이 있어야 함 (납부 이력 1회 이상)"],
          ["최대 혜택 기간", "평생 12개월"],
          ["제외 대상", "60세 이상, 노령연금 수령 중인 자"],
        ]} />
        <TableNote>* 국민연금공단 기준 (2026년 현재).</TableNote>

        <InlineLink
          icon="🏛️"
          title="국민연금 임의가입 전업주부 안내"
          desc="국민연금 가입 이력이 없는 경우 임의가입 방법"
          href="/w/국민연금-임의가입-전업주부"
        />
        <SpokeLink num={1} title="실업급여 신청 방법 안내" desc="고용24 수급자격 신청 전체 절차" href="/w/실업급여-신청방법" />
      </Sec>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="amount" title="실업급여 실업크레딧 보험료를 얼마나 지원받나요?" sub="75% 정부 지원 · 인정 소득 기준">
        <P>실업크레딧의 인정 소득은 <B>실직 전 3개월 평균 소득의 50%</B>를 기준으로 해요. 단, 이 금액이 70만 원을 넘으면 최대 <B>70만 원</B>으로 제한돼요. 실직 전 소득이 높을수록 최대 기준이 의미 있어요.</P>
        <P>국민연금 보험료율은 9%예요. 인정 소득에 9%를 적용한 금액이 총 보험료예요. 이 중 <B>75%는 정부가 부담</B>하고 본인은 <B>25%만 내면 돼요</B>. 예를 들어 인정 소득이 70만 원이면 총 보험료는 63,000원이고, 본인 부담은 약 15,750원이에요.</P>
        <P>본인 부담 보험료(25%)를 납부해야 실업크레딧이 인정돼요. 납부를 안 하면 그 기간은 실업크레딧으로 인정되지 않아요. 납부는 국민연금공단에서 발송한 고지서로 납부하면 돼요.</P>
        <P>부담이 크다면 최소 인정 소득으로 적용받을 수 있어요. 인정 소득 하한은 없지만 소득이 너무 낮으면 최저 보험료가 적용될 수 있어요. 국민연금공단 상담을 받아보는 게 좋아요.</P>

        <Info type="warn">
          <B>납부 거부 시 해당 기간 실업크레딧 인정 안 돼요</B><br />
          정부 지원 75%와 본인 부담 25%를 함께 납부해야 가입 기간으로 인정돼요. 본인 부담 25%를 납부하지 않으면 그 달은 실업크레딧 혜택이 적용되지 않아요.
        </Info>
      </Sec>

      <RelatedMid
        title="실업급여 수급 중 챙겨야 할 제도들"
        items={[
          { icon: "📋", title: "실업급여 실업인정 특례", desc: "50세 이상·장애인 온라인 인정 완화", href: "/w/실업급여-실업인정-특례" },
          { icon: "💼", title: "실업급여 재취업 조건", desc: "조기재취업수당 신청 조건 안내", href: "/w/실업급여-재취업-조건" },
          { icon: "🏛️", title: "국민연금 조기수령 신청 조건", desc: "60세 이전 연금 수령 방법", href: "/w/국민연금-조기수령-신청-조건" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="period" title="실업급여 실업크레딧 신청 기간이 언제인가요?" sub="구직급여 수급 중 · 평생 12개월">
        <P>실업크레딧 신청은 <B>구직급여 수급 기간 내</B>에만 가능해요. 수급이 끝난 후에는 신청할 수 없어요. 구직급여를 받기 시작한 날로부터 수급 종료일까지가 신청 가능 기간이에요.</P>
        <P>신청 방법은 <B>국민연금공단 지사 방문</B> 또는 <B>국민연금공단 홈페이지(www.nps.or.kr)</B>에서 온라인으로 가능해요. 신청 시 구직급여 수급자임을 확인할 수 있는 자료가 필요해요.</P>
        <P>실업크레딧은 구직급여 수급 기간마다 매월 신청해야 해요. 자동 연장되지 않기 때문에 매달 능동적으로 신청하거나 일괄 신청을 선택할 수 있어요. 고지서가 발송되면 납부하면 돼요.</P>
        <P>평생 최대 <B>12개월</B>이에요. 이전에 다른 직장에서 실업크레딧을 받은 기간이 있으면 합산해서 12개월이에요. 12개월이 모두 소진되면 더 이상 혜택을 받을 수 없어요.</P>

        <BridgeCard
          q="구직급여 수급 기간 내 국민연금을 왜 유지해야 하나요?"
          a="국민연금 가입 기간이 길수록 노후 수령액이 늘어나요. 실업 기간을 실업크레딧으로 채우면 공백 없이 가입 기간을 이어갈 수 있어요."
          label="국민연금 조기수령 조건 확인"
          href="/w/국민연금-조기수령-신청-조건"
        />
      </Sec>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="benefit" title="실업급여 실업크레딧 가입이 노후에 유리한가요?" sub="연금 수령액 증가 · 가입 기간 효과">
        <P>국민연금은 가입 기간이 길수록 노후에 더 많은 연금을 받아요. 실직 기간에 실업크레딧을 통해 가입 기간을 유지하면 <B>노후 수령 연금액이 늘어나요</B>. 매달 약 1만5천 원의 본인 부담으로 가입 기간 1개월을 확보하는 셈이에요.</P>
        <P>국민연금 최소 수령 조건은 <B>가입 기간 10년(120개월)</B>이에요. 가입 기간이 10년 미만이면 노령연금 수령 자체가 안 돼요. 실업크레딧으로 10년을 채우면 수령 자격이 생기는 경우도 있어요.</P>
        <P>실업크레딧은 본인 부담이 25%로 낮아서 비용 대비 효과가 매우 높아요. 인정 소득 70만 원 기준으로 본인 부담은 월 약 15,750원이에요. 이 금액으로 노후 연금 수령 가능 기간을 1개월 늘릴 수 있어요.</P>
        <P>따라서 구직급여를 받고 있다면 실업크레딧을 통해 국민연금을 유지하는 것을 적극 고려하는 게 좋아요. 특히 국민연금 가입 기간이 10년에 가까운 분들에게는 거의 필수적인 선택이에요.</P>

        <InlineLink
          icon="🏛️"
          title="국민연금 조기수령 신청 조건"
          desc="연금 수령 시기와 가입 기간 최소 요건 확인"
          href="/w/국민연금-조기수령-신청-조건"
        />

        <SpokeLink num={2} title="국민연금 임의가입 전업주부 안내" desc="소득 없는 분의 국민연금 임의가입 방법" href="/w/국민연금-임의가입-전업주부" />

        <ExtBtn
          badge="국민연금공단 공식"
          text="실업크레딧 신청 및 안내"
          cta="신청하기 →"
          href="https://www.nps.or.kr/jsppage/business/insure/credit/unemployment_credit.jsp"
        />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "국민연금 임의가입 전업주부 안내", href: "/w/국민연금-임의가입-전업주부" },
        { title: "국민연금 조기수령 신청 조건", href: "/w/국민연금-조기수령-신청-조건" },
        { title: "실업급여 신청 방법 전체 절차", href: "/w/실업급여-신청방법" },
        { title: "실업급여 실업인정 특례 조건", href: "/w/실업급여-실업인정-특례" },
        { title: "실업급여 재취업 조건 안내", href: "/w/실업급여-재취업-조건" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 실업인정 특례 조건", href: "/w/실업급여-실업인정-특례" }}
        next={{ title: "실업급여 재취업 조건 안내", href: "/w/실업급여-재취업-조건" }}
      />
    </BlogLayout>
  );
}
