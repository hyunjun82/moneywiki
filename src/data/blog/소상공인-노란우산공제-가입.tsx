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
  title: "소상공인 노란우산공제 가입 조건 | 연간 소득공제 금액 절세 혜택",
  description: "소상공인이라면 노란우산공제로 연간 500만 원까지 소득공제 받는다는 거 아시나요? 가입 조건과 절세 혜택을 알려드려요.",
  category: "근로/노동",
  keywords: [
    "소상공인 노란우산공제 가입 조건",
    "노란우산공제 소득공제 금액 500만원",
    "노란우산공제 가입 방법 중소기업중앙회",
    "노란우산공제 해지 불이익 주의사항",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "소상공인·자영업자라면 노란우산공제 납입금의 <strong>전액(최대 500만원)</strong>을 소득공제 받아요.",
    "월 5만원부터 납입 가능하고, 압류·해지 신청 등으로 폐업 시 <strong>생활 안전망</strong> 역할을 해요.",
    "사업소득이 있는 개인사업자와 법인 소기업 대표자가 가입 대상이에요.",
  ],
  sources: [
    { name: "중소기업협동조합법 제115조 공제사업", url: "https://www.law.go.kr/법령/중소기업협동조합법", date: "2026-02" },
    { name: "소기업소상공인공제부금법", url: "https://www.law.go.kr/법령/소기업소상공인공제부금법", date: "2026-02" },
  ],
  faq: [
    { q: "노란우산공제를 중도 해지하면 어떻게 되나요?", a: "해지환급금을 받을 수 있어요. 다만 가입 기간이 짧을수록 환급률이 낮아요. 또한 그동안 소득공제 받은 금액이 기타소득으로 처리돼 세금을 내야 할 수 있어요. 폐업·사망·노령 등 법정 공제 사유가 아닌 임의 해지는 불이익이 커요." },
    { q: "노란우산공제 납입금은 얼마까지 소득공제 되나요?", a: "사업소득 금액에 따라 달라요. 4천만원 이하면 최대 500만원, 4천만원~1억원 이하면 최대 300만원, 1억원 초과면 최대 200만원까지 소득공제돼요." },
  ],
  ctaCard: {
    label: "절세 효과",
    mainText: "연간 최대 500만원 소득공제",
    subText: "월 5만원부터 납입 가능",
    url: "https://www.seda.or.kr",
    external: true,
  },
  relatedDocs: [
    { title: "종합소득세 가산세", url: "/w/종합소득세-신고-안하면-가산세" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { biz_type, income, duration } = sel;
    if (!biz_type || !income || !duration) return null;
    if (biz_type === "employee") return "not_eligible";
    if (biz_type === "individual" && income !== "none") return "eligible";
    if (biz_type === "corp_ceo") return "check";
    return "check";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 가입 자격 확인" },
    { t: "소상공인 노란우산공제 가입 조건은 무엇인가요?", sub: "개인사업자 · 법인 소기업 대표자" },
    { t: "노란우산공제 소득공제 금액은 얼마인가요?", sub: "소득별 최대 200~500만원" },
    { t: "노란우산공제 가입 방법은 어떻게 되나요?", sub: "중소기업중앙회 · 온라인 신청" },
    { t: "노란우산공제 해지 불이익은 무엇인가요?", sub: "임의해지 세금 추징 · 환급률" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "근로/노동", "소상공인"]}
      tags={["2026년 최신", "소상공인", "노란우산공제", "절세"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>소상공인이라면 노란우산공제로 납입금 전액을 소득공제 받을 수 있어요. <strong>연간 최대 500만원</strong>까지 공제되는 절세 효과가 있어요.</>}
      sourceBar={{ badge: "중소기업중앙회", name: "노란우산공제 제도 안내", date: "2026.02" }}
      stickyLabel="연간 소득공제"
      stickyValue="최대 500만원"
      stickyBtn="가입 조건 확인 ↑"
      disclaimer="이 글은 소기업소상공인공제부금법과 중소기업중앙회 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💛", title: "노란우산공제 가입 신청", sub: "중소기업중앙회 공식 사이트", href: "https://www.seda.or.kr", hot: true },
          { icon: "📊", title: "종합소득세 가산세 계산", sub: "신고 안 하면 20% 가산", href: "/w/종합소득세-신고-안하면-가산세" },
          { icon: "💼", title: "프리랜서 3.3% 환급", sub: "종합소득세 신고로 환급받기", href: "/w/프리랜서-3.3-원천징수-환급" },
        ]} />
        <SidebarDocs items={[
          { title: "종합소득세 가산세", cat: "세금·절세", href: "/w/종합소득세-신고-안하면-가산세" },
          { title: "프리랜서 3.3% 환급", cat: "세금·절세", href: "/w/프리랜서-3.3-원천징수-환급" },
        ]} />
        <SidebarCalc items={[
          { title: "종합소득세 계산기", href: "https://www.hometax.go.kr" },
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="가입 자격 확인" sub="사업 유형 · 소득 · 가입 기간 선택" />
      <P>노란우산공제는 소상공인과 소기업 사업자를 위한 제도예요. 직장인이나 프리랜서는 가입 대상이 아니에요. 아래에서 내 사업 유형을 선택하면 가입 가능 여부와 예상 혜택을 확인할 수 있어요.</P>

      <CheckerShell title="노란우산공제에 가입할 수 있을까요?" sub="30초 확인">
        <CheckerQ n="1" label="사업자 유형이 어떻게 되나요?" group="biz_type" opts={[
          ["individual", "개인사업자 (일반과세·간이과세)"],
          ["corp_ceo", "법인 소기업 대표자"],
          ["employee", "직장인·근로자예요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="연간 사업소득이 얼마나 되나요?" group="income" opts={[
          ["lt4000", "4천만원 이하예요"],
          ["lt1억", "4천만원~1억원 이하예요"],
          ["over1억", "1억원 초과예요"],
          ["none", "아직 소득이 없거나 폐업했어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="얼마나 오래 납입할 예정인가요?" group="duration" opts={[
          ["short", "1~2년 단기"],
          ["mid", "3~5년"],
          ["long", "10년 이상 장기"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="현재 폐업이나 사업 중단 상황인가요?" group="status" opts={[
          ["active", "사업 중이에요"],
          ["closure", "폐업하거나 중단했어요"],
        ]} sel={sel} pick={pick} />

        {result === "eligible" && (
          <ResultPass title="노란우산공제 가입 대상이에요">
            <P>개인사업자라면 바로 가입할 수 있어요. 중소기업중앙회 홈페이지(seda.or.kr)에서 온라인으로 신청하거나 가까운 지역 중소기업중앙회에 방문해서 가입할 수 있어요.</P>
            <ResultCTA icon="💛" title="노란우산공제 바로 가입" desc="중소기업중앙회 공식 신청 페이지" href="https://www.seda.or.kr" />
          </ResultPass>
        )}
        {result === "not_eligible" && (
          <ResultFail title="직장인은 가입 대상이 아니에요">
            <P>노란우산공제는 소상공인·소기업 사업자 전용 제도예요. 직장인은 퇴직연금이나 IRP 계좌를 통해 절세 혜택을 받을 수 있어요.</P>
            <ResultCTA icon="📋" title="연말정산 절세 방법 확인" desc="근로자 세액공제·소득공제 총정리" href="https://www.hometax.go.kr" />
          </ResultFail>
        )}
        {result === "check" && (
          <ResultFail title="법인 소기업 대표자 여부 추가 확인이 필요해요">
            <P>법인은 상시 근로자 수 등에 따라 소기업 여부가 달라져요. 제조업은 50인 미만, 서비스업은 10~20인 미만 기준이에요. 중소기업중앙회에서 소기업 해당 여부를 먼저 확인하세요.</P>
            <ResultCTA icon="💛" title="소기업 해당 여부 확인" desc="중소기업중앙회에서 조회 가능해요" href="https://www.seda.or.kr" />
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="소득공제 금액이 얼마나 되는지 궁금하시죠?"
        a="연간 사업소득에 따라 200~500만원까지 공제돼요."
        label="소득공제 금액 바로 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="소상공인 노란우산공제 가입 조건은 무엇인가요?" sub="개인사업자 · 법인 소기업 대표자" />
      <P>노란우산공제 가입 대상은 소기업·소상공인이에요. <A href="https://www.law.go.kr/법령/소기업소상공인공제부금법">소기업소상공인공제부금법</A>에 따라 사업자등록을 한 개인사업자와 법인 소기업의 대표자가 가입할 수 있어요.</P>
      <P>개인사업자는 업종과 관계없이 사업자등록을 마친 모든 소상공인이 대상이에요. 일반과세자, 간이과세자, 면세사업자 모두 가능해요. 프리랜서처럼 사업자등록 없이 활동하는 경우는 가입이 어려워요.</P>
      <P>법인 소기업 대표자는 업종별 상시 근로자 수 기준을 충족해야 해요. 제조업은 50인 미만, 도소매·서비스업은 10~20인 미만(업종별로 다름) 기준이에요. 기업은행·국민은행 등 협약 금융기관에서도 가입할 수 있어요.</P>
      <P>납입금은 월 5만원부터 70만원까지 자유롭게 설정할 수 있어요. 연간 최대 840만원(월 70만원)까지 납입 가능해요. 월 납입금을 변경할 수도 있어서 사업 상황에 맞게 유연하게 조절할 수 있어요.</P>

      <H3>소기업·소상공인 기준</H3>
      <TableTitle>업종별 소기업 범위 (상시 근로자 수)</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>업종</THL><TH>소기업 기준</TH></tr>
          </thead>
          <tbody>
            {[
              ["제조업·광업·건설업 등", "상시 근로자 50인 미만"],
              ["도소매업·음식·숙박업", "상시 근로자 10인 미만"],
              ["서비스업·부동산업", "상시 근로자 5인 미만"],
              ["개인사업자 소상공인", "업종 무관, 사업자등록 후 가입 가능"],
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

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="노란우산공제 소득공제 금액은 얼마인가요?" sub="소득별 최대 200~500만원" />
      <P>노란우산공제의 핵심 혜택은 납입금 전액 소득공제예요. 납입한 금액을 사업소득에서 빼주니까 과세 대상 소득이 줄어들고 세금도 줄어요. 소득이 높을수록 절세 효과가 커요.</P>
      <P>소득공제 한도는 사업소득 금액에 따라 달라요. 사업소득 4천만원 이하면 최대 500만원, 4천만원~1억원 이하면 최대 300만원, 1억원 초과면 최대 200만원이에요. 납입금 전액을 공제하되 이 한도를 초과하지 않아요.</P>
      <P>예를 들어 사업소득이 3천만원이고 노란우산공제 납입금이 연 300만원이라면 300만원 전액 소득공제를 받아요. 세율 15%라면 45만원 절세 효과예요. 납입금보다 절세 금액이 더 크진 않지만 저축 + 절세 두 가지 효과가 있어요.</P>
      <P>소득세 외에 건강보험료도 줄어드는 간접 효과도 있어요. 소득이 줄어드니 지역가입자 건강보험료 산정에도 유리하게 작용해요. 폐업 시 공제금을 일시금으로 받을 수 있어 생활 안전망 역할도 해요.</P>

      <H3>소득별 소득공제 한도</H3>
      <TableTitle>노란우산공제 소득공제 한도</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>사업소득 금액</THL><TH>최대 공제 한도</TH><TH>세율 15% 기준 절세액</TH></tr>
          </thead>
          <tbody>
            {[
              ["4천만원 이하", "500만원", "최대 75만원"],
              ["4천만원 초과~1억원 이하", "300만원", "최대 45만원"],
              ["1억원 초과", "200만원", "최대 30만원+"],
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
      <TableNote>절세액은 소득세율에 따라 달라져요. 소득이 높을수록 세율이 높아 절세 효과도 커요.</TableNote>

      <RelatedMid
        title="자영업·사업자 관련 글도 확인해 보세요"
        items={[
          { icon: "📊", title: "종합소득세 가산세 계산", desc: "무신고 시 20% 가산세 주의", href: "/w/종합소득세-신고-안하면-가산세" },
          { icon: "💼", title: "프리랜서 3.3% 환급", desc: "원천징수 세금 돌려받는 방법", href: "/w/프리랜서-3.3-원천징수-환급" },
          { icon: "🏪", title: "간이과세자 기준 2026", desc: "8천만원 기준 일반과세 전환 조건", href: "/w/부가가치세-간이과세자-기준-2026" },
        ]}
        hubHref="/category/세금"
        hubLabel="세금 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="노란우산공제 가입 방법은 어떻게 되나요?" sub="중소기업중앙회 · 온라인 신청" />
      <P>가입 방법은 온라인, 방문, 금융기관 세 가지 경로가 있어요. 가장 빠른 방법은 중소기업중앙회 홈페이지(seda.or.kr)에서 온라인으로 신청하는 거예요. 공동인증서가 있으면 15분 내에 가입 완료할 수 있어요.</P>
      <P>방문 신청은 전국 중소기업중앙회 지역본부·지회에서 가능해요. 협약 금융기관(기업은행·국민은행·신한은행 등)에서도 가입할 수 있어요. 은행 방문 시 사업자등록증과 신분증을 지참하면 돼요.</P>
      <P>납입 방법은 자동이체가 원칙이에요. 가입 시 선택한 계좌에서 매월 자동으로 납입돼요. 납입금을 올리거나 내리려면 중소기업중앙회에 변경 신청을 하면 돼요.</P>
      <P>공제금 수령은 폐업, 사망, 노령(만 60세+가입 10년 이상), 질병·부상 등 법정 사유가 발생했을 때 가능해요. 사업을 계속하면서 임의로 중도 해지도 가능하지만 불이익이 있어요.</P>

      <H3>가입에 필요한 서류</H3>
      <Info type="tip">{"사업자등록증과 본인 신분증만 있으면 가입할 수 있어요. 법인 대표자는 법인등기부등본도 필요해요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="노란우산공제 해지 불이익은 무엇인가요?" sub="임의해지 세금 추징 · 환급률" />
      <P>폐업·사망·노령 등 법정 사유 없이 임의로 해지하면 두 가지 불이익이 있어요. 첫째, 기간이 짧을수록 원금보다 적은 금액이 돌아와요. 가입 1년 미만은 납입액의 80% 수준만 돌려받아요.</P>
      <P>둘째, 그동안 소득공제 받은 금액이 기타소득으로 처리돼요. 공제받은 납입금 총액의 일부에 세금이 붙어요. 임의해지 시 받는 해지환급금은 기타소득세(22%) 원천징수 대상이에요.</P>
      <P>반면 법정 사유로 해지하면 훨씬 유리해요. 폐업 시에는 납입금 전액+이자를 받고, 퇴직소득세율(낮은 세율)이 적용돼요. 오래 납입할수록 수령액이 늘어나고 세금 부담도 줄어요.</P>
      <P>중도에 납입금을 내지 않으면 어떻게 될까요? 3개월 이상 미납하면 납부 중지 상태가 되고, 1년 이상 미납하면 계약이 해지돼요. 사업이 어려운 시기에는 납입금을 최소(월 5만원)로 줄여두는 게 방법이에요.</P>

      <H3>임의해지 vs 법정해지 차이</H3>
      <Info type="warn">{"임의 해지 시 기타소득세 22%가 원천징수돼요. 가능하면 법정 공제 사유(폐업 등)까지 유지하는 게 유리해요."}</Info>

      <ExtBtn
        badge="중소기업중앙회"
        text="노란우산공제 가입 신청"
        cta="가입하러 가기 →"
        href="https://www.seda.or.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "종합소득세 가산세 종류와 계산 방법이에요", href: "/w/종합소득세-신고-안하면-가산세" },
        { title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제", desc: "원천징수 세금 환급받는 방법이에요", href: "/w/프리랜서-3.3-원천징수-환급" },
        { title: "간이과세자 기준 매출 2026 | 일반과세 전환 부가세 신고 방법", desc: "8천만원 기준 일반과세 전환 조건이에요", href: "/w/부가가치세-간이과세자-기준-2026" },
        { title: "생애최초 주택 취득세 감면 조건 2026 | 1주택 200만원 면제 신청 방법", desc: "생애최초 취득세 200만원 감면이에요", href: "/w/생애최초-취득세-감면-조건-2026" },
        { title: "취업후상환 학자금대출 의무 상환 조건 | 소득 초과 상환액 계산 방법", desc: "ICL 의무 상환 소득 기준이에요", href: "/w/취업후상환-학자금대출-상환" },
      ]} />

      <PrevNext
        prev={{ title: "생애최초 주택 취득세 감면 조건 2026 | 1주택 200만원 면제 신청 방법", href: "/w/생애최초-취득세-감면-조건-2026" }}
        next={{ title: "취업후상환 학자금대출 의무 상환 조건 | 소득 초과 상환액 계산 방법", href: "/w/취업후상환-학자금대출-상환" }}
      />
    </BlogLayout>
  );
}
