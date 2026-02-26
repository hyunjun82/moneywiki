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
  title: "재판상 도산 파산 회생절차 비교 | 대지급금 신청 방법 차이",
  description: "재판상 도산과 사실상 도산 중 어떤 절차로 대지급금 받는지 고민이시죠? 파산과 회생절차 차이까지 비교해 알려드려요.",
  category: "임금·퇴직금",
  keywords: [
    "재판상 도산 파산 선고 대지급금 신청",
    "파산 회생절차 근로자 임금채권 차이",
    "재판상 도산 사실상 도산 비교 대지급금",
    "파산 배당 회생채권 신고 임금 청구",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-22",
  datePublished: "2026-02-22",
  summary: [
    "재판상 도산은 법원의 파산 선고 또는 회생절차 개시 결정으로 확인돼요.",
    "파산은 회사가 완전히 소멸하고, 회생은 구조조정 후 존속하는 차이가 있어요.",
    "재판상 도산 시 도산대지급금은 선고·결정일로부터 2년 이내에 신청해야 해요.",
  ],
  sources: [
    { name: "채무자 회생 및 파산에 관한 법률", url: "https://www.law.go.kr/법령/채무자회생및파산에관한법률", date: "2026-02" },
    { name: "임금채권보장법 재판상 도산 조항", url: "https://www.law.go.kr/법령/임금채권보장법", date: "2026-02" },
  ],
  faq: [
    { q: "회생절차 중인 회사에서도 대지급금을 신청할 수 있나요?", a: "네, 신청 가능해요. 법원의 회생절차 개시 결정이 내려진 시점부터 도산대지급금 신청 요건이 충족돼요. 회생절차 중에도 근로자 임금은 최우선 채권으로 처리되지만, 체불 금액이 있다면 대지급금을 신청하는 게 빠를 수 있어요." },
    { q: "파산과 회생절차 중 어느 게 근로자에게 유리한가요?", a: "상황에 따라 달라요. 회생절차는 회사가 살아남으면 계속 취업이 가능하지만, 임금 지급이 구조조정 계획에 따라 지연될 수 있어요. 파산은 회사가 없어지지만 대지급금과 파산 배당으로 체불 임금을 더 확실하게 받을 수 있어요." },
  ],
  ctaCard: {
    label: "신청 방법 확인",
    mainText: "파산·회생절차 시 대지급금 신청",
    subText: "도산 결정일로부터 2년 이내",
    url: "https://www.comwel.or.kr",
    external: true,
  },
  relatedDocs: [
    { title: "도산대지급금 신청 방법 절차", url: "/w/도산대지급금-신청-방법-절차" },
    { title: "도산등사실인정 신청 방법 서류", url: "/w/도산등사실인정-신청-방법-서류" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { type, period } = sel;
    if (!type || !period) return null;
    if (type === "bankruptcy" && period === "within2") return "bankruptcy_within";
    if (type === "bankruptcy" && period === "over2") return "bankruptcy_over";
    if (type === "rehabilitation" && period === "within2") return "rehabilitation_within";
    if (type === "rehabilitation" && period === "over2") return "rehabilitation_over";
    if (type === "defacto" && period === "within2") return "defacto_within";
    if (type === "defacto" && period === "over2") return "defacto_over";
    return null;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 도산 유형별 신청 방법 확인" },
    { t: "재판상 도산이 뭐예요?", sub: "파산 선고 · 회생절차 개시 결정 차이" },
    { t: "파산과 회생절차 차이가 뭐예요?", sub: "회사 존속 여부 · 근로자 임금 처리" },
    { t: "재판상 도산 대지급금 어떻게 신청하나요?", sub: "파산 선고문 · 회생결정문 신청 방법" },
    { t: "재판상 도산 vs 사실상 도산 어떻게 달라요?", sub: "법원 관여 여부 · 대지급금 한도 비교" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "임금·퇴직금", "도산대지급금"]}
      tags={["2026년 최신", "재판상 도산", "파산", "회생절차", "대지급금"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>법원에서 파산 선고나 회생절차 개시 결정이 내려졌다면 <strong>재판상 도산</strong>이에요. 별도 도산등사실인정 없이 바로 근로복지공단에 신청해요.</>}
      sourceBar={{ badge: "법제처", name: "채무자 회생 및 파산에 관한 법률", date: "2026.02" }}
      stickyLabel="신청 기한"
      stickyValue="선고·결정일 후 2년"
      stickyBtn="신청하기"
      disclaimer="이 글은 채무자 회생 및 파산에 관한 법률, 임금채권보장법을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💰", title: "도산대지급금 신청 절차", sub: "2년 기한 필요 서류", href: "/w/도산대지급금-신청-방법-절차", hot: true },
          { icon: "📋", title: "도산등사실인정 신청 방법", sub: "사실상 도산 인정 절차", href: "/w/도산등사실인정-신청-방법-서류" },
          { icon: "🏢", title: "도산대지급금 상한액", sub: "연령별 최대 2,100만원", href: "/w/도산대지급금-상한액-지급액-계산" },
        ]} />
        <SidebarDocs items={[
          { title: "도산대지급금 신청 방법", cat: "임금·퇴직금·체당금", href: "/w/도산대지급금-신청-방법-절차" },
          { title: "도산등사실인정 신청 방법", cat: "임금·퇴직금·체당금", href: "/w/도산등사실인정-신청-방법-서류" },
          { title: "도산대지급금 상한액 계산", cat: "임금·퇴직금·체당금", href: "/w/도산대지급금-상한액-지급액-계산" },
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
      <Sec n="STEP 01" id="checker" title="도산 유형별 신청 방법 확인" sub="파산·회생·사실상 도산 · 2년 기한 여부" />
      <P>도산 유형과 경과 기간을 선택하면 대지급금 신청 방법을 알려드려요. 재판상 도산(파산·회생)과 사실상 도산은 신청 경로가 달라요.</P>

      <CheckerShell title="회사 도산 유형에 따라 어떻게 해야 하나요?" sub="30초 확인">
        <CheckerQ n="1" label="회사 도산이 어떤 형태인가요?" group="type" opts={[
          ["bankruptcy", "법원에서 파산 선고를 받았어요"],
          ["rehabilitation", "법원에서 회생절차 개시 결정이 났어요"],
          ["defacto", "법원 절차 없이 그냥 문 닫았어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="도산 결정 또는 폐업 후 얼마나 됐나요?" group="period" opts={[
          ["within2", "2년이 안 됐어요"],
          ["over2", "2년이 지났어요"],
        ]} sel={sel} pick={pick} />

        {result === "bankruptcy_within" && (
          <ResultPass title="파산 선고문으로 대지급금 신청 가능해요">
            <P>법원 파산 선고문을 가지고 근로복지공단에 도산대지급금을 신청하면 돼요. 파산 선고일로부터 2년 이내에 신청해야 해요. 파산 배당 신청도 병행해서 대지급금 한도 초과분을 추가로 받으세요.</P>
            <ResultCTA icon="🏢" title="근로복지공단 체당금 신청" desc="도산대지급금 온라인 접수" href="https://www.comwel.or.kr" />
          </ResultPass>
        )}
        {result === "bankruptcy_over" && (
          <ResultFail title="2년 기한이 지나 대지급금 신청이 어려워요">
            <P>파산 선고일로부터 2년이 지나면 도산대지급금 신청 기한이 소멸해요. 임금채권 소멸시효(3년)가 남아있으면 파산 배당 신청으로 직접 청구할 수 있어요. 파산관재인에게 채권 신고를 하세요.</P>
          </ResultFail>
        )}
        {result === "rehabilitation_within" && (
          <ResultPass title="회생절차 개시 결정문으로 신청 가능해요">
            <P>회생절차 개시 결정문을 가지고 근로복지공단에 도산대지급금을 신청하면 돼요. 결정일로부터 2년 이내에 신청해야 해요. 회생절차에서 회생채권 신고도 별도로 하세요.</P>
            <ResultCTA icon="🏢" title="근로복지공단 체당금 신청" desc="도산대지급금 온라인 접수" href="https://www.comwel.or.kr" />
          </ResultPass>
        )}
        {result === "rehabilitation_over" && (
          <ResultFail title="2년 기한이 지났지만 회생채권은 별도예요">
            <P>대지급금 2년 기한이 지났어도 회생채권 신고 기한이 남아있을 수 있어요. 법원 회생절차 담당 관재인에게 채권 신고 가능 여부를 즉시 문의하세요.</P>
          </ResultFail>
        )}
        {result === "defacto_within" && (
          <ResultFail title="도산등사실인정을 먼저 받아야 해요">
            <P>법원 절차 없이 폐업한 경우엔 고용노동부에서 도산등사실인정을 받아야 해요. 인정서 발급 후 근로복지공단에 대지급금을 신청해요. 폐업 후 2년 내에 인정 신청과 대지급금 신청 모두 완료해야 해요.</P>
            <ResultCTA icon="📋" title="도산등사실인정 신청 방법" desc="고용노동부 인정 절차 확인" href="/w/도산등사실인정-신청-방법-서류" />
          </ResultFail>
        )}
        {result === "defacto_over" && (
          <ResultFail title="도산등사실인정 + 대지급금 모두 기한 문제가 있어요">
            <P>폐업 후 2년이 지났다면 도산등사실인정과 대지급금 신청 모두 어려울 수 있어요. 임금채권 소멸시효(3년)가 남아있으면 민사소송으로 청구하는 방법을 검토하세요.</P>
          </ResultFail>
        )}
        {!result && (
          <ResultFail title="도산 유형을 선택해 주세요">
            <P>도산 유형과 경과 기간을 선택하면 대지급금 신청 방법을 안내해 드려요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="법원 파산 없이 회사만 폐업했다면?"
        a="도산등사실인정을 먼저 받아야 해요. 고용노동부 관할 지청에 신청하면 돼요."
        label="도산등사실인정 신청 방법"
        href="/w/도산등사실인정-신청-방법-서류"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="재판상 도산이 뭐예요?" sub="파산 선고 · 회생절차 개시 결정 차이" />
      <P>법원이 공식적으로 선고하는 도산이에요. 고용노동부 인정(사실상 도산)과 구분되는 법적 절차예요. <A href="https://www.law.go.kr/법령/임금채권보장법">임금채권보장법</A>에서 재판상 도산은 파산 선고, 회생절차 개시 결정 등을 포함해요.</P>
      <P>재판상 도산에는 두 가지 유형이 있어요. 파산은 회사를 완전히 청산하는 절차예요. 회생(법정관리)은 회사를 살리면서 부채를 조정하는 절차예요. 두 경우 모두 법원 결정이 내려지면 도산대지급금 신청 요건이 충족돼요.</P>
      <P>재판상 도산 시 별도로 도산등사실인정을 받을 필요가 없어요. 파산 선고문이나 회생절차 개시 결정문이 곧 도산 확인 서류예요. 고용노동부 신청 없이 바로 근로복지공단에 신청하면 돼요.</P>
      <P>재판상 도산은 법원 인터넷 등기소에서 확인할 수 있어요. 파산 선고나 회생절차 개시 결정이 공고되기 때문에 사업주가 알려주지 않아도 확인 가능해요. 인터넷 등기소에서 법인명으로 검색하면 돼요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="파산과 회생절차 차이가 뭐예요?" sub="회사 존속 여부 · 근로자 임금 처리" />
      <P>회사의 존속 여부가 핵심 차이예요. 파산은 회사가 소멸하고, 회생은 구조조정 후 존속해요. 근로자 입장에서 임금 처리 방식도 달라요.</P>

      <TableTitle>파산 vs 회생절차 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><TH>파산</TH><TH>회생절차</TH></tr>
          </thead>
          <tbody>
            {[
              ["회사 운명", "완전히 소멸", "구조조정 후 존속"],
              ["절차 주체", "파산관재인", "회생관리인(기존 경영진 또는 외부)"],
              ["임금채권 처리", "파산 배당 (최우선 변제)", "회생채권 신고 후 분할상환 가능"],
              ["대지급금 신청 근거", "파산 선고문", "회생절차 개시 결정문"],
              ["추가 청구 방법", "파산 배당 신청", "회생채권 신고"],
              ["고용 지속 여부", "종료", "회생 성공 시 유지 가능"],
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

      <P>파산 절차예요. 법원이 파산을 선고하면 파산관재인이 회사 자산을 처분해서 채권자에게 배당해요. 근로자는 임금채권자로 파산 배당 신청을 할 수 있어요. 최우선변제 임금채권은 담보권자보다 먼저 배당받아요.</P>
      <P>회생절차예요. 회생절차 개시 결정 후 관리인이 회생계획을 수립해요. 법원 인가를 받으면 채권자들이 원금 일부 탕감, 분할상환 등을 받는 조건으로 회사가 살아남아요. 근로자는 회생채권 신고를 해야 해요.</P>

      <Info type="warn">회생절차에서 회생채권 신고 기한(통상 결정 후 1~2개월)을 놓치지 않도록 주의해야 해요. 신고 기한을 놓치면 채권 회수가 어려워질 수 있어요.</Info>

      <RelatedMid
        title="도산 유형별 관련 정보"
        items={[
          { icon: "💰", title: "도산대지급금 신청 방법", desc: "2년 기한과 필요 서류 목록", href: "/w/도산대지급금-신청-방법-절차" },
          { icon: "📋", title: "도산등사실인정 신청 방법", desc: "사실상 도산 고용노동부 절차", href: "/w/도산등사실인정-신청-방법-서류" },
          { icon: "🏢", title: "도산대지급금 상한액 계산", desc: "연령별 최대 2,100만원 기준", href: "/w/도산대지급금-상한액-지급액-계산" },
        ]}
        hubHref="/category/임금"
        hubLabel="임금체불 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="재판상 도산 대지급금 어떻게 신청하나요?" sub="파산 선고문 · 회생결정문 신청 방법" />
      <P>법원 결정 후 근로복지공단에 신청해요. 도산등사실인정 절차와 달리 고용노동부 인정 없이 바로 공단 신청이 가능해요. 파산과 회생 각각 방법이 있어요.</P>
      <P>파산의 경우예요. 법원의 파산 선고문을 준비해요. 파산 선고일로부터 2년 이내에 근로복지공단에 체당금 신청서를 제출해요. 파산 배당 신청도 병행해서 대지급금 한도 초과분을 추가 회수하세요.</P>
      <P>회생절차의 경우예요. 회생절차 개시 결정문을 준비해요. 결정일로부터 2년 이내에 근로복지공단에 신청해요. 동시에 법원 회생채권 신고 기한(통상 1~2개월)을 놓치지 않도록 주의해야 해요.</P>
      <P>대지급금 신청과 파산·회생 절차 참여는 동시에 진행하는 게 좋아요. 대지급금 한도(최대 2,100만원)를 빠르게 받고, 초과분은 배당·회생 절차에서 청구하면 돼요. 두 경로가 경쟁 관계가 아니라 보완 관계예요.</P>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="재판상 도산 vs 사실상 도산 어떻게 달라요?" sub="법원 관여 여부 · 대지급금 한도 비교" />
      <P>법원 관여 여부가 차이예요. 근로자가 받는 혜택의 범위도 달라요. 하지만 대지급금 한도는 동일해요.</P>
      <P>재판상 도산은 법원이 개입해서 처리 절차가 공식적이에요. 파산관재인 또는 회생관리인이 선임돼요. 파산 배당이나 회생 절차에서 근로자 채권이 공식적으로 정리돼요. 단, 법원 파산 신청을 하지 않는 회사도 많아요.</P>
      <P>사실상 도산은 법원 절차 없이 사업이 사실상 중단된 경우예요. 고용노동부에 도산등사실인정을 신청해서 인정받아야 해요. 파산 배당 절차가 없기 때문에 대지급금 한도(최대 2,100만원) 초과분 회수가 어려워요.</P>
      <P>두 방법의 대지급금 한도는 동일해요. 재판상 도산이든 사실상 도산이든 도산대지급금 상한은 연령에 따라 최대 2,100만원이에요. 차이는 한도 초과분을 파산 배당으로 회수할 수 있느냐 없느냐예요.</P>

      <BridgeCard
        q="도산대지급금 신청 절차를 단계별로 알고 싶다면?"
        a="파산 선고문 준비부터 근로복지공단 신청까지 단계별로 알려드려요. 2년 기한과 필요 서류를 확인하세요."
        label="도산대지급금 신청 방법"
        href="/w/도산대지급금-신청-방법-절차"
      />

      <ExtBtn
        badge="근로복지공단 공식"
        text="도산 체당금 신청"
        cta="신청하기 →"
        href="https://www.comwel.or.kr"
      />

      <Divider />

      <FAQAccordion items={meta.faq.map(f => ({ q: f.q, a: f.a }))} />

      <RelatedArticles items={[
        { title: "도산대지급금 신청 방법 절차", desc: "2년 기한과 필요 서류 목록", href: "/w/도산대지급금-신청-방법-절차" },
        { title: "도산대지급금 상한액 계산", desc: "연령별 최대 2,100만원 기준", href: "/w/도산대지급금-상한액-지급액-계산" },
        { title: "도산등사실인정 신청 방법 서류", desc: "고용노동부 인정 절차와 서류", href: "/w/도산등사실인정-신청-방법-서류" },
        { title: "도산등사실인정 사업 폐지 조건", desc: "영업양도와 사실상 도산 차이", href: "/w/도산등사실인정-사업-폐지-영업양도" },
        { title: "대지급금 임금채권 우선변제 차이", desc: "대위권 변제 순위 구조", href: "/w/대지급금-임금채권-우선변제-차이" },
      ]} />
      <PrevNext
        prev={{ title: "도산등사실인정 신청 방법 서류", href: "/w/도산등사실인정-신청-방법-서류" }}
        next={{ title: "2026년 실업급여 상한액 하한액", href: "/w/2026년-실업급여" }}
      />
    </BlogLayout>
  );
}
