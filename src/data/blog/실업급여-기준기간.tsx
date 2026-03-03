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
  title: "실업급여 기준기간 18개월 산정 | 피보험 단위기간 180일 기준",
  description: "실업급여를 받으려면 이직일 이전 18개월 내 피보험 단위기간이 180일 이상이어야 해요. 기준기간이 왜 18개월인지, 180일을 어떻게 계산하는지 쉽게 정리했어요.",
  category: "실업급여",
  keywords: [
    "실업급여 기준기간 18개월 산정",
    "실업급여 기준기간 피보험 단위기간 180일",
    "실업급여 기준기간 일용직 24개월 기준",
    "실업급여 기준기간 복수 직장 합산 방법",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "이직일 이전 18개월 내 피보험 단위기간 180일 이상이면 수급 가능해요",
    "일용직은 기준기간이 24개월로 더 넓게 적용돼요",
    "여러 직장의 피보험기간을 합산해서 180일을 채울 수 있어요",
  ],
  sources: [
    {
      name: "고용보험법 제40조 (구직급여의 수급 요건)",
      url: "https://www.law.go.kr/법령/고용보험법/(20240101,20022,20231010)/제40조",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "이직일 이전 18개월 동안 두 곳에서 일했는데 합산이 되나요?",
      a: "네, 가능해요. 여러 직장의 피보험 단위기간을 모두 합산할 수 있어요. 단, 중복 기간은 한 번만 인정돼요. 두 곳에서 동시에 근무한 기간은 중복 적용되지 않아요.",
    },
    {
      q: "피보험 단위기간 180일과 실제 근무일 180일은 다른가요?",
      a: "피보험 단위기간은 유급으로 근무한 날의 합산이에요. 무급 결근일, 무급 휴직일은 포함되지 않아요. 반면 유급 휴가(연차 등)는 포함돼요. 주 5일 풀타임 기준 약 6개월이 180일이에요.",
    },
  ],
  ctaCard: {
    label: "피보험기간 조회",
    mainText: "고용24에서 내 피보험기간 조회",
    subText: "실제 피보험 단위기간을 확인하세요",
    url: "https://www.work24.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "실업급여 수급 조건", url: "/w/실업급여-수급-조건" },
    { title: "실업급여 신청방법", url: "/w/실업급여-신청방법" },
  ],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

