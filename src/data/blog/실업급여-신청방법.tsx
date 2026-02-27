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
  title: "실업급여 신청 방법 안내 | 고용24 온라인 단계별 신청 순서",
  description: "실업급여 신청 방법은 워크넷 구직 등록 → 수급자격 인정신청 → 실업인정 신청 순서예요. 고용24에서 대부분 온라인으로 처리할 수 있고, 퇴직 직후 빠르게 시작하는 게 유리해요.",
  category: "실업급여",
  keywords: ["실업급여 신청 방법 절차", "고용24 온라인 신청", "실업급여 신청 전 준비 서류", "실업급여 신청 후 수급 일정"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "실업급여 신청은 고용24 또는 고용센터 방문으로 가능해요",
    "순서: 워크넷 구직 등록 → 수급자격 인정신청 → 7일 대기 → 실업인정 신청",
    "신청 후 약 2~3주 내에 첫 실업급여가 입금돼요",
  ],
  sources: [
    { name: "고용24 실업급여 안내", url: "https://www.ei.go.kr/ei/eih/cm/hm/main.do", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 신청 방법은 온라인으로만 가능한가요?", a: "고용24(www.ei.go.kr)를 통해 대부분 온라인으로 신청할 수 있어요. 단, 처음 수급자격 인정신청 시 서류 제출이 필요한 경우 고용센터 방문이 필요할 수 있어요. 이후 실업인정 신청은 온라인으로 가능해요." },
    { q: "실업급여 신청 방법 중 가장 빠른 방법은 무엇인가요?", a: "워크넷(www.work.go.kr) 구직 등록을 가장 먼저 온라인으로 진행하고, 고용24에서 수급자격 인정신청을 바로 이어서 하는 게 가장 빠른 방법이에요. 서류는 사전에 이직확인서, 신분증을 준비하면 돼요." },
  ],
  ctaCard: {
    label: "지금 신청",
    mainText: "고용24에서 실업급여 신청하기",
    subText: "퇴직 다음 날부터 신청 가능해요",
    url: "https://www.ei.go.kr/ei/eih/cm/hm/main.do",
    external: true,
  },
  relatedDocs: [{ title: "실업급여 구비서류 안내", url: "/w/실업급여-구비서류" }],
};

