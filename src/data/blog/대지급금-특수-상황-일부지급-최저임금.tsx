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
  title: "대지급금 일부 지급 거부 사유 | 부정수급 제재 특수상황 처리",
  description:
    "대지급금을 일부만 받거나 거부당할 수 있다는 거 고민이시죠? 부정수급 제재부터 특수상황 처리 기준까지 알려드려요.",
  category: "임금",
  keywords: [
    "대지급금 일부 지급 상한 초과 사유",
    "대지급금 지급 거부 근로자성 불인정",
    "대지급금 부정수급 환수 제재 기준",
    "대지급금 최저임금 미달 구두 계약 신청",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "대지급금 일부 지급 — 상한 초과·항목 불인정·기간 문제가 주요 원인",
    "부정수급 시 전액 환수 + 동일 금액 추가 징수 제재 적용",
    "최저임금 미달 임금은 최저임금액으로 보정해서 대지급금 계산",
  ],
  sources: [
    { name: "임금채권보장법 부정수급 제재 조항", url: "https://www.law.go.kr/법령/임금채권보장법", date: "2026-02" },
    { name: "근로복지공단 대지급금 처리 기준", url: "https://www.comwel.or.kr", date: "2026-02" },
  ],
  faq: [
    { q: "대지급금 일부 지급 결정 시 나머지는 어떻게 받나요?", a: "대지급금 한도를 초과하는 금액은 민사소송이나 파산 배당 신청으로 따로 청구해야 해요. 대지급금 지급 결정서가 민사소송 시 증거로 활용될 수 있어요. 근로복지공단에 문의하면 초과분 처리 방법을 안내받을 수 있어요." },
    { q: "대지급금 부정수급 신고는 어디서 하나요?", a: "근로복지공단(1588-0075) 또는 고용노동부(1350)에 신고할 수 있어요. 부정수급 신고자에게는 포상금이 지급될 수 있어요. 신고 내용이 사실로 확인되면 부정수급자에게 전액 환수와 추가 제재가 적용돼요." },
  ],
};

type Sel = Record<string, string>;

function getResult(sel: Sel): string | null {
  const { contract, situation } = sel;
  if (!contract || !situation) return null;
  if (contract === "regular" && situation === "normal") return "regular_normal";
  if (contract === "regular" && situation === "minalwage") return "regular_minalwage";
  if (contract === "regular" && situation === "special") return "regular_special";
  if (contract === "irregular" && situation === "normal") return "irregular_normal";
  if (contract === "irregular" && situation === "minalwage") return "irregular_minalwage";
  return "irregular_special";
}

