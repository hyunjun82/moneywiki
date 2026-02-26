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
  title: "도산등사실인정 사업 폐지 조건 | 영업양도 사실상 도산 차이",
  description: "회사가 법원 파산 없이 그냥 문 닫았나요? 사업 폐지와 영업양도 시 도산등사실인정 요건과 사실상 도산 인정 기준을 알려드려요.",
  category: "임금·퇴직금",
  keywords: [
    "도산등사실인정 사업 폐지 신청 조건",
    "영업양도 사실상 도산 임금채권 차이",
    "사업 폐지 임금채권 지급 불능 인정 기준",
    "도산등사실인정 사업주 재산 지급 능력 확인",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-22",
  datePublished: "2026-02-22",
  summary: [
    "도산등사실인정은 법원 파산 없이 사실상 도산 상태를 고용노동부에서 인정받는 제도예요.",
    "사업을 완전히 폐지하고 임금 지급 능력이 없으면 신청 가능해요.",
    "영업양도 시 양수인(새 사업자)이 임금채권을 연대 책임지는 경우가 있어요.",
  ],
  sources: [
    { name: "임금채권보장법 도산등사실인정 규정", url: "https://www.law.go.kr/법령/임금채권보장법", date: "2026-02" },
    { name: "고용노동부 도산등사실인정 안내", url: "https://www.moel.go.kr", date: "2026-02" },
  ],
  faq: [
    { q: "도산등사실인정 사업 폐지 후 신청 기한이 있나요?", a: "인정서 발급 후 2년 이내에 도산대지급금을 신청해야 해요. 사업 폐지 후 도산등사실인정 신청 기한은 임금채권 소멸시효(3년) 이내에 진행해야 해요. 폐업 후 빨리 신청하는 게 좋아요." },
    { q: "영업양도 후 새 회사에서 밀린 임금을 청구할 수 있나요?", a: "요건이 충족되면 가능해요. 영업 전부 또는 주요 부분을 양수받았고, 양수인이 채권채무 관계도 이어받았다면 새 사업자에게 미지급 임금을 청구할 수 있어요. 영업양도 계약서와 인수 범위를 꼭 확인해야 해요." },
  ],
  ctaCard: {
    label: "인정 신청",
    mainText: "도산등사실인정 고용노동부 신청",
    subText: "사실상 도산 인정 받기",
    url: "https://www.moel.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "도산대지급금 신청 방법", url: "/w/도산대지급금-신청-방법-절차" },
    { title: "도산등사실인정 신청 방법 서류", url: "/w/도산등사실인정-신청-방법-서류" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { status, payment } = sel;
    if (!status || !payment) return null;
    if (status === "closed" && payment === "none") return "closed_none";
    if (status === "closed" && payment === "partial") return "closed_partial";
    if (status === "transferred" && payment === "none") return "transferred_none";
    if (status === "transferred" && payment === "partial") return "transferred_partial";
    if (status === "disappeared" && payment === "none") return "disappeared_none";
    if (status === "disappeared" && payment === "partial") return "disappeared_partial";
    return null;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 신청 가능 여부 확인" },
    { t: "도산등사실인정이 뭐예요?", sub: "법원 파산 없이 인정 받는 방법" },
    { t: "사업 폐지 vs 영업양도 차이가 뭐예요?", sub: "임금채권 처리 방식 · 연대책임 여부" },
    { t: "사실상 도산 인정 기준은 어떻게 되나요?", sub: "지급 불능 증거 · 폐지 증거 기준" },
    { t: "영업양도 시 임금채권 어떻게 청구하나요?", sub: "양수인 연대책임 · 동시 청구 방법" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "임금·퇴직금", "도산등사실인정"]}
      tags={["2026년 최신", "도산등사실인정", "임금체불", "영업양도"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>법원 파산 없이 회사만 문 닫아도 <strong>도산등사실인정</strong>으로 임금을 받을 수 있어요. 사업 폐지와 영업양도 시 처리 방법이 달라요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법", date: "2026.02" }}
      stickyLabel="인정 신청"
      stickyValue="고용노동부 지청 방문"
      stickyBtn="신청 방법 보기"
      disclaimer="이 글은 임금채권보장법과 고용노동부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📋", title: "도산등사실인정 신청 절차", sub: "고용노동부 4단계 절차", href: "/w/도산등사실인정-신청-방법-서류", hot: true },
          { icon: "💰", title: "도산대지급금 신청 방법", sub: "2년 기한 필요 서류", href: "/w/도산대지급금-신청-방법-절차" },
          { icon: "🏢", title: "도산대지급금 상한액", sub: "연령별 최대 2,100만원", href: "/w/도산대지급금-상한액-지급액-계산" },
        ]} />
        <SidebarDocs items={[
          { title: "도산등사실인정 사업주 요건", cat: "임금·퇴직금·체당금", href: "/w/도산등사실인정-사업주-요건-회사-규모" },
          { title: "도산등사실인정 신청 방법 서류", cat: "임금·퇴직금·체당금", href: "/w/도산등사실인정-신청-방법-서류" },
          { title: "재판상 도산 파산 회생절차", cat: "임금·퇴직금·체당금", href: "/w/재판상-도산-파산-회생절차-대지급금" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          { title: "연말정산 계산기", href: "/w/연말정산-세액공제" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="신청 가능 여부 확인" sub="회사 상태 · 임금 지급 능력 여부" />
      <P>도산등사실인정을 받으려면 사업 폐지와 임금 지급 불능, 두 가지를 입증해야 해요. 회사 상태와 임금 지급 능력을 선택하면 신청 가능 여부를 알려드려요.</P>

      <CheckerShell title="도산등사실인정을 받을 수 있나요?" sub="30초 확인">
        <CheckerQ n="1" label="회사 상태가 어떻게 되나요?" group="status" opts={[
          ["closed", "사업을 완전히 폐지하고 문 닫았어요"],
          ["transferred", "영업양도나 사업 인수가 있었어요"],
          ["disappeared", "사업주가 도주하거나 소재불명이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="임금 지급 능력이 있나요?" group="payment" opts={[
          ["none", "재산이 없어서 임금을 줄 수 없어요"],
          ["partial", "일부는 지급할 수 있는 상태예요"],
        ]} sel={sel} pick={pick} />

        {result === "closed_none" && (
          <ResultPass title="도산등사실인정 신청이 가능해요">
            <P>사업을 폐지하고 임금 지급 능력이 없다면 도산등사실인정을 신청할 수 있어요. 고용노동부 관할 지청에 신청서와 사업 폐지 증빙(폐업신고서, 사업자등록 말소 등)을 제출하면 돼요. 인정되면 도산대지급금을 신청할 수 있어요.</P>
            <ResultCTA icon="📋" title="고용노동부 도산등사실인정 신청" desc="관할 지청 방문 접수" href="https://www.moel.go.kr" />
          </ResultPass>
        )}
        {result === "closed_partial" && (
          <ResultFail title="지급 능력이 있으면 인정이 어려워요">
            <P>도산등사실인정은 임금 지급 능력이 없는 경우에 인정돼요. 일부라도 지급 능력이 있다면 인정받기 어려워요. 자산이 매우 적거나 부채가 더 많은 경우엔 심사에서 인정될 수 있어요. 고용노동부에 구체적인 재정 상황을 설명하고 상담받아보세요.</P>
          </ResultFail>
        )}
        {result === "transferred_none" && (
          <ResultPass title="양도인 도산 + 양수인 책임 동시 청구가 가능해요">
            <P>영업양도가 있었다면 도산등사실인정으로 원래 사업주(양도인)에 대한 도산대지급금을 신청하면서, 동시에 새 사업주(양수인)에게 임금 연대책임을 청구할 수 있어요. 영업양도 계약서 내용을 꼭 확인하세요.</P>
            <ResultCTA icon="📋" title="고용노동부 도산등사실인정 신청" desc="관할 지청 방문 접수" href="https://www.moel.go.kr" />
          </ResultPass>
        )}
        {result === "transferred_partial" && (
          <ResultFail title="영업양도 시 양수인 직접 청구가 먼저예요">
            <P>영업양도 후 새 사업주가 임금채권을 이어받았다면 양수인에게 직접 청구하는 게 우선이에요. 양수인이 지급 능력이 있다면 도산대지급금보다 직접 청구가 빠를 수 있어요. 영업양도 계약서에 부채 인수 조항이 있는지 확인하세요.</P>
          </ResultFail>
        )}
        {result === "disappeared_none" && (
          <ResultPass title="사업주 소재불명도 인정 대상이에요">
            <P>사업주가 도주하거나 소재불명이고 재산도 없다면 사실상 도산으로 인정받을 수 있어요. 근로자가 단독으로 신청 가능하고 사업주 없이 근로감독관이 조사해요. 고용노동부 관할 지청에 신청서와 사업장 현황 자료를 제출하세요.</P>
            <ResultCTA icon="📋" title="고용노동부 도산등사실인정 신청" desc="관할 지청 방문 접수" href="https://www.moel.go.kr" />
          </ResultPass>
        )}
        {result === "disappeared_partial" && (
          <ResultFail title="지급 능력 확인이 필요해요">
            <P>사업주가 소재불명이어도 재산이 있다면 지급 능력이 있는 것으로 볼 수 있어요. 사업주 재산 현황을 먼저 확인하고, 재산이 없다면 도산등사실인정 신청을 진행하세요. 고용노동부(1350)에 상황을 설명하고 상담받아보세요.</P>
          </ResultFail>
        )}
        {!result && (
          <ResultFail title="회사 상태를 선택해 주세요">
            <P>회사 상태와 임금 지급 능력을 선택하면 신청 가능 여부를 안내해 드려요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="도산등사실인정 신청 절차가 궁금하다면?"
        a="고용노동부 지청 방문부터 인정서 발급까지 4단계 절차와 필요 서류를 정리했어요."
        label="도산등사실인정 신청 방법"
        href="/w/도산등사실인정-신청-방법-서류"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="도산등사실인정이 뭐예요?" sub="법원 파산 없이 인정 받는 방법" />
      <P><A href="https://www.law.go.kr/법령/임금채권보장법">임금채권보장법 제7조</A>에 따라 고용노동부 장관이 사실상 도산 상태를 공식 인정해주는 제도예요. 법원 도산 절차(파산·회생)와는 별개로 운영돼요.</P>
      <P>많은 중소기업 폐업이 법원 파산 절차 없이 그냥 문 닫는 방식이라 이 제도가 중요해요. 사업주가 법원에 파산을 신청하지 않은 경우, 현실적으로 사업이 중단되고 임금을 줄 능력이 없다면 도산등사실인정을 받아서 도산대지급금을 신청할 수 있어요.</P>
      <P>인정 요건은 두 가지예요. 사업 폐지 사실(실제로 사업을 그만뒀어야 함)과 지급 능력 부재(임금을 지급할 재산이 없어야 함)예요. 두 가지를 모두 입증해야 인정을 받을 수 있어요.</P>
      <P>인정서 발급 후 근로복지공단에 도산대지급금을 신청하면 돼요. 발급일로부터 2년 이내에 신청해야 해요. 고용노동부에서 인정만 받으면 그다음은 공단 신청 단계로 넘어가요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="사업 폐지 vs 영업양도 차이가 뭐예요?" sub="임금채권 처리 방식 · 연대책임 여부" />
      <P>임금채권 처리 방식이 달라요. 사업이 완전히 없어지는 것(폐지)과 다른 사람에게 넘어가는 것(양도)은 다른 거예요. 어떤 경우인지에 따라 청구 방법도 달라져요.</P>

      <TableTitle>사업 폐지 vs 영업양도 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><TH>사업 폐지</TH><TH>영업양도</TH></tr>
          </thead>
          <tbody>
            {[
              ["사업 지속", "사업 자체가 소멸", "새 주체에게 이전"],
              ["임금채권 청구 대상", "원래 사업주", "원래 사업주 + 양수인(조건부)"],
              ["도산등사실인정", "신청 가능", "원 사업주에 대해 신청 가능"],
              ["연대책임", "없음", "영업 이어받은 양수인에게 있을 수 있음"],
              ["추가 청구 방법", "대지급금 신청", "대지급금 + 양수인 직접 청구 병행"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: "left", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>사업 폐지는 임금채권을 원래 사업주에게만 청구할 수 있어요. 사업주가 지급 능력이 없으면 도산등사실인정 → 도산대지급금 순으로 진행해요.</P>
      <P><A href="https://www.law.go.kr/법령/근로기준법">근로기준법 제44조의2</A>에 따라 영업양도 시 새 사업주(양수인)가 원래 사업주와 연대해서 임금 지급 책임을 질 수 있어요. 양수인이 채무도 함께 이어받았다면 양수인에게 직접 청구가 가능해요.</P>

      <Info type="warn">영업양도 계약서에 부채 인수 조항이 없어도 영업의 실질적인 이전이 있었다면 양수인에게 연대책임을 물을 수 있어요. 계약서 내용과 실질적인 이전 범위를 함께 확인하세요.</Info>

      <RelatedMid
        title="도산등사실인정 관련 정보"
        items={[
          { icon: "📋", title: "도산등사실인정 신청 방법", desc: "고용노동부 4단계 신청 절차", href: "/w/도산등사실인정-신청-방법-서류" },
          { icon: "🏢", title: "도산등사실인정 사업주 요건", desc: "6개월 이상 산재보험 적용 기준", href: "/w/도산등사실인정-사업주-요건-회사-규모" },
          { icon: "💰", title: "도산대지급금 신청 절차", desc: "2년 기한과 필요 서류 목록", href: "/w/도산대지급금-신청-방법-절차" },
        ]}
        hubHref="/category/임금"
        hubLabel="임금체불 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="사실상 도산 인정 기준은 어떻게 되나요?" sub="지급 불능 증거 · 폐지 증거 기준" />
      <P>실질적인 사업 중단과 지급 불능이 핵심이에요. 형식적인 폐업 여부보다 실질을 봐요. 공식 폐업신고가 없어도 사실상 폐업 상태라면 인정받을 수 있어요.</P>
      <P>사실상 도산으로 인정되는 유형이에요. 사업장이 문을 닫고 영업이 완전히 중단된 경우예요. 사업주가 도주하거나 소재 불명인 경우예요. 재산 압류, 통장 동결 등으로 임금 지급이 물리적으로 불가능한 경우예요. 법인 청산이 진행 중인 경우도 해당돼요.</P>
      <P>인정이 어려운 경우도 있어요. 사업주가 영업을 일부 계속하는 경우예요. 개인 재산은 있는데 사업 자산만 없는 경우예요. 사업주가 연락 가능하고 분할납부 가능성이 있는 경우에도 인정받기 어려워요.</P>
      <P>고용노동부 근로감독관이 현장 조사를 나올 수 있어요. 사업장 실태 확인, 관련자 진술 청취 등을 거쳐 인정 여부를 결정해요. 증거 서류가 많을수록 인정 가능성이 높아요.</P>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="영업양도 시 임금채권 어떻게 청구하나요?" sub="양수인 연대책임 · 동시 청구 방법" />
      <P>영업양도가 있었다면 두 가지를 동시에 진행할 수 있어요. 원 사업주에 대한 도산등사실인정 → 도산대지급금 신청과, 양수인에게 연대책임 직접 청구예요.</P>
      <P>양수인 연대책임 청구는 영업양도 계약서 확인이 먼저예요. 영업의 전부 또는 주요 부분을 양수받았고, 근로자의 고용관계가 그대로 이어졌다면 연대책임이 인정될 가능성이 높아요. 양수인이 회사만 인수했고 직원은 모두 해고됐다면 연대책임 인정이 제한적일 수 있어요.</P>
      <P>도산등사실인정 신청 경로와 양수인 직접 청구는 별개예요. 도산등사실인정은 고용노동부에, 양수인 직접 청구는 근로기준법 위반 신고 또는 민사소송으로 진행해요. 고용노동부(1350)에 두 경로를 동시에 안내받을 수 있어요.</P>
      <P>실무에서는 두 방법 중 빠른 쪽으로 먼저 진행해요. 양수인이 명확히 채무를 이어받았다면 직접 청구가 빠를 수 있어요. 양수인이 부인하면 도산등사실인정 → 대지급금으로 먼저 확보하고 민사소송으로 추가 청구하는 방식을 써요.</P>

      <BridgeCard
        q="도산대지급금 신청 방법이 궁금하다면?"
        a="인정서 발급 후 근로복지공단에 2년 이내 신청해야 해요. 필요 서류와 온라인 신청 방법을 확인하세요."
        label="도산대지급금 신청 절차"
        href="/w/도산대지급금-신청-방법-절차"
      />

      <ExtBtn
        badge="고용노동부 공식"
        text="도산등사실인정 신청"
        cta="신청하기 →"
        href="https://www.moel.go.kr"
      />

      <Divider />

      <FAQAccordion items={meta.faq.map(f => ({ q: f.q, a: f.a }))} />

      <RelatedArticles items={[
        { title: "도산등사실인정 신청 방법 서류", desc: "고용노동부 신청 절차 4단계", href: "/w/도산등사실인정-신청-방법-서류" },
        { title: "도산등사실인정 사업주 요건", desc: "6개월 이상 산재보험 적용 기준", href: "/w/도산등사실인정-사업주-요건-회사-규모" },
        { title: "도산대지급금 신청 방법 절차", desc: "2년 기한과 필요 서류 목록", href: "/w/도산대지급금-신청-방법-절차" },
        { title: "도산대지급금 상한액 계산", desc: "연령별 최대 2,100만원 기준", href: "/w/도산대지급금-상한액-지급액-계산" },
        { title: "재판상 도산 파산 회생절차 비교", desc: "파산 vs 회생 근로자 임금 처리", href: "/w/재판상-도산-파산-회생절차-대지급금" },
      ]} />
      <PrevNext
        prev={{ title: "도산대지급금 신청 방법 절차", href: "/w/도산대지급금-신청-방법-절차" }}
        next={{ title: "도산등사실인정 사업주 요건", href: "/w/도산등사실인정-사업주-요건-회사-규모" }}
      />
    </BlogLayout>
  );
}