export default function Page() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function getResult() {
    const q2 = answers["q2"];
    const q3 = answers["q3"];
    if (q2 === "no-period") return "fail";
    if (q3 === "under180") return "check";
    if (Object.keys(answers).length >= 4) return "ok";
    return null;
  }

  const links: ResLink[] = [
    {
      icon: "📊",
      title: "고용24 피보험기간 조회",
      desc: "내 피보험 단위기간을 직접 조회하세요",
      href: "https://www.work24.go.kr",
    },
    {
      icon: "📋",
      title: "실업급여 수급 조건 확인",
      desc: "피보험기간 180일 이상 등 수급 자격",
      href: "/w/실업급여-수급-조건",
    },
    {
      icon: "📞",
      title: "고용센터 상담 (1350)",
      desc: "피보험기간 합산 여부 전화 상담",
      href: "https://www.work24.go.kr",
    },
  ];

  const toc = [
    { id: "checker", label: "피보험기간 180일 충족 여부 체크" },
    { id: "sec02", label: "기준기간 18개월 의미", sub: "이직 전 기간 · 일용직 예외" },
    { id: "sec03", label: "180일 산정 방법", sub: "유급일 기준 · 복수 직장 합산" },
    { id: "sec04", label: "일용직 24개월 기준", sub: "일용직 적용 방식" },
    { id: "sec05", label: "복수 직장 합산 방법", sub: "합산 가능 · 중복 제외 기준" },
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
            title="피보험기간 조회"
            desc="고용24에서 내 가입기간 확인"
            href="https://www.work24.go.kr"
            label="바로 조회"
            external
          />
          <SidebarDocs
            title="관련 서류"
            items={[
              { label: "고용보험 피보험자격 이력 (고용24)", href: "https://www.work24.go.kr" },
              { label: "근로내역 확인서 (건강보험공단)", href: "https://www.nhis.or.kr" },
              { label: "고용보험법 제40조 (법제처)", href: "https://www.law.go.kr" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반 정보 제공 목적으로 작성되었으며, 개인 상황에 따라 다를 수 있어요. 정확한 판단은 고용센터(1350)에 문의하세요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        title="180일이 충족되는지 모르겠나요?"
        desc="기준기간과 피보험 단위기간은 헷갈리기 쉬워요. 아래 체크로 본인 상황을 먼저 파악해 보세요."
      />

      <Sec n="01" id="checker" title="실업급여 피보험기간 180일 충족 여부를 체크해 보세요" sub="기준기간 · 충족 여부 확인">
        <CheckerShell
          title="피보험기간 180일 충족 체크"
          desc="4가지 질문으로 수급 자격 여부를 파악해 보세요"
        >
          <CheckerQ
            id="q1"
            question="현재 상황이 어떻게 되시나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="quit" label="최근에 퇴직했어요" />
            <Btn value="plan" label="퇴직 예정이에요" />
            <Btn value="working" label="재직 중이에요" />
          </CheckerQ>
          <CheckerQ
            id="q2"
            question="이직일 이전 18개월 내 고용보험 가입 근무가 있었나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-period" label="네, 있었어요" />
            <Btn value="no-period" label="아니요, 없었어요" />
          </CheckerQ>
          <CheckerQ
            id="q3"
            question="18개월 내 피보험 단위기간 합산이 180일 이상 될 것 같나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="over180" label="180일 이상 될 것 같아요" />
            <Btn value="under180" label="180일이 안 될 것 같아요" />
          </CheckerQ>
          <CheckerQ
            id="q4"
            question="여러 직장에서 일한 기간이 있나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-multi" label="네, 여러 곳에서 일했어요" />
            <Btn value="no-multi" label="한 곳에서만 일했어요" />
          </CheckerQ>
          {result === "fail" && (
            <ResultFail
              title="피보험기간 충족 불가"
              desc="이직일 이전 18개월 내 고용보험 가입 기간이 없으면 수급 자격이 없어요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "check" && (
            <ResultFail
              title="180일 미충족 가능성"
              desc="여러 직장 기간을 합산해도 180일이 안 되면 수급이 어려워요. 고용24에서 정확한 기간을 조회해 보세요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "ok" && (
            <ResultPass
              title="피보험기간 충족 가능성 높음"
              desc="18개월 내 180일 이상이 충족되면 수급 자격 요건 중 하나를 만족해요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          )}
        </CheckerShell>
      </Sec>

      <Divider />

      <Sec n="02" id="sec02" title="실업급여 기준기간 18개월은 무엇을 의미하나요?" sub="이직 전 기간 · 일용직 예외">
        <P>
          기준기간이란 피보험 단위기간 180일을 채워야 하는 시간적 범위예요. 일반 근로자는 이직일 이전 18개월 이내, 일용직은 24개월 이내예요. 이 기간 안에서만 피보험기간을 합산할 수 있어요.
        </P>
        <P>
          예를 들어 2026년 1월에 퇴직했다면, 2024년 7월부터 2026년 1월까지의 18개월이 기준기간이에요. 이 18개월 내에 고용보험에 가입된 상태로 유급 근무한 일수를 합산해서 180일 이상이면 조건을 충족해요.
        </P>
        <P>
          18개월이라는 기간은 근로자가 일정 기간 이상 재직했음을 확인하기 위한 장치예요. 단기간 취업·이직을 반복하거나 장기 공백이 있는 경우에도 18개월 내 기간을 기준으로 하기 때문에, 최근 근무 이력이 중요해요.
        </P>
        <P>
          18개월 내 근무 이력이 없거나 기간이 짧으면 180일을 충족하기 어려워요. 이 경우 다음 취업 후 충분히 근무한 뒤 다시 도전하는 것이 현실적인 방법이에요.
        </P>
        <Info type="tip">
          육아휴직, 출산휴가, 질병으로 인한 휴직 중에는 고용보험이 유지되지만, 무급이면 피보험 단위기간에 포함되지 않아요. 유급 처리된 기간만 합산돼요.
        </Info>
        <InlineLink
          icon="📋"
          title="실업급여 수급 조건 180일"
          desc="피보험기간 외 비자발적 이직 등 수급 자격 전체 정리"
          href="/w/실업급여-수급-조건"
        />
      </Sec>

      <Divider />

      <Sec n="03" id="sec03" title="실업급여 기준기간 피보험 단위기간 180일은 어떻게 산정하나요?" sub="유급일 기준 · 복수 직장 합산">
        <P>
          피보험 단위기간 180일은 '유급으로 근무한 날'의 합산이에요. 회사에서 급여를 받은 날(실제 근무일 + 유급 휴가일)을 카운트해요. 무급 결근일, 무급 휴직일, 무보수 기간은 제외돼요.
        </P>
        <P>
          주 5일 풀타임 근무자는 월 약 22일 근무하므로, 8개월 근무하면 약 176일이 돼요. 주 5일 기준 약 6~7개월이면 180일을 충족할 수 있어요. 단, 연차 유급 휴가는 포함되므로 실제로는 더 빨리 충족될 수 있어요.
        </P>
        <P>
          파트타임 근무자도 피보험 단위기간은 실제 유급 근무일 기준으로 산정돼요. 주 15시간 미만 단시간 근로자는 고용보험 가입 대상에서 제외될 수 있어요. 주 15시간 이상 근무하면 고용보험 당연 가입 대상이 돼요.
        </P>
        <P>
          정확한 피보험 단위기간은 고용24(work24.go.kr)에서 직접 조회할 수 있어요. '고용보험 피보험자격 이력' 메뉴에서 각 직장별 피보험기간과 합산 결과를 확인할 수 있어요.
        </P>
        <InlineLink
          icon="📊"
          title="실업급여 소정급여일수 나이별"
          desc="가입기간·나이별 소정급여일수 최대 270일 지급 기준"
          href="/w/실업급여-소정급여일수"
        />
      </Sec>

      <RelatedMid
        title="실업급여 기준기간 관련 글"
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 보기"
        items={[
          { title: "실업급여 수급 조건 180일", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 소정급여일수 나이별", href: "/w/실업급여-소정급여일수" },
          { title: "실업급여 신청방법 절차", href: "/w/실업급여-신청방법" },
        ]}
      />

      <Sec n="04" id="sec04" title="실업급여 기준기간 일용직 24개월 기준은 무엇인가요?" sub="일용직 적용 방식">
        <P>
          일용직(일일고용)은 기준기간이 24개월로 일반 근로자보다 6개월 더 길어요. 일용직은 고용 불안정성이 높아 18개월 내 180일을 채우기 어렵기 때문에 더 넓은 범위를 적용해요.
        </P>
        <P>
          일용직의 피보험 단위기간도 유급 근무일 기준이에요. 1일 단위로 고용보험에 가입된 날수를 합산해요. 24개월 이내에 일한 날수 합산이 180일 이상이면 수급 자격을 충족해요.
        </P>
        <P>
          일용직으로 오래 근무한 뒤 정규직으로 전환된 경우, 일용직 기간도 합산에 포함할 수 있어요. 단, 기준기간(18개월 또는 24개월)을 어떻게 적용할지는 이직 당시의 고용 형태에 따라 달라질 수 있어요.
        </P>
        <P>
          일용직으로 실업급여를 신청하려면 이직확인서 발급이 까다로울 수 있어요. 고용보험 가입이 제대로 되어 있는지 고용24에서 확인하고, 문제가 있으면 근로복지공단에 이의를 제기할 수 있어요.
        </P>
        <SpokeLink
          num="01"
          title="실업급여 수급자격 인정"
          desc="비자발적 이직 포함 수급 자격 인정 기준 정리"
          href="/w/실업급여-수급자격-인정"
        />
      </Sec>

      <Divider />

      <Sec n="05" id="sec05" title="실업급여 기준기간 복수 직장 합산은 어떻게 되나요?" sub="합산 가능 · 중복 제외 기준">
        <P>
          18개월 기준기간 내에 여러 직장에서 근무한 경우, 각 직장의 피보험 단위기간을 모두 합산할 수 있어요. A회사 90일 + B회사 100일 = 190일이면 180일 기준을 충족해요. 여러 직장을 거쳤더라도 포기할 필요 없어요.
        </P>
        <P>
          단, 두 직장에 동시에 재직(겸직)한 기간은 중복 계산되지 않아요. 예를 들어 A회사와 B회사에 동시에 다닌 30일은 한 번만 인정돼요. 이를 합산하면 실제보다 기간이 줄어들 수 있어요.
        </P>
        <P>
          합산은 고용24나 고용센터에서 자동으로 처리해 줘요. 수급 신청 시 제출하는 이직확인서와 고용보험 이력을 기반으로 담당자가 계산해요. 본인이 직접 계산하지 않아도 돼요.
        </P>
        <P>
          기준기간(18개월)을 벗어난 이전 직장 기간은 합산되지 않아요. 2년 전에 다닌 직장의 피보험기간은 포함되지 않으니, 최근 근무 이력을 기준으로 계산해야 해요.
        </P>
        <Info type="warn">
          고용보험 미가입 사업장에서의 근무는 피보험 단위기간에 포함되지 않아요. 고용보험에 가입된 사업장에서 근무한 기간만 인정돼요.
        </Info>
        <SpokeLink
          num="02"
          title="실업급여 피보험기간 180일 계산"
          desc="실제 계산 사례로 보는 피보험 단위기간 180일 충족 방법"
          href="/w/실업급여-피보험기간-180일-계산"
        />
        <a
          href="https://www.work24.go.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="ext-btn ext-btn-black"
        >
          <span className="ext-btn-badge">고용24 공식</span>
          <span className="ext-btn-text">고용보험 피보험자격 이력 조회</span>
          <span className="ext-btn-cta">바로가기 →</span>
        </a>
      </Sec>

      <Divider />

      <Sec n="06" id="faq" title="자주 묻는 질문" sub="기준기간 · 피보험기간 · 합산">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles
        items={[
          { title: "실업급여 수급조건 피보험기간 180일", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 소정급여일수 나이별 기준", href: "/w/실업급여-소정급여일수" },
          { title: "실업급여 신청방법 온라인 절차", href: "/w/실업급여-신청방법" },
          { title: "실업급여 구직활동 인정 기준", href: "/w/실업급여-구직활동" },
          { title: "실업급여 대기기간 7일 의미", href: "/w/실업급여-대기기간" },
        ]}
      />
      <PrevNext
        prev={{ title: "실업급여 수급 조건", href: "/w/실업급여-수급-조건" }}
        next={{ title: "실업급여 기초일액 계산", href: "/w/실업급여-기초일액" }}
      />
    </BlogLayout>
  );
}
