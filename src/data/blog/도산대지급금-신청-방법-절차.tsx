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
  title: "도산대지급금 신청 방법 | 2년 기한 필요 서류",
  description: "회사가 도산해서 임금을 못 받으셨나요? 도산대지급금은 2년 안에 신청해야 해요. 근로복지공단 신청 방법과 필요 서류를 알려드려요.",
  category: "임금·퇴직금",
  keywords: [
    "도산대지급금 신청 2년 기한 계산",
    "도산대지급금 근로복지공단 신청 절차",
    "도산대지급금 필요 서류 목록",
    "도산대지급금 기한 초과 임금채권 소멸",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-22",
  datePublished: "2026-02-22",
  summary: [
    "도산대지급금은 도산 확인 후 2년 이내에 근로복지공단에 신청해야 해요.",
    "파산 선고문 또는 도산등사실인정서, 체불 임금 증빙 서류가 기본 서류예요.",
    "2년 기한이 임박하면 서류 미완성이어도 신청서를 먼저 제출하는 게 좋아요.",
  ],
  sources: [
    { name: "임금채권보장법 체당금 신청 규정", url: "https://www.law.go.kr/법령/임금채권보장법", date: "2026-02" },
    { name: "근로복지공단 체당금 신청 안내", url: "https://www.comwel.or.kr/comwel/wlf/dgw/dgwClmHm.jsp", date: "2026-02" },
  ],
  faq: [
    { q: "도산대지급금 신청 2년 기한이 지나면 어떻게 하나요?", a: "2년 기한이 지나면 도산대지급금을 신청할 수 없어요. 다만 임금채권 소멸시효(3년)가 남아있다면 파산 배당 신청이나 민사소송으로 청구할 수 있어요. 기한이 임박했다면 서류를 갖추지 못했어도 일단 신청서를 먼저 제출하는 게 좋아요." },
    { q: "도산대지급금 신청 시 사업주 확인이 필요한가요?", a: "사업주 협조 없이 신청할 수 있어요. 법원 파산관재인이나 고용노동부 확인을 기반으로 처리돼요. 사업주가 도주하거나 소재불명이어도 신청에 지장이 없어요." },
  ],
  ctaCard: {
    label: "기한 확인",
    mainText: "도산대지급금 신청 기한",
    subText: "도산 확인 후 2년 이내",
    url: "https://www.comwel.or.kr/comwel/wlf/dgw/dgwClmHm.jsp",
    external: true,
  },
  relatedDocs: [
    { title: "도산대지급금 상한액 지급액 계산", url: "/w/도산대지급금-상한액-지급액-계산" },
    { title: "도산등사실인정 신청 방법 서류", url: "/w/도산등사실인정-신청-방법-서류" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { confirm, period } = sel;
    if (!confirm || !period) return null;
    if (confirm === "bankruptcy" && period === "within") return "bankruptcy_within";
    if (confirm === "bankruptcy" && period === "exceed") return "bankruptcy_exceed";
    if (confirm === "defacto" && period === "within") return "defacto_within";
    if (confirm === "defacto" && period === "exceed") return "defacto_exceed";
    if (confirm === "pending" && period === "within") return "pending_within";
    if (confirm === "pending" && period === "exceed") return "pending_exceed";
    return null;
  }

  const result = getResult();

  const links: ResLink[] = [
    { icon: "🏢", title: "근로복지공단 체당금 신청", desc: "도산대지급금 온라인 접수", href: "https://www.comwel.or.kr/comwel/wlf/dgw/dgwClmHm.jsp" },
    { icon: "📋", title: "도산등사실인정 신청 방법", desc: "고용노동부 인정 절차와 서류 안내", href: "/w/도산등사실인정-신청-방법-서류" },
  ];

  const toc = [
    { t: "STEP 01 신청 준비 점검" },
    { t: "신청 기한 언제까지예요?", sub: "도산 확인 기산점 · 2년 계산법" },
    { t: "신청 절차 어떻게 되나요?", sub: "도산 확인 → 공단 신청 → 심사 → 지급" },
    { t: "도산대지급금 신청 필요 서류 뭐가 있나요?", sub: "도산 확인 서류 · 체불 증빙 서류 목록" },
    { t: "도산대지급금 신청 기한 초과 시 어떻게 하나요?", sub: "임금채권 소멸시효 · 파산 배당 청구" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "임금·퇴직금", "도산대지급금"]}
      tags={["2026년 최신", "도산대지급금", "임금체불", "근로복지공단"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>회사가 도산해서 임금을 못 받았다면 <strong>도산대지급금</strong>을 신청하세요. 도산 확인 후 <strong>2년 이내</strong>에 근로복지공단에 신청해야 해요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법", date: "2026.02" }}
      stickyLabel="신청 기한"
      stickyValue="도산 확인 후 2년"
      stickyBtn="신청하기"
      disclaimer="이 글은 임금채권보장법과 근로복지공단 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💰", title: "도산대지급금 상한액", sub: "연령별 최대 2,100만원", href: "/w/도산대지급금-상한액-지급액-계산", hot: true },
          { icon: "📋", title: "도산등사실인정 신청", sub: "고용노동부 인정 절차", href: "/w/도산등사실인정-신청-방법-서류" },
          { icon: "⚖️", title: "대지급금 불복 절차", sub: "이의신청·심사청구", href: "/w/대지급금-불복-구제-절차-공인노무사-비용" },
        ]} />
        <SidebarDocs items={[
          { title: "도산대지급금 상한액 계산", cat: "임금·퇴직금·체당금", href: "/w/도산대지급금-상한액-지급액-계산" },
          { title: "도산등사실인정 사업주 요건", cat: "임금·퇴직금·체당금", href: "/w/도산등사실인정-사업주-요건-회사-규모" },
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
      <Sec n="STEP 01" id="checker" title="신청 준비 점검" sub="도산 확인 여부 · 2년 기한 내 여부" />
      <P>도산대지급금을 신청하려면 두 가지가 필요해요. 도산 확인(파산 선고 또는 도산등사실인정)이 됐는지, 그리고 2년 기한 안에 있는지예요. 아래에서 현재 상황을 선택하면 다음 단계를 알려드려요.</P>

      <CheckerShell title="도산대지급금 신청 준비가 됐나요?" sub="30초 확인">
        <CheckerQ n="1" label="도산 확인이 어떻게 됐나요?" group="confirm" opts={[
          ["bankruptcy", "법원에서 파산·회생 선고를 받았어요"],
          ["defacto", "고용노동부 도산등사실인정서를 받았어요"],
          ["pending", "아직 도산 확인 신청 중이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="도산 확인 후 얼마나 지났나요?" group="period" opts={[
          ["within", "2년이 안 됐어요"],
          ["exceed", "2년이 지났어요"],
        ]} sel={sel} pick={pick} />

        {result === "bankruptcy_within" && (
          <ResultPass title="파산·회생 선고문으로 바로 신청 가능해요">
            <P>법원 파산 선고문 또는 회생절차 개시 결정문을 가지고 근로복지공단에 바로 신청할 수 있어요. 체불 임금·퇴직금 관련 서류를 함께 준비해서 공단 지사에 방문하거나 온라인으로 제출하세요.</P>
            {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
          </ResultPass>
        )}
        {result === "bankruptcy_exceed" && (
          <ResultFail title="2년 기한이 지나 신청이 어려워요">
            <P>파산 선고일로부터 2년이 지나면 도산대지급금 신청 기한이 소멸해요. 임금채권 소멸시효(3년)가 남아있다면 파산 배당 신청으로 직접 청구할 수 있어요. 파산관재인에게 채권 신고를 하세요.</P>
          </ResultFail>
        )}
        {result === "defacto_within" && (
          <ResultPass title="도산등사실인정서로 바로 신청 가능해요">
            <P>고용노동부 도산등사실인정서를 받았다면 근로복지공단에 도산대지급금을 신청할 수 있어요. 인정서 발급일로부터 2년 이내예요. 체불 임금 서류를 함께 제출하세요.</P>
            <ResultCTA icon="🏢" title="근로복지공단 체당금 신청" desc="도산대지급금 온라인 접수" href="https://www.comwel.or.kr/comwel/wlf/dgw/dgwClmHm.jsp" />
          </ResultPass>
        )}
        {result === "defacto_exceed" && (
          <ResultFail title="2년 기한이 지나 신청이 어려워요">
            <P>도산등사실인정서 발급일로부터 2년이 지났다면 도산대지급금 신청 기한이 소멸해요. 임금채권 소멸시효(3년)가 남아있다면 민사소송으로 청구하는 방법을 검토해야 해요.</P>
          </ResultFail>
        )}
        {result === "pending_within" && (
          <ResultFail title="도산 확인을 먼저 완료해야 해요">
            <P>도산대지급금 신청 전에 도산 확인이 필요해요. 법원 파산·회생 절차 중이면 선고문을 기다리세요. 법원 절차 없이 회사만 폐업했다면 고용노동부에 도산등사실인정 신청을 하세요.</P>
            <ResultCTA icon="📋" title="도산등사실인정 신청 방법" desc="고용노동부 인정 절차 확인" href="/w/도산등사실인정-신청-방법-서류" />
          </ResultFail>
        )}
        {result === "pending_exceed" && (
          <ResultFail title="도산 확인 + 기한 문제가 겹쳐요">
            <P>도산 확인도 안 됐고 시간도 지났다면 복잡한 상황이에요. 임금채권 소멸시효(3년)가 남아있으면 도산등사실인정 신청을 서두르세요. 고용노동부(1350)에 즉시 연락해서 가능한 방법을 확인하세요.</P>
          </ResultFail>
        )}
        {!result && (
          <ResultFail title="도산 확인 여부를 선택해 주세요">
            <P>도산 확인 여부와 경과 기간을 선택하면 신청 단계를 안내해 드려요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="법원 도산 절차 없이 회사만 폐업했다면?"
        a="고용노동부 도산등사실인정 신청이 필요해요. 인정서를 받은 뒤 근로복지공단에 대지급금을 신청해요."
        label="도산등사실인정 신청 방법"
        href="/w/도산등사실인정-신청-방법-서류"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="신청 기한은 언제까지예요?" sub="도산 확인 기산점 · 2년 계산법" />
      <P><A href="https://www.law.go.kr/법령/임금채권보장법">임금채권보장법</A>에 따라 도산 확인 후 2년 이내가 신청 기한이에요. 이 기한은 엄격하게 적용되고 예외가 거의 없어요. 기한이 지나면 신청 자격 자체가 소멸해요.</P>
      <P>도산 확인 기산점은 두 가지예요. 법원 파산 선고나 회생절차 개시 결정이 있으면 그 날짜부터예요. 고용노동부 도산등사실인정이라면 인정서 발급일부터예요. 회사가 실제 폐업한 날이 아닌, 공식 도산 확인일이 기준이에요.</P>
      <P>늦게 알았더라도 도산 확인 후 2년 이내면 신청 가능해요. 회사가 3년 전 폐업했더라도 도산등사실인정서를 최근 받았다면 그 발급일부터 2년이 있어요. 도산등사실인정 신청을 서두르는 게 중요한 이유가 여기 있어요.</P>
      <P>기한이 임박했다면 서류가 완벽하지 않아도 신청서를 먼저 제출하세요. 서류 미비로 반려되더라도 신청 사실 자체가 기한 내 기록으로 남을 수 있어요. 근로복지공단에 사전 상담을 받고 진행하면 돼요.</P>

      <InlineLink
        icon="📋"
        title="도산등사실인정 신청 방법 — 고용노동부 4단계 절차"
        desc="법원 파산 없이 폐업했다면 먼저 도산등사실인정을 받아야 해요"
        href="/w/도산등사실인정-신청-방법-서류"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="신청 절차는 어떻게 되나요?" sub="도산 확인 → 공단 신청 → 심사 → 지급" />
      <P>도산대지급금 신청은 도산 확인 → 근로복지공단 신청 → 심사 → 지급 순서예요. 각 단계에서 필요한 서류가 다르니 미리 준비하면 빠르게 처리할 수 있어요.</P>
      <Steps items={[
        { title: "도산 확인 받기", desc: "법원 파산·회생 선고문을 받거나 고용노동부에서 도산등사실인정서를 발급받아요. 법원 도산은 자동 공고되고, 도산등사실인정은 별도 신청이 필요해요." },
        { title: "체불 임금 내역 정리", desc: "미지급 임금, 퇴직금, 연차수당 금액을 계산해요. 급여명세서, 통장 거래내역, 근로계약서를 준비해요." },
        { title: "근로복지공단 신청", desc: "공단 지사를 방문하거나 comwel.or.kr에서 온라인으로 신청서를 제출해요. 체당금 신청서에 체불 내역을 기재하고 서류를 첨부해요." },
        { title: "공단 심사", desc: "도산 확인 여부, 체불 임금 내역, 근로 관계를 심사해요. 추가 서류 요청이 있을 수 있어요. 통상 2~4주가 걸려요." },
        { title: "지급 및 대위취득", desc: "심사 통과 후 신청서에 기재된 본인 계좌로 지급돼요. 지급 후 국가가 파산 배당에서 해당 금액을 회수해요." },
      ]} />
      <Info type="warn">2년 기한이 지나면 도산 확인 서류가 있어도 신청이 불가해요. 기한 내에 접수하는 게 최우선이에요.</Info>

      <RelatedMid
        title="도산대지급금 관련 절차 더 알아보기"
        items={[
          { icon: "📋", title: "도산등사실인정 신청 방법", desc: "고용노동부 신청 절차와 필요 서류", href: "/w/도산등사실인정-신청-방법-서류" },
          { icon: "💰", title: "도산대지급금 상한액 계산", desc: "연령별 최대 2,100만원 기준", href: "/w/도산대지급금-상한액-지급액-계산" },
          { icon: "⚖️", title: "재판상 도산 파산 회생 차이", desc: "파산 vs 회생절차 대지급금 신청 방법", href: "/w/재판상-도산-파산-회생절차-대지급금" },
        ]}
        hubHref="/category/임금"
        hubLabel="임금체불 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="도산대지급금 신청 필요 서류는 뭐가 있나요?" sub="도산 확인 서류 · 체불 증빙 서류 목록" />
      <P>도산대지급금 신청에는 도산 확인 서류, 재직 및 체불 증빙 서류가 필요해요. 서류가 완비될수록 심사가 빠르고 승인 가능성이 높아져요.</P>

      <TableTitle>신청 필요 서류 목록</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>서류</THL><TH>설명</TH><TH>비고</TH></tr>
          </thead>
          <tbody>
            {[
              ["체당금 지급 청구서", "근로복지공단 양식 (공단에서 수령)", "필수"],
              ["신분증", "주민등록증 또는 운전면허증", "필수"],
              ["통장 사본", "본인 명의 계좌", "필수"],
              ["파산 선고문 / 회생결정문 / 도산등사실인정서", "도산 확인 서류 중 1개", "필수"],
              ["근로계약서", "없으면 4대 보험 가입 확인서로 대체", "권장"],
              ["급여명세서 또는 통장 거래내역", "체불 임금 확인용", "권장"],
              ["퇴직 확인서", "퇴직 사실 증명", "권장"],
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
      <TableNote>근로계약서나 급여명세서가 없어도 4대 보험 자격취득 확인서, 고용24 내역으로 대체 가능해요.</TableNote>

      <P>기본 서류(청구서, 신분증, 통장)와 도산 확인 서류는 반드시 필요해요. 재직·체불 증빙 서류는 없으면 대체 서류를 활용할 수 있어요. 공단 담당자가 서류 부족 시 보완 방법을 안내해줘요.</P>
      <P>온라인 신청(comwel.or.kr)이 방문보다 편리해요. 서류를 스캔해서 파일로 첨부하면 돼요. 처리 기간은 방문과 온라인 모두 비슷하게 2~4주 정도예요.</P>

      <InlineLink
        icon="💰"
        title="도산대지급금 상한액 계산 — 연령별 최대 2,100만원"
        desc="연령·항목별 상한액 기준과 실수령 계산 방법"
        href="/w/도산대지급금-상한액-지급액-계산"
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="도산대지급금 신청 기한 초과 시 어떻게 하나요?" sub="임금채권 소멸시효 · 파산 배당 청구" />
      <P>도산대지급금 2년 기한이 지났다고 방법이 완전히 없어진 건 아니에요. 임금채권 소멸시효(3년) 안에 있다면 별도의 청구 방법이 있어요. 방법은 도산 유형에 따라 달라요.</P>
      <P>파산 절차 중이라면 파산관재인에게 채권 신고를 할 수 있어요. 파산 배당에서 임금채권은 최우선 변제 대상이에요. 배당 금액은 자산 규모에 따라 달라지지만, 대지급금 한도 초과분도 배당으로 받을 수 있어요.</P>
      <P>회생절차 중이라면 회생채권 신고를 해야 해요. 회생채권 신고 기한(통상 결정 후 1~2개월)을 놓치지 않아야 해요. 신고 기한이 지났어도 법원 허가를 받으면 추가 신고가 가능해요.</P>
      <P>사실상 도산이라면 민사소송으로 임금을 청구할 수 있어요. 임금채권 소멸시효(3년)가 남아있을 때만 가능해요. 비용이 들고 시간이 걸리지만, 기한 초과 시 마지막 수단이에요.</P>

      <Info type="tip">임금채권 소멸시효는 임금 지급일로부터 3년이에요. 3년이 지나면 모든 청구 방법이 막혀요. 2년 기한이 지났어도 3년 시효 내라면 빠르게 다른 방법을 찾아야 해요.</Info>

      <BridgeCard
        q="불복 신청이나 이의신청이 필요하다면?"
        a="대지급금 불복은 처분 통보 후 90일 이내에 이의신청을 해야 해요. 기각 후 심사청구, 행정소송 순으로 진행할 수 있어요."
        label="대지급금 불복 구제 절차"
        href="/w/대지급금-불복-구제-절차-공인노무사-비용"
      />

      <SpokeLink num={1} title="도산등사실인정 신청 방법 서류" desc="고용노동부 지청 방문 4단계 절차" href="/w/도산등사실인정-신청-방법-서류" />
      <SpokeLink num={2} title="도산대지급금 상한액 지급액 계산" desc="연령별 최대 2,100만원 한도 기준" href="/w/도산대지급금-상한액-지급액-계산" />

      <ExtBtn
        badge="근로복지공단 공식"
        text="도산 체당금 신청"
        cta="신청하기 →"
        href="https://www.comwel.or.kr/comwel/wlf/dgw/dgwClmHm.jsp"
      />

      <Divider />

      <FAQAccordion items={meta.faq.map(f => ({ q: f.q, a: f.a }))} />

      <RelatedArticles items={[
        { title: "도산대지급금 상한액 지급액 계산", desc: "연령별 최대 2,100만원 한도 기준", href: "/w/도산대지급금-상한액-지급액-계산" },
        { title: "도산등사실인정 신청 방법 서류", desc: "고용노동부 인정 절차와 필요 서류", href: "/w/도산등사실인정-신청-방법-서류" },
        { title: "도산등사실인정 사업주 요건", desc: "6개월 이상 산재보험 적용 기준", href: "/w/도산등사실인정-사업주-요건-회사-규모" },
        { title: "재판상 도산 파산 회생절차 비교", desc: "파산 vs 회생절차 대지급금 차이", href: "/w/재판상-도산-파산-회생절차-대지급금" },
        { title: "대지급금 불복 구제 절차", desc: "이의신청 90일 기한과 공인노무사 비용", href: "/w/대지급금-불복-구제-절차-공인노무사-비용" },
      ]} />
      <PrevNext
        prev={{ title: "도산대지급금 상한액 계산", href: "/w/도산대지급금-상한액-지급액-계산" }}
        next={{ title: "도산등사실인정 사업 폐지 조건", href: "/w/도산등사실인정-사업-폐지-영업양도" }}
      />
    </BlogLayout>
  );
}
