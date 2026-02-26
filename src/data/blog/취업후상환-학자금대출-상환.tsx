"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "취업후상환 학자금대출 의무 상환 조건 | 소득 초과 상환액 계산 방법",
  description: "취업후상환 학자금대출은 소득이 생겨야 갚는다는 거 알고 계세요? 의무 상환 소득 기준과 계산 방법을 알려드려요.",
  category: "금융",
  keywords: [
    "취업후상환 학자금대출 의무 상환 조건",
    "ICL 학자금대출 소득 기준 초과",
    "취업후상환 학자금 상환액 계산 방법",
    "ICL 학자금대출 상환 유예 신청",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 취업후상환 학자금대출 의무상환 기준소득은 <strong>연 4,200만원</strong> 수준이에요.",
    "기준소득 초과분의 <strong>20%</strong>를 의무상환하며 근로소득자는 원천징수로 자동 징수돼요.",
    "소득이 기준 이하거나 실직 중이면 <strong>상환 유예</strong>를 신청할 수 있어요.",
  ],
  sources: [
    { name: "취업 후 상환 학자금대출 업무처리준칙", url: "https://www.law.go.kr/행정규칙/취업후상환학자금대출업무처리준칙", date: "2026-02" },
    { name: "한국장학재단 취업후상환 학자금대출 안내", url: "https://www.kosaf.go.kr/ko/loan.do?pg=loan02_01_01", date: "2026-02" },
  ],
  faq: [
    { q: "취업후상환 학자금대출 상환 중에 직장을 잃으면 어떻게 되나요?", a: "실직하면 소득이 기준소득 이하가 되므로 의무상환이 중지돼요. 상환 유예를 신청하면 납부 의무를 유예받을 수 있어요. 한국장학재단 홈페이지에서 신청하거나 고객센터(1599-2000)에 문의하세요." },
    { q: "취업후상환 학자금 의무상환 외에 자발적으로 더 갚을 수 있나요?", a: "네, 가능해요. 자발적 상환은 별도로 신청해서 원하는 금액만큼 상환할 수 있어요. 이자 부담을 줄이려면 소득이 생기면 자발적으로 추가 상환하는 게 유리해요." },
  ],
  ctaCard: {
    label: "상환 확인",
    mainText: "연 소득 초과분의 20% 의무상환",
    subText: "기준소득 4,200만원 (2026년 추정)",
    url: "https://www.kosaf.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "프리랜서 3.3% 환급", url: "/w/프리랜서-3.3-원천징수-환급" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { loan_type, income_level, employment } = sel;
    if (!loan_type || !income_level || !employment) return null;
    if (loan_type === "general") return "general_loan";
    if (income_level === "below") return "no_repay";
    if (employment === "unemployed") return "deferral";
    return "must_repay";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 상환 의무 여부 확인" },
    { t: "취업후상환 학자금대출 의무 상환 조건은 무엇인가요?", sub: "소득 기준 · 원천징수 방식" },
    { t: "ICL 학자금 소득 기준은 얼마인가요?", sub: "2026년 기준소득 · 초과 판단" },
    { t: "취업후상환 학자금 상환액은 어떻게 계산하나요?", sub: "초과분 20% · 계산 예시" },
    { t: "ICL 학자금 상환 유예는 어떻게 신청하나요?", sub: "유예 사유 · 신청 방법" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "금융", "학자금대출"]}
      tags={["2026년 최신", "금융", "학자금대출", "ICL"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>취업후상환(ICL) 학자금대출은 연 소득이 기준소득을 넘어야 갚아요. 초과분의 <strong>20%</strong>가 의무상환액이에요.</>}
      sourceBar={{ badge: "한국장학재단", name: "취업후상환 학자금대출 안내", date: "2026.02" }}
      stickyLabel="의무상환율"
      stickyValue="기준소득 초과분 × 20%"
      stickyBtn="상환액 계산 ↑"
      disclaimer="이 글은 한국장학재단 안내와 관련 법령을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📚", title: "한국장학재단 상환 안내", sub: "의무상환 내역 조회 가능", href: "https://www.kosaf.go.kr", hot: true },
          { icon: "💼", title: "노란우산공제 절세 혜택", sub: "소상공인 소득공제 연 500만원", href: "/w/소상공인-노란우산공제-가입" },
          { icon: "💰", title: "프리랜서 3.3% 환급", sub: "원천징수 세금 돌려받기", href: "/w/프리랜서-3.3-원천징수-환급" },
        ]} />
        <SidebarDocs items={[
          { title: "프리랜서 3.3% 환급", cat: "금융·세금", href: "/w/프리랜서-3.3-원천징수-환급" },
        ]} />
        <SidebarCalc items={[
          { title: "학자금 상환 계산기", href: "https://www.kosaf.go.kr" },
          { title: "종합소득세 계산기", href: "https://www.hometax.go.kr" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="상환 의무 여부 확인" sub="대출 유형 · 소득 수준 · 고용 상태 선택" />
      <P>취업후상환 학자금대출(ICL)은 소득이 기준 이상이 되어야 갚아요. 같은 학자금대출이라도 일반 상환 학자금대출이면 졸업 직후부터 상환이 시작돼요. 내 대출 유형부터 먼저 확인해보세요.</P>

      <CheckerShell title="내 학자금대출 의무상환 여부는?" sub="30초 확인">
        <CheckerQ n="1" label="어떤 학자금대출인가요?" group="loan_type" opts={[
          ["icl", "취업후상환(ICL) 학자금대출이에요"],
          ["general", "일반 상환 학자금대출이에요"],
          ["unknown", "모르겠어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="연간 소득이 기준소득(약 4,200만원)보다 어떻게 되나요?" group="income_level" opts={[
          ["above", "기준소득보다 많아요"],
          ["below", "기준소득보다 적어요 또는 없어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="현재 취업 상태인가요?" group="employment" opts={[
          ["employed", "재직 중이에요"],
          ["unemployed", "실직·휴직 중이에요"],
          ["selfemployed", "자영업·프리랜서예요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="상환 유예를 신청한 적이 있나요?" group="deferral" opts={[
          ["no", "아니요"],
          ["yes", "유예 중이에요"],
        ]} sel={sel} pick={pick} />

        {result === "must_repay" && (
          <ResultPass title="의무상환 대상이에요">
            <P>기준소득을 초과하는 소득이 있으면 초과분의 20%를 의무상환해야 해요. 근로소득자라면 연말정산 때 원천징수로 자동 납부돼요. 한국장학재단 홈페이지에서 상환 내역을 확인할 수 있어요.</P>
            <ResultCTA icon="📚" title="상환 내역 조회" desc="한국장학재단에서 내 상환 현황 확인" href="https://www.kosaf.go.kr" />
          </ResultPass>
        )}
        {result === "no_repay" && (
          <ResultPass title="현재 의무상환 의무가 없어요">
            <P>소득이 기준소득 이하라면 의무상환이 발생하지 않아요. 별도로 신청하지 않아도 상환이 유예된 상태예요. 소득이 기준소득을 초과하는 해에 의무상환이 시작돼요.</P>
            <ResultCTA icon="📚" title="상환 현황 조회" desc="한국장학재단에서 대출 잔액 확인" href="https://www.kosaf.go.kr" />
          </ResultPass>
        )}
        {result === "general_loan" && (
          <ResultFail title="일반 상환 학자금대출은 ICL과 달라요">
            <P>일반 상환 학자금대출은 소득에 관계없이 졸업(중퇴) 후 상환이 시작돼요. 취업후상환(ICL) 방식이 아니라 정해진 상환 일정에 따라 원리금을 납부해야 해요.</P>
            <ResultCTA icon="📚" title="학자금대출 상환 안내" desc="한국장학재단에서 상환 일정 확인" href="https://www.kosaf.go.kr" />
          </ResultFail>
        )}
        {result === "deferral" && (
          <ResultFail title="실직 중이라면 상환 유예를 신청할 수 있어요">
            <P>실직·휴직 중이라면 소득이 기준소득 이하로 내려가므로 의무상환이 중지될 수 있어요. 상환 유예를 신청하면 해당 기간 납부 의무가 없어요.</P>
            <ResultCTA icon="📚" title="상환 유예 신청" desc="한국장학재단 유예 신청 방법" href="https://www.kosaf.go.kr" />
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="상환액 계산이 궁금하시죠?"
        a="기준소득 초과분에 20%를 곱하면 연간 의무상환액이 나와요."
        label="상환액 계산 방법 바로 보기"
        href="#s4"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="취업후상환 학자금대출 의무 상환 조건은 무엇인가요?" sub="소득 기준 · 원천징수 방식" />
      <P>취업후상환 학자금대출(ICL, Income Contingent Loan)은 <A href="https://www.law.go.kr/행정규칙/취업후상환학자금대출업무처리준칙">취업 후 상환 학자금 지원법</A>에 근거한 제도예요. 일반 학자금대출과 달리 소득이 발생해야만 상환 의무가 생겨요.</P>
      <P>의무상환 조건은 단순해요. 해당 연도 소득이 의무상환 기준소득을 초과하면 초과분의 20%를 상환해야 해요. 소득이 기준소득 이하라면 상환 의무가 없어요. 별도 신청 없이 소득이 낮으면 자동으로 상환이 유예된 상태예요.</P>
      <P>근로소득자는 원천징수 방식으로 자동 징수돼요. 연말정산 때 세무서가 소득을 확인해서 자동으로 계산하고 원천징수해요. 자영업자·프리랜서는 종합소득세 신고 때 납부해야 해요.</P>
      <P>의무상환과 별도로 자발적 상환도 가능해요. 한국장학재단 홈페이지나 인터넷뱅킹에서 원하는 금액만큼 추가 상환할 수 있어요. 잔여 대출금에 이자가 붙으니 여유가 있을 때 자발적 상환을 하면 이자 부담이 줄어요.</P>

      <H3>원천징수 방식 설명</H3>
      <TableTitle>취업후상환 학자금 의무상환 개요</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>항목</THL><TH>내용</TH></tr>
          </thead>
          <tbody>
            {[
              ["의무상환 발생 시점", "해당 연도 소득이 기준소득 초과 시"],
              ["상환율", "기준소득 초과분의 20%"],
              ["징수 방식", "근로자: 연말정산 원천징수 / 자영업·프리랜서: 종합소득세 신고"],
              ["기준소득 이하", "의무상환 발생 없음 (자동 유예)"],
              ["자발적 상환", "별도 신청으로 추가 상환 가능"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="ICL 학자금 소득 기준은 얼마인가요?" sub="2026년 기준소득 · 초과 판단" />
      <P>의무상환 기준소득은 교육부 장관이 매년 고시해요. 2025년 기준소득은 약 4,100만원이었고, 2026년 기준소득은 한국장학재단 홈페이지에서 확인할 수 있어요. 매년 소폭씩 올라가는 추세예요.</P>
      <P>소득은 근로소득, 사업소득, 기타소득을 모두 합산해요. 근로소득만 있는 직장인은 근로소득 금액(총급여 - 근로소득공제)을 기준으로 해요. 총급여가 아니라 공제 후 소득이에요.</P>
      <P>연봉 5천만원인 직장인의 경우, 근로소득공제 후 소득은 약 3,500~3,700만원 수준이에요. 총급여보다 기준소득 초과 여부를 판단하는 소득 금액이 낮아지기 때문에 연봉이 기준소득보다 높더라도 초과 소득이 크지 않을 수 있어요.</P>
      <P>한국장학재단 홈페이지에 로그인하면 내 상환 현황과 예상 의무상환액을 확인할 수 있어요. 미리 확인해두면 연말정산 때 갑자기 상환액이 발생해서 당황하는 일을 막을 수 있어요.</P>

      <H3>기준소득과 상환 여부</H3>
      <InlineLink
        icon="📚"
        title="한국장학재단 상환 현황 조회"
        desc="로그인 후 내 학자금대출 잔액과 예상 의무상환액을 확인할 수 있어요"
        href="https://www.kosaf.go.kr"
      />

      <RelatedMid
        title="금융·대출 관련 글도 확인해 보세요"
        items={[
          { icon: "💛", title: "노란우산공제 절세 혜택", desc: "소상공인 연간 소득공제 500만원", href: "/w/소상공인-노란우산공제-가입" },
          { icon: "💼", title: "프리랜서 3.3% 환급", desc: "원천징수 세금 환급받는 방법", href: "/w/프리랜서-3.3-원천징수-환급" },
          { icon: "📊", title: "종합소득세 가산세", desc: "신고 안 하면 20% 가산세 주의", href: "/w/종합소득세-신고-안하면-가산세" },
        ]}
        hubHref="/category/금융"
        hubLabel="금융 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="취업후상환 학자금 상환액은 어떻게 계산하나요?" sub="초과분 20% · 계산 예시" />
      <P>계산은 단순해요. 연간 소득 금액에서 기준소득을 빼고, 그 차이에 20%를 곱하면 의무상환액이 나와요. 공식: (연소득 금액 - 기준소득) × 20% = 연간 의무상환액이에요.</P>
      <P>예를 들어 근로소득 금액이 연 5,000만원이고 기준소득이 4,200만원이라면, 초과분은 800만원이에요. 여기에 20%를 곱하면 160만원이 연간 의무상환액이에요. 월로 나누면 약 13만원이에요.</P>
      <P>단, 연간 의무상환액이 실제 대출 잔액보다 크면 잔액 전체만 상환하면 돼요. 대출을 모두 갚았으면 더 이상 의무상환이 발생하지 않아요. 잔액이 남아 있는 한 매년 소득에 따라 상환액이 계산돼요.</P>
      <P>의무상환액은 대출 원금에 먼저 적용돼요. 이자는 별도로 붙지 않는 구조가 아니라, 대출 잔액에 대해 이자가 계속 발생해요. 의무상환액만으로 이자를 완전히 커버하지 못하면 잔액이 늘어날 수도 있어요.</P>

      <H3>의무상환 계산 예시</H3>
      <TableTitle>소득 수준별 연간 의무상환액 예시</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>연간 소득 금액</THL><TH>기준소득 (4,200만원)</TH><TH>초과분</TH><TH>의무상환액 (20%)</TH></tr>
          </thead>
          <tbody>
            {[
              ["4,000만원", "기준 이하", "-", "0원 (의무상환 없음)"],
              ["4,500만원", "4,200만원", "300만원", "60만원"],
              ["5,000만원", "4,200만원", "800만원", "160만원"],
              ["6,000만원", "4,200만원", "1,800만원", "360만원"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>기준소득은 교육부 고시로 매년 변경돼요. 2026년 기준소득은 한국장학재단 홈페이지에서 확인하세요.</TableNote>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="ICL 학자금 상환 유예는 어떻게 신청하나요?" sub="유예 사유 · 신청 방법" />
      <P>상환 유예는 소득이 기준소득 이하인 경우 자동으로 의무상환이 발생하지 않아요. 별도 신청이 필요 없어요. 단, 소득이 있는데도 납부를 미루려는 경우는 불가능해요.</P>
      <P>실직·휴직 등으로 소득이 일시적으로 없어진 경우는 한국장학재단에 유예 신청을 할 수 있어요. 유예 사유가 인정되면 해당 기간 동안 의무상환이 면제돼요. 사유가 끝나면 다시 소득에 따라 의무상환이 재개돼요.</P>
      <P>유예 신청 방법은 한국장학재단 홈페이지(kosaf.go.kr)에서 온라인으로 신청할 수 있어요. 실직확인서, 휴직증명서 등 사유 증빙 서류를 제출해야 해요. 고객센터(1599-2000)에 전화로 안내받을 수도 있어요.</P>
      <P>자발적 상환은 유예와 별개예요. 소득이 기준 이하라도 자발적으로 상환하고 싶다면 별도 신청이 가능해요. 대출 잔액이 클수록 이자 부담이 생기니 여유가 있을 때 자발적 상환을 하는 게 좋아요.</P>

      <H3>유예 신청 절차</H3>
      <Info type="tip">{"자발적 상환은 한국장학재단 앱에서도 바로 할 수 있어요. 소액이라도 원금을 줄이면 이자 부담이 줄어요."}</Info>

      <ExtBtn
        badge="한국장학재단"
        text="취업후상환 학자금 상환 안내"
        cta="상환 현황 조회하기 →"
        href="https://www.kosaf.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "소상공인 노란우산공제 가입 조건 | 연간 소득공제 금액 절세 혜택", desc: "소상공인 소득공제 제도예요", href: "/w/소상공인-노란우산공제-가입" },
        { title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제", desc: "원천징수 세금 환급받는 방법이에요", href: "/w/프리랜서-3.3-원천징수-환급" },
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "신고 안 하면 붙는 가산세예요", href: "/w/종합소득세-신고-안하면-가산세" },
        { title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", desc: "주거급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인", desc: "한부모가족 지원 금액과 신청 방법이에요", href: "/w/한부모가족-지원금-신청-자격" },
      ]} />

      <PrevNext
        prev={{ title: "소상공인 노란우산공제 가입 조건 | 연간 소득공제 금액 절세 혜택", href: "/w/소상공인-노란우산공제-가입" }}
        next={{ title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", href: "/w/기초생활수급자-주거급여-2026" }}
      />
    </BlogLayout>
  );
}
