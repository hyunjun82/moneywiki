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
  title: "실업급여 받으면서 알바 신고 기준 | 근로일 제외 소정급여일수 처리",
  description: "실업급여 받으면서 알바를 했다면 실업인정 신청 시 고용24에서 근로 사실을 신고해야 해요. 신고하면 근로일만 제외되고 소정급여일수는 줄지 않아요.",
  category: "실업급여",
  keywords: ["실업급여 알바 신고 기준", "근로일 제외 소정급여일수", "알바 미신고 부정수급", "수급 중 파트타임 허용"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "알바 신고는 고용24 실업인정 신청 시 취업/근로 사실을 입력하면 돼요.",
    "신고하면 근로일만 제외돼요. 소정급여일수는 줄지 않아요.",
    "미신고 시 부정수급으로 반환 + 추가 징수 처벌을 받아요.",
  ],
  sources: [{ name: "고용보험법 제47조", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" }],
  faq: [
    { q: "실업급여 받으면서 알바를 신고하면 수급액이 줄어드나요?", a: "신고하면 근로일만 실업급여에서 제외돼요. 소정급여일수 자체는 줄지 않고, 근로일만큼 수급 종료일이 뒤로 밀려요. 알바 임금과 실업급여가 중복 지급되지 않는 구조예요." },
    { q: "실업급여 받으면서 알바 신고 기한이 따로 있나요?", a: "실업인정 신청 기간 안에 신고해야 해요. 기간이 지나면 온라인 수정이 어려울 수 있어요. 과거 기간 미신고는 고용센터에 직접 방문해서 처리해야 해요." },
  ],
  ctaCard: {
    label: "신고 기준 확인",
    mainText: "알바 신고 → 근로일만 제외",
    subText: "내 상황으로 신고 기준 확인",
    url: "/w/실업급여-받으면서-알바",
    external: false,
  },
  relatedDocs: [{ title: "고용보험법 제47조", url: "https://www.law.go.kr/법령/고용보험법" }],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(sel: Record<string, string>): { pass: boolean; headline: string; detail: string; links: ResLink[] } | null {
  const { hours, reported } = sel;
  if (!hours) return null;

  if (hours === "over60") return {
    pass: false,
    headline: "월 60시간 이상이면 취업 간주로 수급이 중단돼요",
    detail: "월 60시간(주 15시간) 이상 근무하면 취업으로 간주돼 실업급여 수급이 중단돼요. 소정급여일수가 절반 이상 남았다면 조기재취업수당 신청이 가능해요.",
    links: [
      { icon: "💰", title: "조기재취업수당 신청 조건", desc: "남은 급여 50% 일시금 수령", href: "/w/실업급여-재취업-조건" },
      { icon: "📊", title: "소정급여일수 기간표", desc: "내 수급 기간 조회", href: "/w/실업급여-소정급여일수" },
    ],
  };

  if (hours === "under60" && !reported) return null;

  if (hours === "under60" && reported === "yes") return {
    pass: true,
    headline: "정상적으로 수급할 수 있어요",
    detail: "월 60시간 미만 알바를 하고 신고도 했으면 근로일만 제외하고 나머지 날은 실업급여를 받아요. 소정급여일수는 줄지 않아요.",
    links: [
      { icon: "📊", title: "소정급여일수 기준표", desc: "나이별·가입기간별 수급 기간", href: "/w/실업급여-소정급여일수" },
      { icon: "💰", title: "기초일액 계산", desc: "일 수급액 확인", href: "/w/실업급여-기초일액" },
    ],
  };

  if (hours === "under60" && reported === "no") return {
    pass: false,
    headline: "지금 바로 자진신고를 해야 해요",
    detail: "신고하지 않고 알바를 하면 부정수급이 돼요. 자진신고 시 최초 1회는 추가 징수 없이 반환으로 처리될 수 있어요.",
    links: [
      { icon: "⚠️", title: "부정수급 자진신고 감면 기준", desc: "자진신고하면 처벌이 줄어요", href: "/w/실업급여-부정수급" },
      { icon: "📋", title: "고용24 알바 신고 절차", desc: "신고 방법 단계별", href: "/w/실업급여-받으면서-알바-가능여부" },
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
          { icon: "💼", label: "고용24 실업인정 신청", desc: "알바 신고 포함 처리", href: "https://www.work24.go.kr", hot: true },
          { icon: "📋", label: "알바 가능 여부 체크", desc: "월 60시간 기준 확인", href: "/w/실업급여-받으면서-알바-가능여부" },
          { icon: "💰", label: "조기재취업수당", desc: "남은 급여 50% 수령", href: "/w/실업급여-재취업-조건" },
        ]}
      />
      <SidebarDocs
        items={[
          { title: "고용보험법 제47조", href: "https://www.law.go.kr/법령/고용보험법" },
          { title: "알바 가능 여부 기준", href: "/w/실업급여-받으면서-알바-가능여부" },
          { title: "구직활동 인정 기준", href: "/w/실업급여-구직활동" },
          { title: "소정급여일수 기간표", href: "/w/실업급여-소정급여일수" },
          { title: "부정수급 처벌 기준", href: "/w/실업급여-부정수급" },
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
      breadcrumb={["홈", "실업급여", "알바 신고"]}
      tags={["2026년 기준", "실업급여", "알바 신고"]}
      date="2026-02-27"
      title={meta.title}
      description={<>{meta.description}</>}
      sourceBar={{ badge: "출처", name: "고용보험법 제47조 · 실업인정 기준", date: "2026.02 기준" }}
    >
      <TOC items={[
        { t: "알바 신고 상태 체크", sub: "근무 시간·신고 여부 선택" },
        { t: "실업급여 받으면서 알바 신고 기준은 무엇인가요?", sub: "신고 의무 발생 기준" },
        { t: "실업급여 받으면서 알바 하면 수급액이 어떻게 되나요?", sub: "근로일만 제외 구조" },
        { t: "실업급여 받으면서 알바 고용24 신고는 어떻게 하나요?", sub: "입력 항목과 절차" },
        { t: "실업급여 받으면서 알바 미신고 처벌은 어떻게 되나요?", sub: "부정수급 반환·추징 기준" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "알바 신고는 고용24 실업인정 신청 시 <strong>취업/근로 사실</strong>을 입력하면 돼요.",
        "신고하면 근로일만 제외돼요. <strong>소정급여일수는 줄지 않아요</strong>.",
        "미신고 시 <strong>부정수급</strong>으로 반환 + 추가 징수 처벌을 받아요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <CheckerShell icon="💼" title="알바 신고 상태 체크" label="신고 여부 기준">
        <Sec n="STEP 01" title="알바 신고 상태 체크" sub="근무 시간과 신고 여부를 선택해 주세요" />
        <P>알바를 했다면 신고 여부와 근무 시간에 따라 처리 방식이 달라요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제47조</A>에서 취업 사실 신고 의무를 규정하고 있어요.</P>
        <CheckerQ n={1} label="월 총 근무 시간은?">
          <Btn group="hours" value="under60" label="월 60시간 미만" sel={sel} pick={pick} />
          <Btn group="hours" value="over60" label="월 60시간 이상" sel={sel} pick={pick} />
          <Btn group="hours" value="unsure" label="잘 모르겠어요" sel={sel} pick={pick} />
        </CheckerQ>
        {sel.hours === "under60" && (
          <CheckerQ n={2} label="알바 사실을 고용24에 신고했나요?">
            <Btn group="reported" value="yes" label="신고했어요" sel={sel} pick={pick} />
            <Btn group="reported" value="no" label="신고 안 했어요" sel={sel} pick={pick} />
          </CheckerQ>
        )}
        {result?.pass === true && (
          <ResultPass title="정상 수급 가능" desc={result.detail}>
            {result.links.map((l) => (
              <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
            ))}
          </ResultPass>
        )}
        {result?.pass === false && (
          <ResultFail title="확인·조치 필요" desc={result.detail}>
            {result.links.map((l) => (
              <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
            ))}
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        question="월 60시간 이상이면 취업 간주가 된다고요?"
        body={<>60시간 이상이면 실업급여가 중단되지만 조기재취업수당으로 <strong style={{ color: C.navy }}>남은 급여 50%</strong>를 일시금으로 받을 수 있어요.</>}
        btnText="조기재취업수당 신청 조건 확인 →"
        href="/w/실업급여-재취업-조건"
      />

      {/* ── SECTION 02. 신고 기준 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 받으면서 알바 신고 기준은 무엇인가요?" sub="신고 의무 발생 기준 설명" />

      <P>실업급여 수급 중 알바를 하면 <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제47조</A>에 따라 취업 사실을 신고해야 해요. 하루 단기 알바, 주말 알바, 프리랜서 단발성 업무 모두 신고 대상이에요.</P>

      <P>신고 기준은 근무 시간이 아니라 취업 사실 자체예요. 1시간 알바를 해도 신고해야 해요. 단, 월 60시간(주 15시간) 미만이면 수급 자격은 유지돼요. 60시간 이상이면 취업 간주로 수급이 중단될 수 있어요.</P>

      <P><B>신고 대상은 임금을 받는 모든 근로 활동이에요.</B> 현금으로 받는 단순 노무도 포함이에요. 봉사활동이나 무급 인턴은 신고 대상이 아니에요. 임금이 발생하는지가 기준이에요.</P>

      <P>신고는 실업인정 신청 화면에서 해요. 신청일 전에 알바가 있었으면 그 내용을 입력하면 돼요. 별도 서류 제출은 없어요.</P>

      <InlineLink icon="💼" title="알바 가능 여부 체크 — 월 60시간 기준" desc="취업 간주 기준과 신고 여부에 따른 처리 방식 정리" href="/w/실업급여-받으면서-알바-가능여부" />

      {/* ── SECTION 03. 수급액 변화 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 받으면서 알바 하면 수급액이 어떻게 되나요?" sub="근로일만 제외되는 구조" />

      <P>알바를 신고하면 근로일만 실업급여 지급일에서 제외돼요. 소정급여일수 자체가 줄어드는 게 아니라, 근로한 날만 그날의 실업급여가 빠지는 구조예요.</P>

      <P>예를 들어 소정급여일수 120일인데 이번 달에 5일 알바를 했다면, 이번 달에 5일치 실업급여를 못 받아요. 그 5일은 소정급여일수에서 차감되지 않아서 나중에 받을 수 있어요. 수급 가능 기간(이직 후 12개월) 안에 다 받아야 해요.</P>

      <P><B>알바 임금과 실업급여는 중복 지급되지 않아요.</B> 알바를 한 날은 알바 임금을 받고 실업급여는 못 받아요. 알바를 안 한 날은 실업급여를 받아요.</P>

      <P>소정급여일수가 많이 남아있을수록 알바 신고로 인한 영향이 적어요. 근로일이 많아질수록 수급 기간이 뒤로 밀리지만, 이직 후 12개월 기한을 넘기지 않도록 주의해야 해요.</P>

      <Info type="warn">{'<strong>주의:</strong> 수급 가능 기간(이직 후 12개월)이 지나면 미수급 소정급여일수가 남아도 더 이상 받을 수 없어요. 알바가 많아지면 기한을 넘길 수 있어요.'}</Info>

      <RelatedMid
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 가이드"
        items={[
          { title: "소정급여일수 나이별 표", href: "/w/실업급여-소정급여일수", desc: "내 수급 기간 조회" },
          { title: "기초일액 계산 방법", href: "/w/실업급여-기초일액", desc: "일 수급액 확인" },
          { title: "구직활동 인정 기준", href: "/w/실업급여-구직활동", desc: "차수별 횟수와 증빙" },
        ]}
      />

      {/* ── SECTION 04. 고용24 신고 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 받으면서 알바 고용24 신고는 어떻게 하나요?" sub="입력 항목과 신청 절차 안내" />

      <P>고용24(work24.go.kr)에서 실업인정 신청을 할 때 알바 신고를 함께 해요. 별도 신고 창구가 아니라 실업인정 신청 화면 안에 알바 신고 입력란이 있어요.</P>

      <P>실업인정 신청 → 취업/근로 사실 체크 → 근무처·날짜·시간·임금 입력 순서로 진행해요. 근무처는 사업자 이름이나 개인 이름을 입력하면 돼요. 임금은 실제 받은 금액을 입력해요.</P>

      <P><B>입력 항목 4가지: 근무처, 근무 날짜, 근무 시간, 실제 임금</B>이에요. 증빙서류를 따로 제출할 필요는 없어요. 다만 나중에 확인 요청이 올 수 있으니 급여명세서·계좌이체 내역 등을 보관해 두는 게 좋아요.</P>

      <P>과거 기간에 신고를 못 했다면 고용센터에 직접 방문해서 처리해야 해요. 온라인으로는 이미 지난 기간 수정이 어려운 경우가 많아요. 빠를수록 처벌이 줄어들어요.</P>

      <SpokeLink num="01" title="실업급여 구직활동 인정 기준" desc="실업인정 신청 방법과 차수별 구직활동 횟수 기준" href="/w/실업급여-구직활동" />
      <SpokeLink num="02" title="실업급여 알바 가능 여부 체크" desc="월 60시간 기준과 취업 간주 처리 방식" href="/w/실업급여-받으면서-알바-가능여부" />

      {/* ── SECTION 05. 미신고 처벌 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 받으면서 알바 미신고 처벌은 어떻게 되나요?" sub="부정수급 반환·추징 기준 안내" />

      <P>알바를 하고 신고하지 않으면 부정수급으로 처리돼요. 적발되면 받은 실업급여를 반환해야 하고, 추가로 최대 5배까지 징수될 수 있어요.</P>

      <P>자진신고하면 처벌이 줄어요. 고용센터에서 발견하기 전에 스스로 신고하면 최초 1회는 추가 징수 없이 반환만으로 처리될 수 있어요. 발견된 후에는 반환 + 추가 징수 + 형사처벌까지 이어질 수 있어요.</P>

      <P><B>국세청·건강보험공단 데이터가 연계돼 있어요.</B> 4대보험 가입 이력, 사업소득 신고 내역 등이 교차 검증돼요. 현금 알바라도 장기간 숨기기 어려운 구조예요.</P>

      <P>부정수급 신고 포상금 제도도 있어요. 사업주가 신고하는 경우도 있으니 반드시 신고하는 게 안전해요.</P>

      <InlineLink icon="⚠️" title="실업급여 부정수급 처벌 기준" desc="미신고 시 최대 5배 추징 + 형사처벌 기준 상세 정리" href="/w/실업급여-부정수급" />

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
        { title: "실업급여 알바 가능 여부 — 월 60시간 미만 기준", desc: "실업급여 · 알바 가능", href: "/w/실업급여-받으면서-알바-가능여부" },
        { title: "실업급여 구직활동 인정 기준 — 차수별 횟수", desc: "실업급여 · 구직활동", href: "/w/실업급여-구직활동" },
        { title: "실업급여 재취업 조건 — 조기재취업수당 신청", desc: "실업급여 · 조기재취업수당", href: "/w/실업급여-재취업-조건" },
        { title: "실업급여 소정급여일수 — 나이별 수급 기간", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 부정수급 처벌 — 최대 5배 추징", desc: "실업급여 · 부정수급", href: "/w/실업급여-부정수급" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 알바 가능 여부", href: "/w/실업급여-받으면서-알바-가능여부" }}
        next={{ title: "실업급여 비과세 소득 분류", href: "/w/실업급여-비과세" }}
      />
    </BlogLayout>
  );
}
