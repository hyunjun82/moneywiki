// @ts-nocheck
"use client";

import { useState } from "react";
import {
  C, Btn, Info, InlineLink, SpokeLink, Divider, Sec, P, B, A,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  SidebarCTA, SidebarDocs, SidebarCalc,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 받으면서 알바 가능 여부 | 월 60시간 미만 신고 기준",
  description: "실업급여 수급 중 알바는 월 60시간(주 15시간) 미만이면 가능해요. 단, 반드시 신고해야 하고 미신고 시 부정수급으로 추가 징수가 붙어요. 가능 여부를 직접 확인해 보세요.",
  category: "실업급여",
  keywords: ["실업급여 알바 가능 여부", "월 60시간 미만 기준", "알바 취업 간주 기준", "수급 중 단기 근로"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "수급 중 알바는 월 60시간(주 15시간) 미만이면 가능해요.",
    "알바를 하면 반드시 실업인정 신청 시 근로 사실을 신고해야 해요.",
    "미신고 적발 시 부정수급으로 반환 + 추가 징수가 붙어요.",
  ],
  sources: [{ name: "고용보험법 제57조", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" }],
  faq: [
    { q: "실업급여 알바 가능 여부 기준이 되는 월 60시간은 어떻게 계산하나요?", a: "한 달 총 근무시간이 60시간 미만이어야 해요. 주 단위로 계산하면 주 15시간 미만이에요. 초과하면 취업으로 간주돼 실업급여가 중단될 수 있어요." },
    { q: "실업급여 받으면서 알바를 하루만 해도 신고해야 하나요?", a: "네, 하루 알바도 반드시 신고해야 해요. 실업인정 신청 시 근로 사실을 입력하면 그날 하루만 실업급여에서 제외돼요. 소정급여일수는 줄지 않아요." },
  ],
  ctaCard: {
    label: "가능 여부 체크",
    mainText: "월 60시간 미만 → 신고 후 수급 가능",
    subText: "내 상황으로 바로 확인",
    url: "/w/실업급여-받으면서-알바-가능여부",
    external: false,
  },
  relatedDocs: [{ title: "고용보험법 제57조", url: "https://www.law.go.kr/법령/고용보험법" }],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(sel: Record<string, string>): { pass: boolean; headline: string; detail: string; links: ResLink[] } | null {
  const { hours, reported } = sel;
  if (!hours) return null;

  if (hours === "over60") return {
    pass: false,
    headline: "월 60시간 이상이면 취업으로 간주돼요",
    detail: "월 60시간(주 15시간) 이상 근무하면 취업으로 간주돼 실업급여 수급이 중단돼요. 소정급여일수가 많이 남았다면 조기재취업수당 신청이 가능해요.",
    links: [
      { icon: "💰", title: "조기재취업수당 신청 조건", desc: "남은 급여 50%를 일시금으로 받기", href: "/w/실업급여-재취업-조건" },
      { icon: "📊", title: "소정급여일수 나이별 기간표", desc: "내 수급 기간 확인", href: "/w/실업급여-소정급여일수" },
    ],
  };

  if (hours === "oneday") return {
    pass: true,
    headline: "하루 알바도 반드시 신고해야 해요",
    detail: "1일 단기 알바도 실업인정 신청 시 근로 사실을 신고해야 해요. 신고하면 그날 하루만 실업급여 지급에서 제외돼요. 소정급여일수는 줄지 않아요.",
    links: [
      { icon: "📋", title: "고용24 알바 신고 방법", desc: "신고 절차 단계별 안내", href: "/w/실업급여-받으면서-알바" },
      { icon: "⚠️", title: "미신고 부정수급 처벌 기준", desc: "반환 + 추가 징수 기준", href: "/w/실업급여-부정수급" },
    ],
  };

  if (hours === "under60" && !reported) return null;

  if (hours === "under60" && reported === "yes") return {
    pass: true,
    headline: "정상적으로 수급할 수 있어요",
    detail: "월 60시간 미만 알바를 하고 신고도 했으면 근로일만 제외하고 나머지 날은 실업급여를 받아요. 소정급여일수는 줄지 않아요.",
    links: [
      { icon: "📊", title: "소정급여일수 기준표", desc: "나이별·가입기간별 수급 기간", href: "/w/실업급여-소정급여일수" },
      { icon: "💰", title: "기초일액 계산 방법", desc: "일 수급액 확인", href: "/w/실업급여-기초일액" },
    ],
  };

  if (hours === "under60" && reported === "no") return {
    pass: false,
    headline: "지금 바로 자진신고를 해야 해요",
    detail: "신고하지 않고 알바를 하면 부정수급이 돼요. 자진신고 시 최초 1회는 추가 징수 없이 반환으로 처리될 수 있어요.",
    links: [
      { icon: "⚠️", title: "부정수급 자진신고 감면 기준", desc: "자진신고하면 처벌이 줄어요", href: "/w/실업급여-부정수급" },
      { icon: "📋", title: "고용24 알바 신고 방법", desc: "신고 절차 단계별", href: "/w/실업급여-받으면서-알바" },
    ],
  };

  return null;
}

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const sidebar = (
    <>
      <SidebarCTA
        items={[
          { icon: "💼", label: "고용24 실업인정 신청", desc: "알바 신고 포함 제출", href: "https://www.work24.go.kr", hot: true },
          { icon: "📋", label: "알바 신고 방법", desc: "고용24 단계별 절차", href: "/w/실업급여-받으면서-알바" },
          { icon: "💰", label: "조기재취업수당", desc: "남은 급여 50% 수령", href: "/w/실업급여-재취업-조건" },
        ]}
      />
      <SidebarDocs
        items={[
          { title: "고용보험법 제57조", href: "https://www.law.go.kr/법령/고용보험법" },
          { title: "실업급여 구직활동 기준", href: "/w/실업급여-구직활동" },
          { title: "소정급여일수 기간표", href: "/w/실업급여-소정급여일수" },
          { title: "부정수급 처벌 기준", href: "/w/실업급여-부정수급" },
          { title: "조기재취업수당 신청", href: "/w/실업급여-재취업-조건" },
        ]}
      />
      <SidebarCalc
        items={[
          { title: "기초일액 계산", href: "/w/실업급여-기초일액" },
          { title: "소정급여일수 조회", href: "/w/실업급여-소정급여일수" },
          { title: "연봉별 수급액 계산", href: "/w/실업급여-연봉별-계산" },
          { title: "피보험기간 180일", href: "/w/실업급여-피보험기간-180일-계산" },
          { title: "수급 기간 계산", href: "/w/실업급여-수급기간-몇개월-받나요" },
        ]}
      />
    </>
  );

  return (
    <BlogLayout
      sidebar={sidebar}
      disclaimer="이 글은 2026년 2월 고용보험법 기준으로 작성됐어요. 개별 사안은 고용센터에서 확인하세요."
      breadcrumb={["홈", "실업급여", "알바 가능 여부"]}
      tags={["2026년 기준", "실업급여", "알바"]}
      date="2026-02-27"
      title={meta.title}
      description={<>{meta.description}</>}
      sourceBar={{ badge: "출처", name: "고용보험법 제57조 · 구직급여 수급 중 취업 신고 기준", date: "2026.02 기준" }}
    >
      <TOC items={[
        { t: "알바 가능 여부 체크", sub: "근무 시간·신고 여부 선택" },
        { t: "실업급여 받으면서 알바 가능 여부 — 월 60시간 기준이 뭐예요?", sub: "취업 간주 기준 설명" },
        { t: "실업급여 받으면서 알바 하면 수급액이 줄어드나요?", sub: "근로일만 제외되는 구조" },
        { t: "실업급여 받으면서 알바 신고는 어떻게 하나요?", sub: "고용24 실업인정 절차" },
        { t: "실업급여 받으면서 알바 미신고 시 어떻게 되나요?", sub: "부정수급 처벌 기준" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "수급 중 알바는 <strong>월 60시간(주 15시간) 미만</strong>이면 가능해요.",
        "알바를 하면 <strong>반드시 신고</strong>해야 해요. 신고 안 하면 부정수급이에요.",
        "신고하면 근로일만 제외돼요. <strong>소정급여일수는 줄지 않아요</strong>.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <CheckerShell icon="💼" title="알바 가능 여부 체크" label="근무 시간 기준">
        <Sec n="STEP 01" title="알바 가능 여부 체크" sub="근무 시간과 신고 여부를 선택해 주세요" />
        <P>실업급여 수급 중 알바 가능 여부는 월 근무시간에 따라 달라요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제57조</A> 기준이에요.</P>
        <CheckerQ n={1} label="월 총 근무 시간은?">
          <Btn group="hours" value="under60" label="월 60시간 미만" sel={sel} pick={pick} />
          <Btn group="hours" value="oneday" label="1일 단기 알바" sel={sel} pick={pick} />
          <Btn group="hours" value="over60" label="월 60시간 이상" sel={sel} pick={pick} />
        </CheckerQ>
        {sel.hours === "under60" && (
          <CheckerQ n={2} label="알바 사실을 실업인정 신청 시 신고했나요?">
            <Btn group="reported" value="yes" label="신고했어요" sel={sel} pick={pick} />
            <Btn group="reported" value="no" label="신고 안 했어요" sel={sel} pick={pick} />
          </CheckerQ>
        )}
        {result?.pass === true && (
          <ResultPass title="수급 가능" desc={result.detail}>
            {result.links.map((l) => (
              <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
            ))}
          </ResultPass>
        )}
        {result?.pass === false && (
          <ResultFail title="확인 필요" desc={result.detail}>
            {result.links.map((l) => (
              <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
            ))}
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        question="알바 신고 방법이 궁금하신가요?"
        body={<>고용24에서 실업인정 신청할 때 근로 사실을 입력하면 돼요. <strong style={{ color: C.navy }}>근무처·날짜·시간·임금</strong> 4가지를 입력하면 끝이에요.</>}
        btnText="알바 신고 방법 자세히 보기 →"
        href="/w/실업급여-받으면서-알바"
      />

      {/* ── SECTION 02. 월 60시간 기준 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 받으면서 알바 가능 여부 — 월 60시간 기준이 뭐예요?" sub="취업 간주 기준 설명" />

      <P>실업급여 수급 중 알바는 <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제57조</A>에 따라 월 60시간(주 15시간) 미만이면 취업으로 간주하지 않아요. 이 범위 안에서는 알바를 병행해도 실업급여 수급 자격이 유지돼요.</P>

      <P>60시간 기준은 한 달 전체를 합산해요. 주 단위로 보면 주 15시간 미만이에요. 주 3일 × 4시간 = 주 12시간이라면 월 48시간으로 기준 이하예요. 반면 주 3일 × 6시간 = 주 18시간이면 월 72시간이 돼서 기준을 초과해요.</P>

      <P><B>월 60시간 이상이면 취업으로 간주돼 실업급여가 중단될 수 있어요.</B> 소정급여일수가 많이 남아있다면 조기재취업수당 신청이 가능해요. 남은 소정급여일수의 50%를 일시금으로 받을 수 있어요.</P>

      <P>하루 단기 알바도 신고 의무가 있어요. 1일 알바를 했으면 그날 하루만 실업급여에서 제외되고, 소정급여일수는 그대로 유지돼요. 하루 알바라도 신고를 건너뛰면 안 돼요.</P>

      <InlineLink icon="💰" title="조기재취업수당 신청 조건" desc="월 60시간 이상 취업 시 남은 소정급여일수 50%를 일시금으로 수령 가능" href="/w/실업급여-재취업-조건" />

      {/* ── SECTION 03. 수급액 변화 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 받으면서 알바 하면 수급액이 줄어드나요?" sub="근로일만 제외되는 구조 설명" />

      <P>알바를 하고 신고하면 근로일만 실업급여 지급일에서 제외돼요. 소정급여일수 자체가 줄어드는 게 아니라, 근로한 날만 그날의 실업급여가 빠지는 구조예요.</P>

      <P>소정급여일수 120일인데 이번 달에 5일 알바를 했다면, 이번 달에 5일치 실업급여를 못 받아요. 그 5일은 소정급여일수에서 차감되지 않아서 나중에 받을 수 있어요. 수급 가능 기간(이직 후 12개월) 안에 다 받아야 해요.</P>

      <P><B>소정급여일수는 줄어들지 않아요.</B> 근로일은 수급 기간에서 제외된 날이기 때문에, 수급 종료일이 그만큼 뒤로 밀려요. 이직 후 12개월 안에 다 받아야 하는 기한은 있어요.</P>

      <P>알바 수입과 실업급여가 중복 지급되지 않는 구조예요. 임금을 받은 날은 실업급여를 받지 못하지만, 그날의 알바 임금은 그대로 받을 수 있어요.</P>

      <Info type="warn">{'<strong>주의:</strong> 알바 소득이 생겼어도 실업급여에서는 그날 하루만 제외돼요. 전체 급여가 삭감되지는 않아요. 단, 신고를 반드시 해야 해요.'}</Info>

      <RelatedMid
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 가이드"
        items={[
          { title: "소정급여일수 나이별 표", href: "/w/실업급여-소정급여일수", desc: "내 수급 기간 조회" },
          { title: "기초일액 계산 방법", href: "/w/실업급여-기초일액", desc: "일 수급액 확인" },
          { title: "구직활동 인정 기준", href: "/w/실업급여-구직활동", desc: "차수별 횟수와 증빙" },
        ]}
      />

      {/* ── SECTION 04. 신고 방법 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 받으면서 알바 신고는 어떻게 하나요?" sub="고용24 실업인정 신청 절차 안내" />

      <P>알바 신고는 고용24에서 실업인정 신청 시 함께 처리해요. 별도로 신고서를 제출하거나 고용센터를 방문할 필요 없이 온라인으로 처리할 수 있어요.</P>

      <P>실업인정 신청 화면에서 &lsquo;취업/근로 사실&rsquo;을 선택하고, 근무처·근무 날짜·근무 시간·실제 임금 4가지를 입력하면 돼요. 입력이 완료되면 해당 근로일은 자동으로 실업급여 지급에서 제외돼요.</P>

      <P><B>신고 기한은 실업인정 신청 기간이에요.</B> 기간이 지나면 수정이 어려울 수 있어요. 알바를 한 사실이 생기면 다음 실업인정 신청 시 빠짐없이 입력해야 해요.</P>

      <P>과거 기간에 신고를 못 했다면 고용센터에 직접 방문해서 처리해야 해요. 온라인으로는 지난 기간 수정이 어려운 경우가 많아요.</P>

      <SpokeLink num="01" title="구직활동 인정 기준 — 차수별 횟수와 증빙" desc="실업인정 신청 방법과 알바 신고 포함 절차" href="/w/실업급여-구직활동" />
      <SpokeLink num="02" title="실업급여 구비서류 목록" desc="실업인정 신청 시 필요한 서류 일람" href="/w/실업급여-구비서류" />

      {/* ── SECTION 05. 미신고 처벌 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 받으면서 알바 미신고 시 어떻게 되나요?" sub="부정수급 처벌과 자진신고 감면" />

      <P>알바를 하고 신고하지 않으면 부정수급으로 처리돼요. 부정수급이 적발되면 받은 실업급여를 반환해야 하고, 추가로 최대 5배까지 징수될 수 있어요.</P>

      <P>자진신고하면 처벌이 줄어들어요. 적발 전에 자진신고하면 최초 1회는 추가 징수 없이 반환만으로 처리될 수 있어요. 발견된 뒤에는 반환 + 추가 징수 + 형사처벌까지 이어질 수 있어요.</P>

      <P><B>고용24·국세청·건강보험공단 데이터가 연계돼 있어서 적발 가능성이 높아요.</B> 사업장 근무 이력, 4대보험 가입 내역 등이 교차 검증돼요. 단기 알바도 예외가 아니에요.</P>

      <P>부정수급 신고 포상금 제도도 있어요. 특히 사업주가 신고하는 경우도 있으니 반드시 신고하는 게 안전해요.</P>

      <InlineLink icon="⚠️" title="실업급여 부정수급 처벌 기준" desc="미신고 시 최대 5배 추징 + 형사처벌까지 이어질 수 있어요" href="/w/실업급여-부정수급" />

      <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">실업인정 신청 (알바 신고 포함)</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 받으면서 알바 신고 방법 — 고용24 절차", desc: "실업급여 · 알바 신고", href: "/w/실업급여-받으면서-알바" },
        { title: "실업급여 구직활동 인정 기준 — 차수별 횟수", desc: "실업급여 · 구직활동", href: "/w/실업급여-구직활동" },
        { title: "실업급여 재취업 조건 — 조기재취업수당 신청", desc: "실업급여 · 조기재취업수당", href: "/w/실업급여-재취업-조건" },
        { title: "실업급여 소정급여일수 — 나이별 수급 기간", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 기초일액 계산 — 상한 하한 적용", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 반복수급 감액 기준", href: "/w/실업급여-반복수급" }}
        next={{ title: "실업급여 비과세 소득 기준", href: "/w/실업급여-비과세" }}
      />
    </BlogLayout>
  );
}
