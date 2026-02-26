"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  ChipsGrid,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "5세대 실손보험 갈아타기 시기 | 세대별 전환 비용 일정",
  description:
    "4세대 실손보험 유지할지 5세대로 바꿀지 고민되시죠? 2026년 7월부터 갱신일에 자동 전환되고 수수료는 없어요. 병원 자주 가면 4세대 유지가 나을 수 있는 이유도 알려드려요.",
  category: "보험",
  keywords: [
    "5세대 실손보험 갈아타기 시기",
    "실손보험 세대별 전환 일정",
    "실손보험 전환 비용 재매입",
    "실손보험 전환 유불리 판단",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-02",
  summary: [
    "2026년 7월부터 갱신일에 맞춰 5세대로 자동 전환돼요 (수수료 없음)",
    "1~2세대는 계약 재매입으로 보상금 받고 무심사 전환이 가능해요",
    "병원 자주 가면 4세대 유지, 건강하면 5세대 전환이 유리해요",
  ],
  sources: [
    {
      name: "보험저널 5세대 실손 출시 일정",
      url: "https://www.insjournal.co.kr/news/articleView.html?idxno=29812",
      date: "2026-02",
    },
    {
      name: "KB의 생각 5세대 실손보험",
      url: "https://kbthink.com/insurance/trend/5th-generation.html",
      date: "2026-01",
    },
    {
      name: "뱅크샐러드 5세대 실손보험 가이드",
      url: "https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90",
      date: "2026-01",
    },
  ],
  faq: [
    {
      q: "5세대 실손보험 전환 시기를 앞당길 수 있나요?",
      a: "갱신일 전에는 5세대로 전환할 수 없어요. 갱신일이 되면 자동으로 5세대 약관이 적용되고 새 보험증권이 발급돼요.",
    },
    {
      q: "5세대 실손보험 전환 비용이 얼마나 드나요?",
      a: "전환 수수료는 없어요. 3~4세대는 갱신일에 약관만 바뀌는 거라 비용이 안 들고, 1~2세대는 오히려 계약 재매입 보상금을 받을 수 있어요.",
    },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "나는 갈아타는 게 유리할까?",
    subText: "가입 세대와 병원 이용 빈도만 선택하면 바로 확인",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "5세대 실손보험 4세대 차이", url: "/w/5세대-실손보험-4세대-차이" },
    { title: "5세대 실손보험 가입 조건", url: "/w/5세대-실손보험-가입-조건" },
    { title: "5세대 실손보험 보험료 비교", url: "/w/5세대-실손보험-보험료-비교" },
    { title: "5세대 실손보험 자기부담금", url: "/w/5세대-실손보험-자기부담금" },
    { title: "5세대 실손보험 청구 방법", url: "/w/5세대-실손보험-청구-방법" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(a: Ans): React.ReactNode | null {
  if (!a.generation || !a.hospital || !a.burden || !a.preference) return null;

  const isFrequent = a.hospital === "often" || a.hospital === "veryOften";

  if (a.generation === "gen1" || a.generation === "gen2early") {
    const links: ResLink[] = [
      { icon: "🔢", title: "자기부담금 계산", desc: "전환 후 내 부담 금액 확인", href: "/w/5세대-실손보험-자기부담금" },
      { icon: "📋", title: "가입 조건 상세", desc: "무심사 재가입 자격 확인", href: "/w/5세대-실손보험-가입-조건" },
    ];

    if (isFrequent) {
      return (
        <ResultFail title="보상금 받되 전환은 신중하게 판단하세요" desc="1~2세대 가입자는 보상금을 받을 수 있지만, 병원을 자주 이용하면 비급여 자기부담률이 50%로 올라가서 실질 부담이 커질 수 있어요. 보상금과 보험료 절감 금액을 꼼꼼히 비교해 보세요.">
          <ResultGrid items={[
            { icon: "💰", name: "재매입 보상금", pass: true, desc: "보험사 보상금 지급" },
            { icon: "🏥", name: "병원 이용 빈도", pass: false, desc: "잦은 이용 → 부담 증가" },
            { icon: "💸", name: "비급여 부담률", pass: false, desc: "30% → 50% 상승" },
          ]} />
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    return (
      <ResultPass title="재매입으로 전환하면 보험료가 크게 줄어요" desc="병원을 자주 가지 않으니 비급여 부담률 상승 영향이 적어요. 재매입 보상금까지 받을 수 있으니 전환이 유리해요.">
        <ResultGrid items={[
          { icon: "💰", name: "재매입 보상금", pass: true, desc: "보험사 보상금 지급" },
          { icon: "🏥", name: "병원 이용 빈도", pass: true, desc: "부담 증가 적음" },
          { icon: "💸", name: "보험료 절감", pass: true, desc: "30~50% 저렴" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  if (a.generation === "gen4") {
    const links: ResLink[] = [
      { icon: "⚖️", title: "4세대 5세대 차이", desc: "보장 범위 상세 비교", href: "/w/5세대-실손보험-4세대-차이" },
      { icon: "💰", title: "보험료 비교", desc: "세대별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
    ];

    if (isFrequent) {
      return (
        <ResultFail title="자동 전환 전까지 4세대를 최대한 활용하세요" desc="4세대는 갱신일에 자동 전환돼요. 병원을 자주 가면 전환 전까지 4세대의 낮은 자기부담률(비급여 30%)을 활용하는 게 유리해요. 갱신일이 언제인지 보험증권에서 확인해 보세요.">
          <ResultGrid items={[
            { icon: "📋", name: "전환 방식", pass: true, desc: "갱신일 자동 전환" },
            { icon: "🏥", name: "병원 이용 빈도", pass: false, desc: "잦은 이용 → 4세대 유지 유리" },
            { icon: "⏰", name: "남은 기간", pass: true, desc: "갱신일까지 4세대 활용" },
          ]} />
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    return (
      <ResultPass title="갱신일에 자연스럽게 전환하면 돼요" desc="병원을 자주 가지 않으니 5세대 전환 후에도 부담이 크지 않아요. 보험료도 저렴해지니 갱신일까지 기다리면 돼요.">
        <ResultGrid items={[
          { icon: "📋", name: "전환 방식", pass: true, desc: "갱신일 자동 전환" },
          { icon: "💸", name: "보험료 절감", pass: true, desc: "30~50% 저렴" },
          { icon: "🏥", name: "부담 영향", pass: true, desc: "이용 빈도 낮아 영향 적음" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  /* gen23 (2~3세대) */
  const links: ResLink[] = [
    { icon: "⚖️", title: "4세대 5세대 차이", desc: "보장 범위 비교표", href: "/w/5세대-실손보험-4세대-차이" },
    { icon: "🔢", title: "자기부담금 계산", desc: "전환 후 부담 금액 확인", href: "/w/5세대-실손보험-자기부담금" },
  ];

  if (isFrequent) {
    return (
      <ResultFail title="전환 전까지 기존 보장을 최대한 활용하세요" desc="2~3세대는 갱신일에 자동 전환돼요. 병원을 자주 이용하면 전환 후 비급여 부담이 커질 수 있으니, 갱신일 전까지 현재 보장을 활용하는 게 유리해요.">
        <ResultGrid items={[
          { icon: "📋", name: "전환 방식", pass: true, desc: "갱신일 자동 전환" },
          { icon: "🏥", name: "병원 이용 빈도", pass: false, desc: "잦은 이용 → 부담 증가" },
          { icon: "⏰", name: "전환 기간", pass: true, desc: "2026.7~2036.6" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  return (
    <ResultPass title="갱신일에 자연스럽게 전환하면 돼요" desc="병원을 자주 가지 않으니 전환 후에도 실질 부담이 크지 않아요. 보험료도 줄어드니 걱정 없이 갱신일을 기다리면 돼요.">
      <ResultGrid items={[
        { icon: "📋", name: "전환 방식", pass: true, desc: "갱신일 자동 전환" },
        { icon: "💸", name: "보험료 절감", pass: true, desc: "30~50% 저렴" },
        { icon: "⏰", name: "전환 기간", pass: true, desc: "2026.7~2036.6" },
      ]} />
      {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article98() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "보험", "실손보험", "갈아타기 시기"]}
      tags={["2026년 최신", "보험", "실손보험"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>4세대 실손보험을 5세대로 바꿔야 할지 고민되시죠? <B>2026년 7월부터 갱신일에 자동 전환</B>되고 수수료는 없어요. 다만 비급여 부담률이 올라가니 <B>병원 이용 빈도</B>에 따라 유불리가 갈려요.</>}
      sourceBar={{ badge: "보험저널", name: "보험저널·KB금융", date: "2026.01" }}
      stickyLabel="전환 시작"
      stickyValue="2026년 7월"
      stickyBtn="내 유불리 확인"
      disclaimer="이 글은 보험저널·KB금융그룹·뱅크샐러드 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🛡️", title: "5세대 실손보험 허브", sub: "보장·보험료·갈아타기 전체 정리", href: "/w/5세대-실손보험", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "5세대 실손보험 4세대 차이", cat: "보험·실손", href: "/w/5세대-실손보험-4세대-차이" },
          { title: "5세대 실손보험 가입 조건", cat: "보험·실손", href: "/w/5세대-실손보험-가입-조건" },
          { title: "5세대 실손보험 보험료 비교", cat: "보험·실손", href: "/w/5세대-실손보험-보험료-비교" },
          { title: "5세대 실손보험 자기부담금", cat: "보험·실손", href: "/w/5세대-실손보험-자기부담금" },
          { title: "5세대 실손보험 청구 방법", cat: "보험·실손", href: "/w/5세대-실손보험-청구-방법" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
          { title: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
          { title: "대출이자 계산기", href: "/w/대출이자-계산기" },
        ]} />
      </>}
    >
      <TOC items={[
        { t: "나는 갈아타는 게 유리할까?", sub: "가입 세대 · 병원 이용 빈도 · 보험료 부담" },
        { t: "5세대 실손보험 갈아타기는 언제 시작되나요?", sub: "2026년 7월 · 갱신일 자동 전환 · 순차 진행" },
        { t: "실손보험 세대별 전환 일정이 다른가요?", sub: "1~2세대 선택 · 3~4세대 자동 · 10년 순차" },
        { t: "실손보험 전환할 때 비용이 드나요?", sub: "수수료 무료 · 재매입 보상금 · 보험료 절감" },
        { t: "실손보험 전환이 유리한지 어떻게 판단하나요?", sub: "병원 빈도 · 보험료 · 비급여 부담률" },
        { t: "자주 묻는 질문", sub: "전환 앞당기기 · 전환 비용" },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="나는 갈아타는 게 유리할까?" sub="가입 세대 · 병원 이용 빈도 · 보험료 부담">
        <CheckerShell title="5세대 실손보험, 갈아타는 게 나을까?" sub="30초 확인" desc="가입 세대와 병원 이용 빈도만 선택하면 바로 확인돼요.">
          <CheckerQ n="1" label="현재 가입한 실손보험 세대는?" group="generation"
            opts={[["gen1","1세대 (2009년 이전)"],["gen2early","초기 2세대 (2009~2013)"],["gen23","후기 2세대·3세대"],["gen4","4세대 (2021년~)"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="병원은 얼마나 자주 가세요?" group="hospital"
            opts={[["rarely","거의 안 가요 (연 1~2회)"],["sometimes","가끔 가요 (분기 1~2회)"],["often","자주 가요 (월 1~2회)"],["veryOften","매우 자주 가요 (주 1회 이상)"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="현재 보험료가 부담되세요?" group="burden"
            opts={[["low","괜찮아요"],["medium","좀 부담돼요"],["high","많이 부담돼요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="전환에서 가장 중요한 건?" group="preference"
            opts={[["premium","보험료 절감"],["coverage","보장 유지"],["simple","복잡한 거 싫어요"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="5세대가 정확히 뭐가 달라졌는지 궁금하시죠?"
        a="비급여 보장을 줄이고 보험료를 30~50% 낮춘 구조예요. 중증 보장은 오히려 강화됐어요."
        label="차이 확인"
        href="/w/5세대-실손보험-4세대-차이"
      />

      <Divider />

      {/* ───── SECTION 02: 갈아타기 시작 시기 ───── */}
      <Sec n="SECTION 02" id="switch-start" title="5세대 실손보험 갈아타기는 언제 시작되나요?" sub="2026년 7월 · 갱신일 자동 전환 · 순차 진행">
        <P>2026년 상반기에 5세대 실손보험이 출시되고, <A href="https://www.insjournal.co.kr/news/articleView.html?idxno=29812">보험저널</A>에 따르면 <B>2026년 7월부터</B> 기존 가입자들의 전환이 시작돼요. 별도로 신청할 필요 없이 갱신일에 맞춰 자동으로 5세대 약관이 적용되는 구조예요.</P>
        <P>예를 들어 갱신일이 2026년 8월이면 그때 5세대로 바뀌고, 2027년 3월이면 2027년 3월에 전환돼요. 내 갱신일이 정확히 언제인지는 보험증권이나 보험사 앱에서 확인할 수 있어요. 전환 1~2개월 전에 보험사에서 안내문도 보내주니까 놓칠 걱정은 없어요.</P>
        <P>다만 갱신일 전에 미리 5세대로 바꾸는 건 불가능해요. 갱신일이 아직 안 됐는데 먼저 갈아타고 싶다고 해도 보험사에서 처리를 못 해요. 반대로 갱신일이 됐는데 전환을 거부하고 싶어도 3~4세대 가입자는 선택권이 없어요.</P>

        <Info type="tip">{"갱신일을 모르겠으면 보험사 고객센터나 앱에서 <strong>「계약 정보 조회」</strong>를 눌러보세요. 재가입 주기와 다음 갱신일이 표시돼요."}</Info>

        <InlineLink icon="📋" title="가입 조건 상세" desc="세대별 전환 자격과 무심사 전환 안내" href="/w/5세대-실손보험-가입-조건" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 세대별 전환 일정 ───── */}
      <Sec n="SECTION 03" id="schedule-by-gen" title="실손보험 세대별 전환 일정이 다른가요?" sub="1~2세대 선택 · 3~4세대 자동 · 10년 순차">
        <P><A href="https://kbthink.com/insurance/trend/5th-generation.html">KB금융그룹</A>에 따르면 세대별로 전환 방식과 기간이 달라요. 가장 큰 차이는 1세대·초기 2세대는 <B>선택 전환</B>이고, 나머지는 <B>자동 전환</B>이라는 거예요. 1세대와 2013년 1월 이전 가입한 초기 2세대는 강제 전환 대상에서 제외되고, 계약 재매입 제도를 통해 원하는 경우에만 5세대로 갈아탈 수 있어요.</P>
        <P>후기 2세대(2013년 이후 가입)와 3세대는 재가입 주기가 15년이라 <B>2026년 7월부터 2036년 6월까지</B> 10년간 순차 전환돼요. 4세대는 재가입 주기가 5년이라 비교적 빠르게 <B>2031년까지</B> 전환이 완료돼요. 약 2,000만 건의 실손보험 계약이 이 일정에 따라 5세대로 옮겨가게 돼요.</P>
        <P>전환 순서는 간단해요. 내 갱신일이 빠르면 먼저 전환되고, 늦으면 나중에 전환되는 거예요. 같은 4세대라도 갱신일이 2026년 7월인 사람은 바로 전환되고, 2030년인 사람은 2030년에 전환돼요. 전환 후에는 보험증권에 「5세대 실손의료보험」이라고 표시돼요.</P>

        <TableTitle>세대별 전환 일정 비교</TableTitle>
        <table><thead><tr><THL>가입 세대</THL><TH>전환 방식</TH><TH>전환 기간</TH></tr></thead><tbody>
          {[
            ["1세대 (2009년 이전)", "선택 전환 (재매입)", "2026년 이후 원하는 시기"],
            ["초기 2세대 (2009~2013)", "선택 전환 (재매입)", "2026년 이후 원하는 시기"],
            ["후기 2세대·3세대", "갱신일 자동 전환", "2026.7~2036.6 (10년)"],
            ["4세대 (2021년~)", "갱신일 자동 전환", "2026.7~2031 (5년)"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*금융위원회·보험저널·KB금융그룹 기준 (2026.02)</TableNote>

        <InlineLink icon="💰" title="보험료 연령별 비교" desc="세대별 보험료 차이 금액 확인" href="/w/5세대-실손보험-보험료-비교" />
      </Sec>

      <RelatedMid
        title="다른 실손보험 정보도 살펴보세요"
        items={[
          { icon: "⚖️", title: "4세대 5세대 보장 차이", desc: "비급여 보장률·한도 비교", href: "/w/5세대-실손보험-4세대-차이" },
          { icon: "📋", title: "가입 조건 상세", desc: "세대별 전환 자격 안내", href: "/w/5세대-실손보험-가입-조건" },
          { icon: "🔢", title: "자기부담금 계산", desc: "내 치료비 기준 부담 금액", href: "/w/5세대-실손보험-자기부담금" },
        ]}
        hubHref="/category/보험"
        hubLabel="실손보험 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 전환 비용 ───── */}
      <Sec n="SECTION 04" id="switch-cost" title="실손보험 전환할 때 비용이 드나요?" sub="수수료 무료 · 재매입 보상금 · 보험료 절감">
        <P>5세대로 갈아탈 때 별도 수수료는 없어요. 3~4세대 가입자는 갱신일에 약관만 자동으로 바뀌는 거라 돈 낼 일이 전혀 없어요. <A href="https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90">뱅크샐러드</A>에 따르면 1~2세대 가입자는 오히려 보험사가 <B>보상금을 주고</B> 기존 계약을 해지한 뒤 5세대로 재가입시켜 주는 구조예요.</P>
        <P>재매입 보상금 기준은 2025년 하반기 발표 예정이었지만 2026년 2월 현재 아직 공개되지 않았어요. 보상금 수준이 얼마인지에 따라 재매입이 유리한지 아닌지가 완전히 달라지기 때문에, 발표 후에 판단해도 늦지 않아요. 1~2세대는 선택 전환이라 급할 필요가 없거든요.</P>
        <P>보험료는 5세대가 기존보다 30~50% 저렴해요. 다만 비급여 자기부담률이 30%에서 50%로 올라가기 때문에, 병원을 자주 이용하면 보험료 절감분보다 실제 치료비 부담이 더 클 수 있어요. 전환 후 보험료 절감 금액과 자기부담금 증가분을 꼭 비교해 봐야 해요.</P>

        <Info type="warn">{"재매입으로 전환하면 <strong>기존 계약은 완전히 해지</strong>돼요. 한번 전환하면 다시 1~2세대로 돌아갈 수 없으니 보상금 기준 발표 후에 신중하게 결정하세요."}</Info>

        <InlineLink icon="🔢" title="자기부담금 계산" desc="전환 후 내 치료비 부담 금액 확인" href="/w/5세대-실손보험-자기부담금" />
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 유불리 판단 ───── */}
      <Sec n="SECTION 05" id="pros-cons" title="실손보험 전환이 유리한지 어떻게 판단하나요?" sub="병원 빈도 · 보험료 · 비급여 부담률">
        <P>핵심은 <B>병원 이용 빈도</B>예요. 건강해서 병원을 거의 안 가는 분이라면 5세대 전환이 무조건 유리해요. 보험료는 30~50% 줄어드는데 비급여 자기부담률이 올라가도 병원을 안 가니까 영향이 없거든요. <A href="https://kbthink.com/insurance/trend/5th-generation.html">KB금융그룹</A>에서도 건강한 가입자에게 5세대가 유리하다고 분석했어요.</P>
        <P>반대로 만성질환이 있거나 정기적으로 비급여 치료를 받는 분이라면 신중해야 해요. 비급여 자기부담률이 30%에서 50%로 올라가면, 예를 들어 월 100만원짜리 비급여 치료를 받을 때 본인 부담이 30만원에서 50만원으로 20만원이 늘어요. 보험료가 월 5만원 줄어들어도 치료비가 20만원 늘면 손해예요.</P>
        <P>결국 연간 보험료 절감 금액과 연간 자기부담금 증가 금액을 비교하면 답이 나와요. 지난 1년간 병원 영수증을 모아서 비급여 치료비가 얼마였는지 계산해 보세요. 비급여 치료비가 연간 100만원 이하라면 보험료 절감이 더 크니까 5세대가 유리하고, 300만원 이상이라면 4세대 유지가 나을 수 있어요.</P>

        <H3>유불리 판단 기준</H3>
        <table><thead><tr><THL>구분</THL><TH>5세대 유리</TH><TH>기존 유지 유리</TH></tr></thead><tbody>
          {[
            ["병원 이용", "연 1~2회 이하", "월 1회 이상"],
            ["비급여 치료비", "연 100만원 이하", "연 300만원 이상"],
            ["보험료 부담", "현재 보험료가 부담", "보험료는 괜찮음"],
            ["건강 상태", "양호·건강", "만성질환·정기 치료"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*일반적인 기준이며, 개인 상황에 따라 달라질 수 있어요</TableNote>

        <SpokeLink num="01" title="보험료 연령별 비교" desc="세대별 보험료 차이 금액" href="/w/5세대-실손보험-보험료-비교" />
        <SpokeLink num="02" title="청구 방법 안내" desc="전환 후 보험금 청구 절차" href="/w/5세대-실손보험-청구-방법" />

        <ExtBtn badge="KB금융그룹 공식" text="5세대 실손보험 상세 안내" cta="바로가기 →" href="https://kbthink.com/insurance/trend/5th-generation.html" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="전환 앞당기기 · 전환 비용">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "5세대 실손보험 4세대 차이", desc: "보장 범위 상세 비교표", href: "/w/5세대-실손보험-4세대-차이" },
        { title: "5세대 실손보험 가입 조건", desc: "세대별 전환 자격 안내", href: "/w/5세대-실손보험-가입-조건" },
        { title: "5세대 실손보험 보험료 비교", desc: "연령별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
        { title: "5세대 실손보험 자기부담금", desc: "내 치료비 기준 부담 금액", href: "/w/5세대-실손보험-자기부담금" },
        { title: "5세대 실손보험 청구 방법", desc: "실손24 전자청구 안내", href: "/w/5세대-실손보험-청구-방법" },
      ]} />
      <PrevNext
        prev={{ title: "5세대 실손보험 가입 조건", href: "/w/5세대-실손보험-가입-조건" }}
        next={{ title: "5세대 실손보험 4세대 차이", href: "/w/5세대-실손보험-4세대-차이" }}
      />
    </BlogLayout>
  );
}
