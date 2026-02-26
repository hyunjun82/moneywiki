"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  InlineLink, ExtBtn, TableTitle, TableNote,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc, BridgeCard,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "간이대지급금 신청 방법 서류 | 체불임금 700만원 도산 체당금 차이",
  description:
    "회사가 안 망했는데 월급을 못 받으셨나요? 간이대지급금으로 최대 700만원까지 받을 수 있어요. 체불확인서 발급부터 신청 서류까지 단계별로 알려드려요.",
  category: "임금",
  keywords: [
    "간이대지급금 체불확인서 발급 단계",
    "간이대지급금 700만원 초과 처리",
    "체불확인서 발급 지연 우선처리",
    "간이대지급금 일반 체당금 비교",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "간이대지급금은 회사 도산 없이도 체불 임금을 국가가 대신 지급하는 제도",
    "최대 700만원 한도 내에서 지급되며, 이후 국가가 회사에 구상권 행사",
    "체불확인서 발급 → 근로복지공단 신청 → 심사 → 지급 순으로 진행",
  ],
  sources: [
    { name: "임금채권보장법 - 간이대지급금 제도", url: "https://www.law.go.kr/법령/임금채권보장법", date: "2026-02" },
    { name: "근로복지공단 - 체당금 안내", url: "https://www.comwel.or.kr", date: "2026-02" },
  ],
  faq: [
    { q: "간이대지급금 신청 후 회사에 알려지나요?", a: "네, 간이대지급금이 지급되면 근로복지공단이 회사에 구상권을 행사해요. 국가가 대신 지급한 금액을 회사에 청구하는 과정에서 신청 사실이 회사에 알려져요." },
    { q: "간이대지급금 700만원 한도는 1인당인가요?", a: "1인당 한도예요. 퇴직금, 임금, 휴업수당을 합산해서 최대 700만원이에요. 초과분은 민사소송으로 따로 청구해야 해요." },
  ],
};

type Sel = Record<string, string>;

function getResult(sel: Sel): string | null {
  const { status, company } = sel;
  if (!status || !company) return null;
  if (status === "resigned" && company === "operating") return "possible";
  if (status === "resigned" && company === "bankrupt") return "general";
  if (status === "employed" && company === "operating") return "notYet";
  return "generalEmployed";
}

