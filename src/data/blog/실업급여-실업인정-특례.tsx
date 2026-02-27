"use client";

import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 실업인정 특례 조건 | 온라인 인정 구직활동 완화 안내",
  description: "실업급여 실업인정 특례는 특정 조건에서 구직활동 인정 기준이 완화되거나 온라인으로 인정받을 수 있는 제도예요. 50세 이상, 장애인, 원거리 거주자 등이 주요 대상이에요.",
  category: "실업급여",
  keywords: ["실업급여 실업인정 특례 조건", "실업인정 온라인 대상자", "실업인정 특례 구직활동 기준", "실업인정 이의신청 방법"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "실업인정 특례 대상자는 온라인으로만 실업인정 신청이 가능해요",
    "50세 이상·장애인·임신 중인 자 등은 구직활동 기준이 완화돼요",
    "실업인정 결과에 이의가 있으면 고용센터에 이의신청이 가능해요",
  ],
  sources: [
    { name: "고용보험법 시행규칙 제92조", url: "https://www.law.go.kr/법령/고용보험법시행규칙", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 실업인정 특례 대상자는 누구인가요?", a: "50세 이상, 장애인, 임신 중인 자, 가족 간호 중인 자, 원거리(50km 이상) 거주자 등이 특례 대상이에요. 이들은 온라인으로만 실업인정을 받거나 구직활동 기준이 완화 적용돼요." },
    { q: "실업급여 실업인정 결과에 불복하면 어떻게 하나요?", a: "실업인정 거부 또는 정지 결정을 받은 날로부터 90일 이내에 심사청구를 할 수 있어요. 고용보험 심사관에게 심사청구서를 제출하면 되고, 재결에도 불복하면 재심사청구도 가능해요." },
  ],
  ctaCard: {
    label: "온라인 인정",
    mainText: "실업인정 고용24에서 신청하기",
    subText: "특례 대상자는 방문 없이 가능해요",
    url: "https://www.ei.go.kr/ei/eih/cm/hm/main.do",
    external: true,
  },
  relatedDocs: [{ title: "실업급여 신청 방법", url: "/w/실업급여-신청방법" }],
};

type Q1 = "over50" | "disabled" | "pregnant" | "remote" | "normal";
type Q2 = "yes" | "no";
type Q3 = "online" | "visit";
type Q4 = "objection" | "normal_proceed";

