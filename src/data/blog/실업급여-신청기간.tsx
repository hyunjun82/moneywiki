// @ts-nocheck
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
  title: "실업급여 신청기간 기한 안내 | 퇴직 후 12개월 이내 접수 시기",
  description: "실업급여 신청기간은 퇴직일 다음 날부터 시작해 12개월 이내예요. 늦게 신청할수록 실제 받을 수 있는 기간이 줄어드니 퇴직 직후 최대한 빨리 접수하는 게 유리해요.",
  category: "실업급여",
  keywords: ["실업급여 신청기간 기한", "퇴직 후 실업급여 접수 시기", "실업급여 신청기간 놓쳤을 때", "신청기간 내 준비 서류"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "실업급여 신청기간은 퇴직 다음 날부터 12개월 이내 (이 기간이 지나면 수급 불가)",
    "늦게 신청할수록 소정급여일수 중 실제로 받을 수 있는 기간이 줄어들어요",
    "퇴직 후 워크넷 구직 등록 → 수급자격 인정신청 순서로 빠르게 진행해야 해요",
  ],
  sources: [
    { name: "고용보험법 제48조", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 신청기간을 놓치면 어떻게 되나요?", a: "퇴직일로부터 12개월이 지나면 남은 소정급여일수가 있어도 더 이상 실업급여를 받을 수 없어요. 단, 질병·육아 등 정당한 사유가 있으면 수급기간 연장 신청을 통해 구제받을 수 있어요." },
    { q: "실업급여는 퇴직 후 언제 신청하는 게 가장 좋나요?", a: "퇴직 다음 날부터 신청이 가능해요. 가장 빠르게 신청할수록 소정급여일수를 온전히 활용할 수 있어요. 퇴직 후 1~2주 내에 고용센터를 방문하거나 고용24 온라인으로 신청하는 게 이상적이에요." },
  ],
  ctaCard: {
    label: "지금 신청",
    mainText: "실업급여 신청 기간 놓치지 마세요",
    subText: "퇴직 다음 날부터 신청 가능해요",
    url: "https://www.ei.go.kr/ei/eih/cm/hm/main.do",
    external: true,
  },
  relatedDocs: [{ title: "실업급여 신청 방법", url: "/w/실업급여-신청방법" }],
};

type Q1 = "under1m" | "1-3m" | "3-6m" | "over6m";
type Q2 = "involuntary" | "voluntary";
type Q3 = "yes" | "no";
type Q4 = "docs_ready" | "docs_not";