export default function Article109() {
  const [sel, setSel] = useState<Sel>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const toc = [
    { t: "STEP 01 신청 가능 여부 확인", sub: "재직·퇴직 여부 · 회사 상태" },
    { t: "신청 방법 첫 단계", sub: "체불확인서 발급 · 진정 접수" },
    { t: "700만원 한도 신청 절차", sub: "필요 서류 · 신청 기한 · 지급 기간" },
    { t: "체불확인서 발급이 늦어지면", sub: "신속처리 요청 · 내용증명 활용" },
    { t: "간이대지급금과 일반 체당금 차이", sub: "도산 여부 · 한도 비교" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "노동·임금", "체불임금", "간이대지급금"]}
      tags={["2026년 최신", "체불임금", "대지급금"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>회사가 안 망했는데 월급을 못 받으셨나요? <B>간이대지급금</B>으로 최대 <B>700만원까지</B> 국가가 대신 지급해줘요. 체불확인서 발급부터 신청까지 정리했어요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법·근로복지공단", date: "2026.02" }}
      stickyLabel="지급 한도"
      stickyValue="최대 700만원"
      stickyBtn="근로복지공단 신청"
      stickyHref="https://www.comwel.or.kr"
      disclaimer="이 글은 임금채권보장법·근로복지공단 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA items={[
            { icon: "💰", title: "간이대지급금 신청", sub: "체불 임금 최대 700만원 지급", href: "https://www.comwel.or.kr", hot: true },
            { icon: "📋", title: "임금체불 진정 접수", sub: "체불확인서 발급 신청", href: "https://www.moel.go.kr" },
            { icon: "📞", title: "고용노동부 1350 상담", sub: "체불 상담 및 신속처리 요청", href: "https://www.moel.go.kr" },
          ]} />
          <SidebarDocs items={[
            { title: "퇴직금 지연이자 계산", cat: "퇴직·임금", href: "/w/퇴직급여-지급-지연이자-받기" },
            { title: "학력 위조 해고 정당성", cat: "노동·해고", href: "/w/학력-거짓-해고-정당성" },
            { title: "야유회 사고 산재보상", cat: "산재·보상", href: "/w/야유회-사고-산재보상-받기" },
          ]} />
          <SidebarCalc items={[
            { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
            { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          ]} />
        </>
      }
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        q="회사가 안 망했는데 월급을 못 받았어요. 어디서 도움을 받을 수 있나요?"
        a="간이대지급금 제도를 쓸 수 있어요. 아래에서 내 상황이 해당되는지 먼저 확인해 보세요."
        label="신청 가능 여부 확인"
        href="#checker"
      />

      {/* STEP 01 */}
      <Sec n="01" id="checker" title="STEP 01 신청 가능 여부 확인" sub="재직·퇴직 여부 · 회사 상태">
        <CheckerShell title="간이대지급금 신청 가능한가요?" sub="30초 확인">
          <CheckerQ
            n="1"
            label="현재 상태가 어떻게 되나요?"
            group="status"
            opts={[
              ["resigned", "이미 퇴직했어요"],
              ["employed", "아직 재직 중이에요"],
            ]}
            sel={sel}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="회사 상태가 어떻게 되나요?"
            group="company"
            opts={[
              ["operating", "회사는 정상 운영 중이에요"],
              ["bankrupt", "회사가 도산했거나 폐업했어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          {result === "possible" && (
            <ResultPass title="간이대지급금 신청이 가능해요">
              <P>퇴직 후 회사가 운영 중인데 임금을 못 받은 경우예요. 고용노동부에서 체불확인서를 발급받아 근로복지공단에 간이대지급금을 신청하면 돼요. 퇴직일로부터 1년 이내에 신청해야 해요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "신청 가능", pass: true, desc: "퇴직 후 운영 중" },
                { icon: "💰", name: "지급 한도", pass: true, desc: "최대 700만원" },
                { icon: "📋", name: "신청 기한", pass: true, desc: "퇴직 후 1년 이내" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 신청" desc="간이대지급금 접수하기" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "general" && (
            <ResultPass title="일반 체당금(도산 체당금) 신청이 더 맞아요">
              <P>회사가 도산한 경우엔 간이대지급금보다 일반 체당금(도산 체당금)이 더 유리해요. 지급 한도가 최대 3,900만원으로 훨씬 높고 절차도 다르게 진행돼요. 근로복지공단에 문의해보세요.</P>
              <ResultGrid items={[
                { icon: "⚠️", name: "도산 체당금 해당", pass: true, desc: "한도 최대 3,900만원" },
                { icon: "📋", name: "법원 도산 확인", pass: true, desc: "필요 서류 다름" },
                { icon: "💰", name: "간이대지급금", pass: false, desc: "도산 시 불리" },
              ]} />
              <ResultCTA icon="📞" title="근로복지공단 문의" desc="도산 체당금 안내 받기" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "notYet" && (
            <ResultFail title="재직 중에는 간이대지급금을 신청하기 어려워요">
              <P>간이대지급금은 퇴직 후 신청이 원칙이에요. 재직 중이라면 우선 고용노동부(1350)에 임금체불 진정을 접수해서 회사에 지급 명령을 내리는 방법을 먼저 시도해보세요. 퇴직 후에 간이대지급금을 신청할 수 있어요.</P>
              <ResultGrid items={[
                { icon: "⚠️", name: "재직 중 신청", pass: false, desc: "원칙상 퇴직 후 가능" },
                { icon: "📋", name: "임금체불 진정", pass: true, desc: "고용노동부 1350" },
              ]} />
              <ResultCTA icon="📞" title="고용노동부 진정 접수" desc="임금체불 신고하기" href="https://www.moel.go.kr" />
            </ResultFail>
          )}
          {result === "generalEmployed" && (
            <ResultPass title="회사 도산 시 퇴직 처리 후 체당금 신청이 가능해요">
              <P>회사가 도산한 경우 퇴직 처리 후 도산 체당금을 신청할 수 있어요. 법원에서 도산 확인을 받거나 고용노동부에서 도산 사실을 확인해야 해요. 근로복지공단에 체당금 신청 방법을 문의하세요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "도산 체당금", pass: true, desc: "퇴직 처리 후 신청" },
                { icon: "📋", name: "도산 확인", pass: true, desc: "법원 또는 노동부" },
              ]} />
              <ResultCTA icon="📞" title="근로복지공단 문의" desc="도산 체당금 신청 방법" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {!result && (
            <ResultFail title="현재 상태를 선택해 주세요">
              <P>재직·퇴직 여부와 회사 상태를 선택하면 신청 가능 여부를 안내해 드려요.</P>
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>
      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="first" title="신청 방법 첫 단계" sub="체불확인서 발급 · 진정 접수">
        <P><B>체불확인서 발급이 첫 번째예요.</B> 고용노동부에서 발급받는 공식 서류예요. 이 서류가 있어야 근로복지공단에 간이대지급금을 신청할 수 있어요. <A href="https://www.law.go.kr/법령/임금채권보장법">임금채권보장법</A>에 따라 운영되는 공식 제도예요.</P>
        <P>체불확인서 발급 경로는 두 가지예요. 첫째, 고용센터(고용노동부)에 임금체불 진정을 접수한 후 근로감독관의 조사를 거쳐 발급받는 방법이에요. 이 경우 2~4주가 걸릴 수 있어요. 둘째, 법원에서 확정 판결이나 지급 명령을 받은 경우엔 해당 판결문을 사용할 수 있어요.</P>
        <P>진정 접수는 고용24(ei.go.kr) 온라인 신청 또는 관할 고용센터 방문으로 할 수 있어요. 체불된 임금 내역(금액, 기간), 재직 기간 증빙, 근로계약서를 미리 준비해두면 빨라요.</P>
        <P>체불 사실이 명확한 경우엔 근로감독관이 빠르게 처리해줘요. 급한 경우엔 고용센터에 사정을 설명하면 우선 처리 요청을 할 수 있어요.</P>

        <H3>체불확인서 발급 경로 비교</H3>
        <TableTitle>체불확인서 발급 방법 2가지</TableTitle>
        <table>
          <thead><tr>
            <th>경로</th><th>소요 기간</th><th>특이사항</th>
          </tr></thead>
          <tbody>
            <tr><td>고용노동부 진정 후 발급</td><td>2~4주</td><td>온라인/방문 접수 가능</td></tr>
            <tr><td>법원 확정 판결문</td><td>판결 후 즉시</td><td>판결문으로 대체 가능</td></tr>
          </tbody>
        </table>
      </Sec>
      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="procedure" title="700만원 한도 신청 절차" sub="필요 서류 · 신청 기한 · 지급 기간">
        <P><B>체불확인서 발급 후 근로복지공단에 신청해요.</B> 근로복지공단(comwel.or.kr) 지사를 방문하거나 온라인으로 신청할 수 있어요. 신청 후 지급까지 보통 2~3주가 걸려요.</P>
        <P>신청 순서예요. 체불확인서 발급(고용노동부) → 간이대지급금 지급 청구서 작성 → 서류 제출 → 공단 심사 → 지급이에요.</P>
        <P>필요 서류예요. 간이대지급금 지급 청구서, 체불확인서 또는 법원 확정 판결문, 신분증, 통장 사본(본인 명의)이 기본이에요. 재직 기간을 증빙하는 서류(근로계약서, 급여명세서, 4대 보험 가입 확인서 등)도 있으면 유리해요.</P>
        <P>신청 기한은 퇴직일로부터 1년 이내예요. 기한을 놓치면 신청할 수 없어요. 체불 금액이 발생한 날로부터 3년(청구권 소멸시효) 이내에 진정 접수를 해야 체불확인서 발급도 가능해요.</P>
      </Sec>

      <RelatedMid
        items={[
          { icon: "💰", title: "퇴직금 지연이자 계산", desc: "퇴직금 미지급 시 연 20% 지연이자 청구 방법", href: "/w/퇴직급여-지급-지연이자-받기" },
          { icon: "⚖️", title: "학력 위조 해고 정당성", desc: "부당해고 판단 기준과 노동위원회 구제 신청", href: "/w/학력-거짓-해고-정당성" },
        ]}
        hubHref="/w/실업급여"
        hubLabel="실업급여 허브 → 전체 내용 보기"
      />
      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="delay" title="체불확인서 발급이 늦어지면" sub="신속처리 요청 · 내용증명 활용">
        <P><B>신속 체불확인서 발급 요청이 가능해요.</B> 생계가 어려운 경우 고용센터에 신속 처리를 요청할 수 있어요. 급하다는 사실을 담당 근로감독관에게 직접 설명하는 게 중요해요.</P>
        <P>일반 임금체불 진정 처리 기간은 2~4주예요. 하지만 체불 금액이 명확하고 사업주가 인정하면 더 빨리 처리될 수 있어요. 사업주가 조사에 협조하지 않거나 분쟁이 있으면 더 걸릴 수 있어요.</P>
        <P>급히 생계비가 필요한 경우엔 소액체당금 빠른 지급 제도를 활용할 수 있어요. 고용센터에 생계 위기 상황을 설명하면 우선 처리 방법을 안내해줘요.</P>
        <P>체불확인서 발급 전이라도 사업주에게 내용증명을 보내는 방법이 있어요. 지급 기한을 명시해서 내용증명을 보내면 사업주가 자진 지급하는 경우도 있어요. 시간을 단축하는 현실적인 방법이에요.</P>
      </Sec>
      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="diff" title="간이대지급금과 일반 체당금 차이" sub="도산 여부 · 한도 비교">
        <P><B>도산 여부가 핵심 차이예요.</B> 간이대지급금은 회사가 도산하지 않아도 되지만, 일반 체당금(도산 체당금)은 법원의 도산 확인이 필요해요. 한도 차이도 크기 때문에 상황에 맞는 제도를 선택하는 게 중요해요.</P>
        <P>한도 차이가 크기 때문에 체불 금액이 많다면 회사 도산 여부를 확인하는 게 중요해요. 회사가 실질적으로 도산 상태라면 법원에 도산 신청을 하거나 고용노동부에 도산 확인을 요청해서 일반 체당금을 받는 게 유리해요.</P>
        <P>두 제도 모두 신청처는 근로복지공단이에요. 도산 여부에 따라 신청 서류와 절차가 달라지므로, 공단에 먼저 상담해서 내 상황에 맞는 제도를 확인하는 게 좋아요.</P>
        <P>700만원을 초과하는 체불 금액은 민사소송 또는 소액소송으로 따로 청구해야 해요. 체불 금액이 3,000만원 이하면 소액사건심판 절차를 이용해 비교적 빠르게 받을 수 있어요.</P>

        <H3>간이대지급금과 일반 체당금 비교</H3>
        <TableTitle>두 제도의 핵심 차이</TableTitle>
        <table>
          <thead><tr>
            <th>구분</th><th>간이대지급금</th><th>일반 체당금</th>
          </tr></thead>
          <tbody>
            <tr><td>대상</td><td>도산 없이 체불</td><td>법원 도산 확인 필요</td></tr>
            <tr><td>지급 상한</td><td>최대 700만원</td><td>최대 3,900만원</td></tr>
            <tr><td>신청처</td><td>근로복지공단</td><td>근로복지공단</td></tr>
            <tr><td>소요 기간</td><td>약 2~3주</td><td>약 1~2개월</td></tr>
          </tbody>
        </table>
        <TableNote>체불 금액이 700만원 초과 시 초과분은 민사소송으로 별도 청구 필요</TableNote>

        <InlineLink
          icon="💰"
          title="퇴직금 지연이자 계산"
          desc="퇴직금 미지급 시 연 20% 지연이자 받는 방법"
          href="/w/퇴직급여-지급-지연이자-받기"
        />

        <ExtBtn
          badge="근로복지공단 공식"
          text="간이대지급금 신청"
          cta="신청하기 →"
          href="https://www.comwel.or.kr"
        />
      </Sec>
      <Divider />

      <FAQAccordion items={meta.faq.map((f) => ({ q: f.q, a: f.a }))} />
      <RelatedArticles items={[
        { title: "퇴직금 지연이자 계산", desc: "퇴직금 미지급 시 연 20% 지연이자 청구 방법", href: "/w/퇴직급여-지급-지연이자-받기" },
        { title: "학력 위조 해고 정당성", desc: "부당해고 판단 기준과 노동위원회 구제 신청", href: "/w/학력-거짓-해고-정당성" },
      ]} />
      <PrevNext
        prev={{ title: "학력 위조 해고 정당성 판단", href: "/w/학력-거짓-해고-정당성" }}
        next={{ title: "간이대지급금 지급액 상한 기준", href: "/w/간이대지급금-지급액-상한액" }}
      />
    </BlogLayout>
  );
}
