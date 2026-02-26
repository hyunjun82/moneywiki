"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "비상근 고문 고용보험 가입 조건 | 근로자성 판단 출퇴근 여부",
  description:
    "비상근 고문은 위촉 계약이라 고용보험 가입이 원칙적으로 안 되는 거 아시나요? 매일 출퇴근하며 업무 지시를 받는다면 근로자성 인정으로 소급 가입이 가능해요. 촉탁직 전환 방법도 정리했어요.",
  category: "실업급여",
  keywords: ["비상근 고문", "고용보험 가입", "근로자성 판단", "출퇴근 기준"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-13",
  summary: [
    "비상근 고문은 위촉 계약이라 고용보험 가입 대상이 아니에요",
    "매일 출퇴근 + 업무 지시를 받으면 근로자성 인정 가능성이 있어요",
    "촉탁직(근로계약)으로 재계약하면 고용보험·실업급여 모두 가능해요",
  ],
  sources: [
    { name: "고용보험법 피보험자격 및 적용 제외", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
    { name: "고용24 피보험자격 안내", url: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do", date: "2026-02" },
  ],
  faq: [
    {
      q: "비상근 고문이 고용보험을 안 내도 되나요?",
      a: "맞아요. 비상근 고문은 근로자가 아니라서 고용보험 가입 의무가 없어요. 회사도 고용보험료를 납부할 의무가 없어요. 단, 실질적으로 근로자처럼 일한다면 달라질 수 있어요.",
    },
    {
      q: "비상근 고문 근로자성 판단은 어디서 해주나요?",
      a: "고용노동부 지방관서나 근로복지공단에 신청할 수 있어요. 출퇴근 기록, 업무 지시 문자나 이메일, 보수 내역 등 증빙 자료를 준비해서 신고하면 조사 후 판단을 받을 수 있어요.",
    },
  ],
  ctaCard: {
    label: "30초 판정",
    mainText: "내 상황이 고용보험 가입 대상인지",
    subText: "계약 형태와 근무 방식만 선택하면 바로 나와요",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "고용보험 적용 제외 대상", url: "/w/고용보험-적용-제외" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(a: Ans): React.ReactNode | null {
  if (!a.contract || !a.attendance || !a.direction || !a.payType) return null;

  /* 위촉 + 자문만 + 지시 없음 → 가입 불가 */
  if (a.contract === "commission" && a.attendance === "occasional" && a.direction === "none") {
    const links: ResLink[] = [
      { icon: "📋", title: "고용보험 적용 제외 대상 확인", desc: "65세 이상·초단시간 등 제외 기준 정리", href: "/w/고용보험-적용-제외" },
      { icon: "📊", title: "실업급여 수급 조건 확인", desc: "이전 직장 피보험기간으로 수급 가능 여부", href: "/w/실업급여-수급-조건" },
    ];
    return (
      <ResultFail
        title="고용보험 가입 대상이 아니에요"
        desc="위촉 계약으로 자문 역할만 하면 근로자가 아니에요. 고문 기간에 대한 실업급여도 받을 수 없어요. 다만 고문 이전에 근로자로 일한 피보험기간이 수급기간(1년) 내라면 그 기간 기준으로 실업급여 신청이 가능해요."
      >
        <ResultGrid items={[
          { icon: "📄", name: "계약 형태", pass: false, desc: "위촉·자문 계약" },
          { icon: "🏢", name: "출퇴근", pass: false, desc: "필요할 때만 방문" },
          { icon: "📋", name: "업무 지시", pass: false, desc: "지시 없음 (자율)" },
          { icon: "💰", name: "보수 형태", pass: false, desc: a.payType === "fixed" ? "정기 고문료" : "건별 자문료" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  /* 근로계약 → 원칙적 가입 가능 */
  if (a.contract === "labor") {
    const links: ResLink[] = [
      { icon: "🔍", title: "4대보험 가입 여부 조회", desc: "피보험자격 확인 바로가기", href: "/w/고용보험-가입-확인" },
      { icon: "📋", title: "실업급여 신청 방법 확인", desc: "고용24 온라인 신청 절차", href: "/w/실업급여-신청방법" },
    ];
    return (
      <ResultPass
        title="고용보험 가입 대상이에요"
        desc="근로계약을 맺었다면 고용보험 가입 대상이에요. 회사가 미가입 처리했다면 4대보험 포털에서 가입 여부를 조회하고, 미가입 확인 시 근로복지공단에 신고할 수 있어요."
      >
        <ResultGrid items={[
          { icon: "📄", name: "계약 형태", pass: true, desc: "근로계약서 체결" },
          { icon: "🏢", name: "출퇴근", pass: true, desc: a.attendance === "daily" ? "매일 출퇴근" : "가끔 출근" },
          { icon: "📋", name: "업무 지시", pass: true, desc: a.direction === "receive" ? "회사 지시 받음" : "자율 근무" },
          { icon: "💰", name: "보수 형태", pass: true, desc: a.payType === "fixed" ? "정기 급여" : "건별 지급" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  /* 위촉 계약이지만 실질 근로자 가능성 */
  if (a.attendance === "daily" && a.direction === "receive") {
    const links: ResLink[] = [
      { icon: "⚖️", title: "근로자성 판단 신고 방법", desc: "고용노동부 민원 접수 절차", href: "/w/실업급여-수급자격-인정" },
      { icon: "📊", title: "피보험기간 합산 방법", desc: "이전 직장 포함 합산 조건 확인", href: "/w/실업급여-피보험기간-180일-계산" },
    ];
    return (
      <ResultPass
        title="근로자성 인정 가능성이 높아요"
        desc="이름은 고문이지만 매일 출퇴근하고 업무 지시를 받는다면 실질적 근로자로 인정받을 수 있어요. 고용노동부에 신고하면 근로자성 심사 후 고용보험 소급 가입 처리가 가능해요."
      >
        <ResultGrid items={[
          { icon: "📄", name: "계약 형태", pass: false, desc: "위촉 계약 (형식)" },
          { icon: "🏢", name: "출퇴근", pass: true, desc: "매일 출퇴근" },
          { icon: "📋", name: "업무 지시", pass: true, desc: "회사 지시 받음" },
          { icon: "💰", name: "보수 형태", pass: a.payType === "fixed", desc: a.payType === "fixed" ? "정기 급여" : "건별 지급" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  /* 위촉 + 일부 근로자성 요소 → 모호 */
  const hasDaily = a.attendance === "daily";
  const hasDirection = a.direction === "receive";
  const hasFixed = a.payType === "fixed";
  const score = [hasDaily, hasDirection, hasFixed].filter(Boolean).length;

  if (score >= 1) {
    const links: ResLink[] = [
      { icon: "☎️", title: "고용센터 상담 안내", desc: "1350 전화 상담으로 판단 가능", href: "/w/실업급여-고용센터-찾기-고용24-사용법" },
      { icon: "📋", title: "실업급여 수급 조건 확인", desc: "가입 인정 시 수급 자격 확인", href: "/w/실업급여-수급-조건" },
    ];
    return (
      <ResultFail
        title="판단이 모호해요 — 전문 상담이 필요해요"
        desc={`근로자성 요소가 일부(${score}개) 충족되지만 확정하기 어려워요. 고용센터(1350)에 상담하면 정확한 판단을 받을 수 있어요.`}
      >
        <ResultGrid items={[
          { icon: "📄", name: "계약 형태", pass: false, desc: "위촉 계약" },
          { icon: "🏢", name: "출퇴근", pass: hasDaily, desc: hasDaily ? "매일 출퇴근" : "가끔 방문" },
          { icon: "📋", name: "업무 지시", pass: hasDirection, desc: hasDirection ? "회사 지시 받음" : "자율 활동" },
          { icon: "💰", name: "보수 형태", pass: hasFixed, desc: hasFixed ? "정기 급여" : "건별 지급" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  /* 완전 불가 */
  const links: ResLink[] = [
    { icon: "📋", title: "고용보험 적용 제외 대상 확인", desc: "적용 제외 기준 전체 정리", href: "/w/고용보험-적용-제외" },
    { icon: "📊", title: "실업급여 수급 조건 확인", desc: "이전 직장 기준 수급 가능 여부", href: "/w/실업급여-수급-조건" },
  ];
  return (
    <ResultFail
      title="고용보험 가입이 어려워요"
      desc="위촉 계약에 출퇴근·업무 지시·정기 급여 요건이 모두 충족되지 않아서 근로자성 인정이 어려워요. 계약 형태를 근로계약(촉탁직)으로 변경하면 가입이 가능해요."
    >
      <ResultGrid items={[
        { icon: "📄", name: "계약 형태", pass: false, desc: "위촉 계약" },
        { icon: "🏢", name: "출퇴근", pass: false, desc: "가끔 방문" },
        { icon: "📋", name: "업무 지시", pass: false, desc: "자율 활동" },
        { icon: "💰", name: "보수 형태", pass: false, desc: "건별 지급" },
      ]} />
      {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article92() {
  const [sel, setSel] = useState<Ans>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "고용보험", "비상근 고문 고용보험"]}
      tags={["2026년 최신", "실업급여", "고용보험 가입"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>정년퇴직 후 고문 계약을 맺으면 <B>고용보험 가입이 원칙적으로 안 돼요.</B> 근로자가 아니라 위촉관계이기 때문이에요. 하지만 매일 출퇴근하며 업무 지시를 받는다면 이야기가 달라져요.</>}
      sourceBar={{ badge: "출처", name: "고용보험법 제2조·제10조 (법제처)", date: "2026.02 기준" }}
      stickyLabel="핵심 기준"
      stickyValue="실질 근로관계"
      stickyBtn="내 상황 판정하기 ↑"
      disclaimer="이 글은 고용보험법과 대법원 판례를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 근로자성 판정은 고용노동부 지방관서에서 진행하세요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기", hot: true },
          { icon: "🏛️", title: "2026 정부지원금", sub: "30개+ 지원금", href: "/w/정부지원금" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "고용보험 적용 제외 대상", cat: "실업급여·고용보험", href: "/w/고용보험-적용-제외" },
          { title: "실업급여 수급 조건 정리", cat: "실업급여·조건", href: "/w/실업급여-수급-조건" },
          { title: "고용보험료 계산 2026년 요율", cat: "실업급여·보험료", href: "/w/고용보험료" },
          { title: "실업급여 수급자격 인정 절차", cat: "실업급여·인정", href: "/w/실업급여-수급자격-인정" },
          { title: "실업급여 피보험기간 180일 계산", cat: "실업급여·기간", href: "/w/실업급여-피보험기간-180일-계산" },
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
        { t: "내 상황이 가입 대상인지 판정", sub: null },
        { t: "비상근 고문도 고용보험 가입할 수 있나요?", sub: "원칙적 가입 불가 사유 · 예외적 가입 인정 경로" },
        { t: "근로자성 판단 기준이 뭐예요?", sub: "핵심 4가지 요소 · 근로자성 불인정 사례" },
        { t: "출퇴근을 하면 가입 대상이 되나요?", sub: "출퇴근 기준 충족 요건 · 회사가 가입을 거부할 때" },
        { t: "비상임 이사와 촉탁직 차이가 뭐예요?", sub: "3가지 직위 비교표 · 촉탁직 전환 시 유의점" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ── STEP 01: 체커 ── */}
      <Sec n="STEP 01" id="checker" title="내 상황이 가입 대상인지 판정" sub="계약 형태와 근무 방식을 선택하면 30초 안에 결과가 나와요">
        <P>정년퇴직 후 고문으로 재계약하거나, 외부 전문가로 위촉된 경우가 많아요. 이때 계약서 제목이 아니라 실제로 어떻게 일하는지가 핵심이에요.</P>
        <P>아래 4가지를 선택하면 고용보험 가입 가능 여부와 다음 단계를 바로 안내해 드려요. 모호한 경우에는 고용센터(1350) 상담을 권해요.</P>

        <CheckerShell title="비상근 고문 고용보험 가입 판정기" sub="30초 확인">
          <CheckerQ n="1" label="회사와 맺은 계약 형태가 어떻게 되나요?" group="contract" opts={[["commission", "위촉·자문 계약"], ["labor", "근로계약서 체결"]]} sel={sel} pick={pick} />
          <CheckerQ n="2" label="실제 출퇴근 방식이 어떻게 되나요?" group="attendance" opts={[["daily", "매일(주 4일+) 출퇴근"], ["occasional", "필요할 때만 방문"]]} sel={sel} pick={pick} />
          <CheckerQ n="3" label="회사로부터 업무 지시를 받나요?" group="direction" opts={[["receive", "지시·감독을 받아요"], ["none", "자율적으로 활동해요"]]} sel={sel} pick={pick} />
          <CheckerQ n="4" label="보수 지급 방식이 어떻게 되나요?" group="payType" opts={[["fixed", "매월 정기 지급"], ["perCase", "건별로 지급"]]} sel={sel} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <Divider />

      {/* ── SECTION 02: 비상근 고문 ── */}
      <Sec n="SECTION 02" id="sec2" title="비상근 고문도 고용보험 가입할 수 있나요?" sub="원칙적 가입 불가 사유 · 예외적 가입 인정 경로">
        <H3>원칙적 가입 불가 사유</H3>
        <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법</A>에서 피보험자는 근로자예요. 비상근 고문은 위촉 계약 또는 자문 계약을 맺는 관계라서 근로자가 아니에요. 고용보험 적용 대상이 되려면 근로계약 관계가 있어야 하는데, 위촉관계는 여기에 해당하지 않아요.</P>
        <P>고문료는 근로소득이 아니라 기타소득이나 사업소득으로 처리돼요. 4대보험 대상 보수가 아니기 때문에 회사도 고용보험료를 납부할 의무가 없어요. 고문 기간 동안 피보험기간이 쌓이지 않는 이유가 여기에 있어요.</P>
        <P>고문 계약이 끝나도 그 기간에 대한 실업급여를 받을 수 없어요. 수급자격은 피보험자(근로자)로 일한 기간 180일 이상이 전제되거든요. 다만 고문 이전에 근로자로 일한 피보험기간이 있고, 수급기간(퇴직 후 1년) 내라면 그 기간 기준으로 신청 자체는 가능해요.</P>

        <H3>예외적 가입 인정 경로</H3>
        <P>이름이 고문이어도 실질적으로 근로자처럼 일한다면 근로자성 판단을 통해 가입이 인정될 수 있어요. 대법원은 계약서 제목이 아니라 실질적인 근무 관계를 기준으로 판단하라는 입장이에요.</P>
        <P>고용노동부에 신고하면 근로감독관이 조사를 진행하고, 근로자성이 인정되면 고용보험 소급 가입 처리가 돼요. 소급 가입이 되면 그 기간의 피보험기간도 인정돼서 실업급여 수급자격에 반영될 수 있어요.</P>

        <Info type="tip">{"촉탁직으로 <strong>근로계약</strong>을 맺으면 고용보험 가입이 자연스럽게 돼요. 재계약 전에 계약 형태를 확인하는 게 가장 간단한 방법이에요."}</Info>

        <InlineLink icon="📋" title="고용보험 적용 제외 대상 확인" desc="65세 이상, 초단시간 근로자 등 적용 제외 기준 정리" href="/w/고용보험-적용-제외" />
      </Sec>

      <Divider />

      {/* ── SECTION 03: 고용보험 가입 (근로자성 판단) ── */}
      <Sec n="SECTION 03" id="sec3" title="근로자성 판단 기준이 뭐예요?" sub="핵심 4가지 요소 · 근로자성 불인정 사례">
        <H3>핵심 4가지 요소</H3>
        <P>계약서에 "고문"이라고 쓰여 있어도 실제로 근로자처럼 일한다면 근로자로 인정될 수 있어요. 대법원과 고용노동부가 실질 우선 원칙을 적용하는 이유가 바로 여기에 있어요. 이름이 아니라 실질로 판단한다는 건 노동법의 오래된 원칙이에요.</P>

        <TableTitle>근로자성 판단 핵심 요소</TableTitle>
        <table>
          <thead><tr><TH>판단 요소</TH><TH>인정 기준</TH><TH>비고</TH></tr></thead>
          <tbody>
            <tr><THL>출퇴근 시간</THL><td>정해진 시간에 의무적 출퇴근</td><td>주 4일 이상이면 강력</td></tr>
            <tr><THL>업무 지시</THL><td>회사의 지시·감독 아래 근무</td><td>업무 내용·방법 지정</td></tr>
            <tr><THL>전속성</THL><td>특정 회사에만 전속적으로 근무</td><td>복수 위촉이면 약화</td></tr>
            <tr><THL>보수 정기성</THL><td>매월 일정 금액 정기 지급</td><td>건별 지급이면 약화</td></tr>
          </tbody>
        </table>
        <TableNote>하나씩 보면 약해도 여러 요건이 동시에 충족되면 근로자성이 인정돼요.</TableNote>

        <P>위 4가지 요소는 단독으로 결정되지 않아요. 대법원 판례를 보면, 출퇴근 + 업무 지시가 함께 충족되면 근로자성이 인정되는 경우가 대부분이에요. 반면에 전속성과 보수 정기성은 보조적인 판단 요소로 사용돼요.</P>

        <H3>근로자성 불인정 사례</H3>
        <P>자문에 그치는 경우엔 근로자성이 없어요. 필요할 때만 자문하고 고문료를 받는 형태, 여러 회사에 동시에 자문하는 복수 위촉 관계, 업무 지시 없이 자율적으로 활동하는 경우는 근로자성 인정이 어려워요.</P>
        <P>근로자성 여부가 궁금하다면 고용노동부 지방관서에 신고해서 근로감독관 조사를 받으면 돼요. 증빙 자료로는 출퇴근 기록, 업무 지시 문자나 이메일, 월 정기 보수 내역 등이 필요해요. 자료가 구체적일수록 판단이 빨라요.</P>

        <Info type="warn">{"<strong>주의:</strong> 위촉 계약서에 '근로관계가 아니다'라는 문구가 있어도 실질이 근로자이면 근로자성이 인정돼요. 계약서 문구가 절대적 기준은 아니에요."}</Info>

        <InlineLink icon="⚖️" title="실업급여 수급자격 인정 절차" desc="고용센터 신고부터 수급자격 심사까지 절차 정리" href="/w/실업급여-수급자격-인정" />
      </Sec>

      <RelatedMid
        title="고용보험 관련 글도 확인해 보세요"
        items={[
          { icon: "💰", title: "고용보험료 계산 2026년 요율", desc: "근로자 0.9% + 사업주 0.9% 계산", href: "/w/고용보험료" },
          { icon: "📋", title: "실업급여 수급 조건 정리", desc: "180일 + 비자발적 퇴사 기준", href: "/w/실업급여-수급-조건" },
          { icon: "🏢", title: "고용센터 찾기·고용24 사용법", desc: "온라인 신청부터 조회까지", href: "/w/실업급여-고용센터-찾기-고용24-사용법" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* ── SECTION 04: 근로자성 판단 (출퇴근 기준) ── */}
      <Sec n="SECTION 04" id="sec4" title="출퇴근을 하면 가입 대상이 되나요?" sub="출퇴근 기준 충족 요건 · 회사가 가입을 거부할 때">
        <H3>출퇴근 기준 충족 요건</H3>
        <P>매일 정해진 시간에 출퇴근하고 회사 공간에서 일하며 회사 비품을 쓴다면 근로자 인정의 핵심 요건을 갖춘 거예요. 여기서 중요한 건 단순 방문이 아니라 정기적이고 의무적인 출퇴근이어야 한다는 점이에요.</P>
        <P>출퇴근에 업무 지시와 전속성이 더해지면 근로자성이 더욱 분명해져요. 주 5일 또는 그에 준하는 출퇴근, 특정 회사에만 전속적으로 일하는 구조, 보수가 고문료가 아닌 월급 형태로 지급되면 촉탁직과 사실상 동일하다고 볼 수 있어요.</P>
        <P>주의할 점은 주 1~2회 회의 참석 정도는 출퇴근 기준을 충족하지 않는다는 거예요. 매일 또는 거의 매일 일정 시간을 회사에서 일해야 근로자성의 출퇴근 요건으로 인정돼요. 경계가 모호하다면 고용센터(1350)에 상담해 보는 게 좋아요.</P>

        <H3>회사가 가입을 거부할 때</H3>
        <P>실질적으로 근로자인데 회사가 고용보험 가입을 거부한다면 단독으로 해결하기 어려워요. 고용노동부 민원 포털이나 고용센터에 상담 후 공식 신고 절차를 밟으면 돼요. 근로감독관이 조사를 진행하고, 근로자성이 인정되면 고용보험 소급 가입과 실업급여 수급 자격이 생길 수 있어요.</P>
        <P>신고할 때 준비하면 좋은 증빙 자료가 있어요. 출퇴근 기록(출입카드, 사내 시스템 로그), 업무 지시 문자나 이메일, 월 정기 보수 입금 내역이 대표적이에요. 자료가 구체적이고 일관성이 있을수록 판단이 유리해요.</P>

        <BridgeCard
          q="조건은 충족되는데, 실업급여는 어떻게 신청하면 될까요?"
          a="근로자성이 인정되면 고용24에서 온라인으로 실업급여를 신청할 수 있어요."
          label="다음 단계"
          href="/w/실업급여-신청방법"
        />
      </Sec>

      <Divider />

      {/* ── SECTION 05: 출퇴근 기준 (비상임 이사·촉탁직 차이) ── */}
      <Sec n="SECTION 05" id="sec5" title="비상임 이사와 촉탁직 차이가 뭐예요?" sub="3가지 직위 비교표 · 촉탁직 전환 시 유의점">
        <H3>3가지 직위 비교표</H3>
        <P>비상근 고문, 비상임 이사, 촉탁직은 이름이 비슷해 보여도 법적 지위가 완전히 달라요. 계약 형태에 따라 고용보험 가입 여부가 갈리는 만큼, 재계약 전에 꼭 비교해 봐야 해요.</P>

        <TableTitle>직위별 고용보험 가입 비교</TableTitle>
        <table>
          <thead><tr><TH>구분</TH><TH>계약 형태</TH><TH>고용보험</TH><TH>실업급여</TH></tr></thead>
          <tbody>
            <tr><THL>비상근 고문</THL><td>위촉·자문 계약</td><td><Tag v="b">원칙 불가</Tag></td><td><Tag v="b">불가</Tag></td></tr>
            <tr><THL>비상임 이사</THL><td>임원 선임 (등기)</td><td><Tag v="b">불가</Tag></td><td><Tag v="b">불가</Tag></td></tr>
            <tr><THL>촉탁직</THL><td>근로계약</td><td><Tag v="a">가능</Tag></td><td><Tag v="a">가능</Tag></td></tr>
          </tbody>
        </table>
        <TableNote>비상임 이사는 법인 등기임원이라 고용보험 적용 대상이 아니에요.</TableNote>

        <P>비상임 이사는 이사회에서 선임되는 등기임원이에요. 경영에 참여하는 역할이라서 고용보험법상 근로자가 아니에요. 비상근 고문과 마찬가지로 고용보험 가입이 안 되고, 실업급여도 받을 수 없어요.</P>

        <H3>촉탁직 전환 시 유의점</H3>
        <P>촉탁직은 정년퇴직 후 동일 회사에서 재고용하는 형태지만, 핵심은 근로계약을 맺는다는 거예요. 근로자이기 때문에 고용보험 가입 대상이고, 이후 퇴사하면 실업급여도 받을 수 있어요. 고문 대신 촉탁직으로 재계약하는 게 실업급여 측면에서 훨씬 유리해요.</P>
        <P>다만 촉탁직이라도 주 소정근로시간이 <B>15시간 미만</B>이면 초단시간 근로자로 분류돼서 고용보험 적용 제외가 될 수 있어요. 재계약할 때 주 15시간 이상 근로 조건이 포함되어 있는지 반드시 확인해야 해요.</P>
        <P>결국 계약서 형태가 핵심이에요. 근로계약서를 쓰면 근로자, 위촉 계약서를 쓰면 위촉관계예요. 계약서를 쓰지 않은 경우엔 실질적인 근무 방식을 보고 판단하게 돼요. 재계약 전에 계약 내용을 꼼꼼히 따져보는 게 가장 중요해요.</P>

        <Info type="warn">{"<strong>촉탁직 65세 이상 주의:</strong> 65세 이후 새로 고용된 경우 고용보험 <strong>실업급여</strong> 부분은 적용 제외돼요. 단, 65세 전부터 계속 근무 중이었다면 적용 대상이에요."}</Info>

        <SpokeLink num="01" title="실업급여 수급 조건 정리" desc="180일 + 비자발적 퇴사 핵심 기준" href="/w/실업급여-수급-조건" />
        <SpokeLink num="02" title="고용보험료 계산 2026년 요율" desc="근로자·사업주 각 0.9% 부담금" href="/w/고용보험료" />

        <ExtBtn badge="고용노동부 공식" text="근로자성 판단 신고·민원 접수" cta="바로가기 →" href="https://www.moel.go.kr" />
      </Sec>

      <Divider />

      {/* ── FAQ ── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "고용보험 적용 제외 대상 정리", desc: "65세 이상·초단시간·외국인 등 기준", href: "/w/고용보험-적용-제외" },
        { title: "실업급여 수급 조건 핵심 정리", desc: "180일 + 비자발적 퇴사 기준 확인", href: "/w/실업급여-수급-조건" },
        { title: "실업급여 수급자격 인정 절차", desc: "고용센터 신고부터 심사까지", href: "/w/실업급여-수급자격-인정" },
        { title: "실업급여 피보험기간 180일 계산", desc: "이전 직장 합산·제외 기간 정리", href: "/w/실업급여-피보험기간-180일-계산" },
        { title: "고용보험료 계산 2026년 요율", desc: "근로자·사업주 합산 1.8% 계산", href: "/w/고용보험료" },
      ]} />
      <PrevNext
        prev={{ title: "고용보험료 계산 2026년 요율", href: "/w/고용보험료" }}
        next={{ title: "연장급여 3종류 비교", href: "/w/연장급여-훈련연장-개별연장-특별연장-조건-비교" }}
      />
    </BlogLayout>
  );
}
