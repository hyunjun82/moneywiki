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
  title: "실업급여 세금 면제 기준 | 건강보험 지역가입자 전환 비용",
  description: "실업급여는 소득세법상 비과세로 세금이 없어요. 하지만 퇴직 후 건강보험이 지역가입자로 전환되면 보험료가 오를 수 있어요. 세금 면제 기준과 건강보험 관계를 정리했어요.",
  category: "실업급여",
  keywords: ["실업급여 세금 면제", "건강보험 지역가입자 전환", "퇴직 후 보험료 증가", "임의계속가입 신청"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "실업급여는 소득세법 제12조에 따라 세금이 전혀 없어요.",
    "퇴직 후 건강보험이 지역가입자로 전환되면 보험료가 오를 수 있어요.",
    "임의계속가입을 신청하면 최대 36개월 직장가입자 보험료를 유지할 수 있어요.",
  ],
  sources: [{ name: "소득세법 제12조 · 건강보험법", url: "https://www.law.go.kr/법령/소득세법", date: "2026-02" }],
  faq: [
    { q: "실업급여 세금 없다면 건강보험료도 안 내도 되나요?", a: "아니요, 건강보험료는 별개로 내야 해요. 퇴직 후 지역가입자로 전환되면 재산·소득 기준으로 보험료가 계산돼요. 보험료를 줄이려면 임의계속가입을 신청하는 게 유리해요." },
    { q: "실업급여 세금 면제인데 왜 홈택스에 신고해야 하는 경우도 있나요?", a: "실업급여 자체는 신고 대상이 아니에요. 하지만 같은 해에 사업소득·프리랜서 소득이 있으면 그 소득은 5월 종합소득세 신고 대상이에요. 실업급여는 제외하고 다른 소득만 신고하면 돼요." },
  ],
  ctaCard: {
    label: "세금 기준 확인",
    mainText: "실업급여 → 소득세 없음",
    subText: "건강보험 전환 비용 확인",
    url: "/w/실업급여-세금",
    external: false,
  },
  relatedDocs: [{ title: "소득세법 제12조", url: "https://www.law.go.kr/법령/소득세법" }],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(sel: Record<string, string>): { pass: boolean; headline: string; detail: string; links: ResLink[] } | null {
  const { situation } = sel;
  if (!situation) return null;

  if (situation === "ui_only") return {
    pass: true,
    headline: "소득세 없어요. 건강보험료만 확인하세요",
    detail: "실업급여만 받은 경우 소득세가 없어요. 다만 퇴직 후 지역가입자로 전환되면 건강보험료가 오를 수 있어요. 임의계속가입으로 보험료를 줄일 수 있어요.",
    links: [
      { icon: "🏥", title: "건강보험 임의계속가입 신청", desc: "36개월 직장가입자 보험료 유지", href: "/w/건강보험-임의계속가입-퇴직-후" },
      { icon: "📊", title: "소정급여일수 기간표", desc: "수급 기간 조회", href: "/w/실업급여-소정급여일수" },
    ],
  };

  if (situation === "high_insurance") return {
    pass: false,
    headline: "임의계속가입 신청이 유리해요",
    detail: "지역가입자 보험료가 직장가입자 보험료보다 비싸면 임의계속가입을 신청하면 돼요. 퇴직일로부터 36개월까지 직장가입자 보험료를 그대로 납부할 수 있어요.",
    links: [
      { icon: "🏥", title: "임의계속가입 신청 방법", desc: "국민건강보험 공단 신청 절차", href: "/w/건강보험-임의계속가입-퇴직-후" },
      { icon: "📋", title: "지역가입자 보험료 계산", desc: "재산·소득 기준 보험료 확인", href: "/w/건강보험-지역가입자-보험료-계산" },
    ],
  };

  if (situation === "side_income") return {
    pass: false,
    headline: "다른 소득은 별도 신고해야 해요",
    detail: "실업급여는 비과세지만 사업소득·프리랜서 소득은 5월 종합소득세 신고 대상이에요. 실업급여는 제외하고 해당 소득만 신고해요.",
    links: [
      { icon: "📋", title: "종합소득세 신고 대상 확인", desc: "사업소득·기타소득 신고 기준", href: "/w/실업급여-비과세" },
      { icon: "💼", title: "알바 신고 기준", desc: "수급 중 알바 소득 처리", href: "/w/실업급여-받으면서-알바" },
    ],
  };

  if (situation === "rehired") return {
    pass: true,
    headline: "재취업 후 직장가입자로 복귀돼요",
    detail: "재취업하면 직장가입자로 자동 전환돼서 건강보험료가 다시 줄어요. 새 직장의 근로소득은 연말정산 대상이에요. 실업급여 수령액은 신고하지 않아요.",
    links: [
      { icon: "💰", title: "조기재취업수당 신청 조건", desc: "남은 급여 50% 일시금 수령", href: "/w/실업급여-재취업-조건" },
      { icon: "📊", title: "소정급여일수 기간표", desc: "수급 기간 조회", href: "/w/실업급여-소정급여일수" },
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
          { icon: "🏥", label: "임의계속가입 신청", desc: "직장가입자 보험료 36개월 유지", href: "/w/건강보험-임의계속가입-퇴직-후", hot: true },
          { icon: "📄", label: "비과세 기준 확인", desc: "소득세법 제12조 정리", href: "/w/실업급여-비과세" },
          { icon: "💰", label: "기초일액 계산", desc: "수급액 확인", href: "/w/실업급여-기초일액" },
        ]}
      />
      <SidebarDocs
        items={[
          { title: "소득세법 제12조", href: "https://www.law.go.kr/법령/소득세법" },
          { title: "실업급여 비과세 기준", href: "/w/실업급여-비과세" },
          { title: "건강보험 임의계속가입", href: "/w/건강보험-임의계속가입-퇴직-후" },
          { title: "지역가입자 보험료 계산", href: "/w/건강보험-지역가입자-보험료-계산" },
          { title: "수급 중 알바 신고", href: "/w/실업급여-받으면서-알바" },
        ]}
      />
      <SidebarCalc
        items={[
          { title: "기초일액 계산", href: "/w/실업급여-기초일액" },
          { title: "소정급여일수 조회", href: "/w/실업급여-소정급여일수" },
          { title: "연봉별 수급액 계산", href: "/w/실업급여-연봉별-계산" },
          { title: "지역가입자 보험료", href: "/w/건강보험-지역가입자-보험료-계산" },
          { title: "수급 기간 계산", href: "/w/실업급여-수급기간-몇개월-받나요" },
        ]}
      />
    </>
  );

  return (
    <BlogLayout
      sidebar={sidebar}
      disclaimer="이 글은 2026년 2월 소득세법·건강보험법 기준으로 작성됐어요. 개별 사안은 국세청·건강보험공단에서 확인하세요."
      breadcrumb={["홈", "실업급여", "세금"]}
      tags={["2026년 기준", "실업급여", "세금", "건강보험"]}
      date="2026-02-27"
      title={meta.title}
      description={<>{meta.description}</>}
      sourceBar={{ badge: "출처", name: "소득세법 제12조 · 건강보험법", date: "2026.02 기준" }}
    >
      <TOC items={[
        { t: "세금·보험료 상황 체크", sub: "소득세·건강보험 상황별 안내" },
        { t: "실업급여 세금 면제 기준은 무엇인가요?", sub: "소득세법 제12조 근거" },
        { t: "실업급여 세금이 없으면 연말정산도 제외되나요?", sub: "연말정산·종합소득세 신고 여부" },
        { t: "실업급여 세금과 건강보험료는 별개인가요?", sub: "지역가입자 전환 비용 구조" },
        { t: "실업급여 세금 관련 임의계속가입은 어떻게 하나요?", sub: "건강보험료 절약 방법" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "실업급여는 <strong>소득세법 제12조</strong>에 따라 세금이 전혀 없어요.",
        "퇴직 후 건강보험이 지역가입자로 전환되면 <strong>보험료가 오를 수 있어요</strong>.",
        "<strong>임의계속가입</strong>을 신청하면 최대 36개월 직장가입자 보험료를 유지해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <CheckerShell icon="💰" title="세금·보험료 상황 체크" label="퇴직 후 상황 기준">
        <Sec n="STEP 01" title="세금·보험료 상황 체크" sub="현재 상황을 선택해 주세요" />
        <P>실업급여는 세금이 없지만, 퇴직 후 건강보험 전환이나 다른 소득 여부에 따라 추가 비용이 발생할 수 있어요. <A href="https://www.law.go.kr/법령/소득세법">소득세법 제12조</A> 기준이에요.</P>
        <CheckerQ n={1} label="현재 상황을 선택해 주세요">
          <Btn group="situation" value="ui_only" label="실업급여만 받고 있어요" sel={sel} pick={pick} />
          <Btn group="situation" value="high_insurance" label="건강보험료가 많이 올랐어요" sel={sel} pick={pick} />
          <Btn group="situation" value="side_income" label="다른 소득도 있어요" sel={sel} pick={pick} />
          <Btn group="situation" value="rehired" label="재취업했어요" sel={sel} pick={pick} />
        </CheckerQ>
        {result?.pass === true && (
          <ResultPass title="세금 없음" desc={result.detail}>
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
        question="건강보험료가 생각보다 많이 오르셨나요?"
        body={<>임의계속가입을 신청하면 <strong style={{ color: C.navy }}>최대 36개월</strong> 동안 직장가입자 보험료를 그대로 유지할 수 있어요.</>}
        btnText="임의계속가입 신청 방법 보기 →"
        href="/w/건강보험-임의계속가입-퇴직-후"
      />

      {/* ── SECTION 02. 세금 면제 기준 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 세금 면제 기준은 무엇인가요?" sub="소득세법 제12조 근거 설명" />

      <P>실업급여는 <A href="https://www.law.go.kr/법령/소득세법">소득세법 제12조</A>에서 비과세 소득으로 분류돼요. 국가가 실직자 생계를 지원하는 급여이기 때문에 세금을 부과하지 않아요. 구직급여와 취직촉진수당 모두 비과세 소득이에요.</P>

      <P>비과세란 세금이 전혀 없다는 뜻이에요. 원천징수도 없고, 나중에 신고할 의무도 없어요. 받은 금액 그대로 입금돼요. 매달 통장에 들어오는 금액이 세전·세후 구분 없이 동일해요.</P>

      <P><B>비과세 소득은 어떤 세금 계산에도 합산되지 않아요.</B> 연간 소득 합계를 구할 때 실업급여는 제외해요. 종합소득세 신고서에도 실업급여를 기재하는 칸이 없어요.</P>

      <P>같은 해에 다른 소득이 있어도 실업급여 자체는 여전히 비과세예요. 다른 소득은 해당 소득 기준으로 신고하고, 실업급여는 제외해요. 두 가지가 합산되어 세금이 늘어나지는 않아요.</P>

      <InlineLink icon="📄" title="실업급여 비과세 소득 분류 기준" desc="소득세법 제12조 비과세 근거와 연말정산·종합소득세 제외 기준" href="/w/실업급여-비과세" />

      {/* ── SECTION 03. 연말정산 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 세금이 없으면 연말정산도 제외되나요?" sub="연말정산·종합소득세 신고 여부" />

      <P>실업급여만 받은 해에는 연말정산을 할 필요가 없어요. 비과세 소득이라 과세 대상 소득이 없기 때문이에요. 5월 종합소득세 신고도 마찬가지로 하지 않아도 돼요.</P>

      <P>퇴직 전 근로소득이 있었다면 그 부분은 연말정산이 필요해요. 퇴직 처리 시 회사에서 중도 퇴직자 연말정산을 해줘요. 실업급여는 포함하지 않고 근로소득만 기준으로 해요.</P>

      <P><B>사업소득이나 프리랜서 소득이 있으면 5월에 신고해야 해요.</B> 실업급여는 제외하고 사업·기타 소득만 신고해요. 실업급여 수령액을 신고서에 적을 필요는 없어요.</P>

      <P>재취업 후 받은 근로소득은 새 직장에서 연말정산해요. 실업급여 기간과 재취업 기간의 소득을 합산해서 신고할 필요가 없어요. 각각 별도로 처리해요.</P>

      <Info type="warn">{'<strong>주의:</strong> 프리랜서·사업소득이 있으면 <strong>5월 종합소득세 신고 대상</strong>이에요. 실업급여는 제외하고 해당 소득만 신고해요.'}</Info>

      <RelatedMid
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 가이드"
        items={[
          { title: "실업급여 비과세 상세 기준", href: "/w/실업급여-비과세", desc: "소득세법 제12조 기준 정리" },
          { title: "수급 중 알바 신고 기준", href: "/w/실업급여-받으면서-알바", desc: "알바 소득 처리 방법" },
          { title: "기초일액 계산 방법", href: "/w/실업급여-기초일액", desc: "수급액 확인" },
        ]}
      />

      {/* ── SECTION 04. 건강보험 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 세금과 건강보험료는 별개인가요?" sub="지역가입자 전환 비용 구조 설명" />

      <P>실업급여가 비과세라도 건강보험료는 별개로 내야 해요. 건강보험료는 소득세법이 아니라 건강보험법 기준으로 계산해요. 퇴직 후 지역가입자로 전환되면 재산·소득 기준으로 보험료가 산정돼요.</P>

      <P>실업급여 자체는 건강보험료 산정 소득에 포함되지 않아요. 하지만 퇴직 전 재산(부동산, 자동차 등)이나 다른 소득이 있으면 그것이 지역가입자 보험료 기준이 돼요.</P>

      <P><B>직장가입자와 지역가입자의 가장 큰 차이는 사업주 부담이에요.</B> 직장가입자는 회사가 50%를 부담해 주지만, 지역가입자는 전액 본인이 내요. 이 때문에 퇴직 후 건강보험료가 올라 보이는 경우가 많아요.</P>

      <P>실업급여 수급 기간에도 건강보험료를 계속 내야 해요. 수급 중에도 건강보험 혜택을 받으려면 보험료를 납부해야 해요.</P>

      <SpokeLink num="01" title="건강보험 임의계속가입 신청 방법" desc="퇴직 후 직장가입자 자격 36개월 유지 방법" href="/w/건강보험-임의계속가입-퇴직-후" />
      <SpokeLink num="02" title="건강보험 지역가입자 보험료 계산" desc="재산·소득 기준 지역가입자 보험료 산정 방법" href="/w/건강보험-지역가입자-보험료-계산" />

      {/* ── SECTION 05. 임의계속가입 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 세금 관련 임의계속가입은 어떻게 하나요?" sub="건강보험료 절약 방법 안내" />

      <P>임의계속가입을 신청하면 퇴직 후에도 최대 36개월 동안 직장가입자 건강보험료를 그대로 납부할 수 있어요. 지역가입자 보험료가 더 비싼 경우 유리한 제도예요.</P>

      <P>신청 기한이 중요해요. 퇴직일로부터 최초 지역가입자 보험료 고지서를 받은 날로부터 2개월 이내에 신청해야 해요. 기한을 넘기면 신청할 수 없어요.</P>

      <P><B>신청은 국민건강보험공단에서 해요.</B> 가까운 지사 방문이나 공단 홈페이지에서 신청할 수 있어요. 신청 후 지역가입자 보험료와 직장가입자 보험료 중 더 낮은 금액으로 납부하게 돼요.</P>

      <P>보험료를 비교해서 지역가입자 보험료가 낮으면 임의계속가입을 신청할 필요가 없어요. 퇴직 전 재산이 거의 없고 소득도 없다면 지역가입자 보험료가 오히려 낮을 수 있어요.</P>

      <InlineLink icon="🏥" title="건강보험 임의계속가입 신청 상세" desc="신청 기한, 유지 기간, 보험료 비교 방법 정리" href="/w/건강보험-임의계속가입-퇴직-후" />

      <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">건강보험공단 공식</span>
        <span className="ext-btn-text">임의계속가입 신청</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 비과세 소득 분류 — 연말정산 제외", desc: "실업급여 · 비과세", href: "/w/실업급여-비과세" },
        { title: "건강보험 임의계속가입 — 퇴직 후 신청", desc: "건강보험 · 임의계속가입", href: "/w/건강보험-임의계속가입-퇴직-후" },
        { title: "건강보험 지역가입자 보험료 계산", desc: "건강보험 · 지역가입자", href: "/w/건강보험-지역가입자-보험료-계산" },
        { title: "실업급여 받으면서 알바 신고 기준", desc: "실업급여 · 알바 신고", href: "/w/실업급여-받으면서-알바" },
        { title: "실업급여 기초일액 계산 — 상한 하한 적용", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 비과세 소득 분류", href: "/w/실업급여-비과세" }}
        next={{ title: "실업급여 상한액 하한액 기준", href: "/w/실업급여-상한액" }}
      />
    </BlogLayout>
  );
}
