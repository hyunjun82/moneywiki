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
  title: "대지급금 금액 계산 방법 | 연차 상여금 통상임금 포함 여부",
  description:
    "대지급금 신청 시 연차수당이나 상여금도 포함되는지 궁금하신가요? 통상임금 포함 여부와 항목별 계산 예시를 알려드려요.",
  category: "임금",
  keywords: [
    "대지급금 통상임금 고정성 정기성 판단",
    "대지급금 연차수당 상여금 포함 항목",
    "체불확인서 연차 상여금 항목 기재",
    "대지급금 통상임금 분쟁 노동위원회 처리",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "연차수당은 거의 항상 대지급금에 포함 — 미사용 연차 일수 × 1일 통상임금",
    "고정·정기 지급 상여금은 통상임금 해당 → 대지급금 산정 기준에 포함",
    "체불확인서 작성 시 항목별로 구분해 기재해야 나중에 누락 방지",
  ],
  sources: [
    { name: "임금채권보장법 - 대지급금 대상 임금", url: "https://www.law.go.kr/법령/임금채권보장법", date: "2026-02" },
    { name: "고용노동부 통상임금 판단 기준", url: "https://www.moel.go.kr", date: "2026-02" },
  ],
  faq: [
    { q: "대지급금 금액 계산 시 퇴직금 산정 기준은 무엇인가요?", a: "퇴직 전 3개월 평균임금 기준이에요. 평균임금에는 기본급, 통상적으로 지급된 상여금, 연차수당 등이 포함돼요. 항목이 누락되지 않도록 체불 진정 시 전체 임금 명세를 제출하는 게 중요해요." },
    { q: "대지급금 계산 연차수당이 소멸됐으면 포함이 안 되나요?", a: "연차수당 청구권이 소멸(3년 소멸시효)하지 않았다면 포함 가능해요. 퇴직 시점 기준 미사용 연차에 대한 수당이 체불됐다면 대지급금 신청 항목에 포함시킬 수 있어요." },
  ],
};

type Sel = Record<string, string>;

function getResult(sel: Sel): string | null {
  const { type, method } = sel;
  if (!type || !method) return null;
  if (type === "annual") return "annual_ok";
  if (type === "bonus" && method === "fixed") return "bonus_fixed";
  return "bonus_variable";
}

