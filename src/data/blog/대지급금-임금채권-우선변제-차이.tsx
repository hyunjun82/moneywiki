"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  Info, InlineLink, ExtBtn, TableTitle, TableNote,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc, BridgeCard,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "대지급금 임금채권 우선변제 차이 | 대위권 변제 순위 구조",
  description:
    "대지급금이랑 임금채권 우선변제가 뭐가 다른지 헷갈리시죠? 국가가 대신 지급하는 구조부터 변제 순위까지 한눈에 정리했어요.",
  category: "임금",
  keywords: [
    "대지급금 임금채권 우선변제 차이",
    "대지급금 대위권 작동 원리",
    "임금채권 변제 순위 최우선변제",
    "대지급금 한도 초과 임금채권 청구",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "대지급금은 국가가 먼저 지급 후 회사에 대위권 행사 — 한도 내 빠른 회수",
    "임금채권 우선변제권은 도산 절차에서 담보권보다 먼저 배당받는 법적 권리",
    "체불액이 대지급금 한도 초과 시 대지급금 + 우선변제 동시 활용 전략이 유리",
  ],
  sources: [
    { name: "근로기준법 제38조 임금채권 우선변제", url: "https://www.law.go.kr/법령/근로기준법", date: "2026-02" },
    { name: "임금채권보장법 대위권 조항", url: "https://www.law.go.kr/법령/임금채권보장법", date: "2026-02" },
  ],
  faq: [
    { q: "대지급금 받으면 임금채권 우선변제권이 사라지나요?", a: "사라지지 않아요. 대지급금 한도를 초과하는 금액에 대해서는 여전히 우선변제권을 직접 행사할 수 있어요. 다만 대지급금 지급된 금액에 대해서는 국가가 대위권을 행사하기 때문에 같은 채권에 대해 이중으로 받을 수는 없어요." },
    { q: "임금채권 변제 순위에서 담보권이 먼저인 경우가 있나요?", a: "최우선변제 임금채권은 담보권보다도 앞서요. 그러나 그 외의 일반 임금채권은 담보권 설정 시기와 비교해서 변제 순위가 결정돼요. 담보권 설정 후 발생한 임금이라도 최우선변제 요건을 충족하면 담보권자보다 먼저 받을 수 있어요." },
  ],
};

type Sel = Record<string, string>;

function getResult(sel: Sel): string | null {
  const { company, amount } = sel;
  if (!company || !amount) return null;
  if (company === "bankrupt" && amount === "within") return "bankrupt_within";
  if (company === "bankrupt" && amount === "exceed") return "bankrupt_exceed";
  if (company === "rehab" && amount === "within") return "rehab_within";
  if (company === "rehab" && amount === "exceed") return "rehab_exceed";
  if (company === "operating" && amount === "within") return "operating_within";
  return "operating_exceed";
}

