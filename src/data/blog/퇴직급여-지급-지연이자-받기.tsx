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
  title: "퇴직금 지연이자 계산 방법 | 14일 기한 연 20% 적용 기준",
  description:
    "퇴사 후 14일이 지나도 퇴직금을 못 받으셨나요? 연 20% 지연이자를 청구할 수 있어요. 계산 공식부터 고용센터 신고 절차까지 단계별로 알려드려요.",
  category: "퇴직",
  keywords: [
    "퇴직금 지연이자 14일 기한 계산",
    "퇴직금 지연이자 연 20% 계산 방법",
    "퇴직금 지연이자 적용 예외 조건",
    "퇴직금 지연이자 청구 신고 절차",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "퇴직금 지급 기한은 퇴사일로부터 14일 (자연일 기준), 합의 시 연장 가능해요",
    "14일 초과 시 연 20% 지연이자가 자동 발생해요 (청구해야 받을 수 있어요)",
    "청구권 소멸시효는 3년이에요. 고용센터 신고 또는 민사 소송으로 받아요",
  ],
  sources: [
    {
      name: "근로자퇴직급여 보장법 제9조",
      url: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
      date: "2026-02",
    },
    {
      name: "근로기준법 제37조",
      url: "https://www.law.go.kr/법령/근로기준법",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "퇴직금 지연이자는 세금을 내나요?",
      a: "네, 지연이자도 소득으로 과세돼요. 근로소득이 아닌 기타소득으로 분류돼서 22%(소득세 20% + 지방소득세 2%) 원천징수돼요. 실제 받는 금액은 지연이자의 78% 정도예요.",
    },
    {
      q: "퇴직금 지연이자 14일 계산 기준이 자연일인가요?",
      a: "자연일 기준이에요. 근무일이나 영업일이 아닌 달력 기준으로 14일이에요. 공휴일이나 주말도 포함돼요. 퇴사일이 1월 1일이면 지급 기한은 1월 15일이에요.",
    },
  ],
  ctaCard: {
    label: "바로 계산",
    mainText: "퇴직금 지연이자 계산기",
    subText: "지연일수 × 연 20% 자동 계산",
    url: "/w/퇴직금-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "퇴직금 계산기", url: "/w/퇴직금-계산기" },
    { title: "간이대지급금 신청 방법", url: "/w/간이대지급금-신청-방법-절차" },
    { title: "장애인고용부담금 감면 계산", url: "/w/장애인고용부담금-감면-계산" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;

function getResult(a: Ans): React.ReactNode | null {
  if (!a.days || !a.paid || !a.duration || !a.agreement) return null;

  if (a.days === "under14" && a.paid === "no") {
    return (
      <ResultFail title="아직 지급 기한 내예요" desc="퇴사일로부터 14일이 아직 안 됐어요. 법적 지급 기한 내이므로 지연이자가 발생하지 않아요. 14일이 지나도 미지급이면 그때부터 연 20% 지연이자가 발생해요.">
        <ResultGrid items={[
          { icon: "📅", name: "경과 기간", pass: false, desc: "14일 미만 — 기한 내" },
          { icon: "💰", name: "지연이자", pass: false, desc: "아직 발생 안 됨" },
          { icon: "⏰", name: "대기", pass: true, desc: "14일 후 신고 가능" },
        ]} />
      </ResultFail>
    );
  }

  if (a.days === "over14" && a.paid === "no") {
    return (
      <ResultPass title="지연이자 청구가 가능해요" desc="14일이 지났는데 퇴직금을 못 받았다면 원금 + 연 20% 지연이자를 청구할 수 있어요. 고용노동부(1350) 신고 또는 고용센터 방문으로 임금체불 진정을 접수하세요.">
        <ResultGrid items={[
          { icon: "📅", name: "경과 기간", pass: true, desc: "14일 초과" },
          { icon: "💰", name: "지연이자", pass: true, desc: "연 20% 청구 가능" },
          { icon: "⏰", name: "소멸시효", pass: true, desc: "퇴사일로부터 3년 이내" },
        ]} />
        <ResultCTA icon="📋" title="고용24 임금체불 신고" desc="온라인 신고 접수" href="https://www.ei.go.kr" />
        <ResultCTA icon="🔢" title="지연이자 계산 방법" desc="공식 적용 예시 확인" href="#formula" />
      </ResultPass>
    );
  }

  if (a.days === "over14" && a.paid === "partial") {
    return (
      <ResultPass title="미지급 금액에 대한 지연이자 청구 가능해요" desc="일부만 받았거나 이미 전액 받았어도 14일이 초과된 기간에 대한 지연이자를 청구할 수 있어요. 이미 받은 경우라도 지연이자 청구권은 별도로 존재해요.">
        <ResultGrid items={[
          { icon: "📅", name: "경과 기간", pass: true, desc: "14일 초과" },
          { icon: "💰", name: "지연이자", pass: true, desc: "미지급 기간분 청구 가능" },
          { icon: "⚖️", name: "청구 방법", pass: true, desc: "고용센터 또는 소액 소송" },
        ]} />
        <ResultCTA icon="📋" title="고용노동부 민원 신청" desc="임금체불 진정 접수" href="https://www.moel.go.kr" />
      </ResultPass>
    );
  }

  return (
    <ResultFail title="경과 기간과 수령 여부를 다시 확인해 보세요" desc="14일 이전이거나 이미 전액 수령했다면 지연이자 청구 대상이 아니에요. 미지급 금액이 있다면 고용센터에 문의해보세요.">
      <ResultGrid items={[
        { icon: "📅", name: "경과 기간", pass: false, desc: "14일 미만" },
        { icon: "💰", name: "수령 여부", pass: false, desc: "전액 수령 또는 기한 내" },
        { icon: "⏰", name: "대기", pass: true, desc: "14일 후 재확인" },
      ]} />
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article106() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "퇴직", "퇴직금", "지연이자"]}
      tags={["2026년 최신", "퇴직", "퇴직금"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>퇴사 후 <B>14일이 지나도 퇴직금</B>을 못 받으셨나요? 그냥 기다리면 안 돼요. 연 <B>20% 지연이자</B>를 청구할 수 있어요. 청구권 소멸시효 3년 이내에 행동하세요.</>}
      sourceBar={{ badge: "법제처", name: "퇴직급여보장법·근로기준법", date: "2026.02" }}
      stickyLabel="지연이자율"
      stickyValue="연 20%"
      stickyBtn="이자 계산"
      disclaimer="이 글은 근로자퇴직급여 보장법·근로기준법 공식 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💰", title: "퇴직금 계산기", sub: "내 퇴직금 바로 계산", href: "/w/퇴직금-계산기", hot: true },
          { icon: "📋", title: "간이대지급금 신청", sub: "임금체불 최대 700만원", href: "/w/간이대지급금-신청-방법-절차" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "간이대지급금 신청 방법", cat: "임금·체불", href: "/w/간이대지급금-신청-방법-절차" },
          { title: "간이대지급금 지급액 상한", cat: "임금·체불", href: "/w/간이대지급금-지급액-상한액" },
          { title: "대지급금 금액 계산", cat: "임금·체불", href: "/w/대지급금-금액-계산-연차-상여금" },
          { title: "장애인고용부담금 감면 계산", cat: "기업·고용", href: "/w/장애인고용부담금-감면-계산" },
          { title: "파견근로자 2년 후 고용", cat: "노동·고용", href: "/w/파견근로자-2년-후-고용" },
        ]} />
        <SidebarCalc items={[
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
          { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
          { title: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
          { title: "대출이자 계산기", href: "/w/대출이자-계산기" },
        ]} />
      </>}
    >
      <TOC items={[
        { t: "내 퇴직금 지연이자 받을 수 있나요?", sub: "경과 기간 · 수령 여부 · 합의 여부" },
        { t: "퇴직금 지연이자 14일 기한은 어떻게 계산하나요?", sub: "자연일 기준 · 합의 연장 · 도산 시" },
        { t: "퇴직금 지연이자 연 20% 계산 방법은요?", sub: "계산 공식 · 계산 예시 · 지연일수" },
        { t: "퇴직금 지연이자 적용 예외 조건이 있나요?", sub: "합의 연장 · 도산 · 분쟁 상태" },
        { t: "퇴직금 지연이자 청구 신고 절차는 어떻게 되나요?", sub: "고용센터 신고 · 소액 소송 · 체당금" },
        { t: "자주 묻는 질문", sub: "세금 · 자연일 계산" },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="내 퇴직금 지연이자 받을 수 있나요?" sub="경과 기간 · 수령 여부 · 합의 여부">
        <CheckerShell title="퇴직금 지연이자 청구 가능성 확인" sub="30초 확인" desc="퇴사 후 경과 기간과 퇴직금 수령 여부를 선택하면 지연이자 청구 방법을 알려드려요.">
          <CheckerQ n="1" label="퇴사 후 얼마나 지났나요?" group="days"
            opts={[["over14","14일 이상 지났어요"],["under14","아직 14일이 안 됐어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="퇴직금을 받았나요?" group="paid"
            opts={[["no","아직 못 받았어요"],["partial","일부만 받거나 이미 받았어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="지연된 기간이 얼마나 되나요?" group="duration"
            opts={[["short","1개월 이내"],["mid","1~6개월"],["long","6개월 초과"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="지급 기한 연장 합의가 있었나요?" group="agreement"
            opts={[["no","합의한 적 없어요"],["verbal","구두로 얘기만 했어요"],["written","서면으로 합의했어요"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="퇴직금 외에 월급도 못 받으셨나요?"
        a="임금체불은 간이대지급금으로 최대 700만원까지 빠르게 받을 수 있어요."
        label="간이대지급금 신청 방법"
        href="/w/간이대지급금-신청-방법-절차"
      />

      <Divider />

      {/* ───── SECTION 02: 14일 기한 계산 ───── */}
      <Sec n="SECTION 02" id="deadline" title="퇴직금 지연이자 14일 기한은 어떻게 계산하나요?" sub="자연일 기준 · 합의 연장 · 도산 시">
        <P><A href="https://www.law.go.kr/법령/근로자퇴직급여보장법">근로자퇴직급여 보장법 제9조</A>에 따라 사업주는 퇴직일 이후 <B>14일 이내</B>에 퇴직금을 지급해야 해요. 14일은 달력 기준 <B>자연일</B>이에요. 근무일이나 영업일이 아니라 공휴일·주말도 포함돼요.</P>
        <P>퇴사일이 1월 1일이면 지급 기한은 1월 15일이에요. 당사자 간 서면 합의가 있으면 기한을 연장할 수 있어요. "3개월 후에 지급하기로 한다"는 서면 합의가 있다면 그 기한까지 지연이자가 발생하지 않아요. 단, 구두 합의만으로는 인정이 안 될 수 있어요.</P>
        <P>회사가 망하거나 도산해도 퇴직금 지급 의무는 사라지지 않아요. 법원에 체당금을 신청하거나, 확정 판결을 받아서 재산을 압류하는 방법으로 받을 수 있어요.</P>

        <Info type="warn">{"단순히 '돈이 없다'거나 '경영난'은 정당한 이유로 인정되지 않아요. 의도적으로 지급을 미루면 <strong>3년 이하 징역 또는 3,000만원 이하 벌금</strong> 형사처벌 대상이에요."}</Info>

        <InlineLink icon="📋" title="간이대지급금 신청 방법" desc="도산 사업장 임금체불 최대 700만원" href="/w/간이대지급금-신청-방법-절차" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 연 20% 계산 ───── */}
      <Sec n="SECTION 03" id="formula" title="퇴직금 지연이자 연 20% 계산 방법은요?" sub="계산 공식 · 계산 예시 · 지연일수">
        <P><A href="https://www.law.go.kr/법령/근로기준법">근로기준법 제37조</A>와 근로자퇴직급여 보장법 시행령에서 연 20%를 법정이자율로 규정하고 있어요.</P>

        <FormulaCard
          formula="지연이자 = 미지급 퇴직금 × 20% ÷ 365 × 지연일수"
          notes={[
            "지연일수: 14일 초과 시점부터 실제 지급일까지 (자연일 기준)",
            "지연이자 20%는 법정 최저율 (당사자 합의로 상향 가능)",
            "소멸시효: 퇴직일로부터 3년 이내에 청구해야 해요",
          ]}
        />

        <CaseBox
          badge="계산 예시"
          label="퇴직금 1,000만원, 30일 지연"
          conditions={["미지급 퇴직금: 1,000만원", "지연 기간: 30일 (14일 초과 16일 기준)","연 이자율: 20%"]}
          steps={[
            "지연이자 = 10,000,000 × 0.20 ÷ 365 × 16 = 87,671원",
            "30일 전체 지연이라면: × 30 = 164,383원",
            "6개월(180일) 지연이라면: × 180 = 986,301원",
          ]}
          total="30일 지연 시 약 16만원 추가 청구 가능"
          result="3년 이내라면 전 기간 이자 청구 가능"
          pass={true}
        />

        <P>14일이 지난 날부터 실제 지급일까지 전부 계산해요. 6개월이 지연됐다면 6개월치 이자를 전부 받을 수 있어요. 청구권 소멸시효 3년 이내라면 모두 청구 가능해요.</P>
      </Sec>

      <RelatedMid
        title="다른 퇴직·임금 정보도 살펴보세요"
        items={[
          { icon: "📋", title: "간이대지급금 신청 방법", desc: "임금체불 최대 700만원 한도", href: "/w/간이대지급금-신청-방법-절차" },
          { icon: "💰", title: "간이대지급금 지급액 상한", desc: "임금·퇴직금 합산 한도 계산", href: "/w/간이대지급금-지급액-상한액" },
          { icon: "📊", title: "대지급금 금액 계산", desc: "연차·상여금 통상임금 포함 여부", href: "/w/대지급금-금액-계산-연차-상여금" },
        ]}
        hubHref="/category/퇴직"
        hubLabel="퇴직·임금 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 적용 예외 ───── */}
      <Sec n="SECTION 04" id="exception" title="퇴직금 지연이자 적용 예외 조건이 있나요?" sub="합의 연장 · 도산 · 분쟁 상태">
        <P>합의 연장이나 특별한 사정이 있으면 예외가 인정돼요. 연 20% 지연이자 의무는 원칙이지만, 사업주가 지급하지 못한 '정당한 이유'가 있으면 이자 감액이나 면제가 인정되는 경우도 있어요.</P>
        <P>법원이 인정하는 예외 사유는 제한적이에요. 사업주가 지급 능력을 상실해서 도산 절차 중인 경우, 근로자가 퇴직금 수령을 명시적으로 거부한 경우, 퇴직금 금액 자체에 분쟁이 있는 경우 등에서 법원이 이자를 감면해주기도 해요.</P>
        <P>퇴직금을 일부만 준 경우에도 나머지 금액 전체에 지연이자가 붙어요. 원금 일부를 나눠 줬다고 해서 이자가 줄어들지 않아요. 지급받은 금액에 대한 이자만 소멸하는 거예요.</P>

        <Info type="tip">{"서면 합의로 지급 기한을 연장한 경우, 합의한 기한까지는 지연이자가 발생하지 않아요. 단 <strong>구두 합의</strong>는 법적 효력이 불명확하니 반드시 서면으로 남기세요."}</Info>
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 청구 절차 ───── */}
      <Sec n="SECTION 05" id="claim" title="퇴직금 지연이자 청구 신고 절차는 어떻게 되나요?" sub="고용센터 신고 · 소액 소송 · 체당금">
        <P>고용노동부 신고가 가장 빠른 방법이에요. 비용 없이 신고만으로 처리될 수 있어요. <A href="https://www.ei.go.kr">고용24</A> 또는 고용센터 방문으로 임금체불 진정을 접수하면 근로감독관이 사업주에게 출석 요구 및 시정 명령을 내려요.</P>
        <P>그래도 안 주면 민사소송으로 가야 해요. 청구 금액이 3,000만원 이하면 소액사건 소송으로 빠르게 처리돼요. 법원 판결 후 사업주 재산을 압류할 수 있어요. 소송 비용은 나중에 사업주에게 청구할 수 있어요.</P>
        <P>사업주가 도산한 경우 <B>체당금 제도</B>를 이용할 수 있어요. 고용보험에서 미지급 임금·퇴직금의 일부를 대신 지급해줘요. 간이대지급금으로 최대 700만원까지 빠르게 받을 수 있는 별도 제도도 있어요.</P>

        <TableTitle>청구 방법 비교</TableTitle>
        <table><thead><tr><THL>방법</THL><TH>특징</TH><TH>처리 기간</TH></tr></thead><tbody>
          {[
            ["고용센터 진정 신고", "무료, 근로감독관 직접 조사", "2~4주"],
            ["소액사건 소송", "3,000만원 이하 간편 소송", "1~3개월"],
            ["지급명령 신청", "이의 없으면 확정 판결 효력", "1~2개월"],
            ["체당금 신청", "도산 사업장, 정부 대신 지급", "1~2개월"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*평균 처리 기간이며, 사안에 따라 다를 수 있어요</TableNote>

        <SpokeLink num="01" title="간이대지급금 신청 방법" desc="임금체불 최대 700만원 한도" href="/w/간이대지급금-신청-방법-절차" />
        <SpokeLink num="02" title="대지급금 금액 계산" desc="연차·상여금 통상임금 포함 여부" href="/w/대지급금-금액-계산-연차-상여금" />

        <ExtBtn badge="법제처 공식" text="근로자퇴직급여 보장법 지급 기한" cta="바로가기 →" href="https://www.law.go.kr/법령/근로자퇴직급여보장법" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="세금 · 자연일 계산">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "간이대지급금 신청 방법", desc: "임금체불 최대 700만원 한도", href: "/w/간이대지급금-신청-방법-절차" },
        { title: "간이대지급금 지급액 상한", desc: "임금·퇴직금 합산 한도 계산", href: "/w/간이대지급금-지급액-상한액" },
        { title: "대지급금 금액 계산", desc: "연차·상여금 통상임금 포함 여부", href: "/w/대지급금-금액-계산-연차-상여금" },
        { title: "장애인고용부담금 감면 계산", desc: "연계고용 최대 50% 감면", href: "/w/장애인고용부담금-감면-계산" },
        { title: "야유회 사고 산재보상", desc: "업무 관련성 인정 기준과 증빙", href: "/w/야유회-사고-산재보상-받기" },
      ]} />
      <PrevNext
        prev={{ title: "장애인고용부담금 감면 계산", href: "/w/장애인고용부담금-감면-계산" }}
        next={{ title: "파견근로자 2년 후 고용", href: "/w/파견근로자-2년-후-고용" }}
      />
    </BlogLayout>
  );
}
