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
  Steps,
} from "@/components/wiki/BlogShared";

type ResLink = { icon: string; title: string; desc: string; href: string };

const meta = {
  title: "도산등사실인정 신청 방법 서류 | 고용노동부 처리 기간",
  description: "도산등사실인정 신청은 고용노동부에서 한다는 거 아시나요? 신청 방법부터 필요 서류까지 절차를 알려드려요.",
  category: "임금·퇴직금",
  keywords: [
    "도산등사실인정 고용노동부 지청 신청 방법",
    "도산등사실인정 신청 절차 현장 조사 단계",
    "도산등사실인정 폐업 증빙 임금체불 서류",
    "도산등사실인정 심사 기간 인정서 처리",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-22",
  datePublished: "2026-02-22",
  summary: [
    "도산등사실인정 신청은 사업장 소재지 관할 고용노동부 지청에서 접수해요.",
    "폐업 증빙, 임금 지급 불능 증빙, 재직 기간 확인 서류가 필요해요.",
    "심사 기간은 통상 2~6주이며 인정 후 근로복지공단에서 대지급금을 신청해요.",
  ],
  sources: [
    { name: "임금채권보장법 도산등사실인정 절차", url: "https://www.law.go.kr/법령/임금채권보장법", date: "2026-02" },
    { name: "고용노동부 도산등사실인정 신청 안내", url: "https://www.moel.go.kr", date: "2026-02" },
  ],
  faq: [
    { q: "도산등사실인정 신청을 근로자가 직접 해도 되나요?", a: "네, 근로자가 직접 신청할 수 있어요. 사업주 협조 없이도 신청 가능해요. 고용노동부 관할 지청에 신청서와 증빙 서류를 제출하면 근로감독관이 현장 조사 등을 거쳐 심사해요." },
    { q: "도산등사실인정 심사가 기각되면 어떻게 하나요?", a: "기각 통보를 받은 날로부터 90일 이내에 이의신청을 할 수 있어요. 기각 사유를 확인하고 보완 서류를 갖춰 재신청하는 방법도 있어요. 증거 부족이라면 추가 서류를 제출해서 재심사를 요청할 수 있어요." },
  ],
  ctaCard: {
    label: "신청 접수",
    mainText: "도산등사실인정 고용노동부 신청",
    subText: "사업장 소재지 관할 지청 방문",
    url: "https://www.moel.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "도산등사실인정 사업주 요건", url: "/w/도산등사실인정-사업주-요건-회사-규모" },
    { title: "도산대지급금 신청 방법", url: "/w/도산대지급금-신청-방법-절차" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { closure, inability } = sel;
    if (!closure || !inability) return null;
    if (closure === "official" && inability === "yes") return "official_yes";
    if (closure === "official" && inability === "no") return "official_no";
    if (closure === "actual" && inability === "yes") return "actual_yes";
    if (closure === "actual" && inability === "no") return "actual_no";
    if (closure === "unclear" && inability === "yes") return "unclear_yes";
    if (closure === "unclear" && inability === "no") return "unclear_no";
    return null;
  }

  const result = getResult();

  const links: ResLink[] = [
    { icon: "📋", title: "고용노동부 관할 지청 신청", desc: "지청 방문 접수 및 온라인 신청 방법", href: "https://www.moel.go.kr" },
    { icon: "💰", title: "도산대지급금 신청 다음 단계", desc: "인정서 받은 후 근로복지공단 2년 기한", href: "/w/도산대지급금-신청-방법-절차" },
  ];

  const toc = [
    { t: "STEP 01 신청 준비 점검" },
    { t: "신청은 어디에 하나요?", sub: "고용노동부 지청 · 관할 확인 방법" },
    { t: "신청 절차 어떻게 되나요?", sub: "신청서 → 현장 조사 → 심사 → 인정서 발급" },
    { t: "도산등사실인정 신청 필요 서류 뭐가 있나요?", sub: "폐업 증빙 · 임금체불 증빙 서류 목록" },
    { t: "도산등사실인정 신청 심사 기간은 얼마나 걸리나요?", sub: "처리 기간 2~6주 · 빠른 처리 방법" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "임금·퇴직금", "도산등사실인정"]}
      tags={["2026년 최신", "도산등사실인정", "임금체불", "고용노동부"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>고용노동부 관할 지청에 신청하면 돼요. <strong>근로자가 직접 신청</strong>할 수 있고, 사업주 협조는 필요 없어요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법", date: "2026.02" }}
      stickyLabel="신청 장소"
      stickyValue="고용노동부 지청"
      stickyBtn="신청하기"
      disclaimer="이 글은 임금채권보장법과 고용노동부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📋", title: "도산등사실인정 사업주 요건", sub: "6개월 이상 산재보험 기준", href: "/w/도산등사실인정-사업주-요건-회사-규모" },
          { icon: "💰", title: "도산대지급금 신청 절차", sub: "2년 기한 필요 서류", href: "/w/도산대지급금-신청-방법-절차", hot: true },
          { icon: "🏢", title: "도산대지급금 상한액", sub: "연령별 최대 2,100만원", href: "/w/도산대지급금-상한액-지급액-계산" },
        ]} />
        <SidebarDocs items={[
          { title: "도산등사실인정 사업주 요건", cat: "임금·퇴직금·체당금", href: "/w/도산등사실인정-사업주-요건-회사-규모" },
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
      <Sec n="STEP 01" id="checker" title="신청 준비 점검" sub="폐업 증빙 · 임금 지급 불능 증빙 여부" />
      <P>도산등사실인정 신청에는 폐업 증빙과 임금 지급 불능 증빙이 필요해요. 서류 준비 상태를 선택하면 신청 단계를 알려드려요.</P>

      <CheckerShell title="도산등사실인정 신청 준비가 됐나요?" sub="30초 확인">
        <CheckerQ n="1" label="사업 폐지 증빙 서류가 있나요?" group="closure" opts={[
          ["official", "폐업신고서, 사업자등록 말소 등 공식 증빙이 있어요"],
          ["actual", "공식 서류는 없지만 실제로 문 닫은 증거가 있어요"],
          ["unclear", "폐업 여부 자체가 불분명해요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="임금 지급 불능 증빙이 있나요?" group="inability" opts={[
          ["yes", "통장 잔액 부족, 재산 없음 등 증빙이 있어요"],
          ["no", "공식 증빙은 없지만 임금을 못 주는 상태예요"],
        ]} sel={sel} pick={pick} />

        {result === "official_yes" && (
          <ResultPass title="서류가 갖춰졌어요. 바로 신청하세요">
            <P>폐업 증빙과 지급 불능 증빙이 모두 있다면 바로 신청 가능해요. 관할 고용노동부 지청에 방문해서 도산등사실인정 신청서를 제출하세요. 준비된 서류를 함께 제출하면 심사가 빨라져요.</P>
            {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
          </ResultPass>
        )}
        {result === "official_no" && (
          <ResultFail title="지급 불능 증빙을 추가 준비해야 해요">
            <P>폐업 증빙은 있지만 지급 불능 증거가 부족해요. 사업주 통장 잔액 부족 확인서, 재산세 납부 기록(재산 없음), 채권자 목록 등을 추가 준비해서 신청하면 인정 가능성이 높아요. 고용노동부 담당자에게 서류 종류를 문의하세요.</P>
            <ResultCTA icon="📞" title="고용노동부 1350 상담" desc="지급 불능 증빙 방법 문의" href="https://www.moel.go.kr" />
          </ResultFail>
        )}
        {result === "actual_yes" && (
          <ResultPass title="현장 증거로도 신청 가능해요">
            <P>공식 폐업 서류는 없어도 사업장이 비어있다는 현장 사진, 직원 전원 해고 사실, 마지막 영업일 증빙으로 신청할 수 있어요. 근로감독관이 현장 확인을 나올 수 있어요. 지급 불능 증빙도 함께 제출하면 더 좋아요.</P>
            <ResultCTA icon="📋" title="고용노동부 관할 지청 신청" desc="폐업 증빙 방법 문의 후 접수" href="https://www.moel.go.kr" />
          </ResultPass>
        )}
        {result === "actual_no" && (
          <ResultFail title="지급 불능 증빙 보완이 필요해요">
            <P>현장 증거는 있지만 지급 불능 증빙이 없어요. 사업주의 재산 현황을 파악하고, 임금 지급 능력이 없다는 정황 증거를 최대한 모아야 해요. 고용노동부에 먼저 전화(1350) 상담을 받고 진행하세요.</P>
          </ResultFail>
        )}
        {result === "unclear_yes" && (
          <ResultFail title="폐업 증빙을 먼저 확인해야 해요">
            <P>폐업 여부가 불분명하다면 먼저 사업장 현황을 확인해야 해요. 사업자등록 현황(사업자등록 말소 여부), 건강보험 직장 가입 현황 등으로 폐업 여부를 확인할 수 있어요. 고용노동부(1350)에 상황을 설명하고 다음 단계를 안내받으세요.</P>
          </ResultFail>
        )}
        {result === "unclear_no" && (
          <ResultFail title="폐업 증빙과 지급 불능 증빙 모두 필요해요">
            <P>폐업 여부도 불분명하고 지급 불능 증빙도 없다면 먼저 고용노동부(1350)에 전화 상담을 받으세요. 어떤 서류가 필요한지, 현장 조사가 가능한지 안내받을 수 있어요. 서류를 최대한 갖춘 후 신청하는 게 좋아요.</P>
          </ResultFail>
        )}
        {!result && (
          <ResultFail title="폐업 증빙 여부를 선택해 주세요">
            <P>폐업 증빙과 지급 불능 여부를 선택하면 신청 단계를 안내해 드려요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="도산등사실인정 요건(6개월·산재보험)이 맞는지 먼저 확인하세요"
        a="요건이 충족되어야 신청이 가능해요. 6개월 미만이거나 산재보험 미적용이면 인정받기 어려워요."
        label="도산등사실인정 사업주 요건"
        href="/w/도산등사실인정-사업주-요건-회사-규모"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="신청은 어디에 하나요?" sub="고용노동부 지청 · 관할 확인 방법" />
      <P><A href="https://www.law.go.kr/법령/임금채권보장법">임금채권보장법</A>에 따라 사업장 소재지 관할 고용노동부 지방고용노동청 또는 지청에 신청해요. 근로복지공단이 아니에요. 도산등사실인정은 고용노동부가, 대지급금은 근로복지공단이 담당해요.</P>
      <P>사업장이 있던 지역 관할 지청에 방문해서 신청서를 제출해요. 고용노동부 홈페이지(moel.go.kr)에서 관할 지청을 찾을 수 있어요. 관할 지청이 헷갈리면 대표번호 1350에 전화해서 담당 부서를 안내받으세요.</P>
      <P>온라인 접수는 현재 제한적이에요. 고용24나 고용노동부 민원포털에서 일부 접수가 가능하지만, 서류를 직접 제출해야 하는 경우가 많아서 방문 또는 우편 접수가 현실적이에요.</P>
      <P>사업주가 도주하거나 소재 불명인 경우에도 근로자가 단독으로 신청할 수 있어요. 사업주 없이 근로감독관이 자체 조사해서 인정 여부를 결정해요. 사업주 협조를 기다릴 필요가 없어요.</P>

      <InlineLink
        icon="🏢"
        title="도산등사실인정 사업 폐지 조건 — 영업양도 차이"
        desc="사업 폐지와 영업양도 시 임금채권 처리 방식 비교"
        href="/w/도산등사실인정-사업-폐지-영업양도"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="신청 절차는 어떻게 되나요?" sub="신청서 → 현장 조사 → 심사 → 인정서 발급" />
      <P>신청서 제출 → 현장 조사 → 심사 → 인정서 발급 순서예요. 각 단계에서 필요한 서류와 확인 사항이 달라요.</P>
      <Steps items={[
        { title: "신청서 작성 및 제출", desc: "고용노동부 지청에서 도산등사실인정 신청서를 받아서 작성해요. 신청인 정보, 사업장 정보, 체불 임금 내역, 사업 폐지 사유 등을 기재해요." },
        { title: "서류 제출", desc: "신청서와 함께 폐업 증빙 서류, 재직 기간 증빙, 체불 사실 증빙을 함께 제출해요. 서류가 부족하면 보완 요청이 와요." },
        { title: "현장 조사", desc: "근로감독관이 사업장을 방문해서 실제 폐업 여부, 재산 현황 등을 확인해요. 관련자 진술을 청취하기도 해요." },
        { title: "인정서 발급", desc: "심사 통과 후 도산등사실인정서가 발급돼요. 이 인정서를 가지고 근로복지공단에 도산대지급금을 신청해요." },
      ]} />
      <Info type="warn">인정서 발급일로부터 2년 이내에 근로복지공단에 대지급금을 신청해야 해요. 인정서를 받은 즉시 공단 신청을 진행하세요.</Info>

      <RelatedMid
        title="도산등사실인정 관련 정보"
        items={[
          { icon: "🏢", title: "도산등사실인정 사업주 요건", desc: "6개월 이상 산재보험 적용 기준", href: "/w/도산등사실인정-사업주-요건-회사-규모" },
          { icon: "🔄", title: "도산등사실인정 사업 폐지 조건", desc: "영업양도와 사실상 도산 차이", href: "/w/도산등사실인정-사업-폐지-영업양도" },
          { icon: "💰", title: "도산대지급금 신청 절차", desc: "2년 기한과 필요 서류 목록", href: "/w/도산대지급금-신청-방법-절차" },
        ]}
        hubHref="/category/임금"
        hubLabel="임금체불 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="도산등사실인정 신청 필요 서류는 뭐가 있나요?" sub="폐업 증빙 · 임금체불 증빙 서류 목록" />
      <P>폐업 관련 서류와 체불 증빙 두 가지 종류예요. 서류가 많을수록 심사가 빠르고 인정 가능성이 높아요. 없는 서류는 대체 자료로 보완할 수 있어요.</P>

      <TableTitle>도산등사실인정 필요 서류</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>서류 종류</THL><TH>대표 서류</TH><TH>대체 가능 서류</TH></tr>
          </thead>
          <tbody>
            {[
              ["폐업 관련", "폐업신고서, 사업자등록 말소 확인서", "임대차 계약 해지, 전기·가스 해지 내역"],
              ["지급 불능 관련", "통장 잔액 부족 내역, 채무 현황 확인서", "사업장 자산 현황, 압류 내역"],
              ["재직 증빙", "근로계약서, 급여명세서", "4대 보험 가입 확인서, 출퇴근 기록"],
              ["체불 증빙", "통장 거래 내역(임금 수령 기록)", "문자·카톡 내역, 동료 증언"],
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
      <TableNote>서류가 없으면 고용노동부 담당자에게 대체 방법을 문의하세요. 현장 조사로 보완 가능한 경우도 있어요.</TableNote>

      <P>폐업신고서나 사업자등록증 말소 확인서가 없어도 사업장이 비어있다는 현장 사진, 직원 전원 해고 사실, 마지막 영업일 증빙 등으로 대체할 수 있어요.</P>
      <P>임금 지급 불능 증빙은 사업주 통장 잔액 부족 내역이 가장 직접적이에요. 없다면 사업장 자산 현황이나 채무 현황 등 간접 증거를 제출하면 돼요.</P>

      <InlineLink
        icon="💰"
        title="도산대지급금 상한액 계산 — 연령별 최대 2,100만원"
        desc="인정서 받은 후 공단 신청 시 받을 수 있는 금액 기준"
        href="/w/도산대지급금-상한액-지급액-계산"
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="도산등사실인정 신청 심사 기간은 얼마나 걸리나요?" sub="처리 기간 2~6주 · 빠른 처리 방법" />
      <P>보통 2~6주예요. 서류 보완이 필요하거나 현장 조사가 복잡하면 더 걸릴 수 있어요. 처리 기간은 사건마다 달라요.</P>
      <P>서류가 완비됐고 폐업 사실이 명확한 경우엔 2~3주 안에 처리돼요. 사업주 소재 확인, 재산 조사 등이 필요한 복잡한 사건은 4~6주 또는 그 이상 걸릴 수 있어요. 현장 조사 일정에 따라서도 달라져요.</P>
      <P>급하게 처리가 필요한 경우엔 담당 근로감독관에게 사정을 설명해보세요. 생계 위기 상황이라면 우선 처리 요청을 할 수 있어요. 서류를 완비해서 제출하면 보완 요청 없이 빠르게 진행될 수 있어요.</P>
      <P>인정서 발급 후 즉시 근로복지공단에 도산대지급금을 신청하세요. 인정서 발급일로부터 2년 이내에 공단 신청을 해야 해요. 시간을 낭비하지 않는 게 중요해요.</P>

      <BridgeCard
        q="도산등사실인정서 받았으면 다음이 도산대지급금 신청이에요"
        a="근로복지공단에서 처리하는 도산대지급금 신청 절차와 2년 기한을 알려드려요."
        label="도산대지급금 신청 방법"
        href="/w/도산대지급금-신청-방법-절차"
      />

      <SpokeLink num={1} title="도산등사실인정 사업 폐지 조건" desc="영업양도와 사실상 도산 차이 비교" href="/w/도산등사실인정-사업-폐지-영업양도" />
      <SpokeLink num={2} title="도산대지급금 신청 방법 절차" desc="인정서 발급 후 공단 2년 기한 절차" href="/w/도산대지급금-신청-방법-절차" />

      <ExtBtn
        badge="고용노동부 공식"
        text="도산등사실인정 신청"
        cta="신청하기 →"
        href="https://www.moel.go.kr"
      />

      <Divider />

      <FAQAccordion items={meta.faq.map(f => ({ q: f.q, a: f.a }))} />

      <RelatedArticles items={[
        { title: "도산등사실인정 사업주 요건", desc: "6개월 이상 산재보험 적용 기준", href: "/w/도산등사실인정-사업주-요건-회사-규모" },
        { title: "도산등사실인정 사업 폐지 조건", desc: "영업양도와 사실상 도산 차이", href: "/w/도산등사실인정-사업-폐지-영업양도" },
        { title: "도산대지급금 신청 방법 절차", desc: "2년 기한과 필요 서류 목록", href: "/w/도산대지급금-신청-방법-절차" },
        { title: "도산대지급금 상한액 계산", desc: "연령별 최대 2,100만원 기준", href: "/w/도산대지급금-상한액-지급액-계산" },
        { title: "재판상 도산 파산 회생절차 비교", desc: "파산 vs 회생 대지급금 신청 차이", href: "/w/재판상-도산-파산-회생절차-대지급금" },
      ]} />
      <PrevNext
        prev={{ title: "도산등사실인정 사업주 요건", href: "/w/도산등사실인정-사업주-요건-회사-규모" }}
        next={{ title: "재판상 도산 파산 회생절차 비교", href: "/w/재판상-도산-파산-회생절차-대지급금" }}
      />
    </BlogLayout>
  );
}
