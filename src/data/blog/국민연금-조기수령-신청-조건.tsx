"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "국민연금 조기노령연금 신청 조건 | 만 60세 수령 감액 손익분기점",
  description: "국민연금을 일찍 받으면 매달 6%씩 감액된다는 거 알고 계셨나요? 조기수령 조건과 감액률, 손익분기점을 알려드려요.",
  category: "국민연금",
  keywords: [
    "국민연금 조기수령 신청 나이 조건",
    "국민연금 조기노령연금 감액 비율 계산",
    "국민연금 조기수령 손익분기점 나이",
    "국민연금 조기노령연금 소득 기준 신청",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "국민연금 조기수령은 만 60세부터 가능하고, <strong>1개월 앞당길 때마다 0.5%씩</strong> 감액돼요.",
    "최대 5년 일찍 받으면 <strong>30% 감액</strong>된 금액을 평생 받아요.",
    "일반적으로 만 <strong>78~82세</strong> 전후에 조기수령과 정상수령의 총 수령액이 같아져요.",
  ],
  sources: [
    { name: "국민연금법 제61조 조기노령연금", url: "https://www.law.go.kr/법령/국민연금법", date: "2026-02" },
    { name: "국민연금공단 조기노령연금 안내", url: "https://www.nps.or.kr/jsppage/business/benefits/benefits_01.jsp", date: "2026-02" },
  ],
  faq: [
    { q: "국민연금 조기수령 후 소득이 생기면 어떻게 되나요?", a: "조기수령 중 소득이 생기면 연금이 일시 정지될 수 있어요. 소득 있는 업무에 종사하면 국민연금 공단에 신고해야 해요. 소득이 일정 기준(A값)을 초과하면 지급이 정지돼요. 소득이 없어지면 다시 수령할 수 있어요." },
    { q: "국민연금 조기수령 신청 후 취소할 수 있나요?", a: "조기수령을 시작한 후 취소는 원칙적으로 불가능해요. 한 번 감액된 금액으로 평생 받아야 해요. 신청 전에 손익분기점과 예상 수령액을 충분히 비교한 후 결정하세요." },
  ],
  ctaCard: {
    label: "30초 계산",
    mainText: "내 조기수령 감액 금액 확인",
    subText: "현재 나이·예상 수령액 선택",
    url: "https://www.nps.or.kr/jsppage/business/benefits/benefits_01.jsp",
    external: true,
  },
  relatedDocs: [
    { title: "국민연금 임의가입 전업주부", url: "/w/국민연금-임의가입-전업주부" },
    { title: "건강보험 피부양자 탈락 조건", url: "/w/건강보험-피부양자-탈락-조건-2026" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { age, years_early, income } = sel;
    if (!age || !years_early || !income) return null;
    if (income === "has_income") return "ineligible_income";
    if (age === "under55") return "too_young";
    return "eligible";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 조기수령 신청 가능 여부 확인" },
    { t: "국민연금 조기노령연금 신청 조건은 무엇인가요?", sub: "신청 나이 · 납부 기간 · 소득 없는 업무" },
    { t: "국민연금 조기수령 감액 비율은 얼마인가요?", sub: "월 0.5% 감액 · 최대 30% 감액" },
    { t: "국민연금 조기수령 손익분기점은 언제인가요?", sub: "총 수령액 비교 · 나이별 손익분기점" },
    { t: "국민연금 조기노령연금 신청 방법은 어떻게 되나요?", sub: "신청 서류 · 신청 방법 · 소득 기준 신고" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "국민연금", "조기수령"]}
      tags={["2026년 최신", "국민연금", "조기수령", "노령연금"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>국민연금 조기수령은 만 60세부터 가능하지만 <strong>최대 30% 감액</strong>이에요. 손익분기점을 확인하고 신중하게 결정하세요.</>}
      sourceBar={{ badge: "법제처", name: "국민연금법 제61조", date: "2026.02" }}
      stickyLabel="감액률"
      stickyValue="1개월당 0.5% 감액"
      stickyBtn="신청 조건 확인 ↑"
      disclaimer="이 글은 국민연금법과 국민연금공단 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📊", title: "국민연금 예상 수령액 확인", sub: "국민연금공단 공식 계산기", href: "https://www.nps.or.kr", hot: true },
          { icon: "💰", title: "국민연금 임의가입 전업주부", sub: "최소 보험료와 수령액 손익", href: "/w/국민연금-임의가입-전업주부" },
          { icon: "🏥", title: "건강보험 피부양자 탈락", sub: "2026년 소득·재산 기준", href: "/w/건강보험-피부양자-탈락-조건-2026" },
        ]} />
        <SidebarDocs items={[
          { title: "국민연금 임의가입 전업주부", cat: "국민연금·노후", href: "/w/국민연금-임의가입-전업주부" },
          { title: "건강보험 피부양자 탈락", cat: "건강보험·의료", href: "/w/건강보험-피부양자-탈락-조건-2026" },
        ]} />
        <SidebarCalc items={[
          { title: "국민연금 예상 수령액 계산기", href: "https://www.nps.or.kr" },
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="조기수령 신청 가능 여부 확인" sub="현재 나이 · 납부 기간 · 소득 유무 선택" />
      <P>국민연금 조기수령은 아무나 할 수 있는 게 아니에요. 나이, 납부 기간, 소득 조건을 모두 충족해야 해요. 아래에서 내 상황을 선택해보세요.</P>

      <CheckerShell title="내가 조기수령 신청할 수 있나요?" sub="30초 확인">
        <CheckerQ n="1" label="현재 나이가 어떻게 되나요?" group="age" opts={[
          ["under55", "만 55세 미만이에요"],
          ["55to59", "만 55세~59세 사이예요"],
          ["over60", "만 60세 이상이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="국민연금 납부 기간이 얼마나 되나요?" group="years" opts={[
          ["under10", "10년 미만이에요"],
          ["over10", "10년 이상이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="현재 소득이 있는 업무에 종사하고 계신가요?" group="income" opts={[
          ["no_income", "없어요 (전업 또는 구직 중)"],
          ["has_income", "네, 소득이 있어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="몇 년 일찍 받으려고 하나요?" group="years_early" opts={[
          ["1year", "1년 일찍 (만 64세 또는 그 해당 나이)"],
          ["3years", "3년 일찍 (만 62세)"],
          ["5years", "5년 일찍 (만 60세 — 최대 감액)"],
        ]} sel={sel} pick={pick} />

        {result === "ineligible_income" && (
          <ResultFail title="소득이 있으면 조기수령이 안 돼요">
            <P>조기수령 신청 조건 중 하나가 '소득이 있는 업무에 종사하지 않을 것'이에요. 현재 소득이 있다면 정상 수령 나이까지 기다리거나, 소득이 없어지면 그때 조기수령을 신청할 수 있어요.</P>
          </ResultFail>
        )}
        {result === "too_young" && (
          <ResultFail title="아직 조기수령 신청 나이가 아니에요">
            <P>조기수령은 만 60세부터 신청할 수 있어요. 정확히는 정상 수령 나이 기준으로 최대 5년 전부터 가능해요. 1969년 이후 출생자는 정상 수령이 만 65세이므로 조기수령 신청은 만 60세부터예요.</P>
          </ResultFail>
        )}
        {result === "eligible" && (
          <ResultPass title="조기수령 신청이 가능해요">
            <P>조기수령 신청 조건을 충족해요. 하지만 일찍 받을수록 감액 비율이 높아지므로 손익분기점을 먼저 확인하고 결정하세요. 한 번 시작하면 취소가 어려워요.</P>
            <ResultCTA icon="📊" title="국민연금 예상 수령액 확인" desc="조기·정상 수령 금액 비교" href="https://www.nps.or.kr" />
          </ResultPass>
        )}
      </CheckerShell>

      <BridgeCard
        q="조기수령하면 감액이 얼마나 되는지 궁금하시죠?"
        a="1개월에 0.5%씩, 5년 일찍 받으면 30% 감액이에요. 손익분기점도 알려드려요."
        label="감액 기준 바로 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="국민연금 조기노령연금 신청 조건은 무엇인가요?" sub="신청 나이 · 납부 기간 · 소득 없는 업무" />
      <P>조기노령연금(조기수령)은 정상 수령 나이보다 일찍 국민연금을 받는 제도예요. <A href="https://www.law.go.kr/법령/국민연금법">국민연금법 제61조</A>에 따른 제도로 다음 3가지 조건을 모두 충족해야 해요.</P>
      <P>첫째, 가입 기간이 10년 이상이어야 해요. 10년 미만이면 반환일시금을 받거나 계속 납부해야 해요. 둘째, 정상 수령 나이보다 1~5년 일찍(최소 만 60세 이상)이어야 해요. 셋째, 소득이 있는 업무에 종사하지 않아야 해요.</P>
      <P>정상 수령 나이는 출생연도에 따라 달라요. 1952년 이전 출생자는 만 60세, 1969년 이후 출생자는 만 65세예요. 중간 세대는 단계적으로 높아져요.</P>
      <P>소득이 있는 업무 종사 여부가 중요해요. 근로소득, 사업소득이 있으면 조기수령이 안 돼요. 이자·배당 등 금융소득이나 연금소득은 소득이 있는 업무로 보지 않아요.</P>

      <H3>신청 나이</H3>
      <TableTitle>출생연도별 정상 수령 나이와 조기수령 시작 나이</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>출생연도</THL><TH>정상 수령 나이</TH><TH>조기수령 시작 가능 나이</TH></tr>
          </thead>
          <tbody>
            {[
              ["1952년 이전", "만 60세", "만 55세"],
              ["1953~1956년", "만 61세", "만 56세"],
              ["1957~1960년", "만 62세", "만 57세"],
              ["1961~1964년", "만 63세", "만 58세"],
              ["1965~1968년", "만 64세", "만 59세"],
              ["1969년 이후", "만 65세", "만 60세"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="국민연금 조기수령 감액 비율은 얼마인가요?" sub="월 0.5% 감액 · 최대 30% 감액" />
      <P>조기수령 감액 비율은 1개월 앞당길 때마다 0.5%씩 감액돼요. 12개월(1년) 일찍 받으면 6%, 24개월(2년) 일찍 받으면 12%, 60개월(5년) 일찍 받으면 30%가 영구적으로 감액돼요.</P>
      <P>예를 들어 정상 수령 시 월 100만원을 받을 수 있는 사람이 5년 일찍 받으면 70만원(30% 감액)을 평생 받아요. 이 감액은 영구적이에요. 취소가 안 되고 나중에 소득이 없어도 감액 비율이 회복되지 않아요.</P>
      <P>감액된 금액은 물가 상승률에 따라 매년 조정돼요. 국민연금은 소비자물가지수(CPI) 기반으로 연금액이 인상되기 때문에 실질 가치가 유지돼요. 70만원을 받더라도 10년 후에는 그보다 높아져 있어요.</P>
      <P>부부가 모두 국민연금을 받는 경우, 한 명이 먼저 사망하면 배우자 연금이 일부 감액될 수 있어요. 조기수령을 선택할 때 배우자 연금 영향도 함께 고려하세요.</P>

      <H3>월 0.5% 감액</H3>
      <Info type="warn">{"조기수령 신청 후에는 취소가 어려워요. 감액된 금액을 평생 받아야 하므로, 건강 상태와 예상 수명, 손익분기점을 충분히 고려한 후 결정하세요."}</Info>

      <RelatedMid
        title="국민연금 관련 글도 확인해 보세요"
        items={[
          { icon: "💰", title: "국민연금 임의가입 전업주부", desc: "전업주부 임의가입 조건과 손익분기점", href: "/w/국민연금-임의가입-전업주부" },
          { icon: "🏥", title: "건강보험 피부양자 탈락", desc: "2026년 소득·재산 탈락 기준", href: "/w/건강보험-피부양자-탈락-조건-2026" },
          { icon: "📊", title: "종합소득세 신고 가산세", desc: "연금 외 소득 있으면 신고 필수", href: "/w/종합소득세-신고-안하면-가산세" },
        ]}
        hubHref="/category/국민연금"
        hubLabel="국민연금 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="국민연금 조기수령 손익분기점은 언제인가요?" sub="총 수령액 비교 · 나이별 손익분기점" />
      <P>손익분기점은 조기수령으로 받은 총액과 정상 수령으로 받았을 총액이 같아지는 나이예요. 이 나이보다 오래 살면 정상 수령이 유리하고, 이보다 일찍 사망하면 조기수령이 유리해요.</P>
      <P>5년 일찍 받는 경우(30% 감액)의 손익분기점은 약 만 83세예요. 즉, 83세 이전에 사망하면 조기수령이 유리하고, 83세 이후까지 살면 정상 수령이 유리해요. 단, 이 계산은 운용 수익이나 물가 상승을 반영하지 않은 단순 계산이에요.</P>
      <P>1년 일찍 받는 경우(6% 감액)는 손익분기점이 약 만 77세예요. 감액 기간이 짧을수록 손익분기점이 빨리 와요.</P>
      <P>개인 건강 상태, 가족력, 다른 수입원, 현재 재정 상황 등을 종합적으로 고려해야 해요. 건강이 좋지 않거나 빠른 현금이 필요한 경우에는 조기수령이 유리할 수 있어요.</P>

      <H3>나이별 손익분기점</H3>
      <BridgeCard
        q="국민연금 임의가입으로 수령액을 늘리는 방법도 궁금하시죠?"
        a="납부 기간을 늘리면 수령액이 올라가요. 전업주부도 임의가입으로 늘릴 수 있어요."
        label="국민연금 임의가입 알아보기"
        href="/w/국민연금-임의가입-전업주부"
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="국민연금 조기노령연금 신청 방법은 어떻게 되나요?" sub="신청 서류 · 신청 방법 · 소득 기준 신고" />
      <P>조기수령 신청은 국민연금공단 지사 방문, 우편, 팩스, 인터넷(내연금)으로 할 수 있어요. 신청 즉시 바로 수령이 시작되는 게 아니라, 신청 다음 달부터 연금이 지급돼요.</P>
      <P>신청 서류는 노령연금 수급권자 확인 신청서와 신분증이에요. 추가 서류가 필요하면 공단에서 별도 안내해줘요. 금융기관 통장 사본도 필요해요.</P>
      <P>수령 중 소득이 생기면 신고해야 해요. 소득이 국민연금 A값(전체 가입자 평균 소득)을 초과하면 연금이 정지돼요. 소득이 없어지면 다시 수령 신청을 하면 돼요. A값은 매년 조정돼요.</P>
      <P>인터넷 신청은 '내연금' 홈페이지(nps.or.kr)에서 공동인증서로 로그인 후 신청할 수 있어요. 방문이 어려운 분들에게 편리해요.</P>

      <H3>신청 서류</H3>
      <ExtBtn
        badge="국민연금공단"
        text="조기노령연금 신청하기"
        cta="바로가기 →"
        href="https://www.nps.or.kr/jsppage/business/benefits/benefits_01.jsp"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "국민연금 임의가입 전업주부 조건 | 월 보험료 수령액 손익분기점", desc: "전업주부 임의가입 조건과 손익분기점을 알아보세요", href: "/w/국민연금-임의가입-전업주부" },
        { title: "건강보험 피부양자 탈락 조건 2026 | 금융소득 초과 지역가입자 전환", desc: "소득·금융소득·재산 탈락 기준 3가지를 알아보세요", href: "/w/건강보험-피부양자-탈락-조건-2026" },
        { title: "건강보험 지역가입자 보험료 계산 | 재산 소득 점수 부과 방식", desc: "소득·재산·자동차를 점수로 환산하는 방법이에요", href: "/w/건강보험-지역가입자-보험료-계산" },
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "연금 외 소득 있으면 신고 안 하면 가산세가 붙어요", href: "/w/종합소득세-신고-안하면-가산세" },
        { title: "재산세 납부 기간 2026 | 7월 9월 분납 주택 토지 계산", desc: "2026년 재산세 납부 기간과 계산 방법이에요", href: "/w/재산세-납부-기간-2026" },
      ]} />

      <PrevNext
        prev={{ title: "국민연금 임의가입 전업주부 조건 | 월 보험료 수령액 손익분기점", href: "/w/국민연금-임의가입-전업주부" }}
        next={{ title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", href: "/w/종합소득세-신고-안하면-가산세" }}
      />
    </BlogLayout>
  );
}
