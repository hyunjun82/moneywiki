"use client";

import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn, Steps,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 실업신고 방법 | 고용24 온라인 접수 수급자격 신청",
  description: "실업급여 실업신고는 수급자격 인정신청과 같은 말이에요. 워크넷 구직 등록 후 고용24에서 온라인으로 신청할 수 있고, 신청일로부터 약 2~3주 내에 첫 입금이 돼요.",
  category: "실업급여",
  keywords: ["실업급여 실업신고 방법", "수급자격 인정신청 온라인", "실업신고 서류 준비 목록", "실업신고 후 처리 기간"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "실업신고 = 수급자격 인정신청 (고용보험 실업급여 최초 신청 단계)",
    "워크넷 구직 등록 후 고용24에서 온라인으로 신청 가능해요",
    "신청 후 5~7 영업일 내 인정 결과 문자 발송, 이후 7일 대기기간 시작",
  ],
  sources: [
    { name: "고용24 실업급여 안내", url: "https://www.ei.go.kr/ei/eih/cm/hm/main.do", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 실업신고와 수급자격 인정신청은 같은 건가요?", a: "사실상 같은 말이에요. '실업신고'는 고용센터에 실업 상태를 신고하는 행위이고, '수급자격 인정신청'은 그 절차의 공식 명칭이에요. 워크넷 구직 등록 후 고용24나 고용센터에서 신청하면 돼요." },
    { q: "실업급여 실업신고 후 얼마나 기다려야 첫 입금이 되나요?", a: "수급자격 인정신청 후 5~7 영업일 내 결과가 통보돼요. 인정이 나면 7일 대기기간 후 첫 실업인정 신청을 하고, 2~3 영업일 내에 입금돼요. 총 약 2~3주가 소요돼요." },
  ],
  ctaCard: {
    label: "지금 신청",
    mainText: "고용24에서 실업신고(수급자격 인정신청) 하기",
    subText: "퇴직 다음 날부터 신청 가능해요",
    url: "https://www.ei.go.kr/ei/eih/cm/hm/main.do",
    external: true,
  },
  relatedDocs: [{ title: "실업급여 신청 방법", url: "/w/실업급여-신청방법" }],
};

type Q1 = "involuntary" | "voluntary";
type Q2 = "registered" | "not_registered";
type Q3 = "docs_ready" | "no_docs";
type Q4 = "online" | "visit";

