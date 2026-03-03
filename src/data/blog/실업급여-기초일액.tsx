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
  FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 기초일액 계산 공식 | 평균임금 60% 상하한 적용",
  description: "실업급여 하루 지급액(기초일액)은 퇴직 전 3개월 평균임금의 60%예요. 2026년 기준 상한 66,000원, 하한 약 64,000원으로 적용되며, 연봉별 실제 수령액 계산 사례를 정리했어요.",
  category: "실업급여",
  keywords: [
    "실업급여 기초일액 계산 공식",
    "실업급여 기초일액 평균임금 60%",
    "실업급여 기초일액 상한액 하한액 적용",
    "실업급여 기초일액 퇴직 전 3개월 임금",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "기초일액 = 퇴직 전 3개월 평균임금 × 60%로 계산해요",
    "2026년 기준 1일 상한 66,000원, 하한 약 64,000원이에요",
    "실제 수령액은 기초일액 × 소정급여일수로 결정돼요",
  ],
  sources: [
    {
      name: "고용보험법 제45조 (구직급여 일액)",
      url: "https://www.law.go.kr/법령/고용보험법/(20240101,20022,20231010)/제45조",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "퇴직 전 3개월 임금이 불규칙하면 어떻게 계산하나요?",
      a: "퇴직 전 3개월 동안 지급된 임금 총액을 그 기간의 총 일수(90일)로 나눠요. 성과급이나 상여금도 포함될 수 있어요. 임금이 불규칙해도 고용센터에서 자동 계산해 주니 걱정하지 않아도 돼요.",
    },
    {
      q: "기초일액이 상한액보다 높게 계산되면 어떻게 되나요?",
      a: "계산된 기초일액이 상한액(66,000원)을 초과하더라도 66,000원만 지급돼요. 고소득자일수록 실제 급여 대비 실업급여 비율이 낮아지는 구조예요.",
    },
  ],
  ctaCard: {
    label: "기초일액 계산",
    mainText: "내 연봉으로 실업급여 예상 일액 계산",
    subText: "퇴직 전 월급을 입력하면 예상액이 나와요",
    url: "/w/실업급여-연봉별-계산",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 상한액 하한액", url: "/w/실업급여-상한액" },
    { title: "실업급여 연봉별 계산", url: "/w/실업급여-연봉별-계산" },
  ],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