export default function Article113() {
  const [sel, setSel] = useState<Sel>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const toc = [
    { t: "STEP 01 임금 회수 방법 확인", sub: "회사 상태 · 체불 금액" },
    { t: "대지급금과 우선변제 핵심 차이", sub: "국가 대리 지급 · 법적 권리 비교" },
    { t: "대위권 작동 원리", sub: "채권 이전 · 이중 수령 금지" },
    { t: "임금채권 변제 순위", sub: "최우선변제 · 일반 임금채권 순위" },
    { t: "최우선변제 임금채권 기준", sub: "최근 3개월 임금 · 3년 퇴직금" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "노동·임금", "체불임금", "대지급금"]}
      tags={["2026년 최신", "대지급금", "임금채권"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>대지급금과 임금채권 우선변제는 별개의 제도예요. <B>대지급금은 빠른 회수</B>, <B>우선변제는 도산 배당</B>에서 쓰여요. 체불액이 한도를 초과하면 두 가지를 병행해야 해요.</>}
      sourceBar={{ badge: "법제처", name: "근로기준법·임금채권보장법", date: "2026.02" }}
      stickyLabel="도산대지급금 상한"
      stickyValue="최대 2,100만원"
      stickyBtn="근로복지공단 체당금 신청"
      stickyHref="https://www.comwel.or.kr"
      disclaimer="이 글은 근로기준법 제38조와 임금채권보장법을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA items={[
            { icon: "💰", title: "근로복지공단 체당금 신청", sub: "도산대지급금 접수", href: "https://www.comwel.or.kr", hot: true },
            { icon: "📋", title: "임금체불 진정 접수", sub: "고용노동부 1350", href: "https://www.moel.go.kr" },
            { icon: "⚖️", title: "법률구조공단 상담", sub: "파산 배당 신청 방법", href: "https://www.klac.or.kr" },
          ]} />
          <SidebarDocs items={[
            { title: "간이대지급금 상한액 계산", cat: "임금·체불", href: "/w/간이대지급금-지급액-상한액" },
            { title: "도산대지급금 신청 방법", cat: "임금·체불", href: "/w/도산대지급금-신청-방법-절차" },
            { title: "대지급금 불복 구제 절차", cat: "임금·체불", href: "/w/대지급금-불복-구제-절차-공인노무사-비용" },
          ]} />
          <SidebarCalc items={[
            { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
            { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
          ]} />
        </>
      }
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        q="회사 도산 시 대지급금이랑 우선변제 두 가지 다 받을 수 있나요?"
        a="상황에 따라 둘 다 활용할 수 있어요. 체불 금액이 한도를 초과하면 초과분은 우선변제로 청구하는 게 효율적이에요."
        label="방법 확인"
        href="#checker"
      />

      {/* STEP 01 */}
      <Sec n="01" id="checker" title="STEP 01 임금 회수 방법 확인" sub="회사 상태 · 체불 금액">
        <CheckerShell title="내 임금채권 어떤 방법으로 받을 수 있나요?" sub="30초 확인">
          <CheckerQ
            n="1"
            label="회사 상태가 어떻게 되나요?"
            group="company"
            opts={[
              ["bankrupt", "파산 선고 또는 폐업했어요"],
              ["rehab", "회생절차(법정관리) 중이에요"],
              ["operating", "운영 중인데 체불 중이에요"],
            ]}
            sel={sel}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="체불 금액이 대지급금 한도와 비교해서요?"
            group="amount"
            opts={[
              ["within", "한도(700만~2100만원) 이하예요"],
              ["exceed", "한도를 초과해요"],
            ]}
            sel={sel}
            pick={pick}
          />
          {result === "bankrupt_within" && (
            <ResultPass title="도산대지급금으로 전액 회수 가능해요">
              <P>도산 회사에서 체불이 한도 이내라면 도산대지급금으로 전액 회수할 수 있어요. 근로복지공단에 신청하면 돼요. 도산 확인(파산 선고문 또는 도산등사실인정서) 후 2년 이내에 신청해야 해요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "전액 회수", pass: true, desc: "도산대지급금 신청" },
                { icon: "📋", name: "파산 선고문", pass: true, desc: "도산 확인 서류 준비" },
                { icon: "⏰", name: "신청 기한", pass: true, desc: "도산 확인 후 2년" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="도산대지급금 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "bankrupt_exceed" && (
            <ResultPass title="대지급금 + 우선변제 동시 활용하세요">
              <P>한도 초과분은 임금채권 우선변제권으로 직접 청구해야 해요. 파산 절차에서 배당 신청, 회생절차에서 회생채권 신고를 해야 해요. 최우선변제 임금채권은 담보권보다 우선되니 변제 가능성이 높아요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "대지급금", pass: true, desc: "한도 내 빠른 수령" },
                { icon: "✅", name: "우선변제", pass: true, desc: "초과분 파산 배당" },
                { icon: "📋", name: "병행 전략", pass: true, desc: "두 가지 동시 진행" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="대지급금 + 배당 병행" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "rehab_within" && (
            <ResultPass title="회생절차에서도 대지급금 신청 가능해요">
              <P>회생절차 개시 결정이 내려진 시점부터 도산대지급금 신청 요건이 충족돼요. 결정문을 가지고 근로복지공단에 신청하세요. 동시에 법원 회생채권 신고 기한도 놓치지 않도록 주의하세요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "대지급금 신청", pass: true, desc: "회생 개시 결정문 준비" },
                { icon: "📋", name: "회생채권 신고", pass: true, desc: "법원 신고 병행" },
                { icon: "⏰", name: "신청 기한", pass: true, desc: "개시 결정 후 2년" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="회생 개시 결정문으로 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "rehab_exceed" && (
            <ResultPass title="대지급금 + 회생채권 신고 병행하세요">
              <P>한도 내 금액은 대지급금으로 빠르게 받고, 초과분은 회생채권 신고로 청구하세요. 회생계획 인가 후 원금 일부 탕감이나 분할상환 조건으로 지급받을 수 있어요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "대지급금", pass: true, desc: "한도 내 먼저 수령" },
                { icon: "📋", name: "회생채권", pass: true, desc: "법원 회생채권 신고" },
                { icon: "⚠️", name: "기한 주의", pass: true, desc: "신고 기한 1~2개월" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 체당금 신청" desc="대지급금 먼저 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "operating_within" && (
            <ResultPass title="간이대지급금으로 신청 가능해요">
              <P>운영 중인 회사에서 체불이면 간이대지급금(최대 700만원)을 신청할 수 있어요. 고용센터에서 체불확인서를 발급받아 근로복지공단에 신청하세요. 퇴직 후 1년 이내에 신청해야 해요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "간이대지급금", pass: true, desc: "최대 700만원" },
                { icon: "📋", name: "체불확인서", pass: true, desc: "고용센터 발급" },
                { icon: "⏰", name: "신청 기한", pass: true, desc: "퇴직 후 1년" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 간이대지급금" desc="체불확인서로 신청" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "operating_exceed" && (
            <ResultFail title="간이대지급금 + 민사소송 병행 필요해요">
              <P>운영 중인 회사에서 700만원 초과 체불이면 간이대지급금(700만원)을 먼저 받고, 나머지는 민사소송이나 지급 명령으로 청구하세요. 임금채권 우선변제권은 도산 절차에서만 직접 활용돼요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "간이대지급금", pass: true, desc: "700만원 한도" },
                { icon: "⚖️", name: "민사소송", pass: true, desc: "초과분 법원 청구" },
                { icon: "⚠️", name: "우선변제", pass: false, desc: "운영 중 회사엔 미적용" },
              ]} />
              <ResultCTA icon="📋" title="임금체불 진정 접수" desc="고용노동부 1350" href="https://www.moel.go.kr" />
            </ResultFail>
          )}
          {!result && (
            <ResultFail title="회사 상태를 선택해 주세요">
              <P>회사 상태와 체불 금액을 선택하면 적합한 임금 회수 방법을 안내해 드려요.</P>
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>
      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="diff" title="대지급금과 우선변제 핵심 차이" sub="국가 대리 지급 · 법적 권리 비교">
        <P><B>두 가지는 작동 방식이 달라요.</B> 대지급금은 국가가 대신 지급하는 제도이고, 우선변제권은 근로자가 직접 행사하는 법적 권리예요. 둘 다 임금 보호 목적이지만 쓰이는 상황이 다르고 병행도 가능해요.</P>
        <P>대지급금은 국가(근로복지공단)가 체불 임금을 근로자에게 먼저 지급하는 거예요. 한도(간이 700만원, 도산 2,100만원)가 있고, 지급 후 국가가 회사에 대위권을 행사해 회수해요. 신청만 하면 빠르게 받을 수 있는 게 장점이에요.</P>
        <P>임금채권 우선변제권은 <A href="https://www.law.go.kr/법령/근로기준법">근로기준법 제38조</A>에 따라 임금·퇴직금이 도산 시 다른 채권보다 먼저 변제받는 법적 우선권이에요. 파산이나 회생 절차에서 배당을 받거나, 경매 시 배당에서 다른 채권자보다 앞서는 권리예요.</P>
        <P>실무에서는 두 가지를 병행 활용해요. 대지급금으로 빠르게 한도 내 금액을 받고, 초과분은 파산 배당이나 경매 배당에서 우선변제권으로 추가 회수하는 방식이에요.</P>

        <H3>대지급금 vs 임금채권 우선변제 비교</H3>
        <TableTitle>두 제도 핵심 비교표</TableTitle>
        <table>
          <thead><tr>
            <th>항목</th><th>대지급금</th><th>임금채권 우선변제</th>
          </tr></thead>
          <tbody>
            <tr><td>주체</td><td>국가(근로복지공단)</td><td>근로자 직접 행사</td></tr>
            <tr><td>적용 시점</td><td>체불 발생 시 (운영 중 포함)</td><td>도산·경매 절차</td></tr>
            <tr><td>한도</td><td>간이 700만원 / 도산 2,100만원</td><td>최우선변제 금액 내 무제한</td></tr>
            <tr><td>속도</td><td>빠름 (2~4주)</td><td>느림 (파산 절차 기간)</td></tr>
            <tr><td>초과분 처리</td><td>별도 청구 필요</td><td>담보권보다 우선 배당 가능</td></tr>
          </tbody>
        </table>
        <TableNote>체불액이 대지급금 한도를 초과하면 두 제도를 병행하는 게 유리해요.</TableNote>
      </Sec>
      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="proxy" title="대위권 작동 원리" sub="채권 이전 · 이중 수령 금지">
        <P><B>국가가 근로자의 채권 자리를 대신해요.</B> <A href="https://www.law.go.kr/법령/임금채권보장법">임금채권보장법</A>에 따라 대지급금을 지급한 국가는 근로자가 가진 임금채권(우선변제권 포함)을 대위취득해요.</P>
        <P>쉽게 설명하면 이래요. 국가가 근로자에게 대지급금 500만원을 지급했다면, 이제 500만원에 해당하는 임금채권과 우선변제권이 근로자에서 국가로 이전돼요. 국가는 회사에 500만원을 청구할 수 있고, 도산 절차에서 우선변제 배당도 받을 수 있어요.</P>
        <P>근로자 입장에서는 한도를 초과하는 부분의 우선변제권이 남아요. 대지급금 한도를 초과한 체불액에 대해서는 근로자가 직접 파산 배당 신청이나 경매 배당을 신청할 수 있어요.</P>
        <P>이중 수령은 안 돼요. 같은 채권에 대해 대지급금을 받고 우선변제로 또 받을 수는 없어요. 대지급금 지급된 금액은 국가 채권이 됐기 때문이에요.</P>
        <InlineLink icon="link" title="근로복지공단 체당금" desc="대위권 적용 후 잔여 청구 방법" href="https://www.comwel.or.kr" />
      </Sec>
      <RelatedMid
        title="대지급금 관련 글도 확인해 보세요"
        items={[
          { icon: "💰", title: "도산대지급금 상한액 계산", desc: "연령별 최대 2100만원 기준", href: "/w/도산대지급금-상한액-지급액-계산" },
          { icon: "📊", title: "간이대지급금 지급액 상한액", desc: "700만원 한도 항목별 계산", href: "/w/간이대지급금-지급액-상한액" },
          { icon: "📋", title: "도산대지급금 신청 방법", desc: "2년 기한 필요 서류 정리", href: "/w/도산대지급금-신청-방법-절차" },
        ]}
        hubHref="/category/임금"
        hubLabel="체불임금 전체 보기"
      />
      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="rank" title="임금채권 변제 순위" sub="최우선변제 · 일반 임금채권 순위">
        <P><B>순위가 복잡해요.</B> 크게 최우선변제 임금채권과 일반 임금채권으로 나뉘어요.</P>
        <P>최우선변제 임금채권은 가장 앞서요. 최근 3개월 임금, 최근 3년 퇴직금, 재해보상금이 여기 해당해요. 담보권(저당권, 질권) 설정 시기와 무관하게 무조건 먼저 배당돼요.</P>
        <P>일반 임금채권은 최우선변제 대상을 초과하는 부분이에요. 조세·공과금보다는 앞서지만, 담보권 설정 시기에 따라 순위가 달라져요. 담보권이 먼저 설정됐으면 담보권자가 먼저 배당받아요.</P>
        <P>실질 배당 순서를 정리하면 이래요. 1순위는 최우선변제 임금채권(최근 3개월 임금+3년 퇴직금), 2순위는 담보권(설정 순서에 따라), 3순위는 일반 임금채권, 4순위는 조세·공과금, 5순위는 일반 채권이에요.</P>
        <Info type="warn">{"최우선변제 임금채권은 담보권보다 먼저예요. 금액 상한은 고용노동부 고시로 매년 발표해요. 상한 초과분은 일반 임금채권으로 분류돼요."}</Info>
      </Sec>
      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="priority" title="최우선변제 임금채권 기준" sub="최근 3개월 임금 · 3년 퇴직금">
        <P><B>모든 담보권보다 앞서는 임금이에요.</B> 근로자 보호를 위해 법에서 특별히 인정하는 최우선 권리예요.</P>
        <P>대상은 두 가지예요. 최종 3개월 임금과 최종 3년 퇴직금이에요. 퇴직일 기준 최근 3개월 동안의 임금, 퇴직금은 최근 3년치 분이에요. 이 금액은 담보권 설정 시기와 무관하게 무조건 먼저 배당돼요.</P>
        <P>금액 상한도 있어요. 지역마다 다르게 적용되고, 수도권 기준으로 최종 3개월 임금의 상한이 있어요. 고용노동부 고시로 매년 기준액을 발표해요. 이 금액을 초과하는 임금은 일반 임금채권으로 분류돼요.</P>
        <P>파산 배당에서 근로자가 적극적으로 채권을 신고해야 해요. 파산관재인에게 채권 신고를 하지 않으면 배당에서 제외될 수 있어요. 법원 파산 공고에서 신고 기한을 반드시 확인하세요.</P>

        <ExtBtn badge="법제처 공식" text="근로기준법 제38조 임금채권 우선변제" cta="바로가기 →" href="https://www.law.go.kr/법령/근로기준법" />
      </Sec>
      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "도산대지급금 상한액 지급액 계산", desc: "연령별 최대 2100만원 한도 기준", href: "/w/도산대지급금-상한액-지급액-계산" },
        { title: "도산대지급금 신청 방법 절차", desc: "2년 기한과 필요 서류 정리", href: "/w/도산대지급금-신청-방법-절차" },
        { title: "간이대지급금 지급액 상한액", desc: "700만원 한도 항목별 계산", href: "/w/간이대지급금-지급액-상한액" },
        { title: "대지급금 불복 구제 절차", desc: "90일 이내 이의신청 방법", href: "/w/대지급금-불복-구제-절차-공인노무사-비용" },
        { title: "대지급금 금액 계산 연차 상여금", desc: "통상임금 포함 여부 기준", href: "/w/대지급금-금액-계산-연차-상여금" },
      ]} />
      <PrevNext
        prev={{ title: "대지급금 불복 구제 절차", href: "/w/대지급금-불복-구제-절차-공인노무사-비용" }}
        next={{ title: "대지급금 일부 지급 거부 사유", href: "/w/대지급금-특수-상황-일부지급-최저임금" }}
      />
    </BlogLayout>
  );
}