type Q1 = "online" | "visit";
type Q2 = "involuntary" | "voluntary";
type Q3 = "docs_ready" | "no_docs";
type Q4 = "registered" | "not_registered";

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
  if (q4 === "not_registered") {
    return {
      pass: true,
      title: "워크넷 구직 등록이 먼저예요",
      desc: "실업급여 신청 전 워크넷(www.work.go.kr)에 구직 등록을 해야 해요. 등록 후 고용24에서 수급자격 인정신청을 진행하세요.",
      links: [
        { icon: "📋", title: "실업급여 신청 단계 전체", desc: "워크넷 등록부터 수급까지 순서", href: "/w/실업급여-신청방법" },
        { icon: "📂", title: "구비서류 준비하기", desc: "이직확인서·사직서 등 서류 목록", href: "/w/실업급여-구비서류" },
      ],
    };
  }
  if (q3 === "no_docs") {
    return {
      pass: true,
      title: "이직확인서 발급이 먼저 필요해요",
      desc: "전 직장에서 이직확인서를 발급받아야 해요. 발급이 안 된다면 고용센터에 신고할 수 있어요. 서류 준비 후 수급자격 인정신청을 진행하세요.",
      links: [
        { icon: "📂", title: "구비서류 전체 목록", desc: "이직확인서·신분증 등 제출 서류", href: "/w/실업급여-구비서류" },
        { icon: "📋", title: "고용24 신청 절차", desc: "온라인 신청 단계별 안내", href: "/w/실업급여-신청방법" },
      ],
    };
  }
  return {
    pass: true,
    title: q1 === "online" ? "고용24 온라인으로 신청할 수 있어요" : "고용센터 방문 신청이 필요해요",
    desc: q1 === "online"
      ? "워크넷 구직 등록 완료 후 고용24(www.ei.go.kr)에서 수급자격 인정신청을 하세요. 서류는 파일 업로드로 제출 가능해요."
      : "가까운 고용센터를 방문해 수급자격 인정신청서와 서류를 제출하세요. 당일 접수가 가능해요.",
    links: [
      { icon: "🏢", title: "고용24 실업급여 신청", desc: "온라인 수급자격 인정신청 바로가기", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do" },
      { icon: "📅", title: "신청기간 및 기한 확인", desc: "퇴직 후 12개월 이내 접수 기한", href: "/w/실업급여-신청기간" },
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
        { icon: "📋", title: "고용24 실업급여 신청", sub: "온라인 수급자격 인정신청", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do", hot: true },
        { icon: "📂", title: "실업급여 구비서류", sub: "제출 서류 목록 전체 안내", href: "/w/실업급여-구비서류" },
        { icon: "💰", title: "실업급여 수급액 계산", sub: "30초 내 예상 금액 확인", href: "/w/실업급여-계산기" },
      ]} />
      <SidebarDocs items={[
        { title: "실업급여 신청기간 기한", cat: "실업급여·신청", href: "/w/실업급여-신청기간" },
        { title: "실업급여 구비서류", cat: "실업급여·서류", href: "/w/실업급여-구비서류" },
        { title: "실업급여 대기기간", cat: "실업급여·수급", href: "/w/실업급여-대기기간" },
        { title: "실업급여 소정급여일수", cat: "실업급여·수급기간", href: "/w/실업급여-소정급여일수" },
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
      breadcrumb={["홈", "실업급여", "신청방법", "온라인 신청"]}
      tags={["2026년 최신", "실업급여", "신청방법", "고용24"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>실업급여 신청 방법은 <B>고용24 온라인</B>으로 대부분 처리할 수 있어요. 워크넷 구직 등록 → 수급자격 인정신청 → 7일 대기 → 실업인정 신청 순서로 진행하면 <B>약 2~3주 내</B>에 첫 입금이 돼요.</>}
      sourceBar={{ badge: "고용24", name: "실업급여 신청 안내", date: "2026.02" }}
      stickyLabel="첫 입금 시기"
      stickyValue="신청 후 약 2~3주"
      stickyBtn="온라인 신청하기"
      disclaimer="이 글은 고용보험법 및 고용노동부 공개 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 개인별 상황에 따라 처리 기간이 다를 수 있어요."
      sidebar={sidebar}
    >
      <TOC items={[
        { n: "01", t: "내 신청 방법 빠른 확인", sub: "온라인 vs 방문 · 서류 준비 여부" },
        { n: "02", t: "실업급여 신청 방법이 온라인으로 가능한가요?", sub: "고용24 신청 · 워크넷 구직 등록" },
        { n: "03", t: "실업급여 신청 전 준비할 것이 있나요?", sub: "이직확인서 · 구비서류 목록" },
        { n: "04", t: "실업급여 신청 후 수급까지 얼마나 걸리나요?", sub: "대기기간 7일 · 첫 입금 시기" },
        { n: "05", t: "실업급여 신청 후 실업인정은 어떻게 받나요?", sub: "구직 활동 · 4주마다 인정 신청" },
        { n: "FAQ", t: "자주 묻는 질문", sub: "온라인 신청 여부 · 가장 빠른 방법" },
      ]} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 — 체커 */}
      <Sec n="01" id="checker" title="내 신청 방법 빠른 확인" sub="온라인 vs 방문 · 서류 준비 여부">
        <CheckerShell
          title="내 상황에 맞는 실업급여 신청 방법은?"
          subtitle="30초 확인"
          intro="신청 방법과 준비 상황을 선택하면 맞춤 안내를 드려요."
        >
          <CheckerQ
            n={1}
            group="q1"
            label="어떤 방법으로 신청할 예정인가요?"
            opts={[
              ["online", "고용24 온라인 신청"],
              ["visit", "고용센터 방문 신청"],
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
            label="워크넷 구직 등록을 했나요?"
            opts={[
              ["registered", "예, 등록 완료했어요"],
              ["not_registered", "아직 안 했어요"],
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
      <Sec n="02" id="online" title="실업급여 신청 방법이 온라인으로 가능한가요?" sub="고용24 신청 · 워크넷 구직 등록">
        <P>네, 대부분의 절차를 <B>고용24(www.ei.go.kr)</B>에서 온라인으로 처리할 수 있어요. 수급자격 인정신청부터 실업인정, 수급 내역 조회까지 한 곳에서 가능해요. 모바일 앱도 지원돼요.</P>
        <P>신청 전 <B>워크넷(www.work.go.kr)</B>에 구직 등록을 먼저 해야 해요. 고용24와 연동되기 때문에 구직 등록이 선행되지 않으면 수급자격 인정신청이 안 돼요. 구직 등록은 5분 내에 완료할 수 있어요.</P>
        <P>온라인 신청이 어렵거나 서류 제출이 필요한 경우 가까운 <B>고용센터</B>를 방문할 수 있어요. 신청 전 사전 예약을 하면 대기 시간을 줄일 수 있어요. 전국 100개 이상의 고용센터에서 처리 가능해요.</P>
        <P>신청 전체 과정은 아래 5단계예요. 퇴직 직후 가장 빠르게 시작해야 수급일수를 최대로 활용할 수 있어요.</P>

        <Steps items={[
          { title: "워크넷 구직 등록 (www.work.go.kr)", desc: "이직 후 가장 먼저 해야 해요. 고용24와 자동 연동돼요." },
          { title: "고용24에서 수급자격 인정신청서 제출", desc: "이직확인서, 신분증 사본 등 서류를 온라인으로 업로드해요." },
          { title: "수급자격 인정 심사 (약 5~7 영업일)", desc: "고용센터에서 심사 후 문자로 결과가 통보돼요." },
          { title: "7일 대기기간 (첫 수급자격 인정 후)", desc: "대기기간 동안 구직 활동을 시작해야 해요. 수당은 지급되지 않아요." },
          { title: "실업인정 신청 (4주마다)", desc: "구직 활동 내역을 제출하고 실업인정을 받으면 실업급여가 지급돼요." },
        ]} />

        <SpokeLink num={1} title="실업급여 구비서류 전체 목록" desc="이직확인서·신분증 등 제출 서류 상세 안내" href="/w/실업급여-구비서류" />
        <InlineLink
          icon="📅"
          title="실업급여 신청기간 기한 안내"
          desc="퇴직 후 12개월 이내 접수 기한 및 늦은 신청 주의사항"
          href="/w/실업급여-신청기간"
        />
      </Sec>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="prepare" title="실업급여 신청 전 준비할 것이 있나요?" sub="이직확인서 · 구비서류 목록">
        <P>가장 중요한 서류는 <B>이직확인서</B>예요. 전 직장에서 고용보험 상실 신고를 하면 고용보험 시스템에 자동 등록돼요. 회사가 신고를 늦게 하면 직접 고용센터에 신고를 요청할 수 있어요.</P>
        <P>이직확인서 외에 <B>신분증</B>(주민등록증 또는 운전면허증)과 <B>통장 사본</B>(실업급여 입금용)이 필요해요. 건강보험 자격상실 확인서도 요청받을 수 있으니 미리 준비하면 좋아요.</P>
        <P>자발적 퇴직이나 특수 사유가 있는 경우 <B>추가 서류</B>가 필요할 수 있어요. 예를 들어 임금 미지급을 이유로 퇴직한 경우 임금 미지급 증빙 서류, 직장 내 괴롭힘 퇴직이면 관련 자료를 준비해야 해요.</P>
        <P>서류 준비가 어렵다면 고용센터에 먼저 상담을 받으세요. 상황에 따라 필요한 서류가 다를 수 있어요. 온라인 신청 시 파일 업로드로 대부분 처리가 가능해요.</P>

        <TableTitle>실업급여 신청 시 기본 구비서류</TableTitle>
        <TH cols={["서류", "용도", "발급처"]} rows={[
          ["이직확인서", "피보험기간 및 이직 사유 확인", "전 직장 (고용보험 시스템)"],
          ["신분증", "본인 확인", "주민등록증/운전면허증"],
          ["통장 사본", "실업급여 입금 계좌 등록", "본인 명의 통장"],
          ["수급자격 인정신청서", "수급자격 신청", "고용24 또는 고용센터"],
        ]} />
        <TableNote>* 상황에 따라 추가 서류가 요청될 수 있어요.</TableNote>

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
          { icon: "📅", title: "실업급여 신청기간 기한", desc: "퇴직 후 12개월 이내 접수 기한", href: "/w/실업급여-신청기간" },
          { icon: "📂", title: "실업급여 구비서류", desc: "제출 서류 목록 전체 안내", href: "/w/실업급여-구비서류" },
          { icon: "📊", title: "실업급여 대기기간 7일", desc: "대기기간 계산 및 수당 지급 시작", href: "/w/실업급여-대기기간" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="timeline" title="실업급여 신청 후 수급까지 얼마나 걸리나요?" sub="대기기간 7일 · 첫 입금 시기">
        <P>수급자격 인정신청 후 <B>5~7 영업일</B> 내에 심사 결과가 문자로 통보돼요. 인정이 나면 <B>7일 대기기간</B>이 시작돼요. 이 기간은 실업급여 수령 기간에서 빠져요.</P>
        <P>7일 대기기간이 끝나면 처음으로 실업인정 신청을 할 수 있어요. 첫 실업인정 신청 후 <B>2~3 영업일 내</B>에 실업급여가 통장으로 입금돼요. 신청일로부터 총 약 2~3주가 걸리는 셈이에요.</P>
        <P>이후 <B>4주마다 실업인정 신청</B>을 계속해야 해요. 구직 활동 내역(입사 지원, 구직 상담, 직업 훈련 참여 등)을 제출하고 실업인정을 받아야 실업급여가 지속 지급돼요. 온라인으로도 가능해요.</P>
        <P>모든 신청을 퇴직 직후 빠르게 시작해야 소정급여일수를 최대한 활용할 수 있어요. 1개월 늦게 신청하면 1개월치 실업급여를 못 받을 수 있어요.</P>

        <Info type="warn">
          <B>첫 실업인정 신청일을 절대 놓치면 안 돼요</B><br />
          7일 대기기간 후 고용센터에서 지정한 첫 실업인정일을 지켜야 해요. 이 날짜를 놓치면 해당 기간의 실업급여가 지급되지 않을 수 있어요. 문자로 안내가 오니 꼭 확인하세요.
        </Info>
      </Sec>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="recognition" title="실업급여 신청 후 실업인정은 어떻게 받나요?" sub="구직 활동 · 4주마다 인정 신청">
        <P>실업인정은 <B>구직 활동을 했다는 것을 확인</B>받는 절차예요. 4주마다 고용24나 고용센터에서 신청하고, 해당 기간의 구직 활동 내역을 제출해야 해요. 인정받은 날수만큼 실업급여가 지급돼요.</P>
        <P>구직 활동으로 인정받을 수 있는 것들이에요. 입사 지원(서류 접수), 면접 참여, 취업지원센터 상담, 직업 훈련 참여, 채용 박람회 참여 등이에요. 1회 인정 기간(4주)에 <B>최소 1회</B>의 구직 활동이 필요해요.</P>
        <P>실업인정 신청은 고용24 앱 또는 웹사이트에서도 할 수 있어요. 다만 처음 몇 번은 고용센터 방문이 필요한 경우가 있어요. 고용센터마다 기준이 다를 수 있으니 처음에 안내를 잘 들어야 해요.</P>
        <P>소정급여일수가 모두 소진되면 실업급여 수급이 종료돼요. 훈련연장급여, 개별연장급여 등 연장급여 대상에 해당하면 추가로 받을 수도 있어요. 조기에 재취업하면 조기재취업수당을 챙기세요.</P>

        <BridgeCard
          q="실업급여 받으면서 알바도 가능한지 궁금하다면?"
          a="월 60시간 미만 알바는 신고 후 수급이 가능해요. 신고 방법과 기준을 확인해 보세요."
          label="실업급여 알바 가능 여부 확인"
          href="/w/실업급여-받으면서-알바-가능여부"
        />

        <SpokeLink num={2} title="실업급여 실업인정 특례 안내" desc="온라인 인정·특별 인정 등 예외 적용 기준" href="/w/실업급여-실업인정-특례" />

        <ExtBtn
          badge="고용24 공식"
          text="실업급여 수급자격 인정신청 바로가기"
          cta="신청하기 →"
          href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 구비서류 전체 안내", href: "/w/실업급여-구비서류" },
        { title: "실업급여 신청기간 기한 안내", href: "/w/실업급여-신청기간" },
        { title: "실업급여 대기기간 7일 안내", href: "/w/실업급여-대기기간" },
        { title: "실업급여 지급일 첫 입금일", href: "/w/실업급여-지급일-첫-입금일-대기기간" },
        { title: "실업급여 실업인정 특례 안내", href: "/w/실업급여-실업인정-특례" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 신청기간 기한 안내", href: "/w/실업급여-신청기간" }}
        next={{ title: "실업급여 실업신고 방법", href: "/w/실업급여-실업신고" }}
      />
    </BlogLayout>
  );
}
