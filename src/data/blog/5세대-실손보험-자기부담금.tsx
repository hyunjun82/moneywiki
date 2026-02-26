"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "5세대 실손보험 자기부담금 계산 | 4세대 비급여 부담률 비교",
  description:
    "5세대 실손보험 자기부담금이 얼마나 되는지 궁금하시죠? 비급여 치료비의 50%를 본인이 내야 해요. 4세대 30%보다 20%p 올라서 치료비 200만원이면 40만원을 더 부담하게 돼요.",
  category: "보험",
  keywords: [
    "5세대 실손보험 자기부담금 계산",
    "실손보험 비급여 본인부담 50%",
    "4세대 5세대 자기부담금 비교",
    "실손보험 중증 자기부담 상한액",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-01",
  summary: [
    "비급여 자기부담이 30%에서 50%로 올라서 치료비 100만원이면 50만원 본인 부담이에요",
    "급여 입원은 20%로 동일하고, 급여 외래는 건보 본인부담률과 연동돼요",
    "중증 질환(암·뇌·심장)은 연간 자기부담 상한 500만원으로 부담이 제한돼요",
  ],
  sources: [
    {
      name: "금융위원회 실손보험 개편안",
      url: "https://www.fsc.go.kr/no010101/84272",
      date: "2026-01",
    },
    {
      name: "경향신문 5세대 실손 도수치료 제외",
      url: "https://www.khan.co.kr/article/202504020600091",
      date: "2025-04",
    },
    {
      name: "뱅크샐러드 5세대 실손보험 비교",
      url: "https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90",
      date: "2025-12",
    },
  ],
  faq: [
    {
      q: "5세대 실손보험 자기부담률이 4세대보다 더 높은 건 맞나요?",
      a: "네, 비급여 자기부담률이 30%에서 50%로 올랐어요. 치료비 100만원이면 4세대는 30만원, 5세대는 50만원을 본인이 내야 해요. 다만 보험료가 30~50% 저렴해서 병원을 자주 안 가면 오히려 이득이에요.",
    },
    {
      q: "5세대 실손보험 자기부담 상한이 있나요?",
      a: "중증 질환(암·뇌혈관·심장질환) 입원만 연간 500만원 상한이 있어요. 비중증은 상한이 없어서 치료비가 많을수록 본인 부담도 늘어나요.",
    },
  ],
  ctaCard: {
    label: "30초 계산",
    mainText: "내 자기부담금이 얼마나 될까?",
    subText: "치료 유형만 선택하면 바로 계산",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "5세대 실손보험 4세대 차이", url: "/w/5세대-실손보험-4세대-차이" },
    { title: "5세대 실손보험 보험료 비교", url: "/w/5세대-실손보험-보험료-비교" },
    { title: "5세대 실손보험 갈아타기 시기", url: "/w/5세대-실손보험-갈아타기-시기" },
    { title: "5세대 실손보험 가입 조건", url: "/w/5세대-실손보험-가입-조건" },
    { title: "5세대 실손보험 청구 방법", url: "/w/5세대-실손보험-청구-방법" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(a: Ans): React.ReactNode | null {
  if (!a.generation || !a.treatmentType || !a.annualCost || !a.severe) return null;

  if (a.annualCost === "over100" && a.severe === "no") {
    const links: ResLink[] = [
      { icon: "📊", title: "4세대 5세대 보장 차이", desc: "비급여 보장률·한도 비교표", href: "/w/5세대-실손보험-4세대-차이" },
      { icon: "💰", title: "보험료 연령별 비교", desc: "절감 효과 금액 확인", href: "/w/5세대-실손보험-보험료-비교" },
    ];
    return (
      <ResultFail title="자기부담금이 상당히 늘어나요" desc="연간 비급여 치료비가 100만원 이상이면 자기부담 증가분(20%p)이 보험료 절감분보다 클 수 있어요. 4세대 유지도 고려해 보세요.">
        <ResultGrid items={[
          { icon: "🏥", name: "비급여 부담", pass: false, desc: "30%→50% 상승" },
          { icon: "💸", name: "보험료 절감", pass: true, desc: "30~50% 저렴" },
          { icon: "📈", name: "순부담", pass: false, desc: "치료비 많을수록 불리" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  if (a.severe === "yes") {
    const links: ResLink[] = [
      { icon: "🫀", title: "중증 보장 강화 상세", desc: "상한 500만원 적용 조건", href: "/w/5세대-실손보험-4세대-차이" },
      { icon: "🔄", title: "갈아타기 시기 판단", desc: "전환 최적 타이밍", href: "/w/5세대-실손보험-갈아타기-시기" },
    ];
    return (
      <ResultPass title="중증 질환은 자기부담 상한이 있어요" desc="암·뇌혈관·심장질환으로 입원하면 연간 자기부담 한도가 500만원이에요. 치료비가 아무리 높아도 500만원 이상은 안 내도 돼요.">
        <ResultGrid items={[
          { icon: "🫀", name: "중증 상한", pass: true, desc: "연간 500만원 한도" },
          { icon: "💸", name: "보험료", pass: true, desc: "30~50% 저렴" },
          { icon: "🏥", name: "비중증 부담", pass: false, desc: "50% 자기부담" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  if (a.annualCost === "under50" || a.annualCost === "rarely") {
    const links: ResLink[] = [
      { icon: "💰", title: "보험료 연령별 비교", desc: "세대별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
      { icon: "📋", title: "가입 조건 확인", desc: "나이·건강 심사 기준", href: "/w/5세대-실손보험-가입-조건" },
    ];
    return (
      <ResultPass title="자기부담금 부담이 크지 않아요" desc="비급여 치료를 거의 안 받으면 자기부담 증가분보다 보험료 절감 효과가 더 커요. 5세대 전환이 유리한 케이스예요.">
        <ResultGrid items={[
          { icon: "💸", name: "보험료 절감", pass: true, desc: "월 1~2만원 절약" },
          { icon: "🏥", name: "비급여 부담", pass: true, desc: "치료 적어 영향 작음" },
          { icon: "🫀", name: "중증 보장", pass: true, desc: "상한 500만원 신설" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const links: ResLink[] = [
    { icon: "📊", title: "보장 차이 상세 비교", desc: "항목별 보장률 비교표", href: "/w/5세대-실손보험-4세대-차이" },
    { icon: "🔢", title: "보험료 비교 계산", desc: "연령별 절감 금액 확인", href: "/w/5세대-실손보험-보험료-비교" },
  ];
  return (
    <ResultPass title="치료 패턴에 따라 유불리가 갈려요" desc="연간 비급여 치료비가 75~100만원 사이면 손익 분기점이에요. 보험료 절감분과 자기부담 증가분을 비교해 보세요.">
      <ResultGrid items={[
        { icon: "💸", name: "보험료", pass: true, desc: "30~50% 절약" },
        { icon: "🏥", name: "비급여", pass: false, desc: "자기부담 50%" },
        { icon: "📈", name: "분기점", pass: false, desc: "연 75~100만원" },
      ]} />
      {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article96() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "보험", "실손보험", "자기부담금"]}
      tags={["2026년 최신", "보험", "실손보험"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>5세대 실손보험 비급여 자기부담률이 <B>30%에서 50%</B>로 올랐어요. 치료비 100만원이면 본인 부담이 50만원이에요. 다만 <B>중증 질환은 연간 500만원</B> 상한이 있어서 큰 병에는 부담이 제한돼요.</>}
      sourceBar={{ badge: "금융위원회", name: "금융위원회·경향신문", date: "2026.01" }}
      stickyLabel="비급여 부담"
      stickyValue="30%→50%"
      stickyBtn="내 부담금 확인"
      disclaimer="이 글은 금융위원회·경향신문 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🛡️", title: "5세대 실손보험 허브", sub: "보장·보험료·갈아타기 전체 정리", href: "/w/5세대-실손보험", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "5세대 실손보험 4세대 차이", cat: "보험·실손", href: "/w/5세대-실손보험-4세대-차이" },
          { title: "5세대 실손보험 보험료 비교", cat: "보험·실손", href: "/w/5세대-실손보험-보험료-비교" },
          { title: "5세대 실손보험 청구 방법", cat: "보험·실손", href: "/w/5세대-실손보험-청구-방법" },
          { title: "5세대 실손보험 갈아타기 시기", cat: "보험·실손", href: "/w/5세대-실손보험-갈아타기-시기" },
          { title: "5세대 실손보험 가입 조건", cat: "보험·실손", href: "/w/5세대-실손보험-가입-조건" },
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
        { t: "내 자기부담금이 얼마나 될까?", sub: "치료 유형 · 연간 치료비 · 중증 여부" },
        { t: "5세대 실손보험 자기부담금은 어떻게 계산하나요?", sub: "기본 계산 공식 · 항목별 부담률 · 공제금액" },
        { t: "실손보험 비급여 본인부담이 50%로 올랐나요?", sub: "비중증 50% · 통원 공제금 · 치료비별 부담금" },
        { t: "4세대보다 실손보험 자기부담금이 얼마나 늘었나요?", sub: "세대별 부담 비교 · 치료비 시나리오" },
        { t: "실손보험 중증 질환 자기부담 상한은 얼마인가요?", sub: "상한 500만원 · 적용 범위 · 비중증 차이" },
        { t: "자주 묻는 질문", sub: "부담률 비교 · 상한 유무" },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="내 자기부담금이 얼마나 될까?" sub="치료 유형 · 연간 치료비 · 중증 여부">
        <CheckerShell title="내 자기부담금은 얼마나 될까?" sub="30초 계산" desc="치료 유형과 연간 치료비만 선택하면 바로 계산돼요.">
          <CheckerQ n="1" label="현재 가입하신 실손보험 세대는?" group="generation"
            opts={[["gen4","4세대"],["gen5","5세대 (전환 예정)"],["unknown","모르겠어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="주로 받는 치료 유형은?" group="treatmentType"
            opts={[["nonCovered","비급여 치료 위주"],["covered","급여 치료 위주"],["both","둘 다"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="연간 비급여 치료비가 어느 정도인가요?" group="annualCost"
            opts={[["rarely","거의 없어요"],["under50","50만원 미만"],["50to100","50~100만원"],["over100","100만원 이상"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="중증 질환(암·뇌·심장) 치료를 받고 계세요?" group="severe"
            opts={[["yes","해당돼요"],["no","해당 안 돼요"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="자기부담금이 늘었는데 왜 5세대를 선택할까요?"
        a="보험료가 30~50% 저렴해서 병원을 자주 안 가면 오히려 이득이에요. 구조를 이해하면 판단이 쉬워져요."
        label="구조 이해"
        href="/w/5세대-실손보험-4세대-차이"
      />

      <Divider />

      {/* ───── SECTION 02: 기본 계산 ───── */}
      <Sec n="SECTION 02" id="calculation" title="5세대 실손보험 자기부담금은 어떻게 계산하나요?" sub="기본 계산 공식 · 항목별 부담률 · 공제금액">
        <P>5세대 실손보험 자기부담금 계산은 생각보다 단순해요. 비급여 치료비에 <B>50%</B>를 곱하면 본인 부담이 나와요. MRI 비급여 80만원이면 40만원이 본인 부담이고, 나머지 40만원을 보험사가 보상해 줘요.</P>
        <P>급여 항목은 좀 달라요. 급여 입원은 치료비의 <B>20%</B>를 본인이 내고, 급여 외래는 건강보험 본인부담률과 연동돼요. <A href="https://www.fsc.go.kr/no010101/84272">금융위원회</A>에 따르면 상급종합병원 외래(건보 본인부담률 60%)를 이용하면 60%는 본인이 내고, 40%만 실손으로 보상받는 구조예요.</P>
        <P>여기에 공제금액도 고려해야 해요. 통원 시 의원 1~2만원, 종합병원 5만원의 공제금이 빠져요. 공제금보다 치료비가 적으면 보험금을 아예 못 받는 경우도 생기니까 소액 진료비는 사실상 자기 부담이에요.</P>

        <FormulaCard
          formula="비급여 본인부담 = 비급여 치료비 × 50%"
          notes={[
            "급여 입원: 치료비 × 20%",
            "급여 외래: 건보 본인부담률 연동 (병원급별 상이)",
            "중증 비급여(암·뇌·심장): 치료비 × 30% (상한 500만원)",
          ]}
        />

        <TableTitle>항목별 자기부담률 비교</TableTitle>
        <table><thead><tr><THL>항목</THL><TH>4세대</TH><TH>5세대</TH></tr></thead><tbody>
          {[
            ["비급여 (비중증)", "30%", "50%"],
            ["비급여 (중증)", "30%", "30% (유지)"],
            ["급여 입원", "20%", "20% (유지)"],
            ["급여 외래", "1~2만원 공제", "건보 본인부담률 연동"],
            ["통원 공제금", "1~2만원", "최소 5만원"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*금융위원회 실손보험 개편안 기준 (2026.01)</TableNote>

        <InlineLink icon="📊" title="4세대 5세대 보장 차이 상세" desc="비급여·급여 보장률 전체 비교표" href="/w/5세대-실손보험-4세대-차이" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 비급여 50% ───── */}
      <Sec n="SECTION 03" id="non-covered-50" title="실손보험 비급여 본인부담이 50%로 올랐나요?" sub="비중증 50% · 통원 공제금 · 치료비별 부담금">
        <P>네, 맞아요. 비중증 비급여 항목의 자기부담률이 4세대 <B>30%</B>에서 5세대 <B>50%</B>로 올랐어요. <A href="https://www.khan.co.kr/article/202504020600091">경향신문</A>에 따르면, 도수치료·체외충격파는 아예 보장에서 제외됐고, 나머지 비급여 항목은 절반을 본인이 부담하는 구조예요.</P>
        <P>구체적으로 비급여 치료비 200만원이 나오면 4세대는 60만원(30%), 5세대는 100만원(50%)을 본인이 내요. <B>40만원</B> 차이가 나죠. 병원을 자주 가는 분이라면 이 차이가 계속 누적되니까 상당한 금액이에요.</P>
        <P>통원 공제금도 달라졌어요. 4세대는 의원 기준 공제금이 1~2만원이었는데, 5세대는 <B>최소 5만원</B>부터 적용돼요. 감기 진료비가 3~4만원이면 보험금을 아예 못 받는 상황이 생겨요. 소액 진료비를 자주 청구하던 분이라면 체감이 클 수 있어요.</P>

        <H3>치료비별 본인 부담금 비교</H3>
        <table><thead><tr><THL>비급여 치료비</THL><TH>4세대 부담</TH><TH>5세대 부담</TH><TH>차이</TH></tr></thead><tbody>
          {[
            ["50만원", "15만원", "25만원", "+10만원"],
            ["100만원", "30만원", "50만원", "+20만원"],
            ["200만원", "60만원", "100만원", "+40만원"],
            ["500만원", "150만원", "250만원", "+100만원"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}
        </tbody></table>
        <TableNote>*비중증 비급여 기준, 공제금 미포함</TableNote>

        <Info type="warn">{"연간 비급여 치료비가 <strong>100만원 이상</strong>인 분이라면, 자기부담 증가분이 보험료 절감분보다 클 수 있어요. 전환 전에 내 치료비 패턴을 꼭 파악해 보세요."}</Info>

        <InlineLink icon="💰" title="보험료 연령별 비교" desc="세대별 보험료 차이 금액 확인" href="/w/5세대-실손보험-보험료-비교" />
      </Sec>

      <RelatedMid
        title="다른 실손보험 정보도 살펴보세요"
        items={[
          { icon: "⚖️", title: "4세대 5세대 보장 차이", desc: "비급여 보장률·한도 비교", href: "/w/5세대-실손보험-4세대-차이" },
          { icon: "💰", title: "보험료 연령별 비교", desc: "세대별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
          { icon: "🔄", title: "갈아타기 시기 판단", desc: "전환 최적 타이밍", href: "/w/5세대-실손보험-갈아타기-시기" },
        ]}
        hubHref="/category/보험"
        hubLabel="실손보험 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 4세대 vs 5세대 비교 + CaseBox 3개 ───── */}
      <Sec n="SECTION 04" id="comparison" title="4세대보다 실손보험 자기부담금이 얼마나 늘었나요?" sub="세대별 부담 비교 · 치료비 시나리오">
        <P>핵심은 '연간 비급여 치료비가 얼마냐'에 따라 유불리가 완전히 갈린다는 거예요. 자기부담률이 20%p 올랐지만 보험료는 30~50% 내렸거든요. 치료비가 적으면 보험료 절감이 크고, 많으면 자기부담 증가가 더 커요.</P>
        <P>30대 기준으로 연간 보험료 절감분이 약 15만원이에요. 비급여 치료비가 75만원이면 추가 부담분도 15만원(75만×20%)으로 딱 같아져요. 그래서 <B>연간 75~100만원</B>이 손익 분기점이에요.</P>
        <P>아래 3가지 사례로 내 상황에 가까운 케이스를 찾아보세요. 치료비가 적은 분은 5세대가, 많은 분은 4세대가, 중증이면 또 다른 계산이 필요해요.</P>

        <CaseBox
          badge="예시 1"
          label="건강한 30대 A씨, 연간 비급여 치료 없음"
          conditions={["현재 4세대: 월 30,000원", "5세대 전환 시: 월 17,500원"]}
          steps={[
            { label: "연간 보험료 절감", value: "약 150,000원" },
            { label: "비급여 추가 부담", value: "0원 (치료 없음)" },
            { label: "순이익", value: "약 150,000원" },
          ]}
          total="연간 약 15만원 순이익"
          result="5세대 전환 유리"
          pass={true}
        />
        <CaseBox
          badge="예시 2"
          label="40대 B씨, 연간 비급여 치료비 200만원"
          conditions={["현재 4세대: 본인 부담 60만원 (30%)", "5세대 전환 시: 본인 부담 100만원 (50%)"]}
          steps={[
            { label: "자기부담 증가분", value: "40만원 (200만×20%)" },
            { label: "연간 보험료 절감", value: "약 18~24만원" },
            { label: "순손실", value: "약 16~22만원" },
          ]}
          total="연간 약 16~22만원 순손실"
          result="4세대 유지가 유리"
          pass={false}
        />
        <CaseBox
          badge="예시 3"
          label="50대 C씨, 암 치료 비급여 1,500만원"
          conditions={["현재 4세대: 본인 부담 450만원 (30%)", "5세대: 중증 상한 적용 500만원"]}
          steps={[
            { label: "4세대 본인 부담", value: "1,500만 × 30% = 450만원" },
            { label: "5세대 본인 부담", value: "상한 적용 500만원" },
            { label: "차이", value: "5세대가 50만원 더 부담" },
          ]}
          total="치료비 2천만원 넘으면 5세대가 유리"
          result="중증 상한 덕분에 부담 제한"
          pass={true}
        />

        <BridgeCard
          q="내 치료비 기준으로 정확히 계산하고 싶다면?"
          a="보험료 비교 페이지에서 연령별 절감 금액과 손익 분기점을 확인할 수 있어요."
          label="손익 계산"
          href="/w/5세대-실손보험-보험료-비교"
        />
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 중증 상한 ───── */}
      <Sec n="SECTION 05" id="severe-cap" title="실손보험 중증 질환 자기부담 상한은 얼마인가요?" sub="상한 500만원 · 적용 범위 · 비중증 차이">
        <P>중증 질환(암·뇌혈관·심장질환)으로 상급종합병원이나 종합병원에 입원하면 연간 자기부담 한도가 <B>500만원</B>이에요. <A href="https://www.fsc.go.kr/no010101/84272">금융위원회</A> 발표 내용으로, 4세대에는 없던 제도가 5세대에서 새로 생겼어요.</P>
        <P>예를 들어 암 치료로 비급여 3,000만원이 나와도 본인은 최대 500만원만 내면 돼요. 4세대라면 30%인 900만원을 부담해야 했을 거예요. 치료비가 높을수록 5세대의 중증 상한이 빛을 발하는 구조예요.</P>
        <P>다만 이 상한은 중증 질환 입원에만 적용돼요. 비중증 비급여(MRI·초음파 등)에는 상한이 없어서 치료비가 많으면 본인 부담도 계속 늘어나요. 비중증 비급여 연간 한도가 <B>1,000만원</B>이니까, 최대 500만원(1,000만×50%)까지 부담이 생길 수 있어요.</P>

        <Info type="warn">{"중증 상한 <strong>500만원</strong>은 <strong>상급종합·종합병원 입원</strong>에만 적용돼요. 동네 의원 통원이나 비중증 질환은 해당하지 않으니 주의하세요."}</Info>

        <H3>비중증 vs 중증 부담 구조</H3>
        <P>비중증과 중증의 자기부담 구조가 완전히 다르다는 걸 알아야 해요. 비중증은 50% 부담에 상한이 없고, 중증은 30% 부담에 연간 500만원 상한이 있어요. 중증 환자에게는 5세대가 오히려 유리한 이유가 여기에 있어요.</P>

        <SpokeLink num="01" title="4세대 5세대 보장 차이 상세" desc="비급여·급여 보장률 전체 비교" href="/w/5세대-실손보험-4세대-차이" />
        <SpokeLink num="02" title="갈아타기 시기 판단" desc="전환 최적 타이밍 확인" href="/w/5세대-실손보험-갈아타기-시기" />

        <ExtBtn badge="금융위원회" text="실손보험 개편안 상세" cta="확인하기 →" href="https://www.fsc.go.kr/no010101/84272" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="부담률 비교 · 상한 유무">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "5세대 실손보험 4세대 차이", desc: "보장 범위 상세 비교표", href: "/w/5세대-실손보험-4세대-차이" },
        { title: "5세대 실손보험 보험료 비교", desc: "연령별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
        { title: "5세대 실손보험 갈아타기 시기", desc: "전환 최적 타이밍 판단", href: "/w/5세대-실손보험-갈아타기-시기" },
        { title: "5세대 실손보험 가입 조건", desc: "나이·건강 심사 기준", href: "/w/5세대-실손보험-가입-조건" },
        { title: "5세대 실손보험 청구 방법", desc: "실손24 전자청구 안내", href: "/w/5세대-실손보험-청구-방법" },
      ]} />
      <PrevNext
        prev={{ title: "5세대 실손보험 청구 방법", href: "/w/5세대-실손보험-청구-방법" }}
        next={{ title: "5세대 실손보험 가입 조건", href: "/w/5세대-실손보험-가입-조건" }}
      />
    </BlogLayout>
  );
}
