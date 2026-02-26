"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "고용보험료 계산 2026년 요율 | 1.8% 근로자 사업주 부담금",
  description:
    "급여명세서에서 빠지는 고용보험료가 정확히 얼마인지 궁금하시죠? 2026년 요율은 근로자 0.9%이고, 월급 300만원이면 27,000원이에요. 사업장 규모별 사업주 추가 부담금 차이도 정리했어요.",
  category: "실업급여",
  keywords: ["2026 요율", "사업장 규모별", "고용보험료 계산", "1.8% 부담"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-13",
  summary: [
    "2026년 고용보험료 요율은 근로자 0.9%, 사업주 0.9% 합산 1.8%예요",
    "월급 300만원 기준 근로자 부담은 매달 27,000원이에요",
    "사업주는 규모에 따라 0.25~0.85% 고용안정·직능 보험료를 추가 부담해요",
  ],
  sources: [
    { name: "고용보험법 시행령 보험료율", url: "https://www.law.go.kr/법령/고용보험및산업재해보상보험의보험료징수등에관한법률", date: "2026-01" },
    { name: "근로복지공단 보험료 안내", url: "https://www.kcomwel.or.kr/kcomwel/paym/insr/insr.jsp", date: "2026-02" },
  ],
  faq: [
    {
      q: "고용보험료 상여금도 보수총액에 포함되나요?",
      a: "네, 상여금·수당 등 세법상 과세되는 임금은 전부 보수총액에 포함돼요. 비과세 식대(월 20만원까지)와 차량유지비(월 20만원까지)는 제외될 수 있어서, 같은 연봉이어도 실제 보험료는 달라질 수 있어요.",
    },
    {
      q: "고용보험료를 사업주가 근로자 몫까지 대신 내줄 수 있나요?",
      a: "법적으로는 근로자 0.9%와 사업주 0.9%가 따로 정해져 있어요. 실무에서 사업주가 근로자 부담분까지 대납하는 경우가 있지만, 그 금액은 근로소득으로 잡혀서 세금이 더 나올 수 있어요.",
    },
  ],
  ctaCard: {
    label: "10초 계산",
    mainText: "내 고용보험료 얼마?",
    subText: "월급만 입력하면 바로 나와요",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 수급 조건 정리", url: "/w/실업급여-수급-조건" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
function getResult(a: Ans) {
  if (!a.salary || !a.role || !a.size || !a.bonus) return null;

  const salMap: Record<string, number> = {
    under200: 2000000, "200to300": 3000000,
    "300to400": 4000000, over400: 5000000,
  };
  const sal = salMap[a.salary] || 3000000;
  const salLabel = (sal / 10000).toLocaleString() + "만원";
  const wFee = Math.round(sal * 0.009);

  const extraMap: Record<string, [number, string]> = {
    under150: [0.0025, "0.25%"],
    "150to1000": [0.0065, "0.65%"],
    over1000: [0.0085, "0.85%"],
  };
  const [extraRate, extraLabel] = extraMap[a.size] || [0.0025, "0.25%"];
  const eBase = Math.round(sal * 0.009);
  const eExtra = Math.round(sal * extraRate);
  const eTotal = eBase + eExtra;

  const bonusNote = a.bonus === "yes"
    ? "상여금 포함 기준이에요. 실제 금액과 거의 같아요."
    : "기본급만 기준이에요. 상여금이 포함되면 실제 보험료가 더 높을 수 있어요.";

  if (a.role === "worker") {
    return (
      <ResultPass
        title={`월 ${wFee.toLocaleString()}원 공제 예상`}
        desc={`월급 ${salLabel} 기준 근로자 부담분이에요. ${bonusNote}`}
      >
        <ResultGrid items={[
          { icon: "💰", name: "근로자 부담", pass: true, desc: `${wFee.toLocaleString()}원/월` },
          { icon: "📊", name: "적용 요율", pass: true, desc: "0.9%" },
          { icon: "🏢", name: "사업주 부담(참고)", pass: true, desc: `${eTotal.toLocaleString()}원/월` },
          { icon: "📅", name: "연간 납부 예상", pass: true, desc: `${(wFee * 12).toLocaleString()}원` },
        ]} />
        <ResultCTA icon="📊" title="실업급여 수급 조건" desc="피보험기간 180일 충족 여부 확인" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="🔢" title="실업급여 연봉별 계산" desc="퇴직 후 받을 금액 미리 확인" href="/w/실업급여-연봉별-계산" />
        <ResultCTA icon="📋" title="피보험기간 180일 계산" desc="이전 직장 합산 방법" href="/w/실업급여-피보험기간-180일-계산" />
      </ResultPass>
    );
  }

  return (
    <ResultPass
      title={`직원 1인당 월 ${eTotal.toLocaleString()}원 부담 예상`}
      desc={`실업급여 ${eBase.toLocaleString()}원 + 고용안정·직능 ${eExtra.toLocaleString()}원(${extraLabel})이에요. ${bonusNote}`}
    >
      <ResultGrid items={[
        { icon: "🏢", name: "사업주 총 부담", pass: true, desc: `${eTotal.toLocaleString()}원/월` },
        { icon: "💰", name: "실업급여 분(0.9%)", pass: true, desc: `${eBase.toLocaleString()}원` },
        { icon: "📊", name: `고용안정·직능(${extraLabel})`, pass: true, desc: `${eExtra.toLocaleString()}원` },
        { icon: "👤", name: "근로자 부담(참고)", pass: true, desc: `${wFee.toLocaleString()}원/월` },
      ]} />
      <ResultCTA icon="📋" title="고용보험 가입기간 합산" desc="이전 직장 기간 합산 조건 확인" href="/w/고용보험-가입기간-합산" />
      <ResultCTA icon="🔢" title="4대보험 간편 계산기" desc="국민연금·건강보험까지 한번에" href="https://www.4insure.or.kr" />
      <ResultCTA icon="📊" title="실업급여 수급 조건" desc="직원 퇴사 시 수급 기준" href="/w/실업급여-수급-조건" />
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article91() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "고용보험", "보험료 계산"]}
      tags={["2026년 기준", "고용보험", "보험료"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          급여명세서에서 "고용보험"이라고 빠지는 돈, 정확히 얼마인지 모르고 넘기는 분이 많아요.
          2026년 기준 근로자 부담은 월급의 <B>0.9%</B>예요. 월급 300만원이면 매달 <B>27,000원</B>이
          고용보험료로 빠지는 거예요. 사업주도 0.9%를 따로 부담하고, 규모에 따라 추가 보험료가 붙어요.
        </>
      }
      sourceBar={{
        badge: "법령 기준",
        name: "고용보험법 시행령 · 근로복지공단",
        date: "2026.02 기준",
      }}
      stickyLabel="근로자 부담"
      stickyValue="월급 × 0.9%"
      stickyBtn="계산하기 ↑"
      disclaimer="이 글은 고용보험법 시행령과 근로복지공단 공시를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 보험료는 4대보험 포털에서 확인하세요."
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기", hot: true },
              { icon: "🏛️", title: "2026 정부지원금", sub: "30개+ 지원금", href: "/w/정부지원금" },
              { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
            ]}
          />
          <SidebarDocs
            items={[
              { title: "실업급여 수급 조건 정리", cat: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
              { title: "피보험기간 180일 계산", cat: "실업급여·피보험기간", href: "/w/실업급여-피보험기간-180일-계산" },
              { title: "고용보험 가입기간 합산", cat: "고용보험·합산", href: "/w/고용보험-가입기간-합산" },
            ]}
          />
          <SidebarCalc
            items={[
              { title: "실업급여 계산기", href: "/calculators/실업급여-계산기" },
              { title: "퇴직금 계산기", href: "/calculators/퇴직금-계산기" },
              { title: "연말정산 계산기", href: "/calculators/연말정산-계산기" },
              { title: "양도소득세 계산기", href: "/calculators/양도소득세-계산기" },
              { title: "대출이자 계산기", href: "/calculators/대출이자-계산기" },
            ]}
          />
        </>
      }
    >
      {/* ── TOC ── */}
      <TOC
        items={[
          { t: "내 보험료 간편 계산", sub: null },
          { t: "요율은 몇 퍼센트예요?", sub: "기본 공식 · 보수총액 범위" },
          { t: "사업장 규모별로 부담금이 달라지나요?", sub: "규모별 추가 요율 · 우선지원대상기업 기준" },
          { t: "월급 300만원이면 얼마를 내나요?", sub: "월급 250만원 기준 · 월급 350만원 기준 · 월급 500만원 기준" },
          { t: "근로자와 사업주가 각각 얼마씩 내나요?", sub: "연봉별 부담 비교 · 비과세 항목 제외 기준" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* ── Summary3 ── */}
      <Summary3
        items={[
          "2026년 고용보험료 요율은 근로자 0.9%, 사업주 0.9% 합산 1.8%예요",
          "월급 300만원 기준 근로자 부담은 매달 27,000원이에요",
          "사업주는 규모에 따라 0.25~0.85% 고용안정·직능 보험료를 추가 부담해요",
        ]}
      />

      {/* ══════ STEP 01 — 체커 ══════ */}
      <Sec n="1" id="checker" title="내 보험료 간편 계산" sub="4가지만 선택하면 월 납부 예상액을 바로 알려드려요">
        <P>
          고용보험료는 월급(보수총액)에 요율을 곱해서 계산해요. 근로자는 0.9% 고정이지만, 사업주는
          사업장 규모에 따라 추가 부담이 달라져요. 아래에서 월급 구간과 입장을 선택하면 예상 금액이
          바로 나와요.
        </P>
        <P>
          여기서 나오는 금액은 세전 월급 기준 예상치예요. 상여금·수당 포함 여부에 따라 실제 공제액은
          조금 달라질 수 있어요.
        </P>

        <CheckerShell title="내 고용보험료 얼마나 내고 있나요?" sub="10초 계산">
          <CheckerQ n="1" label="월급(세전)이 얼마인가요?" group="salary"
            opts={[["under200", "200만원 이하"], ["200to300", "200~300만원"], ["300to400", "300~400만원"], ["over400", "400만원 이상"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="2" label="어떤 입장에서 계산하고 싶으세요?" group="role"
            opts={[["worker", "근로자예요"], ["employer", "사업주예요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="3" label="사업장 인원이 몇 명인가요?" group="size"
            opts={[["under150", "150인 미만"], ["150to1000", "150~1,000인 미만"], ["over1000", "1,000인 이상"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="4" label="상여금·수당이 월급에 포함돼 있나요?" group="bonus"
            opts={[["yes", "포함돼 있어요"], ["no", "기본급만이에요"]]}
            sel={ans} pick={pick}
          />
          {result}
        </CheckerShell>
      </Sec>

      <Divider />

      {/* ══════ SECTION 02 — 요율 ══════ */}
      <Sec n="2" id="rate" title="요율은 몇 퍼센트예요?" sub="근로자·사업주 각각 0.9%, 합산 1.8%가 기본이에요">
        <P>
          2026년 기준 고용보험료 요율은 <B>근로자 0.9%, 사업주 0.9%</B>예요.{" "}
          <A href="https://www.law.go.kr/법령/고용보험및산업재해보상보험의보험료징수등에관한법률">고용보험료징수법</A>
          에서 정한 요율이고, 2013년 이후 10년 넘게 같은 비율이 유지되고 있어요.
        </P>
        <P>
          근로자 입장에서는 급여명세서에 "고용보험"이라고 표시된 항목이 바로 이 0.9%예요. 회사가
          원천징수해서 매달 자동으로 납부하기 때문에 따로 신경 쓸 건 없어요. 사업주도 똑같이
          0.9%를 별도로 납부하는데, 이건 근로자 급여에서 빠지는 게 아니라 회사 비용으로 처리돼요.
        </P>

        <H3>기본 공식</H3>
        <FormulaCard
          formula="고용보험료 = 월 보수총액 × 0.9%"
          notes={[
            "근로자 부담: 0.9% (실업급여 재원)",
            "사업주 부담: 0.9% + 고용안정·직능 0.25~0.85%",
            "사업주 합산: 1.15% ~ 1.75% (규모별 차이)",
          ]}
        />
        <P>
          공식 자체는 단순해요. 월급에 0.9%만 곱하면 끝이에요. 다만 여기서 말하는 "월급"은 기본급만이
          아니라 보수총액 개념이에요. 상여금, 각종 수당, 성과급 등 세법상 과세되는 급여가 전부 포함돼요.
        </P>

        <H3>보수총액 범위</H3>
        <P>
          보수총액은 세전 급여에서 비과세 항목을 뺀 금액이에요. 비과세로 인정되는 대표 항목은 식대(월
          20만원까지)와 자가운전보조금(월 20만원까지)이에요. 연장근로수당·야간수당은 과세 항목이라
          보수총액에 포함돼요.
        </P>
        <P>
          그래서 계약 연봉이 같아도 급여 구성에 따라 실제 고용보험료가 다를 수 있어요. 식대를 비과세로
          받는 사람은 과세 대상 보수가 줄어서 보험료도 조금 적어지는 구조예요.
        </P>

        <Info type="tip">{"<strong>참고:</strong> 일용직 근로자도 고용보험 가입 대상이에요. 일당에 0.9%가 적용되고, 사업주가 원천징수해서 납부해요."}</Info>
      </Sec>

      <Divider />

      {/* ══════ SECTION 03 — 사업장 규모별 ══════ */}
      <Sec n="3" id="size" title="사업장 규모별로 부담금이 달라지나요?" sub="근로자는 동일하지만, 사업주 추가 보험료가 규모별로 다르게 적용돼요">
        <P>
          근로자 부담은 사업장 규모와 관계없이 <B>0.9%로 동일</B>해요. 5인 사업장이든 1만 명 대기업이든
          똑같아요. 차이가 나는 건 사업주 부담이에요. 사업주는 실업급여 0.9% 외에 고용안정·직업능력개발
          보험료를 추가로 납부해야 해요.
        </P>

        <H3>규모별 추가 요율</H3>
        <TableTitle>사업장 규모별 사업주 보험료율 (2026년 기준)</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr><THL>사업장 규모</THL><TH>추가 요율</TH><TH>사업주 합산</TH></tr>
            </thead>
            <tbody>
              {[
                ["150인 미만", "0.25%", "1.15%"],
                ["150인 이상 (우선지원대상)", "0.45%", "1.35%"],
                ["150~1,000인 미만", "0.65%", "1.55%"],
                ["1,000인 이상 / 국가·지자체", "0.85%", "1.75%"],
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, borderBottom: "1px solid #E5E7EB" }}>{r[0]}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid #E5E7EB" }}>{r[1]}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700, borderBottom: "1px solid #E5E7EB" }}>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNote>고용안정·직업능력개발 보험료는 사업주만 부담해요. 근로자 급여에서 추가 공제되지 않아요.</TableNote>
        <P>
          150인 미만 소규모 사업장은 0.25%만 추가 부담하면 되지만, 1,000인 이상 대기업은 0.85%가
          추가돼요. 규모가 클수록 고용안정 의무가 크다는 취지예요. 이 차이가 직원 1인당 수만 원
          차이로 이어져요.
        </P>

        <H3>우선지원대상기업 기준</H3>
        <P>
          우선지원대상기업은 업종별로 상시 근로자 수 기준이 달라요. 제조업은 500인 이하, 건설업은
          300인 이하, 기타 업종은 100인 이하가 해당돼요. 150인 이상이라도 우선지원대상에 해당하면
          추가 요율이 0.65%가 아닌 0.45%로 낮아지는 혜택이 있어요.
        </P>
        <P>
          우선지원대상기업 여부는 <A href="https://www.kcomwel.or.kr">근로복지공단</A>에서
          확인할 수 있어요. 사업장 성립신고 시 자동으로 판정되고, 기준 인원이 바뀌면 재판정을 받아요.
        </P>

        <InlineLink icon="📋" title="고용보험 가입기간 합산 조건" desc="이전 직장 기간을 합산해서 실업급여 자격 확인" href="/w/고용보험-가입기간-합산" />
      </Sec>

      {/* ── RelatedMid (SECTION 03-04 사이) ── */}
      <RelatedMid
        title="고용보험 관련 글도 함께 보세요"
        items={[
          { icon: "📊", title: "실업급여 수급 조건 정리", desc: "피보험기간·퇴직사유 기준 한눈에", href: "/w/실업급여-수급-조건" },
          { icon: "🔢", title: "실업급여 연봉별 계산", desc: "내 연봉 기준 예상 수령액 확인", href: "/w/실업급여-연봉별-계산" },
          { icon: "📋", title: "피보험기간 180일 계산", desc: "이전 직장 합산 방법 확인", href: "/w/실업급여-피보험기간-180일-계산" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* ══════ SECTION 04 — 월급별 시뮬레이션 ══════ */}
      <Sec n="4" id="simulation" title="월급 300만원이면 얼마를 내나요?" sub="월급 구간별로 근로자·사업주 부담을 계산해 봤어요">
        <P>
          고용보험료 계산이 단순하다고는 해도, 실제 숫자를 보면 체감이 다르죠. 월급 구간별로 근로자와
          사업주가 각각 얼마를 부담하는지, 3가지 케이스로 정리해 봤어요. 사업장 규모에 따라 사업주
          부담이 달라지는 것도 함께 확인할 수 있어요.
        </P>

        <H3>월급 250만원 기준</H3>
        <P>
          사회 초년생이나 중소기업 근로자라면 이 구간에 많이 해당돼요. 세전 월급 250만원에서 고용보험료는
          매달 22,500원이 빠져요. 연간으로는 27만원 정도예요. 금액 자체는 크지 않지만, 나중에 실업급여로
          돌아오는 보험 성격의 납부금이에요.
        </P>
        <CaseBox
          badge="예시 1"
          label="월급 250만원, 150인 미만 사업장"
          conditions={["세전 월급: 250만원", "사업장: 150인 미만"]}
          steps={[
            { label: "근로자 부담 (0.9%)", value: "250만 × 0.9% = 22,500원" },
            { label: "사업주 실업급여 (0.9%)", value: "250만 × 0.9% = 22,500원" },
            { label: "사업주 고용안정 (0.25%)", value: "250만 × 0.25% = 6,250원" },
          ]}
          total="사업주 총 부담: 28,750원/월"
          result="근로자 월 22,500원 공제"
          pass={true}
        />

        <H3>월급 350만원 기준</H3>
        <P>
          대리~과장급이거나 중견기업 근로자라면 월급 350만원 구간에 많이 해당돼요. 이 경우 근로자
          부담은 31,500원이고, 150~1,000인 규모 사업장이면 사업주는 54,250원을 부담해요.
          사업장이 커질수록 사업주 부담이 늘어나는 구조가 뚜렷하게 보이는 구간이에요.
        </P>
        <CaseBox
          badge="예시 2"
          label="월급 350만원, 150~1,000인 미만 사업장"
          conditions={["세전 월급: 350만원", "사업장: 150~1,000인 미만"]}
          steps={[
            { label: "근로자 부담 (0.9%)", value: "350만 × 0.9% = 31,500원" },
            { label: "사업주 실업급여 (0.9%)", value: "350만 × 0.9% = 31,500원" },
            { label: "사업주 고용안정 (0.65%)", value: "350만 × 0.65% = 22,750원" },
          ]}
          total="사업주 총 부담: 54,250원/월"
          result="근로자 월 31,500원 공제"
          pass={true}
        />

        <H3>월급 500만원 기준</H3>
        <P>
          연봉 6,000만원 이상 고소득 직장인 기준이에요. 근로자 부담은 45,000원이지만, 1,000인 이상
          대기업이라면 사업주 부담은 87,500원까지 올라가요. 근로자 부담의 거의 2배에 가까워요.
          대기업이 직원 1인당 부담하는 고용보험료가 상당히 크다는 걸 알 수 있어요.
        </P>
        <CaseBox
          badge="예시 3"
          label="월급 500만원, 1,000인 이상 사업장"
          conditions={["세전 월급: 500만원", "사업장: 1,000인 이상"]}
          steps={[
            { label: "근로자 부담 (0.9%)", value: "500만 × 0.9% = 45,000원" },
            { label: "사업주 실업급여 (0.9%)", value: "500만 × 0.9% = 45,000원" },
            { label: "사업주 고용안정 (0.85%)", value: "500만 × 0.85% = 42,500원" },
          ]}
          total="사업주 총 부담: 87,500원/월"
          result="근로자 월 45,000원 공제"
          pass={true}
        />

        <BridgeCard
          q="내 정확한 고용보험료를 직접 계산해 보고 싶다면?"
          a="4대보험 포털에서 월급을 입력하면 고용보험료뿐 아니라 국민연금·건강보험까지 한번에 나와요."
          label="4대보험 계산기 바로가기"
          href="https://www.4insure.or.kr"
        />
      </Sec>

      <Divider />

      {/* ══════ SECTION 05 — 근로자 vs 사업주 ══════ */}
      <Sec n="5" id="split" title="근로자와 사업주가 각각 얼마씩 내나요?" sub="월급 구간별 비교표와 비과세 항목 적용 기준을 정리했어요">
        <P>
          고용보험료 1.8%라고 하면 근로자·사업주가 반반이라고 생각하기 쉽지만, 실제로는 사업주가 더
          많이 내는 구조예요. 근로자는 어떤 사업장이든 0.9% 고정인 반면, 사업주는 최소 1.15%에서
          최대 1.75%까지 부담해요. 아래 비교표에서 월급 구간별 차이를 한눈에 확인할 수 있어요.
        </P>

        <H3>연봉별 부담 비교</H3>
        <TableTitle>월급 구간별 고용보험료 비교 (2026년)</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr><THL>월급(세전)</THL><TH>근로자</TH><TH>사업주(150인 미만)</TH><TH>사업주(1,000인 이상)</TH></tr>
            </thead>
            <tbody>
              {[
                ["200만원", "18,000원", "23,000원", "35,000원"],
                ["300만원", "27,000원", "34,500원", "52,500원"],
                ["400만원", "36,000원", "46,000원", "70,000원"],
                ["500만원", "45,000원", "57,500원", "87,500원"],
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, borderBottom: "1px solid #E5E7EB" }}>{r[0]}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid #E5E7EB" }}>{r[1]}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid #E5E7EB" }}>{r[2]}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid #E5E7EB" }}>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNote>사업주 부담 = 실업급여(0.9%) + 고용안정·직능(0.25%~0.85%)의 합계예요.</TableNote>
        <P>
          근로자 부담은 단순하지만, 사업주 입장에서는 직원 수가 많아질수록 부담이 눈에 띄게 커져요.
          직원 100명인 150인 미만 사업장에서 평균 월급 300만원이면, 사업주가 매달 내는 고용보험료만
          345만원이에요. 여기에 국민연금·건강보험까지 더하면 4대보험 부담이 상당해지는 거예요.
        </P>

        <H3>비과세 항목 제외 기준</H3>
        <P>
          고용보험료를 줄이려면 비과세 항목을 최대한 활용하는 게 유리해요. 대표적인 비과세 항목은
          식대(월 20만원까지)와 자가운전보조금(월 20만원까지)이에요. 이 두 항목을 최대로 적용하면
          과세 보수가 월 40만원까지 줄어들어, 보험료도 월 3,600원 정도 적게 나와요.
        </P>
        <P>
          반대로 상여금·성과급·연장근로수당은 전부 과세 항목이에요. 연말에 성과급을 많이 받으면 해당
          월 보수총액이 올라가서 고용보험료도 같이 올라가요. 정산은 다음 해 3월에 보수총액 신고를
          통해 이뤄져요.
        </P>

        <Info type="warn">{"<strong>주의:</strong> 보수총액 신고는 매년 3월에 하는데, 전년도 실제 지급 보수와 이미 납부한 보험료의 차액을 정산해요. 상여금이 많았던 해에는 추가 납부가 나올 수 있어요."}</Info>

        <BridgeCard
          q="고용보험료를 냈는데, 실업급여는 언제 받을 수 있을까?"
          a="퇴직 전 18개월 이내 피보험기간 180일 이상이면 수급자격이 생겨요."
          label="실업급여 수급 조건 보기"
          href="/w/실업급여-수급-조건"
        />

        <ExtBtn
          badge="4대보험 공식"
          text="4대보험료 간편 계산기"
          cta="계산하기 →"
          href="https://www.4insure.or.kr"
        />
      </Sec>

      <Divider />

      {/* ══════ FAQ ══════ */}
      <Sec n="6" id="faq" title="자주 묻는 질문" sub="">
        <FAQAccordion items={meta.faq} />
      </Sec>

      {/* ── 하단 네비 ── */}
      <RelatedArticles
        items={[
          { title: "실업급여 수급 조건 정리", desc: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
          { title: "피보험기간 180일 계산 합산 방법", desc: "실업급여·피보험기간", href: "/w/실업급여-피보험기간-180일-계산" },
          { title: "실업급여 연봉별 계산", desc: "실업급여·계산", href: "/w/실업급여-연봉별-계산" },
          { title: "실업급여 관할 고용센터 찾기", desc: "실업급여·신청", href: "/w/실업급여-고용센터-찾기-고용24-사용법" },
          { title: "고용보험 가입기간 합산 조건", desc: "고용보험·합산", href: "/w/고용보험-가입기간-합산" },
        ]}
      />
      <PrevNext
        prev={{ title: "실업급여 지급일 입금 요일", href: "/w/실업급여-지급일-첫-입금일-대기기간" }}
        next={{ title: "비상근 고문 고용보험 가입 조건", href: "/w/비상근-고문-고용보험" }}
      />
    </BlogLayout>
  );
}
