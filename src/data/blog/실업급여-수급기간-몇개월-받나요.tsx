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
  title: "실업급여 수급기간 몇 개월 받나요 | 피보험기간 나이별 최대 9개월",
  description: "실업급여 수급기간은 피보험기간과 나이에 따라 4~9개월(120~270일)로 달라져요. 수급기간과 유효기간(퇴직일 후 12개월)은 다른 개념이니 반드시 구분해야 해요.",
  category: "실업급여",
  keywords: ["실업급여 수급기간 몇 개월", "피보험기간별 수급 일수 개월", "실업급여 수급기간 연장 조건", "수급기간 내 재취업 처리"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "실업급여 수급기간은 피보험기간·나이에 따라 최소 4개월(120일)~최대 9개월(270일)",
    "유효기간은 퇴직일로부터 12개월 — 이 기간 내에 소정급여일수를 소진해야 해요",
    "질병·육아 등 사유가 있으면 유효기간을 최대 4년까지 연장 신청할 수 있어요",
  ],
  sources: [
    { name: "고용보험법 제48조·50조", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 수급기간과 소정급여일수는 다른 건가요?", a: "맞아요. 소정급여일수는 실제로 받을 수 있는 일수(120~270일)이고, 수급기간은 이 일수를 소진해야 하는 유효기간(퇴직일로부터 12개월)이에요. 12개월이 지나면 남은 소정급여일수가 있어도 지급이 끊겨요." },
    { q: "실업급여를 몇 달 후에 신청해도 되나요?", a: "수급기간은 퇴직일로부터 12개월이에요. 늦게 신청할수록 실제로 받을 수 있는 기간이 줄어들어요. 퇴직 후 가능한 빨리 신청하는 게 유리해요. 신청은 퇴직 다음 날부터 가능해요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "내 수급기간 바로 확인",
    subText: "피보험기간과 나이만 입력하면 돼요",
    url: "/w/실업급여-계산기",
    external: false,
  },
  relatedDocs: [{ title: "실업급여 소정급여일수 기준", url: "/w/실업급여-소정급여일수" }],
};

type Q1 = "under1" | "1-3" | "3-5" | "5-10" | "over10";
type Q2 = "under50" | "over50_disabled";
type Q3 = "early" | "normal";
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
  const months = Math.floor(days / 30);
  const earlyNote = q3 === "early" ? " 퇴직 후 빨리 신청할수록 수급기간을 최대한 활용할 수 있어요." : "";
  return {
    pass: true,
    title: `수급기간(소정급여일수)은 약 ${months}개월(${days}일)이에요`,
    desc: `피보험기간과 나이 기준으로 소정급여일수가 ${days}일이에요. 유효기간(퇴직일로부터 12개월) 안에 모두 소진해야 해요.${earlyNote}`,
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
        { icon: "📅", title: "소정급여일수 기준표", sub: "피보험기간·나이별 일수", href: "/w/실업급여-소정급여일수" },
      ]} />
      <SidebarDocs items={[
        { title: "실업급여 소정급여일수 기준", cat: "실업급여·수급기간", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 상한액 하한액", cat: "실업급여·계산", href: "/w/실업급여-상한액" },
        { title: "실업급여 신청 방법", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
        { title: "피보험기간 180일 계산", cat: "실업급여·자격", href: "/w/실업급여-피보험기간-180일-계산" },
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
      breadcrumb={["홈", "실업급여", "수급기간", "몇 개월 받나요"]}
      tags={["2026년 최신", "실업급여", "수급기간", "소정급여일수"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>실업급여 수급기간은 피보험기간과 나이에 따라 <B>4개월(120일)~9개월(270일)</B>로 달라져요. 유효기간인 <B>퇴직 후 12개월</B> 안에 모두 소진해야 하니 빨리 신청하는 게 유리해요.</>}
      sourceBar={{ badge: "고용보험법", name: "제48조·제50조", date: "2026.02" }}
      stickyLabel="최대 수급기간"
      stickyValue="9개월(270일)"
      stickyBtn="내 기간 확인"
      disclaimer="이 글은 고용보험법 및 고용노동부 공개 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 개인 수급일수는 실제 피보험기간에 따라 달라질 수 있어요."
      sidebar={sidebar}
    >
      <TOC items={[
        { n: "01", t: "내 수급기간 빠른 확인", sub: "피보험기간 · 나이 선택" },
        { n: "02", t: "실업급여 수급기간 몇 개월인지 어떻게 알아요?", sub: "소정급여일수 · 유효기간 차이" },
        { n: "03", t: "실업급여 수급기간이 피보험기간마다 달라지나요?", sub: "4개월~9개월 구간별 기준" },
        { n: "04", t: "실업급여 수급기간 연장 조건이 있나요?", sub: "질병 · 육아 · 최대 4년 연장" },
        { n: "05", t: "실업급여 수급기간 내 재취업하면 어떻게 되나요?", sub: "조기재취업수당 · 잔여일수 처리" },
        { n: "FAQ", t: "자주 묻는 질문", sub: "수급기간 vs 소정급여일수 · 늦은 신청" },
      ]} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 — 체커 */}
      <Sec n="01" id="checker" title="내 수급기간 빠른 확인" sub="피보험기간 · 나이 선택">
        <CheckerShell
          title="내 실업급여 수급기간(소정급여일수)이 몇 개월일까?"
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
            label="퇴직 후 신청 시기는 언제인가요?"
            opts={[
              ["early", "퇴직 후 1개월 이내 (빠른 신청)"],
              ["normal", "퇴직 후 1개월 이상 경과"],
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
      <Sec n="02" id="concept" title="실업급여 수급기간 몇 개월인지 어떻게 알아요?" sub="소정급여일수 · 유효기간 차이">
        <P>실업급여에서 "수급기간"이라는 말은 두 가지 의미로 쓰여요. 첫째는 <B>소정급여일수</B>로, 실제로 실업급여를 받을 수 있는 총 일수예요. 둘째는 <B>유효기간</B>으로, 소정급여일수를 소진해야 하는 기한이에요.</P>
        <P>유효기간은 <B>퇴직일로부터 12개월</B>이에요. 예를 들어 소정급여일수가 180일(6개월)이더라도 퇴직 후 6개월째에 신청하면 남은 6개월 안에 180일을 다 쓰기 어려워요. 늦게 신청할수록 실제 수령 일수가 줄어요.</P>
        <P>소정급여일수는 <B>피보험기간과 나이</B>에 따라 달라져요. 최소 120일(4개월)에서 최대 270일(9개월)이에요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제50조</A>에서 피보험기간·나이별로 정해 놓은 기준이에요.</P>
        <P>두 개념을 헷갈리면 손해를 볼 수 있어요. 소정급여일수가 270일이더라도 퇴직 후 12개월을 초과하면 남은 일수는 소멸돼요. 퇴직 직후 최대한 빠르게 신청하는 게 핵심이에요.</P>

        <TableTitle>소정급여일수(수급기간)와 유효기간 차이</TableTitle>
        <TH cols={["구분", "개념", "기간"]} rows={[
          ["소정급여일수", "실제 실업급여를 받을 수 있는 총 일수", "120~270일 (피보험기간·나이별)"],
          ["유효기간", "소정급여일수를 소진해야 하는 기한", "퇴직일로부터 12개월"],
          ["수급기간 연장", "질병·육아 등 사유 시 유효기간 연장", "최대 4년까지"],
        ]} />
        <TableNote>* 유효기간 12개월이 지나면 남은 소정급여일수는 소멸돼요.</TableNote>

        <InlineLink
          icon="📊"
          title="소정급여일수 기준표 전체 보기"
          desc="피보험기간·나이별 120일~270일 상세 기준"
          href="/w/실업급여-소정급여일수"
        />
        <SpokeLink num={1} title="실업급여 신청 방법" desc="고용24 온라인 신청 절차 전체 안내" href="/w/실업급여-신청방법" />
      </Sec>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="detail" title="실업급여 수급기간이 피보험기간마다 달라지나요?" sub="4개월~9개월 구간별 기준">
        <P>피보험기간이 길수록 소정급여일수가 늘어나요. <B>1년 미만</B>이면 모두 120일(4개월)이에요. 나이에 상관없이 동일해요. <B>10년 이상</B>이면 50세 미만은 240일(8개월), 50세 이상 또는 장애인은 270일(9개월)이에요.</P>
        <P>50세가 되면 같은 피보험기간이라도 <B>30일(약 1개월)이 추가</B>돼요. 이직 당시 나이가 기준이에요. 예를 들어 49세에 퇴직하면 해당 나이로 계산하고, 50세에 퇴직하면 50세 이상 기준이 적용돼요.</P>
        <P>장애인(장애인복지법상 등록 장애인)은 나이와 관계없이 <B>50세 이상과 동일한 기준</B>이 적용돼요. 피보험기간 1~3년이면 150일이 아닌 180일을 받을 수 있어요. 고용센터 신청 시 복지카드를 제출하면 돼요.</P>
        <P>피보험기간을 계산할 때는 여러 직장의 기간을 합산할 수 있어요. 단, 이직일 이전 <B>18개월 범위 내</B>에서만 합산해요. 이전에 실업급여를 받은 기간은 제외돼요.</P>

        <TableTitle>피보험기간별 소정급여일수(개월 환산)</TableTitle>
        <TH cols={["피보험기간", "50세 미만", "50세 이상·장애인"]} rows={[
          ["1년 미만", "120일 (4개월)", "120일 (4개월)"],
          ["1~3년 미만", "150일 (5개월)", "180일 (6개월)"],
          ["3~5년 미만", "180일 (6개월)", "210일 (7개월)"],
          ["5~10년 미만", "210일 (7개월)", "240일 (8개월)"],
          ["10년 이상", "240일 (8개월)", "270일 (9개월)"],
        ]} />
        <TableNote>* 개월 환산은 30일 기준이에요. 실제 수령 기간은 인정일수에 따라 다를 수 있어요.</TableNote>

        <Info type="warn">
          <B>피보험기간 180일 미만은 수급 자격 자체가 없어요</B><br />
          실업급여를 받으려면 이직일 이전 18개월 안에 피보험 단위 기간이 180일 이상이어야 해요. 180일을 넘지 않으면 소정급여일수와 관계없이 수급 자격이 인정되지 않아요.
        </Info>
      </Sec>

      <RelatedMid
        title="실업급여 수급 기간·금액 관련 글"
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
      <Sec n="04" id="extend" title="실업급여 수급기간 연장 조건이 있나요?" sub="질병 · 육아 · 최대 4년 연장">
        <P>유효기간(퇴직 후 12개월) 안에 소정급여일수를 다 쓰지 못하면 잔여일수가 소멸돼요. 하지만 특정 사유가 있으면 <B>유효기간을 연장</B>할 수 있어요. 수급기간 연장 사유로 인정받으면 해당 기간을 유효기간에서 빼줘요.</P>
        <P>연장 사유는 <B>질병·부상·임신·출산·육아·배우자 등의 간호</B>예요. 이 사유로 취업이 불가능한 기간이 30일을 넘으면 해당 기간만큼 유효기간이 연장돼요. 최대 4년까지 가능해요.</P>
        <P>연장 신청은 사유 발생일로부터 <B>30일 이내</B>에 고용센터에 해야 해요. 의사 소견서, 진단서, 출생증명서, 가족관계증명서 등 관련 서류를 준비해야 해요. 기한을 놓치면 연장이 안 되니 꼭 기억해 두세요.</P>
        <P>연장 기간은 실업급여 수령 기간이 아니에요. 수급을 일시 중지하고 사유 해소 후 다시 수급을 이어가는 구조예요. 실업 인정 신청은 계속 해야 해요.</P>

        <InlineLink
          icon="📋"
          title="실업급여 신청 방법과 절차"
          desc="고용24 온라인 신청부터 수급 완료까지 단계별 안내"
          href="/w/실업급여-신청방법"
        />
        <SpokeLink num={2} title="실업급여 구비서류" desc="고용센터 제출 서류 목록 전체 안내" href="/w/실업급여-구비서류" />
      </Sec>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="reemploy" title="실업급여 수급기간 내 재취업하면 어떻게 되나요?" sub="조기재취업수당 · 잔여일수 처리">
        <P>소정급여일수가 남아 있을 때 재취업하면 <B>조기재취업수당</B>을 받을 수 있어요. 남은 소정급여일수의 50%를 일시금으로 지급하는 제도예요. 실업급여를 "버리고" 취업하는 게 아니라, 절반을 한 번에 받는 거예요.</P>
        <P>조기재취업수당 지급 조건이 있어요. 재취업한 사업장에서 <B>12개월 이상 계속 근무</B>해야 해요. 또한 소정급여일수의 <B>1/2 이상이 남은 상태</B>에서 재취업해야 해요. 재취업일로부터 12개월 후에 신청할 수 있어요.</P>
        <P>반대로 수급기간 내에 아르바이트를 하면 근로한 날은 실업급여를 지급받지 못해요. 신고하지 않으면 부정수급으로 환수와 제재가 있으니 반드시 신고해야 해요. 신고하면 해당일만 제외되고 나머지 일수는 정상 수급돼요.</P>
        <P>수급기간이 끝난 후에도 재취업을 못 했다면 추가로 실업인정을 받아야 해요. 훈련연장급여, 개별연장급여, 특별연장급여 등 연장급여 신청도 고려해 볼 수 있어요.</P>

        <BridgeCard
          q="실업급여를 받으면서 아르바이트도 가능한지 궁금하다면?"
          a="월 60시간 미만 알바는 신고 후 수급이 가능해요. 자세한 기준을 확인해 보세요."
          label="실업급여 알바 가능 여부 확인"
          href="/w/실업급여-받으면서-알바-가능여부"
        />

        <ExtBtn
          badge="고용24 공식"
          text="실업급여 수급 기간 및 조기재취업수당 신청"
          cta="신청하기 →"
          href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 소정급여일수 계산 기준", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 상한액·하한액 기준", href: "/w/실업급여-상한액" },
        { title: "피보험기간 180일 계산하기", href: "/w/실업급여-피보험기간-180일-계산" },
        { title: "실업급여 신청 방법과 절차", href: "/w/실업급여-신청방법" },
        { title: "실업급여 대기기간 7일 안내", href: "/w/실업급여-대기기간" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 소정급여일수 계산 기준", href: "/w/실업급여-소정급여일수" }}
        next={{ title: "실업급여 신청기간 및 신청 기한", href: "/w/실업급여-신청기간" }}
      />
    </BlogLayout>
  );
}
