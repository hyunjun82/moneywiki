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
  title: "실업급여 구직활동 인정 기준 | 주 1회 이상 증빙 서류 종류",
  description: "실업급여 수급 중 구직활동 실적을 인정받으려면 실업인정일마다 증빙 자료를 제출해야 해요. 어떤 활동이 인정되는지, 미달 시 어떻게 되는지를 정리했어요.",
  category: "실업급여",
  keywords: [
    "실업급여 구직활동 인정 기준",
    "실업급여 구직활동 증빙 서류 종류",
    "실업급여 구직활동 인정 횟수 미달",
    "실업급여 구직활동 온라인 오프라인 유형",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "실업인정 주기마다 1회 이상 구직활동 실적을 제출해야 수급이 유지돼요",
    "온라인(고용24 채용정보 열람)부터 입사지원서 제출, 면접 등 다양한 활동이 인정돼요",
    "구직활동 횟수 미달 시 해당 기간 실업급여가 지급되지 않아요",
  ],
  sources: [
    {
      name: "고용보험법 제44조 (실업의 인정)",
      url: "https://www.law.go.kr/법령/고용보험법/(20240101,20022,20231010)/제44조",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "구직활동 실적이 없어도 실업급여를 받을 수 있나요?",
      a: "아니요, 실업인정 주기마다 1회 이상 구직활동 실적을 제출해야 해요. 실적이 없거나 부족하면 해당 기간 실업급여가 지급되지 않아요. 단, 수급 기간 초기에는 구직활동 의무 횟수가 낮게 적용돼요.",
    },
    {
      q: "온라인 채용공고 열람만으로도 구직활동이 인정되나요?",
      a: "고용24(work24.go.kr)에서 채용정보 열람, 입사지원, 구인처 검색 등 온라인 구직활동이 인정돼요. 단, 단순 열람만으로는 인정되지 않고 입사 지원이나 채용정보 스크랩 등 적극적 활동이 있어야 해요.",
    },
  ],
  ctaCard: {
    label: "구직활동 신고",
    mainText: "고용24에서 실업인정 신청",
    subText: "구직활동 실적을 온라인으로 제출하세요",
    url: "https://www.work24.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "실업급여 신청방법", url: "/w/실업급여-신청방법" },
    { title: "실업급여 수급 조건", url: "/w/실업급여-수급-조건" },
  ],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

