"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "2026년 실업급여 상한액 하한액 기준 | 일 68100원 월 수령액 계산",
  description: "2026년 실업급여 상한액이 일 68,100원으로 오른 거 알고 계셨나요? 하한액 계산 방법부터 월 수령액까지 정리했어요.",
  category: "실업급여",
  keywords: [
    "2026년 실업급여 상한액 일 68100원 기준",
    "실업급여 하한액 최저임금 80% 계산법",
    "2026년 실업급여 월 수령액 204만원 기준",
    "실업급여 상한 적용 평균임금 113500원 기준",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-22",
  datePublished: "2026-02-22",
  summary: [
    "2026년 실업급여 상한액은 일 68,100원이에요. 2025년 66,000원에서 인상됐어요.",
    "하한액은 최저임금(10,030원) × 80% × 8시간 = 일 64,192원이에요.",
    "상한 기준 월 수령액은 68,100원 × 30일 = 약 204만 3,000원이에요.",
  ],
  sources: [
    { name: "고용보험법 구직급여 지급액 규정", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
    { name: "고용노동부 실업급여 안내", url: "https://www.moel.go.kr/policy/policyinfo/benefit/list.do", date: "2026-02" },
  ],
  faq: [
    { q: "2026년 실업급여 상한액이 66,000원에서 68,100원으로 오른 이유가 뭔가요?", a: "실업급여 상한액은 고용노동부 장관이 매년 고시해요. 임금 상승률과 물가 수준을 반영해서 조정돼요. 2025년 66,000원에서 2026년 68,100원으로 인상됐어요. 상한액이 높아지면 고임금 근로자도 더 많이 받을 수 있어요." },
    { q: "2026년 실업급여 상한액과 하한액 차이가 얼마나 돼요?", a: "2026년 기준 상한액은 일 68,100원, 하한액은 최저임금 기반으로 약 64,192원이에요. 두 금액 차이는 약 3,908원이에요. 평균임금 60%가 상한보다 높으면 상한을, 하한보다 낮으면 하한을 적용해요." },
  ],
  ctaCard: {
    label: "30초 계산",
    mainText: "실업급여 수령액 자동 계산",
    subText: "평균임금·근속기간 입력하면 바로",
    url: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do",
    external: true,
  },
  relatedDocs: [
    { title: "실업급여 수급자격 신청 절차", url: "/w/실업급여-수급자격-인정" },
    { title: "실업급여 상한액 비교", url: "/w/실업급여-상한액" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { income, period } = sel;
    if (!income || !period) return null;
    if (income === "high" && period === "long") return "high_long";
    if (income === "high" && period === "short") return "high_short";
    if (income === "mid" && period === "long") return "mid_long";
    if (income === "mid" && period === "short") return "mid_short";
    if (income === "low" && period === "long") return "low_long";
    if (income === "low" && period === "short") return "low_short";
    return null;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 예상 수령액 미리 확인" },
    { t: "상한액은 얼마예요?", sub: "일 68,100원 · 인상 배경 · 상한 적용 기준" },
    { t: "하한액은 어떻게 계산하나요?", sub: "최저임금 80% × 8시간 · 단시간 근로자" },
    { t: "일 68,100원은 언제 적용되나요?", sub: "평균임금 113,500원 이상 · 적용 예시 표" },
    { t: "월 수령액은 어떻게 계산하나요?", sub: "일 수령액 × 30일 · 소정급여일수 계산" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "수령액 계산"]}
      tags={["2026년 최신", "실업급여", "상한액", "수령액 계산"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>2026년 실업급여 상한액은 <strong>일 68,100원</strong>이에요. 하한액은 최저임금 80% × 8시간으로 <strong>64,192원</strong>이에요.</>}
      sourceBar={{ badge: "고용노동부", name: "실업급여 안내", date: "2026.02" }}
      stickyLabel="2026년 상한"
      stickyValue="일 68,100원"
      stickyBtn="계산하기"
      disclaimer="이 글은 고용보험법과 고용노동부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🧮", title: "실업급여 수령액 계산", sub: "고용24 모의 계산기", href: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do", hot: true },
          { icon: "📋", title: "실업급여 수급자격 조건", sub: "비자발적 퇴직 요건 확인", href: "/w/실업급여-수급자격-인정" },
          { icon: "🏛️", title: "실업급여 신청 방법", sub: "구비서류 온라인 신청", href: "/w/실업급여-신청방법" },
        ]} />
        <SidebarDocs items={[
          { title: "실업급여 수급자격 인정", cat: "실업급여·고용보험", href: "/w/실업급여-수급자격-인정" },
          { title: "실업급여 상한액 비교", cat: "실업급여·고용보험", href: "/w/실업급여-상한액" },
          { title: "실업급여 구직활동 방법", cat: "실업급여·고용보험", href: "/w/실업급여-재취업-조건" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          { title: "연말정산 계산기", href: "/w/연말정산-세액공제" },
          { title: "근로장려금 계산기", href: "/w/근로장려금-계산기" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="예상 수령액 미리 확인" sub="이전 직장 평균임금 · 피보험기간 기준" />
      <P>이전 직장 일 평균임금과 고용보험 피보험기간을 선택하면 2026년 실업급여 예상 수령액을 알려드려요.</P>

      <CheckerShell title="내 2026년 실업급여 얼마 받을 수 있나요?" sub="30초 계산">
        <CheckerQ n="1" label="이전 직장 일 평균임금이 얼마였나요?" group="income" opts={[
          ["high", "일 113,500원 이상이에요 (상한 적용)"],
          ["mid", "일 80,000~113,500원 사이예요"],
          ["low", "일 80,000원 미만이에요 (하한 근접)"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="고용보험 피보험기간이 얼마나 됐나요?" group="period" opts={[
          ["long", "5년 이상이에요"],
          ["short", "5년 미만이에요"],
        ]} sel={sel} pick={pick} />

        {result === "high_long" && (
          <ResultPass title="일 68,100원 × 210~270일">
            <P>평균임금 60%가 상한액을 넘어 일 68,100원이 적용돼요. 피보험기간 5~10년이면 소정급여일수 210일, 10년 이상이면 240일이에요. 50세 이상이면 각 구간에서 30일 추가돼요. 총 수령액은 약 1,430~1,840만원이에요.</P>
            <ResultCTA icon="🧮" title="고용24 수령액 계산기" desc="정확한 금액 모의 계산" href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" />
          </ResultPass>
        )}
        {result === "high_short" && (
          <ResultPass title="일 68,100원 × 120~180일">
            <P>평균임금 60%가 상한액을 넘어 68,100원이 적용돼요. 피보험기간 1년 미만이면 120일, 1~3년이면 150일, 3~5년이면 180일이에요. 총 수령액은 약 816~1,225만원이에요.</P>
            <ResultCTA icon="🧮" title="고용24 수령액 계산기" desc="소정급여일수 확인" href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" />
          </ResultPass>
        )}
        {result === "mid_long" && (
          <ResultPass title="평균임금 60% × 210~270일">
            <P>상한에 걸리지 않아 실제 평균임금의 60%가 지급돼요. 피보험기간 5년 이상이면 소정급여일수 210~270일이에요. 하한액(약 64,192원)보다 낮게 계산되면 자동으로 하한이 적용돼요.</P>
            <ResultCTA icon="🧮" title="고용24 수령액 계산기" desc="평균임금 기준 계산" href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" />
          </ResultPass>
        )}
        {result === "mid_short" && (
          <ResultPass title="평균임금 60% × 120~180일">
            <P>상한 미적용 시 평균임금의 60%가 지급돼요. 피보험기간 5년 미만이면 소정급여일수 120~180일이에요. 정확한 수령액은 개인 평균임금과 피보험기간에 따라 달라져요.</P>
            <ResultCTA icon="🧮" title="고용24 수령액 계산기" desc="실제 수령액 계산" href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" />
          </ResultPass>
        )}
        {result === "low_long" && (
          <ResultPass title="하한액 64,192원 근접 × 210~270일">
            <P>평균임금이 낮으면 하한액(일 64,192원)이 적용될 수 있어요. 피보험기간 5년 이상이면 소정급여일수 210~270일이에요. 하한액 이하로는 내려가지 않아요. 총 수령액은 약 1,348~1,731만원이에요.</P>
            <ResultCTA icon="🧮" title="고용24 수령액 계산기" desc="하한액 적용 계산" href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" />
          </ResultPass>
        )}
        {result === "low_short" && (
          <ResultPass title="하한액 64,192원 근접 × 120~180일">
            <P>평균임금이 낮으면 하한액(일 64,192원)이 적용될 수 있어요. 피보험기간 5년 미만이면 소정급여일수 120~180일이에요. 하한 이하로는 내려가지 않아요.</P>
            <ResultCTA icon="🧮" title="고용24 수령액 계산기" desc="소정급여일수 확인" href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" />
          </ResultPass>
        )}
        {!result && (
          <ResultFail title="평균임금과 피보험기간을 선택해 주세요">
            <P>이전 직장 일 평균임금과 고용보험 피보험기간을 선택하면 2026년 실업급여 예상 수령액을 안내해 드려요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="실업급여 수급 자격이 되는지 먼저 확인하세요"
        a="180일 이상 피보험기간, 비자발적 퇴직 등 기본 조건이 있어요. 조건이 안 되면 신청해도 반려돼요."
        label="실업급여 수급자격 조건"
        href="/w/실업급여-수급자격-인정"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="상한액은 얼마예요?" sub="일 68,100원 · 인상 배경 · 상한 적용 기준" />
      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법</A>에 따라 실업급여(구직급여)는 이직 전 평균임금의 60%로 계산하되, 고용노동부 장관이 고시하는 상한액을 초과할 수 없어요. 2026년 상한액은 일 68,100원이에요.</P>
      <P>상한액 적용 방식이에요. 이직 전 평균임금의 60%를 계산했을 때 68,100원을 넘으면 초과분 없이 68,100원만 지급돼요. 예를 들어 일 평균임금이 140,000원이면 60%는 84,000원인데, 상한 68,100원이 적용돼요.</P>
      <P>상한액에 걸리려면 일 평균임금이 약 113,500원 이상이어야 해요. 월 환산으로 약 250~260만원 이상의 임금을 받던 근로자가 상한에 걸리는 경우가 많아요. 그 이하라면 상한 걱정 없이 평균임금의 60%를 그대로 받아요.</P>
      <P>2026년 상한액 인상으로 혜택 받는 사람은 주로 고임금 근로자예요. 2025년 66,000원에서 68,100원으로 올라서 하루 2,100원씩 더 받을 수 있게 됐어요. 월 기준으로는 약 63,000원 차이가 나요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="하한액은 어떻게 계산하나요?" sub="최저임금 80% × 8시간 · 단시간 근로자" />
      <P>최저임금의 80% × 8시간으로 계산해요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법</A>에서 실업급여 하한액을 최저임금의 80%로 규정하고 있어요.</P>
      <P>2026년 최저임금 기준으로 계산하면 이래요. 최저임금(10,030원) × 80% × 8시간 = 64,192원이에요. 실업급여 계산식(평균임금 60%)을 적용했을 때 하한액보다 낮게 나오면 자동으로 하한액이 적용돼요.</P>
      <P>하한액은 평균임금이 낮은 근로자를 보호하기 위한 안전망이에요. 아르바이트나 단시간 근로자도 최소 하한액은 받을 수 있어요. 특히 저임금 근로자에게는 상한액보다 하한액이 더 중요한 기준이 돼요.</P>
      <P>단시간 근로자(주 40시간 미만)는 소정근로시간에 비례해서 하한액이 줄어요. 주 20시간 근로자라면 하한액도 비례해서 조정돼요. 풀타임 근로자 기준 하한액은 64,192원이에요.</P>

      <RelatedMid
        title="실업급여 관련 계산 더 알아보기"
        items={[
          { icon: "📊", title: "실업급여 수급 기간 계산", desc: "피보험기간별 소정급여일수", href: "/w/실업급여-수급자격-인정" },
          { icon: "💰", title: "실업급여 상한액 비교", desc: "연도별 상한액 변화", href: "/w/실업급여-상한액" },
          { icon: "📋", title: "실업급여 신청 방법", desc: "구비서류와 온라인 신청 절차", href: "/w/실업급여-신청방법" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="일 68,100원은 언제 적용되나요?" sub="평균임금 113,500원 이상 · 적용 예시 표" />
      <P>이직 전 일 평균임금이 113,500원 이상일 때 상한이 적용돼요. 실업급여 계산 결과가 상한액을 넘으면 68,100원으로 고정돼요.</P>

      <TableTitle>평균임금별 실업급여 계산 예시</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>일 평균임금</THL><TH>60% 계산</TH><TH>상한 적용</TH><TH>실제 수령액</TH></tr>
          </thead>
          <tbody>
            {[
              ["80,000원", "48,000원", "미적용", "48,000원"],
              ["100,000원", "60,000원", "미적용", "60,000원"],
              ["113,500원", "68,100원", "경계", "68,100원"],
              ["140,000원", "84,000원", "상한 적용", "68,100원"],
              ["200,000원", "120,000원", "상한 적용", "68,100원"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>일 평균임금이 113,500원 미만이면 상한이 적용되지 않고 60%가 그대로 지급돼요. 하한(64,192원) 이하로도 내려가지 않아요.</TableNote>

      <P>상한액은 개인 임금에 관계없이 일률적으로 적용돼요. 임금이 아무리 높아도 일 68,100원 초과분은 받을 수 없어요. 반대로 하한(64,192원) 이하로도 내려가지 않아요. 상한과 하한 사이에서 개인 상황에 따라 결정돼요.</P>
      <P>단시간 근로자나 주 40시간 미만 근로자의 경우 평균임금 계산이 달라질 수 있어요. 소정근로시간에 비례해서 계산되기 때문에 고용24에서 직접 모의 계산해보는 게 정확해요.</P>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="월 수령액은 어떻게 계산하나요?" sub="일 수령액 × 30일 · 소정급여일수 계산" />
      <P>일 수령액 × 30일로 계산해요. 실업급여는 달력상 날짜 기준으로 지급해요. 상한액 기준 월 수령액은 68,100원 × 30일 = 2,043,000원이에요.</P>
      <P>소정급여일수(총 수령 가능 기간)에 따라 총 수령 기간이 달라요. 피보험기간 1년 미만이면 120일(4개월), 1~3년이면 150일(5개월), 3~5년이면 180일(6개월), 5~10년이면 210일(7개월), 10년 이상이면 240일(8개월)이에요. 50세 이상이나 장애인이라면 구간별로 30일이 추가돼요.</P>
      <P>계산 예시를 들면 이래요. 일 평균임금 130,000원, 피보험기간 3년인 경우예요. 상한 적용으로 일 68,100원 × 150일 = 총 10,215,000원이에요. 약 5개월 동안 매달 204만원씩 받는 거예요.</P>
      <P>하한액 기준 계산이에요. 일 64,192원 × 150일 = 9,628,800원이에요. 상한과 하한 사이라면 실제 평균임금 × 60% × 소정급여일수로 계산해요. 정확한 금액은 고용24 모의 계산기에서 확인하는 게 가장 정확해요.</P>

      <Info type="tip">고용24(www.ei.go.kr) 접속 후 '실업급여 모의 계산'에서 이전 직장 월급과 피보험기간을 입력하면 정확한 예상 수령액이 나와요.</Info>

      <BridgeCard
        q="실업급여 금액을 알았으면 이제 수급 자격이 궁금하시죠?"
        a="비자발적 퇴직 조건부터 수급자격 신청 절차까지 단계별로 정리했어요."
        label="실업급여 수급자격 조건"
        href="/w/실업급여-수급자격-인정"
      />

      <ExtBtn
        badge="고용24 공식"
        text="실업급여 모의 계산기"
        cta="계산하기 →"
        href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do"
      />

      <Divider />

      <FAQAccordion items={meta.faq.map(f => ({ q: f.q, a: f.a }))} />

      <RelatedArticles items={[
        { title: "실업급여 수급자격 인정 신청", desc: "비자발적 퇴직 조건과 신청 절차", href: "/w/실업급여-수급자격-인정" },
        { title: "실업급여 상한액 비교", desc: "연도별 상한액 변화 추이", href: "/w/실업급여-상한액" },
        { title: "실업급여 신청 방법 구비서류", desc: "구비서류와 온라인 신청 절차", href: "/w/실업급여-신청방법" },
        { title: "실업급여 수급 기간 대기기간", desc: "7일 대기기간과 수급기간 계산", href: "/w/실업급여-대기기간" },
        { title: "실업급여 재취업 조건 구직활동", desc: "재취업활동 인정 기준", href: "/w/실업급여-재취업-조건" },
      ]} />
      <PrevNext
        prev={{ title: "재판상 도산 파산 회생절차 비교", href: "/w/재판상-도산-파산-회생절차-대지급금" }}
        next={{ title: "실업급여 수급자격 인정", href: "/w/실업급여-수급자격-인정" }}
      />
    </BlogLayout>
  );
}
