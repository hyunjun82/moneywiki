"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A, H3,
  TableTitle, TableNote, TH, THL, Tag,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink, ExtBtn,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

/* ── meta ── */
const meta = {
  title: "실업급여 피보험기간 180일 계산 방법 | 이전직장 합산 18개월 기준",
  description:
    "퇴직 전 18개월 안에 180일을 채워야 실업급여를 받을 수 있어요. 이전 직장 합산 조건과 근무 형태별 계산 방법을 정리했어요.",
  category: "실업급여",
  keywords: ["피보험기간 180일", "계산 방법", "이전직장 합산", "18개월 기준"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-25",
  datePublished: "2026-02-25",
  summary: [
    "퇴직 전 18개월 안에 피보험단위기간 <strong>180일 이상</strong>이면 수급자격이 돼요.",
    "이전 직장에서 실업급여를 안 받았으면 <strong>합산</strong>할 수 있어요.",
    "질병·출산·육아로 쉬었다면 기준기간이 <strong>최대 3년</strong>까지 연장돼요.",
  ],
  sources: [
    { name: "고용보험법 제40조·제41조", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
    { name: "고용24 피보험자격이력 조회", url: "https://www.work24.go.kr", date: "2026-02" },
  ],
  faq: [
    {
      q: "실업급여 피보험기간 180일에 주휴일도 포함되나요?",
      a: "유급 주휴일은 포함돼요. 주 15시간 이상 근무하면 주 1일 유급 주휴일이 생기고, 이 날도 피보험단위기간에 들어가요. 무급 주휴일이라면 제외돼요.",
    },
    {
      q: "실업급여 피보험기간은 18개월 이전 것도 인정되나요?",
      a: "원칙적으로 퇴직일 이전 18개월만 봐요. 다만 질병·출산·육아로 30일 이상 보수를 못 받은 기간이 있으면 기준기간이 최대 3년까지 연장돼요.",
    },
  ],
  ctaCard: {
    label: "피보험기간 조회",
    mainText: "180일 이상이면 수급자격",
    subText: "고용24에서 내 가입이력 조회",
    url: "https://www.work24.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "실업급여 기준기간 18개월", url: "/w/실업급여-기준기간" },
    { title: "실업급여 수급 조건", url: "/w/실업급여-수급-조건" },
  ],
};

/* ── 체커 로직 (4문항) ── */
type Ans = Record<string, string>;

function getResult(a: Ans) {
  const { period, payType, prevJob, extend } = a;
  if (!period || !payType || !prevJob || !extend) return null;

  const hasExt = extend === "yes";
  const canCombine = prevJob === "avail";
  const prevUsed = prevJob === "used";

  /* 월별 추정 피보험단위일수 */
  const dpm = payType === "paid" ? 26 : payType === "unpaid" ? 22 : 15;
  const monthMap: Record<string, number> = { over9m: 10, "6to9m": 7.5, under6m: 4 };
  const months = monthMap[period] ?? 0;
  const est = period === "multi" ? 0 : Math.round(months * dpm);

  const periodOk = period === "multi" ? canCombine : est >= 180 || canCombine;
  const combineOk = canCombine || period !== "multi";
  const extDesc = hasExt ? "연장 가능 (최대 3년)" : "일반 18개월";

  /* 이전 수급이력 있음 → 합산 불가 */
  if (period === "multi" && prevUsed) {
    return (
      <ResultFail title="이전 수급이력이 있으면 그 이전 이력은 합산 안 돼요" desc="실업급여를 받은 적 있다면 그 시점에서 피보험기간이 초기화돼요. 이후 재취업해서 쌓은 기간만 합산 대상이에요.">
        <ResultGrid items={[
          { icon: "📆", name: "피보험기간", pass: false, desc: "합산 불가 (수급이력)" },
          { icon: "🔗", name: "이전 직장 합산", pass: false, desc: "수급이력으로 초기화" },
          { icon: "🗓️", name: "기준기간", pass: hasExt, desc: extDesc },
          { icon: "📋", name: "최종 판정", pass: false, desc: "수급자격 미달" },
        ]} />
        <div style={{ marginTop: 16 }}>
          <ResultCTA icon="🔗" title="기준기간 연장 사유 확인" desc="질병·출산·육아 연장 조건 정리" href="/w/실업급여-기준기간" />
          <ResultCTA icon="📋" title="수급자격 전체 조건 확인" desc="비자발적 퇴직 등 나머지 조건" href="/w/실업급여-수급-조건" />
          <ResultCTA icon="🏛️" title="고용24 피보험이력 조회" desc="직장별 피보험단위기간 확인" href="https://www.work24.go.kr" />
          <ResultCTA icon="📊" title="소정급여일수 기준표" desc="나이·가입기간별 수급일수" href="/w/실업급여-소정급여일수" />
        </div>
      </ResultFail>
    );
  }

  /* 여러 직장 합산 가능 → pass */
  if (period === "multi" && canCombine) {
    return (
      <ResultPass title="여러 직장 합산으로 180일 충족 가능성이 높아요" desc={`기준기간(18개월) 안에 있는 모든 직장의 피보험단위기간을 합산해요. 고용24에서 직장별 이력을 조회해보세요.${hasExt ? " 기준기간 연장(최대 3년)으로 합산 범위도 넓어져요." : ""}`}>
        <ResultGrid items={[
          { icon: "📆", name: "피보험기간", pass: true, desc: "합산 후 충족 가능" },
          { icon: "🔗", name: "이전 직장 합산", pass: true, desc: "실업급여 미수급 확인" },
          { icon: "🗓️", name: "기준기간", pass: true, desc: extDesc },
          { icon: "📋", name: "최종 판정", pass: true, desc: "수급자격 확인 필요" },
        ]} />
        <ResultCTA icon="📋" title="수급자격 전체 조건 확인" desc="비자발적 퇴직 조건까지 한눈에" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="💰" title="기초일액 상한·하한 확인" desc="평균임금 60% 기준 지급액" href="/w/실업급여-기초일액" />
        <ResultCTA icon="🏛️" title="고용24 피보험이력 조회" desc="직장별 피보험단위기간 확인" href="https://www.work24.go.kr" />
        <ResultCTA icon="📊" title="소정급여일수 기준표" desc="나이·가입기간별 수급일수" href="/w/실업급여-소정급여일수" />
      </ResultPass>
    );
  }

  /* 단독 180일 충족 */
  if (est >= 180) {
    const payLabel = payType === "paid" ? "유급 주휴" : payType === "unpaid" ? "무급 주휴" : "일용직";
    return (
      <ResultPass title={`추정 약 ${est}일 — 180일 충족 가능성이 높아요`} desc={`${payLabel} 기준으로 약 ${est}일이에요. 정확한 날수는 고용24에서 조회해보세요.${hasExt ? " 기준기간 연장(최대 3년)도 적용 가능해요." : ""}`}>
        <ResultGrid items={[
          { icon: "📆", name: "피보험기간", pass: true, desc: `약 ${est}일 (180일 이상)` },
          { icon: "🔗", name: "이전 직장 합산", pass: canCombine, desc: canCombine ? "합산 가능" : "현재 직장만" },
          { icon: "🗓️", name: "기준기간", pass: true, desc: extDesc },
          { icon: "📋", name: "최종 판정", pass: true, desc: "피보험기간 충족" },
        ]} />
        <ResultCTA icon="📋" title="수급자격 전체 조건 확인" desc="비자발적 퇴직 조건까지 한눈에" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="💰" title="기초일액 상한·하한 확인" desc="평균임금 60% 기준 지급액" href="/w/실업급여-기초일액" />
        <ResultCTA icon="🏛️" title="고용24 피보험이력 조회" desc="직장별 피보험단위기간 확인" href="https://www.work24.go.kr" />
        <ResultCTA icon="📊" title="소정급여일수 기준표" desc="나이·가입기간별 수급일수" href="/w/실업급여-소정급여일수" />
      </ResultPass>
    );
  }

  /* 부족 + 합산 가능 */
  if (canCombine) {
    return (
      <ResultPass title={`단독 약 ${est}일이지만 이전 직장 합산 시 충족 가능해요`} desc={`현재 직장만으로는 약 ${180 - est}일 부족해요. 이전 직장에서 실업급여를 받지 않았으니 합산이 가능해요.${hasExt ? " 기준기간 연장도 적용돼요." : ""} 고용센터에서 최종 확인해보세요.`}>
        <ResultGrid items={[
          { icon: "📆", name: "피보험기간", pass: false, desc: `약 ${est}일 (합산 필요)` },
          { icon: "🔗", name: "이전 직장 합산", pass: true, desc: "미수급 이력 합산 가능" },
          { icon: "🗓️", name: "기준기간", pass: true, desc: extDesc },
          { icon: "📋", name: "최종 판정", pass: true, desc: "합산 후 충족 가능" },
        ]} />
        <ResultCTA icon="📋" title="수급자격 전체 조건 확인" desc="비자발적 퇴직 조건까지 한눈에" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="🔗" title="기준기간 연장 사유 확인" desc="질병·출산·육아 연장 조건 정리" href="/w/실업급여-기준기간" />
        <ResultCTA icon="🏛️" title="고용24 피보험이력 조회" desc="직장별 피보험단위기간 확인" href="https://www.work24.go.kr" />
        <ResultCTA icon="💰" title="기초일액 상한·하한 확인" desc="평균임금 60% 기준 지급액" href="/w/실업급여-기초일액" />
      </ResultPass>
    );
  }

  /* 부족 + 연장 가능 */
  if (hasExt) {
    return (
      <ResultFail title={`약 ${est}일로 부족하지만 기준기간 연장은 적용 가능해요`} desc="현재 직장만으로는 180일에 못 미쳐요. 기준기간이 최대 3년까지 연장되면 더 오래된 이력이 포함될 수 있어요. 고용센터에 연장 사유를 신청해보세요.">
        <ResultGrid items={[
          { icon: "📆", name: "피보험기간", pass: false, desc: `약 ${est}일 (180일 미달)` },
          { icon: "🔗", name: "이전 직장 합산", pass: false, desc: "합산 가능 이력 없음" },
          { icon: "🗓️", name: "기준기간", pass: true, desc: "연장 신청 가능" },
          { icon: "📋", name: "최종 판정", pass: false, desc: "기준기간 연장 후 재확인" },
        ]} />
        <div style={{ marginTop: 16 }}>
          <ResultCTA icon="🔗" title="기준기간 연장 사유 확인" desc="질병·출산·육아 연장 조건 정리" href="/w/실업급여-기준기간" />
          <ResultCTA icon="📋" title="수급자격 전체 조건 확인" desc="비자발적 퇴직 조건까지 한눈에" href="/w/실업급여-수급-조건" />
          <ResultCTA icon="🏛️" title="고용24 피보험이력 조회" desc="직장별 피보험단위기간 확인" href="https://www.work24.go.kr" />
          <ResultCTA icon="📊" title="소정급여일수 기준표" desc="나이·가입기간별 수급일수" href="/w/실업급여-소정급여일수" />
        </div>
      </ResultFail>
    );
  }

  /* 완전 부족 */
  return (
    <ResultFail title={`약 ${est}일로 180일 충족이 어려워요`} desc={`현재 직장만으로는 약 ${180 - est}일 부족하고, 합산할 이전 직장이나 기준기간 연장 사유도 없어요.${prevUsed ? " 이전 수급이력이 있어 그 이전 경력은 소멸됐어요." : ""} 추가 근무 후 재확인해보세요.`}>
      <ResultGrid items={[
        { icon: "📆", name: "피보험기간", pass: false, desc: `약 ${est}일 (180일 미달)` },
        { icon: "🔗", name: "이전 직장 합산", pass: false, desc: prevUsed ? "수급이력으로 초기화" : "합산 이력 없음" },
        { icon: "🗓️", name: "기준기간", pass: false, desc: "일반 18개월" },
        { icon: "📋", name: "최종 판정", pass: false, desc: "피보험기간 미달" },
      ]} />
      <div style={{ marginTop: 16 }}>
        <ResultCTA icon="🔗" title="기준기간 연장 사유 확인" desc="질병·출산·육아 연장 조건 정리" href="/w/실업급여-기준기간" />
        <ResultCTA icon="📋" title="수급자격 전체 조건 확인" desc="비자발적 퇴직 조건까지 한눈에" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="🏛️" title="고용24 피보험이력 조회" desc="직장별 피보험단위기간 확인" href="https://www.work24.go.kr" />
        <ResultCTA icon="📊" title="소정급여일수 기준표" desc="나이·가입기간별 수급일수" href="/w/실업급여-소정급여일수" />
      </div>
    </ResultFail>
  );
}

/* ── 본문 ── */
export default function Article83() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "피보험기간 180일"]}
      tags={["2026년 기준", "실업급여", "피보험기간"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          퇴직 전 18개월 안에 180일을 채워야 실업급여를 받을 수 있어요. 이전 직장 합산 조건과
          근무 형태별 <strong style={{ color: C.t1 }}>계산 방법</strong>을 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제40조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="피보험기간 요건"
      stickyValue="180일 이상"
      stickyBtn="고용24 조회 →"
      stickyHref="https://www.work24.go.kr"
      disclaimer="이 글은 고용보험법을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "📊", title: "내 피보험기간 조회", sub: "고용24에서 무료 확인", href: "https://www.work24.go.kr", hot: true },
              { icon: "💰", title: "실업급여 계산기", sub: "예상 수령액 계산", href: "/w/실업급여-계산기" },
              { icon: "📋", title: "수급자격 전체 조건", sub: "비자발적 퇴직 기준", href: "/w/실업급여-수급-조건" },
            ]}
          />
          <SidebarDocs
            items={[
              { title: "기준기간 18개월 계산", cat: "실업급여·기준기간", href: "/w/실업급여-기준기간" },
              { title: "소정급여일수 기준표", cat: "실업급여·수급기간", href: "/w/실업급여-소정급여일수" },
              { title: "기초일액 상한·하한", cat: "실업급여·금액", href: "/w/실업급여-기초일액" },
            ]}
          />
          <SidebarCalc
            items={[
              { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
              { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
              { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
              { title: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
              { title: "대출이자 계산기", href: "/w/대출이자-계산기" },
            ]}
          />
        </>
      }
    >
      {/* ── TOC ── (FIX #1: H3 풀타이틀) */}
      <TOC
        items={[
          { t: "내 피보험기간 180일 충족 여부 체크", sub: "근무 기간 · 주휴수당 · 이전직장 · 연장 사유 간편 확인" },
          { t: "피보험기간 180일은 어떻게 계산하나요?", sub: "기본 계산 공식 · 근무 형태별 충족 기간표" },
          { t: "유급일과 무급일 차이가 뭐예요?", sub: "피보험단위기간 포함·제외 기준 · 근무 형태별 충족 예시 3가지" },
          { t: "이전 직장 근무 기간도 합산할 수 있나요?", sub: "합산 인정 조건 3가지 · 이전 직장 합산 판단표" },
          { t: "18개월 기준기간은 연장 가능한가요?", sub: "기준 연장 인정 사유 · 기준기간 연장 계산 예시" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* ── Summary + Bridge ── */}
      <Summary3
        items={[
          "퇴직 전 18개월 안에 피보험단위기간 <strong>180일 이상</strong>이면 수급자격이 돼요.",
          "이전 직장에서 실업급여를 안 받았으면 <strong>합산</strong>할 수 있어요.",
          "질병·출산·육아로 쉬었다면 기준기간이 <strong>최대 3년</strong>까지 연장돼요.",
        ]}
      />

      {/* FIX #3: PAS 브릿지 카드 */}
      <BridgeCard
        question="피보험기간이 180일 안 될 것 같아도 포기하지 마세요"
        body={
          <>
            이전 직장 합산이나 기준기간 연장으로 충족될 수 있어요.
            주5일 유급 주휴 기준 <strong style={{ color: C.navy }}>약 7개월</strong>이면 180일이 돼요.
            일용직이라도 12개월 꾸준히 일했으면 가능해요.
          </>
        }
        btnText="내 상황 체크해보기 ↓"
        href="#s0"
      />

      {/* ── STEP 01: 체커 (FIX #2: 4문항) ── */}
      <Divider />
      <Sec n="1" id="s0" title="내 피보험기간 180일 충족 여부 체크" sub="4가지만 선택하면 바로 알 수 있어요" />

      <P>
        기준기간 안에서 피보험기간 180일을 채워야 실업급여를 받을 수 있어요. 피보험단위기간은
        달력 날짜가 아니라 <B>실제로 보수를 받은 날</B>만 세기 때문에, 근무 형태에 따라 충족 시점이 달라져요.
        내 상황에 맞는지 간편하게 확인해 보세요.
      </P>

      <P>
        아래 체커는 근무 기간, 주휴수당 여부, 이전 직장 합산 가능성, 기준기간 연장 사유를 종합적으로
        따져봐요. 모든 항목을 선택하면 예상 결과가 나와요.
      </P>

      <CheckerShell title="피보험기간 180일 충족 체크" sub="4가지 항목을 선택하면 결과가 나와요">
        <CheckerQ n="1" label="최근 직장 근무 기간이 얼마나 됐나요?" group="period" opts={[["over9m", "9개월 이상"], ["6to9m", "6~9개월"], ["under6m", "6개월 미만"], ["multi", "여러 직장 합산"]]} sel={ans} pick={pick} />
        <CheckerQ n="2" label="주휴수당을 받고 있나요?" group="payType" opts={[["paid", "주휴수당 있음 (유급)"], ["unpaid", "주휴수당 없음 (무급)"], ["daily", "일용직·파트타임"]]} sel={ans} pick={pick} />
        <CheckerQ n="3" label="이전 직장에서 실업급여를 받은 적 있나요?" group="prevJob" opts={[["none", "이전 직장 없음"], ["avail", "있음, 실업급여 안 받음"], ["used", "있음, 실업급여 받았음"]]} sel={ans} pick={pick} />
        <CheckerQ n="4" label="기준기간 연장 사유가 있나요?" group="extend" opts={[["none", "없어요"], ["yes", "질병·출산·육아로 쉰 기간 있음"]]} sel={ans} pick={pick} />
        {result}
      </CheckerShell>

      {/* ── SECTION 02: 피보험기간 180일 ── */}
      <Divider />
      <Sec n="2" id="s1" title="실업급여 피보험기간 180일은 어떻게 계산하나요?" sub="퇴직 전 18개월 중 보수 지급일 기준으로 세요" />

      <P>
        <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제40조</A>에 따르면, 실업급여를 받으려면
        <B>퇴직일 이전 18개월</B> 동안 피보험단위기간이 <B>180일 이상</B>이어야 해요. 여기서 180일은
        달력 날짜가 아니라 실제로 보수를 받은 날만 세는 거예요. 6개월이 아니라 180&quot;일&quot;이라는 점이 중요해요.
      </P>

      <H3>기본 계산 공식</H3>

      <FormulaCard
        formula="수급요건 = 퇴직일 이전 18개월 중 피보험단위기간 ≥ 180일"
        notes={[
          "피보험단위기간 = 실제 근무일 + 유급휴일(주휴·연차)",
          "무급휴직, 무급휴일, 결근은 제외",
          "일용직은 실제 근무한 날만 1일씩 적립",
        ]}
      />

      <P>
        왜 18개월로 정한 걸까요? 최근 고용 상태를 보기 위해서예요. 10년 전에 잠깐 일한 경력이 지금
        실직 상태와 크게 관련이 없잖아요. 비교적 최근 18개월 안에 꾸준히 일했다는 걸 확인하는 방식이에요.
        다만 질병이나 출산으로 쉰 기간이 있으면 18개월보다 더 넓게 봐줘요 (최대 3년까지).
      </P>

      <H3>근무 형태별 충족 기간표</H3>

      <P>
        주5일 근무자라면 주휴일 포함 시 주당 약 6일이 쌓여요. 그래서 <B>약 7~8개월</B>이면 180일을 채울 수
        있어요. 다만 주휴수당이 없는 곳이라면 주당 5일만 계산되니까 약 9개월이 걸려요.
        일용직은 실제 출근한 날만 세기 때문에 <B>12개월 이상</B> 걸릴 수 있어요.
      </P>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>근무 형태</THL><TH>월 피보험일수</TH><TH>180일 충족</TH><TH>비고</TH></tr>
          </thead>
          <tbody>
            {[
              ["주5일 (유급 주휴)", "약 26일", "약 7개월", "가장 빠름"],
              ["주5일 (무급 주휴)", "약 22일", "약 8~9개월", "주말 제외"],
              ["주3일 파트타임", "약 13일", "약 14개월", "주15h 미만 시 주휴 없음"],
              ["일용직 (월 15일)", "약 15일", "약 12개월", "출근일만 산정"],
              ["일용직 (월 20일)", "약 20일", "약 9개월", "출근일만 산정"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: "8px 10px",
                    textAlign: ci === 0 ? "left" : "center",
                    borderBottom: `1px solid ${C.line}`,
                    color: ci === 0 ? C.t1 : C.t2,
                    fontWeight: ci <= 1 ? 600 : 400,
                    background: ri === 0 ? "#F0F5FF" : "transparent",
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 파란 행 = 가장 일반적인 주5일 정규직 기준. 주휴수당 유무에 따라 큰 차이.</TableNote>

      <P>
        위 표에서 보듯이 같은 주5일 근무라도 주휴수당이 있느냐 없느냐에 따라 약 2개월 차이가 나요.
        퇴사 전에 고용24(work24.go.kr)에서 &quot;피보험자격 이력 조회&quot;를 하면 직장별 피보험단위기간을
        정확하게 확인할 수 있어요.
      </P>

      <Info type="tip">{'<strong>팁:</strong> 고용24(work24.go.kr)에서 "피보험자격 이력 조회"를 하면 직장별 피보험단위기간이 정확하게 나와요. 퇴사 전에 미리 확인해두면 좋아요.'}</Info>

      <InlineLink icon="📊" title="실업급여 기준기간 18개월 — 범위와 연장 사유" desc="18개월 기준기간과 180일 피보험기간의 관계를 상세히 정리했어요." href="/w/실업급여-기준기간" />

      {/* ── SECTION 03: 유급일·무급일 차이 ── */}
      <Divider />
      <Sec n="3" id="s2" title="실업급여 피보험기간 계산 방법에서 유급일과 무급일 차이가 뭐예요?" sub="포함되는 날 vs 제외되는 날" />

      <P>
        피보험단위기간에 포함되는 날과 제외되는 날이 있어요. 핵심은 <B>보수 지급의 기초가 되는 날</B>이냐
        아니냐예요. 출근해서 일한 날은 당연히 포함되고, 쉬었지만 급여가 나온 날도 포함돼요.
        반면 무급 휴직이나 무급 휴일은 아무리 길어도 피보험단위기간에 안 들어가요.
      </P>

      <P>
        이 구분이 중요한 이유는 같은 기간 근무하더라도 <B>유급 주휴일이 있는 직장</B>과 없는 직장의
        피보험단위기간이 크게 달라지기 때문이에요. 월급제 정규직은 주말도 유급 처리되는 경우가 많아서
        일급제나 일용직보다 훨씬 빨리 180일을 채울 수 있어요.
      </P>

      <TableTitle>피보험단위기간 포함·제외 기준</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><TH>포함 여부</TH><TH>설명</TH></tr>
          </thead>
          <tbody>
            {[
              ["실제 근무일", "포함", "출근해서 근로한 날"],
              ["유급 주휴일", "포함", "주 15시간 이상 근무 시 발생"],
              ["유급 연차·공휴일", "포함", "쉬어도 급여가 나오는 날"],
              ["유급 휴업일", "포함", "회사 사정으로 쉬고 휴업수당 받은 날"],
              ["무급 휴직", "제외", "육아휴직 중 급여 없는 기간 등"],
              ["무급 휴일·결근", "제외", "급여가 나오지 않는 휴일"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: "8px 10px",
                    textAlign: ci === 0 ? "left" : "center",
                    borderBottom: `1px solid ${C.line}`,
                    color: ci === 1 ? (cell === "포함" ? C.navy : "#B91C1C") : C.t2,
                    fontWeight: ci <= 1 ? 600 : 400,
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 월급제는 주말도 유급으로 처리되는 경우가 많아 일급제보다 빨리 쌓여요.</TableNote>

      <P>
        예를 들어 주5일제 직장에서 주휴수당을 받는다면 주 6일이 피보험단위기간으로 잡혀요. 반면
        일용직은 실제 출근한 날만 하루씩 쌓이기 때문에 180일을 채우려면 꽤 오래 걸릴 수 있어요.
        아래 3가지 예시로 비교해볼게요.
      </P>

      <H3>근무 형태별 충족 예시 3가지</H3>

      <CaseBox
        badge="예시 1"
        label="주5일 정규직 김 대리(30세), 주휴 유급"
        conditions={["주 5일 근무 + 유급 주휴", "월 평균 피보험단위 약 26일"]}
        steps={[
          { label: "월 피보험단위기간", value: "약 26일 (근무 22일 + 주휴 4일)" },
          { label: "180일 충족 기간", value: "약 7개월 (26일 × 7 = 182일)" },
        ]}
        total="7개월 근무 → 180일 충족"
        result="수급자격 충족"
        pass={true}
      />

      <CaseBox
        badge="예시 2"
        label="주5일 계약직 이 씨(27세), 주휴 무급"
        conditions={["주 5일 근무 + 무급 주휴", "월 평균 피보험단위 약 22일"]}
        steps={[
          { label: "월 피보험단위기간", value: "약 22일 (근무일만)" },
          { label: "180일 충족 기간", value: "약 8.2개월 (22일 × 8.2 ≈ 180일)" },
        ]}
        total="약 9개월 근무하면 안정적으로 충족"
        result="9개월 근무 시 수급자격 충족"
        pass={true}
      />

      <CaseBox
        badge="예시 3"
        label="일용직 박 씨(45세), 월 15일 근무"
        conditions={["일당제, 월 평균 15일 출근", "유급휴일 없음"]}
        steps={[
          { label: "월 피보험단위기간", value: "약 15일 (출근일만)" },
          { label: "180일 충족 기간", value: "12개월 (15일 × 12 = 180일)" },
        ]}
        total="12개월 꾸준히 일해야 180일 충족"
        result="12개월 근무 시 수급자격 충족"
        pass={true}
      />

      <Info type="warn">{'<strong>무급휴직은 제외지만 기준기간은 연장돼요.</strong> 육아휴직 중 급여를 받지 않는 기간은 피보험단위기간에 안 들어가요. 대신 기준기간(18개월)을 그만큼 연장하는 효과가 있어요.'}</Info>

      {/* ── RelatedMid (FIX #4: 허브 링크 추가) ── */}
      <RelatedMid
        title="실업급여 수급 조건도 같이 확인해 보세요"
        items={[
          { icon: "📋", title: "실업급여 수급 조건 자격요건", desc: "180일 외 나머지 조건 정리", href: "/w/실업급여-수급-조건" },
          { icon: "💰", title: "기초일액 상한·하한 기준", desc: "평균임금 60% 지급액 계산", href: "/w/실업급여-기초일액" },
          { icon: "📊", title: "소정급여일수 기준표", desc: "나이·가입기간별 수급일수", href: "/w/실업급여-소정급여일수" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      {/* ── SECTION 04: 이전직장 합산 ── */}
      <Divider />
      <Sec n="4" id="s3" title="실업급여 이전직장 합산은 어떻게 하나요?" sub="미수급 + 기준기간 이내면 합산 가능" />

      <P>
        현재 직장에서 180일을 못 채웠더라도 바로 포기할 필요는 없어요. 이전 직장에서
        <B>실업급여를 받지 않았다면</B> 그 피보험기간을 합산할 수 있어요.
        <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제41조</A>에서 보장하는 권리예요.
        실제로 짧은 계약직을 여러 번 거친 분들이 이 합산 제도 덕분에 수급자격을 얻는 경우가 꽤 많아요.
      </P>

      <H3>합산 인정 조건 3가지</H3>

      <P>
        첫째, 이전 직장에서 실업급여를 <B>한 번도 받지 않았어야</B> 해요. 일부만 받고 남은 일수를 포기한 경우에도
        수급 이력으로 잡혀서 합산이 안 돼요. 실업급여를 받으면 그 시점에서 피보험기간이 초기화되기 때문이에요.
      </P>

      <P>
        둘째, 이전 직장 퇴직일이 <B>기준기간(18개월, 연장 시 최대 3년) 안에</B> 있어야 해요. 기준기간 밖의
        근무 이력은 합산 대상이 아니에요. 예를 들어 3년 전에 퇴직한 직장은 기준기간 연장 사유가 없으면 합산이 안 돼요.
      </P>

      <P>
        셋째, 이전 직장에서 <B>고용보험에 가입돼 있었어야</B> 해요. 4대보험 미가입 사업장이었다면
        소급가입 절차를 통해 피보험기간을 확보할 수도 있어요. 근로계약서나 급여 이체 내역이 증빙이 돼요.
      </P>

      <TableTitle>이전 직장 합산 판단표</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>상황</THL><TH>합산</TH><TH>근거</TH></tr>
          </thead>
          <tbody>
            {[
              ["이전 직장 실업급여 미수급 + 기준기간 이내", "가능", "제41조 제1항"],
              ["이전 직장 실업급여 수급 완료 후 재취업", "불가", "수급이력 있음"],
              ["이전 직장 퇴직 후 기준기간(18개월) 초과 공백", "불가", "기준기간 밖"],
              ["2개 이상 이전 직장(모두 미수급)", "가능", "여러 직장 합산 가능"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: "8px 10px",
                    textAlign: ci === 0 ? "left" : "center",
                    borderBottom: `1px solid ${C.line}`,
                    color: ci === 1 ? (cell === "가능" ? C.navy : "#B91C1C") : C.t2,
                    fontWeight: ci <= 1 ? 600 : 400,
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 고용보험법 제41조 기준. 합산 여부는 고용센터에서 자동 확인돼요.</TableNote>

      <P>
        합산 절차는 별도로 신청할 필요가 없어요. 고용센터에서 실업급여 신청 시 고용보험 가입이력을 자동으로
        조회해서 합산 가능한 이력을 반영해줘요. 다만 고용보험 미가입 직장이 있었다면 소급가입 신청을 먼저 해야
        합산이 돼요.
      </P>

      <BridgeCard
        question="고용보험 미가입 사업장이었다면 어떻게 하나요?"
        body={
          <>
            회사가 고용보험을 안 넣어줬더라도 <strong style={{ color: C.navy }}>소급가입 신청</strong>이 가능해요.
            근로계약서나 급여명세서를 증빙으로 제출하면 돼요.
          </>
        }
        btnText="고용보험 미가입 소급가입 방법 →"
        href="/w/실업급여-수급-조건"
      />

      {/* ── SECTION 05: 18개월 기준기간 연장 ── */}
      <Divider />
      <Sec n="5" id="s4" title="실업급여 18개월 기준기간은 연장 가능한가요?" sub="질병·출산·육아 사유 시 최대 3년" />

      <P>
        기준기간은 원칙적으로 퇴직일 이전 18개월이에요. 하지만 그 기간 중에 <B>일을 할 수 없었던 정당한 사유</B>가
        있으면 그만큼 기준기간이 연장돼요. 예를 들어 육아휴직을 1년 썼다면 기준기간이 18개월 + 12개월 = 30개월로
        넓어지는 거예요. 그만큼 이전 직장의 피보험기간까지 포함시킬 수 있어서 합산 범위가 넓어져요.
      </P>

      <H3>기준 연장 인정 사유</H3>

      <P>
        연장이 인정되는 사유는 질병·부상, 임신·출산, 육아(만 8세 이하 자녀), 병역, 자연재해 등이에요.
        <B>최대 3년</B>까지 연장될 수 있어요. 증빙서류(진단서, 출생증명서, 군복무확인서 등)를 고용센터에
        제출해야 해요. 연장 사유가 여러 개 있으면 기간이 중복되지 않는 범위에서 합산돼요.
      </P>

      <P>
        예를 들어 출산(3개월) + 육아휴직(12개월)이면 총 15개월이 연장 사유로 인정돼요.
        기준기간이 18개월 + 15개월 = 33개월이 되지만, 최대 한도가 3년(36개월)이니까
        33개월로 적용돼요. 이렇게 넓어진 기간 안에 이전 직장이 포함되면 합산이 가능해져요.
      </P>

      <P>
        연장된 기준기간 안에서 이전 직장의 피보험기간도 함께 합산될 수 있어요. 연장 사유가 있다면 꼭 신청하세요.
        기준기간이 넓어지면 합산할 수 있는 이전 직장 범위도 넓어지니까요. 특히 계약직을 여러 번 거친 분들에게
        이 제도가 큰 도움이 돼요.
      </P>

      <H3>기준기간 연장 계산 예시</H3>

      <CaseBox
        badge="연장 예시"
        label="박 과장(36세), 육아휴직 1년 사용 후 퇴직"
        conditions={["현재 직장 3년 근무 중 육아휴직 12개월", "퇴직일: 2026년 2월"]}
        steps={[
          { label: "기본 기준기간", value: "18개월 (2024.08 ~ 2026.02)" },
          { label: "연장 사유", value: "육아휴직 12개월" },
          { label: "연장 후 기준기간", value: "30개월 (2023.08 ~ 2026.02)" },
        ]}
        total="30개월 범위 안에서 피보험단위기간 합산"
        result="기준기간 연장으로 180일 충족 가능"
        pass={true}
      />

      <Info type="warn">{'<strong>과거 실업급여 수급 이력이 있으면 초기화돼요.</strong> 2022년에 실업급여를 받았다면 그 이전 경력은 전부 소멸해요. 2022년 이후 재취업해서 쌓은 피보험기간만 계산 대상이에요.'}</Info>

      <InlineLink icon="💰" title="실업급여 기초일액 — 평균임금 60% 계산" desc="180일 충족 후 궁금한 건 지급액이에요. 상한·하한 기준을 정리했어요." href="/w/실업급여-기초일액" />

      <ExtBtn
        badge="고용24 공식"
        text="피보험자격 이력 조회"
        cta="조회하기 →"
        href="https://www.work24.go.kr/re/b/REREABA01.do"
      />

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>실업급여 피보험기간 관련 글 더 보기</div>
        <SpokeLink num="01" title="기준기간 18개월과 연장 사유 확인" desc="범위와 연장 조건 상세 정리" href="/w/실업급여-기준기간" />
        <SpokeLink num="02" title="연봉별 예상 수령액 계산" desc="내 연봉 기준 실업급여 금액" href="/w/실업급여-연봉별-계산" />
        <SpokeLink num="03" title="구직활동 인정 증빙 방법" desc="워크넷 입사지원 등 인정 방법" href="/w/실업급여-구직활동" />
      </div>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="6" id="s-faq" title="자주 묻는 질문" sub="" />
      <FAQAccordion
        items={[
          {
            q: "실업급여 피보험기간 180일에 주휴일도 포함되나요?",
            a: '유급 주휴일은 포함돼요. 주 15시간 이상 근무하면 주 1일 유급 주휴일이 생기고, 이 날도 피보험단위기간에 들어가요. <strong>무급 주휴일이라면 제외</strong>돼요.',
          },
          {
            q: "실업급여 피보험기간은 18개월 이전 것도 인정되나요?",
            a: '원칙적으로 <strong>퇴직일 이전 18개월</strong>만 봐요. 다만 질병·출산·육아 등으로 30일 이상 보수를 못 받은 기간이 있으면 기준기간이 <strong>최대 3년</strong>까지 연장돼요.',
          },
        ]}
      />

      <RelatedArticles
        items={[
          { title: "실업급여 기준기간 이직일 18개월", desc: "실업급여 · 기준기간", href: "/w/실업급여-기준기간" },
          { title: "실업급여 수급 조건 자격요건", desc: "실업급여 · 수급조건", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 기초일액 상한·하한", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
          { title: "실업급여 소정급여일수 기준표", desc: "실업급여 · 수급기간", href: "/w/실업급여-소정급여일수" },
          { title: "실업급여 연봉별 수령액 계산", desc: "실업급여 · 계산", href: "/w/실업급여-연봉별-계산" },
        ]}
      />

      <PrevNext
        prev={{ title: "실업급여 기준기간 18개월 계산", href: "/w/실업급여-기준기간" }}
        next={{ title: "실업급여 기초일액 상한·하한", href: "/w/실업급여-기초일액" }}
      />
    </BlogLayout>
  );
}
