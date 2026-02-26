"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "도산등사실인정 사업주 요건 | 회사 규모 6개월 사업 기준",
  description: "도산등사실인정 받으려면 사업주가 6개월 이상 사업했어야 한다는 사실 알고 계셨나요? 회사 규모별 요건과 산재보험 적용 조건을 알려드려요.",
  category: "임금·퇴직금",
  keywords: [
    "도산등사실인정 사업주 요건 6개월 기준",
    "도산등사실인정 회사 규모 근로자 수 제한",
    "도산등사실인정 산재보험 적용 사업장 조건",
    "도산등사실인정 영업 기간 실제 계산 증명",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-22",
  datePublished: "2026-02-22",
  summary: [
    "도산등사실인정 신청은 산재보험 적용 사업장에서 6개월 이상 사업한 경우에만 가능해요.",
    "회사 규모(근로자 수)에 따른 별도 제한은 없어요. 1인 사업장도 요건을 갖추면 해당돼요.",
    "사업주가 산재보험에 가입하지 않아도 당연 적용 대상 사업장이라면 요건이 충족돼요.",
  ],
  sources: [
    { name: "임금채권보장법 시행령 도산등사실인정 요건", url: "https://www.law.go.kr/법령/임금채권보장법시행령", date: "2026-02" },
    { name: "고용노동부 도산등사실인정 안내", url: "https://www.moel.go.kr", date: "2026-02" },
  ],
  faq: [
    { q: "도산등사실인정 요건에서 근로자 수 기준이 있나요?", a: "현재는 근로자 수 기준이 없어요. 과거에는 30인 미만 사업장만 해당됐지만, 지금은 폐지됐어요. 산재보험 적용 사업장에서 6개월 이상 사업을 한 경우라면 규모에 관계없이 신청 가능해요." },
    { q: "도산등사실인정 6개월 기준이 영업 기간인가요, 사업자등록 기간인가요?", a: "실제 사업(영업)을 한 기간이에요. 사업자등록이 됐어도 실제 영업이 없었다면 6개월 요건을 충족하지 못할 수 있어요. 근로자 채용 기간, 거래 기록 등으로 실제 영업 기간을 증명해야 해요." },
  ],
  ctaCard: {
    label: "요건 확인",
    mainText: "도산등사실인정 요건 충족 여부",
    subText: "고용노동부에서 무료 상담",
    url: "https://www.moel.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "도산등사실인정 신청 방법 서류", url: "/w/도산등사실인정-신청-방법-서류" },
    { title: "도산대지급금 신청 방법", url: "/w/도산대지급금-신청-방법-절차" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { period, insurance } = sel;
    if (!period || !insurance) return null;
    if (period === "over6" && insurance === "yes") return "over6_yes";
    if (period === "over6" && insurance === "no") return "over6_no";
    if (period === "borderline" && insurance === "yes") return "borderline_yes";
    if (period === "borderline" && insurance === "no") return "borderline_no";
    if (period === "under6" && insurance === "yes") return "under6_yes";
    if (period === "under6" && insurance === "no") return "under6_no";
    return null;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 요건 충족 여부 확인" },
    { t: "사업주 요건이 뭐예요?", sub: "6개월 기준 · 산재보험 요건 2가지" },
    { t: "6개월 기준 어떻게 계산하나요?", sub: "사업 개시일 · 실제 영업 기간 증명" },
    { t: "회사 규모는 상관있나요?", sub: "근로자 수 제한 폐지 · 1인 사업장 해당 여부" },
    { t: "산재보험 가입 안 했어도 괜찮나요?", sub: "당연 적용 사업장 · 미가입 시 처리" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "임금·퇴직금", "도산등사실인정"]}
      tags={["2026년 최신", "도산등사실인정", "임금체불", "사업주 요건"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>도산등사실인정을 받으려면 <strong>산재보험 적용 사업장 + 6개월 이상 영업</strong>이 기본 요건이에요. 회사 규모에 따른 제한은 없어요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법 시행령", date: "2026.02" }}
      stickyLabel="기본 요건"
      stickyValue="6개월 + 산재보험"
      stickyBtn="요건 확인"
      disclaimer="이 글은 임금채권보장법 시행령과 고용노동부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📋", title: "도산등사실인정 신청 방법", sub: "고용노동부 4단계 절차", href: "/w/도산등사실인정-신청-방법-서류", hot: true },
          { icon: "💰", title: "도산대지급금 신청 절차", sub: "2년 기한 필요 서류", href: "/w/도산대지급금-신청-방법-절차" },
          { icon: "🏢", title: "도산대지급금 상한액", sub: "연령별 최대 2,100만원", href: "/w/도산대지급금-상한액-지급액-계산" },
        ]} />
        <SidebarDocs items={[
          { title: "도산등사실인정 신청 방법", cat: "임금·퇴직금·체당금", href: "/w/도산등사실인정-신청-방법-서류" },
          { title: "도산등사실인정 사업 폐지 조건", cat: "임금·퇴직금·체당금", href: "/w/도산등사실인정-사업-폐지-영업양도" },
          { title: "도산대지급금 신청 방법", cat: "임금·퇴직금·체당금", href: "/w/도산대지급금-신청-방법-절차" },
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
      <Sec n="STEP 01" id="checker" title="요건 충족 여부 확인" sub="영업 기간 · 산재보험 적용 여부" />
      <P>도산등사실인정을 신청하려면 두 가지 기본 요건이 있어요. 영업 기간 6개월 이상과 산재보험 적용 사업장 여부예요. 아래에서 선택하면 요건 충족 여부를 알려드려요.</P>

      <CheckerShell title="도산등사실인정 요건이 충족되나요?" sub="30초 확인">
        <CheckerQ n="1" label="사업주가 얼마나 사업을 운영했나요?" group="period" opts={[
          ["over6", "6개월 이상 운영했어요"],
          ["borderline", "5~6개월 사이예요 (경계선)"],
          ["under6", "5개월 미만이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="사업장이 산재보험 적용 대상이었나요?" group="insurance" opts={[
          ["yes", "산재보험에 가입됐었어요"],
          ["no", "산재보험 가입이 없었어요"],
        ]} sel={sel} pick={pick} />

        {result === "over6_yes" && (
          <ResultPass title="도산등사실인정 요건이 충족돼요">
            <P>6개월 이상 사업 운영 + 산재보험 적용 사업장 요건을 갖췄어요. 추가로 사업 폐지와 임금 지급 불능 사실을 입증하면 도산등사실인정 신청이 가능해요. 고용노동부 관할 지청에 신청서를 제출하세요.</P>
            <ResultCTA icon="📋" title="고용노동부 도산등사실인정 신청" desc="관할 지청 방문 접수" href="https://www.moel.go.kr" />
          </ResultPass>
        )}
        {result === "over6_no" && (
          <ResultFail title="산재보험 미가입이면 요건 미충족이에요">
            <P>산재보험에 가입되지 않은 사업장은 도산등사실인정 대상이 아니에요. 다만 당연 적용 사업장인데 사업주가 가입하지 않은 경우엔 실질적으로 적용됐다고 볼 수 있어요. 고용노동부에 이 부분을 설명하고 상담받아보세요.</P>
            <ResultCTA icon="📞" title="고용노동부 1350 상담" desc="산재보험 당연 적용 여부 확인" href="https://www.moel.go.kr" />
          </ResultFail>
        )}
        {result === "borderline_yes" && (
          <ResultFail title="경계선이면 실제 영업 기간 증명이 중요해요">
            <P>5~6개월 사이라면 실제 영업 기간 증명이 결과를 좌우해요. 사업자등록 개설일이 아니라 첫 근로자 채용일, 첫 거래 계약서 날짜가 기준이 될 수 있어요. 서류를 최대한 갖춰 고용노동부에 상담받아보세요.</P>
            <ResultCTA icon="📞" title="고용노동부 1350 상담" desc="실제 영업 기간 판단 기준 문의" href="https://www.moel.go.kr" />
          </ResultFail>
        )}
        {result === "borderline_no" && (
          <ResultFail title="기간 + 산재보험 두 가지 모두 검토 필요해요">
            <P>영업 기간이 경계선이고 산재보험도 가입이 없었다면 두 가지 모두 확인이 필요해요. 산재보험 당연 적용 여부와 실제 영업 기간을 동시에 고용노동부에 상담받으세요.</P>
          </ResultFail>
        )}
        {result === "under6_yes" && (
          <ResultFail title="6개월 미만이면 인정이 어려워요">
            <P>6개월 미만 영업한 사업장은 도산등사실인정 요건에 미달해요. 이 경우 도산대지급금을 받기가 어려워요. 민사소송으로 임금을 청구하거나 노동위원회에 도움을 요청하세요.</P>
          </ResultFail>
        )}
        {result === "under6_no" && (
          <ResultFail title="두 가지 요건 모두 미충족이에요">
            <P>6개월 미만 운영에 산재보험도 없다면 도산등사실인정을 받기 어려워요. 임금채권은 민사소송으로 청구해야 해요. 고용노동부에 임금체불 진정을 접수하면 사업주에게 시정 명령을 내릴 수 있어요.</P>
          </ResultFail>
        )}
        {!result && (
          <ResultFail title="사업 기간을 선택해 주세요">
            <P>사업 기간과 산재보험 가입 여부를 선택하면 요건 충족 여부를 안내해 드려요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="요건이 충족됐다면 다음은 신청 절차예요"
        a="고용노동부 지청 방문부터 인정서 발급까지 4단계 절차와 필요 서류를 알려드려요."
        label="도산등사실인정 신청 방법"
        href="/w/도산등사실인정-신청-방법-서류"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="사업주 요건이 뭐예요?" sub="6개월 기준 · 산재보험 요건 2가지" />
      <P><A href="https://www.law.go.kr/법령/임금채권보장법시행령">임금채권보장법 시행령</A>에 따라 도산등사실인정을 받으려면 두 가지 기본 요건이 있어요. 첫째는 기간 요건이고, 둘째는 산재보험 요건이에요.</P>
      <P>기간 요건은 6개월 이상 실제 사업을 한 경우여야 해요. 단순히 사업자등록만 한 게 아니라 실제로 영업(근로자 채용, 거래 등)을 6개월 이상 했어야 해요. 사업자등록증 개설일이 아니라 실제 영업 시작일을 기준으로 계산해요.</P>
      <P>산재보험 요건은 산재보험 당연 적용 사업장이어야 해요. 1인 사업장도 산재보험 당연 적용 대상이면 해당돼요. 사업주가 산재보험에 가입하지 않았어도 당연 적용 대상 사업장이라면 요건이 충족돼요.</P>
      <P>회사 규모에 대한 별도 요건은 없어요. 과거에는 30인 미만 사업장만 해당됐지만, 현재는 폐지됐어요. 대기업이든 소기업이든 두 가지 기본 요건만 갖추면 신청 가능해요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="6개월 기준 어떻게 계산하나요?" sub="사업 개시일 · 실제 영업 기간 증명" />
      <P>사업 개시일부터 폐지 결정일까지의 기간이에요. 실제 영업 기간 기준으로 봐요. 사업자등록 날짜와 실제 영업 시작일이 다를 수 있어서 정확한 증명이 중요해요.</P>
      <P>사업 개시일 증명 방법이에요. 사업자등록증 개설일이 기본 참고 자료가 돼요. 하지만 실제 영업은 그보다 나중에 시작했다면 근로자 채용일, 첫 거래 계약서, 첫 거래 명세서 등으로 실제 시작일을 증명해야 해요.</P>
      <P>폐지 결정 시점은 실제로 영업을 완전히 중단한 시점이에요. 공식 폐업 신고일보다 실질적인 영업 중단일이 기준이 되는 경우가 많아요. 마지막 영업일을 증명하는 자료를 준비하는 게 좋아요.</P>
      <P>6개월 기준이 애매한 경우엔 고용노동부에서 실질 조사를 해요. 거래 내역, 세금계산서, 직원 4대 보험 기록 등을 종합해서 판단해요. 서류가 충분하지 않아도 현장 조사로 보완할 수 있어요.</P>

      <RelatedMid
        title="도산등사실인정 관련 정보"
        items={[
          { icon: "📋", title: "도산등사실인정 신청 방법", desc: "고용노동부 4단계 신청 절차", href: "/w/도산등사실인정-신청-방법-서류" },
          { icon: "🏢", title: "도산등사실인정 사업 폐지 조건", desc: "영업양도와 사실상 도산 차이", href: "/w/도산등사실인정-사업-폐지-영업양도" },
          { icon: "💰", title: "도산대지급금 신청 절차", desc: "2년 기한과 필요 서류 목록", href: "/w/도산대지급금-신청-방법-절차" },
        ]}
        hubHref="/category/임금"
        hubLabel="임금체불 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="회사 규모는 상관있나요?" sub="근로자 수 제한 폐지 · 1인 사업장 해당 여부" />
      <P>현재는 규모 제한이 없어요. 과거에 있던 30인 미만 제한이 폐지됐어요. 대기업도 소기업도 요건만 갖추면 신청 가능해요.</P>
      <P>과거(2007년 이전)에는 상시 근로자 30인 미만 사업장만 도산등사실인정 신청이 가능했어요. 중소기업 보호 목적이었지만, 30인 이상 사업장 근로자들의 형평성 문제로 폐지됐어요. 지금은 근로자 수와 무관해요.</P>
      <P>1인 사업장도 해당돼요. 단, 사업주가 혼자서만 일했다면 임금을 지급받을 근로자가 없는 거예요. 근로자를 채용해서 임금 채권이 발생했고 사업주가 지급하지 못한 상황이어야 해요.</P>
      <P>실무에서는 소규모 사업장(10인 미만)의 신청이 압도적으로 많아요. 법원 파산 비용을 감당하기 어렵고, 폐업 후 그냥 사라지는 패턴이 많기 때문이에요. 규모에 상관없이 요건이 맞으면 신청할 수 있어요.</P>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="산재보험 가입 안 했어도 괜찮나요?" sub="당연 적용 사업장 · 미가입 시 처리" />
      <P>산재보험 당연 적용 사업장이면 가입 여부와 무관하게 해당돼요. 사업주가 산재보험에 가입하지 않았어도 당연 적용 대상 사업장이라면 요건이 충족돼요.</P>
      <P>산재보험 당연 적용 대상은 사실상 모든 사업장이에요. 1인 이상 근로자를 고용한 사업장은 원칙적으로 모두 산재보험 당연 적용 대상이에요. 사업주가 임의 가입을 하지 않아도 법적으로 적용돼요.</P>
      <P>예외는 극히 드물어요. 법 적용이 제외되는 사업(농어업 중 일부, 가사서비스업 등 특수 유형)은 당연 적용에서 제외될 수 있어요. 이런 특수 업종이 아니라면 거의 모든 사업장이 해당돼요.</P>
      <P>사업주가 산재보험료를 납부하지 않은 경우에도 마찬가지예요. 납부 여부가 아니라 적용 대상 여부가 기준이에요. 미납으로 제재를 받는 건 사업주이고, 근로자의 도산등사실인정 요건과는 별개예요.</P>

      <Info type="tip">산재보험 가입 여부가 불분명하다면 4대 보험 정보연계센터(www.4insure.or.kr) 또는 고용노동부(1350)에서 확인할 수 있어요.</Info>

      <BridgeCard
        q="요건 확인 후 신청 방법이 궁금하다면?"
        a="신청 장소, 필요 서류, 처리 기간까지 단계별로 알려드려요. 고용노동부 지청 방문 신청 절차를 확인하세요."
        label="도산등사실인정 신청 방법"
        href="/w/도산등사실인정-신청-방법-서류"
      />

      <ExtBtn
        badge="고용노동부 공식"
        text="도산등사실인정 요건 확인 및 신청"
        cta="신청하기 →"
        href="https://www.moel.go.kr"
      />

      <Divider />

      <FAQAccordion items={meta.faq.map(f => ({ q: f.q, a: f.a }))} />

      <RelatedArticles items={[
        { title: "도산등사실인정 신청 방법 서류", desc: "고용노동부 신청 절차 4단계", href: "/w/도산등사실인정-신청-방법-서류" },
        { title: "도산등사실인정 사업 폐지 조건", desc: "영업양도와 사실상 도산 차이", href: "/w/도산등사실인정-사업-폐지-영업양도" },
        { title: "도산대지급금 신청 방법 절차", desc: "2년 기한과 필요 서류 목록", href: "/w/도산대지급금-신청-방법-절차" },
        { title: "도산대지급금 상한액 계산", desc: "연령별 최대 2,100만원 기준", href: "/w/도산대지급금-상한액-지급액-계산" },
        { title: "재판상 도산 파산 회생절차 비교", desc: "파산 vs 회생절차 대지급금 차이", href: "/w/재판상-도산-파산-회생절차-대지급금" },
      ]} />
      <PrevNext
        prev={{ title: "도산등사실인정 사업 폐지 조건", href: "/w/도산등사실인정-사업-폐지-영업양도" }}
        next={{ title: "도산등사실인정 신청 방법 서류", href: "/w/도산등사실인정-신청-방법-서류" }}
      />
    </BlogLayout>
  );
}
