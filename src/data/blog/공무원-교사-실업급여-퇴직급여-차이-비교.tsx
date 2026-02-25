"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  ChipsGrid,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "공무원 교사 실업급여 가입 조건 | 별정직 임기제 퇴직급여 차이",
  description:
    "공무원은 고용보험 비대상이라 실업급여를 못 받지만, 별정직은 예외예요. 직종별 가입 조건과 퇴직급여 차이를 정리했어요.",
  category: "실업급여",
  keywords: ["공무원 실업급여", "교사 실업급여", "별정직 임기제", "퇴직급여 차이"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-25",
  datePublished: "2026-02-25",
  summary: [
    "일반 공무원·국공립 교사는 고용보험 미가입 → 실업급여 불가",
    "별정직·임기제 공무원은 임용 3개월 내 임의가입 가능",
    "공무원연금 퇴직수당은 실업급여와 구조가 완전히 달라요",
  ],
  sources: [
    { name: "고용보험법 제10조", url: "https://www.law.go.kr/법령/고용보험법", date: "2024-01" },
    { name: "고용보험법 시행령 제3조의2", url: "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=281219&joNo=0003&joBrNo=02", date: "2026-01" },
    { name: "공무원연금법", url: "https://www.law.go.kr/법령/공무원연금법", date: "2024-01" },
  ],
  faq: [
    {
      q: "공무원은 왜 실업급여 못 받나요?",
      a: "공무원은 공무원법에 의해 신분이 보장되고, 퇴직 시 공무원연금(퇴직수당)을 받기 때문에 고용보험 적용 대상에서 제외돼요. 고용보험법 제10조에 명시되어 있어요.",
    },
    {
      q: "별정직 공무원도 실업급여 받을 수 있나요?",
      a: "네, 별정직·임기제 공무원은 최초 임용일로부터 3개월 이내에 고용보험에 임의가입할 수 있어요. 가입 후 피보험기간 180일 이상이면 실업급여를 받을 수 있어요.",
    },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "내 직종 고용보험 가입 여부",
    subText: "실업급여 수급 가능성 판정",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 수급 조건 정리", url: "/w/실업급여-수급-조건" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
function getResult(a: Ans) {
  if (!a.job || !a.insurance || !a.period) return null;

  const isGeneral = a.job === "general";
  const isSpecial = a.job === "special" || a.job === "temp";
  const isTeacherPub = a.job === "teacher-pub";
  const isTeacherPri = a.job === "teacher-pri";
  const hasInsurance = a.insurance === "yes";
  const periodOk = a.period === "yes";

  if ((isSpecial && hasInsurance && periodOk) || (isTeacherPri && hasInsurance && periodOk)) {
    return (
      <ResultPass title="실업급여 수급이 가능해요" desc="고용보험에 가입되어 있고 피보험기간도 충족해서 실업급여를 받을 수 있어요.">
        <ResultGrid items={[
          { icon: "👤", name: "직종", pass: true, desc: isSpecial ? "별정직·임기제" : "사립학교 교사" },
          { icon: "🛡️", name: "고용보험", pass: true, desc: "가입됨" },
          { icon: "⏱️", name: "피보험기간", pass: true, desc: "180일 이상" },
        ]} />
        <ResultCTA icon="📝" title="실업급여 신청 방법" desc="고용24 온라인 신청 절차 안내" href="/w/실업급여-신청방법" />
        <ResultCTA icon="🔢" title="예상 수령액 계산" desc="연봉별 실업급여 금액 확인" href="/w/실업급여-연봉별-계산" />
        <ResultCTA icon="📊" title="수급 조건 전체 확인" desc="피보험기간·퇴직사유 기준" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="📂" title="구비서류 준비" desc="이직확인서·신분증·통장사본 등" href="/w/실업급여-구비서류" />
      </ResultPass>
    );
  }

  if (isGeneral || isTeacherPub) {
    return (
      <ResultFail title="고용보험 적용 대상이 아니에요" desc={isGeneral ? "일반 공무원은 공무원연금법에 따라 퇴직수당을 받아요. 실업급여 대신 퇴직수당이 안전망 역할을 해요." : "국공립학교 교사는 공무원연금 적용 대상이라 고용보험에 가입할 수 없어요."}>
        <ResultGrid items={[
          { icon: "👤", name: "직종", pass: false, desc: isGeneral ? "일반 공무원" : "국공립 교사" },
          { icon: "🛡️", name: "고용보험", pass: false, desc: "미가입 (적용 제외)" },
          { icon: "🏛️", name: "퇴직급여", pass: true, desc: "공무원연금 퇴직수당" },
        ]} />
        <div style={{ marginTop: 16 }}>
          <P><B>대신 이런 제도를 확인하세요</B></P>
          <ResultCTA icon="🏛️" title="공무원연금 퇴직수당" desc="재직기간별 수당 계산 기준" href="/w/실업급여-수급-조건" />
          <ResultCTA icon="📋" title="실업급여 수급 조건" desc="고용보험 가입 대상 확인" href="/w/실업급여-수급-조건" />
          <ResultCTA icon="📊" title="피보험기간 계산 방법" desc="이전 직장 합산 가능 여부" href="/w/실업급여-피보험기간-180일-계산" />
          <ResultCTA icon="🔍" title="수급자격 제한 사유" desc="자발적 퇴사 예외 인정 기준" href="/w/실업급여-수급자격제한" />
        </div>
      </ResultFail>
    );
  }

  const items = [
    { icon: "👤", name: "직종", pass: isSpecial || isTeacherPri, desc: a.job === "special" ? "별정직" : a.job === "temp" ? "임기제" : "사립학교 교사" },
    { icon: "🛡️", name: "고용보험", pass: hasInsurance, desc: hasInsurance ? "가입됨" : "미가입" },
    { icon: "⏱️", name: "피보험기간", pass: periodOk, desc: periodOk ? "180일 이상" : "180일 미만" },
  ];

  return (
    <ResultFail title="일부 조건이 부족해요" desc="아래 항목을 확인하고, 고용보험 가입이나 피보험기간 보완이 가능한지 알아보세요.">
      <ResultGrid items={items} />
      <div style={{ marginTop: 16 }}>
        <P><B>관련 정보를 확인해 보세요</B></P>
        <ResultCTA icon="📝" title="실업급여 신청 방법" desc="고용24 온라인 신청 절차 안내" href="/w/실업급여-신청방법" />
        <ResultCTA icon="📊" title="피보험기간 계산 합산" desc="이전 직장 합산 가능 여부" href="/w/실업급여-피보험기간-180일-계산" />
        <ResultCTA icon="📋" title="수급 조건 전체 확인" desc="피보험기간·퇴직사유 기준" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="🔍" title="수급자격 제한 사유" desc="자발적 퇴사 예외 인정 기준" href="/w/실업급여-수급자격제한" />
      </div>
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article87() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "가입 대상", "공무원·교사"]}
      tags={["2026년 기준", "실업급여", "공무원"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          공무원이 퇴직하면 실업급여를 받을 수 있을까요? 결론부터 말하면, <B>일반 공무원은 고용보험 적용 대상이 아니라 실업급여를 받을 수 없</B>어요. 대신 <A href="https://www.law.go.kr/법령/공무원연금법">공무원연금법</A>에 따른 퇴직수당을 받죠. 하지만 별정직·임기제 공무원은 예외가 있어요.
        </>
      }
      sourceBar={{
        badge: "법령 근거",
        name: "고용보험법 제10조 · 고용보험법 시행령 제3조의2",
        date: "2026.01 시행",
      }}
      stickyLabel="공무원 실업급여"
      stickyValue="적용 제외"
      stickyBtn="내 직종 확인 ↑"
      disclaimer="이 글은 고용보험법과 공무원연금법을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 가입 여부는 고용센터 또는 인사혁신처에서 확인하세요."
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기", hot: true },
              { icon: "🏛️", title: "2026 정부지원금", sub: "30개+ 지원금", href: "/w/정부지원금" },
              { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
            ]}
          />
          <SidebarDocs
            items={[
              { title: "실업급여 수급 조건 정리", cat: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
              { title: "실업급여 신청 방법 절차", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
              { title: "수급자격 제한 사유", cat: "실업급여·제한", href: "/w/실업급여-수급자격제한" },
            ]}
          />
          <SidebarCalc
            items={[
              { title: "실업급여 계산기", href: "/calculators/실업급여-계산기" },
              { title: "퇴직금 계산기", href: "/calculators/퇴직금-계산기" },
              { title: "연말정산 계산기", href: "/calculators/연말정산-계산기" },
              { title: "양도소득세 계산기", href: "/calculators/양도소득세-계산기" },
              { title: "대출이자 계산기", href: "/calculators/대출이자-계산기" },
            ]}
          />
        </>
      }
    >
      {/* ── TOC ── */}
      <TOC
        items={[
          { t: "내 직종이 고용보험 대상인지 간편 체크", sub: null },
          { t: "공무원은 왜 실업급여 못 받나요?", sub: "고용보험 적용 제외 근거 · 공무원 퇴직 안전망" },
          { t: "별정직 공무원도 실업급여 가입할 수 있나요?", sub: "임의가입 3개월 기한 · 가입 후 수급 조건" },
          { t: "교사도 실업급여 받을 수 있나요?", sub: "국공립 vs 사립 차이 · 사학연금과 고용보험" },
          { t: "공무원 퇴직급여와 실업급여 차이가 뭐예요?", sub: "지급 구조 비교 · 금액 산정 방식 차이" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* ── Summary3 ── */}
      <Summary3
        items={[
          "일반 공무원·국공립 교사는 고용보험 미가입 → 실업급여 불가",
          "별정직·임기제 공무원은 임용 3개월 내 임의가입 가능",
          "공무원연금 퇴직수당은 실업급여와 구조가 완전히 달라요",
        ]}
      />

      {/* ══════ STEP 01 — 체커 ══════ */}
      <Sec n={1} id="checker" title="내 직종이 고용보험 대상인지 간편 체크" sub="3가지만 선택하면 바로 알 수 있어요">
        <P>
          공무원이라고 해서 모두 실업급여를 못 받는 건 아니에요. 직종과 고용보험 가입 여부에 따라 결과가 달라져요. 아래 체커로 내 상황을 먼저 확인해보세요.
        </P>
        <P>
          체커 결과는 참고용이에요. 정확한 가입 여부는 고용센터(1350) 또는 고용24에서 확인할 수 있어요.
        </P>

        <CheckerShell title="공무원·교사 실업급여 가능 여부" subtitle="30초 확인">
          <CheckerQ n={1} label="현재(또는 이전) 직종이 무엇인가요?" group="job"
            opts={[["general", "일반 공무원"], ["special", "별정직 공무원"], ["temp", "임기제 공무원"], ["teacher-pub", "국공립 교사"], ["teacher-pri", "사립학교 교사"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n={2} label="고용보험에 가입되어 있나요?" group="insurance"
            opts={[["yes", "네, 가입됨"], ["no", "아니요"], ["unknown", "모르겠어요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n={3} label="고용보험 가입기간이 180일 이상인가요?" group="period"
            opts={[["yes", "180일 이상"], ["no", "180일 미만"], ["unknown", "모르겠어요"]]}
            sel={ans} pick={pick}
          />
          {result}
        </CheckerShell>
      </Sec>

      <Divider />

      {/* ══════ SECTION 02 — 공무원 실업급여 ══════ */}
      <Sec n={2} id="civil-servant" title="공무원은 왜 실업급여 못 받나요?" sub="고용보험법이 아예 적용 대상에서 빼놨어요">
        <P>
          <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제10조</A>는 고용보험 적용 제외 대상을 열거하고 있어요. 여기에 <B>국가공무원법·지방공무원법에 따른 공무원</B>이 명시되어 있어요. 공무원은 법률로 신분이 보장되고, 퇴직 시 별도의 연금·수당 제도가 있기 때문에 고용보험이 필요 없다는 취지예요.
        </P>

        <H3>고용보험 적용 제외 근거</H3>
        <P>
          공무원이 고용보험에서 제외된 이유는 크게 두 가지예요. 첫째, <B>신분 보장</B>이에요. 공무원은 법정 사유 없이는 해고되지 않아요. 일반 근로자처럼 갑자기 실직할 위험이 상대적으로 낮죠. 둘째, <B>퇴직 안전망이 이미 있</B>어요. 공무원연금법에 따라 퇴직수당과 퇴직연금을 받을 수 있어서, 실업급여와 같은 역할을 이 제도가 대신해요.
        </P>

        <H3>공무원 퇴직 안전망</H3>
        <P>
          공무원이 퇴직하면 <B>퇴직수당</B>과 <B>퇴직연금(또는 퇴직일시금)</B>을 받아요. 퇴직수당은 재직기간에 따라 기준소득월액의 일정 비율로 계산돼요. 1년 이상 재직하면 받을 수 있고, 재직기간이 길수록 금액이 커져요. 퇴직연금은 20년 이상 재직해야 받을 수 있고, 20년 미만이면 퇴직일시금으로 받아요.
        </P>

        <Info type="warn">{"<strong>주의:</strong> 공무원 퇴직 후 민간기업에 재취업하면 그때부터 고용보험에 가입돼요. 이후 퇴직 시에는 실업급여를 받을 수 있어요."}</Info>

        <InlineLink icon="📊" title="실업급여 수급 조건 전체 확인" desc="고용보험 가입 대상과 피보험기간 기준" href="/w/실업급여-수급-조건" />
      </Sec>

      <Divider />

      {/* ══════ SECTION 03 — 별정직 ══════ */}
      <Sec n={3} id="special" title="별정직 공무원도 실업급여 가입할 수 있나요?" sub="임용 3개월 내 임의가입이 가능해요">
        <P>
          별정직·임기제 공무원은 일반 공무원과 달라요. <A href="https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=281219&joNo=0003&joBrNo=02">고용보험법 시행령 제3조의2</A>에 따르면, 별정직 또는 임기제 공무원은 <B>최초 임용일로부터 3개월 이내에 고용보험에 임의가입</B>할 수 있어요.
        </P>

        <H3>임의가입 3개월 기한</H3>
        <P>
          2026년 1월 2일부터 시행된 개정 시행령에 따르면, 별정직·임기제 공무원을 임용하는 기관장은 해당 공무원에게 고용보험 가입 의사를 확인해야 해요. 가입을 원하면 임용일로부터 <B>3개월 이내</B>에 고용노동부장관에게 신청하면 돼요. 이 기한을 넘기면 가입할 수 없으니 임용 직후에 결정하는 게 중요해요.
        </P>

        <TableTitle>별정직·임기제 고용보험 가입 조건</TableTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>항목</THL>
              <TH>조건</TH>
              <TH>비고</TH>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>가입 대상</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>별정직·임기제 공무원</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>일반 공무원은 불가</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>가입 방식</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>임의가입 (본인 의사)</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>강제가입 아님</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>가입 기한</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>최초 임용일로부터 3개월</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>기한 초과 시 가입 불가</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>적용 급여</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>실업급여만 적용</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>육아휴직급여 등 제외</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>보험료</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>근로자·사업주 각 부담</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>일반 근로자와 동일 요율</td>
            </tr>
          </tbody>
        </table>
        <TableNote>고용보험법 시행령 제3조의2 기준 / 2026.01.02 시행</TableNote>

        <H3>가입 후 수급 조건</H3>
        <P>
          고용보험에 가입한 별정직·임기제 공무원도 <B>피보험기간 180일 이상 + 비자발적 퇴사(또는 정당사유)</B>라는 일반 수급 조건은 똑같이 적용돼요. 임기 만료로 퇴직한 경우에는 비자발적 퇴사로 인정돼서 실업급여를 받을 수 있어요. 다만 본인이 자발적으로 그만둔 경우에는 정당한 사유가 있어야 해요.
        </P>

        <Info type="tip">{"<strong>팁:</strong> 별정직·임기제 공무원이라면 임용 직후 고용보험 가입 여부를 반드시 결정하세요. 3개월 기한이 지나면 기회가 없어요."}</Info>

        <InlineLink icon="🔢" title="피보험기간 180일 계산 방법" desc="이전 직장 합산 가능 여부 확인" href="/w/실업급여-피보험기간-180일-계산" />
      </Sec>

      {/* ── RelatedMid (SECTION 03-04 사이) ── */}
      <RelatedMid
        title="실업급여 수급 조건도 확인하세요"
        items={[
          { icon: "📊", title: "실업급여 수급 조건 정리", desc: "피보험기간·퇴직사유 기준", href: "/w/실업급여-수급-조건" },
          { icon: "📝", title: "실업급여 신청 방법 절차", desc: "고용24 온라인 5단계 안내", href: "/w/실업급여-신청방법" },
          { icon: "🔍", title: "수급자격 제한 사유", desc: "자발적 퇴사 예외 11가지", href: "/w/실업급여-수급자격제한" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* ══════ SECTION 04 — 교사 ══════ */}
      <Sec n={4} id="teacher" title="교사도 실업급여 받을 수 있나요?" sub="국공립과 사립에 따라 완전히 달라요">
        <P>
          교사의 실업급여 수급 가능 여부는 <B>국공립학교인지 사립학교인지</B>에 따라 결정돼요. 같은 교사라도 적용되는 연금 제도와 고용보험 가입 여부가 다르기 때문이에요.
        </P>

        <H3>국공립 vs 사립 차이</H3>

        <TableTitle>교사 유형별 고용보험·연금 비교</TableTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>구분</THL>
              <TH>국공립학교 교사</TH>
              <TH>사립학교 교사</TH>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>신분</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>교육공무원</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>사립학교 교직원</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>적용 연금</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>공무원연금</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>사학연금</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>고용보험</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>적용 제외</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>가입 대상</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>실업급여</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>불가</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>가능 (조건 충족 시)</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>퇴직급여</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>퇴직수당 + 퇴직연금</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>퇴직금 (근로기준법)</td>
            </tr>
          </tbody>
        </table>

        <P>
          국공립학교 교사는 교육공무원이에요. 공무원연금법이 적용되기 때문에 고용보험 가입 대상이 아니에요. 퇴직 시에는 공무원연금에서 퇴직수당과 퇴직연금(또는 퇴직일시금)을 받아요.
        </P>

        <H3>사학연금과 고용보험</H3>
        <P>
          사립학교 교사는 <B>사학연금</B>에 가입돼요. 사학연금은 공무원연금과 비슷한 구조이지만, 고용보험 적용 여부가 다른 경우가 있어요. 사립학교교직원 연금법 적용을 받는 교직원은 원칙적으로 고용보험 적용 제외 대상이에요. 하지만 사학연금에 가입하지 않은 비정규직 교직원(기간제 교사 등)은 고용보험에 가입할 수 있어요.
        </P>
        <P>
          정리하면, 사립학교의 <B>기간제 교사나 강사</B>처럼 사학연금 미적용 직원은 고용보험에 가입되어 있을 가능성이 높고, 이 경우 퇴직 시 실업급여를 받을 수 있어요. 본인의 고용보험 가입 여부는 고용24에서 확인할 수 있어요.
        </P>

        <BridgeCard
          q="사립학교 기간제 교사인데, 계약 만료 후 실업급여 신청이 가능한가요?"
          a="네, 고용보험에 가입되어 있고 피보험기간 180일 이상이면 가능해요. 계약 만료는 비자발적 퇴사에 해당돼요."
          label="실업급여 신청 방법 보기"
          href="/w/실업급여-신청방법"
        />
      </Sec>

      <Divider />

      {/* ══════ SECTION 05 — 퇴직급여 차이 ══════ */}
      <Sec n={5} id="difference" title="공무원 퇴직급여와 실업급여 차이가 뭐예요?" sub="지급 목적부터 산정 방식까지 완전히 달라요">
        <P>
          공무원 퇴직급여(퇴직수당·퇴직연금)와 실업급여는 이름이 비슷해 보이지만 <B>목적, 재원, 지급 방식이 완전히 다른 제도</B>예요. 둘 다 퇴직 후 경제적 안전망 역할을 하지만, 구조가 다르기 때문에 직접 비교하기는 어려워요.
        </P>

        <H3>지급 구조 비교</H3>

        <TableTitle>실업급여 vs 공무원 퇴직수당 비교</TableTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>항목</THL>
              <TH>실업급여</TH>
              <TH>공무원 퇴직수당</TH>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>대상</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>고용보험 가입 근로자</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>공무원(1년 이상 재직)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>목적</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>재취업 기간 소득 보전</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>장기 근속 보상</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>재원</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>고용보험 기금</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>공무원연금 기금</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>지급 기간</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>120~270일 (한정)</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>일시 지급</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>금액 산정</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>퇴직 전 평균임금 × 60%</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>기준소득월액 × 재직연수 비율</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>구직활동 의무</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>있음</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>없음</td>
            </tr>
          </tbody>
        </table>

        <H3>금액 산정 방식 차이</H3>
        <P>
          실업급여는 퇴직 전 3개월 평균임금의 60%를 하루 단위로 계산해요. 2026년 기준 <B>1일 상한액 68,100원, 하한액 66,048원</B>이에요. 소정급여일수(120~270일) 동안 매달 나눠서 지급하고, 구직활동을 해야 받을 수 있어요.
        </P>
        <P>
          반면 공무원 퇴직수당은 재직기간에 따라 기준소득월액의 일정 비율로 한 번에 지급돼요. 5년 미만은 기준소득월액의 65%, 20년 이상은 390%까지 올라가요. 구직활동 의무도 없어요. 별도로 20년 이상 재직한 공무원은 매달 퇴직연금도 받을 수 있어서, 장기 재직 공무원의 퇴직 안전망은 일반 근로자보다 훨씬 두텁다고 볼 수 있어요.
        </P>

        <Info type="tip">{"<strong>참고:</strong> 공무원 퇴직 후 민간기업에 취업하면 고용보험에 새로 가입돼요. 이후 다시 퇴직하면 그 기간에 대한 실업급여를 받을 수 있어요."}</Info>

        <ExtBtn
          badge="고용24 공식"
          text="고용보험 가입 이력 조회"
          cta="조회하기 →"
          href="https://www.work24.go.kr"
        />
      </Sec>

      <Divider />

      {/* ══════ FAQ ══════ */}
      <Sec n={6} id="faq" title="자주 묻는 질문" sub="">
        <FAQAccordion items={meta.faq} />
      </Sec>

      {/* ── 하단 네비 ── */}
      <RelatedArticles
        items={[
          { title: "실업급여 수급 조건 정리", cat: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 신청 방법 절차 준비서류", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
          { title: "직장내 괴롭힘 퇴직 정당사유", cat: "실업급여·퇴직사유", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
          { title: "피보험기간 180일 계산 합산", cat: "실업급여·피보험기간", href: "/w/실업급여-피보험기간-180일-계산" },
          { title: "연봉별 실업급여 수령액", cat: "실업급여·계산", href: "/w/실업급여-연봉별-계산" },
        ]}
      />
      <PrevNext
        prev={{ title: "직장내 괴롭힘 퇴직 정당사유", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" }}
        next={{ title: "고용센터 찾기 고용24", href: "/w/실업급여-고용센터-찾기-고용24-사용법" }}
      />
    </BlogLayout>
  );
}
