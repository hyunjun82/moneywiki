// @ts-nocheck
"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  TH, THL, TableTitle, TableNote, Tag,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA, Btn, ChipsGrid,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc,
  Steps,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 창업 가능 여부 | 사업자등록 수급 중단 조건",
  description: "실업급여 수급 중 창업을 고려하고 있다면, 사업자등록 시점에 따라 수급이 중단될 수 있으니 미리 알아두는 게 중요해요. 조기재취업수당으로 전환하거나 사전 신고 절차를 거치면 불이익 없이 창업할 수 있어요.",
  category: "실업급여",
  keywords: [
    "실업급여 창업 가능 여부 기준",
    "실업급여 창업 사업자등록 수급 중단",
    "실업급여 창업 조기재취업수당 신청",
    "실업급여 창업 미신고 부정수급 처벌",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "수급 중 사업자등록을 하면 그 날부터 수급 자격이 종료돼요",
    "소정급여일수 절반 이상 남으면 조기재취업수당으로 일시금 수령 가능해요",
    "미신고 창업은 전액 반환 + 최대 5배 추가징수 처벌을 받아요",
  ],
  sources: [
    {
      name: "고용보험법 제64조 (조기재취업수당)",
      url: "https://www.law.go.kr/법령/고용보험법/(20240101,20022,20231010)/제64조",
      date: "2026-02",
    },
    {
      name: "고용보험법 제116조 (부정수급 제재)",
      url: "https://www.law.go.kr/법령/고용보험법/(20240101,20022,20231010)/제116조",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "실업급여 수급 중 사업자등록을 하면 바로 수급이 끊기나요?",
      a: "네, 사업자등록을 한 날부터 수급 자격이 종료돼요. 다만 소정급여일수 절반 이상이 남아 있고 12개월 이상 계속 사업을 유지할 계획이라면, 조기재취업수당으로 전환해 남은 급여의 절반을 일시금으로 받을 수 있어요.",
    },
    {
      q: "프리랜서로 일하면서 실업급여를 받으면 창업으로 간주되나요?",
      a: "프리랜서 활동 자체가 창업은 아니지만, 소득이 발생하면 신고 의무가 있어요. 수급 중 알바나 프리랜서로 수입이 생기면 취업 또는 근로 사실로 고용센터에 신고해야 해요. 미신고 시 부정수급으로 처벌받을 수 있어요.",
    },
  ],
  ctaCard: {
    label: "조기재취업수당",
    mainText: "창업 전 남은 급여의 50% 일시금 수령",
    subText: "신청 조건과 절차를 파악해 두세요",
    url: "https://www.ei.go.kr/ei/eih/cm/hm/main.do",
    external: true,
  },
  relatedDocs: [
    { title: "실업급여 수급 조건", url: "/w/실업급여-수급-조건" },
    { title: "실업급여 부정수급 처벌", url: "/w/실업급여-부정수급" },
  ],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

