"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  FormulaCard, CaseBox, ChipsGrid,
} from "@/components/wiki/BlogShared";

type Q1 = "y" | "n";
type Q2 = "y" | "n";
type Q3 = "regular" | "startup" | "short";
type Q4 = "none" | "had";

const meta = {
  title: "실업급여 재취업 조건 안내 | 조기재취업수당 잔여일수 절반 지급",
  description: "구직급여 수급 중 재취업했다면 조기재취업수당을 받을 수 있어요. 잔여일수 절반 이상, 12개월 이상 고용 조건부터 신청 시점까지 알려드려요.",
  category: "실업급여",
  keywords: [
    "실업급여 재취업 조건 안내",
    "조기재취업수당 잔여일수 기준",
    "실업급여 재취업 사례 판단",
    "실업급여 재취업 후 재신청 조건",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "조기재취업수당 = 잔여일수 × 1일 구직급여액 × 50%",
    "잔여 소정급여일수 절반 이상 + 12개월 이상 고용이 필수 조건이에요",
    "재취업 후 12개월이 지난 뒤 고용센터 또는 고용24에서 신청해요",
  ],
  sources: [
    { name: "고용보험법 제64조 조기재취업수당", url: "https://www.law.go.kr/lsSc.do?menuId=1&subMenuId=15&tabMenuId=81&query=%EA%B3%A0%EC%9A%A9%EB%B3%B4%ED%97%98%EB%B2%95#undefined", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 재취업 후 조기수당은 언제 신청하나요?", a: "재취업일로부터 12개월이 지난 뒤 고용센터 또는 고용24에서 신청해요. 재취업 즉시 신청하는 게 아니라 12개월 계속 고용이 확인된 뒤에 신청하는 구조예요." },
    { q: "실업급여 재취업 조기수당은 세금이 붙나요?", a: "조기재취업수당은 비과세 소득이에요. 구직급여와 동일하게 소득세가 부과되지 않아요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "조기재취업수당 받을 수 있을까?",
    subText: "조건 체크하고 바로 결과 확인",
    url: "#checker",
    external: false,
  },
  relatedDocs: [{ title: "실업급여 소정급여일수", url: "/w/실업급여-소정급여일수" }],
};

export default function Page() {
  const [q1, setQ1] = useState<Q1 | "">("");
  const [q2, setQ2] = useState<Q2 | "">("");
  const [q3, setQ3] = useState<Q3 | "">("");
  const [q4, setQ4] = useState<Q4 | "">("");

  type ResLink = { icon: string; title: string; desc: string; href: string };
  type GridItem = { icon: string; name: string; pass: boolean; desc: string };
  type Result = { pass: boolean; title: string; desc: string; grid: GridItem[]; links: ResLink[] };

  function getResult(): Result | null {
    if (!q1 || !q2 || !q3 || !q4) return null;

    const grid: GridItem[] = [
      { icon: "💰", name: "구직급여 수급 중", pass: q1 === "y", desc: q1 === "y" ? "현재 수급 중이에요" : "미신청 상태예요" },
      { icon: "📅", name: "잔여일수 50% 이상", pass: q2 === "y", desc: q2 === "y" ? "절반 이상 남아있어요" : "절반 미만이에요" },
      { icon: "🏢", name: "12개월 이상 고용", pass: q3 !== "short", desc: q3 === "regular" ? "정규직·계약직 가능" : q3 === "startup" ? "자영업 창업 가능" : "단기직 미충족" },
      { icon: "📋", name: "3년 재수급 없음", pass: q4 === "none", desc: q4 === "none" ? "재수급 이력 없음" : "3년 이내 이력 있음" },
    ];
    const allPass = grid.every((g) => g.pass);

    if (allPass) {
      return {
        pass: true,
        title: "조기재취업수당 신청 가능해요",
        desc: "4가지 조건이 모두 충족돼요. 재취업 후 12개월 뒤 고용24에서 잔여일수 × 50% 금액을 신청하세요.",
        grid,
        links: [
          { icon: "🏢", title: "고용24 조기재취업수당 신청", desc: "재취업 12개월 후 온라인 신청", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do" },
          { icon: "📅", title: "실업급여 소정급여일수 확인", desc: "잔여일수 계산 기준 정리", href: "/w/실업급여-소정급여일수" },
          { icon: "💰", title: "실업급여 연봉별 계산 예시", desc: "내 월급 기준 구직급여 예상액", href: "/w/실업급여-연봉별-계산" },
          { icon: "📋", title: "실업급여 신청방법 안내", desc: "고용24 온라인 신청 단계별", href: "/w/실업급여-신청방법" },
        ],
      };
    }
    return {
      pass: false,
      title: "미충족 조건이 있어요",
      desc: "빨간 항목을 확인해 보세요. 조건을 갖추면 조기재취업수당을 받을 수 있어요.",
      grid,
      links: [
        { icon: "📋", title: "실업급여 수급자격 인정 조건", desc: "기본 수급 요건 전체 정리", href: "/w/실업급여-수급자격-인정" },
        { icon: "📅", title: "실업급여 소정급여일수 기준", desc: "나이·피보험기간별 일수 확인", href: "/w/실업급여-소정급여일수" },
        { icon: "🏢", title: "실업급여 신청방법 안내", desc: "고용24 온라인 신청 전체 흐름", href: "/w/실업급여-신청방법" },
        { icon: "🔍", title: "실업급여 실업인정 특례 조건", desc: "온라인 인정 구직활동 완화", href: "/w/실업급여-실업인정-특례" },
      ],
    };
  }

  const result = getResult();

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "재취업 조건"]}
      tags={["2026년 최신", "실업급여", "조기재취업수당"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>구직급여를 받는 도중 취업에 성공했다면 <B>조기재취업수당</B>을 받을 수 있어요. 잔여 소정급여일수의 <B>절반 이상</B>이 남아있고 <B>12개월 이상</B> 고용이 유지되어야 해요. 조건을 체크하면 바로 알 수 있어요.</>}
      sourceBar={{ badge: "법령", name: "고용보험법 제64조 조기재취업수당", date: "2026.02 기준" }}
      stickyLabel="수당 지급"
      stickyValue="잔여일수 50%"
      stickyBtn="조기수당 조건 확인 ↑"
      disclaimer="이 글은 고용보험법 제64조를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 수급 여부는 고용센터에서 확인하세요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💰", title: "조기재취업수당 신청", sub: "잔여일수 50% 한번에 수령", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do", hot: true },
          { icon: "📋", title: "실업급여 계산기", sub: "나의 구직급여 예상액 확인", href: "/w/실업급여-연봉별-계산" },
          { icon: "📅", title: "실업급여 수급기간", sub: "최대 9개월 일수 확인", href: "/w/실업급여-수급기간-몇개월-받나요" },
        ]} />
        <SidebarDocs items={[
          { title: "실업급여 소정급여일수", cat: "실업급여·지급일수", href: "/w/실업급여-소정급여일수" },
          { title: "실업급여 신청방법 안내", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
          { title: "실업급여 수급기간", cat: "실업급여·수급", href: "/w/실업급여-수급기간-몇개월-받나요" },
          { title: "실업급여 실업인정 특례", cat: "실업급여·인정", href: "/w/실업급여-실업인정-특례" },
          { title: "실업급여 수급자격 인정", cat: "실업급여·자격", href: "/w/실업급여-수급자격-인정" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-연봉별-계산" },
          { title: "퇴직금 계산기", href: "/w/퇴직급여-지급-지연이자-받기" },
          { title: "건강보험료 계산기", href: "/w/건강보험-지역가입자-보험료-계산" },
          { title: "연말정산 계산기", href: "/w/프리랜서-3.3-원천징수-환급" },
          { title: "소득세 계산기", href: "/w/종합소득세-신고-안하면-가산세" },
        ]} />
      </>}
    >
      <TOC items={[
        { t: "조기재취업수당 받을 수 있을까?", sub: null },
        { t: "실업급여 재취업 조기수당 조건은?", sub: "잔여일수 절반 이상 · 12개월 이상 고용 필수" },
        { t: "실업급여 재취업 수당 지급액은?", sub: "잔여일수 50% · 재취업 12개월 후 신청" },
        { t: "실업급여 재취업 사례별 판단은?", sub: "정규직 · 자영업 · 단기직 사례 비교" },
        { t: "실업급여 재취업 후 재신청 가능한가요?", sub: "재실업 시 재수급 · 3년 제한 조건" },
        { t: "자주 묻는 질문", sub: null },
      ]} />
      <Summary3 items={[
        "조기재취업수당 = 잔여일수 × 1일 구직급여액 × 50%",
        "잔여 소정급여일수 절반 이상 + 12개월 이상 고용이 필수 조건이에요",
        "재취업 후 12개월이 지난 뒤 고용센터 또는 고용24에서 신청해요",
      ]} />

      <Sec n={1} id="checker" title="조기재취업수당 받을 수 있을까?" sub={null}>
        <P>구직급여를 받는 도중 취업에 성공했다면, 남은 수급일수에 해당하는 금액을 한꺼번에 받는 제도가 있어요. 바로 <B>조기재취업수당</B>이에요.</P>
        <P>4가지 조건을 선택하면 바로 수급 가능 여부를 알 수 있어요. 아래 체커에서 내 상황과 맞는지 확인해 보세요.</P>
        <CheckerShell title="조기재취업수당 받을 수 있을까?" subtitle="30초 확인" intro="4가지 조건을 선택하면 바로 결과를 알려드려요.">
          <CheckerQ n={1} group={1} label="현재 구직급여 수급 중인가요?" opts={[["y", "수급 중이에요"], ["n", "아직 미신청이에요"]]} sel={q1} pick={setQ1 as (v: string) => void} />
          <CheckerQ n={2} group={1} label="잔여 소정급여일수가 절반 이상인가요?" opts={[["y", "절반(50%) 이상 남았어요"], ["n", "절반 미만이에요"]]} sel={q2} pick={setQ2 as (v: string) => void} />
          <CheckerQ n={3} group={2} label="재취업 형태가 어떻게 되나요?" opts={[["regular", "정규직·계약직 (12개월 이상)"], ["startup", "자영업·사업 창업"], ["short", "단기·임시직 (12개월 미만)"]]} sel={q3} pick={setQ3 as (v: string) => void} />
          <CheckerQ n={4} group={2} label="최근 3년 내 조기재취업수당 받은 적 있나요?" opts={[["none", "받은 적 없어요"], ["had", "이전에 받은 적 있어요"]]} sel={q4} pick={setQ4 as (v: string) => void} />
          {result && (() => {
            const links = result.links as ResLink[];
            return result.pass ? (
              <ResultPass title={result.title} desc={result.desc}>
                <ResultGrid items={result.grid} />
                {links.map((l) => (
                  <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
                ))}
              </ResultPass>
            ) : (
              <ResultFail title={result.title} desc={result.desc}>
                <ResultGrid items={result.grid} />
                {links.map((l) => (
                  <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
                ))}
              </ResultFail>
            );
          })()}
        </CheckerShell>
      </Sec>

      <Divider />

      <BridgeCard
        q="체커를 통과했다면 조기재취업수당 신청 준비를 시작하세요"
        a="재취업 후 12개월이 지난 시점에 고용24 또는 고용센터에서 신청하면 돼요."
        label="고용24 신청 바로가기"
        href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
      />

      <Sec n={2} id="condition" title="실업급여 재취업 조기수당 조건은?" sub="잔여일수 절반 이상 · 12개월 이상 고용 필수">
        <P>조기재취업수당은 <B>고용보험법 제64조</B>에 따라 운영되는 취업촉진수당의 하나예요. 구직급여 수급자가 조기에 재취업하도록 장려하기 위해 만들어진 제도예요.</P>
        <P>첫 번째 조건은 <B>잔여 소정급여일수의 절반(50%) 이상</B>이 남아있어야 해요. 소정급여일수가 180일이라면 90일 이상이 남은 상태에서 재취업해야 해요. 잔여일수가 절반 미만이면 조기재취업수당이 아닌 다른 취업촉진수당을 검토해야 해요.</P>
        <P>두 번째 조건은 <B>12개월 이상 계속 고용</B>이에요. 재취업한 사업장에서 고용보험 피보험자로 12개월 이상 유지돼야 해요. 자영업자로 창업한 경우에는 사업자 등록 후 12개월 이상 사업을 영위해야 해요.</P>
        <P>세 번째 조건은 <B>재취업 전 3년 이내에 조기재취업수당을 받은 사실이 없을 것</B>이에요. 이전에 이미 받은 적이 있다면 3년이 지난 뒤에만 다시 신청할 수 있어요. 대기기간 7일이 경과한 뒤 재취업해야 하는 것도 필수 조건이에요.</P>
        <TableTitle>조기재취업수당 4가지 필수 조건</TableTitle>
        <TH cols={["조건", "기준", "충족 여부"]} rows={[
          ["구직급여 수급 중", "수급자격 인정 + 대기기간(7일) 경과 후", "수급 중이어야 함"],
          ["잔여일수 50% 이상", "소정급여일수의 절반 이상 남아있어야 함", "절반 이상 필수"],
          ["12개월 이상 고용", "정규직·계약직·자영업 모두 인정, 단기직 제외", "12개월 계속 유지"],
          ["3년 이내 재수급 없음", "이전 조기재취업수당 수령일로부터 3년 경과", "중복 수령 불가"],
        ]} />
        <TableNote>* 4가지 조건 중 하나라도 미충족 시 수당 지급이 불가해요.</TableNote>
        <Info type="warn">{"<strong>대기기간 이후 재취업이어야 해요:</strong> 수급자격 인정 후 대기기간(7일)이 지난 상태에서 재취업해야 조기재취업수당 대상이 돼요. 대기기간 중 재취업한 경우에는 해당되지 않아요."}</Info>
        <InlineLink icon="📋" title="실업급여 대기기간 안내" desc="7일 대기기간 및 예외 조건 상세 정리" href="/w/실업급여-대기기간" />
      </Sec>

      <Divider />

      <Sec n={3} id="amount" title="실업급여 재취업 수당 지급액은?" sub="잔여일수 50% · 재취업 12개월 후 신청">
        <H3>지급액 계산 공식</H3>
        <P>조기재취업수당 지급액은 <B>잔여 소정급여일수 × 1일 구직급여액 × 50%</B>로 계산돼요. 재취업한 날 기준으로 남아있는 소정급여일수에 1일 지급액을 곱한 뒤 50%를 지급하는 구조예요.</P>
        <P>예를 들어 소정급여일수 180일 중 100일이 남은 상태에서 재취업했고, 1일 구직급여액이 66,000원(상한액)이라면 지급액은 <B>100일 × 66,000원 × 50% = 3,300,000원</B>이 돼요.</P>
        <H3>신청 시기와 방법</H3>
        <P>조기재취업수당은 재취업일로부터 <B>12개월이 지난 뒤</B>에 신청해야 해요. 재취업 직후 신청하는 게 아니라, 12개월 계속 고용이 확인된 뒤에 신청하는 구조예요. 12개월 미만 시점에 신청하면 접수가 안 돼요.</P>
        <P>신청은 고용24 온라인(www.ei.go.kr) 또는 거주지 관할 고용센터 방문으로 할 수 있어요. 재직증명서, 4대보험 가입확인서, 급여명세서 등 12개월 이상 근무를 증빙하는 서류가 필요해요.</P>
        <InlineLink icon="💰" title="실업급여 상한액 하한액 기준" desc="구직급여 1일 지급액 확인 방법" href="/w/실업급여-상한액" />
      </Sec>

      <RelatedMid
        title="실업급여 다른 수당도 함께 살펴보세요"
        items={[
          { icon: "📅", title: "실업급여 소정급여일수", desc: "나이·피보험기간별 120~270일", href: "/w/실업급여-소정급여일수" },
          { icon: "💰", title: "실업급여 연봉별 계산", desc: "월급별 예상 실수령액 비교", href: "/w/실업급여-연봉별-계산" },
          { icon: "📋", title: "실업급여 상한액 하한액", desc: "2026년 기준 일일 상한 66,000원", href: "/w/실업급여-상한액" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      <Sec n={4} id="cases" title="실업급여 재취업 사례별 판단은?" sub="정규직 · 자영업 · 단기직 사례 비교">
        <H3>정규직으로 재취업한 이 씨 (32세)</H3>
        <P>소정급여일수 150일 중 90일이 남은 상태에서 IT 회사에 정규직으로 재취업했어요. 잔여일수가 150일의 절반(75일) 이상이므로 조건이 충족돼요. 12개월 후 고용24에서 신청하면 <B>90일 × 구직급여 1일액 × 50%</B>를 받을 수 있어요.</P>
        <H3>자영업으로 창업한 박 씨 (45세)</H3>
        <P>구직급여 180일 중 110일이 남은 상태에서 소규모 카페를 창업했어요. 자영업도 사업자 등록 후 12개월 이상 사업을 영위하면 조기재취업수당 대상이에요. 12개월 후 사업자 등록증, 부가세 신고서 등을 지참해 고용센터에 신청할 수 있어요.</P>
        <H3>단기 계약직으로 취업한 김 씨 (38세)</H3>
        <P>소정급여일수 120일 중 70일이 남아 잔여일수 조건은 충족됐어요. 하지만 계약 기간이 3개월짜리 단기직이라 12개월 이상 고용 조건을 충족하지 못해요. 계약이 12개월 이상 연장되거나 정규직으로 전환되면 그때 다시 조건을 확인해 볼 수 있어요.</P>
        <BridgeCard
          q="재취업 후 구직급여 수급은 자동으로 중단되나요?"
          a="재취업하면 구직급여 수급이 중단돼요. 고용24 또는 고용센터에 재취업 사실을 신고해야 해요."
          label="실업급여 실업인정 안내 보기"
          href="/w/실업급여-실업인정-특례"
        />
      </Sec>

      <Divider />

      <Sec n={5} id="renew" title="실업급여 재취업 후 재신청 가능한가요?" sub="재실업 시 재수급 · 3년 제한 조건">
        <P>조기재취업수당을 받은 뒤 다시 실업 상태가 됐다면, 새로운 고용보험 피보험기간을 쌓아 다시 실업급여를 신청할 수 있어요. 조기재취업수당 수령 자체가 실업급여 재신청을 막지는 않아요.</P>
        <P>다만 조기재취업수당을 이미 받은 날로부터 <B>3년 이내에는 다시 조기재취업수당을 받을 수 없어요</B>. 구직급여 자체는 다시 신청 가능하지만, 조기재취업수당은 3년 제한이 적용돼요.</P>
        <P>재취업 후 다시 퇴직하면 새로운 피보험기간 <B>180일 이상</B>을 충족해야 새 구직급여를 받을 수 있어요. 조기재취업수당을 받으면서 다녔던 직장의 피보험기간도 새로운 수급 조건 계산에 포함돼요.</P>
        <P>이전 실업급여와 새로운 피보험기간을 합산하는 게 아니라, <B>가장 최근 이직일 이후의 피보험기간</B>이 180일 이상인지를 기준으로 판단해요. 재취업 직장을 오래 다닐수록 유리한 조건이 만들어져요.</P>
        <SpokeLink num={1} title="실업급여 수급자격 인정 조건" desc="비자발적 퇴사 · 피보험기간 180일 이상" href="/w/실업급여-수급자격-인정" />
        <SpokeLink num={2} title="실업급여 소정급여일수 기준" desc="나이·피보험기간별 120일~270일" href="/w/실업급여-소정급여일수" />
        <ExtBtn badge="고용보험 공식" text="조기재취업수당 온라인 신청" cta="바로가기 →" href="https://www.ei.go.kr/ei/eih/cm/hm/main.do" />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />
      <RelatedArticles items={[
        { title: "실업급여 소정급여일수 계산 기준", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 상한액 하한액 기준", href: "/w/실업급여-상한액" },
        { title: "실업급여 수급기간 몇 개월 받나요", href: "/w/실업급여-수급기간-몇개월-받나요" },
        { title: "실업급여 실업인정 특례 조건", href: "/w/실업급여-실업인정-특례" },
        { title: "실업급여 신청방법 안내", href: "/w/실업급여-신청방법" },
      ]} />
      <PrevNext
        prev={{ title: "실업급여 실업크레딧 가입 조건", href: "/w/실업급여-실업크레딧" }}
        next={{ title: "실업급여 구비서류 준비 목록", href: "/w/실업급여-구비서류" }}
      />
    </BlogLayout>
  );
}
