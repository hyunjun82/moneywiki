"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  Steps,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "5세대 실손보험 보험금 청구 방법 | 실손24 앱 필요서류 목록",
  description:
    "5세대 실손보험 청구는 실손24 앱으로 병원에서 바로 전자청구가 가능해요. 진료비 영수증·세부내역서·처방전 3가지만 있으면 되고요, 치료 후 3년 안에 청구해야 시효가 안 지나요.",
  category: "보험",
  keywords: [
    "5세대 실손보험 청구 방법",
    "실손24 앱 전자청구 사용법",
    "실손보험 청구 필요서류 목록",
    "실손보험 청구 기간 소멸시효",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "실손24 앱으로 병원에서 바로 전자청구 가능해요 (종이 서류 불필요)",
    "영수증·세부내역서·처방전 3가지만 있으면 청구할 수 있어요",
    "치료 후 3년 안에 청구해야 소멸시효가 안 지나요",
  ],
  sources: [
    {
      name: "실손24 공식 사이트",
      url: "https://www.silson24.or.kr",
      date: "2026-02",
    },
    {
      name: "대한민국 정책브리핑 실손보험 전산화",
      url: "https://www.korea.kr/news/policyNewsView.do?newsId=148935501",
      date: "2024-10",
    },
    {
      name: "뱅크샐러드 실비보험 청구 방법",
      url: "https://www.banksalad.com/articles/%EC%8B%A4%EB%B9%84%EB%B3%B4%ED%97%98-%EC%B2%AD%EA%B5%AC%EC%84%9C%EB%A5%98-%EC%8B%A4%EB%B9%84-%EC%B2%AD%EA%B5%AC%ED%95%98%EB%8A%94-%EB%B2%95-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-%EC%8B%A4%EB%B9%84%EB%B3%B4%ED%97%98-%EC%B2%AD%EA%B5%AC%EA%B8%B0%EA%B0%84",
      date: "2025-12",
    },
  ],
  faq: [
    {
      q: "5세대 실손보험 청구가 4세대랑 다른 점이 있나요?",
      a: "청구 절차 자체는 똑같아요. 다만 비급여 자기부담률이 30%에서 50%로 올라서 받는 보험금이 줄어요. 도수치료·체외충격파는 아예 청구 대상에서 제외됐고요.",
    },
    {
      q: "실손24 앱이 안 되는 병원은 어떻게 하나요?",
      a: "아직 전산화가 안 된 소규모 병원은 기존 방식으로 청구하면 돼요. 진료비 영수증·세부내역서를 직접 떼서 보험사 앱이나 우편·팩스로 보내면 돼요.",
    },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "내 청구 준비 끝났을까?",
    subText: "서류·앱 설치만 확인하면 바로 청구 가능",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "5세대 실손보험 자기부담금", url: "/w/5세대-실손보험-자기부담금" },
    { title: "5세대 실손보험 보장 내용", url: "/w/5세대-실손보험-보장-내용" },
    { title: "5세대 실손보험 중복 가입", url: "/w/5세대-실손보험-중복-가입" },
    { title: "5세대 실손보험 4세대 차이", url: "/w/5세대-실손보험-4세대-차이" },
    { title: "5세대 실손보험 보험료 비교", url: "/w/5세대-실손보험-보험료-비교" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(a: Ans): React.ReactNode | null {
  if (!a.appInstall || !a.documents || !a.claimTiming || !a.claimType) return null;

  if (a.appInstall === "installed" && a.documents === "ready") {
    const links: ResLink[] = [
      { icon: "📱", title: "실손24 전자청구 가이드", desc: "앱 화면별 청구 순서 안내", href: "/w/5세대-실손보험-청구-방법" },
      { icon: "🔢", title: "자기부담금 계산", desc: "내 치료비 기준 수령액 확인", href: "/w/5세대-실손보험-자기부담금" },
    ];
    return (
      <ResultPass title="바로 청구할 수 있어요" desc="실손24 앱이 설치돼 있고 서류도 준비됐으니, 병원에서 진료받은 뒤 앱에서 바로 전자청구하면 돼요. 평균 3~7일 안에 입금돼요.">
        <ResultGrid items={[
          { icon: "📱", name: "앱 설치", pass: true, desc: "실손24 설치 완료" },
          { icon: "📄", name: "서류 준비", pass: true, desc: "영수증·내역서·처방전" },
          { icon: "⏰", name: "청구 기간", pass: a.claimTiming === "within3y", desc: a.claimTiming === "within3y" ? "시효 내" : "시효 확인 필요" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  if (a.appInstall === "notInstalled") {
    const links: ResLink[] = [
      { icon: "📱", title: "실손24 앱 다운로드", desc: "iOS·안드로이드 모두 지원", href: "https://www.silson24.or.kr" },
      { icon: "📋", title: "보장 내용 확인", desc: "5세대 보장 항목 전체 확인", href: "/w/5세대-실손보험-보장-내용" },
    ];
    return (
      <ResultFail title="실손24 앱부터 설치하세요" desc="실손24 앱이 있으면 종이 서류 없이 병원에서 바로 전자청구가 가능해요. 앱스토어에서 '실손24'를 검색해서 설치하면 돼요.">
        <ResultGrid items={[
          { icon: "📱", name: "앱 설치", pass: false, desc: "실손24 설치 필요" },
          { icon: "📄", name: "서류 준비", pass: a.documents === "ready", desc: a.documents === "ready" ? "준비 완료" : "서류 확인 필요" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  if (a.documents === "notReady") {
    const links: ResLink[] = [
      { icon: "📄", title: "필요서류 상세 안내", desc: "항목별 발급처와 준비 방법", href: "/w/5세대-실손보험-청구-방법" },
      { icon: "🏥", title: "보장 내용 확인", desc: "청구 가능한 항목 확인", href: "/w/5세대-실손보험-보장-내용" },
    ];
    return (
      <ResultFail title="서류를 먼저 준비하세요" desc="진료비 영수증·세부내역서·처방전 3가지가 필요해요. 실손24 앱 전자청구를 쓰면 서류가 자동 전송돼서 따로 뗄 필요가 없어요.">
        <ResultGrid items={[
          { icon: "📱", name: "앱 설치", pass: a.appInstall === "installed", desc: a.appInstall === "installed" ? "설치 완료" : "설치 필요" },
          { icon: "📄", name: "서류 준비", pass: false, desc: "영수증·내역서·처방전 필요" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  const links: ResLink[] = [
    { icon: "📱", title: "실손24 앱 안내", desc: "설치부터 청구까지 순서", href: "https://www.silson24.or.kr" },
    { icon: "🔢", title: "자기부담금 계산", desc: "내 치료비 기준 수령액", href: "/w/5세대-실손보험-자기부담금" },
  ];
  return (
    <ResultPass title="청구 준비를 시작해 보세요" desc="실손24 앱 설치 → 서류 확인 → 전자청구 순서로 진행하면 돼요. 10만원 이하 진료비는 영수증·내역서만으로 청구 가능해요.">
      <ResultGrid items={[
        { icon: "📱", name: "앱 설치", pass: false, desc: "확인 필요" },
        { icon: "📄", name: "서류", pass: false, desc: "확인 필요" },
      ]} />
      {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article95() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "보험", "실손보험", "청구 방법"]}
      tags={["2026년 최신", "보험", "실손보험"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>5세대 실손보험 청구는 <B>실손24 앱</B>으로 병원에서 바로 전자청구 가능해요. 종이 서류 없이 스마트폰으로 몇 번 클릭하면 끝나요. 영수증·내역서·처방전 <B>3가지</B>만 있으면 돼요.</>}
      sourceBar={{ badge: "정책브리핑", name: "정책브리핑·실손24", date: "2024.10" }}
      stickyLabel="핵심 포인트"
      stickyValue="실손24 전자청구"
      stickyBtn="내 준비 확인"
      disclaimer="이 글은 실손24·정책브리핑 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🛡️", title: "5세대 실손보험 허브", sub: "보장·보험료·갈아타기 전체 정리", href: "/w/5세대-실손보험", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "5세대 실손보험 자기부담금", cat: "보험·실손", href: "/w/5세대-실손보험-자기부담금" },
          { title: "5세대 실손보험 보장 내용", cat: "보험·실손", href: "/w/5세대-실손보험-보장-내용" },
          { title: "5세대 실손보험 중복 가입", cat: "보험·실손", href: "/w/5세대-실손보험-중복-가입" },
          { title: "5세대 실손보험 4세대 차이", cat: "보험·실손", href: "/w/5세대-실손보험-4세대-차이" },
          { title: "5세대 실손보험 보험료 비교", cat: "보험·실손", href: "/w/5세대-실손보험-보험료-비교" },
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
        { t: "내 청구 준비 끝났을까?", sub: "앱 설치 · 서류 준비 · 청구 기간" },
        { t: "보험금은 어떻게 청구하나요?", sub: "전자청구 3단계 · 대리청구 · 우편·팩스 방법" },
        { t: "실손24 앱으로 바로 청구할 수 있나요?", sub: "앱 설치 · 병원 연동 · 자동 전송 구조" },
        { t: "청구할 때 서류는 뭐가 필요한가요?", sub: "필수 서류 3가지 · 10만원 기준 · 추가 서류" },
        { t: "청구 기간이 지나면 못 받나요?", sub: "소멸시효 3년 · 기산일 기준 · 예외 상황" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="내 청구 준비 끝났을까?" sub="앱 설치 · 서류 준비 · 청구 기간">
        <CheckerShell title="청구 준비가 다 됐는지 점검해 볼까요?" sub="30초 확인" desc="4가지만 선택하면 바로 확인돼요.">
          <CheckerQ n="1" label="실손24 앱을 설치하셨나요?" group="appInstall"
            opts={[["installed","네, 설치했어요"],["notInstalled","아직이에요"],["unknown","모르겠어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="청구 서류가 준비됐나요?" group="documents"
            opts={[["ready","영수증·내역서 있어요"],["notReady","아직 없어요"],["auto","전자청구로 자동 전송"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="치료받은 지 얼마나 됐나요?" group="claimTiming"
            opts={[["within3y","3년 이내"],["over3y","3년 넘었어요"],["recent","최근 치료"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="어떤 방식으로 청구하고 싶으세요?" group="claimType"
            opts={[["app","실손24 앱"],["manual","직접 서류 제출"],["proxy","가족 대리청구"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="청구하기 전에 내가 얼마나 받을 수 있는지 궁금하시죠?"
        a="5세대는 비급여 자기부담이 50%예요. 치료비에 따라 수령액이 달라져요."
        label="수령액 확인"
        href="/w/5세대-실손보험-자기부담금"
      />

      <Divider />

      {/* ───── SECTION 02: 청구 방법 ───── */}
      <Sec n="SECTION 02" id="claim-method" title="보험금은 어떻게 청구하나요?" sub="전자청구 3단계 · 대리청구 · 우편·팩스 방법">
        <P>5세대 실손보험 청구 방법은 4세대와 동일해요. 2024년 10월부터 <A href="https://www.korea.kr/news/policyNewsView.do?newsId=148935501">실손보험 청구 전산화</A>가 시행되면서, <B>실손24 앱</B>으로 병원에서 종이 서류 없이 바로 보험사에 전송할 수 있어요.</P>
        <P>앱 사용이 어려운 분은 기존 방식도 그대로 가능해요. 보험사 앱이나 홈페이지에서 직접 서류를 업로드하거나, 우편·팩스로 종이 서류를 보내는 방법이에요. 가족이 대신 청구하는 대리청구도 가능해요.</P>
        <P>청구 후 보험금 지급까지는 평균 <B>3~7일</B>이 걸려요. 서류에 문제가 없으면 대부분 일주일 안에 입금돼요. 10만원 이하 소액 진료비는 간소화된 서류로 빠르게 처리돼요.</P>

        <Steps items={[
          { title: "진료 후 영수증 확인", desc: "진료비 영수증과 세부내역서를 병원에서 받아요. 실손24 앱 전자청구 시에는 자동 전송돼요." },
          { title: "실손24 앱에서 청구 신청", desc: "앱을 열고 '보험금 청구' 메뉴에서 진료 내역을 확인하고 청구 버튼을 누르면 돼요." },
          { title: "보험사 심사 및 지급", desc: "보험사가 서류를 검토하고, 문제 없으면 3~7일 안에 등록된 계좌로 입금돼요." },
        ]} />

        <InlineLink icon="📱" title="실손24 앱 상세 사용법" desc="설치부터 청구까지 화면별 안내" href="https://www.silson24.or.kr" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 실손24 앱 ───── */}
      <Sec n="SECTION 03" id="silson24-app" title="실손24 앱으로 바로 청구할 수 있나요?" sub="앱 설치 · 병원 연동 · 자동 전송 구조">
        <P>네, <A href="https://www.silson24.or.kr">실손24 앱</A>을 쓰면 병원에서 종이 서류를 따로 뗄 필요가 없어요. 진료가 끝나면 병원의 진료 데이터가 앱을 통해 보험사로 자동 전송되는 구조예요. 앱스토어에서 '실손24'를 검색해서 설치하면 돼요.</P>
        <P>다만 모든 병원이 전자청구를 지원하는 건 아니에요. 상급종합병원이나 종합병원은 대부분 연동돼 있지만, 동네 소규모 의원 중에는 아직 미전산인 곳도 있어요. 이런 경우 기존 방식으로 직접 서류를 제출하면 돼요.</P>
        <P>대리청구도 가능해요. 고령의 부모님이나 미성년 자녀 대신 가족이 앱에서 청구할 수 있어요. 행정안전부 공공마이데이터로 가족관계를 확인해서 대리인 등록을 하면 돼요.</P>

        <H3>전자청구와 수동 청구 비교</H3>
        <table><thead><tr><THL>구분</THL><TH>실손24 전자청구</TH><TH>수동 청구 (기존 방식)</TH></tr></thead><tbody>
          {[
            ["서류 준비", "자동 전송 (별도 준비 불필요)", "영수증·내역서 직접 발급"],
            ["청구 방법", "앱에서 클릭", "보험사 앱/우편/팩스"],
            ["대상 병원", "전산화 완료 병원", "모든 병원"],
            ["처리 속도", "3~5일", "5~7일"],
            ["대리청구", "가능 (공공마이데이터)", "가능 (위임장 필요)"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*병원별 전산화 여부는 실손24 앱에서 확인 가능</TableNote>

        <Info type="warn">{"실손24 앱에서 <strong>본인 인증</strong>이 필요해요. 공인인증서·카카오인증 등 전자서명 수단을 미리 준비해 두세요."}</Info>

        <InlineLink icon="🏥" title="보장 내용 확인" desc="5세대 보장 항목 전체 확인" href="/w/5세대-실손보험-보장-내용" />
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

      {/* ───── SECTION 04: 필요 서류 ───── */}
      <Sec n="SECTION 04" id="required-docs" title="청구할 때 서류는 뭐가 필요한가요?" sub="필수 서류 3가지 · 10만원 기준 · 추가 서류">
        <P>기본적으로 <B>진료비 영수증, 진료비 세부내역서, 처방전</B> 3가지가 필요해요. 약을 처방받지 않았다면 처방전은 생략해도 돼요. 실손24 앱 전자청구를 쓰면 이 서류들이 병원에서 보험사로 자동 전송되니까 따로 뗄 필요가 없어요.</P>
        <P>진료비가 <B>10만원 이하</B>인 소액 건은 영수증과 세부내역서만으로 청구 가능해요. 10만원을 넘으면 보험사에서 진단서 같은 추가 서류를 요구할 수 있어요. 특히 입원이나 수술의 경우 진단서·수술확인서가 추가로 필요해요.</P>
        <P>중복 가입한 경우에는 모든 보험사에 동시에 청구해야 해요. 한 곳에만 청구하면 나머지 보험사 몫을 못 받을 수 있어요. 실손24 앱에서는 여러 보험사에 한 번에 청구하는 기능을 지원해요.</P>

        <TableTitle>청구 시 필요한 서류</TableTitle>
        <table><thead><tr><THL>서류</THL><TH>필요 여부</TH><TH>발급처</TH></tr></thead><tbody>
          {[
            ["진료비 영수증", "필수", "병원 수납창구"],
            ["진료비 세부내역서", "필수", "병원 수납창구"],
            ["처방전", "약 처방 시", "진료실"],
            ["진단서", "10만원 초과 시", "진료실 (비용 발생)"],
            ["수술확인서", "수술 시", "진료실 (비용 발생)"],
            ["통장 사본", "첫 청구 시", "본인 소지"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*실손24 전자청구 시 영수증·내역서는 자동 전송</TableNote>

        <BridgeCard
          q="중복 가입인데 여러 보험사에 동시 청구하려면?"
          a="실손24 앱에서 한 번에 여러 보험사에 청구할 수 있어요. 수동 청구 시에는 각 보험사에 따로 신청해야 해요."
          label="중복 청구"
          href="/w/5세대-실손보험-중복-가입"
        />
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 소멸시효 ───── */}
      <Sec n="SECTION 05" id="claim-deadline" title="청구 기간이 지나면 못 받나요?" sub="소멸시효 3년 · 기산일 기준 · 예외 상황">
        <P>원칙적으로 치료를 받은 날로부터 <B>3년</B> 안에 청구해야 해요. 상법 제662조에 따른 보험금 청구권 소멸시효예요. 3년이 지나면 보험사가 지급을 거절할 수 있어요.</P>
        <P>소멸시효 기산일은 '보험금 청구 사유가 발생한 날'이에요. 통원 치료는 진료받은 당일, 입원은 퇴원일이 기산일이에요. 예를 들어 2026년 3월 1일에 진료받았다면 2029년 3월 1일까지 청구해야 해요.</P>
        <P>다만 치료가 끝나지 않아서 최종 치료비가 확정되지 않은 경우에는 시효가 연장될 수 있어요. 장기 입원이나 연속 치료 중이라면 치료 종료 시점부터 3년이 기산돼요. 시효가 임박했다면 가능한 빨리 청구하는 게 안전해요.</P>

        <Info type="warn">{"소멸시효 <strong>3년</strong>은 생각보다 빨리 지나가요. 치료받으면 바로 청구하는 습관을 들이는 게 좋아요. 특히 소액 진료비는 깜빡하기 쉬워요."}</Info>

        <H3>자주 놓치는 상황</H3>
        <P>가장 많이 놓치는 게 소액 진료비예요. 1~2만원짜리 감기 진료비를 모아두다가 시효가 지나는 경우가 많아요. 실손24 앱을 쓰면 진료 직후 바로 청구할 수 있어서 이런 실수를 줄일 수 있어요.</P>
        <P>또 하나는 입원 중 청구를 깜빡하는 경우예요. 장기 입원 시에는 중간에 한 번씩 청구(중간 청구)하는 게 좋아요. 퇴원 후에 한꺼번에 하려면 서류도 복잡하고 누락 위험이 있어요.</P>

        <SpokeLink num="01" title="자기부담금 계산 상세" desc="내 치료비 기준 수령액 확인" href="/w/5세대-실손보험-자기부담금" />
        <SpokeLink num="02" title="4세대 5세대 보장 차이" desc="청구 가능 항목 비교" href="/w/5세대-실손보험-4세대-차이" />

        <ExtBtn badge="실손24 공식" text="실손보험 전자청구 시작" cta="신청하기 →" href="https://www.silson24.or.kr" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="4세대 차이 · 미전산 병원">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "5세대 실손보험 자기부담금", desc: "내 치료비 기준 부담 금액", href: "/w/5세대-실손보험-자기부담금" },
        { title: "5세대 실손보험 보장 내용", desc: "보장 항목 전체 확인", href: "/w/5세대-실손보험-보장-내용" },
        { title: "5세대 실손보험 4세대 차이", desc: "보장 범위 상세 비교표", href: "/w/5세대-실손보험-4세대-차이" },
        { title: "5세대 실손보험 중복 가입", desc: "중복 청구 방법 안내", href: "/w/5세대-실손보험-중복-가입" },
        { title: "5세대 실손보험 보험료 비교", desc: "연령별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
      ]} />
      <PrevNext
        prev={{ title: "5세대 실손보험 보험료 비교", href: "/w/5세대-실손보험-보험료-비교" }}
        next={{ title: "5세대 실손보험 가입 조건", href: "/w/5세대-실손보험-가입-조건" }}
      />
    </BlogLayout>
  );
}