export default function Page() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function getResult() {
    const q2 = answers["q2"];
    const q3 = answers["q3"];
    const q4 = answers["q4"];
    if (q2 === "yes-reg") return "stop";
    if (q3 === "early") return "early";
    if (q4 === "no-report") return "warn";
    if (Object.keys(answers).length >= 4) return "ok";
    return null;
  }

  const links: ResLink[] = [
    {
      icon: "🏢",
      title: "고용24 창업 신고",
      desc: "사업자등록 전 고용센터에 신고하는 방법",
      href: "https://www.work24.go.kr",
    },
    {
      icon: "💰",
      title: "조기재취업수당 안내",
      desc: "창업으로 조기재취업수당 받는 조건 확인",
      href: "https://www.ei.go.kr",
    },
    {
      icon: "📋",
      title: "부정수급 자진신고",
      desc: "미신고 창업 시 자진신고 감면 절차",
      href: "https://www.work24.go.kr",
    },
  ];

  const toc = [
    { id: "checker", label: "창업 수급 가능 여부 체크" },
    { id: "sec02", label: "창업 가능 기준", sub: "허용 조건 · 신고 의무" },
    { id: "sec03", label: "사업자등록 영향", sub: "수급 중단 시점 · 처리 방법" },
    { id: "sec04", label: "조기재취업수당 신청", sub: "신청 조건 · 신청 절차" },
    { id: "sec05", label: "미신고 처벌 기준", sub: "부정수급 유형 · 제재 수위" },
    { id: "faq", label: "자주 묻는 질문" },
  ];

  const result = getResult();

  return (
    <BlogLayout
      meta={meta}
      toc={toc}
      sidebar={
        <>
          <SidebarCTA
            title="조기재취업수당"
            desc="창업 시 남은 급여 50% 일시금"
            href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
            label="신청 안내"
            external
          />
          <SidebarDocs
            title="관련 서류"
            items={[
              { label: "창업 신고서 (고용24)", href: "https://www.work24.go.kr" },
              { label: "조기재취업수당 신청서", href: "https://www.ei.go.kr" },
              { label: "사업자등록 신청 (홈택스)", href: "https://www.hometax.go.kr" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반 정보 제공 목적으로 작성되었으며, 개인 상황에 따라 다를 수 있어요. 정확한 판단은 고용센터(1350)에 문의하세요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        title="창업 준비 중이신가요?"
        desc="수급 중 창업 시점에 따라 받을 수 있는 혜택이 달라져요. 아래 체크로 본인 상황을 먼저 파악해 보세요."
      />

      <Sec n="01" id="checker" title="실업급여 수급 중 창업해도 될까요?" sub="수급 유지 여부 · 즉시 체크">
        <CheckerShell
          title="창업 수급 가능 여부 체크"
          desc="4가지 질문으로 수급 유지 여부를 파악해 보세요"
        >
          <CheckerQ
            id="q1"
            question="현재 상황이 어떻게 되시나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="now" label="수급 중이에요" />
            <Btn value="plan" label="수급 예정이에요" />
            <Btn value="done" label="이미 창업했어요" />
          </CheckerQ>
          <CheckerQ
            id="q2"
            question="사업자등록을 이미 했나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-reg" label="네, 등록했어요" />
            <Btn value="no-reg" label="아직 안 했어요" />
          </CheckerQ>
          <CheckerQ
            id="q3"
            question="소정급여일수 절반 이상이 남아 있나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="early" label="절반 이상 남았어요" />
            <Btn value="no-early" label="절반 이하 남았어요" />
          </CheckerQ>
          <CheckerQ
            id="q4"
            question="고용센터에 창업 사실을 신고했나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-report" label="네, 신고했어요" />
            <Btn value="no-report" label="아직 신고 안 했어요" />
          </CheckerQ>
          {result === "stop" && (
            <ResultFail
              title="수급 자격 종료 가능성 높음"
              desc="사업자등록 날부터 수급 자격이 종료돼요. 조기재취업수당 전환 가능 여부를 고용센터에 문의하세요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "early" && (
            <ResultPass
              title="조기재취업수당 대상 가능성 높음"
              desc="소정급여일수 절반 이상이 남아 있으면 조기재취업수당으로 일시금 수령이 가능해요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          )}
          {result === "warn" && (
            <ResultFail
              title="신고 필요 — 부정수급 위험"
              desc="창업 사실을 신고하지 않으면 부정수급에 해당해요. 빠른 자진신고로 처벌을 줄일 수 있어요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "ok" && (
            <ResultPass
              title="정상 수급 가능"
              desc="신고 절차를 거쳤다면 수급을 유지하거나 조기재취업수당으로 전환할 수 있어요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          )}
        </CheckerShell>
      </Sec>

      <Divider />

      <Sec n="02" id="sec02" title="실업급여 창업 가능 여부 기준은 어떻게 되나요?" sub="허용 조건 · 신고 의무">
        <P>
          실업급여 수급 중에 창업을 준비하는 것 자체는 금지되어 있지 않아요. 사무실 물색, 사업계획 수립, 마케팅 준비 같은 활동은 수급에 영향을 주지 않아요. 하지만 사업자등록을 하거나 실제 매출이 발생하면 그 시점부터 취업으로 간주돼요.
        </P>
        <P>
          취업 여부의 기준은 단순해요. 보수나 수익이 발생하거나, 고용·사업자 지위를 갖게 되면 취업으로 봐요. 반대로 무보수 봉사 활동이나 단순 학업 준비는 취업으로 보지 않아요. 온라인 플랫폼 수익도 소득이 발생하는 순간부터 신고 의무가 생겨요.
        </P>
        <P>
          수급 중 창업(취업)을 하게 되면 반드시 고용센터에 신고해야 해요. 신고를 하면 수급 종료 처리와 함께 조기재취업수당 해당 여부를 안내받게 돼요. 신고하지 않으면 부정수급으로 처벌받을 수 있어요.
        </P>
        <P>
          창업 준비 기간에도 실업인정일마다 구직활동 실적을 정상 제출해야 수급이 유지돼요. 창업 준비 활동을 구직활동으로 인정받을 수도 있으니, 고용센터에 미리 상담해 보는 게 좋아요.
        </P>
        <Info type="tip">
          사업자등록 전이라도 소득이 발생하면 신고해야 해요. 단순히 등록만 안 했다고 해서 부정수급을 피할 수는 없어요.
        </Info>
        <InlineLink
          icon="📋"
          title="실업급여 부정수급 처벌 기준"
          desc="미신고 창업·알바 시 전액 반환 + 최대 5배 추가징수 처벌"
          href="/w/실업급여-부정수급"
        />
      </Sec>

      <Divider />

      <Sec n="03" id="sec03" title="실업급여 창업 사업자등록을 하면 어떻게 되나요?" sub="수급 중단 시점 · 처리 방법">
        <P>
          사업자등록을 하면 그 날부터 수급 자격이 종료돼요. 등록일 이후에 받은 실업급여는 반환해야 하고, 신고하지 않고 계속 받은 경우 부정수급에 해당해요. 그러므로 사업자등록 전에 반드시 고용센터에 신고하는 것이 중요해요.
        </P>
        <P>
          폐업 후 다시 실업급여를 받으려면 새로운 고용보험 피보험 단위기간(180일 이상)을 충족해야 해요. 수급 중 창업 후 폐업한다고 해서 기존에 남아 있던 소정급여일수를 재사용할 수는 없어요.
        </P>
        <P>
          1인 미디어(유튜브 등) 운영이나 온라인 플랫폼 활동처럼 사업자등록 없이 소득이 발생하는 경우도 있어요. 이 경우에도 소득이 발생하면 신고 의무가 생겨요. 등록 여부와 관계없이 실질적인 사업 활동과 수익이 발생하면 취업으로 봐요.
        </P>
        <P>
          등록 직후 폐업 예정이라도 마찬가지예요. 등록일이 취업일로 처리되므로, 등록 직후 폐업해도 해당 기간의 수급 자격은 종료돼요. 짧은 사업 활동도 수급에 영향을 준다는 점을 꼭 기억하세요.
        </P>
        <InlineLink
          icon="💼"
          title="실업급여 알바 미신고 처벌"
          desc="수급 중 알바·프리랜서 미신고 시 5배 환수 처벌 사례"
          href="/w/실업급여-알바-미신고"
        />
      </Sec>

      <RelatedMid
        title="실업급여 창업 관련 글"
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 보기"
        items={[
          { title: "실업급여 부정수급 처벌 기준", href: "/w/실업급여-부정수급" },
          { title: "실업급여 알바 미신고 처벌", href: "/w/실업급여-알바-미신고" },
          { title: "실업급여 수급 조건 180일", href: "/w/실업급여-수급-조건" },
        ]}
      />

      <Sec n="04" id="sec04" title="실업급여 창업 조기재취업수당 받을 수 있나요?" sub="신청 조건 · 신청 절차">
        <P>
          조기재취업수당은 수급 기간 중 재취업(창업 포함)에 성공했을 때 남은 급여의 일부를 일시금으로 지급하는 제도예요. 창업을 통해 취업한 경우에도 신청할 수 있어요.
        </P>
        <P>
          핵심 조건은 두 가지예요. 첫째, 소정급여일수의 절반 이상이 남아 있어야 해요. 둘째, 재취업(창업) 후 12개월 이상 계속 사업을 유지해야 해요. 두 조건을 모두 충족하면 남은 급여일수의 50%를 일시금으로 받아요.
        </P>
        <P>
          창업으로 조기재취업수당을 신청하려면 사업자등록과 동시에 고용센터에 취업 신고를 해야 해요. 취업일로부터 12개월이 지나야 지급이 확정되므로, 신청 후 실제 입금까지 약 1년이 걸려요. 준비 서류는 사업자등록증 사본, 신분증, 통장 사본이에요.
        </P>
        <P>
          신청 절차는 아래와 같아요. 고용24 온라인 또는 관할 고용센터 방문 모두 가능해요.
        </P>
        <SpokeLink
          num="01"
          title="실업급여 수급 조건"
          desc="피보험기간 180일, 비자발적 이직 등 수급 자격 요약"
          href="/w/실업급여-수급-조건"
        />
        <Steps
          items={[
            {
              title: "고용센터 방문 또는 고용24 접속",
              desc: "사업자등록 후 빠른 시일 내에 관할 고용센터를 방문하거나 고용24(work24.go.kr)에 접속해요.",
            },
            {
              title: "창업(취업) 신고서 제출",
              desc: "사업자등록증 사본, 신분증을 지참하고 취업 신고서를 작성해요. 조기재취업수당 신청 의사도 함께 밝혀요.",
            },
            {
              title: "조기재취업수당 신청서 작성",
              desc: "담당자 안내에 따라 조기재취업수당 신청서를 작성하고 통장 사본을 제출해요.",
            },
            {
              title: "12개월 후 지급 확정",
              desc: "창업일로부터 12개월 이상 사업을 유지하면 지급이 확정돼요. 기간 내 폐업하면 수당이 취소돼요.",
            },
          ]}
        />
      </Sec>

      <Divider />

      <Sec n="05" id="sec05" title="실업급여 창업 미신고하면 어떤 처벌을 받나요?" sub="부정수급 유형 · 제재 수위">
        <P>
          창업 사실을 신고하지 않고 실업급여를 계속 받으면 부정수급에 해당해요. 고용보험법 제116조에 따라 지급받은 금액 전액 반환에 더해 최대 5배의 추가징수가 부과돼요. 형사고발 시 1년 이하 징역 또는 1,000만 원 이하 벌금형도 가능해요.
        </P>
        <P>
          단, 자진신고를 하면 추가징수액이 50% 감면돼요. 적발되기 전에 스스로 신고하면 추가징수가 2.5배로 줄어드는 거예요. 고용센터가 창업 사실을 먼저 파악하면 5배 전액이 부과되니, 발각 전에 신고하는 것이 훨씬 유리해요.
        </P>
        <P>
          창업 외에도 수급 중 알바, 프리랜서 활동, SNS 수익 등 다양한 형태로 부정수급이 발생해요. 소액이라도 신고 없이 수익이 발생했다면 모두 신고 대상이에요. 고용센터는 국세청 과세 자료와 건강보험공단 데이터를 공유하며 적발률을 높이고 있어요.
        </P>
        <P>
          이미 미신고 상태라면 지금 바로 자진신고하는 것이 최선이에요. 자진신고 시 추가징수 50% 감면 외에도 형사고발이 면제될 수 있어요. 자진신고 창구는 고용24 또는 관할 고용센터 방문으로 가능해요.
        </P>
        <Info type="warn">
          사업자등록을 안 했더라도, 실제로 수익이 발생했다면 부정수급에 해당해요. 등록 여부와 관계없이 소득 발생 사실을 신고해야 해요.
        </Info>
        <SpokeLink
          num="02"
          title="실업급여 자진신고 감면"
          desc="자진신고 시 추가징수 50% 감면 및 형사고발 면제 절차"
          href="/w/실업급여-부정수급"
        />
        <a
          href="https://www.work24.go.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="ext-btn ext-btn-black"
        >
          <span className="ext-btn-badge">고용24 공식</span>
          <span className="ext-btn-text">창업 신고 및 자진신고 바로가기</span>
          <span className="ext-btn-cta">바로가기 →</span>
        </a>
      </Sec>

      <Divider />

      <Sec n="06" id="faq" title="자주 묻는 질문" sub="창업 · 사업자등록 · 수급">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles
        items={[
          { title: "실업급여 부정수급 형사처벌 기준", href: "/w/실업급여-부정수급" },
          { title: "실업급여 알바 미신고 5배 환수", href: "/w/실업급여-알바-미신고" },
          { title: "실업급여 수급조건 피보험기간 180일", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 신청 방법 절차", href: "/w/실업급여-신청방법" },
          { title: "실업급여 국민연금 납부예외 신청", href: "/w/실업급여-국민연금-유예" },
        ]}
      />
      <PrevNext
        prev={{ title: "실업급여 알바 미신고", href: "/w/실업급여-알바-미신고" }}
        next={{ title: "실업급여 해외체류 출국", href: "/w/실업급여-해외체류" }}
      />
    </BlogLayout>
  );
}