function getResult(q1: Q1 | "", q2: Q2 | "", q3: Q3 | "", q4: Q4 | "") {
  if (!q1 || !q2 || !q3 || !q4) return null;
  if (q2 === "voluntary") {
    return {
      pass: false,
      title: "자발적 퇴직은 원칙적으로 실업급여 대상이 아니에요",
      desc: "실업급여는 비자발적 퇴직이어야 수급할 수 있어요. 임금 미지급·직장 내 괴롭힘 등 정당한 사유가 있으면 예외가 가능해요.",
      links: [
        { icon: "📋", title: "자발적 퇴직 정당사유 확인", desc: "임금삭감·괴롭힘 등 예외 사유 안내", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
      ],
    };
  }
  if (q1 === "over6m") {
    return {
      pass: true,
      title: "아직 신청 가능하지만 서둘러야 해요",
      desc: "퇴직 후 6개월이 지났어도 12개월 이내면 신청이 가능해요. 단, 남은 유효기간 안에만 수급할 수 있으니 바로 신청하는 게 중요해요.",
      links: [
        { icon: "📋", title: "실업급여 신청 방법", desc: "고용24 온라인 신청 절차 전체", href: "/w/실업급여-신청방법" },
        { icon: "📂", title: "실업급여 구비서류", desc: "고용센터 제출 서류 목록", href: "/w/실업급여-구비서류" },
      ],
    };
  }
  if (q1 === "under1m") {
    return {
      pass: true,
      title: "지금 바로 신청하면 소정급여일수를 최대로 활용해요",
      desc: "퇴직 후 1개월 이내이면 가장 유리한 시기예요. 워크넷 구직 등록 → 수급자격 인정신청 → 실업인정 신청 순서로 진행하면 돼요.",
      links: [
        { icon: "📋", title: "실업급여 신청 방법", desc: "고용24 온라인 신청 절차 전체", href: "/w/실업급여-신청방법" },
        { icon: "📂", title: "실업급여 구비서류", desc: "고용센터 제출 서류 목록", href: "/w/실업급여-구비서류" },
      ],
    };
  }
  return {
    pass: true,
    title: "지금도 신청 가능해요. 빠르게 진행하는 게 유리해요",
    desc: "퇴직 후 1~6개월 이내면 소정급여일수를 충분히 활용할 수 있어요. 서류를 준비해 고용센터나 고용24를 통해 신청하세요.",
    links: [
      { icon: "📋", title: "실업급여 신청 방법", desc: "고용24 온라인 신청 절차 전체", href: "/w/실업급여-신청방법" },
      { icon: "📂", title: "실업급여 구비서류", desc: "고용센터 제출 서류 목록", href: "/w/실업급여-구비서류" },
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
        { icon: "📋", title: "실업급여 신청 방법", sub: "고용24 온라인 신청 절차", href: "/w/실업급여-신청방법", hot: true },
        { icon: "📂", title: "실업급여 구비서류", sub: "제출 서류 목록 전체 안내", href: "/w/실업급여-구비서류" },
        { icon: "💰", title: "실업급여 수급액 계산", sub: "30초 내 예상 금액 확인", href: "/w/실업급여-계산기" },
      ]} />
      <SidebarDocs items={[
        { title: "실업급여 신청 방법", cat: "실업급여·신청절차", href: "/w/실업급여-신청방법" },
        { title: "실업급여 구비서류", cat: "실업급여·서류", href: "/w/실업급여-구비서류" },
        { title: "실업급여 소정급여일수", cat: "실업급여·수급기간", href: "/w/실업급여-소정급여일수" },
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
      breadcrumb={["홈", "실업급여", "신청방법", "신청기간"]}
      tags={["2026년 최신", "실업급여", "신청기간", "접수기한"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>실업급여 신청기간은 <B>퇴직 다음 날부터 12개월</B>이에요. 늦게 신청할수록 실제 받는 기간이 줄어들어요. 퇴직 후 빠를수록 유리하니 워크넷 등록부터 시작하세요.</>}
      sourceBar={{ badge: "고용보험법", name: "제48조 수급기간", date: "2026.02" }}
      stickyLabel="신청 유효기간"
      stickyValue="퇴직 후 12개월"
      stickyBtn="지금 신청하기"
      disclaimer="이 글은 고용보험법 및 고용노동부 공개 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 개인별 상황에 따라 적용 내용이 다를 수 있어요."
      sidebar={sidebar}
    >
      <TOC items={[
        { n: "01", t: "신청 가능 여부 빠른 확인", sub: "퇴직 경과 기간 · 사유 확인" },
        { n: "02", t: "실업급여 신청기간 기한은 언제까지인가요?", sub: "퇴직 후 12개월 · 유효기간 개념" },
        { n: "03", t: "실업급여 신청기간이 늦을수록 불리한가요?", sub: "늦은 신청의 실제 손해 계산" },
        { n: "04", t: "실업급여 신청기간을 놓쳤을 때 어떻게 하나요?", sub: "연장 신청 · 구제 방법" },
        { n: "05", t: "실업급여 신청기간 내 준비할 서류는 무엇인가요?", sub: "이직확인서 · 구직 등록 순서" },
        { n: "FAQ", t: "자주 묻는 질문", sub: "기한 경과 · 빠른 신청 시기" },
      ]} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 — 체커 */}
      <Sec n="01" id="checker" title="신청 가능 여부 빠른 확인" sub="퇴직 경과 기간 · 사유 확인">
        <CheckerShell
          title="아직 실업급여 신청 기간 안에 있을까?"
          subtitle="30초 확인"
          intro="퇴직 후 경과 기간과 퇴직 사유를 선택하면 바로 알 수 있어요."
        >
          <CheckerQ
            n={1}
            group="q1"
            label="퇴직 후 얼마나 지났나요?"
            opts={[
              ["under1m", "1개월 미만 (최적 시기)"],
              ["1-3m", "1~3개월"],
              ["3-6m", "3~6개월"],
              ["over6m", "6개월 이상 (12개월 미만)"],
            ]}
            sel={q1}
            pick={(v) => setQ1(v as Q1)}
          />
          <CheckerQ
            n={2}
            group="q2"
            label="퇴직 사유는 무엇인가요?"
            opts={[
              ["involuntary", "비자발적 퇴직 (권고사직·계약만료 등)"],
              ["voluntary", "자발적 퇴직"],
            ]}
            sel={q2}
            pick={(v) => setQ2(v as Q2)}
          />
          <CheckerQ
            n={3}
            group="q3"
            label="피보험기간이 180일(약 6개월) 이상인가요?"
            opts={[
              ["yes", "예, 180일 이상이에요"],
              ["no", "아니요, 180일 미만이에요"],
            ]}
            sel={q3}
            pick={(v) => setQ3(v as Q3)}
          />
          <CheckerQ
            n={4}
            group="q4"
            label="이직확인서를 발급받았나요?"
            opts={[
              ["docs_ready", "예, 준비됐어요"],
              ["docs_not", "아니요, 아직이에요"],
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
      <Sec n="02" id="deadline" title="실업급여 신청기간 기한은 언제까지인가요?" sub="퇴직 후 12개월 · 유효기간 개념">
        <P>실업급여 신청기간은 <B>이직일(퇴직일)의 다음 날부터 12개월</B>이에요. 이 기간을 법에서는 <A href="https://www.law.go.kr/법령/고용보험법">"수급기간"</A>이라고 불러요. 12개월이 지나면 남은 소정급여일수가 있어도 실업급여를 더 이상 받을 수 없어요.</P>
        <P>예를 들어 2026년 1월 31일에 퇴직했다면, 신청기간은 <B>2026년 2월 1일부터 2027년 1월 31일까지</B>예요. 이 기간 안에 실업인정을 받은 날만 실업급여가 지급돼요. 기한을 넘기면 자동으로 소멸해요.</P>
        <P>수급기간(12개월)과 소정급여일수(120~270일)는 다른 개념이에요. 소정급여일수가 270일(9개월)이더라도 유효기간 12개월 안에 신청해 소진해야 해요. 늦게 신청할수록 실제 받을 수 있는 기간이 줄어들어요.</P>
        <P>퇴직 당일은 아직 고용된 상태로 처리돼서 신청이 안 돼요. <B>퇴직 다음 날부터</B> 고용센터 방문 또는 고용24 온라인으로 수급자격 인정신청이 가능해요. 빠를수록 유리한 구조예요.</P>

        <TableTitle>실업급여 신청기간 핵심 기준</TableTitle>
        <TH cols={["항목", "내용"]} rows={[
          ["신청 시작일", "이직일(퇴직일) 다음 날부터"],
          ["신청 마감일", "이직일로부터 12개월 이내"],
          ["기한 경과 시", "남은 소정급여일수 자동 소멸"],
          ["연장 가능 사유", "질병·육아·부상 등 (최대 4년)"],
        ]} />
        <TableNote>* 고용보험법 제48조 기준이에요.</TableNote>

        <InlineLink
          icon="📅"
          title="실업급여 수급기간 몇 개월인지 확인"
          desc="피보험기간·나이별 소정급여일수 기준표"
          href="/w/실업급여-수급기간-몇개월-받나요"
        />
        <SpokeLink num={1} title="실업급여 신청 방법" desc="고용24 온라인 신청 절차 전체 안내" href="/w/실업급여-신청방법" />
      </Sec>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="late" title="실업급여 신청기간이 늦을수록 불리한가요?" sub="늦은 신청의 실제 손해 계산">
        <P>늦게 신청할수록 실제 손해가 발생해요. 소정급여일수가 180일이어도 퇴직 후 6개월 뒤에 신청하면 남은 유효기간이 6개월밖에 없어요. 실제로 받을 수 있는 일수가 180일에서 크게 줄어들 수 있어요.</P>
        <P>신청이 늦어지면 대기기간 7일도 늦게 시작돼요. 수급자격 인정 후 <B>7일 대기기간</B>이 지나야 실업인정을 받기 시작하는데, 이 기간도 유효기간 안에 포함돼요. 대기기간이 끝난 뒤부터 실제 수령이 시작돼요.</P>
        <P>구직 활동 실적 기준도 챙겨야 해요. 실업인정을 받으려면 4주마다 구직 활동 내역을 제출해야 해요. 너무 늦게 시작하면 인정 횟수가 줄어 실질적으로 받는 금액이 감소할 수 있어요.</P>
        <P>결론적으로 <B>퇴직 직후, 늦어도 1개월 내에 신청</B>하는 게 가장 유리해요. 서류가 준비 안 됐더라도 워크넷 구직 등록은 먼저 해두는 게 좋아요. 구직 등록 날짜가 실업인정 기준이 되는 경우가 있어요.</P>

        <Info type="warn">
          <B>대기기간 7일은 수급 기간에서 차감돼요</B><br />
          수급자격 인정 후 7일 대기기간 동안은 실업급여가 지급되지 않아요. 단, 이 7일은 소정급여일수에서는 차감되지 않아요. 유효기간(12개월)에는 포함되니 늦게 신청할수록 총 기간이 줄어요.
        </Info>
      </Sec>

      <RelatedMid
        title="실업급여 신청 관련 글 모아봤어요"
        items={[
          { icon: "📋", title: "실업급여 신청 방법", desc: "고용24 온라인 신청 절차 전체 안내", href: "/w/실업급여-신청방법" },
          { icon: "📂", title: "실업급여 구비서류", desc: "고용센터 제출 서류 목록", href: "/w/실업급여-구비서류" },
          { icon: "📅", title: "실업급여 대기기간 7일", desc: "대기기간 계산 및 수당 예외 안내", href: "/w/실업급여-대기기간" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="miss" title="실업급여 신청기간을 놓쳤을 때 어떻게 하나요?" sub="연장 신청 · 구제 방법">
        <P>퇴직 후 12개월이 지났다면 원칙적으로 실업급여를 받을 수 없어요. 하지만 <B>정당한 사유가 있으면 수급기간 연장 신청</B>이 가능해요. 연장 사유는 질병·부상·임신·출산·육아·배우자 간호 등이에요.</P>
        <P>연장 신청은 사유가 발생한 날로부터 <B>30일 이내</B>에 고용센터에 해야 해요. 의사 소견서, 출생증명서, 입원확인서 등 관련 서류를 준비해야 해요. 기한을 넘기면 연장도 불가능해요.</P>
        <P>실업급여를 받지 못한 채 12개월이 지났고 연장 사유도 없다면 구제 수단이 사실상 없어요. 다음 퇴직 시 새로 피보험기간을 쌓아 신청해야 해요. 이 경우 이전 피보험기간은 재활용할 수 없어요.</P>
        <P>신청기간은 엄격하게 적용돼요. 모르고 지나쳤다는 사유만으로는 연장이 인정되지 않아요. 퇴직 직후 신청기간과 절차를 미리 파악해 두는 게 중요해요.</P>

        <BridgeCard
          q="수급기간 연장 신청이 필요한 상황인가요?"
          a="질병·육아 등 사유가 있으면 고용센터에서 연장 신청이 가능해요."
          label="고용24 연장 신청 바로 가기"
          href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        />

        <InlineLink
          icon="📅"
          title="실업급여 수급기간 연장 조건"
          desc="질병·육아 사유별 최대 4년 연장 방법"
          href="/w/실업급여-수급기간-몇개월-받나요"
        />
      </Sec>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="docs" title="실업급여 신청기간 내 준비할 서류는 무엇인가요?" sub="이직확인서 · 구직 등록 순서">
        <P>신청기간 안에 필요한 서류를 빠르게 준비해야 해요. 핵심은 <B>이직확인서</B>예요. 전 직장이 고용보험 상실 신고를 하면 자동으로 생성되는데, 신고가 늦어지면 본인이 직접 요청해야 해요.</P>
        <P>신청 절차는 순서가 중요해요. 워크넷 구직 등록을 먼저 해야 이후 수급자격 인정신청이 가능해요. 온라인(고용24)으로도 대부분 처리할 수 있어요. 아래 순서를 참고하세요.</P>

        <Steps items={[
          { title: "워크넷(www.work.go.kr) 구직 등록", desc: "이직 후 가장 먼저 해야 해요. 고용24와 연동돼요." },
          { title: "수급자격 인정신청서 작성", desc: "고용24 또는 고용센터 방문 신청 가능해요." },
          { title: "이직확인서 확인", desc: "전 직장이 발급한 이직확인서가 고용보험 시스템에 등록돼 있어야 해요." },
          { title: "고용센터 방문 또는 온라인 제출", desc: "신분증, 수급자격 인정신청서, 이직확인서 등 지참해요." },
          { title: "수급자격 인정 후 7일 대기기간", desc: "대기기간 동안 구직 활동을 시작해요. 이후 실업인정 신청을 4주마다 진행해요." },
        ]} />

        <SpokeLink num={2} title="실업급여 구비서류 전체 목록" desc="이직확인서·사직서 등 제출 서류 상세 안내" href="/w/실업급여-구비서류" />

        <ExtBtn
          badge="고용24 공식"
          text="실업급여 수급자격 인정신청"
          cta="신청하기 →"
          href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 신청 방법과 절차", href: "/w/실업급여-신청방법" },
        { title: "실업급여 구비서류 전체 안내", href: "/w/실업급여-구비서류" },
        { title: "실업급여 대기기간 7일 안내", href: "/w/실업급여-대기기간" },
        { title: "실업급여 수급기간 몇 개월 받나요", href: "/w/실업급여-수급기간-몇개월-받나요" },
        { title: "피보험기간 180일 계산하기", href: "/w/실업급여-피보험기간-180일-계산" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 수급기간 몇 개월 받나요", href: "/w/실업급여-수급기간-몇개월-받나요" }}
        next={{ title: "실업급여 신청 방법과 절차", href: "/w/실업급여-신청방법" }}
      />
    </BlogLayout>
  );
}