export default function Article114() {
  const [sel, setSel] = useState<Sel>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const toc = [
    { t: "STEP 01 내 상황 신청 가능 여부 확인", sub: "계약 형태 · 특이 상황" },
    { t: "대지급금 일부만 지급되는 사유", sub: "상한 초과 · 항목 불인정 · 기간 문제" },
    { t: "대지급금 지급 거부 사유", sub: "근로자성 불인정 · 기한 초과" },
    { t: "부정수급 제재 기준", sub: "전액 환수 · 추가 징수" },
    { t: "특수상황 처리 방법", sub: "최저임금 미달 · 구두 계약 · 특수고용" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "노동·임금", "체불임금", "대지급금"]}
      tags={["2026년 최신", "대지급금", "부정수급"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>대지급금 일부만 받거나 거부당하면 이유를 정확히 알아야 해요. <B>상한 초과</B>인지, <B>항목 불인정</B>인지, <B>기한 초과</B>인지에 따라 대응 방법이 달라요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법·근로복지공단", date: "2026.02" }}
      stickyLabel="부정수급 제재"
      stickyValue="전액 환수 + 동일 금액 추가 징수"
      stickyBtn="근로복지공단 문의"
      stickyHref="https://www.comwel.or.kr"
      disclaimer="이 글은 임금채권보장법과 근로복지공단 공식 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA items={[
            { icon: "📞", title: "근로복지공단 1588-0075", sub: "대지급금 처리 문의", href: "https://www.comwel.or.kr", hot: true },
            { icon: "📋", title: "임금체불 진정 접수", sub: "고용노동부 1350", href: "https://www.moel.go.kr" },
            { icon: "⚖️", title: "법률구조공단 무료 상담", sub: "특수고용 근로자성 판단", href: "https://www.klac.or.kr" },
          ]} />
          <SidebarDocs items={[
            { title: "간이대지급금 지급액 상한액", cat: "임금·체불", href: "/w/간이대지급금-지급액-상한액" },
            { title: "대지급금 불복 구제 절차", cat: "임금·체불", href: "/w/대지급금-불복-구제-절차-공인노무사-비용" },
            { title: "대지급금 연차 상여금 계산", cat: "임금·체불", href: "/w/대지급금-금액-계산-연차-상여금" },
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
        q="대지급금 일부만 지급된다고 했어요. 왜 그런 건가요?"
        a="상한 초과, 항목 불인정, 기간 문제 등 여러 이유가 있어요. 내 계약 형태와 상황을 선택하면 이유를 알 수 있어요."
        label="사유 확인"
        href="#checker"
      />

      {/* STEP 01 */}
      <Sec n="01" id="checker" title="STEP 01 내 상황 신청 가능 여부 확인" sub="계약 형태 · 특이 상황">
        <CheckerShell title="내 상황에서 대지급금 전액 받을 수 있나요?" sub="30초 확인">
          <CheckerQ
            n="1"
            label="근로 형태가 어떻게 되나요?"
            group="contract"
            opts={[
              ["regular", "정식 근로계약서가 있어요"],
              ["irregular", "계약서 없이 구두 계약이었어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="특이 상황이 있나요?"
            group="situation"
            opts={[
              ["normal", "일반적인 체불 상황이에요"],
              ["minalwage", "받은 임금이 최저임금보다 낮았어요"],
              ["special", "특수고용(프리랜서 등)이었어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          {result === "regular_normal" && (
            <ResultPass title="정상 신청 가능해요">
              <P>근로계약서가 있는 일반 체불이라면 대지급금 신청 요건이 충족돼요. 한도 내 전액 지급받을 수 있어요. 체불확인서 발급 후 근로복지공단에 신청하면 돼요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "신청 요건", pass: true, desc: "계약서 + 일반 체불" },
                { icon: "✅", name: "전액 지급", pass: true, desc: "한도 내 전액" },
                { icon: "📋", name: "체불확인서", pass: true, desc: "고용센터 발급" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 신청" desc="체불확인서로 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "regular_minalwage" && (
            <ResultPass title="최저임금으로 보정해서 받을 수 있어요">
              <P>최저임금보다 낮은 임금을 받았다면 실제 받아야 할 최저임금액으로 보정해서 대지급금이 지급돼요. 계약서에 적힌 금액보다 높은 금액이 인정될 수 있어요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "최저임금 보정", pass: true, desc: "법정 최저임금 적용" },
                { icon: "💰", name: "더 많이 받음", pass: true, desc: "계약서 금액보다 높을 수 있음" },
                { icon: "📋", name: "신청 방법", pass: true, desc: "보정 사실 명시 필수" },
              ]} />
              <ResultCTA icon="💰" title="근로복지공단 신청" desc="최저임금 보정 신청" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "regular_special" && (
            <ResultFail title="특수고용이면 근로자성 인정이 관건이에요">
              <P>특수고용직(프리랜서, 플랫폼 노동자 등)은 근로기준법상 근로자로 인정받아야 대지급금을 신청할 수 있어요. 고용노동부에서 근로자성 판단을 먼저 받아야 해요.</P>
              <ResultGrid items={[
                { icon: "⚠️", name: "근로자성", pass: false, desc: "인정 필요" },
                { icon: "⚖️", name: "노동위원회", pass: true, desc: "근로자성 판단 신청" },
                { icon: "📞", name: "전문가 상담", pass: true, desc: "공인노무사 도움 추천" },
              ]} />
              <ResultCTA icon="📞" title="고용노동부 진정 접수" desc="근로자성 확인 신청" href="https://www.moel.go.kr" />
            </ResultFail>
          )}
          {result === "irregular_normal" && (
            <ResultFail title="근로 관계 입증이 먼저 필요해요">
              <P>구두 계약이라도 실제 근로 관계가 있으면 대지급금 신청 가능해요. 다만 근로 관계를 입증해야 해요. 통장 입금 기록, 출퇴근 기록, 문자·카톡 내역, 동료 증언 등을 준비해서 고용노동부에 진정 접수 시 함께 제출하세요.</P>
              <ResultGrid items={[
                { icon: "⚠️", name: "계약서 없음", pass: false, desc: "입증 자료 필요" },
                { icon: "📋", name: "대체 증빙", pass: true, desc: "통장 기록·문자 내역" },
                { icon: "📞", name: "진정 접수", pass: true, desc: "고용노동부 1350" },
              ]} />
              <ResultCTA icon="📞" title="고용노동부 진정 접수" desc="근로 관계 확인 신청" href="https://www.moel.go.kr" />
            </ResultFail>
          )}
          {result === "irregular_minalwage" && (
            <ResultFail title="근로 관계 입증 + 최저임금 보정 동시 필요해요">
              <P>구두 계약 상황에서 최저임금 미달까지 겹쳤어요. 먼저 근로 관계를 입증하고, 동시에 최저임금 미달 사실도 진정에 포함시키세요. 두 가지가 인정되면 최저임금으로 보정된 금액을 대지급금으로 받을 수 있어요.</P>
              <ResultGrid items={[
                { icon: "⚠️", name: "근로 관계", pass: false, desc: "입증 필요" },
                { icon: "⚠️", name: "최저임금 미달", pass: true, desc: "보정 가능" },
                { icon: "📞", name: "진정 접수", pass: true, desc: "두 가지 동시 신청" },
              ]} />
              <ResultCTA icon="📞" title="고용노동부 진정 접수" desc="근로 관계 + 최저임금 동시" href="https://www.moel.go.kr" />
            </ResultFail>
          )}
          {result === "irregular_special" && (
            <ResultFail title="근로자성 인정이 우선이에요">
              <P>특수고용직에 구두 계약까지 겹쳤어요. 근로자성 인정이 가장 먼저예요. 노동위원회나 법원에서 근로자로 인정받은 경우에 한해 대지급금 신청이 가능해요. 전문가 도움을 받는 게 좋아요.</P>
              <ResultGrid items={[
                { icon: "❌", name: "신청 어려움", pass: false, desc: "근로자성 + 계약서 없음" },
                { icon: "⚖️", name: "노동위원회", pass: true, desc: "근로자성 판단 필수" },
                { icon: "📞", name: "전문가 상담", pass: true, desc: "법률구조공단 무료" },
              ]} />
              <ResultCTA icon="⚖️" title="법률구조공단 무료 상담" desc="근로자성 인정 방법 확인" href="https://www.klac.or.kr" />
            </ResultFail>
          )}
          {!result && (
            <ResultFail title="근로 형태를 선택해 주세요">
              <P>계약 형태와 상황을 선택하면 대지급금 신청 가능 여부를 안내해 드려요.</P>
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>
      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="partial" title="대지급금 일부만 지급되는 사유" sub="상한 초과 · 항목 불인정 · 기간 문제">
        <P><B>여러 이유로 체불 전액이 지급되지 않을 수 있어요.</B> 가장 흔한 이유와 각각의 처리 방법을 정리했어요.</P>
        <P>가장 흔한 이유는 상한 초과예요. 간이대지급금 700만원, 도산 대지급금 2,100만원 한도를 초과하면 한도까지만 지급돼요. 초과분은 민사소송이나 파산 배당으로 별도 청구해야 해요.</P>
        <P>항목 불인정도 있어요. 신청한 금액 중 일부가 임금으로 인정되지 않을 수 있어요. 성과급, 경조사비, 실비 보전금 등은 통상임금에서 제외될 수 있어요. 이 경우 해당 항목 금액만큼 지급이 줄어요.</P>
        <P>기간 문제도 있어요. 간이대지급금은 최근 3개월 임금, 퇴직금은 최근 3년 분만 지급해요. 이 기간을 초과하는 체불액은 지급 대상이 아니에요. 근무 기간 인정 문제로 4대 보험 가입 기간과 실제 근무 기간이 다른 경우도 발생해요.</P>

        <H3>대지급금 일부 지급 주요 사유</H3>
        <TableTitle>일부 지급 또는 거부 원인 분류</TableTitle>
        <table>
          <thead><tr>
            <th>사유</th><th>내용</th><th>처리 방법</th>
          </tr></thead>
          <tbody>
            <tr><td>상한 초과</td><td>체불액 초과 (700만/2100만원 한도)</td><td>초과분 민사소송 청구</td></tr>
            <tr><td>항목 불인정</td><td>성과급·경조사비 등 제외</td><td>이의신청 90일 이내</td></tr>
            <tr><td>기간 초과</td><td>3개월/3년 초과분</td><td>전액 초과 → 별도 청구</td></tr>
            <tr><td>근무기간 불인정</td><td>4대보험 vs 실제 기간 차이</td><td>추가 증빙 제출</td></tr>
          </tbody>
        </table>
      </Sec>
      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="reject" title="대지급금 지급 거부 사유" sub="근로자성 불인정 · 기한 초과">
        <P><B>요건 미충족 또는 증거 부족이 주된 이유예요.</B> 공단에서 거부하는 주요 사유들이에요.</P>
        <P>근로자성 불인정이에요. 근로자가 아닌 개인사업자나 특수고용직으로 판단되면 대지급금을 받을 수 없어요. 이 경우 노동위원회나 법원에서 근로자성을 먼저 인정받아야 해요.</P>
        <P>체불 사실 미확인이에요. 체불확인서에 기재되지 않은 금액은 지급 거부 대상이에요. <A href="https://www.moel.go.kr">고용노동부</A> 근로감독관이 체불로 인정하지 않은 항목은 대지급금에 포함되지 않아요.</P>
        <P>신청 기한 초과예요. 간이대지급금은 퇴직 후 1년, 도산 대지급금은 도산 확인 후 2년 이내에 신청해야 해요. 기한을 넘기면 거부돼요. 동일 체불에 대한 중복 신청도 거부 사유예요.</P>
        <InlineLink icon="link" title="근로복지공단 신청 기한 확인" desc="대지급금 처리 기준 안내" href="https://www.comwel.or.kr" />
      </Sec>
      <RelatedMid
        title="대지급금 관련 글도 확인해 보세요"
        items={[
          { icon: "💰", title: "간이대지급금 신청 방법", desc: "체불확인서 발급부터 신청까지", href: "/w/간이대지급금-신청-방법-절차" },
          { icon: "📊", title: "간이대지급금 지급액 상한액", desc: "700만원 한도 항목별 계산", href: "/w/간이대지급금-지급액-상한액" },
          { icon: "📋", title: "대지급금 불복 구제 절차", desc: "거부 시 90일 이내 이의신청", href: "/w/대지급금-불복-구제-절차-공인노무사-비용" },
        ]}
        hubHref="/category/임금"
        hubLabel="체불임금 전체 보기"
      />
      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="fraud" title="부정수급 제재 기준" sub="전액 환수 · 추가 징수">
        <P><B>전액 환수 + 동일 금액 추가 징수예요.</B> 거짓이나 부정한 방법으로 대지급금을 받으면 <A href="https://www.law.go.kr/법령/임금채권보장법">임금채권보장법</A> 위반이에요.</P>
        <P>부정수급 유형이에요. 퇴직하지 않은 상태에서 퇴직한 것처럼 신청하는 경우예요. 체불 금액을 부풀려서 신청하는 경우예요. 실제 근로 관계가 없는데 있는 것처럼 위장하는 경우예요. 이미 임금을 받았는데 못 받은 것처럼 신청하는 경우예요.</P>
        <P>제재 내용이에요. 지급받은 대지급금 전액을 환수해요. 환수 금액과 동일한 금액을 추가 징수해요. 형사 처벌(사기죄 포함) 대상이 될 수 있어요. 사업주와 공모한 경우 사업주도 제재 대상이에요.</P>
        <Info type="warn">{"부정수급 신고자에게는 포상금이 지급될 수 있어요. 근로복지공단(1588-0075)이나 고용노동부(1350)에 신고하면 돼요."}</Info>
      </Sec>
      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="special" title="특수상황 처리 방법" sub="최저임금 미달 · 구두 계약 · 특수고용">
        <P><B>상황마다 처리가 달라요.</B> 특수상황별로 대지급금 신청 가능 여부와 방법이 다르니 맞는 방법을 찾아야 해요.</P>
        <P>최저임금 미달 임금이에요. 실제 지급받은 임금이 최저임금보다 낮았던 경우예요. 이 경우 최저임금액으로 보정해서 체불 금액을 산정해요. 계약서에 적힌 금액보다 높은 금액이 인정될 수 있어요. 근로복지공단 담당자에게 최저임금 미달 사실을 명시해서 신청하세요.</P>
        <P>구두 계약 상황이에요. 서면 계약서가 없어도 근로 관계가 입증되면 신청 가능해요. 통장 입금 내역, 출퇴근 기록, 동료 증언 등이 근거가 돼요. 고용노동부에서 근로 관계를 인정해주면 체불확인서 발급이 가능해요.</P>
        <P>특수고용직 상황이에요. 플랫폼 노동자, 학습지 교사 등은 근로기준법상 근로자성이 문제예요. 노동위원회나 법원에서 근로자로 인정받은 경우에 한해 대지급금 신청이 가능해요. 사전에 공인노무사 상담을 받는 게 좋아요.</P>

        <ExtBtn badge="근로복지공단 공식" text="대지급금 신청 및 처리 안내" cta="문의하기 →" href="https://www.comwel.or.kr" />
      </Sec>
      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "간이대지급금 지급액 상한액", desc: "700만원 한도 항목별 계산 방법", href: "/w/간이대지급금-지급액-상한액" },
        { title: "대지급금 불복 구제 절차", desc: "거부 후 90일 이내 이의신청 방법", href: "/w/대지급금-불복-구제-절차-공인노무사-비용" },
        { title: "대지급금 임금채권 우선변제 차이", desc: "대위권과 변제 순위 구조 이해", href: "/w/대지급금-임금채권-우선변제-차이" },
        { title: "대지급금 금액 계산 연차 상여금", desc: "통상임금 포함 여부 기준 정리", href: "/w/대지급금-금액-계산-연차-상여금" },
        { title: "파견근로자 2년 후 직접 고용", desc: "파견 기간 만료 후 전환 의무 기준", href: "/w/파견근로자-2년-후-고용" },
      ]} />
      <PrevNext
        prev={{ title: "대지급금 임금채권 우선변제 차이", href: "/w/대지급금-임금채권-우선변제-차이" }}
        next={{ title: "도산대지급금 상한액 지급액 계산", href: "/w/도산대지급금-상한액-지급액-계산" }}
      />
    </BlogLayout>
  );
}