function getResult(q1: Q1 | "", q2: Q2 | "", q3: Q3 | "", q4: Q4 | "") {
  if (!q1 || !q2 || !q3 || !q4) return null;
  const isSpecial = q1 !== "normal";
  if (isSpecial) {
    return {
      pass: true,
      title: "실업인정 특례 대상자예요 — 온라인 인정 가능해요",
      desc: "50세 이상·장애인·임신 중·원거리 거주 등은 고용센터 방문 없이 고용24에서 온라인으로만 실업인정을 받을 수 있어요. 구직활동 기준도 완화돼요.",
      links: [
        { icon: "🏢", title: "고용24 실업인정 신청", desc: "온라인 실업인정 신청 바로가기", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do" },
        { icon: "📋", title: "실업급여 신청 방법 안내", desc: "수급자격 신청부터 실업인정까지", href: "/w/실업급여-신청방법" },
      ],
    };
  }
  if (q2 === "no") {
    return {
      pass: false,
      title: "구직활동이 부족하면 실업인정이 거부될 수 있어요",
      desc: "4주마다 최소 1회 이상의 구직활동 내역을 제출해야 해요. 입사 지원, 면접, 직업훈련 참여 등이 인정돼요.",
      links: [
        { icon: "📋", title: "구직활동 인정 기준", desc: "실업인정 구직활동 종류 및 기준", href: "/w/실업급여-실업인정-특례" },
      ],
    };
  }
  return {
    pass: true,
    title: "정상적으로 실업인정 신청이 가능해요",
    desc: "4주마다 구직활동 내역을 고용24 또는 고용센터를 통해 제출하고 실업인정을 받으세요.",
    links: [
      { icon: "🏢", title: "고용24 실업인정 신청", desc: "온라인 신청 바로가기", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do" },
      { icon: "📅", title: "실업급여 대기기간 안내", desc: "7일 대기기간 계산 및 첫 수급 시기", href: "/w/실업급여-대기기간" },
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
        { icon: "📋", title: "고용24 실업인정 신청", sub: "온라인 특례 실업인정 신청", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do", hot: true },
        { icon: "📅", title: "실업급여 신청기간 기한", sub: "퇴직 후 12개월 이내 접수 기한", href: "/w/실업급여-신청기간" },
        { icon: "💰", title: "실업급여 수급액 계산", sub: "30초 내 예상 금액 확인", href: "/w/실업급여-계산기" },
      ]} />
      <SidebarDocs items={[
        { title: "실업급여 신청 방법 절차", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
        { title: "실업급여 신청기간 기한", cat: "실업급여·신청", href: "/w/실업급여-신청기간" },
        { title: "실업급여 대기기간 안내", cat: "실업급여·수급", href: "/w/실업급여-대기기간" },
        { title: "실업급여 이의신청 심사청구", cat: "실업급여·불복", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
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
      breadcrumb={["홈", "실업급여", "수급 관리", "실업인정 특례"]}
      tags={["2026년 최신", "실업급여", "실업인정", "특례"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>실업급여 <B>실업인정 특례</B>는 50세 이상, 장애인, 임신 중인 분 등이 <B>온라인으로만</B> 실업인정을 받거나 구직활동 기준이 완화되는 제도예요. 해당 여부를 체커로 확인해 보세요.</>}
      sourceBar={{ badge: "고용보험법", name: "시행규칙 제92조", date: "2026.02" }}
      stickyLabel="온라인 인정"
      stickyValue="방문 없이 가능"
      stickyBtn="특례 여부 확인"
      disclaimer="이 글은 고용보험법 시행규칙 및 고용노동부 공개 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 개인 상황에 따라 적용 내용이 다를 수 있어요."
      sidebar={sidebar}
    >
      <TOC items={[
        { n: "01", t: "실업인정 특례 해당 여부 확인", sub: "나이 · 장애 · 거주지 선택" },
        { n: "02", t: "실업급여 실업인정 특례 조건은 무엇인가요?", sub: "50세 이상 · 장애인 · 임신 · 원거리" },
        { n: "03", t: "실업급여 실업인정 온라인 대상자는 누구인가요?", sub: "고용24 온라인 인정 · 방문 면제" },
        { n: "04", t: "실업급여 실업인정 특례 구직활동 기준은 어떻게 되나요?", sub: "완화 기준 · 인정 가능 활동" },
        { n: "05", t: "실업급여 실업인정 결과에 이의신청이 가능한가요?", sub: "심사청구 90일 · 재심사청구" },
        { n: "FAQ", t: "자주 묻는 질문", sub: "특례 대상자 범위 · 이의신청 방법" },
      ]} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 — 체커 */}
      <Sec n="01" id="checker" title="실업인정 특례 해당 여부 확인" sub="나이 · 장애 · 거주지 선택">
        <CheckerShell
          title="나는 실업인정 특례 대상자일까?"
          subtitle="30초 확인"
          intro="나이, 장애 여부, 거주지 등을 선택하면 특례 해당 여부를 알 수 있어요."
        >
          <CheckerQ
            n={1}
            group="q1"
            label="현재 상황이 어떻게 되나요?"
            opts={[
              ["over50", "50세 이상"],
              ["disabled", "장애인 (등록 장애인)"],
              ["pregnant", "임신 중이거나 출산 후 6개월 이내"],
              ["remote", "고용센터에서 50km 이상 거주"],
              ["normal", "해당 사항 없음"],
            ]}
            sel={q1}
            pick={(v) => setQ1(v as Q1)}
          />
          <CheckerQ
            n={2}
            group="q2"
            label="4주마다 구직활동을 했나요?"
            opts={[
              ["yes", "예, 구직활동 내역이 있어요"],
              ["no", "아니요, 구직활동이 부족해요"],
            ]}
            sel={q2}
            pick={(v) => setQ2(v as Q2)}
          />
          <CheckerQ
            n={3}
            group="q3"
            label="실업인정 신청 방법은 어떻게 할 예정인가요?"
            opts={[
              ["online", "고용24 온라인 신청"],
              ["visit", "고용센터 방문 신청"],
            ]}
            sel={q3}
            pick={(v) => setQ3(v as Q3)}
          />
          <CheckerQ
            n={4}
            group="q4"
            label="실업인정 결과에 이의가 있나요?"
            opts={[
              ["normal_proceed", "아니요, 정상적으로 진행 중이에요"],
              ["objection", "예, 결과에 이의가 있어요"],
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
      <Sec n="02" id="condition" title="실업급여 실업인정 특례 조건은 무엇인가요?" sub="50세 이상 · 장애인 · 임신 · 원거리">
        <P>실업인정 특례는 일반 수급자보다 구직활동 기준이 완화되거나 고용센터 방문 없이 온라인으로만 실업인정을 받을 수 있는 제도예요. <A href="https://www.law.go.kr/법령/고용보험법시행규칙">고용보험법 시행규칙 제92조</A>에서 특례 대상을 규정하고 있어요.</P>
        <P>주요 특례 대상자는 <B>50세 이상</B>, <B>등록 장애인</B>, <B>임신 중이거나 출산 후 6개월 이내인 자</B>, <B>고용센터에서 50km 이상 거주하는 자</B>, <B>가족 간호가 필요한 자</B> 등이에요. 이들은 온라인 실업인정 대상자로 분류돼요.</P>
        <P>특례 대상자가 아니더라도 <B>재취업훈련 중인 경우</B>나 <B>취업활동 계획서를 제출한 경우</B> 일부 구직활동 요건이 완화될 수 있어요. 고용센터 상담을 통해 개인 상황에 맞는 적용 여부를 확인하는 게 좋아요.</P>
        <P>특례 인정은 수급자격 인정 시 자동으로 구분돼요. 별도의 특례 신청이 필요하지 않고, 처음 수급자격 인정신청 시 제출한 정보를 바탕으로 고용센터에서 판단해요.</P>

        <TableTitle>실업인정 특례 주요 대상 및 혜택</TableTitle>
        <TH cols={["대상", "특례 내용"]} rows={[
          ["50세 이상", "고용24 온라인 실업인정 신청 가능 (방문 면제)"],
          ["장애인 (등록)", "구직활동 인정 기준 완화, 온라인 실업인정"],
          ["임신·출산 후 6개월", "구직활동 완화, 수급기간 연장 가능"],
          ["원거리 거주 (50km+)", "고용24 온라인 실업인정 신청 가능"],
          ["재취업훈련 중", "훈련 참여가 구직활동으로 자동 인정"],
        ]} />
        <TableNote>* 고용보험법 시행규칙 제92조 기준이에요.</TableNote>

        <InlineLink
          icon="📋"
          title="실업급여 신청 방법 전체 안내"
          desc="실업신고부터 수급자격 인정, 실업인정까지 전체 절차"
          href="/w/실업급여-신청방법"
        />
        <SpokeLink num={1} title="실업급여 이의신청 심사청구 절차" desc="실업인정 거부 시 90일 이내 심사청구 방법" href="/w/실업급여-이의신청-심사청구-재심사-불복-절차" />
      </Sec>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="online" title="실업급여 실업인정 온라인 대상자는 누구인가요?" sub="고용24 온라인 인정 · 방문 면제">
        <P>온라인 실업인정 대상자는 <B>고용24 앱 또는 웹사이트</B>에서 고용센터 방문 없이 실업인정 신청이 가능해요. 4주마다 구직활동 내역을 온라인으로 입력하고 인정받으면 실업급여가 지급돼요.</P>
        <P>특례 대상이 아닌 일반 수급자도 최초 몇 회의 출석(방문) 후에는 온라인으로 전환되는 경우가 있어요. 고용센터마다 기준이 다르기 때문에 처음에 안내받은 대로 따르는 게 좋아요.</P>
        <P>온라인 실업인정 신청 시 <B>구직활동 내역</B>을 입력해야 해요. 회사별 지원일, 지원 직종, 결과 등을 기록해요. 허위 입력 시 부정수급으로 처리되니 정확하게 기재해야 해요.</P>
        <P>모바일 앱 <B>'고용24'</B>를 설치하면 스마트폰으로도 실업인정 신청이 가능해요. 알림 설정을 켜두면 인정일 전에 리마인더를 받을 수 있어요.</P>

        <Info type="warn">
          <B>실업인정일을 놓치면 해당 기간 실업급여가 미지급돼요</B><br />
          고용센터에서 지정한 실업인정일(출석일)에 신청하지 않으면 해당 기간 실업급여가 지급되지 않아요. 온라인 대상자도 마감일을 확인하고 기한 내에 제출해야 해요.
        </Info>
      </Sec>

      <RelatedMid
        title="실업급여 수급 관리 관련 글"
        items={[
          { icon: "📋", title: "실업급여 신청 방법 절차", desc: "고용24 온라인 신청 단계별 안내", href: "/w/실업급여-신청방법" },
          { icon: "📅", title: "실업급여 대기기간 안내", desc: "7일 대기기간 및 예외 조건", href: "/w/실업급여-대기기간" },
          { icon: "💼", title: "실업급여 재취업 조건", desc: "조기재취업수당 신청 조건", href: "/w/실업급여-재취업-조건" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="activity" title="실업급여 실업인정 특례 구직활동 기준은 어떻게 되나요?" sub="완화 기준 · 인정 가능 활동">
        <P>일반 수급자는 4주마다 최소 <B>1회 이상의 구직활동</B>을 제출해야 해요. 특례 대상자는 이 기준이 완화되거나 별도의 활동이 구직활동으로 인정될 수 있어요.</P>
        <P>구직활동으로 인정되는 것들이에요. 기업에 <B>입사 지원</B>(서류 접수), <B>면접 참여</B>, 공공 취업지원센터 <B>취업 상담</B>, <B>직업훈련 참여</B>, <B>채용 박람회 참가</B> 등이에요. 정부 지원 훈련에 참여 중이면 훈련 자체가 구직활동으로 인정돼요.</P>
        <P>50세 이상이나 장애인 수급자의 경우 동일한 구직활동이라도 인정 요건이 일반 수급자보다 유연하게 적용될 수 있어요. 취업 가능성이 낮거나 취업 준비에 더 오랜 시간이 걸리는 점을 반영한 거예요.</P>
        <P>구직활동 내역은 입사 지원 사이트 스크린샷, 면접 확인서, 상담 확인서 등을 증빙 자료로 제출할 수 있어요. 증빙 없이 내역만 기재해도 인정되는 경우가 많지만 고용센터마다 기준이 달라요.</P>

        <BridgeCard
          q="실업급여를 받으면서 알바를 할 수 있는지 궁금하다면?"
          a="월 60시간 미만 알바는 신고 후 수급이 가능해요. 미신고 시 부정수급이 돼요."
          label="실업급여 알바 가능 여부 확인"
          href="/w/실업급여-받으면서-알바-가능여부"
        />

        <InlineLink
          icon="💼"
          title="실업급여 재취업 조건 및 조기재취업수당"
          desc="잔여 소정급여일수 50% 일시금 수령 방법"
          href="/w/실업급여-재취업-조건"
        />
      </Sec>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="objection" title="실업급여 실업인정 결과에 이의신청이 가능한가요?" sub="심사청구 90일 · 재심사청구">
        <P>실업인정이 거부되거나 실업급여 지급이 정지된 경우 <B>이의신청(심사청구)</B>을 할 수 있어요. 결정을 안 날로부터 <B>90일 이내</B>에 고용보험 심사관에게 심사청구서를 제출하면 돼요.</P>
        <P>심사청구는 고용센터 또는 고용24를 통해 제출할 수 있어요. 심사 결과에도 불복하면 <B>재심사청구</B>가 가능해요. 재심사는 심사 결과를 받은 날로부터 90일 이내에 고용보험심사위원회에 청구해요.</P>
        <P>심사청구 시 이유서를 작성해야 해요. 어떤 이유로 불복하는지, 어떤 사실관계가 잘못 적용됐는지 구체적으로 기재해야 해요. 증빙 자료(구직활동 내역, 입사 지원 확인서 등)를 첨부하면 도움이 돼요.</P>
        <P>심사청구 기간 동안 실업급여 지급은 일시 중지될 수 있어요. 심사 결과 인정이 나면 소급하여 미지급된 실업급여를 받을 수 있어요. 전체 이의신청 절차는 실업급여 이의신청 안내 글을 참고하세요.</P>

        <SpokeLink num={2} title="실업급여 이의신청 심사청구 절차" desc="심사청구 90일 이내 · 재심사청구 전체 안내" href="/w/실업급여-이의신청-심사청구-재심사-불복-절차" />

        <ExtBtn
          badge="고용24 공식"
          text="실업인정 신청 및 심사청구 바로가기"
          cta="신청하기 →"
          href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 이의신청 심사청구 절차", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
        { title: "실업급여 신청 방법 전체 절차", href: "/w/실업급여-신청방법" },
        { title: "실업급여 대기기간 7일 안내", href: "/w/실업급여-대기기간" },
        { title: "실업급여 재취업 조건 안내", href: "/w/실업급여-재취업-조건" },
        { title: "실업급여 받으면서 알바 가능 여부", href: "/w/실업급여-받으면서-알바-가능여부" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 실업신고 방법 안내", href: "/w/실업급여-실업신고" }}
        next={{ title: "실업급여 실업크레딧 안내", href: "/w/실업급여-실업크레딧" }}
      />
    </BlogLayout>
  );
}
