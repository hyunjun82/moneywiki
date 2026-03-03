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
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 대기기간 7일 의미 | 첫 실업인정 전 지급 제외 기간",
  description: "실업급여 신청 후 처음 7일은 급여가 지급되지 않는 대기기간이에요. 왜 존재하는지, 언제 시작·끝나는지, 예외는 없는지 정확히 정리했어요.",
  category: "실업급여",
  keywords: [
    "실업급여 대기기간 7일 의미",
    "실업급여 대기기간 지급 제외 기간",
    "실업급여 대기기간 시작 끝나는 날",
    "실업급여 대기기간 예외 단축 가능",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "수급자격 인정일 다음 날부터 7일이 대기기간으로 급여가 지급되지 않아요",
    "대기기간 7일은 모든 수급자에게 동일하게 적용되며 단축 예외는 없어요",
    "대기기간이 끝나야 첫 실업급여 지급일이 시작돼요",
  ],
  sources: [
    {
      name: "고용보험법 제49조 (대기기간)",
      url: "https://www.law.go.kr/법령/고용보험법/(20240101,20022,20231010)/제49조",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "대기기간 7일 동안 구직활동을 해야 하나요?",
      a: "대기기간 중에도 적극적인 구직활동이 권장되지만, 별도의 구직활동 실적 제출 의무는 없어요. 첫 번째 실업인정일이 대기기간 이후부터 시작되기 때문이에요.",
    },
    {
      q: "대기기간 중에 알바를 하면 어떻게 되나요?",
      a: "대기기간은 아직 수급이 시작되지 않은 기간이지만, 고용보험 피보험자 자격이 발생하는 취업 활동은 신고해야 해요. 대기기간 중 취업 사실이 확인되면 수급 자격에 영향을 줄 수 있어요.",
    },
  ],
  ctaCard: {
    label: "수급 일정 확인",
    mainText: "첫 실업급여 지급일 예상",
    subText: "대기기간 7일 후 첫 인정일 일정 확인",
    url: "https://www.work24.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "실업급여 신청방법", url: "/w/실업급여-신청방법" },
    { title: "실업급여 지급일 첫 입금일", url: "/w/실업급여-지급일-첫-입금일-대기기간" },
  ],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