function getResult(q1: Q1 | "", q2: Q2 | "", q3: Q3 | "", q4: Q4 | "") {
  if (!q1 || !q2 || !q3 || !q4) return null;
  if (q1 === "voluntary") {
    return {
      pass: false,
      title: "자발적 퇴직은 원칙적으로 실업급여 대상이 아니에요",
      desc: "실업신고(수급자격 인정신청)를 해도 자발적 퇴직은 수급자격이 인정되지 않아요. 정당한 자발적 퇴직 사유가 있으면 예외 인정을 받을 수 있어요.",
      links: [
        { icon: "📋", title: "자발적 퇴직 정당사유 확인", desc: "임금삭감·괴롭힘 등 예외 사유 안내", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
      ],
    };
  }
  if (q2 === "not_registered") {
    return {
      pass: true,
      title: "워크넷 구직 등록이 먼저예요",
      desc: "실업신고 전 워크넷(www.work.go.kr)에 구직 등록을 해야 해요. 등록 후 고용24에서 수급자격 인정신청을 진행하세요.",
      links: [
        { icon: "📋", title: "실업신고 전체 절차", desc: "워크넷 등록부터 수급까지 순서", href: "/w/실업급여-신청방법" },
        { icon: "📂", title: "구비서류 준비하기", desc: "이직확인서·사직서 등 서류 목록", href: "/w/실업급여-구비서류" },
      ],
    };
  }
  if (q3 === "no_docs") {
    return {
      pass: true,
      title: "이직확인서 발급이 먼저 필요해요",
      desc: "전 직장에서 이직확인서를 발급받아야 실업신고가 가능해요. 발급 요청 후 고용24에서 서류 업로드로 신청하세요.",
      links: [
        { icon: "📂", title: "구비서류 전체 목록", desc: "이직확인서·신분증 등 제출 서류", href: "/w/실업급여-구비서류" },
      ],
    };
  }
  return {
    pass: true,
    title: q4 === "online" ? "고용24 온라인으로 실업신고 가능해요" : "고용센터 방문으로 실업신고 가능해요",
    desc: q4 === "online"
      ? "고용24(www.ei.go.kr)에서 수급자격 인정신청서를 작성하고 이직확인서를 업로드하면 돼요. 5~7 영업일 내 결과가 문자로 와요."
      : "가까운 고용센터를 방문해 수급자격 인정신청서와 서류를 제출하세요. 당일 접수가 가능해요.",
    links: [
      { icon: "🏢", title: "고용24 실업신고 바로가기", desc: "온라인 수급자격 인정신청 링크", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do" },
      { icon: "📅", title: "신청 기한 확인", desc: "퇴직 후 12개월 이내 접수 기한", href: "/w/실업급여-신청기간" },
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
        { icon: "📋", title: "고용24 실업신고(수급자격 신청)", sub: "온라인으로 바로 신청하기", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do", hot: true },
        { icon: "📂", title: "실업급여 구비서류", sub: "제출 서류 목록 전체 안내", href: "/w/실업급여-구비서류" },
        { icon: "💰", title: "실업급여 수급액 계산", sub: "30초 내 예상 금액 확인", href: "/w/실업급여-계산기" },
      ]} />
      <SidebarDocs items={[
        { title: "실업급여 신청 방법", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
        { title: "실업급여 신청기간 기한", cat: "실업급여·신청", href: "/w/실업급여-신청기간" },
        { title: "실업급여 구비서류", cat: "실업급여·서류", href: "/w/실업급여-구비서류" },
        { title: "실업급여 대기기간", cat: "실업급여·수급", href: "/w/실업급여-대기기간" },
        { title: "피보험기간 180일 계산", cat: "실업급여·자격", href: "/w/실업급여-피보험기간-180일-계산" },
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
      breadcrumb={["홈", "실업급여", "신청방법", "실업신고"]}
      tags={["2026년 최신", "실업급여", "실업신고", "수급자격신청"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>실업급여 <B>실업신고</B>는 수급자격 인정신청의 다른 이름이에요. 워크넷 구직 등록 후 <B>고용24</B>에서 온라인으로 신청할 수 있어요. 신청 후 약 <B>2~3주</B> 내에 첫 실업급여가 입금돼요.</>}
      sourceBar={{ badge: "고용24", name: "수급자격 인정신청 안내", date: "2026.02" }}
      stickyLabel="처리 기간"
      stickyValue="신청 후 약 2~3주"
      stickyBtn="지금 신청하기"
      disclaimer="이 글은 고용보험법 및 고용노동부 공개 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 개인별 상황에 따라 처리 기간이 다를 수 있어요."
      sidebar={sidebar}
    >
      <TOC items={[
        { n: "01", t: "실업신고 준비 상황 확인", sub: "퇴직 사유 · 구직 등록 여부" },
        { n: "02", t: "실업급여 실업신고 방법이 온라인으로 가능한가요?", sub: "고용24 신청 · 워크넷 구직 등록" },
        { n: "03", t: "실업급여 실업신고 전 준비할 서류가 무엇인가요?", sub: "이직확인서 · 구비서류 목록" },
        { n: "04", t: "실업급여 실업신고 후 처리 기간이 얼마나 걸리나요?", sub: "심사 기간 · 첫 입금 시기" },
        { n: "05", t: "실업급여 실업신고를 안 하면 어떻게 되나요?", sub: "유효기간 소멸 · 늦은 신고 손해" },
        { n: "FAQ", t: "자주 묻는 질문", sub: "실업신고 vs 수급자격 신청 · 처리 기간" },
      ]} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 — 체커 */}
      <Sec n="01" id="checker" title="실업신고 준비 상황 확인" sub="퇴직 사유 · 구직 등록 여부">
        <CheckerShell
          title="내 상황에서 실업신고가 바로 가능할까?"
          subtitle="30초 확인"
          intro="퇴직 사유와 준비 상황을 선택하면 맞춤 안내를 드려요."
        >
          <CheckerQ
            n={1}
            group="q1"
            label="퇴직 사유는 무엇인가요?"
            opts={[
              ["involuntary", "비자발적 퇴직 (권고사직·계약만료 등)"],
              ["voluntary", "자발적 퇴직"],
            ]}
            sel={q1}
            pick={(v) => setQ1(v as Q1)}
          />
          <CheckerQ
            n={2}
            group="q2"
            label="워크넷 구직 등록을 했나요?"
            opts={[
              ["registered", "예, 등록 완료했어요"],
              ["not_registered", "아직 안 했어요"],
            ]}
            sel={q2}
            pick={(v) => setQ2(v as Q2)}
          />
          <CheckerQ
            n={3}
            group="q3"
            label="이직확인서를 발급받았나요?"
            opts={[
              ["docs_ready", "예, 발급받았어요"],
              ["no_docs", "아직 발급 못 받았어요"],
            ]}
            sel={q3}
            pick={(v) => setQ3(v as Q3)}
          />
          <CheckerQ
            n={4}
            group="q4"
            label="신청 방법은 어떻게 할 예정인가요?"
            opts={[
              ["online", "고용24 온라인 신청"],
              ["visit", "고용센터 방문 신청"],
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
      <Sec n="02" id="how" title="실업급여 실업신고 방법이 온라인으로 가능한가요?" sub="고용24 신청 · 워크넷 구직 등록">
        <P>실업신고는 <B>고용24(www.ei.go.kr)</B>에서 온라인으로 가능해요. 정식 명칭은 '수급자격 인정신청'이에요. 실업신고와 수급자격 인정신청은 같은 의미로, 처음으로 실업급여를 신청하는 단계예요.</P>
        <P>온라인 신청 전 <B>워크넷(www.work.go.kr)</B>에 구직 등록을 먼저 해야 해요. 워크넷과 고용24가 연동되기 때문에 구직 등록 없이는 수급자격 인정신청이 진행되지 않아요. 구직 등록은 5분 내 완료할 수 있어요.</P>
        <P>고용센터 방문 신청도 가능해요. 신청서를 작성하고 서류를 제출하면 당일 접수가 돼요. 온라인 신청이 어렵거나 서류 문제가 있으면 방문하는 게 좋아요. 전국 100개 이상의 고용센터에서 처리 가능해요.</P>
        <P>아래 단계 순서대로 따라가면 돼요. 퇴직 직후 빨리 시작할수록 소정급여일수를 최대한 활용할 수 있어요.</P>

        <Steps items={[
          { title: "워크넷 구직 등록 (www.work.go.kr)", desc: "구직 신청서를 작성하고 구직 등록을 완료해요. 고용24와 자동 연동돼요." },
          { title: "이직확인서 확인", desc: "전 직장에서 고용보험 상실 신고 후 자동 발급돼요. 발급 여부는 고용24에서 확인할 수 있어요." },
          { title: "고용24에서 수급자격 인정신청 작성", desc: "www.ei.go.kr에서 신청서 작성 후 서류 업로드해요." },
          { title: "심사 결과 대기 (5~7 영업일)", desc: "고용센터에서 검토 후 문자로 결과가 통보돼요." },
          { title: "수급자격 인정 후 7일 대기기간", desc: "대기기간 동안 구직 활동을 시작해요. 이후 4주마다 실업인정 신청을 해야 해요." },
        ]} />

        <SpokeLink num={1} title="실업급여 신청 방법 전체 안내" desc="수급자격 신청부터 수급 완료까지 전체 절차" href="/w/실업급여-신청방법" />
        <InlineLink
          icon="📅"
          title="실업급여 신청기간 기한"
          desc="퇴직 후 12개월 이내 접수 기한 및 늦은 신청 주의사항"
          href="/w/실업급여-신청기간"
        />
      </Sec>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="docs" title="실업급여 실업신고 전 준비할 서류가 무엇인가요?" sub="이직확인서 · 구비서류 목록">
        <P>실업신고 시 가장 중요한 서류는 <B>이직확인서</B>예요. 전 직장이 고용보험 상실 신고를 하면 시스템에 자동으로 등록돼요. 신고가 늦으면 전 직장에 요청하거나 고용센터에 신고를 요청할 수 있어요.</P>
        <P>이직확인서 외에 <B>신분증</B>과 <B>통장 사본</B>이 기본으로 필요해요. 자발적 퇴직이나 특수 사유(임금 미지급, 직장 내 괴롭힘 등)의 경우 추가 증빙 서류가 요청될 수 있어요.</P>
        <P>온라인 신청의 경우 서류를 파일로 업로드하면 돼요. 스마트폰으로 찍어서 PDF나 이미지로 제출할 수 있어요. 서류가 불명확하면 고용센터에서 추가 제출을 요구할 수 있어요.</P>
        <P>서류 준비가 어렵거나 헷갈린다면 고용센터 상담을 받으세요. 전화(1350) 또는 방문 상담으로 빠르게 안내받을 수 있어요.</P>

        <TableTitle>실업신고 기본 구비서류</TableTitle>
        <TH cols={["서류", "발급처", "비고"]} rows={[
          ["이직확인서", "전 직장 (고용보험 시스템 자동)", "미발급 시 고용센터 요청 가능"],
          ["신분증", "본인 (주민등록증/운전면허증)", "사본 또는 파일 업로드 가능"],
          ["통장 사본", "본인 명의 은행 계좌", "실업급여 입금 계좌"],
          ["수급자격 인정신청서", "고용24 또는 고용센터", "온라인 작성 후 제출"],
        ]} />
        <TableNote>* 상황에 따라 추가 서류 요청 가능해요.</TableNote>

        <InlineLink
          icon="📂"
          title="실업급여 구비서류 전체 안내"
          desc="자발적 퇴직·특수 사유 등 상황별 추가 서류 목록"
          href="/w/실업급여-구비서류"
        />
      </Sec>

      <RelatedMid
        title="실업급여 신청 관련 글 모아봤어요"
        items={[
          { icon: "📋", title: "실업급여 신청 방법 전체 절차", desc: "고용24 온라인 신청 단계별 안내", href: "/w/실업급여-신청방법" },
          { icon: "📂", title: "실업급여 구비서류", desc: "제출 서류 목록 전체 안내", href: "/w/실업급여-구비서류" },
          { icon: "📅", title: "실업급여 신청기간 기한", desc: "퇴직 후 12개월 이내 접수 기한", href: "/w/실업급여-신청기간" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="timeline" title="실업급여 실업신고 후 처리 기간이 얼마나 걸리나요?" sub="심사 기간 · 첫 입금 시기">
        <P>수급자격 인정신청(실업신고) 후 <B>5~7 영업일</B> 내에 고용센터에서 심사가 완료돼요. 결과는 문자 메시지로 통보돼요. 서류 미비나 추가 확인이 필요하면 더 걸릴 수 있어요.</P>
        <P>수급자격이 인정되면 <B>7일 대기기간</B>이 시작돼요. 대기기간 동안은 실업급여가 지급되지 않아요. 단, 퇴직 사유가 비자발적임이 명확한 경우 대기기간 없이 바로 수급이 시작되는 예외도 있어요.</P>
        <P>7일 대기기간 후 <B>첫 실업인정 신청</B>을 하면 2~3 영업일 내에 실업급여가 입금돼요. 총 처리 시간은 신청일로부터 약 2~3주예요. 신청이 빠를수록 첫 입금도 빨라요.</P>
        <P>이후 4주마다 실업인정 신청을 반복해야 해요. 구직 활동 내역을 제출하고 인정받아야 실업급여가 계속 지급돼요. 고용24 앱이나 웹사이트에서 모바일로도 가능해요.</P>

        <Info type="warn">
          <B>실업신고 후 수급자격 인정일 공지를 꼭 확인하세요</B><br />
          수급자격이 인정되면 고용센터에서 첫 실업인정일(출석일)을 지정해요. 이 날짜를 놓치면 해당 기간 실업급여가 지급되지 않을 수 있어요. 문자와 고용24 앱에서 일정을 확인하세요.
        </Info>
      </Sec>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="no-report" title="실업급여 실업신고를 안 하면 어떻게 되나요?" sub="유효기간 소멸 · 늦은 신고 손해">
        <P>실업신고를 하지 않으면 퇴직 후 <B>12개월이 지났을 때 수급 자격이 소멸</B>돼요. 소정급여일수가 270일이어도 신고 없이 12개월이 지나면 한 푼도 받지 못해요. 놓친 기간은 돌려받을 수 없어요.</P>
        <P>늦게 신고할수록 실질적으로 손해예요. 6개월 후에 신고하면 남은 유효기간이 6개월밖에 없어요. 소정급여일수가 270일이어도 180일밖에 받지 못해요. 퇴직 직후 빨리 신고하는 게 유리해요.</P>
        <P>질병·육아 등 정당한 사유가 있으면 실업신고를 늦게 하더라도 수급기간 연장 신청이 가능해요. 사유 발생일로부터 <B>30일 이내</B>에 고용센터에 연장 신청을 해야 해요. 기한을 넘기면 연장도 안 돼요.</P>
        <P>모르고 지나쳤다는 이유만으로는 구제가 어렵기 때문에 퇴직 직후 바로 실업신고(수급자격 인정신청) 절차를 시작하는 게 가장 중요해요.</P>

        <BridgeCard
          q="대기기간 7일 동안 특별 수당을 받을 수 있는 예외가 있나요?"
          a="특정 사유로 즉시 수급 가능한 경우가 있어요. 대기기간 예외 조건을 알아보세요."
          label="실업급여 대기기간 안내"
          href="/w/실업급여-대기기간"
        />

        <SpokeLink num={2} title="실업급여 수급기간 연장 조건" desc="질병·육아 등 사유별 최대 4년 연장 방법" href="/w/실업급여-수급기간-몇개월-받나요" />

        <ExtBtn
          badge="고용24 공식"
          text="실업신고(수급자격 인정신청) 바로가기"
          cta="신청하기 →"
          href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 신청 방법 전체 절차", href: "/w/실업급여-신청방법" },
        { title: "실업급여 신청기간 기한 안내", href: "/w/실업급여-신청기간" },
        { title: "실업급여 구비서류 전체 안내", href: "/w/실업급여-구비서류" },
        { title: "실업급여 대기기간 7일 안내", href: "/w/실업급여-대기기간" },
        { title: "실업급여 지급일 첫 입금일", href: "/w/실업급여-지급일-첫-입금일-대기기간" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 신청 방법 전체 절차", href: "/w/실업급여-신청방법" }}
        next={{ title: "실업급여 실업인정 특례 안내", href: "/w/실업급여-실업인정-특례" }}
      />
    </BlogLayout>
  );
}