export default function Page() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function getResult() {
    const q2 = answers["q2"];
    const q3 = answers["q3"];
    if (q2 === "high") return "ceiling";
    if (q3 === "low") return "floor";
    if (Object.keys(answers).length >= 4) return "normal";
    return null;
  }

  const links: ResLink[] = [
    {
      icon: "🔢",
      title: "실업급여 연봉별 계산",
      desc: "월급별 예상 기초일액 및 총 수령액 확인",
      href: "/w/실업급여-연봉별-계산",
    },
    {
      icon: "📊",
      title: "실업급여 상한액 하한액",
      desc: "2026년 기준 상한 66,000원 하한 64,000원",
      href: "/w/실업급여-상한액",
    },
    {
      icon: "📞",
      title: "고용센터 상담 (1350)",
      desc: "개인별 기초일액 계산 전화 문의",
      href: "https://www.work24.go.kr",
    },
  ];

  const toc = [
    { id: "checker", label: "기초일액 대략 예상 체크" },
    { id: "sec02", label: "기초일액 계산 공식", sub: "평균임금 60% · 계산 방법" },
    { id: "sec03", label: "상한액 하한액 적용", sub: "66,000원 · 64,000원 기준" },
    { id: "sec04", label: "연봉별 기초일액 사례", sub: "300만원 · 500만원 · 150만원" },
    { id: "sec05", label: "퇴직 전 3개월 임금 산정", sub: "포함 항목 · 제외 항목" },
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
            title="기초일액 계산"
            desc="연봉별 실업급여 예상액 확인"
            href="/w/실업급여-연봉별-계산"
            label="계산하기"
          />
          <SidebarDocs
            title="관련 서류"
            items={[
              { label: "고용보험법 제45조 (법제처)", href: "https://www.law.go.kr" },
              { label: "임금 명세서 (회사 발급)", href: "https://www.work24.go.kr" },
              { label: "수급자격인정신청서", href: "https://www.ei.go.kr" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반 정보 제공 목적으로 작성되었으며, 실제 수령액은 개인 상황에 따라 다를 수 있어요. 정확한 계산은 고용센터(1350)에 문의하세요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        title="내 실업급여 하루 얼마인지 알고 싶으신가요?"
        desc="기초일액 계산 공식만 알면 대략적인 수령액을 미리 가늠할 수 있어요. 아래 체크로 먼저 파악해 보세요."
      />

      <Sec n="01" id="checker" title="실업급여 기초일액을 대략 계산해 볼까요?" sub="상한·하한 해당 여부 확인">
        <CheckerShell
          title="기초일액 대략 예상 체크"
          desc="4가지 질문으로 기초일액 범위를 파악해 보세요"
        >
          <CheckerQ
            id="q1"
            question="퇴직 직전 3개월 평균 월급이 얼마 정도였나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="low" label="200만원 미만" />
            <Btn value="mid" label="200만~350만원" />
            <Btn value="high" label="350만원 이상" />
          </CheckerQ>
          <CheckerQ
            id="q2"
            question="월급 × 60% ÷ 30일이 66,000원을 넘나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="high" label="넘을 것 같아요" />
            <Btn value="normal" label="넘지 않아요" />
          </CheckerQ>
          <CheckerQ
            id="q3"
            question="월급 × 60% ÷ 30일이 64,000원 미만인가요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="low" label="64,000원 미만이에요" />
            <Btn value="normal" label="64,000원 이상이에요" />
          </CheckerQ>
          <CheckerQ
            id="q4"
            question="성과급, 상여금이 퇴직 전 3개월에 포함됐나요?"
            answers={answers}
            onAnswer={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          >
            <Btn value="yes" label="네, 포함됐어요" />
            <Btn value="no" label="아니요" />
          </CheckerQ>
          {result === "ceiling" && (
            <ResultPass
              title="상한액 66,000원 적용 가능"
              desc="계산액이 상한액을 초과하면 66,000원으로 고정돼요. 연봉이 높을수록 실수령 비율이 낮아져요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          )}
          {result === "floor" && (
            <ResultPass
              title="하한액 약 64,000원 적용 가능"
              desc="계산액이 하한액 미만이면 최저 보장액(약 64,000원)으로 올려줘요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          )}
          {result === "normal" && (
            <ResultPass
              title="평균임금 60% 적용"
              desc="상한액과 하한액 사이면 실제 계산된 기초일액이 그대로 적용돼요."
            >
              {links.map((l) => (
                <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          )}
        </CheckerShell>
      </Sec>

      <Divider />

      <Sec n="02" id="sec02" title="실업급여 기초일액 계산 공식은 어떻게 되나요?" sub="평균임금 60% · 계산 방법">
        <P>
          기초일액은 퇴직 전 3개월 동안 받은 임금 총액을 그 기간의 총 일수(보통 90~92일)로 나눈 평균임금의 60%예요. 계산식으로 표현하면 아래와 같아요.
        </P>
        <FormulaCard
          formula="기초일액 = (퇴직 전 3개월 임금 총액 ÷ 총 일수) × 60%"
          notes={[
            "총 일수는 실제 달력 일수 (보통 90~92일)를 사용해요",
            "상한: 1일 66,000원 초과 시 66,000원으로 고정",
            "하한: 최저임금의 80% (2026년 기준 약 64,000원) 미만 시 올려서 적용",
          ]}
        />
        <P>
          여기서 임금 총액에는 기본급, 시간외 수당, 식대 등 통상적으로 지급받은 항목이 포함돼요. 단, 퇴직금, 비정기적 포상금, 복리후생비 등은 제외돼요. 성과급이나 분기 상여금은 지급 시기와 성격에 따라 포함 여부가 달라질 수 있어요.
        </P>
        <P>
          계산이 복잡하게 느껴진다면 고용센터에서 자동으로 계산해 줘요. 수급자격 신청 시 제출하는 임금 대장이나 급여 명세서를 기반으로 담당자가 직접 산정해 주니까 걱정하지 않아도 돼요.
        </P>
        <P>
          기초일액이 결정되면 소정급여일수(90~270일)를 곱해 총 실업급여 수령 예상액을 파악할 수 있어요. 예를 들어 기초일액 60,000원 × 소정급여일수 150일 = 총 수령 예상 900만원이에요.
        </P>
        <InlineLink
          icon="📊"
          title="실업급여 소정급여일수 나이별"
          desc="가입기간·나이별 최대 90~270일 소정급여일수 기준"
          href="/w/실업급여-소정급여일수"
        />
      </Sec>

      <Divider />

      <Sec n="03" id="sec03" title="실업급여 기초일액 상한액 하한액 적용은 어떻게 되나요?" sub="66,000원 · 64,000원 기준">
        <P>
          기초일액에는 상한액과 하한액이 있어요. 2026년 기준 상한액은 1일 66,000원이에요. 평균임금의 60%가 66,000원을 초과하면 66,000원만 지급돼요. 고소득자일수록 실제 급여 대비 수령 비율이 낮아지는 구조예요.
        </P>
        <P>
          하한액은 최저임금의 80%예요. 2026년 최저임금이 시간당 10,030원이므로, 하루 8시간 기준 하한액은 약 64,000원이에요. 계산된 기초일액이 이보다 낮으면 자동으로 하한액이 적용돼요.
        </P>
        <P>
          상한액과 하한액은 매년 바뀔 수 있어요. 최저임금 인상이나 정부 정책에 따라 조정되는 경우가 있으니, 실제 수급 시점의 공식 기준을 고용24나 고용센터에서 확인하는 게 좋아요.
        </P>
        <P>
          상한액이 적용되면 월급이 높아도 받을 수 있는 최대 일액이 66,000원으로 제한돼요. 270일 수급 시 최대 총액은 66,000원 × 270일 = 17,820,000원이에요. 이것이 현재 제도상 수령 가능한 최고 금액이에요.
        </P>
        <InlineLink
          icon="💰"
          title="실업급여 상한액 하한액 2026"
          desc="연도별 상한액 변화와 하한액 계산 기준 자세히 보기"
          href="/w/실업급여-상한액"
        />
      </Sec>

      <RelatedMid
        title="실업급여 기초일액 관련 글"
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 보기"
        items={[
          { title: "실업급여 상한액 하한액 2026", href: "/w/실업급여-상한액" },
          { title: "실업급여 연봉별 계산 공식", href: "/w/실업급여-연봉별-계산" },
          { title: "실업급여 소정급여일수 나이별", href: "/w/실업급여-소정급여일수" },
        ]}
      />

      <Sec n="04" id="sec04" title="실업급여 기초일액 평균임금 60% 사례를 보고 싶어요" sub="300만원 · 500만원 · 150만원">
        <P>
          연봉별 기초일액 계산 사례를 세 가지로 정리했어요. 실제 수령액은 소정급여일수를 곱해야 나오지만, 하루 얼마인지 먼저 가늠해 볼 수 있어요.
        </P>
        <CaseBox
          badge="사례 1"
          label="월급 300만원 근로자"
          steps={[
            "퇴직 전 3개월 임금 총액: 900만원",
            "총 일수: 90일",
            "평균 일급: 900만원 ÷ 90 = 100,000원",
            "기초일액(60%): 100,000원 × 60% = 60,000원",
          ]}
          total="일 60,000원"
          result="상한(66,000원) 이하 → 60,000원 적용"
          pass={true}
        />
        <CaseBox
          badge="사례 2"
          label="월급 500만원 고소득 근로자"
          steps={[
            "퇴직 전 3개월 임금 총액: 1,500만원",
            "총 일수: 90일",
            "평균 일급: 1,500만원 ÷ 90 = 166,667원",
            "기초일액(60%): 166,667원 × 60% = 100,000원",
          ]}
          total="계산액 100,000원 → 상한액 66,000원 적용"
          result="실수령 기초일액: 66,000원"
          pass={true}
          note="고소득자는 상한액이 적용되어 실제 급여의 40% 미만 수령 가능"
        />
        <CaseBox
          badge="사례 3"
          label="월급 150만원 저임금 근로자"
          steps={[
            "퇴직 전 3개월 임금 총액: 450만원",
            "총 일수: 90일",
            "평균 일급: 450만원 ÷ 90 = 50,000원",
            "기초일액(60%): 50,000원 × 60% = 30,000원",
          ]}
          total="계산액 30,000원 → 하한액 64,000원 적용"
          result="실수령 기초일액: 64,000원"
          pass={true}
          note="최저임금 미만 근로자는 하한액 보장으로 최소 수령 보장"
        />
        <SpokeLink
          num="01"
          title="실업급여 연봉별 계산"
          desc="더 다양한 연봉 구간별 실업급여 예상 수령액 계산"
          href="/w/실업급여-연봉별-계산"
        />
      </Sec>

      <Divider />

      <Sec n="05" id="sec05" title="실업급여 기초일액 퇴직 전 3개월 임금에는 무엇이 포함되나요?" sub="포함 항목 · 제외 항목">
        <P>
          평균임금 산정의 기준이 되는 '퇴직 전 3개월 임금'에는 기본급, 각종 수당(시간외수당, 직책수당, 교통비 등), 정기적으로 지급된 상여금 등이 포함돼요. 매달 규칙적으로 지급된 항목은 대부분 포함된다고 보면 돼요.
        </P>
        <P>
          반면 퇴직금, 연차 미사용 수당(퇴직 시 일시 지급분), 비정기적 포상금, 경조금 등은 제외돼요. 임시로 지급된 항목이나 퇴직을 계기로 지급된 항목은 포함되지 않아요.
        </P>
        <P>
          3개월 중 근무하지 않은 기간(무급 휴직 등)이 있으면 해당 기간을 제외한 임금과 일수를 기준으로 계산해요. 출산휴가, 육아휴직 기간에는 임금이 별도 규정으로 처리될 수 있어요.
        </P>
        <P>
          임금 구성이 복잡하거나 불규칙한 경우 고용센터에서 임금 대장이나 원천징수 영수증을 기반으로 재산정해 줘요. 퇴직 전에 임금 명세서를 챙겨 두면 수급 신청이 훨씬 수월해요.
        </P>
        <Info type="warn">
          인센티브나 성과급이 퇴직 전 3개월에 집중 지급됐다면 평균임금이 올라 기초일액이 높아질 수 있어요. 반대로 무급 기간이 겹치면 낮아질 수 있어요.
        </Info>
        <SpokeLink
          num="02"
          title="실업급여 수급기간 몇 개월 받나요"
          desc="가입기간·나이별 최대 수급 기간과 총 수령 예상액"
          href="/w/실업급여-수급기간-몇개월-받나요"
        />
        <a
          href="https://www.ei.go.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="ext-btn ext-btn-black"
        >
          <span className="ext-btn-badge">고용보험 공식</span>
          <span className="ext-btn-text">구직급여 안내 및 예상 수령액 확인</span>
          <span className="ext-btn-cta">바로가기 →</span>
        </a>
      </Sec>

      <Divider />

      <Sec n="06" id="faq" title="자주 묻는 질문" sub="기초일액 · 평균임금 · 상하한">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles
        items={[
          { title: "실업급여 상한액 하한액 2026", href: "/w/실업급여-상한액" },
          { title: "실업급여 연봉별 계산 공식", href: "/w/실업급여-연봉별-계산" },
          { title: "실업급여 소정급여일수 나이별", href: "/w/실업급여-소정급여일수" },
          { title: "실업급여 수급기간 몇 개월 받나요", href: "/w/실업급여-수급기간-몇개월-받나요" },
          { title: "실업급여 수급조건 피보험기간 180일", href: "/w/실업급여-수급-조건" },
        ]}
      />
      <PrevNext
        prev={{ title: "실업급여 기준기간 18개월", href: "/w/실업급여-기준기간" }}
        next={{ title: "실업급여 상한액 하한액", href: "/w/실업급여-상한액" }}
      />
    </BlogLayout>
  );
}
