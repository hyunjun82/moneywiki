"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "간이과세자 기준 매출 2026 | 일반과세 전환 부가세 신고 방법",
  description: "2026년 간이과세자 매출 기준이 8천만 원이라는 거 알고 계세요? 일반과세로 전환되는 조건과 부가세 신고 방법을 알려드려요.",
  category: "세금",
  keywords: [
    "간이과세자 기준 매출 8천만원 2026",
    "간이과세자 일반과세 전환 조건 시기",
    "간이과세자 부가가치세 신고 납부",
    "간이과세자 세금계산서 발행 의무",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 간이과세자 기준은 직전 연도 공급대가 합계 <strong>8,000만원 미만</strong>이에요.",
    "직전 연도 매출이 8,000만원 이상이면 다음 해 7월 1일부터 <strong>일반과세자로 전환</strong>돼요.",
    "간이과세자도 4,800만원 이상 매출이면 <strong>부가세 납부 의무</strong>가 있어요.",
  ],
  sources: [
    { name: "부가가치세법 제61조 간이과세자", url: "https://www.law.go.kr/법령/부가가치세법", date: "2026-02" },
    { name: "국세청 간이과세자 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2315&cntntsId=7736", date: "2026-02" },
  ],
  faq: [
    { q: "간이과세자는 세금계산서를 발행할 수 있나요?", a: "간이과세자도 세금계산서를 발행할 수 있어요. 다만 일반과세자처럼 모든 경우에 발행 의무가 있는 건 아니에요. 직전 연도 공급대가가 4,800만원 이상인 간이과세자는 세금계산서 발행 의무가 있어요. 4,800만원 미만은 영수증만 발행해도 돼요." },
    { q: "간이과세자 부가세는 얼마나 내나요?", a: "간이과세자 부가세는 (매출액 × 업종별 부가가치율 × 10%)예요. 예를 들어 소매업 부가가치율 15%인 경우, 연 매출 5,000만원이면 750만원 × 10% = 75만원이에요. 일반과세자(매출 × 10% - 매입 세액)보다 계산이 간단해요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "간이과세자 해당 여부 확인",
    subText: "연 매출·업종 선택",
    url: "https://www.hometax.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "종합소득세 신고 안하면 가산세", url: "/w/종합소득세-신고-안하면-가산세" },
    { title: "프리랜서 3.3% 원천징수 환급", url: "/w/프리랜서-3.3-원천징수-환급" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { sales, industry, tax_exempt } = sel;
    if (!sales || !industry || !tax_exempt) return null;
    if (tax_exempt === "exempt") return "tax_exempt_industry";
    if (sales === "over8000") return "general_taxpayer";
    if (sales === "over4800") return "simplified_with_vat";
    return "simplified_exempt";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 간이과세자 해당 여부 확인" },
    { t: "2026년 간이과세자 기준은 얼마인가요?", sub: "연 8,000만원 기준 · 업종별 제외 기준" },
    { t: "간이과세자와 일반과세자 차이는 무엇인가요?", sub: "세금 계산 방식 · 세금계산서 발행" },
    { t: "간이과세자에서 일반과세자로 전환되는 조건은 무엇인가요?", sub: "전환 기준 · 전환 시기 · 전환 후 처리" },
    { t: "간이과세자 부가가치세 신고 방법은 어떻게 되나요?", sub: "연 1회 신고 · 신고 기간 · 납부 방법" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "세금", "부가가치세"]}
      tags={["2026년 최신", "세금", "부가가치세", "간이과세자"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>2026년 간이과세자 기준은 연 매출 <strong>8,000만원 미만</strong>이에요. 8,000만원 이상이면 다음 해 7월부터 일반과세자로 전환돼요.</>}
      sourceBar={{ badge: "법제처", name: "부가가치세법 제61조", date: "2026.02" }}
      stickyLabel="간이과세 기준"
      stickyValue="연 매출 8,000만원 미만"
      stickyBtn="해당 여부 확인 ↑"
      disclaimer="이 글은 부가가치세법과 국세청 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📊", title: "부가세 신고 바로가기", sub: "홈택스에서 신고", href: "https://www.hometax.go.kr", hot: true },
          { icon: "💼", title: "종합소득세 가산세", sub: "신고 안 하면 20% 가산세", href: "/w/종합소득세-신고-안하면-가산세" },
          { icon: "💵", title: "프리랜서 3.3% 환급", sub: "종합소득세 신고로 환급받기", href: "/w/프리랜서-3.3-원천징수-환급" },
        ]} />
        <SidebarDocs items={[
          { title: "종합소득세 가산세", cat: "세금·절세", href: "/w/종합소득세-신고-안하면-가산세" },
          { title: "프리랜서 3.3% 환급", cat: "세금·절세", href: "/w/프리랜서-3.3-원천징수-환급" },
        ]} />
        <SidebarCalc items={[
          { title: "부가세 계산기", href: "https://www.hometax.go.kr" },
          { title: "종합소득세 계산기", href: "https://www.hometax.go.kr" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="간이과세자 해당 여부 확인" sub="연 매출 · 업종 · 납부 면제 여부 선택" />
      <P>간이과세자 해당 여부는 직전 연도 연간 매출(공급대가)을 기준으로 판단해요. 아래에서 내 상황을 선택하면 간이과세자인지 확인할 수 있어요.</P>

      <CheckerShell title="나는 간이과세자인가요?" sub="30초 확인">
        <CheckerQ n="1" label="직전 연도(2025년) 연간 매출이 얼마인가요?" group="sales" opts={[
          ["under4800", "4,800만원 미만이에요"],
          ["over4800", "4,800만원~8,000만원 사이예요"],
          ["over8000", "8,000만원 이상이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="업종이 어떻게 되나요?" group="industry" opts={[
          ["retail", "소매업·음식점업·서비스업"],
          ["construction", "건설업·부동산 임대업"],
          ["professional", "전문직·금융업·보험업"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="간이과세 적용이 제한되는 업종에 해당하나요?" group="tax_exempt" opts={[
          ["normal", "아니요, 일반 업종이에요"],
          ["exempt", "네, 전문직이나 제한 업종이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="사업자 유형이 어떻게 되나요?" group="type" opts={[
          ["new", "신규 사업자예요 (올해 개업)"],
          ["existing", "기존 사업자예요"],
        ]} sel={sel} pick={pick} />

        {result === "tax_exempt_industry" && (
          <ResultFail title="간이과세 적용이 안 되는 업종이에요">
            <P>변호사, 의사, 약사, 공인노무사 등 전문직 사업자는 매출과 관계없이 간이과세자가 될 수 없어요. 일반과세자로 신고해야 해요.</P>
          </ResultFail>
        )}
        {result === "general_taxpayer" && (
          <ResultFail title="직전 연도 매출 8,000만원 이상이면 일반과세자예요">
            <P>직전 연도 공급대가가 8,000만원 이상이면 당해 연도 7월 1일부터 일반과세자로 전환돼요. 일반과세자는 1년에 2번(1월, 7월) 부가세를 신고해야 해요.</P>
            <ResultCTA icon="📊" title="일반과세자 부가세 신고" desc="홈택스에서 신고하기" href="https://www.hometax.go.kr" />
          </ResultFail>
        )}
        {result === "simplified_with_vat" && (
          <ResultPass title="간이과세자이지만 부가세 납부 의무가 있어요">
            <P>직전 연도 매출이 4,800만원~8,000만원 사이라면 간이과세자이지만 부가세를 납부해야 해요. 매년 1월에 1회 신고·납부해요.</P>
            <ResultCTA icon="📊" title="간이과세자 부가세 신고" desc="홈택스에서 신고하기" href="https://www.hometax.go.kr" />
          </ResultPass>
        )}
        {result === "simplified_exempt" && (
          <ResultPass title="간이과세자이고 부가세 납부 면제 대상이에요">
            <P>직전 연도 매출이 4,800만원 미만이면 간이과세자로 부가세 납부 의무가 면제돼요. 다만 신고는 해야 해요. 매년 1월에 간이과세자 부가세 신고를 하면 돼요.</P>
            <ResultCTA icon="📊" title="간이과세자 신고 방법" desc="신고는 면세라도 해야 해요" href="https://www.hometax.go.kr" />
          </ResultPass>
        )}
      </CheckerShell>

      <BridgeCard
        q="간이과세자와 일반과세자 차이가 궁금하시죠?"
        a="세금 계산 방식과 신고 횟수, 세금계산서 발행 여부가 달라요."
        label="차이점 바로 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="2026년 간이과세자 기준은 얼마인가요?" sub="연 8,000만원 기준 · 업종별 제외 기준" />
      <P>2026년에도 간이과세자 기준은 직전 연도(2025년) 공급대가(부가세 포함 매출) 합계 8,000만원 미만이에요. 2021년 7월에 기존 4,800만원에서 8,000만원으로 상향됐고 이후 유지되고 있어요.</P>
      <P>공급대가는 부가세를 포함한 금액이에요. 일반 소비자에게 받은 금액 전체예요. 만약 연간 수입이 7,500만원이라면 간이과세자 기준인 8,000만원 미만이에요.</P>
      <P>신규 사업자는 첫해 공급대가를 연으로 환산해서 8,000만원 미만이면 간이과세자로 시작할 수 있어요. 예를 들어 7월에 개업해서 연말까지 3,000만원 벌었다면 연환산 6,000만원으로 기준 미만이에요.</P>
      <P>간이과세 적용이 제한되는 업종이 있어요. 변호사, 의사, 약사, 공인노무사, 건축사 등 전문직 사업자와 금융·보험업, 일부 제조업은 매출과 무관하게 일반과세자예요. <A href="https://www.law.go.kr/법령/부가가치세법">부가가치세법 제61조</A>에서 제한 업종을 명시하고 있어요.</P>

      <H3>연 8,000만원 기준</H3>
      <Info type="tip">{"간이과세자는 부가세 매입세액 공제를 받을 수 없어요. 매입이 많은 업종(도소매업, 제조업 등)은 오히려 일반과세자가 유리할 수 있어요."}</Info>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="간이과세자와 일반과세자 차이는 무엇인가요?" sub="세금 계산 방식 · 세금계산서 발행" />
      <P>가장 큰 차이는 부가세 계산 방식이에요. 일반과세자는 매출 세액에서 매입 세액을 빼서 납부해요. 간이과세자는 매출에 업종별 부가가치율을 곱한 후 10%를 적용해요.</P>

      <TableTitle>간이과세자 vs 일반과세자 핵심 차이</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>항목</THL><TH>간이과세자</TH><TH>일반과세자</TH></tr>
          </thead>
          <tbody>
            {[
              ["매출 기준", "연 8,000만원 미만", "연 8,000만원 이상"],
              ["부가세 계산", "매출 × 부가가치율 × 10%", "매출세액 - 매입세액"],
              ["신고 횟수", "연 1회 (1월)", "연 2회 (1월, 7월)"],
              ["세금계산서", "4,800만원 이상이면 발행 의무", "항상 발행 의무"],
              ["납부 면제", "연 4,800만원 미만 면제", "없음"],
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

      <P>세금계산서 발행 여부도 달라요. 일반과세자는 세금계산서를 발행해야 해요. 간이과세자 중 직전 연도 공급대가 4,800만원 이상은 세금계산서 발행 의무가 있고, 4,800만원 미만은 영수증만 발행해도 돼요.</P>

      <H3>세금 계산 방식</H3>
      <RelatedMid
        title="세금 관련 글도 확인해 보세요"
        items={[
          { icon: "💼", title: "종합소득세 가산세", desc: "신고 안 하면 20% 가산세가 붙어요", href: "/w/종합소득세-신고-안하면-가산세" },
          { icon: "💵", title: "프리랜서 3.3% 환급", desc: "3.3% 원천징수 환급받는 방법", href: "/w/프리랜서-3.3-원천징수-환급" },
          { icon: "🏠", title: "재산세 납부 기간 2026", desc: "7월·9월 분납 주택 토지 계산", href: "/w/재산세-납부-기간-2026" },
        ]}
        hubHref="/category/세금"
        hubLabel="세금 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="간이과세자에서 일반과세자로 전환되는 조건은 무엇인가요?" sub="전환 기준 · 전환 시기 · 전환 후 처리" />
      <P>직전 연도 공급대가가 8,000만원 이상이면 다음 해 7월 1일부터 일반과세자로 자동 전환돼요. 별도 신청 없이 자동으로 전환되고, 국세청에서 안내문을 보내줘요.</P>
      <P>전환 시기는 7월 1일이에요. 1월에서 6월까지는 간이과세자로 유지되고, 7월 1일부터 일반과세자가 돼요. 전환 전(1~6월)에 대한 부가세는 간이과세 방식으로, 전환 후(7~12월)는 일반과세 방식으로 신고해요.</P>
      <P>반대로 매출이 줄어서 8,000만원 미만이 되면 다음 해 7월 1일부터 다시 간이과세자로 돌아갈 수 있어요. 국세청에서 자동으로 처리해요.</P>
      <P>전환 후에는 일반과세자 의무가 생겨요. 세금계산서 발행, 연 2회 부가세 신고, 매입세액 공제 등 변화가 생기니 세무사나 국세청에서 안내를 받아두는 것이 좋아요.</P>

      <H3>전환 기준</H3>
      <BridgeCard
        q="종합소득세 신고도 함께 해야 하는지 궁금하시죠?"
        a="사업소득이 있으면 매년 5월에 종합소득세도 신고해야 해요."
        label="종합소득세 가산세 확인"
        href="/w/종합소득세-신고-안하면-가산세"
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="간이과세자 부가가치세 신고 방법은 어떻게 되나요?" sub="연 1회 신고 · 신고 기간 · 납부 방법" />
      <P>간이과세자는 1년에 한 번만 부가세를 신고해요. 매년 1월 1일부터 1월 25일까지가 신고·납부 기간이에요. 전년도(1~12월) 매출을 모두 합산해서 신고해요.</P>
      <P>신고는 홈택스(hometax.go.kr), 손택스(모바일 앱), 관할 세무서 방문으로 할 수 있어요. 홈택스에서 로그인 후 '부가가치세 신고' 메뉴에서 간이과세자로 신고하면 돼요.</P>
      <P>직전 연도 공급대가가 4,800만원 미만이면 납부 의무는 없지만 신고는 해야 해요. 신고를 하지 않으면 무신고 가산세(무신고 수입금액 × 0.5%)가 부과될 수 있어요.</P>
      <P>예정 부과 제도가 있어요. 7월에 직전 연도 납부세액의 절반을 예정고지로 미리 납부해야 하는 경우도 있어요. 다만 직전 연도 납부세액이 없으면 예정부과 대상이 아니에요.</P>

      <H3>연 1회 신고</H3>
      <ExtBtn
        badge="국세청 홈택스"
        text="간이과세자 부가세 신고"
        cta="신고하러 가기 →"
        href="https://www.hometax.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "종합소득세 신고 안 하면 붙는 가산세율이에요", href: "/w/종합소득세-신고-안하면-가산세" },
        { title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제", desc: "3.3% 세금 돌려받는 종합소득세 신고 방법이에요", href: "/w/프리랜서-3.3-원천징수-환급" },
        { title: "재산세 납부 기간 2026 | 7월 9월 분납 주택 토지 계산", desc: "2026년 재산세 납부 기간과 계산 방법이에요", href: "/w/재산세-납부-기간-2026" },
        { title: "국민연금 임의가입 전업주부 조건 | 월 보험료 수령액 손익분기점", desc: "전업주부 국민연금 임의가입 조건이에요", href: "/w/국민연금-임의가입-전업주부" },
        { title: "건강보험 지역가입자 보험료 계산 | 재산 소득 점수 부과 방식", desc: "소득·재산·자동차를 점수로 환산하는 방법이에요", href: "/w/건강보험-지역가입자-보험료-계산" },
      ]} />

      <PrevNext
        prev={{ title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", href: "/w/종합소득세-신고-안하면-가산세" }}
        next={{ title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제", href: "/w/프리랜서-3.3-원천징수-환급" }}
      />
    </BlogLayout>
  );
}
