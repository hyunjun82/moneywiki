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
  title: "실업급여 비과세 소득 분류 | 연말정산 종합소득세 신고 제외",
  description: "실업급여는 소득세법 제12조에서 비과세 소득으로 분류돼요. 세금이 없고, 연말정산·종합소득세 신고에도 포함되지 않아요. 다른 소득이 있는 경우만 별도 신고가 필요해요.",
  category: "실업급여",
  keywords: ["실업급여 비과세 소득", "연말정산 신고 제외", "종합소득세 포함 여부", "수급 중 다른 소득 신고"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "실업급여는 소득세법 제12조에서 비과세 소득으로 분류돼요.",
    "연말정산·종합소득세 신고에 포함되지 않아요. 세금이 없어요.",
    "다른 소득(사업·근로)이 있으면 그 소득은 별도 신고해야 해요.",
  ],
  sources: [{ name: "소득세법 제12조", url: "https://www.law.go.kr/법령/소득세법", date: "2026-02" }],
  faq: [
    { q: "실업급여 비과세라면 연말정산 때 실업급여를 입력해야 하나요?", a: "아니요, 연말정산에 실업급여를 입력하지 않아도 돼요. 비과세 소득이라 합산되지 않아요. 퇴직 전 근로소득이 있으면 그 부분만 연말정산하면 돼요." },
    { q: "실업급여 비과세 소득인데 건강보험료는 왜 올라가나요?", a: "건강보험료는 소득세법 기준이 아니라 건강보험법 기준으로 계산해요. 퇴직 후 지역가입자로 전환되면 재산·소득 기준으로 보험료가 계산돼요. 실업급여 자체는 건강보험료 산정에도 포함되지 않아요." },
  ],
  ctaCard: {
    label: "비과세 기준 확인",
    mainText: "실업급여 → 소득세 없음",
    subText: "내 상황으로 신고 여부 확인",
    url: "/w/실업급여-비과세",
    external: false,
  },
  relatedDocs: [{ title: "소득세법 제12조", url: "https://www.law.go.kr/법령/소득세법" }],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(sel: Record<string, string>): { pass: boolean; headline: string; detail: string; links: ResLink[] } | null {
  const { income } = sel;
  if (!income) return null;

  if (income === "only_ui") return {
    pass: true,
    headline: "종합소득세 신고 의무 없어요",
    detail: "실업급여만 받은 해에는 모든 소득이 비과세라 종합소득세 신고 의무가 없어요. 연말정산도 해당 없어요.",
    links: [
      { icon: "📄", title: "실업급여 세금 관련 정보", desc: "건강보험 전환 등 세금 외 비용", href: "/w/실업급여-세금" },
      { icon: "💰", title: "기초일액 계산 확인", desc: "수급액이 얼마인지 확인하기", href: "/w/실업급여-기초일액" },
    ],
  };

  if (income === "work_and_ui") return {
    pass: true,
    headline: "근로소득 부분만 연말정산하면 돼요",
    detail: "퇴직 전 근로소득이 있으면 중도 퇴직자 연말정산을 해야 해요. 실업급여는 비과세라 합산하지 않아요. 근로소득만 기준으로 환급 또는 추가 납부가 결정돼요.",
    links: [
      { icon: "📄", title: "근로소득 연말정산 방법", desc: "중도 퇴직자 연말정산 처리", href: "/w/실업급여-세금" },
      { icon: "💰", title: "기초일액 계산 방법", desc: "수급 중 실제 수령액 확인", href: "/w/실업급여-기초일액" },
    ],
  };

  if (income === "freelance_ui") return {
    pass: false,
    headline: "사업소득은 종합소득세 신고 대상이에요",
    detail: "프리랜서·사업소득은 실업급여와 별개로 5월에 종합소득세 신고를 해야 해요. 실업급여는 비과세라 합산하지 않지만, 사업소득은 별도 신고 대상이에요.",
    links: [
      { icon: "📄", title: "수급 중 소득 신고 기준", desc: "알바·사업소득과 부정수급 관계", href: "/w/실업급여-받으면서-알바" },
      { icon: "⚠️", title: "소득 미신고 시 처벌 기준", desc: "부정수급 자진신고 감면", href: "/w/실업급여-부정수급" },
    ],
  };

  if (income === "rehired_ui") return {
    pass: true,
    headline: "재취업 근로소득은 새 직장 연말정산 대상이에요",
    detail: "재취업 후 받은 근로소득은 새 직장에서 연말정산해요. 실업급여 수령액은 신고하지 않아도 돼요.",
    links: [
      { icon: "📊", title: "소정급여일수 기간표", desc: "수급 기간 조회", href: "/w/실업급여-소정급여일수" },
      { icon: "💰", title: "기초일액 계산 방법", desc: "수급액 확인", href: "/w/실업급여-기초일액" },
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
          { icon: "📄", label: "소득세법 원문 확인", desc: "비과세 소득 조항", href: "https://www.law.go.kr/법령/소득세법", hot: true },
          { icon: "💰", label: "기초일액 계산", desc: "수급액 확인", href: "/w/실업급여-기초일액" },
          { icon: "📊", label: "소정급여일수", desc: "수급 기간 조회", href: "/w/실업급여-소정급여일수" },
        ]}
      />
      <SidebarDocs
        items={[
          { title: "소득세법 제12조", href: "https://www.law.go.kr/법령/소득세법" },
          { title: "실업급여 세금 관련", href: "/w/실업급여-세금" },
          { title: "수급 중 알바 신고", href: "/w/실업급여-받으면서-알바" },
          { title: "기초일액 상한·하한", href: "/w/실업급여-기초일액" },
          { title: "반복수급 감액 기준", href: "/w/실업급여-반복수급" },
        ]}
      />
      <SidebarCalc
        items={[
          { title: "기초일액 계산", href: "/w/실업급여-기초일액" },
          { title: "연봉별 수급액 계산", href: "/w/실업급여-연봉별-계산" },
          { title: "소정급여일수 조회", href: "/w/실업급여-소정급여일수" },
          { title: "피보험기간 180일", href: "/w/실업급여-피보험기간-180일-계산" },
          { title: "수급 기간 계산", href: "/w/실업급여-수급기간-몇개월-받나요" },
        ]}
      />
    </>
  );

  return (
    <BlogLayout
      sidebar={sidebar}
      disclaimer="이 글은 2026년 2월 소득세법 기준으로 작성됐어요. 세금 신고는 세무사나 국세청에서 확인하세요."
      breadcrumb={["홈", "실업급여", "비과세"]}
      tags={["2026년 기준", "실업급여", "비과세"]}
      date="2026-02-27"
      title={meta.title}
      description={<>{meta.description}</>}
      sourceBar={{ badge: "출처", name: "소득세법 제12조 · 국세청", date: "2026.02 기준" }}
    >
      <TOC items={[
        { t: "소득 유형별 신고 의무 체크", sub: "실업급여 비과세와 다른 소득 신고 여부" },
        { t: "실업급여 비과세란 무슨 뜻인가요?", sub: "소득세법 제12조 근거" },
        { t: "실업급여 비과세면 연말정산을 안 해도 되나요?", sub: "연말정산 제외 기준" },
        { t: "실업급여 비과세인데 다른 소득이 있으면 어떻게 되나요?", sub: "사업·근로소득 신고 의무" },
        { t: "실업급여 비과세와 건강보험료는 어떤 관계인가요?", sub: "지역가입자 전환과 보험료" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "실업급여는 <strong>소득세법 제12조</strong>에서 비과세 소득으로 분류돼요.",
        "연말정산·종합소득세 신고에 포함되지 않아요. <strong>세금이 없어요</strong>.",
        "다른 소득(사업·근로)이 있으면 그 소득은 별도 신고해야 해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <CheckerShell icon="📄" title="소득 유형별 신고 의무 체크" label="실업급여 외 소득 기준">
        <Sec n="STEP 01" title="소득 유형별 신고 의무 체크" sub="실업급여 외 소득 종류를 선택해 주세요" />
        <P>실업급여는 비과세이지만, 같은 해에 다른 소득이 있으면 그 소득에 따라 신고 의무가 달라져요. <A href="https://www.law.go.kr/법령/소득세법">소득세법 제12조</A> 기준이에요.</P>
        <CheckerQ n={1} label="올해 실업급여 외 다른 소득이 있었나요?">
          <Btn group="income" value="only_ui" label="실업급여만 받았어요" sel={sel} pick={pick} />
          <Btn group="income" value="work_and_ui" label="퇴직 전 근로소득 있어요" sel={sel} pick={pick} />
          <Btn group="income" value="freelance_ui" label="사업·프리랜서 소득 있어요" sel={sel} pick={pick} />
          <Btn group="income" value="rehired_ui" label="재취업 후 근로소득 있어요" sel={sel} pick={pick} />
        </CheckerQ>
        {result?.pass === true && (
          <ResultPass title="신고 의무 없음" desc={result.detail}>
            {result.links.map((l) => (
              <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
            ))}
          </ResultPass>
        )}
        {result?.pass === false && (
          <ResultFail title="별도 신고 필요" desc={result.detail}>
            {result.links.map((l) => (
              <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
            ))}
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        question="비과세인데 건강보험료는 왜 올라가나요?"
        body={<>소득세법 비과세와 건강보험료는 다른 기준이에요. 퇴직 후 지역가입자로 전환되면 <strong style={{ color: C.navy }}>재산·소득 기준</strong>으로 보험료가 계산돼요.</>}
        btnText="건강보험 지역가입자 전환 안내 →"
        href="/w/실업급여-세금"
      />

      {/* ── SECTION 02. 비과세란 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 비과세란 무슨 뜻인가요?" sub="소득세법 제12조 근거 설명" />

      <P>실업급여는 <A href="https://www.law.go.kr/법령/소득세법">소득세법 제12조</A>에서 비과세 소득으로 분류돼요. 비과세란 세금이 전혀 붙지 않는다는 뜻이에요. 국가에서 실직자 생계 지원 목적으로 지원하는 급여이기 때문에 세금을 부과하지 않아요.</P>

      <P>구직급여(실업급여 본급), 취직촉진수당 모두 비과세 소득이에요. 받은 금액 그대로 세금 없이 수령해요. 원천징수도 없고, 나중에 신고할 의무도 없어요.</P>

      <P><B>비과세 소득은 세금 계산에 합산하지 않아요.</B> 연간 소득 합계를 구할 때 실업급여는 제외해요. 그래서 연말정산에도 포함되지 않고, 종합소득세 신고에도 합산하지 않아요.</P>

      <P>유사하게 비과세인 소득으로는 식대 (20만원 이하), 출장비 실비, 자녀 양육수당 등이 있어요. 모두 소득세법에서 명시적으로 비과세로 지정한 항목들이에요.</P>

      <InlineLink icon="📄" title="소득세법 제12조 비과세 소득 원문" desc="실업급여 비과세 근거 조항과 기타 비과세 소득 목록" href="https://www.law.go.kr/법령/소득세법" />

      {/* ── SECTION 03. 연말정산 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 비과세면 연말정산을 안 해도 되나요?" sub="연말정산 제외 기준 상세 설명" />

      <P>실업급여만 받았다면 연말정산을 따로 할 필요가 없어요. 비과세 소득이라 과세 대상 소득이 없기 때문이에요. 종합소득세 신고도 할 필요 없어요.</P>

      <P>퇴직 전 근로소득이 있었다면 얘기가 달라요. 퇴직한 해에는 퇴직 전 근로소득에 대한 연말정산을 해야 해요. 보통 퇴직 처리 시 회사에서 중도 퇴직자 연말정산을 해줘요. 실업급여는 제외하고 근로소득만 기준으로 해요.</P>

      <P><B>종합소득세 신고 대상이 아니에요.</B> 실업급여는 종합소득세 신고 시 합산 소득에 포함하지 않아요. 같은 해에 다른 소득이 없다면 5월에 종합소득세 신고를 하지 않아도 돼요.</P>

      <P>단, 사업소득이나 기타 소득이 함께 있다면 그 소득은 신고해야 해요. 실업급여만 제외하고 나머지 소득은 정상적으로 신고해요.</P>

      <Info type="warn">{'<strong>주의:</strong> 사업소득·프리랜서 소득이 있으면 <strong>5월 종합소득세 신고 대상</strong>이에요. 실업급여는 제외하고 해당 소득만 신고해요.'}</Info>

      <RelatedMid
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 가이드"
        items={[
          { title: "실업급여 세금 관련 사항", href: "/w/실업급여-세금", desc: "건강보험 전환 등 세금 외 비용" },
          { title: "수급 중 알바 신고 기준", href: "/w/실업급여-받으면서-알바", desc: "소득 신고 방법" },
          { title: "기초일액 계산 방법", href: "/w/실업급여-기초일액", desc: "수급액 확인" },
        ]}
      />

      {/* ── SECTION 04. 다른 소득 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 비과세인데 다른 소득이 있으면 어떻게 되나요?" sub="사업·근로소득 신고 의무" />

      <P>실업급여 수급 중에 알바나 프리랜서 소득이 생기면 그 소득은 별도 신고 의무가 있어요. 실업급여는 비과세지만 알바 임금이나 사업소득은 과세 소득이에요.</P>

      <P>알바 임금이 발생하면 고용24에 신고하는 것 외에도, 연간 소득이 일정 기준을 넘으면 종합소득세 신고를 해야 해요. 프리랜서(3.3% 원천징수)로 소득이 있으면 5월 종합소득세 신고 대상이에요.</P>

      <P><B>실업급여 자체는 어떤 소득 신고에도 포함하지 않아요.</B> 다른 소득이 아무리 많아도 실업급여는 제외해요. 신고서에 실업급여를 기재하는 칸은 없어요.</P>

      <P>다른 소득 신고와 실업급여 수급 신고는 별개예요. 실업급여는 고용24에서 수급 관리하고, 소득세는 홈택스에서 신고해요. 두 가지가 연동되지는 않아요.</P>

      <SpokeLink num="01" title="실업급여 받으면서 알바 신고 기준" desc="알바 임금과 수급액 관계, 부정수급 처벌 기준" href="/w/실업급여-받으면서-알바" />
      <SpokeLink num="02" title="실업급여 세금 면제와 건강보험 관계" desc="퇴직 후 지역가입자 전환과 보험료 변화" href="/w/실업급여-세금" />

      {/* ── SECTION 05. 건강보험 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 비과세와 건강보험료는 어떤 관계인가요?" sub="지역가입자 전환과 보험료 계산" />

      <P>건강보험료는 소득세법 기준이 아니라 건강보험법 기준으로 계산해요. 퇴직 후 지역가입자로 전환되면 재산·소득 기준으로 보험료가 계산돼요. 실업급여 자체는 건강보험료 산정 소득에 포함되지 않아요.</P>

      <P>퇴직 후 건강보험료가 오르는 이유는 직장가입자에서 지역가입자로 전환됐기 때문이에요. 직장가입자는 회사가 50% 부담해 주지만, 지역가입자는 전액 본인이 내요. 실업급여와 직접적인 관계는 없어요.</P>

      <P><B>임의계속가입 제도를 활용하면 보험료를 줄일 수 있어요.</B> 퇴직 후 36개월 동안 직장가입자 자격을 유지할 수 있어요. 지역가입자 보험료가 더 비싸면 임의계속가입을 신청하면 돼요.</P>

      <P>실업급여 수급 기간에도 건강보험료를 계속 내야 해요. 수급 기간 중에 보험료를 납부하지 않으면 건강보험 혜택을 받을 수 없으니 주의해요.</P>

      <InlineLink icon="🏥" title="건강보험 임의계속가입 신청" desc="퇴직 후 직장가입자 자격 36개월 유지 신청 방법" href="/w/건강보험-임의계속가입-퇴직-후" />

      <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">국세청 공식</span>
        <span className="ext-btn-text">비과세 소득 기준 확인</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 세금 면제 기준 — 건강보험 전환 관계", desc: "실업급여 · 세금", href: "/w/실업급여-세금" },
        { title: "실업급여 받으면서 알바 신고 기준", desc: "실업급여 · 알바 신고", href: "/w/실업급여-받으면서-알바" },
        { title: "실업급여 기초일액 계산 — 상한 하한 적용", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
        { title: "건강보험 임의계속가입 — 퇴직 후 신청", desc: "건강보험 · 임의계속가입", href: "/w/건강보험-임의계속가입-퇴직-후" },
        { title: "실업급여 소정급여일수 — 나이별 수급 기간", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 받으면서 알바 신고 기준", href: "/w/실업급여-받으면서-알바" }}
        next={{ title: "실업급여 세금 면제 기준", href: "/w/실업급여-세금" }}
      />
    </BlogLayout>
  );
}