export default function Page() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function getResult() {
    const q2 = answers["q2"];
    const q3 = answers["q3"];
    const q4 = answers["q4"];
    if (q2 === "no-submit") return "fail";
    if (q3 === "none") return "warn";
    if (q4 === "no-proof") return "check";
    if (Object.keys(answers).length >= 4) return "ok";
    return null;
  }

  const links: ResLink[] = [
    {
      icon: "💼",
      title: "고용24 실업인정 신청",
      desc: "온라인으로 구직활동 실적 제출 방법",
      href: "https://www.work24.go.kr",
    },
    {
      icon: "📋",
      title: "구직활동 인정 유형 안내",
      desc: "인정되는 구직활동 유형과 증빙 서류",
      href: "https://www.ei.go.kr",
    },
    {
      icon: "📞",
      title: "고용센터 상담",
      desc: "구직활동 인정 여부 전화 상담 (1350)",
      href: "https://www.work24.go.kr",
    },
  ];

  const toc = [
    { id: "checker", label: "구직활동 인정 여부 체크" },
    { id: "sec02", label: "인정 기준", sub: "횟수 · 유형 기준" },
    { id: "sec03", label: "증빙 서류 종류", sub: "온라인 · 오프라인 증빙" },
    { id: "sec04", label: "횟수 미달 불이익", sub: "지급 중단 · 수급 영향" },
    { id: "sec05", label: "온라인 오프라인 유형", sub: "인정 활동 목록" },
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
            title="실업인정 신청"
            desc="구직활동 실적 온라인 제출"
            href="https://www.work24.go.kr"
            label="고용24 바로가기"
            external
          />
          <SidebarDocs
            title="관련 서류"
            items={[
              { label: "입사지원서 (자유 양식)", href: "https://www.work24.go.kr" },
              { label: "채용공고 스크린샷", href: "https://www.work24.go.kr" },
              { label: "면접 확인서", href: "https://www.work24.go.kr" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반 정보 제공 목적으로 작성되었으며, 개인 상황에 따라 다를 수 있어요. 정확한 판단은 고용센터(1350)에 문의하세요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        title="구직활동 실적이 걱정되시나요?"
        desc="어떤 활동이 인정되는지 모르면 수급이 끊길 수 있어요. 아래 체크로 본인 상황을 먼저 파악해 보세요."
      />

      <Sec n="01" id="checker" title="실업급여 구직활동 인정 여부를 체크해 보세요" sub="실적 제출 · 인정 여부 확인">
        <CheckerShell
          title="구직활동 인정 여부 체크"
          desc="4가지 질문으로 구직활동 인정 여부를 파악해 보세요"
        >
          <CheckerQ
            id="q1"
            question="현재 실업급여 수급 상태가 어떻게 되시나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="now" label="수급 중이에요" />
            <Btn value="plan" label="수급 예정이에요" />
            <Btn value="done" label="이미 종료됐어요" />
          </CheckerQ>
          <CheckerQ
            id="q2"
            question="실업인정일마다 구직활동 실적을 제출하고 있나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-submit" label="네, 제출하고 있어요" />
            <Btn value="no-submit" label="아직 제출 안 했어요" />
          </CheckerQ>
          <CheckerQ
            id="q3"
            question="구직활동 유형이 인정 목록에 있나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-type" label="네, 해당돼요" />
            <Btn value="none" label="잘 모르겠어요" />
          </CheckerQ>
          <CheckerQ
            id="q4"
            question="증빙 서류를 보관하고 있나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes-proof" label="네, 있어요" />
            <Btn value="no-proof" label="없어요" />
          </CheckerQ>
          {result === "fail" && (
            <ResultFail
              title="실적 미제출 — 수급 중단 위험"
              desc="실업인정일까지 구직활동 실적을 제출하지 않으면 해당 기간 수급이 중단돼요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "warn" && (
            <ResultFail
              title="인정 유형 확인 필요"
              desc="어떤 활동이 인정되는지 고용센터에 먼저 확인하고 제출하는 것이 안전해요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "check" && (
            <ResultFail
              title="증빙 서류 보관 필요"
              desc="구직활동 실적은 증빙 서류와 함께 제출해야 해요. 이메일, 스크린샷, 확인서 등을 보관하세요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultFail>
          )}
          {result === "ok" && (
            <ResultPass
              title="구직활동 정상 인정 가능"
              desc="제출 기한을 지키고 증빙을 갖추면 정상적으로 수급이 유지돼요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          )}
        </CheckerShell>
      </Sec>

      <Divider />

      <Sec n="02" id="sec02" title="실업급여 구직활동 인정 기준은 무엇인가요?" sub="횟수 · 유형 기준">
        <P>
          실업급여 수급자는 실업인정 주기마다 구직활동 실적을 제출해야 해요. 일반적으로 2주에 1회 실업인정을 받는데, 이 기간 동안 1회 이상의 구직활동을 해야 해요. 첫 번째 실업인정(대기기간 7일 후)에는 구직활동 의무가 없는 경우도 있어요.
        </P>
        <P>
          구직활동으로 인정되는 범위는 생각보다 넓어요. 채용공고 지원, 면접 참여, 직업훈련 수강, 취업박람회 참가, 고용센터 상담 등이 모두 해당돼요. 고용24를 통한 온라인 구직활동도 인정 대상이에요.
        </P>
        <P>
          50세 이상이나 장애인 수급자는 구직활동 횟수 기준이 완화될 수 있어요. 또한 특정 직업훈련 프로그램 참여 중에는 훈련 출석이 구직활동으로 대체될 수 있어요. 해당 여부는 고용센터에 미리 확인하는 게 좋아요.
        </P>
        <P>
          인정 기준은 단순히 횟수만이 아니에요. 실질적으로 취업을 위한 노력을 했느냐가 중요해요. 형식적인 지원서 제출이나 허위 증빙 제출은 부정수급으로 처벌받을 수 있어요.
        </P>
        <Info type="tip">
          수급 기간 초반에는 구직활동 의무 횟수가 낮게 설정되는 경우가 있어요. 본인 실업인정 주기와 의무 횟수를 고용센터에서 정확히 확인하세요.
        </Info>
        <InlineLink
          icon="📋"
          title="실업급여 신청방법 절차"
          desc="실업인정 신청 주기와 구직활동 실적 제출 방법"
          href="/w/실업급여-신청방법"
        />
      </Sec>

      <Divider />

      <Sec n="03" id="sec03" title="실업급여 구직활동 증빙 서류는 무엇이 있나요?" sub="온라인 · 오프라인 증빙">
        <P>
          구직활동 증빙 서류는 활동 유형에 따라 달라요. 입사지원서를 제출했다면 지원 확인 이메일이나 채용 플랫폼 화면을 캡처해 두면 돼요. 면접을 봤다면 면접 확인서나 면접 통보 문자도 증빙이 돼요.
        </P>
        <P>
          고용24를 통해 채용정보를 검색하고 입사 지원을 하면 자동으로 활동 이력이 기록돼요. 이 경우 별도 증빙 서류 없이 시스템에서 확인이 가능해요. 고용24 외 다른 플랫폼(잡코리아, 사람인 등)에서 지원한 경우에는 스크린샷을 캡처해 두세요.
        </P>
        <P>
          직업훈련 수강이나 취업박람회 참가도 증빙이 필요해요. 수료증이나 참가 확인서를 발급받아 제출하면 돼요. 자격증 시험 응시도 구직활동으로 인정될 수 있으니 수험표나 응시 확인서를 보관하세요.
        </P>
        <P>
          증빙 서류는 실업인정일 전에 준비해 두는 것이 중요해요. 증빙이 없으면 해당 활동이 인정되지 않을 수 있어요. 고용24 온라인 인정을 이용하면 증빙 업로드까지 한 번에 처리할 수 있어요.
        </P>
        <InlineLink
          icon="💼"
          title="실업급여 수급 조건 180일"
          desc="피보험기간 180일 이상, 비자발적 이직 등 수급 자격 정리"
          href="/w/실업급여-수급-조건"
        />
      </Sec>

      <RelatedMid
        title="실업급여 구직활동 관련 글"
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 보기"
        items={[
          { title: "실업급여 신청방법 절차", href: "/w/실업급여-신청방법" },
          { title: "실업급여 수급 조건", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 소정급여일수", href: "/w/실업급여-소정급여일수" },
        ]}
      />

      <Sec n="04" id="sec04" title="실업급여 구직활동 횟수가 부족하면 어떻게 되나요?" sub="지급 중단 · 수급 영향">
        <P>
          구직활동 실적이 부족하면 해당 실업인정 주기의 급여가 지급되지 않아요. 이는 수급이 완전히 종료되는 것이 아니라 해당 기간만 지급이 건너뛰어지는 거예요. 다음 실업인정일에 실적을 충족하면 수급이 이어져요.
        </P>
        <P>
          하지만 실업인정일에 출석하지 않거나 신고를 아예 하지 않으면 수급 자격 자체가 소멸될 수 있어요. 실업인정일에는 반드시 출석하거나 온라인으로 신청해야 해요. 불가피한 사유(질병, 출장 등)가 있다면 사전에 고용센터에 연락해야 해요.
        </P>
        <P>
          허위 구직활동이나 증빙 조작이 발각되면 부정수급으로 처리돼요. 부정수급은 수급액 전액 반환에 더해 최대 5배 추가징수가 부과되는 중대한 처벌이에요. 진짜 구직 노력을 기록하고 성실하게 제출하는 것이 가장 중요해요.
        </P>
        <P>
          구직활동 실적 부족이 반복되면 고용센터에서 특별 상담을 진행할 수 있어요. 취업 장애 요인이 있는 경우 별도 지원 프로그램을 연계받을 수도 있으니 적극적으로 상담하는 것이 좋아요.
        </P>
        <SpokeLink
          num="01"
          title="실업급여 수급 자격 인정"
          desc="비자발적 이직 및 피보험기간 180일 등 수급 자격 기준"
          href="/w/실업급여-수급자격-인정"
        />
      </Sec>

      <Divider />

      <Sec n="05" id="sec05" title="실업급여 구직활동 온라인으로도 인정받을 수 있나요?" sub="인정 활동 목록">
        <P>
          온라인 구직활동은 고용24, 잡코리아, 사람인, 링크드인 등 채용 플랫폼을 통한 지원 활동이 포함돼요. 채용공고를 보고 입사 지원을 했다면 스크린샷과 지원 확인 이메일을 보관하세요. 고용24 내에서 활동한 경우 시스템에 자동 기록돼요.
        </P>
        <P>
          직업훈련 수강도 구직활동으로 인정돼요. 고용센터에서 권장하는 직업능력개발훈련에 참여하면 훈련 출석이 구직활동을 대체해요. 자비로 수강하는 민간 학원이나 자격증 교육도 일부 인정될 수 있으니 고용센터에 확인하세요.
        </P>
        <P>
          취업박람회 참가, 직업 상담, 진로 컨설팅도 구직활동으로 인정돼요. 고용센터에서 제공하는 취업 지원 프로그램에 참여하면 참가 확인이 자동 처리돼요. 프리랜서나 자영업 준비 활동은 인정 여부를 사전에 확인해야 해요.
        </P>
        <P>
          자격증 시험 응시, 채용 설명회 참여도 증빙이 있으면 인정받을 수 있어요. 구직활동의 범위가 넓은 만큼, 무엇이 인정되고 무엇이 안 되는지 고용24나 고용센터(1350)에서 미리 확인하는 것이 좋아요.
        </P>
        <Info type="warn">
          허위 구직활동 증빙은 부정수급에 해당해요. 실제로 지원하지 않은 채용공고를 허위로 기재하면 전액 반환 + 추가징수 처벌을 받아요.
        </Info>
        <SpokeLink
          num="02"
          title="실업급여 실업인정 특례"
          desc="원거리 거주자, 장애인 등 비대면 실업인정 특례 대상"
          href="/w/실업급여-실업인정-특례"
        />
        <a
          href="https://www.work24.go.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="ext-btn ext-btn-black"
        >
          <span className="ext-btn-badge">고용24 공식</span>
          <span className="ext-btn-text">실업인정 온라인 신청 바로가기</span>
          <span className="ext-btn-cta">바로가기 →</span>
        </a>
      </Sec>

      <Divider />

      <Sec n="06" id="faq" title="자주 묻는 질문" sub="구직활동 · 실적 제출 · 증빙">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles
        items={[
          { title: "실업급여 신청방법 온라인 절차", href: "/w/실업급여-신청방법" },
          { title: "실업급여 수급조건 피보험기간 180일", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 대기기간 7일 의미", href: "/w/실업급여-대기기간" },
          { title: "실업급여 소정급여일수 나이별", href: "/w/실업급여-소정급여일수" },
          { title: "실업급여 부정수급 처벌 기준", href: "/w/실업급여-부정수급" },
        ]}
      />
      <PrevNext
        prev={{ title: "실업급여 수급 조건", href: "/w/실업급여-수급-조건" }}
        next={{ title: "실업급여 신청방법", href: "/w/실업급여-신청방법" }}
      />
    </BlogLayout>
  );
}