export default function Article111() {
  const [sel, setSel] = useState<Sel>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const toc = [
    { t: "STEP 01 연차·상여금 포함 여부 확인", sub: "수당 종류 · 지급 방식" },
    { t: "통상임금 포함 기준", sub: "고정성·정기성·일률성 세 가지" },
    { t: "연차 상여금 항목별 계산 예시", sub: "연차수당 공식 · 상여금 산정" },
    { t: "체불확인서에 연차 상여금 기재 방법", sub: "항목 구분 · 증빙 서류" },
    { t: "통상임금 분쟁 처리 노동위원회", sub: "분쟁 판단 · 법원 기준" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "노동·임금", "체불임금", "대지급금"]}
      tags={["2026년 최신", "통상임금", "대지급금"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>대지급금 신청 시 기본급만 되는 게 아니에요. <B>연차수당은 거의 항상</B> 포함되고, <B>고정 상여금</B>도 통상임금으로 인정돼요. 항목별 계산 방법을 정리했어요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법·고용노동부", date: "2026.02" }}
      stickyLabel="통상임금 기준"
      stickyValue="고정성·정기성·일률성"
      stickyBtn="고용노동부 진정 접수"
      stickyHref="https://www.moel.go.kr"
      disclaimer="이 글은 임금채권보장법·고용노동부 자료와 2013년 대법원 전원합의체 판결을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA items={[
            { icon: "📋", title: "임금체불 진정 접수", sub: "연차·상여금 포함 전체 신고", href: "https://www.moel.go.kr", hot: true },
            { icon: "💰", title: "간이대지급금 신청", sub: "근로복지공단 체당금 접수", href: "https://www.comwel.or.kr" },
            { icon: "📞", title: "고용노동부 1350 상담", sub: "통상임금 판단 문의", href: "https://www.moel.go.kr" },
          ]} />
          <SidebarDocs items={[
            { title: "간이대지급금 신청 방법", cat: "임금·체불", href: "/w/간이대지급금-신청-방법-절차" },
            { title: "간이대지급금 상한액 계산", cat: "임금·체불", href: "/w/간이대지급금-지급액-상한액" },
            { title: "퇴직금 지연이자 계산", cat: "퇴직·임금", href: "/w/퇴직급여-지급-지연이자-받기" },
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
        q="연차수당이랑 상여금도 대지급금에 포함되나요?"
        a="기본급만이 아니에요. 통상임금에 해당하는 수당은 모두 포함돼요. 아래에서 내 수당이 해당되는지 확인해 보세요."
        label="포함 여부 확인"
        href="#checker"
      />

      {/* STEP 01 */}
      <Sec n="01" id="checker" title="STEP 01 연차·상여금 포함 여부 확인" sub="수당 종류 · 지급 방식">
        <CheckerShell title="내 대지급금에 연차·상여금이 포함되나요?" sub="30초 확인">
          <CheckerQ
            n="1"
            label="포함 여부가 궁금한 수당이 무엇인가요?"
            group="type"
            opts={[
              ["annual", "연차수당이에요"],
              ["bonus", "상여금이에요"],
            ]}
            sel={sel}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="해당 수당이 어떻게 지급됐나요?"
            group="method"
            opts={[
              ["fixed", "매달 또는 정기적으로 고정 지급됐어요"],
              ["variable", "성과나 상황에 따라 달라졌어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          {result === "annual_ok" && (
            <ResultPass title="연차수당은 대지급금에 포함돼요">
              <P>퇴직 시 미사용 연차에 대한 연차수당은 임금이에요. 대지급금 신청 시 포함할 수 있어요. 연차 발생 기준(1년 개근 15일 등)과 미사용 일수를 계산해서 체불 진정 시 항목에 명시하세요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "연차수당", pass: true, desc: "임금 → 포함 가능" },
                { icon: "📋", name: "계산 공식", pass: true, desc: "미사용 일수×1일 통상임금" },
                { icon: "📝", name: "기재 필수", pass: true, desc: "체불확인서에 항목 명시" },
              ]} />
              <ResultCTA icon="📋" title="고용노동부 진정 접수" desc="연차수당 포함해서 체불 신고" href="https://www.moel.go.kr" />
            </ResultPass>
          )}
          {result === "bonus_fixed" && (
            <ResultPass title="고정 정기 상여금은 통상임금에 포함돼요">
              <P>매달 또는 정기적으로 고정 지급된 상여금은 통상임금에 해당해요. 대지급금 산정 기준에 포함돼요. 취업규칙이나 근로계약서에 지급 조건이 명시됐다면 더욱 명확하게 인정돼요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "고정 상여금", pass: true, desc: "통상임금 해당" },
                { icon: "✅", name: "대지급금 포함", pass: true, desc: "산정 기준 포함" },
                { icon: "📋", name: "증빙 서류", pass: true, desc: "급여명세서·계약서" },
              ]} />
              <ResultCTA icon="📋" title="고용노동부 진정 접수" desc="상여금 포함해서 체불 신고" href="https://www.moel.go.kr" />
            </ResultPass>
          )}
          {result === "bonus_variable" && (
            <ResultFail title="성과 연동 상여금은 포함이 안 될 수 있어요">
              <P>실적이나 성과에 따라 달라지는 상여금은 통상임금에 해당하지 않아요. 지급 조건에 추가 조건 충족 여부가 있다면 통상임금 제외예요. 하지만 이미 지급 결정이 된 미지급 성과급이라면 임금 체불로 별도 청구할 수 있어요.</P>
              <ResultGrid items={[
                { icon: "⚠️", name: "성과 상여금", pass: false, desc: "통상임금 제외 가능" },
                { icon: "📋", name: "별도 청구", pass: true, desc: "지급 결정분은 가능" },
                { icon: "📞", name: "상담 권장", pass: true, desc: "고용노동부 문의" },
              ]} />
              <ResultCTA icon="📞" title="고용노동부 상담" desc="임금 항목 판단 문의" href="https://www.moel.go.kr" />
            </ResultFail>
          )}
          {!result && (
            <ResultFail title="수당 종류를 선택해 주세요">
              <P>수당 종류와 지급 방식을 선택하면 대지급금 포함 여부를 안내해 드려요.</P>
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>
      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="standard" title="통상임금 포함 기준" sub="고정성·정기성·일률성 세 가지">
        <P><B>고정성·정기성·일률성 세 가지가 기준이에요.</B> 대법원이 통상임금 판단에서 일관되게 적용하는 기준이에요. <A href="https://www.law.go.kr/법령/임금채권보장법">임금채권보장법</A>에서 "임금"으로 인정되는 항목이면 모두 대지급금 신청 대상이에요.</P>
        <P>고정성은 조건 없이 반드시 지급된다는 의미예요. 결근이나 성과와 무관하게 매번 지급된다면 고정성이 있어요. 정기성은 정해진 주기(월, 분기, 연간)에 지급된다는 의미예요. 일률성은 모든 근로자 또는 일정 범주의 근로자에게 동일하게 지급된다는 의미예요.</P>
        <P>기본급은 당연히 포함돼요. 직책수당, 근속수당, 직무수당처럼 고정적으로 지급되는 수당도 포함돼요. 매월 고정 지급되는 상여금(기본급의 몇 %)도 포함돼요.</P>
        <P>포함되지 않는 항목들이에요. 실적에 따라 달라지는 성과급, 부정기적으로 지급되는 격려금, 특정 조건 충족 시에만 지급되는 수당, 경조사비·복지포인트·선택적 복리후생 항목은 통상임금 제외예요.</P>

        <H3>통상임금 포함 여부 정리</H3>
        <TableTitle>대지급금 산정 시 통상임금 포함 항목</TableTitle>
        <table>
          <thead><tr>
            <th>항목</th><th>통상임금 해당</th><th>이유</th>
          </tr></thead>
          <tbody>
            <tr><td>기본급</td><td>포함</td><td>고정·정기·일률 모두 충족</td></tr>
            <tr><td>직책·근속수당</td><td>포함</td><td>고정 지급</td></tr>
            <tr><td>고정 월 상여금</td><td>포함</td><td>정기 고정 지급</td></tr>
            <tr><td>미사용 연차수당</td><td>포함</td><td>퇴직 시 임금 의무</td></tr>
            <tr><td>성과급·인센티브</td><td>미포함</td><td>조건부·변동 지급</td></tr>
            <tr><td>복지포인트·경조사비</td><td>미포함</td><td>임금 성격 아님</td></tr>
          </tbody>
        </table>
      </Sec>
      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="calc" title="연차 상여금 항목별 계산 예시" sub="연차수당 공식 · 상여금 산정">
        <P><B>항목마다 계산 방식이 달라요.</B> 연차수당과 상여금은 각각 기준이 있어요.</P>
        <P>연차수당 계산이에요. 미사용 연차 일수 × 1일 통상임금이에요. 1년 이상 계속 근무하면 연 15일 이상의 연차가 발생해요. 예를 들어 미사용 연차 5일, 1일 통상임금 8만원이면 연차수당 체불액은 40만원이에요. 퇴직 시 미사용 연차 전부에 대해 수당을 받을 수 있어요.</P>
        <P>고정 상여금 계산이에요. 약정 상여금 금액 그대로예요. 월 상여금 50만원을 3개월 못 받았다면 체불액은 150만원이에요. 이 금액을 체불 임금에 포함해서 진정 접수 시 명시하면 돼요.</P>
        <P>퇴직금 계산에서 연차수당·상여금이 영향을 미쳐요. 퇴직 전 3개월 평균임금에 연차수당(월 할 계산)과 상여금이 포함되면 평균임금이 높아지고 퇴직금도 늘어나요. 퇴직금 체불이 있다면 이 부분도 정확히 계산해서 신청하는 게 중요해요.</P>

        <H3>체불 임금 항목 계산 예시</H3>
        <TableTitle>항목별 계산 예시 (월 통상임금 250만원 기준)</TableTitle>
        <table>
          <thead><tr>
            <th>항목</th><th>계산식</th><th>체불액</th>
          </tr></thead>
          <tbody>
            <tr><td>기본급 3개월</td><td>200만원 × 3개월</td><td>600만원</td></tr>
            <tr><td>고정 상여금 3개월</td><td>50만원 × 3개월</td><td>150만원</td></tr>
            <tr><td>미사용 연차 5일</td><td>(250만원÷21일) × 5일</td><td>약 59만원</td></tr>
            <tr><td>합계 (간이대지급금 상한 적용)</td><td>—</td><td>700만원 한도</td></tr>
          </tbody>
        </table>
        <TableNote>1일 통상임금 = 월 통상임금 ÷ 월 소정근로일수(통상 21일)</TableNote>
      </Sec>

      <RelatedMid
        items={[
          { icon: "📋", title: "간이대지급금 신청 방법", desc: "체불확인서 발급부터 근로복지공단 신청까지", href: "/w/간이대지급금-신청-방법-절차" },
          { icon: "💰", title: "간이대지급금 상한액 계산", desc: "700만원 초과 시 소송 처리 방법", href: "/w/간이대지급금-지급액-상한액" },
        ]}
        hubHref="/w/실업급여"
        hubLabel="실업급여 허브 → 전체 내용 보기"
      />
      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="form" title="체불확인서에 연차 상여금 기재 방법" sub="항목 구분 · 증빙 서류">
        <P><B>항목별로 구분해서 적어야 해요.</B> 체불 진정 접수 시 체불 임금 내역을 상세히 기재해야 해요. 처음에 빠뜨린 항목은 나중에 추가하기 어려울 수 있어요.</P>
        <P>임금 진정서 작성 방법이에요. 기본급, 상여금, 각종 수당, 연차수당을 항목별로 따로 적어요. 월별로 체불된 금액을 정리하면 더 명확해요. 급여명세서나 통장 거래 내역이 있으면 함께 제출하세요.</P>
        <P>증빙 서류를 준비해두면 유리해요. 급여명세서(체불 전 수령분), 근로계약서(상여금 조항 포함), 취업규칙(연차·상여 관련 조항)이 있으면 체불 인정이 빠르게 돼요. 없더라도 4대 보험 납부 기록, 문자·카카오톡 내역으로 보완할 수 있어요.</P>
        <P>고용노동부 근로감독관이 체불 임금을 확정하는 과정에서 항목별로 검토해요. 진정 접수 전에 체불된 금액 전체를 꼼꼼히 정리하는 게 중요해요. 고용노동부 1350으로 사전 상담을 받으면 준비가 훨씬 수월해요.</P>
      </Sec>
      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="dispute" title="통상임금 분쟁 처리 노동위원회" sub="분쟁 판단 · 법원 기준">
        <P><B>노동위원회 또는 법원이 최종 판단해요.</B> 회사와 근로자 사이에 통상임금 판단이 다르면 분쟁으로 이어질 수 있어요.</P>
        <P>통상임금 분쟁의 핵심은 대부분 상여금이에요. 회사는 "성과 연동이라 통상임금 아니다"라고 주장하고, 근로자는 "사실상 고정 지급됐다"고 주장하는 경우가 많아요. 이런 경우 실제 지급 기록(급여명세서, 통장 내역)이 결정적 증거가 돼요.</P>
        <P>고용노동부 진정을 통해 판단을 받을 수 있어요. 근로감독관이 통상임금 해당 여부를 판단해서 체불 금액을 확정해요. 이 판단에 불복하면 노동위원회나 법원에서 다툴 수 있어요.</P>
        <P>법원 판결 기준은 2013년 대법원 전원합의체 판결 이후 안정됐어요. 정기적·고정적·일률적 지급 여부가 핵심 기준이에요. 이 기준에 맞는다면 회사가 부인해도 통상임금으로 인정돼요.</P>

        <InlineLink
          icon="💰"
          title="간이대지급금 상한액 계산"
          desc="연차·상여 포함 금액이 700만원 넘으면 확인하세요"
          href="/w/간이대지급금-지급액-상한액"
        />

        <ExtBtn
          badge="고용노동부 공식"
          text="통상임금 판단 기준 및 임금체불 신고"
          cta="바로가기 →"
          href="https://www.moel.go.kr"
        />
      </Sec>
      <Divider />

      <FAQAccordion items={meta.faq.map((f) => ({ q: f.q, a: f.a }))} />
      <RelatedArticles items={[
        { title: "간이대지급금 신청 방법", desc: "체불확인서 발급부터 근로복지공단 신청까지", href: "/w/간이대지급금-신청-방법-절차" },
        { title: "간이대지급금 상한액 계산", desc: "임금·퇴직금 합산 700만원 초과 시 처리 방법", href: "/w/간이대지급금-지급액-상한액" },
      ]} />
      <PrevNext
        prev={{ title: "간이대지급금 지급액 상한액", href: "/w/간이대지급금-지급액-상한액" }}
        next={{ title: "실업급여 관련 글 보기", href: "/w/실업급여" }}
      />
    </BlogLayout>
  );
}
