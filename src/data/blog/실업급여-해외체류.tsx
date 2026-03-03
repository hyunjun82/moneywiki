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
  title: "실업급여 해외체류 출국 신고 의무 | 42일 이상 수급 중단 처리",
  description: "실업급여 수급 중 해외 출국을 계획하고 있다면, 출국 전 고용센터에 반드시 신고해야 해요. 42일 이상 장기 체류 시 수급이 중단되고, 귀국 후 재개 신청 절차를 거쳐야 다시 받을 수 있어요.",
  category: "실업급여",
  keywords: [
    "실업급여 해외체류 출국 신고 의무",
    "실업급여 해외체류 42일 이상 수급 중단",
    "실업급여 해외체류 수급 재개 신청 방법",
    "실업급여 해외체류 미신고 출국 부정수급",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "수급 중 해외 출국 전 고용센터에 사전 신고 의무가 있어요",
    "42일 이상 장기 체류 시 수급이 자동 중단되고 귀국 후 재개 신청해야 해요",
    "사전 신고 없이 출국하면 부정수급으로 전액 반환 처분을 받을 수 있어요",
  ],
  sources: [
    {
      name: "고용보험법 시행규칙 제92조 (해외 출국 신고)",
      url: "https://www.law.go.kr/법령/고용보험법시행규칙/(20231010,0110,20230926)/제92조",
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
      q: "실업급여 수급 중 단기 해외여행도 신고해야 하나요?",
      a: "네, 1박 이상의 해외 출국은 모두 사전 신고 대상이에요. 단기 여행이라도 출국 전 관할 고용센터에 출국 예정 일정을 신고하면 실업인정을 유지할 수 있어요. 신고 없이 출국하면 해당 기간 수급이 취소돼요.",
    },
    {
      q: "42일 이상 해외 체류 후 귀국하면 남은 수급 기간을 이어 받을 수 있나요?",
      a: "네, 가능해요. 귀국 후 14일 이내에 관할 고용센터를 방문해 수급 재개 신청을 하면 남은 소정급여일수를 이어서 받을 수 있어요. 단, 해외 체류 기간은 소정급여일수에서 차감되지 않지만 수급 기간(최대 1년) 내에 사용해야 해요.",
    },
  ],
  ctaCard: {
    label: "출국 신고",
    mainText: "해외 출국 전 고용센터에 사전 신고",
    subText: "신고 방법과 필요 서류를 미리 파악하세요",
    url: "https://www.work24.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "실업급여 부정수급 처벌", url: "/w/실업급여-부정수급" },
    { title: "실업급여 신청 방법", url: "/w/실업급여-신청방법" },
  ],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

