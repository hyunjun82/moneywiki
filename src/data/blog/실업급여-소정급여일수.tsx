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
  title: "실업급여 소정급여일수 계산 기준 | 피보험기간 나이별 120일 270일",
  description: "실업급여 소정급여일수는 피보험기간과 나이에 따라 120일~270일로 달라져요. 1년 미만은 모두 120일이고, 50세 이상·장애인은 같은 기간도 더 많은 일수를 받아요.",
  category: "실업급여",
  keywords: ["실업급여 소정급여일수 계산 기준", "피보험기간 나이별 수급일수", "소정급여일수 120일 270일", "소정급여일수 연장 특례"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "소정급여일수는 피보험기간·나이에 따라 최소 120일~최대 270일",
    "50세 이상·장애인은 같은 피보험기간이어도 30일 더 많이 받아요",
    "질병·육아 등 특정 사유 시 연장 수급 신청이 가능해요",
  ],
  sources: [
    { name: "고용보험법 제50조", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 소정급여일수는 어떻게 결정되나요?", a: "이직일 기준 나이와 피보험기간(고용보험 가입기간)에 따라 결정돼요. 1년 미만이면 나이와 관계없이 120일이고, 10년 이상이면 50세 미만 240일, 50세 이상은 270일이에요." },
    { q: "소정급여일수 도중 재취업하면 남은 일수는 어떻게 되나요?", a: "남은 소정급여일수가 있을 때 재취업하면 조기재취업수당을 신청할 수 있어요. 잔여 소정급여일수의 50%를 일시금으로 받을 수 있으니 활용해 보세요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "내 소정급여일수 바로 확인",
    subText: "피보험기간과 나이만 입력하면 돼요",
    url: "/w/실업급여-계산기",
    external: false,
  },
  relatedDocs: [{ title: "실업급여 계산기", url: "/w/실업급여-계산기" }],
};

type Q1 = "under1" | "1-3" | "3-5" | "5-10" | "over10";
type Q2 = "under50" | "over50_disabled";
type Q3 = "normal" | "disease" | "childcare";
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
  const dayMap: Record<Q1, Record<Q2, number>> = {
    "under1": { "under50": 120, "over50_disabled": 120 },
    "1-3": { "under50": 150, "over50_disabled": 180 },
    "3-5": { "under50": 180, "over50_disabled": 210 },
    "5-10": { "under50": 210, "over50_disabled": 240 },
    "over10": { "under50": 240, "over50_disabled": 270 },
  };
  const days = dayMap[q1][q2];
  const extra = q3 !== "normal" ? " (질병·육아 사유로 최대 4년 연장 가능)" : "";
  return {
    pass: true,
    title: `소정급여일수는 약 ${days}일이에요`,
    desc: `피보험기간과 나이 기준으로 소정급여일수가 ${days}일이에요${extra}. 소정급여일수 × 일 지급액이 총 수령 예상액이에요.`,
    links: [
      { icon: "🧮", title: "총 수령액 계산하기", desc: "일 지급액 × 소정급여일수 계산", href: "/w/실업급여-계산기" },
      { icon: "📋", title: "실업급여 신청 방법", desc: "고용24 온라인 신청 절차", href: "/w/실업급여-신청방법" },
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
        { icon: "📋", title: "실업급여 신청 방법", sub: "온라인 신청 절차 안내", href: "/w/실업급여-신청방법" },
        { icon: "📅", title: "상한액·하한액 확인", sub: "2026년 기초일액 기준", href: "/w/실업급여-상한액" },
      ]} />
      <SidebarDocs items={[
        { title: "실업급여 상한액 하한액 기준", cat: "실업급여·계산", href: "/w/실업급여-상한액" },
        { title: "실업급여 신청 방법", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
        { title: "피보험기간 180일 계산", cat: "실업급여·자격", href: "/w/실업급여-피보험기간-180일-계산" },
        { title: "실업급여 대기기간", cat: "실업급여·수급", href: "/w/실업급여-대기기간" },
        { title: "실업급여 재취업 조건", cat: "실업급여·수급", href: "/w/실업급여-재취업-조건" },
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
      breadcrumb={["홈", "실업급여", "수급액 계산", "소정급여일수"]}
      tags={["2026년 최신", "실업급여", "소정급여일수", "수급기간"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>실업급여 수급 기간인 <B>소정급여일수</B>는 피보험기간과 나이에 따라 <B>120일~270일</B>로 달라져요. 50세 이상이거나 장애인이면 같은 기간 가입해도 30일 더 받을 수 있어요.</>}
      sourceBar={{ badge: "고용보험법", name: "제50조 소정급여일수", date: "2026.02" }}
      stickyLabel="최대 소정급여일수"
      stickyValue="270일"
      stickyBtn="내 일수 확인"
      disclaimer="이 글은 고용보험법 및 고용노동부 공개 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 개인 수급일수는 실제 피보험기간에 따라 달라질 수 있어요."
      sidebar={sidebar}
    >
      <TOC items={[
        { n: "01", t: "내 소정급여일수 바로 확인", sub: "피보험기간 · 나이 선택" },
        { n: "02", t: "실업급여 소정급여일수 계산 기준은 무엇인가요?", sub: "피보험기간별 기준표 · 나이 구분" },
        { n: "03", t: "실업급여 소정급여일수가 피보험기간별로 다른가요?", sub: "1년 미만 120일 · 10년 이상 270일" },
        { n: "04", t: "실업급여 소정급여일수 계산 사례 3가지", sub: "단기 근무 · 중간 · 장기 근무 케이스" },
        { n: "05", t: "실업급여 소정급여일수 연장이 가능한가요?", sub: "질병 · 육아 · 특례 연장" },
        { n: "FAQ", t: "자주 묻는 질문", sub: "결정 기준 · 재취업 시 처리" },
      ]} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 — 체커 */}
      <Sec n="01" id="checker" title="내 소정급여일수 바로 확인" sub="피보험기간 · 나이 선택">
        <CheckerShell
          title="내 실업급여 소정급여일수가 몇 일일까?"
          subtitle="30초 확인"
          intro="피보험기간과 나이만 선택하면 바로 확인할 수 있어요."
        >
          <CheckerQ
            n={1}
            group="q1"
            label="고용보험 피보험기간이 얼마나 되나요?"
            opts={[
              ["under1", "1년 미만"],
              ["1-3", "1년 이상 ~ 3년 미만"],
              ["3-5", "3년 이상 ~ 5년 미만"],
              ["5-10", "5년 이상 ~ 10년 미만"],
              ["over10", "10년 이상"],
            ]}
            sel={q1}
            pick={(v) => setQ1(v as Q1)}
          />
          <CheckerQ
            n={2}
            group="q2"
            label="이직 당시 나이가 어떻게 되나요?"
            opts={[
              ["under50", "50세 미만 (비장애인)"],
              ["over50_disabled", "50세 이상 또는 장애인"],
            ]}
            sel={q2}
            pick={(v) => setQ2(v as Q2)}
          />
          <CheckerQ
            n={3}
            group="q3"
            label="퇴직 후 특별한 사정이 있나요?"
            opts={[
              ["normal", "특별한 사유 없음"],
              ["disease", "질병·부상으로 취업 불가"],
              ["childcare", "임신·출산·육아"],
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
      <Sec n="02" id="standard" title="실업급여 소정급여일수 계산 기준은 무엇인가요?" sub="피보험기간별 기준표 · 나이 구분">
        <P>소정급여일수는 <B>이직일 직전의 피보험기간</B>과 <B>이직 당시 나이</B>에 따라 결정돼요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제50조</A>에서 정한 기준이에요. 피보험기간이 길고 나이가 많을수록 더 많은 일수를 받아요.</P>
        <P>나이 구분은 딱 두 가지예요. <B>50세 미만(비장애인)</B>과 <B>50세 이상 또는 장애인</B>이에요. 50세가 되면 같은 피보험기간이더라도 30일 더 받을 수 있어요. 이직일 당시 기준이기 때문에 퇴직 시점의 나이가 중요해요.</P>
        <P>피보험기간은 이직일 이전 <B>18개월</B> 범위 내에서 실제 고용보험에 가입된 기간의 합산이에요. 여러 직장을 다녔더라도 합산이 가능하고, 일용직·단시간 근로자도 동일하게 적용돼요. 합산 기간이 <B>180일 이상</B>이어야 수급 자격이 생겨요.</P>
        <P>아래 표가 2026년 기준 소정급여일수 전체예요. 내 상황에 해당하는 칸을 찾아보세요.</P>

        <TableTitle>2026년 피보험기간·나이별 소정급여일수 기준표</TableTitle>
        <TH cols={["피보험기간", "50세 미만 (비장애인)", "50세 이상 또는 장애인"]} rows={[
          ["1년 미만", "120일", "120일"],
          ["1년 이상 ~ 3년 미만", "150일", "180일"],
          ["3년 이상 ~ 5년 미만", "180일", "210일"],
          ["5년 이상 ~ 10년 미만", "210일", "240일"],
          ["10년 이상", "240일", "270일"],
        ]} />
        <TableNote>* 고용보험법 제50조 기준. 피보험기간은 이직일 직전 합산 기간이에요.</TableNote>

        <SpokeLink num={1} title="피보험기간 180일 계산 방법" desc="고용보험 가입기간 합산 및 이직일 기준 확인" href="/w/실업급여-피보험기간-180일-계산" />
        <SpokeLink num={2} title="실업급여 상한액 하한액 기준" desc="2026년 기초일액 상한 68,100원 적용 기준" href="/w/실업급여-상한액" />
      </Sec>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="detail" title="실업급여 소정급여일수가 피보험기간별로 다른가요?" sub="1년 미만 120일 · 10년 이상 270일">
        <P>피보험기간이 <B>1년 미만</B>이면 나이와 상관없이 모두 <B>120일</B>이에요. 처음 직장을 다니는 분이나 단기 계약직이 많이 해당돼요. 120일이 최소 기간이지만, 일 지급액은 상한·하한 기준에 따라 결정돼요.</P>
        <P>피보험기간이 <B>10년 이상</B>이면 50세 미만은 <B>240일</B>, 50세 이상 또는 장애인은 <B>270일</B>이에요. 270일이 현재 법정 최대 소정급여일수예요. 장기 근속자에게 가장 유리한 구조예요.</P>
        <P>50세 이상이 되면 <B>30일 추가 혜택</B>이 생겨요. 예를 들어 피보험기간 5~10년이면 50세 미만은 210일, 50세 이상은 240일이에요. 퇴직을 앞두고 있다면 이직일 당시 나이가 50세 이상인지 확인하는 게 중요해요.</P>
        <P>장애인 인정을 받으면 나이와 관계없이 50세 이상과 동일한 소정급여일수를 받아요. 복지카드를 발급받은 등록 장애인이 해당돼요. 신청 시 고용센터에서 별도로 확인해요.</P>

        <FormulaCard
          formula="소정급여일수 결정 = 피보험기간 구간 × 나이 구분(50세 기준)"
          notes={[
            "피보험기간: 이직일 이전 18개월 범위 내 실제 고용보험 가입 기간 합산",
            "나이 기준: 이직일 당시 만 나이 (50세 이상 or 장애인 → 30일 추가)",
            "최소 120일 ~ 최대 270일 범위 내에서 결정돼요",
          ]}
        />

        <Info type="warn">
          <B>피보험기간은 이직일 기준으로 산정해요</B><br />
          퇴직일이 아닌 이직일(마지막 근무일) 기준으로 피보험기간을 계산해요. 여러 직장을 다닌 경우 기간 사이에 공백이 있어도 합산할 수 있어요. 단, 이전 실업급여를 받은 기간은 제외돼요.
        </Info>
      </Sec>

      <RelatedMid
        title="실업급여 수급액 계산 관련 글"
        items={[
          { icon: "📊", title: "실업급여 상한액·하한액 기준", desc: "2026년 기초일액 68,100원 적용 기준", href: "/w/실업급여-상한액" },
          { icon: "🧮", title: "연봉별 실업급여 계산", desc: "연봉별 예상 수령액 시뮬레이션", href: "/w/실업급여-연봉별-계산" },
          { icon: "📋", title: "피보험기간 180일 계산", desc: "고용보험 가입 기간 합산 방법", href: "/w/실업급여-피보험기간-180일-계산" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="cases" title="실업급여 소정급여일수 계산 사례 3가지" sub="단기 근무 · 중간 · 장기 근무 케이스">
        <P>소정급여일수가 실제로 어떻게 적용되는지 세 가지 사례로 살펴볼게요. 일 지급액이 같아도 소정급여일수에 따라 총 수령액이 크게 달라지니 내 상황과 비교해 보세요.</P>

        <H3>이 씨(27세), 피보험기간 8개월, 월급 250만 원</H3>
        <P>피보험기간이 1년 미만이어서 나이와 관계없이 <B>소정급여일수 120일</B>이에요. 월급 250만 원이면 일 지급액은 하한액 63,104원이 적용돼요 (평균임금 × 60% < 하한액).</P>
        <CaseBox
          badge="예시 1"
          label="이 씨(27세), 피보험기간 8개월, 월급 250만 원"
          conditions={["피보험기간: 8개월 (1년 미만)", "나이: 27세 (50세 미만)"]}
          steps={[
            { label: "소정급여일수", value: "120일 (1년 미만 기준)" },
            { label: "일 지급액", value: "63,104원 (하한액 적용)" },
            { label: "총 수령 예상", value: "63,104원 × 120일 = 7,572,480원" },
          ]}
          total="총 예상 수령: 약 757만 원"
          result="120일 적용 (약 757만 원)"
          pass={true}
        />

        <H3>박 씨(42세), 피보험기간 4년, 월급 350만 원</H3>
        <P>피보험기간 3~5년, 50세 미만이어서 <B>소정급여일수 180일</B>이에요. 월급 350만 원이면 일 지급액은 약 68,043원으로 상한액(68,100원)에 근접해요.</P>
        <CaseBox
          badge="예시 2"
          label="박 씨(42세), 피보험기간 4년, 월급 350만 원"
          conditions={["피보험기간: 4년 (3~5년 구간)", "나이: 42세 (50세 미만)"]}
          steps={[
            { label: "소정급여일수", value: "180일 (3~5년, 50세 미만)" },
            { label: "일 지급액", value: "약 68,043원 (일반 계산)" },
            { label: "총 수령 예상", value: "68,043원 × 180일 = 12,247,740원" },
          ]}
          total="총 예상 수령: 약 1,225만 원"
          result="180일 적용 (약 1,225만 원)"
          pass={true}
        />

        <H3>김 씨(55세), 피보험기간 12년, 월급 450만 원</H3>
        <P>피보험기간 10년 이상, 50세 이상이어서 <B>소정급여일수 270일</B>이에요. 월급 450만 원이면 상한액 68,100원이 적용돼요. 가장 많이 받는 케이스예요.</P>
        <CaseBox
          badge="예시 3"
          label="김 씨(55세), 피보험기간 12년, 월급 450만 원"
          conditions={["피보험기간: 12년 (10년 이상)", "나이: 55세 (50세 이상)"]}
          steps={[
            { label: "소정급여일수", value: "270일 (10년 이상, 50세 이상)" },
            { label: "일 지급액", value: "68,100원 (상한액)" },
            { label: "총 수령 예상", value: "68,100원 × 270일 = 18,387,000원" },
          ]}
          total="총 예상 수령: 약 1,839만 원"
          result="270일 적용 (약 1,839만 원)"
          pass={true}
        />

        <BridgeCard
          q="내 정확한 일 지급액이 궁금하다면?"
          a="월급과 피보험기간을 입력하면 30초 안에 정확한 금액이 나와요."
          label="실업급여 계산기 바로 가기"
          href="/w/실업급여-계산기"
        />
      </Sec>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="extend" title="실업급여 소정급여일수 연장이 가능한가요?" sub="질병 · 육아 · 특례 연장">
        <P>소정급여일수가 끝나도 특정 사유가 있으면 <B>수급기간 연장 신청</B>이 가능해요. 수급기간은 퇴직일로부터 12개월인데, 이 기간이 지나면 남은 소정급여일수가 있어도 더 이상 받지 못해요.</P>
        <P>연장 사유는 <B>질병·부상·임신·출산·육아·배우자 등의 간호</B>가 해당돼요. 이런 사유로 취업이 불가능한 기간은 수급기간에서 제외돼요. 최대 4년까지 연장이 가능해요.</P>
        <P>연장 신청은 사유가 발생한 날로부터 <B>30일 이내</B>에 고용센터에 신청해야 해요. 의사 소견서, 진단서, 출생증명서 등 관련 서류가 필요해요. 연장 미신청 시 기간이 지나면 권리가 소멸돼요.</P>
        <P>또한 소정급여일수가 남아 있을 때 재취업하면 <B>조기재취업수당</B>을 받을 수 있어요. 잔여 소정급여일수의 50%를 일시금으로 지급받는 제도예요. 재취업 후에도 챙길 수 있는 혜택이에요.</P>

        <InlineLink
          icon="💡"
          title="조기재취업수당 신청 조건"
          desc="잔여 소정급여일수 50% 일시금 수령 방법"
          href="/w/실업급여-재취업-조건"
        />

        <InlineLink
          icon="📋"
          title="실업급여 신청 방법 전체 절차"
          desc="고용24 온라인 신청부터 수급까지 단계별 안내"
          href="/w/실업급여-신청방법"
        />

        <ExtBtn
          badge="고용24 공식"
          text="실업급여 수급기간 연장 신청"
          cta="신청하기 →"
          href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 상한액·하한액 기준", href: "/w/실업급여-상한액" },
        { title: "연봉별 실업급여 계산 예시", href: "/w/실업급여-연봉별-계산" },
        { title: "피보험기간 180일 계산하기", href: "/w/실업급여-피보험기간-180일-계산" },
        { title: "실업급여 신청 방법과 절차", href: "/w/실업급여-신청방법" },
        { title: "실업급여 대기기간 7일 안내", href: "/w/실업급여-대기기간" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 상한액 하한액 기준", href: "/w/실업급여-상한액" }}
        next={{ title: "실업급여 수급 기간 몇 개월", href: "/w/실업급여-수급기간-몇개월-받나요" }}
      />
    </BlogLayout>
  );
}
