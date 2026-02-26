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
  title: "5세대 실손보험 가입 조건 | 세대별 전환 무심사 일정",
  description:
    "5세대 실손보험 가입 조건이 궁금하시죠? 2026년 4월 이후 신규 가입자는 5세대만 가능하고, 기존 가입자는 갱신일에 순차 전환돼요. 1~2세대는 무심사 재가입도 가능해요.",
  category: "보험",
  keywords: [
    "5세대 실손보험 신규 가입 조건",
    "실손보험 가입 나이 건강 심사",
    "기존 실손보험 5세대 전환 시기",
    "실손보험 계약 재매입 무심사 전환",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-02",
  summary: [
    "2026년 4월 이후 신규 가입자는 5세대 실손보험만 가입 가능해요",
    "기존 2~4세대 가입자는 갱신일에 순차적으로 5세대로 전환돼요 (2026.7~2036.6)",
    "1세대·초기 2세대는 계약 재매입으로 무심사 5세대 전환이 가능해요",
  ],
  sources: [
    {
      name: "금융위원회 실손보험 개편안",
      url: "https://www.fsc.go.kr/no010101/84272",
      date: "2026-01",
    },
    {
      name: "뱅크샐러드 5세대 실손보험 가이드",
      url: "https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90",
      date: "2026-01",
    },
    {
      name: "KB의 생각 5세대 실손보험",
      url: "https://kbthink.com/insurance/trend/5th-generation.html",
      date: "2026-01",
    },
  ],
  faq: [
    {
      q: "5세대 실손보험 몇 살까지 가입 가능한가요?",
      a: "일반 신규 가입은 0~65세까지예요. 다만 계약 재매입을 통한 전환은 무심사라서 나이 제한이 없어요. 80~90세 고령자도 전환 가능해요.",
    },
    {
      q: "4세대 가입자도 5세대로 바꿀 수 있나요?",
      a: "재가입 시기(5년마다)가 되면 자동으로 5세대로 전환돼요. 2026년 7월부터 2031년까지 순차 전환이 진행돼요.",
    },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "나는 5세대 가입이 가능할까?",
    subText: "현재 가입 상태만 선택하면 바로 확인",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "5세대 실손보험 4세대 차이", url: "/w/5세대-실손보험-4세대-차이" },
    { title: "5세대 실손보험 갈아타기 시기", url: "/w/5세대-실손보험-갈아타기-시기" },
    { title: "5세대 실손보험 보험료 비교", url: "/w/5세대-실손보험-보험료-비교" },
    { title: "5세대 실손보험 자기부담금", url: "/w/5세대-실손보험-자기부담금" },
    { title: "5세대 실손보험 청구 방법", url: "/w/5세대-실손보험-청구-방법" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(a: Ans): React.ReactNode | null {
  if (!a.currentStatus || !a.age || !a.health || !a.priority) return null;

  if (a.currentStatus === "none") {
    const links: ResLink[] = [
      { icon: "💰", title: "보험료 연령별 비교", desc: "세대별 보험료 차이 확인", href: "/w/5세대-실손보험-보험료-비교" },
      { icon: "📊", title: "4세대 5세대 보장 차이", desc: "보장 범위 비교표", href: "/w/5세대-실손보험-4세대-차이" },
    ];
    return (
      <ResultPass title="2026년 4월 이후 바로 가입 가능해요" desc="미가입자는 5세대 출시 후 신규 가입하면 돼요. 건강 상태 심사만 통과하면 가입할 수 있어요. 보험료도 기존 세대보다 저렴해요.">
        <ResultGrid items={[
          { icon: "📋", name: "가입 자격", pass: true, desc: "신규 가입 가능" },
          { icon: "💸", name: "보험료", pass: true, desc: "기존 대비 30~50% 저렴" },
          { icon: "🏥", name: "건강 심사", pass: a.health === "good", desc: a.health === "good" ? "양호" : "고지의무 확인 필요" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  if (a.currentStatus === "gen1" || a.currentStatus === "gen2early") {
    const links: ResLink[] = [
      { icon: "🔄", title: "갈아타기 시기 판단", desc: "재매입 전환 상세 안내", href: "/w/5세대-실손보험-갈아타기-시기" },
      { icon: "🔢", title: "자기부담금 계산", desc: "전환 후 부담 금액 확인", href: "/w/5세대-실손보험-자기부담금" },
    ];
    return (
      <ResultPass title="무심사로 5세대 전환이 가능해요" desc="1세대·초기 2세대 가입자는 계약 재매입 제도를 통해 무심사로 5세대에 재가입할 수 있어요. 건강 상태와 관계없이 전환 가능해요.">
        <ResultGrid items={[
          { icon: "📋", name: "전환 자격", pass: true, desc: "무심사 재가입" },
          { icon: "💰", name: "재매입 보상금", pass: true, desc: "보험사 보상금 지급" },
          { icon: "🏥", name: "건강 심사", pass: true, desc: "심사 면제" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  if (a.currentStatus === "gen4") {
    const links: ResLink[] = [
      { icon: "📊", title: "보장 차이 비교", desc: "4세대 vs 5세대 항목별 비교", href: "/w/5세대-실손보험-4세대-차이" },
      { icon: "🔄", title: "갈아타기 시기·비용", desc: "전환 일정 및 유의사항", href: "/w/5세대-실손보험-갈아타기-시기" },
    ];
    return (
      <ResultPass title="갱신일에 자동으로 5세대 전환돼요" desc="4세대는 5년 재가입 주기에 맞춰 자동 전환돼요. 2026년 7월부터 2031년까지 순차 진행이에요. 별도 신청은 필요 없어요.">
        <ResultGrid items={[
          { icon: "📋", name: "전환 방식", pass: true, desc: "갱신일 자동 전환" },
          { icon: "⏰", name: "전환 기간", pass: true, desc: "2026.7~2031" },
          { icon: "💸", name: "수수료", pass: true, desc: "전환 비용 없음" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const links: ResLink[] = [
    { icon: "🔄", title: "갈아타기 시기 판단", desc: "전환 일정 확인", href: "/w/5세대-실손보험-갈아타기-시기" },
    { icon: "💰", title: "보험료 비교", desc: "세대별 보험료 차이", href: "/w/5세대-실손보험-보험료-비교" },
  ];
  return (
    <ResultPass title="갱신일에 순차적으로 전환돼요" desc="2~3세대 가입자는 갱신일에 5세대로 자동 전환돼요. 2026년 7월부터 2036년 6월까지 10년간 순차 진행이에요.">
      <ResultGrid items={[
        { icon: "📋", name: "전환 방식", pass: true, desc: "갱신일 자동 전환" },
        { icon: "⏰", name: "전환 기간", pass: true, desc: "2026.7~2036.6" },
        { icon: "💸", name: "수수료", pass: true, desc: "전환 비용 없음" },
      ]} />
      {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article97() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "보험", "실손보험", "가입 조건"]}
      tags={["2026년 최신", "보험", "실손보험"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>2026년 4월 이후 신규 가입자는 <B>5세대 실손보험만</B> 가입 가능해요. 기존 가입자는 갱신일에 순차 전환되고, 1~2세대는 <B>무심사 재가입</B>까지 가능해요.</>}
      sourceBar={{ badge: "금융위원회", name: "금융위원회·뱅크샐러드", date: "2026.01" }}
      stickyLabel="출시 시기"
      stickyValue="2026년 4월"
      stickyBtn="내 가입 확인"
      disclaimer="이 글은 금융위원회·뱅크샐러드 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🛡️", title: "5세대 실손보험 허브", sub: "보장·보험료·갈아타기 전체 정리", href: "/w/5세대-실손보험", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "5세대 실손보험 4세대 차이", cat: "보험·실손", href: "/w/5세대-실손보험-4세대-차이" },
          { title: "5세대 실손보험 갈아타기 시기", cat: "보험·실손", href: "/w/5세대-실손보험-갈아타기-시기" },
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
        { t: "나는 5세대 가입이 가능할까?", sub: "가입 상태 · 나이 · 건강 심사" },
        { t: "5세대 실손보험 신규 가입 조건은 어떻게 되나요?", sub: "2026년 4월 출시 · 가입 심사 · 고지의무" },
        { t: "실손보험 가입할 때 나이나 건강 심사가 있나요?", sub: "0~65세 · 고지의무 · 기존 질환" },
        { t: "기존 가입자의 실손보험 5세대 전환은 언제인가요?", sub: "세대별 전환 일정 · 자동 전환 · 10년 순차" },
        { t: "실손보험 재매입으로 무심사 전환할 수 있나요?", sub: "1~2세대 대상 · 보상금 · 나이 무관" },
        { t: "자주 묻는 질문", sub: "나이 제한 · 4세대 전환" },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="나는 5세대 가입이 가능할까?" sub="가입 상태 · 나이 · 건강 심사">
        <CheckerShell title="5세대 실손보험, 나도 가입할 수 있을까?" sub="30초 확인" desc="현재 가입 상태만 선택하면 바로 확인돼요.">
          <CheckerQ n="1" label="현재 실손보험 가입 상태는?" group="currentStatus"
            opts={[["none","미가입"],["gen1","1세대"],["gen2early","초기 2세대 (2013년 이전)"],["gen23","2세대 후기·3세대"],["gen4","4세대"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="나이대가 어떻게 되세요?" group="age"
            opts={[["young","20~30대"],["middle","40~50대"],["senior","60대 이상"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="현재 건강 상태는?" group="health"
            opts={[["good","양호해요"],["condition","기저질환 있어요"],["history","큰 병력이 있어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="가장 중요하게 생각하는 건?" group="priority"
            opts={[["premium","보험료 절감"],["coverage","보장 유지"],["nosearch","무심사 전환"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="5세대가 정확히 뭐가 달라졌는지 궁금하시죠?"
        a="비급여 보장을 줄이는 대신 보험료를 30~50% 낮추고, 중증 보장은 강화한 구조예요."
        label="차이 확인"
        href="/w/5세대-실손보험-4세대-차이"
      />

      <Divider />

      {/* ───── SECTION 02: 신규 가입 조건 ───── */}
      <Sec n="SECTION 02" id="new-enrollment" title="5세대 실손보험 신규 가입 조건은 어떻게 되나요?" sub="2026년 4월 출시 · 가입 심사 · 고지의무">
        <P>2026년 4월 출시 이후에 처음 실손보험에 가입하는 사람은 <B>5세대만</B> 선택할 수 있어요. <A href="https://www.fsc.go.kr/no010101/84272">금융위원회</A>에서 공식 발표한 내용이에요. 4세대 이하 상품은 더 이상 신규 판매가 되지 않아요.</P>
        <P>가입할 때 특별한 자격 제한은 없지만, 기존 실손보험과 동일하게 건강 상태 심사는 받아야 해요. 과거 병력, 현재 치료 중인 질환, 약물 복용 여부를 정확하게 고지해야 해요. 거짓으로 고지하면 나중에 보험금을 못 받을 수 있어요.</P>
        <P>보험사마다 심사 기준이 조금씩 달라요. 어떤 보험사는 특정 질환이 있으면 가입을 거절하고, 어떤 곳은 부담보(해당 질환 보장 제외) 조건으로 가입을 허용해요. <A href="https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90">뱅크샐러드</A> 같은 비교 플랫폼에서 여러 보험사를 비교해 보는 게 좋아요.</P>

        <Info type="warn">{"고지의무를 위반하면 <strong>보험금 지급 거절</strong> 사유가 돼요. 과거 병력이나 현재 치료 중인 질환은 빠짐없이 정확하게 알려야 해요."}</Info>

        <InlineLink icon="💰" title="보험료 연령별 비교" desc="세대별 보험료 차이 금액 확인" href="/w/5세대-실손보험-보험료-비교" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 나이·건강 심사 ───── */}
      <Sec n="SECTION 03" id="age-health" title="실손보험 가입할 때 나이나 건강 심사가 있나요?" sub="0~65세 · 고지의무 · 기존 질환">
        <P>일반 신규 가입은 <B>0~65세</B>까지 가능해요. 65세를 넘으면 대부분 보험사가 신규 가입을 받지 않아요. 다만 계약 재매입을 통한 전환은 나이 제한이 없어서, <A href="https://kbthink.com/insurance/trend/5th-generation.html">KB금융그룹</A>에 따르면 80~90세 고령자도 5세대로 전환할 수 있어요.</P>
        <P>건강 심사는 가입 시점에 진행돼요. 혈압·당뇨·심장질환 같은 기저질환이 있으면 가입이 제한될 수 있어요. 하지만 경증이거나 잘 관리되고 있으면 부담보 조건(해당 질환 보장 제외)으로 가입이 허용되는 경우도 많아요.</P>
        <P>중요한 건 고지의무예요. 최근 5년간 입원·수술 이력, 최근 1개월간 의사 진찰 내역을 솔직하게 알려야 해요. 가입 후에 고지의무 위반이 발견되면 보험금을 못 받거나 계약이 해지될 수 있어요.</P>

        <H3>가입 심사 주요 항목</H3>
        <table><thead><tr><THL>항목</THL><TH>내용</TH><TH>미고지 시 위험</TH></tr></thead><tbody>
          {[
            ["과거 병력 (5년)", "입원·수술 이력", "보험금 지급 거절"],
            ["현재 치료", "통원·약물 복용", "계약 해지 가능"],
            ["직업·활동", "위험 직업 여부", "가입 제한"],
            ["BMI·혈압", "건강검진 결과", "부담보 조건 부여"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*보험사별 심사 기준이 다를 수 있어요</TableNote>

        <InlineLink icon="🔢" title="자기부담금 계산" desc="전환 후 내 부담 금액 확인" href="/w/5세대-실손보험-자기부담금" />
      </Sec>

      <RelatedMid
        title="다른 실손보험 정보도 살펴보세요"
        items={[
          { icon: "⚖️", title: "4세대 5세대 보장 차이", desc: "비급여 보장률·한도 비교", href: "/w/5세대-실손보험-4세대-차이" },
          { icon: "💰", title: "보험료 연령별 비교", desc: "세대별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
          { icon: "🔢", title: "자기부담금 계산", desc: "내 치료비 기준 부담 금액", href: "/w/5세대-실손보험-자기부담금" },
        ]}
        hubHref="/category/보험"
        hubLabel="실손보험 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 세대별 전환 일정 ───── */}
      <Sec n="SECTION 04" id="conversion-schedule" title="기존 가입자의 실손보험 5세대 전환은 언제인가요?" sub="세대별 전환 일정 · 자동 전환 · 10년 순차">
        <P>기존 2~4세대 가입자는 갱신일에 맞춰 자동으로 5세대로 전환돼요. <A href="https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90">뱅크샐러드</A>에 따르면 약 2,000만 건의 계약이 해당돼요. 2026년 7월부터 시작해서 최대 2036년 6월까지 10년간 순차적으로 진행돼요.</P>
        <P>4세대는 재가입 주기가 5년이라 2031년까지 전환이 완료되고, 2~3세대는 재가입 주기가 15년이라 2036년까지 시간이 걸려요. 갱신일 1~2개월 전에 보험사에서 안내문을 보내주니까 놓칠 걱정은 없어요.</P>
        <P>전환을 거부하고 싶어도 3~4세대는 선택권이 없어요. 갱신일이 되면 자동으로 5세대 약관이 적용돼요. 현재 보험을 해지하고 다른 보험사에서 새로 가입하는 방법은 있지만, 5세대 출시 후에는 4세대 신규 판매가 중단되니 사실상 5세대로 가는 수밖에 없어요.</P>

        <TableTitle>세대별 전환 일정</TableTitle>
        <table><thead><tr><THL>가입 세대</THL><TH>전환 방식</TH><TH>전환 기간</TH></tr></thead><tbody>
          {[
            ["1세대", "선택 전환 (재매입)", "2026년 이후 원하는 시기"],
            ["초기 2세대 (2013년 이전)", "선택 전환 (재매입)", "2026년 이후 원하는 시기"],
            ["후기 2세대·3세대", "갱신일 자동 전환", "2026.7~2036.6 (10년)"],
            ["4세대", "갱신일 자동 전환", "2026.7~2031 (5년)"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*금융위원회·뱅크샐러드 기준 (2026.01)</TableNote>

        <BridgeCard
          q="갱신일까지 기다려야 하나, 미리 바꿀 수는 없나 궁금하시죠?"
          a="3~4세대는 갱신일 전에 전환이 불가능해요. 갈아타기 시기 판단 기준을 확인해 보세요."
          label="시기 판단"
          href="/w/5세대-실손보험-갈아타기-시기"
        />
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 무심사 재매입 ───── */}
      <Sec n="SECTION 05" id="repurchase" title="실손보험 재매입으로 무심사 전환할 수 있나요?" sub="1~2세대 대상 · 보상금 · 나이 무관">
        <P>1세대와 2013년 4월 이전 가입한 초기 2세대 가입자만 해당돼요. <A href="https://kbthink.com/insurance/trend/5th-generation.html">KB금융그룹</A>에 따르면 보험사가 적정 보상금을 주고 기존 계약을 해지한 뒤, 원하면 <B>무심사</B>로 5세대에 재가입할 수 있는 제도예요.</P>
        <P>가장 큰 장점은 건강 상태와 나이에 상관없이 전환이 가능하다는 거예요. 70~80대 고령자도, 기저질환이 있는 분도 무심사로 5세대에 가입할 수 있어요. 일반 신규 가입이라면 65세 이상은 거절당할 수 있는데, 재매입은 그런 제한이 없어요.</P>
        <P>다만 재매입 보상금 기준은 아직 확정되지 않았어요. 2025년 하반기 발표 예정이었지만 2026년 2월 현재 아직 공개되지 않은 상태예요. 보상금 수준에 따라 재매입이 유리한지 아닌지가 달라지니 발표를 기다려 보는 게 좋아요.</P>

        <Info type="warn">{"재매입으로 전환하면 <strong>기존 계약은 완전히 해지</strong>돼요. 5세대로 전환한 뒤에는 다시 1~2세대로 돌아갈 수 없으니 신중하게 결정하세요."}</Info>

        <H3>재매입 vs 자동 전환 비교</H3>
        <P>1~2세대 가입자는 재매입(선택 전환)과 자동 전환(해당 없음) 중 선택하는 구조고, 3~4세대는 자동 전환만 가능해요. 재매입은 보상금이라는 인센티브가 있지만, 기존 보장을 포기해야 하는 리스크도 있어요.</P>

        <SpokeLink num="01" title="갈아타기 시기·비용 상세" desc="전환 일정 및 유의사항" href="/w/5세대-실손보험-갈아타기-시기" />
        <SpokeLink num="02" title="보험료 연령별 비교" desc="전환 후 보험료 절감 금액" href="/w/5세대-실손보험-보험료-비교" />

        <ExtBtn badge="금융위원회" text="실손보험 개편안 상세" cta="확인하기 →" href="https://www.fsc.go.kr/no010101/84272" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="나이 제한 · 4세대 전환">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "5세대 실손보험 4세대 차이", desc: "보장 범위 상세 비교표", href: "/w/5세대-실손보험-4세대-차이" },
        { title: "5세대 실손보험 갈아타기 시기", desc: "전환 최적 타이밍 판단", href: "/w/5세대-실손보험-갈아타기-시기" },
        { title: "5세대 실손보험 보험료 비교", desc: "연령별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
        { title: "5세대 실손보험 자기부담금", desc: "내 치료비 기준 부담 금액", href: "/w/5세대-실손보험-자기부담금" },
        { title: "5세대 실손보험 청구 방법", desc: "실손24 전자청구 안내", href: "/w/5세대-실손보험-청구-방법" },
      ]} />
      <PrevNext
        prev={{ title: "5세대 실손보험 자기부담금 계산", href: "/w/5세대-실손보험-자기부담금" }}
        next={{ title: "5세대 실손보험 갈아타기 시기", href: "/w/5세대-실손보험-갈아타기-시기" }}
      />
    </BlogLayout>
  );
}
