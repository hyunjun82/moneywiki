"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  Steps,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "외국인근로자 산재보험 적용 범위 | 체류자격 무관 신청 방법",
  description:
    "외국인근로자는 체류자격과 무관하게 산재보험을 받을 수 있어요. 불법체류자도 신청 가능하고, 출입국에 통보되지 않아요. 귀국 후 청구 방법까지 알려드려요.",
  category: "산재",
  keywords: [
    "외국인근로자 체류자격 산재보험",
    "불법체류 산재 신청 방법",
    "외국인 산재보험 귀국 후 청구",
    "외국인근로자 산재 언어 지원",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-20",
  summary: [
    "국적·체류자격과 무관하게 모든 근로자에게 산업재해보상보험법이 적용돼요",
    "불법체류자도 산재보험을 받을 수 있고, 신청해도 출입국에 통보되지 않아요",
    "귀국 후에도 사고일로부터 3년 이내라면 한국 대리인을 통해 청구할 수 있어요",
  ],
  sources: [
    {
      name: "산업재해보상보험법",
      url: "https://www.law.go.kr/법령/산업재해보상보험법",
      date: "2026-02",
    },
    {
      name: "근로복지공단 외국인 산재보험 안내",
      url: "https://www.comwel.or.kr",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "외국인근로자 산재보험 신청하면 출입국에 신고되나요?",
      a: "아니에요. 근로복지공단과 출입국관리소는 별개 기관이에요. 산재 신청 자체로는 불법체류 사실이 출입국에 통보되지 않아요. 치료 종결 후 출입국 절차를 밟으면 돼요.",
    },
    {
      q: "외국인근로자 산재 치료 중 비자 만료되면 어떻게 되나요?",
      a: "치료가 끝날 때까지 체류 연장 신청이 가능해요. 근로복지공단에서 치료 필요성을 확인해주면 출입국관리소에 체류 연장을 신청할 수 있어요. 치료 종결 후 귀국하면 돼요.",
    },
  ],
  ctaCard: {
    label: "산재 신청",
    mainText: "외국인근로자 산재 요양급여 신청",
    subText: "국적·비자 무관, 근로복지공단 신청",
    url: "https://www.comwel.or.kr",
    external: true,
  },
  relatedDocs: [
    { title: "야유회 사고 산재보상 받기", url: "/w/야유회-사고-산재보상-받기" },
    { title: "파견근로자 2년 후 고용", url: "/w/파견근로자-2년-후-고용" },
    { title: "간이대지급금 신청 방법", url: "/w/간이대지급금-신청-방법-절차" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;

function getResult(a: Ans): React.ReactNode | null {
  if (!a.visa || !a.status || !a.timing || !a.language) return null;

  const isLegal = a.visa === "legal";
  const isHospital = a.status === "hospital";

  if (isLegal && isHospital) {
    return (
      <ResultPass title="지금 바로 요양급여 신청을 하세요" desc="합법 체류 중이라면 신청이 훨씬 수월해요. 치료 중인 병원에서 산재 환자로 전환 요청하고, 근로복지공단에 요양급여 신청서를 제출하세요.">
        <ResultGrid items={[
          { icon: "✅", name: "체류 자격", pass: true, desc: "합법 체류 — 신청 유리" },
          { icon: "🏥", name: "치료 상태", pass: true, desc: "치료 중 — 즉시 신청" },
          { icon: "📋", name: "신청 방법", pass: true, desc: "직접 또는 병원 통해 신청" },
        ]} />
        <ResultCTA icon="📋" title="근로복지공단 산재 신청" desc="요양급여 신청 바로가기" href="https://www.comwel.or.kr" />
      </ResultPass>
    );
  }

  if (!isLegal && isHospital) {
    return (
      <ResultPass title="불법체류라도 산재보험 받을 수 있어요" desc="산업재해보상보험법은 체류자격을 따지지 않아요. 지금 치료 중이라면 병원에서 산재 신청을 도와줄 수 있어요. 신청해도 출입국에 통보되지 않아요.">
        <ResultGrid items={[
          { icon: "✅", name: "체류 자격", pass: true, desc: "불법체류도 적용 가능" },
          { icon: "🔒", name: "출입국 통보", pass: true, desc: "신청해도 통보 안 됨" },
          { icon: "🏥", name: "치료 연속", pass: true, desc: "치료 종결까지 체류 연장 가능" },
        ]} />
        <ResultCTA icon="📋" title="근로복지공단 외국인 안내" desc="다국어 지원 신청 방법" href="https://www.comwel.or.kr" />
      </ResultPass>
    );
  }

  if (a.status === "pending") {
    return (
      <ResultPass title="3년 기한 이내라면 지금 신청하세요" desc="치료가 끝났어도 사고일로부터 3년 이내면 신청 가능해요. 귀국했더라도 한국에 대리인을 지정하거나 우편으로 청구할 수 있어요.">
        <ResultGrid items={[
          { icon: "⏰", name: "신청 기한", pass: true, desc: "사고일로부터 3년" },
          { icon: "🌏", name: "귀국 후 청구", pass: true, desc: "대리인 통해 가능" },
          { icon: "📁", name: "필요 서류", pass: true, desc: "진단서·사고경위서 준비" },
        ]} />
        <ResultCTA icon="📋" title="근로복지공단" desc="신청 방법 안내" href="https://www.comwel.or.kr" />
      </ResultPass>
    );
  }

  return (
    <ResultPass title="산재보험 신청이 가능해요" desc="외국인근로자는 체류자격과 무관하게 산재보험 혜택을 받을 수 있어요. 아래 신청 방법을 참고해서 진행하세요.">
      <ResultGrid items={[
        { icon: "✅", name: "적용 여부", pass: true, desc: "체류자격 무관 적용" },
        { icon: "🌏", name: "언어 지원", pass: true, desc: "다국어 상담 가능" },
        { icon: "📋", name: "신청 경로", pass: true, desc: "근로복지공단 직접 신청" },
      ]} />
      <ResultCTA icon="📋" title="근로복지공단" desc="산재 신청하기" href="https://www.comwel.or.kr" />
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article102() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "산재", "산재보상", "외국인근로자"]}
      tags={["2026년 최신", "산재", "외국인근로자"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>외국인이라도 <B>체류자격과 무관하게</B> 산재보험을 받을 수 있어요. 불법체류 중에 신청해도 <B>출입국에 통보되지 않아요</B>. 회사가 막아도 직접 신청할 수 있어요.</>}
      sourceBar={{ badge: "법제처", name: "산재보상보험법·근로복지공단", date: "2026.02" }}
      stickyLabel="신청 기한"
      stickyValue="사고일로부터 3년"
      stickyBtn="산재 신청"
      disclaimer="이 글은 산업재해보상보험법·근로복지공단 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "⚖️", title: "야유회 사고 산재 신청", sub: "업무 관련성 인정 기준", href: "/w/야유회-사고-산재보상-받기", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "야유회 사고 산재보상", cat: "산재·보상", href: "/w/야유회-사고-산재보상-받기" },
          { title: "파견근로자 2년 후 고용", cat: "노동·고용", href: "/w/파견근로자-2년-후-고용" },
          { title: "퇴직금 지연이자 계산", cat: "퇴직·임금", href: "/w/퇴직급여-지급-지연이자-받기" },
          { title: "간이대지급금 신청", cat: "임금·체불", href: "/w/간이대지급금-신청-방법-절차" },
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
        { t: "외국인근로자 산재보험 신청 가능한가요?", sub: "체류 상태 · 현재 상황 · 언어" },
        { t: "외국인근로자 체류자격 산재보험 적용 범위는요?", sub: "국적 무관 · 불법체류 · 고용형태" },
        { t: "불법체류 산재 신청은 어떻게 하나요?", sub: "신청 절차 · 서류 · 회사 비협조" },
        { t: "외국인 산재보험 귀국 후 청구가 가능한가요?", sub: "3년 기한 · 대리인 · 비자 만료" },
        { t: "외국인근로자 산재 언어 지원을 받을 수 있나요?", sub: "다국어 창구 · 통역 · 지원 센터" },
        { t: "자주 묻는 질문", sub: "출입국 통보 · 비자 만료" },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="외국인근로자 산재보험 신청 가능한가요?" sub="체류 상태 · 현재 상황 · 언어">
        <CheckerShell title="나는 산재보험 신청이 가능할까?" sub="30초 확인" desc="체류 상태와 현재 상황을 선택하면 산재 신청 방법을 알려드려요.">
          <CheckerQ n="1" label="현재 체류 상태가 어떻게 되나요?" group="visa"
            opts={[["legal","합법 체류 중이에요 (취업비자·방문취업 등)"],["overstay","불법체류 상태예요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="현재 치료 상황이 어떻게 되나요?" group="status"
            opts={[["hospital","지금 병원에서 치료 중이에요"],["pending","치료가 끝났는데 아직 신청을 못 했어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="사고 발생 시점이 언제예요?" group="timing"
            opts={[["recent","최근 3개월 이내예요"],["within3y","3년 이내예요"],["over3y","3년이 넘었어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="언어 소통은 어떻게 되나요?" group="language"
            opts={[["korean","한국어 가능해요"],["limited","한국어가 어려워요"],["none","전혀 안 돼요"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="업무상 재해 인정 기준이 더 궁금하시죠?"
        a="야유회·회식 사고처럼 일반적이지 않은 상황의 업무 관련성 판단 기준이에요."
        label="업무 관련성 기준 확인"
        href="/w/야유회-사고-산재보상-받기"
      />

      <Divider />

      {/* ───── SECTION 02: 적용 범위 ───── */}
      <Sec n="SECTION 02" id="coverage" title="외국인근로자 체류자격 산재보험 적용 범위는요?" sub="국적 무관 · 불법체류 · 고용형태">
        <P><A href="https://www.law.go.kr/법령/산업재해보상보험법">산업재해보상보험법</A>은 적용 범위에서 국적이나 체류자격을 구분하지 않아요. 합법·불법 체류를 막론하고 근로 관계가 있으면 모두 보호 대상이에요. 한국 법원도 불법체류 외국인의 산재 수급권을 반복적으로 인정해 왔어요.</P>
        <P>E-9(비전문취업), H-2(방문취업), E-7(특정활동) 등 취업비자로 일하는 경우는 물론, 미등록 외국인도 산재 신청이 가능해요. 회사가 "외국인이라 안 된다"거나 "비자 문제 생긴다"고 협박하면 그 자체로 법 위반이에요.</P>
        <P>불법체류 중에 산재를 신청해도 <B>출입국관리소에 통보되지 않아요</B>. 근로복지공단과 출입국관리소는 완전히 별개 기관이에요. 산재 신청 정보가 출입국에 공유되는 절차 자체가 없어요. 고용형태도 따지지 않아요. 일용직·계약직·파트타임 구분 없이 일하다 다치면 산재 적용 대상이에요.</P>

        <Info type="warn">{"회사가 산재 신청을 막거나 비자 문제로 협박하면 <strong>즉시 고용노동부(1350)</strong>에 신고하세요. 법 위반 행위예요."}</Info>

        <InlineLink icon="⚖️" title="야유회 사고 산재 인정 기준" desc="업무 관련성 판단 요소와 증빙" href="/w/야유회-사고-산재보상-받기" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 신청 방법 ───── */}
      <Sec n="SECTION 03" id="apply" title="불법체류 산재 신청은 어떻게 하나요?" sub="신청 절차 · 서류 · 회사 비협조">
        <P><A href="https://www.comwel.or.kr">근로복지공단</A>에 직접 신청해요. 회사 동의 없이 근로자가 직접 신청할 수 있어요. 언어 지원도 받을 수 있으니 혼자 진행해도 돼요.</P>

        <Steps items={[
          { title: "병원에서 산재 환자 등록", desc: "사고 발생 후 병원에 가서 '일하다 다쳤다'고 정확히 말하세요. 산재 환자로 등록되면 치료비가 산재 처리돼요." },
          { title: "요양급여 신청서 작성", desc: "근로복지공단 홈페이지에서 다국어 신청서를 내려받아 작성해요. 언어가 어려우면 공단 통역 지원(1588-0075)을 요청하세요." },
          { title: "서류 수집 및 제출", desc: "요양급여 신청서·진단서·사고 경위서(본인 작성)가 기본이에요. 여권·외국인등록증·근로계약서(있으면)도 준비해두면 좋아요." },
          { title: "공단 조사 및 승인", desc: "근로복지공단에서 업무 관련성을 조사해요. 회사가 협조하지 않아도 근로자 진술과 증빙으로 처리돼요." },
        ]} />

        <Info type="tip">{"공단 대표번호 <strong>1588-0075</strong>로 전화하면 외국인 담당자와 연결돼요. 중국어·베트남어·태국어 등 다국어 상담이 가능해요."}</Info>

        <InlineLink icon="💰" title="임금체불 간이대지급금 신청" desc="체불임금 최대 700만원 한도" href="/w/간이대지급금-신청-방법-절차" />
      </Sec>

      <RelatedMid
        title="다른 노동·산재 정보도 살펴보세요"
        items={[
          { icon: "⚖️", title: "야유회 사고 산재 신청", desc: "업무 관련성 인정 기준", href: "/w/야유회-사고-산재보상-받기" },
          { icon: "💼", title: "파견근로자 2년 후 고용", desc: "직접 고용 의무 전환지원금", href: "/w/파견근로자-2년-후-고용" },
          { icon: "💰", title: "퇴직금 지연이자 계산", desc: "14일 기한 연 20% 이자", href: "/w/퇴직급여-지급-지연이자-받기" },
        ]}
        hubHref="/category/산재"
        hubLabel="산재·노동 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 귀국 후 청구 ───── */}
      <Sec n="SECTION 04" id="overseas" title="외국인 산재보험 귀국 후 청구가 가능한가요?" sub="3년 기한 · 대리인 · 비자 만료">
        <P>가능해요. 사고일로부터 <B>3년 이내</B>라면 본국에서도 청구할 수 있어요. 귀국 전에 사고 관련 자료를 반드시 챙겨야 해요.</P>
        <P>귀국 전에 진단서·사고 경위 기록·회사 관련 정보(사업장명·사업자등록번호·연락처)를 확보해두면 귀국 후 청구 시 유리해요. 치료비 영수증과 치료 기록도 보관하세요. 귀국 후에는 한국에 있는 대리인을 지정하거나, 근로복지공단에 직접 우편으로 신청할 수 있어요.</P>
        <P>산재 치료 중 비자가 만료돼도 걱정하지 않아도 돼요. 치료 중임을 근로복지공단이 확인해주면 출입국관리소에 체류 연장을 신청할 수 있어요. 치료 종결 판정이 나면 귀국 절차를 밟으면 돼요. 이 절차는 불법체류자에게도 동일하게 적용돼요.</P>

        <BridgeCard
          q="임금체불도 받지 못했다면요?"
          a="체불임금은 간이대지급금으로 최대 700만원까지 빠르게 받을 수 있어요."
          label="간이대지급금 신청 방법"
          href="/w/간이대지급금-신청-방법-절차"
        />
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 언어 지원 ───── */}
      <Sec n="SECTION 05" id="language" title="외국인근로자 산재 언어 지원을 받을 수 있나요?" sub="다국어 창구 · 통역 · 지원 센터">
        <P>있어요. <A href="https://www.comwel.or.kr">근로복지공단</A>에는 외국인 전담 창구가 있어요. 중국어·베트남어·태국어·인도네시아어·몽골어 등으로 상담이 가능해요. 한국어 소통이 어려우면 전화 통역 서비스도 연결해줘요.</P>
        <P>외국인 노동자 지원 센터도 활용할 수 있어요. 고용노동부 산하 외국인 노동자 지원 센터에서는 무료 법률 상담과 통역 서비스를 제공해요. 산재 신청 절차를 함께 도와줘요. 전국 17개 지역에 센터가 있어요.</P>
        <P>회사가 산재 신청을 방해하거나 협박하면 즉시 고용노동부(1350)나 근로복지공단에 신고하세요. 산재 신청을 이유로 해고하거나 비자 문제를 언급하며 협박하는 행위는 법 위반이에요. 신고해도 외국인 근로자에게 불이익이 가지 않도록 보호 조치가 있어요.</P>

        <TableTitle>언어별 지원 창구</TableTitle>
        <table><thead><tr><THL>언어</THL><TH>지원 방식</TH><TH>연락처</TH></tr></thead><tbody>
          {[
            ["중국어·베트남어·태국어", "전담 상담원 직접 상담", "근로복지공단 1588-0075"],
            ["인도네시아어·몽골어", "전화 통역 서비스", "근로복지공단 1588-0075"],
            ["기타 언어", "통역 서비스 연결", "외국인 노동자 지원 센터"],
            ["영어", "공단 외국인 창구", "근로복지공단 홈페이지"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*근로복지공단·고용노동부 기준 (2026.02)</TableNote>

        <SpokeLink num="01" title="야유회 사고 산재 신청" desc="업무 관련성 인정 기준과 증빙" href="/w/야유회-사고-산재보상-받기" />

        <ExtBtn badge="근로복지공단 공식" text="외국인 산재보험 요양급여 신청" cta="신청하기 →" href="https://www.comwel.or.kr" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="출입국 통보 · 비자 만료">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "야유회 사고 산재보상 받기", desc: "업무 관련성 인정 기준과 증빙", href: "/w/야유회-사고-산재보상-받기" },
        { title: "파견근로자 2년 후 고용", desc: "직접 고용 의무와 전환지원금", href: "/w/파견근로자-2년-후-고용" },
        { title: "퇴직금 지연이자 계산", desc: "14일 기한 연 20% 이자 계산", href: "/w/퇴직급여-지급-지연이자-받기" },
        { title: "간이대지급금 신청 방법", desc: "임금체불 최대 700만원 한도", href: "/w/간이대지급금-신청-방법-절차" },
        { title: "학력 위조 해고 정당성", desc: "업무 관련성 판례 기준", href: "/w/학력-거짓-해고-정당성" },
      ]} />
      <PrevNext
        prev={{ title: "야유회 사고 산재보상 받기", href: "/w/야유회-사고-산재보상-받기" }}
        next={{ title: "육아 시간선택제 일자리 신청", href: "/w/육아-시간선택제-일자리" }}
      />
    </BlogLayout>
  );
}
