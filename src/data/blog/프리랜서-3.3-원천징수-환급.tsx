"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  Info, InlineLink, BridgeCard, ExtBtn,
  TH, THL, TableTitle, TableNote,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제",
  description: "프리랜서라면 3.3% 원천징수한 세금을 돌려받을 수 있다는 거 알고 계세요? 종합소득세 신고 방법과 필요경비 공제로 환급받는 절차를 알려드려요.",
  category: "세금",
  keywords: [
    "프리랜서 원천징수 환급 개념",
    "프리랜서 종합소득세 신고 기간",
    "종합소득세 필요경비 단순경비율",
    "3.3% 환급 금액 계산 예시",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "매년 5월 종합소득세 신고로 <strong>3.3% 초과 납부분 환급</strong> 가능",
    "단순경비율 적용 시 영수증 증빙 없이도 <strong>필요경비 60~90% 공제</strong>",
    "연 수입 2,400만원 프리랜서 기준 평균 <strong>약 30~50만원 환급</strong> 사례",
  ],
  sources: [
    { name: "국세청 종합소득세 확정신고 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2316&cntntsId=7688", date: "2026-02" },
    { name: "소득세법 제70조 확정신고", url: "https://www.law.go.kr/법령/소득세법", date: "2026-02" },
    { name: "국세청 단순경비율 업종별 기준", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2250&cntntsId=7627", date: "2026-02" },
  ],
  faq: [
    { q: "프리랜서 3.3% 원천징수 환급은 언제 받나요?", a: "매년 5월 종합소득세 신고 후 통상 2~3개월 내에 환급돼요. 이상이 없으면 7~8월경 등록한 계좌로 입금돼요." },
    { q: "프리랜서 경비 영수증이 없어도 환급받을 수 있나요?", a: "네, 영수증 없이도 단순경비율로 필요경비를 인정받을 수 있어요. 업종별 단순경비율(60~90%)을 자동 적용하면 별도 증빙 없이 공제돼요." },
  ],
  ctaCard: {
    label: "홈택스 신고",
    mainText: "3.3% 환급 → 5월 종합소득세 신고",
    subText: "신고 안 하면 환급도 없어요",
    url: "https://www.hometax.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "종합소득세 신고 안 하면 가산세", url: "/w/종합소득세-신고-안하면-가산세" },
    { title: "간이과세자 기준 매출 2026", url: "/w/부가가치세-간이과세자-기준-2026" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { income_type, income_range, proof, experience } = sel;
    if (!income_type || !income_range || !proof || !experience) return null;
    if (income_range === "lt1200") return "low_income";
    if (proof === "yes") return "actual_expense";
    if (experience === "no") return "first_time";
    return "simple_rate";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 환급 대상 확인" },
    { t: "프리랜서 3.3% 원천징수 환급이란 무엇인가요?", sub: "원천징수 개념 · 환급 이유" },
    { t: "프리랜서 종합소득세 신고 방법은 어떻게 되나요?", sub: "신고 기간 · 홈택스 절차" },
    { t: "프리랜서 종합소득세 필요경비 공제는 어떻게 되나요?", sub: "단순경비율 · 업종별 비율" },
    { t: "프리랜서 3.3% 환급 금액은 얼마나 되나요?", sub: "계산 예시 · 환급 시기" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "세금", "종합소득세"]}
      tags={["2026년 최신", "세금", "프리랜서", "원천징수"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>프리랜서가 <strong>3.3% 원천징수</strong>로 납부한 세금을 돌려받으려면 매년 5월 종합소득세를 신고해야 해요. 단순경비율로 필요경비를 공제하면 실제 세금이 훨씬 줄어요.</>}
      sourceBar={{ badge: "국세청", name: "종합소득세 확정신고 안내", date: "2026.02" }}
      stickyLabel="3.3% 환급"
      stickyValue="5월 종합소득세 신고"
      stickyBtn="환급 확인 ↑"
      disclaimer="이 글은 국세청 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 개인 세무 상황에 따라 다를 수 있어요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💰", title: "홈택스 종합소득세 신고", sub: "5월 1일~31일 신고 기간", href: "https://www.hometax.go.kr", hot: true },
          { icon: "📋", title: "종합소득세 가산세", sub: "신고 안 하면 20% 가산세", href: "/w/종합소득세-신고-안하면-가산세" },
          { icon: "📊", title: "간이과세자 기준 2026", sub: "부가세 신고 대상 확인", href: "/w/부가가치세-간이과세자-기준-2026" },
        ]} />
        <SidebarDocs items={[
          { title: "종합소득세 가산세", cat: "세금·절세", href: "/w/종합소득세-신고-안하면-가산세" },
          { title: "간이과세자 기준 2026", cat: "세금·절세", href: "/w/부가가치세-간이과세자-기준-2026" },
          { title: "재산세 납부 기간 2026", cat: "세금·절세", href: "/w/재산세-납부-기간-2026" },
        ]} />
        <SidebarCalc items={[
          { title: "종합소득세 계산기", href: "https://www.hometax.go.kr" },
          { title: "단순경비율 업종 조회", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2250&cntntsId=7627" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="환급 대상 확인" sub="소득 유형 · 수입 규모 선택" />
      <P>3.3% 원천징수 환급은 모든 프리랜서가 받을 수 있는 건 아니에요. 소득 규모와 유형에 따라 환급 여부와 방법이 달라져요. 아래에서 내 상황을 선택해보세요.</P>

      <CheckerShell title="3.3% 환급 대상 확인기" sub="30초 확인">
        <CheckerQ n="1" label="프리랜서 소득 유형이 어떻게 되나요?" group="income_type" opts={[
          ["business", "사업소득 (3.3% 원천징수)"],
          ["other", "기타소득 (강연·원고료 등)"],
          ["mix", "사업소득+기타소득 혼합"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="지난해 프리랜서 연간 수입이 얼마인가요?" group="income_range" opts={[
          ["lt1200", "1,200만원 미만"],
          ["1200to4800", "1,200~4,800만원"],
          ["gt4800", "4,800만원 이상"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="업무 관련 경비 영수증이나 증빙이 있나요?" group="proof" opts={[
          ["yes", "있음 (영수증, 세금계산서 등)"],
          ["no", "없음"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="종합소득세 신고를 이전에 해본 적 있나요?" group="experience" opts={[
          ["yes", "있음 (이전에 신고한 적 있음)"],
          ["no", "없음 (처음 신고)"],
        ]} sel={sel} pick={pick} />

        {result === "low_income" && (
          <ResultPass title="신고는 해야 하지만 환급은 소액일 수 있어요">
            <P>연 수입 1,200만원 미만은 기본공제(150만원)와 단순경비율 적용 후 과세소득이 거의 0에 가까울 수 있어요. 하지만 원천징수한 세금이 있다면 신고해서 돌려받을 수 있어요.</P>
            <ResultCTA icon="💡" title="홈택스 모두채움 신고" desc="소액 환급도 신고하면 받을 수 있어요" href="https://www.hometax.go.kr" />
          </ResultPass>
        )}
        {result === "actual_expense" && (
          <ResultPass title="실제 경비 공제로 더 많이 환급받을 수 있어요">
            <P>경비 증빙이 있으면 단순경비율보다 실제 경비가 더 많은 경우 환급액이 늘어날 수 있어요. 단순경비율과 실제 경비를 비교해서 유리한 방법을 선택하면 돼요.</P>
            <ResultCTA icon="📋" title="실제 경비 공제 신고" desc="더 유리한 방법으로 신고하세요" href="https://www.hometax.go.kr" />
          </ResultPass>
        )}
        {result === "first_time" && (
          <ResultPass title="모두채움 서비스로 쉽게 신고할 수 있어요">
            <P>처음 신고하는 분들은 홈택스 모두채움 신고 서비스를 이용하면 돼요. 국세청이 미리 채워놓은 데이터를 확인하고 몇 번만 클릭하면 신고가 완료돼요.</P>
            <ResultCTA icon="🖥️" title="홈택스 모두채움 신고" desc="처음이라면 이 방법이 가장 쉬워요" href="https://www.hometax.go.kr" />
          </ResultPass>
        )}
        {result === "simple_rate" && (
          <ResultPass title="단순경비율로 신고하면 환급받을 수 있어요">
            <P>경비 증빙 없이도 업종별 단순경비율을 적용해서 필요경비를 인정받을 수 있어요. 3.3% 원천징수액 대비 실제 세금이 더 적으면 차액을 환급받아요.</P>
            <ResultCTA icon="💰" title="단순경비율 종합소득세 신고" desc="5월에 신고해야 환급받을 수 있어요" href="https://www.hometax.go.kr" />
          </ResultPass>
        )}
      </CheckerShell>

      <BridgeCard
        q="3.3%를 냈는데 실제 세금이 그보다 적다면?"
        a="차액을 돌려받을 수 있어요. 종합소득세 신고로 필요경비를 공제하면 과세소득이 줄어서 실제 세금이 3.3%보다 낮아지는 경우가 많아요."
        label="환급 구조 보기"
        href="#s02"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s02" title="프리랜서 3.3% 원천징수 환급이란 무엇인가요?" sub="원천징수 개념 · 환급 이유" />
      <P>프리랜서에게 돈을 주는 회사나 개인은 지급액의 3.3%를 원천징수한 뒤 나머지를 줘요. 3.3%는 소득세 3% + 지방소득세 0.3%로 구성돼요. 이 세금은 일종의 가불 세금이에요.</P>
      <P>원천징수는 프리랜서가 나중에 종합소득세를 신고할 때 미리 낸 세금으로 처리돼요. 실제 세금이 3.3%보다 적으면 초과분을 돌려받고, 많으면 추가로 납부해요. 대부분 프리랜서는 환급 대상이에요.</P>
      <P>사업소득과 기타소득으로 나뉘는데, 강연료나 원고료처럼 일시적으로 받는 경우는 기타소득으로 분류될 수 있어요. 기타소득은 연 300만원 초과 시 종합과세하고, 이하는 분리과세(22%) 또는 종합과세 중 선택할 수 있어요.</P>
      <H3>환급이 가능한 이유</H3>
      <P>3.3%는 모든 프리랜서에게 일률적으로 적용되는 개략적인 세율이에요. 하지만 실제 세금은 소득 규모, 필요경비, 개인공제를 반영해 계산해요. 소득이 낮을수록 실제 세율은 훨씬 낮아요.</P>
      <P>연 수입 2,000만원 프리랜서를 예로 들면, 원천징수액은 66만원이에요. 단순경비율 65% 적용 시 과세소득 700만원, 기본공제 차감 후 실제 세금은 33만원이에요. 차액 33만원을 환급받아요.</P>
      <Info type="tip">{"기타소득으로 받는 경우 연 300만원 이하면 분리과세(22%)가 유리한지, 종합과세가 유리한지 비교해보세요. 다른 소득이 없으면 종합과세가 유리한 경우가 많아요."}</Info>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s03" title="프리랜서 종합소득세 신고 방법은 어떻게 되나요?" sub="신고 기간 · 홈택스 절차" />
      <P>종합소득세 신고 기간은 매년 5월 1일부터 5월 31일까지예요. 성실신고확인 대상자는 6월 30일까지 연장돼요. 지난해 3.3% 원천징수로 소득이 있었다면 신고 의무가 있어요.</P>
      <P>신고 방법은 세 가지예요. 홈택스 직접 신고, ARS(126) 유선 신고, 세무사 대리 신고가 있어요. 소득이 단순하다면 홈택스로도 충분해요. 국세청이 미리 채워놓은 모두채움 서비스를 이용하면 더 쉬워요.</P>
      <P>홈택스에서 신고하는 순서는 세금신고 → 종합소득세 신고 → 일반신고(또는 모두채움 신고)예요. 소득·원천징수 내역이 자동으로 불러와지는 걸 확인하고 공제 항목을 추가하면 돼요.</P>
      <H3>모두채움 신고 서비스</H3>
      <P>사업소득 외에 근로소득, 금융소득 등 다른 소득이 있다면 합산신고해야 해요. 처음 신고하는 경우 국세청 세금신고 도움서비스 전화(126)를 이용하면 무료로 안내받을 수 있어요.</P>
      <Info type="tip">{"처음 신고하는 경우 홈택스 모두채움 서비스에서 빠진 소득이 없는지 먼저 확인하세요. 간혹 3.3% 원천징수 내역이 누락된 경우 직접 입력해야 해요."}</Info>

      <RelatedMid
        title="세금 관련 글도 확인해 보세요"
        items={[
          { icon: "⚠️", title: "종합소득세 가산세", desc: "신고 안 하면 최대 40% 가산세가 붙어요", href: "/w/종합소득세-신고-안하면-가산세" },
          { icon: "🏪", title: "간이과세자 기준 2026", desc: "연 매출 8천만원 이하면 간이과세자예요", href: "/w/부가가치세-간이과세자-기준-2026" },
          { icon: "🏠", title: "재산세 납부 기간", desc: "2026년 재산세 7월·9월 납부 기간", href: "/w/재산세-납부-기간-2026" },
        ]}
        hubHref="/category/세금"
        hubLabel="세금 글 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s04" title="프리랜서 종합소득세 필요경비 공제는 어떻게 되나요?" sub="단순경비율 · 업종별 비율" />
      <P>필요경비 공제 방법은 두 가지예요. 실제 경비로 공제하는 방법과, 업종별 단순경비율을 적용하는 방법이에요. 영수증 없이도 단순경비율로 경비를 인정받을 수 있어요.</P>
      <P>단순경비율이 실제 경비보다 높은 경우가 많아서, 대부분 단순경비율 적용이 유리해요. 직전 연도 수입이 4,800만원 이상이면 기준경비율 대상이 될 수 있어요.</P>

      <H3>업종별 단순경비율 (주요 프리랜서)</H3>
      <TableTitle>업종별 단순경비율</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>업종 분류</THL><THL>주요 직종</THL><THL>단순경비율</THL></tr>
          </thead>
          <tbody>
            {[
              ["인적 용역 (고문·자문)", "컨설턴트, 고문, 강사", "61.3%"],
              ["기타 자영업 서비스", "디자이너, 개발자, 작가", "64.1%"],
              ["교육 서비스", "과외 교사, 강의 강사", "75.0%"],
              ["예술·스포츠", "연예인, 운동선수, 모델", "72.6%"],
              ["도소매업", "온라인 판매, 도소매", "87.7~92.4%"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>출처: 국세청 단순경비율 기준, 2025년 귀속분 기준 (2026년 신고 시 적용)</TableNote>

      <P>예를 들어 IT 개발 프리랜서가 연 2,400만원을 벌었다면 단순경비율 64.1% 적용 시 필요경비는 약 1,538만원이에요. 과세소득 862만원에서 기본공제 150만원을 빼면 과세표준 712만원이에요. 실제 세금 약 47만원으로, 원천징수액 79만원에서 약 32만원이 환급돼요.</P>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s05" title="프리랜서 3.3% 환급 금액은 얼마나 되나요?" sub="계산 예시 · 환급 시기" />
      <P>환급 금액은 수입 규모와 업종, 개인 공제 항목에 따라 달라져요. 아래 표는 IT 서비스업 단순경비율 64.1%, 기본공제 150만원만 적용한 간단한 예시예요. 실제 환급액은 추가 공제에 따라 더 늘어날 수 있어요.</P>

      <TableTitle>수입별 환급 예상액 계산 예시</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>연 수입</THL><THL>원천징수액 (3.3%)</THL><THL>과세표준</THL><THL>실제 세금</THL><THL>예상 환급</THL></tr>
          </thead>
          <tbody>
            {[
              ["1,200만원", "39.6만원", "282만원", "17.0만원", "약 22.6만원"],
              ["2,400만원", "79.2만원", "712만원", "47.0만원", "약 32.2만원"],
              ["3,600만원", "118.8만원", "1,094만원", "76.4만원", "약 42.4만원"],
              ["4,800만원", "158.4만원", "1,578만원", "124.7만원", "약 33.7만원"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>단순경비율 64.1%, 기본공제 150만원 적용 예시 / 실제 환급액은 공제 항목에 따라 달라질 수 있음</TableNote>

      <H3>환급 받는 시기와 방법</H3>
      <P>5월 종합소득세 신고 후 국세청 심사를 거쳐 보통 2~3개월 내에 환급돼요. 이상 없는 경우 7~8월경 등록한 환급 계좌로 입금돼요. 홈택스 신고 시 환급 계좌를 반드시 입력해야 해요.</P>
      <P>신고 후 환급 진행 상황은 홈택스 마이홈택스 → 환급금 조회에서 확인할 수 있어요. 환급 계좌를 잘못 입력했거나 압류된 계좌라면 환급이 지연될 수 있으니 정확히 입력하세요.</P>
      <Info type="warn">{"신고 기간(5월 31일)을 놓치면 무신고 가산세 20%가 붙어요. 기한 후라도 자진신고하면 1개월 이내 50% 경감받을 수 있어요."}</Info>

      <ExtBtn
        badge="국세청 공식"
        text="홈택스 종합소득세 신고"
        cta="신고하러 가기 →"
        href="https://www.hometax.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "신고 안 하면 최대 40% 가산세가 붙어요", href: "/w/종합소득세-신고-안하면-가산세" },
        { title: "간이과세자 기준 매출 2026 | 일반과세 전환 부가세 신고 방법", desc: "매출 8천만원 기준 간이·일반과세 차이예요", href: "/w/부가가치세-간이과세자-기준-2026" },
        { title: "재산세 납부 기간 2026 | 7월 9월 분납 주택 토지 계산", desc: "2026년 재산세 납부 기간과 계산 방법이에요", href: "/w/재산세-납부-기간-2026" },
        { title: "건강보험 지역가입자 보험료 계산 | 재산 소득 점수 부과 방식", desc: "소득·재산·자동차를 점수로 환산하는 방법이에요", href: "/w/건강보험-지역가입자-보험료-계산" },
        { title: "국민연금 임의가입 전업주부 조건 | 월 보험료 수령액 손익분기점", desc: "전업주부 국민연금 임의가입 조건이에요", href: "/w/국민연금-임의가입-전업주부" },
      ]} />

      <PrevNext
        prev={{ title: "재산세 납부 기간 2026 | 7월 9월 분납 주택 토지 계산", href: "/w/재산세-납부-기간-2026" }}
        next={{ title: "간이과세자 기준 매출 2026 | 일반과세 전환 부가세 신고 방법", href: "/w/부가가치세-간이과세자-기준-2026" }}
      />
    </BlogLayout>
  );
}