export default function Page() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function getResult() {
    const q2 = answers["q2"];
    const q3 = answers["q3"];
    const q4 = answers["q4"];
    if (q2 === "no-report") return "warn";
    if (q3 === "over42") return "stop";
    if (q4 === "no-reapply") return "check";
    if (Object.keys(answers).length >= 4) return "ok";
    return null;
  }

  const links: ResLink[] = [
    {
      icon: "✈️",
      title: "고용24 해외 출국 신고",
      desc: "출국 전 온라인으로 신고하는 방법",
      href: "https://www.work24.go.kr",
    },
    {
      icon: "🔄",
      title: "수급 재개 신청 안내",
      desc: "귀국 후 실업인정 재개 신청 절차",
      href: "https://www.ei.go.kr",
    },
    {
      icon: "📋",
      title: "부정수급 자진신고",
      desc: "미신고 출국 시 자진신고 감면 절차",
      href: "https://www.work24.go.kr",
    },
  ];

  const toc = [
    { id: "checker", label: "해외체류 수급 가능 여부 체크" },
    { id: "sec02", label: "출국 신고 의무", sub: "신고 대상 · 신고 기한" },
    { id: "sec03", label: "42일 기준 수급 중단", sub: "중단 시점 · 예외 규정" },
    { id: "sec04", label: "귀국 후 수급 재개", sub: "재개 신청 · 필요 서류" },
    { id: "sec05", label: "미신고 출국 처벌", sub: "부정수급 유형 · 제재 수위" },
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
            title="해외 출국 신고"
            desc="출국 전 고용센터에 사전 신고 필수"
            href="https://www.work24.go.kr"
            label="고용24 신고"
            external
          />
          <SidebarDocs
            title="필요 서류"
            items={[
              { label: "해외 출국 신고서 (고용24)", href: "https://www.work24.go.kr" },
              { label: "출입국사실증명서 (정부24)", href: "https://www.gov.kr" },
              { label: "수급 재개 신청서", href: "https://www.ei.go.kr" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반 정보 제공 목적으로 작성되었으며, 개인 상황에 따라 다를 수 있어요. 정확한 판단은 고용센터(1350)에 문의하세요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        title="해외 출국 예정이신가요?"
        desc="수급 중 해외 출국은 신고만 제대로 하면 문제 없어요. 아래 체크로 본인 상황부터 파악해 보세요."
      />

      <Sec n="01" id="checker" title="실업급여 수급 중 해외 출국해도 될까요?" sub="수급 유지 여부 · 즉시 체크">
        <CheckerShell
          title="해외체류 수급 가능 여부 체크"
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
            <Btn value="abroad" label="이미 출국 중이에요" />
          </CheckerQ>
          <CheckerQ
            id="q2"
            question="출국 전 고용센터에 사전 신고를 했나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-report" label="네, 신고했어요" />
            <Btn value="no-report" label="신고 안 했어요" />
          </CheckerQ>
          <CheckerQ
            id="q3"
            question="해외 체류 예정 기간이 얼마나 되나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="under42" label="42일 미만이에요" />
            <Btn value="over42" label="42일 이상이에요" />
          </CheckerQ>
          <CheckerQ
            id="q4"
            question="귀국 후 수급 재개 신청을 했나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-reapply" label="네, 신청했어요" />
            <Btn value="no-reapply" label="아직 신청 안 했어요" />
          </CheckerQ>
          {result === "warn" && (
            <ResultFail
              title="미신고 출국 — 부정수급 위험"
              desc="사전 신고 없이 출국하면 해당 기간 수급이 취소되고 부정수급으로 처리될 수 있어요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "stop" && (
            <ResultFail
              title="42일 이상 — 수급 중단 후 재개 신청 필요"
              desc="42일 이상 해외 체류 시 수급이 자동 중단돼요. 귀국 후 14일 이내에 재개 신청을 해야 해요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "check" && (
            <ResultFail
              title="귀국 후 재개 신청 필요"
              desc="귀국 후 14일 이내에 고용센터를 방문해 수급 재개 신청을 해야 남은 급여를 받을 수 있어요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "ok" && (
            <ResultPass
              title="정상 수급 유지 가능"
              desc="사전 신고를 했고 체류 기간도 적절하다면 수급에 문제가 없어요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          )}
        </CheckerShell>
      </Sec>

      <Divider />

      <Sec n="02" id="sec02" title="실업급여 해외체류 출국 전 신고해야 하나요?" sub="신고 대상 · 신고 기한">
        <P>
          실업급여 수급 중에 해외로 출국하려면 출국 전에 관할 고용센터에 반드시 신고해야 해요. 1박 이상의 해외 출국은 모두 신고 대상이에요. 단순 당일치기 국내 여행이 아닌, 비행기를 타고 출국하는 경우는 무조건 신고가 필요해요.
        </P>
        <P>
          신고 방법은 두 가지예요. 고용24(work24.go.kr)에서 온라인으로 신고하거나, 관할 고용센터를 직접 방문해서 신고할 수 있어요. 신고 시에는 출국 예정일, 목적지, 체류 기간을 제출해야 해요. 가능하면 출국 3일 전까지 신고하는 것이 좋아요.
        </P>
        <P>
          해외 출국이 불가피한 경우(가족 장례, 의료 목적 등)라도 신고 의무는 동일해요. 단, 실업인정일이 체류 기간과 겹치면 미리 고용센터에 상담해서 실업인정 방식을 조정해야 해요.
        </P>
        <P>
          출국 신고를 하면 체류 기간 동안 구직활동 의무가 면제될 수 있어요. 하지만 해외 체류 기간은 소정급여일수에서 차감되지 않는 대신, 수급 기간(최대 1년) 내에서 소화해야 해요. 수급 기간 만료 전에 귀국해야 잔여 급여를 받을 수 있어요.
        </P>
        <Info type="tip">
          구직활동을 위한 해외 취업 면접이나 연수도 신고 후 수급이 유지될 수 있어요. 목적과 기간을 고용센터에 설명하면 실업인정 방법을 안내받을 수 있어요.
        </Info>
        <InlineLink
          icon="📋"
          title="실업급여 구직활동 인정 방법"
          desc="수급 중 구직활동 인정 기준과 해외 활동 처리 방법"
          href="/w/실업급여-신청방법"
        />
      </Sec>

      <Divider />

      <Sec n="03" id="sec03" title="실업급여 해외체류 42일 이상이면 수급이 중단되나요?" sub="중단 시점 · 예외 규정">
        <P>
          해외 체류 기간이 42일을 초과하면 수급이 자동으로 중단돼요. 고용보험법 시행규칙에서 정한 기준으로, 장기 해외 체류 중에는 적극적인 구직활동이 어렵다고 보기 때문이에요. 42일은 '실업급여 수급 기간 중 해외 체류'에 적용되는 상한선이에요.
        </P>
        <P>
          42일 기준은 연속 체류 기간을 기준으로 해요. 짧은 귀국을 반복하면서 총 체류일이 늘어나도 연속으로 42일을 넘지 않으면 수급이 유지돼요. 단, 이런 방식으로 신고 없이 반복 출국하면 부정수급으로 볼 수 있어요.
        </P>
        <P>
          유학, 장기 해외 연수, 배우자 해외 발령 동반 등 불가피한 사정으로 42일을 초과하는 경우도 있어요. 이 경우 고용센터에 미리 상황을 설명하면, 경우에 따라 수급 기간 연장 등의 조치를 받을 수 있어요.
        </P>
        <P>
          42일을 초과해 수급이 중단되더라도 잔여 소정급여일수는 소멸되지 않아요. 귀국 후 수급 재개 신청을 하면 남은 급여를 이어서 받을 수 있어요. 단, 수급 기간(최대 1년) 내에서만 가능하니 기간 계산을 잘 해야 해요.
        </P>
        <InlineLink
          icon="📅"
          title="실업급여 소정급여일수 계산"
          desc="가입기간·나이별 소정급여일수와 수급 기간 만료일 계산"
          href="/w/실업급여-소정급여일수"
        />
      </Sec>

      <RelatedMid
        title="실업급여 해외체류 관련 글"
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 보기"
        items={[
          { title: "실업급여 부정수급 처벌 기준", href: "/w/실업급여-부정수급" },
          { title: "실업급여 수급 조건 180일", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 신청 방법 절차", href: "/w/실업급여-신청방법" },
        ]}
      />

      <Sec n="04" id="sec04" title="실업급여 해외체류 귀국 후 수급을 재개할 수 있나요?" sub="재개 신청 · 필요 서류">
        <P>
          귀국 후에는 14일 이내에 관할 고용센터를 방문해 수급 재개 신청을 해야 해요. 이 기간을 넘기면 재개 신청이 불가능해질 수 있고, 잔여 급여를 받지 못하게 될 수 있어요. 귀국 날짜를 기억해 두고 빠르게 신청하는 게 중요해요.
        </P>
        <P>
          수급 재개 신청 시 필요한 서류는 출입국사실증명서(정부24에서 발급)와 신분증이에요. 출입국사실증명서는 출국·귀국 날짜가 정확히 기재되어 있어야 해요. 고용24 온라인으로도 신청할 수 있으나, 첫 방문 시에는 고용센터에 직접 가는 것이 편리해요.
        </P>
        <P>
          재개 신청이 완료되면 귀국일 다음 날부터 실업인정이 다시 시작돼요. 기존 실업인정 주기(보통 2주마다)에 따라 구직활동 실적을 제출하면 급여가 지급돼요. 귀국 후에도 적극적인 구직활동을 유지해야 수급이 이어져요.
        </P>
        <P>
          수급 재개 신청 절차는 아래와 같아요. 준비 서류를 미리 챙겨 두면 한 번 방문으로 처리할 수 있어요.
        </P>
        <Steps
          items={[
            {
              title: "출입국사실증명서 발급",
              desc: "정부24(gov.kr) 또는 출입국·외국인청에서 출입국사실증명서를 발급받아요. 온라인 발급이 빠르고 무료예요.",
            },
            {
              title: "관할 고용센터 방문",
              desc: "귀국 후 14일 이내에 관할 고용센터를 방문해요. 신분증과 출입국사실증명서를 지참하세요.",
            },
            {
              title: "수급 재개 신청서 작성",
              desc: "담당자 안내에 따라 수급 재개 신청서를 작성해요. 해외 체류 목적과 기간을 확인받아요.",
            },
            {
              title: "실업인정 재시작",
              desc: "귀국일 다음 날부터 실업인정이 재개돼요. 기존 주기에 맞춰 구직활동 실적을 계속 제출해요.",
            },
          ]}
        />
        <SpokeLink
          num="01"
          title="실업급여 실업인정 신청"
          desc="실업인정일마다 구직활동 실적 제출 방법과 주기 안내"
          href="/w/실업급여-신청방법"
        />
      </Sec>

      <Divider />

      <Sec n="05" id="sec05" title="실업급여 해외체류 미신고 출국하면 어떻게 되나요?" sub="부정수급 유형 · 제재 수위">
        <P>
          사전 신고 없이 해외에 출국하면 해당 기간 동안 받은 실업급여는 부정수급으로 처리돼요. 고용보험법 제116조에 따라 수급액 전액 반환과 최대 5배의 추가징수가 부과돼요. 형사고발 시 1년 이하 징역 또는 1,000만 원 이하 벌금도 가능해요.
        </P>
        <P>
          단, 자진신고를 하면 추가징수액이 50% 감면돼요. 적발되기 전에 스스로 신고하면 2.5배로 줄어들어요. 고용센터가 먼저 파악하면 5배 전액이 부과되니, 발각 전 자진신고가 훨씬 유리해요.
        </P>
        <P>
          고용센터는 출입국관리청과 데이터를 공유하고 있어요. 실업인정 기간 중 출국 기록이 확인되면 자동으로 부정수급 조사가 시작돼요. 단 하루의 미신고 출국도 적발될 수 있으니 신고를 소홀히 해서는 안 돼요.
        </P>
        <P>
          이미 미신고 출국 상태라면 귀국 즉시 자진신고하는 것이 최선이에요. 자진신고 창구는 고용24(work24.go.kr) 또는 관할 고용센터 방문으로 가능해요. 자진신고 시 추가징수 감면과 함께 형사고발 면제 혜택도 받을 수 있어요.
        </P>
        <Info type="warn">
          단기 여행이라도 신고 없이 출국하면 부정수급이에요. 하루 이상 해외 체류 시 고용센터에 반드시 사전 신고하세요.
        </Info>
        <SpokeLink
          num="02"
          title="실업급여 부정수급 처벌"
          desc="미신고 출국·알바·창업 시 전액 반환 + 최대 5배 추가징수"
          href="/w/실업급여-부정수급"
        />
        <a
          href="https://www.work24.go.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="ext-btn ext-btn-black"
        >
          <span className="ext-btn-badge">고용24 공식</span>
          <span className="ext-btn-text">해외 출국 신고 및 자진신고 바로가기</span>
          <span className="ext-btn-cta">바로가기 →</span>
        </a>
      </Sec>

      <Divider />

      <Sec n="06" id="faq" title="자주 묻는 질문" sub="해외체류 · 신고 의무 · 수급 재개">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles
        items={[
          { title: "실업급여 부정수급 형사처벌 기준", href: "/w/실업급여-부정수급" },
          { title: "실업급여 알바 미신고 5배 환수", href: "/w/실업급여-알바-미신고" },
          { title: "실업급여 창업 사업자등록 수급 중단", href: "/w/실업급여-창업" },
          { title: "실업급여 수급조건 피보험기간 180일", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 신청 방법 절차", href: "/w/실업급여-신청방법" },
        ]}
      />
      <PrevNext
        prev={{ title: "실업급여 창업 사업자등록", href: "/w/실업급여-창업" }}
        next={{ title: "실업급여 수급 조건", href: "/w/실업급여-수급-조건" }}
      />
    </BlogLayout>
  );
}