export default function Page() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function getResult() {
    const q2 = answers["q2"];
    const q3 = answers["q3"];
    if (q2 === "not-yet") return "wait";
    if (q3 === "passed") return "ok";
    if (Object.keys(answers).length >= 4) return "check";
    return null;
  }

  const links: ResLink[] = [
    {
      icon: "📅",
      title: "고용24 수급 일정 조회",
      desc: "대기기간 이후 첫 실업인정일 확인",
      href: "https://www.work24.go.kr",
    },
    {
      icon: "💰",
      title: "첫 실업급여 지급일 안내",
      desc: "대기기간 7일 후 첫 입금까지의 일정",
      href: "/w/실업급여-지급일-첫-입금일-대기기간",
    },
    {
      icon: "📞",
      title: "고용센터 상담 (1350)",
      desc: "대기기간 및 수급 일정 전화 문의",
      href: "https://www.work24.go.kr",
    },
  ];

  const toc = [
    { id: "checker", label: "대기기간 경과 여부 체크" },
    { id: "sec02", label: "대기기간 7일 의미", sub: "지급 제외 이유 · 법적 근거" },
    { id: "sec03", label: "시작 끝나는 날", sub: "수급자격 인정일 기준 계산" },
    { id: "sec04", label: "예외 단축 가능", sub: "예외 없음 · 모두 동일 적용" },
    { id: "sec05", label: "대기기간 중 주의사항", sub: "구직활동 · 취업 신고" },
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
            title="수급 일정 조회"
            desc="대기기간 이후 첫 지급일 확인"
            href="https://www.work24.go.kr"
            label="고용24 확인"
            external
          />
          <SidebarDocs
            title="관련 서류"
            items={[
              { label: "수급자격인정신청서 (고용24)", href: "https://www.work24.go.kr" },
              { label: "고용보험법 제49조 (법제처)", href: "https://www.law.go.kr" },
              { label: "실업인정 신청서", href: "https://www.ei.go.kr" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반 정보 제공 목적으로 작성되었으며, 개인 상황에 따라 다를 수 있어요. 정확한 판단은 고용센터(1350)에 문의하세요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        title="대기기간 7일, 꼭 기다려야 하나요?"
        desc="대기기간은 모든 수급자에게 동일하게 적용되는 의무 기간이에요. 언제 시작·끝나는지 아래 체크로 먼저 파악해 보세요."
      />

      <Sec n="01" id="checker" title="실업급여 대기기간이 지났는지 체크해 보세요" sub="경과 여부 · 수급 시작일 확인">
        <CheckerShell
          title="대기기간 경과 여부 체크"
          desc="4가지 질문으로 첫 수급 시작 여부를 파악해 보세요"
        >
          <CheckerQ
            id="q1"
            question="현재 어떤 상황이신가요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="applied" label="수급자격 신청했어요" />
            <Btn value="approved" label="수급자격 인정받았어요" />
            <Btn value="receiving" label="이미 수급 중이에요" />
          </CheckerQ>
          <CheckerQ
            id="q2"
            question="수급자격 인정일(실업인정 통보일)이 지났나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-passed" label="네, 지났어요" />
            <Btn value="not-yet" label="아직 안 지났어요" />
          </CheckerQ>
          <CheckerQ
            id="q3"
            question="수급자격 인정일로부터 7일이 지났나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="passed" label="네, 7일 지났어요" />
            <Btn value="not-passed" label="아직 7일이 안 됐어요" />
          </CheckerQ>
          <CheckerQ
            id="q4"
            question="첫 실업인정 신청일이 확정됐나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-date" label="네, 날짜 알아요" />
            <Btn value="no-date" label="아직 모르겠어요" />
          </CheckerQ>
          {result === "wait" && (
            <ResultFail
              title="수급자격 인정 대기 중"
              desc="수급자격이 인정되면 그 다음 날부터 대기기간 7일이 시작돼요. 조금 더 기다리세요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "ok" && (
            <ResultPass
              title="대기기간 완료 — 첫 실업인정 준비"
              desc="대기기간 7일이 지났어요. 이제 첫 실업인정 신청을 준비하면 돼요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          )}
          {result === "check" && (
            <ResultFail
              title="대기기간 진행 중"
              desc="수급자격 인정일로부터 7일이 아직 안 지났어요. 대기기간이 끝나면 첫 실업인정을 신청할 수 있어요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>

      <Divider />

      <Sec n="02" id="sec02" title="실업급여 대기기간 7일은 왜 존재하나요?" sub="지급 제외 이유 · 법적 근거">
        <P>
          대기기간이란 수급자격이 인정된 날부터 7일간 실업급여가 지급되지 않는 기간이에요. 고용보험법 제49조에 근거를 두고 있어요. 이 기간 동안에는 적극적으로 구직활동을 시작하도록 유도하는 목적이 있어요.
        </P>
        <P>
          대기기간은 단순히 지급을 늦추는 장치가 아니에요. 실업 상태를 확인하고, 퇴직 후 곧바로 재취업하거나 스스로 해결할 수 있는 사람은 수급 대상에서 자연스럽게 걸러지는 역할도 해요. 많은 나라에서 유사한 제도를 운영하고 있어요.
        </P>
        <P>
          대기기간 7일은 근무일이 아닌 달력 기준 일수예요. 주말이나 공휴일도 포함돼요. 수급자격 인정일의 다음 날부터 시작해서 7일째 되는 날까지가 대기기간이에요.
        </P>
        <P>
          대기기간 동안 지급되지 않은 급여는 나중에 받을 수 없어요. 대기기간은 소정급여일수에 포함되지 않으며, 이 7일은 단순히 지급이 유예되는 게 아니라 수급 대상 기간에서 제외되는 거예요.
        </P>
        <Info type="tip">
          수급자격 인정 전에 미리 이직확인서 발급 및 구직 등록을 해 두면 절차가 빨라져요. 이직 후 빠르게 신청할수록 첫 지급일도 앞당겨져요.
        </Info>
        <InlineLink
          icon="📅"
          title="실업급여 지급일 첫 입금일"
          desc="대기기간 이후 첫 지급일까지의 실제 일정 계산"
          href="/w/실업급여-지급일-첫-입금일-대기기간"
        />
      </Sec>

      <Divider />

      <Sec n="03" id="sec03" title="실업급여 대기기간 시작·끝나는 날은 언제인가요?" sub="수급자격 인정일 기준 계산">
        <P>
          대기기간은 수급자격 인정일의 다음 날부터 시작해요. 예를 들어 3월 1일에 수급자격이 인정되면, 3월 2일이 대기기간 1일째예요. 3월 8일(7일째)까지가 대기기간이에요.
        </P>
        <P>
          대기기간이 끝난 다음 날(3월 9일)부터 구직급여 지급 대상 기간이 시작돼요. 첫 번째 실업인정일은 고용센터에서 별도로 지정해 줘요. 보통 수급자격 인정 후 약 2주 뒤가 첫 실업인정일이에요.
        </P>
        <P>
          수급자격 인정일이 빠를수록 대기기간도 빨리 끝나고 첫 급여도 빨리 받을 수 있어요. 이직 후 빠르게 고용센터를 방문하거나 고용24에서 수급자격 신청을 하는 게 유리한 이유예요.
        </P>
        <P>
          수급자격 신청이 늦어지면 이직일로부터 12개월이 수급 기간 한도예요. 대기기간은 이 12개월 한도에 포함돼요. 신청이 늦을수록 실제로 받을 수 있는 급여가 줄어들 수 있어요.
        </P>
        <InlineLink
          icon="📋"
          title="실업급여 신청방법 절차"
          desc="수급자격 신청부터 첫 실업인정까지의 전체 절차"
          href="/w/실업급여-신청방법"
        />
      </Sec>

      <RelatedMid
        title="실업급여 대기기간 관련 글"
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 보기"
        items={[
          { title: "실업급여 지급일 첫 입금일", href: "/w/실업급여-지급일-첫-입금일-대기기간" },
          { title: "실업급여 신청방법 절차", href: "/w/실업급여-신청방법" },
          { title: "실업급여 구직활동 인정 기준", href: "/w/실업급여-구직활동" },
        ]}
      />

      <Sec n="04" id="sec04" title="실업급여 대기기간 예외나 단축이 가능한가요?" sub="예외 없음 · 모두 동일 적용">
        <P>
          대기기간 7일은 고용보험법에 규정된 의무 기간으로, 단축이나 예외가 없어요. 장애인, 고령자, 저소득층 등 특별한 사정이 있더라도 동일하게 7일이 적용돼요.
        </P>
        <P>
          단, 반복 수급자(최근 5년 이내 3회 이상 수급)의 경우 대기기간이 7일에서 4주로 연장될 수 있어요. 처음 수급이라면 항상 7일이지만, 반복 수급자에게는 더 긴 대기기간이 부과되는 거예요.
        </P>
        <P>
          자발적 이직자(정당한 사유 없는 이직)는 대기기간 7일에 더해 별도의 수급 제한 기간이 적용돼요. 이 경우 대기기간이 끝나도 즉시 수급이 시작되지 않아요. 비자발적 이직자에게만 대기기간 7일 이후 바로 수급이 시작돼요.
        </P>
        <P>
          폐업이나 경영상 이유로 해고된 경우는 비자발적 이직으로 간주되어 대기기간 7일만 적용돼요. 자발적 퇴사지만 정당한 이유(임금 체불, 직장 내 괴롭힘 등)가 인정되는 경우도 동일하게 처리돼요.
        </P>
        <SpokeLink
          num="01"
          title="실업급여 반복수급 감액"
          desc="5년 이내 3회 이상 수급 시 감액 및 대기기간 연장"
          href="/w/실업급여-반복수급"
        />
      </Sec>

      <Divider />

      <Sec n="05" id="sec05" title="실업급여 대기기간 중 주의해야 할 것이 있나요?" sub="구직활동 · 취업 신고">
        <P>
          대기기간 중에도 취업(창업 포함)이 발생하면 고용센터에 신고해야 해요. 대기기간은 급여만 지급되지 않을 뿐, 수급 자격은 여전히 유지되는 상태예요. 취업 신고를 하지 않으면 나중에 부정수급 문제가 생길 수 있어요.
        </P>
        <P>
          대기기간 중 질병이나 부상으로 구직활동이 어렵다면 상병급여 전환을 고려해볼 수 있어요. 상병급여는 구직 중 질병이 발생했을 때 실업급여를 대신해 지급되는 제도예요. 고용센터에 문의하세요.
        </P>
        <P>
          대기기간 중 해외에 출국하면 해당 기간이 대기기간에서 제외돼요. 출국 기간이 대기기간 7일을 초과하면 귀국 후 남은 대기기간을 채워야 해요. 해외 출국 시 반드시 고용센터에 사전 신고하세요.
        </P>
        <P>
          대기기간 7일이 끝나고 첫 실업인정 신청을 하면 그 날부터 구직급여가 계산되기 시작해요. 첫 실업인정일까지 구직활동을 활발히 하고 증빙을 준비해 두는 것이 중요해요.
        </P>
        <Info type="warn">
          대기기간이 끝났다고 자동으로 급여가 지급되는 게 아니에요. 첫 실업인정일에 고용24 또는 고용센터에서 반드시 신청해야 첫 급여가 나와요.
        </Info>
        <SpokeLink
          num="02"
          title="실업급여 구직활동 인정 기준"
          desc="인정받는 구직활동 유형과 실업인정 신청 방법"
          href="/w/실업급여-구직활동"
        />
        <a
          href="https://www.work24.go.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="ext-btn ext-btn-black"
        >
          <span className="ext-btn-badge">고용24 공식</span>
          <span className="ext-btn-text">수급자격 신청 및 실업인정 바로가기</span>
          <span className="ext-btn-cta">바로가기 →</span>
        </a>
      </Sec>

      <Divider />

      <Sec n="06" id="faq" title="자주 묻는 질문" sub="대기기간 · 지급 시작 · 예외">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles
        items={[
          { title: "실업급여 지급일 첫 입금일 계산", href: "/w/실업급여-지급일-첫-입금일-대기기간" },
          { title: "실업급여 신청방법 온라인 절차", href: "/w/실업급여-신청방법" },
          { title: "실업급여 반복수급 감액 기준", href: "/w/실업급여-반복수급" },
          { title: "실업급여 구직활동 인정 기준", href: "/w/실업급여-구직활동" },
          { title: "실업급여 수급기간 몇 개월 받나요", href: "/w/실업급여-수급기간-몇개월-받나요" },
        ]}
      />
      <PrevNext
        prev={{ title: "실업급여 기초일액 계산", href: "/w/실업급여-기초일액" }}
        next={{ title: "실업급여 반복수급 감액", href: "/w/실업급여-반복수급" }}
      />
    </BlogLayout>
  );
}
