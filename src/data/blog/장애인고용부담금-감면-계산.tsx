"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "장애인고용부담금 감면 계산 방법 | 연계고용 부담기초액 기준",
  description:
    "장애인 직접 고용이 어려워도 연계고용으로 부담금을 최대 50%까지 줄일 수 있어요. 2026년 부담기초액 월 1,280,800원 기준 계산 방법과 감면 신청 절차를 정리했어요.",
  category: "기업·고용",
  keywords: [
    "장애인고용부담금 기본 계산 방법",
    "연계고용 부담금 감면 신청",
    "장애인고용 부담금 감면 한도 기준",
    "장애인고용부담금 납부 신고 기한",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "2026년 부담기초액은 월 1,280,800원이에요 (상시 100명 이상 사업장 납부 의무)",
    "연계고용으로 장애인 표준사업장 제품 구매 시 부담금 최대 50%까지 감면돼요",
    "매년 1월 31일까지 한국장애인고용공단에 신고하고 납부해야 해요",
  ],
  sources: [
    {
      name: "장애인고용촉진 및 직업재활법",
      url: "https://www.law.go.kr/법령/장애인고용촉진및직업재활법",
      date: "2026-02",
    },
    {
      name: "한국장애인고용공단 부담금 안내",
      url: "https://www.kead.or.kr",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "장애인고용부담금 감면 신청은 언제까지 해야 하나요?",
      a: "연계고용 실적을 반영한 부담금 신고는 매년 1월 31일까지예요. 전년도 고용 현황과 연계고용 실적을 합산해서 신고하면 감면이 적용돼요. 기한을 넘기면 가산세가 붙어요.",
    },
    {
      q: "장애인고용부담금 부담기초액은 매년 바뀌나요?",
      a: "네, 매년 최저임금 인상을 반영해서 조정돼요. 2026년 기준 월 1,280,800원이에요. 직전년도 납부 실적에 따라 60~90%로 차등 적용되는 경우도 있어요.",
    },
  ],
  ctaCard: {
    label: "부담금 계산",
    mainText: "장애인고용부담금 자동 계산",
    subText: "고용인원·부담기초액 입력하면 바로",
    url: "https://www.kead.or.kr",
    external: true,
  },
  relatedDocs: [
    { title: "퇴직금 지연이자 계산", url: "/w/퇴직급여-지급-지연이자-받기" },
    { title: "파견근로자 2년 후 고용", url: "/w/파견근로자-2년-후-고용" },
    { title: "간이대지급금 신청 방법", url: "/w/간이대지급금-신청-방법-절차" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;

function getResult(a: Ans): React.ReactNode | null {
  if (!a.size || !a.hire || !a.linked || !a.history) return null;

  if (a.size === "under100") {
    return (
      <ResultPass title="100명 미만이면 부담금 납부 의무 없어요" desc="상시 근로자 100명 미만 사업장은 장애인고용부담금 납부 대상이 아니에요. 장애인을 고용하면 고용장려금 지원을 받을 수 있으니 공단에 문의해보세요.">
        <ResultGrid items={[
          { icon: "👥", name: "사업장 규모", pass: true, desc: "100명 미만 — 의무 없음" },
          { icon: "💰", name: "부담금", pass: true, desc: "납부 의무 없음" },
          { icon: "🎯", name: "고용장려금", pass: true, desc: "장애인 고용 시 지원 가능" },
        ]} />
        <ResultCTA icon="📋" title="한국장애인고용공단" desc="고용장려금 안내" href="https://www.kead.or.kr" />
      </ResultPass>
    );
  }

  if (a.hire === "met") {
    return (
      <ResultPass title="의무 비율 충족 시 부담금 없어요" desc="의무고용률(2026년 3.1%) 이상을 채우면 부담금이 없어요. 오히려 초과 고용 시 고용장려금을 받을 수 있어요.">
        <ResultGrid items={[
          { icon: "👥", name: "사업장 규모", pass: true, desc: "100명 이상" },
          { icon: "♿", name: "의무 비율", pass: true, desc: "3.1% 이상 충족" },
          { icon: "💰", name: "부담금", pass: true, desc: "납부 의무 없음" },
        ]} />
      </ResultPass>
    );
  }

  if (a.linked === "yes") {
    return (
      <ResultFail title="부담금 발생하지만 연계고용으로 최대 50% 감면 가능해요" desc="미달 인원 × 월 1,280,800원 × 12개월로 계산한 부담금에서, 연계고용 실적만큼 최대 50%까지 감면받을 수 있어요.">
        <ResultGrid items={[
          { icon: "♿", name: "의무 비율", pass: false, desc: "3.1% 미달" },
          { icon: "🔗", name: "연계고용", pass: true, desc: "감면 적용 가능" },
          { icon: "💰", name: "감면 한도", pass: true, desc: "최대 50% 감면" },
        ]} />
        <ResultCTA icon="📋" title="한국장애인고용공단" desc="연계고용 감면 신청" href="https://www.kead.or.kr" />
        <ResultCTA icon="🔢" title="부담금 계산 방법" desc="공식 적용 예시 확인" href="#formula" />
      </ResultFail>
    );
  }

  return (
    <ResultFail title="부담금 납부 대상이에요" desc="미달 인원 × 월 1,280,800원 × 12개월이 납부 금액이에요. 연계고용 제도를 활용하면 최대 50%까지 감면 가능해요. 매년 1월 31일까지 신고해야 해요.">
      <ResultGrid items={[
        { icon: "♿", name: "의무 비율", pass: false, desc: "3.1% 미달" },
        { icon: "🔗", name: "연계고용", pass: false, desc: "미활용" },
        { icon: "📅", name: "신고 기한", pass: true, desc: "매년 1월 31일" },
      ]} />
      <ResultCTA icon="📋" title="한국장애인고용공단" desc="부담금 신고·감면 신청" href="https://www.kead.or.kr" />
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article105() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "기업·고용", "장애인고용", "부담금"]}
      tags={["2026년 최신", "기업", "장애인고용"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>장애인 직접 고용이 어려우신가요? <B>연계고용 제도</B>를 활용하면 부담금을 최대 <B>50%까지 감면</B>받을 수 있어요. 2026년 부담기초액 기준 계산 방법을 정리했어요.</>}
      sourceBar={{ badge: "법제처", name: "장애인고용촉진법·한국장애인고용공단", date: "2026.02" }}
      stickyLabel="2026 부담기초액"
      stickyValue="월 1,280,800원"
      stickyBtn="부담금 계산"
      disclaimer="이 글은 장애인고용촉진 및 직업재활법·한국장애인고용공단 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "♿", title: "한국장애인고용공단", sub: "부담금 신고·감면 신청", href: "https://www.kead.or.kr", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "퇴직금 지연이자 계산", cat: "퇴직·임금", href: "/w/퇴직급여-지급-지연이자-받기" },
          { title: "파견근로자 2년 후 고용", cat: "노동·고용", href: "/w/파견근로자-2년-후-고용" },
          { title: "간이대지급금 신청 방법", cat: "임금·체불", href: "/w/간이대지급금-신청-방법-절차" },
          { title: "야유회 사고 산재보상", cat: "산재·보상", href: "/w/야유회-사고-산재보상-받기" },
          { title: "학력 위조 해고 정당성", cat: "노동·해고", href: "/w/학력-거짓-해고-정당성" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
          { title: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
          { title: "대출이자 계산기", href: "/w/대출이자-계산기" },
        ]} />
      </>}
    >
      <TOC items={[
        { t: "우리 회사 장애인고용부담금 얼마예요?", sub: "사업장 규모 · 고용 현황 · 연계고용" },
        { t: "장애인고용부담금은 어떻게 계산하나요?", sub: "부담기초액 · 미달 인원 · 계산 공식" },
        { t: "연계고용 부담금 감면은 어떻게 받나요?", sub: "표준사업장 구매 · 도급 방식 · 감면 신청" },
        { t: "장애인고용 부담금 감면 한도 기준이 얼마인가요?", sub: "최대 50% · 부담기초액 차등 · 가중치" },
        { t: "장애인고용부담금 납부 신고 기한은 언제예요?", sub: "1월 31일 · 가산세 · 분할납부" },
        { t: "자주 묻는 질문", sub: "감면 신청 기한 · 부담기초액 변동" },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="우리 회사 장애인고용부담금 얼마예요?" sub="사업장 규모 · 고용 현황 · 연계고용">
        <CheckerShell title="장애인고용부담금 납부 여부 확인" sub="30초 확인" desc="상시 근로자 수와 장애인 고용 현황을 선택하면 부담금 여부를 알려드려요.">
          <CheckerQ n="1" label="상시 근로자 수가 어떻게 되나요?" group="size"
            opts={[["under100","100명 미만이에요"],["over100","100명 이상이에요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="현재 장애인 고용 상황이 어떻게 되나요?" group="hire"
            opts={[["met","의무 비율(3.1%) 이상 고용 중이에요"],["short","의무 비율에 못 미치게 고용 중이에요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="연계고용 실적이 있나요?" group="linked"
            opts={[["yes","장애인 표준사업장 제품 구매 등 실적 있어요"],["no","아직 없어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="최근 3년간 부담금 납부 실적이 있나요?" group="history"
            opts={[["yes","납부 실적 있어요"],["no","없거나 모르겠어요"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="고용 관련 법적 의무 위반 시 불이익이 궁금하시죠?"
        a="퇴직금 지급 지연에도 연 20% 이자가 붙어요. 임금·퇴직금 지급 기한을 꼭 확인하세요."
        label="퇴직금 지연이자 확인"
        href="/w/퇴직급여-지급-지연이자-받기"
      />

      <Divider />

      {/* ───── SECTION 02: 계산 방법 ───── */}
      <Sec n="SECTION 02" id="formula" title="장애인고용부담금은 어떻게 계산하나요?" sub="부담기초액 · 미달 인원 · 계산 공식">
        <P><A href="https://www.law.go.kr/법령/장애인고용촉진및직업재활법">장애인고용촉진 및 직업재활법</A>에 따라 상시 근로자 100명 이상 사업장은 전체 근로자의 <B>3.1% 이상</B>을 장애인으로 고용해야 해요. 이 비율에 미달하면 부담금을 납부해야 해요.</P>

        <FormulaCard
          formula="부담금 = 미달 인원 × 부담기초액(월 1,280,800원) × 12개월"
          notes={[
            "미달 인원 = 의무 고용 인원 - 실제 고용 인원",
            "의무 고용 인원 = 상시 근로자 수 × 3.1% (소수점 버림)",
            "2026년 부담기초액: 월 1,280,800원 (매년 최저임금 연동 조정)",
          ]}
        />

        <P>계산 예시를 들면 이래요. 상시 근로자 200명인 회사에서 의무 고용 인원은 6.2명 → 6명이에요. 실제 2명을 고용했다면 미달 인원은 4명이에요. 부담금 = 4명 × 1,280,800원 × 12개월 = 연 <B>61,478,400원</B>이에요.</P>
        <P>연계고용 감면을 50% 받으면 실제 납부액은 약 3,074만원으로 줄어요. 납부 실적에 따라 부담기초액이 60~80%로 차등 적용되는 경우도 있어서, 정확한 금액은 <A href="https://www.kead.or.kr">한국장애인고용공단</A>에서 확인해야 해요.</P>

        <CaseBox
          badge="계산 사례"
          label="상시 200명 사업장"
          conditions={["상시 근로자 200명", "실제 장애인 고용 2명 (의무 6명)", "연계고용 실적: 3천만원 (감면 한도 50% 내)"]}
          steps={[
            "미달 인원: 6 - 2 = 4명",
            "원래 부담금: 4 × 1,280,800 × 12 = 61,478,400원",
            "연계고용 감면: 61,478,400원의 50% = 30,739,200원",
            "실제 납부액: 61,478,400 - 30,739,200 = 30,739,200원",
          ]}
          total="연 납부액 약 3,074만원"
          result="연계고용 적극 활용 시 절반 절감"
          pass={true}
        />

        <InlineLink icon="⚖️" title="퇴직금 지연이자 계산" desc="고용 의무 위반 시 지연이자 계산법" href="/w/퇴직급여-지급-지연이자-받기" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 연계고용 감면 ───── */}
      <Sec n="SECTION 03" id="linked-employment" title="연계고용 부담금 감면은 어떻게 받나요?" sub="표준사업장 구매 · 도급 방식 · 감면 신청">
        <P><A href="https://www.law.go.kr/법령/장애인고용촉진및직업재활법">장애인고용촉진 및 직업재활법</A> 제33조의2에 따라 연계고용 실적만큼 부담금을 감면해줘요. 장애인을 직접 고용하기 어려운 사업장에 현실적인 대안이에요.</P>

        <H3>연계고용 인정 방식</H3>
        <P>두 가지 방식이 있어요. 첫째, <B>장애인 표준사업장·중증장애인 직업재활시설</B>에서 물품이나 용역을 구매하는 방식이에요. 구매 금액의 일정 비율을 부담금에서 감면해줘요. 둘째, <B>도급 계약</B>으로 장애인 근로자를 일정 비율 이상 사용하는 방식이에요.</P>

        <H3>연계고용 신청 절차</H3>
        <P>먼저 <A href="https://www.kead.or.kr">한국장애인고용공단</A>에서 연계고용 확인서를 발급받아야 해요. 이 확인서를 기반으로 부담금 신고서에 연계고용 실적을 기재해요. 온라인(공단 홈페이지)과 오프라인(지역 공단 지사) 모두 신청 가능해요.</P>
        <P>준비 서류는 장애인 고용 현황 확인서, 연계고용 거래 계약서 및 세금계산서, 연계고용 확인서(공단 발급)예요. 도급 방식이면 장애인 근로자 고용 확인 서류도 필요해요. 서류가 갖춰지면 처리 기간은 2~4주 정도예요.</P>

        <InlineLink icon="💼" title="파견근로자 2년 후 정규직 전환" desc="직접 고용 의무와 전환지원금" href="/w/파견근로자-2년-후-고용" />
      </Sec>

      <RelatedMid
        title="다른 기업·고용 관련 정보도 살펴보세요"
        items={[
          { icon: "💰", title: "퇴직금 지연이자 계산", desc: "14일 기한 연 20% 이자", href: "/w/퇴직급여-지급-지연이자-받기" },
          { icon: "💼", title: "파견근로자 2년 후 고용", desc: "직접 고용 의무와 전환지원금", href: "/w/파견근로자-2년-후-고용" },
          { icon: "📋", title: "간이대지급금 신청 방법", desc: "임금체불 최대 700만원 한도", href: "/w/간이대지급금-신청-방법-절차" },
        ]}
        hubHref="/category/기업"
        hubLabel="기업·고용 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 감면 한도 기준 ───── */}
      <Sec n="SECTION 04" id="limit" title="장애인고용 부담금 감면 한도 기준이 얼마인가요?" sub="최대 50% · 부담기초액 차등 · 가중치">
        <P>연계고용 감면 한도는 해당 연도 부담금 총액의 <B>50%</B>예요. 연계고용 실적이 아무리 많아도 부담금의 절반 이상은 감면받을 수 없어요.</P>
        <P>부담기초액은 미달 인원 전체에 동일하게 적용되는 게 아니에요. 미달 인원이 적을수록 높은 기초액이 적용되는 가중치 구조예요. 미달 인원이 많은 사업장은 상대적으로 낮은 기초액이 적용돼요. 고용 의무 이행을 더 강력하게 유도하기 위한 구조예요.</P>

        <TableTitle>연도별 부담기초액 변화</TableTitle>
        <table><thead><tr><THL>연도</THL><TH>부담기초액(월)</TH><TH>비고</TH></tr></thead><tbody>
          {[
            ["2024년", "1,239,800원", "최저임금 9,860원 연동"],
            ["2025년", "1,257,000원", "최저임금 10,030원 연동"],
            ["2026년", "1,280,800원", "최저임금 동결, 조정 적용"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*한국장애인고용공단 기준 (2026.02), 매년 조정 가능</TableNote>

        <Info type="warn">{"납부 실적이 없거나 낮으면 부담기초액의 <strong>60~80%</strong>만 적용되는 경우도 있어요. 정확한 기초액은 공단에 문의하세요."}</Info>
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 납부 신고 기한 ───── */}
      <Sec n="SECTION 05" id="deadline" title="장애인고용부담금 납부 신고 기한은 언제예요?" sub="1월 31일 · 가산세 · 분할납부">
        <P>매년 <B>1월 31일</B>까지 한국장애인고용공단에 신고하고 납부해야 해요. 전년도 고용 현황과 연계고용 실적을 합산해서 신고하면 감면이 적용돼요.</P>
        <P>기한을 넘기면 가산금이 붙어요. 납부 기한을 지키는 게 중요해요. 부담금은 신고 후 <B>일시납 또는 분할납부</B>가 가능해요. 분할납부를 원하면 공단에 사전 신청해야 해요.</P>
        <P>온라인 신고는 한국장애인고용공단 홈페이지(kead.or.kr)에서 가능해요. 오프라인은 전국 지역 공단 지사를 방문하면 돼요. 처음 신고하는 사업장은 공단에서 안내문을 보내주는 경우가 많아요.</P>

        <Info type="tip">{"장애인을 초과 고용하면 <strong>고용장려금</strong>을 받을 수 있어요. 부담금 납부 대신 장애인 채용으로 지원금을 받는 방향도 고려해보세요."}</Info>

        <SpokeLink num="01" title="파견근로자 2년 후 정규직 전환" desc="직접 고용 의무와 전환지원금" href="/w/파견근로자-2년-후-고용" />
        <SpokeLink num="02" title="퇴직금 지연이자 계산" desc="14일 기한 연 20% 이자 청구" href="/w/퇴직급여-지급-지연이자-받기" />

        <ExtBtn badge="한국장애인고용공단 공식" text="장애인고용부담금 신고·감면 신청" cta="신청하기 →" href="https://www.kead.or.kr" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="감면 신청 기한 · 부담기초액 변동">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "퇴직금 지연이자 계산", desc: "14일 기한 연 20% 이자 계산", href: "/w/퇴직급여-지급-지연이자-받기" },
        { title: "파견근로자 2년 후 고용", desc: "직접 고용 의무와 전환지원금", href: "/w/파견근로자-2년-후-고용" },
        { title: "간이대지급금 신청 방법", desc: "임금체불 최대 700만원 한도", href: "/w/간이대지급금-신청-방법-절차" },
        { title: "야유회 사고 산재보상", desc: "업무 관련성 인정 기준과 증빙", href: "/w/야유회-사고-산재보상-받기" },
        { title: "학력 위조 해고 정당성", desc: "업무 관련성 판례 기준", href: "/w/학력-거짓-해고-정당성" },
      ]} />
      <PrevNext
        prev={{ title: "육아 시간선택제 일자리 신청", href: "/w/육아-시간선택제-일자리" }}
        next={{ title: "퇴직금 지연이자 계산", href: "/w/퇴직급여-지급-지연이자-받기" }}
      />
    </BlogLayout>
  );
}
